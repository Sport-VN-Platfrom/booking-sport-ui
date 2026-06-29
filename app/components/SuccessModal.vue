<template>
  <Transition name="dialog-fade">
    <div 
      v-if="successModal.show" 
      class="success-overlay open"
      @click.self="closeModal"
    >
      <div class="success-card">
        <div class="success-icon-badge">
          <i class="fa-solid fa-circle-check"></i>
        </div>
        <h3>Đặt sân thành công!</h3>
        <p>Mã đặt sân của bạn là <strong id="success-booking-code">{{ successModal.bookingCode }}</strong>. Bạn có thể xem chi tiết trong Lịch Sử Đặt Sân.</p>
        <button class="btn-success-close" @click="closeModal">Đồng ý</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useAppState } from '~/composables/useAppState'

const { successModal, clientScreen } = useAppState()

const closeModal = () => {
  successModal.value.show = false
  clientScreen.value = 'screen-bookings'
}
</script>

<style scoped>
/* Dialog Modal Animations */
.dialog-fade-enter-active {
  animation: dialogOverlayFade 0.35s ease-out forwards;
}

.dialog-fade-leave-active {
  animation: dialogOverlayFade 0.35s ease-in reverse forwards;
}

@keyframes dialogOverlayFade {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
