import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserArticlesPage } from './pages/UserArticlesPage/UserArticlesPage';
import  App  from './App';
import { NewsArticlesPage } from './pages/NewsArticlesPage/NewsArticlesPage';

export const Root = () => (
  <Router>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<UserArticlesPage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="news" element={<NewsArticlesPage />} />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Route>
    </Routes>
  </Router>
);
