import React, { useEffect, useRef } from "react";
import { Tabs, useRouter, usePathname } from "expo-router";
import { checkExistingBuddy } from "../../services/buddyService";

export default function TabLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const initialCheckDone = useRef(false);

  useEffect(() => {
    // Only check once on initial mount if we're on the index page
    // and we haven't already checked in the root layout
    if (
      !initialCheckDone.current &&
      (pathname === "/(tabs)" || pathname === "/(tabs)/index")
    ) {
      console.warn("[TabLayout] Running initial buddy check");

      const checkBuddy = async () => {
        try {
          const { hasBuddy } = await checkExistingBuddy();
          console.warn("[TabLayout] Buddy check result:", { hasBuddy });

          if (hasBuddy) {
            console.warn("[TabLayout] Redirecting to buddy screen");
            router.replace("/(tabs)/buddy");
          } else {
            console.warn("[TabLayout] No buddy found, staying on index");
          }
        } catch (error) {
          console.error("[TabLayout] Error checking buddy:", error);
        } finally {
          initialCheckDone.current = true;
        }
      };

      checkBuddy();
    }
  }, [pathname, router]);

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: "none" },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="buddy"
        options={{
          href: "/(tabs)/buddy",
        }}
      />
    </Tabs>
  );
}
