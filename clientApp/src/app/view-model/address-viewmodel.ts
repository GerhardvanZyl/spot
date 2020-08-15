import { IAddressViewModel } from './iaddress.viewmodel';

export class AddressViewModel implements IAddressViewModel {
    line1: string;
    line2: string;
    suburb: string;
    city: string;
    province: string;
    postalCode: string;

    constructor(address: any){
        this.line1 = address.line1;
        this.line2 = address.line2;
        this.suburb = address.suburb;
        this.city = address.city;
        this.province = address.province;
        this.postalCode = address.postalCode;
    }
}