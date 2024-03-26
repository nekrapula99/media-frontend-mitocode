import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { PatientComponent } from '../patient/patient.component';
import { MedicComponent } from '../medic/medic.component';
import { MenuService } from '../../services/menu.service';
import { LoginService } from '../../services/login.service';
import { Menu } from '../../model/menu';
import { ProfileService } from '../../services/profile.service';


@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [MaterialModule, RouterLink, RouterOutlet, RouterLinkActive, NgIf, MedicComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{

  menus: Menu[];

  constructor(
    private menuService: MenuService,
    private loginService: LoginService,
    private profileService: ProfileService
  ){}

  ngOnInit(): void {
      this.menuService.getMenuChange().subscribe(data => this.menus = data);
  }

  logout(){
    this.loginService.logout();
  }

  myProfile(){
    this.profileService.myProfile();
  }
}