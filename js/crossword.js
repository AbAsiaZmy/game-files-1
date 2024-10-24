var E = Object.defineProperty;
var S = (l, e, s) => e in l ? E(l, e, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: s
}) : l[e] = s;
var o = (l, e, s) => (S(l, typeof e != "symbol" ? e + "" : e, s), s);
const P = {
    by: "by",
    across: "Across",
    down: "Down",
    checkAnswers: "Check answers",
    solve: "Solve",
    close: "Close",
    letters: "letters",
    congrats1: "You did it!",
    congrats2: "You\u2019ve solved the puzzle.",
    checkBefore: "",
    checkOf: "of",
    checkAfter: "words are correct.",
    terms: "Terms of Use",
    makeYourOwn: "Make your own with the free EclipseCrossword app."
},
    B = {
        en: P,
    };
var d;
(function (s) {
    s[s.Across = 0] = "Across", s[s.Down = 1] = "Down"
})(d || (d = {}));
const C = "http://www.w3.org/2000/svg",
    _ = 20,
    b = 32,
    f = .5,
    W = b / 2,
    M = 26,
    A = 2,
    x = 14,
    y = .5,
    T = 1,
    L = 1.5,
    I = .75,
    z = (l, e, s) => {
        if (l.length === 0) return 0;
        let t = 837;
        const i = (l.charAt(0).trim().length === 0 ? 32 : l.charCodeAt(0)) * (71 * (e + 1) + s) % 1138,
            c = l.length;
        for (let r = 0; r < c; r++) {
            const n = l.charAt(r).trim().length === 0 ? 32 : l.charCodeAt(r);
            t = (t + n * (r % 5 + 1)) * i % 98784001
        }
        return t
    };
