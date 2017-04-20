# FeedHenry RainCatcher file [![Build Status](https://travis-ci.org/feedhenry-raincatcher/raincatcher-file-angular.png)](https://travis-ci.org/feedhenry-raincatcher/raincatcher-file-angular)

This module is an Angular JS implementation of Workorders for the Raincatcher project.

## Client-side usage (via broswerify)

### Cordova Requirements

This module requires following cordova plugins to be available:
```
  <plugin name="cordova-plugin-file" spec="~4.2.0" />
  <plugin name="cordova-plugin-file-transfer" spec="~1.5.1" />
  <plugin name="cordova-plugin-camera" spec="~2.3.0" />
```

### Setup

This module is packaged in a CommonJS format, exporting the name of the Angular namespace.  The module can be included in an angular.js as follows:

```javascript
var config = {
  uploadEnabled: false,
  listColumnViewId: "column2",
  mainColumnViewId: "content@app",
  detailStateMount: "app.file.detail"
}

angular.module('app', [
, require('fh-wfm-file-angular')(config)
...
])
```

### Configuration Options

The following configuration options are available for this module:

#### userMode (Required)

Specifies if module should filter images using current user id.

#### uploadEnabled (Required)

Specifies if file upload button should be visible.
    
#### detailStateMount (Required)

Allows to control angular URL for cases when we need to have both list and details (large screens) we need to use nested view (app.file.detail)
    
#### mainColumnViewId (Required)

This is the identifier for the Angular view where the main Fileviews will be rendered.

#### listColumnViewId (Optional)

This is the identifier for the Angular view where the list of Files will be rendered into. This is useful for organising where the lists will be rendered on-screen. If not specified, the lists will be rendered into the `mainColumnViewId`.

### Integration

#### Angular Services (Depreciated)

See section bellow.

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

### File Directives

| name    	| wfm-img                             	|
|---------	|-------------------------------------	|
| purpose 	| retrieves image file from the cloud 	|
| args    	| uid of the file                     	|
| example 	| ```<img wfm-img uid="ctrl.file.uid" style="width:450px">``` 	|



| name    	| file-detail                          	|
|---------	|-------------------------------------	|
| purpose 	| presents file details, takes options to select which details it will show. 	|
| args    	| `file`: file object, `display-options`: array of file attributes e.g. ```self.displayOptions = {id: true, name: true, uid: true, owner: true, preview: true};``` |
| example 	| ```<file-detail file="ctrl.file" display-options="ctrl.displayOptions"></file-detail>```   	|

| name    	| file-list                          	|
|---------	|-------------------------------------	|
| purpose 	| presents list of the files    	|
| example 	| ```<file-list></file-list>```  	|
