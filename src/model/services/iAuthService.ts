import { User } from "../entities/user";

export interface IAuthService {
    createUserWithEmailAndPassword(email: string, password: string): Promise<User>;
    signInWithEmailAndPassword(email: string, password: string): Promise<User>;
    signInWithGoogle(): Promise<User>;
    onAuthStateChanged(callback: (user: User | null) => void): void;
    signOut():void;
    getUserID():string|null;
}
