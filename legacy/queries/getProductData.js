export const getProductData = `
   #grphql
query GetProductData($product_slug: String){
            Products(filter: {slug: {_eq: $product_slug}}){
                id,
                product_name_ru,
                product_name,
                image_url,
                slug,
                vend_code,
                weight,
                text_description,
                available_status,
                form_factor_image,
                sizes,
                analogue_text,
                replacement_text,
                included_text,
                price, 
                included_in,
                additional_items{
                    related_Products_id{
                        product_name_ru,
                        product_name,
                        image_url,
                        slug
                    }
                }

           

                products_included{
                    related_Products_id{
                            product_name_ru,
                            product_name,
                            image_url
                    }
                }

         

                product_unit{
                    Unit_category_id{
                        unit_name
                    }
                }
                product_type{
                    Type_category_id{
                        type_name
                    }
                }
                product_manufacturer{
                    manufacturer_category_id{
                        manufacturer_name
                    }
                }
               

            }
        }
        `
