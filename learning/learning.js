var myparent = require('./parent.js');
var util = require('util');

class Test extends myparent {
    constructor(name) {
        super(name);
        this.name = name;
    }
}

// util.inherits(Test,myparent.myparentfunction());

var hello = new Test("test");

hello.sayHello("vincent");

