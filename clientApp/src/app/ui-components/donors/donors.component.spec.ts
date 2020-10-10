import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PatientService } from 'src/app/services/patient.service';
import { PracticeService } from 'src/app/services/practice.service';

import { DonorsComponent } from './donors.component';

describe('DonorsComponent', () => {
  let component: DonorsComponent;
  let fixture: ComponentFixture<DonorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DonorsComponent],
      providers: [
        {
          provide: PatientService, useValue: {
            getDonors: () => of([
              {
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
              },
              {
                "email": "P@abc.com",
                "id": "5f6df7c567354700d4e9d02e",
                "lastBDDisplayDate": "2020-09-24T22:00:00.000Z",
                "lastBloodDonationDate": {
                  "day": 25,
                  "month": 9,
                  "year": 2020
                },
                "name": "Spot",
                "ownerName": "Jan",
                "phone": "011134352134",
                "practiceId": "5f6df7a867354700d4e9d02a",
                "practiceName": "AA",
                "surname": "Poggenpoel"
              },
              {
                "email": "koos@gmailc.om",
                "id": "5f6e3db467354700d4e9d06a",
                "lastBDDisplayDate": "2020-08-04T22:00:00.000Z",
                "lastBloodDonationDate": {
                  "day": 5,
                  "month": 8,
                  "year": 2020
                },
                "name": "Fido",
                "ownerName": "Koos",
                "phone": "0112323523",
                "practiceId": "5f6df7a867354700d4e9d02a",
                "practiceName": "AA",
                "surname": "Smith"
              }
            ])
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
