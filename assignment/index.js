const handleBgColor = document.getElementById("backgroundToggle");
document.addEventListener("alpine:init", () => {
  Alpine.store("accordion", {
    tab: 0,
  });

  Alpine.data("accordion", (idx) => ({
    init() {
      this.idx = idx;
    },
    idx: -1,
    handleClick() {
      this.$store.accordion.tab =
        this.$store.accordion.tab === this.idx ? 0 : this.idx;
        
    },
    handleRotate() {
      return this.$store.accordion.tab === this.idx ? "rotate-180" : "";
    },
    handleToggle() {
      return this.$store.accordion.tab === this.idx
        ? `max-height: ${this.$refs.tab.scrollHeight}px`
        : "";
    },
  }));
});


// slider

 
document.addEventListener("DOMContentLoaded", function () {
  const carouselItems = document.querySelectorAll("[id^='carousel-item']");
  const carouselIndicators = document.querySelectorAll(
    "[id^='carousel-indicator']"
  );
  const prevButton = document.getElementById("data-carousel-prev");
  const nextButton = document.getElementById("data-carousel-next");

  let currentSlide = 0;
  let autoSlideInterval;

  // Show initial slide
  carouselItems[currentSlide].classList.remove("hidden");
  carouselIndicators[currentSlide].setAttribute("aria-current", "true");

  function goToSlide(index) {
    // Hide current slide and update indicator
    carouselItems[currentSlide].classList.add("hidden");
    carouselIndicators[currentSlide].setAttribute("aria-current", "false");

    // Show new slide and update indicator
    carouselItems[index].classList.remove("hidden");
    carouselIndicators[index].setAttribute("aria-current", "true");

    currentSlide = index;
  }

  function goToNextSlide() {
    const nextSlide = (currentSlide + 1) % carouselItems.length;
    goToSlide(nextSlide);
  }

  function goToPrevSlide() {
    const prevSlide =
      (currentSlide - 1 + carouselItems.length) % carouselItems.length;
    goToSlide(prevSlide);
  }

  function startAutoSlide() {
    autoSlideInterval = setInterval(goToNextSlide, 2000); // Change slide every 5 seconds
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  // Event listeners for navigation buttons
  nextButton.addEventListener("click", function () {
    stopAutoSlide();
    goToNextSlide();
    startAutoSlide();
  });

  prevButton.addEventListener("click", function () {
    stopAutoSlide();
    goToPrevSlide();
    startAutoSlide();
  });

  // Start auto slide on page load
  startAutoSlide();
});


var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  var elements = document.getElementsByClassName("typewrite");
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
  document.body.appendChild(css);
};
