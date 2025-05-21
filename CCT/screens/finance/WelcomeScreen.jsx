import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { COLORS, Fonts, width } from '../../assets/Theme'
import { Button } from 'react-native-paper'
import { navigate, navigationRef } from '../../utils/navigationRef'

const WelcomeScreen = () => {
    return (

        <>
            <SafeAreaView style={styles.areaview}>
                <View style={styles.container}>
                    {/* <View style={styles.centralize}>
                        <View style={styles.cardshadow} />
                        </View> */}
                    <View style={styles.card}>
                        <Text style={styles.header}>Open a Free & Secure Bank Account</Text>
                        <View style={styles.featuresection}>
                            <Text style={styles.featuretext}>● Deposit Funds</Text>
                            <Text style={styles.featuretext}>● Make Withdrawal</Text>
                            <Text style={styles.featuretext}>● Pay Bills</Text>
                            <Text style={styles.featuretext}>● Buy Airtime and Data</Text>
                            <Text style={styles.featuretext}>● Robust Saving Platform</Text>
                            <Text style={styles.featuretext}>● Create Sub-accounts</Text>
                            <Text style={styles.featuretext}>● Apply for Loan</Text>
                            <Text style={styles.featuretext}>● Manage Your Insurance</Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.background}>
            <Button textColor="#FFFFFF" buttonColor={COLORS.primary} style={styles.button} contentStyle={{ paddingVertical: 8 }} mode="contained" onPress={() => navigationRef.current?.navigate('RegisterDetails')}>
                <Text style={{ fontSize: 14, fontFamily: Fonts.semibold, marginVertical: 20 }}>Get Started</Text>
            </Button>

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    areaview: {
        backgroundColor: COLORS.white,
        flex: 1
    },
    container: {
        padding: 30,
        marginTop: 30
    },
    cardshadow: {
        borderWidth: 1, borderColor: 'red',
        // position: 'absolute',
        width: width - 90,
        height: 30,
        // top: 50,
        borderRadius: 10,
        backgroundColor: 'blue',
        zIndex: -10000
    },
    card: {
        backgroundColor: '#a8111312',
        borderRadius: 10,
        padding: 10,
        paddingTop: 30,
        paddingBottom: 50,
        // zIndex: 10000
    },
    header: {
        fontFamily: Fonts.black,
        textAlign: 'center',
        fontSize: 24,
        color: COLORS.primary
    },
    featuresection: {
        marginTop: 20,
        marginLeft: 40
    },
    featuretext: {
        color: '#8B8D8E',
        fontSize: 16,
        marginTop: 4
    },

    centralize: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    button: {
        marginBottom: 30,
        marginHorizontal: 30
    },
    background: {
        backgroundColor: COLORS.white
    }
})

export default WelcomeScreen