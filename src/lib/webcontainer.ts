import { WebContainer } from '@webcontainer/api';

// Hold the promise, not just the instance
let bootPromise: Promise<WebContainer> | undefined;

export async function getWebContainer() {
  if (typeof window === 'undefined') return null; // Safety for SSR

  if (!bootPromise) {
    bootPromise = WebContainer.boot();
  }
  
  return bootPromise;
}