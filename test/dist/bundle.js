(function (QUnit,sinon,videojs) {
'use strict';

QUnit = QUnit && QUnit.hasOwnProperty('default') ? QUnit['default'] : QUnit;
sinon = sinon && sinon.hasOwnProperty('default') ? sinon['default'] : sinon;
videojs = videojs && videojs.hasOwnProperty('default') ? videojs['default'] : videojs;

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var empty = {};


var empty$1 = (Object.freeze || Object)({
	'default': empty
});

var minDoc = ( empty$1 && empty ) || empty$1;

var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal :
    typeof window !== 'undefined' ? window : {};


var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

var document_1 = doccy;

var version = "0.0.0";

// Default options for the plugin.
var defaults = {
    socialMediaDefault: ["facebook", "twitter"],
    hideOnPause: true,
    items: [{
        label: "facebook",
        'class': "vjs-icon-facebook",
        handleClick: function handleClick() {
            console.log('click facebook');
            //window.open('http://www.facebook.com/sharer.php?u=http://www.guiarte.com/');
        }
    }, {
        label: "twitter",
        'class': "vjs-icon-twitter",
        handleClick: function handleClick() {
            console.log('click twitter');
            //window.open('http://www.facebook.com/sharer.php?u=http://www.guiarte.com/');
        }
    }]

};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
var onPlayerReady = function onPlayerReady(player, options) {
    player.addClass('vjs-socialmediashare');
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function socialmediashare
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var socialmediashare = function socialmediashare(options) {
    var _this = this;

    this.ready(function () {
        onPlayerReady(_this, videojs.mergeOptions(defaults, options));

        createSocialElement(_this, videojs.mergeOptions(defaults, options));

        _this.on("play", function (e) {
            console.log("pause");
            this.toggleClass('vjs-button-social-hide');
        });

        _this.on("pause", function (e) {
            console.log("pause");
            this.toggleClass('vjs-button-social-hide');
        });
    });
};

// Register the plugin with video.js.
registerPlugin('socialmediashare', socialmediashare);

// Include the version number.
socialmediashare.VERSION = version;

/** Funciones propias del plugin */

function createSocialElement(player, options) {

    //Creo componente botton
    var Component = videojs.getComponent('Component');
    var menuLinks = new Component(player);
    var CompButton = new Component(player);

    var button = CompButton.createEl('div', {
        className: "vjs-button-social"
    });
    button.addEventListener("click", function (e) {
        var el = document.getElementsByClassName("vjs-menu-social")[0];

        this.classList.toggle("open");
        el.classList.toggle("show");
    });

    var menu = menuLinks.createEl('div', {
        className: "vjs-menu-social"
    });

    for (var _iterator = options.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var elem = _ref;

        if (options.socialMediaDefault.indexOf(elem.label) !== -1 || typeof options.socialMediaDefault === "undefined") {
            var item = new Component(player).createEl('span', {
                className: elem['class']
            });

            item.addEventListener("click", elem.handleClick);

            menu.appendChild(item);
        }
    }

    menuLinks.el_ = menu;

    CompButton.el_ = button;

    player.addChild(menuLinks);
    player.addChild(CompButton);

    return true;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var Player = videojs.getComponent('Player');

QUnit.test('the environment is sane', function (assert) {
  assert.strictEqual(_typeof(Array.isArray), 'function', 'es5 exists');
  assert.strictEqual(typeof sinon === 'undefined' ? 'undefined' : _typeof(sinon), 'object', 'sinon exists');
  assert.strictEqual(typeof videojs === 'undefined' ? 'undefined' : _typeof(videojs), 'function', 'videojs exists');
  assert.strictEqual(typeof socialmediashare === 'undefined' ? 'undefined' : _typeof(socialmediashare), 'function', 'plugin is a function');
});

QUnit.module('videojs-socialmediashare', {
  beforeEach: function beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
    this.clock = sinon.useFakeTimers();

    this.fixture = document_1.getElementById('qunit-fixture');
    this.video = document_1.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },
  afterEach: function afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function (assert) {
  assert.expect(2);

  assert.strictEqual(_typeof(Player.prototype.socialmediashare), 'function', 'videojs-socialmediashare plugin was registered');

  this.player.socialmediashare();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(2);

  assert.ok(this.player.hasClass('vjs-socialmediashare'), 'the plugin adds a class to the player');
});

}(QUnit,sinon,videojs));
