<template>
  <section class="app-screen active" id="screen-details">
    <!-- Header back and share -->
    <header class="app-header detail-header">
      <button class="back-btn" aria-label="Go Back" @click="clientScreen = 'screen-search'">
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <h2 class="app-title text-center">KINETIC COURT</h2>
      <button class="header-icon-btn" aria-label="Share">
        <i class="fa-solid fa-share-nodes"></i>
      </button>
    </header>

    <div class="screen-scrollable">
      <!-- Gallery Cover Slider -->
      <div class="detail-gallery">
        <img :src="currentImage" :alt="activeCourt.name" id="detail-main-img">
        <div class="gallery-thumbs">
          <img 
            :src="activeCourt.cover" 
            alt="Thumb 1" 
            class="thumb" 
            :class="{ active: currentImage === activeCourt.cover }"
            @click="currentImage = activeCourt.cover"
          >
          <img 
            src="/assets/images/pickleball-1.png" 
            alt="Thumb 2" 
            class="thumb" 
            :class="{ active: currentImage === '/assets/images/pickleball-1.png' }"
            @click="currentImage = '/assets/images/pickleball-1.png'"
          >
        </div>
      </div>

      <div class="detail-container">
        <!-- Title and Ratings -->
        <div class="detail-info-block">
          <div class="title-row">
            <h3 class="detail-court-name">{{ activeCourt.name }}</h3>
            <span class="detail-court-rating"><i class="fa-solid fa-star"></i> {{ activeCourt.rating }}</span>
          </div>
          <p class="detail-court-address">
            <i class="fa-solid fa-location-dot"></i>
            <span>{{ activeCourt.address }}</span>
          </p>
          <button class="btn-map" @click="showToast('Đang mở bản đồ dẫn đường...', 'info')">
            <i class="fa-solid fa-map-location-dot"></i> Xem bản đồ
          </button>
        </div>

        <!-- Date Strip Selector -->
        <div class="booking-section">
          <h4 class="booking-section-title">Chọn ngày chơi</h4>
          <div class="date-strip-wrapper">
            <div class="date-strip">
              <div 
                v-for="date in datesList" 
                :key="date.full"
                class="date-item"
                :class="{ active: selectedDate === date.full }"
                @click="changeDate(date.full)"
              >
                <span class="day-lbl">{{ date.lbl }}</span>
                <span class="day-num">{{ date.num }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Time Slot Selector Grids -->
        <div class="booking-section">
          <h4 class="booking-section-title">Giờ sáng (Sân mát)</h4>
          <div class="time-grid">
            <button 
              v-for="time in morningHours" 
              :key="time.val"
              class="time-slot"
              :class="{ 
                active: selectedTimeSlots.includes(time.val),
                disabled: time.disabled 
              }"
              :disabled="time.disabled"
              @click="toggleTimeSlot(time.val)"
            >
              <span class="slot-time">{{ time.val }}</span>
              <span class="slot-price">{{ formatVnd(time.price) }}</span>
            </button>
          </div>

          <h4 class="booking-section-title mt-15">Giờ chiều/tối (Có đèn & peak-hour)</h4>
          <div class="time-grid">
            <button 
              v-for="time in eveningHours" 
              :key="time.val"
              class="time-slot"
              :class="{ 
                active: selectedTimeSlots.includes(time.val),
                disabled: time.disabled 
              }"
              :disabled="time.disabled"
              @click="toggleTimeSlot(time.val)"
            >
              <span class="slot-time">{{ time.val }}</span>
              <span class="slot-price">{{ formatVnd(time.price) }}</span>
            </button>
          </div>
        </div>

        <!-- Amenities -->
        <div class="booking-section">
          <h4 class="booking-section-title">Tiện ích sân</h4>
          <div class="amenities-list">
            <span class="amenity-item"><i class="fa-solid fa-wifi"></i> Wifi miễn phí</span>
            <span class="amenity-item"><i class="fa-solid fa-square-parking"></i> Bãi để xe</span>
            <span class="amenity-item"><i class="fa-solid fa-shower"></i> Phòng tắm</span>
            <span class="amenity-item"><i class="fa-solid fa-mug-hot"></i> Căng tin</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Checkout Drawer -->
    <div class="checkout-drawer">
      <div class="price-summary">
        <span class="summary-label">1 SÂN X {{ selectedTimeSlots.length }} GIỜ</span>
        <span class="summary-total">{{ totalPriceFormatted }}</span>
      </div>
      <button class="btn-checkout" @click="checkoutBooking">Thanh toán</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAppState } from '~/composables/useAppState'

