import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private router: Router
    ) { }

  myProfile(){
    this.router.navigate(['/pages/profile']);
  }

}
