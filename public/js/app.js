'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var body = document.body,
    mainProjectsWrapper = document.querySelector('.projects'),
    mainProjectsItems = mainProjectsWrapper.querySelectorAll('.projects-item'),
    projectFrameDiv = document.querySelector('#projects-frame');
  var frame = projectFrameDiv.querySelector('iframe');
  mainProjectsItems.forEach(function (item) {
    item.addEventListener('mouseenter', function (event) {
      if (item.dataset.content) {
        var path = item.dataset.content.trim();
        projectFrameDiv.style.cssText += "opacity: 1;\n                  --scale--ratio: 1;\n                  transform: scale(1) translate(-0%, -100%);\n                  ";
        if (item.dataset.type == 'video') {
          frame.src = path;
          frame.video.controls = false;
        }
        if (item.dataset.type == 'img') {
          frame.src = '';
          projectFrameDiv.style.cssText += "background: url('".concat(path, "')center/contain;\n               \n                      ");
        }
      }
    });
    item.addEventListener('mouseleave', function (event) {
      projectFrameDiv.style.cssText += "transform: scale(0) translate(-0%, -100%); ";
    });
    mainProjectsWrapper.addEventListener('mousemove', function (event) {
      var x = event.pageX; // получаем координату X мыши
      var y = event.pageY; // получаем координату Y мыши
      body.style.cssText += "--mouse-x: ".concat(x, "px ; --mouse-y: ").concat(y, "px");
      projectFrameDiv.style.cssText += "left: ".concat(x + 40, "px;top: ").concat(y - 40, "px");
    });
  });
});
//# sourceMappingURL=app.js.map
