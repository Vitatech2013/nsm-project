import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { JwtService } from './core/services/jwt.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  providers: [AuthService],
})
export class AuthComponent implements OnInit {
  hide = true;
  form: any;
  data: any;
  showAlert:boolean=false;
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder;
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.form.status === 'INVALID') {
      return;
    }

    this.authService.login(this.form.value).subscribe(
      (data) => {
        this.data = data;
        console.log(this.data);
        
        this.jwtService.setToken(this.data.token);
        window.localStorage.setItem('id', this.data.UserDetails.id);
        // window.localStorage.setItem('image', this.data.user.user.image);
        window.localStorage.setItem('lastLogin', this.data.lastLogin);
        this.router.navigate(['/admin']);
      },
      (err) => this.errorHandler(err, 'Invalid Credentials!')
    );
  }

  private errorHandler(error: any, message: string) {
    // this.snackbar.open(message, 'Error', {
    //   duration: 2000,
    // });
    this.showAlert=true
  }
}
