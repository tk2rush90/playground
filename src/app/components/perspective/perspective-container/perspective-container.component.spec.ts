import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectiveContainerComponent } from './perspective-container.component';

describe('PerspectiveContainerComponent', () => {
  let component: PerspectiveContainerComponent;
  let fixture: ComponentFixture<PerspectiveContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerspectiveContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerspectiveContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
