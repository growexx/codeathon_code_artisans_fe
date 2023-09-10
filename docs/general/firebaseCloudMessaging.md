Boilerplate supports firebase cloud messaging setup.

# ***How to use the feature***

  

  

  

- First off, head over to the [Firebase Console](https://console.firebase.google.com/) and click the **“Add project”** option.

  

- Next, enter a name for the project.

  

- Next, we have to get the configuration details down for our project. So, click on the web icon in the dashboard.

  

- Then, enter a name for the app and click **Register app**.

  

- Next up, copy and store the configuration details on the next screen in a safe place. That will come in handy in the next step.

- Now, add following keys in env and use the values you copied earlier. 

1. REACT_APP_FIREBASE_API_KEY
2. REACT_APP_FIREBASE_AUTH_DOMAIN
3. REACT_APP_FIREBASE_PROJECT_ID
4. REACT_APP_FIREBASE_STORAGE_BUCKET
5. REACT_APP_FIREBASE_MESSAGING_SENDER_ID
6. REACT_APP_FIREBASE_APP_ID

- To get the value of following key, open the [Cloud Messaging](https://console.firebase.google.com/project/_/settings/cloudmessaging/) and select your project.
-  In the  **Web Push certificates**  tab, click  **Generate Key Pair**. The console displays a notice that the key pair was generated, and displays the public key string and date added.
- Copy the string and paste it as value of following key in env file.
7. REACT_APP_FIREBASE_VAPID_KEY



# ***To Test the feature***

1. Open the application and inspect it with console opened.
2. You will be prompted to get notifications. 
3. Allow the prompt and it will print client token in console.
4. Copy the token and keep it.
5. Now head to postman and make a post request on **"https://fcm.googleapis.com/fcm/send"** 
6. Headers of the request
	- Content-Type: application/json
	- Authorization: key=SERVER_KEY (get the server key from same page where you got the vapid key.  [Cloud Messaging](https://console.firebase.google.com/project/_/settings/cloudmessaging/) 
7.  Body of the request

   

     {
        
        "notification": {
        
        "title": "New notification",
        
        "body": "Notification Content",
        
        "click_action": "http://localhost:3000/features",
        
        "icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZZrv3_PEnkdOIZvnr0COONt3kL7rSSq623dB3fyLCgT7GARpReF26nPOre6JCLHKu7KQ&usqp=CAU"
        
        },
        
        "to": VALUE_YOU_COPIED_FROM_CONSOLE
        
        }

8. Hit send and look for notification in the react dashboard.
9. To test background notifications, close the app and hit send for request, it will trigger browser notification. 
10. You can also click on notifications, it will  land you on the app.

# ***To support firebase cloud messaging, following are the steps taken.***

  

1. Changes in **app.js** file

- Added following line in import

***import 'file-loader?name=firebase-messaging-sw.js!./firebase-messaging-sw';***

- Added following line at the end of the file.

***require('offline-plugin/runtime').install();***

  

2. Added one service worker file named ***firebase-messaging-sw.js*** in the app folder. ( app/firebase-messaging-sw.js )

3. Caching and service worker related changes in ***webpack.dev.babel.js*** for support of service worker in boilerplate.

  

   

         new OfflinePlugin({
        relativePaths: false,
        publicPath: '/',
        appShell: '/',
        safeToUseOptionalCaches: true,
        ServiceWorker: {
        events: true,
        entry: path.join(process.cwd(), 'app/firebase-messaging-sw.js'),
        },
        excludes: ['.htaccess'],
        caches: {},
        })

  

4. Firebase util file with messaging support. ( app/utils/firebase.js )