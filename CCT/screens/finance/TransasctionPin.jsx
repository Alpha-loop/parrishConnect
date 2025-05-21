import React, { memo, useEffect, useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Fonts, width } from '../../assets/Theme';
import { Button, Modal, PaperProvider, Portal, TouchableRipple } from 'react-native-paper';

const TransasctionPin = ({ navigation }) => {
  const goBack = () => navigation.goBack();
  const [createPinDialog, setcreatePinDialog] = useState(false);
  const [pinResponse, setpinResponse] = useState("Pin Created Successfully!");
  const [firstPin, setFirstPin] = useState("")
  const [secondPin, setSecondPin] = useState("")

  const calcpin = memo(() => {
    return firstPin.length
  }, [firstPin, secondPin])


  const setPinValue = (val) => {

    if (firstPin.length <= 4) {
      setFirstPin(firstPin + val);
    }
    if (firstPin.length >= 4) {
      console.log('rrrrgrbrbr')
      setSecondPin(secondPin + val);
    }
  }

  useEffect(() => {
    if (secondPin.length === 4) {
      // Password not matched
      if (firstPin.slice(0, 4) !== secondPin.slice(0, 4)) {
        setpinResponse('Pin does not match!');
        setcreatePinDialog(true);
        setFirstPin("");
        setSecondPin("");
        return;
      }

      // Password matched
      setpinResponse('Pin Created Successfully!');
      setcreatePinDialog(true);
      setFirstPin("");
      setSecondPin("");
      setTimeout(() => {
        navigation.navigate("FinanceDashboard")
      }, 2000);
    }

    console.log(firstPin, 'first')
    console.log(secondPin, 'second')
  }, [firstPin, secondPin])

  return (
    <>
      <StatusBar backgroundColor="white" barStyle={"dark-content"} />
      <SafeAreaView style={styles.safearea}>
        <PaperProvider>
          <Portal>
            <View style={styles.container}>
              <TouchableOpacity onPress={goBack}>
                <Icon name={"arrow-back-ios"} color={"#3E3E3E"} size={30} />
              </TouchableOpacity>
              <View>
                <Text style={styles.header}>Secure Your Account</Text>
                <Text style={styles.subheader}>{ firstPin.length >= 4 ? 'Confirm Pin' : 'Create a 4 Digit Pin' }</Text>
                <View style={[styles.flexitem, styles.section, styles.justifyCenter]}>
                  <View style={styles.code(calcpin.compare, 1)} />
                  <View style={styles.code(calcpin.compare, 2)} />
                  <View style={styles.code(calcpin.compare, 3)} />
                  <View style={styles.code(calcpin.compare, 4)} />
                </View>
              </View>
              <View style={styles.pinbuttonparent}>
                <View style={[styles.flexitem, styles.justifyAround]}>
                  <TouchableRipple onPress={() => setPinValue('1')}>
                    <Text style={styles.pinbuttons}>1</Text>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setPinValue('2')}>
                    <Text style={styles.pinbuttons}>2</Text>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setPinValue('3')}>
                    <Text style={styles.pinbuttons}>3</Text>
                  </TouchableRipple>
                </View>
                <View style={[styles.flexitem, styles.justifyAround]}>
                  <TouchableRipple onPress={() => setPinValue('4')}>
                    <Text style={styles.pinbuttons}>4</Text>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setPinValue('5')}>
                    <Text style={styles.pinbuttons}>5</Text>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setPinValue('6')}>
                    <Text style={styles.pinbuttons}>6</Text>
                  </TouchableRipple>
                </View>
                <View style={[styles.flexitem, styles.justifyAround]}>
                  <TouchableRipple onPress={() => setPinValue('7')}>
                    <Text style={styles.pinbuttons}>7</Text>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setPinValue('8')}>
                    <Text style={styles.pinbuttons}>8</Text>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => setPinValue('9')}>
                    <Text style={styles.pinbuttons}>9</Text>
                  </TouchableRipple>
                </View>
                <View style={[styles.flexitem, styles.justifyAround]}>
                  <View>
                    <Text style={styles.emptytext} />
                  </View>
                  <TouchableRipple onPress={() => setPinValue('0')}>
                    <Text style={styles.pinbuttons}>0</Text>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => console.log('pressed')}>
                    <Image source={require('../../assets/img/Backspace.png')} style={styles.backspace} resizeMode="contain" />
                  </TouchableRipple>
                </View>
              </View>
              <Modal visible={createPinDialog} onDismiss={() => setcreatePinDialog(false)} contentContainerStyle={styles.containerStyle}>
                <View>
                  {
                    !pinResponse.toLowerCase().includes('not') ?
                      <Image source={require("../../assets/img/verified.gif")} style={styles.gif} resizeMode="contain" /> :
                      <Text style={{ textAlign: 'center' }}>🙁</Text>
                  }
                  <Text style={styles.pinresponse}>{pinResponse}</Text>
                </View>
              </Modal>
            </View>
          </Portal>
        </PaperProvider>
      </SafeAreaView>
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
    marginTop: 30
  },
  flexitem: {
    flexDirection: 'row',
    gap: 30
  },
  code: (val, type) => ({
    borderColor: "#0889FF",
    borderWidth: 1,
    width: 24,
    height: 24,
    borderRadius: 50,
    backgroundColor: val[1].length == 0 ? val[0].length >= type ? '#0889FF' : 'white' :  val[1].length >= type ? '#0889FF' : 'white'
    // gap: 3
  }),
  pinbuttons: {
    padding: 30,
    fontSize: 30,
    color: '#000000'
  },
  subheader: {
    marginTop: 50,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    color: '#020202CC'
  },
  pinbuttonparent: {
    marginTop: 130
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  backspace: {
    width: 32,
    margin: 30
  },
  emptytext: {
    // width: 30,
    padding: 45
  },
  containerStyle: {
    width: width - 100,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 15,
    padding: 30
  },
  gif: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: 'red'
  },
  pinresponse: {
    fontSize: 18,
    color: '#000000DB',
    textAlign: 'center',
    marginTop: 20
  }
})

export default TransasctionPin;