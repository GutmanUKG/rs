'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var body = document.body;
  //Все для появления всплывашок на проектах
  var mainProjectsWrapper = document.querySelector('.projects'),
    mainProjectsItems = mainProjectsWrapper.querySelectorAll('.projects-item'),
    projectFrameDiv = document.querySelector('#projects-frame'),
    video = document.createElement('video');
  var isShow = false;
  var videoList = [];
  var imgList = [];
  mainProjectsItems.forEach(function (item, idx) {
    if (item.dataset.type == 'video') {
      var obj = {
        id: idx,
        url: item.dataset.content
      };
      videoList.push(obj);
    }
    if (item.dataset.type == 'img') {
      var _obj = {
        id: idx,
        url: item.dataset.content
      };
      imgList.push(_obj);
    }
    item.addEventListener('mouseenter', function (event) {
      if (item.dataset.content) {
        isShow = true;
        if (isShow) {
          projectFrameDiv.classList.add('frame-animate');
        }
        if (item.dataset.type == 'video') {
          projectFrameDiv.style.cssText += "background: none";
          video.src = videoList[idx].url;
          video.autoplay = true;
          if (!projectFrameDiv.querySelector('video')) {
            projectFrameDiv.appendChild(video);
          }
        }
        if (item.dataset.type == 'img') {
          if (projectFrameDiv.querySelector('video')) {
            var v = projectFrameDiv.querySelector('video');
            v.remove();
          }
          imgList.forEach(function (item) {
            if (item.id == idx) {
              var path = item.url;
              projectFrameDiv.style.cssText += "background: url('".concat(path, "')center/contain;\n                            ");
            }
          });
        }
      }
    });
    item.addEventListener('mouseleave', function (event) {
      isShow = false;
      if (isShow == false) {
        projectFrameDiv.classList.remove('frame-animate');
      }
    });
    mainProjectsWrapper.addEventListener('mousemove', function (event) {
      var x = event.pageX; // получаем координату X мыши
      var y = event.pageY; // получаем координату Y мыши
      body.style.cssText += "--mouse-x: ".concat(x, "px ; --mouse-y: ").concat(y, "px");
      projectFrameDiv.style.cssText += "left: ".concat(x + 40, "px;top: ").concat(y - 40, "px");
    });
  });

  //*****************************************************

  function clearClass(items, classActive) {
    var len = items.length;
    for (var i = 0; i < len; i++) {
      items[i].classList.remove(classActive);
    }
  }
  //Слайдеры на главной
  $('.slider-image').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
  $('.slider-text').owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    vertical: true,
    animateIn: 'bounceInUp',
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 1
      }
    }
  });
  var sliderText = $('.slider-text'),
    sliderImg = $('.slider-image');
  $('.btn-next-multy').click(function () {
    sliderText.trigger('next.owl.carousel');
    $('.btn-prev-multy').addClass('active');
    sliderImg.trigger('next.owl.carousel');
  });
  $('.btn-prev-multy').click(function () {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    sliderText.trigger('prev.owl.carousel', [300]);
    sliderImg.trigger('prev.owl.carousel', [300]);
  });
  //*****************************************************
  //Акардеон на главной
  var accardionList = document.querySelector('.tabs-list'),
    accardionItem = accardionList.querySelectorAll('.tabs-item');
  accardionItem.forEach(function (item) {
    item.addEventListener('click', function () {
      item.classList.toggle('tabs-item--active');
    });
  });
  //*****************************************************
});
//# sourceMappingURL=app.js.map
