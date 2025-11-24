// // // Version 1. 본문 카드 스타일 없음
// import { useState } from "react";
// import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from "react-native";

// // AI 요약 보기 토글 아이콘 설정 (경로 유지)
// const iconExpanded = require("../../../assets/icons/toggle_1.png"); // 펼쳐졌을 때
// const iconCollapsed = require("../../../assets/icons/toggle_2.png"); // 접혀있을 때

// export default function ArticleTab({ article }) {
//   // 1. 토글 상태 관리 (기본값: false - 닫힘)
//   const [isExpanded, setIsExpanded] = useState(false);

//   const categoryList = article.category || [];
  
//   // AI 요약 데이터 연결 (article.summary 사용)
//   const summaryText = article.summary || null;

//   // [NEW] 본문 및 소제목 데이터 준비
//   const subtitles = article.subtitle || [];
//   const contents = article.content || [];

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.scrollContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* 1. 카테고리 */}
//       <View style={styles.categoryContainer}>
//         <ScrollView 
//           horizontal={true} 
//           showsHorizontalScrollIndicator={false}
//         >
//           {categoryList.map((cat, idx) => (
//             <View key={idx} style={styles.categoryChip}>
//               <Text style={styles.categoryText}>{cat}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       </View>

//       {/* 2. 제목 */}
//       <Text style={styles.title}>{article.title}</Text>

//       {/* 3. 메타 정보 */}
//       <View style={styles.metaContainer}>
//         <Text style={styles.sourceText}>{article.source}</Text>
//         <Text style={styles.dateText}>{article.date}</Text>
//       </View>

//       {/* 4. 구분선 */}
//       <View style={styles.divider} />

//       {/* 5. AI 요약 토글 섹션 */}
//       {summaryText && (
//         <View style={styles.aiSection}>
//           <TouchableOpacity 
//             activeOpacity={0.7}
//             onPress={() => setIsExpanded(!isExpanded)}
//             style={styles.aiToggleHeader}
//           >
//             <Text style={styles.aiToggleTitle}>
//               {isExpanded ? "AI 요약 접기" : "AI 요약 보기"}
//             </Text>
//             <Image 
//               source={isExpanded ? iconExpanded : iconCollapsed} 
//               style={styles.toggleIcon}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>

//           {/* 토글 내용 */}
//           {isExpanded && (
//             <View style={styles.aiContentContainer}>
//               <Text style={styles.aiSummaryText}>
//                 {summaryText}
//               </Text>
//             </View>
//           )}
//         </View>
//       )}

//       {/* [NEW] 6. 본문 렌더링 (Subtitle + Content 구조)
//         - content 배열을 순회하며 섹션별로 렌더링
//         - subtitle이 'nosubtitle'이 아니면 소제목 표시
//       */}
//       <View style={styles.bodyContainer}>
//         {contents.map((sectionLines, index) => {
//           // 해당 인덱스의 소제목 가져오기
//           const subTitle = subtitles[index];
          
//           // 소제목 표시 여부 ('nosubtitle'이 아니고 값이 있을 때만)
//           const showSubTitle = subTitle && subTitle !== "nosubtitle";

//           // 본문 리스트 합치기: 문장들을 공백(" ")으로 연결하여 문단 형성
//           const paragraph = Array.isArray(sectionLines)
//             ? sectionLines.join("\n\n")
//             : sectionLines;

//           return (
//             <View key={index} style={styles.sectionBlock}>
//               {/* 소제목 영역 */}
//               {showSubTitle && (
//                 <Text style={styles.sectionTitle}>{subTitle}</Text>
//               )}
              
//               {/* 본문 문단 영역 */}
//               <Text style={styles.content}>{paragraph}</Text>
//             </View>
//           );
//         })}
//       </View>

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     paddingHorizontal: 24,
//     paddingTop: 20,
//     paddingBottom: 40,
//   },

//   // --- 카테고리 ---
//   categoryContainer: { marginBottom: 12 },
//   categoryChip: {
//     backgroundColor: "#F2F4F6",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 6,
//     marginRight: 8,
//     alignSelf: "flex-start",
//   },
//   categoryText: { color: "#6B7684", fontSize: 13, fontWeight: "600" },

//   // --- 제목 ---
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#191F28",
//     lineHeight: 34,
//     letterSpacing: -0.5,
//     marginBottom: 12,
//   },

//   // --- 메타 정보 ---
//   metaContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   sourceText: { fontSize: 14, fontWeight: "600", color: "#333", marginRight: 8 },
//   dateText: { fontSize: 13, color: "#8B95A1" },