class H {
    constructor(e, s, t = void 0) {
        o(this, "_cells");
        o(this, "width");
        o(this, "height");
        o(this, "get");
        o(this, "set");
        this.width = e, this.height = s;
        const i = new Array(e * s);
        t !== void 0 && i.fill(t), this._cells = i, this.get = (c, r) => i[r * e + c], this.set = (c, r, n) => {
            i[r * e + c] = n
        }
    }
}
class D {
    constructor(e) {
        o(this, "_isInCtor");
        o(this, "_viewportHeight");
        o(this, "_isPhoneSize");
        o(this, "_isTouchMode");
        o(this, "_changeCallback");
        this._isInCtor = !0, window.visualViewport ? window.visualViewport.addEventListener("resize", this._onResize.bind(this)) : window.addEventListener("resize", this._onResize.bind(this)), this._changeCallback = e, this._onResize(), this._isInCtor = !1
    }
    _onResize() {
        const e = Math.min(window.innerWidth, document.documentElement.clientWidth, window.innerHeight, document.documentElement.clientHeight);
        this._isPhoneSize = e <= 600, this._isTouchMode = window.matchMedia("(pointer: coarse)").matches, window.visualViewport ? this._viewportHeight = window.visualViewport.height : this._viewportHeight = Math.min(window.innerHeight, document.documentElement.clientHeight), this._isInCtor || this._changeCallback()
    }
    get isPhoneSize() {
        return this._isPhoneSize
    }
    get isTouchMode() {
        return this._isTouchMode
    }
    get viewportHeight() {
        return this._viewportHeight
    }
}
class O {
    constructor(e) {
        o(this, "_words");
        o(this, "_grid");
        if (!e || e.version > 1 || !e.words || e.words.length === 0) throw new Error;
        e.words.sort((r, n) => r.y - n.y || r.x - n.x || r.direction - n.direction);
        let s = 0,
            t, i = 0,
            c = 0;
        for (let r = 0; r < e.words.length; r++) {
            const n = e.words[r];
            n.index = r, (!t || n.x !== t.x || n.y !== t.y) && s++, n.number = s;
            const a = n,
                u = a.x + (a.direction === 0 ? a.length : 1),
                m = a.y + (a.direction === 1 ? a.length : 1);
            u > i && (i = u), m > c && (c = m), t = n
        }
        this._words = e.words, this._grid = new H(i, c, void 0);
        for (let r = 0; r < this._words.length; r++) {
            const n = this._words[r];
            for (let a = 0; a < n.length; a++) {
                const u = n.x + (n.direction === 0 ? a : 0),
                    m = n.y + (n.direction === 1 ? a : 0);
                let h = this._grid.get(u, m);
                h ? (a === 0 && n.number && (h.number = n.number), n.direction === 0 ? h.across = n : h.down = n) : (h = {
                    number: a ? 0 : n.number
                }, n.direction === 0 ? h.across = n : h.down = n, this._grid.set(u, m, h))
            }
        }
        this.words.sort((r, n) => r.direction - n.direction || r.number - n.number);
        for (let r = 0; r < this._words.length; r++) {
            const n = this._words[r];
            n.index = r
        }
    }
    cellFor(e, s) {
        return this.grid.get(e.x + (e.direction === 0 ? s : 0), e.y + (e.direction === 1 ? s : 0))
    }
    get words() {
        return this._words
    }
    get grid() {
        return this._grid
    }
}
class V {
    constructor(e) {
        o(this, "_crossword");
        o(this, "_remainingSolves");
        o(this, "_remainingChecks");
        o(this, "_selectedWord");
        o(this, "_lastSelectedWord");
        o(this, "_lastSelectedWordIndex");
        o(this, "_selectedCharacter");
        o(this, "_isLocked");
        o(this, "_isPaneOpen");
        o(this, "_isDirty");
        o(this, "_root");
        o(this, "_solveButton");
        o(this, "_solveCounter");
        o(this, "_checkButton");
        o(this, "_checkBtn");
        o(this, "_checkCounter");
        o(this, "_congratsMessage");
        o(this, "_checkMessage");
        o(this, "_checkCorrectWords");
        o(this, "_checkWordCount");
        o(this, "_selectionBorderFront");
        o(this, "_selectionBorderBack");
        o(this, "_mobilePane");
        o(this, "_curtain");
        o(this, "_mobilePaneBackButton");
        o(this, "_mobilePaneCheckButton");
        o(this, "_mobilePaneCheckCounter");
        o(this, "_mobilePaneClue");
        o(this, "_mobilePaneEntryBox");
        o(this, "_mobilePaneLetterCount");
        o(this, "_mobilePaneLetterCountArea");
        o(this, "_mobilePaneSolveButton");
        o(this, "_mobilePaneSolveCounter");
        o(this, "_mobilePaneCloseClueButton");
        o(this, "_device");
        o(this, "openMobilePane", () => {
            this.setMobilePaneOpenedCore(!0)
        });
        o(this, "closeMobilePane", () => {
            this.setMobilePaneOpenedCore(!1)
        });
        this._crossword = new O(e), this._remainingSolves = e.solves === !0 ? Infinity : e.solves || 0, this._remainingChecks = e.checks === !0 ? Infinity : e.checks || 0, this.localize(e.shareID), this._root = document.getElementById("root"), this.takeClues(), this.takeButtons(), this.takeMobilePane(), document.addEventListener("keydown", this.keyDown.bind(this)), this.updateSolveCounter(), this.updateCheckCounter(), this.generateSVG(), document.addEventListener("scroll", () => {
            document.documentElement.scrollTop > 1 && (document.documentElement.scrollTop = 0)
        }), window.addEventListener("beforeunload", this.onBeforeUnload.bind(this)), this._device = new D(this.onSizeChanged.bind(this)), this.onSizeChanged()
    }


