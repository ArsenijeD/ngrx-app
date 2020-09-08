import { Component, OnInit, ViewChild } from '@angular/core';
import {ApexNonAxisChartSeries, ApexResponsive, ApexChart, ChartComponent} from 'ng-apexcharts';

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

  constructor() {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: 'donut',
        width: 500,
        offsetY: 50
      },
      legend: {
        position: 'bottom'
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
  }

}
