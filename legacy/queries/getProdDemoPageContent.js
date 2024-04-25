import fetchData from '../helpers/fetchData'
export const getProdDemoPageContent = async () => {
  const data = await fetchData(
    `
        query ProdDemoData{
            Home_Page_our_products{
                Titel
                Title_Ru
                Have_q_label
                Have_q_label_Ru
                Linker
                Linker_Ru
            }
            ProdDemo_Cards{
                id
                Image
                Title
            }
        }
        `,
    {
      variables: {},
    },
  )

  // console.log(data);
  return data.data
}
