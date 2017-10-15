import packageJson from '../../package.json'

export default {
  version: packageJson.version,
  title: '{{ title }}',
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  },
  stripeApiKey: 'pk_'
}
