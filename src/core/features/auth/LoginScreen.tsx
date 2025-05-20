import React, { useState } from "react";
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; // Import the eye icon
import { useAuth } from "../../auth/AuthContext";
import { SCREEN_NAMES } from "../../constans/ScreenNames";
import { fontSize, responsiveSize, spacing } from "../../utils/SizeFactors";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const authContext = useAuth();
  const user = authContext?.user;
  const signIn = authContext?.signIn;

  const handleLogin = async () => {
      try {
        signIn && await signIn({ email, password });
        if (user) {
          Alert.alert("Login successful", `Welcome ${user.email}`);
        } else {
          console.log("No user logged in");
        }
      } catch (error) {
        console.error("Login error:", error);
        Alert.alert("Login failed", "Please check your credentials and try again.");
      }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword} // Toggle visibility
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? "visibility" : "visibility-off"} // Eye icon
            size={responsiveSize(20)}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
      <Button 
        title="Do not have an account?" 
        onPress={() => navigation.navigate(SCREEN_NAMES.SIGN_UP)} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing(20), // Responsive padding
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: fontSize(24), // Responsive font size
    fontWeight: 'bold',
    marginBottom: spacing(20), // Responsive spacing
    textAlign: 'center',
  },
  input: {
    height: responsiveSize(50), // Responsive height
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: responsiveSize(8), // Responsive border radius
    paddingHorizontal: spacing(15), // Responsive padding
    marginBottom: spacing(15), // Responsive spacing
    backgroundColor: '#fff',
    fontSize: fontSize(14), // Responsive font size
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: responsiveSize(8), // Responsive border radius
    paddingHorizontal: spacing(15), // Responsive padding
    marginBottom: spacing(15), // Responsive spacing
    backgroundColor: "#fff",
  },
  passwordInput: {
    flex: 1,
    height: responsiveSize(50), // Responsive height
    fontSize: fontSize(14), // Responsive font size
  },
  button: {
    backgroundColor: '#007AFF',
    height: responsiveSize(50), // Responsive height
    borderRadius: responsiveSize(8), // Responsive border radius
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing(10), // Responsive spacing
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize(16), // Responsive font size
    fontWeight: '600',
  },
});

export default LoginScreen;