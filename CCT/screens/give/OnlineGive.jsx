import { Image, Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Fonts } from '../../assets/Theme';
import * as Animatable from 'react-native-animatable';


const OnlineGive = ({ navigation, route }) => {
    const { data } = route.params;

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>
                <View style={{ backgroundColor: COLORS.primary, height: 50, padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name={"arrow-back-ios"} color={COLORS.white} size={20} />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: Fonts.bold, fontSize: 16, color: COLORS.white, alignItems: 'center', textAlign: 'center', justifyContent: 'space-around' }}>Online Giving</Text>
                    <Text style={{}}></Text>
                </View>

                <View style={{ marginVertical: 30, marginHorizontal: 20 }}>
                    <Image source={require('../../assets/img/giftbox.png')} resizeMode='contain' style={{ alignSelf: 'center' }} />

                    <View style={{ paddingBottom: 60 }}>
                        <Text style={{ color: COLORS.black, fontFamily: Fonts.bold, fontSize: 12 }}></Text>
                        {
                            data.map((item, i) => (
                                <Animatable.View
                                    animation={"fadeInUp"}
                                    duration={400}
                                    delay={i * 200}
                                    key={i}
                                >
                                    <TouchableOpacity onPress={() => {
                                        Platform.OS === 'android' ?
                                            navigation.navigate("ExternalUrlFrame", { title: item.name, uri: `https://my.churchplus.co/give/${item?.id}` }) :
                                            Linking.openURL(`https://my.churchplus.co/give/${item?.id}`)
                                    }}>
                                        <View style={{ backgroundColor: '#F8F8F8', borderRadius: 10, padding: 15, marginTop: 20 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                {/* <Image source={require('../../assets/img/donation.png')} style={{ width: 20, height: 20 }} /> */}
                                                <Text style={{ fontFamily: Fonts.regular, color: COLORS.black, fontSize: 12 }}>Donation Name:</Text>
                                            </View>
                                            <Text style={{ fontFamily: Fonts.bold, color: COLORS.black, fontSize: 18, textAlign: 'center', marginVertical: 10 }}>{item.name}</Text>
                                            <View style={{ flexDirection: 'row', justifyContent: "center" }}>
                                                <View style={{ alignItems: 'center', backgroundColor: COLORS.white, paddingVertical: 8, paddingHorizontal: 15, borderRadius: 80 }}>
                                                    <View style={{ flexDirection: 'row', gap: 5 }}>
                                                        <Image source={require('../../assets/img/alatpay.png')} style={{ width: 25, height: 20 }} resizeMode='contain' />
                                                        <Image source={require('../../assets/img/flutterwaveicon.png')} style={{ width: 25, height: 23 }} />
                                                        <Image source={require('../../assets/img/paystackicon.png')} style={{ width: 18, height: 18 }} />
                                                    </View>
                                                    <Text style={{ color: "#8F8F8F", fontSize: 7, fontFamily: Fonts.regular }}>Secured Payment Gateways</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default OnlineGive

const styles = StyleSheet.create({})