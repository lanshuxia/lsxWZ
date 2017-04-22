$(function(){
	// 下拉菜单
	var yiji=$(".zj21");
	var erji=$(".erji");
	for(var i=0;i<yiji.length;i++){
		yiji[i].index=i;
		yiji[i].onmouseover=function(){
			animate(erji[this.index],{height:220},500,Tween.Linear)
		     // erji[this.index].style.display="block";
			}
		yiji[i].onmouseout=function(){
            // erji[this.index].style.display="none";
			animate(erji[this.index],{height:0},500,Tween.Linear)    
	}
  }
//banner轮播
 var banner=$(".banner")[0];
 var img=$("img",banner);
 var len=img.length;
 var link=$(".link")[0];
 var lis=$("li",link);
 var box=$(".zj2-1")[0];
 var right=$(".right")[0];
 var left=$(".left")[0];
 
 for(var i=0;i<lis.length;i++){
 	lis[i].index=i;
 	lis[i].onclick=function(){
 		clearInterval(t);
 		for(var j=0;j<img.length;j++){
 			img[j].style.zIndex=3;
 			lis[j].className="";
 		}
 		img[this.index].style.zIndex=4;
 		lis[this.index].className="hot";
 	}
 }

 var t=setInterval(move,2000);
 var num=0;
function move(){
 		// clearInterval(t);

 	if(num==5){
 		num=0;
 	}
 	for(var i=0;i<img.length;i++){
 		img[i].style.zIndex=3;
 		lis[i].className="";
 	}
 	img[num].style.zIndex=4;
 	lis[num].className="hot";
 	num++;
}
 right.onclick=function(){
 	move();
 }
 // right.onmouseover=function(){
 // 	right.style.background="#ccc";
 // }
 // right.onmouseout=function(){
 // 	right.style.background="";
 // }
// 
// var num=len-1;
left.onclick=function(){
    clearInterval(t);
    if(num<0){
 	  num=4;
 	}
 	for(var i=0;i<img.length;i++){
 		img[i].style.zIndex=3;
 		lis[i].className="";
 	}
 	img[num].style.zIndex=4;
 	lis[num].className="hot";
 	num--;
}
 // left.onmouseover=function(){
 // 	left.style.background="#ccc";
 // }
 // left.onmouseout=function(){
 // 	left.style.background="";
 // }
//左侧
var zc=$(".zj2-111");
var zc1=$(".zc");
for(var i=0;i<zc.length;i++){
	zc[i].index=i;
	zc[i].onmouseover=function(){
		for(var j=0;j<zc1.length;j++){
			zc1[j].style.display="none";
		}
			zc1[this.index].style.display="block";
	}
	zc[i].onmouseout=function(){
		for(var j=0;j<zc1.length;j++){
			zc1[j].style.display="none";
		}
	}
}

// 左右按钮
function getZ(num){
	var sleft=$(".sleft")[num];
	var sright=$(".sright")[num];
	var ximi=$(".ximi1")[num];
	sleft.onclick=function(){
	    animate(ximi,{left:0},500,Tween.Linear,function(){
	     })
	}
	sright.onclick=function(){
	     animate(ximi,{left:-1226},500,Tween.Linear,function(){
	     })
	}
}
getZ(0);
getZ(1);
// 节点轮播
function getZuo(num){
var link=$(".nryd")[num];
var btn=$("li",link);
var nei1=$(".nei1")[num];
var nei=$(".nr2-1",nei1);
var btnright=$(".btnright")[num];
var btnleft=$(".btnleft")[num]
var num=0;
	btnright.onclick=function (){
		if(num==3){
			num=3;
			return;
		}
		num++;
		for(var i=0;i<btn.length;i++){
			btn[i].className="";
		}
		btn[num].className="nryd1";
		nei1.style.marginLeft=-296*num+"px";		
	}
    btnleft.onclick=function (){
		if(num<0){
			num=0;
			return;
		}
		for(var i=0;i<btn.length;i++){
			btn[i].className="";

		}
		btn[num].className="nryd1";
		nei1.style.marginLeft=-296*num+"px";
	    num--;
    }

    for(var i=0;i<btn.length;i++){
		btn[i].index=i;
		btn[i].onclick=function(){
		 for(var j=0;j<nei.length;j++){
			btn[j].className="";
		 }
		btn[this.index].className="nryd1";
		nei1.style.marginLeft=-296*this.index+"px";
	  }
	}
}

getZuo(0);
getZuo(1);
getZuo(2);
getZuo(3);

// 智能硬件
function getY(num){
	var remen=$(".remen")[num];
	var lisbtn=$("a",remen);
	var yjd=$(".yingjianda")[num];
	var yjn=$(".yingjian2",yjd);
	var yjlen=yjn.length;
	lens=lisbtn.length;
	for(var i=0;i<lens;i++){
		lisbtn[i].index=i;
		lisbtn[i].onmouseover=function(){
	         for(var j=0;j<yjlen;j++){
	         	yjn[j].style.display="none";
	         	lisbtn[j].className="";
	         }
	         	yjn[this.index].style.display="block";
	         	lisbtn[this.index].className="hot1";
		}
	}
}
getY(0);
getY(1);
getY(2);

//底下文字
function getW(num,num1){
// var rem=$(".remen")[num]
var ul=$(".yingjian")[num];
var uls=$(".yingjian2")[num1];
var li=$("li",uls);
var wenzi=$(".dp2115",uls);
	for(var i=0;i<li.length;i++){
		li[i].index=i;
		hover(li[i],function(){
			for(var j=0;j<wenzi.length;j++){
				animate(wenzi[j],{height:0},200,Tween.Linear)
			}
				animate(wenzi[this.index],{height:80},200,Tween.Linear)

		},function(){
			animate(wenzi[this.index],{height:0},200,Tween.Linear)
		})
	}
}
getW(0,0);
getW(0,1);
getW(0,2);
getW(0,3);

getW(1,4);
getW(1,5);
getW(1,6);
getW(1,7);
getW(1,8);

getW(2,9);
getW(2,10);
getW(2,11);
getW(2,12);
getW(2,13);







})