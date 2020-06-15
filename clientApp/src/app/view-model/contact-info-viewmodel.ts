import { IContactInfoViewModel } from './icontact-info-viewmodel';
import { IContactInfo } from '../model/icontact-info';

export class ContactInfoViewModel implements IContactInfoViewModel {
    value: string;
    isDefault: boolean;
    contactInfoType: string;

    constructor(model?: IContactInfo){
        if(model){
            this.value = model.value;
            this.isDefault = model.isDefault;
            this.contactInfoType = model.contactInfoType;
        }
    }
}