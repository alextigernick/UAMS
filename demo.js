var d1 = document.getElementById('nope');
var d = new Date();
var types = {"Potato":"potato.png","Corn":"corn.png","Beans":"beans.png","Cabbage":"cabbage.png"}
var myObj = {"num1":{ "type":"Potatos", "start":d.getTime(), "lastWater":d.getTime(),"Nutrients": 4 },"num2":{ "type":"Beans", "start":d.getTime(), "lastWater":d.getTime(),"Nutrients": 6 }};

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
myObj = JSON.parse(getCookie("main"));
for(x in myObj){
	var str = '<a href=""><div class="crops"><div class="plant"><center><img src="img/'+types[myObj[x]['type']]+'"> </center><h2 style="text-align:center">'+myObj[x]['type']+'</h2><div class ="info"> <p>Nutrients'+myObj[x]["Nutrients"]+'</p></div></div><div></div></div></a>';

	d1.insertAdjacentHTML("afterbegin",str);
}
setCookie("main",JSON.stringify(myObj),"2000000000");
