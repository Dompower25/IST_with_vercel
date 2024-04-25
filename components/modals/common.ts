type BooleanOrOriginal<T> = T extends boolean ? boolean : T

export type IModalsList<T> = {
  [K in keyof T]: BooleanOrOriginal<T[K]>
}
