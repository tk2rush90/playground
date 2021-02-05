import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioColorItemComponent } from './audio-color-item.component';

describe('AudioColorItemComponent', () => {
  let component: AudioColorItemComponent;
  let fixture: ComponentFixture<AudioColorItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioColorItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioColorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
