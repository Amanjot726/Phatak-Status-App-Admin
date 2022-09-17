import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { InchargesComponent } from './incharges.component';

describe('InchargesComponent', () => {
  let component: InchargesComponent;
  let fixture: ComponentFixture<InchargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InchargesComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InchargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
