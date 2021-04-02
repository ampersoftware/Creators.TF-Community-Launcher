"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickPlayMission = exports.QuickPlayMissionCategory = exports.QuickPlayMapCategory = exports.QuickPlayGameType = exports.QuickPlayConfig = void 0;
var remote_file_loader_1 = __importStar(require("./remote_file_loader"));
var QuickPlayConfigLoader = (function (_super) {
    __extends(QuickPlayConfigLoader, _super);
    function QuickPlayConfigLoader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.localFileName = "quickplay.json";
        _this.remoteUrls = [
            "https://localhost"
        ];
        return _this;
    }
    QuickPlayConfigLoader.instance = new QuickPlayConfigLoader();
    return QuickPlayConfigLoader;
}(remote_file_loader_1.default));
var QuickPlayConfig = (function (_super) {
    __extends(QuickPlayConfig, _super);
    function QuickPlayConfig() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return QuickPlayConfig;
}(remote_file_loader_1.RemoteFile));
exports.QuickPlayConfig = QuickPlayConfig;
var QuickPlayGameType = (function () {
    function QuickPlayGameType() {
    }
    return QuickPlayGameType;
}());
exports.QuickPlayGameType = QuickPlayGameType;
var QuickPlayMapCategory = (function () {
    function QuickPlayMapCategory() {
    }
    return QuickPlayMapCategory;
}());
exports.QuickPlayMapCategory = QuickPlayMapCategory;
var QuickPlayMissionCategory = (function () {
    function QuickPlayMissionCategory() {
    }
    return QuickPlayMissionCategory;
}());
exports.QuickPlayMissionCategory = QuickPlayMissionCategory;
var QuickPlayMission = (function () {
    function QuickPlayMission() {
    }
    return QuickPlayMission;
}());
exports.QuickPlayMission = QuickPlayMission;
exports.default = QuickPlayConfigLoader;
//# sourceMappingURL=quickplay_config_loader.js.map