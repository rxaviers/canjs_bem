# CanJS ♥ BEM

If you love [CanJS](http://canjs.com/) and [BEM methodologies](http://bem.info/method/)
you may as well enjoy this CanJS plugin.

This (very tiny and simple) plugin extends `can.Control` with BEM util methods,
so you don't need to repeat yourself in your code (yes, avoid boilerplate code),
speedup your development, and reduce maintenance.

It only applies to controllers that have defined a static `bemBlockName`
attribute. It has no effect on controllers that have not. For example:

```javascript
InputDatetime = Control.extend({
  bemBlockName: "input_datetime"
}, {
  ...
});
```

## .init(options)

It's assumed you know what this method is. If you don't, please read [CanJS
documentation](http://canjs.com/docs/can.Control.html#section_Creatingacontrolinstance).

You don't need to pass the element when instantiating BEM controllers. For
example, you can do this:

```javascript
inputDatetime = new InputDatetime({hideTime: true});
```

Element, in this case, defaults to `.input_datetime` (according to defined `bemBlockName`).

## .bemElement(name)

It returns the BEM element(s) of name `name`. For example:

```html
<input class="input_datetime">
  ...
  <div class="input_datetime-time_area">...</div> <!-- NOTE HERE -->
  ...
</input>
```

```javascript
InputDatetime = Control.extend({
  bemBlockName: "input_datetime"
}, {
  init: function(options) {
    if(this.options.hideTime) {
      this.hideTime();
    }
  },
  hideTime: function() {
    this.bemElement("time_area").hide(); // NOTE HERE
  },
  ...
});
```

## bemSep

As you may have noticed, I've been using the name pattern
`block_name-element_name` through the README . But, you can use the pattern you
want. For example, for something like `block-name__element-name`, you can do this:

```javascript
InputDatetime = Control.extend({
  bemSep: "__",
  bemBlockName: "input-datetime"
}, {
  hideTime: function() {
    this.bemElement("time-area").hide();
  },
  ...
});
```
