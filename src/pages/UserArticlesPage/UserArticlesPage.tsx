import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { ArticleOrigin } from '../../types/ArticleOrigin';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { initUserArticles, setQuery } from '../../store/slices/userArticlesSlice';
import { ArticleForm } from '../../components/ArticleForm/ArticleForm';
import { ArticleCard } from '../../components/ArticleCard/ArticleCard';
import { getQueryArticles } from '../../helpers/getQueryArticles';
import './UserArticlesPage.scss';

export const UserArticlesPage = () => {
  const [isModal, setIsModal] = useState(false);
  const { userArticles } = useAppSelector(state => state.userArticles);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  const articleFormRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();

  const handleAddButtonClick = () => {
    setIsModal(prev => !prev);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const queryToUpdate = event.target.value || '';

    const newSearchParams = new URLSearchParams(searchParams);

    if (queryToUpdate === '') {
      newSearchParams.delete('query');
    } else {
      newSearchParams.set('query', queryToUpdate);
    }

    setSearchParams(newSearchParams);

    dispatch(setQuery(queryToUpdate));
  };

  const filteredArticles = getQueryArticles(userArticles, query);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (articleFormRef.current && !articleFormRef.current.contains(event.target as Node)) {
        setIsModal(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(initUserArticles());
  }, []);

  return (
    <>
    <div className={cn('userArticles', {
      'userArticles--activeModal': isModal,
    })}>    
      <div className="userArticles__controllers">
        <input
          type="text"
          placeholder="Search your article"
          value={query}
          onChange={handleSearchQueryChange}
          className="userArticles__controllers--input"
        />

        <button
          type="button"
          className="userArticles__controllers--button"
          onClick={handleAddButtonClick}
        >
          Add article
        </button>
      </div>

      <div className="userArticles__list">
        {userArticles.length === 0 && (
          <h2 className="userArticles__not-found">You dont have any articles yet</h2>
        )}

        {(filteredArticles.length === 0 && userArticles.length !== 0)? (
          <h2 className="userArticles__not-found">Article was not found</h2>
        ) : (
          filteredArticles.map((item) => (
            <ArticleCard 
              key={item.publishedAt} 
              article={item}
              origin={ArticleOrigin.ByUser}
            />
          ))
        )}
      </div>

    </div>

    {isModal && (
      <div ref={articleFormRef}>          
        <ArticleForm handleModalClose={handleAddButtonClick} />
      </div>
    )}
  </>
  );
};
