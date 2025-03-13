import * as type from './types';

const initialState = {
  // Manuals ============
  allManuals: [],
  allManualsPagination: {},
  allManualsLoading: false,
  allManualsError: null,
  allManualsFilters: {},

  addSketchesError: [],
  updateGroupsModal: false,


  // Add Manual
  addManualsLoading: false,
  addManualsError: [],
  manualsModal: false,

  // Get a Manual
  manualDetails: {},
  manualDetailsLoading: false,
  manualDetailsError: null,

  // Update a Manual
  updateManualLaoding: false,
  updateManualError: null,

  // Delete Manual
  deleteManualLaoding: false,
  deleteManualError: null,


  // Drawings =============
  allDrawings: [],
  allDrawingsPagination: {},
  allDrawingsLoading: false,
  allDrawingsError: null,
  allDrawingsFilters: {},

  // Add Drawing
  addDrawingLoading: false,
  addDrawingError: null,
  drawingsModal: false,

  // Get a Drawing
  drawingDetails: {},
  drawingDetailsLoading: false,
  drawingDetailsError: null,

  // Update a Drawing
  updateDrawingLoading: false,
  updateDrawingError: null,

  // Delete Drawing
  deleteDrawingLoading: false,
  deleteDrawingError: null,


  // Animations =============
  allAnimations: [],
  allAnimationsPagination: {},
  allAnimationsLoading: false,
  allAnimationsError: null,
  allAnimationsFilters: {},

  // Add Animation
  addAnimationLoading: false,
  addAnimationError: null,
  animationsModal: false,

  // Get an Animation Detail
  animationDetails: {},
  animationDetailsLoading: false,
  animationDetailsError: null,

  // Update an Animation
  updateAnimationLoading: false,
  updateAnimationError: null,

  // Delete Animation
  deleteAnimationLoading: false,
  deleteAnimationError: null,

  // Change Search
  searchSketchesQuery: "",

}

