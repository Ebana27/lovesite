let passeCard = 2;
let currentQuestion = "";
let questions = [];

// Charger les questions à partir du fichier JSON
fetch('./public/json/main.json')
  .then(response => {
    if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    questions = data.questions;
  })
  .catch(error => {
    console.error("Erreur lors du chargement du fichier JSON :", error);
    alert("Impossible de charger les questions, veuillez réessayer plus tard.");
  });

function getRandomQuestion() {
    if (questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        currentQuestion = questions[randomIndex];
        document.getElementById("question").innerText = currentQuestion;
        document.getElementById("shareBtn").style.display = "flex";
    } else {
        console.error("Les questions ne sont pas encore chargées.");
    }
}

function usePasseCard() {
    if (passeCard > 0) {
        passeCard--;
        document.getElementById("passeCardCount").innerText = passeCard;
        document.getElementById("question").innerText = "Vous avez utilisé une Passe Card !";
        currentQuestion = "";
        document.getElementById("shareBtn").style.display = "none";
    } else {
        alert("Vous n'avez plus de Passe Cards !");
    }
}

function shareOnWhatsApp() {
    if (currentQuestion) {
        const url = "https://api.whatsapp.com/send?text=" + encodeURIComponent("Love or Friendship - Question : " + currentQuestion);
        window.open(url, '_blank');
    } else {
        alert("Veuillez d'abord tirer une question !");
    }
}

// Initialisation
document.getElementById("shareBtn").style.display = "none";

// Fonction pour soumettre la réponse
function submitResponse() {
    const responseText = document.getElementById('response').value;
    const contactMethod = document.querySelector('input[name="contactMethod"]:checked').value;

    if (!responseText) {
        alert("Veuillez entrer une réponse.");
        return;
    }

    if (contactMethod === 'whatsapp') {
        sendToWhatsApp(responseText);
    } else if (contactMethod === 'email') {
        sendToEmail(responseText);
    }
}

// Fonction pour envoyer sur WhatsApp
function sendToWhatsApp(responseText) {
    const phoneNumber = "votre_numero_de_telephone"; // Ton numéro WhatsApp
    const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(responseText)}`;

    window.open(url, '_blank');
}

// Fonction pour envoyer par Email
function sendToEmail(responseText) {
    const email = "ebanaplamedy@gmail.com"; // Ton email de réception
    const subject = "Feedback du jeu Love or Friendship";
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(responseText)}`;

    window.location.href = mailtoLink;
}

