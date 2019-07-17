class Timeline {

  constructor(wrapper, data) {
    this.data = data;
    this.wrapperId = wrapper;
    this.wrapper = document.getElementById(wrapper);

    this.slidesWidth = 0;
    this.docWidth = window.innerWidth;

    this.timelineInner = null;
    this.nodes = null;
  }

  init() {
    if (this.data) {
      this.data = this.data.sort(this.sortNodesByDate('year')); //sort nodes by year

      this.injectHTML();

      this.timelineInner = document.querySelector(`#${this.wrapperId} .timeline`);
      this.nodes = document.querySelectorAll(`#${this.wrapperId} .tl-node`)

      if (this.checkScreenSize()) {
        this.slidesWidth = 200 * this.nodes.length;
        let rangeX = this.slidesWidth - this.docWidth;

        this.wrapper.addEventListener("mousemove", this.mouseListen.bind(this)); //hover within wrapper (horizontal scrolling)
        window.addEventListener("resize", this.windowSizeChange.bind(this)); //hover within wrapper (horizontal scrolling)
        this.initNodeListen(); //hover individual node
      }
    }
  }

  sortNodesByDate(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function(a, b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
    }
  }

  initNodeListen() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.nodes[i].addEventListener("mouseenter", this.nodeListen);
    }
  }

  mouseListen(e) {
    if (this.checkScreenSize()) {
      var mouseX = e.pageX,
        percentMouse = mouseX * 100 / this.docWidth,
        offset = percentMouse / 100 * this.slidesWidth - percentMouse / 200 * this.docWidth;

      this.timelineInner.style.transform = 'translate3d(' + -offset + 'px,0,0)'
    }
  };

  nodeListen() {
    let offset = this.getBoundingClientRect().left,
      content = this.children[2];
    if (offset > (window.innerWidth / 2)) {
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

  windowSizeChange() {
    if (!this.checkScreenSize()) {
      this.timelineInner.style.transform = 'translate3d(0,0,0)';
    }
  }

  checkScreenSize() {
    if (window.innerWidth > 800) {
      return true;
    } else {
      return false;
    }
  }

  injectHTML() {
    let timelineWrapper = document.createElement("section");
    timelineWrapper.classList.add('timeline-wrapper');
    this.wrapper.appendChild(timelineWrapper);

    let timeline = document.createElement("div");
    timeline.classList.add('timeline');
    timelineWrapper.appendChild(timeline);

    let line = document.createElement("div");
    line.classList.add('line');
    timelineWrapper.appendChild(line);

    let nodeWrapper = document.createElement("div");
    nodeWrapper.classList.add('node-wrapper');
    timeline.appendChild(nodeWrapper);

    for (let i = 0; i < this.data.length; i++) {
      let tlNode = document.createElement("div");
      tlNode.classList.add('tl-node');

      tlNode.innerHTML = `
        <p class="above-year">${this.data[i].year}</p>
        <div class="dot"></div>
        <div class="data left-triangle" style="left: -20px; right: auto;">
          <div class="upper">
            <h5>${this.data[i].year}</h5>
            <h3>${this.data[i].title}</h3>
          </div>
          <img src="${this.data[i].image}" alt="" />
        </div>`

      nodeWrapper.appendChild(tlNode);
    }
  }
}
