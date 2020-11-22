import { IOwner } from '../model/iowner';
import { PracticeViewModel } from './practice.viewmodel';
import { IOwnerViewModel } from './iowner.viewmodel';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CommentViewModel } from './comment.viewmodel';

export interface IPatientViewModel {
    id: string,
    name: string,
    ownerName: string,
    surname: string,
    isBloodDonor: string,
    bloodType: string,
    practiceId: string,
    practiceName: string,
    email: string,
    phone: string,
    lastBloodDonationDate: NgbDateStruct,
    lastBDDisplayDate: Date,
    comments: CommentViewModel[]
}