import { IContactInfo } from './icontact-info';

export interface IOwner {
    id: string,
    firstName: string,
    surname: string,
    phoneNumbers: IContactInfo[],
    emailAddresses: IContactInfo[],
    address: IContactInfo
}