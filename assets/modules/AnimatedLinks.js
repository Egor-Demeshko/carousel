import { animate } from "motion";

export default class AnimatedLinks {
    /**флаг анимации, если true, то вправо, если false, то влево */
    direction = true;
    constructor({elementsClass, duration = 8}){
        // можно использоваться scrollWidth, scrollLeft, scrollLeftMax
        //переменный
        //DOM элемент, который скорлится. получаем по классы
        this.element = document.querySelector(elementsClass);
        if(!this.element){
            return null;
        }
        
        if(this.element.scrollWidth && this.element.clientWidth &&
            (this.element.scrollWidth - this.element.clientWidth) <= 0){
                return null;
            }
            
            if(this.isMobileDevice()) {
                return null;
            }
            
            //получаем количество элементов, чтобы пересчитывать скорость анимации
        this.slides = this.element.querySelectorAll(`${elementsClass}>*`).length;

        this.duration = + (this.slides / duration  * duration).toFixed(0);

        this.element.addEventListener("pointerenter", (e) => {
            if(e.target !== this.element) return;
            this?.pause();

            setTimeout( () => {
                this.scrollHandler = this.cancelAnimation.bind(this);
                this.element.addEventListener("scroll", this.scrollHandler, {once: true});
            }, 50);
            
        });

        this.element.addEventListener("pointerleave", (e) => {
            if(e.target !== this.element) return;

            if(this.status){        
                if(this.scrollHandler){
                    this.element.removeEventListener("scroll", this.scrollHandler, {once: true});
                }
            }

            setTimeout( () => {
                if(!this.status){
                    this.status = true;
                    this.createAnimation(this.duration);
                } else {
                    this.element.removeEventListener("scroll", this.cancelAnimation.bind(this), {once: true});
                    this?.play();
                } 
            }, 50);
        });

        this.createAnimation(this.duration);
    }


    //функция для создания анимации
                //проверить доступен ли DOM эдемент, если нет, то просто выйти
                //высчитать разницу между scrollLeftMax и scrollLeft
                //в зависимости от направления создаем анимацию, будем scrollLeft менять
                //в this.animate присваиваем значением вызова функции animaate
    createAnimation(duration){

        if(this.element && this.element instanceof HTMLElement){
            this.status = true;
            let startScrollLeft = this.element.scrollLeft;
            let scrollLeftMax = (this.element.scrollWidth - this.element.clientWidth) || window.innerWidth;
            
            let {pause, play, finished, cancel} = animate((progress) => {
                this.element.scrollLeft = this.direction ? startScrollLeft + (scrollLeftMax - startScrollLeft) * progress 
                : startScrollLeft - startScrollLeft * progress;
            }, {
                duration,
                easing: "ease-out",
            });
            
            finished.then( () => {
                
                if(this.status){
                    this.direction = !this.direction;
                    this.createAnimation(this.duration);
                }
            });
            this.cancel = cancel;
            this.play = play;
            this.pause = pause;
        }
    }

    cancelAnimation(){
        this.cancel();
        this.status = false;
        this.play = null;
        this.pause = null;
        this.cancel = null;
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }


    
}