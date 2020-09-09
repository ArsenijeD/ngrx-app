import { Component, OnInit, ViewChild } from '@angular/core';
import {ApexNonAxisChartSeries, ApexResponsive, ApexChart, ChartComponent} from 'ng-apexcharts';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from './../store/reducer/app.reducer';
import * as EntitiesSelectors from './../store/modules/entities/selectors/entities.selectors';

export interface ChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: any;
}

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit {

  @ViewChild('chart', {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  activeDevelopersNames: string[] = [];
  commitsPerActiveDevelopers: number[] = [];
  showPieChart = false;

  constructor(private store: Store<fromApp.AppState>) {
    this.chartOptions = {
      chart: {
        type: 'donut',
        width: 500,
        offsetY: 50
      },
      legend: {
        position: 'bottom'
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 500
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.store.select(EntitiesSelectors.getCommitsPerActiveDevelopers)
    .subscribe({next: (response: {}) => {
      // Its needed to call map on Object.values because ReactApexChart doesnt work with Array(), only with []
      this.chartOptions.series = Object.values(response);
      this.chartOptions.labels = Object.keys(response);
      this.showPieChart = Object.keys(response).length !== 0;
    }});

  }

}
