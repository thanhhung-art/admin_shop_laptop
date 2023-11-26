export function convertTime (date: Date) {
  const dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const dateReformated = dateObj.toLocaleDateString(navigator.language, {
    year: 'numeric',
    day: '2-digit',
    month: '2-digit'
  })

  return `${hours}: ${minutes} - ${dateReformated}`
}