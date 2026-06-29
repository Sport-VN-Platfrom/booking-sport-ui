<template>
  <section class="app-screen active">
    <!-- Header location -->
    <header class="app-header">
      <div class="header-location">
        <span class="loc-label">Vị trí của bạn</span>
        <div class="loc-value">
          <i class="fa-solid fa-location-dot"></i>
          <span>Quận 1, TP. HCM</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      <button class="header-icon-btn" aria-label="Notifications">
        <i class="fa-regular fa-bell"></i>
        <span class="badge-dot"></span>
      </button>
    </header>

    <div class="screen-scrollable">
      <!-- Mock Search bar redirection -->
      <div class="home-search-mock" @click="clientScreen = 'screen-search'">
        <i class="fa-solid fa-magnifying-glass"></i>
        <span>Tìm kiếm sân hoặc khu vực...</span>
        <button class="filter-btn-mock" aria-label="Filters"><i class="fa-solid fa-sliders"></i></button>
      </div>

      <!-- Promo banner card -->
      <div class="promo-banner">
        <div class="promo-text">
          <span class="promo-tag">ƯU ĐÃI THÀNH VIÊN MỚI</span>
          <h2>Giảm 20% Cho Lượt Đặt Đầu Tiên</h2>
          <p>Nhập mã: <strong class="promo-code">KINETIC20</strong></p>
        </div>
        <div class="promo-badge"><i class="fa-solid fa-ticket"></i></div>
      </div>

      <!-- Categories row chips -->
      <div class="categories-section">
        <h3 class="section-title">Môn thể thao</h3>
        <div class="categories-list">
          <button 
            v-for="sport in sportsList" 
            :key="sport.key"
            class="category-chip"
            :class="{ active: activeSport === sport.key }"
            @click="activeSport = sport.key"
          >
            <i :class="sport.icon"></i>
            <span>{{ sport.name }}</span>
          </button>
        </div>
      </div>

      <!-- Featured Courts list -->
      <div class="featured-section">
        <div class="section-header">
          <h3 class="section-title">Sân nổi bật gần bạn</h3>
          <a href="#" class="view-all-link" @click.prevent="clientScreen = 'screen-search'">Xem tất cả</a>
        </div>
        
        <div class="courts-list">
          <!-- Iterate filtered courts -->
          <div 
            v-for="court in filteredCourts" 
            :key="court.id"
            class="court-card"
            :style="{ opacity: court.isActive ? '1' : '0.6' }"
            @click="selectCourt(court)"
          >
            <div class="court-img-wrapper">
              <img :src="court.cover" :alt="court.name">
              <span class="court-badge">{{ capitalize(court.sport) }}</span>
              <button class="fav-btn" aria-label="Favorite" @click.stop><i class="fa-regular fa-heart"></i></button>
            </div>
            <div class="court-details">
              <div class="court-header">
                <h4 class="court-name">{{ court.name }}</h4>
                <span class="court-rating"><i class="fa-solid fa-star"></i> {{ court.rating }}</span>
              </div>
              <p class="court-specs">
                <i class="fa-solid fa-house"></i> 
                {{ court.id === '3' ? 'Ngoài trời' : 'Trong nhà' }} | Sân cao cấp
              </p>
              <div class="court-footer">
                <div class="court-price">{{ court.price.toLocaleString('vi-VN') }}đ <span>/ giờ</span></div>
                
                <!-- Disable button if court is set to maintenance -->
                <button 
                  class="btn-book-now"
                  :style="!court.isActive ? { backgroundColor: '#9CA3AF' } : {}"
                  :disabled="!court.isActive"
                  @click.stop="selectCourt(court)"
                >
                  {{ court.isActive ? 'Đặt ngay' : 'Bảo trì' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Join Partnership -->
      <div class="partner-invite">
        <div class="invite-content">
          <h4>Bạn là chủ sân?</h4>
          <p>Hợp tác cùng Kinetic Court để tiếp cận hàng ngàn khách hàng tiềm năng mỗi ngày.</p>
        </div>
        <button class="btn-partner" @click="platformMode = 'admin'">Quản lý</button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppState, type Court } from '~/composables/useAppState'

const { courts, selectedCourtId, clientScreen, platformMode } = useAppState()

const activeSport = ref<'pickleball' | 'badminton' | 'tennis' | 'basketball'>('pickleball')

const sportsList = [
  { key: 'pickleball', name: 'Pickleball', icon: 'fa-solid fa-table-tennis-paddle-ball' },
  { key: 'badminton', name: 'Cầu lông', icon: 'fa-solid fa-shuttlecock' },
  { key: 'tennis', name: 'Tennis', icon: 'fa-solid fa-baseball-bat-ball' },
  { key: 'basketball', name: 'Bóng rổ', icon: 'fa-solid fa-basketball' }
] as const

const filteredCourts = computed(() => {
  return Object.values(courts.value).filter(court => court.sport === activeSport.value)
})

const selectCourt = (court: Court) => {
  if (!court.isActive) return
  selectedCourtId.value = court.id
  clientScreen.value = 'screen-details'
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
</script>
