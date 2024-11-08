fetch('user.json')
    .then(response => response.json())
    .then(users => {
        const container = document.getElementById('users-container');

        users.forEach(user => {
            // Tworzenie sekcji dla każdego użytkownika
            const userSection = document.createElement('div');
            userSection.classList.add('user-section');

            // Tworzenie nagłówka z imieniem i nazwiskiem
            const userName = document.createElement('h2');
            userName.textContent = `${user.firstName} ${user.lastName}`;

            // Tworzenie checkboxa do ukrywania/wyświetlania danych kontaktowych
            const toggleCheckbox = document.createElement('input');
            toggleCheckbox.type = 'checkbox';
            toggleCheckbox.checked = true;
            toggleCheckbox.addEventListener('change', () => {
                // Przełączanie widoczności danych kontaktowych
                const contactInfo = userSection.querySelector('.contact-info');
                contactInfo.style.display = toggleCheckbox.checked ? 'block' : 'none';
            });

            const toggleLabel = document.createElement('label');
            toggleLabel.textContent = 'Pokaż dane kontaktowe';
            toggleLabel.style.marginLeft = '10px';

            // Tworzenie kontenera na dane kontaktowe
            const contactInfo = document.createElement('div');
            contactInfo.classList.add('contact-info');
            contactInfo.innerHTML = `
                <p>Email: ${user.email}</p>
                <p>Telefon: ${user.phone}</p>
                <p>Adres: ${user.Address.Street}, ${user.Address.City}, ${user.Address.Country}</p>
            `;

            // Dodawanie elementów do sekcji użytkownika
            userSection.appendChild(userName);
            userSection.appendChild(toggleCheckbox);
            userSection.appendChild(toggleLabel);
            userSection.appendChild(contactInfo);

            // Dodanie sekcji użytkownika do kontenera
            container.appendChild(userSection);
        });
    })
    .catch(error => {
        console.error('Błąd podczas ładowania pliku user.json:', error);
    });