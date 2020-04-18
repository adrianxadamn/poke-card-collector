import firebaseConfig from "./config";

class Firebase {
  constructor(app) {
    if(!firebaseInstance) {
      app.initializeApp(firebaseConfig);

      this.auth = app.auth();
      this.db = app.firestore();
      this.functions = app.functions();
      this.storage = app.storage();
    }
  }

  async login({email, password}) {
    const success = await this.auth.signInWithEmailAndPassword(email, password);
    const username = await this.db.collection('users').where('user_id', '==', success.user.uid).get().then(data => data.docs[0].id);
    return this.db.collection('users').doc(username).update({
      last_login: success.user.metadata.lastSignInTime.slice(0, -13)
    }).then(() => {
      return true;
    });
  }

  async logout() {
    await this.auth.signOut();
  }

  async getUserProfile({user_id}) {
    return this.db.collection('users').where('user_id', '==', user_id).get();
  }

  async usernameAlreadyExist(username) {
    return this.db.collection('users').doc(username).get().then(doc => doc.exists);
  }

  async getUserDoc({user_id}) {
    if (user_id) {
      const username = await this.db.collection('users').where('user_id', '==', user_id).get().then(data => data.docs[0].id);
      const info = await this.db.collection('users').doc(username).get().then((doc) => doc.data());
      return info;
    }
  };

  async register(username, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db.collection('users').doc(username).set({
      user_id: newUser.user.uid,
      username: username,
      creation_time: newUser.user.metadata.creationTime.slice(0, -13),
      last_login: newUser.user.metadata.lastSignInTime.slice(0, -13)
    }).then(() => {
      return true;
    });
  }

  async addCapturedPokemon(user_id) {
    const username = await this.db.collection('users').where('user_id', '==', user_id).get().then(data => data.docs[0].id );
    return this.db.collection('users').doc(username).update({
      pokemon: 'test'
    });
  }
}

let firebaseInstance;

function getFirebaseInstance(app) {
  if(!firebaseInstance && app){
    firebaseInstance = new Firebase(app);
    return firebaseInstance;
  }else if(firebaseInstance){
    return firebaseInstance
  }else{
    return null;
  }
}

export default getFirebaseInstance;
