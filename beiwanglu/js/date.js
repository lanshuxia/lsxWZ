$(function(){
    //输入框的动画
    //按钮
    var add=$(".add");
    //输入框
    var form=$("form");
    //输入框关闭的按钮
    var formClose=$(".formclose");
    var flag=true;

    //拖拽
    $(document).on("mousedown",function(e){
        var obj= e.target;
        var ox= e.offsetX;
        var oy= e.offsetY;
        $(document).on("mousemove",function(e){
            var cx= e.pageX;
            var cy= e.pageY;
            $(obj).trigger("drag",{left:cx-ox,top:cy-oy})
        })
        $(document).on("mouseup",function(e){
            $(document).off("mousemove");
            $(document).off("mouseup");
        })
    })


    add.click(function(){

        if(flag) {
            form.attr({"data-a":"animate-down"}).css("display","block");
            flag=false;
        }else{
            form.attr({"data-a":"animate-up"})
            flag=true;
        }
    })
    formClose.click(function(){
        form.attr({"data-a":"animate-up"})
        flag=true;
    })


    /*表单的验证*/

    $(".submitbtn").click(function(e){
        var textv=form.find(":text").val();
        var conv=form.find("textarea").val();
        var timev=form.find("#time").val();
        if(textv==""){
            alert("标题不能为空");
            return;
        }
        if(conv==""){
            alert("内容不能为空");
            return;
        }
        if(timev==""){
            alert("时间必选");
            return;
        }
        //存储信息
        var oldv=localStorage.message==null?[]:JSON.parse(localStorage.message);

        var obj={title:textv,con:conv,time:timev,id:new Date().getTime};
        oldv.push(obj);
        var str=JSON.stringify(oldv);
        localStorage.message=str;
        form.find(":text").val("");
        form.find("textarea").val("");
        form.find("#time").val("");

        //显示信息

        var copy=$(".con:first").clone().appendTo("body").css({
            left:($(window).width()-$(".con").outerWidth())*Math.random(),
            top:($(window).height()-$(".con").outerHeight())*Math.random(),
            display:"block"
        }).attr({"data-a":"animate-sd","id":obj.id});
        copy.find(".title").html(textv);
        copy.find(".cona").html(conv);
        copy.find(".time").html(timev);

    })

    //页面加载显示已存储的数据
    var messages=localStorage.message==null?[]:JSON.parse(localStorage.message);
    for(var i=0;i<messages.length;i++){
        copy=$(".con:first").clone().appendTo("body").fadeIn(100).css({
            left:($(window).width()-$('.con').outerWidth())*Math.random(),
            top:($(window).height()-$('.con').outerHeight())*Math.random()
        }).attr('id',messages[i].id);
        copy.find(".title").html(messages[i].title);
        copy.find(".cona").html(messages[i].con);
        copy.find(".time").html(messages[i].time);
    }
    //拖拽
    $(document).delegate(".con","drag",function(e,data){
        $(this).css({
            left:data.left,
            top:data.top
        })
    })
    $(document).delegate(".con","click",function(e){
        $(".con").css("zIndex",0);
        $(this).css("zIndex",1);
        e.preventDefault();
    })

    //删除


    $(document).delegate(".close","click",function(){
        var id=$(this).parent().attr("id");
        var arr=JSON.parse(localStorage.message);
        for(var i=0;i<arr.length;i++){
            if(arr[i].id=id){
                arr.splice(i,1);
                localStorage.message=JSON.stringify(arr);
                break;
            }
        }
        $(this).parent().remove();
    })

})