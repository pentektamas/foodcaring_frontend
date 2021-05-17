import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {CreateDonationComponent} from '../create-donation/create-donation.component';
import {Donation} from "../../../models/donation.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {DonationService} from "../../../services/donation.service";
import {ErrorModalComponent} from "../../modals/error-modal/error-modal.component";
import {SuccessModalComponent} from "../../modals/success-modal/success-modal.component";

@Component({
  selector: 'app-donor-donations-table',
  templateUrl: './donor-donations-table.component.html',
  styleUrls: ['./donor-donations-table.component.scss']
})
export class DonorDonationsTableComponent implements OnInit {

  public donations = [] as Donation[];
  public noDonations = '';

  public dataSource: MatTableDataSource<Donation>;
  public columnsToDisplay = ['restaurant', 'menu', 'disadvantagedPersons', 'date'];

  public today: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public donationService: DonationService) {
  }

  ngOnInit(): void {
    this.today = (new Date()).toISOString().split('T')[0];
    this.getAll();
  }

  public add(): void {
    this.dialog.open(CreateDonationComponent).afterClosed().subscribe(
      () => this.ngOnInit()
    );
  }

  public getAll(): void {
    this.donationService.getAllDonor(localStorage.getItem('username')).subscribe(
      (donations) => {
        this.donations = donations;
        this.dataSource = new MatTableDataSource<Donation>(this.donations);
        this.dataSource.paginator = this.paginator;
        this.noDonations = '';
      },
      () => this.dialog.open(ErrorModalComponent, {data: "Could not retrieve donations!"})
    );
  }

  public delete($event: MouseEvent, element: Donation): void {
    this.donationService.cancel(element.id, localStorage.getItem('username')).subscribe(
      () => {
        this.dialog.open(SuccessModalComponent, {data: 'The donation has been cancelled!'}).afterClosed().subscribe(() => this.ngOnInit());
      },
      () => this.dialog.open(ErrorModalComponent, {data: 'The donation could not be cancelled'})
    );
  }

}
