import { AuthRepository } from "../../domain/repository/AuthRepository";
import { AuthUser } from "../../domain/entities/auth";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from "firebase/auth";
import { auth, db } from "../api/firebase";
import { ref, get, child } from "firebase/database";
import { updateProfile } from "firebase/auth";

// ... imports

export class AuthRepositoryImpl implements AuthRepository {
  async login(email: string, password: string): Promise<AuthUser> {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const profile = await this.fetchUserProfile(userCredential.user.uid);
    return this.mapToAuthUser(userCredential.user, profile);
  }

  async register(email: string, password: string, username: string): Promise<AuthUser> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update display name
    if (userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: username
        });
        // Reload user to get updated profile
        await userCredential.user.reload();
    }
    
    // Return updated user (profile might not exist in DB yet, handled by UseCase)
    // We return basic info + username, RegisterUseCase will handle the rest
    return this.mapToAuthUser({ ...userCredential.user, displayName: username } as User, { username });
  }

  async logout(): Promise<void> {
    await signOut(auth);
  }

  async getCurrentUser(): Promise<AuthUser | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        unsubscribe();
        if (user) {
            const profile = await this.fetchUserProfile(user.uid);
            resolve(this.mapToAuthUser(user, profile));
        } else {
            resolve(null);
        }
      });
    });
  }

  observeAuthState(callback: (user: AuthUser | null) => void): () => void {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
          const profile = await this.fetchUserProfile(user.uid);
          callback(this.mapToAuthUser(user, profile));
      } else {
          callback(null);
      }
    });
  }

  private async fetchUserProfile(uid: string): Promise<any> {
    try {
        const snapshot = await get(child(ref(db), `users/${uid}`));
        if (snapshot.exists()) {
            return snapshot.val();
        }
        return null;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
  }

  private mapToAuthUser(firebaseUser: User, profileData?: any): AuthUser {
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      photoURL: firebaseUser.photoURL,
      // Standardized to username
      username: profileData?.username || firebaseUser.displayName || undefined,
      role: profileData?.role || "user",
      position: profileData?.position,
      department: profileData?.department,
      phone: profileData?.phone || profileData?.phone_number,
      address: profileData?.address?.street || profileData?.address, 
    };
  }
}
