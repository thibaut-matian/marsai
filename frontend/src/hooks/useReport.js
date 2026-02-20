import { useState } from "react";

export default function useReport() {
   const INITIAL_DATA = [
  { id: 4, titre: "Tuto Speedrun Mario", auteur: "NintendoFan", email: "fan@nintendo.jp", raison: "Droits d'auteur", timestamp: "Hier" },
  { id: 5, titre: "Prank qui tourne mal", auteur: "PranksterTV", email: "prank@youtube.com", raison: "Contenu violent", timestamp: "Il y a 10h" },
  { id: 6, titre: "Comment miner du Bitcoin", auteur: "CryptoKing", email: "crypto@binance.com", raison: "Arnaque / Spam", timestamp: "Il y a 1h" },
  { id: 7, titre: "Film complet HD 2024", auteur: "PirateStream", email: "admin@ygg.to", raison: "Droits d'auteur", timestamp: "Il y a 3h" },
  { id: 8, titre: "Vente d'armes factices", auteur: "AirsoftPro", email: "contact@airsoft.fr", raison: "Activités illégales", timestamp: "Hier" },
  { id: 9, titre: "Débat politique tendu", auteur: "NewsAgora", email: "info@agora.com", raison: "Harcèlement", timestamp: "Il y a 15min" },
  { id: 10, titre: "Compilation chutes de vélo", auteur: "FailArmy_Fan", email: "fails@outlook.fr", raison: "Contenu violent", timestamp: "Il y a 6h" },
  { id: 11, titre: "Gagner 1000€ par jour", auteur: "EasyMoney", email: "money@scam.com", raison: "Arnaque / Spam", timestamp: "Il y a 8h" },
  { id: 12, titre: "ASMR Eating", auteur: "RelaxNode", email: "asmr@relax.com", raison: "Contenu inapproprié", timestamp: "Il y a 12h" },
  { id: 13, titre: "Leaked Gameplay GTA 6", auteur: "Leaker99", email: "leak@gta6.com", raison: "Droits d'auteur", timestamp: "Il y a 20h" },
  { id: 14, titre: "Tir à l'arc en ville", auteur: "RobinDesBois", email: "robin@hood.fr", raison: "Mise en danger", timestamp: "Hier" },
  { id: 15, titre: "Live Casino Online", auteur: "BetMaster", email: "bet@casino.com", raison: "Activités illégales", timestamp: "Il y a 4h" },
  { id: 16, titre: "Clips Twitch toxiques", auteur: "DramaQueen", email: "drama@twitch.tv", raison: "Harcèlement", timestamp: "Il y a 7h" },
  { id: 17, titre: "Explosifs artisanaux", auteur: "BoomMan", email: "danger@mail.ru", raison: "Activités illégales", timestamp: "Hier" },
  { id: 18, titre: "Musique Zen 10h", auteur: "SleepyHead", email: "zen@sleep.com", raison: "Droits d'auteur", timestamp: "Hier" },
  { id: 19, titre: "Insultes en live", auteur: "ToxicPlayer", email: "toxic@gaming.com", raison: "Harcèlement", timestamp: "Il y a 2h" },
  { id: 20, titre: "Deepfake Célébrité", auteur: "AI_Master", email: "ai@fake.com", raison: "Contenu inapproprié", timestamp: "Il y a 9h" },
  { id: 21, titre: "Drogues douces tuto", auteur: "GreenHand", email: "green@weed.com", raison: "Activités illégales", timestamp: "Hier" },
  { id: 22, titre: "Spam Commentaires", auteur: "Bot_01", email: "bot@spam.net", raison: "Arnaque / Spam", timestamp: "Il y a 30min" },
  { id: 23, titre: "Accident de voiture", auteur: "DashcamFR", email: "dash@cam.fr", raison: "Contenu violent", timestamp: "Hier" },
  { id: 24, titre: "Hack de compte Instagram", auteur: "BlackHat", email: "hack@dark.net", raison: "Activités illégales", timestamp: "Il y a 5h" },
  { id: 25, titre: "Série TV Streaming", auteur: "CinePop", email: "pop@streaming.com", raison: "Droits d'auteur", timestamp: "Il y a 11h" },
  { id: 26, titre: "Doxing influenceur", auteur: "ShadowHacker", email: "shadow@proton.me", raison: "Harcèlement", timestamp: "Il y a 1h" },
  { id: 27, titre: "Course poursuite", auteur: "PoliceLive", email: "news@police.com", raison: "Contenu violent", timestamp: "Hier" },
  { id: 28, titre: "Vente de faux billets", auteur: "FakeMoney", email: "cash@fake.fr", raison: "Activités illégales", timestamp: "Il y a 6h" },
  { id: 29, titre: "Propagande haineuse", auteur: "TruthTeller", email: "truth@web.com", raison: "Harcèlement", timestamp: "Hier" },
  { id: 30, titre: "Phishing tutoriel", auteur: "PhishMan", email: "phish@scam.fr", raison: "Arnaque / Spam", timestamp: "Il y a 3h" },
  { id: 31, titre: "Utilisation d'armes à feu", auteur: "GunReview", email: "guns@usa.com", raison: "Mise en danger", timestamp: "Il y a 14h" },
  { id: 32, titre: "Chirurgie esthétique ratée", auteur: "BeautyFail", email: "beauty@fail.com", raison: "Contenu inapproprié", timestamp: "Hier" },
  { id: 33, titre: "Arnaque au support tech", auteur: "MicrosoftSupport_Fake", email: "support@fake.in", raison: "Arnaque / Spam", timestamp: "Il y a 22h" }
];
  const [reports, setReports] = useState(INITIAL_DATA);
    const [selectedReport, setSelectedReport] = useState(null); // Pour la modale de contact

    const handleDelete = (id, titre) => {
        if (window.confirm(`Confirmez-vous la suppression de la vidéo : ${titre} ?`)) {
            setReports(reports.filter(report => report.id !== id));
        }
    };

    const handleSendEmail = (e) => {
        e.preventDefault();
        alert(`Email de notification envoyé à l'auteur : ${selectedReport.auteur}`);
        setSelectedReport(null); // Ferme la modale
    };

    return { 
        reports, 
        handleDelete, 
        handleSendEmail, 
        selectedReport, 
        setSelectedReport 
    };
}