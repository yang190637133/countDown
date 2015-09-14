
(function(win){
    var getObj = function(){
        return {
            options : {
                dataFrom : undefined,
                dataTo : undefined,
                timeCount : undefined,
                renderTo : undefined,
                showDays : true,
                showHours: true,
                showMinutes: true,
                _timer : {}
            }
        };
    };

    //把一个两位数字拆成两个个位数。
    var getSplitNum = function(num){
        var s1=0,s2=0;
        if(num > 9){
            s1 = Math.floor(num/10);
            s2 = num % 10;
        }else{
            s2 = num;
        }
        return [s1,s2];
    }

    //构建组装html
    var getGroup = function(timeName){
        var group = document.createElement("div");
        group.className = "group "+timeName;

        var item1 = document.createElement("div");
        item1.className = "container item1";
        var text1 = document.createElement("div");
        text1.className = "text";
        var label1 = document.createElement("div");

        var item2 = document.createElement("div");
        item2.className = "container item2";
        var text2 = document.createElement("div");
        text2.className = "text";

        var label = document.createElement("div");
        label.className = "label";

        item1.appendChild(text1);
        item2.appendChild(text2);
        group.appendChild(item1);
        group.appendChild(item2);
        group.appendChild(label);

        group.son = {
            item1 : item1,
            item2 : item2,
            text1 : text1,
            text2 : text2,
            label : label
        };

        return group;

    }
    var render = function(){
        var opt = this.options;
        var el = opt.renderTo;
        if(!el){
            return false;
        }
        el.className += " fgCountdown ";

        //var dayGroup , hourGroup , minuteGroup;

        if(opt.showDays){
            opt.dayGroup = getGroup("day");
            el.appendChild(opt.dayGroup);
        }
        if(opt.showHours){
            opt.hourGroup = getGroup("hour");
            el.appendChild(opt.hourGroup);
        }
        if(opt.showMinutes){
            opt.minuteGroup = getGroup("minute");
            el.appendChild(opt.minuteGroup);
        }
        if(opt.showSeconds){
            opt.secondGroup = getGroup("second");
            el.appendChild(opt.secondGroup);
        }


    }

    var ti,timeImage;
    ti= timeImage = {
        width :　500,
        height: 1080,
        row : 15,
        cell : 10,
        unitWidth : 0,
        unitHeight : 0
    }


    var getNumberCssStr = function(num){
        if(num===0){
            num=10;
        }

        var p_top  = "0px";
        var p_left = "-"+((10-num)*timeImage['unitWidth'])+"px";
        return p_left +' '+ p_top ;
    }
    var paintTime = function(timeNum,t1,t2){
        var opt = this.options;
        var splitNum = getSplitNum(timeNum);
        s1 = splitNum[0];
        s2 = splitNum[1];

        var bg_position1 = getNumberCssStr(s1);
        var bg_position2 = getNumberCssStr(s2);
        //var t1 = opt.secondGroup.son.text1;
        //var t2 = opt.secondGroup.son.text2;

        t1.style.backgroundPosition = bg_position1;
        t2.style.backgroundPosition = bg_position2;


    }
    var init = function(){
        var opt = this.options,
            dataFrom = opt.dataFrom,
            dataTo = opt.dataTo,
            timeCount = opt.timeCount;

        //计算数字图片里每个单元图片的宽高
        ti.unitWidth = ti.width/ti.cell;
        ti.unitHeight = ti.height/ti.row;


        //算出毫秒时差
        var date3 = dataTo.getTime()-dataFrom.getTime() ;

        //计算出相差天数
        var days=Math.floor(date3/(24*3600*1000));

        //计算出小时数
        var leave1=date3%(24*3600*1000);    //计算天数后剩余的毫秒数
        var hours=Math.floor(leave1/(3600*1000));
        //计算相差分钟数
        var leave2=leave1%(3600*1000);        //计算小时数后剩余的毫秒数
        var minutes=Math.floor(leave2/(60*1000));

        //计算相差秒数
        var leave3=leave2%(60*1000);      //计算分钟数后剩余的毫秒数
        var seconds=Math.round(leave3/1000);

        opt.dates = {
            times : date3,
            days : days,
            hours : hours,
            minutes : minutes,
            seconds : seconds
        };

        console.log(" 相差 "+days+"天 "+hours+"小时 "+minutes+" 分钟"+seconds+" 秒");

        if(opt.showDays){
            paintTime(days,opt.dayGroup.son.text1,opt.dayGroup.son.text2);
        }
        if(opt.showHours){
            paintTime(hours,opt.hourGroup.son.text1,opt.hourGroup.son.text2);
        }
        if(opt.showMinutes){
            paintTime(minutes,opt.minuteGroup.son.text1,opt.minuteGroup.son.text2);
        }
        if(opt.showSeconds){
            paintTime(seconds,opt.secondGroup.son.text1,opt.secondGroup.son.text2);
        }
    };

    ti= timeImage = {
        width :　500,
        height: 960,
        row : 15,
        cell : 10,
        unitWidth : 0,
        unitHeight : 0
    };

    //单张翻页 第二个参数是指逢多少进一位
    var numAnimation = function(obj,p){
        var self = this;
        //var arg = arguments;
        var i = timeImage['row'];
        //var timer;

        p = p?(9-p):0;

        var timer = setInterval(function(){
            var arg = arguments;
            var bp,current_left,current_top;
            bp = obj.style.backgroundPosition;
            current_left = bp.split(' ')[0];
            current_left = current_left.split('p')[0];
            var left = current_left = parseInt(current_left);

            if(left < timeImage['unitWidth']-timeImage['width'] || left===0){
                left = -p*timeImage['unitWidth'];

            }

            current_top = bp.split(' ')[1];
            current_top = current_top.split('p')[0];
            current_top = parseInt(current_top);
            var top = current_top - timeImage['unitHeight'];
            i--;
            //console.log(p);
            if(i<=0){
                top = 0;//-p*timeImage['unitHeight'];
                left = current_left - timeImage['unitWidth'];


                obj.style.backgroundPosition = left+"px "+top+"px";
                clearInterval(timer);
            }else{
                obj.style.backgroundPosition = left+"px "+top+"px";
            }
        },66.66666667);

    };

    var startSeconds = function(){
        var opt = this.options;
        var timer = opt['_timer'];
        var seconds = opt.dates.seconds;
        var splitNum = getSplitNum(seconds);
        var s1 = splitNum[0];
        var s2 = splitNum[1];

        var tm = (s2+1)*1000;

        timer.second_first = setTimeout(function(){
            numAnimation(opt.secondGroup.son.text1,5);
            timer.second_first = setInterval(function(){
                numAnimation(opt.secondGroup.son.text1,5);
            },10e3);
        },tm);
        timer.second_last = setInterval(function(){
            numAnimation(opt.secondGroup.son.text2);
        },1e3);
    };
    var startMinutes = function(){
        var opt = this.options;
        var timer = opt['_timer'];
        var seconds = opt.dates.seconds;
        var minutes = opt.dates.minutes;
        var splitNum = getSplitNum(minutes);
        var s1 = splitNum[0];
        var s2 = splitNum[1];
        //var tm = (s2+1)*60*1000;

        var tm,tm2;
        tm = (s2)*60*1e3+(seconds+1)*1000;
        tm2 = (seconds+1)*1000;


        timer.minute_first = setTimeout(function(){
            numAnimation(opt.minuteGroup.son.text1,5);
            timer.minute_first = setInterval(function(){
                numAnimation(opt.minuteGroup.son.text1,5);
            },60*10*1e3);
        },tm);
        timer.minute_last = setTimeout(function(){
            numAnimation(opt.minuteGroup.son.text2);
            timer.minute_last = setInterval(function(){
                numAnimation(opt.minuteGroup.son.text2);
            },60*1e3);
        },tm2);

    };
    var startHours = function(){
        var opt = this.options;
        var timer = opt['_timer'];
        var seconds = opt.dates.seconds;
        var minutes = opt.dates.minutes;
        var hours = opt.dates.hours;
        var splitNum = getSplitNum(hours);
        var s1 = splitNum[0];
        var s2 = splitNum[1];

        //var tm = (s2+1)*60*60*1000;
        var tm = (s2)*60*60*1e3 + (minutes)*60*1e3 + (seconds+1)*1000;
        var tm2 = (minutes)*60*1e3 + (seconds+1)*1000;

        timer.hour_first = setTimeout(function(){
            numAnimation(opt.hourGroup.son.text1,2);
            timer.hour_first = setInterval(function(){
                numAnimation(opt.hourGroup.son.text1,2);
            },60*60*10*1e3);
        },tm);

        timer.hour_last = setTimeout(function(){
            var p = (s1===0)?3:undefined;
            numAnimation(opt.hourGroup.son.text2,p);
            timer.hour_last = setInterval(function(){
                numAnimation(opt.hourGroup.son.text2);
            },60*60*1e3);
        },tm2);


    };
    var startDays = function(){
        var opt = this.options;
        var timer = opt['_timer'];
        var seconds = opt.dates.seconds;
        var minutes = opt.dates.minutes;
        var hours = opt.dates.hours;
        var days = opt.dates.days;
        var splitNum = getSplitNum(days);
        var s1 = splitNum[0];
        var s2 = splitNum[1];

        //var tm = (s2+1)*24*60*60*1000;

        var tm = (s2)*24*60*60*1e3 + (hours)*60*60*1e3 + (minutes)*60*1e3 + (seconds+1)*1000;
        var tm2 = (hours)*60*60*1e3 + (minutes)*60*1e3 + (seconds+1)*1000;

        timer.day_first = setTimeout(function(){
            numAnimation(opt.dayGroup.son.text1);
            timer.day_first = setInterval(function(){
                numAnimation(opt.dayGroup.son.text1);
            },24*60*60*10*1e3);
        },tm);

        timer.day_last = setTimeout(function(){
            numAnimation(opt.dayGroup.son.text2);
            timer.day_last = setInterval(function(){
                numAnimation(opt.dayGroup.son.text2);
            },24*60*60*1e3);
        },tm2);

    };
    var start = function(){
        startSeconds.call(this);
        startMinutes.call(this);
        startHours.call(this);
        startDays.call(this);
    };

    //启动函数
    var fg = win.fg = {};
    fg.fgcountdown = function(opt){
        var fgcountdown = getObj();
        copy.call(fgcountdown.options,opt);

        copy.call(fgcountdown,{
            start :function(){start.call(this)},
            render: render
        });

        render.call(fgcountdown);
        init.call(fgcountdown);

        return fgcountdown;
    };

    function copy(target,obj){
        if(!obj){
            obj = target ;
            target = this;
        }
        for(var key in obj){
            target[key] = obj[key];
        }
    }


})(window);