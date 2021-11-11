// eslint-disable-next-line import/no-extraneous-dependencies
import { precacheAndRoute } from 'workbox-precaching';
// eslint-disable-next-line import/no-extraneous-dependencies
import { registerRoute, setDefaultHandler } from 'workbox-routing';
// eslint-disable-next-line import/no-extraneous-dependencies
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new CacheFirst());

setDefaultHandler(new NetworkFirst());
