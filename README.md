# Witzboulds-toggleNator

Witzboulds toggleNator is a js module that toggles css classes.

That happens via html data attributes.
Toggle buttons can be separated into groups. So for example you can have multiple accordion menus on your side and they will not influence one another.

This module requires jQuery. Any reasonably modern version should be ok.

## Options

Options can be set globally on instantiation and can be overwritten by the data attribute of the element

Options:| | |
--- | --- | ---
byGroup:    |true            |determines if the other elements in the group should also be toggled
group:      |'all'           |the group that the element belongs to
state:      |'off'           |the initial state of the element on site load
target:     |null            |this is the target selector, should match at least an data-toggleNator-target attribute on your site
class:      |'toggleNator'   |this is the class that will be toggled on the target

## Example

The classes in this example will be set by toggleNator

```html
<h2 data-toggle="{&quot;target&quot;:&quot;product-category-box-1&quot;,&quot;group&quot;:&quot;product-category&quot;}">Trigger</h2>
<ul data-toggle-target="product-category-box-1">
    <li></li>
</ul>

<h2 data-toggle="{&quot;target&quot;:&quot;product-category-box-2&quot;,&quot;group&quot;:&quot;product-category&quot;,&quot;state&quot;:&quot;on&quot;}" class="toggle-on">Trigger 2</h2>
<ul data-toggle-target="product-category-box-2" class="toggleNator">
    <li></li>
</ul>
```

That might be a little hard to read but there are some functions that help you with html special char escaping.
In PHP you could write the example like this:

```php
<?php
    $toggle_options_1 = [
        'target': 'product-category-box-1',
        'group': 'product-category'
    ];
?>
<h2 data-toggle="<php echo htmlspecialchars(json_encode($toggle_options_1), ENT_QUOTES); ?>">Trigger</h2>
<ul data-toggle-target="product-category-box-1">
    <li></li>
</ul>

<?php
    $toggle_options_2 = [
        'target': 'product-category-box-2',
        'group': 'product-category',
        'state': 'on'
    ];
?>
<h2 data-toggle="<php echo htmlspecialchars(json_encode($toggle_options_2), ENT_QUOTES); ?>" class="toggle-on">Trigger 2</h2>
<ul data-toggle-target="product-category-box-2" class="toggleNator">
    <li></li>
</ul>
```
