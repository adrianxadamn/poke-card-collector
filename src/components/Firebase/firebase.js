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
    console.log("email:", email);
    console.log("password:", password);
    console.log("this.auth.signInWithEmailAndPassword(email, password):", this.auth.signInWithEmailAndPassword(email, password));
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await this.auth.signOut();
  }

  async getUserProfile({userId}) {
    return this.db.collection('users').where('userId', '==', userId).get();
  }

  async usernameAlreadyExist(username) {
    return await this.db.collection('users').doc(username).get().then(doc => doc.exists);
  }

  async register(username, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(email, password);
    return this.db.collection('users').doc(username).set({
      userId: newUser.user.uid
    });
  }

  async addCapturedPokemon(userId) {
    const user = await this.db.collection('users').where('userId', '==', userId).get();
    const username = user.docs[0].id;
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
