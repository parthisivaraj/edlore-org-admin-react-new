import * as type from './types';

const initialState = {

  show: false,
  content: "test content the danger",
  type: "success",
  //------------------------
}

export default function toaster(state = initialState, action) {
  switch (action.type) {
    case type.SET_TOASTER_SUCCESS:
      return {
        ...state,
        show: true,
        content: action.data.content,
        type: action.data.type,
      }
    case type.ADD_LOCAL_TOASTER_SUCCESS:
      return {
        ...state,
        show: true,
        content: action.payload.content,
        type: action.payload.type,
      }

    case type.SET_TOASTER_CLOSED:
      return {
        ...state,
        show: false,
        content: "",
        type: "success",
      }
    default:
      return state
  }
}