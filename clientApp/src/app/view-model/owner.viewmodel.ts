import { IOwnerViewModel } from './iowner.viewmodel';
import { IOwner } from '../model/iowner';
import { IAddressViewModel } from './iaddress.viewmodel';

export class OwnerViewModel implements IOwnerViewModel {
    id: string;
    firstName: string;
    surname: string;
    phoneNumbers: string[];
    emailAddresses: string[];
    address: IAddressViewModel;

    constructor(owner: IOwner){
        this.id = owner.id;
        this.firstName = owner.firstName;
        this.surname = owner.surname;
    }
}