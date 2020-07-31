import { IOwner } from '../model/iowner';

export interface IPatientViewModel {
    name: string,
    surname: string,
    owner: string,
    isBloodDonor: string,
    bloodType: string,
    practice: string
}