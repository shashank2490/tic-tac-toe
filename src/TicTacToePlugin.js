import styles from './TicTacToe.module.scss';

export const TicTacToePlugin = function(jQuery){
    'use strict';
    
    var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();
    
    //=============================================
    //utility functions
    var arrayHas = function (arr, val) {
        // the val might be a single value or array of values
    
        if (Array.isArray(val)) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;
    
            try {
                for (var _iterator = val[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var i = _step.value;
    
                    if (arr.indexOf(i) === -1) {
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
    
            return true;
        }
    
        if (arr.indexOf(val) === -1) {
            return false;
        }
    
        return true;
    };
    //=============================================
    
    //This is the app module
    //Module Dependencieds
    //var $ = require('jquery'),
    
    //jQuery    = $,
    //bootstrap = require('bootstrap'),
    
    //Module Variables
    var human,
        computer,
        arrayHas,
        gameGrid = {
        rows: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
        columns: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
        diagonal1: [[0, 4, 8]],
        diagonal2: [[2, 4, 6]]
    },
        gamePoints = [0, 1, 2, 3, 4, 5, 6, 7, 8],
        jQMap = {},
        configMap = {};
    
    var human = {
        moves: [],
        play: function play() {
            //event handler
            //'this' is a DOM
            var move = undefined,
                $this = jQuery(this),
                $symbol = $this.children("."+ styles.symbol);
    
            if ($symbol.text()) {
                return false;
            }
    
            $symbol.text(configMap.humanSymbol || 'X');
            move = +$this.attr('id');
            human.moves.push(move);
            jQMap.$playBox.off('click');
            setTimeout(function () {
                computer.playNextTurn.call(computer);
                jQMap.$playBox.on('click', human.play);
            }, 300);
            return false;
        }
    };
    
    var computer = {
        winningPoints: undefined,
        playNextTurn: undefined,
        moves: [],
        startPoints: [0, 2, 4, 6, 8],
        centerParttern: false,
        fourthWinningOptions: [{ blockedPoint: 0, winningOptions: [1, 3] }, { blockedPoint: 2, winningOptions: [1, 5] }, { blockedPoint: 6, winningOptions: [3, 7] }, { blockedPoint: 8, winningOptions: [7, 5] }],
    
        makeFirstMove: function makeFirstMove() {
            var move;
            move = this.startPoints[Math.round(Math.random() * (this.startPoints.length - 1))];
            //move = 4;// this assignment is purely for test purpose.  REMOVE IT
            this.centerParttern = move === 4 ? true : false;
            this.makeMOve(move);
            this.playNextTurn = this.makeSecondMove;
        },
        makeSecondMove: function makeSecondMove() {
            var secondMove,
                firstHumanMove = human.moves[0],
                computerFirstOptions = {
                0: {
                    computerOptions: [2, 6],
                    humanOptions: [{ opt: 1, move: 2 }, { opt: 2, move: 6 }, { opt: 4, move: 8 }, { opt: 3, move: 6 }, { opt: 6, move: 2 }]
                },
                2: {
                    computerOptions: [0, 8],
                    humanOptions: [{ opt: 1, move: 0 }, { opt: 0, move: 8 }, { opt: 4, move: 6 }, { opt: 5, move: 8 }, { opt: 8, move: 0 }]
                },
                6: {
                    computerOptions: [0, 8],
                    humanOptions: [{ opt: 3, move: 0 }, { opt: 0, move: 8 }, { opt: 4, move: 2 }, { opt: 7, move: 8 }, { opt: 8, move: 0 }]
                },
                8: {
                    computerOptions: [6, 2],
                    humanOptions: [{ opt: 7, move: 6 }, { opt: 6, move: 2 }, { opt: 4, move: 0 }, { opt: 5, move: 2 }, { opt: 2, move: 6 }]
                }
            },
                cfo = computerFirstOptions;
    
            //first check if computer is moving center
            if (this.centerParttern) {
                // if human has played one of my desired points
                // use that point to set two_way trap
                if (arrayHas(this.startPoints, human.moves[0])) {
                    var humanFirstMove = human.moves[0],
                        lastGamePoint = gamePoints[gamePoints.length - 1];
    
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;
    
                    try {
                        for (var _iterator2 = gamePoints[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var game = _step2.value;
    
                            if (game === humanFirstMove) {
                                this.makeMOve(lastGamePoint);
                                this.playNextTurn = this.makeThirdMove;
                                return false;
                            }
    
                            lastGamePoint -= 1;
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }
                }
    
                //if the above failed, set a winningpoint for third move, it would be a two-way trap
                // if human blocks the winning point, third move would set two_way winingpoints
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;
    
                try {
                    for (var _iterator3 = Object.keys(gameGrid)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var grid = _step3.value;
                        var _iteratorNormalCompletion4 = true;
                        var _didIteratorError4 = false;
                        var _iteratorError4 = undefined;
    
                        try {
                            for (var _iterator4 = gameGrid[grid][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                var line = _step4.value;
    
                                if (arrayHas(line, human.moves[0]) && !arrayHas(line, this.moves[0])) {
                                    var two_way_trap = undefined,
                                        lastGamePoint = gamePoints[gamePoints.length - 1],
                                        foundMatch = false;
    
                                    while (!foundMatch) {
                                        var randomGamePoint = Math.round(Math.random() * (line.length - 1));
    
                                        two_way_trap = line[randomGamePoint];
    
                                        if (!arrayHas(human.moves, two_way_trap) && !arrayHas(this.moves, two_way_trap)) {
                                            foundMatch = true;
                                        }
                                    }
    
                                    this.winningPoints = [two_way_trap];
    
                                    var _iteratorNormalCompletion5 = true;
                                    var _didIteratorError5 = false;
                                    var _iteratorError5 = undefined;
    
                                    try {
                                        for (var _iterator5 = gamePoints[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                            var point = _step5.value;
    
                                            if (point === two_way_trap) {
                                                this.makeMOve(lastGamePoint);
                                                this.playNextTurn = this.makeThirdMove;
                                                return;
                                            }
                                            lastGamePoint -= 1;
                                        }
                                    } catch (err) {
                                        _didIteratorError5 = true;
                                        _iteratorError5 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion5 && _iterator5.return) {
                                                _iterator5.return();
                                            }
                                        } finally {
                                            if (_didIteratorError5) {
                                                throw _iteratorError5;
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError4 = true;
                            _iteratorError4 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }
                            } finally {
                                if (_didIteratorError4) {
                                    throw _iteratorError4;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }
            }
    
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;
    
            try {
                loopComputerFirstOptions: for (var _iterator6 = Object.keys(cfo)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var option = _step6.value;
    
                    if (+option === this.moves[0]) {
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;
    
                        try {
                            for (var _iterator7 = cfo[option].humanOptions[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var _option = _step7.value;
    
                                if (_option.opt === firstHumanMove) {
                                    secondMove = _option.move;
                                    break loopComputerFirstOptions;
                                } else {
                                    secondMove = cfo[option].computerOptions[Math.round(Math.random() * (cfo[option].computerOptions.length - 1))];
                                }
                            }
                        } catch (err) {
                            _didIteratorError7 = true;
                            _iteratorError7 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                    _iterator7.return();
                                }
                            } finally {
                                if (_didIteratorError7) {
                                    throw _iteratorError7;
                                }
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }
    
            this.makeMOve(secondMove);
            this.playNextTurn = this.makeThirdMove;
        },
        makeThirdMove: function makeThirdMove() {
            var _this = this;
    
            var setWinnigPoints,
                hm = human.moves,
                tm = this.moves,
                thirdMoveData = [{
                computerPlayed: [0, 2],
                secondMoveData: {
                    winningPoint: 1,
                    thirdMoveOptions: [{ opt: 4, goals: [6, 8] }, { opt: 6, goals: [3, 4] }, { opt: 8, goals: [4, 5] }],
                    humanWinnngPoint: 7
                }
            }, {
                computerPlayed: [0, 6],
                secondMoveData: {
                    winningPoint: 3,
                    thirdMoveOptions: [{ opt: 4, goals: [2, 8] }, { opt: 2, goals: [1, 4] }, { opt: 8, goals: [4, 7] }],
                    humanWinnngPoint: 5
                }
            }, {
                computerPlayed: [6, 8],
                secondMoveData: {
                    winningPoint: 7,
                    thirdMoveOptions: [{ opt: 4, goals: [0, 2] }, { opt: 0, goals: [3, 4] }, { opt: 2, goals: [4, 5] }],
                    humanWinnngPoint: 1
                }
            }, {
                computerPlayed: [8, 2],
                secondMoveData: {
                    winningPoint: 5,
                    thirdMoveOptions: [{ opt: 4, goals: [0, 6] }, { opt: 0, goals: [1, 4] }, { opt: 6, goals: [4, 7] }],
                    humanWinnngPoint: 3
                }
            }, {
                computerPlayed: [0, 8],
                secondMoveData: {
                    humanIsMOvingCenter: true
                }
            }, {
                computerPlayed: [2, 6],
                secondMoveData: {
                    humanIsMOvingCenter: true
                }
            }];
    
            setWinnigPoints = function () {
                _this.winningPoints = [];
                var _iteratorNormalCompletion8 = true;
                var _didIteratorError8 = false;
                var _iteratorError8 = undefined;
    
                try {
                    gameGridSecondLoop: for (var _iterator8 = Object.keys(gameGrid)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                        var grid = _step8.value;
                        var _iteratorNormalCompletion9 = true;
                        var _didIteratorError9 = false;
                        var _iteratorError9 = undefined;
    
                        try {
                            for (var _iterator9 = gameGrid[grid][Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                var line = _step9.value;
    
                                if ((arrayHas(line, [tm[0], tm[2]]) || arrayHas(line, [tm[1], tm[2]])) && !arrayHas(line, hm[0]) && !arrayHas(line, hm[1]) && !arrayHas(line, hm[2])) {
                                    var _iteratorNormalCompletion10 = true;
                                    var _didIteratorError10 = false;
                                    var _iteratorError10 = undefined;
    
                                    try {
                                        for (var _iterator10 = line[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                                            var val = _step10.value;
    
                                            if (!arrayHas(tm, val)) {
                                                _this.winningPoints.push(val);
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError10 = true;
                                        _iteratorError10 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion10 && _iterator10.return) {
                                                _iterator10.return();
                                            }
                                        } finally {
                                            if (_didIteratorError10) {
                                                throw _iteratorError10;
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError9 = true;
                            _iteratorError9 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion9 && _iterator9.return) {
                                    _iterator9.return();
                                }
                            } finally {
                                if (_didIteratorError9) {
                                    throw _iteratorError9;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError8 = true;
                    _iteratorError8 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion8 && _iterator8.return) {
                            _iterator8.return();
                        }
                    } finally {
                        if (_didIteratorError8) {
                            throw _iteratorError8;
                        }
                    }
                }
    
                _this.playNextTurn = _this.makeFourthMove;
            };
    
            //first check if computer is moving center
            if (this.centerParttern) {
                if (this.winningPoints !== undefined && !arrayHas(hm, this.winningPoints[0])) {
                    this.makeMOve(this.winningPoints[0]);
                    this.win();
                    return;
                }
    
                if (this.winningPoints !== undefined && arrayHas(hm, this.winningPoints[0])) {
                    var _iteratorNormalCompletion11 = true;
                    var _didIteratorError11 = false;
                    var _iteratorError11 = undefined;
    
                    try {
                        for (var _iterator11 = Object.keys(gameGrid)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
                            var grid = _step11.value;
                            var _iteratorNormalCompletion12 = true;
                            var _didIteratorError12 = false;
                            var _iteratorError12 = undefined;
    
                            try {
                                for (var _iterator12 = gameGrid[grid][Symbol.iterator](), _step12; !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done); _iteratorNormalCompletion12 = true) {
                                    var line = _step12.value;
    
                                    if (arrayHas(line, hm)) {
                                        var _iteratorNormalCompletion13 = true;
                                        var _didIteratorError13 = false;
                                        var _iteratorError13 = undefined;
    
                                        try {
                                            for (var _iterator13 = line[Symbol.iterator](), _step13; !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done); _iteratorNormalCompletion13 = true) {
                                                var val = _step13.value;
    
                                                if (!arrayHas(hm, val)) {
                                                    this.makeMOve(val);
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError13 = true;
                                            _iteratorError13 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion13 && _iterator13.return) {
                                                    _iterator13.return();
                                                }
                                            } finally {
                                                if (_didIteratorError13) {
                                                    throw _iteratorError13;
                                                }
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                _didIteratorError12 = true;
                                _iteratorError12 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion12 && _iterator12.return) {
                                        _iterator12.return();
                                    }
                                } finally {
                                    if (_didIteratorError12) {
                                        throw _iteratorError12;
                                    }
                                }
                            }
                        }
    
                        // the above code has created two_way_points
                        // empty and reset the existing winningpoints
                    } catch (err) {
                        _didIteratorError11 = true;
                        _iteratorError11 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion11 && _iterator11.return) {
                                _iterator11.return();
                            }
                        } finally {
                            if (_didIteratorError11) {
                                throw _iteratorError11;
                            }
                        }
                    }
    
                    this.winningPoints = [];
                    var _iteratorNormalCompletion14 = true;
                    var _didIteratorError14 = false;
                    var _iteratorError14 = undefined;
    
                    try {
                        for (var _iterator14 = Object.keys(gameGrid)[Symbol.iterator](), _step14; !(_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done); _iteratorNormalCompletion14 = true) {
                            var grid = _step14.value;
                            var _iteratorNormalCompletion15 = true;
                            var _didIteratorError15 = false;
                            var _iteratorError15 = undefined;
    
                            try {
                                for (var _iterator15 = gameGrid[grid][Symbol.iterator](), _step15; !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done); _iteratorNormalCompletion15 = true) {
                                    var line = _step15.value;
    
                                    if (arrayHas(line, tm[2])) {
                                        var _iteratorNormalCompletion16 = true;
                                        var _didIteratorError16 = false;
                                        var _iteratorError16 = undefined;
    
                                        try {
                                            for (var _iterator16 = line[Symbol.iterator](), _step16; !(_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done); _iteratorNormalCompletion16 = true) {
                                                var val = _step16.value;
    
                                                if (!arrayHas(tm, val) && !arrayHas(hm, val)) {
                                                    this.winningPoints.push(val);
                                                }
                                            }
                                        } catch (err) {
                                            _didIteratorError16 = true;
                                            _iteratorError16 = err;
                                        } finally {
                                            try {
                                                if (!_iteratorNormalCompletion16 && _iterator16.return) {
                                                    _iterator16.return();
                                                }
                                            } finally {
                                                if (_didIteratorError16) {
                                                    throw _iteratorError16;
                                                }
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                _didIteratorError15 = true;
                                _iteratorError15 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion15 && _iterator15.return) {
                                        _iterator15.return();
                                    }
                                } finally {
                                    if (_didIteratorError15) {
                                        throw _iteratorError15;
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        _didIteratorError14 = true;
                        _iteratorError14 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion14 && _iterator14.return) {
                                _iterator14.return();
                            }
                        } finally {
                            if (_didIteratorError14) {
                                throw _iteratorError14;
                            }
                        }
                    }
    
                    this.playNextTurn = this.makeFourthMove;
                    return false;
                }
    
                // gotten this far? human's playing smart
                // human's played one of my desired gamePoints in his first move
                // let's see what he's upto
    
                // first see if he's playing on one line,
                // then block the point he hasn't played yet
                var _iteratorNormalCompletion17 = true;
                var _didIteratorError17 = false;
                var _iteratorError17 = undefined;
    
                try {
                    gameGridLoop: for (var _iterator17 = Object.keys(gameGrid)[Symbol.iterator](), _step17; !(_iteratorNormalCompletion17 = (_step17 = _iterator17.next()).done); _iteratorNormalCompletion17 = true) {
                        var grid = _step17.value;
                        var _iteratorNormalCompletion18 = true;
                        var _didIteratorError18 = false;
                        var _iteratorError18 = undefined;
    
                        try {
                            for (var _iterator18 = gameGrid[grid][Symbol.iterator](), _step18; !(_iteratorNormalCompletion18 = (_step18 = _iterator18.next()).done); _iteratorNormalCompletion18 = true) {
                                var line = _step18.value;
    
                                if (arrayHas(line, hm)) {
                                    var _iteratorNormalCompletion19 = true;
                                    var _didIteratorError19 = false;
                                    var _iteratorError19 = undefined;
    
                                    try {
                                        for (var _iterator19 = line[Symbol.iterator](), _step19; !(_iteratorNormalCompletion19 = (_step19 = _iterator19.next()).done); _iteratorNormalCompletion19 = true) {
                                            var val = _step19.value;
    
                                            if (!arrayHas(hm, val)) {
                                                this.makeMOve(val);
                                                // hmm we've just created a two-way or a one-way point
                                                // set it up for the FourthMove
    
                                                setWinnigPoints();
                                                return false;
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError19 = true;
                                        _iteratorError19 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion19 && _iterator19.return) {
                                                _iterator19.return();
                                            }
                                        } finally {
                                            if (_didIteratorError19) {
                                                throw _iteratorError19;
                                            }
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError18 = true;
                            _iteratorError18 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion18 && _iterator18.return) {
                                    _iterator18.return();
                                }
                            } finally {
                                if (_didIteratorError18) {
                                    throw _iteratorError18;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError17 = true;
                    _iteratorError17 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion17 && _iterator17.return) {
                            _iterator17.return();
                        }
                    } finally {
                        if (_didIteratorError17) {
                            throw _iteratorError17;
                        }
                    }
                }
                // else, find two lines he's not but we've played from
                // then find and play the common point between the two lines
                // that would set a two-way-points
    
                var computer_only_lines = [];
                var _iteratorNormalCompletion20 = true;
                var _didIteratorError20 = false;
                var _iteratorError20 = undefined;
    
                try {
                    for (var _iterator20 = Object.keys(gameGrid)[Symbol.iterator](), _step20; !(_iteratorNormalCompletion20 = (_step20 = _iterator20.next()).done); _iteratorNormalCompletion20 = true) {
                        var grid = _step20.value;
                        var _iteratorNormalCompletion21 = true;
                        var _didIteratorError21 = false;
                        var _iteratorError21 = undefined;
    
                        try {
                            for (var _iterator21 = gameGrid[grid][Symbol.iterator](), _step21; !(_iteratorNormalCompletion21 = (_step21 = _iterator21.next()).done); _iteratorNormalCompletion21 = true) {
                                var line = _step21.value;
    
                                if ((arrayHas(line, tm[0]) || arrayHas(line, tm[1])) && !arrayHas(line, hm[0]) && !arrayHas(line, hm[1])) {
                                    computer_only_lines.push(line);
                                }
                            }
                        } catch (err) {
                            _didIteratorError21 = true;
                            _iteratorError21 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion21 && _iterator21.return) {
                                    _iterator21.return();
                                }
                            } finally {
                                if (_didIteratorError21) {
                                    throw _iteratorError21;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError20 = true;
                    _iteratorError20 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion20 && _iterator20.return) {
                            _iterator20.return();
                        }
                    } finally {
                        if (_didIteratorError20) {
                            throw _iteratorError20;
                        }
                    }
                }
    
                var _iteratorNormalCompletion22 = true;
                var _didIteratorError22 = false;
                var _iteratorError22 = undefined;
    
                try {
                    for (var _iterator22 = computer_only_lines[0][Symbol.iterator](), _step22; !(_iteratorNormalCompletion22 = (_step22 = _iterator22.next()).done); _iteratorNormalCompletion22 = true) {
                        var val = _step22.value;
    
                        if (val !== 4 && (arrayHas(computer_only_lines[1], val) || arrayHas(computer_only_lines[2], val))) {
                            this.makeMOve(val);
                            setWinnigPoints();
                            return false;
                        }
                    }
                } catch (err) {
                    _didIteratorError22 = true;
                    _iteratorError22 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion22 && _iterator22.return) {
                            _iterator22.return();
                        }
                    } finally {
                        if (_didIteratorError22) {
                            throw _iteratorError22;
                        }
                    }
                }
            }
    
            var _iteratorNormalCompletion23 = true;
            var _didIteratorError23 = false;
            var _iteratorError23 = undefined;
    
            try {
                for (var _iterator23 = thirdMoveData[Symbol.iterator](), _step23; !(_iteratorNormalCompletion23 = (_step23 = _iterator23.next()).done); _iteratorNormalCompletion23 = true) {
                    var data = _step23.value;
    
                    if (arrayHas(tm, data.computerPlayed)) {
    
                        if (data.secondMoveData.humanIsMOvingCenter) {
                            var blockedPoint = this.blockHumanCenterMove();
    
                            // set 'two_way' winningPoints for computer's fourth move
                            var _iteratorNormalCompletion24 = true;
                            var _didIteratorError24 = false;
                            var _iteratorError24 = undefined;
    
                            try {
                                for (var _iterator24 = this.fourthWinningOptions[Symbol.iterator](), _step24; !(_iteratorNormalCompletion24 = (_step24 = _iterator24.next()).done); _iteratorNormalCompletion24 = true) {
                                    var option = _step24.value;
    
                                    if (option.blockedPoint === blockedPoint) {
                                        this.winningPoints = option.winningOptions;
                                        this.playNextTurn = this.makeFourthMove;
                                        return false;
                                    }
                                }
    
                                // OR set 'one_way' winningPoint if 'two_way' failed
                                // first determin the row/colum where computer has made two moves
                                // then, from that row/column, set the point computer has not played
                            } catch (err) {
                                _didIteratorError24 = true;
                                _iteratorError24 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion24 && _iterator24.return) {
                                        _iterator24.return();
                                    }
                                } finally {
                                    if (_didIteratorError24) {
                                        throw _iteratorError24;
                                    }
                                }
                            }
    
                            var _iteratorNormalCompletion25 = true;
                            var _didIteratorError25 = false;
                            var _iteratorError25 = undefined;
    
                            try {
                                for (var _iterator25 = Object.keys(gameGrid)[Symbol.iterator](), _step25; !(_iteratorNormalCompletion25 = (_step25 = _iterator25.next()).done); _iteratorNormalCompletion25 = true) {
                                    var grid = _step25.value;
                                    var _iteratorNormalCompletion26 = true;
                                    var _didIteratorError26 = false;
                                    var _iteratorError26 = undefined;
    
                                    try {
                                        for (var _iterator26 = gameGrid[grid][Symbol.iterator](), _step26; !(_iteratorNormalCompletion26 = (_step26 = _iterator26.next()).done); _iteratorNormalCompletion26 = true) {
                                            var line = _step26.value;
    
                                            if (arrayHas(line, [blockedPoint, tm[0]]) || arrayHas(line, [blockedPoint, tm[1]])) {
                                                var _iteratorNormalCompletion27 = true;
                                                var _didIteratorError27 = false;
                                                var _iteratorError27 = undefined;
    
                                                try {
                                                    for (var _iterator27 = line[Symbol.iterator](), _step27; !(_iteratorNormalCompletion27 = (_step27 = _iterator27.next()).done); _iteratorNormalCompletion27 = true) {
                                                        var val = _step27.value;
    
                                                        if (!arrayHas(tm, val)) {
                                                            this.winningPoints = [val];
                                                        }
                                                    }
                                                } catch (err) {
                                                    _didIteratorError27 = true;
                                                    _iteratorError27 = err;
                                                } finally {
                                                    try {
                                                        if (!_iteratorNormalCompletion27 && _iterator27.return) {
                                                            _iterator27.return();
                                                        }
                                                    } finally {
                                                        if (_didIteratorError27) {
                                                            throw _iteratorError27;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    } catch (err) {
                                        _didIteratorError26 = true;
                                        _iteratorError26 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion26 && _iterator26.return) {
                                                _iterator26.return();
                                            }
                                        } finally {
                                            if (_didIteratorError26) {
                                                throw _iteratorError26;
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                _didIteratorError25 = true;
                                _iteratorError25 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion25 && _iterator25.return) {
                                        _iterator25.return();
                                    }
                                } finally {
                                    if (_didIteratorError25) {
                                        throw _iteratorError25;
                                    }
                                }
                            }
    
                            this.playNextTurn = this.makeFourthMove;
                            return false;
                        }
    
                        if (!arrayHas(hm, data.secondMoveData.winningPoint)) {
                            this.makeMOve(data.secondMoveData.winningPoint);
                            this.win();
                            return;
                        }
    
                        var _iteratorNormalCompletion28 = true;
                        var _didIteratorError28 = false;
                        var _iteratorError28 = undefined;
    
                        try {
                            for (var _iterator28 = data.secondMoveData.thirdMoveOptions[Symbol.iterator](), _step28; !(_iteratorNormalCompletion28 = (_step28 = _iterator28.next()).done); _iteratorNormalCompletion28 = true) {
                                var option = _step28.value;
                                var opt = option.opt;
    
                                var _option$goals = _slicedToArray(option.goals, 2);
    
                                var goal1 = _option$goals[0];
                                var goal2 = _option$goals[1];
    
                                if (!arrayHas(hm, opt) && !arrayHas(hm, goal1) && !arrayHas(hm, goal2)) {
                                    this.makeMOve(opt);
                                    this.winningPoints = option.goals;
                                    this.playNextTurn = this.makeFourthMove;
                                    return;
                                }
                            }
                        } catch (err) {
                            _didIteratorError28 = true;
                            _iteratorError28 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion28 && _iterator28.return) {
                                    _iterator28.return();
                                }
                            } finally {
                                if (_didIteratorError28) {
                                    throw _iteratorError28;
                                }
                            }
                        }
    
                        this.makeMOve(data.secondMoveData.humanWinnngPoint);
                        this.playNextTurn = this.makeFourthMove;
                        return false;
                    }
                }
            } catch (err) {
                _didIteratorError23 = true;
                _iteratorError23 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion23 && _iterator23.return) {
                        _iterator23.return();
                    }
                } finally {
                    if (_didIteratorError23) {
                        throw _iteratorError23;
                    }
                }
            }
        },
        makeFourthMove: function makeFourthMove() {
            var hm = human.moves,
                tm = this.moves;
    
            if (this.winningPoints) {
                var _iteratorNormalCompletion29 = true;
                var _didIteratorError29 = false;
                var _iteratorError29 = undefined;
    
                try {
                    for (var _iterator29 = this.winningPoints[Symbol.iterator](), _step29; !(_iteratorNormalCompletion29 = (_step29 = _iterator29.next()).done); _iteratorNormalCompletion29 = true) {
                        var wagepoint = _step29.value;
    
                        if (!arrayHas(hm, wagepoint)) {
                            this.makeMOve(wagepoint);
                            this.win();
                            return;
                        }
                    }
                } catch (err) {
                    _didIteratorError29 = true;
                    _iteratorError29 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion29 && _iterator29.return) {
                            _iterator29.return();
                        }
                    } finally {
                        if (_didIteratorError29) {
                            throw _iteratorError29;
                        }
                    }
                }
            }
    
            if (this.centerParttern) {
                var _iteratorNormalCompletion30 = true;
                var _didIteratorError30 = false;
                var _iteratorError30 = undefined;
    
                try {
                    gameGridSecondLoop: for (var _iterator30 = Object.keys(gameGrid)[Symbol.iterator](), _step30; !(_iteratorNormalCompletion30 = (_step30 = _iterator30.next()).done); _iteratorNormalCompletion30 = true) {
                        var grid = _step30.value;
                        var _iteratorNormalCompletion31 = true;
                        var _didIteratorError31 = false;
                        var _iteratorError31 = undefined;
    
                        try {
                            for (var _iterator31 = gameGrid[grid][Symbol.iterator](), _step31; !(_iteratorNormalCompletion31 = (_step31 = _iterator31.next()).done); _iteratorNormalCompletion31 = true) {
                                var line = _step31.value;
    
                                if (arrayHas(line, 4) && !arrayHas(hm, line[0]) && !arrayHas(hm, line[2]) && !arrayHas(tm, line[0]) && !arrayHas(tm, line[2])) {
                                    var randomPoint = undefined,
                                        foundPoint = undefined;
                                    while (!foundPoint) {
                                        randomPoint = Math.round(Math.random() * (line.length - 1));
                                        if (randomPoint !== 1) {
                                            foundPoint = true;
                                        }
                                    }
                                    this.makeMOve(line[randomPoint]);
                                    this.playNextTurn = this.makeFifthMove;
                                    this.winningPoints = [];
                                    var wp = line[randomPoint] === line[0] ? line[2] : line[0];
                                    this.winningPoints = [wp];
                                    return;
                                }
                            }
                        } catch (err) {
                            _didIteratorError31 = true;
                            _iteratorError31 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion31 && _iterator31.return) {
                                    _iterator31.return();
                                }
                            } finally {
                                if (_didIteratorError31) {
                                    throw _iteratorError31;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError30 = true;
                    _iteratorError30 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion30 && _iterator30.return) {
                            _iterator30.return();
                        }
                    } finally {
                        if (_didIteratorError30) {
                            throw _iteratorError30;
                        }
                    }
                }
            }
            // if no winningPoints it either means human has blockd center
            // or human has played stupid
            // try to blockHumanCenterMove
            // if blockHumanCenterMove fail, find a row/column that computer
            // has played a point from it and it still has 2 free spaces
            if (!this.blockHumanCenterMove(this.makeFifthMove)) {
                var _iteratorNormalCompletion32 = true;
                var _didIteratorError32 = false;
                var _iteratorError32 = undefined;
    
                try {
                    gameGridLoop: for (var _iterator32 = Object.keys(gameGrid)[Symbol.iterator](), _step32; !(_iteratorNormalCompletion32 = (_step32 = _iterator32.next()).done); _iteratorNormalCompletion32 = true) {
                        var grid = _step32.value;
                        var _iteratorNormalCompletion33 = true;
                        var _didIteratorError33 = false;
                        var _iteratorError33 = undefined;
    
                        try {
                            gridLineLoop: for (var _iterator33 = gameGrid[grid][Symbol.iterator](), _step33; !(_iteratorNormalCompletion33 = (_step33 = _iterator33.next()).done); _iteratorNormalCompletion33 = true) {
                                var line = _step33.value;
    
                                var playedPoints = 0,
                                    freePoint = undefined;
                                var _iteratorNormalCompletion34 = true;
                                var _didIteratorError34 = false;
                                var _iteratorError34 = undefined;
    
                                try {
                                    lineLoop: for (var _iterator34 = line[Symbol.iterator](), _step34; !(_iteratorNormalCompletion34 = (_step34 = _iterator34.next()).done); _iteratorNormalCompletion34 = true) {
                                        var val = _step34.value;
    
                                        if (arrayHas(hm, val)) {
                                            continue gridLineLoop;
                                        }
    
                                        if (arrayHas(computer.moves, val)) {
                                            playedPoints += 1;
                                        } else if (freePoint === undefined) {
                                            freePoint = val;
                                        }
    
                                        if (playedPoints > 1) {
                                            continue gridLineLoop;
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError34 = true;
                                    _iteratorError34 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion34 && _iterator34.return) {
                                            _iterator34.return();
                                        }
                                    } finally {
                                        if (_didIteratorError34) {
                                            throw _iteratorError34;
                                        }
                                    }
                                }
    
                                if (freePoint !== undefined) {
                                    computer.makeMOve(freePoint);
                                    this.playNextTurn = this.makeFifthMove;
                                    break gameGridLoop;
                                }
                            }
                        } catch (err) {
                            _didIteratorError33 = true;
                            _iteratorError33 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion33 && _iterator33.return) {
                                    _iterator33.return();
                                }
                            } finally {
                                if (_didIteratorError33) {
                                    throw _iteratorError33;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError32 = true;
                    _iteratorError32 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion32 && _iterator32.return) {
                            _iterator32.return();
                        }
                    } finally {
                        if (_didIteratorError32) {
                            throw _iteratorError32;
                        }
                    }
                }
            }
            // set winningpoint for computer' fifth move
            // find a row/colums that computer has played 2 points from it
            var _iteratorNormalCompletion35 = true;
            var _didIteratorError35 = false;
            var _iteratorError35 = undefined;
    
            try {
                gameGridSecondLoop: for (var _iterator35 = Object.keys(gameGrid)[Symbol.iterator](), _step35; !(_iteratorNormalCompletion35 = (_step35 = _iterator35.next()).done); _iteratorNormalCompletion35 = true) {
                    var grid = _step35.value;
                    var _iteratorNormalCompletion36 = true;
                    var _didIteratorError36 = false;
                    var _iteratorError36 = undefined;
    
                    try {
                        gridLineSecondLoop: for (var _iterator36 = gameGrid[grid][Symbol.iterator](), _step36; !(_iteratorNormalCompletion36 = (_step36 = _iterator36.next()).done); _iteratorNormalCompletion36 = true) {
                            var line = _step36.value;
    
                            var playedPoints = 0,
                                freePoint = undefined;
    
                            var _iteratorNormalCompletion37 = true;
                            var _didIteratorError37 = false;
                            var _iteratorError37 = undefined;
    
                            try {
                                lineSecondLoop: for (var _iterator37 = line[Symbol.iterator](), _step37; !(_iteratorNormalCompletion37 = (_step37 = _iterator37.next()).done); _iteratorNormalCompletion37 = true) {
                                    var val = _step37.value;
    
                                    if (arrayHas(human.moves, val)) {
                                        continue gridLineSecondLoop;
                                    }
    
                                    if (arrayHas(this.moves, val)) {
                                        playedPoints += 1;
                                    } else {
                                        freePoint = val;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError37 = true;
                                _iteratorError37 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion37 && _iterator37.return) {
                                        _iterator37.return();
                                    }
                                } finally {
                                    if (_didIteratorError37) {
                                        throw _iteratorError37;
                                    }
                                }
                            }
    
                            if (freePoint !== undefined && playedPoints === 2) {
                                this.winningPoints = [freePoint];
                                break gameGridSecondLoop;
                            }
                        }
                    } catch (err) {
                        _didIteratorError36 = true;
                        _iteratorError36 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion36 && _iterator36.return) {
                                _iterator36.return();
                            }
                        } finally {
                            if (_didIteratorError36) {
                                throw _iteratorError36;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError35 = true;
                _iteratorError35 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion35 && _iterator35.return) {
                        _iterator35.return();
                    }
                } finally {
                    if (_didIteratorError35) {
                        throw _iteratorError35;
                    }
                }
            }
        },
        makeFifthMove: function makeFifthMove() {
            if (this.winningPoints) {
                var _iteratorNormalCompletion38 = true;
                var _didIteratorError38 = false;
                var _iteratorError38 = undefined;
    
                try {
                    for (var _iterator38 = this.winningPoints[Symbol.iterator](), _step38; !(_iteratorNormalCompletion38 = (_step38 = _iterator38.next()).done); _iteratorNormalCompletion38 = true) {
                        var wagepoint = _step38.value;
    
                        if (!arrayHas(human.moves, wagepoint)) {
                            this.makeMOve(wagepoint);
                            this.win();
                            return;
                        }
                    }
                } catch (err) {
                    _didIteratorError38 = true;
                    _iteratorError38 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion38 && _iterator38.return) {
                            _iterator38.return();
                        }
                    } finally {
                        if (_didIteratorError38) {
                            throw _iteratorError38;
                        }
                    }
                }
            }
    
            if (arrayHas(human.moves, computer.winningPoints)) {
                var _iteratorNormalCompletion39 = true;
                var _didIteratorError39 = false;
                var _iteratorError39 = undefined;
    
                try {
                    for (var _iterator39 = Object.keys(gameGrid)[Symbol.iterator](), _step39; !(_iteratorNormalCompletion39 = (_step39 = _iterator39.next()).done); _iteratorNormalCompletion39 = true) {
                        var grid = _step39.value;
                        var _iteratorNormalCompletion40 = true;
                        var _didIteratorError40 = false;
                        var _iteratorError40 = undefined;
    
                        try {
                            for (var _iterator40 = gameGrid[grid][Symbol.iterator](), _step40; !(_iteratorNormalCompletion40 = (_step40 = _iterator40.next()).done); _iteratorNormalCompletion40 = true) {
                                var line = _step40.value;
                                var _iteratorNormalCompletion41 = true;
                                var _didIteratorError41 = false;
                                var _iteratorError41 = undefined;
    
                                try {
                                    for (var _iterator41 = line[Symbol.iterator](), _step41; !(_iteratorNormalCompletion41 = (_step41 = _iterator41.next()).done); _iteratorNormalCompletion41 = true) {
                                        var val = _step41.value;
    
                                        if (!arrayHas(human.moves, val) && !arrayHas(computer.moves, val)) {
                                            computer.makeMOve(val);
                                            restartGame();
                                            return false;
                                        }
                                    }
                                } catch (err) {
                                    _didIteratorError41 = true;
                                    _iteratorError41 = err;
                                } finally {
                                    try {
                                        if (!_iteratorNormalCompletion41 && _iterator41.return) {
                                            _iterator41.return();
                                        }
                                    } finally {
                                        if (_didIteratorError41) {
                                            throw _iteratorError41;
                                        }
                                    }
                                }
                            }
                        } catch (err) {
                            _didIteratorError40 = true;
                            _iteratorError40 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion40 && _iterator40.return) {
                                    _iterator40.return();
                                }
                            } finally {
                                if (_didIteratorError40) {
                                    throw _iteratorError40;
                                }
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError39 = true;
                    _iteratorError39 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion39 && _iterator39.return) {
                            _iterator39.return();
                        }
                    } finally {
                        if (_didIteratorError39) {
                            throw _iteratorError39;
                        }
                    }
                }
            }
    
            computer.makeMOve(computer.winningPoints);
            computer.win();
        },
        blockHumanCenterMove: function blockHumanCenterMove(nextTurn) {
            //human has played the center box
            //determine human's winning plan and make computer's next move
            var hm = human.moves,
                cm = this.moves,
                lastGame = gamePoints.length - 1;
    
            var _iteratorNormalCompletion42 = true;
            var _didIteratorError42 = false;
            var _iteratorError42 = undefined;
    
            try {
                for (var _iterator42 = gamePoints[Symbol.iterator](), _step42; !(_iteratorNormalCompletion42 = (_step42 = _iterator42.next()).done); _iteratorNormalCompletion42 = true) {
                    var game = _step42.value;
    
                    if (game !== 4 && arrayHas(hm, game) && !arrayHas(cm, lastGame)) {
    
                        this.makeMOve(lastGame);
                        if (nextTurn) {
                            this.playNextTurn = nextTurn;
                        }
                        return lastGame;
                    }
                    lastGame -= 1;
                }
            } catch (err) {
                _didIteratorError42 = true;
                _iteratorError42 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion42 && _iterator42.return) {
                        _iterator42.return();
                    }
                } finally {
                    if (_didIteratorError42) {
                        throw _iteratorError42;
                    }
                }
            }
    
            return false;
        },
        win: function win() {
            console.log('computer wins!!!');
            var winningPoints;
            var _iteratorNormalCompletion43 = true;
            var _didIteratorError43 = false;
            var _iteratorError43 = undefined;
    
            try {
                for (var _iterator43 = Object.keys(gameGrid)[Symbol.iterator](), _step43; !(_iteratorNormalCompletion43 = (_step43 = _iterator43.next()).done); _iteratorNormalCompletion43 = true) {
                    var grid = _step43.value;
                    var _iteratorNormalCompletion44 = true;
                    var _didIteratorError44 = false;
                    var _iteratorError44 = undefined;
    
                    try {
                        gridLineLoop: for (var _iterator44 = gameGrid[grid][Symbol.iterator](), _step44; !(_iteratorNormalCompletion44 = (_step44 = _iterator44.next()).done); _iteratorNormalCompletion44 = true) {
                            var line = _step44.value;
                            var _iteratorNormalCompletion45 = true;
                            var _didIteratorError45 = false;
                            var _iteratorError45 = undefined;
    
                            try {
                                for (var _iterator45 = line[Symbol.iterator](), _step45; !(_iteratorNormalCompletion45 = (_step45 = _iterator45.next()).done); _iteratorNormalCompletion45 = true) {
                                    var val = _step45.value;
    
                                    if (!arrayHas(this.moves, val)) {
                                        continue gridLineLoop;
                                    }
                                }
                            } catch (err) {
                                _didIteratorError45 = true;
                                _iteratorError45 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion45 && _iterator45.return) {
                                        _iterator45.return();
                                    }
                                } finally {
                                    if (_didIteratorError45) {
                                        throw _iteratorError45;
                                    }
                                }
                            }
    
                            winningPoints = line;
                        }
                    } catch (err) {
                        _didIteratorError44 = true;
                        _iteratorError44 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion44 && _iterator44.return) {
                                _iterator44.return();
                            }
                        } finally {
                            if (_didIteratorError44) {
                                throw _iteratorError44;
                            }
                        }
                    }
                }
            } catch (err) {
                _didIteratorError43 = true;
                _iteratorError43 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion43 && _iterator43.return) {
                        _iterator43.return();
                    }
                } finally {
                    if (_didIteratorError43) {
                        throw _iteratorError43;
                    }
                }
            }
    
            var _iteratorNormalCompletion46 = true;
            var _didIteratorError46 = false;
            var _iteratorError46 = undefined;
    
            try {
                for (var _iterator46 = winningPoints[Symbol.iterator](), _step46; !(_iteratorNormalCompletion46 = (_step46 = _iterator46.next()).done); _iteratorNormalCompletion46 = true) {
                    var point = _step46.value;
    
                    jQuery('#' + point).addClass(styles.win);
                }
            } catch (err) {
                _didIteratorError46 = true;
                _iteratorError46 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion46 && _iterator46.return) {
                        _iterator46.return();
                    }
                } finally {
                    if (_didIteratorError46) {
                        throw _iteratorError46;
                    }
                }
            }
    
            restartGame();
        },
        makeMOve: function makeMOve(move) {
            this.moves.push(move);
    
            jQuery(jQMap.$playBox[move]).children("."+ styles.symbol).text(configMap.computerSymbol || 'O');
        }
    };
    
    function restartGame() {
        setTimeout(function () {
            human.moves.length = 0;
            computer.moves.length = 0;
            computer.winningPoints = undefined;
            jQMap.$playBox.removeClass(styles.win).children("."+ styles.symbol).text('');
            computer.makeFirstMove();
        }, 2000);
    }
    
    function augmentJQMap(_jQMap) {
        if (_jQMap) {
            Object.assign(jQMap, _jQMap);
            return true;
        }
        jQMap.$playBox = jQuery("."+ styles.play_box);
        jQMap.$symbolOptions = jQuery("."+ styles.symbol_option);
    }
    
    function initApp() {
        augmentJQMap();
    
        // wire events
        jQMap.$symbolOptions.on('click', function () {
            var symbol = jQuery(this).text();
            configMap.humanSymbol = symbol;
            configMap.computerSymbol = symbol === 'X' ? 'O' : 'X';
            computer.makeFirstMove();
            jQMap.$playBox.on('click', human.play);
        });
    
        //initGame
        jQuery('.app-modal').modal('show');
    }
    jQuery(initApp);
    
    };