// hooks/useAuthCheck.ts
import { IsLoggedContext } from "@/context/loggedContext";
import { veirfyTokenRequest } from "@/services/authService";
import { replace } from "expo-router/build/global-state/routing";
import * as SecureStore from "expo-secure-store";
import { useContext, useEffect } from "react";

export function useAuthCheck() {
  const context = useContext(IsLoggedContext);

  useEffect(() => {
    if (!context) return;

    (async () => {
      const token = await SecureStore.getItem("token_jwt");

      if (!token) {
        replace("/(auth)/login");
        return;
      }

      try {
        const { data } = await veirfyTokenRequest(token);

        console.log("Hello world");
        if (data.status === "success") {
          context.setIsLogged(true);
        } else {
          replace("/(auth)/login");
        }
      } catch (err: any) {
        console.log(err);
        replace("/(auth)/login");
      }
    })();
  }, [context]);
}
