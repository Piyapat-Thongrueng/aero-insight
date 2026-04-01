import axios from "axios";
import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from "axios";

interface ErrorResponse {
  error: string;
  message?: string;
}

function jwtInterceptor() {
  // เพิ่ม JWT token ใน headers ของทุก request
  axios.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem("token");

      if (token) {
        // ✅ ใช้ config.headers แทน req.headers (Axios v1.x)
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError): Promise<AxiosError> => {
      // Request error (เกิดก่อนส่ง request)
      return Promise.reject(error);
    },
  );

  // จัดการ response errors
  axios.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
      // Success response (2xx status codes)
      return response;
    },
    (error: AxiosError<ErrorResponse>): Promise<AxiosError> => {
      // Error response (4xx, 5xx status codes)

      // ตรวจสอบว่าเป็น 401 Unauthorized หรือไม่
      if (error.response?.status === 401) {
        const errorMessage = error.response.data?.error || "";

        // ตรวจสอบว่า error message มีคำว่า "Unauthorized"
        if (errorMessage.toLowerCase().includes("unauthorized")) {
          // ลบ token
          localStorage.removeItem("token");

          // Redirect ไปยังหน้า login ที่เหมาะสม
          // ถ้ากำลังอยู่ใน admin route ให้ redirect ไป /admin/login
          const isAdminRoute = window.location.pathname.startsWith("/admin");
          window.location.replace(isAdminRoute ? "/admin/login" : "/login");
        }
      }

      return Promise.reject(error);
    },
  );
}

export default jwtInterceptor;
