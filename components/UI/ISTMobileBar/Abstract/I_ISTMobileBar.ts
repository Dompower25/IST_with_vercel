import {
  commonStyles,
  IInputDataSetter,
  mobileTrigger_size,
} from '../../common'
import { Dispatch } from 'react'

type IISTMobileBar_button = {
  isActive: boolean
  image: string
  title: string
  action: (...props: any) => any
}

type IISTMobileBar_inputOptions = {
  placeholder: string
  state: boolean
  onBlur: (...props: any) => any

  currentData: string
  currentDataSetter: IInputDataSetter
}

export interface IISTMobileBar {
  /**
   * Max length: 4 buttons. Other items will not be displayed
   */
  buttons: IISTMobileBar_button[]

  style: commonStyles
  mobileTriggerSize: mobileTrigger_size

  inputOptions?: IISTMobileBar_inputOptions
}
