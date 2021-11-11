import LocalDatabase from '../src/scripts/data/local-database';
import '../src/scripts/components/containers/restaurant-list-fetcher';
import '../src/scripts/components/containers/restaurant-list-fetcher';

const createRestaurantListFetcherEl = ({ localDatabase, onSuccess, onError }) => {
  const restaurantListFetcherEl = document.createElement('restaurant-list-fetcher');
  restaurantListFetcherEl.localDatabase = localDatabase;
  restaurantListFetcherEl.addEventListener('restaurant-list-fetcher:success', onSuccess);
  restaurantListFetcherEl.addEventListener('restaurant-list-fetcher:error', onError);

  return restaurantListFetcherEl;
}

describe('Fetching Restaurant List', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  
  it('should get restaurant list', (done) => {
    spyOn(LocalDatabase.prototype, 'getPreviewList').and.returnValue(Promise.resolve(
      [{ 
        id: 1,
        name: 'name' 
      }]
    ));
    
    const localDatabase = new LocalDatabase(null);
    
    const onSuccess = async () => {
      
      expect(localDatabase.getPreviewList).toHaveBeenCalledTimes(1);
      
      expect(document.querySelectorAll('restaurant-item').length)
        .toEqual(1);
        
      done();
    }
    
    const restaurantListFetcherEl = createRestaurantListFetcherEl({ 
      onSuccess, localDatabase 
    });
    
    document.body.appendChild(restaurantListFetcherEl);
  });
  
  it('should get error message', (done) => {
    spyOn(LocalDatabase.prototype, 'getPreviewList').and.returnValue(Promise.reject());
    
    const localDatabase = new LocalDatabase(null);
    
    const onError = async () => {
      
      expect(localDatabase.getPreviewList).toHaveBeenCalledTimes(1);
      
      expect(document.querySelector('h2').innerText)
        .toEqual('Oops, there is something wrong!');
        
      done();
    }
    
    const restaurantListFetcherEl = createRestaurantListFetcherEl({ 
      onError, localDatabase 
    });
    
    document.body.appendChild(restaurantListFetcherEl);
  });
});
