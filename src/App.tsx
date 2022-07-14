import { createContext, useContext, useState } from 'react';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import './App.scss';
import './tailwind.scss';

const themes: string[] = ['standard', 'red', 'green', 'dark', 'light'];

interface IThemeContext {
  theme: string;
  // setTheme: (theme: string) => void;
  changeTheme: () => void;
}

const defaultThemeContext: IThemeContext = {
  theme: themes[2],
  // setTheme: (theme: string): void => {},
  changeTheme: () => {},
};

const ThemeContext = createContext<IThemeContext>(null!);
// const ThemeContext = createContext({} as IThemeContext);
// const ThemeContext = createContext<IThemeContext | null>(null);
// const ThemeContext = createContext<IThemeContext>(defaultThemeContext);

interface IContextProps {
  children: React.ReactNode;
}
const ThemeContextProvider: React.FC<IContextProps> = ({ children }) => {
  const [theme, setTheme] = useState(defaultThemeContext.theme);
  const changeTheme = (): void => {
    setTheme(
      themes.indexOf(theme) === themes.length - 1
        ? themes[0]
        : themes[themes.indexOf(theme) + 1]
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

interface IButtonProps {
  changeTheme: () => void;
  children: React.ReactNode;
  style?: 'inverted' | 'standard';
}

const MyButton: React.FC<IButtonProps> = ({
  changeTheme,
  children,
  style = 'standard',
}): JSX.Element => {
  const getButtonStyle = () => {
    switch (style) {
      case 'inverted':
        return 'text-skin-base bg-skin-button-muted hover:bg-opacity-20';
      case 'standard':
        return 'text-skin-inverted bg-skin-button-accent hover:bg-skin-button-accent-hover';
      default:
        return 'text-skin-base bg-skin-button-muted hover:bg-opacity-20';
    }
  };

  return (
    <button
      onClick={changeTheme}
      className={`btn ${getButtonStyle()} border-0`}
    >
      {children}
    </button>
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
  const [clickCounter, setClickCounter] = useState(0);
  // const [theme, setTheme] = useState(themes[0]);

  const ctx = useContext(ThemeContext);
  if (!ctx) return <div>Loading...</div>;
  // const { theme, changeTheme } = useContext(ThemeContext);
  // const { theme, setTheme } = useContext(ThemeContext) || defaultThemeContext;

  const changeTheme = (): void => {
    ctx.changeTheme();
    setClickCounter(clickCounter + 1);
  };

  return (
    <div className={`App ${ctx.theme}`}>
      <div className="pt-4 uppercase">theme: {ctx.theme}</div>

      <div className="p-4 m-8 rounded-xl bg-skin-fill bg-opacity-50">
        <div className="p-4 text-skin-base text-5xl">Home</div>
        <div className="flex justify-center gap-6 flex-col tablet:flex-row">
          <MyButton changeTheme={changeTheme} style={'inverted'}>
            Hello daisyUI
          </MyButton>
          <MyButton changeTheme={changeTheme} style={'standard'}>
            first button
          </MyButton>
          <MyButton changeTheme={changeTheme} style={'inverted'}>
            second button
          </MyButton>
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
  const [clickCounter, setClickCounter] = useState(0);
  // const [theme, setTheme] = useState(themes[0]);

  const { theme, changeTheme } = useContext(ThemeContext);
  // const { theme, setTheme } = useContext(ThemeContext) || defaultThemeContext;

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
          <MyButton changeTheme={changeTheme} style={'standard'}>
            first button Page2
          </MyButton>
          <MyButton changeTheme={changeTheme} style={'inverted'}>
            second button Page2
          </MyButton>
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
