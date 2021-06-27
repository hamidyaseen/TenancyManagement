import { ILease } from "../model/lease";

export class Lease {
  public static tenancies: ILease[] = [
    {
      id: 17,
      usertoken: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      propertyId: 11,
      personId: 105,
      rent: 7870,
      currency: 'DKK',
      extraGas: false,
      gasCharges: 0,
      extraEl: true,
      elCharges: 400,
      extraWater: true,
      waterCharges: 230,
      extraWarming: true,
      warmingCharges: 340,
      startDate: '2015-03-25T12:00:00Z'
    },
    {
      id: 18,
      usertoken: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      currency: "DKK",
      elCharges: 300,
      extraEl: true,
      extraGas: false,
      extraWarming: true,
      extraWater: true,
      gasCharges: 0,
      personId: 101,
      propertyId: 20,
      rent: 6500,
      startDate: "2021-08-31T22:00:00.000Z",
      warmingCharges: 250,
      waterCharges: 100
    }
  ]
}
