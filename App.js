import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastProvider } from 'react-native-toast-notifications';

import { store, persistor } from './src/appRedux';
import { RootStack } from './src/navigation';
import { client } from './src/services/GraphQL/Client';
import { AppInitSetup } from './src/AppInitSetup'
import { AmplitudeAPI, Events } from '@services';

export default function App() {
    const [isReady, setReady] = useState(false)

    useEffect(() => {
        AmplitudeAPI.initialize().then(() => {
            AmplitudeAPI.track(Events.OP.LAUNCH)
            AppInitSetup().then(() => setReady(true))
        })
    }, [])

    return (
        <ApolloProvider client={client}>
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    {isReady &&
                        <ToastProvider>
                            <NavigationContainer ref={navigator}>
                                <RootStack />
                            </NavigationContainer>
                        </ToastProvider>
                    }
                </PersistGate>
            </Provider>
        </ApolloProvider>
    );
}