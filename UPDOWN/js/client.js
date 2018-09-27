// JavaScript Document
function showChart() {
	var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		animationDuration: 3000,
		backgroundColor: "#e3effc",
		theme: "light2",
		title: {
			text: "Website UpDown Infomation in one hour"
		},
		axisX: {
			title: "Snap Time",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "Response Time",
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		toolTip: {
			enabled: false
		},
		data: [{
			type: "spline",
			dataPoints: [
                  { x: 5, y: 0.4 },
                  { x: 10, y: 0.9 },
                  { x: 15, y: 1.3},
                  { x: 20, y: 2.4 },
                  { x: 25, y: 0.85 },
                  { x: 30, y: 1.15 },
                  { x: 35, y: 0.3 },
                  { x: 40, y: 1.3 },
                  { x: 45, y: 1 },
                  { x: 50, y: 0.5 },
                  { x: 55, y: 0.2 },
                  { x: 60, y: 0.9 }
                  ]
		}]						   
	});
	chart.render();
}

function showDynamicChart() {
	var data = [];
	var chart = new CanvasJS.Chart("dynamicChartContainer", {
		backgroundColor: "#000000",
		animationEnabled: true,
		animationDuration: 700,
		theme: "dark1",
		title: {
			text: "Dynamic Updown Status"
		},
		axisX: {
			title: "Snap Time",
			includeZero: false,
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "Response Time",
			includeZero: true,
			crosshair: {
				enabled: true,
				snapToDataPoint: true
			}
		},
		toolTip: {
			enabled: true
		},
		data: [{
			type: "spline",
			lineColor: "#6fc151",
			dataPoints: data
		}]						   
	});
	
	var xVal = 0;
	var yVal = 0.5;
	var updateInterval = 1000;
	var dataLength = 100;
	
	var updateChart = function(count) {
		count = count || 1;
		
		for(var j = 0; j < count; j++) {
			yVal = yVal + Math.random()*(-0.5) + Math.random();
			data.push({
				x: xVal,
				y: yVal
			});
			xVal++;
			yVal = 0.5;
			}
			if(xVal > dataLength) {
				data.shift();
		}
			chart.render();
	};
	updateChart(dataLength);
	setInterval(function(){updateChart();}, updateInterval);
}

function show() {
	showChart();
	showDynamicChart();
}