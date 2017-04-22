//1.ie8中的classname兼容问题（通过类名获取函数）
 function getClass(classname,father){
		var obj=father||document;//只要有一个为真就为真，
		//如果obj存在，就赋值给声明的obj，如果不存在，document赋值给声明的obj
        if(obj.getElementsByClassName){//为真时表示现代浏览器
        	return (obj.getElementsByClassName(classname));
        }
        else{//为假时表示IE
          var alls=obj.getElementsByTagName("*");
            var arr=[];
        	for(var i=0;i<alls.length;i++){
        		if(checkClass(alls[i].className,classname)){
        			arr.push(alls[i]);
        		}
        	}
        return arr;
        }
	}
 
	function checkClass(str,classname){
		var newarr=str.split(" ");
		for(var i in newarr){
			if(newarr[i]==classname){
				return true;
			}
		}
	}
/***************************************************************/
//2.FF和（IE下浏览器识别文本的兼容问题）获取与置换兼容问题 
//obj 从那个对象来获取纯文本
//val 表示要设置的文本
 function getText(obj,val){
   if(val!=undefined){//获取
 	 if(obj.textContent || (obj.textContent=="")){//为真表示是w3c的浏览器
	    obj.textContent=val;
	 }else{//表示IE
		obj.innerText=val;
	 }
    }else{
 	  if(obj.textContent){//为真表示是w3c的浏览器
	  return obj.textContent;
	  }else{
	  return obj.innerText;
	  }
   }
}
/************************************************************/
//3.获取通用样式的兼容函数
//FF  window.getComputedStyle(obj,null).width
//IE  obj.currentStyle.width
//obj 从那个对象中获取样式
//attr 获取哪个属性
    function getStyle(obj,attr){//形参 var height
	  if(window.getComputedStyle){//FF
		 return window.getComputedStyle(obj,null)[attr];
	  }else{//IE
		 return obj.currentStyle[attr];
	  }
    }
/***********************************************************/
//4.获取类名，id名，标签名的兼容函数
function $(selector,obj){
	obj=obj||document;
	if(typeof selector=="string"){
		//判断selector是否是字符串
		selector=selector.replace(/^\s*|\s*$/g,"")
		//找出字符串前后的空格并用空字符串替换，替换以后结果覆盖原来selector
		if(selector.charAt(0)=="."){
			//找出selector第一个字符，如果是".",则通过类名的方式来获取元素
			return getClass(selector.slice(1),obj);
			//获取元素时应从selector的第二个字符开始
		}else if(selector.charAt(0)=="#"){//Id
			return obj.getElementById(selector.slice(1))
		}else if(/^[a-z|1-10]{1,10}$/g.test(selector)){
			return obj.getElementsByTagName(selector)
		}
	}else if(typeof selector=="function"){
		window.onload=function(){
			selector();
		}
	}
}
/******************************************************************************/
//5.获取对象的子节点
//a:只获取元素节点 b:获取元素+文本节点
function getChilds(father,type){
	var type=type||"a";
	// type没有赋值时，默认为"a"(第二个参数省略是，默认值获取元素节点)
    var childs=father.childNodes;//找到所有儿子
    var arr=[];//声明一个容器
    for(var i=0;i<childs.length;i++){
    	if(type=="a"){//获得元素节点
    		if(childs[i].nodeType==1){
    			//节点类型为1表示元素节点
            arr.push(childs[i]);//保存在数组中
    	  }
    	}else if(type=="b"){//获得元素+文本节点
    		if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s*|\s*$/g,"")!="")){
    			//节点类型为1或者(为文本节点，并且文本节点中的不为空)
                arr.push(childs[i]);  
    		}
    	}
    	
    }
    return arr;
}
/**************************************************************/
//6.获取第一个子节点
function getFirst(father){
    return getChilds(father)[0];
}
/**************************************************************/
//7.获取最后一个子节点
function getLast(father){
	return getChilds(father)[getChilds(father).length-1];
}
/**************************************************************/
//8.获取指定一个子节点
function getRandom(father,val){
	return (getChilds(father))[val];
}
/**************************************************************/
//9.获取下一个兄弟节点
function getDown(obj){
     var down=obj.nextSibling;
     while(down.nodeType==3||down.nodeType==8){
     	down=down.nextSibling;
     	if(down==null){
     		return false;
     	}
     } 
     return down;            
}
/***************************************************************/
//10获取上一个兄弟节点
function getUp(obj){
	var up=obj.previousSibling;
	if(up==null){
		return false;
	}
	while(up.nodeType==3||down.nodeType==8){
		up=up.previousSibling;
		if(up==null){
			return false;
		}
	}
	return up;
}
/***************************************************************/
//11.要插入到某个对象之后
//newobj:要追加的对象
//obj：在哪个对象之前
//对象共有的方法一般是加在原型上的。而原型只能给构造函数添加，所以共有的方法是添加到对象的构造函数的原型上
//this:指的是最终调用这个方法的对象。而这个对象是通过构造函数new出来的对象
Object.prototype.insertAfter=function(newobj,obj){
	var down=getDown(obj);//获取obj的下一个兄弟节点
	if(down){//如果这个兄弟节点存在
		this.insertBefore(newobj,down);//就把newobj插入到这个兄弟节点的前面（也就是obj对象的后面）
	}else{//如果这个兄弟节点不存在，表示obj就是最后一个节点了
		this.appendChild(newobj);//直接追加到父容器的后面
	}
}
/**************************************************************************/
//漂浮窗口
function floatwindow(box,close,sheepX,sheepY,time){
	     box.style.position="fixed";
        // var box=$(".box")[0];
		 var t=setInterval(move,30);
		 var sheepX=sheepX||5;//速度X
		 var sheepY=sheepY||5;//速度Y
		 var swidth=box.offsetWidth;
		 var sheight=box.offsetHeight;
		
		 	var cheight=document.documentElement.clientHeight;//浏览器的高
		    var cwidth=document.documentElement.clientWidth;//浏览器的宽
		 window.onresize=function(){
		 	cheight=document.documentElement.clientHeight;//浏览器的高
		    cwidth=document.documentElement.clientWidth;//浏览器的宽
		 }
		 
		 // var close=$(".close")[0];
         function move(){
             var selfleft=box.offsetLeft;//自身左边距
             var selftop=box.offsetTop;//自身右边距
             var newleft=selfleft+sheepX;//加速之后的左边距
             var newtop=selftop+sheepY;//加速之后的上边距
             if(newtop>=(cheight-sheight)){//下
             	newtop=cheight-sheight;
            	sheepY*=-1;
            }
            if(newleft>=(cwidth-swidth)){
             	newleft=cwidth-swidth;
            	sheepX*=-1;
            }
            if(newtop<=0){
            	newtop=0;
            	sheepY*=-1;
            }
            if(newleft<=0){
            	newleft=0;
            	sheepX*=-1;
            }
             box.style.left=newleft+"px";//自身的宽度
             box.style.top=newtop+"px";//自身的高度
            
        }
        box.onmouseover=function(){
        	clearInterval(t);
        }
        box.onmouseout=function(){
        	t=setInterval(move,30);
        }
        close.onclick=function(){
        	box.style.display="none";
        }
    }
