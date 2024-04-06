import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { YStack, H2, Separator, Theme, Button } from 'tamagui';
import { UserContext } from '~/context/UserProvider';

export default function TabOneScreen() {
  const navigate = useNavigation();
  const { removeSession } = useContext(UserContext);
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <H2>Tab One</H2>
        <Button onPress={removeSession}>Logout</Button>
      </YStack>
    </Theme>
  );
}
