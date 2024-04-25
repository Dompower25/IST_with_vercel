import PopUpBase from '../PopUpBase'
import NextImageRatioSaver from '../NextImageRatioSaver'

export default function ImageViewerModal({ modalState, setModalState, image }) {
  return (
    <>
      <PopUpBase puState={modalState} closer={setModalState} nonBorder={true}>
        {modalState && image !== null ? (
          <>
            <div
              style={{
                width: (document.body.clientWidth / 100) * 80,
                maxWidth: 100 + '%',
                height: 'max-content',
                maxHeight: (document.body.clientHeight / 100) * 80,
                borderRadius: 15 + 'px',
                overflow: 'hidden',
                marginBottom: 30 + 'px',
              }}
            >
              <NextImageRatioSaver
                Img={image ? image : ''}
                primaryFill={'width'}
                q={100}
                unique={'_MODAL_IMAGE'}
              />
            </div>
          </>
        ) : null}
      </PopUpBase>
    </>
  )
}
