import { Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Fonts } from '../../assets/Theme'
import Clipboard from '@react-native-clipboard/clipboard';
import { CopyIcon } from '../../assets/img/icons';
import { Button, Snackbar } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { bankLogo } from '../../utils/bankLogo';

const BankAccount = ({ navigation, route }) => {
    const { data } = route.params;
    const [wemaData, setWemaData] = useState(null);
    const [otherBanks, setOtherBanks] = useState([]);
    const [displaySnack, setDisplaySnack] = useState(false)

    useEffect(() => {
        const findWema = data.find(i => i.bankName.toLowerCase().includes('wema'));
        const addbankurl = data.map(i => {
            const findBank = bankLogo.findIndex(j => j.name.toLowerCase().includes(i.bankName.toLowerCase()));
            if (findBank >= 0) {
                i.bankLogoSource = bankLogo[findBank].source;
            }
            return i
        })

        if (findWema) {
            setWemaData(findWema);
            const others = addbankurl.filter(i => !i.bankName.toLowerCase().includes("wema"));
            setOtherBanks(others)
        } else {
            
            setOtherBanks(addbankurl);
        }
    }, [])

    const fetchCopiedText = async (text) => {
        console.log(data)
        try {
            await Clipboard.setString(text);
            setDisplaySnack(true)
        } catch (error) {
            console.error('Error copying to clipboard:', error);
        }
    };
    return (
        <>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View style={{ backgroundColor: COLORS.primary, height: 50, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Icon name={"arrow-back-ios"} color={COLORS.white} size={20} />
                </TouchableOpacity>
                <Text style={{ fontFamily: Fonts.bold, fontSize: 16, color: COLORS.white, alignItems: 'center', textAlign: 'center', justifyContent: 'space-around' }}>Bank Account</Text>
                <Text style={{}}></Text>
            </View>

            <ScrollView style={{ marginBottom: 20 }}>
                <View style={{ marginVertical: 30, marginHorizontal: 20 }}>
                    {
                        wemaData ? (
                            <Animatable.View
                                    animation={"fadeInUp"}
                                    duration={400}
                                >
                            <ImageBackground style={{ borderRadius: 15, overflow: 'hidden', marginBottom: 10 }} resizeMode='cover' source={require("../../assets/img/wemabg.png")}>
                                <View style={{ paddingVertical: 20, paddingHorizontal: 15 }}>
                                    <View>
                                        <Image source={require("../../assets/img/wema-logo.png")} resizeMode={"contain"} style={{ width: 70, height: 40 }} />
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{ fontFamily: Fonts.bold, fontSize: 18, color: "#FFF" }}>{wemaData.accountNumber}</Text>
                                        <TouchableOpacity onPress={() => fetchCopiedText(wemaData?.accountNumber)}>
                                            <CopyIcon size={17} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontFamily: Fonts.semibold, color: COLORS.white, fontSize: 13 }}>{wemaData.accountName}</Text>
                                    <Text style={{ fontFamily: Fonts.medium, color: COLORS.white, fontSize: 13, marginTop: 5, }}>{wemaData.description}</Text>
                                </View>
                            </ImageBackground>
                        </Animatable.View>
                        ) : null
                    }

                    {data.length > 0 ? (
                        <>
                            {otherBanks?.map((item, i) => (
                                <Animatable.View
                                    animation={"fadeInUp"}
                                    duration={400}
                                    delay={1 + i * 200}
                                    key={i}
                                >
                                <View style={{ backgroundColor: '#D9D9D94D', borderRadius: 15, padding: 15, marginVertical: 10, borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.1)" }} key={i}>
                                    <View style={{ flexDirection: 'row', alignItems: "center", gap: 7 }}>
                                        {
                                            item.bankLogoSource ? (
                                                <Image source={item.bankLogoSource} style={{ width: 30, height: 30 }} resizeMode='contain' />
                                            ) : (
                                                <Image source={{ uri: "https://placeholder.com/68x68" }} height={30} width={30} />
                                            )
                                        }
                                        <View>
                                            <Text style={{ fontFamily: Fonts.regular, fontSize: 12, color: COLORS.black }}><Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: COLORS.black }}>{item.bankName}</Text></Text>
                                        </View>

                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                        <Text style={{ fontFamily: Fonts.bold, fontSize: 18, color: "rgba(16, 16, 16, 0.8)" }}>{item?.accountNumber}</Text>
                                        <TouchableOpacity onPress={() => fetchCopiedText(item?.accountNumber)}>
                                            <CopyIcon size={17} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={{ fontFamily: Fonts.semibold, fontSize: 13 }}>{item.accountName}</Text>
                                    <Text style={{ fontFamily: Fonts.medium, color: COLORS.black, marginTop: 10 }}>{item.description}</Text>
                                </View>
                                </Animatable.View>
                            ))}
                        </>
                    ) : (
                        <Text style={{ fontWeight: 600, color: COLORS.black }}>No banks added yet</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
                <Snackbar
                visible={displaySnack}
                duration={4000}
                style={{ backgroundColor: "#3CBF98" }}
                onDismiss={() => setDisplaySnack(false)}
            >
                <Text style={{ color: "#FFFFFF" }}>🎉 Copied to clipboard.</Text>
            </Snackbar>
            </>
    )
}

export default BankAccount

const styles = StyleSheet.create({})