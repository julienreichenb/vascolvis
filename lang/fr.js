export default {
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
      not_corresponding: 'Les mots de passe ne correspondent pas.'
    }
  },
  import: {
    own: {
      header: 'Sélectionner des données',
      label: 'Vos données',
      convert: 'Pour convertir votre fichier en .csv, ',
      click_here: 'cliquez ici',
      disclaimer:
        'Votre fichier doit contenir les entêtes et ne peut pas excéder 1MB.',
      file_label: 'Parcourir...',
      error: 'Le jeu de données ne peut pas excéder 1MB.',
      button: 'Générer les graphiques',
      preview: "Voir l'aperçu"
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
    help: 'Vous pouvez cliquer sur le nom des graphiques pour le modifier.',
    warn: 'Un maximum de deux variables peuvent être sélectionnées à la fois.',
    tip_1: 'Choisissez ',
    tip_2: 'une',
    tip_3: ' ou ',
    tip_4: 'deux',
    tip_5: ' variables dans le panel à gauche.',
    save: 'Enregistrer'
  },
  url: {
    public: 'Public',
    private: 'Privé',
    add_annot: 'Ajouter une annotation',
    msg_public: 'Le graphique est maintenant public.',
    msg_private: 'Le graphique est maintenant privé.',
    mail_suject: 'Analyse collaborative de graphique - ',
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
  }
}
