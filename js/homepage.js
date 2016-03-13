/**
 * author:liufang
 * date:2016/3/12
 */


/*
    用于事件绑定的object
 */


var EventUtil = {
    /** 添加事件绑定 */
    addHandler: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },
    /** 解除事件绑定 */
    removeHandler: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.datachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },
    /** 获得event */
    getEvent: function(event) {
        return event ? event : window.event;
    },
    /** 获得 target */
    getTarget: function(event) {
        return event.target || event.srcElement;
    },
    /** 防止事件冒泡 */
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopProgagation();
        } else {
            event.cancel.cancelBubble = true;
        }
    },
    /** 获得relatedTarget  */
    getRelatedTarget: function(event) {
        if (event.relatedTarget) {
            return event.relatedTarget;
        } else if (event.toElement) {
            return event.toElement;
        } else if (event.formElement) {
            return event.formelement;
        } else {
            return null;
        }
    }
}

/**
 * 
 * 本段代码实现左上角按钮hover特效
 * 
 */

EventUtil.addHandler(window, "load", function() {
    var bannerBtn = document.getElementById("hBannerBtn");
/** 获取contains function */
    function contains(parentNode, childNode) {
        if (parentNode.contains) {
            return parentNode != childNode && parentNode.contains(childNode);
        } else {
            /**IE的死对头  火狐适配*/
            return !!(parentNode.compareDocumentPosition(childNode) & 16);
        }
    }
/** 检查hover对象 */
    function checkHover(e, target) {
        if (EventUtil.getEvent(e).type == "mouseover") {
            return !contains(target, EventUtil.getEvent(e).relatedTarget || EventUtil.getEvent(e).fromElement) && !((EventUtil.getEvent(e).relatedTarget || EventUtil.getEvent(e).fromElement) === target);
        } else {
            return !contains(target, EventUtil.getEvent(e).relatedTarget || EventUtil.getEvent(e).toElement) && !((EventUtil.getEvent(e).relatedTarget || EventUtil.getEvent(e).toElement) === target);
        }
    }
/** 获取按钮中白线动画的函数 */
    function animateLeft(args) {
        bannerBtn.childNodes[1].style.marginLeft = -args + "px";
        bannerBtn.childNodes[3].style.marginLeft = args + "px";
        bannerBtn.childNodes[5].style.marginLeft = -args + "px";
    }

    /** 鼠标划过左上角图标动效 */
    EventUtil.addHandler(bannerBtn, "mouseover", function(event) {
        var event = EventUtil.getEvent(event);

        if (checkHover(event, this)) {
/** 用for循环加延时的方法模拟css transition效果 */
            for (var i = 0; i < 3; i++) {
                setTimeout((function(pos) {
                    return function() {
                        animateLeft(pos);
                    }
                })(-i), i * 30);
            }
        }

    });

    /** 鼠标离开左上角图标动效 */
    EventUtil.addHandler(bannerBtn, "mouseout", function(event) {
        var event = EventUtil.getEvent(event);

        if (checkHover(event, this)) {
/** 用for循环加延时的方法模拟css transition效果 */
            for (var i = 2; i >= 0; i--) {
                setTimeout((function(pos) {
                    return function() {
                        animateLeft(pos);
                    }
                })(-i), (3 - i) * 30);
            }
        }
    });
});
