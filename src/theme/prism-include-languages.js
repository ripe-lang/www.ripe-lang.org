export default function prismIncludeLanguages(Prism) {
  Prism.languages.ripe = {
    comment: {
      pattern: /#.*/,
    },
    string: {
      pattern: /"(?:[^"\\]|\\.)*"/,
      greedy: true,
      inside: {
        interpolation: {
          pattern: /\{[^}]*\}/,
          inside: {
            punctuation: /[{}]/,
          },
        },
      },
    },
    "char-literal": {
      pattern: /'(?:[^'\\]|\\.)'/,
      alias: "string",
    },
    keyword:
      /\b(?:import|let|var|if|else|while|for|in|match|ok|err|return|struct|interface|on|pub|extern|inline|defer|type|sizeof|as|true|false|panic|break|continue)\b/,
    builtin: {
      pattern:
        /\b(?:i8|i16|i32|i64|u8|u16|u32|u64|f32|f64|bool|str|char|rawptr|cstr|isize|usize)\b/,
      alias: "class-name",
    },
    function: /\b[a-zA-Z_][a-zA-Z0-9_]*(?=\s*[\[({])/,
    number: /\b(?:0x[\da-fA-F]+|\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/,
    operator: /\.\.\.?|->|=>|[+\-*/%&|^~<>]=?|[!=]=|[@^?!]/,
    punctuation: /[{}[\]();,.]/,
  };
}
