'use client';

import css from './Footer.module.css';

export function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Yatsenko <redacted-name></p>
          <p>
            Contact us:{' '}
            <a href="mailto:<redacted-email>"><redacted-email></a>
          </p>
        </div>
      </div>
    </footer>
  );
}