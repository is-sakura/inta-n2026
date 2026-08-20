import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZukanComponent } from './zukan.component';

describe('ZukanComponent', () => {
  let component: ZukanComponent;
  let fixture: ComponentFixture<ZukanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZukanComponent]
    });
    fixture = TestBed.createComponent(ZukanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
