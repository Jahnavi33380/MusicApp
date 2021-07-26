import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from '../view/view.component';
import { AddComponent } from './add/add.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [{ path: '', component: AdminComponent ,children:[
  {path:"add",component:AddComponent},
  {path:"view",component:ViewComponent},
  
  {path:'',redirectTo:"add",pathMatch:"full"}
  
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }