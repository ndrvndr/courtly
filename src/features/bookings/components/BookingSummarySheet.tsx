import { formatPrice } from "@/utils/formatPrice";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  Text,
  View,
} from "react-native";
import type { CourtAvailability, Slot } from "../types";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const CLOSE_THRESHOLD = 100; // px drag ke bawah sebelum dianggap "tutup"

interface Props {
  visible: boolean;
  onClose: () => void;
  facilityName: string;
  court: CourtAvailability;
  slot: Slot;
  date: string;
  isPending: boolean;
  onConfirm: () => void;
}

export function BookingSummarySheet({
  visible,
  onClose,
  facilityName,
  court,
  slot,
  date,
  isPending,
  onConfirm,
}: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const sheetTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  const animateIn = () => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(sheetTranslateY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }),
    ]).start();
  };

  const animateOut = (callback: () => void) => {
    Animated.parallel([
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(sheetTranslateY, {
        toValue: SCREEN_HEIGHT,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(callback);
  };

  useEffect(() => {
    if (visible) {
      setModalVisible(true); // mount native modal dulu
    } else if (modalVisible) {
      animateOut(() => setModalVisible(false)); // animasi keluar, BARU unmount setelah selesai
    }
  }, [visible]);

  useEffect(() => {
    if (modalVisible && visible) {
      // pastikan posisi awal sebelum animasi masuk (penting kalau sheet dibuka ulang)
      sheetTranslateY.setValue(SCREEN_HEIGHT);
      backdropOpacity.setValue(0);
      animateIn();
    }
  }, [modalVisible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 2,
      onMoveShouldSetPanResponderCapture: (_, gesture) =>
        Math.abs(gesture.dy) > 2,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          sheetTranslateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > CLOSE_THRESHOLD) {
          onClose();
        } else {
          Animated.spring(sheetTranslateY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
      onPanResponderTerminationRequest: () => false,
    }),
  ).current;

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!modalVisible) return null;

  return (
    <Modal
      visible={modalVisible}
      animationType="none"
      transparent
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end">
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            opacity: backdropOpacity,
          }}
        >
          <Pressable style={{ flex: 1 }} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={{ transform: [{ translateY: sheetTranslateY }] }}
          className="p-5 bg-white rounded-t-2xl"
        >
          <View
            {...panResponder.panHandlers}
            style={{
              paddingVertical: 16,
              marginTop: -16,
              alignItems: "center",
            }}
            className="mb-2"
          >
            <View className="w-10 h-1 bg-gray-300 rounded-full" />
          </View>

          <Text className="mb-4 text-lg font-bold">Confirm Booking</Text>

          <View className="gap-3 mb-5">
            <View className="flex-row gap-2 items-center">
              <Ionicons name="business-outline" size={18} color="#4b5563" />
              <Text className="flex-1 text-sm text-gray-700">
                {facilityName}
              </Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Ionicons name="grid-outline" size={18} color="#4b5563" />
              <Text className="flex-1 text-sm text-gray-700">{court.name}</Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Ionicons name="calendar-outline" size={18} color="#4b5563" />
              <Text className="flex-1 text-sm text-gray-700">
                {formattedDate}
              </Text>
            </View>
            <View className="flex-row gap-2 items-center">
              <Ionicons name="time-outline" size={18} color="#4b5563" />
              <Text className="flex-1 text-sm text-gray-700">
                {slot.startTime} - {slot.endTime}
              </Text>
            </View>
          </View>

          <View className="flex-row justify-between items-center pt-4 mb-5 border-t border-gray-100">
            <Text className="text-sm text-gray-500">Total Price</Text>
            <Text className="text-lg font-bold text-blue-600">
              {formatPrice(slot.price)}
            </Text>
          </View>

          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onConfirm();
            }}
            disabled={isPending}
            className="items-center py-4 bg-blue-600 rounded-lg disabled:opacity-50"
          >
            {isPending ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="font-semibold text-white">Confirm Booking</Text>
            )}
          </Pressable>

          <Pressable onPress={onClose} className="items-center py-3">
            <Text className="text-sm text-gray-500">Cancel</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}
