var total = 17;
var padding = 2;
var picWidth = Math.floor(($(window).width()-padding*3)/4);
var tmpl = '';
var render = function () {
	for (var i = 1; i < total+1; i++) {
		var p = padding;
		var imgSrc = 'img/'+i+'.jpg';
		if(i%4 === 1){
			p = 0;
		}
		tmpl += '<li data-id="'+i+'" class="animated bounceIn" style="width:'+picWidth/20+'rem;height:'+picWidth/20+'rem;padding-left:'+p/20+'rem;"><canvas id="cvs_'+i+'"></canvas></li>';
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

var wImage = $('#large_img');
var domImage = wImage[0];
var loadImg = function(id,callback){
	$('#large_container').css({
		width:$(window).width(),
		height:$(window).height()
	}).show();
	var id_num = id%18;	
	console.log(id_num);
	var imgsrc = 'img/'+id_num+'.large.jpg';
	var imageObj = new Image();
	imageObj.onload = function(){
		var w = this.width;
		var h = this.height;
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		var realw = winHeight*w/h;
		var paddingLeft = parseInt((winWidth - realw)/2);
		var realh = winWidth*h/w;
		var paddingTop = parseInt((winHeight - realh)/2);
		wImage.css({
			'height':'auto',
			'width':'auto',
			'padding-left':'0px',
			'padding-top':'0px'
		});		
		if (h/w>1.2) {
			wImage.attr('src',imgsrc).css({
				'height':winHeight,
				'padding-left':paddingLeft
			});
		}else{
			wImage.attr('src',imgsrc).css({
				'width':winWidth,
				'padding-top':paddingTop
			});
		}
		callback&&callback();
	}
	imageObj.src = imgsrc;
} 

var cid;

$('#container').delegate('li','tap',function(){
	var _id = cid = $(this).attr('data-id');
	loadImg(_id);
});

$('#large_container').tap(function(){
	$(this).hide();
}).swipeLeft(function(){
	cid++;
	if (cid>num) {
		cid=num;
	}else{
		loadImg(cid,function() {
			domImage.addEventListener('webkitAnimationEnd',function() {
				wImage.removeClass('animated bounceInRight');
				domImage.addEventListener('webkitAnimationEnd',false);
			});
			wImage.addClass('animated bounceInRight');
		},false);
	}
}).swipeRight(function(){
	cid--;
	if (cid<1) {
		cid=1;
	}else{
		loadImg(cid,function() {
			domImage.addEventListener('webkitAnimationEnd',function() {
				wImage.removeClass('animated bounceInLeft');
				domImage.addEventListener('webkitAnimationEnd',false);
			});
			wImage.addClass('animated bounceInLeft');
		},false);
	}
});

