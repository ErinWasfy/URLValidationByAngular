import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpRequest, HttpResponse } from "@angular/common/http";
import { Component, Injectable, OnDestroy, OnInit } from "@angular/core";
import { ValidationErrors } from "@angular/forms";
import { Body } from "@angular/http/src/body";
import { Observable, Subscription, of, throwError } from "rxjs";
import { catchError, delay, map } from "rxjs/internal/operators";


@Injectable({
    providedIn: 'root'
  })
export class UrlExistence implements OnInit,OnDestroy{
  respStatus:boolean=true;
  message:Subscription;
constructor(private http:HttpClient,private htp:XMLHttpRequest){
  this.message=new Subscription;
}
 valid:number=-1;
getUrl(localUrl:string):Observable<boolean>{
//   this.htp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        alert(this.responseText);
// }
//};

this.htp.open('GET','http://www.google.com.eg');
this.htp.withCredentials = true;
  this.htp.setRequestHeader('Access-Control-Allow-Headers', '*');
  this.htp.setRequestHeader('Content-Type','application/json');
 this.htp.setRequestHeader('responseType','text');
  console.log(this.htp.status);
  this.htp.setRequestHeader('Access-Control-Allow-Origin', '*');
  this.htp.send();
  console.log(this.htp.getAllResponseHeaders);
 
 return this.http.get(localUrl,{observe:'response',headers:new HttpHeaders({'Access-Control-Allow-Origin':'always','Accepts':'*/*','Content-Type': 'text/plain', accept: 'application/json'}),responseType: 'text' as 'json'}).
// subscribe(response=>{
//   console.log(response.status);
// })
pipe(map(resp=>{
return resp.ok
}));
//return this.valid;
}
ngOnInit(): void {
  
}
ngOnDestroy(): void {
  this.message.unsubscribe();
}
async checkExistence(localUrl:string):Promise<number>{
  
  

    //   .catch(console.log);;
  return this.http.get(localUrl,{observe:"response"
  ,headers:new HttpHeaders({
    'Access-Control-Allow-Origin':'*',
    'mode':'no cors'
  })
}).toPromise()
  .then(response => {
       return response.status;
        console.log(response.status);
    });
// .pipe(
//     map((response)=>{
//      return response.status;
//     }
//      ),delay(1000));
   // .toPromise()
  //   .then(response => {
  //      return response.status;
  //       console.log(response.status);
  //   })
  //   .catch(console.log);
}
}