import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoesiasDetailComponent } from './poesias-detail.component';

describe('PoesiasDetailComponent', () => {
  let component: PoesiasDetailComponent;
  let fixture: ComponentFixture<PoesiasDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoesiasDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoesiasDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
