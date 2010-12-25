<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns:v="urn:schemas-microsoft-com:vml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />
<title>Untitled Document</title>
</head>

It begins.

<body>

<div id="dds" style="width:100px; min-height:100px; border:thin #000 solid; position:relative; left:100px; "
 onmouseover="document.getElementById('dds').style.top='10px'" onmouseout="document.getElementById('dds').style.left='100px'" ondblclick="this.style.border = 'thick dotted'"> fffdsa </div>

<!--<img name="picture" src="images/s1.jpg"  onmouseover="document.images.picture.src='images/s2.jpg'"
onmouseout="this.src='images/s1.jpg'"/><br/>
-->

<div id="timer">10</div>

<script>

function f() {
	
	var canvas = document.getElementById("square");
	var ctx = canvas.getContext("2d");
	//alert("yahoo1");
	ctx.fillStyle = "#f00";
	ctx.fillRect(0,0,10,10);
	
	
}

if(window.addEventListener)
	window.addEventListener("load", f, false);
else if(window.attachEvent)
	window.attachEvent("load", f);
	
var left_time = 10; // выставляем нужное время  
	setTimeout("refresh()", 1000); // интервал выполнения скрипта  
	
function refresh()
{
left_time--; // два минуса указывают на вычетание единицы
var counter = document.getElementById("timer");
if (counter) { counter.innerHTML = left_time; }
if (left_time == 0) window.location = 'http://sector14.pnz.ru';
else setTimeout("refresh()", 1000);// интервал выполнения скрипта  
}



/*document.write("Hello, yzsy.");

document.images["picture"] = null;
*/


</script>


Canvas presents: 
<canvas id="square" width=10 height=10></canvas>



</body>
</html>
