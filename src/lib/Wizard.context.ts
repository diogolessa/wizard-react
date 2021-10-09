import { createContext } from 'react'
import type { StepsRecord } from './useWizard'

type WithIndex<T> = T & { index: number }

export interface IWizard {
  steps: StepsRecord[]
  goTo: (name: string) => void
  getActive: () => WithIndex<StepsRecord>
  getStepByName: (name: string) => WithIndex<StepsRecord>
}

const WizardContext = createContext<IWizard>({} as IWizard)

export default WizardContext
