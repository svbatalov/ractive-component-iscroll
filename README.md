# ractive-component-iscroll
[Ractive](http://www.ractivejs.org/) component wrapping [IScroll](http://iscrolljs.com/) library.

# Usage
1. `npm install ractive-component-iscroll`
2. Include CSS for `.scroll-wrapper` and `.scroller` (see iscroll.css for example)
3. Wrap scrollable part of your template into `<Scroll>` tags (all attributes are optional):

    ```html
    <Scroll class="myscroll" id="..." opts='{scrollbars: false}'>
       ..template..
    </Scroll>
    ```
4. Define height and/or width for `.myscroll` or `.scroll-wrapper` (a class assigned to each `<Scroll>`)

5. Require component in your app:
    ```javascript
    require('ractive-component-iscroll');
    ```
    This will add `Scroll` to `Ractive.components`.
    
There is a sample application in `example/` folder, check it out.

# Notes

Changing `opts` attribute re-creates iscroll instance.

If provided, `opts.onRefresh(scroll_instance)` function is called when scroller updates.

IScroll inhibits `click` events and can emit `tap` events instead.

Some iscroll options do not work (e.g. `fadeScrollbars: true`), don't know why yet.

[MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) is used to detect when scroll should be updated.


# License
MIT
