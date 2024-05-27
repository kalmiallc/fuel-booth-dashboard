export default function useGame() {
  const config = useRuntimeConfig();

  function openGame(user: UserInterface) {
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
  return {
    openGame,
  };
}
