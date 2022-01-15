import { baseService } from "./baseService";

export class QuanLyViTriService extends baseService {
  constructor() {
    super();
  }
  layDanhSachViTri = () => {
    return this.get(`/api/locations`);
  };
}
export const quanLyViTriService = new QuanLyViTriService();
