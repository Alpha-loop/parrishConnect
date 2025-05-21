import { View, Text, ScrollView, SafeAreaView, Image, TouchableOpacity } from "react-native";
import { COLORS, Fonts, width } from "../../assets/Theme";
import { StackHeader } from "../reusables/index";
import { TouchableRipple } from "react-native-paper";
import { BarcodeIcon, CloseIcon, MapPin } from "../../assets/img/icons";
import dateFormatter from "../../utils/dateFormatter";
import AutoHeightImage from 'react-native-auto-height-image';
import { useEffect, useState } from "react";
import { SwipeModal } from "../reusables/Modal";
import { CheckUserSyncedData, GetAttendanceQRCode } from "../../services/service";
import { useSelector } from "react-redux";
import { Button } from "react-native-paper";

const EventDetails = ({ navigation, route }) => {
    const { data } = route.params;
    const churchInfo = useSelector((state) => state.user.churchInfo);
    const userInfo = useSelector((state) => state.user.userInfo);
    const [displayQRCode, setDisplayQRCode] = useState(false)
    const [QRCode, setQRCode] = useState(false)

    useEffect(() => {
        getQRCode();
    }, [])

    const getQRCode = async () => {
        let payload = {
            userId: userInfo.userId,
            attendanceCode: data.attendanceCode,
            tenantId: churchInfo.tenantId
        }
        try {
            let { data } = await GetAttendanceQRCode(payload);
            setQRCode(data.returnObject)
            // console.log(data, 'reea');
        } catch (error) {
            console.error(error)
        }
    }

    const ScanCode = () => {
        setDisplayQRCode(true);
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>
                <View>
                    <StackHeader title="Check In" goBack={() => navigation.goBack()} />
                    {
                        data.uri ? (
                            <View>
                                <AutoHeightImage width={width} source={{ uri: data.bannerUrl }} />
                            </View>
                        ) : null
                    }
                    <View style={{ padding: 20 }}>
                        <Text style={{ fontFamily: Fonts.medium, fontSize: 16, color: "rgba(0, 0, 0, 0.8)", fontWeight: 700, marginTop: 2 }}>{data.fullEventName}</Text>
                        <Text style={{ fontFamily: Fonts.light, color: "rgba(2, 2, 2, 0.6)", fontSize: 13, marginTop: 10 }}>{data.eventDetails}</Text>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 30 }}>
                            <View>
                                <Text style={{ fontFamily: Fonts.light, color: COLORS.black, fontSize: 13 }}>group</Text>
                                <Text style={{ fontFamily: Fonts.medium, fontSize: 15, color: "rgba(0, 0, 0, 0.8)", fontWeight: 600, marginTop: 1 }}>{data.fullGroupName}</Text>
                            </View>
                            <View>
                                <Text style={{ fontFamily: Fonts.light, color: COLORS.black, fontSize: 13 }}>Date</Text>
                                <Text style={{ fontFamily: Fonts.medium, fontSize: 15, color: "rgba(0, 0, 0, 0.8)", fontWeight: 600, marginTop: 1 }}>{dateFormatter.monthDayYear(data.eventDate)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={{ marginHorizontal: 20, marginBottom: 10 }}>
                <TouchableRipple rippleColor="#eee" style={{ marginTop: 30, padding: 13, borderRadius: 10, backgroundColor: "rgba(4, 54, 81, 1)" }} onPress={ScanCode}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
                        <BarcodeIcon size={30} color={'white'} />
                        <Text style={{ fontFamily: Fonts.medium, color: COLORS.white, textAlign: 'center' }}> Scan a QRcode</Text>
                    </View>
                </TouchableRipple>
                <TouchableRipple rippleColor="#eee" style={{ marginTop: 10, marginBottom: 15, padding: 13, borderRadius: 10, backgroundColor: "rgba(3, 157, 244, 0.8)" }}>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5 }}>
                        <MapPin size={30} color={'white'} />
                        <Text style={{ fontFamily: Fonts.medium, color: COLORS.white, textAlign: 'center' }}>Location Based</Text>
                    </View>
                </TouchableRipple>
            </View>
            <ScanQRModal scanQRModal={displayQRCode} setScanQRModal={() => setDisplayQRCode(false)} data={QRCode} userInfo={userInfo} churchInfo={churchInfo} navigation={navigation} />
        </SafeAreaView>
    );
};

const ScanQRModal = ({ scanQRModal, setScanQRModal, data, userInfo, churchInfo, navigation }) => {
    const [profileUpdated, setProfileUpdated] = useState(false)
    const [checkingProfileStatus, isCheckingProfileStatus] = useState(false)
    const [isNewUser, setIsNewUser] = useState(false)

    useEffect(() => {
        checkUserSyncedData()
    }, [userInfo, churchInfo])

    const checkUserSyncedData = async () => {
        isCheckingProfileStatus(true)
        let payload = {
            email: userInfo.email,
            tenantId: churchInfo.tenantId
        }

        try {
            const { data } = await CheckUserSyncedData(payload);
            if (data.returnObject.isNewUser) {
                setIsNewUser(true)
            } else {
                setIsNewUser(false)
            }
            isCheckingProfileStatus(false)
        }
        catch (err) {
            console.error(err)
            isCheckingProfileStatus(false)
        }
    }

    const navigateToProfile = () => {
        setScanQRModal()
        setTimeout(() => {
            navigation.navigate('ManageProfile')
        }, 400);
    }
    return (
        <SwipeModal visible={scanQRModal} closeModal={setScanQRModal} height="80%">
            <TouchableOpacity onPress={setScanQRModal} style={{ position: "absolute", right: 30, top: 15 }}>
                <CloseIcon />
            </TouchableOpacity>
            <View style={{ alignItems: "center", height: "100%", marginTop: -10 }}>
                {
                    !isNewUser ? (
                        <View>
                            <Text style={{ fontFamily: Fonts.extrabold, fontSize: 22, color: "rgba(0, 0, 0, 0.8)", textAlign: "center" }}>Show this QR Code  </Text>
                            <Text style={{ fontFamily: Fonts.extrabold, fontSize: 22, color: "rgba(0, 0, 0, 0.8)", textAlign: "center", marginTop: -5 }}>at the venue</Text>
                            <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.8)", textAlign: 'center', marginTop: 5 }}>Scan the QR Code Below</Text>
                            <View style={{ marginTop: 20 }}>
                                <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 30 }}>
                                    {data ? (
                                        <Image style={{ width: 250, height: 250, resizeMode: "contain" }} source={{ uri: data }} />
                                    ) : null
                                    }
                                </View>
                            </View>
                        </View>
                    ) : (
                        <>
                            <Text style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.8)", textAlign: 'center', marginTop: 20 }}>To scan the code, kindly update your profile</Text>
                            <Button textColor="#FFFFFF" style={{ marginTop: 20, marginBottom: 15, padding: 3, borderRadius: 15, backgroundColor: COLORS.primary }} mode="contained" onPress={navigateToProfile}>
                                <Text>Update your profile</Text>
                            </Button>
                        </>
                    )
                }
            </View>
        </SwipeModal>
    );
}

export default EventDetails;