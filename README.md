# pkglist-cli

This package is a CLI for working with the [pkglist][1] format.

The CLI provides the following commands:

- `parse` parses a pkglist file and returns the packages installable by the selected package manager,
- `get-script` returns an install script for the selected package manager.

## Usage

#### parse

The `parse` command is used to get all package entries, with the selected prefix, from a pkglist:

```shell
# from a file
pkglist parse -p apt ./main.pkglist

# from STDIN
cat ./main.pkglist | pkglist parse -p apt
```

#### get-script

The `get-script` command is used to get a script that may be used to invoke the selected package manager:

```shell
pkglist get-script -p apt
```

The script returned by `get-script` is non-prescriptive; you're welcome to alter it however you want, or to provide your own.

#### combining commands

The `parse` and `get-script` commands can be piped together as follows:

```shell
export PREFIX="apt"
pkglist parse -SUp $PREFIX ./main.pkglist | xargs $(pkglist get-script -p $PREFIX)
```

#### supported prefixes

Supported prefixes are:

- `apt`, for APT.
- `apt-repo`, for APT repositories.
- `flatpak`, for Flatpak.
- `snap`, for Snap (using the default install mode).
- `snap-classic`, for Snap (using the classic install mode).

## Manpage

### `pkglist`

```
pkglist <command>

Commands:
  pkglist parse [file]  Parse a pkglist file for the selected package manager.
  pkglist get-script    Get a script to invoke the selected package manager's
                        install command.

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

### `pkglist parse`

```
pkglist parse [file]

Parse a pkglist file for the selected package manager.

Positionals:
  file  Filepath to a pkglist file. Or "-", to read from stdin.
                                                         [string] [default: "-"]

Options:
      --help            Show help                                      [boolean]
  -p, --prefix          Which prefix should be selected?.    [string] [required]
  -S, --sort            Sort output.                  [boolean] [default: false]
  -U, --uniq, --unique  Make output unique.           [boolean] [default: false]

```

### `pkglist get-script`

```
pkglist get-script

Get a script to invoke the selected package manager's install command.

Options:
      --help    Show help                                              [boolean]
  -p, --prefix  Which prefix should be selected?             [string] [required]
  -y, --yes     Reduce the need for user input by answering yes to any questions
                , or by using a non-interactive mode, if available.
                                                      [boolean] [default: false]
  -s, --sudo    Prefix the output script with "sudo"  [boolean] [default: false]

```

## Author & Licence

The [pkglist specification][1] and this program were both created by [@jamescallumyoung](https://github.com/jamescallumyoung).

Contributions to this project are welcome.

© 2024 by James Young and licensed under [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0.txt). 

[1]: https://github.com/jamescallumyoung/pkglist-spec
