import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Paper } from 'src/app/models/Paper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})

export class FilesComponent implements OnInit, OnDestroy {
  public files: any;

  constructor(private apiService: ApiService, private router: Router) { }

  getAllFiles(){
    this.apiService.getFiles()
      .subscribe(res => {
        console.log('result',res);
        this.files = res;
      }, err => {
        console.log(err);
      });
  }

  updatePaper(paper: Paper){
    localStorage.setItem("paperId", paper.id)
    this.router.navigate(['user/file/edit']);
  }

  deletePaper(paper: Paper){
    this.apiService.deleteFile(paper.id).subscribe(data=>{
      this.getAllFiles();
    });
  }


  ngOnInit() {
    this.getAllFiles();
  }

  ngOnDestroy(){
    this.files;
  }

}
