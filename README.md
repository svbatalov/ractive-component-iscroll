# ractive-component-iscroll
[Ractive](http://www.ractivejs.org/) component wrapping [IScroll](http://iscrolljs.com/) library.

# Usage

1. Include CSS for `.scroll-wrapper` and `.scroller` (see iscroll.css for example)
2. Wrap scrollable part of your template into `<Scroll>` tags (all attributes are optional):

```html
   <Scroll class="myscroll" id="..." opts='{scrollbars: false}'>
       ..template..
   </Scroll>
```

3. Define height and/or width for `.myscroll` or `.scroll-wrapper` (a class assigned to each `<Scroll>`)

4. Require component in your app:
```js
require('ractive-component-iscroll');
```
This will add `Scroll` to `Ractive.components`.

# Notes

Changing `opts` attribute re-creates iscroll instance.

If provided, `opts.onRefresh` function is called when scroller updates.

To figure out when scroller should be updated some Ractive mutation methods
(currently these are `set`, `shift`, `unshift`, `push`, `pop`)
are patched to emit custom events (of the same name).
Changing data using other methods will *not* update scroller.
Currently doing `app.get('list').push(data)` also does not work.
Please let me know if you know how to fix this.
See my [question](http://stackoverflow.com/questions/28559626/how-do-i-know-when-components-dom-is-updated-and-finished-transitions-in-ractiv)
on stackoverflow for more info.

IScroll inhibits `click` events and can emit `tap` events.

Some iscroll options do not work (e.g. `fadeScrollbars: true`), don't know why yet.

# License
MIT
