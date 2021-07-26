import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {




    constructor(private us:UserService,private router :Router) {}
    ngOnInit():void{

    }

  



  file:File;

  selectFile(event)
  {
    this.file=event.target.files[0]
    
  }
  
  
  
  


  onSignup(userObj)
  {


    let formData=new FormData();
    formData.append("photo",this.file,this.file.name)
    formData.append("userObj",JSON.stringify(userObj))
    this.us.createUser(formData).subscribe(
      res=>{
        if(res.message==="User created")
        {
          alert("User created");
          this.router.navigateByUrl("/login")
        }
        else
        {
          alert(res.message)
        }
      },
      err=>
      {
        console.log(err);
        alert("Something went wrong in user creation"); 
      }
    )
  }
}
