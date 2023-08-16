type User = {
  userId: number;
  username: string;
  balance: number;
};

type TransactionFormData = {
  receiverId: { value: string };
  amount: { value: string };
};

type AuthFormData = {
  username: { value: string };
  password: { value: string };
};

type TAuthForm = {
  title: string;
  url: string;
};
type TTransactionForm = {
  setUserData: React.Dispatch<React.SetStateAction<User>>;
  userData: User;
};
