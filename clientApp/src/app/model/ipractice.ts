import { IContactInfo } from './icontact-info';
import { IAddress } from './iaddress';

export interface IPractice {
    id:string,
    name: string,
    address: IAddress,
    emailAddresses: IContactInfo[],
    phoneNumbers: IContactInfo[]
}