import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

import { fetchArticleDetail } from "@/api/article";

import ArticleTab from "./components/ArticleTab";
import KeywordTab from "./components/KeywordTab";
import QuizTab from "./components/QuizTab";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const articleId = Number(id);

  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    fetchArticleDetail(articleId).then(setArticle);
  }, []);

  if (!article) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1 }}>
      <ArticleTab article={article} />
      <KeywordTab keywords={article.keywords} />
      <QuizTab articleId={articleId} />
    </View>
  );
}
