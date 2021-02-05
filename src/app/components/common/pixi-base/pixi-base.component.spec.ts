import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PixiBaseComponent } from './pixi-base.component';

describe('PixiBaseComponent', () => {
  let component: PixiBaseComponent;
  let fixture: ComponentFixture<PixiBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PixiBaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PixiBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
