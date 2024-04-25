import { Cloudinary } from '@cloudinary/url-gen'
import { scale } from '@cloudinary/url-gen/actions/resize'
import { ImageLoader } from 'next/image'

export class customImageLoader {
  constructor(cloudName: string) {
    this.cloudName = cloudName
  }

  cloudName: string

  customImageLoader: ImageLoader = ({ src, width, quality }) => {
    const cld = new Cloudinary({
      cloud: {
        cloudName: this.cloudName,
      },
    })

    const myImage = cld
      .image(src)
      .format('bmp')
      .quality(quality || 75)

      .resize(scale().width(width > 500 ? 500 : width))

    return myImage.toURL()
  }

  getCloudinaryImageByUrl = (
    src: string,
    includedNamePart: string,
    rootPath?: string,
  ): string => {
    const data = src.split('/')
    const fautName = data.filter((word) =>
      word.toLowerCase().includes(includedNamePart.toLowerCase()),
    )

    if (fautName && fautName.length > 0)
      return `${rootPath ? rootPath + '/' : ''}${fautName[0]}`

    return null
  }
}
