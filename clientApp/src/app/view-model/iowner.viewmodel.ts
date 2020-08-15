import { IAddressViewModel } from './iaddress.viewmodel';

export interface IOwnerViewModel{
    id: string, 
    firstName: string,
    surname: string,
    phoneNumbers: string[],
    emailAddresses: string[],
    address: IAddressViewModel
}