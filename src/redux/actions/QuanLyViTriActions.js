import { GET_LOCATIONS } from "./types/QuanLyViTriTypes";
import { http } from "../../util/setting";

export const getLocationAction = () => {
  return async (dispatch) => {
    try {
      let result = await http.get(`/api/locations`);
      dispatch({
        type: GET_LOCATIONS,
        arrLocations: result.data,
      });
    } catch (errors) {
      console.log(`errors`, errors.res?.data);
    }
  };
};
