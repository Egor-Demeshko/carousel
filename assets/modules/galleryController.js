import {HOST} from '/assets/modules/CONST.js';

export async function createGalleryController(createGlide){
    const GALLARIES_SELECTOR = '[data-gallery="ckror"]';
    var galleryBuilder = null;

    //будем отдельно грузить скрипт для фотогаллерии в тот момент как он будет нужен
    //при запуске этого, управляюшего сприпта galleryController 
    //сприпта мы по GALARRIES_SELECTOR получаем все галлереи. список.
    const allGallaries = document.querySelectorAll(GALLARIES_SELECTOR);
    if(!allGallaries) return;
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };
    const observer = new IntersectionObserver( loadScriptForGallery, observerOptions );
    
    for(let i = 0; i < allGallaries.length; i++){
        const element = allGallaries[i];
        observer.observe(element);
    }


    //вешаем событие interactionObserver
    //в тот момент когда галлерея будет в области видимости мы будем начинать создавать компонент галлереи.
    //получить из темлпатов путь загрузки скрипта
    //скрипт для создания галлереи грузим один раз, когда какая-либо галлерея попадает в области зрения.


    function loadScriptForGallery(entries){
        
        entries.forEach( async (entry) => {
            if(!entry.isIntersecting) return;
            isLinkStylesElementNeeded();

            const target = entry.target;
            if(!galleryBuilder){
                try{
                    const module = await import('./galleryBuilder.js');
                    galleryBuilder = module.galleryBuilder;
                } catch(e) {
                    console.error(e.message);
                }
            } 
            if(target.dataset.active) return;

            target.addEventListener("click", (e) => {
                const clickTarget = e.target;
                const imageWrapper = clickTarget.closest(".photos__img_wrapper");
                var imageClicked = null;
                if(imageWrapper){
                    imageClicked = imageWrapper.dataset.image_id;
                }

                if(clickTarget.classList.contains("photos__img_wrapper")){
                    galleryBuilder(target, createGlide, imageClicked); 
                }
            });

            target.dataset.active = true;
        });
    }


    function isLinkStylesElementNeeded(){
        const fullGalleryId = "ckror_full_gallery";
        const route = `${HOST}/assets/css/elements/full_window_gallery/full_window.css`;
        if(document.getElementById(fullGalleryId)) return;
        const link = document.createElement("link");

        link.rel = "stylesheet";
        link.href = route;
        link.setAttribute("id", fullGalleryId);

        document.head.append(link);
    }

};

