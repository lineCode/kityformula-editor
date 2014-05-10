/*!
 * ====================================================
 * Kity Formula - v1.0.0 - 2014-05-10
 * https://github.com/kitygraph/formula
 * GitHub: https://github.com/kitygraph/formula.git 
 * Copyright (c) 2014 Baidu Kity Group; Licensed MIT
 * ====================================================
 */

(function () {
/**
 * cmd 内部定义
 * build用
 */

// 模块存储
var _modules = {};

function define ( id, deps, factory ) {

    _modules[ id ] = {

        exports: {},
        value: null,
        factory: null

    };

    if ( arguments.length === 2 ) {

        factory = deps;

    }

    if ( _modules.toString.call( factory ) === '[object Object]' ) {

        _modules[ id ][ 'value' ] = factory;

    } else if ( typeof factory === 'function' ) {

        _modules[ id ][ 'factory' ] = factory;

    } else {

        throw new Error( 'define函数未定义的行为' );

    }

}

function require ( id ) {

    var module = _modules[ id ],
        exports = null;

    if ( !module ) {

        return null;

    }

    if ( module.value ) {

        return module.value;

    }

    exports = module.factory.call( null, require, module.exports, module );

    // return 值不为空， 则以return值为最终值
    if ( exports ) {

        module.exports = exports;

    }

    module.value = module.exports;

    return module.value;

}

function use ( id ) {

    return require( id );

}
/**
 * 字符类
 */
define("char/char", [ "kity", "signgroup", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity");
    return kity.createClass("Char", {
        base: require("signgroup"),
        constructor: function(value, type) {
            var currentData;
            // 默认是标准字体
            type = type || "std";
            currentData = CHAR_DATA[type][value];
            if (!currentData) {
                currentData = CHAR_DATA["std"][value];
            }
            if (!currentData) {
                throw new Error("invalid character: " + value);
            }
            this.callBase();
            this.value = value;
            this.contentShape = new kity.Group();
            this.box = new kity.Rect(currentData.size[0] + currentData.offset.x * 2, currentData.size[1]).fill("transparent");
            this.char = new kity.Path(currentData.path).fill("black");
            this.char.translate(currentData.offset.x, currentData.offset.y);
            this.contentShape.addShape(this.box);
            this.contentShape.addShape(this.char);
            this.addShape(this.contentShape);
        },
        getBaseWidth: function() {
            return this.char.getWidth();
        },
        getBaseHeight: function() {
            return this.char.getHeight();
        },
        getBoxWidth: function() {
            return this.box.getWidth();
        }
    });
});
/*!
 * 字符配置
 */
define("char/conf", [], function(require) {
    return {
        // 默认字体
        defaultFont: "KF AMS MAIN"
    };
});
/*!
 * Created by hn on 14-4-4.
 */
define("char/map", [], function(require) {
    return {
        // char
        Alpha: "Α",
        Beta: "Β",
        Gamma: "Γ",
        Delta: "Δ",
        Epsilon: "Ε",
        Zeta: "Ζ",
        Eta: "Η",
        Theta: "Θ",
        Iota: "Ι",
        Kappa: "Κ",
        Lambda: "Λ",
        Mu: "Μ",
        Nu: "Ν",
        Xi: "Ξ",
        Omicron: "Ο",
        Pi: "Π",
        Rho: "Ρ",
        Sigma: "Σ",
        Tau: "Τ",
        Upsilon: "Υ",
        Phi: "Φ",
        Chi: "Χ",
        Psi: "Ψ",
        Omega: "Ω",
        alpha: "α",
        beta: "β",
        gamma: "γ",
        delta: "δ",
        epsilon: "ε",
        varepsilon: "ε",
        zeta: "ζ",
        eta: "η",
        theta: "θ",
        iota: "ι",
        kappa: "κ",
        lambda: "λ",
        mu: "μ",
        nu: "ν",
        xi: "ξ",
        omicron: "ο",
        pi: "π",
        rho: "ρ",
        sigma: "σ",
        tau: "τ",
        upsilon: "υ",
        phi: "φ",
        varphi: "φ",
        chi: "χ",
        psi: "ψ",
        omega: "ω",
        // symbol
        doublecap: "⋒",
        Cap: "⋒",
        dobulecup: "⋓",
        Cup: "⋓",
        ast: "∗",
        divideontimes: "⋇",
        rightthreetimes: "⋌",
        leftthreetimes: "⋋",
        cdot: "·",
        dotplus: "∔",
        rtimes: "⋊",
        ltimes: "⋉",
        centerdot: "▪",
        doublebarwedge: "⒀",
        setminus: "⒁",
        amalg: "∐",
        circ: "◦",
        bigcirc: "©",
        gtrdot: "⋗",
        lessdot: "⋖",
        smallsetminus: "⒅",
        circledast: "⊛",
        circledcirc: "⊚",
        intercal: "⊺",
        sqcap: "⊓",
        sqcup: "⊔",
        barwedge: "⊼",
        circleddash: "⊝",
        star: "⒆",
        bigtriangledown: "▽",
        bigtriangleup: "△",
        cup: "a",
        cap: "9",
        times: "×",
        mp: "∓",
        pm: "±",
        triangleleft: "⊲",
        triangleright: "⊳",
        boxdot: "⊡",
        curlyvee: "⋏",
        curlywedge: "⋎",
        boxminus: "⊟",
        ominus: "⊖",
        oplus: "⊕",
        oslash: "⊘",
        otimes: "⊗",
        uplus: "⊎",
        boxplus: "⊞",
        dagger: "†",
        ddagger: "‡",
        vee: "∨",
        lor: "∨",
        veebar: "⊻",
        bullet: "•",
        diamond: "⋄",
        wedge: "∧",
        land: "∧",
        div: "÷",
        wr: "≀",
        geqq: "≧",
        lll: "⒈",
        llless: "⒈",
        ggg: "⒉",
        gggtr: "⒉",
        preccurlyeq: "⒊",
        geqslant: "⒋",
        lnapprox: "≨",
        preceq: "≼",
        gg: "≫",
        lneq: "⒐",
        precnapprox: "⒒",
        approx: "≈",
        lneqq: "⒓",
        precneqq: "⒔",
        approxeq: "⒥",
        gnapprox: "≩",
        lnsim: "⋦",
        precnsim: "⋨",
        asymp: "≍",
        gneq: "⒑",
        lvertneqq: "⒖",
        precsim: "≾",
        backsim: "∽",
        gneqq: "⒘",
        ncong: "≇",
        risingdotseq: "≓",
        backsimeq: "⋍",
        gnsim: "⋧",
        sim: "∼",
        simeq: "≃",
        bumpeq: "⒙",
        gtrapprox: "⒛",
        ngeq: "≱",
        Bumpeq: "⒚",
        gtreqless: "⋛",
        ngeqq: "ⓠ",
        succ: "≻",
        circeq: "⒜",
        gtreqqless: "ⓤ",
        ngeqslant: "ⓦ",
        succapprox: "⒝",
        cong: "⒡",
        gtrless: "≷",
        ngtr: "≯",
        succcurlyeq: "⒍",
        curlyeqprec: "⒢",
        gtrsim: "≳",
        nleq: "≰",
        succeq: "≽",
        curlyeqsucc: "⒣",
        gvertneqq: "⒗",
        nleqq: "ⓡ",
        succnapprox: "⒤",
        doteq: "⒟",
        leq: "≤",
        le: "≤",
        nleqslant: "ⓥ",
        succneqq: "⒕",
        doteqdot: "≑",
        Doteq: "≑",
        leqq: "≦",
        nless: "≮",
        succnsim: "⋩",
        leqslant: "⒌",
        nprec: "⊀",
        succsim: "≿",
        eqsim: "≂",
        lessapprox: "⒦",
        npreceq: "⋠",
        eqslantgtr: "⋝",
        lesseqgtr: "⋚",
        nsim: "≁",
        eqslantless: "⒩",
        lesseqqgtr: "ⓤ",
        nsucc: "⊁",
        triangleq: "≜",
        eqcirc: "≖",
        equiv: "≡",
        lessgtr: "≶",
        nsucceq: "⋡",
        fallingdotseq: "≒",
        lesssim: "≲",
        prec: "≺",
        geq: "≥",
        ge: "≥",
        ll: "≪",
        precapprox: "⒞",
        // arrows
        uparrow: "↑",
        downarrow: "↓",
        updownarrow: "↕",
        Uparrow: "⇑",
        Downarrow: "⇓",
        Updownarrow: "⇕",
        circlearrowleft: "↺",
        circlearrowright: "↻",
        curvearrowleft: "↶",
        curvearrowright: "↷",
        downdownarrows: "⇊",
        downharpoonleft: "⇃",
        downharpoonright: "⇂",
        leftarrow: "←",
        gets: "←",
        Leftarrow: "⇐",
        leftarrowtail: "↢",
        leftharpoondown: "⒬",
        leftharpoonup: "⒪",
        leftleftarrows: "⒮",
        leftrightarrow: "↔",
        Leftrightarrow: "⇔",
        leftrightarrows: "⇄",
        leftrightharpoons: "⇋",
        leftrightsquigarrow: "↭",
        Llfetarrow: "⇚",
        looparrowleft: "↫",
        looparrowright: "↬",
        multimap: "⊸",
        nLeftarrow: "⇍",
        nRightarrow: "⇏",
        nLeftrightarrow: "⇎",
        nearrow: "↗",
        nleftarrow: "⒰",
        nleftrightarrow: "↮",
        nrightarrow: "⒱",
        nwarrow: "↖",
        rightarrow: "→",
        to: "→",
        Rightarrow: "⇒",
        rightarrowtail: "↣",
        rightharpoondown: "⒭",
        rightharpoonup: "⒫",
        rightleftarrows: "⇆",
        rightleftharpoons: "⇌",
        rigtrightarrows: "⒯",
        rightsquigarrow: "⇝",
        Rightarrow: "⇛",
        searrow: "↘",
        swarrow: "↙",
        twoheadleftarrow: "↞",
        twoheadrightarrow: "↠",
        upharpoonleft: "↿",
        upharpoonright: "↾",
        restriction: "be",
        upuparrows: "⇈",
        // relation
        backepsilon: "℈",
        because: "∵",
        therefore: "∴",
        between: "≬",
        blacktriangleleft: "◀",
        blacktriangleright: "▸",
        dashv: "⊣",
        frown: "⌢",
        "in": "∈",
        mid: "Ⓦ",
        parallel: "d0",
        models: "⊨",
        ni: "∋",
        owns: "∋",
        nmid: "∤",
        nparallel: "∦",
        nshortmid: "⒵",
        nshortparallel: "Ⓐ",
        nsubseteq: "⊈",
        nsubseteqq: "Ⓑ",
        nsupseteq: "⊉",
        nsupseteqq: "Ⓒ",
        ntriangleleft: "⋪",
        ntrianglelefteq: "⋬",
        ntriangleright: "⋫",
        ntrianglerighteq: "⋭",
        nvdash: "⊬",
        nVdash: "Ⓚ",
        nvDash: "Ⓛ",
        nVDash: "⊯",
        perp: "⊥",
        pitchfork: "⋔",
        propto: "∝",
        shortmid: "⒃",
        shortparallel: "⒄",
        smile: "⌣",
        sqsubset: "⊏",
        sqsubseteq: "⊑",
        sqsupset: "⊐",
        sqsupseteq: "⊒",
        subset: "⊂",
        Subset: "⋐",
        subseteq: "⊆",
        subseteqq: "Ⓗ",
        subsetneq: "⊊",
        subsetneqq: "Ⓓ",
        supset: "⊃",
        Supset: "⋑",
        supseteq: "⊇",
        supseteqq: "Ⓘ",
        supsetneq: "⊋",
        supsetneqq: "Ⓔ",
        trianglelefteq: "⊴",
        trianglerighteq: "⊵",
        varpropto: "⒲",
        varsubsetneq: "⒳",
        varsubsetneqq: "Ⓕ",
        varsupsetneq: "⒴",
        varsupsetneqq: "Ⓖ",
        vdash: "⊢",
        Vdash: "⊩",
        vDash: "⊨",
        Vvdash: "⊪",
        vert: "|",
        Vert: "ǁ",
        "|": "ǁ",
        backslash: "ǂ",
        langle: "〈",
        rangle: "〉",
        lceil: "⌈",
        rceil: "⌉",
        lbrace: "{",
        rbrace: "}",
        lfloor: "⌊",
        rfllor: "⌋",
        colon: "Ǆ",
        "#": "#",
        bot: "⊥"
    };
});
/**
 * 文本
 */
define("char/text", [ "kity", "font/manager", "signgroup", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity"), FontManager = require("font/manager");
    return kity.createClass("Text", {
        base: require("signgroup"),
        constructor: function(content, fontFamily) {
            this.callBase();
            this.fontFamily = fontFamily;
            this.content = content || "";
            this.translationContent = this.translation(this.content);
            this.contentShape = new kity.Group();
            this.contentNode = this.createContent();
            this.contentShape.addShape(this.contentNode);
            this.contentShape.translate(0, 40);
            this.addShape(this.contentShape);
        },
        createContent: function() {
            var contentNode = new kity.Text(this.translationContent);
            contentNode.setAttr({
                "font-family": this.fontFamily,
                "font-size": 50,
                x: 0,
                y: 0
            });
            return contentNode;
        },
        getBaseHeight: function() {
            var chars = this.contentShape.getItems(), currentChar = null, index = 0, height = 0;
            while (currentChar = chars[index]) {
                height = Math.max(height, currentChar.getHeight());
                index++;
            }
            return height;
        },
        translation: function(content) {
            var fontFamily = this.fontFamily;
            return content.replace(/\\([a-zA-Z,{}]+)\\/g, function(match, input) {
                if (input === ",") {
                    return "￼ ￼";
                }
                var data = FontManager.getCharacterValue(input, fontFamily);
                if (!data) {
                    console.error(input + "丢失");
                }
                return data;
            });
        }
    });
});
/*!
 * 全局定义
 */
define("conf", [ "font/kf-ams-main", "font/kf-ams-cal", "font/kf-ams-roman" ], function(require) {
    return {
        font: {
            defaultFont: "KF AMS MAIN",
            list: [ require("font/kf-ams-main"), require("font/kf-ams-cal"), require("font/kf-ams-roman") ]
        }
    };
});
/**
 * 定义公式中各种对象的类型
 */
define("def/gtype", [], function() {
    return {
        UNKNOWN: -1,
        EXP: 0,
        COMPOUND_EXP: 1,
        OP: 2
    };
});
/**
 * 定义公式中上下标的类型
 */
define("def/script-type", [], function() {
    return {
        SIDE: "side",
        FOLLOW: "follow"
    };
});
/**
 * 分数表达式
 */
define("expression/compound-exp/binary-exp/fraction", [ "kity", "operator/binary-opr/fraction", "operator/binary-opr/up-down", "expression/compound-exp/binary-exp/up-down", "expression/compound-exp/binary" ], function(require, exports, modules) {
    var kity = require("kity"), FractionOperator = require("operator/binary-opr/fraction");
    return kity.createClass("FractionExpression", {
        base: require("expression/compound-exp/binary-exp/up-down"),
        constructor: function(upOperand, downOperand) {
            this.callBase(upOperand, downOperand);
            this.setFlag("Fraction");
            this.setOperator(new FractionOperator());
        }
    });
});
/**
 * 左右结合二元表达式
 * @abstract
 */
define("expression/compound-exp/binary-exp/left-right", [ "kity", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("LeftRightExpression", {
        base: require("expression/compound-exp/binary"),
        getLeftOperand: function() {
            return this.getFirstOperand();
        },
        setLeftOperand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getRightOperand: function() {
            return this.getLastOperand();
        },
        setRightOperand: function(operand) {
            return this.setLastOperand(operand);
        }
    });
});
/**
 * 方根表达式
 */
define("expression/compound-exp/binary-exp/radical", [ "kity", "operator/binary-opr/radical", "operator/binary", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity"), RadicalOperator = require("operator/binary-opr/radical");
    return kity.createClass("RadicalExpression", {
        base: require("expression/compound-exp/binary"),
        /**
         * 构造开方表达式
         * @param radicand 被开方数
         * @param exponent 指数
         */
        constructor: function(radicand, exponent) {
            this.callBase(radicand, exponent);
            this.setFlag("Radicand");
            this.setOperator(new RadicalOperator());
        },
        setRadicand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getRadicand: function() {
            return this.getFirstOperand();
        },
        setExponent: function(operand) {
            return this.setLastOperand(operand);
        },
        getExponent: function() {
            return this.getLastOperand();
        }
    });
});
/**
 * 下标表达式
 */
define("expression/compound-exp/binary-exp/subscript", [ "kity", "expression/compound-exp/script", "operator/script", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("SubscriptExpression", {
        base: require("expression/compound-exp/script"),
        constructor: function(operand, subscript) {
            this.callBase(operand, null, subscript);
            this.setFlag("Subscript");
        }
    });
});
/**
 * 上标表达式
 */
define("expression/compound-exp/binary-exp/superscript", [ "kity", "expression/compound-exp/script", "operator/script", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("SuperscriptExpression", {
        base: require("expression/compound-exp/script"),
        constructor: function(operand, superscript) {
            this.callBase(operand, superscript, null);
            this.setFlag("Superscript");
        }
    });
});
/**
 * 上下结合二元表达式
 * @abstract
 */
define("expression/compound-exp/binary-exp/up-down", [ "kity", "expression/compound-exp/binary", "expression/compound" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("UpDownExpression", {
        base: require("expression/compound-exp/binary"),
        getUpOperand: function() {
            return this.getFirstOperand();
        },
        setUpOperand: function(operand) {
            return this.setFirstOperand(operand);
        },
        getDownOperand: function() {
            return this.getLastOperand();
        },
        setDownOperand: function(operand) {
            return this.setLastOperand(operand);
        }
    });
});
/**
 * 二元操作表达式
 * @abstract
 */
define("expression/compound-exp/binary", [ "kity", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("BinaryExpression", {
        base: require("expression/compound"),
        constructor: function(firstOperand, lastOperand) {
            this.callBase();
            this.setFirstOperand(firstOperand);
            this.setLastOperand(lastOperand);
        },
        setFirstOperand: function(operand) {
            return this.setOperand(operand, 0);
        },
        getFirstOperand: function() {
            return this.getOperand(0);
        },
        setLastOperand: function(operand) {
            return this.setOperand(operand, 1);
        },
        getLastOperand: function() {
            return this.getOperand(1);
        }
    });
});
/**
 * 自动增长括号表达式
 */
define("expression/compound-exp/brackets", [ "kity", "operator/brackets", "font/manager", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), BracketsOperator = require("operator/brackets");
    return kity.createClass("BracketsExpression", {
        base: require("expression/compound"),
        /**
         * 构造函数调用方式：
         *  new Constructor( 左括号, 右括号, 表达式 )
         *  或者
         *  new Constructor( 括号, 表达式 ), 该构造函数转换成上面的构造函数，是： new Constructor( 括号, 括号, 表达式 )
         * @param left 左括号
         * @param right 右括号
         * @param exp 表达式
         */
        constructor: function(left, right, exp) {
            this.callBase();
            this.setFlag("Brackets");
            // 参数整理
            if (arguments.length === 2) {
                exp = right;
                right = left;
            }
            this.leftSymbol = left;
            this.rightSymbol = right;
            this.setOperator(new BracketsOperator());
            this.setOperand(exp, 0);
        },
        getLeftSymbol: function() {
            return this.leftSymbol;
        },
        getRightSymbol: function() {
            return this.rightSymbol;
        }
    });
});
/**
 * 组合表达式
 * 可以组合多个表达式
 */
define("expression/compound-exp/combination", [ "kity", "operator/combination", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), CombinationOperator = require("operator/combination");
    return kity.createClass("CombinationExpression", {
        base: require("expression/compound"),
        constructor: function() {
            this.callBase();
            this.setFlag("Combination");
            this.setOperator(new CombinationOperator());
            kity.Utils.each(arguments, function(operand, index) {
                this.setOperand(operand, index);
            }, this);
        }
    });
});
/**
 * 函数表达式
 */
define("expression/compound-exp/func", [ "kity", "operator/func", "char/text", "operator/common/script-controller", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), FunctionOperator = require("operator/func");
    return kity.createClass("FunctionExpression", {
        base: require("expression/compound"),
        /**
         * function表达式构造函数
         * @param funcName function名称
         * @param expr 函数表达式
         * @param sup 上标
         * @param sub 下标
         */
        constructor: function(funcName, expr, sup, sub) {
            this.callBase();
            this.setFlag("Func");
            this.setOperator(new FunctionOperator(funcName));
            this.setExpr(expr);
            this.setSuperscript(sup);
            this.setSubscript(sub);
        },
        setExpr: function(expr) {
            return this.setOperand(expr, 0);
        },
        setSuperscript: function(sub) {
            return this.setOperand(sub, 1);
        },
        setSubscript: function(sub) {
            return this.setOperand(sub, 2);
        }
    });
});
/**
 * 积分表达式
 */
define("expression/compound-exp/integration", [ "kity", "operator/integration", "operator/common/script-controller", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), IntegrationOperator = require("operator/integration"), IntegrationExpression = kity.createClass("IntegrationExpression", {
        base: require("expression/compound"),
        /**
             * 构造积分表达式
             * @param integrand 被积函数
             * @param supOperand 上限
             * @param subOperand 下限
             */
        constructor: function(integrand, superscript, subscript) {
            this.callBase();
            this.setFlag("Integration");
            this.setOperator(new IntegrationOperator());
            this.setIntegrand(integrand);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
        },
        setType: function(type) {
            this.getOperator().setType(type);
            return this;
        },
        resetType: function() {
            this.getOperator().resetType();
            return this;
        },
        setIntegrand: function(integrand) {
            this.setOperand(integrand, 0);
        },
        setSuperscript: function(sup) {
            this.setOperand(sup, 1);
        },
        setSubscript: function(sub) {
            this.setOperand(sub, 2);
        }
    });
    return IntegrationExpression;
});
/**
 * 上标表达式
 */
define("expression/compound-exp/script", [ "kity", "operator/script", "operator/common/script-controller", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), ScriptOperator = require("operator/script");
    return kity.createClass("ScriptExpression", {
        base: require("expression/compound"),
        constructor: function(operand, superscript, subscript) {
            this.callBase();
            this.setFlag("Script");
            this.setOperator(new ScriptOperator());
            this.setOpd(operand);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
        },
        setOpd: function(operand) {
            this.setOperand(operand, 0);
        },
        setSuperscript: function(sup) {
            this.setOperand(sup, 1);
        },
        setSubscript: function(sub) {
            this.setOperand(sub, 2);
        }
    });
});
/**
 * 求和表达式
 * @abstract
 */
define("expression/compound-exp/summation", [ "kity", "operator/summation", "operator/common/script-controller", "operator/operator", "expression/compound", "def/gtype", "expression/expression" ], function(require, exports, modules) {
    var kity = require("kity"), SummationOperator = require("operator/summation");
    return kity.createClass("SummationExpression", {
        base: require("expression/compound"),
        /**
         * 构造求和表达式
         * @param expr 求和表达式
         * @param upOperand 上标
         * @param downOperand 下标
         */
        constructor: function(expr, superscript, subscript) {
            this.callBase();
            this.setFlag("Summation");
            this.setOperator(new SummationOperator());
            this.setExpr(expr);
            this.setSuperscript(superscript);
            this.setSubscript(subscript);
        },
        setExpr: function(expr) {
            this.setOperand(expr, 0);
        },
        setSuperscript: function(sup) {
            this.setOperand(sup, 1);
        },
        setSubscript: function(sub) {
            this.setOperand(sub, 2);
        }
    });
});
/**
 * 复合表达式
 * @abstract
 */
define("expression/compound", [ "kity", "def/gtype", "expression/expression", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), GTYPE = require("def/gtype"), Expression = require("expression/expression");
    return kity.createClass("CompoundExpression", {
        base: require("expression/expression"),
        constructor: function() {
            this.callBase();
            this.type = GTYPE.COMPOUND_EXP;
            this.operands = [];
            this.operator = null;
            this.operatorBox = new kity.Group();
            this.operatorBox.setAttr("data-type", "kf-editor-exp-op-box");
            this.operandBox = new kity.Group();
            this.operandBox.setAttr("data-type", "kf-editor-exp-operand-box");
            this.setChildren(0, this.operatorBox);
            this.setChildren(1, this.operandBox);
        },
        // 操作符存储在第1位置
        setOperator: function(operator) {
            if (operator === undefined) {
                return this;
            }
            if (this.operator) {
                this.operator.remove();
            }
            this.operatorBox.addShape(operator);
            this.operator = operator;
            this.operator.setParentExpression(this);
            // 表达式关联到操作符
            operator.expression = this;
            return this;
        },
        getOperator: function() {
            return this.operator;
        },
        // 操作数存储位置是从1开始
        setOperand: function(operand, index, isWrap) {
            // 不包装操作数
            if (isWrap === false) {
                this.operands[index] = operand;
                return this;
            }
            operand = Expression.wrap(operand);
            if (this.operands[index]) {
                this.operands[index].remove();
            }
            this.operands[index] = operand;
            this.operandBox.addShape(operand);
            return this;
        },
        getOperand: function(index) {
            return this.operands[index];
        },
        getOperands: function() {
            return this.operands;
        },
        addedCall: function() {
            this.operator.applyOperand.apply(this.operator, this.operands);
            return this;
        }
    });
});
/**
 * 空表达式
 * 该表达式主要用途是用于站位
 */
define("expression/empty", [ "kity", "expression/expression", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity"), Expression = require("expression/expression"), EmptyExpression = kity.createClass("EmptyExpression", {
        base: Expression,
        constructor: function() {
            this.callBase();
            this.setFlag("Empty");
        }
    });
    // 注册打包函数
    Expression.registerWrap("empty", function(operand) {
        if (operand === null || operand === undefined) {
            return new EmptyExpression();
        }
    });
    return EmptyExpression;
});
/**
 * 基础表达式， 该类是表达式和操作数的高层抽象
 * @abstract
 */
define("expression/expression", [ "kity", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype"), // 打包函数列表
    WRAP_FN = [], // 注册的打包函数的名称与其在注册器列表中的索引之间的对应关系
    WRAP_FN_INDEX = {}, Expression = kity.createClass("Expression", {
        base: require("signgroup"),
        constructor: function() {
            this.callBase();
            this.type = GTYPE.EXP;
            this.children = [];
            this.box.fill("transparent").setAttr("data-type", "kf-editor-exp-box");
            this.box.setAttr("data-type", "kf-editor-exp-bg-box");
            this.expContent = new kity.Group();
            this.expContent.setAttr("data-type", "kf-editor-exp-content-box");
            this.addShape(this.expContent);
        },
        getChildren: function() {
            return this.children;
        },
        getChild: function(index) {
            return this.children[index] || null;
        },
        setFlag: function(flag) {
            this.setAttr("data-flag", flag || "Expression");
        },
        setChildren: function(index, exp) {
            // 首先清理掉之前的表达式
            if (this.children[index]) {
                this.children[index].remove();
            }
            this.children[index] = exp;
            this.expContent.addShape(exp);
        },
        translateElement: function(x, y) {
            this.expContent.translate(x, y);
        },
        expand: function(width, height) {
            var renderBox = this.getFixRenderBox();
            this.setBoxSize(renderBox.width + width, renderBox.height + height);
        },
        getBaseWidth: function() {
            return this.getWidth();
        },
        getBaseHeight: function() {
            return this.getHeight();
        },
        updateBoxSize: function() {
            var renderBox = this.expContent.getFixRenderBox();
            this.setBoxSize(renderBox.width, renderBox.height);
        },
        getBox: function() {
            return this.box;
        }
    });
    // 表达式自动打包
    kity.Utils.extend(Expression, {
        registerWrap: function(name, fn) {
            WRAP_FN_INDEX[name] = WRAP_FN.length;
            WRAP_FN.push(fn);
        },
        revokeWrap: function(name) {
            var fn = null;
            if (name in WRAP_FN_INDEX) {
                fn = WRAP_FN[WRAP_FN_INDEX[name]];
                WRAP_FN[WRAP_FN_INDEX[name]] = null;
                delete WRAP_FN_INDEX[name];
            }
            return fn;
        },
        // 打包函数
        wrap: function(operand) {
            var result = undefined;
            kity.Utils.each(WRAP_FN, function(fn) {
                if (!fn) {
                    return;
                }
                result = fn(operand);
                if (result) {
                    return false;
                }
            });
            return result;
        }
    });
    return Expression;
});
/**
 * Text表达式
 */
define("expression/text", [ "char/text", "kity", "font/manager", "signgroup", "char/conf", "expression/expression", "def/gtype" ], function(require, exports, module) {
    var Text = require("char/text"), kity = require("kity"), FONT_CONF = require("char/conf"), Expression = require("expression/expression"), TextExpression = kity.createClass("TextExpression", {
        base: require("expression/expression"),
        constructor: function(content, fontFamily) {
            this.callBase();
            this.fontFamily = fontFamily || FONT_CONF.defaultFont;
            this.setFlag("Text");
            this.content = content + "";
            this.textContent = new Text(this.content, this.fontFamily);
            this.setChildren(0, this.textContent);
            this.setChildren(1, new kity.Rect(0, 0, 0, 0).fill("transparent"));
        },
        addedCall: function() {
            var box = this.textContent.getFixRenderBox();
            this.getChild(1).setSize(box.width, box.height);
            this.updateBoxSize();
            return this;
        }
    });
    // 注册文本表达式的打包函数
    Expression.registerWrap("text", function(operand) {
        var operandType = typeof operand;
        if (operandType === "number" || operandType === "string") {
            operand = new TextExpression(operand);
        }
        return operand;
    });
    return TextExpression;
});
/*!
 * 字体管理器
 */
define("font/installer", [ "kity" ], function(require) {
    var kity = require("kity"), NS = "http://www.w3.org/2000/svg";
    return kity.createClass("FontInstaller", {
        constructor: function(paper) {
            this.paper = paper;
        },
        // 挂载字体
        mount: function(fontData) {
            var chardata = fontData.data, font = document.createElementNS(NS, "font"), attr = fontData.meta.attr;
            font.setAttribute("horiz-adv-x", fontData.meta.x);
            var strArr = [ "<font-face " + attr + ' font-family="' + fontData.meta.fontFamily + '" units-per-em="' + fontData.meta["units-per-em"] + '"></font-face>' ];
            kity.Utils.each(chardata, function(char, key) {
                strArr.push('<glyph unicode="' + key + '"' + (char.x !== null ? ' horiz-adv-x="' + char.x + '"' : "") + ' d="' + char.d + '"/>');
            });
            strArr = strArr.join("");
            font.innerHTML = strArr;
            this.paper.addResource({
                node: font
            });
        }
    });
});
/*!
 * 书法字体
 */
define("font/kf-ams-cal", [], function(require) {
    return {
        meta: {
            fontFamily: "KF AMS CAL",
            x: 724,
            "units-per-em": 1e3,
            attr: 'panose-1="2 0 6 3 0 0 0 0 0 0" ascent="800" descent="-200" cap-height="683" bbox="50 -135 1139 775" underline-thickness="50" underline-position="-100" unicode-range="U+0041-005A"'
        },
        data: {
            A: {
                x: 871,
                d: "M618 165h-272c-22 -35 -137 -215 -206 -215c-47 0 -90 44 -90 84c0 28 22 76 37 76c4 0 6 -6 7 -8c9 -36 40 -60 77 -60c54 0 158 163 217 254c52 81 126 202 205 371l7 11c18 27 59 44 73 44c11 0 11 -4 11 -20c0 -24 -1 -50 -1 -74c0 -102 4 -204 11 -306\nc8 -137 17 -177 24 -210c12 -60 18 -87 46 -87c2 0 4 0 11 4c3 2 24 13 37 13c5 0 9 -2 9 -7c0 -20 -77 -65 -122 -65c-43 0 -48 22 -59 67c-5 19 -17 65 -22 128zM598 599h-1c-13 -25 -40 -83 -90 -172c-6 -11 -64 -115 -134 -223c26 16 41 16 57 16h183\nc-5 52 -9 127 -10 147c-3 58 -5 116 -5 174v58z"
            },
            B: {
                x: 735,
                d: "M300 679l-20 -132c121 150 249 159 283 159c74 0 122 -43 122 -101c0 -94 -117 -166 -197 -200c102 -19 158 -82 158 -166c0 -161 -207 -261 -348 -261c-108 0 -147 66 -147 69c0 18 51 49 73 49c8 0 9 -2 13 -7c13 -14 50 -56 127 -56c91 0 197 40 197 164\nc0 95 -82 155 -183 155c-21 0 -44 -4 -48 -4c-3 0 -10 1 -10 7c0 25 69 49 81 53c104 35 199 67 199 155c0 53 -49 88 -103 88c-63 0 -105 -30 -151 -95c-71 -103 -109 -234 -131 -320c-30 -116 -68 -189 -81 -212c-16 -28 -58 -46 -74 -46c-2 0 -10 0 -10 7c0 1 0 3 5 12\nc49 97 68 158 105 328c18 86 42 214 54 312c-19 -9 -45 -23 -57 -23c-4 0 -11 0 -11 6c0 18 38 37 84 60c20 10 50 25 61 25c9 0 11 -3 11 -10c0 -3 0 -5 -2 -16z"
            },
            C: {
                x: 622,
                d: "M534 157c0 -25 -133 -181 -294 -181c-116 0 -190 81 -190 227c0 52 12 207 131 351c46 56 165 151 310 151c36 0 81 -8 81 -63c0 -51 -58 -149 -60 -153c-12 -16 -49 -38 -69 -38c-6 0 -11 0 -11 7c0 2 0 4 6 15c12 20 49 91 49 126c0 37 -24 51 -62 51\nc-103 0 -157 -52 -201 -116c-53 -79 -89 -198 -89 -288c0 -150 81 -215 171 -215c65 0 109 34 140 81c12 17 16 24 36 37c1 0 25 15 42 15c5 0 10 -1 10 -7z"
            },
            D: {
                x: 845,
                d: "M233 0h-103c-22 0 -23 1 -23 7c0 10 24 33 61 46c70 175 121 366 137 575c-126 -6 -154 -41 -168 -81c-6 -19 -9 -25 -30 -39c-8 -5 -31 -19 -47 -19c-6 0 -10 2 -10 8c0 8 19 91 152 150c84 36 143 36 229 36c95 0 187 0 273 -56c49 -31 91 -87 91 -176\nc0 -273 -329 -451 -562 -451zM238 55h54c242 0 418 157 418 353c0 220 -256 220 -323 220c-14 -120 -35 -294 -149 -573z"
            },
            E: {
                x: 637,
                d: "M261 363c-49 17 -94 53 -94 112c0 122 170 230 306 230c45 0 114 -9 114 -68c0 -57 -62 -96 -92 -96c-3 0 -10 0 -10 7c0 3 3 8 5 11c4 6 12 20 12 36c0 52 -76 55 -95 55c-140 0 -155 -109 -155 -132c0 -40 28 -109 169 -115c5 0 10 -1 10 -7c0 -11 -35 -46 -82 -48\nc-158 -6 -214 -154 -214 -203c0 -75 79 -112 150 -112c89 0 131 58 152 87c23 31 61 44 73 44c5 0 10 -1 10 -7c0 -21 -134 -179 -301 -179c-95 0 -169 48 -169 124c0 24 11 153 211 261z"
            },
            F: {
                x: 913,
                d: "M863 645c0 -27 -54 -57 -78 -57c-3 0 -6 1 -8 3c-3 5 0 15 -2 21c-18 22 -88 17 -113 17h-132c-18 -92 -52 -180 -78 -270h240c12 0 19 1 19 -6c0 -31 -57 -59 -79 -59c-4 0 -10 3 -10 7c0 1 1 2 2 3h-193c-26 -60 -92 -224 -125 -262c-32 -37 -91 -74 -142 -74\nc-49 0 -94 27 -112 74c-1 2 -2 4 -2 6c0 17 55 49 78 49c7 0 7 -4 10 -10c18 -39 51 -63 95 -63c14 12 68 137 74 150c44 98 103 253 142 436c0 1 4 19 4 19h-62c-31 0 -61 -2 -92 -2c-14 -15 -44 -33 -66 -33c-6 0 -8 1 -10 7c16 54 105 83 155 83h377c31 0 108 7 108 -39z\n"
            },
            G: {
                x: 657,
                d: "M442 159c-66 -53 -143 -91 -218 -91c-129 0 -174 103 -174 204c0 235 203 433 429 433c14 0 48 0 85 -12c12 -4 43 -14 43 -55c0 -34 -40 -90 -48 -101c-27 -37 -60 -64 -89 -64c-6 0 -11 0 -11 7c0 4 3 8 7 12c4 6 56 70 56 104c0 32 -25 40 -36 43c-25 8 -54 11 -73 11\nc-113 0 -162 -53 -189 -85c-58 -70 -89 -173 -89 -250c0 -113 57 -192 154 -192c124 0 183 148 193 182c7 25 8 30 31 45c21 14 38 19 47 19s11 -3 11 -9c0 -4 -21 -84 -41 -153c-3 -12 -20 -69 -46 -125c-75 -163 -193 -201 -265 -201c-93 0 -161 41 -161 50\nc0 11 35 46 80 48c59 -40 130 -43 147 -43c34 0 55 2 94 70c10 16 36 62 63 153z"
            },
            H: {
                x: 880,
                d: "M360 335h268c30 102 61 203 101 301c4 9 10 14 11 16c19 17 48 31 63 31c4 0 10 0 10 -7c0 -2 0 -4 -3 -11c-86 -228 -135 -416 -152 -527c-3 -22 -10 -77 -10 -89c0 -31 23 -43 41 -43c1 0 20 1 31 3c19 3 20 4 24 12c15 39 68 53 76 53c5 0 10 -2 10 -8\nc0 -32 -74 -115 -207 -115c-43 0 -60 26 -60 55c0 79 41 242 52 284c-16 -10 -35 -10 -46 -10h-225c-26 -92 -56 -182 -91 -270c-4 -10 -6 -12 -11 -18c-20 -20 -51 -33 -65 -33c-2 0 -10 0 -10 7c0 1 0 3 9 26c46 122 74 218 95 288h-72c-22 0 -23 1 -23 7\nc0 15 46 47 74 48h36c21 86 24 104 29 132c12 69 15 116 15 117c0 16 -7 44 -48 44c-90 0 -119 -38 -146 -89c-21 -38 -68 -50 -76 -50c-3 0 -10 0 -10 7c0 5 26 72 107 127c47 32 115 60 191 60c12 0 67 0 67 -56c0 -12 -7 -79 -19 -146c-10 -48 -23 -99 -36 -146z"
            },
            I: {
                x: 759,
                d: "M429 683h257c22 0 23 -1 23 -7c0 -12 -23 -28 -32 -33c-26 -15 -35 -15 -55 -15h-85c-20 0 -21 -1 -27 -10c-41 -61 -65 -158 -92 -267c-34 -136 -64 -235 -135 -296h191c50 0 53 6 60 27c10 25 57 48 74 48c3 0 11 0 11 -7c0 -36 -87 -123 -204 -123h-342\nc-22 0 -23 1 -23 7c0 10 22 27 33 33c25 15 36 15 55 15h64c27 0 28 1 38 12c41 53 64 131 93 249c36 144 65 251 128 312h-91c-34 0 -67 -2 -101 -6c-67 -9 -70 -18 -82 -56c-8 -22 -56 -47 -74 -47c-6 0 -11 1 -11 8c0 13 23 81 125 124c24 9 78 32 202 32z"
            },
            J: {
                x: 893,
                d: "M618 683h202c22 0 23 -1 23 -7c0 -11 -34 -45 -79 -48c-23 -2 -27 -5 -43 -23c-75 -84 -123 -266 -160 -411c-18 -71 -36 -144 -128 -223c-49 -42 -130 -90 -215 -90c-98 0 -168 60 -168 152c0 47 11 57 23 66c28 21 51 26 57 26c9 0 10 -6 10 -9c0 -4 -5 -21 -5 -41\nc0 -87 71 -139 149 -139c101 0 162 100 186 193c66 260 112 411 222 499h-133c-98 0 -170 -43 -203 -149c-6 -18 -51 -46 -74 -46c-4 0 -10 0 -10 7c0 2 12 86 121 164c46 33 129 79 225 79z"
            },
            K: {
                x: 803,
                d: "M216 638c-48 -24 -50 -24 -59 -24c-4 0 -11 0 -11 6c0 18 38 37 84 60c20 10 50 25 61 25s11 -4 11 -16c0 -4 -2 -45 -7 -85c-30 -254 -160 -581 -165 -588c-16 -19 -52 -38 -70 -38c-2 0 -10 0 -10 7c0 1 0 3 5 15c59 156 150 420 161 638zM747 127c0 -3 -4 -28 -30 -60\nc-38 -48 -119 -89 -197 -89c-30 0 -51 13 -86 47c-72 73 -173 289 -173 375c0 62 107 138 149 169c79 56 217 136 285 136c37 0 58 -26 58 -60c0 -49 -48 -52 -50 -52c-9 0 -12 5 -12 11c0 4 2 9 2 16c0 26 -15 42 -36 42c-47 0 -224 -102 -298 -175\nc-35 -36 -38 -46 -38 -62c0 -90 141 -404 238 -404c2 0 100 0 127 76c5 16 7 19 19 27c14 11 25 12 30 12c12 0 12 -8 12 -9z"
            },
            L: {
                x: 803,
                d: "M199 93c13 3 27 4 40 4c50 0 105 -16 133 -24c66 -18 116 -33 164 -33c15 0 16 0 24 12c4 6 10 14 15 30c6 17 8 23 35 40c17 12 41 23 57 23c1 0 7 0 7 -7c0 -3 -6 -28 -26 -55c-32 -44 -114 -105 -195 -105c-51 0 -102 15 -153 29c-63 18 -98 27 -148 28\nc-23 -24 -25 -26 -42 -36c-26 -17 -47 -21 -51 -21c-7 0 -9 4 -9 6c0 5 10 23 37 48c14 13 40 57 47 69c30 60 38 91 56 160c19 75 66 255 146 337c98 99 186 107 218 107c56 0 84 -41 84 -95c0 -41 -9 -51 -27 -65c-25 -18 -52 -29 -68 -29c-1 0 -7 0 -7 7c0 5 5 19 5 37\nc0 14 -2 83 -71 83c-32 0 -40 -9 -52 -22c-62 -69 -100 -189 -135 -327c-13 -53 -30 -117 -84 -201z"
            },
            M: {
                x: 1189,
                d: "M408 559c-28 -144 -84 -302 -131 -415c-20 -51 -79 -194 -141 -194c-5 0 -29 1 -54 14c-32 17 -32 29 -32 38c0 28 22 73 36 73c2 0 4 0 9 -5c22 -20 59 -28 72 -28c19 0 41 0 121 213c70 191 90 323 102 407c3 21 45 43 63 43c3 0 8 0 11 -5c0 -2 5 -29 8 -43\nc17 -97 34 -180 63 -293c35 -140 53 -178 78 -231c99 84 391 434 485 548c19 22 20 23 24 23c7 0 8 -11 8 -15c0 -8 -1 -10 -2 -17c-29 -124 -73 -427 -73 -538c0 -4 0 -34 3 -66c2 -23 4 -39 28 -42c11 7 31 16 44 16c3 0 9 -1 9 -7c0 -20 -76 -64 -118 -64s-46 29 -47 40\nc-3 27 -4 53 -4 80c0 117 36 342 50 427l-219 -255c-70 -80 -122 -138 -198 -211c-18 -18 -20 -18 -24 -18c-10 0 -21 22 -43 65c-57 116 -101 330 -128 460z"
            },
            N: {
                x: 1107,
                d: "M385 574c-19 -107 -50 -256 -115 -437c-16 -46 -67 -187 -131 -187c-28 0 -89 20 -89 51c0 24 21 74 37 74c1 0 3 0 8 -4c26 -24 65 -29 75 -29c20 0 32 18 40 33c27 48 121 311 149 577c1 11 2 20 12 29c29 24 49 24 51 24c9 0 10 -1 16 -21c27 -90 59 -194 112 -336\nc48 -129 79 -208 134 -291c31 129 63 259 98 387c46 167 70 240 98 276c12 13 57 55 157 55c14 0 20 0 20 -16c0 -22 -19 -75 -39 -76c-123 -2 -143 -40 -144 -42c-20 -46 -96 -320 -156 -583c-11 -49 -12 -50 -26 -63c-11 -8 -32 -20 -46 -20c-9 0 -10 1 -24 22\nc-61 95 -89 157 -152 327c-45 123 -67 198 -85 250z"
            },
            O: {
                x: 820,
                d: "M770 482c0 -308 -286 -504 -481 -504c-166 0 -239 128 -239 268c0 300 296 459 331 459c2 0 10 0 10 -7c0 -13 -30 -31 -40 -37c-146 -86 -216 -236 -216 -372c0 -143 78 -256 220 -256c185 0 330 202 330 406c0 131 -62 211 -159 211c-40 0 -60 -15 -84 -42\nc-37 -42 -60 -91 -69 -111c-11 -23 -12 -26 -30 -39c-15 -11 -31 -21 -50 -21c-5 0 -10 1 -10 7c0 2 30 92 110 171c7 6 95 90 199 90c122 0 178 -96 178 -223z"
            },
            P: {
                x: 812,
                d: "M377 683h134c116 0 251 -45 251 -159c0 -165 -236 -319 -418 -319c-13 0 -19 0 -19 7c0 6 8 17 26 29c28 18 39 18 60 19c194 6 266 146 266 221c0 100 -117 147 -239 147h-52c-30 -278 -112 -508 -164 -630c-11 -26 -59 -48 -75 -48c-7 0 -10 4 -10 7c0 1 0 3 6 18\nc84 209 144 428 162 653c-126 -6 -154 -41 -168 -81c-6 -19 -9 -25 -30 -39c-8 -5 -31 -19 -47 -19c-6 0 -10 2 -10 8c0 2 3 31 38 71c41 47 148 115 289 115z"
            },
            Q: {
                x: 774,
                d: "M160 28h29c164 0 237 34 302 93c95 84 136 197 136 296c0 133 -76 233 -202 233c-177 0 -290 -195 -290 -320c0 -103 65 -173 155 -173c10 0 52 1 93 24c14 7 31 17 45 17c4 0 11 0 11 -6c0 -24 -114 -90 -215 -90c-111 0 -174 80 -174 186c0 208 237 417 441 417\nc147 0 221 -110 221 -246c0 -241 -218 -414 -391 -463c144 -49 189 -65 255 -65c27 0 48 3 62 43c5 13 7 20 30 35c16 11 37 19 47 19c5 0 9 -3 9 -8c0 -41 -97 -144 -214 -144c-79 0 -150 25 -219 50c-100 35 -141 44 -208 47c-5 0 -10 0 -10 7c0 12 24 28 32 33\nc25 15 36 15 55 15z"
            },
            R: {
                x: 916,
                d: "M434 628h-47c-31 -320 -158 -602 -160 -607c-11 -19 -53 -43 -73 -43c-2 0 -10 0 -10 7c0 1 0 3 5 14c44 107 81 217 108 329c34 146 43 239 48 300c-126 -6 -154 -41 -168 -81c-6 -19 -9 -25 -30 -39c-8 -5 -31 -19 -47 -19c-6 0 -10 2 -10 8c0 8 18 91 152 150\nc84 36 140 36 240 36c151 0 319 0 319 -125c0 -104 -98 -209 -243 -262c23 -27 41 -64 62 -114c34 -78 65 -149 116 -149c49 0 71 31 87 54c21 29 60 43 72 43c3 0 11 0 11 -7c0 -22 -115 -145 -236 -145c-59 0 -85 46 -131 151c-52 118 -72 138 -114 145c-1 0 -5 0 -5 6\nc0 11 34 46 83 48c165 6 213 126 213 187c0 66 -50 113 -242 113z"
            },
            S: {
                x: 803,
                d: "M147 219c-7 -16 -12 -34 -12 -52c0 -68 82 -134 184 -134c152 0 201 84 201 151c0 84 -91 130 -162 162c-48 21 -135 61 -135 145c0 114 160 214 291 214c14 0 60 0 107 -22c27 -12 53 -26 53 -75c0 -39 -11 -52 -24 -62c-20 -17 -44 -27 -57 -27c-4 0 -10 0 -10 7\nc0 3 1 7 2 10c3 11 4 16 4 30c0 43 -26 55 -45 64c-43 19 -85 20 -96 20c-14 0 -70 -3 -100 -29c-31 -27 -40 -66 -40 -87c0 -57 46 -98 116 -130c81 -36 181 -82 181 -177c0 -136 -189 -249 -352 -249c-122 0 -203 74 -203 146c0 100 98 143 132 143c6 0 12 0 12 -7\nc0 -14 -35 -36 -47 -41z"
            },
            T: {
                x: 900,
                d: "M502 621l-112 -446c-21 -83 -65 -185 -71 -195c-15 -21 -64 -48 -84 -48c-5 0 -9 1 -9 7c0 2 0 4 6 16c29 65 50 128 62 177l114 453c2 10 6 25 23 36h-199c-44 0 -52 -8 -62 -20c-20 -26 -22 -45 -23 -62c-2 -24 -65 -57 -89 -57c-8 0 -8 6 -8 12c0 82 139 189 263 189\nh437c19 0 21 0 29 6c25 18 51 28 62 28c5 0 9 -2 9 -7c0 -13 -50 -89 -182 -89h-166z"
            },
            U: {
                x: 805,
                d: "M560 296l-1 1c-43 -58 -88 -118 -157 -183c-102 -95 -193 -136 -255 -136c-71 0 -97 54 -97 120c0 58 21 122 87 272c42 96 78 178 78 222c0 22 -9 36 -31 36c-27 0 -43 -10 -50 -15c-16 -11 -34 -19 -46 -19c-4 0 -11 0 -11 6c0 21 96 83 173 83c18 0 50 -1 50 -48\nc0 -45 -30 -116 -66 -198c-60 -137 -99 -227 -99 -297c0 -66 30 -107 78 -107c71 0 169 116 200 151c99 116 198 281 231 376c12 37 14 42 27 77c8 19 53 46 74 46c4 0 10 0 10 -7c0 -8 -13 -49 -25 -77c-29 -74 -143 -424 -143 -546c0 -14 7 -24 20 -26c11 6 29 15 41 15\nc5 0 10 -2 10 -7c0 -20 -75 -63 -115 -63c-24 0 -41 12 -41 39c0 77 35 201 58 285z"
            },
            V: {
                x: 726,
                d: "M286 86c172 134 346 339 346 420c0 24 -12 77 -79 85c-12 1 -17 1 -17 16c0 13 14 76 43 76c41 0 97 -31 97 -116c0 -67 -38 -156 -89 -234c-127 -193 -369 -378 -380 -378c-7 0 -7 12 -7 17c0 4 0 6 2 18c12 67 25 187 25 288c0 113 -12 342 -158 355c-14 1 -19 1 -19 8\nc0 14 35 42 69 42c182 0 182 -298 182 -369c0 -15 0 -105 -15 -228z"
            },
            W: {
                x: 1102,
                d: "M257 129h1c166 209 256 378 317 493c-2 5 -6 14 -6 18c0 18 43 43 62 43c10 0 11 -4 14 -11c41 -110 99 -339 110 -554c1 -23 1 -24 2 -24c7 0 251 308 251 422c0 66 -46 73 -60 75c-7 1 -12 2 -12 16c0 15 15 76 42 76c31 0 74 -26 74 -106c0 -173 -214 -464 -338 -603\nc-16 -18 -17 -19 -22 -19c-3 0 -6 4 -6 8c-1 3 -2 49 -2 53c-1 53 -6 114 -12 167c-19 163 -53 301 -83 394c-4 -7 -30 -59 -69 -128c-109 -190 -220 -342 -331 -474c-16 -19 -17 -20 -22 -20c-7 0 -7 12 -7 16c0 9 1 13 4 26c6 23 41 197 41 348c0 43 -3 119 -24 182\nc-27 81 -70 102 -113 106c-13 1 -18 1 -18 8c0 14 35 42 69 42c33 0 87 -11 126 -90c34 -72 34 -184 34 -213c0 -85 -9 -169 -22 -251z"
            },
            X: {
                x: 858,
                d: "M479 551l15 -153c69 42 111 68 141 88c85 58 88 73 88 98c0 39 -24 43 -32 44c-1 0 -7 1 -7 7c0 14 46 48 77 48c29 0 47 -22 47 -56c0 -42 0 -77 -311 -263c10 -104 13 -130 16 -162c8 -84 14 -147 71 -147c2 0 7 0 10 1c19 34 63 47 73 47c6 0 11 0 11 -7\nc0 -28 -65 -96 -160 -96c-74 0 -81 66 -89 145c-2 17 -17 167 -17 169c-52 -33 -110 -65 -171 -105c-106 -71 -106 -83 -106 -110c0 -39 24 -43 32 -44c4 -1 7 -2 7 -7c0 -15 -46 -48 -76 -48s-48 22 -48 56c0 29 2 59 116 140c72 50 207 131 243 151l-14 147\nc-10 103 -23 134 -78 134l-2 -1c-18 -34 -62 -47 -73 -47c-5 0 -11 0 -11 7c0 28 65 96 160 96c70 0 80 -57 88 -132z"
            },
            Y: {
                x: 786,
                d: "M427 97c222 216 269 394 269 425c0 29 -15 76 -74 83c-15 2 -19 3 -19 18c0 10 9 60 38 60c38 0 95 -31 95 -116c0 -52 -35 -224 -235 -454c-87 -101 -252 -248 -328 -248c-85 0 -123 73 -123 114c0 25 19 59 31 59c6 0 7 -6 9 -13c19 -83 100 -83 108 -83\nc49 0 149 84 151 86c2 1 2 3 3 11c1 13 5 82 5 142c0 91 -7 180 -26 260c-30 126 -87 191 -175 192c-22 -29 -53 -34 -59 -34c-2 0 -10 0 -10 8c0 15 61 76 130 76c209 0 214 -361 214 -466c0 -28 -1 -82 -4 -120z"
            },
            Z: {
                x: 830,
                d: "M481 351l-290 -265c19 4 43 4 49 4c53 0 128 -10 178 -16c92 -12 127 -12 157 -12c31 35 41 69 47 88c9 29 69 58 88 58c5 0 9 -1 9 -7s-18 -77 -79 -131c-32 -29 -91 -70 -164 -70c-49 0 -116 8 -164 15c-46 5 -111 13 -156 13c-16 0 -33 0 -51 -10\nc-13 -8 -34 -18 -47 -18c-7 0 -8 4 -8 7c0 7 19 24 32 35c83 70 155 135 157 137c130 117 177 164 184 172h-91c-17 0 -26 0 -26 9c0 4 9 34 62 34h100c87 89 133 140 186 202c-11 -3 -23 -3 -35 -3c-36 0 -77 8 -127 17c-60 11 -88 11 -97 11c-68 0 -81 -22 -94 -61\nc-9 -27 -69 -56 -88 -56c-8 0 -9 5 -9 8c0 1 8 59 98 116c53 32 113 55 177 55c39 0 75 -7 130 -17c58 -11 83 -11 101 -11c29 22 55 28 62 28s8 -4 8 -7c0 -10 -133 -160 -228 -255c-8 -9 -24 -24 -24 -26c0 -1 14 -2 16 -2c23 -1 65 -6 65 -31c0 -21 -31 -38 -47 -38\nc-5 0 -13 0 -13 10c-1 2 -2 6 -3 7c-6 5 -25 9 -65 10z"
            }
        }
    };
});
/**
 * Created by hn on 14-4-4.
 */
define("font/kf-ams-main", [], function(require) {
    return {
        meta: {
            fontFamily: "KF AMS MAIN",
            x: 911,
            "units-per-em": 1e3,
            attr: 'panose-1="2 0 6 3 0 0 0 0 0 0" ascent="800" descent="-200" x-height="441" cap-height="683" bbox="50 -463 1699 1003" underline-thickness="50" underline-position="-100" unicode-range="U+0021-3009"'
        },
        data: {
            "0": {
                x: 482,
                d: "M432 321c0 -73 -4 -154 -34 -223c-41 -95 -111 -114 -157 -114c-39 0 -116 14 -159 117c-31 76 -32 163 -32 220c0 78 4 171 44 246c38 72 99 94 147 94c52 0 111 -25 148 -95c42 -80 43 -184 43 -245zM241 0c35 0 94 19 115 128c12 59 12 139 12 204\nc0 80 -1 147 -14 204c-19 82 -72 109 -113 109c-39 0 -95 -26 -114 -111c-13 -61 -13 -125 -13 -202c0 -56 0 -142 11 -201c14 -76 52 -131 116 -131z"
            },
            "1": {
                x: 397,
                d: "M229 639v-566c0 -36 2 -47 88 -47h30v-26c-48 1 -98 2 -146 2s-98 -1 -146 -2v26h30c86 0 88 12 88 47v527c-40 -24 -92 -30 -123 -30c0 21 0 23 1 25s6 2 9 2c56 2 115 17 154 64c14 0 15 -1 15 -22z"
            },
            "2": {
                x: 476,
                d: "M426 155l-24 -155h-352v23l199 225c57 65 108 140 108 227c0 91 -57 160 -144 160c-61 0 -119 -42 -138 -127c4 2 10 3 16 3c14 0 40 -9 40 -40c0 -35 -30 -41 -40 -41c-12 0 -41 5 -41 44c0 90 67 187 177 187c105 0 199 -68 199 -186c0 -99 -71 -167 -132 -225\nc-85 -82 -155 -153 -191 -192h192c14 0 86 0 91 8c4 6 12 18 22 89h18z"
            },
            "3": {
                x: 492,
                d: "M238 340h-49c-20 0 -21 1 -21 8s4 8 11 9c4 0 27 2 32 2c33 3 67 5 97 44c34 44 38 94 38 122c0 96 -66 113 -101 113s-114 -12 -143 -78c4 2 9 2 13 2c21 0 39 -13 39 -39s-18 -39 -39 -39c-13 0 -39 6 -39 41c0 80 80 136 171 136c90 0 169 -57 169 -135\nc0 -91 -73 -159 -149 -175c95 -11 175 -81 175 -178c0 -102 -85 -189 -196 -189c-106 0 -196 72 -196 164c0 37 26 45 43 45c20 0 42 -13 42 -42c0 -26 -18 -42 -42 -42c-5 0 -10 0 -15 2c27 -77 113 -103 166 -103c58 0 122 46 122 166c0 89 -39 166 -128 166z"
            },
            "4": {
                x: 518,
                d: "M366 647v-451h102v-26h-102v-98c0 -36 2 -46 72 -46h19v-26c-32 2 -86 2 -120 2s-88 0 -120 -2v26h19c70 0 72 10 72 46v98h-258v26l297 473c18 0 19 -1 19 -22zM311 581l-241 -385h241v385z"
            },
            "5": {
                x: 476,
                d: "M123 585v-225c34 36 77 55 128 55c97 0 175 -93 175 -213c0 -129 -98 -218 -201 -218c-106 0 -175 91 -175 178c0 28 15 42 38 42c19 0 38 -11 38 -38c0 -31 -25 -38 -38 -38c-4 0 -12 2 -16 3c18 -77 85 -123 151 -123c43 0 82 21 107 62c30 46 30 104 30 136\nc0 171 -75 193 -110 193c-50 0 -94 -19 -126 -64c-5 -7 -7 -9 -12 -9c-10 0 -10 5 -10 23v290c0 20 1 21 6 21c1 0 3 0 14 -5c49 -22 94 -26 124 -26c50 0 91 12 126 27c8 4 10 4 11 4c6 0 6 -5 6 -13c-29 -29 -80 -79 -173 -79c-42 0 -83 13 -93 17z"
            },
            "6": {
                x: 482,
                d: "M118 345v-34c25 70 70 110 131 110c102 0 183 -91 183 -216c0 -134 -92 -221 -189 -221c-80 0 -193 60 -193 332c0 221 125 345 244 345c69 0 119 -36 119 -99c0 -34 -27 -38 -36 -38c-14 0 -36 9 -36 36c0 35 30 35 46 35c-20 39 -71 43 -92 43\nc-65 0 -177 -54 -177 -293zM243 8c46 0 78 23 100 64c21 40 21 80 21 134c0 50 0 91 -18 130c-33 69 -82 69 -99 69c-93 0 -127 -104 -127 -176c0 -37 0 -221 123 -221z"
            },
            "7": {
                x: 505,
                d: "M455 623l-138 -205c-46 -69 -74 -177 -74 -341v-46c0 -13 0 -47 -36 -47s-36 34 -36 46c0 131 51 281 125 392l111 165h-220c-17 0 -91 0 -97 -8c-12 -19 -19 -70 -22 -89h-18l29 187h18c4 -19 6 -32 123 -32h235v-22z"
            },
            "8": {
                x: 492,
                d: "M289 360l52 -37c40 -27 101 -69 101 -160c0 -102 -90 -179 -197 -179c-97 0 -195 64 -195 167c0 110 105 165 150 188c-27 19 -69 49 -79 59c-39 38 -45 81 -45 106c0 91 80 157 171 157c81 0 169 -53 169 -144c0 -77 -64 -125 -127 -157zM158 448l105 -71\nc8 -6 9 -6 10 -6c5 0 109 53 109 146c0 65 -58 121 -137 121c-72 0 -135 -46 -135 -107c0 -47 40 -78 48 -83zM342 243l-125 85c-69 -31 -130 -97 -130 -176s69 -144 160 -144c84 0 158 56 158 130c0 61 -48 94 -63 105z"
            },
            "9": {
                x: 482,
                d: "M364 296v39c-10 -33 -47 -111 -131 -111c-102 0 -183 92 -183 216c0 134 95 221 194 221c76 0 188 -57 188 -331c0 -220 -117 -346 -232 -346c-72 0 -131 31 -131 99c0 34 27 38 36 38c14 0 36 -9 36 -36c0 -22 -15 -36 -36 -36c-3 0 -6 1 -9 1c23 -39 79 -42 102 -42\nc75 0 166 68 166 288zM235 240c95 0 127 106 127 177c0 40 0 221 -118 221c-58 0 -84 -34 -98 -55c-28 -44 -28 -85 -28 -144c0 -49 0 -95 21 -134c31 -60 69 -65 96 -65z"
            },
            A: {
                x: 772,
                d: "M186 111l350 586c9 15 15 17 25 17c11 0 15 -2 17 -22l61 -624c3 -30 4 -39 59 -39c15 0 24 0 24 -10c0 -19 -11 -19 -18 -19c-1 0 -45 2 -106 2h-57c-17 0 -37 -2 -54 -2c-6 0 -15 0 -15 11c0 18 11 18 22 18c16 0 67 2 67 32c0 19 -12 123 -15 149c-1 9 -1 17 -2 26\nh-255l-76 -126c-13 -22 -19 -33 -19 -47c0 -24 19 -32 42 -34c6 0 14 -1 14 -10c0 -19 -12 -19 -18 -19c-28 0 -60 2 -89 2c-18 0 -63 -2 -81 -2c-7 0 -12 4 -12 10c0 18 8 18 19 19c48 3 82 23 117 82zM306 265h235l-34 336z"
            },
            B: {
                x: 795,
                d: "M368 615l-62 -250h144c132 0 213 103 213 184c0 9 0 105 -113 105h-130c-39 0 -43 -2 -52 -39zM537 357c81 -8 153 -58 153 -140c0 -101 -118 -217 -271 -217h-343c-20 0 -26 0 -26 11c0 18 10 18 29 18c70 0 72 10 81 45l135 538c4 15 4 21 4 23c0 11 0 19 -61 19\nc-15 0 -24 0 -24 10c0 19 9 19 28 19h321c113 0 182 -60 182 -138c0 -92 -99 -168 -208 -188zM395 29c124 0 211 102 211 198c0 8 0 118 -118 118h-188l-70 -282c-2 -9 -4 -15 -4 -22c0 -8 1 -10 12 -11c6 -1 8 -1 22 -1h135z"
            },
            C: {
                x: 797,
                d: "M747 695l-63 -255c-4 -18 -5 -19 -16 -19c-3 0 -13 0 -13 9c0 4 3 26 3 52c0 102 -49 193 -159 193c-95 0 -189 -56 -244 -120c-113 -131 -123 -305 -123 -337c0 -142 92 -210 198 -210c100 0 235 75 281 231c2 4 3 10 12 10c3 0 11 0 11 -9c0 -8 -26 -105 -113 -178\nc-58 -49 -128 -83 -208 -83c-146 0 -263 104 -263 271c0 235 224 454 440 454c75 0 130 -34 165 -94l69 84c8 10 12 10 14 10s9 0 9 -9z"
            },
            D: {
                x: 842,
                d: "M160 74l135 538c4 15 4 21 4 23c0 11 0 19 -61 19c-15 0 -24 0 -24 10c0 19 9 19 28 19h321c143 0 229 -107 229 -251c0 -223 -197 -432 -399 -432h-317c-20 0 -26 0 -26 11c0 18 10 18 29 18c70 0 72 10 81 45zM371 615l-138 -552c-2 -9 -4 -15 -4 -22\nc0 -8 1 -10 12 -11c6 -1 8 -1 22 -1h114c115 0 191 69 219 102c97 110 117 284 117 334c0 138 -86 189 -180 189h-110c-39 0 -43 -2 -52 -39z"
            },
            E: {
                x: 807,
                d: "M699 232l-91 -215c-7 -16 -8 -17 -30 -17h-502c-20 0 -26 0 -26 11c0 18 10 18 29 18c70 0 72 10 81 45l135 540c3 11 4 15 4 20c0 11 0 18 -62 18c-17 0 -24 0 -24 11c0 18 10 18 29 18h488c18 0 27 0 27 -11c0 -2 -2 -12 -2 -15l-21 -175c-2 -18 -6 -22 -13 -22\nc-6 0 -11 3 -11 11c0 2 1 8 2 12c4 33 4 61 4 62c0 76 -25 109 -148 109h-143c-41 0 -43 -3 -52 -38l-62 -246h95c89 0 109 22 129 99c4 14 5 18 14 18c6 0 10 -5 10 -10l-57 -232c-4 -14 -5 -21 -14 -21c-6 0 -11 3 -11 10c0 3 1 7 3 11c7 30 7 39 7 49c0 30 -6 47 -84 47\nh-99l-69 -276c-2 -9 -4 -15 -4 -22c0 -8 1 -10 12 -11c6 -1 8 -1 22 -1h146c160 0 203 60 262 200c9 20 9 22 11 23c3 3 5 4 9 4c6 0 10 -5 10 -10c0 -4 -3 -11 -4 -14z"
            },
            F: {
                x: 793,
                d: "M301 326l-64 -255c-2 -7 -4 -15 -4 -20c0 -15 2 -22 81 -22c22 0 28 0 28 -11c0 -18 -12 -18 -21 -18c-22 0 -46 2 -68 2h-130c-19 0 -39 -2 -58 -2c-6 0 -15 0 -15 11c0 18 10 18 29 18c70 0 72 10 81 45l135 540c3 11 4 15 4 20c0 11 0 18 -62 18c-17 0 -24 0 -24 11\nc0 18 10 18 29 18h474c18 0 27 0 27 -11c0 -2 -2 -12 -2 -15l-21 -175c-2 -18 -6 -22 -13 -22c-6 0 -11 3 -11 11c0 4 2 17 3 21c3 26 3 48 3 54c0 71 -18 108 -143 108h-134c-41 0 -43 -3 -52 -38l-65 -259h91c87 0 107 21 128 96c4 17 5 21 14 21c7 0 10 -6 10 -10\nl-58 -233c-4 -16 -5 -20 -13 -20c-7 0 -11 4 -11 11c0 2 1 7 3 11c5 22 7 36 7 49c0 29 -6 46 -82 46h-96z"
            },
            G: {
                x: 796,
                d: "M746 695l-63 -255c-4 -18 -5 -19 -16 -19c-3 0 -13 0 -13 9c0 14 4 36 4 52c0 92 -42 193 -160 193c-88 0 -181 -49 -244 -121c-97 -113 -121 -266 -121 -333c0 -173 125 -213 202 -213c59 0 138 23 176 79c19 30 38 131 38 132c0 15 0 23 -79 23h-25c0 1 -8 1 -8 11\nc0 18 12 18 21 18c41 0 85 -2 127 -2h54c18 0 37 2 54 2c3 0 13 0 13 -10c0 -19 -12 -19 -16 -19c-55 -1 -57 -4 -67 -42c-7 -30 -11 -44 -19 -77l-16 -64c-5 -18 -13 -53 -14 -55c-1 0 -2 -3 -7 -3c-7 0 -29 27 -40 65c-50 -63 -141 -87 -213 -87c-150 0 -264 106 -264 271\nc0 236 225 454 439 454c15 0 58 0 101 -27c39 -23 59 -58 64 -66l69 83c8 10 12 10 14 10s9 0 9 -9z"
            },
            H: {
                x: 912,
                d: "M752 610l-137 -547c-2 -8 -2 -15 -2 -16c0 -10 0 -18 61 -18c15 0 24 0 24 -10c0 -19 -11 -19 -19 -19c-19 0 -40 2 -59 2h-118c-19 0 -40 -2 -58 -2c-3 0 -14 0 -14 10c0 19 9 19 21 19c59 1 75 1 86 31c2 6 53 215 70 281h-303l-69 -278c-2 -8 -2 -15 -2 -16\nc0 -10 0 -18 61 -18c15 0 24 0 24 -10c0 -19 -11 -19 -19 -19c-19 0 -40 2 -59 2h-118c-19 0 -40 -2 -58 -2c-3 0 -14 0 -14 10c0 19 7 19 30 19c69 0 71 10 80 45l135 538c4 15 4 21 4 23c0 11 0 19 -60 19c-19 0 -26 0 -26 10c0 19 12 19 19 19c19 0 40 -2 59 -2h118\nc19 0 40 2 58 2c6 0 15 0 15 -11c0 -18 -10 -18 -28 -18c-71 0 -73 -10 -82 -44l-60 -240h302l61 242c4 15 4 21 4 23c0 11 0 19 -60 19c-19 0 -26 0 -26 10c0 19 12 19 19 19c19 0 40 -2 59 -2h118c19 0 40 2 58 2c6 0 15 0 15 -11c0 -18 -10 -18 -28 -18\nc-71 0 -73 -10 -82 -44z"
            },
            I: {
                x: 541,
                d: "M377 609l-135 -537c-4 -16 -4 -21 -4 -23c0 -12 0 -20 62 -20c22 0 28 0 28 -11c0 -18 -12 -18 -20 -18c-20 0 -42 2 -62 2h-123c-18 0 -40 -2 -58 -2c-5 0 -15 0 -15 10c0 19 9 19 31 19c73 0 75 10 84 45l135 539c2 9 4 15 4 22c0 11 0 19 -62 19c-20 0 -28 0 -28 10\nc0 19 11 19 19 19c20 0 43 -2 63 -2h123c18 0 40 2 58 2c3 0 14 0 14 -10c0 -19 -8 -19 -30 -19c-73 0 -75 -10 -84 -45z"
            },
            J: {
                x: 640,
                d: "M505 614l-118 -471c-24 -95 -122 -164 -213 -164c-72 0 -124 44 -124 107c0 65 42 75 60 75c30 0 40 -21 40 -37c0 -29 -26 -58 -59 -58c-4 0 -9 1 -13 2c12 -53 60 -69 94 -69c48 0 115 49 141 151l115 457c4 16 4 23 4 24c0 15 0 23 -80 23h-25c0 1 -8 1 -8 11\nc0 18 12 18 21 18c42 0 86 -2 128 -2h55c18 0 37 2 54 2c4 0 13 0 13 -11c0 -18 -10 -18 -26 -18c-49 0 -51 -10 -59 -40z"
            },
            K: {
                x: 928,
                d: "M504 404l139 -330c15 -36 28 -44 65 -45c10 0 19 0 19 -10c0 -19 -11 -19 -17 -19c-15 0 -32 2 -47 2h-48c-35 0 -72 -2 -107 -2c-3 0 -14 0 -14 10c0 19 10 19 19 19s49 1 49 31c0 7 -2 13 -5 19c-41 98 -94 226 -123 290l-152 -119l-39 -155c-4 -16 -10 -41 -10 -48\nc0 -10 0 -18 61 -18c15 0 24 0 24 -10c0 -19 -11 -19 -19 -19c-19 0 -40 2 -59 2h-117c-19 0 -39 -2 -58 -2c-6 0 -15 0 -15 11c0 18 10 18 29 18c70 0 72 10 81 45l135 538c4 15 4 21 4 23c0 11 0 19 -61 19c-15 0 -24 0 -24 10c0 19 11 19 19 19c18 0 40 -2 58 -2h118\nc19 0 40 2 58 2c5 0 15 0 15 -10c0 -19 -9 -19 -28 -19c-71 0 -73 -10 -82 -44l-83 -330l392 305c8 6 38 30 38 50c0 14 -13 18 -24 19c-6 0 -13 1 -13 11c0 18 12 18 19 18c30 0 63 -2 94 -2h38c11 0 23 2 34 2c8 0 11 -5 11 -11c0 -17 -10 -17 -17 -18\nc-69 -6 -113 -41 -247 -145l-97 -76c-17 -13 -18 -14 -18 -15c0 -3 4 -11 5 -14z"
            },
            L: {
                x: 685,
                d: "M371 606l-136 -543c-2 -9 -4 -15 -4 -22c0 -8 1 -10 12 -11c6 -1 8 -1 22 -1h96c169 0 214 113 246 201c8 19 8 21 10 22c2 4 7 4 8 4c5 0 10 -4 10 -10c0 -3 -2 -9 -4 -14l-77 -213c-7 -18 -8 -19 -30 -19h-448c-20 0 -26 0 -26 11c0 18 10 18 29 18c70 0 72 10 81 45\nl135 538c4 15 4 21 4 23c0 11 0 19 -61 19c-15 0 -24 0 -24 10c0 19 11 19 19 19c19 0 41 -2 60 -2h134c20 0 43 2 63 2c4 0 15 0 15 -10c0 -19 -7 -19 -34 -19c-88 0 -91 -10 -100 -48z"
            },
            M: {
                x: 1069,
                d: "M909 610l-137 -547c-2 -8 -2 -15 -2 -16c0 -10 0 -18 61 -18c15 0 24 0 24 -10c0 -19 -11 -19 -19 -19c-17 0 -38 2 -55 2h-118c-17 0 -37 -2 -54 -2c-6 0 -15 0 -15 11c0 18 10 18 29 18c70 0 72 10 81 45l145 579h-1l-402 -636c-5 -9 -10 -17 -21 -17\nc-9 0 -10 3 -13 27l-83 621h-1l-138 -551c-4 -14 -4 -15 -4 -25c0 -36 32 -42 65 -43c4 0 14 -1 14 -10c0 -19 -11 -19 -18 -19c-14 0 -31 2 -45 2h-48c-20 0 -71 -2 -91 -2c-4 0 -13 0 -13 11c0 17 12 18 15 18c67 3 90 25 102 73l128 510c4 15 4 21 4 23c0 11 0 19 -61 19\nc-15 0 -24 0 -24 10c0 19 9 19 28 19h124c26 0 27 0 30 -22l75 -572l365 577c11 16 12 17 37 17h120c19 0 26 0 26 -10c0 -19 -9 -19 -28 -19c-71 0 -73 -10 -82 -44z"
            },
            N: {
                x: 912,
                d: "M744 578l-140 -558c-4 -17 -5 -20 -15 -20c-9 0 -11 6 -16 18l-238 593c-4 9 -4 11 -10 21l-135 -535c-2 -8 -4 -17 -4 -25c0 -36 32 -42 65 -43c4 0 14 -1 14 -10c0 -19 -11 -19 -18 -19c-14 0 -31 2 -45 2h-48c-20 0 -71 -2 -91 -2c-3 0 -13 0 -13 10c0 18 10 19 15 19\nc66 3 90 24 102 73l133 530c1 3 3 11 3 13c0 9 -59 9 -64 9c-19 0 -26 0 -26 10c0 19 9 19 29 19h122c22 0 23 -1 30 -17l214 -532l113 451c3 14 4 17 4 26c0 18 -4 41 -64 43c-7 0 -15 0 -15 10c0 19 12 19 18 19c14 0 32 -2 46 -2h48c20 0 71 2 91 2c4 0 13 0 13 -11\nc0 -17 -12 -18 -15 -18c-76 -3 -92 -33 -103 -76z"
            },
            O: {
                x: 778,
                d: "M728 438c0 -240 -219 -459 -429 -459c-145 0 -249 107 -249 264c0 231 216 461 430 461c140 0 248 -101 248 -266zM305 2c74 0 165 47 238 149c67 95 105 234 105 323c0 144 -85 208 -173 208c-67 0 -151 -36 -224 -124c-82 -100 -115 -249 -115 -340\nc0 -156 87 -216 169 -216z"
            },
            P: {
                x: 793,
                d: "M299 318l-64 -255c-1 -5 -2 -12 -2 -17c0 -10 1 -17 61 -17c15 0 24 0 24 -10c0 -19 -11 -19 -19 -19c-19 0 -40 2 -59 2h-117c-19 0 -39 -2 -58 -2c-6 0 -15 0 -15 11c0 18 10 18 29 18c70 0 72 10 81 45l135 538c4 15 4 21 4 23c0 11 0 19 -61 19c-15 0 -24 0 -24 10\nc0 19 9 19 28 19h309c126 0 192 -71 192 -149c0 -114 -138 -216 -276 -216h-168zM371 615l-68 -273h141c91 0 139 38 156 56c46 46 59 131 59 157c0 75 -62 99 -137 99h-99c-39 0 -43 -2 -52 -39z"
            },
            Q: {
                x: 778,
                d: "M428 6c5 -77 18 -112 69 -112c44 0 96 36 118 99c3 11 5 16 11 16c5 0 9 -4 9 -10s-44 -193 -163 -193c-80 0 -80 75 -80 104c0 19 0 24 6 84c-32 -10 -65 -15 -99 -15c-145 0 -249 107 -249 264c0 231 216 461 430 461c140 0 248 -101 248 -266\nc0 -181 -128 -363 -300 -432zM248 11c-4 7 -8 22 -8 33c0 49 46 103 100 103c66 0 80 -60 85 -111c188 110 223 358 223 432c0 130 -70 214 -174 214c-78 0 -177 -51 -251 -165c-66 -101 -92 -234 -92 -304c0 -92 38 -175 117 -202zM400 23c1 6 1 14 1 20\nc0 50 -11 84 -61 84c-45 0 -80 -46 -80 -82c0 -44 35 -44 45 -44c28 0 59 6 95 22z"
            },
            R: {
                x: 793,
                d: "M371 615l-66 -263h113c201 0 227 147 227 198c0 78 -64 104 -150 104h-72c-39 0 -43 -2 -52 -39zM510 340c38 -12 97 -43 97 -116c0 -8 0 -12 -5 -49c-1 -5 -13 -96 -13 -120c0 -45 16 -56 41 -56s66 18 90 89c2 8 4 14 12 14c6 0 11 -3 11 -10c0 -14 -35 -113 -116 -113\nc-67 0 -125 33 -125 104c0 19 3 30 14 76c7 26 17 65 17 80c0 33 -18 93 -113 93h-120l-67 -269c-2 -8 -2 -15 -2 -16c0 -10 0 -18 61 -18c15 0 24 0 24 -10c0 -19 -11 -19 -19 -19c-18 0 -39 2 -57 2h-118c-19 0 -40 -2 -58 -2c-3 0 -14 0 -14 10c0 19 7 19 30 19\nc69 0 71 10 80 45l135 538c4 15 4 21 4 23c0 11 0 19 -60 19c-19 0 -26 0 -26 10c0 19 9 19 29 19h271c139 0 218 -72 218 -150c0 -86 -97 -166 -221 -193z"
            },
            S: {
                x: 684,
                d: "M634 695l-54 -220c-4 -16 -5 -19 -14 -19c-3 0 -11 0 -11 9c0 4 5 31 5 57c0 95 -46 155 -144 155c-95 0 -180 -86 -180 -170c0 -34 13 -58 30 -75c18 -16 27 -19 94 -37c92 -24 110 -29 131 -50c38 -37 48 -74 48 -116c0 -125 -118 -250 -247 -250\nc-93 0 -145 40 -169 76l-46 -60c-12 -15 -13 -16 -17 -16c-2 0 -10 0 -10 9c0 1 4 14 4 15l51 205c4 17 5 19 14 19c8 0 10 -5 10 -9c0 -2 -1 -7 -1 -10c-3 -10 -7 -34 -7 -53c0 -112 91 -147 173 -147c100 0 186 96 186 189c0 47 -20 70 -24 75c-21 22 -34 26 -85 40\nc-30 7 -89 23 -100 27c-49 17 -94 61 -94 136c0 113 115 229 242 229c42 0 108 -11 141 -76c1 1 42 53 48 60c12 15 13 16 17 16c2 0 9 0 9 -9z"
            },
            T: {
                x: 768,
                d: "M443 610l-134 -533c-4 -16 -4 -23 -4 -24c0 -15 0 -24 90 -24c26 0 33 0 33 -10c0 -19 -10 -19 -21 -19c-25 0 -52 2 -77 2h-156c-25 0 -51 -2 -76 -2c-5 0 -16 0 -16 10c0 19 7 19 32 19c106 0 108 10 118 49l134 537c5 18 5 20 5 23c0 11 -10 11 -34 11h-67\nc-133 0 -154 -56 -196 -177c-4 -13 -6 -17 -14 -17c-6 0 -10 5 -10 10c0 1 3 12 4 14l61 180c6 18 7 19 30 19h547c20 0 26 0 26 -11c0 -3 0 -5 -2 -14l-29 -177c-3 -16 -3 -21 -13 -21c-6 0 -10 6 -10 10l1 12c6 37 10 75 10 90c0 78 -47 82 -147 82c-21 0 -54 0 -62 -2\nc-15 -4 -17 -13 -23 -37z"
            },
            U: {
                x: 771,
                d: "M488 230l89 355c4 14 4 17 4 26c0 18 -4 41 -64 43c-7 0 -15 0 -15 10c0 19 12 19 18 19c1 0 33 -2 95 -2h47c14 0 32 2 46 2c4 0 13 0 13 -11c0 -9 -4 -17 -12 -18c-88 -4 -96 -37 -109 -89l-38 -150c-7 -26 -28 -114 -38 -150c-6 -27 -15 -62 -22 -79\nc-51 -127 -163 -207 -264 -207c-109 0 -188 79 -188 189c0 27 6 54 9 65l87 350c5 17 12 46 12 52c0 11 0 19 -60 19c-19 0 -26 0 -26 10c0 19 12 19 19 19c19 0 40 -2 59 -2h118c19 0 40 2 58 2c6 0 15 0 15 -11c0 -18 -10 -18 -28 -18c-71 0 -73 -10 -82 -44l-98 -393\nc-11 -44 -11 -74 -11 -78c0 -83 49 -131 121 -131c94 0 210 82 245 222z"
            },
            V: {
                x: 799,
                d: "M615 572l-361 -574c-10 -16 -15 -19 -27 -19c-14 0 -14 3 -17 24l-80 617c-3 25 -6 34 -57 34c-16 0 -23 0 -23 11c0 18 12 18 18 18c1 0 31 -2 104 -2h56c17 0 37 2 54 2c3 0 14 0 14 -10c0 -19 -9 -19 -24 -19c-11 0 -63 -2 -63 -31l70 -539l314 498c1 1 15 24 15 39\nc0 12 -4 30 -41 33c-4 0 -13 1 -13 10c0 19 10 19 18 19c28 0 58 -2 87 -2c18 0 61 2 79 2c9 0 11 -6 11 -10c0 -18 -8 -18 -18 -19c-51 -4 -82 -28 -116 -82z"
            },
            W: {
                x: 1073,
                d: "M900 572l-329 -574c-8 -14 -11 -19 -21 -19c-12 0 -13 6 -14 23l-37 517l-298 -521c-9 -15 -11 -19 -21 -19c-12 0 -13 6 -14 23l-44 614c-2 32 -3 38 -50 38c-14 0 -22 0 -22 10c0 19 12 19 18 19c15 0 33 -2 48 -2h52c36 0 73 2 108 2c6 0 15 0 15 -11\nc0 -18 -11 -18 -22 -18c-68 -1 -68 -26 -68 -37l37 -516l259 455l-3 36c-4 61 -4 62 -50 62c-17 0 -24 0 -24 10c0 19 12 19 18 19c15 0 33 -2 48 -2h52c36 0 73 2 108 2c5 0 15 0 15 -10c0 -19 -10 -19 -23 -19c-56 -1 -67 -20 -67 -32l36 -521l273 478c10 17 14 24 14 37\nc0 31 -32 37 -52 38c-6 0 -14 1 -14 10c0 19 12 19 18 19c29 0 60 -2 90 -2c66 0 73 2 75 2c3 0 12 0 12 -11c0 -16 -9 -17 -18 -18c-60 -6 -82 -43 -105 -82z"
            },
            X: {
                x: 913,
                d: "M500 406l175 188c11 12 13 22 14 29l1 2c0 19 -17 27 -33 29c-6 0 -13 1 -13 11c0 18 12 18 19 18c31 0 66 -2 98 -2h46c14 0 29 2 43 2c4 0 13 0 13 -11c0 -17 -10 -17 -20 -18c-81 -5 -121 -46 -164 -91c-9 -10 -32 -35 -42 -45l-127 -136l132 -310\nc17 -37 19 -42 79 -43c9 0 19 0 19 -10c0 -19 -11 -19 -18 -19c-17 0 -36 2 -54 2h-110c-17 0 -37 -2 -54 -2c-5 0 -15 0 -15 10c0 18 11 19 17 19c32 2 54 20 54 29c0 1 -4 11 -5 13l-105 246c-22 -22 -75 -80 -97 -103l-89 -97c-29 -30 -41 -42 -41 -59\nc0 -16 13 -27 33 -29c6 0 13 -1 13 -11c0 -18 -12 -18 -19 -18c-31 0 -66 2 -98 2h-47c-14 0 -29 -2 -43 -2c-11 0 -12 7 -12 10c0 18 8 18 20 19c74 4 117 42 153 81l217 232l-119 278c-10 24 -14 34 -72 34c-13 0 -22 0 -22 10c0 19 10 19 18 19c1 0 45 -2 106 -2h58\nc17 0 37 2 54 2c6 0 15 0 15 -11c0 -17 -11 -18 -17 -18c-12 -1 -42 -5 -55 -29z"
            },
            Y: {
                x: 814,
                d: "M605 572l-251 -289c-9 -10 -9 -12 -15 -33l-36 -144c-5 -20 -13 -52 -13 -59c0 -11 0 -18 62 -18c17 0 24 0 24 -11c0 -18 -12 -18 -19 -18c-18 0 -39 2 -57 2h-118c-19 0 -40 -2 -58 -2c-3 0 -14 0 -14 10c0 19 8 19 25 19c64 1 74 6 82 33c3 10 52 207 52 210\ns-3 14 -4 17l-124 333c-9 23 -18 32 -67 32c-15 0 -24 0 -24 10c0 19 11 19 18 19c17 0 36 -2 54 -2h111c17 0 37 2 54 2c6 0 15 0 15 -11c0 -18 -11 -18 -23 -18s-53 -2 -53 -23c0 -2 0 -4 6 -18l113 -304l238 273c20 23 28 38 28 49c0 6 0 21 -30 23c-3 0 -13 1 -13 10\nc0 19 11 19 18 19c28 0 59 -2 88 -2h41c12 0 25 2 37 2c2 0 12 0 12 -10c0 -17 -9 -18 -20 -19c-35 -3 -72 -14 -116 -59z"
            },
            Z: {
                x: 754,
                d: "M693 652l-549 -621h173c174 0 218 78 260 207c8 25 9 26 17 26c6 0 10 -5 10 -10c0 -4 -2 -11 -3 -14l-70 -221c-6 -18 -7 -19 -30 -19h-427c-19 0 -24 0 -24 8c0 11 4 15 13 26l548 620h-164c-158 0 -207 -69 -244 -177c-4 -13 -6 -17 -14 -17c-7 0 -10 6 -10 10\nc0 2 0 4 3 14l55 180c6 18 7 19 30 19h413c23 0 24 -1 24 -8c0 -10 -5 -16 -11 -23z"
            },
            a: {
                x: 545,
                d: "M311 119l49 196c1 2 4 15 4 16c0 8 -13 90 -79 90c-39 0 -86 -36 -120 -106c-19 -42 -50 -154 -50 -209c0 -59 23 -96 64 -96c47 0 91 43 113 71c14 19 14 21 19 38zM375 375c2 12 10 47 42 47c15 0 26 -11 26 -25c0 -6 -9 -42 -46 -192c-8 -29 -13 -51 -20 -76\nc-9 -39 -12 -50 -12 -73c0 -20 2 -46 31 -46c41 0 60 63 75 122c4 15 5 20 14 20c6 0 10 -4 10 -9c0 -4 -14 -65 -30 -99c-18 -36 -42 -54 -72 -54s-77 17 -87 76c-28 -33 -75 -76 -130 -76c-68 0 -126 58 -126 157c0 148 122 294 235 294c52 0 79 -40 90 -66z"
            },
            b: {
                x: 458,
                d: "M236 669l-73 -291c19 20 66 63 118 63c75 0 127 -65 127 -157c0 -145 -120 -294 -236 -294c-65 0 -122 53 -122 155c0 13 0 30 5 55c4 18 61 245 71 285l24 96c4 18 12 47 12 54c0 10 0 19 -51 19c-10 0 -20 0 -20 10c0 18 7 19 31 21c18 1 33 3 50 4c18 2 54 5 55 5\nc2 0 12 0 12 -10c0 -5 -2 -11 -3 -15zM173 10c46 0 92 48 117 102c25 52 53 165 53 213c0 52 -20 96 -64 96c-68 0 -127 -89 -129 -97c-4 -13 -20 -77 -23 -90c-18 -70 -21 -89 -21 -122c0 -78 35 -102 67 -102z"
            },
            c: {
                x: 478,
                d: "M401 376c-20 43 -75 45 -88 45c-63 0 -117 -54 -143 -101c-36 -68 -53 -165 -53 -200c0 -50 22 -110 91 -110c38 0 133 15 197 100c9 9 10 10 13 10c4 0 10 -5 10 -11c0 -13 -86 -119 -222 -119c-102 0 -156 79 -156 166c0 142 131 285 262 285c69 0 115 -37 115 -85\nc0 -40 -27 -60 -51 -60c-19 0 -34 12 -34 32c0 16 11 31 17 36c14 12 23 12 42 12z"
            },
            d: {
                x: 566,
                d: "M513 669l-141 -560c-7 -28 -7 -49 -7 -53c0 -20 2 -46 31 -46c41 0 60 63 75 122c4 15 5 20 14 20c6 0 10 -4 10 -9c0 -4 -14 -65 -30 -99c-18 -36 -42 -54 -72 -54s-77 17 -87 76c-28 -33 -75 -76 -130 -76c-68 0 -126 58 -126 157c0 148 122 294 235 294\nc52 0 79 -40 90 -66l61 243c1 3 3 11 3 17c0 10 -1 19 -50 19c-14 0 -22 0 -22 10c0 18 7 19 32 21c18 1 33 3 50 4c5 1 54 5 55 5c2 0 12 0 12 -10c0 -5 -2 -11 -3 -15zM311 119l49 196c1 2 4 15 4 16c0 8 -13 90 -79 90c-39 0 -86 -36 -120 -106\nc-19 -42 -50 -154 -50 -209c0 -59 23 -96 64 -96c47 0 91 43 113 71c14 19 14 21 19 38z"
            },
            e: {
                x: 473,
                d: "M184 232h-53c-15 -64 -15 -89 -15 -103c0 -74 30 -119 87 -119c38 0 133 15 197 100c9 9 10 10 13 10c4 0 10 -5 10 -11c0 -13 -86 -119 -222 -119c-91 0 -151 73 -151 178c0 178 151 273 256 273c66 0 104 -40 104 -84c0 -18 -7 -76 -83 -105c-48 -18 -116 -20 -143 -20\nzM136 252h42c42 0 202 0 202 105c0 38 -30 64 -74 64c-32 0 -127 -15 -170 -169z"
            },
            f: {
                x: 595,
                d: "M445 402h-85c-5 -30 -54 -296 -72 -373c-11 -50 -53 -233 -155 -233c-39 0 -83 22 -83 65c0 38 30 55 50 55c19 0 34 -12 34 -32c0 -1 0 -45 -51 -49c18 -19 47 -19 50 -19c50 0 65 73 82 160c23 107 64 333 82 426h-64c-20 0 -26 0 -26 11c0 18 10 18 29 18h67\nc23 131 33 167 51 202c20 39 62 71 105 71c44 0 86 -23 86 -65c0 -38 -30 -55 -50 -55c-19 0 -34 12 -34 32c0 17 12 46 51 50c-10 9 -31 18 -52 18c-26 0 -47 -23 -53 -47c-8 -32 -22 -103 -41 -206h81c18 0 26 0 26 -10c0 -19 -8 -19 -28 -19z"
            },
            g: {
                x: 549,
                d: "M370 127l47 192l3 14c0 6 -13 88 -79 88c-42 0 -87 -40 -116 -96c-22 -45 -52 -157 -52 -210c0 -69 31 -95 64 -95c31 0 73 19 114 72c13 15 15 19 19 35zM432 375c3 27 17 47 41 47c15 0 26 -11 26 -25c0 -2 0 -4 -3 -16l-111 -448c-13 -54 -80 -137 -209 -137\nc-85 0 -126 16 -126 57c0 33 26 53 50 53c22 0 34 -16 34 -32c0 -11 -8 -39 -40 -48c25 -8 50 -10 80 -10c22 0 60 0 101 41c36 35 42 60 56 115l22 90c-18 -20 -65 -62 -118 -62c-64 0 -127 51 -127 155c0 149 124 286 233 286c50 0 78 -37 91 -66z"
            },
            h: {
                x: 580,
                d: "M276 669l-77 -307c41 52 91 79 148 79c76 0 111 -45 111 -105c0 -58 -45 -176 -63 -224c-4 -11 -16 -43 -16 -69c0 -32 16 -33 26 -33c40 0 77 42 100 122c5 17 6 20 15 20c6 0 10 -4 10 -9c0 -6 -35 -153 -128 -153c-48 0 -79 36 -79 81c0 18 5 31 14 55\nc22 60 61 169 61 225c0 40 -14 70 -54 70c-77 0 -122 -60 -141 -89s-19 -30 -30 -72c-5 -22 -11 -43 -16 -65l-45 -181c-5 -11 -18 -24 -35 -24c-10 0 -27 4 -27 26c0 6 0 8 4 23l145 579c1 3 3 11 3 17c0 10 -1 19 -50 19c-14 0 -22 0 -22 10c0 18 7 19 32 21\nc18 1 33 3 50 4c5 1 54 5 55 5c2 0 12 0 12 -10c0 -5 -2 -11 -3 -15z"
            },
            i: {
                x: 356,
                d: "M306 143c0 -7 -36 -153 -128 -153c-48 0 -79 36 -79 81c0 18 6 34 12 50l70 186c8 22 21 55 21 81c0 32 -17 33 -26 33c-39 0 -77 -40 -101 -124c-4 -14 -5 -18 -14 -18c-7 0 -11 5 -11 9c0 8 37 153 129 153c49 0 79 -38 79 -80c0 -19 -7 -37 -10 -45l-70 -186\nc-11 -30 -23 -60 -23 -87c0 -30 14 -33 26 -33c33 0 74 31 100 122c5 17 6 20 15 20c6 0 10 -4 10 -9zM298 624c0 -22 -23 -48 -50 -48c-12 0 -33 8 -33 33c0 26 26 48 49 48c22 0 34 -18 34 -33z"
            },
            j: {
                x: 504,
                d: "M413 317l-93 -370c-25 -100 -116 -151 -185 -151c-41 0 -85 17 -85 58c0 30 24 52 50 52c22 0 34 -16 34 -32c0 -24 -19 -43 -43 -48c19 -10 40 -10 44 -10c55 0 102 56 121 130l95 377c4 18 7 28 7 52c0 35 -11 46 -32 46c-38 0 -88 -31 -128 -128\nc-5 -10 -6 -14 -14 -14c-6 0 -10 4 -10 9c0 7 54 153 155 153c45 0 88 -32 88 -90c0 -4 0 -18 -4 -34zM454 624c0 -26 -26 -48 -49 -48c-22 0 -34 18 -34 33c0 22 23 48 50 48c12 0 33 -8 33 -33z"
            },
            k: {
                x: 546,
                d: "M276 669l-103 -411c37 14 74 52 84 64c71 80 116 119 171 119c45 0 68 -30 68 -59c0 -32 -24 -55 -51 -55c-14 0 -33 8 -33 32c0 20 14 46 51 50c-7 6 -13 12 -36 12c-46 0 -85 -32 -142 -96c-14 -15 -50 -54 -86 -76c92 -12 145 -45 145 -104c0 -12 0 -13 -4 -31\nc-4 -15 -8 -37 -8 -56c0 -38 13 -48 33 -48c51 0 72 70 86 122c4 16 5 20 14 20c6 0 10 -4 10 -9c0 -4 -13 -60 -34 -97c-8 -14 -32 -56 -78 -56c-51 0 -89 39 -89 97c0 5 0 17 4 32c3 15 3 19 3 25c0 48 -43 78 -115 86l-47 -187c-8 -31 -14 -53 -42 -53\nc-10 0 -27 4 -27 26c0 6 0 8 4 23l143 572c5 18 5 20 5 24c0 10 0 19 -51 19c-10 0 -20 0 -20 10c0 18 7 19 31 21c18 1 33 3 50 4c18 2 54 5 55 5c2 0 12 0 12 -10c0 -5 -2 -11 -3 -15z"
            },
            l: {
                x: 311,
                d: "M258 669l-141 -560c-7 -28 -7 -49 -7 -53c0 -14 0 -46 30 -46c40 0 58 53 76 122c4 15 5 20 14 20c6 0 10 -4 10 -9c0 -4 -14 -67 -31 -100c-16 -31 -38 -53 -71 -53c-51 0 -88 40 -88 90c0 16 2 24 5 35l124 496c5 18 5 20 5 24c0 10 0 19 -51 19c-10 0 -20 0 -20 10\nc0 18 7 19 31 21c18 1 33 3 50 4c18 2 54 5 55 5c2 0 12 0 12 -10c0 -5 -2 -11 -3 -15z"
            },
            m: {
                x: 900,
                d: "M229 293l-33 -132l-22 -90c-5 -20 -14 -55 -16 -60c-8 -15 -22 -21 -34 -21c-15 0 -26 11 -26 25c0 5 11 52 18 78c5 18 16 63 20 82l28 108c7 31 17 70 17 92c0 30 -8 46 -31 46c-40 0 -59 -59 -74 -118c-6 -23 -7 -24 -15 -24c-7 0 -11 5 -11 9s14 65 32 101\nc19 38 42 52 71 52c44 0 85 -31 88 -88c18 25 65 88 154 88c75 0 108 -43 111 -97c40 59 94 97 161 97c76 0 111 -45 111 -105c0 -58 -45 -176 -63 -224c-4 -11 -16 -43 -16 -69c0 -32 16 -33 26 -33c40 0 77 42 100 122c5 17 6 20 15 20c6 0 10 -4 10 -9\nc0 -6 -35 -153 -128 -153c-48 0 -79 36 -79 81c0 18 5 31 14 55c22 60 61 169 61 225c0 40 -14 70 -54 70c-110 0 -162 -125 -164 -133l-60 -239c-9 -36 -14 -59 -44 -59c-15 0 -26 11 -26 25c0 4 6 30 10 45c2 11 21 85 29 115l25 103c12 47 12 67 12 73\nc0 40 -14 70 -54 70c-39 0 -73 -16 -99 -40c-37 -32 -62 -82 -64 -88z"
            },
            n: {
                x: 628,
                d: "M229 293l-33 -132l-22 -90c-5 -20 -14 -55 -16 -60c-8 -15 -22 -21 -34 -21c-15 0 -26 11 -26 25c0 5 11 52 18 78c5 18 16 63 20 82l28 108c7 31 17 70 17 92c0 30 -8 46 -31 46c-40 0 -58 -57 -74 -118c-6 -23 -7 -24 -15 -24c-7 0 -11 5 -11 9s14 64 32 100\nc17 34 39 53 71 53c44 0 85 -31 88 -88c18 25 65 88 154 88c76 0 111 -45 111 -105c0 -57 -42 -169 -62 -224c-6 -14 -17 -44 -17 -69c0 -32 16 -33 26 -33c39 0 77 40 100 122c5 17 6 20 15 20c6 0 10 -4 10 -9c0 -6 -35 -153 -128 -153c-48 0 -79 36 -79 81\nc0 18 5 31 14 55c20 54 61 168 61 225c0 40 -14 70 -54 70c-39 0 -73 -16 -99 -40c-37 -32 -62 -82 -64 -88z"
            },
            o: {
                x: 515,
                d: "M465 275c0 -141 -129 -285 -262 -285c-91 0 -153 71 -153 166c0 141 130 285 262 285c91 0 153 -71 153 -166zM204 10c39 0 94 26 135 93c38 61 59 168 59 208c0 70 -38 110 -87 110c-41 0 -97 -26 -142 -103c-28 -50 -52 -152 -52 -198c0 -70 37 -110 87 -110z"
            },
            p: {
                x: 609,
                d: "M124 -127l113 450c4 18 7 28 7 52c0 30 -8 46 -31 46c-40 0 -59 -59 -74 -118c-6 -23 -7 -24 -15 -24c-7 0 -11 5 -11 9s14 65 32 101c19 38 42 52 71 52c40 0 79 -26 87 -76c11 14 65 76 129 76c75 0 127 -65 127 -157c0 -147 -122 -294 -235 -294c-52 0 -79 39 -90 67\nc-6 -23 -51 -195 -51 -207c0 -8 3 -15 49 -15c17 0 24 0 24 -11c0 -18 -12 -18 -18 -18c-21 0 -72 2 -93 2h-43c-13 0 -27 -2 -40 -2c-11 0 -12 8 -12 10c0 19 10 19 22 19c41 0 45 8 52 38zM297 312l-49 -196c-1 -5 -3 -13 -3 -16c0 -4 11 -90 79 -90c46 0 92 48 117 102\nc25 52 53 165 53 213c0 52 -20 96 -64 96c-38 0 -71 -28 -82 -38c-16 -14 -44 -43 -51 -71z"
            },
            q: {
                x: 502,
                d: "M452 431l-139 -562c-3 -13 -4 -14 -4 -19c0 -8 3 -15 50 -15c15 0 23 0 23 -10c0 -19 -12 -19 -18 -19c-15 0 -32 2 -47 2h-102c-14 0 -32 -2 -46 -2c-7 0 -13 3 -13 10c0 19 10 19 21 19c47 1 62 1 71 31l9 36l38 150l-1 1c-21 -23 -65 -63 -118 -63\nc-68 0 -126 58 -126 157c0 148 122 294 235 294c43 0 74 -27 92 -72c19 35 58 71 66 71c5 0 9 -4 9 -9zM311 119l49 196c1 2 4 15 4 16c0 8 -13 90 -79 90c-39 0 -86 -36 -120 -106c-19 -42 -50 -154 -50 -209c0 -59 23 -96 64 -96c47 0 91 43 113 71c14 19 14 21 19 38z\n"
            },
            r: {
                x: 499,
                d: "M412 409c-13 9 -29 12 -45 12c-41 0 -67 -23 -79 -34c-25 -22 -52 -71 -55 -80c-3 -13 -7 -29 -11 -43c-5 -22 -11 -43 -16 -65c-6 -23 -43 -174 -46 -182c-6 -20 -25 -27 -36 -27c-15 0 -26 11 -26 25c0 5 11 52 18 78c5 18 16 63 20 82l28 108c7 31 17 70 17 92\nc0 29 -7 46 -31 46c-40 0 -59 -58 -74 -118c-6 -23 -7 -24 -15 -24c-7 0 -11 5 -11 9c0 5 15 65 32 101c12 22 32 52 71 52c40 0 80 -26 87 -79c42 61 88 79 128 79c50 0 81 -28 81 -60c0 -30 -23 -54 -51 -54c-14 0 -33 8 -33 32c0 22 16 44 47 50z"
            },
            s: {
                x: 462,
                d: "M227 200c-23 5 -97 21 -97 97c0 41 35 144 166 144c78 0 116 -43 116 -85s-28 -53 -42 -53c-9 0 -28 6 -28 27c0 1 2 39 46 39c-10 36 -51 52 -93 52c-95 0 -113 -72 -113 -92c0 -45 43 -54 70 -60c54 -11 78 -16 103 -40c32 -32 32 -60 32 -75c0 -52 -45 -164 -197 -164\nc-80 0 -140 37 -140 96c0 45 29 62 51 62c20 0 34 -11 34 -32c0 -20 -18 -49 -52 -49c-3 0 -5 1 -8 1c20 -55 95 -58 116 -58c116 0 144 81 144 112c0 48 -45 64 -58 68c-6 1 -33 7 -50 10z"
            },
            t: {
                x: 400,
                d: "M229 402l-78 -313c-3 -12 -3 -31 -3 -32c0 -22 2 -47 32 -47c58 0 104 70 125 120c7 16 8 17 9 18c2 4 6 4 8 4c6 0 10 -3 10 -9c0 -7 -54 -153 -155 -153c-56 0 -89 43 -89 90c0 13 3 23 11 58l66 264h-89c-19 0 -26 0 -26 10c0 19 9 19 29 19h94l39 159\nc8 32 31 35 39 35c13 0 26 -9 26 -25c0 -7 0 -9 -4 -23l-37 -146h88c20 0 26 0 26 -11c0 -18 -10 -18 -29 -18h-92z"
            },
            u: {
                x: 601,
                d: "M364 58c-20 -24 -55 -68 -119 -68c-41 0 -118 16 -118 118c0 30 5 68 49 187c15 38 26 67 26 93c0 32 -16 33 -26 33c-38 0 -77 -38 -101 -124c-4 -14 -5 -18 -14 -18c-7 0 -11 5 -11 9c0 8 37 153 129 153c48 0 79 -37 79 -80c0 -20 -5 -33 -17 -65\nc-26 -67 -54 -147 -54 -204c0 -37 10 -82 62 -82c73 0 112 82 113 82c7 35 61 250 71 289c6 25 13 50 42 50c15 0 27 -10 27 -25c0 -3 0 -5 -7 -30l-41 -163c-6 -28 -13 -55 -20 -82c-10 -42 -13 -52 -13 -75c0 -13 0 -46 30 -46c40 0 58 53 76 122c4 15 5 20 14 20\nc6 0 10 -4 10 -9c0 -3 -13 -62 -30 -98c-16 -34 -40 -55 -72 -55c-24 0 -72 12 -85 68z"
            },
            v: {
                x: 530,
                d: "M480 374c0 -57 -57 -384 -223 -384c-9 0 -59 0 -95 31c-31 28 -34 69 -34 91c0 24 0 55 48 183c15 38 26 67 26 93c0 33 -17 33 -26 33c-38 0 -77 -38 -101 -124c-4 -14 -5 -18 -14 -18c-7 0 -11 5 -11 9c0 8 37 153 129 153c49 0 79 -38 79 -80c0 -20 -4 -30 -20 -71\nc-27 -72 -50 -142 -50 -192c0 -37 12 -88 73 -88c120 0 180 234 180 276c0 52 -26 79 -36 88c-4 4 -11 11 -11 23c0 20 22 44 46 44c8 0 40 -4 40 -67z"
            },
            w: {
                x: 748,
                d: "M367 61c-40 -71 -85 -71 -102 -71c-51 0 -137 19 -137 124c0 38 10 79 57 204c17 44 17 65 17 70c0 32 -16 33 -26 33c-37 0 -76 -36 -101 -124c-4 -14 -5 -18 -14 -18c-7 0 -11 5 -11 9c0 8 37 153 129 153c49 0 79 -38 79 -80c0 -20 -5 -33 -17 -64\nc-45 -119 -52 -163 -52 -195c0 -17 0 -92 79 -92c31 0 47 17 58 28c1 2 33 40 33 64c0 22 0 33 4 50c4 22 46 191 56 230c6 24 13 49 42 49c15 0 27 -10 27 -25c0 -4 -9 -39 -14 -59l-42 -168c-4 -17 -13 -52 -13 -81c0 -46 18 -88 74 -88c52 0 89 40 117 101\nc21 47 49 141 49 175c0 52 -26 79 -35 88c-5 4 -12 11 -12 23c0 20 22 44 46 44c9 0 40 -6 40 -67c0 -59 -37 -191 -60 -249c-28 -69 -73 -135 -149 -135c-38 0 -100 11 -122 71z"
            },
            x: {
                x: 586,
                d: "M496 408c-21 13 -49 13 -51 13c-46 0 -80 -44 -95 -104l-35 -136c-16 -66 -20 -82 -20 -104c0 -41 19 -67 54 -67c45 0 103 41 130 129c3 8 4 13 13 13c6 0 10 -4 10 -9c0 -22 -54 -153 -156 -153c-37 0 -87 20 -103 79c-21 -41 -55 -79 -103 -79c-43 0 -90 19 -90 61\nc0 32 26 53 50 53c19 0 34 -12 34 -32c0 -12 -8 -42 -44 -49c21 -13 46 -13 51 -13c53 0 82 55 97 115l34 137c12 48 18 71 18 93c0 24 -9 66 -54 66c-29 0 -96 -21 -130 -132c-2 -4 -4 -10 -12 -10c-7 0 -11 5 -11 9c0 22 54 153 156 153c18 0 80 -4 103 -79\nc9 19 43 79 104 79c42 0 90 -19 90 -61c0 -27 -21 -53 -51 -53c-14 0 -33 8 -33 32c0 19 12 43 44 49z"
            },
            y: {
                x: 551,
                d: "M286 -112c35 49 45 88 60 147l-1 1c-35 -37 -71 -46 -100 -46c-50 0 -118 22 -118 117c0 24 0 57 49 188c15 38 26 67 26 93c0 33 -17 33 -26 33c-39 0 -77 -40 -101 -124c-4 -14 -5 -18 -14 -18c-7 0 -11 5 -11 9c0 8 37 153 129 153c49 0 79 -38 79 -80\nc0 -20 -6 -34 -17 -63c-27 -72 -54 -149 -54 -206c0 -27 5 -82 61 -82c48 0 81 34 101 62c8 11 8 13 13 31l74 294c8 30 29 34 38 34c15 0 27 -10 27 -25c0 -6 -2 -12 -3 -17l-98 -390c-28 -111 -129 -203 -229 -203c-57 0 -100 35 -100 86c0 49 35 61 51 61\nc15 0 34 -8 34 -31s-20 -49 -50 -49c-2 0 -7 0 -10 1c15 -46 63 -48 75 -48c49 0 88 34 115 72z"
            },
            z: {
                x: 517,
                d: "M134 81c9 4 20 4 30 4c13 0 24 0 64 -16c21 -9 41 -16 62 -16c39 0 98 24 120 83c3 10 4 14 12 14c10 0 11 -6 11 -10c0 -23 -56 -150 -154 -150c-32 0 -49 21 -68 43c-20 25 -30 32 -51 32c-37 0 -69 -37 -85 -62c-7 -12 -8 -13 -14 -13s-11 2 -11 8c0 7 37 66 98 128\nl101 93c45 41 99 89 132 128c-5 -1 -9 -1 -16 -1c-10 0 -26 0 -64 16c-21 9 -41 16 -62 16c-19 0 -67 -7 -84 -47c-3 -7 -4 -11 -12 -11c-9 0 -10 6 -10 9c0 21 44 112 117 112c29 0 46 -17 67 -42c19 -24 30 -33 51 -33c26 0 50 21 75 64c5 7 7 11 14 11c2 0 10 0 10 -8\ns-35 -66 -105 -135c-14 -15 -40 -40 -100 -92c-50 -45 -85 -76 -128 -125z"
            },
            "&#x237;": {
                x: 467,
                d: "M413 317l-93 -370c-24 -95 -105 -151 -177 -151c-43 0 -93 15 -93 58c0 30 24 52 50 52c22 0 34 -16 34 -32c0 -7 -5 -39 -41 -48c22 -10 45 -10 50 -10c58 0 96 64 113 130l95 377c4 18 7 28 7 52c0 35 -11 46 -32 46c-36 0 -87 -28 -128 -128c-5 -10 -6 -14 -14 -14\nc-6 0 -10 4 -10 9c0 7 54 153 155 153c45 0 88 -32 88 -90c0 -4 0 -18 -4 -34z"
            },
            "&#x131;": {
                x: 356,
                d: "M306 143c0 -7 -36 -153 -128 -153c-48 0 -79 36 -79 81c0 18 6 34 12 50l70 186c8 22 21 55 21 81c0 32 -17 33 -26 33c-39 0 -77 -40 -101 -124c-4 -14 -5 -18 -14 -18c-7 0 -11 5 -11 9c0 8 37 153 129 153c49 0 79 -38 79 -80c0 -19 -7 -37 -10 -45l-70 -186\nc-11 -30 -23 -60 -23 -87c0 -30 14 -33 26 -33c33 0 74 31 100 122c5 17 6 20 15 20c6 0 10 -4 10 -9z"
            },
            "&#x3b1;": {
                x: 649,
                d: "M473 253v-85c62 82 88 160 101 204c4 18 5 21 14 21c3 0 11 0 11 -9c0 -1 -24 -127 -126 -249c0 -61 0 -125 31 -125c24 0 47 22 56 47c3 8 4 11 12 11c3 0 10 0 10 -9c0 -13 -27 -69 -81 -69c-43 0 -74 28 -88 84c-71 -60 -145 -84 -207 -84c-102 0 -156 79 -156 166\nc0 142 131 285 262 285c106 0 161 -91 161 -188zM410 98c-1 11 -2 16 -2 36c0 25 1 51 1 76c0 84 0 211 -97 211c-45 0 -101 -31 -142 -101c-31 -55 -53 -157 -53 -200c0 -47 20 -110 91 -110c35 0 114 9 202 88z"
            },
            "&#x3b2;": {
                x: 637,
                d: "M587 582c0 -79 -44 -140 -116 -178c16 -12 31 -26 43 -45c21 -32 30 -70 30 -108c0 -149 -135 -261 -278 -261c-59 0 -114 46 -124 102l-70 -280c-1 -5 -6 -6 -13 -6c-5 0 -11 2 -9 10l158 627c26 104 108 262 237 262c91 0 142 -63 142 -123zM413 405c-14 4 -32 6 -50 6\nc-21 0 -36 -2 -46 -9c14 -4 25 -5 35 -5h10c19 0 35 2 51 8zM535 591c0 44 -20 94 -92 94c-97 0 -181 -118 -214 -249l-65 -263c-4 -15 -4 -28 -4 -37c0 -68 38 -126 111 -126c69 0 147 48 180 122c19 43 35 90 35 148c0 50 -14 84 -46 110c-24 -7 -47 -13 -73 -13h-12\nc-23 0 -60 2 -60 24c0 28 48 30 73 30h8c22 0 48 -5 67 -12c65 37 92 117 92 172z"
            },
            "&#x3b3;": {
                x: 613,
                d: "M409 122c33 88 53 133 68 167c30 68 65 136 67 138c2 4 7 4 9 4c9 0 10 -7 10 -8c0 -3 -14 -30 -21 -46c-79 -157 -136 -322 -139 -346c-5 -40 -11 -84 -35 -172c-11 -40 -20 -73 -35 -73c-8 0 -11 9 -11 17c0 28 33 152 52 214c6 20 13 41 13 104c0 99 -20 254 -159 254\nc-69 0 -133 -49 -154 -111c-5 -13 -5 -15 -14 -15c-3 0 -10 0 -10 9c0 26 67 183 190 183c73 0 107 -53 127 -103c38 -90 40 -167 42 -216z"
            },
            "&#x3b4;": {
                x: 504,
                d: "M270 436c-34 66 -59 123 -59 172c0 102 98 102 115 102s31 0 78 -10c35 -8 50 -11 50 -30c0 -16 -15 -37 -36 -37c-13 0 -36 13 -45 19c-30 17 -49 28 -80 28c-44 0 -57 -30 -57 -47c0 -48 60 -125 97 -172c25 -33 67 -88 67 -178c0 -133 -80 -295 -198 -295\nc-80 0 -152 60 -152 167c0 117 92 250 220 281zM281 417c-136 -36 -173 -225 -173 -290c0 -93 56 -119 95 -119c89 0 131 157 131 235c0 65 -15 95 -53 174z"
            },
            "&#x3b5;": {
                x: 421,
                d: "M295 227h-166c-9 -40 -11 -66 -11 -85c0 -97 56 -132 109 -132c30 0 67 12 105 37c5 4 7 5 10 5c6 0 9 -6 9 -12c0 -10 -63 -50 -127 -50c-99 0 -174 75 -174 186c0 157 135 255 258 255h34c18 0 29 0 29 -13c0 -16 -15 -16 -32 -16h-29c-89 0 -148 -55 -173 -146h162\nc18 0 28 0 28 -13c0 -16 -17 -16 -32 -16z"
            },
            "&#x3b6;": {
                x: 521,
                d: "M194 49l92 -32c37 -12 95 -32 95 -102c0 -52 -44 -119 -108 -119c-50 0 -93 38 -93 48c0 2 2 10 10 10c5 0 7 -2 11 -6c25 -25 52 -32 72 -32c37 0 58 39 58 68c0 48 -39 61 -80 75c-13 5 -45 16 -58 20c-52 18 -143 50 -143 187c0 187 146 374 262 434\nc-12 21 -12 42 -12 51c0 8 0 45 16 45c5 0 10 -4 10 -10c0 -3 -4 -17 -4 -35c0 -15 3 -29 9 -42c26 11 43 11 63 11c32 0 77 -1 77 -25c0 -29 -61 -29 -86 -29c-19 0 -42 0 -60 17c-123 -71 -224 -254 -224 -391c0 -75 34 -120 93 -143zM347 593c11 -7 18 -7 39 -7\nc42 0 50 3 62 8c-20 5 -23 6 -55 6c-17 0 -31 0 -46 -7z"
            },
            "&#x3b7;": {
                x: 556,
                d: "M498 277l-115 -458c-8 -30 -29 -34 -38 -34c-15 0 -27 10 -27 25c0 6 2 12 3 17l116 460c5 19 9 35 9 64c0 40 -14 70 -54 70c-39 0 -73 -16 -99 -40c-37 -32 -62 -82 -64 -88l-33 -132l-22 -90c-5 -20 -14 -55 -16 -60c-8 -15 -22 -21 -34 -21c-15 0 -26 11 -26 25\nc0 5 11 52 18 78c5 18 16 63 20 82l28 108c7 31 17 70 17 92c0 30 -8 46 -31 46c-40 0 -59 -59 -74 -118c-6 -23 -7 -24 -15 -24c-7 0 -11 5 -11 9s14 65 32 101c19 38 42 52 71 52c44 0 85 -31 88 -88c18 25 65 88 154 88c76 0 111 -45 111 -105c0 -27 -3 -39 -8 -59z"
            },
            "&#x3b8;": {
                x: 503,
                d: "M453 503c0 -227 -152 -513 -288 -513c-105 0 -115 155 -115 201c0 220 149 513 289 513c82 0 114 -99 114 -201zM150 362h211c29 112 32 162 32 198c0 96 -22 124 -55 124c-44 0 -79 -48 -112 -108c-40 -71 -61 -155 -76 -214zM354 332h-212c-16 -66 -32 -134 -32 -199\nc0 -99 25 -123 56 -123c42 0 77 47 106 98c36 63 57 126 82 224z"
            },
            "&#x3b9;": {
                x: 361,
                d: "M311 143c0 -33 -69 -153 -180 -153c-56 0 -81 42 -81 81c0 34 23 73 32 108c7 25 6 17 13 43c4 12 29 103 30 107c6 19 16 67 23 86c6 16 20 26 36 26c13 0 26 -9 26 -25c0 -8 -38 -169 -88 -305c-5 -14 -16 -44 -16 -68c0 -31 15 -33 27 -33c42 0 123 32 155 129\nc3 9 5 13 13 13c6 0 10 -4 10 -9z"
            },
            "&#x3ba;": {
                x: 580,
                d: "M208 250c66 -3 192 -12 192 -103c0 -11 -3 -23 -5 -33c-4 -15 -8 -37 -8 -56c0 -35 11 -48 33 -48c51 0 73 74 86 122c4 16 5 20 14 20c6 0 10 -4 10 -9c0 -4 -13 -59 -34 -98c-15 -26 -38 -55 -79 -55c-49 0 -88 37 -88 97c0 6 0 17 4 36c3 11 3 14 3 21\nc0 49 -43 81 -170 87c-2 -6 -43 -173 -49 -194c-5 -21 -11 -47 -41 -47c-15 0 -26 11 -26 25c0 6 0 8 3 20l93 371c8 32 30 35 39 35c13 0 26 -9 26 -25l-38 -159c41 13 70 35 128 86c44 37 103 88 163 88c35 0 37 -26 37 -32c0 -19 -18 -49 -50 -49c-10 0 -33 5 -33 32\nc0 7 1 15 5 21c-38 -15 -60 -31 -120 -83c-25 -21 -62 -52 -95 -70z"
            },
            "&#x3bb;": {
                x: 582,
                d: "M306 623l201 -575c4 -12 11 -30 20 -41c4 -4 5 -5 5 -9c0 -8 -7 -8 -11 -8h-19c-28 0 -30 0 -40 9c-14 13 -19 27 -24 42c-31 84 -63 176 -89 254c-91 -108 -234 -283 -250 -298c-6 -6 -17 -8 -21 -8c-16 0 -28 12 -28 26c0 13 8 21 20 33l260 263c8 8 9 9 9 10\nc0 2 -103 301 -113 320c-16 29 -28 31 -43 33c-5 1 -11 2 -11 10c0 10 11 10 17 10c13 0 92 0 117 -71z"
            },
            "&#x3bc;": {
                x: 632,
                d: "M166 22l-47 -186c-7 -28 -13 -51 -42 -51c-15 0 -27 10 -27 25c0 6 2 12 3 17l145 579c8 32 30 35 39 35c13 0 26 -9 26 -25c0 -6 -8 -38 -13 -57l-45 -180c-4 -17 -13 -52 -13 -81c0 -47 18 -88 74 -88c63 0 102 54 114 71c13 16 13 18 18 38l70 278c8 30 29 34 38 34\nc15 0 27 -10 27 -25c0 -4 -11 -47 -17 -71c-5 -18 -16 -63 -20 -82l-28 -108c-7 -30 -16 -66 -16 -89c0 -20 2 -46 31 -46c41 0 60 63 75 122c4 15 5 20 14 20c6 0 10 -4 10 -9c0 -4 -14 -65 -30 -99c-18 -36 -42 -54 -72 -54c-35 0 -77 21 -87 74c-23 -31 -67 -74 -131 -74\nc-34 0 -71 9 -96 32z"
            },
            "&#x3bd;": {
                x: 561,
                d: "M217 431l-99 -401c133 44 270 168 329 377c2 7 9 34 38 34c13 0 26 -9 26 -25c0 -4 -18 -127 -147 -260c-117 -120 -269 -156 -283 -156h-21c-7 0 -10 6 -10 10l88 353c1 4 3 16 3 20c0 11 -3 18 -50 18c-14 0 -22 0 -22 10c0 18 10 19 21 20c15 1 109 10 116 10\nc8 0 11 -6 11 -10z"
            },
            "&#x3be;": {
                x: 517,
                d: "M289 -5l60 -24c32 -14 49 -39 49 -70c0 -43 -39 -105 -103 -105c-54 0 -106 37 -106 48c0 6 5 10 10 10c4 0 5 -1 12 -7c36 -27 69 -31 84 -31c35 0 51 34 51 55c0 16 -8 28 -18 35c-7 4 -48 21 -73 30l-90 36c-36 15 -115 46 -115 133c0 54 44 156 147 212\nc-27 15 -67 48 -67 108c0 65 53 150 173 185c-6 13 -7 27 -7 41c0 8 0 45 16 45c5 0 10 -4 10 -10c0 -3 -4 -17 -4 -35c0 -22 1 -24 6 -36c28 5 43 5 63 5c32 0 80 0 80 -25c0 -29 -61 -29 -86 -29c-21 0 -45 0 -63 21c-79 -37 -115 -115 -115 -170c0 -30 10 -62 34 -82\nc36 12 63 12 83 12c43 0 79 -3 79 -25c0 -29 -59 -29 -90 -29c-18 0 -44 0 -71 8c-3 1 -12 3 -14 3c-21 0 -126 -87 -126 -173c0 -60 60 -84 86 -94zM340 595c11 -9 23 -9 42 -9c42 0 50 3 62 8c-20 5 -23 6 -56 6c-13 0 -31 0 -48 -5zM261 321c18 -8 28 -8 52 -8\nc43 0 52 3 63 8c-22 5 -24 6 -57 6c-12 0 -34 0 -58 -6z"
            },
            "&#x3bf;": {
                x: 515,
                d: "M465 275c0 -141 -129 -285 -262 -285c-91 0 -153 71 -153 166c0 141 130 285 262 285c91 0 153 -71 153 -166zM204 10c39 0 94 26 135 93c38 61 59 168 59 208c0 70 -38 110 -87 110c-41 0 -97 -26 -142 -103c-28 -50 -52 -152 -52 -198c0 -70 37 -110 87 -110z"
            },
            "&#x3c0;": {
                x: 627,
                d: "M283 377l-58 -226c-10 -40 -10 -42 -26 -93c-12 -42 -20 -68 -49 -68c-9 0 -27 5 -27 26c0 6 0 8 8 24c82 175 107 262 129 337h-57c-25 0 -77 0 -129 -82c-5 -6 -6 -9 -13 -9c-6 0 -11 2 -11 8s32 59 58 88c46 49 80 49 103 49h329c18 0 37 0 37 -22\nc0 -32 -33 -32 -46 -32h-112c-21 -90 -21 -161 -21 -167c0 -7 0 -93 27 -162c7 -15 7 -17 7 -22c0 -17 -18 -36 -39 -36c-41 0 -41 108 -41 122c0 80 17 153 44 265h-113z"
            },
            "&#x3c1;": {
                x: 563,
                d: "M53 -173l98 390c33 133 140 224 228 224c69 0 134 -53 134 -160c0 -151 -128 -291 -241 -291c-39 0 -76 21 -96 71c-32 -123 -60 -243 -64 -252c-6 -14 -20 -24 -35 -24s-27 10 -27 25c0 6 2 12 3 17zM271 10c51 0 103 50 133 119c17 42 44 141 44 192\nc0 59 -25 100 -70 100c-15 0 -113 -5 -164 -204c-3 -15 -28 -110 -28 -116c0 -12 17 -91 85 -91z"
            },
            "&#x3c2;": {
                x: 470,
                d: "M240 25l-97 55c-30 17 -93 52 -93 135c0 112 123 226 270 226c40 0 100 -9 100 -30c0 -6 -6 -15 -15 -15c-2 0 -4 0 -11 4c-24 11 -48 21 -79 21c-108 0 -216 -83 -216 -176c0 -63 38 -84 94 -116l56 -31c10 -6 38 -21 48 -28c11 -6 41 -27 41 -71\nc0 -46 -41 -106 -101 -106c-16 0 -58 8 -58 22c0 5 5 9 10 9c2 0 8 -2 10 -3c17 -7 35 -8 38 -8c34 0 48 34 48 55c0 31 -20 42 -45 57z"
            },
            "&#x3c3;": {
                x: 616,
                d: "M520 377h-111c24 -33 33 -71 33 -110c0 -150 -129 -277 -247 -277c-90 0 -145 71 -145 156c0 118 108 285 258 285h221c18 0 37 0 37 -22c0 -32 -33 -32 -46 -32zM196 10c45 0 99 33 135 92c35 58 51 142 51 177c0 77 -48 98 -91 98c-147 0 -183 -199 -183 -259\nc0 -69 37 -108 88 -108z"
            },
            "&#x3c4;": {
                x: 573,
                d: "M311 377l-68 -346c-3 -15 -8 -42 -39 -42c-20 0 -27 14 -27 25c0 3 0 5 5 20l104 343h-83c-25 0 -77 0 -129 -82c-5 -6 -6 -9 -13 -9c-6 0 -11 2 -11 8s32 59 58 88c46 49 80 49 103 49h275c18 0 37 0 37 -22c0 -32 -33 -32 -46 -32h-166z"
            },
            "&#x3c5;": {
                x: 585,
                d: "M535 374c0 -32 -17 -173 -88 -277c-26 -38 -80 -107 -163 -107c-74 0 -155 29 -155 129c0 26 0 52 56 199c17 44 17 65 17 70c0 32 -16 33 -26 33c-37 0 -76 -36 -101 -124c-4 -14 -5 -18 -14 -18c-7 0 -11 5 -11 9c0 8 37 153 129 153c49 0 79 -38 79 -80\nc0 -19 -5 -32 -17 -65c-39 -101 -51 -149 -51 -188c0 -29 7 -54 25 -73c26 -25 66 -25 72 -25c128 0 209 209 209 276c0 52 -26 79 -35 88c-5 4 -12 11 -12 23c0 20 22 44 46 44c9 0 40 -6 40 -67z"
            },
            "&#x3c6;": {
                x: 611,
                d: "M433 685l-59 -242c111 -7 187 -79 187 -180c0 -126 -130 -266 -301 -275l-37 -149c-4 -13 -10 -37 -12 -39c-2 -4 -6 -4 -9 -4c-10 0 -10 6 -10 8c0 4 8 37 22 90c8 31 15 63 23 94c-104 6 -187 72 -187 180c0 125 126 260 290 274c2 0 9 1 10 3c1 1 2 2 5 15l54 215\nc4 17 5 19 14 19c3 0 10 0 10 -9zM368 423l-103 -414c156 12 235 162 235 275c0 98 -66 135 -132 139zM242 8l104 414c-144 -9 -235 -149 -235 -275c0 -110 82 -136 131 -139z"
            },
            "&#x3c7;": {
                x: 651,
                d: "M349 161l226 258c10 11 13 11 16 11c5 0 10 -3 10 -10c0 -4 -1 -5 -9 -14l-237 -270c17 -62 40 -142 66 -209c44 -111 60 -111 73 -111c16 0 42 14 53 42c3 8 4 12 12 12c5 0 11 -2 11 -9c0 -14 -26 -65 -83 -65c-85 0 -106 49 -122 87c-15 37 -15 39 -64 193l-116 -132\nc-26 -30 -88 -104 -116 -132c-3 -3 -6 -5 -10 -5s-9 2 -9 10c0 1 0 5 9 16l236 268c-27 97 -39 139 -63 200c-18 48 -46 120 -75 120c-9 0 -40 -6 -55 -45c-1 -4 -3 -9 -11 -9c-6 0 -11 3 -11 9c0 13 27 65 83 65c35 0 69 -12 87 -28c14 -14 22 -21 53 -107\nc25 -70 19 -62 46 -145z"
            },
            "&#x3c8;": {
                x: 693,
                d: "M493 670l-164 -660c30 0 107 0 191 94c64 72 84 146 84 182c0 52 -27 79 -36 88c-4 4 -11 11 -11 23c0 20 22 44 46 44c10 0 40 -7 40 -67c0 -51 -24 -140 -34 -166c-17 -43 -47 -89 -80 -125c-90 -93 -169 -93 -206 -93c-4 -18 -45 -186 -49 -190c-2 -4 -6 -4 -8 -4\nc-3 0 -11 0 -11 9c0 4 7 32 23 92c8 31 15 63 23 94c-90 7 -170 44 -170 140c0 23 0 45 54 187c17 44 17 66 17 70c0 32 -17 33 -26 33c-37 0 -77 -37 -101 -124c-4 -14 -5 -18 -14 -18c-7 0 -11 5 -11 9c0 8 37 153 129 153c47 0 79 -36 79 -81c0 -18 -5 -31 -18 -67\nc-47 -124 -47 -147 -47 -169c0 -60 31 -102 114 -112l165 662c4 15 5 20 14 20c3 0 11 0 11 -9c0 -1 -4 -14 -4 -15z"
            },
            "&#x3c9;": {
                x: 682,
                d: "M632 376c0 -55 -31 -180 -57 -238c-36 -81 -84 -148 -160 -148c-73 0 -103 53 -111 109c-21 -38 -73 -109 -156 -109c-75 0 -98 74 -98 136c0 96 36 207 87 286c8 12 13 25 29 25c9 0 13 -11 13 -18c0 -2 -7 -12 -17 -27c-18 -25 -83 -116 -83 -220\nc0 -57 18 -116 85 -116c64 0 118 62 137 99c-1 21 12 100 26 122c5 8 13 12 20 12c13 0 17 -9 17 -20c0 -26 -23 -91 -34 -117c11 -56 35 -96 98 -96c52 0 98 47 126 102c16 31 38 88 38 124c0 47 -19 74 -34 91c-8 9 -12 15 -12 24c0 20 23 45 43 45c35 0 43 -37 43 -66z\n"
            },
            "&#x3d1;": {
                x: 620,
                d: "M520 356l28 -7c15 -3 22 -4 22 -11c0 -4 -3 -11 -9 -11c-5 0 -23 4 -46 9c-40 -156 -144 -346 -259 -346c-16 0 -61 1 -94 25c-36 28 -36 73 -36 87c0 13 0 27 8 62l18 73c4 17 13 51 18 73c7 28 11 43 11 65c0 30 -8 46 -31 46c-40 0 -59 -59 -74 -118\nc-6 -23 -7 -24 -15 -24c-7 0 -11 5 -11 9s14 65 32 101c19 38 42 52 71 52c41 0 87 -29 87 -90c0 -16 -5 -36 -10 -54c-8 -35 -3 -14 -12 -48c-7 -30 -13 -52 -19 -77c-8 -35 -13 -59 -13 -82c0 -20 1 -80 73 -80c40 0 74 37 116 118c28 57 49 115 75 227\nc-61 20 -160 68 -160 167c0 74 62 182 144 182c91 0 106 -126 106 -195c0 -34 -2 -76 -20 -153zM456 375c18 80 29 132 29 190c0 56 -5 119 -53 119c-67 0 -120 -96 -120 -161c0 -67 51 -117 144 -148z"
            },
            "&#x3d5;": {
                x: 658,
                d: "M302 44c153 0 281 125 281 239c0 55 -30 104 -95 104c-87 0 -163 -92 -195 -220c-6 -22 -23 -116 -23 -118c0 -5 15 -5 32 -5zM259 -8c-4 -20 -32 -175 -35 -184c-8 -20 -26 -24 -36 -24c-2 0 -26 1 -26 25c0 4 0 6 5 21l52 169c-81 18 -169 79 -169 191\nc0 95 76 241 103 241c2 0 10 0 10 -8c0 -2 0 -4 -11 -17c-58 -72 -79 -179 -79 -206c0 -67 48 -128 163 -150c56 188 117 391 261 391c84 0 111 -74 111 -135c0 -158 -151 -316 -315 -316c-18 0 -28 1 -34 2z"
            },
            "&#x3d6;": {
                x: 872,
                d: "M211 431h574c18 0 37 0 37 -22c0 -14 -10 -26 -22 -30c-6 -2 -33 -2 -50 -2c7 -24 11 -50 11 -75c0 -102 -89 -312 -230 -312c-78 0 -101 60 -101 132c0 12 1 27 2 36l-1 1c-49 -96 -127 -169 -214 -169c-64 0 -85 51 -85 112c0 136 77 236 107 275c-65 0 -75 0 -102 -17\nc-35 -21 -53 -48 -63 -64c-5 -8 -6 -10 -13 -10c-6 0 -11 2 -11 8s32 59 58 88c46 49 80 49 103 49zM727 377h-461c-93 -112 -107 -199 -107 -242c0 -32 7 -91 67 -91c72 0 177 62 228 239c2 5 4 10 12 10c7 0 11 -5 11 -9c0 -1 0 -3 -6 -28c-5 -20 -12 -62 -12 -98\nc0 -80 28 -114 81 -114c110 0 199 148 199 258c0 20 -4 52 -12 75z"
            },
            "&#x3de;": {
                x: 756,
                d: "M519 270l-382 -254c-11 -7 -31 -21 -55 -21c-3 0 -32 1 -32 26c0 15 8 20 25 32l66 44c35 22 35 23 40 26c28 19 98 170 98 224c0 3 0 12 -3 18c-68 0 -115 -23 -123 -41c-4 -7 -6 -12 -14 -12s-12 6 -12 12c0 32 65 108 155 108c28 0 28 -21 28 -45\nc0 -74 -45 -178 -74 -227l383 255c12 8 31 21 55 21c10 0 32 -5 32 -26c0 -10 -6 -16 -7 -18c-5 -5 -61 -42 -99 -68c-31 -21 -32 -22 -52 -52c-49 -78 -72 -172 -72 -188c0 -7 2 -13 4 -18c68 1 113 21 124 41c3 8 5 12 13 12c4 0 12 -2 12 -12c0 -34 -67 -108 -155 -108\nc-16 0 -29 4 -29 45c0 26 10 111 74 226z"
            },
            "&#x3dc;": {
                x: 764,
                d: "M230 251l-78 -309c-5 -18 -6 -19 -17 -22c-14 -3 -32 -3 -36 -3c-7 0 -49 0 -49 12c0 4 1 10 2 14l164 654c16 7 28 8 54 8h390c12 0 28 0 44 -4c13 -3 4 -3 10 -6c-6 -3 3 -3 -10 -6c-16 -4 -32 -4 -44 -4h-347l-78 -314h182c12 0 28 0 44 -4c13 -3 4 -3 10 -6\nc-6 -3 3 -3 -10 -6c-16 -4 -32 -4 -44 -4h-187z"
            },
            "&#x3f5;": {
                x: 496,
                d: "M163 228c-65 -34 -90 -85 -90 -119c0 -71 82 -87 144 -87c119 0 145 40 156 59c4 6 6 9 11 9s9 -4 9 -9c0 -14 -53 -102 -185 -102c-96 0 -158 55 -158 124c0 49 34 103 92 136c-17 12 -41 35 -41 72c0 74 106 141 218 141c69 0 127 -38 127 -56c0 -12 -13 -25 -25 -25\nc-7 0 -10 3 -16 7c-42 31 -78 31 -95 31c-89 0 -187 -36 -187 -98c0 -22 12 -45 43 -60c35 15 65 18 90 18c51 0 70 -7 70 -25c0 -29 -52 -29 -78 -29c-19 0 -53 0 -85 13zM194 240c20 -5 36 -5 54 -5c36 0 38 0 55 8c-16 4 -21 6 -49 6c-7 0 -33 0 -60 -9z"
            },
            "&#x3f1;": {
                x: 518,
                d: "M101 102c-9 -37 -24 -108 -24 -154c0 -59 23 -69 134 -69c97 0 141 0 141 -47c0 -26 -8 -26 -14 -26s-10 3 -10 10c-1 0 0 3 -1 5c-4 8 -25 8 -46 8c-34 0 -61 -4 -96 -4c-135 0 -135 63 -135 97c0 51 15 133 55 291c38 148 149 228 229 228c69 0 134 -53 134 -160\nc0 -149 -126 -291 -242 -291c-55 0 -106 34 -125 112zM227 10c46 0 100 46 132 119c17 42 44 141 44 192c0 59 -25 100 -70 100c-49 0 -100 -49 -127 -103c-36 -70 -53 -168 -53 -203c0 -49 20 -105 74 -105z"
            },
            "&#x3f9;": {
                x: 470,
                d: "M240 25l-97 55c-30 17 -93 52 -93 135c0 112 123 226 270 226c40 0 100 -9 100 -30c0 -6 -6 -15 -15 -15c-2 0 -4 0 -11 4c-24 11 -48 21 -79 21c-108 0 -216 -83 -216 -176c0 -63 38 -84 94 -116l56 -31c10 -6 38 -21 48 -28c11 -6 41 -27 41 -71\nc0 -46 -41 -106 -101 -106c-16 0 -58 8 -58 22c0 5 5 9 10 9c2 0 8 -2 10 -3c17 -7 35 -8 38 -8c34 0 48 34 48 55c0 31 -20 42 -45 57z"
            },
            "&#x211c;": {
                x: 768,
                d: "M577 701l134 -241c1 -1 7 -13 7 -15c0 -5 -2 -7 -5 -10c-2 -1 -111 -65 -167 -83c1 -14 5 -94 7 -114c1 -31 6 -83 6 -112c0 -11 -4 -14 -4 -33c0 -27 12 -60 46 -82c45 37 81 66 86 66c3 0 19 -6 19 -14c0 -4 -1 -5 -13 -15l-72 -56c-19 -14 -21 -14 -34 -14\nc-67 0 -116 55 -116 115c0 19 4 26 4 33l-13 219h-115v-73c0 -203 -79 -294 -150 -294c-35 0 -86 20 -118 107c-3 -2 -15 -6 -18 -6c-5 0 -11 6 -11 11c0 8 15 14 21 15c-2 3 -4 9 -4 13c0 5 7 13 13 13c7 0 12 -11 13 -17c4 2 17 7 21 7c3 0 11 -5 11 -11\nc0 -9 -20 -16 -23 -16c21 -63 58 -94 95 -94c65 0 65 184 65 193v295c0 117 -40 195 -92 195s-81 -53 -81 -96c0 -22 11 -37 39 -62c68 -63 70 -101 70 -131c0 -23 0 -151 -81 -151c-49 0 -58 60 -58 78c0 4 0 15 12 15s13 -8 13 -16c1 -18 6 -55 33 -55c43 0 49 60 49 119\nc0 37 0 53 -56 109c-28 29 -51 54 -51 92c0 57 44 120 112 120c76 0 125 -73 140 -102c52 85 174 113 243 113c14 0 15 -1 23 -15zM634 427l-133 240c-1 1 -7 11 -9 11c-1 0 -130 -18 -165 -114c11 -31 20 -70 20 -139v-49h145c29 0 50 0 142 51z"
            },
            "&#x2135;": {
                x: 600,
                d: "M465 112l-283 323c-32 -68 -37 -149 -37 -188c0 -31 3 -45 44 -94c23 -28 46 -56 46 -94c0 -57 -75 -59 -102 -59h-56c-18 0 -27 0 -27 11s7 11 17 11c71 2 71 28 71 39c0 21 -9 46 -25 75c-26 49 -35 72 -35 105c0 66 29 138 81 220l-59 68c-50 61 -50 81 -50 100\nc0 52 21 64 26 64c4 0 9 -3 10 -10c1 -18 4 -50 49 -101l278 -317c4 37 5 45 21 134c12 67 14 94 16 123c-57 55 -67 76 -67 107c0 52 21 64 26 64c6 0 8 -5 10 -10c7 -18 53 -98 77 -119c46 -42 54 -56 54 -90c0 -52 -21 -64 -26 -64c-9 0 -10 9 -10 13\nc-3 36 -31 67 -34 70l-39 -260l59 -68c50 -61 50 -81 50 -100c0 -52 -21 -64 -26 -64c-4 0 -9 3 -10 10c-1 18 -4 50 -49 101z"
            },
            "&#x2111;": {
                x: 738,
                d: "M282 336c0 -11 -11 -11 -17 -11c-92 0 -215 67 -215 190c0 106 96 190 217 190c42 0 184 -10 273 -176c16 -29 22 -32 36 -32c2 0 73 0 81 47c1 9 2 14 15 14c6 0 16 0 16 -13c0 -38 -44 -70 -114 -70c-86 0 -134 61 -179 118c-43 54 -75 90 -132 90\nc-91 0 -182 -68 -182 -168c0 -59 40 -159 191 -168c4 -1 10 -4 10 -11zM77 183h40c70 0 108 -29 181 -98c4 -3 32 -29 50 -42c32 -23 60 -31 66 -31c18 0 121 33 121 126c0 21 -3 37 -40 79c-30 34 -53 59 -53 99c0 63 58 115 130 115c71 0 116 -48 116 -91\nc0 -9 -3 -14 -16 -14s-14 7 -15 13c-9 70 -82 70 -83 70c-37 0 -48 -47 -48 -90c0 -23 3 -40 42 -84c37 -40 51 -61 51 -97c0 -51 -29 -91 -64 -115c-49 -34 -91 -34 -143 -34c-80 0 -102 0 -208 97c-78 70 -110 73 -145 75c-9 1 -9 9 -9 11c0 11 9 11 27 11z"
            },
            "&#x2127;": {
                x: 733,
                d: "M653 662l27 -110c1 -4 3 -11 3 -15c0 -10 -8 -12 -13 -12s-9 2 -11 8c-2 3 -2 5 -6 22c-10 40 -14 51 -19 58c-5 9 -48 9 -59 9h-82c13 -57 40 -100 90 -174c47 -71 88 -140 88 -219c0 -137 -133 -251 -305 -251c-169 0 -304 112 -304 251c0 79 41 148 88 219\nc51 75 77 118 90 174h-82c-17 0 -54 0 -60 -10c-4 -8 -8 -18 -18 -59c-7 -27 -8 -28 -17 -28c-5 0 -13 2 -13 12c0 5 2 11 3 15l27 109c5 21 6 22 31 22h130c24 0 27 0 27 -20c0 -72 -33 -158 -55 -216c-26 -68 -54 -145 -54 -219c0 -151 105 -228 208 -228\nc98 0 207 74 207 228c0 74 -28 149 -55 221c-21 56 -54 143 -54 214c0 20 3 20 28 20h130c24 0 25 -1 30 -21z"
            },
            "&#x2136;": {
                x: 778,
                d: "M666 604v-500h40c11 -1 22 -7 22 -20c0 -10 -4 -14 -15 -24l-68 -68c-12 -12 -13 -12 -36 -12h-524c-17 0 -35 0 -35 20c0 8 1 9 17 25l67 68c12 11 13 11 37 11h455v449c0 18 0 25 -10 32c-14 11 -21 11 -61 11h-324c-79 0 -119 0 -119 121c0 34 0 46 20 46\nc14 0 17 -11 19 -16c12 -33 36 -33 57 -33h367c53 0 91 -15 91 -110z"
            },
            "&#x2137;": {
                x: 507,
                d: "M208 714h170c79 0 79 -53 79 -59c0 -12 -7 -46 -49 -57c2 -34 1 -64 4 -98c29 -351 29 -353 29 -425c0 -49 0 -58 -5 -75c-2 -7 -14 -42 -35 -42c-17 0 -20 15 -23 31c-4 22 -5 35 -7 49c-67 -66 -39 -40 -53 -52c-6 -5 -7 -6 -29 -6h-204c-17 0 -35 0 -35 20\nc0 8 1 9 17 25l67 68c12 11 13 11 37 11h197v492h-165c-79 0 -91 43 -91 121c0 34 0 46 20 46c14 0 17 -11 19 -16c12 -33 36 -33 57 -33z"
            },
            "&#x2138;": {
                x: 668,
                d: "M529 596h-388c-79 0 -91 43 -91 121c0 34 0 46 20 46c14 0 17 -11 19 -16c12 -33 36 -33 57 -33h393c79 0 79 -53 79 -59c0 -12 -7 -46 -49 -57c2 -34 1 -64 4 -98c29 -351 29 -353 29 -425c0 -49 0 -58 -5 -75c-2 -7 -14 -42 -35 -42c-18 0 -20 16 -27 54\nc-6 41 -6 72 -6 78v506z"
            },
            "&#xf0;": {
                x: 571,
                d: "M284 6c82 0 147 73 147 216c1 7 1 17 1 24c0 88 -50 189 -154 189c-21 0 -78 0 -119 -75c-23 -41 -23 -88 -23 -140c0 -60 0 -106 30 -151c31 -45 69 -63 118 -63zM320 615l-198 -84c-15 -7 -17 -7 -29 -7c-28 0 -28 5 -28 28v46c0 21 0 29 28 29s28 -10 28 -18v-48\nl171 74c-80 52 -164 55 -193 56c-9 0 -15 1 -15 13s6 12 20 12c58 0 137 -13 230 -63l109 47c17 7 23 10 35 10c28 0 28 -7 28 -29v-46c0 -22 0 -28 -28 -28s-28 8 -28 20v45c-29 -13 -58 -26 -87 -38c59 -41 94 -90 113 -123c45 -77 45 -145 45 -172\nc0 -269 -119 -361 -238 -361c-90 0 -136 42 -169 75c-64 66 -64 139 -64 166c0 67 16 120 75 178c48 47 99 60 152 60c106 0 147 -93 157 -117l1 1c0 164 -65 233 -115 274z"
            },
            "&#x210f;": {
                x: 591,
                d: "M242 519l-38 -153c57 69 117 76 148 76c69 0 115 -35 115 -108c0 -56 -45 -176 -62 -220c-6 -17 -17 -45 -17 -70c0 -21 6 -33 25 -33c27 0 72 22 101 124c5 15 5 18 15 18c3 0 12 0 12 -10c0 -6 -35 -154 -131 -154c-45 0 -82 31 -82 83c0 19 5 33 11 49\nc18 46 64 168 64 230c0 33 -10 69 -54 69c-100 0 -154 -105 -162 -122c-1 -3 -8 -34 -13 -50c-3 -15 -13 -53 -16 -68l-23 -89c-6 -25 -17 -70 -19 -75c-4 -13 -18 -27 -37 -27c-12 0 -29 6 -29 28c0 6 0 8 4 23l114 456c-9 -3 -69 -22 -74 -22c-1 0 -12 0 -12 12\nc0 9 7 11 17 15c16 5 55 16 77 23c12 49 26 108 26 111c0 10 -2 17 -50 17c-14 0 -24 0 -24 11c0 19 11 20 19 21c24 2 103 10 122 10c8 0 14 -3 14 -12l-34 -135l220 69c11 3 13 3 14 3c7 0 12 -5 12 -12c0 -9 -7 -11 -19 -15z"
            },
            "&#x2141;": {
                x: 636,
                d: "M224 269h-134v-206c0 -24 0 -33 53 -40c36 -5 83 -5 97 -5c47 0 142 0 225 97c61 72 81 155 81 227c0 166 -116 323 -287 323c-47 0 -107 -11 -160 -40c-8 -4 -15 -8 -21 -8c-11 0 -20 10 -20 20c0 14 11 19 30 28c59 28 116 40 171 40c192 0 327 -172 327 -364\nc0 -115 -49 -212 -104 -267c-96 -96 -188 -96 -242 -96c-190 0 -190 40 -190 81v215c0 32 4 35 35 35h139c17 0 36 0 36 -20s-19 -20 -36 -20z"
            },
            "&#x210e;": {
                x: 591,
                d: "M250 550l-46 -184c57 69 117 76 148 76c69 0 115 -35 115 -108c0 -56 -45 -176 -62 -220c-6 -17 -17 -45 -17 -70c0 -21 6 -33 25 -33c27 0 72 22 101 124c5 15 5 18 15 18c3 0 12 0 12 -10c0 -6 -35 -154 -131 -154c-45 0 -82 31 -82 83c0 19 5 33 11 49\nc18 46 64 168 64 230c0 33 -10 69 -54 69c-100 0 -154 -105 -162 -122c-1 -3 -8 -34 -13 -50c-3 -15 -13 -53 -16 -68l-23 -89c-6 -25 -17 -70 -19 -75c-4 -13 -18 -27 -37 -27c-12 0 -29 6 -29 28c0 6 0 8 4 23l128 510h-53c-19 0 -28 0 -28 12c0 13 11 13 31 13h56\nc5 20 14 53 14 60c0 10 -2 17 -50 17c-14 0 -24 0 -24 11c0 19 11 20 19 21c24 2 103 10 122 10c8 0 14 -3 14 -12c0 -2 -9 -37 -14 -55c-6 -25 -6 -27 -13 -52h185c19 0 31 0 31 -13c0 -12 -11 -12 -28 -12h-194z"
            },
            "&#x2202;": {
                x: 615,
                d: "M466 334h1c10 37 29 111 29 175c0 112 -56 182 -144 182c-27 0 -103 -7 -144 -81c13 0 44 0 44 -31c0 -17 -15 -49 -50 -49c-28 0 -34 22 -34 31c0 27 43 154 188 154c128 0 209 -111 209 -255c0 -137 -101 -481 -337 -481c-136 0 -178 115 -178 176\nc0 159 144 302 285 302c90 0 125 -67 131 -123zM231 6c154 0 219 224 219 298c0 54 -21 133 -112 133c-104 0 -161 -101 -174 -131c-15 -37 -43 -140 -43 -184c0 -42 16 -116 110 -116z"
            },
            "&#x2118;": {
                x: 630,
                d: "M139 121c13 -18 47 -62 61 -79c34 -46 43 -58 43 -94c0 -77 -64 -163 -130 -163c-47 0 -63 36 -63 77c0 31 14 116 49 216c-31 41 -42 56 -42 108c0 128 90 266 161 266c11 0 11 -7 11 -8c0 -10 -6 -11 -12 -12c-69 -14 -117 -143 -117 -218c0 -14 0 -46 24 -73\nc50 97 92 146 130 180c70 65 138 88 199 88c85 0 127 -73 127 -148c0 -136 -115 -271 -225 -271c-45 0 -88 27 -88 82c0 10 0 41 25 41c9 0 17 -6 17 -17c0 -9 -6 -19 -20 -22c0 -55 46 -64 66 -64c47 0 91 43 116 88c32 58 52 151 52 194c0 55 -22 97 -72 97\nc-133 0 -250 -126 -312 -268zM114 57c-14 -40 -42 -148 -42 -194c0 -38 13 -58 41 -58c42 0 86 57 86 115c0 14 -1 26 -12 42z"
            },
            "&#x214c;": {
                x: 618,
                d: "M368 463h147c18 0 33 0 33 -18c0 -14 -13 -16 -20 -17c-26 -4 -59 -23 -118 -73c-13 -11 -67 -60 -72 -65c7 -10 175 -224 200 -248c4 -5 6 -5 14 -7c3 -1 16 -4 16 -17c0 -18 -16 -18 -34 -18h-177c-18 0 -33 0 -33 18c0 16 17 17 31 18c9 1 4 3 12 4\nc-6 17 -6 19 -26 42c-21 28 -76 96 -97 123l-11 -9v-99c0 -19 1 -57 28 -62c4 -1 17 -3 17 -17c0 -18 -15 -18 -33 -18h-162c-18 0 -33 0 -33 18c0 9 7 15 15 17c14 2 31 6 31 79v457c0 34 -2 75 -28 79c-3 0 -18 3 -18 17c0 18 15 18 33 18h116c30 0 34 -1 34 -36v-403\nc22 20 77 68 98 88c22 19 41 37 41 66c0 2 0 25 -19 28c-4 0 -19 3 -19 17c0 18 16 18 34 18zM407 398l39 30h-44c4 -9 5 -21 5 -30zM131 573v-461c0 -28 -2 -55 -12 -77h90c-11 23 -11 48 -11 60v555h-79c10 -22 12 -49 12 -77zM270 228l115 -144c17 -25 17 -34 17 -49h93\nl-184 231z"
            },
            "&#x2132;": {
                x: 543,
                d: "M493 659v-624c0 -32 -4 -35 -35 -35h-373c-17 0 -35 0 -35 20s18 20 35 20h368v287h-218c-17 0 -35 0 -35 20s18 20 35 20h218v291c0 17 0 36 20 36s20 -18 20 -35z"
            },
            "&#x2201;": {
                x: 488,
                d: "M438 218v-96c0 -114 -119 -144 -194 -144c-74 0 -194 29 -194 144v581c0 114 119 144 194 144c74 0 194 -29 194 -144v-96c0 -13 0 -51 -40 -51s-40 41 -40 56v84c0 22 0 40 -38 57c-27 11 -55 14 -76 14c-23 0 -54 -3 -81 -16c-33 -17 -33 -33 -33 -55v-567\nc0 -22 0 -40 38 -57c27 -11 55 -14 76 -14c23 0 54 3 81 16c33 17 33 33 33 55v84c0 15 0 56 40 56s40 -38 40 -51z"
            },
            "&#x2113;": {
                x: 481,
                d: "M129 170v19c0 122 52 261 56 271c14 38 95 244 188 244c43 0 58 -35 58 -75c0 -177 -185 -368 -244 -429c-7 -8 -7 -50 -7 -60c0 -54 7 -132 61 -132c40 0 84 35 119 69c4 4 19 19 23 19c5 0 10 -6 10 -11c0 -9 -48 -50 -61 -60c-16 -12 -52 -37 -92 -37\nc-78 0 -103 87 -109 154c-8 -9 -65 -64 -70 -64c-7 0 -11 7 -11 11s16 19 79 81zM189 232c57 60 97 110 123 147c87 126 97 216 97 251c0 22 -2 54 -36 54c-20 0 -37 -17 -54 -44c-84 -140 -129 -402 -130 -408z"
            },
            "&#x24c8;": {
                x: 986,
                d: "M936 267c0 -246 -201 -443 -443 -443c-241 0 -443 197 -443 443c0 243 196 443 443 443s443 -201 443 -443zM493 -136c222 0 403 181 403 403c0 220 -178 403 -403 403s-403 -183 -403 -403c0 -222 181 -403 403 -403zM501 226c-92 21 -112 25 -142 55\nc-12 12 -44 45 -44 101c0 78 66 146 157 146c41 0 87 -12 125 -49c1 1 27 38 29 40c4 6 6 9 12 9c10 0 10 -7 10 -26v-132c0 -21 0 -26 -13 -26c-11 0 -11 6 -13 13c-4 32 -22 149 -149 149c-67 0 -107 -49 -107 -95c0 -30 16 -69 66 -89c6 -2 41 -10 62 -15\nc85 -20 101 -23 138 -61c0 -1 39 -41 39 -104c0 -79 -62 -156 -159 -156c-65 0 -117 23 -146 49c-1 -1 -27 -38 -29 -40c-4 -6 -6 -9 -12 -9c-10 0 -10 7 -10 26v131c0 21 0 27 13 27c3 0 11 -1 12 -9c1 -27 4 -76 49 -111c43 -35 97 -39 123 -39c69 0 108 54 108 104\nc0 44 -27 71 -32 75c-23 21 -33 23 -87 36z"
            },
            "(": {
                x: 316,
                d: "M266 -194c0 -4 -2 -6 -7 -6c-12 0 -94 73 -142 177c-60 129 -67 251 -67 323c0 96 14 204 64 315c49 110 134 184 145 184c4 0 7 -2 7 -5s-2 -5 -2 -6c-49 -50 -170 -177 -170 -489s123 -440 169 -487c3 -3 3 -5 3 -6z"
            },
            ")": {
                x: 316,
                d: "M266 299c0 -96 -14 -204 -64 -315c-49 -110 -134 -184 -145 -184c-3 0 -7 1 -7 6c0 2 1 3 2 5c49 50 170 177 170 489c0 311 -122 438 -170 488c-1 2 -2 3 -2 5c0 5 4 6 7 6c12 0 94 -73 142 -177c60 -129 67 -251 67 -323z"
            },
            "&#x393;": {
                x: 591,
                d: "M517 681l24 -221h-18c-15 125 -23 195 -175 195h-110c-40 0 -42 -5 -42 -39v-544c0 -36 2 -46 78 -46h22v-26c-41 2 -89 2 -130 2c-31 0 -87 0 -116 -2v26c69 0 80 0 80 45v539c0 45 -11 45 -80 45v26h467z"
            },
            "&#x394;": {
                x: 797,
                d: "M419 690l323 -673c1 -2 5 -11 5 -12c0 -4 -1 -5 -19 -5h-659c-18 0 -19 1 -19 5c0 1 4 10 5 12l324 674c7 14 8 16 20 16c8 0 12 0 20 -17zM374 631l-278 -575h555z"
            },
            "&#x395;": {
                x: 656,
                d: "M606 253l-36 -253h-520v26c69 0 80 0 80 45v539c0 45 -11 45 -80 45v26h506l24 -221h-18c-14 133 -32 195 -187 195h-137c-40 0 -42 -5 -42 -39v-249h94c94 0 103 34 103 117h18v-260h-18c0 83 -9 117 -103 117h-94v-276c0 -34 2 -39 42 -39h139c176 0 189 80 211 227h18\nz"
            },
            "&#x396;": {
                x: 575,
                d: "M520 663l-394 -635h174c191 0 198 102 207 233h18l-14 -261h-439c-20 0 -22 0 -22 13c0 7 0 8 7 19l387 625h-165c-162 0 -192 -81 -198 -195h-18l10 221h425c21 0 22 -1 22 -20z"
            },
            "&#x397;": {
                x: 690,
                d: "M560 612v-541c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v271h-298v-271c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26c29 -2 82 -2 113 -2s84 0 113 2v-26\nc-69 0 -80 0 -80 -45v-244h298v244c0 45 -11 45 -80 45v26c29 -2 82 -2 113 -2s84 0 113 2v-26c-69 0 -80 0 -80 -45z"
            },
            "&#x398;": {
                x: 727,
                d: "M677 340c0 -200 -143 -356 -314 -356c-167 0 -313 153 -313 356s144 359 314 359c166 0 313 -154 313 -359zM364 1c110 0 240 105 240 339c0 235 -128 343 -241 343c-109 0 -240 -105 -240 -343c0 -231 127 -339 241 -339zM551 404v-124h-18v34h-339v-34h-18v124h18v-34\nh339v34h18z"
            },
            "&#x399;": {
                x: 334,
                d: "M200 612v-541c0 -45 12 -45 84 -45v-26c-32 2 -83 2 -117 2s-85 0 -117 -2v26c72 0 84 0 84 45v541c0 45 -12 45 -84 45v26c32 -2 83 -2 117 -2s85 0 117 2v-26c-72 0 -84 0 -84 -45z"
            },
            "&#x39a;": {
                x: 734,
                d: "M368 419l223 -341c30 -46 45 -52 93 -52v-26c-23 2 -64 2 -88 2c-33 0 -79 0 -111 -2v26c13 0 41 0 41 26c0 10 -7 23 -13 33l-189 290l-128 -127v-177c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26\nc29 -2 82 -2 113 -2s84 0 113 2v-26c-69 0 -80 0 -80 -45v-339l332 333c4 6 8 17 8 24s-4 25 -30 27v26c26 -2 73 -2 100 -2c20 0 45 1 65 2v-26c-56 -2 -94 -30 -130 -65z"
            },
            "&#x39b;": {
                x: 694,
                d: "M363 690l207 -629c12 -35 30 -35 74 -35v-26c-23 2 -69 2 -94 2c-31 0 -82 0 -111 -2v26c21 0 63 0 63 28c0 3 0 5 -5 19l-174 528l-166 -505c-3 -10 -5 -16 -5 -23s3 -45 56 -47v-26c-24 2 -63 2 -88 2c-18 0 -53 -1 -70 -2v26c33 1 66 13 84 66l197 598\nc5 16 6 17 16 17s11 -1 16 -17z"
            },
            "&#x39c;": {
                x: 843,
                d: "M206 667l216 -586l216 586c6 15 7 16 28 16h127v-26c-69 0 -80 0 -80 -45v-541c0 -45 11 -45 80 -45v-26c-27 2 -82 2 -111 2s-83 0 -110 -2v26c69 0 80 0 80 45v587h-1l-237 -642c-4 -10 -6 -16 -14 -16s-10 6 -14 16l-235 637h-1v-555c0 -25 0 -72 80 -72v-26\nc-23 2 -65 2 -90 2s-67 0 -90 -2v26c80 0 80 47 80 72v514c0 45 -11 45 -80 45v26h128c21 0 22 -1 28 -16z"
            },
            "&#x39d;": {
                x: 690,
                d: "M204 671l336 -549v463c0 25 0 72 -80 72v26c23 -2 65 -2 90 -2s67 0 90 2v-26c-80 0 -80 -47 -80 -72v-563c0 -19 0 -22 -10 -22c-5 0 -8 0 -15 12l-371 607c-7 10 -7 12 -14 18v-539c0 -25 0 -72 80 -72v-26c-23 2 -65 2 -90 2s-67 0 -90 -2v26c80 0 80 47 80 72v553\nc-3 1 -21 6 -61 6h-19v26h127c19 0 20 -1 27 -12z"
            },
            "&#x39e;": {
                x: 648,
                d: "M586 680l1 -19c1 -29 4 -88 6 -119h-18c-1 19 -3 60 -10 76c-6 10 -51 10 -75 10h-332c-10 0 -67 0 -73 -9c-9 -12 -11 -59 -12 -77h-18l1 19c1 29 4 88 6 119h524zM57 0l-7 149h18c2 -40 4 -70 10 -84c6 -13 43 -13 79 -13h334c26 0 72 0 78 12c7 14 8 40 11 85h18\nl-7 -149h-534zM506 420v-132h-18v40h-328v-40h-18v132h18v-40h328v40h18z"
            },
            "&#x39f;": {
                x: 727,
                d: "M677 340c0 -200 -143 -356 -314 -356c-167 0 -313 153 -313 356s144 359 314 359c166 0 313 -154 313 -359zM364 2c110 0 237 110 237 351c0 233 -132 328 -238 328c-101 0 -237 -92 -237 -328c0 -237 124 -351 238 -351z"
            },
            "&#x3a0;": {
                x: 690,
                d: "M560 610v-539c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v584h-298v-584c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v539c0 45 -11 45 -80 45v26h590v-26c-69 0 -80 0 -80 -45z"
            },
            "&#x3a1;": {
                x: 629,
                d: "M196 321v-250c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26h306c131 0 223 -88 223 -183s-94 -179 -223 -179h-160zM194 342h143c122 0 166 67 166 158c0 83 -37 157 -166 157h-101c-40 0 -42 -5 -42 -39\nv-276z"
            },
            "&#x3a3;": {
                x: 675,
                d: "M327 329l-231 -295h276c162 0 219 33 235 195h18l-24 -229h-529c-15 0 -21 0 -21 7c0 2 0 3 7 12l223 286l-231 356c0 21 1 22 22 22h529l24 -221h-18c-17 159 -67 195 -233 195h-242l197 -303c1 -2 5 -8 5 -12c0 -3 0 -5 -7 -13z"
            },
            "&#x3a4;": {
                x: 711,
                d: "M644 680l17 -221h-18c-13 166 -28 195 -181 195c-18 0 -47 0 -55 -1c-18 -4 -18 -16 -18 -38v-542c0 -36 3 -47 86 -47h28v-26c-48 1 -98 2 -147 2s-99 -1 -147 -2v26h28c83 0 86 11 86 47v542c0 23 0 35 -19 38c-8 1 -37 1 -55 1c-154 0 -168 -29 -181 -195h-18l17 221\nh577z"
            },
            "&#x3a5;": {
                x: 727,
                d: "M397 353v-281c0 -36 2 -46 78 -46h22v-26c-42 2 -91 2 -133 2s-91 0 -133 -2v26h22c76 0 78 10 78 46v281c0 60 -10 289 -160 289c-32 0 -91 -17 -100 -91c-1 -8 -1 -11 -10 -11c-10 0 -11 3 -11 13c0 52 34 146 122 146c152 0 184 -193 192 -245h1c7 51 38 245 190 245\nc87 0 122 -93 122 -146c0 -10 -1 -13 -11 -13c-9 0 -9 3 -10 11c-9 73 -68 91 -100 91c-54 0 -98 -30 -126 -95c-27 -65 -33 -150 -33 -194z"
            },
            "&#x3a6;": {
                x: 675,
                d: "M368 129v-57c0 -36 2 -46 78 -46h22v-26c-41 2 -89 2 -131 2s-91 0 -132 -2v26h22c76 0 78 10 78 46v57c-153 14 -255 110 -255 213c0 99 98 198 255 212v57c0 36 -2 46 -78 46h-22v26c41 -2 90 -2 132 -2s90 0 131 2v-26h-22c-76 0 -78 -10 -78 -46v-57\nc158 -14 257 -112 257 -213c0 -97 -95 -198 -257 -212zM305 146v391c-87 -9 -181 -59 -181 -196c0 -133 91 -185 181 -195zM368 537v-391c75 7 183 49 183 196c0 143 -104 188 -183 195z"
            },
            "&#x3a7;": {
                x: 766,
                d: "M402 379l220 -320c20 -28 30 -33 94 -33v-26c-24 2 -74 2 -100 2c-33 0 -82 0 -114 -2v26c35 2 44 19 44 27c0 3 0 6 -8 17l-174 254l-160 -232c-5 -7 -10 -14 -10 -27c0 -16 9 -36 40 -39v-26c-25 2 -72 2 -99 2c-24 0 -62 0 -85 -2v26c19 0 84 1 127 63l174 253\nl-193 282c-22 31 -40 33 -95 33v26c24 -2 74 -2 100 -2c33 0 82 0 114 2v-26c-33 -1 -44 -18 -44 -27c0 -3 1 -6 8 -17l148 -216l132 191c7 10 12 18 12 30c0 16 -8 36 -40 39v26c25 -2 66 -2 99 -2c24 0 62 0 85 2v-26c-82 -1 -112 -44 -127 -65z"
            },
            "&#x3a8;": {
                x: 726,
                d: "M393 611v-464c118 25 146 148 147 254c1 103 22 155 88 155h26c17 0 22 0 22 -8c0 -6 -2 -6 -12 -8c-51 -10 -61 -75 -61 -121c0 -57 -2 -267 -210 -289v-58c0 -36 2 -46 78 -46h22v-26c-41 2 -89 2 -131 2s-91 0 -132 -2v26h22c76 0 78 10 78 46v58\nc-174 20 -207 173 -208 266c-1 134 -39 140 -67 145c-5 0 -5 6 -5 7c0 8 5 8 21 8h26c62 0 87 -49 88 -144c0 -52 2 -236 145 -265v464c0 36 -2 46 -78 46h-22v26c41 -2 90 -2 132 -2s90 0 131 2v-26h-22c-76 0 -78 -10 -78 -46z"
            },
            "&#x3a9;": {
                x: 695,
                d: "M645 146l-29 -146h-151c-21 0 -22 0 -22 16c0 70 36 161 52 202c37 91 64 160 64 237c0 146 -103 228 -212 228c-104 0 -211 -79 -211 -228c0 -78 30 -154 62 -232c17 -43 54 -136 54 -207c0 -15 -1 -16 -22 -16h-151l-29 146h18c10 -46 12 -59 18 -75\nc5 -14 8 -22 65 -22h81c-11 58 -35 101 -79 172c-49 79 -93 150 -93 233c0 134 125 245 288 245c159 0 287 -110 287 -245c0 -83 -43 -152 -95 -237c-42 -67 -66 -110 -77 -168h81c58 0 61 8 66 23c5 16 8 28 17 74h18z"
            },
            "&#x391;": {
                x: 746,
                d: "M390 691l222 -628c13 -37 31 -37 84 -37v-26c-24 2 -74 2 -100 2c-31 0 -83 0 -112 -2v26c19 0 62 0 62 27c0 4 0 6 -5 18l-60 170h-262l-53 -149c-2 -6 -4 -11 -4 -20c0 -12 7 -44 54 -46v-26c-24 2 -64 2 -89 2c-19 0 -59 0 -77 -2v26c35 0 75 11 94 65l212 600\nc5 13 7 16 17 16s12 -3 17 -16zM350 611l-122 -344h244z"
            },
            "&#x392;": {
                x: 655,
                d: "M50 683h318c129 0 211 -85 211 -168c0 -76 -67 -140 -163 -159c107 -7 189 -84 189 -174c0 -91 -83 -182 -211 -182h-344v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26zM193 363h144c108 0 169 76 169 152c0 62 -44 142 -143 142h-128c-40 0 -42 -5 -42 -39v-255z\nM235 26h130c109 0 166 84 166 157s-50 164 -153 164h-185v-282c0 -34 2 -39 42 -39z"
            },
            "#": {
                x: 779,
                d: "M489 143l-80 -316c-2 -8 -5 -22 -19 -22c-10 0 -18 8 -18 18c0 3 1 8 4 18l77 302h-181l-80 -316c-2 -8 -5 -22 -19 -22c-10 0 -18 8 -18 18c0 3 1 8 4 18l77 302h-152c-17 0 -34 0 -34 18c0 17 15 17 30 17h166l34 143h-200c-15 0 -30 0 -30 17c0 18 17 18 34 18h206\nl80 316c2 8 5 22 19 22c10 0 18 -8 18 -18c0 -3 -1 -8 -4 -18l-77 -302h181l80 316c2 8 5 22 19 22c10 0 18 -8 18 -18c0 -3 -1 -8 -4 -18l-77 -302h152c17 0 34 0 34 -18c0 -17 -15 -17 -30 -17h-166l-34 -143h200c15 0 30 0 30 -17c0 -18 -17 -18 -34 -18h-206zM282 178\nh181l34 143h-181z"
            },
            "!": {
                x: 182,
                d: "M132 670l-31 -483c-1 -13 -1 -18 -10 -18s-9 5 -10 18l-31 483c0 29 24 40 41 40s41 -11 41 -40zM132 41c0 -23 -19 -41 -41 -41c-23 0 -41 19 -41 41c0 23 19 41 41 41c23 0 41 -19 41 -41z"
            },
            $: {
                x: 466,
                d: "M246 676v-285c45 -11 84 -21 121 -64c45 -53 49 -110 49 -136c0 -99 -66 -189 -170 -198v-48h-26v47c-109 6 -170 86 -170 186c0 33 19 41 36 41c13 0 36 -8 36 -36c0 -25 -19 -36 -36 -36c-5 0 -12 1 -16 3c18 -101 95 -129 150 -132v312c-58 16 -85 23 -122 62\nc-16 18 -48 60 -48 126c0 95 71 175 170 184v47h26v-47c120 -7 170 -90 170 -172c0 -29 -15 -41 -36 -41c-17 0 -36 11 -36 36c0 28 23 36 36 36c5 0 11 -1 15 -3c-19 93 -94 115 -149 118zM220 399v276c-85 -8 -130 -77 -130 -137c0 -37 15 -69 39 -95\nc28 -29 64 -38 91 -44zM246 323v-304c81 8 130 81 130 151c0 53 -26 90 -40 106c-29 31 -58 40 -90 47z"
            },
            "%": {
                x: 779,
                d: "M729 146c0 -117 -57 -201 -124 -201c-69 0 -137 79 -137 201s69 201 137 201c67 0 124 -85 124 -201zM606 -39c55 0 105 79 105 185s-50 185 -105 185c-26 0 -91 -23 -91 -185c0 -161 65 -185 91 -185zM642 714l-476 -753c-7 -11 -10 -16 -19 -16s-18 7 -18 18\nc0 3 0 5 9 19l432 684l-1 1c-25 -17 -71 -41 -135 -41c-26 0 -86 5 -147 44c3 -6 24 -53 24 -122c0 -117 -57 -201 -124 -201c-69 0 -137 79 -137 201s69 201 137 201c34 0 53 -19 66 -31c19 -18 80 -76 180 -76c41 0 121 9 179 92c7 8 11 15 21 15c8 0 17 -6 17 -18\nc0 -5 -1 -6 -8 -17zM188 363c55 0 105 79 105 185s-50 185 -105 185c-26 0 -91 -23 -91 -185c0 -161 65 -185 91 -185z"
            },
            "&#x26;": {
                x: 745,
                d: "M84 214l124 144c-30 87 -38 150 -38 201c0 97 61 151 120 151c65 0 78 -82 78 -122c0 -32 -11 -77 -114 -201c49 -129 148 -256 163 -275c35 39 70 98 85 124c43 72 66 111 66 127c0 27 -27 41 -60 41v26c29 -2 76 -2 106 -2c20 0 62 0 81 2v-26c-50 -1 -73 -18 -87 -30\nc-15 -13 -43 -63 -62 -96c-66 -119 -98 -158 -117 -181c24 -28 73 -87 132 -87c44 0 109 33 111 111h18c-2 -83 -62 -137 -133 -137c-80 0 -135 52 -162 77c-20 -19 -80 -77 -174 -77s-171 62 -171 144c0 33 12 61 34 86zM248 406c84 98 102 148 102 183\nc0 15 -3 105 -59 105c-32 0 -73 -28 -73 -116c0 -54 11 -120 30 -172zM215 341l-62 -71c-26 -30 -39 -71 -39 -112c0 -65 35 -148 116 -148c49 0 103 19 152 65c-47 54 -118 155 -167 266z"
            },
            "&#x2220;": {
                x: 709,
                d: "M648 653l-534 -613h510c17 0 35 0 35 -20s-18 -20 -35 -20h-538c-17 0 -36 0 -36 20c0 8 3 11 12 21l555 639c10 11 16 14 22 14c11 0 20 -9 20 -20c0 -4 0 -9 -11 -21z"
            },
            "&#x2032;": {
                x: 333,
                d: "M274 475l-177 -414c-6 -13 -7 -16 -13 -16c-8 0 -34 7 -34 18c0 1 4 12 4 14l119 437c7 26 25 45 53 45c31 0 57 -24 57 -53c0 -10 -4 -19 -9 -31z"
            },
            "&#x2035;": {
                x: 333,
                d: "M160 511l119 -434c0 -2 4 -13 4 -14c0 -8 -4 -9 -14 -13c-16 -5 -18 -5 -20 -5c-6 0 -7 2 -13 16l-179 417c-7 16 -7 28 -7 29c0 30 28 52 56 52c34 0 47 -23 54 -48z"
            },
            "&#x2605;": {
                x: 944,
                d: "M881 369l-239 -174l92 -281c1 -3 3 -10 3 -14c0 -1 0 -11 -11 -11c-5 0 -12 5 -15 9l-239 173l-239 -173c-11 -9 -13 -9 -15 -9c-11 0 -11 10 -11 11s4 13 4 14l91 281l-240 174c-9 7 -12 9 -12 15c0 11 9 11 28 11h289l90 278c4 13 7 20 15 20s9 -4 14 -18l91 -280h289\nc19 0 28 0 28 -11c0 -4 -1 -5 -13 -15z"
            },
            "&#x25c6;": {
                x: 654,
                d: "M595 272l-246 -388c-6 -9 -11 -17 -22 -17s-16 8 -22 17l-248 390c0 1 -7 11 -7 17c0 5 0 7 9 20l246 388c6 9 11 17 22 17s16 -8 22 -17l248 -390c0 -1 7 -11 7 -17c0 -5 0 -7 -9 -20z"
            },
            "&#x25a0;": {
                x: 765,
                d: "M715 652v-617c0 -32 -3 -35 -36 -35h-593c-33 0 -36 4 -36 36v616c0 32 4 35 35 35h595c32 0 35 -4 35 -35z"
            },
            "&#x25b2;": {
                x: 653,
                d: "M348 556l250 -540c4 -8 5 -12 5 -16c0 -20 -19 -20 -35 -20h-483c-16 0 -35 0 -35 20c0 4 0 6 6 18l248 538c8 18 16 20 23 20c12 0 15 -8 21 -20z"
            },
            "&#x25bc;": {
                x: 653,
                d: "M597 538l-255 -552c-4 -4 -9 -6 -15 -6c-7 0 -15 2 -23 20l-249 540c-4 8 -5 12 -5 16c0 20 19 20 35 20h483c16 0 35 0 35 -20c0 -4 0 -6 -6 -18z"
            },
            "&#x22a4;": {
                x: 768,
                d: "M404 628v-592c0 -18 0 -36 -20 -36s-20 21 -20 36v592h-278c-15 0 -36 0 -36 20s21 20 36 20h597c17 0 35 0 35 -20s-18 -20 -35 -20h-279z"
            },
            "&#x22a5;": {
                x: 768,
                d: "M404 632v-592h279c17 0 35 0 35 -20s-18 -20 -35 -20h-597c-15 0 -36 0 -36 20s21 20 36 20h278v592c0 15 0 36 20 36s20 -18 20 -36z"
            },
            "&#x2663;": {
                x: 822,
                d: "M424 -130h-26c-17 0 -35 0 -35 20c0 2 0 4 3 12c15 53 24 102 25 168h-50c-4 -83 -94 -92 -120 -92c-97 0 -171 89 -171 196c0 97 52 194 146 194c36 0 68 -14 92 -43l22 46c-50 40 -76 100 -76 161c0 104 76 195 177 195s177 -90 177 -195c0 -61 -25 -120 -76 -161\nl22 -46c24 29 56 43 92 43c94 0 146 -97 146 -194c0 -107 -75 -196 -171 -196c-27 0 -116 9 -120 92h-50c0 -50 7 -105 24 -164c4 -11 4 -13 4 -16c0 -20 -18 -20 -35 -20z"
            },
            "&#x2660;": {
                x: 768,
                d: "M397 -130h-26c-17 0 -35 0 -35 20c0 2 0 4 3 12c15 53 24 102 25 168h-50c-3 -82 -99 -92 -130 -92c-118 0 -134 150 -134 225c0 114 65 195 182 299c76 67 114 162 132 208c2 6 6 17 20 17c8 0 16 -5 18 -13c25 -61 59 -146 135 -214c113 -100 181 -180 181 -297\nc0 -65 -12 -225 -134 -225c-18 0 -127 4 -130 92h-50c0 -50 7 -105 24 -164c4 -11 4 -13 4 -16c0 -20 -18 -20 -35 -20z"
            },
            "&#x2662;": {
                x: 768,
                d: "M55 295l24 23c137 128 230 282 282 387c8 16 11 22 23 22s17 -9 19 -14c89 -182 206 -324 298 -406c13 -13 17 -16 17 -25s-4 -13 -14 -22c-137 -123 -238 -282 -297 -401c-8 -16 -11 -22 -23 -22s-17 9 -19 14c-56 114 -154 274 -298 406c-11 11 -17 16 -17 25\nc0 5 3 10 5 13zM384 -98c31 57 100 184 214 308c22 25 47 52 70 72c-22 20 -46 45 -67 69c-108 116 -173 229 -217 311c-31 -57 -100 -184 -214 -308c-22 -25 -47 -52 -70 -72c22 -20 46 -45 67 -69c108 -116 173 -229 217 -311z"
            },
            "&#x2661;": {
                x: 768,
                d: "M384 605c21 44 76 111 167 111c115 0 167 -98 167 -227c0 -150 -109 -255 -218 -359c-31 -29 -62 -61 -96 -146c-2 -6 -6 -17 -20 -17c-13 0 -17 9 -22 22c-18 46 -37 79 -65 112c-8 10 -41 41 -63 61c-146 139 -184 234 -184 327c0 125 50 227 167 227\nc91 0 147 -68 167 -111zM384 39c32 67 61 94 125 154c154 145 169 236 169 296c0 13 0 78 -27 130c-23 43 -62 57 -100 57c-46 0 -124 -27 -146 -139c-2 -9 -5 -23 -21 -23c-2 0 -16 1 -20 20c-26 130 -119 142 -147 142c-113 0 -127 -123 -127 -187c0 -85 35 -176 208 -331\nc43 -39 73 -91 86 -119z"
            },
            "&#x2203;": {
                x: 545,
                d: "M495 658v-622c0 -33 -3 -36 -35 -36h-375c-17 0 -35 0 -35 20s18 20 35 20h370v287h-356c-17 0 -35 0 -35 20s18 20 35 20h356v287h-370c-17 0 -35 0 -35 20s18 20 35 20h375c32 0 35 -3 35 -36z"
            },
            "&#x2204;": {
                x: 543,
                d: "M398 819l-28 -125h88c32 0 35 -4 35 -35v-624c0 -32 -4 -35 -35 -35h-244c-15 -70 -17 -77 -32 -142c-2 -10 -5 -24 -21 -24c-5 0 -20 3 -20 20c0 4 10 48 15 72c11 45 6 28 17 74h-88c-17 0 -35 0 -35 20s18 20 35 20h97l64 287h-147c-17 0 -35 0 -35 20s18 20 35 20\nh156l65 287h-235c-17 0 -35 0 -35 20s18 20 35 20h244l31 140c2 10 6 26 22 26c5 0 20 -3 20 -20c0 -4 -1 -7 -4 -21zM297 367h156v287h-92zM223 40h230v287h-165z"
            },
            "&#x266d;": {
                x: 372,
                d: "M72 724v-310c27 30 74 45 117 45c71 0 133 -57 133 -138c0 -127 -95 -222 -178 -286c-16 -12 -72 -56 -83 -56s-11 6 -11 26v718c0 18 0 27 11 27s11 -6 11 -26zM72 344v-332c48 43 176 159 176 309c0 23 -5 105 -70 105c-21 0 -54 -5 -77 -21c-29 -19 -29 -38 -29 -61z\n"
            },
            "&#x266e;": {
                x: 320,
                d: "M270 479v-668c0 -18 0 -27 -12 -27c-10 0 -10 7 -10 26v185l-171 -63c-14 -6 -16 -6 -17 -6c-10 0 -10 7 -10 26v746c0 17 0 27 12 27c10 0 10 -9 10 -26v-263l171 63c14 6 16 6 17 6c10 0 10 -7 10 -26zM72 5l176 65v356l-176 -65v-356z"
            },
            "&#x266f;": {
                x: 372,
                d: "M256 -17l-140 -41v-131c0 -19 0 -26 -12 -26c-10 0 -10 9 -10 26v125c-7 -2 -29 -10 -34 -10c-10 0 -10 7 -10 26v21c0 22 0 24 13 29c2 0 27 7 31 8v357c-7 -2 -29 -10 -34 -10c-10 0 -10 7 -10 26v21c0 22 0 24 13 29c2 0 27 7 31 8v200c0 19 0 27 12 27\nc10 0 10 -7 10 -26v-194l140 41v200c0 19 0 26 12 26c10 0 10 -9 10 -26v-194c7 2 29 10 34 10c10 0 10 -7 10 -26v-22c0 -22 -1 -23 -13 -28c-26 -8 -5 -1 -31 -8v-357c7 2 29 10 34 10c10 0 10 -7 10 -26v-22c0 -22 -1 -23 -13 -28c-26 -8 -5 -1 -31 -8v-131\nc0 -19 0 -27 -12 -27c-10 0 -10 7 -10 26v125zM256 414l-140 -41v-356l140 41v356z"
            },
            "&#x2200;": {
                x: 656,
                d: "M601 656l-251 -657c-4 -10 -8 -21 -22 -21c-13 0 -18 9 -23 23l-249 655c-6 14 -6 16 -6 18c0 10 10 20 20 20c13 0 18 -9 23 -23l83 -220h304l83 220c4 11 10 23 23 23c12 0 20 -10 20 -20c0 -5 0 -7 -5 -18zM192 411l136 -356l136 356h-272z"
            },
            "&#x221e;": {
                x: 989,
                d: "M503 271c49 80 132 171 247 171s189 -111 189 -226c0 -117 -76 -227 -193 -227c-51 0 -107 18 -163 63c-31 25 -43 40 -97 108c-49 -80 -132 -171 -247 -171s-189 111 -189 226c0 117 76 227 193 227c51 0 107 -18 163 -63c31 -25 43 -40 97 -108zM529 237\nc61 -79 84 -110 109 -137c21 -21 66 -63 124 -63c88 0 155 81 155 179c0 90 -54 194 -160 194c-113 0 -187 -101 -228 -173zM460 194c-61 79 -84 110 -109 137c-21 21 -66 63 -124 63c-88 0 -155 -81 -155 -179c0 -90 54 -194 160 -194c113 0 187 101 228 173z"
            },
            "&#x2221;": {
                x: 709,
                d: "M648 673l-325 -385c62 -75 96 -153 106 -248h195c17 0 35 0 35 -20s-18 -20 -35 -20h-193c-2 -17 -15 -20 -20 -20c-7 0 -18 4 -20 20h-305c-17 0 -36 0 -36 20c0 7 2 9 12 21l555 659c10 12 17 14 22 14c11 0 20 -9 20 -20c0 -4 0 -8 -11 -21zM113 40h276\nc-4 42 -23 137 -93 216z"
            },
            "&#x2207;": {
                x: 838,
                d: "M783 661l-337 -675c-7 -13 -10 -19 -27 -19s-20 6 -27 19l-337 675c-2 3 -5 10 -5 14c0 7 1 8 24 8h690c23 0 24 -1 24 -8c0 -4 -3 -11 -5 -14zM174 611l275 -550l274 550h-549z"
            },
            "&#xac;": {
                x: 656,
                d: "M606 320v-195c0 -18 0 -36 -20 -36s-20 18 -20 36v191h-481c-17 0 -35 0 -35 20s18 20 35 20h486c32 0 35 -3 35 -36z"
            },
            "&#x2222;": {
                x: 709,
                d: "M638 508l-118 -58c28 -63 42 -131 42 -200s-14 -137 -42 -200l116 -58c16 -7 23 -11 23 -23s-9 -20 -20 -20c-3 0 -5 0 -18 7l-551 272c-12 6 -20 10 -20 22s9 17 19 22l552 272c13 7 15 7 18 7c11 0 20 -8 20 -20s-9 -17 -21 -23zM115 250l369 -182c26 61 38 120 38 182\nc0 57 -10 117 -38 182z"
            },
            "&#x221a;": {
                x: 880,
                d: "M366 -95l421 874c8 16 15 21 23 21c12 0 20 -10 20 -20c0 -2 0 -6 -7 -20l-454 -940c-7 -14 -10 -20 -25 -20c-9 0 -14 0 -21 16l-197 433c-11 -8 -26 -19 -32 -24c-11 -8 -28 -22 -34 -22c-7 0 -10 6 -10 11c0 3 0 6 13 16l95 72c11 8 16 8 17 8c3 0 8 0 15 -16z"
            },
            "&#x25b3;": {
                x: 870,
                d: "M457 697l357 -661c4 -8 6 -11 6 -16c0 -20 -18 -20 -35 -20h-699c-15 0 -36 0 -36 20c0 4 0 6 8 19l355 657c8 16 11 20 22 20c12 0 15 -7 22 -19zM435 654l-332 -614h664z"
            },
            "&#x25bd;": {
                x: 870,
                d: "M812 461l-355 -657c-8 -16 -11 -20 -22 -20c-12 0 -15 7 -22 19l-356 660c-6 12 -7 12 -7 17c0 20 21 20 36 20h699c17 0 35 0 35 -20c0 -4 0 -6 -8 -19zM103 460l331 -613h2l331 613h-664z"
            },
            "&#x2205;": {
                x: 765,
                d: "M701 543l-73 -64c-4 -4 -10 -9 -11 -10c19 -27 59 -85 59 -178c0 -155 -124 -293 -294 -293c-124 0 -198 75 -207 85l-78 -68c-18 -17 -20 -17 -27 -17c-12 0 -20 8 -20 20c0 9 2 11 22 29c59 51 60 52 76 67c-20 29 -59 84 -59 178c0 166 134 293 294 293\nc112 0 186 -63 207 -85l77 67c18 16 21 18 28 18c2 0 20 -1 20 -20c0 -4 0 -10 -14 -22zM178 140l381 333c-10 11 -70 72 -177 72c-138 0 -253 -110 -253 -254c0 -22 0 -82 49 -151zM586 443l-380 -333c10 -11 70 -72 177 -72c138 0 253 110 253 254c0 57 -17 107 -50 151z\n"
            },
            "&#xf8;": {
                x: 505,
                d: "M391 752l-23 -84c87 -83 87 -249 87 -323c0 -72 -3 -155 -29 -225c-18 -48 -62 -142 -174 -142c-27 0 -57 8 -81 21c-11 -40 -1 -5 -13 -45c-6 -22 -9 -32 -24 -32c-12 0 -20 9 -20 20c0 3 0 5 23 82c-87 78 -87 258 -87 321c0 93 5 183 44 264c37 77 102 107 159 107\nc37 0 69 -15 81 -21c11 40 1 5 13 45c6 21 9 32 24 32c12 0 20 -9 20 -20zM150 70l175 596c-26 22 -52 28 -72 28c-45 0 -103 -30 -122 -123c-14 -64 -14 -133 -14 -214c0 -95 0 -218 33 -287zM355 626l-174 -597c24 -21 48 -29 71 -29c53 0 106 38 124 143\nc12 67 12 141 12 214c0 95 0 211 -33 269z"
            },
            "&#x25c7;": {
                x: 654,
                d: "M595 272l-246 -388c-6 -9 -11 -17 -22 -17s-16 8 -22 17l-248 390c0 1 -7 11 -7 17c0 5 0 7 9 20l246 388c6 9 11 17 22 17s16 -8 22 -17l248 -390c0 -1 7 -11 7 -17c0 -5 0 -7 -9 -20zM94 291l232 -366h2l232 367l-233 367z"
            },
            "&#x25c0;": {
                x: 711,
                d: "M70 272l553 261c8 4 14 6 18 6c6 0 11 -2 14 -6s5 -8 5 -12s1 -10 1 -17v-509c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23z"
            },
            "&#x25b8;": {
                x: 711,
                d: "M641 227l-553 -260c-9 -5 -15 -7 -18 -7c-6 0 -11 2 -14 6s-6 8 -6 12v17v508v18s3 8 6 12s8 6 15 6c3 0 8 -2 17 -7l553 -260c13 -6 20 -14 20 -23s-7 -16 -20 -22z"
            },
            "[": {
                x: 229,
                d: "M179 -249h-129v998h129v-35h-94v-928h94v-35z"
            },
            "]": {
                x: 229,
                d: "M179 749v-998h-129v35h94v928h-94v35h129z"
            },
            "{": {
                x: 455,
                d: "M261 617v-240c0 -58 -36 -104 -118 -127c28 -8 57 -18 78 -39c32 -32 40 -49 40 -95v-210c0 -36 0 -38 3 -47c13 -51 62 -83 125 -87c10 -1 16 -1 16 -11c0 -11 -8 -11 -19 -11c-39 0 -105 11 -144 41c-48 38 -48 70 -48 112v198c0 36 0 38 -3 49c-11 49 -59 85 -125 89\nc-10 1 -16 1 -16 11c0 6 4 10 9 11c22 1 60 3 95 32c40 33 40 65 40 104v228c1 74 92 125 192 125c11 0 19 0 19 -11c0 -6 -4 -10 -9 -11c-109 -7 -135 -71 -135 -111z"
            },
            "}": {
                x: 455,
                d: "M194 -117v240c0 58 36 104 118 127c-28 8 -57 18 -78 39c-32 32 -40 49 -40 95v210c0 36 0 38 -3 47c-13 51 -62 83 -125 87c-10 1 -16 1 -16 11c0 11 11 11 20 11c34 0 103 -10 143 -41c48 -38 48 -70 48 -112v-198c0 -36 0 -38 3 -49c11 -49 59 -85 125 -89\nc10 -1 16 -1 16 -11c0 -6 -4 -10 -9 -11c-22 -1 -60 -3 -95 -32c-40 -33 -40 -65 -40 -104v-228c-1 -76 -94 -125 -191 -125c-9 0 -20 0 -20 11c0 6 4 10 9 11c109 7 135 71 135 111z"
            },
            "&#x3008;": {
                x: 323,
                d: "M268 712l-177 -462l177 -464c5 -11 5 -13 5 -16c0 -11 -9 -20 -20 -20c-14 0 -19 13 -23 24l-175 459c-5 12 -5 14 -5 17c0 6 3 12 5 18l175 459c7 18 14 23 23 23c11 0 20 -9 20 -20c0 -5 0 -7 -5 -18z"
            },
            "&#x3009;": {
                x: 323,
                d: "M268 233l-177 -463c-4 -10 -8 -20 -21 -20c-11 0 -20 9 -20 20c0 5 0 7 5 18l177 462l-177 464c-5 11 -5 13 -5 16c0 11 9 20 20 20s17 -6 23 -23l175 -460c5 -12 5 -14 5 -17s0 -5 -5 -17z"
            },
            "&#x3f0;": {
                x: 756,
                d: "M519 270l-382 -254c-11 -7 -31 -21 -55 -21c-3 0 -32 1 -32 26c0 15 8 20 25 32l66 44c35 22 35 23 40 26c28 19 98 170 98 224c0 3 0 12 -3 18c-68 0 -115 -23 -123 -41c-4 -7 -6 -12 -14 -12s-12 6 -12 12c0 32 65 108 155 108c28 0 28 -21 28 -45\nc0 -74 -45 -178 -74 -227l383 255c12 8 31 21 55 21c10 0 32 -5 32 -26c0 -10 -6 -16 -7 -18c-5 -5 -61 -42 -99 -68c-31 -21 -32 -22 -52 -52c-49 -78 -72 -172 -72 -188c0 -7 2 -13 4 -18c68 1 113 21 124 41c3 8 5 12 13 12c4 0 12 -2 12 -12c0 -34 -67 -108 -155 -108\nc-16 0 -29 4 -29 45c0 26 10 111 74 226z"
            },
            ",": {
                x: 208,
                d: "M158 -4c0 -35 -7 -67 -20 -98s-27 -54 -40 -69s-21 -22 -25 -22c-7 0 -10 3 -10 10c0 3 4 8 11 16c43 48 64 102 64 163c0 13 -1 19 -2 19s-3 -1 -4 -2c-9 -9 -20 -13 -33 -13c-16 0 -29 5 -37 15s-12 21 -12 34c0 12 4 23 13 33s20 15 35 15c20 0 35 -9 45 -27\ns15 -43 15 -74z"
            },
            ".": {
                x: 197,
                d: "M147 48c0 -13 -5 -24 -14 -34s-21 -14 -35 -14c-13 0 -24 5 -34 14s-14 21 -14 35c0 13 5 23 14 33s21 15 35 15c13 0 23 -5 33 -14s15 -21 15 -35z"
            },
            "/": {
                x: 481,
                d: "M425 713l-335 -941c-5 -15 -12 -22 -22 -22c-5 0 -8 2 -12 6s-6 8 -6 13c0 1 1 4 3 9l3 9l335 941c5 15 13 22 22 22c5 0 9 -2 13 -6s5 -8 5 -13c0 -1 -1 -4 -3 -9z"
            },
            ":": {
                x: 182,
                d: "M132 389c0 -12 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 17 -12 29s4 21 12 29s18 12 29 12s21 -4 29 -12s12 -17 12 -29zM132 41c0 -12 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 17 -12 29s4 21 12 29s18 12 29 12s21 -4 29 -12s12 -17 12 -29z"
            },
            ";": {
                x: 185,
                d: "M132 389c0 -12 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 17 -12 29s4 21 12 29s18 12 29 12s21 -4 29 -12s12 -17 12 -29zM119 -11v21c-7 -7 -16 -10 -28 -10c-11 0 -21 4 -29 11s-12 17 -12 30s4 23 12 30s18 11 29 11c29 0 44 -30 44 -91\nc0 -35 -6 -67 -17 -98s-22 -53 -32 -67s-16 -20 -19 -20c-5 0 -8 3 -8 9c0 2 2 5 6 10c36 51 54 105 54 164z"
            },
            "?": {
                x: 439,
                d: "M215 225v-35c0 -7 -1 -12 -1 -14s-1 -4 -2 -5s-3 -2 -6 -2c-4 0 -7 1 -8 3s-1 9 -1 18v39c0 94 30 173 90 238c8 9 15 16 19 22s8 17 12 31s7 30 7 49c0 11 0 20 -1 27s-3 18 -7 30s-9 22 -17 30s-20 15 -36 21s-34 9 -56 9c-29 0 -57 -7 -82 -22s-42 -37 -52 -66\nc4 1 8 2 12 2c9 0 18 -4 25 -10s11 -15 11 -26c0 -13 -4 -22 -12 -28s-16 -8 -24 -8c-3 0 -7 0 -11 1s-9 4 -15 11s-10 16 -10 27c0 35 14 67 44 94s69 41 116 41c57 0 101 -13 132 -38s47 -58 47 -100c0 -43 -18 -78 -54 -105c-37 -29 -67 -65 -88 -105s-32 -83 -32 -129z\nM247 41c0 -11 -4 -21 -12 -29s-18 -12 -29 -12s-21 4 -29 12s-12 18 -12 29s4 21 12 29s18 12 29 12s21 -4 29 -12s12 -18 12 -29z"
            },
            "\\": {
                x: 489,
                d: "M396 -226l-341 940c-3 8 -5 13 -5 16c0 5 2 10 6 14s9 6 14 6c6 0 10 -2 13 -5s6 -10 9 -19l342 -940c3 -8 5 -13 5 -16c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-9 0 -17 8 -23 24z"
            },
            "&#x22ee;": {
                x: 216,
                d: "M107 674c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58zM107 329c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58zM107 -26c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58z"
            },
            "&#x22ef;": {
                x: 882,
                d: "M440 329c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58zM107 329c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58zM773 329c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58z"
            },
            "&#x22f0;": {
                x: 685,
                d: "M383 318c22 -22 22 -62 1 -83c-22 -22 -61 -21 -83 1c-21 21 -20 60 1 81s60 22 81 1zM148 553c22 -22 22 -61 1 -83c-22 -21 -61 -21 -84 2c-20 20 -20 59 2 80c21 22 60 22 81 1zM619 82c22 -22 22 -61 0 -82c-21 -22 -60 -22 -83 1c-20 20 -20 59 1 81\nc22 21 61 21 82 0z"
            },
            "&#x2026;": {
                x: 647,
                d: "M538 111c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58zM322 111c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58zM107 111c31 0 59 -28 59 -58c0 -31 -28 -58 -60 -58c-29 0 -56 28 -56 58s27 58 57 58z"
            },
            "@": {
                x: 727,
                d: "M551 457v-242c0 -27 4 -68 36 -68c70 0 72 108 72 183c0 95 -25 190 -89 260c-64 67 -135 96 -207 96c-159 0 -295 -149 -295 -339c0 -178 123 -339 300 -339c130 0 227 46 263 63c5 3 7 3 24 3c20 0 21 -1 21 -6c0 -8 -144 -76 -307 -76c-186 0 -319 164 -319 355\nc0 204 146 355 314 355c139 0 313 -117 313 -368c0 -107 -11 -203 -94 -203c-39 0 -85 26 -86 82c-18 -31 -65 -82 -134 -82c-95 0 -187 88 -187 216s91 216 187 216c38 0 90 -16 132 -78c5 -7 6 -8 7 -8h28c20 0 21 -1 21 -20zM498 271v152c0 33 -20 62 -44 85\nc-16 15 -48 39 -90 39c-74 0 -135 -89 -135 -200s61 -200 135 -200c43 0 91 26 122 83c12 21 12 22 12 41z"
            },
            "&#x22;": {
                x: 425,
                d: "M148 611c-4 -6 -18 -23 -45 -23c-36 0 -53 27 -53 53s18 53 53 53c46 0 68 -50 68 -105c0 -118 -85 -194 -96 -194c-6 0 -11 5 -11 11c0 2 0 4 5 9c19 18 80 74 80 175c0 6 0 15 -1 21zM352 611c-4 -6 -18 -23 -45 -23c-36 0 -53 27 -53 53s18 53 53 53\nc46 0 68 -50 68 -105c0 -118 -85 -194 -96 -194c-6 0 -11 5 -11 11c0 2 0 4 5 9c19 18 80 74 80 175c0 6 0 15 -1 21z"
            },
            "'": {
                x: 216,
                d: "M160.462 669.414l-88.1016 -179.333c-8.0498 2.68359 -12.0742 4.02539 -22.3604 8.94434l44.2744 184.252c4.91895 21.4668 7.60254 31.7529 21.0186 38.4609c16.9941 8.49707 40.6963 -0.894531 48.2988 -16.0996c7.60254 -15.2061 0 -29.0693 -3.12988 -36.2246z"
            },
            "*": {
                x: 669,
                d: "M360 427l-14 -156l112 81c25 19 27 19 34 19c14 0 27 -13 27 -28s-8 -19 -24 -27l-138 -67c79 -37 81 -37 141 -67c12 -6 21 -11 21 -26c0 -14 -13 -28 -27 -28c-7 0 -9 2 -18 7l-128 93l15 -168c0 -19 -15 -26 -27 -26c-8 0 -26 5 -26 26l15 168l-112 -81\nc-25 -19 -27 -19 -34 -19c-14 0 -27 13 -27 28s8 19 24 27l138 67l-142 68c-10 5 -20 9 -20 25c0 14 13 28 27 28c7 0 9 -2 18 -7l128 -93l-14 155v13c-3 13 10 26 26 26c22 0 25 -16 25 -30v-8z"
            },
            "+": {
                x: 927,
                d: "M481 232v-265c0 -15 0 -31 -18 -31c-17 0 -17 17 -17 31v265h-265c-15 0 -31 0 -31 18c0 17 17 17 31 17h265v265c0 15 0 31 18 31c17 0 17 -17 17 -31v-265h265c15 0 31 0 31 -18c0 -17 -17 -17 -31 -17h-265z"
            },
            "-": {
                x: 927,
                d: "M726 230h-541c-17 0 -35 0 -35 20s18 20 35 20h541c17 0 35 0 35 -20s-18 -20 -35 -20z"
            },
            "&#x2210;": {
                x: 979,
                d: "M726 605v-527c0 -40 0 -47 72 -47c25 0 31 0 31 -16c0 -15 -7 -15 -28 -15h-623c-21 0 -28 0 -28 15c0 16 7 16 26 16c77 0 77 6 77 47v527c0 40 0 47 -72 47c-25 0 -31 0 -31 16c0 15 10 15 17 15c21 0 43 -2 64 -2s43 -1 64 -1c28 0 100 3 128 3c7 0 17 0 17 -15\nc0 -16 -7 -16 -26 -16c-77 0 -77 -6 -77 -47v-574h305v574c0 40 0 47 -72 47c-25 0 -31 0 -31 16c0 15 10 15 17 15c21 0 43 -2 64 -2s43 -1 64 -1c28 0 100 3 128 3c7 0 17 0 17 -15c0 -16 -7 -16 -26 -16c-77 0 -77 -6 -77 -47z"
            },
            "&#x22bc;": {
                x: 798,
                d: "M612 676h-426c-17 0 -36 0 -36 20s18 20 35 20h428c17 0 35 0 35 -20s-19 -20 -36 -20zM421 503l220 -465c7 -13 7 -15 7 -18c0 -11 -8 -20 -20 -20s-17 9 -22 19l-207 437l-207 -436c-6 -12 -9 -20 -22 -20c-11 0 -20 9 -20 20c0 2 0 6 7 20l220 462c5 11 9 20 22 20\nc11 0 16 -7 22 -19z"
            },
            "&#x22bb;": {
                x: 798,
                d: "M641 676l-220 -462c-5 -11 -9 -20 -22 -20c-12 0 -17 9 -22 19l-221 465c-2 5 -6 12 -6 18c0 11 9 20 20 20s17 -7 22 -19l207 -437l207 436c6 12 9 20 22 20c11 0 20 -9 20 -20c0 -1 0 -6 -7 -20zM186 40h427c17 0 35 0 35 -20s-18 -20 -35 -20h-427c-17 0 -36 0 -36 20\ns19 20 36 20z"
            },
            "&#x25ef;": {
                x: 1189,
                d: "M1039 250c0 -259 -200 -466 -445 -466c-242 0 -444 205 -444 466c0 259 200 466 445 466c242 0 444 -205 444 -466zM595 -176c221 0 404 188 404 426c0 236 -181 426 -405 426c-221 0 -404 -188 -404 -426c0 -236 181 -426 405 -426z"
            },
            "&#x22a1;": {
                x: 965,
                d: "M815 652v-617c0 -32 -3 -35 -36 -35h-593c-33 0 -36 4 -36 36v616c0 32 4 35 35 35h595c32 0 35 -4 35 -35zM190 647v-607h585v607h-585zM536 344c0 -29 -24 -53 -53 -53s-53 24 -53 53s24 53 53 53s53 -24 53 -53z"
            },
            "&#x229f;": {
                x: 965,
                d: "M815 652v-617c0 -32 -3 -35 -36 -35h-593c-33 0 -36 4 -36 36v616c0 32 4 35 35 35h595c32 0 35 -4 35 -35zM190 364h585v283h-585v-283zM190 40h585v284h-585v-284z"
            },
            "&#x229e;": {
                x: 965,
                d: "M815 652v-617c0 -32 -3 -35 -36 -35h-593c-33 0 -36 4 -36 36v616c0 32 4 35 35 35h595c32 0 35 -4 35 -35zM190 364h273v283h-273v-283zM775 647h-272v-283h272v283zM190 40h273v284h-273v-284zM775 324h-272v-284h272v284z"
            },
            "&#x22a0;": {
                x: 965,
                d: "M815 652v-617c0 -32 -4 -35 -35 -35h-594c-33 0 -36 4 -36 36v616c0 32 4 35 35 35h595c32 0 35 -4 35 -35zM217 647l266 -274l265 274h-531zM190 70l264 273l-264 274v-547zM775 617l-264 -273l264 -274v547zM748 40l-266 274l-265 -274h531z"
            },
            "&#x2022;": {
                x: 689,
                d: "M539 250c0 -107 -89 -194 -194 -194c-108 0 -195 88 -195 194c0 105 87 194 195 194c105 0 194 -87 194 -194z"
            },
            "&#x2229;": {
                x: 856,
                d: "M706 380v-366c0 -18 0 -36 -20 -36s-20 18 -20 36v361c0 27 0 91 -77 140c-53 34 -116 43 -161 43c-75 0 -238 -32 -238 -182v-362c0 -18 0 -36 -20 -36s-20 18 -20 36v367c0 147 148 217 278 217c125 0 278 -66 278 -218z"
            },
            "&#x222a;": {
                x: 856,
                d: "M706 562v-367c0 -147 -148 -217 -278 -217c-125 0 -278 66 -278 218v366c0 18 0 36 20 36s20 -18 20 -36v-361c0 -27 0 -91 77 -140c53 -34 116 -43 161 -43c75 0 238 32 238 182v362c0 18 0 36 20 36s20 -18 20 -36z"
            },
            "&#x22d2;": {
                x: 854,
                d: "M550 320v-307c0 -17 0 -35 -20 -35s-20 18 -20 35v304c0 22 0 41 -23 63c-19 19 -45 24 -60 24c-17 0 -42 -5 -61 -25c-22 -22 -22 -41 -22 -62v-304c0 -17 0 -35 -20 -35s-20 18 -20 35v307c0 99 84 124 123 124c38 0 123 -24 123 -124zM704 379v-366\nc0 -17 0 -35 -20 -35s-20 18 -20 35v363c0 25 0 86 -73 136c-47 31 -108 46 -164 46c-86 0 -237 -40 -237 -182v-363c0 -17 0 -35 -20 -35s-20 18 -20 35v366c0 153 154 219 277 219s277 -65 277 -219z"
            },
            "&#x22d3;": {
                x: 854,
                d: "M550 563v-307c0 -99 -84 -124 -123 -124c-38 0 -123 24 -123 124v307c0 17 0 35 20 35s20 -18 20 -35v-304c0 -22 0 -41 23 -63c19 -19 45 -24 60 -24c17 0 42 5 61 25c22 22 22 41 22 62v304c0 17 0 35 20 35s20 -18 20 -35zM704 563v-366c0 -153 -154 -219 -277 -219\ns-277 65 -277 219v366c0 17 0 35 20 35s20 -18 20 -35v-363c0 -25 0 -86 73 -136c47 -31 108 -46 164 -46c86 0 237 40 237 182v363c0 17 0 35 20 35s20 -18 20 -35z"
            },
            "&#x22d0;": {
                x: 927,
                d: "M470 155h256c17 0 35 0 35 -20s-18 -20 -35 -20h-107c-59 0 -119 -1 -178 -1c-78 0 -137 62 -137 136c0 73 59 136 137 136c10 0 21 -1 32 -1h253c17 0 35 0 35 -20s-18 -20 -35 -20h-256c-10 0 -20 1 -29 1c-56 0 -97 -45 -97 -96s41 -96 97 -96c9 0 19 1 29 1zM459 0\nh267c17 0 35 0 35 -20s-18 -20 -35 -20h-270c-167 0 -306 126 -306 290s139 290 306 290h270c17 0 35 0 35 -20s-18 -20 -35 -20h-267c-157 0 -269 -115 -269 -250s113 -250 269 -250z"
            },
            "&#x22d1;": {
                x: 927,
                d: "M441 345h-256c-17 0 -35 0 -35 20s18 20 35 20h253c11 0 22 1 32 1c78 0 137 -62 137 -136c0 -73 -59 -136 -137 -136c-10 0 -21 1 -32 1h-253c-17 0 -35 0 -35 20s18 20 35 20h256c10 0 20 -1 29 -1c56 0 97 45 97 96s-41 96 -97 96c-9 0 -19 -1 -29 -1zM452 500h-267\nc-17 0 -35 0 -35 20s18 20 35 20h270c167 0 306 -126 306 -290s-139 -290 -306 -290h-270c-17 0 -35 0 -35 20s18 20 35 20h267c157 0 269 115 269 250s-113 250 -269 250z"
            },
            "&#xb7;": {
                x: 406,
                d: "M256 250c0 -29 -24 -53 -53 -53s-53 24 -53 53s24 53 53 53s53 -24 53 -53z"
            },
            "&#x25aa;": {
                x: 465,
                d: "M315 152v-117c0 -32 -4 -35 -35 -35h-94c-33 0 -36 4 -36 36v116c0 32 4 35 35 35h95c32 0 35 -4 35 -35z"
            },
            "&#x25e6;": {
                x: 689,
                d: "M539 250c0 -107 -89 -194 -194 -194c-108 0 -195 88 -195 194c0 105 87 194 195 194c105 0 194 -87 194 -194zM345 96c83 0 154 68 154 154s-71 154 -154 154c-86 0 -155 -70 -155 -154s68 -154 155 -154z"
            },
            "&#x229b;": {
                x: 966,
                d: "M816 250c0 -183 -149 -333 -333 -333c-183 0 -333 149 -333 333c0 183 149 333 333 333c183 0 333 -149 333 -333zM483 -58c170 0 308 138 308 308s-138 308 -308 308s-308 -138 -308 -308s138 -308 308 -308zM604 150l-109 79l5 -54c1 -20 5 -59 5 -60c0 -4 5 -51 5 -54\nc0 -18 -16 -26 -27 -26s-27 8 -27 26l15 168l-111 -80c-11 -8 -27 -20 -34 -20c-15 0 -27 14 -27 28c0 15 7 18 21 26l140 67l-141 68c-10 5 -20 10 -20 25c0 14 12 28 27 28c8 0 24 -13 36 -21l109 -79l-14 156v13c-3 13 11 26 26 26c23 0 26 -18 26 -32v-7l-14 -157\nl127 94c3 2 9 7 18 7c15 0 27 -14 27 -28c0 -15 -7 -18 -21 -26l-140 -67c63 -32 125 -60 138 -67c16 -8 23 -11 23 -26c0 -14 -12 -28 -27 -28c-8 0 -24 13 -36 21z"
            },
            "&#x229a;": {
                x: 966,
                d: "M816 250c0 -183 -149 -333 -333 -333c-183 0 -333 149 -333 333c0 183 149 333 333 333c183 0 333 -149 333 -333zM483 -58c170 0 308 138 308 308s-138 308 -308 308s-308 -138 -308 -308s138 -308 308 -308zM622 250c0 -76 -63 -139 -139 -139s-139 62 -139 139\nc0 76 63 139 139 139s139 -62 139 -139zM483 151c55 0 99 45 99 99s-45 99 -99 99c-55 0 -99 -45 -99 -99s45 -99 99 -99z"
            },
            "&#x2296;": {
                x: 967,
                d: "M817 250c0 -182 -148 -333 -334 -333c-183 0 -333 149 -333 333c0 182 148 333 334 333c183 0 333 -149 333 -333zM175 263h617c-10 176 -152 295 -309 295c-153 0 -298 -117 -308 -295zM792 238h-617c10 -179 154 -296 309 -296c151 0 298 114 308 296z"
            },
            "&#x2299;": {
                x: 967,
                d: "M817 250c0 -182 -148 -333 -334 -333c-183 0 -333 149 -333 333c0 182 148 333 334 333c183 0 333 -149 333 -333zM484 -58c168 0 308 136 308 308c0 169 -137 308 -309 308c-168 0 -308 -136 -308 -308c0 -169 137 -308 309 -308zM552 250c0 -36 -29 -69 -69 -69\nc-37 0 -68 31 -68 69c0 36 29 69 69 69c37 0 68 -31 68 -69z"
            },
            "&#x229d;": {
                x: 966,
                d: "M816 250c0 -183 -149 -333 -333 -333c-183 0 -333 149 -333 333c0 183 149 333 333 333c183 0 333 -149 333 -333zM483 -58c170 0 308 138 308 308s-138 308 -308 308s-308 -138 -308 -308s138 -308 308 -308zM346 263h274c19 0 29 0 29 -13c0 -12 -11 -12 -29 -12h-274\nc-19 0 -29 0 -29 13c0 12 11 12 29 12z"
            },
            "&#x2295;": {
                x: 967,
                d: "M817 250c0 -182 -148 -333 -334 -333c-183 0 -333 149 -333 333c0 182 148 333 334 333c183 0 333 -149 333 -333zM175 263h296v295c-156 -8 -286 -127 -296 -295zM496 558v-295h296c-10 167 -139 287 -296 295zM471 -58v296h-296c10 -171 141 -288 296 -296zM792 238\nh-296v-296c154 8 286 125 296 296z"
            },
            "&#x2297;": {
                x: 967,
                d: "M817 250c0 -182 -148 -333 -334 -333c-183 0 -333 149 -333 333c0 182 148 333 334 333c183 0 333 -149 333 -333zM285 465l199 -198l208 209c-82 77 -174 82 -209 82c-126 0 -207 -78 -207 -82c0 -2 7 -9 9 -11zM256 41l209 209l-209 209c-52 -59 -81 -132 -81 -209\nc0 -64 20 -141 81 -209zM710 459l-208 -209l209 -209c52 59 81 132 81 209c0 82 -34 158 -82 209zM682 35l-199 198l-208 -209c82 -77 174 -82 209 -82c126 0 207 78 207 82c0 2 -7 9 -9 11z"
            },
            "&#x2298;": {
                x: 967,
                d: "M817 250c0 -182 -148 -333 -334 -333c-183 0 -333 149 -333 333c0 182 148 333 334 333c183 0 333 -149 333 -333zM266 51l426 425c-82 77 -174 82 -209 82c-168 0 -308 -136 -308 -308c0 -127 79 -207 82 -207c1 0 1 1 9 8zM710 459l-435 -435c82 -77 174 -82 209 -82\nc168 0 308 136 308 308c0 82 -34 158 -82 209z"
            },
            "&#xb1;": {
                x: 967,
                d: "M504 313v-273h278c17 0 35 0 35 -20s-18 -20 -35 -20h-597c-17 0 -35 0 -35 20s18 20 35 20h279v273h-279c-17 0 -35 0 -35 20s18 20 35 20h279v279c0 16 0 34 20 34s20 -21 20 -37v-276h278c17 0 35 0 35 -20s-18 -20 -35 -20h-278z"
            },
            "&#x2213;": {
                x: 967,
                d: "M504 147v-276c0 -15 0 -37 -20 -37s-20 18 -20 34v279h-279c-17 0 -35 0 -35 20s18 20 35 20h279v273h-279c-17 0 -35 0 -35 20s18 20 35 20h597c17 0 35 0 35 -20s-18 -20 -35 -20h-278v-273h278c17 0 35 0 35 -20s-18 -20 -35 -20h-278z"
            },
            "&#x22cf;": {
                x: 891,
                d: "M446 251c21 105 54 182 101 237c73 86 170 90 173 90c17 0 21 -13 21 -20c0 -17 -14 -19 -27 -21c-94 -15 -165 -75 -209 -213c-25 -80 -38 -197 -39 -295c0 -33 0 -34 -1 -35c0 -3 -2 -6 -4 -8c-2 -3 -7 -8 -15 -8c-20 0 -20 20 -20 24c-1 117 -9 234 -47 345\nc-57 168 -168 185 -212 191c-10 2 -17 10 -17 20c0 7 4 20 21 20c13 0 111 -11 175 -91c55 -67 84 -151 100 -236z"
            },
            "&#x22ce;": {
                x: 891,
                d: "M446 305c-16 -82 -45 -168 -94 -229c-76 -96 -180 -98 -181 -98c-17 0 -21 13 -21 20c0 17 16 20 22 21c91 13 166 62 214 210c27 85 39 207 40 298c0 33 0 34 1 35c0 3 2 6 4 8c2 3 7 8 15 8c20 0 20 -20 20 -24c1 -100 8 -228 44 -335c60 -178 165 -194 214 -201\nc10 -2 17 -10 17 -20c0 -7 -4 -20 -21 -20c-2 0 -54 4 -104 32c-87 51 -140 145 -170 295z"
            },
            "&#x2020;": {
                x: 633,
                d: "M327 420c1 -20 2 -33 12 -85c11 -57 11 -68 11 -117c0 -110 -8 -244 -9 -262c-2 -48 -6 -108 -11 -154c-2 -13 -2 -18 -14 -18c-11 0 -12 6 -13 20c-8 87 -20 256 -20 414c0 48 0 60 11 118c10 52 11 63 12 84c-15 -2 -25 -3 -60 -12c-32 -9 -51 -11 -59 -11\nc-29 0 -37 20 -37 34c0 9 5 33 37 33c21 0 52 -8 73 -14c23 -7 32 -7 46 -9c0 19 -1 40 -10 99c-4 27 -13 88 -13 123c0 10 0 42 34 42c33 0 33 -33 33 -42c0 -36 -7 -81 -12 -118c-10 -60 -11 -87 -11 -104c15 2 25 3 60 12c32 9 51 11 59 11c29 0 37 -20 37 -34\nc0 -9 -5 -33 -37 -33c-21 0 -52 8 -73 14c-23 7 -32 7 -46 9z"
            },
            "&#x2021;": {
                x: 633,
                d: "M327 467c1 -23 2 -34 12 -92c9 -44 11 -71 11 -85c0 -12 -3 -40 -34 -40c-18 0 -33 11 -33 40c0 27 8 74 13 100c8 44 9 56 10 77c-15 -2 -25 -3 -60 -12c-32 -9 -51 -11 -59 -11c-29 0 -37 20 -37 34c0 9 5 33 37 33c21 0 52 -8 73 -14c23 -7 32 -7 46 -9\nc-1 23 -2 34 -12 92c-9 44 -11 71 -11 85c0 12 3 40 34 40c18 0 33 -11 33 -40c0 -27 -8 -74 -13 -100c-8 -44 -9 -56 -10 -77c15 2 25 3 60 12c32 9 51 11 59 11c29 0 37 -20 37 -34c0 -9 -5 -33 -37 -33c-21 0 -52 8 -73 14c-23 7 -32 7 -46 9zM327 12c1 -23 2 -36 13 -99\nc8 -42 10 -68 10 -78c0 -12 -3 -40 -34 -40c-18 0 -33 11 -33 40c0 13 2 38 12 89c9 53 10 68 11 88c-19 -2 -21 -2 -46 -10c-43 -11 -60 -13 -76 -13c-24 0 -34 19 -34 33s9 33 34 33c18 0 36 -3 64 -11c6 -1 36 -10 58 -12c-1 23 -2 36 -13 99c-8 42 -10 68 -10 78\nc0 30 16 40 33 40c34 0 34 -32 34 -40c0 -13 -2 -38 -12 -89c-9 -53 -10 -68 -11 -88c19 2 21 2 46 10c43 11 60 13 76 13c24 0 34 -19 34 -33s-9 -33 -34 -33c-18 0 -36 3 -64 11c-6 1 -36 10 -58 12z"
            },
            "&#x22c4;": {
                x: 776,
                d: "M410 474l203 -203c10 -10 13 -13 13 -21s-4 -12 -5 -13l-24 -25l-171 -171l-25 -24c-5 -5 -11 -5 -13 -5c-6 0 -11 4 -12 4c-2 3 -16 17 -25 25l-142 143c-18 18 -52 52 -55 54c-2 4 -4 8 -4 12c0 7 2 9 13 20l205 205c11 11 13 13 20 13c8 0 10 -2 22 -14zM388 440\nl-189 -190l190 -190l189 190z"
            },
            "&#xf7;": {
                x: 968,
                d: "M548 466c0 -32 -26 -63 -64 -63c-37 0 -64 31 -64 63s26 63 64 63c37 0 64 -31 64 -63zM548 34c0 -32 -26 -63 -64 -63c-37 0 -64 31 -64 63s26 63 64 63c37 0 64 -31 64 -63zM185 270h598c17 0 35 0 35 -20s-18 -20 -35 -20h-598c-17 0 -35 0 -35 20s18 20 35 20z"
            },
            "&#x22c7;": {
                x: 965,
                d: "M545 466c0 -34 -28 -62 -62 -62s-62 28 -62 62s28 62 62 62s62 -28 62 -62zM545 34c0 -34 -28 -62 -62 -62s-62 28 -62 62s28 62 62 62s62 -28 62 -62zM710 449l-178 -179h248c17 0 35 0 35 -20s-18 -20 -35 -20h-248l178 -179c12 -12 14 -14 14 -22\nc0 -11 -8 -20 -20 -20c-6 0 -13 4 -14 6c-13 12 -159 159 -208 207l-199 -199c-12 -12 -14 -14 -22 -14c-10 0 -20 9 -20 20c0 6 3 12 14 23l178 178h-248c-17 0 -35 0 -35 20s18 20 35 20h248l-178 179c-10 10 -14 14 -14 22c0 11 10 20 20 20c8 0 10 -2 22 -14l200 -199\nl199 199c10 10 14 14 22 14c11 0 20 -9 20 -20c0 -8 -2 -10 -14 -22z"
            },
            "&#x2214;": {
                x: 966,
                d: "M503 230v-289c0 -17 0 -35 -20 -35s-20 18 -20 35v289h-278c-17 0 -35 0 -35 20s18 20 35 20h278v289c0 17 0 35 20 35s20 -18 20 -35v-289h278c17 0 35 0 35 -20s-18 -20 -35 -20h-278zM533 716c0 -29 -24 -50 -50 -50s-50 20 -50 50c0 29 23 50 50 50s50 -21 50 -50z\n"
            },
            "&#x232d;": {
                x: 798,
                d: "M612 773h-426c-17 0 -36 0 -36 20s18 20 35 20h428c17 0 35 0 35 -20s-19 -20 -36 -20zM421 406l221 -465c2 -5 6 -12 6 -18c0 -11 -9 -20 -20 -20s-17 7 -22 19l-207 437l-207 -436c-6 -12 -9 -20 -22 -20c-11 0 -20 9 -20 20c0 1 0 6 7 20l220 462c5 11 9 20 22 20\nc12 0 17 -9 22 -19zM185 619h428c17 0 35 0 35 -20s-19 -20 -36 -20h-426c-17 0 -36 0 -36 20s18 20 35 20z"
            },
            "&#x22d7;": {
                x: 927,
                d: "M376 250c0 -37 -30 -63 -63 -63c-36 0 -64 29 -64 63s28 63 64 63c33 0 63 -26 63 -63zM188 533l553 -261c12 -6 20 -9 20 -22c0 -11 -7 -16 -19 -22l-556 -262c-7 -3 -11 -5 -16 -5c-10 0 -20 9 -20 19c0 8 3 15 20 23l524 247l-524 247c-17 8 -20 15 -20 23\nc0 10 10 19 20 19c4 0 7 -1 18 -6z"
            },
            "&#x22d6;": {
                x: 927,
                d: "M662 250c0 -34 -28 -63 -64 -63c-33 0 -63 26 -63 63s30 63 63 63c36 0 64 -29 64 -63zM741 497l-524 -247l524 -248c13 -6 20 -9 20 -21c0 -14 -12 -20 -20 -20c-4 0 -7 1 -18 6l-553 261c-12 6 -20 9 -20 22c0 11 7 16 19 22l556 262c7 3 11 5 16 5c8 0 20 -6 20 -20\nc0 -8 -4 -15 -20 -22z"
            },
            "&#x22c9;": {
                x: 783,
                d: "M619 449l-198 -199c52 -53 201 -201 207 -208c5 -6 5 -11 5 -13c0 -11 -8 -20 -20 -20c-6 0 -13 4 -14 6c-13 12 -159 159 -208 207l-199 -199c-12 -12 -14 -14 -22 -14c-20 0 -20 19 -20 36v410c0 17 0 36 20 36c8 0 10 -2 22 -14l200 -199l199 199c10 10 14 14 22 14\nc11 0 20 -9 20 -20c0 -8 -2 -10 -14 -22zM190 77l172 173l-172 172v-345z"
            },
            "&#x22ca;": {
                x: 783,
                d: "M392 278l199 199c10 10 14 14 22 14c20 0 20 -18 20 -35v-412c0 -17 0 -35 -20 -35c-6 0 -13 4 -14 6c-13 12 -159 159 -208 207l-199 -199c-12 -12 -14 -14 -22 -14c-10 0 -20 9 -20 20c0 6 3 12 14 23l198 198l-198 199c-10 10 -14 14 -14 22c0 11 10 20 20 20\nc8 0 10 -2 22 -14zM421 250l172 -172v345z"
            },
            "&#x22cb;": {
                x: 965,
                d: "M455 336l-293 316c-11 12 -12 16 -12 22c0 12 9 20 20 20c3 0 9 0 22 -14l611 -660c11 -12 12 -16 12 -22c0 -12 -9 -20 -20 -20c-4 0 -10 1 -21 13l-292 315l-291 -315c-11 -12 -17 -13 -21 -13c-11 0 -20 8 -20 20c0 6 1 10 12 22z"
            },
            "&#x22cc;": {
                x: 965,
                d: "M510 336l293 -316c11 -12 12 -16 12 -22c0 -12 -9 -20 -20 -20c-4 0 -10 1 -21 13l-292 315l-291 -315c-11 -12 -17 -13 -21 -13c-11 0 -20 8 -20 20c0 6 1 10 12 22l611 660c13 14 19 14 22 14c11 0 20 -8 20 -20c0 -6 -1 -10 -12 -22z"
            },
            "&#x2293;": {
                x: 844,
                d: "M694 562v-526c0 -18 0 -36 -20 -36s-20 21 -20 36v522h-464v-522c0 -18 0 -36 -20 -36s-20 21 -20 36v526c0 33 3 36 35 36h474c32 0 35 -3 35 -36z"
            },
            "&#x2294;": {
                x: 844,
                d: "M694 562v-526c0 -33 -3 -36 -36 -36h-472c-32 0 -36 4 -36 36v526c0 18 0 36 20 36s20 -18 20 -36v-522h464v522c0 18 0 36 20 36s20 -18 20 -36z"
            },
            "&#x2291;": {
                x: 931,
                d: "M746 596h-545v-499h544c17 0 36 0 36 -20s-18 -20 -35 -20h-550c-32 0 -35 3 -35 36v507c0 32 4 36 36 36h549c17 0 35 0 35 -20s-18 -20 -35 -20zM746 -137h-561c-17 0 -35 0 -35 20s20 20 36 20h559c15 0 36 0 36 -20s-18 -20 -35 -20z"
            },
            "&#x2292;": {
                x: 931,
                d: "M770 600v-507c0 -33 -3 -36 -35 -36h-550c-17 0 -35 0 -35 20s20 20 36 20h544v499h-545c-17 0 -35 0 -35 20s18 20 35 20h550c32 0 35 -3 35 -36zM186 -97h559c17 0 36 0 36 -20s-18 -20 -35 -20h-561c-17 0 -35 0 -35 20s21 20 36 20z"
            },
            "&#x228f;": {
                x: 927,
                d: "M726 499h-536v-499h535c17 0 36 0 36 -20s-18 -20 -35 -20h-541c-32 0 -35 4 -35 35v508c0 33 4 36 36 36h540c17 0 35 0 35 -20s-18 -20 -35 -20z"
            },
            "&#x2290;": {
                x: 951,
                d: "M801 504v-509c0 -32 -4 -35 -35 -35h-581c-17 0 -35 0 -35 20s19 20 36 20h575v499h-576c-17 0 -35 0 -35 20s18 20 35 20h581c32 0 35 -4 35 -35z"
            },
            "&#x22c6;": {
                x: 789,
                d: "M394 172l-130 -144c-9 -10 -13 -10 -15 -10c-9 0 -9 8 -9 9s0 2 7 14l96 169l-180 81c-8 4 -13 6 -13 12c0 5 4 9 10 9l202 -41l22 192c2 15 2 20 11 20c8 0 8 -5 10 -19l22 -193l202 41c6 0 10 -4 10 -9c0 -6 -2 -7 -14 -12l-179 -81l98 -171c2 -3 5 -9 5 -12\nc0 -1 0 -9 -9 -9c-4 0 -7 2 -10 5z"
            },
            "&#xd7;": {
                x: 783,
                d: "M392 278l198 198c11 11 15 15 23 15c12 0 20 -9 20 -20c0 -7 -4 -11 -5 -13c-5 -6 -20 -19 -25 -25l-183 -183c50 -51 209 -208 210 -210c3 -5 3 -9 3 -11c0 -11 -8 -20 -20 -20c-6 0 -13 5 -15 6l-207 207l-199 -199c-12 -12 -14 -14 -22 -14c-10 0 -20 9 -20 20\nc0 7 2 9 13 20l200 201l-200 201c-11 11 -13 13 -13 20c0 11 10 20 20 20c8 0 10 -2 22 -14z"
            },
            "&#x22b3;": {
                x: 927,
                d: "M741 227l-553 -260c-13 -7 -15 -7 -18 -7c-20 0 -20 18 -20 35v508c0 18 0 36 21 36c2 0 4 0 17 -7l553 -260c17 -8 20 -15 20 -23s-4 -15 -20 -22zM694 250l-504 238v-477z"
            },
            "&#x22b2;": {
                x: 927,
                d: "M170 272l553 261c4 2 13 6 18 6c20 0 20 -18 20 -35v-509c0 -17 0 -35 -20 -35c-3 0 -5 0 -18 7l-553 260c-16 7 -20 14 -20 22s3 15 20 23zM217 249l504 -238v477z"
            },
            "&#x22b5;": {
                x: 927,
                d: "M741 324l-553 -260c-13 -7 -15 -7 -18 -7c-20 0 -20 18 -20 35v508c0 18 0 36 21 36c2 0 4 0 17 -7l553 -260c17 -8 20 -15 20 -23s-4 -15 -20 -22zM694 347l-504 238v-477zM726 -137h-541c-17 0 -35 0 -35 20s19 20 36 20h539c17 0 36 0 36 -20s-18 -20 -35 -20z"
            },
            "&#x22b4;": {
                x: 927,
                d: "M170 369l553 261c4 2 13 6 18 6c20 0 20 -18 20 -35v-509c0 -17 0 -35 -20 -35c-3 0 -5 0 -18 7l-553 260c-16 7 -20 14 -20 22s3 15 20 23zM217 346l504 -238v477zM186 -97h539c17 0 36 0 36 -20s-18 -20 -35 -20h-541c-17 0 -35 0 -35 20s19 20 36 20z"
            },
            "&#x228e;": {
                x: 856,
                d: "M448 285v-142c0 -15 0 -35 -20 -35s-20 19 -20 35v142h-142c-15 0 -36 0 -36 20s21 20 36 20h142v143c0 17 0 35 20 35s20 -18 20 -35v-143h142c15 0 36 0 36 -20s-21 -20 -36 -20h-142zM706 562v-367c0 -147 -148 -217 -278 -217c-125 0 -278 66 -278 218v366\nc0 18 0 36 20 36s20 -18 20 -36v-361c0 -27 0 -91 77 -140c53 -34 116 -43 161 -43c75 0 238 32 238 182v362c0 18 0 36 20 36s20 -18 20 -36z"
            },
            "&#x2228;": {
                x: 856,
                d: "M699 558l-249 -559c-6 -14 -9 -21 -22 -21c-9 0 -15 4 -23 21l-249 563c-6 12 -6 14 -6 16c0 11 9 20 20 20c7 0 15 -2 23 -21l235 -530l235 529c7 15 13 22 23 22c11 0 20 -9 20 -20c0 -5 -1 -7 -7 -20z"
            },
            "&#x2227;": {
                x: 856,
                d: "M451 577l249 -563c6 -12 6 -14 6 -16c0 -11 -9 -20 -20 -20c-4 0 -14 0 -23 21l-235 530l-235 -530c-8 -19 -16 -21 -23 -21c-11 0 -20 9 -20 20c0 5 1 7 7 20l249 559c6 14 9 21 22 21c9 0 15 -4 23 -21z"
            },
            "&#x2240;": {
                x: 467,
                d: "M316 -69c0 -9 -10 -14 -29 -14c-44 0 -77 17 -101 51s-36 75 -36 121c0 19 3 39 9 59s12 38 19 52s17 34 32 60c34 62 51 112 51 151c0 35 -8 67 -23 97s-35 45 -60 47c-18 2 -27 7 -27 14c0 9 10 14 30 14c43 0 77 -17 101 -51s35 -74 35 -121c0 -19 -3 -39 -9 -59\ns-12 -38 -19 -52s-17 -34 -32 -60c-34 -62 -51 -112 -51 -151c0 -35 7 -67 21 -95c17 -31 39 -48 68 -49c14 -2 21 -7 21 -14z"
            },
            "&#x3c;": {
                x: 941,
                d: "M772 498l-553 -248l553 -248c1 0 1 0 2 -1c11 -5 17 -12 17 -20c0 -7 -3 -12 -7 -15s-8 -5 -13 -5c-3 0 -9 2 -17 5l-585 262c-13 6 -19 13 -19 22c0 8 7 15 20 22l600 268c14 -1 21 -8 21 -21c0 -1 -1 -3 -1 -5v-4s-2 -1 -3 -2s-3 -2 -3 -3s0 -1 -2 -2s-4 -1 -4 -1\ns-1 -1 -3 -2z"
            },
            "=": {
                x: 927,
                d: "M747 321h-567c-20 0 -30 6 -30 17c0 12 11 18 34 18h559c23 0 34 -6 34 -18c0 -11 -10 -17 -30 -17zM743 143h-559c-23 0 -34 6 -34 18c0 11 10 17 30 17h567c20 0 30 -6 30 -17c0 -12 -11 -18 -34 -18z"
            },
            "&#x3e;": {
                x: 941,
                d: "M771 228l-600 -268c-7 1 -11 4 -15 8s-6 8 -6 12c0 8 6 15 19 22l553 248l-553 248c-13 7 -19 14 -19 22c0 5 2 9 6 13s9 6 14 6c3 0 9 -2 17 -5l585 -262c13 -6 19 -13 19 -22c0 -8 -7 -15 -20 -22z"
            },
            "&#x2248;": {
                x: 967,
                d: "M817 452c0 -46 -17 -85 -49 -116s-71 -47 -118 -47c-20 0 -42 4 -64 12s-40 16 -53 24s-32 20 -56 36c-32 22 -61 38 -85 49s-49 17 -75 17c-19 0 -39 -4 -58 -11s-37 -19 -54 -37s-26 -40 -27 -66c0 -3 -1 -8 -4 -14s-6 -9 -10 -9c-9 0 -14 10 -14 30c0 46 16 85 48 116\ns72 47 119 47c20 0 41 -4 63 -12s41 -16 54 -24s32 -20 56 -36c32 -22 60 -38 84 -49s50 -17 76 -17c35 0 66 11 94 31s43 46 45 79c1 18 5 27 14 27s14 -10 14 -30zM817 218c0 -45 -16 -82 -48 -114s-72 -48 -119 -48c-20 0 -42 4 -64 12s-40 16 -53 24s-32 20 -56 36\nc-32 22 -61 39 -85 50s-49 16 -75 16c-19 0 -39 -3 -58 -10s-37 -20 -54 -38s-26 -40 -27 -66c0 -3 -1 -8 -4 -14s-6 -9 -10 -9c-9 0 -14 10 -14 30c0 46 16 85 48 116s72 47 119 47c20 0 41 -4 63 -12s41 -16 54 -24s32 -20 56 -36c32 -22 60 -39 84 -50s50 -16 76 -16\nc35 0 66 10 94 30s43 47 45 80c1 18 5 27 14 27s14 -10 14 -31z"
            },
            "&#x2247;": {
                x: 965,
                d: "M477 201l-88 -154h389c8 0 14 -1 18 -1s8 -2 12 -5s7 -8 7 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-414l-80 -140c-9 -16 -17 -24 -25 -24c-6 0 -11 2 -15 6s-5 9 -5 14c0 2 2 8 6 17c12 19 36 62 73 127h-135c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14\ns9 5 13 5s10 1 18 1h156l88 154h-246c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s9 5 13 5s10 1 18 1h267l98 172c-14 7 -27 14 -38 21s-24 15 -37 24s-25 16 -35 22c-47 30 -89 45 -125 45c-19 0 -39 -4 -58 -11s-37 -19 -54 -37s-26 -40 -27 -66\nc0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116s72 47 119 47c20 0 41 -5 63 -13s41 -16 55 -24s33 -21 57 -37c47 -32 76 -48 85 -48c1 0 4 4 9 12l96 167c7 13 14 19 22 19c6 0 10 -2 14 -6s6 -9 6 -14c0 -3 -3 -10 -8 -20l-98 -171c9 -2 19 -3 31 -3\nc35 0 67 10 94 31s42 47 44 79c1 18 5 27 14 27s14 -10 14 -31c0 -44 -16 -82 -47 -114s-71 -48 -119 -48c-21 0 -41 3 -60 10l-89 -156h278c8 0 14 -1 18 -1s8 -2 12 -5s7 -8 7 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-303z"
            },
            "&#x224d;": {
                x: 967,
                d: "M817 464c0 -5 -2 -10 -5 -13l-35 -28c-98 -71 -196 -107 -294 -107c-59 0 -120 14 -181 41c-15 7 -31 14 -46 23s-28 18 -40 26s-23 14 -32 21s-16 12 -21 17l-8 6c-3 4 -5 9 -5 14s2 10 6 14s8 6 14 6c4 0 11 -4 22 -13c99 -77 197 -115 292 -115s191 37 287 112\nc12 11 21 16 26 16c6 0 11 -2 15 -6s5 -9 5 -14zM817 36c0 -5 -1 -10 -5 -14s-9 -6 -15 -6c-4 0 -11 4 -22 13c-100 77 -197 115 -292 115s-191 -37 -287 -112c-12 -11 -21 -16 -26 -16c-6 0 -10 2 -14 6s-6 9 -6 14s2 10 5 13l35 28c98 71 196 107 294 107\nc59 0 120 -14 181 -41c15 -7 31 -14 46 -23s29 -18 41 -26s21 -14 30 -21s17 -12 22 -17l8 -6c3 -4 5 -9 5 -14z"
            },
            "&#x2252;": {
                x: 1031,
                d: "M256 541c0 -15 -6 -27 -16 -37s-22 -16 -37 -16s-27 6 -37 16s-16 22 -16 37s6 27 16 37s22 16 37 16s27 -6 37 -16s16 -22 16 -37zM881 -41c0 -15 -5 -27 -15 -37s-23 -16 -38 -16s-28 6 -38 16s-15 22 -15 37s5 27 15 37s23 16 38 16s28 -6 38 -16s15 -22 15 -37z\nM219 173h593c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-595c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20zM218 367h595c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-593\nc-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "&#x2253;": {
                x: 1031,
                d: "M881 541c0 -15 -5 -27 -15 -37s-23 -16 -38 -16s-28 6 -38 16s-15 22 -15 37s5 27 15 37s23 16 38 16s28 -6 38 -16s15 -22 15 -37zM256 -41c0 -15 -6 -27 -16 -37s-22 -16 -37 -16s-27 6 -37 16s-16 22 -16 37s6 27 16 37s22 16 37 16s27 -6 37 -16s16 -22 16 -37z\nM813 133h-595c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h593c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1zM812 327h-593c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1h595c7 0 13 -1 17 -1s8 -2 12 -5\ns6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1z"
            },
            "&#x224a;": {
                x: 977,
                d: "M821 549c0 -46 -17 -85 -49 -116s-71 -47 -117 -47c-20 0 -41 4 -62 12s-38 14 -50 21s-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11s-38 -3 -57 -10s-37 -20 -54 -38s-26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116\ns72 47 118 47c20 0 41 -4 62 -12s38 -14 50 -21s28 -17 48 -30c29 -19 50 -33 64 -41s31 -16 51 -23s39 -11 58 -11c34 0 65 10 93 30s43 47 45 80c2 18 7 27 14 27c9 0 14 -10 14 -30zM186 7h605c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-607\nc-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20zM821 315c0 -45 -16 -83 -48 -115s-71 -47 -118 -47c-20 0 -41 3 -62 11s-38 15 -50 22s-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11s-38 -4 -57 -11s-37 -19 -54 -37s-26 -40 -27 -66\nc0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116s72 47 118 47c20 0 41 -3 62 -11s38 -15 50 -22s28 -17 48 -30c29 -19 50 -33 64 -41s31 -16 51 -23s39 -11 58 -11c35 0 66 10 93 31s42 45 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "&#x223d;": {
                x: 966,
                d: "M816 166c0 -21 -5 -32 -14 -32c-7 0 -12 11 -14 33c-3 41 -17 76 -44 103s-58 41 -94 41c-20 0 -40 -5 -60 -14s-38 -19 -50 -29s-29 -24 -51 -44c-23 -21 -42 -36 -55 -46s-31 -20 -53 -30s-44 -15 -65 -15c-49 0 -89 21 -120 62s-46 88 -46 139c0 21 5 32 14 32\nc8 0 13 -11 14 -33c3 -41 18 -75 44 -103s57 -41 94 -41c20 0 40 5 60 14s38 19 50 29s29 24 51 44c23 21 42 36 55 46s31 20 53 30s44 15 65 15c49 0 89 -21 120 -62s46 -88 46 -139z"
            },
            "&#x2241;": {
                x: 965,
                d: "M478 214l-140 -167c-8 -10 -15 -15 -22 -15c-6 0 -10 2 -14 6s-6 9 -6 14s4 13 12 22l138 165c-47 35 -90 53 -129 53c-37 0 -69 -13 -96 -38c-25 -24 -38 -54 -39 -90c-2 -20 -7 -30 -16 -30c-11 0 -16 13 -16 40c0 52 16 98 47 136s71 57 120 57c20 0 41 -4 63 -13\ns39 -19 52 -28s32 -22 55 -40l140 167c9 10 16 15 22 15s11 -2 15 -6s5 -9 5 -14s-4 -13 -12 -22l-138 -165c47 -35 90 -53 129 -53c37 0 69 13 96 38c25 24 38 54 39 90c1 20 7 30 16 30c11 0 16 -13 16 -40c0 -52 -16 -98 -47 -136s-71 -57 -120 -57c-20 0 -40 4 -62 13\ns-40 19 -53 28s-32 22 -55 40z"
            },
            "&#x2242;": {
                x: 965,
                d: "M780 424h-595h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h595h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17zM815 226c0 -49 -16 -93 -47 -132s-71 -58 -120 -58c-21 0 -42 5 -64 14s-38 19 -51 28s-29 21 -49 38c-25 21 -45 36 -58 46\ns-30 18 -50 27s-40 13 -59 13c-33 0 -64 -12 -93 -36s-44 -59 -46 -106c0 -3 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32c0 49 15 92 46 131s71 58 121 58c21 0 41 -5 63 -14s39 -19 52 -28s29 -21 49 -38c25 -21 45 -36 58 -46s30 -18 50 -27s40 -13 59 -13\nc33 0 63 12 92 36s45 59 47 106c0 4 1 8 3 14s6 9 11 9c9 0 14 -10 14 -31z"
            },
            "&#x2243;": {
                x: 967,
                d: "M817 432c0 -49 -15 -92 -47 -128s-72 -54 -120 -54c-21 0 -42 5 -64 14s-40 18 -54 28s-32 23 -55 41c-21 17 -39 30 -53 39s-30 16 -50 24s-38 12 -57 12c-20 0 -40 -4 -59 -12s-38 -23 -54 -44s-25 -47 -26 -78c0 -3 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 10 -14 31\nc0 49 16 92 48 128s71 54 119 54c21 0 42 -5 64 -14s40 -18 54 -28s32 -23 55 -41c21 -17 38 -30 52 -39s30 -16 50 -24s39 -12 58 -12c35 0 66 12 94 36s43 55 45 94c1 18 5 27 14 27s14 -10 14 -31zM186 76h595c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17\nh-597h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20z"
            },
            "&#x22cd;": {
                x: 966,
                d: "M816 282c0 -21 -5 -31 -14 -31c-8 0 -13 11 -14 33c-3 33 -17 62 -43 87s-58 37 -96 37c-41 0 -91 -23 -149 -68c-28 -22 -49 -38 -64 -48s-34 -19 -56 -28s-42 -14 -63 -14c-49 0 -90 19 -121 56s-46 78 -46 125c0 21 5 32 14 32c8 0 13 -11 14 -33c2 -33 16 -61 42 -86\ns59 -38 97 -38c41 0 91 23 149 68c28 22 49 38 64 48s34 19 56 28s42 14 63 14c49 0 89 -18 120 -55s47 -79 47 -127zM186 76h594c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-596h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20z"
            },
            "&#x224f;": {
                x: 965,
                d: "M626 367h154c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-156c-16 0 -26 2 -29 5s-6 12 -7 26c-1 23 -11 44 -31 64s-45 30 -74 30c-28 0 -52 -10 -72 -29s-31 -41 -32 -66c-1 -14 -4 -22 -8 -25s-13 -5 -28 -5h-156\nc-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1h154c6 39 23 70 51 92s59 33 93 33c33 0 63 -10 91 -32s45 -53 52 -93zM186 173h593c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-595c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14\nc0 13 12 20 36 20z"
            },
            "&#x224e;": {
                x: 965,
                d: "M626 367h154c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-156c-16 0 -26 2 -29 5s-6 12 -7 26c-1 23 -11 44 -31 64s-45 30 -74 30c-28 0 -52 -10 -72 -29s-31 -41 -32 -66c-1 -14 -4 -22 -8 -25s-13 -5 -28 -5h-156\nc-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1h154c6 39 23 70 51 92s59 33 93 33c33 0 63 -10 91 -32s45 -53 52 -93zM623 173h156c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-154c-6 -39 -23 -70 -51 -92s-59 -33 -93 -33\nc-33 0 -63 10 -91 32s-45 53 -52 93h-154c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h156c16 0 26 -2 29 -5s6 -12 7 -26c1 -23 12 -44 32 -64s44 -30 73 -30c28 0 52 10 72 29s31 41 32 66c1 14 3 22 7 25s14 5 29 5z"
            },
            "&#x2257;": {
                x: 965,
                d: "M592 611c0 -29 -11 -55 -32 -77s-47 -32 -78 -32c-30 0 -56 10 -77 32s-32 48 -32 77c0 31 11 57 33 78s47 32 77 32c29 0 54 -10 76 -31s33 -48 33 -79zM483 542c25 0 42 5 53 16s16 28 16 53s-5 42 -15 53s-28 17 -55 17s-46 -6 -55 -17s-14 -29 -14 -53\nc0 -26 6 -44 17 -54s28 -15 53 -15zM186 173h593c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-595c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20zM185 367h595c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14\ns-8 -5 -12 -5s-10 -1 -18 -1h-593c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "&#x2245;": {
                x: 965,
                d: "M815 305c0 -32 -6 -63 -19 -93s-32 -55 -58 -76s-56 -31 -89 -31c-17 0 -33 2 -48 7s-31 12 -47 23s-30 21 -40 29s-24 20 -42 36c-20 18 -36 31 -48 40s-28 19 -48 28s-40 14 -60 14c-15 0 -30 -3 -44 -8s-28 -13 -42 -24s-27 -27 -36 -48s-15 -46 -16 -73\nc0 -4 -2 -9 -4 -15s-5 -8 -10 -8c-9 0 -14 11 -14 32c0 32 6 63 19 94s32 57 58 78s56 31 89 31h6c14 0 29 -2 42 -6c15 -5 32 -12 48 -23s28 -21 38 -29s24 -20 43 -37c1 -1 4 -3 7 -6c19 -17 35 -30 46 -39s26 -18 46 -27s38 -13 57 -13c37 0 68 13 95 41s41 63 43 105\nc0 20 5 30 14 30s14 -11 14 -32zM753 -174h-541h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17zM753 20h-541h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14\ns-8 -6 -12 -6h-17z"
            },
            "&#x22de;": {
                x: 927,
                d: "M650 712c0 -3 -1 -9 -2 -18s-4 -23 -10 -42s-15 -36 -26 -53c-24 -37 -57 -69 -98 -95s-84 -44 -129 -54s-83 -16 -113 -20s-57 -6 -82 -6h-22s-8 3 -12 6s-6 8 -6 14c0 13 9 20 26 20c47 0 92 4 136 12s88 21 132 38s80 42 110 75s48 73 55 118c3 17 10 26 21 26\nc5 0 10 -1 14 -5s6 -9 6 -16zM188 310h29c26 0 64 2 115 6c49 5 92 12 132 21s72 19 98 29s49 24 69 39s35 29 45 41s19 27 26 44s12 29 14 38s4 21 6 35c0 3 2 6 5 10s8 6 14 6c7 0 12 -3 15 -7s5 -9 5 -14c0 -33 -12 -70 -36 -110c-47 -78 -143 -131 -288 -159\nc98 -16 177 -49 238 -98c23 -20 43 -45 57 -73s22 -49 25 -64s4 -26 4 -33c0 -6 -3 -11 -7 -15s-8 -6 -13 -6c-11 0 -18 9 -21 26c-15 107 -95 179 -240 214c-81 19 -167 29 -256 29c-35 0 -54 0 -59 1c-10 5 -15 12 -15 20c0 13 13 20 38 20z"
            },
            "&#x22df;": {
                x: 927,
                d: "M761 444c0 -9 -3 -15 -9 -17s-16 -3 -31 -3c-28 0 -58 2 -91 6s-72 13 -116 24s-87 30 -126 56s-70 57 -92 94c-23 39 -35 75 -35 108c0 7 3 12 7 16s8 5 13 5c11 0 18 -8 21 -25c5 -38 19 -72 41 -101s48 -53 77 -70s63 -32 101 -43s73 -20 107 -24s68 -6 103 -6\nc20 0 30 -7 30 -20zM471 289v1c-96 16 -174 49 -235 98c-23 20 -42 44 -56 72s-23 49 -26 64s-4 26 -4 34c0 14 7 21 20 21c11 0 18 -9 21 -26c17 -108 97 -179 240 -214c81 -19 169 -29 263 -29h29c25 0 38 -7 38 -20c0 -7 -3 -11 -7 -14s-9 -5 -14 -6s-14 -1 -27 -1\nc-115 0 -211 -10 -289 -31c-48 -13 -88 -28 -120 -47s-55 -39 -70 -61s-26 -42 -31 -57s-10 -34 -13 -55c-2 -12 -9 -18 -20 -18c-5 0 -10 2 -14 6s-6 9 -6 15c0 33 12 70 36 110c47 79 142 131 285 158z"
            },
            "&#x2250;": {
                x: 965,
                d: "M537 541c0 -16 -6 -29 -17 -39s-23 -16 -38 -16c-13 0 -26 5 -37 15s-17 23 -17 40c0 16 5 29 16 39s24 16 39 16c13 0 26 -5 37 -15s17 -23 17 -40zM186 173h593c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-595\nc-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20zM185 367h595c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-593c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "&#x2251;": {
                x: 965,
                d: "M537 541c0 -16 -6 -29 -17 -39s-23 -16 -38 -16c-13 0 -26 5 -37 15s-17 23 -17 40c0 16 5 29 16 39s24 16 39 16c13 0 26 -5 37 -15s17 -23 17 -40zM537 -41c0 -17 -6 -30 -17 -40s-24 -15 -37 -15c-15 0 -28 6 -39 16s-16 23 -16 39s5 29 16 39s24 16 39 16\nc13 0 26 -5 37 -15s17 -23 17 -40zM186 173h593c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-595c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20zM185 367h595c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14\ns-8 -5 -12 -5s-10 -1 -18 -1h-593c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "&#x2256;": {
                x: 965,
                d: "M559 173h220c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-595c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h220c-21 21 -32 47 -32 77c0 27 11 52 32 77h-220c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1\nh595c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-220c21 -21 32 -47 32 -77c0 -27 -11 -52 -32 -77zM502 327h-39c-8 0 -13 0 -17 -1s-9 -3 -14 -6s-11 -9 -18 -17c-11 -15 -17 -33 -17 -53c0 -21 6 -39 19 -54c9 -11 16 -18 22 -20\ns14 -3 25 -3h39c8 0 14 0 18 1s8 3 13 6s11 9 18 17c11 15 17 33 17 53c0 21 -6 39 -19 54c-9 11 -16 18 -22 20s-14 3 -25 3z"
            },
            "&#x2a96;": {
                x: 927,
                d: "M723 333l-553 261c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -261c13 -6 20 -13 20 -21c0 -7 -3 -12 -7 -15s-8 -5 -13 -5c-3 0 -9 2 -18 6zM741 130l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22\nl525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 6 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -260c13 -6 20 -14 20 -23s-7 -16 -20 -22z"
            },
            "&#x2a95;": {
                x: 927,
                d: "M742 594l-556 -262c-8 -3 -13 -5 -16 -5c-5 0 -10 2 -14 6s-6 8 -6 13c0 9 7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM723 -130l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 9 -2 13 -6s7 -8 7 -14\nc0 -8 -6 -15 -19 -22l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7z"
            },
            "&#x2261;": {
                x: 967,
                d: "M781 424h-595c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 6 12 6h17h597h17s8 -3 12 -6s6 -8 6 -14c0 -13 -12 -20 -36 -20zM782 36h-597h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h595c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17zM782 230h-597h-17\ns-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h597h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x2265;": {
                x: 927,
                d: "M741 324l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 7 17 21 23l523 247l-525 247c-13 6 -19 13 -19 22c0 5 2 10 6 14s8 6 14 6c4 0 11 -2 20 -7l551 -260c13 -6 20 -14 20 -23s-7 -16 -20 -22zM726 -137h-541c-7 0 -13 1 -17 1s-8 2 -12 5\ns-6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "&#x2264;": {
                x: 927,
                d: "M742 594l-525 -248l523 -246c14 -7 21 -14 21 -23c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c6 0 11 -2 15 -6s5 -9 5 -14c0 -9 -6 -16 -19 -22zM726 -137h-541c-7 0 -13 1 -17 1s-8 2 -12 5\ns-6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "&#x2266;": {
                x: 927,
                d: "M742 711l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -9 -6 -16 -19 -22zM726 -174h-541h-17s-8 3 -12 6s-6 8 -6 14\nc0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17zM726 20h-541h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x2267;": {
                x: 927,
                d: "M741 441l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -260c13 -7 20 -14 20 -23s-7 -16 -20 -22zM726 -174h-541h-17s-8 3 -12 6\ns-6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17zM726 20h-541h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h539c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x2a7e;": {
                x: 927,
                d: "M741 324l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -261c13 -6 20 -13 20 -22s-7 -16 -20 -22zM741 130l-553 -260\nc-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l566 267c17 0 26 -7 26 -20c0 -9 -7 -16 -20 -22z"
            },
            "&#x2a7d;": {
                x: 927,
                d: "M742 594l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM723 -130l-553 260c-13 6 -20 13 -20 22\nc0 5 2 10 6 14s8 6 14 6c4 0 10 -2 19 -7l552 -260c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7z"
            },
            "&#x226b;": {
                x: 1189,
                d: "M715 228l-539 -294c-17 0 -26 7 -26 20c0 7 7 14 20 22l502 274l-502 274c-13 8 -20 15 -20 22s2 12 6 15s9 5 14 5c4 0 10 -2 18 -6l527 -288c11 -7 17 -12 18 -16c1 -2 1 -4 1 -6c0 -7 -5 -14 -16 -20c-1 -1 -2 -1 -3 -2zM1020 228l-539 -294c-17 0 -26 7 -26 20\nc0 7 7 14 20 22l502 274l-502 274c-13 8 -20 15 -20 22s2 12 6 15s9 5 14 5c4 0 10 -2 18 -6l527 -288c11 -7 17 -12 18 -16c1 -2 1 -4 1 -6c0 -7 -5 -14 -16 -20c-1 -1 -2 -1 -3 -2z"
            },
            "&#x226a;": {
                x: 1189,
                d: "M714 524l-502 -274l502 -274c13 -8 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -11 2 -19 7l-526 287c-11 7 -17 12 -18 16c-1 2 -1 4 -1 6c0 7 5 14 16 20c1 1 2 1 3 2l527 288c8 4 14 6 18 6c5 0 10 -2 14 -5s6 -8 6 -15s-7 -14 -20 -22zM1019 524l-502 -274l502 -274\nc13 -8 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -11 2 -19 7l-526 287c-11 7 -17 12 -18 16c-1 2 -1 4 -1 6c0 7 5 14 16 20c1 1 2 1 3 2l527 288c8 4 14 6 18 6c5 0 10 -2 14 -5s6 -8 6 -15s-7 -14 -20 -22z"
            },
            "&#x2268;": {
                x: 927,
                d: "M742 711l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -9 -6 -16 -19 -22zM557 20l-147 -154h315c24 0 36 -7 36 -20\nc0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-355c-38 -41 -65 -69 -80 -84c-13 -12 -21 -18 -26 -18s-10 2 -14 6s-6 8 -6 13s3 11 10 18c1 1 4 4 7 8s6 7 7 8c17 19 32 36 47 49h-131h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h168l147 154h-316h-17s-8 3 -12 6s-6 8 -6 14\nc0 13 12 20 36 20h354c38 41 65 69 80 84c13 12 21 18 26 18s10 -2 14 -6s6 -8 6 -13s-3 -11 -10 -18c-1 -1 -3 -4 -7 -8s-6 -7 -7 -8c-17 -19 -32 -36 -47 -49h130c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-169z"
            },
            "&#x2269;": {
                x: 927,
                d: "M741 441l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -260c13 -7 20 -14 20 -23s-7 -16 -20 -22zM557 20l-147 -154h315\nc24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-355c-38 -41 -65 -69 -80 -84c-13 -12 -21 -18 -26 -18s-10 2 -14 6s-6 8 -6 13s3 11 10 18c1 1 4 4 7 8s6 7 7 8c17 19 32 36 47 49h-131h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h168l147 154h-316h-17\ns-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h354c38 41 65 69 80 84c13 12 21 18 26 18s10 -2 14 -6s6 -8 6 -13s-3 -11 -10 -18c-1 -1 -3 -4 -7 -8s-6 -7 -7 -8c-17 -19 -32 -36 -47 -49h130c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-169z"
            },
            "&#x22d8;": {
                x: 1520,
                d: "M712 524l-500 -274l500 -274c13 -7 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -11 2 -19 7l-523 287c-9 5 -14 8 -16 10s-4 7 -4 12c0 7 5 14 16 20c1 1 2 1 3 2l525 287c9 5 15 7 18 7c5 0 10 -2 14 -6s6 -8 6 -14c0 -7 -7 -15 -20 -22zM1350 524l-500 -274l500 -274\nc13 -7 20 -15 20 -22c0 -13 -7 -20 -20 -20c-5 0 -11 2 -19 7l-523 287c-9 5 -14 8 -16 10s-4 7 -4 12c0 7 5 14 16 20c1 1 2 1 3 2l525 287c9 5 15 7 18 7c5 0 10 -2 14 -6s6 -8 6 -14c0 -7 -7 -15 -20 -22zM1031 524l-500 -274l500 -274c13 -7 20 -15 20 -22\nc0 -13 -7 -20 -20 -20c-5 0 -11 2 -19 7l-523 287c-9 5 -15 8 -17 10s-3 7 -3 12c0 7 5 14 16 20c1 1 2 1 3 2l525 287c9 5 15 7 18 7c5 0 9 -2 13 -6s7 -8 7 -14c0 -7 -7 -15 -20 -22z"
            },
            "&#x22d9;": {
                x: 1520,
                d: "M733 228l-544 -287c-9 -5 -15 -7 -19 -7c-13 0 -20 7 -20 20c0 7 7 15 20 22l520 274l-520 274c-13 7 -20 15 -20 22c0 6 2 10 6 14s9 6 14 6c2 0 8 -2 18 -6l545 -288c13 -7 19 -14 19 -22s-6 -15 -19 -22zM1351 228l-544 -287c-9 -5 -15 -7 -19 -7c-13 0 -20 7 -20 20\nc0 3 0 5 1 7s3 4 5 6l4 4s4 2 8 4l521 275l-520 275c-5 3 -7 4 -9 5s-4 2 -6 4s-4 4 -4 6v6c0 6 2 11 5 14s7 4 9 5s4 1 6 1s8 -2 18 -6l544 -288c12 -7 18 -12 19 -16c1 -2 1 -4 1 -6c0 -8 -6 -15 -19 -22zM1042 228l-544 -287c-9 -5 -15 -7 -19 -7c-13 0 -20 7 -20 20\nc0 5 1 9 4 12s8 6 16 10l519 274l-521 275c-12 6 -18 13 -18 21c0 7 3 12 7 15s8 5 13 5c2 0 8 -2 18 -6l544 -288c9 -4 15 -7 17 -10s3 -7 3 -12c0 -8 -6 -15 -19 -22z"
            },
            "&#x2a87;": {
                x: 927,
                d: "M742 594l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM726 -137h-262l-81 -81c-9 -11 -17 -16 -24 -16\nc-13 0 -20 7 -20 20c0 5 4 12 13 22c19 18 37 36 55 55h-222c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h262l80 81c11 11 19 16 24 16s9 -1 12 -4s5 -5 6 -8s2 -6 2 -8c0 -6 -5 -14 -15 -24l-52 -53h220c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -5 -12 -5\ns-10 -1 -17 -1z"
            },
            "&#x2a88;": {
                x: 927,
                d: "M741 324l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -261c13 -6 20 -13 20 -22s-7 -16 -20 -22zM726 -137h-262l-81 -81\nc-9 -11 -17 -16 -24 -16c-13 0 -20 7 -20 20c0 5 4 12 13 22c19 18 37 36 55 55h-222c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20h262l80 81c11 11 19 16 24 16s9 -1 12 -4s5 -5 6 -8s2 -6 2 -8c0 -6 -5 -14 -15 -24l-52 -53h220c24 0 36 -7 36 -20\nc0 -6 -2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "&#x2a89;": {
                x: 965,
                d: "M765 719l-516 -217l518 -217l8 -4c1 -1 3 -2 6 -4s4 -4 5 -6s2 -5 2 -8c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -10 2 -19 6l-550 231c-15 7 -22 14 -22 22c0 9 7 17 22 23l551 231c11 4 17 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -2 -11 -5 -14s-9 -6 -18 -9z\nM445 -214l-60 -145c-5 -13 -13 -20 -22 -20c-5 0 -9 1 -13 5s-7 9 -7 14c0 2 25 62 74 181c-33 20 -67 30 -101 30c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -9 -4 -15s-5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116s72 47 118 47c35 0 70 -10 105 -30\nc8 -5 13 -7 14 -7s3 4 8 13l51 123c-46 30 -80 51 -103 62s-48 16 -75 16c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s72 48 118 48c43 0 95 -20 156 -60c23 -17 37 -26 40 -26c2 0 5 4 8 13l60 145\nc5 13 13 20 22 20c5 0 10 -2 14 -6s6 -8 6 -13c0 -2 -25 -62 -74 -181c33 -20 67 -30 101 -30c36 0 67 11 94 32s41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -82 -48 -114s-71 -48 -118 -48c-35 0 -70 10 -105 30c-8 5 -13 7 -14 7s-4 -4 -8 -13l-51 -123\nc46 -30 80 -50 103 -61s48 -17 75 -17c36 0 67 10 94 31s41 46 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -83 -48 -115s-71 -47 -118 -47c-43 0 -95 20 -156 60c-23 17 -37 26 -40 26c-2 0 -5 -4 -8 -13z"
            },
            "&#x2a8a;": {
                x: 965,
                d: "M766 480l-550 -231c-9 -4 -16 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 4 1 8 3 11s6 5 8 6l12 6l516 217l-518 217c-14 6 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c1 0 7 -2 18 -6l551 -231c15 -6 22 -14 22 -23c0 -8 -7 -15 -22 -22zM445 -214l-60 -145\nc-5 -13 -13 -20 -22 -20c-5 0 -9 1 -13 5s-7 9 -7 14c0 2 25 62 74 181c-33 20 -67 30 -101 30c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -9 -4 -15s-5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116s72 47 118 47c35 0 70 -10 105 -30c8 -5 13 -7 14 -7s3 4 8 13\nl51 123c-46 30 -80 51 -103 62s-48 16 -75 16c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s72 48 118 48c43 0 95 -20 156 -60c23 -17 37 -26 40 -26c2 0 5 4 8 13l60 145c5 13 13 20 22 20\nc5 0 10 -2 14 -6s6 -8 6 -13c0 -2 -25 -62 -74 -181c33 -20 67 -30 101 -30c36 0 67 11 94 32s41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -82 -48 -114s-71 -48 -118 -48c-35 0 -70 10 -105 30c-8 5 -13 7 -14 7s-4 -4 -8 -13l-51 -123\nc46 -30 80 -50 103 -61s48 -17 75 -17c36 0 67 10 94 31s41 46 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -83 -48 -115s-71 -47 -118 -47c-43 0 -95 20 -156 60c-23 17 -37 26 -40 26c-2 0 -5 -4 -8 -13z"
            },
            "&#x22e7;": {
                x: 965,
                d: "M768 420l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -260c13 -7 20 -14 20 -23s-7 -16 -20 -22zM486 -144l-97 -177\nc-7 -12 -11 -19 -13 -22s-7 -4 -13 -4c-13 0 -20 7 -20 20c0 4 3 11 9 21l104 190c-53 45 -99 67 -140 67c-20 0 -39 -4 -58 -13s-38 -26 -54 -50s-25 -54 -26 -90c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62c29 0 54 -7 78 -20\ns52 -34 85 -62l97 177c7 12 12 19 14 22s6 4 12 4c13 0 20 -7 20 -20c0 -4 -3 -11 -9 -21l-104 -190c53 -45 99 -67 140 -67c37 0 68 14 95 42s41 62 43 104c0 20 5 30 14 30s14 -11 14 -32c0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-29 0 -55 7 -79 20s-51 34 -84 62z"
            },
            "&#x22e6;": {
                x: 965,
                d: "M769 690l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM486 -144l-97 -177c-7 -12 -11 -19 -13 -22\ns-7 -4 -13 -4c-13 0 -20 7 -20 20c0 4 3 11 9 21l104 190c-53 45 -99 67 -140 67c-20 0 -39 -4 -58 -13s-38 -26 -54 -50s-25 -54 -26 -90c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62c29 0 54 -7 78 -20s52 -34 85 -62l97 177\nc7 12 12 19 14 22s6 4 12 4c13 0 20 -7 20 -20c0 -4 -3 -11 -9 -21l-104 -190c53 -45 99 -67 140 -67c37 0 68 14 95 42s41 62 43 104c0 20 5 30 14 30s14 -11 14 -32c0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-29 0 -55 7 -79 20s-51 34 -84 62z"
            },
            "&#x2a86;": {
                x: 965,
                d: "M766 480l-550 -231c-9 -4 -16 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 4 1 8 3 11s6 5 8 6l12 6l516 217l-518 217c-14 6 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c1 0 7 -2 18 -6l551 -231c15 -6 22 -14 22 -23c0 -8 -7 -15 -22 -22zM815 -125c0 -45 -16 -83 -48 -115\ns-71 -47 -118 -47c-20 0 -41 3 -62 11s-38 15 -50 22s-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -9 -4 -15s-5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116s72 47 118 47c20 0 41 -3 62 -11\ns38 -15 50 -22s28 -17 48 -30c29 -19 50 -33 64 -41s31 -16 51 -23s39 -11 58 -11c36 0 67 10 94 31s41 46 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31zM815 108c0 -45 -16 -82 -48 -114s-71 -48 -118 -48c-20 0 -41 4 -62 12s-38 14 -50 21s-28 17 -48 30\nc-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s72 48 118 48c20 0 41 -4 62 -12s38 -14 50 -21s28 -17 48 -30c29 -19 50 -33 64 -41s31 -16 51 -23\ns39 -11 58 -11c36 0 67 11 94 32s41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "&#x2a85;": {
                x: 965,
                d: "M765 719l-516 -217l518 -217l8 -4c1 -1 3 -2 6 -4s4 -4 5 -6s2 -5 2 -8c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -10 2 -19 6l-550 231c-15 7 -22 14 -22 22c0 9 7 17 22 23l551 231c11 4 17 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -2 -11 -5 -14s-9 -6 -18 -9z\nM815 -125c0 -45 -16 -83 -48 -115s-71 -47 -118 -47c-20 0 -41 3 -62 11s-38 15 -50 22s-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -9 -4 -15s-5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116\ns72 47 118 47c20 0 41 -3 62 -11s38 -15 50 -22s28 -17 48 -30c29 -19 50 -33 64 -41s31 -16 51 -23s39 -11 58 -11c36 0 67 10 94 31s41 46 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31zM815 108c0 -45 -16 -82 -48 -114s-71 -48 -118 -48c-20 0 -41 4 -62 12s-38 14 -50 21\ns-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s72 48 118 48c20 0 41 -4 62 -12s38 -14 50 -21s28 -17 48 -30c29 -19 50 -33 64 -41\ns31 -16 51 -23s39 -11 58 -11c36 0 67 11 94 32s41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "&#x22db;": {
                x: 891,
                d: "M718 632l-529 -202c-9 -4 -16 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 8 17 23 23l492 188l-494 189c-14 5 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c3 0 9 -2 18 -6l532 -203c14 -5 21 -13 21 -22c0 -10 -8 -18 -23 -23zM718 33l-492 -188l494 -189\nc14 -6 21 -13 21 -22c0 -6 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -10 2 -19 6l-531 203c-14 5 -21 13 -21 22s8 17 24 23l529 202c9 4 15 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -10 -8 -18 -23 -23zM706 230h-521h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h519\nc24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x22da;": {
                x: 891,
                d: "M718 843l-492 -188l494 -189c14 -5 21 -13 21 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -10 2 -19 6l-531 203c-14 5 -21 13 -21 22s8 17 23 23l530 202c9 4 15 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -10 -8 -18 -23 -23zM718 -178l-529 -202c-9 -4 -16 -6 -19 -6\nc-5 0 -10 2 -14 6s-6 8 -6 14c0 9 8 17 24 23l491 188l-494 189c-14 5 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c3 0 9 -2 18 -6l532 -203c14 -6 21 -13 21 -22c0 -10 -8 -18 -23 -23zM706 230h-521h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h519c24 0 36 -7 36 -20\nc0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x2a8b;": {
                x: 927,
                d: "M737 960l-509 -188l512 -189c14 -5 21 -13 21 -22c0 -6 -3 -11 -7 -15s-8 -5 -13 -5c-3 0 -9 2 -18 6l-552 203c-14 5 -21 13 -21 22s8 17 23 23l549 202c10 4 16 6 19 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -10 -8 -18 -24 -23zM174 -420l509 188l-512 189\nc-14 5 -21 13 -21 22c0 6 2 11 6 15s9 5 14 5c3 0 9 -2 18 -6l552 -203c14 -6 21 -13 21 -22s-8 -17 -23 -23l-549 -202c-10 -4 -16 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 10 8 18 24 23zM185 193h541c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14\ns-8 -5 -12 -5s-10 -1 -17 -1h-541c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1zM185 387h541c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-541c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14\ns8 5 12 5s10 1 17 1z"
            },
            "&#x2a8c;": {
                x: 927,
                d: "M738 749l-550 -202c-9 -4 -15 -6 -18 -6c-5 0 -10 1 -14 5s-6 9 -6 15c0 9 8 17 23 23l510 188l-512 189c-14 5 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c3 0 9 -2 19 -6l551 -203c14 -5 21 -13 21 -22c0 -10 -8 -18 -23 -23zM738 -44l-510 -188l512 -189\nc14 -5 21 -13 21 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -19 6l-551 203c-14 5 -21 13 -21 22c0 10 8 18 24 23l549 202c9 4 15 6 18 6c5 0 9 -1 13 -5s7 -9 7 -15c0 -9 -8 -17 -23 -23zM726 153h-541c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20\nh539c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1zM725 347h-539c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1h541c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1z"
            },
            "&#x2277;": {
                x: 927,
                d: "M739 399l-550 -231c-9 -4 -16 -6 -19 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 4 2 7 4 10s4 6 6 7s7 3 13 6l516 217l-518 217c-14 6 -21 13 -21 22c0 5 2 10 6 14s9 6 14 6c1 0 7 -2 18 -6l551 -231c15 -6 22 -14 22 -23c0 -8 -7 -15 -22 -22zM728 -246l-557 233\nc-14 6 -21 13 -21 22c0 6 2 10 5 13s10 6 19 10l547 230c9 4 16 6 20 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -7 -15 -22 -22l-517 -217l517 -217c15 -6 22 -14 22 -23c0 -5 -2 -9 -6 -13s-9 -6 -14 -6c-2 0 -6 1 -13 4z"
            },
            "&#x2276;": {
                x: 990,
                d: "M816 639l-589 -218l589 -217c7 -3 12 -5 14 -6s4 -3 6 -6s4 -6 4 -10c0 -5 -2 -10 -6 -14s-9 -6 -15 -6c-2 0 -8 2 -18 6l-631 232c-13 5 -20 12 -20 22c0 9 7 17 21 22l630 231c10 4 16 5 18 5c6 0 11 -2 15 -6s6 -8 6 -13c0 -4 -2 -8 -4 -11s-4 -5 -6 -6s-7 -2 -14 -5z\nM762 9l-592 218c-13 5 -20 12 -20 21c0 13 6 20 19 20c3 0 10 -2 20 -6l627 -231c7 -3 12 -4 14 -5s4 -3 6 -6s4 -7 4 -11s-2 -8 -4 -11s-4 -5 -6 -6s-7 -2 -14 -5l-632 -233c-7 -3 -12 -4 -15 -4c-5 0 -9 2 -13 6s-6 8 -6 14c0 9 7 17 21 22z"
            },
            "&#x2273;": {
                x: 965,
                d: "M768 420l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -260c13 -7 20 -14 20 -23s-7 -16 -20 -22zM815 -26c0 -51 -15 -97 -46 -138\ns-71 -62 -120 -62c-22 0 -45 6 -67 16s-40 20 -54 31s-32 27 -56 48c-20 18 -36 32 -48 41s-28 18 -48 27s-40 14 -60 14s-39 -4 -58 -13s-38 -26 -54 -50s-25 -54 -26 -90c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62\nc22 0 44 -5 66 -15s40 -21 54 -32s33 -27 57 -48c20 -18 35 -31 47 -40s28 -19 48 -28s41 -14 61 -14c37 0 68 14 95 42s41 62 43 104c0 20 5 30 14 30s14 -11 14 -32z"
            },
            "&#x2272;": {
                x: 965,
                d: "M769 690l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -8 -6 -15 -19 -22zM815 -26c0 -51 -15 -97 -46 -138\ns-71 -62 -120 -62c-22 0 -45 6 -67 16s-40 20 -54 31s-32 27 -56 48c-20 18 -36 32 -48 41s-28 18 -48 27s-40 14 -60 14s-39 -4 -58 -13s-38 -26 -54 -50s-25 -54 -26 -90c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62\nc22 0 44 -5 66 -15s40 -21 54 -32s33 -27 57 -48c20 -18 35 -31 47 -40s28 -19 48 -28s41 -14 61 -14c37 0 68 14 95 42s41 62 43 104c0 20 5 30 14 30s14 -11 14 -32z"
            },
            "&#x232e;": {
                x: 927,
                d: "M742 711l-525 -248l524 -247c13 -6 20 -13 20 -22c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -9 2 -18 7l-553 260c-13 6 -20 13 -20 22s7 17 20 23l553 261c8 4 14 6 18 6c5 0 10 -2 14 -6s6 -9 6 -14c0 -9 -6 -16 -19 -22zM726 -174h-250v-64c0 -25 -7 -38 -20 -38\nc-6 0 -11 2 -14 6s-6 6 -6 10v17v69h-251h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h250v154h-251h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h250v69v17s3 6 6 10s8 6 14 6c13 0 20 -13 20 -38v-64h249c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-250\nv-154h249c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x232f;": {
                x: 927,
                d: "M741 441l-553 -260c-9 -5 -15 -7 -18 -7c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 6 16 19 22l525 248l-524 247c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21c0 5 2 10 6 14s9 6 14 6c4 0 11 -2 20 -7l551 -260c13 -7 20 -14 20 -23s-7 -16 -20 -22zM726 -174h-250v-64\nc0 -25 -7 -38 -20 -38c-6 0 -11 2 -14 6s-6 6 -6 10v17v69h-251h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h250v154h-251h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h250v69v17s3 6 6 10s8 6 14 6c13 0 20 -13 20 -38v-64h249c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14\ns-8 -6 -12 -6h-17h-250v-154h249c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x226f;": {
                x: 927,
                d: "M742 228l-362 -171l-123 -241c-5 -9 -9 -15 -12 -18s-7 -4 -11 -4c-5 0 -10 2 -14 6s-6 8 -6 14c0 10 36 82 107 215l-81 -37c-5 -3 -17 -9 -36 -18s-31 -13 -34 -13c-5 0 -10 2 -14 6s-6 8 -6 13c0 9 7 17 20 23l181 85l133 261l-314 148c-13 6 -20 14 -20 23\nc0 5 2 9 6 13s9 6 14 6c4 0 10 -2 18 -6l314 -148l154 302c7 13 14 19 21 19c5 0 10 -2 14 -6s6 -8 6 -14c0 -4 -3 -11 -8 -20l-151 -298l203 -96c1 0 1 0 2 -1c12 -6 18 -13 18 -21c0 -9 -6 -17 -19 -22zM520 332l-111 -216l285 134z"
            },
            "&#x2271;": {
                x: 927,
                d: "M451 188l-118 -285h393c8 0 14 -1 18 -1s8 -2 12 -5s5 -8 5 -14c0 -13 -12 -20 -37 -20h-408l-59 -142c-7 -16 -14 -24 -23 -24c-6 0 -10 2 -14 6s-6 9 -6 14s20 54 59 146h-86c-25 0 -37 7 -37 20c0 6 2 11 6 14s7 5 11 5s10 1 18 1h104l109 260l-212 -100\nc-8 -4 -13 -6 -16 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 7 17 20 23l250 118l90 216l-338 160c-6 3 -10 4 -13 6s-5 4 -7 6s-2 6 -2 10c0 6 2 10 6 14s9 6 14 6s12 -2 21 -7l335 -158l136 326c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -6 -19l-129 -311l180 -84\nc13 -6 19 -13 19 -22c0 -6 -2 -10 -5 -13s-8 -6 -17 -10zM546 417l-72 -174l220 104z"
            },
            "&#x2270;": {
                x: 927,
                d: "M452 191l-119 -288h393c8 0 14 -1 18 -1s8 -2 12 -5s5 -8 5 -14c0 -13 -12 -20 -37 -20h-408l-59 -142c-7 -16 -14 -24 -23 -24c-6 0 -10 2 -14 6s-6 9 -6 14s20 54 59 146h-86c-25 0 -37 7 -37 20c0 6 2 11 6 14s7 5 11 5s10 1 18 1h104l128 305l-246 116\nc-14 7 -21 14 -21 23s7 16 21 23l389 183l102 244c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -6 -19l-77 -186l108 52c7 4 13 6 19 6c5 0 10 -2 14 -6s6 -8 6 -14c0 -5 -1 -10 -4 -12s-9 -5 -18 -10l-148 -71l-123 -295l271 -127c5 -3 9 -4 10 -5c2 -2 2 -2 6 -5\nc3 -2 4 -4 5 -6s1 -5 1 -8c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -49 21 -137 63zM537 498l-320 -151l215 -102z"
            },
            "&#x226e;": {
                x: 927,
                d: "M560 412l-132 -261c14 -7 48 -23 100 -48s101 -47 148 -69s72 -34 75 -36c7 -7 10 -12 10 -17c0 -7 -3 -12 -7 -15s-8 -5 -13 -5c-4 0 -12 3 -25 9l-36 17l-271 128c-101 -203 -155 -307 -161 -314c-3 -5 -8 -7 -14 -7c-5 0 -10 2 -14 6s-6 8 -6 14c0 5 5 16 14 33\nl145 285l-203 96c-1 0 -1 0 -2 1c-12 6 -18 13 -18 21s6 15 19 22l362 170l125 245c7 13 14 19 21 19c5 0 10 -2 14 -6s6 -8 6 -14c0 -4 -3 -11 -8 -20l-99 -196l135 64c8 3 13 5 16 5c5 0 9 -2 13 -5s7 -8 7 -15c0 -9 -7 -16 -20 -22zM502 384l-285 -134l174 -82z"
            },
            "&#x2331;": {
                x: 927,
                d: "M739 441l-235 -111l-92 -270h314h18s8 -3 12 -6s5 -8 5 -14c0 -13 -12 -20 -37 -20h-326l-52 -154h380h18s8 -3 12 -6s5 -8 5 -14c0 -13 -12 -20 -37 -20h-392l-76 -222c-5 -16 -12 -24 -22 -24c-6 0 -10 2 -14 6s-6 9 -6 14c0 3 2 10 5 20l71 206h-103\nc-25 0 -37 7 -37 20c0 6 2 11 6 14s7 6 11 6h18h118l53 154h-169c-25 0 -37 7 -37 20c0 6 2 11 6 14s7 6 11 6h18h185l84 246l-268 -126c-8 -4 -13 -6 -16 -6c-5 0 -10 2 -14 6s-6 9 -6 14c0 9 7 17 20 23l302 142l61 181l-361 171c-6 3 -10 5 -13 7s-5 4 -7 6s-2 5 -2 9\nc0 6 2 11 6 15s9 5 14 5s12 -2 21 -7l355 -168l109 318c5 16 12 24 22 24c6 0 11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -5 -20l-109 -319l159 -75c13 -7 19 -14 19 -22c0 -6 -2 -10 -5 -13s-8 -6 -17 -10zM694 464l-124 59l-48 -141z"
            },
            "&#x2330;": {
                x: 927,
                d: "M613 651l-110 -323l127 -59l124 -59c5 -9 7 -15 7 -16c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -22 8 -57 25l-62 30c-14 7 -27 13 -40 19s-22 10 -30 14s-15 7 -22 10s-12 6 -16 8s-7 3 -10 4s-4 2 -6 3s-3 1 -4 2s-3 1 -4 2l-78 -231h314h18s8 -3 12 -6s5 -8 5 -14\nc0 -13 -12 -20 -37 -20h-326l-52 -154h380h18s8 -3 12 -6s5 -8 5 -14c0 -13 -12 -20 -37 -20h-392l-76 -222c-5 -16 -12 -24 -22 -24c-6 0 -10 2 -14 6s-6 9 -6 14c0 3 2 10 5 20l71 206h-103c-25 0 -37 7 -37 20c0 6 2 11 6 14s7 6 11 6h18h118l53 154h-169\nc-25 0 -37 7 -37 20c0 6 2 11 6 14s7 6 11 6h18h185l84 248l-283 133c-14 7 -21 14 -21 23s7 16 21 23l410 193l74 216c5 16 12 24 22 24c6 0 11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -5 -20l-60 -176c68 33 104 49 109 49s10 -1 14 -5s6 -9 6 -15c0 -5 -1 -9 -4 -11\ns-9 -6 -18 -11zM217 464l250 -118l96 281z"
            },
            "&#x2332;": {
                x: 927,
                d: "M591 523l-123 -295l271 -127c5 -3 9 -4 10 -5c2 -2 2 -2 6 -5c3 -2 4 -4 5 -6s1 -5 1 -8c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -49 21 -137 63l-152 71l-51 -125l340 -160c13 -6 20 -14 20 -23c0 -5 -2 -10 -6 -14s-9 -6 -14 -6c-3 0 -13 4 -30 13l-250 118\nc-2 1 -9 4 -22 10s-24 11 -35 16s-16 8 -17 8c-2 0 -5 -4 -8 -13l-130 -312c-4 -4 -9 -6 -15 -6s-10 2 -14 6s-6 9 -6 14c0 3 2 10 6 19l129 311l-172 81c-9 4 -14 6 -17 8s-5 4 -7 7s-3 6 -3 10c0 5 2 10 6 14s9 6 14 6c1 0 16 -7 45 -20c4 -2 13 -7 27 -13s22 -10 26 -11\nl97 -46l52 125l-246 116c-14 7 -21 14 -21 23s7 16 21 23l389 183l102 244c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -6 -19l-77 -186l108 52c7 4 13 6 19 6c5 0 10 -2 14 -6s6 -8 6 -14c0 -5 -1 -10 -4 -12s-9 -5 -18 -10zM217 347l215 -102l105 253z"
            },
            "&#x2333;": {
                x: 927,
                d: "M739 130l-388 -183l-102 -244c-4 -4 -9 -6 -15 -6s-10 2 -14 6s-6 9 -6 14c0 3 2 10 6 19l77 185c-81 -39 -124 -58 -127 -58c-5 0 -10 2 -14 6s-6 9 -6 14c0 6 1 11 4 13s11 7 25 14l140 65c1 2 7 17 19 45s23 56 36 86s20 49 23 56l-211 -99c-8 -4 -13 -6 -16 -6\nc-5 0 -10 2 -14 6s-6 9 -6 14c0 9 7 17 20 23l250 118l90 216l-338 160c-6 3 -10 4 -13 6s-5 4 -7 6s-2 6 -2 10c0 6 2 10 6 14s9 6 14 6s12 -2 21 -7l335 -158l136 326c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -6 -19l-129 -311l180 -84c13 -6 19 -13 19 -22\nc0 -6 -2 -10 -5 -13s-8 -6 -17 -10l-288 -136l-77 -186l86 40l100 48l142 67c23 11 36 16 39 16c5 0 10 -2 14 -6s6 -9 6 -14c0 -6 -2 -10 -5 -13s-8 -6 -17 -10zM546 417l-72 -174l220 104z"
            },
            "&#x226c;": {
                x: 651,
                d: "M346 -129c33 -35 72 -66 118 -93c9 -5 14 -10 14 -15c0 -9 -4 -13 -12 -13c-3 0 -12 4 -26 12s-31 20 -53 37s-43 34 -62 52c-18 -18 -38 -35 -60 -51s-40 -30 -54 -38s-23 -12 -26 -12c-8 0 -12 4 -12 13c0 4 4 9 12 14c49 29 89 61 120 94c-17 20 -32 39 -44 55\ns-28 41 -48 74s-36 71 -47 114s-16 89 -16 136s5 93 16 136s27 81 47 114s36 58 48 74s27 35 44 55c-33 35 -72 66 -118 93c-9 5 -14 10 -14 15c0 9 4 13 12 13c3 0 11 -4 25 -12s32 -20 54 -37s43 -34 62 -52c18 18 38 35 60 51s40 30 54 38s23 12 26 12c8 0 12 -4 12 -13\nc0 -5 -4 -9 -12 -14c-49 -29 -89 -61 -120 -94c17 -20 32 -39 44 -55s28 -41 48 -74s35 -71 46 -114s17 -89 17 -136s-6 -93 -17 -136s-26 -81 -46 -114s-36 -58 -48 -74s-27 -35 -44 -55zM326 -107c19 22 37 47 54 74s33 67 50 120s26 107 26 163c0 45 -5 88 -15 130\ns-23 78 -39 108s-29 54 -41 72s-24 34 -36 47c-19 -22 -37 -47 -54 -74s-34 -67 -51 -120s-25 -107 -25 -163c0 -45 5 -88 15 -130s22 -78 38 -108s30 -54 42 -72s24 -34 36 -47z"
            },
            "&#x2280;": {
                x: 927,
                d: "M455 206l-206 -406c-4 -4 -9 -6 -15 -6s-10 2 -14 6s-6 9 -6 14c0 4 3 11 8 20l192 379c-68 11 -141 17 -220 17h-24s-10 3 -14 6s-6 7 -6 14c0 6 2 11 6 14s8 5 12 5s10 1 18 1c120 0 209 8 268 24c1 1 4 6 8 13l200 393c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14\nc0 -4 -3 -11 -8 -20l-181 -358c36 11 67 24 94 40s48 30 62 44s25 31 34 50s14 32 16 42s5 22 7 36c2 13 9 19 20 19c13 0 20 -7 20 -21c0 -25 -8 -55 -25 -89c-22 -44 -54 -79 -95 -105s-94 -48 -159 -65l-4 -8l-3 -6c-1 -1 -1 -2 -1 -3c39 -8 74 -19 106 -33\ns58 -28 77 -43s37 -32 51 -50s24 -34 30 -48s12 -28 16 -43s6 -25 6 -30s1 -10 1 -13c0 -7 -3 -12 -7 -16s-8 -6 -13 -6c-11 0 -18 9 -21 28c-17 111 -106 184 -265 218z"
            },
            "&#x2281;": {
                x: 927,
                d: "M455 206l-206 -406c-4 -4 -9 -6 -15 -6s-10 2 -14 6s-6 9 -6 14c0 1 6 14 17 39l67 131c5 10 4 10 18 37c9 18 17 33 24 47s11 21 12 22l51 102c-36 -11 -67 -24 -94 -40s-47 -30 -61 -44s-25 -31 -34 -50s-16 -33 -18 -43s-4 -22 -6 -37c-2 -12 -9 -18 -20 -18\nc-5 0 -10 2 -14 6s-6 9 -6 16c0 26 8 56 25 89c23 45 55 81 97 107s94 47 157 63l4 8l3 6c1 1 1 2 1 3c-39 8 -75 19 -107 33s-57 28 -76 43s-36 32 -50 50s-26 34 -32 48s-11 28 -15 43s-7 25 -7 30v13c0 14 7 21 20 21c5 0 9 -2 12 -5s5 -5 6 -8s2 -8 3 -14\nc17 -112 106 -185 265 -218l206 406c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14c0 -4 -3 -11 -8 -20l-192 -379c75 -11 149 -17 220 -17h25s9 -3 13 -6s6 -7 6 -14c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-18c-103 0 -193 -8 -270 -24z"
            },
            "&#x22e0;": {
                x: 927,
                d: "M495 293l-162 -390h393c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-410l-59 -142c-7 -16 -14 -24 -23 -24c-6 0 -10 2 -14 6s-6 9 -6 14s20 54 59 146h-88c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1\nh104l167 400c-75 16 -161 24 -258 24c-13 0 -23 0 -28 1s-10 2 -14 5s-6 7 -6 14c0 9 4 15 10 17s19 3 38 3c115 0 214 11 299 34l165 396c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -6 -19l-144 -346c35 14 65 30 89 48s41 36 52 56s19 38 23 50s7 27 10 45\nc2 13 9 19 20 19c13 0 20 -7 20 -21c0 -27 -9 -59 -28 -96c-35 -69 -104 -119 -207 -150l-15 -39c77 -22 138 -55 183 -100c23 -24 39 -51 50 -82s17 -54 17 -69c0 -7 -3 -13 -7 -17s-8 -5 -13 -5c-11 0 -18 9 -21 28c-16 103 -91 172 -225 208zM442 346l30 -6l5 15l-35 -8\nv-1z"
            },
            "&#x22e1;": {
                x: 927,
                d: "M502 311l-169 -408h393c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-410l-59 -142c-7 -16 -14 -24 -23 -24c-6 0 -10 2 -14 6s-6 9 -6 14s20 54 59 146h-88c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1\nh104l166 399c-77 -14 -139 -40 -186 -79c-43 -35 -70 -84 -79 -148c-2 -12 -9 -18 -20 -18c-5 0 -10 1 -14 5s-6 10 -6 17c0 25 8 54 24 87c21 43 54 80 99 110s110 54 195 70v1c-143 29 -239 83 -286 164c-9 15 -16 31 -21 49s-8 31 -9 39s-2 13 -2 16c0 14 7 21 20 21\nc5 0 9 -1 12 -4s5 -7 6 -10s2 -7 3 -13c9 -61 38 -109 87 -145s120 -63 212 -79l172 412c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -6 -19l-160 -385c40 -5 70 -8 91 -9l109 -3c20 0 30 -7 30 -20c0 -9 -3 -15 -9 -17s-17 -3 -32 -3c-86 0 -159 -5 -218 -16z"
            },
            "&#x227a;": {
                x: 927,
                d: "M439 249c97 -19 172 -49 225 -90c27 -21 49 -47 65 -77s25 -52 28 -66s4 -26 4 -34c0 -15 -7 -22 -20 -22c-11 0 -18 7 -21 22c-2 14 -4 26 -6 35s-9 23 -18 42s-20 35 -34 49s-33 28 -60 44s-58 29 -94 40c-81 23 -183 36 -308 37c-15 0 -24 0 -30 1s-10 2 -14 5\ns-6 7 -6 14c0 13 10 20 29 20c164 1 292 20 383 57s143 98 157 184c3 19 10 29 22 29c5 0 10 -2 14 -6s6 -9 6 -16s-2 -21 -7 -40s-11 -37 -20 -54c-48 -88 -146 -146 -295 -174z"
            },
            "&#x227b;": {
                x: 927,
                d: "M472 249c-57 11 -105 26 -146 45s-72 38 -93 58s-38 42 -53 67c-9 15 -16 33 -22 53s-8 36 -8 45c0 7 2 12 6 16s9 6 14 6c11 0 18 -8 21 -24c9 -53 30 -96 63 -129c77 -77 230 -116 457 -117c15 0 25 0 31 -1s10 -2 14 -5s5 -7 5 -14c0 -13 -10 -20 -29 -20\nc-144 -1 -256 -14 -335 -39c-35 -11 -65 -24 -91 -40s-46 -30 -59 -44s-24 -29 -33 -48s-15 -33 -17 -42s-4 -21 -7 -36c-1 -13 -8 -20 -20 -20c-13 0 -20 7 -20 22c0 7 1 18 4 32s12 37 28 67s37 56 64 77c52 41 127 71 226 91z"
            },
            "&#x227c;": {
                x: 927,
                d: "M188 310h29c26 0 64 2 115 6c49 5 92 12 132 21s72 19 98 29s49 24 69 39s35 29 45 41s19 27 26 44s12 29 14 38s4 21 6 35c0 3 2 6 5 10s8 6 14 6c7 0 12 -3 15 -7s5 -9 5 -14c0 -33 -12 -70 -36 -110c-47 -78 -143 -131 -288 -159c98 -16 177 -49 238 -98\nc23 -20 43 -45 57 -73s22 -49 25 -64s4 -26 4 -33c0 -6 -3 -11 -7 -15s-8 -6 -13 -6c-11 0 -18 9 -21 26c-15 107 -95 179 -240 214c-81 19 -167 29 -256 29c-35 0 -54 0 -59 1c-10 5 -15 12 -15 20c0 13 13 20 38 20zM650 -133c0 -7 -2 -11 -6 -15s-9 -6 -14 -6\nc-11 0 -18 8 -21 25c-7 47 -25 87 -55 120s-68 58 -112 75s-88 30 -131 38s-86 11 -131 11c-20 0 -30 7 -30 20c0 9 3 15 9 17s16 3 31 3c123 0 228 -26 317 -77c26 -15 49 -34 68 -54s34 -38 43 -54s17 -34 22 -52s8 -29 9 -36s1 -12 1 -15z"
            },
            "&#x227d;": {
                x: 927,
                d: "M694 310h29c25 0 38 -7 38 -20c0 -7 -3 -11 -7 -14s-9 -5 -14 -6s-14 -1 -27 -1c-115 0 -211 -10 -289 -31c-48 -13 -88 -28 -120 -47s-55 -39 -70 -61s-26 -42 -31 -57s-10 -34 -13 -55c-2 -12 -9 -18 -20 -18c-5 0 -10 2 -14 6s-6 9 -6 15c0 33 12 70 36 110\nc47 79 142 131 285 158v1c-96 16 -174 49 -235 98c-23 20 -42 44 -56 72s-23 49 -26 64s-4 26 -4 34c0 14 7 21 20 21c11 0 18 -9 21 -26c17 -108 97 -179 240 -214c81 -19 169 -29 263 -29zM761 135c0 -13 -9 -20 -26 -20c-37 0 -74 -2 -109 -7s-72 -12 -109 -24\ns-70 -27 -99 -44s-55 -41 -76 -70s-34 -61 -40 -98c-3 -17 -10 -26 -21 -26c-5 0 -9 2 -13 6s-7 8 -7 15c0 4 0 9 1 15s4 19 10 38s12 37 22 54s26 35 48 56s47 40 76 56c87 46 188 69 303 69c11 0 19 -1 23 -1s8 -1 12 -4s5 -8 5 -15z"
            },
            "&#x227e;": {
                x: 965,
                d: "M815 -26c0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-22 0 -45 6 -67 16s-40 20 -54 31s-32 27 -56 48c-20 18 -36 32 -48 41s-28 18 -48 27s-40 14 -60 14s-39 -4 -58 -13s-38 -26 -54 -50s-25 -54 -26 -90c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32\nc0 51 15 97 46 138s71 62 120 62c22 0 44 -5 66 -15s40 -21 54 -32s33 -27 57 -48c20 -18 35 -31 47 -40s28 -19 48 -28s41 -14 61 -14c37 0 68 14 95 42s41 62 43 104c0 20 5 30 14 30s14 -11 14 -32zM467 442c150 -29 248 -87 294 -173c18 -35 27 -66 27 -95\nc0 -14 -7 -21 -20 -21c-11 0 -18 9 -21 26c-7 45 -26 86 -57 121s-83 64 -156 85c-81 23 -183 36 -307 37c-22 0 -33 0 -34 1c-3 0 -5 1 -8 4c-5 3 -8 8 -8 15c0 13 10 20 29 20c127 0 228 10 305 31c39 10 72 22 101 37s51 29 67 43s29 30 39 49s18 34 21 47s6 28 9 45\nc3 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -27 -8 -57 -24 -88c-22 -43 -55 -81 -100 -111s-111 -53 -197 -70z"
            },
            "&#x227f;": {
                x: 965,
                d: "M815 -26c0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-22 0 -45 6 -67 16s-40 20 -54 31s-32 27 -56 48c-20 18 -36 32 -48 41s-28 18 -48 27s-40 14 -60 14s-39 -4 -58 -13s-38 -26 -54 -50s-25 -54 -26 -90c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32\nc0 51 15 97 46 138s71 62 120 62c22 0 44 -5 66 -15s40 -21 54 -32s33 -27 57 -48c20 -18 35 -31 47 -40s28 -19 48 -28s41 -14 61 -14c37 0 68 14 95 42s41 62 43 104c0 20 5 30 14 30s14 -11 14 -32zM740 422c-61 0 -119 -3 -172 -10s-106 -18 -158 -34s-94 -40 -128 -72\ns-55 -71 -62 -117c-2 -14 -4 -24 -7 -29s-8 -7 -16 -7c-13 0 -20 7 -20 21c0 34 12 71 37 111c47 77 141 129 281 156v1c-95 19 -170 49 -223 92c-27 21 -48 47 -64 78s-26 54 -28 68s-3 24 -3 31c0 6 2 11 6 15s9 6 14 6c11 0 18 -8 21 -23c9 -67 43 -120 100 -159\ns142 -65 256 -78c53 -7 108 -10 166 -10h13h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-13z"
            },
            "&#x2282;": {
                x: 927,
                d: "M726 500h-267c-77 0 -141 -25 -192 -74s-77 -108 -77 -176s26 -127 77 -176s115 -74 192 -74h267h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-269c-85 0 -157 28 -217 85s-90 125 -90 205s30 148 90 205s132 85 217 85h269h17s8 -3 12 -6s6 -8 6 -14\ns-2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x2283;": {
                x: 927,
                d: "M452 500h-267h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h269c85 0 158 -28 218 -85s89 -125 89 -205s-29 -148 -89 -205s-133 -85 -218 -85h-269h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h267c77 0 141 25 192 74s77 108 77 176s-26 127 -77 176\ns-115 74 -192 74z"
            },
            "&#x2288;": {
                x: 927,
                d: "M621 596l-206 -496c13 -2 28 -3 45 -3h266c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-269c-21 0 -41 2 -58 5l-66 -159h393c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-410l-59 -142\nc-7 -16 -14 -24 -23 -24c-6 0 -10 2 -14 6s-6 9 -6 14s20 54 59 146h-68c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h84l71 169c-57 16 -107 48 -148 98s-62 109 -62 177c0 81 30 149 90 205s131 84 216 84h138l68 161c4 4 9 6 15 6s11 -2 15 -6\ns5 -9 5 -14c0 -3 -2 -10 -6 -19l-53 -128h88h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-105zM578 596h-119c-77 0 -141 -25 -192 -74s-77 -107 -77 -176c0 -57 18 -107 53 -150s79 -72 132 -87z"
            },
            "&#x2289;": {
                x: 927,
                d: "M691 764l-72 -173c39 -23 73 -56 101 -99s41 -91 41 -146c0 -81 -29 -149 -89 -205s-132 -84 -217 -84h-58l-64 -154h373c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-390l-59 -142c-7 -16 -14 -24 -23 -24c-6 0 -10 2 -14 6\ns-6 9 -6 14s20 54 59 146h-88c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h104l65 154h-169c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h185l198 476c-37 15 -76 23 -117 23h-266h-17s-8 3 -12 6s-6 8 -6 14\ns2 11 6 14s8 6 12 6h17h269c48 0 91 -9 130 -27l78 188c4 4 9 6 15 6s11 -2 15 -6s5 -9 5 -14c0 -3 -2 -10 -6 -19zM603 554l-189 -457c31 0 56 1 74 2s41 7 69 17s54 26 77 46c58 49 87 111 87 185c0 38 -10 76 -29 113s-48 68 -89 94z"
            },
            "&#x2286;": {
                x: 927,
                d: "M726 596h-267c-77 0 -141 -25 -192 -74s-77 -107 -77 -176c0 -68 25 -127 76 -176s116 -73 193 -73h267c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-269c-85 0 -157 29 -217 85s-90 124 -90 205c0 79 30 147 90 204\ns132 85 217 85h269h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17zM205 -97h521c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-521c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "&#x2287;": {
                x: 927,
                d: "M452 596h-267h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h269c85 0 157 -28 217 -84s90 -125 90 -206c0 -79 -29 -147 -89 -204s-133 -85 -218 -85h-269c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h267c77 0 141 24 192 73\ns77 108 77 177c0 68 -26 126 -77 175s-115 74 -192 74zM706 -137h-521c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h521c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "&#x228a;": {
                x: 927,
                d: "M726 596h-267c-77 0 -141 -25 -192 -74s-77 -107 -77 -176c0 -67 25 -126 76 -175s115 -74 194 -74h266c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-269c-85 0 -157 28 -217 84s-90 125 -90 206s30 149 90 205s131 84 216 84h270\nh17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17zM726 -137h-263l-85 -78c-14 -13 -24 -19 -29 -19c-13 0 -20 7 -20 20c0 5 5 12 14 23c1 1 5 4 12 10s15 13 25 23s18 17 23 21h-198c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h243\nl85 78c14 13 24 19 29 19s9 -1 12 -4s5 -5 6 -8s2 -6 2 -8c0 -6 -5 -14 -14 -23c-1 -1 -5 -4 -12 -10s-16 -13 -26 -23s-17 -17 -22 -21h218c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "&#x228b;": {
                x: 927,
                d: "M451 596h-266h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h269c85 0 158 -28 218 -84s89 -125 89 -206s-29 -149 -89 -205s-132 -84 -217 -84h-270c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h267c77 0 141 24 192 73s77 108 77 177\nc0 67 -25 126 -76 175s-115 74 -194 74zM706 -137h-242c-45 -51 -68 -77 -70 -79c-11 -12 -20 -18 -25 -18c-13 0 -20 7 -20 20c0 4 4 11 12 21c3 5 11 13 23 27s21 24 26 29h-225c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1h262\nc31 35 54 61 70 78c12 13 20 19 25 19s9 -1 12 -4s5 -5 6 -8s2 -6 2 -8c0 -6 -4 -13 -12 -21l-49 -56h205c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "&#x2ab7;": {
                x: 965,
                d: "M467 442c150 -29 248 -87 294 -173c18 -35 27 -66 27 -95c0 -14 -7 -21 -20 -21c-11 0 -18 9 -21 26c-7 45 -26 86 -57 121s-83 64 -156 85c-81 23 -183 36 -307 37c-22 0 -33 0 -34 1c-3 0 -5 1 -8 4c-5 3 -8 8 -8 15c0 13 10 20 29 20c127 0 228 10 305 31\nc39 10 72 22 101 37s51 29 67 43s29 30 39 49s18 34 21 47s6 28 9 45c3 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -27 -8 -57 -24 -88c-22 -43 -55 -81 -100 -111s-111 -53 -197 -70zM815 -125c0 -45 -16 -83 -48 -115s-71 -47 -118 -47c-20 0 -41 3 -62 11\ns-38 15 -50 22s-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -9 -4 -15s-5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116s72 47 118 47c20 0 41 -3 62 -11s38 -15 50 -22s28 -17 48 -30\nc29 -19 50 -33 64 -41s31 -16 51 -23s39 -11 58 -11c36 0 67 10 94 31s41 46 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31zM815 108c0 -45 -16 -82 -48 -114s-71 -48 -118 -48c-20 0 -41 4 -62 12s-38 14 -50 21s-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23\ns-39 11 -58 11c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s72 48 118 48c20 0 41 -4 62 -12s38 -14 50 -21s28 -17 48 -30c29 -19 50 -33 64 -41s31 -16 51 -23s39 -11 58 -11c36 0 67 11 94 32\ns41 45 44 73c1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "&#x2ab8;": {
                x: 965,
                d: "M740 422c-61 0 -119 -3 -172 -10s-106 -18 -158 -34s-94 -40 -128 -72s-55 -71 -62 -117c-2 -14 -4 -24 -7 -29s-8 -7 -16 -7c-13 0 -20 7 -20 21c0 34 12 71 37 111c47 77 141 129 281 156v1c-95 19 -170 49 -223 92c-27 21 -48 47 -64 78s-26 54 -28 68s-3 24 -3 31\nc0 6 2 11 6 15s9 6 14 6c11 0 18 -8 21 -23c9 -67 43 -120 100 -159s142 -65 256 -78c53 -7 108 -10 166 -10h13h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17h-13zM815 -125c0 -45 -16 -83 -48 -115s-71 -47 -118 -47c-20 0 -41 3 -62 11s-38 15 -50 22\ns-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11c-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -9 -4 -15s-5 -8 -10 -8c-9 0 -14 10 -14 30c0 45 16 84 48 116s72 47 118 47c20 0 41 -3 62 -11s38 -15 50 -22s28 -17 48 -30c29 -19 50 -33 64 -41\ns31 -16 51 -23s39 -11 58 -11c36 0 67 10 94 31s41 46 44 74c1 21 6 32 14 32c9 0 14 -10 14 -31zM815 108c0 -45 -16 -82 -48 -114s-71 -48 -118 -48c-20 0 -41 4 -62 12s-38 14 -50 21s-28 17 -48 30c-29 19 -50 33 -64 41s-31 16 -51 23s-39 11 -58 11\nc-32 0 -63 -10 -92 -29s-44 -48 -46 -85c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 10 -14 30c0 45 16 83 48 115s72 48 118 48c20 0 41 -4 62 -12s38 -14 50 -21s28 -17 48 -30c29 -19 50 -33 64 -41s31 -16 51 -23s39 -11 58 -11c36 0 67 11 94 32s41 45 44 73\nc1 21 6 32 14 32c9 0 14 -10 14 -31z"
            },
            "&#x2aaf;": {
                x: 927,
                d: "M439 346c97 -19 172 -49 225 -90c27 -21 49 -47 65 -77s25 -53 28 -67s4 -25 4 -33c0 -15 -7 -22 -20 -22c-11 0 -18 7 -21 22c-2 13 -4 25 -6 35s-8 24 -17 42s-21 34 -35 48s-33 30 -60 46s-58 28 -94 39c-81 23 -183 36 -308 37c-15 0 -24 0 -30 1s-10 2 -14 5\ns-6 7 -6 14c0 13 10 20 29 20c164 1 292 20 383 57s143 98 157 184c3 19 10 29 22 29c5 0 10 -2 14 -6s6 -9 6 -16s-2 -21 -7 -40s-11 -37 -20 -54c-48 -88 -146 -146 -295 -174zM185 -97h541c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5\ns-10 -1 -17 -1h-541c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "&#x2ab0;": {
                x: 927,
                d: "M472 346c-57 11 -105 25 -146 44s-72 38 -93 58s-38 43 -53 68c-9 15 -16 34 -22 54s-8 35 -8 44c0 7 2 12 6 16s9 6 14 6c11 0 18 -8 21 -24c9 -53 30 -96 63 -129c77 -77 230 -116 457 -117c15 0 25 0 31 -1s10 -2 14 -5s5 -7 5 -14c0 -13 -10 -20 -29 -20\nc-144 -1 -256 -14 -335 -39c-34 -11 -63 -24 -89 -39s-46 -30 -60 -44s-25 -28 -34 -46s-14 -32 -16 -42s-5 -21 -7 -34c-2 -17 -9 -25 -21 -25c-13 0 -20 7 -20 22c0 7 1 19 4 33s12 36 28 66s37 56 64 77c52 41 127 71 226 91zM185 -97h541c7 0 13 -1 17 -1s8 -2 12 -5\ns6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1h-541c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14s2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "&#x2ab9;": {
                x: 965,
                d: "M439 -114l60 117c-45 30 -79 51 -105 63s-52 18 -78 18c-19 0 -38 -3 -57 -10s-37 -20 -54 -38s-26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116s72 47 118 47c33 0 71 -11 114 -34c10 -5 24 -14 41 -26s34 -22 50 -32c5 9 16 29 31 60\ns24 48 27 52c6 11 10 17 12 19s6 3 11 3c13 0 20 -7 20 -20c0 -4 -5 -16 -16 -35c-5 -10 -10 -21 -16 -34s-13 -25 -20 -39s-12 -23 -14 -27c32 -17 63 -25 93 -25c35 0 66 10 93 31s42 45 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -82 -48 -114\ns-71 -48 -118 -48c-33 0 -68 10 -105 29c-5 3 -8 5 -10 5l-8 -13l-60 -117c45 -30 80 -51 106 -63s51 -18 77 -18c35 0 66 10 93 31s42 45 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -83 -48 -115s-71 -47 -118 -47c-33 0 -71 11 -114 34c-10 5 -24 13 -41 25\ns-34 23 -50 33c-5 -9 -16 -29 -31 -60s-24 -48 -27 -52c-6 -11 -10 -17 -12 -19s-6 -3 -11 -3c-13 0 -20 7 -20 20c0 4 5 16 16 35c5 10 11 21 17 34s13 26 20 40l13 26c-32 17 -63 25 -93 25c-19 0 -38 -4 -57 -11s-37 -19 -54 -37s-26 -40 -27 -66c0 -15 -5 -23 -14 -23\ns-14 10 -14 30c0 46 16 85 48 116s72 47 118 47c33 0 68 -10 105 -29c5 -3 8 -5 10 -5zM507 502c88 -15 157 -44 207 -89c21 -19 38 -41 50 -67s19 -44 21 -56s3 -21 3 -26c0 -14 -7 -21 -20 -21c-7 0 -11 2 -14 6s-5 8 -5 11c-3 15 -5 27 -8 36s-8 23 -17 41s-21 33 -34 45\ns-31 24 -56 38s-55 25 -88 33c-82 19 -173 29 -274 29h-57c-25 0 -38 7 -38 20c0 7 3 12 7 15s9 5 14 5s12 1 22 1c137 0 239 8 307 24c37 9 70 19 97 33s48 28 62 40s26 26 36 44s16 32 18 42s5 23 8 38c2 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15s-2 -16 -4 -29\ns-9 -32 -22 -58s-29 -48 -50 -65c-49 -42 -118 -71 -205 -87z"
            },
            "&#x2aba;": {
                x: 965,
                d: "M439 -114l60 117c-45 30 -79 51 -105 63s-52 18 -78 18c-19 0 -38 -3 -57 -10s-37 -20 -54 -38s-26 -40 -27 -66c0 -15 -5 -23 -14 -23s-14 10 -14 30c0 46 16 85 48 116s72 47 118 47c33 0 71 -11 114 -34c10 -5 24 -14 41 -26s34 -22 50 -32c5 9 16 29 31 60\ns24 48 27 52c6 11 10 17 12 19s6 3 11 3c13 0 20 -7 20 -20c0 -4 -5 -16 -16 -35c-5 -10 -10 -21 -16 -34s-13 -25 -20 -39s-12 -23 -14 -27c32 -17 63 -25 93 -25c35 0 66 10 93 31s42 45 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -82 -48 -114\ns-71 -48 -118 -48c-33 0 -68 10 -105 29c-5 3 -8 5 -10 5l-8 -13l-60 -117c45 -30 80 -51 106 -63s51 -18 77 -18c35 0 66 10 93 31s42 45 45 74c1 21 6 32 14 32c9 0 14 -10 14 -31c0 -45 -16 -83 -48 -115s-71 -47 -118 -47c-33 0 -71 11 -114 34c-10 5 -24 13 -41 25\ns-34 23 -50 33c-5 -9 -16 -29 -31 -60s-24 -48 -27 -52c-6 -11 -10 -17 -12 -19s-6 -3 -11 -3c-13 0 -20 7 -20 20c0 4 5 16 16 35c5 10 11 21 17 34s13 26 20 40l13 26c-32 17 -63 25 -93 25c-19 0 -38 -4 -57 -11s-37 -19 -54 -37s-26 -40 -27 -66c0 -15 -5 -23 -14 -23\ns-14 10 -14 30c0 46 16 85 48 116s72 47 118 47c33 0 68 -10 105 -29c5 -3 8 -5 10 -5zM693 482c-101 0 -187 -8 -259 -25c-36 -9 -67 -20 -94 -33s-48 -26 -62 -38s-26 -28 -35 -46s-15 -32 -18 -42s-5 -22 -8 -38c-3 -11 -9 -17 -20 -17c-13 0 -20 7 -20 21c0 6 1 16 3 29\ns10 33 23 59s29 47 50 64c49 42 117 71 202 86v1c-86 15 -154 44 -204 89c-21 19 -37 40 -49 66s-20 45 -22 57s-3 21 -3 26c0 6 2 11 6 15s9 6 14 6c11 0 17 -6 19 -17c5 -25 11 -47 18 -64s20 -37 42 -59s50 -39 84 -52s80 -24 142 -33s135 -14 219 -14c30 0 47 -1 52 -2\nc10 -2 15 -8 15 -19c0 -13 -13 -20 -38 -20h-57z"
            },
            "&#x2ab5;": {
                x: 927,
                d: "M217 443h-29c-25 0 -38 7 -38 20c0 7 2 12 6 15s10 4 15 5s14 1 27 1c115 0 211 10 289 31c48 13 88 28 120 47s56 40 71 62s25 41 30 56s10 34 13 55c2 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -33 -12 -70 -36 -110c-47 -78 -143 -131 -288 -159\nc98 -16 177 -49 238 -98c23 -20 43 -44 57 -72s22 -49 25 -64s4 -26 4 -34c0 -14 -7 -21 -20 -21c-11 0 -18 9 -21 26c-17 108 -97 179 -240 214c-81 19 -169 29 -263 29zM557 20l-147 -154h315c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-355\nc-38 -41 -65 -69 -80 -84c-13 -12 -21 -18 -26 -18s-10 2 -14 6s-6 8 -6 13s3 11 10 18c1 1 4 4 7 8s6 7 7 8c17 19 32 36 47 49h-131h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h168l147 154h-316h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h354c38 41 65 69 80 84\nc13 12 21 18 26 18s10 -2 14 -6s6 -8 6 -13s-3 -11 -10 -18c-1 -1 -3 -4 -7 -8s-6 -7 -7 -8c-17 -19 -32 -36 -47 -49h130c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-169z"
            },
            "&#x2ab6;": {
                x: 927,
                d: "M723 443h-29c-26 0 -64 -2 -115 -6c-119 -11 -211 -35 -275 -73s-102 -91 -113 -162c-3 -19 -10 -28 -21 -28c-13 0 -20 7 -20 21c0 33 12 70 36 110c47 79 142 131 285 158v1c-96 16 -174 49 -235 98c-23 20 -42 44 -56 72s-23 49 -26 64s-4 26 -4 34c0 6 2 11 6 15\ns9 6 14 6c11 0 18 -9 21 -26c17 -108 97 -179 240 -214c85 -19 173 -29 262 -29c31 0 49 -1 53 -2c10 -1 15 -8 15 -19c0 -13 -13 -20 -38 -20zM557 20l-147 -154h315c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-355c-38 -41 -65 -69 -80 -84\nc-13 -12 -21 -18 -26 -18s-10 2 -14 6s-6 8 -6 13s3 11 10 18c1 1 4 4 7 8s6 7 7 8c17 19 32 36 47 49h-131h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h168l147 154h-316h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h354c38 41 65 69 80 84c13 12 21 18 26 18\ns10 -2 14 -6s6 -8 6 -13s-3 -11 -10 -18c-1 -1 -3 -4 -7 -8s-6 -7 -7 -8c-17 -19 -32 -36 -47 -49h130c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17h-169z"
            },
            "&#x22e8;": {
                x: 965,
                d: "M486 -144l-97 -177c-7 -12 -11 -19 -13 -22s-7 -4 -13 -4c-13 0 -20 7 -20 20c0 4 3 11 9 21l104 190c-53 45 -99 67 -140 67c-20 0 -39 -4 -58 -13s-38 -26 -54 -50s-25 -54 -26 -90c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62\nc29 0 54 -7 78 -20s52 -34 85 -62l97 177c7 12 12 19 14 22s6 4 12 4c13 0 20 -7 20 -20c0 -4 -3 -11 -9 -21l-104 -190c53 -45 99 -67 140 -67c37 0 68 14 95 42s41 62 43 104c0 20 5 30 14 30s14 -11 14 -32c0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-29 0 -55 7 -79 20\ns-51 34 -84 62zM467 442c150 -29 248 -87 294 -173c18 -35 27 -66 27 -95c0 -14 -7 -21 -20 -21c-11 0 -18 9 -21 26c-7 45 -26 86 -57 121s-83 64 -156 85c-81 23 -183 36 -307 37c-22 0 -33 0 -34 1c-3 0 -5 1 -8 4c-5 3 -8 8 -8 15c0 13 10 20 29 20c127 0 228 10 305 31\nc39 10 72 22 101 37s51 29 67 43s29 30 39 49s18 34 21 47s6 28 9 45c3 12 9 18 20 18c5 0 10 -2 14 -6s6 -9 6 -15c0 -27 -8 -57 -24 -88c-22 -43 -55 -81 -100 -111s-111 -53 -197 -70z"
            },
            "&#x22e9;": {
                x: 965,
                d: "M486 -144l-97 -177c-7 -12 -11 -19 -13 -22s-7 -4 -13 -4c-13 0 -20 7 -20 20c0 4 3 11 9 21l104 190c-53 45 -99 67 -140 67c-20 0 -39 -4 -58 -13s-38 -26 -54 -50s-25 -54 -26 -90c0 -4 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 97 46 138s71 62 120 62\nc29 0 54 -7 78 -20s52 -34 85 -62l97 177c7 12 12 19 14 22s6 4 12 4c13 0 20 -7 20 -20c0 -4 -3 -11 -9 -21l-104 -190c53 -45 99 -67 140 -67c37 0 68 14 95 42s41 62 43 104c0 20 5 30 14 30s14 -11 14 -32c0 -51 -15 -97 -46 -138s-71 -62 -120 -62c-29 0 -55 7 -79 20\ns-51 34 -84 62zM498 442c-97 19 -172 49 -226 92c-27 21 -48 47 -64 78s-26 54 -28 68s-3 24 -3 31c0 6 2 11 6 15s9 6 14 6c11 0 18 -8 21 -23c11 -73 49 -129 114 -168s160 -64 286 -74c43 -3 83 -5 120 -5c22 0 33 0 34 -1c3 0 5 -1 8 -4c5 -3 8 -8 8 -15\nc0 -13 -10 -20 -29 -20c-335 -2 -514 -80 -539 -233c-2 -14 -4 -24 -7 -29s-8 -7 -16 -7c-13 0 -20 7 -20 21c0 34 12 71 37 111c47 77 141 130 284 157z"
            },
            "&#x223c;": {
                x: 967,
                d: "M817 334c0 -51 -15 -96 -46 -138s-71 -63 -122 -63c-21 0 -43 5 -65 15s-40 20 -53 31s-31 26 -53 46c-22 19 -39 34 -51 43s-28 18 -49 28s-41 15 -60 15c-35 0 -67 -13 -95 -39s-43 -64 -45 -115c0 -3 -2 -8 -4 -14s-5 -9 -10 -9c-9 0 -14 11 -14 32c0 51 15 96 46 138\ns71 63 122 63c21 0 43 -5 65 -15s40 -20 53 -31s31 -26 53 -46c22 -19 39 -34 51 -43s28 -18 49 -28s41 -15 60 -15c37 0 69 14 96 41s42 64 44 110c1 17 5 26 14 26s14 -11 14 -32z"
            },
            "&#x225c;": {
                x: 966,
                d: "M505 842l192 -334c0 -12 -2 -19 -7 -22s-15 -4 -29 -4h-356h-18s-8 3 -12 6s-6 8 -6 14c0 5 3 12 8 21l184 319c7 11 14 17 22 17s15 -6 22 -17zM483 799l-160 -277h320zM186 173h594c8 0 14 -1 18 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1\nh-596c-7 0 -13 1 -17 1s-8 2 -12 5s-6 8 -6 14c0 13 12 20 36 20zM185 367h596c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -18 -1h-594c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 5 12 5s10 1 17 1z"
            },
            "&#x21b6;": {
                x: 1235,
                d: "M350 88c68 85 143 105 144 105c11 0 11 -12 11 -15c0 -12 -1 -12 -17 -20c-69 -30 -115 -76 -146 -140c-7 -15 -8 -17 -15 -17s-9 5 -12 10c-35 77 -85 121 -155 151c-9 3 -10 7 -10 15c0 5 0 16 11 16c8 0 92 -33 147 -110c28 249 212 379 388 379\nc245 0 389 -234 389 -426c0 -17 0 -34 -20 -34c-19 0 -20 17 -20 44c-3 154 -123 376 -349 376c-185 0 -329 -152 -346 -334z"
            },
            "&#x21b7;": {
                x: 1236,
                d: "M928 83c55 78 139 110 147 110c11 0 11 -11 11 -16c0 -11 -2 -12 -15 -17c-102 -45 -136 -118 -152 -153c-2 -4 -6 -6 -10 -6c-7 0 -9 4 -13 12c-12 26 -49 103 -145 144c-19 9 -20 9 -20 21c0 3 0 15 11 15c3 0 77 -21 144 -105c-16 180 -159 334 -347 334\nc-200 0 -346 -184 -349 -390c0 -9 0 -30 -20 -30s-20 17 -20 34c0 194 146 426 389 426c190 0 365 -146 389 -379z"
            },
            "&#x21ba;": {
                x: 965,
                d: "M622 393l-30 9c-9 50 -31 98 -73 139c-16 16 -17 16 -30 17c-7 0 -19 1 -19 12c0 13 13 13 21 13c16 0 44 -4 47 -4s69 14 127 76c7 -2 24 -7 29 -8c-45 -52 -105 -78 -109 -80c159 -56 230 -194 230 -317c0 -182 -148 -333 -333 -333c-181 0 -332 148 -332 333\nc0 206 176 301 194 301c11 0 12 -10 12 -12c0 -7 -4 -10 -14 -15c-139 -76 -167 -202 -167 -274c0 -169 137 -308 308 -308c167 0 307 137 307 308c0 130 -84 254 -220 295l-5 -20c37 -50 51 -97 57 -132z"
            },
            "&#x21bb;": {
                x: 965,
                d: "M400 525l-5 20c-136 -41 -220 -164 -220 -295c0 -169 137 -308 308 -308c167 0 307 137 307 308c0 69 -26 197 -168 275c-8 4 -13 7 -13 14c0 2 1 12 12 12c18 0 194 -96 194 -301c0 -182 -148 -333 -333 -333c-181 0 -332 148 -332 333c0 122 70 261 230 317\nc-4 2 -64 28 -109 80c5 1 22 6 29 8c57 -62 124 -76 127 -76s31 4 47 4c8 0 21 0 21 -13c0 -11 -11 -12 -21 -12c-9 0 -14 -1 -36 -24c-40 -44 -58 -91 -65 -132l-30 -9c6 37 21 84 57 132z"
            },
            "&#x21be;": {
                x: 487,
                d: "M190 608v-767c0 -17 0 -35 -20 -35s-20 17 -20 35v853h20c27 -55 81 -119 167 -151v-31c-25 8 -86 27 -147 96z"
            },
            "&#x21bf;": {
                x: 487,
                d: "M337 694v-853c0 -17 0 -35 -20 -35s-20 17 -20 35v767c-61 -69 -122 -88 -147 -96v31c85 32 140 95 167 151h20z"
            },
            "&#x21c2;": {
                x: 487,
                d: "M190 659v-767c61 69 122 88 147 96v-31c-85 -32 -140 -95 -167 -151h-20v853c0 17 0 35 20 35s20 -17 20 -35z"
            },
            "&#x21c3;": {
                x: 487,
                d: "M337 659v-853h-20c-27 55 -81 119 -167 151v31c25 -8 86 -27 147 -96v767c0 17 0 35 20 35s20 -17 20 -35z"
            },
            "&#x21c4;": {
                x: 1187,
                d: "M1002 480h-771c9 -8 66 -57 101 -147h-31c-16 45 -56 116 -150 167c94 50 133 121 150 167h31c-35 -90 -92 -139 -101 -147h771c17 0 35 0 35 -20s-17 -20 -35 -20zM956 147h-771c-18 0 -35 0 -35 20s17 20 36 20h770c-17 15 -71 68 -101 146h31c30 -79 91 -136 150 -166\nc-68 -37 -122 -91 -150 -167h-31c9 23 34 87 101 147z"
            },
            "&#x21c6;": {
                x: 1187,
                d: "M956 480h-771c-17 0 -35 0 -35 20s17 20 35 20h771c-45 40 -79 91 -101 147h31c16 -45 56 -116 150 -167c-94 -50 -133 -121 -150 -167h-31c35 90 92 139 101 147zM1002 147h-771c67 -60 92 -123 101 -147h-31c-28 74 -80 129 -150 167c61 31 121 88 150 166h31\nc-28 -75 -79 -127 -101 -146h770c19 0 36 0 36 -20s-17 -20 -35 -20z"
            },
            "&#x21c8;": {
                x: 966,
                d: "M670 613v-770c0 -19 0 -37 -20 -37s-20 16 -20 34v774c-22 -23 -69 -73 -147 -102c-78 29 -125 79 -147 102v-774c0 -18 0 -34 -20 -34s-20 18 -20 37v770c-40 -45 -90 -79 -146 -101v31c67 25 127 75 167 151c33 -70 95 -124 166 -151c76 29 134 85 167 151\nc46 -92 120 -134 166 -151v-31c-29 12 -90 38 -146 101z"
            },
            "&#x21ca;": {
                x: 966,
                d: "M670 657v-770c40 45 90 79 146 101v-31c-50 -19 -122 -63 -166 -151h-1c-33 70 -95 124 -166 151c-76 -29 -134 -85 -167 -151c-46 92 -120 134 -166 151v31c29 -12 90 -38 146 -101v770c0 19 0 37 20 37s20 -16 20 -34v-774c22 23 69 73 147 102\nc78 -29 125 -79 147 -102v774c0 18 0 34 20 34s20 -18 20 -37z"
            },
            "&#x21cb;": {
                x: 1187,
                d: "M1002 327h-852v20c55 27 119 81 151 167h31c-8 -25 -27 -86 -96 -147h766c17 0 35 0 35 -20s-17 -20 -35 -20zM951 133h-766c-17 0 -35 0 -35 20s17 20 35 20h852v-20c-55 -27 -119 -81 -151 -167h-31c8 25 27 86 96 147z"
            },
            "&#x21cc;": {
                x: 1187,
                d: "M1037 327h-852c-17 0 -35 0 -35 20s17 20 35 20h766c-69 61 -88 122 -96 147h31c32 -85 95 -140 151 -167v-20zM1002 133h-766c69 -61 88 -122 96 -147h-31c-32 85 -95 140 -151 167v20h852c17 0 35 0 35 -20s-17 -20 -35 -20z"
            },
            "&#x21cd;": {
                x: 1186,
                d: "M745 327l-65 -154h320c18 0 36 0 36 -20s-18 -20 -35 -20h-338l-62 -147c-4 -9 -8 -19 -21 -19c-8 0 -20 6 -20 20c0 7 52 127 60 146h-207c81 -89 100 -144 100 -146c0 -12 -11 -12 -20 -12c-6 0 -11 0 -15 3c-2 1 -2 3 -13 22c-49 91 -139 192 -299 237\nc-11 3 -16 5 -16 13s5 10 17 13c158 45 250 146 301 243c10 18 10 19 25 19c9 0 20 0 20 -12c0 -3 -19 -58 -100 -146h306l61 144c6 15 10 22 22 22c8 0 20 -6 20 -20c0 -3 -1 -5 -6 -18l-54 -128h239c17 0 35 0 35 -20s-18 -20 -36 -20h-255zM702 327h-314\nc-18 0 -19 -1 -21 -2c-1 0 -9 -6 -19 -14c-45 -33 -103 -59 -107 -61c4 -2 58 -25 114 -67c13 -10 15 -10 33 -10h249z"
            },
            "&#x21ce;": {
                x: 1229,
                d: "M713 497l-41 -130h186c-59 70 -86 141 -86 146c0 12 13 12 19 12c15 0 16 -1 24 -19c61 -138 163 -207 257 -246c1 0 7 -2 7 -10c0 -6 -4 -9 -6 -10c-49 -20 -183 -77 -258 -247c-8 -17 -8 -18 -24 -18c-6 0 -19 0 -19 12c0 5 28 77 86 146h-260\nc-14 -48 -30 -97 -45 -145c-4 -10 -7 -21 -22 -21c-5 0 -20 4 -20 20c0 6 18 60 22 71c7 21 18 59 23 75h-185c59 -70 86 -141 86 -146c0 -12 -13 -12 -19 -12c-15 0 -16 1 -24 19c-61 138 -163 207 -257 246c-1 0 -7 2 -7 10c0 6 4 9 6 10c49 20 183 77 258 247\nc8 17 8 18 24 18c6 0 19 0 19 -12c0 -5 -28 -77 -86 -146h260c14 48 30 97 45 145c4 10 7 21 22 21c5 0 20 -4 20 -20c0 -1 -4 -14 -5 -16zM331 173h238l49 154h-287c-33 -33 -75 -60 -105 -77c30 -17 72 -44 105 -77zM660 327l-49 -154h287c33 33 75 60 105 77\nc-30 17 -72 44 -105 77h-238z"
            },
            "&#x21cf;": {
                x: 1186,
                d: "M620 495l-54 -128h207c-81 89 -100 144 -100 146c0 12 11 12 20 12c6 0 11 0 15 -3c2 -1 2 -3 13 -22c49 -91 139 -192 299 -237c11 -3 16 -5 16 -13s-5 -10 -17 -13c-158 -45 -250 -146 -301 -243c-10 -18 -10 -19 -25 -19c-9 0 -20 0 -20 12c0 3 19 58 100 146h-306\nl-62 -147c-4 -9 -8 -19 -21 -19c-8 0 -20 6 -20 20c0 7 52 127 60 146h-239c-17 0 -35 0 -35 20s19 20 36 20h255l65 154h-320c-17 0 -36 0 -36 20s18 20 35 20h338l61 144c6 15 10 22 22 22c8 0 20 -6 20 -20c0 -3 -1 -5 -6 -18zM484 173h314c18 0 19 1 21 2c1 0 9 6 19 14\nc45 33 103 59 107 61c-4 2 -58 25 -114 67c-13 10 -15 10 -33 10h-249z"
            },
            "&#x21d0;": {
                x: 1188,
                d: "M1003 133h-591c49 -47 100 -134 100 -147c0 -11 -13 -11 -19 -11c-14 0 -15 1 -26 21c-56 107 -156 198 -291 238c-19 6 -20 7 -22 8l-3 2c-1 2 -1 4 -1 6s0 5 2 6c2 2 3 3 20 9c52 15 119 42 188 103c65 58 93 111 114 149c4 8 11 8 19 8c6 0 19 0 19 -11\nc0 -13 -52 -101 -100 -147h591c17 0 35 0 35 -20s-18 -20 -36 -20h-635c-41 -35 -90 -61 -126 -77c33 -15 84 -41 126 -77h635c18 0 36 0 36 -20s-18 -20 -35 -20z"
            },
            "&#x21d1;": {
                x: 848,
                d: "M541 430v-588c0 -18 0 -36 -20 -36s-20 19 -20 36v634c-38 45 -65 99 -77 126c-11 -25 -38 -80 -77 -126v-634c0 -18 0 -36 -20 -36s-20 18 -20 36v588c-34 -31 -48 -42 -69 -57c-31 -21 -71 -43 -77 -43c-11 0 -11 11 -11 20c0 11 0 16 8 20c152 78 220 192 255 312\nc1 4 3 11 11 11c4 0 9 -2 10 -8c31 -106 92 -231 252 -313c12 -6 12 -8 12 -22c0 -9 0 -20 -11 -20c-6 0 -44 21 -77 44c-16 11 -30 20 -69 56z"
            },
            "&#x21d2;": {
                x: 1188,
                d: "M821 327h-635c-17 0 -36 0 -36 20s18 20 35 20h591c-49 47 -100 134 -100 147c0 11 13 11 19 11c14 0 15 -1 26 -21c56 -107 156 -198 291 -238c19 -6 20 -7 22 -8l3 -2c1 -2 1 -4 1 -6s0 -5 -2 -6c-2 -2 -3 -3 -20 -9c-52 -15 -119 -42 -188 -103\nc-65 -58 -93 -111 -114 -149c-4 -8 -11 -8 -19 -8c-6 0 -19 0 -19 11c0 13 52 101 100 147h-591c-17 0 -35 0 -35 20s19 20 36 20h635c41 35 90 61 126 77c-33 15 -84 41 -126 77z"
            },
            "&#x21d3;": {
                x: 848,
                d: "M541 658v-588c34 31 48 42 69 57c31 21 71 43 77 43c11 0 11 -11 11 -20c0 -11 0 -16 -8 -20c-143 -74 -217 -181 -255 -312c-1 -4 -3 -11 -11 -11c-4 0 -9 2 -10 8c-32 112 -97 233 -252 313c-12 6 -12 8 -12 22c0 9 0 20 11 20c6 0 44 -21 77 -44c16 -11 30 -20 69 -56\nv588c0 18 0 36 20 36s20 -18 20 -36v-634c38 -45 65 -99 77 -126c11 25 38 80 77 126v634c0 17 0 36 20 36s20 -18 20 -36z"
            },
            "&#x21d4;": {
                x: 1231,
                d: "M370 367h491c-57 65 -87 138 -87 146c0 12 11 12 20 12c12 0 16 -1 20 -10c51 -116 133 -201 243 -247c20 -9 21 -10 23 -12c1 -2 1 -4 1 -6c0 -7 -3 -8 -17 -14c-131 -56 -205 -148 -246 -240c-9 -20 -9 -21 -24 -21c-9 0 -20 0 -20 12c0 8 30 81 87 146h-491\nc57 -65 87 -138 87 -146c0 -12 -11 -12 -20 -12c-12 0 -16 1 -20 10c-51 116 -133 201 -243 247c-20 9 -21 10 -23 12c-1 2 -1 4 -1 6c0 7 3 8 17 14c131 56 205 148 246 240c9 20 9 21 24 21c9 0 20 0 20 -12c0 -8 -30 -81 -87 -146zM331 173h569c20 20 50 45 105 77\nc-41 24 -75 48 -105 77h-569c-20 -20 -50 -45 -105 -77c41 -24 75 -48 105 -77z"
            },
            "&#x21d5;": {
                x: 848,
                d: "M541 550v-600c67 56 140 86 146 86c11 0 11 -10 11 -19c0 -12 0 -14 -3 -16c-1 -1 -2 -2 -20 -11c-68 -30 -175 -98 -237 -246c-5 -11 -7 -15 -14 -15s-9 3 -14 16c-57 133 -145 205 -251 251c-9 4 -9 7 -9 21c0 9 0 19 11 19c6 0 79 -29 146 -86v600\nc-67 -56 -140 -86 -146 -86c-11 0 -11 10 -11 19c0 12 0 14 3 16c1 1 2 2 20 11c68 30 175 98 237 246c5 11 7 15 14 15s9 -3 14 -16c57 -133 145 -205 251 -251c9 -4 9 -7 9 -21c0 -9 0 -19 -11 -19c-6 0 -79 29 -146 86zM347 590v-680c33 -34 59 -72 77 -105\nc18 33 44 71 77 105v680c-33 34 -59 72 -77 105c-18 -33 -44 -71 -77 -105z"
            },
            "&#x21da;": {
                x: 1166,
                d: "M981 230h-738c84 -57 131 -116 154 -144c8 -9 9 -10 28 -10h555c17 0 36 0 36 -20s-18 -20 -35 -20h-547c34 -55 58 -107 72 -147h-47c-57 160 -166 282 -309 361c151 83 255 209 309 361h47c-12 -35 -36 -88 -72 -147h547c17 0 35 0 35 -20s-19 -20 -36 -20h-555\nc-19 0 -20 -1 -28 -11c-21 -25 -70 -86 -154 -143h738c17 0 35 0 35 -20s-17 -20 -35 -20z"
            },
            "&#x21db;": {
                x: 1166,
                d: "M741 424h-556c-17 0 -35 0 -35 20s17 20 35 20h547c-34 55 -58 107 -72 147h47c57 -160 166 -282 309 -361c-151 -83 -255 -209 -309 -361h-47c12 35 36 88 72 147h-547c-17 0 -35 0 -35 20s17 20 35 20h556c19 0 20 1 28 11c21 25 70 86 154 143h-738\nc-20 0 -35 0 -35 20s15 20 35 20h738c-84 57 -131 116 -154 144c-8 9 -9 10 -28 10z"
            },
            "&#x21dd;": {
                x: 1187,
                d: "M284 342l164 -148c22 19 162 146 165 148c11 9 13 11 20 11s9 0 27 -16c23 -20 34 -31 73 -67h224c-9 8 -66 57 -101 147h31c16 -45 56 -116 150 -167c-94 -50 -133 -121 -150 -167h-31c35 90 92 139 101 147h-216c-21 0 -23 0 -34 10l-74 66l-75 -68l-79 -71\nc-22 -20 -24 -20 -31 -20s-9 0 -23 14c-5 4 -23 20 -25 21l-137 124c-27 -22 -47 -42 -68 -60c-17 -16 -19 -16 -25 -16c-10 0 -20 9 -20 20c0 9 4 13 16 24l68 60c20 19 22 19 29 19c3 0 9 0 21 -11z"
            },
            "&#x21ab;": {
                x: 1206,
                d: "M755 230v-237c0 -17 0 -35 -20 -35s-20 18 -20 35v237h-485c9 -8 66 -57 101 -147h-31c-16 45 -56 116 -150 167c94 50 133 121 150 167h31c-35 -90 -92 -139 -101 -147h485v60c0 153 29 246 171 246c108 0 170 -51 170 -172c0 -135 -80 -174 -239 -174h-62zM755 270h59\nc160 0 202 37 202 134c0 96 -41 132 -130 132c-99 0 -131 -45 -131 -209v-57z"
            },
            "&#x21ac;": {
                x: 1206,
                d: "M491 230v-237c0 -17 0 -35 -20 -35s-20 19 -20 36v236h-62c-160 0 -239 39 -239 174c0 110 51 172 170 172c141 0 171 -92 171 -246v-60h485c-9 8 -66 57 -101 147h31c16 -45 56 -116 150 -167c-94 -50 -133 -121 -150 -167h-31c35 90 92 139 101 147h-485zM392 270h59\nv57c0 164 -33 209 -131 209c-89 0 -130 -36 -130 -132c0 -97 42 -134 202 -134z"
            },
            "&#x21ad;": {
                x: 1574,
                d: "M1344 230h-134c-25 0 -26 1 -55 32l-42 42l-78 -79c-16 -17 -55 -60 -73 -74c-5 -4 -10 -4 -12 -4c-9 0 -12 4 -22 13c-23 24 -53 53 -69 71c-23 25 -47 49 -72 73c-24 -23 -48 -47 -71 -72l-40 -40c-7 -8 -26 -27 -33 -35c-7 -6 -11 -10 -19 -10c-2 0 -8 0 -13 4\nc-15 14 -51 52 -65 67c-29 28 -73 72 -85 86c-60 -58 -48 -50 -65 -65c-9 -8 -10 -9 -32 -9h-134c9 -8 66 -57 101 -147h-31c-16 45 -56 116 -150 167c94 50 133 121 150 167h31c-35 -90 -92 -139 -101 -147h141l54 55c27 27 28 28 36 28s11 -2 22 -14l141 -143l150 153\nc1 0 5 4 13 4c6 0 10 -1 22 -13l142 -144c17 18 145 149 149 152c6 5 11 5 13 5c8 0 9 -1 46 -37l44 -46h141c-45 40 -79 91 -101 147h31c29 -77 83 -131 150 -167c-59 -30 -119 -85 -150 -167h-31c33 84 84 132 101 147z"
            },
            "&#x21ae;": {
                x: 1185,
                d: "M603 230l-100 -151c-10 -15 -17 -15 -22 -15c-10 0 -19 8 -19 20c0 6 10 22 17 33l76 113h-321c75 -55 108 -138 108 -146c0 -9 -8 -12 -15 -12c-11 0 -13 5 -17 14c-27 58 -65 112 -148 151c-7 4 -12 6 -12 13s3 8 14 14c100 47 132 119 147 154c2 4 4 10 16 10\nc7 0 15 -3 15 -12c0 -8 -33 -91 -108 -146h348l100 151c10 15 17 15 22 15c10 0 19 -8 19 -20c0 -6 -10 -22 -17 -33l-76 -113h321c-75 55 -108 138 -108 146c0 9 8 12 15 12c11 0 13 -5 17 -14c41 -92 99 -129 153 -154c1 0 7 -3 7 -10s-2 -8 -14 -14\nc-100 -47 -132 -120 -147 -154c-2 -4 -4 -10 -16 -10c-7 0 -15 3 -15 12c0 8 33 91 108 146h-348z"
            },
            "&#x2190;": {
                x: 1188,
                d: "M1002 230h-743c43 -32 72 -67 92 -97c42 -67 51 -130 51 -132c0 -12 -12 -12 -20 -12c-17 0 -18 3 -21 15c-25 112 -92 190 -196 233c-10 4 -15 6 -15 13s4 9 15 13c113 47 172 130 195 228c4 18 5 20 22 20c8 0 20 0 20 -12c0 -1 -8 -64 -53 -133\nc-8 -13 -35 -54 -90 -96h743c18 0 36 0 36 -20s-18 -20 -36 -20z"
            },
            "&#x2191;": {
                x: 766,
                d: "M403 555v-713c0 -18 0 -36 -20 -36s-20 18 -20 36v713c-22 -34 -49 -64 -82 -89c-57 -41 -116 -52 -119 -52c-12 0 -12 11 -12 19c0 17 2 17 17 22c110 31 181 109 204 220c2 12 3 18 12 18c6 0 10 -4 11 -9c6 -32 18 -92 69 -147c23 -25 62 -61 130 -80\nc22 -7 23 -8 23 -24c0 -8 0 -19 -12 -19c-2 0 -63 10 -124 56c-25 19 -53 47 -77 85z"
            },
            "&#x2192;": {
                x: 1188,
                d: "M929 230h-743c-18 0 -36 0 -36 20s18 20 36 20h743c-43 32 -72 67 -92 97c-42 67 -51 130 -51 132c0 12 12 12 20 12c17 0 18 -3 21 -15c38 -168 159 -218 203 -235c2 -1 8 -4 8 -11s-3 -9 -15 -13c-113 -46 -172 -130 -195 -228c-4 -18 -5 -20 -22 -20\nc-8 0 -20 0 -20 12c0 1 8 64 53 133c8 13 35 54 90 96z"
            },
            "&#x2193;": {
                x: 766,
                d: "M403 658v-713c22 34 49 64 82 89c57 41 116 52 119 52c12 0 12 -11 12 -19c0 -17 -2 -17 -17 -22c-110 -31 -182 -109 -204 -222c-2 -9 -3 -16 -12 -16c-7 0 -10 5 -11 10c-6 31 -18 91 -69 146c-23 25 -62 61 -130 80c-22 7 -23 8 -23 24c0 8 0 19 12 19\nc2 0 63 -10 124 -56c25 -19 53 -47 77 -85v713c0 18 0 36 20 36s20 -18 20 -36z"
            },
            "&#x2194;": {
                x: 1187,
                d: "M259 270h669c-43 32 -72 67 -92 97c-42 67 -51 130 -51 132c0 12 12 12 20 12c17 0 18 -3 21 -15c38 -168 159 -218 203 -235c2 -1 8 -4 8 -11s-3 -9 -15 -13c-113 -46 -172 -130 -195 -228c-4 -18 -5 -20 -22 -20c-8 0 -20 0 -20 12c0 1 8 64 53 133c8 13 35 54 90 96\nh-669c43 -32 72 -67 92 -97c42 -67 51 -130 51 -132c0 -12 -12 -12 -20 -12c-17 0 -18 3 -21 15c-25 112 -92 190 -196 233c-10 4 -15 6 -15 13s4 9 15 13c113 47 172 130 195 228c4 18 5 20 22 20c8 0 20 0 20 -12c0 -1 -8 -64 -53 -133c-8 -13 -35 -54 -90 -96z"
            },
            "&#x2195;": {
                x: 766,
                d: "M403 633v-766c22 34 49 64 82 89c57 41 116 52 119 52c12 0 12 -11 12 -19c0 -17 -2 -17 -17 -22c-109 -31 -182 -109 -204 -222c-2 -9 -3 -16 -12 -16c-7 0 -10 5 -11 10c-6 31 -18 91 -69 146c-36 39 -79 66 -130 80c-22 7 -23 8 -23 24c0 8 0 19 12 19\nc1 0 63 -10 124 -56c25 -19 53 -47 77 -85v766c-22 -34 -49 -64 -82 -89c-57 -41 -116 -52 -119 -52c-12 0 -12 11 -12 19c0 10 0 17 10 20c37 10 85 24 141 81c9 10 52 54 70 141c2 12 3 18 12 18c6 0 10 -4 11 -9c6 -33 17 -90 68 -147c36 -38 80 -66 131 -80\nc22 -7 23 -8 23 -24c0 -8 0 -19 -12 -19c-1 0 -63 10 -124 56c-25 19 -53 47 -77 85z"
            },
            "&#x2196;": {
                x: 1214,
                d: "M270 628l779 -780c13 -13 15 -15 15 -23c0 -10 -8 -20 -20 -20c-8 0 -10 2 -22 14l-781 780c5 -25 5 -26 5 -58c0 -23 -2 -71 -23 -127c-8 -19 -36 -81 -50 -81c-7 0 -23 16 -23 23c0 4 1 6 5 13c46 71 52 131 52 173c0 58 -15 102 -28 129c-3 8 -3 10 -3 12\nc0 6 4 10 10 10c3 0 6 -1 12 -4c23 -11 68 -27 129 -27c25 0 94 0 173 52c6 4 9 5 13 5c7 0 23 -16 23 -23c0 -16 -74 -47 -81 -50c-58 -21 -107 -23 -127 -23c-18 0 -41 2 -58 5z"
            },
            "&#x2197;": {
                x: 1214,
                d: "M973 599l-781 -780c-12 -12 -14 -14 -22 -14c-11 0 -20 10 -20 20c0 8 2 10 15 23l779 780c-25 -5 -26 -5 -58 -5c-18 0 -67 1 -125 23c-21 8 -83 36 -83 50c0 7 16 23 23 23c4 0 7 -1 13 -5c77 -51 144 -52 173 -52c58 0 102 15 129 28c8 3 10 3 12 3c4 0 10 -2 10 -10\nc0 -3 -1 -6 -4 -12c-11 -23 -27 -68 -27 -129c0 -35 3 -97 52 -173c4 -7 5 -9 5 -13c0 -7 -16 -23 -23 -23c-15 0 -45 69 -50 81c-21 58 -23 107 -23 127c0 18 2 41 5 58z"
            },
            "&#x2198;": {
                x: 1214,
                d: "M944 -128l-779 780c-13 13 -15 15 -15 23c0 10 8 20 20 20c8 0 10 -2 22 -14l781 -780c-5 25 -5 26 -5 58c0 23 2 71 23 127c8 19 36 81 50 81c7 0 23 -16 23 -23c0 -4 -1 -6 -5 -13c-46 -71 -52 -131 -52 -173c0 -59 15 -102 28 -129c3 -8 3 -10 3 -12\nc0 -8 -6 -10 -10 -10c-3 0 -6 1 -12 4c-23 11 -68 27 -129 27c-25 0 -94 0 -173 -52c-6 -4 -9 -5 -13 -5c-7 0 -23 16 -23 23c0 16 74 47 81 50c58 21 107 23 127 23c18 0 41 -2 58 -5z"
            },
            "&#x2199;": {
                x: 1214,
                d: "M1049 652l-779 -780c25 5 26 5 58 5c18 0 67 -1 125 -23c21 -8 83 -36 83 -50c0 -7 -16 -23 -23 -23c-4 0 -7 1 -13 5c-77 51 -144 52 -173 52c-58 0 -102 -15 -129 -28c-8 -3 -10 -3 -12 -3c-6 0 -10 4 -10 10c0 3 1 6 4 12c11 23 27 68 27 129c0 35 -3 97 -52 173\nc-4 7 -5 9 -5 13c0 7 16 23 23 23c15 0 45 -69 50 -81c21 -58 23 -107 23 -127c0 -18 -2 -41 -5 -58l781 780c12 12 14 14 22 14c11 0 20 -10 20 -20c0 -8 -2 -10 -15 -23z"
            },
            "&#x219e;": {
                x: 1186,
                d: "M1001 230h-589c10 -8 69 -60 101 -147h-31c-28 75 -80 123 -116 147h-136c9 -8 66 -57 101 -147h-31c-16 45 -56 116 -150 167c94 50 133 121 150 167h31c-35 -90 -92 -139 -101 -147h136c38 26 89 73 116 147h31c-27 -74 -74 -124 -101 -147h589c17 0 35 0 35 -20\ns-17 -20 -35 -20z"
            },
            "&#x21a0;": {
                x: 1186,
                d: "M820 270h136c-9 8 -66 57 -101 147h31c16 -45 56 -116 150 -167c-94 -50 -133 -121 -150 -167h-31c35 90 92 139 101 147h-136c-38 -26 -89 -73 -116 -147h-31c27 74 74 124 101 147h-589c-17 0 -35 0 -35 20s17 20 35 20h589c-10 8 -69 60 -101 147h31\nc28 -75 80 -123 116 -147z"
            },
            "&#x21a2;": {
                x: 1283,
                d: "M986 230h-756c30 -27 72 -74 101 -147h-31c-30 80 -89 136 -150 167c60 31 120 86 150 167h31c-27 -70 -67 -117 -101 -147h756c36 24 85 68 116 147h31c-28 -77 -78 -127 -102 -147v-40c23 -20 74 -70 102 -147h-31c-31 80 -81 124 -116 147z"
            },
            "&#x21a3;": {
                x: 1283,
                d: "M297 270h756c-30 27 -72 74 -101 147h31c30 -80 89 -136 150 -167c-60 -31 -120 -86 -150 -167h-31c27 70 67 117 101 147h-756c-36 -24 -85 -68 -116 -147h-31c28 77 78 127 102 147v40c-23 20 -74 70 -102 147h31c31 -80 81 -124 116 -147z"
            },
            "&#x21b0;": {
                x: 686,
                d: "M536 540v-505c0 -17 0 -35 -20 -35s-20 17 -20 35v500h-266c23 -20 73 -72 101 -146h-31c-29 77 -88 135 -150 166c64 34 121 89 150 167h31c-12 -29 -37 -90 -101 -147h271c32 0 35 -3 35 -35z"
            },
            "&#x21b1;": {
                x: 686,
                d: "M456 535h-266v-500c0 -17 0 -35 -20 -35s-20 17 -20 35v505c0 32 3 35 35 35h271c-58 52 -86 107 -101 147h31c22 -60 68 -124 150 -167c-63 -32 -121 -90 -150 -166h-31c27 71 74 122 101 146z"
            },
            "&#x22a2;": {
                x: 800,
                d: "M615 327h-425v-291v-18s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v622c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-18v-291h425c7 0 13 -1 17 -1s8 -2 12 -5s6 -8 6 -14s-2 -11 -6 -14s-8 -5 -12 -5s-10 -1 -17 -1z"
            },
            "&#x22a3;": {
                x: 800,
                d: "M650 658v-622v-18s-3 -8 -6 -12s-8 -6 -14 -6c-13 0 -20 12 -20 36v291h-424c-24 0 -36 7 -36 20s12 20 36 20h424v291c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-18z"
            },
            "&#x22a8;": {
                x: 798,
                d: "M613 230h-423v-195c0 -17 0 -35 -20 -35s-20 19 -20 36v622c0 17 0 36 20 36s20 -18 20 -35v-195h423c17 0 35 0 35 -20s-19 -20 -36 -20h-422v-154h422c17 0 36 0 36 -20s-18 -20 -35 -20z"
            },
            "&#x22a9;": {
                x: 909,
                d: "M190 659v-624c0 -17 0 -35 -20 -35s-20 19 -20 36v622c0 17 0 36 20 36s20 -18 20 -35zM384 327v-292c0 -17 0 -35 -20 -35s-20 19 -20 36v622c0 17 0 36 20 36s20 -18 20 -35v-292h340c17 0 35 0 35 -20s-18 -20 -35 -20h-340z"
            },
            "&#x22aa;": {
                x: 1076,
                d: "M190 659v-624c0 -17 0 -35 -20 -35s-20 19 -20 36v622c0 17 0 36 20 36s20 -18 20 -35zM552 327v-292c0 -17 0 -35 -20 -35s-20 19 -20 36v622c0 17 0 36 20 36s20 -18 20 -35v-292h339c17 0 35 0 35 -20s-18 -20 -35 -20h-339zM371 659v-624c0 -17 0 -35 -20 -35\ns-20 19 -20 36v622c0 17 0 36 20 36s20 -18 20 -35z"
            },
            "&#x22ad;": {
                x: 909,
                d: "M548 424l-134 -154h309c17 0 36 0 36 -20s-18 -20 -35 -20h-345l-78 -89v-106c0 -17 0 -35 -20 -35s-20 19 -20 36v58l-66 -75c-12 -14 -16 -19 -26 -19s-19 9 -19 20c0 3 1 9 4 14c4 4 14 14 17 19c55 63 55 65 90 102v503c0 17 0 36 20 36s20 -18 20 -35v-195h229\nl187 214c12 14 14 16 22 16c11 0 20 -8 20 -20c0 -8 -3 -12 -12 -22l-164 -188h141c17 0 35 0 35 -20s-19 -20 -36 -20h-175zM301 424v-154h60l134 154h-194zM325 230h-24v-28z"
            },
            "&#x22af;": {
                x: 1020,
                d: "M619 424l-124 -119v-35h339c17 0 36 0 36 -20s-18 -20 -35 -20h-340v-195c0 -17 0 -35 -20 -35s-20 19 -20 36v230l-154 -148v-83c0 -17 0 -35 -20 -35s-20 19 -20 36v44l-45 -44c-31 -30 -37 -36 -46 -36c-14 0 -20 11 -20 20c0 11 13 22 31 39l73 70c7 6 7 8 7 26v503\nc0 17 0 36 20 36s20 -18 20 -35v-485l154 148v336c0 17 0 36 20 36s20 -18 20 -35v-195h108c16 14 47 44 70 67c16 17 58 56 75 72l76 73c15 15 18 18 26 18c11 0 20 -8 20 -20c0 -9 -2 -11 -13 -21l-196 -189h174c17 0 35 0 35 -20s-19 -20 -36 -20h-215zM561 424h-66v-63z\n"
            },
            "&#x22b8;": {
                x: 1298,
                d: "M832 230h-647c-17 0 -35 0 -35 20s17 20 35 20h647c11 83 80 139 158 139c86 0 158 -69 158 -159c0 -87 -69 -159 -159 -159c-74 0 -145 53 -157 139zM990 131c64 0 118 52 118 119c0 64 -51 119 -119 119c-64 0 -118 -52 -118 -119c0 -64 51 -119 119 -119z"
            },
            "&#x22ba;": {
                x: 744,
                d: "M412 351v-511c0 -14 0 -53 -40 -53s-40 39 -40 53v511h-129c-14 0 -53 0 -53 40s39 40 53 40h338c14 0 53 0 53 -40s-39 -40 -53 -40h-129z"
            },
            "&#x22d4;": {
                x: 855,
                d: "M705 332v-319c0 -17 0 -35 -20 -35s-20 18 -20 35v316c0 25 0 72 -59 113c-35 23 -87 42 -158 45v-474c0 -17 0 -35 -20 -35s-20 18 -20 35v474c-85 -3 -135 -30 -152 -41c-66 -42 -66 -90 -66 -117v-316c0 -17 0 -35 -20 -35s-20 18 -20 35v319c0 172 209 194 258 196\nv173c0 17 0 35 20 35s20 -18 20 -35v-173c35 -1 257 -18 257 -196z"
            },
            "&#x22ea;": {
                x: 927,
                d: "M516 435l111 250c6 12 11 21 23 21c10 0 20 -9 20 -20c0 -4 -1 -6 -7 -19l-91 -206l150 72c5 3 12 6 19 6c20 0 20 -17 20 -35v-508c0 -16 0 -36 -20 -36c-5 0 -49 21 -74 33l-251 118c-45 -97 -135 -304 -139 -310c-2 -1 -7 -7 -16 -7c-10 0 -20 9 -20 20\nc0 4 18 44 28 66l111 249l-209 98c-11 5 -21 10 -21 23c0 11 8 17 21 23zM491 379l-274 -129l179 -85zM547 406l-115 -258l289 -136v476z"
            },
            "&#x22eb;": {
                x: 927,
                d: "M663 667l-132 -296l211 -99c10 -5 19 -11 19 -22c0 -13 -8 -17 -18 -21l-315 -149l-30 -14c-2 -2 -3 -3 -11 -18l-50 -114c-8 -16 -55 -124 -58 -129c-3 -6 -9 -11 -18 -11c-10 0 -20 9 -20 20c0 4 14 35 22 52l76 172c-21 -10 -161 -78 -169 -78c-20 0 -20 20 -20 36\nv508c0 17 0 35 20 35c7 0 14 -3 19 -6l306 -145l132 297c6 12 11 21 23 21c10 0 20 -9 20 -20c0 -4 -1 -6 -7 -19zM419 120l275 130l-179 84zM364 94l115 258l-289 136v-476z"
            },
            "&#x22ec;": {
                x: 927,
                d: "M419 207l-248 117c-11 5 -21 10 -21 23c0 11 8 17 21 23l370 174l87 236c6 15 8 23 22 23c10 0 20 -9 20 -20c0 -1 0 -5 -5 -17l-72 -198l129 62c5 3 12 6 19 6c20 0 20 -17 20 -35v-508c0 -16 0 -36 -20 -36c-3 0 -5 0 -30 13l-256 120l-105 -287h376c18 0 35 0 35 -20\ns-20 -20 -37 -20h-388l-52 -142c-5 -14 -9 -24 -23 -24c-10 0 -20 9 -20 20c0 4 17 49 26 74c4 12 11 31 26 72h-106c-17 0 -37 0 -37 20s17 20 35 20h123zM522 491l-305 -144l215 -102zM469 228l252 -119v476l-148 -70z"
            },
            "&#x22ed;": {
                x: 927,
                d: "M739 324l-284 -134l-105 -287h376c18 0 35 0 35 -20s-20 -20 -37 -20h-388l-52 -142c-5 -14 -9 -24 -23 -24c-10 0 -20 9 -20 20c0 4 17 49 26 74c4 12 11 31 26 72h-106c-17 0 -37 0 -37 20s17 20 35 20h123l95 262l-217 -102c-10 -5 -12 -6 -16 -6c-20 0 -20 20 -20 36\nv508c0 17 0 35 20 35c7 0 15 -4 21 -7l325 -154l112 305c6 15 8 23 22 23c10 0 20 -9 20 -20c0 -1 0 -4 -5 -17l-113 -308l190 -89c10 -5 19 -11 19 -22c0 -13 -7 -16 -22 -23zM694 347l-155 73l-65 -177zM190 109l233 110l80 218l-313 148v-476z"
            },
            "&#x2308;": {
                x: 548,
                d: "M362 710h-172v-924c0 -18 0 -36 -20 -36s-20 21 -20 36v928c0 32 4 36 36 36h176c15 0 36 0 36 -20s-21 -20 -36 -20z"
            },
            "&#x2309;": {
                x: 548,
                d: "M398 714v-928c0 -18 0 -36 -20 -36s-20 21 -20 36v924h-172c-15 0 -36 0 -36 20s21 20 36 20h177c32 0 35 -3 35 -36z"
            },
            "&#x230a;": {
                x: 548,
                d: "M362 -250h-176c-32 0 -36 4 -36 36v928c0 15 0 36 20 36s20 -18 20 -36v-924h172c15 0 36 0 36 -20s-21 -20 -36 -20z"
            },
            "&#x230b;": {
                x: 548,
                d: "M398 714v-928c0 -33 -3 -36 -35 -36h-177c-15 0 -36 0 -36 20s21 20 36 20h172v924c0 15 0 36 20 36s20 -18 20 -36z"
            },
            "&#x2acb;": {
                x: 927,
                d: "M460 246h266c17 0 35 0 35 -20s-18 -20 -35 -20h-269c-169 0 -307 127 -307 290c0 162 138 289 306 289h270c17 0 35 0 35 -20s-18 -20 -35 -20h-267c-155 0 -269 -114 -269 -250c0 -131 109 -249 270 -249zM548 -52l-132 -154h310c17 0 35 0 35 -20s-18 -20 -35 -20\nh-345l-89 -105c-21 -23 -22 -24 -31 -24c-10 0 -20 9 -20 20c0 7 0 9 19 30c16 18 59 68 68 79h-143c-17 0 -35 0 -35 20s18 20 35 20h178l132 154h-310c-17 0 -35 0 -35 20s18 20 35 20h345l89 105c21 23 22 24 31 24c10 0 20 -9 20 -20c0 -7 0 -9 -19 -30\nc-20 -23 -59 -68 -68 -79h143c17 0 35 0 35 -20s-18 -20 -35 -20h-178z"
            },
            "&#x2acc;": {
                x: 927,
                d: "M451 745h-266c-17 0 -35 0 -35 20s18 20 35 20h269c170 0 307 -127 307 -290c0 -162 -138 -289 -306 -289h-270c-17 0 -35 0 -35 20s18 20 35 20h267c156 0 269 114 269 250c0 131 -109 249 -270 249zM548 -52l-132 -154h310c17 0 35 0 35 -20s-18 -20 -35 -20h-345\nl-89 -105c-21 -23 -22 -24 -31 -24c-10 0 -20 9 -20 20c0 7 0 9 19 30c16 18 59 68 68 79h-143c-17 0 -35 0 -35 20s18 20 35 20h178l132 154h-310c-17 0 -35 0 -35 20s18 20 35 20h345l89 105c21 23 22 24 31 24c10 0 20 -9 20 -20c0 -7 0 -9 -19 -30\nc-20 -23 -59 -68 -68 -79h143c17 0 35 0 35 -20s-18 -20 -35 -20h-178z"
            },
            "&#x2ac5;": {
                x: 927,
                d: "M460 214h266c17 0 35 0 35 -20s-18 -20 -35 -20h-269c-169 0 -307 127 -307 290c0 162 138 289 306 289h270c17 0 35 0 35 -20s-18 -20 -35 -20h-267c-155 0 -269 -114 -269 -250c0 -131 109 -249 270 -249zM185 -174h541c17 0 35 0 35 -20s-18 -20 -35 -20h-541\nc-17 0 -35 0 -35 20s18 20 35 20zM185 20h541c17 0 35 0 35 -20s-18 -20 -35 -20h-541c-17 0 -35 0 -35 20s18 20 35 20z"
            },
            "&#x2ac6;": {
                x: 927,
                d: "M451 713h-266c-17 0 -35 0 -35 20s18 20 35 20h269c170 0 307 -127 307 -290c0 -162 -138 -289 -306 -289h-270c-17 0 -35 0 -35 20s18 20 35 20h267c156 0 269 114 269 250c0 131 -109 249 -270 249zM726 -214h-541c-17 0 -35 0 -35 20s18 20 35 20h541\nc17 0 35 0 35 -20s-18 -20 -35 -20zM726 -20h-541c-17 0 -35 0 -35 20s18 20 35 20h541c17 0 35 0 35 -20s-18 -20 -35 -20z"
            },
            "&#x2208;": {
                x: 800,
                d: "M615 230h-424c12 -134 127 -230 268 -230h156c17 0 35 0 35 -20s-18 -20 -35 -20h-158c-171 0 -307 130 -307 290s136 290 307 290h158c17 0 35 0 35 -20s-18 -20 -35 -20h-156c-141 0 -256 -96 -268 -230h424c17 0 35 0 35 -20s-18 -20 -35 -20z"
            },
            "&#x220b;": {
                x: 800,
                d: "M341 500h-156c-17 0 -35 0 -35 20s18 20 35 20h158c171 0 307 -130 307 -290s-136 -290 -307 -290h-158c-17 0 -35 0 -35 20s18 20 35 20h156c141 0 256 96 268 230h-424c-17 0 -35 0 -35 20s18 20 35 20h424c-12 134 -127 230 -268 230z"
            },
            "&#x221d;": {
                x: 966,
                d: "M816 32v-39c-9 -2 -25 -4 -37 -4c-25 0 -80 5 -141 58c-37 31 -51 53 -91 114c-24 -50 -98 -172 -225 -172c-110 0 -172 114 -172 226c0 115 64 227 175 227c25 0 80 -5 141 -58c37 -31 51 -53 91 -114c24 50 98 172 225 172c9 0 24 -1 31 -3c2 -2 3 -3 3 -29\nc-11 3 -20 3 -27 3c-119 0 -186 -124 -210 -178c11 -17 38 -58 48 -75c34 -52 87 -130 166 -130c3 0 19 2 23 2zM525 196c-11 17 -38 58 -48 75c-34 52 -87 130 -166 130c-83 0 -139 -87 -139 -186c0 -91 46 -197 143 -197c119 0 186 124 210 178z"
            },
            "&#x2224;": {
                x: 617,
                d: "M453 478l-124 -111v-582c0 -17 0 -35 -20 -35s-20 18 -20 35v545l-89 -80c-20 -20 -22 -20 -30 -20c-10 0 -20 9 -20 20c0 9 4 12 15 22l124 112v331c0 17 0 35 20 35s20 -18 20 -35v-294l89 79c15 15 20 20 29 20c11 0 20 -9 20 -20c0 -7 -2 -11 -14 -22z"
            },
            "&#x2226;": {
                x: 839,
                d: "M675 478l-138 -138v-552c0 -18 0 -38 -20 -38s-20 17 -20 34v516l-155 -157v-359c0 -17 0 -34 -20 -34s-20 20 -20 38v315l-104 -103c-19 -19 -20 -20 -28 -20c-10 0 -20 9 -20 20c0 6 3 12 14 23l138 137v552c0 18 0 38 20 38s20 -17 20 -34v-516l155 157v359\nc0 17 0 34 20 34s20 -20 20 -38v-315l100 100c23 22 24 23 32 23c11 0 20 -9 20 -20c0 -8 -2 -10 -14 -22z"
            },
            "&#x2234;": {
                x: 906,
                d: "M506 411c0 -30 -25 -53 -53 -53c-29 0 -53 24 -53 53s24 53 53 53s53 -24 53 -53zM756 -22c0 -29 -24 -53 -53 -53s-53 24 -53 53s24 53 53 53s53 -24 53 -53zM256 -22c0 -29 -24 -53 -53 -53s-53 24 -53 53s24 53 53 53s53 -24 53 -53z"
            },
            "&#x2235;": {
                x: 906,
                d: "M256 411c0 -30 -25 -53 -53 -53c-29 0 -53 24 -53 53s24 53 53 53s53 -24 53 -53zM506 -22c0 -29 -24 -53 -53 -53s-53 24 -53 53s24 53 53 53s53 -24 53 -53zM756 411c0 -30 -25 -53 -53 -53c-29 0 -53 24 -53 53s24 53 53 53s53 -24 53 -53z"
            },
            "&#x220d;": {
                x: 629,
                d: "M385 174h-162c-11 0 -19 1 -23 2s-7 5 -7 12c0 11 11 17 34 17h166c7 31 11 59 11 84c0 47 -12 81 -34 101s-47 30 -74 30c-33 0 -69 -13 -108 -39c-3 -3 -7 -4 -10 -4c-7 0 -10 5 -10 14c0 4 6 10 18 18s30 16 51 23s42 10 61 10c53 0 96 -18 130 -53s51 -81 51 -136\nc0 -73 -27 -133 -81 -181s-115 -72 -183 -72h-35c-11 0 -20 1 -24 2s-6 5 -6 12s3 12 8 14s13 3 25 3h30c45 0 82 13 111 39s49 61 61 104z"
            },
            "&#x22c8;": {
                x: 783,
                d: "M619 449l-198 -199c52 -53 201 -201 207 -208c5 -6 5 -11 5 -13c0 -11 -8 -20 -20 -20c-6 0 -13 4 -14 6c-13 12 -159 159 -208 207l-199 -199c-12 -12 -14 -14 -22 -14c-20 0 -20 19 -20 36v410c0 17 0 36 20 36c8 0 10 -2 22 -14l200 -199l199 199c10 10 14 14 22 14\nc11 0 20 -9 20 -20c0 -8 -2 -10 -14 -22zM190 77l172 173l-172 172v-345zM392 278l199 199c10 10 14 14 22 14c20 0 20 -18 20 -35v-412c0 -17 0 -35 -20 -35c-6 0 -13 4 -14 6c-13 12 -159 159 -208 207l-199 -199c-12 -12 -14 -14 -22 -14c-10 0 -20 9 -20 20\nc0 6 3 12 14 23l198 198l-198 199c-10 10 -14 14 -14 22c0 11 10 20 20 20c8 0 10 -2 22 -14zM421 250l172 -172v345z"
            },
            "&#x2322;": {
                x: 1168,
                d: "M1018 142c0 -6 -4 -10 -10 -10s-8 3 -13 9c-20 28 -69 98 -173 146c-96 44 -185 50 -238 50c-124 0 -215 -38 -250 -56c-98 -51 -137 -106 -162 -141c-4 -5 -6 -8 -12 -8s-10 4 -10 10c0 12 143 237 434 237s434 -225 434 -237z"
            },
            "&#x2323;": {
                x: 1168,
                d: "M1018 358c0 -12 -142 -224 -434 -224s-434 213 -434 224c0 6 4 10 10 10c3 0 6 0 10 -5c21 -28 64 -85 154 -131c71 -35 163 -56 260 -56c110 0 293 25 412 184c3 5 6 8 12 8s10 -4 10 -10z"
            },
            "&#x2223;": {
                x: 340,
                d: "M190 714v-928c0 -18 0 -36 -20 -36s-20 18 -20 36v928c0 18 0 36 20 36s20 -18 20 -36z"
            },
            "&#x2225;": {
                x: 535,
                d: "M190 716v-932c0 -16 0 -34 -20 -34s-20 21 -20 37v926c0 15 0 37 20 37s20 -18 20 -34zM385 713v-926c0 -15 0 -37 -20 -37s-20 18 -20 34v932c0 16 0 34 20 34s20 -21 20 -37z"
            },
            "&#x23d0;": {
                x: 340,
                d: "M190 396v-383v-17s-3 -8 -6 -12s-8 -6 -14 -6s-11 2 -14 6s-6 8 -6 12v17v382c0 24 7 36 20 36c6 0 11 -2 14 -6s6 -8 6 -12v-17z"
            },
            "&#x23d1;": {
                x: 576,
                d: "M190 393v-377c0 -25 -7 -38 -20 -38c-6 0 -11 2 -14 6s-6 7 -6 11v17v385v17s3 8 6 12s8 5 14 5c13 0 20 -13 20 -38zM426 397v-385v-17s-3 -7 -6 -11s-8 -6 -14 -6c-13 0 -20 13 -20 38v377c0 25 7 38 20 38c6 0 11 -1 14 -5s6 -8 6 -12v-17z"
            },
            "&#x23d2;": {
                x: 561,
                d: "M301 243v-230c0 -7 -1 -13 -1 -17s-2 -8 -5 -12s-8 -6 -14 -6s-11 2 -14 6s-5 8 -5 12s-1 10 -1 17v187c-9 -9 -23 -23 -41 -42l-27 -28c-10 -9 -18 -14 -23 -14c-6 0 -10 2 -14 6s-6 9 -6 14s5 12 14 22l22 23l75 77v137c0 24 7 36 20 36c6 0 11 -2 14 -6s5 -8 5 -12\ns1 -10 1 -17v-95l23 23c10 10 19 20 28 29l15 15c10 11 18 16 24 16s11 -2 15 -6s5 -9 5 -14s-4 -12 -13 -22l-22 -22c-30 -33 -55 -58 -75 -77z"
            },
            "&#x23d3;": {
                x: 728,
                d: "M266 215l196 116v62c0 25 7 38 20 38c6 0 11 -1 14 -5s6 -8 6 -12v-17v-42c18 10 27 15 27 16c14 9 24 13 29 13c6 0 10 -2 14 -6s6 -9 6 -14c0 -6 -4 -12 -13 -19l-63 -37v-296v-17s-3 -7 -6 -11s-8 -6 -14 -6c-13 0 -20 13 -20 38v269l-196 -116v-153\nc0 -25 -7 -38 -20 -38c-6 0 -11 2 -14 6s-6 7 -6 11v17v133c-18 -10 -27 -15 -27 -16c-14 -9 -24 -13 -29 -13c-6 0 -10 2 -14 6s-6 9 -6 14c0 6 4 12 13 19l63 37v205v17s3 8 6 12s8 5 14 5c13 0 20 -13 20 -38v-178z"
            },
            "&#x2ac7;": {
                x: 927,
                d: "M684 713l-223 -499h265c17 0 35 0 35 -20s-18 -20 -35 -20h-283l-68 -154h351c17 0 35 0 35 -20s-18 -20 -35 -20h-369l-69 -154h438c17 0 35 0 35 -20s-18 -20 -35 -20h-456c-14 -33 -29 -65 -44 -97c-3 -7 -7 -17 -20 -17c-8 0 -20 6 -20 20c0 4 13 33 20 49\nc4 8 18 41 20 45h-41c-17 0 -35 0 -35 20s18 20 35 20h59l69 154h-128c-17 0 -35 0 -35 20s18 20 35 20h146l71 159c-153 26 -252 148 -252 285c0 162 138 289 306 289h203c7 17 9 23 19 43c12 26 14 32 27 32c8 0 20 -6 20 -20c0 -6 -8 -22 -23 -55h40c11 -1 19 -10 19 -20\nc0 -20 -18 -20 -35 -20h-42zM641 713h-182c-155 0 -269 -114 -269 -250c0 -100 61 -178 134 -217c46 -24 88 -29 92 -29c3 0 3 1 5 5l3 8z"
            },
            "&#x2ac8;": {
                x: 927,
                d: "M418 214l199 448c-56 39 -111 51 -166 51h-266c-17 0 -35 0 -35 20s18 20 35 20h269c64 0 127 -19 181 -54l47 108c5 13 12 21 23 21c8 0 20 -6 20 -20c0 -4 -4 -13 -6 -18l-52 -118c43 -36 94 -111 94 -209c0 -136 -107 -289 -318 -289l-68 -154h351c17 0 35 0 35 -20\ns-18 -20 -35 -20h-369l-69 -154h438c17 0 35 0 35 -20s-18 -20 -35 -20h-456c-14 -33 -29 -65 -44 -97c-3 -7 -7 -17 -20 -17c-8 0 -20 6 -20 20c0 4 13 33 20 49c4 8 18 41 20 45h-41c-17 0 -35 0 -35 20s18 20 35 20h59l69 154h-128c-17 0 -35 0 -35 20s18 20 35 20h146\nl69 154h-215c-17 0 -35 0 -35 20s18 20 35 20h233zM649 634l-188 -420c168 8 260 130 260 250c0 64 -27 125 -72 170z"
            },
            "&#x22ae;": {
                x: 1020,
                d: "M857 653l-297 -286h275c17 0 35 0 35 -20s-18 -20 -35 -20h-317c-8 -7 -16 -14 -23 -22v-270c0 -17 0 -35 -20 -35s-20 19 -20 36v230l-154 -148v-83c0 -17 0 -35 -20 -35s-20 19 -20 36v44l-45 -44c-31 -30 -37 -36 -46 -36c-14 0 -20 11 -20 20c0 11 13 22 31 39l73 70\nc7 6 7 8 7 26v503c0 17 0 36 20 36s20 -18 20 -35v-485l154 148v336c0 17 0 36 20 36s20 -18 20 -35v-292c2 1 7 1 9 2l321 309c13 13 18 16 25 16c11 0 20 -8 20 -20c0 -9 -2 -11 -13 -21z"
            },
            "&#x22ac;": {
                x: 909,
                d: "M464 327l-163 -187v-105c0 -17 0 -35 -20 -35s-20 19 -20 36v58l-66 -75c-12 -14 -16 -19 -26 -19s-19 9 -19 20c0 3 1 9 4 14c4 4 14 14 17 19c55 63 55 65 90 102v503c0 17 0 36 20 36s20 -18 20 -35v-292h144l272 311c12 14 14 16 22 16c11 0 20 -8 20 -20\nc0 -8 -3 -12 -12 -22l-248 -285h225c17 0 35 0 35 -20s-18 -20 -35 -20h-260zM410 327h-109v-125z"
            },
            "&#x2ac9;": {
                x: 965,
                d: "M584 316c29 101 128 156 205 156c6 0 26 0 26 -20c0 -19 -16 -19 -27 -20c-103 -6 -174 -89 -174 -182c0 -69 45 -175 183 -182c8 -1 18 -7 18 -20c0 -20 -20 -20 -26 -20c-72 0 -172 49 -206 156c-30 -98 -121 -156 -211 -156c-118 0 -222 94 -222 222s104 222 222 222\nc84 0 177 -51 212 -156zM372 68c94 0 181 75 181 182s-87 182 -181 182c-97 0 -182 -77 -182 -182s85 -182 182 -182z"
            },
            "&#x23d4;": {
                x: 927,
                d: "M546 57l-129 -154h309c17 0 35 0 35 -20s-18 -20 -35 -20h-343l-74 -90c-18 -20 -19 -21 -28 -21c-14 0 -20 13 -20 20s4 12 13 22c11 14 43 51 57 69h-126c-17 0 -35 0 -35 20s18 20 35 20h160l128 154c-69 0 -155 0 -243 75c-61 52 -100 129 -100 215\nc0 162 138 289 306 289h270c17 0 35 0 35 -20s-18 -20 -35 -20h-267c-155 0 -269 -114 -269 -250c0 -131 109 -249 270 -249h68l74 90c18 20 19 21 28 21c14 0 20 -13 20 -20s-4 -12 -13 -22c-11 -14 -43 -51 -57 -69h146c17 0 35 0 35 -20s-18 -20 -35 -20h-180z"
            },
            "&#x23d5;": {
                x: 927,
                d: "M706 -137h-452l-60 -91c-10 -15 -13 -20 -24 -20s-20 9 -20 20c0 6 3 11 12 25l44 66h-37c-11 1 -19 10 -19 20c0 20 18 20 35 20h49l102 154h-151c-17 0 -35 0 -35 20s18 20 35 20h178l61 91c10 15 13 20 24 20c15 0 20 -13 20 -20c0 -5 0 -7 -13 -25l-44 -66h41\nc156 0 269 114 269 250c0 131 -109 249 -270 249h-266c-17 0 -35 0 -35 20s18 20 35 20h269c170 0 307 -127 307 -290c0 -162 -138 -289 -306 -289h-71l-102 -154h424c17 0 35 0 35 -20s-18 -20 -35 -20z"
            },
            "&#x23d6;": {
                x: 927,
                d: "M645 174l-99 -154h180c17 0 35 0 35 -20s-18 -20 -35 -20h-206l-99 -154h305c17 0 35 0 35 -20s-18 -20 -35 -20h-331l-59 -91c-9 -14 -12 -20 -23 -20c-12 0 -20 9 -20 20c0 5 0 7 13 27l41 64h-162c-17 0 -35 0 -35 20s18 20 35 20h188l99 154h-287c-17 0 -35 0 -35 20\ns18 20 35 20h313l99 154h-140c-169 0 -307 127 -307 290c0 162 138 289 306 289h270c17 0 35 0 35 -20s-18 -20 -35 -20h-267c-155 0 -269 -114 -269 -250c0 -131 109 -249 270 -249h163l58 91c11 16 13 20 24 20s20 -9 20 -20c0 -6 0 -7 -13 -27c-14 -21 -28 -42 -41 -64\nh55c17 0 35 0 35 -20s-18 -20 -35 -20h-81z"
            },
            "&#x23d7;": {
                x: 927,
                d: "M423 174l-63 -154h366c17 0 35 0 35 -20s-18 -20 -35 -20h-382l-63 -154h445c17 0 35 0 35 -20s-18 -20 -35 -20h-461l-32 -79c-12 -27 -14 -32 -27 -32c-11 0 -20 9 -20 20c0 4 11 30 17 44l18 47h-46c-5 0 -25 0 -25 20s18 20 35 20h53l63 154h-116c-17 0 -35 0 -35 20\ns18 20 35 20h132l63 154h-195c-17 0 -35 0 -35 20s18 20 35 20h212c16 41 16 43 38 92c3 9 7 19 20 19s20 -10 20 -20c0 -4 -10 -30 -16 -45l-19 -46c38 0 122 0 199 69c49 43 82 106 82 181c0 131 -109 249 -270 249h-266c-17 0 -35 0 -35 20s18 20 35 20h269\nc170 0 307 -127 307 -290c0 -102 -56 -177 -97 -211c-92 -78 -173 -78 -241 -78z"
            },
            "&#x21c7;": {
                x: 1187,
                d: "M1004 397h-774c22 -21 74 -70 102 -147c-28 -77 -80 -126 -102 -147h774c18 0 33 0 33 -20s-19 -20 -38 -20h-768c23 -22 71 -67 101 -146h-31c-29 74 -75 126 -151 167c52 24 116 76 151 166c-33 84 -93 137 -151 167c74 37 122 93 151 166h31\nc-30 -79 -78 -124 -101 -146h768c19 0 38 0 38 -20s-15 -20 -33 -20z"
            },
            "&#x21c9;": {
                x: 1187,
                d: "M957 397h-774c-18 0 -33 0 -33 20s19 20 38 20h768c-23 22 -71 67 -101 146h31c29 -74 75 -126 151 -167c-52 -24 -116 -76 -151 -166c33 -84 93 -137 151 -167c-74 -37 -122 -93 -151 -166h-31c30 79 78 124 101 146h-768c-19 0 -38 0 -38 20s15 20 33 20h774\nc-22 21 -74 70 -102 147c28 77 80 126 102 147z"
            },
            "&#x21bc;": {
                x: 1188,
                d: "M236 196h766c17 0 36 0 36 -20s-18 -20 -36 -20h-852v20c55 27 118 82 150 168h32c-8 -25 -27 -87 -96 -148z"
            },
            "&#x21bd;": {
                x: 1188,
                d: "M150 344h854c17 0 34 0 34 -20s-16 -20 -34 -20h-768c69 -61 88 -123 96 -148h-30c-32 85 -96 141 -152 168v20z"
            },
            "&#x21c0;": {
                x: 1188,
                d: "M184 196h768c-69 61 -88 123 -96 148h30c32 -85 96 -141 152 -168v-20h-854c-17 0 -34 0 -34 20s16 20 34 20z"
            },
            "&#x21c1;": {
                x: 1188,
                d: "M186 344h852v-20c-55 -27 -118 -82 -150 -168h-32c8 25 27 87 96 148h-766c-17 0 -36 0 -36 20s18 20 36 20z"
            },
            "&#x219a;": {
                x: 1186,
                d: "M603 230l-100 -151c-10 -15 -17 -15 -22 -15c-10 0 -19 8 -19 20c0 6 10 22 17 33l76 113h-321c75 -55 108 -138 108 -146c0 -9 -8 -12 -15 -12c-11 0 -13 5 -17 14c-27 58 -65 112 -148 151c-7 4 -12 6 -12 13s3 8 14 14c100 47 132 119 147 154c2 4 4 10 16 10\nc7 0 15 -3 15 -12c0 -8 -33 -91 -108 -146h348l100 151c10 15 17 15 22 15c10 0 19 -8 19 -20c0 -6 -10 -22 -17 -33l-76 -113h371c17 0 35 0 35 -20s-18 -20 -35 -20h-398z"
            },
            "&#x219b;": {
                x: 1186,
                d: "M604 230l-100 -151c-10 -15 -17 -15 -22 -15c-10 0 -19 8 -19 20c0 6 10 22 17 33l76 113h-371c-17 0 -35 0 -35 20s18 20 35 20h398l100 151c10 15 17 15 22 15c10 0 19 -8 19 -20c0 -6 -10 -22 -17 -33l-76 -113h321c-75 55 -108 138 -108 146c0 9 8 12 15 12\nc11 0 13 -5 17 -14c41 -92 99 -129 153 -154c1 0 7 -3 7 -10s-2 -8 -14 -14c-100 -47 -132 -120 -147 -154c-2 -4 -4 -10 -16 -10c-7 0 -15 3 -15 12c0 8 33 91 108 146h-348z"
            },
            "&#x27f5;": {
                x: 1544,
                d: "M259 282h1102c18 0 21 0 27 -6c4 -4 6 -9 6 -14s-2 -10 -6 -14c-6 -6 -8 -6 -25 -6l-1104 -1c21 -14 21 -14 44 -37c16 -16 49 -52 74 -106c6 -16 24 -63 24 -84c0 -4 0 -7 -2 -9s-9 -3 -16 -3s-15 1 -17 3c-3 3 -3 5 -5 13c-18 83 -56 129 -86 159\nc-41 41 -83 62 -111 72c-8 4 -9 5 -10 6c-2 2 -4 5 -4 7s2 5 4 7s5 4 11 6c24 8 67 29 110 72c18 18 67 66 86 159c1 7 2 10 5 13c2 2 10 3 17 3s14 -1 16 -3s2 -6 2 -10c0 -23 -22 -77 -24 -83c-26 -56 -60 -92 -74 -106c-13 -13 -30 -28 -44 -38z"
            },
            "&#x27f6;": {
                x: 1544,
                d: "M1285 241l-1102 1c-18 0 -21 0 -27 6c-4 4 -6 9 -6 14s2 10 6 14c6 6 9 6 26 6l1103 1c-21 14 -21 14 -44 37c-16 16 -49 52 -74 106c-6 16 -24 63 -24 84c0 4 0 7 2 9s10 3 17 3s14 -1 16 -3c3 -3 4 -5 6 -13c18 -83 55 -129 85 -159c41 -41 83 -62 111 -72\nc8 -4 10 -5 11 -6c2 -2 3 -5 3 -7s-1 -5 -3 -7s-6 -4 -12 -6c-24 -8 -67 -29 -110 -72c-18 -18 -66 -66 -85 -159c-1 -7 -3 -10 -6 -13c-2 -2 -9 -3 -16 -3s-15 1 -17 3s-2 6 -2 10c0 23 22 77 24 83c26 56 60 92 74 106c13 13 30 27 44 37z"
            },
            "&#x27f7;": {
                x: 1824,
                d: "M259 270h1306c-43 32 -72 67 -92 97c-42 67 -51 130 -51 132c0 12 12 12 20 12c17 0 18 -3 21 -15c38 -168 159 -218 203 -235c2 -1 8 -4 8 -11s-3 -9 -15 -13c-113 -46 -172 -130 -195 -228c-4 -18 -5 -20 -22 -20c-8 0 -20 0 -20 12c0 1 8 64 53 133c8 13 35 54 90 96\nh-1306c43 -32 72 -67 92 -97c42 -67 51 -130 51 -132c0 -12 -12 -12 -20 -12c-17 0 -18 3 -21 15c-25 112 -92 190 -196 233c-10 4 -15 6 -15 13s4 9 15 13c113 47 172 130 195 228c4 18 5 20 22 20c8 0 20 0 20 -12c0 -1 -8 -64 -53 -133c-8 -13 -35 -54 -90 -96z"
            },
            "&#x27f9;": {
                x: 1594,
                d: "M185 367h997c-49 47 -100 134 -100 147c0 11 13 11 19 11c14 0 15 -1 26 -21c56 -107 156 -198 291 -238c19 -6 20 -7 22 -8l3 -2c1 -2 1 -4 1 -6s0 -5 -2 -6c-2 -2 -3 -3 -20 -9c-52 -15 -119 -42 -188 -103c-65 -58 -93 -111 -114 -149c-4 -8 -11 -8 -19 -8\nc-6 0 -19 0 -19 11c0 13 52 101 100 147h-997c-17 0 -35 0 -35 20s18 20 36 20h1041c41 35 90 61 126 77c-33 15 -84 41 -126 77h-1041c-18 0 -36 0 -36 20s18 20 35 20z"
            },
            "&#x27f8;": {
                x: 1594,
                d: "M1409 133h-997c49 -47 100 -134 100 -147c0 -11 -13 -11 -19 -11c-14 0 -15 1 -26 21c-56 107 -156 198 -291 238c-19 6 -20 7 -22 8l-3 2c-1 2 -1 4 -1 6s0 5 2 6c2 2 3 3 20 9c52 15 119 42 188 103c65 58 93 111 114 149c4 8 11 8 19 8c6 0 19 0 19 -11\nc0 -13 -52 -101 -100 -147h997c17 0 35 0 35 -20s-18 -20 -36 -20h-1041c-41 -35 -90 -61 -126 -77c33 -15 84 -41 126 -77h1041c18 0 36 0 36 -20s-18 -20 -35 -20z"
            },
            "&#x27fa;": {
                x: 1694,
                d: "M370 367h954c-57 65 -87 138 -87 146c0 12 11 12 20 12c12 0 16 -1 20 -10c51 -116 133 -201 243 -247c20 -9 21 -10 23 -12c1 -2 1 -4 1 -6c0 -7 -3 -8 -17 -14c-131 -56 -205 -148 -246 -240c-9 -20 -9 -21 -24 -21c-9 0 -20 0 -20 12c0 8 30 81 87 146h-954\nc57 -65 87 -138 87 -146c0 -12 -11 -12 -20 -12c-12 0 -16 1 -20 10c-51 116 -133 201 -243 247c-20 9 -21 10 -23 12c-1 2 -1 4 -1 6c0 7 3 8 17 14c131 56 205 148 246 240c9 20 9 21 24 21c9 0 20 0 20 -12c0 -8 -30 -81 -87 -146zM331 173h1032c20 20 50 45 105 77\nc-41 24 -75 48 -105 77h-1032c-20 -20 -50 -45 -105 -77c41 -24 75 -48 105 -77z"
            },
            "&#x2262;": {
                x: 967,
                d: "M751 648l-492 -791c-8 -13 -10 -16 -19 -17c-14 -2 -22 10 -23 17s3 12 9 22l494 793c8 11 10 14 19 15c10 1 20 -5 22 -16c1 -8 -2 -12 -10 -23zM781 424h-595c-24 0 -36 7 -36 20c0 6 2 11 6 14s8 6 12 6h17h597h17s8 -3 12 -6s6 -8 6 -14c0 -13 -12 -20 -36 -20z\nM782 36h-597h-17s-8 3 -12 6s-6 8 -6 14c0 13 12 20 36 20h595c24 0 36 -7 36 -20c0 -6 -2 -11 -6 -14s-8 -6 -12 -6h-17zM782 230h-597h-17s-8 3 -12 6s-6 8 -6 14s2 11 6 14s8 6 12 6h17h597h17s8 -3 12 -6s6 -8 6 -14s-2 -11 -6 -14s-8 -6 -12 -6h-17z"
            },
            "&#x2260;": {
                x: 927,
                d: "M228 -50l409 646c8 13 11 16 20 17c14 2 21 -11 22 -18s-3 -12 -9 -22l-411 -648c-9 -11 -10 -14 -19 -15c-10 -1 -21 6 -22 17c-1 8 1 12 10 23zM747 321h-567c-20 0 -30 6 -30 17c0 12 11 18 34 18h559c23 0 34 -6 34 -18c0 -11 -10 -17 -30 -17zM743 143h-559\nc-23 0 -34 6 -34 18c0 11 10 17 30 17h567c20 0 30 -6 30 -17c0 -12 -11 -18 -34 -18z"
            },
            "&#x2209;": {
                x: 800,
                d: "M261 -181l319 929c5 15 6 21 18 23c13 2 22 -9 23 -17c0 -3 1 -5 -5 -20l-318 -929c-5 -15 -7 -21 -19 -23c-14 -2 -22 10 -23 17c0 3 -1 5 5 20zM615 230h-424c12 -134 127 -230 268 -230h156c17 0 35 0 35 -20s-18 -20 -35 -20h-158c-171 0 -307 130 -307 290\ns136 290 307 290h158c17 0 35 0 35 -20s-18 -20 -35 -20h-156c-141 0 -256 -96 -268 -230h424c17 0 35 0 35 -20s-18 -20 -35 -20z"
            },
            "|": {
                x: 140,
                d: "M90 714v-928c0 -18 0 -36 -20 -36s-20 18 -20 36v928c0 18 0 36 20 36s20 -18 20 -36z"
            }
        },
        map: {
            // char
            Alpha: "Α",
            Beta: "Β",
            Gamma: "Γ",
            Delta: "Δ",
            Epsilon: "Ε",
            Zeta: "Ζ",
            Eta: "Η",
            Theta: "Θ",
            Iota: "Ι",
            Kappa: "Κ",
            Lambda: "Λ",
            Mu: "Μ",
            Nu: "Ν",
            Xi: "Ξ",
            Omicron: "Ο",
            Pi: "Π",
            Rho: "Ρ",
            Sigma: "Σ",
            Tau: "Τ",
            Upsilon: "Υ",
            Phi: "Φ",
            Chi: "Χ",
            Psi: "Ψ",
            Omega: "Ω",
            alpha: "α",
            beta: "β",
            gamma: "γ",
            delta: "δ",
            epsilon: "ε",
            varepsilon: "ε",
            zeta: "ζ",
            eta: "η",
            theta: "θ",
            iota: "ι",
            kappa: "κ",
            lambda: "λ",
            mu: "μ",
            nu: "ν",
            xi: "ξ",
            omicron: "ο",
            pi: "π",
            rho: "ρ",
            sigma: "σ",
            tau: "τ",
            upsilon: "υ",
            phi: "φ",
            varkappa: "ϰ",
            chi: "χ",
            psi: "ψ",
            omega: "ω",
            digamma: "Ϝ",
            varepsilon: "ϵ",
            varrho: "ϱ",
            varphi: "ϕ",
            vartheta: "ϑ",
            varpi: "ϖ",
            varsigma: "Ϲ",
            aleph: "ℵ",
            beth: "ℶ",
            daleth: "ℸ",
            gimel: "ℷ",
            eth: "ð",
            hbar: "ℎ",
            hslash: "ℏ",
            mho: "℧",
            partial: "∂",
            wp: "℘",
            Bbbk: "⅌",
            Finv: "Ⅎ",
            Im: "ℑ",
            Re: "ℜ",
            complement: "∁",
            ell: "ℓ",
            circledS: "Ⓢ",
            imath: "ı",
            jmath: "ȷ",
            // symbol
            doublecap: "⋒",
            Cap: "⋒",
            doublecup: "⋓",
            Cup: "⋓",
            ast: "*",
            divideontimes: "⋇",
            rightthreetimes: "⋌",
            leftthreetimes: "⋋",
            cdot: "·",
            odot: "⊙",
            dotplus: "∔",
            rtimes: "⋊",
            ltimes: "⋉",
            centerdot: "▪",
            doublebarwedge: "⌭",
            setminus: "⒁",
            amalg: "∐",
            circ: "◦",
            bigcirc: "◯",
            gtrdot: "⋗",
            lessdot: "⋖",
            smallsetminus: "⒅",
            circledast: "⊛",
            circledcirc: "⊚",
            sqcap: "⊓",
            sqcup: "⊔",
            barwedge: "⊼",
            circleddash: "⊝",
            star: "⋆",
            bigtriangledown: "▽",
            bigtriangleup: "△",
            cup: "∪",
            cap: "∩",
            times: "×",
            mp: "∓",
            pm: "±",
            triangleleft: "⊲",
            triangleright: "⊳",
            boxdot: "⊡",
            curlyvee: "⋏",
            curlywedge: "⋎",
            boxminus: "⊟",
            boxtimes: "⊠",
            ominus: "⊖",
            oplus: "⊕",
            oslash: "⊘",
            otimes: "⊗",
            uplus: "⊎",
            boxplus: "⊞",
            dagger: "†",
            ddagger: "‡",
            vee: "∨",
            lor: "∨",
            veebar: "⊻",
            bullet: "•",
            diamond: "⋄",
            wedge: "∧",
            land: "∧",
            div: "÷",
            wr: "≀",
            geqq: "≧",
            lll: "⋘",
            llless: "⋘",
            ggg: "⋙",
            gggtr: "⋙",
            preccurlyeq: "≼",
            geqslant: "⩾",
            lnapprox: "⪉",
            preceq: "⪯",
            gg: "≫",
            lneq: "⪇",
            precnapprox: "⪹",
            approx: "≈",
            lneqq: "≨",
            precneqq: "⪵",
            approxeq: "≊",
            gnapprox: "⪊",
            lnsim: "⋦",
            precnsim: "⋨",
            asymp: "≍",
            gneq: "⪈",
            lvertneqq: "⌮",
            precsim: "≾",
            backsim: "∽",
            gneqq: "≩",
            ncong: "≇",
            risingdotseq: "≓",
            backsimeq: "⋍",
            gnsim: "⋧",
            sim: "∼",
            simeq: "≃",
            bumpeq: "≏",
            gtrapprox: "⪆",
            ngeq: "≱",
            Bumpeq: "≎",
            gtreqless: "⋛",
            ngeqq: "⌱",
            succ: "≻",
            circeq: "≗",
            gtreqqless: "⪌",
            ngeqslant: "⌳",
            succapprox: "⪸",
            cong: "≅",
            gtrless: "≷",
            ngtr: "≯",
            succcurlyeq: "≽",
            curlyeqprec: "⋞",
            gtrsim: "≳",
            nleq: "≰",
            succeq: "⪰",
            curlyeqsucc: "⋟",
            gvertneqq: "⌯",
            neq: "≠",
            ne: "≠",
            nequiv: "≢",
            nleqq: "⌰",
            succnapprox: "⪺",
            doteq: "≐",
            leq: "≤",
            le: "≤",
            nleqslant: "⌲",
            succneqq: "⪶",
            doteqdot: "≑",
            Doteq: "≑",
            leqq: "≦",
            nless: "≮",
            succnsim: "⋩",
            leqslant: "⩽",
            nprec: "⊀",
            succsim: "≿",
            eqsim: "≂",
            lessapprox: "⪅",
            npreceq: "⋠",
            eqslantgtr: "⪖",
            lesseqgtr: "⋚",
            nsim: "≁",
            eqslantless: "⪕",
            lesseqqgtr: "⪋",
            nsucc: "⊁",
            triangleq: "≜",
            eqcirc: "≖",
            equiv: "≡",
            lessgtr: "≶",
            nsucceq: "⋡",
            fallingdotseq: "≒",
            lesssim: "≲",
            prec: "≺",
            geq: "≥",
            ge: "≥",
            ll: "≪",
            precapprox: "⪷",
            // arrows
            uparrow: "↑",
            downarrow: "↓",
            updownarrow: "↕",
            Uparrow: "⇑",
            Downarrow: "⇓",
            Updownarrow: "⇕",
            circlearrowleft: "↺",
            circlearrowright: "↻",
            curvearrowleft: "↶",
            curvearrowright: "↷",
            downdownarrows: "⇊",
            downharpoonleft: "⇃",
            downharpoonright: "⇂",
            leftarrow: "←",
            gets: "←",
            Leftarrow: "⇐",
            leftarrowtail: "↢",
            leftharpoondown: "↽",
            leftharpoonup: "↼",
            leftleftarrows: "⇇",
            leftrightarrow: "↔",
            Leftrightarrow: "⇔",
            leftrightarrows: "⇄",
            leftrightharpoons: "⇋",
            leftrightsquigarrow: "↭",
            Lleftarrow: "⇚",
            looparrowleft: "↫",
            looparrowright: "↬",
            multimap: "⊸",
            nLeftarrow: "⇍",
            nRightarrow: "⇏",
            nLeftrightarrow: "⇎",
            nearrow: "↗",
            nleftarrow: "↚",
            nleftrightarrow: "↮",
            nrightarrow: "↛",
            nwarrow: "↖",
            rightarrow: "→",
            to: "→",
            Rightarrow: "⇒",
            rightarrowtail: "↣",
            rightharpoondown: "⇁",
            rightharpoonup: "⇀",
            rightleftarrows: "⇆",
            rightleftharpoons: "⇌",
            rightrightarrows: "⇉",
            rightsquigarrow: "⇝",
            Rrightarrow: "⇛",
            searrow: "↘",
            swarrow: "↙",
            twoheadleftarrow: "↞",
            twoheadrightarrow: "↠",
            upharpoonleft: "↿",
            upharpoonright: "↾",
            restriction: "↾",
            upuparrows: "⇈",
            Lsh: "↰",
            Rsh: "↱",
            longleftarrow: "⟵",
            longrightarrow: "⟶",
            Longleftarrow: "⟸",
            Longrightarrow: "⟹",
            implies: "⟹",
            longleftrightarrow: "⟷",
            Longleftrightarrow: "⟺",
            // relation
            backepsilon: "∍",
            because: "∵",
            therefore: "∴",
            between: "≬",
            blacktriangleleft: "◀",
            blacktriangleright: "▸",
            dashv: "⊣",
            bowtie: "⋈",
            frown: "⌢",
            "in": "∈",
            notin: "∉",
            mid: "∣",
            parallel: "∥",
            models: "⊨",
            ni: "∋",
            owns: "∋",
            nmid: "∤",
            nparallel: "∦",
            nshortmid: "⏒",
            nshortparallel: "⏓",
            nsubseteq: "⊈",
            nsubseteqq: "⫇",
            nsupseteq: "⊉",
            nsupseteqq: "⫈",
            ntriangleleft: "⋪",
            ntrianglelefteq: "⋬",
            ntriangleright: "⋫",
            ntrianglerighteq: "⋭",
            nvdash: "⊬",
            nVdash: "⊮",
            nvDash: "⊭",
            nVDash: "⊯",
            perp: "⊥",
            pitchfork: "⋔",
            propto: "∝",
            shortmid: "⏐",
            shortparallel: "⏑",
            smile: "⌣",
            sqsubset: "⊏",
            sqsubseteq: "⊑",
            sqsupset: "⊐",
            sqsupseteq: "⊒",
            subset: "⊂",
            Subset: "⋐",
            subseteq: "⊆",
            subseteqq: "⫅",
            subsetneq: "⊊",
            subsetneqq: "⫋",
            supset: "⊃",
            Supset: "⋑",
            supseteq: "⊇",
            supseteqq: "⫆",
            supsetneq: "⊋",
            supsetneqq: "⫌",
            trianglelefteq: "⊴",
            trianglerighteq: "⊵",
            varpropto: "⫉",
            varsubsetneq: "⏔",
            varsubsetneqq: "⏖",
            varsupsetneq: "⏕",
            varsupsetneqq: "⏗",
            vdash: "⊢",
            Vdash: "⊩",
            vDash: "⊨",
            Vvdash: "⊪",
            vert: "|",
            Vert: "ǁ",
            "|": "ǁ",
            "{": "{",
            "}": "}",
            backslash: "\\",
            langle: "〈",
            rangle: "〉",
            lceil: "⌈",
            rceil: "⌉",
            lbrace: "{",
            rbrace: "}",
            lfloor: "⌊",
            rfloor: "⌋",
            cdots: "⋯",
            ddots: "⋰",
            vdots: "⋮",
            dots: "…",
            ldots: "…",
            "#": "#",
            bot: "⊥",
            angle: "∠",
            backprime: "‵",
            bigstar: "★",
            blacklozenge: "◆",
            blacksquare: "■",
            blacktriangle: "▲",
            blacktriangledown: "▼",
            clubsuit: "♣",
            diagdown: "⒁",
            diagup: "⒂",
            diamondsuit: "♢",
            emptyset: "ø",
            exists: "∃",
            flat: "♭",
            forall: "∀",
            heartsuit: "♡",
            infty: "∞",
            lozenge: "◇",
            measuredangle: "∡",
            nabla: "∇",
            natural: "♮",
            neg: "¬",
            lnot: "¬",
            nexists: "∄",
            prime: "′",
            sharp: "♯",
            spadesuit: "♠",
            sphericalangle: "∢",
            surd: "√",
            top: "⊤",
            varnothing: "∅",
            triangle: "△",
            triangledown: "▽"
        }
    };
});
/*!
 * 罗马字体
 */
define("font/kf-ams-roman", [], function(require) {
    return {
        meta: {
            fontFamily: "KF AMS ROMAN",
            x: 50,
            "units-per-em": 1e3,
            attr: ""
        },
        data: {
            A: {
                x: 746,
                d: "M390 691l222 -628c13 -37 31 -37 84 -37v-26c-24 2 -74 2 -100 2c-31 0 -83 0 -112 -2v26c19 0 62 0 62 27c0 4 0 6 -5 18l-60 170h-262l-53 -149c-2 -6 -4 -11 -4 -20c0 -12 7 -44 54 -46v-26c-24 2 -64 2 -89 2c-19 0 -59 0 -77 -2v26c35 0 75 11 94 65l212 600\nc5 13 7 16 17 16s12 -3 17 -16zM350 611l-122 -344h244z"
            },
            B: {
                x: 655,
                d: "M50 683h318c129 0 211 -85 211 -168c0 -76 -67 -140 -163 -159c107 -7 189 -84 189 -174c0 -91 -83 -182 -211 -182h-344v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26zM193 363h144c108 0 169 76 169 152c0 62 -44 142 -143 142h-128c-40 0 -42 -5 -42 -39v-255z\nM235 26h130c109 0 166 84 166 157s-50 164 -153 164h-185v-282c0 -34 2 -39 42 -39z"
            },
            C: {
                x: 675,
                d: "M625 679v-237c0 -18 0 -20 -11 -20c-9 0 -9 2 -11 14c-19 139 -101 237 -214 237c-97 0 -263 -70 -263 -331c0 -260 163 -332 265 -332c108 0 208 86 216 226c1 9 1 12 9 12c9 0 9 -4 9 -14c0 -115 -95 -250 -248 -250c-172 0 -327 150 -327 358c0 206 155 357 326 357\nc77 0 137 -36 186 -98l44 84c7 12 8 13 12 13c6 0 7 -1 7 -19z"
            },
            D: {
                x: 708,
                d: "M50 683h318c163 0 290 -158 290 -347c0 -188 -129 -336 -290 -336h-318v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26zM236 26h112c95 0 152 54 176 85c19 27 60 84 60 225c0 272 -153 321 -236 321h-112c-40 0 -42 -5 -42 -39v-553c0 -34 2 -39 42 -39z"
            },
            E: {
                x: 656,
                d: "M606 253l-36 -253h-520v26c69 0 80 0 80 45v539c0 45 -11 45 -80 45v26h506l24 -221h-18c-14 133 -32 195 -187 195h-137c-40 0 -42 -5 -42 -39v-249h94c94 0 103 34 103 117h18v-260h-18c0 83 -9 117 -103 117h-94v-276c0 -34 2 -39 42 -39h139c176 0 189 80 211 227h18\nz"
            },
            F: {
                x: 617,
                d: "M543 681l24 -221h-18c-14 133 -31 195 -182 195h-129c-40 0 -42 -5 -42 -39v-262h90c93 0 102 33 102 117h18v-260h-18c0 84 -9 117 -102 117h-90v-256c0 -36 2 -46 78 -46h22v-26c-41 2 -89 2 -130 2c-31 0 -87 0 -116 -2v26c69 0 80 0 80 45v539c0 45 -11 45 -80 45v26\nh493z"
            },
            G: {
                x: 740,
                d: "M625 199v-179c0 -18 -1 -19 -6 -19s-33 28 -50 69c-31 -57 -110 -86 -191 -86c-176 0 -328 153 -328 358c0 206 155 357 326 357c77 0 137 -36 186 -98l44 84c7 12 8 13 12 13c6 0 7 -1 7 -19v-237c0 -18 0 -20 -11 -20c-9 0 -9 2 -11 14c-19 139 -101 237 -214 237\nc-97 0 -263 -70 -263 -331s169 -332 272 -332c31 0 161 9 161 119v66c0 36 -2 47 -88 47h-30v26c38 -1 116 -2 144 -2c27 0 81 0 105 2v-26c-62 0 -65 -5 -65 -43z"
            },
            H: {
                x: 690,
                d: "M560 612v-541c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v271h-298v-271c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26c29 -2 82 -2 113 -2s84 0 113 2v-26\nc-69 0 -80 0 -80 -45v-244h298v244c0 45 -11 45 -80 45v26c29 -2 82 -2 113 -2s84 0 113 2v-26c-69 0 -80 0 -80 -45z"
            },
            I: {
                x: 334,
                d: "M200 612v-541c0 -45 12 -45 84 -45v-26c-32 2 -83 2 -117 2s-85 0 -117 -2v26c72 0 84 0 84 45v541c0 45 -12 45 -84 45v26c32 -2 83 -2 117 -2s85 0 117 2v-26c-72 0 -84 0 -84 -45z"
            },
            J: {
                x: 466,
                d: "M292 147v463c0 36 -2 47 -80 47h-24v26c42 -2 88 -2 130 -2c25 0 96 2 98 2v-26c-31 0 -54 0 -58 -19c-2 -6 -2 -34 -2 -51v-420c0 -34 0 -36 -1 -43c-12 -84 -84 -140 -162 -140c-82 0 -143 61 -143 128c0 29 19 44 43 44c25 0 42 -18 42 -42c0 -30 -24 -43 -43 -43\nc-4 0 -9 1 -13 2c26 -61 86 -73 112 -73c51 0 101 55 101 147z"
            },
            K: {
                x: 734,
                d: "M368 419l223 -341c30 -46 45 -52 93 -52v-26c-23 2 -64 2 -88 2c-33 0 -79 0 -111 -2v26c13 0 41 0 41 26c0 10 -7 23 -13 33l-189 290l-128 -127v-177c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26\nc29 -2 82 -2 113 -2s84 0 113 2v-26c-69 0 -80 0 -80 -45v-339l332 333c4 6 8 17 8 24s-4 25 -30 27v26c26 -2 73 -2 100 -2c20 0 45 1 65 2v-26c-56 -2 -94 -30 -130 -65z"
            },
            L: {
                x: 591,
                d: "M541 253l-24 -253h-467v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26c29 -2 85 -2 116 -2c41 0 89 0 130 2v-26h-22c-76 0 -78 -10 -78 -46v-546c0 -34 2 -39 42 -39h93c171 0 184 128 192 227h18z"
            },
            M: {
                x: 843,
                d: "M206 667l216 -586l216 586c6 15 7 16 28 16h127v-26c-69 0 -80 0 -80 -45v-541c0 -45 11 -45 80 -45v-26c-27 2 -82 2 -111 2s-83 0 -110 -2v26c69 0 80 0 80 45v587h-1l-237 -642c-4 -10 -6 -16 -14 -16s-10 6 -14 16l-235 637h-1v-555c0 -25 0 -72 80 -72v-26\nc-23 2 -65 2 -90 2s-67 0 -90 -2v26c80 0 80 47 80 72v514c0 45 -11 45 -80 45v26h128c21 0 22 -1 28 -16z"
            },
            N: {
                x: 690,
                d: "M204 671l336 -549v463c0 25 0 72 -80 72v26c23 -2 65 -2 90 -2s67 0 90 2v-26c-80 0 -80 -47 -80 -72v-563c0 -19 0 -22 -10 -22c-5 0 -8 0 -15 12l-371 607c-7 10 -7 12 -14 18v-539c0 -25 0 -72 80 -72v-26c-23 2 -65 2 -90 2s-67 0 -90 -2v26c80 0 80 47 80 72v553\nc-3 1 -21 6 -61 6h-19v26h127c19 0 20 -1 27 -12z"
            },
            O: {
                x: 727,
                d: "M677 340c0 -200 -143 -356 -314 -356c-167 0 -313 153 -313 356s144 359 314 359c166 0 313 -154 313 -359zM364 2c110 0 237 110 237 351c0 233 -132 328 -238 328c-101 0 -237 -92 -237 -328c0 -237 124 -351 238 -351z"
            },
            P: {
                x: 629,
                d: "M196 321v-250c0 -45 11 -45 80 -45v-26c-29 2 -82 2 -113 2s-84 0 -113 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26h306c131 0 223 -88 223 -183s-94 -179 -223 -179h-160zM194 342h143c122 0 166 67 166 158c0 83 -37 157 -166 157h-101c-40 0 -42 -5 -42 -39\nv-276z"
            },
            Q: {
                x: 732,
                d: "M477 9c19 -75 40 -128 99 -128c32 0 86 20 93 116c0 2 1 9 6 9c7 0 7 -7 7 -17c0 -28 -5 -184 -111 -184c-86 0 -97 73 -114 195c-38 -13 -70 -16 -93 -16c-170 0 -314 156 -314 356c0 203 144 359 314 359c166 0 313 -154 313 -359c0 -150 -81 -280 -200 -331zM310 10\nc-11 13 -20 32 -20 55c0 38 27 80 75 80c65 0 89 -60 104 -111c67 43 134 137 134 306c0 234 -128 341 -240 341c-108 0 -239 -103 -239 -341c0 -186 82 -297 186 -330zM453 25c-8 47 -24 104 -88 104c-38 0 -59 -33 -59 -64c0 -22 13 -63 58 -63c17 0 49 2 89 23z"
            },
            R: {
                x: 730,
                d: "M390 341c119 -36 127 -109 133 -159c2 -22 4 -37 7 -58c6 -61 12 -124 67 -124c31 0 60 22 65 87c0 4 1 10 9 10c9 0 9 -7 9 -13c0 -17 -11 -100 -85 -100c-22 0 -73 4 -111 45c-30 34 -30 68 -30 135c0 68 0 95 -40 134c-14 13 -46 36 -103 36h-117v-263\nc0 -45 11 -45 80 -45v-26c-29 2 -81 2 -112 2s-83 0 -112 -2v26c69 0 80 0 80 45v541c0 45 -11 45 -80 45v26h269c140 0 246 -85 246 -179c0 -80 -80 -144 -175 -163zM308 350c75 0 181 25 181 154c0 124 -97 153 -180 153h-73c-40 0 -42 -5 -42 -39v-268h114z"
            },
            S: {
                x: 518,
                d: "M442 679v-203c0 -17 0 -20 -9 -20c-7 0 -8 1 -11 19c-15 125 -81 200 -187 200c-85 0 -137 -71 -137 -136c0 -32 10 -64 38 -95c25 -27 48 -34 102 -48c56 -14 58 -14 65 -17c48 -12 93 -24 135 -88c11 -18 30 -58 30 -110c0 -106 -77 -197 -186 -197\nc-48 0 -132 14 -182 80c-19 -38 -19 -40 -20 -43c-14 -31 -16 -36 -23 -36c-6 0 -7 1 -7 19v202c0 20 1 21 9 21c7 0 8 -1 9 -17c7 -140 107 -200 214 -200c87 0 138 77 138 149c0 56 -30 116 -87 140c-10 4 -60 17 -90 25c-80 21 -115 29 -152 75c-34 42 -41 86 -41 117\nc0 102 82 183 184 183c63 0 121 -25 159 -80l30 66c4 9 6 13 12 13s7 -1 7 -19z"
            },
            T: {
                x: 711,
                d: "M644 680l17 -221h-18c-13 166 -28 195 -181 195c-18 0 -47 0 -55 -1c-18 -4 -18 -16 -18 -38v-542c0 -36 3 -47 86 -47h28v-26c-48 1 -98 2 -147 2s-99 -1 -147 -2v26h28c83 0 86 11 86 47v542c0 23 0 35 -19 38c-8 1 -37 1 -55 1c-154 0 -168 -29 -181 -195h-18l17 221\nh577z"
            },
            U: {
                x: 690,
                d: "M539 229v356c0 25 0 72 -80 72v26c23 -2 66 -2 91 -2s67 0 90 2v-26c-29 0 -80 -6 -80 -62v-380c0 -98 -75 -231 -205 -231c-116 0 -225 101 -225 245v383c0 45 -11 45 -80 45v26c29 -2 82 -2 113 -2s84 0 113 2v-26c-69 0 -80 0 -80 -45v-388c0 -35 4 -97 36 -145\nc28 -42 74 -69 125 -69c95 0 182 85 182 219z"
            },
            V: {
                x: 772,
                d: "M630 591l-227 -591c-5 -14 -6 -16 -17 -16s-12 2 -17 16l-238 621c-12 32 -23 36 -81 36v26c24 -2 71 -2 97 -2c33 0 80 0 112 2v-26c-21 0 -61 0 -61 -27c0 -5 2 -10 5 -17l206 -539l197 513c3 8 6 15 6 26c0 6 -2 41 -52 44v26c23 -2 64 -2 88 -2c25 0 51 0 74 2v-26\nc-67 -1 -83 -44 -92 -66z"
            },
            W: {
                x: 1036,
                d: "M904 593l-187 -592c-5 -15 -5 -17 -14 -17c-8 0 -11 2 -15 16l-170 542l-170 -542c-4 -14 -7 -16 -15 -16c-9 0 -9 2 -14 17l-195 618c-10 32 -14 38 -74 38v26c24 -2 68 -2 94 -2c31 0 81 0 110 2v-26c-20 0 -64 0 -64 -28c0 -2 0 -4 5 -18l163 -519l147 467\nc1 3 3 9 3 13c0 3 -16 55 -20 64c-10 18 -22 21 -68 21v26c23 -2 68 -2 93 -2c31 0 81 0 110 2v-26c-19 0 -63 0 -63 -28c0 -4 1 -8 4 -18l163 -520l155 494c4 11 5 15 5 22c0 24 -19 49 -64 50v26c24 -2 68 -2 93 -2c18 0 53 1 70 2v-26c-58 -2 -73 -37 -82 -64z"
            },
            X: {
                x: 766,
                d: "M402 379l220 -320c20 -28 30 -33 94 -33v-26c-24 2 -74 2 -100 2c-33 0 -82 0 -114 -2v26c35 2 44 19 44 27c0 3 0 6 -8 17l-174 254l-160 -232c-5 -7 -10 -14 -10 -27c0 -16 9 -36 40 -39v-26c-25 2 -72 2 -99 2c-24 0 -62 0 -85 -2v26c19 0 84 1 127 63l174 253\nl-193 282c-22 31 -40 33 -95 33v26c24 -2 74 -2 100 -2c33 0 82 0 114 2v-26c-33 -1 -44 -18 -44 -27c0 -3 1 -6 8 -17l148 -216l132 191c7 10 12 18 12 30c0 16 -8 36 -40 39v26c25 -2 66 -2 99 -2c24 0 62 0 85 2v-26c-82 -1 -112 -44 -127 -65z"
            },
            Y: {
                x: 788,
                d: "M627 594l-201 -321v-198c0 -49 9 -49 81 -49v-26c-29 2 -82 2 -113 2s-83 0 -112 -2v26c69 0 80 0 80 45v202l-221 352c-18 29 -34 32 -91 32v26c24 -2 74 -2 100 -2c33 0 82 0 114 2v-26c-14 0 -49 0 -49 -20c0 -7 1 -8 8 -20l197 -315l180 289c8 13 13 21 13 33\nc0 19 -13 32 -38 33v26c24 -2 64 -2 89 -2s51 0 74 2v-26c-18 0 -72 -1 -111 -63z"
            },
            Z: {
                x: 575,
                d: "M520 663l-394 -635h174c191 0 198 102 207 233h18l-14 -261h-439c-20 0 -22 0 -22 13c0 7 0 8 7 19l387 625h-165c-162 0 -192 -81 -198 -195h-18l10 221h425c21 0 22 -1 22 -20z"
            },
            a: {
                x: 519,
                d: "M370 259v-144c0 -44 0 -96 41 -96c13 0 40 8 40 69v57h18v-56c0 -79 -53 -93 -74 -93c-44 0 -72 40 -74 84c-22 -57 -73 -88 -128 -88c-53 0 -143 22 -143 99c0 38 18 88 81 123c56 30 127 38 186 40v44c0 84 -55 128 -105 128c-35 0 -89 -18 -110 -81c3 1 8 2 12 2\nc17 0 36 -11 36 -36c0 -28 -23 -36 -36 -36c-6 0 -36 2 -36 39c0 66 57 128 136 128c34 0 77 -10 114 -43c42 -39 42 -74 42 -140zM317 139v100c-32 -2 -87 -6 -135 -33c-58 -32 -71 -85 -71 -115c0 -46 39 -83 89 -83c55 0 117 44 117 131z"
            },
            b: {
                x: 546,
                d: "M169 694v-328c30 39 74 72 136 72c101 0 191 -94 191 -222c0 -136 -101 -224 -201 -224c-58 0 -101 32 -130 79l-29 -71h-18v603c0 48 -9 54 -68 54v26zM171 315v-198c0 -18 0 -20 11 -39c32 -58 77 -70 108 -70c24 0 142 11 142 209c0 189 -103 205 -133 205\nc-19 0 -75 -5 -114 -65c-14 -21 -14 -24 -14 -42z"
            },
            c: {
                x: 451,
                d: "M366 350c-22 55 -80 74 -119 74c-59 0 -133 -55 -133 -207c0 -148 77 -207 141 -207c43 0 100 20 126 101c4 13 5 14 12 14s8 -3 8 -7c0 -11 -31 -126 -155 -126c-102 0 -196 91 -196 224c0 128 90 226 196 226c77 0 145 -54 145 -125c0 -35 -29 -38 -36 -38\nc-13 0 -36 8 -36 36c0 35 28 35 47 35z"
            },
            d: {
                x: 546,
                d: "M309 683l119 11v-614c0 -48 9 -54 68 -54v-26l-121 -8v73c-5 -7 -49 -73 -134 -73c-98 0 -191 92 -191 223c0 132 99 223 201 223c81 0 122 -64 126 -69v234c0 48 -9 54 -68 54v26zM375 120v198c0 18 0 21 -13 42c-23 36 -60 62 -106 62c-26 0 -142 -12 -142 -208\nc0 -191 104 -206 133 -206c19 0 53 5 87 35c23 20 41 47 41 77z"
            },
            e: {
                x: 458,
                d: "M404 235h-290c0 -47 0 -106 31 -157c27 -44 70 -68 113 -68c52 0 107 34 129 102c4 12 5 14 12 14c2 0 8 0 8 -7c0 -21 -44 -127 -156 -127c-106 0 -201 96 -201 226c0 123 84 224 190 224c114 0 168 -89 168 -191c0 -10 0 -12 -4 -16zM115 250h239\nc-1 112 -47 176 -115 176c-40 0 -117 -32 -124 -176z"
            },
            f: {
                x: 391,
                d: "M181 404v-333c0 -45 12 -45 84 -45v-26c-27 2 -78 2 -107 2c-26 0 -72 0 -96 -2v26c64 0 68 5 68 43v335h-80v26h80v119c0 106 78 153 135 153c40 0 76 -23 76 -61c0 -26 -20 -34 -34 -34s-34 8 -34 34c0 25 21 32 29 34c-10 7 -25 11 -38 11c-43 0 -85 -52 -85 -135\nv-121h116v-26h-114z"
            },
            g: {
                x: 531,
                d: "M141 180c-19 -22 -19 -44 -19 -53c0 -35 21 -63 52 -68c5 -1 46 -1 69 -1c77 0 225 0 225 -136c0 -75 -99 -126 -209 -126c-114 0 -209 53 -209 125c0 50 41 90 93 103c-34 21 -44 59 -44 85c0 5 0 46 30 81c-10 10 -43 46 -43 103c0 83 68 145 147 145\nc32 0 68 -10 98 -37c28 26 63 45 103 45c32 0 47 -20 47 -39c0 -13 -8 -23 -23 -23c-13 0 -22 9 -22 22c0 16 9 20 13 21c-5 3 -11 3 -15 3c-23 0 -64 -10 -92 -40c30 -31 38 -71 38 -97c0 -83 -68 -145 -147 -145c-40 0 -73 17 -92 32zM233 165c88 0 88 108 88 128\ns0 128 -88 128s-88 -108 -88 -128s0 -128 88 -128zM259 -187c100 0 169 53 169 108c0 93 -114 93 -196 93c-68 0 -78 0 -103 -17c-22 -16 -39 -45 -39 -76c0 -55 69 -108 169 -108z"
            },
            h: {
                x: 550,
                d: "M432 304v-235c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v239c0 48 -8 114 -82 114c-70 0 -126 -69 -126 -161v-192c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v534c0 48 -9 54 -68 54v26l119 11v-355\nh1c12 33 52 99 134 99c118 0 128 -83 128 -134z"
            },
            i: {
                x: 280,
                d: "M171 616c0 -23 -19 -41 -41 -41c-23 0 -41 19 -41 41c0 23 19 41 41 41c23 0 41 -19 41 -41zM54 427l115 11v-370c0 -36 2 -42 61 -42v-26c-23 2 -64 2 -88 2c-25 0 -68 0 -92 -2v26c64 0 68 5 68 43v278c0 48 -8 54 -64 54v26z"
            },
            j: {
                x: 315,
                d: "M265 616c0 -23 -19 -41 -41 -41c-23 0 -41 19 -41 41c0 23 19 41 41 41c23 0 41 -19 41 -41zM140 427l125 11v-493c0 -85 -51 -148 -120 -148c-51 0 -95 26 -95 66c0 22 14 37 36 37c23 0 36 -17 36 -36c0 -28 -25 -35 -32 -36c22 -14 49 -15 56 -15c59 0 68 78 68 128\nv405c0 48 -8 55 -74 55v26z"
            },
            k: {
                x: 544,
                d: "M280 264l126 -185c30 -44 41 -53 88 -53v-26c-17 1 -54 2 -72 2c-25 0 -68 0 -92 -2v26c12 0 30 3 30 21c0 13 -10 27 -22 45l-101 150l-69 -63v-110c0 -39 4 -43 68 -43v-26c-24 2 -68 2 -93 2s-69 0 -93 -2v26c64 0 68 5 68 43v534c0 48 -9 54 -68 54v26l119 11v-490\nl151 138c1 0 21 19 21 39c0 14 -10 22 -24 23v26c27 -2 70 -2 98 -2l49 1c1 1 3 1 9 1v-26c-26 -1 -62 -6 -119 -54c-9 -8 -80 -73 -80 -75c0 -3 5 -9 6 -11z"
            },
            l: {
                x: 287,
                d: "M169 694v-625c0 -39 4 -43 68 -43v-26c-24 2 -68 2 -94 2c-25 0 -69 0 -93 -2v26c64 0 68 5 68 43v534c0 48 -9 54 -68 54v26z"
            },
            m: {
                x: 811,
                d: "M693 304v-235c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v239c0 48 -8 114 -82 114c-70 0 -126 -69 -126 -161v-192c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v239c0 48 -8 114 -82 114\nc-70 0 -126 -69 -126 -161v-192c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v278c0 48 -9 54 -68 54v26l118 11v-101h1c15 40 56 101 135 101c56 0 115 -18 127 -100h1c18 54 65 100 133 100c119 0 128 -84 128 -134z"
            },
            n: {
                x: 550,
                d: "M432 304v-235c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v239c0 48 -8 114 -82 114c-70 0 -126 -69 -126 -161v-192c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v278c0 48 -9 54 -68 54v26l118 11v-101\nh1c15 40 56 101 135 101c118 0 128 -83 128 -134z"
            },
            o: {
                x: 504,
                d: "M454 214c0 -126 -93 -222 -202 -222s-202 96 -202 222c0 128 93 228 202 228s202 -100 202 -228zM252 10c38 0 81 19 109 65c27 48 29 108 29 147c0 31 0 97 -31 144c-24 35 -62 60 -107 60c-51 0 -90 -32 -110 -65c-26 -45 -28 -97 -28 -139c0 -44 3 -100 28 -145\nc23 -39 63 -67 110 -67z"
            },
            p: {
                x: 546,
                d: "M239 -169v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v473c0 48 -9 54 -68 54v26l119 11v-73c28 40 77 73 137 73c103 0 190 -96 190 -222c0 -136 -101 -224 -201 -224c-53 0 -95 27 -124 69v-187c0 -39 4 -43 68 -43zM171 314v-198c0 -16 0 -22 13 -44\nc30 -47 69 -64 105 -64c79 0 143 93 143 207s-60 205 -133 205c-50 0 -84 -30 -89 -34c-39 -37 -39 -58 -39 -72z"
            },
            q: {
                x: 546,
                d: "M428 438v-564c0 -39 4 -43 68 -43v-26c-24 2 -69 2 -95 2s-70 0 -94 -2v26c64 0 68 5 68 43v199c-13 -22 -56 -81 -133 -81c-100 0 -192 92 -192 223c0 132 98 223 200 223c67 0 109 -46 132 -99l30 99h16zM377 137v140c0 52 -40 143 -120 143c-77 0 -143 -89 -143 -206\nc0 -111 58 -206 133 -206c24 0 60 8 91 43c3 3 39 43 39 86z"
            },
            r: {
                x: 402,
                d: "M169 236v-165c0 -45 12 -45 84 -45v-26c-27 2 -78 2 -107 2c-26 0 -72 0 -96 -2v26c64 0 68 5 68 43v278c0 48 -9 54 -68 54v26l116 11v-109h1c10 35 43 109 119 109c34 0 66 -20 66 -52c0 -28 -22 -35 -34 -35c-15 0 -34 10 -34 34c0 26 22 33 22 33c-7 3 -14 4 -21 4\nc-75 0 -116 -90 -116 -186z"
            },
            s: {
                x: 408,
                d: "M334 422v-112c0 -17 0 -20 -9 -20c-3 0 -8 1 -9 6c-2 32 -8 132 -115 132c-101 0 -115 -55 -115 -81c0 -61 70 -75 125 -87c42 -8 77 -15 107 -46c13 -12 40 -39 40 -90c0 -78 -53 -132 -152 -132c-56 0 -91 26 -111 53c-6 -10 -21 -34 -27 -43c-5 -8 -6 -9 -11 -9\nc-6 0 -7 1 -7 19v144c0 20 1 21 9 21s8 -1 11 -15c18 -88 49 -154 136 -154c92 0 116 54 116 96c0 36 -22 58 -35 70c-21 18 -43 22 -106 35c-29 6 -131 27 -131 117c0 58 40 116 151 116c17 0 62 -1 94 -35c3 4 12 14 15 18c12 15 13 16 17 16c6 0 7 -1 7 -19z"
            },
            t: {
                x: 396,
                d: "M190 404v-283c0 -91 40 -111 69 -111c42 0 69 46 69 115v56h18v-57c0 -74 -34 -132 -93 -132c-116 0 -116 112 -116 131v281h-87v16c85 2 120 92 122 195h18v-185h140v-26h-140z"
            },
            u: {
                x: 550,
                d: "M311 427l121 11v-358c0 -48 9 -54 68 -54v-26l-119 -8v93h-1c-8 -21 -41 -93 -126 -93c-72 0 -97 26 -110 39c-26 28 -26 71 -26 138v192c-1 40 -28 40 -68 40v26l121 11v-329c0 -52 7 -101 89 -101c74 0 119 73 119 157v182c0 48 -9 54 -68 54v26z"
            },
            v: {
                x: 564,
                d: "M431 340l-133 -331c-6 -15 -7 -17 -16 -17s-10 2 -16 17l-145 364c-12 31 -33 31 -71 31v26c22 -2 53 -2 80 -2c25 0 69 0 93 2v-26c-15 0 -48 0 -48 -24c0 -4 0 -6 6 -19l119 -300l110 278c6 14 6 16 6 25c0 26 -14 38 -39 40v26c20 -2 53 -2 74 -2c19 0 44 1 63 2v-26\nc-58 -2 -74 -42 -83 -64z"
            },
            w: {
                x: 747,
                d: "M622 342l-114 -334c-4 -13 -7 -16 -15 -16c-7 0 -11 2 -16 17l-104 302l-103 -302c-5 -15 -9 -17 -16 -17c-8 0 -11 3 -15 16l-123 360c-11 33 -22 36 -66 36v26c21 -2 55 -2 77 -2c25 0 67 0 91 2v-26c-16 0 -50 0 -50 -26c0 -3 0 -5 5 -18l99 -289l92 268\nc-21 63 -21 65 -76 65v26c23 -2 49 -2 74 -2c24 0 66 0 89 2v-26c-16 0 -50 0 -50 -26c0 -4 3 -12 5 -19l102 -295l94 272c2 7 4 16 4 23c0 25 -17 43 -48 45v26c17 -2 60 -2 79 -2c20 0 40 1 60 2v-26c-15 -1 -55 -3 -75 -62z"
            },
            x: {
                x: 582,
                d: "M309 233l134 -174c24 -31 39 -33 89 -33v-26c-22 2 -54 2 -81 2c-25 0 -68 0 -92 -2v26c16 1 28 9 28 23c0 7 -12 22 -20 33l-87 113l-83 -102c-9 -12 -17 -23 -17 -41c0 -23 16 -25 22 -26v-26c-18 2 -62 2 -82 2c-18 0 -53 -1 -70 -2v26c27 1 74 5 119 59\nc11 14 98 121 98 125c0 3 -5 9 -7 11l-115 149c-24 30 -36 34 -90 34v26c22 -2 54 -2 81 -2c25 0 68 0 92 2v-26c-17 -1 -27 -11 -27 -23c0 -5 0 -7 9 -18l88 -115l74 94c5 7 15 18 15 36c0 14 -8 24 -22 26v26c23 -2 54 -2 81 -2c18 0 53 1 70 2v-26\nc-44 -1 -82 -17 -115 -55c-28 -33 -62 -77 -92 -116z"
            },
            y: {
                x: 564,
                d: "M430 342l-178 -439c-20 -50 -56 -106 -114 -106c-45 0 -86 29 -86 69c0 18 11 33 33 33c20 0 32 -15 32 -32s-10 -31 -33 -33c18 -18 43 -21 54 -21c63 0 89 69 134 187l-149 367c-13 32 -19 37 -73 37v26c22 -2 54 -2 81 -2c25 0 68 0 92 2v-26c-24 0 -47 -2 -47 -24\nc0 -1 0 -8 5 -20l119 -292l109 270c5 12 7 17 7 27c0 8 -1 36 -39 39v26c20 -2 53 -2 74 -2c19 0 44 1 63 2v-26c-14 0 -59 -1 -84 -62z"
            },
            z: {
                x: 452,
                d: "M391 407l-278 -389h128c122 0 135 51 143 162h18l-14 -180h-316c-21 0 -22 1 -22 15l286 399h-122c-115 0 -126 -42 -133 -139h-18l10 155h304c18 0 22 0 22 -9c0 -2 0 -4 -8 -14z"
            }
        }
    };
});
/*!
 * 字体管理器
 */
define("font/manager", [], function(require) {
    var FONT_LIST = {};
    return {
        registerFont: function(fontData) {
            FONT_LIST[fontData.meta.fontFamily] = fontData;
        },
        getFontList: function() {
            return FONT_LIST;
        },
        getCharacterMap: function(fontFamily) {
            if (!FONT_LIST[fontFamily]) {
                return null;
            }
            return FONT_LIST[fontFamily].map || {};
        },
        getCharacterData: function(char, fontFamily) {
            try {
                return FONT_LIST[fontFamily].data[char].d;
            } catch (e) {
                return null;
            }
        },
        /**
         * 按照指定的字体族， 返回给定的转义序列str所对应的unicode字符
         * 如果不存在对应的字体族或者该族内不存在对应的转义序列， 则返回空串
         * @param str 需要转义的序列
         * @param fontFamily 参考的字体族
         */
        getCharacterValue: function(str, fontFamily) {
            var map = this.getCharacterMap(fontFamily);
            if (!map) {
                return "";
            }
            return map[str] || "";
        }
    };
});
/**
 * 公式对象，表达式容器
 */
define("formula", [ "kity", "def/gtype", "conf", "font/kf-ams-main", "font/kf-ams-cal", "font/kf-ams-roman", "font/manager", "font/installer", "fpaper" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype"), CONF = require("conf"), FontManager = require("font/manager"), FontInstaller = require("font/installer"), DEFAULT_OPTIONS = {
        fontsize: 50,
        autoresize: true,
        padding: [ 0 ]
    }, EXPRESSION_INTERVAL = 10, ExpressionWrap = kity.createClass("ExpressionWrap", {
        constructor: function(exp, config) {
            this.wrap = new kity.Group();
            this.bg = new kity.Rect(0, 0, 0, 0).fill("transparent");
            this.exp = exp;
            this.config = config;
            this.wrap.setAttr("data-type", "kf-exp-wrap");
            this.bg.setAttr("data-type", "kf-exp-wrap-bg");
            this.wrap.addShape(this.bg);
            this.wrap.addShape(this.exp);
        },
        getWrapShape: function() {
            return this.wrap;
        },
        getExpression: function() {
            return this.exp;
        },
        getBackground: function() {
            return this.bg;
        },
        resize: function() {
            var padding = this.config.padding, expBox = this.exp.getFixRenderBox();
            if (padding.length === 1) {
                padding[1] = padding[0];
            }
            this.bg.setSize(padding[1] * 2 + expBox.width, padding[0] * 2 + expBox.height);
            this.exp.translate(padding[1], padding[0]);
        }
    }), Formula = kity.createClass("Formula", {
        base: require("fpaper"),
        constructor: function(container, config) {
            this.callBase(container);
            this.expressions = [];
            this.fontInstaller = new FontInstaller(this);
            this.config = kity.Utils.extend({}, DEFAULT_OPTIONS, config);
            this.initEnvironment();
            this.initFont();
        },
        initEnvironment: function() {
            this.zoom = this.config.fontsize / 50;
            if ("width" in this.config) {
                this.setWidth(this.config.width);
            }
            if ("height" in this.config) {
                this.setHeight(this.config.height);
            }
            this.node.setAttribute("font-size", DEFAULT_OPTIONS.fontsize);
        },
        initFont: function() {
            var fontInstaller = this.fontInstaller;
            kity.Utils.each(FontManager.getFontList(), function(fontData) {
                fontInstaller.mount(fontData);
            });
        },
        insertExpression: function(expression, index) {
            var expWrap = this.wrap(expression);
            // clear zoom
            this.container.clearTransform();
            this.expressions.splice(index, 0, expWrap.getWrapShape());
            this.addShape(expWrap.getWrapShape());
            notifyExpression.call(this, expWrap.getExpression());
            expWrap.resize();
            correctOffset.call(this);
            this.resetZoom();
            this.config.autoresize && this.resize();
        },
        appendExpression: function(expression) {
            this.insertExpression(expression, this.expressions.length);
        },
        resize: function() {
            var renderBox = this.container.getFixRenderBox();
            this.node.setAttribute("width", renderBox.width);
            this.node.setAttribute("height", renderBox.height);
        },
        resetZoom: function() {
            var zoomLevel = this.zoom / this.getBaseZoom();
            if (zoomLevel !== 0) {
                this.container.scale(zoomLevel);
            }
        },
        wrap: function(exp) {
            return new ExpressionWrap(exp, this.config);
        },
        clear: function() {
            this.callBase();
            this.expressions = [];
        },
        clearExpressions: function() {
            kity.Utils.each(this.expressions, function(exp, i) {
                exp.remove();
            });
            this.expressions = [];
        }
    });
    kity.Utils.extend(Formula, {
        registerFont: function(fontData) {
            FontManager.registerFont(fontData);
        }
    });
    // 自运行， 注册配置好的字体
    (function() {
        kity.Utils.each(CONF.font.list, function(fontData) {
            Formula.registerFont(fontData);
        });
    })();
    // 调整表达式之间的偏移
    function correctOffset() {
        var exprOffset = 0;
        kity.Utils.each(this.expressions, function(expr) {
            var box = null;
            if (!expr) {
                return;
            }
            expr.setMatrix(new kity.Matrix(1, 0, 0, 1, 0, 0));
            box = expr.getFixRenderBox();
            expr.translate(0 - box.x, exprOffset);
            exprOffset += box.height + EXPRESSION_INTERVAL;
        });
        return this;
    }
    // 通知表达式已接入到paper
    function notifyExpression(expression) {
        var len = 0, childGroup = null;
        if (!expression) {
            return;
        }
        if (expression.getType() === GTYPE.EXP) {
            for (var i = 0, len = expression.getChildren().length; i < len; i++) {
                notifyExpression(expression.getChild(i));
            }
        } else if (expression.getType() === GTYPE.COMPOUND_EXP) {
            // 操作数处理
            for (var i = 0, len = expression.getOperands().length; i < len; i++) {
                notifyExpression(expression.getOperand(i));
            }
            // 处理操作符
            notifyExpression(expression.getOperator());
        }
        expression.addedCall && expression.addedCall();
    }
    return Formula;
});
/**
 * 公式专用paper
 */
define("fpaper", [ "kity" ], function(require, exports, module) {
    var kity = require("kity");
    return kity.createClass("FPaper", {
        base: kity.Paper,
        constructor: function(container) {
            this.callBase(container);
            this.container = new kity.Group();
            this.container.setAttr("data-type", "kf-container");
            this.background = new kity.Group();
            this.background.setAttr("data-type", "kf-bg");
            this.baseZoom = 1;
            this.zoom = 1;
            this.base("addShape", this.background);
            this.base("addShape", this.container);
        },
        getZoom: function() {
            return this.zoom;
        },
        getBaseZoom: function() {
            return this.baseZoom;
        },
        addShape: function(shape, pos) {
            return this.container.addShape(shape, pos);
        },
        getBackground: function() {
            return this.background;
        },
        removeShape: function(pos) {
            return this.container.removeShape(pos);
        },
        clear: function() {
            return this.container.clear();
        }
    });
});
/**
 * kity库封包
 */
define("kity", [], function(require, exports, module) {
    if (!window.kity) {
        throw new Error("Missing Kity Graphic Lib");
    }
    return window.kity;
});
/**
 * 分数操作符
 */
define("operator/binary-opr/fraction", [ "kity", "operator/binary-opr/up-down", "operator/binary" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("FractionOperator", {
        base: require("operator/binary-opr/up-down"),
        constructor: function() {
            this.callBase("Fraction");
        },
        applyOperand: function(upOperand, downOperand) {
            upOperand.scale(.66);
            downOperand.scale(.66);
            var upWidth = Math.ceil(upOperand.getWidth()), downWidth = Math.ceil(downOperand.getWidth()), upHeight = Math.ceil(upOperand.getHeight()), downHeight = Math.ceil(downOperand.getHeight()), offset = 3, // 整体padding
            boxPadding = 5, maxWidth = Math.max(upWidth, downWidth), // 内部padding
            padding = 3, maxHeight = Math.max(upHeight, downHeight), operatorShape = generateOperator(maxWidth, offset);
            this.addOperatorShape(operatorShape);
            upOperand.translate((maxWidth - upWidth) / 2 + offset, maxHeight - upHeight);
            operatorShape.translate(0, maxHeight + padding);
            // 下部不需要偏移
            downOperand.translate((maxWidth - downWidth) / 2 + offset, maxHeight + padding + operatorShape.getHeight());
            this.parentExpression.setBoxSize(maxWidth + offset * 2, maxHeight * 2 + operatorShape.getHeight() + padding * 2);
            this.parentExpression.expand(boxPadding, boxPadding);
            this.parentExpression.translateElement(boxPadding, boxPadding);
        }
    });
    function generateOperator(width, offset) {
        return new kity.Rect(width + offset * 2, 1).fill("black");
    }
});
/**
 * 左右结合二元操作符
 * @abstract
 */
define("operator/binary-opr/left-right", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("LeftRightOperator", {
        base: require("operator/binary"),
        applyOperand: function(leftOperand, rightOperand) {
            var operator = this, operatorBox = operator.getFixRenderBox(), // 操作数特殊处理
            leftOperandBox = leftOperand.getFixRenderBox(), rightOperandBox = rightOperand.getFixRenderBox(), // 偏移量
            offset = 0, // 操作对象最大高度
            maxHeight = Math.max(leftOperandBox.height, rightOperandBox.height, operatorBox.height);
            // 左操作数
            leftOperand.translate(offset, (maxHeight - leftOperandBox.height) / 2);
            // 操作符
            offset += leftOperandBox.width + leftOperandBox.x;
            operator.translate(offset, (maxHeight - operatorBox.height) / 2);
            // 右操作数
            offset += operatorBox.width + operatorBox.x;
            rightOperand.translate(offset, (maxHeight - rightOperandBox.height) / 2);
        }
    });
});
/**
 * 开方操作符
 */
define("operator/binary-opr/radical", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity"), // 符号图形属性
    // 线条宽度
    SHAPE_DATA_WIDTH = 1, // 计算公式
    radians = 2 * Math.PI / 360, sin20 = Math.sin(20 * radians), cos20 = Math.cos(20 * radians), tan20 = Math.tan(20 * radians), atan20 = Math.atan(20 * radians);
    return kity.createClass("RadicalOperator", {
        base: require("operator/binary"),
        constructor: function() {
            this.callBase("Radical");
        },
        applyOperand: function(radicand, exponent) {
            generateOperator.call(this, radicand, exponent);
        }
    });
    // 根据给定的操作数生成操作符的pathData
    // radicand 表示被开方数
    // exponent 表示指数
    function generateOperator(radicand, exponent) {
        var decoration = generateDecoration(radicand), vLine = generateVLine(radicand), hLine = generateHLine(radicand);
        this.addOperatorShape(decoration);
        this.addOperatorShape(vLine);
        this.addOperatorShape(hLine);
        adjustmentPosition.call(this, mergeShape(decoration, vLine, hLine), this.operatorShape, radicand, exponent);
        this.parentExpression.expand(0, 10);
        this.parentExpression.translateElement(0, 5);
    }
    // 生成根号中的左边装饰部分
    function generateDecoration(radicand) {
        var shape = new kity.Path(), // 命名为a以便于精简表达式
        a = SHAPE_DATA_WIDTH, h = radicand.getHeight() / 3, drawer = shape.getDrawer();
        // 根号尾部左上角开始
        drawer.moveTo(0, cos20 * a * 6);
        drawer.lineBy(sin20 * a, cos20 * a);
        drawer.lineBy(cos20 * a * 3, -sin20 * a * 3);
        drawer.lineBy(tan20 * h, h);
        drawer.lineBy(sin20 * a * 3, -cos20 * a * 3);
        drawer.lineBy(-sin20 * h, -h);
        drawer.close();
        return shape.fill("black");
    }
    // 根据操作数生成根号的竖直线部分
    function generateVLine(operand) {
        var shape = new kity.Path(), h = operand.getHeight(), drawer = shape.getDrawer();
        drawer.moveTo(tan20 * h, 0);
        drawer.lineTo(0, h);
        drawer.lineBy(sin20 * SHAPE_DATA_WIDTH * 3, cos20 * SHAPE_DATA_WIDTH * 3);
        drawer.lineBy(tan20 * h + sin20 * SHAPE_DATA_WIDTH * 3, -(h + 3 * SHAPE_DATA_WIDTH * cos20));
        drawer.close();
        return shape.fill("black");
    }
    // 根据操作数生成根号的水平线部分
    function generateHLine(operand) {
        // 表达式宽度
        var w = operand.getWidth() + 2 * SHAPE_DATA_WIDTH;
        return new kity.Rect(w, 2 * SHAPE_DATA_WIDTH).fill("black");
    }
    // 合并根号的各个部分， 并返回根号的关键点位置数据
    function mergeShape(decoration, vLine, hLine) {
        var decoBox = decoration.getFixRenderBox(), vLineBox = vLine.getFixRenderBox();
        vLine.translate(decoBox.width - sin20 * SHAPE_DATA_WIDTH * 3, 0);
        decoration.translate(0, vLineBox.height - decoBox.height);
        vLineBox = vLine.getFixRenderBox();
        hLine.translate(vLineBox.x + vLineBox.width - SHAPE_DATA_WIDTH / cos20, 0);
        // 返回关键点数据
        return {
            x: vLineBox.x + vLineBox.width - SHAPE_DATA_WIDTH / cos20,
            y: 0
        };
    }
    // 调整整个根号表达式的各个部分： 位置、操作符、被开方数、指数
    function adjustmentPosition(position, operator, radicand, exponent) {
        var exponentBox = null, opOffset = {
            x: 0,
            y: 0
        }, opBox = operator.getFixRenderBox();
        exponent.scale(.66);
        exponentBox = exponent.getFixRenderBox();
        if (exponentBox.width > 0 && exponentBox.height > 0) {
            opOffset.y = exponentBox.height - opBox.height / 2;
            // 指数不超出根号， 则移动指数
            if (opOffset.y < 0) {
                exponent.translate(0, -opOffset.y);
                opOffset.y = 0;
            }
            opOffset.x = exponentBox.width + opBox.height / 2 * tan20 - position.x;
        }
        operator.translate(opOffset.x, opOffset.y);
        radicand.translate(opOffset.x + position.x + SHAPE_DATA_WIDTH, opOffset.y + 2 * SHAPE_DATA_WIDTH);
    }
});
/**
 * 上下结合二元操作符
 * @abstract
 */
define("operator/binary-opr/up-down", [ "kity", "operator/binary", "operator/operator" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("UpDownOperator", {
        base: require("operator/binary"),
        applyOperand: function(upOperand, downOperand) {
            throw new Error("applyOperand is abstract");
        }
    });
});
/**
 * 二元操作符抽象类
 * @abstract
 */
define("operator/binary", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("BinaryOperator", {
        base: require("operator/operator"),
        setParentExpression: function(exp) {
            this.callBase(exp);
        }
    });
});
/**
 * 小括号操作符：()
 */
define("operator/brackets", [ "kity", "font/manager", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), FontManager = require("font/manager");
    return kity.createClass("BracketsOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Brackets");
        },
        applyOperand: function(exp) {
            generate.call(this, exp);
        }
    });
    function generate(exp) {
        var left = this.getParentExpression().getLeftSymbol(), right = this.getParentExpression().getRightSymbol(), leftPath = FontManager.getCharacterData(left, "KF AMS MAIN"), rightPath = FontManager.getCharacterData(right, "KF AMS MAIN"), group = new kity.Group(), leftOp = new kity.Path(leftPath).fill("black"), rightOp = new kity.Path(rightPath).fill("black"), expSpaceSize = exp.getFixRenderBox(), leftOpSize = null, rightOpSize = null, leftZoom = 1, rightZoom = 1, // 左右空间大小
        SPACE = 0, offset = 0;
        this.addOperatorShape(group.addShape(leftOp).addShape(rightOp));
        leftOpSize = leftOp.getFixRenderBox();
        rightOpSize = rightOp.getFixRenderBox();
        leftZoom = expSpaceSize.height ? expSpaceSize.height / leftOpSize.height : 1;
        rightZoom = expSpaceSize.height ? expSpaceSize.height / rightOpSize.height : 1;
        leftOp.scale(leftZoom);
        rightOp.scale(rightZoom);
        // 重新获取大小
        leftOpSize = leftOp.getFixRenderBox();
        rightOpSize = rightOp.getFixRenderBox();
        offset -= leftOpSize.x;
        leftOp.translate(offset, -leftOpSize.y);
        offset += SPACE + leftOpSize.width - expSpaceSize.x;
        exp.translate(offset, 0);
        offset += SPACE + expSpaceSize.width - rightOpSize.x;
        rightOp.translate(offset, -rightOpSize.y);
        this.parentExpression.expand(10, 0);
        this.parentExpression.translateElement(5, 0);
    }
});
/**
 * 组合操作符
 * 操作多个表达式组合在一起
 */
define("operator/combination", [ "kity", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity");
    return kity.createClass("CombinationOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Combination");
        },
        applyOperand: function() {
            // 偏移量
            var offset = 0, // 操作数
            operands = arguments, // 操作对象最大高度
            maxHeight = 0, cached = [];
            kity.Utils.each(operands, function(operand) {
                var box = operand.getFixRenderBox();
                cached.push(box);
                maxHeight = Math.max(box.height, maxHeight);
            });
            kity.Utils.each(operands, function(operand, index) {
                var box = cached[index];
                operand.translate(offset - box.x, (maxHeight - (box.y + box.height)) / 2);
                offset += box.width;
            });
            this.parentExpression.updateBoxSize();
        }
    });
});
/*!
 * 上下标控制器`  1``     ``  `   `       `432    1`
 */
define("operator/common/script-controller", [ "kity" ], function(require) {
    var kity = require("kity"), defaultOptions = {
        subOffset: 0,
        supOffset: 0,
        // 上下标的默认缩放值
        zoom: .66
    };
    return kity.createClass("ScriptController", {
        constructor: function(opObj, target, sup, sub, options) {
            this.opObj = opObj;
            this.target = target;
            this.sup = sup;
            this.sub = sub;
            this.options = kity.Utils.extend({}, defaultOptions, options);
        },
        // 上下标记
        applyUpDown: function() {
            var target = this.target, sup = this.sup, sub = this.sub, options = this.options;
            sup.scale(options.zoom);
            sub.scale(options.zoom);
            var targetBox = target.getFixRenderBox();
            // 基础空间大小
            var supBox = sup.getFixRenderBox(), subBox = sub.getFixRenderBox(), maxOffset = Math.max(supBox.height, subBox.height), space = {
                width: Math.max(targetBox.width, supBox.width, subBox.width),
                height: maxOffset * 2 + targetBox.height
            }, targetHeight = targetBox.height, vOffset = 0;
            if (supBox.height < maxOffset) {
                vOffset = maxOffset - supBox.height;
            }
            // 位置调整
            sup.translate((space.width - supBox.width) / 2, vOffset);
            target.translate((space.width - targetBox.width) / 2, maxOffset);
            sub.translate((space.width - subBox.width) / 2, maxOffset + targetBox.height);
            return space;
        },
        // 侧面标记
        applySide: function() {
            var target = this.target, sup = this.sup, sub = this.sub, options = this.options;
            sup.scale(options.zoom);
            sub.scale(options.zoom);
            var targetBox = target.getFixRenderBox();
            // 默认字符高度
            targetBox.height = targetBox.height || 50;
            // 基础空间大小
            var supBox = sup.getFixRenderBox(), subBox = sub.getFixRenderBox(), maxOffset = Math.max(supBox.height, subBox.height), space = {
                width: targetBox.width + Math.max(supBox.width + options.supOffset, subBox.width + options.subOffset),
                height: 0
            }, targetHeight = targetBox.height, vOffset = 0;
            // 水平方向调整
            sup.translate(targetBox.width + options.supOffset, 0);
            sub.translate(targetBox.width + options.subOffset, 0);
            if (maxOffset * 2 < targetHeight) {
                sub.translate(0, targetHeight - subBox.height);
                space.height = targetHeight;
            } else {
                vOffset = maxOffset - targetHeight / 2;
                target.translate(0, vOffset);
                if (supBox.height < targetHeight / 2) {
                    sup.translate(0, vOffset);
                } else {
                    sup.translate(0, maxOffset - supBox.height);
                }
                if (subBox.height < targetHeight / 2) {
                    sub.translate(0, vOffset + targetHeight - subBox.height);
                } else {
                    sub.translate(0, maxOffset * 2 - subBox.height);
                }
                space.height = maxOffset * 2;
            }
            return space;
        }
    });
});
/**
 * 函数操作符
 */
define("operator/func", [ "kity", "char/text", "font/manager", "signgroup", "operator/common/script-controller", "operator/operator", "def/gtype" ], function(require, exports, modules) {
    var kity = require("kity"), Text = require("char/text"), ScriptController = require("operator/common/script-controller");
    return kity.createClass("FunctionOperator", {
        base: require("operator/operator"),
        constructor: function(funcName) {
            this.callBase("Function: " + funcName);
            this.funcName = funcName;
        },
        /*
         * 积分操作符应用操作数
         * @param expr 函数表达式
         * @param sup 上限
         * @param sub 下限
         */
        applyOperand: function(expr, sup, sub) {
            var opShape = generateOperator.call(this), padding = 5, expBox = expr.getFixRenderBox(), space = new ScriptController(this, opShape, sup, sub, {
                zoom: .5
            }).applyUpDown(), diff = (space.height - expBox.height) / 2;
            if (diff >= 0) {
                expr.translate(space.width + padding, diff);
            } else {
                diff = -diff;
                opShape.translate(0, diff);
                sup.translate(0, diff);
                sub.translate(0, diff);
                expr.translate(space.width + padding, 0);
            }
            this.parentExpression.expand(padding, padding * 2);
            this.parentExpression.translateElement(padding, padding);
        }
    });
    /* 返回操作符对象 */
    function generateOperator() {
        var opShape = new Text(this.funcName, "KF AMS ROMAN");
        this.addOperatorShape(opShape);
        return opShape;
    }
});
/**
 * 积分操作符：∫
 */
define("operator/integration", [ "kity", "operator/common/script-controller", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), ScriptController = require("operator/common/script-controller");
    return kity.createClass("IntegrationOperator", {
        base: require("operator/operator"),
        constructor: function(type) {
            this.callBase("Integration");
            // 默认是普通单重积分
            this.opType = type || 1;
        },
        setType: function(type) {
            this.opType = type | 0;
        },
        // 重置类型
        resetType: function() {
            this.opType = 1;
        },
        applyOperand: function(exp, sup, sub) {
            var opShape = this.getOperatorShape(), padding = 5, expBox = exp.getFixRenderBox(), space = new ScriptController(this, opShape, sup, sub, {
                subOffset: -15
            }).applySide(), diff = (space.height - expBox.height) / 2;
            if (diff >= 0) {
                exp.translate(space.width + padding, diff);
            } else {
                diff = -diff;
                opShape.translate(0, diff);
                sup.translate(0, diff);
                sub.translate(0, diff);
                exp.translate(space.width + padding, 0);
            }
            this.parentExpression.expand(padding, padding * 2);
            this.parentExpression.translateElement(padding, padding);
        },
        getOperatorShape: function() {
            var pathData = "M1.318,48.226c0,0,0.044,0.066,0.134,0.134c0.292,0.313,0.626,0.447,1.006,0.447c0.246,0.022,0.358-0.044,0.604-0.268   c0.782-0.782,1.497-2.838,2.324-6.727c0.514-2.369,0.938-4.693,1.586-8.448C8.559,24.068,9.9,17.878,11.978,9.52   c0.917-3.553,1.922-7.576,3.866-8.983C16.247,0.246,16.739,0,17.274,0c1.564,0,2.503,1.162,2.592,2.57   c0,0.827-0.424,1.386-1.273,1.386c-0.671,0-1.229-0.514-1.229-1.251c0-0.805,0.514-1.095,1.185-1.274   c0.022,0-0.291-0.29-0.425-0.379c-0.201-0.134-0.514-0.224-0.737-0.224c-0.067,0-0.112,0-0.157,0.022   c-0.469,0.134-0.983,0.939-1.453,2.234c-0.537,1.475-0.961,3.174-1.631,6.548c-0.424,2.101-0.693,3.464-1.229,6.727   c-1.608,9.185-2.949,15.487-5.006,23.756c-0.514,2.034-0.849,3.24-1.207,4.335c-0.559,1.698-1.162,2.95-1.811,3.799   c-0.514,0.715-1.385,1.408-2.436,1.408c-1.363,0-2.391-1.185-2.458-2.592c0-0.804,0.447-1.363,1.273-1.363   c0.671,0,1.229,0.514,1.229,1.251C2.503,47.757,1.989,48.047,1.318,48.226z", group = new kity.Group(), opGroup = new kity.Group(), opShape = new kity.Path(pathData).fill("black"), opBox = new kity.Rect(0, 0, 0, 0).fill("transparent"), tmpShape = null;
            opGroup.addShape(opShape);
            group.addShape(opBox);
            group.addShape(opGroup);
            for (var i = 1; i < this.opType; i++) {
                tmpShape = new kity.Use(opShape).translate(opShape.getWidth() / 2 * i, 0);
                tmpShape.translate(10 * i, 0);
                opGroup.addShape(tmpShape);
            }
            tmpShape = null;
            opGroup.scale(1.6);
            this.addOperatorShape(group);
            opGroup.translate(2, 15);
            opBox.setSize(opGroup.getFixRenderBox().width + 4, opGroup.getFixRenderBox().height + 25);
            return group;
        }
    });
});
/**
 * 操作符抽象类
 * @abstract
 */
define("operator/operator", [ "kity", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), GTYPE = require("def/gtype");
    return kity.createClass("Operator", {
        base: require("signgroup"),
        constructor: function(operatorName) {
            this.callBase();
            this.type = GTYPE.OP;
            // 该操作符所属的表达式
            this.parentExpression = null;
            // 操作符名称
            this.operatorName = operatorName;
            // 操作符图形
            this.operatorShape = new kity.Group();
            this.addShape(this.operatorShape);
        },
        applyOperand: function() {
            throw new Error("applyOperand is abstract");
        },
        setParentExpression: function(exp) {
            this.parentExpression = exp;
        },
        getParentExpression: function() {
            return this.parentExpression;
        },
        clearParentExpression: function() {
            this.parentExpression = null;
        },
        // 提供给具体实现类附加其绘制的操作符图形的接口
        addOperatorShape: function(shpae) {
            return this.operatorShape.addShape(shpae);
        },
        getOperatorShape: function() {
            return this.operatorShape;
        }
    });
});
/**
 * 上下标操作符
 */
define("operator/script", [ "kity", "operator/common/script-controller", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, module) {
    var kity = require("kity"), ScriptController = require("operator/common/script-controller");
    return kity.createClass("ScriptOperator", {
        base: require("operator/operator"),
        constructor: function(operatorName) {
            this.callBase(operatorName || "Script");
        },
        applyOperand: function(operand, sup, sub) {
            var opShape = this.getOperatorShape(), padding = 5, space = new ScriptController(this, operand, sup, sub).applySide();
            this.parentExpression.setBoxSize(space.width, space.height);
            this.parentExpression.expand(0, padding * 2);
            this.parentExpression.translateElement(0, padding);
        }
    });
});
/**
 * 求和操作符：∑
 */
define("operator/summation", [ "kity", "operator/common/script-controller", "operator/operator", "def/gtype", "signgroup" ], function(require, exports, modules) {
    var kity = require("kity"), ScriptController = require("operator/common/script-controller");
    return kity.createClass("SummationOperator", {
        base: require("operator/operator"),
        constructor: function() {
            this.callBase("Summation");
            this.displayType = "equation";
        },
        applyOperand: function(expr, sup, sub) {
            var opShape = this.getOperatorShape(), expBox = expr.getFixRenderBox(), padding = 5, space = new ScriptController(this, opShape, sup, sub).applyUpDown(), diff = (space.height - expBox.height) / 2;
            if (diff >= 0) {
                expr.translate(space.width + padding, diff);
            } else {
                diff = -diff;
                opShape.translate(0, diff);
                sup.translate(0, diff);
                sub.translate(0, diff);
                expr.translate(space.width + padding, 0);
            }
            this.parentExpression.expand(padding, padding * 2);
            this.parentExpression.translateElement(padding, padding);
        },
        getOperatorShape: function() {
            var pathData = "M0.672,33.603c-0.432,0-0.648,0-0.648-0.264c0-0.024,0-0.144,0.24-0.432l12.433-14.569L0,0.96c0-0.264,0-0.72,0.024-0.792   C0.096,0.024,0.12,0,0.672,0h28.371l2.904,6.745h-0.6C30.531,4.8,28.898,3.72,28.298,3.336c-1.896-1.2-3.984-1.608-5.28-1.8   c-0.216-0.048-2.4-0.384-5.617-0.384H4.248l11.185,15.289c0.168,0.24,0.168,0.312,0.168,0.36c0,0.12-0.048,0.192-0.216,0.384   L3.168,31.515h14.474c4.608,0,6.96-0.624,7.464-0.744c2.76-0.72,5.305-2.352,6.241-4.848h0.6l-2.904,7.681H0.672z", operatorShape = new kity.Path(pathData).fill("black"), opBgShape = new kity.Rect(0, 0, 0, 0).fill("transparent"), group = new kity.Group(), opRenderBox = null;
            group.addShape(opBgShape);
            group.addShape(operatorShape);
            operatorShape.scale(1.6);
            this.addOperatorShape(group);
            opRenderBox = operatorShape.getFixRenderBox();
            if (this.displayType === "inline") {
                operatorShape.translate(5, 15);
                opBgShape.setSize(opRenderBox.width + 10, opRenderBox.height + 25);
            } else {
                operatorShape.translate(2, 5);
                opBgShape.setSize(opRenderBox.width + 4, opRenderBox.height + 8);
            }
            return group;
        }
    });
});
/**
 * Created by hn on 13-12-3.
 */
define("signgroup", [ "kity", "def/gtype" ], function(require, exports, module) {
    var kity = require("kity"), GTYPE = require("def/gtype");
    return kity.createClass("SignGroup", {
        base: kity.Group,
        constructor: function() {
            this.callBase();
            this.box = new kity.Rect(0, 0, 0, 0);
            this.type = GTYPE.UNKNOWN;
            this.addShape(this.box);
            this.zoom = 1;
        },
        setZoom: function(zoom) {
            this.zoom = zoom;
        },
        getZoom: function() {
            return this.zoom;
        },
        setBoxSize: function(w, h) {
            return this.box.setSize(w, h);
        },
        setBoxWidth: function(w) {
            return this.box.setWidth(w);
        },
        setBoxHeight: function(h) {
            return this.box.setHeight(h);
        },
        getType: function() {
            return this.type;
        },
        getBaseHeight: function() {
            return this.getHeight();
        },
        getBaseWidth: function() {
            return this.getWidth();
        },
        addedCall: function() {}
    });
});

/**
 * 模块暴露
 */

( function ( global ) {

    var oldGetRenderBox = kity.Shape.getRenderBox;

    kity.extendClass(kity.Shape, {
        getFixRenderBox: function () {
            return this.getRenderBox( this.container.container );
        }
    });

    define( 'kf.start', function ( require ) {

        global.kf = {

            // base
            Formula: require( "formula" ),
            Operator: require( "operator/operator" ),

            // expression
            Expression: require( "expression/expression" ),
            CompoundExpression: require( "expression/compound" ),
            TextExpression: require( "expression/text" ),
            EmptyExpression: require( "expression/empty" ),
            CombinationExpression: require( "expression/compound-exp/combination" ),
            FunctionExpression: require( "expression/compound-exp/func" ),

            FractionExpression: require( "expression/compound-exp/binary-exp/fraction" ),
            IntegrationExpression: require( "expression/compound-exp/integration" ),
            RadicalExpression: require( "expression/compound-exp/binary-exp/radical" ),
            ScriptExpression: require( "expression/compound-exp/script" ),
            SuperscriptExpression: require( "expression/compound-exp/binary-exp/superscript" ),
            SubscriptExpression: require( "expression/compound-exp/binary-exp/subscript" ),
            SummationExpression: require( "expression/compound-exp/summation" ),

            // Brackets expressoin
            BracketsExpression: require( "expression/compound-exp/brackets" )

        };

    } );

    // build环境中才含有use
    try {
        use( 'kf.start' );
    } catch ( e ) {
    }

} )( this );
})();
