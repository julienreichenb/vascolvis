export default {
  title: {
    index: 'Welcome',
    panel: 'My Atelier',
    settings: 'Account settings',
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
        'Your file must contain the headers and cannot be larger than 4MB.',
      file_label: 'Browse...',
      error: 'The dataset cannot be larger than 4MB.',
      button: 'Generate charts',
      preview: 'See a preview',
      failed_to_save:
        'An error occurred during the import. Please be sure to respect the required format.'
    },
    sample: {
      header: 'Sample',
      label: 'Give it a try with our data sample',
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
      button: 'Generate sample charts'
    },
    howitworks: {
      header: 'Informations',
      top: 'Which files can I use ?',
      intro:
        'For now on, VASCO accepts <b>.csv</b>, <b>.json</b> and <b>Excel</b> files.',
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
    switch_button: 'Switch axis'
  },
  url: {
    public: 'Public',
    private: 'Private',
    add_annot: 'Add an annotation',
    msg_public: 'The chart is now public.',
    msg_private: 'The chart is now private.',
    mail_subject: 'Collaborative chart analysis - ',
    mail_body:
      'I would like to know your opinion about the chart, available here : ',
    copied: 'Copied !',
    graph_of: 'Chart proposed by '
  },
  panel: {
    header: 'Welcome in your atelier, ',
    dataset_button: 'Import a dataset',
    tabs: {
      datasets: 'Datasets',
      charts: 'Charts',
      annotations: 'Annotations',
      comments: 'Comments'
    },
    table: {
      name: 'Name',
      size: 'Size(ko)',
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
  about: {
    header: 'The VASCO Project',
    title_1: 'Introduction',
    p_1:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus vel massa sagittis tempus. Sed et urna sed eros gravida eleifend feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis, tempor interdum turpis nec, dignissim rhoncus eros.',
    title_2: 'Data Visualisation',
    p_2:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus vel massa sagittis tempus. Sed et urna sed eros gravida eleifend feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis, tempor interdum turpis nec, dignissim rhoncus eros.',
    title_3: 'The Team',
    p_3:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam lacinia faucibus sapien, nec pulvinar metus auctor in. Ut egestas nulla eget lacus tincidunt suscipit. Nullam dignissim lacus eu suscipit lobortis. Mauris aliquam velit in tellus sagittis, molestie iaculis magna tincidunt. In eget nunc eu ipsum elementum pretium vel id arcu. Donec vulputate ornare mollis. Nulla egestas ipsum sit amet magna vulputate, sed commodo lacus hendrerit. Fusce interdum lacus vel massa sagittis tempus. Sed et urna sed eros gravida eleifend feugiat a augue. Sed faucibus lacinia velit, ullamcorper porttitor ipsum. Aliquam rutrum est sed pulvinar iaculis. Praesent odio felis, tempor interdum turpis nec, dignissim rhoncus eros.'
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
