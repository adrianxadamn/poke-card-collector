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

  async getUserDocById({user_id}) {
    if (user_id) {
      const username = await this.db.collection('users').where('user_id', '==', user_id).get().then(data => data.docs[0].id);
      const info = await this.db.collection('users').doc(username).get().then((doc) => doc.data());
      return info;
    }
  };

  async getUserDocByUsername({username}) {
    if (username) {
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
      last_login: newUser.user.metadata.lastSignInTime.slice(0, -13),
      pokemons: []
    }).then(() => {
      return true;
    });
  }

  async updateUserLoginDate(userData, date) {
    return this.db.collection('users').doc(userData.username).update({
      login_date: date
    });
  }

  async addCompletionDate(userData, date) {
    return this.db.collection('users').doc(userData.username).update({
      completion_time: date
    });
  }

  async addCapturedPokemon(userData, setUserData, pokemon) {
    let capturedPokemon = [pokemon]; 
    if (userData.pokemons !== undefined) {
      capturedPokemon = [...userData.pokemons, pokemon].filter(pokemon => pokemon !== undefined);   
    } 
    this.db.collection('users').doc(userData.username).update({
      pokemons: capturedPokemon
    }).then((res) => {
      const newUserData = Object.assign({}, userData);
      newUserData.pokemons = capturedPokemon;
      setUserData(newUserData);
    });
  }

  // find way to make this real time
  async getRankings(username) {
    let users = await this.db.collection('users').get();
    users = users.docs.map(user => user.data());
    users.sort((a, b) => b.pokemons.length - a.pokemons.length);
    return users.findIndex((user) => user.username === username) + 1;
  }

  async getAllUsers(sortBy) {
    let users = await this.db.collection('users').get();
    users = users.docs.map(user => user.data());

    if (sortBy === 'rank') {
      users.sort((a, b) => b.pokemons.length - a.pokemons.length);
    }

    return users;
  }

  subscribeToNotifications({onSnapshot}){
    let notifications = this.db.collection('notifications').orderBy('time', 'desc').limit(50).onSnapshot(onSnapshot);
    return notifications;
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
