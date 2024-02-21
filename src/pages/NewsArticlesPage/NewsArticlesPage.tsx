import { useEffect, useState } from 'react';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { useDispatch } from 'react-redux';
import { fetchNewsArticles } from '../../store/slices/newsArticlesSlice';
import { AppDispatch } from '../../store/store';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { ArticleOrigin } from '../../types/ArticleOrigin';
import './NewsArticlesPage.scss';

export const NewsArticlesPage = () => {
  const { newsArticles } = useAppSelector(state => state.newsArticles);
  const [page] = useState(1);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('heck');
    
    dispatch(fetchNewsArticles(page));
  }, []);

  return (
    <div className="newsArticles">
      <div className="newsArticles__list">
        {newsArticles.length === 0 && (
          <h2 className="newsArticles__not-found">You dont have any articles yet</h2>
        )}

        {newsArticles.length > 0 && (
          newsArticles.map((item) => (
            <ArticleCard 
              key={item.publishedAt} 
              article={item}
              origin={ArticleOrigin.FromAPI}
            />
          ))
        )}
      </div>
    </div>
  );
};
