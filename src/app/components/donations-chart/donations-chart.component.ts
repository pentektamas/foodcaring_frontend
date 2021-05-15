import {Component, OnInit} from '@angular/core';
import {DisadvantagedPersonService} from '../../services/disadvantaged-person.service';
import {ChartEntry} from '../../models/chart-entry';

@Component({
  selector: 'app-donations-chart',
  templateUrl: './donations-chart.component.html',
  styleUrls: ['./donations-chart.component.scss']
})
export class DonationsChartComponent implements OnInit {

  language: string;
  public chartData: any [];
  public primaryXAxis: any;
  public chartEntries: ChartEntry[] = [];
  public title: any;
  public legendSettings: any;
  public lineMarker: any;
  public columnMarker: any;
  public tooltip: any;
  render = false;

  disadvantagedPersons = [];

  constructor(private disadvantagedPersonService: DisadvantagedPersonService) {
    this.disadvantagedPersonService.getAll().subscribe(
      (data) => {
        this.disadvantagedPersons = data;
        for (const disadvantagedPerson of this.disadvantagedPersons) {
          const chartEntry = new ChartEntry();
          chartEntry.disadvantagedPerson = disadvantagedPerson.firstName + ' ' + disadvantagedPerson.lastName;
          chartEntry.nrOfHelps = disadvantagedPerson.nrOfHelps;
          this.chartEntries.push(chartEntry);
        }
        this.chartData = this.chartEntries;
      }
    );
  }

  ngOnInit(): void {
    this.primaryXAxis = {valueType: 'Category'};
    this.legendSettings = {visible: true};
    this.columnMarker = {/*dataLabel: {visible: true, position: 'Middle'}*/};
    this.lineMarker = {dataLabel: {visible: true}};
    this.tooltip = {enable: true};
    this.render = true;
  }

}
