var total = 18;
var padding = 2;
var picWidth = Math.floor(($(window).width()-padding*3)/4);
var render = function () {
	var tmpl = '';
	for (var i = 1; i < total; i++) {
		var p = padding;
		var imgSrc = 'img/'+i+'.jpg';
		if(i%4 === 1){
			p = 0;
		}
		tmpl += '<li class="animated bounceIn" style="width:'+picWidth/20+'rem;height:'+picWidth/20+'rem;padding-left:'+p/20+'rem;"><canvas id="cvs_'+i+'"></canvas></li>';
		var imageObj = new Image();
		imageObj.index = i;
		imageObj.onload = function(){
			var cvs = $('#cvs_'+this.index)[0].getContext('2d');
			cvs.width = this.width;
			cvs.height = this.height;
			cvs.drawImage(this,0,0);	
		}
		imageObj.src = imgSrc;
	}
	$('#container').html(tmpl);
}

render();


$('body').swipe(function(){
	var p = padding;
	if (total%4 == 1) {
		p = 0;
	}
	var mes = '<li class="animated bounceIn" style="width:'+picWidth/20+'rem;height:'+picWidth/20+'rem;padding-left:'+p/20+'rem;"><canvas id="cvs_'+total+'"></canvas></li>';
	var imageObj = new Image();
	imageObj.onload = function(){
		var cvs = $('#cvs_'+total)[0].getContext('2d');
		total++;
		cvs.width = this.width;
		cvs.height = this.height;
		cvs.drawImage(this,0,0);
	}
	var num = total%17+1;
	console.log(num,total);
	imageObj.src = 'img/'+num+'.jpg';
	$('#container').append(mes);
});
