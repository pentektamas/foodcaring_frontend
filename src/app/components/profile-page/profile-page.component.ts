import { Component, OnInit } from '@angular/core';
import {PersonService} from "../../services/person.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  public currentUser: User;
  constructor(public personService: PersonService) { }

  ngOnInit(): void {
      this.personService.getInformation(localStorage.getItem('role'), localStorage.getItem('username')).subscribe(
        (data) => {
          this.currentUser = data;
          this.currentUser.role = this.currentUser.role.charAt(0) + this.currentUser.role.substring(1).toLowerCase().replace('_', ' ');
        }
      );
  }

}
