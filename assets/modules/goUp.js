(function goUpButton(){
    var element = document.createElement("div");
    element.classList.add("goUp");
    element.setAttribute("aria-label", "перейти вверх страницы");
    element.setAttribute("tabindex", 0);
    setupElement();
    addRulingScripts();

    document.body.appendChild(element);
  
    function setupElement(){
      element.innerHTML = `<svg aria-label="hidden" viewBox="0 0 41 22" fill="none">
                                <path d="M3 19L20.5 3L38 19" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
                           </svg>`;
    }
  
    function addRulingScripts(){
      if(!element) return;
      element.addEventListener("click", ()=>{
        window.scroll({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      });
  
      document.addEventListener("scroll", ()=>{
        let windowHeight = window.innerHeight;
        let scrollTop = document.documentElement.scrollTop;
        let scrollRemain = document.documentElement.offsetHeight
                           - document.documentElement.scrollTop
                           - windowHeight;
  
        if(scrollTop > windowHeight/2){
          element.style.display = "flex";
        } else {
          element.style.display = "none";
        }
  
        if(scrollRemain < windowHeight/3){
          element.classList.add("stop-scroll");
        } else {
          element.classList.remove("stop-scroll");
        }
      });
    }
  })();