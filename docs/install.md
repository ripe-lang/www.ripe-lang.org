---
sidebar_position: 2
---

# Install

Ripe doesn't have binary releases yet. You need to build the compiler from source.

## Requirements

The compiler currently supports only Linux x86-64.

The compiler is written in OCaml and requires [opam](https://opam.ocaml.org/doc/Install.html). It uses QBE as its primary backend, included as a git submodule, which you also need to build from source. Ripe uses the system `as` and `cc` commands to assemble and link programs.

## Build

```sh
git clone --recurse-submodules https://github.com/ripe-lang/ripe
cd ripe
make -C vendor/qbe
opam switch create 5.3.0 ocaml.5.3.0
opam install . --deps-only --yes
dune build
export QBE=$PWD/vendor/qbe/qbe
```
