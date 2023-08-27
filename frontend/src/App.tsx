import ChatPage from './pages/ChatPage';
import { useWindowSize } from './hooks/useWindowSize';
import { Route, Routes } from 'react-router-dom';
import RegisterUser from './components/RegisterUser';
import LoginUser from './components/LoginUser';
import RequireAuth from './components/RequireAuth';
import { useAppDispatch, useAppSelector } from './hooks/reduxHooks';
import { useEffect } from 'react';
import { getUser } from './api/userApi';
import Cookies from 'js-cookie';

const App = () => {
  const token = Cookies.get('jwt');
  const dispatch = useAppDispatch();
  const size = useWindowSize();
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  useEffect(() => {
    if (isAuth) {
      dispatch(getUser());
    }
  }, [token, isAuth]);

  if (size < 700) {
    return (
      <h1 className="h-screen grid place-content-center font-[600] text-lg text-center">
        ПРОСТИТЕ! НО ДЛЯ МОБИЛЬНЫХ ТЕЛЕФОНОВ У НАС ЕСТЬ МОБИЛЬНОЕ ПРИЛОЖЕНИЕ
      </h1>
    );
  }

  return (
    <main className="max-w-[1440px] mx-auto">
      <Routes>
        <Route path="/signup" element={<RegisterUser />} />
        <Route path="/signin" element={<LoginUser />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<ChatPage />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
