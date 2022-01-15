import axios from "axios";

import { DOMAIN } from "../../util/setting";
// import { isAuthenticated } from "../../auth/index";

export const XoaNguoiDung = (id) => {
  return async () => {
    try {
      const result = await axios({
        url: `${DOMAIN}/api/users/${id}`,
        method: "DELETE",
        headers: {
          tokenByClass:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwMSIsIkhldEhhblN0cmluZyI6IjMwLzA2LzIwMjIiLCJIZXRIYW5UaW1lIjoiMTY1NjU0NzIwMDAwMCIsIm5iZiI6MTYyMDkyNTIwMCwiZXhwIjoxNjU2Njk0ODAwfQ.6o2C_IS8e7HlB9dUZ9eFRYOb2ST9LjIIbn4fO_SS1Qc",
          token: JSON.parse(localStorage.getItem("accessTOKEN")),
        },
      });
      console.log(result)
      return window.location.reload();
    } catch (errors) {
      console.log(`errors`, errors);
    }
  };
};