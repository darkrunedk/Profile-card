# Profile card (native javascript web-component)
 
This is a native web-component that I made with a lot of inspiration from [Flipping Card](https://codepen.io/DmitryKorobov/pen/LrWxKO) by Dmitry Korobov.

## How do I use it?

Add the js file to the page you want to use it like this:
```
<script src="path/to/component.js" type="module"></script>
```
I would put it as close to the end of the page as possible.

After that you can add a custom html element to the page like this:
```
<profile-card></profile-card>
```

The element supports the following attributes:

Attribute | Values | Description | Default value
------------ | ------------- | ------------ | ------------
height | Numeric value (px) | Sets the height of the profile card | 400
width | Numeric value (px) | Sets the width of the profile card | 300
direction | horizontal or vertical | Sets which way the card are flipping | vertical
front-img | string | Link to an image you want to show in the front of the card
back-header | string | Sets a header on the back of the card (using the text from the attribute)
back-text | string | Sets a paragraph text on the back side of the card (using the text from the attribute)
back-links | string | Can be used to make links on the back side of the card. Links is seperated by ";"

## Font awesome

It can be used with the font awesome kits, which is being detected automatically (this may need some additional tweaking).
Font awesome icons can be used with the links in the following way:

```
<profile-card back-links="fab fa-github|https://github.com/darkrunedk/Profile-card"></profile-card>
```
