import fetchData from '../../helpers/fetchData'
export const getManufacturers = async () => {
  const data = await fetchData(
    `
        query GetManufacturers{
            manufacturer_category{
                id,
                manufacturer_name
            }
        }
        `,
    {
      variables: {},
    },
  )

  return data.data.manufacturer_category
}
