import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  products=[];
  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.adminService.getProducts().subscribe(
      res=>{
        this.products=res.message;
      },
      err=>{
        console.log("err in reading products ",err)
        console.log("Something went wrong in reading products")
      }
    )
  }
}
