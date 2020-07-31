import { IAddress } from './iaddress';
import { IOwner } from './iowner';

export interface IPatient {
    id: string,
    name: string,
    surname: string,
    owners: IOwner[],
    isBloodDonor: Boolean,
    bloodType: string,
    practiceId: string
}