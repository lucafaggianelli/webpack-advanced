import firebase from 'firebase'

var storage = firebase.storage()
var imagesRef = storage.ref('images/')

export function uploadImage (file, name, oncomplete, onchange) {
  var uploadTask = imagesRef.child(name).put(file)

  uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    console.log('Upload is ' + progress + '% done')

    if (onchange) {
      onchange(progress, snapshot.state)
    }

    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED:
        console.log('Upload is paused')
        break
      case firebase.storage.TaskState.RUNNING:
        console.log('Upload is running')
        break
    }
  }, function (error) {
    console.log('Upload error', error)
    if (oncomplete) {
      oncomplete(error, null)
    }

    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break

      case 'storage/canceled':
        // User canceled the upload
        break

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break
    }
  }, function () {
    if (oncomplete) {
      oncomplete(null, uploadTask.snapshot.downloadURL)
    }
  })
}
