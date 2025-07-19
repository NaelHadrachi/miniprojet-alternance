# Hubeau Temp App

Hubeau Temp App est une application Next.js permettant d'afficher les températures des cours d'eau en France via l'API Hubeau. Elle propose un tableau de bord interactif pour visualiser les données des stations hydrométriques.

## Fonctionnalités

- **Sélection par département** : Affiche les stations disponibles dans un département donné.
- **Graphiques individuels** : Visualisation des températures pour chaque station sur les 7 derniers jours.
- **Comparatif général** : Comparaison des températures entre plusieurs stations sur une même période.

## Prérequis

- Node.js (version 16 ou supérieure)
- npm ou yarn

## Initialisation du projet

### 1. Cloner le dépôt

```bash
# Cloner le dépôt Git
$ git clone <URL_DU_DEPOT>
$ cd hubeau-temp-app
```

### 2. Installer les dépendances

```bash
# Installer les dépendances du frontend
$ npm install
```

### 3. Configurer le backend

Le backend est un serveur Node.js qui sert de proxy pour interagir avec l'API Hubeau. Assurez-vous que le backend est configuré correctement.

#### Étapes pour démarrer le backend :

1. Naviguez dans le dossier du backend (par exemple, `backend/`).
2. Installez les dépendances :

```bash
$ npm install
```

3. Démarrez le serveur backend :

```bash
$ npm start
```

Par défaut, le backend écoute sur le port `4000`. Vous pouvez modifier cela dans le fichier de configuration du backend si nécessaire.

### 4. Démarrer le frontend

Dans le dossier racine du projet :

```bash
$ npm run dev
```

Le frontend sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000).

## Structure du projet

- **`src/app`** : Contient les pages principales de l'application.
- **`src/components`** : Contient les composants réutilisables comme `StationCard`, `TemperatureChart`, et `ComparativeChart`.
- **`public/`** : Contient les fichiers statiques comme les images.

## API utilisée

L'application utilise l'API Hubeau pour récupérer les données des stations hydrométriques et des températures. Pour plus d'informations, consultez la documentation officielle : [https://hubeau.eaufrance.fr/](https://hubeau.eaufrance.fr/).

## Scripts disponibles

- `npm run dev` : Démarre le serveur de développement.
- `npm run build` : Compile l'application pour la production.
- `npm start` : Démarre l'application en mode production (après compilation).

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request pour proposer des améliorations.

## Licence

Ce projet est sous licence MIT.

## Documentation des composants

### `StationCard`

Composant affichant les informations d'une station hydrométrique, ainsi qu'un graphique des températures récentes.

- **Props** :
  - `station` (object) :
    - `code_station` (string) : Code unique de la station.
    - `libelle_station` (string) : Nom de la station.
    - `libelle_cours_eau` (string) : Nom du cours d'eau.
    - `derniere_temperature` (number, optionnel) : Dernière température mesurée.
    - `date_derniere_mesure` (string, optionnel) : Date de la dernière mesure.

### `TemperatureChart`

Composant affichant un graphique des températures pour une station donnée sur les 7 derniers jours.

- **Props** :
  - `stationCode` (string) : Code unique de la station.

### `ComparativeChart`

Composant affichant un graphique comparatif des températures pour plusieurs stations sur les 7 derniers jours.

- **Props** :
  - `stations` (array) : Liste des stations à comparer.
    - Chaque station est un objet contenant :
      - `code_station` (string) : Code unique de la station.
      - `libelle_station` (string) : Nom de la station.
      - `libelle_cours_eau` (string) : Nom du cours d'eau.

### `DepartmentSelect`

Composant permettant de sélectionner un département pour filtrer les stations.

- **Props** :
  - `onChange` (function) : Fonction appelée lors de la sélection d'un département. Reçoit le code du département sélectionné.

### `page.tsx`

Page principale de l'application affichant :

1. Un sélecteur de département pour filtrer les stations.
2. Un graphique comparatif des températures pour les stations du département sélectionné.
3. Une liste de cartes individuelles pour chaque station.

### Backend

Le backend agit comme un proxy pour interagir avec l'API Hubeau. Il expose des endpoints pour :

- Récupérer les stations d'un département :
  - **Endpoint** : `/api/stations`
  - **Paramètres** :
    - `department` (string) : Code du département.

- Récupérer les températures récentes d'une station :
  - **Endpoint** : `/api/latest-temperature`
  - **Paramètres** :
    - `stationCode` (string) : Code unique de la station.
