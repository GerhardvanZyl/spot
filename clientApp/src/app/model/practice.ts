import {IPractice} from './ipractice';
import { IAddress } from './iaddress';
import { IPracticeViewModel } from '../view-model/ipractice.viewmodel';

export class Practice implements IPractice {
    id: string;
    name: string;
    address: string;
    emailAddresses: string[];
    phoneNumbers: string[];

    // TODO: check if exists before overwriting
    constructor(practiceViewModel: any){
        this.id = practiceViewModel.id,
        this.name = practiceViewModel.name,
        this.address = {...practiceViewModel.address},
        this.emailAddresses = [practiceViewModel.email],
        this.phoneNumbers = [practiceViewModel.phone]
    }

}

