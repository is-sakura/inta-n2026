import { Component, OnInit } from '@angular/core';
import { TitleBadgeService } from '../../../shared/title-badge.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
  export class HeaderComponent implements OnInit {
    badgeTitle$ = this.titleBadgeService.title$;
  
    constructor(private titleBadgeService: TitleBadgeService) {}
  
    ngOnInit(): void {
      this.titleBadgeService.restore();
    }
  }
