# Device Information

This application demonstrates the usage of `webapis.productinfo`, `webapis.systeminfo` and `webapis.tvinfo` APIs. With these APIs we can get all the information connected to the device like network status or display related data.


## How to use the application

Use TV remote controller to navigate over buttons and press enter to choose category.


## Supported platforms

2015 and newer


### Prerequisites

To use `webapis.productinfo`, `webapis.systeminfo` and `webapis.tvinfo` APIs,

``<script src="$WEBAPIS/webapis/webapis.js"></script>``

should be loaded in `index.html`.


### Privileges and metadata

In order to use `webapis.productinfo`, `webapis.systeminfo` and `webapis.tvinfo` APIs the following privileges and features must be included in `config.xml`:

```xml
    <feature name="http://tizen.org/feature/network.ethernet" />
    <tizen:privilege name="http://tizen.org/privilege/package.info" />
    <tizen:privilege name="http://tizen.org/privilege/application.info" />
```

### File structure

```
DeviceInformation/ - DeviceInformation sample app root folder
│
├── assets/ - resources used by this app
│   │
│   └── JosefinSans-Light.ttf - font used in application
│
├── css/ - styles used in the application
│   │
│   ├── main.css - styles specific for the application
│   └── style.css - style for application's template
│
├── js/ - scripts used in the application
│   │
│   ├── init.js - script that runs before any other for setup purpose
│   ├── keyhandler.js - module responsible for handling keydown events
│   ├── logger.js - module allowing user to register logger instances
│   ├── main.js - main application script
│   ├── navigation.js - module responsible for handling in-app focus and navigation
│   └── utils.js - module with useful tools used through application
│
├── CHANGELOG.md - changes for each version of application
├── config.xml - application's configuration file
├── icon.png - application's icon
├── index.html - main document
└── README.md - this file
```

## Other resources

*  **SystemInfo API**  
  https://developer.samsung.com/tv/develop/api-references/tizen-web-device-api-references/systeminfo-api

*  **ProductInfo API**  
  https://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/productinfo-api

*  **TVInfo API**  
  https://developer.samsung.com/tv/develop/api-references/samsung-product-api-references/tvinfo-api


## Copyright and License

**Copyright 2019 Samsung Electronics, Inc.**

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
