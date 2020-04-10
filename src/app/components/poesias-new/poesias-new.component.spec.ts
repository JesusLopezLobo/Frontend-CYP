import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoesiasNewComponent } from './poesias-new.component';

describe('PoesiasNewComponent', () => {
  let component: PoesiasNewComponent;
  let fixture: ComponentFixture<PoesiasNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoesiasNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoesiasNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
