const {
  getDocs,
  collection,
  addDoc,
  query,
  where,
  getDoc,
} = require("firebase/firestore");
const { db, auth } = require("../utils/firebase");
const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("firebase/auth");

exports.login = async function (email, password) {
  let user;
  try {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        user = userCredential.user.uid;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    throw new Error(error.message);
  } finally {
    return user;
  }
};

exports.createNewUser = async function (name, surname, email, password) {
  try {
    console.log("aw");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let uid = userCredential.user.uid;
    const newUserReference = await addDoc(collection(db, "users"), {
      name: name,
      surname: surname,
      email: email,
      firebase_uid: uid,
    });
    console.log(userCredential);
    console.log(newUserReference);

    const newUser = await getDoc(newUserReference);
    return newUser.data();
  } catch (error) {
    throw new Error(error);
  }
};
