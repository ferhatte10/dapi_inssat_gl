# Configuration Docker Compose pour les Services DAPI

## Table des Matières
- [Aperçu](#aperçu)
- [Prérequis](#prérequis)
- [Utilisation](#utilisation)
- [Volumes](#volumes)
- [Notes](#notes)

## Aperçu
Cette configuration Docker Compose est conçue pour exécuter plusieurs services pour le projet DAPI. Elle comprend des services tels que :

- **db** : Serveur MariaDB pour le stockage des données de la base de données.
- **dapiauth** : Serveur d'authentification utilisant Keycloak.
- **api-blog** : Service API pour la gestion des articles de blog.
- **api-academy** : Service API pour la gestion du contenu académique.
- **gateway** : Passerelle API pour le routage des requêtes vers les services appropriés.
- **inssat-front** : Application frontend pour le projet INSSAT.

## Prérequis
- Docker
- Docker Compose

## Utilisation
1. Clonez le dépôt.
2. Naviguez jusqu'au répertoire (`dapi-launcher`) où se trouve le fichier `docker-compose.yml`.
3. Exécutez la commande suivante pour démarrer les services :

    ```bash
    docker-compose up -d
    ```

4. Une fois les services démarrés, vous pouvez accéder aux services suivants :

   - **Serveur d'authentification** : http://localhost:8080
   - **API de Blog** : http://localhost:5000/api-blog
   - **API de l'Académie** : http://localhost:5000/api-academy
   - **Passerelle** : http://localhost:5000
   - **Application Frontend** : http://localhost:8001

## Volumes
- **blog_uploads** : Volume pour stocker les images du blog téléversés.
- **db_data** : Volume pour stocker les données de la base de données MariaDB.

## Notes
- Assurez-vous que votre machine hôte dispose des ports `8080`, `8001` et `5000` disponibles et non occupés par d'autres services.
Dans le cas contraire, vous pouvez modifier les ports dans le fichier `docker-compose.yml` pour éviter les conflits de port.

- Le reverse proxy est commenté dans le fichier `docker-compose.yml` pour la raison qu'il faut un serveur web pour le faire fonctionner. Si vous avez un serveur web, vous pouvez le décommenter et commenter `inssat-front` pour le faire fonctionner via le rp NGINX.
Ensuite, il faut naviguer vers le fichier `nginx.conf` et changer le `server_name` par le nom de domaine de votre serveur web.
Enfin, la dernière étape c'est de mettre en place le http avec certbot pour le reverse proxy qui vas configurer l'ensemble des services avec un certificat SSL. Pour cela, il faut suivre les étapes suivantes :
    - Se connecter à votre container NGINX avec la commande suivante :
        ```bash
        docker exec -it reverse-proxy /bin/bash
        ```
    - Exécuter la commande suivante pour obtenir un certificat SSL : `Certbot est déjà installé dans le conteneur comme il est spécifié dans le Dockerfile`
        ```bash
        certbot --nginx -d api.dapi-services.fr -d auth.dapi-services.fr -d intranet.dapi-services.fr # Remplacer les domaines par les vôtres
        ```
    - Suivez les instructions pour configurer le certificat SSL. Après cela, certbot modifiera automatiquement le fichier de configuration NGINX pour activer le SSL pour les services spécifiés.
