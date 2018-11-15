if (location.protocol === 'https:') {
  const supportedInstruments = [
    {
      supportedMethods: 'basic-card'
    }
  ]

  const details = {
    total: { label: 'Donation', amount: { currency: 'USD', value: '65.00' } },
    displayItems: [
      {
        label: 'Original donation amount',
        amount: { currency: 'USD', value: '65.00' }
      }
    ],
    shippingOptions: [
      {
        id: 'standard',
        label: 'Standard shipping',
        amount: { currency: 'USD', value: '0.00' },
        selected: true
      }
    ]
  }

  const options = { requestShipping: true }
  async function doPaymentRequest() {
    const request = new PaymentRequest(supportedInstruments, details, options)
    // Add event listeners here.
    // Call show() to trigger the browser's payment flow.
    const response = await request.show()
    console.log(response)
    // Process payment.
    const json = response.toJSON()
    const httpResponse = await fetch('/pay/', { method: 'POST', body: json })
    const result = httpResponse.ok ? 'success' : 'failure'

    await response.complete(result)
  }
  doPaymentRequest()
} else {
  alert('Payment Request API works only on HTTPS urls')
}
