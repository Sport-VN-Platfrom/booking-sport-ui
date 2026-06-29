import { ref, computed } from 'vue'

export interface Court {
  id: string
  name: string
  sport: 'pickleball' | 'badminton' | 'tennis' | 'basketball'
  rating: string
  price: number
  address: string
  cover: string
  iconClass: string
  icon: string
  isActive: boolean // Sync for maintenance mode
}

export interface Booking {
  id: string
  courtId: string
  courtName: string
  courtAddress: string
  iconClass: string
  icon: string
  date: string
  timeSpan: string
  cost: string
  code: string
  status: 'paid' | 'done' | 'pending'
}

export interface QueueItem {
  id: string
  bookingCode: string
  timeSpan: string
  date: string
  courtId: string
  courtName: string
  clientName: string
  paymentType: 'counter' | 'online'
  isPaid: boolean
}

export interface RecentBookingRow {
  clientName: string
  courtId: string
  hours: number
  cost: string
  status: 'paid' | 'pending'
  timeAgo: string
}

export const useAppState = () => {
  // 1. Current Preview Configuration Mode
  const platformMode = useState<'client' | 'admin'>('platformMode', () => 'client')
  
  // 2. Client Views Router
  const clientScreen = useState<string>('clientScreen', () => 'screen-home')
  
  // 3. Admin Views Router
  const adminPanel = useState<string>('adminPanel', () => 'panel-dashboard')

  // 4. Mock Database (Reactive)
  const courts = useState<Record<string, Court>>('courts', () => ({
    '1': {
      id: '1',
      name: 'Kinetic Arena Q.1',
      sport: 'pickleball',
      rating: '4.9',
      price: 150000,
      address: '45 Nguyễn Huệ, Quận 1, TP. HCM',
      cover: '/assets/images/pickleball-1.png',
      iconClass: 'bg-pickleball',
      icon: 'fa-table-tennis-paddle-ball',
      isActive: true
    },
    '2': {
      id: '2',
      name: 'Sân Cầu Lông Đa Năng',
      sport: 'badminton',
      rating: '4.9',
      price: 180000,
      address: '78 Nam Kỳ Khởi Nghĩa, Quận 1, TP. HCM',
      cover: '/assets/images/badminton-1.png',
      iconClass: 'bg-badminton',
      icon: 'fa-shuttlecock',
      isActive: true
    },
    '3': {
      id: '3',
      name: 'Pro Court Tennis Hub',
      sport: 'tennis',
      rating: '4.8',
      price: 220000,
      address: '235 Nguyễn Văn Cừ, Quận 5, TP. HCM',
      cover: '/assets/images/tennis-1.png',
      iconClass: 'bg-tennis',
      icon: 'fa-baseball-bat-ball',
      isActive: true
    },
    '4': {
      id: '4',
      name: 'Pickleball Central District',
      sport: 'pickleball',
      rating: '4.9',
      price: 130000,
      address: '104 Nguyễn Hữu Thọ, Quận 7, TP. HCM',
      cover: '/assets/images/court-detail-main.png',
      iconClass: 'bg-pickleball',
      icon: 'fa-table-tennis-paddle-ball',
      isActive: true
    },
    '5': {
      id: '5',
      name: 'Elite Court Phú Mỹ Hưng',
      sport: 'pickleball',
      rating: '4.7',
      price: 150000,
      address: 'Block B, Phú Mỹ Hưng, Quận 7, TP. HCM',
      cover: '/assets/images/pickleball-1.png',
      iconClass: 'bg-pickleball',
      icon: 'fa-table-tennis-paddle-ball',
      isActive: true
    }
  }))

  // 5. Selected Court Booking State
  const selectedCourtId = useState<string>('selectedCourtId', () => '4')
  const selectedDate = useState<string>('selectedDate', () => '2026-06-23')
  const selectedTimeSlots = useState<string[]>('selectedTimeSlots', () => ['08:00', '18:00', '19:00'])

  const activeCourt = computed(() => courts.value[selectedCourtId.value] || courts.value['4'])

  // 6. User Bookings History (Upcoming & Past)
  const bookings = useState<Booking[]>('bookings', () => [
    {
      id: 'b1',
      courtId: '4',
      courtName: 'Pickleball Central District',
      courtAddress: '123 Lê Lợi, Quận 1, TP. HCM',
      iconClass: 'bg-pickleball',
      icon: 'fa-table-tennis-paddle-ball',
      date: 'Thứ 3, 22/06/2026',
      timeSpan: '18:00 - 20:00 (2 giờ)',
      cost: '400.000đ',
      code: 'KC-89421',
      status: 'paid'
    },
    {
      id: 'b2',
      courtId: '2',
      courtName: 'Sân Cầu Lông Đa Năng',
      courtAddress: '78 Nam Kỳ Khởi Nghĩa, Quận 1, TP. HCM',
      iconClass: 'bg-badminton',
      icon: 'fa-shuttlecock',
      date: 'Thứ 2, 15/06/2026',
      timeSpan: '08:00 - 10:00 (2 giờ)',
      cost: '360.000đ',
      code: 'KC-21495',
      status: 'done'
    }
  ])

  // 7. Admin Panel Management Queues (Figma Synchronized)
  const adminQueue = useState<QueueItem[]>('adminQueue', () => [
    {
      id: 'q1',
      bookingCode: 'KC-9824-X',
      timeSpan: '20:00 - 21:00 (1 giờ)',
      date: '24 tháng 10, 2026',
      courtId: '3',
      courtName: 'Pro Court Tennis Hub',
      clientName: 'Sarah Jenkins',
      paymentType: 'counter',
      isPaid: false
    },
    {
      id: 'q2',
      bookingCode: 'KC-9901-A',
      timeSpan: '07:00 - 09:00 (2 giờ)',
      date: '25 tháng 10, 2026',
      courtId: '1',
      courtName: 'Kinetic Arena Q.1',
      clientName: 'Michael Zhao',
      paymentType: 'online',
      isPaid: true
    },
    {
      id: 'q3',
      bookingCode: 'KC-9821-B',
      timeSpan: '18:00 - 20:00 (2 giờ)',
      date: '24 tháng 10, 2026',
      courtId: '1',
      courtName: 'Kinetic Arena Q.1',
      clientName: 'Alex Thompson',
      paymentType: 'online',
      isPaid: true
    }
  ])

  const adminRecentBookings = useState<RecentBookingRow[]>('adminRecentBookings', () => [
    {
      clientName: 'Michael Sanders',
      courtId: '4',
      hours: 2,
      cost: '$60.00',
      status: 'paid',
      timeAgo: '2 phút trước'
    },
    {
      clientName: 'Sarah Lee',
      courtId: '1',
      hours: 1,
      cost: '$35.00',
      status: 'pending',
      timeAgo: '15 phút trước'
    }
  ])

  // 8. Visual Popups and Toasts State
  const successModal = useState<{ show: boolean; bookingCode: string }>('successModal', () => ({
    show: false,
    bookingCode: 'KC-00000'
  }))

  const toastNotification = useState<{
    show: boolean
    message: string
    type: 'success' | 'warning' | 'info'
  }>('toastNotification', () => ({
    show: false,
    message: '',
    type: 'info'
  }))

  const showToast = (msg: string, type: 'success' | 'warning' | 'info' = 'info') => {
    toastNotification.value = { show: true, message: msg, type }
    setTimeout(() => {
      if (toastNotification.value.message === msg) {
        toastNotification.value.show = false
      }
    }, 4500)
  }

  // 9. Status modifiers & Sync actions
  const checkoutBooking = () => {
    if (selectedTimeSlots.value.length === 0) {
      showToast('Vui lòng chọn ít nhất một khung giờ chơi!', 'warning')
      return false
    }

    const activeDateNum = selectedDate.value.split('-')[2] || '23'
    const fullDateString = `Thứ 3, ${activeDateNum}/06/2026`
    
    // Sort times
    const hours = selectedTimeSlots.value.map(t => parseInt(t.split(':')[0])).sort((a,b) => a-b)
    let timeSpanText = ""
    if (hours.length === 1) {
      timeSpanText = `${hours[0]}:00 - ${hours[0]+1}:00 (1 giờ)`
    } else {
      timeSpanText = `${hours[0]}:00 - ${hours[hours.length-1]+1}:00 (${hours.length} giờ)`
    }

    const costValue = (activeCourt.value.price * selectedTimeSlots.value.length)
    const formattedCostVnd = costValue.toLocaleString('vi-VN') + 'đ'
    const formattedCostUsd = '$' + (costValue / 6000).toFixed(2)

    const randCode = 'KC-' + Math.floor(10000 + Math.random() * 90000)

    // Prepend to Client Bookings history
    bookings.value.unshift({
      id: 'b_' + randCode,
      courtId: activeCourt.value.id,
      courtName: activeCourt.value.name,
      courtAddress: activeCourt.value.address,
      iconClass: activeCourt.value.iconClass,
      icon: activeCourt.value.icon,
      date: fullDateString,
      timeSpan: timeSpanText,
      cost: formattedCostVnd,
      code: randCode,
      status: 'paid'
    })

    // Sync to Admin Recent log
    adminRecentBookings.value.unshift({
      clientName: 'Nguyễn Văn Huy (Khách)',
      courtId: activeCourt.value.id,
      hours: selectedTimeSlots.value.length,
      cost: formattedCostUsd,
      status: 'paid',
      timeAgo: 'Vừa xong'
    })

    // Sync to Admin Approval queue
    adminQueue.value.unshift({
      id: 'q_' + randCode,
      bookingCode: randCode,
      timeSpan: timeSpanText,
      date: `${activeDateNum} tháng 6, 2026`,
      courtId: activeCourt.value.id,
      courtName: activeCourt.value.name,
      clientName: 'Nguyễn Văn Huy',
      paymentType: 'online',
      isPaid: true
    })

    successModal.value = {
      show: true,
      bookingCode: randCode
    }

    return true
  }

  const toggleCourtMaintenance = (courtId: string, isMaintenance: boolean) => {
    const targetCourt = courts.value[courtId]
    if (targetCourt) {
      targetCourt.isActive = !isMaintenance
      if (isMaintenance) {
        showToast(`Sân "${targetCourt.name}" đã tạm dừng để bảo trì!`, 'warning')
      } else {
        showToast(`Sân "${targetCourt.name}" đã hoạt động bình thường!`, 'success')
      }
    }
  }

  const checkinQueueItem = (queueId: string) => {
    adminQueue.value = adminQueue.value.filter(item => item.id !== queueId)
    showToast('Khách hàng đã nhận sân thành công!', 'success')
  }

  const exportCsv = () => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Ngay,San,Khach Hang,Khung Gio,Doanh Thu\n"
      + "22/06/2026,Championship Court,Johnathan Doe,18:00 - 20:00,400000\n"
      + "23/06/2026,Sân Cầu Lông Đa Năng,Sophia Martinez,09:00 - 10:00,180000\n"
      + "25/06/2026,Pro Court Tennis Hub,Michael Zhao,07:00 - 09:00,440000\n"
      + "26/06/2026,Pickleball Central District,Sarah Jenkins,20:00 - 21:00,200000\n";
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "bao_cao_doanh_thu_kinetic_court.csv")
    document.body.appendChild(link)
    link.click()
    link.remove()
    showToast('Tải báo cáo doanh thu CSV thành công!', 'success')
  }

  return {
    platformMode,
    clientScreen,
    adminPanel,
    courts,
    selectedCourtId,
    selectedDate,
    selectedTimeSlots,
    activeCourt,
    bookings,
    adminQueue,
    adminRecentBookings,
    successModal,
    toastNotification,
    showToast,
    checkoutBooking,
    toggleCourtMaintenance,
    checkinQueueItem,
    exportCsv
  }
}
