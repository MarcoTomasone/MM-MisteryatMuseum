function uploadImage(inpFile, imageScreen){
    //const inpFile = document.getElementById("background_image");
    //const imageScreen = document.getElementById("phoneImage")
    inpFile.addEventListener("change", function(){
        const file = this.files[0];
        if (file){
            const reader = new FileReader();
            reader.addEventListener("load", function(){
                imageScreen.setAttribute("src", this.result)
            });
            reader.readAsDataURL(file);
        }
    }) 
}

function deleteImage(f){
        document.getElementById("phoneImage").setAttribute("src", "../../img/Empty.png")
        f(true)
}

export {uploadImage, deleteImage}