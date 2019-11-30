import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Paper} from '../../../../models/Paper';
import Swal, {SweetAlertType} from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { PreloaderService } from 'src/app/services/preloader.service';
import { User } from 'src/app/models/User';
import { HttpClient } from '@angular/common/http';
import { SweetAlert2 } from 'src/app/utilities/sweetalert2/sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public form: FormGroup;

  public paper: Paper = {
    name: "",
    accessible: 0,
    path: "",
    user_id:"",
    file:null
  };

  public isError: boolean = false;
  public msgToUser: string = '';
  public isInfo: boolean = false;
  public info: string = '';
  public loading: boolean = false;
  public userLogged: User = null;

  constructor(private authService: AuthService, public fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      accessible: '',
      avatar: [null]
    })
  }

  ngOnInit() { }

  uploadFile(event) {
    this.isError =false;
    this.msgToUser = "";
    this.isInfo = false;
    this.info   = "";
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()
  }

  submitForm() {
    this.isError =false;
    this.msgToUser = "";
    this.isInfo = false;
    this.info   = "";
    PreloaderService.showPreloader();

    if(this.form.get('accessible').value && this.form.get('avatar').value){
      var formData: any = new FormData();
      formData.append("accessible", this.form.get('accessible').value);
      formData.append("avatar", this.form.get('avatar').value);

      const options = {
        headers: {
          'authorization': localStorage.getItem('accessToken')
        }
      }

      this.http.post('http://localhost:8080/file/upload', formData, options).subscribe(
        (response) => {
          console.log("message",response)
          if(response['status']==='success'){
            this.isInfo = true;
            this.info   = response['message'];
          }else{
            SweetAlert2.showModalSweetAlert("This File already uploaded", "Unique ", "error");
          }
        },
        (error) => console.log("eror",error)
      )
    }else{
      this.isError =true;
      this.msgToUser = "All fields are required";
    }
    PreloaderService.hidePreloader();
  }

  showModalSweetAlert(title: string, text: string, type: SweetAlertType) {
    Swal({
      title: title,
      text: text,
      type: type
    });
  }

}
