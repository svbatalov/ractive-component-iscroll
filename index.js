var Ractive = require('ractive');
var IScroll = require('iscroll-browserify');
var extend = require('xtend');

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null;

/**
 * @description
 *
 * Scrollable (based on iscroll)
 *
 * Usage:
 * ======
 *
 * 1) Include CSS for .scroll-wrapper and .scroller (see iscroll.css for example)
 *
 * 2) In your template (all attributes are optional):
 *
 *    <Scroll class="myscroll" id="..." opts='{scrollbars: false}'>
 *        ..template..
 *    </Scroll>
 *
 * 3) Define height and/or width for .myscroll or .scroll-wrapper
 * (a class assigned to each <Scroll>)
 *
 * Changing `opts' attribute causes re-creation of iscroll instance.
 */

var defaultOpts = {
  scrollY: true,
  mouseWheel: true,
  scrollbars: true,
  debounceTimeout: 10,
  obs: {
    childList: true,
    subtree: true,
    characterData: true,
  }
};

var template =
"<div class='scroll-wrapper {{class}}' id='{{id}}' intro='updateScroll'>" +
  "    <div class='scroller'>" +
  "        {{yield}}" +
  "    </div>" +
  "</div>";

// Component definition
var Scroll = Ractive.extend({
  template: template,
  transitions: {
    // Use intro transition to determine when
    // wrapped template has finished animations
    // and to get actual DOM node.
    updateScroll: function (t) {
      var self  = this;
      this.node = t.node;
      var userOpts = this.get('opts');
      this.opts = extend(defaultOpts, userOpts);

      setTimeout(function () {
        self.s = new IScroll(t.node, self.opts);
        t.complete();
      }, 0);
    }
  },

  oncomplete: function () {
    var self = this;

    var update = debounce(function () {
      self.s.refresh();
      self.opts.onRefresh && self.opts.onRefresh(self.s);
    }, self.opts.debounceTimeout);

    if(MutationObserver) {
      this.obs = new MutationObserver(update);
      this.obs.observe(this.node, this.opts.obs);
    } else {
      console.warn('Scroll: Your browser does not support MutationObserver.')
    }

    this.on('teardown', function () {
      this.s.destroy();
      this.obs && this.obs.disconnect();
    });

    this.observe('opts', function (n) {
      var opts = extend(scrollOpts, n);

      // Ignore "accidental" updates
      if (JSON.stringify(opts) === JSON.stringify(this.opts))
        return;

      this.opts = opts;

      setTimeout(function () {
        self.s.destroy();
        self.s = new IScroll(self.node, self.opts);
      }, 0);
    });
  }

});

function debounce (fn, delay) {
  var timer = null;
  return function () {
    var context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

Ractive.components.Scroll = Scroll;
