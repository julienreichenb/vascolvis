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
    atelier: 'Mon Atelier',
    rcso:
      "Le projet VASCO est issu d'un projet interne, financé par le Réseau de compétences RCSO du domaine",
    rcsolink: 'Économie et Service de la HES-SO'
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
    demo: {
      header: "VASCO, c'est quoi ?"
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
        'Pour éviter de surcharger le site, votre fichier ne peut pas excéder <b>1.5MB</b>. Veillez à ce que le fichier contienne des <b>entêtes</b>.',
      file_label: 'Parcourir...',
      error: 'Le jeu de données ne peut pas excéder 1.5MB.',
      error_format: 'Le fichier semble mal formaté. Veuillez vérifier.',
      button: 'Générer les graphiques',
      preview: "Voir l'aperçu",
      failed_to_save:
        "Une erreur est survenue lors de l'import des données. Veuillez vérifier que le format est valide."
    },
    sample: {
      header: 'Exemple',
      label: 'Essayez avec notre échantillon de données',
      text:
        "Un jeu de données de test est fourni par Vasco. Celui-ci porte sur des véhicules automobiles et leurs caractéristiques : modèle, provenance, puissance en chevaux, année de mise en service, ... Il permet de tester les différents scénarios couverts par Vasco et de générer des graphiques pertinents. Vous pouvez l'utiliser et faire des expérimentations sur les données en cliquant sur le bouton ci-dessous.",
      button: "Générer les graphiques d'exemple"
    },
    howitworks: {
      header: 'Informations',
      top: 'Quels fichiers utiliser ?',
      intro:
        "À l'heure actuelle, VASCO accepte les tableaux de données en <b>.csv</b> et <b>Excel</b> comprenant des <b>entêtes</b> et <b>aucune ligne vide</b>. Les fichiers <b>.json</b> sont également acceptés.",
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
    tip_1: 'Sélectionnez des variables intéressantes dans le panel de gauche',
    save: 'Enregistrer',
    switch_button: 'Échanger les axes',
    switch_colorshape: 'Échanger couleur/forme',
    hide: 'Masquer',
    ws: 'Mes Workspaces',
    no_ws: 'Aucun Workspace pour le moment.',
    loadWs: 'Charger le Workspace',
    saveWs: 'Enregistrer ces variables dans un Workspace',
    toast_saved: 'Workspace enregistré avec succès !',
    toast_deleted: 'Workspace supprimé avec succès !',
    deleteWs: 'Supprimer le Workspace',
    deleteWs_confirm: 'Êtes-vous sûr ?',
    choose_ws_name: 'Sélectionner un nom pour le Workspace',
    ws_name_required: 'Vous devez choisir un nom pour le Workspace.',
    new_ws: 'Nouveau Workspace',
    cancel: 'Annuler',
    delete: 'Supprimer',
    timeunitlabel: 'Unité temporelle',
    timeformatLabel: 'Inverser format US/EU',
    timeformatTooltip:
      'Si le mois et le jour sont inversés, vous pouvez essayer de les inverser. Veuillez toutefois favoriser un format de date de type "Mois-Jour-Année".',
    type: {
      quantitative: 'Quantitatif',
      nominal: 'Nominal',
      temporal: 'Temporel'
    },
    timeunits: {
      yearmonth: 'Par mois',
      yearquarter: 'Par saison',
      year: 'Par an',
      day: 'Par jour de la semaine',
      date: 'Par jour',
      hours: 'Par heure',
      hoursminutes: 'Par minute',
      hoursminutesseconds: 'Par seconde'
    },
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
        '). Celles-ci se combineront automatiquement avec <b>toutes les autres variables quantitatives</b> encore disponibles. Les variables sélectionnées seront sur les <b>axes</b> et la troisième déterminera la <b>taille</b> des marqueurs sur le graphique. Vous pouvez échanger les axes en cliquant sur ',
      nom_title: 'Variables nominales',
      nom: 'Vous pouvez sélectionner <b>deux</b> variables nominales (',
      nom2:
        '). Les variables nominales ajouteront respectivement une <b>couleur</b> et une <b>forme</b> aux points sur le graphique. Vous pouvez échanger les assignations de couleurs et de formes en cliquant sur ',
      temp_title: 'Variables temporelles',
      temp:
        "Vous ne pouvez sélectionner <b>qu'une seule</b> variable temporelle (",
      temp2:
        ") à la fois. De plus, elle bloquera la sélection d'une seconde variable quantitative. La variable temporelle prendra <b>toujours</b> place sur l'axe X, sauf si vous choisissez d'inverser les axes.",
      workspaces_title: 'Workspaces',
      workspaces:
        "Vous pouvez sauvegarder une sélection des variables intéressantes pour une utilisation ultérieure. Cette sélection s'appelle <b>Workspace</b> et est propre à celui qui la crée. En cliquant sur ",
      workspaces2:
        ', les variables actuellement sélectionnées sont sauvegardées. Vous pouvez supprimer un Workspace en cliquant sur ',
      workspaces3: '. ',
      workspaces4:
        ' vous permet de nettoyer la sélection de variables en un seul clic.',
      yourturn: 'Maintenant, à vous de jouer !',
      understood: "J'ai compris"
    }
  },
  url: {
    public: 'Public',
    private: 'Privé',
    add_annot: 'Ajouter une annotation',
    clean_annot: "Retirer l'annotation",
    reply_annot: 'Répondre',
    msg_name: 'Votre ',
    msg_name2: ' a été renommé avec succès !',
    msg_public: 'Le graphique est maintenant public.',
    msg_private: 'Le graphique est maintenant privé.',
    mail_subject: 'Analyse collaborative de graphique - ',
    mail_body: 'Je voudrais ton avis sur le graphique disponible ici : ',
    fb_body: 'Que pensez-vous de ce graphique ?',
    twitter_body: 'Que pensez-vous de ce graphique ?',
    copied: 'Copié !',
    graph_of: 'Graphique proposé par ',
    toast_annot_success: 'Annotation enregistrée avec succès !',
    toast_annot_error: "Erreur : l'annotation n'a pas pu être enregistrée.",
    toast_annot_delete: 'Annotation supprimée avec succès !',
    posted_at: 'posté le',
    answer: 'réponse',
    answers: 'réponses',
    subject: 'Sujet',
    complement: 'Complément',
    'stands out': ' se démarque de ',
    'is similar': ' est similaire à ',
    comparedto: ' en comparaison de ',
    by: 'Par',
    info: {
      title: 'Annotation du graphique',
      intro:
        'Vous pouvez faire part de vos observations en annotant le graphique. Le bouton ',
      intro_2:
        " permet de créer une nouvelle annotation, à laquelle d'autres utilisateurs pourront répondre, grâce au bouton ",
      intro_3:
        " , sous le fil de la discussion. Pensez à consulter les annotations existantes et à y répondre, afin d'éviter les doublons.",
      module_title: "Module d'annotation",
      module:
        "Vous accédez au module en cliquant sur un des boutons cités ci-dessus. Il se décompose en <b>quatre étapes</b>, dont seules les deux premières sont obligatoires. À l'étape ①, un calque rouge sur le graphique vous permet de sélectionner le ou les éléments que vous souhaitez mettre en évidence. Vous pouvez également donner un nom explicite au groupe d'éléments. À l'étape ②, sélectionnez la raison qui vous pousse à mettre en évidence les éléments du graphique, en y ajoutant éventuellement un commentaire. L'étape ③ est facultative et permet de sélectionner un ou des éléments à comparer avec les premiers. Enfin, vous pouvez laisser une conclusion synthétique à l'étape ④, qui sera le titre de votre annotation.",
      annotations_title: 'Consulter les annotations',
      annotations: ''
    }
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
      date: 'Date',
      workspace: 'Nb de workspaces associés',
      graph: 'Nb de graphs associés',
      annotation: "Nb d'annotations associées",
      replies: 'Nb de réponses',
      graph_url: 'Lien vers le graph',
      graph_name: 'Nom du graph',
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
    no_graphs: "n'a pas encore proposé de graphiques.",
    edit_profile: 'Modifier mon profil',
    isAdmin: "L'utilisateur est administrateur"
  },
  about: {
    header: 'Le projet VASCO',
    p_1:
      "Vasco est un outil de visualisation de données visant les utilisateurs inexpérimentés. Vasco est pensé pour promouvoir l'exploration préliminaire de données pour des utilisateurs sans expérience en design et analyse de données. L'interface de Vasco est structurée pour sélectionner facilement des données et créer des visualisations, au travers de panels et de cartes.",
    title_2: 'Visualisation de données',
    p_2:
      "Les graphiques générés par l'outil sont simplistes, car ils poursuivent un but exploratoire et non d'analyse en profondeur du jeu de données. Lors d'implémentations futures, il est envisageable que des graphiques plus élaborés puissent être générés. Vasco s'appuie sur la librairie de génération de graphiques <a href='https://vega.github.io/vega-lite-v1/' target='_blank'>Vega-Lite</a>.",
    title_3: 'Annotation de graphique',
    p_3:
      "Le deuxième objectif de Vasco est de permettre de collaborer autour de l'exploration de données, via l'utilisation du plugin colVis, développé en parallèle dans le cadre d'un travail de Master. Le plugin permet de mettre en évidence une portion du graphique et de l'annoter ou de commenter les annotations existantes, encourageant ainsi les échanges autour des possibles trouvailles.",
    title_4: "L'équipe",
    p_4:
      '<strong>PhD Florian Evéquoz</strong> - Chef & initiateur du projet<br />' +
      '<strong>Miriam Luque Chipana</strong> - Thèse de Master sur Vasco (UNIFR) & Développement de la première itération du site<br />' +
      '<strong>Pierre Vanhulst</strong> - Thèse de Master sur colVis (UNIFR) <br />' +
      '<strong>Julien Reichenbach</strong> - Assistant de recherche et présent développeur de Vasco',
    demo: "Intéressé par une démo ? C'est par ici"
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
