import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, ImageBackground, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LoginUser } from '../../services/service'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, Fonts, height, width } from '../../assets/Theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Snackbar, Checkbox } from 'react-native-paper';
import Input from '../reusables/Input'
import { setUserAuthToken } from '../../backendapi/index';
import LinearGradient from 'react-native-linear-gradient';
import { Button } from "react-native-paper";
import { clearUserEmail, getCheckStatus, getUserEmail, storeCheckStatus, storeUserEmail } from '../../utils/storeAndGetRememberMe'
import { PoweredByWema } from '../onboard/OnboardTabs'


const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [displaySnack, setDisplaySnack] = useState(false)
    const [passwordVisibility, setpasswordVisibility] = useState(true)
    const [responseMessage, setResponseMessage] = useState("")
    const [rememberMe, setrememberMe] = useState(false);
    // const [emailLoaded, setEmailLoaded] = useState(false);
    const first = require("../../assets/img/background.png");


    useEffect(() => {
        const fetchValuesFormStorage = async () => {
            try {
                const { emailValue } = await getUserEmail();
                const { checkValue } = await getCheckStatus();
                setrememberMe(checkValue);
                setEmail(emailValue);
                if (!checkValue) {
                    clearUserEmail();
                }
            } catch (error) {
                console.error('Error fetching checkValue or email:', error);
            }
        };
        fetchValuesFormStorage();
    }, []);


    const handleSubmit = async () => {

        const model = {
            email,
            password
        }

        if (!email || !password) {
            setDisplaySnack(true)
            setResponseMessage("Kindly fill in your email and pasword")
            return;
        }
        setLoading(true)
        await LoginUser(model).then((response) => {
            if (response.data.status) {
                AsyncStorage.setItem("user", JSON.stringify(response.data.returnObject))
                dispatch(login(response.data.returnObject))
                setUserAuthToken(response.data.returnObject.token)
                storeUserEmail(email);
                navigation.navigate("MainHeaderTabs")
            } else {
                setDisplaySnack(true)
                setResponseMessage(response?.data?.response)
            }
        }).catch(err => {
            console.log(err)
            setDisplaySnack(true)
            setResponseMessage("Something went wrong while login in, please check your credentials")
        })
            .finally(() => setLoading(false))
    }

    if (loading) {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: height }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    }

    const handleCheckboxPress = async () => {
        setrememberMe(!rememberMe);
        await storeCheckStatus(!rememberMe);
    };


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View>
                    <View style={{ position: 'relative' }}>
                        <ImageBackground source={first} style={{ width: "100%", height: height / 2, zIndex: -1, alignItems: "flex-end" }}>
                            <Image source={require("../../assets/img/ParrishLogo.png")} style={{ marginTop: 20, marginRight: 20 }} />
                        </ImageBackground>
                        <LinearGradient
                            colors={['rgba(79, 87, 101, 0)', 'white']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}
                            style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                        />

                    </View>
                    <View style={{ position: 'relative', top: -40 }}>
                        <Text style={{ fontFamily: Fonts.bold, marginTop: 10, fontSize: 25, color: "#3E3E3E", position: "absolute", top: -60, textAlign: 'center', width: '100%' }}>Login</Text>


                        <View style={styles.formControl}>
                            <Input placeholder="Email address" onChangeText={setEmail} value={email} outlineStyle={{ borderColor: "#939393" }} />
                        </View>
                        <View style={{ ...styles.formControl, marginTop: 20 }}>
                            <Input placeholder="Password" onChangeText={setPassword} value={password} outlineStyle={{ borderColor: "#939393" }} iconRight={'eye'} secureTextEntry={passwordVisibility} setpasswordVisibility={() => setpasswordVisibility(!passwordVisibility)} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 15, marginTop: 10 }}>
                            <View style={{ ...styles.formControl, flexDirection: "row", alignItems: 'center', gap: 1 }}>
                                <View style={{ borderWidth: Platform.OS == 'ios' ? 1 : 0, borderColor: COLORS.primary, borderRadius: 50, marginRight: Platform.OS == 'ios' ? 5 : 0 }}>
                                    <Checkbox
                                        status={rememberMe ? 'checked' : 'unchecked'}
                                        color={COLORS.primary}
                                        onPress={handleCheckboxPress}
                                    />
                                </View>
                                <Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: COLORS.black }}>Remember me?</Text>
                            </View>
                            {/* Check ForgotPassword.jsx to know what type params means :) */}
                            <Button mode="text" textColor={COLORS.black} onPress={() => navigation.navigate("ForgotPassword", { type: 1 })}>
                                <Text style={{ fontFamily: Fonts.medium, fontSize: 13 }}>Forgot password</Text>
                            </Button>
                        </View>

                        <Button textColor="#FFFFFF" buttonColor={COLORS.primary} style={{ marginTop: 30, marginHorizontal: 20, borderRadius: 50 }} contentStyle={{ paddingVertical: 8 }} onPress={handleSubmit} mode="contained">
                            <Text style={{ fontSize: 14, fontFamily: Fonts.semibold, marginVertical: 20 }}>Login</Text>
                        </Button>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 20 }}>
                            <View>
                                <Text style={{ fontFamily: Fonts.medium, color: COLORS.black, marginRight: 20, fontSize: 13 }}>Don't have an account?</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                                        <Text style={{ fontFamily: Fonts.semibold, fontSize: 13, color: COLORS.primary }}>Register</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => navigation.navigate("MainHeaderTabs")}>
                                    <Text style={{ fontFamily: Fonts.medium, color: COLORS.black, fontSize: 13 }}>Skip to feeds</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 30, gap: 20 }}>
                            <View>
                                <Text style={{ fontFamily: Fonts.regular, color: "#696969", fontSize: 12, marginLeft: 5 }}>Powered By</Text>
                                <Image source={require("../../assets/img/churchplusblueLogo.png")} style={{ width: 60, height: 40, marginLeft: 5 }} />
                            </View>
                            <PoweredByWema style={{ width: 60, height: 40 }} />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            {/* <TouchableOpacity style={{ backgroundColor: COLORS.white, paddingVertical: 20, flexDirection: "row", justifyContent: "center", alignItems: "center" }} onPress={() => navigation.navigate("MainHeaderTabs")}>
                <Text style={{ textAlign: 'center', fontFamily: Fonts.regular, fontWeight: "700", color: COLORS.black, marginRight: 5 }}>Skip to feeds</Text>
                <Icon name={"arrow-forward-ios"} size={10} />
                <Icon name={"arrow-forward-ios"} size={10} />
                <Icon name={"arrow-forward-ios"} size={10} />
            </TouchableOpacity> */}
            <Snackbar
                visible={displaySnack}
                duration={4000}
                style={{ backgroundColor: "#000000" }}
                onDismiss={() => setDisplaySnack(false)}
            >
                <Text style={{ color: "#FFFFFF" }}>{responseMessage}</Text>
            </Snackbar>
        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    formControl: {
        // borderWidth: 1,
        // borderColor: '#eee',
        marginHorizontal: 20,
        // paddingHorizontal: 15,
        // borderRadius: 10,
        // flexDirection: 'row',
        // marginTop: 20,
        // alignItems: 'center'
    }
})