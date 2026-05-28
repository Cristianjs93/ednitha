import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { AppProviders } from '@/providers/AppProviders';
import { AppRouter } from '@/routes/AppRouter';
import { getPageHead } from '@/utils/pageHead';

export interface PrerenderInput {
  readonly url: string;
}

export async function prerender(data: PrerenderInput) {
  const html = renderToString(
    <StrictMode>
      <AppProviders>
        <AppRouter url={data.url} />
      </AppProviders>
    </StrictMode>,
  );

  const head = getPageHead(data.url);

  return { html, head };
}
