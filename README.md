# pkglist-cli

This package is a CLI for working with the [pkglist][1] format.

The CLI provides the following commands:

- `exec` parses a pkglist file and runs an install script for all selected packages.
- `parse` parses a pkglist file and returns the packages installable by the selected package manager,

## Supported Package Managers

The pkglist format uses "prefixes" to determine which package manager should be used to install a package.
The prefixes supported by this CLI are:

| Package Manager              | Prefix       | Supports Multi-package Installs? |
|------------------------------|--------------|----------------------------------|
| APT                          | apt          | yes                              |
| Add APT Repository           | apt-repo     | no                               |
| Flatpak                      | flatpak      | no                               |
| Snap (default install mode)  | snap         | no                               |
| Snap (classic install mode*) | snap-classic | no                               |

*: Classic install mode escapes Snap's package sandbox and is required by some packages. 

## Usage

### exec

The `exec` command is the most important command offered by this CLI and provides a simple way to work with pkglist files.

Run `exec` to install all the packages in the provided pkglist file that can be installed with the selected package managers.

```shell
# reading from a file
pkglist exec ./path/to/file.pkglist --prefix apt --prefix snap

# or from stdin
echo "apt firefox" | pkglist exec - --prefix apt
```

The file path (or `-` to read from stdin) must be provided as the first positional argument.

The `--prefix` argument must be provided, and can be provided multiple times.


#### Options

The `exec` command supports a few options:

- `--yes`: reduces the need for user interaction during installation by using the package managers non-interactive option, if one exists.
- `--sudo`: Executes all installs with 'sudo'.
- `--dry`: Executes a dry run and outputs the command that would be executed without `--dry`.

#### Notes

**sudo**: Some package managers require installs to be made with 'sudo', whilst others don't like it.
It is up to the user to determine if `--sudo` should be used.

**Multi-package installs**: Some package managers' install commands support installing multiple packages at once.
Others do not.
Where a package manager supports installing multiple packages at once, a single install command will be executed.
Where a package manager does not support installing multiple packages at once, a separate install command will be executed for each package.

### parse

The `parse` command is used to get all package entries, with the selected prefix, from a pkglist:

```shell
# reading from a file
pkglist parse ./main.pkglist --prefix apt

# or from stdin
cat ./main.pkglist | pkglist parse - --prefix apt
```

The file path (or `-` to read from stdin) must be provided as the first positional argument.

The `--prefix` argument must be provided.
Unlike with the `exec` command, it can only be provided once.

#### Options

The `parse` command support a few options:

- `--sort`: Sorts the package list alphabetically.
- `--uniq`: Deduplicates the returned package list.
- `-1`: (The numeric digit “one”.) Force output to be one entry per line.

## Advanced Usage

The `parse` and `exec` commands can be piped together to enable more advanced workflows.

```shell
export PREFIX="flatpak"
cat ./path/to/file.pkglist \
  | pkglist parse - --sort --uniq -1 --prefix $PREFIX \
  | sed -i 's/{flathub.org}/{myflathubmirror.intranet}/g'
  | pkglist exec - --prefix $PREFIX
```

## Documentation & Manpage

Execute `pkglist --help` to see the help text / manpage for this CLI.

## Author & Licence

The [pkglist specification][1] and this program were both created by [@jamescallumyoung](https://github.com/jamescallumyoung).

Contributions to this project are welcome.

© 2024 by James Young and licensed under [Apache-2.0](https://www.apache.org/licenses/LICENSE-2.0.txt). 

[1]: https://github.com/jamescallumyoung/pkglist-spec
