const firebaseConfig = {
  apiKey: "AIzaSyAe22Y8yyouneGMFswJW52ANGHB8cXTus0",
  authDomain: "demo2-4fb6d.firebaseapp.com",
  projectId: "demo2-4fb6d",
  storageBucket: "demo2-4fb6d.firebasestorage.app",
  messagingSenderId: "167045908210",
  appId: "1:167045908210:web:a40f583bce667a6f9cb26b",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
  window.localStorage.setItem("user", JSON.stringify(user));

  if (user && window.location.pathname != "/") {
    window.location.replace("/");
  }
  if (!user && window.location.pathname != "/login.html") {
    window.location.replace("login.html");
  }
});

function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => console.log(data))
    .catch((err) => {
      register(email, password)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    });
}

async function register(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

async function logout() {
  window.localStorage.setItem("user", null);
  firebase
    .auth()
    .signOut()
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}
