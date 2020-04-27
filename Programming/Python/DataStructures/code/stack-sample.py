"""
Stacks are usually more performant than lists, when you simply plan to add and 
consume elements from the end of what would be a list.

regular append() and pop() operations on a list will cause Python to reindex the
entire contents of it, making it an O(n) operation, whereas pushing and poping
from a stack will be O(1).

Flavors of it in Python:
collections.deque
queue.LifoQueue
"""

# Reference: https://www.geeksforgeeks.org/stack-in-python/

print('Stack sample using deque from collections')
from collections import deque
stack = deque()
stack.append('my')
stack.append('simple')
stack.append('stack')

print('This is what the stack looks like:\n{stack}'.format(stack=stack))
print('Now popping...')
for i in range(3):
    print(stack.pop())


# Using the Queue module:
print('Stack using the Queue module')
from queue import LifoQueue
stack = LifoQueue(maxsize=3)
print('The max size of the current stack is: {}'.format(stack.qsize()))
for i in range(3):
    stack.put(i)

print('Is the stack full?\nAns.:{}'.format(stack.full()))
print('Current stack:\n{}'.format(stack))
print('Now popping...')

while not stack.empty():
    print(stack.get())