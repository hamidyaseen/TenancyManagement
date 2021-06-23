
export interface IdWise {
  id: number;
}

export interface IUser extends IdWise {  
  firstName: string;
  lastName: string;
  username: string;
  password?: string;
  token: string;
}
