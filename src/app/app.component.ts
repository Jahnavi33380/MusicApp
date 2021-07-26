import { Component } from '@angular/core';
import { DataService } from './data.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MusicApp';
  constructor(public us:UserService ,private hc:HttpClient){
    
  }
  userObj;
  playlist:Array<any>=[];
  

  ngOnInit(): void {
    this.userObj=JSON.parse(localStorage.getItem("userObj"))
    
     }
     
  userLogout()
  {
   localStorage.clear();
   this.us.userLoginStatus=false; 
  }
}
