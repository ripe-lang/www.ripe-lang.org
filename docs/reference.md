---
sidebar_position: 3
---

# Language Features

## 1. Lexical structure

### 1.1. Source files

Ripe source files use UTF-8 and the `.rp` extension. A byte order mark is allowed at the beginning of the file but is ignored.

Outside string and character literals Ripe recognizes only ASCII characters and treats spaces, tabs, carriage returns, and line feeds as whitespace.

### 1.2. Comments

A line comment continues to the end of the line while a block comment ends at its matching `*/`. Block comments can be nested.

```ripe
// line comment

/* block comment
   /* nested, closed here */
   still commented
*/
```

A block comment must be closed before the end of the file.

### 1.3. Identifiers

An _identifier_ starts with an ASCII letter or underscore and can continue with letters, digits, or underscores. Identifiers are case sensitive and can be any length.

```ripe
var count: i32 = 0
var _leading: i32 = 0
var trailing_: i32 = 0
var with_digits2: i32 = 0
var CamelCase: i32 = 0
var camelcase: i32 = 0   // distinct from CamelCase
```

A lone `_` discards a value in a binding and matches any value in a pattern.

:::note
The names of the builtin types are ordinary identifiers rather than reserved words so a declaration may shadow `i32` or `str`.
:::

### 1.4. Keywords

The following 26 identifiers are reserved.

|             |          |            |            |
| ----------- | -------- | ---------- | ---------- |
| `as`        | `break`  | `comptime` | `continue` |
| `else`      | `enum`   | `extern`   | `false`    |
| `for`       | `func`   | `if`       | `import`   |
| `in`        | `loop`   | `match`    | `module`   |
| `null`      | `pub`    | `return`   | `sizeof`   |
| `struct`    | `true`   | `type`     | `undefined`|
| `var`       | `while`  |            |            |

### 1.5. Statement termination

A semicolon or newline ends a statement.

A newline terminates a statement when the preceding token can end one. The tokens that can end a statement are an identifier, a literal, `true`, `false`, `null`, `undefined`, `break`, `continue`, `return`, `_`, and the closing delimiters `)`, `}`, and `]`. After any other token a newline isn't a terminator and the expression continues onto the following line.

```ripe
var total = 1 +
  2 +
  3
```

A semicolon ends a statement wherever it appears. This lets you write several statements on one line. However semicolons are **NOT** required.

```ripe
var a: i32 = 1; var b: i32 = 2;
a += b;
```

Starting a new line with a binary operator is an error when the previous line ended a statement. After a semicolon the operator begins a separate expression instead.

### 1.6. Integer literals

An integer literal is decimal by default while the prefixes `0x`, `0b`, and `0o` produce hexadecimal, binary, and octal literals. You can use underscores after the first digit to make a literal easier to read but an underscore can't immediately follow a base prefix.

```ripe
var decimal = 42
var hexadecimal = 0xff_ff
var binary = 0b1010
var octal = 0o17
var separated = 1_000_000
```

A literal suffix sets its type and can be `i8`, `i16`, `i32`, `i64`, `isize`, or an unsigned counterpart.

```ripe
var byte = 255u8
var large = 9000000000i64
var octal = 0o17i32
```

A suffix fixes the literal's type but still allows implicit widening.

### 1.7. Float literals

A float literal contains a fraction or exponent and can also use an `f32` or `f64` suffix. A fractional form needs at least 1 digit on each side of the point so `1.` and `.5` aren't float literals.

```ripe
var fraction = 1.5
var exponent = 1e10
var separated = 1_000.000_1
var single = 1.5f32
var double = 1e3f64
```

### 1.8. String literals

A _string literal_ contains UTF-8 text and can use escape sequences to insert special byte values. There are currently 4 supported escapes. Any other character after a backslash is an error.

| Escape | Byte   |
| ------ | ------ |
| `\n`   | `0x0A` |
| `\t`   | `0x09` |
| `\\`   | `0x5C` |
| `\"`   | `0x22` |

