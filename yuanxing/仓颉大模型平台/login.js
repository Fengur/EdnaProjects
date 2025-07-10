// 登录页面交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const loginForms = document.querySelectorAll('.login-form');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            loginForms.forEach(form => form.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            document.getElementById(targetTab + '-login').classList.add('active');
        });
    });

    // 验证码发送功能
    const sendCodeBtn = document.getElementById('send-code-btn');
    const phoneInput = document.getElementById('phone');
    let countdown = 0;
    let countdownTimer = null;

    sendCodeBtn.addEventListener('click', function() {
        const phone = phoneInput.value.trim();
        
        if (!validatePhone(phone)) {
            showMessage('请输入正确的手机号码', 'error');
            return;
        }

        // 发送验证码
        sendVerificationCode(phone);
    });

    function sendVerificationCode(phone) {
        // 模拟发送验证码
        showMessage('验证码已发送到您的手机', 'success');
        
        // 开始倒计时
        countdown = 60;
        sendCodeBtn.disabled = true;
        sendCodeBtn.textContent = `${countdown}s后重试`;
        
        countdownTimer = setInterval(() => {
            countdown--;
            sendCodeBtn.textContent = `${countdown}s后重试`;
            
            if (countdown <= 0) {
                clearInterval(countdownTimer);
                sendCodeBtn.disabled = false;
                sendCodeBtn.textContent = '获取验证码';
            }
        }, 1000);
    }

    // 手机号验证
    function validatePhone(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    }

    // 外部用户登录
    const externalLoginBtn = document.getElementById('external-login-btn');
    const verificationCodeInput = document.getElementById('verification-code');

    externalLoginBtn.addEventListener('click', function() {
        const phone = phoneInput.value.trim();
        const code = verificationCodeInput.value.trim();
        
        if (!validatePhone(phone)) {
            showMessage('请输入正确的手机号码', 'error');
            return;
        }
        
        if (!code) {
            showMessage('请输入验证码', 'error');
            return;
        }
        
        if (code.length !== 6) {
            showMessage('验证码格式不正确', 'error');
            return;
        }

        // 模拟登录
        loginWithPhone(phone, code);
    });

    function loginWithPhone(phone, code) {
        // 显示加载状态
        externalLoginBtn.textContent = '登录中...';
        externalLoginBtn.disabled = true;
        
        // 模拟API调用
        setTimeout(() => {
            // 模拟登录成功
            showMessage('登录成功！正在跳转...', 'success');
            
            // 跳转到首页
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }, 2000);
    }

    // 内部用户二维码登录模拟
    const qrStatus = document.querySelector('.qr-status .status-indicator');
    const statusDot = document.querySelector('.status-dot');
    
    // 模拟二维码扫描状态变化
    let qrStatusInterval = setInterval(() => {
        const statuses = [
            { text: '等待扫码...', color: '#10B981' },
            { text: '检测到扫码...', color: '#F59E0B' },
            { text: '验证中...', color: '#3B82F6' },
            { text: '登录成功！', color: '#10B981' }
        ];
        
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        qrStatus.querySelector('span').textContent = randomStatus.text;
        statusDot.style.background = randomStatus.color;
        
        if (randomStatus.text === '登录成功！') {
            clearInterval(qrStatusInterval);
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }
    }, 3000);

    // 消息提示功能
    function showMessage(message, type = 'info') {
        // 创建消息元素
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        
        // 添加样式
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        // 根据类型设置背景色
        const colors = {
            success: '#10B981',
            error: '#EF4444',
            warning: '#F59E0B',
            info: '#3B82F6'
        };
        
        messageEl.style.background = colors[type] || colors.info;
        
        // 添加到页面
        document.body.appendChild(messageEl);
        
        // 显示动画
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageEl);
            }, 300);
        }, 3000);
    }

    // 输入框焦点效果
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // 回车键提交
    phoneInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendCodeBtn.click();
        }
    });
    
    verificationCodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            externalLoginBtn.click();
        }
    });

    // 页面加载动画
    const loginContent = document.querySelector('.login-content');
    loginContent.style.opacity = '0';
    loginContent.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        loginContent.style.transition = 'all 0.6s ease';
        loginContent.style.opacity = '1';
        loginContent.style.transform = 'translateY(0)';
    }, 100);
}); 