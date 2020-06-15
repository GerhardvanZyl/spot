import {IPracticeViewModel} from './ipractice-viewmodel';
import {IPractice} from '../model/ipractice';
import {IContactInfo} from '../model/icontact-info';
import { ContactInfoViewModel } from './contact-info-viewmodel';
import { IAddress } from '../model/iaddress';

export class PracticeViewModel implements IPracticeViewModel {
    id: string;
    name: string;
    address: IAddress;
    defaultEmail: string;
    defaultPhone: string;
    emailAddresses: IContactInfo[];
    phoneNumbers: IContactInfo[];

    get broadLocation(): string {
        let retval = "";

        if(this.address?.suburb){
            retval += this.address.suburb;
            retval += this.address?.city ? ', ' : ' ';
        } 

        if(this.address?.city) retval += this.address.city;

        return retval;
    }

    constructor(model?: IPractice){
        if(model){
            this.id = model.id;
            this.name = model.name;
            this.address = model.address ? {...model.address} : <IAddress>{};
            this.defaultEmail = model.emailAddresses.find(x => x.isDefault === true).value;
            this.defaultPhone = model.phoneNumbers.find(x => x.isDefault === true).value;
            this.emailAddresses = model.emailAddresses.map( c => {
                return new ContactInfoViewModel(c);
            });

            this.phoneNumbers = model.phoneNumbers.map( p => {
                return new ContactInfoViewModel(p);
            });

            if(this.emailAddresses.length === 0) this.emailAddresses.push(<IContactInfo>{});
            if(this.phoneNumbers.length === 0) this.phoneNumbers.push(<IContactInfo>{});
        } else {
            this.emailAddresses = [<IContactInfo>{}];
            this.phoneNumbers = [<IContactInfo>{}];
            this.address = <IAddress>{};
        }
    }
}