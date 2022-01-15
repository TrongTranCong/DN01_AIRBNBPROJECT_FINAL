import axios from "axios";

// import { Redirect } from "react-router-dom";
// import { useHistory } from "react-router";

import { DOMAIN } from "../../util/setting";
import { POST_LOGIN } from "./types/DangNhaptypes";

export const DangNhapAction = ({ values, callback }) => {
  // let history = useHistory();
  return async (dispatch) => {
    try {
      const result = await axios({
        url: `${DOMAIN}/api/auth/login`,
        method: "POST",
        headers: {
          tokenByClass:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NjU0NzIwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjU2Njk0ODAwfQ.6o2C_IS8e7HlB9dUZ9eFRYOb2ST9LjIIbn4fO_SS1Qc",
        },
        data: values,
      });
      if (result.status === 200) {
        dispatch({
          type: POST_LOGIN,
          infoLogin: result.data,
        });
        callback();
      }
      // có 2 cách
      // cách 1 cài 1 cái lib sử dụng đối với ređux thunk và saga
      // cách 2 truyền callback
      // lib tên chi mà mình quên rồi, config hơi cực
      // mình chỉ cách truyền call back hỉ
      // console.log(result);
    } catch (errors) {
      // console.log(errors.response.data.message);
    }
    return dispatch;
  };
};