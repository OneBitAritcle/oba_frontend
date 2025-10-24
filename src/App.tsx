import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Article_main from "./pages/Article_main";
import Article_detail from "./pages/Article_detail";
import QuizPage from "./pages/QuizPage";
import SummaryPage from "./pages/SummaryPage";
import QuizHome from "./pages/QuizHome"; 
import MyPage from "./pages/MyPage";
import QuizCheck from "./pages/QuizCheck";



export default function App() {
  return (
    <BrowserRouter>
      {/* 🟫 상단 네비게이션 바 */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#F7F3EA",
          borderBottom: "1px solid #ddd",
          padding: "12px 0",
          position: "sticky", // 상단 고정
          top: 0,
          zIndex: 100,
        }}
      >
        {/* NavLink는 현재 경로에 따라 스타일 자동 변경 */}
        <NavLink
          to="/"
          style={({ isActive }) => ({
            // textDecoration: isActive ? "underline" : "none",
            color: isActive ? "#000" : "#999",
            fontWeight: isActive ? "700" : "400",
            fontSize: "16px",
          })}
        >
          홈
        </NavLink>

        <NavLink
          to="/article_main"
          style={({ isActive }) => ({
            // textDecoration: isActive ? "underline" : "none",
            color: isActive ? "#000" : "#999",
            fontWeight: isActive ? "700" : "400",
            fontSize: "16px",
          })}
        >
          기사
        </NavLink>

        <NavLink
          to="/quiz"
          style={({ isActive }) => ({
            // textDecoration: isActive ? "underline" : "none",
            color: isActive ? "#000" : "#999",
            fontWeight: isActive ? "700" : "400",
            fontSize: "16px",
          })}
        >
          퀴즈
        </NavLink>

        <NavLink
          to="/my"
          style={({ isActive }) => ({
            // textDecoration: isActive ? "underline" : "none",
            color: isActive ? "#000" : "#999",
            fontWeight: isActive ? "700" : "400",
            fontSize: "16px",
          })}
        >
          MY
        </NavLink>
      </nav>

      {/* 🧩 페이지 라우팅 */}
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/article_main" element={<Article_main />} />
        <Route path="/article_detail/:id" element={<Article_detail />} />
        <Route path="/quiz/:id" element={<QuizPage />} /> 
        <Route path="/summary/:id" element={<SummaryPage />} />
        <Route path="/quiz" element={<QuizHome />} />
        <Route path="/My" element={<MyPage />} />
        <Route path="/quiz_check/:id" element={<QuizCheck />} />


      </Routes>
    </BrowserRouter>
  );
}
