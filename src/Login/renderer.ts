const form = document.getElementById('loggin-form') as HTMLFormElement;
const formError = document.getElementById('error');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (form.username?.value !== 'SR'
        || form.pwd?.value !== '2024') {
            formError.innerText = "Invalid credentials";
            formError.classList.remove('closed')
            form.username.value = "";
            form.pwd.value = "";
            return false;
        }

    formError.innerText = "";
    formError.classList.add('closed')

    window.electronAPI.login();

    return true;
});

console.log('👋 This message is being logged by "renderer.ts", included via Vite');
