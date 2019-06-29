ember-cli-template-trimmer
==============================================================================

This addon removes newlines on compile stage, for cases like this:

```hbs
<div>
  <div>
    <div>
      <div></div>
    </div>
  </div>
</div>
```
to this:
```hbs
<div><div><div><div></div></div></div></div>
```
\* any text nodes inside `<pre>`, `<code>` will be saved.

\** single space nodes will be saved.

\** text nodes having text + (newlines || spaces) will be saved

---

# why?

---

this reduces `glimmer-vm` opcodes count, memory usage, and increase final rendering/rerendering speed.

---

Bonus:

```hbs
{{#if false}}
    this dead block will be removed at all 
{{/if}}
```

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-cli-template-trimmer
```


Usage
------------------------------------------------------------------------------

[Longer description of how to use the addon in apps.]


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
