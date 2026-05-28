import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/index';

export interface AppProvidersProps {
  readonly children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <Provider store={store}>{children}</Provider>;
}
