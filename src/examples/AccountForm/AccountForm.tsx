import { FormEvent } from 'react'

interface FormProps {
  next: () => void
}

function AccountForm({ next }: FormProps) {
  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    next()
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Personal information</h1>

      <div>
        <input type="text" placeholder="firstname" />
      </div>

      <div>
        <input type="text" placeholder="lastname" />
      </div>

      <div>
        <input type="email" placeholder="email" />
      </div>

      <div>
        <input type="text" placeholder="phone" />
      </div>

      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  )
}

export default AccountForm
