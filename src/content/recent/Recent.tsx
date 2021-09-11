import { InitialView } from '@components/InitialView/InitialView';
import { text } from '@data/data';
import { SearchContext } from '@state/context';
import { useContext } from 'react';

import { HomepageGrid } from '../../components/HomepageGrid/HomepageGrid';

export const Recent = () => {
  const { recent } = useContext(SearchContext);

  return recent.length === 0 ? (
    <InitialView>{text.content.recentInitialView}</InitialView>
  ) : (
    <HomepageGrid images={recent} />
  );
};
