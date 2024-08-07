import { loginController } from "../controller/dipControllers";

//const loginForm = document.getElementById('loginPage') as HTMLElement;
const emailInput = document.getElementById('emailInput') as HTMLInputElement;
const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;
const loginButton = document.getElementById('loginButton') as HTMLButtonElement;
const rotulationPage = document.getElementById('rotulationPage') as HTMLElement;
const loginPage = document.getElementById('loginPage') as HTMLElement;
const loadingPage = document.getElementById('loadingPage') as HTMLElement;

loginButton.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    // Desabilita os inputs e o botão
    emailInput.disabled = true;
    passwordInput.disabled = true;
    loginButton.disabled = true;
    loginButton.textContent = 'Entrando...';

    try {
        await loginController.signInWithEmailAndPassword(email, password);

        // // Login bem-sucedido
        // loginForm.classList.remove('active');
        // rotulationPage.classList.add('active');
        resetLoginForm();
    } catch (error) {
        // Login falhou
        alert('Falha ao fazer login. Verifique suas credenciais e tente novamente.');
        // Reativa os inputs e o botão
        resetLoginForm();
    }
});

const logoutButton = document.getElementById('logoutButton') as HTMLButtonElement;

logoutButton.addEventListener('click', async () => {
    try {
        loginController.signOut();
    } catch (error) {
        console.error('Erro ao fazer logout', error);
    }
});

loginController.onAuthStateChange((user) => {
    if (user) {
        deactivateAllPages();
        rotulationPage.classList.add('active');
        logoutButton.classList.add('active');
    }else{
        deactivateAllPages();
        loginPage.classList.add('active');
        logoutButton.classList.remove('active');
    }
});

function deactivateAllPages():void{
    loadingPage.classList.remove('active');
    loginPage.classList.remove('active');
    rotulationPage.classList.remove('active');
    // const pages = document.getElementsByTagName('main');
    // for(let i=0;i<pages.length;i++){
    //     const page = pages.item(i);
    //     page?.classList.remove('active');
    // }
}

logoutButton.hidden = false;

function resetLoginForm() {
    emailInput.disabled = false;
    passwordInput.disabled = false;
    loginButton.disabled = false;
    loginButton.textContent = 'Avançar';
    emailInput.value = '';
    passwordInput.value = '';
}

