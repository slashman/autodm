# Heroes of Noresskia and AutoDM

Heroes of Noresskia is a setting for AutoDM 0.1, both things were produced during the 2019 7DRL challenge by @slashie_

Uses Phaser + ES6 webpack template.

I wanted to create a program that simulated the work of a Game Master / Dungeon Master on a pen and paper RPG session (and no, that's not what all computer RPGs do). It all came from the research I made for my talk at Roguelike Celebration 2018 and the short article I published afterward. I knew in advance the 7 days timeframe was a bit short, but I believed I could at least do a proof of concept.

The rationale behind it was: Rogue's intent was to simulate a Dungeon Master able to create Dungeon Dive campaigns, what if I try to create a program that can generate and run Epic Quest campaigns? these two are known as the "simplest" types of campaigns/adventures since the objective is pretty straightforward, and players know what to expect, they are the easier for the Game Master to run.

Of course, there is a lot of terminology on RPGs and none of it could be considered official. I did some research on Day 1 (including this pretty good post) and was really starting to despair since the solution to this seemed too complex and hard to scale down into a first iteration. Seriously, just taking a look at that website and reading two articles is enough for you to want to give up any pretensions of making a program able to do a tiny bit of what a good GM can do.

In any case, for the context of this, an Epic Quest type of campaign is that where the party has to travel the land finding clues to incrementally work towards an epic goal such as saving the world by destroying an arch-villain or finding/destroying an artifact, or a similar cool sounding task. All while surviving battles on the road, and becoming stronger to fight stronger monsters. Check this nicely worded article for more info on Epic Quests.

The initial idea was to simulate the GM process by generating some key points of the campaign and then reacting to the player actions to build the intermediate steps or tweak the outstanding milestones. However, I ran into issues to implement that as an algorithm and had to settle in the end with generating the complete plotline from the onset.

# Credits
Azgaar's Fantasy Map Generator
https://azgaar.github.io/Fantasy-Map-Generator/

FLARE portraits, by Justin Nichol
https://opengameart.org/content/flare-portrait-pack-number-one
https://opengameart.org/content/flare-portrait-pack-number-two
https://opengameart.org/content/flare-portrait-pack-number-three
https://opengameart.org/content/flare-portrait-pack-number-four
https://opengameart.org/content/flare-portrait-pack-number-five
https://opengameart.org/content/flare-portrait-pack-female-edition

RPG GUI construction kit v1.0
https://opengameart.org/content/rpg-gui-construction-kit-v10

Fantasy UI Elements, by Ravenmore (http://dycha.net)
https://opengameart.org/content/fantasy-ui-elements-by-ravenmore

Weapon Icons 32x32px (painterly), by Scrittl
https://opengameart.org/content/weapon-icons-32x32px-painterly

Armor Icons 32x32px (painterly), by Scrittl
https://opengameart.org/content/armor-icons-32x32-px-painterly

Kujasa, the Beginning, by Sergei Churbanov, aka CatBlack
https://opengameart.org/content/kujasa-the-beginning

Fonts
https://www.dafont.com/augusta.font
https://www.dafont.com/offenbacherschwabachercat.font
https://www.dafont.com/deutsch-gothic.font


# Setup
You'll need to install a few things before you have a working copy of the project.

## Install node.js and npm:

https://nodejs.org/en/


## Install dependencies

Navigate to the cloned repo's directory.

Run:

```npm install``` 

## Run the development server:

Run:

```npm run dev```

This will run a server so you can run the game in a browser. It will also start a watch process, so you can change the source and the process will recompile and refresh the browser automatically.

To run the game, open your browser and enter http://localhost:3000 into the address bar.


## Build for deployment:

Run:

```npm run deploy```

This will optimize and minimize the compiled bundle.


## Credits
Big thanks to these great repos:

https://github.com/lean/phaser-es6-webpack

https://github.com/belohlavek/phaser-es6-boilerplate

https://github.com/cstuncsik/phaser-es6-demo

## Contributors

https://github.com/RenaudROHLINGER