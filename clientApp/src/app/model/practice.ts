import {IPractice} from './ipractice';
import { IContactInfo } from './icontact-info';
import { IAddress } from './iaddress';

export class Practice implements IPractice {
    id: string;
    name: string;
    address: IAddress;
    emailAddresses: IContactInfo[];
    phoneNumbers: IContactInfo[];
}