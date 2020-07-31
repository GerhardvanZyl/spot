import {IContactInfo} from '../model/icontact-info';
import { IAddress } from '../model/iaddress';

export interface IPracticeViewModel {
    id: string,
    name: string,
    address: IAddress,
    defaultEmail: string,
    defaultPhone: string,
    emailAddresses: IContactInfo[],
    phoneNumbers: IContactInfo[],
    broadLocation: string
}