import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerspectivePageComponent } from './perspective-page.component';

describe('PerspectivePageComponent', () => {
  let component: PerspectivePageComponent;
  let fixture: ComponentFixture<PerspectivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerspectivePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerspectivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
