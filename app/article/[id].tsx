import { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { fetchArticleDetail } from "@/api/article";

import QuizTab from "./components/QuizTab";
import KeywordTab from "./components/KeywordTab";
import ArticleTab from "./components/ArticleTab";

export default function ArticleDetail() {
  const { id } = useLocalSearchParams();
  const articleId = Number(id);

  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleDetail(articleId).then(setArticle);
  }, []);

  if (!article) return <Text>Loading...</Text>;

  return (
    <ScrollView>
      <ArticleTab article={article} />
      <KeywordTab keywords={article.keywords} />
      <QuizTab articleId={articleId} />
    </ScrollView>
  );
}
