import fetchData from '../../helpers/fetchData'
export const getUnits = async () => {
  const data = await fetchData(
    `
        query getUnits{
            Unit_category{
                id,
                unit_name
            }
        }
        `,
    {
      variables: {},
    },
  )

  return data.data.Unit_category
}
