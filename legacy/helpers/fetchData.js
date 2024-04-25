const graphQLAPI = process.env.NEXT_PUBLIC_GRAPHQL

const fetchData = async (query, { variables = {} }) => {
  const headers = { 'Content-Type': 'application/json' }

  // console.log(query, variables);

  const res = await fetch(graphQLAPI, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    // throw new Error(json.errors);
    console.error('[helpers/FetchData] fetching error')
    return null
  }

  return json ? json : null
}

export default fetchData