```ripe
var text: cstr = "line one\nline two\tend\\\"quoted\""
```

A string literal defaults to `cstr` but becomes `str` where `str` is expected. A `cstr` ends with a zero byte while a `str` stores its length.

A string literal can span lines and include the line breaks in its value.

### 1.9. Character literals

A _character literal_ contains 1 Unicode scalar value and has type `char`.

The text between the delimiters must contain exactly 1 Unicode scalar value. A literal containing more than one is an error so `'ab'` is rejected while `'é'` is accepted. The value occupies 2 bytes in the source and 4 bytes in memory.

Scalar values range from `0x0` to `0x10FFFF` excluding the surrogates `0xD800` to `0xDFFF`.

| Escape | Value    |
| ------ | -------- |
| `\0`   | `U+0000` |
| `\n`   | `U+000A` |
| `\t`   | `U+0009` |
| `\\`   | `U+005C` |
| `\'`   | `U+0027` |

```ripe
var letter = 'a'
var newline = '\n'
var backslash = '\\'
var quote = '\''
var zero = '\0'
```

## 2. Types

### 2.1. Integer types

| Type    | Size | Align | Range                                       |
| ------- | ---- | ----- | ------------------------------------------- |
| `i8`    | 1    | 1     | -128 to 127                                 |
| `i16`   | 2    | 2     | -32768 to 32767                             |
| `i32`   | 4    | 4     | -2147483648 to 2147483647                   |
| `i64`   | 8    | 8     | -9223372036854775808 to 9223372036854775807 |
| `u8`    | 1    | 1     | 0 to 255                                    |
| `u16`   | 2    | 2     | 0 to 65535                                  |
| `u32`   | 4    | 4     | 0 to 4294967295                             |
| `u64`   | 8    | 8     | 0 to 18446744073709551615                   |
| `isize` | 8    | 8     | as `i64`                                    |
| `usize` | 8    | 8     | as `u64`                                    |

A signed integer uses two's complement. The `isize` and `usize` types have the same size as a pointer and are used for offsets, sizes, and indices. The names `int` and `float` are aliases for `i64` and `f64`.

### 2.2. Float types

| Type  | Size | Align | Format            |
| ----- | ---- | ----- | ----------------- |
| `f32` | 4    | 4     | IEEE 754 binary32 |
| `f64` | 8    | 8     | IEEE 754 binary64 |

### 2.3. Boolean and character types

| Type   | Size | Align | Values                 |
| ------ | ---- | ----- | ---------------------- |
| `bool` | 1    | 1     | `true`, `false`        |
| `char` | 4    | 4     | 1 Unicode scalar value |

### 2.4. Text types

| Type   | Size | Align | Representation                             |
| ------ | ---- | ----- | ------------------------------------------ |
| `cstr` | 8    | 8     | pointer to a zero terminated byte sequence |
| `str`  | 16   | 8     | `{ ptr: *u8, len: usize }`                 |

A `cstr` doesn't store its length because a zero byte marks the end and isn't part of the text.

A `str` carries its length and requires no terminator. Its bytes are UTF-8. The `len` field counts bytes rather than characters or scalar values so the two agree only for ASCII text.

```ripe
var text: str = "héllo"
var bytes = text.len // 6
```

### 2.5. Pointer types

A pointer to `T` is written `*T` and occupies 8 bytes with alignment 8. The `&` operator gets the address of a value while the unary `*` operator accesses the value at an address. You can use `.` to access a field through either a struct or a pointer to one.

```ripe
var value: i32 = 10
var pointer: *i32 = &value
*pointer = 42
```

A `*opaque` doesn't specify the type of the value it points to. Convert it to a concrete pointer type before dereferencing it.

```ripe
extern "C" func malloc(size: usize) *opaque
extern "C" func free(ptr: *opaque)

func main() i32 {
  var pointer = malloc(64)
  var byte = pointer as *u8
  *byte = 42
  free(pointer)
  return 0
}
```

