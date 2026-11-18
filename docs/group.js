// Google-Anmeldung und Gruppen-Bewertungen (Firebase Auth + Firestore, privates Projekt).
// Ohne Konfiguration bleibt alles aus; die App zeigt dann "noch nicht freigeschaltet".
import { firebaseConfig } from "./firebase-config.js";

const V = "13.1.0";
const B = `https://www.gstatic.com/firebasejs/${V}/`;
const state = { on: false, user: null, list: [], favs: [] };
const emit = () => window.dispatchEvent(new CustomEvent("ski:group", { detail: { ...state } }));

window.SKIG = { on: false, signIn() {}, signOut() {}, save: async () => {}, remove: async () => {}, fav: async () => {} };

if (!firebaseConfig) {
  emit();
} else {
  try {
    const [{ initializeApp }, A, F] = await Promise.all([
      import(B + "firebase-app.js"), import(B + "firebase-auth.js"), import(B + "firebase-firestore.js")
    ]);
    const app = initializeApp(firebaseConfig);
    const auth = A.getAuth(app);
    const db = F.getFirestore(app);
    const provider = new A.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    let stop = null;

    const firstName = u => ((u.displayName || u.email || "?").trim().split(/[\s@]/)[0] || "?").slice(0, 40);

    window.SKIG = {
      on: true,
      async signIn() {
        try { await A.signInWithPopup(auth, provider); }
        catch (e) {
          if (["auth/popup-blocked", "auth/operation-not-supported-in-this-environment", "auth/cancelled-popup-request"].includes(e.code)) await A.signInWithRedirect(auth, provider);
          else if (e.code !== "auth/popup-closed-by-user") throw e;
        }
      },
      signOut() { return A.signOut(auth); },
      async save(stay, stars, comment) {
        const u = auth.currentUser; if (!u) throw new Error("not signed in");
        await F.setDoc(F.doc(db, "ratings", `${stay}_${u.uid}`), {
          stay, uid: u.uid, name: firstName(u), stars, comment: (comment || "").slice(0, 400), ts: F.serverTimestamp()
        });
      },
      async remove(stay) {
        const u = auth.currentUser; if (!u) return;
        await F.deleteDoc(F.doc(db, "ratings", `${stay}_${u.uid}`));
      },
      // favourites per couple: favs/<stay>_<group>, readable by everyone, writable when signed in
      async fav(stay, group, on) {
        const u = auth.currentUser; if (!u) throw new Error("not signed in");
        const ref = F.doc(db, "favs", `${stay}_${group}`);
        if (on) await F.setDoc(ref, { stay, group, uid: u.uid, ts: F.serverTimestamp() });
        else await F.deleteDoc(ref);
      }
    };
    state.on = true;

    F.onSnapshot(F.collection(db, "favs"), snap => {
      state.favs = snap.docs.map(d => d.data()).map(x => ({ stay: x.stay, group: x.group }));
      emit();
    }, () => {});

    A.getRedirectResult(auth).catch(() => {});
    A.onAuthStateChanged(auth, u => {
      if (stop) { stop(); stop = null; }
      state.user = u ? { uid: u.uid, name: firstName(u) } : null;
      state.list = [];
      emit();
      if (u) {
        stop = F.onSnapshot(F.collection(db, "ratings"), snap => {
          state.list = snap.docs.map(d => d.data()).map(x => ({ stay: x.stay, uid: x.uid, name: x.name, stars: x.stars, comment: x.comment || "" }));
          emit();
        }, () => emit());
      }
    });
  } catch (e) {
    state.on = false;
    emit();
  }
}
