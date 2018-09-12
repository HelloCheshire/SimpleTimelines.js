# Simple Timeline

A vanilla JavaScript library for creating simple responsive timelines.

Infinite Length            |  Responsive
:-------------------------:|:-------------------------:
![](https://github.com/teustice/SimpleTimelines.js/blob/master/images/gif1.gif)  |  ![](https://github.com/teustice/SimpleTimelines.js/blob/master/images/gif2.gif)

## Installing

Copy the following into the `HEAD` of your website (be sure to set the appropriate paths):

```
<link rel="stylesheet" href="PATH_TO/simpletimeline.css">

<script type="text/javascript" src="PATH_TO/simpletimeline.js"></script>
```

## Usage

Define an HTML wrapper with an id of your choice:

`<div id="timeline"></div>`

Simple Timeline takes 2 parameters currently, the element ID of the wrapper, and an array of objects containing your timeline data:

```
const TIMELINE_DATA = [
  {
    year: '2004',
    title: 'This is a test title',
    image: 'https://picsum.photos/600/400'
  },
  {
    year: '2005',
    title: 'This is a test title 2',
    image: 'https://picsum.photos/600/400'
  },
  {
    year: '1990',
    title: 'This is a test title 3',
    image: 'https://picsum.photos/600/400'
  },
  {
    year: '2018',
    title: 'This is a test title 4',
    image: 'https://picsum.photos/600/400'
  },
  {
    year: '2005',
    title: 'This is a test title 2',
    image: 'https://picsum.photos/600/400'
  },
  {
    year: '1990',
    title: 'This is a test title 3',
    image: 'https://picsum.photos/600/400'
  },
  {
    year: '2018',
    title: 'This is a test title 4',
    image: 'https://picsum.photos/600/400'
  },
];

let timeline = new Timeline('timeline', TIMELINE_DATA);
timeline.init();
```

Calling `timeline.init()` will then parse your data, and initialize a new timeline in the specified wrapper.

`let timeline = new Timeline('timeline', TIMELINE_DATA);`
`timeline.init();`

## Customization

Simple timeline is barebones. It's left lightweight to allow easier customization of css and data.

Edit `simpletimeline.css` and `simpletimeline.js` to your hearts content!

## Authors

**Tanner Eustice** - *Initial work* - [teustice](https://github.com/teustice)


## License

This project is licensed under the MIT License
