const api = {
  async ApiCall(request) {
    let url = 'https://www.dnd5eapi.co'
    let call = await fetch(url + request)
      .then((results) => {
        return results.json()
      })
      .then((data) => {
        return data
      })
    return call
  }
}

export { api }