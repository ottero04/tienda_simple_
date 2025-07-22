document.getElementById('hamburger').addEventListener('click', function () {
        const mobileMenu = document.getElementById('mobile-menu');
        mobileMenu.classList.toggle('hidden');
      });

      function toggleMenu(id) {
        document.querySelectorAll('[id^="dropdown-"]').forEach(menu => {
          if (menu.id === id) {
            menu.classList.toggle('hidden');
          } else {
            menu.classList.add('hidden');
          }
        });
      }