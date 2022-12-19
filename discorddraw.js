const { existsSync } = require("fs");
const { exec } = require("child_process");
const nodeModulesPath = join(__dirname,"node_modules");

async function installDeps() {
  return new Promise((res) => {
    exec("npm install", { cwd: __dirname }, (err, stdout, stderr) => {
      if (err) {
        res();
      }
      res();
    })
  })
}

if (!existsSync(nodeModulesPath)) {
  installDeps().then(() => {
    setTimeout(() => {
      powercord.pluginManager.remount(__dirname);
    }, 1000)
  })
}
var Plugin = require("powercord/entities").Plugin;
var getModule = require("powercord/webpack").getModule;
var inject = require("powercord/injector").inject;
var uninject = require("powercord/injector").uninject;
var findInReactTree = require("powercord/util").findInReactTree;

var Button = getModule(["Button", "Menu"], false).Button;
var Menu = getModule(["Button", "Menu"], false).Menu;
var openModal = getModule(["open"], false).open;

var canvasModule = getModule(function (m) {
  return m.default && m.default.displayName === "Canvas";
}, false);

var MyPlugin = (function (_Plugin) {
  _inherits(MyPlugin, _Plugin);

  function MyPlugin() {
    _classCallCheck(this, MyPlugin);

    if (_Plugin != null) {
      _Plugin.apply(this, arguments);
    }
  }

  _createClass(MyPlugin, [{
    key: "startPlugin",
    value: function startPlugin() {
      var _this = this;

      this.injectMenuButton();
    }
  }, {
    key: "pluginWillUnload",
    value: function pluginWillUnload() {
      uninject("my-plugin-button");
    }
  }, {
    key: "injectMenuButton",
    value: function injectMenuButton() {
      var _this2 = this;

      var ChannelEditor = getModule(["ChannelTextAreaContainer"]);
      inject("my-plugin-button", ChannelEditor, "default", function (args, res) {
        res.props.children.unshift(React.createElement(Button, {
          icon: "ArrowRight",
          onClick: function onClick() {
            return _this2.openDrawingWindow();
          }
        }));
        return res;
      });
    }
  }, {
    key: "openDrawingWindow",
    value: function openDrawingWindow() {
      openModal(function (_ref) {
        var onClose = _ref.onClose;

        var _useState = useState("#000000"),
            currentColor = _useState[0],
            setCurrentColor = _useState[1];

        var _useState2 = useState(false),
            isEraser = _useState2[0],
            setIsEraser = _useState2[1];

        var _useState3 = useState(null),
            canvasRef = _useState3[0],
            setCanvasRef = _useState3[1];

        // rest of the function goes here
      });
    }
  }]);

  return MyPlugin;
})(Plugin);
