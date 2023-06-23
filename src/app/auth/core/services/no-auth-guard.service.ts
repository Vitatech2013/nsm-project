import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuardService {

  constructor(
    private jwtService: JwtService,
    private router: Router
    ) { }

  canActivate() {
    if (window.localStorage.getItem('token')) {
      this.router.navigate(['/admin']);
      return true;
    
    } else {
      return true;
    }
  }
}
