import { AuthService } from './../../services/auth.service';
// import { Location } from '@angular/common';
import { User } from './../../models/User';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {PreloaderService} from "../../services/preloader.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // app name
  public app_name = 'File Publication System';
  public isLogged: boolean = false;
  public userLogged: User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.isLogged.subscribe(
      value => {
        this.isLogged = value;
      }
    );
    this.authService.userLogged.subscribe(
      value => {
        this.userLogged = value;
      }
    );
  }

  onLogout() {

    PreloaderService.showPreloader();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('currentUser');
    this.router.navigate(['/user/login']);
    this.authService.isLogged.next(false);
    this.authService.userLogged.next(null);
    PreloaderService.hidePreloader();

    // location.reload();
  }

  onCheckUserLogged(): void {
    let usr: User = this.authService.getCurrentUser();
    if (usr == null) {
      this.isLogged = false;
      this.authService.isLogged.next(false);
    } else {
      this.isLogged = true;
      this.authService.isLogged.next(true);
      this.userLogged = usr;
      this.authService.userLogged.next(usr);
      // this.dataSharingService.isLogged.next(this.isLogged);
    }
  }

  ngOnInit() {
    this.onCheckUserLogged();
  }

}