//   // --- 구분선 ---
//   divider: {
//     height: 1,
//     backgroundColor: "#E5E8EB",
//     marginBottom: 24,
//   },

//   // --- AI 요약 스타일 ---
//   aiSection: {
//     marginBottom: 30,
//     backgroundColor: "#F9FAFB", 
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: "#F2F4F6",
//     overflow: "hidden",
//   },
//   aiToggleHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },
//   aiToggleTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#4B6EF5",
//   },
//   toggleIcon: {
//     width: 35,
//     height: 35,
//   },
//   aiContentContainer: {
//     borderTopWidth: 1,
//     borderTopColor: "#F2F4F6",
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   aiSummaryText: {
//     fontSize: 14,
//     lineHeight: 24,
//     color: "#333D4B",
//   },

//   // --- [NEW] 본문 섹션 스타일 ---
//   bodyContainer: {
//     // 전체 본문 컨테이너
//   },
//   sectionBlock: {
//     marginBottom: 24, // 각 문단(섹션) 사이의 간격
//   },
//   sectionTitle: {
//     fontSize: 20,        // 소제목은 제목보다 약간 작게
//     fontWeight: "700",
//     color: "#191F28",
//     marginBottom: 10,    // 본문과의 간격
//     marginTop: 10,       // 이전 문단과의 시각적 분리
//   },
//   content: {
//     fontSize: 16.5,
//     lineHeight: 28,
//     color: "#333D4B",
//     letterSpacing: -0.2,
//   },
// });

// Version 2. 본문 카드 스타일 추가
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Platform, Image, TouchableOpacity } from "react-native";

// [이미지 경로] assets/icons 폴더가 프로젝트 최상위에 위치 (3단계 상위)
const iconExpanded = require("../../../assets/icons/toggle_1.png"); // 펼쳐졌을 때
const iconCollapsed = require("../../../assets/icons/toggle_2.png"); // 접혀있을 때

export default function ArticleTab({ article }) {
  // 1. 토글 상태 관리
  const [isExpanded, setIsExpanded] = useState(false);

  // 2. 데이터 안전장치
  const categoryList = article.category || [];

  // 3. AI 요약 데이터
  const summaryText = article.summary || null;

  // [NEW] 4. 본문 및 소제목 데이터 준비
  const subtitles = article.subtitle || [];
  const contents = article.content || [];

  return (
    <ScrollView 
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* --- 헤더 영역 (배경 위에 바로 표시) --- */}
      <View style={styles.headerContainer}>
        {/* 카테고리 */}
        <View style={styles.categoryWrapper}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {categoryList.map((cat, idx) => (
              <View key={idx} style={styles.categoryChip}>
                <Text style={styles.categoryText}>{cat}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 제목 */}
        <Text style={styles.title}>{article.title}</Text>

        {/* 메타 정보 */}
        <Text style={styles.meta}>
          {article.source} · {article.date}
        </Text>
      </View>

      {/* --- AI 요약 카드 (본문 카드 위에 별도 배치) --- */}
      {summaryText && (
        <View style={styles.aiCard}>
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={() => setIsExpanded(!isExpanded)}
            style={styles.aiHeader}
          >
            <Text style={styles.aiTitle}>
              {isExpanded ? "AI 요약 접기" : "AI 요약 보기"}
            </Text>
            <Image 
              source={isExpanded ? iconExpanded : iconCollapsed} 
              style={styles.toggleIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* 펼쳐졌을 때 내용 표시 */}
          {isExpanded && (
            <View style={styles.aiBody}>
              <Text style={styles.aiText}>{summaryText}</Text>
            </View>
          )}
        </View>
      )}

      {/* --- 본문 영역 (화이트 카드 스타일) --- */}
      <View style={styles.contentCard}>
        {/* [NEW] subtitle과 content 배열을 매핑하여 렌더링 */}
        {contents.map((sectionLines, index) => {
          // 해당 인덱스의 소제목 가져오기
          const subTitle = subtitles[index];
          
          // 소제목 표시 여부 ('nosubtitle'이 아니고 값이 있을 때만)
          const showSubTitle = subTitle && subTitle !== "nosubtitle";

          // 본문 리스트 합치기: 문장들을 공백(" ")으로 연결하여 문단 형성
          const paragraph = Array.isArray(sectionLines)
            ? sectionLines.join("\n\n")
            : sectionLines;

          return (
            <View key={index} style={styles.sectionBlock}>
              {/* 소제목 영역 */}
              {showSubTitle && (
                <Text style={styles.sectionTitle}>{subTitle}</Text>
              )}
              
              {/* 본문 문단 영역 */}
              <Text style={styles.content}>{paragraph}</Text>
            </View>
          );
        })}
      </View>
      
      {/* 하단 여백 확보용 */}
      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#F5F6F8", // 1. 전체 배경: 아주 연한 쿨그레이
    flexGrow: 1,
  },

  // --- 헤더 스타일 ---
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  categoryWrapper: {
    marginBottom: 10,
  },
  categoryChip: {
    backgroundColor: "rgba(0,0,0,0.05)", // 배경색에 어우러지는 반투명 칩
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 8,
  },
  categoryText: {
    color: "#555",
    fontSize: 13,
    fontWeight: "600",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#191F28",
    lineHeight: 30,
    marginBottom: 6,
  },

  meta: {
    fontSize: 13,
    color: "#8B95A1",
  },

  // --- AI 요약 카드 스타일 ---
  aiCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16, // 본문 카드와의 간격
    borderRadius: 16,
    overflow: "hidden",
    
    // 그림자
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },
  aiHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  aiTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4B6EF5",
  },
  toggleIcon: {
    width: 35,
    height: 35,
  },
  aiBody: {
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#F9FAFB",
  },
  aiText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333D4B",
  },

  // --- 본문 카드 스타일 ---
  contentCard: {
    backgroundColor: "#FFFFFF", // 2. 본문 배경: 깨끗한 흰색
    marginHorizontal: 16,       // 좌우 여백
    borderRadius: 20,           // 모서리 둥글게
    padding: 24,                // 내부 여백
    
    // 3. 그림자 효과
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },

  // [NEW] 섹션 스타일
  sectionBlock: {
    marginBottom: 24, // 문단 사이 간격
  },
  sectionTitle: {
    fontSize: 19,        
    fontWeight: "700",
    color: "#191F28",
    marginBottom: 12,    // 제목과 내용 사이 간격
    marginTop: 8,        
  },
  content: {
    fontSize: 16,
    lineHeight: 26,     // 줄간격
    color: "#333D4B",   // 가독성 좋은 짙은 회색
    letterSpacing: -0.2,
  },
});

