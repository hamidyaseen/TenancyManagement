import { IPropertyType } from "../model/property-type";

export class PropertyType {
  public static Types: IPropertyType[] = [
    { id: 1, name: 'Lejlighed' },
    { id: 2, name: 'Rækkehus' },
    { id: 3, name: 'Vila' },
    { id: 4, name: 'Landejendom' },
    { id: 5, name: 'En Rum', descript: 'Kollegium rum' },
    { id: 6, name: 'Andet' }
  ];
}
