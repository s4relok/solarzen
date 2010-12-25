<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<link rel="stylesheet" type="text/css" href="http://sector14.pnz.ru/s14/style.css"/> 
<!-- <link rel="stylesheet" type="text/css" href="http://sector14.pnz.ru/s14/sz.css"/>-->
<meta http-equiv="Content-Type" content="text/html; charset=windows-1251" />

<script type="text/javascript" src="js/jquery-1.3.2.min.js"></script>


</head>

<body>
	
	<script>
		
		var mf = function(){
			alert("here");
		}
		
		$(document).ready(function(){
   			$("#line").animate( { width:"99%"}, 5000, "linear", mf );
 		});

	
	
	
</script>
	
	<div  class="OuterLine">
		<div id="line" class="InnerLine" style="width:1%"></div>
		
	</div>
	
	
	
</body>
</html>