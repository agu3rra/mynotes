import subprocess
import webbrowser
import time
import os

def save(what, folder, filename):
    """
    Saves string in what into folder with filename.
    """
    try:
        if not os.path.isdir(folder):
            os.mkdir(folder)
        filename = os.path.join(folder, filename)
        saving = open(filename, 'w')
        saving.write(what)
        saving.close()
    except Exception as e:
        print('[!]There was an error while saving to file:\n{}'.format(e))

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

def open_websites():
    """
    Automatically opens websites in the array websites.
    """
    websites = ['https://www.python.org', 'https://www.kali.org']
    for site in websites:
        webbrowser.open_new_tab(site)
        time.sleep(2) # need to give the UI some time to open each.

def main():
    terminal_results = execute_commands()
    print(terminal_results)

    # Save terminal results
    save(what=terminal_results,
         folder='results',
         filename='results.txt')

    # Open sites
    #open_websites()

if __name__ == '__main__':
    main()

    