export default {
  title: {
    index: 'Bienvenue',
    panel: 'Mon Atelier',
    settings: 'Options du compte',
    user: 'Profil de ',
    import: 'Importation de données',
    graphs: 'Générateur de graphiques',
    url: 'Annotation du graphique',
    about: 'À propos'
  },
  layout: {
    atelier: 'Mon Atelier'
  },
  index: {
    welcome: 'Bienvenue sur VASCO',
    username: "Nom d'utilisateur ou adresse e-mail",
    password: 'Mot de passe',
    login: {
      header: 'Se connecter',
      label: 'Saisissez vos informations',
      button: 'Se connecter'
    },
    register: {
      header: "S'enregistrer",
      username: "Nom d'utilisateur",
      email: 'Adresse email',
      label: "Choisissez un nom d'utilisateur et un mot de passe.",
      repeat: 'Répétez le mot de passe',
      button: 'Créer le compte'
    },
    error: {
      username_required: "Le nom d'utilisateur est requis.",
      email_required: "L'email est requis.",
      email_invalid: "Le format de l'adresse e-mail est invalide.",
      password_required: 'Le mot de passe est requis.',
      username_invalid:
        "Le nom d'utilisateur est trop court ou contient des caractères interdits.",
      password_invalid:
        'Le mot de passe est trop court ou contient des caractères interdits.',
      not_corresponding: 'Les mots de passe ne correspondent pas.',
      username_already_exist: "Le nom d'utilisateur choisi existe déjà.",
      email_already_exist: "L'adresse email choisie est déjà utilisée.",
      invalid:
        "Nom d'utilisateur ou mot de passe invalide. Veuillez vérifier vos identifiants."
    }
  },
  import: {
    own: {
      header: 'Sélectionner des données',
      label: 'Vos données',
      convert: 'Si besoin, pour convertir un fichier en .csv, ',
      click_here: 'cliquez ici',
      disclaimer:
        'Votre fichier doit contenir les entêtes et ne peut pas excéder 4MB.',
      file_label: 'Parcourir...',
      error: 'Le jeu de données ne peut pas excéder 4MB.',
      button: 'Générer les graphiques',
      preview: "Voir l'aperçu",
      failed_to_save:
        "Une erreur est survenue lors de l'import des données. Veuillez vérifier que le format est valide."
    },
    sample: {
      header: 'Exemple',
      label: 'Essayez avec notre échantillon de données',
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n' +
        '                      Curabitur posuere tellus sed blandit lobortis. Ut non eros\n' +
        '                      mattis dolor fermentum malesuada sit amet sit amet nisl.\n' +
        '                      Quisque lorem felis, ultrices in lectus eu, mollis\n' +
        '                      fermentum lorem. Pellentesque tincidunt erat lectus, a\n' +
        '                      faucibus dolor finibus in. Cras hendrerit, leo sit amet\n' +
        '                      commodo auctor, dolor purus facilisis justo, vitae\n' +
        '                      vehicula elit odio id ex. Aliquam malesuada dui at lorem\n' +
        '                      interdum, at dapibus massa vehicula. Sed sodales ut ipsum\n' +
        '                      quis commodo.',
      button: "Générer les graphiques d'exemple"
    },
    howitworks: {
      header: 'Informations',
      top: 'Quels fichiers utiliser ?',
      intro:
        "À l'heure actuelle, VASCO accepte les fichiers <b>.csv</b>, <b>.json</b> et les <b>documents Excel</b>.",
      csv_title: 'Fichers .csv',
      csv:
        'Veillez à ce que votre fichier possède des <b>entêtes</b>, car celles-ci seront utilisées comme variables. Chaque <b>ligne</b> représente une valeur du jeu de donnée. Prenez garde à <b>utiliser uniquement la virgule comme séparateur</b> pour que votre fichier soit traité correctement. Un fichier .txt fonctionnera également',
      json_title: 'Fichiers .json',
      json:
        "Le fichier ne doit avoir <b>qu'un seul niveau de profondeur</b> pour être traité correctement. Chaque <b>objet</b> représente une valeur du jeu de données et les clés seront utilisées comme variables.",
      excel_title: 'Fichiers Excel (.xls & .xlsx)',
      excel:
        '<b>Seule la première feuille</b> du fichier sera prise en compte. Veillez à ce que votre fichier possède des <b>entêtes</b>, car celles-ci seront utilisées comme variables. Chaque <b>ligne</b> représente une valeur du jeu de donnée.'
    }
  },
  graphs: {
    title: 'Générateur de graphiques',
    help: 'Vous pouvez cliquer sur le nom des graphiques pour le modifier.',
    warn: "Cette combinaison de variables n'est pas autorisée.",
    choose_type: 'Choix du type',
    tip_1: 'Choisissez ',
    tip_2: 'une',
    tip_3: ' ou ',
    tip_4: 'deux',
    tip_5: ' variables dans le panel à gauche.',
    save: 'Enregistrer',
    switch_button: 'Échanger les axes',
    ws: 'Mes Workspaces',
    loadWs: 'Charger le Workspace',
    saveWs: 'Enregistrer les variables choisies dans un Workspace',
    toast_saved: 'Workspace enregistré avec succès !',
    toast_deleted: 'Workspace supprimé avec succès !',
    deleteWs: 'Supprimer le Workspace',
    choose_ws_name: 'Sélectionner un nom pour le Workspace',
    ws_name_required: 'Vous devez choisir un nom pour le Workspace.',
    new_ws: 'Nouveau Workspace',
    cancel: 'Annuler',
    info: {
      button: "Plus d'informations",
      title: 'Combinaison de variables',
      typeselection_title: 'Sélection du type',
      typeselection:
        'Le type des variables est automatiquement calculé, mais vous avez la possibilité de le déterminer manuellement en ouvrant une variable. Si le type choisi paraît incohérent, le signe',
      typeselection2:
        'apparaît à côté de son nom. La variable reste utilisable mais risque de produire des graphiques peu pertinents.',
      quantitative: 'Quantitatif - ',
      nominal: 'Nominal - ',
      temporal: 'Temporel - ',
      combination_title: 'Combinaisons possibles',
      single_title: 'Variable seule',
      single:
        "La sélection d'une seule variable créera <b>toutes les combinaisons possibles</b> avec une autre variable du jeu de données. N'importe quel type de variable peut être sélectionné seul.",
      quant_title: 'Variables quantitatives',
      quant: 'Vous pouvez sélectionner <b>deux</b> variables quantitatives (',
      quant2:
        '). Celles-ci se combineront automatiquement avec <b>toutes les autres variables quantitatives</b> encore disponibles. Les variables sélectionnées seront sur les <b>axes</b> et la troisième déterminera la <b>taille</b> des marqueurs sur le graphique.',
      nom_title: 'Variables nominales',
      nom: 'Vous pouvez sélectionner <b>deux</b> variables nominales (',
      nom2:
        '). Les variables nominales ajouteront respectivement une <b>couleur</b> et une <b>forme</b> aux points sur le graphique.',
      temp_title: 'Variables temporelles',
      temp:
        "Vous ne pouvez sélectionner <b>qu'une seule</b> variable temporelle (",
      temp2:
        ") à la fois. De plus, elle bloquera la sélection d'une seconde variable quantitative. La variable temporelle prendra <b>toujours</b> place sur l'axe X, sauf si vous choisissez d'inverser les axes.",
      yourturn: 'Maintenant, à vous de jouer !',
      understood: "J'ai compris"
    }
  },
  url: {
    public: 'Public',
    private: 'Privé',
    add_annot: 'Ajouter une annotation',
    msg_name: 'Votre ',
    msg_name2: ' a été renommé avec succès !',
    msg_public: 'Le graphique est maintenant public.',
    msg_private: 'Le graphique est maintenant privé.',
    mail_subject: 'Analyse collaborative de graphique - ',
    mail_body: 'Je voudrais ton avis sur le graphique disponible ici : ',
    copied: 'Copié !',
    graph_of: 'Graphique proposé par '
  },
  panel: {
    header: 'Bienvenue dans votre atelier, ',
    dataset_button: 'Importer un jeu de données',
    loading: 'Chargement des données...',
    tabs: {
      datasets: 'Jeux de données',
      charts: 'Graphiques',
      annotations: 'Annotations',
      comments: 'Commentaires'
    },
    table: {
      name: 'Nom',
      size: 'Taille(kb)',
      actions: 'Actions',
      url: 'URL',
      user: 'Utilisateur',
      search: 'Rechercher...',
      mine_only: 'Mes graphiques uniquement',
      delete: 'Voulez-vous vraiment supprimer ',
      delete_disclaimer:
        'Cette action est irréversible et entraine la suppression de tout élément en dépendant.',
      delete_cancel: 'Annuler',
      delete_ok: 'Supprimer',
      toast_deleted: ' a été supprimé avec succès.'
    },
    no_data: 'Aucune donnée disponible.',
    deleted_account: '[utilisateur supprimé]'
  },
  settings: {
    header: 'Gestion du compte',
    save: 'Enregistrer les changements',
    toast_saved: 'Modifications enregistrées avec succès !',
    toast_error: 'Erreur, veuillez vérifier les informations saisies.',
    tabs: {
      user: 'Paramètres utilisateur',
      profile: 'Profil personnel',
      password: 'Mot de passe',
      account: 'Options du compte'
    },
    user: {
      title: 'Changement des identifiants',
      email: "Modifier l'adresse email",
      username: "Modifier le nom d'utilisateur"
    },
    profile: {
      title: 'Profil personnel',
      publicname: 'Nom public',
      bio: 'Description',
      bio_placeholder: 'Parlez-nous de vous',
      url: 'Site internet',
      url_placeholder: 'google.com',
      url_error: "Le format de l'URL est invalide.",
      picture: 'Photo de profil',
      picture_placeholder: 'Choisissez votre photo de profil',
      picture_error: "La taille de l'image ne doit pas excéder 1Mb.",
      seemine: 'Voir mon profil'
    },
    password: {
      title: 'Changement de mot de passe',
      oldpsw: 'Ancien mot de passe',
      newpsw: 'Nouveau mot de passe',
      confirmpsw: 'Confirmez le nouveau mot de passe'
    },
    account: {
      title: 'Vie privée',
      title2: 'Suppression du compte',
      public:
        'Vos graphiques sont <b style="color: lightgreen">publics</b> par défaut.',
      private:
        'Vos graphiques sont <b style="color: lightcoral">privés</b> par défaut.',
      switch_public: 'Public',
      switch_private: 'Privé',
      delete_button: 'Supprimer définitivement mon compte',
      delete: 'Souhaitez-vous vraiment supprimer votre compte ?',
      delete_title: 'Cette action est irréversible',
      delete_disclaimer:
        "Cette action est <b>irréversible</b>. Toutefois, vos jeux de données, graphiques, annotations et commentaires seront conservés mais votre nom de compte n'apparaîtra plus.<br/><br/>Confirmez votre mot de passe pour continuer.",
      delete_cancel: 'Annuler',
      delete_ok: 'Oui, je confirme la suppression définitive de mon compte.',
      password: 'Mot de passe',
      toast_error: "Mot de passe erroné. Le compte n'a pas été supprimé."
    }
  },
  user: {
    title: 'Profil',
    title2: 'Graphiques',
    website: 'Site internet : ',
    no_bio: "n'a pas encore rempli sa description.",
    no_graphs: "n'a pas encore proposé de graphiques."
  },
  about: {
    header: 'Le projet VASCO',
    title_1: 'Introduction',
    p_1:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus vel massa sagittis tempus. Sed et urna sed eros gravida eleifend feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis, tempor interdum turpis nec, dignissim rhoncus eros.',
    title_2: 'Visualisation de données',
    p_2:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus vel massa sagittis tempus. Sed et urna sed eros gravida eleifend feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis, tempor interdum turpis nec, dignissim rhoncus eros.',
    title_3: "L'équipe",
    p_3:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus vel massa sagittis tempus. Sed et urna sed eros gravida eleifend feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis, tempor interdum turpis nec, dignissim rhoncus eros.'
  },
  error: {
    404: 'Page introuvable.',
    default_title: "Une erreur s'est produite",
    default_message: "La page demandée n'exsite pas. Veuillez vérifier l'URL.",
    no_data: 'Aucun résultat',
    no_user: 'Utilisateur introuvable',
    not_found:
      "La ressource recherchée n'existe pas ou a été supprimée. Veuillez réessayer.",
    link: {
      panel: 'Votre atelier',
      import: 'Importer des données'
    }
  }
}
