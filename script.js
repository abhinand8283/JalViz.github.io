const gaugeFill = document.getElementById("gaugeFill")
const gaugeTxt = document.getElementById("gaugeTxt")

const flowVal = document.getElementById("flowVal")
const tdsVal = document.getElementById("tdsVal")
const batteryVal = document.getElementById("batteryVal")

const pumpState = document.getElementById("pumpState")
const lastFill = document.getElementById("lastFill")
const alertsEl = document.getElementById("alerts")

let level = 40
let pumpOn = false
let lastFillTime = null
let alerts = []

function updateGauge(value){
const circumference = 500
const fill = (value/100) * circumference

if (gaugeFill) {
gaugeFill.style.strokeDasharray = fill + " " + circumference
gaugeFill.style.transition = "stroke-dasharray 0.5s ease"
}

if (gaugeTxt) gaugeTxt.textContent = value + "%"
}

function updateData(){

let change = (Math.random() - 0.5) * 4
if (pumpOn) change += 2

level += change
level = Math.max(0, Math.min(100, level))

updateGauge(Math.round(level))

if (flowVal) flowVal.textContent = pumpOn ? (Math.random()*10 + 5).toFixed(1) : "0.0"
if (tdsVal) tdsVal.textContent = Math.floor(Math.random()*200 + 300)
if (batteryVal) batteryVal.textContent = (3.7 + Math.random()*0.3).toFixed(2)

if (level < 20 && !pumpOn) {
pumpOn = true
if (pumpState) pumpState.textContent = "ON"
alerts.push("Pump started - Low level")
}

else if (level > 95 && pumpOn) {
pumpOn = false
if (pumpState) pumpState.textContent = "OFF"
lastFillTime = new Date()

if (lastFill) lastFill.textContent = lastFillTime.toLocaleTimeString()

alerts.push("Pump stopped - Tank full")
}

if (level < 10) alerts.push("Critical: Tank almost empty!")
if (level > 98) alerts.push("Warning: Tank overflow risk")

if (alerts.length > 3) alerts.shift()

if (alertsEl) alertsEl.textContent = alerts.length ? alerts[alerts.length-1] : "None"
}

setInterval(updateData, 2000)

/* Gauge animation */

function animateGaugeTo(value, duration = 1000) {

const start = Date.now()
const startValue = 0
const endValue = value

function animate() {

const elapsed = Date.now() - start
const progress = Math.min(elapsed / duration, 1)

const currentValue = startValue + (endValue - startValue) * progress

updateGauge(Math.round(currentValue))

if (progress < 1) requestAnimationFrame(animate)

}

animate()
}

animateGaugeTo(40)

/* Scroll reveal */

function revealOnScroll(){

const reveals = document.querySelectorAll('.reveal')

reveals.forEach(el => {

const rect = el.getBoundingClientRect()

if (rect.top < window.innerHeight - 100) {
el.classList.add('visible')
}

})
}

window.addEventListener('scroll', revealOnScroll)
window.addEventListener('load', revealOnScroll)

/* Contact form */

function handleSubmit(event){

event.preventDefault()

const email = document.getElementById('emailInput').value

if (email) {

alert('Thank you! Your request has been sent. We will contact you at ' + email)

document.getElementById('emailInput').value = ''

}
}
/* Daily Consumption Chart */

const canvas = document.getElementById("consumptionChart")

if(canvas){

const ctx = canvas.getContext("2d")

let data = [120, 150, 100, 180, 130, 160, 140]
let labels = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]

function drawChart(){

ctx.clearRect(0,0,canvas.width,canvas.height)

const w = canvas.width
const h = canvas.height
const stepX = w / data.length
const maxVal = Math.max(...data) + 20

ctx.beginPath()
ctx.moveTo(0, h - (data[0]/maxVal)*h)

for(let i=1;i<data.length;i++){

let x = i * stepX
let y = h - (data[i]/maxVal)*h

ctx.lineTo(x,y)

}

ctx.strokeStyle = "#00d4ff"
ctx.lineWidth = 3
ctx.stroke()

}

function animateChart(){

data.push(Math.floor(Math.random()*100 + 80))
data.shift()

drawChart()

}

drawChart()

setInterval(animateChart,3000)

}