import { baseService } from "./baseService";

export class QuanLyPhongChoThueService extends baseService {
  constructor() {
    super();
  }
  layDanhSachPhongChoThueTheoViTri = () => {
    return this.get(`/api/rooms`);
  };
}

export const quanLyPhongChoThueService = new QuanLyPhongChoThueService();
