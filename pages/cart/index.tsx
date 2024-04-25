import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import ISTCartTotalSum, {
  ICartTotalSum_translation,
} from '../../components/UI/ISTCartTotalSum'
import { CartWrapper } from '../../components/ProductsWrapper/cartWrapper/cartWrapper'
import { ICartSelector_type } from '../../components/UI/ISTProductItem/Abstract/ICartTypes'
import { useTransition } from '../../Hooks/useTranslation/useTranslation'
import { EN_LOCALE, RU_LOCALE } from '../../locales/locales'
import ru_upd from '../../locales/cartTotalSum/ru'
import en_upd from '../../locales/cartTotalSum/en'
import { useAppSelector } from '../../Hooks/reduxSettings'
import useBaseModal from '../../Hooks/useBaseModal/useBaseModal'
import OrderingModal from '../../components/DefaultModals/Order/OrderingModal'
import { useQueryBuilder } from '../../Hooks/useQueryBuilder/useQueryBuilder'
import { ICartSelected } from '../../components/DefaultModals/Order/common'
import DefaultLandingPage from '../../components/LandingPages/DefaultLandingPage'
import { LandingLayout } from '../../layouts/landingLayout'
import { useDispatch } from 'react-redux'
import { loadingModalSetState } from '../../store/slices/modalSlice/modalSlice'
import { loadingModalCartData } from '../../store/boilerplates/loadingModalBP'
import { IEmptyCartMessage } from '../../components/ProductsWrapper/cartWrapper/ICartWrapper'
import {
  cartEmptyMessage_en_translation,
  cartEmptyMessage_ru_translation,
} from '../../locales/pages/cartPage/locales'

const CartPage = ({}) => {
  // REDUX
  const region = useAppSelector((sel) => sel.region)
  const dispatch = useDispatch()

  // CART SELECTOR / TOTAL SUM
  const [cartSelector, setCartSelector] = useState<ICartSelector_type[]>([])
  const [numOfSelected, setNumOfSelected] = useState<number>(0)
  const [totalSum, setTotalSum] = useState<number>(0)

  //LOADING STATE
  const [loadingModal_cartData, setLoadingModal_cartData] =
    useState<boolean>(false)

  // const [loadingModal_cartSelected, setLoadingModal_cartSelected] =
  //   useState<boolean>(false);

  // useEffect(() => {
  //   LoadingModalComponent.switch(
  //     loadingModal_cartData || loadingModal_cartSelected
  //   );
  // }, [LoadingModalComponent, loadingModal_cartData, loadingModal_cartSelected]);

  useEffect(() => {
    dispatch(
      loadingModalSetState({
        name: loadingModalCartData,
        state: loadingModal_cartData,
      }),
    )
  }, [dispatch, loadingModal_cartData])

  // TRANSLATION
  const totalSumTranslation = useTransition<ICartTotalSum_translation>([
    { locale: RU_LOCALE, translation: ru_upd },
    { locale: EN_LOCALE, translation: en_upd },
  ])

  const cartIsEmptyTranslation = useTransition<IEmptyCartMessage>([
    { locale: RU_LOCALE, translation: cartEmptyMessage_ru_translation },
    { locale: EN_LOCALE, translation: cartEmptyMessage_en_translation },
  ])

  // QUERY HANDLING
  const { pushToQuery } = useQueryBuilder<ICartSelected>()
  const pushSelectedItemsToQuery = useCallback(() => {
    const newIDsArray = new Array<string>()
    cartSelector.map((el) => newIDsArray.push(el.id.toString()))

    if (newIDsArray.length > 0) {
      pushToQuery({
        cartSelected: newIDsArray,
      })
      // .then(() => {
      //   setOrderingPopUpState(true);
      // });
    }
  }, [cartSelector, pushToQuery])

  return (
    <>
      <DefaultLandingPage
        landingDescription={{
          title: null,
          titleOffset: 100,
        }}
      >
        <div className={`col-12 col-lg-7 position-relative`}>
          <CartWrapper
            loadingSetter={setLoadingModal_cartData}
            cartSelector={{
              selectedState: cartSelector,
              setSelectedState: setCartSelector,
            }}
            cartEmptyMessage={cartIsEmptyTranslation.translation}
            amountData={{
              amountQuantitySetter: setNumOfSelected,
              amountPriceSetter: setTotalSum,
            }}
            itemStyles={{
              style: {
                margin: '0 0 15px 0',
                fill: true,
              },
            }}
            wrapperStyles={{
              width: '100%',
              maxWidth: '550px',
            }}
            mobileTriggerSize={'LG_992'}
          />
        </div>

        <div
          className={`col-0 d-lg-block col-lg-5`}
          style={{
            position: 'sticky',
            bottom: '0px',
          }}
        >
          {region.region && region.currency[region.currentCurrencyId] ? (
            <ISTCartTotalSum
              totalSelect={numOfSelected}
              totalSum={totalSum}
              region={{
                currencySymbol:
                  region.currency[region.currentCurrencyId]?.currencySymbol,
                region: region.region,
              }}
              translation={totalSumTranslation?.translation}
              sendOrderFun={() => {
                pushSelectedItemsToQuery()
              }}
            />
          ) : (
            <ISTCartTotalSum
              totalSelect={0}
              totalSum={0}
              region={{
                currencySymbol: null,
                region: null,
              }}
              translation={totalSumTranslation?.translation}
            />
          )}
        </div>
      </DefaultLandingPage>

      {/* LOADING MODAL */}
      {/* <LoadingModalView>
        <LoaderModal />
      </LoadingModalView> */}

      {/* CART ORDERING MODAL */}

      {/* <OrderingModal
        loadingSetter={setLoadingModal_cartSelected}
        modalState={{
          modalState: orderingPopUpState,
          modalStateSetter: setOrderingPopUpState,
        }}
        selectedProducts={numOfSelected}
        totalSum={totalSum}
      /> */}
    </>
  )
}

const getLayout = (page: ReactElement) => {
  return <LandingLayout>{page}</LandingLayout>
}

CartPage.getLayout = getLayout
export default CartPage
