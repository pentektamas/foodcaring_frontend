import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DisadvantagedPersonService} from '../../../services/disadvantaged-person.service';
import {SuccessModalComponent} from '../../modals/success-modal/success-modal.component';
import {ErrorModalComponent} from '../../modals/error-modal/error-modal.component';
import {DisadvantagedPerson} from '../../../models/disadvantaged-person.model';

@Component({
  selector: 'app-update-priority-disadvantaged-person',
  templateUrl: './update-priority-disadvantaged-person.component.html',
  styleUrls: ['./update-priority-disadvantaged-person.component.scss']
})
export class UpdatePriorityDisadvantagedPersonComponent implements OnInit {

  @Input() public disadvantagedPerson: DisadvantagedPerson;
  @Output() public refresh = new EventEmitter<any>();

  constructor(public dialog: MatDialog, public disadvantagedPersonService: DisadvantagedPersonService) {
  }

  ngOnInit(): void {
  }

  public updatePriority(disadvantagedPersonId: String, priority: number): void {
    this.disadvantagedPersonService.updatePriorityOfDisadvantagedPerson(disadvantagedPersonId, priority).subscribe(
      () => {
        this.dialog.closeAll();
        this.dialog.open(SuccessModalComponent, {data: `The priority was set!`});
        this.reload();
      }
      , () => {
        this.dialog.open(ErrorModalComponent, {data: `The priority could not be set!`});
      });
  }

  public reload(): void {
    this.refresh.next();
  }
}
