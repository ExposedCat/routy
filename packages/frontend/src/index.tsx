import ReactDOM from 'react-dom/client';
import React from 'react';

import { Router } from './router';
import { ProvideQueryClient } from './query-client.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ProvideQueryClient>
      <Router />
    </ProvideQueryClient>
  </React.StrictMode>,
);