The literal `null` is the null pointer. It converts to any pointer type and compares with `==` and `!=`.

```ripe
var pointer: *i32 = null
var is_null = pointer == null
```

### 2.6. Array types

An _array_ of N values with type `T` is written `[N]T` and stores its elements next to each other in memory. Its length must be known at compile time and is part of the type so `[3]i32` and `[4]i32` are different types.

An array has the same alignment as its elements. Ripe stores every element at the next properly aligned address.

The field `.len` yields the length as a `usize` and is known at compile time.

```ripe
var values: [3]i32 = [4, 5, 6]
var matrix: [2][2]i32 = [[1, 2], [3, 4]]
matrix[1][0] = 7
```

### 2.7. Slice types

A _slice_ of values with type `T` is written `[]T` and occupies 16 bytes with alignment 8. It stores a pointer and a run time length as `{ ptr: *T, len: usize }` and refers to elements it doesn't own.

An array converts to a slice of the same element type wherever a slice is expected. The slice refers to the storage of the array rather than copying it. A write through either is visible through the other.

```ripe
var array: [3]i32 = [4, 5, 6]
var slice: []i32 = array
slice[0] = 99 // array[0] is now 99
```

You can write the same conversion explicitly as `a[..]`. Both forms produce the same slice.

```ripe
sum(a)         // whole array
sum(a[..])     // same slice, written out
sum(a[1..3])   // elements 1 and 2
```

A slice begins at 0 when you omit the lower bound. It extends to the end when you omit the upper bound. The `..` operator excludes the upper bound while `..=` includes it.

```ripe
var array: [4]i32 = [10, 20, 30, 40]
var whole = array[..]  // 4 elements
var to = array[..2]    // elements 0 and 1
var upto = array[..=2] // elements 0 through 2
var from = array[2..]  // elements 2 and 3
var middle = array[1..3] // elements 1 and 2
```

The field `.len` yields the length as a `usize` and `.ptr` the address of the first element.

### 2.8. Struct types

A _struct_ contains an ordered set of named fields. Assignment and passing it to a function both copy the struct.

```ripe
struct point { x: i32, y: i32 }
```

A struct's fields stay in declaration order with padding added for alignment. A struct uses the largest alignment of its fields and its padding has unspecified contents.

An empty struct has size 0 and alignment 1.

#### 2.8.1. Struct literals

A struct literal names the type followed by its field values.

```ripe
var value = point { x: 3, y: 4 }
var copy = value
```

:::note
Struct literals currently require field names so `point { 4, 5 }` isn't supported.
:::

### 2.9. Enum types

:::warning Temporary
Enums are an unfinished first version. Their layout and behavior may change.
:::

An _enum_ currently defines a distinct type with named variants that can't store additional data.

```ripe
enum Color { Red, Green, Blue }
var color = Color.Green
```

### 2.10. Function types

A function pointer occupies 8 bytes with alignment 8. Its type records the calling convention so a pointer to a C function isn't interchangeable with a pointer to a Ripe function.

```ripe
func inc(x: i32) i32 { return x + 1 }

func apply(fn: func (i32) i32, v: i32) i32 { return fn(v) }

func apply_c(fn: extern "C" func (i32) i32, v: i32) i32 { return fn(v) }
```

### 2.11. Type aliases

A `type` declaration introduces a second name for an existing type. The two names denote the same type and are interchangeable.

```ripe
type byte = u8
```

### 2.12. Unit

The type `()` has exactly one value which is also written `()`. It has size 0 and alignment 1. An empty block has type `()` and produces this value.

```ripe
var value: () = ()
```

A function parameter or return value of type `()` requires no storage at runtime.

### 2.13. never

The type `never` is the return type of a function that never returns to its caller. It has no size or values and code after a call to such a function is unreachable.

```ripe
extern "C" func exit(code: i32) never
```

## 3. Declarations

