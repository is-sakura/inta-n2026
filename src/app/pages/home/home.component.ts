  import { Component } from '@angular/core';
  import { TitleBadgeService } from '../../shared/title-badge.service';

  @Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
  })
  export class HomeComponent {
    badgeTitle$ = this.titleBadgeService.title$;

    constructor(private titleBadgeService: TitleBadgeService) {}
  }

