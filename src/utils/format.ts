export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(
    number
  );
};

export const formatTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60); // Calcula las horas completas
  const remainingMinutes = Math.floor(minutes % 60); // Calcula los minutos restantes

  // Formatea las horas y los minutos para que siempre tengan dos dígitos
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = remainingMinutes.toString().padStart(2, "0");

  // Retorna la cadena resultante en el formato "HH:MM"
  return `${formattedHours}:${formattedMinutes}`;
};
