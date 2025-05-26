import { Icon, IconProps } from "@ui-kitten/components";
import React from "react";
import { TouchableWithoutFeedback } from "react-native";

interface EyeIconProps extends IconProps {
  secureEntry: boolean;
  toggleSecureEntry: () => void;
}

export const RenderEyeIcon = ({
  secureEntry,
  toggleSecureEntry,
  ...props
}: EyeIconProps): React.ReactElement => {
  return (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
};
