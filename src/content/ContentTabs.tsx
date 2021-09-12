import {
  FunctionalCarousel,
  FunctionalCarouselElement,
} from '@components/FunctionalCarousel/FunctionalCarousel';
import { TabElem, Tabs } from '@components/Tabs/Tabs';
import { Current } from '@content/current/Current';
import { Recent } from '@content/recent/Recent';
import { TopSearches } from '@content/top/TopSearches';
import { text } from '@data/data';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import {
  faPoll,
  faSortAlphaDown,
  faSpinner,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getCircularArrVal, request } from '@utils/utils';
import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const tabKeys = Object.keys(text.tabs)[0];

enum ETopSearchSortMode {
  TRENDING = 'trending',
  ALPHABETICAL = 'alphabetical',
  RECENT = 'recent',
}

const iconButtons = {
  top_searches: {
    trending: faPoll,
    alphabetical: faSortAlphaDown,
    recent: faCalendar,
  },
  current: { clear: faTimes },
  recent: { clear: faTimes },
};

const sortModes = ['trending', 'alphabetical', 'recent'];
const sortFunctions = {
  trending: (a, b) => (a.searchCounter < b.searchCounter ? 1 : -1),
  alphabetical: (a, b) => (a.data.track < b.data.track ? -1 : 1),
  recent: (a, b) => (a.data.year < b.data.year ? -1 : 1),
};

export const ContentTabs = React.memo(
  (props: any) => {
    const { searchActionStatus, result, recent, resetRecent, dispatch } = props;

    // Top Searches
    const [topSearches, setTopSearches] = useState([]);
    useEffect(() => {
      (async () => {
        const result = await request('GET', 'get_top_searches', {});
        if (result && result?.status !== 'error') {
          setTopSearches(result);
        }
      })();
    }, [result]);

    // Tabs
    const [currentTab, setCurrentTab] = useState(tabKeys);
    const [currentTopSearchesSortState, setCurrentTopSearchesSortState] =
      useState('trending');

    const onSelect = (selector) => {
      setCurrentTab(selector);
    };
    const onIconButtonClick = {
      top_searches: () => {
        setCurrentTopSearchesSortState(
          getCircularArrVal(
            sortModes.indexOf(currentTopSearchesSortState) + 1,
            sortModes,
          ),
        );
      },
      current: () => {
        dispatch({ type: 'selectionUpdate', payload: null });
        dispatch({ type: 'updateActionStatus', payload: 'idle' });
      },
      recent: () => {
        resetRecent();
      },
    };

    useEffect(() => {
      if (searchActionStatus === 'success') {
        setCurrentTab('current');
      }
    }, [searchActionStatus]);

    return (
      <StyledContentTabs>
        <Tabs selected={currentTab} onSelect={onSelect}>
          <TabElem
            selector={'top_searches'}
            icon={
              topSearches?.length >= 1 &&
              iconButtons.top_searches[currentTopSearchesSortState]
            }
            onIconClick={onIconButtonClick.top_searches}
          >
            {text.tabs.top_searches}
          </TabElem>
          <TabElem
            selector={'current'}
            icon={searchActionStatus === 'success' && iconButtons.current.clear}
            onIconClick={onIconButtonClick.current}
          >
            {searchActionStatus === 'searching' ? (
              <FontAwesomeIcon className="fa-spin" icon={faSpinner} />
            ) : (
              text.tabs.current
            )}
          </TabElem>
          <TabElem
            selector={'recent'}
            icon={recent?.length >= 1 && iconButtons.recent.clear}
            onIconClick={onIconButtonClick.recent}
          >
            {text.tabs.recent}
          </TabElem>
        </Tabs>

        <StyledSeparator />

        <FunctionalCarousel
          selected={Object.keys(text.tabs).findIndex(
            (elem) => elem === currentTab,
          )}
          onEnterView={onSelect}
        >
          <FunctionalCarouselElement selector="top_searches">
            <TopSearches
              songs={topSearches.sort(
                sortFunctions[currentTopSearchesSortState],
              )}
            />
          </FunctionalCarouselElement>

          <FunctionalCarouselElement selector="current">
            <Current />
          </FunctionalCarouselElement>

          <FunctionalCarouselElement selector="recent">
            <Recent />
          </FunctionalCarouselElement>
        </FunctionalCarousel>
      </StyledContentTabs>
    );
  },
  (prev, next) => {
    return (
      prev.result === next.result ||
      prev.searchActionStatus === next.searchActionStatus ||
      prev.recent === next.recent
    );
  },
);

const StyledContentTabs = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledSeparator = styled.div`
  width: 100%;
  height: 2px;
  margin-top: 6px;
  margin-bottom: 10px;
`;
