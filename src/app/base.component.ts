import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
  selector: 'app-base',
  template:'',
})
export class BaseComponent implements OnInit {

  private isAuth = false;
  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.authService.check().subscribe((auth) => {
      this.isAuth = auth;
    });
    if (this.isAuth) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/sign-in']);
    }
  }

}
