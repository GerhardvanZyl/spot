import { IAddress } from './iaddress';

export interface IOwner {
    id: string,
    firstName: string,
    surname: string,
    phoneNumbers: string[],
    emailAddresses: string[],
    address: IAddress
}