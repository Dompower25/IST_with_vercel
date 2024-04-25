import React, { Ref } from 'react'
import PhoneInput from 'react-phone-number-input/input'
import styles from './input.module.scss'
import common_styles from '../scss/common.module.scss'
import { commonStyles, IInputDataSetter } from '../common'

interface TStyles extends commonStyles {
  margin?: string
}

export enum inputTypesVars {
  any_string = 'any_string',
  phone = 'phone_num',
}

const defaultStyles = {
  borderRadius: '89px',
  height: '55px',
} as TStyles

type TAnyFunction = (props: unknown) => unknown

interface IIstInput {
  title?: string
  placeholder: string
  inputCaption?: string

  inputType: inputTypesVars
  required: boolean
  style?: TStyles

  outDataSetter: IInputDataSetter
  actualData: string

  onFocus?: TAnyFunction
  onBlur?: TAnyFunction
}

const IstInput = React.forwardRef<HTMLInputElement, IIstInput>(
  (props: IIstInput, ref: Ref<HTMLInputElement>) => {
    return (
      <div className={`${styles.inputForm} ${styles.afterBlock_ISTInput}`}>
        <div
          className={common_styles.title}
          style={{
            display: props?.title ? 'block' : 'none',
          }}
        >
          {props.title}
        </div>
        <div
          className={common_styles.caption}
          style={{
            display: props?.inputCaption ? 'block' : 'none',
          }}
        >
          {props.inputCaption}
        </div>
        <div
          style={{
            margin: props?.style?.margin
              ? props?.style?.margin
              : props.title
                ? '5px 0 0 0'
                : 'unset',
          }}
        >
          {props.inputType === inputTypesVars.any_string ? (
            <input
              type="text"
              placeholder={props.placeholder}
              ref={ref}
              onChange={(e) => props.outDataSetter(e.target.value ?? '')}
              value={props.actualData}
              required={props.required}
              className={`${common_styles.hover_action} ${common_styles.focus_action}`}
              style={{
                borderRadius:
                  props?.style?.borderRadius ?? defaultStyles.borderRadius,
                height: props?.style?.height ?? defaultStyles.height,
              }}
              onFocus={props?.onFocus ?? null}
              onBlur={props?.onBlur ?? null}
            />
          ) : (
            <PhoneInput
              type="text"
              placeholder={props.placeholder}
              ref={ref}
              required={props.required}
              onChange={props.outDataSetter}
              value={props.actualData}
              style={{
                borderRadius:
                  props?.style?.borderRadius ?? defaultStyles.borderRadius,
                height: props?.style?.height ?? defaultStyles.height,
              }}
              className={`${common_styles.hover_action} ${common_styles.focus_action}`}
              onFocus={props?.onFocus ?? null}
              onBlur={props?.onBlur ?? null}
            />
          )}
        </div>
      </div>
    )
  },
)

IstInput.displayName = 'IstInput'
export default IstInput
