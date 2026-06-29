<template>
  <div class="admin-sub-panel active" id="panel-dashboard">
    <!-- Stats Grid Row -->
    <div class="admin-stats-grid">
      <!-- Card 1 (Double Wide Revenue) -->
      <div class="stat-widget double-wide">
        <div class="widget-header">
          <span>TỔNG DOANH THU (7 NGÀY QUA)</span>
          <span class="trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +12.4%</span>
        </div>
        <div class="widget-value">$12,482.50</div>
        <p class="widget-desc">Đạt được qua 248 lượt đặt tại {{ activeCourtsCount }} sân hoạt động</p>
        <!-- Revenue chart columns -->
        <div class="revenue-chart">
          <div class="chart-col" style="height: 35%;" data-day="T2"></div>
          <div class="chart-col" style="height: 48%;" data-day="T3"></div>
          <div class="chart-col" style="height: 60%;" data-day="T4"></div>
          <div class="chart-col active" style="height: 85%;" data-day="T5"></div>
          <div class="chart-col" style="height: 70%;" data-day="T6"></div>
          <div class="chart-col" style="height: 90%;" data-day="T7"></div>
          <div class="chart-col" style="height: 55%;" data-day="CN"></div>
        </div>
      </div>
      <!-- Card 2 -->
      <div class="stat-widget">
        <div class="widget-header">
          <span>KHÁCH HÀNG MỚI</span>
          <span class="trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +18%</span>
        </div>
        <div class="widget-value">42</div>
        <p class="widget-desc">Tài khoản mới đăng ký trong tuần này</p>
        <div class="widget-icon"><i class="fa-solid fa-user-plus"></i></div>
      </div>
      <!-- Card 3 -->
      <div class="stat-widget">
        <div class="widget-header">
          <span>HIỆU SUẤT TRUNG BÌNH</span>
        </div>
        <div class="widget-value">1.5 giờ</div>
        <p class="widget-desc">Thời gian đặt trung bình mỗi lượt chơi</p>
        <div class="widget-progress-track">
          <div class="widget-progress-fill" style="width: 75%;"></div>
        </div>
        <span class="widget-progress-lbl">Hiệu suất ổn định</span>
      </div>
      <!-- Card 4 -->
      <div class="stat-widget half-height">
        <div class="widget-header">
          <span>LƯỢT ĐẶT</span>
          <span class="trend trend-up"><i class="fa-solid fa-arrow-trend-up"></i> +12%</span>
        </div>
        <div class="widget-value">148</div>
      </div>
      <!-- Card 5 -->
      <div class="stat-widget half-height">
        <div class="widget-header">
          <span>SÂN ĐANG HOẠT ĐỘNG</span>
        </div>
        <div class="widget-value" id="active-courts-count">
          {{ activeCourtsCount }}/{{ totalCourtsCount }}
        </div>
      </div>
    </div>

    <!-- Dashboard Columns Layout -->
    <div class="admin-dashboard-layout">
      <!-- Column 1: Today's Schedule Timeline -->
      <div class="dashboard-card">
        <div class="card-header">
          <h3>Lịch Trình Hôm Nay</h3>
          <button class="btn-lock-schedule" @click="quickLock"><i class="fa-solid fa-ban"></i> Khóa Nhanh</button>
        </div>
        <div class="schedule-timeline" id="today-schedule-list">
          <div class="timeline-item">
            <span class="time-lbl">09:00</span>
            <div class="timeline-content">
              <div class="timeline-header">
                <h4>Sân 1 &bull; Sân Bravo</h4>
                <span class="badge-status-dot active"></span>
              </div>
              <p>Khách: John D. & Nhóm</p>
            </div>
          </div>
          <div class="timeline-item">
            <span class="time-lbl">10:30</span>
            <div class="timeline-content">
              <div class="timeline-header">
                <h4>Sân 3 &bull; Sân Charlie</h4>
                <span class="badge-status-dot active"></span>
              </div>
              <p>Khách: Lớp Trung Cấp</p>
            </div>
          </div>
          <div class="timeline-item locked">
            <span class="time-lbl">12:00</span>
            <div class="timeline-content">
              <div class="timeline-header">
                <h4>LỊCH ĐÃ KHÓA</h4>
                <i class="fa-solid fa-lock"></i>
              </div>
              <p>Lý do: Bảo trì đèn chiếu sáng định kỳ</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Column 2: Recent Bookings Timeline logs -->
      <div class="dashboard-card">
        <div class="card-header">
          <h3>Lịch Đặt Gần Đây</h3>
        </div>
        <div class="recent-bookings-list">
          <div 
            v-for="(row, index) in adminRecentBookings" 
            :key="index"
            class="booking-item-row"
          >
            <div class="booking-desc-col">
              <h4>{{ row.clientName }}</h4>
              <span>Sân {{ row.courtId }} &bull; {{ row.hours }} Giờ &bull; {{ row.cost }}</span>
            </div>
            <div class="booking-time-col">
              <span class="badge-paid">ĐÃ THANH TOÁN</span>
              <span class="time-ago">{{ row.timeAgo }}</span>
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
  adminRecentBookings, 
  showToast 
} = useAppState()

const totalCourtsCount = computed(() => Object.keys(courts.value).length)

const activeCourtsCount = computed(() => {
  return Object.values(courts.value).filter(c => c.isActive).length
})

const quickLock = () => {
  showToast('Đã khoá lịch hoạt động hôm nay để tiến hành bảo trì nhanh.', 'info')
}
</script>
