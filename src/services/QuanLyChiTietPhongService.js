import { baseService } from "./baseService";

class QuanLyChiTietPhongService extends baseService {
  constructor() {
    super();
  }
  layChiTietPhongChoThueTheoViTri = (maPhong) => {
    return this.get(`/api/rooms/${maPhong}`);
  };
}
export const quanLyChiTietPhongService = new QuanLyChiTietPhongService();
