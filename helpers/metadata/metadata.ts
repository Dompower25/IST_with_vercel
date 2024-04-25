export const metaTextSubstitution_metaHelper = (
  targetText: string,
  substitute: string,
  regex: RegExp = /\[XXX\]/g,
) => {
  return targetText.replace(regex, substitute)
}
