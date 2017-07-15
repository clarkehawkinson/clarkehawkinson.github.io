var selectLink = "";
var jsonData = null;
//Gets the links ready
$(document).ready(function () {
	$("title").html("ACME Home");
	$.ajax({
		url: "js/acme.json",
		dataType: "json",
		success: function (data) {
			console.log(data);
			$("#li1").html("<a href='#'>" + data.nav.links1 + "</a>");
			$("#li2").html("<a href='#'>" + data.nav.links2 + "</a>");
			$("#li3").html("<a href='#'>" + data.nav.links3 + "</a>");
			$("#li4").html("<a href='#'>" + data.nav.links4 + "</a>");
			$("#li5").html("<a href='#'>" + data.nav.links5 + "</a>");
		}
		//want to use onclick events when you select the links
	});

});
$("nav").on("click", "a", function () {
	var link = $(this).text();
	console.log("the link is:" + link);
	if (link!="Home") {
		$("#rocket").hide();
		$("#lower-half").hide();
		$("#displaySection").show();
		
		$.ajax({
			url: "js/acme.json",
			dataType: "json",
			success: function (data) {
				console.log(data);
				var picPath = (data[link].path);
				var made = (data[link].manufacturer);
				var summary = (data[link].description);
				var review = (data[link].reviews);
				var price = (data[link].price);
				var title = (data[link].name);
                $("#productName").html(" "+ title);
				$("#productImage").html("<img src=' "+picPath+"' alt='"+link+" 'id='image'>");
//                                     ("<img src=' "+picPath+"' alt='"+link+" 'id='"+image+"'>")
				$("title").html(link+ " | Acme Inc.");
                $("#made").html("<strong>Made By:</strong> " + made);
				$("#summary").html(summary);
				$("#review").html("<strong>Reviews:</strong> " + review);
				$("#price").html("<strong>Price: " + price+"</strong>");
			}
		});
	}
    else {
		$("#rocket").show();
		$("#lower-half").show();
		$("#displaySection").hide();
	}
});