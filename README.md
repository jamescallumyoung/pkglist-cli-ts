# pkglist-cli-ts

This package is a CLI for working with the [pkglist][1] format.

The CLI provides the following command:

- `parse` parses a pkglist file and returns the packages installable by the selected package manager,

## Usage

The `parse` command is used to get all package entries, with the selected prefix, from a pkglist:

```shell
# from a file
pkglist parse -p apt ./main.pkglist

# from STDIN
cat ./main.pkglist | pkglist parse -p apt
```

#### supported prefixes

Supported prefixes are:

- `apt`, for APT.
- `flatpak`, for Flatpak.
- `snap`, for Snap (using the default install mode).
- `snap-classic`, for Snap (using the classic install mode).

## Manpage

### `pkglist parse`

```
pkglist parse [file]

Parse a pkglist file for the selected package manager.

Positionals:
  file  Filepath to a pkglist file. Or "-", to read from stdin.
                                                         [string] [default: "-"]

Options:
      --version         Show version number                            [boolean]
      --help            Show help                                      [boolean]
  -p, --prefix          Which prefix should be selected?.    [string] [required]
  -S, --sort            Sort output.                  [boolean] [default: false]
  -U, --uniq, --unique  Make output unique.           [boolean] [default: false]
```

## Author & Licence

The [pkglist specification][1] and this program were both created by [@jamescallumyoung](https://github.com/jamescallumyoung).

Contributions to this repository are welcome.

© 2024 by James Young and licensed under [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0.txt). 

[1]: https://github.com/jamescallumyoung/pkglist-spec
