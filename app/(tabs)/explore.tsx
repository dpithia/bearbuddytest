import React, { useState } from "react";
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import {
  TabView,
  TabBar,
  Route,
  NavigationState,
  SceneRendererProps,
} from "react-native-tab-view";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";

type TabRoute = Route & {
  key: "journal" | "analytics";
  title: string;
};

const JournalTab = () => (
  <ScrollView style={styles.scrollView}>
    <ThemedView style={styles.journalContainer}>
      <View style={styles.dateHeader}>
        <ThemedText style={styles.dateText}>Today</ThemedText>
      </View>
      <View style={styles.emptyState}>
        <IconSymbol
          size={64}
          color="#FFA000"
          name="camera"
          style={styles.emptyIcon}
        />
        <ThemedText style={styles.emptyText}>
          Take a photo of your food to start tracking
        </ThemedText>
      </View>
    </ThemedView>
  </ScrollView>
);

const AnalyticsTab = () => (
  <ScrollView style={styles.scrollView}>
    <ThemedView style={styles.analyticsContainer}>
      <View style={styles.chartContainer}>
        <ThemedText style={styles.chartTitle}>Nutrition Overview</ThemedText>
        <View style={styles.placeholderChart}>
          <ThemedText>Charts Coming Soon</ThemedText>
        </View>
      </View>
      <View style={styles.insightsContainer}>
        <ThemedText style={styles.insightsTitle}>AI Insights</ThemedText>
        <View style={styles.placeholderInsights}>
          <ThemedText>AI-powered insights will appear here</ThemedText>
        </View>
      </View>
    </ThemedView>
  </ScrollView>
);

export default function ExploreScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState<TabRoute[]>([
    { key: "journal", title: "Journal" },
    { key: "analytics", title: "Analytics" },
  ]);

  const renderScene = ({ route }: { route: TabRoute }) => {
    switch (route.key) {
      case "journal":
        return <JournalTab />;
      case "analytics":
        return <AnalyticsTab />;
      default:
        return null;
    }
  };

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<TabRoute> }
  ) => (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicator}
      activeColor="#FFA000"
      inactiveColor="#5D4037"
      tabStyle={styles.tab}
    />
  );

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <IconSymbol
          size={48}
          color="#FFA000"
          name="fork.knife"
          style={styles.headerIcon}
        />
        <ThemedText type="title" style={styles.headerTitle}>
          Food Journal
        </ThemedText>
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={renderTabBar}
      />
    </ThemedView>
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
  },
  tabBar: {
    backgroundColor: "#FFF8E1",
    borderBottomWidth: 1,
    borderBottomColor: "#FFE0B2",
  },
  indicator: {
    backgroundColor: "#FFA000",
  },
  tabLabel: {
    fontWeight: "600",
    textTransform: "none",
  },
  tabContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tab: {
    paddingVertical: 8,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFF8E1",
  },
  journalContainer: {
    padding: 16,
  },
  dateHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#FFE0B2",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
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
    color: "#5D4037",
    textAlign: "center",
  },
  analyticsContainer: {
    padding: 16,
  },
  chartContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  placeholderChart: {
    height: 200,
    backgroundColor: "#FFF8E1",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  insightsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  placeholderInsights: {
    padding: 16,
    backgroundColor: "#FFF8E1",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
