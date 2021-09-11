import './Current.scss';

import { IconContainer } from '@atoms/IconContainer';
import { InfoElementContainer } from '@atoms/InfoElementContainer';
import { InitialView } from '@components/InitialView/InitialView';
import { SearchItemContainer } from '@components/SearchItemContainer/SearchItemContainer';
import { platformSpecificTemplates, text } from '@data/data';
import {
  faCheck,
  faExternalLinkSquareAlt,
  faLink,
  faShareAlt,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SearchContext } from '@state/context';
import { cn } from '@utils/cn';
import { timePromise, txtClipboard } from '@utils/utils';
import { useContext, useState } from 'react';

export const Current = () => {
  const { searchActionStatus, result } = useContext(SearchContext);
  const [shareButton, setShareButton] = useState(false);
  const [linkCheckmarks, setLinkCheckmarks] = useState(-1);

  return (
    <div {...cn('content-current', searchActionStatus)}>
      {searchActionStatus === 'idle' ? (
        <InitialView>{text.content.currentInitialView}</InitialView>
      ) : (
        <>
          <SearchItemContainer
            actionStatus={searchActionStatus}
            resultInfo={result?.data}
          />
          <div
            className={`share-button-container ${shareButton ? 'copied' : ''}`}
            onClick={() =>
              txtClipboard(
                Object.entries(result.platformLinks)
                  .map(([key, val]) => `${key}: ${val}`)
                  .join('\n'),
                async () => {
                  setShareButton(true);
                  await timePromise(1800);
                  setShareButton(false);
                },
                () => {
                  // toggleError("Couldn't copy link to clipboard");
                },
              )
            }
          >
            <div className="absolute icon">
              <div className="text">{shareButton && 'All links copied :)'}</div>
              <FontAwesomeIcon icon={faShareAlt} color="white" size="sm" />
            </div>
          </div>
          <div className={`result_container ${searchActionStatus}`}>
            {Object.entries(result?.platformLinks ?? {}).map(
              ([key, val]: [any, any], index) => {
                const { premiumlink, icon, color } =
                  platformSpecificTemplates[key];
                return (
                  <div
                    key={`platform-res-${key}`}
                    className={`platform_result_container ${
                      val === 'notfound' ? 'notfound' : ''
                    }`}
                  >
                    <IconContainer
                      faIcon={icon}
                      faColor={color}
                      onClickUrl={premiumlink}
                    />
                    <div className="info_container">
                      {val === 'notfound' ? (
                        'Not Found'
                      ) : (
                        <>
                          <InfoElementContainer
                            icon={faExternalLinkSquareAlt}
                            isLink={val}
                            text={'Open link'}
                            onClick={() => window.open(val.url)}
                          />
                          <InfoElementContainer
                            icon={linkCheckmarks === index ? faCheck : faLink}
                            text={'Copy link'}
                            onClick={() =>
                              txtClipboard(
                                val,
                                async () => {
                                  setLinkCheckmarks(index);
                                  await timePromise(1800);
                                  setLinkCheckmarks(-1);
                                },
                                () => null,
                              )
                            }
                          />
                        </>
                      )}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        </>
      )}
    </div>
  );
};
