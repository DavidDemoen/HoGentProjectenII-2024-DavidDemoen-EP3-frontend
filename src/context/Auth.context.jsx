import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import * as api from "../api/index";

const JWT_TOKEN_KEY = "jwtToken";
const ACCOUNT_ID_KEY = "accountId";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({ children }) {
  const [jwtToken, setJwtToken] = useLocalStorage(JWT_TOKEN_KEY, "");
  const [accountIdStorage, setAccountIdStorage] = useLocalStorage(
    ACCOUNT_ID_KEY,
    ""
  );

  const [token, setToken] = useState(jwtToken);
  const [account, setAccount] = useState(null);
  const [ready, setReady] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);

  const {
    data: storedAccount,
    error: storedAccountError,
    isLoading: storedAccountLoading,
  } = useSWR(
    accountIdStorage ? { url: `accounts/${accountIdStorage}` } : null,
    api.getById,
    {
      shouldRetryOnError: false,
    }
  );

  useEffect(() => {
    if (storedAccount) {
      setAccount(storedAccount.account);
    }
  }, [storedAccount]);

  useEffect(() => {
    api.setAuthToken(token);
  }, [token]);

  const {
    isMutating: loading,
    error,
    trigger: doLogin,
  } = useSWRMutation("accounts/login", api.post);

  useEffect(() => {
    console.log("account", account);
    console.log("token", token);
  }, [account, token]);

  const login = useCallback(
    async (email, password) => {
      try {
        const { token, account } = await doLogin({ email, password });
        setToken(token);
        setAccount(account);

        setJwtToken(token);
        setAccountIdStorage(account.id);

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
    [doLogin]
  );

  const logout = useCallback(() => {
    setToken(null);
    setAccount(null);

    setJwtToken("");
    setAccountIdStorage("");
  }, []);

  const values = useMemo(() => {
    return {
      token,
      account,
      loading,
      error,
      login,
      logout,
    };
  }, [token, account, loading, error, login, logout]);

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
