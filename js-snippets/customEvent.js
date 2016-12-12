/**
 * Created by leonard on 2016/12/11.
 */
var EventTarget = function () {
    this.handlers = {};
};

EventTarget.prototype = {
    constructor: EventTarget,
    addHandler: function (type, handler) {
        if (typeof this.handlers[type] === 'undefined') {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);
    },
    removeHandler: function (type, handler) {
        if (typeof this.handlers[type] === 'undefined') return;
        var handlers = this.handlers[type];
        var i;
        for (i = 0; i < handler.length; i++) {
            if (handlers[i] === handler) {
                break;
            }
        }
        handlers.splice(i, 1);
    },
    fire: function (event) {
        if (!event.target) {
            event.target = this;
        }
        if (typeof this.handlers[event.type] === 'undefined') return;
        var handlers = this.handlers[event.type];
        for (var i = 0; i < handlers.length; i++) {
            handlers[i](event);
        }
    }
};

function handleMessage(event) {
    console.log("Message received: " + event.message);
}

// 创建一个新对象
var target = new EventTarget();

// 添加一个事件处理程序
target.addHandler('message', handleMessage);

// 触发事件
target.fire({type: 'message', message: 'Hello World!'});

// 移除事件处理程序
target.removeHandler('message', handleMessage);

// 再次尝试触发事件处理程序，失败
target.fire({type: 'message', message: 'Hello World, again!'});
