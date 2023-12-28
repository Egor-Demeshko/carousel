/**
 * 
 * @param {HTMLElement} target - сама галлерея
 * @param {string} HOST 
 */
export async function galleryBuilder(target, createGlide, imageClicked){
    if(!target || !createGlide) return;
    const sliderTemplateId = "full_window_template";
    const sliderTemplate = document.getElementById(sliderTemplateId);
    if(!sliderTemplate) return;
    const sliderSlideTemplateId = "full_window_slide_template";  
    /**id элемент, UL, куда будут вставляться слайды. для галлереи */
    const placeToInsertSlides = "full_window__slides";
    const selector = ".photos__img_wrapper[data-image_id]"; 
    const cleanSlidePlace = `<section class="glide full_window-slider" id="full_window_template">
                                <div class="glide__bullets full_window__bullets" data-glide-el="controls[nav]">
                                </div>
                                <div class="glide__arrows full_window__arrows" data-glide-el="controls">
                                    <button class="glide__button_arrow eliminate_btn full_window__button_arrow" data-glide-dir="<">
                                        <i class="icon-left">&#xea44;</i>
                                    </button>
                                    <button class="glide__button_arrow eliminate_btn full_window__button_arrow" data-glide-dir=">">
                                        <i class="icon-right">&#xea42;</i>
                                    </button>
                                </div>
                                <div class="glide__track full_window__track" data-glide-el="track">
                                    <ul class="glide__slides full_window__slides">
                                    </ul>
                                </div>
                            </section>`;
    var glider = null;
    /**хранит номер слайда, который должен быть первый отображен. определяется по кликнутному imageWrapper[dataset] */
    var startSlide;

    //проходим по элементам, собираем id для запроса фотографий по api
    const images = target.querySelectorAll(selector);
    const imageIds = [];
    for(let i = 0; i < images.length; i++){
        const id = images[i].dataset.image_id;
        if(!id || isNaN(id)) continue;

        imageIds.push(id);
    }

    startSlide = getStartSlide(imageClicked);
    /**запускаем наполнений разметки галлереи только если есть id */
    if(imageIds.length > 0){
        const fullImagesData = await getImagesUrls(imageIds);
        let result = await populateGallery(sliderTemplateId, fullImagesData, placeToInsertSlides);
        if(result){
            showGallery();
            glider = createGlide({
                startAt: startSlide,
                selector: `#${sliderTemplateId}`,
                animamationDuration: 800,
                autoplay: false,
                perView: 1,
                gap: "0px",
            });
        }
    }


    async function getImagesUrls(imageIds){  
        /**строка запрос фотографий по id из Wordpress API */
        const  url = `/wp-json/wp/v2/media?include=${imageIds.join(',')}`;

        try{
            const response = await fetch(url, {
                'Content-Type:': "application/json",
            });

            if(response.ok){
                const data = await response.json();
                return extractImgUrls(data);
            }
        } catch(e) {
            console.error(e.message);
            return;
        }

        function extractImgUrls(data){
            const fullImages = [];

            /**формируем так массив для отображения, чтобы сохранить порядок, такой как \
             * был сформировал бэком для страницы и миниатюр */
            imageIds.forEach((id) => {
                id = parseInt(id);
                data.forEach((item) => {
                    if(item.id === id){
                        fullImages.push({
                            id: item.id,
                            alt_text: item?.alt_text,
                            img_name: item.title?.rendered,
                            url: item.media_details.sizes.full.source_url
                        });
                    };
                }); 
            });
            return fullImages;
        }
    }




    function showGallery(){
        const wrapper = sliderTemplate.closest('.full_window');
        if(!wrapper) return;
        wrapper.classList.add("full_window--active");
        wrapper.addEventListener("click", clickHandler);

        /**обрабатываем закрытие галлереи */
        function clickHandler(e){
            const target = e.target;
            const slidesPlace = sliderTemplate.querySelector(`.${placeToInsertSlides}`);  
            
            if(target.tagName === "I" || target.tagName === "IMG" || target.tagName === "BUTTON") return;
            wrapper.classList.remove("full_window--active");
            wrapper.removeEventListener("click", clickHandler);
            glider?.destroy();

            /**Glide автоматически не зачишает поле слайдов */
            if(slidesPlace){
                const slides = slidesPlace.closest(".full_window");
                /**сначала зачищали аттрибуты, стили и разметку внутри ul. но Glide на него вешает очень много событый
                 * и не чистит их.*/
                if(slides){
                    slides.innerHTML = cleanSlidePlace;
                }
            }
        }
    }

    async function populateGallery(sliderTemplateId, fullImagesData, placeToInsertSlides){
        const sliderTemplate = document.getElementById(sliderTemplateId);
        if(!sliderTemplate){
            console.error("Нет места для галлереи");
            return;
        }
        const slidesPlace = sliderTemplate.querySelector(`.${placeToInsertSlides}`);  
        if(!slidesPlace) return false;
        slidesPlace.innerHTML = ""; 

        for(let {id, alt_text, img_name, url} of fullImagesData){
            const li = document.createElement("li");
            li.className = "glide__slide full_window__slide";

            const img = document.createElement("img");
            img.src = url;
            img.alt = alt_text || '';
            img.id = id;
            img.title = img_name || "";

            li.appendChild(img);
            slidesPlace.appendChild(li);
        }
         return true;       
    }

    function getStartSlide(imageClicked){
        return imageIds.indexOf(imageClicked);
    }
}