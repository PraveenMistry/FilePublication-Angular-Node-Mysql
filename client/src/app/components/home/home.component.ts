import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Paper } from 'src/app/models/Paper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public files: any;
  public fileCount : number;
  constructor(private apiService: ApiService, private router: Router) { }


  getAllPublicFiles(){
    this.apiService.getPublicFiles()
      .subscribe(res => {
        this.files = res;
        this.fileCount = res.length;
      }, err => {
        console.log(err);
      });
  }

  ngOnInit() {
    this.getAllPublicFiles();
  }



}
