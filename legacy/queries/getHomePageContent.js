import fetchData from '../helpers/fetchData'
export const getHomePageContent = async () => {
  const data = await fetchData(
    `
            query HomePageData{
                HomePage_Main{
                    Title
                    Title_RU
                    TagLine
                }
                Main_Page_Gallery{
                    id
                    eng
                    ru
                    img
                }
            }
            `,
    {
      variables: {},
    },
  )

  return data.data
}
