import { GET_LISTUSER } from "../actions/types/DanhSachNguoiDungtypes";
const stateDefault = {
  listUser: [],
};

export const DanhSachNguoiDungReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case GET_LISTUSER: {
      state.listUser = action.listUser;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
