# countDown
倒计时控件

------------------------------------------------------------------------

控件说明 <br>
            var fc = fg.fgcountdown({ <br>
&ensp;                dataFrom : new Date("2015/09/03 00:00:00"),<br>
&ensp;                dataTo : new Date("2015/12/01 00:00:01"),<br>
&ensp;                timeCount : undefined,<br>
&ensp;                renderTo : document.getElementById("con"),<br>
&ensp;                showDays : true,<br>
&ensp;                showHours: true,<br>
&ensp;                showMinutes: true,<br>
&ensp;                showSeconds: true<br>
            });<br>



开始执行倒计时<br>
fc.start();<br>

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