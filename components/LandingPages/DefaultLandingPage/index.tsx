import { forwardRef } from 'react'
import PageOfLanding from './PageOfLanding'
import { ILandingPage } from './common'

const ForwardPageOfLanding = forwardRef<HTMLDivElement, Partial<ILandingPage>>(
  ({ children, landingDescription, pageBackground, pageHook }, ref) => (
    <div ref={ref}>
      <PageOfLanding
        landingDescription={landingDescription}
        pageBackground={pageBackground}
        pageHook={pageHook}
      >
        {children}
      </PageOfLanding>
    </div>
  ),
)

ForwardPageOfLanding.displayName = 'ForwardPageOfLanding'
export default ForwardPageOfLanding
