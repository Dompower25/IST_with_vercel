import fetchData from '../helpers/fetchData'
export const getProducts = async () => {
  const data = await fetchData(
    `
        query GetProducts{
            Products{
                id,
                product_name_ru,
                product_name,
                image_url,
                slug,
                text_description,
                price,
                vend_code,
                type_of_equipment,
                available_status
   
                product_manufacturer{
                    manufacturer_category_id{
                        id
                        manufacturer_name
                    }
                }

                product_type{
                    Type_category_id{
                        id,
                        type_name
                    }
                }

                product_unit{
                    Unit_category_id{
                        id,
                        unit_name
                    }
                }
            }
        }
        `,
    {
      variables: {},
    },
  )

  return data.data.Products
}
