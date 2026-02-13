import React from "react";
import { useState } from "react";

export default function useListFilm() {

const MOVIES_DATA = [
  { id: 1, titre: "Inception", realisateur: "Christopher Nolan", description: "Infiltration de rêves.", statut: "Validé" },
  { id: 2, titre: "Joker", realisateur: "Todd Phillips", description: "Origines du Joker.", statut: "En attente" },
  { id: 3, titre: "Madame Web", realisateur: "S. J. Clarkson", description: "Pouvoirs de voyance.", statut: "Refusé" },
  { id: 4, titre: "Films Supprimer", realisateur: "Supprimé", description: "Films supprimer", statut: "Signalé" },
  { id: 5, titre: "Les dents de la mer le retours", realisateur: "Cédric", description: "Attentions dans l'océan, il y a quelqu'un qui rode au fin fond de l'océan.", statut: "Validé" },
  { id: 6, titre: "Interstellar", realisateur: "Christopher Nolan", description: "Voyage spatial à travers un trou de ver.", statut: "Validé" },
  { id: 7, titre: "The Batman", realisateur: "Matt Reeves", description: "Bruce Wayne enquête sur un tueur en série.", statut: "Validé" },
  { id: 8, titre: "Dune: Part Two", realisateur: "Denis Villeneuve", description: "Paul Atréides s'unit aux Fremen.", statut: "En attente" },
  { id: 9, titre: "Gladiator II", realisateur: "Ridley Scott", description: "La suite épique du combat dans l'arène.", statut: "Validé" },
  { id: 10, titre: "Pulp Fiction", realisateur: "Quentin Tarantino", description: "Histoires croisées dans la pègre de L.A.", statut: "Validé" },
  { id: 11, titre: "Parasite", realisateur: "Bong Joon-ho", description: "Une famille pauvre s'immisce chez des riches.", statut: "Validé" },
  { id: 12, titre: "The Matrix", realisateur: "Lana & Lilly Wachowski", description: "Le monde n'est qu'une simulation informatique.", statut: "Refusé" },
  { id: 13, titre: "Oppenheimer", realisateur: "Christopher Nolan", description: "La création de la bombe atomique.", statut: "Validé" },
  { id: 14, titre: "Spider-Man: No Way Home", realisateur: "Jon Watts", description: "Le multivers s'ouvre sur New York.", statut: "En attente" },
  { id: 15, titre: "Fight Club", realisateur: "David Fincher", description: "Un club de combat souterrain pour évacuer la rage.", statut: "Signalé" },
  { id: 16, titre: "The Godfather", realisateur: "Francis Ford Coppola", description: "L'ascension d'une famille mafieuse.", statut: "Validé" },
  { id: 17, titre: "Everything Everywhere All at Once", realisateur: "Daniels", description: "Une femme explore ses vies parallèles.", statut: "Validé" },
  { id: 18, titre: "Blade Runner 2049", realisateur: "Denis Villeneuve", description: "Un flic découvre un secret enfoui.", statut: "En attente" },
  { id: 19, titre: "The Shining", realisateur: "Stanley Kubrick", description: "Hiver sanglant dans un hôtel isolé.", statut: "Validé" },
  { id: 20, titre: "Avatar: The Way of Water", realisateur: "James Cameron", description: "Retour sur Pandora sous l'océan.", statut: "Validé" },
{ id: 21, titre: "Le Loup de Wall Street", realisateur: "Martin Scorsese", description: "L'ascension fulgurante d'un courtier en bourse.", statut: "Validé" },
  { id: 22, titre: "Shutter Island", realisateur: "Martin Scorsese", description: "Enquête troublante dans un hôpital psychiatrique.", statut: "Validé" },
  { id: 23, titre: "Inception 2 (Fan Made)", realisateur: "Inconnu", description: "Une suite non officielle pleine de spam.", statut: "Signalé" },
  { id: 24, titre: "Le Seigneur des Anneaux", realisateur: "Peter Jackson", description: "Une quête épique pour détruire un anneau unique.", statut: "Validé" },
  { id: 25, titre: "The Whale", realisateur: "Darren Aronofsky", description: "Un professeur reclus tente de renouer avec sa fille.", statut: "En attente" },
  { id: 26, titre: "Top Gun: Maverick", realisateur: "Joseph Kosinski", description: "Maverick forme une nouvelle génération de pilotes.", statut: "Validé" },
  { id: 27, titre: "Barbie", realisateur: "Greta Gerwig", description: "Barbie quitte Barbieland pour le monde réel.", statut: "Validé" },
  { id: 28, titre: "Spider-Man: Across the Spider-Verse", realisateur: "Joaquim Dos Santos", description: "Miles Morales traverse le multivers.", statut: "Validé" },
  { id: 29, titre: "John Wick: Chapter 4", realisateur: "Chad Stahelski", description: "John Wick affronte ses adversaires les plus mortels.", statut: "Validé" },
  { id: 30, titre: "Killers of the Flower Moon", realisateur: "Martin Scorsese", description: "Enquête sur des meurtres dans la nation Osage.", statut: "En attente" },
  { id: 31, titre: "Poor Things", realisateur: "Yorgos Lanthimos", description: "L'évolution incroyable de Bella Baxter.", statut: "Validé" },
  { id: 32, titre: "Napoleon", realisateur: "Ridley Scott", description: "L'ascension et la chute de l'empereur français.", statut: "Refusé" },
  { id: 33, titre: "The Killer", realisateur: "David Fincher", description: "Un tueur à gages commence à perdre pied.", statut: "Validé" },
  { id: 34, titre: "Wonka", realisateur: "Paul King", description: "Les origines du célèbre chocolatier.", statut: "Validé" },
  { id: 35, titre: "Godzilla Minus One", realisateur: "Takashi Yamazaki", description: "Le Japon d'après-guerre face à un monstre.", statut: "Validé" },
  { id: 36, titre: "The Menu", realisateur: "Mark Mylod", description: "Un dîner gastronomique qui tourne au cauchemar.", statut: "Validé" },
  { id: 37, titre: "Talk to Me", realisateur: "Danny Philippou", description: "Des jeunes invoquent des esprits avec une main.", statut: "Signalé" },
  { id: 38, titre: "The Iron Claw", realisateur: "Sean Durkin", description: "L'histoire vraie de la dynastie de catcheurs Von Erich.", statut: "En attente" },
  { id: 39, titre: "Past Lives", realisateur: "Celine Song", description: "Deux amis d'enfance se retrouvent à New York.", statut: "Validé" },
  { id: 40, titre: "Society of the Snow", realisateur: "J.A. Bayona", description: "Survie après un crash dans les Andes.", statut: "Validé" },
  { id: 41, titre: "Ferrari", realisateur: "Michael Mann", description: "L'été 1957 crucial pour Enzo Ferrari.", statut: "Validé" },
  { id: 42, titre: "Maestro", realisateur: "Bradley Cooper", description: "La vie complexe de Leonard Bernstein.", statut: "En attente" },
  { id: 43, titre: "The Zone of Interest", realisateur: "Jonathan Glazer", description: "La vie quotidienne à côté d'Auschwitz.", statut: "Validé" },
  { id: 44, titre: "Anatomy of a Fall", realisateur: "Justine Triet", description: "Un procès pour meurtre dissèque un couple.", statut: "Validé" },
  { id: 45, titre: "The Holdovers", realisateur: "Alexander Payne", description: "Un prof grincheux reste au campus pour Noël.", statut: "Validé" },
  { id: 46, titre: "Saltburn", realisateur: "Emerald Fennell", description: "Une obsession malsaine dans un château anglais.", statut: "Signalé" },
  { id: 47, titre: "Beau Is Afraid", realisateur: "Ari Aster", description: "Une odyssée surréaliste pour rentrer chez sa mère.", statut: "Refusé" },
  { id: 48, titre: "Air", realisateur: "Ben Affleck", description: "La création de la ligne Air Jordan.", statut: "Validé" },
  { id: 49, titre: "Blackberry", realisateur: "Matt Johnson", description: "L'ascension et la chute du premier smartphone.", statut: "Validé" },
  { id: 50, titre: "The Flash", realisateur: "Andy Muschietti", description: "Barry Allen voyage dans le temps pour sauver sa mère.", statut: "Refusé" },
  { id: 51, titre: "Mission: Impossible - Dead Reckoning", realisateur: "Christopher McQuarrie", description: "Ethan Hunt traque une IA menaçante.", statut: "Validé" },
  { id: 52, titre: "Indiana Jones and the Dial of Destiny", realisateur: "James Mangold", description: "Indy cherche un cadran légendaire.", statut: "Validé" },
  { id: 53, titre: "Guardians of the Galaxy Vol. 3", realisateur: "James Gunn", description: "La mission finale de l'équipe galactique.", statut: "Validé" },
  { id: 54, titre: "Elemental", realisateur: "Peter Sohn", description: "Une histoire d'amour entre le feu et l'eau.", statut: "Validé" },
  { id: 55, titre: "Asteroid City", realisateur: "Wes Anderson", description: "Événements étranges dans une ville du désert.", statut: "En attente" },
  { id: 56, titre: "The Banshees of Inisherin", realisateur: "Martin McDonagh", description: "Une rupture amicale sur une île irlandaise.", statut: "Validé" },
  { id: 57, titre: "Babylon", realisateur: "Damien Chazelle", description: "La débauche et l'excès du vieux Hollywood.", statut: "Signalé" },
  { id: 58, titre: "Puss in Boots: The Last Wish", realisateur: "Joel Crawford", description: "Le Chat Potté cherche à retrouver ses vies.", statut: "Validé" },
  { id: 59, titre: "The Fabelmans", realisateur: "Steven Spielberg", description: "L'enfance romancée d'un futur cinéaste.", statut: "Validé" },
  { id: 60, titre: "Tár", realisateur: "Todd Field", description: "La chute d'une chef d'orchestre renommée.", statut: "Validé" },
  { id: 61, titre: "Bones and All", realisateur: "Luca Guadagnino", description: "Une romance sanglante à travers l'Amérique.", statut: "Refusé" },
  { id: 62, titre: "Triangle of Sadness", realisateur: "Ruben Östlund", description: "Une croisière de luxe tourne au désastre.", statut: "Validé" },
  { id: 63, titre: "Elvis", realisateur: "Baz Luhrmann", description: "La vie du King à travers son manager.", statut: "Validé" },
  { id: 64, titre: "The Northman", realisateur: "Robert Eggers", description: "Une épopée viking de vengeance.", statut: "Validé" },
  { id: 65, titre: "Everything Everywhere All at Once", realisateur: "The Daniels", description: "Exploration hilarante du multivers.", statut: "Validé" },
  { id: 66, titre: "The Gray Man", realisateur: "Russo Brothers", description: "Un agent de la CIA traqué par un mercenaire.", statut: "Validé" },
  { id: 67, titre: "Glass Onion", realisateur: "Rian Johnson", description: "Benoit Blanc résout un meurtre en Grèce.", statut: "Validé" },
  { id: 68, titre: "Bullet Train", realisateur: "David Leitch", description: "Cinq tueurs se retrouvent dans un train japonais.", statut: "Validé" },
  { id: 69, titre: "Nope", realisateur: "Jordan Peele", description: "Des résidents découvrent un objet volant étrange.", statut: "Validé" },
  { id: 70, titre: "The Batman", realisateur: "Matt Reeves", description: "Le Chevalier Noir face au Sphinx.", statut: "Validé" }
];

const [movies, setMovies] = useState(MOVIES_DATA);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleDelete = (id, titre) => {
    if (window.confirm(`Confirmez-vous la suppression du film : ${titre} ?`)) {
      setMovies(movies.filter((movie) => movie.id !== id));
    }
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    alert(`Email envoyé au réalisateur de : ${selectedMovie.titre}`);
    setSelectedMovie(null);
  };

  const getBadgeClass = (statut) => {
    switch (statut) {
      case "Validé": return "badge-success text-white";
      case "Refusé": return "badge-error text-white";
      case "Signalé": return "badge-error animate-pulse text-white border-2 shadow-[0_0_10px_rgba(255,0,0,0.5)]";
      case "En attente": return "badge-info text-white";
      default: return "badge-ghost";
    }
  };

  return { 
    movies,
    getBadgeClass, 
    handleDelete, 
    handleSendEmail, 
    selectedMovie, 
    setSelectedMovie 
  };
}