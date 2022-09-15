import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InchargesComponent } from './incharges.component';

describe('InchargesComponent', () => {
  let component: InchargesComponent;
  let fixture: ComponentFixture<InchargesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InchargesComponent ]
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
