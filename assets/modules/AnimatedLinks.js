import { animate } from "motion";

export default class AnimatedLinks {
    /**флаг анимации, если true, то вправо, если false, то влево */
    direction = true;
    constructor({elementsClass}){
        // можно использоваться scrollWidth, scrollLeft, scrollLeftMax
        //переменный
        //DOM элемент, который скорлится. получаем по классы
        this.element = document.querySelector(elementsClass);
        if(!this.element){
            return null;
        }

        if(this.element.scrollWidth && this.element.clientWidth &&
            (this.element.scrollWidth - this.element.clientWidth) <=0){
                return null;
        }
        
        if(this.isMobileDevice()) {
            return null;
        }

        //получаем количество элементов, чтобы пересчитывать скорость анимации
        this.slides = this.element.querySelectorAll(`${elementsClass}>*`).length;
        console.log({slides: this.slides});
        
        this.element.addEventListener("pointerenter", () => {
            
            if(this.cancel) {
                this.cancel();
                this.cancel = null;
                this.status = null;
            }
        });

        this.element.addEventListener("pointerleave", () => {
            if(this.status) return;

            this.createAnimation();
        });

        this.createAnimation();
    }


    //функция для создания анимации
                //проверить доступен ли DOM эдемент, если нет, то просто выйти
                //высчитать разницу между scrollLeftMax и scrollLeft
                //в зависимости от направления создаем анимацию, будем scrollLeft менять
                //в this.animate присваиваем значением вызова функции animaate
    createAnimation(){

        if(this.element && this.element instanceof HTMLElement){
            this.status = true;
            let startScrollLeft = this.element.scrollLeft;
            let scrollLeftMax = (this.element.scrollWidth - this.element.clientWidth) || window.innerWidth;
            
            let {stop, finished} = animate((progress) => {
                this.element.scrollLeft = this.direction ? startScrollLeft + (scrollLeftMax - startScrollLeft) * progress 
                : startScrollLeft - startScrollLeft * progress;
            }, {
                duration: 6,
            });
            
            finished.then( () => {
                if(this.status){
                    this.direction = !this.direction;
                    this.createAnimation();
                }
            });
            this.cancel = stop;
        }
    }

    isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
}