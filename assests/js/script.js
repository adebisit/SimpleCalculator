var solveSpread = document.getElementById("solve-sheet")
var answerSpread = document.getElementById("answer-sheet")
var answer = undefined

document.querySelectorAll(".calc-input").forEach((button) => {
    button.addEventListener('click', e => {
        e.preventDefault()
        input = button.getAttribute("value")
        if (button.classList.contains("false-start") && solveSpread.value === "0" && answer === undefined) {
            return
        }
        else if (button.classList.contains("operator") && answer !== undefined) {
            solveSpread.value = answer
        }
        answer = undefined
        answerSpread.value = ""
        if (solveSpread.value.length <= 15) {
            solveSpread.value = (solveSpread.value === "0") ? (solveSpread.value = input === "." ? solveSpread.value + input: input) : solveSpread.value + input
        }
    })
})

document.getElementById("clear-spread").onclick = e => {
    e.preventDefault()
    if (answer !== undefined) {
        solveSpread.value = answer
        answerSpread.value = ""
        answer = undefined
    }
    else {
        solveSpread.value = (solveSpread.value === "0" || solveSpread.value.length === 1 ) ? "0" : solveSpread.value.substring(0, solveSpread.value.length - 1);
    }
}

document.getElementById("calculate").onclick = e => {
    e.preventDefault()
    evaluateExpression()            
}

document.getElementById("solve-sheet").onkeyup = e => {
    e.stopPropagation()
    if (e.keyCode === 13) {
        console.log("Test")
        evaluateExpression()
    }
}

document.getElementById("solve-sheet").onkeydown = e => {
    console.log(e)
    if (e.keyCode !== 46 && e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !== 39) {
        if (!("()+-*/%=".includes(e.key)) && isNaN(e.key)) {
            e.preventDefault()
        }
        else if (solveSpread.value.length > 15) {
            e.preventDefault()
        }
    }
}

function evaluateExpression() {
    var expression = solveSpread.value
    var cleanedExpression = expression.replace(/x/g, "*").replace(/÷/g,"/").replace(/%/g, "/100")
    console.log(cleanedExpression)
    try {
        var response = eval(cleanedExpression)
        answer = response.toString().length >= 7? response.toExponential(3): response.toString();
        answerSpread.value = answer
    } catch (e) {
        answerSpread.value = "NaN"
        answer = undefined
    }
}