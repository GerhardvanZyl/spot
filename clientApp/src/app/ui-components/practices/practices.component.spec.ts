import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PracticeService } from 'src/app/services/practice.service';

import { PracticesComponent } from './practices.component';

describe('PracticesComponent', () => {
  let component: PracticesComponent;
  let fixture: ComponentFixture<PracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticesComponent],
      providers: [
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
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
