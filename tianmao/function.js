window.onload=function(){
  // var dp111=getClass("dp1-11");
  //   var dy22=getClass("dy2-2");
  //     for(var i=0;i<dp111.length;i++){
  //       dp111[i].index=i;
  //       dp111[i].onclick=function(){
  //        for(var j=0;j<dy22.length;j++){
  //           dy22[j].style.display="none";
  //           dp111[j].style.fontWeight="normal";
  //           dp111[j].style.textDecoration="none";
  //        }
  //           dy22[this.index].style.display="block";
  //           dp111[this.index].style.fontWeight="bold";
  //           dp111[this.index].style.textDecoration="underline"
  //       }
  //     } 

//显示桃心
// var box=$(".dy2-21");
// var taoxin=$(".taoxin");
//   for(var i=0;i<box.length;i++){
//     box[i].index=i;
//     box[i].onmouseover=function(){
//     taoxin[this.index].style.display="block";
//     }
//     box[i].onmouseout=function(){
//     taoxin[this.index].style.display="none";
//     }
//   }

//导航条显示隐藏
var dingbu=$(".dingbu")[0];
var flag=true;
var flag1=true;//滚动条往下拉时的开关，第一次开,这个开关要保证每一次往下拉时，开关都是开的
 window.onscroll=function(){
 var obj=document.documentElement.scrollTop?document.documentElement:document.body;
 if(obj.scrollTop>=300){
   if(flag){
     animate(dingbu,{top:0},500,Tween.Linear);
     flag=false;//第一次往下，执行完把开关关掉
     flag1=true;
   }
 }
 else{
    if(flag1){
     animate(dingbu,{top:-55},500,Tween.Linear);
       flag=true;
       //第一次往上，执行完把开关打开
       flag1=false;
    }
  }

//楼层
var btu=$(".left")[0];
var btuxiao=$("li",btu);
var louceng=$(".nz");
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  if(obj.scrollTop>=500&&obj.scrollTop<=6800){
     btu.style.display="block";
  }else{
     btu.style.display="none";
  }
  //通过滚动条来控制小按钮
var lou=["1F","2F","3F","4F","5F","6F","7F","8F","9F","10F","11F","12F"]
var wenzi=["女装内衣","美容护肤","男装内衣","鞋包服装","运动户外","手机数码","家用电器","母婴玩具","食品食物","图书书籍","家装家纺","在线超市"]
  for(var i=0;i<louceng.length;i++){
    louceng[i].aa=louceng[i].offsetTop-100;
    if(obj.scrollTop>=louceng[i].aa){
       for(var j=0;j<btuxiao.length;j++){
        btuxiao[j].style.background="";
        btuxiao[j].style.color="";
        btuxiao[j].innerHTML=lou[j];
        btuxiao[j].style.fontSize="";
        btuxiao[j].style.lineHeight="";
       }
        btuxiao[i].style.background="red";
        btuxiao[i].style.color="white";
        btuxiao[i].innerHTML=wenzi[i];
        btuxiao[i].style.fontSize="12px";
        btuxiao[i].style.lineHeight="18px";
      
    }

  }

  //图片按需加载
  var floor=$(".nzd");
       var ch=document.documentElement.clientHeight;
        var obj=document.documentElement.scrollTop?document.documentElement:document.body;
        for(var i=0;i<floor.length;i++){
          if(floor[i].offsetTop<obj.scrollTop+ch){
            var imgs=$("img",floor[i]);
            for(var j=0;j<imgs.length;j++){
              imgs[j].src=imgs[j].getAttribute("aa");
            }
          }
        }
  }

var btu=$(".left")[0];
var btuxiao=$("li",btu);
var louceng=$(".nz");

 //通过小按钮按钮控制滚动条
 for(var i=0;i<btuxiao.length;i++){
   btuxiao[i].index=i;
   btuxiao[i].onclick=function(){
    var obj=document.documentElement.scrollTop?document.documentElement:document.body;
    animate(obj,{scrollTop:louceng[this.index].aa},500,Tween.Linear);
    for(var j=0;j<btuxiao.length;j++){
                  btuxiao[j].style.background="";
                 }
                 btuxiao[this.index].style.background="red";        
   }
 }

 //banner轮播图
 var img=$(".img")
 var list=$(".list");
 var gbarr=["#dbdbdb","#febee0","#0650a7","#dcdcdc","#bf1b22","#6bd3e0"];
 var jpbanner=$("#jp");
 for(var i=0;i<list.length;i++){
  list[i].index=i;
  list[i].onmouseover=function(){
    clearInterval(t);
    for(var j=0;j<img.length;j++){
    img[j].style.zIndex=2;
    list[j].style.background="black";
   }
   img[this.index].style.zIndex=3;
   list[this.index].style.background="red";
   jpbanner.style.background=gbarr[this.index];
  }
  list[i].onmouseout=function(){
    t=setInterval(move,2000);
    num=this.index+1
  }
  
}
var t=setInterval(move,2000);
var num=1;
function move(){
   if(num==6){
    num=0;
   }
   for(var i=0;i<img.length;i++){
     img[i].style.zIndex=2;
     list[i].style.background="black";
   }
   img[num].style.zIndex=3;
   list[num].style.background="red";
   jpbanner.style.background=gbarr[num];
   num++;
}

var zjp=$(".jp1-11");
var neirong=$(".neirong")[0];
var neirong1=$("li",neirong);
var jpbig=$("#jp");
var jpr=$(".jpr");
var gbarr1=["#dbdbdb","#dfdfdf","#f73d2e","#dbdbdb","#1b2943","#c05afc","#e30f0e","#ffb701","#fc4d78","#4157ff","#db3e45","#2f8bde","#febee0","#dbdbdb","#6bd3e0","#bf1b22"]
for(var i=0;i<zjp.length;i++){
   zjp[i].index=i;
   zjp[i].onmouseover=function(){
   if(this.index==0){
      clearInterval(t);
      for(var j=0;j<neirong1.length;j++){
         neirong1[j].style.zIndex=2;
      }
      neirong1[0].style.zIndex=9;
      jpbig.style.background=gbarr[num-1];
      t=setInterval(move,2000);
   }else{
      clearInterval(t);
      for(var j=0;j<neirong1.length;j++){
       neirong1[j].style.zIndex=2;
     }
       neirong1[this.index].style.zIndex=9;
       jpbig.style.background=gbarr1[this.index];
   } 
   for(var k=0;k<jpr.length;k++){
       jpr[k].style.display="none";
   }
       jpr[this.index].style.display="block";
 }

}


//左边节点轮播
function getZuo(num){
var imgboxd=$(".imgboxd")[num];
var leftbtn=$(".xiaojiantou1")[num];
var rightbtn=$(".xiaojiantou2")[num];
var t=setInterval(moveleft,2000);
function moveleft(){
  animate(imgboxd,{left:-90},500,Tween.Linear,function(){
    var first=getFirst(imgboxd);
    imgboxd.appendChild(first);
    imgboxd.style.left=0;
    })
   }
 function moveright(){
     imgboxd.style.left="-90px";
     animate(imgboxd,{left:0},500,Tween.Linear);
     var last=getLast(imgboxd);
     imgboxd.insertBefore(last,getFirst(imgboxd));
     }
      leftbtn.onmouseover=rightbtn.onmouseover=function(){
            clearInterval(t);
      }
      leftbtn.onmouseout=rightbtn.onmouseout=function(){
           t=setInterval(moveleft,2000);
      }
leftbtn.onclick=function(){
    moveleft();
}
rightbtn.onclick=function(){
   moveright();
  }
}
getZuo(0) 
getZuo(1)
getZuo(2) 
getZuo(3)  
getZuo(4) 
getZuo(5) 


//下拉菜单
var yiji1=$(".yiji");
var erji=$(".erji");
for(var i=0;i<yiji1.length;i++){
  yiji1[i].index=i;
  hover(yiji1[i],function(){
     var sons=$("li",erji[this.index]);
     var h=sons[0].offsetHeight;
     erji[this.index].style.height=0;
     animate(erji[this.index],{height:h*sons.length},500,Tween.Linear);
  },function(){
    animate(erji[this.index],{height:0},500,Tween.Linear);
    })
 }

 //左边隐藏
var zjp=$(".zuobig");
var zuob=$(".zuob");
for(var i=0;i<zjp.length;i++){
  zjp[i].index=i;
  hover(zjp[i],function(){
     for(var j=0;j<zuob.length;j++){
        zuob[j].style.display="none";
     }
     zuob[this.index].style.display="block";
   },function(){
     zuob[this.index].style.display="none";
   })
}

//选项卡

     var huan=$(".dy1-2")[0];
     var title=$(".dp1-11");
     var con=$(".dy2-2");
     var onearr=[];
     var twoarr=[];
     var threearr=[];
     var fourarr=[];
     //放图片
     for(var i=0;i<38;i++){
          onearr.push("img1/"+i+".jpg");//34
          twoarr.push("img1/"+i+".jpg");//34
          threearr.push("img1/"+i+".jpg");//34
          fourarr.push("img1/"+i+".jpg");//34
     }
     //随机取24张图片
     function random(arr){
        var newarr=[];//为了不破坏原来的数组
        for(var i=0;i<24;i++){
          newarr.push(arr[parseInt(Math.random()*34)]);
        }
        return newarr;
     }
     // alert(random(onearr));

     //显示图片
     var imgarr=[onearr,twoarr,threearr,fourarr]
     function show(num){
       var newl=random(imgarr[num]);
         for(i=0;i<newl.length;i++){
          var div=document.createElement("div");
          div.style.cssText="width:132px;background:white;height:80px;margin-left:2px;margin-bottom:2px;float:left;position:relative";
          var taoxin=document.createElement("img");
          taoxin.style.cssText="position:absolute;right:5px;top:5px;display:none";
          taoxin.src="./img/top.png";
          div.appendChild(taoxin);
          var img=document.createElement("img");
          img.src=newl[i];
          img.style.cssText="width:90px;height:45px;position:absolute;left:21px;top:18px"
            div.appendChild(img);
            con[num].appendChild(div);
             div.className="imgbox";
             taoxin.className="taoxin";
             var imgbox=$(".imgbox");
             var xin=$(".taoxin");
             for(var k=0;k<imgbox.length;k++){
                  imgbox[k].index=k;
                  imgbox[k].onmouseover=function(){
                  xin[this.index].style.display="block";
             }
                 imgbox[k].onmouseout=function(){
                 xin[this.index].style.display="none";
                }
             }
         }
     }
     show(0)

       var index=0;
     for(var i=0;i<title.length;i++){
            title[i].index=i;
            title[i].flag=true;//开
            title[0].flag=false;
            title[i].onclick=function(){
              index=this.index;
              for(var j=0;j<con.length;j++){
                 con[j].style.zIndex=1;
                 title[j].style.fontWeight="normal";
                 title[this.index].style.fontSize="";
                 title[j].style.textDecoration="none";
                     }
                     title[this.index].style.fontWeight="bold";
                     title[this.index].style.fontSize="14px";
                     title[this.index].style.textDecoration="underline";
                    con[this.index].style.zIndex=2;
                    if(this.flag){
                      show(this.index);
                      this.flag=false;
                    }
              }
     }
     huan.onclick=function(){
        con[index].innerHTML="";
        show(index);
     }
var leftsl=$(".left")[0];
var clientW=document.documentElement.clientWidth;
window.onresize=function(){
  clientW=document.documentElement.clientWidth;
  leftsl.style.left=(clientW/2-1349/2)+30+"px";

}
// 右侧
var right3=$(".right3");
var right1=$(".right1");
for(var i=0;i<right3.length;i++){
  right3[i].index=i;
  right3[i].onmouseover=function(){
    for(var j=0;j<right1.length;j++){
        right1[j].style.display='none';
    }
        right1[this.index].style.display='block';
  }
  right3[i].onmouseout=function(){
    right1[this.index].style.display='none';
  }
}
// 返回顶部
var fhdb=$(".right3 right")[0];
fhdb.onclick=function(){
  var obj=document.documentElement.scrollTop?document.documentElement:document.body;
  animate(obj,{scrollTop:0},200,Tween.Linear)
}
}
