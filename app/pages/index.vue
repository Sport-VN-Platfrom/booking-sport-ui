<template>
  <main>
    <!-- 1. Client View Wrapper (Mobile App Viewport) -->
    <div v-show="platformMode === 'client'" class="client-view-wrapper active">
      <div class="app-container">
        <!-- Phone Screen Display Viewport -->
        <div class="phone-app-content">
          <ClientHome v-if="clientScreen === 'screen-home'" />
          <ClientSearch v-else-if="clientScreen === 'screen-search'" />
          <ClientDetails v-else-if="clientScreen === 'screen-details'" />
          <ClientBookings v-else-if="clientScreen === 'screen-bookings'" />
          <ClientProfile v-else-if="clientScreen === 'screen-profile'" />
        </div>

        <!-- Phone App Bottom Tab Menu Bar -->
        <nav class="phone-app-nav">
          <button 
            class="nav-item" 
            :class="{ active: clientScreen === 'screen-home' }"
            @click="clientScreen = 'screen-home'"
          >
            <i class="fa-solid fa-house"></i>
            <span>Trang chủ</span>
          </button>
          <button 
            class="nav-item" 
            :class="{ active: clientScreen === 'screen-search' }"
            @click="clientScreen = 'screen-search'"
          >
            <i class="fa-solid fa-magnifying-glass"></i>
            <span>Tìm kiếm</span>
          </button>
          <button 
            class="nav-item" 
            :class="{ active: clientScreen === 'screen-bookings' }"
            @click="clientScreen = 'screen-bookings'"
          >
            <i class="fa-solid fa-calendar-check"></i>
            <span>Lịch đặt</span>
          </button>
          <button 
            class="nav-item" 
            :class="{ active: clientScreen === 'screen-profile' }"
            @click="clientScreen = 'screen-profile'"
          >
            <i class="fa-solid fa-user"></i>
            <span>Cá nhân</span>
          </button>
        </nav>

        <!-- Checkout Success Dialog Modal -->
        <SuccessModal />
      </div>
    </div>

    <!-- 2. Admin View Wrapper (Desktop Owner Workspace) -->
    <div v-show="platformMode === 'admin'" class="admin-view-wrapper active">
      <div class="admin-dashboard-container">
        <!-- Sidebar Navigation -->
        <aside class="admin-sidebar">
          <div class="admin-brand">
            <div class="admin-brand-icon"><i class="fa-solid fa-bolt"></i></div>
            <h2>KINETIC COURT</h2>
          </div>
          <nav class="admin-nav-menu">
            <button 
              class="admin-nav-item" 
              :class="{ active: adminPanel === 'panel-dashboard' }"
              @click="adminPanel = 'panel-dashboard'"
            >
              <i class="fa-solid fa-chart-pie"></i>
              <span>Bảng điều khiển</span>
            </button>
            <button 
              class="admin-nav-item" 
              :class="{ active: adminPanel === 'panel-courts' }"
              @click="adminPanel = 'panel-courts'"
            >
              <i class="fa-solid fa-cubes"></i>
              <span>Quản lý sân & lịch</span>
            </button>
          </nav>
          <div class="admin-sidebar-footer">
            <div class="admin-user-avatar">
              <img src="/assets/images/user-profile.png" alt="Admin user">
            </div>
            <div class="admin-user-info">
              <h4>Nguyễn Văn Huy</h4>
              <span>Chủ sân (Quản lý)</span>
            </div>
          </div>
        </aside>

        <!-- Main Viewport -->
        <main class="admin-viewport">
          <header class="admin-header">
            <h2 id="admin-panel-title">
              {{ adminPanel === 'panel-dashboard' ? 'Bảng Điều Khiển' : 'Quản Lý Sân & Lịch' }}
            </h2>
            
            <!-- Mobile Admin Navigation Header -->
            <div class="admin-mobile-nav">
              <button 
                class="mobile-nav-btn" 
                :class="{ active: adminPanel === 'panel-dashboard' }"
                @click="adminPanel = 'panel-dashboard'"
                aria-label="Dashboard"
              >
                <i class="fa-solid fa-chart-pie"></i>
              </button>
              <button 
                class="mobile-nav-btn" 
                :class="{ active: adminPanel === 'panel-courts' }"
                @click="adminPanel = 'panel-courts'"
                aria-label="Courts"
              >
                <i class="fa-solid fa-cubes"></i>
              </button>
            </div>

            <div class="admin-header-actions">
              <button class="admin-action-btn" aria-label="Notifications">
                <i class="fa-regular fa-bell"></i>
                <span class="badge-dot"></span>
              </button>
              <button class="admin-action-btn" id="btn-export-csv" @click="exportCsv">
                <i class="fa-solid fa-file-export"></i>
                <span>Xuất báo cáo CSV</span>
              </button>
            </div>
          </header>

          <div class="admin-panel-content">
            <AdminDashboard v-if="adminPanel === 'panel-dashboard'" />
            <AdminCourts v-else-if="adminPanel === 'panel-courts'" />
          </div>
        </main>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useAppState } from '~/composables/useAppState'

const { 
  platformMode, 
  clientScreen, 
  adminPanel, 
  exportCsv 
} = useAppState()
</script>
