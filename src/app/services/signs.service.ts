import { Injectable } from '@angular/core';
import { Signs } from '../model/signs';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignsService extends GenericService<Signs>{

  private signsChange: Subject<Signs[]> = new Subject<Signs[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected override http: HttpClient){
    super(http, `${environment.HOST}/signs`)
  }

    /////GET AND SET subject variable
    setSignsChange(data: Signs[]){
      this.signsChange.next(data);
    }
  
    getSignsChange(){
      return this.signsChange.asObservable();
    }
  
    setMessageChange(data: string){
      this.messageChange.next(data);
    }
  
    getMessageChange(){
      return this.messageChange.asObservable();
    }
}