// // Version 3. 본문 카드 스타일 제거 + 퀴즈 버튼 제거
// import { useState } from "react";
// import { View, Text, ScrollView, StyleSheet, Platform, Image, TouchableOpacity } from "react-native";

// // [이미지 경로] assets/icons 폴더가 프로젝트 최상위에 위치 (3단계 상위)
// const iconExpanded = require("../../../assets/icons/toggle_1.png"); // 펼쳐졌을 때
// const iconCollapsed = require("../../../assets/icons/toggle_2.png"); // 접혀있을 때

// // [수정] onPressQuiz props 추가: 부모 컴포넌트에서 전달받은 탭 변경 함수
// export default function ArticleTab({ article, onPressQuiz }) {
//   // 1. 토글 상태 관리
//   const [isExpanded, setIsExpanded] = useState(false);

//   // 2. 데이터 안전장치
//   const categoryList = article.category || [];

//   // 3. AI 요약 데이터
//   const summaryText = article.summary || null;

//   // 4. 본문 및 소제목 데이터 준비
//   const subtitles = article.subtitle || [];
//   const contents = article.content || [];

//   return (
//     <ScrollView 
//       contentContainerStyle={styles.scrollContainer}
//       showsVerticalScrollIndicator={false}
//     >
//       {/* --- 헤더 영역 --- */}
//       <View style={styles.headerContainer}>
//         {/* 카테고리 */}
//         <View style={styles.categoryWrapper}>
//           <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
//             {categoryList.map((cat, idx) => (
//               <View key={idx} style={styles.categoryChip}>
//                 <Text style={styles.categoryText}>{cat}</Text>
//               </View>
//             ))}
//           </ScrollView>
//         </View>

//         {/* 제목 */}
//         <Text style={styles.title}>{article.title}</Text>

//         {/* 메타 정보 */}
//         <Text style={styles.meta}>
//           {article.source} · {article.date}
//         </Text>
//       </View>

//       {/* --- AI 요약 카드 (여기는 카드 스타일 유지) --- */}
//       {summaryText && (
//         <View style={styles.aiCard}>
//           <TouchableOpacity 
//             activeOpacity={0.7}
//             onPress={() => setIsExpanded(!isExpanded)}
//             style={styles.aiHeader}
//           >
//             <Text style={styles.aiTitle}>
//               {isExpanded ? "AI 요약 접기" : "AI 요약 보기"}
//             </Text>
//             <Image 
//               source={isExpanded ? iconExpanded : iconCollapsed} 
//               style={styles.toggleIcon}
//               resizeMode="contain"
//             />
//           </TouchableOpacity>

