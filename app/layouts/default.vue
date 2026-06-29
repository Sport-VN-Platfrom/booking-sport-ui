<template>
  <div>
    <!-- Platform Preview Switcher (Web Top Bar) -->
    <div class="platform-switcher">
      <button 
        class="switch-tab" 
        :class="{ active: platformMode === 'client' }"
        @click="platformMode = 'client'"
      >
        <i class="fa-solid fa-mobile-screen-button"></i>
        <span>Người đặt sân (Khách)</span>
      </button>
      <button 
        class="switch-tab" 
        :class="{ active: platformMode === 'admin' }"
        @click="platformMode = 'admin'"
      >
        <i class="fa-solid fa-desktop"></i>
        <span>Chủ sân (Quản lý)</span>
      </button>
    </div>

    <!-- Viewports -->
    <slot />

    <!-- Global Toast Notification Overlay -->
    <NotificationToast />
  </div>
</template>

<script setup lang="ts">
import { useAppState } from '~/composables/useAppState'
const { platformMode } = useAppState()
</script>
