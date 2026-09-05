import { zodResolver } from "@hookform/resolvers/zod";
import * as Haptics from "expo-haptics";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
    ActivityIndicator,
    Pressable,
    Text,
    TextInput,
    View,
} from "react-native";
import { getAuthErrorMessage, useRegister } from "../hook";
import { registerSchema, type RegisterFormValues } from "../schema";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate, isPending, error } = useRegister();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = (values: RegisterFormValues) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    mutate(values);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-white">
      <Text className="mb-1 text-3xl font-bold">Create Account</Text>
      <Text className="mb-8 text-gray-500">
        Sign up to start booking your favorite courts
      </Text>

      <Text className="mb-1 text-sm font-medium">Full Name</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="px-4 py-3 mb-1 rounded-lg border border-gray-300"
            placeholder="Jane Doe"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.name && (
        <Text className="mb-2 text-xs text-red-500">{errors.name.message}</Text>
      )}

      <Text className="mt-3 mb-1 text-sm font-medium">Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="px-4 py-3 mb-1 rounded-lg border border-gray-300"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.email && (
        <Text className="mb-2 text-xs text-red-500">
          {errors.email.message}
        </Text>
      )}

      <Text className="mt-3 mb-1 text-sm font-medium">Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="px-4 py-3 mb-1 rounded-lg border border-gray-300"
            placeholder="Min. 8 characters, with uppercase & number"
            secureTextEntry={!showPassword}
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.password && (
        <Text className="mb-2 text-xs text-red-500">
          {errors.password.message}
        </Text>
      )}

      <Pressable onPress={() => setShowPassword((v) => !v)} className="mb-4">
        <Text className="text-xs text-blue-600">
          {showPassword ? "Hide password" : "Show password"}
        </Text>
      </Pressable>

      {error && (
        <Text className="mb-3 text-sm text-red-500">
          {getAuthErrorMessage(error)}
        </Text>
      )}

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        className="items-center py-4 mb-4 bg-blue-600 rounded-lg disabled:opacity-50"
      >
        {isPending ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="font-semibold text-white">Sign Up</Text>
        )}
      </Pressable>

      <View className="flex-row justify-center">
        <Text className="text-gray-500">Already have an account? </Text>
        <Link href="/(auth)/login" className="font-medium text-blue-600">
          Sign In
        </Link>
      </View>
    </View>
  );
}
