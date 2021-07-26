import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    
  }

  file:File;
  selectFile(event){
     this.file= event.target.files[0]
    
  }

  onAddProduct(prodObj:any){

    console.log("prod obj",prodObj)
    //create FOrmData obj
    let formData=new FormData();
    //add file
    formData.append("photo",this.file,this.file.name)
    //add userObj
    formData.append("prodObj",JSON.stringify(prodObj))

    this.adminService.addNewProduct(formData).subscribe(
      res=>{
          if(res.message=='New product added'){
            alert("New product added")
            //navigate to view products 
          }
          else{
            alert(res.message)
          }
      },
      err=>{
        console.log("err in adding rpoduct",err)
        alert("Something went wrong in adding product")
      }
    )
   
  }
}
