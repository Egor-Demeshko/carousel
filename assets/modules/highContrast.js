import { animate } from "motion";

(function() {
   
    const cancelElement = document.getElementById('cancel');
    const HIGHCONTRAST = "highcontrast";
    const MAXWIDTH = 801;
    const hitBox = cancelElement.closest(".header-post__icon_wrapper") || cancelElement.closest(".header__icon_wrapper");
    /**@description Dom элемент, панель управления размером шрифта в режими для слабовидящих */
    let controlBar;
    let open = false;
  
  if (!cancelElement || !hitBox) {
    console.log("Нет контейнера для кнопки высокого констраста");
    return;
  }
  
  
  
    hitBox.addEventListener('click', () => {
          animation();
    });
    createControlBar();
    addEventListenerForControl();
    


    /**с помощью библиотеки motionOne анимируем svg элемент, изображающий
     * включение и выключение режима высокого констраста
     */
    function animation() {
        const duration = 0.5;
        if(!open){
            open = true;

            displayControlBar();
            animate(cancelElement, {
                transform: ['translate(200%, -200%)', 'translate(0, 0)'],
                opacity: [0.4, 1],
            }, {
                duration,
            });
            
            document.documentElement.classList.add(HIGHCONTRAST);
            if(controlBar){
                animate(controlBar, {
                opacity: [0, 1],
                transform: "translate(-50%, 110%)"
                }, {
                    duration
                });
            }
        } else {
            open = false;
            animate(cancelElement, {
                transform: ['translate(0, 0)', 'translate(200%, -200%)'],
                opacity: [1, 0.4],
            }, {
                duration,
            });
            document.documentElement.classList.remove(HIGHCONTRAST);
            if(controlBar){
                
                animate(controlBar, {
                opacity: [1, 0],
                transform: "translate(-50%, 0%)"
                }, {
                duration
                });
            }
            /**убираем контрольную панель из ДУМ, чтобы элемент не перекрывал родителя */
            setTimeout( () => controlBar.style.display = "none", duration * 1000);
        }
    }


    function createControlBar() {
        controlBar = document.createElement('div');
        controlBar.classList.add('highcontrast__control');
        controlBar.innerHTML = `
            <span id="fontSize">Выберите размер текста</span>
            <div class="highcontrast__buttons">
                <button data-size="standart" class="highcontrast__btn">стандарт</button>
                <button data-size="medium" class="highcontrast__btn">средний</button>
                <button data-size="big" class="highcontrast__btn">большой</button>
            </div>`;
        
        addToHeader(controlBar);        
    }


    function addToHeader(controlBar) {

        const header = hitBox.closest('header');
        if(!header) {
            console.error("Не удалось найти элемент для созданий меню HIGHCONTRAST");
            return;
        }

        header.append(controlBar);
    }

    function addEventListenerForControl(){
        if(!controlBar) return;

        controlBar.addEventListener('click', function clickContrastControll(e){
            const target = e.target;
            if(target.tagName !== 'BUTTON') return;
            const label = target.dataset.size;

            if(!label) return;

            switch(label){
                case 'standart':
                    document.documentElement.style.fontSize = '16px';
                    break;
                case 'medium':
                    document.documentElement.style.fontSize = '20px';
                    break;
                case 'big':
                    document.documentElement.style.fontSize = '24px';
                    break;

                default:
                    document.documentElement.style.fontSize = '16px';
            }
        });
    }


    function displayControlBar() {
        if(Math.max(window.innerWidth < MAXWIDTH || document.documentElement.offsetWidth < 801)){
            const buttons = controlBar.querySelector(".highcontrast__buttons"); 
            /*if(buttons){
                buttons.style.flexWrap = "wrap";
            }*/
            controlBar.style.display = "block";
        } else {
            controlBar.style.display = "block";
        }
    }
})();
