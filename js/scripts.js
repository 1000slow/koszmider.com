function Nav(element) {
  this.element = element;
  this.menuVisible = this.element.classList.contains("visible");
  this.toggle = element.querySelector(".toggle");

  this.init = function() {
    this.toggle.addEventListener('click', this.handleToggle);
    this.updateMenuVisibility();
  };

  this.handleToggle = function() {
    this.menuVisible = !this.menuVisible;
    this.updateMenuVisibility();
  }.bind(this);

  this.updateMenuVisibility = function() {
    if (this.menuVisible) {
      document.documentElement.classList.add("menu-visible");
      document.body.classList.add("menu-visible");
      this.element.classList.add("visible");
    } else {
      this.element.classList.remove("visible");
      document.body.classList.remove("menu-visible");
      document.documentElement.classList.remove("menu-visible");
    }
  }.bind(this);

  this.init();
}

function Gallery(element) {
  this.element = element;
  this.rotationInterval = 4000;
  this.touchEndResumeDelay = 200;
  this.paused = false;
  this.currentOffset = 0;
  this.resizeDebounce = 200;

  this.init = function() {
    this.bindTouch();
    this.bindResize();
    this.scheduleRotation(this.rotationInterval - 1000);
  }.bind(this);

  this.bindTouch = function() {
    this.element.addEventListener("contextmenu", this.handleContextMenu, false);
    this.element.addEventListener("touchstart", this.handleTouchStart, false);
    this.element.addEventListener("touchmove", this.handleTouchMove, false);
    this.element.addEventListener("touchend", this.handleTouchEnd, false);
    this.element.addEventListener("mousedown", this.handleTouchStart);
    this.element.addEventListener("mouseup", this.handleTouchEnd);
    this.element.addEventListener("mousemove", this.handleTouchMove, false);
  }.bind(this);

  this.handleContextMenu = function (e) {
    e.preventDefault();
  }.bind(this);

  this.handleTouchStart = function(e) {
    this.touchMoved = false;

    clearTimeout(this.rotationTimeout);
  }.bind(this);

  this.handleTouchMove = function(e) {
    this.touchMoved = true;
  }.bind(this);

  this.handleTouchEnd = function(e) {
    this.scheduleRotation(this.touchMoved ? this.rotationInterval / 2 : this.touchEndResumeDelay);
  }.bind(this);

  this.bindResize = function() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("orientationchange", this.handleResize);
  }.bind(this);

  this.handleResize = function() {
    clearTimeout(this.handleResizeTimeout);
    this.handleResizeTimeout = setTimeout(this.updatePositions, this.resizeDebounce);
  }.bind(this);

  this.scheduleRotation = function(delay) {
    clearTimeout(this.rotationTimeout);
    this.rotationTimeout = setTimeout(this.rotate, delay || this.rotationInterval);
  }.bind(this);

  this.rotate = function() {
    this.scheduleRotation();
    this.rotateOffset();
    this.updatePositions();
  }.bind(this);

  this.rotateOffset = function() {
    if (this.currentOffset == this.items().length - 1) {
      this.currentOffset = 0;

      return;
    }

    this.currentOffset += 1;
  };

  this.updatePositions = function() {
    this.items().forEach(function(el, i) {
      if (this.visibleElementsCount() == this.items().length) {
        el.style.transform = "translate3d(0, 0, 0)";
        el.style.opacity = 1;

        return;
      }

      var position = i - this.currentOffset;

      if (position == this.items().length - 1) {
        position = -1;
      } else if (position < -1) {
        position = position + this.items().length;
      }

      var shift = position - i;


      if (position == -1 || position > this.visibleElementsCount() - 1) {
        el.style.opacity = 0;
        el.style.transform = "translate3d(" + shift * 100 + "%, 0, 0)";
      } else {
        el.style.opacity = 1;
        el.style.transform = "translate3d(" + shift * 100 + "%, 0, 0)";
      }
    }.bind(this));
  }.bind(this);

  this.items = function() {
    return Array.prototype.slice.call(
      this.element.querySelectorAll(".item")
    );
  }.bind(this);

  this.positionInterval = function() {
    return 100 / this.visibleElementsCount();
  }.bind(this);

  this.visibleElementsCount = function() {
    return this.emptyElements().filter(function(el) {
      return window.getComputedStyle(el).display != "none";
    }).length;
  }.bind(this);

  this.emptyElements = function() {
    return Array.prototype.slice.call(
      this.element.querySelectorAll(".empty")
    );
  }.bind(this);

  this.init();
}

document.addEventListener("DOMContentLoaded", function() {
  var navElement = document.querySelector("#nav");
  new Nav(navElement);

  var galleryElement = document.querySelector("#featured-gallery");
  if (galleryElement) {
    new Gallery(galleryElement);
  }
});
