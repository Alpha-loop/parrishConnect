import * as React from 'react';
import { Text, TouchableOpacity, View, useWindowDimensions, StatusBar, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import { COLORS, Fonts } from '../../assets/Theme';
import { TouchableRipple } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setChurch } from '../../redux/userSlice';
import usePushNotification from '../../utils/usePushNotification';
import { CheckConfirm } from '../../assets/img/icons';


const renderScene = SceneMap({
    first: FirstScreen,
    second: SecondScreen,
    third: ThirdScreen,
});

export default function OnboardTabs({ navigation }) {
    const layout = useWindowDimensions();
    const dispatch = useDispatch()
    const { subscribeTopic } = usePushNotification();
    const [intervalId, setIntervalId] = React.useState(null);

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
    ]);


    React.useEffect(() => {
        // Start auto-swiping tabs
        const id = setInterval(() => {
            console.log('reaching')
            // Calculate next index, looping back to 0 if at the end
            const nextIndex = (index + 1) % routes.length;
            setIndex(nextIndex);
        }, 3000); // Change 5000 to the desired interval in milliseconds

        // Save the interval ID for cleanup
        setIntervalId(id);

        // Clear the interval when the component unmounts
        return () => clearInterval(id);
    }, [index]); // Include index in the dependencies to trigger effect on index change


    const proceed = async () => {
        clearInterval(intervalId);
        navigation.navigate("Join")
        // const tenantId = "9d8f7a67-e806-4457-9c62-2abe34ea3ee9"

        // // Subscribe to push notification topics
        // const mediaTopic = `media${tenantId}`
        // const feedTopic = `feed${tenantId}`
        // subscribeTopic(mediaTopic);
        // subscribeTopic(feedTopic);

        // try {
        //     await AsyncStorage.setItem("church", JSON.stringify({ tenantId }))
        // } catch (error) {
        //     console.error(`useAsyncStorage setItem error:`, error)
        // }

        // // Save church details to state
        // dispatch(setChurch({ tenantId }))
        // navigation.navigate("Login")
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                tabBarPosition='none'
                initialLayout={{ width: layout.width }}
            />
            <TouchableRipple rippleColor="rgba(0, 0, 0, 0.1)" borderLess={true} style={{ backgroundColor: 'orange', borderRadius: 15, marginHorizontal: 20, marginBottom: 10, paddingVertical: 13 }} onPress={proceed}>
                <Text style={{ textAlign: 'center', fontFamily: Fonts.semibold, color: 'white' }}>Get Started</Text>
            </TouchableRipple>
            <View style={{ flexDirection: "row", paddingHorizontal: 20, justifyContent: "space-between", gap: 5 }}>
                <Text style={{ fontFamily: Fonts.regular, color: "white", fontSize: 12, marginBottom: 10 }}>
                    By Creating account, you are giving Churchplus Right to use your information Lawfully and also Agree to our Terms and Conditions.
                </Text>
                <CheckConfirm size={20} />
            </View>
            {/* <PoweredByWema /> */}
        </View>
    );
}

export const PoweredByWema = ({ style }) => {
    return (
        <View style={{ alignItems: "center" }}>
            <Text style={{ color: "#696969", fontFamily: Fonts.regular, fontSize: 12  }}>Powered By</Text>
            <Image source={require("../../assets/img/wema-logo-purple.png")} style={style} resizeMode='contain' />
        </View>
    );
}