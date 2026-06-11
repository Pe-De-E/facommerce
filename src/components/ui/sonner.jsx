import { useEffect, useState } from 'react';
import { Toaster as Sonner } from 'sonner';

const getHtmlTheme = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light';

const Toaster = (props) => {
  const [theme, setTheme] = useState(getHtmlTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(getHtmlTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return <Sonner theme={theme} richColors {...props} />;
};

export { Toaster };
