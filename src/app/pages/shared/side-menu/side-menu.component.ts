  import { Component } from '@angular/core';
  import { BgmService } from '../../../shared/bgm.service';

  @Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
  })
  export class SideMenuComponent {
    isBgmPlaying$ = this.bgmService.playing$;

    constructor(private bgmService: BgmService) {}

    toggleBgm(): void {
      this.bgmService.toggle();
    }
  }
