import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/auth';
import firebaseConfig from './config';

class Firebase {
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
            app.firestore().settings({ experimentalForceLongPolling: true });
            // app.firestore.setLogLevel('debug');
        }
        this.db = app.firestore();
        this.storage = app.storage();
    }
}

const firebase = new Firebase();

export default firebase;