### 3.1. Bindings

A `var` binding can change while a `comptime` binding is evaluated during compilation and uses no storage at run time.

The type annotation is optional in every position including at file scope. When omitted the type is taken from the initializer.

```ripe
var limit = 100
var counter = 0
comptime N = 3
var values: [N]i32 = undefined
```

A `comptime` binding without an initializer is an error, and so is a `var` binding with neither an annotation nor an initializer, since nothing would determine its type.

:::note
`comptime` currently supports only integers, floats, bools, and chars. Its initializer must be constant. Named array lengths must use `comptime`.
:::

### 3.2. Initialization

A `var` binding without an initializer is zero initialized, every byte of its storage set to zero. The initializer `undefined` suppresses that initialization and leaves the storage with whatever it previously held.

```ripe
var counter: i32 // zero
var buffer: [64]u8 = undefined // unspecified contents
```

:::warning
Reading `undefined` storage before writing to it returns an unspecified value without a compiler error.
:::

### 3.3. Globals

A binding declared outside a function is a _global_ that exists for the entire program. Every function in the module uses the same storage location.

```ripe
var counter = 5
var limit: i32 = 100

func bump() { counter += 3 }

func main() i32 {
  bump()
  bump()
  return counter + limit // 111
}
```

A global initializer must fold to a constant so it can't call a function or read another mutable global. Division or remainder by zero inside one is a compile error rather than a run time panic.

<!-- no-check -->

```ripe
func side() i32 { return 1 }

var bad = side()   // error: initializer must be constant
var worse = 1 / 0  // error: division by zero in constant
```

### 3.4. Local declarations

Structs, type aliases, enums, and functions may be declared inside a block. These declarations are visible only within that block.

```ripe
func distance() i32 {
  struct Point { x: i32, y: i32 }
  type Coord = i32
  enum Axis { X, Y }

  func add(left: Coord, right: Coord) Coord {
    left + right
  }

  var point = Point { x: 3, y: 4 }
  var axis = Axis.X
  if axis == Axis.X { add(point.x, point.y) } else { 0 }
}
```

### 3.5. Functions

The return type comes after the parameter list. A function with no written return type returns `()`. A bare `return` returns `()` and reaching the end of the function does the same.

A block whose final statement is an expression yields that expression so an explicit `return` isn't required. This applies to every block rather than only to function bodies because `if`, `loop`, and a bare block are all expressions.

```ripe
func add(a: i32, b: i32) i32 { return a + b }

func square(x: i32) i32 { x * x }

func abs(x: i32) i32 {
  if x < 0 { -x } else { x }
}

func explicit() () { () }
```

## 4. Expressions

### 4.1. Untyped literals

A numeric literal gets its type from the surrounding context but without that context an integer literal defaults to `i32` and a float literal defaults to `f64`.

```ripe
func take(x: u8) i32 { return x }

var byte: u8 = 255
var fraction: f32 = 1
var inferred = byte + 1
var argument = take(1)
```

An integer literal is exact. A context whose type can't represent the value is an error rather than a truncation. A float literal is inexact and rounds to the nearest representable value because no binary floating point type represents every decimal fraction.

<!-- no-check -->

```ripe
var a: u8 = 300           // error: doesn't fit in u8
var b: f32 = 16777217     // error: not representable in f32
var c: f32 = 16777217.0   // accepted, rounds
```

### 4.2. Operator precedence

An operator binds from highest to lowest as listed. Operators on one row have equal precedence.

| Operators                                                | Associativity |
| -------------------------------------------------------- | ------------- |
| `a.b` `a[i]` `f(x)`                                      | left          |
| `!` `-` `+` `~` `&` `*` prefix                           | right         |
| `as`                                                     | left          |
| `*` `/` `%`                                              | left          |
| `+` `-`                                                  | left          |
| `<<` `>>`                                                | left          |
| `&`                                                      | left          |
| `^`                                                      | left          |
| `\|`                                                     | left          |
| `==` `!=` `<` `>` `<=` `>=`                              | none          |
| `&&`                                                     | left          |
| `\|\|`                                                   | left          |
| `..` `..=`                                               | none          |
| `=` `+=` `-=` `*=` `/=` `%=` `&=` `\|=` `^=` `<<=` `>>=` | right         |

