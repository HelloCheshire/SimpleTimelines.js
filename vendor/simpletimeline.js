"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Timeline =
/*#__PURE__*/
function () {
  function Timeline(wrapper, data) {
    _classCallCheck(this, Timeline);

    this.data = data;
    this.wrapperId = wrapper;
    this.wrapper = document.getElementById(wrapper);
    this.slidesWidth = 0;
    this.docWidth = window.innerWidth;
    this.timelineInner = null;
    this.nodes = null;
  }

  _createClass(Timeline, [{
    key: "init",
    value: function init() {
      if (this.data) {
        this.data = this.data.sort(this.sortNodesByDate('year')); //sort nodes by year

        this.injectHTML();
        this.timelineInner = document.querySelector("#".concat(this.wrapperId, " .timeline"));
        this.nodes = document.querySelectorAll("#".concat(this.wrapperId, " .tl-node"));

        if (this.checkScreenSize()) {
          this.slidesWidth = 200 * this.nodes.length;
          var rangeX = this.slidesWidth - this.docWidth;
          this.wrapper.addEventListener("mousemove", this.mouseListen.bind(this)); //hover within wrapper (horizontal scrolling)

          window.addEventListener("resize", this.windowSizeChange.bind(this)); //hover within wrapper (horizontal scrolling)

          this.initNodeListen(); //hover individual node
        }
      }
    }
  }, {
    key: "sortNodesByDate",
    value: function sortNodesByDate(property) {
      var sortOrder = 1;

      if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }

      return function (a, b) {
        var result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
        return result * sortOrder;
      };
    }
  }, {
    key: "initNodeListen",
    value: function initNodeListen() {
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].addEventListener("mouseenter", this.nodeListen);
      }
    }
  }, {
    key: "mouseListen",
    value: function mouseListen(e) {
      if (this.checkScreenSize()) {
        var mouseX = e.pageX,
            percentMouse = mouseX * 100 / this.docWidth,
            offset = percentMouse / 100 * this.slidesWidth - percentMouse / 200 * this.docWidth;
        this.timelineInner.style.transform = 'translate3d(' + -offset + 'px,0,0)';
      }
    }
  }, {
    key: "nodeListen",
    value: function nodeListen() {
      var offset = this.getBoundingClientRect().left,
          content = this.children[2];

      if (offset > window.innerWidth / 2) {
        // lock modal to the right
        content.style.left = 'auto';
        content.style.right = '-20px';
        content.classList.remove('left-triangle');
        content.classList.add('right-triangle');
      } else {
        // lock modal to the left
        content.style.left = '-20px';
        content.style.right = 'auto';
        content.classList.add('left-triangle');
        content.classList.remove('right-triangle');
      }
    }
  }, {
    key: "windowSizeChange",
    value: function windowSizeChange() {
      if (!this.checkScreenSize()) {
        this.timelineInner.style.transform = 'translate3d(0,0,0)';
      }
    }
  }, {
    key: "checkScreenSize",
    value: function checkScreenSize() {
      if (window.innerWidth > 800) {
        return true;
      } else {
        return false;
      }
    }
  }, {
    key: "injectHTML",
    value: function injectHTML() {
      var timelineWrapper = document.createElement("section");
      timelineWrapper.classList.add('timeline-wrapper');
      this.wrapper.appendChild(timelineWrapper);
      var timeline = document.createElement("div");
      timeline.classList.add('timeline');
      timelineWrapper.appendChild(timeline);
      var line = document.createElement("div");
      line.classList.add('line');
      timelineWrapper.appendChild(line);
      var nodeWrapper = document.createElement("div");
      nodeWrapper.classList.add('node-wrapper');
      timeline.appendChild(nodeWrapper);

      for (var i = 0; i < this.data.length; i++) {
        var tlNode = document.createElement("div");
        tlNode.classList.add('tl-node');
        tlNode.innerHTML = "\n        <p class=\"above-year\">".concat(this.data[i].year, "</p>\n        <div class=\"dot\"></div>\n        <div class=\"data left-triangle\" style=\"left: -20px; right: auto;\">\n          <div class=\"upper\">\n            <h5>").concat(this.data[i].year, "</h5>\n            <h3>").concat(this.data[i].title, "</h3>\n          </div>\n          <img src=\"").concat(this.data[i].image, "\" alt=\"\" />\n        </div>");
        nodeWrapper.appendChild(tlNode);
      }
    }
  }]);

  return Timeline;
}();