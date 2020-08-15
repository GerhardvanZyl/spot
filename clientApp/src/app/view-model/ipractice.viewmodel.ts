import { IAddress } from '../model/iaddress';
import { IAddressViewModel } from './iaddress.viewmodel';

export interface IPracticeViewModel {
    id: string,
    name: string,
    displayAddress: string,
    address: IAddressViewModel,
    email: string,
    phone: string
}