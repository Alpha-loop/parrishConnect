import { StyleSheet, Text, View, SafeAreaView, Image, ActivityIndicator, ImageBackground, Animated, Easing, Alert, Linking, BackHandler } from 'react-native'
import React, { useEffect, useRef } from 'react'
// import Icon from 'react-native-vector-icons/FontAwesom e';
import { COLORS, width, height } from '../assets/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setChurch } from '../redux/userSlice';
import { login } from '../redux/userSlice'
import { setUserAuthToken } from '../backendapi/index';
import { useIsFocused } from "@react-navigation/native";
import usePushNotification from '../utils/usePushNotification';
import VersionCheck from 'react-native-version-check';

const logo = require("../assets/img/ParrishLogo.png");

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const rotationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isFocused) {
            checkVersion()
        }
    }, [isFocused])
    const { subscribeTopic } = usePushNotification();

    const fetchData = async () => {
        try {
            const value = await AsyncStorage.getItem("church")
            if (value) {
                const parsedChurchInfo = JSON.parse(value)

                // Subscribe to push notification topics
                const mediaTopic = `media${parsedChurchInfo.tenantId}`
                const feedTopic = `feed${parsedChurchInfo.tenantId}`
                subscribeTopic(mediaTopic);
                subscribeTopic(feedTopic);

                // Save churchInfo to redux state
                dispatch(setChurch(parsedChurchInfo))

                // Open deep link if available
                try {
                    const url = await Linking.getInitialURL()
                        if (url) {
                            const route = url?.replace(/.*?:\/\//g, "");
                            const id = route.split('/').pop()
                            if (route.includes('feeddetail')) {
                                navigation.navigate('FeedsDetail', { id });
                            }
                            // Add other unique naviation screens here
                        } else {
                            const user = await AsyncStorage.getItem("user")
                            if (user) {
                                // if user exist check if its token has expired
                                if (isDateTimeExpired(user.expiryTime)) {
                                    // logout out user
                                    setTimeout(() => {
                                        logOut()
                                    }, 3000);
                                    return;
                                }
                                const userInfo = JSON.parse(user)
                                dispatch(login(userInfo))
                                setUserAuthToken(userInfo.token)
                                setTimeout(() => {
                                    navigation.navigate("MainHeaderTabs")
                                }, 3000);
                            } else {
                                setTimeout(() => {
                                    navigation.navigate("Login")
                                }, 3000);
                            }
                        }
                } catch(err) {
                    console.log(err, "Unable to open url")
                }
            } else {
                setTimeout(() => {
                    navigation.navigate("First")
                }, 3000);
            }
            // setData(JSON.parse(value) || initialValue)
        } catch (error) {
            console.error(`useAsyncStorage getItem} error:`, error)
        }
    }

    useEffect(() => {
        Animated.timing(rotationValue, {
            toValue: 1,
            duration: 2500, // Adjust duration as needed
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true, // Enable native driver for better performance
        }).start();
    }, [])



    const checkVersion = async () => {
        try {
            let updateNeeded = await VersionCheck.needUpdate();
            if (updateNeeded && updateNeeded.isNeeded) {
                Alert.alert(
                    'Update Available',
                    'You will have to update your app to the latest version to continue using it 🙂',
                    [
                        {
                            text: 'Update',
                            onPress: () => {
                                BackHandler.exitApp();
                                Linking.openURL(updateNeeded.storeUrl)
                                .catch(err => {
                                    console.error('Error opening the App Store: ', err);
                                });
                            }
                        }
                    ],
                    { cancelable: false })
            } else {
                fetchData()
            }
        } catch (error) { }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center', height: '100%' }}>
                <ImageBackground source={require("../assets/img/splash_image.png")} style={{ width, height }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height }}>
                        <Animated.Image
                            source={logo}
                            style={{
                                width: 150,
                                height: 150,
                                transform: [
                                    {
                                        rotate: rotationValue.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '360deg'],
                                        }),
                                    },
                                ],
                            }}
                        />
                    </View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})