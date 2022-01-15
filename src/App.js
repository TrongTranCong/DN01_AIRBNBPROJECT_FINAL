import "./App.css";
//cấu hình routing
import { BrowserRouter, Route, Switch } from "react-router-dom";

import DanhSachPhong from "./pages/DanhSachPhong/DanhSachPhong";
import Home from "./pages/Home/Home";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import ChiTietPhong from "./pages/ChiTietPhong/ChiTietPhong";
import Payment from "./pages/Payment/Payment";
import Register from "./pages/Register/Register";
import LoginPage from "./pages/Login/LoginPage";
import ThongTinCaNhan from "./pages/ThongTinCaNhan/ThongTinCaNhan";
import PrivateRoute from "./auth/PrivateRoute";
// import CapNhatNguoiDung from "./pages/ThongTinCaNhan/CapNhatNguoiDung";
import DanhSachNguoiDung from "./pages/DanhSachNguoiDung/DanhSachNguoiDung";
import ThongTinPhong from "./pages/ThongTinPhong/ThongTinPhong";
import ThemPhong from "./pages/ThongTinPhong/ThemPhong/ThemPhong";
import UpdateRoom from "./pages/UpdateRoom/UpdateRoom";
import { createBrowserHistory } from "history";
import AdminRoute from "./auth/AdminRoute";

export const history = createBrowserHistory();

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <HomeTemplate exact path="/" component={Home} />
        <HomeTemplate exact path="/danhsachphong" component={DanhSachPhong} />
        <HomeTemplate exact path="/chitietphong/:id" component={ChiTietPhong} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/loginpage" component={LoginPage} />
        <Route exact path="/thanhtoan" component={Payment} />
        <PrivateRoute exact path="/user/dashboard" component={ThongTinCaNhan} />

        <AdminRoute exact path="/thongtinphong" component={ThongTinPhong} />
        <AdminRoute
          exact
          path="/thongtinphong/themphong"
          component={ThemPhong}
        />
        <AdminRoute
          exact
          path="/thongtinphong/updateroom/:id"
          component={UpdateRoom}
        />
        <AdminRoute exact path="/getlistuser" component={DanhSachNguoiDung} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
