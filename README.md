# pkglist-cli

This package is a CLI for working with the [pkglist][1] format.

The CLI provides the following commands:

- `parse` parses a pkglist file and returns the packages installable by the selected package manager,
- `get-script` returns an install script for the selected package manager.
- `exec` parse a pkglist file and run an install script for all selected packages.

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

#### exec

The `exec` command is functionally identical to using `parse` and `get-script` together, but much easier to invoke.
Simply run `exec` to install all the packages in the pkglist file for the selected package managers.

```shell
pkglist exec path/to/file.pkglist --prefix apt --prefix snap --yes

# or from stdin
echo "apt firefox" | pkglist exec - --prefix apt --yes --sudo
```

#### supported prefixes

Supported prefixes are:

- `apt`, for APT.
- `apt-repo`, for APT repositories.
- `flatpak`, for Flatpak.
- `snap`, for Snap (using the default install mode).
- `snap-classic`, for Snap (using the classic install mode).

## Documentation & Manpage

Execute `pkglist --help` to see the help text / manpage for this CLI.

## Author & Licence

The [pkglist specification][1] and this program were both created by [@jamescallumyoung](https://github.com/jamescallumyoung).

Contributions to this project are welcome.

© 2024 by James Young and licensed under [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0.txt). 

[1]: https://github.com/jamescallumyoung/pkglist-spec
