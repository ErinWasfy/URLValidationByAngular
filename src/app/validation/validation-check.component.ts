import { flatten } from '@angular/compiler';
import { Component, Input, OnInit,OnChanges, OnDestroy, ViewChild, Inject } from '@angular/core';
import {FormGroup,FormBuilder,Validators, NgForm, FormControl, NgModelGroup} from '@angular/forms';
import{ Subscription} from 'rxjs';
import { ValidationCheckService } from '../validation-check.service';
import { Resolve, Router } from '@angular/router';
import { UrlExistence } from './url-exists.component';

@Component({
  selector: 'validation-check',
  templateUrl: './validation-check.component.html',
  styleUrls: ['./Validation-check.component.css']
})
export class ValidationCheck implements OnInit,OnChanges,OnDestroy{
    // myForm:FormGroup;
    myForm:FormGroup;
     url="";
     constructor(private formBuilder:FormBuilder,private validationService:ValidationCheckService,private urlexist:UrlExistence,@Inject(Document) private document:Document,private router:Router){
   
      this.myForm=this.createForm();
  }
    createForm(){
       return this.formBuilder.group({
      'url':[null,{validators:[Validators.required],
        asyncValidators:[this.validationService.urlValidator()]//,
    // asyncValidators:[this.validationService.urlValidatorExistence()]
      }]
      ,update:'blur'});
    }
    hasError(field: string, error: string): boolean {
      if (error === 'any' || error === '') {
        return (
          this.myForm.controls[field].dirty &&
          this.myForm.controls[field].invalid
        );
      }
  
      //this.frmLogin.controls[field].pending;
  
      return (
        this.myForm.controls[field].dirty &&
        this.myForm.controls[field].hasError(error)
      );
   }
    ngOnInit(){

    }
    ngOnChanges(){
      
    }
    ngOnDestroy() {
    }
    onSubmit()
    {
      console.log(this.myForm);
      this.url=this.myForm.controls['url'].value;
    }
    async redirectToValidLink():Promise<boolean>
    {
    return new Promise((resolve,reject)=>{
        if((this.url!=""))
          {
            this.router.navigate(["/"]).then(res=>{window.location.href=this.url;});
            resolve(true);
          }
          else reject('error');
        })
      
     //window.location.href=this.url;
    }
  
}