import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloaderService {

  constructor() { }

  static showPreloader() {
    document.getElementById('preloader').style.display = 'block';
  }

  static hidePreloader() {
    document.getElementById('preloader').style.display = 'none';
  }
}
