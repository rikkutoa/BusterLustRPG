/*:
@plugindesc 3D rendering in RPG Maker MV with babylon.js
version 0.5.3
@author Dread/Nyanak
@help

Requires version 1.6 of RPG Maker MV.  

If you are making a game with this plugin, please consider supporting my
patreon.  
https://www.patreon.com/cutievirus  
You can also unlock some patron-only features by becoming a patron, such as
Dynamic Shadows.  

Discord: http://cutievirus.com/discord

## Getting started

To use the plugin on a new or existing project, download [plugin.zip] and
extract the files into your project directory.
Then, load `babylon.js` and `mv3d.js` as plugins in that order.

[plugin.zip]:
https://github.com/Dread-chan/MV3D/blob/master/plugin.zip


Now when you run your game, the map should be rendered in 3D.

The A3 and A4 tiles will be rendered as walls. You can also change the height
of tiles using regions and terrain tags.

By default, regions 1-7 are configured to affect the height.

Terrain tag 1 is configured to use a cross shape, so tiles with this tag will
stand up like a tree.

Terrain tag 2 is configured to use a fence shape. Try putting this tag on the
fence autotiles that come with MV.

The regions and terrain tags can be reconfigured however you want.

---

## Configuration

Tileset and map configurations are placed in the note area.
Event configurations are placed either in the event note or in comments.
Region and terrain tags are configured through the plugin parameters.

In order for the plugin to recognize configurations, they need to be wrapped
properly.  
Tileset and map configurations need to be wrapped in a <mv3d> </mv3d> block,
while event configurations need to be inside a <mv3d:  > tag.  
Region and terrain tag configurations (defined in plugin parameters)
don't need to wrapped at all.

### Using configuration functions

Configuration functions are used to configure tilesets, regions, terrain tags,
events, and maps.

The following is an example of a basic configuration function. Each function
is passed a list of parameters.

    top(A1,0,0)

Some functions can take a large number of parameters. In these cases the
parameter list is separated into groups. A vertical bar can be used instead of
a comma to jump to the next group. You can also jump to a parameter by name
using a colon.  
Here are some examples:

    ceiling(A4,0,0|2)
    camera(0,60,dist:5,height:0.75)

Parameter groups can also have names, and can be jumped to in the same way you
jump to a named parameter.

---

## Tileset Configuration

Each line in the tileset configuration should start by identifying the tile
you want to configure, followed by a colon, and then a list of configuration
functions.

Choosing a tile is done with the format `img,x,y`, where img is name of the
tileset image (A1, A2, B, C, etc.), and x and y are the position of that tile
on the tileset. For example, `A2,0,0` would be the top left A2 tile. On the
outdoor tileset, this would be the grass autotile.

Here are some exapmle tileset configurations.  

This first one will make our outdoor water sink into the ground a little.

    <mv3d>
    A1,0,0:top(A1,0,0),side(A1,31,54,31,14),depth(0.3),float(0.1)
    </mv3d>

But this example won't look very good if we place the water at the edge of a
cliff, so let's configure it to use a waterfall texture on the outside walls.

    <mv3d>
    A1,0,0:top(A1,0,0),side(A1,1,1),inside(A1,31,54,31,14),depth(0.3),float(0.1)
    </mv3d>


### Setting tile textures

A tile can have up to four different textures. These are the Top texture,
the Side texture, the Inside texture, and the Bottom texture.  
If unset, the inside texture will be the same as the side texture and the 
bottom texture will be the same as the top texture.  
Inside textures are only used if a tile has a depth() specified.

Each texture can be set with the respective top(), side(), inside(), and
bottom() function. Texture() can be used to set both the top and side texture.

Parameter list:
img,x,y,w,h|alpha|glow[anim]animx,animy

The number of parameters passed to the first group will alter the behavior of
these functions.  

With only 2 parameters, it will act as an offset. For example, top(0,1) will
use the texture of the tile below the configured tile.  

With 3 parameters, you specify the tileset image name and tile coordinates of
the tile to use the texture from. For example, top(A1,0,0) will use the top
left tile of the A1 tileset image.  

With 5 parameters, you specify a region with pixel coordinates on the
specified tileset image. For example, top(A1,24,72,48,48).  

The alpha parameter can be used to make the texture partially transparent. Or,
you can set alpha to 1 to turn on alpha blending.  
Examples: texture(|1), texture(alpha:0.5)

The glow parameter will make the texture glow in the dark. Good for lava.  
Can take a number (0-1) or a color.  
Example: texture(||1), texture(glow:1), texture(glow:red)

[Anim] is a named parameter group for defining custom animated tiles.  
The number supplied to animx and animy will be the offset used by the
animation. The final offset will be equal to the anim offset times the
current frame.  
Animx has frames 0,1,2,1, while animy has frames 0,1,2.  
Examples: texture(|||1,0), texture(anim:0,1)



### Setting tile height

Height and depth can be used to set the height of the tile. A tile's height
is equal to its height minus its depth. Tiles with depth will use their inside
texture on their sides. Depth is good for making pits.  
Examples: height(2), depth(1)  

The float function will make water vehicles float above the surface. If you've
given your water tiles some depth(), this will unsink your ships.  
Example: float(0.3)

The fringe function will change the height of your star tiles.  
Example: fringe(2)



### Changing tile shapes

There are a few special shapes which can be given to your tiles using the
shape() function. Valid shapes are FLAT, FENCE, CROSS, and XCROSS.  
Some shapes can have additional data passed to them. For instance,  
shape(fence,false) will disable fenceposts.
Examples: shape(fence), shape(xcross)



### Slope Tiles

Slope tiles can be used to make hills or stairs to move between elevations.
The slope tiles will automatically try to choose their direction.  
Directional passage will prevent the slope tile from facing certain
directions.  
Second parameter forces slope to face certain direction.
Directions are n, s, e, and w.
Shadow pen can be used to force slope to face a certain direction.
Draw a shadow on the side you want the slope to face.
Example: slope(1), slope(0.45,n), slope(2,e)

### Tile Passage

The pass function will change the passage rules for the tile.  
This can be used to get star passage on A tiles, or to have different passage
rules depending on if 3D is enabled.
Examples: pass(o), pass(x), pass(*)

---


## Event Configuration

Event configurations can be placed in either the event note or comments, and
mush be wrapped in a <mv3d:   > tag.
A few configuration functions, such as pos, will behave slightly differently
depending on whether they're placed in the note or comments.

Here's some examples.

First let's make an event that displays on the edge of a wall.

    <mv3d:shape(fence),scale(0.9,1.3),y(0.51),rot(0),z(0)>

Next let's attach a flashlight to an event.

    <mv3d:flashlight(white,2,6,30)>



### Adjust event position

The offset() function can be used to offset an event's mesh. This is 
purely visual. xoff(), yoff(), and zoff() can be used to change the 
x, y, and z offset independently.  
Examples: offset(0.5,0.5,0.5), offset(z:1),
xoff(0.49), yoff(0.51), zoff(1)

The elevation() function will adjust the event's height above the ground.
With elevation greater than zero, the event will be flying.  
Example: elevation(2)

The z() function will set the event's absolute z position, ignoring ground
level.  
Example: z(0)

The pos() function will change the position of the event. This can be used to
make two events occupy the same space. Prefix numbers with + to use relative
coordinates.  
Examples: pos(1,2), pos(+0,+-1)



### Change event shape

Use the shape function to set what shape the event should use. Valid event
shapes are FLAT, SPRITE, TREE, WALL, FENCE, CROSS, and XCROSS.  
FLAT will make the event lie flat on the ground like a tile.  
SPRITE will make the event rotate to always face the camera.  
TREE will make the event stand up, but rotate horizontally toward camera.  
WALL and FENCE will make the tile stand up without rotating. FENCE is an
alias of WALL.  
CROSS and XCROSS will make the event use a cross mesh. XCROSS is rotated
45 degrees.  
Example: shape(tree)

The scale function can change the size of the event.  
Examples: scale(2,2), scale(1.5,3)

The yaw function will rotate the event's mesh horizontally. Rotation applies
before pitch. Doesn't work with Sprite or Tree shapes.  
0 is south, 90 is east, 180 is north, and 270 is west.  
Example: yaw(45)

The pitch function will tilt the event's mesh vertically. Doesn't worth with
Sprite shapes.  
Example: pitch(20)

The rot function will rotate the event's mesh horizontally. Rotation applies
after pitch. Doesn't work with Sprite or Tree shapes.  
Example: rot(45)



### Event Lights

The lamp function attaches a point light to the event.
Parameter list: color,intensity,range
Examples: lamp(white,0.5,1), lamp(#ff8888,1,3)


The flashlight function attaches a spotlight to the event.
Parameter list: color,intensity,range,angle|yaw,pitch
Examples: flashlight(#ffffff,2,6,30), flashlight(red,2,6,45|90)


The height and offset of the lights can be set with lampHeight(),
flashlightHeight(), lampOffset(), and flashlightOffset().  
The height and offset of both the lamp and flashlight can be moved
together with lightHeight() and lightOffset().  
Examples: lampHeight(0.5), flashlightHeight(0.25), lightOffset(0,1.01)



### Other event settings

You can set whether the event is affected by bush tiles using the bush
function.  
Examples: bush(true), bush(false)

You can disable or change the size of the event's shadow using the shadow
function.  
A second parameter can be supplied to control how far the shadow may travel.
before fading out.  
Examples: shadow(0), shadow(3), shadow(1,6)

The alpha function is used to make the event partially transparent or to turn
on alpha blending.  
Examples: alpha(0.5), alpha(1)

The glow parameter will make the event glow in the dark.  
Can take a number (0-1) or a color.  
Examples: glow(1), glow(red)

The dirfix function will set whether the event rotates depending on the camera
angle.  
Examples: dirfix(true), dirfix(false)

The platform function will set whether the event can be walked on.  
Example: platform(true)

The gravity function will set the fall speed of the event.
Example: gravity(10)

The collide will set the event's collision height.  
collide(false) acts as a shorthand for collide(0),platform(false)  
Examples: collide(0), collide(1), collide(1.5)

The trigger event will set the height range the event can be triggered from.
The first parameter is the height above the event, and the second is the
height below the event.
Examples: trigger(Infinity,Infinity), trigger(0), trigger(2,1)

The pass function when used on events acts as a shorthand for platform and
collide.  
pass(o) turns on platform
pass(x) turns off platform and turns on collision.
pass(*) turns off platform and collision.

---

## Map Configuration

Map configuration goes in the note area of the map settings. Configurations
should be placed in an <mv3d></mv3d> block, which should contain a list of
configuration functions.

Some of these configurations apply when the map is loaded, while others affect
how the map is rendered.

---

### Light and Fog

The light function will set the ambient light level for the map.  
The ambient function is an alias for the light function.  
Examples: light(white), ambient(gray), ambient(#222222), light(rebeccaPurple)

The fog function sets the color and distance of the fog.  
Parameter list: color|near,far  
Examples: fog(white|10,20), fog(#e1feff), fog(black|20,30)



### Camera Settings

The camera function can be used to set various properties of the camera,
including the rotation, distance, height, and projection mode.  
Parameter list: yaw,pitch|dist|height|mode  
Examples: camera(0,60,dist:5,height:0.75), camera(45,45),
    camera(mode:orthographic), camera(mode:perspective)



### Setting a ceiling for the map

The ceiling function sets a ceiling texture and height, and also supports 
all the other properties from the texture function like alpha and animation.  
Parameter List:  
img,x,y,w,h|height|alpha|glow[anim]animx,animy  
Example: ceiling(A4,0,0|2)



### Other map settings

The edge function sets whether to render walls at the map edge.  
Edge can be set to clamp to repeat tiles at the edge of the map.  
Examples: edge(true), edge(false), edge(clamp), edge(clamp,2)

The disable function will turn off the 3D rendering for the map.  
Example: disable()



### Regions and tiles

You can define region and tileset configurations in the map note by using
<mv3d-regions> and <mv3d-tiles> blocks.  
Example:  

    <mv3d-regions>
        12:slope(1)
    </mv3d-regions>
    <mv3d-tiles>
        A2,4,0:top(1,1)
    </mv3d-tiles>

---


## Plugin Commands

In this documentation, the parts surrounded with angle bracks like <n> are
parameters.  
<n> means number.  
<t> means time.  

Some commands (like lamp and flashlight) act on a character. By default the
target character will be the current event.
You can define your own target using the following syntax:

    mv3d ＠target rest of the command

If the second word in the command starts with `＠`, that will be interpreted
as the target.

Valid targets:

- ＠p or ＠player: Targets $gamePlayer.
- ＠e0, ＠e1, ＠e2, ＠e25 etc: Targets event with specified id.
- ＠f0, ＠f1, ＠f2, etc: Targets first, second, third follower, etc.
- ＠v0, ＠v1, ＠v2: Boat, Ship, Airship.

Some parameters can be prefixed with + to be set relative to the current
value.

For example:

    mv3d camera yaw +-45 0.5

---

    mv3d camera pitch <n> <t>
    mv3d camera yaw <n> <t>
    mv3d camera roll <n> <t>
    mv3d camera dist <n> <t>
    mv3d camera height <n> <t>

Sets the camera properties, where <n> is the new value and <t> is the time to
interpolate to the new value.   
Prefix <n> with + to modify the current value instead of setting a new
value.

---

    mv3d camera mode <mode>

Set camera mode to PERSPECTIVE or ORTHOGRAPHIC

---

    mv3d allowRotation <true/false>
    mv3d allowPitch <true/false>

Sets whether keyboard control for rotation / pitch is enabled.  
allowRotation is ignored in 1st person mode.

    mv3d lockCamera <true/false>

Locks the camera, preventing keyboard control of rotation & pitch.  

---

    mv3d fog color <color> <t>
    mv3d fog near <n> <t>
    mv3d fog far <n> <t>
    mv3d fog dist <near> <far> <t>
    mv3d fog <color> <near> <far> <t>

<t> is time.  
Prefix values with + to modify the current values instead of setting new
values.

---

    mv3d light <color> <t>
    mv3d ambient <color> <t>

Sets the color for the ambient light.

---

    mv3d ＠t lamp color <color> <t>
    mv3d ＠t lamp intensity <n> <t>
    mv3d ＠t lamp dist <n> <t>
    mv3d ＠t lamp <color> <intensity> <dist> <t>

---

    mv3d ＠t flashlight color <color> <t>
    mv3d ＠t flashlight intensity <n> <t>
    mv3d ＠t flashlight dist <n> <t>
    mv3d ＠t flashlight angle <deg> <t>
    mv3d ＠t flashlight pitch <deg> <t>
    mv3d ＠t flashlight yaw <deg> <t>
    mv3d ＠t flashlight <color> <intensity> <dist> <angle> <t>

Angle is beam width of the flashlight.

---

    mv3d camera target ＠t <t>

Change the camera's target.
Camera will transition to the new target over time <t>.

---

    mv3d camera pan <x> <y> <t>
    mv3d pan <x> <y> <t>

Pans the camera view, relative to current target.

---

    mv3d disable
    mv3d enable

Turns 3D rendering on or off.

---

    mv3d ＠t elevation <n> <t>

Sets the elevation of the target character.

---

    mv3d ＠t configure <functions>

Configure the target with a list of configuration functions.
Example: mv3d ＠p configure scale(2)

---

    mv3d ＠t animation <id>
    mv3d ＠t animation <id> depth <true/false> scale <n>

Play an animation on the event, with additional features.  
Animations played with this command will have depth by default 
(they can be occluded by other 3D objects).  
They can also have a custom scale.  
Examples:  
mv3d ＠p animation 8 scale 0.25

---

### Vehicle Commands

    mv3d <vehicle> speed <n>
    mv3d airship height <n>

The vehicles are boat, ship, and airship.  
Speed of the vehicle should be 1-6. It works the same as event speed.   
A higher airship can fly over higher mountains. Perhaps you could let the
player upgrade their airship's height and speed.


---

## Patron Knights:

- Whitely
- Izybelle
- Pumpkin Boss
- L
- hsumi
- nemoma
- AmalgamAsh
- Gaikiken


## Patron Heroes:

- A Memory of Eternity
- Fyoha
- 冬空 橙
- nyrion
- Vaan Auroris
- Chainer Valentine


@param options
@text Option Settings

@param 3dMenu
@text 3D Options Menu
@desc Whether 3D options will be in a submenu, regular options menu, or disabled.
@parent options
@type Select
@option SUBMENU
@option ENABLE
@option DISABLE
@default SUBMENU


@param renderDist
@text Render Distance
@desc The maximum distance that can be rendered by the camera.
@parent options
@type Number
@default 25
@min 0

@param renderDistOption
@text Render Distance Option
@desc Should Render Distance appear on options menu?
@parent renderDist
@type Boolean
@default true

@param renderDistMin
@text Render Distance Min
@parent renderDist
@type Number
@default 10
@min 0

@param renderDistMax
@text Render Distance Max
@parent renderDist
@type Number
@default 100
@min 0


@param mipmap
@text Mipmapping
@parent options
@type Boolean
@default true

@param mipmapOption
@text Mipmapping Option
@desc Should Mipmapping appear on options menu?
@parent mipmap
@type Boolean
@default true


@param fov
@text FOV
@parent options
@type Number
@default 65
@min 0 @max 180

@param fovOption
@text FOV Option
@desc Should FOV appear on options menu?
@parent fov
@type Boolean
@default false

@param fovMin
@text FOV Min
@parent fov
@type Number
@default 50
@min 0 @max 180

@param fovMax
@text FOV Max
@parent fov
@type Number
@default 100
@min 0 @max 180

@param spacer|graphics @text‏‏‎ ‎@desc ===============================================

@param graphics
@text Graphics

@param antialiasing
@text Antialiasing
@parent graphics
@type Boolean
@default true

@param edgefix
@text Edge Fix
@desc Fixes rendering issues at the edges of tiles.
@parent graphics
@type Number
@decimals 1
@default 0.5

@param alphatest
@text Alpha Cutoff
@desc Pixels with alpha below this value will not be rendered.
@parent graphics
@type Number
@decimals 2
@min 0.01 @max 1
@default 0.51

@param lightLimit
@text Lights Per Mesh
@parent graphics
@type Number
@min 4
@default 8

@param backfaceCulling
@text Backface Culling
@parent graphics
@type Boolean
@default true

@param cameraCollision
@text Camera Collision
@parent graphics
@type Boolean
@default true

@param resScale
@text Resolution Scale
@desc Scale the resolution
@parent graphics
@type Number
@decimals 2
@min 0 @max 1
@default 1

@param spacer|map @text‏‏‎ ‎@desc ===============================================

@param map
@text Map Settings

@param enabledDefault
@text Enabled by Default
@desc Whether 3D map rendering is enabled by default.
@parent map
@type Boolean
@default true

@param cellSize
@text Cell Size
@desc The size of the chunks the map is divided into.
@parent map
@type Number
@default 10

@param unloadCells
@text Unload Far Cells
@desc Unload cells outside the render distance.
@parent map
@type Boolean
@default false

@param eventsUpdateNear
@text Update All Events in Render Distance
@parent map
@type Boolean
@default true

@param spacer|fog @text‏‏‎ ‎@desc ===============================================

@param fog
@text Fog

@param fogColor
@text Fog Color
@desc The color of the fog. Use css color code or name (example: #ffffff)
@parent fog
@type Color
@default black

@param fogNear
@text Fog Start Distance
@desc The distance in tiles at which the fog will start.
@parent fog
@type Number
@decimals 1
@default 20.0

@param fogFar
@text Fog End Distance
@desc The distance in tiles at which the fog will finish. Maybe set this to the same as render distance.
@parent fog
@type Number
@decimals 1
@default 25.0

@param spacer|input @text‏‏‎ ‎@desc ===============================================

@param input
@text Input & Gameplay

@param WASD
@text WASD
@parent input
@type Boolean
@default true

@param dir8Movement
@text Diagonal Movement
@desc In smart mode, when diagonal movement fails, try moving straight.
@parent input
@type Combo
@option Off
@option Diagonal Basic
@option Diagonal Basic 3D Only
@option Diagonal Smart
@option Diagonal Smart 3D Only
@default Diagonal Smart

@param keyboardPitch
@text Control Pitch
@parent input
@desc Allow player to change pitch with pageup & pagedown.
@type Boolean
@default true

@param keyboardTurn
@text Allow Turning
@parent input
@desc Allows rotating camera with keyboard in 3rd person. Rotating is always allowed in 1st person.
@type Select
@option Turn with Q+E (requires WASD) @value QE
@option Turn with A+D and left+right @value AD
@option disabled
@default QE

@param keyboardStrafe
@text Allow Strafing
@parent input
@desc Allows strafing in 1st person mode.
@type Select
@option Strafe with Q+E (requires WASD) @value QE
@option Strafe with A+D and left+right @value AD
@option disabled
@default QE

@param turnIncrement
@text Turn Increment
@parent input
@description How many degrees the camera will turn when you press the turn button. Other numbers may also be entered.
@type Combo
@option 90
@option 45
@option SMOOTH
@default 90

@param yawSpeed
@text Turn Speed
@parent input
@description Speed when turning with keyboard (in degrees per second).
@type Number
@default 180

@param pitchSpeed
@text Pitch Speed
@parent input
@description Speed when changing pitch with keyboard (in degrees per second).
@type Number
@default 90


@param stairThresh
@text Stair Threshold
@desc If the distance in height between two tiles is less than this, they will be passable.
@parent input
@type Number
@decimals 2
@default 0.1

@param walkOffEdge
@text Walk off Edge
@parent input
@type Boolean
@default false

@param walkOnEvents
@text Walk on Events
@parent input
@type Boolean
@default true

@param gravity
@text Gravity
@desc The speed characters will fall, in tiles per second.
@parent input
@type Number
@decimals 2
@default 8

@param spacer|tileconfig @text‏‏‎ ‎@desc ===============================================

@param tileconfig
@text Tile Config

@param wallHeight
@text Wall Height
@desc The default height for wall tiles
@parent tileconfig
@type Number
@min -9999 @max 9999
@decimals 1
@default 2.0

@param tableHeight
@text Table Height
@desc The default height for table tiles
@parent tileconfig
@type Number
@min -9999 @max 9999
@decimals 2
@default 0.33

@param fringeHeight
@text Fringe Height
@parent tileconfig
@type Number
@min -9999 @max 9999
@decimals 1
@default 2.0

@param ceilingHeight
@text Ceiling Height
@desc Default height of ceiling for maps with ceiling enabled.
@parent tileconfig
@type Number
@min -9999 @max 9999
@decimals 1
@default 2.0

@param layerDist
@text Layering Distance
@desc The distance between tile layers. If this is too small
there may be z-fighting issues. (default: 0.0100)
@parent tileconfig
@type Number
@decimals 4
@default 0.0100

@param animDelay
@text Animation Speed
@desc The number of milliseconds between each frame in tile animations.
@parent tileconfig
@type Number
@default 333

@param regions
@text Regions
@desc use regions to determine tile height.
@parent tileconfig
@type struct<RegionHeight>[]
@default ["{\"regionId\":\"1\",\"conf\":\"height(1)\"}","{\"regionId\":\"2\",\"conf\":\"height(2)\"}","{\"regionId\":\"3\",\"conf\":\"height(3)\"}","{\"regionId\":\"4\",\"conf\":\"height(4)\"}","{\"regionId\":\"5\",\"conf\":\"height(5)\"}","{\"regionId\":\"6\",\"conf\":\"height(6)\"}","{\"regionId\":\"7\",\"conf\":\"height(7)\"}"]

@param ttags
@text Terrain Tags
@desc use terrain tags to determine tile height.
@parent tileconfig
@type struct<TTagHeight>[]
@default ["{\"terrainTag\":\"1\",\"conf\":\"shape(xcross),height(1),fringe(0)\"}","{\"terrainTag\":\"2\",\"conf\":\"shape(fence),height(1)\"}"]

@param spacer|characters @text‏‏‎ ‎@desc ===============================================

@param characters
@text Characters

@param heightTrigger
@text Event Trigger Height
@desc If true, events will need to be at the same elevation as the player to be triggered.
@parent characters
@type Boolean
@default true

@param eventCharDefaults
@text Character Event Settings
@parent characters
@type Text
@default shadow(0.8,4),shape(sprite),scale(1)

@param eventObjDefaults
@text Object Event Settings
@parent characters
@type Text
@default shadow(0),shape(sprite),scale(1)

@param eventTileDefaults
@text Tile Event Settings
@parent characters
@type Text
@default shadow(0),shape(flat),scale(1)

@param eventHeight
@text Event "Above Characters" Default Height
@parent characters
@type Number
@decimals 1
@default 2.0

@param boatSettings
@text Boat Settings
@parent characters
@type struct<BoatStruct>
@default {"conf":"shadow(0.8,4),shape(sprite),scale(1),bush(false)"}

@param shipSettings
@text Ship Settings
@parent characters
@type struct<BoatStruct>
@default {"conf":"shadow(0.8,4),shape(sprite),scale(1),bush(false)"}

@param airshipSettings
@text Airship Settings
@parent characters
@type struct<AirshipStruct>
@default {"conf":"shadow(1,6),shape(sprite),scale(1),bush(false)","height":"2.0","bushLanding":"false"}

@param allowGlide
@text Allow Glide
@desc If true, collision detection for flying characters will use only current elevation and not target elevation.
@parent characters
@type Boolean
@default true

@param spriteOffset
@text Sprite Offset
@parent characters
@type Number
@min 0 @max 1
@decimals 2
@default 0.9

@param spacer|assets @text‏‏‎ ‎@desc ===============================================

@param assets
@text Assets

@param diagSymbol
@text Diagonal Sprite Symbol
@desc Character sheets with this symbol contain diagonal sprites. Leave blank to use diagonal sprites with all images.
@parent assets
@type Text
@default {d}

@param shadowTexture
@text Shadow Texture
@parent assets
@type file
@dir img/MV3D
@require 1
@default shadow

@param alphaMask
@text Bush Alpha Texture
@parent assets
@type file
@dir img/MV3D
@require 1
@default bushAlpha

@param errorTexture
@text Error Texture
@parent assets
@type file
@dir img/MV3D
@require 1
@default errorTexture

@param requiredImages
@text Other Required Images
@desc Specify additional images here to prevent them from being excluded during deployment.
@parent assets
@type file[]
@dir img/MV3D
@require 1
*/
/*~struct~RegionHeight:
@param regionId
@text Region Id
@type Number
@min 1 @max 255
@default 1

@param conf
@text Configuration Functions
@desc See tileset configuration for list of functions
@type Text
@default height(2)
*/
/*~struct~TTagHeight:
@param terrainTag
@text Terrain Tag
@type Number
@min 1 @max 7
@default 1

@param conf
@text Configuration Functions
@desc See tileset configuration for list of functions
@type Text
@default shape(flat),height(0)
*/
/*~struct~BoatStruct:
@param conf
@text Settings
@type Text
@default shadow(0.8,4),shape(sprite),scale(1),bush(false)

*/
/*~struct~AirshipStruct:
@param conf
@text Settings
@type Text
@default shadow(1,6),shape(sprite),scale(1),bush(false)

@param height
@text Elevation
@type Number
@decimals 1
@default 2.0

@param bushLanding
@text Land on Bush Tiles
@desc Whether the airship can land on bush tiles.
@type Boolean
@default false

*/!function(t){var e={};function i(a){if(e[a])return e[a].exports;var s=e[a]={i:a,l:!1,exports:{}};return t[a].call(s.exports,s,s.exports,i),s.l=!0,s.exports}i.m=t,i.c=e,i.d=function(t,e,a){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)i.d(a,s,function(e){return t[e]}.bind(null,s));return a},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=13)}([function(t,e,i){"use strict";var a=i(2),s=i(1);const r={util:s.h,setup(){if(this.setupParameters(),Object(a.C)(),this.canvas=document.createElement("canvas"),this.texture=PIXI.Texture.fromCanvas(this.canvas),this.texture.baseTexture.scaleMode=PIXI.SCALE_MODES.NEAREST,this.engine=new a.e(this.canvas,this.ANTIALIASING),this.scene=new a.t(this.engine),this.scene.clearColor.set(0,0,0,0),this.cameraStick=new a.x("cameraStick",this.scene),this.cameraNode=new a.x("cameraNode",this.scene),this.cameraNode.parent=this.cameraStick,this.camera=new a.h("camera",new a.z(0,0,0),this.scene),this.camera.parent=this.cameraNode,this.camera.fov=Object(s.i)(r.FOV),this.camera.minZ=.1,this.camera.maxZ=this.RENDER_DIST,this.scene.ambientColor=new a.b(1,1,1),this.scene.fogMode=a.f,this.map=new a.m("map",this.scene),this.cells={},this.characters=[],this.setupBlenders(),this.setupInput(),this.setupSpriteMeshes(),this.callFeatures("setup"),isNaN(this.LIGHT_LIMIT)){const t=BABYLON.Scene.prototype.sortLightsByPriority;BABYLON.Scene.prototype.sortLightsByPriority=function(){t.apply(this,arguments),r.updateAutoLightLimit()}}},updateCanvas(){this.canvas.width=Graphics._width*r.RES_SCALE,this.canvas.height=Graphics._height*r.RES_SCALE},render(){this.scene.render(),this.texture.update()},lastMapUpdate:0,update(){performance.now()-this.lastMapUpdate>1e3&&!this.mapUpdating&&(this.updateMap(),this.lastMapUpdate=performance.now()),this.updateAnimations(),this.updateCharacters(),this.intensiveUpdate(),this.updateBlenders(),this.updateInput();for(const t in this.cells)this.cells[t].update();this.callFeatures("update"),this.updateData()},loadData:(t,e)=>$gameVariables&&$gameVariables.mv3d&&t in $gameVariables.mv3d?$gameVariables.mv3d[t]:e,saveData(t,e){if(!$gameVariables)return console.warn(`MV3D: Couldn't save data ${t}:${e}`);$gameVariables.mv3d||($gameVariables.mv3d={}),$gameVariables.mv3d[t]=e},updateCameraMode(){let t=!1;this.cameraMode.startsWith("O")?this.camera.mode!==a.n&&(this.camera.mode=a.n,t=!0):this.camera.mode!==a.o&&(this.camera.mode=a.o,t=!0),t&&(this.updateBlenders(!0),this.callFeatures("updateCameraMode"),this.updateParameters())},get cameraMode(){return this.loadData("cameraMode",this.CAMERA_MODE).toUpperCase()},set cameraMode(t){t=String(t).toUpperCase().startsWith("O")?"ORTHOGRAPHIC":"PERSPECTIVE",this.saveData("cameraMode",t),this.updateBlenders(!0)},is1stPerson(t){const e=t?"currentValue":"targetValue";return this.getCameraTarget()===$gamePlayer&&this.blendCameraTransition[e]()<=0&&this.blendCameraDist[e]()<=0&&0===this.blendPanX[e]()&&0===this.blendPanY[e]()},isDisabled(){return this.loadData("disabled",this.getMapConfig("disabled",!r.ENABLED_DEFAULT))},disable(t=2){r.saveData("disabled",!0),$gamePlayer.reserveTransfer($gameMap.mapId(),$gamePlayer.x,$gamePlayer.y,$gamePlayer.direction(),t)},enable(t=2){r.saveData("disabled",!1),$gamePlayer.reserveTransfer($gameMap.mapId(),$gamePlayer.x,$gamePlayer.y,$gamePlayer.direction(),t),r.createCharacters()},loopCoords(t,e){if($gameMap.isLoopHorizontal()){const e=$gameMap.width(),i=this.cameraStick.x-e/2;t=(t-i).mod(e)+i}if($gameMap.isLoopVertical()){const t=$gameMap.height(),i=this.cameraStick.y-t/2;e=(e-i).mod(t)+i}return new a.y(t,e)},autoLightLimit(t){return isNaN(this.LIGHT_LIMIT)?Math.max(4,t):this.LIGHT_LIMIT},updateAutoLightLimit(){const t=this.autoLightLimit(r.scene.lights.length);for(const e of Object.values(r.materialCache))e.maxSimultaneousLights=t;for(const t of this.characters)t.material&&(t.material.maxSimultaneousLights=this.autoLightLimit(t.mesh.lightSources.length))},getFieldSize(t=r.blendCameraDist.currentValue()){const e=Math.tan(r.camera.fov/2)*t*2;return{width:e*r.engine.getAspectRatio(r.camera),height:e}},getScaleForDist(t=r.blendCameraDist.currentValue()){return Graphics.height/this.getFieldSize(t).height/48},getFovForDist:(t=r.blendCameraDist.currentValue(),e=Object(s.w)())=>2*Math.atan(e/2/t),getFrustrumHeight:(t=r.blendCameraDist.currentValue(),e=r.camera.fov)=>2*t*Math.tan(e/2),getScreenPosition(t,e=a.z.Zero()){const i=t.parent?t.parent.getWorldMatrix():a.j.Identity(),s=t instanceof a.z?t.add(e):t.position.add(e),n=a.z.Project(s,i,r.scene.getTransformMatrix(),r.camera.viewport);return{x:n.x*Graphics.width,y:n.y*Graphics.height,behindCamera:n.z>1}},getUnscaledMatrix(t){const e=t.getWorldMatrix(),i=new a.r,s=new a.z;return e.decompose(null,i,s),a.j.Compose(a.z.One(),i,s)},getTranslationMatrix(t){const e=t.getWorldMatrix(),i=a.z.Zero(),n=new a.z;return i.y=-Object(s.i)(r.blendCameraYaw.currentValue()),i.x=-Object(s.i)(r.blendCameraPitch.currentValue()-90),e.decompose(null,null,n),a.j.Compose(a.z.One(),i.toQuaternion(),n)},getRotationMatrix(t){const e=t.getWorldMatrix(),i=new a.r;return e.decompose(null,i,null),a.j.Compose(a.z.One(),i,a.z.Zero())}};window.mv3d=r,e.a=r},function(t,e,i){"use strict";i.d(e,"k",(function(){return h})),i.d(e,"p",(function(){return l})),i.d(e,"e",(function(){return c})),i.d(e,"f",(function(){return p})),i.d(e,"j",(function(){return d})),i.d(e,"r",(function(){return u})),i.d(e,"i",(function(){return m})),i.d(e,"o",(function(){return g})),i.d(e,"n",(function(){return _})),i.d(e,"q",(function(){return b})),i.d(e,"g",(function(){return C})),i.d(e,"v",(function(){return y})),i.d(e,"t",(function(){return T})),i.d(e,"u",(function(){return M})),i.d(e,"s",(function(){return v})),i.d(e,"w",(function(){return S})),i.d(e,"b",(function(){return E})),i.d(e,"c",(function(){return O})),i.d(e,"d",(function(){return I})),i.d(e,"a",(function(){return L})),i.d(e,"l",(function(){return x})),i.d(e,"m",(function(){return N}));var a=i(0);const{Vector2:s,Vector3:r,Color3:n,Color4:o}=window.BABYLON,h=t=>{if("number"==typeof t)return{r:(t>>16)/255,g:(t>>8&255)/255,b:(255&t)/255,a:1};if(t instanceof n)return t.toColor4();if(t instanceof o)return t;{const e=document.createElement("canvas");e.width=1,e.height=1;const i=e.getContext("2d");i.fillStyle=t,i.fillRect(0,0,1,1);const a=i.getImageData(0,0,1,1).data;return new o(a[0]/255,a[1]/255,a[2]/255,a[3]/255)}},l=(t,e)=>{if(""===e)return+t;const i=/^[+]/.test(e);return i&&(e=e.substr(1)),e=Number(e),Number.isNaN(e)?+t:i?+t+e:+e},c=t=>isNaN(t)?p(t):Number(t),p=t=>Boolean(d(t)),d=t=>{if(!t)return!1;"string"!=typeof t&&(t=String(t));const e=t.toUpperCase();return!d.values.includes(e)&&t};d.values=["OFF","FALSE","UNDEFINED","NULL","DISABLE","DISABLED"];const u=(t=0)=>new Promise(e=>setTimeout(e,t)),m=t=>t*Math.PI/180,g=t=>180*t/Math.PI,f=(t,e)=>Math.atan2(-e,t)-Math.PI/2,_=(t,e)=>g(f(t,e)),b=t=>y(Math.sin(t),1e15),C=t=>y(Math.cos(t),1e15),y=(t,e=1e15)=>Math.round(t*e)/e,T=()=>M(),M=()=>Game_Map.prototype.tileWidth(),v=()=>Game_Map.prototype.tileHeight(),S=()=>Graphics.height/48,E=new r(1,0,0),O=new r(0,1,0),I=new r(0,0,1),w=new s(0,0),A=new r(0,0,0),L=Math.PI,D=2*Math.PI,x=t=>{const e=function(){const e=arguments.length;return"function"==typeof t[e]?t[e].apply(this,arguments):"function"==typeof t.default?t.default.apply(this,arguments):void console.warn("Unsupported number of arguments.")};for(const i in t)e[i]=t[i].bind;return e},P=()=>!a.a.isDisabled(),N=(t,e,i,a=P)=>{const s=t[e],r=i(s),n=function(){return("function"==typeof a?a():a)?r.apply(this,arguments):s.apply(this,arguments)};return Object.defineProperty(n,"name",{value:`${e}<mv3d_override>`}),Object.defineProperty(r,"name",{value:`${e}<mv3d>`}),n.oldMethod=s,n.newMethod=r,t[e]=n},R={makeColor:h,hexNumber:t=>((t=String(t)).startsWith("#")&&(t=t.substr(1)),Number.parseInt(t,16)),relativeNumber:l,booleanString:p,falseString:d,booleanNumber:c,sleep:u,degtorad:m,radtodeg:g,sin:b,cos:C,unround:y,tileSize:T,tileWidth:M,tileHeight:v,viewWidth:()=>Graphics.width/48,viewHeight:S,pointtorad:f,pointtodeg:_,minmax:(t,e,i)=>Math.min(e,Math.max(t,i)),XAxis:E,YAxis:O,ZAxis:I,v2origin:w,v3origin:A,PI:L,PI2:D,overload:x,override:N,file:(t=a.a.MV3D_FOLDER,e)=>e.startsWith("/")?"."+e:e.startsWith("./")?e:(t.startsWith("/")?t="."+t:t.startsWith("./")||(t="./"+t),`${t}/${e}`)};e.h=R},function(t,e,i){"use strict";var a=i(0),s=i(1);function r(){n("shadowMapPixelShader"),n("depthPixelShader"),o("defaultPixelShader","vec4 color=vec4(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor+refractionColor,alpha);","vec3 mv3d_extra_emissiveColor = max(emissiveColor-1.,0.);\n\t\tvec4 color=vec4(clamp(finalDiffuse*baseAmbientColor+finalSpecular+reflectionColor+mv3d_extra_emissiveColor+refractionColor,0.0,1.0),alpha);")}function n(t){o(t,"if (texture2D(diffuseSampler,vUV).a<0.4)",`if (texture2D(diffuseSampler,vUV).a<${mv3d.ALPHA_CUTOFF})`)}function o(t,e,i){BABYLON.Effect.ShadersStore[t]=BABYLON.Effect.ShadersStore[t].replace(e,i)}i.d(e,"t",(function(){return l})),i.d(e,"e",(function(){return c})),i.d(e,"h",(function(){return p})),i.d(e,"u",(function(){return m})),i.d(e,"q",(function(){return g})),i.d(e,"y",(function(){return _})),i.d(e,"z",(function(){return b})),i.d(e,"r",(function(){return C})),i.d(e,"j",(function(){return y})),i.d(e,"b",(function(){return T})),i.d(e,"c",(function(){return M})),i.d(e,"p",(function(){return v})),i.d(e,"m",(function(){return S})),i.d(e,"x",(function(){return E})),i.d(e,"w",(function(){return O})),i.d(e,"v",(function(){return I})),i.d(e,"k",(function(){return L})),i.d(e,"A",(function(){return D})),i.d(e,"l",(function(){return x})),i.d(e,"s",(function(){return H})),i.d(e,"g",(function(){return B})),i.d(e,"a",(function(){return G})),i.d(e,"d",(function(){return j})),i.d(e,"o",(function(){return V})),i.d(e,"n",(function(){return z})),i.d(e,"f",(function(){return U})),i.d(e,"B",(function(){return W})),i.d(e,"i",(function(){return X})),i.d(e,"C",(function(){return tt}));const h=window.BABYLON,{Scene:l,Engine:c,FreeCamera:p,HemisphericLight:d,DirectionalLight:u,SpotLight:m,PointLight:g,ShadowGenerator:f,Vector2:_,Vector3:b,Quaternion:C,Matrix:y,Color3:T,Color4:M,Plane:v,Node:S,TransformNode:E,Texture:O,StandardMaterial:I,ShaderMaterial:w,Effect:A,Mesh:L,VertexData:D,MeshBuilder:x,AssetsManager:P,SceneSerializer:N,Sprite:R,SpriteManager:F,Ray:H}=h,{FRONTSIDE:B,BACKSIDE:G,DOUBLESIDE:j}=L,{PERSPECTIVE_CAMERA:V,ORTHOGRAPHIC_CAMERA:z}=h.Camera,{FOGMODE_NONE:$,FOGMODE_EXP:Y,FOGMODE_EXP2:k,FOGMODE_LINEAR:U}=l,W=h.Space.WORLD,X=h.Space.LOCAL;h.Space.BONE;O.prototype.crop=function(t=0,e=0,i=0,s=0,r=!1){const{width:n,height:o}=r?this.getBaseSize():this.getSize();if(i||(i=n-t),s||(s=o-e),a.a.EDGE_FIX&&(t+=a.a.EDGE_FIX,e+=a.a.EDGE_FIX,i-=2*a.a.EDGE_FIX,s-=2*a.a.EDGE_FIX),!r){const a=this.getSize(),r=this.getBaseSize(),n=r.width/a.width,o=r.height/a.height;t/=n,i/=n,e/=o,s/=o}this.uScale=i/n,this.vScale=s/o,this.uOffset=t/n,this.vOffset=1-e/o-this.vScale};const Z={x:{get(){return this.position?this.position.x:void 0},set(t){this.position&&(this.position.x=t)}},y:{get(){return this.position?-this.position.z:void 0},set(t){this.position&&(this.position.z=-t)}},z:{get(){return this.position?this.position.y:void 0},set(t){this.position&&(this.position.y=t)}}},Q={pitch:{get(){return this.rotation?-Object(s.o)(this.rotation.x):void 0},set(t){this.rotation&&(this.rotation.x=-Object(s.i)(t))}},yaw:{get(){return this.rotation?-Object(s.o)(this.rotation.y):void 0},set(t){this.rotation&&(this.rotation.y=-Object(s.i)(t))}},roll:{get(){return this.rotation?-Object(s.o)(this.rotation.z):void 0},set(t){this.rotation&&(this.rotation.z=-Object(s.i)(t))}}};Object.defineProperties(S.prototype,Z),Object.defineProperties(S.prototype,Q),Object.defineProperties(R.prototype,Z),Object.defineProperty(L.prototype,"order",{get(){return this._order},set(t){this._order=t,this._scene.sortMeshes()}});const K=(t,e)=>(0|t._order)-(0|e._order);l.prototype.sortMeshes=function(){this.meshes.sort(K)};const q=l.prototype.addMesh;l.prototype.addMesh=function(t){q.apply(this,arguments),"number"==typeof t._order&&this.sortMeshes()};const J=l.prototype.removeMesh;function tt(){r()}l.prototype.removeMesh=function(t){J.apply(this,arguments),this.sortMeshes()},T.prototype.toNumber=M.prototype.toNumber=function(){return 255*this.r<<16|255*this.g<<8|255*this.b},I.prototype._shouldTurnAlphaTestOn=function(t){return this.needAlphaTesting()}},function(t,e,i){"use strict";var a=i(0);a.a.features={},a.a.callFeature=function(t,e,...i){if(!this.featureEnabled(t))return;const a=this.features[t];e in a.methods&&a.methods[e](...i)},a.a.callFeatures=function(t,...e){for(const i in this.features)this.callFeature(i,t,...e)},a.a.featureEnabled=function(t){return t in this.features&&!!this.features[t].enabled()};a.a.Feature=class Feature{constructor(t,e,i=!0){Object.assign(this,{name:t,condition:i,methods:e}),a.a.features[t]=this}enabled(){return"function"==typeof this.condition?this.condition():Boolean(this.condition)}}},function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("path")},function(t,e,i){if(i(7),i(9),window.Imported&&Imported.YEP_SaveCore){const t=Scene_File.prototype.onLoadSuccess;Scene_File.prototype.onLoadSuccess=function(){t.apply(this,arguments),mv3d.needClearMap=!0}}},function(t,e,i){"use strict";i.r(e);var a=i(0);a.a["option-store"]={},a.a.options={},a.a.OPTION_RENDER_DIST&&(a.a.options["mv3d-renderDist"]={name:"Render Distance",min:a.a.OPTION_RENDER_DIST_MIN,max:a.a.OPTION_RENDER_DIST_MAX,increment:5,wrap:!1,apply(t){a.a.RENDER_DIST=t},default:a.a.RENDER_DIST}),a.a.OPTION_FOV&&(a.a.options["mv3d-fov"]={name:"FOV",min:a.a.OPTION_FOV_MIN,max:a.a.OPTION_FOV_MAX,increment:5,apply(t){a.a.FOV=t},default:a.a.FOV}),a.a.OPTION_MIPMAP&&(a.a.options["mv3d-mipmap"]={name:"Mipmapping",type:"bool",apply(t){a.a.MIPMAP=t,a.a.needReloadMap=!0},default:a.a.MIPMAP}),a.a.ENABLE_3D_OPTIONS&&i(8)},function(t,e,i){"use strict";i.r(e);var a=i(0),s=i(1);const r=Window_Options.prototype.makeCommandList;Window_Options.prototype.makeCommandList=function(){if(r.apply(this,arguments),a.a.ENABLE_3D_OPTIONS===a.a.enumOptionModes.SUBMENU&&Object.keys(a.a.options).length)this.addCommand("3D Options","mv3d-options");else if(a.a.ENABLE_3D_OPTIONS===a.a.enumOptionModes.ENABLE)for(const t in a.a.options)this.addCommand(a.a.options[t].name,t)};const n=Window_Options.prototype.statusText;Window_Options.prototype.statusText=function(t){const e=this.commandSymbol(t);this.getConfigValue(e);return"mv3d-options"===e?"":n.apply(this,arguments)},Object.defineProperty(ConfigManager,"mv3d-options",{get(){},set(t){SceneManager.push(Scene_3D_Options)},configurable:!0});const o=ConfigManager.makeData;ConfigManager.makeData=function(){const t=o.apply(this,arguments);return Object.assign(t,a.a["option-store"]),t};const h=ConfigManager.applyData;ConfigManager.applyData=function(t){h.apply(this,arguments);for(const e in a.a.options)e in t&&(a.a["option-store"][e]=t[e],a.a.options[e].apply(t[e]));a.a.updateParameters()};class Scene_3D_Options extends Scene_Options{createOptionsWindow(){this._optionsWindow=new Window_3D_Options,this._optionsWindow.setHandler("cancel",this.popScene.bind(this)),this.addWindow(this._optionsWindow)}terminate(){super.terminate(),a.a.updateParameters()}}class Window_3D_Options extends Window_Options{makeCommandList(){for(const t in a.a.options)this.addCommand(a.a.options[t].name,t)}}1===a.a.ENABLE_3D_OPTIONS&&Object(s.m)(Scene_Options.prototype,"terminate",t=>(function(){t.apply(this,arguments),a.a.updateParameters()}),!0),Window_Options.prototype._is_mv3d_option=function(t){return t in a.a.options},Window_Options.prototype._mv3d_cursor=function(t,e){const i=this.index(),s=this.commandSymbol(i);let r=this.getConfigValue(s);const n=a.a.options[s];if(n)if("bool"===n.type)this.changeValue(s,e>0);else{const i=n.min||0,a=n.values?n.values.length-1:n.max||1;r+=(n.increment||1)*e,t&&n.wrap||"ok"===t?(r>a&&(r=i),r<i&&(r=a)):r=r.clamp(i,a),this.changeValue(s,r)}},Object(s.m)(Window_Options.prototype,"statusText",t=>(function(e){const i=this.commandSymbol(e);if(!this._is_mv3d_option(i))return t.apply(this,arguments);const s=this.getConfigValue(i),r=a.a.options[i];return"bool"===r.type?this.booleanStatusText(s):r.values?r.values[s]:String(s)}),!0),Object(s.m)(Window_Options.prototype,"setConfigValue",t=>(function(e,i){if(!this._is_mv3d_option(e))return t.apply(this,arguments);a.a["option-store"][e]=i;const s=a.a.options[e];s.apply&&s.apply(i)}),!0),Object(s.m)(Window_Options.prototype,"getConfigValue",t=>(function(e){if(!this._is_mv3d_option(e))return t.apply(this,arguments);const i=a.a.options[e];let s=a.a["option-store"][e];return null==s&&(s=i.default||i.min||0),s}),!0),Object(s.m)(Window_Options.prototype,"cursorLeft",t=>(function(e){const i=this.commandSymbol(this.index());return this._is_mv3d_option(i)?this._mv3d_cursor(e,-1):t.apply(this,arguments)}),!0),Object(s.m)(Window_Options.prototype,"cursorRight",t=>(function(e){const i=this.commandSymbol(this.index());return this._is_mv3d_option(i)?this._mv3d_cursor(e,1):t.apply(this,arguments)}),!0),Object(s.m)(Window_Options.prototype,"processOk",t=>(function(){const e=this.index(),i=this.commandSymbol(e);if(!this._is_mv3d_option(i))return t.apply(this,arguments);let s=this.getConfigValue(i);const r=a.a.options[i];"bool"===r.type?this.changeValue(i,!s):this._mv3d_cursor("ok",1)}),!0)},function(t,e,i){"use strict";i.r(e);var a=i(0),s=i(1);Object.assign(a.a,{vehicleObstructed:(t,...e)=>vehicleObstructed.apply(t,e),tileCollision(t,e,i,s=!1,r=!1){if(!(t instanceof a.a.Character)){if(!t.mv3d_sprite)return!1;t=t.mv3d_sprite}const n="number"==typeof r?r:r?t.targetElevation:t.z,o=t.getCollisionHeight(n),h=this.getCollisionHeights(e,i);2==s&&(o.z1+=a.a.STAIR_THRESH,o.z2+=a.a.STAIR_THRESH);for(const n of h)if(o.z1<n.z2&&o.z2>n.z1)return 1!=s||!a.a.STAIR_THRESH||this.tileCollision(t,e,i,2,r);return!1},charCollision(t,e,i=!1,s=!1,r=s,n=!1){if(!(t instanceof a.a.Character)){if(!t.mv3d_sprite)return!1;t=t.mv3d_sprite}if(!(e instanceof a.a.Character)){if(!e.mv3d_sprite)return!1;e=e.mv3d_sprite}if(!(n||t.char._mv3d_hasCollide()&&e.char._mv3d_hasCollide()))return!1;const o="number"==typeof s?s:s?t.targetElevation:t.z,h="number"==typeof r?r:r?e.targetElevation:e.z,l=t.getCollisionHeight(o),c=n?e.getTriggerHeight(h):e.getCollisionHeight(h);return 2==i&&(l.z1+=a.a.STAIR_THRESH,l.z2+=a.a.STAIR_THRESH),!!(!n&&l.z1<c.z2&&l.z2>c.z1||n&&l.z1<=c.z2&&l.z2>=c.z1)&&(1!=i||!a.a.STAIR_THRESH||this.charCollision(t,e,2,s,r))},getPlatformFloatForCharacter(t,e,i,s={}){if(!(t instanceof a.a.Character)){if(!t.mv3d_sprite)return 0;t=t.mv3d_sprite}let r=a.a.getPlatformForCharacter(t,e,i,s).z2;if(t.hasFloat){const s=t.getCHeight();r+=a.a.getFloatHeight(e,i,t.z+Math.max(s,a.a.STAIR_THRESH),a.a.STAIR_THRESH>=s)}return r},getPlatformForCharacter(t,e,i,s={}){if(!(t instanceof a.a.Character)){if(!t.mv3d_sprite)return!1;t=t.mv3d_sprite}const r=t.getCHeight(),n=a.a.STAIR_THRESH>=r;return Object.assign(s,{char:t,gte:n}),this.getPlatformAtLocation(e,i,t.z+Math.max(r,a.a.STAIR_THRESH),s)},getPlatformAtLocation(t,e,i,s={}){const r=s.char,n=this.getCollisionHeights(t,e,s);n.push(...a.a.getEventsAt(t,e).filter(t=>{if(!(t.mv3d_sprite&&t._mv3d_isPlatform()&&t._mv3d_hasCollide()&&t.mv3d_sprite.visible))return!1;if(r){if(r.char===t||t.isMoving())return!1;let e=t.mv3d_sprite;for(;e=e.platformChar;)if(e===r||e===t.mv3d_sprite)return!1}return!0}).map(t=>t.mv3d_sprite.getCollisionHeight()));let o=n[0];for(const t of n)t.z2>o.z2&&(s.gte?t.z2<=i:t.z2<i)&&(o=t);return o},getEventsAt:(t,e)=>$gameMap.eventsXyNt(Math.round(t),Math.round(e)),isRampAt(t,e,i){const a=this.getTileData(t,e);let s=0;for(let r=0;r<4;++r){s+=this.getTileFringe(t,e,r),s+=this.getTileHeight(t,e,r);const n=this.getTileConfig(a[r],t,e,r);if(n.shape!==this.enumShapes.SLOPE)continue;const o=n.slopeHeight||1;if(i>=s-o&&i<=s)return{id:a[r],x:t,y:e,l:r,conf:n,z1:s-o,z2:s}}return!1},getRampData(t,e,i,s=null){const r=a.a.getTileId(t,e,i);if(s||(s=this.getTileConfig(r,t,e,i)),s.shape!==this.enumShapes.SLOPE)return!1;const n=a.a.getStackHeight(t,e,i);return{id:r,x:t,y:e,l:i,conf:s,z1:n-(s.slopeHeight||1),z2:n}},canPassRamp(t,e){if(5===t||t<=0||t>=10)return!0;const{dir:i}=a.a.getSlopeDirection(e.x,e.y,e.l,!0),s=$gameMap.roundXWithDirection(e.x,t),r=$gameMap.roundYWithDirection(e.y,t),n=this.isRampAt(s,r,i===t?e.z1:i===10-t?e.z2:(e.z1+e.z2)/2);if(n){const{dir:o}=a.a.getSlopeDirection(s,r,n.l,!0);return i!==t&&i!==10-t?i===o&&e.z1===n.z1&&e.z2===n.z2:i===o&&(i===t?e.z1===n.z2:e.z2===n.z1)}if(i!==t&&i!==10-t)return!1;const o=this.getPlatformAtLocation(s,r,(i===t?e.z1:e.z2)+a.a.STAIR_THRESH).z2;return Math.abs(o-(i===t?e.z1:e.z2))<=a.a.STAIR_THRESH}}),Game_CharacterBase.prototype._mv3d_isFlying=function(){return!!this.mv3d_sprite&&(this.mv3d_sprite.blendElevation.currentValue()>0||this.mv3d_sprite.hasConfig("zlock"))},Game_Vehicle.prototype._mv3d_isFlying=function(){return this.isAirship()||Game_CharacterBase.prototype._mv3d_isFlying.apply(this,arguments)},Game_Player.prototype._mv3d_isFlying=function(){return!(!this.isInVehicle()||!this.vehicle().isAirship())||Game_CharacterBase.prototype._mv3d_isFlying.apply(this,arguments)},Game_CharacterBase.prototype._mv3d_isPlatform=function(){return this.mv3d_sprite&&this.mv3d_sprite.getConfig("platform",a.a.WALK_ON_EVENTS)},Game_CharacterBase.prototype._mv3d_hasCollide=function(){const t=this.mv3d_sprite;return!(!t||!1===t.getConfig("collide"))&&(this._mv3d_isPlatform()||Boolean(t.getCHeight()))},window.Imported&&Imported.QMovement?i(10):PluginManager._scripts.includes("AltimitMovement")&&Game_CharacterBase.prototype.moveVector?i(11):i(12);const r=Game_CharacterBase.prototype.jump;Game_CharacterBase.prototype.jump=function(t,e){if(a.a.isDisabled())return r.apply(this,arguments);this.mv3d_jumpHeightStart=this.z||a.a.getWalkHeight(this.x,this.y),this.mv3d_jumpHeightEnd=a.a.getWalkHeight(this.x+t,this.y+e),r.apply(this,arguments)},Object(s.m)(Game_Map.prototype,"allTiles",t=>(function(t,e){return this.layeredTiles(t,e)}))},function(t,e,i){"use strict";i.r(e);var a=i(1),s=i(0);i(3);Object(a.m)(ColliderManager,"update",t=>(function(){this.hide()})),Object(a.m)(ColliderManager.container,"update",t=>(function(){this.visible&&t.apply(this,arguments)}),!0);let r={};function n(t,e,i,a){const s=new Box_Collider($gameMap.tileWidth(),$gameMap.tileHeight());return s.x=t*$gameMap.tileWidth(),s.y=e*$gameMap.tileHeight(),s.mv3d_collider=i,s.mv3d_collider_type=a,s}s.a.getQTileColliders=()=>r;const o={z1:-1/0,z2:1/0};function h(t,e){return!t.mv3d_collider||!e.mv3d_collider||l(t=t.mv3d_collider,e=e.mv3d_collider)}function l(t,e){return t.z1<e.z2&&t.z2>e.z1&&t.z1+s.a.STAIR_THRESH<e.z2&&t.z2+s.a.STAIR_THRESH>e.z1}Object(a.m)(Game_Map.prototype,"setupMapColliders",t=>(function(){this._tileCounter=0,r={};for(let e=0;e<this.width();e++)for(let i=0;i<this.height();i++){const a=e*this.tileWidth(),h=i*this.tileHeight(),l=this.tilesetFlags(),c=s.a.getTileData(e,i),p=s.a.getCollisionHeights(e,i,{layers:!0,slopeMin:!0}),d=r[[e,i]]=[];for(let t=0;t<p.length;++t)d[t]=n(e,i,p[t],"mv3d");r[[e,i,"x"]]=n(e,i,o,"mv3d_x");for(let n=0;n<c.length;++n){const d=l[c[n]],u=s.a.getTilePassage(c[n],e,i,n);if(u===s.a.enumPassage.THROUGH)continue;const m=s.a.getTileConfig(e,i,n);if(m.shape===s.a.enumShapes.SLOPE){const t=s.a.getRampData(e,i,n,m);let l=0;s.a.canPassRamp(2,t)||(l|=1),s.a.canPassRamp(4,t)||(l|=2),s.a.canPassRamp(6,t)||(l|=4),s.a.canPassRamp(8,t)||(l|=8),l+=1536;const c=s.a.getStackHeight(e,i,n),p=c-(m.slopeHeight||1);let d=QMovement.tileBoxes[l];const u=[e,i,n,"slope"].toString();if(r[u]=[],d){d[0].constructor!==Array&&(d=[d]);for(const t of d){const e=new Box_Collider(t[0]||0,t[1]||0,t[2],t[3]);e.slopeZ1=p,e.slopeZ2=c,e.moveTo(a,h),e.mv3d_collider=o,r[u].push(e)}}}let g;p.layers[n]&&((g=p.layers[n]).passage=u,g.l=n);let f=this.getMapCollider(e,i,d);if(f)if((f=Array.from(f))[0].constructor===Array)for(var t=0;t<f.length;t++)f[t].mv3d_collider=g,f[t].isRegionCollider=!0,this.makeTileCollider(e,i,d,f[t],t);else f.mv3d_collider=g,f.isQCollider=!0,this.makeTileCollider(e,i,d,f,0)}}}),!0),Object(a.m)(Game_Map.prototype,"makeTileCollider",t=>(function(e,i,a,s,r){const n=t.apply(this,arguments);return s.mv3d_collider&&(s.isRegionCollider?n.mv3d_collider=o:s.isQCollider?(n.mv3d_collider={z1:-1/0,z2:1/0},s.mv3d_collider&&(n.mv3d_collider.l=s.mv3d_collider.l)):n.mv3d_collider=s.mv3d_collider),n}),!0),Object(a.m)(Game_CharacterBase.prototype,"collider",t=>(function(){const e=t.apply(this,arguments);return this.mv3d_sprite?(e.mv3d_collider||(Object.defineProperty(e,"mv3d_collider",{configurable:!0,value:this.mv3d_sprite.getCollider()}),Object.defineProperty(e,"mv3d_triggerCollider",{configurable:!0,value:this.mv3d_sprite.getTriggerCollider()})),e):e})),Object(a.m)(ColliderManager,"getCollidersNear",t=>(function(e,i,n){let o=!1;const l=t.call(this,e,t=>{if(!1===h(e,t))return!1;if(e.mv3d_collider){const i=Math.round(t.x/QMovement.tileSize),a=Math.round(t.y/QMovement.tileSize);if(e.mv3d_collider.char){if(e.mv3d_collider.char.getPlatform(i,a).char)return!1}if(t.mv3d_collider){if(!s.a.getTileLayers(i,a,e.mv3d_collider.z1+s.a.STAIR_THRESH).includes(t.mv3d_collider.l))return!1}}if(i){const e=i(t);return"break"===e&&(o=!0),e}return!0},n);if(o)return l;const c=(e.x+e._offset.x-1)/QMovement.tileSize,p=(e.y+e._offset.y-1)/QMovement.tileSize,d=(e.x+e._offset.x+e.width+1)/QMovement.tileSize,u=(e.y+e._offset.y+e.height+1)/QMovement.tileSize;if(e.mv3d_collider)for(let t=Math.floor(c);t<Math.ceil(d);++t)for(let n=Math.floor(p);n<Math.ceil(u);++n){const o=r[[t,n]],c=r[[t,n,"x"]];let p=null,d=!1;const u=s.a.getTileLayers(t,n,e.mv3d_collider.z1+s.a.STAIR_THRESH);for(const e of u){s.a.getTilePassage(t,n,e)===s.a.enumPassage.WALL&&(d=!0);const i=[t,n,e,"slope"].toString();i in r&&(p=r[i])}let m=!1;if(c&&e.mv3d_collider.char){const r=e.mv3d_collider.char,o={slopeMin:!0},h=r.getPlatform(t,n,o);if(o.platform=h,r.falling&&!r.char._mv3d_isFlying())m=!0;else if(d&&!h.char)m=!0;else if(!p||r.platform.char||h.char)s.a.WALK_OFF_EDGE||r.char._mv3d_isFlying()||r.platform&&r.platform.isSlope||!(Object(a.v)(Math.abs(r.getPlatformFloat(t,n,o)-r.targetElevation))>s.a.STAIR_THRESH)||(m=!0);else for(const t of p){if(s.a.WALK_OFF_EDGE&&r.z>t.slopeZ1)continue;let e=!0;if(i&&(e=i(t)),!1===e);else if(l.push(t),"break"===e)return l}if(m){let t=!0;if(i&&(t=i(c)),!1!==t){if(l.push(c),"break"===t)return l;continue}}}if(o)for(let t=0;t<o.length;++t)if(h(e,o[t]))if(i){const e=i(o[t]);if(!1!==e&&l.push(o[t]),"break"===e)return l}else l.push(o[t])}return l})),Object(a.m)(ColliderManager,"getCharactersNear",t=>(function(e,i){return t.call(this,e,t=>{const a=t.mv3d_sprite;if(!a)return!0;const s=e.mv3d_collider,r=$gameTemp._mv3d_Q_getCharactersTriggerHeight?a.getTriggerHeight():a.getCollisionHeight();return!s||!r||!1!==l(s,r)&&(!i||i(t))})})),Object(a.m)(Game_Player.prototype,"startMapEvent",t=>(function(e,i,a,s){$gameTemp._mv3d_Q_getCharactersTriggerHeight=!0,t.apply(this,arguments),$gameTemp._mv3d_Q_getCharactersTriggerHeight=!1})),s.a.Character.prototype.getPlatform=function(t=this.char._realX,e=this.char._realY,i={}){const a=(t-.5)*QMovement.tileSize,r=(e-.5)*QMovement.tileSize,n=this.char.collider(),o=(a+n._offset.x+1)/QMovement.tileSize,h=(r+n._offset.y+1)/QMovement.tileSize,l=(a+n._offset.x+n.width-1)/QMovement.tileSize,c=(r+n._offset.y+n.height-1)/QMovement.tileSize;return[s.a.getPlatformForCharacter(this,o,h,i),s.a.getPlatformForCharacter(this,l,h,i),s.a.getPlatformForCharacter(this,l,c,i),s.a.getPlatformForCharacter(this,o,c,i)].reduce((t,e)=>t.z2>=e.z2?t:e)},s.a.getEventsAt=function(t,e){let i;try{i=ColliderManager._characterGrid[Math.round(t)][Math.round(e)]}catch(t){return[]}return i?i.filter(t=>t instanceof Game_Event&&!t.isThrough()):[]},s.a.setDestination=function(t,e){$gameTemp.setPixelDestination(Math.round(t*$gameMap.tileWidth()),Math.round(e*$gameMap.tileHeight()))};const c=Game_Player.prototype.clearMouseMove;Game_Player.prototype.clearMouseMove=function(){c.apply(this,arguments),this._pathfind&&this.clearPathfind()};const p={1:[4,2],3:[6,2],7:[4,8],9:[6,8]},d=t=>(function(t){if($gameMap.offGrid())this.mv3d_QMoveRadian(t);else if((t=s.a.transformDirection(t))%2){const e=p[t];this.moveDiagonally(e[0],e[1])}else this.moveStraight(t)});Object(a.m)(Game_Player.prototype,"moveInputHorizontal",d),Object(a.m)(Game_Player.prototype,"moveInputVertical",d),Object(a.m)(Game_Player.prototype,"moveInputDiagonal",d),Game_Player.prototype.mv3d_QMoveRadian=function(t,e=this.moveTiles()){this.moveRadian(-Object(a.i)(s.a.blendCameraYaw.currentValue()+90+s.a.dirToYaw(t)),e)},Object(a.m)(Game_Character.prototype,"moveRadian",t=>(function(e,i){t.apply(this,arguments);const r=s.a.yawToDir(Object(a.o)(-e)-90,!0);this.mv3d_setDirection(r)})),Object(a.m)(Game_Character.prototype,"moveDiagonally",t=>(function(e,i){t.apply(this,arguments);const a=5+3*(Math.floor((i-1)/3)-1)+((e-1)%3-1);this.mv3d_setDirection(a)})),Game_Follower.prototype.updateMoveList&&Object(a.m)(Game_Follower.prototype,"updateMoveList",t=>(function(){const e=this._moveList[0];t.apply(this,arguments),e&&this.mv3d_setDirection(e[3])}))},function(t,e,i){"use strict";i.r(e);var a=i(1);function s(t,e){return t=t.getCollisionHeight(),e=e.getCollisionHeight(),t.z1===t.z2||e.z1===e.z2?t.z1<=e.z2&&t.z2>=e.z1:t.z1<e.z2&&t.z2>e.z1}Object(a.m)(Game_Player.prototype,"moveByInput",t=>(function(){$gameTemp._mv3d_altimit_moveByInput=!0,t.apply(this,arguments),$gameTemp._mv3d_altimit_moveByInput=!1})),mv3d.getInputDirection=function(){return mv3d.DIR8MOVE?Input.dir8:Input.dir4},Object(a.m)(Game_Player.prototype,"moveVector",t=>(function(e,i){if($gameTemp._mv3d_altimit_moveByInput&&!this._touchTarget){const t=e,s=i,r=Object(a.i)(mv3d.blendCameraYaw.currentValue());e=Object(a.g)(r)*t+Object(a.q)(r)*s,i=-Object(a.q)(r)*t+Object(a.g)(r)*s}this.mv3d_sprite&&this.mv3d_sprite.platform&&this.mv3d_sprite.platform.isSlope&&(Math.abs(e)>Math.abs(i)?(e=Math.round(this._x)-this._x+Math.sign(e),i=Math.round(this._y)-this._y):(e=Math.round(this._x)-this._x,i=Math.round(this._y)-this._y+Math.sign(i)),$gamePlayer._touchTarget&&($gamePlayer._touchTarget.x=Math.round($gamePlayer._touchTarget.x),$gamePlayer._touchTarget.y=Math.round($gamePlayer._touchTarget.y))),t.call(this,e,i)})),Object(a.m)(Game_CharacterBase.prototype,"setDirectionVector",t=>(function(t,e){this.mv3d_setDirection(mv3d.yawToDir(Object(a.n)(t,e),!0))})),Object(a.m)(Game_CharacterBase.prototype,"moveVectorMap",t=>(function(e,i,s,r,n,o){t.apply(this,arguments);const h=e.mv3d_sprite;if(!h)return;const l=Math.floor(e.x+i.x),c=Math.floor(e.y+i.y),p=Math.floor(e.x+r.x+i.aabbox.left),d=Math.ceil(e.x+r.x+i.aabbox.right),u=Math.floor(e.y+r.y+i.aabbox.top),m=Math.ceil(e.y+r.y+i.aabbox.bottom);for(let t=p;t<d;++t)for(let e=u;e<m;++e){const i=Input._makeNumpadDirection(Math.sign(t-l),Math.sign(e-c));let s;if((s=mv3d.isRampAt(t,e,h.z))&&mv3d.canPassRamp(10-i,s))continue;const n=$gameMap.roundXWithDirection(t,10-i),o=$gameMap.roundYWithDirection(e,10-i);if((s=mv3d.isRampAt(n,o,h.z))&&mv3d.canPassRamp(i,s))continue;let p=!1;if(this._mv3d_isFlying())(!mv3d.ALLOW_GLIDE&&mv3d.tileCollision(this,t,e,!0,!0)||mv3d.tileCollision(this,t,e,!0,!1))&&(p=!0);else if(h.falling)p=!0;else if(mv3d.tileCollision(this,t,e,!0,!0))p=!0;else if(!mv3d.WALK_OFF_EDGE){const i=mv3d.getPlatformFloatForCharacter(this,t,e);Object(a.v)(Math.abs(i-h.targetElevation))>mv3d.STAIR_THRESH&&(p=!0)}p&&(t!==l&&(r.x=0),e!==c&&(r.y=0))}})),Object(a.m)(Game_CharacterBase.prototype,"moveVectorCharacters",t=>(function(e,i,a,s,r){const n=this.mv3d_sprite;if(!n)return t.apply(this,arguments);const o=n.getCollisionHeight();return a=a.filter(t=>{const e=t.mv3d_sprite;if(!e)return!0;const i=e.getCollisionHeight();return o.z1<i.z2&&o.z2>i.z1}),t.call(this,e,i,a,s,r)})),mv3d.Character.prototype.getPlatform=function(t=this.char._realX,e=this.char._realY,i={}){const a=this.char.collider();if(0===a.type){t+=a.x-.5,e+=a.y-.5;const s=.95*a.radius,r=[mv3d.getPlatformForCharacter(this,t,e),mv3d.getPlatformForCharacter(this,t,e-s,i),mv3d.getPlatformForCharacter(this,t-s,e,i),mv3d.getPlatformForCharacter(this,t,e+s,i),mv3d.getPlatformForCharacter(this,t+s,e,i)],n=[-1/0,mv3d.getPlatformForCharacter(this,t-s*Math.SQRT1_2,e-s*Math.SQRT1_2,i),mv3d.getPlatformForCharacter(this,t-s*Math.SQRT1_2,e+s*Math.SQRT1_2,i),mv3d.getPlatformForCharacter(this,t+s*Math.SQRT1_2,e+s*Math.SQRT1_2,i),mv3d.getPlatformForCharacter(this,t+s*Math.SQRT1_2,e-s*Math.SQRT1_2,i)].filter(t=>t.z2<=this.z);return r.concat(n).reduce((t,e)=>t.z2>=e.z2?t:e)}{t-=.5,e-=.5;const s={l:.99*a.aabbox.left,r:.99*a.aabbox.right,t:.99*a.aabbox.top,b:.99*a.aabbox.bottom};return[mv3d.getPlatformForCharacter(this,t,e),mv3d.getPlatformForCharacter(this,t+s.l,e+s.t,i),mv3d.getPlatformForCharacter(this,t+s.l,e+s.b,i),mv3d.getPlatformForCharacter(this,t+s.r,e+s.t,i),mv3d.getPlatformForCharacter(this,t+s.r,e+s.b,i)].reduce((t,e)=>t.z2>=e.z2?t:e)}},mv3d.getEventsAt=function(t,e){return t=Math.round(t),e=Math.round(e),$gameMap.events().filter(i=>{if(i.isThrough())return!1;const{x:a,y:s}=i,{left:r,right:n,top:o,bottom:h}=i.collider().aabbox;return a+r<t+1&&a+n>t&&s+o<e+1&&s+h>e})},Object(a.m)(Game_Map.prototype,"events",t=>(function(){const e=t.apply(this,arguments);if(!$gameTemp._mv3d_altimit_eventsHeightFilter)return e;delete $gameTemp._mv3d_altimit_eventsHeightFilter;const i=$gamePlayer.mv3d_sprite;return i?e.filter(t=>{const e=t.mv3d_sprite;return!e||s(e,i)}):e})),Object(a.m)(Game_Event.prototype,"checkEventTriggerTouch",t=>(function(){const e=this.mv3d_sprite,i=$gamePlayer.mv3d_sprite;return!(e&&i&&!s(e,i))&&t.apply(this,arguments)}));const r=t=>(function(){return $gameTemp._mv3d_altimit_eventsHeightFilter=!0,t.apply(this,arguments)});Object(a.m)(Game_Player.prototype,"checkEventTriggerHere",r),Object(a.m)(Game_Player.prototype,"checkEventTriggerThere",r)},function(t,e,i){"use strict";i.r(e);var a=i(0),s=i(1);const r=Game_CharacterBase.prototype.canPass;function n(t,e,i,s){return e.some(e=>{const r=e._mv3d_isPlatform();if(a.a.WALK_OFF_EDGE&&!r){const r=a.a.getPlatformForCharacter(t,i,s).z2;if(a.a.charCollision(t,e,!1,r))return!0}return a.a.charCollision(t,e,r,!0)})}Game_CharacterBase.prototype.canPass=function(t,e,i){return!!r.apply(this,arguments)&&(a.a.isDisabled()||this.isDebugThrough()||this.isThrough(),!0)};const o=t=>(function(t,e){return n(this,$gameMap.eventsXyNt(t,e),t,e)});Object(s.m)(Game_CharacterBase.prototype,"isCollidedWithEvents",o),Object(s.m)(Game_Event.prototype,"isCollidedWithEvents",o),Object(s.m)(Game_Event.prototype,"isCollidedWithPlayerCharacters",t=>(function(t,e){if($gamePlayer.isThrough())return!1;return n(this,[$gamePlayer,...$gamePlayer.followers()._data.filter(t=>t.isVisible()&&t.mv3d_sprite&&t.mv3d_sprite.visible)].filter(i=>i.pos(t,e)),t,e)})),Object(s.m)(Game_CharacterBase.prototype,"isCollidedWithVehicles",t=>(function(t,e){const i=$gameMap.boat(),s=$gameMap.ship();return i.posNt(t,e)&&a.a.charCollision(this,i,i._mv3d_isPlatform(),!0)||s.posNt(t,e)&&a.a.charCollision(this,s,s._mv3d_isPlatform(),!0)}));const h=t=>(function(e,i,r){const n=this.mv3d_sprite;if(!n)return t.apply(this,arguments);$gameTemp._mv3d_collision_char=n;let o,h=!t.apply(this,arguments);if(delete $gameTemp._mv3d_collision_char,h)return!1;if((o=a.a.isRampAt(e,i,n.z))&&a.a.canPassRamp(r,o))return!0;var l=$gameMap.roundXWithDirection(e,r),c=$gameMap.roundYWithDirection(i,r);if((o=a.a.isRampAt(l,c,n.z))&&a.a.canPassRamp(10-r,o))return!0;if(this._mv3d_isFlying()){if(!a.a.ALLOW_GLIDE&&a.a.tileCollision(this,l,c,!0,!0)||a.a.tileCollision(this,l,c,!0,!1))return!1}else{if(a.a.tileCollision(this,l,c,!0,!0))return!1;if(n.falling)return!1;if(!a.a.WALK_OFF_EDGE){const t=a.a.getPlatformFloatForCharacter(this,l,c);if(Object(s.v)(Math.abs(t-n.targetElevation))>a.a.STAIR_THRESH)return!1}}return!0});Object(s.m)(Game_CharacterBase.prototype,"isMapPassable",h),Object(s.m)(Game_Vehicle.prototype,"isMapPassable",h),Object(s.m)(Game_Player.prototype,"startMapEvent",t=>(function(t,e,i,s){$gameMap.isEventRunning()||$gameMap.eventsXy(t,e).filter(t=>a.a.charCollision(this,t,!1,!1,!1,!0)).forEach(t=>{t.isTriggerIn(i)&&t.isNormalPriority()===s&&t.start()})}));const l=Game_Map.prototype.checkPassage;Game_Map.prototype.checkPassage=function(t,e,i){if(!("_mv3d_collision_char"in $gameTemp))return l.apply(this,arguments);const s=$gameTemp._mv3d_collision_char,r=s.getCHeight(),n=s.z+Math.max(r,a.a.STAIR_THRESH),o=a.a.getPlatformForCharacter(s,t,e);if(o.char)return!0;var h=this.tilesetFlags();const c=a.a.getTileLayers(t,e,n,a.a.STAIR_THRESH>=r),p=a.a.getTileData(t,e);for(var d=c.length-1;d>=0;--d){const s=c[d];if(15&i){const i=a.a.getTileConfig(t,e,s);if("pass"in i){if(i.pass===a.a.enumPassage.THROUGH)continue;if(i.pass===a.a.enumPassage.FLOOR)return!0;if(i.pass===a.a.enumPassage.WALL)return!1}}const r=h[p[s]];if(0==(16&r)){if(0==(r&i))return!0;if((r&i)===i)return!1}}return!1};const c=()=>!a.a.isDisabled()||a.a.DIR8MOVE&&a.a.DIR8_2D;Object(s.m)(Game_Player.prototype,"moveStraight",t=>(function(e){if(!a.a.DIR8MOVE)return t.apply(this,arguments);switch(e){case 1:this.moveDiagonally(4,2);break;case 3:this.moveDiagonally(6,2);break;case 7:this.moveDiagonally(4,8);break;case 9:this.moveDiagonally(6,8);break;default:t.apply(this,arguments)}}),c),Object(s.m)(Game_Character.prototype,"moveDiagonally",t=>(function(e,i){t.apply(this,arguments);let s=!1;if(this.isMovementSucceeded()?s=!0:a.a.DIR8SMART&&(this.moveStraight(e),this.isMovementSucceeded()||(this.moveStraight(i),this.isMovementSucceeded()||(s=!0))),s){const t=5+3*(Math.floor((i-1)/3)-1)+((e-1)%3-1);this.mv3d_setDirection(t)}}),c),Object(s.m)(Game_CharacterBase.prototype,"canPassDiagonally",t=>(function(e,i,s,r){const n=$gameMap.roundXWithDirection(e,s),o=$gameMap.roundYWithDirection(i,r);return!a.a.tileCollision(this,e,o,!0,!0)&&!a.a.tileCollision(this,n,i,!0,!0)&&t.apply(this,arguments)}));const p=t=>(function(){const e=this._realX,i=this._realY;t.apply(this,arguments),Math.abs(e-this._realX)>2||Math.abs(i-this._realY)>2||(this._realX=e,this._realY=i)});Object(s.m)(Game_Follower.prototype,"moveDiagonally",p,c),Object(s.m)(Game_Follower.prototype,"moveStraight",p,c),Object(s.m)(Game_CharacterBase.prototype,"distancePerFrame",t=>(function(){const e=t.apply(this,arguments);return this._mv3d_direction%2?e*Math.SQRT1_2:e}),c);const d=Game_Map.prototype.isAirshipLandOk;Game_Map.prototype.isAirshipLandOk=function(t,e){return a.a.isDisabled()?d.apply(this,arguments):a.a.AIRSHIP_SETTINGS.bushLanding?this.checkPassage(t,e,15):d.apply(this,arguments)};const u=Game_Player.prototype.updateVehicleGetOn;Game_Player.prototype.updateVehicleGetOn=function(){if(a.a.isDisabled())return u.apply(this,arguments);const t=this.vehicle(),e=a.a.loadData(`${t._type}_speed`,t._moveSpeed);t.setMoveSpeed(e),u.apply(this,arguments),this.setThrough(!1)};const m=Game_Player.prototype.getOnVehicle;Game_Player.prototype.getOnVehicle=function(){if(a.a.isDisabled())return m.apply(this,arguments);var t=this.direction(),e=Math.round(this.x),i=Math.round(this.y),s=$gameMap.roundXWithDirection(e,t),r=$gameMap.roundYWithDirection(i,t);return $gameMap.airship().pos(e,i)&&a.a.charCollision(this,$gameMap.airship(),!1,!1,!1,!0)?this._vehicleType="airship":$gameMap.ship().pos(s,r)&&a.a.charCollision(this,$gameMap.ship())?this._vehicleType="ship":$gameMap.boat().pos(s,r)&&a.a.charCollision(this,$gameMap.boat())&&(this._vehicleType="boat"),this.isInVehicle()&&(this._vehicleGettingOn=!0,this.isInAirship()||this.forceMoveForward(),this.gatherFollowers()),this._vehicleGettingOn},Object(s.m)(Game_Vehicle.prototype,"isLandOk",t=>(function(e,i,s){$gameTemp._mv3d_collision_char=$gamePlayer.mv3d_sprite;let r=t.apply(this,arguments);if(delete $gameTemp._mv3d_collision_char,this.isAirship())return r;var n=$gameMap.roundXWithDirection(e,s),o=$gameMap.roundYWithDirection(i,s);const h=a.a.getPlatformForCharacter($gamePlayer,n,o);h.char&&(r=!0);const l=Math.abs(h.z2-this.z);return r&&l<Math.max($gamePlayer.mv3d_sprite.getCHeight(),this.mv3d_sprite.getCHeight())}))},function(t,e,i){"use strict";i.r(e);var a=i(0),s=i(2),r=i(1);const n=Graphics._createCanvas;Graphics._createCanvas=function(){a.a.setup(),a.a.updateCanvas(),n.apply(this,arguments)};const o=Graphics._updateAllElements;Graphics._updateAllElements=function(){o.apply(this,arguments),a.a.updateCanvas()};const h=Graphics.render;Graphics.render=function(){a.a.render(),h.apply(this,arguments)};const l=Scene_Map.prototype.update;Scene_Map.prototype.update=function(){l.apply(this,arguments),a.a.isDisabled()||a.a.update()};const c=ShaderTilemap.prototype.renderWebGL;ShaderTilemap.prototype.renderWebGL=function(t){a.a.mapDisabled&&c.apply(this,arguments)};const p=Spriteset_Map.prototype.createTilemap;Spriteset_Map.prototype.createTilemap=function(){p.apply(this,arguments),a.a.mapDisabled=a.a.isDisabled(),a.a.mapDisabled||(this._tilemap.visible=!1,a.a.pixiSprite=new PIXI.Sprite(a.a.texture),a.a.pixiSprite.scale.set(1/a.a.RES_SCALE,1/a.a.RES_SCALE),this._baseSprite.addChild(a.a.pixiSprite))};const d=Sprite_Character.prototype.setCharacter;Sprite_Character.prototype.setCharacter=function(t){d.apply(this,arguments),Object.defineProperty(t,"mv_sprite",{value:this,configurable:!0})};const u=Game_Player.prototype.performTransfer;Game_Player.prototype.performTransfer=function(){const t=this._newMapId!==$gameMap.mapId();t&&($gameVariables.mv3d&&delete $gameVariables.mv3d.disabled,a.a.clearMap(),delete $gamePlayer._mv3d_z),u.apply(this,arguments),a.a.is1stPerson()&&a.a.blendCameraYaw.setValue(a.a.dirToYaw($gamePlayer.direction(),0))};const m=Scene_Map.prototype.onMapLoaded;Scene_Map.prototype.onMapLoaded=function(){Input.clear(),a.a.needClearMap?(a.a.clearMap(),a.a.needClearMap=!1):a.a.needReloadMap&&(a.a.reloadMap(),a.a.needReloadMap=!1),a.a.loadMapSettings(),m.apply(this,arguments),a.a.mapLoaded||(a.a.applyMapSettings(),a.a.isDisabled()?a.a.mapReady=!0:(a.a.mapReady=!1,a.a.loadMap())),a.a.updateBlenders(!0)};const g=Game_Map.prototype.setupBattleback;Game_Map.prototype.setupBattleback=function(){g.apply(this,arguments),a.a.loadTilesetSettings()};const f=Scene_Load.prototype.onLoadSuccess;Scene_Load.prototype.onLoadSuccess=function(){f.apply(this,arguments),a.a.needClearMap=!0};const _=Scene_Map.prototype.isReady;Scene_Map.prototype.isReady=function(){let t=_.apply(this,arguments);return t&&a.a.mapReady};const b=Scene_Title.prototype.start;Scene_Title.prototype.start=function(){b.apply(this,arguments),a.a.clearMap(),a.a.clearCameraTarget()};const C=SceneManager.initGraphics;SceneManager.initGraphics=function(){if(C.apply(this,arguments),!Graphics.isWebGL())throw new Error("MV3D requires WebGL")},SceneManager.preferableRendererType=function(){return Utils.isOptionValid("canvas")?"canvas":Utils.isOptionValid("webgl")?"webgl":Graphics.hasWebGL()?"webgl":"auto"};let y="mv3d";PluginManager._scripts.includes("mv3d")||PluginManager._scripts.includes("mv3d-babylon")&&(y="mv3d-babylon");const T=PluginManager.parameters(y);function M(t,e,i){return t in T?i?i(T[t]):T[t]:e}Object.assign(a.a,{enumOptionModes:{DISABLE:0,ENABLE:1,SUBMENU:2}}),Object.assign(a.a,{CAMERA_MODE:"PERSPECTIVE",ORTHOGRAPHIC_DIST:100,MV3D_FOLDER:"img/MV3D",ANIM_DELAY:Number(T.animDelay),ALPHA_CUTOFF:Math.max(.01,T.alphatest),EDGE_FIX:Number(T.edgefix)*Object(r.t)()/48,ANTIALIASING:Object(r.f)(T.antialiasing),FOV:Number(T.fov),RES_SCALE:M("resScale",1,Number)||1,WALL_HEIGHT:Number(T.wallHeight),TABLE_HEIGHT:Number(T.tableHeight),FRINGE_HEIGHT:Number(T.fringeHeight),CEILING_HEIGHT:Number(T.ceilingHeight),LAYER_DIST:Number(T.layerDist),ENABLED_DEFAULT:Object(r.f)(T.enabledDefault),EVENTS_UPDATE_NEAR:Object(r.f)(T.eventsUpdateNear),UNLOAD_CELLS:Object(r.f)(T.unloadCells),CELL_SIZE:Number(T.cellSize),RENDER_DIST:Number(T.renderDist),MIPMAP:Object(r.f)(T.mipmap),OPTION_MIPMAP:Object(r.f)(T.mipmapOption),OPTION_RENDER_DIST:M("renderDistOption",!0,r.f),OPTION_FOV:M("fovOption",!1,r.f),OPTION_RENDER_DIST_MIN:M("renderDistMin",10,Number),OPTION_RENDER_DIST_MAX:M("renderDistMax",100,Number),OPTION_FOV_MIN:M("fovMin",50,Number),OPTION_FOV_MAX:M("fovMax",100,Number),STAIR_THRESH:Number(T.stairThresh),WALK_OFF_EDGE:Object(r.f)(T.walkOffEdge),WALK_ON_EVENTS:Object(r.f)(T.walkOnEvents),GRAVITY:Number(T.gravity),FOG_COLOR:Object(r.k)(T.fogColor).toNumber(),FOG_NEAR:Number(T.fogNear),FOG_FAR:Number(T.fogFar),LIGHT_LIMIT:Number(T.lightLimit),LIGHT_HEIGHT:.5,LAMP_HEIGHT:.5,FLASHLIGHT_HEIGHT:.25,LIGHT_DECAY:1,LIGHT_DIST:3,LIGHT_ANGLE:60,FLASHLIGHT_EXTRA_ANGLE:10,FLASHLIGHT_INTENSITY_MULTIPLIER:2,REGION_DATA:{},_REGION_DATA:{},_REGION_DATA_MAP:{},TTAG_DATA:{},EVENT_HEIGHT:Number(T.eventHeight),BOAT_SETTINGS:JSON.parse(T.boatSettings),SHIP_SETTINGS:JSON.parse(T.shipSettings),AIRSHIP_SETTINGS:JSON.parse(T.airshipSettings),ALLOW_GLIDE:Object(r.f)(T.allowGlide),SPRITE_OFFSET:Number(T.spriteOffset)/2,ENABLE_3D_OPTIONS:a.a.enumOptionModes[T["3dMenu"].toUpperCase()],TEXTURE_SHADOW:T.shadowTexture||"shadow",TEXTURE_BUSHALPHA:T.alphaMask||"bushAlpha",TEXTURE_ERROR:T.errorTexture||"errorTexture",DIR8MOVE:Object(r.f)(T.dir8Movement),DIR8SMART:T.dir8Movement.includes("Smart"),DIR8_2D:!T.dir8Movement.includes("3D"),TURN_INCREMENT:Number(T.turnIncrement),WASD:Object(r.f)(T.WASD),KEYBOARD_PITCH:Object(r.f)(T.keyboardPitch),KEYBOARD_TURN:Object(r.j)(T.keyboardTurn),KEYBOARD_STRAFE:Object(r.j)(T.keyboardStrafe),YAW_SPEED:Number(T.yawSpeed)||90,PITCH_SPEED:Number(T.pitchSpeed)||90,TRIGGER_INFINITE:!Object(r.f)(T.heightTrigger),BACKFACE_CULLING:M("backfaceCulling",!0,r.f),CAMERA_COLLISION:M("cameraCollision",!0,r.f),DIAG_SYMBOL:M("diagSymbol","{d}",String),setupParameters(){this.REGION_DATA=new Proxy(this._REGION_DATA,{get:(t,e)=>e in this._REGION_DATA_MAP?this._REGION_DATA_MAP[e]:e in this._REGION_DATA?this._REGION_DATA[e]:void 0,set:(t,e,i)=>{t[e]=i},has:(t,e)=>e in this._REGION_DATA_MAP||e in this._REGION_DATA});for(let t of JSON.parse(T.regions)){t=JSON.parse(t);const e=this.readConfigurationFunctions(t.conf,this.tilesetConfigurationFunctions);this._REGION_DATA[t.regionId]=e}for(let t of JSON.parse(T.ttags))t=JSON.parse(t),this.TTAG_DATA[t.terrainTag]=this.readConfigurationFunctions(t.conf,this.tilesetConfigurationFunctions);this.EVENT_CHAR_SETTINGS=this.readConfigurationFunctions(T.eventCharDefaults,this.eventConfigurationFunctions),this.EVENT_OBJ_SETTINGS=this.readConfigurationFunctions(T.eventObjDefaults,this.eventConfigurationFunctions),this.EVENT_TILE_SETTINGS=this.readConfigurationFunctions(T.eventTileDefaults,this.eventConfigurationFunctions),this.BOAT_SETTINGS.big=Object(r.f)(this.BOAT_SETTINGS.big),this.SHIP_SETTINGS.big=Object(r.f)(this.SHIP_SETTINGS.big),this.AIRSHIP_SETTINGS.height=Number(this.AIRSHIP_SETTINGS.height),this.AIRSHIP_SETTINGS.big=Object(r.f)(this.AIRSHIP_SETTINGS.big),this.AIRSHIP_SETTINGS.bushLanding=Object(r.f)(this.AIRSHIP_SETTINGS.bushLanding),this.BOAT_SETTINGS.conf=this.readConfigurationFunctions(this.BOAT_SETTINGS.conf,this.eventConfigurationFunctions),this.SHIP_SETTINGS.conf=this.readConfigurationFunctions(this.SHIP_SETTINGS.conf,this.eventConfigurationFunctions),this.AIRSHIP_SETTINGS.conf=this.readConfigurationFunctions(this.AIRSHIP_SETTINGS.conf,this.eventConfigurationFunctions)},updateParameters(){this.updateRenderDist(),this.updateFov(),this.callFeatures("updateParameters")},updateRenderDist(){this.camera.mode===s.n?(this.camera.maxZ=this.renderDist,this.camera.minZ=-this.renderDist):(this.camera.maxZ=this.renderDist,this.camera.minZ=.1)},updateFov(){const t=this.blendCameraDist.currentValue()||.1,e=this.getFrustrumHeight(t,Object(r.i)(this.FOV)),i=this.getFovForDist(t,e/this.blendCameraZoom.currentValue());this.camera.fov=i}}),Object.defineProperties(a.a,{AMBIENT_COLOR:{get:()=>a.a.featureEnabled("dynamicShadows")?8947848:16777215},renderDist:{get(){return Math.min(this.RENDER_DIST,a.a.blendFogFar.currentValue()+7.5)}}});const v=t=>!(!(t.isEnabled()&&t.isVisible&&t.isPickable)||t.character);Object.assign(a.a,{cameraTargets:[],getCameraTarget(){return this.cameraTargets[0]},setCameraTarget(t,e){t?(this.cameraTargets.unshift(t),this.cameraTargets.length>2&&(this.cameraTargets.length=2),this.saveData("cameraTarget",this.getTargetString(t)),this.blendCameraTransition.value=1,this.blendCameraTransition.setValue(0,e)):this.cameraTargets.length=0},clearCameraTarget(){this.cameraTargets.length=0},resetCameraTarget(){this.clearCameraTarget(),this.setCameraTarget($gamePlayer,0)},rememberCameraTarget(){const t=this.loadData("cameraTarget");t&&this.setCameraTarget(this.targetChar(t),0)},setupBlenders(){this.blendFogColor=new ColorBlender("fogColor",this.FOG_COLOR),this.blendFogNear=new blenders_Blender("fogNear",this.FOG_NEAR),this.blendFogFar=new blenders_Blender("fogFar",this.FOG_FAR),this.blendCameraRoll=new blenders_Blender("cameraRoll",0),this.blendCameraRoll.cycle=360,this.blendCameraYaw=new blenders_Blender("cameraYaw",0),this.blendCameraYaw.cycle=360,this.blendCameraPitch=new blenders_Blender("cameraPitch",60),this.blendCameraPitch.min=0,this.blendCameraPitch.max=180,this.blendCameraDist=new blenders_Blender("cameraDist",10),this.blendCameraZoom=new blenders_Blender("cameraZoom",1),this.blendCameraDist.min=0,this.blendCameraHeight=new blenders_Blender("cameraHeight",.7),this.blendAmbientColor=new ColorBlender("ambientColor",this.AMBIENT_COLOR),this.blendPanX=new blenders_Blender("panX",0),this.blendPanY=new blenders_Blender("panY",0),this.blendCameraTransition=new blenders_Blender("cameraTransition",0)},updateBlenders(t){if(this.updateCameraMode(),this.cameraTargets.length||$gamePlayer&&(this.cameraTargets[0]=$gamePlayer),this.blendCameraTransition.update()&&this.cameraTargets.length>=2){const t=this.blendCameraTransition.currentValue();let e=this.cameraTargets[0],i=this.cameraTargets[1];this.cameraStick.x=e._realX*(1-t)+i._realX*t,this.cameraStick.y=e._realY*(1-t)+i._realY*t,e.mv3d_sprite&&i.mv3d_sprite?this.cameraStick.z=e.mv3d_sprite.z*(1-t)+i.mv3d_sprite.z*t:e.mv3d_sprite&&(this.cameraStick.z=e.mv3d_sprite.z)}else if(this.cameraTargets.length){let t=this.getCameraTarget();this.cameraStick.x=t._realX,this.cameraStick.y=t._realY,t.mv3d_sprite&&(this.cameraStick.z=t.mv3d_sprite.z)}if(this.blendPanX.update(),this.blendPanY.update(),this.cameraStick.x+=this.blendPanX.currentValue(),this.cameraStick.y+=this.blendPanY.currentValue(),t|this.blendCameraPitch.update()|this.blendCameraYaw.update()|this.blendCameraRoll.update()|this.blendCameraDist.update()|this.blendCameraHeight.update()|this.blendCameraZoom.update()|0!==$gameScreen._shake|(a.a.CAMERA_COLLISION&&$gamePlayer.mv3d_positionUpdated)){this.cameraNode.pitch=this.blendCameraPitch.currentValue()-90,this.cameraNode.yaw=this.blendCameraYaw.currentValue(),this.cameraNode.roll=this.blendCameraRoll.currentValue(),this.cameraNode.position.set(0,0,0);let t=this.blendCameraDist.currentValue();if(a.a.CAMERA_COLLISION){const e=(new s.z).copyFrom(this.cameraStick.position);e.y+=this.blendCameraHeight.currentValue()+.1;const i=new s.s(e,s.z.TransformCoordinates(a.a.camera.getTarget().negate(),a.a.getRotationMatrix(a.a.camera)),t),r=a.a.scene.multiPickWithRay(i,v);for(const e of r){if(!e.hit)continue;let i=e.pickedMesh.material;if(i&&(i.subMaterials&&(i=i.subMaterials[e.pickedMesh.subMeshes[e.subMeshId].materialIndex]),!i.mv3d_through)){t=e.distance;break}}null==this.camera.dist&&(this.camera.dist=t),this.camera.dist=this.camera.dist+(t-this.camera.dist)/2,t=this.camera.dist}if(this.cameraNode.translate(r.d,-t,s.i),this.camera.mode===s.n){const t=this.getFieldSize();this.camera.orthoLeft=-t.width/2,this.camera.orthoRight=t.width/2,this.camera.orthoTop=t.height/2,this.camera.orthoBottom=-t.height/2}else this.cameraNode.z<0&&(this.cameraNode.z=0);this.cameraNode.z+=this.blendCameraHeight.currentValue(),this.cameraNode.translate(r.b,-$gameScreen._shake/48,s.i),this.updateDirection(),this.updateFov()}t|this.blendFogColor.update()|this.blendFogNear.update()|this.blendFogFar.update()&&(a.a.hasAlphaFog?(this.scene.fogStart=this.blendFogNear.currentValue(),this.scene.fogEnd=this.blendFogFar.currentValue()):(this.scene.fogStart=Math.min(a.a.RENDER_DIST-1,this.blendFogNear.currentValue()),this.scene.fogEnd=Math.min(a.a.RENDER_DIST,this.blendFogFar.currentValue())),this.scene.fogColor.copyFromFloats(this.blendFogColor.r.currentValue()/255,this.blendFogColor.g.currentValue()/255,this.blendFogColor.b.currentValue()/255),a.a.updateClearColor(),a.a.updateRenderDist()),t|this.blendAmbientColor.update()&&this.scene.ambientColor.copyFromFloats(this.blendAmbientColor.r.currentValue()/255,this.blendAmbientColor.g.currentValue()/255,this.blendAmbientColor.b.currentValue()/255),this.callFeatures("blend",t)},updateClearColor(){$gameMap.parallaxName()||a.a.hasSkybox?a.a.hasAlphaFog?a.a.scene.clearColor.set(...a.a.blendFogColor.currentComponents(),0):a.a.scene.clearColor.set(0,0,0,0):a.a.scene.clearColor.set(...a.a.blendFogColor.currentComponents(),1)}});const S=Game_Map.prototype.changeParallax;Game_Map.prototype.changeParallax=function(){S.apply(this,arguments),a.a.updateClearColor()};class blenders_Blender{constructor(t,e){this.key=t,this.dfault=a.a.loadData(t,e),this.value=e,this.speed=1,this.max=1/0,this.min=-1/0,this.cycle=!1,this.changed=!1}setValue(t,e=0){let i=(t=Math.min(this.max,Math.max(this.min,t)))-this.value;if(i){if(this.saveValue(this.key,t),e||(this.changed=!0,this.value=t),this.cycle)for(;Math.abs(i)>this.cycle/2;)this.value+=Math.sign(i)*this.cycle,i=t-this.value;this.speed=Math.abs(i)/(60*e)}}currentValue(){return this.value}targetValue(){return this.loadValue(this.key)}defaultValue(){return this.dfault}update(){const t=this.targetValue();if(this.value===t)return!!this.changed&&(this.changed=!1,!0);const e=t-this.value;return this.speed>Math.abs(e)?this.value=t:this.value+=this.speed*Math.sign(e),!0}storageLocation(){return $gameVariables?($gameVariables.mv3d||($gameVariables.mv3d={}),$gameVariables.mv3d):(console.warn("MV3D: Couldn't get Blend storage location."),{})}loadValue(t){const e=this.storageLocation();return t in e?e[t]:this.dfault}saveValue(t,e){this.storageLocation()[t]=e}}class ColorBlender{constructor(t,e){this.dfault=e,this.r=new blenders_Blender(`${t}_r`,e>>16),this.g=new blenders_Blender(`${t}_g`,e>>8&255),this.b=new blenders_Blender(`${t}_b`,255&e)}setValue(t,e){this.r.setValue(t>>16,e),this.g.setValue(t>>8&255,e),this.b.setValue(255&t,e)}currentValue(){return this.r.value<<16|this.g.value<<8|this.b.value}targetValue(){return this.r.targetValue()<<16|this.g.targetValue()<<8|this.b.targetValue()}defaultValue(){return this.dfault}update(){let t=0;return t|=this.r.update(),t|=this.g.update(),t|=this.b.update(),Boolean(t)}get storageLocation(){return this.r.storageLocation}set storageLocation(t){this.r.storageLocation=t,this.g.storageLocation=t,this.b.storageLocation=t}currentComponents(){return[this.r.currentValue()/255,this.g.currentValue()/255,this.b.currentValue()/255]}targetComponents(){return[this.r.targetValue()/255,this.g.targetValue()/255,this.b.targetValue()/255]}}a.a.Blender=blenders_Blender,a.a.ColorBlender=ColorBlender,a.a.blendModes={[PIXI.BLEND_MODES.NORMAL]:BABYLON.Engine.ALPHA_COMBINE,[PIXI.BLEND_MODES.ADD]:BABYLON.Engine.ALPHA_ADD,[PIXI.BLEND_MODES.MULTIPLY]:BABYLON.Engine.ALPHA_MULTIPLY,[PIXI.BLEND_MODES.SCREEN]:BABYLON.Engine.ALPHA_SCREENMODE,NORMAL:BABYLON.Engine.ALPHA_COMBINE,ADD:BABYLON.Engine.ALPHA_ADD,MULTIPLY:BABYLON.Engine.ALPHA_MULTIPLY,SCREEN:BABYLON.Engine.ALPHA_SCREENMODE};i(3);let E=!1;function O(t,e,i){let s=void 0;return{configurable:!0,get:()=>null!=s?s:SceneManager._scene instanceof Scene_Map?a.a.isDisabled()?e:a.a.is1stPerson()?i:e:t,set(t){s=t}}}Object.assign(a.a,{updateInput(){const t=a.a.is1stPerson();E!==t&&(Input.clear(),E=t),a.a.updateInputCamera()},updateInputCamera(){if(this.isDisabled()||this.loadData("cameraLocked"))return;const t=this.is1stPerson();if(this.loadData("allowRotation",a.a.KEYBOARD_TURN)||t){const t=a.a.getTurnKey("left"),e=a.a.getTurnKey("right");if(a.a.TURN_INCREMENT>1){const i=this.blendCameraYaw.currentValue()!==this.blendCameraYaw.targetValue(),s=a.a.TURN_INCREMENT/a.a.YAW_SPEED;Input.isTriggered(t)||Input.isPressed(t)&&!i?this.blendCameraYaw.setValue(this.blendCameraYaw.targetValue()+a.a.TURN_INCREMENT,s):(Input.isTriggered(e)||Input.isPressed(e)&&!i)&&this.blendCameraYaw.setValue(this.blendCameraYaw.targetValue()-a.a.TURN_INCREMENT,s)}else{const i=a.a.YAW_SPEED/60;Input.isPressed(t)&&Input.isPressed(e)||(Input.isPressed(t)?this.blendCameraYaw.setValue(this.blendCameraYaw.targetValue()+i,.1):Input.isPressed(e)&&this.blendCameraYaw.setValue(this.blendCameraYaw.targetValue()-i,.1))}}if(this.loadData("allowPitch",a.a.KEYBOARD_PITCH)){const t=a.a.PITCH_SPEED/60;Input.isPressed("pageup")&&Input.isPressed("pagedown")||(Input.isPressed("pageup")?this.blendCameraPitch.setValue(Math.min(179,this.blendCameraPitch.targetValue()+t),.1):Input.isPressed("pagedown")&&this.blendCameraPitch.setValue(Math.max(1,this.blendCameraPitch.targetValue()-t),.1))}},getStrafeKey(t){if(a.a.is1stPerson())switch(a.a.KEYBOARD_STRAFE){case"QE":return"rot"+t;case"AD":return t;default:return!1}else switch(a.a.KEYBOARD_TURN){case"QE":return t;case"AD":return"rot"+t;default:return t}},getTurnKey(t){if(a.a.is1stPerson())switch(a.a.KEYBOARD_STRAFE){case"QE":return t;case"AD":return"rot"+t;default:return t}else switch(a.a.KEYBOARD_TURN){case"QE":return"rot"+t;case"AD":return t;default:return"rot"+t}}}),Object(r.m)(Input,"_signX",t=>(function(){if(!a.a.KEYBOARD_STRAFE&&a.a.is1stPerson())return 0;const t=a.a.getStrafeKey("left"),e=a.a.getStrafeKey("right");let i=0;return this.isPressed(t)&&--i,this.isPressed(e)&&++i,i})),a.a.setupInput=function(){if(!a.a.WASD)return;Object.assign(Input.keyMapper,{81:"rotleft",69:"rotright",87:"up",65:"left",83:"down",68:"right"});const t={rotleft:O("pageup","rotleft","rotleft"),rotright:O("pagedown","rotright","rotright")};Object.defineProperties(Input.keyMapper,{81:t.rotleft,69:t.rotright})};const I=Game_Player.prototype.getInputDirection;Game_Player.prototype.getInputDirection=function(){return a.a.isDisabled()?a.a.DIR8MOVE&&a.a.DIR8_2D?Input.dir8:I.apply(this,arguments):a.a.getInputDirection()},a.a.getInputDirection=function(){let t=a.a.DIR8MOVE?Input.dir8:Input.dir4;return a.a.transformDirection(t,a.a.blendCameraYaw.currentValue())};const w=t=>!!(t.isEnabled()&&t.isVisible&&t.isPickable)&&(!t.character||!t.character.isFollower&&!t.character.isPlayer),A=Scene_Map.prototype.processMapTouch;Scene_Map.prototype.processMapTouch=function(){if(a.a.isDisabled())return A.apply(this,arguments);if(TouchInput.isTriggered()||this._touchCount>0)if(TouchInput.isPressed()){if(0===this._touchCount||this._touchCount>=15){const t=a.a.scene.pick(TouchInput.x*a.a.RES_SCALE,TouchInput.y*a.a.RES_SCALE,w);t.hit&&a.a.processMapTouch(t)}this._touchCount++}else this._touchCount=0},a.a.processMapTouch=function(t){const e={x:t.pickedPoint.x,y:-t.pickedPoint.z},i=t.pickedMesh;i.character&&(e.x=i.character.x,e.y=i.character.y),a.a.setDestination(e.x,e.y)},a.a.setDestination=function(t,e){$gameTemp.setDestination(Math.round(t),Math.round(e))};const L=Game_Player.prototype.findDirectionTo;Game_Player.prototype.findDirectionTo=function(){const t=L.apply(this,arguments);if(a.a.isDisabled())return t;if(a.a.is1stPerson()&&t){let e=a.a.dirToYaw(t);a.a.blendCameraYaw.setValue(e,.25)}return t},Object.assign(a.a,{playerFaceYaw(){let t=this.yawToDir(a.a.blendCameraYaw.targetValue(),!0);$gamePlayer.mv3d_setDirection(t)},yawToDir(t=a.a.blendCameraYaw.targetValue(),e=a.a.DIR8){const i=e?45:90;for(t=Math.round(t/i)*i;t<0;)t+=360;for(;t>=360;)t-=360;switch(t){case 0:return 8;case 45:return 7;case 90:return 4;case 135:return 1;case 180:return 2;case 225:return 3;case 270:return 6;case 315:return 9;default:return 0}},dirToYaw(t){switch(t){case 3:return-135;case 6:return-90;case 9:return-45;case 8:return 0;case 7:return 45;case 4:return 90;case 1:return 135;case 2:return 180;default:return NaN}},transformDirection(t,e=this.blendCameraYaw.currentValue(),i=a.a.DIR8MOVE){return a.a.yawToDir(a.a.dirToYaw(t)+e,i)},transformFacing(t,e=this.blendCameraYaw.currentValue(),i=!1){return a.a.yawToDir(a.a.dirToYaw(t)-e,i)},updateDirection(){a.a.is1stPerson()&&a.a.playerFaceYaw()}});let D=0;Object(r.m)(Game_Player.prototype,"update",t=>(function(){t.apply(this,arguments),this._direction!==D&&(a.a.updateDirection(),D=this._direction)})),Object(r.m)(Game_Player.prototype,"moveStraight",t=>(function(){t.apply(this,arguments),a.a.updateDirection()})),Object(r.m)(Game_Player.prototype,"direction",t=>(function(){return a.a.is1stPerson()&&this.isMoving()&&!this.isDirectionFixed()?a.a.yawToDir(a.a.blendCameraYaw.targetValue(),!1):t.apply(this,arguments)}));const x=Game_CharacterBase.prototype.setDirection;Game_CharacterBase.prototype.setDirection=function(){x.apply(this,arguments),this._mv3d_direction=this._direction},Game_CharacterBase.prototype.mv3d_setDirection=function(t){this.isDirectionFixed()||(this._direction=a.a.yawToDir(a.a.dirToYaw(t),!1),a.a.DIR8MOVE?this._mv3d_direction=t:this._mv3d_direction=this._direction)},Game_CharacterBase.prototype.mv3d_direction=function(){return this._mv3d_direction||this.direction()},Object(r.m)(Game_CharacterBase.prototype,"copyPosition",t=>(function(e){t.apply(this,arguments),this._mv3d_direction=e._mv3d_direction})),Object(r.m)(Game_Player.prototype,"processMoveCommand",t=>(function(e){t.apply(this,arguments);const i=Game_Character;switch(e.code){case i.ROUTE_TURN_DOWN:case i.ROUTE_TURN_LEFT:case i.ROUTE_TURN_RIGHT:case i.ROUTE_TURN_UP:case i.ROUTE_TURN_90D_R:case i.ROUTE_TURN_90D_L:case i.ROUTE_TURN_180D:case i.ROUTE_TURN_90D_R_L:case i.ROUTE_TURN_RANDOM:case i.ROUTE_TURN_TOWARD:case i.ROUTE_TURN_AWAY:let t=a.a.dirToYaw(this._direction);a.a.blendCameraYaw.setValue(t,.25)}}),()=>!a.a.isDisabled()&&a.a.is1stPerson());class ConfigurationFunction{constructor(t,e){this.groups=t.match(/\[?[^[\]|]+\]?/g),this.labels={};for(let t=0;t<this.groups.length;++t){for(;this.groups[t]&&"["===this.groups[t][0];)this.labels[this.groups[t].slice(1,-1)]=t,this.groups.splice(t,1);if(t>this.groups.length)break;this.groups[t]=this.groups[t].split(",").map(t=>t.trim())}this.func=e}run(t,e){const i=/([,|]+)? *(?:(\w+) *: *)?([^,|\r\n]+)/g;let a,s=0,r=0;const n={};for(let t=0;t<this.groups.length;++t)n[`group${t+1}`]=[];for(;a=i.exec(e);){if(a[1])for(const t of a[1])","===t&&++s,("|"===t||s>=this.groups[r].length)&&(s=0,++r);if(a[2])if(a[2]in this.labels)r=this.labels[a[2]];else{let t=!1;t:for(let e=0;e<this.groups.length;++e)for(let i=0;i<this.groups[e].length;++i)if(this.groups[e][i]===a[2]){t=!0,r=e,s=i;break t}if(!t)break}if(r>this.groups.length)break;n[this.groups[r][s]]=n[`group${r+1}`][s]=a[3].trim()}this.func(t,n)}}function P(t,e=""){return new ConfigurationFunction(`img,x,y,w,h|${e}|alpha|glow[anim]animx,animy`,(function(e,i){if(5===i.group1.length){const[s,r,n,o,h]=i.group1;e[`${t}_id`]=a.a.constructTileId(s,1,0),e[`${t}_rect`]=new PIXI.Rectangle(r,n,o,h)}else if(3===i.group1.length){const[s,r,n]=i.group1;e[`${t}_id`]=a.a.constructTileId(s,r,n)}else if(2===i.group1.length){const[a,r]=i.group1;e[`${t}_offset`]=new s.y(Number(a),Number(r))}i.animx&&i.animy&&(e[`${t}_animData`]={animX:Number(i.animx),animY:Number(i.animy)}),i.height&&(e[`${t}_height`]=Number(i.height)),i.alpha&&(e[`${t}_alpha`]=Number(i.alpha)),i.glow&&(isNaN(i.glow)?e[`${t}_glow`]=Object(r.k)(i.glow):e[`${t}_glow`]=new s.c(Number(i.glow),Number(i.glow),Number(i.glow),1))}))}a.a.ConfigurationFunction=ConfigurationFunction,Object.assign(a.a,{tilesetConfigurations:{},loadTilesetSettings(){this.tilesetConfigurations={};const t=this.readConfigurationBlocks($gameMap.tileset().note)+"\n"+this.readConfigurationBlocks($dataMap.note,"mv3d-tiles"),e=/^\s*([abcde]\d?)\s*,\s*(\d+(?:-\d+)?)\s*,\s*(\d+(?:-\d+)?)\s*:(.*)$/gim;let i;for(;i=e.exec(t);){const t=this.readConfigurationFunctions(i[4],this.tilesetConfigurationFunctions),e=i[2].split("-").map(t=>Number(t)),a=i[3].split("-").map(t=>Number(t));for(let s=e[0];s<=e[e.length-1];++s)for(let e=a[0];e<=a[a.length-1];++e){const a=`${i[1]},${s},${e}`,r=this.constructTileId(...a.split(","));r in this.tilesetConfigurations||(this.tilesetConfigurations[r]={}),Object.assign(this.tilesetConfigurations[r],t)}}},mapConfigurations:{},loadMapSettings(){const t=this.mapConfigurations={};this.readConfigurationFunctions(this.readConfigurationBlocks($dataMap.note),this.mapConfigurationFunctions,t),this._REGION_DATA_MAP={};const e=this.readConfigurationBlocks($dataMap.note,"mv3d-regions");if(e){const t=/^\s*(\d+)\s*:(.*)$/gm;let i;for(;i=t.exec(e);)i[1]in this._REGION_DATA_MAP||(i[1]in this._REGION_DATA?this._REGION_DATA_MAP[i[1]]=JSON.parse(JSON.stringify(this._REGION_DATA[i[1]])):this._REGION_DATA_MAP[i[1]]={}),this.readConfigurationFunctions(i[2],a.a.tilesetConfigurationFunctions,this._REGION_DATA_MAP[i[1]])}},applyMapSettings(){const t=this.mapConfigurations;if("fog"in t){const e=t.fog;"color"in e&&this.blendFogColor.setValue(e.color,0),"near"in e&&this.blendFogNear.setValue(e.near,0),"far"in e&&this.blendFogFar.setValue(e.far,0),this.blendFogColor.update()}"light"in t&&this.blendAmbientColor.setValue(t.light.color,0),"cameraDist"in t&&this.blendCameraDist.setValue(t.cameraDist,0),"cameraHeight"in t&&this.blendCameraHeight.setValue(t.cameraHeight,0),"cameraMode"in t&&(this.cameraMode=t.cameraMode),"cameraPitch"in t&&this.blendCameraPitch.setValue(t.cameraPitch,0),"cameraYaw"in t&&this.blendCameraYaw.setValue(t.cameraYaw,0),a.a.updateClearColor(),this.callFeatures("applyMapSettings",t)},getMapConfig(t,e){return t in this.mapConfigurations?this.mapConfigurations[t]:e},getCeilingConfig(){let t={};for(const e in this.mapConfigurations)e.startsWith("ceiling_")&&(t[e.replace("ceiling_","bottom_")]=this.mapConfigurations[e]);return t.bottom_id=this.getMapConfig("ceiling_id",0),t.height=this.getMapConfig("ceiling_height",this.CEILING_HEIGHT),t.skylight=this.getMapConfig("ceiling_skylight",!1),t},readConfigurationBlocksAndTags(t,e="mv3d"){return this.readConfigurationBlocks(t,e)+this.readConfigurationTags(t,e)},readConfigurationBlocks(t,e="mv3d"){const i=new RegExp(`<${e}>([\\s\\S]*?)</${e}>`,"gi");let a,s="";for(;a=i.exec(t);)s+=a[1]+"\n";return s},readConfigurationTags(t,e="mv3d"){const i=new RegExp(`<${e}:([\\s\\S]*?)>`,"gi");let a,s="";for(;a=i.exec(t);)s+=a[1]+"\n";return s},readConfigurationFunctions(t,e=a.a.tilesetConfigurationFunctions,i={}){const s=/(\w+)\((.*?)\)/g;let r;for(;r=s.exec(t);){const t=r[1].toLowerCase();if(t in e)if(e[t]instanceof ConfigurationFunction)e[t].run(i,r[2]);else{const a=r[2].split(",");1===a.length&&""===a[0]&&(a.length=0),e[t](i,...a)}}return i},get configurationSides(){return this.enumSides},get configurationShapes(){return this.enumShapes},get configurationPassage(){return this.enumPassage},enumSides:{front:s.g,back:s.a,double:s.d},enumShapes:{FLAT:1,TREE:2,SPRITE:3,FENCE:4,WALL:4,CROSS:5,XCROSS:6,SLOPE:7},enumPassage:{WALL:0,FLOOR:1,THROUGH:2},enumRenderGroups:{BACK:0,MAIN:1,FRONT:2},tilesetConfigurationFunctions:{height(t,e){t.height=Number(e)},depth(t,e){t.depth=Number(e)},fringe(t,e){t.fringe=Number(e)},float(t,e){t.float=Number(e)},slope(t,e=1,i=null){t.shape=a.a.enumShapes.SLOPE,t.slopeHeight=Number(e),i&&(t.slopeDirection={n:2,s:8,e:4,w:6}[i.toLowerCase()[0]])},top:P("top"),side:P("side"),inside:P("inside"),bottom:P("bottom"),texture:Object.assign(P("hybrid"),{func(t,e){a.a.tilesetConfigurationFunctions.top.func(t,e),a.a.tilesetConfigurationFunctions.side.func(t,e)}}),shape(t,e,i){t.shape=a.a.enumShapes[e.toUpperCase()],(t.shape!==a.a.enumShapes.SLOPE||!i)&&"slopeHeight"in t||(t.slopeHeight=Number(i)||1),i&&t.shape===a.a.enumShapes.FENCE&&(t.fencePosts=Object(r.f)(i))},alpha(t,e){t.transparent=!0,t.alpha=Number(e)},glow(t,e,i=1){isNaN(e)?t.glow=Object(r.k)(e):t.glow=new s.c(Number(e),Number(e),Number(e),1),t.glow.a=Object(r.e)(i)},pass(t,e=""){(e=Object(r.j)(e.toLowerCase()))&&"x"!==e[0]?"o"===e[0]?t.pass=a.a.enumPassage.FLOOR:t.pass=a.a.enumPassage.THROUGH:t.pass=a.a.enumPassage.WALL},shadow(t,e=!0){t.shadow=Object(r.f)(e)}},eventConfigurationFunctions:{height(t,e){const i=Number(e);i<0?t.zoff=i:t.height=i,console.warn("event config height() is deprecated. Use elevation(), offset(), or zoff() instead.")},elevation(t,e){t.height=Number(e)},z(t,e){t.zlock=Number(e)},x(t,e){t.xoff=Number(e),console.warn("event config x() is deprecated. Use offset() or xoff() instead.")},y(t,e){t.yoff=Number(e),console.warn("event config y() is deprecated. Use offset() or yoff() instead.")},xoff(t,e){t.xoff=Number(e)},yoff(t,e){t.yoff=Number(e)},zoff(t,e){t.zoff=Number(e)},offset:new ConfigurationFunction("x,y,z",(function(t,e){e.x&&(t.xoff=Number(e.x)),e.y&&(t.yoff=Number(e.y)),e.z&&(t.zoff=Number(e.z))})),pos:new ConfigurationFunction("x,y",(function(t,e){t.pos||(t.pos={}),e.x&&(t.pos.x=e.x),e.y&&(t.pos.y=e.y)})),scale(t,e,i=e){t.scale=new s.y(Number(e),Number(i))},rot(t,e){t.rot=Number(e)},yaw(t,e){t.yaw=Number(e)},pitch(t,e){t.pitch=Number(e)},bush(t,e){t.bush=Object(r.f)(e)},shadow:new ConfigurationFunction("size,dist|3d",(function(t,e){let{size:i,dist:a,"3d":s}=e;null==s&&(s=null==i||i),t.dynShadow=s=Object(r.f)(s),null!=i&&(t.shadow=Object(r.e)(i)),null!=a&&(t.shadowDist=Number(a))})),shape(t,e){t.shape=a.a.enumShapes[e.toUpperCase()]},lamp:new ConfigurationFunction("color,intensity,range",(function(t,e){const{color:i="white",intensity:s=1,range:n=a.a.LIGHT_DIST}=e;t.lamp={color:Object(r.k)(i).toNumber(),intensity:Number(s),distance:Number(n)}})),flashlight:new ConfigurationFunction("color,intensity,range,angle[dir]yaw,pitch",(function(t,e){const{color:i="white",intensity:s=1,range:n=a.a.LIGHT_DIST,angle:o=a.a.LIGHT_ANGLE}=e;t.flashlight={color:Object(r.k)(i).toNumber(),intensity:Number(s),distance:Number(n),angle:Number(o)},e.yaw&&(t.flashlightYaw=e.yaw),e.pitch&&(t.flashlightPitch=Number(e.pitch))})),flashlightpitch(t,e="90"){t.flashlightPitch=Number(e)},flashlightyaw(t,e="+0"){t.flashlightYaw=e},lightheight(t,e=1){this.lampheight(t,e),this.flashlightheight(t,e)},lightoffset(t,e=0,i=0){this.lampoffset(t,e,i),this.flashlightoffset(t,e,i)},lampheight(t,e=1){t.lampHeight=Number(e)},lampoffset(t,e=0,i=0){t.lampOffset={x:+e,y:+i}},flashlightheight(t,e=1){t.flashlightHeight=Number(e)},flashlightoffset(t,e=0,i=0){t.flashlightOffset={x:+e,y:+i}},alpha(t,e){t.alpha=Number(e)},glow(t,e,i=1){isNaN(e)?t.glow=Object(r.k)(e):t.glow=new s.c(Number(e),Number(e),Number(e),1),t.glow.a=Object(r.e)(i)},dirfix(t,e){t.dirfix=Object(r.f)(e)},gravity(t,e){t.gravity=Object(r.e)(e)},platform(t,e){t.platform=Object(r.f)(e)},collide(t,e){t.collide=Object(r.e)(e)},trigger(t,e,i=0){t.trigger={up:Number(e),down:Number(i)}},pass(t,e=""){(e=Object(r.j)(e.toLowerCase()))&&"x"!==e[0]?"o"===e[0]?t.platform=!0:(t.platform=!1,t.collide=!1):(t.platform=!1,t.collide=!0)}},mapConfigurationFunctions:{get ambient(){return this.light},light(t,e){e="default"===e.toLowerCase()?a.a.AMBIENT_COLOR:Object(r.k)(e).toNumber(),t.light={color:e}},fog:new ConfigurationFunction("color|near,far",(function(t,e){const{color:i,near:a,far:s}=e;t.fog||(t.fog={}),i&&(t.fog.color=Object(r.k)(i).toNumber()),a&&(t.fog.near=Number(a)),s&&(t.fog.far=Number(s))})),camera:new ConfigurationFunction("yaw,pitch|dist|height|mode",(function(t,e){const{yaw:i,pitch:a,dist:s,height:r,mode:n}=e;i&&(t.cameraYaw=Number(i)),a&&(t.cameraPitch=Number(a)),s&&(t.cameraDist=Number(s)),r&&(t.cameraHeight=Number(r)),n&&(t.cameraMode=n)})),ceiling:P("ceiling","height,skylight"),edge(t,e,i){switch(e=e.toLowerCase()){case"clamp":t.edgeData=null==i?1:Number(i),t.edge=e;break;default:t.edge=Object(r.f)(e)}},disable(t,e=!0){t.disabled=Object(r.f)(e)},enable(t,e=!0){t.disabled=!Object(r.f)(e)}}});const N=Game_Event.prototype.setupPage;Game_Event.prototype.setupPage=function(){N.apply(this,arguments),this.mv3d_sprite&&(this.mv3d_needsConfigure=!0,this.mv3d_sprite.eventConfigure())};const R=Game_Event.prototype.initialize;Game_Event.prototype.initialize=async function(){R.apply(this,arguments);const t=this.event();let e={};a.a.readConfigurationFunctions(a.a.readConfigurationTags(t.note),a.a.eventConfigurationFunctions,e),"pos"in e&&this.locate(Object(r.p)(t.x,e.pos.x),Object(r.p)(t.y,e.pos.y)),this.mv3d_blenders||(this.mv3d_blenders={}),"lamp"in e&&(this.mv3d_blenders.lampColor_r=e.lamp.color>>16,this.mv3d_blenders.lampColor_g=e.lamp.color>>8&255,this.mv3d_blenders.lampColor_b=255&e.lamp.color,this.mv3d_blenders.lampIntensity=e.lamp.intensity,this.mv3d_blenders.lampDistance=e.lamp.distance),"flashlight"in e&&(this.mv3d_blenders.flashlightColor_r=e.flashlight.color>>16,this.mv3d_blenders.flashlightColor_g=e.flashlight.color>>8&255,this.mv3d_blenders.flashlightColor_b=255&e.flashlight.color,this.mv3d_blenders.flashlightIntensity=e.flashlight.intensity,this.mv3d_blenders.flashlightDistance=e.flashlight.distance,this.mv3d_blenders.flashlightAngle=e.flashlight.angle),"flashlightPitch"in e&&(this.mv3d_blenders.flashlightPitch=Number(e.flashlightPitch)),"flashlightYaw"in e&&(this.mv3d_blenders.flashlightYaw=e.flashlightYaw),this.mv3d_needsConfigure=!0,await Object(r.r)(),a.a.mapLoaded&&a.a.createCharacterFor(this)};const F=Game_Interpreter.prototype.pluginCommand;Game_Interpreter.prototype.pluginCommand=function(t,e){if("mv3d"!==t.toLowerCase())return F.apply(this,arguments);const i=new a.a.PluginCommand;if(i.INTERPRETER=this,i.FULL_COMMAND=[t,...e].join(" "),e=e.filter(t=>t),i.CHAR=$gameMap.event(this._eventId),e[0]){const t=e[0][0];"@"!==t&&"＠"!==t||(i.CHAR=i.TARGET_CHAR(e.shift()))}const s=e.shift().toLowerCase();s in i&&i[s](...e)},a.a.PluginCommand=class{async animation(t,...e){const i=(await this.AWAIT_CHAR(this.CHAR)).char;if(i.requestAnimation(t),a.a.isDisabled())return;let s=!0,n=1;for(let t=0;t<e.length;++t)switch(e[t].toLowerCase()){case"depth":null!=e[t+1]&&(s=Object(r.f)(e[t+1]));break;case"scale":null!=e[t+1]&&(n=Number(e[t+1]))}i._mv3d_animationSettings={depth:s,scale:n}}async camera(...t){var e=this._TIME(t[2]);switch(t[0].toLowerCase()){case"pitch":return void this.pitch(t[1],e);case"yaw":return void this.yaw(t[1],e);case"roll":return void this.roll(t[1],e);case"dist":case"distance":return void this.dist(t[1],e);case"zoom":return void this.zoom(t[1],e);case"height":return void this.height(t[1],e);case"mode":return void this.cameramode(t[1]);case"target":return void this._cameraTarget(t[1],e);case"pan":return void this.pan(t[1],t[2],t[3])}}yaw(t,e=1){this._RELATIVE_BLEND(a.a.blendCameraYaw,t,e),a.a.is1stPerson()&&a.a.playerFaceYaw()}pitch(t,e=1){this._RELATIVE_BLEND(a.a.blendCameraPitch,t,e)}roll(t,e=1){this._RELATIVE_BLEND(a.a.blendCameraRoll,t,e)}dist(t,e=1){this._RELATIVE_BLEND(a.a.blendCameraDist,t,e)}zoom(t,e=1){this._RELATIVE_BLEND(a.a.blendCameraZoom,t,e)}height(t,e=1){this._RELATIVE_BLEND(a.a.blendCameraHeight,t,e)}_cameraTarget(t,e){a.a.setCameraTarget(this.TARGET_CHAR(t),e)}pan(t,e,i=1){console.log(t,e,i),i=this._TIME(i),this._RELATIVE_BLEND(a.a.blendPanX,t,i),this._RELATIVE_BLEND(a.a.blendPanY,e,i)}get rotationmode(){return this.allowrotation}get pitchmode(){return this.allowpitch}allowrotation(t){a.a.saveData("allowRotation",Object(r.f)(t))}allowpitch(t){a.a.saveData("allowPitch",Object(r.f)(t))}lockcamera(t){a.a.saveData("cameraLocked",Object(r.f)(t))}_VEHICLE(t,e,i){e=e.toLowerCase();const s=`${Vehicle}_${e}`;i="big"===e?Object(r.f)(i):Object(r.p)(a.a.loadData(s,0),i),a.a.saveData(s,i)}boat(t,e){this._VEHICLE("boat",t,e)}ship(t,e){this._VEHICLE("ship",t,e)}airship(t,e){this._VEHICLE("airship",t,e)}cameramode(t){a.a.cameraMode=t}fog(...t){var e=this._TIME(t[2]);switch(t[0].toLowerCase()){case"color":return void this._fogColor(t[1],e);case"near":return void this._fogNear(t[1],e);case"far":return void this._fogFar(t[1],e);case"dist":case"distance":return e=this._TIME(t[3]),this._fogNear(t[1],e),void this._fogFar(t[2],e)}e=this._TIME(t[3]),this._fogColor(t[0],e),this._fogNear(t[1],e),this._fogFar(t[2],e)}_fogColor(t,e){a.a.blendFogColor.setValue(Object(r.k)(t).toNumber(),e)}_fogNear(t,e){this._RELATIVE_BLEND(a.a.blendFogNear,t,e)}_fogFar(t,e){this._RELATIVE_BLEND(a.a.blendFogFar,t,e)}get ambient(){return this.light}light(...t){var e=this._TIME(t[2]);switch(t[0].toLowerCase()){case"color":return void this._lightColor(t[1],e)}e=this._TIME(t[1]),this._lightColor(t[0],e)}_lightColor(t,e=1){a.a.blendAmbientColor.setValue(Object(r.k)(t).toNumber(),e)}async lamp(...t){const e=await this.AWAIT_CHAR(this.CHAR);e.setupLamp();var i=this._TIME(t[2]);switch(t[0].toLowerCase()){case"color":return void this._lampColor(e,t[1],i);case"intensity":return void this._lampIntensity(e,t[1],i);case"dist":case"distance":return void this._lampDistance(e,t[1],i)}i=this._TIME(t[3]),this._lampColor(e,t[0],i),this._lampIntensity(e,t[1],i),this._lampDistance(e,t[2],i)}_lampColor(t,e,i=1){t.blendLampColor.setValue(Object(r.k)(e).toNumber(),i)}_lampIntensity(t,e,i=1){this._RELATIVE_BLEND(t.blendLampIntensity,e,i)}_lampDistance(t,e,i=1){this._RELATIVE_BLEND(t.blendLampDistance,e,i)}async flashlight(...t){const e=await this.AWAIT_CHAR(this.CHAR);e.setupFlashlight();var i=this._TIME(t[2]);switch(t[0].toLowerCase()){case"color":return void this._flashlightColor(e,t[1],i);case"intensity":return void this._flashlightIntensity(e,t[1],i);case"dist":case"distance":return void this._flashlightDistance(e,t[1],i);case"angle":return void this._flashlightAngle(e,t[1],i);case"yaw":return void this._flashlightYaw(e,t[1]);case"pitch":return void this._flashlightPitch(e,t[1],i)}i=this._TIME(t[4]),this._flashlightColor(e,t[0],i),this._flashlightIntensity(e,t[1],i),this._flashlightDistance(e,t[2],i),this._flashlightAngle(e,t[3],i)}_flashlightColor(t,e,i){t.blendFlashlightColor.setValue(Object(r.k)(e).toNumber(),i)}_flashlightIntensity(t,e,i){this._RELATIVE_BLEND(t.blendFlashlightIntensity,e,i)}_flashlightDistance(t,e,i){this._RELATIVE_BLEND(t.blendFlashlightDistance,e,i)}_flashlightAngle(t,e,i){this._RELATIVE_BLEND(t.blendFlashlightAngle,e,i)}_flashlightPitch(t,e,i){this._RELATIVE_BLEND(t.blendFlashlightPitch,e,i)}_flashlightYaw(t,e){this.configure(`flashlightYaw(${e})`)}async elevation(...t){const e=await this.AWAIT_CHAR(this.CHAR);let i=this._TIME(t[1]);this._RELATIVE_BLEND(e.blendElevation,t[0],i)}async configure(...t){const e=await this.AWAIT_CHAR(this.CHAR);a.a.readConfigurationFunctions(t.join(" "),a.a.eventConfigurationFunctions,e.settings),e.pageConfigure(e.settings)}disable(t){a.a.disable(t)}enable(t){a.a.enable(t)}_RELATIVE_BLEND(t,e,i){t.setValue(Object(r.p)(t.targetValue(),e),Number(i))}_TIME(t){return"number"==typeof t?t:(t=Number(t),Number.isNaN(t)?1:t)}ERROR_CHAR(){console.warn(`MV3D: Plugin command \`${this.FULL_COMMAND}\` failed because target character was invalid.`)}async AWAIT_CHAR(t){if(!t)return this.ERROR_CHAR();let e=0;for(;!t.mv3d_sprite;)if(await Object(r.r)(100),++e>10)return this.ERROR_CHAR();return t.mv3d_sprite}TARGET_CHAR(t){return a.a.targetChar(t,$gameMap.event(this.INTERPRETER._eventId),this.CHAR)}},a.a.targetChar=function(t,e=null,i=null){if(!t)return i;let a=t.toLowerCase().match(/[a-z]+/);const s=a?a[0]:"e",r=(a=t.match(/\d+/))?Number(a[0]):0;switch(s[0]){case"s":return e;case"p":return $gamePlayer;case"e":return r?$gameMap.event(r):e;case"v":return $gameMap.vehicle(r);case"f":return $gamePlayer.followers()._data[r]}return char},a.a.getTargetString=function(t){return t instanceof Game_Player?"@p":t instanceof Game_Event?`@e${t._eventId}`:t instanceof Game_Follower?`@f${$gamePlayer._followers._data.indexOf(t)}`:t instanceof Game_Vehicle?`@v${$gameMap._vehicles.indexOf(t)}`:void 0},Game_CharacterBase.prototype.mv3d_requestAnimation=function(t,e={}){this.requestAnimation(t),this._mv3d_animationSettings=e},Game_Character.prototype.mv3d_configure=function(t){a.a.readConfigurationFunctions(t,a.a.eventConfigurationFunctions,this.mv3d_settings),this.mv3d_sprite&&this.mv3d_sprite.pageConfigure(this.mv3d_settings)};class MapCellBuilder_CellMeshBuilder{constructor(){this.submeshBuilders={}}build(){const t=Object.values(this.submeshBuilders);if(!t.length)return null;const e=t.map(t=>t.build()),i=e.reduce((t,e)=>("number"!=typeof t&&(t=t.getTotalVertices()),t+e.getTotalVertices()));return s.k.MergeMeshes(e,!0,i>65536,void 0,!1,!0)}getBuilder(t){return t.name in this.submeshBuilders||(this.submeshBuilders[t.name]=new MapCellBuilder_SubMeshBuilder(t)),this.submeshBuilders[t.name]}addWallFace(t,e,i,a,s,r,n,o,h,l,c,p={}){const d=this.getBuilder(t),u=MapCellBuilder_SubMeshBuilder.getUvRect(t.diffuseTexture,e,i,a,s);d.addWallFace(r,n,o,h,l,c,u,p),p.double&&(p.flip=!p.flip,d.addWallFace(r,n,o,h,l,c,u,p))}addFloorFace(t,e,i,a,s,r,n,o,h,l,c={}){const p=this.getBuilder(t),d=MapCellBuilder_SubMeshBuilder.getUvRect(t.diffuseTexture,e,i,a,s);p.addFloorFace(r,n,o,h,l,d,c),c.double&&(c.flip=!c.flip,p.addFloorFace(r,n,o,h,l,d,c))}addSlopeFace(t,e,i,a,s,r,n,o,h,l,c,p={}){const d=this.getBuilder(t),u=MapCellBuilder_SubMeshBuilder.getUvRect(t.diffuseTexture,e,i,a,s);d.addSlopeFace(r,n,o,h,l,c,u,p),p.double&&(p.flip=!p.flip,d.addSlopeFace(r,n,o,h,l,c,u,p))}addSlopeSide(t,e,i,a,s,r,n,o,h,l,c,p={}){const d=this.getBuilder(t),u=MapCellBuilder_SubMeshBuilder.getUvRect(t.diffuseTexture,e,i,a,s);d.addSlopeSide(r,n,o,h,l,c,u,p),p.double&&(p.flip=!p.flip,d.addSlopeSide(r,n,o,h,l,c,u,p))}}class MapCellBuilder_SubMeshBuilder{constructor(t){this.material=t,this.positions=[],this.indices=[],this.normals=[],this.uvs=[]}build(){const t=new s.k("cell mesh",a.a.scene),e=new s.A;return e.positions=this.positions,e.indices=this.indices,e.normals=this.normals,e.uvs=this.uvs,e.applyToMesh(t),t.material=this.material,t}addWallFace(t,e,i,a,s,n,o,h){e=-e,i=i;const l=Object(r.g)(n),c=Object(r.q)(n),p=a/2,d=s/2,u=[t-p*l,i+d,e+p*c,t+p*l,i+d,e-p*c,t-p*l,i-d,e+p*c,t+p*l,i-d,e-p*c];let m=[-c,0,-l,-c,0,-l,-c,0,-l,-c,0,-l];const g=MapCellBuilder_SubMeshBuilder.getDefaultUvs(o),f=MapCellBuilder_SubMeshBuilder.getDefaultIndices();h.flip&&MapCellBuilder_SubMeshBuilder.flipFace(f,m),h.abnormal&&(m=[0,1,0,0,1,0,0,1,0,0,1,0]),this.pushNewData(u,f,m,g)}addFloorFace(t,e,i,a,s,r,n){const o=a/2,h=s/2,l=[t-o,i=i,(e=-e)+h,t+o,i,e+h,t-o,i,e-h,t+o,i,e-h],c=[0,1,0,0,1,0,0,1,0,0,1,0],p=MapCellBuilder_SubMeshBuilder.getDefaultUvs(r),d=MapCellBuilder_SubMeshBuilder.getDefaultIndices();n.flip&&MapCellBuilder_SubMeshBuilder.flipFace(d,c),this.pushNewData(l,d,c,p)}addSlopeFace(t,e,i,a,s,n,o,h){e=-e,i=i;const l=Object(r.g)(n),c=Object(r.q)(n),p=a/2,d=s/2,u=h.autotile?[t-p,i+d+d*Math.round(Object(r.q)(-n+1*r.a/4)),e+p,t+p,i+d+d*Math.round(Object(r.q)(-n+3*r.a/4)),e+p,t-p,i+d+d*Math.round(Object(r.q)(-n+7*r.a/4)),e-p,t+p,i+d+d*Math.round(Object(r.q)(-n+5*r.a/4)),e-p]:[t-p*l+p*c,i+s,e+p*c+p*l,t+p*l+p*c,i+s,e-p*c+p*l,t-p*l-p*c,i,e+p*c-p*l,t+p*l-p*c,i,e-p*c-p*l],m=Math.pow(2,-s),g=1-m,f=[-c*g,m,-l*g,-c*g,m,-l*g,-c*g,m,-l*g,-c*g,m,-l*g];let _=MapCellBuilder_SubMeshBuilder.getDefaultUvs(o);const b=MapCellBuilder_SubMeshBuilder.getDefaultIndices();h.flip&&MapCellBuilder_SubMeshBuilder.flipFace(b,f),this.pushNewData(u,b,f,_)}addSlopeSide(t,e,i,a,s,n,o,h){e=-e,i=i;const l=Object(r.g)(n),c=Object(r.q)(n),p=a/2,d=[t-p*l,i+s,e+p*c,t-p*l,i,e+p*c,t+p*l,i,e-p*c],u=[-c,0,-l,-c,0,-l,-c,0,-l],m=[o.x1,o.y1,o.x1,o.y2,o.x2,o.y2],g=[0,1,2];h.flip&&MapCellBuilder_SubMeshBuilder.flipFace(g,u),this.pushNewData(d,g,u,m)}pushNewData(t,e,i,a){this.indices.push(...e.map(t=>t+this.positions.length/3)),this.positions.push(...t),this.normals.push(...i),this.uvs.push(...a)}static getUvRect(t,e,i,s,r){const{width:n,height:o}=t.getBaseSize();return a.a.EDGE_FIX&&(e+=a.a.EDGE_FIX,i+=a.a.EDGE_FIX,s-=2*a.a.EDGE_FIX,r-=2*a.a.EDGE_FIX),{x1:e/n,y1:(o-i)/o,x2:(e+s)/n,y2:(o-i-r)/o}}static getDefaultUvs(t){return[t.x1,t.y1,t.x2,t.y1,t.x1,t.y2,t.x2,t.y2]}static getDefaultIndices(){return[1,0,2,1,2,3]}static flipFace(t,e){t.reverse();for(let t=0;t<e.length;++t)e[t]*=-1}}new s.p(0,1,-Math.pow(.1,100),0),new s.p(0,0,-1,0);class mapCell_MapCell extends s.x{constructor(t,e){const i=[t,e].toString();super(`MapCell[${i}]`,a.a.scene),this.parent=a.a.map,this.cx=t,this.cy=e,this.ox=t*a.a.CELL_SIZE,this.oy=e*a.a.CELL_SIZE,this.x=this.ox,this.y=this.oy,this.key=i,this.characters=[]}update(){const t=a.a.loopCoords((this.cx+.5)*a.a.CELL_SIZE,(this.cy+.5)*a.a.CELL_SIZE);this.x=t.x-a.a.CELL_SIZE/2,this.y=t.y-a.a.CELL_SIZE/2}async load(){const t=a.a.enumShapes;this.builder=new MapCellBuilder_CellMeshBuilder;let e=a.a.CELL_SIZE,i=a.a.CELL_SIZE;"clamp"!==a.a.getMapConfig("edge")&&(e=Math.min(a.a.CELL_SIZE,$gameMap.width()-this.cx*a.a.CELL_SIZE),i=Math.min(a.a.CELL_SIZE,$gameMap.height()-this.cy*a.a.CELL_SIZE));const s=a.a.getCeilingConfig();for(let r=0;r<i;++r)for(let i=0;i<e;++i){s.cull=!1;const e=a.a.getTileData(this.ox+i,this.oy+r);let n=1/0;const o=a.a.getCullingHeight(this.ox+i,this.oy+r);for(let h=3;h>=0;--h){if(a.a.isTileEmpty(e[h]))continue;let l=a.a.getStackHeight(this.ox+i,this.oy+r,h);const c=a.a.getTileTextureOffsets(e[h],this.ox+i,this.oy+r,h),p=c.shape;c.realId=e[h];let d=a.a.getTileHeight(this.ox+i,this.oy+r,h)||c.height||0,u=!1;if(n<l&&(u=!0),a.a.getTileFringe(this.ox+i,this.oy+r,h)||(n=l),!p||p===t.FLAT||p===t.SLOPE){const e=d||0===h,n=d>0&&l-d>o||c.fringe>0;if(p&&p!==t.FLAT){if(p===t.SLOPE){const t=c.slopeHeight||1;d-=t,await this.loadSlope(c,i,r,l,h,t),e&&await this.loadWalls(c,i,r,l-t,h,d),n&&await this.loadTile(c,i,r,l-t-Math.max(0,d),h,!0)}}else u||await this.loadTile(c,i,r,l+h*a.a.LAYER_DIST*!e,h),e&&await this.loadWalls(c,i,r,l,h,d),n&&await this.loadTile(c,i,r,l-d,h,!0);l>=s.height&&(s.cull=!0)}p===t.FENCE?await this.loadFence(c,i,r,l,h,d):p!==t.CROSS&&p!==t.XCROSS||await this.loadCross(c,i,r,l,h,d)}a.a.isTileEmpty(s.bottom_id)||s.cull||await this.loadTile(s,i,r,s.height,0,!0,!s.skylight)}this.mesh=this.builder.build(),this.mesh&&(this.mesh.isPickable=!1,Object(r.r)(10).then(()=>this.mesh.isPickable=!0),this.mesh.parent=this,this.mesh.alphaIndex=0,this.mesh.renderingGroupId=a.a.enumRenderGroups.MAIN,a.a.callFeatures("createCellMesh",this.mesh)),delete this.builder}dispose(){super.dispose(...arguments),this.mesh&&a.a.callFeatures("destroyCellMesh",this.mesh)}async loadTile(t,e,i,s,n,o=!1,h=!1){const l=o?t.bottom_id:t.top_id;if(a.a.isTileEmpty(l))return;const c=o?t.bottom_rect:t.top_rect,p=Tilemap.isAutotile(l)&&!c;let d;d=c?[c]:a.a.getTileRects(l);const u=await a.a.getCachedTilesetMaterialForTile(t,o?"bottom":"top");for(const t of d)this.builder.addFloorFace(u,t.x,t.y,t.width,t.height,e+(0|t.ox)/Object(r.t)()-.25*p,i+(0|t.oy)/Object(r.t)()-.25*p,s,1-p/2,1-p/2,{flip:o,double:h})}async loadWalls(t,e,i,a,s,r){for(const n of mapCell_MapCell.neighborPositions)await this.loadWall(t,e,i,a,s,r,n)}async loadWall(t,e,i,n,o,h,l){const c=a.a.isStarTile(t.realId)||t.fringe>0;if(!a.a.getMapConfig("edge",!0)&&((this.ox+e+l.x>=$dataMap.width||this.ox+e+l.x<0)&&!$gameMap.isLoopHorizontal()||(this.oy+i+l.y>=$dataMap.height||this.oy+i+l.y<0)&&!$gameMap.isLoopVertical()))return;let p,d=h,u=t.side_id,m="side";if(a.a.isTileEmpty(u))return;if((d=n-a.a.getCullingHeight(this.ox+e+l.x,this.oy+i+l.y,t.depth>0?3:o,{ignorePits:!(t.depth>0),dir:Input._makeNumpadDirection(l.x,l.y)}))>0&&(o>0||c)&&(d=Math.min(h,d)),t.depth>0&&d<0){if(a.a.tileHasPit(this.ox+e+l.x,this.oy+i+l.y,o))return;d=Math.max(d,-t.depth),t.hasInsideConf&&(m="inside")}else if(d<=0)return;"inside"===m?(u=t.inside_id,t.inside_rect&&(p=t.inside_rect)):t.side_rect&&(p=t.side_rect);const g=await a.a.getCachedTilesetMaterialForTile(t,m),f=new s.z(e+l.x/2,i+l.y/2,n),_=-Math.atan2(l.x,l.y);if(p||!Tilemap.isAutotile(u)){const t=p||a.a.getTileRects(u)[0],e={};d<0&&(e.flip=!0),this.builder.addWallFace(g,t.x,t.y,t.width,t.height,f.x,f.y,n-d/2,1,Math.abs(d),_,e)}else{const c=new s.y(-l.y,l.x),p=new s.y(l.y,-l.x),m=a.a.getCullingHeight(this.ox+e+c.x,this.oy+i+c.y,o,{dir:Input._makeNumpadDirection(c.x,c.y)}),b=a.a.getCullingHeight(this.ox+e+p.x,this.oy+i+p.y,o,{dir:Input._makeNumpadDirection(p.x,p.y)}),{x:C,y:y}=this.getAutotileCorner(u,t.realId,!0);let T=Math.max(1,Math.abs(Math.round(2*d))),M=Math.abs(d/T),v=Object(r.t)()/2,S=Object(r.t)()/2;a.a.isTableTile(t.realId)&&(S=Object(r.t)()/3,T=1,M=h);for(let e=-1;e<=1;e+=2)for(let i=0;i<T;++i){let s,o,h,l;a.a.isTableTile(t.realId)?(s=m!=n,o=b!=n):(s=m<n-i*M,o=b<n-i*M),h=C*Object(r.t)(),l=y*Object(r.t)(),h=(C+(e>0?.5+o:1-s))*Object(r.t)(),l=a.a.isWaterfallTile(u)?(y+i%2/2)*Object(r.t)():a.a.isTableTile(u)?(y+5/3)*Object(r.t)():(y+(0===i?0:i===T-1?1.5:1-i%2*.5))*Object(r.t)();const c={};d<0&&(c.flip=!0),this.builder.addWallFace(g,h,l,v,S,f.x+.25*e*Math.cos(_),f.y+.25*e*Math.sin(_),n-d*(d<0)-M/2-M*i,.5,M,_,c)}}}async loadFence(t,e,i,s,n,o){const h=t.side_id;if(a.a.isTileEmpty(h))return;const l=t.side_rect,c=await a.a.getCachedTilesetMaterialForTile(t,"side"),p=Tilemap.isAutotile(h),d=[],u=null==t.fencePosts||t.fencePosts;for(let t=0;t<mapCell_MapCell.neighborPositions.length;++t){const s=mapCell_MapCell.neighborPositions[t];a.a.getTileHeight(this.ox+e+s.x,this.oy+i+s.y,n)!==o&&d.push(t)}for(let n=0;n<mapCell_MapCell.neighborPositions.length;++n){const m=mapCell_MapCell.neighborPositions[n];let g=d.includes(n);if(!p||!u){let t=!(g&&d.length<4);if(3!==d.length||d.includes((n+2)%4)||(t=!0),!t)continue}const f=m.x>0||m.y<0;let _=Math.atan2(m.x,m.y)+Math.PI/2;if(f&&(_-=Math.PI),p&&!l){const{x:n,y:l}=this.getAutotileCorner(h,t.realId,!0);for(let t=0;t<=1;++t)this.builder.addWallFace(c,(g?n+1.5*f:n+1-.5*f)*Object(r.u)(),(l+1.5*t)*Object(r.s)(),Object(r.u)()/2,Object(r.s)()/2,e+m.x/4,i+m.y/4,s-o/4-t*o/2,.5,o/2,-_,{double:!0,abnormal:a.a.ABNORMAL})}else{const t=l||a.a.getTileRects(h)[0];this.builder.addWallFace(c,t.x+t.width/2*(m.x>0||m.y>0),t.y,t.width/2,t.height,e+m.x/4,i+m.y/4,s-o/2,.5,o,_,{double:!0})}}}async loadCross(t,e,i,s,n,o){const h=t.side_id;if(a.a.isTileEmpty(h))return;const l=t.side_rect,c=await a.a.getCachedTilesetMaterialForTile(t,"side"),p=Tilemap.isAutotile(h);let d;d=l?[l]:a.a.getTileRects(h);const u=t.shape===a.a.enumShapes.XCROSS?Math.PI/4:0,m=p?o/2:o;for(let t=0;t<=1;++t)for(const n of d){const h=-Math.PI/2*t+u,l=-.25*p+(0|n.ox)/Object(r.u)();this.builder.addWallFace(c,n.x,n.y,n.width,n.height,e+l*Math.cos(h),i+l*Math.sin(h),s-(0|n.oy)/Object(r.s)()*o-m/2,1-p/2,m,h,{double:!0,abnormal:a.a.ABNORMAL})}}async loadSlope(t,e,i,n,o,h){const{dir:l,rot:c}=a.a.getSlopeDirection(this.ox+e,this.oy+i,o,!0),p=new s.y(-Object(r.q)(c+Math.PI),Object(r.g)(c+Math.PI));a.a.getCullingHeight(this.ox+e+p.x,this.oy+i+p.y,o)<n&&await this.loadWall(t,e,i,n,o+1,h,p);const d=new s.y(p.y,-p.x),u=this.ox+e+d.x,m=this.oy+i+d.y;if(a.a.getCullingHeight(u,m,o)<n){let s=a.a.isRampAt(u,m,n);s&&s.z2===n&&s.z1===n-h&&l==a.a.getSlopeDirection(u,m,s.l,!0).dir||await this.loadSlopeSide(t,e+d.x/2,i+d.y/2,n,o,h,c+Math.PI/2)}const g=new s.y(-p.y,p.x),f=this.ox+e+g.x,_=this.oy+i+g.y;if(a.a.getCullingHeight(f,_,o)<n){let s=a.a.isRampAt(f,_,n);s&&s.z2===n&&s.z1===n-h&&l==a.a.getSlopeDirection(f,_,s.l,!0).dir||await this.loadSlopeSide(t,e+g.x/2,i+g.y/2,n,o,h,c+Math.PI/2,{flip:!0})}await this.loadSlopeTop(t,e,i,n,o,h,c)}async loadSlopeTop(t,e,i,s,n,o,h){const l=t.top_id,c=await a.a.getCachedTilesetMaterialForTile(t,"top");if(Tilemap.isAutotile(l)&&!t.top_rect){const t=a.a.getTileRects(l);for(let a=0;a<t.length;++a){const n=t[a],l=(a+1)%2*-2+1,p=(Math.floor(a/2)+1)%2*2-1,d=Math.max(0,Object(r.q)(h)*l)*o/2,u=Math.max(0,Object(r.g)(h)*p)*o/2;this.builder.addSlopeFace(c,n.x,n.y,n.width,n.height,e+n.ox/Object(r.t)()-.25,i+n.oy/Object(r.t)()-.25,s-o+d+u,.5,o/2,h,{autotile:!0})}}else{const r=t.top_rect?t.top_rect:a.a.getTileRects(l)[0];this.builder.addSlopeFace(c,r.x,r.y,r.width,r.height,e,i,s-o,1,o,h,{})}}async loadSlopeSide(t,e,i,s,n,o,h,l={}){const c=t.side_id,p=await a.a.getCachedTilesetMaterialForTile(t,"side");let d;if(Tilemap.isAutotile(c)&&!t.side_rect){const{x:e,y:i}=this.getAutotileCorner(c,t.realId,!0);d={x:(e+.5)*Object(r.u)(),y:(i+.5)*Object(r.s)(),width:Object(r.u)(),height:Object(r.s)()}}else d=t.side_rect?t.side_rect:a.a.getTileRects(c)[0];this.builder.addSlopeSide(p,d.x,d.y,d.width,d.height,e,i,s-o,1,o,h,l)}getAutotileCorner(t,e=t,i=!0){const s=Tilemap.getAutotileKind(t);let r=s%8,n=Math.floor(s/8);var o,h;return t===e&&1==a.a.isWallTile(t)&&++n,o=2*r,h=n,Tilemap.isTileA1(t)?(s<4?(o=6*Math.floor(s/2),h=s%2*3+i):(o=8*Math.floor(r/4)+s%2*6,h=6*n+3*Math.floor(r%4/2)+i*!(r%2)),i&&s>=4&&!(s%2)&&(h+=1)):Tilemap.isTileA2(t)?h=3*(n-2)+i:Tilemap.isTileA3(t)?h=2*(n-6):Tilemap.isTileA4(t)&&(h=i?Math.ceil(2.5*(n-10)+.5):2.5*(n-10)+(n%2?.5:0)),{x:o,y:h}}}mapCell_MapCell.neighborPositions=[new s.y(0,1),new s.y(1,0),new s.y(0,-1),new s.y(-1,0)],mapCell_MapCell.meshCache={};Object.assign(a.a,{_tilemap:null,getTilemap(){return SceneManager._scene&&SceneManager._scene._spriteset&&(this._tilemap=SceneManager._scene._spriteset._tilemap),this._tilemap},getDataMap(){return $dataMap&&(this._dataMap=$dataMap),this._dataMap},getRegion(t,e){return this.getTileId(t,e,5)},getSetNumber:t=>Tilemap.isAutotile(t)?Tilemap.isTileA1(t)?0:Tilemap.isTileA2(t)?1:Tilemap.isTileA3(t)?2:3:Tilemap.isTileA5(t)?4:5+Math.floor(t/256),getShadowBits(t,e){return this.getTileId(t,e,4)},getTerrainTag:t=>$gameMap.tilesetFlags()[t]>>12,getTilePassage:Object(r.l)({1(t){return this.getTilePassage(t,this.getTileConfig(t))},2(t,e){if("pass"in e)return e.pass;const i=$gameMap.tilesetFlags()[t];return 16&i?this.enumPassage.THROUGH:15==(15&i)?this.enumPassage.WALL:this.enumPassage.FLOOR},3(t,e,i){const a=this.getTileId(t,e,i);return this.getTilePassage(a,this.getTileConfig(a,t,e,i))},default(t,e,i,a){return this.getTilePassage(t,this.getTileConfig(t,e,i,a))}}),getMaterialOptions(t,e){const i={};return"pass"in t&&(i.through=t.pass===this.enumPassage.THROUGH),"alpha"in t&&(i.alpha=t.alpha),"glow"in t&&(i.glow=t.glow),"shadow"in t&&(i.shadow=t.shadow),e&&(`${e}_alpha`in t&&(i.alpha=t[`${e}_alpha`]),`${e}_glow`in t&&(i.glow=t[`${e}_glow`]),`${e}_shadow`in t&&(i.shadow=t[`${e}_shadow`])),"alpha"in i&&(i.transparent=!0),i},getTileAnimationData(t,e){const i=t[`${e}_id`];if(`${e}_animData`in t)return t[`${e}_animData`];const a={animX:0,animY:0};if(Tilemap.isTileA1(i)){const t=Tilemap.getAutotileKind(i);a.animX=t<=1?2:t<=3?0:t%2?0:2,a.animY=t<=3?0:t%2?1:0}return a},getTileConfig:Object(r.l)({3(t,e,i){return this.getTileConfig(this.getTileData(t,e)[i],t,e,i)},default(t,e,i,s){const r={};if(!this.isTileEmpty(t)){const e=this.getTerrainTag(t);e&&e in this.TTAG_DATA&&Object.assign(r,this.TTAG_DATA[e]);const i=this.tilesetConfigurations[this.normalizeAutotileId(t)];i&&Object.assign(r,i)}if(0===s){const t=this.getRegion(e,i);t&&t in a.a.REGION_DATA&&Object.assign(r,this.REGION_DATA[t])}return r}}),getTileTextureOffsets(t,e,i,a){const s=this.getTileConfig(t,e,i,a),r=Tilemap.isAutotile(t)?48:1;return s.hasInsideConf=Boolean(s.inside_offset||s.rectInside||"inside_id"in s),s.hasBottomConf=Boolean(s.bottom_offset||s.rectBottom||"bottom_id"in s),null==s.top_id&&(s.top_id=t,s.top_offset&&(s.top_id=t+s.top_offset.x*r+s.top_offset.y*r*8)),null==s.side_id&&(s.side_id=t,s.side_offset&&(s.side_id=t+s.side_offset.x*r+s.side_offset.y*r*8)),null==s.inside_id&&(s.inside_id=s.side_id,s.inside_offset&&(s.inside_id=t+s.inside_offset.x*r+s.inside_offset.y*r*8)),null==s.bottom_id&&(s.bottom_id=s.top_id,s.bottom_offset&&(s.bottom_id=t+s.bottom_offset.x*r+s.bottom_offset.y*r*8)),"pass"in s||(s.pass=this.getTilePassage(t,s)),s},getTileId(t,e,i=0){const a=this.getDataMap();if($gameMap.isLoopHorizontal()&&(t=t.mod(a.width)),$gameMap.isLoopVertical()&&(e=e.mod(a.height)),t<0||t>=a.width||e<0||e>=a.height){if("clamp"!==this.getMapConfig("edge"))return 0;{const i=this.getMapConfig("edgeData",1);t>=a.width?t=a.width+(t-a.width).mod(i)-i:t<0&&(t=t.mod(i)),e>=a.height?e=a.height+(e-a.height).mod(i)-i:e<0&&(e=e.mod(i))}}return a.data[(i*a.height+e)*a.width+t]||0},getTileData(t,e){if(!$dataMap||!$dataMap.data)return[0,0,0,0];const i=$dataMap.data,a=$dataMap.width,s=$dataMap.height;if($gameMap.isLoopHorizontal()&&(t=t.mod(a)),$gameMap.isLoopVertical()&&(e=e.mod(s)),t<0||t>=a||e<0||e>=s){if("clamp"!==this.getMapConfig("edge"))return[0,0,0,0];{const i=this.getMapConfig("edgeData",1);t>=a?t=a+(t-a).mod(i)-i:t<0&&(t=t.mod(i)),e>=s?e=s+(e-s).mod(i)-i:e<0&&(e=e.mod(i))}}if(t<0||t>=a||e<0||e>=s)return[0,0,0,0];const r=[];for(let n=0;n<4;++n)r[n]=i[(n*s+e)*a+t]||0;return r},getTileHeight(t,e,i=0){if(!$dataMap)return 0;$gameMap.isLoopHorizontal()&&(t=t.mod($dataMap.width)),$gameMap.isLoopVertical()&&(e=e.mod($dataMap.height));const a=this.getTileData(t,e)[i];if(this.isTileEmpty(a)&&i>0)return 0;const s=this.enumShapes,r=this.getTileConfig(a,t,e,i);let n=0;if("height"in r)n=r.height;else if(this.isWallTile(a))n=this.WALL_HEIGHT;else if(this.isTableTile(a))n=this.TABLE_HEIGHT;else if(this.isSpecialShape(r.shape))switch(r.shape){case s.SLOPE:n=0;break;default:n=1}return"depth"in r&&(n-=r.depth),r.shape===s.SLOPE&&(n+=r.slopeHeight||1),n},getStackHeight(t,e,i=3){let a=0;for(let s=0;s<=i;++s)a+=this.getTileFringe(t,e,s),a+=this.getTileHeight(t,e,s);return a},getSlopeDirection(t,e,i,s=!1){const n=this.getStackHeight(t,e,i),o=this.getTileData(t,e)[i],h=this.getTileConfig(o,t,e,i),l=h.slopeHeight||1,c=mapCell_MapCell.neighborPositions,p=$gameMap.tilesetFlags()[o],d=this.getShadowBits(t,e),u=[0,3,10,5,12];let m;for(let i=0;i<c.length;++i){const s=c[i],r={neighbor:s,favor:0};r.dir=5-3*s.y+s.x;const o=this.getCollisionHeights(t+s.x,e+s.y,{slopeMax:!0}),g=this.getCollisionHeights(t-s.x,e-s.y,{slopeMin:!0});o.some(t=>Math.abs(n-l-t.z2)<=a.a.STAIR_THRESH)&&(r.favor+=1),g.some(t=>Math.abs(n-t.z2)<=a.a.STAIR_THRESH)&&(r.favor+=1),p&1<<r.dir/2-1&&(r.favor=-2),p&1<<(10-r.dir)/2-1&&(r.favor=-1),(d&u[r.dir/2])===u[r.dir/2]&&(r.favor=30),h.slopeDirection===r.dir&&(r.favor=100),(!m||r.favor>m.favor)&&(m=r)}return m.rot=Object(r.i)(180-this.dirToYaw(m.dir)),s?m:m.rot},getWalkHeight(t,e){const i=this.getCollisionHeights(t,e);return i[i.length-1].z2},getSlopeHeight(t,e,i,a=null){const s=Math.round(t),n=Math.round(e);null==a&&(a=this.getTileConfig(this.getTileData(s,n)[i],s,n,i));const o=this.getSlopeDirection(s,n,i),h=Object(r.q)(o),l=-Object(r.g)(o);let c=(t+.5)%1,p=(e+.5)%1;Math.sign(h<0)&&(c=1-c),Math.sign(l<0)&&(p=1-p);const d=Math.abs(h)*c+Math.abs(l)*p;return(a.slopeHeight||1)*d},getCollisionHeights(t,e,i={}){const a=Math.round(t),s=Math.round(e);let r=0;const n=[{z1:-1/0,z2:0}];i.layers&&(n.layers=[]);const o=this.getTileData(a,s);for(let h=0;h<=3;++h){let l=this.getTileHeight(a,s,h);const c=o[h],p=this.getTileConfig(c,a,s,h),d=p.shape;let u=!1;this.getTilePassage(c,p)===this.enumPassage.THROUGH?(l=0,u=!0):d===this.enumShapes.SLOPE&&(i.slopeMax?l=l:i.slopeMin?l-=p.slopeHeight||1:l=l-(p.slopeHeight||1)+this.getSlopeHeight(t,e,h,p));const m=this.getTileFringe(a,s,h);r+=m,u||(l<0?m+l<0&&(n[n.length-1].z2+=m+l):0===h?n[0].z2=r+l:n.push({z1:r,z2:r+l}),r+=l,i.layers&&(n.layers[h]=n[n.length-1]),d===this.enumShapes.SLOPE&&(n[n.length-1].isSlope=!0))}return n},getTileLayers(t,e,i,a=!0){let s=1/0,r=[0],n=0;for(let o=0;o<=3;++o){if(this.getTilePassage(t,e,o)===this.enumPassage.THROUGH)continue;const h=this.getTileFringe(t,e,o),l=this.getTileHeight(t,e,o),c=this.getTileConfig(t,e,o);n+=h+l;const p=c.shape===this.enumShapes.SLOPE;p&&(n-=c.slopeHeight||1);const d=i-n;(a?i>=n:i>n)&&(d<s||p&&d<=s?(r=[o],s=d):d===s&&r.push(o))}return r},getFloatHeight(t,e,i=null,a=!0){const s=this.getTileData(t,e),r=null==i?[0,1,2,3]:this.getTileLayers(t,e,i,a);let n=0;for(const i of r){const a=s[i];if(this.isTileEmpty(a))continue;const r=this.getTileConfig(a,t,e,i);r&&"float"in r&&(n+=r.float)}return n},getStackFringeHeight(t,e,i=3){return this.getStackHeight(t,e,i)},getTileFringe(t,e,i){const a=this.getTileData(t,e)[i];if(this.isTileEmpty(a))return 0;const s=this.getTileConfig(a,t,e,i);return s&&"fringe"in s?s.fringe:this.isStarTile(a)?this.FRINGE_HEIGHT:0},getCullingHeight(t,e,i=3,a={}){const s=this.getDataMap();if(!this.getMapConfig("edge",!0)&&(!$gameMap.isLoopHorizontal()&&(t<0||t>=s.width)||!$gameMap.isLoopVertical()&&(e<0||e>=s.height)))return 1/0;const r=this.getTileData(t,e);let n=0;for(let s=0;s<=i;++s){if(this.getTileFringe(t,e,s))return n;const i=r[s],o=this.getTileConfig(i,t,e,s),h=o.shape;if(this.isSpecialShape(h))return h===this.enumShapes.SLOPE&&(n+=this.getTileHeight(t,e,s),a.dir&&a.dir===this.getSlopeDirection(t,e,s,!0).dir||(n-=o.slopeHeight||1)),n;a.ignorePits&&o.depth>0&&(n+=o.depth),n+=this.getTileHeight(t,e,s)}return n},tileHasPit(t,e,i=3){const a=this.getTileData(t,e);for(let s=0;s<=i;++s){const i=a[s];if(this.getTileConfig(i,t,e,s).depth>0)return!0}return!1},isTilePit(t,e,i){const a=this.getTileData(t,e)[i];return this.getTileConfig(a,t,e,i).depth>0},getTileRects(t){const e=[],i=this.getTilemap(),a=i._isTableTile(t);if(i._drawTile({addRect:(t,i,a,s,r,n,o,h,l)=>{e.push({setN:t,x:i,y:a,width:n,height:o,ox:s,oy:r})}},t,0,0),a)for(let t=e.length-1;t>=0;--t)e[t].oy>Object(r.t)()/2&&(e[t-1].y+=2*Object(r.t)()/3,e.splice(t,1));return e},isTileEmpty:t=>!t||1544===t,isWallTile(t){const e=Tilemap.getAutotileKind(t),i=Math.floor(e/8),a=Tilemap.isTileA3(t)||Tilemap.isTileA4(t);return a&&i%2?2:a},isTableTile:t=>Boolean(Tilemap.isTileA2(t)&&128&$gameMap.tilesetFlags()[t]),isStarTile:t=>Boolean(16&$gameMap.tilesetFlags()[t]),isWaterfallTile(t){const e=Tilemap.getAutotileKind(t);return Tilemap.isTileA1(t)&&e>=4&&e%2},isSpecialShape(t){const e=a.a.enumShapes;return t===e.FENCE||t===e.CROSS||t===e.XCROSS||t===e.SLOPE},isPlatformShape(t){const e=a.a.enumShapes;return null==t||t===e.FLAT||t===e.SLOPE},constructTileId(t,e,i){const a=`TILE_ID_${t.toUpperCase()}`;let s=a in Tilemap?Tilemap[a]:0;const r=Tilemap.isAutotile(s)?48:1;return s+=Number(e)*r+Number(i)*r*8},normalizeAutotileId(t){if(!Tilemap.isAutotile(t))return t;const e=Tilemap.getAutotileKind(t);return Tilemap.TILE_ID_A1+48*e}}),Object.assign(a.a,{mapLoaded:!1,mapReady:!1,clearMap(){this.mapLoaded=!1,this.clearMapCells();for(let t=this.characters.length-1;t>=0;--t)this.characters[t].dispose(!1,!0);this.characters.length=0,this.resetCameraTarget(),this.callFeatures("clearMap")},clearMapCells(){for(const t in this.textureCache)this.textureCache[t].dispose();for(const t in this.materialCache)this.materialCache[t].dispose();this.animatedTextures.length=0,this.textureCache={},this.materialCache={};for(const t in this.cells)this.cells[t].dispose(!1,!0);this.cells={}},reloadMap(){this.clearMapCells(),a.a.mapReady&&this.updateMap(),this.callFeatures("reloadMap")},loadMap(){this.updateBlenders(),this.updateMap(),this.createCharacters(),this.rememberCameraTarget(),this.callFeatures("loadMap")},async updateMap(){if(this.mapUpdating)return;this.mapLoaded=!0,this.mapUpdating=!0;for(const t in this.cells)this.cells[t].unload=!0;const t={left:Math.floor((this.cameraStick.x-this.renderDist)/this.CELL_SIZE),right:Math.floor((this.cameraStick.x+this.renderDist)/this.CELL_SIZE),top:Math.floor((this.cameraStick.y-this.renderDist)/this.CELL_SIZE),bottom:Math.floor((this.cameraStick.y+this.renderDist)/this.CELL_SIZE)};"clamp"!==this.getMapConfig("edge")&&($gameMap.isLoopHorizontal()||(t.left=Math.max(0,t.left),t.right=Math.min(t.right,Math.ceil($gameMap.width()/a.a.CELL_SIZE)-1)),$gameMap.isLoopVertical()||(t.top=Math.max(0,t.top),t.bottom=Math.min(t.bottom,Math.ceil($gameMap.height()/a.a.CELL_SIZE)-1)));const e=[];for(let i=t.left;i<=t.right;++i)for(let r=t.top;r<=t.bottom;++r){let t=i,n=r;$gameMap.isLoopHorizontal()&&(t=t.mod(Math.ceil($gameMap.width()/a.a.CELL_SIZE))),$gameMap.isLoopVertical()&&(n=n.mod(Math.ceil($gameMap.height()/a.a.CELL_SIZE)));const o=[t,n].toString();o in this.cells?this.cells[o].unload=!1:e.push(new s.y(t,n))}for(const t in this.cells)a.a.UNLOAD_CELLS&&this.cells[t].unload&&(this.cells[t].dispose(),delete this.cells[t]);const i=new s.y(Math.round(this.cameraStick.x/this.CELL_SIZE-.5),Math.round(this.cameraStick.y/this.CELL_SIZE-.5));e.sort((t,e)=>s.y.DistanceSquared(t,i)-s.y.DistanceSquared(e,i)),this.mapReady&&(e.length=Math.min(25,e.length));for(const t of e){let{x:e,y:i}=t;if(await this.loadMapCell(e,i),this.mapReady&&await Object(r.r)(10),!this.mapLoaded)return void this.endMapUpdate()}this.endMapUpdate()},endMapUpdate(){this.mapUpdating=!1,this.mapReady=!0},async loadMapCell(t,e){const i=[t,e].toString();if(i in this.cells)return;const a=new mapCell_MapCell(t,e);this.cells[i]=a,await a.load()},_cellsNeedingIntensiveUpdate:[],intensiveUpdate(){if(0===this._cellsNeedingIntensiveUpdate.length)return;const t=performance.now();let e,i=null;for(e of this._cellsNeedingIntensiveUpdate)if(!(t-e._lastIntensiveUpdate<=300)){i=this._cellsNeedingIntensiveUpdate.indexOf(e);break}if(!(null==i||i<0)){this._cellsNeedingIntensiveUpdate.splice(i,1),e._lastIntensiveUpdate=t,e._needsIntensiveUpdate=!1;for(let t of e.characters)t.intensiveUpdate();a.a.scene.sortLightsByPriority()}}}),Object.assign(a.a,{animatedTextures:[],textureCache:{},materialCache:{},async createTexture(t){const e=await this.getTextureUrl(t);return new BABYLON.Texture(e,a.a.scene,!a.a.MIPMAP,!0,BABYLON.Texture.NEAREST_SAMPLINGMODE)},async getTextureUrl(t){const e=ImageManager.loadNormalBitmap(encodeURI(t));return Decrypter.hasEncryptedImages?(await a.a.waitBitmapLoaded(e),e.canvas.toDataURL()):e._image.src},waitTextureLoaded:t=>new Promise((e,i)=>{t.isReady()&&e(),t.onLoadObservable.addOnce(()=>{e()})}),waitBitmapLoaded:t=>new Promise(e=>t.addLoadListener(e)),async getCachedTilesetTexture(t,e=0,i=0){const a=`TS:${t}|${e},${i}`;if(a in this.textureCache)return this.textureCache[a];const s=$gameMap.tileset().tilesetNames[t];if(!s)return await this.getErrorTexture();const r=ImageManager.loadTileset(s)._url,n=await this.createTexture(r);if(n.hasAlpha=!0,this.textureCache[a]=n,await this.waitTextureLoaded(n),this.textureCache[a]!==n)return await this.getErrorTexture();if(n.updateSamplingMode(1),e||i){const{width:t,height:a}=n.getBaseSize();n.frameData={x:0,y:0,w:t,h:a},n.animX=e,n.animY=i,this.animatedTextures.push(n)}return n},async getErrorTexture(){return this.errorTexture?this.errorTexture:(this.errorTexture=await this.createTexture(`${a.a.MV3D_FOLDER}/errorTexture.png`),this.errorTexture.isError=!0,this.errorTexture.dispose=()=>{},this.errorTexture)},async getBushAlphaTexture(){return this.bushAlphaTexture?this.bushAlphaTexture:(this.getBushAlphaTexture.getting=!0,this.bushAlphaTexture=await this.createTexture(`${a.a.MV3D_FOLDER}/bushAlpha.png`),this.bushAlphaTexture.getAlphaFromRGB=!0,this.bushAlphaTexture.dispose=()=>{},this.getBushAlphaTexture.getting=!1,this.bushAlphaTexture)},getBushAlphaTextureSync(){return this.bushAlphaTexture?this.bushAlphaTexture:(this.getBushAlphaTexture.getting||this.getBushAlphaTexture(),null)},async getCachedTilesetMaterial(t,e=0,i=0,r={}){this.processMaterialOptions(r);const n=`TS:${t}|${e},${i}|${this.getExtraBit(r)}`;if(n in this.materialCache)return this.materialCache[n];const o=await this.getCachedTilesetTexture(t,e,i),h=new s.v(n,this.scene);return h.diffuseTexture=o,r.transparent&&(h.opacityTexture=o,h.alpha=r.alpha),r.through&&(h.mv3d_through=!0),h.mv3d_noShadow=!r.shadow,h.alphaCutOff=a.a.ALPHA_CUTOFF,h.ambientColor.set(1,1,1),h.mv3d_glowColor=r.glow,h.emissiveColor.copyFrom(r.glow),h.specularColor.set(0,0,0),h.backFaceCulling=a.a.BACKFACE_CULLING,isNaN(this.LIGHT_LIMIT)||(h.maxSimultaneousLights=this.LIGHT_LIMIT),this.materialCache[n]=h,h},async getCachedTilesetMaterialForTile(t,e){const i=a.a.getSetNumber(t[`${e}_id`]),s=a.a.getMaterialOptions(t,e),r=a.a.getTileAnimationData(t,e);return await a.a.getCachedTilesetMaterial(i,r.animX,r.animY,s)},processMaterialOptions(t){"alpha"in t?(t.alpha=Math.round(7*t.alpha)/7,t.alph<1&&(t.transparent=!0)):t.alpha=1,"glow"in t?(t.glow.r=Object(r.v)(t.glow.r,255),t.glow.g=Object(r.v)(t.glow.g,255),t.glow.b=Object(r.v)(t.glow.b,255),t.glow.a=Object(r.v)(t.glow.a,7)):t.glow=new s.c(0,0,0,0),"shadow"in t||(t.shadow=!0)},getExtraBit(t){let e=0;e|=Boolean(t.transparent)<<0,e|=7-7*t.alpha<<1,e|=!t.shadow<<4,e|=7*t.glow.a<<5;let i=(e|=t.glow.toNumber()<<8).toString(36);return e=0,i+=","+(e|=Boolean(t.through)<<0).toString(36)},lastAnimUpdate:0,animXFrame:0,animYFrame:0,animDirection:1,updateAnimations(){if(!(performance.now()-this.lastAnimUpdate<=this.ANIM_DELAY)){this.lastAnimUpdate=performance.now(),this.animXFrame<=0?this.animDirection=1:this.animXFrame>=2&&(this.animDirection=-1),this.animXFrame+=this.animDirection,this.animYFrame=(this.animYFrame+1)%3;for(const t of this.animatedTextures)t.crop(t.frameData.x+t.animX*this.animXFrame*Object(r.u)(),t.frameData.y+t.animY*this.animYFrame*Object(r.s)(),t.frameData.w,t.frameData.h,!0)}}}),Object.assign(a.a,{createCharacters(){const t=$gameMap.events();for(const e of t)this.createCharacterFor(e,0);const e=$gameMap.vehicles();for(const t of e)this.createCharacterFor(t,1);const i=$gamePlayer.followers()._data;for(let t=i.length-1;t>=0;--t)this.createCharacterFor(i[t],29-t);this.createCharacterFor($gamePlayer,30)},createCharacterFor(t,e){if(!t.mv3d_sprite){const i=new characters_Character(t,e);return Object.defineProperty(t,"mv3d_sprite",{value:i,configurable:!0}),this.characters.push(i),i}return t.mv3d_sprite},updateCharacters(){for(let t=this.characters.length-1;t>=0;--t)this.characters[t].update()},setupSpriteMeshes(){this.Meshes=characters_Sprite.Meshes={},characters_Sprite.Meshes.BASIC=s.l.CreatePlane("sprite mesh",{sideOrientation:s.d},a.a.scene),characters_Sprite.Meshes.FLAT=s.k.MergeMeshes([characters_Sprite.Meshes.BASIC.clone().rotate(r.b,Math.PI/2,s.B)]),characters_Sprite.Meshes.SPRITE=s.k.MergeMeshes([characters_Sprite.Meshes.BASIC.clone().translate(r.c,.5,s.B)]),characters_Sprite.Meshes.CROSS=s.k.MergeMeshes([characters_Sprite.Meshes.SPRITE.clone(),characters_Sprite.Meshes.SPRITE.clone().rotate(r.c,Math.PI/2,s.B)]);for(const t in characters_Sprite.Meshes)characters_Sprite.Meshes[t].renderingGroupId=a.a.enumRenderGroups.MAIN,a.a.scene.removeMesh(characters_Sprite.Meshes[t])},async getShadowMaterial(){if(this._shadowMaterial)return this._shadowMaterial;const t=await a.a.createTexture(`${a.a.MV3D_FOLDER}/shadow.png`),e=new s.v("shadow material",a.a.scene);return this._shadowMaterial=e,e.diffuseTexture=t,e.opacityTexture=t,e.specularColor.set(0,0,0),e.dispose=()=>{},e},async getShadowMesh(){let t;for(;this.getShadowMesh.getting;)await Object(r.r)(100);return this._shadowMesh?t=this._shadowMesh:(this.getShadowMesh.getting=!0,(t=characters_Sprite.Meshes.FLAT.clone("shadow mesh")).material=await this.getShadowMaterial(),this._shadowMesh=t,a.a.scene.removeMesh(t),this.getShadowMesh.getting=!1),t.clone()},ACTOR_SETTINGS:[]});class characters_Sprite extends s.x{constructor(){super("sprite",a.a.scene),this.spriteOrigin=new s.x("sprite origin",a.a.scene),this.spriteOrigin.parent=this,this.mesh=characters_Sprite.Meshes.FLAT.clone(),this.mesh.parent=this.spriteOrigin,this.textureLoaded=!1}async setMaterial(t){let e;e="error"===t?await a.a.getErrorTexture():await a.a.createTexture(t),await this.waitTextureLoaded(e),this.disposeMaterial(),this.texture=e,this.texture.hasAlpha=!0,this.onTextureLoaded(),this.material=new s.v("sprite material",a.a.scene),this.material.diffuseTexture=this.texture,this.material.alphaCutOff=a.a.ALPHA_CUTOFF,this.material.ambientColor.set(1,1,1),this.material.specularColor.set(0,0,0),isNaN(this.LIGHT_LIMIT)||(this.material.maxSimultaneousLights=this.LIGHT_LIMIT),this.mesh.material=this.material}async waitTextureLoaded(t=this.texture){await a.a.waitTextureLoaded(t)}onTextureLoaded(){this.texture.updateSamplingMode(1),this.textureLoaded=!0}disposeMaterial(){this.material&&(this.material.dispose(),this.texture.dispose(),this.material=null,this.texture=null)}dispose(...t){this.disposeMaterial(),super.dispose(...t)}}const H={configurable:!0,get(){return this._mv3d_z},set(t){this._mv3d_z=t,this.mv3d_sprite&&(this.mv3d_sprite.position.y=t)}},B={configurable:!0,get(){return this.char._mv3d_z},set(t){this.char._mv3d_z=t,this.position.y=t}};class characters_Character extends characters_Sprite{constructor(t,e){super(),this.order=e,this.mesh.order=this.order,this.mesh.character=this,this._character=this.char=t,this.charName="",this.charIndex=0,this.char.mv_sprite&&this.char.mv_sprite.updateBitmap(),this.char.mv3d_settings||(this.char.mv3d_settings={}),this.char.mv3d_blenders||(this.char.mv3d_blenders={}),this.isVehicle=this.char instanceof Game_Vehicle,this.isBoat=this.isVehicle&&this.char.isBoat(),this.isShip=this.isVehicle&&this.char.isShip(),this.isAirship=this.isVehicle&&this.char.isAirship(),this.isEvent=this.char instanceof Game_Event,this.isPlayer=this.char instanceof Game_Player,this.isFollower=this.char instanceof Game_Follower,this.updateCharacter(),this.updateShape(),"_mv3d_z"in this.char||(this.char._mv3d_z=a.a.getWalkHeight(this.char.x,this.char.y)),Object.defineProperty(this.char,"z",H),Object.defineProperty(this,"z",B),this.z=this.z,this.platformHeight=this.z,this.targetElevation=this.z,this.prevZ=this.z,this.needsPositionUpdate=!0,this.needsMaterialUpdate=!0,a.a.getShadowMesh().then(t=>{this.shadow=t,this.shadow.parent=this}),this.blendElevation=this.makeBlender("elevation",0),this.lightOrigin=new s.x("light origin",a.a.scene),this.lightOrigin.parent=this,this.setupLights(),this.isEvent?this.eventConfigure():(this.initialConfigure(),this.needsMaterialUpdate=!0),this.intensiveUpdate()}get settings(){return this.char.mv3d_settings}isBitmapReady(){return Boolean(this.bitmap&&this.bitmap.isReady()&&!this._waitingForBitmap)}isTextureReady(){return Boolean(this.texture&&this.texture.isReady()&&this.isBitmapReady())}get mv_sprite(){return this.char.mv_sprite||{}}get bitmap(){return this.mv_sprite.bitmap}setTileMaterial(){const t=a.a.getSetNumber(this._tileId),e=$gameMap.tileset().tilesetNames[t];if(e){const t=ImageManager.loadTileset(e)._url;this.setMaterial(t)}else this.setMaterial("error")}async waitBitmapLoaded(){this.char.mv_sprite||(await Object(r.r)(),this.char.mv_sprite)?(this._waitingForBitmap=!0,this.char.mv_sprite.updateBitmap(),await a.a.waitBitmapLoaded(this.char.mv_sprite.bitmap),this._waitingForBitmap=!1):console.warn("mv_sprite is undefined")}async waitTextureLoaded(t=this.texture){await this.waitBitmapLoaded(),await super.waitTextureLoaded(t)}onTextureLoaded(){super.onTextureLoaded(),this.updateScale(),this.needsMaterialUpdate=!0}isImageChanged(){return this._tilesetId!==$gameMap.tilesetId()||this._tileId!==this._character.tileId()||this._characterName!==this._character.characterName()}updateCharacter(){this.needsPositionUpdate=!0,this._tilesetId=$gameMap.tilesetId(),this._tileId=this._character.tileId(),this._characterName=this._character.characterName(),this._characterIndex=this._character.characterIndex(),this._isBigCharacter=ImageManager.isBigCharacter(this._characterName),this.isEmpty=!1,this.mesh.setEnabled(!0),this._tileId>0?this.setTileMaterial(this._tileId):this._characterName?this.setMaterial(`img/characters/${this._characterName}.png`):(this.isEmpty=!0,this.textureLoaded=!1,this.disposeMaterial(),this.mesh.setEnabled(!1),this.spriteWidth=1,this.spriteHeight=1,this.updateScale())}setFrame(t,e,i,a){this.isTextureReady()&&this.texture.crop(t,e,i,a,this._tileId>0)}async updateScale(){if(this.isEmpty)return this.spriteWidth=1,this.spriteHeight=1,void this.mesh.scaling.set(1,1,1);this.isBitmapReady()||await this.waitBitmapLoaded(),this.mv_sprite.updateBitmap();const t=this.getConfig("scale",new s.y(1,1));this.spriteWidth=this.mv_sprite.patternWidth()/Object(r.t)()*t.x,this.spriteHeight=this.mv_sprite.patternHeight()/Object(r.t)()*t.y;const e=this.spriteWidth,i=this.spriteHeight;this.mesh.scaling.set(e,i,i)}getDefaultConfigObject(){return this.isVehicle?a.a[`${this.char._type.toUpperCase()}_SETTINGS`].conf:this.char.isTile()?a.a.EVENT_TILE_SETTINGS:this.isEvent&&this.char.isObjectCharacter()?a.a.EVENT_OBJ_SETTINGS:a.a.EVENT_CHAR_SETTINGS}getActorConfigObject(){const t=$gameParty._actors[this.isFollower?this.char._memberIndex:0];if(!t)return{};if(!(t in a.a.ACTOR_SETTINGS)){const e=$dataActors[t];a.a.ACTOR_SETTINGS[t]=a.a.readConfigurationFunctions(a.a.readConfigurationBlocksAndTags(e.note),a.a.eventConfigurationFunctions)}return a.a.ACTOR_SETTINGS[t]}getConfig(t,e){if(t in this.settings)return this.settings[t];if(this.isEvent){if(this.settings_event_page&&t in this.settings_event_page)return this.settings_event_page[t];if(this.settings_event&&t in this.settings_event)return this.settings_event[t]}else if(this.isPlayer||this.isFollower){const e=this.getActorConfigObject();if(t in e)return e[t]}const i=this.getDefaultConfigObject();return t in i?i[t]:e}hasConfig(t){return t in this.settings||this.isEvent&&(this.settings_event_page&&t in this.settings_event_page||this.settings_event&&t in this.settings_event)||(this.isPlayer||this.isFollower)&&t in this.getActorConfigObject()||t in this.getDefaultConfigObject()}eventConfigure(){if(!this.settings_event){this.settings_event={};const t=this.char.event().note;a.a.readConfigurationFunctions(a.a.readConfigurationTags(t),a.a.eventConfigurationFunctions,this.settings_event),this.initialConfigure()}this.settings_event_page={};const t=this.char.page();if(!t)return;let e="";for(const i of t.list)108!==i.code&&408!==i.code||(e+=i.parameters[0]);a.a.readConfigurationFunctions(a.a.readConfigurationTags(e),a.a.eventConfigurationFunctions,this.settings_event_page),this.updateScale(),this.updateShape(),this.char.mv3d_needsConfigure&&(this.char.mv3d_needsConfigure=!1,this.needsPositionUpdate=!0,this.pageConfigure())}initialConfigure(){this.configureHeight()}pageConfigure(t=this.settings_event_page){const e=t===this.settings;if("pos"in t){const i=this.char.event(),a=t;this.char.locate(Object(r.p)(i.x,a.x),Object(r.p)(i.y,a.y)),e&&delete t.pos}if(this.setupEventLights(),this.lamp){if("lamp"in t){const t=this.getConfig("lamp");this.blendLampColor.setValue(t.color,.5),this.blendLampIntensity.setValue(t.intensity,.5),this.blendLampDistance.setValue(t.distance,.5)}e&&delete t.lamp}if(this.flashlight){if("flashlight"in t){const i=this.getConfig("flashlight");this.blendFlashlightColor.setValue(i.color,.5),this.blendFlashlightIntensity.setValue(i.intensity,.5),this.blendFlashlightDistance.setValue(i.distance,.5),this.blendFlashlightAngle.setValue(i.angle,.5),e&&delete t.flashlight}"flashlightPitch"in t&&(this.blendFlashlightPitch.setValue(this.getConfig("flashlightPitch",90),.25),e&&delete t.flashlightPitch)}("height"in t||this.isAbove!==(2===this.char._priorityType))&&(this.configureHeight(),e&&delete t.height),this.updateScale(),this.updateShape(),this.needsMaterialUpdate=!0,this.updateLightOffsets()}updateEmissive(){if(!this.material)return;const t=this.material.emissiveColor,e=this.getConfig("glow",new s.c(0,0,0,0));if(this.material.mv3d_glowColor=e,this.lamp){const i=this.lamp.diffuse,a=Math.max(0,Math.min(1,this.lamp.intensity,this.lamp.range,this.lamp.intensity/4+this.lamp.range/4));t.set(Math.max(e.r,i.r*a),Math.max(e.g,i.g*a),Math.max(e.b,i.b*a))}else t.set(e.r,e.g,e.b);const i=this.mv_sprite._blendColor,a=i[3]/255;t.r+=(2-t.r)*Math.pow(i[0]/255*a,.5),t.g+=(2-t.g)*Math.pow(i[1]/255*a,.5),t.b+=(2-t.b)*Math.pow(i[2]/255*a,.5),this.material.mv3d_noShadow=!this.getConfig("dynShadow",!0)}configureHeight(){this.isAbove=2===this.char._priorityType;let t=Math.max(0,this.getConfig("height",this.isAbove&&!this.hasConfig("zlock")?a.a.EVENT_HEIGHT:0));this.blendElevation.setValue(t,0),this.z=this.platformHeight+t}setupMesh(){this.mesh.mv3d_isSetup||(a.a.callFeatures("createCharMesh",this.mesh),this.mesh.parent=this.spriteOrigin,this.mesh.character=this,this.mesh.order=this.order,this.material&&(this.mesh.material=this.material),this.isEmpty?this.mesh.setEnabled(!1):this.mesh.setEnabled(!0),this.mesh.mv3d_isSetup=!0),this.flashlight&&(this.flashlight.excludedMeshes.splice(0,1/0),this.flashlight.excludedMeshes.push(this.mesh))}dirtyNearbyCells(){this.cell&&characters_Character.dirtyNearbyCells(this.cell.cx,this.cell.cy)}static dirtyNearbyCells(t,e){for(let i=t-1;i<=t+1;++i)for(let t=e-1;t<=e+1;++t){let e=i,s=t;$gameMap.isLoopHorizontal()&&(e=e.mod(Math.ceil($gameMap.width()/a.a.CELL_SIZE))),$gameMap.isLoopVertical()&&(s=s.mod(Math.ceil($gameMap.height()/a.a.CELL_SIZE)));const r=a.a.cells[[e,s]];r&&(r._needsIntensiveUpdate||(r._needsIntensiveUpdate=!0,a.a._cellsNeedingIntensiveUpdate.push(r)))}}intensiveUpdate(){this.setupLightInclusionLists()}setupLightInclusionLists(){this.flashlight&&(this.flashlight.includedOnlyMeshes.splice(0,1/0),this.flashlight.includedOnlyMeshes.push(...this.getMeshesInRangeOfLight(this.flashlight))),this.lamp&&(this.lamp.includedOnlyMeshes.splice(0,1/0),this.lamp.includedOnlyMeshes.push(...this.getMeshesInRangeOfLight(this.lamp)))}getMeshesInRangeOfLight(t){if(!this.cell)return[];const e=s.z.TransformCoordinates(t.position,t.getWorldMatrix()),i=[];for(let r=this.cell.cx-1;r<=this.cell.cx+1;++r)for(let n=this.cell.cy-1;n<=this.cell.cy+1;++n){let o=r,h=n;$gameMap.isLoopHorizontal()&&(o=o.mod(Math.ceil($gameMap.width()/a.a.CELL_SIZE))),$gameMap.isLoopVertical()&&(h=h.mod(Math.ceil($gameMap.height()/a.a.CELL_SIZE)));const l=a.a.cells[[o,h]];if(!l||!l.mesh)continue;const c=l.mesh.getBoundingInfo().boundingSphere;if(!(s.z.Distance(e,c.centerWorld)>=c.radiusWorld+t.range)){i.push(l.mesh);for(let a of l.characters){const r=a.mesh.getBoundingInfo().boundingSphere;s.z.Distance(e,r.centerWorld)>=r.radiusWorld+t.range||i.push(a.mesh)}}}return i}setupEventLights(){const t=this.getConfig("flashlight"),e=this.getConfig("lamp");t&&!this.flashlight&&this.setupFlashlight(),e&&!this.lamp&&this.setupLamp()}setupLights(){"flashlightColor"in this.char.mv3d_blenders&&this.setupFlashlight(),"lampColor"in this.char.mv3d_blenders&&this.setupLamp()}setupFlashlight(){if(this.flashlight)return;const t=this.getConfig("flashlight",{color:16777215,intensity:1,distance:a.a.LIGHT_DIST,angle:a.a.LIGHT_ANGLE});this.blendFlashlightColor=this.makeColorBlender("flashlightColor",t.color),this.blendFlashlightIntensity=this.makeBlender("flashlightIntensity",t.intensity),this.blendFlashlightDistance=this.makeBlender("flashlightDistance",t.distance);const e=this.blendFlashlightDistance.targetValue();this.blendFlashlightDistance.setValue(0,0),this.blendFlashlightDistance.setValue(e,.25),this.blendFlashlightAngle=this.makeBlender("flashlightAngle",t.angle),this.flashlight=new s.u("flashlight",s.z.Zero(),s.z.Zero(),Object(r.i)(this.blendFlashlightAngle.targetValue()+a.a.FLASHLIGHT_EXTRA_ANGLE),0,a.a.scene),this.flashlight.renderPriority=2,this.updateFlashlightExp(),this.flashlight.range=this.blendFlashlightDistance.targetValue(),this.flashlight.intensity=this.blendFlashlightIntensity.targetValue()*a.a.FLASHLIGHT_INTENSITY_MULTIPLIER,this.flashlight.diffuse.set(...this.blendFlashlightColor.targetComponents()),this.flashlight.direction.y=-1,this.flashlightOrigin=new s.x("flashlight origin",a.a.scene),this.flashlightOrigin.parent=this.lightOrigin,this.flashlight.parent=this.flashlightOrigin,this.blendFlashlightPitch=this.makeBlender("flashlightPitch",90),this.blendFlashlightYaw=this.makeBlender("flashlightYaw",0),this.blendFlashlightYaw.cycle=360,this.updateFlashlightDirection(),this.setupMesh(),this.updateLightOffsets()}updateFlashlightExp(){this.flashlight.exponent=64800*Math.pow(this.blendFlashlightAngle.currentValue(),-2)}setupLamp(){if(this.lamp)return;const t=this.getConfig("lamp",{color:16777215,intensity:1,distance:a.a.LIGHT_DIST});this.blendLampColor=this.makeColorBlender("lampColor",t.color),this.blendLampIntensity=this.makeBlender("lampIntensity",t.intensity),this.blendLampDistance=this.makeBlender("lampDistance",t.distance);const e=this.blendLampDistance.targetValue();this.blendLampDistance.setValue(0,0),this.blendLampDistance.setValue(e,.25),this.lamp=new s.q("lamp",s.z.Zero(),a.a.scene),this.lamp.renderPriority=1,this.lamp.diffuse.set(...this.blendLampColor.targetComponents()),this.lamp.intensity=this.blendLampIntensity.targetValue(),this.lamp.range=this.blendLampDistance.targetValue(),this.lampOrigin=new s.x("lamp origin",a.a.scene),this.lampOrigin.parent=this.lightOrigin,this.lamp.parent=this.lampOrigin,this.updateLightOffsets()}updateFlashlightDirection(){this.flashlightOrigin.yaw=this.blendFlashlightYaw.currentValue(),this.flashlightOrigin.pitch=-this.blendFlashlightPitch.currentValue()}updateLights(){if(this.flashlight){const t=180+Object(r.p)(a.a.dirToYaw(this.char.mv3d_direction(),a.a.DIR8MOVE),this.getConfig("flashlightYaw","+0"));t!==this.blendFlashlightYaw.targetValue()&&this.blendFlashlightYaw.setValue(t,.25),this.blendFlashlightColor.update()|this.blendFlashlightIntensity.update()|this.blendFlashlightDistance.update()|this.blendFlashlightAngle.update()|this.blendFlashlightYaw.update()|this.blendFlashlightPitch.update()&&(this.flashlight.diffuse.set(...this.blendFlashlightColor.currentComponents()),this.flashlight.intensity=this.blendFlashlightIntensity.currentValue()*a.a.FLASHLIGHT_INTENSITY_MULTIPLIER,this.flashlight.range=this.blendFlashlightDistance.currentValue(),this.flashlight.angle=Object(r.i)(this.blendFlashlightAngle.currentValue()+a.a.FLASHLIGHT_EXTRA_ANGLE),this.updateFlashlightExp(),this.updateFlashlightDirection())}this.lamp&&this.blendLampColor.update()|this.blendLampIntensity.update()|this.blendLampDistance.update()&&(this.lamp.diffuse.set(...this.blendLampColor.currentComponents()),this.lamp.intensity=this.blendLampIntensity.currentValue(),this.lamp.range=this.blendLampDistance.currentValue(),this.needsMaterialUpdate=!0)}makeBlender(t,e,i=blenders_Blender){t in this.char.mv3d_blenders?e=this.char.mv3d_blenders[t]:this.char.mv3d_blenders[t]=e;const a=new i(t,e);return a.storageLocation=()=>this.char.mv3d_blenders,a}makeColorBlender(t,e){return this.makeBlender(t,e,ColorBlender)}hasBush(){return!this.platformChar&&(this.getConfig("bush",!(this.char.isTile()||this.isVehicle||this.isEvent&&this.char.isObjectCharacter()))&&!(this.blendElevation.currentValue()||this.falling))}getShape(){return this.getConfig("shape",a.a.enumShapes.SPRITE)}updateShape(){const t=this.getShape();if(this.shape===t)return;this.shape=t;let e=characters_Sprite.Meshes.SPRITE;const i=a.a.enumShapes;switch(this.shape){case i.FLAT:e=characters_Sprite.Meshes.FLAT;break;case i.XCROSS:case i.CROSS:e=characters_Sprite.Meshes.CROSS;break;case i.WALL:case i.FENCE:}a.a.callFeatures("destroyCharMesh",this.mesh),this.mesh.dispose(),this.mesh=e.clone(),this.setupMesh(),this.spriteOrigin.rotation.set(0,0,0),this.dirtyNearbyCells()}update(){this.char._erased&&this.dispose(),this.visible=this.mv_sprite.visible,"function"==typeof this.char.isVisible&&(this.visible=this.visible&&this.char.isVisible());const t=this.char.mv3d_inRenderDist();this.disabled=!this.visible,(this.char.isTransparent()||!t||(this.char._characterName||this.char._tileId)&&!this.textureLoaded)&&(this.visible=!1),this._isEnabled?this.visible||this.setEnabled(!1):this.visible&&(this.setEnabled(!0),this.needsPositionUpdate=!0),this.isImageChanged()&&this.updateCharacter(),t&&(this.blendElevation.update()?this.needsPositionUpdate=!0:(this.x!==this.char._realX||this.y!==this.char._realY||this.falling||this.prevZ!==this.z||this.platformChar&&this.platformChar.needsPositionUpdate||this.isPlayer||this.char===$gamePlayer.vehicle())&&(this.needsPositionUpdate=!0,this.prevZ=this.z),this.material&&this._isEnabled?this.updateNormal():this.updateEmpty(),this.updateAnimations(),this.needsMaterialUpdate&&(this.updateEmissive(),this.needsMaterialUpdate=!1),this.char.mv3d_positionUpdated=this.needsPositionUpdate,this.needsPositionUpdate=!1)}updateNormal(){const t=a.a.enumShapes;this.shape===t.SPRITE?(this.mesh.pitch=a.a.blendCameraPitch.currentValue()-90,this.mesh.yaw=a.a.blendCameraYaw.currentValue()):this.shape===t.TREE?(this.spriteOrigin.pitch=this.getConfig("pitch",0),this.mesh.yaw=a.a.blendCameraYaw.currentValue()):(this.mesh.yaw=this.getConfig("rot",0),this.spriteOrigin.pitch=this.getConfig("pitch",0),this.spriteOrigin.yaw=this.getConfig("yaw",0),this.shape===t.XCROSS&&(this.mesh.yaw+=45)),this.isPlayer&&(this.mesh.visibility=+!a.a.is1stPerson(!0)),this.updateAlpha(),this.updatePosition(),this.updateElevation(),this.shadow&&this.updateShadow(),this.updateLights()}updateEmpty(){this.updatePosition(),this.updateElevation(),this.updateLights(),this.shadow&&this.shadow._isEnabled&&this.shadow.setEnabled(!1)}updateAlpha(){let t=this.hasConfig("alpha")||this.char.opacity()<255;this.bush=Boolean(this.char.bushDepth());const e=a.a.blendModes[this.char.blendMode()];if(this.material.alphaMode!==e&&(this.material.alphaMode=e),e!==a.a.blendModes.NORMAL)t=!0;else if(this.bush&&this.hasBush()){if(!this.material.opacityTexture){const t=a.a.getBushAlphaTextureSync();t&&t.isReady()&&(this.material.opacityTexture=t)}}else this.material.opacityTexture&&(this.material.opacityTexture=null);t||this.material.opacityTexture?(this.material.useAlphaFromDiffuseTexture=!0,this.material.alpha=this.getConfig("alpha",1)*this.char.opacity()/255):(this.material.useAlphaFromDiffuseTexture=!1,this.material.alpha=1)}updateLightOffsets(){if(this.lamp){const t=this.getConfig("lampHeight",a.a.LAMP_HEIGHT),e=this.getConfig("lampOffset",null);this.lampOrigin.position.set(0,0,0),this.lampOrigin.z=t,e&&(this.lampOrigin.x=e.x,this.lampOrigin.y=e.y)}if(this.flashlight){const t=this.getConfig("flashlightHeight",a.a.FLASHLIGHT_HEIGHT),e=this.getConfig("flashlightOffset",null);this.flashlightOrigin.position.set(0,0,0),this.flashlightOrigin.z=t,e&&(this.flashlightOrigin.x=e.x,this.flashlightOrigin.y=e.y)}}updatePositionOffsets(){this.spriteOrigin.position.set(0,0,0),this.shape===a.a.enumShapes.FLAT?this.spriteOrigin.z=4*a.a.LAYER_DIST:this.shape===a.a.enumShapes.SPRITE?this.spriteOrigin.z=4*a.a.LAYER_DIST*(1-Math.max(0,Math.min(90,a.a.blendCameraPitch.currentValue()))/90):this.spriteOrigin.z=0;const t=new s.y(Math.sin(-a.a.cameraNode.rotation.y),Math.cos(a.a.cameraNode.rotation.y));this.billboardOffset=t,this.shape===a.a.enumShapes.SPRITE?(this.spriteOrigin.x=t.x*a.a.SPRITE_OFFSET,this.spriteOrigin.y=t.y*a.a.SPRITE_OFFSET,this.lightOrigin.x=this.spriteOrigin.x,this.lightOrigin.y=this.spriteOrigin.y):(this.lightOrigin.x=0,this.lightOrigin.y=0),this.spriteOrigin.x+=this.getConfig("xoff",0),this.spriteOrigin.y+=this.getConfig("yoff",0),this.spriteOrigin.z+=this.getConfig("zoff",0)}updatePosition(){this.updatePositionOffsets();const t=a.a.loopCoords(this.char._realX,this.char._realY);if(this.x=t.x,this.y=t.y,!this.needsPositionUpdate)return;const e=Math.floor(Math.round(this.char._realX)/a.a.CELL_SIZE),i=Math.floor(Math.round(this.char._realY)/a.a.CELL_SIZE),s=a.a.cells[[e,i]];this.cell&&this.cell!==s&&this.removeFromCell(),s&&!this.cell&&(this.cell=s,s.characters.push(this)),this.dirtyNearbyCells()}updateElevation(){if(!this.needsPositionUpdate)return;if(this.char.isMoving()&&!((this.x-.5)%1)&&!((this.y-.5)%1))return;if(this.falling=!1,this.isPlayer){const t=this.char.vehicle();if(t&&(this.z=t.z,this.targetElevation=t.targetElevation,this.platformChar=t.platformChar,this.platformHeight=t.platformHeight,t._driving))return}if(this.hasConfig("zlock"))return this.z=this.getConfig("zlock",0),void(this.z+=this.blendElevation.currentValue());const t=this.getPlatform(this.char._realX,this.char._realY);this.platform=t,this.platformHeight=t.z2,this.platformChar=t.char,this.targetElevation=this.platformHeight+this.blendElevation.currentValue();let e=this.getConfig("gravity",a.a.GRAVITY)/60;if(this.hasFloat=this.isVehicle||(this.isPlayer||this.isFollower)&&$gamePlayer.vehicle(),this.hasFloat&&!this.platformChar&&(this.targetElevation+=a.a.getFloatHeight(Math.round(this.char._realX),Math.round(this.char._realY),this.z+this.spriteHeight)),this.isAirship&&$gamePlayer.vehicle()===this.char&&(this.targetElevation+=a.a.loadData("airship_height",a.a.AIRSHIP_SETTINGS.height)*this.char._altitude/this.char.maxAltitude()),this.char.isJumping()){let t=1-this.char._jumpCount/(2*this.char._jumpPeak),e=-4*Math.pow(t-.5,2)+1,i=Math.abs(this.char.mv3d_jumpHeightEnd-this.char.mv3d_jumpHeightStart);this.z=this.char.mv3d_jumpHeightStart*(1-t)+this.char.mv3d_jumpHeightEnd*t+e*i/2+this.char.jumpHeight()/Object(r.t)()}else if(e){const t=Math.abs(this.targetElevation-this.z);t<e&&(e=t),this.z<this.platformHeight&&(this.z=this.platformHeight),this.z>this.targetElevation?(this.z-=e,a.a.tileCollision(this,this.char._realX,this.char._realY,!1,!1)&&(this.z=this.platformHeight)):this.z<this.targetElevation&&(this.z+=e,a.a.tileCollision(this,this.char._realX,this.char._realY,!1,!1)&&(this.z-=e)),this.falling=this.z>this.targetElevation}}getPlatform(t=this.char._realX,e=this.char._realY,i={}){return a.a.getPlatformForCharacter(this,t,e,i)}getPlatformFloat(t=this.char._realX,e=this.char._realY,i={}){i.platform||(i.platform=this.getPlatform(t,e,i));const s=i.platform;let r=s.z2;if(this.hasFloat&&!s.char){const i=this.getCHeight();r+=a.a.getFloatHeight(Math.round(t),Math.round(e),this.z+Math.max(i,a.a.STAIR_THRESH),a.a.STAIR_THRESH>=i)}return r}updateShadow(){let t=Boolean(this.getConfig("shadow",this.shape!=a.a.enumShapes.FLAT));if(t&&(this.isPlayer||this.isFollower)){const e=a.a.characters.indexOf(this);if(e>=0)for(let i=e+1;i<a.a.characters.length;++i){const e=a.a.characters[i];if(e.shadow&&e.visible&&(e.char._realX===this.char._realX&&e.char._realY===this.char._realY)){t=!1;break}}}if(this.shadow._isEnabled?t||this.shadow.setEnabled(!1):t&&this.shadow.setEnabled(!0),!t)return;const e=Math.max(this.z-this.platformHeight,0),i=this.getConfig("shadowDist",4),s=Math.max(0,1-Math.abs(e)/i);this.shadow.z=-e+3.5*a.a.LAYER_DIST,this.shadow.x=this.spriteOrigin.x,this.shadow.y=this.spriteOrigin.y;const r=this.getConfig("shadow",1);this.shadow.scaling.setAll(r*s),this.shadow.isAnInstance||(this.shadow.visibility=s-.5*this.bush)}updateAnimations(){this.char.isBalloonPlaying()?(this._balloon||(this._balloon=a.a.showBalloon(this)),this._balloon.update()):this.disposeBalloon();for(const t of this.char.mv_sprite._animationSprites)t.mv3d_animation&&t.mv3d_animation.update();this.char.mv_sprite._animationSprites.length&&(this.needsMaterialUpdate=!0)}disposeBalloon(){this._balloon&&(this._balloon.dispose(),this._balloon=null)}dispose(...t){super.dispose(...t),delete this.char.mv3d_sprite;const e=a.a.characters.indexOf(this);a.a.characters.splice(e,1),this.disposeBalloon(),this.removeFromCell()}removeFromCell(){if(this.cell){const t=this.cell.characters.indexOf(this);t>=0&&this.cell.characters.splice(t,1),this.cell=null}}getCHeight(){let t=this.getConfig("collide",this.shape===a.a.enumShapes.FLAT||0===this.char._priorityType?0:this.spriteHeight);return!0===t?this.spriteHeight:Number(t)}getCollider(){if(this._collider)return this._collider;const t={char:this};return this._collider=t,Object.defineProperties(t,{z1:{get:()=>this.z},z2:{get:()=>Math.max(this.z,this.z+this.getCHeight())}}),t}getTriggerCollider(){if(this._triggerCollider)return this._triggerCollider;const t={};return this._triggerCollider=t,Object.defineProperties(t,{z1:{get:()=>{const t=this.getConfig("trigger");return t?this.z-t.down:a.a.TRIGGER_INFINITE||this.isEmpty?-1/0:this.getCollider().z1}},z2:{get:()=>{const t=this.getConfig("trigger");return t?this.z-t.up:a.a.TRIGGER_INFINITE||this.isEmpty?1/0:this.getCollider().z2}}}),t}getCollisionHeight(t=this.z){return{z1:t,z2:t+this.getCHeight(),char:this}}getTriggerHeight(t=this.z){const e=this.getConfig("trigger");return e?{z1:t-e.down,z2:t+e.up}:a.a.TRIGGER_INFINITE||this.isEmpty?{z1:-1/0,z2:1/0}:this.getCollisionHeight()}}Object(r.m)(Sprite_Character.prototype,"characterPatternY",t=>(function(){const e=this._character.mv3d_sprite;if(!e)return t.apply(this,arguments);const i=e.getConfig("dirfix",e.isEvent&&e.char.isObjectCharacter()),s=this._character.mv3d_direction(),r=!this._isBigCharacter&&this._characterIndex<4&&this._characterName.includes(a.a.DIAG_SYMBOL);let n;return(n=i||a.a.isDisabled()?r?s:this._character.direction():r?a.a.transformFacing(s,a.a.blendCameraYaw.currentValue(),!0):a.a.transformFacing(s,a.a.blendCameraYaw.currentValue(),!1))%2?G[n]:n/2-1}),()=>!a.a.isDisabled()||a.a.DIR8MOVE&&a.a.DIR8_2D);const G={3:4,1:5,9:6,7:7};Object(r.m)(Sprite_Character.prototype,"setFrame",t=>(function(e,i,a,s){t.apply(this,arguments);const r=this._character.mv3d_sprite;r&&(r.isImageChanged()||r.setFrame(e,i,this.patternWidth(),this.patternHeight()))})),Object(r.m)(Sprite_Character.prototype,"setBlendColor",t=>(function(){t.apply(this,arguments);const e=this._character.mv3d_sprite;e&&(e.needsMaterialUpdate=!0)})),a.a.Sprite=characters_Sprite,a.a.Character=characters_Character;const j=Game_CharacterBase.prototype.isOnBush;Game_CharacterBase.prototype.isOnBush=function(){if(a.a.isDisabled()||!this.mv3d_sprite)return j.apply(this,arguments);const t=Math.round(this._realX),e=Math.round(this._realY),i=a.a.getTileData(t,e),s=a.a.getTileLayers(t,e,this.mv3d_sprite.z+this.mv3d_sprite.getCHeight(),!1),r=$gameMap.tilesetFlags();for(const t of s)if(0!=(64&r[i[t]]))return!0;return!1},Object.assign(a.a,{showAnimation(t){t||(t=$gamePlayer.mv3d_sprite)},showBalloon:t=>(t||(t=$gamePlayer.mv3d_sprite),new animations_Balloon(t))});class animations_AnimSprite extends s.x{constructor(t,e,i,r){super("animSprite",a.a.scene),this.cellWidth=e,this.cellHeight=i,this.cellIndex=0,this.isSmooth=r,this.mesh=a.a.Meshes.BASIC.clone(),this.mesh.isPickable=!1,this.mesh.parent=this,this.mesh.setEnabled(!1),this.material=new s.v("anim material",a.a.scene),this.mesh.material=this.material,this.material.useAlphaFromDiffuseTexture=!0,this.material.alphaCutOff=0,this.material.disableLighting=!0,this.material.emissiveColor.set(1,1,1),this.material.ambientColor.set(1,1,1),this.material.specularColor.set(0,0,0),this.loadTexture(t)}async loadTexture(t){this.texture=await a.a.createTexture(t),this.texture.hasAlpha=!0,this.material.diffuseTexture=this.texture,await a.a.waitTextureLoaded(this.texture),this.texture.updateSamplingMode(this.isSmooth?s.w.BILINEAR_SAMPLINGMODE:s.w.NEAREST_SAMPLINGMODE),this.textureLoaded=!0;const e=this.texture.getBaseSize();this.cellCols=Math.floor(e.width/this.cellWidth)}update(){this.textureLoaded&&(this.mesh.isEnabled()||this.mesh.setEnabled(!0),this.pitch=a.a.blendCameraPitch.currentValue()-90,this.yaw=a.a.blendCameraYaw.currentValue(),this.texture.crop(this.cellIndex%this.cellCols*this.cellWidth,Math.floor(this.cellIndex/this.cellCols)*this.cellHeight,this.cellWidth,this.cellHeight,!0))}dispose(){super.dispose(!1,!0)}}class animations_Balloon extends animations_AnimSprite{constructor(t){super("img/system/Balloon.png",48,48,!1),this.char=t}update(){if(!this.char)return;const t=V(new s.z(0,.5+this.char.spriteHeight,0),this.char);this.position.copyFrom(t);const e=this.char.char.mv_sprite._balloonSprite;e&&(this.cellIndex=8*(e._balloonId-1)+Math.max(0,e.frameIndex()),super.update())}}class animations_DepthAnimation{constructor(t){this.animation=t,this.spriteList=[],this.char=this.animation._target._character.mv3d_sprite}resetSpriteList(){for(const t of this.spriteList)t.unused=!0}clearUnusedSprites(){for(let t=this.spriteList.length-1;t>=0;--t){const e=this.spriteList[t];e.unused&&e.setEnabled(!1)}}update(){const t=this.char;if(!t)return;const e=a.a.camera.getDirection(a.a.camera.getTarget());this.resetSpriteList();const i=this.animation._animation.frames[this.animation.currentFrameIndex()];if(i)for(let n=0;n<Math.min(this.animation._cellSprites.length);++n){const o=this.animation._cellSprites[n];if(!o.visible||!o.bitmap)continue;const h=this.getAnimationSprite(o.bitmap._url);h.material.alphaMode=a.a.blendModes[o.blendMode],h.mesh.roll=Object(r.o)(o.rotation);const l=this.animation._mv3d_animationSettings.scale||1;h.mesh.scaling.x=4*o.scale.x*l,h.mesh.scaling.y=4*o.scale.y*l,h.material.alpha=o.opacity/255;const c=V(new s.z(o.position.x/48*l,k(this.animation)-o.position.y/48*l,0),t);h.position.copyFrom(c);const p=Math.pow(l,2);h.mesh.position.set(.1*-e.x*(n+1)*p,.1*-e.y*(n+1)*p,.1*-e.z*(n+1)*p);const d=i[n][0];h.cellIndex=d,h.update()}this.clearUnusedSprites()}getAnimationSprite(t){let e;for(const i of this.spriteList)if(i._mv3d_sprite_url===t&&i.unused){i.unused=!1,i.setEnabled(!0),e=i;break}if(!e){e=new animations_AnimSprite(t,192,192,!0),this.spriteList.push(e),e._mv3d_sprite_url=t;const i=this.animation._mv3d_animationSettings;0==i.depth&&null!=i.depth&&(e.mesh.renderingGroupId=a.a.enumRenderGroups.FRONT)}return e}remove(){for(const t of this.spriteList)t.dispose();this.spriteList.length=0}}function V(t,e){return e.isEmpty||e.shape!==a.a.enumShapes.SPRITE?s.z.TransformCoordinates(t,a.a.getTranslationMatrix(e.mesh)):s.z.TransformCoordinates(t,a.a.getUnscaledMatrix(e.mesh))}const z=Sprite_Character.prototype.startAnimation;Sprite_Character.prototype.startAnimation=function(){if(z.apply(this,arguments),a.a.mapDisabled||!(SceneManager._scene instanceof Scene_Map))return;const t=this._animationSprites[this._animationSprites.length-1];if(t._mv3d_animationSettings=this._character._mv3d_animationSettings,delete this._character._mv3d_animationSettings,t._mv3d_animationSettings)return t.mv3d_animation=new animations_DepthAnimation(t),void a.a.pixiSprite.addChild(t._screenFlashSprite);a.a.pixiSprite.addChild(t)};const $=Sprite_Animation.prototype.remove;Sprite_Animation.prototype.remove=function(){!a.a.mapDisabled&&this.mv3d_animation&&(this._screenFlashSprite&&this.addChild(this._screenFlashSprite),this.mv3d_animation.remove()),$.apply(this,arguments)};const Y=Sprite_Animation.prototype.updateScreenFlash;function k(t){const e=t._animation.position,i=3===e?0:1-e/2,a=t._target._character;return a.mv3d_sprite?i*a.mv3d_sprite.spriteHeight:i}Sprite_Animation.prototype.updateScreenFlash=function(){Y.apply(this,arguments),!a.a.mapDisabled&&SceneManager._scene instanceof Scene_Map&&(this._screenFlashSprite.x=0,this._screenFlashSprite.y=0)};const U=Sprite_Character.prototype.updateAnimationSprites;Sprite_Character.prototype.updateAnimationSprites=function(){if(U.apply(this,arguments),!a.a.mapDisabled&&this._animationSprites.length&&SceneManager._scene instanceof Scene_Map&&this._character.mv3d_sprite)for(const t of this._animationSprites){if(t.mv3d_animation)continue;if(3===t._animation.position){t.update();continue}const e=V(new s.z(0,k(t),0),this._character.mv3d_sprite),i=a.a.getScreenPosition(e),r=s.z.Distance(a.a.camera.globalPosition,e),n=a.a.camera.mode===s.n?a.a.getScaleForDist():a.a.getScaleForDist(r);t.behindCamera=i.behindCamera,t.update(),t.x=i.x,t.y=i.y,t.scale.set(n,n)}};const W=Sprite_Animation.prototype.updateCellSprite;Sprite_Animation.prototype.updateCellSprite=function(t,e){W.apply(this,arguments),this.behindCamera&&(t.visible=!1)},Object(r.m)(Game_Map.prototype,"setupParallax",t=>(function(){t.apply(this,arguments),this.mv3d_parallaxX=0,this.mv3d_parallaxY=0})),Object(r.m)(Game_Map.prototype,"changeParallax",t=>(function(e,i,a,s,r){(this._parallaxLoopX&&!i||this._parallaxSx&&!s)&&(this.mv3d_parallaxX=0),(this._parallaxLoopY&&!a||this._parallaxSy&&!r)&&(this.mv3d_parallaxY=0),t.apply(this,arguments)})),Object(r.m)(Game_Map.prototype,"updateParallax",t=>(function(){this._parallaxLoopX&&(this.mv3d_parallaxX+=this._parallaxSx/8),this._parallaxLoopY&&(this.mv3d_parallaxY+=this._parallaxSy/8)})),Object(r.m)(Game_Map.prototype,"parallaxOx",t=>(function(){let t=this.mv3d_parallaxX;return this._parallaxLoopX?t-816*a.a.blendCameraYaw.currentValue()/90:t})),Object(r.m)(Game_Map.prototype,"parallaxOy",t=>(function(){let t=this.mv3d_parallaxY;return this._parallaxLoopY?t-816*a.a.blendCameraPitch.currentValue()/90:0})),Game_CharacterBase.prototype.mv3d_inRenderDist=function(){const t=a.a.loopCoords(this.x,this.y);return Math.abs(t.x-a.a.cameraStick.x)<=a.a.renderDist&&Math.abs(t.y-a.a.cameraStick.y)<=a.a.renderDist},Object(r.m)(Game_CharacterBase.prototype,"isNearTheScreen",t=>(function(){return a.a.EVENTS_UPDATE_NEAR&&this.mv3d_inRenderDist()||t.apply(this,arguments)})),Object(r.m)(Game_Screen.prototype,"shake",t=>(function(){return 0}),()=>!a.a.isDisabled()&&SceneManager._scene instanceof Scene_Map),Object(r.m)(Game_CharacterBase.prototype,"screenX",t=>(function(){const e=this.mv3d_sprite;return e?SceneManager.isNextScene(Scene_Battle)&&this===$gamePlayer?Graphics.width/2:a.a.getScreenPosition(e).x:t.apply(this,arguments)})),Object(r.m)(Game_CharacterBase.prototype,"screenY",t=>(function(){const e=this.mv3d_sprite;return e?SceneManager.isNextScene(Scene_Battle)&&this===$gamePlayer?Graphics.height/2:a.a.getScreenPosition(e).y:t.apply(this,arguments)}));const X=Utils.isOptionValid("test"),Z=async(t,e)=>{const a=i(4),s=i(5),r=s.resolve(global.__dirname,t);await Q(s.dirname(r)),await new Promise((t,i)=>{a.writeFile(r,e,e=>{e?i(e):t()})})},Q=t=>new Promise((e,a)=>{const s=i(4),r=i(5);s.mkdir(r.resolve(global.__dirname,t),{recursive:!0},t=>{t&&"EEXIST"!==t.code?a(t):e()})}),K=DataManager.loadDataFile;DataManager.loadDataFile=function(t,e){e.startsWith("Test_mv3d_")&&(e=e.replace("Test_mv3d_","mv3d_")),K.call(this,t,e)};class DataProxy{constructor(t,e,a={}){if(this.varName=t,this.fileName=e,X){const t=i(4),s=i(5).resolve(nw.__dirname,"data",e);t.existsSync(s)||t.writeFileSync(s,JSON.stringify("function"==typeof a?a():a))}DataManager._databaseFiles.push({name:t,src:e}),this._dirty=!1,this._data_handler={get:(t,e)=>t[e]&&"object"==typeof t[e]?new Proxy(t[e],data_handler):t[e],set:(t,e,i)=>{this._dirty=!0,t[e]=i},deleteProperty:(t,e)=>{this._dirty=!0,delete t[e]}},this.writing=!1,DataProxy.list.push(this)}setup(){this._data=window[this.varName],X&&(window[this.varName]=new Proxy(this._data,this._data_handler))}async update(){X&&this._dirty&&!this.writing&&(this.writing=!0,this._dirty=!1,await Z(`data/${this.fileName}`,JSON.stringify(this._data)),this.writing=!1)}}DataProxy.list=[],a.a.DataProxy=DataProxy;const q=Scene_Boot.prototype.start;Scene_Boot.prototype.start=function(){q.apply(this,arguments),a.a.setupData()},Object.assign(a.a,{setupData(){for(const t of DataProxy.list)t.setup()},updateData(){for(const t of DataProxy.list)t.update()}}),new DataProxy("mv3d_data","mv3d_data.json",()=>({id:crypto.getRandomValues(new Uint32Array(1))[0]}));i(6)}]);
//# sourceMappingURL=mv3d.js.map