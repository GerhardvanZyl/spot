import { IPatientViewModel } from './ipatient.viewmodel';
import { IPatient } from '../model/ipatient';
import { IPracticeViewModel } from './ipractice.viewmodel';
import { IOwner } from '../model/iowner';
import { IOwnerViewModel } from './iowner.viewmodel';
import { IAddressViewModel } from './iaddress.viewmodel';

export class PatientViewModel implements IPatientViewModel {
    id: string;
    name: string;
    ownerName: string;
    surname: string;
    isBloodDonor: string;
    bloodType: string;
    practiceId: string;
    practiceName: string;
    email: string;
    phone: string;
    lastBloodDonationDate: string;

    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.surname = data.owners?.length > 0 ? data.owners[0].surname : '';
        this.ownerName = data.owners?.length > 0 ? data.owners[0].firstName : '';
        this.isBloodDonor = data.isBloodDonor;
        this.bloodType = data.bloodType;
        this.practiceId = data.practiceId;
        this.practiceName = data.practiceName;
        this.email = data.owners?.length > 0 ? data.owners[0].emailAddresses[0] : '';
        this.phone = data.owners?.length > 0 ? data.owners[0].phoneNumbers[0] : '';
        this.lastBloodDonationDate = this.lastBloodDonationDate ? this.lastBloodDonationDate : '';
    }

}