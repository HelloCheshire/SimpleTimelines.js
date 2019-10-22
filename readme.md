# Simple Timeline

A vanilla JavaScript library for creating simple responsive timelines.

View the [demo](https://cheshirebeane.github.io/SimpleTimelines.js/)!

Infinite Length            |  Responsive
:-------------------------:|:-------------------------:
![](https://github.com/CheshireBeane/SimpleTimelines.js/blob/master/images/gif1.gif)  |  ![](https://github.com/CheshireBeane/SimpleTimelines.js/blob/master/images/gif2.gif)

## Installing

Copy the following [files](https://github.com/CheshireBeane/SimpleTimelines.js/tree/master/vendor) into the `HEAD` of your website (be sure to set the appropriate paths):

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

Simple timeline is barebones. It's left lightweight to allow easier customization of css and js.

Edit `simpletimeline.css` and `simpletimeline.js` to your hearts content!


## Issues

Feel free to submit issues and enhancement requests.

## Contributing

CheshireBeane welcomes contributions to our [open source projects on Github](https://github.com/CheshireBeane).

Please follow the following steps if you wish to contribute to this open source project!

 1. **Fork** the repo on GitHub
 2. **Clone** the project to your own machine
 3. **Commit** changes to your own branch
 4. **Push** your work back up to your fork
 5. Submit a **Pull request** so that we can review your changes

## Development

To setup this project for development:

* Clone or download the repository
* Run `npm install` inside the root of the project
* In gulpfile.js change the location you are proxying: `proxy: 'localhost:8888/timeline'`
* Run `gulp` to start dev environment (including scss, babel, and browserSync)

## Authors

**Tanner Eustice** - *Initial work* - [teustice](https://github.com/teustice)

**Cheshirebeane Team** - *Initial work* - [CheshireBeane](https://github.com/Cheshirebeane)


## License

This project is licensed under the MIT License

Cheshirebeane
