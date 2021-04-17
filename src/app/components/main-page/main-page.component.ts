import {Component, Input, OnInit} from '@angular/core';
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public role: String;

  @Input() tabs: MatTabGroup;
  constructor() {
    this.role = localStorage.getItem('role');
  }

  ngOnInit(): void {
  }

  goToStatisticsPage(): void{
    this.tabs.selectedIndex = Number(4);
  }

  goToDonationPage(): void{
    this.tabs.selectedIndex = Number(1);
  }

  goToMenusPage(): void{
    this.tabs.selectedIndex = Number(1);
  }

  goToOrderPage(): void{
    this.tabs.selectedIndex = Number(3);
  }
}
