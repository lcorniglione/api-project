var express = require("express");
var url = require("url");
var app = express();



app.get("/:month%20:day,%20:year", function(request, response) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var day = request.params.day;
    var month = request.params.month;
    var year = request.params.year;
    var date = (month + " " + day + " " + year).toString();
    var dateObj = new Date(date);
    var unixtime = Date.parse(date) / 1000;
    var obj = new Object();
    obj.unix = unixtime;
    obj.natural = (monthNames[dateObj.getMonth()] + " " + day + "," + " " + year).toString();
    response.send(JSON.stringify(obj));
});

app.get("/:unix", function(request, response) {
    if (typeof parseInt(request.params.unix)==='number' && (request.params.unix%1)===0) {
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var dateObj = new Date(request.params.unix * 1000);
        var obj = new Object();
        obj.unix = request.params.unix;
        obj.natural = (monthNames[dateObj.getMonth()] + " " + dateObj.getDate() + "," + " " + dateObj.getFullYear()).toString();
        response.send(JSON.stringify(obj));
    }
    else {
        var obj = new Object();
        obj.unix = null;
        obj.natural = null;
        response.send(JSON.stringify(obj));
    }

});

app.get('*', function(request, response) {
    var obj = new Object();
    obj.unix = null;
    obj.natural = null;
    response.send(JSON.stringify(obj));
});



app.listen(process.env.PORT || 5000);
