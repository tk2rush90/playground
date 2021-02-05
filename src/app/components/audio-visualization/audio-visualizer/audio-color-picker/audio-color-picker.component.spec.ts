import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioColorPickerComponent } from './audio-color-picker.component';

describe('AudioColorPickerComponent', () => {
  let component: AudioColorPickerComponent;
  let fixture: ComponentFixture<AudioColorPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioColorPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
