import layoutStyles from './layout.module.css';
import { mountHeader } from './header.js';
import { mountCatalog } from './catalog.js';

const HEADER_ROOT_ID = 'header-root';
const CATALOG_ROOT_ID = 'catalog-root';
const FOOTER_ROOT_ID = 'footer-root';
const TITLE_ID = 'demo-title';
const SECTIONS_ROOT_ID = 'sections-root';

applyLayoutClasses();

// Acts as the micro-frontend host by booting each isolated shell.
mountHeader(HEADER_ROOT_ID);
mountCatalog(CATALOG_ROOT_ID, FOOTER_ROOT_ID);

function applyLayoutClasses() {
    document.body.classList.add(layoutStyles.page);

    const titleEl = document.getElementById(TITLE_ID);
    if (titleEl) {
        titleEl.classList.add(layoutStyles.title);
    }

    const sectionsEl = document.getElementById(SECTIONS_ROOT_ID);
    if (sectionsEl) {
        sectionsEl.classList.add(layoutStyles.sections);
    }

    const headerEl = document.getElementById(HEADER_ROOT_ID);
    if (headerEl) {
        headerEl.classList.add(layoutStyles.section);
    }

    const catalogEl = document.getElementById(CATALOG_ROOT_ID);
    if (catalogEl) {
        catalogEl.classList.add(layoutStyles.section, layoutStyles.catalog);
    }

    const footerEl = document.getElementById(FOOTER_ROOT_ID);
    if (footerEl) {
        footerEl.classList.add(layoutStyles.section);
    }
}
