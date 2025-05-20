// filepath: /Users/mdfahimfaezabir/Desktop/Workspace/projects/live_location_tracker/src/core/navigatons/RootNavigator.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../auth/AuthContext";
import AuthNavigator from "./AuthNavigator";
import { AppNavigator } from "./AppNavigator";
import Loader from "../components/Loader";


const RootNavigator = () => {
  const { user, isLoading } = useAuth();
  const isLoggedIn = user !== null;
  if(isLoading) {
    return (
      <Loader/>
    )
  }
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;