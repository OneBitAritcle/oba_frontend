export default function Loading() {
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
        src="src\assets\icons\burger.png" // 메인 기사 이미지
        alt="Knight Logo"
        style={{ width: "140px", marginBottom: "-20px" }}
      />
      <p style={{ fontSize: "20px", marginBottom: "30px", fontFamily: "san-serif" }}>One Bite Article</p>

    </div>
  );
}
