// 1. 최신 기사 목록 (홈 화면)
export const MOCK_ARTICLES = [
    {
        articleId: "677d018c641829e0839e0001",
        title: "마이크로소프트 365 코파일럿, AI 기반 앱·워크플로우 자동 생성 지원",
        summaryBullets: [
            "코파일럿 스튜디오와 M365 코파일럿 통합 발표",
            "자연어로 비즈니스 프로세스 자동화 가능",
            "비전문가를 위한 맞춤형 에이전트 생성 지원"
        ],
        thumbnailUrl: "https://www.itworld.co.kr/wp-content/uploads/2025/11/4092618-0-64220400-1763515575-AI-agents-versus-agentic-ai-shutterstock_2639838639.jpg?quality=50&strip=all&w=1024",
        servingDate: "2026-03-03"
    },
    {
        articleId: "677d018c641829e0839e0002",
        title: "글로벌 클라우드 시장 점유율 대변동, 소규모 전문 업체들의 약진",
        summaryBullets: [
            "AWS, Azure 등 거대 기업의 성장세 완만",
            "특정 산업 특화 및 로컬 보안 강점 업체 급성장",
            "데이터 주권 확보를 위한 로컬 클라우드 수요 증가"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000",
        servingDate: "2026-03-03"
    },
    {
        articleId: "677d018c641829e0839e0003",
        title: "애플, 차세대 M4 칩 탑재 맥북 프로 공개… AI 성능 비약적 향상",
        summaryBullets: [
            "M4 시리즈 칩으로 역대 가장 강력한 뉴럴 엔진 탑재",
            "전문가용 워크플로우를 위한 썬더볼트 5 지원",
            "향상된 디스플레이와 배터리 수명으로 생산성 극대화"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1517336712603-d51999550b41?q=80&w=1024",
        servingDate: "2026-03-04"
    },
    {
        articleId: "677d018c641829e0839e0004",
        title: "공간 컴퓨팅의 시대, 비전 프로가 바꾸는 우리의 업무 방식",
        summaryBullets: [
            "가상 모니터를 통한 무한한 작업 공간 제공",
            "현실과 디지털이 결합된 새로운 협업 툴 혁신",
            "다양한 산업 전문 앱들의 비전 OS 이식 가속화"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1478416272538-5f7e51dc5400?q=80&w=1024",
        servingDate: "2026-03-04"
    },
    {
        articleId: "677d018c641829e0839e0005",
        title: "양자 컴퓨팅의 실용화 한 발짝 더, 오류 정정 기술의 혁신",
        summaryBullets: [
            "큐비트의 불안정성을 해결하는 새로운 알고리즘 개발",
            "복잡한 약물 설계 및 소재 최적화에 적용 가능성 확인",
            "기존 슈퍼컴퓨터를 능가하는 처리 속도 상용화 임박"
        ],
        thumbnailUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1024",
        servingDate: "2026-03-04"
    }
];

// 2. 리포트 통계 (연속 학습일 등)
export const MOCK_REPORT_STATS = {
    consecutiveDays: 5,
    maxConsecutiveDays: 14,
    perfectDays: 12,
    lastLearnedAt: "2026-03-03"
};

// 3. 사용자 프로필 (홈 화면 헤더용)
export const MOCK_USER_PROFILE = {
    nickname: "한입기사님",
    profileImage: "basic_profile",
    email: "demo@oba.com"
};

// 4. 리포트 진행도 (오늘의 학습량)
export const MOCK_REPORT_PROGRESS = {
    solvedCount: 15, // 3 articles * 5 quizzes
    totalCount: 25,  // 5 articles * 5 quizzes
    progressPercentage: 60
};

// 5. 요일별 통계 (차트용)
export const MOCK_DAILY_STATS = [
    { day: "Mon", accuracy: 60, date: "2026-02-24" },
    { day: "Tue", accuracy: 50, date: "2026-02-25" },
    { day: "Wed", accuracy: 75, date: "2026-02-26" },
    { day: "Thu", accuracy: 65, date: "2026-02-27" },
    { day: "Fri", accuracy: 90, date: "2026-02-28" },
    { day: "Sat", accuracy: 100, date: "2026-03-01" },
    { day: "Sun", accuracy: 80, date: "2026-03-02" }
];

// 6. 카테고리별 정답률
export const MOCK_CATEGORY_PROGRESS = [
    { category: "Tech", progress: 72, color: "#87CEEB", totalQuizzes: 50, correctQuizzes: 36 },
    { category: "AI", progress: 80, color: "#D4845C", totalQuizzes: 45, correctQuizzes: 36 },
    { category: "Health", progress: 70, color: "#D4C9AA", totalQuizzes: 40, correctQuizzes: 28 },
    { category: "Social", progress: 94, color: "#A9A9A9", totalQuizzes: 50, correctQuizzes: 47 },
    { category: "Pizza", progress: 60, color: "#7FCD7F", totalQuizzes: 35, correctQuizzes: 21 }
];

// 7. 기사 상세 데이터 (기사 요약, 키워드, 퀴즈 포함)
export const MOCK_ARTICLE_DETAILS: Record<string, any> = {
    "677d018c641829e0839e0001": {
        articleId: "677d018c641829e0839e0001",
        title: "마이크로소프트 365 코파일럿, AI 기반 앱·워크플로우 자동 생성 지원",
        summary: "마이크로소프트가 코파일럿 스튜디오와 마이크로소프트 365 코파일럿을 통합하여 비개발자도 손쉽게 AI 활용 앱과 워크플로우를 구축할 수 있는 환경을 마련했습니다. 사용자는 자연어 어시스턴트를 통해 비즈니스 프로세스를 자동화하고 맞춤형 에이전트를 생성할 수 있습니다.",
        subtitle: ["AI 기반 로우코드 혁명", "비전문가를 위한 맞춤형 에이전트", "워크플로우 자동화의 미래"],
        content: [
            [
                "마이크로소프트는 최근 '코파일럿 스튜디오'의 대규모 업데이트를 발표했습니다.",
                "<img>https://www.itworld.co.kr/wp-content/uploads/2025/11/4092618-0-64220400-1763515575-AI-agents-versus-agentic-ai-shutterstock_2639838639.jpg?quality=50&strip=all&w=1024",
                "이번 업데이트의 핵심은 비개발자도 자연어 대화만으로 복잡한 비즈니스 로직을 구현할 수 있게 된 점입니다."
            ],
            [
                "누구나 자신만의 AI 업무 지원 에이전트를 만들 수 있습니다.",
                "<ul>드래그 앤 드롭 방식의 직관적인 인터페이스",
                "<ul>기존 데이터베이스와의 원활한 연동"
            ],
            [
                "단순 반복 업무를 넘어, 판단이 필요한 복잡한 워크플로우까지 자동화가 가능해집니다.",
                "이는 기업의 생산성을 획기적으로 높여줄 것으로 기대됩니다."
            ]
        ],
        keywords: [
            { name: "마이크로소프트", description: "미국의 세계적인 소프트웨어 및 하드웨어 기업으로 코파일럿을 통해 AI 시장을 선도하고 있습니다." },
            { name: "AI", description: "인공지능(Artificial Intelligence)의 약자로, 인간의 지능을 기계나 소프트웨어로 구현한 기술입니다." },
            { name: "코파일럿", description: "사용자의 작업을 돕는 인공지능 부조종사 서비스로 다양한 MS 제품군에 통합되고 있습니다." },
            { name: "워크플로우 자동화", description: "업무의 흐름을 정의하고 이를 시스템이 자동으로 수행하도록 만드는 기술입니다." },
            { name: "노코드", description: "코딩 과정 없이 시각적인 인터페이스만으로 프로그램을 개발하는 방식입니다." }
        ],
        servingDate: "2026. 03. 03.",
        publishTime: "오후 2:30",
        quizzes: [
            { question: "M365 코파일럿과 통합된 서비스는?", options: ["OS", "Copilot Studio", "Azure", "GitHub"], answer: 1, explanation: "코파일럿 스튜디오와 통합되었습니다." },
            { question: "누가 앱을 쉽게 만들 수 있나요?", options: ["데이터 전문가", "보안 전문가", "비개발자 사용자", "엔지니어"], answer: 2, explanation: "비개발자도 구축 가능합니다." },
            { question: "주요 지원 기능은 무엇인가요?", options: ["하드웨어 수리", "네트워크 설치", "앱 자동 생성", "문서 파쇄"], answer: 2, explanation: "앱 및 워크플로우 생성을 지원합니다." },
            { question: "어떤 인터페이스를 제공하나요?", options: ["CUI", "GUI 드래그앤드롭", "음성 전용", "종이 문서"], answer: 1, explanation: "직관적인 인터페이스를 제공합니다." },
            { question: "이 기술의 기대 효과는?", options: ["전력 소모 증가", "생산성 획기적 향상", "사무실 공유 중단", "컴퓨터 수명 단축"], answer: 1, explanation: "기업 생산성을 높여줍니다." }
        ]
    },
    "677d018c641829e0839e0002": {
        articleId: "677d018c641829e0839e0002",
        title: "글로벌 클라우드 시장 점유율 대변동, 소규모 전문 업체들의 약진",
        summary: "전통적인 클라우드 강자들의 성장세가 완만해진 사이, 특정 분야나 보안에 특화된 소규모 업체들이 급성장하고 있습니다.",
        subtitle: ["변화하는 시장 판도", "클라우드 보안과 로컬리즘"],
        content: [
            ["범용 클라우드보다 산업 최적화 서비스를 찾는 수요가 늘고 있습니다."],
            ["로컬 데이터 주권 문제로 현지 업체 선호도가 높아졌습니다."]
        ],
        keywords: [
            { name: "클라우드", description: "인터넷 기반 컴퓨팅 서비스입니다." },
            { name: "데이터 주권", description: "국가 내 데이터 관리 원칙입니다." },
            { name: "AWS", description: "아마존의 클라우드 서비스입니다." },
            { name: "보안", description: "데이터 보호 기술입니다." },
            { name: "로컬리즘", description: "지역 특화성입니다." }
        ],
        servingDate: "2026. 03. 03.",
        publishTime: "오전 10:15",
        quizzes: [
            { question: "최근 약진하는 업체들의 특징은?", options: ["저가 지향", "산업 특화 및 보안", "이름만 변경", "AI 배제"], answer: 1, explanation: "특화된 서비스가 인기입니다." },
            { question: "범용 클라우드의 대명사는?", options: ["AWS/Azure", "Slack", "Zoom", "Figma"], answer: 0, explanation: "AWS와 Azure가 주류입니다." },
            { question: "로컬 업체를 찾는 주된 이유는?", options: ["광고가 많아서", "데이터 주권 확보", "디자인이 예뻐서", "속도가 느려서"], answer: 1, explanation: "데이터 주권 및 규제 준수 때문입니다." },
            { question: "어느 지역에서 비중이 늘었나요?", options: ["남극", "유럽과 아시아", "달 뒷면", "심해"], answer: 1, explanation: "유럽과 아시아권에서 증가했습니다." },
            { question: "클라우드 서비스의 가상화 대상은?", options: ["책상", "서버 및 DB", "자동차", "식료품"], answer: 1, explanation: "인프라 자원을 가상화합니다." }
        ]
    },
    "677d018c641829e0839e0003": {
        articleId: "677d018c641829e0839e0003",
        title: "애플, 차세대 M4 칩 탑재 맥북 프로 공개",
        summary: "애플이 M4 시리즈 칩을 탑재한 맥북 프로를 공개했습니다. AI 성능이 크게 강화되어 복잡한 작업도 효율적으로 처리합니다.",
        subtitle: ["현존 최강의 랩톱", "Apple Intelligence 최적화"],
        content: [
            ["M4 Max 칩은 이전 세대 대비 처리 속도가 1.5배 빨라졌습니다."],
            ["새로운 나노 텍스처 디스플레이는 반사를 최소화합니다."]
        ],
        keywords: [
            { name: "Apple", description: "혁신적인 하드웨어와 소프트웨어를 만드는 기업입니다." },
            { name: "M4", description: "애플의 최신 자체 설계 칩셋입니다." },
            { name: "MacBook Pro", description: "전문가용 고성능 노트북 라인업입니다." },
            { name: "Neural Engine", description: "AI 연산을 전담하는 하드웨어 가속기입니다." },
            { name: "Thunderbolt 5", description: "초고속 데이터 전송 규격입니다." }
        ],
        servingDate: "2026. 03. 04.",
        publishTime: "오전 09:00",
        quizzes: [
            { question: "새로 탑재된 칩의 이름은?", options: ["A17", "M4", "Intel i9", "Snapdragon"], answer: 1, explanation: "M4 시리즈가 탑재되었습니다." },
            { question: "AI 연산을 담당하는 부위는?", options: ["GPU", "SSD", "Neural Engine", "RAM"], answer: 2, explanation: "뉴럴 엔진이 전담합니다." },
            { question: "새로 지원하는 전송 규격은?", options: ["USB 2.0", "Thunderbolt 5", "FireWire", "SCSI"], answer: 1, explanation: "썬더볼트 5를 지원합니다." },
            { question: "디스플레이의 새로운 옵션은?", options: ["CRT", "나노 텍스처", "종이 질감", "흑백 모드"], answer: 1, explanation: "나노 텍스처 옵션이 추가되었습니다." },
            { question: "애플의 AI 서비스 이름은?", options: ["Apple Intelligence", "Siri Pro", "Mac AI", "iBot"], answer: 0, explanation: "Apple Intelligence로 명명되었습니다." }
        ]
    },
    "677d018c641829e0839e0004": {
        articleId: "677d018c641829e0839e0004",
        title: "공간 컴퓨팅의 시대, 비전 프로가 바꾸는 우리의 업무 방식",
        summary: "비전 프로는 물리적 모니터의 한계를 넘어 무한한 캔버스를 제공합니다. 공간 컴퓨팅은 협업 방식의 근본적인 변화를 예고합니다.",
        subtitle: ["무한한 작업 영역", "가까워진 미래 협업"],
        content: [
            ["사용자는 주위 공간을 앱으로 가득 채울 수 있습니다."],
            ["페르소나 기능을 통해 가상 공간에서의 대면 미팅이 가능해집니다."]
        ],
        keywords: [
            { name: "Vision Pro", description: "애플의 공간 컴퓨팅 헤드셋입니다." },
            { name: "visionOS", description: "비전 프로 전용 운영체제입니다." },
            { name: "공간 컴퓨팅", description: "디지털과 물리 세계를 융합하는 기술입니다." },
            { name: "Persona", description: "가상 공간에서의 사용자 분신입니다." },
            { name: "Eye Tracking", description: "시선을 추적하여 조작하는 기술입니다." }
        ],
        servingDate: "2026. 03. 04.",
        publishTime: "오후 4:00",
        quizzes: [
            { question: "비전 프로의 핵심 기술 개념은?", options: ["메타버스", "공간 컴퓨팅", "클라우드 게임", "블록체인"], answer: 1, explanation: "공간 컴퓨팅을 지향합니다." },
            { question: "전용 OS의 이름은?", options: ["iOS", "macOS", "visionOS", "tvOS"], answer: 2, explanation: "visionOS를 사용합니다." },
            { question: "사용자의 가상 분신 기능은?", options: ["Avatar", "Persona", "Profile", "Character"], answer: 1, explanation: "페르소나 기능을 제공합니다." },
            { question: "주요 조작 방식 중 하나는?", options: ["마우스", "조이스틱", "Eye Tracking", "키 패드"], answer: 2, explanation: "시선 추적을 지원합니다." },
            { question: "어떤 모니터 제약을 해결하나요?", options: ["해상도", "물리적 공간 한계", "선 연결", "무게"], answer: 1, explanation: "무한한 캔버스를 제공합니다." }
        ]
    },
    "677d018c641829e0839e0005": {
        articleId: "677d018c641829e0839e0005",
        title: "양자 컴퓨팅의 실용화 한 발짝 더, 오류 정정 기술의 혁신",
        summary: "양자 컴퓨터의 최대 난제인 오류 문제를 해결하는 새로운 접근법이 나타났습니다. 상용화가 더욱 앞당겨질 것으로 보입니다.",
        subtitle: ["고전 컴퓨터의 한계를 넘어", "오류 정정의 돌파구"],
        content: [
            ["큐비트의 상태를 길게 유지하는 기술이 핵심입니다."],
            ["신약 개발에서 복잡한 분자 시뮬레이션 속도를 혁신할 것입니다."]
        ],
        keywords: [
            { name: "양자 컴퓨터", description: "양자 역학적 원리로 동작하는 계산기입니다." },
            { name: "Qubit", description: "양자 정보의 기본 단위입니다." },
            { name: "오류 정정", description: "연산 중 발생하는 노이즈를 수정하는 기술입니다." },
            { name: "슈퍼컴퓨터", description: "매우 강력한 성능의 기존 컴퓨터입니다." },
            { name: "시뮬레이션", description: "현상을 모방하여 계산하는 실험입니다." }
        ],
        servingDate: "2026. 03. 04.",
        publishTime: "오후 1:20",
        quizzes: [
            { question: "양자 정보의 기본 단위는?", options: ["Bit", "Byte", "Qubit", "Logic"], answer: 2, explanation: "큐비트가 기본 단위입니다." },
            { question: "최근 해결된 주요 난제는?", options: ["가격", "오류 정정", "디자인", "배송"], answer: 1, explanation: "오류 정정이 핵심 혁신입니다." },
            { question: "어떤 분야에 큰 영항을 주나요?", options: ["요리", "신약 개발", "사무 자동화", "SNS 디자인"], answer: 1, explanation: "분자 시뮬레이션 등 고도의 연산에 유리합니다." },
            { question: "동작 원리는 무엇인가요?", options: ["전기 역학", "양자 역학", "유체 역학", "고전 물리학"], answer: 1, explanation: "양자 역학적 현상을 이용합니다." },
            { question: "비교 대상이 되는 고성능 장비는?", options: ["계산기", "슈퍼컴퓨터", "태블릿", "스마트워치"], answer: 1, explanation: "슈퍼컴퓨터와 성능을 비교합니다." }
        ]
    }
};

// 8. 틀린 기사 목록 (WrongArticlesPage용 더미)
export const MOCK_WRONG_ANSWERS = [
    {
        article_id: "677d018c641829e0839e0001",
        serving_date: "2026.03.03",
        title: "마이크로소프트 365 코파일럿, AI 기반 앱·워크플로우 자동 생성 지원",
        category_name: "Tech",
        isWrong: true
    },
    {
        article_id: "677d018c641829e0839e0002",
        serving_date: "2026.03.03",
        title: "글로벌 클라우드 시장 점유율 대변동, 소규모 전문 업체들의 약진",
        category_name: "Tech",
        isWrong: true
    },
    {
        article_id: "677d018c641829e0839e0003",
        serving_date: "2026.03.04",
        title: "애플, 차세대 M4 칩 탑재 맥북 프로 공개",
        category_name: "AI",
        isWrong: true
    }
];
