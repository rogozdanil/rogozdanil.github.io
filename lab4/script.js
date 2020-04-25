function setDataToServer() {
    const file = document.getElementById('doc').files[0];
    const uploadTask = firebase.storage().ref('fullData/' + file.name).put(file);

uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, 
  function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:{
                console.log('Upload is paused');
                break;
            }
            case firebase.storage.TaskState.RUNNING:{ 
                console.log('Upload is running');
                break;
            }
        }   
    }, function(error) {
        switch (error.code) {
            case 'storage/unauthorized': {
                console.log("User doesn't have permission to access the object");
                break;
            }
            case 'storage/canceled': {
                console.log("User canceled the upload");
                break;
            }
            case 'storage/unknown': {
                console.log("Unknown error occurred, inspect error.serverResponse");
                break;
            }
        }
    }, function() {
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            firebase.database().ref('fullData/').push({
                Surname: surname.value,
                Name: name.value,
                Patronymic: patronymic.value,
                Phone: phone.value,
                Email: email.value,
                DocumentPhoto: documentPhotoURL
            }, function(error) {
                if (error) {
                    alert("Систему не обманишь! Загрузи документ удостоверяющий личность!!!")
                } else {
                    alert("Не самая твоя лучшая фотка, но пойдёт")
                }
             });
            console.log('File available at', photoURL);
        });
    });    
}