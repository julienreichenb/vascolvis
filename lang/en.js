export default {
  title: {
    index: 'Welcome',
    panel: 'My Atelier',
    import: 'Data Importation',
    graphs: 'Charts Generation',
    url: 'Chart Annotation',
    about: 'About'
  },
  index: {
    welcome: 'Welcome on VASCO',
    username: 'Username',
    password: 'Password',
    login: {
      header: 'Login',
      label: 'Please enter your information',
      button: 'Log in'
    },
    register: {
      header: 'Register',
      label: 'Please choose your username and password',
      repeat: 'Repeat your password',
      button: 'Create account'
    },
    error: {
      username_required: 'Username is required.',
      password_required: 'Password is required.',
      username_invalid:
        'The username is too short or contains forbidden characters.',
      password_invalid:
        'The password is too short or contains forbidden characters.',
      not_corresponding: 'The passwords do not match.'
    }
  },
  import: {
    own: {
      header: 'Select a dataset',
      label: 'Your data',
      convert: 'To convert your files in .csv, ',
      click_here: 'click here',
      disclaimer:
        'Your file must contain the headers and cannot be larger than 1 MB.',
      file_label: 'Browse...',
      error: 'The dataset cannot be larger than 1MB.',
      button: 'Generate charts',
      preview: 'See a preview'
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
    }
  },
  graphs: {
    help: 'You can click on the name of the charts to modify it.',
    warn: 'A maximum of two variables can be selected at the same time',
    choose_type: 'Select the type',
    tip_1: 'Choose ',
    tip_2: 'one',
    tip_3: ' or ',
    tip_4: 'two',
    tip_5: ' variables in the panel on the left.',
    save: 'Save'
  },
  url: {
    public: 'Public',
    private: 'Private',
    add_annot: 'Add an annotation',
    msg_public: 'The chart is now public.',
    msg_private: 'The chart is now private.',
    mail_suject: 'Collaborative chart analysis - ',
    mail_body:
      'I would like to know your opinion about the chart, available here : ',
    copied: 'Copied !'
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
    no_data: 'No data available.'
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
  }
}
