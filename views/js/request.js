console.log("hello world from home.js");

$("button").click(function(){
	var searchTerm = $('#searchBox').val();
	var loc = $('#locBox').val();
	var allergy = $('#allergyBox').val();
	console.log(searchTerm);
	console.log(loc);
	$.ajax({
		type: "POST",
		url: "../search/",
		dataType: 'json',
		data: JSON.stringify({ "searchTerm": searchTerm, "loc": loc })
	}).done(function(data){
		//alert("received data!");
		//var array = data.split(',');
		console.log(data[0]);
		var results = JSON.stringify(data);
		//console.log(results);
		var results = results.split(',');
		var html = "";
		for(result in data)
		{
			var display = data[result][0];
			var link = data[result][1].substring(5)
			if(display.length > 70)
			{
				display = display.substring(0, 71) + "..."
			}
			if (link.length > 50)
			{
				link = link.substring(0, 51) + "..."
			}
			html += "<a href='/request/?url=" + data[result][1] + "&allergy=" + allergy + "&searchTerm=" + escape(searchTerm) + "&loc=" + escape(loc) + "'>"
	       		html += "<div><li>" + display + "</li>"
			html += "<span style='color:#919191;'>" + link + "</span>"
			html += "</div></a>"
		}
		console.log(html);
		$('#printable').html(html);

		
		//console.log("" + JSON.stringify(data['data']));
	});
});


