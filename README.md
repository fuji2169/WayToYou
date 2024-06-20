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
   - À l'intérieur de cette base de données, créez les tables suivantes : `users`, `points` et `routes`.

### Préparation de l'environnement de codage avec VS Code

1. **Installation de VS Code**:
   - Téléchargez et installez VS Code depuis [le site officiel de Visual Studio Code](https://code.visualstudio.com/).

### Développement de l'application React

1. **Installation de Node.js**:
   - Téléchargez et installez Node.js depuis [le site officiel de Node.js](https://nodejs.org/).

2. **Création d'une application React**:
   - Ouvrez votre terminal.
   - Utilisez la commande suivante pour créer une nouvelle application React nommée `waytoyou-app` :
     ```
     npx create-react-app waytoyou-app
     ```
   - Naviguez dans le dossier de votre application React :
     ```
     cd waytoyou-app
     ```

3. **Installation des dépendances nécessaires**:
   - Utilisez npm (Node Package Manager) pour installer les packages suivants :
     ```
     npm install react-leaflet leaflet react-select axios leaflet-routing-machine
     ```

4. **Organisation de l'application React**:
   - Créez les dossiers suivants pour organiser votre projet :
     - `components` (pour les composants React)
     - `routes` (pour la gestion des routes)
     - `assets` (pour les ressources telles que les images, les styles, etc.)

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
   - Ouvrez votre terminal.
   - Utilisez la commande suivante pour créer un nouveau projet Laravel nommé `waytoyou-laravel` :
     ```
     composer create-project --prefer-dist laravel/laravel waytoyou-laravel
     ```
   - Naviguez dans le dossier de votre projet Laravel :
     ```
     cd waytoyou-laravel
     ```

3. **Liaison avec la base de données**:
   - Configurez votre fichier `.env` pour spécifier les paramètres de connexion à la base de données.

4. **Création des routes et des contrôleurs nécessaires**:
   - Créez les routes et les contrôleurs selon les besoins de votre application.

5. **Lancement du projet Laravel**:
   - Utilisez la commande artisan pour démarrer votre projet Laravel :
     ```
     php artisan serve
     ```
   - Accédez à votre application Laravel à l'adresse `http://localhost:8000`.

En suivant ces étapes avec les outils et commandes spécifiés, vous pourrez créer et développer efficacement votre application web avec React et Laravel, tout en utilisant WampServer pour gérer votre base de données MySQL via phpMyAdmin.
