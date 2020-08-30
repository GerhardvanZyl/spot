import { IPractice } from './ipractice';
import { IAddress } from './iaddress';
import { IPracticeViewModel } from '../view-model/ipractice.viewmodel';

export class Practice implements IPractice {
    id: string;
    name: string;
    address: string;
    emailAddresses: string[];
    phoneNumbers: string[];

    // TODO: check if exists before overwriting
    constructor(data: any) {
        if (data) {
            this.id = data.id,
            this.name = data.name,
            this.address = { ...data.address },
            this.emailAddresses = [data.email],
            this.phoneNumbers = [data.phone]
        }
    }

}

