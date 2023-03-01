import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedClientSelectModalComponent } from './shared-client-select-modal.component';

describe('SharedClientSelectModalComponent', () => {
  let component: SharedClientSelectModalComponent;
  let fixture: ComponentFixture<SharedClientSelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedClientSelectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedClientSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
