# Système de gestion du contenu de la page Home

## 📋 Vue d'ensemble

Ce système permet à l'administrateur de modifier tous les contenus de la page d'accueil depuis l'interface admin, en gérant les versions FR et EN séparément.

## 🗄️ Installation de la base de données

1. **Exécuter le fichier SQL** `backend/home_content.sql` dans votre base de données MySQL :
   
   Via phpMyAdmin :
   - Ouvrez phpMyAdmin
   - Sélectionnez votre base de données `marsai`
   - Allez dans l'onglet "SQL"
   - Copiez/collez le contenu du fichier `backend/home_content.sql`
   - Cliquez sur "Exécuter"

   Via ligne de commande :
   ```bash
   mysql -u root -p marsai < backend/home_content.sql
   ```

2. La table `home_content` sera créée avec les données par défaut

## 🎯 Fonctionnalités

### Sections modifiables :

1. **Hero** - Vidéo de fond + texte du bouton
2. **À propos** - Titre + 2 paragraphes
3. **Critères** - Titre + liste de critères
4. **Récompenses** - Titre + liste de récompenses
5. **Jury** - Titre + description + membres (nom, titre, image)
6. **Contact** - Titre + téléphone + email + adresse + carte Google Maps
7. **Timeline** - Titre + labels des phases

### Interface admin :

- **Onglets par section** : Naviguez facilement entre les différentes sections
- **Basculement FR/EN** : Modifiez les contenus en français et en anglais
- **Gestion dynamique** : Ajoutez/supprimez des critères, récompenses, membres du jury
- **Sauvegarde globale** : Un seul bouton pour sauvegarder tout le contenu

## 🔧 API Endpoints

### Backend (Node.js/Express)

```javascript
GET    /api/home-content          // Récupérer tout le contenu
GET    /api/home-content/:section // Récupérer une section
PUT    /api/home-content/bulk-update // Mettre à jour tout le contenu
PUT    /api/home-content/:section // Mettre à jour une section
```

### Modèle de données

Chaque section contient :
```javascript
{
  id: number,
  section: string,
  content_fr: JSON,
  content_en: JSON,
  created_at: timestamp,
  updated_at: timestamp
}
```

## 📁 Structure des fichiers

### Backend
- `backend/home_content.sql` - Script SQL de création
- `backend/src/models/HomeContentModel.js` - Modèle Sequelize
- `backend/src/controllers/HomeContentController.js` - Logique métier
- `backend/src/routes/HomeContentRoutes.js` - Routes API

### Frontend
- `frontend/src/hooks/useHomeContent.js` - Hook pour l'admin
- `frontend/src/hooks/useHomeData.js` - Hook pour afficher les données
- `frontend/src/pages/admin/Settings.jsx` - Interface admin
- `frontend/src/pages/Home.jsx` - Page d'accueil (mise à jour)

## 🚀 Utilisation

### Côté Admin :

1. Connectez-vous à l'admin
2. Allez dans "Paramètres"
3. Sélectionnez une section à modifier
4. Basculez entre FR/EN selon vos besoins
5. Modifiez le contenu
6. Cliquez sur "Enregistrer"

### Côté Frontend :

La page Home charge automatiquement le contenu depuis l'API et s'adapte à la langue sélectionnée par l'utilisateur.

## 🔒 Sécurité

Les routes de modification (PUT) doivent être protégées par authentification (commenté pour le développement).

Décommentez les lignes suivantes dans `HomeContentRoutes.js` pour activer la protection :
```javascript
// authenticate,
// authorize("super_admin", "admin"),
```

## ⚡ Performance

- Les données sont chargées une seule fois au montage du composant
- Le contenu est mis en cache côté frontend
- Les mises à jour sont optimisées avec des updates groupés

## 🔄 Migration des anciennes données

Les fichiers de traduction (`locales/fr/common.json` et `locales/en/common.json`) ne sont plus utilisés pour la page Home. Les données sont maintenant en base de données.

Les anciennes traductions ont été migrées dans le SQL initial.

## 📝 Notes

- Les images du jury doivent être placées dans `frontend/src/assets/img/`
- La vidéo hero doit être dans `frontend/src/assets/videos/`
- Les URLs peuvent être relatives (`/assets/...`) ou absolues
