function handleWindowLoad(event: Event): void{
  isWindowLoaded = true;
  window.removeEventListener('load', handleWindowLoad);
}

export let isWindowLoaded: boolean = false;

if(typeof window === 'object' && isWindowLoaded === false){
  window.addEventListener('load', handleWindowLoad, false);
}