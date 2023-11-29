(function controllscroll(){
    const element = document.querySelector('.header') || document.querySelector('.header-post');
    if(!element) return;

    function controllTopScroll(){
        if(window.scrollY > 0){
            element.classList.add('header--dark');
        } else {
            element.classList.remove('header--dark');
        }
    }

    const freezed = (() => {
        let freezed = false;
        return () => {
            if(freezed) return;
            freezed = true;
 
            setTimeout( () => {
                freezed = false;
                controllTopScroll();
            }, 100);
        }
    })();

    document.addEventListener("scroll", freezed);
})();