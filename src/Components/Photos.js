import React from 'react';
import Photo from './Photo.js'

const Photos = ({photosData, searchTag}) => {
  let results = photosData;
  let photoList;
  if (photosData.length > 0) {
    photoList = results.map(photo => <Photo url={photo} key={photo}/>);
  }

  return(
    <div className="photo-container">
      {(searchTag && photosData.length > 0) && <h3>"{searchTag}" results</h3>}
      <ul>
        {photoList}
      </ul>
    </div>
    );
  }

export default Photos;