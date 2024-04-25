export const CreateCallBack = `

    mutation createCallBackItem($data: create_CB_Requests_input!){
        create_CB_Requests_item(data: $data){
            id
        }
    }
`

export const updateCallBack = `
    
    mutation updateCallBackItem($data: update_CB_Requests_input!, $id: ID!){
        update_CB_Requests_item(data: $data, id: $id){
            id 
        }
    }

`
