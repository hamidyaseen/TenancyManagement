import { IdWise } from "./idWise";
import { IPerson } from "./person";
import { IProperty } from "./property";

export interface ILease extends IdWise {
  usertoken: string;
  propertyId: number;
  property?: IProperty;
  personId: number;
  person?: IPerson;
  rent: number;
  currency: string;
  extraGas: boolean;
  gasCharges: number;
  extraEl: boolean;
  elCharges: number;
  extraWater: boolean;
  waterCharges: number;
  extraWarming: boolean;
  warmingCharges: number;
  startDate: string;
  endDate?: string;
  costMonthly?: number;
}
