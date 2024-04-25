export const getProductBy_id = `
        query getProductData($id: Float){
            Products(filter: {id: {_eq: $id}}){
                     product_name_ru,
                product_name,
                image_url,
                slug,
                vend_code,
                weight,
                text_description,
                available_status,
                price, 
                included_in

            }
        }
        `
