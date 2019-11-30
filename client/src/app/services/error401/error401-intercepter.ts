import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import {tap} from "rxjs/operators";
import { PreloaderService } from '../preloader.service';
import swal, { SweetAlertType } from 'sweetalert2';
import { SweetAlert2 } from 'src/app/utilities/sweetalert2/sweetalert2';

@Injectable()
export class Error401Intercepter implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Do whatever you want to do with the Request
    // console.log("Interceptor!");
    return next.handle(req).pipe(
      tap(
        event => {
          console.log(event);
      },
        error => {
            if (error.status === 'failed') {
              console.log(error.status);
              SweetAlert2.showModalSweetAlert(error.message,error.status, "error");
              PreloaderService.hidePreloader();
            }
        })
    );
  }

  showModalSweetAlert(title: string, text: string, type: SweetAlertType) {
    swal({
      title: title,
      text: text,
      type: type
    });
  }

}
