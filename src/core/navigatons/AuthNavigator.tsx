import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../features/auth/LoginScreen";
import SignUpScreen from "../features/auth/SignUpScreen";
import { SCREEN_NAMES } from "../constans/ScreenNames";
import OnboardingScreen from "../features/onboarding/OnboardingScreen";
import QRScanner from "../features/scaner/QRCodeScannerScreen";


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator 
        initialRouteName= {SCREEN_NAMES.ONBOARDING}
        screenOptions={{
            animation: "slide_from_bottom",
        }}
    >
        <Stack.Screen 
            name={SCREEN_NAMES.ONBOARDING}
            component={OnboardingScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen 
            name={SCREEN_NAMES.LOGIN}
            component={LoginScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen 
            name={SCREEN_NAMES.SIGN_UP}
            component={SignUpScreen}
            options={{ headerShown: true }}
        />
    </Stack.Navigator>
  );
};

export default AuthNavigator;