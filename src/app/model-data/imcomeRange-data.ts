import { IIncomeRange } from "../model/incomeRange";

export class IncomeRage {
  public static ranges: IIncomeRange[] = [
    { id: 1, range: '0-5000', currency: 'DKK' },
    { id: 2, range: '5000-1000', currency: 'DKK' },
    { id: 3, range: '10000-20000', currency: 'DKK' },
    { id: 4, range: '20000-30000', currency: 'DKK' },
    { id: 5, range: '30000-45000', currency: 'DKK' },
    { id: 6, range: '45000-60000', currency: 'DKK' },
    { id: 7, range: '60000-90000', currency: 'DKK' },
    { id: 8, range: '90000-120000', currency: 'DKK' },
    { id: 9, range: '120000-200000', currency: 'DKK' },
    { id: 10, range: '200000-Above', currency: 'DKK' }
  ];
}
