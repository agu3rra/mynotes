import subprocess


class Terminal():

    def __init__(self, commands):
        """
        Prepares the terminal to execute a series of commands
        :param commands: (dict) a list of command names and their OS call
        """
        self.commands = commands

    def run(cmd_name, cmd):
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

    def run_all():
        """
        Executes all initialized commands
        """
        results = ''
        for cmd_name, cmd in commands.items():
            output = run(cmd_name, cmd)