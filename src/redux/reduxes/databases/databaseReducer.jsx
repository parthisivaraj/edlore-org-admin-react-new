import * as type from "./types";

const initialState = {
  // Get all Databases
  databasesList: [],
  loading: false,
  error: null,

  queryProcessing: false,
  queryError: "",
  conversations: [],

  // Create a Database
  processing: "",
  processingError: [],
  showDatabaseModal: false,

  pedningFiles: {},

  // Get a Individual Database
  details: {},

  // Search Query
  searchDatabasesQuery: "",
};

export default function databases(state = initialState, action) {
  switch (action.type) {
    // GET ALL DOCUMENTS
    case type.GET_ALL_DATABASES_REQUESTED:
      return {
        ...state,
        loading: true,
      };
    case type.GET_ALL_DATABASES_SUCCESS:
      return {
        ...state,
        loading: false,
        databasesList: action.databaseList,
        details:
          (action.databaseList || []).length > 0 ? action.databaseList[0] : {},
      };
    case type.GET_ALL_DATABASES_FAILED:
      return {
        ...state,
        loading: false,
        error: action.message,
      };

    case type.AI_QUERY_REQUESTED:
      return {
        ...state,
        conversations: [
          ...state.conversations,
          {
            id: Date.now(),
            person: "You",
            image: "../assets/icon-user.svg",
            text: action.payload.query,
          },
        ],
        queryProcessing: true,
      };
    case type.AI_QUERY_SUCCESS:
      return {
        ...state,
        queryProcessing: false,
        conversations: [
          ...state.conversations,
          {
            id: Date.now(),
            person: "EDLORE AI",
            isRobot: true,
            databaseId: action.payload.databaseId,
            image: "../assets/edlore.svg",
            text: action.payload.responseTextOnly,
            files: action.payload.hitResults,
          },
        ],
      };
    case type.AI_QUERY_FAILED:
      return {
        ...state,
        conversations: [
          ...state.conversations,
          {
            id: Date.now(),
            person: "EDLORE AI",
            isRobot: true,
            image: "../assets/edlore.svg",
            text: "Something went wrong, please try again later",
          },
        ],
        queryProcessing: false,
      };

    // ADD A DOCUMENT
    case type.ADD_DATABASE_REQUESTED:
      return {
        ...state,
        processing: "Creating",
      };
    case type.ADD_DATABASE_SUCCESS:
      return {
        ...state,
        processing: "",
        databasesList: [...state.databasesList, action.newDatabase],
        showDatabaseModal: false,
        processingError: [],
        details: { ...action.newDatabase },
      };
    case type.ADD_DATABASE_FAILED:
      return {
        ...state,
        processing: "",
        processingError: action.message,
      };

    // DOCUMENT DETAILS
    case type.DATABASE_SET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    // UPDATE A DOCUMENT
    case type.UPDATE_DATABASE_REQUESTED:
      return {
        ...state,
        loading: "Updating",
        pedningFiles: {
          ...state.pedningFiles,
          [action.payload.fileName.toLowerCase()]: true,
        },
      };
    case type.UPDATE_DATABASE_SUCCESS:
      const payloadData = action.data;
      const tempPendingFiles = { ...state.pedningFiles };
      delete tempPendingFiles[payloadData.document.fileName.toLowerCase()];

      const newDatabases = state.databasesList.map((x) => {
        if (x.id === payloadData.id) {
          return {
            ...x,
            documents: [...(x.documents || []), payloadData.document],
          };
        }
        return x;
      });

      return {
        ...state,
        loading: "",
        showDatabaseModal: false,
        searchDatabasesQuery: "",
        processingError: [],
        databasesList: newDatabases,
        pedningFiles: tempPendingFiles,
        details:
          state.details.id === payloadData.id
            ? newDatabases.find((x) => x.id === payloadData.id)
            : state.details,
      };
    case type.UPDATE_DATABASE_FAILED:
      const tempPendingFile = { ...state.pedningFiles };
      delete tempPendingFile[action.data.fileName.toLowerCase()];

      return {
        ...state,
        loading: "",
        pedningFiles: tempPendingFile,
        processingError: action.data.message,
      };

    // DELETE A DOCUMENT
    case type.DELETE_DATABASE_DOCUMENT_REQUESTED:
      return {
        ...state,
        loading: "Deleting",
      };
    case type.DELETE_DATABASE_DOCUMENT_SUCCESS:
      const deletePayload = action.data;
      const tempDatabases = state.databasesList.map((x) => {
        if (x.id === deletePayload.id) {
          return {
            ...x,
            documents: x.documents.filter(
              (x) => x.url !== deletePayload.document,
            ),
          };
        }
        return x;
      });

      return {
        ...state,
        loading: "",
        processingError: [],
        databasesList: tempDatabases,
        details:
          state.details.id === deletePayload.id
            ? tempDatabases.find((x) => x.id === deletePayload.id)
            : state.details,
      };
    case type.DELETE_DATABASE_DOCUMENT_FAILED:
      return {
        ...state,
        loading: "",
      };

    // RESET THE FORM ON CLOSE
    case type.SET_DATABASE_MODAL_REQUESTED:
      return {
        ...state,
        showDatabaseModal: action.payload,
      };

    // DELETE A DOCUMENT
    case type.DELETE_DATABASE_REQUESTED:
      return {
        ...state,
        processing: "Deleting",
      };
    case type.DELETE_DATABASE_SUCCESS:
      return {
        ...state,
        processing: "",
        searchDatabasesQuery: "",
        processingError: [],
      };
    case type.DELETE_DATABASE_FAILED:
      return {
        ...state,
        processing: "",
        processingError: action.message,
      };

    // RESET THE DUPLICATE ERRORS
    case type.RESET_DATABASES_ERRORS_REQUESTED:
      return {
        ...state,
        error: [],
      };

    // CHANGE SEARCH
    case type.CHANGE_DATABASES_SEARCH_REQUESTED:
      return {
        ...state,
        searchDatabasesQuery: action.payload,
      };

    default:
      return state;
  }
}
