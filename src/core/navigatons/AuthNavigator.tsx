import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../features/auth/LoginScreen";
import SignUpScreen from "../features/auth/SignUpScreen";
import { SCREEN_NAMES } from "../constans/ScreenNames";


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator 
        initialRouteName= {SCREEN_NAMES.LOGIN}
        screenOptions={{
            animation: "slide_from_bottom",
        }}
    >
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