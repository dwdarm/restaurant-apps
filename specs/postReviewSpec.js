import LocalDatabase from '../src/scripts/data/local-database';
import '../src/scripts/components/containers/review-poster';

const createReviewPosterEl = ({ id, localDatabase, onSuccess, onError }) => {
  const reviewPosterEl = document.createElement('review-poster');
  reviewPosterEl.id = id;
  reviewPosterEl.localDatabase = localDatabase;
  reviewPosterEl.addEventListener('review-poster:success', onSuccess);
  reviewPosterEl.addEventListener('review-poster:error', onError);

  return reviewPosterEl;
}

describe(`Post A Customer's review`, () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });
  
  it('should post a customer review', (done) => {
    spyOn(LocalDatabase.prototype, 'postReview').and.returnValue(Promise.resolve({
      customerReviews: [{ name: 'name' }],
    }));
    
    const localDatabase = new LocalDatabase(null);
    
    const onSuccess = async () => {
      
      expect(localDatabase.postReview).toHaveBeenCalledWith({
        id: 1, name: 'name', review: 'text'
      });
      
      expect(document.querySelectorAll('.restaurant-review-item').length)
        .toEqual(1);
        
      done();
    }
    
    const reviewPosterEl = createReviewPosterEl({ id: 1, onSuccess, localDatabase });
    
    document.body.appendChild(reviewPosterEl);
    
    document.querySelector('#review-input-name').value = 'name';
    document.querySelector('#review-input-text').value = 'text';
    document.querySelector('#review-form').dispatchEvent(new Event('submit'));
  });
  
  it('when error on API', (done) => {
    spyOn(LocalDatabase.prototype, 'postReview').and.returnValue(Promise.reject());
    
    const localDatabase = new LocalDatabase(null);
    
    const onError = async () => {
      
      expect(localDatabase.postReview).toHaveBeenCalledTimes(1);
      
      expect(document.querySelectorAll('.restaurant-review-item').length)
        .toEqual(0);
        
      done();
    }
    
    const reviewPosterEl = createReviewPosterEl({ id: 1, onError, localDatabase });
    
    document.body.appendChild(reviewPosterEl);
    
    document.querySelector('#review-input-name').value = 'name';
    document.querySelector('#review-input-text').value = 'text';
    document.querySelector('#review-form').dispatchEvent(new Event('submit'));
  });
  
});
