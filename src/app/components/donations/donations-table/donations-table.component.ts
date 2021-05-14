import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import {Donation} from '../../../models/donation.model';
import {DonationService} from '../../../services/donation.service';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';
import {Menu} from '../../../models/menu.model';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';

@Component({
  selector: 'app-donations-table',
  templateUrl: './donations-table.component.html',
  styleUrls: ['./donations-table.component.scss']
})
export class DonationsTableComponent implements OnInit {

  public donations = [] as Donation[];
  public noDonations = '';

  public dataSource: MatTableDataSource<Donation>;
  public columnsToDisplay = ['restaurant', 'menu', 'donor', 'date', 'options'];

  public today: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, public donationService: DonationService) {
  }

  ngOnInit(): void {
    this.today = (new Date()).toISOString().split('T')[0];
    this.getAll();
  }

  public getAll(): void {
    this.donationService.getAllDisadvantaged(localStorage.getItem('username')).subscribe(
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
