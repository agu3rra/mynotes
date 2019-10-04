import subprocess

# Automate usage of the terminal via Python

def open_terminal(cmd_name, cmd):
    """
    executes the cmd and prints it in the console
    """
    output = 'Executing {}\r\n'.format(cmd_name)
    try:
        output += subprocess.getoutput(cmd)
        output += '\r\n'
    except Exception as e:
        output += str(e)
    output += '-----------------------------\r\n'
    return output

def execute_commands(
    commands={'list_files':'ls',
              'current_directory':'pwd'}):
    """
    Executes the commands in the given input dictionary. Initialized with a
    simple pair of commands for demo purposes.
    :param commands: (dict) a list of keys and commands to execute
    """
    results = ''
    for cmd_name, cmd in commands.items():
        output = open_terminal(cmd_name, cmd)
        results += output
    return results

def main():
    print(execute_commands())

if __name__ == '__main__':
    main()