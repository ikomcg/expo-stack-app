import * as SecureStore from 'expo-secure-store';
import { ProviderProps, createContext, useState } from 'react';
export const UserContext = createContext<UserContextType>({
  user: null,
  removeSession: () => {},
  saveSession: () => {},
});

const UserProvider = ({ children }: Pick<ProviderProps<UserContextType>, 'children'>) => {
  const [data, setData] = useState<User | null>(null);
  const SaveSession = (user: User) => {
    SecureStore.setItemAsync('user', JSON.stringify(user));
    setData(user);
  };

  const RemoveSession = async () => {
    await SecureStore.deleteItemAsync('user');
    setData(null);
  };

  return (
    <UserContext.Provider
      value={{
        user: data,
        saveSession: SaveSession,
        removeSession: RemoveSession,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
