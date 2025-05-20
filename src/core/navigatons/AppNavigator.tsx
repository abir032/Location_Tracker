import React from "react"; 

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAMES } from "../constans/ScreenNames";
import QRScanner from "../features/scaner/QRCodeScannerScreen";

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator 
        initialRouteName= {SCREEN_NAMES.QR_SCANNER}
        screenOptions={{
            animation: "slide_from_bottom",
        }}
    >
        <Stack.Screen 
            name={SCREEN_NAMES.QR_SCANNER}
            component={QRScanner}
            options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
};