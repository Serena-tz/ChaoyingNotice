/*! serena - v1.0.0 - 9/19/2020  https://blog.csdn.net/Serena_tz  By Serena */

;
(function (w) {
    /*
     * tab切换页
     * 搜索条输入框的获焦和失焦事件
     * 生成一个十六进制形式表示的随机背景色
     * 获取当前时间
     * 求元素到页面的绝对距离
     * 顶部导航的吸附效果
     * 页面滚动到顶
     * 页面滚动到底
     * 点击小火箭缓慢滚动回页面顶部
     * 轮播图(结构模板)
     * 手风琴
     * 放大镜(结构模板)
     * 公告、热点新闻的切换
     * 生成随机的验证码
     * 弹出层(结构模板)
     * 鼠标移入的提示文字
     */
    w.serena = {};

    /* 
     * tab切换页
     *      调用方法：serena.tab("面板标题的父级的ID","面板父级的ID","触发事件的类型","高亮显示的类")
     *      参    数: 1-4个,参数1必选;若参数2无值,则为单纯的点击切换样式;若参数3无值,则默认触发事件的类型为点击事件;若参数4无值,默认的高亮的类名为"on"
     *      例    如: serena.tab("title","pal","onclick","on")
     */
    serena.tab = function (titleId, palId, event, on) {
        // 获取面板标题的父级
        var title = document.getElementById(titleId);
        // 获取所有面板标题
        var palTitles = title.children;
        // 获取面板父级
        var pal = document.getElementById(palId);
        // 获取所有面板
        var pals = pal.children;
        // 没有设置触发事件的类型时，默认为点击事件
        if (event == undefined) {
            event = "onclick";
        }
        // 没有设置高亮显示的类时，默认类名为"on"
        if (on == undefined) {
            on = "on";
        }
        for (var i = 0; i < palTitles.length; i++) {
            // 给每个面板标题绑定编号
            palTitles[i].index = i;
            // 给每个面板标题绑定响应函数
            palTitles[i][event] = function () {
                // 设置面板标题样式的切换
                for (var j = 0; j < palTitles.length; j++) {
                    // 先清除所有面板标题的样式
                    palTitles[j].className = "";
                }
                // 给当前点击触发事件的面板标题添加样式
                this.className = on;
                // 设置面板的切换
                if (palId != undefined) {
                    for (var x = 0; x < pals.length; x++) {
                        // 先将所有面板隐藏
                        pals[x].style.display = "none";
                    }
                    // 显示当前触发事件的面板标题对应的面板
                    pals[this.index].style.display = "block";
                }
            }
        }
    }
    
    /*
     * 搜索条输入框的获焦和失焦事件
     *      调用方法：serena.searchInput("输入框的id","默认文本的颜色","用户输入的文本的颜色")
     *      参    数: 1-3个,参数1必选;若参数2、3无值,则默认文本颜色为"black",输入框文本颜色为"gray"
     *      例    如: serena.searchInput("textarea","请输入您要搜索的内容","black","gray")
     */
    serena.searchInput = function (Id, defaultColor, inputColor) {
        // 获取搜索条的输入框的Id
        var ipt = document.getElementById(Id);
        // 可以设置搜索框的默认文本
        var defaultText = ipt.value;
        // 没有触发事件时，默认文本的颜色为灰色
        ipt.style.color = defaultColor;
        // 没有设置默认文本颜色时，默认文本颜色为灰色
        if (defaultColor == undefined) {
            defaultColor = "gray";
        }
        // 没有用户输入的文本颜色时，输入框文本颜色为黑色
        if (inputColor == undefined) {
            inputColor = "black";
        }
        // 绑定事件：输入框获得焦点
        ipt.onfocus = function () {
            // 获得焦点时，文本如果为默认文本
            if (this.value == defaultText) {
                // 清空当前默认文本
                ipt.value = "";
                // 用户输入的文本的颜色为黑色
                ipt.style.color = inputColor;
            }
        }
        // 绑定事件：输入框失去焦点
        ipt.onblur = function () {
            // 失去焦点时，如果输入框的文本为空
            if (this.value == "") {
                // 说明用户没有输入文本，恢复默认文本
                ipt.value = defaultText;
                // 默认文本的颜色为灰色
                ipt.style.color = defaultColor;
            }
        }
    }

    /*
     * 生成一个十六进制形式表示的随机背景色
     *      调用方法：serena.randomBgColor()
     *      参    数：无需传参,直接使用返回值
     */
    serena.randomColor = function () {
        // 声明一个类型为对象的变量,存放十六进制的数
        var color = {
            0: "0",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            10: "a",
            11: "b",
            12: "c",
            13: "d",
            14: "e",
            15: "f"
        };
        // 定义一个变量接受颜色的值
        var code = "#";
        // for循环6次
        for (var i = 0; i < 6; i++) {
            // 将每次循环获得的属性值拼接到code里面
            code += color[Math.round(Math.random() * 15)];
        }
        // 返回十六进制颜色code
        return code;
    }

    /*
     * 获取当前时间
     *      调用方法：serena.getTime()
     *      参    数：无需传参,直接使用返回值,格式如：2020-09-22 00:02:14 星期二
     */
    serena.getTime = function () {
        // 创建时间对象
        var time = new Date();
        // 获取当前完整年
        var year = time.getFullYear();
        // 获取当前月
        var month = addZero(time.getMonth() + 1);
        // 获取当前日
        var day = addZero(time.getDate());
        // 获取当前小时
        var hour = addZero(time.getHours());
        // 获取当前分钟
        var min = addZero(time.getMinutes());
        // 获取当前秒钟
        var sec = addZero(time.getSeconds());
        // 获取当前星期
        var week = time.getDay();
        // 存放中文星期的数组
        var weekArr = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
        // 补0函数
        function addZero(num) {
            return num < 10 ? "0" + num : num;
        }
        // 返回当前时间,格式如：2020-09-22 00:02:14 星期二
        return year + '-' + month + '-' + day + '&nbsp;' + hour + ':' + min + ':' + sec + '&nbsp;' + weekArr[week];
    }

    /*
     * 求元素到页面的绝对距离：
     *      调用方法：getPos("需求取绝对距离的元素").left,得到元素距离左侧的绝对距离
     *               getPos("需求取绝对距离的元素").top,得到元素距离上侧的绝对距离
     *      参    数：1个必选,然后直接使用函数的返回值
     */
    getPos = function (ele) {
        // 初始左边距和上边距都为0
        var l = 0;
        var t = 0;
        // 当元素存在定位父级(即ele.offsetParent不为null)时，执行本循环内的代码块
        while (ele.offsetParent) {
            // 初始的边距累加元素的边距和边框宽度
            l += ele.offsetLeft + ele.offsetParent.clientLeft;
            t += ele.offsetTop + ele.offsetParent.clientTop;
            // 将元素替换为元素的定位父级（迭代）
            ele = ele.offsetParent;
        }
        // 等上面的循环体结束后才会输出{}
        return {
            'left': l,
            'top': t
        };
    }

    /*
     * 顶部导航的吸附效果
     *      调用方法：serena.navAttach("顶部导航的ID","导航吸附的类")
     *      参    数：1-2个,参数1必选;若参数2无值,默认的吸附的类请用"attach",参考样式：.attach{position:fixed;top: 0;left: 0;width: 100%;}
     *      例    如: serena.navAttach("nav","attach")
     */
    serena.navAttach = function (nav, attach) {
        // 获取顶部导航
        var nav = document.getElementById(nav);
        // 没有设置顶部导航吸附的类时，默认类名为"attach"
        if (attach == undefined) {
            attach = "attach";
        }
        // 给文档绑定滚动事件
        document.onscroll = function () {
            // top代表的是此时此刻网页被卷去的高度，每次滚动都会切换不同的值
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            // 获取顶部导航到浏览器的垂直高度
            var t = serena.getPos(nav).top + nav.offsetHeight;
            // 如果页面滚动到了相应的高度
            if (top > t) {
                // 让顶部导航吸附
                nav.className = attach;
            } else {
                // 如果滚回去了，解除顶部导航的吸附效果
                nav.className = "";
            }
        }
    }

    /*
     * 页面滚动到顶事件
     *      调用方法：serena.scrollTop("页面滚动到顶的函数")
     *      参    数：可传1个参数,即滚动到顶要执行的函数
     *      例    如: serena.scrollTop(function(){})
     */
    serena.scrollTop = function (toTop) {
        // 给文档绑定滚动事件
        document.onscroll = function () {
            // top代表的是此时此刻网页被卷去的高度，每次滚动都会切换不同的值
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            // h表示网页的总高度（包括隐藏的不可见的部分）
            var h = document.documentElement.scrollHeight;
            // 如果滑到顶部了，就执行到顶的函数
            if (top <= 0) {
                toTop();
            }
        }
    }

    /*
     * 页面滚动到底事件
     *      调用方法：serena.scrollBottom("页面滚动到底的函数")
     *      参    数：可传1个参数,即滚动到底要执行的函数
     *      例    如: serena.scrollBottom(function(){})
     */
    serena.scrollBottom = function (toBottom) {
        // 给文档绑定滚动事件
        document.onscroll = function () {
            // top代表的是此时此刻网页被卷去的高度，每次滚动都会切换不同的值
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            // h表示网页的总高度（包括隐藏的不可见的部分）
            var h = document.documentElement.scrollHeight;
            // 如果到底了(被卷去的高度+浏览器的可视高=内容的总高),则执行到底的函数
            if (top + document.documentElement.clientHeight >= h) {
                toBottom();
            }
        }
    }

    /*
     * 点击小火箭缓慢滚动回页面顶部
     *      调用方法：serena.rocket("小火箭的ID")
     *      参    数：1个
     *      例    如: serena.rocket("rocket")
     */
    serena.rocket = function (rocket) {
        var rocket = document.getElementById(rocket);
        rocket.onclick = function () {
            // top代表的是此时此刻网页被卷去的高度，每次滚动都会切换不同的值
            var top = document.documentElement.scrollTop || document.body.scrollTop;
            // 设置定时器慢慢滚动页面
            var timer = setInterval(function () {
                top -= 5;
                // 改变滚动条的位置
                document.documentElement.scrollTop = top;
                // 回到顶部的时候不再滚动，清除定时器
                if (top <= 0) {
                    clearInterval(timer);
                }
            }, 10);
        }
    }

    /*
     * 轮播图
     *      调用方法：serena.slide("放置图片的大屏幕的ID", "需切换的图片的CSS选择", "左右两个切换按钮的CSS选择器", "图片指示器的CSS选择器")
     *      参    数：传入我也不知道多少参数
     *      例    如: serena.slide("slide", ".picList li", ".btns a", ".dots span")
     */

    serena.slide = function (slide, li, btns, dots) {
        var slide = document.getElementById(slide);
        var li = slide.querySelectorAll(li);
        var btns = slide.querySelectorAll(btns);
        var dots = slide.querySelectorAll(dots);
        var index = 0;
        // 指示器移动函数
        function dotsmove() {
            for (var j = 0; j < dots.length; j++) {
                dots[j].className = "";
                dots[index].className = "on";
            }
        }
        // 给左边的按钮绑定单击事件
        btns[0].onclick = function () {
            for (var j = 0; j < li.length; j++) {
                li[j].style.opacity = 0
            }
            index++
            if (index > li.length - 1) {
                index = 0
            }
            li[index].style.transition = "all 0.5s linear"
            li[index].style.opacity = 1;
            // 让指示器跟着当前图片走
            dotsmove()
        }
        // 给右边的按钮绑定单击事件
        btns[1].onclick = function () {
            for (var j = 0; j < li.length; j++) {
                li[j].style.opacity = 0
            }
            index--
            if (index < 0) {
                index = li.length - 1
            }
            li[index].style.transition = "all 0.5s linear"
            li[index].style.opacity = 1;
            // 让指示器跟着当前图片走
            dotsmove()
        }
        // 给指示器绑定事件
        for (var i = 0; i < dots.length; i++) {
            dots[i].setAttribute("index", i);
            dots[i].onclick = function () {
                index = this.getAttribute("index");
                for (var j = 0; j < li.length; j++) {
                    li[j].style.opacity = 0
                }
                li[index].style.transition = "all 0.5s linear"
                li[index].style.opacity = 1;
                // 让指示器跟着当前图片走
                dotsmove()
            };
        }
        // 通过定时器实现自动轮播
        function automatic() {
            btns[0].onclick();
        }
        var timer = setInterval(automatic, 1000);
        // 鼠标移入到轮播图区域时，暂停播放
        slide.onmouseover = function () {
            clearInterval(timer);
        }
        // 鼠标离开轮播图区域时，恢复播放
        slide.onmouseout = function () {
            timer = setInterval(automatic, 1000);
        }
    }

    /* 
     * 手风琴
     */

    /* 
     * 放大镜
     */

    /* 
     * 公告、热点新闻的切换
     *      调用方法：serena.broadcast("父级容器的ID")
     *      参    数：1个，必选
     *      例    如: serena.broadcast("wrap")
     */
    serena.broadcast = function (wrapId) {
        // 获取新闻列表的父级
        var wrap = document.getElementById(wrapId);
        // 获取新闻列表的每个子元素
        var news = wrap.children;
        // 设置索引
        var index = 0;
        setInterval(function () {
            // 所以自增
            index++;
            // 如果播完最后一条新闻，索引设置为初始值
            if (index >= news.length) {
                index = 0
            }
            for (var i = 0; i < news.length; i++) {
                // 先将所有新闻列表子元素隐藏
                news[i].style.display = "none";
            }
            // 显示某个新闻列表子元素
            news[index].style.display = "block";
        }, 1000)
    }

    /* 
     * 生成随机的验证码
     */
})(window);