Comparison and range operators can't be chained. Expressions such as `a < b < c` and `a .. b .. c` are errors.

:::note
The bitwise operators bind more tightly than comparison unlike C so `a & b == c` groups as `(a & b) == c`.
:::

### 4.3. Operators

| Operator          | Operands  | Result                      |
| ----------------- | --------- | --------------------------- |
| `+` `-` `*` `/`   | numeric   | same type                   |
| `%`               | integer   | same type                   |
| `==` `!=`         | scalar    | `bool`                      |
| `<` `>` `<=` `>=` | numeric   | `bool`                      |
| `&&` `\|\|`       | `bool`    | `bool`                      |
| `!`               | `bool`    | `bool`                      |
| `&` `\|` `^` `~`  | integer   | same type                   |
| `<<` `>>`         | integer   | type of the left operand    |
| `&x`              | any place | pointer to the operand type |
| `*p`              | pointer   | the referent                |
| `..` `..=`        | integer   | range                       |

The operators `&&` and `||` short circuit. The right operand isn't evaluated when the left determines the result.

Every binary arithmetic and bitwise operator has a compound assignment form with the same behavior as the regular form.

Without an expected result type mixed numeric operands use whichever operand type can represent the other. This doesn't depend on operand order and never invents a third type.

```ripe
var value: i32 = 100
value += 2
value &= 3
value <<= 2
```

A parallel assignment lets you exchange two values in one statement.

```ripe
var a: i32 = 1
var b: i32 = 2
a, b = b, a
```

### 4.4. Arithmetic

Integer arithmetic wraps on overflow. Ripe reduces the mathematical result modulo 2ⁿ for a type of n bits, then reads that back in the type's range.

| Expression           | Result        |
| -------------------- | ------------- |
| `127i8 + 1`          | `-128`        |
| `255u8 + 1`          | `0`           |
| `2147483647i32 + 1`  | `-2147483648` |
| `100000i32 * 100000` | `1410065408`  |
| `-(-2147483648i32)`  | `-2147483648` |

Division truncates toward zero and remainder takes the sign of the dividend so `-7 % 3` is `-1` and `7 % -3` is `1`. The quotient `INT_MIN / -1` would overflow, so instead of trapping it just wraps to `INT_MIN`, and `INT_MIN % -1` comes out `0`. Ripe gets there by checking for a `-1` divisor and skipping the division so neither one ever traps.

| Expression              | Result        |
| ----------------------- | ------------- |
| `(-2147483648i32) / -1` | `-2147483648` |
| `(-2147483648i32) % -1` | `0`           |

Floating point arithmetic follows IEEE 754. Division by zero yields an infinity and `0.0 / 0.0` yields a NaN. A NaN compares unequal to everything including itself so `x == x` is `false` for a NaN and `x != x` is `true`.

### 4.5. Shifts

The result of a shift has the type of its left operand while the right operand can use any integer type. A right shift on a signed value is _arithmetic_ and propagates the sign bit while a right shift on an unsigned value is _logical_ and shifts in zeros.

The shift count has no upper limit. A shift behaves as if the left operand were shifted one place at a time for as many places as the count so a count at or past the width of the left operand shifts every bit out.

| Expression      | Result |
| --------------- | ------ |
| `1i32 << 32`    | `0`    |
| `1i64 << 64`    | `0`    |
| `(-8i32) >> 32` | `-1`   |
| `8i32 >> 32`    | `0`    |
| `8u32 >> 32`    | `0`    |

A right shift of a negative signed value therefore settles at `-1` rather than `0` because the sign bit propagates. Ripe only bothers checking for a negative shift count when the right operand's type is signed, since an unsigned count can never go negative in the first place.

