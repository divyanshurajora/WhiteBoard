let upload = document.querySelector("#upload");
upload.addEventListener("change", function (e) {
    // const reader = new FileReader();
    // reader.readAsDataURL(upload.files[0]);    
    //  using file Reader
    // reader.onload = function () {
    //     img.src = reader.result;
    // }
    let uploadInp = document.querySelector("input[type='file']");
    // uploadInp.click();
    // uploadInp.addEventListener("change", function(){
        let container = createBox();
        let file = uploadInp.files[0];
        let img = document.createElement("img");
        img.src = URL.createObjectURL(file);
        img.setAttribute("class", "upload-img");
        container.appendChild(img);
        uploadInp.value = null;
    // })
   
})
let download = document.querySelector("#Download");
download.addEventListener("click", function () {
    let a = document.createElement("a");
    a.href = board.toDataURL('image/png');
    a.download = 'file.png';
    a.click();
    a.remove();
}
)