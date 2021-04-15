import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(public userServive:UserService,public router:Router) { 
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  public loginUser(loginFormValue:any) {
    this.userServive.login({"username":loginFormValue.username,"password":loginFormValue.password}).subscribe(res => {
      this.router.navigate(['mainPage']);
    },
      (error: any) => {
      
      })
  
  }
  
}
