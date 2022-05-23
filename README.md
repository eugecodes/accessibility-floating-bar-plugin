
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

![Screenshot_4](https://user-images.githubusercontent.com/72326632/169734011-8c95f074-38d6-4cfc-85c6-ed8792d2e913.png)
![Screenshot_5](https://user-images.githubusercontent.com/72326632/169734035-aa84cbfa-47ba-4274-87f6-ef983a30e940.png)
![Screenshot_6](https://user-images.githubusercontent.com/72326632/169734050-c5dd2974-e772-46e1-9c14-e4183e54bef7.png)
![Screenshot_7](https://user-images.githubusercontent.com/72326632/169734060-6539db00-d65a-4158-9f3f-1398a000abdf.png)
![Screenshot_8](https://user-images.githubusercontent.com/72326632/169734085-b23c0888-c5ee-4a94-b2ac-72c27beff127.png)
![Screenshot_10](https://user-images.githubusercontent.com/72326632/169734114-bc27dd20-780d-45d2-adee-ae1f728f523d.png)
![Screenshot_11](https://user-images.githubusercontent.com/72326632/169734148-5bd99f0f-5717-444e-a67e-24fa037a2562.png)


