import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { studentdata } from './student.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  showadd!:boolean;
  showupdate!:boolean;
  formvalue!:FormGroup;
  studentmodelobj:studentdata=new studentdata;
  allstudent:any;
  constructor(private formbuilder:FormBuilder,private api:ApiService) { }

  ngOnInit(): void {
    this.formvalue=this.formbuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      mobile:['',Validators.required],
      city:['',Validators.required]
    })
    this.getallstudent();
  }
  add(){
    this.showadd=true;
    this.showupdate=false;
    
  }
  update(){
    this.showadd=false;
    this.showupdate=true;
  }
  addstudent(){
    this.studentmodelobj.name = this.formvalue.value.name;
    this.studentmodelobj.email = this.formvalue.value.email;
    this.studentmodelobj.mobile = this.formvalue.value.mobile;
    this.studentmodelobj.city = this.formvalue.value.city;
    this.api.poststudent(this.studentmodelobj).subscribe(res=>{
      alert("record added success!");
      this.formvalue.reset();
      this.getallstudent();
    },
      err=>{
        alert("somthing went wrong!");
      }
    )
  }
  getallstudent(){
    this.api.getstudent()
    .subscribe(res=>{
      this.allstudent=res;
    })
  }

}
