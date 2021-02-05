import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioLoadingComponent } from './audio-loading.component';

describe('AudioLoadingComponent', () => {
  let component: AudioLoadingComponent;
  let fixture: ComponentFixture<AudioLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
