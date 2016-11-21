var num;
var padding = 2;
var picWidth = Math.floor(($(window).width()-padding*3)/4);
var xmlhttp = new XMLHttpRequest();
var loadNum = 0;

/*
	加载图片
*/
var image = function(photoSrc) {
	var imageObj = new Image();
	imageObj.index = num;
	imageObj.onload = function(){
		console.log(photoSrc);
		var cvs = $('#cvs_'+this.index)[0].getContext('2d');
		cvs.width = this.width;
		cvs.height = this.height;
		cvs.drawImage(this,0,0);
	}
	imageObj.src = 'img/'+photoSrc;
}
/*
	批量加载
*/
var loadPhoto = function(photoLen) {
	var tmpl = '';
	for (var i = 0; i < photoObj.length; i++) {
		var photoSrc = photoObj[i].src;
		var p = padding;
		num = photoLen+i+1; 
		console.log("显示第"+num+"张");
		if (num%4 === 1) {
			p = 0;
		}
		tmpl += '<li data-id="'+num+'" class="animated bounceIn" style="width:'+picWidth/20+'rem;height:'+picWidth/20+'rem;padding-left:'+p/20+'rem;"><canvas id="cvs_'+num+'"></canvas></li>';
		image(photoSrc);
	}
	$('#container').append(tmpl);
	loadNum++;	
	console.log("滑动输出次数"+loadNum);
}

/*
	加载json数据
*/
xmlhttp.onreadystatechange=function(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		photoObj =  JSON.parse(xmlhttp.responseText).photo;
		loadPhoto(photoObj.length*loadNum);
		console.log("图片加载次数"+photoObj.length*loadNum);
		
		/*loadPhoto(photoObj.length*loadNum);
		console.log("图片加载次数"+photoObj.length*loadNum);
		
		loadPhoto(photoObj.length*loadNum);
		console.log("图片加载次数"+photoObj.length*loadNum);*/
		
		$('body').swipe(function(){
			loadPhoto(photoObj.length*loadNum);
			console.log("图片加载次数"+photoObj.length*loadNum);
		});
	}
}
xmlhttp.open("GET","./ajax/photo.json",true);
xmlhttp.send();



/*
	给每张小图绑定放大事件
*/
var wImage = $('#large_img');
var domImage = wImage[0];
var loadImg = function(id,callback){
	$('#large_container').css({
		width:$(window).width(),
		height:$(window).height()
	}).show();
	var id_num = id%17;
	if (id_num === 0) {
		id_num = 17;
	}	
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


/*
	给每张大图绑定事件 
*/
$('#large_container').tap(function(){
	$(this).hide();
}).swipeLeft(function(){
	cid++;
	if (cid>num) {
		cid=num;
		console.log("后面没有了");
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
		console.log("前面没有了");
	}else{
		loadImg(cid,function() {
			domImage.addEventListener('webkitAnimationEnd',function() {
				wImage.removeClass('animated bounceInLeft');
				domImage.addEventListener('webkitAnimationEnd',false);
			});
			wImage.addClass('animated bounceInLeft');
		},false);
	}
}).swipe(function(){
	document.body.style.overflow='hidden';
	document.body.style.height='100%';
});
