<template>
  <Transition name="toast-fade">
    <div 
      v-if="toastNotification.show" 
      class="toast-notification"
      :class="`toast-${toastNotification.type}`"
    >
      <div class="toast-content">
        <span class="toast-icon">
          <i v-if="toastNotification.type === 'success'" class="fa-solid fa-circle-check"></i>
          <i v-else-if="toastNotification.type === 'warning'" class="fa-solid fa-triangle-exclamation"></i>
          <i v-else class="fa-solid fa-circle-info"></i>
        </span>
        <span class="toast-message">{{ toastNotification.message }}</span>
      </div>
      <button class="toast-close" @click="toastNotification.show = false">&times;</button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAppState } from '~/composables/useAppState'
const { toastNotification } = useAppState()
</script>

<style scoped>
.toast-notification {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #1E293B;
  color: #FFFFFF;
  border-left: 4px solid #0284C7;
  border-radius: 8px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  padding: 16px 20px;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  max-width: 380px;
  border: 1px solid #334155;
  border-left-width: 4px;
  font-family: 'Be Vietnam Pro', sans-serif;
  font-size: 0.9rem;
}

.toast-success {
  border-left-color: #22C55E;
}

.toast-warning {
  border-left-color: #EF4444;
}

.toast-info {
  border-left-color: #0284C7;
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.toast-icon {
  font-size: 1.1rem;
  display: flex;
  align-items: center;
}

.toast-success .toast-icon {
  color: #22C55E;
}

.toast-warning .toast-icon {
  color: #EF4444;
}

.toast-info .toast-icon {
  color: #0284C7;
}

.toast-close {
  background: transparent;
  border: none;
  font-size: 1.3rem;
  cursor: pointer;
  opacity: 0.6;
  color: #FFFFFF;
  line-height: 1;
  transition: opacity 0.2s;
}

.toast-close:hover {
  opacity: 1;
}

/* Toast Animations */
.toast-fade-enter-active {
  animation: slideIn 0.3s ease forwards;
}

.toast-fade-leave-active {
  animation: slideOut 0.3s ease forwards;
}

@keyframes slideIn {
  from { transform: translateX(120%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(120%); opacity: 0; }
}
</style>
