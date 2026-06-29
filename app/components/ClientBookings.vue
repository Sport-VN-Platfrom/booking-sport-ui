<template>
  <section class="app-screen active">
    <header class="app-header">
      <h2 class="app-title">Lịch Sử Đặt Sân</h2>
      <button class="header-icon-btn" aria-label="Notifications">
        <i class="fa-regular fa-bell"></i>
      </button>
    </header>

    <!-- Tab Subnav -->
    <div class="booking-tabs">
      <button 
        class="booking-tab" 
        :class="{ active: activeTab === 'upcoming' }"
        @click="activeTab = 'upcoming'"
      >
        Sắp chơi
      </button>
      <button 
        class="booking-tab" 
        :class="{ active: activeTab === 'past' }"
        @click="activeTab = 'past'"
      >
        Đã chơi
      </button>
    </div>

    <div class="screen-scrollable">
      <!-- Upcoming list -->
      <div v-if="activeTab === 'upcoming'" class="booking-tab-content active">
        <div class="booking-list">
          <div 
            v-for="booking in upcomingBookings" 
            :key="booking.id"
            class="booking-history-card"
          >
            <div class="card-top">
              <div class="icon-avatar" :class="booking.iconClass">
                <i class="fa-solid" :class="booking.icon"></i>
              </div>
              <div class="card-title-block">
                <h4>{{ booking.courtName }}</h4>
                <p class="address-sub">{{ booking.courtAddress }}</p>
              </div>
              <span class="status-badge status-paid">Đã thanh toán</span>
            </div>
            <div class="card-middle">
              <div class="time-info">
                <i class="fa-regular fa-calendar"></i>
                <span>{{ booking.date }}</span>
              </div>
              <div class="time-info">
                <i class="fa-regular fa-clock"></i>
                <span>{{ booking.timeSpan }}</span>
              </div>
              <div class="price-info">
                <span>Tổng tiền: </span>
                <strong>{{ booking.cost }}</strong>
              </div>
            </div>
            <div class="card-bottom">
              <span class="booking-code">Mã đặt sân: {{ booking.code }}</span>
              <button class="btn-action-history">Xem mã QR</button>
            </div>
          </div>
          <div v-if="upcomingBookings.length === 0" class="no-bookings-lbl">
            Chưa có lịch đặt sắp tới.
          </div>
        </div>
      </div>

      <!-- Past list -->
      <div v-else class="booking-tab-content active">
        <div class="booking-list">
          <div 
            v-for="booking in pastBookings" 
            :key="booking.id"
            class="booking-history-card"
          >
            <div class="card-top">
              <div class="icon-avatar" :class="booking.iconClass">
                <i class="fa-solid" :class="booking.icon"></i>
              </div>
              <div class="card-title-block">
                <h4>{{ booking.courtName }}</h4>
                <p class="address-sub">{{ booking.courtAddress }}</p>
              </div>
              <span class="status-badge status-done">Hoàn thành</span>
            </div>
            <div class="card-middle">
              <div class="time-info">
                <i class="fa-regular fa-calendar"></i>
                <span>{{ booking.date }}</span>
              </div>
              <div class="time-info">
                <i class="fa-regular fa-clock"></i>
                <span>{{ booking.timeSpan }}</span>
              </div>
              <div class="price-info">
                <span>Tổng tiền: </span>
                <strong>{{ booking.cost }}</strong>
              </div>
            </div>
            <div class="card-bottom">
              <span class="booking-code">Mã đặt sân: {{ booking.code }}</span>
              <button class="btn-action-history secondary">Đặt lại</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppState } from '~/composables/useAppState'

const { bookings } = useAppState()

const activeTab = ref<'upcoming' | 'past'>('upcoming')

const upcomingBookings = computed(() => {
  return bookings.value.filter(b => b.status === 'paid')
})

const pastBookings = computed(() => {
  return bookings.value.filter(b => b.status === 'done')
})
</script>

<style scoped>
.no-bookings-lbl {
  padding: 40px;
  text-align: center;
  color: #9CA3AF;
  font-size: 0.9rem;
}
</style>
