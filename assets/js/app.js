'use strict'

document.addEventListener('DOMContentLoaded', ()=> {
    const body = document.body,
        mainProjectsWrapper = document.querySelector('.projects'),
        mainProjectsItems = mainProjectsWrapper.querySelectorAll('.projects-item'),
        projectFrameDiv = document.querySelector('#projects-frame');
    let frame = projectFrameDiv.querySelector('iframe');
    mainProjectsItems.forEach(item=>{
        item.addEventListener('mouseenter', (event) => {
            if(item.dataset.content){
                let path = item.dataset.content.trim();
                projectFrameDiv.style.cssText += `opacity: 1;
                  --scale--ratio: 1;
                  transform: scale(1) translate(-0%, -100%);
                  `
                if(item.dataset.type == 'video'){
                    frame.src = path
                    frame.video.controls = false
                }
                if(item.dataset.type == 'img'){
                    frame.src = ''
                    projectFrameDiv.style.cssText += `background: url('${path}')center/contain;
               
                      `
                }
            }
        })
        item.addEventListener('mouseleave', (event) => {
            projectFrameDiv.style.cssText += `transform: scale(0) translate(-0%, -100%); `
        })
        mainProjectsWrapper.addEventListener('mousemove', (event) =>{
            const x = event.pageX; // получаем координату X мыши
            const y = event.pageY; // получаем координату Y мыши
            body.style.cssText += `--mouse-x: ${x}px ; --mouse-y: ${y}px`
            projectFrameDiv.style.cssText += `left: ${x + 40}px;top: ${y - 40}px`
        })
    })
})