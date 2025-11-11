import { mountHeader } from './header.js';
import { mountCatalog } from './catalog.js';
import { mountFooter } from './footer.js';

// Acts as the micro-frontend host by booting each isolated shell.
mountHeader();
mountCatalog();
mountFooter();
