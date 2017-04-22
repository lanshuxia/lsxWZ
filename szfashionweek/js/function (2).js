/*
	检测 变量中存储的数据类型
	isType(o,type)
	type=[Array,Object,String,Number,Boolean,Function,Null,undefined]
	返回值：true   false
*/
function isType(o,type){
	if(Object.prototype.toString.call(o)=='[object '+type+']'){
		return true;
	}
	return false;
}
function isArray(o){
	return isType(o,'Array');
}
function isObject(o){
	return isType(o,'Object');
}

/*
	获取具有定位属性的父元素 相对于body 的left  top值
	offset(obj).left 相对于body left
	offset(obj).top  相对于body top
*/
function offset(obj){
	var parent=obj.parentNode;
	var arr=[];
	var x=0;
	var y=0;
	while(parent.nodeName!=='BODY'){
		var attr=getStyle(parent,'position');
		if(attr=='absolute'||attr=='relative'||attr=='fixed'){
			arr.push(parent);
		}
		parent=parent.parentNode;
	}
	for(var i=0;i<arr.length;i++){
		var left=arr[i].offsetLeft;
		var blw=parseInt(getStyle(arr[i],'borderLeftWidth'));
		x+=left+blw;
		var top=arr[i].offsetTop;
		var btw=parseInt(getStyle(arr[i],'borderTopWidth'));
		y+=top+btw;
	}
	return {left:x,top:y};
}



/*
	获取行内样式或样式表指定属性值
*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}


/*
	返回值：永远都是一个数组
	$('.box',$('div'))

    $('div')     获取所有div   s
    $('#box')    获取idbox 

    $('#box div') 
	$('.box .inner')  获取.box .inner                      s
	$('.box div')  
	            s
	$('<div>')   创建div      

	window.onload=function(){
	    aa()
	}
	==>$(function(){})
	function $(aa){
	
	}
*/
function $(selector,context){
	//1.通过选择器 获取元素
	if(typeof selector=='string'){
		selector=trim(selector);

		//正则匹配 '<div>' 返回创建元素
		if(/^<[a-zA-Z][a-zA-Z1-6]{0,10}>$/g.test(selector)){
			//<div>
			return document.createElement(selector.slice(1,-1))
		}


		/*
		正则处理
		$(.box .inner div) =>
			".box .inner div"=>
			[.box,.inner,div]
		*/
		var reg=/(?:#|\.)?[a-zA-Z][a-zA-Z0-9\-_]*/g;
		var arr=selector.match(reg);
		
		//$函数 第二个参数 
		if(context){
			//第二个参数 处理成数组
			context=context.length?context:[context];
		}

		//获取元素的范围 默认 [document]
		var elems=context||[document];

		//根据选择器个数 循环获取元素
		for(var i=0,lens=arr.length;i<lens;i++){
			/*
				[.box,.inner,div]
				1. elems=[docment]
				2. elems=[.box,.box]
				3. elems=[.inner]
			*/
			elems=getElms(arr[i],elems) ;
		}

		//返回最终elems保存的元素集合
		//返回值 数组
		return elems;


	//2.添加页面加载事件
	}else if(typeof selector=='function'){
		//可给 window.onload 绑定多个处理程序
		on(window,'load',selector);
	}
}
/*
	getElms 获取元素 
	getElms(sel,context)
	context  获取指定范围
	sel 选择器  div  |  .box  | #box
*/
function getElms(sel,context){
	var sel=trim(sel);
	var els=[];//存放获取到元素的数组
	if(sel.charAt(0)=='#'){
		//id  返回一个数组 
		return [document.getElementById(sel.substr(1))];
		//els=[#box];
	}else if(sel.charAt(0)=='.'){
		//class  返回一个数组

		//循环获取所有 context中指定元素 
		for(var i=0;i<context.length;i++){
			var aa=getClass(sel.substr(1),context[i]);
			//循环获取到元素结合 存入到els数组中
			for(var j=0;j<aa.length;j++){
				els.push(aa[j]);
			}

		}
		//els=[.box,.box,.box,....]
		
	}else if(/^[a-zA-Z][1-6a-zA-Z]{0,10}/g.test(sel)){
		//tagName  返回一个数组
		
		//循环获取所有 context中指定元素 
		for(var i=0;i<context.length;i++){
			//.box div
			var aa=context[i].getElementsByTagName(sel);
			//循环获取到元素结合 存入到els数组中
			for(var j=0;j<aa.length;j++){
				els.push(aa[j]);
			}
		}
		//els=[div,div,div,....]
	}
	
	//返回存放所有获取元素的集合
	return els;
}



function getClass(classname,obj){
	if(document.getElementsByClassName){
		//[box,box]
		return obj.getElementsByClassName(classname);
	}else{
		var newarr=[];
		var all=obj.getElementsByTagName('*');
		var reg=new RegExp('(\\s'+classname+'\\s)|(^'+classname+'\\s)|(\\s'+classname+'$)','g');
		for(var i=0,lens=all.length;i<lens;i++){	
			if(all[i].className.search(reg)!=-1){
				newarr.push(all[i]);
			}
		}
		return newarr;
	}
}
/*
	去除字符串的空格
	trim(str[,m])
	m参数：
	lr   左右   默认
	l    左
	r    右
	a    所有
*/
function trim(str,m){
	var m=m||'lr';
	if(m=='lr'){
		return str.replace(/^\s*|\s*$/g,'');
	}else if(m=='l'){
		return str.replace(/^\s*/g, '')
	}else if(m=='r'){
		return str.replace(/\s*$/g, '')
	}else if(m=='a'){
		return str.replace(/\s/g, '');
	}
}
/*
	给元素绑定事件
	window.onload=function(){}
	box.onclick=function(){
	}
*/
function on(obj,event,callback){
	if(window.addEventListener){
		//click
		obj.addEventListener(event, callback,false);
	}else{
		//onclick
		obj.attachEvent('on'+event,callback)
	}
}
/*
	事件源+事件+事件处理程序
	off(box,'click',bb)
	删除对象某个事件的处理程序 
	callback 必须是一个函数名
*/
function off(obj,event,callback){
	if(window.removeEventListener){
		obj.removeEventListener(event,callback);
	}else{
		obj.detachEvent('on'+event,callback);
	}
}

/*
	给对象的某个事件添加一个一次性的处理程序
*/
function one(obj,event,callback){
	var add=function(){
		callback();
		off(obj,event,add);
	}
	on(obj,event,add);
}

function getDiff(time){
	     var now=new Date();
		 var diff=(time.getTime()-now.getTime());
		 var diff=diff/1000;//算出秒
		 // 一天等于24*60*60秒
		 var days=parseInt(diff/(24*60*60));
		 var diff=diff%(24*60*60);
		 // 一小时等于60*60秒
		 var hours=parseInt(diff/(60*60));
		 var diff=diff%(60*60);
	     var minutes=parseInt(diff/60);
	     var seconds=parseInt(diff%60);
         return {day:days,hour:hours,minute:minutes,second:seconds}
}