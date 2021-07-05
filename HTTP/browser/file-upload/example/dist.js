(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.exe = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    var EventEmitter = /** @class */ (function () {
        function EventEmitter() {
            this.events = {};
            this.eventTypes = {};
        }
        EventEmitter.prototype.on = function (type, fn, context) {
            var _this = this;
            if (context === void 0) { context = this; }
            if (!this.events[type]) {
                this.events[type] = [];
            }
            this.events[type].push([fn, context]);
            return function () {
                _this.off(type, fn);
            };
        };
        EventEmitter.prototype.once = function (type, fn, context) {
            var _this = this;
            if (context === void 0) { context = this; }
            var magic = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.off(type, magic);
                fn.apply(context, args);
            };
            magic.fn = fn;
            this.on(type, magic);
            return this;
        };
        EventEmitter.prototype.off = function (type, fn) {
            if (!type && !fn) {
                this.events = {};
                return this;
            }
            if (type) {
                if (!fn) {
                    this.events[type] = [];
                    return this;
                }
                var events = this.events[type];
                if (!events) {
                    return this;
                }
                var count = events.length;
                while (count--) {
                    if (events[count][0] === fn ||
                        (events[count][0] && events[count][0].fn === fn)) {
                        events.splice(count, 1);
                    }
                }
                return this;
            }
        };
        EventEmitter.prototype.trigger = function (type) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var events = this.events[type];
            if (!events) {
                return;
            }
            var len = events.length;
            var eventsCopy = Array.from(events);
            var ret;
            for (var i = 0; i < len; i++) {
                var event_1 = eventsCopy[i];
                var fn = event_1[0], context = event_1[1];
                if (fn) {
                    ret = fn.apply(context, args);
                    if (ret === true) {
                        return ret;
                    }
                }
            }
        };
        EventEmitter.prototype.destroy = function () {
            this.events = {};
            this.eventTypes = {};
        };
        return EventEmitter;
    }());

    var defaultTemplate = "\n    <div id=\"app\" class=\"upload-demo\">\n        <div tabindex=\"0\" class=\"el-upload el-upload--text\">\n            <div class=\"el-upload-dragger\">\n                <span>\n                    <svg t=\"1623763567583\" class=\"icon\" viewBox=\"0 0 1024 1024\" version=\"1.1\"\n                        xmlns=\"http://www.w3.org/2000/svg\" p-id=\"1208\" width=\"67\" height=\"67\">\n                        <path\n                            d=\"M803.786667 414.4a5.333333 5.333333 0 0 1-4.106667-4.053333 304 304 0 0 0-600.746667 50.666666 5.333333 5.333333 0 0 1-4.16 4.96A196.16 196.16 0 0 0 42.666667 660.426667C44.426667 768 134.986667 853.333333 242.666667 853.333333h92.373333a5.333333 5.333333 0 0 0 5.333333-5.333333v-64a5.333333 5.333333 0 0 0-5.333333-5.333333H241.653333c-60.693333 0-114.026667-43.413333-122.986666-103.466667a121.866667 121.866667 0 0 1 95.253333-137.013333l53.333333-11.093334a5.333333 5.333333 0 0 0 4.266667-5.333333l1.706667-54.613333a229.333333 229.333333 0 0 1 453.866666-38.773334L736.533333 474.666667a5.333333 5.333333 0 0 0 4.266667 4.213333l45.973333 8.533333a147.04 147.04 0 0 1-26.08 291.253334H554.666667a5.333333 5.333333 0 0 1-5.333334-5.333334v-182.293333a5.333333 5.333333 0 0 1 9.12-3.786667l48 48a5.333333 5.333333 0 0 0 7.52 0l45.28-45.226666a5.333333 5.333333 0 0 0 0-7.573334l-94.453333-94.4-49.013333-49.066666a5.333333 5.333333 0 0 0-7.573334 0l-49.013333 49.066666-94.293333 94.24a5.333333 5.333333 0 0 0 0 7.573334l45.28 45.226666a5.333333 5.333333 0 0 0 7.52 0l48-48a5.333333 5.333333 0 0 1 9.12 3.786667V848a5.333333 5.333333 0 0 0 5.333333 5.333333h279.626667a221.706667 221.706667 0 0 0 44.16-438.933333z\"\n                            p-id=\"1209\"></path>\n                    </svg>\n\n                </span>\n\n                <div class=\"el-upload__text\">\u5C06\u6587\u4EF6\u62D6\u5230\u6B64\u5904\uFF0C\u6216<em>\u70B9\u51FB\u4E0A\u4F20</em></div>\n            </div>\n        </div>\n        <ul class=\"el-upload-list\"></ul>\n    </div>\n";

    function callWithErrorHandling(fn, ctx, arg) {
        var res;
        try {
            arg ? fn(ctx, arg) : fn(ctx);
        }
        catch (err) {
            // TODO 错误处理
            console.error(err);
        }
        return res;
    }
    function isUndef(v) {
        return v === undefined || v === null;
    }
    function warn(msg) {
        console.error("[Upload warn]: " + msg);
    }
    function getElement(el) {
        return (typeof el === 'string' ? document.querySelector(el) : el);
    }
    function addEvent(el, type, fn, capture) {
        el.addEventListener(type, fn, {
            passive: false,
            capture: !!capture
        });
        return function () {
            removeEvent(el, type, fn);
        };
    }
    function removeEvent(el, type, fn, capture) {
        el.removeEventListener(type, fn, {
            capture: !!capture
        });
    }

    function getError(action, xhr) {
        var msg;
        if (xhr.response) {
            msg = "" + (xhr.response.error || xhr.response);
        }
        else if (xhr.responseText) {
            msg = "" + xhr.responseText;
        }
        else {
            msg = "fail to post " + action + " " + xhr.status;
        }
        var err = new Error(msg);
        // err['status'] = xhr.status;
        // err['method'] = "post";
        // err['url'] = action;
        return err;
    }
    function getBody(xhr) {
        var text = xhr.responseText || xhr.response;
        if (!text) {
            return text;
        }
        try {
            return JSON.parse(text);
        }
        catch (e) {
            return text;
        }
    }
    function upload(option) {
        var xhr = new XMLHttpRequest();
        var action = option.action;
        if (xhr.upload) {
            xhr.upload.onprogress = option.onProgress;
        }
        xhr.onerror = function () { return option.onError(getError(action, xhr)); };
        xhr.onload = function onload() {
            if (xhr.status < 200 || xhr.status >= 300) {
                return option.onError(getError(action, xhr));
            }
            option.onSuccess(getBody(xhr));
        };
        xhr.open("post", action, true);
        if (option.withCredentials && "withCredentials" in xhr) {
            xhr.withCredentials = true;
        }
        var headers = option.headers || {};
        for (var name_1 in headers) {
            if (headers.hasOwnProperty(name_1) && headers[name_1] !== null) {
                xhr.setRequestHeader(name_1, headers[name_1]);
            }
        }
        xhr.send(option.body);
        return xhr;
    }
    var createAdapter = function () {
        if (typeof XMLHttpRequest !== "undefined") {
            return upload;
        }
    };

    var DEFAULT_OPTIONS = {
        template: defaultTemplate,
        name: 'file',
        accept: '/image',
        showFileList: true,
        headers: {},
        action: '/index',
        drag: true,
        clipBoard: false,
        listType: 'text',
        autoUpload: true,
        disabled: false,
        limit: -1
    };
    var UploadConstructor = /** @class */ (function (_super) {
        __extends(UploadConstructor, _super);
        function UploadConstructor(opt) {
            var _this = _super.call(this) || this;
            _this.pluginsHooks = {};
            _this.options = __assign(__assign({}, DEFAULT_OPTIONS), opt);
            _this.init();
            return _this;
        }
        UploadConstructor.prototype.init = function () {
            var _a = this.options, el = _a.el, template = _a.template;
            if (el) {
                this.container = getElement(el);
            }
            if (!this.container) {
                warn('Can not resolve the wrapper DOM.');
                return;
            }
            if (template) {
                this.container.innerHTML = template;
            }
            this.fileList = [];
            this.initPluginHooks();
            this.invokePluginHook('init');
            this.setEventLister();
        };
        UploadConstructor.prototype.setEventLister = function () {
            var _this = this;
            var _a;
            var _b = this, container = _b.container, pluginsHooks = _b.pluginsHooks;
            var inputElement = this.createInputElement();
            var offUploadFileFn = this.on('uploadFile', this.uploadFile);
            var offClickFn = addEvent(container, 'click', function () {
                inputElement.value = '';
                inputElement.click();
            });
            var offChangeFn = addEvent(inputElement, 'change', function (e) {
                var fileList = e.target.files;
                if (!fileList || !fileList.length)
                    return;
                _this.fileList = _this.fileList.concat(Array.from(fileList));
                _this.trigger('uploadFile');
            });
            (_a = pluginsHooks.destroy) === null || _a === void 0 ? void 0 : _a.push(offClickFn, offChangeFn, offUploadFileFn);
        };
        UploadConstructor.prototype.uploadFile = function () {
            var _this = this;
            this.invokePluginHook('beforeUpload');
            var fileList = this.fileList;
            var _a = this.options, name = _a.name, action = _a.action, headers = _a.headers;
            var adapter = createAdapter();
            var formData = new FormData();
            fileList.forEach(function (file) {
                formData.append(name, file);
            });
            adapter &&
                adapter({
                    action: action,
                    headers: headers,
                    body: formData,
                    onProgress: function (e) {
                        _this.invokePluginHook('onUpload', e);
                    },
                    onSuccess: function () { },
                    onError: function () { }
                });
        };
        UploadConstructor.prototype.createInputElement = function () {
            var _a = this, container = _a.container, options = _a.options;
            var accept = options.accept, multiple = options.multiple;
            var inputElement = document.createElement('input');
            inputElement.setAttribute('style', 'display: none');
            inputElement.setAttribute('type', 'file');
            inputElement.setAttribute('accept', accept);
            if (multiple) {
                inputElement.setAttribute('multiple', 'multiple');
            }
            container.appendChild(inputElement);
            return inputElement;
        };
        UploadConstructor.prototype.invokePluginHook = function (hookType, params) {
            var _this = this;
            var invokePluginHooks = this.pluginsHooks[hookType];
            invokePluginHooks === null || invokePluginHooks === void 0 ? void 0 : invokePluginHooks.forEach(function (hook) {
                if (typeof hook === 'function') {
                    callWithErrorHandling(hook, _this, params);
                }
            });
        };
        UploadConstructor.prototype.initPluginHooks = function () {
            var hooks = [
                'init',
                'create',
                'beforeUpload',
                'onUpload',
                'afterUpload',
                'destroy'
            ];
            this.pluginsHooks = {
                init: [],
                create: [],
                destroy: [],
                beforeUpload: [],
                afterUpload: [],
                onUpload: []
            };
            var plugins = UploadConstructor.plugins;
            for (var i = 0; i < hooks.length; ++i) {
                this.pluginsHooks[hooks[i]] = [];
                for (var j = 0; j < plugins.length; ++j) {
                    var hook = plugins[j][hooks[i]];
                    if (hook !== undefined) {
                        this.pluginsHooks[hooks[i]].push(hook);
                    }
                }
            }
        };
        UploadConstructor.use = function (plugin) {
            var name = plugin.name;
            if (isUndef(name)) {
                warn("Plugin Class must specify plugin's name in static property by 'pluginName' field.");
                return UploadConstructor;
            }
            if (UploadConstructor.pluginsMap[name]) {
                warn("This plugin has been registered, maybe you need change plugin's name");
                return UploadConstructor;
            }
            UploadConstructor.pluginsMap[name] = true;
            UploadConstructor.plugins.push(plugin);
            return UploadConstructor;
        };
        UploadConstructor.prototype.destroy = function () {
            this.invokePluginHook('destroy');
            UploadConstructor.plugins = [];
            UploadConstructor.pluginsMap = {};
            this.pluginsHooks = {};
            this.options = DEFAULT_OPTIONS;
        };
        // 取消上传
        UploadConstructor.prototype.abort = function () { };
        // 手动上传
        UploadConstructor.prototype.submit = function () {
            this.uploadFile();
        };
        UploadConstructor.plugins = [];
        UploadConstructor.pluginsMap = {};
        return UploadConstructor;
    }(EventEmitter));
    function createUpload(options) {
        var upload = new UploadConstructor(options);
        return upload;
    }
    createUpload.use = UploadConstructor.use;
    createUpload.plugins = UploadConstructor.plugins;
    createUpload.pluginsMap = UploadConstructor.pluginsMap;
    var Upload = createUpload;

    var eventLists = [];
    var initDrop = function (ctx) {
        var container = ctx.container, _a = ctx.options, autoUpload = _a.autoUpload, drag = _a.drag;
        if (container && drag) {
            ['dragover', 'drop'].forEach(function (type) {
                var offEvent = addEvent(container, type, function (e) {
                    e.preventDefault();
                    if (type === 'drop') {
                        var fileList = e.dataTransfer.files;
                        if (!fileList || !fileList.length)
                            return;
                        ctx.fileList = ctx.fileList.concat(Array.from(fileList));
                        if (autoUpload) {
                            ctx.trigger('uploadFile');
                        }
                    }
                });
                eventLists.push(offEvent);
            });
        }
    };
    var destroy = function () {
        eventLists.forEach(function (fn) {
            fn && fn();
        });
    };
    var dropFilePlugin = { name: 'dropFile', init: initDrop, destroy: destroy };

    exports.UploadConstructor = UploadConstructor;
    exports.createUpload = createUpload;
    exports.Upload = Upload;
    exports.dropFilePlugin = dropFilePlugin;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=dist.js.map
