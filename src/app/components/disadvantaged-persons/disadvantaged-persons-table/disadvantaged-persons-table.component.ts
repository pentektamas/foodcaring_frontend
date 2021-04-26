import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-disadvantaged-people-table',
  templateUrl: './disadvantaged-persons-table.component.html',
  styleUrls: ['./disadvantaged-persons-table.component.scss']
})
export class DisadvantagedPeopleTableComponent implements OnInit {

  public noDisadvantagedPersons = '';
  disadvantagedPersons: Set<DisadvantagedPerson>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<DisadvantagedPerson>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private disadvantagedPersonService: DisadvantagedPersonService) {
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();

    this.disadvantagedPersonService.getAll().subscribe(
      (data) => {
        this.disadvantagedPersons = new Set(data);
        this.dataSource = new MatTableDataSource<DisadvantagedPerson>(data);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.noDisadvantagedPersons = '';
      },
      () => this.noDisadvantagedPersons = 'It seems like there are no disadvantaged persons...'
    );
  }

  refresh(): void {
    this.ngOnInit();
  }
}
