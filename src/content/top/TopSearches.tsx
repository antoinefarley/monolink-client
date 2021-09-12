import { HomepageGrid } from '@components/HomepageGrid/HomepageGrid';
import { InitialView } from '@components/InitialView/InitialView';

export const TopSearches = (props) => {
  const { songs } = props;
  return songs.length === 0 ? (
    <InitialView useLoading={true} />
  ) : (
    <HomepageGrid images={songs} />
  );
};
