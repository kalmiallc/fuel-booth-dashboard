export default function useGame() {
  const config = useRuntimeConfig();

  const encodeGetParams = p =>
    Object.entries(p)
      .map(kv => kv.map(encodeURIComponent).join('='))
      .join('&');

  function openGameInNewTab(user: UserInterface) {
    const childWindow = window.open(
      `${config.public.GAME_URL}`,
      `FUEL - Game played by ${user.username}`
    );

    const childWindowLoaded = event => {
      const data = {
        email: user.email,
        username: user.username,
      };
      if (event.data === 'loaded' && childWindow && childWindow.window) {
        childWindow.window.postMessage(data, config.public.GAME_URL);

        window.removeEventListener('message', childWindowLoaded, false);
      }
    };
    window.addEventListener('message', childWindowLoaded, false);
  }

  function openGame(user: UserInterface) {
    const data = {
      email: user.email,
      username: user.username,
    };
    window.open(`${config.public.GAME_URL}?${encodeGetParams(data)}`, '_self');
  }

  return {
    openGame,
    openGameInNewTab,
  };
}
