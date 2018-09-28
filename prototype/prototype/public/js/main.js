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

	var data1 = [];
	var data2 = [];
	var data3 = [];
	var data4 = [];
	var data5 = [];
	var data6 = [];

	var lineColor = "#6fc151";
	var lineMain = "#000000";

	var chart = new CanvasJS.Chart("dynamicChartContainer", {
		backgroundColor: "#ffffff",
		animationEnabled: true,
		animationDuration: 700,
		theme: "light1",
		title: {
			text: "Dynamic Updown Status",
			fontSize: 30,
			fontWeight: "bold"
		},
		legend: {
			horizontalAlign: "center", // left, center ,right 
			verticalAlign: "top", // top, center, bottom
		},
		axisX: {
			title: "Snap Time",
			includeZero: false,
			gridColor: "lightblue",
			gridThickness: 1,
			gridDashType: "solid",
			tickColor: "lightblue",
			tickLength: 5,
			tickThickness: 1,
			//        	interlacedColor: "#ffe6ff",
			crosshair: { //không nhận trong bản canvasjs.js nhận trong canvasjs.min.js
				enabled: true,
				color: "orange",
				labelFontColor: "#F8F8F8",
				label: "",
				snapToDataPoint: true
			}
		},
		axisY: {
			title: "Response Time",
			includeZero: true,
			suffix: " s",
			minium: 0,
			gridColor: "lightblue",
			gridThickness: 1,
			gridDashType: "solid",
			tickColor: "lightblue",
			tickLength: 5,
			tickThickness: 1,
			//        	interlacedColor: "#ffffff",
			crosshair: { //không nhận trong bản canvasjs.js nhận trong canvasjs.min.js
				enabled: true,
				color: "orange",
				labelFontColor: "#F8F8F8",
				snapToDataPoint: true
			},
			scaleBreaks: {
				autoCalculate: true
			}
		},
		toolTip: {
			enabled: true,
			shared: true,
			animationEnabled: true,
			contentFormatter: function (e) {
				var str = "";
				var tmpx = "";
				for (var i = 0; i < e.entries.length; i++) {
					tmpx = "<strong>" + e.entries[i].dataPoint.label + "</strong>" + "<br>";
					var temp =
						e.entries[i].dataSeries.name +
						": <strong>" + e.entries[i].dataPoint.y*1000 +
						"ms </strong> <br/>";
					str = str.concat(temp);
				}
				return (tmpx + str);
			}
		},
		data: [{
			type: "spline",
			name: "Total Response Time",
			lineColor: lineMain,
			showInLegend: true,
			dataPoints: data1
			//indexLabel: "{y}",
			//indexLabelPlacement: "outside",  
			//indexLabelOrientation: "horizontal",
		}, {
			type: "spline",
			name: "Name LookUp Time",
			lineColor: lineColor,
			showInLegend: true,
			dataPoints: data2
		}, {
			type: "spline",
			name: "Connect Time",
			lineColor: lineColor,
			showInLegend: true,
			dataPoints: data3
		}, {
			type: "spline",
			name: "PreTransfer Time",
			lineColor: lineColor,
			showInLegend: true,
			dataPoints: data4
		}, {
			type: "spline",
			name: "StartTransfer Time",
			lineColor: lineColor,
			showInLegend: true,
			dataPoints: data5
		}, {
			type: "spline",
			name: "Redirect Time",
			lineColor: lineColor,
			showInLegend: true,
			dataPoints: data6
		}]
	});

	var xVal = 0;

	var ydata1 = 0;
	var ydata2 = 0;
	var ydata3 = 0;
	var ydata4 = 0;
	var ydata5 = 0;
	var ydata6 = 0;

	var label = 0;
	var updateInterval = 100;
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
					ydata1 = res.time_res;
					ydata2 = res.time_nu;
					ydata3 = res.time_con;
					ydata4 = res.time_pt;
					ydata5 = res.time_st;
					ydata6 = res.time_re;
					console.log(response);
				}
			});

			data1.push({
				x: xVal,
				y: ydata1,
				label: label || "Fetching",
				lineColor: lineMain
			});
			data2.push({
				x: xVal,
				y: ydata2,
				label: label || "Fetching",
				lineColor: lineColor
			});
			data3.push({
				x: xVal,
				y: ydata3,
				label: label || "Fetching",
				lineColor: lineColor
			});
			data4.push({
				x: xVal,
				y: ydata4,
				label: label || "Fetching",
				lineColor: lineColor
			});
			data5.push({
				x: xVal,
				y: ydata5,
				label: label || "Fetching",
				lineColor: lineColor
			});
			data6.push({
				x: xVal,
				y: ydata6,
				label: label || "Fetching",
				lineColor: lineColor
			});

			for (var i = 0; i < data1.length; i++) {
				if (data1[i].y === 0 && i > 0) {
					data1[i - 1].lineColor = "#cc0000";
					data2[i - 1].lineColor = "#cc0000";
					data3[i - 1].lineColor = "#cc0000";
					data4[i - 1].lineColor = "#cc0000";
					data5[i - 1].lineColor = "#cc0000";
					data6[i - 1].lineColor = "#cc0000";
				}
			}

			xVal++;
		}
		if (xVal > dataLength) {
			data1.shift();
			data2.shift();
			data3.shift();
			data4.shift();
			data5.shift();
			data6.shift();
		}
		chart.render();
	};
	updateChart(dataLength);
	refreshIntervalId = setInterval(function () {
		updateChart();
	}, updateInterval);
}
