import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addArticle } from '../../store/slices/userArticlesSlice';
import { Article } from '../../types/Article';
import './ArticleFrom.scss';

type Props = {
  handleModalClose?: () => void,
}

export const ArticleForm: React.FC<Props> = ({ handleModalClose }) => {
  const [formData, setFormData] = useState<Omit<Article, 'publishedAt'>>({
    title: '',
    description: '',
    urlToImage: '',
    author: ''
  });

  const dispatch = useDispatch();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (Object.values(formData).some(value => value === '')) {
      alert('Please fill in all fields.');

      return;
    }

    dispatch(addArticle(formData));

    setFormData({
      title: '',
      description: '',
      urlToImage: '',
      author: ''
    });

    if (handleModalClose) {
      handleModalClose();
    }
  };

  return (
      <form 
        action="submit" 
        className="articleForm"
        onSubmit={handleSubmit}
      >
        <h2 className="articleForm__title">Add new article</h2>

        <div className="articleForm__group">
          <label htmlFor="title" className="articleForm__label">Title:</label>

          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            className="articleForm__input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="articleForm__group">
          <label htmlFor="urlToImage" className="articleForm__label">Photo URL:</label>

          <input
            type="url"
            id="urlToImage"
            name="urlToImage"
            value={formData.urlToImage}
            className="articleForm__input"
            onChange={handleInputChange}
          />
        </div>

        <div className="articleForm__group">
          <label htmlFor="description" className="articleForm__label">Description:</label>

          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            className="articleForm__input articleForm__input--resize"
            required
            minLength={10}
            onChange={handleInputChange}
          />
        </div>

        <div className="articleForm__group">
          <label htmlFor="author" className="articleForm__label">Author name:</label>

          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            className="articleForm__input"
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="articleForm__buttons">
          <button
            type="submit"
            className="articleForm__button articleForm__button--submit"
          >
            Add article
          </button>

          <button
            type="button"
            className="articleForm__button articleForm__button--cancel"
            onClick={handleModalClose}
          >
            Cancel
          </button>
        </div>
      </form>
  );
};