define([
  "can/control"
], function(Control) {

  function block(blockName) {
    return "." + blockName;
  }
  
  // TODO: prevent selecting possible-nested-similar-block BEM elements.
  //       eg. ".block .block .block-element"
  function bemElement(elementName) {
    var constructor = this.constructor;
    return this.find(block(constructor.bemBlockName) + constructor.bemSep + elementName);
  }

  function find() {
    var element = this.element;
    return element.find.apply(element, arguments);
  }

  var proto = Control.prototype;
  var superSetup = proto.setup;
  proto.setup = function (options) {
    var args = arguments;
    var constructor = this.constructor;
    var proto = constructor.prototype;
    var blockName = constructor.bemBlockName;

    if(blockName) {
      args = [block(blockName), options];
      constructor.bemSep = constructor.bemSep || "-";
      this.bemBlock = element;
      proto.bemElement = bemElement;
      proto.find = find;
    }

    return superSetup.apply(this, args);
  };

});
