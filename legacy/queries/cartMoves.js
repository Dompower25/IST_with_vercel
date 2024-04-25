export const createCart = `

    mutation createCartCollectionItem($data: create_cartCollection_input!){
        create_cartCollection_item(data: $data){
            id
        }
    }
`

export const updateCart = `
    
    mutation updateCartCollectionItem($data: update_cartCollection_input!, $id: ID!){
        update_cartCollection_item(data: $data, id: $id){
            id 
        }
    }

`

export const getCart = `
    query getSessionItem($id: ID!){
        cartCollection_by_id(id: $id){
            id
            cart_model
        }
    }

`
