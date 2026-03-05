* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
}

:root {
    /* Telegram theme colors */
    --tg-theme-bg-color: #ffffff;
    --tg-theme-text-color: #000000;
    --tg-theme-hint-color: #999999;
    --tg-theme-link-color: #2481cc;
    --tg-theme-button-color: #2481cc;
    --tg-theme-button-text-color: #ffffff;
    --tg-theme-secondary-bg-color: #f4f4f5;
    
    /* App specific */
    --bg-primary: var(--tg-theme-bg-color, #ffffff);
    --bg-secondary: var(--tg-theme-secondary-bg-color, #f4f4f5);
    --bg-card: #ffffff;
    --text-primary: var(--tg-theme-text-color, #000000);
    --text-secondary: var(--tg-theme-hint-color, #999999);
    --accent: var(--tg-theme-button-color, #2481cc);
    --accent-hover: #1a6cb3;
    --success: #34c759;
    --warning: #ff9500;
    --danger: #ff3b30;
    --border: rgba(0, 0, 0, 0.08);
    --shadow: rgba(0, 0, 0, 0.06);
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    background: var(--bg-secondary);
    color: var(--text-primary);
    min-height: 100vh;
    overflow-x: hidden;
    font-size: 16px;
    line-height: 1.5;
}

.app-container {
    max-width: 500px;
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.header {
    background: var(--bg-primary);
    padding: 16px 20px;
    position: sticky;
    top: 0;
    z-index: 100;
    border-bottom: 0.5px solid var(--border);
}

.header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.25rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--accent), #5ac8fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 8px;
}

.nickname {
    font-size: 0.85rem;
    color: var(--text-secondary);
    background: var(--bg-secondary);
    padding: 6px 12px;
    border-radius: 20px;
    font-weight: 500;
}

/* Main Content */
.main-content {
    flex: 1;
    padding: 16px;
}

.screen {
    display: none;
}

.screen.active {
    display: block;
}

.screen-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 8px;
}

.back-btn {
    background: transparent;
    border: none;
    color: var(--accent);
    font-size: 1rem;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 4px;
    font-weight: 500;
}

.back-btn:active {
    opacity: 0.7;
}

.screen-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
}

/* Menu Grid */
.menu-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.menu-btn {
    background: var(--bg-card);
    border: none;
    border-radius: 16px;
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 1px 3px var(--shadow);
}

.menu-btn:active {
    transform: scale(0.96);
    background: var(--bg-secondary);
}

.menu-icon {
    font-size: 2.5rem;
    line-height: 1;
}

.menu-text {
    font-size: 0.9rem;
    color: var(--text-primary);
    text-align: center;
    font-weight: 500;
}

/* Forms */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-secondary);
    font-size: 0.85rem;
    font-weight: 500;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 14px 16px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: 14px;
    color: var(--text-primary);
    font-size: 1rem;
    transition: all 0.2s;
    -webkit-appearance: none;
    appearance: none;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: var(--accent);
    box-shadow: 0 0 0 4px rgba(36, 129, 204, 0.1);
}

.form-group select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23999' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-size: 16px;
    padding-right: 44px;
}

.btn-primary {
    width: 100%;
    padding: 16px;
    background: var(--accent);
    border: none;
    border-radius: 14px;
    color: var(--tg-theme-button-text-color, #ffffff);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-primary:active {
    opacity: 0.8;
    transform: scale(0.98);
}

/* Toggle Switch */
.toggle {
    position: relative;
    display: inline-block;
    width: 51px;
    height: 31px;
}

.toggle input {
    opacity: 0;
    width: 0;
    height: 0;
}

.toggle-slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: #e9e9ea;
    transition: 0.3s;
    border-radius: 31px;
}

