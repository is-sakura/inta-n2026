  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';

  declare global {
    interface Window {
      YT: any;
      onYouTubeIframeAPIReady: () => void;
    }
  }

  const VIDEO_ID = 'Q53CDIGPJ58';

  @Injectable({
    providedIn: 'root'
  })
  export class BgmService {
    private player: any;
    private playingSubject = new BehaviorSubject<boolean>(false);
    playing$ = this.playingSubject.asObservable();

    init(): void {
      if (window.YT && window.YT.Player) {
        this.createPlayer();
        return;
      }
      window.onYouTubeIframeAPIReady = () => this.createPlayer();

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(script);
    }

    toggle(): void {
      if (!this.player) return;
      this.playingSubject.value ? this.player.pauseVideo() : this.player.playVideo();
    }

    private createPlayer(): void {
      this.player = new window.YT.Player('bgm-player', {
        videoId: VIDEO_ID,
        playerVars: { loop: 1, playlist: VIDEO_ID },
        events: {
          onStateChange: (e: any) => {
            this.playingSubject.next(e.data === window.YT.PlayerState.PLAYING);
          }
        }
      });
    }
  }
