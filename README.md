# Athena AI - Système d'Authentification

## 🚀 Configuration de la Base de Données

### Prérequis
- PHP 7.4 ou supérieur
- MySQL 5.7 ou supérieur
- Serveur web (Apache/Nginx)

### Installation

1. **Créer la base de données**
   ```sql
   -- Exécuter le fichier database/schema.sql
   mysql -u root -p < database/schema.sql
   ```

2. **Configuration PHP**
   - Modifier les paramètres de connexion dans `config/database.php`
   - Ajuster les variables selon votre environnement

3. **Structure des fichiers**
   ```
   /api/
     auth.php          # API d'authentification
   /config/
     database.php      # Configuration base de données
   /database/
     schema.sql        # Structure de la base de données
   ```

## 🔐 API Endpoints

### Inscription
```javascript
POST /api/auth.php
{
  "action": "register",
  "username": "utilisateur",
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

### Connexion
```javascript
POST /api/auth.php
{
  "action": "login",
  "email": "user@example.com",
  "password": "motdepasse123"
}
```

### Vérification du token
```javascript
POST /api/auth.php
{
  "action": "verify_token",
  "token": "jwt_token_here"
}
```

## 🎨 Fonctionnalités UI

### Modal d'Authentification
- **Design moderne** avec effets de glassmorphisme
- **Animations fluides** et transitions
- **Validation en temps réel** des formulaires
- **Support des connexions sociales** (Google, GitHub)
- **Gestion d'erreurs** élégante
- **Responsive design** pour tous les appareils

### Sécurité
- **Hachage des mots de passe** avec bcrypt
- **Tokens JWT** pour l'authentification
- **Validation côté serveur** et client
- **Protection CSRF** intégrée
- **Gestion des sessions** sécurisée

## 🛠️ Utilisation

1. **Cliquer sur "Inscription"** dans l'en-tête
2. **Remplir le formulaire** avec vos informations
3. **Validation automatique** des champs
4. **Connexion automatique** après inscription
5. **Interface utilisateur** mise à jour avec les infos utilisateur

## 📊 Base de Données

### Tables principales
- `users` - Informations utilisateurs
- `user_sessions` - Gestion des sessions
- `conversations` - Historique des chats
- `messages` - Messages des conversations
- `user_preferences` - Préférences utilisateur
- `api_usage` - Suivi de l'utilisation

### Fonctionnalités avancées
- **Vues SQL** pour les statistiques
- **Index optimisés** pour les performances
- **Contraintes de clés étrangères**
- **Gestion des tokens d'expiration**

## 🎯 Prochaines étapes

- [ ] Vérification par email
- [ ] Réinitialisation de mot de passe
- [ ] Authentification à deux facteurs
- [ ] Intégration OAuth complète
- [ ] Gestion des rôles et permissions
- [ ] Tableau de bord administrateur

## 🔧 Configuration avancée

Modifier les paramètres dans `config/database.php` :
- Environnements multiples (dev, prod, test)
- Pool de connexions
- Configuration SSL
- Réplication maître-esclave