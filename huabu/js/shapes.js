function shape(copy,canvas,cobj){
    this.copy=copy;
    this.canvas=canvas;
    this.cobj=cobj;
    this.bgcolor='#000';
    this.bordercolor='#000';
    this.lineWidth=1;
    this.type='stroke';
    this.leixing='line';
    this.width=canvas.width;
    this.height=canvas.height;
    this.arr=[];
}
shape.prototype= {
      init:function(){
     //初始化
     this.cobj.fillStyle=this.bgcolor;
     this.cobj.strokeStyle=this.bordercolor;
     this.cobj.lineWidth=this.lineWidth;
     },
    line: function (x, y, x1, y1) {
        this.cobj.beginPath();
        this.cobj.moveTo(x, y);
        this.cobj.lineTo(x1, y1);
        this.cobj.stroke();
        this.cobj.closePath();
    },
    rect: function (x, y, x1, y1) {
        this.cobj.beginPath();
        this.cobj.rect(x, y, x1 - x, y1 - y);
        this.cobj[this.type]();
        this.cobj.closePath();
    },
    circle: function (x, y, x1, y1) {
        var r = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        this.cobj.beginPath();
        this.cobj.arc(x, y, r, 0, Math.PI * 2, true)
        this.cobj[this.type]();
        this.cobj.closePath();
    },

    five: function (x, y, x1, y1) {
        var r = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        var r1 = r / 2;
        this.cobj.beginPath();
        this.cobj.moveTo(x + r, y);
        for (var i = 1; i < 10; i++) {
            if (i % 2 == 0) {
                this.cobj.lineTo(x + Math.cos(i * 36 * Math.PI / 180) * r, y + Math.sin(i * 36 * Math.PI / 180) * r);
            } else {
                this.cobj.lineTo(x + Math.cos(i * 36 * Math.PI / 180) * r1, y + Math.sin(i * 36 * Math.PI / 180) * r1);
            }
        }
        this.cobj.closePath();
        this.cobj[this.type]();
    },

    draw: function () {
        var that = this;
        that.copy.onmousedown = function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.copy.onmousemove = function (e) {
                that.cobj.clearRect(0, 0, that.width, that.height);
                if (that.arr.length != 0) {
                    that.cobj.putImageData(that.arr[that.arr.length - 1], 0, 0);
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that.init();
                that[that.leixing](startx, starty, endx, endy);
            }
            that.copy.onmouseup = function () {
                that.arr.push(that.cobj.getImageData(0, 0, that.width, that.height));
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
            }
        }
    },
    pen: function () {
        var that = this;
        that.copy.onmousedown = function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY;

            that.cobj.beginPath();
            that.cobj.moveTo(startx, starty);
            that.copy.onmousemove = function (e) {
                var endx = e.offsetX;
                var endy = e.offsetY;
                that.cobj.lineTo(endx, endy);
                that.cobj.stroke();
            }
            that.copy.onmouseup = function () {
                that.cobj.closePath();
                that.arr.push(that.cobj.getImageData(0, 0, that.width, that.height));
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
            }
        }
    },
    xp: function (xpobj, w, h) {
        var that = this;
        that.copy.onmousemove = function (e) {
            var ox = e.offsetX;
            var oy = e.offsetY;
            xpobj.css({display: "block", width: w, height: h})
            var ox = e.offsetX;
            var oy = e.offsetY;
            var lefts = ox - w / 2;
            var tops = oy - h / 2;
            if (lefts < 0) {
                lefts = 0;
            }
            if (lefts > that.width - w) {
                lefts = that.width - w
            }
            if (tops < 0) {
                tops = 0;
            }
            if (tops > that.height - h) {
                tops = that.height - h
            }
            xpobj.css({
                left: lefts,
                top: tops
            })
        }
        that.copy.onmousedown = function () {
            that.copy.onmousemove = function (e) {
                var ox = e.offsetX;
                var oy = e.offsetY;
                var lefts = ox - w / 2;
                var tops = oy - h / 2;
                if (lefts < 0) {
                    lefts = 0;
                }
                if (lefts > that.width - w) {
                    lefts = that.width - w;
                }
                if (tops < 0) {
                    tops = 0;
                }
                if (tops > that.height - h) {
                    tops = that.height - h;
                }
                xpobj.css({
                    left: lefts,
                    top: tops
                })
                that.cobj.clearRect(lefts, tops, w, h);
            }
            that.copy.onmouseup = function () {
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
            }
        }

    },
    select: function (selectarea) {
        var that = this;
        that.init();
        that.copy.onmousedown = function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY, minx, miny, w, h;
            //var minx,miny,w,h;
            that.init();
            that.copy.onmousemove = function (e) {
                that.init();
                var endx = e.offsetX;
                var endy = e.offsetY;
                minx = startx > endx ? endx : startx;
                miny = starty > endy ? endy : starty;
                w = Math.abs(startx - endx);
                h = Math.abs(starty - endy);
                selectarea.css({
                    display: 'block',
                    left: minx,
                    top: miny,
                    width: w,
                    height: h
                })
            }
            that.copy.onmouseup = function () {
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
                that.temp = that.cobj.getImageData(minx, miny, w, h);
                that.cobj.clearRect(minx, miny, w, h);
                that.arr.push(that.cobj.getImageData(0, 0, that.width, that.height));
                that.cobj.putImageData(that.temp, minx, miny);
                that.drag(minx, miny, w, h, selectarea);

            }
        }
    },
    drag: function (x, y, w, h, selectarea) {
        var that = this;
        that.copy.onmousedown = function (e) {
            var cx = e.clientX;
            var cy = e.clientY;
            var ox =selectarea.position().left;
            var oy =selectarea.position().top;
            that.copy.onmousemove = function (e) {
                that.cobj.clearRect(0, 0, that.width, that.height);
                if (that.arr.length != 0) {
                    that.cobj.putImageData(that.arr[that.arr.length - 1], 0, 0);
                }
                var endx = e.clientX;
                var endy = e.clientY;
                var lefts = endx - cx + ox;
                var tops = endy - cy + oy;
                if (lefts < 0) {
                    lefts = 0;
                }
                if (lefts > that.width - w) {
                    lefts = that.width - w;
                }
                if (tops < 0) {
                    tops = 0;
                }
                if (tops > that.height - h) {
                    tops = that.height - h;
                }
                selectarea.css({
                    left: lefts,
                    top: tops
                })
                x = lefts;
                y = tops;
                that.cobj.putImageData(that.temp, lefts, tops)
            }
            that.copy.onmouseup = function () {
                that.copy.onmousemove = null;
                that.copy.onmouseup = null;
                that.drag(x, y, w, h, selectarea)
            }
        }


    }

}


