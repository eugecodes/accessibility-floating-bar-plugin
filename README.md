
# Accessibility Bar - Ready for Use!

I created a component ready for import and ready for use, in React but also to be used directly with jquery as "crude vanilla js lib".
It's an accessibility bar (floating modal) that is comprised of the following features:
- Contrast changer (available for the entire site)
- Accessible font changer (available for the entire site)
- Read me this page
- Read me everything that has been selected (just select any text after importing the module and it will be read to you)
- Font size increment / decrement
- Lines spacing changer
- Record your answers to any form, just speak your answer and the accessibility bar types it in the input for you.

Everyone is welcome to use it.

```js
import { AccessibilityModal } from 'components';
...
return (
    <AccessibilityModal />
)
```

There's an example with [Wordpress Headless and used in Next JS / Faust library](https://faustjs.org/).

Install wordpress, change .env.local to point to your wordpress installation and just run!

```js
/example/my-app
npm install
npm run dev
```
[http://localhost:8081](http://localhost:8081)

[Reference](https://github.com/wpengine/faustjs#quick-start) of this case-of-use for the example.