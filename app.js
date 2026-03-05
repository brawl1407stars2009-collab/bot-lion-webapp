// Telegram WebApp initialization
const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// API Base URL (замените на ваш бэкенд)
const API_URL = 'https://your-backend-api.com/api';

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
        // Try to load user from backend
        try {
            currentUser = await loadUser(user.id);
            
            if (currentUser) {
                currentLang = currentUser.language || 'ru';
                document.getElementById('headerNickname').textContent = currentUser.nickname;
                updateLanguage(currentLang);
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
    // В реальном проекте здесь будет запрос к бэкенду
    // const response = await fetch(`${API_URL}/user/${telegramId}`);
    // return response.json();
    
    // Mock data для демонстрации
    return null;
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
        // В реальном проекте: fetch(`${API_URL}/events?level=${currentUser.level}`)
        
        // Mock data
        const events = [
            {
                id: 1,
                title_ru: 'Событие: Золотой Лев',
                title_en: 'Event: Golden Lion',
                description_ru: 'Участвуйте в битве за золотого льва!',
                description_en: 'Join the battle for the golden lion!',
                event_time: '2026-03-06 18:00:00',
                min_level: 'beginner'
            },
            {
                id: 2,
                title_ru: 'Турнир Чемпионов',
                title_en: 'Champions Tournament',
                description_ru: 'Еженедельный турнир для опытных игроков',
                description_en: 'Weekly tournament for experienced players',
                event_time: '2026-03-07 20:00:00',
                min_level: 'intermediate'
            }
        ];
        
        if (events.length === 0) {
            container.innerHTML = '<p class="loading">Событий пока нет</p>';
            return;
        }
        
        const lang = currentLang;
        container.innerHTML = events.map(event => `
            <div class="event-card">
                <h3>${lang === 'ru' ? event.title_ru : event.title_en}</h3>
                <p>${lang === 'ru' ? (event.description_ru || '') : (event.description_en || '')}</p>
                <div class="event-time">⏰ ${formatDateTime(event.event_time)}</div>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading schedule:', error);
        container.innerHTML = '<p class="loading">Ошибка загрузки</p>';
    }
}

async function loadNews() {
    const container = document.getElementById('news-list');
    container.innerHTML = '<div class="loading">Загрузка...</div>';
    
    try {
        // В реальном проекте: fetch(`${API_URL}/news`)
        
        // Mock data
        const news = [
            {
                id: 1,
                title_ru: 'Обновление игры v2.0',
                title_en: 'Game Update v2.0',
                content_ru: 'Добавлены новые функции и улучшен интерфейс...',
                content_en: 'Added new features and improved interface...',
                created_at: '2026-03-05'
            }
        ];
        
        if (news.length === 0) {
            container.innerHTML = '<p class="loading">Новостей пока нет</p>';
            return;
        }
        
        const lang = currentLang;
        container.innerHTML = news.map(item => `
            <div class="news-card">
                <h3>${lang === 'ru' ? item.title_ru : item.title_en}</h3>
                <p>${lang === 'ru' ? item.content_ru : item.content_en}</p>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading news:', error);
        container.innerHTML = '<p class="loading">Ошибка загрузки</p>';
    }
}

async function loadReminders() {
    const container = document.getElementById('reminders-container');
    
    try {
        // В реальном проекте: fetch(`${API_URL}/reminders/${currentUser.telegram_id}`)
        
        // Mock data
        const reminders = [];
        
        if (reminders.length === 0) {
            container.innerHTML = '<p class="loading">Нет активных напоминаний</p>';
            return;
        }
        
        container.innerHTML = reminders.map(r => `
            <div class="reminder-item">
                <span>${r.title} - ${formatDateTime(r.remind_time)}</span>
                <button class="delete-btn" onclick="deleteReminder(${r.id})">✕</button>
            </div>
        `).join('');
        
    } catch (error) {
        console.error('Error loading reminders:', error);
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
    
    try {
        // В реальном проекте: fetch(`${API_URL}/register`, { method: 'POST', body: JSON.stringify({ nickname, server }) })
        
        currentUser = {
            telegram_id: tg.initDataUnsafe?.user?.id,
            nickname,
            server,
            language: 'ru',
            timezone: 'UTC',
            level: 'beginner',
            notifications_enabled: false
        };
        
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
        // В реальном проекте: fetch(`${API_URL}/profile`, { method: 'PUT', body: JSON.stringify(profileData) })
        
        currentUser = { ...currentUser, ...profileData };
        currentLang = profileData.language;
        document.getElementById('headerNickname').textContent = profileData.nickname;
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
