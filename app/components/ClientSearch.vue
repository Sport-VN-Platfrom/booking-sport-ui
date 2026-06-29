<template>
  <section class="app-screen active">
    <header class="app-header">
      <h2 class="app-title">KINETIC COURT</h2>
      <button class="header-icon-btn" aria-label="Notifications">
        <i class="fa-regular fa-bell"></i>
      </button>
    </header>

    <div class="screen-scrollable">
      <!-- Search Input -->
      <div class="search-bar-container">
        <div class="search-input-wrapper">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm kiếm sân hoặc khu vực..." 
            class="search-input"
          >
        </div>
        <button class="filter-btn" aria-label="Filters"><i class="fa-solid fa-sliders"></i></button>
      </div>

      <!-- Filter Chips -->
      <div class="filter-chips-container">
        <button 
          v-for="chip in filterChips" 
          :key="chip"
          class="filter-chip"
          :class="{ active: activeFilter === chip }"
          @click="activeFilter = chip"
        >
          {{ chip }}
        </button>
      </div>

      <!-- Result Cards -->
      <div class="search-results">
        <div 
          v-for="court in searchedCourts" 
          :key="court.id"
          class="court-result-card"
          :class="{ disabled: !court.isActive }"
          @click="selectCourt(court)"
        >
          <div class="result-img-wrapper">
            <img :src="court.cover" :alt="court.name">
            <span class="result-badge">{{ capitalize(court.sport) }}</span>
          </div>
          <div class="result-info">
            <div class="result-header">
              <h4 class="result-name">{{ court.name }}</h4>
              <span class="result-distance"><i class="fa-solid fa-person-running"></i> 1.2 km</span>
            </div>
            <div class="result-rating"><i class="fa-solid fa-star"></i> {{ court.rating }} (48 đánh giá)</div>
            
            <div class="result-tags">
              <span class="tag-item"><i class="fa-solid fa-plug"></i> Có điện</span>
              <span class="tag-item"><i class="fa-solid fa-car"></i> Gửi xe</span>
              <span v-if="court.id === '2' || court.id === '4'" class="tag-item"><i class="fa-solid fa-wind"></i> Máy lạnh</span>
            </div>
            <div class="result-footer">
              <div class="result-price">{{ court.price.toLocaleString('vi-VN') }}đ <span>/ giờ</span></div>
              <button 
                class="btn-book-now"
                :class="{ 'btn-disabled': !court.isActive }"
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
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppState, type Court } from '~/composables/useAppState'

const { courts, selectedCourtId, clientScreen } = useAppState()

const searchQuery = ref('Sân Pickleball gần đây')
const activeFilter = ref('Gần nhất')
const filterChips = ['Gần nhất', 'Giá thấp', 'Có máy lạnh', 'Trong nhà']

const searchedCourts = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return Object.values(courts.value).filter(court => {
    return (
      court.name.toLowerCase().includes(query) ||
      court.sport.toLowerCase().includes(query) ||
      court.address.toLowerCase().includes(query)
    )
  })
})

const selectCourt = (court: Court) => {
  if (!court.isActive) return
  selectedCourtId.value = court.id
  clientScreen.value = 'screen-details'
}

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
</script>
