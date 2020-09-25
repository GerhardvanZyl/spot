import { IPatientViewModel } from './ipatient.viewmodel';
import { IPatient } from '../model/ipatient';
import { IPracticeViewModel } from './ipractice.viewmodel';
import { IOwner } from '../model/iowner';
import { IOwnerViewModel } from './iowner.viewmodel';
import { IAddressViewModel } from './iaddress.viewmodel';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

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
    lastBloodDonationDate: NgbDateStruct;
    lastBDDisplayDate: Date;

    constructor(data?: any){
        
        if(!data) return;

        this.id = data.id ? data.id : '';
        this.name = data.name ? data.name : '';
        this.surname = data.owners?.length > 0 ? data.owners[0].surname : '';
        this.ownerName = data.owners?.length > 0 ? data.owners[0].firstName : '';
        this.isBloodDonor = data.isBloodDonor;
        this.bloodType = data.bloodType;
        this.practiceId = data.practiceId;
        this.practiceName = data.practiceName;
        this.email = data.owners?.length > 0 ? data.owners[0].emailAddresses[0] : '';
        this.phone = data.owners?.length > 0 ? data.owners[0].phoneNumbers[0] : '';

        if(data.lastBloodDonationDate) {

            this.lastBDDisplayDate = new Date(data.lastBloodDonationDate);
            
            this.lastBloodDonationDate = <NgbDateStruct>{
                year: this.lastBDDisplayDate.getFullYear(),
                month: this.lastBDDisplayDate.getMonth() + 1,
                day: this.lastBDDisplayDate.getDate()
            }
        } else {
            this.lastBloodDonationDate = {
                year: null,
                month: null,
                day: null
            };
        }

    }

}