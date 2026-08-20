  import { Component, OnInit } from '@angular/core';
  import { BgmService } from '../shared/bgm.service';

  @Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.scss'],
  })
  export class PagesComponent implements OnInit {
    constructor(private bgmService: BgmService) {}

    ngOnInit(): void {
      this.bgmService.init();
    }
  }
