export interface UserSubscribedTo {
  userId: string;
  authorId: string;
}

export interface User {
  id: string;
  name: string;
  balance: number;
}

export interface CreateUser {
  dto: {
    name: string;
    balance: number;
  };
}

export interface ChangeUser {
  id: string;
  dto: {
    name: string;
    balance: number;
  };
}