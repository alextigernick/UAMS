
var d = new Date();
var types = {"Potatoes":{"img":"potato.png","soil":"Loam","ph":"4.8-5.5","light":"6 hours"},"Corn":{"img":"corn.png","soil":"Loam","ph":"4.8-5.5","light":"6 hours"},"Beans":{"img":"beans.png","soil":"Loam","ph":"4.8-5.5","light":"6 hours"},"Cabbage":{"img":"cabbage.png","soil":"Loam","ph":"4.8-5.5","light":"6 hours"}};

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
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}

myObj = JSON.parse(getCookie("main"));
var x = parseURLParams(window.location.search)['plant'][0];
var str = '<div class="'+myObj[x]['type']+'">'+myObj[x]['type']+" in plot "+myObj[x]['plot']+'</div>';

var d1 = document.getElementById('main');
d1.insertAdjacentHTML("afterbegin",str);

d1 = document.getElementById('water');
var next = (12 -((d.getTime()-myObj[x]['lastWater'])/(1000*60*60)));
var minutes = next - Math.floor(12 -((d.getTime()-myObj[x]['lastWater'])/(1000*60*60)));
minutes = Math.floor(minutes*60);

str = '<div class="'+myObj[x]['type']+'">Needs to watered in ' +Math.floor(next)+ " hours " +"and "+minutes+" minutes</div>";
d1.insertAdjacentHTML("afterbegin",str);

d1 = document.getElementById('table');

str = '<div class="'+myObj[x]['type']+'"><table><tr>';
for(var i=0; i<myObj[x]["quantity"];i++){
	if(i%10==0){
		str=str+"</tr><tr>"	
	}	
	str =str+'<td><img src="img/'+types[myObj[x]['type']]['img']+'"></td>';
}
str = str+"</table>"
d1.insertAdjacentHTML("afterbegin",str);

d1 = document.getElementById('info');

str = '<div class="'+myObj[x]['type']+'">Soil type: '+types[myObj[x]['type']]['soil']+"<br>Light: "+types[myObj[x]['type']]["light"]+"<br>PH Range:"+types[myObj[x]['type']]["ph"]+"</div>";
d1.insertAdjacentHTML("afterbegin",str);

setCookie("main",JSON.stringify(myObj),"2000000000");
