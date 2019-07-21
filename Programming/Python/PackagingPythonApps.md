# Distributing a PyPi package

Create the `setup.py` file containing project metadata.
```bash
$ python3 setup.py sdist bdist_wheel
$ twine upload dist/*
```