import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PursachesComponent } from './pursaches.component';

describe('PursachesComponent', () => {
  let component: PursachesComponent;
  let fixture: ComponentFixture<PursachesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PursachesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PursachesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
