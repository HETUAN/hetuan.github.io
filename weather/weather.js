var  proNumber=0;
var  cityNumber=0;
var  areaNumber=101010200;
var  weekNames=new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");

function getArray(arry){
	var str=""
	for(i=0;i<arry.length;i++){

		str+='<option value='+i+'>'+arry[i][1]+'</option>';	
	}
	return str;
}

function arryFin(arry){
	console.log(arry)
	var str="";
	for(var i=0;i<arry.length;i++){
		str+='<option value='+i+'>'+arry[i][1]+'</option>'

	}
    return str;
}
function proFin(){
	console.log(arryFin(city));
	document.getElementById("province").innerHTML='<select><option>请选择自治区/省/直辖市</option>'+arryFin(city)+'</select>';
}
function cityFin(){
	var curProvince=proNumber=this.options[this.selectedIndex].value;
	document.getElementById("city").innerHTML='<select><option>请选择市</option>'+arryFin(city[curProvince][2])+'</select>';
}
function areaFin(){
	var curCity=cityNumber=this.options[this.selectedIndex].value;
	document.getElementById("area").innerHTML='<select><option>请选择区</option>'+getArray(city[proNumber][2][curCity][2])+'</select>';
}
function areaIDFin(){
	var curAreaID=this.options[this.selectedIndex].value;
	areaNumber=city[proNumber][2][cityNumber][2][curAreaID][2];
	
}
function getWeatherFin(){
	console.log(city);
	console.log(areaNumber);
    $.get('http://weather.123.duba.net/static/weather_info/' + areaNumber + '.html', {}, function(data) {
	eval(data);
        // console.log(data);
        // console.log(data.weatherinfo);
    });


}

function  weather_callback(data){
	 document.getElementById('curCity').innerHTML=data.weatherinfo.city;
	  document.getElementById("curDate").innerHTML=data.weatherinfo.date_y;
	  document.getElementById('curWeek').innerHTML=data.weatherinfo.week;
      document.getElementById("curWeather").innerHTML = '<ul><li><p class="curTemWord"><span>当前温度：</span><span>' + data.weatherinfo.temp + '</span></p><img class="curPic" src="http://www.duba.com/static/v2/images/weather/a/a' + data.weatherinfo.st1 + '.png"><p>' + data.weatherinfo.weather1 + '</p><p>' + data.weatherinfo.date_y + '</p><p id="nowFinTime">1111</p></li></ul><ul class="curAir"><li><p><span>' + data.weatherinfo.wd + '</span><span>' + data.weatherinfo.ws + '</span></p><p><span>' + data.weatherinfo['pm-level'] + '</span><span>' + data.weatherinfo.pm + '</span></p> <p>湿度<span>' + data.weatherinfo.sd + '</span></p></li></ul>';

	var week=new Date().getDay();
	console.log(week);
	var str="";
	for(var i=0;i<5;i++){
		str+='<li><p class="week">'+ weekNames[++week==7?week=0:week]+'</p><img src="http://www.duba.com/static/v2/images/weather/a/a' + data.weatherinfo['st' + (i + 1)] + '.png"/><p>' + data.weatherinfo['temp' + (i + 1)] + '</p><p>' + data.weatherinfo['weather' + (i + 1)] + '</p></li>';
	
	}
   document.getElementById("preWeek").innerHTML =str;
    currentTime();
}

function showDIV(){
	var target=document.getElementById('selectCity');
	if (target.style.display=="block") {
		target.style.display="none";

	}else{
		target.style.display="block";
		console.log(target.style.display);
	}
	
}
function currentTime() {
    var mytime = new Date();
    var timeFin = document.getElementById("nowFinTime");
   // console.log(timeFin);
    timeFin.innerHTML = '现在是：' + mytime.getHours() + ' : ' + mytime.getMinutes() + " : " + mytime.getSeconds();
    setTimeout(currentTime, 1000);
}

function  finIndex(){

	$('#province').on('change','select',cityFin);
	$('#city').on('change','select',areaFin);
	$('#area').on('change', 'select', areaIDFin);
	$('#switchCity').on("click",showDIV);
	$("#subCity").on('click', getWeatherFin);
}


proFin();
finIndex();
getWeatherFin();
