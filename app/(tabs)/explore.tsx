import React from "react";
import { StyleSheet, View, ScrollView, Image, Pressable } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useRouter } from "expo-router";
import { useFoodEntryStore } from "../../stores/foodEntryStore";

type FoodEntry = {
  id: string;
  name: string;
  timestamp: Date;
  imageUrl?: string;
  confidence: number;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  isHealthy: boolean;
  labels: string[];
};

const FoodEntryCard = ({ entry }: { entry: FoodEntry }) => (
  <Pressable
    style={[
      styles.entryCard,
      { borderLeftColor: entry.isHealthy ? "#4CAF50" : "#FFA000" },
    ]}
  >
    {entry.imageUrl && (
      <Image source={{ uri: entry.imageUrl }} style={styles.entryImage} />
    )}
    <View style={styles.entryContent}>
      <ThemedText style={[styles.entryName, { fontWeight: "600" }]}>
        {entry.name}
      </ThemedText>
      <ThemedText style={styles.entryTime}>
        {new Date(entry.timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </ThemedText>
      <View style={styles.labels}>
        {entry.labels.slice(0, 2).map((label, index) => (
          <ThemedText key={index} style={styles.label}>
            {label}
          </ThemedText>
        ))}
      </View>
    </View>
    <View style={styles.entryConfidence}>
      <ThemedText style={styles.confidenceText}>
        {Math.round(entry.confidence * 100)}%
      </ThemedText>
      <IconSymbol
        size={24}
        color={entry.isHealthy ? "#4CAF50" : "#FFA000"}
        name={
          entry.isHealthy
            ? "checkmark.circle.fill"
            : "exclamationmark.circle.fill"
        }
      />
    </View>
  </Pressable>
);

export default function ExploreScreen() {
  const router = useRouter();
  const entries = useFoodEntryStore((state) => state.entries);

  const goToCamera = () => {
    router.push("/(tabs)/buddy");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconSymbol
          size={48}
          color="#FFA000"
          name="fork.knife"
          style={styles.headerIcon}
        />
        <ThemedText type="title" style={styles.headerTitle}>
          My Food Journal
        </ThemedText>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.journalContainer}>
          <View style={styles.dateHeader}>
            <ThemedText style={[styles.dateText, { fontWeight: "600" }]}>
              Today
            </ThemedText>
          </View>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <FoodEntryCard key={entry.id} entry={entry} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Pressable onPress={goToCamera} style={styles.emptyStateButton}>
                <IconSymbol
                  size={64}
                  color="#FFA000"
                  name="camera"
                  style={styles.emptyIcon}
                />
                <ThemedText style={[styles.emptyText, { color: "#11181C" }]}>
                  Take a photo of your food to start tracking
                </ThemedText>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      <Pressable onPress={goToCamera} style={styles.fab}>
        <IconSymbol size={32} color="#FFFFFF" name="camera" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF8E1",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#FFF8E1",
  },
  headerIcon: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    color: "#11181C",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF8E1",
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  journalContainer: {
    padding: 16,
    backgroundColor: "#FFF8E1",
  },
  dateHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#FFE0B2",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#11181C",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyIcon: {
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#11181C",
    textAlign: "center",
  },
  entryCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
  },
  entryImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 16,
  },
  entryContent: {
    flex: 1,
    justifyContent: "center",
  },
  entryName: {
    fontSize: 18,
    color: "#11181C",
    marginBottom: 6,
  },
  entryTime: {
    fontSize: 14,
    color: "#687076",
    marginBottom: 4,
  },
  entryCalories: {
    fontSize: 16,
    color: "#FFA000",
    fontWeight: "600",
  },
  entryConfidence: {
    justifyContent: "center",
    paddingLeft: 16,
    borderLeftWidth: 1,
    borderLeftColor: "#FFE0B2",
  },
  confidenceText: {
    fontSize: 14,
    color: "#687076",
    fontWeight: "600",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FFA000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emptyStateButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  labels: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    marginTop: 4,
  },
  label: {
    fontSize: 12,
    color: "#687076",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
});
