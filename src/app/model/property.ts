import { IdWise } from "./idWise";

export interface IProperty extends IdWise {
  usertoken: string;
  title?: string;
  typeId: number;
  type?: string;
  leaseId: number;
  size: number; // quard meter;
  rooms: number;
  // rent: number;
  note?: string;
  address: string;

  husnr: string;
  vejnavn: string;
  postnr: string;
  postnrnavn: string;
  supplerendebynavn?: string;
  href: string;
}
