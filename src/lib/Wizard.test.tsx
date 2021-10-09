import Wizard from './Wizard'
import useWizard from './useWizard'
import { render, screen, fireEvent, within } from '@testing-library/react'

function setup() {
  function Component() {
    const { next, prev, ...props } = useWizard([
      { name: 'step-1', active: true },
      { name: 'step-2' },
      { name: 'step-3' },
    ])

    return (
      <Wizard {...props}>
        <Wizard.Steps>
          <Wizard.Step name="step-1">Step 1</Wizard.Step>
          <Wizard.Step name="step-2">Step 2</Wizard.Step>
          <Wizard.Step name="step-3">Step 3</Wizard.Step>
        </Wizard.Steps>
        <Wizard.Container>
          <Wizard.Content name="step-1">
            Content 1
            <br />
            <button onClick={next}>Next</button>
          </Wizard.Content>
          <Wizard.Content name="step-2">
            Content 2
            <br />
            <button onClick={prev}>Prev</button>
            <button onClick={next}>Next</button>
          </Wizard.Content>
          <Wizard.Content name="step-3">
            Content 3
            <br />
            <button onClick={prev}>Prev</button>
          </Wizard.Content>
        </Wizard.Container>
      </Wizard>
    )
  }

  render(<Component />)
}

describe('Wizard', () => {
  it('renders the Wizard', () => {
    setup()

    expect(screen.getByText('Step 1')).toHaveClass('active')
    expect(screen.getByText('Step 2')).not.toHaveClass('active')
    expect(screen.getByText('Step 3')).not.toHaveClass('active')

    screen.getByText('Content 1')
    expect(screen.queryByText('Content 2')).not.toBeVisible()
    expect(screen.queryByText('Content 2')).not.toBeVisible()
  })

  it('navigates next/prev throught buttons', () => {
    setup()

    {
      const { getByText } = within(screen.getByTestId('active-content'))

      fireEvent.click(getByText('Next'))

      expect(screen.getByText('Step 2')).toHaveClass('active')
      expect(screen.getByText('Step 1')).not.toHaveClass('active')
      expect(screen.getByText('Step 3')).not.toHaveClass('active')
    }

    {
      const { getByText } = within(screen.getByTestId('active-content'))

      fireEvent.click(getByText('Next'))

      expect(screen.getByText('Step 3')).toHaveClass('active')
      expect(screen.getByText('Step 1')).not.toHaveClass('active')
      expect(screen.getByText('Step 2')).not.toHaveClass('active')
    }

    {
      const { getByText } = within(screen.getByTestId('active-content'))

      fireEvent.click(getByText('Prev'))

      expect(screen.getByText('Step 2')).toHaveClass('active')
      expect(screen.getByText('Step 1')).not.toHaveClass('active')
      expect(screen.getByText('Step 3')).not.toHaveClass('active')
    }

    {
      const { getByText } = within(screen.getByTestId('active-content'))

      fireEvent.click(getByText('Prev'))

      expect(screen.getByText('Step 1')).toHaveClass('active')
      expect(screen.getByText('Step 2')).not.toHaveClass('active')
      expect(screen.getByText('Step 3')).not.toHaveClass('active')
    }
  })
})
