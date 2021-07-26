import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  
  userObj;
  playlist:Array<any>=[];
  constructor(private hc:HttpClient ) {
    
   }

  ngOnInit(): void {
    this.userObj=JSON.parse(localStorage.getItem("userObj"))
    
     }
     
  
  getPrivateData(){
    this.hc.get('/user/testing').subscribe(
      res=>{
        alert(res['message'])
      },
      err=>{
        console.log(err)
        alert(err.message)

      }
      
    )
  }
  

}
