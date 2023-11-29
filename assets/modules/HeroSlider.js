import Glide from '@glidejs/glide';

class HeroSlider {
    constructor() {

      const slider = document.querySelector(".glide");


      if (slider) {

        //Calculate slides, for dots
        let slides = slider.querySelectorAll(".glide__slide");
        let dotsMarkup = "";

        for (let i = 0; i < slides.length; i++) {
          dotsMarkup += `<button class="glide__bullet" data-glide-dir="=${i}"></button>`;
        }

        let bullet = slider.querySelector(".glide__bullets");
        if(bullet){
          bullet.insertAdjacentHTML("beforeend", dotsMarkup);
        }

  
        // Actually initialize the glide / slider script
        var glide = new Glide(".glide", {
          type: "carousel",
          perView: 1,
          autoplay: 4000
        })
  
        glide.mount()
      } else {
        console.log("NO PLACE FOR SLIDER");
      }
    }
  }
  
  export default HeroSlider