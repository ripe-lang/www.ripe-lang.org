---
sidebar_position: 5
---

# Proposals

This page collects ideas for future additions to Ripe. These ideas may change or never become part of the language.

:::warning
Nothing on this page compiles today.
:::

## Operators

### Operator overloading

<!-- no-check -->

```ripe
struct Vec2 { x: f32, y: f32 }

func +(a: Vec2, b: Vec2) Vec2 {
  return Vec2 { x: a.x + b.x, y: a.y + b.y }
}
```

### Index operator

<!-- no-check -->

```ripe
func [](v: Vec2, i: i32) f32 {
  if i == 0 { return v.x }
  return v.y
}
```

### Call operator

<!-- no-check -->

```ripe
struct Adder { base: i32 }

func ()(a: Adder, x: i32) i32 {
  return a.base + x
}

var add5 = Adder { base: 5 }
add5(3) // 8
```

## Collections

### Dynamic arrays

<!-- no-check -->

```ripe
var xs: [..]i32       // heap backed, grows on demand
array_add(&xs, 42)
remove xs[i]          // unordered O(1) swap remove
```
