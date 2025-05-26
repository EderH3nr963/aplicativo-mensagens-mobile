import { Text, useTheme } from "@ui-kitten/components";
import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function ModalAlert({
  msg,
  type,
}: {
  msg: string;
  type: "success" | "danger" | "warning";
}) {
  const theme = useTheme();

  const animModalAlert = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    if (!msg) return;

    Animated.timing(animModalAlert, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [msg]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        bottom: 40,
        marginHorizontal: 30,
        width: "100%",
        minHeight: 50,
        transform: [{ translateY: animModalAlert }],
        justifyContent: "center",
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: theme[`color-${type}-300`],
        borderColor: theme[`color-${type}-800`],
        borderWidth: 1,
      }}
    >
      <Text style={{ color: theme[`color-${type}-800`] }}>{msg}</Text>
    </Animated.View>
  );
}
