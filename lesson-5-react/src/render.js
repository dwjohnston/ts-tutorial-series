"use strict";
exports.__esModule = true;
exports.MyComponent = void 0;
var react_1 = require("react");
var MyComponent = function (_a) {
    var name = _a.name;
    return react_1["default"].createElement("div", null,
        "hello ",
        name);
};
exports.MyComponent = MyComponent;
var OtherComponent = function () {
    return react_1["default"].createElement(exports.MyComponent, { name: "foo" });
};
console.log(react_1["default"].createElement(exports.MyComponent, { name: "foo" }));
console.log(react_1["default"].createElement(OtherComponent, null));
