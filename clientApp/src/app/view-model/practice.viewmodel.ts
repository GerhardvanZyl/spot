import {IPracticeViewModel} from './ipractice.viewmodel';
import {IPractice} from '../model/ipractice';
import { IAddress } from '../model/iaddress';
import { IAddressViewModel } from './iaddress.viewmodel';
import { AddressViewModel } from './address-viewmodel';

export class PracticeViewModel implements IPracticeViewModel {
    id: string;
    name: string;
    displayAddress: string;
    address: IAddressViewModel;
    email: string;
    phone: string;
    
    constructor(data?: any){
        if(data){
            this.id = data.id;
            this.name = data.name;
            
            if(data.displayAddress) {
                this.displayAddress = data.displayAddress;
            } else if (data.address) {
                if(data.address.suburb) {
                    this.displayAddress = data.address.suburb;
                } else if(data.address.city) {
                    this.displayAddress = data.address.city;
                } else {
                    this.displayAddress = '';
                }

                this.address = new AddressViewModel(data.address) as IAddressViewModel;
            }

            if(data.emailAddresses && data.emailAddresses.length > 0) {
                this.email = data.emailAddresses[0];
            } else if (data.emailAddress !== null && data.emailAddress !== void(0)) {
                this.email = data.emailAddress;
            } else {
                this.email = '';
            }

            if(data.phoneNumbers && data.phoneNumbers.length > 0) {
                this.phone = data.phoneNumbers[0];
            } else if (data.phoneNumber !== null && data.phoneNumber !== void(0)) {
                this.phone = data.phoneNumber;
            } else if (data.phone !== null && data.phone !== void(0)) {
                this.phone = data.phone;
            } else {
                this.phone = '';
            }
        }
    }
}