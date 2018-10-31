if (location.protocol === 'https:') {
  const request = new PaymentRequest(
    [
      {
        supportedMethods: 'https://bobpay.xyz/pay',
        data: {
          supportedNetworks: ['visa', 'master', 'jcb'],
          supportedTypes: ['credit', 'debit', 'prepaid']
        }
      }
    ],
    {
      total: {
        label: 'total',
        amount: { value: '10', currency: 'USD' }
      }
    }
  )
  console.log(request)
}
