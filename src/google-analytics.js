export const GA_TRACKING_ID = 'G-8CDYWM6YVE';

export const pageview = (url) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};