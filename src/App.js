import React, { Component } from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import apiKey from './config';

// App components

import NotFound from './Components/NotFound';
import PhotosPage from './Components/PhotosPage';

class App extends Component {

  // The various Loading states and Photos arrays are  passed to their respective routes below
  // The Photos arrays are for preloading the nav-button search options
  constructor() {
    super();
    this.state = {
      searchPhotos: [],
      searchLoading: true,
      CatPhotos: [],
      CatLoading: true,
      DogPhotos: [],
      DogLoading: true,
      NaturePhotos: [],
      NatureLoading: true,
      searchTag: '',
      performedFirstSearch: false // This is used to prevent the loading component from appeared before any search has occurred
    };
  }

  // Preload the nav link routes photo lists
  componentDidMount() {
   this.navSearch();
  }

  flickrFetch = (tag) => {
    return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => response.json())
      .then(response => response.photos.photo.map((photo) => `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`))
  }

  performSearch = (tag) => {
    let searchTagFormatted = tag[0].toUpperCase() + tag.slice(1);
    this.flickrFetch(tag)
      .then(imageArr => this.setState({
        searchPhotos: imageArr, 
        searchTag: searchTagFormatted, 
        searchLoading: false, 
        performedFirstSearch: true}
      ));
  }

  navSearch = () => {
    let navButtons = ['Cat', 'Dog', 'Nature']
    for (const navButton of navButtons) {
      this.flickrFetch(navButton)
      .then(imageArr => this.setState({
        [`${navButton}Photos`]: imageArr, 
        [`${navButton}Loading`]: false}
      ));
    }
  }

  // Several props passed to the nav routes are hardcoded to ensure intended functionality
  render() {
    return (
      <BrowserRouter>
        <div className = 'container'>
          <Switch>
            <Redirect exact from="/" to="/search" />
            <Route path="/search" render={(props) => 
              <PhotosPage 
                performSearch={this.performSearch}
                photosData={this.state.searchPhotos}
                searchTag={this.state.searchTag}
                loading={this.state.searchLoading}
                performedFirstSearch={this.state.performedFirstSearch}
              />
            }/>
            <Route path="/cats" render={(props) => 
              <PhotosPage 
                performSearch={this.performSearch}
                photosData={this.state.CatPhotos}
                searchTag={"Cat"}
                loading={this.state.CatLoading}
                performedFirstSearch={true}
              />
            }/>
            <Route path="/dogs" render={(props) => 
              <PhotosPage 
                performSearch={this.performSearch}
                photosData={this.state.DogPhotos}
                searchTag={"Dog"}
                loading={this.state.DogLoading}
                performedFirstSearch={true}
              />
            }/>
            <Route path="/nature" render={(props) => 
              <PhotosPage 
                performSearch={this.performSearch}
                photosData={this.state.NaturePhotos}
                searchTag={"Nature"}
                loading={this.state.NatureLoading}
                performedFirstSearch={true}
              />
            }/>
            <NotFound />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;