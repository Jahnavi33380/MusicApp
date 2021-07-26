import { Injectable } from '@angular/core';
import{Observable} from 'rxjs';
import { Songs } from './models/songs.model';
import { BrowseComponent } from './browse/browse.component';
import{HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  

  constructor(private hc:HttpClient) { }


  userLoginStatus():boolean{
    if(localStorage.getItem("username")==null)
    {
      return false;
    }
    else
    {
      return true;
    }
  }  

  userLogout()
  {
    localStorage.clear();
  }
  
  

  /*
  createNewSongs(songsObj):Observable<any>
  {
    
      return this.hc.post("http://localhost:3000/Songs",songsObj)    
    }
  }    
  */
}
