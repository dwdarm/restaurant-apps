import LocalDatabase from '../src/scripts/data/local-database';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import '../src/scripts/components/containers/restaurant-detail-fetcher';

const createRestaurantDetailFetcherEl = ({ id, idb, localDatabase, onSuccess, onError }) => {
  const restaurantDetailFetcherEl = document.createElement('restaurant-detail-fetcher');
  restaurantDetailFetcherEl.localDatabase = localDatabase;
  restaurantDetailFetcherEl.id = id;
  restaurantDetailFetcherEl.idb = idb;
  restaurantDetailFetcherEl.addEventListener('restaurant-detail-fetcher:success', onSuccess);
  restaurantDetailFetcherEl.addEventListener('restaurant-detail-fetcher:error', onError);

  return restaurantDetailFetcherEl;
}

describe('Fetching Restaurant Detail', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  
  it('should get restaurant detail', (done) => {
    spyOn(LocalDatabase.prototype, 'getDetail').and.returnValue(Promise.resolve(
      { 
        id: 1,
        name: 'name',
        categories: [],
        customerReviews: [],
        menus: {
          foods: [],
          drinks: [],
        }
      }
    ));
    
    const localDatabase = new LocalDatabase(null);
    
    const onSuccess = async () => {
      
      expect(localDatabase.getDetail).toHaveBeenCalledWith(1);
      
      expect(document.querySelector('h2').innerText)
        .toEqual('name');
        
      done();
    }
    
    const restaurantDetailFetcherEl = createRestaurantDetailFetcherEl({ 
      id: 1, onSuccess, localDatabase , idb: FavoriteRestaurantIdb
    });
    
    document.body.appendChild(restaurantDetailFetcherEl);
  });
  
  it('should get error message when restaurant is not found', (done) => {
    spyOn(LocalDatabase.prototype, 'getDetail').and.returnValue(Promise.reject());
    
    const localDatabase = new LocalDatabase(null);
    
    const onError = async () => {
      
      expect(localDatabase.getDetail).toHaveBeenCalledWith(1);
      
      expect(document.querySelector('h2').innerText)
        .toEqual('Resouce Not Found');
        
      done();
    }
    
    const restaurantDetailFetcherEl = createRestaurantDetailFetcherEl({ 
      id: 1, onError, localDatabase , idb: FavoriteRestaurantIdb
    });
    
    document.body.appendChild(restaurantDetailFetcherEl);
  });
});
