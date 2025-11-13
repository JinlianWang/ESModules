import './styles.css';
import { mountHeader } from './header.js';
import { mountCatalog } from './catalog.js';

const HEADER_ROOT_ID = 'header-root';
const CATALOG_ROOT_ID = 'catalog-root';
const FOOTER_ROOT_ID = 'footer-root';

// Acts as the micro-frontend host by booting each isolated shell.
mountHeader(HEADER_ROOT_ID);
mountCatalog(CATALOG_ROOT_ID, FOOTER_ROOT_ID);
