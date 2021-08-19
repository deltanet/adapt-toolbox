# adapt-toolbox

**Toolbox** is an *extension* for the the [Adapt framework](https://github.com/adaptlearning/adapt_framework).   

This extension adds icons to the navigation area that can trigger the drawer functionality on specified extensions.  

## Installation

This extension must be manually installed.

If **Toolbox** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

## Settings Overview

**Toolbox** is configured at course (*course.json*) level.  

The attributes listed below are properly formatted as JSON in [*example.json*](https://github.com/deltanet/adapt-toolbox/blob/master/example.json).  

### Attributes

The Toolbox attribute group at course level contains values for **_isEnabled**, **_hideDrawerIcon**, **_disableOnMobile**, and **_items**.

>**_isEnabled** (boolean):  Turns on and off the **Toolbox** extension. Can be set to disable **Toolbox** when not required.  

>**_hideDrawerIcon** (boolean):  Sets whether the default Drawer icon is hidden.  

>**_disableOnMobile** (boolean):  Sets whether the **Toolbox** extension is disabled on small devices.

>**_items** (array): Multiple items may be created. Each item represents another Adapt Extension and contains values for **_icon**, **_ariaLabel**, **_triggerOption**, and **_trigger**.

>>**_icon** (string): Defines the class name for the icon which must be included in the theme.  

>>**_ariaLabel** (string):  This text becomes the button icon’s `Aria label` attribute.  

>>**_triggerOption** (string):  Defines the Adapt trigger of the button. Options are `"Show Resources"`, `"Show Glossary"`, `"Show Search"`, `"Show Help"`, and `"Custom"`.  

>>**_trigger** (string):  This defines the Adapt trigger if `"Custom"` is used as the **_triggerOption**.  

>**_iconOrder** (number): Defines the order the icon will appear in the toolbox. Numbers appear from left to right in ascending order.

### Accessibility
Several elements of **Toolbox** have been assigned a label using the [aria-label](https://github.com/adaptlearning/adapt_framework/wiki/Aria-Labels) attribute: **Toolbox**. These labels are not visible elements. They are utilized by assistive technology such as screen readers.  

## Limitations

No known limitations.

----------------------------
**Version number:**  4.0.0  
**Framework versions supported:**  5+    
**Author / maintainer:** DeltaNet with [contributors](https://github.com/deltanet/adapt-toolbox/graphs/contributors)     
**Accessibility support:** Yes  
**RTL support:** Yes     
**Authoring tool support:** Yes
