import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, FlatList, Linking } from 'react-native'
import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Fonts, Light, width } from '../../assets/Theme'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChurchProfile } from '../../services/dashboard';
import { useDispatch } from 'react-redux';
import { setChurch, login } from '../../redux/userSlice';
import { StackHeader } from '../reusables/index';
import { TouchableRipple } from "react-native-paper";
import { setUserAuthToken } from '../../backendapi/index';

const ChurchProfiles = ({ navigation, route }) => {
    const { data } = route.params;
    const dispatch = useDispatch()
    // const tabs = fullProfile?.customAbouts?.length > 0 ? ['Pastors'].concat(fullProfile?.customAbouts.map(i => i.title)) : []

    useEffect(() => {
        getChurchProfile()
        console.log('here');
    }, [])

    const [services, setServices] = useState([])
    const [churchAbout, setChurchAbout] = useState([])
    const [churchPastors, setChurchPastors] = useState([])
    const [churchLocation, setchurchLocation] = useState([])
    const [websiteUrl, setWebsiteUrl] = useState([])
    const getChurchProfile = async () => {
        try {
            let { data } = await ChurchProfile(datas.tenantId);
            setchurchLocation(data.returnObject.churchBranches)
            setChurchAbout(data.returnObject.customAbouts)
            setChurchPastors(data.returnObject.pastors)
            setWebsiteUrl(data.returnObject.websiteUrl)
        } catch (error) {
            console.log(error);
        }
    }

    const menus = churchAbout?.length > 0 ? ['Pastors'].concat(churchAbout?.map(i => i.title)) : []
    const [selectedTab, setSelectedTab] = useState('Pastors')
    const [datas, setDatas] = useState(data)

    const tabData = churchAbout?.length > 0 ? churchAbout?.find(i => i.title === selectedTab) : "";

    const handleSaveChurch = async (item) => {
        try {
            await AsyncStorage.setItem("church", JSON.stringify(item))
        } catch (error) {
            console.error(`useAsyncStorage setItem error:`, error)
        }

        // Save church details to state
        dispatch(setChurch(item))

        // Check if user is already logged in
        const user = await AsyncStorage.getItem("user")
        if (user) {
            const userInfo = JSON.parse(user)
            dispatch(login(userInfo))
            setUserAuthToken(userInfo.token)
            setTimeout(() => {
                navigation.navigate("MainHeaderTabs")
            }, 500);
        } else {
            setTimeout(() => {
                navigation.navigate("Login")
            }, 500);

        }
    }

    const goBack = () => {
        navigation.goBack();
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ backgroundColor: COLORS.primary, height: 50 }}>
                <StackHeader goBack={goBack} title="Church Profile" />
            </View>

            <View style={{ marginVertical: 20, width: '40%', alignSelf: 'center' }}>
                <Image source={{ uri: data.churchLogo || "https://placeholder.com/68x68" }} resizeMode='contain' height={100} />
                <Text style={{ color: Light.textColor, fontFamily: Fonts.medium, textAlign: 'center', marginTop: 5 }}>{data?.churchName}</Text>
            </View>

            {/* tabs */}
            <View style={{ height: 45, flexDirection: 'row', backgroundColor: 'rgba(223, 239, 255, 0.2)', alignItems: "center" }}>
                {menus?.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuTab(selectedTab, item)} onPress={() => setSelectedTab(item)}>
                        <Text style={styles.menuText(selectedTab, item)}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* content */}
            {tabData && (
                <View>
                    <View style={{ margin: 15 }}>
                        <Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: COLORS.black, lineHeight: 19 }}>
                            {tabData.details}
                        </Text>
                    </View>
                </View>)
            }
            {selectedTab.toLowerCase() === 'pastors' && (
                <View style={{ paddingBottom: 340 }}>
                    <View style={{ paddingHorizontal: 15 }}>
                        <FlatList
                            data={churchPastors}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => (
                                <View>
                                    {
                                        item.photoUrl ? (
                                            <Image source={{ uri: item.photoUrl }} resizeMode='cover' style={{ height: 170, width: (width / 2) - 25, marginTop: 20, borderRadius: 10 }} />
                                        ) : null
                                    }
                                    <Text style={{ fontFamily: Fonts.medium, color: COLORS.black, marginTop: 10, fontSize: 11, textAlign: 'center' }}>{item.name}</Text>
                                </View>
                            )}
                            numColumns={2}
                            columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
                        />
                    </View>
                </View>)}
            <TouchableRipple rippleColor="#eee" style={{ backgroundColor: COLORS.primary, borderRadius: 15, padding: 13, position: 'absolute', bottom: 10, width: width - 20, alignSelf: 'center' }} onPress={() => handleSaveChurch(data)}>
                <Text style={{ textAlign: 'center', color: COLORS.white }}>This is my church</Text>
            </TouchableRipple>
        </SafeAreaView>
    )
}

export default ChurchProfiles

const styles = StyleSheet.create({
    menuTab: (selectedTab, itemTab) => ({
        backgroundColor: "transparent",
        paddingVertical: 8,
        paddingHorizontal: 10,
        marginHorizontal: 6,
        borderBottomWidth: 2,
        borderBottomColor: selectedTab == itemTab ? COLORS.primary : "transparent",
        transition: "all .5 ease-in-out"
    }),
    menuText: (selectedTab, itemTab) => ({
        fontFamily: Fonts.medium,
        textAlign: 'center',
        alignItems: 'center',
        fontSize: selectedTab == itemTab ? 17 : 13,
        fontWeight: selectedTab == itemTab ? 700 : 600,
        color: selectedTab == itemTab ? COLORS.primary : "rgba(0,0,0,.8)"
    })
})