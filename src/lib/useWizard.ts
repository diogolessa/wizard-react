import { useCallback, useState } from 'react'

interface Steps {
  name: string
  active?: boolean
}

export interface StepsRecord extends Steps {
  navigable: boolean
  completed: boolean
  last: boolean
  first: boolean
}
function stepParamsToState(steps: Steps[]): StepsRecord[] {
  return steps.map((step, index) => {
    return {
      ...step,
      navigable: Boolean(index === 0),
      completed: false,
      last: Boolean(index === steps.length - 1),
      first: Boolean(index === 0),
    }
  })
}

function useWizard(stepsParam: Steps[]) {
  const [steps, setSteps] = useState(stepParamsToState(stepsParam))

  const getActive = useCallback(
    function getActive() {
      for (let i = 0; i < steps.length; i++) {
        if (steps[i].active) {
          return { ...steps[i], index: i }
        }
      }
    },
    [steps],
  )

  const getStepByName = useCallback(
    function getStepByName(name: string) {
      for (let i = 0; i < steps.length; i++) {
        if (steps[i].name === name) {
          return { ...steps[i], index: i }
        }
      }
    },
    [steps],
  )

  function next() {
    const activeStep = getActive()

    if (activeStep.last) {
      return
    }

    const newSteps = steps.map((step, index) => {
      if (step.name === activeStep.name) {
        return { ...step, active: false, completed: true }
      }
      if (index === activeStep.index + 1) {
        return { ...step, active: true, navigable: true }
      }
      return step
    })

    setSteps(newSteps)
  }

  function prev() {
    const activeStep = getActive()

    if (activeStep.first) {
      return
    }

    const newSteps = steps.map((step, index) => {
      if (step.name === activeStep.name) {
        return { ...step, active: false }
      }
      if (index === activeStep.index - 1) {
        return { ...step, active: true }
      }
      return step
    })

    setSteps(newSteps)
  }

  function goTo(name: string) {
    const activeStep = getActive()

    const newSteps = steps.map((step) => {
      if (step.name === activeStep.name) {
        return { ...step, active: false }
      }
      if (step.name === name) {
        return { ...step, active: true }
      }
      return step
    })

    setSteps(newSteps)
  }

  return {
    next,
    prev,
    goTo,
    steps,
    getActive,
    getStepByName,
  }
}

export default useWizard
