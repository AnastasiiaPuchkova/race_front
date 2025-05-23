document.querySelector('.btn_confirm').addEventListener('click', async(e) => {
    e.preventDefault();

    const sessionType = document.querySelector('input[name="session"]:checked')?.value;
    const lobbyName = document.getElementById('name_of_lobby').value;
    const lobbyPassword = document.getElementById('password_for_lobby').value;

    if (!sessionType) {
        alert('Please select Create or Connect session');
        return;
    }
    // TODO: добавить div для отображения сообщений вместо alert
    if (!lobbyName) {
        alert('Please enter the name of lobby');
        return;
    }                

    if (!lobbyPassword) {
        alert('Please enter the password of lobby');
        return;
    }

    const type = sessionType === 'create' ? 'create_room' : 'join_room';
    const url = sessionType === 'create' ? '/rooms' : `/rooms${encodeURIComponent(lobbyName)/player}`; // change player
    

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: {
                    id: lobbyName,
                    type: type,
                    attributes: {
                        password: lobbyPassword
                    }
                }
            })
        });

        const result = await response.json();

        if (response.ok) {
            console.log(`${sessionType} session success:`, result);
            alert(`${sessionType === 'create' ? 'Created' : 'Connected to'} session successfully!`);
            // редирект, если это подключение к сессии
        }
        else {
            const error = result?.error || result?.message || 'Session error';
            alert(error);
        }
    }
    catch (err) {
        console.error(err);
        alert('Server error')
    }
});