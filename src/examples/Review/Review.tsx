interface FormProps {
  prev: () => void
}

function Review({ prev }: FormProps) {
  return (
    <div>
      <h1>Summary</h1>

      <h2>Personal information</h2>

      <div>
        <p>First name:</p> Fulano
      </div>

      <div>
        <p>Last name:</p> Cicrano
      </div>

      <div>
        <p>Email:</p> fulano@email.com
      </div>

      <div>
        <p>Phone:</p> +42 4235-0187
      </div>

      <h2>Payment Information</h2>

      <div>
        <p>Card number:</p> 2816-2052-3142-8761
      </div>

      <div>
        <p> Expire date: 12/26</p>
      </div>

      <div>
        <button type="button" onClick={prev}>
          Back
        </button>
        <button type="button">Finish</button>
      </div>
    </div>
  )
}

export default Review
