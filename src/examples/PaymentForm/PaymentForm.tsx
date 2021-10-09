import { FormEvent } from 'react'

interface FormProps {
  prev: () => void
  next: () => void
}

function Form({ next, prev }: FormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    next()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Payment information</h1>

      <div>
        <input type="text" placeholder="cardNumber" />
      </div>

      <div>
        <input type="text" placeholder="expiration" pattern="dd/dd" />
      </div>

      <div>
        <input type="number" placeholder="cvv" />
      </div>

      <div>
        <button type="button" onClick={prev}>
          Back
        </button>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}

export default Form
