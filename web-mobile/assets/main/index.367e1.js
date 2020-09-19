window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BattleModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08e1bytu+NNLJqWO9LRQ80Z", "BattleModel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var IDataModel_1 = require("./IDataModel");
    var KEY_ACCOUNT = "battle";
    var BattleModel = function(_super) {
      __extends(BattleModel, _super);
      function BattleModel() {
        var _this = _super.call(this, "battle") || this;
        _this.mIsOver = false;
        return _this;
      }
      BattleModel.prototype.getMessageListeners = function() {
        return {};
      };
      BattleModel.prototype.GameOver = function(reason, result) {
        if (this.mIsOver) return;
        console.log("=======================game over");
        this.mIsOver = true;
        result > 0 ? cc.director.loadScene("victory") : cc.director.loadScene("regret");
        this.mIsOver = false;
      };
      return BattleModel;
    }(IDataModel_1.default);
    exports.default = BattleModel;
    cc._RF.pop();
  }, {
    "./IDataModel": "IDataModel"
  } ],
  EventConst: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d22610AXWdOD7hw0qIW5HEw", "EventConst");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Constant = exports.LanguageKey = exports.GameEvent = exports.SocketEvent = void 0;
    var SocketEvent = function() {
      function SocketEvent() {}
      SocketEvent.SOCKET_OPEN = "SOCKET_OPEN";
      SocketEvent.SOCKET_CLOSE = "SOCKET_CLOSE";
      return SocketEvent;
    }();
    exports.SocketEvent = SocketEvent;
    var GameEvent = function() {
      function GameEvent() {}
      GameEvent.LOGIN_SUCCESS = "LOGIN_SUCCESS";
      GameEvent.CREATEWORMHOLE = "Create_Wormhole";
      GameEvent.ENTERWORMHOLE = "Enter_Wormhole";
      return GameEvent;
    }();
    exports.GameEvent = GameEvent;
    var LanguageKey = function() {
      function LanguageKey() {}
      LanguageKey.GAMEOVERTIP1 = "\u624b\u6307\u677e\u5f00";
      LanguageKey.GAMEOVERTIP2 = "\u4e24\u4e2a\u624b\u6307";
      LanguageKey.GAMEOVERTIP3 = "\u8fdb\u5165\u540e\u53f0";
      return LanguageKey;
    }();
    exports.LanguageKey = LanguageKey;
    var Constant = function() {
      function Constant() {}
      Constant.CREATEWORMHOLETIME = 60;
      Constant.ENTERWORMHOLETIME = 10;
      Constant.UFOWIDTH = 127;
      Constant.UFOHEIGHT = 103;
      Constant.UFORADIUS = 40;
      return Constant;
    }();
    exports.Constant = Constant;
    cc._RF.pop();
  }, {} ],
  EventMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8eb9bHfqxdEaJap0m6XIId2", "EventMng");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = new cc.EventTarget();
    cc._RF.pop();
  }, {} ],
  GameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9948eK7buVDMqdvps5pUzCC", "GameController");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataCenter_1 = require("./data/GameDataCenter");
    var GameController = function() {
      function GameController() {}
      GameController.prototype.init = function() {
        GameDataCenter_1.default.initModule();
      };
      return GameController;
    }();
    exports.default = new GameController();
    cc._RF.pop();
  }, {
    "./data/GameDataCenter": "GameDataCenter"
  } ],
  GameDataCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e9a5c9zLT9HHJCmWhskWYm7", "GameDataCenter");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var BattleModel_1 = require("./model/BattleModel");
    var SingletonFactory_1 = require("../utils/SingletonFactory");
    var GameDataCenter = function() {
      function GameDataCenter() {
        this._tModel = [];
        this.system = null;
        this.battle = null;
      }
      GameDataCenter.prototype.newModel = function(c) {
        var obj = SingletonFactory_1.SingletonFactory.getInstance(c);
        this._tModel.push(obj);
        return obj;
      };
      GameDataCenter.prototype.clear = function() {
        this._tModel.forEach(function(m) {
          m.clear();
        });
      };
      GameDataCenter.prototype.initModule = function() {
        this.battle = this.newModel(BattleModel_1.default);
      };
      return GameDataCenter;
    }();
    exports.default = new GameDataCenter();
    cc._RF.pop();
  }, {
    "../utils/SingletonFactory": "SingletonFactory",
    "./model/BattleModel": "BattleModel"
  } ],
  IDataModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2995bNc/4FHupIpPoRTrZB9", "IDataModel");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventMng_1 = require("../../manager/EventMng");
    var GameController_1 = require("../../GameController");
    var IDataModel = function() {
      function IDataModel(modelName) {
        void 0 === modelName && (modelName = "default");
        this.modelName = "default";
        this._dLocalData = {};
        this.modelName = modelName;
        this.LoadStorage();
        this.registerListeners();
      }
      IDataModel.prototype.clear = function() {};
      IDataModel.prototype.registerListeners = function() {
        var tbMsg = this.getMessageListeners();
        var _loop_1 = function(key) {
          tbMsg.hasOwnProperty(key) && EventMng_1.default.on(key.toString(), function(data) {
            tbMsg[key](data);
          });
        };
        for (var key in tbMsg) _loop_1(key);
      };
      IDataModel.prototype.getMessageListeners = function() {
        return {};
      };
      IDataModel.prototype.sendProtocolMsg = function(msgData, protocolID) {
        try {
          GameController_1.default.network.send(msgData, protocolID);
        } catch (e) {
          console.error("send proto", msgData, e);
        }
      };
      IDataModel.prototype.LoadStorage = function() {
        var data = JSON.parse(cc.sys.localStorage.getItem("model_" + this.modelName));
        if (data && "" !== data) this._dLocalData = data; else {
          this._dLocalData = {};
          this.Save();
        }
      };
      IDataModel.prototype.Query = function(sKey, defaultValue) {
        void 0 === defaultValue && (defaultValue = null);
        if (void 0 != this._dLocalData[sKey]) return this._dLocalData[sKey];
        return defaultValue;
      };
      IDataModel.prototype.Set = function(sKey, value) {
        if (this._dLocalData[sKey] && this._dLocalData[sKey] == value) return false;
        this._dLocalData[sKey] = value;
        return true;
      };
      IDataModel.prototype.Save = function() {
        cc.sys.localStorage.setItem("model_" + this.modelName, JSON.stringify(this._dLocalData));
      };
      return IDataModel;
    }();
    exports.default = IDataModel;
    cc._RF.pop();
  }, {
    "../../GameController": "GameController",
    "../../manager/EventMng": "EventMng"
  } ],
  Log: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "67d10ZYkcdBfIDdzvWV7o0w", "Log");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Log = exports.LOG_TAG = void 0;
    exports.LOG_TAG = {
      SOCKET: {
        desc: "LOG_SOCKET",
        isOpen: true
      },
      debug: {
        desc: "LOG_TEST",
        isOpen: true
      }
    };
    var Log = function() {
      function Log() {}
      Log.log = function(tag) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) args[_i - 1] = arguments[_i];
        var backLog = console.log || cc.log;
        if (!tag || !tag.isOpen) return;
        var arr = Array.prototype.slice.call(arguments);
        arr.splice(0, 1, "[" + tag.desc + "]");
        var info = Log.stack(2) + Log.getDateString() + " ";
        arr.splice(1, 0, info);
        backLog.apply(backLog, arr);
      };
      Log.warn = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var backLog = console.warn || cc.warn;
        var arr = Array.prototype.slice.call(arguments);
        var info = Log.stack(2) + Log.getDateString() + " ";
        arr.splice(0, 0, info);
        backLog.apply(backLog, arr);
      };
      Log.error = function() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
        var backLog = console.error || cc.error;
        var arr = Array.prototype.slice.call(arguments);
        var info = Log.stack(2) + Log.getDateString() + " ";
        arr.splice(0, 0, info);
        backLog.apply(backLog, arr);
      };
      Log.getDateString = function() {
        var d = new Date();
        var str = d.getHours().toString();
        var timeStr = "";
        timeStr += (1 == str.length ? "0" + str : str) + ":";
        str = d.getMinutes().toString();
        timeStr += (1 == str.length ? "0" + str : str) + ":";
        str = d.getSeconds().toString();
        timeStr += (1 == str.length ? "0" + str : str) + ":";
        str = d.getMilliseconds().toString();
        1 == str.length && (str = "00" + str);
        2 == str.length && (str = "0" + str);
        timeStr += str;
        timeStr = "[" + timeStr + "]";
        return timeStr;
      };
      Log.stack = function(index) {
        void 0 === index && (index = 2);
        var e = new Error();
        var lines = e.stack.split("\n");
        lines.shift();
        var result = [];
        lines.forEach(function(line) {
          var _a;
          line = line.substring(7);
          var lineBreak = line.split(" ");
          lineBreak.length < 2 ? result.push(lineBreak[0]) : result.push((_a = {}, _a[lineBreak[0]] = lineBreak[1], 
          _a));
        });
        var list = [];
        if (index < result.length - 1) for (var a in result[index]) list.push(a);
        var splitList = list[0].split(".");
        return splitList[0] + ".js->" + splitList[1] + ":";
      };
      return Log;
    }();
    exports.Log = Log;
    cc._RF.pop();
  }, {} ],
  PlayerControl: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1a35dvfFHBJK5E4VhOjVcgN", "PlayerControl");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var GameDataCenter_1 = require("../../../data/GameDataCenter");
    var EventMng_1 = require("../../../manager/EventMng");
    var EventConst_1 = require("../../../data/const/EventConst");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var PlayerControl = function(_super) {
      __extends(PlayerControl, _super);
      function PlayerControl() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.nodePos = cc.Vec2.ZERO;
        _this.dir = cc.Vec2.ZERO;
        _this.rect = null;
        return _this;
      }
      PlayerControl.prototype.onLoad = function() {
        this.player_spine = this.getComponent("sp.Skeleton");
        this.node.parent.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.parent.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        EventMng_1.default.on(EventConst_1.GameEvent.CREATEWORMHOLE, this.CreateRect, this);
      };
      PlayerControl.prototype.onDestroy = function() {
        this.node.parent.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.parent.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.parent.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.parent.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        EventMng_1.default.off(EventConst_1.GameEvent.CREATEWORMHOLE, this.CreateRect, this);
      };
      PlayerControl.prototype.onTouchStart = function(event) {
        if (event.getTouches() > 1) {
          this.GameOver(EventConst_1.LanguageKey.GAMEOVERTIP2);
          return;
        }
        var oldPos = event.getLocation();
        oldPos = this.node.parent.convertToNodeSpaceAR(oldPos);
        this.nodePos = oldPos;
        this.node.setPosition(this.nodePos);
      };
      PlayerControl.prototype.onTouchMove = function(event) {
        if (event.getTouches() > 1) {
          this.GameOver(EventConst_1.LanguageKey.GAMEOVERTIP2);
          return;
        }
        var touches = event.getTouches();
        var oldPos = this.node.parent.convertToNodeSpaceAR(touches[0].getStartLocation());
        var newPos = this.node.parent.convertToNodeSpaceAR(touches[0].getLocation());
        var subPos = oldPos.sub(newPos);
        this.node.x = this.nodePos.x - subPos.x;
        this.node.y = this.nodePos.y - subPos.y;
        var minX = -this.node.parent.width / 2 + this.node.width / 2;
        var maxX = Math.abs(minX);
        var minY = -this.node.parent.height / 2 + this.node.height / 2;
        var maxY = Math.abs(minY);
        var nPos = this.node.getPosition();
        nPos.x < minX && (nPos.x = minX);
        nPos.x > maxX && (nPos.x = maxX);
        nPos.y < minY && (nPos.y = minY);
        nPos.y > maxY && (nPos.y = maxY);
        this.node.setPosition(nPos);
        if (null == this.rect) return;
        if (this.rect.contains(nPos)) {
          EventMng_1.default.emit(EventConst_1.GameEvent.ENTERWORMHOLE);
          this.rect = null;
          console.log("=======================x", newPos.x);
          console.log("=======================y", newPos.y);
        }
      };
      PlayerControl.prototype.onGetAn = function(point) {
        var pos = this.node.getPosition();
        var angle = Math.atan2(point.y - pos.y, point.x - pos.x) * (180 / Math.PI);
        this.node.angle = angle;
      };
      PlayerControl.prototype.onTouchEnd = function() {
        this.GameOver(EventConst_1.LanguageKey.GAMEOVERTIP1);
      };
      PlayerControl.prototype.onTouchCancel = function() {
        this.GameOver(EventConst_1.LanguageKey.GAMEOVERTIP1);
      };
      PlayerControl.prototype.GameOver = function(tip) {
        GameDataCenter_1.default.battle.GameOver(tip, 0);
      };
      PlayerControl.prototype.CreateRect = function(rect) {
        this.rect = rect;
      };
      PlayerControl = __decorate([ ccclass ], PlayerControl);
      return PlayerControl;
    }(cc.Component);
    exports.default = PlayerControl;
    cc._RF.pop();
  }, {
    "../../../data/GameDataCenter": "GameDataCenter",
    "../../../data/const/EventConst": "EventConst",
    "../../../manager/EventMng": "EventMng"
  } ],
  SingletonFactory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9397cX/vA9FY40I/muXYjSY", "SingletonFactory");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SingletonFactory = void 0;
    var SingletonFactory = function() {
      function SingletonFactory() {}
      SingletonFactory.getInstance = function(c) {
        if (!SingletonFactory.instances.has(c)) {
          var obj = new c();
          SingletonFactory.instances.set(c, obj);
          return obj;
        }
        return SingletonFactory.instances.get(c);
      };
      SingletonFactory.instances = new Map();
      return SingletonFactory;
    }();
    exports.SingletonFactory = SingletonFactory;
    cc._RF.pop();
  }, {} ],
  SystemModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0ec23jeQsJKB5JsVHrPowhB", "SystemModel");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var IDataModel_1 = require("./IDataModel");
    var SystemModel = function(_super) {
      __extends(SystemModel, _super);
      function SystemModel() {
        var _this = _super.call(this, "system") || this;
        _this.is_open_music = false;
        _this.is_open_sound = false;
        return _this;
      }
      SystemModel.prototype.getMessageListeners = function() {
        return {};
      };
      return SystemModel;
    }(IDataModel_1.default);
    exports.default = SystemModel;
    cc._RF.pop();
  }, {
    "./IDataModel": "IDataModel"
  } ],
  TipsItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3d560zbGIBFQLCIMpgcFG3L", "TipsItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TipsItem = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var TipsItem = function(_super) {
      __extends(TipsItem, _super);
      function TipsItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tipLabel = null;
        _this.ready = true;
        return _this;
      }
      TipsItem.prototype.playTip = function(message) {
        this.node.stopAllActions();
        this.ready = false;
        this.tipLabel.string = message;
        this.reset();
        var action0 = cc.moveTo(.5, 0, 128);
        var action1 = cc.fadeIn(.5);
        var action2 = cc.spawn(action0, action1);
        var action3 = cc.delayTime(1);
        var action4 = cc.fadeOut(.5);
        var callback = cc.callFunc(function() {
          this.ready = true;
        }, this);
        var action = cc.sequence(action2, action3, action4, callback);
        this.node.runAction(action);
      };
      TipsItem.prototype.isReady = function() {
        return this.ready;
      };
      TipsItem.prototype.reset = function() {
        this.node.setPosition(0, 0);
        this.node.opacity = 255;
      };
      __decorate([ property(cc.Label) ], TipsItem.prototype, "tipLabel", void 0);
      TipsItem = __decorate([ ccclass, menu("UI/Common/TipsItem") ], TipsItem);
      return TipsItem;
    }(cc.Component);
    exports.TipsItem = TipsItem;
    cc._RF.pop();
  }, {} ],
  UIBase: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "76454/+dxNA36XaoEgldO2R", "UIBase");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventMng_1 = require("../../manager/EventMng");
    var PREFAB_UI_DIR = "prefab/";
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var UIBase = function(_super) {
      __extends(UIBase, _super);
      function UIBase() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      Object.defineProperty(UIBase.prototype, "tag", {
        get: function() {
          return this.mTag;
        },
        set: function(value) {
          this.mTag = value;
        },
        enumerable: false,
        configurable: true
      });
      UIBase.getUrl = function() {
        return PREFAB_UI_DIR + this.prefabUrl;
      };
      UIBase.getName = function() {
        return this.className;
      };
      UIBase.prototype.init = function(params) {
        this.onInit(params);
      };
      UIBase.prototype.onLoad = function() {
        this._notifyEventList = new Map();
        this._registerEventList = new Map();
        this.onUILoad();
        this.addEventListener(this.node, this.touchEvent, this, false);
        this.onRegisterEvent();
      };
      UIBase.prototype.onDestroy = function() {
        this.removeEventListener(this.node, this.touchEvent, this);
        this.unRegisterEvent();
        var self = this;
        this._notifyEventList.forEach(function(f, key) {
          EventMng_1.default.off(key, f, self);
        }, this);
        this._notifyEventList.clear();
        this.onUIDestroy();
      };
      UIBase.prototype.onEnable = function() {
        this.onShow();
      };
      UIBase.prototype.onDisable = function() {
        this.onHide();
      };
      UIBase.prototype.initEvent = function(eventName, cb) {
        EventMng_1.default.on(eventName, cb, this);
        this._notifyEventList.set(eventName, cb);
      };
      UIBase.prototype.touchEvent = function(event) {
        event.stopPropagation();
      };
      UIBase.prototype.start = function() {
        this.onStart();
      };
      UIBase.prototype.update = function(dt) {
        this.onUpdate(dt);
      };
      UIBase.prototype.onInit = function(params) {};
      UIBase.prototype.onUILoad = function() {};
      UIBase.prototype.onUIDestroy = function() {};
      UIBase.prototype.onShow = function() {};
      UIBase.prototype.onHide = function() {};
      UIBase.prototype.onStart = function() {};
      UIBase.prototype.onUpdate = function(dt) {};
      UIBase.prototype.onClose = function() {};
      UIBase.prototype.onRegisterEvent = function() {};
      UIBase.prototype.unRegisterEvent = function() {};
      UIBase.prototype.addEventListener = function(node, callback, target, playAudio) {
        void 0 === target && (target = null);
        void 0 === playAudio && (playAudio = true);
        if (!node) return;
        node.on(cc.Node.EventType.TOUCH_END, callback, target);
        this._registerEventList.set(node.name, {
          callback: callback,
          target: target,
          playAudio: playAudio
        });
      };
      UIBase.prototype.removeEventListener = function(node, callback, target) {
        void 0 === target && (target = null);
        node.off(cc.Node.EventType.TOUCH_END, callback, target);
      };
      UIBase = __decorate([ ccclass ], UIBase);
      return UIBase;
    }(cc.Component);
    exports.default = UIBase;
    cc._RF.pop();
  }, {
    "../../manager/EventMng": "EventMng"
  } ],
  UIBattle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "63944uHbGFPgZ0FiUXFEMOq", "UIBattle");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var GameDataCenter_1 = require("../../../data/GameDataCenter");
    var EventMng_1 = require("../../../manager/EventMng");
    var EventConst_1 = require("../../../data/const/EventConst");
    var Log_1 = require("../../../utils/Log");
    var auto_zhujiemianUI_1 = require("../../../data/autoui/scene/auto_zhujiemianUI");
    var Utils_1 = require("../../../utils/Utils");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var MapEnum;
    (function(MapEnum) {
      MapEnum[MapEnum["hei"] = 0] = "hei";
      MapEnum[MapEnum["hong"] = 1] = "hong";
      MapEnum[MapEnum["lan"] = 2] = "lan";
      MapEnum[MapEnum["lv"] = 3] = "lv";
      MapEnum[MapEnum["zi"] = 4] = "zi";
    })(MapEnum || (MapEnum = {}));
    var UIBattle = function(_super) {
      __extends(UIBattle, _super);
      function UIBattle() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.mMap = [];
        _this.mThrough = null;
        _this.mWormhole = null;
        _this.CountDownLabel = null;
        _this.HoursLabel = null;
        _this.MinutesLabel = null;
        _this.SecondsLabel = null;
        _this.CountTime = 0;
        _this.mCreateWormhole = EventConst_1.Constant.CREATEWORMHOLETIME;
        _this.mEnterWormhole = EventConst_1.Constant.ENTERWORMHOLETIME;
        _this.mIsEnterWormhole = true;
        _this.UFOSize = new cc.Vec2(EventConst_1.Constant.UFOWIDTH, EventConst_1.Constant.UFOHEIGHT);
        _this.randomMap = 0;
        _this.UFPPos = cc.Vec2.ZERO;
        _this.ui = null;
        return _this;
      }
      UIBattle.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_zhujiemianUI_1.default);
        this.CountDownLabel = this.ui.CountDown.getComponent(cc.Label);
        this.HoursLabel = this.ui.Hours.getComponent(cc.Label);
        this.MinutesLabel = this.ui.Minutes.getComponent(cc.Label);
        this.SecondsLabel = this.ui.Seconds.getComponent(cc.Label);
        cc.game.on(cc.game.EVENT_HIDE, function() {
          GameDataCenter_1.default.battle.GameOver("\u8fdb\u5165\u540e\u53f0", 0);
        }, this);
        this.schedule(function() {
          this.CountDown();
        }, 1);
        this.map_spine = this.mWormhole.getComponent("sp.Skeleton");
        this.through_spine = this.mThrough.getComponent("sp.Skeleton");
        this.ui.ZJMUI_1_3.active = false;
      };
      UIBattle.prototype.onRegisterEvent = function() {
        EventMng_1.default.on(EventConst_1.GameEvent.ENTERWORMHOLE, this.EnterWormhole, this);
      };
      UIBattle.prototype.unRegisterEvent = function() {
        EventMng_1.default.off(EventConst_1.GameEvent.ENTERWORMHOLE, this.EnterWormhole, this);
      };
      UIBattle.prototype.onStart = function() {
        this.randomMap = Math.floor(5 * Math.random());
        this.SetMapActive(this.randomMap);
      };
      UIBattle.prototype.onDestroy = function() {
        this.unschedule(this.CountDown);
      };
      UIBattle.prototype.CountDown = function() {
        this.CountTime++;
        var tiemArr = Utils_1.default.GetHMS(this.CountTime);
        this.HoursLabel.string = tiemArr[0];
        this.MinutesLabel.string = tiemArr[1];
        this.SecondsLabel.string = tiemArr[2];
        console.log("==================", this.mCreateWormhole);
        if (this.mCreateWormhole > 0) this.mCreateWormhole -= 1; else {
          this.mIsEnterWormhole = false;
          this.mEnterWormhole = EventConst_1.Constant.ENTERWORMHOLETIME;
          this.CreateWormhole();
          this.ui.ZJMUI_1_3.active = true;
        }
        if (this.mIsEnterWormhole) this.ui.ZJMUI_1_3.active = false; else {
          if (this.mEnterWormhole > 0) this.mEnterWormhole -= 1; else {
            GameDataCenter_1.default.battle.GameOver("\u672a\u8fdb\u5165\u866b\u6d1e", 0);
            this.unschedule(this.CountDown);
          }
          this.CountDownLabel.string = this.mEnterWormhole.toString();
        }
      };
      UIBattle.prototype.CreateWormhole = function() {
        this.mCreateWormhole = EventConst_1.Constant.CREATEWORMHOLETIME;
        this.randomMap = Math.floor(5 * Math.random());
        this.UFPPos = this.GeneratePos();
        var rect = new cc.Rect(this.UFPPos.x, this.UFPPos.y, EventConst_1.Constant.UFORADIUS, EventConst_1.Constant.UFORADIUS);
        this.mWormhole.active = true;
        Log_1.Log.log(Log_1.LOG_TAG.debug, "x", rect.x);
        Log_1.Log.log(Log_1.LOG_TAG.debug, "y", rect.y);
        this.map_spine.setAnimation(0, MapEnum[this.randomMap], true);
        this.mWormhole.setPosition(this.UFPPos);
        EventMng_1.default.emit(EventConst_1.GameEvent.CREATEWORMHOLE, rect);
      };
      UIBattle.prototype.EnterWormhole = function() {
        Log_1.Log.log(Log_1.LOG_TAG.debug, "enter==========");
        this.mThrough.active = true;
        this.mThrough.setPosition(this.UFPPos);
        this.scheduleOnce(this.SetThroughActive, .5);
        this.mIsEnterWormhole = true;
        this.mWormhole.active = false;
        this.SetMapActive(this.randomMap);
      };
      UIBattle.prototype.GeneratePos = function() {
        var randomX = Math.floor(320 * Math.random());
        var randomY = Math.floor(650 * Math.random());
        var randomX_plus = Math.floor(Math.random());
        var randomY_plus = Math.floor(Math.random());
        randomX_plus < .5 && (randomX = -randomX);
        randomY_plus < .5 && (randomY = -randomY);
        var nPos = new cc.Vec2(randomX, randomY);
        var minX = -this.node.width / 2 + this.UFOSize.x / 2;
        var maxX = Math.abs(minX);
        var minY = -this.node.height / 2 + this.UFOSize.y / 2;
        var maxY = Math.abs(minY);
        nPos.x < minX && (nPos.x = minX);
        nPos.x > maxX && (nPos.x = maxX);
        nPos.y < minY && (nPos.y = minY);
        nPos.y > maxY && (nPos.y = maxY);
        return nPos;
      };
      UIBattle.prototype.SetMapActive = function(random) {
        for (var index = 0; index < 5; index++) this.mMap[index].active = index == random;
      };
      UIBattle.prototype.SetThroughActive = function() {
        this.mThrough.active = false;
        this.unschedule(this.SetThroughActive);
      };
      UIBattle.prefabUrl = "db://a";
      UIBattle.className = "UIBattle";
      __decorate([ property([ cc.Node ]) ], UIBattle.prototype, "mMap", void 0);
      __decorate([ property([ cc.Node ]) ], UIBattle.prototype, "mThrough", void 0);
      __decorate([ property([ cc.Node ]) ], UIBattle.prototype, "mWormhole", void 0);
      UIBattle = __decorate([ ccclass, menu("UI/scene/UIBattle") ], UIBattle);
      return UIBattle;
    }(UIBase_1.default);
    exports.default = UIBattle;
    cc._RF.pop();
  }, {
    "../../../data/GameDataCenter": "GameDataCenter",
    "../../../data/autoui/scene/auto_zhujiemianUI": "auto_zhujiemianUI",
    "../../../data/const/EventConst": "EventConst",
    "../../../manager/EventMng": "EventMng",
    "../../../utils/Log": "Log",
    "../../../utils/Utils": "Utils",
    "../UIBase": "UIBase"
  } ],
  UIChoose: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b89a8v45iZJl4YRCYscy0Hv", "UIChoose");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIChoose = function(_super) {
      __extends(UIChoose, _super);
      function UIChoose() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIChoose.prototype.onUILoad = function() {};
      UIChoose.prototype.onRegisterEvent = function() {};
      UIChoose.prototype.unRegisterEvent = function() {};
      UIChoose.prototype.onDestroy = function() {};
      UIChoose.prefabUrl = "popup/xuanzhe";
      UIChoose.className = "UIChoose";
      UIChoose = __decorate([ ccclass, menu("UI/popup/UIChoose") ], UIChoose);
      return UIChoose;
    }(UIBase_1.default);
    exports.default = UIChoose;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  UIConfirmDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "022d140RHhCiICbFkEjkGPH", "UIConfirmDialog");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var auto_confirmDialog_1 = require("../../../data/autoui/tips/auto_confirmDialog");
    var UIBase_1 = require("../UIBase");
    var UIHelp_1 = require("../UIHelp");
    var Log_1 = require("../../../utils/Log");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIConfirmDialog = function(_super) {
      __extends(UIConfirmDialog, _super);
      function UIConfirmDialog() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
      }
      UIConfirmDialog_1 = UIConfirmDialog;
      UIConfirmDialog.prototype.onInit = function(params) {
        if (void 0 == params) {
          Log_1.Log.error("UIConfirmDialog:\u6ca1\u6709\u4f20\u5165\u53c2\u6570\uff01\uff01\uff01");
          return;
        }
        var data = params[0];
        this._title = data.title;
        this._content = data.content;
        this._certainCb = data.certainCb;
        this._cancelCb = data.cancelCb;
      };
      UIConfirmDialog.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_confirmDialog_1.default);
      };
      UIConfirmDialog.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_cancel, this.onCancel, this);
        this.addEventListener(this.ui.btn_certain, this.onCertain, this);
      };
      UIConfirmDialog.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_cancel, this.onCancel, this);
        this.removeEventListener(this.ui.btn_certain, this.onCertain, this);
      };
      UIConfirmDialog.prototype.onShow = function() {};
      UIConfirmDialog.prototype.onHide = function() {};
      UIConfirmDialog.prototype.onStart = function() {
        UIHelp_1.default.SetLabel(this.ui.lbl_title, this._title);
        UIHelp_1.default.SetLabel(this.ui.lbl_content, this._content);
      };
      UIConfirmDialog.prototype.onClose = function() {
        UIHelp_1.default.CloseUI(UIConfirmDialog_1);
      };
      UIConfirmDialog.prototype.onCancel = function() {
        this._cancelCb && this._cancelCb();
        this.onClose();
      };
      UIConfirmDialog.prototype.onCertain = function() {
        this._certainCb && this._certainCb();
        this.onClose();
      };
      var UIConfirmDialog_1;
      UIConfirmDialog.prefabUrl = "tips/confirmDialog";
      UIConfirmDialog.className = "UIConfirmDialog";
      UIConfirmDialog = UIConfirmDialog_1 = __decorate([ ccclass, menu("UI/tips/UIConfirmDialog") ], UIConfirmDialog);
      return UIConfirmDialog;
    }(UIBase_1.default);
    exports.default = UIConfirmDialog;
    cc._RF.pop();
  }, {
    "../../../data/autoui/tips/auto_confirmDialog": "auto_confirmDialog",
    "../../../utils/Log": "Log",
    "../UIBase": "UIBase",
    "../UIHelp": "UIHelp"
  } ],
  UIHelp: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "89585JHC1ZMu4rrB2kQyLrV", "UIHelp");
    "use strict";
    var __spreadArrays = this && this.__spreadArrays || function() {
      for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
      for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, 
      k++) r[k] = a[j];
      return r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIMng_1 = require("../../manager/UIMng");
    var ViewZOrder_1 = require("../../data/const/ViewZOrder");
    var UITips_1 = require("./tips/UITips");
    var UIConfirmDialog_1 = require("./tips/UIConfirmDialog");
    var UIHelp = function() {
      function UIHelp() {}
      UIHelp.SetLabel = function(node, value) {
        "number" === typeof value ? value = value.toString() : void 0 == value && (value = "");
        if (node.getComponent(cc.RichText)) {
          var defaultColor = node.color.toHEX("#rrggbb");
          node.getComponent(cc.RichText).string = "<color=" + defaultColor + ">" + value + "</c>";
        } else node.getComponent(cc.Label).string = value;
      };
      UIHelp.SetBtnGrayState = function(node, isGray) {
        var button = node.getComponent(cc.Button);
        if (!button) return;
        button.interactable = !isGray;
        button.enableAutoGrayEffect = isGray;
      };
      UIHelp.IsBtnGray = function(node) {
        var button = node.getComponent(cc.Button);
        if (!button) return false;
        return !button.interactable;
      };
      UIHelp.ShowUI = function(uiClass, callback) {
        var _a;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
        (_a = UIMng_1.default.getInstance()).openUI.apply(_a, __spreadArrays([ uiClass, ViewZOrder_1.ViewZorder.UI, callback, null ], args));
      };
      UIHelp.CloseUI = function(uiClass) {
        UIMng_1.default.getInstance().closeUI(uiClass);
      };
      UIHelp.IsShowingUI = function(uiClass) {
        return UIMng_1.default.getInstance().isShowing(uiClass);
      };
      UIHelp.ShowTips = function(message) {
        var param = [];
        for (var _i = 1; _i < arguments.length; _i++) param[_i - 1] = arguments[_i];
        var tipUI = UIMng_1.default.getInstance().getUI(UITips_1.default);
        tipUI ? tipUI.showTip(message) : UIMng_1.default.getInstance().openUI(UITips_1.default, ViewZOrder_1.ViewZorder.Tips, function(ui) {
          UIHelp.ShowTips(message);
        });
      };
      UIHelp.ShowDialog = function(data) {
        UIMng_1.default.getInstance().openUI(UIConfirmDialog_1.default, ViewZOrder_1.ViewZorder.Dialog, null, null, data);
      };
      return UIHelp;
    }();
    exports.default = UIHelp;
    cc._RF.pop();
  }, {
    "../../data/const/ViewZOrder": "ViewZOrder",
    "../../manager/UIMng": "UIMng",
    "./tips/UIConfirmDialog": "UIConfirmDialog",
    "./tips/UITips": "UITips"
  } ],
  UIHistory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e90565+6R9CoaZb1Wxo1wov", "UIHistory");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIHistorye = function(_super) {
      __extends(UIHistorye, _super);
      function UIHistorye() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIHistorye.prototype.onUILoad = function() {};
      UIHistorye.prototype.onRegisterEvent = function() {};
      UIHistorye.prototype.unRegisterEvent = function() {};
      UIHistorye.prototype.onDestroy = function() {};
      UIHistorye.prefabUrl = "popup/lishijilu";
      UIHistorye.className = "UIHistorye";
      UIHistorye = __decorate([ ccclass, menu("UI/popup/UIHistorye") ], UIHistorye);
      return UIHistorye;
    }(UIBase_1.default);
    exports.default = UIHistorye;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  UILoading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0857cRtkQNC+JKB9xrjU+I1", "UILoading");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var auto_loading_1 = require("../../../data/autoui/scene/auto_loading");
    var UIBase_1 = require("../UIBase");
    var GameController_1 = require("../../../GameController");
    var EventMng_1 = require("../../../manager/EventMng");
    var EventConst_1 = require("../../../data/const/EventConst");
    var GameDataCenter_1 = require("../../../data/GameDataCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UILoading = function(_super) {
      __extends(UILoading, _super);
      function UILoading() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.num = 0;
        return _this;
      }
      UILoading.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_loading_1.default);
      };
      UILoading.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_login, this.onLogin, this);
        EventMng_1.default.on(EventConst_1.SocketEvent.SOCKET_OPEN, this.onSocketOpen, this);
      };
      UILoading.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_login, this.onLogin, this);
        EventMng_1.default.off(EventConst_1.SocketEvent.SOCKET_OPEN, this.onSocketOpen, this);
        EventMng_1.default.off(EventConst_1.GameEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);
      };
      UILoading.prototype.onStart = function() {
        GameController_1.default.init();
        GameController_1.default.network.connect();
      };
      UILoading.prototype.onSocketOpen = function() {
        this.ui.loginNode.active = true;
        var account = GameDataCenter_1.default.account.getAccount();
        "" != account && (this.ui.edit_account.getComponent(cc.EditBox).string = account);
      };
      UILoading.prototype.onLogin = function() {
        this.num++;
        var account = this.ui.edit_account.getComponent(cc.EditBox).string;
        var password = this.ui.edit_password.getComponent(cc.EditBox).string;
        this.num > 1 ? GameDataCenter_1.default.account.Login() : GameDataCenter_1.default.account.AccountCheck_Quest(11125661, "555555555555");
      };
      UILoading.prototype.onLoginSuccess = function() {
        cc.director.loadScene("battle");
      };
      UILoading.prefabUrl = "db://a";
      UILoading.className = "UILoading";
      UILoading = __decorate([ ccclass, menu("UI/scene/UILoading") ], UILoading);
      return UILoading;
    }(UIBase_1.default);
    exports.default = UILoading;
    cc._RF.pop();
  }, {
    "../../../GameController": "GameController",
    "../../../data/GameDataCenter": "GameDataCenter",
    "../../../data/autoui/scene/auto_loading": "auto_loading",
    "../../../data/const/EventConst": "EventConst",
    "../../../manager/EventMng": "EventMng",
    "../UIBase": "UIBase"
  } ],
  UILogin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "77644Mj43dCkptZ/tUBg3gx", "UILogin");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var UIHelp_1 = require("../UIHelp");
    var GameController_1 = require("../../../GameController");
    var auto_denglu_1 = require("../../../data/autoui/scene/auto_denglu");
    var UIRules_1 = require("../popup/UIRules");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UILogic = function(_super) {
      __extends(UILogic, _super);
      function UILogic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
      }
      UILogic.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_denglu_1.default);
      };
      UILogic.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_rules, this.onRules, this);
        this.addEventListener(this.ui.btn_signup, this.onSignup, this);
      };
      UILogic.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_rules, this.onRules, this);
        this.removeEventListener(this.ui.btn_rules, this.onSignup, this);
      };
      UILogic.prototype.onStart = function() {
        GameController_1.default.init();
      };
      UILogic.prototype.onSocketOpen = function() {};
      UILogic.prototype.onRules = function() {
        UIHelp_1.default.ShowUI(UIRules_1.default);
      };
      UILogic.prototype.onSignup = function() {
        cc.director.loadScene("zhujiemianUI");
      };
      UILogic.prefabUrl = "db://a";
      UILogic.className = "UILogic";
      UILogic = __decorate([ ccclass, menu("UI/scene/UILogic") ], UILogic);
      return UILogic;
    }(UIBase_1.default);
    exports.default = UILogic;
    cc._RF.pop();
  }, {
    "../../../GameController": "GameController",
    "../../../data/autoui/scene/auto_denglu": "auto_denglu",
    "../UIBase": "UIBase",
    "../UIHelp": "UIHelp",
    "../popup/UIRules": "UIRules"
  } ],
  UIMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "095acjxR4dMrLp13+/TROMD", "UIMng");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ViewZOrder_1 = require("../data/const/ViewZOrder");
    var UIMng = function() {
      function UIMng() {
        this.uiList = [];
      }
      UIMng.getInstance = function() {
        null == this.instance && (this.instance = new UIMng());
        return this.instance;
      };
      UIMng.prototype.openUI = function(uiClass, zOrder, callback, onProgress) {
        var _this = this;
        void 0 === zOrder && (zOrder = ViewZOrder_1.ViewZorder.UI);
        var args = [];
        for (var _i = 4; _i < arguments.length; _i++) args[_i - 4] = arguments[_i];
        if (this.getUI(uiClass)) {
          console.error("UIMng OpenUI 1: ui " + uiClass.getName() + " is already exist, please check");
          return;
        }
        cc.loader.loadRes(uiClass.getUrl(), function(completedCount, totalCount, item) {
          onProgress && onProgress(completedCount, totalCount, item);
        }, function(error, prefab) {
          if (error) {
            console.error("UIMng OpenUI: load ui error: " + error);
            return;
          }
          if (_this.getUI(uiClass)) {
            console.error("UIMng OpenUI 2: ui " + uiClass.getName() + " is already exist, please check");
            return;
          }
          var uiNode = cc.instantiate(prefab);
          var ui = uiNode.getComponent(uiClass);
          if (!ui) {
            console.error(uiClass.getUrl() + "\u6ca1\u6709\u7ed1\u5b9aUI\u811a\u672c!!!");
            return;
          }
          ui.init(args);
          var uiRoot = cc.director.getScene();
          if (!uiRoot) {
            console.error("\u5f53\u524d\u573a\u666f" + cc.director.getScene().name + "Canvas!!!");
            return;
          }
          uiNode.parent = uiRoot;
          uiNode.zIndex = zOrder;
          _this.uiList.push(ui);
          ui.tag = uiClass;
          callback && callback(ui);
        });
      };
      UIMng.prototype.clearDependsRes = function(prefabUrl) {
        var deps = cc.loader.getDependsRecursively(prefabUrl);
        deps.forEach(function(item) {});
      };
      UIMng.prototype.closeUI = function(uiClass) {
        for (var i = 0; i < this.uiList.length; ++i) if (this.uiList[i].tag === uiClass) {
          if (cc.isValid(this.uiList[i].node)) {
            this.uiList[i].node.destroy();
            this.clearDependsRes(uiClass.getUrl());
          }
          this.uiList.splice(i, 1);
          return;
        }
      };
      UIMng.prototype.closeAllUI = function() {
        if (0 == this.uiList.length) return;
        this.closeUI(this.uiList[0].tag);
        while (this.uiList.length > 0) this.closeUI(this.uiList[0].tag);
      };
      UIMng.prototype.showUI = function(uiClass, callback) {
        var ui = this.getUI(uiClass);
        if (!ui) {
          console.error("UIMng showUI: ui " + uiClass.getName() + " not exist");
          return;
        }
        ui.node.active = true;
      };
      UIMng.prototype.hideUI = function(uiClass) {
        var ui = this.getUI(uiClass);
        ui && (ui.node.active = false);
      };
      UIMng.prototype.getUI = function(uiClass) {
        for (var i = 0; i < this.uiList.length; ++i) if (this.uiList[i].tag === uiClass) return this.uiList[i];
        return null;
      };
      UIMng.prototype.isShowing = function(uiClass) {
        var ui = this.getUI(uiClass);
        if (!ui) return false;
        return ui.node.active;
      };
      return UIMng;
    }();
    exports.default = UIMng;
    cc._RF.pop();
  }, {
    "../data/const/ViewZOrder": "ViewZOrder"
  } ],
  UIMobileLogin: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e5f3d558xZFZJoliBoakBDw", "UIMobileLogin");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIMobileLogin = function(_super) {
      __extends(UIMobileLogin, _super);
      function UIMobileLogin() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIMobileLogin.prototype.onUILoad = function() {};
      UIMobileLogin.prototype.onRegisterEvent = function() {};
      UIMobileLogin.prototype.unRegisterEvent = function() {};
      UIMobileLogin.prototype.onDestroy = function() {};
      UIMobileLogin.prefabUrl = "popup/shoujidenglu";
      UIMobileLogin.className = "UIMobileLogin";
      UIMobileLogin = __decorate([ ccclass, menu("UI/popup/UIMobileLogin") ], UIMobileLogin);
      return UIMobileLogin;
    }(UIBase_1.default);
    exports.default = UIMobileLogin;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  UIPayment: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "54ea1wnWCVHVJP2wlZZNLkP", "UIPayment");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIPayment = function(_super) {
      __extends(UIPayment, _super);
      function UIPayment() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIPayment.prototype.onUILoad = function() {};
      UIPayment.prototype.onRegisterEvent = function() {};
      UIPayment.prototype.unRegisterEvent = function() {};
      UIPayment.prototype.onDestroy = function() {};
      UIPayment.prefabUrl = "popup/qianbao";
      UIPayment.className = "UIPayment";
      UIPayment = __decorate([ ccclass, menu("UI/popup/UIPayment") ], UIPayment);
      return UIPayment;
    }(UIBase_1.default);
    exports.default = UIPayment;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  UIRegistered: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8e4ebJqLnpM1KjykkzyYieN", "UIRegistered");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIRegistered = function(_super) {
      __extends(UIRegistered, _super);
      function UIRegistered() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIRegistered.prototype.onUILoad = function() {};
      UIRegistered.prototype.onRegisterEvent = function() {};
      UIRegistered.prototype.unRegisterEvent = function() {};
      UIRegistered.prototype.onDestroy = function() {};
      UIRegistered.prefabUrl = "db://a";
      UIRegistered.className = "UIRegistered";
      UIRegistered = __decorate([ ccclass, menu("UI/popup/UIRegistered") ], UIRegistered);
      return UIRegistered;
    }(UIBase_1.default);
    exports.default = UIRegistered;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  UIRegret: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1d7d2A+TiJJi7QhOy6gEKXY", "UIRegret");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIRegret = function(_super) {
      __extends(UIRegret, _super);
      function UIRegret() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
      }
      UIRegret.prototype.onUILoad = function() {};
      UIRegret.prototype.onRegisterEvent = function() {
        this.addEventListener(this.node, this.onClose, this);
      };
      UIRegret.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.node, this.onClose, this);
      };
      UIRegret.prototype.onClose = function() {
        cc.director.loadScene("denglu");
      };
      UIRegret.prefabUrl = "db://a";
      UIRegret.className = "UIRegret";
      UIRegret = __decorate([ ccclass, menu("UI/scene/UIRegret") ], UIRegret);
      return UIRegret;
    }(UIBase_1.default);
    exports.default = UIRegret;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  UIRest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f2876E1vZNN15OCgTQYG4fB", "UIRest");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIRest = function(_super) {
      __extends(UIRest, _super);
      function UIRest() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      UIRest.prototype.onUILoad = function() {};
      UIRest.prototype.onRegisterEvent = function() {};
      UIRest.prototype.unRegisterEvent = function() {};
      UIRest.prototype.onDestroy = function() {};
      UIRest.prefabUrl = "popup/quyu";
      UIRest.className = "UIRest";
      UIRest = __decorate([ ccclass, menu("UI/popup/UIRest") ], UIRest);
      return UIRest;
    }(UIBase_1.default);
    exports.default = UIRest;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  UIRules: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fcc06RpWelIN7ozwpcTKZU7", "UIRules");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var UIHelp_1 = require("../../../logic/ui/UIHelp");
    var auto_wanfa_1 = require("../../../data/autoui/popup/auto_wanfa");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIRules = function(_super) {
      __extends(UIRules, _super);
      function UIRules() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
      }
      UIRules_1 = UIRules;
      UIRules.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_wanfa_1.default);
      };
      UIRules.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
      };
      UIRules.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
      };
      UIRules.prototype.onClose = function() {
        UIHelp_1.default.CloseUI(UIRules_1);
      };
      var UIRules_1;
      UIRules.prefabUrl = "popup/wanfa";
      UIRules.className = "UIRules";
      UIRules = UIRules_1 = __decorate([ ccclass, menu("ui/popup/UIRules") ], UIRules);
      return UIRules;
    }(UIBase_1.default);
    exports.default = UIRules;
    cc._RF.pop();
  }, {
    "../../../data/autoui/popup/auto_wanfa": "auto_wanfa",
    "../../../logic/ui/UIHelp": "UIHelp",
    "../UIBase": "UIBase"
  } ],
  UITips: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fef06TGqzBP8aQeT33dU33i", "UITips");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var TipsItem_1 = require("./TipsItem");
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UITips = function(_super) {
      __extends(UITips, _super);
      function UITips() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.tipPrefab = null;
        _this.tipPool = [];
        return _this;
      }
      UITips.prototype.showTip = function(message) {
        for (var i = 0; i < this.tipPool.length; ++i) if (null != this.tipPool[i] && this.tipPool[i].isReady()) {
          this.tipPool[i].playTip(message);
          return;
        }
        var TipNode = cc.instantiate(this.tipPrefab);
        TipNode.parent = this.node;
        var tip = TipNode.getComponent(TipsItem_1.TipsItem);
        this.tipPool.push(tip);
        tip.playTip(message);
      };
      UITips.prototype.onClose = function() {};
      UITips.prefabUrl = "tips/tips";
      UITips.className = "UITips";
      __decorate([ property(cc.Prefab) ], UITips.prototype, "tipPrefab", void 0);
      UITips = __decorate([ ccclass, menu("UI/Common/UITips") ], UITips);
      return UITips;
    }(UIBase_1.default);
    exports.default = UITips;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase",
    "./TipsItem": "TipsItem"
  } ],
  UIVictory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fb08eumGxRKBaRmKV7/Htze", "UIVictory");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var UIBase_1 = require("../UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIVictory = function(_super) {
      __extends(UIVictory, _super);
      function UIVictory() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
      }
      UIVictory.prototype.onUILoad = function() {};
      UIVictory.prototype.onRegisterEvent = function() {
        this.addEventListener(this.node, this.onClose, this);
      };
      UIVictory.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.node, this.onClose, this);
      };
      UIVictory.prototype.onClose = function() {
        cc.director.loadScene("denglu");
      };
      UIVictory.prefabUrl = "db://a";
      UIVictory.className = "UIVictory";
      UIVictory = __decorate([ ccclass, menu("UI/scene/UIVictory") ], UIVictory);
      return UIVictory;
    }(UIBase_1.default);
    exports.default = UIVictory;
    cc._RF.pop();
  }, {
    "../UIBase": "UIBase"
  } ],
  Utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e76edi1l7JInK5swN3q4G6B", "Utils");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var Utils = function() {
      function Utils() {}
      Utils.prototype.GetHMS = function(times) {
        var hour = Math.floor(times / 3600);
        var residue = times - 3600 * hour;
        var minute = Math.floor(residue / 60);
        var second = residue - 60 * minute;
        var sHour = hour.toString();
        var sMinute = minute.toString();
        var sSecond = second.toString();
        hour < 10 && (sHour = "0" + hour);
        minute < 10 && (sMinute = "0" + minute);
        second < 10 && (sSecond = "0" + second);
        return [ sHour, sMinute, sSecond ];
      };
      return Utils;
    }();
    exports.default = new Utils();
    cc._RF.pop();
  }, {} ],
  ViewZOrder: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "026f09EFxlJc7qY4jXhS5L1", "ViewZOrder");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.ViewZorder = void 0;
    var ViewZorder = function() {
      function ViewZorder() {}
      ViewZorder.Scene = 20;
      ViewZorder.MenuPanel = 80;
      ViewZorder.UI = 100;
      ViewZorder.Dialog = 200;
      ViewZorder.Tips = 300;
      ViewZorder.Guide = 400;
      ViewZorder.Notice = 500;
      ViewZorder.Loading = 600;
      return ViewZorder;
    }();
    exports.ViewZorder = ViewZorder;
    cc._RF.pop();
  }, {} ],
  auto_confirmDialog: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ceaf8kfm59KI73jAQbzXf/Z", "auto_confirmDialog");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_confirmDialog = function(_super) {
      __extends(auto_confirmDialog, _super);
      function auto_confirmDialog() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_confirmDialog.prototype.onLoad = function() {
        this.confirmDialog = this.node;
        this.background = this.confirmDialog.getChildByName("background");
        this.lbl_title = this.confirmDialog.getChildByName("lbl_title");
        this.lbl_content = this.confirmDialog.getChildByName("lbl_content");
        this.btn_cancel = this.confirmDialog.getChildByName("btn_cancel");
        this.Background = this.btn_cancel.getChildByName("Background");
        this.Label = this.Background.getChildByName("Label");
        this.btn_certain = this.confirmDialog.getChildByName("btn_certain");
      };
      auto_confirmDialog.URL = "db://assets/resources/prefab/tips/confirmDialog.prefab";
      auto_confirmDialog = __decorate([ ccclass ], auto_confirmDialog);
      return auto_confirmDialog;
    }(cc.Component);
    exports.default = auto_confirmDialog;
    cc._RF.pop();
  }, {} ],
  auto_denglu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a9273tcd6VHXqzjsoyzqBMg", "auto_denglu");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_denglu = function(_super) {
      __extends(auto_denglu, _super);
      function auto_denglu() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_denglu.prototype.onLoad = function() {
        var parent = this.node.getParent();
        this.Canvas = parent.getChildByName("Canvas");
        this.denglubeijing_1 = this.Canvas.getChildByName("denglubeijing_1");
        this.denglu1 = this.Canvas.getChildByName("denglu1");
        this.denglu_spine = this.denglu1.getChildByName("denglu_spine");
        this.btn_history = this.denglu1.getChildByName("btn_history");
        this.btn_rules = this.denglu1.getChildByName("btn_rules");
        this.denglu_1_03_4 = this.denglu1.getChildByName("denglu_1_03_4");
        this.Node_3 = this.denglu1.getChildByName("Node_3");
        this.denglu_1_10_1 = this.Node_3.getChildByName("denglu_1_10_1");
        this.denglu_1_04_8 = this.Node_3.getChildByName("denglu_1_04_8");
        this.denglu_1_05_9 = this.Node_3.getChildByName("denglu_1_05_9");
        this.denglu_1_06_10 = this.Node_3.getChildByName("denglu_1_06_10");
        this.denglu_1_07_11 = this.Node_3.getChildByName("denglu_1_07_11");
        this.Node_2 = this.denglu1.getChildByName("Node_2");
        this.denglu_1_08_5 = this.Node_2.getChildByName("denglu_1_08_5");
        this.denglu_1_09_6 = this.Node_2.getChildByName("denglu_1_09_6");
        this.denglu_1_12_2 = this.Node_2.getChildByName("denglu_1_12_2");
        this.btn_signup = this.Node_2.getChildByName("btn_signup");
      };
      auto_denglu.URL = "db://assets/scene/denglu.fire";
      auto_denglu = __decorate([ ccclass ], auto_denglu);
      return auto_denglu;
    }(cc.Component);
    exports.default = auto_denglu;
    cc._RF.pop();
  }, {} ],
  auto_lishijilu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7af77mItKZNdoD61//M42f+", "auto_lishijilu");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_lishijilu = function(_super) {
      __extends(auto_lishijilu, _super);
      function auto_lishijilu() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_lishijilu.prototype.onLoad = function() {
        this.lishijilu = this.node;
        this.Image_1 = this.lishijilu.getChildByName("Image_1");
        this.denglu_2_04_14 = this.lishijilu.getChildByName("denglu_2_04_14");
        this.denglu_2_03_17 = this.lishijilu.getChildByName("denglu_2_03_17");
        this.denglu_2_02_16 = this.lishijilu.getChildByName("denglu_2_02_16");
        this.denglu_2_01_15 = this.lishijilu.getChildByName("denglu_2_01_15");
        this.denglu_6_01_49 = this.lishijilu.getChildByName("denglu_6_01_49");
      };
      auto_lishijilu.URL = "db://assets/resources/prefab/popup/lishijilu.prefab";
      auto_lishijilu = __decorate([ ccclass ], auto_lishijilu);
      return auto_lishijilu;
    }(cc.Component);
    exports.default = auto_lishijilu;
    cc._RF.pop();
  }, {} ],
  auto_loading: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "d79392KXWZGwpxQEqRuQ2dp", "auto_loading");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_loading = function(_super) {
      __extends(auto_loading, _super);
      function auto_loading() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_loading.prototype.onLoad = function() {
        var parent = this.node.getParent();
        this.Canvas = parent.getChildByName("Canvas");
        this.background = this.Canvas.getChildByName("background");
        this.lbl_title = this.Canvas.getChildByName("lbl_title");
        this.loginNode = this.Canvas.getChildByName("loginNode");
        this.lbl_account = this.loginNode.getChildByName("lbl_account");
        this.edit_account = this.lbl_account.getChildByName("edit_account");
        this.BACKGROUND_SPRITE = this.edit_account.getChildByName("BACKGROUND_SPRITE");
        this.TEXT_LABEL = this.edit_account.getChildByName("TEXT_LABEL");
        this.PLACEHOLDER_LABEL = this.edit_account.getChildByName("PLACEHOLDER_LABEL");
        this.lbl_password = this.loginNode.getChildByName("lbl_password");
        this.edit_password = this.lbl_password.getChildByName("edit_password");
        this.btn_login = this.loginNode.getChildByName("btn_login");
        this.lbl_login = this.btn_login.getChildByName("lbl_login");
      };
      auto_loading.URL = "db://assets/scene/loading.fire";
      auto_loading = __decorate([ ccclass ], auto_loading);
      return auto_loading;
    }(cc.Component);
    exports.default = auto_loading;
    cc._RF.pop();
  }, {} ],
  auto_qianbao: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cb5e0S4ejZAaKEhIKkJ38W9", "auto_qianbao");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_qianbao = function(_super) {
      __extends(auto_qianbao, _super);
      function auto_qianbao() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_qianbao.prototype.onLoad = function() {
        this.qianbao = this.node;
        this.Image_1 = this.qianbao.getChildByName("Image_1");
        this.denglu_2_04_14 = this.qianbao.getChildByName("denglu_2_04_14");
        this.denglu_3_08_13 = this.qianbao.getChildByName("denglu_3_08_13");
        this.denglu_3_06_12 = this.qianbao.getChildByName("denglu_3_06_12");
        this.denglu_3_05_11 = this.qianbao.getChildByName("denglu_3_05_11");
        this.denglu_3_04_10 = this.qianbao.getChildByName("denglu_3_04_10");
        this.denglu_3_03_9 = this.qianbao.getChildByName("denglu_3_03_9");
        this.denglu_3_02_8 = this.qianbao.getChildByName("denglu_3_02_8");
        this.denglu_3_01_7 = this.qianbao.getChildByName("denglu_3_01_7");
        this.denglu_3_11_4 = this.qianbao.getChildByName("denglu_3_11_4");
        this.denglu_3_10_3 = this.qianbao.getChildByName("denglu_3_10_3");
      };
      auto_qianbao.URL = "db://assets/resources/prefab/popup/qianbao.prefab";
      auto_qianbao = __decorate([ ccclass ], auto_qianbao);
      return auto_qianbao;
    }(cc.Component);
    exports.default = auto_qianbao;
    cc._RF.pop();
  }, {} ],
  auto_quyu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "662baY9AKFPB7FkziyrZYRZ", "auto_quyu");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_quyu = function(_super) {
      __extends(auto_quyu, _super);
      function auto_quyu() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_quyu.prototype.onLoad = function() {
        this.quyu = this.node;
        this.Image_1 = this.quyu.getChildByName("Image_1");
        this.denglu_2_04_14 = this.quyu.getChildByName("denglu_2_04_14");
        this.denglu_5_03_36 = this.quyu.getChildByName("denglu_5_03_36");
        this.denglu_5_02_35 = this.quyu.getChildByName("denglu_5_02_35");
        this.denglu_5_01_34 = this.quyu.getChildByName("denglu_5_01_34");
        this.denglu_5_06_6 = this.quyu.getChildByName("denglu_5_06_6");
        this.denglu_5_06_6_0 = this.quyu.getChildByName("denglu_5_06_6_0");
        this.denglu_5_05_5 = this.quyu.getChildByName("denglu_5_05_5");
      };
      auto_quyu.URL = "db://assets/resources/prefab/popup/quyu.prefab";
      auto_quyu = __decorate([ ccclass ], auto_quyu);
      return auto_quyu;
    }(cc.Component);
    exports.default = auto_quyu;
    cc._RF.pop();
  }, {} ],
  auto_regret: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1db52DhTspPQb8zYlV3YQlh", "auto_regret");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_regret = function(_super) {
      __extends(auto_regret, _super);
      function auto_regret() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_regret.prototype.onLoad = function() {
        var parent = this.node.getParent();
        this.Canvas = parent.getChildByName("Canvas");
        this.ZQJ_js_14_1 = this.Canvas.getChildByName("ZQJ_js_14_1");
        this.ZQJ_js_01_4 = this.Canvas.getChildByName("ZQJ_js_01_4");
        this.ZQJ_js_09_1 = this.Canvas.getChildByName("ZQJ_js_09_1");
        this.ZQJ_js_04_4 = this.Canvas.getChildByName("ZQJ_js_04_4");
        this.ZQJ_js_03_5 = this.Canvas.getChildByName("ZQJ_js_03_5");
        this.ZQJ_js_02_6 = this.Canvas.getChildByName("ZQJ_js_02_6");
        this.ZQJ_js_10_1 = this.Canvas.getChildByName("ZQJ_js_10_1");
        this.Node_1 = this.Canvas.getChildByName("Node_1");
        this.ZQJ_js_08_3 = this.Node_1.getChildByName("ZQJ_js_08_3");
        this.ZQJ_js_07_2_5_2_0 = this.Node_1.getChildByName("ZQJ_js_07_2_5_2_0");
        this.ZQJ_js_07_2_5_2 = this.Node_1.getChildByName("ZQJ_js_07_2_5_2");
        this.ZQJ_js_07_2_5_1 = this.Node_1.getChildByName("ZQJ_js_07_2_5_1");
        this.ZQJ_js_07_2_5_0 = this.Node_1.getChildByName("ZQJ_js_07_2_5_0");
        this.ZQJ_js_07_2_5 = this.Node_1.getChildByName("ZQJ_js_07_2_5");
        this.ZQJ_js_07_2 = this.Node_1.getChildByName("ZQJ_js_07_2");
        this.ZQJ_js_07_2_0 = this.Node_1.getChildByName("ZQJ_js_07_2_0");
        this.ZQJ_js_07_2_1 = this.Node_1.getChildByName("ZQJ_js_07_2_1");
        this.ZQJ_js_07_2_2 = this.Node_1.getChildByName("ZQJ_js_07_2_2");
        this.ZQJ_js_07_2_3 = this.Node_1.getChildByName("ZQJ_js_07_2_3");
        this.ZQJ_js_06_3 = this.Node_1.getChildByName("ZQJ_js_06_3");
        this.ZQJ_js_06_3_0_0 = this.Node_1.getChildByName("ZQJ_js_06_3_0_0");
        this.ZQJ_js_06_3_0 = this.Node_1.getChildByName("ZQJ_js_06_3_0");
        this.ZQJ_js_06_3_1 = this.Node_1.getChildByName("ZQJ_js_06_3_1");
        this.ZQJ_js_06_3_2 = this.Node_1.getChildByName("ZQJ_js_06_3_2");
        this.ZQJ_js_06_3_3 = this.Node_1.getChildByName("ZQJ_js_06_3_3");
        this.ZQJ_js_06_3_4 = this.Node_1.getChildByName("ZQJ_js_06_3_4");
        this.ZQJ_js_06_3_4_0 = this.Node_1.getChildByName("ZQJ_js_06_3_4_0");
        this.ZQJ_js_06_3_4_1 = this.Node_1.getChildByName("ZQJ_js_06_3_4_1");
        this.ZQJ_js_06_3_4_2 = this.Node_1.getChildByName("ZQJ_js_06_3_4_2");
        this.ZQJ_js_06_3_4_2_0 = this.Node_1.getChildByName("ZQJ_js_06_3_4_2_0");
      };
      auto_regret.URL = "db://assets/scene/regret.fire";
      auto_regret = __decorate([ ccclass ], auto_regret);
      return auto_regret;
    }(cc.Component);
    exports.default = auto_regret;
    cc._RF.pop();
  }, {} ],
  auto_shoujidenglu: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "75249at1QFAI6lDBDlxDhoX", "auto_shoujidenglu");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_shoujidenglu = function(_super) {
      __extends(auto_shoujidenglu, _super);
      function auto_shoujidenglu() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_shoujidenglu.prototype.onLoad = function() {
        this.shoujidenglu = this.node;
        this.Image_1 = this.shoujidenglu.getChildByName("Image_1");
        this.denglu_2_04_14 = this.shoujidenglu.getChildByName("denglu_2_04_14");
        this.denglu_7_07_19 = this.shoujidenglu.getChildByName("denglu_7_07_19");
        this.denglu_7_07_19_0 = this.shoujidenglu.getChildByName("denglu_7_07_19_0");
        this.denglu_7_06_18 = this.shoujidenglu.getChildByName("denglu_7_06_18");
        this.denglu_7_05_17 = this.shoujidenglu.getChildByName("denglu_7_05_17");
        this.denglu_7_04_16 = this.shoujidenglu.getChildByName("denglu_7_04_16");
        this.denglu_7_03_15 = this.shoujidenglu.getChildByName("denglu_7_03_15");
        this.denglu_7_02_14 = this.shoujidenglu.getChildByName("denglu_7_02_14");
        this.denglu_7_01_13 = this.shoujidenglu.getChildByName("denglu_7_01_13");
      };
      auto_shoujidenglu.URL = "db://assets/resources/prefab/popup/shoujidenglu.prefab";
      auto_shoujidenglu = __decorate([ ccclass ], auto_shoujidenglu);
      return auto_shoujidenglu;
    }(cc.Component);
    exports.default = auto_shoujidenglu;
    cc._RF.pop();
  }, {} ],
  auto_tipsItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ac685Xh+FVMwZTcBlmS5d6i", "auto_tipsItem");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_tipsItem = function(_super) {
      __extends(auto_tipsItem, _super);
      function auto_tipsItem() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_tipsItem.prototype.onLoad = function() {
        this.tipsItem = this.node;
        this.TipsBg = this.tipsItem.getChildByName("TipsBg");
        this.Label = this.TipsBg.getChildByName("Label");
      };
      auto_tipsItem.URL = "db://assets/resources/prefab/tips/tipsItem.prefab";
      auto_tipsItem = __decorate([ ccclass ], auto_tipsItem);
      return auto_tipsItem;
    }(cc.Component);
    exports.default = auto_tipsItem;
    cc._RF.pop();
  }, {} ],
  auto_tips: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52aa4+jpEBNj7LS0ejWzlR9", "auto_tips");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_tips = function(_super) {
      __extends(auto_tips, _super);
      function auto_tips() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_tips.prototype.onLoad = function() {
        this.tips = this.node;
      };
      auto_tips.URL = "db://assets/resources/prefab/tips/tips.prefab";
      auto_tips = __decorate([ ccclass ], auto_tips);
      return auto_tips;
    }(cc.Component);
    exports.default = auto_tips;
    cc._RF.pop();
  }, {} ],
  auto_victory: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "dde6e41AddNP4Ni7c1Zp89K", "auto_victory");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_victory = function(_super) {
      __extends(auto_victory, _super);
      function auto_victory() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_victory.prototype.onLoad = function() {
        var parent = this.node.getParent();
        this.Canvas = parent.getChildByName("Canvas");
        this.ZQJ_js_14_1 = this.Canvas.getChildByName("ZQJ_js_14_1");
        this.ZQJ_js_01_4 = this.Canvas.getChildByName("ZQJ_js_01_4");
        this.ZQJ_js_09_1 = this.Canvas.getChildByName("ZQJ_js_09_1");
        this.ZQJ_js_04_4 = this.Canvas.getChildByName("ZQJ_js_04_4");
        this.ZQJ_js_03_5 = this.Canvas.getChildByName("ZQJ_js_03_5");
        this.ZQJ_js_02_6 = this.Canvas.getChildByName("ZQJ_js_02_6");
        this.ZQJ_js_05_7 = this.Canvas.getChildByName("ZQJ_js_05_7");
        this.Node_1 = this.Canvas.getChildByName("Node_1");
        this.ZQJ_js_08_3 = this.Node_1.getChildByName("ZQJ_js_08_3");
        this.ZQJ_js_07_2_5_2_0 = this.Node_1.getChildByName("ZQJ_js_07_2_5_2_0");
        this.ZQJ_js_07_2_5_2 = this.Node_1.getChildByName("ZQJ_js_07_2_5_2");
        this.ZQJ_js_07_2_5_1 = this.Node_1.getChildByName("ZQJ_js_07_2_5_1");
        this.ZQJ_js_07_2_5_0 = this.Node_1.getChildByName("ZQJ_js_07_2_5_0");
        this.ZQJ_js_07_2_5 = this.Node_1.getChildByName("ZQJ_js_07_2_5");
        this.ZQJ_js_07_2 = this.Node_1.getChildByName("ZQJ_js_07_2");
        this.ZQJ_js_07_2_0 = this.Node_1.getChildByName("ZQJ_js_07_2_0");
        this.ZQJ_js_07_2_1 = this.Node_1.getChildByName("ZQJ_js_07_2_1");
        this.ZQJ_js_07_2_2 = this.Node_1.getChildByName("ZQJ_js_07_2_2");
        this.ZQJ_js_07_2_3 = this.Node_1.getChildByName("ZQJ_js_07_2_3");
        this.ZQJ_js_06_3 = this.Node_1.getChildByName("ZQJ_js_06_3");
        this.ZQJ_js_06_3_0_0 = this.Node_1.getChildByName("ZQJ_js_06_3_0_0");
        this.ZQJ_js_06_3_0 = this.Node_1.getChildByName("ZQJ_js_06_3_0");
        this.ZQJ_js_06_3_1 = this.Node_1.getChildByName("ZQJ_js_06_3_1");
        this.ZQJ_js_06_3_2 = this.Node_1.getChildByName("ZQJ_js_06_3_2");
        this.ZQJ_js_06_3_3 = this.Node_1.getChildByName("ZQJ_js_06_3_3");
        this.ZQJ_js_06_3_4 = this.Node_1.getChildByName("ZQJ_js_06_3_4");
        this.ZQJ_js_06_3_4_0 = this.Node_1.getChildByName("ZQJ_js_06_3_4_0");
        this.ZQJ_js_06_3_4_1 = this.Node_1.getChildByName("ZQJ_js_06_3_4_1");
        this.ZQJ_js_06_3_4_2 = this.Node_1.getChildByName("ZQJ_js_06_3_4_2");
        this.ZQJ_js_06_3_4_2_0 = this.Node_1.getChildByName("ZQJ_js_06_3_4_2_0");
      };
      auto_victory.URL = "db://assets/scene/victory.fire";
      auto_victory = __decorate([ ccclass ], auto_victory);
      return auto_victory;
    }(cc.Component);
    exports.default = auto_victory;
    cc._RF.pop();
  }, {} ],
  auto_wanfa: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "149e29fFrdP4IgUuCM7Vn7A", "auto_wanfa");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_wanfa = function(_super) {
      __extends(auto_wanfa, _super);
      function auto_wanfa() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_wanfa.prototype.onLoad = function() {
        this.wanfa = this.node;
        this.Image_1 = this.wanfa.getChildByName("Image_1");
        this.denglu_2_06_18 = this.wanfa.getChildByName("denglu_2_06_18");
        this.btn_close = this.wanfa.getChildByName("btn_close");
        this.denglu_2_03_17 = this.wanfa.getChildByName("denglu_2_03_17");
        this.denglu_2_02_16 = this.wanfa.getChildByName("denglu_2_02_16");
        this.denglu_2_01_15 = this.wanfa.getChildByName("denglu_2_01_15");
        this.denglu_2_07_19 = this.wanfa.getChildByName("denglu_2_07_19");
        this.PageView = this.wanfa.getChildByName("PageView");
        this.background = this.PageView.getChildByName("background");
        this.view = this.PageView.getChildByName("view");
        this.content = this.view.getChildByName("content");
        this.page_1 = this.content.getChildByName("page_1");
        this.page_2 = this.content.getChildByName("page_2");
        this.page_3 = this.content.getChildByName("page_3");
        this.indicator = this.PageView.getChildByName("indicator");
      };
      auto_wanfa.URL = "db://assets/resources/prefab/popup/wanfa.prefab";
      auto_wanfa = __decorate([ ccclass ], auto_wanfa);
      return auto_wanfa;
    }(cc.Component);
    exports.default = auto_wanfa;
    cc._RF.pop();
  }, {} ],
  auto_xuanzhe: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "591a65wIFhNGq/5BqoHG6mF", "auto_xuanzhe");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_xuanzhe = function(_super) {
      __extends(auto_xuanzhe, _super);
      function auto_xuanzhe() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_xuanzhe.prototype.onLoad = function() {
        this.xuanzhe = this.node;
        this.Image_1 = this.xuanzhe.getChildByName("Image_1");
        this.denglu_2_04_14 = this.xuanzhe.getChildByName("denglu_2_04_14");
        this.denglu_2_03_17 = this.xuanzhe.getChildByName("denglu_2_03_17");
        this.denglu_2_02_16 = this.xuanzhe.getChildByName("denglu_2_02_16");
        this.denglu_4_04_24 = this.xuanzhe.getChildByName("denglu_4_04_24");
        this.denglu_4_02_22 = this.xuanzhe.getChildByName("denglu_4_02_22");
        this.denglu_4_01_21 = this.xuanzhe.getChildByName("denglu_4_01_21");
        this.denglu_4_03_23 = this.xuanzhe.getChildByName("denglu_4_03_23");
        this.denglu_4_03_23_0 = this.xuanzhe.getChildByName("denglu_4_03_23_0");
        this.denglu_4_03_23_1 = this.xuanzhe.getChildByName("denglu_4_03_23_1");
        this.denglu_4_03_23_0_0 = this.xuanzhe.getChildByName("denglu_4_03_23_0_0");
      };
      auto_xuanzhe.URL = "db://assets/resources/prefab/popup/xuanzhe.prefab";
      auto_xuanzhe = __decorate([ ccclass ], auto_xuanzhe);
      return auto_xuanzhe;
    }(cc.Component);
    exports.default = auto_xuanzhe;
    cc._RF.pop();
  }, {} ],
  auto_zhucejiemian: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c41f0pPYQpEwqwGSB9erV/b", "auto_zhucejiemian");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_zhucejiemian = function(_super) {
      __extends(auto_zhucejiemian, _super);
      function auto_zhucejiemian() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_zhucejiemian.prototype.onLoad = function() {
        this.zhucejiemian = this.node;
        this.Image_1 = this.zhucejiemian.getChildByName("Image_1");
        this.denglu_2_04_14 = this.zhucejiemian.getChildByName("denglu_2_04_14");
        this.denglu_7_07_19 = this.zhucejiemian.getChildByName("denglu_7_07_19");
        this.denglu_7_07_19_0 = this.zhucejiemian.getChildByName("denglu_7_07_19_0");
        this.denglu_7_06_18 = this.zhucejiemian.getChildByName("denglu_7_06_18");
        this.denglu_7_02_14 = this.zhucejiemian.getChildByName("denglu_7_02_14");
        this.denglu_7_01_13 = this.zhucejiemian.getChildByName("denglu_7_01_13");
        this.denglu_7_07_19_0_0 = this.zhucejiemian.getChildByName("denglu_7_07_19_0_0");
        this.denglu_7_01_13_0 = this.zhucejiemian.getChildByName("denglu_7_01_13_0");
        this.denglu_8_05_7 = this.zhucejiemian.getChildByName("denglu_8_05_7");
        this.denglu_8_04_6 = this.zhucejiemian.getChildByName("denglu_8_04_6");
        this.denglu_8_03_5 = this.zhucejiemian.getChildByName("denglu_8_03_5");
        this.denglu_8_02_4 = this.zhucejiemian.getChildByName("denglu_8_02_4");
        this.denglu_8_01_3 = this.zhucejiemian.getChildByName("denglu_8_01_3");
      };
      auto_zhucejiemian.URL = "db://assets/resources/prefab/popup/zhucejiemian.prefab";
      auto_zhucejiemian = __decorate([ ccclass ], auto_zhucejiemian);
      return auto_zhucejiemian;
    }(cc.Component);
    exports.default = auto_zhucejiemian;
    cc._RF.pop();
  }, {} ],
  auto_zhujiemianUI: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b4d70nPYtZBsI8IrhZyBQjn", "auto_zhujiemianUI");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) b.hasOwnProperty(p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ccclass = cc._decorator.ccclass;
    var auto_zhujiemianUI = function(_super) {
      __extends(auto_zhujiemianUI, _super);
      function auto_zhujiemianUI() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_zhujiemianUI.prototype.onLoad = function() {
        var parent = this.node.getParent();
        this.Canvas = parent.getChildByName("Canvas");
        this.XQ_hei = this.Canvas.getChildByName("XQ_hei");
        this.XQ_hong = this.Canvas.getChildByName("XQ_hong");
        this.XQ_lan = this.Canvas.getChildByName("XQ_lan");
        this.XQ_lv = this.Canvas.getChildByName("XQ_lv");
        this.XQ_zi = this.Canvas.getChildByName("XQ_zi");
        this.chongdong = this.Canvas.getChildByName("chongdong");
        this.chuanyue = this.Canvas.getChildByName("chuanyue");
        this.feidie = this.Canvas.getChildByName("feidie");
        this.ZJMUI_1_3 = this.Canvas.getChildByName("ZJMUI_1_3");
        this.CountDown = this.ZJMUI_1_3.getChildByName("CountDown");
        this.ZJMUI_2_4 = this.Canvas.getChildByName("ZJMUI_2_4");
        this.Sprite_9 = this.Canvas.getChildByName("Sprite_9");
        this.Hours = this.Canvas.getChildByName("Hours");
        this.Sprite_9_0_1 = this.Hours.getChildByName("Sprite_9_0_1");
        this.Minutes = this.Sprite_9_0_1.getChildByName("Minutes");
        this.Sprite_9_0_2 = this.Minutes.getChildByName("Sprite_9_0_2");
        this.Seconds = this.Sprite_9_0_2.getChildByName("Seconds");
        this.Sprite_9_0 = this.Canvas.getChildByName("Sprite_9_0");
        this.People = this.Canvas.getChildByName("People");
      };
      auto_zhujiemianUI.URL = "db://assets/scene/zhujiemianUI.fire";
      auto_zhujiemianUI = __decorate([ ccclass ], auto_zhujiemianUI);
      return auto_zhujiemianUI;
    }(cc.Component);
    exports.default = auto_zhujiemianUI;
    cc._RF.pop();
  }, {} ]
}, {}, [ "GameController", "GameDataCenter", "auto_lishijilu", "auto_qianbao", "auto_quyu", "auto_shoujidenglu", "auto_wanfa", "auto_xuanzhe", "auto_zhucejiemian", "auto_denglu", "auto_loading", "auto_regret", "auto_victory", "auto_zhujiemianUI", "auto_confirmDialog", "auto_tips", "auto_tipsItem", "EventConst", "ViewZOrder", "BattleModel", "IDataModel", "SystemModel", "UIBase", "UIHelp", "UIChoose", "UIHistory", "UIMobileLogin", "UIPayment", "UIRegistered", "UIRest", "UIRules", "PlayerControl", "UIBattle", "UILoading", "UILogin", "UIRegret", "UIVictory", "TipsItem", "UIConfirmDialog", "UITips", "EventMng", "UIMng", "Log", "SingletonFactory", "Utils" ]);
//# sourceMappingURL=index.js.map
