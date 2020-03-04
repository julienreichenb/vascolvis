export default {
  title: {
    index: 'Welcome',
    panel: 'My Atelier',
    settings: 'Account settings',
    user: 'Profile of ',
    import: 'Data Importation',
    graphs: 'Charts Generation',
    url: 'Chart Annotation',
    about: 'About'
  },
  layout: {
    atelier: 'My Atelier'
  },
  index: {
    welcome: 'Welcome on VASCO',
    username: 'Username or email address',
    password: 'Password',
    login: {
      header: 'Login',
      label: 'Please enter your information',
      button: 'Log in'
    },
    register: {
      header: 'Register',
      username: 'Username',
      email: 'Email address',
      label: 'Please choose your username and password',
      repeat: 'Repeat your password',
      button: 'Create account'
    },
    error: {
      username_required: 'Username is required.',
      email_required: 'Email is required.',
      email_invalid: 'The email format is invalid.',
      password_required: 'Password is required.',
      username_invalid:
        'The username is too short or contains forbidden characters.',
      password_invalid:
        'The password is too short or contains forbidden characters.',
      not_corresponding: 'The passwords do not match.',
      username_already_exist: 'The chosen username already exists.',
      email_already_exist: 'The chosen email address is already used.',
      invalid: 'Invalid username or password. Please check your credentials.'
    }
  },
  import: {
    own: {
      header: 'Select a dataset',
      label: 'Your data',
      convert: 'If needed, to convert your files in .csv, ',
      click_here: 'click here',
      disclaimer:
        'Your file must contain the headers and cannot be larger than 1.5MB.',
      file_label: 'Browse...',
      error: 'The dataset cannot be larger than 1.5MB.',
      error_format: 'The file seems wrongly formatted. Please check.',
      button: 'Generate charts',
      preview: 'See a preview',
      failed_to_save:
        'An error occurred during the import. Please be sure to respect the required format.'
    },
    sample: {
      header: 'Sample',
      label: 'Give it a try with our data sample',
      text:
        'A dataset for testing purpose is provided by Vasco. It is about cars and their features : model, origin, horsepower, start year, ... It gives the opportunity to try out the different use cases covered by Vasco and to generate relevant charts. You can use it and start doing your experiments on the data by clicking on the button below.',
      button: 'Generate sample charts'
    },
    howitworks: {
      header: 'Informations',
      top: 'Which files can I use ?',
      intro:
        'For now on, VASCO accepts data tables in <b>.csv</b> and <b>Excel</b> which have <b>headers</b> and <b>no empty line</b>. <b>.json</b> files are also accepted.',
      csv_title: '.csv files',
      csv:
        'Take care that your file has <b>headers</b>, because they will be used as variables. Each <b>line</b> is a dataset value. Please be aware to <b>use exclusively the comma as a separator</b> to ensure your file parsing. A .txt is also valid',
      json_title: '.json files',
      json:
        'The file must have <b>a single depth level only</b> to be correctly parsed. Each <b>object</b> is a dataset value and the keys will be used as variables.',
      excel_title: 'Excel files (.xls & .xlsx)',
      excel:
        '<b>Only the first sheet</b> of the file will be used. Take care that your file has <b>headers</b>, because they will be used as variables. Each <b>line</b> is a dataset value.'
    }
  },
  graphs: {
    title: 'Charts generator',
    help: 'You can click on the name of the charts to modify it.',
    warn: 'This variable combination is not allowed.',
    choose_type: 'Select the type',
    tip_1: 'Choose ',
    tip_2: 'one',
    tip_3: ' or ',
    tip_4: 'two',
    tip_5: ' variables in the panel on the left.',
    save: 'Save',
    switch_button: 'Switch axis',
    switch_colorshape: 'Switch color/shape',
    hide: 'Hide',
    ws: 'My Workspaces',
    no_ws: 'No Workspace yet.',
    loadWs: 'Load the Workspace',
    saveWs: 'Save those variables in a Workspace',
    toast_saved: 'Workspace successfully saved !',
    toast_deleted: 'Workspace successfully deleted !',
    deleteWs: 'Delete the Workspace',
    deleteWs_confirm: 'Are you sure ?',
    choose_ws_name: 'Choose a name for the Workspace',
    ws_name_required: 'You have to choose a name for the Workspace.',
    new_ws: 'New Workspace',
    cancel: 'Cancel',
    delete: 'Delete',
    timeunitlabel: 'Time unit',
    timeformatLabel: 'Invert US/EU format',
    timeformatTooltip:
      'If the month and the day are revsersed, you can try to invert them. Please try as much as possible to have a date format like "Month-Day-Year".',
    type: {
      quantitative: 'Quantitative',
      nominal: 'Nominal',
      temporal: 'Temporal'
    },
    timeunits: {
      yearmonth: 'By month',
      yearquarter: 'By season',
      year: 'By year',
      day: 'By day',
      hours: 'By hour',
      hoursminutes: 'By minutes',
      hoursminutesseconds: 'By seconds'
    },
    info: {
      button: 'More informations',
      title: 'Variables combinations',
      typeselection_title: 'Type selection',
      typeselection:
        'The variable type is automatically computed, but you still can determine it yourself by opening a variable. If the chosen type seems incoherent, the sign',
      typeselection2:
        'appears next to its label. The variable remains usable but might produce charts with low pertinence.',
      quantitative: 'Quantitative - ',
      nominal: 'Nominal - ',
      temporal: 'Temporal - ',
      combination_title: 'Available combinations',
      single_title: 'Single variable',
      single:
        'The selection of a single variable will create <b>all the possible combinations</b> with another variable from the dataset. Every kind of variable type can be selected alone.',
      quant_title: 'Quantitative variables',
      quant: 'You can choose <b>two</b> quantitative variables (',
      quant2:
        '). Those will be combined with <b>all the other quantitative variables</b> remaining. The selected variables will be on the <b>axes</b> and the third one will vary the <b>size</b> of the chart marks. You can switch the axis by clicking ',
      nom_title: 'Variables nominales',
      nom: 'You can choose <b>two</b> nominal variables (',
      nom2:
        '). The nominal variables will respectively give a <b>color</b> and a <b>shape</b> to the points on the chart. You can swap the color and the shape assignations by clicking ',
      temp_title: 'Temporal variables',
      temp: 'You can choose <b>only one</b> temporal variable (',
      temp2:
        ') at the time. Furthermore, it will restrict the selection of another quantitative variable. The temporal variable will <b>always</b> take place on the X axe, except if you choose to switch the axes.',
      yourturn: "Now, it's your turn !",
      understood: 'Understood'
    }
  },
  url: {
    public: 'Public',
    private: 'Private',
    add_annot: 'Add an annotation',
    clean_annot: 'Remove the annotation',
    reply_annot: 'Reply',
    msg_public: 'The chart is now public.',
    msg_private: 'The chart is now private.',
    mail_subject: 'Collaborative chart analysis - ',
    mail_body:
      'I would like to know your opinion about the chart, available here : ',
    fb_body: 'What do you think about this chart ?',
    twitter_body: 'What do you think about this chart ?',
    copied: 'Copied !',
    graph_of: 'Chart proposed by ',
    toast_annot_success: 'Annotation successfully saved !',
    toast_annot_error: "Error : the annotation couldn't be saved.",
    toast_annot_delete: 'Annotation successfully deleted !',
    posted_at: 'posted at',
    answer: 'answer',
    answers: 'answers',
    subject: 'Subject',
    complement: 'Complement',
    by: 'By',
    info: {
      title: 'Chart annotation',
      intro: 'You can share your views by annotating the chart. The button ',
      intro_2:
        ' allows you to create a new annotation, that can be discussed by other users, using the button ',
      intro_3:
        ' , under the thread of the root-annotation. Take care of answering the existing annotations before creating a new one, in order to avoid duplicates.',
      module_title: 'Annotation module',
      module:
        'You can access the module by clicking one of the buttons quoted below. It is split in <b>four steps</b>, whose only first two are mandatory. At step ①, a red layer applied on the chart allows you to select one or more elements that deserve to be highlighted. You can also give a name to the group. At step ②, choose the reason why you highlighted the portion of the chart and eventually add a comment. The step ③ is optional and allows to choose one or more elements to compare with the first group. You can finally leave a synthetical conclusion at step ④, that will act as the title of your annotation.',
      annotations_title: 'Look through annotations',
      annotations: ''
    }
  },
  panel: {
    header: 'Welcome in your atelier, ',
    dataset_button: 'Import a dataset',
    loading: 'Loading data...',
    tabs: {
      datasets: 'Datasets',
      charts: 'Charts',
      annotations: 'Annotations',
      comments: 'Comments'
    },
    table: {
      name: 'Name',
      size: 'Size(ko)',
      date: 'Date',
      workspace: 'Nb of associated workspaces',
      graph: 'Nb of associated charts',
      annotation: 'Nb of associated annotations',
      replies: 'Nb of replies',
      graph_url: 'Chart link',
      graph_name: 'Chart name',
      actions: 'Actions',
      url: 'URL',
      user: 'User',
      search: 'Search...',
      mine_only: 'My charts only',
      delete: 'Do you really want to delete ',
      delete_disclaimer:
        'This action cannot be rolled back and leads to the deletion of any depending elements.',
      delete_cancel: 'Cancel',
      delete_ok: 'Delete',
      toast_deleted: ' has been successfully deleted.'
    },
    no_data: 'No data available.',
    deleted_account: '[deleted user]'
  },
  settings: {
    header: 'Account Management',
    save: 'Apply changes',
    toast_saved: 'Changes has been saved successfully !',
    toast_error: 'Error, please verify the entered information.',
    tabs: {
      user: 'User settings',
      profile: 'Personal profile',
      password: 'Password',
      account: 'Account options'
    },
    user: {
      title: 'Login edition',
      email: 'Edit email address',
      username: 'Edit username'
    },
    profile: {
      title: 'Personal profile',
      publicname: 'Public username',
      bio: 'Description',
      bio_placeholder: 'Tell us more about you',
      url: 'Website',
      url_placeholder: 'google.com',
      url_error: 'The URL format is not valid.',
      picture: 'Profile picture',
      picture_placeholder: 'Choose your profile picture',
      picture_error: 'The picture size cannot go beyond 1Mb.',
      seemine: 'See my profile'
    },
    password: {
      title: 'Password edition',
      oldpsw: 'Old password',
      newpsw: 'New password',
      confirmpsw: 'Confirm the new password'
    },
    account: {
      title: 'Privacy',
      title2: 'Account deletion',
      public:
        'Your charts are <b style="color: lightgreen">public</b> by default.',
      private:
        'Your charts are <b style="color: lightcoral">private</b> by default.',
      switch_public: 'Public',
      switch_private: 'Private',
      delete_button: 'Permanently delete my account',
      delete: 'Do you really want to delete your account ?',
      delete_title: 'This action is irreversible',
      delete_disclaimer:
        'This action is <b>irreversible</b>. However, your datasets, graphs, annotations and comments will be kept but your username will not appear anymore.<br/><br/>Confirm your password to delete your account.',
      delete_cancel: 'Cancel',
      delete_ok: 'Yes, I confirm the permanent deletion of my account.',
      password: 'Password',
      toast_error: 'Wrong password. Your account has not be deleted.'
    }
  },
  user: {
    title: 'Profile',
    title2: 'Charts',
    website: 'Website : ',
    no_bio: 'has not yep filled his bio.',
    no_graphs: 'has not yet generated charts.',
    edit_profile: 'Edit my profile',
    isAdmin: 'The user is an administrator'
  },
  about: {
    header: 'The VASCO Project',
    p_1:
      'Vasco is a data visualization tool for inexperienced users. Vasco is de-\n' +
      'signed to allow and promote early exploration of data, targeting users\n' +
      'without experience in the design of visualizations and data analysis.\n' +
      'Vasco structures the interface to select easily data and create visual-\n' +
      'izations, using panels and cards.',
    title_2: 'Data Visualisation',
    p_2:
      "The charts generated by the tool are simplistic, because they serve an exploratory purpose, not in-depth analysis. During the next implementations, it could be possible to create more elaborated charts. Vasco is using the chart library <a href='https://vega.github.io/vega-lite-v1/' target='_blank'>Vega-Lite</a>.",
    title_3: 'Chart annotation',
    p_3:
      'The second goal of Vasco is to allow collaboration around the data exploration, by using the colVis plugin, developed aside in the context of a Master thesis. The plugin allows to highlight a graph part and to annotate it or to attach a comment to an existing annotation, to encourage discussions around the potential findings.',
    title_4: 'The Team',
    p_4:
      '<strong>PhD Florian Evéquoz</strong> - Project manager & initiator <br />' +
      '<strong>Miriam Luque Chipana</strong> - Master Thesis on Vasco (UNIFR) & Development of the project prequel <br />' +
      '<strong>Pierre Vanhulst</strong> - Master Thesis on colVis (UNIFR) <br />' +
      '<strong>Julien Reichenbach</strong> - Research Assistant & current Vasco developer'
  },
  error: {
    404: 'Page not found.',
    default_title: 'An error occured',
    default_message: 'The requested page does not exist. Please check the URL.',
    no_data: 'No result',
    no_user: 'User not found',
    not_found:
      'The requested ressource does not exist or has been removed. Please try again.',
    link: {
      panel: 'Your atelier',
      import: 'Import data'
    }
  }
}
