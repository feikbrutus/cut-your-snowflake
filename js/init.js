$(function(){
	
	r = Raphael('map', 1650, 1750),     //создать map
		attributes = {
            fill: '#ff0',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        },
		arr = new Array(); 
		
		//€ скопировал. удалить
		attributes1 = {
            fill: '#fff',
            stroke: '#389885',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        };
	
	r2 = Raphael('popup', 1050, 800), 
		attributes2 = {
            fill: '#ff0',
            stroke: '#3899E6',
            'stroke-width': 1,
            'stroke-linejoin': 'round'
        }; 
	
	for (var country in paths) {    //
	
		obj = r.path(paths[country].polygon);
		pathParts = obj.attr('path'); //тут path при том что в там в paths у нас polygon

		pathclon = obj.attr('path');

		obj.attr(attributes);   //атрибуты-свойства обьекта --- заливка и тд
			
		obj.mousemove(function (event) {
			var evt = event;
			var IE = document.all?true:false;
			var x, y;
			if (IE) {
				x = evt.offsetX + document.body.scrollLeft +  //clientX
					document.documentElement.scrollLeft;
				y = evt.offsetY + document.body.scrollTop +
					document.documentElement.scrollTop;
			}
			else {
				x = evt.offsetX;      //pageX
				y = evt.offsetY;
			}
			
			// subtract paper coords on page
			this.ox = x - 0; //75
			this.oy = y - 0;
		});
		
		start = function () {
			g_masterPathArray = new Array();
		},
        move = function (dx, dy) {

            if (g_masterPathArray.length == 0) {
                g_masterPathArray[0] = ["M",this.ox,this.oy];
                
				g_masterDrawingBox = r.path(g_masterPathArray);
                g_masterDrawingBox.attr({stroke: "#000000","stroke-width": 1}); // не об€зательно?

				pathParts.push(["M",this.ox,this.oy]);
				
            }
            else{
                g_masterPathArray[g_masterPathArray.length] =["L",this.ox,this.oy];
				
				pathParts.push(["L",this.ox,this.oy]);

             }
            g_masterDrawingBox.attr({path: g_masterPathArray});  //атрибуты рисовалки.

        },
        up = function () {
            
			pathParts.push(["L",this.ox,this.oy]);

			obj.attr('path', pathParts);

			g_masterDrawingBox.attr({stroke: "#000000","stroke-width": 0});  

        };
		
		flag = 0;
        //драг
		if(flag==0) {
			obj.drag(move, start, up);
		}
		
		
		arr[obj.id] = country;
		
		obj
		.hover(function(){

		}, function(){

		})
		
		.click(function(){                                    /* click */
		
		});
			
	}
	
});
var start,move,up;
var r,r2;
var g_masterPathArray;
var g_masterDrawingBox;
var g_masterPaper;
var obj, pathParts;
var obj_i=0,obj_normal=0,obj_scale=0;
var obj_r2=0,obj_normal_r2 = new Array(),obj_i_r2 = new Array();

//размножение треугольников
function clon() {
		var ang=0,x=800, y=800;
			for(var i = 0; i < 11; i++){
				obj_normal = obj.clone();
				ang+=30;
				if(i%2==0) {
					obj_i = obj.clone().rotate(ang,x,y).scale(-1,1,x,y);
				}
				else {
					obj_normal.rotate(ang, x, y); 
				}
			}
}

$(document).ready(function(){
    PopUpHide();
});

function PopUpShow(){
    $("#popup1").show();
	obj_r2 = r2.path(pathParts);
	obj_r2.attr(attributes2);
	obj_r2.translate(-300, -250).scale(0.3);
	var ang=0,x=499, y=276;
	for(var i = 0; i < 5; i++){
		ang+=60;
		obj_normal_r2[i] = obj_r2.clone().rotate(ang,x,y);//.scale(-1,1,x,y);
	}
	ang=30;
	for(var i = 0; i < 6; i++){
		ang+=60;
		obj_i_r2[i] = obj_r2.clone().rotate(ang,x,y).scale(-1,1,x,y);
	}
}