:::note
The count isn't reduced modulo the width which is what x86 does natively so `1i64 << 64` is `0` rather than `1`.
:::

### 4.6. Conversions

Ripe implicitly widens a numeric value when the destination type can represent every value of the source type. Signed widens to larger signed, unsigned widens to larger unsigned or signed, and `f32` widens to `f64`. There is one caveat, a change between two types of equal width or a change from integer to float never counts as widening even when it seems like it should.

Inference picks the smallest integer type that can represent both operands, so `i32 + u32` produces `i64`, and fails when no type can represent both.

Every other conversion needs `as`, which isn't checked. You can also write `as` for a widening conversion even though it isn't required.

```ripe
var byte: u8 = 200
var wide: u32 = byte
var signed: i16 = byte
var precise: f64 = 1.5f32
```

| From             | To               | Result                           |
| ---------------- | ---------------- | -------------------------------- |
| integer          | narrower integer | truncates and keeps the low bits |
| signed integer   | wider integer    | sign extends                     |
| unsigned integer | wider integer    | zero extends                     |
| float            | integer          | truncates toward zero            |
| integer          | float            | rounds to nearest                |
| `f64`            | `f32`            | rounds to nearest                |
| `char`           | integer          | the scalar value                 |
| `*opaque`        | pointer          | reinterprets                     |

```ripe
var fraction: f64 = 2.9
var integer = fraction as i32 // 2

var large: i64 = 300
var byte = large as u8 // 44
```

:::warning
A float to integer conversion is **unspecified** when the value is out of range for the destination or is a NaN or an infinity. The current implementation yields the destination type's minimum value in every such case which is the x86 integer indefinite result. Do not rely on this.
:::

### 4.7. sizeof

The `sizeof` operator gives the size of a type in bytes as an untyped integer. It takes its type from the surrounding context, or defaults to `usize` with no context.

```ripe
extern "C" func malloc(n: u64) *opaque

struct pt { x: i32, y: i32 }

var explicit: u64 = sizeof(pt)
var inferred = sizeof(pt) // usize
var pointer = malloc(sizeof(pt))
```