    localize(e) {
        let s = document.documentElement.lang || "en";
        if (!(s in B)) {
            const i = s.split("-")[0];
            i in B ? s = i : (console.warn(`Unknown language ${s}; falling back to English.`), s = "en")
        }
        const t = B[s];
        document.querySelectorAll("[data-locid]").forEach(i => {
            const c = i.dataset.locid.valueOf(),
                r = t[c];
            c === "makeYourOwn" ? i.innerHTML = r.replace("EclipseCrossword", `<a href="https://www.eclipsecrossword.com/share/back?from-share=${e}" target="_blank">EclipseCrossword</a>`) : r !== void 0 ? i.innerText = r : console.error(`Missing localization (${s}): ${c}`)
        })
    }
    takeClues() {
        let e = 0;
        const s = document.getElementById("across-clues").getElementsByTagName("li");
        let t = 0;
        const i = document.getElementById("down-clues").getElementsByTagName("li");
        for (const c of this._crossword.words) c.direction === 0 ? c.clueUI = s[e++] : c.clueUI = i[t++], c.clueUI.addEventListener("click", this.selectWord.bind(this, c, 0))
    }
    takeButtons() {
        this._solveButton = document.getElementById("solve-button"), this._solveButton.addEventListener("click", this.solveWord.bind(this)), this._solveCounter = document.getElementById("solves-left"), this._checkButton = document.getElementById("check-button"), this._checkButton.addEventListener("click", this.checkPuzzle.bind(this)), this._checkBtn = d, this._checkCounter = document.getElementById("checks-left"), this._congratsMessage = document.getElementById("congrats-message"), this._checkMessage = document.getElementById("check-message"), this._checkCorrectWords = document.getElementById("check-correct-words"), this._checkWordCount = document.getElementById("check-word-count")
    }
    takeMobilePane() {
        this._curtain = document.getElementById("curtain"), this._curtain.addEventListener("click", this.onCloseMobilePaneClick.bind(this)), this._mobilePane = document.getElementById("mobile-pane"), this._mobilePane.addEventListener("click", this.openMobilePane.bind(this)), this._mobilePaneBackButton = document.getElementById("mobile-pane-back"), this._mobilePaneBackButton.addEventListener("click", this.onCloseMobilePaneClick.bind(this)), this._mobilePaneCheckButton = document.getElementById("check-button-mobile"), this._mobilePaneCheckButton.addEventListener("click", this.checkPuzzle.bind(this)), this._mobilePaneCheckCounter = document.getElementById("checks-left-mobile"), this._mobilePaneClue = document.getElementById("clue-mobile"), this._mobilePaneEntryBox = document.getElementById("entry-box-mobile"), this._mobilePaneLetterCountArea = document.getElementById("letter-count-area-mobile"), this._mobilePaneLetterCountArea.addEventListener("animationend", () => this._mobilePaneLetterCountArea.classList.remove("error")), this._mobilePaneLetterCount = document.getElementById("letter-count-mobile"), this._mobilePaneSolveButton = document.getElementById("solve-button-mobile"), this._mobilePaneSolveButton.addEventListener("click", this.solveWord.bind(this)), this._mobilePaneSolveCounter = document.getElementById("solves-left-mobile"), this._mobilePaneCloseClueButton = document.getElementById("close-clue-button-mobile"), this._mobilePaneCloseClueButton.addEventListener("click", this.onCloseMobilePaneClick.bind(this))
    }
    generateSVG() {
        const e = this._crossword.grid,
            s = (_ + f) * 2 + b * e.width,
            t = (_ + f) * 2 + b * e.height,
            i = document.getElementById("crossword-svg-container"),
            c = document.createElementNS(C, "svg");
        c.setAttribute("width", `${s}`), c.setAttribute("height", `${t}`), c.innerHTML = "<use href=#grid filter=url(#shadow) opacity=0.1 x=1 y=1 /><g id=grid></g><rect id=selection-border-back x=50% y=50% width=0 height=0 filter=url(#glow) class=selection-border-back opacity=0 /><rect id=selection-border-front x=50% y=50% width=0 height=0 class=selection-border-front opacity=0 /><defs><filter id=glow x=-20% y=-20% width=140% height=140%><feGaussianBlur stdDeviation=3 result=blur /><feComposite operator=out in=blur in2=SourceAlpha /></filter><filter id=shadow><feGaussianBlur in=SourceAlpha stdDeviation=3 /></filter></defs>", i.appendChild(c);
        const r = document.getElementById("shadow");
        r.setAttribute("x", `${-_}`), r.setAttribute("y", `${-_}`), r.setAttribute("width", `${s}`), r.setAttribute("height", `${t}`);
        const n = document.getElementById("grid");
        let a = _ + f;
        for (let u = 0; u < e.height; u++) {
            let m = _ + f;
            for (let h = 0; h < e.width; h++) {
                const w = e.get(h, u);
                if (w) {
                    const p = document.createElementNS(C, "rect");
                    p.setAttribute("x", `${m}`), p.setAttribute("y", `${a}`), p.setAttribute("class", "cell"), n.appendChild(p), p.addEventListener("click", this.selectWordAt.bind(this, h, u));
                    const k = document.createElementNS(C, "text");
                    k.setAttribute("x", `${m + W}`), k.setAttribute("y", `${a + M}`), k.setAttribute("class", "letter"), n.appendChild(k);
                    let g;
                    w.number && (g = document.createElementNS(C, "text"), g.setAttribute("x", `${m + A}`), g.setAttribute("y", `${a + x}`), g.setAttribute("class", "number"), g.textContent = `${w.number}`, n.appendChild(g)), w.ui = {
                        rect: p,
                        text: k,
                        number: g
                    }
                }
                m += b
            }
            a += b
        }
        this._selectionBorderFront = document.getElementById("selection-border-front"), this._selectionBorderBack = document.getElementById("selection-border-back")
    }
    selectWordAt(e, s) {
        const t = this._crossword.grid.get(e, s);
        if (!!t)
            if (this._selectedWord && t.across === this._selectedWord) {
                const i = e - this._selectedWord.x;
                (this._device.isTouchMode || i === this._selectedCharacter) && t.down ? this.selectWord(t.down, s - t.down.y) : this._device.isTouchMode || this.selectCharacter(i)
            } else if (this._selectedWord && t.down === this._selectedWord) {
                const i = s - this._selectedWord.y;
                (this._device.isTouchMode || i === this._selectedCharacter) && t.across ? this.selectWord(t.across, e - t.across.x) : this._device.isTouchMode || this.selectCharacter(i)
            } else t.across && t.down ? !this._lastSelectedWord || this._lastSelectedWord.direction === 0 ? this.selectWord(t.across) : this.selectWord(t.down) : t.across ? this.selectWord(t.across) : this.selectWord(t.down)
    }
    deselect() {
        const e = this._selectedWord;
        if (!!e) {
            this._selectedWord = void 0, this._selectedCharacter = void 0;
            for (let s = 0; s < e.length; s++) {
                const t = this._crossword.cellFor(e, s);
                t.ui.rect.classList.remove("selection", "cursor"), t.ui.text.classList.remove("selection", "cursor"), t.ui.number && t.ui.number.classList.remove("selection", "cursor")
            }
            this._selectionBorderFront.setAttribute("opacity", "0"), this._selectionBorderFront.setAttribute("x", "50%"), this._selectionBorderFront.setAttribute("y", "50%"), this._selectionBorderFront.setAttribute("width", "0"), this._selectionBorderFront.setAttribute("height", "0"), this._selectionBorderBack.setAttribute("opacity", "0"), this._selectionBorderBack.setAttribute("x", "50%"), this._selectionBorderBack.setAttribute("y", "50%"), this._selectionBorderBack.setAttribute("width", "0"), this._selectionBorderBack.setAttribute("height", "0"), e.clueUI.classList.remove("selection"), this._mobilePaneEntryBox.value = "", this.updateMobilePane(), this.updateSolveCounter()
        }
    }
    selectWord(e, s = 0) {
        if (this._selectedWord === e) return;
        this.deselect();
        for (let n = 0; n < e.length; n++) this._crossword.cellFor(e, n).ui.rect.classList.add("selection");
        const t = _ + f + b * e.x,
            i = b * (e.direction === 0 ? e.length : 1),
            c = _ + f + b * e.y,
            r = b * (e.direction === 1 ? e.length : 1);
        this._selectionBorderFront.setAttribute("x", `${t - y}`), this._selectionBorderFront.setAttribute("y", `${c - y}`), this._selectionBorderFront.setAttribute("width", `${i + y * 2}`), this._selectionBorderFront.setAttribute("height", `${r + y * 2}`), this._selectionBorderFront.setAttribute("opacity", `${T}`), this._selectionBorderBack.setAttribute("x", `${t - L}`), this._selectionBorderBack.setAttribute("y", `${c - L}`), this._selectionBorderBack.setAttribute("width", `${i + L * 2}`), this._selectionBorderBack.setAttribute("height", `${r + L * 2}`), this._selectionBorderBack.setAttribute("opacity", `${I}`), this._crossword.cellFor(e, e.length - 1).ui.rect.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        }), this._crossword.cellFor(e, 0).ui.rect.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        }), e.clueUI.classList.add("selection"), e.clueUI.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        }), this._selectedWord = e, this._lastSelectedWord = e, this._lastSelectedWordIndex = e.index, this.updateMobilePane(), this.updateSolveCounter(), (this._device.isTouchMode || this._device.isPhoneSize) && this.openMobilePane(), this._device.isTouchMode || this.selectCharacter(s), this._checkMessage.classList.remove("open")
    }
    selectNextWord() {
        this.selectWord(this._crossword.words[this._lastSelectedWordIndex === void 0 || this._lastSelectedWordIndex === this._crossword.words.length - 1 ? 0 : this._lastSelectedWordIndex + 1])
    }
    selectPrevWord() {
        this.selectWord(this._crossword.words[this._lastSelectedWordIndex === void 0 ? 0 : this._lastSelectedWordIndex === 0 ? this._crossword.words.length - 1 : this._lastSelectedWordIndex - 1])
    }
    selectCharacter(e) {
        if (this._isLocked || !this._selectedWord || this._selectedCharacter === e) return;
        const s = this._selectedWord;
        if (this._selectedCharacter !== void 0) {
            const t = this._crossword.cellFor(s, this._selectedCharacter);
            t.ui.rect.classList.remove("cursor"), t.ui.text.classList.remove("cursor"), t.ui.number && t.ui.number.classList.remove("cursor")
        } {
            const t = this._crossword.cellFor(s, e);
            t.ui.rect.classList.add("cursor"), t.ui.text.classList.add("cursor"), t.ui.number && t.ui.number.classList.add("cursor")
        }
        this._selectedCharacter = e
    }
    selectNextCharacter() {
        !this._selectedWord || this.selectCharacter((this._selectedCharacter + 1) % this._selectedWord.length)
    }
    selectPrevCharacter() {
        !this._selectedWord || this.selectCharacter(this._selectedCharacter ? this._selectedCharacter - 1 : this._selectedWord.length - 1)
    }
    typeCharacter(e) {
        if (this._isLocked) return;
        const s = this._selectedCharacter;
        if (s === void 0) return;
        const t = this._selectedWord;
        if (!t) return;
        e && e.trim().length === 0 && (e = null);
        const i = this._crossword.cellFor(t, s);
        i.isLocked || (i.contents = e !== null ? e : void 0, i.ui && (i.ui.rect.classList.remove("error"), i.ui.text.classList.remove("error"), i.ui.text.textContent = e)), this._isDirty = !0, this.setWordErrorState(t, !1)
    }
    setWordErrorState(e, s) {
        for (let t = 0; t < e.length; t++) {
            const i = this._crossword.cellFor(e, t);
            !i.isLocked && i.ui && (s ? (i.ui.rect.classList.add("error"), i.ui.text.classList.add("error")) : (i.ui.rect.classList.remove("error"), i.ui.text.classList.remove("error")))
        }
    }
    solveWord(e) {
        if (e && e.stopPropagation(), !this._selectedWord || !this._remainingSolves) return;
        const s = this._selectedWord;
        !s.word || this.enterWord(s.word, !0) === v.Success && (this._remainingSolves--, this.updateSolveCounter())
    }
    enterWord(e, s = !1) {
        if (this._isLocked) return v.Locked;
        if (!this._selectedWord) return v.NoWord;
        const t = this._selectedWord;
        if (e = e.trim().toUpperCase(), t.length !== e.length) return v.WrongLength;
        for (let i = 0; i < e.length; i++) {
            this._selectedCharacter = i, this.typeCharacter(e[i]);
            const c = this._crossword.cellFor(t, i);
            c.isLocked || s && (c.isLocked = !0, c.ui && (c.ui.rect.classList.add("solved"), c.ui.text.classList.add("solved")))
        }
        return this.deselect(), this.closeMobilePane(), v.Success
    }
    updateSolveCounter() {
        this._solveButton.style.display = !this._remainingSolves || this.areAllLettersInSelectedWordLocked() ? "none" : "", this._solveCounter.innerText = this._remainingSolves === 0 || this._remainingSolves === Infinity ? "" : `(${this._remainingSolves})`, this._mobilePaneSolveButton.style.display = !this._remainingSolves || this.areAllLettersInSelectedWordLocked() ? "none" : "", this._mobilePaneSolveCounter.innerText = this._remainingSolves === 0 || this._remainingSolves === Infinity ? "" : `(${this._remainingSolves})`
    }
    isWordCorrect(e) {
        if (e.word) {
            const s = e.word;
            for (let t = 0; t < e.length; t++) {
                const i = s[t],
                    c = this._crossword.cellFor(e, t).contents;
                if (i.trim().length === 0) {
                    if (c !== void 0) return !1
                } else if (c !== i) return !1
            }
            return !0
        } else {
            let s = "";
            for (let t = 0; t < e.length; t++) {
                const i = this._crossword.cellFor(e, t).contents;
                s += i !== void 0 && i.length ? i : " "
            }
            return z(s, e.x, e.y) === e.hash
        }
    }
    checkPuzzle(e) {
        if (e && e.stopPropagation(), !this._remainingChecks) return;
        this.deselect(), this.closeMobilePane(), this._remainingChecks--;
        let s = 0;
        for (let i = 0; i < this._crossword.words.length; i++) {
            const c = this._crossword.words[i];
            this.isWordCorrect(c) ? s++ : this.setWordErrorState(c, !0)
        }
        const t = s === this._crossword.words.length;

        if (t) {
            console.log("All words are correct!");
            this._remainingChecks = 0;
            Swal.fire({
                title: 'Congratulations!',
                text: `You have found all the words!`,
                confirmButtonText: 'OK',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '../index.html';
                }
            });
        } else {
            console.log("Not all words are correct!");
            this._checkCorrectWords.innerText = s.toString();
            this._checkWordCount.innerText = this._crossword.words.length.toString();
            Swal.fire({
                title: 'Not all words are correct!',
                text: `You have ${s} of ${this._crossword.words.length} words correct.`,
                confirmButtonText: 'OK',
            });
        }

        if (t || !this._remainingChecks) {
            this._isLocked = true;
            this._isDirty = false;
            this._remainingSolves = 0;
            this.updateSolveCounter();
            this.updateMobilePane();
        }

        this.updateCheckCounter();
    }
    updateCheckCounter() {
        this._remainingChecks || (this._checkButton.style.display = "none", this._mobilePaneCheckButton.style.display = "none"), this._checkCounter.innerText = this._remainingChecks === 0 || this._remainingChecks === Infinity ? "" : `(${this._remainingChecks})`, this._mobilePaneCheckCounter.innerText = this._remainingChecks === 0 || this._remainingChecks === Infinity ? "" : `(${this._remainingChecks})`
    }
    keyDown(e) {
        if (!(!e || e.defaultPrevented || e.keyCode === 229)) {
            switch (e.key) {
                case "Down":
                case "ArrowDown":
                    this.selectNextWord(), e.preventDefault();
                    return;
                case "Enter":
                    this._isPaneOpen && this._device.isTouchMode ? this._selectedWord && this.submitAnswer() : this.selectNextWord(), e.preventDefault();
                    return;
                case "Up":
                case "ArrowUp":
                    this.selectPrevWord(), e.preventDefault();
                    return;
                case "Tab":
                    e.shiftKey ? this.selectPrevWord() : this.selectNextWord(), e.preventDefault();
                    return;
                case "Home":
                    this._device.isTouchMode || (this.selectCharacter(0), e.preventDefault());
                    return;
                case "Left":
                case "ArrowLeft":
                    this._device.isTouchMode || (this.selectPrevCharacter(), e.preventDefault());
                    return;
                case "Backspace":
                    this._device.isTouchMode || (this.typeCharacter(null), this.selectPrevCharacter(), e.preventDefault());
                    break;
                case "Right":
                case "ArrowRight":
                    this._device.isTouchMode || (this.selectNextCharacter(), e.preventDefault());
                    return;
                case "Delete":
                    this._device.isTouchMode || (this.typeCharacter(null), e.preventDefault());
                    break;
                case "Esc":
                case "Escape":
                    this.deselect(), this.closeMobilePane(), e.preventDefault();
                    return
            }
            if (!this._isLocked && !this._device.isTouchMode && !e.isComposing && e.key && !e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
                this.typeCharacter(e.key.toUpperCase()), this.selectNextCharacter(), e.preventDefault();
                return
            }
        }
    }
    setMobilePaneOpenedCore(e) {
        e !== this._isPaneOpen && (e == null && (e = !this._isPaneOpen), this._isPaneOpen = e, e || (this._mobilePaneEntryBox.blur(), this.deselect()), e && this._selectedWord && window.requestAnimationFrame(() => this._mobilePaneEntryBox.focus({
            preventScroll: !0
        })), this.updateMobilePane())
    }
    onCloseMobilePaneClick(e) {
        this.submitAnswer(!0), this.closeMobilePane(), e.stopPropagation()
    }
    updateMobilePane() {
        this._isPaneOpen ? (this._mobilePane.classList.add("open"), this._selectedWord ? (this._mobilePane.classList.add("has-selection"), this._curtain.classList.remove("open"), this._mobilePaneClue.innerHTML = this._selectedWord.clueUI.innerHTML, this._mobilePaneLetterCount.innerText = this._selectedWord.length.toString(), this._mobilePaneEntryBox.placeholder = "\u25AA".repeat(this._selectedWord.length)) : (this._mobilePane.classList.remove("has-selection"), this._curtain.classList.add("open"))) : (this._mobilePane.classList.remove("open"), this._mobilePane.classList.remove("has-selection"), this._curtain.classList.remove("open")), !this._isLocked && this._device.isTouchMode && !this.areAllLettersInSelectedWordLocked() ? (this._mobilePaneEntryBox.style.removeProperty("display"), this._solveButton.style.removeProperty("display")) : (this._mobilePaneEntryBox.style.display = "none", this._solveButton.style.display = "none")
    }
    submitAnswer(e = !1) {
        const s = this._mobilePaneEntryBox.value;
        if (s && s.length) {
            const t = this.enterWord(s);
            if (!e && t !== v.Success) {
                t === v.WrongLength && this._mobilePaneLetterCountArea.classList.add("error");
                return
            }
        }
        this.closeMobilePane(), this.deselect()
    }
    areAllLettersInSelectedWordLocked() {
        if (this._isLocked) return !0;
        const e = this._selectedWord;
        if (!e) return !0;
        for (let s = 0; s < e.length; s++)
            if (!this._crossword.cellFor(e, s).isLocked) return !1;
        return !0
    }
    onBeforeUnload(e) {
        this._isDirty && (e.preventDefault(), e.returnValue = "")
    }
    onSizeChanged() {
        this._device.isPhoneSize ? document.documentElement.classList.add("is-phone") : (document.documentElement.classList.remove("is-phone"), this.closeMobilePane()), this._device.isTouchMode ? document.documentElement.classList.add("is-touch") : document.documentElement.classList.remove("is-touch"), document.body.style.maxHeight = `${this._device.viewportHeight}px`, this.updateMobilePane()
    }
}
var v;
(function (i) {
    i[i.Success = 1] = "Success", i[i.NoWord = 2] = "NoWord", i[i.WrongLength = 3] = "WrongLength", i[i.Locked = 4] = "Locked"
})(v || (v = {}));
const F = l => {
    new V(typeof l == "string" ? JSON.parse(l) : l)
};