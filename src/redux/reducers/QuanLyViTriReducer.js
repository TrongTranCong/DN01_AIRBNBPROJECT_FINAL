import { GET_LOCATIONS } from "../actions/types/QuanLyViTriTypes";
const stateDefault = {
  arrLocations: [],
  getInfo:{}
  
};
// const stateSearch = {
//   getInfo:{}
// };

export const QuanLyViTriReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LOCATIONS: {
      return { ...state, arrLocations: action.arrLocations };
    }
    case "GET_INFO_SEARCH": {
      return { ...state, getInfo: action.payload };
    }
    default:
      return { ...state };
  }
};

// export const LayThongTinSearchReducer = (state = stateSearch, action) => {
//   switch (action.type) {
//     case "GET_INFO_SEARCH": {
//       return {...state,getInfo:action.formik.values};
//     }
//     default:
//       return state  ;
//   }
// };
