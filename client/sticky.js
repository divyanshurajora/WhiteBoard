function createSticky() {
    
    let textarea = document.createElement("textarea");
    
    let container = createBox();
    container.appendChild(textarea);
    
    textarea.setAttribute("class", "textarea");

}