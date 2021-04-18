import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {ErrorModalComponent} from "../../modals/error-modal/error-modal.component";
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(public userServive:UserService,public router:Router, public dialog: MatDialog) {
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {
    localStorage.setItem('tab', String(0));
  }

  public loginUser(loginFormValue:any) {
    this.userServive.login({"username":loginFormValue.username,"password":loginFormValue.password}).subscribe(res => {
      this.router.navigate(['mainPage']);
      localStorage.setItem('username', res['name']);
      localStorage.setItem('role', res['authorities'][0]['authority'].split(/_(.+)/)[1]);
        localStorage.setItem('tab', String(0));
    },
      (error: any) => {
        this.router.navigate(['login']);
        Swal.fire({
          title: 'Alert message',
          text: 'Incorrect credentials. Please try again.',
          icon: 'error',
          showCancelButton: true,
          width: '500px',
        });
      });

  }

}
