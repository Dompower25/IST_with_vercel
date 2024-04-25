import {
  ILandingBackgroundItem,
  IPageBackground,
} from '../../components/LandingPages/DefaultLandingPage/common'
import {
  IGallery,
  TGallerySlide,
} from '../../components/LandingPages/GalleryTypes'
import { IPageOfLandingFromQuery } from '../../queries/landingPages/landingPage'

// DEPRECATED
export const getGalleryOfPage_landingHelper = (
  pageFromResponse: IPageOfLandingFromQuery,
): IGallery => {
  if (!pageFromResponse?.gallery?.gallery_content) return

  const galleryCont = pageFromResponse.gallery.gallery_content[0]
  const galleryOut: IGallery = {
    slides: new Array<TGallerySlide>(),
  }
  if (galleryCont) {
    galleryCont.gallery_items.map((gal_item, gal_index) => {
      const newGalItem: TGallerySlide = {
        image: gal_item.gallery_image,
        title: gal_item.gallery_title,
        list_num: gal_index,
        action: gal_item.gallery_action,
      }
      galleryOut.slides.push(newGalItem)
    })
  }
  return galleryOut
}

export const getLandingGalleryOfPage_landingHelper = (
  pageFromResponse: IPageOfLandingFromQuery,
): IGallery => {
  if (!pageFromResponse?.gallery?.gallery_content) return
  const galleryCont = pageFromResponse.gallery_page
  const galleryOut: IGallery = {
    slides: new Array<TGallerySlide>(),
  }
  if (galleryCont) {
    galleryCont.map((gal_item, gal_index) => {
      const currentTranslation = gal_item.gallery_landig_translation[0]
      const newGalItem: TGallerySlide = {
        image: gal_item.image,
        title: currentTranslation?.description || '',
        list_num: gal_index,
        action: gal_item.action_url,
      }
      galleryOut.slides.push(newGalItem)
    })
  }
  return galleryOut
}

export const getPageBackgroundMatrix_landingHelper = (
  pageFromResponse: IPageOfLandingFromQuery,
  back_props: Array<Omit<ILandingBackgroundItem, 'data'>>,
): IPageBackground => {
  const backItems: Array<ILandingBackgroundItem> =
    new Array<ILandingBackgroundItem>()
  pageFromResponse.background.back_images.map((elem, index) => {
    const newInputData: ILandingBackgroundItem = {
      data: elem.Image_URL,
      contentOffset: back_props[index]
        ? {
            top: back_props[index].contentOffset.top,
            left: back_props[index].contentOffset.left,
          }
        : {
            top: 0,
            left: 0,
          },
      contentDistance: back_props[index]
        ? back_props[index].contentDistance
        : 1,
    }
    backItems.push(newInputData)
  })

  const newPageBg: IPageBackground = {
    backgroundItems: backItems,
    backgroundCrossFilling: true,
  }

  return newPageBg
}
