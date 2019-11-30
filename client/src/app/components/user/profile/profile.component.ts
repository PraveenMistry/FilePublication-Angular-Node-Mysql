import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/User";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userLogged: User = null;

  constructor(private authService: AuthService, private router: Router) {}

  private getUserLogged(): void {
    let usr: User = this.authService.getCurrentUser();
    if (usr != null) {
      this.userLogged = usr;
    }
  }

  ngOnInit() {
    this.getUserLogged();
  }

}
