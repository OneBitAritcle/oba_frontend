import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function ArticleTab({ article }) {
  const renderLine = (line: string, index: number) => {
    if (line.startsWith("<img>")) {
      const url = line.replace("<img>", "").trim();
      return (
        <Image
          key={index}
          source={{ uri: url }}
          style={styles.image}
          resizeMode="cover"
        />
      );
    }

    if (line.startsWith("<ul>")) {
      return (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.listText}>{line.replace("<ul>", "").trim()}</Text>
        </View>
      );
    }

    if (line.startsWith("<ol>")) {
      return (
        <View key={index} style={styles.listItem}>
          <Text style={styles.bullet}>{index + 1}.</Text>
          <Text style={styles.listText}>{line.replace("<ol>", "").trim()}</Text>
        </View>
      );
    }

    return (
      <Text key={index} style={styles.bodyText}>
        {line}
      </Text>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{article.title}</Text>

      <Text style={styles.meta}>
        {article.source} · {article.date}
      </Text>

      <View style={styles.categoryRow}>
        {(article.categories || []).map((c: string, idx: number) => (
          <View key={idx} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{c}</Text>
          </View>
        ))}
      </View>

      {(article.content || []).map((section: any, idx: number) => (
        <View key={idx} style={styles.section}>
          {section.subtitle && (
            <Text style={styles.subtitle}>{section.subtitle}</Text>
          )}

          {(section.body || []).map(renderLine)}
        </View>
      ))}

      <View style={{ height: 60 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 18 },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 8,
  },
  meta: {
    color: "#777",
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
  },
  categoryChip: {
    backgroundColor: "#EFEFEF",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
    marginBottom: 6,
  },
  categoryText: { color: "#444", fontSize: 13 },
  section: { marginBottom: 26 },
  subtitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
    color: "#333",
  },
  listItem: {
    flexDirection: "row",
    marginBottom: 8,
  },
  bullet: {
    width: 20,
    fontSize: 15,
    fontWeight: "700",
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginVertical: 10,
  },
});
