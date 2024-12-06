const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000; // Vous pouvez choisir un autre port si nécessaire

app.use(cors()); // Activer CORS pour permettre les requêtes depuis votre frontend

// Route pour télécharger les fichiers iCalendar
app.get('/fetch-ics', async (req, res) => {
    const { url } = req.query;
    if (!url) {
        return res.status(400).send("URL manquante. Ajoutez ?url=<votre_url> à la requête.");
    }

    try {
        const response = await fetch(url); // Télécharge le fichier depuis l'URL
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const data = await response.text(); // Récupère le contenu texte
        res.header('Content-Type', 'text/calendar');
        res.send(data); // Renvoie le fichier au client
    } catch (error) {
        res.status(500).send(`Erreur : ${error.message}`);
    }
});

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur proxy démarré sur http://localhost:${PORT}`);
});
