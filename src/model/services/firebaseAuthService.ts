import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { IAuthService } from './iAuthService';
import { User } from '../entities/user';
import { auth } from './util/firebaseInit';

export class FirebaseAuthService implements IAuthService {
  
  getUserID(): string | null {
    if(auth.currentUser) return auth.currentUser.uid;
    else return null;
  }
  
  signOut(): void {
    //console.log('oi');
    auth.signOut();
  }

  async createUserWithEmailAndPassword(email: string, password: string): Promise<User> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    return this.mapFirebaseUserToUser(firebaseUser);
  }

  async signInWithEmailAndPassword(email: string, password: string): Promise<User> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const firebaseUser = userCredential.user;
    return this.mapFirebaseUserToUser(firebaseUser);
  }

  async signInWithGoogle(): Promise<User> {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const firebaseUser = userCredential.user;
    return this.mapFirebaseUserToUser(firebaseUser);
  }

  onAuthStateChanged(callback: (user: User | null) => void): void {
    onAuthStateChanged(auth, (firebaseUser) => {
      const user = firebaseUser ? this.mapFirebaseUserToUser(firebaseUser) : null;
      callback(user);
    });
  }

  private mapFirebaseUserToUser(firebaseUser: FirebaseUser): User {
    // Implement your mapping logic here
    return new User(
      firebaseUser.uid,
      firebaseUser.email??'',
      firebaseUser.displayName??'',
      firebaseUser.photoURL??''
    );
  }
}
