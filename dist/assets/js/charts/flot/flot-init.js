// ﻿var gridbordercolor = "#eee";
//
// var InitiateFlotBarChart = function () {
//     return {
//         init: function () {
//             var data2 = [{
//                 color: themesecondary,
//                 label: "Direct Visits",
//                 data: [[3, 2], [4, 5], [5, 4], [6, 11], [7, 12], [8, 11], [9, 8], [10, 14], [11, 12], [12, 16], [13, 9],
//                           [14, 10], [15, 14], [16, 15], [17, 9]],
//
//                 lines: {
//                     show: true,
//                     fill: true,
//                     lineWidth: .1,
//                     fillColor: {
//                         colors: [{
//                             opacity: 0
//                         }, {
//                             opacity: 0.4
//                         }]
//                     }
//                 },
//                 points: {
//                     show: false
//                 },
//                 shadowSize: 0
//             },
//                 {
//                     color: themeprimary,
//                     label: "Referral Visits",
//                     data: [[3, 10], [4, 13], [5, 12], [6, 16], [7, 19], [8, 19], [9, 24], [10, 19], [11, 18], [12, 21], [13, 17],
//                     [14, 14], [15, 12], [16, 14], [17, 15]],
//
//                     bars: {
//                         order: 1,
//                         show: true,
//                         borderWidth: 0,
//                         barWidth: 0.4,
//                         lineWidth: .5,
//                         fillColor: {
//                             colors: [{
//                                 opacity: 0.4
//                             }, {
//                                 opacity: 1
//                             }]
//                         }
//                     }
//                 },
//                 {
//                     color: themethirdcolor,
//                     label: "Search Engines",
//                     data: [[3, 14], [4, 11], [5, 10], [6, 9], [7, 5], [8, 8], [9, 5], [10, 6], [11, 4], [12, 7], [13, 4],
//                     [14, 3], [15, 4], [16, 6], [17, 4]],
//                     lines: {
//                         show: true,
//                         fill: false,
//                         fillColor: {
//                             colors: [{
//                                 opacity: 0.3
//                             }, {
//                                 opacity: 0
//                             }]
//                         }
//                     },
//                     points: {
//                         show: true
//                     }
//                 }
//             ];
//             var options = {
//                 legend: {
//                     show: false
//                 },
//                 xaxis: {
//                     tickDecimals: 0,
//                     color: '#f3f3f3'
//                 },
//                 yaxis: {
//                     min: 0,
//                     color: '#f3f3f3',
//                     tickFormatter: function (val, axis) {
//                         return "";
//                     },
//                 },
//                 grid: {
//                     hoverable: true,
//                     clickable: false,
//                     borderWidth: 0,
//                     aboveData: false,
//                     color: '#fbfbfb'
//
//                 },
//                 tooltip: true,
//                 tooltipOpts: {
//                     defaultTheme: false,
//                     content: " <b>%x May</b> , <b>%s</b> : <span>%y</span>",
//                 }
//             };
//             var placeholder = $("#bar-chart");
//             var plot = $.plot(placeholder, data2, options);
//         }
//     };
//
// }();
