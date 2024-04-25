import { mobileTrigger_size } from '../UI/common'

export type TGallerySlide = {
  image: string
  title: string
  list_num: number
  action?: string | null
}

export interface IGallery {
  slides: Array<TGallerySlide>
  triggerMobileSize?: mobileTrigger_size
}
