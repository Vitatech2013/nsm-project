import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  url = environment.root;

  lastLogin: any;
  image: any;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
    ) {}

    ngOnInit(){
      this.lastLogin = window.localStorage.getItem('lastLogin');
      this.image = window.localStorage.getItem('image');
      console.log(this.image);
    }

  logout(){
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
