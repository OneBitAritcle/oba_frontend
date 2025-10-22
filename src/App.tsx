import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Loading from "./pages/Loading";
import Login from "./pages/Login"; //
import Article_main from "./pages/Article_main";


export default function App() {
  return (
    <BrowserRouter>
      {/* 네비게이션 영역 */}
      <nav style={{ padding: 12, borderBottom: "1px solid #eee" }}>
        <Link to="/" style={{ marginRight: 12 }}>로딩</Link>
        <Link to="/login">로그인</Link> {/* ✅ 추가된 메뉴 */}
        <Link to="/Article_main">기사</Link>
      </nav>

      {/* 페이지 전환 영역 */}
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/article_main" element={<Article_main />} />

      </Routes>
    </BrowserRouter>
  );
}
