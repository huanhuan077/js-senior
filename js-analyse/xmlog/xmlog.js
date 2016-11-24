(function(win, doc) {

	var _oldLogObj = win[win._xmObjName || 'xmLog'];

	// 避免重复加在
	if (_oldLogObj && _oldLogObj.defined) {
		return;
	}

	var xmListeners = {},
		trackers = {},
		temData = {},
		_reqCount = 0;

	//  ==== 存储相关 ====
	var storage = {
		sessionStorage: {
			set: function(key, val) {
				if (window.sessionStorage) {
					try {
						window.sessionStorage.setItem(key, val) ;
					} catch (e) {

					}
				}
			},
			get: function(key) {
				return window.sessionStorage ? window.sessionStorage.getItem(key) : null;
			},
			remove: function(key) {
				window.sessionStorage && window.sessionStorage.removeItem(key);
			}
		},
		localStorage: {
			set: function(key, val) {
				if (window.localStorage) {
					try {
						window.localStorage.setItem(key, val)
					} catch (e) {

					}
				}
			},
			get: function(key) {
				return window.localStorage ? window.localStorage.getItem(key) : null;
			},
			remove: function(key) {
				window.localStorage && window.localStorage.removeItem(key)
			}
		},
		cookie: {
			set: function(name, val, option) {
				var d,
					domain = option && option.domain,
					path = option && option.path || '/' ;

				if(/ximalaya\.com$/.test(window.location.hostname)){
					domain = '.ximalaya.com';
				}
				if(option && option.expires){
					d = new Date();
					d.setTime(d.getTime() + option.expires * 1000);
				}

				document.cookie = name + "=" + val + (domain ? "; domain=" + domain : "") + (path ? "; path=" + path : "") + (d ? "; expires=" + d.toGMTString() : "") + (option && option.secure ? "; secure" : "");

				return document.cookie;
			},
			get: function(name) {
				return (name = RegExp("(^| )" + name + "=([^;]*)(;|$)").exec(document.cookie)) ? name[2] : null;
			}
		},
		getData: function(key, storeType) {
			try {
				if (typeof storeType === 'string') {
					return this[storeType].get(key);
				}
				return this.cookie.get(key) || this.localStorage.get(key) || this.sessionStorage.get(key)
			} catch (e) {

			}
		},
		setData: function(key, val, opt) {
			try {
				var storeType = (typeof opt == 'string' && opt) || arguments[3];

				if (storeType) {
					this[storeType].set(key, val, opt);
					return;
				}
				var d = this.cookie.set(key, val, opt);
				d ? this.localStorage.set(key, val) : this.sessionStorage.set(key, val);

			} catch (f) {}

		},
		clear: function(key, storeType) {
			try {
				if (storeType) {
					if (storeType == 'cookie') {
						this.cookie.set(key, '', {
							expires: -1
						});
					} else {
						this[storeType].remove(key);
					}
					return;
				}
				this.cookie.set(key, "", {
					expires: -1
				});
				this.sessionStorage.remove(key);
				this.localStorage.remove(key);
			} catch (e) {

			}
		}
	};



	//  ==== 工具函数 ====

	function generateUUID() {
		return 'xm_'+(+new Date())+'_'+(+new Date()).toString(36) + Math.random().toString(36).substr(2, 6);
	}

	function getTimestamp() {
		return +new Date();
	}

	function trim(str) {
		return str.replace(/(^\s*)|(\s*$)/g, "");
	}

	function merge(a, b,mergeAll) {
		var result = {};
		for (var p in a) {
			if (a.hasOwnProperty(p)) {
				result[p] = a[p];
			}
		}
		for (var q in b) {
			if (b.hasOwnProperty(q)) {
				if(q[0] != '_' || mergeAll){
					result[q] = b[q];
				}
			}
		}
		return result;
	}

	function _isOBJByType(o, type) {
		return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]";
	};

	function _isEmpty(obj) {
		if (obj === null) {
			return true;
		}
		if (_isOBJByType(obj, "Number")) {
			return false;
		}
		return !obj;
	};

	function isDev(){

		var host = window.location.hostname;
		if(/test\.ximalaya\.com$/.test(host)){
			return true;
		}

		if(/^\d{0,4}\.\d{0,4}\.\d{0,4}\.\d{0,4}$/.test(host)){
			return true;
		}
		return false;
	}

	// 获取指定的url参数
	function isUrlPar(k, searchStr) {
		var u = searchStr || window.location.search;
		var reg = new RegExp("(^|&)" + k + "=([^&]*)(&|$)", "i");
		var r = u.substr(1).match(reg);

		if (r != null) {
			return decodeURI(r[2])
		};
		return "";
	}


	function _parseReferrer() {
		var engReg = /(baidu|so|sogou|google|bing|sm)/,
			keyReg = /(?:^|&)(wd|q|query|keyword|word)=([^&]*)(?:&|$)/,
			refInfo = {
				refr_source:'other',
				refr_medium:'',
				refr_term:'',
				refr_from:'',
				referer_url:''
			},
			refferrer = document.referrer,
			a, search, hostname,isFromSE,hostArr,keyArray;

		a = document.createElement('a');
		a.href = refferrer;

		if(refferrer){
			refInfo.referer_url = a.href;
			hostname = a.hostname;
			search = a.search.slice(1);

			isFromSE = engReg.test(hostname);
			hostArr = hostname.match(engReg);

			// 如果来自搜索引擎
			if (isFromSE) {
				refInfo.refr_source = 'search';
				refInfo.refr_medium	= hostArr[1];
				// 如果 referrer 有查询参数
				if (search) {
					// 如果匹配到keyReg关键词的key，则设置utm_term
					if (keyArray = search.match(keyReg)) {
						refInfo.refr_term = decodeURIComponent(keyArray[2]);
					}
					// 拿到from参数
					if (keyArray = search.match(/(?:^|&)(from)=([^&]*)(?:&|$)/)) {
						refInfo.refr_from = decodeURIComponent(keyArray[2]);
					}
				}
			}
		}

		var env = xmLog.env,
			os = env.os;

		if(os == 'android' || os === 'ios'){
			switch(env.browser){
				case 'iting':
					refInfo.refr_source = 'internal';
					refInfo.refr_medium = 'iting';
					break;

				case 'weixin':
					refInfo.refr_source = 'social';
					refInfo.refr_medium = 'weixin';
					break;

				case 'qq':
					refInfo.refr_source = 'social';
					refInfo.refr_medium = 'qq';
					break;

				case 'sinaBlog':
					refInfo.refr_source = 'social';
					refInfo.refr_medium = 'sinaBlog';
					break;

				case 'qqBlog':
					refInfo.refr_source = 'social';
					refInfo.refr_medium = 'qqBlog';
					break;
			}
		}

		return refInfo;
	}

	// 默认从当前url去解析
	function _populateFromUrl(model,url){
		var searchStr,a;
		if(url){
			a = document.createElement('a');
			a.href = url;
			searchStr = a.search;
		}
		for(var p in model){
            model[p] = decodeURIComponent(isUrlPar(p,searchStr));
        }
        // from 参数格式特殊
        model['utm_from'] = decodeURIComponent(isUrlPar('from',searchStr));
	}

	function _collectUtmInfo() {
		var referrer = document.referrer,
			utm_source = trim(isUrlPar("utm_source")),
			obj = {
				'utm_source': '',
				'utm_medium': '',
				'utm_campaign': '',
				'utm_content': '',
				'utm_term': '',
				'utm_from':''
			},val;

		// 有referrer 且非喜马拉雅
		// var referrer = "http://baidu.com/xmlog/doc/?utm_source=souce&utm_medium=pc&utm_campaign=xx&utm_term=dx&utm_content=121"
		// http://192.168.20.33:8090/xmlog/doc/?utm_source=souce&utm_medium=pc&utm_campaign=xx&utm_term=dx&utm_content=121
		if (referrer) {
			_populateFromUrl(obj,referrer);
		}

		// url含有utm_source查询参数
		if (utm_source != '') {
			_populateFromUrl(obj);
		}

		if(obj.utm_source){
			for (var key in obj) {
				if (val = obj[key] || "", obj.hasOwnProperty(key)) {
					storage.cookie.set(key, encodeURIComponent(val || ''));
				}
			}
		}

		storage.cookie.set('x_xmly_traffic', encodeURIComponent(_getUtmInfo()));
	}

	// 获取营销数据
	function _getUtmInfo(){
		var arr = [
		    'utm_source',
		    'utm_medium',
		    'utm_campaign',
		    'utm_content',
		    'utm_term',
		    'utm_from'
		],item;

		for (var i in arr) {
			item = arr[i];
			val = decodeURIComponent(storage.cookie.get(item) || '');
			if (i == 0 && val == null) {
				return '';
			}
			arr[i] = item + ':' + (val == null ? '' : val);
		}

		if(arr[0]){
			return arr.join('&');
		}
		return '';
	}

	// 获取sessionID
	function getUUID() {
		var uuid = storage.cookie.get('_xmLog');
		if (!uuid) {
			uuid = generateUUID();
			storage.cookie.set('_xmLog', uuid, {
				expires: 1000 * 24 * 3600
			});
			// storage.setData('_newUser', uuid, 'sessionStorage');
		}
		return uuid;
	}

	function getArgs(fnArgs, offset) {
		var start = offset || 0;
		return Array.prototype.slice.call(fnArgs, start);
	}

	function getAttr(element, name) {
		try{
			return element.getAttribute(name)
		}catch(e){
			return '';
		}
	}

	function getUrl(url){
		return (url || location.href).replace(/[\?#].*$/,'');
	}

	// === 获取页面性能指数 ===
	function getPerformanceTiming() {
		var performance = window.performance;

		if (!performance) {
			console.log('你的浏览器不支持 performance 接口');
			return;
		}
		var t = performance.timing;
		var times = {};
		//页面加载完成的时间
		times.loadPage = t.loadEventEnd - t.navigationStart;
		//【解析 DOM 树结构的时间
		times.domReady = t.domComplete - t.responseEnd;
		//重定向的时间
		times.redirect = t.redirectEnd - t.redirectStart;
		//DNS 查询时间
		times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
		//读取页面第一个字节的时间
		times.ttfb = t.responseStart - t.navigationStart;
		//内容加载完成的时间
		times.request = t.responseEnd - t.requestStart;
		//执行 onload 回调函数的时间
		times.loadEvent = t.loadEventEnd - t.loadEventStart;
		// DNS 缓存时间
		times.appcache = t.domainLookupStart - t.fetchStart;
		// 卸载页面的时间
		times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
		// TCP 建立连接完成握手的时间
		times.connect = t.connectEnd - t.connectStart;

		return times;
	}

	// === 事件处理 ===
	function on(element, eventName, cb) {
		if (!element) {
			return;
		}

		if (typeof element === 'string') {
			cb = eventName;
			eventName = element;
			element = xmLog;
		}

		try {
			if (element === xmLog) {
				xmListeners[eventName] = xmListeners[eventName] || [];
				xmListeners[eventName].unshift(cb);
				return;
			}
			if (element.addEventListener) {
				element.addEventListener(eventName, cb, false);
			} else if (element.attachEvent) {
				element.attachEvent('on' + eventName, cb);
			}
		} catch (e) {}
	}

	function off(element, eventName, cb) {
		if (!element) {
			return;
		}

		if (typeof element === 'string') {
			cb = eventName;
			eventName = element;
			element = xmLog;
		}

		try {
			if (element === xmLog) {
				var listener = xmListeners[eventName];
				if (!listener) {
					return;
				}
				var i = listener.length;
				while (i--) {
					if (listener[i] === cb) {
						listener.splice(i, 1);
					}
				}
				return;
			}
			if (element.removeEventListener) {
				element.removeEventListener(eventName, cb, false);
			} else {
				element.detachEvent && element.detachEvent('on' + eventName, cb);
			}
		} catch (e) {}
	}

	function _trigger(eventName) {
		var listener = xmListeners[eventName];
		if (!listener) {
			return;
		}
		var args = getArgs(arguments, 1);

		var result = 0;
		var j = listener.length;
		while (j--) {
			if (listener[j].apply(this, args)) {
				result++;
			}
		}
		return result;
	}


	// === 环境信息 ===
	function getEnvInfo() {
		var nav = navigator,
			ua = nav.userAgent,
			scr = win.screen;

		var info = {
			os: '',
			browser: '',
			ua: ua,
			resolution: (scr.width || 0) + "x" + (scr.height || 0),
			trackType:("ontouchstart" in window ? 'H5': 'web')
		};

		var detect = function(pattern) {
			return function() {
				return (pattern).test(ua);
			};
		}

		var UA = {
			isAndroid: detect(/android/i),
			isIOS: detect(/(ipad|iphone|ipod)/i),
			isWindows: detect(/window/i),
			isMac: detect(/mac os x/i),

			isChrome: detect(/webkit\W.*(chrome|chromium)\W/i),
			isFirefox: detect(/mozilla.*\Wfirefox\W/i),
			isGecko: detect(/mozilla(?!.*webkit).*\Wgecko\W/i),
			is360se: detect(/360/i),
			isIE: function() {
				if (navigator.appName === "Microsoft Internet Explorer") {
					return true;
				} else if (detect(/\bTrident\b/)()) {
					return true;
				} else {
					return false;
				}
			},
			isOpera: detect(/opera.*\Wpresto\W|OPR/i),
			isSafari: detect(/webkit\W(?!.*chrome).*safari\W/i),

			isMobile: detect(/(iphone|ipod|((?:android)?.*?mobile)|blackberry|nokia)/i),
			isWebKit: detect(/webkit\W/i),

			isIting: detect(/iting/i),
			isWeixin: detect(/micromessenger/i),
			isSinaWeibo: detect(/weibo/i),
			isQQ: detect(/qq/i),
			isQQWeibo: detect(/tencentmicroblog/i)
		};

		if (UA.isMobile()) {
			info.device = 'mobile';


			if (UA.isAndroid()) {
				info.os = 'android';
			}

			if (UA.isIOS()) {
				info.os = 'Ios';
			}

			if (UA.isIting()) {
				info.browser = 'iting';
			}

			if (UA.isWeixin()) {
				info.browser = 'weixin';
			}

			if (UA.isSinaWeibo()) {
				info.browser = 'sinaBlog';
			}

			if (UA.isQQ()) {
				info.browser = 'qq';
			}

			if (UA.isQQWeibo()) {
				info.browser = 'qqBlog';
			}

		} else {
			info.device = 'pc';

			if (UA.isWindows()) {
				info.os = 'windows';
			}

			if (UA.isMac()) {
				info.os = 'mac';
			}

			if (UA.isChrome()) {
				info.browser = 'chrome';
			}

			if (UA.isFirefox()) {
				info.browser = 'firefox';
			}

			if (UA.isIE()) {
				info.browser = 'ie';
			}

			if (UA.isOpera()) {
				info.browser = 'opera';
			}

			if (UA.isSafari()) {
				info.browser = 'safari';
			}

			if (UA.is360se()) {
				info.browser = '360';
			}
		}
		return info;
	}


	function _post(url,data,cb){
		var xmlHttp;

	    if(window.ActiveXObject){
	        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
	    }else{
	        xmlHttp = new XMLHttpRequest();
	    }
	    xmlHttp.onreadystatechange = function (){
	    	if(xmlHttp.readyState == 2) {
	        	_reqCount--;
	    	}
	        if(xmlHttp.readyState == 4) {
	            if(xmlHttp.status == 200) {
	            	cb && cb(responseText);
	            }
	        }
	    };

	    xmlHttp.onerror = function(e){
	    	console.log(e);
	    }

	    xmlHttp.open("POST", url);
	    xmlHttp.withCredentials = true;
	    xmlHttp.setRequestHeader('Content-Type','application/json');

	    xmlHttp.send(JSON.stringify(data));
	    _reqCount++;

	}

	// 上报
	function _report(url, data,asyn) {
		if (!url || !data) {
			return;
		}

		if(asyn){
			_post(url,data);
			return;
		}
		var image = doc.createElement('img');
		var items = [];
		for (var key in data) {
			if (data[key]) {
				items.push(key + '=' + encodeURIComponent(data[key]));
			}
		}

		var name = 'img_' + (+new Date());
		xmLog[name] = image;
		image.onload = image.onerror = function() {
			xmLog[name] =
				image =
				image.onload =
				image.onerror = null;
			delete xmLog[name];
		};

		image.src = url + (url.indexOf('?') < 0 ? '?' : '&') + items.join('&');
	}


	function execKeyMapping(map, data) {
		if (!map) {
			return data;
		}
		var result = {};
		for (var key in data) {
			if (map[key] !== null) {
				result[map[key] || key] = data[key];
			}
		}
		return result;
	}


	// === 异常处理相关 ===
	var orgError = win.onerror;
	// level: 4, // 错误级别 1-debug 2-info 4-error

	win.onerror = function(msg, url, line, col, error) {
		var newMsg = msg;

		if (error && error.stack) {
			newMsg = _processStackMsg(error);
		}

		if (_isOBJByType(newMsg, "Event")) {
			newMsg += newMsg.type ?
				("--" + newMsg.type + "--" + (newMsg.target ?
					(newMsg.target.tagName + "::" + newMsg.target.src) : "")) : "";
		}

		// 上报 xmJs
		// report.push({
		//     msg: newMsg,
		//     target: url,
		//     rowNum: line,
		//     colNum: col
		// });

		orgError && orgError.apply(win, arguments);
	};


	function _processStackMsg(error) {
		var stack = error.stack
			.replace(/\n/gi, "")
			.split(/\bat\b/)
			.slice(0, 9)
			.join("@")
			.replace(/\?[^:]+/gi, "");

		var msg = error.toString();
		if (stack.indexOf(msg) < 0) {
			stack = msg + "@" + stack;
		}
		return stack;
	};

	function _processError(errObj) {
		try {
			if (errObj.stack) {
				var url = errObj.stack.match("https?://[^\n]+");
				url = url ? url[0] : "";
				var rowCols = url.match(":(\\d+):(\\d+)");
				if (!rowCols) {
					rowCols = [0, 0, 0];
				}

				var stack = _processStackMsg(errObj);
				return {
					msg: stack,
					rowNum: rowCols[1],
					colNum: rowCols[2],
					target: url.replace(rowCols[0], "")
				};
			} else {
				//ie 独有 error 对象信息，try-catch 捕获到错误信息传过来，造成没有msg
				if (errObj.name && errObj.message && errObj.description) {
					return {
						msg: JSON.stringify(errObj)
					};
				}
				return errObj;
			}
		} catch (err) {
			return errObj;
		}
	};

	function _error_tostring(error) {
		var param = [];
		var stringify = [];

		if (_isOBJByType(error)) {
			error.level = error.level || 4;
			for (var key in error) {
				var value = error[key];
				if (!_isEmpty(value)) {
					if (_isOBJByType(value)) {
						try {
							value = JSON.stringify(value);
						} catch (e) {
							value = "[XMLOG:stringify error] " + e.toString();
						}
					}
					stringify.push(key + ":" + value);
					param.push(key + "=" + encodeURIComponent(value));
				}
			}
		}
		// msg[0]=msg&target[0]=target -- combo report
		// msg:msg,target:target -- ignore
		// msg=msg&target=target -- report with out combo
		return [stringify.join(","), param.join("&")];
	};



	function Tracker(name) {
		this.name = name;
		this.props = {
			_parameterMapping: null,
			_url: xmLog.url
		};
		this.argsList = [];
		this._xmLog = xmLog;
	}

	Tracker.prototype.create = function(props) {
		if (this.created) {
			return;
		}

		if (typeof props === 'object') {
			this.set(props);
		}
		this.created = new Date();
		this.trigger('create', this);
		var args;
		while (args = this.argsList.shift()) {
			doCmd.apply(this, args);
		}
	};

	Tracker.prototype._assembleData = function(data) {
		var res = {
			events :[]
		};
		res.events.push({
			props:data,
			ts:getTimestamp()
		});
		return res;
	}

	// xmLog('pv.send','pageview',{"tx":'xe'});
	Tracker.prototype.send = function(hitType,extraData) {
		var self = this,
			props = this.props,
			data = merge({
				uuid: self._xmLog.sid
			}, props);

		if (typeof extraData === 'object') {
			if(hitType == 'event'){
				// 事件中 如果没有srcPage，则使用当前页的item
				extraData.srcPage = props.item ;
				extraData.srcPageId = props.itemId ;

				// 记录点击位置坐标
				temData.module = extraData.srcModule || '';
				temData.postion = extraData.srcPosition || '';

			}
			data = merge(data, extraData);
		}

		var args = arguments;

		// 公共数据
		data = merge(data,collectData());

		switch (hitType) {

			case 'pageview':
				data = merge(_getTracert(),data);
				data.appName = 'event';
				data.serviceId = 'pageview';

				// 需要记录手机环境
				break;

			case 'event':
				data.appName = 'event';

				break;

			case 'exception':
				// 页面异常处理
				break;

			case 'timing':

				// 传递页面性能数据
				console.log(getPerformanceTiming());
				return
				break;

			default:
				return;
		}

		data = self._assembleData(data)

		if(self.trigger('send', data) !== false){
			_report(self._xmLog.url, execKeyMapping(self.props.parameterMapping, data),true);

		}
	};


	Tracker.prototype.set = function(name, value) {
		if (typeof name === 'string') {
			this.props[name] = value;
			if(name == 'item'){
				temData.page = value;
			}
			if(name == 'itemId'){
				temData.pageId = value;
			}
		} else if (typeof name === 'object') {
			for (var p in name) {
				if (name.hasOwnProperty(p)) {
					this.set(p, name[p]);
				}
			}
		}
	};

	Tracker.prototype.get = function(name, cb) {
		var val = this.props[name];
		if (typeof cb === 'function') {
			cb(val);
		}
		return val;
	};


	Tracker.prototype.trigger = function(eventName) {
		var args = getArgs(arguments);
		args[0] = this.name + '.' + eventName;
		return _trigger.apply(this, args);
	};

	Tracker.prototype.on = function(eventName, cb) {
		xmLog.on(this.name + '.' + eventName, cb);
	};


	function getTracker(trackerName) {
		trackerName = trackerName || 'default';
		if (trackerName === '*') {
			var result = [];
			for (var p in trackers) {
				if (trackers.hasOwnProperty(p)) {
					result.push(trackers[p]);
				}
			}
			return result;
		}
		return (trackers[trackerName] =
			trackers[trackerName] || new Tracker(trackerName));
	}

	function doCmd(method) {
		if (this.created || /^(on|off|set|get|create)$/.test(method)) {
			var fn = Tracker.prototype[method];
			var params = getArgs(arguments, 1);

			if (typeof fn === 'function') {
				fn.apply(this, params);
			}
		} else {
			this.argsList.push(arguments);
		}
	}

	// xmLog('pv.send','pageview',{"tx":'xe'})
	// xmLog('send','pageview',{"tx":'xe'})

	function xmLog() {
		var args = getArgs(arguments);
		String(args[0]).replace(/^(?:([\w$_]+)\.)?(\w+)$/,
			function(all, trackerName, method) {
				args[0] = method;
				doCmd.apply(xmLog.getTracker(trackerName), args);
			}
		);
	}


	function _getTracert(){
		var ss = storage.sessionStorage;
		info = {
			srcPage:ss.get('srcPage') || '',
			srcPageId:ss.get('srcPageId')  || '',
			srcModule:ss.get('srcModule')  || '',
			srcPosition:ss.get('srcPosition')  || ''
		};
		return info;
	}

	// 搜集环境数据
	function collectData(){
		var info = xmLog.env,
			browser = {
				br_userAgent:info.ua,
				br_type:info.browser,
				br_viewSize:info.resolution,
				page_url:location.href,
				page_title:document.title,
				os:info.os,
				trackType:info.trackType
			};

		// refferrer
		var referrer = merge(_parseReferrer(),browser);

		// 营销数据
		var traffic = merge({x_xmly_traffic:_getUtmInfo()},referrer);

		return traffic;
	}

	xmLog.name = 'xmLog';
	xmLog.sid = getUUID();
	xmLog.defined = true;
	xmLog.timestamp = getTimestamp();
	xmLog.off = off;
	xmLog.on = on;
	xmLog.trigger = _trigger;
	xmLog.getTracker = getTracker;
	xmLog.url = 'http://xdcs-collector.'+ (isDev() ? 'test.':'') +'ximalaya.com/api/v1/statistics';
	xmLog.env = getEnvInfo();

	xmLog.on(document, 'click', function(ev) {
		var ev = ev || window.event;　　　　
		var target = ev.target || ev.srcElement;

		while (target && getAttr(target, 'data-spy') != 'xm') {
		 	target = target.parentNode;
		}
		if (getAttr(target, 'data-spy') == 'xm') {
			temData.module = getAttr(target, 'data-mod') || '' ;
			temData.postion = getAttr(target, 'data-pos') || '' ;
		}
	});

	storage.cookie.set('trackType', xmLog.env.trackType,{'path':'/'});

	// 获取广告相关数据
	_collectUtmInfo();

	if (_oldLogObj) {
		var items = _oldLogObj.q || [];

		_oldLogObj.q = null;

		for (var p in xmLog) {
			if (xmLog.hasOwnProperty(p)) {
				_oldLogObj[p] = xmLog[p];
			}
		}
		// 接管之前的定义
		_oldLogObj.q = {
			push: function(args) {
				xmLog.apply(xmLog, args);
			}
		};

		// 开始处理缓存命令
		for (var i = 0; i < items.length; i++) {
			xmLog.apply(xmLog, items[i]);
		}
	}

	win[win._xmObjName || 'xmLog'] = xmLog;

	function unloadHandler(e) {
		var sleepCount = 0,
			ss = storage.sessionStorage;

		if(temData.page){
			ss.set('srcPage',temData.page || '');
			ss.set('srcPageId',temData.pageId || '');
			ss.set('srcModule',temData.module || '');
			ss.set('srcPosition',temData.postion || '');
		}
		for (var p in trackers) {
			if (trackers.hasOwnProperty(p)) {
				var tracker = trackers[p];
				if (tracker.created) {
					sleepCount += tracker.trigger('unload');
				}
			}
		}

		if (sleepCount || _reqCount > 0) {
			var isSleep = new Date();
			while ((new Date() - isSleep) < 200) {
				// 延时100ms
			}
		}
	}

	// on(win, 'beforeunload', unloadHandler);
	on(win, 'unload', unloadHandler);



})(window, document);
