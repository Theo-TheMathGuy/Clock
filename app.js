function getTransform(angle) {
    return "transform: translate(-50%, -100%) rotate(" + angle.toString() + "deg);"
}

function format(nb) {
    return nb < 10 ? "0" + nb.toString() : nb.toString()
}

function getTimestamp(hour, min, sec, mil) {
    return `${format(hour)}:${format(min)}:${format(sec)}.${format(mil)}`
}

main_div = document.querySelector("main")
dots = []
little_dots = []
big_dots = []

for (let i = 0; i < 60; i++) {
    const el = document.createElement("div");
    if (i % 5 == 0) {
        el.setAttribute("class", "dot big-dot")
        nth = Math.floor(i / 5)
        el.setAttribute("style", "--i: " + (nth).toString() + ";")
        big_dots[nth] = el
    } else {
        el.setAttribute("class", "dot little-dot")
        el.setAttribute("style", "--i: " + i.toString() + ";")
        little_dots[i] = el
    }
    dots[i] = el
    main_div.appendChild(el)
}

sec_hand = document.getElementById("seconds-hand")
min_hand = document.getElementById("minutes-hand")
hou_hand = document.getElementById("hours-hand")

sec_hand.setAttribute("style", "transform: translate(-50%, -100%)")
min_hand.setAttribute("style", "transform: translate(-50%, -100%)")
hou_hand.setAttribute("style", "transform: translate(-50%, -100%)")

time_span = document.getElementById("timestamp")

setInterval(function () {
    date = new Date()

    raw_mil = Math.floor(date.getMilliseconds() / 10)
    raw_sec = date.getSeconds()
    raw_min = date.getMinutes()
    raw_hou = date.getHours()
    sec = raw_sec - Math.sqrt(1 - raw_mil / 100)
    min = raw_min + sec / 60
    hou = raw_hou + min / 60

    sec_angle = sec * 6
    min_angle = min * 6
    hou_angle = hou * 30

    sec_hand.setAttribute("style", getTransform(sec_angle))
    min_hand.setAttribute("style", getTransform(min_angle))
    hou_hand.setAttribute("style", getTransform(hou_angle))
    time_span.textContent = getTimestamp(raw_hou, raw_min, raw_sec, raw_mil)
}, 10)