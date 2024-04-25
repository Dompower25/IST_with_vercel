export const getOurContacts = `
    #grphql
    
    query getContacts{ 
        ourContacts{
            phone_number_ru{
                phoneNum
            },
            ourEmail{
                emailAddress
            }
            address,
            address_map
        }
    }
`
