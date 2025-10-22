import { useNavigate } from "react-router-dom";

export default function Login() {
   const navigate = useNavigate();
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F3EA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      {/* 상단 로고 */}
      <h1
        style={{
          fontSize: "40px",
          marginBottom: "8px",
          fontFamily: "'Jua', sans-serif",
          fontWeight: 550,       // 글씨 두께 줄이기
          letterSpacing: "3px", // 글자 간격 넓히기
          lineHeight: "1.3",     // 줄 간격 살짝 띄우기
        }}
      >
        한입기사
      </h1>


      <img
        src="src\assets\icons\annoy.png" // 메인 기사 이미지
        alt="Knight Logo"
        style={{ width: "140px", marginBottom: "-20px" }}
      />
      <p style={{ fontSize: "20px", marginBottom: "30px", fontFamily: "san-serif" }}>One Bite Article</p>

      {/* 로그인 버튼 3개 */}
      <button
        onClick={() => navigate("/article_main")}
        style={{
          width: "240px",
          height: "48px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          background: "white",
          marginBottom: "12px",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <img
          src="src\assets\emoji\google 1.png"
          alt="Google"
          style={{ width: "18px" }}
        />
        구글로 로그인
      </button>

      <button
        onClick={() => navigate("/article_main")}
        style={{
          width: "240px",
          height: "48px",
          borderRadius: "8px",
          border: "none",
          background: "#FEE500",
          marginBottom: "12px",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <img
          src="src\assets\emoji\kakao-talk 1.png"
          alt="Kakao"
          style={{ width: "18px", borderRadius: "50%" }}
        />
        카카오로 로그인
      </button>

      <button
        onClick={() => navigate("/article_main")}
        style={{
          width: "240px",
          height: "48px",
          borderRadius: "8px",
          border: "none",
          background: "#03C75A",
          color: "white",
          fontSize: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          cursor: "pointer",
        }}
      >
        <img
          src="src\assets\emoji\naver.png"
          alt="Naver"
          style={{ width: "18px" }}
        />
        네이버로 로그인
      </button>
    </div>
  );
}
