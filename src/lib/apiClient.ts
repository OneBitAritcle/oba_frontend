import axios from "axios";
import { 
  getAccessToken, 
  getRefreshToken, 
  saveAccessToken, 
  saveRefreshToken, 
  clearAuth 
} from "./storage";

export const api = axios.create({
  baseURL: "http://43.200.179.159:9000",
});

// 요청 인터셉터
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Access Token 만료
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh = await getRefreshToken();
      if (!refresh) {
        await clearAuth();
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(
          "http://43.200.179.159:9000/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refresh}`,
            },
          }
        );

        const newAccess = res.data.accessToken;
        const newRefresh = res.data.refreshToken;

        await saveAccessToken(newAccess);
        await saveRefreshToken(newRefresh);

        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);

      } catch (e) {
        // Refresh Token 만료 → 자동 로그아웃
        await clearAuth();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);
