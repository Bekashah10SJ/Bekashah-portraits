
/* Bekashah Portraits — Firebase Authentication */

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "bekashah-portraits-debaf.firebaseapp.com",
  projectId: "bekashah-portraits-debaf",
  appId: "PASTE_YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const authForm = document.getElementById("authForm");
const authMessage = document.getElementById("authMessage");
const formTitle = document.getElementById("formTitle");
const formMessage = document.getElementById("formMessage");
const submitButton = document.getElementById("submitButton");
const toggleMode = document.getElementById("toggleMode");

const authSection = document.getElementById("authSection");
const privateArea = document.getElementById("privateArea");
const memberEmail = document.getElementById("memberEmail");
const artGrid = document.getElementById("artGrid");
const emptyMessage = document.getElementById("emptyMessage");

let isRegistering = false;

function showMessage(message) {
  authMessage.textContent = message;
}

toggleMode.addEventListener("click", function () {
  isRegistering = !isRegistering;

  formTitle.textContent = isRegistering
    ? "Create your account."
    : "Welcome back.";

  formMessage.textContent = isRegistering
    ? "Register to explore the gallery."
    : "Sign in to explore the gallery.";

  submitButton.textContent = isRegistering
    ? "Create account"
    : "Sign in";

  toggleMode.textContent = isRegistering
    ? "Back to login"
    : "Create account";

  document.getElementById("password").autocomplete =
    isRegistering ? "new-password" : "current-password";

  showMessage("");
});

authForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  showMessage("");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  submitButton.disabled = true;

  try {
    if (isRegistering) {
      await auth.createUserWithEmailAndPassword(email, password);
    } else {
      await auth.signInWithEmailAndPassword(email, password);
    }
  } catch (error) {
    const messages = {
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/weak-password": "Choose a stronger password.",
      "auth/email-already-in-use": "This email already has an account.",
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/network-request-failed": "Check your internet connection."
    };

    showMessage(messages[error.code] || error.message);
  } finally {
    submitButton.disabled = false;
  }
});

document.getElementById("logoutButton").addEventListener("click",
  async function () {
    await auth.signOut();
  }
);

function makeText(tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text || "";

  if (className) element.className = className;

  return element;
}

function clearPrivateContent() {
  artGrid.replaceChildren();
  document.getElementById("privateContact").hidden = true;
  document.getElementById("contactDetails").textContent = "";
  emptyMessage.hidden = false;
}

async function loadPrivateContent() {
  clearPrivateContent();

  try {
    const snapshot = await db.collection("members").get();

    // Never render private records unless a user is still signed in.
    if (!auth.currentUser) return;

    snapshot.forEach(function (doc) {
      const item = doc.data();

      if (item.type === "contact") {
        document.getElementById("contactDetails").textContent =
          [item.email, item.phone, item.details]
            .filter(Boolean)
            .join(" · ");

        document.getElementById("privateContact").hidden = false;
        return;
      }

      if (item.type !== "artwork") return;

      const card = document.createElement("article");
      card.className = "art-card";

      if (item.imageUrl) {
        try {
          const url = new URL(item.imageUrl);

          if (url.protocol === "https:") {
            const image = document.createElement("img");
            image.src = url.href;
            image.alt = item.title || "Pencil portrait";
            image.loading = "lazy";
            image.style.width = "100%";
            image.style.height = "auto";
            card.appendChild(image);
          }
        } catch (_) {
          // Ignore invalid image URLs.
        }
      }

      card.appendChild(makeText("h3", item.title, ""));
      card.appendChild(makeText("p", item.description, ""));

      if (item.price) {
        card.appendChild(makeText("p", item.price, ""));
      }

      artGrid.appendChild(card);
    });

    emptyMessage.hidden = artGrid.children.length > 0;
  } catch (error) {
    if (auth.currentUser) {
      emptyMessage.textContent =
        "Couldn't load the gallery. Check your Firestore rules.";
      emptyMessage.hidden = false;
    }
  }
}

auth.onAuthStateChanged(async function (user) {
  clearPrivateContent();

  authSection.hidden = !!user;
  privateArea.hidden = !user;

  if (!user) {
    memberEmail.textContent = "";
    showMessage("");
    return;
  }

  memberEmail.textContent = "Signed in as " + user.email;
  await loadPrivateContent();
});
