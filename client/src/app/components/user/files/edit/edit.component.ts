import { Component, OnInit } from '@angular/core';
import { Paper } from 'src/app/models/Paper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public paper: Paper;
  public editForm: FormGroup;
  public submitted = false;
  public isError: boolean = false;
  public msgToUser: string = '';
  public isInfo: boolean = false;
  public info: string = '';
  public paperName: string = '';
  public paperId: string='';

  constructor(private formBuilder: FormBuilder, private router: Router, private apiService: ApiService) { }

  ngOnInit() {
    this.paperId = localStorage.getItem("paperId");
    if(!this.paperId){
      alert("Something wrong!");
      this.router.navigate(['']);
      return;
    }
    this.editForm = this.formBuilder.group({
      accessible: ['', Validators.required]
    });

    this.apiService.getPaperById(this.paperId).subscribe(data=>{
      this.paperName = data.name;
      this.editForm.patchValue({accessible:data.is_accessible}); //Don't use editForm.setValue() as it will throw console error
    });

  }

  submitForm(){
    this.submitted = true;
    if(this.editForm.valid){
      this.apiService.updatePaper(this.editForm.value)
      .subscribe( data => {
        this.router.navigate(['/user/files']);
      });
    }
  }

}

