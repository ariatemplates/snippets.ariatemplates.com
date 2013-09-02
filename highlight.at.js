module.exports = function(hljs) {
  return {
    keywords: {
      keyword:
        'in if for while finally var new function do return void else break catch ' +
        'instanceof with throw case default try this switch continue typeof delete ' +
        'let yield ' +
        'Template Library CSSTemplate macro foreach call on set checkDefault section ' +
        'createView CDATA elseif id separator bindRefreshTo inArray inView inFilteredView inSortedView',
      literal:
        'true false null undefined NaN Infinity ' +
        'classpath css hasScript macrolibs texts extends prototype constructor destructor ' +
        'events implements statics publicInterfaceName hasFlowCtrl interface dependencies res wlibs'
    },
    contains: [
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      hljs.C_NUMBER_MODE,
      { //Expresion Evaluator ${ ... }
        className: 'expr',
        begin: '\\${', end: '}',
        contains: [
          hljs.APOS_STRING_MODE,
          hljs.QUOTE_STRING_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          {
            className: 'value',
            begin: '[0-9A-Za-z_.]+'
          }
        ],
        illegal: '\\n'
      },
      { // HTML
        begin: '<', end: '\\/?>',
        subLanguage: 'xml'
      },
      { // regexp container
        begin: '(' + hljs.RE_STARTERS_RE + '|\\b(case|return|throw)\\b)\\s*',
        keywords: 'return throw case',
        contains: [
          hljs.C_LINE_COMMENT_MODE,
          hljs.C_BLOCK_COMMENT_MODE,
          {
            className: 'regexp',
            begin: '/.*?[^\\\\/]/[gim]+'
          }
        ],
        relevance: 0
      },
      {
        className: 'function',
        beginWithKeyword: true, end: '{',
        keywords: 'function',
        contains: [
          {
            className: 'title', begin: '[A-Za-z$_][0-9A-Za-z$_]*'
          },
          {
            className: 'params',
            begin: '\\(', end: '\\)',
            contains: [
              hljs.C_LINE_COMMENT_MODE,
              hljs.C_BLOCK_COMMENT_MODE
            ],
            illegal: '["\'\\(]'
          }
        ],
        illegal: '\\[|%'
      }
    ]
  };
};