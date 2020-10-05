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
  AccountModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "548cc5uzDdMRojsyhsZT44X", "AccountModel");
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
    var IDataModel_1 = require("../base/IDataModel");
    var UIHelp_1 = require("../utils/UIHelp");
    var EventMng_1 = require("../manager/EventMng");
    var EventConst_1 = require("../utils/EventConst");
    var proto_1 = require("../data/protobuf/proto");
    var Log_1 = require("../utils/Log");
    var GameController_1 = require("../GameController");
    var GameDataCenter_1 = require("../manager/GameDataCenter");
    var UIMobileLogin_1 = require("../ui/popup/UIMobileLogin");
    var UIRegistered_1 = require("../ui/popup/UIRegistered");
    var KEY_USERNAME = "username";
    var KEY_PASSWORD = "password";
    var AccountModel = function(_super) {
      __extends(AccountModel, _super);
      function AccountModel() {
        var _this = _super.call(this, "account") || this;
        _this.account_id = "";
        _this.username = "";
        _this.password = "";
        _this.name = "";
        _this.checkCode = "";
        _this.player_guid = 0;
        _this.money = 0;
        _this.score = 0;
        _this.isChangeUrl = false;
        _this.isChangeUser = false;
        _this.isLoginSuccessful = false;
        _this.joinGameIdList = [];
        _this.historyList = new Array();
        return _this;
      }
      AccountModel.prototype.saveUserName = function(name) {
        this.Set(KEY_USERNAME, name);
        this.Save();
      };
      AccountModel.prototype.getUserName = function() {
        return this.Query(KEY_USERNAME, "");
      };
      AccountModel.prototype.savePassword = function(password) {
        this.Set(KEY_PASSWORD, password);
        this.Save();
      };
      AccountModel.prototype.getPassword = function() {
        return this.Query(KEY_PASSWORD, "");
      };
      AccountModel.prototype.getAccountID = function() {
        return this.account_id;
      };
      AccountModel.prototype.setName = function(name) {
        this.name = name;
      };
      AccountModel.prototype.getName = function() {
        return this.name;
      };
      AccountModel.prototype.getPlayerGuid = function() {
        return this.player_guid;
      };
      AccountModel.prototype.getMoney = function() {
        return this.money;
      };
      AccountModel.prototype.getScore = function() {
        return this.score;
      };
      AccountModel.prototype.setIsChangeUrl = function(value) {
        this.isChangeUrl = value;
      };
      AccountModel.prototype.getIsChangeUrl = function() {
        return this.isChangeUrl;
      };
      AccountModel.prototype.setIsChangeUser = function(value) {
        this.isChangeUser = value;
      };
      AccountModel.prototype.getIsChangeUser = function() {
        return this.isChangeUser;
      };
      AccountModel.prototype.setIsLoginSuccessful = function(value) {
        this.isLoginSuccessful = value;
      };
      AccountModel.prototype.getIsLoginSuccessful = function() {
        return this.isLoginSuccessful;
      };
      AccountModel.prototype.addJoninGameID = function(id) {
        -1 == this.joinGameIdList.indexOf(id) && this.joinGameIdList.push(id);
      };
      AccountModel.prototype.getJoninGameIDList = function() {
        return this.joinGameIdList;
      };
      AccountModel.prototype.getJoninGameID = function() {
        if (this.joinGameIdList.length <= 0) return 0;
        var list = [];
        this.joinGameIdList.forEach(function(val) {
          var gamelist = GameDataCenter_1.default.battle.GetGameList();
          gamelist[val] && 1 == gamelist[val].State && gamelist[val].Second > 0 && list.push(val);
        });
        if (0 == list.length) return 0;
        if (1 == list.length) return list[0];
        list.sort(function(a, b) {
          return a - b;
        });
        return list[0];
      };
      AccountModel.prototype.getHistoryList = function() {
        return this.historyList;
      };
      AccountModel.prototype.getMessageListeners = function() {
        var _a;
        var _this = this;
        return _a = {}, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_AccountRegister_Resp]] = function(data) {
          _this.AccountRegister_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_AccountLogin_Resp]] = function(data) {
          _this.AccountLogin_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_AccountCheck_Resp]] = function(data) {
          _this.AccountCheck_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_PlayerLogin_Resp]] = function(data) {
          _this.PlayerLogin_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_LoginFlowFinish_Resp]] = function(data) {
          _this.LoginFlowFinish_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_GameChangeName_Resp]] = function(data) {
          _this.GameChangeName_Resp(data);
        }, _a;
      };
      AccountModel.prototype.AccountRegister_Quest = function(name, password) {
        UIHelp_1.default.ShowHideCircleView(true);
        console.log("======AccountRegister_Quest", proto_1.msg.eMsgID.eMsg_AccountRegister_Quest);
        var register = proto_1.msg.AccountRegister_Quest.create();
        register.name = name;
        register.password = password;
        var messagebuf = proto_1.msg.AccountRegister_Quest.encode(register).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_AccountRegister_Quest);
      };
      AccountModel.prototype.AccountRegister_Resp = function(data) {
        var message = proto_1.msg.AccountRegister_Resp.decode(data);
        console.log("======\u6ce8\u518cAccountRegister_Resp", message.result);
        switch (message.result) {
         case 0:
          UIHelp_1.default.ShowTips("Registered successfully");
          UIHelp_1.default.CloseUI(UIRegistered_1.default);
          break;

         case 1:
          EventMng_1.default.emit(EventConst_1.GameEvent.REGISTEREDRESULT, "The user name already exists");
          break;

         case 2:
          EventMng_1.default.emit(EventConst_1.GameEvent.REGISTEREDRESULT, "Contains illegal characters");
          break;

         case 3:
          EventMng_1.default.emit(EventConst_1.GameEvent.REGISTEREDRESULT, "The user name or password is too long");
        }
        UIHelp_1.default.ShowHideCircleView(false);
      };
      AccountModel.prototype.AccountLogin_Quest = function(name, password) {
        UIHelp_1.default.ShowHideCircleView(true);
        console.log("======\u767b\u9646AccountLogin_Quest", proto_1.msg.eMsgID.eMsg_AccountLogin_Quest);
        var login = proto_1.msg.AccountLogin_Quest.create();
        login.name = name;
        login.password = password;
        this.username = name;
        this.password = password;
        var messagebuf = proto_1.msg.AccountLogin_Quest.encode(login).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_AccountLogin_Quest);
      };
      AccountModel.prototype.AccountLogin_Resp = function(data) {
        var message = proto_1.msg.AccountLogin_Resp.decode(data);
        console.log("======AccountLogin_Resp", message.result);
        switch (message.result) {
         case 0:
          break;

         case 1:
          EventMng_1.default.emit(EventConst_1.GameEvent.LOGINRESULT, "The user name already exists");
          break;

         case 2:
          EventMng_1.default.emit(EventConst_1.GameEvent.LOGINRESULT, "Contains illegal characters");
          break;

         case 3:
          EventMng_1.default.emit(EventConst_1.GameEvent.LOGINRESULT, "The user name or password is too long");
        }
      };
      AccountModel.prototype.AccountCheck_Quest = function(account, session_key) {
        UIHelp_1.default.ShowHideCircleView(true);
        var check = proto_1.msg.AccountCheck_Quest.create();
        check.accountId = account;
        check.sessionKey = session_key;
        var messagebuf = proto_1.msg.AccountCheck_Quest.encode(check).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_AccountCheck_Quest);
      };
      AccountModel.prototype.AccountCheck_Resp = function(data) {
        this.isChangeUrl = true;
        var message = proto_1.msg.AccountCheck_Resp.decode(data);
        this.account_id = message.accountId;
        this.checkCode = message.checkCode;
        console.log("=======" + message.ip);
        console.log("=======" + message.port);
        Log_1.Log.log(Log_1.LOG_TAG.debug, message.accountId.toString());
        console.log("account_id=======" + message.accountId);
        console.log("checkCode=======" + message.checkCode);
        var url = "ws://18.222.196.207:7101";
        GameController_1.default.network.connect(url);
      };
      AccountModel.prototype.PlayerLogin_Quest = function() {
        UIHelp_1.default.ShowHideCircleView(true);
        console.log("=======PlayerLogin_Quest");
        var login = proto_1.msg.PlayerLogin_Quest.create();
        login.accountId = this.account_id;
        login.checkOutCode = this.checkCode;
        var messagebuf = proto_1.msg.PlayerLogin_Quest.encode(login).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_PlayerLogin_Quest);
      };
      AccountModel.prototype.PlayerLogin_Resp = function(data) {
        console.log("=======PlayerLogin_Resp");
        var message = proto_1.msg.PlayerLogin_Resp.decode(data);
        if (1 == message.result) {
          UIHelp_1.default.ShowTips("Login successful");
          EventMng_1.default.emit(EventConst_1.GameEvent.LOGIN_SUCCESS);
        } else UIHelp_1.default.ShowTips("Login failed");
      };
      AccountModel.prototype.LoginFlowFinish_Resp = function(data) {
        this.saveUserName(this.username);
        this.savePassword(this.password);
        this.isLoginSuccessful = true;
        var message = proto_1.msg.LoginFlowFinish_Resp.decode(data);
        this.player_guid = message.playerGuid;
        GameDataCenter_1.default.serverping.setServerTime(message.time);
        this.name = message.name;
        this.money = message.money;
        this.score = message.score;
        this.joinGameIdList = message.joinGameId;
        for (var index = 0; index < message.historyGuid.length; index++) {
          var guid = message.historyGuid[index];
          if (this.historyList[guid]) {
            this.historyList[guid].Guid = guid;
            this.historyList[guid].Time = message.historyTime[index];
            this.historyList[guid].Cout = message.historyCount[index];
            this.historyList[guid].Rank = message.historyRank[index];
            this.historyList[guid].Name = message.historyFirst[index];
          } else {
            var newInfo = {
              Guid: guid,
              Time: message.historyTime[index],
              Count: message.historyCount[index],
              Rank: message.historyRank[index],
              Name: message.historyFirst[index]
            };
            this.historyList[guid] = newInfo;
          }
        }
        UIHelp_1.default.ShowHideCircleView(false);
        UIHelp_1.default.CloseUI(UIMobileLogin_1.default);
        EventMng_1.default.emit(EventConst_1.GameEvent.LOGIN_SUCCESS);
        console.log("=======LoginFlowFinish_Resp");
        console.log("=======player_guid", this.player_guid);
        console.log("=======time", message.time);
      };
      AccountModel.prototype.GameChangeName_Quest = function(name) {
        UIHelp_1.default.ShowHideCircleView(true);
        console.log("=======GameChangeName_Quest");
        var changeName = proto_1.msg.GameChangeName_Quest.create();
        changeName.name = name;
        var messagebuf = proto_1.msg.GameChangeName_Quest.encode(changeName).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_PlayerLogin_Quest);
      };
      AccountModel.prototype.GameChangeName_Resp = function(data) {
        var message = proto_1.msg.GameChangeName_Resp.decode(data);
        switch (message.result) {
         case 0:
          EventMng_1.default.emit(EventConst_1.GameEvent.CHANGENAME);
          break;

         case 1:
          EventMng_1.default.emit(EventConst_1.GameEvent.CHANGENAMERESULT, "Contains illegal characters");
          break;

         case 2:
          EventMng_1.default.emit(EventConst_1.GameEvent.CHANGENAMERESULT, "failed");
        }
        UIHelp_1.default.ShowHideCircleView(false);
      };
      return AccountModel;
    }(IDataModel_1.default);
    exports.default = AccountModel;
    cc._RF.pop();
  }, {
    "../GameController": "GameController",
    "../base/IDataModel": "IDataModel",
    "../data/protobuf/proto": "proto",
    "../manager/EventMng": "EventMng",
    "../manager/GameDataCenter": "GameDataCenter",
    "../ui/popup/UIMobileLogin": "UIMobileLogin",
    "../ui/popup/UIRegistered": "UIRegistered",
    "../utils/EventConst": "EventConst",
    "../utils/Log": "Log",
    "../utils/UIHelp": "UIHelp"
  } ],
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
    var IDataModel_1 = require("../base/IDataModel");
    var proto_1 = require("../data/protobuf/proto");
    var UIHelp_1 = require("../utils/UIHelp");
    var EventMng_1 = require("../manager/EventMng");
    var EventConst_1 = require("../utils/EventConst");
    var Log_1 = require("../utils/Log");
    var BattleModel = function(_super) {
      __extends(BattleModel, _super);
      function BattleModel() {
        var _this = _super.call(this, "battle") || this;
        _this.mIsOver = false;
        _this.isTouch = false;
        _this.gameList = new Array();
        _this.isStop = false;
        _this.countTime = 0;
        _this.rank = 0;
        _this.remaining = 0;
        _this.mySetInterval = null;
        return _this;
      }
      BattleModel.prototype.getMessageListeners = function() {
        var _a;
        var _this = this;
        return _a = {}, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_GameList_Resp]] = function(data) {
          _this.GameList_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_GameApply_Resp]] = function(data) {
          _this.GameApply_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_GameStart_Resp]] = function(data) {
          _this.GameStart_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_GameLose_Resp]] = function(data) {
          _this.GameLose_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_GameOver_Resp]] = function(data) {
          _this.GameOver_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_GameCountChange_Resp]] = function(data) {
          _this.GameCountChange_Resp(data);
        }, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_GameRemaining_Resp]] = function(data) {
          _this.GameRemaining_Resp(data);
        }, _a;
      };
      BattleModel.prototype.GameList_Resp = function(data) {
        var _this = this;
        var message = proto_1.msg.GameList_Resp.decode(data);
        this.isStop = true;
        for (var index = 0; index < message.info.length; index++) {
          var id = message.id[index];
          if (this.gameList[id]) {
            this.gameList[id].ID = id;
            this.gameList[id].Info = message.info[index];
            this.gameList[id].State = message.state[index];
            this.gameList[id].Count = message.count[index];
            this.gameList[id].Second = message.second[index];
          } else {
            var newInfo = {
              ID: id,
              Info: message.info[index],
              State: message.state[index],
              Count: message.count[index],
              Second: message.second[index]
            };
            this.gameList[id] = newInfo;
          }
        }
        this.mySetInterval = setInterval(function() {
          _this.CountDown();
        }, 1e3);
        this.isStop = false;
        console.log("=======================GameList_Resp info", message.info);
        console.log("=======================GameList_Resp state", message.state);
        console.log("=======================GameList_Resp count", message.count);
        console.log("=======================GameList_Resp id", message.id);
        console.log("=======================GameList_Resp id", message.second);
      };
      BattleModel.prototype.GameApply_Quest = function(id) {
        UIHelp_1.default.ShowHideCircleView(true);
        var apply = proto_1.msg.GameApply_Quest.create();
        apply.id = id;
        console.log("=======================apply", apply.id);
        var messagebuf = proto_1.msg.GameApply_Quest.encode(apply).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_GameApply_Quest);
        console.log("=======================GameApply_Quest");
      };
      BattleModel.prototype.GameApply_Resp = function(data) {
        console.log("=======================GameApply_Resp");
        var message = proto_1.msg.GameApply_Resp.decode(data);
        1 == message.result ? EventMng_1.default.emit(EventConst_1.GameEvent.SIGNUPRESULT, "Sign up success", 1) : EventMng_1.default.emit(EventConst_1.GameEvent.SIGNUPRESULT, "Registration failed", 0);
        UIHelp_1.default.ShowHideCircleView(false);
      };
      BattleModel.prototype.GameStart_Resp = function(data) {
        this.Reset();
        cc.director.loadScene("zhujiemianUI");
      };
      BattleModel.prototype.GameLose_Quest = function() {
        UIHelp_1.default.ShowHideCircleView(true);
        var lose = proto_1.msg.GameLose_Quest.create();
        var messagebuf = proto_1.msg.GameApply_Quest.encode(lose).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_GameLose_Quest);
      };
      BattleModel.prototype.GameLose_Resp = function(data) {
        var message = proto_1.msg.GameLose_Resp.decode(data);
        this.rank = message.nRank;
        cc.director.loadScene("regret");
      };
      BattleModel.prototype.GameOver_Resp = function(data) {
        UIHelp_1.default.ShowHideCircleView(false);
        var message = proto_1.msg.GameOver_Resp.decode(data);
        for (var i = 0; i < message.rankName.length; ++i) Log_1.Log.log(Log_1.LOG_TAG.debug, "rank", message.rankName[i]);
        this.rank = message.nRank;
        cc.director.loadScene("victory");
        this.Reset();
      };
      BattleModel.prototype.GameCountChange_Resp = function(data) {
        var message = proto_1.msg.GameCountChange_Resp.decode(data);
        this.gameList[message.gameId] && (this.gameList[message.gameId].Count = message.count);
        EventMng_1.default.emit(EventConst_1.GameEvent.UPDATEPEOPLE, message.gameId);
        Log_1.Log.log(Log_1.LOG_TAG.debug, "geng xin UI");
      };
      BattleModel.prototype.GameRemaining_Resp = function(data) {
        var message = proto_1.msg.GameRemaining_Resp.decode(data);
        this.remaining = message.count;
        EventMng_1.default.emit(EventConst_1.GameEvent.UPDATEREMAINING, message.count);
      };
      BattleModel.prototype.GameOver = function(reason, result) {
        if (this.mIsOver) return;
        console.log("=======================game over");
        this.GameLose_Quest();
      };
      BattleModel.prototype.Reset = function() {
        this.mIsOver = true;
        this.isTouch = false;
        this.countTime = 0;
        this.rank = 0;
      };
      BattleModel.prototype.SetTouch = function(isTouch) {
        this.isTouch = isTouch;
      };
      BattleModel.prototype.GetTouch = function() {
        return this.isTouch;
      };
      BattleModel.prototype.GetGameList = function() {
        return this.gameList;
      };
      BattleModel.prototype.GetGameListByType = function(type) {
        var list = new Array();
        this.gameList.forEach(function(val) {
          var _type = Math.floor((val.ID - 1) / 1e3);
          _type == type && (list[val.ID] = val);
        });
        return list;
      };
      BattleModel.prototype.GetGameInfo = function(ID) {
        if (this.gameList[ID]) return this.gameList[ID];
        return null;
      };
      BattleModel.prototype.CountDown = function() {
        if (this.isStop) return;
        if (!this.gameList) return;
        this.gameList.forEach(function(val) {
          if (1 == val.State || val.Second > 0) {
            val.Second -= 1;
            val.Second < 0 && (val.Second = 0);
            EventMng_1.default.emit(EventConst_1.GameEvent.UPDATETIME, val.ID);
          }
        });
      };
      BattleModel.prototype.SetCountTime = function(value) {
        this.countTime = value;
      };
      BattleModel.prototype.GetCountTime = function() {
        return this.countTime;
      };
      BattleModel.prototype.GetRank = function() {
        return this.rank;
      };
      BattleModel.prototype.GetRemaining = function() {
        return this.remaining;
      };
      BattleModel.prototype.GetPeopleByType = function(type) {
        var count = 0;
        this.gameList.forEach(function(val) {
          var _type = Math.floor((val.ID - 1) / 1e3);
          _type == type && (count += val.Count);
        });
        return count;
      };
      return BattleModel;
    }(IDataModel_1.default);
    exports.default = BattleModel;
    cc._RF.pop();
  }, {
    "../base/IDataModel": "IDataModel",
    "../data/protobuf/proto": "proto",
    "../manager/EventMng": "EventMng",
    "../utils/EventConst": "EventConst",
    "../utils/Log": "Log",
    "../utils/UIHelp": "UIHelp"
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
      GameEvent.CREATEWORMHOLE = "CREATEWORMHOLE";
      GameEvent.ENTERWORMHOLE = "ENTERWORMHOLE";
      GameEvent.UPDATEPEOPLE = "UPDATEPEOPLE";
      GameEvent.UPDATETIME = "UPDATETIME";
      GameEvent.UPDATEREMAINING = "UPDATEREMAINING";
      GameEvent.CHANGENAME = "CHANGENAME";
      GameEvent.LOGINRESULT = "LOGINRESULT";
      GameEvent.REGISTEREDRESULT = "REGISTEREDRESULT";
      GameEvent.CHANGENAMERESULT = "CHANGENAMERESULT";
      GameEvent.SIGNUPRESULT = "SIGNUPRESULT";
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
      Constant.MAPTIME1 = 18e3;
      Constant.MAPTIME2 = 43200;
      Constant.BUFFERTIME = 5;
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
    var Network_1 = require("./network/Network");
    var SingletonFactory_1 = require("./utils/SingletonFactory");
    var GameDataCenter_1 = require("./manager/GameDataCenter");
    var GameController = function() {
      function GameController() {
        this.network = null;
      }
      GameController.prototype.init = function() {
        this.network = SingletonFactory_1.SingletonFactory.getInstance(Network_1.Network);
        GameDataCenter_1.default.initModule();
      };
      return GameController;
    }();
    exports.default = new GameController();
    cc._RF.pop();
  }, {
    "./manager/GameDataCenter": "GameDataCenter",
    "./network/Network": "Network",
    "./utils/SingletonFactory": "SingletonFactory"
  } ],
  GameDataCenter: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "e9a5c9zLT9HHJCmWhskWYm7", "GameDataCenter");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var AccountModel_1 = require("../logic/AccountModel");
    var BattleModel_1 = require("../logic/BattleModel");
    var SingletonFactory_1 = require("../utils/SingletonFactory");
    var ServerPingModel_1 = require("../logic/ServerPingModel");
    var PayModel_1 = require("../logic/PayModel");
    var GameDataCenter = function() {
      function GameDataCenter() {
        this._tModel = [];
        this.account = null;
        this.system = null;
        this.battle = null;
        this.serverping = null;
        this.pay = null;
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
        this.account = this.newModel(AccountModel_1.default);
        this.battle = this.newModel(BattleModel_1.default);
        this.serverping = this.newModel(ServerPingModel_1.default);
        this.pay = this.newModel(PayModel_1.default);
      };
      return GameDataCenter;
    }();
    exports.default = new GameDataCenter();
    cc._RF.pop();
  }, {
    "../logic/AccountModel": "AccountModel",
    "../logic/BattleModel": "BattleModel",
    "../logic/PayModel": "PayModel",
    "../logic/ServerPingModel": "ServerPingModel",
    "../utils/SingletonFactory": "SingletonFactory"
  } ],
  IDataModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2995bNc/4FHupIpPoRTrZB9", "IDataModel");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var EventMng_1 = require("../manager/EventMng");
    var GameController_1 = require("../GameController");
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
    "../GameController": "GameController",
    "../manager/EventMng": "EventMng"
  } ],
  LoadingCircle: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "80238SnbztBzrmjJAwinkzV", "LoadingCircle");
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
    var UIBase_1 = require("../../base/UIBase");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var LoadingCircle = function(_super) {
      __extends(LoadingCircle, _super);
      function LoadingCircle() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.TimeOut = 15;
        return _this;
      }
      LoadingCircle.prototype.SetTimeout = function(timeout) {
        this.TimeOut = timeout;
        this.TimeOut > 0 && this.scheduleOnce(this.onHide, this.TimeOut);
      };
      LoadingCircle.prefabUrl = "tips/LoadingCircle";
      LoadingCircle.className = "LoadingCircle";
      LoadingCircle = __decorate([ ccclass, menu("ui/tips/LoadingCircle") ], LoadingCircle);
      return LoadingCircle;
    }(UIBase_1.default);
    exports.default = LoadingCircle;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase"
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
  LoopListItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7392bBLh4NAwLoZSiKHSTnO", "LoopListItem");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
    var LoopListItem = function(_super) {
      __extends(LoopListItem, _super);
      function LoopListItem() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.startOffset = 0;
        _this.padding = 0;
        _this.itemKey = null;
        _this._offset = 0;
        _this._idx = -1;
        _this._userData = null;
        _this.looplist = null;
        return _this;
      }
      Object.defineProperty(LoopListItem.prototype, "offset", {
        get: function() {
          return this._offset;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LoopListItem.prototype, "itemIdx", {
        get: function() {
          return this._idx;
        },
        set: function(value) {
          this._offset = 0 === value ? this.startOffset : 0;
          this._idx = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LoopListItem.prototype, "userData", {
        get: function() {
          return this._userData;
        },
        set: function(value) {
          this._userData = value;
        },
        enumerable: false,
        configurable: true
      });
      LoopListItem.prototype.onEnable = function() {
        this.node.on(cc.Node.EventType.SIZE_CHANGED, this.onSizeChanged, this);
      };
      LoopListItem.prototype.onDisable = function() {
        this.node.off(cc.Node.EventType.SIZE_CHANGED, this.onSizeChanged, this);
      };
      LoopListItem.prototype.onSizeChanged = function() {
        this.looplist && this.looplist.itemSizeChanged();
      };
      __decorate([ property(cc.Float) ], LoopListItem.prototype, "startOffset", void 0);
      __decorate([ property(cc.Float) ], LoopListItem.prototype, "padding", void 0);
      LoopListItem = __decorate([ ccclass, disallowMultiple, menu("UIExtension/LoopListItem") ], LoopListItem);
      return LoopListItem;
    }(cc.Component);
    exports.default = LoopListItem;
    cc._RF.pop();
  }, {} ],
  LoopList: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f35ea5qkPhMwLfRp4mx+aML", "LoopList");
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
    exports.Movement = void 0;
    var LoopListItem_1 = require("./LoopListItem");
    var EPSILON = 1e-4;
    1;
    var Movement;
    (function(Movement) {
      Movement[Movement["Horizontal"] = 0] = "Horizontal";
      Movement[Movement["Vertical"] = 1] = "Vertical";
    })(Movement = exports.Movement || (exports.Movement = {}));
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu, disallowMultiple = _a.disallowMultiple;
    var LoopList = function(_super) {
      __extends(LoopList, _super);
      function LoopList() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.movement = Movement.Vertical;
        _this.cacheBoundary = 20;
        _this.frameCreateMax = 30;
        _this.scrollSpeedMax = 10;
        _this._itemPool = null;
        _this._templates = {};
        _this._template = null;
        _this._itemCreator = null;
        _this._totalcount = 0;
        _this._items = [];
        _this._maxPadding = 0;
        _this.leftBoundary = 0;
        _this.rightBoundary = 0;
        _this.topBoundary = 0;
        _this.bottomBoundary = 0;
        _this._leftBoundary = 0;
        _this._bottomBoundary = 0;
        _this._rightBoundary = 0;
        _this._topBoundary = 0;
        _this._itemSizeDirty = false;
        _this._itemDirty = false;
        _this.animeIdx = 0;
        _this.bAnimeMoveing = false;
        _this.scrollView = null;
        return _this;
      }
      Object.defineProperty(LoopList.prototype, "content", {
        get: function() {
          return this.scrollView.content;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LoopList.prototype, "viewPort", {
        get: function() {
          return this.content.parent;
        },
        enumerable: false,
        configurable: true
      });
      LoopList.prototype.onLoad = function() {
        null == this.scrollView && (this.scrollView = this.getComponent(cc.ScrollView));
        this.scrollView.horizontal = this.movement == Movement.Horizontal;
        this.scrollView.vertical = this.movement == Movement.Vertical;
        this.scrollView.elastic = true;
        this.scrollView._getHowMuchOutOfBoundary = this._getHowMuchOutOfBoundary.bind(this);
        this.scrollView._calculateBoundary = this._calculateBoundary.bind(this);
        this.scrollView._clampDelta = this._clampDelta.bind(this);
        if (this.content) {
          var anch = this.scrollView.horizontal ? cc.v2(0, .5) : cc.v2(.5, 1);
          this.content.setAnchorPoint(anch);
          this.content.setPosition(cc.Vec2.ZERO);
        }
        this._calculateBoundary();
      };
      LoopList.prototype.onEnable = function() {
        this.scrollView.node.on("scrolling", this.onScrolling, this);
      };
      LoopList.prototype.onDisable = function() {
        this.scrollView.node.off("scrolling", this.onScrolling, this);
      };
      LoopList.prototype.initialize = function(creator, count) {
        void 0 === count && (count = 0);
        this._totalcount = count || 0;
        this._itemCreator = creator;
        this._initializePool();
        this._updateListView();
      };
      LoopList.prototype.setItemCount = function(count, bReset) {
        void 0 === bReset && (bReset = false);
        var oldcount = this._totalcount;
        this._totalcount = count;
        if (bReset) {
          this._recycleAllItems(true);
          this._updateListView();
        } else {
          var lastItem = this._items.length > 0 ? this._items[this._items.length - 1] : null;
          count >= oldcount || null != lastItem && lastItem.itemIdx < count - 1 ? this.refreshItems() : this.showItem(count - 1);
        }
      };
      LoopList.prototype.refreshItems = function() {
        if (this._totalcount > 0 && this._items.length > 0) {
          var fristItem = this._items[0];
          var pos = fristItem.node.position;
          var itemIdx = fristItem.itemIdx;
          this._recycleAllItems();
          var arg = this.movement == Movement.Horizontal ? pos.x : pos.y;
          this._updateListView(itemIdx, arg);
        } else {
          this._recycleAllItems(true);
          this._updateListView();
        }
      };
      LoopList.prototype.showItem = function(idx, bAnime) {
        void 0 === bAnime && (bAnime = false);
        idx = Math.min(this._totalcount - 1, Math.max(0, idx));
        if (bAnime) {
          this.scrollView.stopAutoScroll();
          this.animeIdx = idx;
          this.bAnimeMoveing = true;
        } else switch (this.movement) {
         case Movement.Horizontal:
          this._showItemHor(idx);
          break;

         case Movement.Vertical:
          this._showItemVer(idx);
        }
      };
      LoopList.prototype.getNewItem = function(key) {
        void 0 === key && (key = null);
        key = key || this._template;
        var pool = this._itemPool[key];
        var instance = pool && pool.length > 0 ? pool.pop() : null;
        if (null == instance) {
          var prefab = this._templates[key];
          if (null != prefab) {
            var node = cc.instantiate(prefab.node);
            instance = node.getComponent(LoopListItem_1.default);
            instance.itemKey = key;
          } else console.error("not found template: " + key);
        }
        return instance;
      };
      LoopList.prototype.itemSizeChanged = function() {
        this._itemSizeDirty = true;
      };
      LoopList.prototype.onScrolling = function() {
        this._itemDirty = true;
        this.bAnimeMoveing = false;
      };
      LoopList.prototype.update = function(dt) {
        this.bAnimeMoveing = !this._scrolling && this.bAnimeMoveing;
        switch (this.movement) {
         case Movement.Horizontal:
          this._itemSizeDirty && this._updateHorizontalItems();
          this.bAnimeMoveing && this._scrollToItemHor(this.animeIdx);
          break;

         case Movement.Vertical:
          this._itemSizeDirty && this._updateVerticalItems();
          this.bAnimeMoveing && this._scrollToItemVer(this.animeIdx);
        }
        this._itemSizeDirty = false;
        if (this._itemDirty) {
          this._itemDirty = false;
          this._updateListView();
        }
      };
      LoopList.prototype._initializePool = function() {
        var _this = this;
        if (null == this._itemPool) {
          this._itemPool = {};
          var prefabs = this.content.getComponentsInChildren(LoopListItem_1.default);
          prefabs.forEach(function(item) {
            var key = item.itemKey = item.node.name;
            _this._template = null == _this._template ? key : _this._template;
            _this._templates[key] = item;
            _this._maxPadding = Math.max(_this._maxPadding, item.padding + 2);
            _this._recycle(item);
          });
        }
      };
      LoopList.prototype.setContentPosition = function(pos) {
        this.scrollView.stopAutoScroll();
        this.scrollView.content && (this.scrollView.content.position = pos);
      };
      LoopList.prototype._showItemVer = function(idx) {
        if (this._items.length > 0) {
          var frist = this._getItemAt(idx);
          var last = this._items[this._items.length - 1];
          if (null != frist && last.itemIdx === this._totalcount - 1 && this._getItemTop(frist) <= this._topBoundary && this._getItemBottom(last) >= this._bottomBoundary) return;
        }
        this._recycleAllItems(true);
        if (this._updateListView(idx)) {
          var item = this._items[this._items.length - 1];
          if (item.itemIdx === this._totalcount - 1) {
            var bottom = this._getItemBottom(item);
            if (bottom > this._bottomBoundary) {
              this.content.y = this._bottomBoundary - bottom;
              if (this._updateListView()) {
                var titem = this._items[0];
                if (0 === titem.itemIdx) {
                  var top = this._getItemTop(titem);
                  top < this._topBoundary && (this.content.y = this.content.y + (this._topBoundary - top));
                }
              }
              this._itemDirty = true;
            }
          }
        }
      };
      LoopList.prototype._showItemHor = function(idx) {
        if (this._items.length > 0) {
          var frist = this._getItemAt(idx);
          var last = this._items[this._items.length - 1];
          if (null != frist && last.itemIdx === this._totalcount - 1 && this._getItemLeft(frist) >= this._leftBoundary && this._getItemRight(last) <= this._rightBoundary) return;
        }
        this._recycleAllItems(true);
        if (this._updateListView(idx)) {
          var item = this._items[this._items.length - 1];
          if (item.itemIdx === this._totalcount - 1) {
            var right = this._getItemRight(item);
            if (right < this._rightBoundary) {
              this.content.x = this._rightBoundary - right;
              if (this._updateListView()) {
                var titem = this._items[0];
                if (0 === titem.itemIdx) {
                  var left = this._getItemLeft(titem);
                  left > this._leftBoundary && (this.content.x = this.content.x - (left - this._leftBoundary));
                }
              }
              this._itemDirty = true;
            }
          }
        }
      };
      LoopList.prototype._scrollToItemHor = function(idx) {
        var item = this._getItemAt(idx);
        var offset = 0;
        if (null == item) offset = this._items[0].itemIdx > idx ? this.scrollSpeedMax : -this.scrollSpeedMax; else {
          offset = this._leftBoundary - this._getItemLeft(item);
          if (idx === this._totalcount - 1) {
            offset = this._rightBoundary - this._getItemRight(item);
            offset = offset >= 0 ? 0 : offset;
          } else {
            var last = this._items[this._items.length - 1];
            last.itemIdx === this._totalcount - 1 && this._getItemRight(last) <= this._rightBoundary && (offset = 0);
          }
        }
        this.bAnimeMoveing = Math.abs(offset) > EPSILON;
        (offset > this.scrollSpeedMax || offset < -this.scrollSpeedMax) && (offset = Math.min(this.scrollSpeedMax, Math.max(-this.scrollSpeedMax, offset)));
        if (0 !== offset) {
          this._itemDirty = true;
          this.scrollView._moveContent(cc.v2(offset, 0), true);
        } else this.scrollView.stopAutoScroll();
      };
      LoopList.prototype._scrollToItemVer = function(idx) {
        var item = this._getItemAt(idx);
        var offset = 0;
        if (null == item) offset = this._items[0].itemIdx > idx ? -this.scrollSpeedMax : this.scrollSpeedMax; else {
          offset = this._topBoundary - this._getItemTop(item);
          if (idx === this._totalcount - 1) {
            offset = this._bottomBoundary - this._getItemBottom(item);
            offset = offset <= 0 ? 0 : offset;
          } else {
            var last = this._items[this._items.length - 1];
            last.itemIdx === this._totalcount - 1 && this._getItemBottom(last) <= this._rightBoundary && (offset = 0);
          }
        }
        this.bAnimeMoveing = Math.abs(offset) > EPSILON;
        (offset > this.scrollSpeedMax || offset < -this.scrollSpeedMax) && (offset = Math.min(this.scrollSpeedMax, Math.max(-this.scrollSpeedMax, offset)));
        if (0 !== offset) {
          this._itemDirty = true;
          this.scrollView._moveContent(cc.v2(0, offset), true);
        } else this.scrollView.stopAutoScroll();
      };
      LoopList.prototype._recycle = function(item) {
        var pool = this._itemPool[item.itemKey];
        null == pool && (pool = this._itemPool[item.itemKey] = []);
        item.node.active = false;
        item.looplist = null;
        pool.push(item);
      };
      LoopList.prototype._recycleAllItems = function(reset) {
        var _this = this;
        void 0 === reset && (reset = false);
        this._items.forEach(function(item) {
          _this._recycle(item);
        });
        this._items = [];
        this.scrollView.stopAutoScroll();
        reset && this.setContentPosition(cc.Vec2.ZERO);
      };
      LoopList.prototype._createNewItem = function(idx) {
        if (idx < 0 || idx >= this._totalcount) return null;
        var item = this._itemCreator ? this._itemCreator(this, idx) : null;
        if (null != item) {
          item.node.position = cc.Vec2.ZERO;
          item.itemIdx = idx;
          item.node.active = true;
          item.looplist = this;
          item.node.parent = this.content;
        }
        return item;
      };
      LoopList.prototype._getItemAt = function(idx) {
        for (var i = 0; i < this._items.length; i++) {
          var item = this._items[i];
          if (item.itemIdx == idx) return item;
        }
        return null;
      };
      LoopList.prototype._getItemTop = function(item) {
        return item.node.y + this.content.y;
      };
      LoopList.prototype._getItemBottom = function(item) {
        var itemtop = this._getItemTop(item);
        return itemtop - item.node.height;
      };
      LoopList.prototype._getItemLeft = function(item) {
        return item.node.x + this.content.x;
      };
      LoopList.prototype._getItemRight = function(item) {
        var itemLeft = this._getItemLeft(item);
        return itemLeft + item.node.width;
      };
      LoopList.prototype._updateListView = function(idx, pos) {
        void 0 === idx && (idx = 0);
        void 0 === pos && (pos = null);
        var checkcount = 0;
        var create = this.movement === Movement.Horizontal ? this._updateHorizontal : this._updateVertical;
        while (create.call(this, idx, pos)) ++checkcount >= this.frameCreateMax && (this._itemDirty = true);
        return true;
      };
      LoopList.prototype._createTopItem = function(idx, y) {
        void 0 === y && (y = null);
        var item = this._createNewItem(idx);
        if (item) {
          item.node.y = null == y ? -this._getItemTop(item) + this._topBoundary - item.offset : y;
          this._items.push(item);
        }
        return item;
      };
      LoopList.prototype._updateVerticalItems = function() {
        if (this._items.length > 1) {
          var pitem = this._items[0];
          for (var idx = 1; idx < this._items.length; idx++) {
            var item = this._items[idx];
            item.node.y = pitem.node.y - pitem.node.height - item.padding;
            pitem = item;
          }
        }
      };
      LoopList.prototype._updateVertical = function(idx, pos) {
        var curCount = this._items.length;
        if (0 == this._totalcount) {
          curCount > 0 && this._recycleAllItems(true);
          return false;
        }
        if (0 === curCount) {
          var item = this._createTopItem(idx, pos);
          return null != item;
        }
        var topitem = this._items[0];
        var bottomitem = this._items[curCount - 1];
        var bottom_bottom = this._getItemBottom(bottomitem);
        if (curCount > 1) {
          var canRecycleTop = bottomitem.itemIdx !== this._totalcount - 1 || bottom_bottom < this._bottomBoundary;
          if (canRecycleTop && this._getItemBottom(topitem) > this.topBoundary + this._maxPadding) {
            this._items.splice(0, 1);
            this._recycle(topitem);
            return true;
          }
          if (topitem.itemIdx > 0 && this._getItemTop(bottomitem) < this.bottomBoundary - this._maxPadding) {
            this._items.splice(curCount - 1, 1);
            this._recycle(bottomitem);
            return true;
          }
        }
        if (this._getItemTop(topitem) < this.topBoundary) {
          var item = this._createNewItem(topitem.itemIdx - 1);
          if (item) {
            item.node.y = topitem.node.y + item.padding + item.node.height;
            this._items.splice(0, 0, item);
            return true;
          }
        }
        if (bottom_bottom > this.bottomBoundary) {
          var item = this._createNewItem(bottomitem.itemIdx + 1);
          if (item) {
            item.node.y = bottomitem.node.y - bottomitem.node.height - bottomitem.padding;
            this._items.push(item);
            return true;
          }
        }
        return false;
      };
      LoopList.prototype._createLeftItem = function(idx, x) {
        void 0 === x && (x = null);
        var item = this._createNewItem(idx);
        if (item) {
          item.node.x = null == x ? -this._getItemLeft(item) + this._leftBoundary + item.offset : x;
          this._items.push(item);
        }
        return item;
      };
      LoopList.prototype._updateHorizontalItems = function() {
        if (this._items.length > 1) {
          var preitem = this._items[0];
          for (var idx = 1; idx < this._items.length; idx++) {
            var item = this._items[idx];
            item.node.x = preitem.node.x + preitem.node.height + item.padding;
            preitem = item;
          }
        }
      };
      LoopList.prototype._updateHorizontal = function(idx, pos) {
        var curCount = this._items.length;
        if (0 == this._totalcount) {
          curCount > 0 && this._recycleAllItems(true);
          return false;
        }
        if (0 == curCount) {
          var item = this._createLeftItem(idx, pos);
          return null != item;
        }
        var leftItem = this._items[0];
        var rightItem = this._items[curCount - 1];
        var right_right = this._getItemRight(rightItem);
        if (curCount > 1) {
          var canRecycleLeft = rightItem.itemIdx !== this._totalcount - 1 || right_right > this.rightBoundary;
          if (canRecycleLeft && this._getItemRight(leftItem) < this.leftBoundary - this._maxPadding) {
            this._items.splice(0, 1);
            this._recycle(leftItem);
            return true;
          }
          if (leftItem.itemIdx > 0 && this._getItemLeft(rightItem) > this.rightBoundary + this._maxPadding) {
            this._items.splice(curCount - 1, 1);
            this._recycle(rightItem);
            return true;
          }
        }
        if (this._getItemLeft(leftItem) > this.leftBoundary) {
          var item = this._createNewItem(leftItem.itemIdx - 1);
          if (item) {
            item.node.x = leftItem.node.x - item.node.width - item.padding;
            this._items.splice(0, 0, item);
            return true;
          }
        }
        if (right_right < this.rightBoundary) {
          var item = this._createNewItem(rightItem.itemIdx + 1);
          if (item) {
            item.node.x = rightItem.node.x + rightItem.node.width + rightItem.padding;
            this._items.push(item);
            return true;
          }
        }
        return false;
      };
      LoopList.prototype._calculateBoundary = function() {
        if (this.content) {
          this.content.setContentSize(cc.size(this.viewPort.width, this.viewPort.height));
          var viewSize = this.viewPort.getContentSize();
          var anchorX = viewSize.width * this.viewPort.anchorX;
          var anchorY = viewSize.height * this.viewPort.anchorY;
          this._leftBoundary = -anchorX;
          this._bottomBoundary = -anchorY;
          this._rightBoundary = this._leftBoundary + viewSize.width;
          this._topBoundary = this._bottomBoundary + viewSize.height;
          this.leftBoundary = this._leftBoundary - this.cacheBoundary;
          this.rightBoundary = this._rightBoundary + this.cacheBoundary;
          this.topBoundary = this._topBoundary + this.cacheBoundary;
          this.bottomBoundary = this._bottomBoundary - this.cacheBoundary;
        }
      };
      LoopList.prototype._clampDelta = function(delta) {
        return this._items.length > 0 ? delta : cc.Vec2.ZERO;
      };
      LoopList.prototype._getContentLeftBoundary = function() {
        if (this._items.length > 0) {
          var item = this._items[0];
          if (0 === item.itemIdx) return this._getItemLeft(item) - item.offset;
        }
        return this._leftBoundary;
      };
      LoopList.prototype._getContentRightBoundary = function() {
        if (this._items.length > 0) {
          var item = this._items[this._items.length - 1];
          if (item.itemIdx === this._totalcount - 1) return this._getItemRight(item);
        }
        return this._rightBoundary;
      };
      LoopList.prototype._getContentTopBoundary = function() {
        if (this._items.length > 0) {
          var item = this._items[0];
          if (0 === item.itemIdx) return this._getItemTop(item) + item.offset;
        }
        return this._topBoundary;
      };
      LoopList.prototype._getContentBottomBoundary = function() {
        if (this._items.length > 0) {
          var item = this._items[this._items.length - 1];
          if (item.itemIdx === this._totalcount - 1) return this._getItemBottom(item);
        }
        return this._bottomBoundary;
      };
      LoopList.prototype._getHowMuchOutOfBoundary = function(addition) {
        addition = addition || cc.v2(0, 0);
        if (addition.fuzzyEquals(cc.v2(0, 0), EPSILON) && !this._outOfBoundaryAmountDirty) return this._outOfBoundaryAmount;
        var outOfBoundaryAmount = cc.v2(0, 0);
        switch (this.movement) {
         case Movement.Horizontal:
          outOfBoundaryAmount.y = 0;
          var left = this._getContentLeftBoundary() + addition.x;
          var right = this._getContentRightBoundary() + addition.x;
          if (left > this._leftBoundary) outOfBoundaryAmount.x = this._leftBoundary - left; else if (right < this._rightBoundary) {
            outOfBoundaryAmount.x = this._rightBoundary - right;
            var temp = left + outOfBoundaryAmount.x;
            this._items.length > 0 && 0 === this._items[0].itemIdx && temp >= this._leftBoundary && (outOfBoundaryAmount.x = this._leftBoundary - left);
          }
          break;

         case Movement.Vertical:
          outOfBoundaryAmount.x = 0;
          var top = this._getContentTopBoundary() + addition.y;
          var bottom = this._getContentBottomBoundary() + addition.y;
          if (top < this._topBoundary) outOfBoundaryAmount.y = this._topBoundary - top; else if (bottom > this._bottomBoundary) {
            outOfBoundaryAmount.y = this._bottomBoundary - bottom;
            var temp = top + outOfBoundaryAmount.y;
            this._items.length > 0 && 0 === this._items[0].itemIdx && temp <= this._topBoundary && (outOfBoundaryAmount.y = this._topBoundary - top);
          }
        }
        if (addition.fuzzyEquals(cc.v2(0, 0), EPSILON)) {
          this._outOfBoundaryAmount = outOfBoundaryAmount;
          this._outOfBoundaryAmountDirty = false;
        }
        outOfBoundaryAmount = this._clampDelta(outOfBoundaryAmount);
        return outOfBoundaryAmount;
      };
      Object.defineProperty(LoopList.prototype, "_outOfBoundaryAmount", {
        get: function() {
          return this.scrollView._outOfBoundaryAmount;
        },
        set: function(value) {
          this.scrollView._outOfBoundaryAmount = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LoopList.prototype, "_outOfBoundaryAmountDirty", {
        get: function() {
          return this.scrollView._outOfBoundaryAmountDirty;
        },
        set: function(value) {
          this.scrollView._outOfBoundaryAmountDirty = value;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(LoopList.prototype, "_scrolling", {
        get: function() {
          return this.scrollView._scrolling;
        },
        enumerable: false,
        configurable: true
      });
      __decorate([ property({
        type: cc.Enum(Movement),
        serializable: true
      }) ], LoopList.prototype, "movement", void 0);
      __decorate([ property(cc.Float) ], LoopList.prototype, "cacheBoundary", void 0);
      __decorate([ property(cc.Integer) ], LoopList.prototype, "frameCreateMax", void 0);
      __decorate([ property(cc.Float) ], LoopList.prototype, "scrollSpeedMax", void 0);
      __decorate([ property(cc.ScrollView) ], LoopList.prototype, "scrollView", void 0);
      LoopList = __decorate([ ccclass, disallowMultiple(), menu("UIExtension/LoopList") ], LoopList);
      return LoopList;
    }(cc.Component);
    exports.default = LoopList;
    cc._RF.pop();
  }, {
    "./LoopListItem": "LoopListItem"
  } ],
  Network: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27b98ncGaFEN4kT7kMMG7xJ", "Network");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Network = void 0;
    var SocketDelegate_1 = require("./SocketDelegate");
    var Log_1 = require("../utils/Log");
    var Network = function() {
      function Network() {
        this._socket = null;
        this._url = "ws://18.222.196.207:7001";
      }
      Network.prototype.close = function() {
        this.safeCloseSocket();
      };
      Network.prototype.send = function(msgData, protocolID) {
        if (!this._socket.isSocketOpened()) {
          Log_1.Log.error("send message but socket not open!");
          return;
        }
        this._socket.send(msgData, protocolID);
      };
      Network.prototype.connect = function(url) {
        void 0 === url && (url = null);
        this.safeConnectSocket(url);
      };
      Network.prototype.GetIsOpen = function() {
        return this._socket.isSocketOpened();
      };
      Network.prototype.safeConnectSocket = function(url) {
        null != this._socket && this._socket.closeConnect();
        this._socket = new SocketDelegate_1.SocketDelegate();
        null != url ? this._socket.connect(url) : this._socket.connect(this._url);
      };
      Network.prototype.safeCloseSocket = function() {
        null != this._socket && this._socket.closeConnect();
        this._socket = null;
      };
      return Network;
    }();
    exports.Network = Network;
    cc._RF.pop();
  }, {
    "../utils/Log": "Log",
    "./SocketDelegate": "SocketDelegate"
  } ],
  PayModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cd9a7Y8H21Hj6/otWBUnGVh", "PayModel");
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
    var IDataModel_1 = require("../base/IDataModel");
    var proto_1 = require("../data/protobuf/proto");
    var UIHelp_1 = require("../utils/UIHelp");
    var PayModel = function(_super) {
      __extends(PayModel, _super);
      function PayModel() {
        return _super.call(this, "pay") || this;
      }
      PayModel.prototype.getMessageListeners = function() {
        var _a;
        var _this = this;
        return _a = {}, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_ChoosePay_Resp]] = function(data) {
          _this.ChoosePay_Resp(data);
        }, _a;
      };
      PayModel.prototype.ChoosePay_Quest = function(id) {
        UIHelp_1.default.ShowHideCircleView(true);
        var pay = proto_1.msg.ChoosePay_Quest.create();
        pay.payId = id;
        console.log("=======================pay", pay.payId);
        var messagebuf = proto_1.msg.GameApply_Quest.encode(pay).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_ChoosePay_Quest);
      };
      PayModel.prototype.ChoosePay_Resp = function(data) {
        var message = proto_1.msg.ChoosePay_Resp.decode(data);
        message.orderId;
        console.log("=======================pay", message.orderId);
        console.log("=======================pay", message.result);
        console.log("=======================pay", message.sign);
        this.MakeForm(message.orderId);
      };
      PayModel.prototype.MakeForm = function(orderId) {
        var div = document.getElementById("GameDiv");
        if (div) {
          var btn = document.createElement("input");
          btn.setAttribute("type", "button");
          btn.setAttribute("id", "rzp-button1");
          btn.setAttribute("name", "Pay");
          btn.setAttribute("value", "Pay");
          btn.style.height = "130px";
          btn.style.width = "50px";
          var script = document.createElement("script");
          script.type = "text/javascript";
          script.scr = "https://checkout.razorpay.com/v1/checkout.js";
          div.appendChild(script);
          var script2 = document.createElement("script");
          script2.type = "text/javascript";
          script2.text = 'var options = {"key": "rzp_test_nrDL1GiPzEO58V","amount": "1","currency": "INR", "name": "Acme Corp","description": "Test Transaction", "image": "https://example.com/your_logo","order_id":"' + orderId + '",  "handler": function (response) {alert(response.razorpay_payment_id); alert(response.razorpay_order_id);alert(response.razorpay_signature)  }, "prefill": {  "name": "Gaurav Kumar", "email": "gaurav.kumar@example.com", "contact": "9999999999" },"notes": {"address": "Razorpay Corporate Office" }, "theme": {"color": "#F37254" }};var rzp1 = new Razorpay(options);rzp1.open();';
          div.appendChild(script2);
        }
      };
      return PayModel;
    }(IDataModel_1.default);
    exports.default = PayModel;
    cc._RF.pop();
  }, {
    "../base/IDataModel": "IDataModel",
    "../data/protobuf/proto": "proto",
    "../utils/UIHelp": "UIHelp"
  } ],
  PayTest: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fda7exWnexKh6TAY9WuhPzf", "PayTest");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      start: function start() {
        var test = document.getElementsByTagName("html")[0].innerHTML;
        alert(test);
      }
    });
    cc._RF.pop();
  }, {} ],
  Pay: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bebd5KPA4xI9ooo2hdLxYip", "Pay");
    "use strict";
    function submitForm_filter_platform() {
      var form = document.getElementById("filter_all");
      form.submit();
    }
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
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var EventMng_1 = require("../../manager/EventMng");
    var EventConst_1 = require("../../utils/EventConst");
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
        this.player_spine = this.getComponent(sp.Skeleton);
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
        GameDataCenter_1.default.battle.SetTouch(true);
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
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst"
  } ],
  ServerPingModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bf3f1GyqdVLsJiqivADXVNC", "ServerPingModel");
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
    var IDataModel_1 = require("../base/IDataModel");
    var proto_1 = require("../data/protobuf/proto");
    var ServerPingModel = function(_super) {
      __extends(ServerPingModel, _super);
      function ServerPingModel() {
        var _this = _super.call(this, "serverping") || this;
        _this.severTime = 0;
        return _this;
      }
      ServerPingModel.prototype.setServerTime = function(time) {
        this.severTime = time;
      };
      ServerPingModel.prototype.getServerTime = function() {
        return this.severTime;
      };
      ServerPingModel.prototype.getMessageListeners = function() {
        var _a;
        var _this = this;
        return _a = {}, _a[proto_1.msg.eMsgID[proto_1.msg.eMsgID.eMsg_Client_Ping_Resp]] = function(data) {
          _this.Client_Ping_Resp(data);
        }, _a;
      };
      ServerPingModel.prototype.Client_Ping_Quest = function() {
        var login = proto_1.msg.Client_Ping_Quest.create();
        var messagebuf = proto_1.msg.Client_Ping_Quest.encode(login).finish();
        this.sendProtocolMsg(messagebuf, proto_1.msg.eMsgID.eMsg_Client_Ping_Quest);
      };
      ServerPingModel.prototype.Client_Ping_Resp = function(data) {};
      return ServerPingModel;
    }(IDataModel_1.default);
    exports.default = ServerPingModel;
    cc._RF.pop();
  }, {
    "../base/IDataModel": "IDataModel",
    "../data/protobuf/proto": "proto"
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
  SocketDelegate: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "800acXluV9LHb2cLsp3Pdc+", "SocketDelegate");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.SocketDelegate = void 0;
    var EventConst_1 = require("../utils/EventConst");
    var EventMng_1 = require("../manager/EventMng");
    var Socket_1 = require("./Socket");
    var Log_1 = require("../utils/Log");
    var UIHelp_1 = require("../utils/UIHelp");
    var GameController_1 = require("../GameController");
    var proto_1 = require("../data/protobuf/proto");
    var DATA_TOTAL_LEN = 4;
    var PROTOCOLTYPE_LEN = 2;
    var SocketDelegate = function() {
      function SocketDelegate() {}
      SocketDelegate.prototype.isSocketOpened = function() {
        return this._socket && this._socket.getState() == Socket_1.SocketState.OPEN;
      };
      SocketDelegate.prototype.isSocketClosed = function() {
        return null == this._socket;
      };
      SocketDelegate.prototype.connect = function(url) {
        Log_1.Log.log(Log_1.LOG_TAG.SOCKET, "connect socket = " + url);
        cc.sys.platform === cc.sys.WECHAT_GAME ? this._socket = new Socket_1.WxSocket(url, this) : this._socket = new Socket_1.WbSocket(url, this);
        this._socket.connect();
      };
      SocketDelegate.prototype.closeConnect = function() {
        this._socket && this._socket.close();
      };
      SocketDelegate.prototype.onSocketOpen = function() {
        Log_1.Log.log(Log_1.LOG_TAG.SOCKET, "socket open");
        EventMng_1.default.emit(EventConst_1.SocketEvent.SOCKET_OPEN);
      };
      SocketDelegate.prototype.onSocketError = function(errMsg) {
        errMsg && Log_1.Log.error("socket error, msg = " + errMsg);
        UIHelp_1.default.ShowDialog({
          title: "\u8054\u7f51\u5931\u8d25",
          content: "\u662f\u5426\u91cd\u65b0\u8fde\u63a5\uff1f\uff08\u8bf7\u786e\u8ba4\u670d\u52a1\u5668\u662f\u5426\u5f00\u542f\uff09",
          certainCb: function() {
            GameController_1.default.network.connect();
          }
        });
      };
      SocketDelegate.prototype.onSocketClosed = function(msg) {
        Log_1.Log.log(Log_1.LOG_TAG.SOCKET, "socket close, reason = " + msg);
        this._socket && this._socket.close();
        this._socket = null;
        EventMng_1.default.emit(EventConst_1.SocketEvent.SOCKET_CLOSE);
      };
      SocketDelegate.prototype.onSocketMessage = function(data) {
        if (this.isSocketClosed()) {
          Log_1.Log.error("onMessage call but socket had closed");
          return;
        }
        var msgdata;
        var protocolID;
        if ("string" === typeof data) {
          msgdata = data;
          console.log("data", data);
          EventMng_1.default.emit(proto_1.msg.eMsgID[protocolID], msgdata);
        } else {
          var msgArr = this.bufferToMsg(data);
          for (var i = 0; i < msgArr.length; i += 2) {
            protocolID = msgArr[i];
            msgdata = msgArr[i + 1];
            Log_1.Log.log(Log_1.LOG_TAG.SOCKET, "protocolID", protocolID, "recieve msg = ", msgdata);
            EventMng_1.default.emit(proto_1.msg.eMsgID[protocolID], msgdata);
          }
        }
      };
      SocketDelegate.prototype.send = function(msgData, protocolID) {
        if ("string" === typeof msgData) this._socket.send(msgData); else {
          var buf = this.msgToBuffer(msgData, protocolID);
          this._socket.send(buf);
        }
      };
      SocketDelegate.prototype.bufferToMsg = function(recvBuf) {
        var recv_data = recvBuf;
        var dataCount = recv_data.byteLength;
        var list = [];
        while (dataCount > 0) {
          var dv = new DataView(recv_data);
          var protocolID = dv.getInt16(0, true);
          var dataLen = dv.getInt32(PROTOCOLTYPE_LEN, true);
          var data_body = new Uint8Array(recv_data, DATA_TOTAL_LEN + PROTOCOLTYPE_LEN, dataLen);
          var count = DATA_TOTAL_LEN + PROTOCOLTYPE_LEN + dataLen;
          recv_data = recv_data.slice(count, recv_data.byteLength);
          dataCount -= count;
          list.push(protocolID);
          list.push(data_body);
        }
        return list;
      };
      SocketDelegate.prototype.msgToBuffer = function(msgData, protocolID) {
        var dataLen = msgData.length;
        var sendBuf = new ArrayBuffer(DATA_TOTAL_LEN + PROTOCOLTYPE_LEN + dataLen);
        var sendView = new DataView(sendBuf);
        sendView.setInt16(0, protocolID, true);
        sendView.setInt32(PROTOCOLTYPE_LEN, dataLen, true);
        var u8view = new Uint8Array(sendBuf, DATA_TOTAL_LEN + PROTOCOLTYPE_LEN);
        for (var i = 0; i < dataLen; ++i) u8view[i] = msgData[i];
        return sendBuf;
      };
      return SocketDelegate;
    }();
    exports.SocketDelegate = SocketDelegate;
    cc._RF.pop();
  }, {
    "../GameController": "GameController",
    "../data/protobuf/proto": "proto",
    "../manager/EventMng": "EventMng",
    "../utils/EventConst": "EventConst",
    "../utils/Log": "Log",
    "../utils/UIHelp": "UIHelp",
    "./Socket": "Socket"
  } ],
  Socket: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c20a1Ci14BNQqiBlUOgC0Sl", "Socket");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.WxSocket = exports.WbSocket = exports.SocketState = void 0;
    var Log_1 = require("../utils/Log");
    var SocketState;
    (function(SocketState) {
      SocketState[SocketState["CONNECTING"] = 1] = "CONNECTING";
      SocketState[SocketState["OPEN"] = 2] = "OPEN";
      SocketState[SocketState["CLOSING"] = 3] = "CLOSING";
      SocketState[SocketState["CLOSED"] = 4] = "CLOSED";
    })(SocketState = exports.SocketState || (exports.SocketState = {}));
    var WbSocket = function() {
      function WbSocket(url, delegate) {
        this._url = url;
        this._delegate = delegate;
      }
      WbSocket.prototype.connect = function() {
        var _this = this;
        var ws = this._webSocket = new WebSocket(this._url);
        ws.binaryType = "arraybuffer";
        ws.onopen = function(event) {
          _this._delegate.onSocketOpen();
        };
        ws.onmessage = function(event) {
          _this._delegate.onSocketMessage(event.data);
        };
        ws.onerror = function(event) {
          _this._delegate.onSocketError(null);
        };
        ws.onclose = function(event) {
          _this._delegate.onSocketClosed(event.reason);
        };
      };
      WbSocket.prototype.send = function(data) {
        this._webSocket.send(data);
      };
      WbSocket.prototype.close = function() {
        if (!this._webSocket) return;
        try {
          this._webSocket.close();
        } catch (err) {
          Log_1.Log.error("error while closing webSocket ", err.toString());
        }
        this._webSocket = null;
      };
      WbSocket.prototype.getState = function() {
        if (this._webSocket) switch (this._webSocket.readyState) {
         case WebSocket.OPEN:
          return SocketState.OPEN;

         case WebSocket.CONNECTING:
          return SocketState.CONNECTING;

         case WebSocket.CLOSING:
          return SocketState.CLOSING;

         case WebSocket.CLOSED:
          return SocketState.CLOSED;
        }
        return SocketState.CLOSED;
      };
      return WbSocket;
    }();
    exports.WbSocket = WbSocket;
    var WxSocket = function() {
      function WxSocket(url, delegate) {
        this._state = SocketState.CLOSED;
        this._url = url;
        this._delegate = delegate;
      }
      WxSocket.prototype.connect = function() {
        var _this = this;
        this._state = SocketState.CONNECTING;
        var ws = this._socketTask = wx.connectSocket({
          url: this._url
        });
        ws.onOpen = function(res) {
          _this._state = SocketState.OPEN;
          _this._delegate.onSocketOpen();
        };
        ws.onMessage = function(res) {
          _this._delegate.onSocketMessage(res.data);
        };
        ws.onError = function(res) {
          _this._delegate.onSocketError(res.errMsg);
        };
        ws.onClose = function(res) {
          _this._state = SocketState.CLOSED;
          _this._delegate.onSocketClosed(res);
        };
      };
      WxSocket.prototype.send = function(data) {
        this._socketTask.send({
          data: data
        });
      };
      WxSocket.prototype.close = function() {
        if (!this._socketTask) return;
        this._state = SocketState.CLOSING;
        try {
          this._socketTask.close();
        } catch (err) {
          Log_1.Log.error("error while closing webSocket ", err);
        }
        this._socketTask = null;
      };
      WxSocket.prototype.getState = function() {
        return this._state;
      };
      return WxSocket;
    }();
    exports.WxSocket = WxSocket;
    cc._RF.pop();
  }, {
    "../utils/Log": "Log"
  } ],
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
    var IDataModel_1 = require("../base/IDataModel");
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
    "../base/IDataModel": "IDataModel"
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
      TipsItem = __decorate([ ccclass, menu("ui/Common/TipsItem") ], TipsItem);
      return TipsItem;
    }(cc.Component);
    exports.TipsItem = TipsItem;
    cc._RF.pop();
  }, {} ],
  Touchable: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "33309ZcD1xHR6WNKIcqLFRn", "Touchable");
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
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
    var click_interval = 1;
    var Touchable = function(_super) {
      __extends(Touchable, _super);
      function Touchable() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.interactable = true;
        _this.audioClip = null;
        _this.clicked = null;
        _this._pressed = false;
        return _this;
      }
      Touchable.prototype.onEnable = function() {
        this._registerNodeEvent();
      };
      Touchable.prototype.onDisable = function() {
        this._unregisterNodeEvent();
      };
      Touchable.prototype._registerNodeEvent = function() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
      };
      Touchable.prototype._unregisterNodeEvent = function() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchBegan, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this._onTouchEnded, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this._onTouchCancel, this);
      };
      Touchable.prototype._onTouchBegan = function(event) {
        if (!this.interactable || !this.enabledInHierarchy) return;
        this._pressed = true;
        event.stopPropagation();
        this.audioClip && cc.audioEngine.play(this.audioClip, false, 1);
      };
      Touchable.prototype._onTouchMove = function(event) {
        if (!this.interactable || !this.enabledInHierarchy || !this._pressed) return;
        event.stopPropagation();
      };
      Touchable.prototype._onTouchEnded = function(event) {
        if (!this.interactable || !this.enabledInHierarchy) return;
        this._pressed = false;
        event.stopPropagation();
        this.clicked && this.clicked();
      };
      Touchable.prototype._onTouchCancel = function() {
        if (!this.interactable || !this.enabledInHierarchy) return;
        this._pressed = false;
      };
      __decorate([ property(cc.Boolean) ], Touchable.prototype, "interactable", void 0);
      __decorate([ property(cc.AudioClip) ], Touchable.prototype, "audioClip", void 0);
      Touchable = __decorate([ ccclass, menu("UIExtension/Touchable") ], Touchable);
      return Touchable;
    }(cc.Component);
    exports.default = Touchable;
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
    var EventMng_1 = require("../manager/EventMng");
    var UIMng_1 = require("../manager/UIMng");
    var UIHelp_1 = require("../utils/UIHelp");
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
      UIBase.prototype.onShow = function() {
        this.node.active = true;
      };
      UIBase.prototype.onHide = function() {
        UIMng_1.default.getInstance().hideUI(this.mTag);
      };
      UIBase.prototype.onStart = function() {};
      UIBase.prototype.onUpdate = function(dt) {};
      UIBase.prototype.onClose = function() {
        UIHelp_1.default.CloseUI(this.mTag);
      };
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
    "../manager/EventMng": "EventMng",
    "../manager/UIMng": "UIMng",
    "../utils/UIHelp": "UIHelp"
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
    var UIBase_1 = require("../../base/UIBase");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var EventMng_1 = require("../../manager/EventMng");
    var EventConst_1 = require("../../utils/EventConst");
    var Log_1 = require("../../utils/Log");
    var auto_zhujiemianUI_1 = require("../../data/autoui/scene/auto_zhujiemianUI");
    var Utils_1 = require("../../utils/Utils");
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
        _this.mMapSpine = new Array(5);
        _this.CountDownLabel = null;
        _this.HoursLabel = null;
        _this.MinutesLabel = null;
        _this.SecondsLabel = null;
        _this.PeopleLabel = null;
        _this.MoneyLabel = null;
        _this.CountTime = 0;
        _this.mCreateWormhole = EventConst_1.Constant.CREATEWORMHOLETIME;
        _this.mEnterWormhole = EventConst_1.Constant.ENTERWORMHOLETIME;
        _this.mBufferTime = EventConst_1.Constant.BUFFERTIME;
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
        this.PeopleLabel = this.ui.People.getComponent(cc.Label);
        this.MoneyLabel = this.ui.Money.getComponent(cc.Label);
        this.MoneyLabel.string = GameDataCenter_1.default.battle.GetRemaining().toString();
        cc.game.on(cc.game.EVENT_HIDE, function() {
          GameDataCenter_1.default.battle.GameOver("\u8fdb\u5165\u540e\u53f0", 0);
        }, this);
        this.schedule(function() {
          this.CountDown();
        }, 1);
        this.map_spine = this.mWormhole.getComponent(sp.Skeleton);
        this.through_spine = this.mThrough.getComponent(sp.Skeleton);
        for (var index = 0; index < 5; index++) this.mMapSpine[index] = this.mMap[index].getComponent(sp.Skeleton);
      };
      UIBattle.prototype.onRegisterEvent = function() {
        EventMng_1.default.on(EventConst_1.GameEvent.ENTERWORMHOLE, this.EnterWormhole, this);
        EventMng_1.default.on(EventConst_1.GameEvent.UPDATEREMAINING, this.UpdateRemaining, this);
      };
      UIBattle.prototype.unRegisterEvent = function() {
        EventMng_1.default.off(EventConst_1.GameEvent.ENTERWORMHOLE, this.EnterWormhole, this);
        EventMng_1.default.off(EventConst_1.GameEvent.UPDATEREMAINING, this.UpdateRemaining, this);
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
        GameDataCenter_1.default.battle.SetCountTime(this.CountTime);
        var tiemArr = Utils_1.default.GetHMS(this.CountTime);
        this.HoursLabel.string = tiemArr[0];
        this.MinutesLabel.string = tiemArr[1];
        this.SecondsLabel.string = tiemArr[2];
        if (this.mBufferTime >= 0 && !GameDataCenter_1.default.battle.GetTouch()) {
          this.mBufferTime -= 1;
          this.CountDownLabel.string = this.mBufferTime.toString();
          this.mBufferTime <= 0 && GameDataCenter_1.default.battle.GameOver("\u672a\u70b9\u51fb\u5c4f\u5e55", 0);
          return;
        }
        if (this.mCreateWormhole > 0) this.mCreateWormhole -= 1; else {
          this.mCreateWormhole = EventConst_1.Constant.CREATEWORMHOLETIME;
          if (!this.mIsEnterWormhole) {
            GameDataCenter_1.default.battle.GameOver("\u672a\u8fdb\u5165\u866b\u6d1e", 0);
            this.unschedule(this.CountDown);
          }
        }
        if (10 == this.mCreateWormhole) {
          this.mIsEnterWormhole = false;
          this.CreateWormhole();
        }
        this.CountDownLabel.string = this.mCreateWormhole.toString();
      };
      UIBattle.prototype.CreateWormhole = function() {
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
        this.mThrough.active = true;
        this.mThrough.setPosition(this.UFPPos);
        this.through_spine.setAnimation(0, "animation1", false);
        this.scheduleOnce(this.SetThroughActive, 1.5);
        this.mIsEnterWormhole = true;
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
        var _this = this;
        for (var index = 0; index < 5; index++) this.mMap[index].active = index == random;
        if (this.CountTime <= EventConst_1.Constant.MAPTIME1) this.mMapSpine[random].setAnimation(0, "animation1", true); else if (this.CountTime > EventConst_1.Constant.MAPTIME1 || this.CountTime < EventConst_1.Constant.MAPTIME2) {
          this.mMapSpine[random].addAnimation(0, "animation2", false);
          this.mMapSpine[random].setEndListener(function(trackEntry) {
            var animationName = trackEntry.animation ? trackEntry.animation.name : "";
            "animation2" === animationName ? _this.mMapSpine[random].addAnimation(0, "animation1", false) : _this.mMapSpine[random].addAnimation(0, "animation2", false);
          });
        } else this.mMapSpine[random].setAnimation(0, "animation2", true);
      };
      UIBattle.prototype.SetThroughActive = function() {
        this.SetMapActive(this.randomMap);
        this.mThrough.active = false;
        this.unschedule(this.SetThroughActive);
        this.mWormhole.active = false;
      };
      UIBattle.prototype.UpdateRemaining = function(count) {
        this.MoneyLabel.string = count.toString();
      };
      UIBattle.prefabUrl = "db://a";
      UIBattle.className = "UIBattle";
      __decorate([ property([ cc.Node ]) ], UIBattle.prototype, "mMap", void 0);
      __decorate([ property([ cc.Node ]) ], UIBattle.prototype, "mThrough", void 0);
      __decorate([ property([ cc.Node ]) ], UIBattle.prototype, "mWormhole", void 0);
      UIBattle = __decorate([ ccclass, menu("ui/scene/UIBattle") ], UIBattle);
      return UIBattle;
    }(UIBase_1.default);
    exports.default = UIBattle;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/scene/auto_zhujiemianUI": "auto_zhujiemianUI",
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst",
    "../../utils/Log": "Log",
    "../../utils/Utils": "Utils"
  } ],
  UIChangeName: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a1458KY1y9Fz4o8NTcxqvDc", "UIChangeName");
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
    var auto_xiugaimingzi_1 = require("../../data/autoui/popup/auto_xiugaimingzi");
    var UIBase_1 = require("../../base/UIBase");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var EventMng_1 = require("../../manager/EventMng");
    var EventConst_1 = require("../../utils/EventConst");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIChangeName = function(_super) {
      __extends(UIChangeName, _super);
      function UIChangeName() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.name = "";
        _this.error_label = null;
        return _this;
      }
      UIChangeName.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_xiugaimingzi_1.default);
        this.error_label = this.ui.error.getComponent(cc.Label);
      };
      UIChangeName.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
        this.addEventListener(this.ui.btn_entrar, this.onEntrar, this);
        EventMng_1.default.on(EventConst_1.GameEvent.CHANGENAME, this.onSuccessful, this);
        EventMng_1.default.on(EventConst_1.GameEvent.CHANGENAMERESULT, this.onResult, this);
      };
      UIChangeName.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
        this.removeEventListener(this.ui.btn_entrar, this.onEntrar, this);
        EventMng_1.default.off(EventConst_1.GameEvent.CHANGENAME, this.onSuccessful, this);
        EventMng_1.default.off(EventConst_1.GameEvent.CHANGENAMERESULT, this.onResult, this);
      };
      UIChangeName.prototype.onEntrar = function() {
        this.name = this.ui.username.getComponent(cc.EditBox).string;
        if ("" == this.name) {
          this.onResult("name is null");
          return;
        }
        this.ui.error.active = false;
        GameDataCenter_1.default.account.GameChangeName_Quest(this.name);
      };
      UIChangeName.prototype.onSuccessful = function() {
        GameDataCenter_1.default.account.setName(this.name);
      };
      UIChangeName.prototype.onResult = function(content) {
        this.ui.error.active = true;
        this.error_label.string = content;
      };
      UIChangeName.prefabUrl = "popup/xiugaimingzi";
      UIChangeName.className = "UIChangeName";
      UIChangeName = __decorate([ ccclass, menu("ui/popup/UIChangeName") ], UIChangeName);
      return UIChangeName;
    }(UIBase_1.default);
    exports.default = UIChangeName;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/popup/auto_xiugaimingzi": "auto_xiugaimingzi",
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst"
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
    var UIBase_1 = require("../../base/UIBase");
    var auto_xuanzhe_1 = require("../../data/autoui/popup/auto_xuanzhe");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var Log_1 = require("../../utils/Log");
    var EventConst_1 = require("../../utils/EventConst");
    var EventMng_1 = require("../../manager/EventMng");
    var Utils_1 = require("../../utils/Utils");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIChoose = function(_super) {
      __extends(UIChoose, _super);
      function UIChoose() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.PageView = null;
        _this.Group = null;
        _this.Tyep = 1;
        _this.ToggleArray = new Array();
        _this.CountDownArray = new Array();
        _this.PeopleArray = new Array();
        _this.GameInfoList = null;
        _this.GameInfoID = -1;
        _this.error_label = null;
        _this.HMSArray = null;
        return _this;
      }
      UIChoose.prototype.onInit = function(params) {
        this.Tyep = params;
      };
      UIChoose.prototype.onUILoad = function() {
        var _this = this;
        this.ui = this.node.addComponent(auto_xuanzhe_1.default);
        this.PageView = this.ui.PageView.getComponent(cc.PageView);
        this.Group = this.ui.ToggleGroup.getComponent(cc.ToggleGroup);
        this.GameInfoList = GameDataCenter_1.default.battle.GetGameListByType(this.Tyep);
        this.error_label = this.ui.error.getComponent(cc.Label);
        cc.loader.loadRes("prefab/popup/xuanzhe_page", function(error, prefab) {
          if (error) {
            console.error("" + error);
            return;
          }
          var index = 0;
          _this.GameInfoList.forEach(function(val) {
            if (index % 4 == 0) {
              var uiNode = cc.instantiate(prefab);
              _this.PageView.addPage(uiNode);
              for (var i = 1; i <= 4; ++i) {
                var toggle = uiNode.getChildByName(i.toString()).getComponent(cc.Toggle);
                toggle.toggleGroup = _this.Group;
                _this.Group.addToggle(toggle);
                toggle.node.name = (val.ID + i - 1).toString();
                toggle.node.on("toggle", _this.SelectCallback, _this);
                _this.ToggleArray[val.ID + i - 1] = toggle;
              }
            }
            index++;
            _this.onUpdateItem(val);
          });
        });
      };
      UIChoose.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
        this.addEventListener(this.ui.btn_signup, this.onSignup, this);
        EventMng_1.default.on(EventConst_1.GameEvent.UPDATETIME, this.onUpdateTime, this);
        EventMng_1.default.on(EventConst_1.GameEvent.UPDATEPEOPLE, this.onUpdatePeople, this);
        EventMng_1.default.on(EventConst_1.GameEvent.SIGNUPRESULT, this.onSignupResult, this);
      };
      UIChoose.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
        this.removeEventListener(this.ui.btn_signup, this.onSignup, this);
        EventMng_1.default.off(EventConst_1.GameEvent.UPDATETIME, this.onUpdateTime, this);
        EventMng_1.default.off(EventConst_1.GameEvent.UPDATEPEOPLE, this.onUpdatePeople, this);
        EventMng_1.default.off(EventConst_1.GameEvent.SIGNUPRESULT, this.onSignupResult, this);
      };
      UIChoose.prototype.onSignup = function() {
        if (this.GameInfoID <= 0) {
          this.onSignupResult("Please select a session", 0);
          return;
        }
        var money = 0;
        1 == this.Tyep ? money = 1 : 2 == this.Tyep && (money = 10);
        if (GameDataCenter_1.default.account.getMoney() < money) {
          this.onSignupResult("Not sufficient funds", 0);
          return;
        }
        GameDataCenter_1.default.battle.GameApply_Quest(this.GameInfoID);
      };
      UIChoose.prototype.SelectCallback = function(event) {
        this.ui.error.active = false;
        var toggle = event;
        if (toggle.isChecked) {
          var currIndex = Number(toggle.name.split("<")[0]);
          if (this.GameInfoID == currIndex) return;
          this.GameInfoID = currIndex;
          Log_1.Log.log(Log_1.LOG_TAG.debug, "=======toggle", currIndex);
        }
      };
      UIChoose.prototype.onUpdateItem = function(val) {
        this.ToggleArray[val.ID].node.getChildByName("time").getComponent(cc.Label).string = val.Info;
        var peppleLabel = this.ToggleArray[val.ID].node.getChildByName("people").getComponent(cc.Label);
        var countdownLabel = this.ToggleArray[val.ID].node.getChildByName("countdown").getComponent(cc.Label);
        peppleLabel.string = val.Count.toString();
        if (1 != val.State) this.SetToggleUnusable(val.ID, countdownLabel); else if (this.GameInfoList[val.ID].Second < 0) this.SetToggleUnusable(val.ID, countdownLabel); else {
          this.CountDownArray[val.ID] = countdownLabel;
          countdownLabel.string = val.Second.toString();
          this.PeopleArray[val.ID] = peppleLabel;
        }
      };
      UIChoose.prototype.SetToggleUnusable = function(ID, countdownLabel) {
        if (this.ToggleArray[ID]) {
          this.ToggleArray[ID].interactable = false;
          this.ToggleArray[ID].isChecked = false;
          this.ToggleArray[ID].node.getChildByName("nor_bg").active = false;
          this.ToggleArray[ID].node.getChildByName("end_bg").active = true;
          this.ToggleArray[ID].node.getChildByName("checkmark").active = false;
          this.ToggleArray[ID].node.getChildByName("checkmark").active = false;
        }
        countdownLabel.string = "00:00:00";
      };
      UIChoose.prototype.onUpdateTime = function(ID) {
        if (this.CountDownArray[ID]) {
          this.HMSArray = Utils_1.default.GetHMS(this.GameInfoList[ID].Second);
          this.CountDownArray[ID].string = this.HMSArray[0] + ":" + this.HMSArray[1] + ":" + this.HMSArray[2];
        }
      };
      UIChoose.prototype.onUpdatePeople = function(ID) {
        this.PeopleArray[ID] && (this.PeopleArray[ID].string = this.GameInfoList[ID].Count.toString());
      };
      UIChoose.prototype.onSignupResult = function(content, result) {
        this.ui.error.active = true;
        this.error_label.string = content;
        result > 0 && GameDataCenter_1.default.account.addJoninGameID(this.GameInfoID);
      };
      UIChoose.prefabUrl = "popup/xuanzhe";
      UIChoose.className = "UIChoose";
      UIChoose = __decorate([ ccclass, menu("ui/popup/UIChoose") ], UIChoose);
      return UIChoose;
    }(UIBase_1.default);
    exports.default = UIChoose;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/popup/auto_xuanzhe": "auto_xuanzhe",
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst",
    "../../utils/Log": "Log",
    "../../utils/Utils": "Utils"
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
    var auto_confirmDialog_1 = require("../../data/autoui/tips/auto_confirmDialog");
    var UIBase_1 = require("../../base/UIBase");
    var UIHelp_1 = require("../../utils/UIHelp");
    var Log_1 = require("../../utils/Log");
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
      UIConfirmDialog = UIConfirmDialog_1 = __decorate([ ccclass, menu("ui/tips/UIConfirmDialog") ], UIConfirmDialog);
      return UIConfirmDialog;
    }(UIBase_1.default);
    exports.default = UIConfirmDialog;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/tips/auto_confirmDialog": "auto_confirmDialog",
    "../../utils/Log": "Log",
    "../../utils/UIHelp": "UIHelp"
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
    var UIMng_1 = require("../manager/UIMng");
    var ViewZOrder_1 = require("./ViewZOrder");
    var UITips_1 = require("../ui/tips/UITips");
    var UIConfirmDialog_1 = require("../ui/tips/UIConfirmDialog");
    var LoadingCircle_1 = require("../ui/tips/LoadingCircle");
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
      UIHelp.ShowHideCircleView = function(isShow, timeout) {
        void 0 === timeout && (timeout = 15);
        var wnd = UIMng_1.default.getInstance().getUI(LoadingCircle_1.default);
        if (wnd) if (isShow) {
          wnd.onShow();
          wnd.SetTimeout(timeout);
        } else wnd.onHide(); else isShow && UIMng_1.default.getInstance().openUI(LoadingCircle_1.default, ViewZOrder_1.ViewZorder.Loading, function(ui) {
          UIHelp.ShowHideCircleView(isShow, timeout);
        });
      };
      return UIHelp;
    }();
    exports.default = UIHelp;
    cc._RF.pop();
  }, {
    "../manager/UIMng": "UIMng",
    "../ui/tips/LoadingCircle": "LoadingCircle",
    "../ui/tips/UIConfirmDialog": "UIConfirmDialog",
    "../ui/tips/UITips": "UITips",
    "./ViewZOrder": "ViewZOrder"
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
    var UIBase_1 = require("../../base/UIBase");
    var auto_lishijilu_1 = require("../../data/autoui/popup/auto_lishijilu");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var UIHelp_1 = require("../../utils/UIHelp");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIHistorye = function(_super) {
      __extends(UIHistorye, _super);
      function UIHistorye() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.PageView = null;
        _this.HistoryList = null;
        _this.ItemArray = new Array();
        return _this;
      }
      UIHistorye.prototype.onUILoad = function() {
        var _this = this;
        this.ui = this.node.addComponent(auto_lishijilu_1.default);
        this.PageView = this.ui.PageView.getComponent(cc.PageView);
        UIHelp_1.default.ShowHideCircleView(true);
        cc.loader.loadRes("prefab/popup/lishijilu_page", function(error, prefab) {
          if (error) {
            console.error("" + error);
            UIHelp_1.default.ShowHideCircleView(false);
            return;
          }
          _this.HistoryList = GameDataCenter_1.default.account.getHistoryList();
          if (!_this.HistoryList || _this.HistoryList.length <= 0) {
            UIHelp_1.default.ShowHideCircleView(false);
            return;
          }
          var index = 0;
          _this.HistoryList.forEach(function(val) {
            if (index % 7 == 0) {
              var uiNode = cc.instantiate(prefab);
              _this.PageView.addPage(uiNode);
              for (var i = 1; i <= 7; ++i) {
                var item = uiNode.getChildByName(i.toString());
                _this.ItemArray[index + i] = item;
              }
            }
            index++;
            _this.onUpdateItem(val, index);
          });
          for (var i = index + 1; i < _this.ItemArray.length; ++i) _this.ItemArray[i].active = false;
          UIHelp_1.default.ShowHideCircleView(false);
        });
      };
      UIHistorye.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
      };
      UIHistorye.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
      };
      UIHistorye.prototype.onUpdateItem = function(val, index) {
        this.ItemArray[index].getChildByName("time").getComponent(cc.Label).string = val.Time;
        this.ItemArray[index].getChildByName("people").getComponent(cc.Label).string = val.Count.toString();
        this.ItemArray[index].getChildByName("noun").getComponent(cc.Label).string = val.Rank.toString();
        this.ItemArray[index].getChildByName("first").getComponent(cc.Label).string = val.Name;
      };
      UIHistorye.prefabUrl = "popup/lishijilu";
      UIHistorye.className = "UIHistorye";
      UIHistorye = __decorate([ ccclass, menu("ui/popup/UIHistorye") ], UIHistorye);
      return UIHistorye;
    }(UIBase_1.default);
    exports.default = UIHistorye;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/popup/auto_lishijilu": "auto_lishijilu",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/UIHelp": "UIHelp"
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
    var UIBase_1 = require("../../base/UIBase");
    var UIHelp_1 = require("../../utils/UIHelp");
    var GameController_1 = require("../../GameController");
    var auto_denglu_1 = require("../../data/autoui/scene/auto_denglu");
    var UIRules_1 = require("../popup/UIRules");
    var Log_1 = require("../../utils/Log");
    var UIPayment_1 = require("../popup/UIPayment");
    var UIMobileLogin_1 = require("../popup/UIMobileLogin");
    var UIHistory_1 = require("../popup/UIHistory");
    var UIRest_1 = require("../popup/UIRest");
    var EventMng_1 = require("../../manager/EventMng");
    var EventConst_1 = require("../../utils/EventConst");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var Utils_1 = require("../../utils/Utils");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UILogic = function(_super) {
      __extends(UILogic, _super);
      function UILogic() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.error_label = null;
        _this.time_label = null;
        _this.gameInfo = null;
        _this.joinGameID = 0;
        _this.HMSArray = null;
        _this.gamelist = new Array();
        return _this;
      }
      UILogic.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_denglu_1.default);
        this.error_label = this.ui.error.getComponent(cc.Label);
        this.time_label = this.ui.countdown.getComponent(cc.Label);
      };
      UILogic.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_rules, this.onRules, this);
        this.addEventListener(this.ui.btn_history, this.onHistory, this);
        this.addEventListener(this.ui.btn_signup, this.onSignup, this);
        this.addEventListener(this.ui.btn_fackbook, this.onLoginFB, this);
        this.addEventListener(this.ui.btn_google, this.onLoginGL, this);
        this.addEventListener(this.ui.btn_mobile, this.onLoginMB, this);
        this.addEventListener(this.ui.btn_signup2, this.onSignup2, this);
        this.addEventListener(this.ui.btn_logout, this.onLogout, this);
        this.addEventListener(this.ui.btn_playerInfo, this.onPlayerInfo, this);
        EventMng_1.default.on(EventConst_1.SocketEvent.SOCKET_OPEN, this.onSocketOpen, this);
        EventMng_1.default.on(EventConst_1.GameEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);
      };
      UILogic.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_rules, this.onRules, this);
        this.removeEventListener(this.ui.btn_history, this.onHistory, this);
        this.removeEventListener(this.ui.btn_signup, this.onSignup, this);
        this.removeEventListener(this.ui.btn_fackbook, this.onLoginFB, this);
        this.removeEventListener(this.ui.btn_google, this.onLoginGL, this);
        this.removeEventListener(this.ui.btn_mobile, this.onLoginMB, this);
        this.removeEventListener(this.ui.btn_signup2, this.onSignup2, this);
        this.removeEventListener(this.ui.btn_logout, this.onLogout, this);
        this.removeEventListener(this.ui.btn_playerInfo, this.onPlayerInfo, this);
        EventMng_1.default.off(EventConst_1.SocketEvent.SOCKET_OPEN, this.onSocketOpen, this);
        EventMng_1.default.off(EventConst_1.GameEvent.LOGIN_SUCCESS, this.onLoginSuccess, this);
      };
      UILogic.prototype.onStart = function() {
        Log_1.Log.log(Log_1.LOG_TAG.debug, "=======onStart");
        GameController_1.default.init();
        GameController_1.default.network.connect();
        UIHelp_1.default.ShowHideCircleView(true, 1);
      };
      UILogic.prototype.onDestroy = function() {
        this.unschedule(this.CountDown);
      };
      UILogic.prototype.onSocketOpen = function() {
        Log_1.Log.log(Log_1.LOG_TAG.debug, "=======onSocketOpen");
        if (GameDataCenter_1.default.account.getIsChangeUrl()) {
          Log_1.Log.log(Log_1.LOG_TAG.debug, "uilogin PlayerLogin_Quest");
          GameDataCenter_1.default.account.PlayerLogin_Quest();
        } else {
          if (GameDataCenter_1.default.account.getIsChangeUser) return;
          var name = GameDataCenter_1.default.account.getName();
          var password = GameDataCenter_1.default.account.getPassword();
          Log_1.Log.log(Log_1.LOG_TAG.debug, "name", name, "password", password);
          if ("" != name && "" != password) {
            Log_1.Log.log(Log_1.LOG_TAG.debug, "\u6709\u8d26\u53f7\u5bc6\u7801\uff0c\u81ea\u52a8\u767b\u9646");
            GameDataCenter_1.default.account.AccountLogin_Quest(name, password);
          }
        }
      };
      UILogic.prototype.onLoginSuccess = function() {
        this.ui.login.active = true;
        this.ui.unlogin.active = false;
        this.ui.label_name.getComponent(cc.Label).string = GameDataCenter_1.default.account.getName();
        this.onUpdateTime();
      };
      UILogic.prototype.onRules = function() {
        UIHelp_1.default.ShowUI(UIRules_1.default);
      };
      UILogic.prototype.onHistory = function() {
        UIHelp_1.default.ShowUI(UIHistory_1.default);
      };
      UILogic.prototype.onSignup = function() {
        GameDataCenter_1.default.account.getIsLoginSuccessful() || this.onResult("Please login first");
        console.log("==============22");
      };
      UILogic.prototype.onLoginFB = function() {
        Log_1.Log.log(Log_1.LOG_TAG.debug, "login fb sdk");
        UIHelp_1.default.ShowTips("\u767b\u5f55\u6210\u529f\uff01");
      };
      UILogic.prototype.onLoginGL = function() {
        Log_1.Log.log(Log_1.LOG_TAG.debug, "login google sdk");
        this.ui.unlogin.active = false;
        this.ui.login.active = true;
      };
      UILogic.prototype.onLoginMB = function() {
        UIHelp_1.default.ShowUI(UIMobileLogin_1.default);
      };
      UILogic.prototype.onSignup2 = function() {
        UIHelp_1.default.ShowUI(UIRest_1.default);
      };
      UILogic.prototype.onLogout = function() {
        this.ui.unlogin.active = true;
        this.ui.login.active = false;
        GameDataCenter_1.default.account.setIsChangeUrl(false);
        GameDataCenter_1.default.account.setIsLoginSuccessful(false);
        GameController_1.default.network.connect();
      };
      UILogic.prototype.onPlayerInfo = function() {
        UIHelp_1.default.ShowUI(UIPayment_1.default);
      };
      UILogic.prototype.CountDown = function() {
        if (!this.gameInfo) return;
        this.HMSArray = Utils_1.default.GetHMS(this.gameInfo.Second);
        this.time_label.string = this.HMSArray[0] + ":" + this.HMSArray[1] + ":" + this.HMSArray[2];
      };
      UILogic.prototype.onResult = function(content) {
        this.ui.error.active = true;
        this.error_label.string = content;
      };
      UILogic.prototype.onUpdateTime = function() {
        this.joinGameID = GameDataCenter_1.default.account.getJoninGameID();
        if (this.joinGameID > 0) {
          this.ui.countdown.active = true;
          this.gameInfo = GameDataCenter_1.default.battle.GetGameInfo(this.joinGameID);
          this.schedule(function() {
            this.CountDown();
          }, 1);
        } else this.ui.countdown.active = true;
      };
      UILogic.prototype.onSignupResult = function(content, result) {
        result > 0 && this.onUpdateTime();
      };
      UILogic.prefabUrl = "db://a";
      UILogic.className = "UILogic";
      UILogic = __decorate([ ccclass, menu("ui/scene/UILogic") ], UILogic);
      return UILogic;
    }(UIBase_1.default);
    exports.default = UILogic;
    cc._RF.pop();
  }, {
    "../../GameController": "GameController",
    "../../base/UIBase": "UIBase",
    "../../data/autoui/scene/auto_denglu": "auto_denglu",
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst",
    "../../utils/Log": "Log",
    "../../utils/UIHelp": "UIHelp",
    "../../utils/Utils": "Utils",
    "../popup/UIHistory": "UIHistory",
    "../popup/UIMobileLogin": "UIMobileLogin",
    "../popup/UIPayment": "UIPayment",
    "../popup/UIRest": "UIRest",
    "../popup/UIRules": "UIRules"
  } ],
  UIMng: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "095acjxR4dMrLp13+/TROMD", "UIMng");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var ViewZOrder_1 = require("../utils/ViewZOrder");
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
    "../utils/ViewZOrder": "ViewZOrder"
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
    var UIBase_1 = require("../../base/UIBase");
    var auto_shoujidenglu_1 = require("../../data/autoui/popup/auto_shoujidenglu");
    var UIHelp_1 = require("../../utils/UIHelp");
    var UIRegistered_1 = require("./UIRegistered");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var EventMng_1 = require("../../manager/EventMng");
    var EventConst_1 = require("../../utils/EventConst");
    var Log_1 = require("../../utils/Log");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIMobileLogin = function(_super) {
      __extends(UIMobileLogin, _super);
      function UIMobileLogin() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.error_label = null;
        return _this;
      }
      UIMobileLogin.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_shoujidenglu_1.default);
        this.error_label = this.ui.error.getComponent(cc.Label);
      };
      UIMobileLogin.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
        this.addEventListener(this.ui.btn_entrar, this.onLogin, this);
        this.addEventListener(this.ui.btn_register, this.onRegister, this);
        EventMng_1.default.on(EventConst_1.GameEvent.LOGINRESULT, this.onLoginResult, this);
      };
      UIMobileLogin.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
        this.removeEventListener(this.ui.btn_entrar, this.onLogin, this);
        this.removeEventListener(this.ui.btn_register, this.onRegister, this);
        EventMng_1.default.off(EventConst_1.GameEvent.LOGINRESULT, this.onLoginResult, this);
      };
      UIMobileLogin.prototype.onLogin = function() {
        this.ui.error.active = false;
        GameDataCenter_1.default.account.AccountLogin_Quest("test001", "test001");
      };
      UIMobileLogin.prototype.onRegister = function() {
        UIHelp_1.default.ShowUI(UIRegistered_1.default);
      };
      UIMobileLogin.prototype.onSocketOpen = function() {
        Log_1.Log.log(Log_1.LOG_TAG.debug, "onSocketOpen==");
        GameDataCenter_1.default.account.PlayerLogin_Quest();
      };
      UIMobileLogin.prototype.onLoginResult = function(content) {
        this.ui.error.active = true;
        this.error_label.string = content;
      };
      UIMobileLogin.prefabUrl = "popup/shoujidenglu";
      UIMobileLogin.className = "UIMobileLogin";
      UIMobileLogin = __decorate([ ccclass, menu("ui/popup/UIMobileLogin") ], UIMobileLogin);
      return UIMobileLogin;
    }(UIBase_1.default);
    exports.default = UIMobileLogin;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/popup/auto_shoujidenglu": "auto_shoujidenglu",
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst",
    "../../utils/Log": "Log",
    "../../utils/UIHelp": "UIHelp",
    "./UIRegistered": "UIRegistered"
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
    var UIBase_1 = require("../../base/UIBase");
    var auto_qianbao_1 = require("../../data/autoui/popup/auto_qianbao");
    var EventMng_1 = require("../../manager/EventMng");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var EventConst_1 = require("../../utils/EventConst");
    var UIHelp_1 = require("../../utils/UIHelp");
    var UIChangeName_1 = require("./UIChangeName");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIPayment = function(_super) {
      __extends(UIPayment, _super);
      function UIPayment() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.moneyIndex = 1;
        _this.payIndex = 1;
        _this.moneyBg = new Array();
        _this.payBg = new Array();
        return _this;
      }
      UIPayment.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_qianbao_1.default);
        for (var i = 1; i <= 4; ++i) {
          this.ui.Toggle_Money.getChildByName(i.toString()).on("toggle", this.MoneyCallback, this);
          this.ui.Toggle_Pay.getChildByName(i.toString()).on("toggle", this.PayCallback, this);
          this.moneyBg[i] = this.ui.Toggle_Money.getChildByName(i.toString()).getChildByName("bg");
          this.payBg[i] = this.ui.Toggle_Pay.getChildByName(i.toString()).getChildByName("bg");
        }
        this.onUpdateName();
        this.ui.Label_Money.getComponent(cc.Label).string = GameDataCenter_1.default.account.getMoney().toString();
      };
      UIPayment.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
        this.addEventListener(this.ui.btn_change, this.onChange, this);
        this.addEventListener(this.ui.btn_recharge, this.onRecharge, this);
        this.addEventListener(this.ui.btn_withdrawal, this.onWithdrawal, this);
        EventMng_1.default.on(EventConst_1.GameEvent.CHANGENAME, this.onSuccessful, this);
      };
      UIPayment.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
        this.removeEventListener(this.ui.btn_change, this.onChange, this);
        this.removeEventListener(this.ui.btn_recharge, this.onRecharge, this);
        this.removeEventListener(this.ui.btn_withdrawal, this.onWithdrawal, this);
        EventMng_1.default.off(EventConst_1.GameEvent.CHANGENAME, this.onSuccessful, this);
      };
      UIPayment.prototype.MoneyCallback = function(event) {
        var toggle = event;
        if (toggle.isChecked) {
          var currIndex = Number(toggle.name.split("<")[0]);
          if (this.moneyIndex == currIndex) return;
          this.moneyIndex = currIndex;
          4 == this.moneyIndex && this.ui.EditBox_Money.getComponent(cc.EditBox).focus();
          for (var i = 1; i <= 4; ++i) this.moneyBg[i].active = i != currIndex;
        }
      };
      UIPayment.prototype.PayCallback = function(event) {
        var toggle = event;
        if (toggle.isChecked) {
          var currIndex = Number(toggle.name.split("<")[0]);
          if (this.payIndex == currIndex) return;
          this.payIndex = currIndex;
          for (var i = 1; i <= 4; ++i) this.payBg[i].active = i != currIndex;
        }
      };
      UIPayment.prototype.onChange = function() {
        UIHelp_1.default.ShowUI(UIChangeName_1.default);
      };
      UIPayment.prototype.onSuccessful = function() {
        this.onUpdateName();
      };
      UIPayment.prototype.onUpdateName = function() {
        this.ui.Label_Name.getComponent(cc.Label).string = GameDataCenter_1.default.account.getName();
      };
      UIPayment.prototype.onRecharge = function() {
        GameDataCenter_1.default.pay.ChoosePay_Quest(1);
      };
      UIPayment.prototype.onWithdrawal = function() {};
      UIPayment.prefabUrl = "popup/qianbao";
      UIPayment.className = "UIPayment";
      UIPayment = __decorate([ ccclass, menu("ui/popup/UIPayment") ], UIPayment);
      return UIPayment;
    }(UIBase_1.default);
    exports.default = UIPayment;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/popup/auto_qianbao": "auto_qianbao",
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst",
    "../../utils/UIHelp": "UIHelp",
    "./UIChangeName": "UIChangeName"
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
    var UIBase_1 = require("../../base/UIBase");
    var auto_zhucejiemain_1 = require("../../data/autoui/popup/auto_zhucejiemain");
    var EventMng_1 = require("../../manager/EventMng");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var EventConst_1 = require("../../utils/EventConst");
    var Log_1 = require("../../utils/Log");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIRegistered = function(_super) {
      __extends(UIRegistered, _super);
      function UIRegistered() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.error_label = null;
        return _this;
      }
      UIRegistered.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_zhucejiemain_1.default);
        this.error_label = this.ui.error.getComponent(cc.Label);
      };
      UIRegistered.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
        this.addEventListener(this.ui.btn_entrar, this.onLogin, this);
        EventMng_1.default.on(EventConst_1.GameEvent.REGISTEREDRESULT, this.onRegistedResult, this);
      };
      UIRegistered.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
        this.removeEventListener(this.ui.btn_entrar, this.onLogin, this);
        EventMng_1.default.off(EventConst_1.GameEvent.REGISTEREDRESULT, this.onRegistedResult, this);
      };
      UIRegistered.prototype.onLogin = function() {
        var username = this.ui.username.getComponent(cc.EditBox).string;
        if ("" == username) {
          this.onRegistedResult("username is null");
          return;
        }
        Log_1.Log.log(Log_1.LOG_TAG.debug, "user", username);
        var password = this.ui.password.getComponent(cc.EditBox).string;
        if ("" == password) {
          this.onRegistedResult("password is null");
          return;
        }
        var password_again = this.ui.password_again.getComponent(cc.EditBox).string;
        if ("" == password_again) {
          this.onRegistedResult("password again is null");
          return;
        }
        if (password != password_again) {
          this.onRegistedResult("Password inconsistency");
          return;
        }
        this.ui.error.active = false;
        GameDataCenter_1.default.account.AccountRegister_Quest(username, password);
      };
      UIRegistered.prototype.onRegistedResult = function(content) {
        this.ui.error.active = true;
        this.error_label.string = content;
      };
      UIRegistered.prefabUrl = "popup/zhucejiemain";
      UIRegistered.className = "UIRegistered";
      UIRegistered = __decorate([ ccclass, menu("ui/popup/UIRegistered") ], UIRegistered);
      return UIRegistered;
    }(UIBase_1.default);
    exports.default = UIRegistered;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/popup/auto_zhucejiemain": "auto_zhucejiemain",
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst",
    "../../utils/Log": "Log"
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
    var UIBase_1 = require("../../base/UIBase");
    var auto_regret_1 = require("../../data/autoui/scene/auto_regret");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var Utils_1 = require("../../utils/Utils");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIRegret = function(_super) {
      __extends(UIRegret, _super);
      function UIRegret() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
      }
      UIRegret.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_regret_1.default);
        var HoursLabel = this.ui.Hours.getComponent(cc.Label);
        var MinutesLabel = this.ui.Minutes.getComponent(cc.Label);
        var SecondsLabel = this.ui.Seconds.getComponent(cc.Label);
        var rank = this.ui.Rank.getComponent(cc.Label);
        var tiemArr = Utils_1.default.GetHMS(GameDataCenter_1.default.battle.GetCountTime());
        HoursLabel.string = tiemArr[0];
        MinutesLabel.string = tiemArr[1];
        SecondsLabel.string = tiemArr[2];
        rank.string = GameDataCenter_1.default.battle.GetRank().toString();
      };
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
      UIRegret = __decorate([ ccclass, menu("ui/scene/UIRegret") ], UIRegret);
      return UIRegret;
    }(UIBase_1.default);
    exports.default = UIRegret;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/scene/auto_regret": "auto_regret",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/Utils": "Utils"
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
    var UIBase_1 = require("../../base/UIBase");
    var UIHelp_1 = require("../../utils/UIHelp");
    var auto_quyu_1 = require("../../data/autoui/popup/auto_quyu");
    var UIChoose_1 = require("./UIChoose");
    var EventMng_1 = require("../../manager/EventMng");
    var EventConst_1 = require("../../utils/EventConst");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIRest = function(_super) {
      __extends(UIRest, _super);
      function UIRest() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.Label_Low = null;
        _this.Label_Height = null;
        return _this;
      }
      UIRest_1 = UIRest;
      UIRest.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_quyu_1.default);
        this.Label_Low = this.ui.Label_Low.getComponent(cc.Label);
        this.Label_Height = this.ui.Label_Height.getComponent(cc.Label);
        this.onUpdatePeople(1);
      };
      UIRest.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
        this.addEventListener(this.ui.btn_height, this.onHeight, this);
        this.addEventListener(this.ui.btn_low, this.onLow, this);
        EventMng_1.default.on(EventConst_1.GameEvent.UPDATEPEOPLE, this.onUpdatePeople, this);
      };
      UIRest.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
        this.removeEventListener(this.ui.btn_height, this.onHeight, this);
        this.removeEventListener(this.ui.btn_low, this.onLow, this);
        EventMng_1.default.off(EventConst_1.GameEvent.UPDATEPEOPLE, this.onUpdatePeople, this);
      };
      UIRest.prototype.onHeight = function() {
        UIHelp_1.default.CloseUI(UIRest_1);
        UIHelp_1.default.ShowUI(UIChoose_1.default, null, 2);
      };
      UIRest.prototype.onLow = function() {
        UIHelp_1.default.CloseUI(UIRest_1);
        UIHelp_1.default.ShowUI(UIChoose_1.default, null, 0);
      };
      UIRest.prototype.onUpdatePeople = function(ID) {
        var lowCount = GameDataCenter_1.default.battle.GetPeopleByType(0);
        var heightCount = GameDataCenter_1.default.battle.GetPeopleByType(2);
        this.Label_Low.string = lowCount.toString();
        this.Label_Height.string = heightCount.toString();
      };
      var UIRest_1;
      UIRest.prefabUrl = "popup/quyu";
      UIRest.className = "UIRest";
      UIRest = UIRest_1 = __decorate([ ccclass, menu("ui/popup/UIRest") ], UIRest);
      return UIRest;
    }(UIBase_1.default);
    exports.default = UIRest;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/popup/auto_quyu": "auto_quyu",
    "../../manager/EventMng": "EventMng",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/EventConst": "EventConst",
    "../../utils/UIHelp": "UIHelp",
    "./UIChoose": "UIChoose"
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
    var UIBase_1 = require("../../base/UIBase");
    var auto_wanfa_1 = require("../../data/autoui/popup/auto_wanfa");
    var Log_1 = require("../../utils/Log");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIRules = function(_super) {
      __extends(UIRules, _super);
      function UIRules() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        _this.PageView = null;
        return _this;
      }
      UIRules.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_wanfa_1.default);
        this.PageView = this.ui.PageView.getComponent(cc.PageView);
        this.ui.PageView.on("page-turning", this.callback, this);
      };
      UIRules.prototype.onRegisterEvent = function() {
        this.addEventListener(this.ui.btn_close, this.onClose, this);
      };
      UIRules.prototype.unRegisterEvent = function() {
        this.removeEventListener(this.ui.btn_close, this.onClose, this);
      };
      UIRules.prototype.callback = function(pageView) {
        Log_1.Log.log(Log_1.LOG_TAG.debug, "=================page", this.PageView.getCurrentPageIndex());
      };
      UIRules.prefabUrl = "popup/wanfa";
      UIRules.className = "UIRules";
      UIRules = __decorate([ ccclass, menu("ui/popup/UIRules") ], UIRules);
      return UIRules;
    }(UIBase_1.default);
    exports.default = UIRules;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/popup/auto_wanfa": "auto_wanfa",
    "../../utils/Log": "Log"
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
    var UIBase_1 = require("../../base/UIBase");
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
      UITips = __decorate([ ccclass, menu("ui/tips/UITips") ], UITips);
      return UITips;
    }(UIBase_1.default);
    exports.default = UITips;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
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
    var UIBase_1 = require("../../base/UIBase");
    var auto_victory_1 = require("../../data/autoui/scene/auto_victory");
    var GameDataCenter_1 = require("../../manager/GameDataCenter");
    var Utils_1 = require("../../utils/Utils");
    var _a = cc._decorator, ccclass = _a.ccclass, menu = _a.menu, property = _a.property;
    var UIVictory = function(_super) {
      __extends(UIVictory, _super);
      function UIVictory() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.ui = null;
        return _this;
      }
      UIVictory.prototype.onUILoad = function() {
        this.ui = this.node.addComponent(auto_victory_1.default);
        var HoursLabel = this.ui.Hours.getComponent(cc.Label);
        var MinutesLabel = this.ui.Minutes.getComponent(cc.Label);
        var SecondsLabel = this.ui.Seconds.getComponent(cc.Label);
        var rank = this.ui.Rank.getComponent(cc.Label);
        var tiemArr = Utils_1.default.GetHMS(GameDataCenter_1.default.battle.GetCountTime());
        HoursLabel.string = tiemArr[0];
        MinutesLabel.string = tiemArr[1];
        SecondsLabel.string = tiemArr[2];
        rank.string = GameDataCenter_1.default.battle.GetRank().toString();
      };
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
      UIVictory = __decorate([ ccclass, menu("ui/scene/UIVictory") ], UIVictory);
      return UIVictory;
    }(UIBase_1.default);
    exports.default = UIVictory;
    cc._RF.pop();
  }, {
    "../../base/UIBase": "UIBase",
    "../../data/autoui/scene/auto_victory": "auto_victory",
    "../../manager/GameDataCenter": "GameDataCenter",
    "../../utils/Utils": "Utils"
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
        this.login = this.denglu1.getChildByName("login");
        this.btn_signup2 = this.login.getChildByName("btn_signup2");
        this.btn_playerInfo = this.login.getChildByName("btn_playerInfo");
        this.btn_logout = this.login.getChildByName("btn_logout");
        this.denglu_1_07_11 = this.login.getChildByName("denglu_1_07_11");
        this.countdown = this.login.getChildByName("countdown");
        this.denglu_1_04_8 = this.countdown.getChildByName("denglu_1_04_8");
        this.label_name = this.login.getChildByName("label_name");
        this.unlogin = this.denglu1.getChildByName("unlogin");
        this.btn_google = this.unlogin.getChildByName("btn_google");
        this.btn_fackbook = this.unlogin.getChildByName("btn_fackbook");
        this.btn_mobile = this.unlogin.getChildByName("btn_mobile");
        this.btn_signup = this.unlogin.getChildByName("btn_signup");
        this.error = this.unlogin.getChildByName("error");
        this.denglu = this.Canvas.getChildByName("denglu");
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
        this.btn_close = this.lishijilu.getChildByName("btn_close");
        this.denglu_2_03_17 = this.lishijilu.getChildByName("denglu_2_03_17");
        this.denglu_2_02_16 = this.lishijilu.getChildByName("denglu_2_02_16");
        this.denglu_2_01_15 = this.lishijilu.getChildByName("denglu_2_01_15");
        this.denglu_6_01_49 = this.lishijilu.getChildByName("denglu_6_01_49");
        this.PageView = this.lishijilu.getChildByName("PageView");
        this.view = this.PageView.getChildByName("view");
        this.content = this.view.getChildByName("content");
        this.indicator = this.PageView.getChildByName("indicator");
      };
      auto_lishijilu.URL = "db://assets/resources/prefab/popup/lishijilu.prefab";
      auto_lishijilu = __decorate([ ccclass ], auto_lishijilu);
      return auto_lishijilu;
    }(cc.Component);
    exports.default = auto_lishijilu;
    cc._RF.pop();
  }, {} ],
  auto_notice: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "ef416P+AahFpYVH+h7IbNTV", "auto_notice");
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
    var auto_notice = function(_super) {
      __extends(auto_notice, _super);
      function auto_notice() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_notice.prototype.onLoad = function() {
        this.notice = this.node;
        this.background = this.notice.getChildByName("background");
        this.title = this.notice.getChildByName("title");
        this.content = this.notice.getChildByName("content");
        this.btnClose = this.notice.getChildByName("btnClose");
      };
      auto_notice.URL = "db://assets/resources/prefab/notice/notice.prefab";
      auto_notice = __decorate([ ccclass ], auto_notice);
      return auto_notice;
    }(cc.Component);
    exports.default = auto_notice;
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
        this.btn_close = this.qianbao.getChildByName("btn_close");
        this.denglu_3_08_13 = this.qianbao.getChildByName("denglu_3_08_13");
        this.btn_recharge = this.qianbao.getChildByName("btn_recharge");
        this.btn_withdrawal = this.qianbao.getChildByName("btn_withdrawal");
        this.denglu_3_03_9 = this.qianbao.getChildByName("denglu_3_03_9");
        this.denglu_3_02_8 = this.qianbao.getChildByName("denglu_3_02_8");
        this.denglu_3_11_4 = this.qianbao.getChildByName("denglu_3_11_4");
        this.btn_change = this.qianbao.getChildByName("btn_change");
        this.Label_Name = this.qianbao.getChildByName("Label_Name");
        this.EditBox_Money = this.qianbao.getChildByName("EditBox_Money");
        this.TEXT_Money = this.EditBox_Money.getChildByName("TEXT_Money");
        this.Label_Money = this.qianbao.getChildByName("Label_Money");
        this.denglu_3_04_10 = this.Label_Money.getChildByName("denglu_3_04_10");
        this.EditBox_Name = this.qianbao.getChildByName("EditBox_Name");
        this.TEXT_Name = this.EditBox_Name.getChildByName("TEXT_Name");
        this.Toggle_Money = this.qianbao.getChildByName("Toggle_Money");
        this.Toggle_Pay = this.qianbao.getChildByName("Toggle_Pay");
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
        this.btn_close = this.quyu.getChildByName("btn_close");
        this.denglu_5_03_36 = this.quyu.getChildByName("denglu_5_03_36");
        this.btn_height = this.quyu.getChildByName("btn_height");
        this.btn_low = this.quyu.getChildByName("btn_low");
        this.denglu_5_06_6 = this.quyu.getChildByName("denglu_5_06_6");
        this.denglu_5_06_6_0 = this.quyu.getChildByName("denglu_5_06_6_0");
        this.denglu_5_05_5 = this.quyu.getChildByName("denglu_5_05_5");
        this.Label_Low = this.quyu.getChildByName("Label_Low");
        this.Label_Height = this.quyu.getChildByName("Label_Height");
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
        this.Hours = this.Canvas.getChildByName("Hours");
        this.Sprite_9_0_1 = this.Hours.getChildByName("Sprite_9_0_1");
        this.Minutes = this.Sprite_9_0_1.getChildByName("Minutes");
        this.Sprite_9_0_2 = this.Minutes.getChildByName("Sprite_9_0_2");
        this.Seconds = this.Sprite_9_0_2.getChildByName("Seconds");
        this.Rank = this.Canvas.getChildByName("Rank");
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
        this.btn_close = this.shoujidenglu.getChildByName("btn_close");
        this.denglu_7_07_19 = this.shoujidenglu.getChildByName("denglu_7_07_19");
        this.denglu_7_07_19_0 = this.shoujidenglu.getChildByName("denglu_7_07_19_0");
        this.btn_entrar = this.shoujidenglu.getChildByName("btn_entrar");
        this.btn_register = this.shoujidenglu.getChildByName("btn_register");
        this.denglu_7_04_16 = this.shoujidenglu.getChildByName("denglu_7_04_16");
        this.pass_error = this.shoujidenglu.getChildByName("pass_error");
        this.denglu_7_02_14 = this.shoujidenglu.getChildByName("denglu_7_02_14");
        this.denglu_7_01_13 = this.shoujidenglu.getChildByName("denglu_7_01_13");
        this.username = this.shoujidenglu.getChildByName("username");
        this.user = this.username.getChildByName("user");
        this.password = this.shoujidenglu.getChildByName("password");
        this.pass = this.password.getChildByName("pass");
        this.error = this.shoujidenglu.getChildByName("error");
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
        this.Hours = this.Canvas.getChildByName("Hours");
        this.Sprite_9_0_1 = this.Hours.getChildByName("Sprite_9_0_1");
        this.Minutes = this.Sprite_9_0_1.getChildByName("Minutes");
        this.Sprite_9_0_2 = this.Minutes.getChildByName("Sprite_9_0_2");
        this.Seconds = this.Sprite_9_0_2.getChildByName("Seconds");
        this.Rank = this.Canvas.getChildByName("Rank");
        this.Money = this.Canvas.getChildByName("Money");
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
  auto_xiugaimingzi: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b2b23j/aItLt5IL0FwDL9CP", "auto_xiugaimingzi");
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
    var auto_xiugaimingzi = function(_super) {
      __extends(auto_xiugaimingzi, _super);
      function auto_xiugaimingzi() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_xiugaimingzi.prototype.onLoad = function() {
        this.xiugaimingzi = this.node;
        this.Image_1 = this.xiugaimingzi.getChildByName("Image_1");
        this.btn_close = this.xiugaimingzi.getChildByName("btn_close");
        this.denglu_7_07_19 = this.xiugaimingzi.getChildByName("denglu_7_07_19");
        this.btn_entrar = this.xiugaimingzi.getChildByName("btn_entrar");
        this.username = this.xiugaimingzi.getChildByName("username");
        this.user = this.username.getChildByName("user");
        this.denglu_3_11_4 = this.xiugaimingzi.getChildByName("denglu_3_11_4");
        this.error = this.xiugaimingzi.getChildByName("error");
      };
      auto_xiugaimingzi.URL = "db://assets/resources/prefab/popup/xiugaimingzi.prefab";
      auto_xiugaimingzi = __decorate([ ccclass ], auto_xiugaimingzi);
      return auto_xiugaimingzi;
    }(cc.Component);
    exports.default = auto_xiugaimingzi;
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
        this.btn_close = this.xuanzhe.getChildByName("btn_close");
        this.denglu_4_04_24 = this.xuanzhe.getChildByName("denglu_4_04_24");
        this.btn_signup = this.xuanzhe.getChildByName("btn_signup");
        this.ToggleGroup = this.xuanzhe.getChildByName("ToggleGroup");
        this.PageView = this.xuanzhe.getChildByName("PageView");
        this.view = this.PageView.getChildByName("view");
        this.content = this.view.getChildByName("content");
        this.indicator = this.PageView.getChildByName("indicator");
        this.error = this.xuanzhe.getChildByName("error");
      };
      auto_xuanzhe.URL = "db://assets/resources/prefab/popup/xuanzhe.prefab";
      auto_xuanzhe = __decorate([ ccclass ], auto_xuanzhe);
      return auto_xuanzhe;
    }(cc.Component);
    exports.default = auto_xuanzhe;
    cc._RF.pop();
  }, {} ],
  auto_zhucejiemain: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "410f7Se2i1Cq6K/mdKu3q4K", "auto_zhucejiemain");
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
    var auto_zhucejiemain = function(_super) {
      __extends(auto_zhucejiemain, _super);
      function auto_zhucejiemain() {
        return null !== _super && _super.apply(this, arguments) || this;
      }
      auto_zhucejiemain.prototype.onLoad = function() {
        this.zhucejiemain = this.node;
        this.Image_1 = this.zhucejiemain.getChildByName("Image_1");
        this.btn_close = this.zhucejiemain.getChildByName("btn_close");
        this.denglu_7_07_19 = this.zhucejiemain.getChildByName("denglu_7_07_19");
        this.denglu_7_07_19_0 = this.zhucejiemain.getChildByName("denglu_7_07_19_0");
        this.btn_entrar = this.zhucejiemain.getChildByName("btn_entrar");
        this.denglu_7_02_14 = this.zhucejiemain.getChildByName("denglu_7_02_14");
        this.denglu_7_01_13 = this.zhucejiemain.getChildByName("denglu_7_01_13");
        this.denglu_7_07_19_0_0 = this.zhucejiemain.getChildByName("denglu_7_07_19_0_0");
        this.username = this.zhucejiemain.getChildByName("username");
        this.user = this.username.getChildByName("user");
        this.password = this.zhucejiemain.getChildByName("password");
        this.pass = this.password.getChildByName("pass");
        this.password_again = this.zhucejiemain.getChildByName("password_again");
        this.pass_again = this.password_again.getChildByName("pass_again");
        this.denglu_7_01_13_0 = this.zhucejiemain.getChildByName("denglu_7_01_13_0");
        this.denglu_8_05_7 = this.zhucejiemain.getChildByName("denglu_8_05_7");
        this.denglu_8_04_6 = this.zhucejiemain.getChildByName("denglu_8_04_6");
        this.denglu_8_03_5 = this.zhucejiemain.getChildByName("denglu_8_03_5");
        this.denglu_8_02_4 = this.zhucejiemain.getChildByName("denglu_8_02_4");
        this.user_error = this.zhucejiemain.getChildByName("user_error");
        this.error = this.zhucejiemain.getChildByName("error");
      };
      auto_zhucejiemain.URL = "db://assets/resources/prefab/popup/zhucejiemain.prefab";
      auto_zhucejiemain = __decorate([ ccclass ], auto_zhucejiemain);
      return auto_zhucejiemain;
    }(cc.Component);
    exports.default = auto_zhucejiemain;
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
        this.Hours = this.ZJMUI_2_4.getChildByName("Hours");
        this.Sprite_9_0_1 = this.Hours.getChildByName("Sprite_9_0_1");
        this.Minutes = this.Sprite_9_0_1.getChildByName("Minutes");
        this.Sprite_9_0_2 = this.Minutes.getChildByName("Sprite_9_0_2");
        this.Seconds = this.Sprite_9_0_2.getChildByName("Seconds");
        this.People = this.ZJMUI_2_4.getChildByName("People");
        this.Money = this.ZJMUI_2_4.getChildByName("Money");
        this.Sprite_9 = this.Canvas.getChildByName("Sprite_9");
        this.Sprite_9_0 = this.Canvas.getChildByName("Sprite_9_0");
      };
      auto_zhujiemianUI.URL = "db://assets/scene/zhujiemianUI.fire";
      auto_zhujiemianUI = __decorate([ ccclass ], auto_zhujiemianUI);
      return auto_zhujiemianUI;
    }(cc.Component);
    exports.default = auto_zhujiemianUI;
    cc._RF.pop();
  }, {} ],
  checkout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "22aebs8tZxHxLgvF35TGExD", "checkout");
    "use strict";
    !function() {
      !function() {
        var s = window, c = s.document, n = s.Boolean, i = s.Array, l = s.Object, r = s.String, m = s.Number, u = s.Date, d = s.Math, a = s.setTimeout, e = s.setInterval, t = s.clearTimeout, f = s.parseInt, h = s.encodeURIComponent, v = s.btoa, _ = s.unescape, p = s.TypeError, y = s.navigator, b = s.location, o = s.XMLHttpRequest, g = s.FormData;
        function D(t) {
          return function(e, n) {
            return arguments.length < 2 ? function(n) {
              return t.call(null, n, e);
            } : t.call(null, e, n);
          };
        }
        function S(i) {
          return function(e, t, n) {
            return arguments.length < 3 ? function(n) {
              return i.call(null, n, e, t);
            } : i.call(null, e, t, n);
          };
        }
        function R() {
          for (var n = arguments.length, e = new i(n), t = 0; t < n; t++) e[t] = arguments[t];
          return function(n) {
            return function() {
              var t = arguments;
              return e.every(function(n, e) {
                if (n(t[e])) return !0;
                !function() {
                  console.error.apply(console, arguments);
                }("wrong " + e + "th argtype", t[e]), s.dispatchEvent(Y("rzp_error", {
                  detail: new Error("wrong " + e + "th argtype " + t[e])
                }));
              }) ? n.apply(null, t) : t[0];
            };
          };
        }
        function k(n) {
          return A(n) && 1 === n.nodeType;
        }
        var w = D(function(n, e) {
          return typeof n === e;
        }), M = w("boolean"), P = w("number"), K = w("string"), N = w("function"), L = w("object"), B = i.isArray, A = (w("undefined"), 
        function(n) {
          return !(null === n) && L(n);
        }), T = function T(n) {
          return !E(l.keys(n));
        }, C = D(function(n, e) {
          return n && n[e];
        }), E = C("length"), x = C("prototype"), G = D(function(n, e) {
          return n instanceof e;
        }), z = u.now, F = d.random, O = d.floor;
        function I(n, e) {
          return {
            error: (t = e, i = {
              description: r(n)
            }, t && (i.field = t), i)
          };
          var t, i;
        }
        function $(n) {
          throw new Error(n);
        }
        var H = function H(n) {
          return /data:image\/[^;]+;base64/.test(n);
        };
        function U(n) {
          var e = function a(o, r) {
            var m = {};
            if (!A(o)) return m;
            var u = null == r;
            return l.keys(o).forEach(function(n) {
              var e, t = o[n], i = u ? n : r + "[" + n + "]";
              "object" == typeof t ? (e = a(t, i), l.keys(e).forEach(function(n) {
                m[n] = e[n];
              })) : m[i] = t;
            }), m;
          }(n);
          return l.keys(e).map(function(n) {
            return h(n) + "=" + h(e[n]);
          }).join("&");
        }
        function Z(n, e) {
          return A(e) && (e = U(e)), e && (n += 0 < n.indexOf("?") ? "&" : "?", n += e), n;
        }
        function Y(n, e) {
          e = e || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
          };
          var t = c.createEvent("CustomEvent");
          return t.initCustomEvent(n, e.bubbles, e.cancelable, e.detail), t;
        }
        function j(n) {
          return l.keys(n || {});
        }
        function W(n) {
          return Ln(Nn(n));
        }
        function q(e, i, a, o) {
          return G(e, Tn) ? console.error("use el |> _El.on(e, cb)") : function(t) {
            var n = i;
            return K(a) ? n = function n(_n2) {
              for (var e = _n2.target; !ee(e, a) && e !== t; ) e = En(e);
              e !== t && (_n2.delegateTarget = e, i(_n2));
            } : o = a, o = !!o, t.addEventListener(e, n, o), function() {
              return t.removeEventListener(e, n, o);
            };
          };
        }
        function V(n) {
          return K(n) ? ce(n) : n;
        }
        var J, Q, X, nn, en, tn, an, on, rn, mn, un, cn, ln, sn = x(i), dn = sn.slice, fn = D(function(n, e) {
          return n && sn.forEach.call(n, e), n;
        }), hn = (J = "indexOf", D(function(n, e) {
          return sn[J].call(n, e);
        })), vn = D(function(n, e) {
          return 0 <= hn(n, e);
        }), _n = D(function(n, e) {
          return dn.call(n, e);
        }), pn = S(function(n, e, t) {
          return sn.reduce.call(n, e, t);
        }), yn = function yn(n) {
          return n;
        }, bn = (x(Function), X = function X(n, e) {
          return n.bind(e);
        }, Q = function Q(n) {
          if (N(n)) return X.apply(null, arguments);
          throw new p("not a function");
        }, D(function(n, e) {
          var t = arguments;
          return K(n) && ((t = _n(t, 0))[0] = e[n]), Q.apply(null, t);
        })), gn = x(r).slice, Dn = S(function(n, e, t) {
          return gn.call(n, e, t);
        }), Sn = D(function(n, e) {
          return gn.call(n, e);
        }), Rn = D(function(n, e) {
          return e in n;
        }), kn = D(function(n, e) {
          return n && n.hasOwnProperty(e);
        }), wn = S(function(n, e, t) {
          return n[e] = t, n;
        }), Mn = S(function(n, e, t) {
          return t && (n[e] = t), n;
        }), Pn = D(function(n, e) {
          return delete n[e], n;
        }), Kn = D(function(e, t) {
          return fn(j(e), function(n) {
            return t(e[n], n, e);
          }), e;
        }), Nn = JSON.stringify, Ln = function Ln(n) {
          try {
            return JSON.parse(n);
          } catch (n) {}
        }, Bn = D(function(t, n) {
          return Kn(n, function(n, e) {
            return t[e] = n;
          }), t;
        }), An = function An(n) {
          var e = {};
          return Kn(n, function(t, n) {
            var i = (n = n.replace(/\[([^[\]]+)\]/g, ".$1")).split("."), a = e;
            fn(i, function(n, e) {
              e < i.length - 1 ? (a[n] || (a[n] = {}), a = a[n]) : a[n] = t;
            });
          }), e;
        }, Tn = s.Element, Cn = function Cn(n) {
          return c.createElement(n || "div");
        }, En = function En(n) {
          return n.parentNode;
        }, xn = R(k), Gn = R(k, k), zn = R(k, K), Fn = R(k, K, function() {
          return !0;
        }), On = R(k, A), In = (nn = Gn(function(n, e) {
          return e.appendChild(n);
        }), D(nn)), $n = (en = Gn(function(n, e) {
          var t = e;
          return In(n)(t), n;
        }), D(en)), Hn = xn(function(n) {
          var e = En(n);
          return e && e.removeChild(n), n;
        }), Un = (xn(C("selectionStart")), xn(C("selectionEnd")), an = function an(n, e) {
          return n.selectionStart = n.selectionEnd = e, n;
        }, tn = R(k, P)(an), D(tn), xn(function(n) {
          return n.submit(), n;
        })), Zn = S(Fn(function(n, e, t) {
          return n.setAttribute(e, t), n;
        })), Yn = S(Fn(function(n, e, t) {
          return n.style[e] = t, n;
        })), jn = (on = On(function(i, n) {
          var e = n;
          return Kn(function(n, e) {
            var t = i;
            return Zn(e, n)(t);
          })(e), i;
        }), D(on)), Wn = (rn = On(function(i, n) {
          var e = n;
          return Kn(function(n, e) {
            var t = i;
            return Yn(e, n)(t);
          })(e), i;
        }), D(rn)), qn = (mn = zn(function(n, e) {
          return n.innerHTML = e, n;
        }), D(mn)), Vn = (un = zn(function(n, e) {
          var t = n;
          return Yn("display", e)(t);
        }), D(un)), Jn = (Vn("none"), Vn("block"), Vn("inline-block"), C("offsetWidth")), Qn = C("offsetHeight"), Xn = x(Tn), ne = Xn.matches || Xn.matchesSelector || Xn.webkitMatchesSelector || Xn.mozMatchesSelector || Xn.msMatchesSelector || Xn.oMatchesSelector, ee = (cn = zn(function(n, e) {
          return ne.call(n, e);
        }), D(cn)), te = c.documentElement, ie = c.body, ae = s.innerHeight, oe = s.pageYOffset, re = s.scrollBy, me = s.scrollTo, ue = s.requestAnimationFrame, ce = bn("querySelector", c), le = bn("querySelectorAll", c);
        bn("getElementById", c), bn("getComputedStyle", s);
        function se(n, e, t, i) {
          var a, o, r, m, u, c;
          t && "get" === t.toLowerCase() ? (n = Z(n, e), i ? s.open(n, i) : s.location = n) : (c = {
            action: n,
            method: t
          }, i && (c.target = i), u = Cn("form"), m = jn(c)(u), r = qn(de(e))(m), o = In(te)(r), 
          a = Un(o), Hn(a));
        }
        function de(n, t) {
          if (A(n)) {
            var i = "";
            return Kn(n, function(n, e) {
              t && (e = t + "[" + e + "]"), i += de(n, e);
            }), i;
          }
          var e = Cn("input");
          return e.type = "hidden", e.value = n, e.name = t, e.outerHTML;
        }
        function fe(n) {
          !function(m) {
            if (!s.requestAnimationFrame) return re(0, m);
            ln && t(ln);
            ln = a(function() {
              var i = oe, a = d.min(i + m, Qn(ie) - ae);
              m = a - i;
              var o = 0, r = s.performance.now();
              ue(function n(e) {
                if (1 <= (o += (e - r) / 300)) return me(0, a);
                var t = d.sin(he * o / 2);
                me(0, i + d.round(m * t)), r = e, ue(n);
              });
            }, 100);
          }(n - oe);
        }
        var he = d.PI;
        var ve, _e, pe, ye, be = o, ge = I("Network error"), De = 0;
        function Se(n) {
          if (!G(this, Se)) return new Se(n);
          this.options = function(n) {
            K(n) && (n = {
              url: n
            });
            var e = n.method, t = n.headers, i = n.callback, a = n.data;
            t || (n.headers = {});
            e || (n.method = "get");
            i || (n.callback = yn);
            A(a) && !G(a, g) && (a = U(a));
            return n.data = a, n;
          }(n), this.defer();
        }
        ((pe = {
          setReq: function setReq(n, e) {
            return this.abort(), this.type = n, this.req = e, this;
          },
          till: function till(e, t) {
            var i = this;
            return void 0 === t && (t = 0), this.setReq("timeout", a(function() {
              i.call(function(n) {
                n.error && 0 < t ? i.till(e, t - 1) : e(n) ? i.till(e, t) : i.options.callback(n);
              });
            }, 3e3));
          },
          abort: function abort() {
            var n = this.req, e = this.type;
            n && ("ajax" === e ? this.req.abort() : "jsonp" === e ? s.Razorpay[this.req] = yn : t(this.req), 
            this.req = null);
          },
          defer: function defer() {
            var n = this;
            this.req = a(function() {
              return n.call();
            });
          },
          call: function call(e) {
            var n, t, i;
            void 0 === e && (e = this.options.callback);
            var a = this.options, o = a.url, r = a.method, m = a.data, u = a.headers, c = new be();
            this.setReq("ajax", c), c.open(r, o, !0), c.onreadystatechange = function() {
              var n;
              4 === c.readyState && c.status && ((n = Ln(c.responseText)) || ((n = I("Parsing error")).xhr = {
                status: c.status,
                text: c.responseText
              }), n.error && s.dispatchEvent(Y("rzp_network_error", {
                detail: {
                  method: r,
                  url: o,
                  baseUrl: o.split("?")[0],
                  status: c.status,
                  xhrErrored: !1,
                  response: n
                }
              })), e(n));
            }, c.onerror = function() {
              var n = ge;
              n.xhr = {
                status: 0
              }, s.dispatchEvent(Y("rzp_network_error", {
                detail: {
                  method: r,
                  url: o,
                  baseUrl: o.split("?")[0],
                  status: 0,
                  xhrErrored: !0,
                  response: n
                }
              })), e(n);
            }, i = u, t = Mn("X-Razorpay-SessionId", ve)(i), n = Mn("X-Razorpay-TrackId", _e)(t), 
            Kn(function(n, e) {
              return c.setRequestHeader(e, n);
            })(n), c.send(m);
          }
        }).constructor = Se).prototype = pe, Se.post = function(n) {
          return n.method = "post", n.headers || (n.headers = {}), n.headers["Content-type"] || (n.headers["Content-type"] = "application/x-www-form-urlencoded"), 
          Se(n);
        }, Se.setSessionId = function(n) {
          ve = n;
        }, Se.setTrackId = function(n) {
          _e = n;
        }, Se.jsonp = function(u) {
          u.data || (u.data = {});
          var c = De++, l = 0, n = new Se(u);
          return u = n.options, n.call = function(e) {
            void 0 === e && (e = u.callback);
            function n() {
              i || this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState || (i = !0, 
              this.onload = this.onreadystatechange = null, Hn(this));
            }
            var t = "jsonp" + c + "_" + ++l, i = !1, a = s.Razorpay[t] = function(n) {
              Pn(n, "http_status_code"), e(n), Pn(s.Razorpay, t);
            };
            this.setReq("jsonp", a);
            var o = Z(u.url, u.data), o = Z(o, U({
              callback: "Razorpay." + t
            })), r = Cn("script"), m = Bn({
              src: o,
              async: !0,
              onerror: function onerror() {
                return e(ge);
              },
              onload: n,
              onreadystatechange: n
            })(r);
            In(te)(m);
          }, n;
        };
        var Re = function Re(n) {
          return console.warn("Promise error:", n);
        }, ke = function ke(n) {
          return G(n, we);
        };
        function we(n) {
          if (!ke(this)) throw "new Promise";
          this._state = 0, this._handled = !1, this._value = void 0, this._deferreds = [], 
          Be(n, this);
        }
        function Me(t, i) {
          for (;3 === t._state; ) t = t._value;
          0 !== t._state ? (t._handled = !0, a(function() {
            var n, e = 1 === t._state ? i.onFulfilled : i.onRejected;
            if (null !== e) {
              try {
                n = e(t._value);
              } catch (n) {
                return void Ke(i.promise, n);
              }
              Pe(i.promise, n);
            } else (1 === t._state ? Pe : Ke)(i.promise, t._value);
          })) : t._deferreds.push(i);
        }
        function Pe(e, n) {
          try {
            if (n === e) throw new p("promise resolved by itself");
            if (A(n) || N(n)) {
              var t = n.then;
              if (ke(n)) return e._state = 3, e._value = n, void Ne(e);
              if (N(t)) return void Be(bn(t, n), e);
            }
            e._state = 1, e._value = n, Ne(e);
          } catch (n) {
            Ke(e, n);
          }
        }
        function Ke(n, e) {
          n._state = 2, n._value = e, Ne(n);
        }
        function Ne(e) {
          var n;
          2 === e._state && 0 === e._deferreds.length && a(function() {
            e._handled || Re(e._value);
          }), n = e._deferreds, fn(function(n) {
            return Me(e, n);
          })(n), e._deferreds = null;
        }
        function Le(n, e, t) {
          this.onFulfilled = N(n) ? n : null, this.onRejected = N(e) ? e : null, this.promise = t;
        }
        function Be(n, e) {
          var t = !1;
          try {
            n(function(n) {
              t || (t = !0, Pe(e, n));
            }, function(n) {
              t || (t = !0, Ke(e, n));
            });
          } catch (n) {
            if (t) return;
            t = !0, Ke(e, n);
          }
        }
        ye = we.prototype, Bn({
          catch: function _catch(n) {
            return this.then(null, n);
          },
          then: function then(n, e) {
            var t = new we(yn);
            return Me(this, new Le(n, e, t)), t;
          },
          finally: function _finally(e) {
            return this.then(function(n) {
              return we.resolve(e()).then(function() {
                return n;
              });
            }, function(n) {
              return we.resolve(e()).then(function() {
                return we.reject(n);
              });
            });
          }
        })(ye), we.all = function(r) {
          return new we(function(i, a) {
            if (!r || void 0 === r.length) throw new p("Promise.all accepts an array");
            if (0 === r.length) return i([]);
            var o = r.length, n = r;
            fn(function e(n, t) {
              try {
                if ((A(n) || N(n)) && N(n.then)) return n.then(function(n) {
                  return e(n, t);
                }, a);
                r[t] = n, 0 == --o && i(r);
              } catch (n) {
                a(n);
              }
            })(n);
          });
        }, we.resolve = function(e) {
          return ke(e) ? e : new we(function(n) {
            return n(e);
          });
        }, we.reject = function(t) {
          return new we(function(n, e) {
            return e(t);
          });
        }, we.race = function(i) {
          return new we(function(e, t) {
            var n = i;
            return fn(function(n) {
              return n.then(e, t);
            })(n);
          });
        };
        var Ae = s.Promise, Te = Ae && N(x(Ae).then) && Ae || we;
        N(Te.prototype["finally"]) || (Te.prototype["finally"] = we.prototype["finally"]);
        var Ce = {
          _storage: {},
          setItem: function setItem(n, e) {
            this._storage[n] = e;
          },
          getItem: function getItem(n) {
            return this._storage[n] || null;
          },
          removeItem: function removeItem(n) {
            delete this._storage[n];
          }
        };
        var Ee, xe = function() {
          var n = z();
          try {
            s.localStorage.setItem("_storage", n);
            var e = s.localStorage.getItem("_storage");
            return s.localStorage.removeItem("_storage"), n !== f(e) ? Ce : s.localStorage;
          } catch (n) {
            return Ce;
          }
        }(), Ge = "rzp_checkout_exp";
        var ze = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", Fe = (Ee = ze, 
        pn(function(n, e, t) {
          return wn(n, e, t);
        }, {})(Ee));
        function Oe(n) {
          for (var e = ""; n; ) e = ze[n % 62] + e, n = O(n / 62);
          return e;
        }
        function Ie() {
          var t, i = Oe(r(z() - 13885344e5) + Sn("000000" + O(1e6 * F()), -6)) + Oe(O(238328 * F())) + "0", a = 0, n = i;
          return fn(function(n, e) {
            t = Fe[i[i.length - 1 - e]], (i.length - e) % 2 && (t *= 2), 62 <= t && (t = t % 62 + 1), 
            a += t;
          })(n), t = (t = a % 62) && ze[62 - t], Dn(i, 0, 13) + t;
        }
        var $e = Ie(), He = {
          library: "checkoutjs",
          platform: "browser",
          referer: b.href
        };
        function Ue(n) {
          var t = {
            checkout_id: n ? n.id : $e
          }, e = [ "device", "env", "integration", "library", "os_version", "os", "platform_version", "platform", "referer" ];
          return fn(function(n) {
            var e = t;
            return Mn(n, He[n])(e);
          })(e), t;
        }
        var Ze, Ye = [], je = [], We = function We(n) {
          return Ye.push(n);
        }, qe = function qe(n) {
          Ze = n;
        }, Ve = function Ve() {
          var n, e, t, i;
          if (Ye.length) {
            var a = Rn(y, "sendBeacon"), o = {
              context: Ze,
              addons: [ {
                name: "ua_parser",
                input_key: "user_agent",
                output_key: "user_agent_parsed"
              } ],
              events: Ye.splice(0, Ye.length)
            }, r = {
              url: "https://lumberjack.razorpay.com/v1/track",
              data: {
                key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
                data: (i = Nn(o), t = h(i), e = _(t), n = v(e), h(n))
              }
            };
            try {
              a ? y.sendBeacon(r.url, Nn(r.data)) : Se.post(r);
            } catch (n) {}
          }
        };
        e(function() {
          Ve();
        }, 1e3);
        function Je(r, m, u, c) {
          r ? r.isLiveMode() && a(function() {
            var n;
            u instanceof Error && (u = {
              message: u.message,
              stack: u.stack
            });
            var e = Ue(r);
            e.user_agent = null, e.mode = "live";
            var t = r.get("order_id");
            t && (e.order_id = t);
            var i = {}, a = {
              options: i
            };
            u && (a.data = u), i = Bn(i, An(r.get())), Rn(i, "prefill") && fn([ "card" ], function(n) {
              Rn(i.prefill, n) && (i.prefill[n] = !0);
            }), i.image && H(i.image) && (i.image = "base64");
            var o = r.get("external.wallets") || [];
            i.external_wallets = (n = o, pn(function(n, e) {
              var t = n;
              return wn(e, !0)(t);
            }, {})(n)), $e && (a.local_order_id = $e), a.build_number = 10836, a.experiments = function() {
              try {
                var n = xe.getItem(Ge), e = Ln(n);
              } catch (n) {}
              return A(e) && !B(e) ? e : {};
            }(), We({
              event: m,
              properties: a,
              timestamp: z()
            }), qe(e), c && Ve();
          }) : je.push([ m, u, c ]);
        }
        Je.dispatchPendingEvents = function(n) {
          var e;
          n && (e = Je.bind(Je, n), je.splice(0, je.length).forEach(function(n) {
            e.apply(Je, n);
          }));
        }, Je.parseAnalyticsData = function(n) {
          var e;
          A(n) && (e = n, Kn(function(n, e) {
            He[n] = e;
          })(e));
        }, Je.makeUid = Ie, Je.common = Ue, Je.props = He, Je.id = $e, Je.updateUid = function(n) {
          Je.id = $e = n;
        }, Je.flush = Ve;
        function Qe(n) {
          var t = function i(n, a) {
            void 0 === a && (a = "");
            var o = {};
            return Kn(n, function(n, e) {
              var t = a ? a + "." + e : e;
              A(n) ? Bn(o, i(n, t)) : o[t] = n;
            }), o;
          }(n);
          return Kn(t, function(n, e) {
            N(n) && (t[e] = n.call());
          }), t;
        }
        var Xe, nt = {}, et = {}, tt = {
          setR: function setR(n) {
            Je.dispatchPendingEvents(Xe = n);
          },
          track: function track(n, e) {
            var t, i = void 0 === e ? {} : e, a = i.type, o = i.data, r = void 0 === o ? {} : o, m = i.r, u = void 0 === m ? Xe : m, c = i.immediately, l = void 0 !== c && c, s = Qe(nt);
            t = W(r || {}), [ "token" ].forEach(function(n) {
              t[n] && (t[n] = "__REDACTED__");
            }), (r = A(r = t) ? W(r) : {
              data: r
            }).meta && A(r.meta) && (s = Bn(s, r.meta)), r.meta = s, r.meta.request_index = et[Xe.id], 
            a && (n = a + ":" + n), Je(u, n, r, l);
          },
          setMeta: function setMeta(n, e) {
            wn(nt, n, e);
          },
          removeMeta: function removeMeta(n) {
            Pn(nt, n);
          },
          getMeta: function getMeta() {
            return An(nt);
          },
          updateRequestIndex: function updateRequestIndex(n) {
            if (!Xe || !n) return 0;
            Rn(et, Xe.id) || (et[Xe.id] = {});
            var e = et[Xe.id];
            return Rn(e, n) || (e[n] = -1), e[n] += 1, e[n];
          }
        };
        function it() {
          return this._evts = {}, this._defs = {}, this;
        }
        it.prototype = {
          onNew: yn,
          def: function def(n, e) {
            this._defs[n] = e;
          },
          on: function on(n, e) {
            var t;
            return K(n) && N(e) && ((t = this._evts)[n] || (t[n] = []), !1 !== this.onNew(n, e) && t[n].push(e)), 
            this;
          },
          once: function once(e, n) {
            var t = n, i = this;
            return n = function n() {
              t.apply(i, arguments), i.off(e, n);
            }, this.on(e, n);
          },
          off: function off(t, n) {
            var e = arguments.length;
            if (!e) return it.call(this);
            var i = this._evts;
            if (2 === e) {
              var a = i[t];
              if (!N(n) || !B(a)) return;
              if (a.splice(hn(a, n), 1), a.length) return;
            }
            return i[t] ? delete i[t] : (t += ".", Kn(i, function(n, e) {
              e.indexOf(t) || delete i[e];
            })), this;
          },
          emit: function emit(n, e) {
            var t = this;
            return fn(this._evts[n], function(n) {
              try {
                n.call(t, e);
              } catch (n) {
                console.error;
              }
            }), this;
          },
          emitter: function emitter() {
            var n = arguments, e = this;
            return function() {
              e.emit.apply(e, n);
            };
          }
        };
        var at = y.userAgent, ot = y.vendor;
        function rt(n) {
          return n.test(at);
        }
        function mt(n) {
          return n.test(ot);
        }
        rt(/MSIE |Trident\//);
        var ut = rt(/iPhone/), ct = ut || rt(/iPad/), lt = (rt(/Android/), rt(/iPad/), rt(/Windows NT/), 
        rt(/Linux/), rt(/Mac OS/), rt(/^((?!chrome|android).)*safari/i) || mt(/Apple/), 
        rt(/firefox/), rt(/Chrome/) && mt(/Google Inc/), rt(/; wv\) |Gecko\) Version\/[^ ]+ Chrome/), 
        rt(/Instagram/)), st = rt(/FB_IAB\/FB4A/), dt = rt(/FBAN\/FBIOS/), ft = st || dt;
        var ht = rt(/; wv\) |Gecko\) Version\/[^ ]+ Chrome|Windows Phone|Opera Mini|UCBrowser|CriOS/) || ft || lt || ct || rt(/Android 4/), vt = (rt(/iPhone/), 
        (vt = at.match(/Chrome\/(\d+)/)) && f(vt[1], 10)), _t = (rt(/(Vivo|HeyTap|Realme|Oppo)Browser/), 
        {
          key: "",
          account_id: "",
          image: "",
          amount: 100,
          currency: "INR",
          order_id: "",
          invoice_id: "",
          subscription_id: "",
          auth_link_id: "",
          payment_link_id: "",
          notes: null,
          callback_url: "",
          redirect: !1,
          description: "",
          customer_id: "",
          recurring: null,
          payout: null,
          contact_id: "",
          signature: "",
          retry: !0,
          target: "",
          subscription_card_change: null,
          display_currency: "",
          display_amount: "",
          recurring_token: {
            max_amount: 0,
            expire_by: 0
          },
          checkout_config_id: "",
          send_sms_hash: !1
        });
        function pt(n, e, t, i) {
          var a = e[t = t.toLowerCase()], o = typeof a;
          "object" == o && null === a ? K(i) && ("true" === i || "1" === i ? i = !0 : "false" !== i && "0" !== i || (i = !1)) : "string" == o && (P(i) || M(i)) ? i = r(i) : "number" == o ? i = m(i) : "boolean" == o && (K(i) ? "true" === i || "1" === i ? i = !0 : "false" !== i && "0" !== i || (i = !1) : P(i) && (i = !!i)), 
          null !== a && o != typeof i || (n[t] = i);
        }
        function yt(i, a, o) {
          Kn(i[a], function(n, e) {
            var t = typeof n;
            "string" != t && "number" != t && "boolean" != t || (e = a + o[0] + e, 1 < o.length && (e += o[1]), 
            i[e] = n);
          }), delete i[a];
        }
        function bt(n, i) {
          var a = {};
          return Kn(n, function(n, t) {
            t in gt ? Kn(n, function(n, e) {
              pt(a, i, t + "." + e, n);
            }) : pt(a, i, t, n);
          }), a;
        }
        var gt = {};
        function Dt(t) {
          Kn(_t, function(n, t) {
            A(n) && !T(n) && (gt[t] = !0, Kn(n, function(n, e) {
              _t[t + "." + e] = n;
            }), delete _t[t]);
          }), (t = bt(t, _t)).callback_url && ht && (t.redirect = !0), this.get = function(n) {
            return arguments.length ? n in t ? t[n] : _t[n] : t;
          }, this.set = function(n, e) {
            t[n] = e;
          }, this.unset = function(n) {
            delete t[n];
          };
        }
        var St, Rt, kt, wt = "rzp_device_id", Mt = 1, Pt = "", Kt = "", Nt = s.screen;
        try {
          kt = [ y.userAgent, y.language, new u().getTimezoneOffset(), y.platform, y.cpuClass, y.hardwareConcurrency, Nt.colorDepth, y.deviceMemory, Nt.width + Nt.height, Nt.width * Nt.height, s.devicePixelRatio ], 
          St = kt.join(), Rt = new s.TextEncoder("utf-8").encode(St), s.crypto.subtle.digest("SHA-1", Rt).then(function(n) {
            return Pt = function(n) {
              for (var e = [], t = new s.DataView(n), i = 0; i < t.byteLength; i += 4) {
                var a = t.getUint32(i).toString(16), o = "00000000", r = (o + a).slice(-o.length);
                e.push(r);
              }
              return e.join("");
            }(n);
          }).then(function(n) {
            n && function(n) {
              if (n) {
                try {
                  Kt = xe.getItem(wt);
                } catch (n) {}
                if (!Kt) {
                  Kt = [ Mt, n, u.now(), d.random().toString().slice(-8) ].join(".");
                  try {
                    xe.setItem(wt, Kt);
                  } catch (n) {}
                }
              }
            }(Pt = n);
          })["catch"](n);
        } catch (n) {}
        function Lt(n, t, e) {
          var i;
          void 0 === e && (e = {});
          var a = W(n);
          e.feesRedirect && (a.view = "html");
          var o = t.get;
          fn([ "amount", "currency", "signature", "description", "order_id", "account_id", "notes", "subscription_id", "auth_link_id", "payment_link_id", "customer_id", "recurring", "subscription_card_change", "recurring_token.max_amount", "recurring_token.expire_by" ], function(n) {
            var e, t = a;
            kn(n)(t) || (e = o(n)) && (M(e) && (e = 1), a[n.replace(/\.(\w+)/g, "[$1]")] = e);
          });
          var r = o("key");
          !a.key_id && r && (a.key_id = r), e.avoidPopup && "wallet" === a.method && (a["_[source]"] = "checkoutjs"), 
          (e.tez || e.gpay) && (a["_[flow]"] = "intent", a["_[app]"] = "com.google.android.apps.nbu.paisa.user"), 
          fn([ "integration", "integration_version", "integration_parent_version" ], function(n) {
            var e = t.get("_." + n);
            e && (a["_[" + n + "]"] = e);
          }), Pt && (a["_[shield][fhash]"] = Pt), Kt && (a["_[device_id]"] = Kt), a["_[shield][tz]"] = -new u().getTimezoneOffset(), 
          i = Bt, Kn(function(n, e) {
            a["_[shield][" + e + "]"] = n;
          })(i), a["_[build]"] = 10836, yt(a, "notes", "[]"), yt(a, "card", "[]");
          var m = a["card[expiry]"];
          return K(m) && (a["card[expiry_month]"] = m.slice(0, 2), a["card[expiry_year]"] = m.slice(-2), 
          delete a["card[expiry]"]), a._ = Je.common(), yt(a, "_", "[]"), a;
        }
        var Bt = {}, At = {
          api: "https://api.razorpay.com/",
          version: "v1/",
          frameApi: "/",
          cdn: "https://cdn.razorpay.com/"
        };
        try {
          Bn(At, s.Razorpay.config);
        } catch (n) {}
        function Tt(i, a) {
          return void 0 === a && (a = "."), function(n) {
            for (var e = a, t = 0; t < i; t++) e += "0";
            return n.replace(e, "");
          };
        }
        function Ct(n, e) {
          return void 0 === e && (e = ","), n.replace(/\./, e);
        }
        function Et(a) {
          Kn(a, function(n, e) {
            var t, i;
            Ot[e] = (i = {}, t = Bn(Ot["default"])(i), Bn(Ot[e] || {})(t)), Ot[e].code = e, 
            a[e] && (Ot[e].symbol = a[e]);
          });
        }
        var xt, Gt, zt = {
          AED: {
            code: "784",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "\u062f.\u0625",
            name: "Emirati Dirham"
          },
          ALL: {
            code: "008",
            denomination: 100,
            min_value: 221,
            min_auth_value: 100,
            symbol: "Lek",
            name: "Albanian Lek"
          },
          AMD: {
            code: "051",
            denomination: 100,
            min_value: 975,
            min_auth_value: 100,
            symbol: "\u058f",
            name: "Armenian Dram"
          },
          ARS: {
            code: "032",
            denomination: 100,
            min_value: 80,
            min_auth_value: 100,
            symbol: "ARS",
            name: "Argentine Peso"
          },
          AUD: {
            code: "036",
            denomination: 100,
            min_value: 50,
            min_auth_value: 100,
            symbol: "A$",
            name: "Australian Dollar"
          },
          AWG: {
            code: "533",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "Afl.",
            name: "Aruban or Dutch Guilder"
          },
          BBD: {
            code: "052",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "Bds$",
            name: "Barbadian or Bajan Dollar"
          },
          BDT: {
            code: "050",
            denomination: 100,
            min_value: 168,
            min_auth_value: 100,
            symbol: "\u09f3",
            name: "Bangladeshi Taka"
          },
          BMD: {
            code: "060",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "$",
            name: "Bermudian Dollar"
          },
          BND: {
            code: "096",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "BND",
            name: "Bruneian Dollar"
          },
          BOB: {
            code: "068",
            denomination: 100,
            min_value: 14,
            min_auth_value: 100,
            symbol: "Bs",
            name: "Bolivian Bol\xedviano"
          },
          BSD: {
            code: "044",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "BSD",
            name: "Bahamian Dollar"
          },
          BWP: {
            code: "072",
            denomination: 100,
            min_value: 22,
            min_auth_value: 100,
            symbol: "P",
            name: "Botswana Pula"
          },
          BZD: {
            code: "084",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "BZ$",
            name: "Belizean Dollar"
          },
          CAD: {
            code: "124",
            denomination: 100,
            min_value: 50,
            min_auth_value: 100,
            symbol: "C$",
            name: "Canadian Dollar"
          },
          CHF: {
            code: "756",
            denomination: 100,
            min_value: 50,
            min_auth_value: 100,
            symbol: "CHf",
            name: "Swiss Franc"
          },
          CNY: {
            code: "156",
            denomination: 100,
            min_value: 14,
            min_auth_value: 100,
            symbol: "\xa5",
            name: "Chinese Yuan Renminbi"
          },
          COP: {
            code: "170",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "COL$",
            name: "Colombian Peso"
          },
          CRC: {
            code: "188",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "\u20a1",
            name: "Costa Rican Colon"
          },
          CUP: {
            code: "192",
            denomination: 100,
            min_value: 53,
            min_auth_value: 100,
            symbol: "$MN",
            name: "Cuban Peso"
          },
          CZK: {
            code: "203",
            denomination: 100,
            min_value: 46,
            min_auth_value: 100,
            symbol: "K\u010d",
            name: "Czech Koruna"
          },
          DKK: {
            code: "208",
            denomination: 100,
            min_value: 250,
            min_auth_value: 100,
            symbol: "DKK",
            name: "Danish Krone"
          },
          DOP: {
            code: "214",
            denomination: 100,
            min_value: 102,
            min_auth_value: 100,
            symbol: "RD$",
            name: "Dominican Peso"
          },
          DZD: {
            code: "012",
            denomination: 100,
            min_value: 239,
            min_auth_value: 100,
            symbol: "\u062f.\u062c",
            name: "Algerian Dinar"
          },
          EGP: {
            code: "818",
            denomination: 100,
            min_value: 35,
            min_auth_value: 100,
            symbol: "E\xa3",
            name: "Egyptian Pound"
          },
          ETB: {
            code: "230",
            denomination: 100,
            min_value: 57,
            min_auth_value: 100,
            symbol: "\u1265\u122d",
            name: "Ethiopian Birr"
          },
          EUR: {
            code: "978",
            denomination: 100,
            min_value: 50,
            min_auth_value: 100,
            symbol: "\u20ac",
            name: "Euro"
          },
          FJD: {
            code: "242",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "FJ$",
            name: "Fijian Dollar"
          },
          GBP: {
            code: "826",
            denomination: 100,
            min_value: 30,
            min_auth_value: 100,
            symbol: "\xa3",
            name: "British Pound"
          },
          GIP: {
            code: "292",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "GIP",
            name: "Gibraltar Pound"
          },
          GMD: {
            code: "270",
            denomination: 100,
            min_value: 100,
            min_auth_value: 100,
            symbol: "D",
            name: "Gambian Dalasi"
          },
          GTQ: {
            code: "320",
            denomination: 100,
            min_value: 16,
            min_auth_value: 100,
            symbol: "Q",
            name: "Guatemalan Quetzal"
          },
          GYD: {
            code: "328",
            denomination: 100,
            min_value: 418,
            min_auth_value: 100,
            symbol: "G$",
            name: "Guyanese Dollar"
          },
          HKD: {
            code: "344",
            denomination: 100,
            min_value: 400,
            min_auth_value: 100,
            symbol: "HK$",
            name: "Hong Kong Dollar"
          },
          HNL: {
            code: "340",
            denomination: 100,
            min_value: 49,
            min_auth_value: 100,
            symbol: "HNL",
            name: "Honduran Lempira"
          },
          HRK: {
            code: "191",
            denomination: 100,
            min_value: 14,
            min_auth_value: 100,
            symbol: "kn",
            name: "Croatian Kuna"
          },
          HTG: {
            code: "332",
            denomination: 100,
            min_value: 167,
            min_auth_value: 100,
            symbol: "G",
            name: "Haitian Gourde"
          },
          HUF: {
            code: "348",
            denomination: 100,
            min_value: 555,
            min_auth_value: 100,
            symbol: "Ft",
            name: "Hungarian Forint"
          },
          IDR: {
            code: "360",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "Rp",
            name: "Indonesian Rupiah"
          },
          ILS: {
            code: "376",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "\u20aa",
            name: "Israeli Shekel"
          },
          INR: {
            code: "356",
            denomination: 100,
            min_value: 100,
            min_auth_value: 100,
            symbol: "\u20b9",
            name: "Indian Rupee"
          },
          JMD: {
            code: "388",
            denomination: 100,
            min_value: 250,
            min_auth_value: 100,
            symbol: "J$",
            name: "Jamaican Dollar"
          },
          KES: {
            code: "404",
            denomination: 100,
            min_value: 201,
            min_auth_value: 100,
            symbol: "Ksh",
            name: "Kenyan Shilling"
          },
          KGS: {
            code: "417",
            denomination: 100,
            min_value: 140,
            min_auth_value: 100,
            symbol: "\u041b\u0432",
            name: "Kyrgyzstani Som"
          },
          KHR: {
            code: "116",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "\u17db",
            name: "Cambodian Riel"
          },
          KYD: {
            code: "136",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "CI$",
            name: "Caymanian Dollar"
          },
          KZT: {
            code: "398",
            denomination: 100,
            min_value: 759,
            min_auth_value: 100,
            symbol: "\u20b8",
            name: "Kazakhstani Tenge"
          },
          LAK: {
            code: "418",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "\u20ad",
            name: "Lao Kip"
          },
          LBP: {
            code: "422",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "&#1604;.&#1604;.",
            name: "Lebanese Pound"
          },
          LKR: {
            code: "144",
            denomination: 100,
            min_value: 358,
            min_auth_value: 100,
            symbol: "\u0dbb\u0dd4",
            name: "Sri Lankan Rupee"
          },
          LRD: {
            code: "430",
            denomination: 100,
            min_value: 325,
            min_auth_value: 100,
            symbol: "L$",
            name: "Liberian Dollar"
          },
          LSL: {
            code: "426",
            denomination: 100,
            min_value: 29,
            min_auth_value: 100,
            symbol: "LSL",
            name: "Basotho Loti"
          },
          MAD: {
            code: "504",
            denomination: 100,
            min_value: 20,
            min_auth_value: 100,
            symbol: "\u062f.\u0645.",
            name: "Moroccan Dirham"
          },
          MDL: {
            code: "498",
            denomination: 100,
            min_value: 35,
            min_auth_value: 100,
            symbol: "MDL",
            name: "Moldovan Leu"
          },
          MKD: {
            code: "807",
            denomination: 100,
            min_value: 109,
            min_auth_value: 100,
            symbol: "\u0434\u0435\u043d",
            name: "Macedonian Denar"
          },
          MMK: {
            code: "104",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "MMK",
            name: "Burmese Kyat"
          },
          MNT: {
            code: "496",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "\u20ae",
            name: "Mongolian Tughrik"
          },
          MOP: {
            code: "446",
            denomination: 100,
            min_value: 17,
            min_auth_value: 100,
            symbol: "MOP$",
            name: "Macau Pataca"
          },
          MUR: {
            code: "480",
            denomination: 100,
            min_value: 70,
            min_auth_value: 100,
            symbol: "\u20a8",
            name: "Mauritian Rupee"
          },
          MVR: {
            code: "462",
            denomination: 100,
            min_value: 31,
            min_auth_value: 100,
            symbol: "Rf",
            name: "Maldivian Rufiyaa"
          },
          MWK: {
            code: "454",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "MK",
            name: "Malawian Kwacha"
          },
          MXN: {
            code: "484",
            denomination: 100,
            min_value: 39,
            min_auth_value: 100,
            symbol: "Mex$",
            name: "Mexican Peso"
          },
          MYR: {
            code: "458",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "RM",
            name: "Malaysian Ringgit"
          },
          NAD: {
            code: "516",
            denomination: 100,
            min_value: 29,
            min_auth_value: 100,
            symbol: "N$",
            name: "Namibian Dollar"
          },
          NGN: {
            code: "566",
            denomination: 100,
            min_value: 723,
            min_auth_value: 100,
            symbol: "\u20a6",
            name: "Nigerian Naira"
          },
          NIO: {
            code: "558",
            denomination: 100,
            min_value: 66,
            min_auth_value: 100,
            symbol: "NIO",
            name: "Nicaraguan Cordoba"
          },
          NOK: {
            code: "578",
            denomination: 100,
            min_value: 300,
            min_auth_value: 100,
            symbol: "NOK",
            name: "Norwegian Krone"
          },
          NPR: {
            code: "524",
            denomination: 100,
            min_value: 221,
            min_auth_value: 100,
            symbol: "\u0930\u0942",
            name: "Nepalese Rupee"
          },
          NZD: {
            code: "554",
            denomination: 100,
            min_value: 50,
            min_auth_value: 100,
            symbol: "NZ$",
            name: "New Zealand Dollar"
          },
          PEN: {
            code: "604",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "S/",
            name: "Peruvian Sol"
          },
          PGK: {
            code: "598",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "PGK",
            name: "Papua New Guinean Kina"
          },
          PHP: {
            code: "608",
            denomination: 100,
            min_value: 106,
            min_auth_value: 100,
            symbol: "\u20b1",
            name: "Philippine Peso"
          },
          PKR: {
            code: "586",
            denomination: 100,
            min_value: 227,
            min_auth_value: 100,
            symbol: "\u20a8",
            name: "Pakistani Rupee"
          },
          QAR: {
            code: "634",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "QR",
            name: "Qatari Riyal"
          },
          RUB: {
            code: "643",
            denomination: 100,
            min_value: 130,
            min_auth_value: 100,
            symbol: "\u20bd",
            name: "Russian Ruble"
          },
          SAR: {
            code: "682",
            denomination: 100,
            min_value: 10,
            min_auth_value: 100,
            symbol: "SR",
            name: "Saudi Arabian Riyal"
          },
          SCR: {
            code: "690",
            denomination: 100,
            min_value: 28,
            min_auth_value: 100,
            symbol: "SRe",
            name: "Seychellois Rupee"
          },
          SEK: {
            code: "752",
            denomination: 100,
            min_value: 300,
            min_auth_value: 100,
            symbol: "SEK",
            name: "Swedish Krona"
          },
          SGD: {
            code: "702",
            denomination: 100,
            min_value: 50,
            min_auth_value: 100,
            symbol: "S$",
            name: "Singapore Dollar"
          },
          SLL: {
            code: "694",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "Le",
            name: "Sierra Leonean Leone"
          },
          SOS: {
            code: "706",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "Sh.so.",
            name: "Somali Shilling"
          },
          SSP: {
            code: "728",
            denomination: 100,
            min_value: 100,
            min_auth_value: 100,
            symbol: "SS\xa3",
            name: "South Sudanese Pound"
          },
          SVC: {
            code: "222",
            denomination: 100,
            min_value: 18,
            min_auth_value: 100,
            symbol: "\u20a1",
            name: "Salvadoran Colon"
          },
          SZL: {
            code: "748",
            denomination: 100,
            min_value: 29,
            min_auth_value: 100,
            symbol: "E",
            name: "Swazi Lilangeni"
          },
          THB: {
            code: "764",
            denomination: 100,
            min_value: 64,
            min_auth_value: 100,
            symbol: "\u0e3f",
            name: "Thai Baht"
          },
          TTD: {
            code: "780",
            denomination: 100,
            min_value: 14,
            min_auth_value: 100,
            symbol: "TT$",
            name: "Trinidadian Dollar"
          },
          TZS: {
            code: "834",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "Sh",
            name: "Tanzanian Shilling"
          },
          USD: {
            code: "840",
            denomination: 100,
            min_value: 50,
            min_auth_value: 100,
            symbol: "$",
            name: "US Dollar"
          },
          UYU: {
            code: "858",
            denomination: 100,
            min_value: 67,
            min_auth_value: 100,
            symbol: "$U",
            name: "Uruguayan Peso"
          },
          UZS: {
            code: "860",
            denomination: 100,
            min_value: 1e3,
            min_auth_value: 100,
            symbol: "so'm",
            name: "Uzbekistani Som"
          },
          YER: {
            code: "886",
            denomination: 100,
            min_value: 501,
            min_auth_value: 100,
            symbol: "\ufdfc",
            name: "Yemeni Rial"
          },
          ZAR: {
            code: "710",
            denomination: 100,
            min_value: 29,
            min_auth_value: 100,
            symbol: "R",
            name: "South African Rand"
          }
        }, Ft = {
          three: function three(n, e) {
            var t = r(n).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + e + "})$)", "g"), "$1,");
            return Tt(e)(t);
          },
          threecommadecimal: function threecommadecimal(n, e) {
            var t = Ct(r(n)).replace(new RegExp("(.{1,3})(?=(...)+(\\,.{" + e + "})$)", "g"), "$1.");
            return Tt(e, ",")(t);
          },
          threespaceseparator: function threespaceseparator(n, e) {
            var t = r(n).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + e + "})$)", "g"), "$1 ");
            return Tt(e)(t);
          },
          threespacecommadecimal: function threespacecommadecimal(n, e) {
            var t = Ct(r(n)).replace(new RegExp("(.{1,3})(?=(...)+(\\,.{" + e + "})$)", "g"), "$1 ");
            return Tt(e, ",")(t);
          },
          szl: function szl(n, e) {
            var t = r(n).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + e + "})$)", "g"), "$1, ");
            return Tt(e)(t);
          },
          chf: function chf(n, e) {
            var t = r(n).replace(new RegExp("(.{1,3})(?=(...)+(\\..{" + e + "})$)", "g"), "$1'");
            return Tt(e)(t);
          },
          inr: function inr(n, e) {
            var t = r(n).replace(new RegExp("(.{1,2})(?=.(..)+(\\..{" + e + "})$)", "g"), "$1,");
            return Tt(e)(t);
          },
          none: function none(n) {
            return r(n);
          }
        }, Ot = {
          default: {
            decimals: 2,
            format: Ft.three,
            minimum: 100
          },
          AED: {
            minor: "fil",
            minimum: 10
          },
          AFN: {
            minor: "pul"
          },
          ALL: {
            minor: "qindarka",
            minimum: 221
          },
          AMD: {
            minor: "luma",
            minimum: 975
          },
          ANG: {
            minor: "cent"
          },
          AOA: {
            minor: "lwei"
          },
          ARS: {
            format: Ft.threecommadecimal,
            minor: "centavo",
            minimum: 80
          },
          AUD: {
            format: Ft.threespaceseparator,
            minimum: 50,
            minor: "cent"
          },
          AWG: {
            minor: "cent",
            minimum: 10
          },
          AZN: {
            minor: "q\xe4pik"
          },
          BAM: {
            minor: "fenning"
          },
          BBD: {
            minor: "cent",
            minimum: 10
          },
          BDT: {
            minor: "paisa",
            minimum: 168
          },
          BGN: {
            minor: "stotinki"
          },
          BHD: {
            decimals: 3,
            minor: "fils"
          },
          BIF: {
            decimals: 0,
            major: "franc",
            minor: "centime"
          },
          BMD: {
            minor: "cent",
            minimum: 10
          },
          BND: {
            minor: "sen",
            minimum: 10
          },
          BOB: {
            minor: "centavo",
            minimum: 14
          },
          BRL: {
            format: Ft.threecommadecimal,
            minimum: 50,
            minor: "centavo"
          },
          BSD: {
            minor: "cent",
            minimum: 10
          },
          BTN: {
            minor: "chetrum"
          },
          BWP: {
            minor: "thebe",
            minimum: 22
          },
          BYR: {
            decimals: 0,
            major: "ruble"
          },
          BZD: {
            minor: "cent",
            minimum: 10
          },
          CAD: {
            minimum: 50,
            minor: "cent"
          },
          CDF: {
            minor: "centime"
          },
          CHF: {
            format: Ft.chf,
            minimum: 50,
            minor: "rappen"
          },
          CLP: {
            decimals: 0,
            format: Ft.none,
            major: "peso",
            minor: "centavo"
          },
          CNY: {
            minor: "jiao",
            minimum: 14
          },
          COP: {
            format: Ft.threecommadecimal,
            minor: "centavo",
            minimum: 1e3
          },
          CRC: {
            format: Ft.threecommadecimal,
            minor: "centimo",
            minimum: 1e3
          },
          CUC: {
            minor: "centavo"
          },
          CUP: {
            minor: "centavo",
            minimum: 53
          },
          CVE: {
            minor: "centavo"
          },
          CZK: {
            format: Ft.threecommadecimal,
            minor: "haler",
            minimum: 46
          },
          DJF: {
            decimals: 0,
            major: "franc",
            minor: "centime"
          },
          DKK: {
            minimum: 250,
            minor: "\xf8re"
          },
          DOP: {
            minor: "centavo",
            minimum: 102
          },
          DZD: {
            minor: "centime",
            minimum: 239
          },
          EGP: {
            minor: "piaster",
            minimum: 35
          },
          ERN: {
            minor: "cent"
          },
          ETB: {
            minor: "cent",
            minimum: 57
          },
          EUR: {
            minimum: 50,
            minor: "cent"
          },
          FJD: {
            minor: "cent",
            minimum: 10
          },
          FKP: {
            minor: "pence"
          },
          GBP: {
            minimum: 30,
            minor: "pence"
          },
          GEL: {
            minor: "tetri"
          },
          GHS: {
            minor: "pesewas",
            minimum: 3
          },
          GIP: {
            minor: "pence",
            minimum: 10
          },
          GMD: {
            minor: "butut"
          },
          GTQ: {
            minor: "centavo",
            minimum: 16
          },
          GYD: {
            minor: "cent",
            minimum: 418
          },
          HKD: {
            minimum: 400,
            minor: "cent"
          },
          HNL: {
            minor: "centavo",
            minimum: 49
          },
          HRK: {
            format: Ft.threecommadecimal,
            minor: "lipa",
            minimum: 14
          },
          HTG: {
            minor: "centime",
            minimum: 167
          },
          HUF: {
            decimals: 0,
            format: Ft.none,
            major: "forint",
            minimum: 555
          },
          IDR: {
            format: Ft.threecommadecimal,
            minor: "sen",
            minimum: 1e3
          },
          ILS: {
            minor: "agorot",
            minimum: 10
          },
          INR: {
            format: Ft.inr,
            minor: "paise"
          },
          IQD: {
            decimals: 3,
            minor: "fil"
          },
          IRR: {
            minor: "rials"
          },
          ISK: {
            decimals: 0,
            format: Ft.none,
            major: "kr\xf3na",
            minor: "aurar"
          },
          JMD: {
            minor: "cent",
            minimum: 250
          },
          JOD: {
            decimals: 3,
            minor: "fil"
          },
          JPY: {
            decimals: 0,
            minimum: 50,
            minor: "sen"
          },
          KES: {
            minor: "cent",
            minimum: 201
          },
          KGS: {
            minor: "tyyn",
            minimum: 140
          },
          KHR: {
            minor: "sen",
            minimum: 1e3
          },
          KMF: {
            decimals: 0,
            major: "franc",
            minor: "centime"
          },
          KPW: {
            minor: "chon"
          },
          KRW: {
            decimals: 0,
            major: "won",
            minor: "chon"
          },
          KWD: {
            decimals: 3,
            minor: "fil"
          },
          KYD: {
            minor: "cent",
            minimum: 10
          },
          KZT: {
            minor: "tiyn",
            minimum: 759
          },
          LAK: {
            minor: "at",
            minimum: 1e3
          },
          LBP: {
            format: Ft.threespaceseparator,
            minor: "piastre",
            minimum: 1e3
          },
          LKR: {
            minor: "cent",
            minimum: 358
          },
          LRD: {
            minor: "cent",
            minimum: 325
          },
          LSL: {
            minor: "lisente",
            minimum: 29
          },
          LTL: {
            format: Ft.threespacecommadecimal,
            minor: "centu"
          },
          LVL: {
            minor: "santim"
          },
          LYD: {
            decimals: 3,
            minor: "dirham"
          },
          MAD: {
            minor: "centime",
            minimum: 20
          },
          MDL: {
            minor: "ban",
            minimum: 35
          },
          MGA: {
            decimals: 0,
            major: "ariary"
          },
          MKD: {
            minor: "deni"
          },
          MMK: {
            minor: "pya",
            minimum: 1e3
          },
          MNT: {
            minor: "mongo",
            minimum: 1e3
          },
          MOP: {
            minor: "avo",
            minimum: 17
          },
          MRO: {
            minor: "khoum"
          },
          MUR: {
            minor: "cent",
            minimum: 70
          },
          MVR: {
            minor: "lari",
            minimum: 31
          },
          MWK: {
            minor: "tambala",
            minimum: 1e3
          },
          MXN: {
            minor: "centavo",
            minimum: 39
          },
          MYR: {
            minor: "sen",
            minimum: 10
          },
          MZN: {
            decimals: 0,
            major: "metical"
          },
          NAD: {
            minor: "cent",
            minimum: 29
          },
          NGN: {
            minor: "kobo",
            minimum: 723
          },
          NIO: {
            minor: "centavo",
            minimum: 66
          },
          NOK: {
            format: Ft.threecommadecimal,
            minimum: 300,
            minor: "\xf8re"
          },
          NPR: {
            minor: "paise",
            minimum: 221
          },
          NZD: {
            minimum: 50,
            minor: "cent"
          },
          OMR: {
            minor: "baiza",
            decimals: 3
          },
          PAB: {
            minor: "centesimo"
          },
          PEN: {
            minor: "centimo",
            minimum: 10
          },
          PGK: {
            minor: "toea",
            minimum: 10
          },
          PHP: {
            minor: "centavo",
            minimum: 106
          },
          PKR: {
            minor: "paisa",
            minimum: 227
          },
          PLN: {
            format: Ft.threespacecommadecimal,
            minor: "grosz"
          },
          PYG: {
            decimals: 0,
            major: "guarani",
            minor: "centimo"
          },
          QAR: {
            minor: "dirham",
            minimum: 10
          },
          RON: {
            format: Ft.threecommadecimal,
            minor: "bani"
          },
          RUB: {
            format: Ft.threecommadecimal,
            minor: "kopeck",
            minimum: 130
          },
          RWF: {
            decimals: 0,
            major: "franc",
            minor: "centime"
          },
          SAR: {
            minor: "halalat",
            minimum: 10
          },
          SBD: {
            minor: "cent"
          },
          SCR: {
            minor: "cent",
            minimum: 28
          },
          SEK: {
            format: Ft.threespacecommadecimal,
            minimum: 300,
            minor: "\xf6re"
          },
          SGD: {
            minimum: 50,
            minor: "cent"
          },
          SHP: {
            minor: "new pence"
          },
          SLL: {
            minor: "cent",
            minimum: 1e3
          },
          SOS: {
            minor: "centesimi",
            minimum: 1e3
          },
          SRD: {
            minor: "cent"
          },
          STD: {
            minor: "centimo"
          },
          SSP: {
            minor: "piaster"
          },
          SVC: {
            minor: "centavo",
            minimum: 18
          },
          SYP: {
            minor: "piaster"
          },
          SZL: {
            format: Ft.szl,
            minor: "cent",
            minimum: 29
          },
          THB: {
            minor: "satang",
            minimum: 64
          },
          TJS: {
            minor: "diram"
          },
          TMT: {
            minor: "tenga"
          },
          TND: {
            decimals: 3,
            minor: "millime"
          },
          TOP: {
            minor: "seniti"
          },
          TRY: {
            minor: "kurus"
          },
          TTD: {
            minor: "cent",
            minimum: 14
          },
          TWD: {
            minor: "cent"
          },
          TZS: {
            minor: "cent",
            minimum: 1e3
          },
          UAH: {
            format: Ft.threespacecommadecimal,
            minor: "kopiyka"
          },
          UGX: {
            minor: "cent"
          },
          USD: {
            minimum: 50,
            minor: "cent"
          },
          UYU: {
            format: Ft.threecommadecimal,
            minor: "cent\xe9",
            minimum: 67
          },
          UZS: {
            minor: "tiyin",
            minimum: 1e3
          },
          VND: {
            format: Ft.none,
            minor: "hao,xu"
          },
          VUV: {
            decimals: 0,
            major: "vatu",
            minor: "centime"
          },
          WST: {
            minor: "sene"
          },
          XAF: {
            decimals: 0,
            major: "franc",
            minor: "centime"
          },
          XCD: {
            minor: "cent"
          },
          XPF: {
            decimals: 0,
            major: "franc",
            minor: "centime"
          },
          YER: {
            minor: "fil",
            minimum: 501
          },
          ZAR: {
            format: Ft.threespaceseparator,
            minor: "cent",
            minimum: 29
          },
          ZMK: {
            minor: "ngwee"
          }
        }, It = function It(n) {
          return Ot[n] ? Ot[n] : Ot["default"];
        }, $t = [ "AED", "ALL", "AMD", "ARS", "AUD", "AWG", "BBD", "BDT", "BMD", "BND", "BOB", "BSD", "BWP", "BZD", "CAD", "CHF", "CNY", "COP", "CRC", "CUP", "CZK", "DKK", "DOP", "DZD", "EGP", "ETB", "EUR", "FJD", "GBP", "GHS", "GIP", "GMD", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "JMD", "KES", "KGS", "KHR", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "MAD", "MDL", "MKD", "MMK", "MNT", "MOP", "MUR", "MVR", "MWK", "MXN", "MYR", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "PEN", "PGK", "PHP", "PKR", "QAR", "RUB", "SAR", "SCR", "SEK", "SGD", "SLL", "SOS", "SSP", "SVC", "SZL", "THB", "TTD", "TZS", "USD", "UYU", "UZS", "YER", "ZAR" ], Ht = {
          AED: "\u062f.\u0625",
          AFN: "&#x60b;",
          ALL: "Lek",
          AMD: "\u058f",
          ANG: "NA\u0192",
          AOA: "Kz",
          ARS: "ARS",
          AUD: "A$",
          AWG: "Afl.",
          AZN: "\u043c\u0430\u043d",
          BAM: "KM",
          BBD: "Bds$",
          BDT: "\u09f3",
          BGN: "\u043b\u0432",
          BHD: "\u062f.\u0628",
          BIF: "FBu",
          BMD: "$",
          BND: "BND",
          BOB: "Bs.",
          BRL: "R$",
          BSD: "BSD",
          BTN: "Nu.",
          BWP: "P",
          BYR: "Br",
          BZD: "BZ$",
          CAD: "C$",
          CDF: "FC",
          CHF: "CHf",
          CLP: "CLP$",
          CNY: "\xa5",
          COP: "COL$",
          CRC: "\u20a1",
          CUC: "&#x20b1;",
          CUP: "$MN",
          CVE: "Esc",
          CZK: "K\u010d",
          DJF: "Fdj",
          DKK: "DKK",
          DOP: "RD$",
          DZD: "\u062f.\u062c",
          EGP: "E\xa3",
          ERN: "Nfa",
          ETB: "\u1265\u122d",
          EUR: "\u20ac",
          FJD: "FJ$",
          FKP: "FK&#163;",
          GBP: "\xa3",
          GEL: "\u10da",
          GHS: "&#x20b5;",
          GIP: "GIP",
          GMD: "D",
          GNF: "FG",
          GTQ: "Q",
          GYD: "G$",
          HKD: "HK$",
          HNL: "HNL",
          HRK: "kn",
          HTG: "G",
          HUF: "Ft",
          IDR: "Rp",
          ILS: "\u20aa",
          INR: "\u20b9",
          IQD: "\u0639.\u062f",
          IRR: "&#xfdfc;",
          ISK: "ISK",
          JMD: "J$",
          JOD: "\u062f.\u0627",
          JPY: "&#165;",
          KES: "Ksh",
          KGS: "\u041b\u0432",
          KHR: "\u17db",
          KMF: "CF",
          KPW: "KPW",
          KRW: "KRW",
          KWD: "\u062f.\u0643",
          KYD: "CI$",
          KZT: "\u20b8",
          LAK: "\u20ad",
          LBP: "&#1604;.&#1604;.",
          LD: "LD",
          LKR: "\u0dbb\u0dd4",
          LRD: "L$",
          LSL: "LSL",
          LTL: "Lt",
          LVL: "Ls",
          LYD: "LYD",
          MAD: "\u062f.\u0645.",
          MDL: "MDL",
          MGA: "Ar",
          MKD: "\u0434\u0435\u043d",
          MMK: "MMK",
          MNT: "\u20ae",
          MOP: "MOP$",
          MRO: "UM",
          MUR: "\u20a8",
          MVR: "Rf",
          MWK: "MK",
          MXN: "Mex$",
          MYR: "RM",
          MZN: "MT",
          NAD: "N$",
          NGN: "\u20a6",
          NIO: "NIO",
          NOK: "NOK",
          NPR: "\u0930\u0942",
          NZD: "NZ$",
          OMR: "\u0631.\u0639.",
          PAB: "B/.",
          PEN: "S/",
          PGK: "PGK",
          PHP: "\u20b1",
          PKR: "\u20a8",
          PLN: "Z\u0142",
          PYG: "&#x20b2;",
          QAR: "QR",
          RON: "RON",
          RSD: "\u0414\u0438\u043d.",
          RUB: "\u20bd",
          RWF: "RF",
          SAR: "SR",
          SBD: "SI$",
          SCR: "SRe",
          SDG: "&#163;Sd",
          SEK: "SEK",
          SFR: "Fr",
          SGD: "S$",
          SHP: "&#163;",
          SLL: "Le",
          SOS: "Sh.so.",
          SRD: "Sr$",
          SSP: "SS\xa3",
          STD: "Db",
          SVC: "\u20a1",
          SYP: "S&#163;",
          SZL: "E",
          THB: "\u0e3f",
          TJS: "SM",
          TMT: "M",
          TND: "\u062f.\u062a",
          TOP: "T$",
          TRY: "TL",
          TTD: "TT$",
          TWD: "NT$",
          TZS: "Sh",
          UAH: "&#x20b4;",
          UGX: "USh",
          USD: "$",
          UYU: "$U",
          UZS: "so'm",
          VEF: "Bs",
          VND: "&#x20ab;",
          VUV: "VT",
          WST: "T",
          XAF: "FCFA",
          XCD: "EC$",
          XOF: "CFA",
          XPF: "CFPF",
          YER: "\ufdfc",
          ZAR: "R",
          ZMK: "ZK",
          ZWL: "Z$"
        };
        Gt = {}, Kn(xt = zt, function(n, e) {
          zt[e] = n, Ot[e] = Ot[e] || {}, xt[e].min_value && (Ot[e].minimum = xt[e].min_value), 
          xt[e].denomination && (Ot[e].decimals = d.LOG10E * d.log(xt[e].denomination)), Gt[e] = xt[e].symbol;
        }), Bn(Ht, Gt), Et(Gt), Et(Ht);
        pn($t, function(n, e) {
          return n[e] = Ht[e], n;
        }, {});
        function Ut(n, e, t) {
          return void 0 === t && (t = !0), [ Ht[e], (i = n, a = It(e), o = i / d.pow(10, a.decimals), 
          a.format(o.toFixed(a.decimals), a.decimals)) ].join(t ? " " : "");
          var i, a, o;
        }
        function Zt(n) {
          return void 0 === n && (n = ""), At.api + At.version + n;
        }
        var Yt = [ "key", "order_id", "invoice_id", "subscription_id", "auth_link_id", "payment_link_id", "contact_id", "checkout_config_id" ];
        function jt(e) {
          var t, i = this;
          if (!G(this, jt)) return new jt(e);
          it.call(this), this.id = Je.makeUid(), tt.setR(this);
          try {
            t = function(n) {
              n && "object" == typeof n || $("Invalid options");
              var e = new Dt(n);
              return function(i, a) {
                void 0 === a && (a = []);
                var o = !0;
                i = i.get(), Kn(Jt, function(n, e) {
                  var t;
                  vn(a, e) || e in i && (t = n(i[e], i)) && (o = !1, $("Invalid " + e + " (" + t + ")"));
                });
              }(e, [ "amount" ]), function(n) {
                var t = n.get("notes");
                Kn(t, function(n, e) {
                  K(n) ? 254 < n.length && (t[e] = n.slice(0, 254)) : P(n) || M(n) || delete t[e];
                });
              }(e), e;
            }(e), this.get = t.get, this.set = t.set;
          } catch (n) {
            var a = n.message;
            this.get && this.isLiveMode() || A(e) && !e.parent && s.alert(a), $(a);
          }
          fn([ "integration", "integration_version", "integration_parent_version" ], function(n) {
            var e = i.get("_." + n);
            e && (Je.props[n] = e);
          }), Yt.every(function(n) {
            return !t.get(n);
          }) && $("No key passed"), this.postInit();
        }
        var Wt = jt.prototype = new it();
        function qt(n, e) {
          return Se.jsonp({
            url: Zt("preferences"),
            data: n,
            callback: e
          });
        }
        Wt.postInit = yn, Wt.onNew = function(n, e) {
          var t = this;
          "ready" === n && (this.prefs ? e(n, this.prefs) : qt(Vt(this), function(n) {
            n.methods && (t.prefs = n, t.methods = n.methods), e(t.prefs, n);
          }));
        }, Wt.emi_calculator = function(n, e) {
          return jt.emi.calculator(this.get("amount") / 100, n, e);
        }, jt.emi = {
          calculator: function calculator(n, e, t) {
            if (!t) return d.ceil(n / e);
            t /= 1200;
            var i = d.pow(1 + t, e);
            return f(n * t * i / (i - 1), 10);
          }
        };
        jt.payment = {
          getMethods: function getMethods(e) {
            return qt({
              key_id: jt.defaults.key
            }, function(n) {
              e(n.methods || n);
            });
          },
          getPrefs: function getPrefs(e, t) {
            var i, a = (i = z(), function(n) {
              return z() - i;
            });
            return tt.track("prefs:start", {
              type: "metric"
            }), A(e) && (e["_[request_index]"] = tt.updateRequestIndex("preferences")), Se({
              url: Z(Zt("preferences"), e),
              callback: function callback(n) {
                if (tt.track("prefs:end", {
                  type: "metric",
                  data: {
                    time: a()
                  }
                }), n.xhr && 0 === n.xhr.status) return qt(e, t);
                t(n);
              }
            });
          }
        };
        function Vt(n) {
          if (n) {
            var t = n.get, i = {}, e = t("key");
            e && (i.key_id = e);
            var a = [ t("currency") ], o = t("display_currency"), r = t("display_amount");
            return o && ("" + r).length && a.push(o), i.currency = a, fn([ "order_id", "customer_id", "invoice_id", "payment_link_id", "subscription_id", "auth_link_id", "recurring", "subscription_card_change", "account_id", "contact_id", "checkout_config_id", "amount" ], function(n) {
              var e = t(n);
              e && (i[n] = e);
            }), i["_[build]"] = 10836, i["_[checkout_id]"] = n.id, i["_[library]"] = Je.props.library, 
            i["_[platform]"] = Je.props.platform, i;
          }
        }
        Wt.isLiveMode = function() {
          var n = this.preferences;
          return !n && /^rzp_l/.test(this.get("key")) || n && "live" === n.mode;
        }, Wt.calculateFees = function(n) {
          var i = this;
          return new Te(function(e, t) {
            n = Lt(n, i), Se.post({
              url: Zt("payments/calculate/fees"),
              data: n,
              callback: function callback(n) {
                return (n.error ? t : e)(n);
              }
            });
          });
        };
        var Jt = {
          notes: function notes(n) {
            if (A(n) && 15 < E(j(n))) return "At most 15 notes are allowed";
          },
          amount: function amount(n, e) {
            var t, i, a = e.display_currency || e.currency || "INR", o = It(a), r = o.minimum, m = "";
            if (o.decimals && o.minor ? m = " " + o.minor : o.major && (m = " " + o.major), 
            void 0 === (i = r) && (i = 100), (/[^0-9]/.test(t = n) || !(i <= (t = f(t, 10)))) && !e.recurring) return "should be passed in integer" + m + ". Minimum value is " + r + m + ", i.e. " + Ut(r, a);
          },
          currency: function currency(n) {
            if (!vn($t, n)) return "The provided currency is not currently supported";
          },
          display_currency: function display_currency(n) {
            if (!(n in Ht) && n !== jt.defaults.display_currency) return "This display currency is not supported";
          },
          display_amount: function display_amount(n) {
            if (!(n = r(n).replace(/([^0-9.])/g, "")) && n !== jt.defaults.display_amount) return "";
          },
          payout: function payout(n, e) {
            if (n) {
              if (!e.key) return "key is required for a Payout";
              if (!e.contact_id) return "contact_id is required for a Payout";
            }
          }
        };
        jt.configure = function(n) {
          Kn(bt(n, _t), function(n, e) {
            typeof _t[e] == typeof n && (_t[e] = n);
          });
        }, jt.defaults = _t, s.Razorpay = jt, _t.timeout = 0, _t.name = "", _t.partnership_logo = "", 
        _t.nativeotp = !0, _t.remember_customer = !1, _t.personalization = !1, _t.paused = !1, 
        _t.fee_label = "", _t.min_amount_label = "", _t.partial_payment = {
          min_amount_label: "",
          full_amount_label: "",
          partial_amount_label: "",
          partial_amount_description: "",
          select_partial: !1
        }, _t.method = {
          netbanking: null,
          card: !0,
          credit_card: !0,
          debit_card: !0,
          cardless_emi: null,
          wallet: null,
          emi: !0,
          upi: null,
          upi_intent: !0,
          qr: !0,
          bank_transfer: !0,
          upi_otm: !0
        }, _t.prefill = {
          amount: "",
          wallet: "",
          provider: "",
          method: "",
          name: "",
          contact: "",
          email: "",
          vpa: "",
          "card[number]": "",
          "card[expiry]": "",
          "card[cvv]": "",
          bank: "",
          "bank_account[name]": "",
          "bank_account[account_number]": "",
          "bank_account[account_type]": "",
          "bank_account[ifsc]": "",
          auth_type: ""
        }, _t.features = {
          cardsaving: !0
        }, _t.readonly = {
          contact: !1,
          email: !1,
          name: !1
        }, _t.hidden = {
          contact: !1,
          email: !1
        }, _t.modal = {
          confirm_close: !1,
          ondismiss: yn,
          onhidden: yn,
          escape: !0,
          animation: !s.matchMedia("(prefers-reduced-motion: reduce)").matches,
          backdropclose: !1,
          handleback: !0
        }, _t.external = {
          wallets: [],
          handler: yn
        }, _t.theme = {
          upi_only: !1,
          color: "",
          backdrop_color: "rgba(0,0,0,0.6)",
          image_padding: !0,
          image_frame: !0,
          close_button: !0,
          close_method_back: !1,
          hide_topbar: !1,
          branding: "",
          debit_card: !1
        }, _t._ = {
          integration: null,
          integration_version: null,
          integration_parent_version: null
        }, _t.config = {
          display: {}
        };
        var Qt, Xt, ni, ei, ti = s.screen, ii = s.scrollTo, ai = ut, oi = {
          overflow: "",
          metas: null,
          orientationchange: function orientationchange() {
            oi.resize.call(this), oi.scroll.call(this);
          },
          resize: function resize() {
            var n = s.innerHeight || ti.height;
            ui.container.style.position = n < 450 ? "absolute" : "fixed", this.el.style.height = d.max(n, 460) + "px";
          },
          scroll: function scroll() {
            var n;
            "number" == typeof s.pageYOffset && (s.innerHeight < 460 ? (n = 460 - s.innerHeight, 
            s.pageYOffset > 120 + n && fe(n)) : this.isFocused || fe(0));
          }
        };
        function ri() {
          return oi.metas || (oi.metas = le('head meta[name=viewport],head meta[name="theme-color"]')), 
          oi.metas;
        }
        function mi(n) {
          try {
            ui.backdrop.style.background = n;
          } catch (n) {}
        }
        function ui(n) {
          if (Qt = c.body, Xt = c.head, ni = Qt.style, n) return this.getEl(n), this.openRzp(n);
          this.getEl(), this.time = z();
        }
        ui.prototype = {
          getEl: function getEl(n) {
            var e, t, i, a, o, r;
            return this.el || (t = {
              style: "opacity: 1; height: 100%; position: relative; background: none; display: block; border: 0 none transparent; margin: 0px; padding: 0px; z-index: 2;",
              allowtransparency: !0,
              frameborder: 0,
              width: "100%",
              height: "100%",
              allowpaymentrequest: !0,
              src: (i = n, o = At.frame, r = F() < .01, o || (o = Zt("checkout"), (a = Vt(i)) ? o = Z(o, a) : (o += "/public", 
              r && (o += "/canary"))), r && (o = Z(o, {
                canary: 1
              })), o),
              class: "razorpay-checkout-frame"
            }, this.el = (e = Cn("iframe"), jn(t)(e))), this.el;
          },
          openRzp: function openRzp(n) {
            var e, t, i, a, o, r = (e = this.el, Wn({
              width: "100%",
              height: "100%"
            })(e)), m = n.get("parent"), u = (m = m && V(m)) || ui.container;
            !function(n, e) {
              if (!ei) try {
                var t;
                (ei = c.createElement("div")).className = "razorpay-loader";
                var i = "margin:-25px 0 0 -25px;height:50px;width:50px;animation:rzp-rot 1s infinite linear;-webkit-animation:rzp-rot 1s infinite linear;border: 1px solid rgba(255, 255, 255, 0.2);border-top-color: rgba(255, 255, 255, 0.7);border-radius: 50%;";
                i += e ? "margin: 100px auto -150px;border: 1px solid rgba(0, 0, 0, 0.2);border-top-color: rgba(0, 0, 0, 0.7);" : "position:absolute;left:50%;top:50%;", 
                ei.setAttribute("style", i), t = ei, In(n)(t);
              } catch (n) {}
            }(u, m), n !== this.rzp && (En(r) !== u && (t = u, $n(r)(t)), this.rzp = n), m ? (i = r, 
            Yn("minHeight", "530px")(i), this.embedded = !0) : (a = u, o = Yn("display", "block")(a), 
            Jn(o), mi(n.get("theme.backdrop_color")), /^rzp_t/.test(n.get("key")) && ui.ribbon && (ui.ribbon.style.opacity = 1), 
            this.setMetaAndOverflow()), this.bind(), this.onload();
          },
          makeMessage: function makeMessage() {
            var n = this.rzp, t = n.get(), e = {
              integration: Je.props.integration,
              referer: b.href,
              options: t,
              id: n.id
            };
            return n.metadata && (e.metadata = n.metadata), Kn(n.modal.options, function(n, e) {
              t["modal." + e] = n;
            }), this.embedded && (delete t.parent, e.embedded = !0), function(n) {
              var e, t, i = n.image;
              if (i && K(i)) {
                if (H(i)) return;
                i.indexOf("http") && (e = b.protocol + "//" + b.hostname + (b.port ? ":" + b.port : ""), 
                t = "", "/" !== i[0] && "/" !== (t += b.pathname.replace(/[^/]*$/g, ""))[0] && (t = "/" + t), 
                n.image = e + t + i);
              }
            }(t), e;
          },
          close: function close() {
            mi(""), ui.ribbon && (ui.ribbon.style.opacity = 0), function(n) {
              n && fn(n, Hn);
              var e = ri();
              e && fn(e, In(Xt));
            }(this.$metas), ni.overflow = oi.overflow, this.unbind(), ai && ii(0, oi.oldY), 
            Je.flush();
          },
          bind: function bind() {
            var n, i = this;
            this.listeners || (this.listeners = [], n = {}, ai && (n.orientationchange = oi.orientationchange, 
            this.rzp.get("parent") || (n.resize = oi.resize)), Kn(n, function(n, e) {
              var t;
              i.listeners.push((t = window, q(e, bn(n, i))(t)));
            }));
          },
          unbind: function unbind() {
            var n = this.listeners;
            fn(n, function(n) {
              return n();
            }), this.listeners = null;
          },
          setMetaAndOverflow: function setMetaAndOverflow() {
            var n, e;
            Xt && (fn(ri(), function(n) {
              return Hn(n);
            }), this.$metas = [ (n = Cn("meta"), jn({
              name: "viewport",
              content: "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            })(n)), (e = Cn("meta"), jn({
              name: "theme-color",
              content: this.rzp.get("theme.color")
            })(e)) ], fn(this.$metas, In(Xt)), oi.overflow = ni.overflow, ni.overflow = "hidden", 
            ai && (oi.oldY = s.pageYOffset, s.scrollTo(0, 0), oi.orientationchange.call(this)));
          },
          postMessage: function postMessage(n) {
            n.id = this.rzp.id, n = Nn(n), this.el.contentWindow.postMessage(n, "*");
          },
          onmessage: function onmessage(n) {
            var e, t, i = Ln(n.data);
            i && (e = i.event, t = this.rzp, n.origin && "frame" === i.source && n.source === this.el.contentWindow && (i = i.data, 
            this["on" + e](i), "dismiss" !== e && "fault" !== e || tt.track(e, {
              data: i,
              r: t,
              immediately: !0
            })));
          },
          onload: function onload() {
            this.rzp && this.postMessage(this.makeMessage());
          },
          onfocus: function onfocus() {
            this.isFocused = !0;
          },
          onblur: function onblur() {
            this.isFocused = !1, oi.orientationchange.call(this);
          },
          onrender: function onrender() {
            ei && (Hn(ei), ei = null), this.rzp.emit("render");
          },
          onevent: function onevent(n) {
            this.rzp.emit(n.event, n.data);
          },
          onredirect: function onredirect(n) {
            Je.flush(), n.target || (n.target = this.rzp.get("target") || "_top"), function(n) {
              if (!n.target && s !== s.parent) return s.Razorpay.sendMessage({
                event: "redirect",
                data: n
              });
              se(n.url, n.content, n.method, n.target);
            }(n);
          },
          onsubmit: function onsubmit(e) {
            Je.flush();
            var t = this.rzp;
            "wallet" === e.method && fn(t.get("external.wallets"), function(n) {
              if (n === e.wallet) try {
                t.get("external.handler").call(t, e);
              } catch (n) {}
            }), t.emit("payment.submit", {
              method: e.method
            });
          },
          ondismiss: function ondismiss(n) {
            this.close();
            var e = this.rzp.get("modal.ondismiss");
            N(e) && a(function() {
              return e(n);
            });
          },
          onhidden: function onhidden() {
            Je.flush(), this.afterClose();
            var n = this.rzp.get("modal.onhidden");
            N(n) && n();
          },
          oncomplete: function oncomplete(n) {
            this.close();
            var e = this.rzp, t = e.get("handler");
            tt.track("checkout_success", {
              r: e,
              data: n,
              immediately: !0
            }), N(t) && a(function() {
              t.call(e, n);
            }, 200);
          },
          onpaymenterror: function onpaymenterror(n) {
            Je.flush();
            try {
              this.rzp.emit("payment.error", n), this.rzp.emit("payment.failed", n);
            } catch (n) {}
          },
          onfailure: function onfailure(n) {
            this.ondismiss(), s.alert("Payment Failed.\n" + n.error.description), this.onhidden();
          },
          onfault: function onfault(n) {
            var e = "Something went wrong.";
            K(n) ? e = n : L(n) && (n.message || n.description) && (e = n.message || n.description), 
            Je.flush(), this.rzp.close();
            var t = this.rzp.get("callback_url");
            (this.rzp.get("redirect") || ht) && t ? se(t, {
              error: n
            }, "post") : s.alert("Oops! Something went wrong.\n" + e), this.afterClose();
          },
          afterClose: function afterClose() {
            ui.container.style.display = "none";
          },
          onflush: function onflush() {
            Je.flush();
          }
        };
        var ci, li = x(jt);
        function si(e) {
          return function n() {
            return ci ? e.call(this) : (a(bn(n, this), 99), this);
          };
        }
        !function n() {
          (ci = c.body || c.getElementsByTagName("body")[0]) || a(n, 99);
        }();
        var di, fi = c.currentScript || (di = le("script"))[di.length - 1];
        function hi(n) {
          var e, t = En(fi), i = $n((e = Cn(), qn(de(n))(e)))(t), a = wn("onsubmit", yn)(i);
          Un(a);
        }
        function vi(m) {
          var n, e = En(fi), t = $n((n = Cn("input"), Bn({
            type: "submit",
            value: m.get("buttontext"),
            className: "razorpay-payment-button"
          })(n)))(e);
          wn("onsubmit", function(n) {
            n.preventDefault();
            var e = this.action, t = this.method, i = this.target, a = m.get();
            if (K(e) && e && !a.callback_url) {
              var o = {
                url: e,
                content: pn(this.querySelectorAll("[name]"), function(n, e) {
                  return n[e.name] = e.value, n;
                }, {}),
                method: K(t) ? t : "get",
                target: K(i) && i
              };
              try {
                var r = v(Nn({
                  request: o,
                  options: Nn(a),
                  back: b.href
                }));
                a.callback_url = Zt("checkout/onyx") + "?data=" + r;
              } catch (n) {}
            }
            return m.open(), !1;
          })(t);
        }
        var _i, pi;
        function yi() {
          var n, e, t, i, a, o, r, m, u, c, l, s, d, f, h, v;
          return _i || (n = Cn(), e = wn("className", "razorpay-container")(n), t = wn("innerHTML", "<style>@keyframes rzp-rot{to{transform: rotate(360deg);}}@-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}}</style>")(e), 
          i = Wn({
            zIndex: 1e9,
            position: "fixed",
            top: 0,
            display: "none",
            left: 0,
            height: "100%",
            width: "100%",
            "-webkit-overflow-scrolling": "touch",
            "-webkit-backface-visibility": "hidden",
            "overflow-y": "visible"
          })(t), _i = In(ci)(i), d = ui.container = _i, v = Cn(), h = wn("className", "razorpay-backdrop")(v), 
          f = Wn({
            "min-height": "100%",
            transition: "0.3s ease-out",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%"
          })(h), a = In(d)(f), r = ui.backdrop = a, l = "rotate(45deg)", s = "opacity 0.3s ease-in", 
          c = Cn("span"), u = wn("innerHTML", "Test Mode")(c), m = Wn({
            "text-decoration": "none",
            background: "#D64444",
            border: "1px dashed white",
            padding: "3px",
            opacity: "0",
            "-webkit-transform": l,
            "-moz-transform": l,
            "-ms-transform": l,
            "-o-transform": l,
            transform: l,
            "-webkit-transition": s,
            "-moz-transition": s,
            transition: s,
            "font-family": "lato,ubuntu,helvetica,sans-serif",
            color: "white",
            position: "absolute",
            width: "200px",
            "text-align": "center",
            right: "-50px",
            top: "50px"
          })(u), o = In(r)(m), ui.ribbon = o), _i;
        }
        function bi(n) {
          var e, t;
          return pi ? pi.openRzp(n) : (pi = new ui(n), e = s, q("message", bn("onmessage", pi))(e), 
          t = _i, $n(pi.el)(t)), pi;
        }
        jt.open = function(n) {
          return jt(n).open();
        }, li.postInit = function() {
          this.modal = {
            options: {}
          }, this.get("parent") && this.open();
        };
        var gi = li.onNew;
        li.onNew = function(n, e) {
          "payment.error" === n && Je(this, "event_paymenterror", b.href), N(gi) && gi.call(this, n, e);
        }, li.open = si(function() {
          this.metadata || (this.metadata = {}), this.metadata.openedAt = u.now();
          var n = this.checkoutFrame = bi(this);
          return Je(this, "open"), n.el.contentWindow || (n.close(), n.afterClose(), s.alert("This browser is not supported.\nPlease try payment in another browser.")), 
          "-new.js" === fi.src.slice(-7) && Je(this, "oldscript", b.href), this;
        }), li.resume = function(n) {
          var e = this.checkoutFrame;
          e && e.postMessage({
            event: "resume",
            data: n
          });
        }, li.close = function() {
          var n = this.checkoutFrame;
          n && n.postMessage({
            event: "close"
          });
        };
        var Di = si(function() {
          yi(), pi = bi();
          try {
            !function() {
              var a = {};
              Kn(fi.attributes, function(n) {
                var e, t, i = n.name.toLowerCase();
                /^data-/.test(i) && (e = a, i = i.replace(/^data-/, ""), "true" === (t = n.value) ? t = !0 : "false" === t && (t = !1), 
                /^notes\./.test(i) && (a.notes || (a.notes = {}), e = a.notes, i = i.replace(/^notes\./, "")), 
                e[i] = t);
              });
              var n, e = a.key;
              e && 0 < e.length && (a.handler = hi, n = jt(a), a.parent || vi(n));
            }();
          } catch (n) {}
        });
        s.addEventListener("rzp_error", function(n) {
          var e = n.detail;
          tt.track("cfu_error", {
            data: {
              error: e
            },
            immediately: !0
          });
        }), s.addEventListener("rzp_network_error", function(n) {
          var e = n.detail;
          e && "https://lumberjack.razorpay.com/v1/track" === e.baseUrl || tt.track("network_error", {
            data: e,
            immediately: !0
          });
        }), Je.props.library = "checkoutjs", _t.handler = function(n) {
          var e;
          !G(this, jt) || (e = this.get("callback_url")) && se(e, n, "post");
        }, _t.buttontext = "Pay Now", _t.parent = null, Jt.parent = function(n) {
          if (!V(n)) return "parent provided for embedded mode doesn't exist";
        }, Di();
      }();
    }();
    cc._RF.pop();
  }, {} ],
  proto: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "1e2ebQ7VZ9C5aEs/ICs0drv", "proto");
    "use strict";
    var $protobuf = protobuf;
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    $root.msg = function() {
      var msg = {};
      msg.AccountRegister_Quest = function() {
        function AccountRegister_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        AccountRegister_Quest.prototype.name = "";
        AccountRegister_Quest.prototype.password = "";
        AccountRegister_Quest.create = function create(properties) {
          return new AccountRegister_Quest(properties);
        };
        AccountRegister_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.name && Object.hasOwnProperty.call(message, "name") && writer.uint32(10).string(message.name);
          null != message.password && Object.hasOwnProperty.call(message, "password") && writer.uint32(18).string(message.password);
          return writer;
        };
        AccountRegister_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        AccountRegister_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.AccountRegister_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.name = reader.string();
              break;

             case 2:
              message.password = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        AccountRegister_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        AccountRegister_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.name && message.hasOwnProperty("name") && !$util.isString(message.name)) return "name: string expected";
          if (null != message.password && message.hasOwnProperty("password") && !$util.isString(message.password)) return "password: string expected";
          return null;
        };
        AccountRegister_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.AccountRegister_Quest) return object;
          var message = new $root.msg.AccountRegister_Quest();
          null != object.name && (message.name = String(object.name));
          null != object.password && (message.password = String(object.password));
          return message;
        };
        AccountRegister_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.name = "";
            object.password = "";
          }
          null != message.name && message.hasOwnProperty("name") && (object.name = message.name);
          null != message.password && message.hasOwnProperty("password") && (object.password = message.password);
          return object;
        };
        AccountRegister_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AccountRegister_Quest;
      }();
      msg.AccountRegister_Resp = function() {
        function AccountRegister_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        AccountRegister_Resp.prototype.result = 0;
        AccountRegister_Resp.create = function create(properties) {
          return new AccountRegister_Resp(properties);
        };
        AccountRegister_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.result && Object.hasOwnProperty.call(message, "result") && writer.uint32(8).int32(message.result);
          return writer;
        };
        AccountRegister_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        AccountRegister_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.AccountRegister_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.result = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        AccountRegister_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        AccountRegister_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.result && message.hasOwnProperty("result") && !$util.isInteger(message.result)) return "result: integer expected";
          return null;
        };
        AccountRegister_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.AccountRegister_Resp) return object;
          var message = new $root.msg.AccountRegister_Resp();
          null != object.result && (message.result = 0 | object.result);
          return message;
        };
        AccountRegister_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          options.defaults && (object.result = 0);
          null != message.result && message.hasOwnProperty("result") && (object.result = message.result);
          return object;
        };
        AccountRegister_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AccountRegister_Resp;
      }();
      msg.AccountLogin_Quest = function() {
        function AccountLogin_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        AccountLogin_Quest.prototype.name = "";
        AccountLogin_Quest.prototype.password = "";
        AccountLogin_Quest.create = function create(properties) {
          return new AccountLogin_Quest(properties);
        };
        AccountLogin_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.name && Object.hasOwnProperty.call(message, "name") && writer.uint32(10).string(message.name);
          null != message.password && Object.hasOwnProperty.call(message, "password") && writer.uint32(18).string(message.password);
          return writer;
        };
        AccountLogin_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        AccountLogin_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.AccountLogin_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.name = reader.string();
              break;

             case 2:
              message.password = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        AccountLogin_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        AccountLogin_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.name && message.hasOwnProperty("name") && !$util.isString(message.name)) return "name: string expected";
          if (null != message.password && message.hasOwnProperty("password") && !$util.isString(message.password)) return "password: string expected";
          return null;
        };
        AccountLogin_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.AccountLogin_Quest) return object;
          var message = new $root.msg.AccountLogin_Quest();
          null != object.name && (message.name = String(object.name));
          null != object.password && (message.password = String(object.password));
          return message;
        };
        AccountLogin_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.name = "";
            object.password = "";
          }
          null != message.name && message.hasOwnProperty("name") && (object.name = message.name);
          null != message.password && message.hasOwnProperty("password") && (object.password = message.password);
          return object;
        };
        AccountLogin_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AccountLogin_Quest;
      }();
      msg.AccountLogin_Resp = function() {
        function AccountLogin_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        AccountLogin_Resp.prototype.result = 0;
        AccountLogin_Resp.create = function create(properties) {
          return new AccountLogin_Resp(properties);
        };
        AccountLogin_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.result && Object.hasOwnProperty.call(message, "result") && writer.uint32(8).int32(message.result);
          return writer;
        };
        AccountLogin_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        AccountLogin_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.AccountLogin_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.result = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        AccountLogin_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        AccountLogin_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.result && message.hasOwnProperty("result") && !$util.isInteger(message.result)) return "result: integer expected";
          return null;
        };
        AccountLogin_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.AccountLogin_Resp) return object;
          var message = new $root.msg.AccountLogin_Resp();
          null != object.result && (message.result = 0 | object.result);
          return message;
        };
        AccountLogin_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          options.defaults && (object.result = 0);
          null != message.result && message.hasOwnProperty("result") && (object.result = message.result);
          return object;
        };
        AccountLogin_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AccountLogin_Resp;
      }();
      msg.AccountCheck_Quest = function() {
        function AccountCheck_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        AccountCheck_Quest.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        AccountCheck_Quest.prototype.sessionKey = "";
        AccountCheck_Quest.create = function create(properties) {
          return new AccountCheck_Quest(properties);
        };
        AccountCheck_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(16).uint64(message.accountId);
          null != message.sessionKey && Object.hasOwnProperty.call(message, "sessionKey") && writer.uint32(26).string(message.sessionKey);
          return writer;
        };
        AccountCheck_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        AccountCheck_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.AccountCheck_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.uint64();
              break;

             case 3:
              message.sessionKey = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        AccountCheck_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        AccountCheck_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.sessionKey && message.hasOwnProperty("sessionKey") && !$util.isString(message.sessionKey)) return "sessionKey: string expected";
          return null;
        };
        AccountCheck_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.AccountCheck_Quest) return object;
          var message = new $root.msg.AccountCheck_Quest();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          null != object.sessionKey && (message.sessionKey = String(object.sessionKey));
          return message;
        };
        AccountCheck_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long.toString() : options.longs === Number ? _long.toNumber() : _long;
            } else object.accountId = options.longs === String ? "0" : 0;
            object.sessionKey = "";
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          null != message.sessionKey && message.hasOwnProperty("sessionKey") && (object.sessionKey = message.sessionKey);
          return object;
        };
        AccountCheck_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return AccountCheck_Quest;
      }();
      msg.AccountCheck_Resp = function() {
        function AccountCheck_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        AccountCheck_Resp.prototype.port = 0;
        AccountCheck_Resp.prototype.ip = "";
        AccountCheck_Resp.prototype.checkCode = "";
        AccountCheck_Resp.prototype.result = 0;
        AccountCheck_Resp.prototype.accountId = "";
        AccountCheck_Resp.create = function create(properties) {
          return new AccountCheck_Resp(properties);
        };
        AccountCheck_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.port && Object.hasOwnProperty.call(message, "port") && writer.uint32(16).int32(message.port);
          null != message.ip && Object.hasOwnProperty.call(message, "ip") && writer.uint32(26).string(message.ip);
          null != message.checkCode && Object.hasOwnProperty.call(message, "checkCode") && writer.uint32(34).string(message.checkCode);
          null != message.result && Object.hasOwnProperty.call(message, "result") && writer.uint32(40).int32(message.result);
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(50).string(message.accountId);
          return writer;
        };
        AccountCheck_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        AccountCheck_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.AccountCheck_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.port = reader.int32();
              break;

             case 3:
              message.ip = reader.string();
              break;

             case 4:
              message.checkCode = reader.string();
              break;

             case 5:
              message.result = reader.int32();
              break;

             case 6:
              message.accountId = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        AccountCheck_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        AccountCheck_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.port && message.hasOwnProperty("port") && !$util.isInteger(message.port)) return "port: integer expected";
          if (null != message.ip && message.hasOwnProperty("ip") && !$util.isString(message.ip)) return "ip: string expected";
          if (null != message.checkCode && message.hasOwnProperty("checkCode") && !$util.isString(message.checkCode)) return "checkCode: string expected";
          if (null != message.result && message.hasOwnProperty("result") && !$util.isInteger(message.result)) return "result: integer expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isString(message.accountId)) return "accountId: string expected";
          return null;
        };
        AccountCheck_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.AccountCheck_Resp) return object;
          var message = new $root.msg.AccountCheck_Resp();
          null != object.port && (message.port = 0 | object.port);
          null != object.ip && (message.ip = String(object.ip));
          null != object.checkCode && (message.checkCode = String(object.checkCode));
          null != object.result && (message.result = 0 | object.result);
          null != object.accountId && (message.accountId = String(object.accountId));
          return message;
        };
        AccountCheck_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.port = 0;
            object.ip = "";
            object.checkCode = "";
            object.result = 0;
            object.accountId = "";
          }
          null != message.port && message.hasOwnProperty("port") && (object.port = message.port);
          null != message.ip && message.hasOwnProperty("ip") && (object.ip = message.ip);
          null != message.checkCode && message.hasOwnProperty("checkCode") && (object.checkCode = message.checkCode);
          null != message.result && message.hasOwnProperty("result") && (object.result = message.result);
          null != message.accountId && message.hasOwnProperty("accountId") && (object.accountId = message.accountId);
          return object;
        };
        AccountCheck_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        AccountCheck_Resp.eResult = function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "eNone"] = 0;
          values[valuesById[1] = "eSucceed"] = 1;
          values[valuesById[2] = "eCheckFail"] = 2;
          values[valuesById[3] = "eSysFail"] = 3;
          return values;
        }();
        return AccountCheck_Resp;
      }();
      msg.PlayerLogin_Quest = function() {
        function PlayerLogin_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        PlayerLogin_Quest.prototype.accountId = "";
        PlayerLogin_Quest.prototype.checkOutCode = "";
        PlayerLogin_Quest.create = function create(properties) {
          return new PlayerLogin_Quest(properties);
        };
        PlayerLogin_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(18).string(message.accountId);
          null != message.checkOutCode && Object.hasOwnProperty.call(message, "checkOutCode") && writer.uint32(26).string(message.checkOutCode);
          return writer;
        };
        PlayerLogin_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        PlayerLogin_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.PlayerLogin_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.string();
              break;

             case 3:
              message.checkOutCode = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        PlayerLogin_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        PlayerLogin_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isString(message.accountId)) return "accountId: string expected";
          if (null != message.checkOutCode && message.hasOwnProperty("checkOutCode") && !$util.isString(message.checkOutCode)) return "checkOutCode: string expected";
          return null;
        };
        PlayerLogin_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.PlayerLogin_Quest) return object;
          var message = new $root.msg.PlayerLogin_Quest();
          null != object.accountId && (message.accountId = String(object.accountId));
          null != object.checkOutCode && (message.checkOutCode = String(object.checkOutCode));
          return message;
        };
        PlayerLogin_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.accountId = "";
            object.checkOutCode = "";
          }
          null != message.accountId && message.hasOwnProperty("accountId") && (object.accountId = message.accountId);
          null != message.checkOutCode && message.hasOwnProperty("checkOutCode") && (object.checkOutCode = message.checkOutCode);
          return object;
        };
        PlayerLogin_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return PlayerLogin_Quest;
      }();
      msg.PlayerLogin_Resp = function() {
        function PlayerLogin_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        PlayerLogin_Resp.prototype.result = 0;
        PlayerLogin_Resp.create = function create(properties) {
          return new PlayerLogin_Resp(properties);
        };
        PlayerLogin_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.result && Object.hasOwnProperty.call(message, "result") && writer.uint32(16).int32(message.result);
          return writer;
        };
        PlayerLogin_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        PlayerLogin_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.PlayerLogin_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.result = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        PlayerLogin_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        PlayerLogin_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.result && message.hasOwnProperty("result") && !$util.isInteger(message.result)) return "result: integer expected";
          return null;
        };
        PlayerLogin_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.PlayerLogin_Resp) return object;
          var message = new $root.msg.PlayerLogin_Resp();
          null != object.result && (message.result = 0 | object.result);
          return message;
        };
        PlayerLogin_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          options.defaults && (object.result = 0);
          null != message.result && message.hasOwnProperty("result") && (object.result = message.result);
          return object;
        };
        PlayerLogin_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        PlayerLogin_Resp.eResult = function() {
          var valuesById = {}, values = Object.create(valuesById);
          values[valuesById[0] = "eNone"] = 0;
          values[valuesById[1] = "eSucceed"] = 1;
          values[valuesById[2] = "eFail"] = 2;
          return values;
        }();
        return PlayerLogin_Resp;
      }();
      msg.LoginFlowFinish_Resp = function() {
        function LoginFlowFinish_Resp(properties) {
          this.joinGameId = [];
          this.historyGuid = [];
          this.historyTime = [];
          this.historyCount = [];
          this.historyRank = [];
          this.historyFirst = [];
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        LoginFlowFinish_Resp.prototype.accountId = "";
        LoginFlowFinish_Resp.prototype.playerGuid = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        LoginFlowFinish_Resp.prototype.time = "";
        LoginFlowFinish_Resp.prototype.name = "";
        LoginFlowFinish_Resp.prototype.money = 0;
        LoginFlowFinish_Resp.prototype.score = 0;
        LoginFlowFinish_Resp.prototype.joinGameId = $util.emptyArray;
        LoginFlowFinish_Resp.prototype.historyGuid = $util.emptyArray;
        LoginFlowFinish_Resp.prototype.historyTime = $util.emptyArray;
        LoginFlowFinish_Resp.prototype.historyCount = $util.emptyArray;
        LoginFlowFinish_Resp.prototype.historyRank = $util.emptyArray;
        LoginFlowFinish_Resp.prototype.historyFirst = $util.emptyArray;
        LoginFlowFinish_Resp.create = function create(properties) {
          return new LoginFlowFinish_Resp(properties);
        };
        LoginFlowFinish_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(18).string(message.accountId);
          null != message.playerGuid && Object.hasOwnProperty.call(message, "playerGuid") && writer.uint32(24).uint64(message.playerGuid);
          null != message.time && Object.hasOwnProperty.call(message, "time") && writer.uint32(34).string(message.time);
          null != message.name && Object.hasOwnProperty.call(message, "name") && writer.uint32(42).string(message.name);
          null != message.money && Object.hasOwnProperty.call(message, "money") && writer.uint32(48).int32(message.money);
          null != message.score && Object.hasOwnProperty.call(message, "score") && writer.uint32(56).int32(message.score);
          if (null != message.joinGameId && message.joinGameId.length) {
            writer.uint32(66).fork();
            for (var i = 0; i < message.joinGameId.length; ++i) writer.int32(message.joinGameId[i]);
            writer.ldelim();
          }
          if (null != message.historyGuid && message.historyGuid.length) for (var i = 0; i < message.historyGuid.length; ++i) writer.uint32(74).string(message.historyGuid[i]);
          if (null != message.historyTime && message.historyTime.length) for (var i = 0; i < message.historyTime.length; ++i) writer.uint32(82).string(message.historyTime[i]);
          if (null != message.historyCount && message.historyCount.length) {
            writer.uint32(90).fork();
            for (var i = 0; i < message.historyCount.length; ++i) writer.int32(message.historyCount[i]);
            writer.ldelim();
          }
          if (null != message.historyRank && message.historyRank.length) {
            writer.uint32(98).fork();
            for (var i = 0; i < message.historyRank.length; ++i) writer.int32(message.historyRank[i]);
            writer.ldelim();
          }
          if (null != message.historyFirst && message.historyFirst.length) for (var i = 0; i < message.historyFirst.length; ++i) writer.uint32(106).string(message.historyFirst[i]);
          return writer;
        };
        LoginFlowFinish_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        LoginFlowFinish_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.LoginFlowFinish_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.string();
              break;

             case 3:
              message.playerGuid = reader.uint64();
              break;

             case 4:
              message.time = reader.string();
              break;

             case 5:
              message.name = reader.string();
              break;

             case 6:
              message.money = reader.int32();
              break;

             case 7:
              message.score = reader.int32();
              break;

             case 8:
              message.joinGameId && message.joinGameId.length || (message.joinGameId = []);
              if (2 === (7 & tag)) {
                var end2 = reader.uint32() + reader.pos;
                while (reader.pos < end2) message.joinGameId.push(reader.int32());
              } else message.joinGameId.push(reader.int32());
              break;

             case 9:
              message.historyGuid && message.historyGuid.length || (message.historyGuid = []);
              message.historyGuid.push(reader.string());
              break;

             case 10:
              message.historyTime && message.historyTime.length || (message.historyTime = []);
              message.historyTime.push(reader.string());
              break;

             case 11:
              message.historyCount && message.historyCount.length || (message.historyCount = []);
              if (2 === (7 & tag)) {
                var end2 = reader.uint32() + reader.pos;
                while (reader.pos < end2) message.historyCount.push(reader.int32());
              } else message.historyCount.push(reader.int32());
              break;

             case 12:
              message.historyRank && message.historyRank.length || (message.historyRank = []);
              if (2 === (7 & tag)) {
                var end2 = reader.uint32() + reader.pos;
                while (reader.pos < end2) message.historyRank.push(reader.int32());
              } else message.historyRank.push(reader.int32());
              break;

             case 13:
              message.historyFirst && message.historyFirst.length || (message.historyFirst = []);
              message.historyFirst.push(reader.string());
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        LoginFlowFinish_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        LoginFlowFinish_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isString(message.accountId)) return "accountId: string expected";
          if (null != message.playerGuid && message.hasOwnProperty("playerGuid") && !$util.isInteger(message.playerGuid) && !(message.playerGuid && $util.isInteger(message.playerGuid.low) && $util.isInteger(message.playerGuid.high))) return "playerGuid: integer|Long expected";
          if (null != message.time && message.hasOwnProperty("time") && !$util.isString(message.time)) return "time: string expected";
          if (null != message.name && message.hasOwnProperty("name") && !$util.isString(message.name)) return "name: string expected";
          if (null != message.money && message.hasOwnProperty("money") && !$util.isInteger(message.money)) return "money: integer expected";
          if (null != message.score && message.hasOwnProperty("score") && !$util.isInteger(message.score)) return "score: integer expected";
          if (null != message.joinGameId && message.hasOwnProperty("joinGameId")) {
            if (!Array.isArray(message.joinGameId)) return "joinGameId: array expected";
            for (var i = 0; i < message.joinGameId.length; ++i) if (!$util.isInteger(message.joinGameId[i])) return "joinGameId: integer[] expected";
          }
          if (null != message.historyGuid && message.hasOwnProperty("historyGuid")) {
            if (!Array.isArray(message.historyGuid)) return "historyGuid: array expected";
            for (var i = 0; i < message.historyGuid.length; ++i) if (!$util.isString(message.historyGuid[i])) return "historyGuid: string[] expected";
          }
          if (null != message.historyTime && message.hasOwnProperty("historyTime")) {
            if (!Array.isArray(message.historyTime)) return "historyTime: array expected";
            for (var i = 0; i < message.historyTime.length; ++i) if (!$util.isString(message.historyTime[i])) return "historyTime: string[] expected";
          }
          if (null != message.historyCount && message.hasOwnProperty("historyCount")) {
            if (!Array.isArray(message.historyCount)) return "historyCount: array expected";
            for (var i = 0; i < message.historyCount.length; ++i) if (!$util.isInteger(message.historyCount[i])) return "historyCount: integer[] expected";
          }
          if (null != message.historyRank && message.hasOwnProperty("historyRank")) {
            if (!Array.isArray(message.historyRank)) return "historyRank: array expected";
            for (var i = 0; i < message.historyRank.length; ++i) if (!$util.isInteger(message.historyRank[i])) return "historyRank: integer[] expected";
          }
          if (null != message.historyFirst && message.hasOwnProperty("historyFirst")) {
            if (!Array.isArray(message.historyFirst)) return "historyFirst: array expected";
            for (var i = 0; i < message.historyFirst.length; ++i) if (!$util.isString(message.historyFirst[i])) return "historyFirst: string[] expected";
          }
          return null;
        };
        LoginFlowFinish_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.LoginFlowFinish_Resp) return object;
          var message = new $root.msg.LoginFlowFinish_Resp();
          null != object.accountId && (message.accountId = String(object.accountId));
          null != object.playerGuid && ($util.Long ? (message.playerGuid = $util.Long.fromValue(object.playerGuid)).unsigned = true : "string" === typeof object.playerGuid ? message.playerGuid = parseInt(object.playerGuid, 10) : "number" === typeof object.playerGuid ? message.playerGuid = object.playerGuid : "object" === typeof object.playerGuid && (message.playerGuid = new $util.LongBits(object.playerGuid.low >>> 0, object.playerGuid.high >>> 0).toNumber(true)));
          null != object.time && (message.time = String(object.time));
          null != object.name && (message.name = String(object.name));
          null != object.money && (message.money = 0 | object.money);
          null != object.score && (message.score = 0 | object.score);
          if (object.joinGameId) {
            if (!Array.isArray(object.joinGameId)) throw TypeError(".msg.LoginFlowFinish_Resp.joinGameId: array expected");
            message.joinGameId = [];
            for (var i = 0; i < object.joinGameId.length; ++i) message.joinGameId[i] = 0 | object.joinGameId[i];
          }
          if (object.historyGuid) {
            if (!Array.isArray(object.historyGuid)) throw TypeError(".msg.LoginFlowFinish_Resp.historyGuid: array expected");
            message.historyGuid = [];
            for (var i = 0; i < object.historyGuid.length; ++i) message.historyGuid[i] = String(object.historyGuid[i]);
          }
          if (object.historyTime) {
            if (!Array.isArray(object.historyTime)) throw TypeError(".msg.LoginFlowFinish_Resp.historyTime: array expected");
            message.historyTime = [];
            for (var i = 0; i < object.historyTime.length; ++i) message.historyTime[i] = String(object.historyTime[i]);
          }
          if (object.historyCount) {
            if (!Array.isArray(object.historyCount)) throw TypeError(".msg.LoginFlowFinish_Resp.historyCount: array expected");
            message.historyCount = [];
            for (var i = 0; i < object.historyCount.length; ++i) message.historyCount[i] = 0 | object.historyCount[i];
          }
          if (object.historyRank) {
            if (!Array.isArray(object.historyRank)) throw TypeError(".msg.LoginFlowFinish_Resp.historyRank: array expected");
            message.historyRank = [];
            for (var i = 0; i < object.historyRank.length; ++i) message.historyRank[i] = 0 | object.historyRank[i];
          }
          if (object.historyFirst) {
            if (!Array.isArray(object.historyFirst)) throw TypeError(".msg.LoginFlowFinish_Resp.historyFirst: array expected");
            message.historyFirst = [];
            for (var i = 0; i < object.historyFirst.length; ++i) message.historyFirst[i] = String(object.historyFirst[i]);
          }
          return message;
        };
        LoginFlowFinish_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.arrays || options.defaults) {
            object.joinGameId = [];
            object.historyGuid = [];
            object.historyTime = [];
            object.historyCount = [];
            object.historyRank = [];
            object.historyFirst = [];
          }
          if (options.defaults) {
            object.accountId = "";
            if ($util.Long) {
              var _long2 = new $util.Long(0, 0, true);
              object.playerGuid = options.longs === String ? _long2.toString() : options.longs === Number ? _long2.toNumber() : _long2;
            } else object.playerGuid = options.longs === String ? "0" : 0;
            object.time = "";
            object.name = "";
            object.money = 0;
            object.score = 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && (object.accountId = message.accountId);
          null != message.playerGuid && message.hasOwnProperty("playerGuid") && ("number" === typeof message.playerGuid ? object.playerGuid = options.longs === String ? String(message.playerGuid) : message.playerGuid : object.playerGuid = options.longs === String ? $util.Long.prototype.toString.call(message.playerGuid) : options.longs === Number ? new $util.LongBits(message.playerGuid.low >>> 0, message.playerGuid.high >>> 0).toNumber(true) : message.playerGuid);
          null != message.time && message.hasOwnProperty("time") && (object.time = message.time);
          null != message.name && message.hasOwnProperty("name") && (object.name = message.name);
          null != message.money && message.hasOwnProperty("money") && (object.money = message.money);
          null != message.score && message.hasOwnProperty("score") && (object.score = message.score);
          if (message.joinGameId && message.joinGameId.length) {
            object.joinGameId = [];
            for (var j = 0; j < message.joinGameId.length; ++j) object.joinGameId[j] = message.joinGameId[j];
          }
          if (message.historyGuid && message.historyGuid.length) {
            object.historyGuid = [];
            for (var j = 0; j < message.historyGuid.length; ++j) object.historyGuid[j] = message.historyGuid[j];
          }
          if (message.historyTime && message.historyTime.length) {
            object.historyTime = [];
            for (var j = 0; j < message.historyTime.length; ++j) object.historyTime[j] = message.historyTime[j];
          }
          if (message.historyCount && message.historyCount.length) {
            object.historyCount = [];
            for (var j = 0; j < message.historyCount.length; ++j) object.historyCount[j] = message.historyCount[j];
          }
          if (message.historyRank && message.historyRank.length) {
            object.historyRank = [];
            for (var j = 0; j < message.historyRank.length; ++j) object.historyRank[j] = message.historyRank[j];
          }
          if (message.historyFirst && message.historyFirst.length) {
            object.historyFirst = [];
            for (var j = 0; j < message.historyFirst.length; ++j) object.historyFirst[j] = message.historyFirst[j];
          }
          return object;
        };
        LoginFlowFinish_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return LoginFlowFinish_Resp;
      }();
      msg.Client_Ping_Quest = function() {
        function Client_Ping_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        Client_Ping_Quest.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        Client_Ping_Quest.create = function create(properties) {
          return new Client_Ping_Quest(properties);
        };
        Client_Ping_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(16).uint64(message.accountId);
          return writer;
        };
        Client_Ping_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        Client_Ping_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.Client_Ping_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.uint64();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        Client_Ping_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        Client_Ping_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          return null;
        };
        Client_Ping_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.Client_Ping_Quest) return object;
          var message = new $root.msg.Client_Ping_Quest();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          return message;
        };
        Client_Ping_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) if ($util.Long) {
            var _long3 = new $util.Long(0, 0, true);
            object.accountId = options.longs === String ? _long3.toString() : options.longs === Number ? _long3.toNumber() : _long3;
          } else object.accountId = options.longs === String ? "0" : 0;
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          return object;
        };
        Client_Ping_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return Client_Ping_Quest;
      }();
      msg.Client_Ping_Resp = function() {
        function Client_Ping_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        Client_Ping_Resp.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        Client_Ping_Resp.create = function create(properties) {
          return new Client_Ping_Resp(properties);
        };
        Client_Ping_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(16).uint64(message.accountId);
          return writer;
        };
        Client_Ping_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        Client_Ping_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.Client_Ping_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.uint64();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        Client_Ping_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        Client_Ping_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          return null;
        };
        Client_Ping_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.Client_Ping_Resp) return object;
          var message = new $root.msg.Client_Ping_Resp();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          return message;
        };
        Client_Ping_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) if ($util.Long) {
            var _long4 = new $util.Long(0, 0, true);
            object.accountId = options.longs === String ? _long4.toString() : options.longs === Number ? _long4.toNumber() : _long4;
          } else object.accountId = options.longs === String ? "0" : 0;
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          return object;
        };
        Client_Ping_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return Client_Ping_Resp;
      }();
      msg.GameList_Resp = function() {
        function GameList_Resp(properties) {
          this.id = [];
          this.info = [];
          this.state = [];
          this.count = [];
          this.second = [];
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameList_Resp.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameList_Resp.prototype.id = $util.emptyArray;
        GameList_Resp.prototype.info = $util.emptyArray;
        GameList_Resp.prototype.state = $util.emptyArray;
        GameList_Resp.prototype.count = $util.emptyArray;
        GameList_Resp.prototype.second = $util.emptyArray;
        GameList_Resp.create = function create(properties) {
          return new GameList_Resp(properties);
        };
        GameList_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(8).uint64(message.accountId);
          if (null != message.id && message.id.length) {
            writer.uint32(18).fork();
            for (var i = 0; i < message.id.length; ++i) writer.int32(message.id[i]);
            writer.ldelim();
          }
          if (null != message.info && message.info.length) for (var i = 0; i < message.info.length; ++i) writer.uint32(26).string(message.info[i]);
          if (null != message.state && message.state.length) {
            writer.uint32(34).fork();
            for (var i = 0; i < message.state.length; ++i) writer.int32(message.state[i]);
            writer.ldelim();
          }
          if (null != message.count && message.count.length) {
            writer.uint32(42).fork();
            for (var i = 0; i < message.count.length; ++i) writer.int32(message.count[i]);
            writer.ldelim();
          }
          if (null != message.second && message.second.length) {
            writer.uint32(50).fork();
            for (var i = 0; i < message.second.length; ++i) writer.int32(message.second[i]);
            writer.ldelim();
          }
          return writer;
        };
        GameList_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameList_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameList_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.accountId = reader.uint64();
              break;

             case 2:
              message.id && message.id.length || (message.id = []);
              if (2 === (7 & tag)) {
                var end2 = reader.uint32() + reader.pos;
                while (reader.pos < end2) message.id.push(reader.int32());
              } else message.id.push(reader.int32());
              break;

             case 3:
              message.info && message.info.length || (message.info = []);
              message.info.push(reader.string());
              break;

             case 4:
              message.state && message.state.length || (message.state = []);
              if (2 === (7 & tag)) {
                var end2 = reader.uint32() + reader.pos;
                while (reader.pos < end2) message.state.push(reader.int32());
              } else message.state.push(reader.int32());
              break;

             case 5:
              message.count && message.count.length || (message.count = []);
              if (2 === (7 & tag)) {
                var end2 = reader.uint32() + reader.pos;
                while (reader.pos < end2) message.count.push(reader.int32());
              } else message.count.push(reader.int32());
              break;

             case 6:
              message.second && message.second.length || (message.second = []);
              if (2 === (7 & tag)) {
                var end2 = reader.uint32() + reader.pos;
                while (reader.pos < end2) message.second.push(reader.int32());
              } else message.second.push(reader.int32());
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameList_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameList_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.id && message.hasOwnProperty("id")) {
            if (!Array.isArray(message.id)) return "id: array expected";
            for (var i = 0; i < message.id.length; ++i) if (!$util.isInteger(message.id[i])) return "id: integer[] expected";
          }
          if (null != message.info && message.hasOwnProperty("info")) {
            if (!Array.isArray(message.info)) return "info: array expected";
            for (var i = 0; i < message.info.length; ++i) if (!$util.isString(message.info[i])) return "info: string[] expected";
          }
          if (null != message.state && message.hasOwnProperty("state")) {
            if (!Array.isArray(message.state)) return "state: array expected";
            for (var i = 0; i < message.state.length; ++i) if (!$util.isInteger(message.state[i])) return "state: integer[] expected";
          }
          if (null != message.count && message.hasOwnProperty("count")) {
            if (!Array.isArray(message.count)) return "count: array expected";
            for (var i = 0; i < message.count.length; ++i) if (!$util.isInteger(message.count[i])) return "count: integer[] expected";
          }
          if (null != message.second && message.hasOwnProperty("second")) {
            if (!Array.isArray(message.second)) return "second: array expected";
            for (var i = 0; i < message.second.length; ++i) if (!$util.isInteger(message.second[i])) return "second: integer[] expected";
          }
          return null;
        };
        GameList_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameList_Resp) return object;
          var message = new $root.msg.GameList_Resp();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          if (object.id) {
            if (!Array.isArray(object.id)) throw TypeError(".msg.GameList_Resp.id: array expected");
            message.id = [];
            for (var i = 0; i < object.id.length; ++i) message.id[i] = 0 | object.id[i];
          }
          if (object.info) {
            if (!Array.isArray(object.info)) throw TypeError(".msg.GameList_Resp.info: array expected");
            message.info = [];
            for (var i = 0; i < object.info.length; ++i) message.info[i] = String(object.info[i]);
          }
          if (object.state) {
            if (!Array.isArray(object.state)) throw TypeError(".msg.GameList_Resp.state: array expected");
            message.state = [];
            for (var i = 0; i < object.state.length; ++i) message.state[i] = 0 | object.state[i];
          }
          if (object.count) {
            if (!Array.isArray(object.count)) throw TypeError(".msg.GameList_Resp.count: array expected");
            message.count = [];
            for (var i = 0; i < object.count.length; ++i) message.count[i] = 0 | object.count[i];
          }
          if (object.second) {
            if (!Array.isArray(object.second)) throw TypeError(".msg.GameList_Resp.second: array expected");
            message.second = [];
            for (var i = 0; i < object.second.length; ++i) message.second[i] = 0 | object.second[i];
          }
          return message;
        };
        GameList_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.arrays || options.defaults) {
            object.id = [];
            object.info = [];
            object.state = [];
            object.count = [];
            object.second = [];
          }
          if (options.defaults) if ($util.Long) {
            var _long5 = new $util.Long(0, 0, true);
            object.accountId = options.longs === String ? _long5.toString() : options.longs === Number ? _long5.toNumber() : _long5;
          } else object.accountId = options.longs === String ? "0" : 0;
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          if (message.id && message.id.length) {
            object.id = [];
            for (var j = 0; j < message.id.length; ++j) object.id[j] = message.id[j];
          }
          if (message.info && message.info.length) {
            object.info = [];
            for (var j = 0; j < message.info.length; ++j) object.info[j] = message.info[j];
          }
          if (message.state && message.state.length) {
            object.state = [];
            for (var j = 0; j < message.state.length; ++j) object.state[j] = message.state[j];
          }
          if (message.count && message.count.length) {
            object.count = [];
            for (var j = 0; j < message.count.length; ++j) object.count[j] = message.count[j];
          }
          if (message.second && message.second.length) {
            object.second = [];
            for (var j = 0; j < message.second.length; ++j) object.second[j] = message.second[j];
          }
          return object;
        };
        GameList_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameList_Resp;
      }();
      msg.GameApply_Quest = function() {
        function GameApply_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameApply_Quest.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameApply_Quest.prototype.id = 0;
        GameApply_Quest.create = function create(properties) {
          return new GameApply_Quest(properties);
        };
        GameApply_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(8).uint64(message.accountId);
          null != message.id && Object.hasOwnProperty.call(message, "id") && writer.uint32(16).int32(message.id);
          return writer;
        };
        GameApply_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameApply_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameApply_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.accountId = reader.uint64();
              break;

             case 2:
              message.id = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameApply_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameApply_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.id && message.hasOwnProperty("id") && !$util.isInteger(message.id)) return "id: integer expected";
          return null;
        };
        GameApply_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameApply_Quest) return object;
          var message = new $root.msg.GameApply_Quest();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          null != object.id && (message.id = 0 | object.id);
          return message;
        };
        GameApply_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long6 = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long6.toString() : options.longs === Number ? _long6.toNumber() : _long6;
            } else object.accountId = options.longs === String ? "0" : 0;
            object.id = 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          null != message.id && message.hasOwnProperty("id") && (object.id = message.id);
          return object;
        };
        GameApply_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameApply_Quest;
      }();
      msg.GameApply_Resp = function() {
        function GameApply_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameApply_Resp.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameApply_Resp.prototype.result = 0;
        GameApply_Resp.create = function create(properties) {
          return new GameApply_Resp(properties);
        };
        GameApply_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(16).uint64(message.accountId);
          null != message.result && Object.hasOwnProperty.call(message, "result") && writer.uint32(32).int32(message.result);
          return writer;
        };
        GameApply_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameApply_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameApply_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.uint64();
              break;

             case 4:
              message.result = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameApply_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameApply_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.result && message.hasOwnProperty("result") && !$util.isInteger(message.result)) return "result: integer expected";
          return null;
        };
        GameApply_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameApply_Resp) return object;
          var message = new $root.msg.GameApply_Resp();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          null != object.result && (message.result = 0 | object.result);
          return message;
        };
        GameApply_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long7 = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long7.toString() : options.longs === Number ? _long7.toNumber() : _long7;
            } else object.accountId = options.longs === String ? "0" : 0;
            object.result = 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          null != message.result && message.hasOwnProperty("result") && (object.result = message.result);
          return object;
        };
        GameApply_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameApply_Resp;
      }();
      msg.GameStart_Resp = function() {
        function GameStart_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameStart_Resp.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameStart_Resp.create = function create(properties) {
          return new GameStart_Resp(properties);
        };
        GameStart_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(16).uint64(message.accountId);
          return writer;
        };
        GameStart_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameStart_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameStart_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.uint64();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameStart_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameStart_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          return null;
        };
        GameStart_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameStart_Resp) return object;
          var message = new $root.msg.GameStart_Resp();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          return message;
        };
        GameStart_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) if ($util.Long) {
            var _long8 = new $util.Long(0, 0, true);
            object.accountId = options.longs === String ? _long8.toString() : options.longs === Number ? _long8.toNumber() : _long8;
          } else object.accountId = options.longs === String ? "0" : 0;
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          return object;
        };
        GameStart_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameStart_Resp;
      }();
      msg.GameLose_Quest = function() {
        function GameLose_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameLose_Quest.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameLose_Quest.prototype.roleGuid = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameLose_Quest.create = function create(properties) {
          return new GameLose_Quest(properties);
        };
        GameLose_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(16).uint64(message.accountId);
          null != message.roleGuid && Object.hasOwnProperty.call(message, "roleGuid") && writer.uint32(32).uint64(message.roleGuid);
          return writer;
        };
        GameLose_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameLose_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameLose_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.uint64();
              break;

             case 4:
              message.roleGuid = reader.uint64();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameLose_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameLose_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.roleGuid && message.hasOwnProperty("roleGuid") && !$util.isInteger(message.roleGuid) && !(message.roleGuid && $util.isInteger(message.roleGuid.low) && $util.isInteger(message.roleGuid.high))) return "roleGuid: integer|Long expected";
          return null;
        };
        GameLose_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameLose_Quest) return object;
          var message = new $root.msg.GameLose_Quest();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          null != object.roleGuid && ($util.Long ? (message.roleGuid = $util.Long.fromValue(object.roleGuid)).unsigned = true : "string" === typeof object.roleGuid ? message.roleGuid = parseInt(object.roleGuid, 10) : "number" === typeof object.roleGuid ? message.roleGuid = object.roleGuid : "object" === typeof object.roleGuid && (message.roleGuid = new $util.LongBits(object.roleGuid.low >>> 0, object.roleGuid.high >>> 0).toNumber(true)));
          return message;
        };
        GameLose_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long9 = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long9.toString() : options.longs === Number ? _long9.toNumber() : _long9;
            } else object.accountId = options.longs === String ? "0" : 0;
            if ($util.Long) {
              var _long9 = new $util.Long(0, 0, true);
              object.roleGuid = options.longs === String ? _long9.toString() : options.longs === Number ? _long9.toNumber() : _long9;
            } else object.roleGuid = options.longs === String ? "0" : 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          null != message.roleGuid && message.hasOwnProperty("roleGuid") && ("number" === typeof message.roleGuid ? object.roleGuid = options.longs === String ? String(message.roleGuid) : message.roleGuid : object.roleGuid = options.longs === String ? $util.Long.prototype.toString.call(message.roleGuid) : options.longs === Number ? new $util.LongBits(message.roleGuid.low >>> 0, message.roleGuid.high >>> 0).toNumber(true) : message.roleGuid);
          return object;
        };
        GameLose_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameLose_Quest;
      }();
      msg.GameLose_Resp = function() {
        function GameLose_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameLose_Resp.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameLose_Resp.prototype.nRank = 0;
        GameLose_Resp.create = function create(properties) {
          return new GameLose_Resp(properties);
        };
        GameLose_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(16).uint64(message.accountId);
          null != message.nRank && Object.hasOwnProperty.call(message, "nRank") && writer.uint32(24).int32(message.nRank);
          return writer;
        };
        GameLose_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameLose_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameLose_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.uint64();
              break;

             case 3:
              message.nRank = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameLose_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameLose_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.nRank && message.hasOwnProperty("nRank") && !$util.isInteger(message.nRank)) return "nRank: integer expected";
          return null;
        };
        GameLose_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameLose_Resp) return object;
          var message = new $root.msg.GameLose_Resp();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          null != object.nRank && (message.nRank = 0 | object.nRank);
          return message;
        };
        GameLose_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long10 = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long10.toString() : options.longs === Number ? _long10.toNumber() : _long10;
            } else object.accountId = options.longs === String ? "0" : 0;
            object.nRank = 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          null != message.nRank && message.hasOwnProperty("nRank") && (object.nRank = message.nRank);
          return object;
        };
        GameLose_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameLose_Resp;
      }();
      msg.GameOver_Resp = function() {
        function GameOver_Resp(properties) {
          this.rankName = [];
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameOver_Resp.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameOver_Resp.prototype.rankName = $util.emptyArray;
        GameOver_Resp.prototype.nRank = 0;
        GameOver_Resp.create = function create(properties) {
          return new GameOver_Resp(properties);
        };
        GameOver_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(16).uint64(message.accountId);
          if (null != message.rankName && message.rankName.length) for (var i = 0; i < message.rankName.length; ++i) writer.uint32(26).string(message.rankName[i]);
          null != message.nRank && Object.hasOwnProperty.call(message, "nRank") && writer.uint32(32).int32(message.nRank);
          return writer;
        };
        GameOver_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameOver_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameOver_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 2:
              message.accountId = reader.uint64();
              break;

             case 3:
              message.rankName && message.rankName.length || (message.rankName = []);
              message.rankName.push(reader.string());
              break;

             case 4:
              message.nRank = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameOver_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameOver_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.rankName && message.hasOwnProperty("rankName")) {
            if (!Array.isArray(message.rankName)) return "rankName: array expected";
            for (var i = 0; i < message.rankName.length; ++i) if (!$util.isString(message.rankName[i])) return "rankName: string[] expected";
          }
          if (null != message.nRank && message.hasOwnProperty("nRank") && !$util.isInteger(message.nRank)) return "nRank: integer expected";
          return null;
        };
        GameOver_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameOver_Resp) return object;
          var message = new $root.msg.GameOver_Resp();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          if (object.rankName) {
            if (!Array.isArray(object.rankName)) throw TypeError(".msg.GameOver_Resp.rankName: array expected");
            message.rankName = [];
            for (var i = 0; i < object.rankName.length; ++i) message.rankName[i] = String(object.rankName[i]);
          }
          null != object.nRank && (message.nRank = 0 | object.nRank);
          return message;
        };
        GameOver_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          (options.arrays || options.defaults) && (object.rankName = []);
          if (options.defaults) {
            if ($util.Long) {
              var _long11 = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long11.toString() : options.longs === Number ? _long11.toNumber() : _long11;
            } else object.accountId = options.longs === String ? "0" : 0;
            object.nRank = 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          if (message.rankName && message.rankName.length) {
            object.rankName = [];
            for (var j = 0; j < message.rankName.length; ++j) object.rankName[j] = message.rankName[j];
          }
          null != message.nRank && message.hasOwnProperty("nRank") && (object.nRank = message.nRank);
          return object;
        };
        GameOver_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameOver_Resp;
      }();
      msg.GameCountChange_Resp = function() {
        function GameCountChange_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameCountChange_Resp.prototype.gameId = 0;
        GameCountChange_Resp.prototype.count = 0;
        GameCountChange_Resp.create = function create(properties) {
          return new GameCountChange_Resp(properties);
        };
        GameCountChange_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.gameId && Object.hasOwnProperty.call(message, "gameId") && writer.uint32(8).int32(message.gameId);
          null != message.count && Object.hasOwnProperty.call(message, "count") && writer.uint32(16).int32(message.count);
          return writer;
        };
        GameCountChange_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameCountChange_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameCountChange_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.gameId = reader.int32();
              break;

             case 2:
              message.count = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameCountChange_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameCountChange_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.gameId && message.hasOwnProperty("gameId") && !$util.isInteger(message.gameId)) return "gameId: integer expected";
          if (null != message.count && message.hasOwnProperty("count") && !$util.isInteger(message.count)) return "count: integer expected";
          return null;
        };
        GameCountChange_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameCountChange_Resp) return object;
          var message = new $root.msg.GameCountChange_Resp();
          null != object.gameId && (message.gameId = 0 | object.gameId);
          null != object.count && (message.count = 0 | object.count);
          return message;
        };
        GameCountChange_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.gameId = 0;
            object.count = 0;
          }
          null != message.gameId && message.hasOwnProperty("gameId") && (object.gameId = message.gameId);
          null != message.count && message.hasOwnProperty("count") && (object.count = message.count);
          return object;
        };
        GameCountChange_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameCountChange_Resp;
      }();
      msg.GameChangeName_Quest = function() {
        function GameChangeName_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameChangeName_Quest.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameChangeName_Quest.prototype.name = "";
        GameChangeName_Quest.create = function create(properties) {
          return new GameChangeName_Quest(properties);
        };
        GameChangeName_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(8).uint64(message.accountId);
          null != message.name && Object.hasOwnProperty.call(message, "name") && writer.uint32(18).string(message.name);
          return writer;
        };
        GameChangeName_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameChangeName_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameChangeName_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.accountId = reader.uint64();
              break;

             case 2:
              message.name = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameChangeName_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameChangeName_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.name && message.hasOwnProperty("name") && !$util.isString(message.name)) return "name: string expected";
          return null;
        };
        GameChangeName_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameChangeName_Quest) return object;
          var message = new $root.msg.GameChangeName_Quest();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          null != object.name && (message.name = String(object.name));
          return message;
        };
        GameChangeName_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long12 = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long12.toString() : options.longs === Number ? _long12.toNumber() : _long12;
            } else object.accountId = options.longs === String ? "0" : 0;
            object.name = "";
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          null != message.name && message.hasOwnProperty("name") && (object.name = message.name);
          return object;
        };
        GameChangeName_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameChangeName_Quest;
      }();
      msg.GameChangeName_Resp = function() {
        function GameChangeName_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameChangeName_Resp.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameChangeName_Resp.prototype.result = 0;
        GameChangeName_Resp.create = function create(properties) {
          return new GameChangeName_Resp(properties);
        };
        GameChangeName_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(8).uint64(message.accountId);
          null != message.result && Object.hasOwnProperty.call(message, "result") && writer.uint32(16).int32(message.result);
          return writer;
        };
        GameChangeName_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameChangeName_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameChangeName_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.accountId = reader.uint64();
              break;

             case 2:
              message.result = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameChangeName_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameChangeName_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.result && message.hasOwnProperty("result") && !$util.isInteger(message.result)) return "result: integer expected";
          return null;
        };
        GameChangeName_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameChangeName_Resp) return object;
          var message = new $root.msg.GameChangeName_Resp();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          null != object.result && (message.result = 0 | object.result);
          return message;
        };
        GameChangeName_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long13 = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long13.toString() : options.longs === Number ? _long13.toNumber() : _long13;
            } else object.accountId = options.longs === String ? "0" : 0;
            object.result = 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          null != message.result && message.hasOwnProperty("result") && (object.result = message.result);
          return object;
        };
        GameChangeName_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameChangeName_Resp;
      }();
      msg.GameRemaining_Resp = function() {
        function GameRemaining_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        GameRemaining_Resp.prototype.accountId = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
        GameRemaining_Resp.prototype.count = 0;
        GameRemaining_Resp.create = function create(properties) {
          return new GameRemaining_Resp(properties);
        };
        GameRemaining_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(8).uint64(message.accountId);
          null != message.count && Object.hasOwnProperty.call(message, "count") && writer.uint32(16).int32(message.count);
          return writer;
        };
        GameRemaining_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        GameRemaining_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.GameRemaining_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.accountId = reader.uint64();
              break;

             case 2:
              message.count = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        GameRemaining_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        GameRemaining_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isInteger(message.accountId) && !(message.accountId && $util.isInteger(message.accountId.low) && $util.isInteger(message.accountId.high))) return "accountId: integer|Long expected";
          if (null != message.count && message.hasOwnProperty("count") && !$util.isInteger(message.count)) return "count: integer expected";
          return null;
        };
        GameRemaining_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.GameRemaining_Resp) return object;
          var message = new $root.msg.GameRemaining_Resp();
          null != object.accountId && ($util.Long ? (message.accountId = $util.Long.fromValue(object.accountId)).unsigned = true : "string" === typeof object.accountId ? message.accountId = parseInt(object.accountId, 10) : "number" === typeof object.accountId ? message.accountId = object.accountId : "object" === typeof object.accountId && (message.accountId = new $util.LongBits(object.accountId.low >>> 0, object.accountId.high >>> 0).toNumber(true)));
          null != object.count && (message.count = 0 | object.count);
          return message;
        };
        GameRemaining_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            if ($util.Long) {
              var _long14 = new $util.Long(0, 0, true);
              object.accountId = options.longs === String ? _long14.toString() : options.longs === Number ? _long14.toNumber() : _long14;
            } else object.accountId = options.longs === String ? "0" : 0;
            object.count = 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && ("number" === typeof message.accountId ? object.accountId = options.longs === String ? String(message.accountId) : message.accountId : object.accountId = options.longs === String ? $util.Long.prototype.toString.call(message.accountId) : options.longs === Number ? new $util.LongBits(message.accountId.low >>> 0, message.accountId.high >>> 0).toNumber(true) : message.accountId);
          null != message.count && message.hasOwnProperty("count") && (object.count = message.count);
          return object;
        };
        GameRemaining_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return GameRemaining_Resp;
      }();
      msg.ChoosePay_Quest = function() {
        function ChoosePay_Quest(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        ChoosePay_Quest.prototype.accountId = "";
        ChoosePay_Quest.prototype.payId = 0;
        ChoosePay_Quest.create = function create(properties) {
          return new ChoosePay_Quest(properties);
        };
        ChoosePay_Quest.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(10).string(message.accountId);
          null != message.payId && Object.hasOwnProperty.call(message, "payId") && writer.uint32(16).int32(message.payId);
          return writer;
        };
        ChoosePay_Quest.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        ChoosePay_Quest.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.ChoosePay_Quest();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.accountId = reader.string();
              break;

             case 2:
              message.payId = reader.int32();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        ChoosePay_Quest.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        ChoosePay_Quest.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isString(message.accountId)) return "accountId: string expected";
          if (null != message.payId && message.hasOwnProperty("payId") && !$util.isInteger(message.payId)) return "payId: integer expected";
          return null;
        };
        ChoosePay_Quest.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.ChoosePay_Quest) return object;
          var message = new $root.msg.ChoosePay_Quest();
          null != object.accountId && (message.accountId = String(object.accountId));
          null != object.payId && (message.payId = 0 | object.payId);
          return message;
        };
        ChoosePay_Quest.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.accountId = "";
            object.payId = 0;
          }
          null != message.accountId && message.hasOwnProperty("accountId") && (object.accountId = message.accountId);
          null != message.payId && message.hasOwnProperty("payId") && (object.payId = message.payId);
          return object;
        };
        ChoosePay_Quest.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ChoosePay_Quest;
      }();
      msg.ChoosePay_Resp = function() {
        function ChoosePay_Resp(properties) {
          if (properties) for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i) null != properties[keys[i]] && (this[keys[i]] = properties[keys[i]]);
        }
        ChoosePay_Resp.prototype.accountId = "";
        ChoosePay_Resp.prototype.orderId = "";
        ChoosePay_Resp.prototype.sign = 0;
        ChoosePay_Resp.prototype.result = "";
        ChoosePay_Resp.create = function create(properties) {
          return new ChoosePay_Resp(properties);
        };
        ChoosePay_Resp.encode = function encode(message, writer) {
          writer || (writer = $Writer.create());
          null != message.accountId && Object.hasOwnProperty.call(message, "accountId") && writer.uint32(10).string(message.accountId);
          null != message.orderId && Object.hasOwnProperty.call(message, "orderId") && writer.uint32(18).string(message.orderId);
          null != message.sign && Object.hasOwnProperty.call(message, "sign") && writer.uint32(24).int32(message.sign);
          null != message.result && Object.hasOwnProperty.call(message, "result") && writer.uint32(34).string(message.result);
          return writer;
        };
        ChoosePay_Resp.encodeDelimited = function encodeDelimited(message, writer) {
          return this.encode(message, writer).ldelim();
        };
        ChoosePay_Resp.decode = function decode(reader, length) {
          reader instanceof $Reader || (reader = $Reader.create(reader));
          var end = void 0 === length ? reader.len : reader.pos + length, message = new $root.msg.ChoosePay_Resp();
          while (reader.pos < end) {
            var tag = reader.uint32();
            switch (tag >>> 3) {
             case 1:
              message.accountId = reader.string();
              break;

             case 2:
              message.orderId = reader.string();
              break;

             case 3:
              message.sign = reader.int32();
              break;

             case 4:
              message.result = reader.string();
              break;

             default:
              reader.skipType(7 & tag);
            }
          }
          return message;
        };
        ChoosePay_Resp.decodeDelimited = function decodeDelimited(reader) {
          reader instanceof $Reader || (reader = new $Reader(reader));
          return this.decode(reader, reader.uint32());
        };
        ChoosePay_Resp.verify = function verify(message) {
          if ("object" !== typeof message || null === message) return "object expected";
          if (null != message.accountId && message.hasOwnProperty("accountId") && !$util.isString(message.accountId)) return "accountId: string expected";
          if (null != message.orderId && message.hasOwnProperty("orderId") && !$util.isString(message.orderId)) return "orderId: string expected";
          if (null != message.sign && message.hasOwnProperty("sign") && !$util.isInteger(message.sign)) return "sign: integer expected";
          if (null != message.result && message.hasOwnProperty("result") && !$util.isString(message.result)) return "result: string expected";
          return null;
        };
        ChoosePay_Resp.fromObject = function fromObject(object) {
          if (object instanceof $root.msg.ChoosePay_Resp) return object;
          var message = new $root.msg.ChoosePay_Resp();
          null != object.accountId && (message.accountId = String(object.accountId));
          null != object.orderId && (message.orderId = String(object.orderId));
          null != object.sign && (message.sign = 0 | object.sign);
          null != object.result && (message.result = String(object.result));
          return message;
        };
        ChoosePay_Resp.toObject = function toObject(message, options) {
          options || (options = {});
          var object = {};
          if (options.defaults) {
            object.accountId = "";
            object.orderId = "";
            object.sign = 0;
            object.result = "";
          }
          null != message.accountId && message.hasOwnProperty("accountId") && (object.accountId = message.accountId);
          null != message.orderId && message.hasOwnProperty("orderId") && (object.orderId = message.orderId);
          null != message.sign && message.hasOwnProperty("sign") && (object.sign = message.sign);
          null != message.result && message.hasOwnProperty("result") && (object.result = message.result);
          return object;
        };
        ChoosePay_Resp.prototype.toJSON = function toJSON() {
          return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };
        return ChoosePay_Resp;
      }();
      msg.eMsgID = function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "eMsg_Begin"] = 0;
        values[valuesById[1] = "eMsg_Register_Server_Apply"] = 1;
        values[valuesById[2] = "eMsg_Register_Server_Reply"] = 2;
        values[valuesById[3] = "eMsg_Client_Ping_Quest"] = 3;
        values[valuesById[4] = "eMsg_Client_Ping_Resp"] = 4;
        values[valuesById[16] = "eMsg_AccountRegister_Quest"] = 16;
        values[valuesById[17] = "eMsg_AccountRegister_Resp"] = 17;
        values[valuesById[18] = "eMsg_AccountLogin_Quest"] = 18;
        values[valuesById[19] = "eMsg_AccountLogin_Resp"] = 19;
        values[valuesById[20] = "eMsg_AccountCheck_Quest"] = 20;
        values[valuesById[21] = "eMsg_AccountCheck_Resp"] = 21;
        values[valuesById[22] = "eMsg_PlayerLogin_Quest"] = 22;
        values[valuesById[23] = "eMsg_PlayerLogin_Resp"] = 23;
        values[valuesById[24] = "eMsg_LoginFlowFinish_Resp"] = 24;
        values[valuesById[25] = "eMsg_RoleFlowFinish_Resp"] = 25;
        values[valuesById[26] = "eMsg_CreateRole_Quest"] = 26;
        values[valuesById[27] = "eMsg_CreateRole_Resp"] = 27;
        values[valuesById[28] = "eMsg_EnterGame_Quest"] = 28;
        values[valuesById[30] = "eMsg_AccountInfo_LS"] = 30;
        values[valuesById[31] = "eMsg_AccountInfo_GS"] = 31;
        values[valuesById[32] = "eMsg_PlayerLogin_GS"] = 32;
        values[valuesById[33] = "eMsg_PlayerLogin_CS"] = 33;
        values[valuesById[34] = "eMsg_KickPlayer_SS"] = 34;
        values[valuesById[35] = "eMsg_PlayerOffline_SS"] = 35;
        values[valuesById[36] = "eMsg_RoleFlowFinish_SS"] = 36;
        values[valuesById[49] = "eMsg_GameList_Resp"] = 49;
        values[valuesById[50] = "eMsg_GameApply_Quest"] = 50;
        values[valuesById[51] = "eMsg_GameApply_Resp"] = 51;
        values[valuesById[52] = "eMsg_GameStart_Resp"] = 52;
        values[valuesById[53] = "eMsg_GameLose_Quest"] = 53;
        values[valuesById[54] = "eMsg_GameLose_Resp"] = 54;
        values[valuesById[55] = "eMsg_GameOver_Resp"] = 55;
        values[valuesById[56] = "eMsg_GameCountChange_Resp"] = 56;
        values[valuesById[57] = "eMsg_GameChangeName_Quest"] = 57;
        values[valuesById[58] = "eMsg_GameChangeName_Resp"] = 58;
        values[valuesById[59] = "eMsg_GameRemaining_Resp"] = 59;
        values[valuesById[100] = "eMsg_ChoosePay_Quest"] = 100;
        values[valuesById[101] = "eMsg_ChoosePay_Resp"] = 101;
        values[valuesById[108] = "eMsg_MongoOperationQuest_SS"] = 108;
        values[valuesById[109] = "eMsg_MongoOperationResp_SS"] = 109;
        values[valuesById[110] = "eMsg_MySQLOperationQuest_SS"] = 110;
        values[valuesById[111] = "eMsg_MySQLOperationResp_SS"] = 111;
        values[valuesById[112] = "eMsg_RedisOperationQuest_SS"] = 112;
        values[valuesById[113] = "eMsg_RedisOperationResp_SS"] = 113;
        values[valuesById[541] = "eMsg_RoleObjectAddBroadcast_WS"] = 541;
        values[valuesById[542] = "eMsg_RoleObjectDelBroadcast_WS"] = 542;
        values[valuesById[543] = "eMsg_RoleMoveBroadcast_WS"] = 543;
        values[valuesById[550] = "eMsg_RoleAdd_WS"] = 550;
        values[valuesById[551] = "eMsg_RoleDel_WS"] = 551;
        values[valuesById[552] = "eMsg_UpdateObjectAttribute_SS"] = 552;
        values[valuesById[553] = "eMsg_UpdateObjectMultiAttributes_SS"] = 553;
        values[valuesById[554] = "eMsg_ObjectORMOperationQuest_SS"] = 554;
        values[valuesById[555] = "eMsg_ObjectORMOperationResponse_SS"] = 555;
        values[valuesById[900] = "eMsg_GameSystemTips_Resp"] = 900;
        values[valuesById[901] = "eMsg_Dictionary_Resp"] = 901;
        values[valuesById[902] = "eMsg_GameSystemTips_OptionalParams_Resp"] = 902;
        values[valuesById[903] = "eMsg_Dictionary_OptionalParams_Resp"] = 903;
        values[valuesById[1e3] = "eMsg_ServerExit_CS"] = 1e3;
        values[valuesById[2500] = "eMsg_RPCCall_SS"] = 2500;
        values[valuesById[2501] = "eMsg_RPCBack_SS"] = 2501;
        values[valuesById[5e4] = "eMsg_CheatCode_Modify_request"] = 5e4;
        values[valuesById[50001] = "eMsg_CheatCode_Modify_response"] = 50001;
        values[valuesById[50002] = "eMsg_CheatCode_Modify_SS"] = 50002;
        values[valuesById[50050] = "eMsg_TestRpc"] = 50050;
        values[valuesById[6e4] = "eEvent_Begin"] = 6e4;
        values[valuesById[60001] = "eEvent_PlayerReadyLogin"] = 60001;
        values[valuesById[60002] = "eEvent_PlayerLoginSucceed"] = 60002;
        values[valuesById[60004] = "eEvent_RoleReady"] = 60004;
        values[valuesById[60005] = "eEvent_RoleEnter"] = 60005;
        values[valuesById[60007] = "eEvent_RoleExit"] = 60007;
        values[valuesById[60008] = "eEvent_RoleKick"] = 60008;
        values[valuesById[60009] = "eEvent_RoleEnterScene"] = 60009;
        values[valuesById[60010] = "eEvent_RoleLeaveScene"] = 60010;
        values[valuesById[60011] = "eEvent_RoleGotSkill"] = 60011;
        values[valuesById[60012] = "eEvent_RoleLoseSkill"] = 60012;
        values[valuesById[60013] = "eEvent_DayAcross"] = 60013;
        values[valuesById[60014] = "eEvent_HourAcross"] = 60014;
        return values;
      }();
      return msg;
    }();
    module.exports = $root;
    cc._RF.pop();
  }, {} ],
  test: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3750bbhpktGcKzCoUq3uxOA", "test");
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
    var LoopList_1 = require("./utils/LoopList");
    var Touchable_1 = require("./../script/utils/Touchable");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var test = function(_super) {
      __extends(test, _super);
      function test() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.list = null;
        _this.add = null;
        _this.substract = null;
        _this.showFrist = null;
        _this.showMid = null;
        _this.showLast = null;
        _this.amount = 10;
        _this.count = 0;
        return _this;
      }
      test.prototype.start = function() {
        var _this = this;
        this.list.initialize(this.onCreateItem.bind(this));
        this.add.clicked = function() {
          _this.count += _this.amount;
          console.log("set item count:", _this.count);
          _this.list.setItemCount(_this.count);
        };
        this.substract.clicked = function() {
          _this.count -= _this.amount;
          console.log("set item count:", _this.count);
          _this.list.setItemCount(_this.count);
        };
        this.showFrist.clicked = function() {
          _this.list.showItem(0, true);
        };
        this.showMid.clicked = function() {
          console.log("show item:", Math.floor(_this.count / 2));
          _this.list.showItem(Math.floor(_this.count / 2));
        };
        this.showLast.clicked = function() {
          _this.list.showItem(_this.count - 1, true);
        };
      };
      test.prototype.onCreateItem = function(list, idx) {
        console.log(this.name + " show idx: " + idx);
        var item = this.list.getNewItem();
        item.getComponent(cc.Label).string = "this\nis\n" + idx;
        var touchable = item.getComponent(Touchable_1.default);
        touchable && null == touchable.clicked && (touchable.clicked = function() {
          console.log("on clicked: " + item.itemIdx);
        });
        return item;
      };
      __decorate([ property(LoopList_1.default) ], test.prototype, "list", void 0);
      __decorate([ property(Touchable_1.default) ], test.prototype, "add", void 0);
      __decorate([ property(Touchable_1.default) ], test.prototype, "substract", void 0);
      __decorate([ property(Touchable_1.default) ], test.prototype, "showFrist", void 0);
      __decorate([ property(Touchable_1.default) ], test.prototype, "showMid", void 0);
      __decorate([ property(Touchable_1.default) ], test.prototype, "showLast", void 0);
      __decorate([ property(cc.Integer) ], test.prototype, "amount", void 0);
      test = __decorate([ ccclass ], test);
      return test;
    }(cc.Component);
    exports.default = test;
    cc._RF.pop();
  }, {
    "./../script/utils/Touchable": "Touchable",
    "./utils/LoopList": "LoopList"
  } ]
}, {}, [ "GameController", "Pay", "PayTest", "IDataModel", "UIBase", "checkout", "auto_notice", "auto_lishijilu", "auto_qianbao", "auto_quyu", "auto_shoujidenglu", "auto_wanfa", "auto_xiugaimingzi", "auto_xuanzhe", "auto_zhucejiemain", "auto_denglu", "auto_regret", "auto_victory", "auto_zhujiemianUI", "auto_confirmDialog", "auto_tips", "auto_tipsItem", "proto", "AccountModel", "BattleModel", "PayModel", "ServerPingModel", "SystemModel", "EventMng", "GameDataCenter", "UIMng", "Network", "Socket", "SocketDelegate", "test", "UIChangeName", "UIChoose", "UIHistory", "UIMobileLogin", "UIPayment", "UIRegistered", "UIRest", "UIRules", "PlayerControl", "UIBattle", "UILogin", "UIRegret", "UIVictory", "LoadingCircle", "TipsItem", "UIConfirmDialog", "UITips", "EventConst", "Log", "LoopList", "LoopListItem", "SingletonFactory", "Touchable", "UIHelp", "Utils", "ViewZOrder" ]);