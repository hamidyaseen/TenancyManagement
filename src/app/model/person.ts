import { IdWise } from "./idWise";


export interface IPerson extends IdWise {
  usertoken: string;
  firstName: string;
  lastName: string;
  incomeRangeId: number;
  incomeRange?: string;
  email: string;
  phone: string;
  address: string;
  leaseId: number;
}
