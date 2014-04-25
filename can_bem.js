define([
  "can/control"
], function(Control) {

  var modifierPrefixDefault = "__";
  var sepDefault = "-";

  /**
   * General functions.
   */
  function bemBlockClass(blockName) {
    return "." + blockName;
  }
  
  // TODO: prevent selecting possible-nested-similar-block BEM elements.
  //       eg. ".block .block .block-element"
  function bemElementClass(blockName, sep, elementName) {
    return bemBlockClass(blockName) + sep + elementName;
  }

  function bemModifierClass(modifierPrefix, modifierName) {
    return modifierPrefix + modifierName;
  }

  /**
   * Functions supposed to augment Control prototype.
   */
  function bemElement(elementName) {
    var constructor = this.constructor;
    return this.find(bemElementClass(constructor.bemBlockName, constructor.bemSep, elementName));
  }

  function bemModifier(modifierName) {
    return bemModifierClass(this.constructor.bemModifierPrefix, modifierName);
  }

  function find() {
    var element = this.element;
    return element.find.apply(element, arguments);
  }

  /**
   * Overload Control.prototype.setup.
   */
  var proto = Control.prototype;
  var superSetup = proto.setup;
  proto.setup = function (options) {
    var bemSep, method, methodName, modifierPrefix, newMethodName;
    var args = arguments;
    var constructor = this.constructor;

    var blockName = constructor.bemBlockName;
    var proto = constructor.prototype;

    if (blockName) {
      // Augment setup arguments with block's element.
      args = [bemBlockClass(blockName), options];

      // Augment constructor with bemSep and bemModifierPrefix.
      constructor.bemSep = bemSep = constructor.bemSep || sepDefault;
      constructor.bemModifierPrefix = modifierPrefix = constructor.bemModifierPrefix || modifierPrefixDefault;

      // Augment instance or its prototype with BEM util attributes/methods.
      proto.bemElement = bemElement;
      proto.bemModifier = bemModifier;
      proto.find = find;

      // Expand "event-methods" variables: bemElement() and bemModifier().
      for (methodName in proto) {
        method = proto[methodName];
        if (constructor._isAction(methodName)) {
          newMethodName = methodName
            .replace(/bemElement\(([^)]+)\)/, function(whole, elementName) {
              return bemElementClass(blockName, bemSep, elementName);
            }).replace(/bemModifier\(([^)]+)\)/, function(whole, modifierName) {
              return bemModifierClass(modifierPrefix, modifierName);
            });

          // If replacements have been made, replace such event-method on prototype and on the list of cached actions.
          if (newMethodName !== methodName) {
            delete proto[methodName];
            proto[newMethodName] = method;
            delete constructor.actions[methodName];
            constructor.actions[newMethodName] = constructor._action(newMethodName);
          }
        }
      }
      window.self = this;
    }

    return superSetup.apply(this, args);

    if (blockName) {
      this.bemBlock = this.element;
    }
  };

});
