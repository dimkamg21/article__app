import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { Loader } from '../../components/Loader/Loader';
import { ArticleOrigin } from '../../types/ArticleOrigin';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { fetchNewsArticles, setPage } from '../../store/slices/newsArticlesSlice';
import './NewsArticlesPage.scss';

export const NewsArticlesPage = () => {
  const { 
    newsArticles, page, isLoading, hasError
  } = useAppSelector(state => state.newsArticles);

  const dispatch = useDispatch<AppDispatch>();

  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  useEffect(() => {
    dispatch(fetchNewsArticles(page));
  }, [dispatch, page]);

  return (
    <div className="newsArticles">
      <div className="newsArticles__list">
        {isLoading && page === 1 && <Loader/>}

        {(!isLoading && hasError) && (
          <h2 className="newsArticles__not-found">Something went wrong during loading</h2>
        )}

        {(newsArticles.length === 0 && !isLoading && !hasError) && (
          <h2 className="newsArticles__not-found">You dont have any articles yet</h2>
        )}

        {(newsArticles.length > 0 && !hasError) && (
          newsArticles.map((item) => (
            <ArticleCard 
              key={item.publishedAt} 
              article={item}
              origin={ArticleOrigin.FromAPI}
            />
          ))
        )}

        {isLoading && page !== 1 && (
          <div className="newsArticles__list--loader">
            <Loader/>
          </div>
        )}
      </div>

      {!isLoading && !hasError && (<button
        type="button"
        className="newsArticles__addMore--button"
        onClick={handleLoadMore}
      >
        Load more
      </button>)}
    </div>
  );
};
