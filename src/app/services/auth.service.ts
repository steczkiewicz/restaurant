import { Injectable } from "@angular/core";
import { browserLocalPersistence, browserSessionPersistence, createUserWithEmailAndPassword, inMemoryPersistence, onAuthStateChanged, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Auth } from "@angular/fire/auth"
import { collection, Firestore } from "@angular/fire/firestore";
import { User } from "../shared/user.model";
import { addDoc, doc, getDoc, getDocs, query, setDoc } from "firebase/firestore";
import { truncate } from "fs";


@Injectable({providedIn: 'root'})
export class AuthService {
    user: User = {
        id: 'guest',
        email: 'none',
        username: 'guest',
        role: 'guest',
        isBanned: false
    };

    constructor(private auth: Auth,
        private firestore: Firestore) {
        onAuthStateChanged(this.auth, async (user) => {
            if (user) {

                const uInfo = await getDoc(doc(this.firestore,'users',user.uid))
                if (uInfo.exists()) {
                    const nUser: User = {
                        id: uInfo.id,
                        email: uInfo.data()['email'],
                        username: uInfo.data()['name'],
                        role: uInfo.data()['role'],
                        isBanned: uInfo.data()['isBanned']
                    }
                    this.user = nUser;
                }
            }
            else {
                this.user.id = 'guest';
                this.user.email = 'none';
                this.user.username = 'guest';
                this.user.role = 'guest';
                this.user.isBanned = false;
            }
        })
    }

    isLoggedIn() {
        if (this.user.id !== 'guest'){
            return true;
        }
        return false;
    }

    isAdmin() {
        if (this.user.role === 'admin'){
            return true;
        }
        return false;
    }

    isManagerOrAdmin() {
        if (this.user.role === 'admin' || this.user.role === 'manager'){
            return true;
        }
        return false;
    }

    registerUser(email: string, password: string, username: string) {
        createUserWithEmailAndPassword(this.auth,email,password)
        .then((userCredential) => {
            setDoc(doc(this.firestore,'users',userCredential.user.uid), {
                email: email,
                name: username,
                role: 'client',
                isBanned: false
            })
            const user = userCredential.user;
        })
        .catch((error) => {
        })
    }

    loginUser(email: string, password: string) {
        signInWithEmailAndPassword(this.auth,email,password)
        .then((userCredential) => {
            console.log(userCredential.user)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    signoutUser() {
        signOut(this.auth);
    }
    
    changePersistence(pers: string) {
        switch (pers) {
            case 'local':
                setPersistence(this.auth,browserLocalPersistence);
                break;
            case 'session':
                setPersistence(this.auth, browserSessionPersistence);
                break;
            case 'none':
                setPersistence(this.auth,inMemoryPersistence);
                break;
            }
    }
}