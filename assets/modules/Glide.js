import Glide from '@glidejs/glide';

export default function createGlide(options){
    const { selector, 
        perView = 1, 
        autoplay = 3000, 
        animationDuration = 400 ,
        gap = "10px",
        peek = {
            before: 0,
            after: 0
        },
        breakpoints = {
            
        },
        startAt = 0
    } = options;

    const slider = document.querySelector(selector);


    if (slider) {
        //Calculate slides, for dots
        let slides = slider.querySelectorAll(`${selector}__slide`);
        let dotsMarkup = "";

        if(slides && slides.length > 0){
            for (let i = 0; i < slides.length; i++) {
                dotsMarkup += `<button class="glide__bullet eliminate_btn" data-glide-dir="=${i}"><span></span></button>`;
            }

            let bullet = slider.querySelector(`${selector}__bullets`);
            if(bullet){
                bullet.insertAdjacentHTML("beforeend", dotsMarkup);
            }
        }

        const glide = new Glide(selector, {
            type: 'carousel',
            perView,
            autoplay,
            animationDuration, 
            gap,
            peek,
            breakpoints,startAt
        });
        glide.mount();
        return glide;
    }
}