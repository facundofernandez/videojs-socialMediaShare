import videojs from 'video.js';

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

export default socialmediashare;
