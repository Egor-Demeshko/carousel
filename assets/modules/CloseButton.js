let closeButton = null;


//ДОДЕЛАТЬ 

export default class CloseButton{
    constructor(elementToClose){
        if(closeButton && closeButton instanceof HTMLButtonElement){
            return closeButton;
        }
        this.elementToClose = elementToClose;
        closeButton = document.createElement("button");
        closeButton.classList.add("close-button");
        closeButton.textContent = "Закрыть";
        return closeButton;
    }
}