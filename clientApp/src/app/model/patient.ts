import { IPatient } from './ipatient';
import { IOwner } from './iowner';

export class Patient implements IPatient {
    id: string;
    name: string;
    surname: string;
    owners: IOwner[];
    isBloodDonor: Boolean;
    bloodType: string;
    practiceId: string;
    lastBloodDonationDate: string;

    constructor(data: any){
        this.id = data.id;
        this.name = data.name;
        this.surname = data.surname;
        this.owners = [{
            firstName: data.ownerName,
            address: null,
            emailAddresses: [data.email],
            phoneNumbers: [data.phone],
            id: data.id,
            surname: data.surname
        }],
        this.isBloodDonor = data.isBloodDonor;
        this.bloodType = data.bloodType;
        this.practiceId = data.practiceId;
        this.lastBloodDonationDate = data.lastBloodDonationDate;
    }
}