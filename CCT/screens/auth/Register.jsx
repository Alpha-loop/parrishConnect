import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Onboard, RegisterUser } from '../../services/service';
import { useSelector } from 'react-redux';
import { COLORS, Fonts, height } from '../../assets/Theme';
import { Snackbar, TouchableRipple } from 'react-native-paper';
import Input from '../reusables/Input';
import { setUserAuthToken } from '../../backendapi/index';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/userSlice'
import LinearGradient from 'react-native-linear-gradient';
import { Button } from "react-native-paper";
import { PoweredByWema } from '../onboard/OnboardTabs';

const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const info = useSelector((state) => state.user.churchInfo);
    const [name, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [displaySnack, setDisplaySnack] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const [successInfo, setSuccessInfo] = useState(false)
    const [passwordVisibility, setpasswordVisibility] = useState(true)
    const first = require("../../assets/img/background.png");


    const handleSubmit = async () => {
        const model = {
            name,
            // userId: "00000000-0000-0000-0000-000000000000",
            email,
            tenantID: info?.tenantId,
            password,
            phoneNumber
        }

        if (!name || !email || !password) {
            setDisplaySnack(true)
            setResponseMessage("Kindly fill in all fields")
            return;
        }
        setLoading(true)
        await RegisterUser(model).then((response) => {
            setLoading(false);
            if (!response?.data?.returnObject) {
                setDisplaySnack(true)
                setResponseMessage("🙂  This email already exist, instead login with it");
                return;   
            }
            if (response.data.status) {
                AsyncStorage.setItem("user", JSON.stringify(response.data.returnObject.value.returnObject))
                dispatch(login(response.data.returnObject.value.returnObject))
                setUserAuthToken(response.data.returnObject.value.returnObject.token)
                setSuccessInfo(true)
                setDisplaySnack(true)
                setResponseMessage("🎉   Your registration is successful.")
                setTimeout(() => {
                    navigation.navigate("MainHeaderTabs")
                }, 1000);
            }
        }).catch(err => console.log(err))
            .finally(() => setLoading(false))
    }

    // if (loading) {
    //     return (
    //         <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: height }}>
    //             <ActivityIndicator size="large" color={COLORS.primary} />
    //         </View>
    //     )
    // }
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                {/* <View style={{ backgroundColor: COLORS.primary, height: 50, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <Icon name={"arrow-back-ios"} color={COLORS.white} size={20} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: Fonts.bold, fontSize: 16, color: COLORS.white, alignItems: 'center', textAlign: 'center', justifyContent: 'space-around' }}>Personal Details</Text>
                    <Text style={{}}></Text>
                </View> */}

                <View>
                <View style={{ position: 'relative' }}>
                        <ImageBackground source={first} style={{ width: "100%", height: height / 2.6, zIndex: -1, alignItems: "flex-end" }}>
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
                        <Text style={{ fontFamily: Fonts.bold, marginTop: 10, fontSize: 25, color: "#3E3E3E", position: "absolute", top: -40, textAlign: 'center', width: '100%' }}>Register</Text>
                        <View style={styles.formControl}>
                            <Input placeholder="Full Name" onChangeText={setFullName} outlineStyle={{ borderColor: "#939393" }} value={name} />
                        </View>
                        <View style={styles.formControl}>
                            <Input placeholder="Your Email" onChangeText={setEmail} value={email} outlineStyle={{ borderColor: "#939393" }} />
                        </View>
                        <View style={styles.formControl}>
                            <Input placeholder="Password" onChangeText={setPassword} value={password} outlineStyle={{ borderColor: "#939393" }} iconRight={'eye'} secureTextEntry={passwordVisibility} setpasswordVisibility={() => setpasswordVisibility(!passwordVisibility)} />
                        </View>
                        <Button textColor="#FFFFFF" loading={loading} buttonColor={COLORS.primary} style={{ marginTop: 30, marginHorizontal: 20, borderRadius: 50 }} contentStyle={{ paddingVertical: 8 }} onPress={handleSubmit} mode="contained">
                            <Text style={{ fontSize: 14, fontFamily: Fonts.semibold, marginVertical: 20 }}>Register</Text>
                        </Button>
                        <View style={{ alignItems: 'center', marginHorizontal: 20, marginTop: 20 }}>
                            <Text style={{ fontFamily: Fonts.medium, color: COLORS.black, marginRight: 20, textAlign: "center" }}>Already a member?</Text>
                            <Button mode="text" textColor={COLORS.primary} onPress={() => navigation.navigate("Login")}>
                                <Text style={{ fontFamily: Fonts.bold }}>Login</Text>
                            </Button>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 5, gap: 20 }}>
                        <View>
                            <Text style={{ fontFamily: Fonts.regular, color: "#696969", fontSize: 12, marginLeft: 5 }}>Powered By</Text>
                            <Image source={require("../../assets/img/churchplusblueLogo.png")} style={{ width: 60, height: 40, marginLeft: 5 }} />
                        </View>
                        <PoweredByWema style={{ width: 60, height: 40 }} />
                    </View>
                </View>
            </SafeAreaView>
            <Snackbar
                visible={displaySnack}
                duration={4000}
                style={{ backgroundColor: successInfo ? "#3CBF98" : "#000000" }}
                onDismiss={() => setDisplaySnack(false)}
            >
                <Text style={{ color: "#FFFFFF" }}>{responseMessage}</Text>
            </Snackbar>
        </>
    )
}

export default Register

const styles = StyleSheet.create({
    formControl: {
        // borderWidth: 1,
        // borderColor: '#eee',
        marginHorizontal: 20,
        marginTop: 20
        // paddingHorizontal: 15,
        // borderRadius: 10,
        // flexDirection: 'row',
        // marginTop: 20,
        // alignItems: 'center'
    },
    container: {
        elevation: 2,
        height: 170,
        width: 170,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    }
})