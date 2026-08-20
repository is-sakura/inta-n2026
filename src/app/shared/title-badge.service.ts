
  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';

  const STORAGE_KEY = 'trainerBadge';
  const EXPIRY_MS = 24 * 60 * 60 * 1000;

  interface StoredBadge {
    title: string;
    expiresAt: number;
  }

  @Injectable({ providedIn: 'root' })
  export class TitleBadgeService {
    private titleSubject = new BehaviorSubject<string | null>(null);
    title$ = this.titleSubject.asObservable();

    restore(): void {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const stored: StoredBadge = JSON.parse(raw);
      if (Date.now() > stored.expiresAt) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
      this.titleSubject.next(stored.title);
    }

    setTitle(pokemonName: string): void {
      const title = `大型の${pokemonName}のトレーナー`;
      const stored: StoredBadge = { title, expiresAt: Date.now() + EXPIRY_MS };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
      this.titleSubject.next(title);
    }
  }

