import {
    d as C,
    o as t,
    c as l,
    F as k,
    r as z,
    a as p,
    b as x,
    n as j,
    t as f,
    p as S,
    e as L,
    f as m,
    g as K,
    h as H,
    i as $,
    w as U,
    T as W,
    j as Z,
    k as A,
    l as J
} from "./vendor.206afc82.js";
const Q = function () {
    const u = document.createElement("link").relList;
    if (u && u.supports && u.supports("modulepreload"))
        return;
    for (const e of document.querySelectorAll('link[rel="modulepreload"]'))
        i(e);
    new MutationObserver(e => {
        for (const r of e)
            if (r.type === "childList")
                for (const c of r.addedNodes)
                    c.tagName === "LINK" && c.rel === "modulepreload" && i(c)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });
    function d(e) {
        const r = {};
        return e.integrity && (r.integrity = e.integrity), e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy), e.crossorigin === "use-credentials" ? r.credentials = "include" : e.crossorigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
    }
    function i(e) {
        if (e.ep)
            return;
        e.ep = !0;
        const r = d(e);
        fetch(e.href, r)
    }
};
Q();
const B = " Using word of the day instead.";
function X() {
    if (location.search)
        try {
            const e = atob(location.search.slice(1));
            if (e.length !== 5)
                alert(`Incorrect word length from encoded query. ${B}`);
            else
                return e
        } catch {
            alert(`Malformed encoded word query. ${B}`)
        }
    const s = new Date,
        u = new Date(2022, 0, 0),
        d = Number(s) - Number(u);
    let i = Math.floor(d / (1e3 * 60 * 60 * 24));
    for (; i > q.length;)
        i -= q.length;
    return q[i]
}
const q = ["cigar", "zygal", "zygon", "zymes", "zymic"],
    ee = [...q, ...Y];
var O = (s, u) => {
    const d = s.__vccOpts || s;
    for (const [i, e] of u)
        d[i] = e;
    return d
};
const se = s => (S("data-v-5e04d106"), s = s(), L(), s),
    ae = {
        id: "keyboard"
    },
    oe = {
        class: "row"
    },
    re = {
        key: 0,
        class: "spacer"
    },
    ie = ["onClick"],
    te = {
        key: 0
    },
    le = {
        key: 1,
        xmlns: "http://www.w3.org/2000/svg",
        height: "24",
        viewBox: "0 0 24 24",
        width: "24"
    },
    ne = se(() => p("path", {
        fill: "currentColor",
        d: "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
    }, null, -1)),
    ue = [ne],
    de = {
        key: 1,
        class: "spacer"
    },
    ce = C({
        props: {
            letterStates: null
        },
        emits: ["key"],
        setup(s) {
            const u = ["qwertyuiop".split(""), "asdfghjkl".split(""), ["Enter", ..."zxcvbnm".split(""), "Backspace"]];
            return (d, i) => (t(), l("div", ae, [(t(), l(k, null, z(u, (e, r) => p("div", oe, [r === 1 ? (t(), l("div", re)) : x("", !0), (t(!0), l(k, null, z(e, c => (t(), l("button", {
                class: j([c.length > 1 && "big", s.letterStates[c]]),
                onClick: w => d.$emit("key", c)
            }, [c !== "Backspace" ? (t(), l("span", te, f(c), 1)) : (t(), l("svg", le, ue))], 10, ie))), 256)), r === 1 ? (t(), l("div", de)) : x("", !0)])), 64))]))
        }
    });
var ye = O(ce, [["__scopeId", "data-v-5e04d106"]]),
    y;
