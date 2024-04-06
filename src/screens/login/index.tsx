import { AntDesign, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useToastController, ToastViewport } from '@tamagui/toast';
import React, { useContext, useEffect, useState } from 'react';
import { ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { H4, H5, Image, SizableText, View, XStack, YStack } from 'tamagui';
import { Button, Container, Input } from 'tamagui.config';

import { LoginApi } from '~/api/auth/LoginApi';
import { UserContext } from '~/context/UserProvider';
import { ERROR_MESSAGE } from '~/utils/Message';

const LoginPage = () => {
  const context = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToastController();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigation();
  async function HandleLogin() {
    await LoginApi(credentials.username, credentials.password)
      .then((res) => {
        context.saveSession(res);
      })
      .catch((error: any) => {
        const message = error?.message ?? ERROR_MESSAGE.api;
        toast.show(message);
      });
  }

  useEffect(() => {
    console.log(context.user, 'Usersr');
  }, [context.user]);

  function OnChangeCredential(name: string, value: string) {
    setCredentials((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground
        source={require('../../../assets/background.png')}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <YStack width="100%" height="100%">
          <YStack gap="$-0.25" alignSelf="center" justifyContent="center" marginVertical="auto">
            <Image source={require('../../../assets/logo.png')} alignSelf="center" />
            <H4 color="black" fontWeight="bold" textAlign="center">
              Bright School
            </H4>
          </YStack>
          <Container
            flex={0}
            borderTopEndRadius={32}
            borderTopStartRadius={32}
            marginTop="auto"
            borderWidth={1}
            paddingTop={64}
            paddingBottom={32}
            borderColor="gray">
            <YStack>
              <H5 color="black" fontWeight="700" size={24} fontSize={24}>
                Login
              </H5>
              <SizableText theme="alt2" size="$3">
                Please enter your credentials to proceed
              </SizableText>
            </YStack>

            <View marginTop={24} marginBottom={32}>
              <View marginBottom={24}>
                <SizableText color="black">Username</SizableText>
                <Input
                  placeholder="Enter username"
                  onChangeText={(text) => OnChangeCredential('username', text)}
                  backgroundColor="white"
                  color="black"
                />
              </View>
              <View>
                <SizableText color="black">Password</SizableText>
                <XStack borderColor="black" borderWidth={1} borderRadius={8}>
                  <Input
                    flex={1}
                    borderColor="white"
                    placeholder="Enter password"
                    onChangeText={(text) => OnChangeCredential('password', text)}
                    backgroundColor="white"
                    borderWidth={0}
                    color="black"
                    secureTextEntry={!showPassword}
                  />
                  <Button onPress={() => setShowPassword((val) => !val)} unstyled>
                    {showPassword ? (
                      <Feather name="eye-off" size={20} color="black" />
                    ) : (
                      <Feather name="eye" size={20} color="black" />
                    )}
                  </Button>
                </XStack>
              </View>
            </View>
            <Button
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
              blue
              iconAfter={<AntDesign name="arrowright" size={20} color="white" />}
              paddingVertical={14}
              onPress={HandleLogin}
              unstyled>
              Log in
            </Button>
          </Container>
        </YStack>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
