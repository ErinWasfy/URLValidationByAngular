import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { Observable, of } from "rxjs";
import { delay,map } from 'rxjs/internal/operators';
import { flatten } from '@angular/compiler';
 import { Injectable } from "@angular/core";
 import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { RequestOptions, ResponseOptions } from "@angular/http";
import { UrlExistence } from "./validation/url-exists.component";
import urlExists from "url-exist"

@Injectable({
    providedIn: 'root'
  })
export class ValidationCheckService{
   constructor(private urlexistence:UrlExistence,private http:HttpClient){
 
  }
    urlValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
         
         return this.checkUrlValidity(control.value).pipe(
            map((res) => {
             // console.log(res);
              // if res is true, url is valid, return true
              return res ? { validURL: true } : null;
              // NB: Return null if there is no error
            })
          );
        };
        
      }
      // urlValidatorExistence(): AsyncValidatorFn {
      //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
          
      //   };
      // }
      checkUrlValidity(localUrl: string): Observable<boolean>{
      let valid = true;
     try{
      let validUrl=new RegExp("(https?|ftp)://(www.)?(?!.*(ftp|http|https|www.))[-a-zA-Z0-9@:%._\+~#=]{1,256}[.][a-zA-Z0-9()]{3,6}");//(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$");
     
      if(!validUrl.test(localUrl))
        valid=false;
       }   
      catch{
        valid=false;
         }
       //  console.log(new URL(localUrl).pathname);
       return of(valid).pipe();   
      }
      
      //  return this.http.get(localUrl,{'observe':'response',headers:new HttpHeaders(
      //   {
      //     'Content-Type': 'application/json',
      //     'X-Requested-With': 'XMLHttpRequest'
      //   })})
      //   .pipe(map(response=>{
      //   return response.ok;
      //  }),delay(1000));
     // }
}
