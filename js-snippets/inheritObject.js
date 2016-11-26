/**
 * Created by leonard on 2016/11/26.
 */

var SuperType = function () {
    this.property = true;
};

SuperType.prototype.getSuperValue = function () {
    return this.property;
};

// 原型链继承
// 主要问题:
// 1. 假若父类有一个属性是引用类型，则所有的子类公用该属性
// 2. 没办法在不影响所有子类对象示例的情况下，向父类的构造函数传递参数
// 故实践中很少单独使用原型链继承

var SubType1 = function () {
    this.subproperty = false;
};

SubType1.prototype = new SuperType();

SubType1.prototype.getSubValue = function () {
    return this.subproperty;
};

var child1 = new SubType1();

// 借用构造函数
// 仅解决了不能向父类的构造函数传递参数的问题，但引入了更多的问题
// 故实践中也很少单独使用

var SubType2 = function () {
    SuperType.call(this); // 可以在此处向父类构造函数传递参数
    this.subproperty = false;
};

var child2 = new SubType2();

// 组合继承
// 融化了原型链继承和利用构造函数继承的方式
// 是 JavaScript 中最常用的继承模式
// 不过也存在一个问题：
// 无论什么情况下，都会调用两次父类构造函数：
// 一次是在创建子类原型的时候,
// 还有一次是在子类构造函数的内部

var SubType3 = function () {
    SuperType.call(this);
    this.subproperty = false;
};

SubType3.prototype = new SuperType();

SubType3.prototype.getSubValue = function () {
    return this.subproperty;
};

var child3 = new SubType3();
child3.getSubValue();

// 寄生组合继承
// 利用寄生的方式，不仅解决了组合继承的小问题，同时还封装了继承的操作
var inherits = function (Parent, Child) {
    var F = function () {};
    F.prototype = Parent.prototype;
    Child.prototype = new F(); // 创建并指向
    Child.prototype.constructor = Child; // 增强
};

var SubType4 = function () {
    SuperType.call(this);
    this.subproperty = false;
};

inherits(SuperType, SubType4);

SubType4.prototype.getSubValue = function () {
    return this.subproperty;
};

var child4 = new SubType4();
