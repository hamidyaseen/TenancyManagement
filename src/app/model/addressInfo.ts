////export interface IData {
////  navn: string;
////  href: string;
////}

export interface IAddressInfo {
  type: string;
  tekst: string;
  forslagstekst: string;
  caretpos: number,
  data: IFullAddress;
}

export interface IFullAddress {
  adgangsadresseid: string;
  adresseringsvejnavn: string;
  darstatus: number;
  dør: string;
  etage: string;
  href: string;
  husnr: string;
  id: string;
  kommunekode: string;
  postnr: string;
  postnrnavn: string;
  status: number;
  stormodtagerpostnr: string;
  stormodtagerpostnrnavn: string;
  supplerendebynavn: string;
  vejkode: string;
  vejnavn: string;
  x: number;
  y: number;
}
