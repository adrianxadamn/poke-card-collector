import app from 'gatsby-plugin-firebase';

class Firebase {
	constructor() {
		this.auth = app.auth();
		this.db = app.firestore();
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password);
	}

	logout() {
		return this.auth.signOut()
	}

	async register(username, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password);
		return this.auth.currentUser.updateProfile({
			displayName: username
		});
	}

	authChange(user) {
		return this.auth.onAuthStateChanged(user);
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}
}

export default new Firebase()