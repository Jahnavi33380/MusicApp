import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowseComponent } from './browse/browse.component';

import{FormsModule} from '@angular/forms';
import { SquarePipe } from './square.pipe';
import { SearchPipe } from './search.pipe';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { AuthorisationService } from './authorisation.service';

import { SharedModule } from './shared/shared.module';
import { UsercartComponent } from './usercart/usercart.component';
import { PodcastComponent } from './podcast/podcast.component';
import { ContactusComponent } from './contactus/contactus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    PagenotfoundComponent,
    FooterComponent,
    BrowseComponent,
    SquarePipe,
    SearchPipe,
    UserprofileComponent,
  
    UsercartComponent,
       PodcastComponent,
       ContactusComponent,
    
   
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthorisationService,
    multi:true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
