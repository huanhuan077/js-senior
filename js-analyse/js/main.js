var b = {};//base
var slice = [].slice;

b.Class = function (supClass, childAttr) {
    //若是传了第一个类，便继承之；否则实现新类
    if (typeof supClass === 'object') {
        childAttr = supClass;
        supClass = function () { };
    }

    //定义我们创建的类
    var newClass = function () {
        this._propertys_();
        this.init.apply(this, arguments);
    };
    newClass.prototype = new supClass();

    var supInit = newClass.prototype.init || function () { };
    var childInit = childAttr.init || function () { };
    var _supAttr = newClass.prototype._propertys_ || function () { };
    var _childAttr = childAttr._propertys_ || function () { };

    for (var k in childAttr) {
        //_propertys_中作为私有属性
        childAttr.hasOwnProperty(k) && (newClass.prototype[k] = childAttr[k]);
    }

    //继承的属性有可能重写init方法
    if (arguments.length && arguments[0].prototype && arguments[0].prototype.init === supInit) {
        //重写新建类，初始化方法，传入其继承类的init方法
        newClass.prototype.init = function () {
            var scope = this;
            var args = [function () {
                supInit.apply(scope, arguments);
            } ];
            childInit.apply(scope, args.concat(slice.call(arguments)));
        };
    }

    //内部属性赋值
    newClass.prototype._propertys_ = function () {
        _supAttr.call(this);
        _childAttr.call(this);
    };

    //成员属性
    for (var k in supClass) {
        supClass.hasOwnProperty(k) && (newClass[k] = supClass[k]);
    }
    return newClass;
};



// var b = {};
// var slice = [].slice; // ?

// b.Class = function(supClass, childAttr) {
// 	if (typeof supClass === 'object') {
// 		childAttr = supClass;
// 		supClass = function() {};
// 	}

// 	var newClass = function() {
// 		this._propertys_();
// 		this.init.apply(this, arguments);
// 	}

// 	newClass.prototype = new supClass();

// 	var supInit = newClass.prototype.init || function() {};
// 	var childInit = childAttr.init || function() {};
// 	var _supAttr = newClass.prototype._propertys_ || function() {};
// 	var _childAttr = childAttr._propertys_ || function() {};

// 	for (var k in childAttr) {
// 		childAttr.hasOwnProperty(k) && (newClass.prototype[k] = childAttr[k]);

// 	}

// 	if (arguments.length && arguments[0].prototype && arguments[0].prototype.init === supInit) {
// 		newClass.prototype.init = function() {
// 			var scope = this;
// 			var args = [function() {
// 				supInit.apply(scope, arguments);
// 			}];
// 			childInit.apply(scope, args.concat(slice.call(arguments)));
// 		}
// 	}


// 	newClass.prototype._propertys_ = function() {
// 		_supAttr.call(this);
// 		_childAttr.call(this);
// 	}

// 	for (var k in supClass) {
// 		supClass.hasOwnProperty(k) && (newClass[k] = supClass[k]);

// 	}
// 	return newClass;
// }