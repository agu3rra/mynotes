# Making resources accessible on packages

use the *pkg_resources* which is distributed with setuptools:

When using the resource within another module of the package:
```python
from pkg_resources import resource_filename
filepath = resource_filename('yourpackage', 'folder/thefile')
```

If using it inside the `yourpackage.__init__`:
```python
from pkg_resources import resource_filename
filepath = resource_filename(__name__, 'folder/thefile')
```
