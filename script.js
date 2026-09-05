(() => {
      const header = document.getElementById('siteHeader');
      const modal = document.getElementById('lineModal');
      const closeButton = document.getElementById('modalClose');
      const laterButton = document.getElementById('modalLater');
      const todayButton = document.getElementById('modalToday');
      const dismissKey = 'kimYeonsuLineCtaDismissedUntil';
      let lastFocused = null;

      const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
      updateHeader();
      window.addEventListener('scroll', updateHeader, { passive: true });

      const openModal = () => {
        lastFocused = document.activeElement;
        modal.classList.add('is-visible');
        document.body.classList.add('modal-open');
        window.setTimeout(() => closeButton.focus(), 120);
      };

      const closeModal = () => {
        modal.classList.remove('is-visible');
        document.body.classList.remove('modal-open');
        if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      };

      const hideForToday = () => {
        try { localStorage.setItem(dismissKey, String(Date.now() + 24 * 60 * 60 * 1000)); } catch (error) {}
        closeModal();
      };

      let shouldShow = true;
      try { shouldShow = Number(localStorage.getItem(dismissKey) || 0) < Date.now(); } catch (error) {}
      if (shouldShow) window.setTimeout(openModal, 2600);

      closeButton.addEventListener('click', closeModal);
      laterButton.addEventListener('click', closeModal);
      todayButton.addEventListener('click', hideForToday);
      modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
      document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.classList.contains('is-visible')) closeModal(); });
    })();
