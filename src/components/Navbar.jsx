import { useEffect, useState } from 'react';
import styles from './Navbar.module.css';

const links = [
  { label: 'about', href: '#about' },
  { label: 'skills', href: '#skills' },
  { label: 'projects', href: '#projects' },
  { label: 'wins', href: '#achievements' },
  { label: 'contact', href: '#contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const sectionIds = links.map(l => l.href.replace('#', ''));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActive('#' + entry.target.id);
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActive('');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__inner}>
        <span className={styles.navbar__logo} onClick={scrollToTop}>
          vipin.g
        </span>
        <ul className={styles.navbar__links}>
          {links.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                className={active === link.href ? styles.active : ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                  setActive(link.href);
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
