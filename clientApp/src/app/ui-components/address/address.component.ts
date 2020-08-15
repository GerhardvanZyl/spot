import { Component, OnInit } from '@angular/core';
import { IAddressViewModel } from 'src/app/view-model/iaddress.viewmodel';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.less']
})
export class AddressComponent implements OnInit {

  address: IAddressViewModel;

  constructor() { }

  ngOnInit(): void {

  }

}
