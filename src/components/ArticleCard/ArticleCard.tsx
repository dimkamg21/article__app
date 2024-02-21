import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { Article } from '../../types/Article';
import { DeleteIcon } from '../../assets/icons/DeleteIcon';
import { PinIcon } from '../../assets/icons/PinIcon';
import { ArticleOrigin } from '../../types/ArticleOrigin';
import { useAppSelector } from '../../helpers/hooks/hooks';
import { pinArticle, removeArticle, unpinArticle } from '../../store/slices/userArticlesSlice';
import './ArticleCard.scss';
import { UnpinIcon } from '../../assets/icons/UnpinIcon';

type Props = {
  article: Article;
  origin: ArticleOrigin;
}

export const ArticleCard: React.FC<Props> = ({ article, origin }) => {
  const {
    urlToImage,
    author,
    description,
    title,
    publishedAt,
  } = article;

  const { pinnedArticle } = useAppSelector(state => state.userArticles);

  const dispatch = useDispatch();

  const handleRemoveButton = () => {
    dispatch(removeArticle(publishedAt));
  };
  
  const isPinnedArticle = publishedAt === pinnedArticle?.publishedAt;

  const handlePinButton= () => {
    if (isPinnedArticle) {
      dispatch(unpinArticle());
    } else if (!pinnedArticle) {
      dispatch(pinArticle(publishedAt));
    }
  };

  return (
    <article 
      className={cn("articleCard", {
        "articleCard--pinned": isPinnedArticle
      })}
    >
      <div className="articleCard__container">
        <img
          src={urlToImage}
          alt="Article image"
          className="articleCard__image"
        />

        <div className="articleCard__row">
          <p className="articleCard__title">{title}</p>

          {origin === ArticleOrigin.ByUser && (
              <button
                type="button"
                className="articleCard__icon"
                onClick={handlePinButton}
              >
                {isPinnedArticle ? <UnpinIcon /> : <PinIcon />}
              </button>
            )}
        </div>

        <p className="articleCard__description">{description}</p>

        <div className="articleCard__row">
          <p className="articleCard__author">{`Author: ${author}`}</p>

          {origin === ArticleOrigin.ByUser && (
            <button
              type="button"
              className="articleCard__icon"
              onClick={handleRemoveButton}
            >
              <DeleteIcon />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};