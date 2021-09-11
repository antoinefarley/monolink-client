
import { HomepageGrid } from '@components/HomepageGrid/HomepageGrid';
import { InitialView } from '@components/InitialView/InitialView';
import { text } from '@data/data';

export const TopSearches = (props) => {
  const { songs } = props;
  return songs.length === 0 ? (
    <InitialView>{text.content.recentInitialView}</InitialView>
  ) : (
    <HomepageGrid images={songs} />
  );
};
