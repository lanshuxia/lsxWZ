$(function(){
	//楼层跳转事件
	var  z=$(".z")[0];
	var  zz=$(".zz");
	var  floor=$(".yl");
	var lou=["1F","2F","3F","4F","5F","6F","7F","8F","9F","10F"]
    var wenzi=["服饰百货","手机通讯","生活日用","食品酒水","母婴玩具","美妆个户","电脑数码","家用电器","家装建材","图书音箱"]
	for(var i=0;i<zz.length;i++){
		zz[i].index=i;
		zz[i].onclick=function(){
			var obj=document.documentElement.scrollTop?document.documentElement:document.body;
		    animate(obj,{scrollTop:floor[this.index].aa},500,Tween.Linear);
		    for(var j=0;j<zz.length;j++){
			zz[j].style.background="";
		    }
		    zz[this.index].style.background="red"
		}
		
	}
	window.onscroll=function(){//onscroll事件(一个页面中只能出现一次)
		var obj=document.documentElement.scrollTop?document.documentElement:document.body;
		if(obj.scrollTop>=1000&&obj.scrollTop<=6300){
            z.style.display="block";
		}else{
		    z.style.display="none";
		}
     	for(var i=0;i<floor.length;i++){
            floor[i].aa=floor[i].offsetTop-50;
            if(obj.scrollTop>=floor[i].aa){
            	for(var j=0;j<zz.length;j++){
                   zz[j].innerHTML=lou[j];
                   zz[j].style.fontSize="";
                   zz[j].style.lineHeight="";
                   zz[j].style.background="";
                   zz[j].style.color="";
                }
                zz[i].innerHTML=wenzi[i];
                zz[i].style.fontSize="12px";
                zz[i].style.lineHeight="20px"
                zz[i].style.background="red";
                zz[i].style.color="white";
            }  
     	}
  // 图片按需加载
  var yl=$(".yl");
	var ch=document.documentElement.clientHeight;
    var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    for(var i=0;i<yl.length;i++){
    	if(yl[i].offsetTop<obj.scrollTop+ch){
    		var imgs=$("img",yl[i]);
    		for(var j=0;j<imgs.length;j++){
    			imgs[j].src=imgs[j].getAttribute("tp");
    		}
    	}
    }

	}

// banner轮播
// var banner=$(".banner")[0];
// var imgs=$("img",banner);
// var len=imgs.length;
// var t=setInterval(move,2000);
// var num=0;
// function move(){
// 	if(num==len){
// 		num=0;
// 	}
// 	for(var i=0;i<len;i++){
// 		imgs[i].style.zIndex=3;
// 	}
// 		imgs[num].style.zIndex=4;

// }

// 下拉菜单
 var yiji=$(".dz");
 var erji=$(".erji");
 for(var i=0;i<yiji.length;i++){
 	yiji[i].index=i;
 	hover(yiji[i],function(){
 			var son=$("li",erji[this.index]);
 			var h=son[0].offsetHeight;
 			erji[this.index].style.height=0;
 			yiji[this.index].style.background="white";
 			animate(erji[this.index],{height:h*son.length},500,Tween.Linear);
 	},function(){
 			yiji[this.index].style.background="";
 			animate(erji[this.index],{height:0},500,Tween.Linear);
         
 	})
 }
// 左侧
var  zbtn=$(".sn5-11");
var  zc1=$(".zc1");
for(var i=0;i<zbtn.length;i++){
	zbtn[i].index=i;
	zbtn[i].onmouseover=function(){
		for(var j=0;j<zc1.length;j++){
			zc1[j].style.display="";
		}
		zc1[this.index].style.display="block";
	}
	zbtn[i].onmouseout=function(){
		zc1[this.index].style.display="none";
	}
}

// 下方轮播
var shequd=$(".shequda")[0];
var shequ=$(".shequ",shequd);
var len=shequ.length;
var zjbtn=$(".zjbtn")[0];
var lisbtn=$("li",zjbtn);
var lens=lisbtn.length;
var jtright=$(".jtright")[0];
var jtleft=$(".jtleft")[0];
var shequW=shequ[0].offsetWidth;
for(var i=0;i<shequ.length;i++){
	if(i!=0){
       shequ[i].style.left=shequW+"px";
	}
}
var now=0;
var next=0;
var flag=true;
jtright.onclick=function(){
	next++;
	if(next==len){
		next=0;
	}
	if(!flag){
		return;
	}
	flaf=false;
	animate(shequ[now],{left:-shequW},500,Tween.Linear);
	shequ[next].style.left=shequW+"px";
	animate(shequ[next],{left:0},500,Tween.Linear,function(){
		flag=true;
	});
    lisbtn[next].className="hot";
    lisbtn[now].className="";
	now=next;
  }
  jtleft.onclick=function(){
	next--;
	if(next<0){
		next=len-1;
	}
	if(!flag){
		return;
	}
	flaf=false;
	animate(shequ[now],{left:shequW},500,Tween.Linear);
	shequ[next].style.left=-shequW+"px";
	animate(shequ[next],{left:0},500,Tween.Linear,function(){
		flag=true;
	});
    lisbtn[next].className="hot";
    lisbtn[now].className="";
	now=next;
  }
 
  for(var j=0;j<lens;j++){
  	 lisbtn[j].index=j;
  	 lisbtn[j].onmouseover=function(){
  	 	if(now==this.index||!flag){
  	 		return;
  	 	}
  	 	flag=false;
  	 	if(now<this.index){
  	 		shequ[this.index].style.left=shequW+"px";
  	 		animate(shequ[now],{left:-shequW},500,Tween.Linear);
  	 	}else{
  	 		shequ[this.index].style.left=-shequW+"px";
  	 		animate(shequ[now],{left:shequW},500,Tween.Linear);
  	 	}
  	 		animate(shequ[this.index],{left:0},500,Tween.Linear,function(){
                  flag=true;
  	 		});
  	 		lisbtn[this.index].className="hot";
            lisbtn[now].className="";
            now=this.index;
  	 }
  }

// 楼层选项卡
function getX(num){
	var ylyl=$(".yl")[num];
	var rmhd=$(".rmhd",ylyl);
	var remenbtn=$(".remenbtn",ylyl);
	var yilouda=$(".yilouda")[num];
	var yilou=$(".yilou",yilouda);
	var len=rmhd.length;
	for(var i=0;i<len;i++){
		rmhd[i].index=i;
	    rmhd[i].onmouseover=function(){
	    	for(var j=0;j<len;j++){
	            yilou[j].style.zIndex=4;
	            remenbtn[j].style.display="none";
	            rmhd[j].style.color='#666';
	            rmhd[j].style.fontWeight='normal'; 
		    }
	            yilou[this.index].style.zIndex=6;
	            remenbtn[this.index].style.display="block";
	            rmhd[this.index].style.color='#222';
	            rmhd[this.index].style.fontWeight='bold';
	    }
		
	}
}
getX(0);
getX(1);
getX(2);
getX(3);
getX(4);
getX(5);
getX(6);
getX(7);
getX(8);
getX(9);

var zleft=$(".z")[0];
var clientW=document.documentElement.clientWidth;
window.onresize=function(){
	clientW=document.documentElement.clientWidth;
	zleft.style.left=((clientW-1349)/2)+30+"px";
}


// 右侧导航
var rightbox=$('.rightbox')[0];
var xtp=$('.xtp',rightbox);
var lc=$('.lc',rightbox);
var lcs=$('li',rightbox);
for(var i=0;i<xtp.length;i++){
    xtp[i].index=i;
   hover(xtp[i],function(){
    	for(var j=0;j<lc.length;j++){
           animate(lc[j],{width:0},500,Tween.Linear)
        }
          var lcw=lcs[this.index].offsetWidth;
           animate(lc[this.index],{width:lcw},500,Tween.Linear)
    },function(){
    	animate(lc[this.index],{width:0},500,Tween.Linear)
    }) 

}
// 返回顶部
var lctop=$('.xtp xtp7')[0];
lctop.onclick=function(){
	var obj=document.documentElement.scrollTop?document.documentElement:document.body;
	animate(obj,{scrollTop:0},200,Tween.Linear)
}


})