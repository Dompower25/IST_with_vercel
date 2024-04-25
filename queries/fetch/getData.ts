export const getData = async <T>(url: string, headers?: any, body?: any) => {
  const headersDef = { 'Content-Type': 'application/json' }

  const res = await fetch(url, {
    method: 'GET',
    headers: headers,
    body: JSON.stringify(body),
  })

  const json = await res.json()

  return new Promise<T>((resolve, reject) => {
    if (json.errors) {
      // throw new Error(json.errors);
      console.error('[queries/FetchData] fetching error')
      return reject(json.error)
    } else {
      return resolve(json)
    }
  })
}
