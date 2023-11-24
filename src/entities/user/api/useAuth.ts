import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useEffectOnce } from 'react-use';
import { setCookie, deleteCookie, getCookie } from 'cookies-next';
import moment from 'moment';

import { useNotificationsStore, useUserStore } from '@entities/user';
import api from '@shared/config/api.config';
import { parseJwt } from '@shared/lib/parsers';

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME!;

interface LoginResponse {
  token: string;
}

interface RefreshResponse {
  token: string;
}

export function useAuth() {
  const refreshTimeout = useRef<NodeJS.Timeout>();
  const router = useRouter();
  const user = useUserStore();
  const pushNotification = useNotificationsStore((state) => state.push);

  const updateCookie = (token: string | undefined) => {
    if (token) {
      setCookie(AUTH_COOKIE_NAME, token, {
        expires: new Date(parseJwt(token).exp * 1000),
      });
    } else {
      deleteCookie(AUTH_COOKIE_NAME);
    }
  };

  const logout = () => {
    clearTimeout(refreshTimeout.current);
    updateCookie(undefined);
    router.push('/auth');
    user.setStatus('unauthenticated');
  };

  const refresh = async () => {
    const token = getCookie(AUTH_COOKIE_NAME);

    if (!token) {
      logout();
      return;
    }

    api
      .post<RefreshResponse>('/auth/token', {
        token,
      })
      .then(({ data }) => {
        clearTimeout(refreshTimeout.current);
        refreshTimeout.current = setTimeout(
          refresh,
          parseJwt(data.token).exp * 1000 - +moment() - 5000,
        );

        updateCookie(data.token);
        user.setStatus('authenticated');
      })
      .catch(() => {
        pushNotification({
          id: (Math.random() + 1).toString(36).substring(7),
          timestamp: +moment(),
          type: 'error',
          text: 'Token refresh error',
          isNew: true,
          shown: false,
          withActions: false,
        });

        logout();
      });
  };

  const login = async (address: string, signature: string) => {
    let loggedIn = false;

    user.setStatus('loading');

    api
      .post<LoginResponse>('/auth/login', {
        address,
        signature,
      })
      .then(({ data }) => {
        clearTimeout(refreshTimeout.current);
        refreshTimeout.current = setTimeout(
          refresh,
          parseJwt(data.token).exp * 1000 - +moment() - 5000,
        );

        updateCookie(data.token);
        router.replace('/dashboard');
        user.setStatus('authenticated');

        loggedIn = true;
      })
      .catch(() => {
        pushNotification({
          id: (Math.random() + 1).toString(36).substring(7),
          timestamp: +moment(),
          type: 'error',
          text: 'Error while login',
          isNew: true,
          shown: false,
          withActions: false,
        });

        user.setStatus('unauthenticated');

        loggedIn = false;
      });

    return loggedIn;
  };

  useEffectOnce(() => {
    refresh();
  });

  return { login, logout, refresh };
}
