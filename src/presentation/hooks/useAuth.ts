import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "@/data/api/firebase";
import { FirebaseError } from "firebase/app";

export interface UserProfile {
  uid: string;
  email: string;
  role: "user" | "admin" | "superadmin";
  phone?: string;
  address?: string;
  username?: string;
  created_at: string;
}

interface UserAuth {
  uid: string;
  email: string;
  email_verified: boolean;
  username?: string;
}

interface AuthState {
  user: UserAuth | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  const loadUserProfile = async (uid: string): Promise<UserProfile | null> => {
    try {
      const profileRef = ref(db, `users/${uid}`);
      const snapshot = await get(profileRef);

      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    } catch (error) {
      console.error("Error loading profile:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userAuth: UserAuth = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          email_verified: firebaseUser.emailVerified,
          username: firebaseUser.displayName || undefined,
        };

        const profile = await loadUserProfile(firebaseUser.uid);

        setState({
          user: userAuth,
          profile,
          loading: false,
          error: null,
        });
      } else {
        setState({
          user: null,
          profile: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const profile = await loadUserProfile(userCredential.user.uid);

      setState({
        user: {
          uid: userCredential.user.uid,
          email: userCredential.user.email || "",
          email_verified: userCredential.user.emailVerified,
          username: userCredential.user.displayName || undefined,
        },
        profile,
        loading: false,
        error: null,
      });

      return { success: true };
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  const register = async (
    email: string,
    password: string,
    profileData?: { phone?: string; address?: string; display_name?: string }
  ) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || "",
        role: "user", // Default role
        phone: profileData?.phone || "",
        address: profileData?.address || "",
        created_at: new Date().toISOString(),
      };

      const profileRef = ref(db, `users/${user.uid}`);
      await set(profileRef, userProfile);

      if (profileData?.display_name) {
        // Note: Butuh import updateProfile dari firebase/auth
      }

      setState({
        user: {
          uid: user.uid,
          email: user.email || "",
          email_verified: user.emailVerified,
          username: profileData?.display_name,
        },
        profile: userProfile,
        loading: false,
        error: null,
      });

      return { success: true, user: userProfile };
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await signOut(auth);
      setState({
        user: null,
        profile: null,
        loading: false,
        error: null,
      });
      return { success: true };
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  const updateProfile = async (updates: {
    phone?: string;
    address?: string;
  }) => {
    if (!state.user) {
      throw new Error("User not authenticated");
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const profileRef = ref(db, `users/${state.user.uid}`);

      const currentProfile = state.profile || {
        uid: state.user.uid,
        email: state.user.email,
        role: "user",
        created_at: new Date().toISOString(),
      };

      const updatedProfile = {
        ...currentProfile,
        ...updates,
      };

      await set(profileRef, updatedProfile);

      setState((prev) => ({
        ...prev,
        profile: updatedProfile,
        loading: false,
        error: null,
      }));

      return { success: true, profile: updatedProfile };
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      setState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  };

  return {
    user: state.user,
    profile: state.profile,
    loading: state.loading,
    error: state.error,
    isAuthenticated: !!state.user,
    isAdmin: state.profile?.role === "admin",

    login,
    register,
    logout,
    updateProfile,

    clearError: () => setState((prev) => ({ ...prev, error: null })),
  };
};

const getErrorMessage = (error: unknown): string => {
  const err = error as FirebaseError;

  switch (err.code) {
    case "auth/email-already-in-use":
      return "Email sudah terdaftar";
    case "auth/invalid-email":
      return "Email tidak valid";
    case "auth/user-not-found":
      return "Email tidak ditemukan";
    case "auth/wrong-password":
      return "Password salah";
    case "auth/weak-password":
      return "Password terlalu lemah";
    default:
      return err.message || "Terjadi kesalahan";
  }
};
