import React, { useEffect } from "react";
import { BackHandler } from "react-native";

const useBackButtonHandler = (
  step: number,
  setStep: React.Dispatch<React.SetStateAction<1 | 2>>
) => {
  useEffect(() => {
    const backAction = () => {
      if (step === 2) {
        setStep(1);
        return true; // impede o comportamento padrão (voltar)
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // cleanup
  }, [step]);
};

export default useBackButtonHandler;
