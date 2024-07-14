# WayToYou
Une application web et mobile pour visualiser des trajets des vehicules entre un point de départ et un point d'arrivé dans une carte interactive.
# Guide d'installation
Pour créer et gérer notre base de données ainsi que développer notre application, nous allons suivre plusieurs étapes avec des outils spécifiques.

### Installation de WampServer

1. **Installation de WampServer**:
   - Téléchargez et installez WampServer depuis [le site officiel de WampServer](http://www.wampserver.com/).

2. **Accès à phpMyAdmin**:
   - Une fois WampServer installé, ouvrez votre navigateur et accédez à l'interface web de phpMyAdmin à l'adresse `http://localhost/phpmyadmin`.
   - Créez une nouvelle base de données nommée `waytoyou`.
   - Importez la base de donnée waytoyou_db.

### Préparation de l'environnement de codage avec VS Code

1. **Installation de VS Code**:
   - Téléchargez et installez VS Code depuis [le site officiel de Visual Studio Code](https://code.visualstudio.com/).

### Développement de l'application React

1. **Installation de Node.js**:
   - Téléchargez et installez Node.js depuis [le site officiel de Node.js](https://nodejs.org/).

2. **Création d'une application React**:
   
   - Naviguez dans le dossier de votre application React :
     ```
     cd waytoyou-pfe2024
     ```

4. **Installation des dépendances nécessaires**:
   - Utilisez npm (Node Package Manager) pour installer les packages :
     ```
     npm install
     ```

5. **Démarrage de l'application React**:
   - Lancez votre application sur son port par défaut (généralement le port 3000) avec la commande :
     ```
     npm start
     ```
   - Vous pourrez voir votre application en temps réel en accédant à l'URL `http://localhost:3000` dans votre navigateur.

### Utilisation de Laravel

1. **Installation de Composer**:
   - Téléchargez et installez Composer depuis [le site officiel de Composer](https://getcomposer.org/).

2. **Création d'un projet Laravel**:

     ```
     cd backend-waytoyou-pfe2024
     ```

3. **Lancement du projet Laravel**:
   - Utilisez la commande artisan pour démarrer votre projet Laravel :
     ```
     php artisan serve
     ```
   - Accédez à votre application Laravel à l'adresse `http://localhost:8000`.
4. **Accés au fichiers enregistrés des coordonnées**:
   - Accéder au chemin backend-waytoyou-pfe2024\storage\app\\(nom d'utilisateur).txt pour récupérer les points choisis par un utilisateur.
