import os

class Utils():
    def __init__(self):
        self.name = 'static utilities class'

    # Separator lines for the terminal
    separator = '------------------------------------------------------------'
    separator_double = '====================================================='

    # Static values
    reports_folder = 'Reports'
    recon_folder = 'Recon'
    color_red = '\033[31m'
    color_blue = '\033[34m'
    color_purple = '\033[35m'

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