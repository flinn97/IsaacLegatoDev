import axios from 'redaxios';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, getDocs, collection, getDoc, updateDoc, addDoc, where, query, setDoc, deleteDoc, onSnapshot, querySnapshot, Timestamp, serverTimestamp, orderBy  } from "firebase/firestore";
import { db, storage, auth } from '../firbase.config.js';
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged, getAuth, updateEmail, deleteUser  } from "firebase/auth";
import Factory from '../npm/factory.js';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
const API_URL = "https://legato.flinnapps.com/legato/";

//be sure to upload axios. This is my controller for everything that I do for the backend.
class AuthService {

    async getCurrentUser() {
        return localStorage.getItem("user");
    }
    async getAllTheDataForTheUser(email, componentList, student, teacher, dispatch) {
        let obj = {}

        let rawData = [];
        const components = student ? await query(collection(db, "users", teacher, "components"), where('owner', '==', student), orderBy("date"))
         : await query(collection(db, "users", email, "components"), where('collection', '==', email), orderBy("date"));
        // let comps= await getDocs(components);
        let comps = await onSnapshot(components, async (querySnapshot) => {

            await componentList.clearList();
            rawData = [];
            
            

            for (const key in querySnapshot.docs) {

                let data = querySnapshot.docs[key].data()
                rawData.push(data);
            }

            await componentList.addComponents(rawData, false);

            if (student) {
                let user = await componentList.getComponent('student');

                dispatch({firstTime:true, login: false, getOtherStudents: true, currentuser: user, email: teacher, currentstudent: user, myswitch: "studentDash", checkURL: true, getChatroom:true });

            }
            else {
                let user = await componentList.getComponent('user');
                dispatch({ login: false, currentuser: user, email: email, checkURL: true });

            }

        });


    }
    async getOtherStudents(studentlist, email, componentList, id) {
        let rawData = []
        for (const key in studentlist) {
            if(studentlist[key]!==id){
            let docRef = query(collection(db, "users", email, "components"), where('owner', '==', studentlist[key]), orderBy("date"));

            let comps = await onSnapshot(docRef, async (querySnapshot) => {
                debugger
                

                rawData = [];
                for (const key in querySnapshot.docs) {
                    await componentList.clearSelectedList(querySnapshot.docs[key].data()._id, "_id");
                    let data = querySnapshot.docs[key].data()
                    rawData.push(data);
                }

                await componentList.addComponents(rawData, false);

            });
        }
        }
    }
    async register(email, password, addToCache) {

        let user;
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            user = userCredential.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
        if (addToCache) {
            localStorage.setItem("user", JSON.stringify(user));

        }

        return user;
    }
    async getUserInfo(email, componentList, student, teacher) {
        const components = student ? await query(collection(db, "users", teacher, "components"), where('_id', '==', student)) : await query(collection(db, "users", email, "components"), where('email', '==', email));
        let comps = await getDocs(components);
        let rawData = [];
        for (const key in comps.docs) {
            let data = comps.docs[key].data();
            rawData.push(data);

        }
    }
    async login(email, password, componentList, student, teacher) {
        let user;
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        if (user) {
            let saveUser = student ? { ...user, teacher: teacher, student: student } : user
            await localStorage.setItem("user", JSON.stringify(saveUser));
            // await this.getUserInfo(email, componentList, student, teacher);
            // user=await componentList.getComponent(student?'student':'user');
        }
        return user;
    }

    async logout() {
        await localStorage.clear();
        let logouser;
        await onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                logouser = user.uid;
                // ...
            }
        })
        if (logouser) {
            await signOut(auth);

        }
        // window.location.reload();
    }


    async uploadPics(pic, name) {
        const storageRef = ref(storage, name);
        await uploadBytes(storageRef, pic).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
    }
    async downloadPics(name) {
        let src;
        await getDownloadURL(ref(storage, name)).then((url) => {

            src = url;
        })
        return src;
    }
    deletePics(name) {

        const delRef = ref(storage, name);
        // Delete the file
        deleteObject(delRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }

    /**
     * 
     * @param {*} role 
     * @param {*} id 
     * @param {*} changeData 
     * @returns change any data I want.
     */
    async dispatch(obj, email) {

        debugger
        for (const key in obj) {
            let operate = obj[key];
            for (let i = 0; i < operate.length; i++) {
                const delay = ms => new Promise(res => setTimeout(res, ms));
                await delay(1000);
                let component = key !== "del" ? operate[i].getJson() : operate[i];
                switch (key) {
                    case "add":
                        component.collection = email;
                        component.date = await serverTimestamp();
                        await setDoc(doc(db, 'users', email, 'components', component._id), component);
                        break;
                    case "del":
                        await deleteDoc(doc(db, 'users', email, 'components', component));
                        break;
                    case "update":
                        await updateDoc(doc(db, 'users', email, 'components', component._id), component);
                        break;
                }

            }
        }

    }


    async registerStudent(obj, email) {
        await setDoc(doc(db, 'users', email + "@legato.com"), obj);

    }
    async registerStudentWithEmail( email,obj,) {
        debugger
        await setDoc(doc(db, 'users', email), obj);

    }
    async getStudentsTeacher(email) {
        const docRef = doc(db, "users", email);
        const docSnap = await getDoc(docRef);
        return docSnap.data();

    }




    async deleteStudent( email) {
        debugger
        await deleteDoc(doc(db, 'users', email));
    }
    async getGeneralChatroom(email, componentList){
        debugger
        const components = doc(db, "users", email, "components", "generalChatroom")
        let comps = await getDoc(components);
        let rawData = [];
        if (comps.exists()) {
            let data = await comps.data()
            rawData = [data];
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
           
            await componentList.addComponents(rawData, false);
    }

    async getGeneralChatPosts(email, componentList){
        const components = await query(collection(db, "users", email, "components"), where('chatroom', '==', "generalChatroom"), orderBy("date"))
        let comps = await onSnapshot(components, async (querySnapshot) => {
            debugger
            await componentList.clearSelectedList("generalChatroom", "chatroom");
            let rawData = [];
            for (const key in querySnapshot.docs) {
                let data = querySnapshot.docs[key].data()
                rawData.push(data);
            }
            await componentList.addComponents(rawData, false);
                // dispatch({  });
        });
    }
    async changeEmail(email){
        debugger
        const auth = getAuth();
        updateEmail(auth.currentUser, email).then(() => {
        // Email updated!
        // ...
        }).catch((error) => {
        // An error occurred
        // ...
        });
    }
    async loginToDel(email, password,) {
        debugger
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }
    async delAccount(){
        debugger
        const auth = getAuth();
const user = auth.currentUser;

await deleteUser(user).then(() => {
  // User deleted.
}).catch((error) => {
  // An error ocurred
  // ...
});
    }

}
export default new AuthService();

