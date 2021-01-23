function addImage(e){
    e.preventDefault()
    const formData = new FormData();
    formData.append("file", e.target.files[0])
    axios.post(`http://localhost:8000/addImage/${props.story.id}/bckgrnd`, formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    .then((response) => {
        setPlayerStyle({...playerStyle, ["backgroundImageUrl"]: `../../server/upload/${response.data}`})
    })
    .catch(error => {
        if (error.response.status === 500) {
            console.log("Errore con il server")
        } else {
            console.log(error)
        }
    })  
}

function deleteImage(fun, object){
    fun({...object, ["backgroundImageUrl"]: ""})
}

export { addImage, deleteImage }