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
            name: 'Pickleball Arena Q7',
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
            // Default central district hardcode fallback
            selectedCourtId = 'central';
            selectedCourtRate = 200000;
            selectedCourtName = 'Pickleball Central District';
            selectedCourtIconClass = 'bg-pickleball';
            selectedCourtIcon = 'fa-table-tennis-paddle-ball';
            selectedCourtAddress = '123 Lê Lợi, Phường Bến Thành, Quận 1, TP. HCM';

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
                if (e.target.tagName !== 'BUTTON' && !card.classList.contains('disabled')) {
                    const id = card.getAttribute('data-court-id');
                    if (id) {
                        loadCourtDetails(id);
                        switchScreen('screen-details');
                    }
                }
            });

            // Clicking book button specifically
            const bookBtn = card.querySelector('.btn-book-now');
            if (bookBtn && !card.classList.contains('disabled')) {
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
        document.getElementById('summary-hours-label').textContent = formattedHoursLbl;
        document.getElementById('summary-price-value').textContent = formattedCost;
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
            document.querySelector('#screen-bookings .screen-scrollable').scrollTop = 0;
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

    // Default calculations load
    updateCalculatedPrice();
});
