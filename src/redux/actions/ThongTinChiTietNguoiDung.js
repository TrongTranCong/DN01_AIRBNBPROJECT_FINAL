import axios from "axios";

import { DOMAIN } from "../../util/setting";
export const thongTinChiTiet = (id) => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${DOMAIN}/api/users/${id}`,
        method: "GET",
        headers: {
          tokenByClass:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NjU0NzIwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjU2Njk0ODAwfQ.6o2C_IS8e7HlB9dUZ9eFRYOb2ST9LjIIbn4fO_SS1Qc",
          token: JSON.parse(localStorage.getItem("accessTOKEN")),
        },
      });

      dispatch({
        type: "XEM_CHI_TIET",
        user: result.data,
      });
    } catch (errors) {
      console.log(`errors`, errors);
    }
  };
};