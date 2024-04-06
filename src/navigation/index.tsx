import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ToastProvider } from '@tamagui/toast';
import * as SecureStore from 'expo-secure-store';
import React, { useContext, useEffect } from 'react';

import TabNavigator from './auth';

import { UserContext } from '~/context/UserProvider';
import LoginPage from '~/screens/login';

const Stack = createStackNavigator();

const Navigator = () => {
  const { user, saveSession } = useContext(UserContext);
  useEffect(() => {
    async function Prepare() {
      try {
        const savedData = await SecureStore.getItemAsync('user');

        if (savedData !== null) {
          saveSession(JSON.stringify(savedData));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }

    Prepare();
  }, []);

  return (
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="tab-navigator"
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            transitionSpec: {
              open: {
                animation: 'spring',
                config: {
                  damping: 13,
                },
              },
              close: {
                animation: 'spring',
                config: {
                  damping: 13,
                },
              },
            },
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, -1],
                      }),
                    },
                    {
                      translateX: next
                        ? next.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -layouts.screen.width],
                          })
                        : 1,
                    },
                  ],
                },
              };
            },
          }}
        >
          {user ? (
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen name="LoginPage" component={LoginPage} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default Navigator;
