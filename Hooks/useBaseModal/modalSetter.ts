export interface IModalOptions {
  modals: modalsBasics[]
  startModalIndex?: number
}

export interface modalsBasics {
  typeName: string
  _header: string
  _paragraph: string
}

export interface indexedModal {
  modal: modalsBasics
  index: number
}

export const defaultModalName = {
  defModalName: 'default',
  defModalHeader: 'Hello, modal',
  defModalParagraph: 'This is paragraph',
}

export class modalStater {
  private modalName: string
  private header: string
  private paragraph: string
  private state: boolean = false
  private dataUpdater: React.Dispatch<modalStater>
  private modalsTypes: modalsBasics[] = []
  private onClose?: Function

  constructor(
    header = '',
    paragraph = '',
    modalName = '',
    state = false,
    dataUpdater: React.Dispatch<modalStater> | null = null,
  ) {
    this.state = state
    this.dataUpdater = dataUpdater

    this.modalsTypes.push({
      typeName: modalName || defaultModalName.defModalName,
      _header: header || defaultModalName.defModalHeader,
      _paragraph: paragraph || defaultModalName.defModalParagraph,
    })

    this.modalName = this.modalsTypes[0].typeName
    this.header = this.modalsTypes[0]._header
    this.paragraph = this.modalsTypes[0]._paragraph
  }

  public editModal(header: string, paragraph: string): void {
    this.header = header
    this.paragraph = paragraph
    this.update()
  }

  public editModals(
    modals: modalsBasics[],
    startModalIndex: number = 0,
    addNew: boolean = false,
  ): void {
    this.modalsTypes = addNew ? [...this.modalsTypes, ...modals] : modals
    this.updateModalProperties(startModalIndex)
  }

  get getHeader(): string {
    return this.header
  }

  get getParagraph(): string {
    return this.paragraph
  }

  get getState(): boolean {
    return this.state
  }

  get getModalName(): string {
    return this.modalName
  }

  public isCurrentModal(name: string): boolean {
    return name && name.toLowerCase() === this.modalName.toLowerCase()
  }

  public getModalByName(name: string): indexedModal | null {
    if (name) {
      const index = this.modalsTypes.findIndex(
        (e) => e.typeName.toLowerCase() === name.toLowerCase(),
      )

      return index !== -1 ? { modal: this.modalsTypes[index], index } : null
    }

    return null
  }

  public applyModalByName(name: string): Promise<indexedModal | null> {
    return new Promise((resolve) => {
      const newModal = this.getModalByName(name)

      if (newModal) {
        this.header = newModal.modal._header
        this.paragraph = newModal.modal._paragraph
        this.modalName = newModal.modal.typeName
        resolve(newModal)
      } else {
        resolve(null)
      }
    })
  }

  public switch(newState: boolean): void {
    if (!newState && newState !== undefined && this.onClose) this.onClose()

    this.state = newState
    this.update()
  }

  set setOnClose(callback: Function) {
    this.onClose = callback
  }

  public setDataUpdater(updater: React.Dispatch<modalStater>) {
    this.dataUpdater = updater
  }

  private update(): void {
    if (this.dataUpdater) {
      this.dataUpdater(
        new modalStater(
          this.header,
          this.paragraph,
          this.modalName,
          this.state,
          this.dataUpdater,
        ),
      )
    }
  }

  private updateModalProperties(index: number): void {
    const modal = this.modalsTypes[index]
    this.header = modal?._header || defaultModalName.defModalHeader
    this.paragraph = modal?._paragraph || defaultModalName.defModalParagraph
    this.modalName = modal?.typeName || defaultModalName.defModalName
  }
}
