var num=0;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange=function(){
	if (xmlhttp.readyState==4 && xmlhttp.status==200){
		/*document.getElementById("myDiv").innerHTML=xmlhttp.responseText;*/
		for (var i = 0; i < JSON.parse(xmlhttp.responseText).photo.length; i++) {
			console.log(JSON.parse(xmlhttp.responseText).photo[i].src);
			var p = padding;
			var photoSrc = JSON.parse(xmlhttp.responseText).photo[i].src;
			num = total+i+1; 
			if (num%4 === 1) {
				p = 0;
			}
			tmpl += '<li data-id="'+num+'" class="animated bounceIn" style="width:'+picWidth/20+'rem;height:'+picWidth/20+'rem;padding-left:'+p/20+'rem;"><canvas id="cvs_'+num+'"></canvas></li>';
			/*$('#container').append();*/
			var imageObj = new Image();
			imageObj.index = num;
			imageObj.onload = function(){
				var cvs = $('#cvs_'+this.index)[0].getContext('2d');
				cvs.width = this.width;
				cvs.height = this.height;
				cvs.drawImage(this,0,0);
			}
			imageObj.src = 'img/'+photoSrc;
			$('#container').html(tmpl);
		}	

	}
}
xmlhttp.open("GET","./ajax/photo.json",true);
xmlhttp.send();