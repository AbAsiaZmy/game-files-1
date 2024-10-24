let wordsearch = document.getElementById('wordsearch');
let letters = document.querySelectorAll('td');
let wordBoxs = document.querySelectorAll('.wordsearch-words>ul>li');
let words = Array.from(document.querySelectorAll('.wordsearch-words>ul>li')).map((word) => word.textContent).map((word) => word.split('').sort().join(''));
let score = document.getElementById('score');
let notice = document.querySelector('.notice');
let tempwords;
let tempwordsIndex = [];
let cnt = 0;

const color = ['RGB(173, 216, 230)', 'RGB(144, 238, 144)', 'RGB(255, 182, 193)', 'RGB(221, 160, 221)', 'RGB(255, 255, 224)', 'RGB(255, 200, 124)', 'RGB(152, 255, 152)', 'RGB(255, 228, 225)', 'RGB(211, 211, 211)', 'RGB(255, 253, 208)', 'RGB(173, 255, 47)', 'RGB(240, 128, 128)'];

console.log(letters);
console.log(words);
console.log(wordBoxs);

window.onload = function () {
    Swal.fire({
        title: 'Wordsearch',
        text: `Search up, down, forward, backwards and diagonally to find all the words!`,
        confirmButtonText: 'START',
    });
};

letters.forEach((td, index) => {
    td.addEventListener('click', function () {
        if (td.classList.contains("wordsearch-selected")) {
            td.classList.remove("wordsearch-selected");
            console.log(td.textContent);
            tempwordsIndex = tempwordsIndex.filter((item) => item !== index);
            tempwords = transformWord();
            checkWord();
            console.log(tempwords);
        } else {
            td.classList.add("wordsearch-selected");
            console.log(td.textContent);
            tempwordsIndex.push(index);
            tempwords = transformWord();
            checkWord();
            console.log(tempwords);
        }
    });
});

function transformWord() {
    tempwords = '';
    tempwordsIndex.forEach((index) => {
        tempwords += letters[index].textContent;
    });
    return tempwords;
}

function checkWord() {
    rightWordIndexs.forEach((rightWordIndex) => {
        if (rightWordIndex.every((index) => tempwordsIndex.includes(index)) &&
            tempwordsIndex.every((index) => rightWordIndex.includes(index))) {
            tempwords = transformWord();
            console.log(tempwords);
            let tempwords1 = tempwords.split('').sort().join('');
            let rightWordIndex = words.findIndex((word) => word === tempwords1);
            let color = getColor();
            wordBoxs[rightWordIndex].style.backgroundColor = color;
            console.log(tempwords1);
            tempwordsIndex.forEach((index) => {
                letters[index].classList.remove('wordsearch-selected');
                letters[index].style.backgroundColor = color;
            });
            rightWordIndexs = rightWordIndexs.filter((item) => item !== rightWordIndex);
            cnt++;
            score.textContent = cnt
            if (cnt === 10) showNotice();
            console.log(cnt);
            console.log(tempwords);
            tempwordsIndex = [];
        }
    });
}

function getColor() {
    return color[Math.floor(Math.random() * color.length)];
}

function showNotice() {
    Swal.fire({
        title: 'Congratulations!',
        text: `You have found all the words!`,
        confirmButtonText: 'OK',
    }).then((result) => {
        if (result.isConfirmed) {
            location.href = '../index.html';
        }
    });
}
let rightWordIndexs = [
    [0, 1, 2, 3, 4, 5, 6],
    [7, 8, 9],
    [10, 20, 30, 40, 50, 60],
    [11, 12, 13, 14, 15, 16, 17, 18],
    [23, 24, 25, 26, 27, 28, 29],
    [34, 35, 36, 37, 38, 39],
    [41, 42, 43, 44, 45, 46, 47, 48],
    [52, 53, 54, 55, 56, 57, 58],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    [80, 81, 82, 83, 84, 85, 86, 87, 88],
    [92, 93, 94, 95, 96, 97, 98, 99],
]