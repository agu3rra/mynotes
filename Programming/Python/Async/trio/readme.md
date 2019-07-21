# Trio: async programming for humans and snake people
https://trio.readthedocs.io/en/latest/

# Objective
Create a program to test an asynchronous call so that I can reuse the concept on a Django API that I am currently developing.

# Stub
* Start the main program thread
* Start one async task that takes 10 seconds to complete.
* Start another async that takes 5 seconds (use the sleep function).
* print "end of main thread" and how much time it took to get there.
* print "end of task 2" using a callback function
* print "end of task 1"
* print elapsed time in total. Expect it to be near 10 seconds.

# Reading the docs
* Only async functions can call other async (or sync) functions.
* regular async functions are usually called using the *await* keyword.
* Trio's run() function is an exception: a synchronous function that is able to call async ones like:
```python
import trio

async def async_double(x):
    return 2*x

trio.run(async_double, 6)
```

* Calling an async function in Python does not raise an error, but it is flawed. `Runtime warning: coroutine <async fn here> was never awaited`.