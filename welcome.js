
let welcomeStep = 1;
let userName = '';
let userLanguage = 'ru';
let userAnswers = {};

function getUserData() {
  try {
    const userData = localStorage.getItem('user');
    const jsonData = localStorage.getItem('user_json');
    if (userData) {
      return JSON.parse(userData);
    }
    if (jsonData) {
      return JSON.parse(jsonData);
    }
  } catch (e) {
    console.error('Error loading user data:', e);
  }
  return null;
}

function saveUserData(name, language) {
  const userData = {
    name: name,
    language: language,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('user_json', JSON.stringify(userData));
  return userData;
}

function showWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcome-screen');
  if (welcomeScreen) {
    welcomeScreen.classList.remove('hidden');
  }
}

function hideWelcomeScreen() {
  const welcomeScreen = document.getElementById('welcome-screen');
  if (welcomeScreen) {
    welcomeScreen.classList.add('hidden');
  }
}

function showStep(stepNum) {
  // Скрыть все шаги (1, 2, 3, 99)
  for (let i = 1; i <= 3; i++) {
    const step = document.getElementById(`welcome-step-${i}`);
    if (step) {
      if (i === stepNum) {
        step.classList.remove('hidden');
      } else {
        step.classList.add('hidden');
      }
    }
  }
  // Шаг активации
  const activationStep = document.getElementById('welcome-step-99');
  if (activationStep) {
    if (stepNum === 99) {
      activationStep.classList.remove('hidden');
    } else {
      activationStep.classList.add('hidden');
    }
  }
}


let isAdmin = false;
let activationPassed = false;
let activationKey = '';

window.welcomeNext = function () {
  if (welcomeStep === 1) {
    const nameInput = document.getElementById('welcome-name-input');
    if (nameInput && nameInput.value.trim()) {
      userName = nameInput.value.trim();
      // Проверка на "admin"
      if (userName.toLowerCase() === 'admin') {
        isAdmin = true;
        welcomeStep = 2;
        showStep(2);
        const greeting = document.getElementById('welcome-greeting');
        if (greeting) {
          greeting.textContent = `hello, ${userName} (админ права выданы)`;
        }
      } else if (userName.toLowerCase().includes('admin')) {
        // Если имя похоже на admin, но не совпадает
        console.log('Шаг активации: имя содержит admin, но не равно admin');
        welcomeStep = 99; // специальный шаг для активации
        showStep(99);
      } else {
        welcomeStep = 2;
        showStep(2);
        const greeting = document.getElementById('welcome-greeting');
        if (greeting) {
          greeting.textContent = `hello, ${userName}`;
        }
      }
    } else {
      alert('Please enter your name');
    }
  }
};


  const userData = {
    name: userName,
    language: userLanguage,
    activationKey: enteredKey,
    isAdmin: true,
    createdAt: new Date().toISOString()
  };

  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('user_json', JSON.stringify(userData));

  errorMsg.textContent = '';
  activationPassed = true;
  isAdmin = true;

  welcomeStep = 3;
  showStep(3);

  const greeting = document.getElementById('welcome-greeting');
  if (greeting) {
    greeting.textContent = `hello, ${userName} (админ права выданы)`;
  }
};


window.selectLanguage = function (lang) {
  userLanguage = 'ru';
  setTimeout(() => {
    welcomeStep = 3;
    showStep(3);
  }, 300);
};

window.welcomeFinish = function () {
  const userData = {
    name: userName,
    language: userLanguage,
    activationKey: activationKey || '',
    isAdmin: isAdmin,
    createdAt: new Date().toISOString()
  };
  localStorage.setItem('user', JSON.stringify(userData));
  localStorage.setItem('user_json', JSON.stringify(userData));
  window.location.href = './all/ru/index.html';
};

function updateScreenClass() {
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  document.body.classList.remove('screen-mobile', 'screen-tablet', 'screen-desktop');
  
  if (screenWidth < 768) {
    document.body.classList.add('screen-mobile');
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    document.body.classList.add('screen-tablet');
  } else {
    document.body.classList.add('screen-desktop');
  }
}

updateScreenClass();

window.addEventListener('resize', updateScreenClass);

const existingUserData = getUserData();
if (existingUserData && existingUserData.name) {
  window.location.href = './all/ru/index.html';
} else {
  showWelcomeScreen();
  showStep(1);
}


