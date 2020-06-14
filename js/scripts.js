function Nav(element) {
  this.element = element;
  this.menuVisible = this.element.classList.contains("visible");
  this.toggle = element.querySelector(".toggle");

  this.init = function() {
    this.bindToggleClick();
    this.bindItemClick();
    this.updateMenuVisibility();
  };

  this.bindToggleClick = function() {
    this.toggle.addEventListener('click', this.handleToggle);
  }.bind(this);

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

  this.bindItemClick = function() {
    this.element.querySelectorAll(".menu a").forEach(function(item) {
      item.addEventListener("click", this.handleItemClick);
    }.bind(this));
  }.bind(this);

  this.handleItemClick = function(event) {
    this.hideMenu();
  }.bind(this);

  this.hideMenu = function() {
    this.menuVisible = false;
    this.updateMenuVisibility();
  }.bind(this);

  this.init();
}

document.addEventListener("DOMContentLoaded", function() {
  var navElement = document.querySelector("#nav");
  new Nav(navElement);
});
