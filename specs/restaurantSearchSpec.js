import LocalDatabase from '../src/scripts/data/local-database';
import '../src/scripts/components/containers/restaurant-search-fetcher';

const createRestaurantSearchFetcherEl = ({ keyword, localDatabase, onSuccess, onError }) => {
  const restaurantSearchFetcherEl = document.createElement('restaurant-search-fetcher');
  restaurantSearchFetcherEl.localDatabase = localDatabase;
  restaurantSearchFetcherEl.keyword = keyword;
  restaurantSearchFetcherEl.addEventListener('restaurant-search-fetcher:success', onSuccess);
  restaurantSearchFetcherEl.addEventListener('restaurant-search-fetcher:error', onError);

  return restaurantSearchFetcherEl;
}

describe('Search Restaurant', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  
  it('should get search result', (done) => {
    spyOn(LocalDatabase.prototype, 'search').and.returnValue(Promise.resolve(
      [{ 
        id: 1,
        name: 'name',
      }]
    ));
    
    const localDatabase = new LocalDatabase(null);
    
    const onSuccess = async () => {
      
      expect(localDatabase.search).toHaveBeenCalledWith('name');
      
      expect(document.querySelectorAll('restaurant-item').length)
        .toEqual(1);
        
      done();
    }
    
    const restaurantSearchFetcherEl = createRestaurantSearchFetcherEl({ 
      keyword: 'name', onSuccess, localDatabase
    });
    
    document.body.appendChild(restaurantSearchFetcherEl);
  });
  
  it('show not found if result is empty', (done) => {
    spyOn(LocalDatabase.prototype, 'search').and.returnValue(Promise.reject());
    
    const localDatabase = new LocalDatabase(null);
    
    const onError = async () => {
      
      expect(localDatabase.search).toHaveBeenCalledWith('name');
      
      expect(document.querySelector('h3').innerText)
        .toEqual('Resouce Not Found');
        
      done();
    }
    
    const restaurantSearchFetcherEl = createRestaurantSearchFetcherEl({ 
      keyword: 'name', onError, localDatabase
    });
    
    document.body.appendChild(restaurantSearchFetcherEl);
  });
});
