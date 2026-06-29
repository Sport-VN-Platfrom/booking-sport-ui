<template>
  <div class="admin-sub-panel active" id="panel-courts">
    <div class="admin-courts-layout">
      <!-- Column 1: Active Booking check-in queue -->
      <div class="admin-column">
        <div class="card-header">
          <h3>Danh Sách Duyệt Khách Nhận Sân</h3>
        </div>
        <div class="admin-bookings-queue">
          <!-- Queue Item Card Transition Group -->
          <TransitionGroup name="queue-list">
            <div 
              v-for="item in adminQueue" 
              :key="item.id"
              class="queue-card"
            >
              <div class="queue-header">
                <span class="queue-time-lbl">Khung giờ: {{ item.timeSpan }}</span>
                <span class="queue-date-lbl">{{ item.date }}</span>
              </div>
              <div class="queue-body">
                <h4>Sân {{ item.courtId }} &bull; {{ item.courtName }}</h4>
                <p class="queue-client">Khách hàng: <strong>{{ item.clientName }}</strong></p>
                <span class="queue-payment" :class="{ paid: item.isPaid }">
                  {{ item.isPaid ? 'Đã thanh toán Online' : 'Thanh toán tại quầy' }}
                </span>
                <span class="queue-id">Mã đặt: #{{ item.bookingCode }}</span>
              </div>
              <div class="queue-actions">
                <button class="btn-q-detail" @click="showToast('Đang mở chi tiết lịch đặt sân này...', 'info')">
                  Chi tiết
                </button>
                <button class="btn-q-checkin" @click="checkinQueueItem(item.id)">
                  Nhận sân
                </button>
              </div>
            </div>
          </TransitionGroup>

          <div v-if="adminQueue.length === 0" class="no-queue-lbl">
            Chưa có yêu cầu nhận sân nào.
          </div>
        </div>
      </div>

      <!-- Column 2: Status control & Top Courts leaderboard -->
      <div class="admin-column gap-20">
        <!-- Courts Maintenance Card -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3>Quản Lý Trạng Thái Sân</h3>
          </div>
          <div class="courts-maintenance-list">
            <div 
              v-for="court in sortedCourts" 
              :key="court.id"
              class="maintenance-item-row"
            >
              <div class="m-info">
                <h4>{{ court.name }}</h4>
                <span class="m-type">{{ capitalize(court.sport) }} &bull; {{ court.id === '3' ? 'Ngoài trời' : 'Trong nhà' }}</span>
              </div>
              <div class="m-status-control">
                <span 
                  class="m-status-badge" 
                  :class="court.isActive ? 'status-active' : 'status-maintenance'"
                >
                  {{ court.isActive ? 'Đang hoạt động' : 'Bảo trì' }}
                </span>
                <label class="switch-toggle">
                  <input 
                    type="checkbox" 
                    :checked="court.isActive"
                    @change="toggleCourtMaintenance(court.id, court.isActive)"
                  >
                  <span class="slider-toggle-btn"></span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Leaderboard -->
        <div class="dashboard-card">
          <div class="card-header">
            <h3>Sân Có Doanh Thu Cao Nhất</h3>
          </div>
          <div class="leaderboard-list">
            <!-- Championship Court -->
            <div class="leaderboard-row">
              <span class="rank bg-pickleball">C1</span>
              <div class="l-name-block">
                <h4>Championship Court</h4>
                <span>68 lượt đặt chơi</span>
              </div>
              <div class="l-rev">
                <strong class="rev-val">$4,080.00</strong>
                <div class="rev-bar" style="width: 100%;"></div>
              </div>
            </div>
            <!-- The Pro Zone -->
            <div class="leaderboard-row">
              <span class="rank bg-badminton">C2</span>
              <div class="l-name-block">
                <h4>The Pro Zone</h4>
                <span>52 lượt đặt chơi</span>
              </div>
              <div class="l-rev">
                <strong class="rev-val">$3,120.00</strong>
                <div class="rev-bar" style="width: 75%;"></div>
              </div>
            </div>
            <!-- Pickleball Arena A -->
            <div class="leaderboard-row">
              <span class="rank bg-pickleball">P1</span>
              <div class="l-name-block">
                <h4>Pickleball Arena A</h4>
                <span>50 lượt đặt chơi</span>
              </div>
              <div class="l-rev">
                <strong class="rev-val">$2,800.00</strong>
                <div class="rev-bar" style="width: 68%;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppState } from '~/composables/useAppState'

const { 
  courts, 
  adminQueue, 
  checkinQueueItem, 
  toggleCourtMaintenance, 
  showToast 
} = useAppState()

const sortedCourts = computed(() => {
  return Object.values(courts.value).sort((a,b) => parseInt(a.id) - parseInt(b.id))
})

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)
</script>

<style scoped>
.no-queue-lbl {
  padding: 40px;
  text-align: center;
  color: #64748B;
  font-size: 0.9rem;
}

/* Queue List Transition animations */
.queue-list-enter-active,
.queue-list-leave-active {
  transition: all 0.4s ease;
}

.queue-list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.queue-list-leave-to {
  opacity: 0;
  transform: translateX(50px);
}
</style>
