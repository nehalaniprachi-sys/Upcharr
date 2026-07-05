// ==========================================================================
// MOCK DATA - DOCTORS & SPECIALTIES
// ==========================================================================
const DOCTORS = [
  {
    id: "dr-sharma",
    name: "Dr. Aarav Sharma",
    specialty: "General Physician",
    qualifications: "MD, Internal Medicine",
    experience: 12,
    rating: 4.9,
    reviews: 340,
    nextSlot: "Tomorrow, 9:00 AM",
    avatar: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="90" fill="#f4f5f7"/>
              <path d="M60 170 C 60 130, 140 130, 140 170" fill="#1d2939"/>
              <circle cx="100" cy="85" r="35" fill="#fcddec"/>
              <path d="M85 120 C 85 140, 115 140, 115 120" stroke="#0e9384" stroke-width="4" fill="none"/>
              <path d="M65 85 C 65 60, 135 60, 135 85" stroke="#101828" stroke-width="6" fill="none"/>
            </svg>`
  },
  {
    id: "dr-patel",
    name: "Dr. Ananya Patel",
    specialty: "Pediatrics",
    qualifications: "MD, Pediatrics",
    experience: 9,
    rating: 4.8,
    reviews: 215,
    nextSlot: "Tomorrow, 11:30 AM",
    avatar: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="90" fill="#f4f5f7"/>
              <path d="M60 170 C 60 130, 140 130, 140 170" fill="#1e3a8a"/>
              <circle cx="100" cy="85" r="35" fill="#fef3c7"/>
              <path d="M78 80 C 78 50, 122 50, 122 80" stroke="#1e293b" stroke-width="8" fill="none"/>
              <path d="M85 120 C 85 145, 115 145, 115 120" stroke="#0e9384" stroke-width="4" fill="none"/>
            </svg>`
  },
  {
    id: "dr-mehta",
    name: "Dr. Vikram Mehta",
    specialty: "Cardiology",
    qualifications: "DM, Cardiology",
    experience: 15,
    rating: 4.95,
    reviews: 490,
    nextSlot: "Wed, 2:00 PM",
    avatar: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="90" fill="#f4f5f7"/>
              <path d="M60 170 C 60 130, 140 130, 140 170" fill="#312e81"/>
              <circle cx="100" cy="85" r="35" fill="#ffedd5"/>
              <path d="M80 120 C 80 140, 120 140, 120 120" stroke="#0e9384" stroke-width="4" fill="none"/>
              <circle cx="100" cy="82" r="33" stroke="#111827" stroke-width="4" fill="none"/>
            </svg>`
  },
  {
    id: "dr-reddy",
    name: "Dr. Kavitha Reddy",
    specialty: "Dermatology",
    qualifications: "MD, DNB (Dermatology)",
    experience: 8,
    rating: 4.7,
    reviews: 180,
    nextSlot: "Tomorrow, 4:00 PM",
    avatar: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="90" fill="#f4f5f7"/>
              <path d="M60 170 C 60 130, 140 130, 140 170" fill="#1e3a8a"/>
              <circle cx="100" cy="85" r="35" fill="#fae8ff"/>
              <path d="M78 80 C 78 50, 122 50, 122 80" stroke="#101828" stroke-width="6" fill="none"/>
              <path d="M85 120 C 85 145, 115 145, 115 120" stroke="#0e9384" stroke-width="4" fill="none"/>
            </svg>`
  },
  {
    id: "dr-singh",
    name: "Dr. Kabir Singh",
    specialty: "Orthopedics",
    qualifications: "MS, Ortho",
    experience: 11,
    rating: 4.85,
    reviews: 295,
    nextSlot: "Thursday, 10:00 AM",
    avatar: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="90" fill="#f4f5f7"/>
              <path d="M60 170 C 60 130, 140 130, 140 170" fill="#111827"/>
              <circle cx="100" cy="85" r="35" fill="#fed7aa"/>
              <path d="M85 120 C 85 145, 115 145, 115 120" stroke="#0e9384" stroke-width="4" fill="none"/>
            </svg>`
  }
];

const TIME_SLOTS = [
  { time: "09:00 AM", period: "morning" },
  { time: "10:00 AM", period: "morning" },
  { time: "11:00 AM", period: "morning" },
  { time: "02:00 PM", period: "afternoon" },
  { time: "03:00 PM", period: "afternoon" },
  { time: "04:00 PM", period: "afternoon" },
  { time: "06:00 PM", period: "evening" },
  { time: "07:00 PM", period: "evening" }
];

// ==========================================================================
// STATE MANAGEMENT
// ==========================================================================
let selectedDoctor = null;
let selectedDate = null;
let selectedTime = null;
let currentStep = 1;

// ==========================================================================
// DOM ELEMENTS
// ==========================================================================
const widgetSpecialty = document.getElementById('widget-specialty');
const widgetDoctor = document.getElementById('widget-doctor');
const btnQuickBook = document.getElementById('btn-quick-book');
const doctorsListContainer = document.getElementById('doctors-list');
const bookingModal = document.getElementById('booking-modal');
const modalClose = document.getElementById('modal-close');

// Modal Elements
const modalDoctorName = document.getElementById('modal-doctor-name');
const modalDoctorSpecialty = document.getElementById('modal-doctor-specialty');
const modalDoctorAvatar = document.querySelector('.modal-doctor-avatar');
const calendarGrid = document.getElementById('calendar-grid');
const timeSlotsContainer = document.getElementById('time-slots-container');
const btnNextStep = document.getElementById('btn-next-step');
const btnPrevStep = document.getElementById('btn-prev-step');
const detailsForm = document.getElementById('booking-details-form');
const btnBookingDone = document.getElementById('btn-booking-done');
const btnPrintReceipt = document.getElementById('btn-print-receipt');

// Panes & Step Indicators
const stepIndicators = document.querySelectorAll('.step-indicator');
const panes = document.querySelectorAll('.wizard-step-pane');

// Receipt elements
const recRefId = document.getElementById('receipt-ref-id');
const recDocName = document.getElementById('receipt-doctor-name');
const recDateTime = document.getElementById('receipt-date-time');
const recPatientName = document.getElementById('receipt-patient-name');

// ==========================================================================
// INITIALIZATION & DYNAMIC RENDERING
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  renderDoctorsList(DOCTORS);
  setupWidgetListeners();
  setupSpecialtiesGridInteractions();
  setupModalListeners();
});

// Render the doctors grid
function renderDoctorsList(doctorsToRender) {
  doctorsListContainer.innerHTML = '';
  
  if (doctorsToRender.length === 0) {
    doctorsListContainer.innerHTML = `
      <div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
        <p>No specialist available matching this request.</p>
      </div>
    `;
    return;
  }

  doctorsToRender.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doctor-card';
    card.setAttribute('data-doctor-id', doc.id);
    card.setAttribute('data-specialty', doc.specialty);
    
    card.innerHTML = `
      <div class="doctor-avatar-wrapper">
        ${doc.avatar}
      </div>
      <div class="doctor-info">
        <span class="doc-tag">${doc.specialty}</span>
        <h3>${doc.name}</h3>
        <p class="doc-meta">${doc.qualifications} &bull; ${doc.experience} yrs exp</p>
        <div class="doc-rating">
          <span class="stars">★★★★★</span>
          <span class="rating-num">${doc.rating}</span>
          <span class="reviews-count">(${doc.reviews} reviews)</span>
        </div>
        <div class="doc-availability">
          <span class="pulse-green"></span>
          <span>Next slot: ${doc.nextSlot}</span>
        </div>
        <button class="btn btn-secondary btn-book-now" data-doc-id="${doc.id}">Book Appointment</button>
      </div>
    `;
    doctorsListContainer.appendChild(card);
  });

  // Re-bind click event to buttons
  document.querySelectorAll('.btn-book-now').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const docId = e.currentTarget.getAttribute('data-doc-id');
      const doctor = DOCTORS.find(d => d.id === docId);
      if (doctor) {
        openBookingFlow(doctor);
      }
    });
  });
}

// Setup Quick booking dropdown filter
function setupWidgetListeners() {
  widgetSpecialty.addEventListener('change', () => {
    const specialty = widgetSpecialty.value;
    widgetDoctor.innerHTML = '<option value="">Select doctor</option>';
    
    if (specialty) {
      const filteredDocs = DOCTORS.filter(d => d.specialty === specialty);
      filteredDocs.forEach(d => {
        const option = document.createElement('option');
        option.value = d.id;
        option.textContent = d.name;
        widgetDoctor.appendChild(option);
      });
      widgetDoctor.disabled = false;
    } else {
      widgetDoctor.disabled = true;
    }
  });

  btnQuickBook.addEventListener('click', () => {
    const specialty = widgetSpecialty.value;
    const doctorId = widgetDoctor.value;
    
    if (doctorId) {
      const doc = DOCTORS.find(d => d.id === doctorId);
      if (doc) openBookingFlow(doc);
    } else if (specialty) {
      // Find first doctor of specialty
      const doc = DOCTORS.find(d => d.specialty === specialty);
      if (doc) openBookingFlow(doc);
    } else {
      // Scroll to doctor list
      document.getElementById('doctors').scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// Specialties interaction (filtering doctors list and scrolling)
function setupSpecialtiesGridInteractions() {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      const specialty = card.getAttribute('data-specialty');
      
      // Filter list of doctors to match selected specialty
      const filtered = DOCTORS.filter(d => d.specialty === specialty);
      renderDoctorsList(filtered);
      
      // Scroll smoothly to doctor section
      document.getElementById('doctors').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// ==========================================================================
// WIZARD / MODAL LOGIC
// ==========================================================================
function openBookingFlow(doctor) {
  selectedDoctor = doctor;
  selectedDate = null;
  selectedTime = null;
  currentStep = 1;

  // Set doctor details in modal
  modalDoctorName.textContent = doctor.name;
  modalDoctorSpecialty.textContent = doctor.specialty;
  modalDoctorAvatar.innerHTML = doctor.avatar;

  // Generate Calendar dates (next 7 days starting from tomorrow)
  generateCalendar();

  // Reset slots
  timeSlotsContainer.innerHTML = '<p class="info-msg" style="grid-column: 1/-1; text-align: center; color: var(--text-tertiary);">Please select a date first.</p>';
  btnNextStep.disabled = true;

  // Render first wizard pane
  goToStep(1);

  // Open modal container
  bookingModal.classList.add('open');
  document.body.style.overflow = 'hidden'; // Lock background scroll
}

function closeBookingFlow() {
  bookingModal.classList.remove('open');
  document.body.style.overflow = ''; // Restore background scroll
}

function setupModalListeners() {
  modalClose.addEventListener('click', closeBookingFlow);
  
  // Close on backdrop click
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) {
      closeBookingFlow();
    }
  });

  // Step 1 next
  btnNextStep.addEventListener('click', () => {
    if (selectedDate && selectedTime) {
      goToStep(2);
    }
  });

  // Step 2 back
  btnPrevStep.addEventListener('click', () => {
    goToStep(1);
  });

  // Form submission
  detailsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    submitBooking();
  });

  // Reset booking on done
  btnBookingDone.addEventListener('click', () => {
    detailsForm.reset();
    closeBookingFlow();
  });

  // Simulate print receipt
  btnPrintReceipt.addEventListener('click', () => {
    window.print();
  });
}

function goToStep(step) {
  currentStep = step;
  
  // Update Indicators
  stepIndicators.forEach(ind => {
    const s = parseInt(ind.getAttribute('data-step'));
    ind.classList.remove('active', 'completed');
    if (s === step) {
      ind.classList.add('active');
    } else if (s < step) {
      ind.classList.add('completed');
    }
  });

  // Show Pane
  panes.forEach(pane => pane.classList.remove('active'));
  document.getElementById(`pane-step-${step}`).classList.add('active');
}

// Generate next 8 calendar dates (excluding Sundays)
function generateCalendar() {
  calendarGrid.innerHTML = '';
  const today = new Date();
  let count = 0;
  let dayOffset = 1;

  while (count < 8) {
    const nextDate = new Date();
    nextDate.setDate(today.getDate() + dayOffset);
    
    // Skip sundays (0)
    if (nextDate.getDay() !== 0) {
      const dayNum = nextDate.getDate();
      const dayName = nextDate.toLocaleDateString('en-US', { weekday: 'short' });
      const monthName = nextDate.toLocaleDateString('en-US', { month: 'short' });
      
      const dateVal = `${monthName} ${dayNum}, ${nextDate.getFullYear()}`;
      
      const dayBtn = document.createElement('button');
      dayBtn.className = 'calendar-day-btn';
      dayBtn.type = 'button';
      dayBtn.innerHTML = `
        <span class="day-name">${dayName}</span>
        <span class="day-number">${dayNum}</span>
      `;

      dayBtn.addEventListener('click', () => {
        // Toggle selected state
        document.querySelectorAll('.calendar-day-btn').forEach(btn => btn.classList.remove('selected'));
        dayBtn.classList.add('selected');
        
        selectedDate = dateVal;
        selectedTime = null; // Reset time when date changes
        btnNextStep.disabled = true;

        renderTimeSlots();
      });

      calendarGrid.appendChild(dayBtn);
      count++;
    }
    dayOffset++;
  }
}

// Render slots dynamically for chosen date
function renderTimeSlots() {
  timeSlotsContainer.innerHTML = '';
  
  // Randomly disable 2-3 slots to simulate real-time availability
  const seed = new Date(selectedDate).getDate() + selectedDoctor.id.charCodeAt(3);
  
  TIME_SLOTS.forEach((slot, index) => {
    const isBooked = (seed + index) % 4 === 0; // Deterministic random booking
    
    const slotBtn = document.createElement('button');
    slotBtn.className = `time-slot-btn ${isBooked ? 'disabled' : ''}`;
    slotBtn.type = 'button';
    slotBtn.disabled = isBooked;
    slotBtn.textContent = slot.time;

    if (!isBooked) {
      slotBtn.addEventListener('click', () => {
        document.querySelectorAll('.time-slot-btn').forEach(btn => btn.classList.remove('selected'));
        slotBtn.classList.add('selected');
        
        selectedTime = slot.time;
        btnNextStep.disabled = false;
      });
    }

    timeSlotsContainer.appendChild(slotBtn);
  });
}

// Submit details
function submitBooking() {
  const patientName = document.getElementById('patient-name').value;
  const refId = `UPC-${Math.floor(100000 + Math.random() * 900000)}`;

  // Populate Receipt UI
  recRefId.textContent = refId;
  recDocName.textContent = selectedDoctor.name;
  recDateTime.textContent = `${selectedDate} at ${selectedTime}`;
  recPatientName.textContent = patientName;

  goToStep(3);
}
