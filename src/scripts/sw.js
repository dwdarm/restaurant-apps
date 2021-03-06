import 'regenerator-runtime';

// eslint-disable-next-line import/no-extraneous-dependencies, import/first
import { precacheAndRoute } from 'workbox-precaching';
// eslint-disable-next-line import/no-extraneous-dependencies, import/first
import { registerRoute, setDefaultHandler } from 'workbox-routing';
// eslint-disable-next-line import/no-extraneous-dependencies, import/first
import { CacheFirst, NetworkFirst } from 'workbox-strategies';

// eslint-disable-next-line no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(/\.(?:png|gif|jpg|jpeg|svg)$/, new CacheFirst());

setDefaultHandler(new NetworkFirst());
