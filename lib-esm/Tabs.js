var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from "react";
import "./styles.css";
var cloneChildren = function (children, newPropsCallback) {
    return React.Children.map(children, function (child, i) {
        return React.isValidElement(child)
            ? React.cloneElement(child, __assign(__assign({}, child.props), newPropsCallback(i)))
            : child;
    });
};
export var Tabs = function (_a) {
    var _b = _a.defaultIndex, defaultIndex = _b === void 0 ? 0 : _b, props = __rest(_a, ["defaultIndex"]);
    React.useEffect(function () {
        removeHiddenAttribute("#tabpanel-" + defaultIndex);
    }, [defaultIndex]);
    var removeHiddenAttribute = function (selector) { var _a; return (_a = document.querySelector(selector)) === null || _a === void 0 ? void 0 : _a.removeAttribute("hidden"); };
    return (React.createElement("div", __assign({ role: "tabs", className: "react-js-tabs" }, props), cloneChildren(props.children, function (index) { return ({
        id: index,
        selected: index === defaultIndex,
        onClick: function (e) {
            var currentTab = e.target;
            var tabListNode = currentTab.parentNode;
            tabListNode === null || tabListNode === void 0 ? void 0 : tabListNode.querySelectorAll('[aria-selected="true"]').forEach(function (tab) { return tab.setAttribute("aria-selected", "false"); });
            currentTab.setAttribute("aria-selected", "true");
            document
                .querySelectorAll('[role="tabpanel"]')
                .forEach(function (panel) { return panel.setAttribute("hidden", "true"); });
            removeHiddenAttribute("#" + currentTab.getAttribute("aria-controls"));
        },
    }); })));
};
export var Tab = React.forwardRef(function (props, ref) { return (React.createElement("button", __assign({}, props, { ref: ref, role: "tab", "aria-selected": props.selected, "aria-controls": "tabpanel-" + props.id, className: "react-js-tab" }), props.children)); });
export var TabPanel = function (_a) {
    var index = _a.index, props = __rest(_a, ["index"]);
    return (React.createElement("div", __assign({ hidden: true, id: "tabpanel-" + index, role: "tabpanel", className: "react-js-tab-panel" }, props), props.children));
};
//# sourceMappingURL=Tabs.js.map