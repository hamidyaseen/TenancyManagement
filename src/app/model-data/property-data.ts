import { IProperty } from "../model/property";

export class Property {
  public static properties: IProperty[] = [
    {
      id: 11,
      usertoken: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      typeId: 2,
      leaseId: 17,
      size: 74,
      rooms: 3,
      address: 'Holmbladsgade 97, st tv 2300 København S',
      husnr: '97',
      vejnavn: 'Holmbladsgade',
      postnr: '2300',
      postnrnavn: 'København S',
      href: ''
    },
    {
      id: 13,
      usertoken: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
      typeId: 1,
      leaseId: 0,
      size: 274,
      rooms: 5,
      address: 'Gevninge Bygade 46B, Gevninge',
      husnr: '46B',
      vejnavn: 'Gevninge Bygade',
      postnr: '4000',
      postnrnavn: 'Rosekilde',
      href: ''
    },
    {
      id: 15,
      usertoken: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bee',
      typeId: 3,
      leaseId: 0,
      size: 123,
      rooms: 5,
      title: "tewersd",
      note: "asdf",
      address: "Lucernemarken 1, Resen, 7600 Struer",
      href: "https://api.dataforsyningen.dk/adresser/0a3f50be-dd10-32b8-e044-0003ba298018",
      husnr: "1",
      postnr: "7600",
      postnrnavn: "Struer",
      supplerendebynavn: "Resen",
      vejnavn: "Lucernemarken"
    },
    {
      id: 16,
      usertoken: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      typeId: 1,
      leaseId: 0,
      address: "Øresundsvej 3, 2. th, 2300 København S",
      href: "https://api.dataforsyningen.dk/adresser/0a3f50a1-d237-32b8-e044-0003ba298018",
      husnr: "3",
      note: "",
      postnr: "2300",
      postnrnavn: "København S",
      rooms: 2,
      size: 62,
      supplerendebynavn: '',
      title: "",
      vejnavn: "Øresundsvej"
    },
    {
      id: 17,
      usertoken: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
      typeId: 3,
      leaseId: 0,
      address: "Kastrupvej 4, Arnum, 6510 Gram",
      href: "https://api.dataforsyningen.dk/adresser/0a3f50b6-8c35-32b8-e044-0003ba298018",
      husnr: "4",
      note: "bigger than you deams",
      postnr: "6510",
      postnrnavn: "Gram",
      rooms: 6,
      size: 135,
      supplerendebynavn: "Arnum",
      title: "sunny side of life",
      vejnavn: "Kastrupvej"
    },
    {
      id: 18,
      usertoken: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      address: "Carlsgade 5B, 2300 København S",
      href: "https://api.dataforsyningen.dk/adresser/7286a9c4-8348-485d-83c5-78b01c18861e",
      husnr: "5B",
      leaseId: 0,
      note: "newly constructed",
      postnr: "2300",
      postnrnavn: "København S",
      rooms: 5,
      size: 154,
      supplerendebynavn: '',
      title: "rightig pæn ",
      typeId: 2,
      vejnavn: "Carlsgade"
    },
    {
      id: 19,
      address: "Lybækvej 3, No, 6950 Ringkøbing",
      href: "https://api.dataforsyningen.dk/adresser/b6cd40b5-7534-48e2-867f-c23f470b8bac",
      husnr: "3",
      leaseId: 0,
      note: "recently renovated",
      postnr: "6950",
      postnrnavn: "Ringkøbing",
      rooms: 5,
      size: 162,
      supplerendebynavn: "No",
      title: "bigger than you deams",
      typeId: 3,
      usertoken: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      vejnavn: "Lybækvej"
    },
    {
      id: 20,
      address: "Lyngbygade 6, st. th, 8600 Silkeborg",
      href: "https://api.dataforsyningen.dk/adresser/0a3f50c1-ee26-32b8-e044-0003ba298018",
      husnr: "6",
      leaseId: 18,
      note: "ready to take over",
      postnr: "8600",
      postnrnavn: "Silkeborg",
      rooms: 4,
      size: 90,
      supplerendebynavn: '',
      title: "fresh and sunny",
      typeId: 1,
      usertoken: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      vejnavn: "Lyngbygade"
    },
    {
      id: 21,
      address: "Nykøbing Landevej 6, 4200 Slagelse",
      href: "https://api.dataforsyningen.dk/adresser/0a3f50ae-ae00-32b8-e044-0003ba298018",
      husnr: "6",
      leaseId: 0,
      note: "bigger than you deams",
      postnr: "4200",
      postnrnavn: "Slagelse",
      rooms: 3,
      size: 1162,
      supplerendebynavn: '',
      title: "little farm house",
      typeId: 4,
      usertoken: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      vejnavn: "Nykøbing Landevej"
    },
    {
      id: 22,
      address: "Lucievej 6A, Vejlby, 7673 Harboøre",
      href: "https://api.dataforsyningen.dk/adresser/1df3184c-7291-61d6-e044-0003ba298018",
      husnr: "6A",
      leaseId: 0,
      note: "nicely maintained",
      postnr: "7673",
      postnrnavn: "Harboøre",
      rooms: 6,
      size: 180,
      supplerendebynavn: "Vejlby",
      title: "Face toward sun",
      typeId: 3,
      usertoken: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
      vejnavn: "Lucievej"
    }
  ];

}
