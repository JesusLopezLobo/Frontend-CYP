import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoesiasEditComponent } from './poesias-edit.component';

describe('PoesiasEditComponent', () => {
  let component: PoesiasEditComponent;
  let fixture: ComponentFixture<PoesiasEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoesiasEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoesiasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