(function (s) {
    s[s.INITIAL = 0] = "INITIAL",
        s.CORRECT = "correct",
        s.PRESENT = "present",
        s.ABSENT = "absent"
})(y || (y = {}));
const pe = s => (S("data-v-08507b68"), s = s(), L(), s),
    me = {
        key: 0,
        class: "message"
    },
    he = {
        key: 0
    },
        te2 = {
          key: 1,
          class: 'timer'
        },
    ge = pe(() => p("header", null, [p("a", {
        id: "source-link",
        href: "https://github.com/yyx990803/vue-wordle",
        target: "_blank"
    }, "Leaderboard")], -1)),
    be = {
        id: "board"
    },
    ke = C({
        setup(s) {
            const u = X(),
                d = m(Array.from({
                    length: 6
                }, () => Array.from({
                    length: 5
                }, () => ({
                    letter: "",
                    state: y.INITIAL
                }))));
            let i = m(0);
            const e = K(() => d.value[i.value]);
            let r = m(""),
                c = m(""),
                w = m(-1),
                T = m(!1);
            const h = m({});
            let _ = !0;
            const I = a => N(a.key);
            window.addEventListener("keyup", I),
                H(() => {
                    window.removeEventListener("keyup", I)
                });
            // Add a start time to the game
            const startTime = m(null);
             const elapsedTime = m(0);
              let timerInterval = null;


              function startTimer() {
                  if(!timerInterval){
                      timerInterval = setInterval(() => {
                          if(startTime.value) {
                           elapsedTime.value = Math.floor((Date.now() - startTime.value) / 1000);
                            }
                      }, 1000);
                  }
              }

              function stopTimer() {
                  clearInterval(timerInterval);
                  timerInterval = null;
              }


            function N(a) {
                if(!startTime.value) {
                    startTime.value = Date.now()
                    startTimer();
                }
                !_ || (/^[a-zA-Z]$/.test(a) ? P(a.toLowerCase()) : a === "Backspace" ? M() : a === "Enter" && V())
            }
            function P(a) {
                for (const n of e.value)
                    if (!n.letter) {
                        n.letter = a;
                        break
                    }
            }
            function M() {
                for (const a of [...e.value].reverse())
                    if (a.letter) {
                        a.letter = "";
                        break
                    }
            }
             // New score calculation function
            function calculateScore(rows, timeInSeconds) {
                let score = 1000; // Base score

                // Deduct points for each guess
                score -= (rows - 1) * 100;

                // Deduct points for time taken. More time means lower score
                score -= Math.floor(timeInSeconds / 5) * 20;
                return Math.max(0, score); // Ensure score is not negative.
            }


            function V() {
                if (e.value.every(a => a.letter)) {
                    const a = e.value.map(o => o.letter).join("");
                    if (!ee.includes(a) && a !== u) {
                        R(),
                            v("Not in word list");
                        return
                    }
                    const n = u.split("");
                    e.value.forEach((o, g) => {
                        n[g] === o.letter && (o.state = h.value[o.letter] = y.CORRECT, n[g] = null)
                    }),
                        e.value.forEach(o => {
                            !o.state && n.includes(o.letter) && (o.state = y.PRESENT, n[n.indexOf(o.letter)] = null, h.value[o.letter] || (h.value[o.letter] = y.PRESENT))
                        }),
                        e.value.forEach(o => {
                            o.state || (o.state = y.ABSENT, h.value[o.letter] || (h.value[o.letter] = y.ABSENT))
                        }),
                        _ = !1,
                        e.value.every(o => o.state === y.CORRECT) ? setTimeout(() => {
                            c.value = F();
                            // Calculate score only on a win
                            const endTime = Date.now();
                            const timeTakenInSeconds = (endTime - startTime.value) / 1000;
                            const score = calculateScore(i.value + 1, timeTakenInSeconds);
                             v(["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"][i.value], -1)
                              c.value += `\nScore: ${score}`
                             stopTimer();
                            T.value = !0
                        }, 1600) : i.value < d.value.length - 1 ? (i.value++, setTimeout(() => {
                            _ = !0
                        }, 1600)) : setTimeout(() => {
                            v(u.toUpperCase(), -1)
                             stopTimer()
                        }, 1600)
                } else
                    R(),
                    v("Not enough letters")
            }
            function v(a, n = 1e3) {
                r.value = a,
                    n > 0 && setTimeout(() => {
                        r.value = ""
                    }, n)
            }
            function R() {
                w.value = i.value,
                    setTimeout(() => {
                        w.value = -1
                    }, 1e3)
            }
            const G = {
                [y.CORRECT]: "\u{1F7E9}",
                [y.PRESENT]: "\u{1F7E8}",
                [y.ABSENT]: "\u2B1C",
                [y.INITIAL]: null
            };
            function F() {
                return d.value.slice(0, i.value + 1).map(a => a.map(n => G[n.state]).join("")).join(`
`
                )
            }
             function formatTime(seconds) {
                const minutes = Math.floor(seconds / 60);
                 const remainingSeconds = seconds % 60;

                const formattedMinutes = String(minutes).padStart(2, '0');
                const formattedSeconds = String(remainingSeconds).padStart(2, '0');

                return `${formattedMinutes}:${formattedSeconds}`;
             }
            return (a, n) => (t(), l(k, null, [$(W, null, {
                default: U(() => [r.value ? (t(), l("div", me, [Z(f(r.value) + " ", 1), c.value ? (t(), l("pre", he, f(c.value), 1)) : x("", !0)])) : x("", !0),
                    (t(), l("div", te2, f(formatTime(elapsedTime.value)), 1) )
                    ]),
                _: 1
            }), ge, p("div", be, [(t(!0), l(k, null, z(d.value, (o, g) => (t(), l("div", {
                class: j(["row", w.value === g && "shake", T.value && i.value === g && "jump"])
            }, [(t(!0), l(k, null, z(o, (b, E) => (t(), l("div", {
                class: j(["tile", b.letter && "filled", b.state && "revealed"])
            }, [p("div", {
                class: "front",
                style: A({
                    transitionDelay: `${E * 300}ms`
                })
            }, f(b.letter), 5), p("div", {
                class: j(["back", b.state]),
                style: A({
                    transitionDelay: `${E * 300}ms`,
                    animationDelay: `${E * 100}ms`
                })
            }, f(b.letter), 7)], 2))), 256))], 2))), 256))]), $(ye, {
                onKey: N,
                "letter-states": h.value
            }, null, 8, ["letter-states"])], 64))
        }
    });
var fe = O(ke, [["__scopeId", "data-v-08507b68"]]);
window.addEventListener("resize", D);
D();
function D() {
    document.body.style.setProperty("--vh", window.innerHeight + "px")
}
J(fe).mount("#app");