| Type            | Size                           | Align                |
| --------------- | ------------------------------ | -------------------- |
| `*T`, `*opaque` | 8                              | 8                    |
| `[]T`           | 16                             | 8                    |
| `[N]T`          | `N` × the aligned element size | align of `T`         |
| `func (...) T`  | 8                              | 8                    |
| `struct`        | see [2.8](#28-struct-types)    | greatest field align |
| `enum`          | 4                              | 4                    |
| `()`            | 0                              | 1                    |

The type `never` has no size because no value of that type exists.

### 4.8. Evaluation order

Ripe evaluates the operands of a binary operator left to right, the arguments of a call left to right, and the right hand sides of a parallel assignment left to right before either assignment takes effect.

The operators `&&` and `||` are the only ones that may leave an operand unevaluated.

## 5. Statements

### 5.1. Conditionals

The condition isn't parenthesized and must have type `bool`. The braces are required.

An `if` is an expression. When both branches are present and yield values of the same type the `if` yields that type.

```ripe
if value < 0 {
  negative()
} else if value == 0 {
  zero()
} else {
  positive()
}

var sign = if value < 0 { -1 } else { 1 }
```

### 5.2. Loops

A `while` loop checks its condition before each iteration.

A `for` loop works with a range, an array, or a slice. Over a range the `..` operator excludes the upper bound while `..=` includes it. Over an array or slice `for` binds each element in turn rather than an index.

```ripe
while ready() {
  work()
}

for i in 0..10 { visit(i) }
for i in 0..=10 { visit(i) }

var values: [3]i32 = [4, 5, 6]
for value in values { visit(value) }
```

A `loop` repeats until control leaves it and is also an expression. A `break` with an operand uses that operand as the value of the loop.

```ripe
var answer = loop {
  if ready() {
    break 42
  }
}
```

### 5.3. Labels

A label appears before the loop it names. Both `break` and `continue` can use a label to select a loop other than the innermost one.

```ripe
outer: for i in 0..4 {
  for j in 0..4 {
    if j == 2 { continue :outer }
    if i == 3 { break :outer }
  }
}
```

### 5.4. Pattern matching

Ripe tests match arms in order and uses the first matching arm.

A bare identifier pattern binds the scrutinee and matches unconditionally, while a dotted path pattern names a constant and matches by equality. `_` also matches unconditionally, but it binds nothing.

```ripe
enum Color { Red, Green, Blue }

func code(c: Color) i32 {
  return match c {
    Color.Red => 10,
    Color.Green => 20,
    Color.Blue => 30,
  }
}

func classify(n: i32) i32 {
  return match n {
    0 => -1,
    other => other * 2,
  }
}
```

:::warning
Ripe doesn't check arms for exhaustiveness. A scrutinee matching no arm yields an unspecified result. Include a wildcard arm until exhaustiveness checking exists.
:::

## 6. Modules

### 6.1. Imports

Each file is a module and an `import` names a module by its path. The final part of the path becomes the local name so `math.vector` becomes `vector`.

```ripe title="math/vector.rp"
pub func first() i32 {
  return 1
}
```

```ripe title="main.rp"
import math.vector

func main() i32 {
  return vector.first()
}
```

Ripe locates modules by searching the import path. The `-I` option adds a directory to that path.

### 6.2. Visibility

A declaration is private to its module unless prefixed with `pub`.

```ripe
pub func add(left: i32, right: i32) i32 {
  return left + right
}

pub struct point { x: i32, y: i32 }

pub comptime WIDTH: i32 = 6
pub var TOTAL: i32 = 0
pub type Count = i32
```

Visibility and mutability are independent. A `pub var` is a single storage location that every importing module reads and writes.

An `extern` declaration is always private and can't be marked `pub` so each module declares the foreign symbols it references.

### 6.3. Directory modules

Files in one directory must declare the same `module` clause, which then shares a namespace and a private scope. A declaration without `pub` is visible across those files and not outside them.

```ripe title="shapes/area.rp"
module shapes

pub func area() i32 {
  return width() * height()
}
```

```ripe title="shapes/sides.rp"
module shapes

func width() i32 {
  return 6
}

func height() i32 {
  return 7
}
```

```ripe title="main.rp"
import shapes

func main() i32 {
  return shapes.area()
}
```

A file with no `module` clause is just a module named by its path, and a directory whose files all lack the clause contributes a namespace component only.

## 7. Foreign function interface

An `extern` declaration names a symbol defined outside the program. `"C"` is the only supported ABI. A trailing `...` makes the function variadic.

```ripe
extern "C" func printf(fmt: cstr, ...) i32
extern "C" func strlen(s: cstr) i64

var length = strlen("hello")
printf("%d\n", length)
```

| Ripe                   | C                                          |
| ---------------------- | ------------------------------------------ |
| `i8` `i16` `i32` `i64` | `int8_t` `int16_t` `int32_t` `int64_t`     |
| `u8` `u16` `u32` `u64` | `uint8_t` `uint16_t` `uint32_t` `uint64_t` |
| `isize` `usize`        | `ptrdiff_t` `size_t`                       |
| `f32` `f64`            | `float` `double`                           |
| `bool`                 | `bool`                                     |
| `char`                 | `uint32_t`                                 |
| `cstr`                 | `const char *`                             |
| `*T`                   | `T *`                                      |
| `*opaque`              | `void *`                                   |
| `never`                | a function declared `_Noreturn`            |

Both `str` and slices use 2 words and have no standard C equivalent. You can use them in an `extern` signature but their C representation is unspecified.

Ripe trusts an `extern` declaration and can't detect a signature that doesn't match the real symbol.

The flag `-l` adds a library to the link.