export default function sketches(state = initialState, action) {
  switch (action.type) {
    //============= GET ALL MANUALS
    case type.GET_ALL_MANUALS_REQUESTED:
      return {
        ...state,
        allManualsLoading: true,
      }
    case type.GET_ALL_MANUALS_SUCCESS:
      return {
        ...state,
        allManualsLoading: false,
        allManuals: action.allManuals.sketches,
        allManualsPagination: action.allManuals.pagination,
        allManualsFilters: action.allManuals.filters,
      }
    case type.GET_ALL_MANUALS_FAILED:
      return {
        ...state,
        allManualsLoading: false,
        allManualsError: action.message,
      }

    // ADD MANUAL
    case type.ADD_MANUAL_REQUESTED:
      return {
        ...state,
        addManualsLoading: true,
      }
    case type.ADD_MANUAL_SUCCESS:
      return {
        ...state,
        addManualsLoading: false,
        allManuals: action.allManuals,
        manualsModal: false,
      }
    case type.ADD_MANUAL_FAILED:
      return {
        ...state,
        addManualsLoading: false,
        addSketchesError: action.message,
      }

    // GET A MANUAL DETAIL
    case type.MANUAL_DETAILS_REQUESTED:
      return {
        ...state,
        manualDetailsLoading: true,
      }
    case type.MANUAL_DETAILS_SUCCESS:
      return {
        ...state,
        manualDetailsLoading: false,
        manualDetails: action.data,
      }
    case type.MANUAL_DETAILS_FAILED:
      return {
        ...state,
        manualDetailsLoading: false,
        manualDetailsError: action.message,
      }

    // UPDATE A MANUAL
    case type.UPDATE_MANUAL_REQUESTED:
      return {
        ...state,
        updateManualLaoding: true,
      }
    case type.UPDATE_MANUAL_SUCCESS:
      return {
        ...state,
        updateManualLaoding: false,
        updateGroupsModal: false,
        searchSketchesQuery: "",
      }
    case type.UPDATE_MANUAL_FAILED:
      return {
        ...state,
        updateManualLaoding: false,
        addSketchesError: action.message,
      }


    // DELETE MANUAL
    case type.DELETE_MANUAL_REQUESTED:
      return {
        ...state,
        deleteManualLaoding: true,
      }
    case type.DELETE_MANUAL_SUCCESS:
      return {
        ...state,
        deleteManualLaoding: false,
        searchSketchesQuery: "",
      }
    case type.DELETE_MANUAL_FAILED:
      return {
        ...state,
        deleteManualLaoding: false,
        deleteManualError: action.message,
      }



    //============ GET ALL DRAWINGS
    case type.GET_ALL_DRAWINGS_REQUESTED:
      return {
        ...state,
        allDrawingsLoading: true,
      }
    case type.GET_ALL_DRAWINGS_SUCCESS:
      return {
        ...state,
        allDrawingsLoading: false,
        allDrawings: action.allDrawings.sketches,
        allDrawingsPagination: action.allDrawings.pagination,
        allDrawingsFilters: action.allDrawings.filters,
      }
    case type.GET_ALL_DRAWINGS_FAILED:
      return {
        ...state,
        allDrawingsLoading: false,
        allDrawingsError: action.message,
      }

    // ADD A DRAWING
    case type.ADD_DRAWING_REQUESTED:
      return {
        ...state,
        addDrawingLoading: true,
      }
    case type.ADD_DRAWING_SUCCESS:
      return {
        ...state,
        addDrawingLoading: false,
        allDrawings: action.allDrawings,
        drawingsModal: false,
        manualsModal: false,
      }
    case type.ADD_DRAWING_FAILED:
      return {
        ...state,
        addDrawingLoading: false,
        addSketchesError: action.message,
      }

    // GET A DRAWING DETAIL
    case type.DRAWING_DETAILS_REQUESTED:
      return {
        ...state,
        drawingDetailsLoading: true,
      }
    case type.DRAWING_DETAILS_SUCCESS:
      return {
        ...state,
        drawingDetailsLoading: false,
        drawingDetails: action.data,
      }
    case type.DRAWING_DETAILS_FAILED:
      return {
        ...state,
        drawingDetailsLoading: false,
        drawingDetailsError: action.message,
      }

    // UPDATE A DRAWING
    case type.UPDATE_DRAWING_REQUESTED:
      return {
        ...state,
        updateDrawingLoading: true,
      }
    case type.UPDATE_DRAWING_SUCCESS:
      return {
        ...state,
        updateDrawingLoading: false,
        updateGroupsModal: false,
        searchSketchesQuery: "",
      }
    case type.UPDATE_DRAWING_FAILED:
      return {
        ...state,
        updateDrawingLoading: false,
        addSketchesError: action.message,
      }

    // DELETE A DRAWING
    case type.DELETE_DRAWING_REQUESTED:
      return {
        ...state,
        deleteDrawingLoading: true,
      }
    case type.DELETE_DRAWING_SUCCESS:
      return {
        ...state,
        deleteDrawingLoading: false,
        searchSketchesQuery: "",
      }
    case type.DELETE_DRAWING_FAILED:
      return {
        ...state,
        deleteDrawingLoading: false,
        deleteDrawingError: action.message,
      }



    //=========== GET ALL ANIMATIONS
    case type.GET_ALL_ANIMATIONS_REQUESTED:
      return {
        ...state,
        allAnimationsLoading: true,
      }
    case type.GET_ALL_ANIMATIONS_SUCCESS:
      return {
        ...state,
        allAnimationsLoading: false,
        allAnimations: action.allAnimations.sketches,
        allAnimationsPagination: action.allAnimations.pagination,
        allAnimationsFilters: action.allAnimations.filters,
      }
    case type.GET_ALL_ANIMATIONS_FAILED:
      return {
        ...state,
        allAnimationsLoading: false,
        allAnimationsError: action.message,
      }

    // ADD AN ANIMATION
    case type.ADD_ANIMATION_REQUESTED:
      return {
        ...state,
        addAnimationLoading: true,
      }
    case type.ADD_ANIMATION_SUCCESS:
      return {
        ...state,
        addAnimationLoading: false,
        allAnimations: action.allAnimations,
        animationsModal: false,
        manualsModal: false,
      }
    case type.ADD_ANIMATION_FAILED:
      return {
        ...state,
        addAnimationLoading: false,
        addSketchesError: action.message,
      }

    // GET AN ANIMATION DETAILS
    case type.ANIMATION_DETAILS_REQUESTED:
      return {
        ...state,
        animationDetailsLoading: true,
      }
    case type.ANIMATION_DETAILS_SUCCESS:
      return {
        ...state,
        animationDetailsLoading: false,
        animationDetails: action.data,
      }
    case type.ANIMATION_DETAILS_FAILED:
      return {
        ...state,
        animationDetailsLoading: false,
        animationDetailsError: action.message,
      }

    // UPDATE AN ANIMATION
    case type.UPDATE_ANIMATION_REQUESTED:
      return {
        ...state,
        updateAnimationLoading: true,
      }
    case type.UPDATE_ANIMATION_SUCCESS:
      return {
        ...state,
        updateAnimationLoading: false,
        updateGroupsModal: false,
        searchSketchesQuery: "",
      }
    case type.UPDATE_ANIMATION_FAILED:
      return {
        ...state,
        updateAnimationLoading: false,
        addSketchesError: action.message,
      }

    //  DELETE AN ANIMATION
    case type.DELETE_ANIMATION_REQUESTED:
      return {
        ...state,
        deleteAnimationLoading: true,
      }
    case type.DELETE_ANIMATION_SUCCESS:
      return {
        ...state,
        deleteAnimationLoading: false,
        searchSketchesQuery: "",
      }
    case type.DELETE_ANIMATION_FAILED:
      return {
        ...state,
        deleteAnimationLoading: false,
        deleteAnimationError: action.message,
      }

    //=================== SKETCHES MODAL

    // Manuals Modal
    case type.SET_MANUALS_MODAL:
      return {
        ...state,
        manualsModal: action.payload,
      }

    // Drawings Modal
    case type.SET_DRAWINGS_MODAL:
      return {
        ...state,
        drawingsModal: action.payload,
        manualsModal: action.payload,
      }

    // Animations Modal
    case type.SET_ANIMATIONS_MODAL:
      return {
        ...state,
        animationsModal: action.payload,
        manualsModal: action.payload,
      }

    // Animations Modal
    case type.SET_UPDATE_GROUP_MODAL:
      return {
        ...state,
        updateGroupsModal: action.payload,
      }


    // ======================= RESET ERRORS

    // Manuals Errors
    case type.RESET_MANUALS_ERRORS_REQUESTED:
      return {
        ...state,
        addSketchesError: [],
      }

    // Drawings Errors
    case type.RESET_DRAWINGS_ERRORS_REQUESTED:
      return {
        ...state,
        addSketchesError: [],
      }

    // Animations Errors
    case type.RESET_ANIMATIONS_ERRORS_REQUESTED:
      return {
        ...state,
        addSketchesError: [],
      }

    // Change Search
    case type.CHANGE_SKETCHES_SEARCH_REQUESTED:
      return {
        ...state,
        searchSketchesQuery: action.payload,
      }

    default:
      return state;
  }
}