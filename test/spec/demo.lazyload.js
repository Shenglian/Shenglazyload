/* jshint esversion: 6 */

const jsdom = require('mocha-jsdom');
const should = require('should');

describe('TEST defaultValue return Boolean', () => {
    
    jsdom();
    
    function _supportsAddEventListener(){
        return !!window.addEventListener;
    }

    function _supportsAttachEvent(){
        return !!window.attachEvent;
    }

    function _supportsClassList(){
        return !!document.body.classList;
    }

    it('_supportsAddEventListener', () => {
        _supportsAddEventListener().should.be.an.Boolean();
    });

    it('_supportsAttachEvent', () => {
        _supportsAttachEvent().should.be.an.Boolean();
    });

    it('_supportsClassList', () => {
        _supportsClassList().should.be.an.Boolean();
    });
});

describe('TEST _q', () => {

    jsdom();

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

    it('_q return Object', () => {
        _q('img').should.be.an.Object();
    });
});

describe('TEST _getDocumentWidth', () => {
    jsdom();

    function _getDocumentWidth() {
        return window.innerWidth || document.body.clientWidth;
    }

    it('_getDocumentWidth return Number', () => {
        _getDocumentWidth().should.be.an.Number();
    });
});

describe('TEST _getDocumentHeight', () => {
    jsdom();

    function _getDocumentHeight() {
        return window.innerHeight || document.body.clientHeight;
    }

    it('_getDocumentHeight return Number', () => {
        _getDocumentHeight().should.be.an.Number();
    });
});

describe('TEST _isElementInViewport', () => {
    jsdom();

    function _isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= _getDocumentHeight() &&
            rect.right <= _getDocumentWidth()
        );
    }

    function _getDocumentWidth() {
        return window.innerWidth || document.body.clientWidth;
    }

    function _getDocumentHeight() {
        return window.innerHeight || document.body.clientHeight;
    }

    it('_isElementInViewport return Bloon', () => {
        var div = document.createElement('div');
        _isElementInViewport(div).should.be.an.Boolean();
    });
});

describe('TEST _isHasAttribute', () => {
    jsdom();

    function _isHasAttribute(image){
        return image.hasAttribute('data-original-src');
    }

    it('image attribute have to check "data-original-src return true"', () => {
        var div = document.createElement('div');
        div.setAttribute('data-original-src', 'value');
        _isHasAttribute(div).should.be.equal(true);
    });

    it('image attribute have to check "data-original-src return false"', () => {
        var div = document.createElement('div');
        _isHasAttribute(div).should.be.equal(false);
    });
});











