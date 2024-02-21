import { Article } from '../types/Article';
import { limitStringLength } from './limitTextLength';

const API_KEY = '83ecf594ab5b45378737d06162869a68';

export async function fetchNewsArticlesFromAPI(page: number) {
  const response = await fetch(`https://newsapi.org/v2/everything?q=usa&pageSize=10&page=${page}&apiKey=${API_KEY}`);

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();

  const articlesWithLimitedText = data.articles.map((article: Article) => ({
    ...article,
    description: limitStringLength(article.description, 100),
    title: limitStringLength(article.title, 55),
  }));

  return articlesWithLimitedText;
}
