const TodayDate = () => {
  const today = new Date();

  // Yıl, ay ve gün değerlerini manuel olarak alıyoruz
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Aylar 0'dan başladığı için +1 ekleniyor
  const year = today.getFullYear(); // Yılı 4 basamaklı olarak alıyoruz

  const formattedDate = `${day}.${month}.${year}`;
  
  return formattedDate;
}

module.exports = TodayDate;
