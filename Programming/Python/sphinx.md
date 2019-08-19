# Generating documentation with Sphinx

<!-- TOC -->

- [Generating documentation with Sphinx](#generating-documentation-with-sphinx)
    - [Flow](#flow)
    - [reStructured Text](#restructured-text)
    - [API Doc](#api-doc)
    - [Alternate way](#alternate-way)
- [Linking to Pyton constructs](#linking-to-pyton-constructs)

<!-- /TOC -->

```bash
$ pip install sphinx

# on the macOS
$ xcode-select --install

$ sphinx-quickstart
# Generates the _build _static and _templates folders

# index.rst contains reStructured Text that is consumed by Sphinx to generate docs. 
$ make html
$ make clean html
```

Host html in `readthedocs.org`.

## Flow
1. Create a `docs/` folder
1. Run `sphinx-quickstart` and all other commands from there to generate docs.

## reStructured Text
* :: on lines preceding code samples
* `Link<https://tosomewhere.com>`_
* .. comments

## API Doc
Extract docstrings from Python code to generate documentation.

Linking to other methods inside docstrings:
```
:meth:`run`
:meth:`gamedemo.player.Player.take_hit`
```

Adding reStructured text inside your docstring descriptions
```python
class Player:
    """
    The Player class that represents a character.

    :ivar health: the current health
    """
    def __init__(self, name, weapon):
        """
        Create new player
        :param player1: First player
        :param player2: Second player
        """
        self.name = name
        self.weapon = weapon
        self.health = 100
    
    def take_hit(self, damage):
        """
        This method does bla bla
        :param damage: Damage dealt. subtracts from :attr:`health`.
        :return: the new value for :attr:`health`
        """
        self.health -= damage
        return self.health
```
Don't forget to add docstring to document packages in `__init__.py`

Run one level up from `docs/`:
```
sphinx-apidoc -o docs gamedemo/ 
```

Replace the table of contents in `index.rst`:
`.. include:: modules.rst`

Update `conf.py`

```python
import os
import sys
sys.path.insert(0, os.path.abspath('..'))

extensions = [
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
]
```

Then: `$ make clean html`

## Alternate way
```bash
$ sphinx-apidoc -o docs mypackage

# get help
$ sphinx-apidoc --help

# generate all from scratch, no need to sphinx-quickstart:
$ sphinx-apidoc --full -o docs mypackage
```

# Linking to Pyton constructs
```
:class:`Player`
:class:`gamedemo.Player`

:meth:`Weapon.attack`
:func:`mymodule.func`
:module:`mymodule`
```
