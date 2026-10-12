/**
 * ============================================
 *  人生时光 · 主逻辑
 *  Life Timer · Main
 * ============================================
 */

(function () {
    'use strict';

    // ============ 从 config.js 读取配置 ============
    const BIRTHDAY = new Date(CONFIG.birthday + 'T00:00:00');
    const LIFE_EXPECTANCY = CONFIG.lifeExpectancy;
    const TOTAL_WEEKS = LIFE_EXPECTANCY * 52;
    const TIMEZONE_OFFSET_MS = CONFIG.timezoneOffset * 60 * 1000;

    // ============ 初始化界面静态文字 ============
    document.getElementById('avatarText').textContent = CONFIG.avatarText;
    document.getElementById('easterEggMsg').textContent = CONFIG.easterEggText;
    document.getElementById('footerText').textContent = CONFIG.footerText;
    document.getElementById('expectancyLabel').textContent = LIFE_EXPECTANCY;
    document.getElementById('expectancyWeeksLabel').textContent = LIFE_EXPECTANCY;
    document.getElementById('totalWeeksLabel').textContent = TOTAL_WEEKS;

    // ============ DOM 引用 ============
    const el = {
        currentTime: document.getElementById('currentTime'),
        exactAge: document.getElementById('exactAge'),
        dayOfYear: document.getElementById('dayOfYear'),
        dayOfMonth: document.getElementById('dayOfMonth'),
        totalMonths: document.getElementById('totalMonths'),
        totalDays: document.getElementById('totalDays'),
        totalHours: document.getElementById('totalHours'),
        totalMinutes: document.getElementById('totalMinutes'),
        totalSeconds: document.getElementById('totalSeconds'),
        lifePercentage: document.getElementById('lifePercentage'),
        lifeProgressFill: document.getElementById('lifeProgressFill'),
        remainingYears: document.getElementById('remainingYears'),
        remainingDays: document.getElementById('remainingDays'),
        birthdayDays: document.getElementById('birthdayDays'),
        birthdayText: document.getElementById('birthdayText'),
        cake: document.getElementById('cake'),
        bdDays: document.getElementById('bdDays'),
        bdHours: document.getElementById('bdHours'),
        bdMinutes: document.getElementById('bdMinutes'),
        bdSeconds: document.getElementById('bdSeconds'),
        weekNumber: document.getElementById('weekNumber'),
        weekPercentage: document.getElementById('weekPercentage'),
        weekProgressFill: document.getElementById('weekProgressFill'),
        currentWeek: document.getElementById('currentWeek'),
        progressBar: document.getElementById('progressBar')
    };

    // ============ 时间工具 ============
    const DAY_MS = 1000 * 60 * 60 * 24;
    const HOUR_MS = 1000 * 60 * 60;
    const MINUTE_MS = 1000 * 60;

    /**
     * 获取当前时间（按配置的时区偏移校正）
     */
    function getNow() {
        return new Date(Date.now() + (new Date().getTimezoneOffset() * 60 * 1000) + TIMEZONE_OFFSET_MS);
    }

    // ============ 一言 API ============
    let lastMoodSlot = -1;

    function fetchMood() {
        if (!CONFIG.enableHitokoto) return;
        fetch('https://v1.hitokoto.cn/')
            .then(res => res.json())
            .then(data => {
                if (data.hitokoto) {
                    document.getElementById('todayMood').textContent = '今日状态：' + data.hitokoto;
                }
            })
            .catch(() => { /* 静默失败 */ });
    }

    function tryUpdateMood(minute) {
        const slot = Math.floor(minute / 10);
        if (slot !== lastMoodSlot) {
            lastMoodSlot = slot;
            fetchMood();
        }
    }

    if (CONFIG.enableHitokoto) {
        fetchMood();
    }

    // ============ 进度条 50% 刻度 ============
    function updateHalfMarker(ageInYears) {
        if (ageInYears >= LIFE_EXPECTANCY / 2) {
            el.progressBar.classList.add('passed-half');
        } else {
            el.progressBar.classList.remove('passed-half');
        }
    }

    // ============ 生命周数 ============
    function updateWeekDisplay(now) {
        const livedWeeks = Math.floor((now - BIRTHDAY) / (DAY_MS * 7));
        const weekProgress = Math.min((livedWeeks / TOTAL_WEEKS) * 100, 100);

        el.currentWeek.textContent = '第 ' + livedWeeks.toLocaleString() + ' 周';
        el.weekNumber.textContent = livedWeeks.toLocaleString();
        el.weekPercentage.textContent = weekProgress.toFixed(1) + '%';
        el.weekProgressFill.style.width = weekProgress + '%';
    }

    // ============ 主更新循环 ============
    function updateTime() {
        const now = getNow();

        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const weekday = ['日', '一', '二', '三', '四', '五', '六'][now.getDay()];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        el.currentTime.textContent =
            `${year}年${month}月${day}日 星期${weekday} ${hours}:${minutes}:${seconds}`;

        // 每10分钟更新一言
        if (CONFIG.enableHitokoto) {
            tryUpdateMood(now.getMinutes());
        }

        // ---------- 下次生日 ----------
        let nextBirthday = new Date(year, BIRTHDAY.getMonth(), BIRTHDAY.getDate());
        if (nextBirthday.getTime() <= now.getTime()) {
            nextBirthday = new Date(year + 1, BIRTHDAY.getMonth(), BIRTHDAY.getDate());
        }

        const timeToBirthday = nextBirthday.getTime() - now.getTime();
        const bdDays = Math.floor(timeToBirthday / DAY_MS);
        const bdHours = Math.floor((timeToBirthday % DAY_MS) / HOUR_MS);
        const bdMinutes = Math.floor((timeToBirthday % HOUR_MS) / MINUTE_MS);
        const bdSeconds = Math.floor((timeToBirthday % MINUTE_MS) / 1000);

        el.birthdayDays.textContent = bdDays;
        el.bdDays.textContent = bdDays;
        el.bdHours.textContent = bdHours;
        el.bdMinutes.textContent = bdMinutes;
        el.bdSeconds.textContent = bdSeconds;

        if (bdDays === 0) {
            el.birthdayText.textContent = '今天就是生日！';
            el.cake.textContent = ' 🎉🎂';
        } else {
            el.birthdayText.textContent = bdDays + ' 天后';
            el.cake.textContent = ' 🎂';
        }

        // ---------- 已活时间 ----------
        const lifeTime = now.getTime() - BIRTHDAY.getTime();
        const totalMonths = Math.floor(lifeTime / (DAY_MS * 30.44));
        const totalDays = Math.floor(lifeTime / DAY_MS);
        const totalHours = Math.floor(lifeTime / HOUR_MS);
        const totalMinutes = Math.floor(lifeTime / MINUTE_MS);
        const totalSeconds = Math.floor(lifeTime / 1000);

        el.totalMonths.textContent = totalMonths.toLocaleString();
        el.totalDays.textContent = totalDays.toLocaleString();
        el.totalHours.textContent = totalHours.toLocaleString();
        el.totalMinutes.textContent = totalMinutes.toLocaleString();
        el.totalSeconds.textContent = totalSeconds.toLocaleString();

        // ---------- 精确年龄 ----------
        const ageInYears = lifeTime / (DAY_MS * 365.25);
        const years = Math.floor(ageInYears);
        const monthsFloat = (ageInYears % 1) * 12;
        const months = Math.floor(monthsFloat);
        const daysFloat = (monthsFloat % 1) * 30.44;
        const remainingDays = Math.floor(daysFloat);
        el.exactAge.textContent = `${years}岁 ${months}个月 ${remainingDays}天`;

        // ---------- 人生进度条 ----------
        const lifeProgress = Math.min((ageInYears / LIFE_EXPECTANCY) * 100, 100);
        el.lifePercentage.textContent = lifeProgress.toFixed(1) + '%';
        el.lifeProgressFill.style.width = lifeProgress + '%';
        updateHalfMarker(ageInYears);

        const remainingYears = Math.max(0, LIFE_EXPECTANCY - ageInYears);
        const remainingDaysLife = Math.floor(remainingYears * 365.25);
        el.remainingYears.textContent = remainingYears.toFixed(1);
        el.remainingDays.textContent = remainingDaysLife.toLocaleString();

        // ---------- 今年第几天 / 本月第几天 ----------
        const startOfYear = new Date(year, 0, 1);
        const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / DAY_MS) + 1;
        el.dayOfYear.textContent = dayOfYear;
        el.dayOfMonth.textContent = day;

        // ---------- 生命周数 ----------
        updateWeekDisplay(now);
    }

    updateTime();
    setInterval(updateTime, 1000);

    // ============ 彩蛋：双击头像 ============
    let easterEggTimer = null;
    document.getElementById('profilePic').addEventListener('dblclick', function () {
        if (document.body.classList.contains('easter-egg')) return;
        document.body.classList.add('easter-egg');
        if (easterEggTimer) clearTimeout(easterEggTimer);
        easterEggTimer = setTimeout(function () {
            document.body.classList.remove('easter-egg');
            easterEggTimer = null;
        }, 5000);
    });

})();
