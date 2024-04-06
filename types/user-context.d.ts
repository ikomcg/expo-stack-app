type UserContextType = {
  user: User | null;
  removeSession: () => void;
  saveSession: (user: Session) => void;
};
