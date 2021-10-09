import clsx from 'clsx'
import {
  HTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  useContext,
} from 'react'
import WizardCtx, { IWizard } from './Wizard.context'

/**
 * TODO: Allow passing data (state) through wizard
 * TODO: Build process: export css isolated
 * TODO: Fix CSS (find a beautiful pattern)
 * TODO: Add a README file
 * TODO: Publish
 */

interface WizardProps extends IWizard, HTMLAttributes<HTMLDivElement> {}

function Wizard({ children, ...props }: PropsWithChildren<WizardProps>) {
  const { steps, goTo, getActive, getStepByName, ...rest } = props

  const values = {
    steps,
    goTo,
    getActive,
    getStepByName,
  }

  return (
    <WizardCtx.Provider value={values}>
      <div className="wr-root" {...rest}>
        {children}
      </div>
    </WizardCtx.Provider>
  )
}

function Steps({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) {
  return (
    <ul className={clsx('wr-steps', className)} {...props}>
      {children}
    </ul>
  )
}

interface StepProps extends HTMLAttributes<HTMLLIElement> {
  name: string
}

function Step({ children, name, onClick, className, ...props }: StepProps) {
  const { goTo, getStepByName } = useContext(WizardCtx)

  const targetStep = getStepByName(name)

  function handleClick(ev: MouseEvent<HTMLLIElement>) {
    if (targetStep.active || !targetStep.navigable) {
      return
    }

    goTo(name)
    onClick?.(ev)
  }

  return (
    <li
      {...props}
      onClick={handleClick}
      className={clsx(
        'wr-step',
        {
          active: targetStep.active,
          completed: targetStep.completed,
          'not-allowed': !targetStep.navigable,
        },
        className,
      )}
    >
      {children}
    </li>
  )
}

function Container({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={clsx('wr-container', className)} {...props}>
      {children}
    </div>
  )
}

interface ContentProps extends HTMLAttributes<HTMLElement> {
  name: string
}

function Content({ children, className, name, ...props }: ContentProps) {
  const { getStepByName } = useContext(WizardCtx)

  const step = getStepByName(name)

  return (
    <section
      className={clsx('wr-content', { active: step.active }, className)}
      style={{ display: step.active ? 'block' : 'none' }}
      {...(step.active && { 'data-testid': 'active-content' })}
      {...props}
    >
      {children}
    </section>
  )
}

Wizard.Steps = Steps
Wizard.Step = Step
Wizard.Container = Container
Wizard.Content = Content

export default Wizard
