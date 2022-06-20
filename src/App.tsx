import { useState } from 'react';
import './App.scss';
import './tailwind.scss';

const themes = ['standard', 'red', 'green', 'new'];

function App() {
  const [clickCounter, setClickCounter] = useState<number>(0);
  const [theme, setTheme] = useState<string>(themes[0]);

  const handleClick = () => {
    setClickCounter(clickCounter + 1);
    setTheme(
      themes.indexOf(theme) === themes.length - 1
        ? themes[0]
        : themes[themes.indexOf(theme) + 1]
    );
    // theme === 'dark'
    //   ? 'green'
    //   : theme === 'green'
    //   ? 'red'
    //   : theme === 'red'
    //   ? 'light'
    //   : 'dark'
    // );
  };

  return (
    <div className={`App ${theme}`}>
      <div className="pt-4 uppercase">theme: {theme}</div>

      <div className="p-4 m-8 rounded-xl bg-skin-fill bg-opacity-50">
        <div className="p-4 text-skin-base text-5xl">This is a text</div>
        {/* <button
          onClick={handleClick}
          className="btn tablet:text-lg desktop:text-2xl"
        >
          Hello daisyUI
        </button> */}
        <div className="flex justify-center gap-6 flex-col tablet:flex-row">
          <button
            onClick={handleClick}
            className="btn text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover border-0"
          >
            first button
          </button>
          <button
            onClick={handleClick}
            className="btn text-skin-base bg-skin-button-muted hover:bg-opacity-20 border-0"
          >
            second button
          </button>
        </div>
        <div className="pt-2">{clickCounter}</div>
      </div>
    </div>
  );
}

export default App;
