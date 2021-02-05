import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

const {
  prefix,
} = environment;

@Component({
  selector: 'app-audio-visualization-page',
  templateUrl: './audio-visualization-page.component.html',
  styleUrls: ['./audio-visualization-page.component.scss']
})
export class AudioVisualizationPageComponent implements OnInit {
  // url prefix
  prefix = prefix;

  ngOnInit(): void {
  }

}
