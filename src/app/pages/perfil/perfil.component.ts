import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {

  username: string;
  role: string;

  constructor() { }

  ngOnInit(){
    const token = sessionStorage.getItem(environment.TOKEN_NAME);    
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.username = decodedToken.sub;
    this.role = decodedToken.role;
  }

}
