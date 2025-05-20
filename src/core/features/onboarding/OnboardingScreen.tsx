import React, { useState } from "react"; 
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    ActivityIndicator,
    Dimensions
} from "react-native"; 
import LottieView from "lottie-react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { SCREEN_NAMES } from "../../constans/ScreenNames";
import { fontSize, responsiveSize, spacing } from "../../utils/SizeFactors";

const OnboardingScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { height, width } = Dimensions.get("window");

    const handlePress = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigation.navigate(SCREEN_NAMES.LOGIN);
        }, 2000); 
    };

    return (
        <View style={styles.container}>
            <LottieView
                source={require("../../assets/animations/tracker.json")}
                autoPlay
                loop
                style={{
                    width: responsiveSize(width * 0.8), // 80% of screen width
                    height: responsiveSize(height * 0.5), // 40% of screen height
                    marginBottom: spacing(20), // Add spacing between Lottie and text
                }}
            />  
            <Text style={styles.title}>Track devices in real-time!</Text>
            <Text style={styles.subtitle}>Get started by creating an account or logging in.</Text>
            <TouchableOpacity 
                style={styles.button}
                onPress={handlePress}
                disabled={isLoading} 
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                    <Text style={styles.buttonText}>Get Started</Text>
                )}
            </TouchableOpacity>
        </View>
    );  
}

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        paddingHorizontal: spacing(20), // Add padding for better spacing
    },
    title: {
        fontSize: fontSize(24), // Responsive font size
        fontWeight: "bold",
        marginBottom: spacing(10), // Adjust spacing between title and subtitle
        textAlign: "center",
    },
    subtitle: {
        fontSize: fontSize(16), // Responsive font size
        textAlign: "center",
        marginBottom: spacing(20), // Add spacing between subtitle and button
    },
    button: {
        marginTop: spacing(10), // Adjust spacing above the button
        padding: spacing(10), // Responsive padding
        backgroundColor: "#007AFF",
        borderRadius: responsiveSize(5), // Responsive border radius
        justifyContent: "center",
        alignItems: "center",
        width: responsiveSize(150), // Responsive button width
        height: responsiveSize(50), // Responsive button height
    },
    buttonText: {
        color: Colors.white,
        fontSize: fontSize(16), // Responsive font size
    },
});