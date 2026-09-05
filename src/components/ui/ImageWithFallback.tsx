import { Ionicons } from "@expo/vector-icons";
import { Image, type ImageProps } from "expo-image";
import { useState } from "react";
import { Text, View } from "react-native";

interface Props extends Omit<ImageProps, "source" | "onError"> {
  uri?: string | null;
  fallbackIconSize?: number;
}

export function ImageWithFallback({
  uri,
  fallbackIconSize = 32,
  style,
  ...rest
}: Props) {
  const [failed, setFailed] = useState(false);

  if (!uri || failed) {
    return (
      <View style={style} className="justify-center items-center bg-gray-100">
        <Ionicons
          name="image-outline"
          size={fallbackIconSize}
          color="#9ca3af"
        />
        <Text className="mt-1 text-xs text-gray-400">No image available</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={style}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
