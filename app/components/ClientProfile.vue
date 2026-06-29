<template>
  <section class="app-screen active">
    <header class="app-header">
      <h2 class="app-title">Trang Cá Nhân</h2>
      <button class="header-icon-btn" aria-label="Settings">
        <i class="fa-solid fa-gear"></i>
      </button>
    </header>

    <div class="screen-scrollable">
      <!-- User card header -->
      <div class="user-profile-header">
        <div class="profile-avatar">
          <img src="/assets/images/user-profile.png" alt="Nguyễn Văn Huy">
        </div>
        <div class="user-meta">
          <h3>Nguyễn Văn Huy</h3>
          <span class="membership-badge"><i class="fa-solid fa-crown"></i> Gold Member</span>
        </div>
      </div>

      <!-- Loyalty point panels -->
      <div class="points-panel">
        <div class="point-item">
          <span class="point-value">1.250</span>
          <span class="point-label">Điểm tích lũy</span>
        </div>
        <div class="divider"></div>
        <div class="point-item">
          <span class="point-value">3</span>
          <span class="point-label">Voucher khả dụng</span>
        </div>
      </div>

      <!-- Options lists -->
      <ul class="profile-menu">
        <li class="menu-item">
          <div class="menu-label">
            <i class="fa-regular fa-user"></i>
            <span>Thông tin tài khoản</span>
          </div>
          <i class="fa-solid fa-chevron-right chevron-next"></i>
        </li>
        <li class="menu-item">
          <div class="menu-label">
            <i class="fa-solid fa-percent"></i>
            <span>Ưu đãi của tôi</span>
            <span class="badge-count">3</span>
          </div>
          <i class="fa-solid fa-chevron-right chevron-next"></i>
        </li>
        <li class="menu-item">
          <div class="menu-label">
            <i class="fa-regular fa-heart"></i>
            <span>Sân yêu thích</span>
          </div>
          <i class="fa-solid fa-chevron-right chevron-next"></i>
        </li>
        
        <!-- Switches viewer mode to Admin -->
        <li class="menu-item" id="profile-admin-trigger" @click="platformMode = 'admin'">
          <div class="menu-label">
            <i class="fa-solid fa-user-gear" style="color: var(--accent-blue);"></i>
            <span style="color: var(--accent-blue); font-weight: 600;">Chuyển sang giao diện Admin</span>
          </div>
          <i class="fa-solid fa-chevron-right chevron-next" style="color: var(--accent-blue);"></i>
        </li>
        
        <li class="menu-item">
          <div class="menu-label">
            <i class="fa-regular fa-circle-question"></i>
            <span>Liên hệ hỗ trợ</span>
          </div>
          <i class="fa-solid fa-chevron-right chevron-next"></i>
        </li>
        <li class="menu-item">
          <div class="menu-label">
            <i class="fa-solid fa-circle-info"></i>
            <span>Cài đặt ứng dụng</span>
          </div>
          <i class="fa-solid fa-chevron-right chevron-next"></i>
        </li>
        <li class="menu-item logout">
          <div class="menu-label">
            <i class="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Đăng xuất</span>
          </div>
          <i class="fa-solid fa-chevron-right chevron-next"></i>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAppState } from '~/composables/useAppState'

const { platformMode } = useAppState()
</script>
