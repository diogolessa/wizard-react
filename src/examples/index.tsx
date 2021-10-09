import Wizard, { useWizard } from 'lib'
import AccountForm from './AccountForm'
import PaymentForm from './PaymentForm'
import Review from './Review'

import './style.css'

function WizardExample() {
  const { next, prev, ...wizardProps } = useWizard([
    {
      name: 'step-1',
      active: true,
    },
    {
      name: 'step-2',
    },
    {
      name: 'step-3',
    },
  ])

  return (
    <div className="container">
      <Wizard {...wizardProps}>
        <Wizard.Steps>
          <Wizard.Step name="step-1">1</Wizard.Step>
          <Wizard.Step name="step-2">2</Wizard.Step>
          <Wizard.Step name="step-3">3</Wizard.Step>
        </Wizard.Steps>
        <Wizard.Container>
          <Wizard.Content name="step-1">
            <AccountForm next={next} />
          </Wizard.Content>
          <Wizard.Content name="step-2">
            <PaymentForm next={next} prev={prev} />
          </Wizard.Content>
          <Wizard.Content name="step-3">
            <Review prev={prev} />
          </Wizard.Content>
        </Wizard.Container>
      </Wizard>
    </div>
  )
}

export default WizardExample
