(function() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 0);
  var diff = now - start;
  var oneDay = 1000 * 60 * 60 * 24;
  var day = Math.floor(diff / oneDay);
  var idx = day % 3
  var assignee = ['Alice', 'Charlotte', 'Ed'][idx];
  document.getElementsByClassName('assignee-name')[0].textContent = assignee;
})();
