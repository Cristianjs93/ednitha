import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { applyPageHead, getPageHead } from '@/utils/pageHead';

export function usePageHead(): void {
  const { pathname, search } = useLocation();
  const url = `${pathname}${search}`;

  useLayoutEffect(() => {
    applyPageHead(getPageHead(url));
  }, [url]);
}
