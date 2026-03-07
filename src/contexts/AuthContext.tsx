import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth, db } from '@/db/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import type { Profile } from '@/types/types';

export async function getProfile(userId: string): Promise<Profile | null> {
  try {
    const profileRef = doc(db, 'profiles', userId);
    const profileSnap = await getDoc(profileRef);

    if (profileSnap.exists()) {
      const data = profileSnap.data();
      // Assign 'owner' role if it's our special admin account
      const role = (data.email === 'admin_6666@kart.com' || data.email === 'admin@6666') ? 'owner' : (data.role || 'user');

      return {
        id: profileSnap.id,
        username: data.username || data.email?.split('@')[0] || 'user',
        email: data.email,
        fullName: data.fullName || data.full_name || data.username || '',
        avatarUrl: data.avatarUrl || data.avatar_url || '',
        role: role as any,
        createdAt: (data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt) || data.created_at || new Date().toISOString(),
      } as Profile;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export interface AuthContextType {
  user: FirebaseUser | null;
  profile: Profile | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUpWithEmail: (email: string, password: string, username: string) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshProfile = async () => {
    if (!user) {
      setProfile(null);
      return;
    }

    const profileData = await getProfile(user.uid);
    setProfile(profileData);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const profileData = await getProfile(currentUser.uid);
        if (profileData) {
          setProfile(profileData);
          // If special admin, ensure the database role matches the owner role
          const isSpecialAdmin = currentUser.email === 'admin_6666@kart.com' || currentUser.email === 'admin@6666';
          if (isSpecialAdmin && profileData.role !== 'owner') {
            await updateDoc(doc(db, 'profiles', currentUser.uid), { role: 'owner' });
            setProfile({ ...profileData, role: 'owner' as any });
          }
        } else {
          // If profile doesn't exist (e.g., first time Google login), create it
          const isSpecialAdmin = currentUser.email === 'admin_6666@kart.com' || currentUser.email === 'admin@6666';
          const newProfile: Profile = {
            id: currentUser.uid,
            email: currentUser.email || '',
            username: currentUser.displayName?.toLowerCase().replace(/\s+/g, '_') || currentUser.email?.split('@')[0] || 'user',
            fullName: currentUser.displayName || '',
            avatarUrl: currentUser.photoURL || '',
            role: isSpecialAdmin ? 'owner' : 'user',
            createdAt: new Date().toISOString(),
          };
          const profileRef = doc(db, 'profiles', currentUser.uid);
          await setDoc(profileRef, {
            ...newProfile,
            createdAt: serverTimestamp(),
          });
          setProfile(newProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const trimmedEmail = email.toLowerCase().trim();
    const isSpecialAdmin = trimmedEmail === 'admin@6666' || trimmedEmail === 'admin_6666@kart.com';
    const specialPassword = 'admin@6668';
    const finalEmail = isSpecialAdmin ? 'admin_6666@kart.com' : email;

    try {
      await signInWithEmailAndPassword(auth, finalEmail, password);
      return { error: null };
    } catch (error: any) {
      // If special admin login fails because account doesn't exist, try auto-signing up once
      if (isSpecialAdmin && password === specialPassword && (error.code === 'auth/invalid-credential' || error.code === 'auth/user-not-found')) {
        try {
          return await signUpWithEmail(email, password, 'Admin');
        } catch (signupError) {
          return { error: error };
        }
      }
      return { error: error as Error };
    }
  };

  const signUpWithEmail = async (email: string, password: string, username: string) => {
    const trimmedEmail = email.toLowerCase().trim();
    const finalEmail = (trimmedEmail === 'admin@6666') ? 'admin_6666@kart.com' : email;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, finalEmail, password);

      // Update Firebase Auth profile
      await updateProfile(userCredential.user, {
        displayName: username
      });

      // Special role for our admin ID
      const role = (trimmedEmail === 'admin@6666' || finalEmail === 'admin_6666@kart.com') ? 'owner' : 'user';

      // Create profile document
      const profileData: Profile = {
        id: userCredential.user.uid,
        email: finalEmail,
        username,
        fullName: username,
        role: role as any,
        createdAt: new Date().toISOString(),
      };

      const profileRef = doc(db, 'profiles', userCredential.user.uid);
      await setDoc(profileRef, {
        ...profileData,
        createdAt: serverTimestamp(),
      });

      setProfile(profileData);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOutUser = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut: signOutUser,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
