function _LazyMan(name) {
    this.tasks = [];
    this.tasks.push(() => {
        console.log(`Hi! This is ${name}!`);
        // array function no need to save this from outside
        this.next();
    });
    setTimeout(() => this.next(), 0);
}

_LazyMan.prototype.next = function() {
    let fn = this.tasks.shift();
    fn && fn();
};

_LazyMan.prototype.sleep = function(time) {
    this.tasks.push(() => {
        setTimeout(() => {
            console.log(`Wake up after ${time} seconds.`);
            this.next();
        }, time * 1000);
    });
    return this;
};

_LazyMan.prototype.sleepFirst = function(time) {
    this.tasks.unshift(() => {
        setTimeout(() => {
            console.log(`Wake up after ${time} seconds.`);
            this.next();
        }, time * 1000);
    });
    return this;
};

_LazyMan.prototype.eat = function(eat) {
    this.tasks.push(() => {
        console.log(`Eat ${eat}.`);
        this.next();
    });
    return this;
};

let LazyMan = (name) => new _LazyMan(name);

// test cases
setTimeout(() => {
    console.log('Case 1:');
    LazyMan('Hank');
}, 0);

setTimeout(() => {
    console.log('Case 2:');
    LazyMan('Hank').sleep(2).eat('dinner');
}, 1000);

setTimeout(() => {
    console.log('Case 3:');
    LazyMan('Hank').eat('dinner').eat('supper');
}, 4000);

setTimeout(() => {
    console.log('Case 4:');
    LazyMan('Hank').sleepFirst(3).eat('supper');
}, 5000);


