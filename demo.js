var d1 = document.getElementById('nope');
var d = new Date();
var types = {"Potatoes":{"img":"potato.png","soil":"Loam","ph":"4.8-5.5","light":"6 hours"},"Corn":{"img":"corn.png","soil":"Loam","ph":"4.8-5.5","light":"6 hours"},"Beans":{"img":"beans.png","soil":"Loam","ph":"4.8-5.5","light":"6 hours"},"Cabbage":{"img":"cabbage.png","soil":"Loam","ph":"4.8-5.5","light":"6 hours"}};

var myObj = {"num1":{ "type":"Potatoes","plot":"2","quantity":"50", "start":d.getTime(), "lastWater":d.getTime()-100200,"Nutrients": 4 },"num2":{ "type":"Beans","plot":"1","quantity":"100", "start":d.getTime(), "lastWater":d.getTime()-100200,"Nutrients": 6 },"num3":{ "type":"Cabbage","plot":"3","quantity":"75", "start":d.getTime(), "lastWater":d.getTime()-100200,"Nutrients": 6 },"num4":{ "type":"Corn","plot":"4","quantity":"100", "start":d.getTime(), "lastWater":d.getTime()-100200,"Nutrients": 6 }};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
} 
function update(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function $_GET(q,s) {
    s = (s) ? s : window.location.search;
    var re = new RegExp('&amp;'+q+'=([^&amp;]*)','i');
    return (s=s.replace(/^\?/,'&amp;').match(re)) ?s=s[1] :s='';
}
//setCookie("main",JSON.stringify(myObj),"2000000000");
try {
    myObj = JSON.parse(getCookie("main"));

}
catch(err) {
    setCookie("main",JSON.stringify(myObj),"2000000000");
	myObj = JSON.parse(getCookie("main"));
}

for(x in myObj){
	var next = (12 -((d.getTime()-myObj[x]['lastWater'])/(1000*60*60)));
	var minutes = next - Math.floor(12 -((d.getTime()-myObj[x]['lastWater'])/(1000*60*60)));
	minutes = Math.floor(minutes*60);
	var str = '<a href="plants.html?plant='+x+'&"><div class="crops"><div class="plant"><img src="img/x.png"><center><img src="img/'+types[myObj[x]['type']]['img']+'"> </center><h2 style="text-align:center">'+myObj[x]['type']+'</h2><div class ="info"> <p>Plot: '+myObj[x]['plot']+'<br>Quantity: '+myObj[x]['quantity']+'<br>Water in: '+Math.floor(next)+' hours and '+minutes+' minutes</p></div></div><div></div></div></a>';

	d1.insertAdjacentHTML("afterbegin",str);
}
d1 = document.getElementById('clock');
time = "&emsp; <strong>Earth Date: </strong>"+d.toDateString();
d1.insertAdjacentHTML("afterbegin",time);
setCookie("main",JSON.stringify(myObj),"2000000000");
