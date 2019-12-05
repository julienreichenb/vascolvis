export default {
  title: {
    index: 'Bienvenue',
    panel: 'Mon Atelier',
    import: 'Importation de données',
    graphs: 'Générateur de graphiques',
    url: 'Annotation du graphique',
    about: 'À propos'
  },
  index: {
    welcome: 'Bienvenue sur VASCO',
    username: "Nom d'utilisateur",
    password: 'Mot de passe',
    login: {
      header: 'Se connecter',
      label: 'Saisissez vos informations',
      button: 'Se connecter'
    },
    register: {
      header: "S'enregistrer",
      label: "Choisissez un nom d'utilisateur et un mot de passe.",
      repeat: 'Répétez le mot de passe',
      button: 'Créer le compte'
    },
    error: {
      username_required: "Le nom d'utilisateur est requis.",
      password_required: 'Le mot de passe est requis.',
      username_invalid:
        "Le nom d'utilisateur est trop court ou contient des caractères interdits.",
      password_invalid:
        'Le mot de passe est trop court ou contient des caractères interdits.',
      not_corresponding: 'Les mots de passe ne correspondent pas.',
      already_exist: "Le nom d'utilisateur choisi existe déjà.",
      invalid:
        "Nom d'utilisateur ou mot de passe invalide. Veuillez vérifier vos identifiants."
    }
  },
  import: {
    own: {
      header: 'Sélectionner des données',
      label: 'Vos données',
      convert: 'Pour convertir votre fichier en .csv, ',
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
    switch_button: 'Échanger les axes'
  },
  url: {
    public: 'Public',
    private: 'Privé',
    add_annot: 'Ajouter une annotation',
    msg_public: 'Le graphique est maintenant public.',
    msg_private: 'Le graphique est maintenant privé.',
    mail_subject: 'Analyse collaborative de graphique - ',
    mail_body: 'Je voudrais ton avis sur le graphique disponible ici : ',
    copied: 'Copié !'
  },
  panel: {
    header: 'Bienvenue dans votre atelier, ',
    dataset_button: 'Importer un jeu de données',
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
    no_data: 'Aucune donnée disponible.'
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
    not_found:
      "La ressource recherchée n'existe pas ou a été supprimée. Veuillez réessayer.",
    link: {
      panel: 'Votre atelier',
      import: 'Importer des données'
    }
  }
}
