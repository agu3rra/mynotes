"""
This script configures an OWASP ZAP scan using its API
ZAP should be running in daemon mode
"""
import requests


zap_host = "192.168.200.104"
zap_port = "8090"
context_file = "dvwa.context"
policy_file = "high_thres.policy"
api_key = "fidelio"
base_url = "http:\/\/{0}:{1}".format(zap_host, zap_port)

def view_all_rules():
    endpoint="/JSON/ruleConfig/view/allRuleConfigs/?apikey={}".format(
        api_key
    )
    url = "{0}{1}".format(base_url, endpoint)
    return requests.get(endpoint)
