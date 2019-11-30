import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User} from "../../../models/User";
import {PreloaderService} from "../../../services/preloader.service";
import Swal, {SweetAlertType} from 'sweetalert2';
import { SweetAlert2 } from "../../../utilities/sweetalert2/sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: User = {
    name: "",
    email: "",
    password: ""
  };

  public isError = false;
  public msgToUser = '';

  constructor(private authService: AuthService, private router: Router) {}

  // register user
  onRegister(form: NgForm): void {
    if (form.valid) {
      PreloaderService.showPreloader();
      this.authService
      .registerUser(this.user.name, this.user.email, this.user.password)
      .subscribe(user => {
          this.router.navigate(['/user/login']);
          PreloaderService.hidePreloader();
          SweetAlert2.showModalSweetAlert("Registration Successful", "Now you must login", "success");
        },
        (error: any) => {
          this.onMessage(error.message);
          PreloaderService.hidePreloader();
         }
      );
    } else {
      this.onMessage("All data is required");
      PreloaderService.hidePreloader();
    }
  }

  onMessage(msg): void {
    this.isError = true;
    this.msgToUser = msg;
    setTimeout(() => {
      this.isError = false;
    }, 4000);
  }



  showModalSweetAlert(title: string, text: string, type: SweetAlertType) {
    Swal({
      title: title,
      text: text,
      type: type
    });
  }

  ngOnInit() {
  }

}
