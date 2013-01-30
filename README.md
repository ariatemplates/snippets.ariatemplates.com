snippets.ariatemplates.com
==========================

This is the engine behind all code inclusion in the documentation markdown files located in [ariatemplates/usermanual][usermanual].

This nodejs application is managing 3 different services. All these services are using a Github repository as source, in our case this repository is [ariatemplates/documentation-code][documentation-code].

* **snippets.ariatemplates.com/code/**
 
 `code` is in charge of extracting a file, caching it and returning an html compliant highlighted version of it.

* **snippets.ariatemplates.com/samples/**
 
 `samples` is in charge of extracting a complete sample and launching it in an iframe through the araitemplate sample viewer.

* **snippets.ariatemplates.com/snippets/**

 `snippets` is in charge of extracting a source file. caching it and return a self executable piece of javascript that will embed an highlighted version of it directly in an html page.


How to use it
-------------

### Code

This service is private. It is used internally by the sample viewer, in order to properly highlight the source code files.

### Samples

To insert a sample in your markdown file you just need to embed it in a iframe.

    <iframe class='samples' src='http://snippets.ariatemplates.com/samples/github.com/ariatemplates/documentation-code/samples/templates/templateScripts/clickhandler/'></iframe>

### Snippets

To insert a snippet in your markdown file you just need to write a script tag.

    <script src='http://snippets.ariatemplates.com/snippets/github.com/ariatemplates/documentation-code/snippets/core/beans/SimpleBean.js'></script>

This example will embed the file `snippets/core/beans/SimpleBean.js` located in the repository `ariatemplates/documentation-code` hosted on `github.com`.


How to create a new snippet/sample or update an existing one
------------------------------------------------------------

Any new file, or changes to an existing one should be done in [ariatemplates/documentation-code][documentation-code] repository.

* **Creating a new snippet**
 
 First thing is to check that there is not any existing snippet corresponding to the one you are about to create.

 If not, just create the new file in the correct location (in the `snippets` folder) trying to match at most the category of your new piece of code (core, advanced...).

 Once your new file is created, simply include it in your markdown file using the same script inclusion syntax that the one described above.

* **Creating a new sample**

 To create a new sample, you'll have to create a bunch of new files. A sample is composed of several source files and a desciptor file.

 First create a new folder in the proper location that suits your needs. Your folder has to be located under the `samples` folder.

 Then create the desciptor file:

 	$ touch sample.yaml

 Describe your sample:

```yaml
title: Automatic Refresh
template: samples.templates.refresh.automatic.AutomaticRefresh
description: It shows how the Automatic Refresh works in aria templates.
sources:
- AutomaticRefresh.tpl
- AutomaticRefreshScript.js
- RefreshCSS.tpl.css
data:
     teams:
     - name: 'England'
       score: 0
     - name: 'France'
       score: 0
```

 Push the code! You're done, you can use it in your markdown file using the same iframe inclusion syntax that the one described above.

* **Updating an existing snippet**

 Let's suppose you want to update a snippet because of a change in the api. Because we are maintaining several different versions of the documentation /!\ don't edit the original one !! /!\ .

 Instead just create a new version of this snippets, in the same location with a new name (the simplest new name is to use the same one with a `_1` suffix.

 `snippets/core/beans/SimpleBean.js` => `snippets/core/beans/SimpleBean_1.js`

 Finally simply reference the new version of the snippet in your markdown file using the same script inclusion syntax that the one described above.

 
How to manage it on the server itself
-------------------------------------

The nodejs application run on port `3000` on the server. Then it's proxied by apache to the virtual host [snippets.ariatemplates.com][snippets]

### Location on the server

The application is located in the folder `/srv/www/snippets.ariatemplates.com/`

### Upstart

In case the script would stop due to an unhandled exception, it will be restarted automagically by [Upstart][upstart]. Same story in case the server reboots.

A configuration file has been setup in the system with the following name: `/etc/init/snippets3000.conf`

You can retrieve information of the running deamon at any time from the command line with:

    $ sudo status snippets3000

The deamon can also be started/stopped with the according commands:

	$ sudo start snippets3000
	$ sudo stop snippets3000

### Logs

The application is logging exception that could occur. To see the log, use the following command:

	$ tail -200 /srv/www/snippets.ariatemplates.com/logs/snippets.log

[usermanual]: https://github.com/ariatemplates/usermanual
[documentation-code]: https://github.com/ariatemplates/documentation-code
[snippets]: http://snippets.ariatemplates.com
[upstart]: http://upstart.ubuntu.com/