import { Article } from '../types/Article';

export const getQueryArticles = (articles: Article[], query: string) => {
  const queryParts = query.toLowerCase().split(' ');

  return articles.filter(article => {
    const titleMatches = queryParts.every(part => article.title.toLowerCase().includes(part));
    const descriptionMatches = queryParts.every(part => article.description.toLowerCase().includes(part));

    return titleMatches || descriptionMatches;
  });
};
