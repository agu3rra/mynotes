import time
import webbrowser

class Browser(object):

    def __init__(self, websites):
        """
        Constructor
        :param websites: (array) a list of websites
        """
        self.websites = websites

    def open():
    """
    Automatically opens websites initialized
    """
    for site in self.websites:
        webbrowser.open_new_tab(site)
        time.sleep(2) # need to give the UI some time to open each.

