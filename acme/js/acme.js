$(document).ready(function () {
    getData();
});

function getData() {
    // 
    $.ajax({    
        url: "../js/acme.json",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $("#li1").html(data.navigation.link1);
            $("#li2").html(data.navigation.link2);
            $("#li3").html(data.navigation.link3);
            $("#li4").html(data.navigation.link4);
            $("#li5").html(data.navigation.link5);
        }
    });
}
