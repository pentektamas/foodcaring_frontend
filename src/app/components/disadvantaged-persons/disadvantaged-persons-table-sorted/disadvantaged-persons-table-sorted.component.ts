import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';
import {MatPaginator} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';

@Component({
  selector: 'app-disadvantaged-persons-table-sorted',
  templateUrl: './disadvantaged-persons-table-sorted.component.html',
  styleUrls: ['./disadvantaged-persons-table-sorted.component.scss']
})
export class DisadvantagedPersonsTableSortedComponent implements OnInit {

  public noDisadvantagedPersons = '';
  disadvantagedPersons: Set<DisadvantagedPerson>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<DisadvantagedPerson>;

  constructor(private changeDetectorRef: ChangeDetectorRef, private disadvantagedPersonService: DisadvantagedPersonService) {
  }

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();

    this.disadvantagedPersonService.getAllSorted().subscribe(
      (data) => {
        this.disadvantagedPersons = new Set(data);
        this.dataSource = new MatTableDataSource<DisadvantagedPerson>(data);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        this.noDisadvantagedPersons = '';
      },
      () => this.noDisadvantagedPersons = 'It seems like this restaurant has no menus... Add some!'
    );
  }

  refresh(): void {
    this.ngOnInit();
  }
}
