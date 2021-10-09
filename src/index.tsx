import ReactDOM from 'react-dom'
import WizardExample from 'examples'

const root = document.getElementById('root')

ReactDOM.render(<WizardExample />, root)

if (module.hot) {
  module.hot.accept()
}
