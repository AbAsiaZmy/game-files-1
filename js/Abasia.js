console.log(QuestionInfo);

const questions = document.querySelector('.question');
const options = document.querySelectorAll('.option-s');
const answer = document.querySelector('.answer');
const explanation = document.querySelector('.explanation');
const submitBtn = document.querySelector('#Submit');
const previous = document.querySelector('#previous');
const progress = document.querySelector('#progressBar-aba');

let currentQuestion = 0;

function loadQuestion() {
    const q = QuestionInfo[currentQuestion];
    questions.textContent = q.question;
    for (let i = 0; i < options.length; i++) {
        options[i].children[1].textContent = '';
    }
    q.option.forEach((option, index) => {
        if (!option) return;
        let currentlyL = String.fromCharCode(65 + index);
        let optionText = (currentlyL + ". " + option);
        if (q.optionIsImage) {
            let img = document.createElement('img');
            img.src = option;
            img.width = 100;
            img.height = 100;
            options[index].children[1].textContent = currentlyL + ". ";
            options[index].children[1].appendChild(img);
            return;
        }
        options[index].children[1].textContent = optionText;
    });
    progress.value = currentQuestion + 1;
}

function checkAnswer(option) {
    let q = QuestionInfo[currentQuestion];
    console.log(option, q.answer);
    console.log(option === q.answer);
    if (option == q.answer) {
        Swal.fire({
            title: 'Correct!',
            text: q.explanation,
            icon: 'success',
            confirmButtonText: 'Next',
            customClass: {
                title: 'correct-title'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                nextQuestion();
            }
        });
    } else {
        Swal.fire({
            title: 'Incorrect!',
            text: q.explanation,
            icon: 'error',
            confirmButtonText: 'Next',
            customClass: {
                title: 'incorrect-title'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                nextQuestion();
            }
        });
    }
    QuestionInfo[currentQuestion].answered = true;
    console.log(option);
    QuestionInfo[currentQuestion].selected = option;
    if (currentQuestion === QuestionInfo.length - 1) {
        submitBtn.textContent = 'Finish';
    }
}

function checkAnswerWithImage(option) {
    let q = QuestionInfo[currentQuestion];
    if (option == 'A') {
        Swal.fire({
            title: 'Correct!',
            text: q.explanation,
            icon: 'success',
            confirmButtonText: 'Next',
            customClass: {
                title: 'correct-title'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                nextQuestion();
            }
        });
    } else {
        Swal.fire({
            title: 'Incorrect!',
            text: q.explanation,
            icon: 'error',
            confirmButtonText: 'Next',
            customClass: {
                title: 'incorrect-title'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                nextQuestion();
            }
        });
    }
    const radios = document.querySelectorAll('input[name="option"]');
    radios.forEach(radio => {
        radio.disabled = true;
    });
    QuestionInfo[currentQuestion].answered = true;
    console.log(option);
    QuestionInfo[currentQuestion].selected = option;
}

function nextQuestion() {
    if (currentQuestion < QuestionInfo.length - 1) {
        currentQuestion++;
        loadQuestion();
        const radios = document.querySelectorAll('input[name="option"]');
        radios.forEach(radio => {
            radio.checked = false;
            radio.disabled = false; // 重新启用 radio 按钮
        });
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
        if (QuestionInfo[currentQuestion].answered) {
            const radios = document.querySelectorAll('input[name="option"]');
            if (QuestionInfo[currentQuestion].optionIsImage) {
                radios.forEach(radio => {
                    radio.disabled = true;
                    console.log(radio.nextElementSibling.textContent.replace(/[ABCD]\./, '').trim());
                    if (radio.value === QuestionInfo[currentQuestion].selected) {
                        radio.checked = true;
                    }
                });

                checkAnswerWithImage(QuestionInfo[currentQuestion].selected);
                console.log(QuestionInfo[currentQuestion].selected);
                return;
            }
            radios.forEach(radio => {
                radio.disabled = true;
                if (radio.nextElementSibling.textContent.replace(/[ABCD]\./, '').trim() === QuestionInfo[currentQuestion].selected) {
                    radio.checked = true;
                }
            })
            checkAnswer(QuestionInfo[currentQuestion].selected);
            console.log(QuestionInfo[currentQuestion].selected);
            return;
        }
    }
}

loadQuestion();

submitBtn.addEventListener('click', () => {
    if (submitBtn.textContent === 'Submit') {
        if (document.querySelector('input[name="option"]:checked')) {
            console.log(document.querySelector('input[name="option"]:checked+label>img'));
            if (QuestionInfo[currentQuestion].optionIsImage) {
                let option = document.querySelector('input[type="radio"]:checked').value;
                checkAnswerWithImage(option);
                console.log(option);

                return;
            }
            let option = document.querySelector('input[type="radio"]:checked+label').textContent;
            option = option.replace(/[ABCD]\./, '').trim();
            console.log(option);
            checkAnswer(option);
            if (submitBtn.textContent === 'Finish') {
                return;
            }
        }
    } if (submitBtn.textContent === 'Finish') {
        Swal.fire({
            title: 'Congratulations! You have completed the part!',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Finish',
            customClass: {
                title: 'finish-title'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '../index.html';
            }
        });
    }
});