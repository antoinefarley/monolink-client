import './Main.scss';

import SearchBar from '@components/SearchBar/SearchBar';
import { ContentTabs } from '@content/ContentTabs';
import { HeaderInfo } from '@content/HeaderInfo';
import { monolinkLocalStorage, text } from '@data/data';
import { useSyncLocalStorage } from '@hooks/useSyncLocalStorage';
import { AppContext, SearchContext } from '@state/context';
import { request } from '@utils/utils';
import React from 'react';
import switcho from 'switcho';

const isValidUrl = (input) =>
  ['music.apple.com', 'youtube.com', 'open.spotify.com']
    .map((elem) => [`${elem}`, `https://${elem}`, `https://www.${elem}`])
    .some((elem) => elem.some((twotypes) => input.startsWith(twotypes)));

const getInputValidityStatus = (
  input: string,
  currentResultUrl: string,
): EInputValidityStatus => {
  const { IDLE, VALID, INVALID } = EInputValidityStatus;
  return input === '' || currentResultUrl === input
    ? IDLE
    : isValidUrl(input)
    ? VALID
    : INVALID;
};

enum ESearchActionStatus {
  IDLE = 'idle',
  SEARCHING = 'searching',
  SUCCESS = 'success',
  ERROR = 'error',
}
enum EInputValidityStatus {
  IDLE = 'idle',
  VALID = 'valid',
  INVALID = 'invalid',
}

interface IStates {
  searchActionStatus: ESearchActionStatus;
  input: {
    value: string;
    validityStatus: EInputValidityStatus;
  };
  top_searches: [];
  result: any;
  errorMessage: '';
  modifiers: {
    login: any;
    history: boolean;
    linkCheckmarks: -1 | 0 | 1 | 2;
    shareButton: boolean;
  };
}

const initialState: IStates = {
  searchActionStatus: ESearchActionStatus.IDLE,
  input: {
    value: '',
    validityStatus: EInputValidityStatus.IDLE,
  },
  top_searches: [],
  result: null,
  errorMessage: '',
  modifiers: {
    login: false,
    history: false,
    linkCheckmarks: -1,
    shareButton: false,
  },
};

const copyObject = (obj) => ({ ...obj });

const reducer = (state: IStates, actionObj) => {
  const { type, payload = null } = actionObj;

  const deepCopy = copyObject(state);

  switcho(type, {
    updateActionStatus: () => {
      deepCopy.searchActionStatus = payload;
    },
    updateInput: () => {
      deepCopy.input.value = payload;
      deepCopy.input.validityStatus = getInputValidityStatus(
        payload,
        deepCopy.result?.url,
      );
    },
    updateTopSearches: () => {
      deepCopy.top_searches = payload;
    },
    selectionUpdate: () => {
      deepCopy.result = payload;
      deepCopy.modifiers.history = false;
      deepCopy.searchActionStatus = ESearchActionStatus.SUCCESS;
      deepCopy.input.validityStatus = EInputValidityStatus.IDLE;
    },
    toggleLoginView: () => {
      deepCopy.modifiers.login = payload;
    },
    toggleHistoryView: () => {
      deepCopy.modifiers.history = payload;
    },
    toggleLinkCheckmark: () => {
      deepCopy.modifiers.linkCheckmarks = payload;
    },
    toggleShareButton: () => {
      deepCopy.modifiers.shareButton = payload;
    },
    toggleError: () => {
      deepCopy.errorMessage = payload;
      deepCopy.searchActionStatus = ESearchActionStatus.ERROR;
    },
  });

  return deepCopy;
};

const GenMain = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [recent, setRecent] = useSyncLocalStorage(
    monolinkLocalStorage,
    state.result,
    {
      array: true,
      filter: (item) => item?.data?.isrc,
    },
  );

  const resetRecent = () => {
    setRecent([]);
  };
  const {
    searchActionStatus,
    input,
    result,
    errorMessage,
    modifiers,
    top_searches,
  } = state;

  const dispatchWithPromise = async (preaction, promise, followup) => {
    dispatch(preaction);
    const res = await promise;
    dispatch({
      type: followup.type,
      payload: followup?.payload ?? res,
    });
  };

  const toggleError = (message: string, timeout = 2000) => {
    dispatchWithPromise(
      { type: 'toggleError', payload: message },
      new Promise((resolve) => setTimeout(resolve, 2000)),
      { type: 'updateActionStatus', payload: 'idle' },
    );
  };

  const onSearch = async () => {
    dispatch({ type: 'updateActionStatus', payload: 'searching' });

    const res = await request('POST', 'search', { url: input.value });

    if (res !== false) {
      dispatch({ type: 'selectionUpdate', payload: res });
      dispatch({ type: 'updateInput', payload: '' });
    } else {
      toggleError(res.message);
    }
  };

  React.useEffect(() => {
    (async () => {
      const result = await request('GET', 'get_top_searches', { a: '' });
      if (result?.status !== 'error') {
        dispatch({
          type: 'updateTopSearches',
          payload: result,
        });
      }
    })();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <SearchContext.Provider
        value={{ searchActionStatus, result, recent, resetRecent }}
      >
        <div className={`main_container ${searchActionStatus}`}>
          <HeaderInfo />

          {searchActionStatus === 'error' && (
            <div className="error_notification_container">
              <div>{errorMessage}</div>
            </div>
          )}

          <SearchBar
            value={input.value}
            placeholder={text.searchPlaceholder}
            onChange={(e) => dispatch({ type: 'updateInput', payload: e })}
            onSearch={onSearch}
            onCancel={() => dispatch({ type: 'updateInput', payload: '' })}
            inputValidityStatus={input.validityStatus}
          />
          <ContentTabs
            dispatch={dispatch}
            searchActionStatus={state.searchActionStatus}
            result={result}
            recent={recent}
            resetRecent={resetRecent}
          />
        </div>
      </SearchContext.Provider>
    </AppContext.Provider>
  );
};

export default GenMain;
