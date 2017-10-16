import packageJson from '../../package.json'

export default {
  version: packageJson.version,
  title: '{{ title }}'{{#firebase}},
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  }{{/firebase}}{{#tracking}},
  sentry: ''{{/tracking}}{{#payements}},
  stripeApiKey: 'pk_'{{/payements}}
}
