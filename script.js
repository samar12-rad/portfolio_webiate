
var timeout;


const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true     
});


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
      });
    });
  }); 

function circleMousefollower(scalex, scaley){
    window.addEventListener("mousemove", function(dets){
        document.querySelector(".minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${scalex}, ${scaley})`;
    })
}


function firstPageAnim() {
    var tl = gsap.timeline();

    tl.from(".nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: 0.2
    })
    .from(".herofooter", {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}

function mouseSkew() {
    clearTimeout(timeout)
    var xprev = 0;
    var yprev = 0;
    var scalex = 1;
    var scaley = 1;

    window.addEventListener("mousemove", function(dets){

        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        scalex = gsap.utils.clamp(0.8,1.2,xdiff);
        scaley = gsap.utils.clamp(0.8,1.2,ydiff);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circleMousefollower(scalex, scaley);

        timeout = this.setTimeout( function(dets){
            document.querySelector(".minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        })
    })
    
}

 



mouseSkew();
circleMousefollower();
firstPageAnim();
