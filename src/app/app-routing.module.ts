import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseComponent} from './browse/browse.component';
import { ContactusComponent } from './contactus/contactus.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PodcastComponent } from './podcast/podcast.component';
import { RegisterComponent } from './register/register.component';
import { UsercartComponent } from './usercart/usercart.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ViewComponent } from './view/view.component';
const routes: Routes = [


  {path:'home',component:HomeComponent},
   {path:'register',component:RegisterComponent},
   {path:'login',component:LoginComponent},
   {path:"userprofile/:username",component:UserprofileComponent,children:[
    {path:"view",component:ViewComponent},
    {path:"usercart",component:UsercartComponent}
   ]},
   {path:'footer',component:FooterComponent},
   {path:'admin/:username',loadChildren:() => import('./admin/admin.module').then(m=>m.AdminModule)},
 
  {path:'browse',component:BrowseComponent},
    {path:'podcast',component:PodcastComponent},
    {path:'contactus',component:ContactusComponent},
   {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'**',component:PagenotfoundComponent},
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
