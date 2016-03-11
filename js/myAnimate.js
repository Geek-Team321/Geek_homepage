/*

author : Guoweihan
date:2016/3/09

*/

/*

ele : 要执行动画的元素
json : 动画属性，接收对象的格式，如果设置透明度要设置成100单位的。即0.5要设置成50
格式：{
	height: 500,
	opacity: 50
}
speedType : true 缓冲 false 匀速
time : 完成动画的时间，这个有点bug，具体你们自己看着办，就是时间不准
callback : 如果要进行链式运动则传入callback
传值的规则是：最少要传入4个值（ele,json,speedType,time）如果打算进行链式运动则传入callback

*/
function myAnimate(ele, json, speedType, time, callback) {
	var times = time / 10;
	clearInterval(ele.timer);
	ele.timer = setInterval(function() {
		var flag = true; //用于判断运动状态是否全都完成
		//利用for...in进行同时动画
		for (var attr in json) {
			// 1 取值
			if (attr == 'opacity') {
				var preValue = Math.round(parseFloat(getStyle(ele, attr)) * 100);
			} else {
				var preValue = parseInt(getStyle(ele, attr));
			}
			// 2 速度计算
			if (speedType) {
				//缓冲运动
				var speed = (json[attr] - preValue) / 10;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			} else {
				//匀速运动
				if (json[attr] > preValue) {
					var speed = 10;
				} else {
					var speed = -10;
				}
			}
			// 3 检测停止

			if (preValue != json[attr]) {
				flag = false;
			}
			//进行动画操作
			if (attr == 'opacity') {
				ele.style.opacity = (preValue + speed) / 100;
				ele.style.filter = 'alpha(opacity=' + preValue + speed + ')';
			} else {
				ele.style[attr] = preValue + speed + "px";
			}
		}
		//判断动画停止
		if (flag) {
			clearInterval(ele.timer);
			if (callback) {
				callback();
			}
		}
	}, times);
}

/*

获取css样式表的值
ele : 要获取属性的元素
attr : 想要获取的属性

*/

function getStyle(ele, attr) {
	//能力检测
	if (ele.currentStyle) {
		return ele.currentStyle[attr];
	} else {
		return getComputedStyle(ele, false)[attr];
	}
}

/*

加载完后要执行的函数
window.onload的包装函数;
如果有需要使用到window.onload函数的时候，就调用：addLoad(func);

*/

function addLoad(fn) {
	//把函数之前的window.onload赋值给oldOnload
	var oldOnload = window.onload;
	//添加新的window.onload或者覆盖旧的window.onload
	if (typeof window.onload != 'function') {
		window.onload = fn;
	} else {
		window.onload = function() {
			oldOnload();
			fn();
		}
	}
}