import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchUserProfile } from "@/api/user";

export default function MyScreen() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserProfile().then(setUser);
  }, []);

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user.name}님</Text>
      <Text style={styles.email}>{user.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  name: { fontSize: 24, fontWeight: "bold" },
  email: { color: "#666" },
});
