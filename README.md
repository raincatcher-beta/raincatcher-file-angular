# FeedHenry RainCatcher file [![Build Status](https://travis-ci.org/feedhenry-raincatcher/raincatcher-file-angular.png)](https://travis-ci.org/feedhenry-raincatcher/raincatcher-file-angular)

A module for FeedHenry RainCatcher that manages files. It provides :
- Backend services that expose REST endpoints to create and read operations for files .
- Frontend directives and services providing a REST client for files.

## Client-side usage (via broswerify)

### Setup
This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript
angular.module('app', [
, require('fh-wfm-file')
...
])
```

### Integration

#### Angular Services

This module provides a injectable file service : `fileClient`

Example of `read` usage :

```javascript
resolve: {
      files: function(fileClient, profileData) {
        return fileClient.list(profileData.id);
      }
    }
```
Example of `upload` usage :

```javascript
camera.capture()
      .then(function(dataUrl) {
        return fileClient.uploadDataUrl(profileData.id, dataUrl)
      });
```

For a more complete example around files operations, please check the [demo mobile app](https://github.com/feedhenry-raincatcher/raincatcher-demo-mobile/blob/master/src/app/file/file.js).

#### Directives

| name    	| wfm-img                             	|
|---------	|-------------------------------------	|
| purpose 	| retrieves image file from the cloud 	|
| args    	| uid of the file                     	|
| example 	| ```<img wfm-img uid="ctrl.file.uid" style="width:450px">```                            	|



| name    	| file-detail                          	|
|---------	|-------------------------------------	|
| purpose 	| presents file details as a list, takes options to select which details it will show. 	|
| args    	| `file`: file object, `display-options`: array of file attributes e.g. ```self.displayOptions = {id: true, name: true, uid: true, owner: true, preview: true};```
                    	|
| example 	| ```<file-detail file="ctrl.file" display-options="ctrl.displayOptions"></file-detail>```                            	|
