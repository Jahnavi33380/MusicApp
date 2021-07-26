import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  constructor(private us:UserService,private router:Router) { 
   
  }

  ngOnInit():void{
    
  }
  onLogin(userCredentials)
  {
    this.us.loginUser(userCredentials).subscribe(
      res=>{
        if(res.message==="Login success"){
          localStorage.setItem("token",res.token)
          localStorage.setItem("username",res.username)
          localStorage.setItem("userObj",JSON.stringify(res.userObj))
          
          this.us.userLoginStatus=true;

          if(userCredentials.type==="user"){
          this.router.navigateByUrl(`userprofile/${res.username}`)
          }
          if(userCredentials.type==="admin"){
            this.router.navigateByUrl(`admin/${res.username}`)
          }
      }
      else{
            alert(res.message)
      }},
      err=>
      {
        console.log(err)
        alert("Something went wrong in login")

      }
    )

  }  

}
