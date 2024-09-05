const TodayDate = () => {

    
  const today = new Date();
  
  const shortDate = today.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
   
    return shortDate.replace("/",".").replace("/",".");
  }
  
  module.exports = TodayDate;