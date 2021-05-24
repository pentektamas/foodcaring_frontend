import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {MatTabGroup} from '@angular/material/tabs';
import {SuccessModalComponent} from "../../modals/success-modal/success-modal.component";
import {ProfilePageComponent} from "../../profile-page/profile-page.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {

  public role: string;
  public tab: number;

  @ViewChild("tabs") tabs: MatTabGroup;

  constructor(public userService: UserService, public router: Router, public dialog: MatDialog) {
    this.role = localStorage.getItem('role');

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.tabs.selectedIndex = Number(localStorage.getItem('tab'));
  }

  public logout(): void {
    this.userService.logout().subscribe(
      () => {
        this.router.navigateByUrl('/login').then();
      },
      () => console.log('logout not ok')
    );
  }

  public openProfile(): void {
    this.dialog.open(ProfilePageComponent, {});
  }

  public setTab(index: any): void {
    localStorage.setItem('tab', String(index['index']));
  }
}

