import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Linking, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera, useCameraDevice, useCodeScanner } from 'react-native-vision-camera';
import Icon from "react-native-vector-icons/MaterialIcons"; 
import LottieView from 'lottie-react-native';
import { useAuth } from '../../auth/AuthContext';
import { fontSize, iconSize } from '../../utils/SizeFactors';
import { COLORS } from '../../utils/ColorSet';


const QRScanner = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const device = useCameraDevice('back');
  const { signOut } = useAuth();
  const { height } = Dimensions.get('window');

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  // // Permission/device checks (optional, wrap in SafeAreaView)
  // if (!hasPermission) {
  //   return (
  //     <SafeAreaView style={styles.centered}>
  //       <Text>Requesting for camera permission</Text>
  //     </SafeAreaView>
  //   );
  // }
  // if (device == null) {
  //   return (
  //     <SafeAreaView style={styles.centered}>
  //       <Text>Device not found</Text>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Row: Drawer (left) & Logout (right) */}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.iconButton} onPress={() => {/* open drawer logic */}}>
          <Icon name="menu" size={iconSize(30)} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={signOut}>
          <Icon name="logout" size={iconSize(30)} color="white" />
        </TouchableOpacity>
      </View>

      {/* Middle: Lottie Animation */}
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../../assets/animations/AnimationQR.json')}
          autoPlay
          style={{ width: '100%', height: height * 0.4, alignSelf: 'center' }}
        />
      </View>

      {/* Bottom: Scan Now Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.scanButton} onPress={() => {/* scan logic */}}>
          <Text style={styles.scanButtonText}>Scan Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.bgColor,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  iconButton: {
    padding: 8,
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  scanButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 30,
    alignItems: 'center',
  },
  scanButtonText: {
    color: 'white',
    fontSize: fontSize(18),
    fontWeight: 'bold',
  },
});

export default QRScanner;