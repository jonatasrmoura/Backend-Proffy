// Converter Horas para minutos e Numeros
export default function convertHourToMinutes(time: string) {
    // 8:00
    // transformar no tipo numerico
    const [hour, minutes] = time.split(':').map(Number);
    // 
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}