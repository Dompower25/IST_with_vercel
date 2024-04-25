import fetchData from '../../helpers/fetchData'
export const getTypes = async () => {
  const data = await fetchData(
    `
        query GetTypes{
            Type_category{
                id,
                type_name
            }
        }
        `,
    {
      variables: {},
    },
  )

  return data.data.Type_category
}
