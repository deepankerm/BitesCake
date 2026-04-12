// Store hours utility — Bites Cake operates 9:00 AM to 10:30 PM IST
// After hours, ordering is disabled and only enquiries are accepted.

export function isStoreOpen(): boolean {
  // Get current time in IST (Asia/Kolkata, UTC+5:30)
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const totalMinutes = hours * 60 + minutes;

  const openTime = 9 * 60;        // 9:00 AM = 540 min
  const closeTime = 22 * 60 + 30; // 10:30 PM = 1350 min

  return totalMinutes >= openTime && totalMinutes < closeTime;
}

export const STORE_OPEN_TIME = "9:00 AM";
export const STORE_CLOSE_TIME = "10:30 PM";
