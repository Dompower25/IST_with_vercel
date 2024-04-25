import LANDING_PAGE_Q from './LANDING_PAGE_Q.gql'

// PAGE TITLE
type label = {
  main_label: string
  subtitle: string
}

// GALLERY
type TGalleryContent = {
  gallery_content: Array<TGalleryContentItem>
}

type TGalleryContentItem = {
  gallery_items: Array<galleryItem>
}

type galleryItem = {
  gallery_title: string
  gallery_image: string
  gallery_action: string
}

// GALLERY PAGE
type TTranslationGalleryItem = {
  description: string
}

type TGalleryItem = {
  image: string
  action_url: string
  gallery_landig_translation: TTranslationGalleryItem[]
}

type TGalleryPage = TGalleryItem[]

// BACKGROUND
type background_item = {
  Image_URL: string
}

type backgroundPage = {
  back_images: Array<background_item>
}

// LandingPagesData
export interface IPageOfLandingFromQuery {
  main_page: boolean
  page_priority: number
  page_identifier: string
  landing_label: Array<label>
  gallery: TGalleryContent
  gallery_page: TGalleryPage
  background: backgroundPage
}

export interface ILandingFromQuery {
  landing_page: Array<IPageOfLandingFromQuery>
}

export const GET_LANDING_PAGE_CONTENT = LANDING_PAGE_Q
