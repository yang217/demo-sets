"use strict";

/**
 * Created by leonard on 2016/11/26.
 */

var SuperClass = function SuperClass() {
  this.property = true;
};

SuperClass.prototype.getSuperValue = function () {
  return this.property;
};

// 原型链继承
// 主要问题:
// 1. 假若父类有一个属性是引用类型，则所有的子类公用该属性
// 2. 没办法在不影响所有子类对象实例的情况下，向父类的构造函数传递参数
// 故实践中很少单独使用原型链继承

var SubClass1 = function SubClass1() {
  this.subproperty = false;
};

SubClass1.prototype = new SuperClass(); // 只能在此处向父类传递参数，会影响所有的子类

SubClass1.prototype.getSubValue = function () {
  return this.subproperty;
};

var child1 = new SubClass1();

// 借用构造函数
// 仅解决了不能向父类的构造函数传递参数的问题，但引入了更多的问题
// 故实践中也很少单独使用

var SubClass2 = function SubClass2() {
  SuperClass.call(this); // 可以在此处向父类构造函数传递参数
  this.subproperty = false;
};

var child2 = new SubClass2();

// 组合继承
// 融化了原型链继承和利用构造函数继承的方式
// 是 JavaScript 中最常用的继承模式
// 不过也存在一个小问题：
// 会调用两次父类构造函数：
// 一次是在创建子类原型的时候,还有一次是在子类构造函数的内部
// 所以父类的属性会存在两个拷贝

var SubClass3 = function SubClass3() {
  SuperClass.call(this); // 第一次调用父类的构造函数
  this.subproperty = false;
};

SubClass3.prototype = new SuperClass(); // 第二次调用父类的构造函数
SubClass3.prototype.constructor = SubClass3; // 修正 constructor 指向
SubClass3.prototype.getSubValue = function () {
  return this.subproperty;
};

var child3 = new SubClass3();
child3.getSubValue();

// 寄生组合继承
// 利用寄生的方式，不仅解决了组合继承的小问题，同时还封装了继承的操作
// 思想：不需要再创建一个父类的原型，只需要创建一个对象，令其指向对象的原型即可
var inherits = function inherits(Parent, Child) {
  var F = function F() {};
  F.prototype = Parent.prototype;
  Child.prototype = new F(); // 创建并指向
  Child.prototype.constructor = Child; // 修正 constructor 指向
};

var SubClass4 = function SubClass4() {
  SuperClass.call(this);
  this.subproperty = false;
};

inherits(SuperClass, SubClass4);

SubClass4.prototype.getSubValue = function () {
  return this.subproperty;
};

var child4 = new SubClass4();
//# sourceMappingURL=inheritObject.js.map