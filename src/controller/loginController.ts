import { User } from "../model/entities/user";
import { IAuthService } from "../model/services/iAuthService";

export class LoginController {
    private authService: IAuthService;

    constructor(authService: IAuthService) {
        this.authService = authService;
    }

    async signInWithEmailAndPassword(email: string, password: string): Promise<User> {
        return this.authService.signInWithEmailAndPassword(email, password);
    }

    async signInWithGoogle(): Promise<User> {
        return this.authService.signInWithGoogle();
    }

    onAuthStateChange(callback: (user: User | null) => void){
        this.authService.onAuthStateChanged(callback);
    }

    signOut():void{
        this.authService.signOut();
    }
}
