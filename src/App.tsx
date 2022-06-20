import { createContext, useContext, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import './tailwind.scss';

const themes: string[] = ['standard', 'red', 'green', 'dark', 'light'];

interface IThemeContext {
  theme: string;
  setTheme: (theme: string) => void;
}

const defaultThemeContext: IThemeContext = {
  theme: themes[2],
  setTheme: (theme: string): void => {},
};

// const ThemeContext = createContext<IThemeContext | null>(null);
const ThemeContext = createContext<IThemeContext>(defaultThemeContext);

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>(defaultThemeContext.theme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

function App() {
  return (
    <ThemeContextProvider>
      <Routes>
        <Route path={`/`} element={<Page />} />
        <Route path={`/page2`} element={<PageTwo />} />
      </Routes>
    </ThemeContextProvider>
  );
}

function Page() {
  const [clickCounter, setClickCounter] = useState<number>(0);
  // const [theme, setTheme] = useState<string>(themes[0]);

  const { theme, setTheme } = useContext(ThemeContext);
  // const { theme, setTheme } = useContext(ThemeContext) || defaultThemeContext;

  const handleClick = (): void => {
    setClickCounter(clickCounter + 1);
    setTheme(
      themes.indexOf(theme) === themes.length - 1
        ? themes[0]
        : themes[themes.indexOf(theme) + 1]
    );
  };

  return (
    <div className={`App ${theme}`}>
      <div className="pt-4 uppercase">theme: {theme}</div>

      <div className="p-4 m-8 rounded-xl bg-skin-fill bg-opacity-50">
        <div className="p-4 text-skin-base text-5xl">Home</div>
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
        <div className="pt-2 text-skin-base">{clickCounter}</div>
        <NavLink
          className={'link text-skin-base inline-block mt-4'}
          to={'/page2'}
        >
          to Page 2
        </NavLink>
      </div>
    </div>
  );
}

function PageTwo() {
  const [clickCounter, setClickCounter] = useState<number>(0);
  // const [theme, setTheme] = useState<string>(themes[0]);

  const { theme, setTheme } = useContext(ThemeContext);
  // const { theme, setTheme } = useContext(ThemeContext) || defaultThemeContext;

  const handleClick = (): void => {
    setClickCounter(clickCounter + 1);
    setTheme(
      themes.indexOf(theme) === themes.length - 1
        ? themes[0]
        : themes[themes.indexOf(theme) + 1]
    );
  };

  return (
    <div className={`App ${theme}`}>
      <div className="pt-4 uppercase">theme: {theme}</div>

      <div className="p-4 m-8 rounded-xl bg-skin-fill bg-opacity-50">
        <div className="p-4 text-skin-base text-5xl">Page 2</div>
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
            first button Page2
          </button>
          <button
            onClick={handleClick}
            className="btn text-skin-base bg-skin-button-muted hover:bg-opacity-20 border-0"
          >
            second button Page2
          </button>
        </div>
        <div className="pt-2 text-skin-base">{clickCounter}</div>
        <NavLink className={'link text-skin-base inline-block mt-4'} to={'/'}>
          to Page 1
        </NavLink>
      </div>
    </div>
  );
}

export default App;
