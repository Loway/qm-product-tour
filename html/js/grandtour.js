(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    if (typeof TOUR === 'undefined') {
      console.error('grandtour: TOUR is not defined. Make sure 00-tour.js is loaded before grandtour.js.');
      return;
    }

    const tourDef = TOUR;
    const userConfig = typeof TOUR_CONFIG !== 'undefined' ? TOUR_CONFIG : {};
    const doneBtnUrl  = userConfig.doneBtnUrl || null;
    const totalSteps  = tourDef.reduce((sum, p) => sum + p.steps.length, 0);
    const nextBtnText = userConfig.nextBtnText || 'Next &rarr;';

    function currentPageName() {
      return window.location.pathname.split('/').pop() || 'index.html';
    }

    function stepFromUrl() {
      const val = new URLSearchParams(window.location.search).get('step');
      return val !== null ? parseInt(val, 10) : null;
    }

    // Find which page and local index own a given absolute step number.
    function resolveAbsStep(absStep) {
      let abs = 0;
      for (let i = 0; i < tourDef.length; i++) {
        const pageDef = tourDef[i];
        if (absStep >= abs && absStep < abs + pageDef.steps.length) {
          return { pageDef, pageIndex: i, localIndex: absStep - abs, startAbs: abs };
        }
        abs += pageDef.steps.length;
      }
      return null;
    }

    // Find metadata for a page by name.
    function resolvePageName(name) {
      let abs = 0;
      for (let i = 0; i < tourDef.length; i++) {
        const pageDef = tourDef[i];
        if (pageDef.page === name) {
          return {
            pageDef,
            pageIndex: i,
            startAbs: abs,
            prevPageDef: i > 0 ? tourDef[i - 1] : null,
            nextPageDef: tourDef[i + 1] || null
          };
        }
        abs += pageDef.steps.length;
      }
      return null;
    }

    const page = currentPageName();
    let absStep = stepFromUrl();

    // No ?step param: start at step 0. If not on the first page, redirect there.
    if (absStep === null) {
      if (!tourDef[0]) return;
      if (tourDef[0].page !== page) {
        window.location.href = tourDef[0].page;
        return;
      }
      absStep = 0;
    }

    // Resolve which page owns this step number.
    const stepInfo = resolveAbsStep(absStep);
    if (!stepInfo) {
      console.error('grandtour: step ' + absStep + ' is out of range.');
      return;
    }

    // Wrong page: redirect to the correct one.
    if (stepInfo.pageDef.page !== page) {
      window.location.href = stepInfo.pageDef.page + '?step=' + absStep;
      return;
    }

    // This page owns the step — build the driver.js step list.
    const pageInfo = resolvePageName(page);
    const { pageDef, startAbs, prevPageDef, nextPageDef } = pageInfo;
    const localStartIndex = absStep - startAbs;
    const isFinalPage = !nextPageDef;

    const steps = pageDef.steps.map((step, localIdx) => {
      const absIdx  = startAbs + localIdx;
      const isFirst = localIdx === 0;
      const isLast  = localIdx === pageDef.steps.length - 1;
      const isVeryLast = isFinalPage && isLast;

      const popover = { ...step.popover };

      // Global progress: show absolute position across all pages.
      popover.progressText = `${absIdx + 1} of ${totalSteps}`;

      // Cross-page "previous": redirect to last step of previous page.
      // Also clear disableButtons so driver.js doesn't disable the button on the
      // first local step (it would, because there is no local predecessor).
      if (isFirst && prevPageDef) {
        if (!popover.onPrevClick) {
          const prevAbs = absIdx - 1;
          popover.onPrevClick = () => {
            window.location.href = prevPageDef.page + '?step=' + prevAbs;
          };
        }
        popover.disableButtons = (popover.disableButtons || []).filter(b => b !== 'previous');
      }

      // Cross-page "next": redirect to first step of next page.
      // Also set nextBtnText explicitly so driver.js doesn't render "Done" here.
      if (isLast && nextPageDef && !popover.onNextClick) {
        const nextAbs = absIdx + 1;
        popover.nextBtnText = nextBtnText;
        popover.onNextClick = () => {
          window.location.href = nextPageDef.page + '?step=' + nextAbs;
        };
      }

      // Very last step of the whole tour: redirect to doneBtnUrl if configured.
      if (isVeryLast && doneBtnUrl && !popover.onNextClick) {
        popover.onNextClick = () => {
          window.location.href = doneBtnUrl;
        };
      }

      return { ...step, popover };
    });

    const driverObj = window.driver.js.driver({ ...userConfig, steps });
    driverObj.drive(localStartIndex);
  });
})();
