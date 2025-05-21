import React from 'react';
import { persistStore } from "redux-persist";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store } from './redux/store';
import AppRoute from './navigation/AppTabs';
import { PaperProvider } from 'react-native-paper';
import usePushNotification from './utils/usePushNotification';
import Notifee, { AndroidImportance } from '@notifee/react-native';
import { useSelector } from 'react-redux';


const createNotificationChannels = async () => {
  await Notifee.createChannel({
    id: 'parrishconnet',
    name: 'Parrish Connect',
    importance: AndroidImportance.HIGH,
    vibration: true,
  });
};

// let persistor = persistStore(store);

function App(): React.JSX.Element {

  React.useEffect(() => {
    createNotificationChannels();
  }, []);


  const {
    requestUserPermission,
    subscribeTopic,
    // getFCMToken,
    listenToBackgroundNotifications,
    listenToForegroundNotifications,
    onNotificationOpenedAppFromBackground,
    onNotificationOpenedAppFromQuit,
  } = usePushNotification()
  
  
  React.useEffect(() => {
    const listenToNotifications = () => {
      try {
        // getFCMToken();
        requestUserPermission();
        onNotificationOpenedAppFromQuit();
        listenToBackgroundNotifications();
        listenToForegroundNotifications();
        onNotificationOpenedAppFromBackground();
      } catch (error) {
        console.log(error);
      }
    };

    listenToNotifications();
  }, []);

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <PaperProvider>
        <AppRoute />
      </PaperProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default App;