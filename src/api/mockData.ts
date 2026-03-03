// 1. 최신 기사 목록 (홈 화면)
export const MOCK_ARTICLES = [
    {
        articleId: "677d018c641829e0839e0001",
        title: "마이크로소프트 365 코파일럿, AI 기반 앱·워크플로우 자동 생성 지원…비개발자도 손쉽게 구축",
        summaryBullets: [
            "마이크로소프트는 로우코드/노코드 개발 툴인 코파일럿 스튜디와 마이크로소프트 365 코파일럿을 통합",
            "사용자가 생성형 AI 기반 어시스턴트를 통해 앱과 워크플로우를 쉽게 만들 수 있도록 지원",
            "새롭게 추가된 앱 빌더와 워크플로우 에이전트를 통해 비전문가도 복잡한 시스템 구축 가능"
        ],
        thumbnailUrl: "https://www.itworld.co.kr/wp-content/uploads/2025/11/4092618-0-64220400-1763515575-AI-agents-versus-agentic-ai-shutterstock_2639838639.jpg?quality=50&strip=all&w=1024",
        servingDate: "2026-03-03"
    },
    {
        articleId: "677d018c641829e0839e0002",
        title: "글로벌 클라우드 시장 점유율 대변동, 소규모 전문 업체들의 약진",
        summaryBullets: [
            "AWS, Azure 등 거대 기업의 성장세가 주춤한 사이 특정 산업 특화 클라우드가 인기",
            "보안과 규제 준수를 강점으로 내세운 로컬 업체들의 시장 점유율 15% 상승",
            "하이브리드 클라우드 도입 가속화로 통합 관리 솔루션 수요 폭증"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
        servingDate: "2026-03-03"
    }
];

// 2. 리포트 통계 (연속 학습일 등)
export const MOCK_REPORT_STATS = {
    consecutiveDays: 5,
    maxConsecutiveDays: 14,
    perfectDays: 12,
    lastLearnedAt: "2026-03-03T10:00:00Z"
};

// 3. 사용자 프로필 (홈 화면 헤더용)
export const MOCK_USER_PROFILE = {
    nickname: "한입기사님",
    profileImage: "basic_profile",
    email: "demo@oba.com"
};

// 4. 리포트 진행도 (오늘의 학습량)
export const MOCK_REPORT_PROGRESS = {
    solvedCount: 3,
    totalCount: 5,
    category: "Tech"
};

// 5. 요일별 통계 (차트용)
export const MOCK_DAILY_STATS = [
    { day: "Mon", accuracy: 60 },
    { day: "Tue", accuracy: 50 },
    { day: "Wed", accuracy: 75 },
    { day: "Thu", accuracy: 65 },
    { day: "Fri", accuracy: 90 },
    { day: "Sat", accuracy: 100 },
    { day: "Sun", accuracy: 80 }
];

// 6. 카테고리별 정답률
export const MOCK_CATEGORY_PROGRESS = [
    { category: "Tech", progress: 72, color: "#87CEEB" },
    { category: "AI", progress: 80, color: "#D4845C" },
    { category: "Health", progress: 70, color: "#D4C9AA" },
    { category: "Social", progress: 94, color: "#A9A9A9" },
    { category: "Pizza", progress: 60, color: "#7FCD7F" }
];
