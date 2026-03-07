// src/types/virtual-modules.d.ts

declare module '@/db/firebase' {
  export const auth: ReturnType<typeof import('firebase/auth').getAuth>;
  export const db: ReturnType<typeof import('firebase/firestore').getFirestore>;
  export const storage: ReturnType<typeof import('firebase/storage').getStorage>;
}
