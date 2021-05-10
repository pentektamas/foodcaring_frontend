import { Component, OnInit } from '@angular/core';
import {ChartEntry} from '../../models/chart-entry';
import {DisadvantagedPersonService} from '../../services/disadvantaged-person.service';

@Component({
  selector: 'app-donations-chart',
  templateUrl: './donations-chart.component.html',
  styleUrls: ['./donations-chart.component.scss']
})
export class DonationsChartComponent implements OnInit {

  language: string;
  public chartData: any [];
  public primaryXAxis: any;
  public dates: any [] = [];
  public chartEntries: ChartEntry[] = [];
  public title: any;
  public legendSettings: any;
  public lineMarker: any;
  public columnMarker: any;
  public tooltip: any;
  appointments = new Map();
  render = false;

  disadvantagedPersons = [];

  constructor(private disadvantagedPersonService: DisadvantagedPersonService) {
    this.disadvantagedPersonService.getAll().subscribe(
      (data) => {
        this.disadvantagedPersons = data;
        this.render = true;
      }
    );
  }

  ngOnInit(): void {
    for (const disadvantagedPerson of this.disadvantagedPersons){
      const chartEntry = new ChartEntry();
      chartEntry.disadvantagedPerson = disadvantagedPerson;
      chartEntry.timesHelped = 1;
      this.chartData.push(chartEntry);
    }
    this.primaryXAxis = { valueType: 'Category' };
    this.legendSettings = {visible : true};
    this.columnMarker = { dataLabel : { visible : true, position: 'Top'}};
    this.lineMarker = { dataLabel : { visible : true }};
    this.tooltip = {enable : true};
  }

}
