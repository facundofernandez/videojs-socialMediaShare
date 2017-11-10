# videojs-socialmediashare

Adds social sharing buttons to the video widget

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->
## Installation

```sh
npm install --save videojs-socialmediashare
```

## Usage

To include videojs-socialmediashare on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-socialmediashare.min.js"></script>
<script>
  var player = videojs('my-video');

  player.socialmediashare();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-socialmediashare via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-socialmediashare');

var player = videojs('my-video');

player.socialmediashare();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-socialmediashare'], function(videojs) {
  var player = videojs('my-video');

  player.socialmediashare();
});
```

## License

MIT. Copyright (c) facundo fernandez


[videojs]: http://videojs.com/
