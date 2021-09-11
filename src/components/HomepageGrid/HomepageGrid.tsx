import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faApple } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { cn } from '@utils/cn';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { v4 as uuid } from 'uuid';

import { GridButton } from '../IconButton/IconButton';

const platformIcons = {
  spotify: faSpotify,
  applemusic: faApple,
  youtube: faYoutube,
};

const GridTile = (props) => {
  const {
    selectedTile = false,
    onTileSelection = null,
    trackInfo = {},
    blank,
  } = props;
  const { data, platformLinks, searchCounter } = trackInfo;
  const isSelectedTab = selectedTile === data?.isrc;

  return (
    <StyledGridTile
      key={uuid()}
      onClick={blank ? null : () => onTileSelection(data.isrc)}
      $blank={blank}
    >
      {!blank && (
        <>
          <img key={uuid()} src={data.img} />
          <StyledExpandedTileInfo
            {...cn('expanded-tile-info', isSelectedTab && 'force-show')}
          >
            <div>
              {['track', 'artist', 'album', 'year'].map((elem) => {
                return (
                  <div key={`tile-info-${elem}`}>
                    <span>{elem}</span>: {data[elem]}
                  </div>
                );
              })}
            </div>

            <div>
              {Object.entries(platformIcons).map(([key, icon]) => (
                <GridButton
                  as="a"
                  key={`platform-icon-${key}`}
                  href={platformLinks[key]}
                  target="_blank"
                  icon={icon}
                />
              ))}
            </div>
          </StyledExpandedTileInfo>
          <div>{searchCounter}</div>
        </>
      )}
    </StyledGridTile>
  );
};

export const HomepageGrid = (props) => {
  const { images = [], imgSize = '150px' } = props;
  const [selectedTile, setSelectedTile] = React.useState(null);
  const onTileSelection = (isrc) => {
    setSelectedTile(isrc === selectedTile ? null : isrc);
  };

  return (
    <StyledHomepageGrid $imgSize={imgSize}>
      {images.map((elem) => (
        <GridTile
          key={`grid-tile-elem-${elem.id}`}
          selectedTile={selectedTile}
          onTileSelection={onTileSelection}
          trackInfo={elem}
        />
      ))}
      <GridTile blank />
      <GridTile blank />
      <GridTile blank />
    </StyledHomepageGrid>
  );
};

const StyledHomepageGrid = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => props.$imgSize}, 1fr)
  );
  grid-template-rows: repeat(
    auto-fill,
    minmax(${(props) => props.$imgSize}, 1fr)
  );
  grid-gap: 20px;

  img {
    scroll-snap-align: start;
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    z-index: 0;
    border-radius: 3px;
    overflow: hidden;
  }
`;

const StyledGridTile = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 0;
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;
  transition: all 0.3 ease;

  > div:last-of-type {
    width: 20px;
    height: 20px;
    position: absolute;
    bottom: 0;
    right: 0;
    color: gray;
    font-weight: bold;
    font-size: 12px;
    line-height: 20px;
    opacity: 0.4;
  }

  &:hover {
    .expanded-tile-info {
      opacity: 1;
      &:not(.force-show) {
        > div:first-child > div {
          opacity: 0;
        }
      }
    }
  }
  ${(props) =>
    props.$blank
      ? css`
          pointer-events: none;
        `
      : css`
          box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12),
            0 2px 2px rgba(0, 0, 0, 0.12), 0 4px 4px rgba(0, 0, 0, 0.12),
            0 8px 8px rgba(0, 0, 0, 0.12), 0 16px 16px rgba(0, 0, 0, 0.12);
        `}
`;

const styledExpandedTileInfoAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const StyledExpandedTileInfo = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  animation-name: ${styledExpandedTileInfoAnimation};
  animation-duration: ${(props) => props.$animationTime}s;
  animation-timing-function: ease-in-out;
  opacity: 0;

  &.force-show {
    opacity: 1;
  }

  > :first-child {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    color: white;
    font-weight: bold;
    font-size: 12px;
    line-height: 20px;
    text-align: left;
    background-color: rgba(0, 0, 0, 0.4);
    opacity: 1;

    span {
      text-transform: capitalize;
    }
  }
  > :last-child {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;

    svg {
      &:hover {
      }
    }
  }
`;
