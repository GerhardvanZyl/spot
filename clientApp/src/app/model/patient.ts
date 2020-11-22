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
    comments: Comment[];

    constructor(data: any){

        if(data){

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
        this.comments = data.comments ?? [],
        this.isBloodDonor = data.isBloodDonor;
        this.bloodType = data.bloodType;
        this.practiceId = data.practiceId;
        this.lastBloodDonationDate = data.lastBloodDonationDate 
            ? new Date(`${data.lastBloodDonationDate.year}-${data.lastBloodDonationDate.month}-${data.lastBloodDonationDate.day}`)
                .toString()
            : null;
        }
    }
    
}