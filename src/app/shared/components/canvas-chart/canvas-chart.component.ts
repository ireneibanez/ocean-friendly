import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets/canvasjs.min.js';

@Component({
  selector: 'app-canvas-chart',
  templateUrl: './canvas-chart.component.html',
  styleUrls: ['./canvas-chart.component.scss']
})
export class CanvasChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {

CanvasJS.addColorSet('customColorSetBlue',
  [
  // '#1B4F72',
  // '#21618C',
  // '#2874A6',
  // '#2E86C1',
  '#3498DB',
  // '#5DADE2',
  // '#85C1E9',
  // '#AED6F1',
  // '#D6EAF8',
 ]);

 CanvasJS.addColorSet('customColorSetGreen',
  [
  // '#117864',
  // '#148F77',
  '#17A589',
  // '#1ABC9C',
  // '#48C9B0',
  // '#76D7C4',
  // '#A3E4D7',
  // '#D1F2EB',
 ]);

 CanvasJS.addColorSet('customColorSetRed',
 [
// '#641E16',
//  '#7B241C',
//  '#922B21',
//  '#A93226',
 '#C0392B',
//  '#CD6155',
//  '#D98880',
//  '#E6B0AA',
//  '#F2D7D5',
]);


    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Evolución de la abundancia de ballenas"
      },
      theme: "light2",
      colorSet:  "customColorSetBlue",
      data: [{
        type: "line",
        dataPoints: [
          { y: 71, label: "2010" },
          { y: 55, label: "2011" },
          { y: 50, label: "2012" },
          { y: 65, label: "2013" },
          { y: 95, label: "2014" },
          { y: 68, label: "2015" },
          { y: 28, label: "2016" },
          { y: 34, label: "2017" },
          { y: 14, label: "2018" }
        ]
      }]
    });

    let chart2 = new CanvasJS.Chart("chartContainer2", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Evolución de la abundancia de tortugas"
      },
      theme: "light2",
      colorSet:  "customColorSetGreen",
      data: [{
        type: "line",
        dataPoints: [
          { y: 100, label: "2010" },
          { y: 75, label: "2011" },
          { y: 50, label: "2012" },
          { y: 45, label: "2013" },
          { y: 20, label: "2014" },
          { y: 20, label: "2015" },
          { y: 10, label: "2016" },
          { y: 5, label: "2017" },
          { y: 2, label: "2018" }
        ]
      }]
    });

    let chart3 = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Evolución de la abundancia de atunes"
      },
      theme: "light2",
      colorSet:  "customColorSetRed",
      data: [{
        type: "line",
        dataPoints: [
          { y: 20, label: "2010" },
          { y: 5, label: "2011" },
          { y: 10, label: "2012" },
          { y: 65, label: "2013" },
          { y: 42, label: "2014" },
          { y: 60, label: "2015" },
          { y: 55, label: "2016" },
          { y: 60, label: "2017" },
          { y: 95, label: "2018" }
        ]
      }]
    });

    chart.render();
    chart2.render();
    chart3.render();
  }

}