const { 
  clientScreen, 
  activeCourt, 
  selectedDate, 
  selectedTimeSlots, 
  checkoutBooking,
  showToast
} = useAppState()

// Reactive image reference
const currentImage = ref(activeCourt.value.cover)

watch(() => activeCourt.value, (newCourt) => {
  currentImage.value = newCourt.cover
})

const datesList = [
  { full: '2026-06-21', lbl: 'Th 2', num: '21' },
  { full: '2026-06-22', lbl: 'Th 3', num: '22' },
  { full: '2026-06-23', lbl: 'Th 4', num: '23' },
  { full: '2026-06-24', lbl: 'Th 5', num: '24' },
  { full: '2026-06-25', lbl: 'Th 6', num: '25' },
  { full: '2026-06-26', lbl: 'Th 7', num: '26' },
  { full: '2026-06-27', lbl: 'CN', num: '27' }
]

const disabledHours = ref<string[]>(['11:00', '15:00'])

// Hourly schedules with dynamic peak pricing surcharges
const morningHours = computed(() => {
  const basePrice = activeCourt.value.price
  return [
    { val: '08:00', price: basePrice, disabled: disabledHours.value.includes('08:00') },
    { val: '09:00', price: basePrice, disabled: disabledHours.value.includes('09:00') },
    { val: '10:00', price: basePrice, disabled: disabledHours.value.includes('10:00') },
    { val: '11:00', price: basePrice, disabled: disabledHours.value.includes('11:00') }
  ]
})

const eveningHours = computed(() => {
  const basePrice = activeCourt.value.price
  // Evening peak slots get a slight dynamic surcharge (+20,000 VND / +$3.00)
  const peakPrice = basePrice + 20000
  return [
    { val: '14:00', price: basePrice, disabled: disabledHours.value.includes('14:00') },
    { val: '15:00', price: basePrice, disabled: disabledHours.value.includes('15:00') },
    { val: '18:00', price: peakPrice, disabled: disabledHours.value.includes('18:00') },
    { val: '19:00', price: peakPrice, disabled: disabledHours.value.includes('19:00') }
  ]
})

const changeDate = (date: string) => {
  selectedDate.value = date
  const allHours = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '18:00', '19:00']
  disabledHours.value = allHours.filter(() => Math.random() < 0.25)
  selectedTimeSlots.value = selectedTimeSlots.value.filter(h => !disabledHours.value.includes(h))
}

const toggleTimeSlot = (time: string) => {
  if (selectedTimeSlots.value.includes(time)) {
    selectedTimeSlots.value = selectedTimeSlots.value.filter(t => t !== time)
  } else {
    selectedTimeSlots.value.push(time)
  }
}

// Sum the specific prices of selected slots
const totalPriceFormatted = computed(() => {
  let sum = 0
  selectedTimeSlots.value.forEach(timeVal => {
    const morningSlot = morningHours.value.find(s => s.val === timeVal)
    if (morningSlot) {
      sum += morningSlot.price
    } else {
      const eveningSlot = eveningHours.value.find(s => s.val === timeVal)
      if (eveningSlot) {
        sum += eveningSlot.price
      }
    }
  })
  return sum.toLocaleString('vi-VN') + 'đ'
})

const formatVnd = (val: number) => {
  return (val / 1000) + 'k'
}
</script>

<style scoped>
.time-slot {
  height: auto !important;
  padding: 6px 2px !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 2px !important;
  line-height: 1.2 !important;
}

.slot-time {
  font-size: 0.8rem;
  font-weight: 700;
}

.slot-price {
  font-size: 0.65rem;
  opacity: 0.75;
}

.time-slot.active .slot-price {
  opacity: 1;
}
</style>
