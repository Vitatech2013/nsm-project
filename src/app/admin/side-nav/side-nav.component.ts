import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  url = environment.root;
  lastLogin: any;
  image: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.lastLogin = window.localStorage.getItem('lastLogin');
    this.image = window.localStorage.getItem('image');
  }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }


}
