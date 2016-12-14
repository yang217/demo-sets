/**
 * Created by leonard on 2016/11/25.
 */


var factoryModel = function () {
    "use strict";
    var hint = "工厂模式： 通过函数 createPerson 来封装具体的细节";
    var createPerson = function (name) {
        var o = {};
        o.name = name;
        o.sayName = function () {
            console.log(o.name);
        };
        return o;
    };

    var run = function () {
        console.log(hint);
        var p1 = createPerson("pjw");
        p1.sayName();
    };
    run();
};

var constructorModel = function () {
    "use strict";
    var hint = "构造器模式：先定义构造函数，然后再调用 new 创建对象\n" +
            "缺点：每创建一个对象，都会在对象中为函数分配空间，然而这些函数不必存在多个备份，会浪费空间";
    var Person = function (name) {
        this.name = name;
        this.sayName = function () {
            console.log(this.name);
        };
    };

    var run = function () {
        console.log(hint);
        var p1 = new Person("pjw");
        p1.sayName();
    };
    run();
};

var prototypeModel = function () {
    "use strict";
    var hint = "原型模式：类似于构造器模式，但是将函数绑定在构造函数的原型上";
    var Person = function (name) {
        this.name = name;
    };
    Person.prototype.sayName = function () {
        console.log(this.name);
    };

    var run = function () {
        console.log(hint);
        var p1 = new Person("pjw");
        p1.sayName();
    };
    run();
};

var dynamicPrototypeModel = function () {
    "use strict";
    var hint = "动态原型模式：类似于原型模式，但是将对象的函数定义也包装在了构造函数中";
    var Person = function (name) {
        this.name = name;
        if (typeof this.sayName !== "function") {
            // 仅会在第一次执行构造函数时运行此段
            Person.prototype.sayName = function () {
                console.log(this.name);
            };
        }
    };

    var run = function () {
        console.log(hint);
        var p1 = new Person("pjw");
        p1.sayName();
    };
    run();
};

var parasiticModel = function () {
    "use strict";
    var hint = "寄生构造函数模式： 与工厂模式实际是 一模一样，除了使用 new 来使用构造函数";
    var createPerson = function (name) {
        var o = {};
        o.name = name;
        o.sayName = function () {
            console.log(o.name);
        };
        return o;
    };

    var run = function () {
        console.log(hint);
        var p1 = new createPerson("pjw");
        p1.sayName();
    };
    run();
};

var durableModel = function () {
    "use strict";
    var hint = "稳妥构造函数模式： 与工程模式类似，但是不定义属性，而是使用私有变量，从而禁止从外部访问这些变量";
    var createPerson = function (p_name) {
        var o = {};
        // 可以在此处定义私有变量
        var name = p_name;
        o.sayName = function () {
            console.log(name);
        };
        return o;
    };

    var run = function () {
        console.log(hint);
        var p1 = createPerson("pjw");
        p1.sayName();
    };
    run();
};

factoryModel();
constructorModel();
prototypeModel();
dynamicPrototypeModel();
parasiticModel();
durableModel();
