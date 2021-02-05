import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';

const {
  prefix,
} = environment;

@Component({
  selector: 'app-perspective-page',
  templateUrl: './perspective-page.component.html',
  styleUrls: ['./perspective-page.component.scss']
})
export class PerspectivePageComponent implements OnInit {
  // url prefix
  prefix = prefix;

  constructor() { }

  ngOnInit(): void {
  }

}
