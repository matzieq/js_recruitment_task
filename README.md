# JS Recruitment Task

## (Bonus) My approach to solving this task.

- First I played around with the API for a while to get a sense of its inner workings.
- Then I quickly wrote some code to display something on the screen.
- At first I wanted to use React, but alas - the requirements said 'no libraries'. So I decided to design my own component system.
- I started from the ground up, first designing the smallest thing - a single news card - then the news list and then the app itself.
- For communication between components, specifically the inputs and the news list, I used a 'hack' that is also ised to make react components transfer data upwards: I passed function references through "props" of sorts, which are then triggered by the inputs and applied to the news list.
- The entire app then needed massive refactoring and bug fixes.
- There is definitely room for improvement. For example, the naming conventions could use some work, the sections (which are fetched from the API) might need some filtering (for example, the app could ignore the sections which contain no articles whatsoever), and also a saving system for the read later list would be nice (for example to local storage). These would probably be my next steps were I to work on it some more.
- I noticed that parcel does not handle the ES7 property initializer functionality out of the box. There were times I wished that I could get babel set up.
- If I were designing the app from zero, I'd probably use react, because it's something I know. If I were designing the app from zero and had tons of time, I'd probably use vue, as I'd love to learn it in depth. It has much less overhead than react, and can be easily used in small 'splashes', not forcing you to get all in. 
- Also, I enjoyed the task very much, thanks :)
