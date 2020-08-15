import { IAddress } from './iaddress';

export interface IPractice {
    id:string,
    name: string,
    address: string,
    emailAddresses: string[],
    phoneNumbers: string[]
}