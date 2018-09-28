// JavaScript Document
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
	var dataLength = 30;
	
	var updateChart = function(count) {
		count = count || 1;
		
		for(var j = 0; j < count; j++) {
			//change
			yVal = yVal + Math.random()*(-0.5) + Math.random();
			data.push({
				x: xVal, //change
				y: yVal  //change
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