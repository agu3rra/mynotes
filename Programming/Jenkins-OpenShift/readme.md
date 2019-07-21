# Using Jenkins with OpenShift
Iniital assumption:
* Jenkins can be used to automate the issuing of oc commands as well as adding unit test commands directly in context with my git source repo.
* Pre-define all of your required OCP resources
* Run the clone and unit tests of your project on Jenkins
* Have Jenkins issue the `oc start-build` command to deploy your app.
* I'd assume Jenkins will require Python in it as well as the oc cli.
* Jenkins slaves are additional agents that can be used to trigger builds and report back to the master. No real need for them in a simple OCP project for which you setup your exclusive Jenkins master.
