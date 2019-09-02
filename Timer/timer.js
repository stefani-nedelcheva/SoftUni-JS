function timer() {
   let seconds = $('#seconds');
   let minutes = $('#minutes');
   let hours = $('#hours');

   let isTicking = false;
   let timer;

   $('#start-timer').click(function() {
      if (!isTicking) {
         timer = setInterval(secondsUpdate, 1000);
         isTicking = true;
      }
   });

   $('#stop-timer').click(stopTimer);

   function secondsUpdate() {

      seconds.text(formatter(+seconds.text() + 1));

      if (+seconds.text() === 60) {
         seconds.text('00');
         minutes.text(formatter(+minutes.text() + 1));
      } else if(+minutes.text() === 60) {
         minutes.text('00');
         hours.text(formatter(+hours.text() + 1));
      }     
   }

   function stopTimer() {
      clearInterval(timer);
      isTicking = false;
   }

   function formatter(time) {
      return ("0" + time).slice(-2);
   }  
}
