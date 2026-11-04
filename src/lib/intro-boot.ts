/**
 * Kører før første paint: skjul loaderen, hvis den allerede er set i denne
 * session, brugeren har slået bevægelse fra, eller siden er Design Lab.
 * Med `?intro=<variant>` vises den altid; vælges en anden variant end
 * standarden, skjules den server-renderede scene, indtil den rigtige er sat ind.
 */
export const introBootScript = (defaultId: string) =>
  `try{var c=document.documentElement.classList,l=location,m=/[?&]intro(=([a-z]+))?/.exec(l.search);` +
  `if(/^\\/design-lab/.test(l.pathname))c.add("intro-skip");` +
  `else if(m){if(m[2]&&m[2]!==${JSON.stringify(defaultId)})c.add("intro-swap")}` +
  `else if(sessionStorage.getItem("mm-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches)c.add("intro-skip")}catch(e){}`;
