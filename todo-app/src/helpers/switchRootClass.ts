export function switchRootClass(
  displayLeftContainer: boolean,
  displayRightContainer: boolean
): string {
  let rootClass = "";
  if (displayLeftContainer && displayRightContainer) {
    rootClass = "show-both-containers";
  } else if (displayLeftContainer && !displayRightContainer) {
    rootClass = "";
  } else if (!displayLeftContainer && displayRightContainer) {
    rootClass = "hide-left-container";
  } else if (!displayLeftContainer && !displayRightContainer) {
    rootClass = "hide-both-containers";
  }
  return rootClass;
}
