import React, { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS, Fonts } from '../../assets/Theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const RegisterDetails = ({ navigation }) => {
    const goBack = () => navigation.goBack();
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [bvn, setbvn] = useState("");
    return (
        <>
            <StatusBar backgroundColor="white" barStyle={"dark-content"} />
            <SafeAreaView style={styles.safearea}>
                <View style={styles.container}>
                    <TouchableOpacity onPress={goBack}>
                        <Icon name={"arrow-back-ios"} color={"#3E3E3E"} size={30} />
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.header}>Personal Details</Text>
                        <View style={styles.section}>
                            <TextInput
                                label="First Name"
                                value={firstName}
                                onChangeText={text => setfirstName(text)}
                                mode='outlined'
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: '#00000033'
                                }}
                                outlineColor='#00000033'
                                activeOutlineColor={'#00000033'}
                                outlineStyle={{ borderRadius: 10, borderWidth: 2 }}
                                placeholderTextColor='#00000033'
                            />
                            <TextInput
                                label="Last Name"
                                value={lastName}
                                onChangeText={text => setlastName(text)}
                                mode='outlined'
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: '#00000033',
                                    marginTop: 15
                                }}
                                outlineColor='#00000033'
                                activeOutlineColor={'#00000033'}
                                outlineStyle={{ borderRadius: 10, borderWidth: 2 }}
                                placeholderTextColor='rgba(0,0,0,.4)'
                            />
                            <TextInput
                                label="Email"
                                value={email}
                                onChangeText={text => setemail(text)}
                                mode='outlined'
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: '#00000033',
                                    marginTop: 15
                                }}
                                outlineColor='#00000033'
                                activeOutlineColor={'#00000033'}
                                outlineStyle={{ borderRadius: 10, borderWidth: 2 }}
                                placeholderTextColor='rgba(0,0,0,.4)'
                            />
                            <TextInput
                                label="BVN"
                                value={bvn}
                                onChangeText={text => setbvn(text)}
                                mode='outlined'
                                style={{
                                    backgroundColor: 'white',
                                    borderColor: '#00000033',
                                    marginTop: 15
                                }}
                                outlineColor='#00000033'
                                activeOutlineColor={'#00000033'}
                                outlineStyle={{ borderRadius: 10, borderWidth: 2 }}
                                placeholderTextColor='rgba(0,0,0,.4)'
                            />
                        </View>
                    </View>
                    <View style={styles.requirement}>
                        <Text style={styles.requirement_text}>
                            We Require these Basic Information to get you
                            started, You can Upgrade your Account Later
                            Conveniently!
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
            <View style={styles.background}>
                <Button textColor="#FFFFFF" buttonColor="#124191" style={styles.button} contentStyle={{ paddingVertical: 8 }} mode="contained" onPress={() => navigation.navigate("TransactionPin")}>
                    <Text style={{ fontSize: 14, fontFamily: Fonts.semibold, marginVertical: 20 }}>Save & Proceed</Text>
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    safearea: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    container: {
        padding: 20
    },
    header: {
        textAlign: 'center',
        position: 'relative',
        top: -25,
        color: '#020202CC',
        fontFamily: Fonts.bold,
        fontSize: 16
    },
    section: {
        marginTop: 20
    },
    requirement: {
        backgroundColor: "#DFEBF5",
        marginTop: 30,
        padding: 15
    },
    requirement_text: {
        fontFamily: Fonts.regular,
        color: "#2584D4",
        fontSize: 12
    },
    button: {
        marginBottom: 30,
        marginHorizontal: 20,
        borderRadius: 10
    },
    background: {
        backgroundColor: COLORS.white
    }
})

export default RegisterDetails