import { IUser } from "../model/user";

export class UserData {
  static users: IUser[] = [
    {
      id: 2,
      firstName: 'Alfred',
      lastName: 'Christian',
      username: 'alf',
      password: 'P@1234',
      token: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
    },
    {
      id: 12,
      firstName: 'Oscar',
      lastName: 'Kastin',
      username: 'os',
      password: 'P@1234',
      token: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    },
    {
      id: 21,
      firstName: 'Karl',
      lastName: 'Tori',
      username: 'kar',
      password: 'P@1234',
      token: '8b1deb4d-3b7d-4bad-9bdd-2b0d7b3dce6d'
    }

  ];
}
