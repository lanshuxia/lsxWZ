$(function(){
    var canvas=$('canvas');
    var copy=$('.copy');
    var cobj=canvas[0].getContext('2d');
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })
    $('.top .parent').hover(function(){
        $(this).find('.son').finish();
        $(this).find('.son').slideDown(300);
    },function(){
        $(this).find('.son').finish();
        $(this).find('.son').slideUp(300);
    })

    var  obj1=new shape(copy[0],canvas[0],cobj);
    $('.leixing li').click(function(){
        if($(this).attr("data-role")!='pen'){
            obj1.leixing=$(this).attr("data-role");
            obj1.draw();
        }else{
            obj1.leixing='pen';
            obj1.pen();
        }
    })

    $('.type li').click(function(){
        obj1.type=$(this).attr('data-role');
    })

    $('.lineWidth li').click(function(){
        obj1.lineWidth=$(this).attr('data-role');
    })

    $('.bgcolor input').change(function(){
        obj1.bgcolor=$(this).val();
    })
    $('.bordercolor input').change(function(){
        obj1.bordercolor=$(this).val();
    })
    //橡皮擦
    $('.xpsize li').click(function(){
        var w=$(this).attr('data-role');
        var h=$(this).attr('data-role');
        $('.xp').css({
            width:w,
            height:h
        })
        obj1.xp($('.xp'),w,h)
    })
    //文件
    $('.file li').click(function(){
        var index=$(this).index('.file li');
        //新建
        if(index==0){
            if(obj1.arr!=0){
                var yes=window.confirm('是否保存');
                if(yes){
                    location.href=(canvas[0].toDataURL().replace('data:image/png',"data:stream/octet"));
                }
            }
            obj1.arr=[];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height)
        }else if(index==1){
            location.href=(canvas[0].toDataURL().replace('data:image/png',"data:stream/octet"))
        }else if(index==2){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj1.arr==0){
                alert('无法返回');
                reutrn;
            }else{
                var data=obj1.arr.pop();
                cobj.putImageData(data,0,0)
            }
        }
    })

//    选择框
    $('.select').click(function(){
         obj1.select($('.selectarea'))
    })

})

