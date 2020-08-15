import { Component, OnInit } from '@angular/core';
import { IContactInfoViewModel } from 'src/app/view-model/icontact-info.viewmodel';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.less']
})
export class ContactInfoComponent implements OnInit {

  contactInfo: IContactInfoViewModel

  constructor() { }

  ngOnInit(): void {
  }

}
