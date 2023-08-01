import { StaticImageData } from "next/image"

export interface IPropduct {
  id: string
  image: StaticImageData
  name: string
  rating: number
}