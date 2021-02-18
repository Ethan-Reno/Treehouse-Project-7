import React from 'react';
import SearchBar from './SearchBar';
import Nav from './Nav';
import Photos from './Photos';
import Loading from './Loading';
import NoResults from './NoResults';

const PhotosPage = ({photosData, performSearch, searchTag, loading, performedFirstSearch}) => {
    return(  
      <div className = 'container'>
        <h2>React Flickr Gallery</h2>
        <SearchBar performSearch={performSearch} />
        <Nav />
        { loading && performedFirstSearch && <Loading/> }
        { !loading && !photosData.length && <NoResults searchTag={searchTag} /> }
        { !loading && photosData.length && <Photos photosData={photosData} searchTag={searchTag} /> }
      </div>
    )
}

export default PhotosPage;