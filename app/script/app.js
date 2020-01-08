(function () {

  var hamburgerButton = document.querySelectorAll(".hamburger-button");
  var mainWrapper = document.querySelector(".main-wrapper");
  var downButton = document.querySelectorAll(".js-scroll-to-next-section");

  function openMenu() {
    mainWrapper.classList.toggle("open-menu")
  }

  for (var i = 0; i < hamburgerButton.length; i++) {
    hamburgerButton[i].addEventListener("click", openMenu);
  }


  function nextPage() {
    var element = event.target;

    if (!element.classList.contains('js-scroll-to-next-section')) {
      element = element.parentNode
    }

    var page = element.parentNode.nextElementSibling;
    console.log(page);
    if (page !== null) {
      page.scrollIntoView();
    }
  }

  for (var i = 0; i < downButton.length; i++) {
    downButton[i].addEventListener("click", nextPage);
  }

  var wrapper = document.querySelector(".main-wrapper")
  // var dotsNumber = wrapper.childElementCount;
  var dots = document.createElement("div");
  dots.className = "dots";
  wrapper.appendChild(dots);
  var sections = document.querySelectorAll('.section');
  var dotsNumber = sections.length;

  console.log(dotsNumber)
  console.log(dot)
  for (var i = 0; i < dotsNumber; i++) {

    var dot = document.createElement("div");
    dot.className = "dot"
    // dot.addEventListener('click', goToSection.bind(null, sections[i]));
    document.querySelector(".dots").appendChild(dot);
  }

  var allDot = dots.querySelectorAll(".dot");
  console.log(allDot)

  // for (var i = 0; i < allDot.length; i++) {
  //   allDot[i].addEventListener("click", function () {
  //     var current = document.querySelectorAll(".active");
  //     if (current.length > 0) {

  //       current[0].className = current[0].className.replace("active", "");
  //     }

  //     this.className += " active"
  //   })
  // }
  // function goToSection(section) {
  //   section.scrollIntoView();
  // }

  function toggleDotClass(event, index) {
    var curTarget = event.currentTarget;
    var activeClass = 'active';

    if (curTarget.classList.contains(activeClass)) return;

    sections[index].scrollIntoView();

    for (var i = 0; i < allDot.length; i++) {
      if (allDot[i].classList.contains(activeClass)) {
        allDot[i].classList.remove(activeClass);
      }
    }
    curTarget.classList.add(activeClass);
  }

  function detectSectionScroll() {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    var dotsPosition = dots.offsetTop + dots.offsetHeight;
    console.log(scrollTop + dotsPosition);
    
  }

  // window.addEventListener('scroll', detectSectionScroll);
  var bindEvent = function bindEvent(i) {
    allDot[i].addEventListener('click', function(event) {
      toggleDotClass(event, i);
    })
  }
  for (let i = 0; i < allDot.length; i++) {
    bindEvent(i);
  }
  // allDot.forEach((dot, index) => dot.addEventListener('click', (event) => toggleDotClass(event, index)));



})();