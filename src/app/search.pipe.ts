import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  
  transform(songsList: any[],searchTerm:string):any[]{
    if (!songsList ||!searchTerm){
      return songsList;
    }
    else{
      return songsList.filter(songsObj=>songsObj.name.indexOf(searchTerm)!==-1)
    }
  }







}
