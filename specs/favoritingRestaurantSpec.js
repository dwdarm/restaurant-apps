import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import '../src/scripts/components/containers/favorite-restaurant-poster';

const createfavoriteRestaurantPosterEl = ({ data, idb, onReady, onClicked }) => {
  const favoriteRestaurantPosterEl = document.createElement('favorite-restaurant-poster');
  favoriteRestaurantPosterEl.data = data;
  favoriteRestaurantPosterEl.idb = idb;
  favoriteRestaurantPosterEl
    .addEventListener('favorite-restaurant-poster:ready', onReady);
  favoriteRestaurantPosterEl
    .addEventListener('favorite-restaurant-poster:clicked', onClicked);

  return favoriteRestaurantPosterEl;
}

describe('Favoriting A Restaurant', () => {
  beforeEach(async () => {
    await FavoriteRestaurantIdb.clear();
    document.body.innerHTML = '';
  });
  
  it('should show the favorite button when the restaurant has not been favorited before', (done) => {
    const onReady = async () => {
      expect(document.querySelector('[aria-label="favorite this restaurant"]')).toBeTruthy();
      done();
    }
    
    const favoriteRestaurantPosterEl = createfavoriteRestaurantPosterEl({
      data: { id: 1 }, 
      idb: FavoriteRestaurantIdb,
      onReady,
    });
    
    document.body.appendChild(favoriteRestaurantPosterEl);
  });
  
  it('should show the unfavorite button when the restaurant has been favorited before', async () => {
    const onReady = async () => {
      expect(document.querySelector('[aria-label="unfavorite this restaurant"]')).toBeTruthy();
    }
    
    await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
    
    const favoriteRestaurantPosterEl = createfavoriteRestaurantPosterEl({
      data: { id: 1 }, 
      idb: FavoriteRestaurantIdb,
      onReady,
    });
    
    document.body.appendChild(favoriteRestaurantPosterEl);
  });
  
  it('should be able to favorite the restaurant', (done) => {
    const onReady = async () => {
      document.querySelector('.favorite-restaurant-button')
        .dispatchEvent(new Event('click'));
    }
    
    const onClicked = async () => {
      const restaurant = await FavoriteRestaurantIdb.getRestaurant(1);
      expect(restaurant).toEqual({ id: 1 });
      done();
    }
    
    const favoriteRestaurantPosterEl = createfavoriteRestaurantPosterEl({
      data: { id: 1 }, 
      idb: FavoriteRestaurantIdb,
      onReady,
      onClicked,
    });
    
    document.body.appendChild(favoriteRestaurantPosterEl);
  });
  
  it('should be able to unfavorite the restaurant', (done) => {
    const onReady = async () => {
      await FavoriteRestaurantIdb.putRestaurant({ id: 1 });
      document.querySelector('.favorite-restaurant-button')
        .dispatchEvent(new Event('click'));
    }
    
    const onClicked = async () => {
      expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
      done();
    }
    
    const favoriteRestaurantPosterEl = createfavoriteRestaurantPosterEl({
      data: { id: 1 }, 
      idb: FavoriteRestaurantIdb,
      onReady,
      onClicked,
    });
    
    document.body.appendChild(favoriteRestaurantPosterEl);
  });
  
  it('should not add a restaurant when it has no data', (done) => {
    const onReady = async () => {
      document.querySelector('.favorite-restaurant-button')
        .dispatchEvent(new Event('click'));
    }
    
    const onClicked = async () => {
      expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
      done();
    }
    
    const favoriteRestaurantPosterEl = createfavoriteRestaurantPosterEl({
      idb: FavoriteRestaurantIdb,
      onReady,
      onClicked,
    });
    
    document.body.appendChild(favoriteRestaurantPosterEl);
  });
  
});
