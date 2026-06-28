/* ==========================================================================
   Kinetic Court Interactive Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // Mock Database for Courts
    // ==========================================
    const courtsDatabase = {
        '1': {
            name: 'Kinetic Arena Q.1',
            sport: 'pickleball',
            rating: '4.9',
            price: 150000,
            address: '45 Nguyễn Huệ, Quận 1, TP. HCM',
            cover: 'assets/images/pickleball-1.png',
            iconClass: 'bg-pickleball',
            icon: 'fa-table-tennis-paddle-ball'
        },
        '2': {
            name: 'Sân Cầu Lông Đa Năng',
            sport: 'badminton',
            rating: '4.9',
            price: 180000,
            address: '78 Nam Kỳ Khởi Nghĩa, Quận 1, TP. HCM',
            cover: 'assets/images/badminton-1.png',
            iconClass: 'bg-badminton',
            icon: 'fa-shuttlecock'
        },
        '3': {
            name: 'Pro Court Tennis Hub',
            sport: 'tennis',
            rating: '4.8',
            price: 220000,
            address: '235 Nguyễn Văn Cừ, Quận 5, TP. HCM',
            cover: 'assets/images/tennis-1.png',
            iconClass: 'bg-tennis',
            icon: 'fa-baseball-bat-ball'
        },
        '4': {
            name: 'Pickleball Central District',
            sport: 'pickleball',
            rating: '4.9',
            price: 130000,
            address: '104 Nguyễn Hữu Thọ, Quận 7, TP. HCM',
            cover: 'assets/images/court-detail-main.png',
            iconClass: 'bg-pickleball',
            icon: 'fa-table-tennis-paddle-ball'
        },
        '5': {
            name: 'Elite Court Phú Mỹ Hưng',
            sport: 'pickleball',
            rating: '4.7',
            price: 150000,
            address: 'Block B, Phú Mỹ Hưng, Quận 7, TP. HCM',
            cover: 'assets/images/pickleball-1.png',
            iconClass: 'bg-pickleball',
            icon: 'fa-table-tennis-paddle-ball'
        }
    };

    // State parameters
    let selectedCourtId = '4'; // Default to Pickleball Central District
    let selectedCourtRate = 200000; // default rate (400k/2h = 200k/h)
    let selectedCourtName = 'Pickleball Central District';
    let selectedCourtIconClass = 'bg-pickleball';
    let selectedCourtIcon = 'fa-table-tennis-paddle-ball';
    let selectedCourtAddress = '123 Lê Lợi, Phường Bến Thành, Quận 1, TP. HCM';

    // ==========================================
    // 1. Live Clock inside Emulator Top Status Bar
    // ==========================================
    const statusTime = document.getElementById('status-time');
    const updateTime = () => {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        if (statusTime) {
            statusTime.textContent = `${hours}:${minutes}`;
        }
    };
    setInterval(updateTime, 1000);
    updateTime();


    // ==========================================
    // 2. Emulator Tab Navigation Router
    // ==========================================
    const navItems = document.querySelectorAll('.phone-app-nav .nav-item');
    const appScreens = document.querySelectorAll('.app-screen');

    const switchScreen = (screenId) => {
        // Hide all screens
        appScreens.forEach(screen => screen.classList.remove('active'));
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
        }

        // Handle navigation active dots highlight
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-target') === screenId) {
                item.classList.add('active');
            }
        });
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetScreen = item.getAttribute('data-target');
            switchScreen(targetScreen);
        });
    });


    // ==========================================
    // 3. Home Screen Category sport filtering
    // ==========================================
    const categoryChips = document.querySelectorAll('.category-chip');
    const courtCards = document.querySelectorAll('#featured-courts-container .court-card');

    categoryChips.forEach(chip => {
        chip.addEventListener('click', () => {
            categoryChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');

            const selectedSport = chip.getAttribute('data-sport');
            
            courtCards.forEach(card => {
                const courtId = card.getAttribute('data-court-id');
                const courtData = courtsDatabase[courtId];
                if (courtData) {
                    if (courtData.sport === selectedSport) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });


    // ==========================================
    // 4. Booking View Switch & Dynamic Data Loader
    // ==========================================
    const loadCourtDetails = (courtId) => {
        const data = courtsDatabase[courtId];
        if (data) {
            selectedCourtId = courtId;
            selectedCourtRate = data.price;
            selectedCourtName = data.name;
            selectedCourtIconClass = data.iconClass;
            selectedCourtIcon = data.icon;
            selectedCourtAddress = data.address;

            // Update UI elements in Screen 3 (Details)
            document.getElementById('detail-court-title').textContent = data.name;
            document.querySelector('.detail-court-address span').textContent = data.address;
            document.querySelector('.detail-court-rating').innerHTML = `<i class="fa-solid fa-star"></i> ${data.rating}`;
            
            const mainImg = document.getElementById('detail-main-img');
            mainImg.src = data.cover;
            
            const thumbs = document.querySelectorAll('.gallery-thumbs .thumb');
            if (thumbs.length >= 2) {
                thumbs[0].src = data.cover;
                thumbs[1].src = (courtId === '4' || courtId === '1') ? 'assets/images/pickleball-1.png' : 'assets/images/court-detail-main.png';
            }

            // Reset slots
            resetTimeSlots();
            updateCalculatedPrice();
        } else {
            // Default central district fallback
            selectedCourtId = '4';
            selectedCourtRate = 130000;
            selectedCourtName = 'Pickleball Central District';
            selectedCourtIconClass = 'bg-pickleball';
            selectedCourtIcon = 'fa-table-tennis-paddle-ball';
            selectedCourtAddress = '104 Nguyễn Hữu Thọ, Quận 7, TP. HCM';

            document.getElementById('detail-court-title').textContent = selectedCourtName;
            document.querySelector('.detail-court-address span').textContent = selectedCourtAddress;
            document.querySelector('.detail-court-rating').innerHTML = `<i class="fa-solid fa-star"></i> 4.9`;
            document.getElementById('detail-main-img').src = 'assets/images/court-detail-main.png';
            
            resetTimeSlots();
            updateCalculatedPrice();
        }
    };

    // Attach listeners on clicking "Đặt ngay" or court cards to load Screen 3
    const registerCourtClickListeners = () => {
        const cards = document.querySelectorAll('.court-card, .court-result-card');
        cards.forEach(card => {
            // Clicking card details (not book button directly)
            card.addEventListener('click', (e) => {
                if (e.target.tagName !== 'BUTTON' && !card.classList.contains('disabled') && card.style.opacity !== '0.6') {
                    const id = card.getAttribute('data-court-id');
                    if (id) {
                        loadCourtDetails(id);
                        switchScreen('screen-details');
                    }
                }
            });

            // Clicking book button specifically
            const bookBtn = card.querySelector('.btn-book-now');
            if (bookBtn && !card.classList.contains('disabled') && !bookBtn.hasAttribute('disabled')) {
                bookBtn.addEventListener('click', (e) => {
                    e.stopPropagation(); // Avoid double click trigger
                    const id = card.getAttribute('data-court-id');
                    if (id) {
                        loadCourtDetails(id);
                        switchScreen('screen-details');
                    }
                });
            }
        });
    };
    registerCourtClickListeners();

    // Back nav button in details
    const backBtn = document.getElementById('details-back-btn');
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            // Default goes back to Search screen
            switchScreen('screen-search');
        });
    }

    // Home view all redirect
    const viewAllLink = document.getElementById('home-view-all');
    if (viewAllLink) {
        viewAllLink.addEventListener('click', (e) => {
            e.preventDefault();
            switchScreen('screen-search');
        });
    }

    // Home search bar click redirect
    const searchTrigger = document.getElementById('home-search-trigger');
    if (searchTrigger) {
        searchTrigger.addEventListener('click', () => {
            switchScreen('screen-search');
        });
    }


    // ==========================================
    // 5. Details View Gallery, Dates, & Slots Interaction
    // ==========================================
    
    // Thumbnail toggle
    const thumbs = document.querySelectorAll('.gallery-thumbs .thumb');
    const mainImg = document.getElementById('detail-main-img');
    thumbs.forEach(thumb => {
        thumb.addEventListener('click', () => {
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            if (mainImg) {
                mainImg.src = thumb.src;
            }
        });
    });

    // Date Strip toggling
    const dateItems = document.querySelectorAll('.date-strip .date-item');
    dateItems.forEach(item => {
        item.addEventListener('click', () => {
            dateItems.forEach(d => d.classList.remove('active'));
            item.classList.add('active');
            // Re-shuffle time slots randomly for premium feel
            randomizeTimeSlots();
            updateCalculatedPrice();
        });
    });

    // Time Slot toggling
    const timeSlots = document.querySelectorAll('.time-slot');
    timeSlots.forEach(slot => {
        slot.addEventListener('click', () => {
            if (!slot.classList.contains('disabled')) {
                slot.classList.toggle('active');
                updateCalculatedPrice();
            }
        });
    });

    function resetTimeSlots() {
        timeSlots.forEach(slot => {
            slot.classList.remove('active');
        });
        // Default select 18:00 and 19:00 (matching figma initial slots)
        const defSlots = ['08:00', '18:00', '19:00'];
        timeSlots.forEach(slot => {
            const time = slot.getAttribute('data-time');
            if (defSlots.includes(time) && !slot.classList.contains('disabled')) {
                slot.classList.add('active');
            }
        });
    }

    function randomizeTimeSlots() {
        // Randomly disable/select slots when dates change for realistic dynamic layout
        timeSlots.forEach(slot => {
            slot.classList.remove('active');
            slot.classList.remove('disabled');
            slot.removeAttribute('disabled');
            
            const rand = Math.random();
            if (rand < 0.2) {
                slot.classList.add('disabled');
                slot.setAttribute('disabled', 'true');
            } else if (rand > 0.7) {
                slot.classList.add('active');
            }
        });
    }

    function updateCalculatedPrice() {
        const activeSlots = document.querySelectorAll('.time-slot.active');
        const selectedHours = activeSlots.length;
        const totalCost = selectedHours * selectedCourtRate;
        
        // Format Currency
        const formattedCost = totalCost.toLocaleString('vi-VN') + 'đ';
        const formattedHoursLbl = `1 SÂN X ${selectedHours} GIỜ`;
        
        // Update Drawer elements
        const summaryHours = document.getElementById('summary-hours-label');
        const summaryPrice = document.getElementById('summary-price-value');
        if (summaryHours && summaryPrice) {
            summaryHours.textContent = formattedHoursLbl;
            summaryPrice.textContent = formattedCost;
        }
    }


    // ==========================================
    // 6. Checkout Payment & Booking History Generation
    // ==========================================
    const checkoutBtn = document.getElementById('checkout-action-btn');
    const successDialog = document.getElementById('success-dialog');
    const successOkBtn = document.getElementById('btn-success-ok');
    const upcomingList = document.getElementById('upcoming-list-container');

    if (checkoutBtn && successDialog && successOkBtn) {
        
        checkoutBtn.addEventListener('click', () => {
            const activeSlots = document.querySelectorAll('.time-slot.active');
            if (activeSlots.length === 0) {
                alert("Vui lòng chọn ít nhất một khung giờ trống trước khi thanh toán!");
                return;
            }

            // Generate booking details
            const activeDateItem = document.querySelector('.date-strip .date-item.active');
            const dayNum = activeDateItem.querySelector('.day-num').textContent;
            const dayLbl = activeDateItem.querySelector('.day-lbl').textContent;
            const fullDateString = `${dayLbl}, ${dayNum}/06/2026`;
            
            // Collect hours range
            const slotHours = [];
            activeSlots.forEach(slot => {
                slotHours.push(parseInt(slot.getAttribute('data-time')));
            });
            slotHours.sort((a,b) => a-b);
            
            let timeSpanText = "";
            if (slotHours.length === 1) {
                timeSpanText = `${slotHours[0]}:00 - ${slotHours[0] + 1}:00 (1 giờ)`;
            } else {
                const minHour = slotHours[0];
                const maxHour = slotHours[slotHours.length - 1] + 1;
                timeSpanText = `${minHour}:00 - ${maxHour}:00 (${slotHours.length} giờ)`;
            }

            const totalCost = activeSlots.length * selectedCourtRate;
            const formattedCost = totalCost.toLocaleString('vi-VN') + 'đ';

            // Generate dynamic random booking code
            const randCode = 'KC-' + Math.floor(10000 + Math.random() * 90000);

            // Prepend new Booking Card to history
            const newCard = document.createElement('div');
            newCard.className = 'booking-history-card';
            newCard.innerHTML = `
                <div class="card-top">
                    <div class="icon-avatar ${selectedCourtIconClass}"><i class="fa-solid ${selectedCourtIcon}"></i></div>
                    <div class="card-title-block">
                        <h4>${selectedCourtName}</h4>
                        <p class="address-sub">${selectedCourtAddress}</p>
                    </div>
                    <span class="status-badge status-paid">Đã thanh toán</span>
                </div>
                <div class="card-middle">
                    <div class="time-info">
                        <i class="fa-regular fa-calendar"></i>
                        <span>${fullDateString}</span>
                    </div>
                    <div class="time-info">
                        <i class="fa-regular fa-clock"></i>
                        <span>${timeSpanText}</span>
                    </div>
                    <div class="price-info">
                        <span>Tổng tiền: </span>
                        <strong>${formattedCost}</strong>
                    </div>
                </div>
                <div class="card-bottom">
                    <span class="booking-code">Mã đặt sân: ${randCode}</span>
                    <button class="btn-action-history">Xem mã QR</button>
                </div>
            `;

            if (upcomingList) {
                upcomingList.insertBefore(newCard, upcomingList.firstChild);
            }

            // Sync checkout to Admin Panel Bảng Điều Khiển
            const adminRecentBookings = document.getElementById('admin-recent-bookings');
            if (adminRecentBookings) {
                const newRow = document.createElement('div');
                newRow.className = 'booking-item-row';
                newRow.innerHTML = `
                    <div class="booking-desc-col">
                        <h4>Nguyễn Văn Huy (Khách)</h4>
                        <span>Sân ${selectedCourtId} &bull; ${activeSlots.length} Giờ &bull; ${formattedCost}</span>
                    </div>
                    <div class="booking-time-col">
                        <span class="badge-paid">ĐÃ THANH TOÁN</span>
                        <span class="time-ago">Vừa xong</span>
                    </div>
                `;
                adminRecentBookings.insertBefore(newRow, adminRecentBookings.firstChild);
            }

            // Sync checkout to Admin Queue duyệt lịch
            const adminBookingsQueue = document.getElementById('admin-bookings-queue');
            if (adminBookingsQueue) {
                const randNum = Math.floor(1000 + Math.random() * 9000);
                const queueItem = document.createElement('div');
                queueItem.className = 'queue-card';
                queueItem.id = `qcard-${randNum}`;
                queueItem.innerHTML = `
                    <div class="queue-header">
                        <span class="queue-time-lbl">Khung giờ: ${timeSpanText}</span>
                        <span class="queue-date-lbl">${fullDateString}</span>
                    </div>
                    <div class="queue-body">
                        <h4>Sân ${selectedCourtId} &bull; ${selectedCourtName}</h4>
                        <p class="queue-client">Khách hàng: <strong>Nguyễn Văn Huy</strong></p>
                        <span class="queue-payment paid">Đã thanh toán Online</span>
                        <span class="queue-id">Mã đặt: #${randCode}</span>
                    </div>
                    <div class="queue-actions">
                        <button class="btn-q-detail">Chi tiết</button>
                        <button class="btn-q-checkin" data-id="qcard-${randNum}">Nhận sân</button>
                    </div>
                `;
                adminBookingsQueue.insertBefore(queueItem, adminBookingsQueue.firstChild);
            }

            // Display success modal
            document.getElementById('success-booking-code').textContent = randCode;
            successDialog.classList.add('open');
        });

        // Modal confirm action
        successOkBtn.addEventListener('click', () => {
            // Close dialog
            successDialog.classList.remove('open');
            // Navigate to Booking tab
            switchScreen('screen-bookings');
            // Scroll to top of listings
            const listScroller = document.querySelector('#screen-bookings .screen-scrollable');
            if (listScroller) listScroller.scrollTop = 0;
        });
    }


    // ==========================================
    // 7. Booking History Tab Subnavigation
    // ==========================================
    const historyTabs = document.querySelectorAll('.booking-tabs .booking-tab');
    const upcomingTabContent = document.getElementById('tab-upcoming');
    const pastTabContent = document.getElementById('tab-past');

    historyTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            historyTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const tabTarget = tab.getAttribute('data-tab');
            if (tabTarget === 'upcoming') {
                upcomingTabContent.classList.add('active');
                pastTabContent.classList.remove('active');
            } else {
                pastTabContent.classList.add('active');
                upcomingTabContent.classList.remove('active');
            }
        });
    });


    // ==========================================
    // 8. Admin Panel Switcher & Layout Controls
    // ==========================================
    
    // Platform mode switcher navigation
    const modeTabs = document.querySelectorAll('.platform-switcher .switch-tab');
    const clientWrapper = document.querySelector('.client-view-wrapper');
    const adminWrapper = document.querySelector('.admin-view-wrapper');

    const setAppMode = (mode) => {
        modeTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.getAttribute('data-mode') === mode) {
                tab.classList.add('active');
            }
        });

        if (mode === 'admin') {
            clientWrapper.classList.remove('active');
            adminWrapper.classList.add('active');
            updateActiveCourtsCount(); // Refresh stats
        } else {
            adminWrapper.classList.remove('active');
            clientWrapper.classList.add('active');
        }
    };

    modeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            setAppMode(tab.getAttribute('data-mode'));
        });
    });

    // Profile screen switcher trigger link
    const profileAdminTrigger = document.getElementById('profile-admin-trigger');
    if (profileAdminTrigger) {
        profileAdminTrigger.addEventListener('click', () => {
            setAppMode('admin');
        });
    }

    // Admin Sidebar & Mobile Panel Routing
    const adminNavItems = document.querySelectorAll('.admin-nav-item');
    const mobileNavBtns = document.querySelectorAll('.mobile-nav-btn');
    const adminSubPanels = document.querySelectorAll('.admin-sub-panel');
    const adminPanelTitle = document.getElementById('admin-panel-title');

    const switchAdminPanel = (targetPanel) => {
        // Sync Sidebar Items active class
        adminNavItems.forEach(nav => {
            nav.classList.remove('active');
            if (nav.getAttribute('data-panel') === targetPanel) {
                nav.classList.add('active');
            }
        });

        // Sync Mobile Nav buttons active class
        mobileNavBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-panel') === targetPanel) {
                btn.classList.add('active');
            }
        });

        // Switch panel visibility
        adminSubPanels.forEach(panel => panel.classList.remove('active'));
        const activePanel = document.getElementById(targetPanel);
        if (activePanel) activePanel.classList.add('active');

        // Set Title text
        if (targetPanel === 'panel-dashboard') {
            if (adminPanelTitle) adminPanelTitle.textContent = 'Bảng Điều Khiển';
        } else if (targetPanel === 'panel-courts') {
            if (adminPanelTitle) adminPanelTitle.textContent = 'Quản Lý Sân & Lịch';
        }
    };

    // Sidebar items click triggers
    adminNavItems.forEach(item => {
        item.addEventListener('click', () => {
            switchAdminPanel(item.getAttribute('data-panel'));
        });
    });

    // Mobile nav buttons click triggers
    mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            switchAdminPanel(btn.getAttribute('data-panel'));
        });
    });

    // Admin check-in approval logic via delegation
    const bookingsQueue = document.getElementById('admin-bookings-queue');
    if (bookingsQueue) {
        bookingsQueue.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-q-checkin')) {
                const targetId = e.target.getAttribute('data-id');
                const card = document.getElementById(targetId);
                if (card) {
                    // Slide out animate and remove
                    card.style.transition = 'all 0.4s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateX(50px)';
                    setTimeout(() => {
                        card.remove();
                        showNotification('Khách hàng đã nhận sân thành công!', 'success');
                    }, 400);
                }
            } else if (e.target.classList.contains('btn-q-detail')) {
                showNotification('Đang mở chi tiết lịch đặt sân này...', 'info');
            }
        });
    }

    // Admin Court Maintenance Status Control
    const maintenanceToggles = document.querySelectorAll('.m-toggle-chk');
    
    maintenanceToggles.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const courtId = toggle.getAttribute('data-court');
            const row = toggle.closest('.maintenance-item-row');
            const badge = row.querySelector('.m-status-badge');
            
            if (toggle.checked) {
                badge.textContent = 'Đang hoạt động';
                badge.className = 'm-status-badge status-active';
                setCourtDisabledState(courtId, false);
                showNotification(`Sân số ${courtId} đã hoạt động bình thường trở lại.`, 'success');
            } else {
                badge.textContent = 'Bảo trì';
                badge.className = 'm-status-badge status-maintenance';
                setCourtDisabledState(courtId, true);
                showNotification(`Sân số ${courtId} đã tạm dừng hoạt động để bảo trì.`, 'warning');
            }
            updateActiveCourtsCount();
        });
    });

    function setCourtDisabledState(courtId, isDisabled) {
        // Sync disabled state to Search result cards
        const resultCard = document.querySelector(`.court-result-card[data-court-id="${courtId}"]`);
        if (resultCard) {
            const bookBtn = resultCard.querySelector('.btn-book-now');
            if (isDisabled) {
                resultCard.classList.add('disabled');
                if (bookBtn) {
                    bookBtn.textContent = 'Bảo trì';
                    bookBtn.className = 'btn-book-now btn-disabled';
                    bookBtn.setAttribute('disabled', 'true');
                }
            } else {
                resultCard.classList.remove('disabled');
                if (bookBtn) {
                    bookBtn.textContent = 'Đặt ngay';
                    bookBtn.className = 'btn-book-now';
                    bookBtn.removeAttribute('disabled');
                }
            }
        }
        
        // Sync disabled state to Home cards
        const homeCard = document.querySelector(`.court-card[data-court-id="${courtId}"]`);
        if (homeCard) {
            const bookBtn = homeCard.querySelector('.btn-book-now');
            if (isDisabled) {
                homeCard.style.opacity = '0.6';
                if (bookBtn) {
                    bookBtn.textContent = 'Bảo trì';
                    bookBtn.style.backgroundColor = '#9CA3AF';
                    bookBtn.setAttribute('disabled', 'true');
                }
            } else {
                homeCard.style.opacity = '1';
                if (bookBtn) {
                    bookBtn.textContent = 'Đặt ngay';
                    bookBtn.style.backgroundColor = 'var(--primary-green)';
                    bookBtn.removeAttribute('disabled');
                }
            }
        }
    }

    function updateActiveCourtsCount() {
        const total = maintenanceToggles.length;
        let activeCount = 0;
        maintenanceToggles.forEach(toggle => {
            if (toggle.checked) activeCount++;
        });
        const countDisplay = document.getElementById('active-courts-count');
        if (countDisplay) {
            countDisplay.textContent = `${activeCount}/${total}`;
        }
    }

    // Export CSV data file
    const exportCsvBtn = document.getElementById('btn-export-csv');
    if (exportCsvBtn) {
        exportCsvBtn.addEventListener('click', () => {
            const csvContent = "data:text/csv;charset=utf-8,"
                + "Ngay,San,Khach Hang,Khung Gio,Doanh Thu\n"
                + "22/06/2026,Championship Court,Johnathan Doe,18:00 - 20:00,400000\n"
                + "23/06/2026,Sân Cầu Lông Đa Năng,Sophia Martinez,09:00 - 10:00,180000\n"
                + "25/06/2026,Pro Court Tennis Hub,Michael Zhao,07:00 - 09:00,440000\n"
                + "26/06/2026,Pickleball Central District,Sarah Jenkins,20:00 - 21:00,200000\n";
            
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "doanh_thu_kinetic_court.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
            showNotification('Đang xuất tệp báo cáo doanh thu CSV...', 'success');
        });
    }

    // Lock quick schedule trigger
    const quickLockBtn = document.getElementById('btn-quick-lock');
    if (quickLockBtn) {
        quickLockBtn.addEventListener('click', () => {
            showNotification('Đã khoá lịch hoạt động hôm nay để tiến hành bảo trì nhanh.', 'info');
        });
    }


    // ==========================================
    // 9. Premium Custom Notification Toast
    // ==========================================
    function showNotification(message, type = 'info') {
        const oldToast = document.querySelector('.toast-notification');
        if (oldToast) {
            oldToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast-notification toast-${type}`;
        
        let iconHtml = '<i class="fa-solid fa-circle-info"></i>';
        if (type === 'success') {
            iconHtml = '<i class="fa-solid fa-circle-check"></i>';
        } else if (type === 'warning') {
            iconHtml = '<i class="fa-solid fa-triangle-exclamation"></i>';
        }
        
        toast.innerHTML = `
            <div class="toast-content">
                <span class="toast-icon">${iconHtml}</span>
                <span class="toast-message">${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;

        document.body.appendChild(toast);

        Object.assign(toast.style, {
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            backgroundColor: '#1E293B',
            color: '#FFFFFF',
            borderLeft: '4px solid #C5A880',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
            padding: '16px 20px',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px',
            maxWidth: '380px',
            animation: 'slideIn 0.3s ease forwards',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.9rem',
            border: '1px solid #334155',
            borderLeftWidth: '4px'
        });

        if (type === 'success') {
            toast.style.borderLeftColor = '#22C55E';
        } else if (type === 'warning') {
            toast.style.borderLeftColor = '#EF4444';
        } else if (type === 'info') {
            toast.style.borderLeftColor = '#0284C7';
        }

        const closeBtn = toast.querySelector('.toast-close');
        Object.assign(closeBtn.style, {
            background: 'transparent',
            border: 'none',
            fontSize: '1.2rem',
            cursor: 'pointer',
            opacity: '0.5',
            transition: 'opacity 0.2s',
            color: '#FFFFFF'
        });
        
        closeBtn.addEventListener('click', () => {
            toast.remove();
        });

        setTimeout(() => {
            if (document.body.contains(toast)) {
                toast.style.animation = 'slideOut 0.3s ease forwards';
                setTimeout(() => {
                    if (document.body.contains(toast)) toast.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Inject animation keyframes for toast dynamically
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes slideIn {
            from { transform: translateX(120%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(120%); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);

    // Initial calculations load
    updateCalculatedPrice();
    registerCourtClickListeners();
});
