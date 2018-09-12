"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Timeline = function () {
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

        this.timelineInner = document.querySelector("#" + this.wrapperId + " .timeline");
        this.nodes = document.querySelectorAll("#" + this.wrapperId + " .tl-node");

        if (this.checkScreenSize()) {
          this.slidesWidth = 200 * this.nodes.length;
          var rangeX = this.slidesWidth - this.docWidth;

          this.wrapper.addEventListener("mousemove", this.mouseListen.bind(this)); //hover within wrapper (horizontal scrolling)
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
      timeline.appendChild(line);

      var nodeWrapper = document.createElement("div");
      nodeWrapper.classList.add('node-wrapper');
      timeline.appendChild(nodeWrapper);

      for (var i = 0; i < this.data.length; i++) {
        var tlNode = document.createElement("div");
        tlNode.classList.add('tl-node');
        nodeWrapper.appendChild(tlNode);

        var year = document.createElement("p");
        var yearText = document.createTextNode(this.data[i].year);
        year.appendChild(yearText);
        tlNode.appendChild(year);

        var dot = document.createElement("div");
        dot.classList.add('dot');
        tlNode.appendChild(dot);

        var data = document.createElement("div");
        data.classList.add('data');
        data.classList.add('left-triangle');
        tlNode.appendChild(data);

        var upper = document.createElement("div");
        data.classList.add('upper');
        data.appendChild(upper);

        var dataYear = document.createElement("h5");
        var dataYearText = document.createTextNode(this.data[i].year);
        dataYear.appendChild(dataYearText);
        upper.appendChild(dataYear);

        var title = document.createElement("h3");
        var titleText = document.createTextNode(this.data[i].title);
        title.appendChild(titleText);
        upper.appendChild(title);

        var image = document.createElement("img");
        image.src = this.data[i].image;
        upper.appendChild(image);
      }
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
      var mouseX = e.pageX,
          percentMouse = mouseX * 100 / this.docWidth,
          offset = percentMouse / 100 * this.slidesWidth - percentMouse / 200 * this.docWidth;

      this.timelineInner.style.transform = 'translate3d(' + -offset + 'px,0,0)';
    }
  }, {
    key: "nodeListen",
    value: function nodeListen() {
      var offset = this.getBoundingClientRect().left,
          content = this.children[2];
      if (offset > window.innerWidth / 2) {
        // lock pop up to the right
        content.style.left = 'auto';
        content.style.right = '-20px';
        content.classList.remove('left-triangle');
        content.classList.add('right-triangle');
      } else {
        // lock pop up to the left
        content.style.left = '-20px';
        content.style.right = 'auto';
        content.classList.add('left-triangle');
        content.classList.remove('right-triangle');
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
  }]);

  return Timeline;
}();

// UI

var DATA = [{
  year: '2004',
  title: 'This is a test title',
  image: 'https://picsum.photos/600/400'
}, {
  year: '2005',
  title: 'This is a test title 2',
  image: 'https://picsum.photos/600/400'
}, {
  year: '1990',
  title: 'This is a test title 3',
  image: 'https://picsum.photos/600/400'
}, {
  year: '2018',
  title: 'This is a test title 4',
  image: 'https://picsum.photos/600/400'
}, {
  year: '2005',
  title: 'This is a test title 2',
  image: 'https://picsum.photos/600/400'
}, {
  year: '1990',
  title: 'This is a test title 3',
  image: 'https://picsum.photos/600/400'
}, {
  year: '2018',
  title: 'This is a test title 4',
  image: 'https://picsum.photos/600/400'
}];

if (document.getElementById('timeline')) {
  var timeline = new Timeline('timeline', DATA);
  timeline.init();
}