import {
  faApple,
  faSpotify,
  faYoutube,
} from '@fortawesome/free-brands-svg-icons';

export const platformSpecificTemplates = {
  spotify: {
    icon: faSpotify,
    color: '#1DB954',
    premiumlink:
      'https://www.spotify.com/ca-en/premium/?overrideEligibility=nonintro',
  },
  applemusic: {
    icon: faApple,
    color: '#black',
    premiumlink: 'https://www.apple.com/apple-music/',
  },
  youtube: {
    icon: faYoutube,
    color: '#FF0000',
    premiumlink: 'https://www.youtube.com/premium',
  },
  // amazon: { icon: faAmazon, color: "black", link: "n/a", premiumlink: "" },
};

export const monolinkLocalStorage = 'monolink_recent:locstor';

export const text = {
  searchPlaceholder: 'Enter a Spotify, Apple Music or Youtube URL...',
  tabs: {
    top_searches: 'TOP',
    current: 'CURRENT',
    recent: 'RECENT',
  },
  content: {
    topSearchesInitialView: 'Top Searches will show here once available',
    currentInitialView: 'Results will show here after search',
    recentInitialView: 'Locally stored recent searches will show here',
  },
};
