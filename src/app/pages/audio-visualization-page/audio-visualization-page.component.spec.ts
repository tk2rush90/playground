import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioVisualizationPageComponent } from './audio-visualization-page.component';

describe('AudioVisualizationPageComponent', () => {
  let component: AudioVisualizationPageComponent;
  let fixture: ComponentFixture<AudioVisualizationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioVisualizationPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioVisualizationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