/**************************************************************/
//12.同一事件添加多个处理程序的兼容函数
function addEvent(obj,event,fun){
	if(obj.addEventListener){
		return obj.addEventListener(event,fun,false);
	}else{
		return obj.attachEvent("on"+event,fun);
	}
}
//同一事件添加多个处理程序的兼容函数
function removeEvent(obj,event,fun){
	if(obj.removeEventListener){
		return obj.removeEventListener(event,fun,false);
	}else{
		return obj.detachEvent("on"+event,fun);
	}
}
/*****************************************************************/
//13.添加滚轮事件的兼容问题
//obj:要执行滚轮事件的对象
//upfun:往上滚动的处理程序
//downfun:往下滚动的处理程序
      function mouseWheel(obj,upfun,downfun){
	  	//添加滚轮事件的兼容问题
	  	if(obj.attachEvent){ obj.attachEvent("onmousewheel",scrollFn);  
	  	//IE、 opera 
		}else if(obj.addEventListener){ obj.addEventListener("mousewheel",scrollFn,false);  
		//chrome,safari    -webkitdocument.
		obj.addEventListener("DOMMouseScroll",scrollFn,false);  
		//firefox     -moz
	   } 
	    function scrollFn(e){
	  	var ev=e||window.event;
	  	if(ev.detail==-3 || ev.wheelDelta==120){//FF中向上为-3，向下为3；IE中向上为120，向下为-120
            if(upfun){
            	upfun();
            }
	  	}
	  	if(ev.detail==3 || ev.wheelDelta==-120){
	  		if(downfun){
	  			downfun();
	  		}
	  	}
	  	if (ev.preventDefault ) ev.preventDefault(); //阻止默认浏览器动作(W3C) 
        else ev.returnValue = false;//IE中阻止函数器默认动作的 方式
	  } 
	}
/********************************************************/	
hover
//14.判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }
/********************************/
function getObj(){
	return obj=document.documentElement.scrollTop?document.documentElement:document.body;
}
/***********************************************************/
//16.阻止事件流的兼容函数
function stopEvent(obj){
    if(obj.stopPropagation){
       obj.stopPropagation();
       }else{
       obj.cancelBubble=true;
       }
}
//17.阻止浏览器的默认行为的兼容函数
function stopClient(obj){
    if (obj.preventDefault) {
        obj.preventDefault(); 
    }
    //阻止默认浏览器动作(W3C) 
    else {
        obj.returnValue = false;
    }
    //IE中阻止函数器默认动作的 方式
}