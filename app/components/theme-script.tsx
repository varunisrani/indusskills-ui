// Inline script that runs before React hydrates, so we don't flash the wrong theme.
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('indus-theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
