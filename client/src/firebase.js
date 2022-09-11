import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyC_Ibqycxpr8dH5-TK9LbD6XZyaWEOLVhs',
	authDomain: 'playtube-f65f3.firebaseapp.com',
	projectId: 'playtube-f65f3',
	storageBucket: 'playtube-f65f3.appspot.com',
	messagingSenderId: '854447923714',
	appId: '1:854447923714:web:f2d39ecf5132e682cbbd1b',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
