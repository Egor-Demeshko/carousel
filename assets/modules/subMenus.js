import {animate} from "motion";
import CloseButton from "./CloseButton";
import {foldersTreeButton} from "./markup/markups";

const MAXWIDTH = 801;
const subMenuClass = "sub-menu";
const menuItemWrapper = ".menu__main-item-wrapper";
const subMenuMobileClass = "sub-menu__mobile";
let isMobile = false;
let isMenuOpen = false;

(function subMenus(){
    //проверить, если мы имеем дело с мобильной версией, то тогда функцию не запускаем.
    if(Math.max(window.innerWidth, document.documentElement.offsetWidth) < MAXWIDTH){
        isMobile = true;
    }

    const mainMenu = document.querySelector(".menu__main");

    //если мы находимся на мобильной версии, то создаем слушатель click на mainMenu
    if(isMobile){
        generateSubMenuOpenButtons();
        //mainMenu.addEventListener("click", mobileClickOnMainMenu);
    } else {
        
        //если нет, то создаем слушатель pointerenter на каждый элемент меню
        const mainMenuItems = Array.from(mainMenu.querySelectorAll(".menu__main-item"));
        
        mainMenuItems.forEach(item => {
            item.addEventListener("pointerenter", pointerEntersMainMenu);
        });
        mainMenu.addEventListener("pointerleave", pointerLeavesMainMenu);
    }
    

    /**
     * Обрабатывает событие, когда указатель входит в главное меню.
     *
     * @param {Event} e - The event object for the pointerenter event.
     */
    function pointerEntersMainMenu(e){
        const target = e.target;
        
        if(target.classList.contains("menu__main-item") || target.closest(".menu__main-item")){
            disableActiveSubMenus(subMenuClass);

            /**проверяем есть ли сабменю у элемента */
            const subMenu = getSubMenu(target);
            if(!subMenu) return;

            //показываем subMenu, для этого подключаем класс .sub-menu--active. .sub-menu--active должна быть константой
            //<!!!!!!! subMenu.classList.add(subMenuActiveClass);
            animateSubMenuIn(subMenu);
            //на subMenu навещиваем слушатель события pointerLeave. он должен сработать один раз
            //в коллбеке мы убираем класс .sub-menu--active
            subMenu.addEventListener("pointerleave", function pointerLeavesSubMenu(){
                animateSubMenuOut(subMenu);
            }, {once: true});
            
        }
    }


    function pointerLeavesMainMenu(){
        const elementToHide = mainMenu.querySelector(".sub-menu--active");
        if(!elementToHide) return;
        animateSubMenuOut(elementToHide);
    }


    function createSubMenuButton(item){
        item.insertAdjacentHTML("beforeend", foldersTreeButton);
    }


    function closeSubMenu(e){
        const target = e.target;
        const duration = .4;

        if(!target.classList.contains("close-button")) return;

        e.stopPropagation();
        /**играем анимацию */
        const subMenu = getSubMenu(target);
        if(!subMenu) return;

        animate(subMenu, {
            opacity: [1, 0],
            y: ["-50%", "-30%"],
            x: ["-50%", "0%"],
            duration,
        });

        setTimeout(() => subMenu.classList.remove(subMenuMobileClass), duration * 1000);
    }


    function generateSubMenuOpenButtons(){
        const menuList = Array.from( mainMenu.querySelectorAll(menuItemWrapper) );

        menuList.forEach(item => {
            //проверить есть ли в элементе подменю
            if(item.querySelector(`.${subMenuClass}`)){
                //если есть создаем кнопку подменю, при клике на которой будет открываться подменю
                createSubMenuButton(item);
                
                let button = item.querySelector(".sub-menu__folders_tree");
                if(!button) return;

                button.addEventListener("click", mobileClickOnMainMenu);
            }
        })
    }

    /**
     * Обрабатывает клик по пункту меню когда мы находимся на мобильной версии.
     */
    function mobileClickOnMainMenu(e){
        const target = e.target;
        const menuElementWrapper = target.closest(menuItemWrapper);
        if(!menuElementWrapper) return;
        //нужно проверить, есть ли вложенные подменю
        
        const subMenu = getSubMenu(menuElementWrapper);
        if(!subMenu) return false;

        subMenu.classList.add(subMenuMobileClass);
        /**анимация от motionone */
        animate(subMenu, {
            opacity: [0, 1],
            x: ["-50%"],
            y: ["-30%", "-50%"],
            duration: 0.4,
        })
        
        const button = new CloseButton();
        if(button) subMenu.appendChild(button);

        button.addEventListener('click', closeSubMenu);
        
    }


    function getSubMenu(target){
        const menuItemWrapper = target.closest(".menu__main-item-wrapper");
            
        if(!menuItemWrapper) return false;
        /**проверяем есть ли сабменю у элемента */
        return menuItemWrapper.querySelector(".sub-menu");
    }


    function disableActiveSubMenus(className){
        let activeSubmenu = mainMenu.querySelector(`.${className}`);
        if(!activeSubmenu) return;

        animateSubMenuOut(activeSubmenu);
    }

    /**
     * Анимирует элемент подменю, устанавливая его отображение в 'block' и применяя
     * CSS-анимацию для плавного появления и перемещения элемента.
     *
     * @param {HTMLElement} subMenuElement - Элемент подменю, который необходимо анимировать.
     */
    function animateSubMenuIn(subMenuElement){
        //если меню уже открыто, то ничего не делаем
        if(isMenuOpen) return;
        subMenuElement.style.display = 'block';
        subMenuElement.classList.add("sub-menu--active");
        isMenuOpen = true;
        animate(subMenuElement,{
            opacity: [0, 1],
            y: ["-30%", "-50%"],
            duration: 0.4,
        });
    }

    function animateSubMenuOut(subMenuElement){
        const timeout = .4;
        
        if(!isMenuOpen) return;

        animate(subMenuElement,{
            opacity: [1, 0],
            y: ["-50%", "-30%"],
            duration: timeout,
        });

        setTimeout( () => {
            subMenuElement.style.display = 'none';
            subMenuElement.classList.remove("sub-menu--active");
            isMenuOpen = false;
            
        }, timeout * 1000);
    }


})()