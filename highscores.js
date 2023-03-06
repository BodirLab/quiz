const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = ''

let content = document.createDocumentFragment()

highScores.forEach(score => {
  let li = document.createElement('LI')
  li.textContent = `${score.name} - ${score.score}`
  li.className = 'high-score'
  content.appendChild(li)
})

highScoresList.appendChild(content)
