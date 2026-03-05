// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// API Base URL - для локальной разработки
const API_URL = ''; // Пусто - запросы идут на тот же сервер

// Translations
const translations = {
    ru: {
        schedule: 'Расписание',
        profile: 'Профиль',
        news: 'Новости',
        lion_reminder: 'Напоминание о Льве',
        channels: 'Каналы',
        donate: 'Поддержка',
        nickname: 'Никнейм',
        server: 'Сервер/Штат',
        timezone: 'Часовой пояс',
        level: 'Уровень',
        level_beginner: '🌱 Начинающий',
        level_intermediate: '⚔️ Средний',
        level_pro: '👑 Профи',
        language: 'Язык',
        notifications: 'Уведомления',
        save: 'Сохранить',
        datetime: 'Дата и время',
        repeat: 'Повторение',
        no_repeat: 'Без повтора',
        daily: 'Ежедневно',
        weekly: 'Еженедельно',
        set_reminder: 'Установить напоминание',
        your_reminders: 'Ваши напоминания',
        channels_info: 'Добавьте бота в свой Telegram-канал для получения уведомлений',
        channels_steps: 'Шаги: 1) Создайте канал 2) Добавьте бота как администратора 3) Готово!',
        donate_text: 'Если вам нравится наш бот и вы хотите поддержать его развитие, будем благодарны за любую сумму!',
        requisites: 'Реквизиты',
        thank_you: '🙏 Спасибо за вашу поддержку!',
        registration: 'Регистрация',
        register: 'Зарегистрироваться'
    },
    en: {
        schedule: 'Schedule',
        profile: 'Profile',
        news: 'News',
        lion_reminder: 'Lion Reminder',
        channels: 'Channels',
        donate: 'Donate',
        nickname: 'Nickname',
        server: 'Server/State',
        timezone: 'Timezone',
        level: 'Level',
        level_beginner: '🌱 Beginner',
        level_intermediate: '⚔️ Intermediate',
        level_pro: '👑 Pro',
        language: 'Language',
        notifications: 'Notifications',
        save: 'Save',
        datetime: 'Date and Time',
        repeat: 'Repeat',
        no_repeat: 'No repeat',
        daily: 'Daily',
        weekly: 'Weekly',
        set_reminder: 'Set Reminder',
        your_reminders: 'Your Reminders',
        channels_info: 'Add the bot to your Telegram channel to receive notifications',
        channels_steps: 'Steps: 1) Create a channel 2) Add bot as admin 3) Done!',
        donate_text: 'If you like our bot and want to support its development, we appreciate any amount!',
        requisites: 'Requisites',
        thank_you: '🙏 Thank you for your support!',
        registration: 'Registration',
        register: 'Register'
    }
};

// State
let currentUser = null;
let currentLang = 'ru';

// Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(`screen-${screenId}`).classList.add('active');
    
    // Load data based on screen
    if (screenId === 'profile') {
        loadProfile();
    } else if (screenId === 'schedule') {
        loadSchedule();
    } else if (screenId === 'news') {
        loadNews();
    } else if (screenId === 'lion') {
        loadReminders();
    } else if (screenId === 'channels') {
        loadChannels();
    }
}

// Initialize app
async function initApp() {
    // Get user data from Telegram
    const user = tg.initDataUnsafe?.user;
    
    if (user) {
        // Try to load user from localStorage (для демонстрации)
        try {
            const storedData = localStorage.getItem(`user_${user.id}`);
            
            if (storedData) {
                currentUser = JSON.parse(storedData);
                currentLang = currentUser.language || 'ru';
                document.getElementById('headerNickname').textContent = currentUser.nickname;
                updateLanguage(currentLang);
                showScreen('home');
            } else {
                // New user - show registration
                showScreen('registration');
            }
        } catch (error) {
            console.error('Error loading user:', error);
            showScreen('registration');
        }
    } else {
        // Fallback for testing
        showScreen('registration');
    }
}

// API Functions
async function loadUser(telegramId) {
    const response = await fetch(`${API_URL}/api/user/${telegramId}`);
    if (response.ok) {
        return response.json();
    }
    return null;
}

// Save user to localStorage (backup)
function saveUser(user) {
    localStorage.setItem(`user_${user.telegram_id}`, JSON.stringify(user));
}

async function loadProfile() {
    if (!currentUser) return;
    
    document.getElementById('profile-nickname').value = currentUser.nickname || '';
    document.getElementById('profile-server').value = currentUser.server || '';
    document.getElementById('profile-timezone').value = currentUser.timezone || 'UTC';
    document.getElementById('profile-level').value = currentUser.level || 'beginner';
    document.getElementById('profile-language').value = currentUser.language || 'ru';
    document.getElementById('profile-notifications').checked = currentUser.notifications_enabled || false;
}

