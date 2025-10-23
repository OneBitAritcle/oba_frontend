export default function MyPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#F7F3EA",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* 🧍 프로필 영역 */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        <img
          src="src\assets\icons\profile.png"
          alt="profile"
          style={{ width: "70px", height: "70px", borderRadius: "50%" }}
        />
        <h2 style={{ fontSize: "30px" }}>김휘민님 &gt;</h2>
      </div>

      {/* 진행도 바 */}
      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <p style={{ fontSize: "14px", color: "#444", marginBottom: "4px" }}>
          Diamond Lv 4878
        </p>
        <div
          style={{
            width: "200px",
            height: "8px",
            background: "#ccc",
            borderRadius: "4px",
            margin: "0 auto",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "65%",
              height: "8px",
              background: "#222",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {/* 내 정보 */}
      <div style={{ width: "100%", maxWidth: "360px", marginBottom: "32px" }}>
        <h3
          style={{
            borderBottom: "2px solid #444",
            paddingBottom: "6px",
            marginBottom: "12px",
          }}
        >
          내 정보
        </h3>

        {[
          "닉네임 변경",
          "캐릭터 변경",
          "푼 문제 확인",
          "오답 노트",
          "저장한 기사 확인",
        ].map((item) => (
          <button
            key={item}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "10px 4px",
              border: "none",
              background: "none",
              fontSize: "15px",
              color: "#444",
              cursor: "pointer",
            }}
            onClick={() => console.log(`${item} 클릭됨`)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* 앱 설정 */}
      <div style={{ width: "100%", maxWidth: "360px" }}>
        <h3
          style={{
            borderBottom: "2px solid #444",
            paddingBottom: "6px",
            marginBottom: "12px",
          }}
        >
          앱 설정
        </h3>

        {["화면 테마 변경", "알림 설정"].map((item) => (
          <button
            key={item}
            style={{
              width: "100%",
              textAlign: "left",
              padding: "10px 4px",
              border: "none",
              background: "none",
              fontSize: "15px",
              color: "#444",
              cursor: "pointer",
            }}
            onClick={() => console.log(`${item} 클릭됨`)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
