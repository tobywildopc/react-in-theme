# react-in-theme
Using React at the Drupal Theme Layer

This git is all about how to insert a simple ReactJS Form into your Drupal website.

It is done by including the required JS files, adding in a HTML Div to get re-rendered, and then targeting it properly.

# Setup

In a template file, or a preprocess function you need to include the following:
```
<script src="https://unpkg.com/react@16/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" crossorigin></script>
<script src="https://unpkg.com/babel-standalone@6/babel.min.js" crossorigin></script>
```
Since I'm just in a local dev test site I'm just including them via my html.html.twig file.

Then, down the bottom of the page, I include my App and CSS file:
```
<script type="text/babel" src="/themes/react/myApp/app.js"></script>
<link rel="stylesheet" href="/themes/react/myApp/app.css" media="all" />
```

I have a block on my test site the following HTML:
```
<div id="myreactapp"></div>
```

And then ReactJS does everything else for me.

# Current state

Currently only the Energy and Water options at the start show any conditional questions on the second page.

There is no top navigation.

The only form validation is the first two fields on the first page.

# What was learned

Well, it was good to learn how to embed ReactJS in the theme layer in order to develop more complex behaviour that may have otherwise required a PaaS platform.

# Todo

Attempt consumption of a static CSV file for data calculations

Attempt consumption of content from another Drupal site