async function loadSchedule() {
    const container = document.getElementById('schedule-list');
    container.innerHTML = '<div class="loading">Загрузка...</div>';
    
    try {
        const user = tg.initDataUnsafe?.user;
        if (!user) {
            container.innerHTML = '<p class="loading">Ошибка авторизации</p>';
            return;
        }
        
        // Получаем пользователя для определения уровня
        const userData = await loadUser(user.id);
        const level = userData?.level || 'beginner';
        const lang = userData?.language || 'ru';
        
        const response = await fetch(`${API_URL}/api/events?level=${level}`);
        const events = await response.json();
        
        if (events.length === 0) {
            container.innerHTML = '<p class="loading">Событий пока нет</p>';
            return;
        }
        
        container.innerHTML = events.map(event => {
            const title = lang === 'ru' ? event.title_ru : event.title_en;
            const desc = lang === 'ru' ? (event.description_ru || '') : (event.description_en || '');
            const timeStr = formatDateTime(event.event_time);
            
            return `
                <div class="event-card">
                    <h3>${title}</h3>
                    <p>${desc}</p>
                    <div class="event-time">⏰ ${timeStr}</div>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading schedule:', error);
        container.innerHTML = '<p class="loading">Ошибка загрузки</p>';
    }
}

async function loadNews() {
    const container = document.getElementById('news-list');
    container.innerHTML = '<div class="loading">Загрузка...</div>';
    
    try {
        const response = await fetch(`${API_URL}/api/news`);
        const news = await response.json();
        
        if (news.length === 0) {
            container.innerHTML = '<p class="loading">Новостей пока нет</p>';
            return;
        }
        
        const lang = currentLang;
        container.innerHTML = news.map(item => {
            const title = lang === 'ru' ? item.title_ru : item.title_en;
            const content = lang === 'ru' ? item.content_ru : item.content_en;
            
            return `
                <div class="news-card">
                    <h3>${title}</h3>
                    <p>${content}</p>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading news:', error);
        container.innerHTML = '<p class="loading">Ошибка загрузки</p>';
    }
}

async function loadReminders() {
    const container = document.getElementById('reminders-container');
    const user = tg.initDataUnsafe?.user;
    
    if (!user) {
        container.innerHTML = '<p class="loading">Ошибка авторизации</p>';
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/reminders/${user.id}`);
        const reminders = await response.json();
        
        if (reminders.length === 0) {
            container.innerHTML = '<p class="loading">Нет активных напоминаний</p>';
            return;
        }
        
        const lang = currentLang;
        container.innerHTML = reminders.map(r => `
            <div class="reminder-item">
                <span>${r.title} - ${formatDateTime(r.remind_time)}</span>
                <button class="delete-btn" onclick="deleteReminder(${r.id})">✕</button>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading reminders:', error);
        container.innerHTML = '<p class="loading">Ошибка загрузки</p>';
    }
}

async function loadChannels() {
    const container = document.getElementById('channels-list');
    
    try {
        // В реальном проекте: fetch(`${API_URL}/channels/${currentUser.telegram_id}`)
        
        container.innerHTML = '';
        
    } catch (error) {
        console.error('Error loading channels:', error);
    }
}

// Form handlers
document.getElementById('registration-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nickname = document.getElementById('reg-nickname').value.trim();
    const server = document.getElementById('reg-server').value.trim();
    
    const user = tg.initDataUnsafe?.user;
    
    try {
        // Сохраняем в базу данных через API
        const response = await fetch(`${API_URL}/api/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telegram_id: user?.id || 0,
                username: user?.username || '',
                nickname,
                server
            })
        });
        
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        
        currentUser = await response.json();
        
        // Сохраняем локально
        saveUser(currentUser);
        
        document.getElementById('headerNickname').textContent = nickname;
        showScreen('home');
        
        // Notify Telegram bot
        tg.sendData(JSON.stringify({ action: 'registered', nickname, server }));
        
    } catch (error) {
        console.error('Registration error:', error);
        tg.showAlert('Ошибка регистрации');
    }
});

document.getElementById('profile-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const profileData = {
        nickname: document.getElementById('profile-nickname').value.trim(),
        server: document.getElementById('profile-server').value.trim(),
        timezone: document.getElementById('profile-timezone').value,
        level: document.getElementById('profile-level').value,
        language: document.getElementById('profile-language').value,
        notifications_enabled: document.getElementById('profile-notifications').checked
    };
    
    try {
        const user = tg.initDataUnsafe?.user;
        
        // Сохраняем в базу данных через API
        const response = await fetch(`${API_URL}/api/profile`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                telegram_id: user?.id || 0,
                ...profileData
            })
        });
        
        if (!response.ok) {
            throw new Error('Profile update failed');
        }
        
        currentUser = await response.json();
        currentLang = profileData.language;
        
        // Сохраняем локально
        saveUser(currentUser);
        
        document.getElementById('headerNickname').textContent = currentUser.nickname;
        updateLanguage(currentLang);
        
        tg.showAlert('Профиль сохранён!');
        tg.sendData(JSON.stringify({ action: 'update_profile', ...profileData }));
        
    } catch (error) {
        console.error('Profile update error:', error);
        tg.showAlert('Ошибка сохранения');
    }
});

document.getElementById('lion-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const datetime = document.getElementById('lion-datetime').value;
    const repeat = document.getElementById('lion-repeat').value;
    
    if (!datetime) {
        tg.showAlert('Выберите дату и время');
        return;
    }
    
    try {
        // В реальном проекте: fetch(`${API_URL}/reminders`, { method: 'POST', body: JSON.stringify({ datetime, repeat }) })
        
        tg.showAlert('Напоминание установлено!');
        tg.sendData(JSON.stringify({ action: 'set_reminder', datetime, repeat }));
        
        e.target.reset();
        loadReminders();
        
    } catch (error) {
        console.error('Reminder error:', error);
        tg.showAlert('Ошибка установки напоминания');
    }
});

// Utility functions
function formatDateTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString(currentLang === 'ru' ? 'ru-RU' : 'en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function updateLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
}

function deleteReminder(id) {
    tg.showConfirm('Удалить напоминание?', (confirmed) => {
        if (confirmed) {
            // В реальном проекте: fetch(`${API_URL}/reminders/${id}`, { method: 'DELETE' })
            loadReminders();
        }
    });
}

// Menu button handlers
document.querySelectorAll('.menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const screen = btn.getAttribute('data-screen');
        showScreen(screen);
    });
});

// Set minimum datetime for lion reminder
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
document.getElementById('lion-datetime').min = now.toISOString().slice(0, 16);

// Initialize
initApp();
