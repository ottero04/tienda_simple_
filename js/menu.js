function toggleMenu(id) {
      const allDropdowns = document.querySelectorAll('[id^="dropdown-"]');
      allDropdowns.forEach(menu => {
        if (menu.id === id) {
          menu.classList.toggle('hidden');
        } else {
          menu.classList.add('hidden');
        }
      });
    }

    window.addEventListener('click', (e) => {
      if (!e.target.closest('nav')) {
        const dropdowns = document.querySelectorAll('[id^="dropdown-"]');
        dropdowns.forEach(d => d.classList.add('hidden'));
      }
    });