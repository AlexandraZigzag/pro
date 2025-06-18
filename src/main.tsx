import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';
import '@components/Theme.css';
import Theme from '@components/Theme';
import App from '@/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/*<Theme>*/}
    <App />
      {/*</Theme>*/}
  </StrictMode>
);
