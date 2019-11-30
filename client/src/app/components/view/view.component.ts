import { Component, OnInit } from '@angular/core';
import { FileMimeType } from '@taldor-ltd/angular-file-viewer';
import { ActivatedRoute } from '@angular/router';
import { Paper } from 'src/app/models/Paper';
import { ApiService } from 'src/app/services/api.service';
import { SweetAlert2 } from 'src/app/utilities/sweetalert2/sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public fileMimeType = FileMimeType;
  public src: string;
  public fileName:string;
  public type: FileMimeType;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
   this.route.params.subscribe(params => {
      this.getFileFromServer(params['name'])
   });

  }


  setPath(fileName){
    console.log(fileName)
    this.src = 'http://localhost:8080/public/getFileByName/'+fileName;
    if(this.src){
      var extension = fileName.substring(fileName.lastIndexOf('.')+1);
      switch (extension) {
        case 'png':
          this.type = FileMimeType.PNG;
          break;
        case 'jpeg':
          this.type = FileMimeType.JPEG;
          break;
        case 'jpg':
          this.type = FileMimeType.JPEG;
          break;
        case 'pdf':
          this.type = FileMimeType.PDF;
          break;
        case 'mp4':
          this.type = FileMimeType.MP4;
          break;
      }
    }else{
      SweetAlert2.showModalSweetAlert("File Not Exists",'404', "error");
    }
  }

  getFileFromServer(fileName){
    this.apiService.isFileExists(fileName)
      .subscribe(res => {
        console.log("res",res);
        if(res.status === 'success')
        this.setPath(fileName);
        else
          SweetAlert2.showModalSweetAlert("File Not Exists",'404', "error");
      }, err => {
        console.log(err);
        SweetAlert2.showModalSweetAlert(err.message,err.status, "error");
      });
  }

}
