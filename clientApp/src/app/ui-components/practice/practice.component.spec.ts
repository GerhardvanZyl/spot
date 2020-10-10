import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PracticeService } from 'src/app/services/practice.service';
import { PracticeComponent } from './practice.component';

describe('PracticeComponent', () => {
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PracticeComponent],
      imports: [RouterTestingModule, FormsModule],
      providers: [
        {
          provide: PracticeService, useValue: {
            getPractice: () => of({
              "address": {},
              "displayAddress": "",
              "email": "ABC@prac.com",
              "id": "5f6df7a867354700d4e9d02a",
              "name": "AA",
              "phone": "0112234"
            })
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              params: {
                id: 1
              }
            }
          }
        }        
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