var obj_prev=0;
var obj_normal_obj_prev = new Array();
var obj_i_obj_prev = new Array();

function PopUpHide(){
    $("#popup1").hide();
	
	if(obj_r2!=0) {
		obj_r2.remove();
		for(var i = 0; i < 5; i++){
			obj_normal_r2[i].remove();
		}
		for(var i = 0; i < 6; i++){
			obj_i_r2[i].remove();
		}
	}
}

function prev2(){
	if(obj_prev!=0) {
			obj_prev.remove();
			for(var i = 0; i < 5; i++){
				obj_normal_obj_prev[i].remove();
			}
			for(var i = 0; i < 6; i++){
				obj_i_obj_prev[i].remove();
			}
		}

	obj_prev = r.path(pathParts);
	obj_prev.attr(attributes2);
	obj_prev.translate(-300, 1700).scale(0.5);
	var ang=0,x=499, y=2304;
	for(var i = 0; i < 5; i++){
		ang+=60;
		obj_normal_obj_prev[i] = obj_prev.clone().rotate(ang,x,y);
	}
	ang=30;
	for(var i = 0; i < 6; i++){
		ang+=60;
		obj_i_obj_prev[i] = obj_prev.clone().rotate(ang,x,y).scale(-1,1,x,y);
	}
}

function prev(){
	if(obj_prev!=0) {
			obj_prev.remove();
			for(var i = 0; i < 5; i++){
				obj_normal_obj_prev[i].remove();
			}
			for(var i = 0; i < 6; i++){
				obj_i_obj_prev[i].remove();
			}
		}

	obj_prev = r.path(pathParts);
	obj_prev.attr(attributes2);
	obj_prev.translate(-619, 551).scale(0.2);
	var ang=0,x=180, y=1039;
	for(var i = 0; i < 5; i++){
		ang+=60;
		obj_normal_obj_prev[i] = obj_prev.clone().rotate(ang,x,y);
	}
	ang=30;
	for(var i = 0; i < 6; i++){
		ang+=60;
		obj_i_obj_prev[i] = obj_prev.clone().rotate(ang,x,y).scale(-1,1,x,y);
	}
	
}


var svgString;
function getSVG() {
	svgString = null;
	svgString = document.getElementById('map').innerHTML;
}

function exportSVG() {
	traf();loop();prev();
	getSVG();
	//svgString = document.getElementById('map').innerHTML;
	a = document.createElement('a');
	a.download = 'mySnowFlake_svg_' + Date.now() + '.svg';
	a.type = 'image/svg+xml';
	blob = new Blob([svgString], {"type": "image/svg+xml"});
	a.href = (window.URL || webkitURL).createObjectURL(blob);
	a.click();
	
	flag++;flag_loop++;loop2();
}

function exportPNG() {
	var svgString1 = new XMLSerializer().serializeToString(document.getElementById('map').querySelector('svg'));
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var DOMURL = self.URL || self.webkitURL || self;
	var img = new Image();
	var svg = new Blob([svgString1], {type: "image/svg+xml;charset=utf-8"});
	var url = DOMURL.createObjectURL(svg);
	img.onload = function() {
		ctx.drawImage(img, 0, 0);  //рисование svg в канвасе . но канвас hidden in ccs
		var png = canvas.toDataURL("image/png");
		var data = atob(png.substring('data:image/png;base64,'.length)),
                asArray = new Uint8Array(data.length);

        for (var i = 0, len = data.length; i < len; ++i) {
            asArray[i] = data.charCodeAt(i);
        }

        var blob = new Blob([asArray.buffer], {type: 'image/png'});
        saveAs(blob, 'mySnowFlake_png_' + Date.now() + '.png');	
		//document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';  //вывод png как картинку. на екран
		//DOMURL.revokeObjectURL(png); 
	};
	img.src = url;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
}

