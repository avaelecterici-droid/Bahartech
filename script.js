// ==========================================
// جاوااسکریپت وب‌سایت آوا - نسخه نهایی
// ==========================================

// ===== پریلودر =====
window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    if (!preloader) return;
    
    setTimeout(function() {
        preloader.style.transition = "opacity 0.8s ease, visibility 0.8s ease";
        preloader.style.opacity = "0";
        preloader.style.visibility = "hidden";
        
        setTimeout(function() {
            preloader.style.display = "none";
            preloader.remove();
        }, 800);
    }, 1500);
});

// ===== AOS Animation =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

// ===== منو موبایل =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
}

// ===== اسکرول نرم =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            if (navLinks) {
                navLinks.classList.remove('active');
                const icon = menuToggle?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
});

// ===== هدر در اسکرول =====
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== FAQ =====
function toggleFaq(element) {
    const item = element.parentElement;
    const isActive = item.classList.contains('active');
    
    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
    });
    
    if (!isActive) {
        item.classList.add('active');
    }
}

// ===== فرم تماس - ارسال به واتساپ =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[name="name"]').value.trim();
        const phone = this.querySelector('input[name="phone"]').value.trim();
        const subject = this.querySelector('select[name="subject"]').value;
        const message = this.querySelector('textarea[name="message"]').value.trim();
        
        if (!name || !phone || !subject || !message) {
            alert('⚠️ لطفاً تمام فیلدها را پر کنید.');
            return;
        }
        
        const whatsappText = `📩 پیام جدید از سایت آوا

👤 نام: ${name}
📞 تلفن: ${phone}
📋 موضوع: ${subject}
💬 پیام:
${message}`;
        
        const whatsappNumber = '989112003136';
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;
        
        const btn = this.querySelector('.btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال انتقال به واتساپ...';
        btn.disabled = true;
        
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            btn.innerHTML = '<i class="fas fa-check"></i> منتقل شد!';
            btn.style.background = '#2e7d32';
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1000);
    });
}

// ===== فرم دانلود نسخه آزمایشی =====
function handleDownloadRequest(event) {
    event.preventDefault();
    
    const name = document.getElementById('downloadName').value.trim();
    const phone = document.getElementById('downloadPhone').value.trim();
    const store = document.getElementById('downloadStore').value.trim();
    const city = document.getElementById('downloadCity').value.trim();
    const note = document.getElementById('downloadNote').value.trim();
    
    if (!name || !phone) {
        alert('⚠️ لطفاً نام و شماره تماس خود را وارد کنید.');
        return;
    }
    
    const downloadRequests = JSON.parse(localStorage.getItem('downloadRequests') || '[]');
    downloadRequests.push({
        name: name,
        phone: phone,
        store: store || '-',
        city: city || '-',
        note: note || '-',
        date: new Date().toISOString()
    });
    localStorage.setItem('downloadRequests', JSON.stringify(downloadRequests));
    
    const form = document.getElementById('downloadForm');
    form.innerHTML = `
        <div class="download-success show">
            <i class="fas fa-check-circle"></i>
            <h3>✅ اطلاعات شما با موفقیت ثبت شد!</h3>
            <p>
                کد لایسنس نسخه آزمایشی ۳ روزه برای شما ارسال خواهد شد.<br/>
                <strong>شماره تماس شما:</strong> ${phone}
            </p>
            <p style="margin-top:12px;font-size:14px;color:var(--secondary);">
                📞 به زودی با شما تماس می‌گیریم
            </p>
            <p style="margin-top:12px;font-size:12px;color:rgba(255,255,255,0.4);">
                🔒 اطلاعات شما محفوظ است
            </p>
        </div>
    `;
    
    console.log('📝 درخواست دانلود جدید:', { name, phone, store, city, note });
}