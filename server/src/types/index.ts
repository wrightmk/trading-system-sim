type User = {
  id: number;
  username: string;
  password_hash: string;
  balance: string;
};

type RegisterPayload = {
  username: string;
  password: string;
};

type LoginPayload = RegisterPayload;

type JWTData = {
  id: number;
  username: string;
};

type TransactionRequestBody = {
  senderId: number;
  receiverId: number;
  amount: number;
};

type AuthRequestBody = {
  username: string;
  password: string;
};

type UserRequestBody = AuthRequestBody;
