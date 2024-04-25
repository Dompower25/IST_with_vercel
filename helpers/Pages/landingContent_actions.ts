import {
  ILandingFromQuery,
  IPageOfLandingFromQuery,
} from '../../queries/landingPages/landingPage'

export const getPageOfLandingByIdentifier_landingHelper = (
  page_identifier: string,
  landingFromResponse: ILandingFromQuery,
): IPageOfLandingFromQuery[] | undefined => {
  const landing = landingFromResponse.landing_page.filter(
    (x) => x.page_identifier === page_identifier,
  )

  return landing && landing.length > 0 ? landing : undefined
}
