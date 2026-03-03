import axios from "axios";
import * as mockData from "./mockData";

// 🚀 더미 데이터 사용 여부 (나중에 false로 바꾸면 실제 서버 연결)
const USE_MOCK = true;
const BASE_URL = "http://localhost:9000";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ✅ Mock Interceptor: USE_MOCK이 true면 실제 요청을 보내지 않고 더미 데이터를 반환합니다.
apiClient.interceptors.request.use(
  (config) => {
    if (USE_MOCK) {
      console.log(`[MOCK API] Request to: ${config.url}`);

      let data;
      const url = config.url || "";
      if (url.includes("/articles/latest")) data = mockData.MOCK_ARTICLES;
      else if (url.includes("/api/report/stats")) data = mockData.MOCK_REPORT_STATS;
      else if (url.includes("/api/report/progress")) data = mockData.MOCK_REPORT_PROGRESS;
      else if (url.includes("/api/report/daily-stats")) data = mockData.MOCK_DAILY_STATS;
      else if (url.includes("/api/report/category-progress")) data = mockData.MOCK_CATEGORY_PROGRESS;
      else if (url.includes("/my/wrong-answers")) data = mockData.MOCK_WRONG_ANSWERS;
      else if (url.includes("/api/user/profile")) data = mockData.MOCK_USER_PROFILE;
      else if (url.startsWith("/articles/")) {
        const id = url.split("/").pop();
        if (id && mockData.MOCK_ARTICLE_DETAILS[id]) {
          data = mockData.MOCK_ARTICLE_DETAILS[id];
        }
      }

      if (data) {
        // Axios 응답 구조 모방하여 reject로 던짐 (response interceptor에서 처리)
        const mockResponse = {
          data,
          status: 200,
          statusText: "OK",
          headers: {},
          config,
        };
        return Promise.reject({
          config,
          response: mockResponse,
          isMock: true,
        });
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터에서 Mock 데이터를 정상 응답으로 처리
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error && error.isMock) return Promise.resolve(error.response);
    return Promise.reject(error);
  }
);