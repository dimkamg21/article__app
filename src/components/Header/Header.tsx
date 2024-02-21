import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import './Header.scss';

export const Header = () => {
  return (
    <header className="header">
      <nav className="header__navbar" role="navigation">
        <ul className="nav__list">
          <li className="nav__item">
            <NavLink 
              to="/" 
              className={({ isActive }) => getLinkClass({ isActive })}
            >
              My Articles
            </NavLink>
          </li>

          <li className="nav__item navbar-item">
            <NavLink 
              to="news" 
              className={({ isActive }) => getLinkClass({ isActive })}
            >
              News Articles
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const getLinkClass = ({ isActive }: { isActive: boolean }) => {
  return cn({
    'is-active': isActive,
  });
};