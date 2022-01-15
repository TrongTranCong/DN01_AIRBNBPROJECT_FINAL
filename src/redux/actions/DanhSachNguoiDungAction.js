import axios from "axios";
import { GET_LISTUSER } from "../../redux/actions/types/DanhSachNguoiDungtypes";
import { DOMAIN } from "../../util/setting";

// export const getListUser = async (dispatch) => {
//   try {
//     const result = await axios({
//       url: `${DOMAIN}/api/users/pagination`,
//       method: "GET",
//       headers: {
//         tokenByClass:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NjU0NzIwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjU2Njk0ODAwfQ.6o2C_IS8e7HlB9dUZ9eFRYOb2ST9LjIIbn4fO_SS1Qc",
//       },
//     });
//     console.log(result);
//     dispatch({
//       type: GET_LISTUSER,
//       listUser: result.data,
//     });
//   } catch (errors) {
//     console.log(`errors`, errors);
//   }
//   return dispatch;
// };
export const getListUser = () => {
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${DOMAIN}/api/users/pagination`,
        method: "GET",
        headers: {
          tokenByClass:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NjU0NzIwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjU2Njk0ODAwfQ.6o2C_IS8e7HlB9dUZ9eFRYOb2ST9LjIIbn4fO_SS1Qc",
        },
      });
      // console.log("result", result);

      dispatch({
        type: GET_LISTUSER,
        listUser: result.data,
      });
    } catch (errors) {
      // console.log(`errors`, errors);
    }
  };
};