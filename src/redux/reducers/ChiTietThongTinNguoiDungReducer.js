const stateDefault = {
    user: {},
  };
  
  export const ChiTietThongTinNguoiDungReducer = (
    state = stateDefault,
    action
  ) => {
    switch (action.type) {
      case "XEM_CHI_TIET": {
        state.user = action.user;
        return { ...state };
      }
      default:
        return { ...state };
    }
  };