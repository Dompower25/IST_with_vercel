import fetchData from '../helpers/fetchData'
export const getCallBackModuleContent = async () => {
  const data = await fetchData(
    `
        query CallBackData{
            CallBack_Module{
                CallBack_Title
                CallBack_Title_Ru
                Phone_Num
                Phone_Num_Ru
                CallBack_subtitle
                CallBack_subtitle_Ru
                BackImage
                phone_number_ru{
                    phoneNum
                }
            }
        }
        `,
    {
      variables: {},
    },
  )

  return data.data.CallBack_Module
}
