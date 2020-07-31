import { IOwner } from '../model/iowner';
import { IPatientViewModel } from './ipatient-viewmodel';
import { IPatient } from '../model/ipatient';

export class PatientViewModel implements IPatientViewModel {
    id: string;
    name: string;
    surname: string;
    owner: string;
    isBloodDonor: string;
    bloodType: string;
    practice: string;

    constructor(model?: IPatient){
        if(model){
            this.id = model.id,
            this.name = model.name,
            this.surname = model.surname,
            this.owner = model.owners && model.owners.length 
                ? `{model.owners[0].firstName} {model.owners[0].surname}`
                : '',
            this.isBloodDonor = model.isBloodDonor ? 'Yes': 'No',
            this.bloodType = model.bloodType
            //this.practice = model.
                 


        }
    }

}