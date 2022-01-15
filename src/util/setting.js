import axios from "axios";
export const DOMAIN = "https://airbnb.cybersoft.edu.vn";
export const TOKEN = "accessTOKEN";

//Cấu hình interceptor (cấu hình sẵn những tham số mặc định cho tất cả api)
export const http = axios.create({
  baseURL: "https://airbnb.cybersoft.edu.vn",
  timeout: 30000,
});
// Add a request interceptor
http.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      tokenByClass:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjYiLCJIZXRIYW5TdHJpbmciOiIzMS8wMy8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDg2ODQ4MDAwMDAiLCJuYmYiOjE2MTc1NTU2MDAsImV4cCI6MTY0ODgzMjQwMH0.x2aYBurEV6HW_u5m4Fhmr7bbp60q1hcW3_KcQ6nrySI",
      // token: JSON.parse(localStorage.getItem("accessTOKEN")),
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTdmNGQ3YzFkMjA5NjAwMWM1ZGY5M2QiLCJlbWFpbCI6InRodXlAZ21haWwuY29tIiwidHlwZSI6IkFETUlOIiwiaWF0IjoxNjQwNjc5NjgxfQ.zXFnKt9PAJizZ6on2VOChyoEMzj3CjmNgxOlzz7ptj8",
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
