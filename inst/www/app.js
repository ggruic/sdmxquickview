function clearResults(table_id) {
  $('#'+table_id).DataTable().destroy();
  $("#output").text('');
  $("#chart_c").text('');
}

function InitDataTable(datatable_id){
			$('#'+datatable_id).dataTable( {
				"aaSorting": [[ 0, "asc" ]],
				"sDom": "<'box-content'<'col-sm-6'f><'col-sm-6 text-right'l><'clearfix'>>rt<'box-content'<'col-sm-6'i><'col-sm-6 text-right'p><'clearfix'>>",
				"sPaginationType": "bootstrap",
				"oLanguage": {
					"sSearch": "",
					"sLengthMenu": '_MENU_'
				}
			});
}


function makeDropDown(array, position, prop, txt) {
        var $sel = $('<select class="form-control" id="'+position+'"/>');
        for (var i = 0; i < array.length; i++)
            $sel.append($('<option/>').val(array[i][prop]).text(array[i][txt]));
        return $sel;
}

// generate chart from chart_data
function generate_chart(chart_data) {
  	//key_values = Object.keys(chart_data[0])
  	key_values = ["obsTime", "obsValue"];
  	//console.log(key_values);
  	//key_values.splice(0, 12);
  	//console.log(key_values);



  	var chart = c3.generate({
  	bindto: '#chart_c',
  	data:
  	{
  	  json: chart_data,
  	  keys: {
  				x: 'obsTime',
  				//value: ['s1311', 's1312', 's1314', 's13', 's1313'],
  				value: key_values
  			},
  	  x: 'obsTime',
  	  xFormat: v_xFormat,
  	  type: 'line'
  			},
  	  legend: {
  			position: 'right'
  			},
  	axis:
  	{
  	  x: {
  			type: 'timeseries',
  			tick: {
  					format: eval(v_format)
  				  }
  		 }
  	},
  	grid: {y: {show: true}}
  	});
  return chart;
}

function drawTable(output, elementId){
  var dataWidth = Object.keys(output.message[0]).length;
  var dataLength = output.message.length;
          //console.log(dataWidth);
          //console.log(dataLength);
          var theTableG = document.createElement('table');
          theTableG.className = 'table table-bordered table-striped table-condensed';
          theTableG.setAttribute("id", "target_data");
          thead = document.createElement('thead');
          tbody = document.createElement('tbody');

          // header
          tr = document.createElement('tr');
          for (var j = 0; j < dataWidth; j++) {
			      th = document.createElement('th');
			      th.appendChild(document.createTextNode(Object.keys(output.message[0])[j]));
			      tr.appendChild(th);
          }
          thead.appendChild(tr);

          // body
          for (var i = 0; i < dataLength; i++) {
	          tr = document.createElement('tr');
		        for (var j = 0; j < dataWidth; j++) {
			        td = document.createElement('td');
				      td.innerHTML = output.message[i][Object.keys(output.message[i])[j]]
			        //td.appendChild(document.createTextNode(output.message[i][Object.keys(output.message[i])[j]]));
			        tr.appendChild(td);
		        }
	          tbody.appendChild(tr);
          }

          theTableG.appendChild(thead);
          theTableG.appendChild(tbody);
          document.getElementById(elementId).appendChild(theTableG);
}


function set_chart_parms(in_freq) {
	if (in_freq == 'M') {
		v_xFormat = '%Y-%m';
		v_format = "(function (x) {return (x.getFullYear().toString() +'-'+parseInt(x.getMonth()+1));})";
	}
	else if (in_freq == 'A') {
		v_xFormat = '%Y';
		v_format = "(function (x) {return (x.getFullYear().toString());})";
	}
	else if (in_freq == 'Q') {
		v_xFormat = '%Y-%m';
		v_format = "(function (x) {return (x.getFullYear().toString() +'-Q'+parseInt(x.getMonth()/3+1));})";
	}
	else {
		//Q
		v_xFormat = '%Y-%m';
		v_format = "(function (x) {return (x.getFullYear().toString() +'-Q'+parseInt(x.getMonth()/3+1));})";
	};
}


//format datum tick
function format_date_for_chart_end(in_date) {
	var tip_razdoblja = report_freq;
	// M, Q or Y
	if (tip_razdoblja == 'Q') {
		var splitted = in_date.split('-');
		var quarterEndMonth = splitted[1].charAt(1) * 3;
		var quarterStartMonth = quarterEndMonth - 3;
		return d3.time.format('%m %Y').parse(quarterEndMonth + ' ' + splitted[0]);
	}
	else if (tip_razdoblja == 'A') {
		return d3.time.format('%Y').parse(in_date);
	}
	else if (tip_razdoblja == 'M') {
		return d3.time.format('%Y-%m').parse(in_date);
	}
};