.toggle-slider:before {
    position: absolute;
    content: "";
    height: 27px;
    width: 27px;
    left: 2px;
    top: 2px;
    background-color: white;
    transition: 0.3s;
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.toggle input:checked + .toggle-slider {
    background-color: var(--success);
}

.toggle input:checked + .toggle-slider:before {
    transform: translateX(20px);
}

/* Cards */
.event-card,
.news-card {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 16px;
    margin-bottom: 12px;
    box-shadow: 0 1px 3px var(--shadow);
}

.event-card h3,
.news-card h3 {
    color: var(--text-primary);
    margin-bottom: 8px;
    font-size: 1rem;
    font-weight: 600;
}

.event-card p,
.news-card p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.5;
}

.event-time {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--warning);
    font-size: 0.85rem;
    margin-top: 12px;
    font-weight: 500;
}

/* Reminders */
.reminders-list {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 0.5px solid var(--border);
}

.reminders-list h3 {
    color: var(--text-secondary);
    margin-bottom: 16px;
    font-size: 0.9rem;
    font-weight: 600;
}

.reminder-item {
    background: var(--bg-card);
    border-radius: 12px;
    padding: 14px 16px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 1px 2px var(--shadow);
}

.reminder-item .time {
    color: var(--warning);
    font-size: 0.85rem;
    font-weight: 500;
}

.reminder-item .delete-btn {
    background: var(--danger);
    border: none;
    color: white;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Channels */
.channels-info {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px var(--shadow);
}

.channels-info p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    line-height: 1.6;
}

.channels-info ol {
    margin-top: 16px;
    padding-left: 20px;
    color: var(--text-secondary);
}

.channels-info li {
    margin-bottom: 10px;
    line-height: 1.5;
    font-size: 0.9rem;
}

/* Donate */
.donate-content {
    text-align: center;
}

.donate-text {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 24px;
    font-size: 0.95rem;
}

.requisites {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 1px 3px var(--shadow);
}

.requisites h3 {
    color: var(--text-primary);
    margin-bottom: 16px;
    font-size: 1rem;
    font-weight: 600;
}

.requisite-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 0.5px solid var(--border);
}

.requisite-item:last-child {
    border-bottom: none;
}

.requisite-label {
    color: var(--text-secondary);
    font-size: 0.9rem;
    font-weight: 500;
}

.requisite-item code {
    background: var(--bg-secondary);
    padding: 8px 12px;
    border-radius: 10px;
    color: var(--text-primary);
    font-size: 0.85rem;
    font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
}

.thank-you {
    color: var(--accent);
    font-size: 1rem;
    font-weight: 500;
}

/* Loading */
.loading {
    text-align: center;
    color: var(--text-secondary);
    padding: 40px 20px;
    font-size: 0.95rem;
}

/* Registration */
.registration-form {
    background: var(--bg-card);
    border-radius: 16px;
    padding: 24px;
    box-shadow: 0 1px 3px var(--shadow);
}

/* Content Area */
.content-area {
    animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Section titles */
.content-area h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 16px;
}

/* Empty state */
.empty-state {
    text-align: center;
    padding: 40px 20px;
    color: var(--text-secondary);
}

.empty-state-icon {
    font-size: 3rem;
    margin-bottom: 16px;
    opacity: 0.5;
}

/* Responsive */
@media (max-width: 400px) {
    .menu-grid {
        grid-template-columns: 1fr;
    }
    
    .menu-btn {
        flex-direction: row;
        justify-content: flex-start;
        padding: 16px 20px;
    }
    
    .menu-icon {
        font-size: 1.8rem;
    }
    
    .menu-text {
        text-align: left;
    }
}

/* Safe area for iOS */
@supports (padding-bottom: env(safe-area-inset-bottom)) {
    .main-content {
        padding-bottom: max(16px, env(safe-area-inset-bottom));
    }
}

/* Scrollbar */
::-webkit-scrollbar {
    width: 4px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: var(--border);
    border-radius: 2px;
}

/* Active states */
.menu-btn,
.btn-primary,
.back-btn,
.delete-btn {
    -webkit-touch-callout: none;
    user-select: none;
}