//           {/* 펼쳐졌을 때 내용 표시 */}
//           {isExpanded && (
//             <View style={styles.aiBody}>
//               <Text style={styles.aiText}>{summaryText}</Text>
//             </View>
//           )}
//         </View>
//       )}

//       {/* --- 본문 영역 (카드 스타일 제거됨) --- */}
//       <View style={styles.bodyContainer}>
//         {contents.map((sectionLines, index) => {
//           const subTitle = subtitles[index];
//           const showSubTitle = subTitle && subTitle !== "nosubtitle";
          
//           const paragraph = Array.isArray(sectionLines)
//             ? sectionLines.join(" \n\n")
//             : sectionLines;

//           return (
//             <View key={index} style={styles.sectionBlock}>
//               {showSubTitle && (
//                 <Text style={styles.sectionTitle}>{subTitle}</Text>
//               )}
//               <Text style={styles.content}>{paragraph}</Text>
//             </View>
//           );
//         })}
//       </View>
      
//       {/* --- [NEW] 퀴즈 풀러 가기 버튼 (최하단 추가) --- */}
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity 
//           style={styles.quizButton} 
//           onPress={onPressQuiz} // 부모에게 받은 탭 이동 함수 실행
//           activeOpacity={0.8}
//         >
//           <Text style={styles.quizButtonText}>퀴즈 풀러 가기 →</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 하단 여백 확보용 */}
//       <View style={{ height: 40 }} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollContainer: {
//     backgroundColor: "#F5F6F8", // 전체 배경색
//     flexGrow: 1,
//   },

//   // --- 헤더 스타일 ---
//   headerContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 24,
//     paddingBottom: 20,
//   },

//   categoryWrapper: {
//     marginBottom: 10,
//   },
//   categoryChip: {
//     backgroundColor: "rgba(0,0,0,0.05)",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 6,
//     marginRight: 8,
//   },
//   categoryText: {
//     color: "#555",
//     fontSize: 13,
//     fontWeight: "600",
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#191F28",
//     lineHeight: 30,
//     marginBottom: 6,
//   },

//   meta: {
//     fontSize: 13,
//     color: "#8B95A1",
//   },

//   // --- AI 요약 카드 스타일 ---
//   aiCard: {
//     backgroundColor: "#FFFFFF",
//     marginHorizontal: 16,
//     marginBottom: 24, // 본문과의 간격 조금 더 확보
//     borderRadius: 16,
//     overflow: "hidden",
    
//     // 그림자 유지
//     ...Platform.select({
//       ios: {
//         shadowColor: "#000",
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.03,
//         shadowRadius: 8,
//       },
//       android: { elevation: 2 },
//     }),
//   },
//   aiHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 16,
//     backgroundColor: "#F9FAFB",
//   },
//   aiTitle: {
//     fontSize: 15,
//     fontWeight: "700",
//     color: "#4B6EF5",
//   },
//   toggleIcon: {
//     width: 35,
//     height: 35,
//   },
//   aiBody: {
//     padding: 16,
//     paddingTop: 0,
//     backgroundColor: "#F9FAFB",
//   },
//   aiText: {
//     fontSize: 14,
//     lineHeight: 22,
//     color: "#333D4B",
//   },

//   // --- [수정] 본문 컨테이너 (카드 스타일 제거) ---
//   bodyContainer: {
//     paddingHorizontal: 24, // 텍스트 가독성을 위한 좌우 여백
//     // 배경색, 그림자 없음
//   },

//   // 섹션 스타일
//   sectionBlock: {
//     marginBottom: 24,
//   },
//   sectionTitle: {
//     fontSize: 20,        
//     fontWeight: "700",
//     color: "#191F28",
//     marginBottom: 12,
//     marginTop: 8,        
//   },
//   content: {
//     fontSize: 16.5,
//     lineHeight: 28,     // 줄간격 조금 더 여유롭게
//     color: "#333D4B",
//     letterSpacing: -0.2,
//   },

//   // --- [NEW] 퀴즈 버튼 스타일 ---
//   buttonContainer: {
//     paddingHorizontal: 24, // bodyContainer와 동일한 여백
//     marginTop: 10,
//   },
//   quizButton: {
//     backgroundColor: "#4B6EF5",
//     paddingVertical: 16,
//     borderRadius: 16, 
//     alignItems: "center",
//     justifyContent: "center",
    
//     // 그림자
//     shadowColor: "#4B6EF5",
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   quizButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
// });