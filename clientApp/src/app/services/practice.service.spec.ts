import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from './data.service';

import { PracticeService } from './practice.service';

describe('PracticeService', () => {
  let service: PracticeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{
        provide: DataService, useValue: {
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
          ]),
          postPractice: (practice) => { },
          getPracticeById: (id) => of({
            "address": {},
            "displayAddress": "",
            "email": "ABC@prac.com",
            "id": id,
            "name": "AA",
            "phone": "0112234"
          }),
          deletePractice: (id) => { },
        }
      }]
    });
    service = TestBed.inject(PracticeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
