import { TabsProvider, Tabs, TabScreen, useTabIndex, useTabNavigation } from 'react-native-paper-tabs';
import { AppTabs } from '../navigation/AppTabs';
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { COLORS } from '../assets/Theme';
import { StackHeader } from './reusables/index';
import ConnectionList from './socials/Connections';

function HeaderTabs() {
    return (
        <>
            <StackHeader title={'Faith Connect'} newStack />
            <TabsProvider
                defaultIndex={0}
            // onChangeIndex={handleChangeIndex} optional
            >
                <Tabs
                    // uppercase={false} // true/false | default=true (on material v2) | labels are uppercase
                    // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
                    // iconPosition // leading, top | default=leading
                    //   style={{ backgroundColor: COLORS.primary }} // works the same as AppBar in react-native-paper
                    // dark={false} // works the same as AppBar in react-native-paper
                    theme={{ colors: { surface: COLORS.primary, onSurface: 'white', onSurfaceVariant: 'white', primary: 'white' } }} // works the same as AppBar in react-native-paper
                // mode="scrollable" // fixed, scrollable | default=fixed
                // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
                // disableSwipe={false} // (default=false) disable swipe to left/right gestures
                >
                    <TabScreen label="Faith">
                        <AppTabs />
                    {/* <View style={{ backgroundColor: 'red', flex:1 }}> */}
                        {/* <HomeScreen /> */}
                    {/* </View> */}
                    </TabScreen>
                    <TabScreen
                        label="Socials"
                        // style={{ borderColor: 'red', borderWidth: 1 }}
                        // icon="bag-suitcase"
                        // optional props
                        // badge={true} // only show indicator
                        // badge="text"
                        // badge={1}
                    // onPressIn={() => {
                    //   console.log('onPressIn explore');
                    // }}
                    // onPress={() => {
                    //   console.log('onPress explore');
                    // }}
                    >
                        <ConnectionList />
                    </TabScreen>
                </Tabs>
            </TabsProvider>
        </>
    )

    // function ExploreWitHookExamples() {
    //     const goTo = useTabNavigation();
    //     const index = useTabIndex();
    //     return (
    //         <View style={{ flex: 1 }}>
    //             <Text>Explore</Text>
    //             <Text>Index: {index}</Text>
    //             <Button onPress={() => goTo(1)}>Go to Flights</Button>
    //         </View>
    //     );
    // }
}

export default HeaderTabs;

