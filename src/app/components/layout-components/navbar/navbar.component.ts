import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {Role} from '../../../models/enums/role.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public role: string;

  constructor(public userService: UserService, public router: Router) {
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.userService.logout().subscribe(
      () => {
        this.router.navigateByUrl('/login').then();
      },
      () => console.log('logout not ok')
    );
  }

}
