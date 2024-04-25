import { ImageLoader } from 'next/image'
import { customImageLoader } from './customImageLoader'
import { useCallback } from 'react'

export const useImageOptimization = (
  cloudinary_acc: string,
  includedNamePart?: string,
  rootPath?: string,
) => {
  const getImageLoader: ImageLoader = useCallback(
    ({ src, width, quality }) => {
      const imageHelper = new customImageLoader(cloudinary_acc)
      const newUrl = imageHelper.customImageLoader({ src, width, quality })
      return newUrl ? newUrl : src
    },
    [cloudinary_acc],
  )

  const getImageSrc = useCallback(
    (src: string, includedNamePart: string, rootPath?: string): string => {
      const imageHelper = new customImageLoader(cloudinary_acc)
      return imageHelper.getCloudinaryImageByUrl(
        src,
        includedNamePart,
        rootPath,
      )
    },
    [cloudinary_acc],
  )

  const sourcedLoader: ImageLoader = useCallback(
    ({ src, width, quality }) => {
      if (!includedNamePart)
        throw new Error(
          'includedNamePart must be specified when calling the sourcedLoader function',
        )

      const newSource = getImageSrc(src, includedNamePart, rootPath)
      return newSource
        ? getImageLoader({
            src: newSource,
            width,
            quality,
          })
        : src
    },
    [getImageLoader, getImageSrc, includedNamePart, rootPath],
  )

  return {
    loader: getImageLoader,
    getSrc: getImageSrc,
    sourcedLoader,
  }
}
