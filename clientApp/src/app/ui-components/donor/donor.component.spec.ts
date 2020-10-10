import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { PracticeService } from 'src/app/services/practice.service';

import { DonorComponent } from './donor.component';

describe('DonorComponent', () => {
  let component: DonorComponent;
  let fixture: ComponentFixture<DonorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonorComponent],
      imports: [RouterTestingModule, FormsModule, NgbModule],
      providers: [
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                id: 1
              }
            }
          }
        },
        {
          provide: PracticeService, useValue: {
            getPractices: () => of([
              {
                "address": {},
                "displayAddress": "",
                "email": "ABC@prac.com",
                "id": "5f6df7a867354700d4e9d02a",
                "name": "AA",
                "phone": "0112234"
              },
              {
                "address": {},
                "displayAddress": "",
                "email": "Oli@vet.com",
                "id": "5f81c8f5d17fcc1bc03fbc79",
                "name": "Olivet",
                "phone": "011241254"
              }
            ])
          }
        },
        {
          provide: PatientService, useValue: {
            getPatient: () => of({
              "email": "ka@gmail.com",
              "id": "5f6e3dcf67354700d4e9d06f",
              "lastBDDisplayDate": "2020-08-31T22:00:00.000Z",
              "lastBloodDonationDate": {
                "day": 1,
                "month": 9,
                "year": 2020
              },
              "name": "Rex",
              "ownerName": "Karen",
              "phone": "01137852302",
              "surname": "Karenator"
            })
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
