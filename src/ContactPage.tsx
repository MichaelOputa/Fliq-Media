import { FormEvent, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, Check, ChevronLeft, ChevronRight, Clock3, MapPin } from 'lucide-react';
import { GoogleIcon, WhatsAppIcon } from '@/BrandIcons';
import { googleBusinessUrl, whatsappNumber, whatsappUrl } from '@/siteData';

const timeSlots = ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function firstDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }).format(date);
}

export function ContactPage() {
  const [displayMonth, setDisplayMonth] = useState(() => firstDayOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'schedule' | 'details'>('schedule');

  const today = new Date();
  const monthStart = firstDayOfMonth(displayMonth);
  const dayCount = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, 0).getDate();
  const calendarCellCount = Math.ceil((monthStart.getDay() + dayCount) / 7) * 7;
  const calendarDays = Array.from({ length: calendarCellCount }, (_, index) => {
    const day = index - monthStart.getDay() + 1;
    return day > 0 && day <= dayCount ? day : null;
  });
  const monthLabel = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(displayMonth);
  const selectedDateLabel = selectedDate ? formatDate(selectedDate) : 'No date selected';

  const changeMonth = (offset: number) => {
    const nextMonth = new Date(displayMonth.getFullYear(), displayMonth.getMonth() + offset, 1);
    setDisplayMonth(nextMonth);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      "Hello FliQ Media, I'd like to book a consultation.",
      '',
      `Name: ${formData.get('fullName')}`,
      `Company / organization: ${formData.get('company') || 'Not provided'}`,
      `Email: ${formData.get('email')}`,
      `Phone: ${formData.get('phone') || 'Not provided'}`,
      `Service: ${formData.get('service')}`,
      `Preferred date: ${selectedDate ? selectedDateLabel : 'Not selected'}`,
      `Preferred time: ${selectedTime || 'Not selected'}`,
      `Project details: ${formData.get('details')}`,
    ].join('\n');
    const whatsappBaseUrl = whatsappUrl.split('?')[0];
    window.open(`${whatsappBaseUrl}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="booking-contact">
      <div className="booking-contact-banner">
        <div className="booking-banner-content">
          <img src="/fliq_media_logo.png" alt="FliQ Media" />
          <p className="eyebrow light">FliQ Media / Consultation</p>
          <h1>Please select<br /><em>a date and time.</em></h1>
          <p>Choose a preferred time and tell us a little about your project.</p>
        </div>
      </div>
      <div className="content-width booking-panel-wrap">
        <section className="booking-service-card" aria-label="Consultation details">
          <h2>Book A Consultation</h2>
          <div className="booking-service-meta">
            <span><Clock3 size={18} /> 30 minutes</span>
            <span><CalendarDays size={18} /> Complimentary</span>
            <span><MapPin size={18} /> Lagos, Nigeria</span>
          </div>
          <p>A one-to-one planning session with FliQ Media to discuss your photography or visual storytelling needs.</p>
        </section>

        <section className="booking-calendar-panel" aria-label="Book a consultation">
          {step === 'schedule' ? (
            <>
              <div className="booking-calendar-grid">
                <div className="booking-calendar">
                  <div className="booking-calendar-heading">
                    <h2>{monthLabel}</h2>
                    <div className="calendar-month-controls">
                      <button type="button" onClick={() => changeMonth(-1)} disabled={displayMonth.getFullYear() === today.getFullYear() && displayMonth.getMonth() === today.getMonth()} aria-label="Previous month"><ChevronLeft size={20} /></button>
                      <button type="button" onClick={() => changeMonth(1)} aria-label="Next month"><ChevronRight size={20} /></button>
                    </div>
                  </div>
                  <div className="calendar-day-grid" role="grid" aria-label={monthLabel}>
                    {weekDays.map((day) => <span className="calendar-weekday" key={day} role="columnheader">{day}</span>)}
                    {calendarDays.map((day, index) => {
                      const date = day === null ? null : new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
                      const isPast = date !== null && date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                      const isSelected = date !== null && selectedDate?.toDateString() === date.toDateString();
                      return day === null ? <span className="calendar-empty" key={`empty-${index}`} /> : (
                        <button
                          className={`calendar-date ${isSelected ? 'is-selected' : ''}`}
                          type="button"
                          role="gridcell"
                          key={day}
                          disabled={isPast}
                          aria-pressed={isSelected}
                          aria-label={formatDate(date!)}
                          onClick={() => { setSelectedDate(date); setSelectedTime(null); }}
                        >{day}</button>
                      );
                    })}
                  </div>
                </div>

                <div className="booking-times">
                  <div className="booking-date-heading">
                    <h2>{selectedDate ? selectedDateLabel : 'Choose a date'}</h2>
                    <p>West Africa Time · Lagos</p>
                  </div>
                  <p className="booking-time-label">Preferred time</p>
                  {selectedDate ? (
                    <div className="booking-time-grid">
                      {timeSlots.map((time) => (
                        <button className={selectedTime === time ? 'is-selected' : ''} type="button" key={time} aria-pressed={selectedTime === time} onClick={() => setSelectedTime(time)}>{time}</button>
                      ))}
                    </div>
                  ) : <p className="booking-time-empty">Select a date on the calendar to view preferred times.</p>}
                </div>
              </div>
              <div className="booking-calendar-footer">
                <p>Preferred times are requests and will be confirmed by our team.</p>
                <button className="button button-dark" type="button" disabled={!selectedDate || !selectedTime} onClick={() => setStep('details')}>Continue <ArrowRight size={16} /></button>
              </div>
              <button className="booking-request-link" type="button" onClick={() => { setSelectedDate(null); setSelectedTime(null); setStep('details'); }}>Need a different time? Send an inquiry</button>
            </>
          ) : (
            <div className="booking-details-step">
              <button className="booking-back-link" type="button" onClick={() => setStep('schedule')}><ArrowLeft size={16} /> Back to date and time</button>
              <div className="booking-step-heading">
                <p className="eyebrow">Your details</p>
                <h2>Tell us about<br /><em>your project.</em></h2>
                <p>{selectedDate && selectedTime ? `${selectedDateLabel} · ${selectedTime} (WAT)` : 'Send us an inquiry and we will help find a suitable time.'}</p>
              </div>
              <form className="contact-form booking-contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>Full name<input name="fullName" required placeholder="Your name" autoComplete="name" /></label>
                  <label>Company / organization<input name="company" placeholder="Company name" autoComplete="organization" /></label>
                </div>
                <div className="form-row">
                  <label>Email address<input name="email" required type="email" placeholder="you@company.com" autoComplete="email" /></label>
                  <label>Phone number<input name="phone" placeholder="Your phone number" autoComplete="tel" /></label>
                </div>
                <label>Service required<select name="service" defaultValue="" required>
                  <option value="" disabled>Select a service</option>
                  <option>Commercial Photography</option>
                  <option>Corporate Headshots</option>
                  <option>Editorial Photography</option>
                  <option>Event Photography</option>
                  <option>Lifestyle Photography</option>
                  <option>Music &amp; Concert Photography</option>
                  <option>Personal Branding</option>
                  <option>Wedding Photography</option>
                  <option>Visual Storytelling</option>
                  <option>Other</option>
                </select></label>
                <label>Project details<textarea name="details" required placeholder="Tell us about your project" rows={5} /></label>
                <button className="button button-dark" type="submit"><WhatsAppIcon size={16} /> Continue on WhatsApp <Check size={16} /></button>
              </form>
            </div>
          )}
        </section>

        <div className="booking-contact-links">
          <a href={whatsappUrl} target="_blank" rel="noreferrer"><WhatsAppIcon size={17} /> WhatsApp <strong>{whatsappNumber}</strong></a>
          <a href={googleBusinessUrl} target="_blank" rel="noreferrer"><GoogleIcon size={17} /> Find FliQ Media on Google</a>
        </div>
      </div>
    </section>
  );
}
