# countDown
倒计时控件

------------------------------------------------------------------------

            var fc = fg.fgcountdown({
&ensp;                dataFrom : new Date("2015/09/03 00:00:00"),
&ensp;                dataTo : new Date("2015/12/01 00:00:01"),
&ensp;                timeCount : undefined,
&ensp;                renderTo : document.getElementById("con"),
&ensp;                showDays : true,
&ensp;                showHours: true,
&ensp;                showMinutes: true,
&ensp;                showSeconds: true
            });

	    开始执行倒计时
            fc.start();

------------------------------------------------------------------------
属性介绍
------------------------------------------------------------------------

dataFrom:    开始时间<br>
dataTo:      结束时间<br>
renderTo:    用于显示的时间控件的地方<br>
showDays:    显示日期<br>
showHours:   显示小时<br>
showMinutes: 显示分钟<br>
showSeconds: 显示秒<br>