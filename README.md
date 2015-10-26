# Witzbould's toggleNator

Witzbould's toggleNator is a js module that toggles css classes.

That happens via html data attributes.
Toggle buttons can be separated into groups. So for example you can have multiple accordion menus on your side and they will not influence one another.

This module requires jQuery. Any reasonably modern version should be ok.

## Options

The options are an JSON string in the data attribute of an arbitrary html element.
You have to escape any html special characters of course.
Options can be set globally on instantiation and can be overwritten by the data attribute of the element

Options:| | |
:--- | --- | ---
byGroup:    |true            |determines if the other elements in the group should also be toggled
group:      |'all'           |the group that the element belongs to
state:      |'off'           |the initial state of the element on site load
triggerClass:|'toggleNator'  |this is the class that will be toggled on the trigger element
target:     |null            |this is the target selector, should match at least one data-toggleNatorTarget attribute on your site
targetClass:      |'toggleNatorTarget'   |this is the class that will be toggled on the target

## Example

The classes in this example will be set by toggleNator

```html
<h2 data-toggleNator="{&quot;target&quot;:&quot;product-category-box-1&quot;,&quot;group&quot;:&quot;product-category&quot;}">Trigger</h2>
<ul data-toggleNatorTarget="product-category-box-1">
    <li></li>
</ul>

<h2 data-toggleNator="{&quot;target&quot;:&quot;product-category-box-2&quot;,&quot;group&quot;:&quot;product-category&quot;,&quot;state&quot;:&quot;on&quot;}" class="toggleNator">Trigger 2</h2>
<ul data-toggleNatorTarget="product-category-box-2" class="toggleNatorTarget">
    <li></li>
</ul>
```

That might be a little hard to read but there are some functions that help you with html special char escaping.
In PHP you could write the example like this:

```php
<?php
    $toggle_options_1 = [
        'target' => 'product-category-box-1',
        'group' => 'product-category'
    ];
?>
<h2 data-toggleNator="<?php echo htmlspecialchars(json_encode($toggle_options_1), ENT_QUOTES); ?>">Trigger</h2>
<ul data-toggleNatorTarget="product-category-box-1">
    <li></li>
</ul>

<?php
    $toggle_options_2 = [
        'target' => 'product-category-box-2',
        'group' => 'product-category',
        'state' => 'on'
    ];
?>
<h2 data-toggleNator="<?php echo htmlspecialchars(json_encode($toggle_options_2), ENT_QUOTES); ?>" class="toggleNator">Trigger 2</h2>
<ul data-toggleNatorTarget="product-category-box-2" class="toggleNatorTarget">
    <li></li>
</ul>
```


If you are trying to atach the toggleNator to dynamically added DOM nodes (throu ajax etc.) you might wonder how to accomplish that.
Well here is how you can do that:

```javascript
var trigger = $('[data-toggleNator]')
trigger.toggleNator()

$('#addTriggerAndBox').on('click', function(e) {
  // prevent any default eventlistener like "follow the href"
  e.preventDefault()

  // dynamically added trigger and target
  $(this).after('<h2 data-toggleNator="{&quot;target&quot;:&quot;box-3&quot;}">Trigger 3</h2> <div class="box" data-toggleNatorTarget="box-3">&nbsp;</div>')


  // "The Magic"
  // Firstly remove all existing listeners, than reatach the listeners.
  // This code will be executed after the new DOM-Nodes are added.
  // You have to reselect all toggleNator trigger. You cannot use the variable 'trigger' here. But you should refresh the variable.
  $('[data-toggleNator]').off('.toggleNator').toggleNator()
})
```
