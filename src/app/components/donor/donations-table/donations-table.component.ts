import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateDonationComponent} from '../create-donation/create-donation.component';

@Component({
  selector: 'app-donations-table',
  templateUrl: './donations-table.component.html',
  styleUrls: ['./donations-table.component.scss']
})
export class DonationsTableComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  public add(): void {
    this.dialog.open(CreateDonationComponent).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

}
