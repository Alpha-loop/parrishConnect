import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, Fonts, height } from '../../assets/Theme';
import LinearGradient from 'react-native-linear-gradient';

const first = require("../../assets/img/background.png");

const ThirdScreen = ({ navigation }) => {

    return (
        <SafeAreaView>
           <View>
                <View style={{ position: 'relative' }}>
                    <ImageBackground source={first} style={{ width: "100%", height: height / 2, zIndex: -1, alignItems: "flex-end" }}>
                        <Image source={require("../../assets/img/ParrishLogo.png")} style={{ marginTop: 20, marginRight: 20 }} />
                    </ImageBackground>
                    <LinearGradient
                        colors={['rgba(79, 87, 101, 0)', COLORS.primary]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                    />
                </View>

                <View style={{ backgroundColor: COLORS.primary, height: '100%', marginTop: 20 }}>
                    <View style={{ width: '70%', alignSelf: 'center' }}>
                        <Text style={{ fontFamily: Fonts.black, fontSize: 23, textAlign: 'center', color: COLORS.white }}>Unlimited <Text style={{color: 'orange'}}>Live Stream</Text></Text>
                        <Text style={{ fontFamily: Fonts.black, fontSize: 23, textAlign: 'center', color: COLORS.white }}>of Events & Services</Text>
                    </View>
                    <View style={{ width: '70%', alignSelf: 'center', marginVertical: 20 }}>
                        <Text style={{ fontFamily: Fonts.light, fontSize: 14, textAlign: 'center', color: COLORS.white }}>Churchplus Connects you with People and Contents that matter to your spiritual growth</Text>
                    </View>
                    <View style={{ width: '20%', alignSelf: 'center', marginBottom: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                        <View style={{ height: 12, width: 12, backgroundColor: 'orange', opacity: 0.4, borderRadius: 8 }}></View>
                        <View style={{ height: 12, width: 12, backgroundColor: 'orange', opacity: 0.4, borderRadius: 8 }}></View>
                        <View style={{ height: 12, width: 12, backgroundColor: 'orange',  borderRadius: 8 }}></View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ThirdScreen

const styles = StyleSheet.create({})