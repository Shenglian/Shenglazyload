/* jshint esversion: 6 */
var images = _q('img');
var _supportsAddEventListener = !!window.addEventListener;
var _supportsAttachEvent = !!window.attachEvent;
var _supportsClassList = !!document.body.classList;

function _q(q, res){
    if (document.querySelectorAll) {
    	return document.querySelectorAll(q);
    } else {
    	var d = document, 
    		a = d.styleSheets[0] || d.createStyleSheet();
      	a.addRule(q,'f:b');
      	for(var l = d.all, b=0, c=[], f=l.length; b<f; b++) {
      		l[b].currentStyle.f && c.push(l[b]);
      	}
        
      	a.removeRule(0);
      	res = c;
    }
    return res;
}

function _addEventListener(element, eventName, callback) {
	// Use addEventListener if available
	if (_supportsAddEventListener) {
		element.addEventListener(eventName, callback);
		return;
	}
	// Otherwise use attachEvent, set this and event
	if (_supportsAttachEvent) {
		element.attachEvent('on' + eventName, (function (el) {
			return function () {
				callback.call(el, window.event);
			};
		}(element)));
		// Break closure and primary circular reference to element
		element = null;
	}
}

function _removeEventListener(element, eventName, callback) {
	// Use removeEventListener if available
	if (_supportsAddEventListener) {
		element.removeEventListener(eventName, callback);
		return;
	}
	// Otherwise use detachEvent
	if (_supportsAttachEvent) {
		element.detachEvent('on' + eventName, callback);
	}
}

function _getDocumentWidth() {
	return window.innerWidth || document.body.clientWidth;
}

function _getDocumentHeight() {
	return window.innerHeight || document.body.clientHeight;
}

function _throttle(fn, delay, atleast) {
    var timer = null;
    var previous = null;

    return function () {
        var now = +new Date();

        if (!previous) previous = now;
        if (atleast && now - previous > atleast) {
            fn();
            previous = now;
            clearTimeout(timer);
        } else {
            clearTimeout(timer);
            timer = setTimeout(function() {
                fn();
                previous = null;
            }, delay);
        }
    };
}

function _isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= _getDocumentHeight() &&
        rect.right <= _getDocumentWidth()
    );
}

function _isHasAttribute(image){
	return image.hasAttribute('data-original-src');
}

function _imageEvent(image){
	if (_isHasAttribute(image)) {
		image.setAttribute('src', image.getAttribute('data-original-src'));
		image.removeAttribute('data-original-src');
		image.onload = function(data) {
			_imageOnload();
		};	
	}
}

function _imageOnload(){
	console.log('_imageOnload');
}

function _loadImage(){
	for (var i = 0; i < images.length; i++) {
	    if (_isElementInViewport(images[i])) {
	    	_imageEvent(images[i]);
	    }
	}
}

_addEventListener(window, 'scroll', _throttle(_loadImage, 50, 100));
