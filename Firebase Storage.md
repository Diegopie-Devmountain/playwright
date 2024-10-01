# Firebase Storeage

## Docs

[Upload Images / Files to Firebase In React - Firebase V9 File Upload Tutorial](https://www.youtube.com/watch?v=YOAeBSCkArA&t=744s&ab_channel=PedroTech)

[Get started with Cloud Storage on Web  |  Cloud Storage for Firebase](https://firebase.google.com/docs/storage/web/start)

## Create an Account

[Firebase Console](https://console.firebase.google.com/)

1. Create a New Project
    1. Name it whatEver
    2. You can turn on analytics if you want
    3. Continue after provision
    4. Under Build, we can access the Storage console
    5. Click Get Started
    6. Start in Production Mode
    7. Select Region, wait for bucket to provision
    8. Navigate to rules,
        1. Change allow read, write: if false; to true

2. Config Firebase
    1. create folder services/firebaseConfig.js
    2. In FB console, got to project settings
        1. Scroll to Your Apps
        2. Select Web App
            1. Name app
            2. Do not do hosting
            3. Register App
        3. Install firebase
        4. Copy code into firebaseConfig.js
        5. Set up env vars (in Vite 🙄)
            1. [Vite Env Rules](https://vitejs.dev/guide/env-and-mode.html)
    3. import {getStorage, ref} from "firebase/storage";
    4. export const storage = getStorage(firebaseApp);

3. Setup JSX
    1. `<input type='file' accept=".png, .jpg, .heic" />`
    2. set up state for this (the form should be set up until the preventDefault
        1. Set up validator for no img
    3. Import { storage }

4. Set Up Refs
    1. Import ref
    2. create a var
        1. *Ref takes to args(arg1 = ourFBStorage, arg2 = imgPathForFBConsole)*
        2. const imgRef = ref(storage, `images/`)
            1. This is saying we want a that we want to user our FB storage bucket to create a file in the images older of our FB bucket
        3. We can use the file name and UUID to create a unique name in our bucket
            1. [UUID NPM](https://www.npmjs.com/package/uuid)

5. Upload Image
    1. *`// uploadBytes takes to args(where to store in bucket: ref, imageToUpload)`*
    2. `uploadBytes(imgRef, userImg).then(snapshot => {});`

6. Get FB URL
    1. *`// getDownloadURL takes one arg (refToQuery)`*
    2. `getDownloadURL(imgRef).then(url ⇒ {})`

7. Make req to api to create movie

[File Input | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file)