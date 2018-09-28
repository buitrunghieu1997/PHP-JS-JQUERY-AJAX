var refreshIntervalId;

function stop() {
	clearInterval(refreshIntervalId);
	document.getElementById("button-submit").disabled = false;
	document.getElementById("url").disabled = false;
}

function showDynamicChart() {
	document.getElementById("button-submit").disabled = true;
	document.getElementById("url").disabled = true;
	var url = document.getElementById("url").value;
	var vars = "url=" + url;
	var data = [];
	var lineColor = "#6fc151";
	var chart = new CanvasJS.Chart("dynamicChartContainer", {
		backgroundColor: "#ffffff",
		animationEnabled: true,
		animationDuration: 700,
		theme: "light1",
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
			lineColor: lineColor,
			dataPoints: data
		}]
	});

	var xVal = 0;
	var yVal = 0;
	var label = 0;
	var updateInterval = 1000;
	var dataLength = 30;

	var updateChart = function (count) {
		count = count || 1;
		for (var j = 0; j < count; j++) {
			$.ajax({
				type: "POST",
				url: "../controller/main.php",
				data: vars,
				cache: false,
				success: function (response) {
					var res = JSON.parse(response);
					label = res.time_req;
					yVal = res.time_res;
					console.log("(x, yVal) = (" + label + ", " + yVal + ")");
					console.log(response);
				}
			});
			
			data.push({
				x: xVal, //change
				y: yVal, //change
				label: label || "Fetching",
				lineColor: lineColor
			});
			
			for(var i = 0; i < data.length; i++) {
				if(data[i].y === 0 && i > 0) {
					data[i - 1].lineColor = "#cc0000";
				}
			}
			
			xVal++;
		}
		if (xVal > dataLength) {
			data.shift();
		}
		chart.render();
	};
	updateChart(dataLength);
	refreshIntervalId = setInterval(function () {
		updateChart();
	}, updateInterval);
}