function exportPDF() {
	var svgString1 = new XMLSerializer().serializeToString(document.getElementById('map').querySelector('svg'));
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var DOMURL = self.URL || self.webkitURL || self;
	var img = new Image();
	var svg = new Blob([svgString1], {type: "image/svg+xml;charset=utf-8"});
	var url = DOMURL.createObjectURL(svg);
	img.onload = function() {
		ctx.drawImage(img, 0, 0);  //рисование svg в канвасе . но канвас hidden in ccs
		var png = canvas.toDataURL("image/png");
		var data = atob(png.substring('data:image/png;base64,'.length)),
                asArray = new Uint8Array(data.length);

        for (var i = 0, len = data.length; i < len; ++i) {
            asArray[i] = data.charCodeAt(i);
        }

        var blob = new Blob([asArray.buffer], {type: 'image/png'});
		
        //saveAs(blob, 'mySnowFlake_png_' + Date.now() + '.png');	
		//document.querySelector('#png-container').innerHTML = '<img src="'+png+'"/>';  //вывод png как картинку. на екран
		//DOMURL.revokeObjectURL(png); 
	};
	img.src = url;
	//ctx.clearRect(0, 0, canvas.width, canvas.height);

	//var canvas = document.getElementById("canvas");
	var png2 = canvas.toDataURL("image/png");
	var doc = new jsPDF();
	//doc.setFontSize(40);
	//doc.text(35, 25, "Octonyan loves jsPDF");
	doc.addImage(png2, 'png', 10, 10, 190, 275);	
	
	doc.save('a4.pdf');
	//doc.autoPrint(); 
	//doc.output('datauri');
	
}

/* function exportPDF2() {
	//document.getElementById('pdfsave').addEventListener("click", function () {
            svg_to_pdf(document.querySelector("svg"), function (pdf) {
                download_pdf('SVG.pdf', pdf.output('dataurlstring'));
            });
        //});
}  */

var obj_traf;
var one,two,tre,four;
var flag=0;

function traf(){  //первая версия трафарета
	if(flag==0){
	obj_traf = r.path(["M  20 22 L 20 1578 L 1578 1578 L 1578 22  z M	20 22, L 1578 1578 z M	20 1578, L 1578 22 z M	22 1010, L 800 800 z M	22 591, L 800 800 z M  590 22 L 800 800 L 1009 22 "]);
	pathParts2 = obj_traf.attr('path');
	one = r.text(1235,400, "1");
	one.attr({'font-size': 40});
	two = r.text(350,400, "2");
	two.attr({'font-size': 40});
	tre = r.text(650,350, "3");
	tre.attr({'font-size': 40});
	four = r.text(950,350, "4");
	four.attr({'font-size': 40});
	obj_traf.attr('path', pathParts2);
	}
	//flag++;
}

var flag_loop=0;
function loop() { //увеличение размеров трафарета, треугольника и цифр
	if(flag_loop==0){
		one.translate(-500,-223);
		two.translate(-205,-223);
		tre.translate(-325,-223);
	   four.translate(-415,-223);
		obj.scale(0.55).translate(-370,-195);
		obj_traf.scale(0.55).translate(-370,-370);
		
	}
	
}	

function loop2() { //уменьшение размеров трафарета, треугольника и цифр
	if(flag_loop==1){
		one.translate(500,223);
		two.translate(205,223);
		tre.translate(325,223);
	   four.translate(415,223);
		obj.scale(1).translate(370,195);
		obj_traf.scale(1,1).translate(370,370);
	}
	flag_loop=0;
}

function hide_all() {
	obj_traf.hide();
	obj_prev.hide(); /////////один только треугольник пр€чен. нужно весь массив обьектов пр€тать. та нафиг
	one.hide();
	two.hide();
	tre.hide();
	four.hide();
}

/* window.onload = function () 
	{
	//var g_masterPaper = Raphael(10,10,700,500);
	/* var g_masterPaper = Raphael(10,10,700,500);
    
    var masterBackground = g_masterPaper.rect(10,10,600,400);
    masterBackground.attr("fill", "#fff"); 
    }
    
    
}; */



//var str = "M  500 45, 500 89, 600 90 ";

/* Raphael.el.red = function () {
			//this.attr({fill: "#f00"});
		}  */
		
/* Raphael.el.addel = function () {
	//.attr({fill: "#f00"});
	this.circle(45, 19, 45);
}; */

