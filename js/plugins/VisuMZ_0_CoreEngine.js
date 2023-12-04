//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.79;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.79] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 * 
 * Auto Battle Attack Seal Bypass
 * 
 * By default, if the attack skill is sealed via a trait and an actor has
 * auto-battle, the action can still be used via auto-battle. This is now fixed
 * and actors should not be able to attack via auto-battle if their attack
 * ability is sealed.
 * 
 * ---
 * 
 * Auto Battle Lock Up
 * 
 * If an auto battle Actor fights against an enemy whose DEF/MDF is too high,
 * they will not use any actions at all. This can cause potential game freezing
 * and softlocks. This plugin will change that and have them default to a
 * regular Attack.
 * 
 * ---
 * 
 * Battle Forced End Action Crash
 * 
 * Depending on various circumstances, currently active battlers can be cleared
 * from the battle system at will due to a number of reasons. However, if it
 * just so happens that the targets are cleared, too, with actions remaining,
 * then a crash will follow up. This plugin will prevent that change. Fix made
 * by Olivia.
 * 
 * ---
 * 
 * Debug Console Refresh Bug
 * 
 * When pressing F5 to refresh while the debug console (DevTools) is open,
 * some graphics will fail to load properly. This started occurring since the
 * RPG Maker MZ 1.5.0 update and the code for loading the images has now been
 * reverted to the 1.4.4 version where it was last stable.
 * 
 * ---
 * 
 * Gamepad Repeat Input
 * 
 * Cleared inputs on gamepads do not have a downtime and will trigger the
 * following input frame. The causes problems with certain RPG Maker MZ menus
 * where the inputs have to be cleared as the next immediate frame will have
 * them inputted again. This plugin changes it so that whenever inputs are
 * cleared, there is a downtime equal to the keyboard clear frames before the
 * gamepad input is registered once more.
 * 
 * ---
 * 
 * Invisible Battle Sprites
 * 
 * If you removed a party member during battle and added that exact party
 * member back into the same slot, their sprite would appear invisible. The
 * VisuStella Core Engine will fix this problem and prevent it from happening.
 * 
 * ---
 * 
 * Instant Text Discrepancy for Window_Message
 * 
 * Window_Message displays text differently when it draws letters one by one
 * versus when the text is displayed instantly. This isn't noticeable with the
 * default font, but it's very visible when using something like Arial. The
 * error is due to Bitmap.measureTextWidth yielding a rounded value per letter
 * versus per word. The Core Engine will provide a bug fix that will single out
 * the cause and make it so that only Window_Message will not utilize any round
 * number values when determining the width of each letter, whether or not it
 * is shown instantly. This change will only affect Window_Message and not any
 * other window in order to prevent unintended side effects.
 * 
 * This can be disabled through the Plugin Parameters:
 * 
 * Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * 
 * ---
 *
 * Move Picture, Origin Differences
 *
 * If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 * 
 * Overly-Protective Substitute
 * 
 * When an ally with critical health is being targeted by a friendly non-
 * Certain Hit skill (such as a heal or buff) and another ally has the
 * substitute state, the other ally would "protect" the originally targeted
 * ally and take the heal or buff.
 * 
 * The new changed behavior is that now, substitute will not trigger for any
 * actions whose scope targets allies.
 * 
 * ---
 * 
 * Skill List Active After Party Member Change
 * 
 * If the skill list is active (ie. the player can move the cursor around) and
 * the party member currently being viewed is changed via the button commands,
 * then previously, RPG Maker MZ would still have that window be active despite
 * having the cursor hidden temporarily. Upon pressing direction buttons, the
 * cursor reveals itself and both the skill type window and skill list window
 * are both active, making way for lots of potential problems to happen.
 * 
 * ---
 * 
 * Sprite Removal and Destroy Crash
 * 
 * A texture check will now occur for sprites that are being removed and
 * destroyed in order to prevent crashes. In the off chance that someone
 * creates a sprite through a script call and removes it through such, the
 * likelihood of this occurance becomes higher. This makes the "destroy"
 * property take into account a texture check in order to see if the sprite
 * removal is taking extra steps and will reduce those extra steps.
 * 
 * ---
 * 
 * Status Window Name Vertical Cutoffs
 * 
 * In the battle status windows, whenever actor names are displayed, the bitmap
 * used to display their name text do not extend vertically all the way,
 * causing letters like lowercase "Q" and "G" to be cut off, making them hard
 * to distinguish from one another. The Core Engine will remedy this by
 * extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * ---
 * 
 * Termination Clear Effects
 * 
 * In RPG Maker MZ, requesting an animation while transitioning between
 * scenes, such as going from the map scene to the battle scene, can cause
 * crashes. This is because the animation queue does not take off immediately
 * and will likely register incorrect targets for the scene. This plugin will
 * forcefully clear any registered animations and balloon effects when
 * terminating a scene in order to prevent crashes.
 * 
 * ---
 * 
 * Timer Sprite
 * 
 * By default, RPG Maker MZ adds Sprite_Timer into its spriteset, either for
 * maps or for battles. There is one major problem with this: when spritesets
 * are affected by filters, zooms, and/or blurs, this hinders how readable the
 * timer sprite is, making the information perceived by the player to be much
 * harder than it needs to be. The Core Engine adds the sprite to the parent
 * scene instead of the spriteset to ensure it's unobscured by anything else.
 * 
 * ---
 * 
 * Unusable Battle Items
 * 
 * If any party member is able to use an item in battle, then all party members
 * are able to use said item, even if that party member is supposed to be
 * unable to use that item. This is now changed so that battle items are
 * checked on an individual basis and not on a party-wide basis.
 * 
 * ---
 * 
 * Water Tile Bug
 * 
 * It seems like there's a new bug that occurs if you create a tileset from
 * scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 * does is it causes many tiles to become water tiles without intending to.
 * You can find this out by turning off all the plugins in your project,
 * putting a Ship or Boat on what are normally ground tiles, and then seeing
 * the Ship or Boat traverse through it.
 * 
 * There are two ways to fix this. We cannot fix it through code in this plugin
 * as it's a problem that involves the tileset json data there are ways to work
 * around it so that you can get the proper water-flags to go where they need
 * to be at.
 * 
 * 1. Copy a working un-bugged tileset onto the currently bugged one and
 *    reapply the tile features like passability, terrain tags, etc. This will
 *    make sure the water-passability tiles get copied over correctly.
 * 
 * 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *    un-bugged tileset (usually a pre-existing tileset when a new project is
 *    made), click the "Copy Page" button, go to the bugged tileset and press
 *    "Paste Page". You'll have to reapply any different properties like
 *    passabilities and terrain tags, but the water tile flags should now be
 *    working properly.
 * 
 * The plugin will not fix the problem itself since flag data is delicate and
 * should not be tampered with midgame as the changes made by the plugin might
 * not match the desired settings.
 * 
 * This plugin, however, will also send out an alert message when coming across
 * such a tile. Pay attention to it and do one of the following two steps above
 * to fix the problem.
 * 
 * ---
 * 
 * Window Arrows Sprite Tearing
 * 
 * If a window object in RPG Maker MZ were to have an odd number for width size
 * then the arrow elements found for the window would be positioned on a half
 * pixel, giving it a blurry look and also have sprite tearing issues. This is
 * now fixed by rounding the number to the nearest whole number.
 * 
 * ---
 * 
 * Window Client Area Scaling Bug
 * 
 * If the window has a scale value different from 1.0, the client area (the
 * interactable parts) will not scale properly and appear clipped out. This
 * is now fixed by adjusting the client area to the window's scale values and
 * rounding upward to the nearest whole number.
 * 
 * ---
 * 
 * Window Skin Bleeding
 * 
 * This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 * been set from 96 to 95. This results in the window skin bleeding past the
 * window's intended borders. The Core Engine now reverts this change to
 * prevent the bleeding effect from happening.
 * 
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
 * 
 * ---
 * 
 * Digit Grouping
 * 
 * - There exists an option to change how numbers are displayed and converted
 * in your game. This option can be enabled or disabled by going into the
 * Plugin Manager > VisuMZ_0_OptionsCore > Quality of Life Settings >
 * Digit Grouping and toggling on/off whichever ones you want.
 * 
 * - Digit Grouping will follow the rules of whatever country/locale the Plugin
 * Parameters are set to. If it's to default 'en-US', then 1234567.123456 will
 * become 1,234,567.123456. Set it to 'es-ES' and it becomes 1.234.567,123456
 * instead.
 * 
 * - This uses JavaScript's Number.toLocaleString() function and will therefore
 * follow whatever rules it has. This means if there are trailing zeroes at the
 * end of a decimal, it will cut them off. Numbers like 123.45000 will become
 * 123.45 instead. Excess numbers past 6 decimal places will be rounded. A
 * number like 0.123456789 will become 0.123457 instead.
 * 
 * - Numbers in between [ and ], < and > will be excluded from digit grouping
 * in order for text codes to be preserved accurately. \I[1234] will remain as
 * \I[1234].
 * 
 * - If you would like to enter in a number without digit grouping, surround it
 * with {{ and }}. Typing in {{1234567890}} will yield 1234567890.
 * 
 * ---
 * 
 * Show Scrolling Text, additional functionality
 * 
 * The event command "Show Scrolling Text" now has additional functionality as
 * long as the VisuStella MZ Core Engine is installed. If the game dev inserts
 * "// Script Call" (without the quotes) inside the scrolling text, then the
 * entirity of the Show Scrolling Text event command will be ran as a giant
 * script call event command.
 * 
 * The reason why this functionality is added is because the "Script..." event
 * command contains only 12 lines maximum. This means for any script call
 * larger than 12 lines of code cannot be done by normal means as each script
 * call is ran as a separate instance.
 * 
 * By repurposing the "Show Scrolling Text" event command to be able to
 * function as an extended "Script..." event command, such a thing is now
 * possible with less hassle and more lines to code with.
 * 
 * This effect does not occur if the Show Scrolling Text event command does not
 * have "// Script Call" in its contents.
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * === Actors-Related Notetags ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes-Related Notetags ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies-Related Notetags ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 *   - This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations-Related Notetags ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 * 
 * <Mirror Offset X>
 * <No Mirror Offset X>
 * 
 * - Used for: Animation Name Tags
 * - If an animation is mirrored, you can choose to have the animation's Offset
 *   X value be mirrored, too (or not at all).
 * - If no name tag is discovered, this will use the setting found in the
 *   Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset X setting.
 * 
 * ---
 * 
 * <Rate: x>
 * 
 * - Used for: MV Animation Name Tags
 * - Allows you to adjust the update for this MV Animation.
 *   - Does NOT work with Effekseer animations.
 * - The lower the number, the faster.
 * - Replace 'x' with a number representing the animation update rate.
 *   - Default rate: 4.
 *   - Minimum rate: 1.
 *   - Maximum rate: 10.
 * 
 * ---
 *
 * === Quality of Life-Related Notetags ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 * 
 * <Scroll Lock X>
 * <Scroll Lock Y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - This will use the display nudge setting found in the Plugin Parameters.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 * 
 * <Scroll Lock X: x>
 * <Scroll Lock Y: y>
 * 
 * - Used for: Map Notetags
 * - Will prevent the map from being able to scroll left/right(x) or up/down(y)
 *   if these notetags are present and will nudge the map camera slightly.
 * - Useful for when maps are just slightly smaller than normal and the tiny
 *   scrolling is distracting.
 * - Replace 'x' and 'y' with numbers between 0 and 1 to represent how much is
 *   being judged.
 *   - For example, for a 1280x720 resolution, a 27 tile wide map will benefit
 *     from a nudge of 0.15625. Play with these numbers to determine the best
 *     value for your maps.
 * - This setting will be disabled if the map is zoomed in.
 * 
 * ---
 *
 * === Basic, X, and S Parameters-Related Notetags ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 * 
 * === Battle Setting-Related Notetags ===
 * 
 * These tags will change the settings for battle regardless of how the battle
 * system is set up normally. Insert these tags in either the noteboxes of maps
 * or the names of troops for them to take effect. If both are present for a
 * specific battle, then priority goes to the setting found in the troop name.
 * 
 * ---
 * 
 * <FV>
 * <Front View>
 * <Battle View: FV>
 * <Battle View: Front View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to front view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/enemies/
 *   folder as they will used instead of the "sv_enemies" graphics.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <SV>
 * <Side View>
 * <Battle View: SV>
 * <Battle View: Side View>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the perspective of battle to side view for this specific map or
 *   battle.
 * - Make sure you have the enemy image files available in the img/sv_enemies/
 *   folder as they will used instead of the "enemies" graphics.
 * - Make sure your actors have "sv_actor" graphics attached to them.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <DTB>
 * <Battle System: DTB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the default battle system (DTB).
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <TPB Active>
 * <ATB Active>
 * <Battle System: TPB Active>
 * <Battle System: ATB Active>
 * 
 * <TPB Wait>
 * <ATB Wait>
 * <Battle System: TPB Wait>
 * <Battle System: ATB Wait>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the time progress battle system (TPB) or
 *   active turn battle system (ATB) if you have VisuMZ_2_BattleSystemATB
 *   installed for the game project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 * 
 * <BTB>
 * <Battle System: BTB>
 * 
 * <CTB>
 * <Battle System: CTB>
 * 
 * <ETB>
 * <Battle System: ETB>
 * 
 * <FTB>
 * <Battle System: FTB>
 * 
 * <OTB>
 * <Battle System: OTB>
 * 
 * <PTB>
 * <Battle System: PTB>
 * 
 * <STB>
 * <Battle System: STB>
 * 
 * - Used for: Map Notetags, Troop Name Tags, and Troop Comment Tags
 * - Changes the battle system to the respective battle system as long as you
 *   have those plugins installed in the current project.
 * - If using Troop Comment Tags, then as long as the tag appears in a comment
 *   found on any of the Troop's pages (even if they don't run), the tag will
 *   be considered in effect.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Animation Commands ===
 * 
 * ---
 * 
 * Animation: Play at Coordinate
 * - Plays an animation on the screen at a specific x, y coordinate even if
 *   there is no sprite attached.
 * 
 *   Animation ID:
 *   - Plays this animation.
 * 
 *   Coordinates:
 * 
 *     X:
 *     Y:
 *     - X/Y coordinate used for the animation.
 *       You may use JavaScript code.
 * 
 *   Mirror Animation?:
 *   - Mirror the animation?
 * 
 *   Mute Animation?:
 *   - Mute the animation?
 * 
 * ---
 * 
 * === Audio Plugin Commands ===
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Volume
 * - Changes the current BGM volume without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Volume:
 *   - Change the current BGM's volume to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 0 to 100.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pitch
 * - Changes the current BGM pitch without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pitch:
 *   - Change the current BGM's pitch to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from 50 to 150.
 * 
 * ---
 * 
 * Audio: Change Current BGM Pan
 * - Changes the current BGM pan without changing any of the current BGM's
 *   other properties and without restarting the BGM.
 * 
 *   Pan:
 *   - Change the current BGM's pan to what amount?
 *   - You may use JavaScript code.
 *   - Use numbers from -100 to 100.
 * 
 * ---
 * 
 * === Debug Plugin Commands ===
 * 
 * ---
 * 
 * Debug: Current Controller ID
 * - PLAY TEST ONLY.
 * - Shows current controller ID in debug console.
 * - If you press a key on the keyboard, this data will be erased.
 * - Also copies to computer clipboard if possible.
 * 
 * ---
 * 
 * === Export Plugin Commands ===
 * 
 * ---
 * 
 * Export: All Maps Text
 * - PLAY TEST ONLY. Exports all of the text from all maps,
 *   their events, event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: All Troops Text
 * - PLAY TEST ONLY. Exports all of the text from all troops,
 *   their event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 * 
 * ---
 * 
 * Export: Current Map Text
 * - PLAY TEST ONLY. Exports all of the text on the current map,
 *   its events, the event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * Export: Current Troop Text
 * - PLAY TEST ONLY. Exports all of the text on the current troop,
 *   the troop's event pages, and any associated Common Events.
 * 
 *   - Exports 'Show Text' event commands.
 *   - Exports 'Show Choices' event commands.
 *   - Exports 'Show Scrolling Text' event commands.
 *   - Exports 'Comments' event commands.
 *   - Only the raw text will be exported.
 *   - Only usable during Play Test.
 *   - If not in battle, this Plugin Command will not work.
 * 
 * ---
 * 
 * === Game Plugin Commands ===
 * 
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 * 
 * === Gold Plugin Commands ===
 * 
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 * 
 * === Map Plugin Commands ===
 * 
 * ---
 * 
 * Map: Once Parallel
 * - Plays a Common Event parallel to the event once without repeating itself
 *   when done.
 * - Map only!
 * 
 *   Common Event ID:
 *   - The ID of the parallel Common Event to play.
 *   - Does NOT repeat itself when finished.
 *   - When exiting map scene or changing maps, all Once Parallels are cleared.
 *   - Once Parallels are not retained upon reentering the scene or map.
 *   - Once Parallels are not stored in memory and cannot be saved.
 * 
 * ---
 * 
 * === Picture Plugin Commands ===
 * 
 * ---
 * 
 * Picture: Coordinates Mode
 * - Play Test Mode only! Gets the coordinates of a specific picture as you
 *   move it across the screen.
 * 
 *   Picture ID: 
 *   - The ID of the pictures to track the coordinates of.
 * 
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 * 
 * Picture: Erase All
 * - Erases all pictures on the screen because it's extremely tedious to do it
 *   one by one.
 * 
 * ---
 * 
 * Picture: Erase Range
 * - Erases all pictures within a range of numbers because it's extremely
 *   tedious to do it one by one.
 * 
 *   Starting ID:
 *   - The starting ID of the pictures to erase.
 * 
 *   Ending ID:
 *   - The ending ID of the pictures to erase.
 * 
 * ---
 * 
 * Picture: Rotate by Angle
 * - Rotates target picture by a amount angle over a set duration instead of
 *   continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Adjust Angle:
 *   - What is the angle you wish to rotate the picture by?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Rotate to Angle
 * - Rotates target picture to a certain angle over a set duration
 *   instead of continuously.
 * 
 *   Picture ID Number:
 *   - What is the ID of the picture you wish to rotate?
 *   - Use a number between 1 and 100.
 *   - You may use JavaScript code.
 * 
 *   Target Angle:
 *   - What is the target angle you wish to rotate the picture?
 *   - Use degrees (360 degrees per full rotation).
 *   - You may use JavaScript code.
 * 
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 * 
 *   Duration:
 *   - Duration of rotation effect in frames.
 *   - 60 frames = 1 second.
 *   - You may use JavaScript code.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * Picture: Show Icon
 * - Shows an icon instead of a picture image.
 * - The picture icon can be controlled like any other picture.
 * 
 *   General:
 *
 *     Picture ID Number:
 *     - What is the ID of the picture you wish to show at?
 *     - Use a number between 1 and 100.
 *     - You may use JavaScript code.
 *
 *     Icon Index:
 *     - Select the icon index to use for this picture.
 *     - You may use JavaScript code.
 *
 *     Smooth Icon?:
 *     - This will make the icon smoothed out or pixelated.
 * 
 *   Picture Settings:
 * 
 *     Position:
 *
 *       Origin:
 *       - What is the origin of this picture icon?
 *         - Upper Left
 *         - Center
 *
 *       Position X:
 *       - X coordinate of the picture.
 *       - You may use JavaScript code.
 *
 *       Position Y:
 *       - Y coordinate of the picture.
 *       - You may use JavaScript code.
 * 
 *     Scale:
 *
 *       Width %:
 *       - Horizontal scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 *
 *       Height %:
 *       - Vertical scale of the picture.
 *       - You may use JavaScript code.
 *       - 100 is 100%
 * 
 *     Blend:
 *
 *       Opacity:
 *       - Insert a number to determine opacity level.
 *       - Use a number between 0 and 255.
 *       - You may use JavaScript code.
 *
 *       Blend Mode:
 *       - What kind of blend mode do you wish to apply to the picture?
 * 
 * ---
 * 
 * === Screen Shake Plugin Commands ===
 * 
 * ---
 * 
 * Screen Shake: Custom:
 * - Creates a custom screen shake effect and also sets the following uses of
 *   screen shake to this style.
 * 
 *   Shake Style:
 *   - Select shake style type.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   Power:
 *   - Power level for screen shake.
 * 
 *   Speed:
 *   - Speed level for screen shake.
 * 
 *   Duration:
 *   - Duration of screenshake.
 *   - You can use code as well.
 * 
 *   Wait for Completion:
 *   - Wait until completion before moving onto the next event?
 * 
 * ---
 * 
 * === Switch Plugin Commands ===
 * 
 * ---
 * 
 * Switches: Randomize ID(s)
 * - Select specific Switch ID's to randomize ON/OFF.
 * 
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 * 
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 * 
 * ---
 *
 * Switches: Randomize Range
 * - Select specific Switch ID Range to randomize ON/OFF.
 * - The ratio determines the ON/OFF distribution.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 *   Chance for ON:
 *   - Chance out of 100 that determines the switches to be ON.
 *
 * ---
 *
 * Switches: Toggle ID(s)
 * - Select specific Switch ID's to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Switch ID(s):
 *   - Select which Switch ID(s) to toggle.
 *
 * ---
 *
 * Switches: Toggle Range
 * - Select specific Switch ID Range to toggle ON/OFF.
 * - ON becomes OFF. OFF becomes ON.
 *
 *   Starting ID:
 *   - The starting ID of the Switch to toggle.
 *
 *   Ending ID:
 *   - The ending ID of the Switch to toggle.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Battle System Change
 * - Switch to a different battle system in-game.
 * - Some battle systems REQUIRE their specific plugins!
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *     - Database Default (Use game database setting)
 *     - -
 *     - DTB: Default Turn Battle
 *     - TPB Active: Time Progress Battle (Active)
 *     - TPB Wait: Time Progress Battle (Wait)
 *     - -
 *     - BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *     - CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *     - OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *     - STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 *
 * ---
 * 
 * System: Load Images
 * - Allows you to (pre) load up images ahead of time.
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory?
 * 
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 * 
 * === Text Popup Command ===
 * 
 * ---
 * 
 * Text Popup: Show Text
 * - Adds text to a text popup window to briefly appear.
 * - Multiple text popups will be queued.
 * - Does not halt the game and works parallel to game activity.
 * 
 *   Text:
 *   - Write the text that you want to appear here.
 *   - You may use text codes.
 * 
 * ---
 * 
 * === Variable Plugin Commands ===
 * 
 * ---
 * 
 * Variable: JS Eval
 * - Pick a variable ID and value to alter through JS.
 * - Allows one line of code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 * 
 * Variable: JS Block
 * - Pick a variable ID and value to alter through JS.
 * - Allows JS block code for variable ID and operand.
 * - Functions like RM2k3's Variable Pointers.
 * 
 *   Variable ID:
 *   - This is the target variable to alter.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 *   Operation Type:
 *   - What operation do you wish to use for this Plugin Command?
 * 
 *   Operand Modifier:
 *   - Value to be used in calculating the target variable.
 *   - You may use JavaScript.
 *   - ie: $gameVariables.value(1)
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   New Game > Common Event:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 * 
 * Battle Test
 * 
 *   Add Item Type:
 *   Add Weapon Type:
 *   Add Armor Type:
 *   - Add copies of each database item, weapon, and/or armor?
 *   - Effective only during battle test.
 * 
 *   Added Quantity:
 *   - Determines how many items are added during a battle test instead of
 *     the maximum amount.
 * 
 *   Shift+R: Recover All:
 *   - For Play Test only!
 *   - During battle, pressing SHIFT + R will refill the whole party's HP
 *     and MP and status.
 * 
 *   Shift+T: Full TP
 *   - For Play Test only! 
 *   - During battle, pressing SHIFT + T will refill the whole party's TP.
 * 
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 * 
 *   Country/Locale
 *   - Base the digit grouping on which country/locale?
 *   - This will follow all of the digit grouping rules found here:
 *     https://www.w3schools.com/JSREF/jsref_tolocalestring_number.asp
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 * 
 * Picture-Related
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 * 
 *   Picture Containers > Detach in Battle:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the battle scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 *   Picture Containers > Detach in Map:
 *   - If detached, picture container will be separated from the spriteset
 *     while on the map scene.
 *   - This will prevent any visual effects that alter the entire spriteset
 *     from affecting the detached picture container.
 * 
 * ---
 *
 * Misc
 * 
 *   Animation: Mirror Offset X:
 *   - When animations are mirrored, mirror their Offset X values, too.
 *   - The animation name tags <Mirror Offset X> and <No Mirror Offset X> will
 *     override this effect for that specific animation.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 * 
 *   Font Width Fix:
 *   - Fixes the font width issue with instant display non-monospaced fonts
 *     in the Message Window.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 * 
 *   Map Name Text Code:
 *   - If on, map names will use text codes.
 *   - If off, only the raw map name will be used.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   MV Animation Rate:
 *   - Adjusts the rate at which MV animations play.
 *   - Default: 4.
 *   - Lower for faster.
 *   - Higher for slower.
 * 
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game during any session is started.
 *   - Applies to all types of sessions, play test or not.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 * 
 *   Shortcut Scripts:
 *   - Enables shortcut-based script variables and functions that can be used
 *     for script calls.
 *   - Shortcut list enabled for this is as follows:
 * 
 *     $commonEvent(id)
 *     - Queues a common event.
 *     - This does not interrupt the current event to run the desired common
 *       event. Any queued common events will run after the current event list
 *       has finished.
 *     - Replace 'id' with the ID of the common event you wish to queue.
 *     - Common events only run in the map scene and battle scene.
 * 
 *     $onceParallel(id)
 *     - Runs a common event in the background as a once parallel event.
 *     - Once parallel events will run in the background like a parallel
 *       process, except that it does not repeat after finishing.
 *     - Replace 'id' with the ID of the common event you wish to run.
 *     - Only works in the map scene and battle scene. Battle scene usage will
 *       require VisuMZ_1_BattleCore.
 * 
 *     $scene
 *     - Returns current scene.
 * 
 *     $spriteset
 *     - Returns current scene's spriteset if there is one.
 * 
 *     $subject
 *     - Returns last recorded identity of the battle's subject/user.
 * 
 *     $targets
 *     - Returns last recorded targets marked in battle.
 * 
 *     $target
 *     - Returns last recorded target marked in battle.
 *     - Works better with VisuMZ_1_BattleCore.
 * 
 *     $event
 *     - Returns currently initiated map event.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 * 
 *   Subfolder Name Purge:
 *   - Purge subfolder name from Plugin Parameters when reading data to let
 *     Plugin Commands work properly.
 *   - This is for plugins (such as the VisuMZ library) that utilize dynamic
 *     name registrations for Plugin Commands. Turn this on if you plan on
 *     using subfolders with VisuMZ plugins.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle System
 * ============================================================================
 * 
 * Choose which battle system to use for your game.
 * 
 * Some battle systems REQUIRE their specific plugins! This means if you do not
 * have the required battle system plugin installed, it will not change over.
 * The Core Engine plugin does not contain data for all of the battle systems
 * inside its code.
 * 
 * ---
 * 
 *   Database Default (Use game database setting)
 * 
 *   -
 * 
 *   DTB: Default Turn Battle
 *   TPB Active: Time Progress Battle (Active)
 *   TPB Wait: Time Progress Battle (Wait)
 * 
 *   -
 * 
 *   BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 *   CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 *   ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 *   FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 *   OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 *   PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 *   STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * 
 *   -
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 * 
 * If the game's Window Skin is changed mid-game, the colors used will still be
 * based off the default Window Skin's colors. This is due to storing them in a
 * cache and preventing extra processing and reduces lag.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Window Font Outline:
 *   Gauge Number Outline:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Keyboard Input Settings
 * ============================================================================
 *
 * Settings for the game that utilize keyboard input. These are primarily for
 * the name input scene (Scene_Name) and the number input event command. These
 * settings have only been tested on English keyboards and may or may not be
 * compatible with other languages, so please disable these features if they do
 * not fit in with your game.
 * 
 * If a controller is connected upon entering the name change scene, it will
 * use the default manual-entry mode instead of the keyboard-entry mode. If a
 * controller button is pressed during the keyboard-entry mode, it will
 * automatically switch to the manual-entry mode.
 * 
 * This plugin does not provide support for controllers that are undetected by
 * RPG Maker MZ's default controller support.
 *
 * ---
 * 
 * Controls
 * 
 *   WASD Movement:
 *   - Enables or disables WASD movement for your game project.
 *   - Moves the W page down button to E.
 * 
 *   R Button: Dash Toggle:
 *   - Enables or disables R button as an Always Dash option toggle.
 * 
 * ---
 *
 * Name Input
 * 
 *   Enable?:
 *   - Enables keyboard input for name entry.
 *   - Only tested with English keyboards.
 * 
 *   Default Mode:
 *   - Select default mode when entering the scene.
 *     - Default - Uses Arrow Keys to select letters.
 *     - Keyboard - Uses Keyboard to type in letters.
 * 
 *   QWERTY Layout:
 *   - Uses the QWERTY layout for manual entry.
 * 
 *   Keyboard Message:
 *   - The message displayed when allowing keyboard entry.
 *   - You may use text codes here.
 * 
 *   Banned Words:
 *   - Players cannot use these words for names.
 *   - These include words inside the names.
 *   - If a banned word is used, a buzzer sound will play.
 *
 * ---
 *
 * Number Input
 * 
 *   Enable?:
 *   - Enables keyboard input for number entry.
 *   - Only tested with English keyboards.
 *
 * ---
 * 
 * Button Assist
 * 
 *   Finish Entry:
 *   - Text used to describe finish entry.
 * 
 *   Page Change:
 *   - Text used to describe character page changing.
 * 
 *   Switch to Keyboard:
 *   - Text used to describe the keyboard switch.
 * 
 *   Switch To Manual:
 *   - Text used to describe the manual entry switch.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 * 
 *   Blur Strength:
 *   - Strength used for menu background snapshots.
 *   - Default: 8. Higher is stronger. Lower is weaker.
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Split "Escape":
 *   - Used ONLY for those making their own custom keyboard key input maps.
 *   - "Split" option makes separate instances of "Cancel" and "Menu" keys.
 *   - "Don't" option will consolidate both into "Escape" keys.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: Shift:
 *   Key: Tab:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Controller Button Assist Settings
 * ============================================================================
 *
 * These are sub-settings for the Button Assist Window Plugin Parameters. Where
 * the Button Assist Window Plugin Parameters are focused on keyboard entries,
 * these sections are focused on gamepad controllers.
 * 
 * Add multiple gamepads to the list to give them different button assist text.
 * If a gamepad is being used but not listed here, the button assist text will
 * default to the keyboard version.
 * 
 * For those looking for more information regarding controllers, visit this
 * site: https://gamepad-tester.com/
 *
 * ---
 *
 * ID Information
 * 
 *   Controller ID Name:
 *   - Exact string used for this controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - Example: Xbox 360 Controller (XInput STANDARD GAMEPAD)
 * 
 *   Similarity Match:
 *   - Partial string used to check for controller ID.
 *   - Plugin Command "Debug: Current Controller ID" for ID help.
 *   - This check occurs secondary to the exact name.
 *   - Example: Xbox
 *
 * ---
 *
 * Directions
 * 
 *   Up:
 *   Left:
 *   Right:
 *   Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * Actions
 * 
 *   OK:
 *   Cancel:
 *   Menu:
 *   Shift:
 *   Page Up:
 *   Page Down:
 *   - How this button is shown in-game.
 *   - Text codes allowed.
 *   - *NOTE*: Controllers use a different mapping scheme from keyboards.
 *     - The "cancel" button is separate from the "menu" button though, for the
 *       majority of the button assist window help text, we'll be referring to
 *       the cancel button usually.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   Show Actor Level?:
 *   - Show the actor level when displaying actors?
 *   - Affects for most windows in-game.
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *   - These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Custom Parameters Settings
 * ============================================================================
 *
 * As of version 1.07, you can add Custom Parameters to your game if RPG Maker
 * MZ's default set of parameters isn't enough for you. These parameters can
 * have variable functionality depending on how you code it. More importantly,
 * these are compatible with the VisuStella MZ menus and the VisuStella Core
 * Engine's Parameters settings.
 * 
 * For clarification, these settings do NOT create brand-new parameters for you
 * to use and add to your game nor are the bonuses supported by other plugins
 * in the VisuStella MZ library. These settings exist to function as a bridge
 * for non-VisuStella MZ plugins that have created their own parameter values
 * and to show them inside VisuStella menus.
 *
 * ---
 *
 * Custom Parameter
 * 
 *   Parameter Name:
 *   - What's the parameter's name?
 *   - Used for VisuStella MZ menus.
 * 
 *   Abbreviation:
 *   - What abbreviation do you want to use for the parameter?
 *   - Do not use special characters. Avoid numbers if possible.
 * 
 *   Icon:
 *   - What icon do you want to use to represent this parameter?
 *   - Used for VisuStella MZ menus.
 * 
 *   Type:
 *   - What kind of number value will be returned with this parameter?
 *     - Integer (Whole Numbers Only)
 *     - Float (Decimals are Allowed)
 * 
 *   JS: Value:
 *   - Run this code when this parameter is to be returned.
 *
 * ---
 * 
 * Instructions on Adding Custom Parameters to VisuStella Menus
 * 
 * In the Core Engine and Elements and Status Menu Core plugins, there are
 * plugin parameter fields for you to insert the parameters you want displayed
 * and visible to the player.
 * 
 * Insert in those the abbreviation of the custom parameter. For example, if
 * you want to add the "Strength" custom parameter and the abbreviation is
 * "str", then add "str" to the Core Engine/Elements and Status Menu Core's
 * plugin parameter field for "Strength" to appear in-game. Case does not
 * matter here so you can insert "str" or "STR" and it will register all the
 * same to make them appear in-game.
 * 
 * ---
 * 
 * Instructions on Using Custom Parameters as Mechanics
 * 
 * If you want to use a custom parameter in, say, a damage formula, refer to
 * the abbreviation you have set for the custom parameter. For example, if you
 * want to call upon the "Strength" custom parameter's value and its set
 * abbreviation is "str", then refer to it as such. This is case sensitive.
 * 
 * An example damage formula would be something like the following if using
 * "str" for "Strength" and "con" for "Constitution":
 * 
 *   a.str - b.con
 * 
 * These values are attached to the Game_Battlerbase prototype class.
 * 
 * ---
 * 
 * Instructions on Setting Custom Parameter Values
 * 
 * This requires JavaScript knowledge. There is no way around it. Whatever code
 * you insert into the "JS: Value" field will return the value desired. The
 * 'user' variable will refer to the Game_Battlerbase prototype object in which
 * the information is to be drawn from.
 * 
 * Depending on the "type" you've set for the Custom Parameter, the returned
 * value will be rounded using Math.round for integers and left alone if set as
 * a float number.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Resolution Settings
 * ============================================================================
 *
 * Alter various properties to make the game look better for varying screen
 * resolutions. This is mostly for RPG Maker MZ version 1.3.0 and up where the
 * Troops tab has been updated to match the screen resolution settings found in
 * the System 2 Database tab.
 *
 * ---
 * 
 * Maps
 * 
 *   Scroll Lock Small X?:
 *   Scroll Lock Small Y?:
 *   - Automatically scroll lock X/Y scrolling if the map is too small?
 *   - Useful for 1280x720 resolutions when the map is 27 tiles wide.
 *     - This will get rid of the subtle scrolling when moving from one half of
 *       the screen to the other.
 *   - This setting will be disabled if the map is zoomed in.
 * 
 *   Locked Display X?:
 *   Locked Display Y?:
 *   - What display X/Y value do you want for auto-scroll locked maps?
 *   - Use a number between 0 and 1 for best results.
 * 
 * ---
 *
 * Troops
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *   - Ignore if using the VisuStella MZ Battle Core.
 *   - When using the VisuStella MZ Battle Core, adjust the position through
 *     Battle Core > Parameters > Actor Battler Settings > JS: Home Position
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 * 
 *     For MZ 1.3.0+?:
 *     - Both this parameter and its parent parameter need to be on when using
 *       RPG Maker MZ 1.3.0+.
 *     - If the Core Script is below 1.3.0, this setting is ignored. This does
 *       not take into account what version the editor is on. Pay attention to
 *       that as the plugin will not auto adjust for it.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Screen Shake Settings
 * ============================================================================
 *
 * Get more screen shake effects into your game!
 * 
 * These effects have been added by Aries of Sheratan!
 *
 * ---
 *
 * Settings
 * 
 *   Default Style:
 *   - The default style used for screen shakes.
 *   - Original
 *   - Random
 *   - Horizontal
 *   - Vertical
 * 
 *   JS: Original Style:
 *   JS: Random Style
 *   JS: Horizontal Style
 *   JS: Vertical Style
 *   - This code gives you control over screen shake for this screen
 *     shake style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Command List Settings
 * ============================================================================
 *
 * This plugin parameter allows you to adjust the commands that appear on the
 * title screen. Some JavaScript knowledge is needed.
 *
 * ---
 *
 * Title Command
 * 
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Title Picture Buttons Settings
 * ============================================================================
 *
 * These allow you to insert picture buttons on your title screen that can
 * send users to various links on the internet when clicked.
 *
 * ---
 *
 * Settings
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 * 
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 * 
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 * 
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 * 
 * These settings also allow you to add scroll bars to scrollable windows,
 * letting the player know how much of the window's contents there are left for
 * scrolling. The scroll bar can be enabled, disabled, have its thickness
 * changed, colors changed, etc.
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 *   - As of version 1.3.0, this is no longer needed.
 *   - This will still work for lower versions.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Scroll Bar
 * 
 *   Show Scroll Bar?:
 *   - Show the scroll bar for scrollable windows?
 * 
 *   Thickness:
 *   - How thick do you want the scroll bar to be?
 * 
 *   Offset:
 *   - How much do you want to offset the scroll bar by?
 * 
 *   Bar Body Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Off Bar Opacity:
 *   - What opacity value do you want the off bar opacity to be?
 *   - Use a number between 0 and 255.
 * 
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 *   - Avoid using odd numbers.
 *   - Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
 * 
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 *
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.79: November 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Command added by Arisu:
 * ** Text Popup: Show Text
 * *** Adds text to a text popup window to briefly appear.
 * *** Multiple text popups will be queued.
 * *** Does not halt the game and works parallel to game activity.
 * 
 * Version 1.78: October 12, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia and sponsored by AndyL:
 * *** QoL Settings > Battle Test > Shift+R: Recover All
 * **** For Play Test only! During battle, pressing SHIFT + R will refill the
 *      whole party's HP and MP and status.
 * *** QoL Settings > Battle Test > Shift+T: Full TP
 * **** For Play Test only! During battle, pressing SHIFT + T will refill the
 *      whole party's TP.
 * 
 * Version 1.77: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the BGS related Plugin Commands to crash.
 *    Fix made by Arisu.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Scroll-Linked Pictures now work if the image file are in a folder within
 *    the img/pictures/ folder without the folder needing a ! at the start.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Picture: Rotate by Angle
 * **** Rotates target picture by a amount angle over a set duration instead of
 *      continuously.
 * **** View help file for more information on the Plugin Command.
 * *** Picture: Rotate to Angle
 * **** Rotates target picture to a certain angle over a set duration instead
 *      of continuously.
 * **** View help file for more information on the Plugin Command.
 * ** New Plugin Parameter added by Irina:
 * *** Parameters > Menu Button Assist > General > Split "Escape":
 * **** Used ONLY for those making their own custom keyboard key input maps.
 * **** "Split" option makes separate instances of "Cancel" and "Menu" keys.
 * **** "Don't" option will consolidate both into "Escape" keys.
 * 
 * Version 1.76: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a bug that displayed the incorrect button press key for name input
 *    processing's cancel action. Fix made by Olivia.
 * 
 * Version 1.75: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** In Scene_Name, when using the Keyboard Input, the button assist windows
 *    will no longer display the keyboard shortcuts for Ok and Cancel, but
 *    instead, show them for ENTER and BKSP. Update made by Arisu.
 * ** In Scene_Name, when manual inputting, the Page Up/Dn keys are now
 *    displayed to show changing character pages.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by AndyL:
 * *** Params > Keyboard Input > Button Assist > Finish Entry
 * **** Text used to describe finish entry.
 * *** Params > Keyboard Input > Button Assist > Page Change
 * **** Text used to describe changing character pages.
 * *** Params > Window Settings > Scroll Bar
 * **** These settings also allow you to add scroll bars to scrollable windows,
 *      letting the player know how much of the window's contents there are
 *      left for scrolling. The scroll bar can be enabled, disabled, have its
 *      thickness changed, colors changed, etc.
 * 
 * Version 1.74: February 16, 2023
 * * Compatibility Update!
 * ** Plugin Commands for: Audio: Change Current BGM/BGS Volume/Pitch/Pan
 *    should now work properly with the updated RPG Maker MZ version and
 *    WebAudio changes. Update made by Arisu.
 * 
 * Version 1.73: January 20, 2023
 * * Compatibility Update!
 * ** Added better Effekseer version compatibility.
 * 
 * Version 1.72: December 15, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Skill List Active After Party Member Change
 * **** If the skill list is active (ie. the player can move the cursor around)
 *      and the party member currently being viewed is changed via the button
 *      commands, then previously, RPG Maker MZ would still have that window be
 *      active despite having the cursor hidden temporarily. Upon pressing
 *      direction buttons, the cursor reveals itself and both the skill type
 *      window and skill list window are both active, making way for lots of
 *      potential problems to happen.
 * ** Water Tile Bug
 * *** It seems like there's a new bug that occurs if you create a tileset from
 *     scratch in RPG Maker MZ version 1.5.0+ and version 1.6.0+! What this bug
 *     does is it causes many tiles to become water tiles without intending to.
 *     You can find this out by turning off all the plugins in your project,
 *     putting a Ship or Boat on what are normally ground tiles, and then
 *     seeing the Ship or Boat traverse through it.
 * *** There are two ways to fix this. We cannot fix it through code in this
 *     plugin as it's a problem that involves the tileset json data there are
 *     ways to work around it so that you can get the proper water-flags to go
 *     where they need to be at.
 * **** 1. Copy a working un-bugged tileset onto the currently bugged one and
 *      reapply the tile features like passability, terrain tags, etc. This
 *      will make sure the water-passability tiles get copied over correctly.
 * **** 2. If you're on RPG Maker MZ version 1.5.0 or above, select a working
 *      un-bugged tileset (usually a pre-existing tileset when a new project is
 *      made), click the "Copy Page" button, go to the bugged tileset and press
 *      "Paste Page". You'll have to reapply any different properties like
 *      passabilities and terrain tags, but the water tile flags should now be
 *      working properly.
 * *** The plugin will not fix the problem itself since flag data is delicate
 *     and should not be tampered with midgame as the changes made by the
 *     plugin might not match the desired settings.
 * *** This plugin, however, will also send out an alert message when coming
 *     across such a tile. Pay attention to it and do one of the following two
 *     steps above to fix the problem.
 * * Documentation Update!
 * ** Added "Skill List Active After Party Member Change" section to the
 *    "Important Changes: Bug Fixes" section of the help file.
 * ** Added "Water Tile Bug" section to the "Important Changes: Bug Fixes"
 *    section of the help file.
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Menu Backgrounds > Blur Strength
 * **** Strength used for menu background snapshots.
 * 
 * Version 1.71: November 10, 2022
 * * Bug Fixes!
 * ** Title Command Window should now allow for more than 4 custom commands
 *    without hidden commands. Fix made by Irina.
 * ** Fixed a problem with repeating animations from Visual State Effects
 *    causing softlocks. Fix made by Olivia.
 * 
 * Version 1.70: October 6, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** A texture check will now occur for sprites that are being removed and
 *     destroyed in order to prevent crashes. In the off chance that someone
 *     creates a sprite through a script call and removes it through such, the
 *     likelihood of this occurance becomes higher. This makes the destroy
 *     property take into account a texture check in order to see if the sprite
 *     removal is taking extra steps and will reduce those extra steps.
 * * Documentation Update!
 * ** Added "Sprite Removal and Destroy Crash" section to the "Important
 *    Changes: Bug Fixes" section.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.69: September 8, 2022
 * * Bug Fixes!
 * ** Fixed the combination of Button Assist Location: Top with Help Location:
 *    Bottom combination not working properly. Fix made by Irina.
 * 
 * Version 1.68: August 4, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia and sponsored by Archeia:
 * *** Audio: Change Current BGM Volume
 * *** Audio: Change Current BGM Pitch
 * *** Audio: Change Current BGM Pan
 * *** Audio: Change Current BGS Volume
 * *** Audio: Change Current BGS Pitch
 * *** Audio: Change Current BGS Pan
 * **** Changes the current BGM/BGS volume/pitch/pan without changing any of
 *      the current BGM/BGS's other properties and without restarting BGM/BGS.
 * 
 * Version 1.67: July 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added notes for Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * *** This setting will be disabled if the map is zoomed in.
 * * New Features!
 * ** New map notetags added by Irina and sponsored by AndyL:
 * *** <Scroll Lock X>
 * *** <Scroll Lock X: x>
 * *** <Scroll Lock Y>
 * *** <Scroll Lock Y: y>
 * **** Causes the map to not scroll left/right(x) or up/down(y). Useful for
 *      when maps are just slightly smaller than normal and the tiny scrolling
 *      is distracting.
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small X?
 * *** Plugin Parameters > Screen Resolution > Maps > Scroll Lock Small Y?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display X?
 * *** Plugin Parameters > Screen Resolution > Maps > Locked Display Y?
 * **** Automatically scroll locks small maps to prevent them from scrolling
 *      horizontally/vertically. Useful for 1280x720 resolutions when the map
 *      is 27 tiles wide. This will get rid of the subtle scrolling when moving
 *      from one half of the screen to the other.
 * **** This setting will be disabled if the map is zoomed in.
 * * Feature Update!
 * ** Warnings added to Line Height and Item Padding parameters:
 * *** Avoid using odd numbers.
 * *** Visuals in RPG Maker and general game dev don't work well with odd
 *     numbers so avoid them unless you want your game's visuals to behave
 *     inconsistently.
 * 
 * Version 1.66: July 14, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Debug Console Refresh Bug
 * **** When pressing F5 to refresh while the debug console (DevTools) is open,
 *      some graphics will fail to load properly. This started occurring since
 *      the RPG Maker MZ 1.5.0 update and the code for loading the images has
 *      now been reverted to the 1.4.4 version where it was last stable.
 * * Documentation Update!
 * ** Help file updated for new major bug fix.
 * 
 * Version 1.65: June 30, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Parameter Settings > Show Actor Level?
 * **** Show the actor level when displaying actors?
 * **** Used for most windows in-game.
 * 
 * Version 1.64: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Debug: Current Controller ID
 * **** PLAY TEST ONLY. Shows current controller ID in debug console.
 * **** Also copies to computer clipboard if possible.
 * ** New Plugin Parameters made by Arisu and sponsored by
 *    ImGonnaPutMyGameOnXboxAndYouCantStopMe:
 * *** Subsettings for Button Assist Window: Controller Button Assist
 * **** These are sub-settings for the Button Assist Window Plugin Parameters.
 *      Where the Button Assist Window Plugin Parameters are focused on
 *      keyboard entries, these sections are focused on gamepad controllers.
 * **** Add multiple gamepads to the list to give them different button assist
 *      text. If a gamepad is being used but not listed here, the button assist
 *      text will default to the keyboard version.
 * 
 * Version 1.63: May 2, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > QoL Settings > Misc > Map Name Text Code
 * **** If on, map names will use text codes.
 * **** If off, only the raw map name will be used.
 * * Feature Update!
 * ** The map name text code change will no longer be on forcefully. It is now
 *    something that can be toggled by Plugin Parameters. Update by Irina.
 * 
 * Version 1.62: April 28, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu and sponsored by Archeia:
 * *** Variable: JS Eval
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows one line of code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * *** Variable: JS Block
 * **** Pick a variable ID and value to alter through JS.
 * **** Allows JS block code for variable ID and operand.
 * **** Functions like RM2k3's Variable Pointers.
 * ** Map names can now use text codes. Made by Arisu and sponsored by Archeia.
 * 
 * Version 1.61: April 21, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Battle Forced End Action Crash
 * **** Depending on various circumstances, currently active battlers can be
 *      cleared from the battle system at will due to a number of reasons.
 *      However, if it just so happens that the targets are cleared, too, with
 *      actions remaining, then a crash will follow up. This plugin will
 *      prevent that change. Fix made by Olivia.
 * 
 * Version 1.60: April 14, 2022
 * * Bug Fixes!
 * ** Number Input window will now respond to Home/End keys properly.
 *    Fix made by Olivia.
 * 
 * Version 1.59: April 7, 2022
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.4 compatibility update!
 * *** "Shutdown" command should now be more compatible with other aspects of
 *     the client when running from Node JS client on other OS's.
 * 
 * Version 1.58: March 24, 2022
 * * Feature Update!
 * ** Plugin Commands now have separators for easier selection.
 * 
 * Version 1.57: March 3, 2022
 * * Compatibility Update!
 * ** The "Shutdown" command from the title screen should now be compatible
 *    with RPG Maker MZ 1.4.4 and up. Update made by Olivia.
 * 
 * Version 1.56: February 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New features added by Arisu and sponsored by Anon:
 * *** Plugin Parameters > QoL > Misc > Shortcut Scripts
 * **** Enables shortcut-based script variables and functions that can be used
 *      for script calls.
 * **** Shortcut list enabled for this is as follows:
 * ***** $commonEvent(id), $onceParallel(id), $scene, $spriteset, $subject, 
 *       $targets, $target, $event
 * ***** For more information on how to use them, review the help file.
 * 
 * Version 1.55: January 27, 2022
 * * Feature Update!
 * ** Once Parallels for the map are now able to update even while other events
 *    are running. Update made by Arisu.
 * 
 * Version 1.54: January 13, 2022
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** Overly-Protective Substitute
 * *** When an ally with critical health is being targeted by a friendly non-
 *     Certain Hit skill (such as a heal or buff) and another ally has the
 *     substitute state, the other ally would "protect" the originally targeted
 *     ally and take the heal or buff.
 * *** The new changed behavior is that now, substitute will not trigger for
 *     any actions whose scope targets allies.
 * *** Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new MZ Bug: Overly-Protective Substitute.
 * * Feature Update!
 * ** Added a failsafe for those who did not update the plugin parameter
 *    settings and are using MV Animations.
 * 
 * Version 1.53: December 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Notetag added by Olivia:
 * *** <Rate: x>
 * **** Allows you to adjust the update for this MV Animation.
 * ***** Does NOT work with Effekseer animations.
 * **** The lower the number, the faster.
 * **** Replace 'x' with a number representing the animation update rate.
 * ***** Default rate: 4.
 * ***** Minimum rate: 1.
 * ***** Maximum rate: 10.
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Qualify of Life Settings > MV Animation Rate
 * **** Adjusts the rate at which MV animations play.
 * **** Default: 4. Lower for faster. Higher for slower.
 * * Optimization Update!
 * ** MV Animations should run more optimized.
 * 
 * Version 1.52: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** MV Animations played on screen level will now show up properly in the
 *     center of the screen.
 * 
 * Version 1.51: December 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** In the battle status windows, whenever actor names are displayed, the
 *     bitmap used to display their name text do not extend vertically all the
 *     way, causing letters like lowercase "Q" and "G" to be cut off, making
 *     them hard to distinguish from one another. The Core Engine will remedy
 *     this by extending the bitmap to allow enough room. Fix made by Irina.
 * 
 * Version 1.50: November 4, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug Fix!
 * *** By default, if the attack skill is sealed via a trait and an actor has
 *     auto-battle, the action can still be used via auto-battle. This is now
 *     fixed and actors should not be able to attack via auto-battle if their
 *     attack ability is sealed. Fix made by Yanfly.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.49: October 28, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Command added by Arisu and sponsored by Anon:
 * *** Map: Once Parallel
 * **** Plays a Common Event parallel to the event once without repeating
 *      itself when done. Map only!
 * **** When exiting map scene or changing maps, all Once Parallels are cleared
 * **** Once Parallels are not retained upon reentering the scene or map.
 * **** Once Parallels are not stored in memory and cannot be saved.
 * 
 * Version 1.48: October 21, 2021
 * * Feature Update!
 * ** Bitmap.blt function will now have source coordinates and destination X
 *    and Y coordinates rounded to prevent blurring. Update made by Olivia.
 * 
 * Version 1.47: October 14, 2021
 * * Bug Fixes!
 * ** Prevents Number Input window from having a NaN value due to holding down
 *    the fast forward key. Fix made by Arisu.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Misc > Font Width Fix
 * **** Fixes the font width issue with non-monospaced fonts in the Message
 *      Window. This is now an optional fix.
 * 
 * Version 1.46: September 23, 2021
 * * Documentation Update!
 * ** Added line to Plugin Command: "System: Battle System Change":
 * *** Some battle systems REQUIRE their specific plugins!
 * ** Added lines to "Plugin Parameters: Battle System":
 * *** Some battle systems REQUIRE their specific plugins! This means if you do
 *     not have the required battle system plugin installed, it will not change
 *     over. The Core Engine plugin does not contain data for all of the battle
 *     systems inside its code.
 * 
 * Version 1.45: September 17, 2021
 * * Bug Fixes!
 * ** Fixed a problem with "Picture: Coordinates Mode" to properly utilize the
 *    correct picture ID. Fix made by Arisu.
 * ** RPG Maker MZ Bug Fix:
 * *** Instant Text Discrepancy for Window_Message
 * **** Window_Message displays text differently when it draws letters one by
 *      one versus when the text is displayed instantly. This isn't noticeable
 *      with the default font, but it's very visible when using something like
 *      Arial. The error is due to Bitmap.measureTextWidth yielding a rounded
 *      value per letter versus per word. The Core Engine will provide a bug
 *      fix that will single out the cause and make it so that only
 *      Window_Message will not utilize any round number values when
 *      determining the width of each letter, whether or not it is shown
 *      instantly. This change will only affect Window_Message and not any
 *      other window in order to prevent unintended side effects.
 * **** Fix made by Yanfly.
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * * Documentation Update!
 * ** Help file updated for new RPG Maker MZ bug fix.
 * 
 * Version 1.44: August 20, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Anon.
 * *** "Animation: Play at Coordinate"
 * **** Plays an animation on the screen at a specific x, y coordinate even if
 *      there is no sprite attached.
 * 
 * Version 1.43: July 23, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Archeia!
 * *** "Picture: Coordinates Mode"
 * **** Play Test Mode only!
 * **** Gets the coordinates of a specific picture as you move it across the
 *      screen.
 * **** Helpful for those who don't want to do guess work on the screen
 *      coordinates when it comes to placing down pictures.
 * 
 * Version 1.42: July 16, 2021
 * * Documentation Update
 * ** Added text to "Plugin Parameters: Color Settings" for clarification:
 * *** If the game's Window Skin is changed mid-game, the colors used will
 *     still be based off the default Window Skin's colors. This is due to
 *     storing them in a cache and preventing extra processing and reduces lag.
 * 
 * Version 1.41: July 2, 2021
 * * Compatibility Update
 * ** Further compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update
 * ** Added extra notes to "Important Changes: Bug Fixes" section for the
 *    "Window Skin Bleeding" bug:
 * *** This bug is fixed in the core scripts for RPG Maker MZ v1.3.0+.
 * 
 * Version 1.40: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Documentation Update:
 * ** Plugin Parameters > Window Settings > Back Opacity
 * *** As of version 1.3.0, this is no longer needed.
 * *** This will still work for lower versions.
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Window Skin Bleeding fix updated to newest version.
 * * New Plugin Parameters added:
 * ** Plugin Parmaeters > Screen Resolution Settings
 * *** These settings have been moved from the UI settings to be its own thing.
 * **** This is mostly for RPG Maker MZ version 1.3.0 and up where the Troops
 *      tab has been updated to match the screen resolution settings found in
 *      the System 2 Database tab.
 * *** Reposition Enemies > For MZ 1.3.0+?
 * **** Both of these plugin parameters need to be set to true in order for the
 *      repositioning to work for MZ v1.3.0.
 * **** If the Core Script is below 1.3.0, this setting is ignored. This does
 *      not take into account what version the editor is on. Pay attention to
 *      that as the plugin will not auto adjust for it.
 * 
 * Version 1.39: June 18, 2021
 * * Bug Fixes!
 * ** Number Inputs should now work with the controller if keyboard Number
 *    Input is enabled. Fix made by Olivia.
 * ** RPG Maker Bug: Termination Clear Effects
 * *** In RPG Maker MZ, requesting an animation while transitioning between
 *     scenes, such as going from the map scene to the battle scene, can cause
 *     crashes. This is because the animation queue does not take off
 *     immediately and will likely register incorrect targets for the scene.
 *     This plugin will forcefully clear any registered animations and balloon
 *     effects when terminating a scene in order to prevent crashes.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** <Battle View: x> Troop Name tags can now work with comment tags.
 * ** <Battle System: x> Troop Name tags can now work with comment tags.
 * *** Updates made by Irina.
 * 
 * Version 1.38: June 11, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Irina and sponsored by Caz!
 * *** Picture: Show Icon
 * **** Shows an icon instead of a picture image.
 * **** The picture icon can be controlled like any other picture.
 * 
 * Version 1.37: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu:
 * *** Switches: Randomize ID(s)
 * *** Switches: Randomize Range
 * *** Switches: Toggle ID(s)
 * *** Switches: Toggle Range
 * **** These Plugin Commands allow you to randomize the ON/OFF positions of
 *      switches or toggle them so that they flip their ON/OFF status.
 * 
 * Version 1.36: May 14, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Irina:
 * *** Export: All Maps Text
 * *** Export: All Troops Text
 * *** Export: Current Map Text
 * *** Export: Current Troop Text
 * **** Play Test Only Plugin Commands. These Plugin Commands are used for
 *      extracting all messages, show choices, comments, and scrolling text to
 *      parse and export them as a TXT file. Useful for getting a game's script
 *      to a voice actor or voice actress.
 * 
 * Version 1.35: May 7, 2021
 * * Documentation Update!
 * ** Added the following text to "Parameter Settings" Plugin Parameters for
 *    extra clarity regarding Parameter Caps:
 * *** These settings DO NOT raise the editor's maximum values. If you want to
 *     raise an enemy's maximum parameter value past their default cap, use the
 *     associated notetag for them instead.
 * 
 * Version 1.34: April 23, 2021
 * * Bug Fixes!
 * ** For the vanilla Equip Status window, custom parameters with integer
 *    values will now show up as integers and not percentiles. Fix by Olivia.
 * * Documentation Update!
 * ** Added clarity to the <param: x> notetag for enemies.
 * *** This notetag does NOT work with X Parameters, S Parameters, or any
 *     custom parameters. This notetag ONLY works with the base parameters.
 * 
 * Version 1.33: April 9, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Window Skin Bleeding
 * *** Since the v1.2.0 update, Window.prototype._refreshBack's frame value has
 *     been set from 96 to 95. This results in the window skin bleeding past
 *     the window's intended borders. The Core Engine now reverts this change
 *     to prevent the bleeding effect from happening.
 * * Feature Update!
 * ** "Encounter Rate Minimum" now has a valid minimum value of 1. Update made
 *    by Olivia.
 * 
 * Version 1.32: April 2, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Yanfly:
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Item Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Weapon Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Add Armor Type
 * *** Plugin Parameters > QoL Settings > Battle Test > Added Quantity
 * **** By default, RPG Maker MZ only adds 99 of items and not weapons or armor
 *      making it awkward for testing specific battle mechanics. These settings
 *      allow you to add in custom amounts of items, weapons, and/or armors if
 *      you so wish.
 * 
 * Version 1.31: March 26, 2021
 * * Feature Update!
 * ** Title screen buttons will now become fully opaque when hovered over them
 *    instead of only when pressed. Update made by Yanfly.
 * 
 * Version 1.30: March 19, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Invisible Battle Sprites
 * *** If you removed a party member during battle and added that exact party
 *     member back into the same slot, their sprite would appear invisible. The
 *     VisuStella Core Engine will fix this problem and prevent it from
 *     happening. Fix made by Olivia.
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Arisu:
 * *** Plugin Parameters > QoL Settings > Misc > Ani: Mirror Offset
 * **** When animations are mirrored, mirror their Offset X values, too.
 * ** New animation name tags added by Arisu:
 * *** <Mirror Offset X> and <No Mirror Offset X>
 * **** If these text tags are placed in an animation's name, it will cause the
 *      offset X value to be mirrored when the animation is mirrored or have it
 *      ignored despite being mirrored.
 * 
 * Version 1.29: March 12, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Interactable window client area does not conform to the
 *    window's declared scale when the scale is anything but 1.0. This will now
 *    be fixed through this plugin. Fix made by Olivia.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** Name Input should be more controller-friendly. If a controller is
 *    connected upon entering the name change scene, it will use the default
 *    manual-entry mode instead of the keyboard-entry mode. If a controller
 *    button is pressed during the keyboard-entry mode, it will automatically
 *    switch to the manual-entry mode.
 * ** This plugin does not provide support for controllers that are undetected
 *    by RPG Maker MZ's default controller support.
 * ** This feature was already implemented since version 1.27 but wasn't
 *    documented so here we are. Update made by Irina.
 * 
 * Version 1.28: March 5, 2021
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: The arrows drawn by a window skin will no longer by
 *    placed on a half pixel when a window's size is an odd number. This would
 *    cause sprite tearing problems and look awful. Fix made by Irina.
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * 
 * Version 1.27: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Moved "Show Scrolling Text, additional functionality" section from Bug
 *    Fixes to Major Changes as it was placed in the wrong section.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > Keyboard Input > Name Input > Banned Words
 * **** Insert words you don't want your players to use for character names.
 * 
 * Version 1.26: February 19, 2021
 * * Bug Fixes!
 * ** Certain Plugin Parameters no longer have settings that restrict them to
 *    a maximum of 1. Fix made by Arisu.
 * * Feature Update!
 * ** Changed the default value for a New Game > Common Event upon Play Testing
 *    to 0 to prevent confusion. Update made by Arisu.
 * 
 * Version 1.25: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** Show Scrolling Text, additional functionality added by Arisu
 * *** The event command "Show Scrolling Text" now has additional functionality
 *     as long as the VisuStella MZ Core Engine is installed. If the game dev
 *     inserts "// Script Call" (without the quotes) inside the scrolling text,
 *     then the entirity of the Show Scrolling Text event command will be ran
 *     as a giant script call event command.
 * *** The reason why this functionality is added is because the "Script..."
 *     event command contains only 12 lines maximum. This means for any script
 *     call larger than 12 lines of code cannot be done by normal means as each
 *     script call is ran as a separate instance.
 * *** By repurposing the "Show Scrolling Text" event command to be able to
 *     function as an extended "Script..." event command, such a thing is now
 *     possible with less hassle and more lines to code with.
 * *** This effect does not occur if the Show Scrolling Text event command does
 *     not have "// Script Call" in its contents.
 * 
 * Version 1.24: January 29, 2021
 * * Documentation Update!
 * ** Plugin Parameters: Custom Parameters Settings added the following note:
 * *** For clarification, these settings do NOT create brand-new parameters for
 *     you to use and add to your game nor are the bonuses supported by other
 *     plugins in the VisuStella MZ library. These settings exist to function
 *     as a bridge for non-VisuStella MZ plugins that have created their own
 *     parameter values and to show them inside VisuStella menus.
 * * Feature Update!
 * ** Default JS Plugin Parameter for the Title Command: "Shutdown" now has a
 *    note in it that reads: "Do NOT use this command with mobile devices or
 *    browser games. All it does is cause the game to display a blank, black
 *    canvas which the player is unable to do anything with. It does NOT force
 *    close the browser tab nor the app."
 * *** This is also why this command is disabled by default for any non-NodeJS
 *     client deployed game versions.
 * ** Disabled some bug fixes made by the Core Engine for the default RMMZ code
 *    base since the 1.1.1 version now contains those very same fixes.
 * 
 * Version 1.23: January 22, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: January 15, 2021
 * * Documentation Update!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Sprite_Timer is added to the spriteset for the parent
 *    scene, making it affected by any filers, zooms, and/or blurs, hindering
 *    its readability.
 * 
 * Version 1.21: January 8, 2021
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Keyboard Input > Controls > WASD Movement
 * *** Plugin Parameters > Keyboard Input > Controls > R Button: Dash Toggle
 * 
 * Version 1.20: January 1, 2021
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.19: December 25, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s) and feature updates!
 * * Bug Fixes!
 * ** Fixed typo inside of the comments inside the JS: Quick Functions.
 * * Feature Update!
 * ** Plugin Parameters > Color Settings > Outline Color is now renamed to
 *    Font Outline.
 * * New Features!
 * ** New Plugin Parameters added by Shaz!
 * *** Plugin Parameters > Color Settings > Gauge Number Outline
 * 
 * Version 1.18: December 18, 2020
 * * Bug Fixes!
 * ** Compatible string text from the Items and Equips Core will no longer
 *    register MaxHP and MaxMP as percentile values for the info window.
 * ** RPG Maker MZ Bug: Gamepads no longer go rapidfire after a cleared input.
 *    There is now a period of delay for gamepads after an input clear.
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * ** RPG Maker MV animations will no longer crash for unplayable sound
 *    effects. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * ** Added documentation for new RPG Maker MZ bug fixes!
 * * New Features!
 * ** New Plugin Parameters added by Yanfly!
 * *** Plugin Parameters > Button Assist > Key: Shift
 * *** Plugin Parameters > Button Assist > Key: Tab
 * **** These let you assign text codes to the Shift and Tab buttons for the
 *      Button Assist windows.
 * *** Plugin Parameters > QoL Settings > Misc > NewGame > CommonEvent
 * **** For an all version (including non-play test) common event to start new
 *      games with.
 * 
 * Version 1.17: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Button Assist Window for the change name scene will now default to "Tab"
 *    for switching between both modes. Update made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Yanfly:
 * *** Plugin Parameters > Keyboard Input > Default Mode
 * **** Select default mode when entering the scene.
 * 
 * Version 1.15: November 29, 2020
 * * Bug Fixes!
 * ** Pressing "Enter" in the change name scene while the actor's name is
 *    completely empty will no longer result in endless buzzer sounds. Fix made
 *    by Arisu.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** For the name change scene, the "Tab" key now also lets the user switch
 *    between the two modes. Update made by Yanfly.
 * * New Features!
 * ** Two new plugin parameters added to Keyboard Input:
 * *** "Switch To Keyboard" and "Switch To Manual"
 * **** These determine the text used for the button assist window when
 *      switching between the two modes. Update made by Yanfly.
 * **** Button Assist window now takes into consideration for these texts.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.14: November 22, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Command added by Yanfly!
 * *** System: Load Images
 * **** Allows you to (pre) load up images ahead of time.
 * 
 * Version 1.13: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.12: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * Feature Update!
 * ** Screen Shake Plugin Parameters and JS: Quick Function Plugin Parameters
 *    have been taken off experimental status.
 * * New Features!
 * ** New plugin parameters added by Arisu.
 * *** Plugin Parameters > Keyboard Input
 * **** Settings for the game that utilize keyboard input. These are primarily
 *      for the name input scene (Scene_Name) and the number input event
 *      command. These settings have only been tested on English keyboards and
 *      may or may not be compatible with other languages, so please disable
 *      these features if they do not fit in with your game.
 * 
 * Version 1.11: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Feature Update!
 * ** Bitmap smoothing now takes into consideration for rounding coordinates.
 *    Update made by Irina.
 * 
 * Version 1.10: October 25, 2020
 * * Feature Update!
 * ** Sprite animation location now adjusts position relative to the sprite's
 *    scale, too. Update made by Arisu.
 *
 * Version 1.09: October 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Auto Battle Lock Up. Fixed by Yanfly.
 * *** If an auto battle Actor fights against an enemy whose DEF/MDF is too
 *     high, they will not use any actions at all. This can cause potential
 *     game freezing and softlocks. This plugin will change that and have them
 *     default to a regular Attack.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: October 11, 2020
 * * Feature Update!
 * ** Altered sprite bitmaps via the various draw functions will now be marked
 *    as modified and will automatically purge themselves from graphical memory
 *    upon a sprite's removal to free up more resources. Change made by Yanfly.
 * ** Picture Sprite Origin anchors are now tied to the Game_Picture show and
 *    move commands instead of the Game_Interpretter commands. Change by Arisu.
 * 
 * Version 1.07: October 4, 2020
 * * Documentation Update!
 * ** New documentation added for the new Plugin Parameter category:
 *    "Custom Parameters".
 * * New Features!
 * ** New Plugin Parameter "Custom Parameters" added by Yanfly.
 * *** Create custom parameters for your game! These will appear in
 *     VisuStella MZ menus.
 * 
 * Version 1.06: September 27, 2020
 * * Bug Fixes!
 * ** Battler evasion pose can now occur if there is a miss. These were made
 *    separate in RPG Maker MZ and misses didn't enable the evasion pose. Fix
 *    made by Olivia.
 * * New Features!
 * ** New notetags for Maps and name tags for Troops added by Yanfly!
 * *** <Frontview>, <Sideview> to change the battle view for that specific map,
 *     or troop regardless of what other settings are.
 * *** <DTB>, <TPB Active>, <TPB Wait> to change the battle system for that
 *     specific map or troop regardless of what other settings are.
 * 
 * Version 1.05: September 20, 2020
 * * Bug Fixes!
 * ** <Level: x> notetag for enemies is now fixed! Fix made by Arisu.
 * * Documentation Update!
 * ** Documentation added for the new "System: Battle System Change" Plugin
 *    Command and removed the old "System: Set Time Progress Battle".
 * * Feature Update!
 * ** The Plugin Command "System: Set Time Progress Battle" has been replaced
 *    with "System: Battle System Change" instead. This is to accommodate
 *    future plugins that allow for different battle systems. Added by Yanfly.
 * *** If you have previously used "System: Set Time Progress Battle", please
 *     replace them. We apologize for the inconvenience.
 * * New Features!
 * ** In the Core Engine's plugin parameters, you can now set the Battle System
 *    used. This will default to whatever is the game database's setting. This
 *    feature is used for the future when new battle systems are made. Feature
 *    added by Yanfly.
 * 
 * Version 1.04: September 13, 2020
 * * Documentation Update!
 * ** Added new documentation for the "Title Command List" and Title Picture
 *    Buttons" plugin parameters. They now have a dedicated section each.
 * * Feature Updates!
 * ** Moved the "Title Command List" and "Title Picture Buttons" parameters
 *    from the Menu Layout > Title settings. They were far too hidden away and
 *    users had a hard time finding them. Update made by Yanfly.
 * *** Users who have customized these settings before will need to readjust
 *     them again. We apologize for the inconvenience.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** Having QoL > Modern Controls disabled (why would you) used to prevent the
 *    down button from working. It works again. Fix made by Yanfly.
 * * New Feature!
 * ** Plugin default settings now come with a "Game End" option on the title
 *    screen. For those updating from version 1.02 or order, you can add this
 *    in by opening the Core Engine > Plugin Parameters > Menu Layout Settings
 *    > press "delete" on Scene_Title > open it up, then the new settings will
 *    fill in automatically.
 * * New Experimental Feature Added:
 * ** Screen Shake Settings added to the Plugin Parameters.
 * *** Screen Shake: Custom Plugin Command added!
 * *** Credit to Aries of Sheratan, who gave us permission to use her formula.
 * *** We'll be expanding on more screen shaking options in the future.
 * * Optimization Update
 * ** Digit Grouping now works more efficiently.
 * 
 * Version 1.02: August 30, 2020
 * * New Feature!
 * ** New Plugin Command: "Picture: Erase All". Added by Olivia.
 * *** Erases all pictures on the screen because it's extremely tedious to do
 *     it one by one.
 * ** New Plugin Command: "Picture: Erase Range"
 * *** Erases all pictures within a range of numbers because it's extremely
 *     tedious to do it one by one.
 * * Optimization Update
 * ** Added a more accurate means of parsing numbers for Digit Grouping.
 * ** Window_Base.prototype.textSizeEx now stores data to a cache.
 * * Documentation Update
 * ** Added a section to Major Changes: New Hard-Coded Features on
 *    Digit Grouping and explaining its intricacies.
 * ** Added a note to Plugin Parameters > UI > Reposition Actors to ignore the
 *    setting if using the Battle Core.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Animation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AnimationPoint
 * @text Animation: Play at Coordinate
 * @desc Plays an animation on the screen at a specific x, y
 * coordinate even if there is no sprite attached.
 *
 * @arg AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Plays this animation.
 * @default 1
 * 
 * @arg Coordinates
 *
 * @arg pointX:eval
 * @text X
 * @parent Coordinates
 * @desc X coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg pointY:eval
 * @text Y
 * @parent Coordinates
 * @desc Y coordinate used for the animation.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 *
 * @arg Mirror:eval
 * @text Mirror Animation?
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 *
 * @arg Mute:eval
 * @text Mute Animation?
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the animation?
 * @default false
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Audio
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmVolume
 * @text Audio: Change Current BGM Volume
 * @desc Changes the current BGM volume without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGM's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPitch
 * @text Audio: Change Current BGM Pitch
 * @desc Changes the current BGM pitch without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGM's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgmPan
 * @text Audio: Change Current BGM Pan
 * @desc Changes the current BGM pan without changing any of the
 * current BGM's other properties and without restarting the BGM.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGM's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsVolume
 * @text Audio: Change Current BGS Volume
 * @desc Changes the current BGS volume without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg volume:eval
 * @text Volume
 * @desc Change the current BGS's volume to what amount?
 * You may use JavaScript code. Use numbers from 0 to 100.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPitch
 * @text Audio: Change Current BGS Pitch
 * @desc Changes the current BGS pitch without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pitch:eval
 * @text Pitch
 * @desc Change the current BGS's pitch to what amount?
 * You may use JavaScript code. Use numbers from 50 to 150.
 * @default 100
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command AudioChangeBgsPan
 * @text Audio: Change Current BGS Pan
 * @desc Changes the current BGS pan without changing any of the
 * current BGS's other properties and without restarting the BGS.
 *
 * @arg pan:eval
 * @text Pan
 * @desc Change the current BGS's pan to what amount?
 * You may use JavaScript code. Use numbers from -100 to 100.
 * @default 0
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Debug
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command DebugConsoleLastControllerID
 * @text Debug: Current Controller ID
 * @desc PLAY TEST ONLY. Shows current controller ID in debug console.
 * Also copies to computer clipboard if possible.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Export
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllMapText
 * @text Export: All Maps Text
 * @desc PLAY TEST ONLY. Exports all of the text from all maps,
 * their events, event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportAllTroopText
 * @text Export: All Troops Text
 * @desc PLAY TEST ONLY. Exports all of the text from all troops,
 * their event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurMapText
 * @text Export: Current Map Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current map,
 * its events, the event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command ExportCurTroopText
 * @text Export: Current Troop Text
 * @desc PLAY TEST ONLY. Exports all of the text on the current troop,
 * the troop's event pages, and any associated Common Events.
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Game
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Gold
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold. You may use JS.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Map
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MapOnceParallel
 * @text Map: Once Parallel
 * @desc Plays a Common Event parallel to the event once without
 * repeating itself when done. Map only!
 *
 * @arg CommonEventID:num
 * @text Common Event ID
 * @type common_event
 * @desc The ID of the parallel Common Event to play.
 * Does NOT repeat itself when finished.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Picture
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureCoordinatesMode
 * @text Picture: Coordinates Mode
 * @desc Play Test Mode only! Gets the coordinates of a specific
 * picture as you move it across the screen.
 *
 * @arg PictureID:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ID of the pictures to track the coordinates of.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseAll
 * @text Picture: Erase All
 * @desc Erases all pictures on the screen because it's extremely
 * tedious to do it one by one.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEraseRange
 * @text Picture: Erase Range
 * @desc Erases all pictures within a range of numbers because it's
 * extremely tedious to do it one by one.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type number
 * @min 1
 * @max 100
 * @desc The starting ID of the pictures to erase.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type number
 * @min 1
 * @max 100
 * @desc The ending ID of the pictures to erase.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotateBy
 * @text Picture: Rotate By Angle
 * @desc Rotates target picture by a amount angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg AdjustAngle:eval
 * @text Adjust Angle
 * @desc What is the angle you wish to rotate the picture by?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureRotate
 * @text Picture: Rotate to Angle
 * @desc Rotates target picture to a certain angle over a set duration
 * instead of continuously.
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @desc What is the ID of the picture you wish to rotate? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg TargetAngle:eval
 * @text Target Angle
 * @desc What is the target angle you wish to rotate the picture?
 * Use degrees (360 degrees per full rotation).
 * @default 0
 *
 * @arg easingType:str
 * @text Easing Type
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * @default Linear
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of rotation effect in frames.
 * 60 frames = 1 second. You may use JavaScript code.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 * 
 * @command PictureShowIcon
 * @text Picture: Show Icon
 * @desc Shows an icon instead of a picture image.
 * The picture icon can be controlled like any other picture.
 * 
 * @arg General
 * 
 * @arg PictureID:eval
 * @text Picture ID Number
 * @parent General
 * @desc What is the ID of the picture you wish to show at? Use a
 * number between 1 and 100. You may use JavaScript code.
 * @default 1
 * 
 * @arg IconIndex:eval
 * @text Icon Index
 * @parent General
 * @desc Select the icon index to use for this picture.
 * You may use JavaScript code.
 * @default 23
 *
 * @arg Smooth:eval
 * @text Smooth Icon?
 * @parent General
 * @type boolean
 * @on Smooth
 * @off Pixelate
 * @desc This will make the icon smoothed out or pixelated.
 * @default false
 * 
 * @arg PictureSettings
 * @text Picture Settings
 *
 * @arg Settings:struct
 * @text Settings
 * @parent PictureSettings
 * @type struct<ShowPicture>
 * @desc Alter the settings for how the picture will be shown.
 * @default {"Position":"","Origin:num":"0","PositionX:eval":"0","PositionY:eval":"0","Scale":"","ScaleX:eval":"100","ScaleY:eval":"100","Blend":"","Opacity:eval":"255","BlendMode:num":"0"}
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ScreenShake
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ScreenShake
 * @text Screen Shake: Custom
 * @desc Creates a custom screen shake effect and also sets
 * the following uses of screen shake to this style.
 *
 * @arg Type:str
 * @text Shake Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc Select shake style type.
 * @default random
 *
 * @arg Power:num
 * @text Power
 * @type number
 * @min 1
 * @max 9
 * @desc Power level for screen shake.
 * @default 5
 *
 * @arg Speed:num
 * @text Speed
 * @type number
 * @min 1
 * @max 9
 * @desc Speed level for screen shake.
 * @default 5
 *
 * @arg Duration:eval
 * @text Duration
 * @desc Duration of screenshake.
 * You can use code as well.
 * @default 60
 *
 * @arg Wait:eval
 * @text Wait for Completion
 * @parent Duration:eval
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait until completion before moving onto the next event?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Switch
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeOne
 * @text Switches: Randomize ID(s)
 * @desc Select specific Switch ID's to randomize ON/OFF.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchRandomizeRange
 * @text Switches: Randomize Range
 * @desc Select specific Switch ID Range to randomize ON/OFF.
 * The ratio determines the ON/OFF distribution.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @arg Chance:num
 * @text Chance for ON
 * @type number
 * @min 1
 * @max 100
 * @desc Chance out of 100 that determines the switches to be ON.
 * @default 50
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleOne
 * @text Switches: Toggle ID(s)
 * @desc Select specific Switch ID's to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg IDs:arraynum
 * @text Switch ID(s)
 * @type switch[]
 * @desc Select which Switch ID(s) to toggle.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SwitchToggleRange
 * @text Switches: Toggle Range
 * @desc Select specific Switch ID Range to toggle ON/OFF.
 * ON becomes OFF. OFF becomes ON.
 *
 * @arg StartID:num
 * @text Starting ID
 * @type switch
 * @desc The starting ID of the Switch to toggle.
 * @default 1
 *
 * @arg EndingID:num
 * @text Ending ID
 * @type switch
 * @desc The ending ID of the Switch to toggle.
 * @default 20
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetBattleSystem
 * @text System: Battle System Change
 * @desc Switch to a different battle system in-game.
 * Some battle systems REQUIRE their specific plugins!
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB Wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to switch to.
 * @default database
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemLoadImages
 * @text System: Load Images
 * @desc Allows you to (pre) load up images ahead of time.
 *
 * @arg animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @arg titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory?
 * @default []
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @min 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_TextPopup
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command TextPopupShow
 * @text Text Popup: Show Text
 * @desc Adds text to a text popup window to briefly appear.
 * Multiple text popups will be queued.
 *
 * @arg text:json
 * @text Text
 * @type note
 * @desc Write the text that you want to appear here.
 * You may use text codes.
 * @default "Insert message here."
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Variable
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableEvalReference
 * @text Variable: JS Eval
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:eval
 * @text Variable ID
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 1
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:eval
 * @text Operand Modifier
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command VariableJsBlock
 * @text Variable: JS Block
 * @desc Pick a variable ID and value to alter through JS.
 * Functions like RM2k3's Variable Pointers.
 *
 * @arg id:func
 * @text Variable ID
 * @type note
 * @desc This is the target variable to alter.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet varID = 1;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn varID;"
 *
 * @arg operation:str
 * @text Operation Type
 * @type select
 * @option Set
 * @value =
 * @option Add
 * @value +
 * @option Sub
 * @value -
 * @option Mul
 * @value *
 * @option Div
 * @value /
 * @option Mod
 * @value %
 * @desc What operation do you wish to use for this Plugin Command?
 * @default =
 *
 * @arg operand:func
 * @text Operand Modifier
 * @type note
 * @desc Value to be used in calculating the target variable.
 * You may use JavaScript. ie: $gameVariables.value(1)
 * @default "// Declare Variables\nlet value = 0;\n\n// Perform Calculations\n\n// Return Variable ID\nreturn value;"
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"true","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","BattleTest":"","BTestItems:eval":"true","BTestWeapons:eval":"true","BTestArmors:eval":"true","BTestAddedQuantity:num":"90","ShiftR_Toggle:eval":"true","ShiftT_Toggle:eval":"true","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","DigitGroupingLocale:str":"en-US","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Pictures":"","AntiZoomPictures:eval":"true","PictureContainers":"","DetachBattlePictureContainer:eval":"false","DetachMapPictureContainer:eval":"false","Misc":"","AnimationMirrorOffset:eval":"false","AutoStretch:str":"default","FontShadows:eval":"false","FontSmoothing:eval":"true","FontWidthFix:eval":"true","KeyItemProtect:eval":"true","MapNameTextCode:eval":"true","ModernControls:eval":"true","MvAnimationRate:num":"4","NewGameCommonEventAll:num":"0","NoTileShadows:eval":"false","PixelateImageRendering:eval":"false","RequireFocus:eval":"false","ShortcutScripts:eval":"true","SmartEventCollisionPriority:eval":"true","SubfolderParse:eval":"true"}
 * 
 * @param BattleSystem:str
 * @text Battle System
 * @type select
 * @option Database Default (Use game database setting)
 * @value database
 * @option -
 * @value database
 * @option DTB: Default Turn Battle
 * @value dtb
 * @option TPB Active: Time Progress Battle (Active)
 * @value tpb active
 * @option TPB wait: Time Progress Battle (Wait)
 * @value tpb wait
 * @option -
 * @value database
 * @option BTB: Brave Turn Battle (Req VisuMZ_2_BattleSystemBTB)
 * @value btb
 * @option CTB: Charge Turn Battle (Req VisuMZ_2_BattleSystemCTB)
 * @value ctb
 * @option ETB: Energy Turn Battle (Req VisuMZ_2_BattleSystemETB)
 * @value etb
 * @option FTB: Free Turn Battle (Req VisuMZ_2_BattleSystemFTB)
 * @value ftb
 * @option OTB: Order Turn Battle (Req VisuMZ_2_BattleSystemOTB)
 * @value otb
 * @option PTB: Press Turn Battle (Req VisuMZ_2_BattleSystemPTB)
 * @value ptb
 * @option STB: Standard Turn Battle (Req VisuMZ_2_BattleSystemSTB)
 * @value stb
 * @desc Choose which battle system to use for your game.
 * Some battle systems REQUIRE their specific plugins!
 * @default database
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param KeyboardInput:struct
 * @text Keyboard Input
 * @type struct<KeyboardInput>
 * @desc Settings for the game that utilize keyboard input.
 * @default {"Controls":"","WASD:eval":"false","DashToggleR:eval":"false","NameInput":"","EnableNameInput:eval":"true","DefaultMode:str":"keyboard","QwertyLayout:eval":"true","NameInputMessage:eval":"\"Type in this character's name.\\nPress \\\\c[5]ENTER\\\\c[0] when you're done.\\n\\n-or-\\n\\nPress \\\\c[5]arrow keys\\\\c[0]/\\\\c[5]TAB\\\\c[0] to switch\\nto manual character entry.\\n\\nPress \\\\c[5]ESC\\\\c[0]/\\\\c[5]TAB\\\\c[0] to use to keyboard.\"","NumberInput":"","EnableNumberInput:eval":"true","ButtonAssist":"","Keyboard:str":"Keyboard","Manual:str":"Manual"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeySHIFT:str":"\\}❪SHIFT❫\\{","KeyTAB:str":"\\}❪TAB❫\\{","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param ControllerButtons:arraystruct
 * @text Controller Button Assist
 * @parent ButtonAssist:struct
 * @type struct<ControllerButtons>[]
 * @desc Make different icons appear for the Button Assist window when using different controllers.
 * @default []
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = this.commandWindowRows();\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param CustomParam:arraystruct
 * @text Custom Parameters
 * @parent Param:struct
 * @type struct<CustomParam>[]
 * @desc Create custom parameters for your game!
 * These will appear in VisuStella MZ menus.
 * @default ["{\"ParamName:str\":\"Strength\",\"Abbreviation:str\":\"str\",\"Icon:num\":\"77\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.atk * 0.75) + (user.def * 0.25);\\\"\"}","{\"ParamName:str\":\"Dexterity\",\"Abbreviation:str\":\"dex\",\"Icon:num\":\"82\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.agi * 0.75) + (user.atk * 0.25);\\\"\"}","{\"ParamName:str\":\"Constitution\",\"Abbreviation:str\":\"con\",\"Icon:num\":\"81\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.def * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Intelligence\",\"Abbreviation:str\":\"int\",\"Icon:num\":\"79\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mat * 0.75) + (user.mdf * 0.25);\\\"\"}","{\"ParamName:str\":\"Wisdom\",\"Abbreviation:str\":\"wis\",\"Icon:num\":\"72\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.mdf * 0.75) + (user.luk * 0.25);\\\"\"}","{\"ParamName:str\":\"Charisma\",\"Abbreviation:str\":\"cha\",\"Icon:num\":\"84\",\"Type:str\":\"integer\",\"ValueJS:json\":\"\\\"// Declare Constants\\\\nconst user = this;\\\\n\\\\n// Calculations\\\\nreturn (user.luk * 0.75) + (user.agi * 0.25);\\\"\"}"]
 *
 * @param ScreenResolution:struct
 * @text Screen Resolution Settings
 * @type struct<ScreenResolution>
 * @desc Alter various properties to make the game look better for varying screen resolutions.
 * @default {"Maps":"","AutoScrollLockX:eval":"true","AutoScrollLockY:eval":"true","DisplayLockX:num":"0.15625","DisplayLockY:num":"0.00000","Troops":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","RepositionEnemies130:eval":"false"}
 *
 * @param ScreenShake:struct
 * @text Screen Shake Settings
 * @type struct<ScreenShake>
 * @desc Get more screen shake effects into your game!
 * @default {"DefaultStyle:str":"random","originalJS:func":"\"// Calculation\\nthis.x += Math.round($gameScreen.shake());\"","randomJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","horzJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\"","vertJS:func":"\"// Calculation\\n// Original Formula by Aries of Sheratan\\nconst power = $gameScreen._shakePower * 0.75;\\nconst speed = $gameScreen._shakeSpeed * 0.60;\\nconst duration = $gameScreen._shakeDuration;\\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\""}
 *
 * @param TitleCommandList:arraystruct
 * @text Title Command List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}","{\"Symbol:str\":\"shutdown\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.gameEnd;\\\"\",\"ShowJS:func\":\"\\\"return Utils.isNwjs();\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager.exit();\\\\n\\\\n// Note!\\\\n// Do NOT use this command with mobile devices or\\\\n// browser games. All it does is cause the game to\\\\n// display a blank, black canvas which the player\\\\n// is unable to do anything with. It does NOT force\\\\n// close the browser tab nor the app.\\\"\"}"]
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4","ScrollBar":"","ShowScrollBar:eval":"true","BarThickness:num":"2","BarOffset:num":"+2","BarBodyColor:str":"0","OffBarColor:str":"7","OffBarOpacity:num":"128","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","TextPopup":"","DurationPerChat:num":"1.5","MinDuration:num":"90","MaxDuration:num":"300"}
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomBetween(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFrom(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game during play test
 * session is started.
 * @default 0
 *
 * @param BattleTest
 * @text Battle Test
 *
 * @param BTestItems:eval
 * @text Add Item Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database item?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestWeapons:eval
 * @text Add Weapon Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database weapon?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestArmors:eval
 * @text Add Armor Type
 * @parent BattleTest
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add copies of each database armor?
 * Effective only during battle test.
 * @default true
 *
 * @param BTestAddedQuantity:num
 * @text Added Quantity
 * @parent BattleTest
 * @type number
 * @min 1
 * @desc Determines how many items are added during a battle test instead of the maximum amount.
 * @default 90
 *
 * @param ShiftR_Toggle:eval
 * @text Shift+R: Recover All
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + R will refill the whole party's HP and MP and status.
 * @default true
 *
 * @param ShiftT_Toggle:eval
 * @text Shift+T: Full TP
 * @parent BattleTest
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc For Play Test only! During battle, pressing SHIFT + T will refill the whole party's TP.
 * @default true
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param DigitGroupingLocale:str
 * @text Country/Locale
 * @parent DigitGrouping
 * @type combo
 * @option ar-SA
 * @option bn-BD
 * @option bn-IN
 * @option cs-CZ
 * @option da-DK
 * @option de-AT
 * @option de-CH
 * @option de-DE
 * @option el-GR
 * @option en-AU
 * @option en-CA
 * @option en-GB
 * @option en-IE
 * @option en-IN
 * @option en-NZ
 * @option en-US
 * @option en-ZA
 * @option es-AR
 * @option es-CL
 * @option es-CO
 * @option es-ES
 * @option es-MX
 * @option es-US
 * @option fi-FI
 * @option fr-BE
 * @option fr-CA
 * @option fr-CH
 * @option fr-FR
 * @option he-IL
 * @option hi-IN
 * @option hu-HU
 * @option id-ID
 * @option it-CH
 * @option it-IT
 * @option jp-JP
 * @option ko-KR
 * @option nl-BE
 * @option nl-NL
 * @option no-NO
 * @option pl-PL
 * @option pt-BR
 * @option pt-PT
 * @option ro-RO
 * @option ru-RU
 * @option sk-SK
 * @option sv-SE
 * @option ta-IN
 * @option ta-LK
 * @option th-TH
 * @option tr-TR
 * @option zh-CN
 * @option zh-HK
 * @option zh-TW
 * @desc Base the digit grouping on which country/locale?
 * @default en-US
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 1
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Pictures
 * @text Picture-Related
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Pictures
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 * 
 * @param PictureContainers
 * @text Picture Containers
 * @parent Pictures
 *
 * @param DetachBattlePictureContainer:eval
 * @text Detach in Battle
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the battle scene.
 * @default false
 *
 * @param DetachMapPictureContainer:eval
 * @text Detach in Map
 * @parent PictureContainers
 * @type boolean
 * @on Detach
 * @off Normal
 * @desc If detached, picture container will be separated from
 * the spriteset while on the map scene.
 * @default false
 *
 * @param Misc
 * @text Misc
 *
 * @param AnimationMirrorOffset:eval
 * @text Ani: Mirror Offset
 * @parent Misc
 * @type boolean
 * @on Mirror
 * @off Don't Mirror
 * @desc When animations are mirrored,
 * mirror their Offset X values, too.
 * @default false
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param FontWidthFix:eval
 * @text Font Width Fix
 * @parent Misc
 * @type boolean
 * @on Fix
 * @off Default
 * @desc Fixes the font width issue with instant display
 * non-monospaced fonts in the Message Window.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param MapNameTextCode:eval
 * @text Map Name Text Code
 * @parent Misc
 * @type boolean
 * @on Text Codes
 * @off Raw Text
 * @desc If on, map names will use text codes.
 * If off, only the raw map name will be used.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param MvAnimationRate:num
 * @text MV Animation Rate
 * @parent Misc
 * @min 1
 * @max 10
 * @desc Adjusts the rate at which MV animations play.
 * Default: 4. Lower for faster. Higher for slower.
 * @default 4
 *
 * @param NewGameCommonEventAll:num
 * @text NewGame > CommonEvent
 * @parent Misc
 * @type common_event
 * @desc Runs a common event each time a new game during any session is started.
 * @default 0
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param ShortcutScripts:eval
 * @text Shortcut Scripts
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables shortcut-based scripts.
 * View the helpfile for more information.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 * @param SubfolderParse:eval
 * @text Subfolder Name Purge
 * @parent Misc
 * @type boolean
 * @on Purge Subfolders Names
 * @off Don't Purge Name
 * @desc Purge subfolder name from Plugin Parameters when reading
 * data to let Plugin Commands work properly.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Window Font Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param OutlineColorGauge:str
 * @text Gauge Number Outline
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Keyboard Input Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~KeyboardInput:
 *
 * @param Controls
 *
 * @param WASD:eval
 * @text WASD Movement
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables WASD movement for your game project.
 * Moves the W page down button to E.
 * @default false
 *
 * @param DashToggleR:eval
 * @text R Button: Dash Toggle
 * @parent Controls
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables or disables R button as an Always Dash option toggle.
 * @default false
 *
 * @param NameInput
 * @text Name Input
 *
 * @param EnableNameInput:eval
 * @text Enable?
 * @parent NameInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for name entry.
 * Only tested with English keyboards.
 * @default true
 * 
 * @param DefaultMode:str
 * @text Default Mode
 * @parent NameInput
 * @type select
 * @option Default - Uses Arrow Keys to select letters.
 * @value default
 * @option Keyboard - Uses Keyboard to type in letters.
 * @value keyboard
 * @desc Select default mode when entering the scene.
 * @default keyboard
 *
 * @param QwertyLayout:eval
 * @text QWERTY Layout
 * @parent NameInput
 * @type boolean
 * @on QWERTY Layout
 * @off ABCDEF Layout
 * @desc Uses the QWERTY layout for manual entry.
 * @default true
 *
 * @param NameInputMessage:eval
 * @text Keyboard Message
 * @parent NameInput
 * @type note
 * @desc The message displayed when allowing keyboard entry.
 * You may use text codes here.
 * @default "Type in this character's name.\nPress \\c[5]ENTER\\c[0] when you're done.\n\n-or-\n\nPress \\c[5]arrow keys\\c[0]/\\c[5]TAB\\c[0] to switch\nto manual character entry.\n\nPress \\c[5]ESC\\c[0]/\\c[5]TAB\\c[0] to use to keyboard."
 * 
 * @param BannedWords:arraystr
 * @text Banned Words
 * @parent NameInput
 * @type string[]
 * @desc Players cannot use these words for names.
 * These include words inside the names.
 * @default []
 *
 * @param NumberInput
 * @text Number Input
 *
 * @param EnableNumberInput:eval
 * @text Enable?
 * @parent NumberInput
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables keyboard input for number entry.
 * Only tested with English keyboards.
 * @default true
 *
 * @param ButtonAssist
 * @text Button Assist
 * 
 * @param Finish:str
 * @text Finish Entry
 * @parent ButtonAssist
 * @desc Text used to describe finish entry.
 * @default Finish
 * 
 * @param PageChange:str
 * @text Page Change
 * @parent ButtonAssist
 * @desc Text used to describe character page changing.
 * @default Page
 * 
 * @param Keyboard:str
 * @text Switch To Keyboard
 * @parent ButtonAssist
 * @desc Text used to describe the keyboard switch.
 * @default Keyboard
 * 
 * @param Manual:str
 * @text Switch To Manual
 * @parent ButtonAssist
 * @desc Text used to describe the manual entry switch.
 * @default Manual
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 * 
 * @param BlurStrength:num
 * @text Blur Strength
 * @desc Strength used for menu background snapshots.
 * Default: 8. Higher is stronger. Lower is weaker.
 * @default 8
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SplitEscape:eval
 * @text Split "Escape"
 * @parent General
 * @type boolean
 * @on Split
 * @off Don't
 * @desc "Split" makes separate instances of "Cancel" and "Menu".
 * "Don't" will consolidate both into "Escape".
 * @default false
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeySHIFT:str
 * @text Key: Shift
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪SHIFT❫\{
 *
 * @param KeyTAB:str
 * @text Key: Tab
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default \}❪TAB❫\{
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Controller Buttons Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ControllerButtons:
 *
 * @param ID
 * @text ID Information
 *
 * @param Name:str
 * @text Controller ID Name
 * @parent ID
 * @desc Exact string used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 *
 * @param Match:str
 * @text Similarity Match
 * @parent ID
 * @desc Similar text used for this controller ID. Plugin Command
 * "Debug: Current Controller ID" for ID help.
 * @default Untitled
 * 
 * @param Directions
 *
 * @param up:str
 * @text Up
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param left:str
 * @text Left
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param right:str
 * @text Right
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param down:str
 * @text Down
 * @parent Directions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 * 
 * @param Actions
 *
 * @param ok:str
 * @text OK
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param cancel:str
 * @text Cancel
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param menu:str
 * @text Menu
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param shift:str
 * @text Shift
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pageup:str
 * @text Page Up
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 * @param pagedown:str
 * @text Page Down
 * @parent Actions
 * @desc How this button is shown in-game.
 * Text codes allowed.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = this.commandWindowRows();\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2 + this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent TitleScreen
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = this.commandWindowRows();\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitleScreen
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param ShowActorLevel:eval
 * @text Show Actor Level?
 * @parent BasicParameters
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the actor level when displaying actors?
 * Affects for most windows in-game.
 * @default true
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it on can obscure data.
 * @default false
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36. Avoid using odd numbers.
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param ScrollBar
 * @text Scroll Bar
 *
 * @param ShowScrollBar:eval
 * @text Show Scroll Bar?
 * @parent ScrollBar
 * @type boolean
 * @on Show Scroll Bar
 * @off Don't Show
 * @desc Show the scroll bar for scrollable windows?
 * @default true
 *
 * @param BarThickness:num
 * @text Thickness
 * @parent ScrollBar
 * @type number
 * @min 1
 * @desc How thick do you want the scroll bar to be?
 * @default 2
 *
 * @param BarOffset:num
 * @text Offset
 * @parent ScrollBar
 * @desc How much do you want to offset the scroll bar by?
 * @default +2
 *
 * @param BarBodyColor:str
 * @text Bar Body Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param OffBarColor:str
 * @text Off Bar Color
 * @parent ScrollBar
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 7
 *
 * @param OffBarOpacity:num
 * @text Off Bar Opacity
 * @parent ScrollBar
 * @type number
 * @min 1
 * @max 255
 * @desc What opacity value do you want the off bar opacity
 * to be? Use a number between 0 and 255.
 * @default 128
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No Backgrounds
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8. Avoid using odd numbers.
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 *
 * @param TextPopup
 * @text Text Popup Window
 *
 * @param DurationPerChat:num
 * @text Duration Per Text
 * @parent TextPopup
 * @desc What is the increase in duration per text character?
 * @default 1.5
 *
 * @param MinDuration:num
 * @text Minimum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Minimum duration for window to stay on the screen.
 * @default 90
 *
 * @param MaxDuration:num
 * @text Maximum Duration
 * @parent TextPopup
 * @type number
 * @min 1
 * @desc Maximum duration for window to stay on the screen.
 * @default 300
 * 
 */
/* ----------------------------------------------------------------------------
 * Screen Resolution Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenResolution:
 *
 * @param Maps
 * 
 * @param AutoScrollLockX:eval
 * @text Scroll Lock Small X?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock X scrolling if the map is too small?
 * @default true
 * 
 * @param AutoScrollLockY:eval
 * @text Scroll Lock Small Y?
 * @parent Maps
 * @type boolean
 * @on Auto-Lock
 * @off Keep As Is
 * @desc Automatically scroll lock Y scrolling if the map is too small?
 * @default true
 * 
 * @param DisplayLockX:num
 * @text Locked Display X?
 * @parent Maps
 * @desc What display X value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.15625
 * 
 * @param DisplayLockY:num
 * @text Locked Display Y?
 * @parent Maps
 * @desc What display Y value do you want for auto-scroll locked
 * maps? Use a number between 0 and 1 for best results.
 * @default 0.00000
 * 
 * @param Troops
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed. Ignore if using Battle Core.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent Troops
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies130:eval
 * @text For MZ 1.3.0+?
 * @parent RepositionEnemies:eval
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Both this parameter and its parent parameter need to be on when using RPG Maker MZ 1.3.0+.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Screen Shake Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ScreenShake:
 *
 * @param DefaultStyle:str
 * @text Default Style
 * @type select
 * @option Original
 * @value original
 * @option Random
 * @value random
 * @option Horizontal
 * @value horizontal
 * @option Vertical
 * @value vertical
 * @desc The default style used for screen shakes.
 * @default random
 *
 * @param originalJS:func
 * @text JS: Original Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\nthis.x += Math.round($gameScreen.shake());"
 *
 * @param randomJS:func
 * @text JS: Random Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param horzJS:func
 * @text JS: Horizontal Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.x += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 * @param vertJS:func
 * @text JS: Vertical Style
 * @type note
 * @desc This code gives you control over screen shake for this
 * screen shake style.
 * @default "// Calculation\n// Original Formula by Aries of Sheratan\nconst power = $gameScreen._shakePower * 0.75;\nconst speed = $gameScreen._shakeSpeed * 0.60;\nconst duration = $gameScreen._shakeDuration;\nthis.y += Math.round(Math.randomInt(power) - Math.randomInt(speed)) * (Math.min(duration, 30) * 0.5);"
 *
 */
/* ----------------------------------------------------------------------------
 * Custom Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~CustomParam:
 *
 * @param ParamName:str
 * @text Parameter Name
 * @desc What's the parameter's name?
 * Used for VisuStella MZ menus.
 * @default Untitled
 *
 * @param Abbreviation:str
 * @text Abbreviation
 * @parent ParamName:str
 * @desc What abbreviation do you want to use for the parameter?
 * Do not use special characters. Avoid numbers if possible.
 * @default unt
 *
 * @param Icon:num
 * @text Icon
 * @parent ParamName:str
 * @desc What icon do you want to use to represent this parameter?
 * Used for VisuStella MZ menus.
 * @default 160
 *
 * @param Type:str
 * @text Type
 * @parent ParamName:str
 * @type select
 * @option Integer (Whole Numbers Only)
 * @value integer
 * @option Float (Decimals are Allowed)
 * @value float
 * @desc What kind of number value will be returned with this parameter?
 * @default integer
 *
 * @param ValueJS:json
 * @text JS: Value
 * @type note
 * @desc Run this code when this parameter is to be returned.
 * @default "// Declare Constants\nconst user = this;\n\n// Calculations\nreturn 1;"
 *
 */
/* ----------------------------------------------------------------------------
 * Show Picture Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShowPicture:
 * 
 * @param Position
 *
 * @param Origin:num
 * @text Origin
 * @parent Position
 * @type select
 * @option 0 - Upper Left
 * @value 0
 * @option 1 - Center
 * @value 1
 * @desc What is the origin of this picture icon?
 * @default 0
 *
 * @param PositionX:eval
 * @text Position X
 * @parent Position
 * @desc X coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 *
 * @param PositionY:eval
 * @text Position Y
 * @parent Position
 * @desc Y coordinate of the picture.
 * You may use JavaScript code.
 * @default 0
 * 
 * @param Scale
 *
 * @param ScaleX:eval
 * @text Width %
 * @parent Scale
 * @desc Horizontal scale of the picture.
 * You may use JavaScript code.
 * @default 100
 *
 * @param ScaleY:eval
 * @text Height %
 * @parent Scale
 * @desc Vertical scale of the picture.
 * You may use JavaScript code.
 * @default 100
 * 
 * @param Blend
 *
 * @param Opacity:eval
 * @text Opacity
 * @parent Blend
 * @desc Insert a number to determine opacity level. Use a
 * number between 0 and 255. You may use JavaScript code.
 * @default 255
 *
 * @param BlendMode:num
 * @text Blend Mode
 * @parent Blend
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the picture?
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x38072d=_0x4a28;(function(_0x2b0ca6,_0x596fc0){const _0x515b5f=_0x4a28,_0x289da4=_0x2b0ca6();while(!![]){try{const _0x382ba3=-parseInt(_0x515b5f(0x314))/0x1+parseInt(_0x515b5f(0x490))/0x2*(-parseInt(_0x515b5f(0x9ed))/0x3)+-parseInt(_0x515b5f(0x69c))/0x4+-parseInt(_0x515b5f(0x6e8))/0x5*(-parseInt(_0x515b5f(0x583))/0x6)+parseInt(_0x515b5f(0x386))/0x7+parseInt(_0x515b5f(0x621))/0x8+-parseInt(_0x515b5f(0x61c))/0x9*(-parseInt(_0x515b5f(0x76b))/0xa);if(_0x382ba3===_0x596fc0)break;else _0x289da4['push'](_0x289da4['shift']());}catch(_0xdee1f){_0x289da4['push'](_0x289da4['shift']());}}}(_0x19aa,0x89fdd));var label=_0x38072d(0x45d),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x38072d(0x1e9)](function(_0xb8acfa){const _0x37fc1c=_0x38072d;return _0xb8acfa[_0x37fc1c(0x334)]&&_0xb8acfa[_0x37fc1c(0x81e)][_0x37fc1c(0x2ac)]('['+label+']');})[0x0];function _0x4a28(_0x402e37,_0x14d714){const _0x19aa37=_0x19aa();return _0x4a28=function(_0x4a2871,_0x1f5a96){_0x4a2871=_0x4a2871-0xe9;let _0x535ca1=_0x19aa37[_0x4a2871];return _0x535ca1;},_0x4a28(_0x402e37,_0x14d714);}VisuMZ[label][_0x38072d(0x75d)]=VisuMZ[label][_0x38072d(0x75d)]||{},VisuMZ[_0x38072d(0x57a)]=function(_0x25ab3d,_0xe77250){const _0x11aa6c=_0x38072d;for(const _0x4a1503 in _0xe77250){if(_0x4a1503['match'](/(.*):(.*)/i)){if(_0x11aa6c(0x1d0)==='QsEiM'){if(_0x2dcfa8[_0x11aa6c(0x267)]())_0x288414[_0x11aa6c(0x220)](_0x34d7e0);}else{const _0x4ff7ec=String(RegExp['$1']),_0x58a534=String(RegExp['$2'])[_0x11aa6c(0x994)]()['trim']();let _0x4bfefe,_0x545292,_0x5af2d2;switch(_0x58a534){case _0x11aa6c(0x3bd):_0x4bfefe=_0xe77250[_0x4a1503]!==''?Number(_0xe77250[_0x4a1503]):0x0;break;case _0x11aa6c(0x7fa):_0x545292=_0xe77250[_0x4a1503]!==''?JSON['parse'](_0xe77250[_0x4a1503]):[],_0x4bfefe=_0x545292[_0x11aa6c(0x353)](_0x494218=>Number(_0x494218));break;case'EVAL':_0x4bfefe=_0xe77250[_0x4a1503]!==''?eval(_0xe77250[_0x4a1503]):null;break;case _0x11aa6c(0x9cb):_0x545292=_0xe77250[_0x4a1503]!==''?JSON['parse'](_0xe77250[_0x4a1503]):[],_0x4bfefe=_0x545292[_0x11aa6c(0x353)](_0x3f8e0d=>eval(_0x3f8e0d));break;case _0x11aa6c(0x20f):_0x4bfefe=_0xe77250[_0x4a1503]!==''?JSON[_0x11aa6c(0x79b)](_0xe77250[_0x4a1503]):'';break;case _0x11aa6c(0x439):_0x545292=_0xe77250[_0x4a1503]!==''?JSON[_0x11aa6c(0x79b)](_0xe77250[_0x4a1503]):[],_0x4bfefe=_0x545292[_0x11aa6c(0x353)](_0x3fb7c0=>JSON[_0x11aa6c(0x79b)](_0x3fb7c0));break;case _0x11aa6c(0x250):_0x4bfefe=_0xe77250[_0x4a1503]!==''?new Function(JSON[_0x11aa6c(0x79b)](_0xe77250[_0x4a1503])):new Function('return\x200');break;case _0x11aa6c(0x883):_0x545292=_0xe77250[_0x4a1503]!==''?JSON['parse'](_0xe77250[_0x4a1503]):[],_0x4bfefe=_0x545292['map'](_0x429b15=>new Function(JSON['parse'](_0x429b15)));break;case'STR':_0x4bfefe=_0xe77250[_0x4a1503]!==''?String(_0xe77250[_0x4a1503]):'';break;case'ARRAYSTR':_0x545292=_0xe77250[_0x4a1503]!==''?JSON[_0x11aa6c(0x79b)](_0xe77250[_0x4a1503]):[],_0x4bfefe=_0x545292[_0x11aa6c(0x353)](_0x12ca25=>String(_0x12ca25));break;case _0x11aa6c(0x571):_0x5af2d2=_0xe77250[_0x4a1503]!==''?JSON[_0x11aa6c(0x79b)](_0xe77250[_0x4a1503]):{},_0x25ab3d[_0x4ff7ec]={},VisuMZ[_0x11aa6c(0x57a)](_0x25ab3d[_0x4ff7ec],_0x5af2d2);continue;case'ARRAYSTRUCT':_0x545292=_0xe77250[_0x4a1503]!==''?JSON['parse'](_0xe77250[_0x4a1503]):[],_0x4bfefe=_0x545292['map'](_0x59294d=>VisuMZ[_0x11aa6c(0x57a)]({},JSON['parse'](_0x59294d)));break;default:continue;}_0x25ab3d[_0x4ff7ec]=_0x4bfefe;}}}return _0x25ab3d;},VisuMZ[_0x38072d(0x45d)]['SceneManager_exit']=SceneManager[_0x38072d(0x4a1)],SceneManager[_0x38072d(0x4a1)]=function(){const _0x5bb0c4=_0x38072d;VisuMZ['CoreEngine'][_0x5bb0c4(0x97b)][_0x5bb0c4(0x967)](this);if(Utils['RPGMAKER_VERSION']>='1.4.4'){if(typeof nw===_0x5bb0c4(0x139))nw['App'][_0x5bb0c4(0x77c)]();}},(_0x17043d=>{const _0x641855=_0x38072d,_0x5700d4=_0x17043d[_0x641855(0x25e)];for(const _0x4fb2b2 of dependencies){if(!Imported[_0x4fb2b2]){if(_0x641855(0x832)==='tNRWJ'){let _0x5ace0e=_0x2b4f70[_0x641855(0x45d)][_0x641855(0x815)]['call'](this);return _0x5ace0e+=this[_0x641855(0x4c2)](),_0x5ace0e;}else{alert(_0x641855(0x6f7)[_0x641855(0x941)](_0x5700d4,_0x4fb2b2)),SceneManager[_0x641855(0x4a1)]();break;}}}const _0x39983f=_0x17043d[_0x641855(0x81e)];if(_0x39983f[_0x641855(0x322)](/\[Version[ ](.*?)\]/i)){const _0x50ff75=Number(RegExp['$1']);_0x50ff75!==VisuMZ[label][_0x641855(0x512)]&&(alert(_0x641855(0x42e)[_0x641855(0x941)](_0x5700d4,_0x50ff75)),SceneManager[_0x641855(0x4a1)]());}if(_0x39983f[_0x641855(0x322)](/\[Tier[ ](\d+)\]/i)){if('jGreq'!==_0x641855(0x646))this['_pageupButton']['x']=-0x1*(this[_0x641855(0x5df)][_0x641855(0x729)]+this['_pagedownButton'][_0x641855(0x729)]+0x8),this[_0x641855(0x410)]['x']=-0x1*(this['_pagedownButton'][_0x641855(0x729)]+0x4);else{const _0x4ceff8=Number(RegExp['$1']);if(_0x4ceff8<tier)alert(_0x641855(0x84d)['format'](_0x5700d4,_0x4ceff8,tier)),SceneManager[_0x641855(0x4a1)]();else{if(_0x641855(0x7db)!==_0x641855(0x7db)){const _0x3ee2a8=this[_0x641855(0x652)]['bitmap'],_0xa130c2=this[_0x641855(0x729)],_0x26c938=this[_0x641855(0x486)],_0x55f60a=this[_0x641855(0x2dc)],_0x3a6951=_0x14e5ed[_0x641855(0x80c)](),_0x466b88=_0x282455[_0x641855(0x8a4)]();_0x3ee2a8[_0x641855(0x82e)](_0xa130c2,_0x26c938),_0x3ee2a8[_0x641855(0x37a)](0x0,0x0,_0xa130c2,_0x55f60a,_0x466b88,_0x3a6951,!![]),_0x3ee2a8['fillRect'](0x0,_0x55f60a,_0xa130c2,_0x26c938-_0x55f60a*0x2,_0x3a6951),_0x3ee2a8['gradientFillRect'](0x0,_0x26c938-_0x55f60a,_0xa130c2,_0x55f60a,_0x3a6951,_0x466b88,!![]),this[_0x641855(0x652)]['setFrame'](0x0,0x0,_0xa130c2,_0x26c938);}else tier=Math[_0x641855(0x285)](_0x4ceff8,tier);}}}VisuMZ[_0x641855(0x57a)](VisuMZ[label][_0x641855(0x75d)],_0x17043d[_0x641855(0x17e)]);})(pluginData),((()=>{const _0xc121c2=_0x38072d;if(VisuMZ[_0xc121c2(0x45d)][_0xc121c2(0x75d)][_0xc121c2(0x6a9)][_0xc121c2(0x482)]??!![]){if(_0xc121c2(0x86d)==='mRpNm'){_0x249b53[_0xc121c2(0x46b)]();if(!_0x2eef59[_0xc121c2(0x1d5)]()){const _0x126083=_0x19fe38[_0xc121c2(0x10e)](_0x312fce,'_blank');}else{const _0x3733d5=_0x24b8ee[_0xc121c2(0x617)]==_0xc121c2(0x328)?_0xc121c2(0x10e):_0x1ddcd8[_0xc121c2(0x617)]==_0xc121c2(0x5eb)?'start':_0xc121c2(0x6c2);_0x27b368(_0xc121c2(0x5c2))[_0xc121c2(0x289)](_0x3733d5+'\x20'+_0x52b3a9);}}else for(const _0x2ec320 in $plugins){const _0x28373b=$plugins[_0x2ec320];_0x28373b[_0xc121c2(0x25e)][_0xc121c2(0x322)](/(.*)\/(.*)/i)&&(_0x28373b[_0xc121c2(0x25e)]=String(RegExp['$2']['trim']()));}}})()),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x37c),_0x48ef09=>{const _0x1a038e=_0x38072d;if(!SceneManager[_0x1a038e(0x576)])return;if(!SceneManager[_0x1a038e(0x576)][_0x1a038e(0x6ba)])return;VisuMZ[_0x1a038e(0x57a)](_0x48ef09,_0x48ef09);const _0x4b003b=Math['round'](_0x48ef09[_0x1a038e(0x907)]),_0x486338=Math[_0x1a038e(0x337)](_0x48ef09[_0x1a038e(0x26b)]);$gameTemp['requestPointAnimation'](_0x4b003b,_0x486338,_0x48ef09[_0x1a038e(0x299)],_0x48ef09[_0x1a038e(0x96c)],_0x48ef09[_0x1a038e(0x19d)]);}),PluginManager['registerCommand'](pluginData[_0x38072d(0x25e)],_0x38072d(0x24e),_0x4b63b4=>{const _0x3a5432=_0x38072d;VisuMZ[_0x3a5432(0x57a)](_0x4b63b4,_0x4b63b4);const _0x2b359f=Math[_0x3a5432(0x337)](_0x4b63b4['volume'])[_0x3a5432(0x480)](0x0,0x64),_0x573a2b=AudioManager[_0x3a5432(0x4d9)];_0x573a2b&&(_0x573a2b['volume']=_0x2b359f,_0x573a2b[_0x3a5432(0x7a7)]=AudioManager[_0x3a5432(0x8c7)]['seek'](),AudioManager[_0x3a5432(0x7e7)](_0x573a2b),AudioManager['playBgm'](_0x573a2b,_0x573a2b[_0x3a5432(0x7a7)]),AudioManager[_0x3a5432(0x8c7)][_0x3a5432(0x240)](_0x573a2b[_0x3a5432(0x7a7)]));}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x335),_0x42499a=>{const _0xc665be=_0x38072d;VisuMZ[_0xc665be(0x57a)](_0x42499a,_0x42499a);const _0x5bce15=Math[_0xc665be(0x337)](_0x42499a['pitch'])[_0xc665be(0x480)](0x32,0x96),_0x7dc646=AudioManager[_0xc665be(0x4d9)];_0x7dc646&&(_0x7dc646['pitch']=_0x5bce15,_0x7dc646[_0xc665be(0x7a7)]=AudioManager[_0xc665be(0x8c7)]['seek'](),AudioManager['updateBgmParameters'](_0x7dc646),AudioManager[_0xc665be(0x5e9)](_0x7dc646,_0x7dc646[_0xc665be(0x7a7)]),AudioManager[_0xc665be(0x8c7)]['_startPlaying'](_0x7dc646[_0xc665be(0x7a7)]));}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],'AudioChangeBgmPan',_0x26b40c=>{const _0x123873=_0x38072d;VisuMZ[_0x123873(0x57a)](_0x26b40c,_0x26b40c);const _0x2db725=Math['round'](_0x26b40c[_0x123873(0x49c)])[_0x123873(0x480)](-0x64,0x64),_0x5d48ef=AudioManager[_0x123873(0x4d9)];if(_0x5d48ef){if(_0x123873(0x217)!==_0x123873(0x2fd))_0x5d48ef['pan']=_0x2db725,_0x5d48ef[_0x123873(0x7a7)]=AudioManager['_bgmBuffer'][_0x123873(0x50a)](),AudioManager[_0x123873(0x7e7)](_0x5d48ef),AudioManager[_0x123873(0x5e9)](_0x5d48ef,_0x5d48ef[_0x123873(0x7a7)]),AudioManager[_0x123873(0x8c7)]['_startPlaying'](_0x5d48ef[_0x123873(0x7a7)]);else{if(_0x299614['isTriggered']()&&this['isTouchedInsideFrame']())this[_0x123873(0x465)](_0x123873(0x3a2));else _0x30bb26[_0x123873(0x259)]()&&this[_0x123873(0x465)](_0x123873(0x3a2));}}}),PluginManager['registerCommand'](pluginData['name'],_0x38072d(0x889),_0x16c92d=>{const _0x3bbf24=_0x38072d;VisuMZ[_0x3bbf24(0x57a)](_0x16c92d,_0x16c92d);const _0x8b39f0=Math['round'](_0x16c92d[_0x3bbf24(0x53b)])[_0x3bbf24(0x480)](0x0,0x64),_0x4910e8=AudioManager[_0x3bbf24(0x789)];_0x4910e8&&(_0x4910e8[_0x3bbf24(0x53b)]=_0x8b39f0,_0x4910e8[_0x3bbf24(0x7a7)]=AudioManager['_bgsBuffer'][_0x3bbf24(0x50a)](),AudioManager['updateBgsParameters'](_0x4910e8),AudioManager['playBgs'](_0x4910e8,_0x4910e8[_0x3bbf24(0x7a7)]),AudioManager[_0x3bbf24(0x68c)][_0x3bbf24(0x240)](_0x4910e8[_0x3bbf24(0x7a7)]));}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x4af),_0x3dac70=>{const _0x2a3940=_0x38072d;VisuMZ[_0x2a3940(0x57a)](_0x3dac70,_0x3dac70);const _0x2ce082=Math[_0x2a3940(0x337)](_0x3dac70[_0x2a3940(0x991)])[_0x2a3940(0x480)](0x32,0x96),_0x346a6e=AudioManager[_0x2a3940(0x789)];if(_0x346a6e){if('nsYit'==='nsYit')_0x346a6e[_0x2a3940(0x991)]=_0x2ce082,_0x346a6e[_0x2a3940(0x7a7)]=AudioManager[_0x2a3940(0x68c)]['seek'](),AudioManager[_0x2a3940(0x478)](_0x346a6e),AudioManager[_0x2a3940(0x987)](_0x346a6e,_0x346a6e[_0x2a3940(0x7a7)]),AudioManager['_bgsBuffer'][_0x2a3940(0x240)](_0x346a6e[_0x2a3940(0x7a7)]);else{const _0x42b007=this['rightArrowWidth']();this[_0x2a3940(0x3e2)](_0x1ab766[_0x2a3940(0x668)]());const _0x5edeee=_0x1e9e6e[_0x2a3940(0x45d)]['Settings']['UI'][_0x2a3940(0x890)];this[_0x2a3940(0x6a0)](_0x5edeee,_0x3245f2,_0x4ca5fc,_0x42b007,_0x2a3940(0x544));}}}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x106),_0x393738=>{const _0x5aee8c=_0x38072d;VisuMZ['ConvertParams'](_0x393738,_0x393738);const _0x20e4a5=Math['round'](_0x393738[_0x5aee8c(0x49c)])[_0x5aee8c(0x480)](-0x64,0x64),_0x4853e6=AudioManager[_0x5aee8c(0x789)];_0x4853e6&&(_0x5aee8c(0x8b3)===_0x5aee8c(0x8b3)?(_0x4853e6['pan']=_0x20e4a5,_0x4853e6[_0x5aee8c(0x7a7)]=AudioManager[_0x5aee8c(0x68c)][_0x5aee8c(0x50a)](),AudioManager['updateBgsParameters'](_0x4853e6),AudioManager[_0x5aee8c(0x987)](_0x4853e6,_0x4853e6[_0x5aee8c(0x7a7)]),AudioManager[_0x5aee8c(0x68c)][_0x5aee8c(0x240)](_0x4853e6['pos'])):this['_forcedTroopView']='FV');}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x7df),_0x5b8f16=>{const _0x5cc1e1=_0x38072d;if(!$gameTemp[_0x5cc1e1(0x267)]())return;const _0x3df2f7=Input[_0x5cc1e1(0x5b8)]();navigator['clipboard']&&navigator[_0x5cc1e1(0x775)][_0x5cc1e1(0x7a2)](_0x3df2f7);}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x23b),_0x44661a=>{const _0x4b6e43=_0x38072d;if(!$gameTemp[_0x4b6e43(0x267)]())return;if(!Utils[_0x4b6e43(0x1d5)]())return;SceneManager[_0x4b6e43(0x576)][_0x4b6e43(0x280)]=![],VisuMZ[_0x4b6e43(0x45d)][_0x4b6e43(0x13a)]();}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],_0x38072d(0x1d6),_0x2e349a=>{const _0x38374b=_0x38072d;if(!$gameTemp[_0x38374b(0x267)]())return;if(!Utils[_0x38374b(0x1d5)]())return;SceneManager[_0x38374b(0x576)][_0x38374b(0x280)]=![],VisuMZ[_0x38374b(0x45d)][_0x38374b(0x65e)]();}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x5bb),_0x120148=>{const _0x3f7ad0=_0x38072d;if(!$gameTemp['isPlaytest']())return;if(!Utils['isNwjs']())return;if(!$gameMap)return;if($gameMap[_0x3f7ad0(0x42b)]()<=0x0)return;VisuMZ[_0x3f7ad0(0x57a)](_0x120148,_0x120148);const _0x192b2d=_0x3f7ad0(0x189)[_0x3f7ad0(0x941)]($gameMap[_0x3f7ad0(0x42b)]()['padZero'](0x3)),_0x22cf42=VisuMZ['CoreEngine'][_0x3f7ad0(0x5ba)]($gameMap[_0x3f7ad0(0x42b)]());VisuMZ['CoreEngine'][_0x3f7ad0(0x164)](_0x22cf42,_0x192b2d,!![]);}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],_0x38072d(0x255),_0x1c81b2=>{const _0x413a0d=_0x38072d;if(!$gameTemp[_0x413a0d(0x267)]())return;if(!Utils['isNwjs']())return;if(!$gameParty[_0x413a0d(0x8a2)]())return;VisuMZ['ConvertParams'](_0x1c81b2,_0x1c81b2);const _0x4e4eae='Troop%1'[_0x413a0d(0x941)]($gameTroop[_0x413a0d(0x6fa)][_0x413a0d(0x7ab)](0x4)),_0x3850ea=VisuMZ[_0x413a0d(0x45d)]['ExtractStrFromTroop']($gameTroop[_0x413a0d(0x6fa)]);VisuMZ[_0x413a0d(0x45d)]['ExportString'](_0x3850ea,_0x4e4eae,!![]);}),VisuMZ['CoreEngine'][_0x38072d(0x164)]=function(_0x3e3377,_0x279a17,_0x22682f){const _0x4b1a91=_0x38072d,_0x260c07=require('fs');let _0x20e21d=_0x4b1a91(0x95b)[_0x4b1a91(0x941)](_0x279a17||'0');_0x260c07['writeFile'](_0x20e21d,_0x3e3377,_0x500348=>{const _0x209814=_0x4b1a91;if(_0x500348){if(_0x209814(0x45c)!=='ayLyS')return this[_0x209814(0x85d)]!==_0x102b0b[_0x209814(0x9d4)]||this[_0x209814(0x2d8)]!==_0xafe509['_x']||this[_0x209814(0x611)]!==_0x272bcd['_y'];else throw err;}else{if(_0x22682f){if(_0x209814(0x569)!==_0x209814(0x569)){if(this[_0x209814(0x8d1)]!==_0x568556)return _0x39ca7a?this[_0x209814(0x4de)]():this[_0x209814(0x62c)]['y'];return _0x54a2da?this[_0x209814(0x4de)]():this['scrollY']();}else alert(_0x209814(0x8b2)[_0x209814(0x941)](_0x20e21d));}}});},VisuMZ['CoreEngine'][_0x38072d(0x13a)]=function(){const _0x193aec=_0x38072d,_0x81c524=[];for(const _0x4ba35e of $dataMapInfos){if('eImFb'===_0x193aec(0x804))this[_0x193aec(0x75f)][_0x193aec(0x6ad)](_0x23a3dd['layoutSettings']['GoldBgType']);else{if(!_0x4ba35e)continue;_0x81c524[_0x193aec(0x534)](_0x4ba35e['id']);}}const _0x25720f=_0x81c524[_0x193aec(0x3ec)]*0x64+Math[_0x193aec(0x4d6)](0x64);alert(_0x193aec(0x8ee)[_0x193aec(0x941)](_0x25720f)),this[_0x193aec(0x21f)]=[],this[_0x193aec(0x949)]=$dataMap;for(const _0xa6bb6e of _0x81c524){VisuMZ[_0x193aec(0x45d)][_0x193aec(0x34c)](_0xa6bb6e);}setTimeout(VisuMZ['CoreEngine'][_0x193aec(0x346)][_0x193aec(0x667)](this),_0x25720f);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x34c)]=function(_0x5a53c6){const _0x26f6b6=_0x38072d,_0x271905='Map%1.json'[_0x26f6b6(0x941)](_0x5a53c6[_0x26f6b6(0x7ab)](0x3)),_0x3c8993=new XMLHttpRequest(),_0x3dbf66=_0x26f6b6(0x3d2)+_0x271905;_0x3c8993[_0x26f6b6(0x10e)](_0x26f6b6(0x3e7),_0x3dbf66),_0x3c8993[_0x26f6b6(0x318)](_0x26f6b6(0x9ce)),_0x3c8993[_0x26f6b6(0x9a9)]=()=>this['storeMapData'](_0x3c8993,_0x5a53c6,_0x271905,_0x3dbf66),_0x3c8993[_0x26f6b6(0x943)]=()=>DataManager[_0x26f6b6(0x594)](_0x26f6b6(0x7c8),_0x271905,_0x3dbf66),_0x3c8993['send']();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x1af)]=function(_0x4c58fa,_0x32ca1e,_0x3d1265,_0x57cf1f){const _0x1e5eb3=_0x38072d;$dataMap=JSON[_0x1e5eb3(0x79b)](_0x4c58fa[_0x1e5eb3(0x935)]),DataManager[_0x1e5eb3(0x6f9)]($dataMap),this[_0x1e5eb3(0x21f)][_0x32ca1e]=VisuMZ['CoreEngine']['ExtractStrFromMap'](_0x32ca1e),$dataMap=this[_0x1e5eb3(0x949)];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x346)]=function(){const _0x235d53=_0x38072d,_0x5dcfa0=_0x235d53(0x457);this['_storedMapText']['remove'](undefined)[_0x235d53(0x891)]('')[_0x235d53(0x891)](null);const _0x4c92e6=this['_storedMapText'][_0x235d53(0x6a3)](_0x235d53(0x7fe))['trim']();VisuMZ['CoreEngine'][_0x235d53(0x164)](_0x4c92e6,_0x5dcfa0,!![]),SceneManager[_0x235d53(0x576)]['_active']=!![];},VisuMZ[_0x38072d(0x45d)]['ExtractStrFromMap']=function(_0x1c5cdb){const _0x514f0c=_0x38072d;if(!$dataMap)return'';let _0x4fc6c7='█'['repeat'](0x46)+'\x0a\x0a',_0x2da2f4='═'['repeat'](0x46)+'\x0a\x0a',_0x3fc6eb='';this[_0x514f0c(0x392)]=0x0;for(const _0x563f55 of $dataMap[_0x514f0c(0x5e1)]){if(!_0x563f55)continue;let _0x3b3add=_0x563f55['id'],_0x1dd41c=_0x563f55[_0x514f0c(0x25e)],_0x4d5aea=_0x563f55[_0x514f0c(0x811)];for(const _0xdf455 of _0x4d5aea){if(_0x514f0c(0x787)!==_0x514f0c(0x1b6)){const _0x5dc1b5=_0x4d5aea[_0x514f0c(0x8dc)](_0xdf455)+0x1;let _0x5c1ca6=_0x2da2f4+_0x514f0c(0x361),_0x38c420=VisuMZ[_0x514f0c(0x45d)][_0x514f0c(0x923)](_0xdf455[_0x514f0c(0x261)]);if(_0x38c420[_0x514f0c(0x3ec)]>0x0){if('UpAym'!==_0x514f0c(0x5f6)){if(_0x3fc6eb[_0x514f0c(0x3ec)]>0x0)_0x3fc6eb+=_0x2da2f4+_0x514f0c(0x7fe);else{const _0x3e520b=$dataMapInfos[_0x1c5cdb][_0x514f0c(0x25e)];_0x3fc6eb+=_0x4fc6c7+_0x514f0c(0x1ac)[_0x514f0c(0x941)](_0x1c5cdb,_0x3e520b||_0x514f0c(0x774))+_0x4fc6c7;}_0x3fc6eb+=_0x5c1ca6['format'](_0x3b3add,_0x1dd41c,_0x5dc1b5,_0x38c420);}else for(_0x19e956 of _0x8611dc[_0x514f0c(0x896)]()){_0x20d755[_0x514f0c(0x627)]();}}}else return _0x434f76['Keyboard']||_0x514f0c(0x805);}}return _0x3fc6eb[_0x514f0c(0x3ec)]>0x0&&(_0x3fc6eb+=_0x2da2f4),_0x3fc6eb;},VisuMZ['CoreEngine'][_0x38072d(0x65e)]=function(){const _0x56df71=_0x38072d,_0x48ce33=$dataTroops[_0x56df71(0x3ec)]*0xa+Math[_0x56df71(0x4d6)](0xa);alert('Export\x20Troop\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)'[_0x56df71(0x941)](_0x48ce33));const _0x1df0f0=[];for(const _0x126d0c of $dataTroops){if(_0x56df71(0x186)!==_0x56df71(0x28a)){if(!_0x126d0c)continue;const _0x2ea72d=_0x126d0c['id'];_0x1df0f0[_0x2ea72d]=VisuMZ['CoreEngine']['ExtractStrFromTroop'](_0x2ea72d);}else this[_0x56df71(0x1bb)]()&&_0x4d3ed2&&this[_0x56df71(0x638)]()===0x1&&this[_0x56df71(0x416)]()===0x0?this[_0x56df71(0x9ca)](this[_0x56df71(0x4ed)]()-0x1):_0x482169[_0x56df71(0x45d)][_0x56df71(0x69f)]['call'](this,_0x5e999a);}setTimeout(VisuMZ[_0x56df71(0x45d)][_0x56df71(0x194)][_0x56df71(0x667)](this,_0x1df0f0),_0x48ce33);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x505)]=function(_0x1c168c){const _0x2c3b24=_0x38072d;if(!$dataTroops[_0x1c168c])return'';let _0x1a2a6b='█'['repeat'](0x46)+'\x0a\x0a',_0x3dd315='═'[_0x2c3b24(0x984)](0x46)+'\x0a\x0a',_0x166808='';this['_commonEventLayers']=0x0;const _0x757005=$dataTroops[_0x1c168c];let _0x53dfa5=_0x757005[_0x2c3b24(0x811)];for(const _0x161ab6 of _0x53dfa5){if(_0x2c3b24(0x7b8)!==_0x2c3b24(0x7b8)){if(_0x3e9312['inBattle']())return;_0x1eea6e[_0x2c3b24(0x57a)](_0x515af2,_0x19161e);const _0x95e88d=_0x27435c[_0x2c3b24(0x1a7)],_0x288948=(_0x2d0e64[_0x2c3b24(0x5c8)]||0x0)/0x64;for(const _0x4edd52 of _0x95e88d){const _0x36d947=_0x7cf814[_0x2c3b24(0x793)]()<=_0x288948;_0xb3b711[_0x2c3b24(0x7cf)](_0x4edd52,_0x36d947);}}else{const _0x24db65=_0x53dfa5['indexOf'](_0x161ab6)+0x1;let _0x2fda13=_0x3dd315+_0x2c3b24(0x601),_0x2898d5=VisuMZ[_0x2c3b24(0x45d)][_0x2c3b24(0x923)](_0x161ab6[_0x2c3b24(0x261)]);_0x2898d5['length']>0x0&&(_0x2c3b24(0x17f)!==_0x2c3b24(0x17f)?this[_0x2c3b24(0x656)]=![]:(_0x166808[_0x2c3b24(0x3ec)]>0x0?_0x166808+=_0x3dd315+_0x2c3b24(0x7fe):_0x166808+=_0x1a2a6b+_0x2c3b24(0x2ad)[_0x2c3b24(0x941)](_0x1c168c,_0x757005[_0x2c3b24(0x25e)]||_0x2c3b24(0x774))+_0x1a2a6b,_0x166808+=_0x2fda13[_0x2c3b24(0x941)](_0x24db65,_0x2898d5)));}}return _0x166808[_0x2c3b24(0x3ec)]>0x0&&(_0x166808+=_0x3dd315),_0x166808;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x194)]=function(_0x1cd379){const _0x488d7b=_0x38072d,_0x3865d1=_0x488d7b(0x995);_0x1cd379[_0x488d7b(0x891)](undefined)[_0x488d7b(0x891)]('')[_0x488d7b(0x891)](null);const _0x2c2b4c=_0x1cd379[_0x488d7b(0x6a3)]('\x0a\x0a\x0a\x0a\x0a')[_0x488d7b(0x5bd)]();VisuMZ['CoreEngine'][_0x488d7b(0x164)](_0x2c2b4c,_0x3865d1,!![]),SceneManager[_0x488d7b(0x576)][_0x488d7b(0x280)]=!![];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x923)]=function(_0x445975){const _0x189449=_0x38072d;let _0x1f8f9a='\x0a'+'─'['repeat'](0x46)+'\x0a',_0x1ec64f='\x0a'+'┄'[_0x189449(0x984)](0x46)+'\x0a',_0x33f021='';for(const _0x31a16c of _0x445975){if(_0x189449(0x595)==='qTWhW'){if(!_0x31a16c)continue;if(_0x31a16c[_0x189449(0x8f4)]===0x65){if(_0x189449(0x777)===_0x189449(0x4a9))this['changeTextColor'](_0x1c85f6[_0x189449(0x668)]()),this['drawText'](_0x125d4d,_0x476c83,_0x3e1b33,_0x27e99d,_0x189449(0x16d)),_0xc08250-=this['textWidth'](_0x328cb1)+0x6;else{_0x33f021+=_0x1f8f9a+'\x0a',_0x33f021+=_0x189449(0x632);if(_0x31a16c[_0x189449(0x17e)][0x4]!==''&&_0x31a16c['parameters'][0x4]!==undefined){if(_0x189449(0x626)!==_0x189449(0x626)){if(_0x75c203)throw _0x357946;else _0x968564&&_0x4fbf4f(_0x189449(0x8b2)['format'](_0x11ac15));}else _0x33f021+=_0x189449(0xa00)[_0x189449(0x941)](_0x31a16c['parameters'][0x4]);}}}else{if(_0x31a16c['code']===0x191)_0x189449(0x1c7)===_0x189449(0x749)?_0x4e9f1c['se'][_0x189449(0x53b)]=0x0:_0x33f021+=_0x189449(0x945)[_0x189449(0x941)](_0x31a16c[_0x189449(0x17e)][0x0]);else{if(_0x31a16c[_0x189449(0x8f4)]===0x192)_0x33f021+=_0x1f8f9a,_0x33f021+='%1〘Choice\x20%2〙\x20%3%1'[_0x189449(0x941)](_0x1ec64f,_0x31a16c[_0x189449(0x17e)][0x0]+0x1,_0x31a16c[_0x189449(0x17e)][0x1]);else{if(_0x31a16c[_0x189449(0x8f4)]===0x193)_0x33f021+=_0x1f8f9a,_0x33f021+='%1〘Choice\x20Cancel〙%1'[_0x189449(0x941)](_0x1ec64f);else{if(_0x31a16c[_0x189449(0x8f4)]===0x194)_0x33f021+=_0x1f8f9a,_0x33f021+='%1〘End\x20Choice\x20Selection〙%1'['format'](_0x1ec64f);else{if(_0x31a16c['code']===0x69){if(_0x189449(0x70a)!==_0x189449(0x70a)){const _0x559890=_0x4d12b6[_0x189449(0x3eb)](_0x1e507a);_0x240d05[_0x189449(0x7cf)](_0x390c3b,!_0x559890);}else _0x33f021+=_0x1f8f9a+'\x0a',_0x33f021+=_0x189449(0x389);}else{if(_0x31a16c[_0x189449(0x8f4)]===0x6c)_0x33f021+=_0x1f8f9a+'\x0a',_0x33f021+='》Comment《\x0a%1\x0a'[_0x189449(0x941)](_0x31a16c[_0x189449(0x17e)][0x0]);else{if(_0x31a16c[_0x189449(0x8f4)]===0x198){if(_0x189449(0x52d)!==_0x189449(0x7ea))_0x33f021+='%1\x0a'['format'](_0x31a16c[_0x189449(0x17e)][0x0]);else{const _0x1df3af=_0x4d6c51[_0x189449(0x45d)][_0x189449(0x75d)]['ScreenShake'];if(_0x1df3af&&_0x1df3af['horzJS'])return _0x1df3af[_0x189449(0x2e5)]['call'](this);const _0x2cbbbc=_0x552557[_0x189449(0x117)]*0.75,_0x1c0e0a=_0x2eac65[_0x189449(0x691)]*0.6,_0x1a94b2=_0x10bb04['_shakeDuration'];this['x']+=_0x4d16d7['round'](_0x35ef89['randomInt'](_0x2cbbbc)-_0x165972[_0x189449(0x4d6)](_0x1c0e0a))*(_0x9d97b8['min'](_0x1a94b2,0x1e)*0.5);}}else{if(_0x31a16c[_0x189449(0x8f4)]===0x75){if(_0x189449(0x853)===_0x189449(0x7e4))this['_backgroundFilter']=new _0x5a157c['filters'][(_0x189449(0x903))](_0x26eea3=!![]),this['_backgroundSprite']=new _0x2680a8(),this[_0x189449(0x752)][_0x189449(0x208)]=_0x123204[_0x189449(0x2e7)](),this[_0x189449(0x752)][_0x189449(0x7b9)]=[this[_0x189449(0x487)]],this['_baseSprite'][_0x189449(0x343)](this[_0x189449(0x752)]);else{const _0x32850b=$dataCommonEvents[_0x31a16c['parameters'][0x0]];if(_0x32850b&&this[_0x189449(0x392)]<=0xa){if('nIKaN'!==_0x189449(0x6dd)){this[_0x189449(0x392)]++;let _0x1c7e31=VisuMZ[_0x189449(0x45d)][_0x189449(0x923)](_0x32850b[_0x189449(0x261)]);_0x1c7e31[_0x189449(0x3ec)]>0x0&&(_0x189449(0x1c2)!==_0x189449(0x854)?(_0x33f021+=_0x1f8f9a,_0x33f021+=_0x1ec64f,_0x33f021+=_0x189449(0x9e2)[_0x189449(0x941)](_0x32850b['id'],_0x32850b['name']),_0x33f021+=_0x1ec64f,_0x33f021+=_0x1c7e31,_0x33f021+=_0x1ec64f,_0x33f021+=_0x189449(0x551)[_0x189449(0x941)](_0x32850b['id'],_0x32850b[_0x189449(0x25e)]),_0x33f021+=_0x1ec64f):(this['_playtestF7Looping']=!![],this[_0x189449(0x444)](),_0x9221a7[_0x189449(0x5f9)](),this[_0x189449(0xf8)]=![])),this[_0x189449(0x392)]--;}else _0x3400c4&&_0x45ca43['push'](_0x56ef89);}}}}}}}}}}}}else return _0x4f4730[_0x189449(0x45d)]['Settings'][_0x189449(0x6a9)][_0x189449(0x9c7)];}return _0x33f021['length']>0x0&&(_0x189449(0x230)!==_0x189449(0x310)?_0x33f021+=_0x1f8f9a:(_0x4a1d40[_0x189449(0x45d)][_0x189449(0x97a)][_0x189449(0x967)](this),this[_0x189449(0x47d)]())),_0x33f021;},PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x759),_0x237030=>{const _0x5ee4c1=_0x38072d;VisuMZ['ConvertParams'](_0x237030,_0x237030);const _0x57a863=_0x237030[_0x5ee4c1(0x336)];VisuMZ[_0x5ee4c1(0x630)](_0x57a863);}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],'GoldChange',_0x137226=>{const _0x52b12b=_0x38072d;VisuMZ[_0x52b12b(0x57a)](_0x137226,_0x137226);const _0x2af72c=_0x137226[_0x52b12b(0x3eb)]||0x0;$gameParty['gainGold'](_0x2af72c);}),PluginManager['registerCommand'](pluginData[_0x38072d(0x25e)],'MapOnceParallel',_0xb498c9=>{const _0x5d0810=_0x38072d;if(!SceneManager[_0x5d0810(0x61b)]())return;VisuMZ[_0x5d0810(0x57a)](_0xb498c9,_0xb498c9);const _0x47e7b7=_0xb498c9['CommonEventID'];SceneManager[_0x5d0810(0x576)][_0x5d0810(0x581)](_0x47e7b7);}),PluginManager['registerCommand'](pluginData[_0x38072d(0x25e)],_0x38072d(0x9c8),_0x300fa9=>{const _0x14dfcb=_0x38072d;if(!$gameTemp[_0x14dfcb(0x267)]())return;if(!Utils[_0x14dfcb(0x1d5)]())return;VisuMZ[_0x14dfcb(0x57a)](_0x300fa9,_0x300fa9);const _0x18d1cd=_0x300fa9[_0x14dfcb(0x8b1)]||0x1;$gameTemp[_0x14dfcb(0x2d7)]=_0x18d1cd;}),PluginManager['registerCommand'](pluginData['name'],_0x38072d(0x75e),_0x188716=>{const _0xff55d5=_0x38072d;VisuMZ[_0xff55d5(0x57a)](_0x188716,_0x188716);const _0x83f85d=_0x188716[_0xff55d5(0x683)]||0x1,_0xf20dcf=_0x188716[_0xff55d5(0x70c)]||_0xff55d5(0x894),_0x157802=$gameScreen[_0xff55d5(0x8f0)](_0x83f85d);if(_0x157802){if(_0xff55d5(0x676)===_0xff55d5(0x8fc))return'';else _0x157802[_0xff55d5(0x4d8)](_0xf20dcf);}}),PluginManager['registerCommand'](pluginData['name'],_0x38072d(0x9ef),_0x8c1698=>{const _0xb524f7=_0x38072d;for(let _0x424a3f=0x1;_0x424a3f<=0x64;_0x424a3f++){$gameScreen[_0xb524f7(0x1b8)](_0x424a3f);}}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x2ec),_0x24aba9=>{const _0x49d4f4=_0x38072d;VisuMZ[_0x49d4f4(0x57a)](_0x24aba9,_0x24aba9);const _0x4922bc=Math[_0x49d4f4(0x864)](_0x24aba9[_0x49d4f4(0x10d)],_0x24aba9[_0x49d4f4(0x690)]),_0x50bdf0=Math[_0x49d4f4(0x285)](_0x24aba9[_0x49d4f4(0x10d)],_0x24aba9[_0x49d4f4(0x690)]);for(let _0x37e93a=_0x4922bc;_0x37e93a<=_0x50bdf0;_0x37e93a++){if(_0x49d4f4(0x168)!=='JpzVP'){const _0x39820a=_0x49d4f4(0x199);this['_colorCache']=this['_colorCache']||{};if(this['_colorCache'][_0x39820a])return this['_colorCache'][_0x39820a];const _0x3e2cb1=_0x3f3feb[_0x49d4f4(0x45d)][_0x49d4f4(0x75d)][_0x49d4f4(0x190)]['ColorPowerUp'];return this['getColorDataFromPluginParameters'](_0x39820a,_0x3e2cb1);}else $gameScreen[_0x49d4f4(0x1b8)](_0x37e93a);}}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],'PictureRotateBy',_0x54ee9a=>{const _0x1fd053=_0x38072d;VisuMZ[_0x1fd053(0x57a)](_0x54ee9a,_0x54ee9a);const _0x354d44=Math[_0x1fd053(0x337)](_0x54ee9a['PictureID'])[_0x1fd053(0x480)](0x1,0x64),_0x1919fc=-Number(_0x54ee9a[_0x1fd053(0x857)]||0x0),_0x1513e1=Math['max'](_0x54ee9a[_0x1fd053(0x9d1)]||0x0,0x0),_0x502d26=_0x54ee9a['easingType']||_0x1fd053(0x894),_0x3d01ff=_0x54ee9a[_0x1fd053(0x8ec)],_0x399636=$gameScreen[_0x1fd053(0x8f0)](_0x354d44);if(!_0x399636)return;_0x399636[_0x1fd053(0x82d)](_0x1919fc,_0x1513e1,_0x502d26);if(_0x3d01ff){const _0x25bd20=$gameTemp[_0x1fd053(0x50b)]();if(_0x25bd20)_0x25bd20['wait'](_0x1513e1);}}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],_0x38072d(0x514),_0x5e26bb=>{const _0x5365ac=_0x38072d;VisuMZ[_0x5365ac(0x57a)](_0x5e26bb,_0x5e26bb);const _0xe84e9c=Math['round'](_0x5e26bb[_0x5365ac(0x8b1)])[_0x5365ac(0x480)](0x1,0x64),_0x14a6b3=-Number(_0x5e26bb[_0x5365ac(0x1dd)]||0x0),_0xac2a1=Math[_0x5365ac(0x285)](_0x5e26bb[_0x5365ac(0x9d1)]||0x0,0x0),_0x1d621d=_0x5e26bb[_0x5365ac(0x70c)]||'Linear',_0x49d8ea=_0x5e26bb[_0x5365ac(0x8ec)],_0x1ffdec=$gameScreen[_0x5365ac(0x8f0)](_0xe84e9c);if(!_0x1ffdec)return;_0x1ffdec['setAnglePlusData'](_0x14a6b3,_0xac2a1,_0x1d621d);if(_0x49d8ea){const _0x14e63a=$gameTemp[_0x5365ac(0x50b)]();if(_0x14e63a)_0x14e63a[_0x5365ac(0x1f2)](_0xac2a1);}}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x458),_0x353150=>{const _0x274faf=_0x38072d;VisuMZ[_0x274faf(0x57a)](_0x353150,_0x353150);const _0xa97186=Math[_0x274faf(0x337)](_0x353150[_0x274faf(0x8b1)])[_0x274faf(0x480)](0x1,0x64),_0x331328=_0x353150[_0x274faf(0x75d)],_0x4c031a=_0x331328[_0x274faf(0x6c0)][_0x274faf(0x480)](0x0,0x1),_0x11490=Math['round'](_0x331328['PositionX']||0x0),_0xf2b2c4=Math[_0x274faf(0x337)](_0x331328['PositionY']||0x0),_0x1a73f5=Math[_0x274faf(0x337)](_0x331328[_0x274faf(0x311)]||0x0),_0x46c2d6=Math[_0x274faf(0x337)](_0x331328['ScaleY']||0x0),_0x2b9dff=Math[_0x274faf(0x337)](_0x331328['Opacity'])['clamp'](0x0,0xff),_0x5b419e=_0x331328[_0x274faf(0x721)],_0xb5d39c=_0x274faf(0x566),_0x52fe80=_0x353150[_0x274faf(0x9d5)]?_0x274faf(0x9d5):_0x274faf(0x855),_0x59b77d=_0xb5d39c[_0x274faf(0x941)](_0x353150['IconIndex'],_0x52fe80);$gameScreen['showPicture'](_0xa97186,_0x59b77d,_0x4c031a,_0x11490,_0xf2b2c4,_0x1a73f5,_0x46c2d6,_0x2b9dff,_0x5b419e);}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x363),_0x26dab4=>{const _0x1bd6a6=_0x38072d;VisuMZ['ConvertParams'](_0x26dab4,_0x26dab4);const _0x42f525=_0x26dab4[_0x1bd6a6(0x9b9)]||_0x1bd6a6(0x793),_0x5f6342=_0x26dab4['Power']['clamp'](0x1,0x9),_0x41c9cc=_0x26dab4[_0x1bd6a6(0x8c4)][_0x1bd6a6(0x480)](0x1,0x9),_0x2fc27d=_0x26dab4['Duration']||0x1,_0x5eec9e=_0x26dab4[_0x1bd6a6(0x8ec)];$gameScreen[_0x1bd6a6(0x557)](_0x42f525),$gameScreen['startShake'](_0x5f6342,_0x41c9cc,_0x2fc27d);if(_0x5eec9e){const _0x5945f7=$gameTemp['getLastPluginCommandInterpreter']();if(_0x5945f7)_0x5945f7['wait'](_0x2fc27d);}}),PluginManager['registerCommand'](pluginData[_0x38072d(0x25e)],_0x38072d(0x7fb),_0xc3952d=>{const _0x39d73b=_0x38072d;if($gameParty[_0x39d73b(0x8a2)]())return;VisuMZ[_0x39d73b(0x57a)](_0xc3952d,_0xc3952d);const _0x49b4a9=_0xc3952d[_0x39d73b(0x1a7)],_0x1d5e23=(_0xc3952d[_0x39d73b(0x5c8)]||0x0)/0x64;for(const _0x3bd0b2 of _0x49b4a9){const _0x468921=Math[_0x39d73b(0x793)]()<=_0x1d5e23;$gameSwitches['setValue'](_0x3bd0b2,_0x468921);}}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],_0x38072d(0x4f3),_0xd5891b=>{const _0x2780fd=_0x38072d;if($gameParty[_0x2780fd(0x8a2)]())return;VisuMZ['ConvertParams'](_0xd5891b,_0xd5891b);const _0x28e384=Math[_0x2780fd(0x864)](_0xd5891b[_0x2780fd(0x10d)],_0xd5891b[_0x2780fd(0x690)]),_0x9e6ce=Math[_0x2780fd(0x285)](_0xd5891b['StartID'],_0xd5891b[_0x2780fd(0x690)]),_0x4502d8=(_0xd5891b[_0x2780fd(0x5c8)]||0x0)/0x64;for(let _0x175c6e=_0x28e384;_0x175c6e<=_0x9e6ce;_0x175c6e++){if(_0x2780fd(0x7a1)!==_0x2780fd(0x4e0)){const _0x4886f8=Math[_0x2780fd(0x793)]()<=_0x4502d8;$gameSwitches[_0x2780fd(0x7cf)](_0x175c6e,_0x4886f8);}else this[_0x2780fd(0x278)]=_0x3ff235;}}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],_0x38072d(0x33f),_0x3c2bc5=>{const _0x34c960=_0x38072d;if($gameParty[_0x34c960(0x8a2)]())return;VisuMZ[_0x34c960(0x57a)](_0x3c2bc5,_0x3c2bc5);const _0x387609=_0x3c2bc5[_0x34c960(0x1a7)];for(const _0x304ea8 of _0x387609){if(_0x34c960(0x53a)==='Qsxsv'){const _0x1d6fa5=$gameSwitches[_0x34c960(0x3eb)](_0x304ea8);$gameSwitches[_0x34c960(0x7cf)](_0x304ea8,!_0x1d6fa5);}else this[_0x34c960(0x2dc)]=_0x49f512[_0x34c960(0x576)][_0x34c960(0x6d0)]()!==_0x34c960(0x3e1)?0x0:0x8;}}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x2ee),_0x2b90ff=>{const _0x4296af=_0x38072d;if($gameParty['inBattle']())return;VisuMZ[_0x4296af(0x57a)](_0x2b90ff,_0x2b90ff);const _0x1c21b3=Math[_0x4296af(0x864)](_0x2b90ff[_0x4296af(0x10d)],_0x2b90ff[_0x4296af(0x690)]),_0xf7fb76=Math[_0x4296af(0x285)](_0x2b90ff[_0x4296af(0x10d)],_0x2b90ff[_0x4296af(0x690)]);for(let _0x426c6f=_0x1c21b3;_0x426c6f<=_0xf7fb76;_0x426c6f++){const _0x44a511=$gameSwitches[_0x4296af(0x3eb)](_0x426c6f);$gameSwitches['setValue'](_0x426c6f,!_0x44a511);}}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x81d),_0x15c9c9=>{const _0x25c374=_0x38072d;VisuMZ['ConvertParams'](_0x15c9c9,_0x15c9c9);const _0x42ba47=_0x15c9c9[_0x25c374(0x110)]||0x1;$gameSystem[_0x25c374(0x886)](_0x42ba47);}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x53d),_0x6981ce=>{const _0x4ad761=_0x38072d;if($gameParty['inBattle']())return;VisuMZ[_0x4ad761(0x57a)](_0x6981ce,_0x6981ce);const _0xa8a786=_0x6981ce[_0x4ad761(0x110)];if(_0xa8a786[_0x4ad761(0x322)](/Front/i))$gameSystem['setSideView'](![]);else _0xa8a786[_0x4ad761(0x322)](/Side/i)?$gameSystem[_0x4ad761(0x210)](!![]):$gameSystem['setSideView'](!$gameSystem[_0x4ad761(0x79a)]());}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],'SystemLoadAudio',_0x16ea5b=>{const _0x4743d6=_0x38072d;if($gameParty[_0x4743d6(0x8a2)]())return;VisuMZ['ConvertParams'](_0x16ea5b,_0x16ea5b);const _0x43dafd=[_0x4743d6(0x701),_0x4743d6(0x84c),'me','se'];for(const _0x6a38b5 of _0x43dafd){if(_0x4743d6(0x80a)!==_0x4743d6(0x40c)){const _0x577fbb=_0x16ea5b[_0x6a38b5],_0x1ff11c='%1/'[_0x4743d6(0x941)](_0x6a38b5);for(const _0x57b0ae of _0x577fbb){if(_0x4743d6(0x5db)===_0x4743d6(0x5db))AudioManager['createBuffer'](_0x1ff11c,_0x57b0ae);else{if(!!_0x53ded7[_0x211371]){if(_0x15a439[_0x4743d6(0x267)]())_0x47eafd[_0x4743d6(0x220)](_0x4743d6(0x173)[_0x4743d6(0x941)](_0x3703d7));}const _0x487d14=_0x4743d6(0x6ac)['format'](_0x2077c2,_0x46b1d2);_0x31610d[_0x44f453]=new _0x42bf5b(_0x487d14);}}}else _0x545cca[_0x4743d6(0x182)][_0x4743d6(0x770)][_0x4743d6(0x967)](this),this['_data']=_0x522eda,this['_clickHandler']=null,this[_0x4743d6(0x554)]();}}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],_0x38072d(0x375),_0x9534ed=>{const _0x37d792=_0x38072d;if($gameParty[_0x37d792(0x8a2)]())return;VisuMZ[_0x37d792(0x57a)](_0x9534ed,_0x9534ed);const _0x248584=[_0x37d792(0x604),_0x37d792(0x7ad),_0x37d792(0x6e7),_0x37d792(0x64d),_0x37d792(0x3ae),_0x37d792(0x6fe),_0x37d792(0x7c4),'pictures',_0x37d792(0x7b7),'sv_enemies','system',_0x37d792(0x5b9),'titles1','titles2'];for(const _0x50d367 of _0x248584){if(_0x37d792(0x483)===_0x37d792(0x483)){const _0x494ceb=_0x9534ed[_0x50d367],_0x37d2f6=_0x37d792(0x91f)[_0x37d792(0x941)](_0x50d367);for(const _0x29b522 of _0x494ceb){if(_0x37d792(0x562)!==_0x37d792(0x801))ImageManager[_0x37d792(0x257)](_0x37d2f6,_0x29b522);else{let _0x4273e9=_0x1659af[_0x37d792(0x1ad)],_0x45f957=_0x4273e9[_0x37d792(0x3ec)];for(let _0x4d2c79=0x0;_0x4d2c79<_0x45f957;++_0x4d2c79){this[_0x37d792(0x513)][_0x37d792(0x725)](_0x4273e9[_0x4d2c79])?_0x205f11[_0x37d792(0x46b)]():_0x158695[_0x37d792(0x11e)]();}_0x574785[_0x37d792(0x8bd)]();}}}else this[_0x37d792(0x575)]=_0x28852a;}}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],'SystemSetBattleSystem',_0x171fd7=>{const _0x508ca7=_0x38072d;if($gameParty[_0x508ca7(0x8a2)]())return;VisuMZ[_0x508ca7(0x57a)](_0x171fd7,_0x171fd7);const _0x1fbabb=_0x171fd7[_0x508ca7(0x110)][_0x508ca7(0x994)]()[_0x508ca7(0x5bd)](),_0x2b5032=VisuMZ[_0x508ca7(0x45d)][_0x508ca7(0x67b)](_0x1fbabb);$gameSystem[_0x508ca7(0x26a)](_0x2b5032);}),VisuMZ[_0x38072d(0x45d)][_0x38072d(0x67b)]=function(_0x1da3b9){const _0x2447ce=_0x38072d;_0x1da3b9=_0x1da3b9||_0x2447ce(0x545),_0x1da3b9=String(_0x1da3b9)['toUpperCase']()[_0x2447ce(0x5bd)]();switch(_0x1da3b9){case _0x2447ce(0x727):return 0x0;case'TPB\x20ACTIVE':if(Imported[_0x2447ce(0x839)]){if(_0x2447ce(0x351)!==_0x2447ce(0x351))return this[_0x2447ce(0x31d)];else ConfigManager['atbActive']=!![];}return 0x1;case _0x2447ce(0x6b8):Imported[_0x2447ce(0x839)]&&(ConfigManager['atbActive']=![]);return 0x2;case'CTB':if(Imported['VisuMZ_2_BattleSystemCTB'])return _0x2447ce(0x27d);break;case _0x2447ce(0x718):if(Imported[_0x2447ce(0x7c0)])return _0x2447ce(0x718);break;case _0x2447ce(0x812):if(Imported[_0x2447ce(0x9a4)])return _0x2447ce(0x812);break;case _0x2447ce(0x83b):if(Imported[_0x2447ce(0x55e)])return _0x2447ce(0x83b);break;case _0x2447ce(0x67e):if(Imported[_0x2447ce(0x63f)])return _0x2447ce(0x67e);break;case _0x2447ce(0x9cd):if(Imported[_0x2447ce(0x219)]){if('udPuF'!==_0x2447ce(0x506)){if(!this['isScrollBarVisible']())return;if(this['_scrollBarHorz']||this[_0x2447ce(0x2c1)])return;this[_0x2447ce(0x338)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x2447ce(0x57b)]=new _0x44a2b5(),this['_scrollBarVert']=new _0x41a508(),this[_0x2447ce(0x343)](this[_0x2447ce(0x57b)]),this[_0x2447ce(0x343)](this[_0x2447ce(0x2c1)]);}else return _0x2447ce(0x9cd);}break;case _0x2447ce(0x5cb):if(Imported[_0x2447ce(0x72f)])return _0x2447ce(0x5cb);break;}return $dataSystem['battleSystem'];},PluginManager[_0x38072d(0x2bb)](pluginData['name'],_0x38072d(0x447),_0x7e5d8d=>{const _0x3e4edc=_0x38072d;VisuMZ[_0x3e4edc(0x57a)](_0x7e5d8d,_0x7e5d8d);const _0x5878e4=_0x7e5d8d[_0x3e4edc(0x110)]||0x1;$gameSystem['setWindowPadding'](_0x5878e4);}),PluginManager[_0x38072d(0x2bb)](pluginData[_0x38072d(0x25e)],_0x38072d(0x206),_0x3e385a=>{const _0x3c21cb=_0x38072d;VisuMZ[_0x3c21cb(0x57a)](_0x3e385a,_0x3e385a);const _0x503f6d=_0x3e385a['text']||'';$textPopup(_0x503f6d);}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],'VariableEvalReference',_0x2fe6d7=>{const _0x3a3909=_0x38072d;VisuMZ[_0x3a3909(0x57a)](_0x2fe6d7,_0x2fe6d7);const _0x3e6ec7=_0x2fe6d7['id']||0x1,_0x5cd7dc=_0x2fe6d7['operation'],_0x392a20=_0x2fe6d7[_0x3a3909(0x4bb)]||0x0;let _0x23b2cc=$gameVariables[_0x3a3909(0x3eb)](_0x3e6ec7)||0x0;switch(_0x5cd7dc){case'=':_0x23b2cc=_0x392a20;break;case'+':_0x23b2cc+=_0x392a20;break;case'-':_0x23b2cc-=_0x392a20;break;case'*':_0x23b2cc*=_0x392a20;break;case'/':_0x23b2cc/=_0x392a20;break;case'%':_0x23b2cc%=_0x392a20;break;}_0x23b2cc=_0x23b2cc||0x0,$gameVariables[_0x3a3909(0x7cf)](_0x3e6ec7,_0x23b2cc);}),PluginManager[_0x38072d(0x2bb)](pluginData['name'],_0x38072d(0x3d5),_0x2d6e79=>{const _0x59546c=_0x38072d;VisuMZ[_0x59546c(0x57a)](_0x2d6e79,_0x2d6e79);const _0x2af477=_0x2d6e79['id']()||0x1,_0x2b0cee=_0x2d6e79[_0x59546c(0x83f)],_0x294bb4=_0x2d6e79[_0x59546c(0x4bb)]()||0x0;let _0x3d3ce0=$gameVariables[_0x59546c(0x3eb)](_0x2af477)||0x0;switch(_0x2b0cee){case'=':_0x3d3ce0=_0x294bb4;break;case'+':_0x3d3ce0+=_0x294bb4;break;case'-':_0x3d3ce0-=_0x294bb4;break;case'*':_0x3d3ce0*=_0x294bb4;break;case'/':_0x3d3ce0/=_0x294bb4;break;case'%':_0x3d3ce0%=_0x294bb4;break;}_0x3d3ce0=_0x3d3ce0||0x0,$gameVariables[_0x59546c(0x7cf)](_0x2af477,_0x3d3ce0);}),VisuMZ[_0x38072d(0x45d)][_0x38072d(0x538)]=Scene_Boot[_0x38072d(0x182)][_0x38072d(0x75b)],Scene_Boot[_0x38072d(0x182)][_0x38072d(0x75b)]=function(){const _0x3825fd=_0x38072d;VisuMZ[_0x3825fd(0x45d)][_0x3825fd(0x538)][_0x3825fd(0x967)](this),this[_0x3825fd(0x32e)](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x3825fd(0x647)](),this[_0x3825fd(0x92e)](),this[_0x3825fd(0x59e)](),this['process_VisuMZ_CoreEngine_ControllerButtons'](),VisuMZ['ParseAllNotetags']();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x6d1)]={},Scene_Boot['prototype'][_0x38072d(0x32e)]=function(){const _0x57dae7=_0x38072d,_0x1fb687=[_0x57dae7(0x84a),_0x57dae7(0x847),_0x57dae7(0x7d8),_0x57dae7(0x3a3),_0x57dae7(0x252),'MDF','AGI',_0x57dae7(0x307)],_0x5600e6=[_0x57dae7(0x1ab),'EVA',_0x57dae7(0x76c),'CEV',_0x57dae7(0x529),_0x57dae7(0x174),_0x57dae7(0x72c),'HRG','MRG',_0x57dae7(0x4cd)],_0x57c48f=['TGR',_0x57dae7(0x5ed),_0x57dae7(0x2f5),_0x57dae7(0x64c),_0x57dae7(0x20c),'TCR',_0x57dae7(0x1e5),_0x57dae7(0x25f),_0x57dae7(0x436),_0x57dae7(0x526)],_0x13bed0=[_0x1fb687,_0x5600e6,_0x57c48f],_0x4bc789=[_0x57dae7(0x794),'Plus1',_0x57dae7(0x306),_0x57dae7(0x34a),_0x57dae7(0x3c1),'Rate1',_0x57dae7(0x912),'Flat',_0x57dae7(0x2ed),_0x57dae7(0x7af)];for(const _0x4bae99 of _0x13bed0){if(_0x57dae7(0x26d)!==_0x57dae7(0x9c4)){let _0x198bc4='';if(_0x4bae99===_0x1fb687)_0x198bc4=_0x57dae7(0x73a);if(_0x4bae99===_0x5600e6)_0x198bc4=_0x57dae7(0x80f);if(_0x4bae99===_0x57c48f)_0x198bc4=_0x57dae7(0x352);for(const _0x3b8b1c of _0x4bc789){let _0x2c69de=_0x57dae7(0x4f6)[_0x57dae7(0x941)](_0x198bc4,_0x3b8b1c);VisuMZ['CoreEngine'][_0x57dae7(0x6d1)][_0x2c69de]=[],VisuMZ[_0x57dae7(0x45d)][_0x57dae7(0x6d1)][_0x2c69de+'JS']=[];let _0x2cbbb0=_0x57dae7(0x198);if([_0x57dae7(0x794),'Flat'][_0x57dae7(0x2ac)](_0x3b8b1c))_0x2cbbb0+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x57dae7(0x258),_0x57dae7(0x2ed)][_0x57dae7(0x2ac)](_0x3b8b1c)){if('nRotW'===_0x57dae7(0x958))_0x2cbbb0+='([\x5c+\x5c-]\x5cd+)([%％])>';else{var _0x31292b=_0x1e977a('nw.gui')['Window']['get']();_0x33183a[_0x57dae7(0x754)]();if(_0x21d697)_0xda2a91(_0x31292b[_0x57dae7(0x4f5)][_0x57dae7(0x667)](_0x31292b),0x190);}}else{if([_0x57dae7(0x306),_0x57dae7(0x7af)][_0x57dae7(0x2ac)](_0x3b8b1c))_0x2cbbb0+=_0x57dae7(0x2b3);else{if(_0x3b8b1c===_0x57dae7(0x34a))_0x2cbbb0+=_0x57dae7(0x5a9);else{if(_0x3b8b1c===_0x57dae7(0x990))_0x2cbbb0+=_0x57dae7(0x876);else _0x3b8b1c===_0x57dae7(0x912)&&(_0x2cbbb0+='(\x5cd+\x5c.?\x5cd+)>');}}}}for(const _0x1c02e8 of _0x4bae99){if(_0x57dae7(0x83c)===_0x57dae7(0x83c)){let _0x75b2d7=_0x3b8b1c[_0x57dae7(0x152)](/[\d+]/g,'')[_0x57dae7(0x994)]();const _0x5da060=_0x2cbbb0[_0x57dae7(0x941)](_0x1c02e8,_0x75b2d7);VisuMZ[_0x57dae7(0x45d)][_0x57dae7(0x6d1)][_0x2c69de]['push'](new RegExp(_0x5da060,'i'));const _0x22437d=_0x57dae7(0x850)['format'](_0x1c02e8,_0x75b2d7);VisuMZ[_0x57dae7(0x45d)][_0x57dae7(0x6d1)][_0x2c69de+'JS'][_0x57dae7(0x534)](new RegExp(_0x22437d,'i'));}else{if(this['x']===0x0)this['x']=_0x5b2d77[_0x57dae7(0x337)](_0x58909c[_0x57dae7(0x729)]/0x2);if(this['y']===0x0)this['y']=_0x5e9cbb['round'](_0x9c17b['height']/0x2);}}}}else _0x1f36df[_0x57dae7(0x624)]();}},Scene_Boot['prototype'][_0x38072d(0x209)]=function(){const _0x55761f=_0x38072d;if(VisuMZ[_0x55761f(0x976)])return;},Scene_Boot[_0x38072d(0x182)][_0x38072d(0x647)]=function(){const _0x762f63=_0x38072d,_0x4b5478=VisuMZ[_0x762f63(0x45d)][_0x762f63(0x75d)];_0x4b5478[_0x762f63(0x6a9)][_0x762f63(0x2e3)]&&VisuMZ[_0x762f63(0x9f6)](!![]);_0x4b5478[_0x762f63(0x6a9)][_0x762f63(0x699)]&&(Input[_0x762f63(0x12f)][0x23]=_0x762f63(0x4bc),Input['keyMapper'][0x24]=_0x762f63(0x97f));if(_0x4b5478[_0x762f63(0x6b6)]){if(_0x762f63(0x3b1)===_0x762f63(0x9ba))this[_0x762f63(0x74b)]=_0x4f197b;else{const _0x54af24=_0x4b5478['ButtonAssist'];_0x54af24[_0x762f63(0x5d7)]=_0x54af24[_0x762f63(0x5d7)]||_0x762f63(0x2ae),_0x54af24[_0x762f63(0x3f3)]=_0x54af24[_0x762f63(0x3f3)]||_0x762f63(0x52c);}}if(_0x4b5478['KeyboardInput']['WASD']){if(_0x762f63(0x303)===_0x762f63(0x303))Input['keyMapper'][0x57]='up',Input[_0x762f63(0x12f)][0x41]='left',Input[_0x762f63(0x12f)][0x53]=_0x762f63(0x407),Input[_0x762f63(0x12f)][0x44]=_0x762f63(0x16d),Input['keyMapper'][0x45]='pagedown';else return _0x347158[_0x762f63(0x54f)]['CommandRect'][_0x762f63(0x967)](this);}_0x4b5478['KeyboardInput'][_0x762f63(0x89c)]&&(Input[_0x762f63(0x12f)][0x52]=_0x762f63(0x3e6)),_0x4b5478[_0x762f63(0x651)]['DisplayedParams']=_0x4b5478['Param'][_0x762f63(0x438)][_0x762f63(0x353)](_0x422c21=>_0x422c21[_0x762f63(0x994)]()[_0x762f63(0x5bd)]()),_0x4b5478['Param'][_0x762f63(0x539)]=_0x4b5478[_0x762f63(0x651)][_0x762f63(0x539)][_0x762f63(0x353)](_0x40bd11=>_0x40bd11[_0x762f63(0x994)]()[_0x762f63(0x5bd)]()),_0x4b5478[_0x762f63(0x6a9)][_0x762f63(0x866)]=_0x4b5478[_0x762f63(0x6a9)]['ShiftR_Toggle']??!![],_0x4b5478[_0x762f63(0x6a9)][_0x762f63(0x90b)]=_0x4b5478[_0x762f63(0x6a9)]['ShiftT_Toggle']??!![];},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_Functions']=function(){const _0x2cbcfc=_0x38072d;this[_0x2cbcfc(0x3bb)]();},Scene_Boot[_0x38072d(0x182)][_0x38072d(0x3bb)]=function(){const _0x349665=_0x38072d,_0x4237a2=VisuMZ['CoreEngine'][_0x349665(0x75d)]['jsQuickFunc'];for(const _0x1927a3 of _0x4237a2){if(_0x349665(0x368)===_0x349665(0x9c2)){_0x371096[_0x349665(0x45d)][_0x349665(0x3b4)][_0x349665(0x967)](this);const _0x6cbb2c=this[_0x349665(0x6ba)]['_timerSprite'];if(_0x6cbb2c)this[_0x349665(0x343)](_0x6cbb2c);}else{const _0x291d6e=_0x1927a3[_0x349665(0x1db)][_0x349665(0x152)](/[ ]/g,''),_0x37fc7e=_0x1927a3[_0x349665(0x8e4)];VisuMZ[_0x349665(0x45d)][_0x349665(0x5a4)](_0x291d6e,_0x37fc7e);}}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x5a4)]=function(_0xbef06e,_0x581863){const _0x3ef907=_0x38072d;if(!!window[_0xbef06e]){if(_0x3ef907(0x87b)===_0x3ef907(0x100)){const _0x186be9=_0x314667[_0x3ef907(0x7a0)]()*_0x19e1c7[_0x3ef907(0x94c)]();return(this['_y']-_0x186be9)*_0xb98d50[_0x3ef907(0x83a)]();}else{if($gameTemp[_0x3ef907(0x267)]())console[_0x3ef907(0x220)](_0x3ef907(0x173)[_0x3ef907(0x941)](_0xbef06e));}}const _0x43090c=_0x3ef907(0x6ac)[_0x3ef907(0x941)](_0xbef06e,_0x581863);window[_0xbef06e]=new Function(_0x43090c);},Scene_Boot[_0x38072d(0x182)][_0x38072d(0x59e)]=function(){const _0x3b1b99=_0x38072d,_0xfb7ce3=VisuMZ['CoreEngine'][_0x3b1b99(0x75d)][_0x3b1b99(0x1f8)];if(!_0xfb7ce3)return;for(const _0x3ebe70 of _0xfb7ce3){if(!_0x3ebe70)continue;VisuMZ['CoreEngine'][_0x3b1b99(0x2c5)](_0x3ebe70);}},VisuMZ[_0x38072d(0x45d)]['CustomParamNames']={},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x579)]={},VisuMZ[_0x38072d(0x45d)]['CustomParamType']={},VisuMZ['CoreEngine'][_0x38072d(0x37f)]={},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x2c5)]=function(_0x40bdb3){const _0x57de42=_0x38072d,_0x585328=_0x40bdb3[_0x57de42(0x694)],_0xc307d5=_0x40bdb3[_0x57de42(0x8f9)],_0x2c220a=_0x40bdb3['Icon'],_0x16bb24=_0x40bdb3[_0x57de42(0x9b9)],_0xd6c3f1=new Function(_0x40bdb3[_0x57de42(0x8d3)]);VisuMZ['CoreEngine'][_0x57de42(0x88c)][_0x585328[_0x57de42(0x994)]()[_0x57de42(0x5bd)]()]=_0xc307d5,VisuMZ[_0x57de42(0x45d)]['CustomParamIcons'][_0x585328[_0x57de42(0x994)]()[_0x57de42(0x5bd)]()]=_0x2c220a,VisuMZ['CoreEngine'][_0x57de42(0x260)][_0x585328[_0x57de42(0x994)]()['trim']()]=_0x16bb24,VisuMZ[_0x57de42(0x45d)][_0x57de42(0x37f)][_0x585328[_0x57de42(0x994)]()[_0x57de42(0x5bd)]()]=_0x585328,Object[_0x57de42(0x1eb)](Game_BattlerBase[_0x57de42(0x182)],_0x585328,{'get'(){const _0x5021de=_0x57de42;if(_0x5021de(0x60f)===_0x5021de(0x2b2)){const _0x1d9dc4=_0x384717[_0x321f1b][_0x5021de(0x25e)];_0x3f1b4e+=_0x98a2ee+_0x5021de(0x1ac)[_0x5021de(0x941)](_0x3a7fa3,_0x1d9dc4||_0x5021de(0x774))+_0x98c6cc;}else{const _0x5dfac9=_0xd6c3f1[_0x5021de(0x967)](this);return _0x16bb24==='integer'?Math[_0x5021de(0x337)](_0x5dfac9):_0x5dfac9;}}});},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x56d)]={},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x7ac)]={},Scene_Boot['prototype']['process_VisuMZ_CoreEngine_ControllerButtons']=function(){const _0x46226f=_0x38072d,_0x569dc3=VisuMZ[_0x46226f(0x45d)][_0x46226f(0x75d)][_0x46226f(0x56d)];for(const _0x173e29 of _0x569dc3){const _0x2e6af3=(_0x173e29['Name']||'')[_0x46226f(0x27c)]()[_0x46226f(0x5bd)](),_0x53ced6=(_0x173e29[_0x46226f(0x744)]||'')['toLowerCase']()['trim']();VisuMZ['CoreEngine'][_0x46226f(0x56d)][_0x2e6af3]=_0x173e29,VisuMZ['CoreEngine']['ControllerMatches'][_0x53ced6]=_0x2e6af3;}},VisuMZ['ParseAllNotetags']=function(){const _0x2c6c03=_0x38072d;for(const _0x285ed7 of $dataActors){if(_0x2c6c03(0x277)!==_0x2c6c03(0x36e)){if(_0x285ed7)VisuMZ[_0x2c6c03(0x53f)](_0x285ed7);}else this[_0x2c6c03(0x41f)](_0x47325d,_0x19446f,_0xeec48f,_0x521aaf);}for(const _0x1f9677 of $dataClasses){if(_0x1f9677)VisuMZ[_0x2c6c03(0x6d9)](_0x1f9677);}for(const _0x36969a of $dataSkills){if(_0x36969a)VisuMZ[_0x2c6c03(0x909)](_0x36969a);}for(const _0x3e1317 of $dataItems){if(_0x3e1317)VisuMZ['ParseItemNotetags'](_0x3e1317);}for(const _0x3e30bd of $dataWeapons){if(_0x3e30bd)VisuMZ[_0x2c6c03(0x831)](_0x3e30bd);}for(const _0x1710e4 of $dataArmors){if(_0x1710e4)VisuMZ[_0x2c6c03(0x44c)](_0x1710e4);}for(const _0x5c3b80 of $dataEnemies){if(_0x5c3b80)VisuMZ[_0x2c6c03(0x3b5)](_0x5c3b80);}for(const _0x2aae82 of $dataStates){if(_0x2aae82)VisuMZ['ParseStateNotetags'](_0x2aae82);}for(const _0x13b514 of $dataTilesets){if(_0x13b514)VisuMZ[_0x2c6c03(0x867)](_0x13b514);}},VisuMZ['ParseActorNotetags']=function(_0x3f43c9){},VisuMZ['ParseClassNotetags']=function(_0x289f72){},VisuMZ['ParseSkillNotetags']=function(_0x30e61f){},VisuMZ[_0x38072d(0x6bd)]=function(_0x574112){},VisuMZ['ParseWeaponNotetags']=function(_0x41682a){},VisuMZ[_0x38072d(0x44c)]=function(_0x5442f5){},VisuMZ[_0x38072d(0x3b5)]=function(_0x21b425){},VisuMZ['ParseStateNotetags']=function(_0xff5b2e){},VisuMZ['ParseTilesetNotetags']=function(_0x12efa6){},VisuMZ['CoreEngine'][_0x38072d(0x53f)]=VisuMZ[_0x38072d(0x53f)],VisuMZ[_0x38072d(0x53f)]=function(_0x486703){const _0x119254=_0x38072d;VisuMZ['CoreEngine'][_0x119254(0x53f)][_0x119254(0x967)](this,_0x486703);const _0x259633=_0x486703[_0x119254(0x673)];if(_0x259633[_0x119254(0x322)](/<MAX LEVEL:[ ](\d+)>/i)){_0x486703[_0x119254(0x413)]=Number(RegExp['$1']);if(_0x486703[_0x119254(0x413)]===0x0)_0x486703['maxLevel']=Number[_0x119254(0x471)];}if(_0x259633['match'](/<INITIAL LEVEL:[ ](\d+)>/i)){if(_0x119254(0x477)===_0x119254(0x477))_0x486703[_0x119254(0x9c1)]=Math[_0x119254(0x864)](Number(RegExp['$1']),_0x486703[_0x119254(0x413)]);else{const _0xa63bfe=_0x9fab33[_0x119254(0x5d0)],_0x332079=_0x41f253[_0x119254(0x182)][_0x119254(0x2ef)](),_0x432c4d=0x0;let _0xc5b90c=0x0;return this[_0x119254(0x6d0)]()===_0x119254(0x766)?_0xc5b90c=0x0:_0xc5b90c=_0xaeda03[_0x119254(0x15b)]-_0x332079,new _0x278db9(_0x432c4d,_0xc5b90c,_0xa63bfe,_0x332079);}}},VisuMZ['CoreEngine']['ParseClassNotetags']=VisuMZ[_0x38072d(0x6d9)],VisuMZ[_0x38072d(0x6d9)]=function(_0xe9bb9){const _0x164c5f=_0x38072d;VisuMZ[_0x164c5f(0x45d)][_0x164c5f(0x6d9)][_0x164c5f(0x967)](this,_0xe9bb9);if(_0xe9bb9[_0x164c5f(0x872)]){if('RufzQ'!==_0x164c5f(0x978))for(const _0x2cebb8 of _0xe9bb9['learnings']){if(_0x2cebb8[_0x164c5f(0x673)][_0x164c5f(0x322)](/<LEARN AT LEVEL:[ ](\d+)>/i)){if(_0x164c5f(0x445)==='HlLZv')_0x2cebb8[_0x164c5f(0x158)]=Math[_0x164c5f(0x285)](Number(RegExp['$1']),0x1);else return _0x2fdb4d[_0x164c5f(0x746)](_0x18e6ac,'','');}}else _0x576b00[_0x164c5f(0x3f8)]=!![];}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x3b5)]=VisuMZ[_0x38072d(0x3b5)],VisuMZ['ParseEnemyNotetags']=function(_0x2b400b){const _0x3f39c5=_0x38072d;VisuMZ[_0x3f39c5(0x45d)]['ParseEnemyNotetags']['call'](this,_0x2b400b),_0x2b400b['level']=0x1;const _0x141fb7=_0x2b400b[_0x3f39c5(0x673)];if(_0x141fb7['match'](/<LEVEL:[ ](\d+)>/i))_0x2b400b['level']=Number(RegExp['$1']);if(_0x141fb7[_0x3f39c5(0x322)](/<MAXHP:[ ](\d+)>/i))_0x2b400b[_0x3f39c5(0x7de)][0x0]=Number(RegExp['$1']);if(_0x141fb7[_0x3f39c5(0x322)](/<MAXMP:[ ](\d+)>/i))_0x2b400b[_0x3f39c5(0x7de)][0x1]=Number(RegExp['$1']);if(_0x141fb7[_0x3f39c5(0x322)](/<ATK:[ ](\d+)>/i))_0x2b400b['params'][0x2]=Number(RegExp['$1']);if(_0x141fb7[_0x3f39c5(0x322)](/<DEF:[ ](\d+)>/i))_0x2b400b[_0x3f39c5(0x7de)][0x3]=Number(RegExp['$1']);if(_0x141fb7[_0x3f39c5(0x322)](/<MAT:[ ](\d+)>/i))_0x2b400b[_0x3f39c5(0x7de)][0x4]=Number(RegExp['$1']);if(_0x141fb7['match'](/<MDF:[ ](\d+)>/i))_0x2b400b[_0x3f39c5(0x7de)][0x5]=Number(RegExp['$1']);if(_0x141fb7['match'](/<AGI:[ ](\d+)>/i))_0x2b400b['params'][0x6]=Number(RegExp['$1']);if(_0x141fb7[_0x3f39c5(0x322)](/<LUK:[ ](\d+)>/i))_0x2b400b['params'][0x7]=Number(RegExp['$1']);if(_0x141fb7[_0x3f39c5(0x322)](/<EXP:[ ](\d+)>/i))_0x2b400b['exp']=Number(RegExp['$1']);if(_0x141fb7['match'](/<GOLD:[ ](\d+)>/i))_0x2b400b[_0x3f39c5(0xfe)]=Number(RegExp['$1']);},VisuMZ['CoreEngine'][_0x38072d(0x3a1)]=Graphics[_0x38072d(0x213)],Graphics['_defaultStretchMode']=function(){const _0x2a165a=_0x38072d;switch(VisuMZ[_0x2a165a(0x45d)]['Settings'][_0x2a165a(0x6a9)][_0x2a165a(0x2cd)]){case _0x2a165a(0x315):return!![];case _0x2a165a(0x107):return![];default:return VisuMZ['CoreEngine']['Graphics_defaultStretchMode']['call'](this);}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x3ce)]=Graphics[_0x38072d(0x5a8)],Graphics[_0x38072d(0x5a8)]=function(_0x5275b3,_0x2223b6,_0x21759f=null){const _0x57d659=_0x38072d;VisuMZ[_0x57d659(0x45d)]['Graphics_printError'][_0x57d659(0x967)](this,_0x5275b3,_0x2223b6,_0x21759f),VisuMZ[_0x57d659(0x9f6)](![]);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x932)]=Graphics['_centerElement'],Graphics['_centerElement']=function(_0x5dd890){const _0x12d16a=_0x38072d;VisuMZ['CoreEngine'][_0x12d16a(0x932)]['call'](this,_0x5dd890),this[_0x12d16a(0x659)](_0x5dd890);},Graphics[_0x38072d(0x659)]=function(_0x35ab08){const _0x59fbac=_0x38072d;if(VisuMZ['CoreEngine'][_0x59fbac(0x75d)][_0x59fbac(0x6a9)][_0x59fbac(0x2fc)]){if('SZFzR'===_0x59fbac(0x11b))_0x35ab08[_0x59fbac(0x59a)][_0x59fbac(0x9e1)]=_0x59fbac(0x688);else{this[_0x59fbac(0x301)]();const _0x203a8a=this['_duration'];_0x58cc49[_0x59fbac(0x45d)][_0x59fbac(0xf3)][_0x59fbac(0x967)](this),_0x203a8a>0x0&&this[_0x59fbac(0x371)]<=0x0&&(this['_x']=this['_targetX'],this['_y']=this[_0x59fbac(0x693)],this[_0x59fbac(0x3ab)]=this['_targetScaleX'],this[_0x59fbac(0x298)]=this[_0x59fbac(0x602)],this[_0x59fbac(0x2da)]=this[_0x59fbac(0x556)],this[_0x59fbac(0x644)]&&(this[_0x59fbac(0x644)]['x']=this[_0x59fbac(0x8b4)]['x'],this['_anchor']['y']=this['_targetAnchor']['y']));}}VisuMZ['CoreEngine'][_0x59fbac(0x75d)][_0x59fbac(0x6a9)][_0x59fbac(0x57d)]&&(_0x35ab08[_0x59fbac(0x59a)][_0x59fbac(0x184)]=_0x59fbac(0x43f));const _0x1fe449=Math[_0x59fbac(0x285)](0x0,Math[_0x59fbac(0x167)](_0x35ab08[_0x59fbac(0x729)]*this[_0x59fbac(0x8ac)])),_0x5eb1ab=Math['max'](0x0,Math[_0x59fbac(0x167)](_0x35ab08['height']*this[_0x59fbac(0x8ac)]));_0x35ab08['style']['width']=_0x1fe449+'px',_0x35ab08['style']['height']=_0x5eb1ab+'px';},VisuMZ['CoreEngine'][_0x38072d(0x9c9)]=Bitmap['prototype']['initialize'],Bitmap[_0x38072d(0x182)]['initialize']=function(_0x2deabd,_0x3a43fc){const _0x20bbcc=_0x38072d;VisuMZ[_0x20bbcc(0x45d)][_0x20bbcc(0x9c9)][_0x20bbcc(0x967)](this,_0x2deabd,_0x3a43fc),this[_0x20bbcc(0x8d0)]=!(VisuMZ[_0x20bbcc(0x45d)][_0x20bbcc(0x75d)][_0x20bbcc(0x6a9)][_0x20bbcc(0x57d)]??!![]);},Bitmap[_0x38072d(0x182)][_0x38072d(0x1e6)]=function(){const _0x252647=_0x38072d;this[_0x252647(0x3ca)]=!![];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x123)]=Sprite[_0x38072d(0x182)]['destroy'],Sprite['prototype'][_0x38072d(0x420)]=function(){const _0x291fda=_0x38072d;if(this[_0x291fda(0x9fd)])VisuMZ[_0x291fda(0x45d)][_0x291fda(0x123)][_0x291fda(0x967)](this);this['destroyCoreEngineMarkedBitmaps']();},Sprite['prototype'][_0x38072d(0x1d1)]=function(){const _0x903892=_0x38072d;if(!this['bitmap'])return;if(!this[_0x903892(0x208)]['_customModified'])return;this[_0x903892(0x208)][_0x903892(0x296)]&&!this['_bitmap']['_baseTexture'][_0x903892(0x4e9)]&&this[_0x903892(0x208)][_0x903892(0x420)]();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x395)]=Bitmap['prototype']['resize'],Bitmap[_0x38072d(0x182)][_0x38072d(0x82e)]=function(_0x322229,_0x50c86b){const _0x3a1888=_0x38072d;VisuMZ['CoreEngine'][_0x3a1888(0x395)][_0x3a1888(0x967)](this,_0x322229,_0x50c86b),this[_0x3a1888(0x1e6)]();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x8af)]=Bitmap['prototype']['blt'],Bitmap['prototype'][_0x38072d(0x21a)]=function(_0x15d7e3,_0x184581,_0x2304f9,_0x532d2a,_0x2ab152,_0x5df746,_0x1b0648,_0x4ee7d9,_0x2c161b){const _0x143ab2=_0x38072d;_0x184581=Math[_0x143ab2(0x337)](_0x184581),_0x2304f9=Math[_0x143ab2(0x337)](_0x2304f9),_0x532d2a=Math['round'](_0x532d2a),_0x2ab152=Math['round'](_0x2ab152),_0x5df746=Math[_0x143ab2(0x337)](_0x5df746),_0x1b0648=Math[_0x143ab2(0x337)](_0x1b0648),VisuMZ[_0x143ab2(0x45d)][_0x143ab2(0x8af)]['call'](this,_0x15d7e3,_0x184581,_0x2304f9,_0x532d2a,_0x2ab152,_0x5df746,_0x1b0648,_0x4ee7d9,_0x2c161b),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x38072d(0x806)]=Bitmap['prototype'][_0x38072d(0x820)],Bitmap[_0x38072d(0x182)][_0x38072d(0x820)]=function(_0x2749c6,_0x379e55,_0x579149,_0x4ea7b0){const _0x1b45fb=_0x38072d;VisuMZ[_0x1b45fb(0x45d)][_0x1b45fb(0x806)][_0x1b45fb(0x967)](this,_0x2749c6,_0x379e55,_0x579149,_0x4ea7b0),this[_0x1b45fb(0x1e6)]();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x354)]=Bitmap[_0x38072d(0x182)][_0x38072d(0x201)],Bitmap['prototype'][_0x38072d(0x201)]=function(_0x4151b8,_0x47198a,_0x1a5626,_0x10c50d,_0x19dab6){const _0x175953=_0x38072d;VisuMZ[_0x175953(0x45d)]['Bitmap_fillRect'][_0x175953(0x967)](this,_0x4151b8,_0x47198a,_0x1a5626,_0x10c50d,_0x19dab6),this['markCoreEngineModified']();},VisuMZ['CoreEngine'][_0x38072d(0x64a)]=Bitmap[_0x38072d(0x182)]['strokeRect'],Bitmap[_0x38072d(0x182)][_0x38072d(0x50d)]=function(_0x1d7581,_0x380409,_0x508e3a,_0x3e0e55,_0x31c599){const _0x346048=_0x38072d;VisuMZ[_0x346048(0x45d)]['Bitmap_strokeRect']['call'](this,_0x1d7581,_0x380409,_0x508e3a,_0x3e0e55,_0x31c599),this['markCoreEngineModified']();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x735)]=Bitmap['prototype'][_0x38072d(0x37a)],Bitmap[_0x38072d(0x182)]['gradientFillRect']=function(_0x2333b9,_0x2b5616,_0x431520,_0x25623b,_0x26e30f,_0x490903,_0x4ffe1c){const _0x4b9e9b=_0x38072d;VisuMZ[_0x4b9e9b(0x45d)][_0x4b9e9b(0x735)]['call'](this,_0x2333b9,_0x2b5616,_0x431520,_0x25623b,_0x26e30f,_0x490903,_0x4ffe1c),this[_0x4b9e9b(0x1e6)]();},VisuMZ['CoreEngine'][_0x38072d(0x9fe)]=Bitmap[_0x38072d(0x182)][_0x38072d(0x795)],Bitmap['prototype'][_0x38072d(0x795)]=function(_0x5ea062,_0x1e36e8,_0x37fdc0,_0x820f70){const _0x4b8025=_0x38072d;_0x5ea062=Math[_0x4b8025(0x337)](_0x5ea062),_0x1e36e8=Math[_0x4b8025(0x337)](_0x1e36e8),_0x37fdc0=Math[_0x4b8025(0x337)](_0x37fdc0),VisuMZ[_0x4b8025(0x45d)][_0x4b8025(0x9fe)]['call'](this,_0x5ea062,_0x1e36e8,_0x37fdc0,_0x820f70),this[_0x4b8025(0x1e6)]();},VisuMZ['CoreEngine'][_0x38072d(0x1ed)]=Bitmap['prototype'][_0x38072d(0x3ba)],Bitmap[_0x38072d(0x182)][_0x38072d(0x3ba)]=function(_0x36ea21){const _0x3ec75c=_0x38072d;return Math[_0x3ec75c(0x421)](VisuMZ[_0x3ec75c(0x45d)]['Bitmap_measureTextWidth'][_0x3ec75c(0x967)](this,_0x36ea21));},VisuMZ['CoreEngine'][_0x38072d(0x904)]=Bitmap[_0x38072d(0x182)][_0x38072d(0x6a0)],Bitmap['prototype'][_0x38072d(0x6a0)]=function(_0xdf341f,_0x3a238e,_0x2621d8,_0x137913,_0x10cb43,_0x4a61b7){const _0xb917f7=_0x38072d;_0x3a238e=Math[_0xb917f7(0x337)](_0x3a238e),_0x2621d8=Math[_0xb917f7(0x337)](_0x2621d8),_0x137913=Math[_0xb917f7(0x337)](_0x137913),_0x10cb43=Math[_0xb917f7(0x337)](_0x10cb43),VisuMZ[_0xb917f7(0x45d)][_0xb917f7(0x904)][_0xb917f7(0x967)](this,_0xdf341f,_0x3a238e,_0x2621d8,_0x137913,_0x10cb43,_0x4a61b7),this[_0xb917f7(0x1e6)]();},VisuMZ[_0x38072d(0x45d)]['Bitmap_drawTextOutline']=Bitmap['prototype'][_0x38072d(0x664)],Bitmap['prototype'][_0x38072d(0x664)]=function(_0x562e1a,_0x895852,_0x27e363,_0x5d2138){const _0x1087bf=_0x38072d;VisuMZ['CoreEngine'][_0x1087bf(0x75d)][_0x1087bf(0x6a9)][_0x1087bf(0x2ff)]?this['_drawTextShadow'](_0x562e1a,_0x895852,_0x27e363,_0x5d2138):VisuMZ[_0x1087bf(0x45d)][_0x1087bf(0x2d0)][_0x1087bf(0x967)](this,_0x562e1a,_0x895852,_0x27e363,_0x5d2138);},Bitmap[_0x38072d(0x182)][_0x38072d(0x41f)]=function(_0x5a93cc,_0x253761,_0x254bb9,_0x1297d9){const _0x1e318b=_0x38072d,_0x13fb13=this[_0x1e318b(0x229)];_0x13fb13['fillStyle']=this[_0x1e318b(0x709)],_0x13fb13['fillText'](_0x5a93cc,_0x253761+0x2,_0x254bb9+0x2,_0x1297d9);},VisuMZ['CoreEngine'][_0x38072d(0x1a1)]=Input[_0x38072d(0x8bd)],Input[_0x38072d(0x8bd)]=function(){const _0x2f73ab=_0x38072d;VisuMZ[_0x2f73ab(0x45d)][_0x2f73ab(0x1a1)][_0x2f73ab(0x967)](this),this[_0x2f73ab(0x1ad)]=undefined,this[_0x2f73ab(0x103)]=undefined,this[_0x2f73ab(0x7a6)]=Input[_0x2f73ab(0x899)];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x962)]=Input[_0x38072d(0x444)],Input[_0x38072d(0x444)]=function(){const _0x107742=_0x38072d;VisuMZ[_0x107742(0x45d)][_0x107742(0x962)][_0x107742(0x967)](this);if(this[_0x107742(0x7a6)])this[_0x107742(0x7a6)]--;},VisuMZ[_0x38072d(0x45d)]['Input_pollGamepads']=Input[_0x38072d(0x7f1)],Input[_0x38072d(0x7f1)]=function(){const _0x19f487=_0x38072d;if(this[_0x19f487(0x7a6)])return;VisuMZ[_0x19f487(0x45d)][_0x19f487(0x974)][_0x19f487(0x967)](this);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x3ed)]=Input['_setupEventHandlers'],Input[_0x38072d(0x2cf)]=function(){const _0x5d962f=_0x38072d;VisuMZ['CoreEngine']['Input_setupEventHandlers'][_0x5d962f(0x967)](this),document[_0x5d962f(0x35e)]('keypress',this[_0x5d962f(0x9cc)][_0x5d962f(0x667)](this));},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x33e)]=Input['_onKeyDown'],Input[_0x38072d(0x36d)]=function(_0x1bce3c){const _0x34d38d=_0x38072d;this[_0x34d38d(0x103)]=_0x1bce3c[_0x34d38d(0x6b2)],VisuMZ[_0x34d38d(0x45d)][_0x34d38d(0x33e)][_0x34d38d(0x967)](this,_0x1bce3c),this[_0x34d38d(0x558)](null);},Input[_0x38072d(0x9cc)]=function(_0x1c3181){const _0x2ac7ce=_0x38072d;this[_0x2ac7ce(0x16c)](_0x1c3181);},Input[_0x38072d(0x16c)]=function(_0x16ef9d){const _0x1baac5=_0x38072d;this[_0x1baac5(0x103)]=_0x16ef9d[_0x1baac5(0x6b2)];let _0x6b4942=String[_0x1baac5(0x309)](_0x16ef9d[_0x1baac5(0x784)]);this[_0x1baac5(0x1ad)]===undefined?this[_0x1baac5(0x1ad)]=_0x6b4942:this[_0x1baac5(0x1ad)]+=_0x6b4942;},VisuMZ[_0x38072d(0x45d)]['Input_shouldPreventDefault']=Input[_0x38072d(0x8e7)],Input[_0x38072d(0x8e7)]=function(_0x444e88){const _0x545de1=_0x38072d;if(_0x444e88===0x8)return![];return VisuMZ[_0x545de1(0x45d)][_0x545de1(0x9b4)][_0x545de1(0x967)](this,_0x444e88);},Input['isSpecialCode']=function(_0x2f73db){const _0x3e4d6f=_0x38072d;if(_0x2f73db[_0x3e4d6f(0x322)](/backspace/i))return this[_0x3e4d6f(0x103)]===0x8;if(_0x2f73db['match'](/enter/i))return this[_0x3e4d6f(0x103)]===0xd;if(_0x2f73db['match'](/escape/i))return this[_0x3e4d6f(0x103)]===0x1b;},Input['isNumpadPressed']=function(){const _0x50ff91=_0x38072d;return[0x30,0x31,0x32,0x33,0x34,0x35,0x36,0x37,0x38,0x39]['contains'](this[_0x50ff91(0x103)]);},Input['isArrowPressed']=function(){const _0x157bdb=_0x38072d;return[0x25,0x26,0x27,0x28][_0x157bdb(0x283)](this['_inputSpecialKeyCode']);},Input[_0x38072d(0x46e)]=function(){const _0x16df64=_0x38072d;if(navigator[_0x16df64(0x4b9)]){if(_0x16df64(0x743)!=='zDqIh')_0xd0893e[_0x16df64(0x45d)][_0x16df64(0x937)][_0x16df64(0x967)](this),_0x4cb4f7[_0x16df64(0x732)]()&&this[_0x16df64(0x81c)]();else{const _0x50dede=navigator[_0x16df64(0x4b9)]();if(_0x50dede)for(const _0x82273f of _0x50dede){if(_0x82273f&&_0x82273f['connected'])return!![];}}}return![];},Input[_0x38072d(0x4b2)]=function(){const _0x3a2384=_0x38072d;if(navigator[_0x3a2384(0x4b9)]){const _0x31d5c0=navigator[_0x3a2384(0x4b9)]();if(_0x31d5c0)for(const _0x56d5aa of _0x31d5c0){if(_0x56d5aa&&_0x56d5aa[_0x3a2384(0x6c6)]){if('wDgys'===_0x3a2384(0x9ee))_0x38de6e[_0x3a2384(0x45d)]['Window_NameInput_processTouch'][_0x3a2384(0x967)](this);else{if(this[_0x3a2384(0x504)](_0x56d5aa))return!![];if(this[_0x3a2384(0x241)](_0x56d5aa))return!![];}}}}return![];},Input[_0x38072d(0x504)]=function(_0x109323){const _0x13d35d=_0x38072d,_0xaafd8=_0x109323[_0x13d35d(0x2e0)];for(let _0x523b59=0x0;_0x523b59<_0xaafd8[_0x13d35d(0x3ec)];_0x523b59++){if(_0x13d35d(0x9be)===_0x13d35d(0x9be)){if(_0xaafd8[_0x523b59]['pressed'])return!![];}else return this[_0x13d35d(0x3de)](_0x24326d);}return![];},Input[_0x38072d(0x241)]=function(_0x4f35f7){const _0xa24b79=_0x38072d,_0x6f2e3c=_0x4f35f7[_0xa24b79(0x3c2)],_0x49e6b1=0.5;if(_0x6f2e3c[0x0]<-_0x49e6b1)return!![];if(_0x6f2e3c[0x0]>_0x49e6b1)return!![];if(_0x6f2e3c[0x1]<-_0x49e6b1)return!![];if(_0x6f2e3c[0x1]>_0x49e6b1)return!![];return![];},Input['getLastGamepadUsed']=function(){return this['_lastGamepad']||null;},Input[_0x38072d(0x558)]=function(_0x52d170){const _0x58a0a7=_0x38072d;this[_0x58a0a7(0x195)]=_0x52d170;},VisuMZ[_0x38072d(0x45d)]['Input_updateGamepadState']=Input[_0x38072d(0x4dc)],Input['_updateGamepadState']=function(_0xf50c13){const _0x969f55=_0x38072d;VisuMZ[_0x969f55(0x45d)][_0x969f55(0x5cd)][_0x969f55(0x967)](this,_0xf50c13);if(this[_0x969f55(0x504)](_0xf50c13)||this[_0x969f55(0x241)](_0xf50c13)){if(_0x969f55(0x98e)===_0x969f55(0x98e))this[_0x969f55(0x558)](_0xf50c13);else{if(this[_0x969f55(0x243)][this[_0x969f55(0x243)][_0x969f55(0x3ec)]-0x1]===_0x5364b0)return;this[_0x969f55(0x243)][_0x969f55(0x534)](_0x38dad1),_0x24c68e[_0x969f55(0x576)]['addChild'](this);}}},Input['getLastUsedGamepadType']=function(){const _0x190f5c=_0x38072d;return this[_0x190f5c(0x195)]?this['_lastGamepad']['id']:'Keyboard';},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x49f)]=Tilemap[_0x38072d(0x182)][_0x38072d(0x865)],Tilemap[_0x38072d(0x182)][_0x38072d(0x865)]=function(_0x4114fc,_0x5a229c,_0x1a68ee,_0x406f18){const _0x131ee8=_0x38072d;if($gameMap&&$gameMap[_0x131ee8(0x696)]())return;VisuMZ[_0x131ee8(0x45d)][_0x131ee8(0x49f)][_0x131ee8(0x967)](this,_0x4114fc,_0x5a229c,_0x1a68ee,_0x406f18);},Tilemap[_0x38072d(0x235)][_0x38072d(0x182)]['_createInternalTextures']=function(){const _0x3282ec=_0x38072d;this['_destroyInternalTextures']();for(let _0x253740=0x0;_0x253740<Tilemap[_0x3282ec(0x159)][_0x3282ec(0x3f9)];_0x253740++){const _0x44ab1c=new PIXI[(_0x3282ec(0x1d4))]();_0x44ab1c[_0x3282ec(0x913)](0x800,0x800);if(VisuMZ['CoreEngine'][_0x3282ec(0x75d)][_0x3282ec(0x6a9)]['PixelateImageRendering']){if('SzxMO'!==_0x3282ec(0x408))return _0x58785b;else _0x44ab1c['scaleMode']=PIXI[_0x3282ec(0x2bc)][_0x3282ec(0x44e)];}this[_0x3282ec(0x8fd)][_0x3282ec(0x534)](_0x44ab1c);}},WindowLayer[_0x38072d(0x182)]['isMaskingEnabled']=function(){const _0x405fcd=_0x38072d;if(SceneManager&&SceneManager[_0x405fcd(0x576)]){if(_0x405fcd(0x15c)!=='leltG')return SceneManager[_0x405fcd(0x576)][_0x405fcd(0x7bf)]();else{const _0x306a04=this[_0x405fcd(0x8f0)]();!_0x306a04[_0x405fcd(0x731)]()?_0x104255[_0x405fcd(0x45d)][_0x405fcd(0x6ff)]['call'](this):(this[_0x405fcd(0x731)]['x']=_0x306a04['anchor']()['x'],this[_0x405fcd(0x731)]['y']=_0x306a04[_0x405fcd(0x731)]()['y']);}}else return!![];},VisuMZ[_0x38072d(0x45d)]['WindowLayer_render']=WindowLayer['prototype'][_0x38072d(0x29a)],WindowLayer['prototype'][_0x38072d(0x29a)]=function render(_0x206130){const _0x38aba4=_0x38072d;this[_0x38aba4(0x9e3)]()?VisuMZ[_0x38aba4(0x45d)]['WindowLayer_render'][_0x38aba4(0x967)](this,_0x206130):this[_0x38aba4(0x440)](_0x206130);},WindowLayer[_0x38072d(0x182)][_0x38072d(0x440)]=function render(_0x547083){const _0x347076=_0x38072d;if(!this[_0x347076(0x5de)])return;const _0x3d45c=new PIXI[(_0x347076(0x3fb))](),_0x2f70bb=_0x547083['gl'],_0x5ebc5d=this[_0x347076(0x4e3)][_0x347076(0x49e)]();_0x547083['framebuffer'][_0x347076(0x5c0)](),_0x3d45c['transform']=this[_0x347076(0x4ce)],_0x547083[_0x347076(0x59f)][_0x347076(0x214)](),_0x2f70bb[_0x347076(0x910)](_0x2f70bb[_0x347076(0x233)]);while(_0x5ebc5d[_0x347076(0x3ec)]>0x0){if(_0x347076(0x90a)==='SUZhE')return 0x0;else{const _0x81a773=_0x5ebc5d['shift']();if(_0x81a773[_0x347076(0x305)]&&_0x81a773[_0x347076(0x5de)]&&_0x81a773[_0x347076(0x461)]>0x0){if(_0x347076(0x61d)===_0x347076(0x2e4))return _0x30fcb2['CoreEngine'][_0x347076(0x75d)][_0x347076(0x651)][_0x347076(0x438)][_0x347076(0x3ec)];else _0x2f70bb[_0x347076(0x8f3)](_0x2f70bb[_0x347076(0x29d)],0x0,~0x0),_0x2f70bb['stencilOp'](_0x2f70bb[_0x347076(0x273)],_0x2f70bb[_0x347076(0x273)],_0x2f70bb[_0x347076(0x273)]),_0x81a773['render'](_0x547083),_0x547083[_0x347076(0x59f)][_0x347076(0x214)](),_0x3d45c[_0x347076(0x8bd)](),_0x2f70bb[_0x347076(0x8f3)](_0x2f70bb[_0x347076(0x401)],0x1,~0x0),_0x2f70bb[_0x347076(0x2aa)](_0x2f70bb['REPLACE'],_0x2f70bb[_0x347076(0x20e)],_0x2f70bb['REPLACE']),_0x2f70bb[_0x347076(0x700)](_0x2f70bb['ZERO'],_0x2f70bb['ONE']),_0x3d45c['render'](_0x547083),_0x547083[_0x347076(0x59f)][_0x347076(0x214)](),_0x2f70bb[_0x347076(0x700)](_0x2f70bb[_0x347076(0x9bb)],_0x2f70bb[_0x347076(0x231)]);}}}_0x2f70bb[_0x347076(0x1f5)](_0x2f70bb[_0x347076(0x233)]),_0x2f70bb['clear'](_0x2f70bb[_0x347076(0x826)]),_0x2f70bb[_0x347076(0x3cf)](0x0),_0x547083[_0x347076(0x59f)]['flush']();for(const _0x5837ed of this[_0x347076(0x4e3)]){'dZVio'==='dZVio'?!_0x5837ed[_0x347076(0x305)]&&_0x5837ed[_0x347076(0x5de)]&&_0x5837ed[_0x347076(0x29a)](_0x547083):(_0x35a262[_0x347076(0x45d)][_0x347076(0x8b0)][_0x347076(0x967)](this,_0x1323e0),this['checkCoreEngineDisplayCenter'](),this[_0x347076(0x859)](_0x4bbbe9));}_0x547083['batch'][_0x347076(0x214)]();},DataManager[_0x38072d(0x768)]=function(_0x3c4f89){const _0x241fb1=_0x38072d;return this[_0x241fb1(0x6a7)](_0x3c4f89)&&_0x3c4f89[_0x241fb1(0x2f9)]===0x2;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x8ed)]=DataManager[_0x38072d(0x111)],DataManager[_0x38072d(0x111)]=function(){const _0xb3644b=_0x38072d;VisuMZ[_0xb3644b(0x45d)][_0xb3644b(0x8ed)]['call'](this),this[_0xb3644b(0x25b)](),this[_0xb3644b(0x39c)]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){const _0x5db663=_0x38072d;if($gameTemp['isPlaytest']()){if(_0x5db663(0x613)!==_0x5db663(0x9d7)){const _0x256881=VisuMZ['CoreEngine'][_0x5db663(0x75d)][_0x5db663(0x6a9)][_0x5db663(0x7fc)];if(_0x256881>0x0)$gameTemp['reserveCommonEvent'](_0x256881);}else{if(this['_CoreEngineSettings']===_0x4877ef)this[_0x5db663(0x3cc)]();if(this[_0x5db663(0x5fa)][_0x5db663(0x840)]===_0x5bab14)this['initCoreEngine']();return this[_0x5db663(0x5fa)][_0x5db663(0x840)];}}},DataManager[_0x38072d(0x39c)]=function(){const _0x46e946=_0x38072d,_0x232bad=VisuMZ['CoreEngine'][_0x46e946(0x75d)][_0x46e946(0x6a9)][_0x46e946(0x74a)]||0x0;if(_0x232bad>0x0)$gameTemp[_0x46e946(0x2ca)](_0x232bad);},DataManager[_0x38072d(0x6bc)]=function(_0x1e30e5){const _0x590f80=_0x38072d,_0x2f5dfd=$dataTroops[_0x1e30e5];if(!_0x2f5dfd)return'';let _0x5a1236='';_0x5a1236+=_0x2f5dfd['name'];for(const _0x2ade65 of _0x2f5dfd[_0x590f80(0x811)]){for(const _0x24412f of _0x2ade65['list']){if([0x6c,0x198][_0x590f80(0x2ac)](_0x24412f[_0x590f80(0x8f4)])){if(_0x590f80(0x2e9)!==_0x590f80(0x272))_0x5a1236+='\x0a',_0x5a1236+=_0x24412f[_0x590f80(0x17e)][0x0];else{if(_0x309213 instanceof _0x15f5e7)this[_0x590f80(0x972)](_0x3d50b2);else _0x400489 instanceof _0xc0aa8f&&_0x4eb2c1[0x0]==='LoadError'?this[_0x590f80(0x6da)](_0x3b41a0):this[_0x590f80(0x33c)](_0x1c0eb5);this[_0x590f80(0x6b1)]();}}}}return _0x5a1236;};(VisuMZ[_0x38072d(0x45d)]['Settings']['QoL'][_0x38072d(0xfc)]??!![])&&($scene=null,VisuMZ['CoreEngine']['Scene_Base_create']=Scene_Base[_0x38072d(0x182)][_0x38072d(0x3ac)],Scene_Base[_0x38072d(0x182)][_0x38072d(0x3ac)]=function(){const _0x9a3e56=_0x38072d;VisuMZ[_0x9a3e56(0x45d)]['Scene_Base_create']['call'](this),$scene=this;},$spriteset=null,VisuMZ[_0x38072d(0x45d)]['Scene_Map_createSpriteset']=Scene_Map[_0x38072d(0x182)][_0x38072d(0x126)],Scene_Map[_0x38072d(0x182)][_0x38072d(0x126)]=function(){const _0x434a75=_0x38072d;VisuMZ[_0x434a75(0x45d)][_0x434a75(0x14c)][_0x434a75(0x967)](this),$spriteset=this['_spriteset'];},VisuMZ['CoreEngine'][_0x38072d(0x227)]=Scene_Battle[_0x38072d(0x182)][_0x38072d(0x126)],Scene_Battle[_0x38072d(0x182)]['createSpriteset']=function(){const _0x4cfc91=_0x38072d;VisuMZ[_0x4cfc91(0x45d)][_0x4cfc91(0x227)][_0x4cfc91(0x967)](this),$spriteset=this[_0x4cfc91(0x6ba)];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x561)]=Scene_Base['prototype'][_0x38072d(0x9e4)],Scene_Base[_0x38072d(0x182)][_0x38072d(0x9e4)]=function(){const _0x9a01ec=_0x38072d;VisuMZ['CoreEngine']['Scene_Base_terminate'][_0x9a01ec(0x967)](this),$spriteset=null,$subject=null,$targets=null,$target=null;},$subject=null,$targets=null,$target=null,VisuMZ[_0x38072d(0x45d)][_0x38072d(0x108)]=BattleManager['update'],BattleManager['update']=function(_0x54a797){const _0x5d2ce9=_0x38072d;VisuMZ[_0x5d2ce9(0x45d)][_0x5d2ce9(0x108)]['call'](this,_0x54a797),$subject=this[_0x5d2ce9(0x71a)],$targets=this['_targets'],$target=this[_0x5d2ce9(0x48b)]||this['_targets'][0x0];},$event=null,VisuMZ['CoreEngine']['Game_Event_start']=Game_Event[_0x38072d(0x182)][_0x38072d(0x224)],Game_Event['prototype'][_0x38072d(0x224)]=function(){const _0x49f405=_0x38072d;VisuMZ[_0x49f405(0x45d)][_0x49f405(0x695)][_0x49f405(0x967)](this),$event=this;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x9e5)]=Scene_Map[_0x38072d(0x182)][_0x38072d(0x444)],Scene_Map[_0x38072d(0x182)]['update']=function(){const _0xaae701=_0x38072d;VisuMZ[_0xaae701(0x45d)][_0xaae701(0x9e5)][_0xaae701(0x967)](this),$gameMap['updateCurrentEvent']();},Game_Map[_0x38072d(0x182)]['updateCurrentEvent']=function(){const _0x309ecb=_0x38072d;!this[_0x309ecb(0x791)]()&&$event!==null&&($event=null);},$commonEvent=function(_0x38e925){const _0x2067d3=_0x38072d;if($gameTemp)$gameTemp[_0x2067d3(0x2ca)](_0x38e925);},$onceParallel=function(_0x4cac5f){const _0x845172=_0x38072d;if(SceneManager[_0x845172(0x61b)]())$scene[_0x845172(0x581)](_0x4cac5f);else{if(SceneManager[_0x845172(0x89e)]()){if(_0x845172(0x898)==='rHJge'){_0x1213ff[_0x845172(0x45d)][_0x845172(0x892)]['call'](this);if(_0x54e9d3[_0x845172(0x589)])this[_0x845172(0x188)]();}else{if(Imported['VisuMZ_1_BattleCore'])$scene[_0x845172(0x581)](_0x4cac5f);else{if($gameTemp&&$gameTemp[_0x845172(0x267)]()){if(_0x845172(0x81b)!==_0x845172(0x4c0))alert(_0x845172(0x5e6));else return _0x34aaee[_0x845172(0x45d)]['Game_Action_itemHit'][_0x845172(0x967)](this,_0x4fe380);}}}}else $gameTemp&&$gameTemp[_0x845172(0x267)]()&&alert(_0x845172(0x29c));}});;StorageManager[_0x38072d(0x1ef)]=function(_0x239d96){return new Promise((_0x49724e,_0x3262af)=>{const _0x3778ac=_0x4a28;if('WJLxZ'!==_0x3778ac(0x8cd)){if(this[_0x3778ac(0x1cf)]<=0x0)return;const _0x40dcdb=this['_movementDuration'],_0x4e9bcf=this['_movementWholeDuration'],_0x32d61c=this[_0x3778ac(0x917)];this[_0x3778ac(0x41c)]=this[_0x3778ac(0x78e)](this[_0x3778ac(0x41c)],this[_0x3778ac(0x11a)],_0x40dcdb,_0x4e9bcf,_0x32d61c),this[_0x3778ac(0x814)]=this[_0x3778ac(0x78e)](this[_0x3778ac(0x814)],this[_0x3778ac(0x642)],_0x40dcdb,_0x4e9bcf,_0x32d61c),this['_movementDuration']--;if(this['_movementDuration']<=0x0)this[_0x3778ac(0x902)]();}else try{const _0x1bb69b=pako[_0x3778ac(0x119)](_0x239d96,{'to':_0x3778ac(0x91e),'level':0x1});if(_0x1bb69b[_0x3778ac(0x3ec)]>=0xc350){}_0x49724e(_0x1bb69b);}catch(_0x31f595){_0x3262af(_0x31f595);}});},TextManager['stringKeyMap']=['','','',_0x38072d(0x6cf),'','',_0x38072d(0x9e8),'',_0x38072d(0x3d8),_0x38072d(0x7cc),'','',_0x38072d(0x780),_0x38072d(0x327),'ENTER_SPECIAL','',_0x38072d(0xef),_0x38072d(0x7da),'ALT',_0x38072d(0x1a5),_0x38072d(0x43c),'KANA',_0x38072d(0x73c),'JUNJA',_0x38072d(0x7e3),_0x38072d(0x73f),'',_0x38072d(0x536),'CONVERT','NONCONVERT','ACCEPT',_0x38072d(0x396),'SPACE',_0x38072d(0x262),_0x38072d(0x698),_0x38072d(0x1bc),_0x38072d(0x31b),_0x38072d(0x9f3),'UP',_0x38072d(0x99b),_0x38072d(0x41e),_0x38072d(0x42a),_0x38072d(0x185),_0x38072d(0x313),'PRINTSCREEN','INSERT',_0x38072d(0x14e),'','0','1','2','3','4','5','6','7','8','9','COLON',_0x38072d(0x861),_0x38072d(0x816),'EQUALS','GREATER_THAN',_0x38072d(0x226),'AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',_0x38072d(0xf7),'',_0x38072d(0x661),'','SLEEP','NUMPAD0',_0x38072d(0x2bf),_0x38072d(0x992),_0x38072d(0x785),_0x38072d(0x376),_0x38072d(0x2a6),'NUMPAD6','NUMPAD7',_0x38072d(0x3f0),_0x38072d(0x939),'MULTIPLY',_0x38072d(0x6e5),_0x38072d(0x9e7),_0x38072d(0x3c6),_0x38072d(0x55c),'DIVIDE','F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x38072d(0x953),_0x38072d(0x54c),_0x38072d(0x8f5),_0x38072d(0x96e),_0x38072d(0x467),_0x38072d(0x666),'F17',_0x38072d(0x58e),'F19',_0x38072d(0x803),_0x38072d(0x9b5),_0x38072d(0x33a),_0x38072d(0x284),_0x38072d(0x293),'','','','','','','','',_0x38072d(0x15d),'SCROLL_LOCK',_0x38072d(0x5dd),'WIN_OEM_FJ_MASSHOU','WIN_OEM_FJ_TOUROKU','WIN_OEM_FJ_LOYA','WIN_OEM_FJ_ROYA','','','','','','','','','',_0x38072d(0x91a),_0x38072d(0x350),_0x38072d(0x14f),'HASH',_0x38072d(0x511),_0x38072d(0x728),'AMPERSAND',_0x38072d(0x650),'OPEN_PAREN',_0x38072d(0x18f),'ASTERISK',_0x38072d(0x3ff),_0x38072d(0x141),_0x38072d(0x724),_0x38072d(0xec),_0x38072d(0x8da),_0x38072d(0x712),'','','','','VOLUME_MUTE',_0x38072d(0x810),_0x38072d(0x36f),'','','SEMICOLON',_0x38072d(0x1d2),'COMMA',_0x38072d(0x82c),'PERIOD',_0x38072d(0x56f),'BACK_QUOTE','','','','','','','','','','','','','','','','','','','','','','','','','','',_0x38072d(0x852),_0x38072d(0x48e),_0x38072d(0x533),_0x38072d(0x845),'',_0x38072d(0x34e),_0x38072d(0x540),'',_0x38072d(0x14a),_0x38072d(0x9ea),'','WIN_ICO_CLEAR','','','WIN_OEM_RESET','WIN_OEM_JUMP',_0x38072d(0x1d3),'WIN_OEM_PA2','WIN_OEM_PA3',_0x38072d(0x4fc),_0x38072d(0x340),_0x38072d(0x29e),_0x38072d(0x956),_0x38072d(0x908),_0x38072d(0x788),'WIN_OEM_ENLW',_0x38072d(0x12b),_0x38072d(0x274),'CRSEL',_0x38072d(0x4b8),'EREOF','PLAY','ZOOM','',_0x38072d(0x911),_0x38072d(0x246),''],TextManager[_0x38072d(0x755)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x6b6)]['OkText'],TextManager[_0x38072d(0x1a3)]=VisuMZ['CoreEngine']['Settings'][_0x38072d(0x6b6)][_0x38072d(0x3e0)],TextManager[_0x38072d(0x87a)]=VisuMZ['CoreEngine'][_0x38072d(0x75d)][_0x38072d(0x6b6)][_0x38072d(0x849)],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x674)]=TextManager['param'],TextManager['param']=function(_0x34bf71){const _0x46b761=_0x38072d;return typeof _0x34bf71===_0x46b761(0x496)?VisuMZ[_0x46b761(0x45d)][_0x46b761(0x674)]['call'](this,_0x34bf71):'egwAP'!==_0x46b761(0x1dc)?_0x383feb['layoutSettings'][_0x46b761(0x2f1)][_0x46b761(0x967)](this):this[_0x46b761(0x871)](_0x34bf71);},TextManager[_0x38072d(0x871)]=function(_0x53bcfe){const _0x1316f5=_0x38072d;_0x53bcfe=String(_0x53bcfe||'')[_0x1316f5(0x994)]();const _0x250ea7=VisuMZ[_0x1316f5(0x45d)][_0x1316f5(0x75d)]['Param'];if(_0x53bcfe===_0x1316f5(0x84a))return $dataSystem[_0x1316f5(0x41d)][_0x1316f5(0x7de)][0x0];if(_0x53bcfe===_0x1316f5(0x847))return $dataSystem[_0x1316f5(0x41d)][_0x1316f5(0x7de)][0x1];if(_0x53bcfe==='ATK')return $dataSystem[_0x1316f5(0x41d)][_0x1316f5(0x7de)][0x2];if(_0x53bcfe===_0x1316f5(0x3a3))return $dataSystem[_0x1316f5(0x41d)]['params'][0x3];if(_0x53bcfe===_0x1316f5(0x252))return $dataSystem[_0x1316f5(0x41d)][_0x1316f5(0x7de)][0x4];if(_0x53bcfe==='MDF')return $dataSystem[_0x1316f5(0x41d)][_0x1316f5(0x7de)][0x5];if(_0x53bcfe===_0x1316f5(0x670))return $dataSystem['terms'][_0x1316f5(0x7de)][0x6];if(_0x53bcfe===_0x1316f5(0x307))return $dataSystem[_0x1316f5(0x41d)][_0x1316f5(0x7de)][0x7];if(_0x53bcfe==='HIT')return _0x250ea7[_0x1316f5(0x491)];if(_0x53bcfe===_0x1316f5(0x44f))return _0x250ea7[_0x1316f5(0xf9)];if(_0x53bcfe==='CRI')return _0x250ea7['XParamVocab2'];if(_0x53bcfe===_0x1316f5(0x23e))return _0x250ea7[_0x1316f5(0x4fe)];if(_0x53bcfe==='MEV')return _0x250ea7['XParamVocab4'];if(_0x53bcfe==='MRF')return _0x250ea7[_0x1316f5(0x271)];if(_0x53bcfe===_0x1316f5(0x72c))return _0x250ea7[_0x1316f5(0x35f)];if(_0x53bcfe===_0x1316f5(0x5b7))return _0x250ea7[_0x1316f5(0x2de)];if(_0x53bcfe===_0x1316f5(0x52f))return _0x250ea7[_0x1316f5(0x281)];if(_0x53bcfe===_0x1316f5(0x4cd))return _0x250ea7[_0x1316f5(0x4ee)];if(_0x53bcfe==='TGR')return _0x250ea7[_0x1316f5(0x93b)];if(_0x53bcfe===_0x1316f5(0x5ed))return _0x250ea7[_0x1316f5(0x302)];if(_0x53bcfe==='REC')return _0x250ea7[_0x1316f5(0x417)];if(_0x53bcfe===_0x1316f5(0x64c))return _0x250ea7[_0x1316f5(0x147)];if(_0x53bcfe===_0x1316f5(0x20c))return _0x250ea7[_0x1316f5(0x342)];if(_0x53bcfe===_0x1316f5(0x8bf))return _0x250ea7[_0x1316f5(0x75a)];if(_0x53bcfe==='PDR')return _0x250ea7[_0x1316f5(0x68b)];if(_0x53bcfe===_0x1316f5(0x25f))return _0x250ea7[_0x1316f5(0x737)];if(_0x53bcfe===_0x1316f5(0x436))return _0x250ea7['SParamVocab8'];if(_0x53bcfe===_0x1316f5(0x526))return _0x250ea7[_0x1316f5(0x7b5)];if(VisuMZ[_0x1316f5(0x45d)][_0x1316f5(0x88c)][_0x53bcfe])return VisuMZ[_0x1316f5(0x45d)][_0x1316f5(0x88c)][_0x53bcfe];return'';},TextManager[_0x38072d(0x63e)]=function(_0x5404df){const _0x546912=_0x38072d,_0x505334=Input[_0x546912(0x5b8)]();if(_0x505334===_0x546912(0x805))return this[_0x546912(0x3de)](_0x5404df);else{if(_0x546912(0x58f)===_0x546912(0x58f))return this[_0x546912(0x4a6)](_0x505334,_0x5404df);else _0x28611e=_0x1cf7bd[_0x546912(0x285)](_0x16243b,_0x404120(_0x2d644b(_0x3ab86c)));}},TextManager['getKeyboardInputButtonString']=function(_0x1f698a){const _0x3a6bc2=_0x38072d,_0x209392=VisuMZ['CoreEngine'][_0x3a6bc2(0x75d)][_0x3a6bc2(0x6b6)][_0x3a6bc2(0x249)];if(!_0x209392){if(_0x1f698a===_0x3a6bc2(0x15e))_0x1f698a=_0x3a6bc2(0x64b);if(_0x1f698a===_0x3a6bc2(0x675))_0x1f698a=_0x3a6bc2(0x64b);}let _0x38e165=[];for(let _0x26ff2c in Input[_0x3a6bc2(0x12f)]){if(_0x3a6bc2(0x187)!==_0x3a6bc2(0x187)){try{_0x2ecb6c['CoreEngine'][_0x3a6bc2(0x5d9)][_0x3a6bc2(0x967)](this,_0x31b3c0);}catch(_0x3bdd0a){_0x1d6a09[_0x3a6bc2(0x267)]()&&(_0x299926[_0x3a6bc2(0x220)]('Control\x20Variables\x20Script\x20Error'),_0x57f091[_0x3a6bc2(0x220)](_0x3bdd0a));}return!![];}else{_0x26ff2c=Number(_0x26ff2c);if(_0x26ff2c>=0x60&&_0x26ff2c<=0x69)continue;if([0x12,0x20][_0x3a6bc2(0x2ac)](_0x26ff2c))continue;_0x1f698a===Input[_0x3a6bc2(0x12f)][_0x26ff2c]&&_0x38e165[_0x3a6bc2(0x534)](_0x26ff2c);}}for(let _0x424b8e=0x0;_0x424b8e<_0x38e165[_0x3a6bc2(0x3ec)];_0x424b8e++){_0x3a6bc2(0x484)===_0x3a6bc2(0x484)?_0x38e165[_0x424b8e]=TextManager[_0x3a6bc2(0x985)][_0x38e165[_0x424b8e]]:_0x2f68f9+=_0x5dcd89;}return this[_0x3a6bc2(0x5fe)](_0x38e165);},TextManager[_0x38072d(0x5fe)]=function(_0x39b171){const _0x5449cd=_0x38072d,_0x4a7e1b=VisuMZ[_0x5449cd(0x45d)][_0x5449cd(0x75d)][_0x5449cd(0x6b6)],_0x31de69=_0x4a7e1b['KeyUnlisted'],_0x4a3307=_0x39b171[_0x5449cd(0x384)](),_0x5122b7=_0x5449cd(0x4eb)['format'](_0x4a3307);return _0x4a7e1b[_0x5122b7]?_0x4a7e1b[_0x5122b7]:_0x31de69[_0x5449cd(0x941)](_0x4a3307);},TextManager[_0x38072d(0x7ba)]=function(_0x2489be,_0x18bc91){const _0x17e3f2=_0x38072d,_0x11d1b4=VisuMZ[_0x17e3f2(0x45d)][_0x17e3f2(0x75d)][_0x17e3f2(0x6b6)],_0x5362a4=_0x11d1b4[_0x17e3f2(0x4cc)],_0x241e8d=this[_0x17e3f2(0x63e)](_0x2489be),_0x58b918=this[_0x17e3f2(0x63e)](_0x18bc91);return _0x5362a4[_0x17e3f2(0x941)](_0x241e8d,_0x58b918);},TextManager[_0x38072d(0x4a6)]=function(_0x2ab530,_0x2d93ba){const _0x285848=_0x38072d,_0x1e3616=_0x2ab530['toLowerCase']()[_0x285848(0x5bd)](),_0x548ceb=VisuMZ['CoreEngine'][_0x285848(0x56d)][_0x1e3616];if(!_0x548ceb)return this[_0x285848(0x951)](_0x2ab530,_0x2d93ba);return _0x548ceb[_0x2d93ba]||this['getKeyboardInputButtonString'](_0x2ab530,_0x2d93ba);},TextManager['getControllerInputButtonMatch']=function(_0x8b0eab,_0x3d06a7){const _0x282488=_0x38072d,_0x40684e=_0x8b0eab[_0x282488(0x27c)]()[_0x282488(0x5bd)]();for(const _0x92f2c9 in VisuMZ[_0x282488(0x45d)][_0x282488(0x7ac)]){if(_0x40684e[_0x282488(0x2ac)](_0x92f2c9)){const _0x337680=VisuMZ[_0x282488(0x45d)][_0x282488(0x7ac)][_0x92f2c9],_0x4e73c1=VisuMZ[_0x282488(0x45d)][_0x282488(0x56d)][_0x337680];return _0x4e73c1[_0x3d06a7]||this[_0x282488(0x3de)](_0x3d06a7);}}return this['getKeyboardInputButtonString'](_0x3d06a7);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x347)]=ColorManager['loadWindowskin'],ColorManager['loadWindowskin']=function(){const _0x106624=_0x38072d;VisuMZ[_0x106624(0x45d)][_0x106624(0x347)]['call'](this),this['_colorCache']=this[_0x106624(0x66d)]||{};},ColorManager[_0x38072d(0x414)]=function(_0x10cb55,_0x5872c0){const _0x431161=_0x38072d;_0x5872c0=String(_0x5872c0),this[_0x431161(0x66d)]=this[_0x431161(0x66d)]||{};if(_0x5872c0[_0x431161(0x322)](/#(.*)/i))this['_colorCache'][_0x10cb55]=_0x431161(0x82f)['format'](String(RegExp['$1']));else{if(_0x431161(0x44a)!==_0x431161(0x8cb))this[_0x431161(0x66d)][_0x10cb55]=this['textColor'](Number(_0x5872c0));else{if(!this[_0x431161(0x1c0)]())return;const _0x5bd325=this['buttonAssistWindowRect']();this[_0x431161(0x808)]=new _0x28f7f6(_0x5bd325),this[_0x431161(0x14d)](this[_0x431161(0x808)]);}}return this[_0x431161(0x66d)][_0x10cb55];},ColorManager[_0x38072d(0x563)]=function(_0x18920e){const _0x3e9433=_0x38072d;return _0x18920e=String(_0x18920e),_0x18920e['match'](/#(.*)/i)?_0x3e9433(0x82f)['format'](String(RegExp['$1'])):this[_0x3e9433(0x682)](Number(_0x18920e));},ColorManager[_0x38072d(0x3b7)]=function(){const _0x20b285=_0x38072d;this[_0x20b285(0x66d)]={};},ColorManager['normalColor']=function(){const _0x363511=_0x38072d,_0x46b616=_0x363511(0x5b5);this[_0x363511(0x66d)]=this['_colorCache']||{};if(this[_0x363511(0x66d)][_0x46b616])return this['_colorCache'][_0x46b616];const _0x4b38eb=VisuMZ[_0x363511(0x45d)][_0x363511(0x75d)][_0x363511(0x190)][_0x363511(0x9de)];return this[_0x363511(0x414)](_0x46b616,_0x4b38eb);},ColorManager[_0x38072d(0x668)]=function(){const _0x53e6fb=_0x38072d,_0x46a1e7='_stored_systemColor';this['_colorCache']=this['_colorCache']||{};if(this[_0x53e6fb(0x66d)][_0x46a1e7])return this['_colorCache'][_0x46a1e7];const _0x5f197c=VisuMZ[_0x53e6fb(0x45d)][_0x53e6fb(0x75d)][_0x53e6fb(0x190)]['ColorSystem'];return this['getColorDataFromPluginParameters'](_0x46a1e7,_0x5f197c);},ColorManager[_0x38072d(0x3b9)]=function(){const _0x1a857c=_0x38072d,_0x58149e='_stored_crisisColor';this[_0x1a857c(0x66d)]=this[_0x1a857c(0x66d)]||{};if(this[_0x1a857c(0x66d)][_0x58149e])return this['_colorCache'][_0x58149e];const _0x51f5a5=VisuMZ['CoreEngine'][_0x1a857c(0x75d)][_0x1a857c(0x190)]['ColorCrisis'];return this['getColorDataFromPluginParameters'](_0x58149e,_0x51f5a5);},ColorManager[_0x38072d(0x31c)]=function(){const _0x199eea=_0x38072d,_0x5316ef=_0x199eea(0x265);this['_colorCache']=this[_0x199eea(0x66d)]||{};if(this[_0x199eea(0x66d)][_0x5316ef])return this[_0x199eea(0x66d)][_0x5316ef];const _0x4c46ae=VisuMZ[_0x199eea(0x45d)][_0x199eea(0x75d)][_0x199eea(0x190)][_0x199eea(0x62a)];return this[_0x199eea(0x414)](_0x5316ef,_0x4c46ae);},ColorManager[_0x38072d(0xf0)]=function(){const _0x46b62a=_0x38072d,_0x375e82=_0x46b62a(0x391);this[_0x46b62a(0x66d)]=this[_0x46b62a(0x66d)]||{};if(this[_0x46b62a(0x66d)][_0x375e82])return this[_0x46b62a(0x66d)][_0x375e82];const _0x12ec35=VisuMZ[_0x46b62a(0x45d)][_0x46b62a(0x75d)][_0x46b62a(0x190)]['ColorGaugeBack'];return this[_0x46b62a(0x414)](_0x375e82,_0x12ec35);},ColorManager[_0x38072d(0x18c)]=function(){const _0x111d4b=_0x38072d,_0x489c59=_0x111d4b(0x40b);this[_0x111d4b(0x66d)]=this['_colorCache']||{};if(this[_0x111d4b(0x66d)][_0x489c59])return this['_colorCache'][_0x489c59];const _0x3ff708=VisuMZ[_0x111d4b(0x45d)][_0x111d4b(0x75d)][_0x111d4b(0x190)]['ColorHPGauge1'];return this[_0x111d4b(0x414)](_0x489c59,_0x3ff708);},ColorManager['hpGaugeColor2']=function(){const _0x5da9e7=_0x38072d,_0x576e52=_0x5da9e7(0x97c);this[_0x5da9e7(0x66d)]=this[_0x5da9e7(0x66d)]||{};if(this[_0x5da9e7(0x66d)][_0x576e52])return this['_colorCache'][_0x576e52];const _0x55e990=VisuMZ[_0x5da9e7(0x45d)][_0x5da9e7(0x75d)][_0x5da9e7(0x190)][_0x5da9e7(0x7d3)];return this['getColorDataFromPluginParameters'](_0x576e52,_0x55e990);},ColorManager[_0x38072d(0x5f3)]=function(){const _0x452cf5=_0x38072d,_0x3c5b34=_0x452cf5(0x70f);this['_colorCache']=this[_0x452cf5(0x66d)]||{};if(this[_0x452cf5(0x66d)][_0x3c5b34])return this['_colorCache'][_0x3c5b34];const _0x55f4b9=VisuMZ[_0x452cf5(0x45d)][_0x452cf5(0x75d)][_0x452cf5(0x190)][_0x452cf5(0x446)];return this[_0x452cf5(0x414)](_0x3c5b34,_0x55f4b9);},ColorManager['mpGaugeColor2']=function(){const _0x51a746=_0x38072d,_0xd8c51f=_0x51a746(0x4b5);this[_0x51a746(0x66d)]=this['_colorCache']||{};if(this[_0x51a746(0x66d)][_0xd8c51f])return this['_colorCache'][_0xd8c51f];const _0x442cf3=VisuMZ['CoreEngine'][_0x51a746(0x75d)][_0x51a746(0x190)][_0x51a746(0x4e7)];return this[_0x51a746(0x414)](_0xd8c51f,_0x442cf3);},ColorManager[_0x38072d(0x4ae)]=function(){const _0x51d394=_0x38072d,_0x43df1e=_0x51d394(0x234);this['_colorCache']=this[_0x51d394(0x66d)]||{};if(this[_0x51d394(0x66d)][_0x43df1e])return this[_0x51d394(0x66d)][_0x43df1e];const _0x41a486=VisuMZ['CoreEngine'][_0x51d394(0x75d)][_0x51d394(0x190)][_0x51d394(0x882)];return this['getColorDataFromPluginParameters'](_0x43df1e,_0x41a486);},ColorManager[_0x38072d(0x21c)]=function(){const _0x4f46c6=_0x38072d,_0x1bd697=_0x4f46c6(0x199);this[_0x4f46c6(0x66d)]=this[_0x4f46c6(0x66d)]||{};if(this[_0x4f46c6(0x66d)][_0x1bd697])return this[_0x4f46c6(0x66d)][_0x1bd697];const _0x5e7d0b=VisuMZ[_0x4f46c6(0x45d)][_0x4f46c6(0x75d)][_0x4f46c6(0x190)][_0x4f46c6(0x8fa)];return this[_0x4f46c6(0x414)](_0x1bd697,_0x5e7d0b);},ColorManager[_0x38072d(0x3d6)]=function(){const _0x29b0a3=_0x38072d,_0x5a4e5b='_stored_powerDownColor';this[_0x29b0a3(0x66d)]=this[_0x29b0a3(0x66d)]||{};if(this[_0x29b0a3(0x66d)][_0x5a4e5b])return this['_colorCache'][_0x5a4e5b];const _0x4f70b5=VisuMZ[_0x29b0a3(0x45d)][_0x29b0a3(0x75d)][_0x29b0a3(0x190)][_0x29b0a3(0x4b0)];return this['getColorDataFromPluginParameters'](_0x5a4e5b,_0x4f70b5);},ColorManager[_0x38072d(0x52e)]=function(){const _0x47199c=_0x38072d,_0xf42be4='_stored_ctGaugeColor1';this[_0x47199c(0x66d)]=this[_0x47199c(0x66d)]||{};if(this['_colorCache'][_0xf42be4])return this[_0x47199c(0x66d)][_0xf42be4];const _0x191b5c=VisuMZ[_0x47199c(0x45d)]['Settings']['Color'][_0x47199c(0x44d)];return this[_0x47199c(0x414)](_0xf42be4,_0x191b5c);},ColorManager['ctGaugeColor2']=function(){const _0x26f6fd=_0x38072d,_0x233f9a=_0x26f6fd(0x877);this[_0x26f6fd(0x66d)]=this['_colorCache']||{};if(this[_0x26f6fd(0x66d)][_0x233f9a])return this[_0x26f6fd(0x66d)][_0x233f9a];const _0x5ccd17=VisuMZ[_0x26f6fd(0x45d)]['Settings'][_0x26f6fd(0x190)]['ColorCTGauge2'];return this[_0x26f6fd(0x414)](_0x233f9a,_0x5ccd17);},ColorManager[_0x38072d(0x50f)]=function(){const _0xf2ec30=_0x38072d,_0x202320=_0xf2ec30(0x3cd);this[_0xf2ec30(0x66d)]=this[_0xf2ec30(0x66d)]||{};if(this['_colorCache'][_0x202320])return this[_0xf2ec30(0x66d)][_0x202320];const _0x3849be=VisuMZ[_0xf2ec30(0x45d)][_0xf2ec30(0x75d)][_0xf2ec30(0x190)][_0xf2ec30(0x125)];return this[_0xf2ec30(0x414)](_0x202320,_0x3849be);},ColorManager[_0x38072d(0x1e2)]=function(){const _0x404a0c=_0x38072d,_0x18c846='_stored_tpGaugeColor2';this[_0x404a0c(0x66d)]=this[_0x404a0c(0x66d)]||{};if(this[_0x404a0c(0x66d)][_0x18c846])return this[_0x404a0c(0x66d)][_0x18c846];const _0x889c23=VisuMZ[_0x404a0c(0x45d)][_0x404a0c(0x75d)][_0x404a0c(0x190)][_0x404a0c(0x4d1)];return this[_0x404a0c(0x414)](_0x18c846,_0x889c23);},ColorManager[_0x38072d(0x2a4)]=function(){const _0x68ad69=_0x38072d,_0x4d02d4=_0x68ad69(0x39b);this['_colorCache']=this['_colorCache']||{};if(this[_0x68ad69(0x66d)][_0x4d02d4])return this[_0x68ad69(0x66d)][_0x4d02d4];const _0x26e54e=VisuMZ[_0x68ad69(0x45d)]['Settings']['Color'][_0x68ad69(0x5d2)];return this[_0x68ad69(0x414)](_0x4d02d4,_0x26e54e);},ColorManager['pendingColor']=function(){const _0x5c502f=_0x38072d,_0x5d3ece='_stored_pendingColor';this[_0x5c502f(0x66d)]=this['_colorCache']||{};if(this[_0x5c502f(0x66d)][_0x5d3ece])return this[_0x5c502f(0x66d)][_0x5d3ece];const _0x58a6cd=VisuMZ[_0x5c502f(0x45d)][_0x5c502f(0x75d)][_0x5c502f(0x190)]['ColorTPCost'];return this[_0x5c502f(0x414)](_0x5d3ece,_0x58a6cd);},ColorManager[_0x38072d(0x6cc)]=function(){const _0x3d2874=_0x38072d,_0x27ebad=_0x3d2874(0x5f7);this['_colorCache']=this[_0x3d2874(0x66d)]||{};if(this[_0x3d2874(0x66d)][_0x27ebad])return this[_0x3d2874(0x66d)][_0x27ebad];const _0x2d266f=VisuMZ['CoreEngine'][_0x3d2874(0x75d)][_0x3d2874(0x190)][_0x3d2874(0x71d)];return this['getColorDataFromPluginParameters'](_0x27ebad,_0x2d266f);},ColorManager[_0x38072d(0x45a)]=function(){const _0x3d6cfe=_0x38072d,_0x4051f2=_0x3d6cfe(0x58a);this[_0x3d6cfe(0x66d)]=this[_0x3d6cfe(0x66d)]||{};if(this[_0x3d6cfe(0x66d)][_0x4051f2])return this['_colorCache'][_0x4051f2];const _0x4b7c1b=VisuMZ[_0x3d6cfe(0x45d)][_0x3d6cfe(0x75d)][_0x3d6cfe(0x190)]['ColorExpGauge2'];return this[_0x3d6cfe(0x414)](_0x4051f2,_0x4b7c1b);},ColorManager[_0x38072d(0x3b2)]=function(){const _0x3e40f4=_0x38072d,_0x116fdc=_0x3e40f4(0x172);this['_colorCache']=this[_0x3e40f4(0x66d)]||{};if(this[_0x3e40f4(0x66d)][_0x116fdc])return this[_0x3e40f4(0x66d)][_0x116fdc];const _0x1a0b3e=VisuMZ[_0x3e40f4(0x45d)]['Settings'][_0x3e40f4(0x190)][_0x3e40f4(0x8e5)];return this['getColorDataFromPluginParameters'](_0x116fdc,_0x1a0b3e);},ColorManager[_0x38072d(0x880)]=function(){const _0x549d44=_0x38072d,_0x203037=_0x549d44(0x3fd);this[_0x549d44(0x66d)]=this[_0x549d44(0x66d)]||{};if(this[_0x549d44(0x66d)][_0x203037])return this['_colorCache'][_0x203037];const _0x25a118=VisuMZ['CoreEngine'][_0x549d44(0x75d)][_0x549d44(0x190)][_0x549d44(0x944)];return this[_0x549d44(0x414)](_0x203037,_0x25a118);},ColorManager[_0x38072d(0x2b0)]=function(_0x1aa9ba){const _0x57c7bb=_0x38072d;return VisuMZ[_0x57c7bb(0x45d)][_0x57c7bb(0x75d)][_0x57c7bb(0x190)][_0x57c7bb(0x1b1)]['call'](this,_0x1aa9ba);},ColorManager[_0x38072d(0x282)]=function(_0x5eb6bc){const _0x41405a=_0x38072d;return VisuMZ[_0x41405a(0x45d)]['Settings'][_0x41405a(0x190)]['ActorMPColor'][_0x41405a(0x967)](this,_0x5eb6bc);},ColorManager[_0x38072d(0x14b)]=function(_0xa78c32){const _0x5262af=_0x38072d;return VisuMZ[_0x5262af(0x45d)][_0x5262af(0x75d)][_0x5262af(0x190)][_0x5262af(0x3f7)][_0x5262af(0x967)](this,_0xa78c32);},ColorManager[_0x38072d(0x3fe)]=function(_0x4e6f18){const _0x7f5c6b=_0x38072d;return VisuMZ[_0x7f5c6b(0x45d)][_0x7f5c6b(0x75d)]['Color'][_0x7f5c6b(0x4c3)]['call'](this,_0x4e6f18);},ColorManager[_0x38072d(0x169)]=function(_0x4b14f1){const _0x405663=_0x38072d;return VisuMZ[_0x405663(0x45d)][_0x405663(0x75d)][_0x405663(0x190)][_0x405663(0x7c2)][_0x405663(0x967)](this,_0x4b14f1);},ColorManager[_0x38072d(0x709)]=function(){const _0x4036ce=_0x38072d;return VisuMZ[_0x4036ce(0x45d)]['Settings']['Color'][_0x4036ce(0x6e4)];},ColorManager[_0x38072d(0x165)]=function(){const _0x380183=_0x38072d;return VisuMZ[_0x380183(0x45d)][_0x380183(0x75d)][_0x380183(0x190)][_0x380183(0x1de)]||_0x380183(0x680);},ColorManager[_0x38072d(0x6de)]=function(){const _0x4a3c59=_0x38072d;return VisuMZ[_0x4a3c59(0x45d)][_0x4a3c59(0x75d)][_0x4a3c59(0x190)]['OutlineColorGauge']||'rgba(0,\x200,\x200,\x201.0)';},ColorManager['dimColor1']=function(){const _0x50a27e=_0x38072d;return VisuMZ['CoreEngine']['Settings'][_0x50a27e(0x190)][_0x50a27e(0x893)];},ColorManager['dimColor2']=function(){const _0x302330=_0x38072d;return VisuMZ[_0x302330(0x45d)]['Settings']['Color'][_0x302330(0x798)];},ColorManager[_0x38072d(0x817)]=function(){const _0x43a6c0=_0x38072d;return VisuMZ[_0x43a6c0(0x45d)][_0x43a6c0(0x75d)][_0x43a6c0(0x190)][_0x43a6c0(0x170)];},ColorManager[_0x38072d(0x10c)]=function(){const _0x5717e4=_0x38072d;return VisuMZ[_0x5717e4(0x45d)][_0x5717e4(0x75d)][_0x5717e4(0x190)][_0x5717e4(0x742)];},SceneManager['_storedStack']=[],SceneManager[_0x38072d(0x89e)]=function(){const _0x12da26=_0x38072d;return this[_0x12da26(0x576)]&&this[_0x12da26(0x576)][_0x12da26(0x1aa)]===Scene_Battle;},SceneManager[_0x38072d(0x61b)]=function(){const _0x4440b7=_0x38072d;return this['_scene']&&this['_scene'][_0x4440b7(0x1aa)]===Scene_Map;},SceneManager[_0x38072d(0x93d)]=function(){const _0x4a3413=_0x38072d;return this['_scene']&&this[_0x4a3413(0x576)]instanceof Scene_Map;},VisuMZ[_0x38072d(0x45d)]['SceneManager_initialize']=SceneManager[_0x38072d(0x770)],SceneManager[_0x38072d(0x770)]=function(){const _0x30af4b=_0x38072d;VisuMZ[_0x30af4b(0x45d)][_0x30af4b(0x708)][_0x30af4b(0x967)](this),this[_0x30af4b(0x216)]();},VisuMZ['CoreEngine'][_0x38072d(0x330)]=SceneManager[_0x38072d(0x22d)],SceneManager[_0x38072d(0x22d)]=function(_0x23afff){const _0x579570=_0x38072d;if($gameTemp)this[_0x579570(0x6a1)](_0x23afff);VisuMZ[_0x579570(0x45d)][_0x579570(0x330)][_0x579570(0x967)](this,_0x23afff);},SceneManager['onKeyDownKeysF6F7']=function(_0x206bcd){const _0x3882fe=_0x38072d;if(!_0x206bcd['ctrlKey']&&!_0x206bcd[_0x3882fe(0x2f0)])switch(_0x206bcd[_0x3882fe(0x6b2)]){case 0x52:this[_0x3882fe(0x2ab)]();break;case 0x54:this[_0x3882fe(0x85e)]();break;case 0x75:this[_0x3882fe(0x1c3)]();break;case 0x76:if(Input[_0x3882fe(0x6d4)](_0x3882fe(0x205))||Input['isPressed'](_0x3882fe(0x9f0)))return;this[_0x3882fe(0x331)]();break;}},SceneManager[_0x38072d(0x1c3)]=function(){const _0x509b81=_0x38072d;if($gameTemp['isPlaytest']()&&VisuMZ[_0x509b81(0x45d)][_0x509b81(0x75d)][_0x509b81(0x6a9)][_0x509b81(0x738)]){if(_0x509b81(0x4b6)===_0x509b81(0x4b6)){ConfigManager['seVolume']!==0x0?(ConfigManager['bgmVolume']=0x0,ConfigManager[_0x509b81(0x612)]=0x0,ConfigManager['meVolume']=0x0,ConfigManager[_0x509b81(0x1fb)]=0x0):(ConfigManager[_0x509b81(0x678)]=0x64,ConfigManager[_0x509b81(0x612)]=0x64,ConfigManager['meVolume']=0x64,ConfigManager[_0x509b81(0x1fb)]=0x64);ConfigManager[_0x509b81(0x435)]();if(this[_0x509b81(0x576)][_0x509b81(0x1aa)]===Scene_Options){if(this[_0x509b81(0x576)]['_optionsWindow'])this[_0x509b81(0x576)][_0x509b81(0x47a)][_0x509b81(0x7c3)]();if(this[_0x509b81(0x576)][_0x509b81(0x423)])this[_0x509b81(0x576)][_0x509b81(0x423)][_0x509b81(0x7c3)]();}}else{const _0x4b3d90=_0x58e01f[_0x509b81(0x45d)][_0x509b81(0x75d)][_0x509b81(0x56d)];for(const _0x1c8081 of _0x4b3d90){const _0x7946e5=(_0x1c8081[_0x509b81(0x269)]||'')[_0x509b81(0x27c)]()[_0x509b81(0x5bd)](),_0x6419a1=(_0x1c8081[_0x509b81(0x744)]||'')[_0x509b81(0x27c)]()['trim']();_0xa44c86[_0x509b81(0x45d)][_0x509b81(0x56d)][_0x7946e5]=_0x1c8081,_0x48a3b6[_0x509b81(0x45d)][_0x509b81(0x7ac)][_0x6419a1]=_0x7946e5;}}}},SceneManager[_0x38072d(0x331)]=function(){const _0x1580cc=_0x38072d;$gameTemp[_0x1580cc(0x267)]()&&VisuMZ[_0x1580cc(0x45d)][_0x1580cc(0x75d)][_0x1580cc(0x6a9)][_0x1580cc(0x574)]&&($gameTemp['_playTestFastMode']=!$gameTemp[_0x1580cc(0x589)]);},SceneManager[_0x38072d(0x2ab)]=function(){const _0x8a1457=_0x38072d;if(!VisuMZ['CoreEngine'][_0x8a1457(0x75d)][_0x8a1457(0x6a9)]['ShiftR_Toggle'])return;if(!$gameTemp['isPlaytest']())return;if(!SceneManager[_0x8a1457(0x89e)]())return;if(!Input['isPressed']('shift'))return;for(const _0x2c378c of $gameParty['members']()){if(_0x8a1457(0x8b5)===_0x8a1457(0x8b5)){if(!_0x2c378c)continue;_0x2c378c['recoverAll']();}else this[_0x8a1457(0x440)](_0x32f232);}},SceneManager[_0x38072d(0x85e)]=function(){const _0x381bcf=_0x38072d;if(!VisuMZ[_0x381bcf(0x45d)]['Settings']['QoL']['ShiftT_Toggle'])return;if(!$gameTemp[_0x381bcf(0x267)]())return;if(!SceneManager[_0x381bcf(0x89e)]())return;if(!Input['isPressed'](_0x381bcf(0x205)))return;for(const _0x2a53f3 of $gameParty[_0x381bcf(0x896)]()){if(_0x381bcf(0x8ae)===_0x381bcf(0x573)){const _0x1f5a11=_0x3511ac[_0x381bcf(0x45d)]['Settings']['ButtonAssist'],_0x4dcec9=_0x1f5a11[_0x381bcf(0x4cc)],_0x43ae93=this[_0x381bcf(0x63e)](_0x1012ce),_0xe15926=this['getInputButtonString'](_0x10c526);return _0x4dcec9[_0x381bcf(0x941)](_0x43ae93,_0xe15926);}else{if(!_0x2a53f3)continue;_0x2a53f3[_0x381bcf(0x6ee)](_0x2a53f3['maxTp']());}}},SceneManager[_0x38072d(0x216)]=function(){const _0x5a0caa=_0x38072d;this[_0x5a0caa(0x278)]=![],this[_0x5a0caa(0x37e)]=!VisuMZ['CoreEngine'][_0x5a0caa(0x75d)]['UI']['ShowButtons'];},SceneManager[_0x38072d(0x4e4)]=function(_0x2e9607){const _0x33e3ac=_0x38072d;if(VisuMZ['CoreEngine'][_0x33e3ac(0x75d)]['UI'][_0x33e3ac(0x8db)]){if(_0x33e3ac(0x856)!==_0x33e3ac(0x856))return _0x4c9f73[_0x33e3ac(0x54f)][_0x33e3ac(0x99d)][_0x33e3ac(0x967)](this);else this['_sideButtonLayout']=_0x2e9607;}},SceneManager[_0x38072d(0x732)]=function(){return this['_sideButtonLayout'];},SceneManager['areButtonsHidden']=function(){return this['_hideButtons'];},SceneManager['areButtonsOutsideMainUI']=function(){const _0x4b067e=_0x38072d;return this[_0x4b067e(0x782)]()||this[_0x4b067e(0x732)]();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x51c)]=SceneManager[_0x38072d(0x92f)],SceneManager[_0x38072d(0x92f)]=function(){const _0x166674=_0x38072d;return VisuMZ[_0x166674(0x45d)]['Settings'][_0x166674(0x6a9)][_0x166674(0x2a8)]?VisuMZ[_0x166674(0x45d)]['SceneManager_isGameActive']['call'](this):!![];},SceneManager[_0x38072d(0x2e1)]=function(_0x3a53c7){const _0xb4fe2f=_0x38072d;if(_0x3a53c7 instanceof Error){if(_0xb4fe2f(0x441)!==_0xb4fe2f(0x441)){if(!_0x3d12e7[_0xb4fe2f(0x267)]())return;const _0x1bd1a3=_0x1b2cc5['getLastUsedGamepadType']();_0x52e20f[_0xb4fe2f(0x775)]&&_0x3fded9[_0xb4fe2f(0x775)][_0xb4fe2f(0x7a2)](_0x1bd1a3);}else this[_0xb4fe2f(0x972)](_0x3a53c7);}else{if(_0x3a53c7 instanceof Array&&_0x3a53c7[0x0]===_0xb4fe2f(0x479)){if('eQvbk'===_0xb4fe2f(0x2a2)){const _0x1edf10=_0x1b085c(this['constructor'][_0xb4fe2f(0x25e)]),_0x183e00=this[_0xb4fe2f(0x8ff)](_0x1edf10);_0x183e00&&(_0x183e00[_0xb4fe2f(0xf5)]!==''||_0x183e00[_0xb4fe2f(0x90c)]!=='')&&(this['_backSprite1']=new _0x4bd5e3(_0x46ee94[_0xb4fe2f(0x600)](_0x183e00[_0xb4fe2f(0xf5)])),this['_backSprite2']=new _0xcbdfc9(_0x420c76['loadTitle2'](_0x183e00[_0xb4fe2f(0x90c)])),this[_0xb4fe2f(0x343)](this['_backSprite1']),this['addChild'](this[_0xb4fe2f(0x523)]),this['_backSprite1'][_0xb4fe2f(0x208)]['addLoadListener'](this[_0xb4fe2f(0x5c5)][_0xb4fe2f(0x667)](this,this[_0xb4fe2f(0x2eb)])),this['_backSprite2'][_0xb4fe2f(0x208)][_0xb4fe2f(0x955)](this['adjustSprite']['bind'](this,this[_0xb4fe2f(0x523)])));}else this[_0xb4fe2f(0x6da)](_0x3a53c7);}else{if(_0xb4fe2f(0x963)===_0xb4fe2f(0x963))this[_0xb4fe2f(0x33c)](_0x3a53c7);else{const _0x36a17b=_0x1b9aa5[_0xb4fe2f(0x576)];if(!_0x36a17b)return;!_0x36a17b['_pictureCoordinatesWindow']&&(_0x57504d[_0xb4fe2f(0x68f)](),_0x36a17b[_0xb4fe2f(0x84b)]=new _0x344a4f(),_0x36a17b[_0xb4fe2f(0x343)](_0x36a17b[_0xb4fe2f(0x84b)])),_0x30c849['_pictureCoordinatesMode']===_0x257183&&(_0xdaebd3[_0xb4fe2f(0x779)](),_0x36a17b[_0xb4fe2f(0x501)](_0x36a17b[_0xb4fe2f(0x84b)]),_0x36a17b['_pictureCoordinatesWindow']=_0x5071a7);}}}this['stop']();},VisuMZ[_0x38072d(0x45d)]['BattleManager_processEscape']=BattleManager[_0x38072d(0x3e9)],BattleManager[_0x38072d(0x3e9)]=function(){const _0x1d7dbc=_0x38072d;if(VisuMZ[_0x1d7dbc(0x45d)]['Settings']['QoL'][_0x1d7dbc(0x12c)])return this[_0x1d7dbc(0x3e5)]();else{if(_0x1d7dbc(0x86b)===_0x1d7dbc(0x86b))return VisuMZ['CoreEngine']['BattleManager_processEscape'][_0x1d7dbc(0x967)](this);else{this['contents'][_0x1d7dbc(0x8bd)](),this[_0x1d7dbc(0x924)][_0x1d7dbc(0x8bd)](),this[_0x1d7dbc(0x9b2)]();let _0x5313fc=_0xfc6bb0[_0x1d7dbc(0x45d)][_0x1d7dbc(0x75d)]['KeyboardInput'][_0x1d7dbc(0x95f)][_0x1d7dbc(0x28b)]('\x0a'),_0x3ec7b=_0x5313fc['length'],_0x34ce11=(this['innerHeight']-_0x3ec7b*this['lineHeight']())/0x2;for(let _0x4489d6=0x0;_0x4489d6<_0x3ec7b;++_0x4489d6){let _0x3cf512=_0x5313fc[_0x4489d6],_0x23c998=this[_0x1d7dbc(0x228)](_0x3cf512)[_0x1d7dbc(0x729)],_0x51ab52=_0xa8d17['floor']((this[_0x1d7dbc(0x6e1)][_0x1d7dbc(0x729)]-_0x23c998)/0x2);this['drawTextEx'](_0x3cf512,_0x51ab52,_0x34ce11),_0x34ce11+=this[_0x1d7dbc(0x2ef)]();}}}},BattleManager['processAlwaysEscape']=function(){const _0x40b433=_0x38072d;return $gameParty[_0x40b433(0x813)](),SoundManager[_0x40b433(0x434)](),this[_0x40b433(0x786)](),!![];},BattleManager['isTpb']=function(){return $gameSystem['getBattleSystem']()>=0x1;},BattleManager[_0x38072d(0x4f1)]=function(){const _0x3fff6d=_0x38072d;return $gameSystem[_0x3fff6d(0x1a0)]()===0x1;},VisuMZ['CoreEngine']['Game_Temp_initialize']=Game_Temp['prototype'][_0x38072d(0x770)],Game_Temp[_0x38072d(0x182)][_0x38072d(0x770)]=function(){const _0x5bbf29=_0x38072d;VisuMZ['CoreEngine']['Game_Temp_initialize'][_0x5bbf29(0x967)](this),this['forceOutOfPlaytest'](),this[_0x5bbf29(0x7e8)](),this[_0x5bbf29(0x792)]();},Game_Temp[_0x38072d(0x182)]['forceOutOfPlaytest']=function(){const _0x448915=_0x38072d;VisuMZ[_0x448915(0x45d)][_0x448915(0x75d)][_0x448915(0x6a9)]['ForceNoPlayTest']&&('xmhpA'!==_0x448915(0x232)?this[_0x448915(0x5d3)]=![]:(this[_0x448915(0x104)](_0x1ff374,_0x598505,_0x12c535,this[_0x448915(0x4be)]()),_0x1a2226-=this[_0x448915(0x4be)]()+0x2,_0x457c5f+=this[_0x448915(0x4be)]()+0x2));},Game_Temp[_0x38072d(0x182)][_0x38072d(0x2be)]=function(_0x27c510){const _0x3bc1f3=_0x38072d;this[_0x3bc1f3(0x31d)]=_0x27c510;},Game_Temp[_0x38072d(0x182)][_0x38072d(0x50b)]=function(){const _0x3b3d00=_0x38072d;return this[_0x3b3d00(0x31d)];},Game_Temp[_0x38072d(0x182)][_0x38072d(0x28d)]=function(){const _0x320e70=_0x38072d;this['_forcedTroopView']=undefined,this[_0x320e70(0xeb)]=undefined;},Game_Temp['prototype'][_0x38072d(0x143)]=function(_0x31e687){const _0x50cc4a=_0x38072d;if($gameMap&&$dataMap&&$dataMap['note']){if(_0x50cc4a(0x122)===_0x50cc4a(0x122))this[_0x50cc4a(0x773)]($dataMap[_0x50cc4a(0x673)]);else{const _0x3088e0=(_0x173a61['CoreEngine']['Settings'][_0x50cc4a(0x969)]||_0x50cc4a(0x545))[_0x50cc4a(0x994)]()[_0x50cc4a(0x5bd)]();return _0xe0522d[_0x50cc4a(0x45d)][_0x50cc4a(0x67b)](_0x3088e0);}}const _0x3eac1e=$dataTroops[_0x31e687];if(_0x3eac1e){let _0x8969d8=DataManager['createTroopNote'](_0x3eac1e['id']);this[_0x50cc4a(0x773)](_0x8969d8);}},Game_Temp['prototype'][_0x38072d(0x773)]=function(_0x2e1cb2){const _0x215af0=_0x38072d;if(!_0x2e1cb2)return;if(_0x2e1cb2[_0x215af0(0x322)](/<(?:FRONTVIEW|FRONT VIEW|FV)>/i))this['_forcedTroopView']='FV';else{if(_0x2e1cb2['match'](/<(?:SIDEVIEW|SIDE VIEW|SV)>/i))this['_forcedTroopView']='SV';else{if(_0x2e1cb2['match'](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){if(_0x215af0(0x66b)!==_0x215af0(0x3fc)){const _0x873d5d=String(RegExp['$1']);if(_0x873d5d[_0x215af0(0x322)](/(?:FRONTVIEW|FRONT VIEW|FV)/i)){if(_0x215af0(0x8f6)!==_0x215af0(0x8f6))for(let _0x4fd31a=0x1;_0x4fd31a<=0x64;_0x4fd31a++){_0x2181ea[_0x215af0(0x1b8)](_0x4fd31a);}else this[_0x215af0(0x59c)]='FV';}else _0x873d5d[_0x215af0(0x322)](/(?:SIDEVIEW|SIDE VIEW|SV)/i)&&(this['_forcedTroopView']='SV');}else return _0x25b4ff['layoutSettings'][_0x215af0(0x312)][_0x215af0(0x967)](this);}}}if(_0x2e1cb2[_0x215af0(0x322)](/<(?:DTB)>/i))this[_0x215af0(0xeb)]=0x0;else{if(_0x2e1cb2['match'](/<(?:TPB|ATB)[ ]ACTIVE>/i))_0x215af0(0x33d)===_0x215af0(0x33d)?this[_0x215af0(0xeb)]=0x1:(_0x58a47b[_0x215af0(0x45d)][_0x215af0(0x294)][_0x215af0(0x967)](this,_0x12670b,_0x1a4a18,_0x4c142a,_0x55518a,_0x279cb0,_0x6bb920,_0x482241,_0x20b4d2),this[_0x215af0(0x22e)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x3c948e]||{'x':0x0,'y':0x0}));else{if(_0x2e1cb2[_0x215af0(0x322)](/<(?:TPB|ATB)[ ]WAIT>/i)){if(_0x215af0(0x98b)!==_0x215af0(0x5a2))this['_forcedBattleSys']=0x2;else return this[_0x215af0(0x1fc)](_0x53578e);}else{if(_0x2e1cb2[_0x215af0(0x322)](/<(?:CTB)>/i))Imported[_0x215af0(0x726)]&&(_0x215af0(0x17c)!=='ztKiM'?_0x367f95[_0x215af0(0x158)]=_0x49240d[_0x215af0(0x285)](_0x57f82e(_0x1f0d37['$1']),0x1):this[_0x215af0(0xeb)]=_0x215af0(0x27d));else{if(_0x2e1cb2[_0x215af0(0x322)](/<(?:STB)>/i))_0x215af0(0x72d)===_0x215af0(0x3f6)?(_0x4c0730=_0x168f16[_0x215af0(0x337)](_0x230c80),_0x3a5db1=_0xb71d47[_0x215af0(0x337)](_0x20ad01),_0x203f23=_0xb68c98['round'](_0x204e4f),_0x49298a[_0x215af0(0x45d)][_0x215af0(0x9fe)][_0x215af0(0x967)](this,_0x50ddc9,_0x2baadf,_0x1096c0,_0x97b634),this[_0x215af0(0x1e6)]()):Imported[_0x215af0(0x7c0)]&&(this[_0x215af0(0xeb)]=_0x215af0(0x718));else{if(_0x2e1cb2['match'](/<(?:BTB)>/i))Imported[_0x215af0(0x9a4)]&&(this[_0x215af0(0xeb)]=_0x215af0(0x812));else{if(_0x2e1cb2[_0x215af0(0x322)](/<(?:FTB)>/i)){if(Imported[_0x215af0(0x55e)]){if('fTIPs'===_0x215af0(0x4cf))this[_0x215af0(0xeb)]='FTB';else return this[_0x215af0(0x576)]&&this[_0x215af0(0x576)]instanceof _0x428cec;}}else{if(_0x2e1cb2[_0x215af0(0x322)](/<(?:OTB)>/i))_0x215af0(0x954)===_0x215af0(0x1f9)?this[_0x215af0(0x2c3)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this['scale']['x'],'targetScaleY':this[_0x215af0(0x834)]['y'],'targetOpacity':this['opacity'],'targetBackOpacity':this[_0x215af0(0x24d)],'targetContentsOpacity':this[_0x215af0(0x741)]}:Imported[_0x215af0(0x63f)]&&(this[_0x215af0(0xeb)]=_0x215af0(0x67e));else{if(_0x2e1cb2[_0x215af0(0x322)](/<(?:ETB)>/i))Imported[_0x215af0(0x219)]&&(this[_0x215af0(0xeb)]=_0x215af0(0x9cd));else{if(_0x2e1cb2[_0x215af0(0x322)](/<(?:PTB)>/i))Imported[_0x215af0(0x72f)]&&(this['_forcedBattleSys']='PTB');else{if(_0x2e1cb2[_0x215af0(0x322)](/<(?:BATTLEVIEW|BATTLE VIEW):[ ](.*)>/i)){const _0x2b52a1=String(RegExp['$1']);if(_0x2b52a1[_0x215af0(0x322)](/DTB/i))this[_0x215af0(0xeb)]=0x0;else{if(_0x2b52a1['match'](/(?:TPB|ATB)[ ]ACTIVE/i))this[_0x215af0(0xeb)]=0x1;else{if(_0x2b52a1['match'](/(?:TPB|ATB)[ ]WAIT/i)){if(_0x215af0(0x83d)!=='mqwYC')this[_0x215af0(0xeb)]=0x2;else return 0x0;}else{if(_0x2b52a1['match'](/CTB/i)){if(_0x215af0(0x988)!==_0x215af0(0x287))Imported['VisuMZ_2_BattleSystemCTB']&&(this[_0x215af0(0xeb)]=_0x215af0(0x27d));else return _0x5c4687[_0x215af0(0x45d)]['Settings'][_0x215af0(0x190)][_0x215af0(0x1de)]||'rgba(0,\x200,\x200,\x200.7)';}else{if(_0x2b52a1[_0x215af0(0x322)](/STB/i)){if('zvPSe'!==_0x215af0(0x254))return _0x2496c9[_0x215af0(0x45d)][_0x215af0(0x75d)][_0x215af0(0x6a9)][_0x215af0(0x699)];else Imported['VisuMZ_2_BattleSystemSTB']&&(_0x215af0(0x176)===_0x215af0(0x176)?this[_0x215af0(0xeb)]='STB':_0x4d9d62[_0x215af0(0x627)]());}else{if(_0x2b52a1[_0x215af0(0x322)](/BTB/i))Imported['VisuMZ_2_BattleSystemBTB']&&(this[_0x215af0(0xeb)]='BTB');else{if(_0x2b52a1[_0x215af0(0x322)](/FTB/i))Imported['VisuMZ_2_BattleSystemFTB']&&(this[_0x215af0(0xeb)]='FTB');else{if(_0x2b52a1[_0x215af0(0x322)](/OTB/i)){if(_0x215af0(0x17d)!==_0x215af0(0x17d)){if(_0x3f7a08[_0x215af0(0x8a2)]())return;_0x542c04[_0x215af0(0x57a)](_0x4de21f,_0x2801af);const _0x160132=_0x278bad[_0x215af0(0x110)]['toUpperCase']()[_0x215af0(0x5bd)](),_0x18e6bb=_0x4ffb00['CoreEngine'][_0x215af0(0x67b)](_0x160132);_0x3c0bc4['setBattleSystem'](_0x18e6bb);}else Imported[_0x215af0(0x63f)]&&(this['_forcedBattleSys']=_0x215af0(0x67e));}else{if(_0x2b52a1[_0x215af0(0x322)](/ETB/i))Imported['VisuMZ_2_BattleSystemETB']&&(this['_forcedBattleSys']=_0x215af0(0x9cd));else _0x2b52a1[_0x215af0(0x322)](/PTB/i)&&(Imported[_0x215af0(0x72f)]&&(this[_0x215af0(0xeb)]=_0x215af0(0x5cb)));}}}}}}}}}}}}}}}}}}}},Game_Temp[_0x38072d(0x182)]['createFauxAnimationQueue']=function(){this['_fauxAnimationQueue']=[];},Game_Temp[_0x38072d(0x182)]['requestFauxAnimation']=function(_0x58cc63,_0x4fa050,_0x492fc4,_0x4d2795){const _0x426528=_0x38072d;if(!this[_0x426528(0x549)]())return;_0x492fc4=_0x492fc4||![],_0x4d2795=_0x4d2795||![];if($dataAnimations[_0x4fa050]){const _0x1f7ecf={'targets':_0x58cc63,'animationId':_0x4fa050,'mirror':_0x492fc4,'mute':_0x4d2795};this[_0x426528(0x4c6)]['push'](_0x1f7ecf);for(const _0x473775 of _0x58cc63){_0x473775[_0x426528(0x2fe)]&&(_0x426528(0x148)===_0x426528(0x5dc)?this[_0x426528(0x8a8)]():_0x473775[_0x426528(0x2fe)]());}}},Game_Temp[_0x38072d(0x182)][_0x38072d(0x549)]=function(){return!![];},Game_Temp[_0x38072d(0x182)][_0x38072d(0x979)]=function(){const _0x4a96a5=_0x38072d;return this[_0x4a96a5(0x4c6)][_0x4a96a5(0x205)]();},Game_Temp['prototype'][_0x38072d(0x792)]=function(){const _0x1789d5=_0x38072d;this[_0x1789d5(0x154)]=[];},Game_Temp[_0x38072d(0x182)][_0x38072d(0x469)]=function(_0x13c09d,_0x30b80c,_0x3c7469,_0x3a86b3,_0x402218){const _0x3212ac=_0x38072d;if(!this[_0x3212ac(0x6f6)]())return;_0x3a86b3=_0x3a86b3||![],_0x402218=_0x402218||![];if($dataAnimations[_0x3c7469]){if('tAKRG'===_0x3212ac(0x4e6)){const _0x48621f={'x':_0x13c09d,'y':_0x30b80c,'animationId':_0x3c7469,'mirror':_0x3a86b3,'mute':_0x402218};this[_0x3212ac(0x154)]['push'](_0x48621f);}else return-0.5*(_0x41d8ff[_0x3212ac(0x321)](0x2,0xa*_0xebdb04)*_0x36d231[_0x3212ac(0x463)]((_0x32f2f6-_0x23b528)*(0x2*_0xb99257['PI'])/_0x6afe57));}},Game_Temp[_0x38072d(0x182)]['showPointAnimations']=function(){return!![];},Game_Temp[_0x38072d(0x182)]['retrievePointAnimation']=function(){const _0x32897b=_0x38072d;return this['_pointAnimationQueue'][_0x32897b(0x205)]();},VisuMZ[_0x38072d(0x45d)]['Game_System_initialize']=Game_System['prototype'][_0x38072d(0x770)],Game_System[_0x38072d(0x182)]['initialize']=function(){const _0x1fc322=_0x38072d;VisuMZ[_0x1fc322(0x45d)][_0x1fc322(0x2bd)][_0x1fc322(0x967)](this),this[_0x1fc322(0x3cc)]();},Game_System['prototype'][_0x38072d(0x3cc)]=function(){const _0x129d99=_0x38072d;this['_CoreEngineSettings']={'SideView':$dataSystem[_0x129d99(0x6b3)],'BattleSystem':this[_0x129d99(0x637)](),'FontSize':$dataSystem[_0x129d99(0x6ed)][_0x129d99(0x70e)],'Padding':0xc};},Game_System[_0x38072d(0x182)][_0x38072d(0x79a)]=function(){const _0x475f9c=_0x38072d;if($gameTemp[_0x475f9c(0x59c)]==='SV'){if(_0x475f9c(0x6cd)===_0x475f9c(0x8d7)){const _0x1abbf3=_0xc7bf0[_0x475f9c(0x576)][_0x475f9c(0x160)];_0x1abbf3[_0x475f9c(0x2e8)](_0x4ce8b8);}else return!![];}else{if($gameTemp['_forcedTroopView']==='FV')return![];}if(this['_CoreEngineSettings']===undefined)this[_0x475f9c(0x3cc)]();if(this['_CoreEngineSettings'][_0x475f9c(0x8b8)]===undefined)this[_0x475f9c(0x3cc)]();return this['_CoreEngineSettings']['SideView'];},Game_System[_0x38072d(0x182)][_0x38072d(0x210)]=function(_0x2af4c7){const _0x525727=_0x38072d;if(this['_CoreEngineSettings']===undefined)this[_0x525727(0x3cc)]();if(this[_0x525727(0x5fa)]['SideView']===undefined)this[_0x525727(0x3cc)]();this[_0x525727(0x5fa)]['SideView']=_0x2af4c7;},Game_System[_0x38072d(0x182)]['resetBattleSystem']=function(){const _0x1d8fe5=_0x38072d;if(this[_0x1d8fe5(0x5fa)]===undefined)this[_0x1d8fe5(0x3cc)]();this[_0x1d8fe5(0x5fa)]['BattleSystem']=this[_0x1d8fe5(0x637)]();},Game_System[_0x38072d(0x182)][_0x38072d(0x637)]=function(){const _0x519a81=_0x38072d,_0x1a571d=(VisuMZ[_0x519a81(0x45d)]['Settings'][_0x519a81(0x969)]||'DATABASE')['toUpperCase']()['trim']();return VisuMZ[_0x519a81(0x45d)]['CreateBattleSystemID'](_0x1a571d);},Game_System['prototype']['getBattleSystem']=function(){const _0x220c48=_0x38072d;if($gameTemp['_forcedBattleSys']!==undefined){if(_0x220c48(0x767)==='xqjzy')return $gameTemp['_forcedBattleSys'];else _0x19a6be['CoreEngine']['Settings']['QoL']['ForceNoPlayTest']&&(this[_0x220c48(0x5d3)]=![]);}if(this[_0x220c48(0x5fa)]===undefined)this[_0x220c48(0x3cc)]();if(this['_CoreEngineSettings'][_0x220c48(0x969)]===undefined)this[_0x220c48(0x12a)]();return this['_CoreEngineSettings']['BattleSystem'];},Game_System[_0x38072d(0x182)][_0x38072d(0x26a)]=function(_0xc372e5){const _0x3fb4ff=_0x38072d;if(this[_0x3fb4ff(0x5fa)]===undefined)this[_0x3fb4ff(0x3cc)]();if(this[_0x3fb4ff(0x5fa)][_0x3fb4ff(0x969)]===undefined)this[_0x3fb4ff(0x12a)]();this[_0x3fb4ff(0x5fa)][_0x3fb4ff(0x969)]=_0xc372e5;},Game_System['prototype']['mainFontSize']=function(){const _0x2c9624=_0x38072d;if(this[_0x2c9624(0x5fa)]===undefined)this[_0x2c9624(0x3cc)]();if(this['_CoreEngineSettings'][_0x2c9624(0x78f)]===undefined)this[_0x2c9624(0x3cc)]();return this[_0x2c9624(0x5fa)][_0x2c9624(0x78f)];},Game_System[_0x38072d(0x182)][_0x38072d(0x886)]=function(_0x4bbaac){const _0x4b1c10=_0x38072d;if(this[_0x4b1c10(0x5fa)]===undefined)this[_0x4b1c10(0x3cc)]();if(this['_CoreEngineSettings'][_0x4b1c10(0x4ff)]===undefined)this[_0x4b1c10(0x3cc)]();this[_0x4b1c10(0x5fa)][_0x4b1c10(0x78f)]=_0x4bbaac;},Game_System[_0x38072d(0x182)][_0x38072d(0x137)]=function(){const _0x3dbe2c=_0x38072d;if(this[_0x3dbe2c(0x5fa)]===undefined)this[_0x3dbe2c(0x3cc)]();if(this[_0x3dbe2c(0x5fa)]['Padding']===undefined)this[_0x3dbe2c(0x3cc)]();return this[_0x3dbe2c(0x5fa)][_0x3dbe2c(0x840)];},Game_System[_0x38072d(0x182)][_0x38072d(0x3d1)]=function(_0x5ad67a){const _0x421bbc=_0x38072d;if(this['_CoreEngineSettings']===undefined)this[_0x421bbc(0x3cc)]();if(this['_CoreEngineSettings'][_0x421bbc(0x4ff)]===undefined)this[_0x421bbc(0x3cc)]();this[_0x421bbc(0x5fa)][_0x421bbc(0x840)]=_0x5ad67a;},VisuMZ['CoreEngine'][_0x38072d(0x764)]=Game_Screen['prototype']['initialize'],Game_Screen[_0x38072d(0x182)]['initialize']=function(){const _0x4a74b9=_0x38072d;VisuMZ['CoreEngine'][_0x4a74b9(0x764)]['call'](this),this['initCoreEngineScreenShake']();},Game_Screen[_0x38072d(0x182)][_0x38072d(0x128)]=function(){const _0x345613=_0x38072d,_0x5d6cee=VisuMZ[_0x345613(0x45d)][_0x345613(0x75d)][_0x345613(0x363)];this[_0x345613(0x290)]=_0x5d6cee?.[_0x345613(0x39e)]||_0x345613(0x793);},Game_Screen[_0x38072d(0x182)][_0x38072d(0x881)]=function(){const _0x3a05b7=_0x38072d;if(this['_coreEngineShakeStyle']===undefined)this[_0x3a05b7(0x128)]();return this[_0x3a05b7(0x290)];},Game_Screen[_0x38072d(0x182)][_0x38072d(0x557)]=function(_0x535d4f){const _0x1cd373=_0x38072d;if(this[_0x1cd373(0x290)]===undefined)this[_0x1cd373(0x128)]();this[_0x1cd373(0x290)]=_0x535d4f[_0x1cd373(0x27c)]()['trim']();},Game_Picture[_0x38072d(0x182)][_0x38072d(0x63c)]=function(){const _0x16e4ca=_0x38072d;if($gameParty[_0x16e4ca(0x8a2)]())return![];return this[_0x16e4ca(0x1e0)]()&&this[_0x16e4ca(0x1e0)]()[_0x16e4ca(0x357)](0x0)==='!';},Game_Picture[_0x38072d(0x182)][_0x38072d(0x1e0)]=function(){const _0x4ce4be=_0x38072d;return this[_0x4ce4be(0x648)]['split']('/')[_0x4ce4be(0x384)]();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0xfb)]=Game_Picture[_0x38072d(0x182)]['x'],Game_Picture[_0x38072d(0x182)]['x']=function(){const _0xcbea8=_0x38072d;if(this['isMapScrollLinked']())return this[_0xcbea8(0x6f0)]();else{if(_0xcbea8(0x4e5)!==_0xcbea8(0x6e9))return VisuMZ[_0xcbea8(0x45d)][_0xcbea8(0xfb)][_0xcbea8(0x967)](this);else this[_0xcbea8(0x31d)]=_0x12c939;}},Game_Picture[_0x38072d(0x182)][_0x38072d(0x6f0)]=function(){const _0x25c06=_0x38072d,_0x3acf04=$gameMap['displayX']()*$gameMap[_0x25c06(0x6f4)]();return(this['_x']-_0x3acf04)*$gameScreen['zoomScale']();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x175)]=Game_Picture[_0x38072d(0x182)]['y'],Game_Picture[_0x38072d(0x182)]['y']=function(){const _0x525471=_0x38072d;return this[_0x525471(0x63c)]()?'mRQjm'!==_0x525471(0x60c)?_0x5aa983['Finish']||_0x525471(0x2fb):this[_0x525471(0x9fb)]():VisuMZ[_0x525471(0x45d)]['Game_Picture_y'][_0x525471(0x967)](this);},Game_Picture[_0x38072d(0x182)]['yScrollLinkedOffset']=function(){const _0x43f0fc=$gameMap['displayY']()*$gameMap['tileHeight']();return(this['_y']-_0x43f0fc)*$gameScreen['zoomScale']();},VisuMZ['CoreEngine'][_0x38072d(0x4dd)]=Game_Picture[_0x38072d(0x182)]['scaleX'],Game_Picture['prototype'][_0x38072d(0x713)]=function(){const _0x16f360=_0x38072d;let _0x5d5f31=VisuMZ[_0x16f360(0x45d)][_0x16f360(0x4dd)][_0x16f360(0x967)](this);return this['isMapScrollLinked']()&&(_0x5d5f31*=$gameScreen[_0x16f360(0x83a)]()),_0x5d5f31;},VisuMZ['CoreEngine'][_0x38072d(0x7e0)]=Game_Picture[_0x38072d(0x182)]['scaleY'],Game_Picture[_0x38072d(0x182)][_0x38072d(0x916)]=function(){const _0x4ac087=_0x38072d;let _0x3fccd7=VisuMZ['CoreEngine'][_0x4ac087(0x7e0)]['call'](this);return this['isMapScrollLinked']()&&('lWQtR'!=='lWQtR'?_0x2e2f79[_0x4ac087(0x624)]():_0x3fccd7*=$gameScreen[_0x4ac087(0x83a)]()),_0x3fccd7;},Game_Picture[_0x38072d(0x182)][_0x38072d(0x4d8)]=function(_0x7b705f){this['_coreEasingType']=_0x7b705f;},VisuMZ['CoreEngine'][_0x38072d(0x429)]=Game_Picture[_0x38072d(0x182)]['calcEasing'],Game_Picture[_0x38072d(0x182)][_0x38072d(0x34d)]=function(_0x1b9887){const _0x76757=_0x38072d;this[_0x76757(0x162)]=this['_coreEasingType']||0x0;if([0x0,0x1,0x2,0x3][_0x76757(0x2ac)](this[_0x76757(0x162)])){if(_0x76757(0x3ad)===_0x76757(0x625))_0x270ed0['playMiss'](),this[_0x76757(0x5c3)](_0x76757(0x6c3));else return VisuMZ['CoreEngine'][_0x76757(0x429)][_0x76757(0x967)](this,_0x1b9887);}else return VisuMZ['ApplyEasing'](_0x1b9887,this[_0x76757(0x162)]);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x973)]=Game_Picture[_0x38072d(0x182)][_0x38072d(0x927)],Game_Picture[_0x38072d(0x182)][_0x38072d(0x927)]=function(){const _0x2ca1a7=_0x38072d;VisuMZ[_0x2ca1a7(0x45d)]['Game_Picture_initRotation'][_0x2ca1a7(0x967)](this),this[_0x2ca1a7(0x3e3)]();},Game_Picture[_0x38072d(0x182)][_0x38072d(0x3e3)]=function(){const _0x597ae2=_0x38072d;this[_0x597ae2(0x4d5)]={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0x597ae2(0x894)};},VisuMZ[_0x38072d(0x45d)]['Game_Picture_angle']=Game_Picture[_0x38072d(0x182)][_0x38072d(0x203)],Game_Picture['prototype'][_0x38072d(0x203)]=function(){const _0x4639d4=_0x38072d;let _0x1b49c4=VisuMZ[_0x4639d4(0x45d)][_0x4639d4(0x815)][_0x4639d4(0x967)](this);return _0x1b49c4+=this[_0x4639d4(0x4c2)](),_0x1b49c4;},Game_Picture[_0x38072d(0x182)]['anglePlus']=function(){const _0x2183b2=_0x38072d;if(this[_0x2183b2(0x4d5)]===undefined)this[_0x2183b2(0x3e3)]();return this[_0x2183b2(0x4d5)]['current']||0x0;},Game_Picture[_0x38072d(0x182)]['setAnglePlusData']=function(_0x265aab,_0x5c5888,_0x57ca44){const _0x36a9cb=_0x38072d;if(this['_anglePlus']===undefined)this['initRotationCoreEngine']();this[_0x36a9cb(0x4d5)]['target']=_0x265aab||0x0,this[_0x36a9cb(0x4d5)][_0x36a9cb(0x622)]=_0x5c5888||0x0,this[_0x36a9cb(0x4d5)][_0x36a9cb(0x28f)]=_0x5c5888||0x0,this[_0x36a9cb(0x4d5)][_0x36a9cb(0x70c)]=_0x57ca44||_0x36a9cb(0x894),_0x5c5888<=0x0&&(this[_0x36a9cb(0x4d5)][_0x36a9cb(0x41b)]=this[_0x36a9cb(0x4d5)][_0x36a9cb(0x113)]);},Game_Picture['prototype']['changeAnglePlusData']=function(_0x1dba2f,_0x43d0c1,_0x5af88b){const _0x2b52e2=_0x38072d;if(this[_0x2b52e2(0x4d5)]===undefined)this[_0x2b52e2(0x3e3)]();this[_0x2b52e2(0x4d5)]['target']+=_0x1dba2f||0x0,this[_0x2b52e2(0x4d5)][_0x2b52e2(0x622)]=_0x43d0c1||0x0,this[_0x2b52e2(0x4d5)][_0x2b52e2(0x28f)]=_0x43d0c1||0x0,this[_0x2b52e2(0x4d5)][_0x2b52e2(0x70c)]=_0x5af88b||_0x2b52e2(0x894),_0x43d0c1<=0x0&&(this[_0x2b52e2(0x4d5)][_0x2b52e2(0x41b)]=this[_0x2b52e2(0x4d5)][_0x2b52e2(0x113)]);},VisuMZ['CoreEngine'][_0x38072d(0x85b)]=Game_Picture[_0x38072d(0x182)]['updateRotation'],Game_Picture[_0x38072d(0x182)][_0x38072d(0x51b)]=function(){const _0x341e7d=_0x38072d;VisuMZ['CoreEngine'][_0x341e7d(0x85b)]['call'](this),this['updateAnglePlus']();},Game_Picture[_0x38072d(0x182)][_0x38072d(0x5e7)]=function(){const _0x5b1daa=_0x38072d;if(this['_anglePlus']===undefined)this[_0x5b1daa(0x3e3)]();const _0x5aa263=this[_0x5b1daa(0x4d5)];if(_0x5aa263[_0x5b1daa(0x622)]<=0x0)return;_0x5aa263['current']=this['applyEasingAnglePlus'](_0x5aa263[_0x5b1daa(0x41b)],_0x5aa263[_0x5b1daa(0x113)]),_0x5aa263['duration']--,_0x5aa263[_0x5b1daa(0x622)]<=0x0&&(_0x5aa263[_0x5b1daa(0x41b)]=_0x5aa263[_0x5b1daa(0x113)]);},Game_Picture[_0x38072d(0x182)]['applyEasingAnglePlus']=function(_0x127b64,_0x328528){const _0x34a181=_0x38072d,_0x326062=this[_0x34a181(0x4d5)],_0x4bacca=_0x326062[_0x34a181(0x70c)],_0x4cfacd=_0x326062[_0x34a181(0x622)],_0x16c3d6=_0x326062[_0x34a181(0x28f)],_0x1913b1=VisuMZ[_0x34a181(0x9d6)]((_0x16c3d6-_0x4cfacd)/_0x16c3d6,_0x4bacca),_0x1753d3=VisuMZ[_0x34a181(0x9d6)]((_0x16c3d6-_0x4cfacd+0x1)/_0x16c3d6,_0x4bacca),_0x3007=(_0x127b64-_0x328528*_0x1913b1)/(0x1-_0x1913b1);return _0x3007+(_0x328528-_0x3007)*_0x1753d3;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x800)]=Game_Action[_0x38072d(0x182)][_0x38072d(0x6e3)],Game_Action[_0x38072d(0x182)][_0x38072d(0x6e3)]=function(_0x4a688e){const _0x59b7bc=_0x38072d;if(VisuMZ[_0x59b7bc(0x45d)][_0x59b7bc(0x75d)][_0x59b7bc(0x6a9)][_0x59b7bc(0x9d3)])return this[_0x59b7bc(0x1fc)](_0x4a688e);else{if(_0x59b7bc(0x2ea)===_0x59b7bc(0x2ea))return VisuMZ['CoreEngine']['Game_Action_itemHit']['call'](this,_0x4a688e);else{const _0x471fc7=_0x4ec403['currentClass']()[_0x59b7bc(0x25e)][_0x59b7bc(0x152)](/\\I\[(\d+)\]/gi,'');this['drawText'](_0x471fc7,_0x33894d,_0x5b0ad3,_0x1a9448);}}},Game_Action['prototype'][_0x38072d(0x1fc)]=function(_0x3e0a2f){const _0x3182e8=_0x38072d,_0xd2d8a=this['itemSuccessRate'](_0x3e0a2f),_0x2488c7=this['subjectHitRate'](_0x3e0a2f),_0x2b51bd=this[_0x3182e8(0x6e6)](_0x3e0a2f);return _0xd2d8a*(_0x2488c7-_0x2b51bd);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x546)]=Game_Action[_0x38072d(0x182)]['itemEva'],Game_Action[_0x38072d(0x182)]['itemEva']=function(_0x5eaa17){const _0x112687=_0x38072d;if(VisuMZ[_0x112687(0x45d)][_0x112687(0x75d)][_0x112687(0x6a9)]['ImprovedAccuracySystem']){if('fDBre'!==_0x112687(0x171)){const _0x39e4ca=_0x5202a9[_0x112687(0x729)]-_0x1f7a8['boxWidth']-_0x1f5ba1[_0x112687(0x45d)]['Settings']['UI'][_0x112687(0x133)]*0x2,_0x343bc8=_0x52c6e2[_0x112687(0x182)][_0x112687(0x35b)]['call'](this)*0x4;if(_0x39e4ca>=_0x343bc8)_0x384e21['setSideButtonLayout'](!![]);}else return 0x0;}else{if(_0x112687(0x5ec)==='MeDdE'){const _0x246daf=_0x9f5bd[_0x112687(0x1db)]['replace'](/[ ]/g,''),_0xccf468=_0xf8543['CodeJS'];_0x175a3c[_0x112687(0x45d)][_0x112687(0x5a4)](_0x246daf,_0xccf468);}else return VisuMZ[_0x112687(0x45d)][_0x112687(0x546)][_0x112687(0x967)](this,_0x5eaa17);}},Game_Action['prototype']['itemSuccessRate']=function(_0x53b0f9){const _0x50d45b=_0x38072d;return this['item']()[_0x50d45b(0x7bb)]*0.01;},Game_Action[_0x38072d(0x182)][_0x38072d(0x965)]=function(_0x166c1a){const _0x1fe349=_0x38072d;if(VisuMZ[_0x1fe349(0x45d)][_0x1fe349(0x75d)]['QoL'][_0x1fe349(0x419)]&&this['isItem']())return 0x1;if(this['isPhysical']()){if(_0x1fe349(0x29b)===_0x1fe349(0x29b)){if(VisuMZ[_0x1fe349(0x45d)][_0x1fe349(0x75d)][_0x1fe349(0x6a9)][_0x1fe349(0x419)]&&this[_0x1fe349(0x1df)]()[_0x1fe349(0x89b)]()){if('SogJm'!=='SogJm')_0x4f4785[_0x1fe349(0x45d)][_0x1fe349(0x468)]['call'](this),_0x40e80e[_0x1fe349(0x28d)](),this[_0x1fe349(0x8f1)]();else return this[_0x1fe349(0x1df)]()[_0x1fe349(0x65f)]+0.05;}else return this[_0x1fe349(0x1df)]()[_0x1fe349(0x65f)];}else this[_0x1fe349(0x208)][_0x1fe349(0x420)]();}else{if('FYMLk'!==_0x1fe349(0x90e))return 0x1;else{const _0x3f3b68='_stored_hpGaugeColor2';this[_0x1fe349(0x66d)]=this['_colorCache']||{};if(this[_0x1fe349(0x66d)][_0x3f3b68])return this['_colorCache'][_0x3f3b68];const _0x42590f=_0x23edab['CoreEngine'][_0x1fe349(0x75d)][_0x1fe349(0x190)][_0x1fe349(0x7d3)];return this['getColorDataFromPluginParameters'](_0x3f3b68,_0x42590f);}}},Game_Action[_0x38072d(0x182)][_0x38072d(0x6e6)]=function(_0x25c95e){const _0x13106e=_0x38072d;if(this[_0x13106e(0x1df)]()[_0x13106e(0x89b)]()===_0x25c95e[_0x13106e(0x89b)]())return 0x0;if(this[_0x13106e(0x9cf)]()){if(VisuMZ[_0x13106e(0x45d)][_0x13106e(0x75d)][_0x13106e(0x6a9)]['AccuracyBoost']&&_0x25c95e[_0x13106e(0x332)]())return _0x25c95e[_0x13106e(0x8ba)]-0.05;else{if(_0x13106e(0x2d2)!==_0x13106e(0x67f))return _0x25c95e[_0x13106e(0x8ba)];else this['_forcedTroopView']=_0x55c70a,this[_0x13106e(0xeb)]=_0x170192;}}else{if(this[_0x13106e(0x74e)]()){if(_0x13106e(0x614)!==_0x13106e(0x614)){const _0x1b9098=_0x485646['Symbol'];let _0x59cf46=_0x30cc00[_0x13106e(0x2a1)];if(['',_0x13106e(0x734)]['includes'](_0x59cf46))_0x59cf46=_0x35adb9[_0x13106e(0x527)]['call'](this);const _0x23b0df=_0x2ae90f[_0x13106e(0x5f1)][_0x13106e(0x967)](this),_0x4260f6=_0x2ac7ea[_0x13106e(0x73b)][_0x13106e(0x967)](this);this[_0x13106e(0x380)](_0x59cf46,_0x1b9098,_0x23b0df,_0x4260f6),this[_0x13106e(0x25a)](_0x1b9098,_0xd9d522['CallHandlerJS']['bind'](this,_0x4260f6));}else return _0x25c95e['mev'];}else return 0x0;}},VisuMZ['CoreEngine'][_0x38072d(0x32c)]=Game_Action[_0x38072d(0x182)][_0x38072d(0x5da)],Game_Action[_0x38072d(0x182)][_0x38072d(0x5da)]=function(_0x12cf88){const _0x786df2=_0x38072d;VisuMZ[_0x786df2(0x45d)]['Game_Action_updateLastTarget'][_0x786df2(0x967)](this,_0x12cf88);if(VisuMZ[_0x786df2(0x45d)][_0x786df2(0x75d)][_0x786df2(0x6a9)][_0x786df2(0x9d3)])return;const _0x4d5a00=_0x12cf88['result']();_0x4d5a00[_0x786df2(0x488)]&&(0x1-this[_0x786df2(0x2b9)](_0x12cf88)>this[_0x786df2(0x6e3)](_0x12cf88)&&(_0x4d5a00[_0x786df2(0x488)]=![],_0x4d5a00[_0x786df2(0x86a)]=!![]));},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x1c8)]=Game_BattlerBase['prototype'][_0x38072d(0x98f)],Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x98f)]=function(){const _0x57d131=_0x38072d;this[_0x57d131(0x1ee)]={},VisuMZ[_0x57d131(0x45d)][_0x57d131(0x1c8)][_0x57d131(0x967)](this);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x48c)]=Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x7c3)],Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x7c3)]=function(){const _0x56df91=_0x38072d;this[_0x56df91(0x1ee)]={},VisuMZ[_0x56df91(0x45d)]['Game_BattlerBase_refresh'][_0x56df91(0x967)](this);},Game_BattlerBase['prototype'][_0x38072d(0x2b1)]=function(_0x4786cc){const _0x5e0be8=_0x38072d;return this['_cache']=this['_cache']||{},this[_0x5e0be8(0x1ee)][_0x4786cc]!==undefined;},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x5ac)]=function(_0x1f30f5){const _0x5b7fd7=_0x38072d,_0x270710=(_0x31fd5e,_0x399233)=>{const _0x5e897f=_0x4a28;if(_0x5e897f(0x2f6)!==_0x5e897f(0x2f6)){var _0x3ec4b7=_0x37c77e(_0x294a97['$1']);try{_0x3c456d+=_0x2ba1d0(_0x3ec4b7);}catch(_0x84bd96){if(_0x391b0a[_0x5e897f(0x267)]())_0x4f45f5['log'](_0x84bd96);}}else{if(!_0x399233)return _0x31fd5e;if(_0x399233[_0x5e897f(0x673)][_0x5e897f(0x322)](VisuMZ[_0x5e897f(0x45d)][_0x5e897f(0x6d1)][_0x5e897f(0x5ac)][_0x1f30f5])){if(_0x5e897f(0x607)===_0x5e897f(0x8d2)){const _0x2036d5=_0x3bd8bf[_0x5e897f(0x406)],_0x404ed5=_0x109842[_0x5e897f(0x38c)]||'',_0x2def7d=_0x16832a['version']||'',_0x4a366d=_0x347c4f[_0x5e897f(0x45d)]['Settings']['MenuLayout'][_0x5e897f(0x4d2)]['DocumentTitleFmt'],_0x445a81=_0x4a366d[_0x5e897f(0x941)](_0x2036d5,_0x404ed5,_0x2def7d);_0x138428[_0x5e897f(0x8fe)]=_0x445a81;}else{var _0x2bc495=Number(RegExp['$1']);_0x31fd5e+=_0x2bc495;}}if(_0x399233[_0x5e897f(0x673)][_0x5e897f(0x322)](VisuMZ[_0x5e897f(0x45d)]['RegExp'][_0x5e897f(0x52a)][_0x1f30f5])){if('vofdV'!==_0x5e897f(0x763))_0x32be45+=_0x5e897f(0x945)[_0x5e897f(0x941)](_0x22f09c[_0x5e897f(0x17e)][0x0]);else{var _0x1d7f78=String(RegExp['$1']);try{_0x31fd5e+=eval(_0x1d7f78);}catch(_0x121ef5){if(_0x5e897f(0x8d8)!==_0x5e897f(0x8d8))return _0x6b75f[_0x5e897f(0x2e5)][_0x5e897f(0x967)](this);else{if($gameTemp['isPlaytest']())console[_0x5e897f(0x220)](_0x121ef5);}}}}return _0x31fd5e;}};return this['traitObjects']()[_0x5b7fd7(0x5d8)](_0x270710,this['_paramPlus'][_0x1f30f5]);},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x2c6)]=function(_0x5d37df){const _0x2af8df=_0x38072d;var _0x4dc608=_0x2af8df(0x1f1)+(this[_0x2af8df(0x89b)]()?_0x2af8df(0x765):_0x2af8df(0x689))+'ParamMax'+_0x5d37df;if(this['checkCacheKey'](_0x4dc608))return this['_cache'][_0x4dc608];this['_cache'][_0x4dc608]=eval(VisuMZ[_0x2af8df(0x45d)][_0x2af8df(0x75d)][_0x2af8df(0x651)][_0x4dc608]);const _0x5f57fe=(_0x2a8ca4,_0x46c57c)=>{const _0x4902e4=_0x2af8df;if(_0x4902e4(0x1cb)!==_0x4902e4(0x58b)){if(!_0x46c57c)return _0x2a8ca4;if(_0x46c57c[_0x4902e4(0x673)][_0x4902e4(0x322)](VisuMZ[_0x4902e4(0x45d)][_0x4902e4(0x6d1)][_0x4902e4(0x2c6)][_0x5d37df])){var _0x53ca4d=Number(RegExp['$1']);if(_0x53ca4d===0x0)_0x53ca4d=Number[_0x4902e4(0x471)];_0x2a8ca4=Math[_0x4902e4(0x285)](_0x2a8ca4,_0x53ca4d);}if(_0x46c57c[_0x4902e4(0x673)][_0x4902e4(0x322)](VisuMZ[_0x4902e4(0x45d)][_0x4902e4(0x6d1)]['paramMaxJS'][_0x5d37df])){var _0x452fa8=String(RegExp['$1']);try{_0x2a8ca4=Math[_0x4902e4(0x285)](_0x2a8ca4,Number(eval(_0x452fa8)));}catch(_0xe0765b){if($gameTemp[_0x4902e4(0x267)]())console[_0x4902e4(0x220)](_0xe0765b);}}return _0x2a8ca4;}else return _0x4187f2[_0x4902e4(0x182)][_0x4902e4(0x5d6)][_0x4902e4(0x967)](this,_0x4198f0);};if(this[_0x2af8df(0x1ee)][_0x4dc608]===0x0)this['_cache'][_0x4dc608]=Number[_0x2af8df(0x471)];return this['_cache'][_0x4dc608]=this[_0x2af8df(0x405)]()['reduce'](_0x5f57fe,this[_0x2af8df(0x1ee)][_0x4dc608]),this[_0x2af8df(0x1ee)][_0x4dc608];},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x7e6)]=function(_0x54ec81){const _0x238290=_0x38072d,_0x37bb74=this[_0x238290(0x76e)](Game_BattlerBase['TRAIT_PARAM'],_0x54ec81),_0x3240bd=(_0x3366f3,_0x1b8927)=>{const _0x5c751c=_0x238290;if(!_0x1b8927)return _0x3366f3;if(_0x1b8927[_0x5c751c(0x673)][_0x5c751c(0x322)](VisuMZ[_0x5c751c(0x45d)]['RegExp'][_0x5c751c(0x7d5)][_0x54ec81])){var _0x61c17c=Number(RegExp['$1'])/0x64;_0x3366f3*=_0x61c17c;}if(_0x1b8927['note']['match'](VisuMZ[_0x5c751c(0x45d)][_0x5c751c(0x6d1)][_0x5c751c(0x528)][_0x54ec81])){if('VkRCT'!==_0x5c751c(0x2c4))return!![];else{var _0x61c17c=Number(RegExp['$1']);_0x3366f3*=_0x61c17c;}}if(_0x1b8927[_0x5c751c(0x673)][_0x5c751c(0x322)](VisuMZ['CoreEngine'][_0x5c751c(0x6d1)][_0x5c751c(0x55b)][_0x54ec81])){if(_0x5c751c(0x509)!==_0x5c751c(0x2d6)){var _0x1a0465=String(RegExp['$1']);try{_0x3366f3*=eval(_0x1a0465);}catch(_0x348f57){if(_0x5c751c(0x62d)!==_0x5c751c(0x62d))_0x919b6c-=_0x29684b[_0x5c751c(0x182)][_0x5c751c(0x2ef)]();else{if($gameTemp[_0x5c751c(0x267)]())console['log'](_0x348f57);}}}else _0x3aad3f+=_0x3d97a3(_0x570320);}return _0x3366f3;};return this[_0x238290(0x405)]()[_0x238290(0x5d8)](_0x3240bd,_0x37bb74);},Game_BattlerBase['prototype']['paramFlatBonus']=function(_0xc94969){const _0x263abd=_0x38072d,_0x156162=(_0x13e7a2,_0x1a1321)=>{const _0x1ed57c=_0x4a28;if(!_0x1a1321)return _0x13e7a2;if(_0x1a1321[_0x1ed57c(0x673)][_0x1ed57c(0x322)](VisuMZ[_0x1ed57c(0x45d)]['RegExp']['paramFlat'][_0xc94969])){var _0x17849a=Number(RegExp['$1']);_0x13e7a2+=_0x17849a;}if(_0x1a1321[_0x1ed57c(0x673)][_0x1ed57c(0x322)](VisuMZ[_0x1ed57c(0x45d)][_0x1ed57c(0x6d1)][_0x1ed57c(0x9d2)][_0xc94969])){var _0x39f0a2=String(RegExp['$1']);try{_0x1ed57c(0x20a)!=='iPszS'?(this[_0x1ed57c(0x208)]=_0x2bae2e[_0x1ed57c(0x572)](this[_0x1ed57c(0x197)][_0x1ed57c(0x525)]),this[_0x1ed57c(0x208)][_0x1ed57c(0x955)](this[_0x1ed57c(0x4a5)]['bind'](this))):_0x13e7a2+=eval(_0x39f0a2);}catch(_0x31d798){if($gameTemp['isPlaytest']())console[_0x1ed57c(0x220)](_0x31d798);}}return _0x13e7a2;};return this['traitObjects']()[_0x263abd(0x5d8)](_0x156162,0x0);},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x73a)]=function(_0x5bc9c3){const _0x5b9291=_0x38072d;let _0x13dc0a=_0x5b9291(0x73a)+_0x5bc9c3+'Total';if(this['checkCacheKey'](_0x13dc0a))return this['_cache'][_0x13dc0a];return this[_0x5b9291(0x1ee)][_0x13dc0a]=Math[_0x5b9291(0x337)](VisuMZ[_0x5b9291(0x45d)][_0x5b9291(0x75d)]['Param'][_0x5b9291(0x36b)][_0x5b9291(0x967)](this,_0x5bc9c3)),this[_0x5b9291(0x1ee)][_0x13dc0a];},Game_BattlerBase['prototype'][_0x38072d(0x4c7)]=function(_0x99244b){const _0x5668a0=_0x38072d,_0x3d0e9f=(_0x577989,_0x3376ed)=>{const _0xdbe019=_0x4a28;if(!_0x3376ed)return _0x577989;if(_0x3376ed[_0xdbe019(0x673)][_0xdbe019(0x322)](VisuMZ['CoreEngine'][_0xdbe019(0x6d1)][_0xdbe019(0x863)][_0x99244b])){var _0x3d8bc8=Number(RegExp['$1'])/0x64;_0x577989+=_0x3d8bc8;}if(_0x3376ed[_0xdbe019(0x673)]['match'](VisuMZ['CoreEngine'][_0xdbe019(0x6d1)]['xparamPlus2'][_0x99244b])){if(_0xdbe019(0x665)!==_0xdbe019(0x3b0)){var _0x3d8bc8=Number(RegExp['$1']);_0x577989+=_0x3d8bc8;}else{let _0x56c831=_0x9664a9[_0xdbe019(0x12d)](_0x1b89b1)[_0xdbe019(0x51d)]();this[_0xdbe019(0x7a5)]()&&(_0x56c831=_0x1c7c23['GroupDigits'](_0x56c831));const _0xa5d4b2=this[_0xdbe019(0x70e)](),_0x598967=_0x4b5760[_0xdbe019(0x167)](_0xa5d4b2*0.75);for(let _0x2d025c=0x0;_0x2d025c<_0x56c831[_0xdbe019(0x3ec)];_0x2d025c++){const _0x585f96=this[_0xdbe019(0x7ef)](_0x598967,_0xa5d4b2);_0x585f96[_0xdbe019(0x208)][_0xdbe019(0x6a0)](_0x56c831[_0x2d025c],0x0,0x0,_0x598967,_0xa5d4b2,'center'),_0x585f96['x']=(_0x2d025c-(_0x56c831['length']-0x1)/0x2)*_0x598967,_0x585f96['dy']=-_0x2d025c;}}}if(_0x3376ed[_0xdbe019(0x673)][_0xdbe019(0x322)](VisuMZ[_0xdbe019(0x45d)][_0xdbe019(0x6d1)][_0xdbe019(0x360)][_0x99244b])){var _0x45b7a9=String(RegExp['$1']);try{if(_0xdbe019(0x9fa)!=='zuQCP'){if(_0x50a8ef&&_0x4e22f5[_0xdbe019(0x6c6)])return!![];}else _0x577989+=eval(_0x45b7a9);}catch(_0x753001){if(_0xdbe019(0x1c9)===_0xdbe019(0x1c9)){if($gameTemp[_0xdbe019(0x267)]())console['log'](_0x753001);}else _0x5eb317[_0xdbe019(0x45d)][_0xdbe019(0x151)]['call'](this);}}return _0x577989;};return this[_0x5668a0(0x405)]()['reduce'](_0x3d0e9f,0x0);},Game_BattlerBase[_0x38072d(0x182)]['xparamRate']=function(_0x9bd769){const _0x2e6a2f=(_0x41522b,_0x564a2e)=>{const _0x591979=_0x4a28;if('ABTAi'===_0x591979(0x77b))_0x593bf6=_0x591979(0x348)['format'](_0x254d90,_0x20ceb7);else{if(!_0x564a2e)return _0x41522b;if(_0x564a2e['note'][_0x591979(0x322)](VisuMZ[_0x591979(0x45d)][_0x591979(0x6d1)][_0x591979(0x3dc)][_0x9bd769])){if(_0x591979(0x606)!==_0x591979(0x2c9)){var _0xcb0812=Number(RegExp['$1'])/0x64;_0x41522b*=_0xcb0812;}else this[_0x591979(0xeb)]='STB';}if(_0x564a2e[_0x591979(0x673)][_0x591979(0x322)](VisuMZ['CoreEngine'][_0x591979(0x6d1)][_0x591979(0x2b8)][_0x9bd769])){var _0xcb0812=Number(RegExp['$1']);_0x41522b*=_0xcb0812;}if(_0x564a2e['note']['match'](VisuMZ[_0x591979(0x45d)][_0x591979(0x6d1)]['xparamRateJS'][_0x9bd769])){if(_0x591979(0x968)===_0x591979(0x968)){var _0x4bc816=String(RegExp['$1']);try{_0x41522b*=eval(_0x4bc816);}catch(_0x3ce2c2){if(_0x591979(0x95a)===_0x591979(0x837)){if(this['_texture'])_0x290616[_0x591979(0x45d)]['Sprite_destroy'][_0x591979(0x967)](this);this[_0x591979(0x1d1)]();}else{if($gameTemp[_0x591979(0x267)]())console['log'](_0x3ce2c2);}}}else this[_0x591979(0x553)]();}return _0x41522b;}};return this['traitObjects']()['reduce'](_0x2e6a2f,0x1);},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x634)]=function(_0x4aa64e){const _0x5735ad=_0x38072d,_0x2c26b2=(_0x7151fe,_0x4ba823)=>{const _0x9dbb60=_0x4a28;if(!_0x4ba823)return _0x7151fe;if(_0x4ba823[_0x9dbb60(0x673)][_0x9dbb60(0x322)](VisuMZ[_0x9dbb60(0x45d)]['RegExp'][_0x9dbb60(0x464)][_0x4aa64e])){var _0x4fca70=Number(RegExp['$1'])/0x64;_0x7151fe+=_0x4fca70;}if(_0x4ba823[_0x9dbb60(0x673)][_0x9dbb60(0x322)](VisuMZ['CoreEngine']['RegExp'][_0x9dbb60(0x101)][_0x4aa64e])){if(_0x9dbb60(0x7d6)!==_0x9dbb60(0x4b7)){var _0x4fca70=Number(RegExp['$1']);_0x7151fe+=_0x4fca70;}else{const _0x4965d1=this['paramWidth']();this[_0x9dbb60(0x9b2)](),this['drawText'](this['_actor'][_0x9dbb60(0x6db)](_0x181a8b,!![]),_0xddc937,_0x139dba,_0x4965d1,_0x9dbb60(0x16d));}}if(_0x4ba823['note']['match'](VisuMZ['CoreEngine'][_0x9dbb60(0x6d1)][_0x9dbb60(0x67c)][_0x4aa64e])){if('fyAUB'!=='VFWbD'){var _0x89f336=String(RegExp['$1']);try{_0x7151fe+=eval(_0x89f336);}catch(_0x4db8e8){if($gameTemp[_0x9dbb60(0x267)]())console[_0x9dbb60(0x220)](_0x4db8e8);}}else{const _0x5ef2b8=[this[_0x9dbb60(0x57b)],this[_0x9dbb60(0x2c1)]];for(const _0x360bb6 of _0x5ef2b8){_0x360bb6&&(_0x360bb6[_0x9dbb60(0x5de)]=this[_0x9dbb60(0x654)]()&&this[_0x9dbb60(0x921)]());}}}return _0x7151fe;};return this[_0x5735ad(0x405)]()[_0x5735ad(0x5d8)](_0x2c26b2,0x0);},Game_BattlerBase['prototype'][_0x38072d(0x80f)]=function(_0x1391f3){const _0x1f5a3a=_0x38072d;let _0x534806=_0x1f5a3a(0x80f)+_0x1391f3+_0x1f5a3a(0x6ec);if(this[_0x1f5a3a(0x2b1)](_0x534806))return this[_0x1f5a3a(0x1ee)][_0x534806];return this['_cache'][_0x534806]=VisuMZ[_0x1f5a3a(0x45d)][_0x1f5a3a(0x75d)][_0x1f5a3a(0x651)][_0x1f5a3a(0x78d)][_0x1f5a3a(0x967)](this,_0x1391f3),this['_cache'][_0x534806];},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x40f)]=function(_0x2389e1){const _0x25e5ba=_0x38072d,_0x13cb6b=(_0x368b1a,_0xd1be84)=>{const _0x5d2a2c=_0x4a28;if(!_0xd1be84)return _0x368b1a;if(_0xd1be84[_0x5d2a2c(0x673)][_0x5d2a2c(0x322)](VisuMZ['CoreEngine'][_0x5d2a2c(0x6d1)][_0x5d2a2c(0x4ad)][_0x2389e1])){var _0x2b55d8=Number(RegExp['$1'])/0x64;_0x368b1a+=_0x2b55d8;}if(_0xd1be84[_0x5d2a2c(0x673)][_0x5d2a2c(0x322)](VisuMZ['CoreEngine'][_0x5d2a2c(0x6d1)][_0x5d2a2c(0x5b6)][_0x2389e1])){if(_0x5d2a2c(0x585)==='sWMKh'){var _0x2b55d8=Number(RegExp['$1']);_0x368b1a+=_0x2b55d8;}else _0x11bf48[_0x5d2a2c(0x624)]&&_0x44e94f['endAnimation']();}if(_0xd1be84[_0x5d2a2c(0x673)][_0x5d2a2c(0x322)](VisuMZ[_0x5d2a2c(0x45d)][_0x5d2a2c(0x6d1)]['sparamPlusJS'][_0x2389e1])){var _0x2e8f88=String(RegExp['$1']);try{if(_0x5d2a2c(0x719)===_0x5d2a2c(0x719))_0x368b1a+=eval(_0x2e8f88);else{if(this[_0x5d2a2c(0x215)]()[_0x5d2a2c(0x4f4)]&&_0x422251[_0x5d2a2c(0x83a)]()===0x1){this[_0x5d2a2c(0x365)]=this[_0x5d2a2c(0x215)]()['displayY'];return;}_0x2c0c5a['CoreEngine'][_0x5d2a2c(0x63d)][_0x5d2a2c(0x967)](this,_0x52fe96);}}catch(_0x2f9d6f){if($gameTemp[_0x5d2a2c(0x267)]())console[_0x5d2a2c(0x220)](_0x2f9d6f);}}return _0x368b1a;};return this[_0x25e5ba(0x405)]()[_0x25e5ba(0x5d8)](_0x13cb6b,0x0);},Game_BattlerBase[_0x38072d(0x182)]['sparamRate']=function(_0x4428e0){const _0x4bffe1=_0x38072d,_0x265c36=(_0x85e916,_0x61f2e)=>{const _0x5967e1=_0x4a28;if(!_0x61f2e)return _0x85e916;if(_0x61f2e[_0x5967e1(0x673)][_0x5967e1(0x322)](VisuMZ[_0x5967e1(0x45d)][_0x5967e1(0x6d1)]['sparamRate1'][_0x4428e0])){var _0x496279=Number(RegExp['$1'])/0x64;_0x85e916*=_0x496279;}if(_0x61f2e[_0x5967e1(0x673)]['match'](VisuMZ[_0x5967e1(0x45d)]['RegExp'][_0x5967e1(0x7bd)][_0x4428e0])){var _0x496279=Number(RegExp['$1']);_0x85e916*=_0x496279;}if(_0x61f2e[_0x5967e1(0x673)][_0x5967e1(0x322)](VisuMZ['CoreEngine'][_0x5967e1(0x6d1)][_0x5967e1(0x494)][_0x4428e0])){var _0x11ef6d=String(RegExp['$1']);try{if('Mbyjq'!==_0x5967e1(0x358))_0x85e916*=eval(_0x11ef6d);else{if(_0x434d67)_0x538a11[_0x5967e1(0x6d9)](_0x44eea9);}}catch(_0x53cd72){if(_0x5967e1(0x3f2)!==_0x5967e1(0x6df)){if($gameTemp[_0x5967e1(0x267)]())console['log'](_0x53cd72);}else _0x8c4a36[_0x5967e1(0x45d)][_0x5967e1(0x561)][_0x5967e1(0x967)](this),_0x2d11bf=null,_0x3a65ee=null,_0xc9de27=null,_0x30f0dc=null;}}return _0x85e916;};return this[_0x4bffe1(0x405)]()[_0x4bffe1(0x5d8)](_0x265c36,0x1);},Game_BattlerBase[_0x38072d(0x182)]['sparamFlatBonus']=function(_0x587bc1){const _0x45feeb=_0x38072d,_0xbb8d2e=(_0x47cdc9,_0x4a31de)=>{const _0xb39718=_0x4a28;if(_0xb39718(0x7f8)===_0xb39718(0x7f8)){if(!_0x4a31de)return _0x47cdc9;if(_0x4a31de[_0xb39718(0x673)][_0xb39718(0x322)](VisuMZ['CoreEngine'][_0xb39718(0x6d1)][_0xb39718(0x81a)][_0x587bc1])){if(_0xb39718(0x425)===_0xb39718(0x3a9))_0x47231e=_0x365b9f[_0xb39718(0x9ae)](_0x41983b);else{var _0x4d3f60=Number(RegExp['$1'])/0x64;_0x47cdc9+=_0x4d3f60;}}if(_0x4a31de[_0xb39718(0x673)][_0xb39718(0x322)](VisuMZ[_0xb39718(0x45d)][_0xb39718(0x6d1)][_0xb39718(0x43d)][_0x587bc1])){var _0x4d3f60=Number(RegExp['$1']);_0x47cdc9+=_0x4d3f60;}if(_0x4a31de['note']['match'](VisuMZ[_0xb39718(0x45d)][_0xb39718(0x6d1)]['sparamFlatJS'][_0x587bc1])){var _0x481d5c=String(RegExp['$1']);try{_0x47cdc9+=eval(_0x481d5c);}catch(_0x551ced){if(_0xb39718(0x6b5)===_0xb39718(0x3db))return!![];else{if($gameTemp['isPlaytest']())console[_0xb39718(0x220)](_0x551ced);}}}return _0x47cdc9;}else return _0x2216ad[_0xb39718(0x76d)][_0xb39718(0x967)](this);};return this[_0x45feeb(0x405)]()[_0x45feeb(0x5d8)](_0xbb8d2e,0x0);},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x352)]=function(_0x33b392){const _0x1e50be=_0x38072d;let _0x27622a=_0x1e50be(0x352)+_0x33b392+'Total';if(this[_0x1e50be(0x2b1)](_0x27622a))return this[_0x1e50be(0x1ee)][_0x27622a];return this[_0x1e50be(0x1ee)][_0x27622a]=VisuMZ[_0x1e50be(0x45d)]['Settings'][_0x1e50be(0x651)][_0x1e50be(0x677)][_0x1e50be(0x967)](this,_0x33b392),this['_cache'][_0x27622a];},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x6db)]=function(_0x4f1423,_0x55f9d6){const _0x2ff593=_0x38072d;if(typeof paramId===_0x2ff593(0x496))return this[_0x2ff593(0x73a)](_0x4f1423);_0x4f1423=String(_0x4f1423||'')[_0x2ff593(0x994)]();if(_0x4f1423===_0x2ff593(0x84a))return this['param'](0x0);if(_0x4f1423===_0x2ff593(0x847))return this[_0x2ff593(0x73a)](0x1);if(_0x4f1423===_0x2ff593(0x7d8))return this[_0x2ff593(0x73a)](0x2);if(_0x4f1423===_0x2ff593(0x3a3))return this[_0x2ff593(0x73a)](0x3);if(_0x4f1423===_0x2ff593(0x252))return this[_0x2ff593(0x73a)](0x4);if(_0x4f1423===_0x2ff593(0x623))return this[_0x2ff593(0x73a)](0x5);if(_0x4f1423===_0x2ff593(0x670))return this[_0x2ff593(0x73a)](0x6);if(_0x4f1423===_0x2ff593(0x307))return this['param'](0x7);if(_0x4f1423===_0x2ff593(0x1ab))return _0x55f9d6?String(Math['round'](this[_0x2ff593(0x80f)](0x0)*0x64))+'%':this[_0x2ff593(0x80f)](0x0);if(_0x4f1423==='EVA')return _0x55f9d6?String(Math[_0x2ff593(0x337)](this['xparam'](0x1)*0x64))+'%':this['xparam'](0x1);if(_0x4f1423===_0x2ff593(0x76c))return _0x55f9d6?String(Math['round'](this[_0x2ff593(0x80f)](0x2)*0x64))+'%':this[_0x2ff593(0x80f)](0x2);if(_0x4f1423===_0x2ff593(0x23e))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x80f)](0x3)*0x64))+'%':this[_0x2ff593(0x80f)](0x3);if(_0x4f1423===_0x2ff593(0x529))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x80f)](0x4)*0x64))+'%':this[_0x2ff593(0x80f)](0x4);if(_0x4f1423===_0x2ff593(0x174))return _0x55f9d6?String(Math['round'](this[_0x2ff593(0x80f)](0x5)*0x64))+'%':this[_0x2ff593(0x80f)](0x5);if(_0x4f1423==='CNT')return _0x55f9d6?String(Math[_0x2ff593(0x337)](this['xparam'](0x6)*0x64))+'%':this[_0x2ff593(0x80f)](0x6);if(_0x4f1423==='HRG')return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x80f)](0x7)*0x64))+'%':this[_0x2ff593(0x80f)](0x7);if(_0x4f1423===_0x2ff593(0x52f))return _0x55f9d6?String(Math['round'](this[_0x2ff593(0x80f)](0x8)*0x64))+'%':this[_0x2ff593(0x80f)](0x8);if(_0x4f1423===_0x2ff593(0x4cd))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x80f)](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x4f1423===_0x2ff593(0x4d0))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x352)](0x0)*0x64))+'%':this[_0x2ff593(0x352)](0x0);if(_0x4f1423===_0x2ff593(0x5ed))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x352)](0x1)*0x64))+'%':this[_0x2ff593(0x352)](0x1);if(_0x4f1423===_0x2ff593(0x2f5))return _0x55f9d6?String(Math['round'](this[_0x2ff593(0x352)](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x4f1423===_0x2ff593(0x64c))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this['sparam'](0x3)*0x64))+'%':this['sparam'](0x3);if(_0x4f1423===_0x2ff593(0x20c))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x352)](0x4)*0x64))+'%':this[_0x2ff593(0x352)](0x4);if(_0x4f1423===_0x2ff593(0x8bf))return _0x55f9d6?String(Math['round'](this['sparam'](0x5)*0x64))+'%':this[_0x2ff593(0x352)](0x5);if(_0x4f1423===_0x2ff593(0x1e5))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x352)](0x6)*0x64))+'%':this['sparam'](0x6);if(_0x4f1423===_0x2ff593(0x25f))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x352)](0x7)*0x64))+'%':this[_0x2ff593(0x352)](0x7);if(_0x4f1423===_0x2ff593(0x436))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x352)](0x8)*0x64))+'%':this[_0x2ff593(0x352)](0x8);if(_0x4f1423===_0x2ff593(0x526))return _0x55f9d6?String(Math[_0x2ff593(0x337)](this[_0x2ff593(0x352)](0x9)*0x64))+'%':this[_0x2ff593(0x352)](0x9);if(VisuMZ[_0x2ff593(0x45d)][_0x2ff593(0x37f)][_0x4f1423]){const _0x283109=VisuMZ[_0x2ff593(0x45d)][_0x2ff593(0x37f)][_0x4f1423],_0x1932b4=this[_0x283109];if(VisuMZ[_0x2ff593(0x45d)][_0x2ff593(0x260)][_0x4f1423]===_0x2ff593(0x6a8)){if(_0x2ff593(0x588)===_0x2ff593(0x588))return _0x1932b4;else _0x2a03a5[_0x2ff593(0x45d)][_0x2ff593(0x9d9)]['call'](this);}else return _0x55f9d6?String(Math[_0x2ff593(0x337)](_0x1932b4*0x64))+'%':_0x1932b4;}return'';},Game_BattlerBase[_0x38072d(0x182)][_0x38072d(0x32b)]=function(){const _0xda9760=_0x38072d;return this[_0xda9760(0x2f8)]()&&this[_0xda9760(0x183)]<this[_0xda9760(0x5d4)]*VisuMZ[_0xda9760(0x45d)][_0xda9760(0x75d)][_0xda9760(0x651)][_0xda9760(0x8e0)];},Game_Battler[_0x38072d(0x182)][_0x38072d(0x760)]=function(){const _0x14e33a=_0x38072d;SoundManager['playMiss'](),this[_0x14e33a(0x5c3)](_0x14e33a(0x6c3));},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x7ff)]=Game_Actor[_0x38072d(0x182)][_0x38072d(0x9a2)],Game_Actor[_0x38072d(0x182)]['paramBase']=function(_0x33bffa){const _0x21c745=_0x38072d;if(this[_0x21c745(0x158)]>0x63)return this[_0x21c745(0x704)](_0x33bffa);return VisuMZ[_0x21c745(0x45d)]['Game_Actor_paramBase'][_0x21c745(0x967)](this,_0x33bffa);},Game_Actor[_0x38072d(0x182)][_0x38072d(0x704)]=function(_0x241ba8){const _0x16311b=_0x38072d,_0x47d875=this['currentClass']()[_0x16311b(0x7de)][_0x241ba8][0x63],_0x25d958=this[_0x16311b(0x23c)]()[_0x16311b(0x7de)][_0x241ba8][0x62];return _0x47d875+(_0x47d875-_0x25d958)*(this[_0x16311b(0x158)]-0x63);},VisuMZ['CoreEngine'][_0x38072d(0x131)]=Game_Actor[_0x38072d(0x182)][_0x38072d(0x8a3)],Game_Actor[_0x38072d(0x182)]['changeClass']=function(_0x52282d,_0x2989b2){const _0x45bfad=_0x38072d;$gameTemp[_0x45bfad(0x68a)]=!![],VisuMZ['CoreEngine'][_0x45bfad(0x131)][_0x45bfad(0x967)](this,_0x52282d,_0x2989b2),$gameTemp[_0x45bfad(0x68a)]=undefined;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x1ae)]=Game_Actor[_0x38072d(0x182)][_0x38072d(0x53c)],Game_Actor['prototype']['levelUp']=function(){const _0x5a43a6=_0x38072d;VisuMZ[_0x5a43a6(0x45d)][_0x5a43a6(0x1ae)][_0x5a43a6(0x967)](this);if(!$gameTemp[_0x5a43a6(0x68a)])this[_0x5a43a6(0x548)]();},Game_Actor[_0x38072d(0x182)][_0x38072d(0x548)]=function(){const _0x507823=_0x38072d;this[_0x507823(0x1ee)]={};if(VisuMZ[_0x507823(0x45d)][_0x507823(0x75d)][_0x507823(0x6a9)]['LevelUpFullHp'])this[_0x507823(0x183)]=this[_0x507823(0x5d4)];if(VisuMZ[_0x507823(0x45d)]['Settings'][_0x507823(0x6a9)]['LevelUpFullMp'])this[_0x507823(0x32d)]=this[_0x507823(0x46f)];},Game_Actor[_0x38072d(0x182)]['expRate']=function(){const _0x2fbc14=_0x38072d;if(this[_0x2fbc14(0x8ea)]())return 0x1;const _0x836d80=this[_0x2fbc14(0x7ce)]()-this[_0x2fbc14(0x418)](),_0x2694a2=this[_0x2fbc14(0x292)]()-this[_0x2fbc14(0x418)]();return(_0x2694a2/_0x836d80)[_0x2fbc14(0x480)](0x0,0x1);},Game_Actor[_0x38072d(0x182)]['traitObjects']=function(){const _0x113438=_0x38072d,_0x507915=Game_Battler['prototype']['traitObjects'][_0x113438(0x967)](this);for(const _0x5cc552 of this[_0x113438(0x879)]()){_0x113438(0x20b)===_0x113438(0x20b)?_0x5cc552&&_0x507915[_0x113438(0x534)](_0x5cc552):_0x44ccd5['CoreEngine']['Window_Selectable_cursorUp'][_0x113438(0x967)](this,_0x227daf);}return _0x507915['push'](this[_0x113438(0x23c)](),this[_0x113438(0x4ef)]()),_0x507915;},Object[_0x38072d(0x1eb)](Game_Enemy[_0x38072d(0x182)],'level',{'get':function(){const _0x259783=_0x38072d;return this[_0x259783(0x18b)]();},'configurable':!![]}),Game_Enemy['prototype']['getLevel']=function(){const _0xf5e956=_0x38072d;return this[_0xf5e956(0x74d)]()['level'];},Game_Enemy[_0x38072d(0x182)][_0x38072d(0x627)]=function(){const _0x4e7463=_0x38072d;!this['_repositioned']&&(this[_0x4e7463(0x58c)]+=Math[_0x4e7463(0x337)]((Graphics[_0x4e7463(0x486)]-0x270)/0x2),this['_screenY']-=Math[_0x4e7463(0x167)]((Graphics[_0x4e7463(0x486)]-Graphics[_0x4e7463(0x15b)])/0x2),$gameSystem[_0x4e7463(0x79a)]()?this[_0x4e7463(0x9f8)]-=Math[_0x4e7463(0x167)]((Graphics[_0x4e7463(0x729)]-Graphics[_0x4e7463(0x5d0)])/0x2):this[_0x4e7463(0x9f8)]+=Math[_0x4e7463(0x337)]((Graphics[_0x4e7463(0x5d0)]-0x330)/0x2)),this[_0x4e7463(0x61a)]=!![];},Game_Party['prototype']['maxGold']=function(){const _0xa62703=_0x38072d;return VisuMZ['CoreEngine'][_0xa62703(0x75d)][_0xa62703(0x373)]['GoldMax'];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x900)]=Game_Party[_0x38072d(0x182)][_0x38072d(0x6f3)],Game_Party[_0x38072d(0x182)][_0x38072d(0x6f3)]=function(_0x468c84){const _0x3750db=_0x38072d;if(VisuMZ[_0x3750db(0x45d)][_0x3750db(0x75d)][_0x3750db(0x6a9)][_0x3750db(0x823)]&&DataManager[_0x3750db(0x768)](_0x468c84))return;VisuMZ['CoreEngine'][_0x3750db(0x900)][_0x3750db(0x967)](this,_0x468c84);},Game_Party[_0x38072d(0x182)][_0x38072d(0x5fd)]=function(){const _0x553e34=_0x38072d,_0x4e394b=VisuMZ[_0x553e34(0x45d)][_0x553e34(0x75d)][_0x553e34(0x6a9)],_0x3f0d84=_0x4e394b[_0x553e34(0x75c)]??0x63;let _0x4a336b=[];(_0x4e394b[_0x553e34(0x669)]??!![])&&(_0x4a336b=_0x4a336b[_0x553e34(0xa01)]($dataItems));(_0x4e394b['BTestWeapons']??!![])&&(_0x4a336b=_0x4a336b[_0x553e34(0xa01)]($dataWeapons));(_0x4e394b[_0x553e34(0x6ea)]??!![])&&(_0x4a336b=_0x4a336b[_0x553e34(0xa01)]($dataArmors));for(const _0x12eb02 of _0x4a336b){if(_0x553e34(0x390)!==_0x553e34(0x2f7)){if(!_0x12eb02)continue;if(_0x12eb02[_0x553e34(0x25e)][_0x553e34(0x5bd)]()<=0x0)continue;if(_0x12eb02[_0x553e34(0x25e)][_0x553e34(0x322)](/-----/i))continue;this[_0x553e34(0x982)](_0x12eb02,_0x3f0d84);}else return 0.5*_0x1dc686['pow'](0x2,0xa*_0x4e3146);}},VisuMZ['CoreEngine']['Game_Troop_setup']=Game_Troop['prototype'][_0x38072d(0x554)],Game_Troop['prototype'][_0x38072d(0x554)]=function(_0x39b8d0){const _0xb4c07=_0x38072d;$gameTemp[_0xb4c07(0x28d)](),$gameTemp[_0xb4c07(0x143)](_0x39b8d0),VisuMZ[_0xb4c07(0x45d)][_0xb4c07(0xf4)]['call'](this,_0x39b8d0);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x8b0)]=Game_Map[_0x38072d(0x182)][_0x38072d(0x554)],Game_Map[_0x38072d(0x182)][_0x38072d(0x554)]=function(_0x109d6b){const _0x43a1bf=_0x38072d;VisuMZ[_0x43a1bf(0x45d)]['Game_Map_setup'][_0x43a1bf(0x967)](this,_0x109d6b),this[_0x43a1bf(0x5c1)](),this[_0x43a1bf(0x859)](_0x109d6b);},Game_Map['prototype']['setupCoreEngine']=function(){const _0x2e9e44=_0x38072d;this[_0x2e9e44(0x253)]=VisuMZ['CoreEngine'][_0x2e9e44(0x75d)][_0x2e9e44(0x6a9)][_0x2e9e44(0x9b0)]||![];const _0x126e68=VisuMZ[_0x2e9e44(0x45d)][_0x2e9e44(0x75d)][_0x2e9e44(0x27f)],_0x1bb578=$dataMap?$dataMap[_0x2e9e44(0x673)]||'':'';if(_0x1bb578[_0x2e9e44(0x322)](/<SHOW TILE SHADOWS>/i))this['_hideTileShadows']=![];else _0x1bb578['match'](/<HIDE TILE SHADOWS>/i)&&(this[_0x2e9e44(0x253)]=!![]);if(_0x1bb578[_0x2e9e44(0x322)](/<SCROLL LOCK X>/i)){if(_0x2e9e44(0x207)===_0x2e9e44(0x73d)){const _0x155f8b=_0x54c06e[_0x2e9e44(0x119)](_0x5b8b03,{'to':'string','level':0x1});if(_0x155f8b['length']>=0xc350){}_0xfaa622(_0x155f8b);}else this[_0x2e9e44(0x215)]()[_0x2e9e44(0x8ab)]=!![],this[_0x2e9e44(0x215)]()['displayX']=_0x126e68['DisplayLockX'];}else _0x1bb578['match'](/<SCROLL LOCK X: (.*?)>/i)&&(this[_0x2e9e44(0x215)]()['centerX']=!![],this['centerCameraCheckData']()[_0x2e9e44(0x5a6)]=Number(RegExp['$1']));if(_0x1bb578['match'](/<SCROLL LOCK Y>/i)){if(_0x2e9e44(0x138)===_0x2e9e44(0x138))this[_0x2e9e44(0x215)]()[_0x2e9e44(0x4f4)]=!![],this[_0x2e9e44(0x215)]()[_0x2e9e44(0x7a0)]=_0x126e68[_0x2e9e44(0x942)];else{_0x3dd89e['ConvertParams'](_0x5762ed,_0x4307b5);const _0x5ba0b3=_0x2e3f45[_0x2e9e44(0x337)](_0x3c2a7f['pitch'])[_0x2e9e44(0x480)](0x32,0x96),_0x24c60a=_0x128345[_0x2e9e44(0x4d9)];_0x24c60a&&(_0x24c60a[_0x2e9e44(0x991)]=_0x5ba0b3,_0x24c60a[_0x2e9e44(0x7a7)]=_0x5aeca2['_bgmBuffer'][_0x2e9e44(0x50a)](),_0xc0f51['updateBgmParameters'](_0x24c60a),_0x2d8ead[_0x2e9e44(0x5e9)](_0x24c60a,_0x24c60a[_0x2e9e44(0x7a7)]),_0x13b326[_0x2e9e44(0x8c7)][_0x2e9e44(0x240)](_0x24c60a[_0x2e9e44(0x7a7)]));}}else _0x1bb578[_0x2e9e44(0x322)](/<SCROLL LOCK Y: (.*?)>/i)&&(this[_0x2e9e44(0x215)]()['centerY']=!![],this[_0x2e9e44(0x215)]()[_0x2e9e44(0x7a0)]=Number(RegExp['$1']));},Game_Map['prototype'][_0x38072d(0x696)]=function(){const _0x1efb26=_0x38072d;if(this[_0x1efb26(0x253)]===undefined)this['setupCoreEngine']();return this[_0x1efb26(0x253)];},Game_Map[_0x38072d(0x182)][_0x38072d(0x5c1)]=function(){const _0x1829b9=_0x38072d,_0x47585c=VisuMZ['CoreEngine'][_0x1829b9(0x75d)][_0x1829b9(0x27f)];this[_0x1829b9(0x608)]={'centerX':![],'centerY':![],'displayX':0x0,'displayY':0x0};if(_0x47585c[_0x1829b9(0x1c4)]){const _0x576209=Graphics[_0x1829b9(0x729)]/this[_0x1829b9(0x6f4)]();_0x576209%0x1!==0x0&&Math['ceil'](_0x576209)===this[_0x1829b9(0x729)]()&&!this['isLoopHorizontal']()&&(this[_0x1829b9(0x608)][_0x1829b9(0x8ab)]=!![],this[_0x1829b9(0x608)][_0x1829b9(0x5a6)]=_0x47585c[_0x1829b9(0x720)]||0x0);}if(_0x47585c[_0x1829b9(0x59b)]){const _0x54b88f=Graphics[_0x1829b9(0x486)]/this[_0x1829b9(0x94c)]();_0x54b88f%0x1!==0x0&&Math[_0x1829b9(0x421)](_0x54b88f)===this[_0x1829b9(0x486)]()&&!this[_0x1829b9(0x13f)]()&&(_0x1829b9(0x925)!==_0x1829b9(0x925)?_0x4a127b[_0x1829b9(0x624)]&&_0x3e616b[_0x1829b9(0x624)]():(this[_0x1829b9(0x608)][_0x1829b9(0x4f4)]=!![],this[_0x1829b9(0x608)][_0x1829b9(0x7a0)]=_0x47585c[_0x1829b9(0x942)]||0x0));}},Game_Map[_0x38072d(0x182)][_0x38072d(0x215)]=function(){if(this['_centerCameraCheck']===undefined)this['checkCoreEngineDisplayCenter']();return this['_centerCameraCheck'];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x63d)]=Game_Map[_0x38072d(0x182)][_0x38072d(0x6ce)],Game_Map[_0x38072d(0x182)][_0x38072d(0x6ce)]=function(_0x18d3fc){const _0x779397=_0x38072d;if(this['centerCameraCheckData']()[_0x779397(0x4f4)]&&$gameScreen['zoomScale']()===0x1){if('GnPLR'!==_0x779397(0x7bc))this[_0x779397(0x6e1)][_0x779397(0x70e)]+=0x6;else{this[_0x779397(0x365)]=this['centerCameraCheckData']()['displayY'];return;}}VisuMZ[_0x779397(0x45d)][_0x779397(0x63d)][_0x779397(0x967)](this,_0x18d3fc);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x78a)]=Game_Map[_0x38072d(0x182)][_0x38072d(0x481)],Game_Map[_0x38072d(0x182)]['scrollLeft']=function(_0x324d65){const _0x369883=_0x38072d;if(this['centerCameraCheckData']()['centerX']&&$gameScreen[_0x369883(0x83a)]()===0x1){if(_0x369883(0x452)===_0x369883(0x952))return _0xa50a02[_0x369883(0x45d)][_0x369883(0x429)][_0x369883(0x967)](this,_0x1477f1);else{this[_0x369883(0x98c)]=this[_0x369883(0x215)]()['displayX'];return;}}VisuMZ[_0x369883(0x45d)][_0x369883(0x78a)][_0x369883(0x967)](this,_0x324d65);},VisuMZ['CoreEngine'][_0x38072d(0x66a)]=Game_Map[_0x38072d(0x182)][_0x38072d(0x7cd)],Game_Map['prototype'][_0x38072d(0x7cd)]=function(_0x23f1c0){const _0x54f3a0=_0x38072d;if(this[_0x54f3a0(0x215)]()[_0x54f3a0(0x8ab)]&&$gameScreen[_0x54f3a0(0x83a)]()===0x1){this[_0x54f3a0(0x98c)]=this['centerCameraCheckData']()['displayX'];return;}VisuMZ['CoreEngine'][_0x54f3a0(0x66a)]['call'](this,_0x23f1c0);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x9a3)]=Game_Map[_0x38072d(0x182)]['scrollUp'],Game_Map[_0x38072d(0x182)][_0x38072d(0x317)]=function(_0x21f580){const _0x17d6a8=_0x38072d;if(this[_0x17d6a8(0x215)]()['centerY']&&$gameScreen[_0x17d6a8(0x83a)]()===0x1){this[_0x17d6a8(0x365)]=this[_0x17d6a8(0x215)]()[_0x17d6a8(0x7a0)];return;}VisuMZ[_0x17d6a8(0x45d)]['Game_Map_scrollUp'][_0x17d6a8(0x967)](this,_0x21f580);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x163)]=Game_Character[_0x38072d(0x182)]['processMoveCommand'],Game_Character['prototype']['processMoveCommand']=function(_0x415e0f){const _0x57945c=_0x38072d;try{_0x57945c(0x4c8)===_0x57945c(0x4c8)?VisuMZ['CoreEngine']['Game_Character_processMoveCommand'][_0x57945c(0x967)](this,_0x415e0f):(_0x48d19e[_0x57945c(0x45d)]['Scene_Status_create'][_0x57945c(0x967)](this),this['setCoreEngineUpdateWindowBg']());}catch(_0x599214){if($gameTemp[_0x57945c(0x267)]())console[_0x57945c(0x220)](_0x599214);}},Game_Player[_0x38072d(0x182)]['makeEncounterCount']=function(){const _0xcbaa37=_0x38072d,_0x11db6c=$gameMap['encounterStep']();this[_0xcbaa37(0x9c5)]=Math[_0xcbaa37(0x4d6)](_0x11db6c)+Math[_0xcbaa37(0x4d6)](_0x11db6c)+this['encounterStepsMinimum']();},Game_Player[_0x38072d(0x182)][_0x38072d(0x136)]=function(){const _0x45491b=_0x38072d;return $dataMap&&$dataMap[_0x45491b(0x673)]&&$dataMap[_0x45491b(0x673)][_0x45491b(0x322)](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x45491b(0x45d)]['Settings'][_0x45491b(0x6a9)][_0x45491b(0x671)];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x822)]=Game_Event[_0x38072d(0x182)][_0x38072d(0x16a)],Game_Event[_0x38072d(0x182)][_0x38072d(0x16a)]=function(_0x348652,_0x1d13ea){const _0x1b7434=_0x38072d;if(this[_0x1b7434(0x564)]())return this[_0x1b7434(0x31f)](_0x348652,_0x1d13ea);else{if('HOGnS'!=='HOGnS')this['smoothSelect'](_0x5beef3[_0x1b7434(0x285)](this['index'](),this['maxItems']()-0x1));else return VisuMZ[_0x1b7434(0x45d)][_0x1b7434(0x822)][_0x1b7434(0x967)](this,_0x348652,_0x1d13ea);}},Game_Event[_0x38072d(0x182)][_0x38072d(0x564)]=function(){const _0x2f3c31=_0x38072d;return VisuMZ[_0x2f3c31(0x45d)][_0x2f3c31(0x75d)][_0x2f3c31(0x6a9)][_0x2f3c31(0x9c7)];},Game_Event['prototype'][_0x38072d(0x31f)]=function(_0x3aad76,_0x4e293e){const _0x1f1169=_0x38072d;if(!this[_0x1f1169(0x96d)]()){if(_0x1f1169(0x5bf)===_0x1f1169(0x364)){_0x27bddd[_0x1f1169(0x45d)]['Scene_Battle_createSpritesetFix']['call'](this);const _0x42879c=this[_0x1f1169(0x6ba)][_0x1f1169(0x300)];if(_0x42879c)this['addChild'](_0x42879c);}else return![];}else{if('GNEmi'!=='UxXvi'){const _0x2bfbee=$gameMap[_0x1f1169(0x2d4)](_0x3aad76,_0x4e293e)[_0x1f1169(0x1e9)](_0x4382a3=>_0x4382a3[_0x1f1169(0x96d)]());return _0x2bfbee[_0x1f1169(0x3ec)]>0x0;}else return 0x3;}},VisuMZ[_0x38072d(0x45d)]['Game_Interpreter_command105']=Game_Interpreter['prototype'][_0x38072d(0x77d)],Game_Interpreter[_0x38072d(0x182)][_0x38072d(0x77d)]=function(_0x1195dc){const _0x12208b=_0x38072d,_0x367454=this['getCombinedScrollingText']();if(_0x367454[_0x12208b(0x322)](/\/\/[ ]SCRIPT[ ]CALL/i))return this[_0x12208b(0x27e)](_0x367454);else{if(_0x12208b(0x577)===_0x12208b(0x56b)){this['_lastOrigin']=_0x12208b(0x4df),this[_0x12208b(0x2d8)]='nah',this['_lastY']='nah';const _0x3dccce=this[_0x12208b(0x3e4)]();_0x317571['prototype']['initialize'][_0x12208b(0x967)](this,_0x3dccce),this[_0x12208b(0x6ad)](0x2);}else return VisuMZ[_0x12208b(0x45d)][_0x12208b(0x843)][_0x12208b(0x967)](this,_0x1195dc);}},Game_Interpreter[_0x38072d(0x182)][_0x38072d(0x49a)]=function(){const _0x4f715b=_0x38072d;let _0x213aa6='',_0x54fede=this[_0x4f715b(0x26f)]+0x1;while(this['_list'][_0x54fede]&&this[_0x4f715b(0x4e1)][_0x54fede][_0x4f715b(0x8f4)]===0x195){_0x213aa6+=this[_0x4f715b(0x4e1)][_0x54fede][_0x4f715b(0x17e)][0x0]+'\x0a',_0x54fede++;}return _0x213aa6;},Game_Interpreter['prototype'][_0x38072d(0x27e)]=function(_0x52c72c){const _0x12b210=_0x38072d;try{if(_0x12b210(0x8dd)!==_0x12b210(0x8dd)){if(!this[_0x12b210(0x6f6)]())return;_0x6839de=_0x4f5052||![],_0x5738ea=_0x50e801||![];if(_0x12d28a[_0x217fa2]){const _0x4bd931={'x':_0x2720e6,'y':_0x258bc1,'animationId':_0x4970fe,'mirror':_0x369c00,'mute':_0xb2ac05};this[_0x12b210(0x154)][_0x12b210(0x534)](_0x4bd931);}}else eval(_0x52c72c);}catch(_0x4ae296){_0x12b210(0x13b)==='rZjDf'?$gameTemp[_0x12b210(0x267)]()&&(console[_0x12b210(0x220)]('Show\x20Scrolling\x20Text\x20Script\x20Error'),console['log'](_0x4ae296)):this[_0x12b210(0x3f5)](_0x3afd7a);}return!![];},VisuMZ['CoreEngine'][_0x38072d(0x403)]=Game_Interpreter[_0x38072d(0x182)][_0x38072d(0x91b)],Game_Interpreter[_0x38072d(0x182)]['command111']=function(_0x56f8b5){const _0x1720fd=_0x38072d;try{VisuMZ['CoreEngine'][_0x1720fd(0x403)]['call'](this,_0x56f8b5);}catch(_0x3a7213){if(_0x1720fd(0x6a6)!==_0x1720fd(0x6a6))return _0xb080c7[_0x1720fd(0x45d)][_0x1720fd(0x75d)][_0x1720fd(0x6a9)]['AccuracyBoost']&&_0x4161aa[_0x1720fd(0x332)]()?_0x4dbedd['eva']-0.05:_0x3452fb['eva'];else $gameTemp[_0x1720fd(0x267)]()&&(console[_0x1720fd(0x220)](_0x1720fd(0x66c)),console[_0x1720fd(0x220)](_0x3a7213)),this['skipBranch']();}return!![];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x5d9)]=Game_Interpreter[_0x38072d(0x182)][_0x38072d(0x495)],Game_Interpreter[_0x38072d(0x182)][_0x38072d(0x495)]=function(_0xa7e73f){const _0x10974e=_0x38072d;try{VisuMZ['CoreEngine'][_0x10974e(0x5d9)][_0x10974e(0x967)](this,_0xa7e73f);}catch(_0x28065d){$gameTemp['isPlaytest']()&&(console['log'](_0x10974e(0x783)),console['log'](_0x28065d));}return!![];},VisuMZ[_0x38072d(0x45d)]['Game_Interpreter_command355']=Game_Interpreter[_0x38072d(0x182)][_0x38072d(0x819)],Game_Interpreter[_0x38072d(0x182)][_0x38072d(0x819)]=function(){const _0xfb7c56=_0x38072d;try{VisuMZ['CoreEngine'][_0xfb7c56(0x424)]['call'](this);}catch(_0x50c55b){if('hpWdR'===_0xfb7c56(0x629)){const _0x267536=_0x264c16(this['constructor']['name']),_0x5388fb=this[_0xfb7c56(0x8ff)](_0x267536);return _0x5388fb?_0x5388fb[_0xfb7c56(0x244)]:0xc0;}else{if($gameTemp[_0xfb7c56(0x267)]()){if(_0xfb7c56(0x466)!==_0xfb7c56(0x466)){if(_0x40c00[_0xfb7c56(0x8a2)]())return;_0x52ac94[_0xfb7c56(0x57a)](_0x110438,_0x2735c4);const _0x3229fe=_0x204a17[_0xfb7c56(0x1a7)];for(const _0x184eec of _0x3229fe){const _0x3975c0=_0x168122['value'](_0x184eec);_0x49e5f7['setValue'](_0x184eec,!_0x3975c0);}}else console[_0xfb7c56(0x220)]('Script\x20Call\x20Error'),console[_0xfb7c56(0x220)](_0x50c55b);}}}return!![];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x772)]=Game_Interpreter['prototype'][_0x38072d(0x5d5)],Game_Interpreter['prototype'][_0x38072d(0x5d5)]=function(_0x588a26){const _0x34a77c=_0x38072d;return $gameTemp[_0x34a77c(0x2be)](this),VisuMZ['CoreEngine'][_0x34a77c(0x772)]['call'](this,_0x588a26);},Scene_Base['prototype']['fadeSpeed']=function(){const _0x3d7b8e=_0x38072d;return VisuMZ[_0x3d7b8e(0x45d)][_0x3d7b8e(0x75d)]['UI'][_0x3d7b8e(0xfa)];},Scene_Base[_0x38072d(0x182)][_0x38072d(0x92a)]=function(){const _0x50f53d=_0x38072d;return VisuMZ[_0x50f53d(0x45d)][_0x50f53d(0x75d)]['UI'][_0x50f53d(0x11f)];},Scene_Base[_0x38072d(0x182)][_0x38072d(0xa02)]=function(){const _0x47b8e6=_0x38072d;return VisuMZ[_0x47b8e6(0x45d)][_0x47b8e6(0x75d)]['UI'][_0x47b8e6(0x82a)];},Scene_Base[_0x38072d(0x182)][_0x38072d(0x747)]=function(){const _0x37031d=_0x38072d;return VisuMZ[_0x37031d(0x45d)][_0x37031d(0x75d)]['UI'][_0x37031d(0x291)];},Scene_Base['prototype'][_0x38072d(0x4ec)]=function(){const _0x209e18=_0x38072d;return VisuMZ[_0x209e18(0x45d)][_0x209e18(0x75d)]['UI']['CommandWidth'];},Scene_Base[_0x38072d(0x182)][_0x38072d(0x679)]=function(){const _0x39ec12=_0x38072d;return VisuMZ['CoreEngine'][_0x39ec12(0x75d)]['UI'][_0x39ec12(0x983)];},Scene_Base[_0x38072d(0x182)][_0x38072d(0x7bf)]=function(){const _0x534586=_0x38072d;return VisuMZ[_0x534586(0x45d)]['Settings']['Window'][_0x534586(0x1bd)];},VisuMZ[_0x38072d(0x45d)]['Scene_Base_createWindowLayer']=Scene_Base[_0x38072d(0x182)][_0x38072d(0x567)],Scene_Base[_0x38072d(0x182)][_0x38072d(0x567)]=function(){const _0x2a0f8f=_0x38072d;VisuMZ[_0x2a0f8f(0x45d)][_0x2a0f8f(0x2c7)][_0x2a0f8f(0x967)](this),this[_0x2a0f8f(0x541)](),this[_0x2a0f8f(0x7b2)](),this[_0x2a0f8f(0x3d3)]['x']=Math['round'](this[_0x2a0f8f(0x3d3)]['x']),this['_windowLayer']['y']=Math['round'](this['_windowLayer']['y']);},Scene_Base[_0x38072d(0x182)][_0x38072d(0x541)]=function(){},Scene_Base[_0x38072d(0x182)][_0x38072d(0x7b2)]=function(){const _0x105595=_0x38072d;this[_0x105595(0x160)]=new Window_TextPopup(),this['addChild'](this[_0x105595(0x160)]);},$textPopup=function(_0x24c4e1){const _0x4c1e94=_0x38072d,_0x38ecf1=SceneManager['_scene']['_textPopupWindow'];_0x38ecf1[_0x4c1e94(0x2e8)](_0x24c4e1);},Scene_Base[_0x38072d(0x182)]['buttonAssistKey1']=function(){const _0x408867=_0x38072d;return TextManager['getInputMultiButtonStrings'](_0x408867(0x88a),_0x408867(0x707));},Scene_Base[_0x38072d(0x182)][_0x38072d(0x428)]=function(){const _0x4fda4c=_0x38072d;return TextManager[_0x4fda4c(0x63e)](_0x4fda4c(0x4ac));},Scene_Base[_0x38072d(0x182)][_0x38072d(0x7e2)]=function(){const _0x2ec788=_0x38072d;return TextManager['getInputButtonString'](_0x2ec788(0x205));},Scene_Base[_0x38072d(0x182)][_0x38072d(0x6af)]=function(){const _0x40b62b=_0x38072d;return TextManager[_0x40b62b(0x63e)]('ok');},Scene_Base[_0x38072d(0x182)][_0x38072d(0x657)]=function(){const _0x2e2536=_0x38072d;return TextManager[_0x2e2536(0x63e)](_0x2e2536(0x15e));},Scene_Base[_0x38072d(0x182)][_0x38072d(0x22a)]=function(){const _0x149213=_0x38072d;return this[_0x149213(0x5df)]&&this['_pageupButton']['visible']?TextManager[_0x149213(0x87a)]:'';},Scene_Base[_0x38072d(0x182)][_0x38072d(0x86f)]=function(){return'';},Scene_Base['prototype'][_0x38072d(0x325)]=function(){return'';},Scene_Base['prototype'][_0x38072d(0x1ff)]=function(){const _0x1d3985=_0x38072d;return TextManager[_0x1d3985(0x755)];},Scene_Base[_0x38072d(0x182)][_0x38072d(0x977)]=function(){return TextManager['buttonAssistCancel'];},Scene_Base[_0x38072d(0x182)][_0x38072d(0x66f)]=function(){return 0x0;},Scene_Base[_0x38072d(0x182)][_0x38072d(0x1c1)]=function(){return 0x0;},Scene_Base[_0x38072d(0x182)][_0x38072d(0x706)]=function(){return 0x0;},Scene_Base[_0x38072d(0x182)][_0x38072d(0x928)]=function(){return 0x0;},Scene_Base['prototype'][_0x38072d(0x587)]=function(){return 0x0;},VisuMZ['CoreEngine'][_0x38072d(0x8ad)]=Scene_Boot[_0x38072d(0x182)][_0x38072d(0x426)],Scene_Boot[_0x38072d(0x182)][_0x38072d(0x426)]=function(){const _0x1a6d33=_0x38072d;VisuMZ['CoreEngine'][_0x1a6d33(0x8ad)][_0x1a6d33(0x967)](this),this[_0x1a6d33(0x94a)]();},Scene_Boot[_0x38072d(0x182)][_0x38072d(0x94a)]=function(){const _0x53c779=_0x38072d,_0x3920b5=[_0x53c779(0x604),'battlebacks1',_0x53c779(0x6e7),_0x53c779(0x64d),_0x53c779(0x3ae),_0x53c779(0x6fe),_0x53c779(0x7c4),_0x53c779(0x8c0),_0x53c779(0x7b7),_0x53c779(0x24b),_0x53c779(0x398),_0x53c779(0x5b9),_0x53c779(0x790),_0x53c779(0x402)];for(const _0x2d12b0 of _0x3920b5){const _0xb2aa64=VisuMZ[_0x53c779(0x45d)][_0x53c779(0x75d)][_0x53c779(0x8b9)][_0x2d12b0],_0x5aae9d=_0x53c779(0x91f)[_0x53c779(0x941)](_0x2d12b0);for(const _0x248e50 of _0xb2aa64){if(_0x53c779(0x93e)!==_0x53c779(0x93e)){_0x1b198f=_0x559463(_0x4cee3c||'')[_0x53c779(0x994)]();const _0x83efb=_0x1ad547[_0x53c779(0x45d)]['Settings'][_0x53c779(0x651)];if(_0x3419e7===_0x53c779(0x84a))return _0x1fa2a0[_0x53c779(0x41d)][_0x53c779(0x7de)][0x0];if(_0x40ddb1===_0x53c779(0x847))return _0x41cfb3[_0x53c779(0x41d)][_0x53c779(0x7de)][0x1];if(_0x21fe0d===_0x53c779(0x7d8))return _0x5302ba[_0x53c779(0x41d)][_0x53c779(0x7de)][0x2];if(_0x3b7171===_0x53c779(0x3a3))return _0x226df2['terms'][_0x53c779(0x7de)][0x3];if(_0x154dad==='MAT')return _0x3fe8a7['terms'][_0x53c779(0x7de)][0x4];if(_0x46c42a===_0x53c779(0x623))return _0x4a5b04[_0x53c779(0x41d)][_0x53c779(0x7de)][0x5];if(_0x86cdc1==='AGI')return _0x3e3b27[_0x53c779(0x41d)][_0x53c779(0x7de)][0x6];if(_0x307062===_0x53c779(0x307))return _0x32b89[_0x53c779(0x41d)]['params'][0x7];if(_0x3b583a===_0x53c779(0x1ab))return _0x83efb['XParamVocab0'];if(_0x45beea==='EVA')return _0x83efb[_0x53c779(0xf9)];if(_0x48df78===_0x53c779(0x76c))return _0x83efb[_0x53c779(0x60b)];if(_0x4add4b===_0x53c779(0x23e))return _0x83efb[_0x53c779(0x4fe)];if(_0x5e7480==='MEV')return _0x83efb[_0x53c779(0x80d)];if(_0xff05c1===_0x53c779(0x174))return _0x83efb[_0x53c779(0x271)];if(_0x46c1dc===_0x53c779(0x72c))return _0x83efb[_0x53c779(0x35f)];if(_0x4569db===_0x53c779(0x5b7))return _0x83efb[_0x53c779(0x2de)];if(_0x43eb33===_0x53c779(0x52f))return _0x83efb[_0x53c779(0x281)];if(_0x5df451===_0x53c779(0x4cd))return _0x83efb[_0x53c779(0x4ee)];if(_0x28aea0==='TGR')return _0x83efb[_0x53c779(0x93b)];if(_0x16ccd4===_0x53c779(0x5ed))return _0x83efb[_0x53c779(0x302)];if(_0x3cf010===_0x53c779(0x2f5))return _0x83efb[_0x53c779(0x417)];if(_0x532d7a===_0x53c779(0x64c))return _0x83efb[_0x53c779(0x147)];if(_0x1b0da2===_0x53c779(0x20c))return _0x83efb[_0x53c779(0x342)];if(_0x37ff54===_0x53c779(0x8bf))return _0x83efb[_0x53c779(0x75a)];if(_0x50ad6f===_0x53c779(0x1e5))return _0x83efb[_0x53c779(0x68b)];if(_0x25347d==='MDR')return _0x83efb[_0x53c779(0x737)];if(_0x949aa===_0x53c779(0x436))return _0x83efb[_0x53c779(0x31a)];if(_0x4ed906==='EXR')return _0x83efb[_0x53c779(0x7b5)];if(_0x160633[_0x53c779(0x45d)][_0x53c779(0x88c)][_0x1f0164])return _0x4d13d0['CoreEngine'][_0x53c779(0x88c)][_0x147ab6];return'';}else ImageManager['loadBitmap'](_0x5aae9d,_0x248e50);}}},VisuMZ[_0x38072d(0x45d)]['Scene_Boot_startNormalGame']=Scene_Boot[_0x38072d(0x182)][_0x38072d(0x6ca)],Scene_Boot[_0x38072d(0x182)][_0x38072d(0x6ca)]=function(){const _0x111310=_0x38072d;Utils[_0x111310(0x5af)](_0x111310(0x472))&&VisuMZ['CoreEngine']['Settings']['QoL']['NewGameBoot']?this[_0x111310(0x129)]():VisuMZ['CoreEngine']['Scene_Boot_startNormalGame'][_0x111310(0x967)](this);},Scene_Boot['prototype'][_0x38072d(0x129)]=function(){const _0x3cf4db=_0x38072d;this[_0x3cf4db(0x5a0)](),DataManager[_0x3cf4db(0x111)](),SceneManager['goto'](Scene_Map);},Scene_Boot['prototype'][_0x38072d(0x121)]=function(){const _0x1f4982=_0x38072d,_0x2f2e29=$dataSystem[_0x1f4982(0x6ed)][_0x1f4982(0x2f4)],_0x4f94fc=$dataSystem[_0x1f4982(0x6ed)][_0x1f4982(0x9b6)],_0x14a1de=VisuMZ[_0x1f4982(0x45d)][_0x1f4982(0x75d)]['UI'][_0x1f4982(0x133)];Graphics[_0x1f4982(0x5d0)]=_0x2f2e29-_0x14a1de*0x2,Graphics[_0x1f4982(0x15b)]=_0x4f94fc-_0x14a1de*0x2,this['determineSideButtonLayoutValid']();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x980)]=Scene_Boot['prototype']['updateDocumentTitle'],Scene_Boot[_0x38072d(0x182)][_0x38072d(0x4bf)]=function(){const _0x3d4583=_0x38072d;this[_0x3d4583(0x799)]()?this[_0x3d4583(0x80e)]():VisuMZ['CoreEngine'][_0x3d4583(0x980)][_0x3d4583(0x967)](this);},Scene_Boot[_0x38072d(0x182)]['isFullDocumentTitle']=function(){const _0x508759=_0x38072d;if(Scene_Title[_0x508759(0x38c)]==='')return![];if(Scene_Title['subtitle']===_0x508759(0x2f2))return![];if(Scene_Title[_0x508759(0x512)]==='')return![];if(Scene_Title[_0x508759(0x512)]===_0x508759(0x1fa))return![];return!![];},Scene_Boot[_0x38072d(0x182)][_0x38072d(0x80e)]=function(){const _0x2c523f=_0x38072d,_0x40c658=$dataSystem['gameTitle'],_0x4f9f19=Scene_Title[_0x2c523f(0x38c)]||'',_0x5a8f73=Scene_Title[_0x2c523f(0x512)]||'',_0x5e82c2=VisuMZ[_0x2c523f(0x45d)]['Settings']['MenuLayout'][_0x2c523f(0x4d2)][_0x2c523f(0x2d3)],_0x1ddad6=_0x5e82c2['format'](_0x40c658,_0x4f9f19,_0x5a8f73);document[_0x2c523f(0x8fe)]=_0x1ddad6;},Scene_Boot[_0x38072d(0x182)][_0x38072d(0x476)]=function(){const _0x51b589=_0x38072d;if(VisuMZ[_0x51b589(0x45d)][_0x51b589(0x75d)]['UI'][_0x51b589(0x8db)]){if('QeCZG'!=='TRUmD'){const _0x4e0855=Graphics[_0x51b589(0x729)]-Graphics[_0x51b589(0x5d0)]-VisuMZ[_0x51b589(0x45d)][_0x51b589(0x75d)]['UI'][_0x51b589(0x133)]*0x2,_0x15361b=Sprite_Button[_0x51b589(0x182)][_0x51b589(0x35b)][_0x51b589(0x967)](this)*0x4;if(_0x4e0855>=_0x15361b)SceneManager[_0x51b589(0x4e4)](!![]);}else return _0x454236[_0x51b589(0x54f)][_0x51b589(0x430)][_0x51b589(0x967)](this);}},Scene_Title['subtitle']=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)][_0x38072d(0x4d2)][_0x38072d(0x2f2)],Scene_Title[_0x38072d(0x512)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)]['Title'][_0x38072d(0x65a)],Scene_Title['pictureButtons']=VisuMZ[_0x38072d(0x45d)]['Settings']['TitlePicButtons'],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x502)]=Scene_Title[_0x38072d(0x182)]['drawGameTitle'],Scene_Title[_0x38072d(0x182)]['drawGameTitle']=function(){const _0x488896=_0x38072d;VisuMZ[_0x488896(0x45d)]['Settings'][_0x488896(0x827)][_0x488896(0x4d2)][_0x488896(0x926)][_0x488896(0x967)](this);if(Scene_Title[_0x488896(0x38c)]!==''&&Scene_Title[_0x488896(0x38c)]!==_0x488896(0x2f2))this[_0x488896(0x751)]();if(Scene_Title[_0x488896(0x512)]!==''&&Scene_Title['version']!==_0x488896(0x1fa))this['drawGameVersion']();},Scene_Title['prototype'][_0x38072d(0x751)]=function(){const _0x539fb5=_0x38072d;VisuMZ['CoreEngine']['Settings']['MenuLayout'][_0x539fb5(0x4d2)][_0x539fb5(0x751)]['call'](this);},Scene_Title[_0x38072d(0x182)][_0x38072d(0x8cf)]=function(){const _0x3d2ed7=_0x38072d;VisuMZ['CoreEngine'][_0x3d2ed7(0x75d)][_0x3d2ed7(0x827)][_0x3d2ed7(0x4d2)][_0x3d2ed7(0x8cf)]['call'](this);},Scene_Title[_0x38072d(0x182)][_0x38072d(0x692)]=function(){const _0x5d1b0f=_0x38072d;this[_0x5d1b0f(0x3da)]();const _0x5cc090=$dataSystem[_0x5d1b0f(0x161)][_0x5d1b0f(0x605)],_0x37e92e=this[_0x5d1b0f(0x454)]();this['_commandWindow']=new Window_TitleCommand(_0x37e92e),this[_0x5d1b0f(0x4d7)][_0x5d1b0f(0x6ad)](_0x5cc090);const _0x4dd944=this[_0x5d1b0f(0x454)]();this['_commandWindow']['move'](_0x4dd944['x'],_0x4dd944['y'],_0x4dd944[_0x5d1b0f(0x729)],_0x4dd944[_0x5d1b0f(0x486)]),this[_0x5d1b0f(0x4d7)][_0x5d1b0f(0x6aa)](),this[_0x5d1b0f(0x4d7)]['refresh'](),this[_0x5d1b0f(0x4d7)]['selectLast'](),this['addWindow'](this[_0x5d1b0f(0x4d7)]);},Scene_Title[_0x38072d(0x182)][_0x38072d(0x8e3)]=function(){const _0xc53627=_0x38072d;if(this[_0xc53627(0x4d7)]){if(_0xc53627(0x99c)!==_0xc53627(0x8a6))return this[_0xc53627(0x4d7)][_0xc53627(0x4ed)]();else _0x429374[_0xc53627(0x3f8)]=![];}else return VisuMZ[_0xc53627(0x45d)][_0xc53627(0x75d)]['TitleCommandList'][_0xc53627(0x3ec)];},Scene_Title[_0x38072d(0x182)][_0x38072d(0x454)]=function(){const _0x165d71=_0x38072d;return VisuMZ['CoreEngine'][_0x165d71(0x75d)][_0x165d71(0x827)][_0x165d71(0x4d2)][_0x165d71(0x568)]['call'](this);},Scene_Title[_0x38072d(0x182)][_0x38072d(0x3da)]=function(){const _0x2de8c4=_0x38072d;for(const _0xb68766 of Scene_Title['pictureButtons']){const _0x1d9eb8=new Sprite_TitlePictureButton(_0xb68766);this[_0x2de8c4(0x343)](_0x1d9eb8);}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x468)]=Scene_Map[_0x38072d(0x182)][_0x38072d(0x770)],Scene_Map[_0x38072d(0x182)]['initialize']=function(){const _0x3b311e=_0x38072d;VisuMZ[_0x3b311e(0x45d)][_0x3b311e(0x468)][_0x3b311e(0x967)](this),$gameTemp[_0x3b311e(0x28d)](),this[_0x3b311e(0x8f1)]();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x697)]=Scene_Map['prototype'][_0x38072d(0x475)],Scene_Map[_0x38072d(0x182)]['updateMainMultiply']=function(){const _0x3575f4=_0x38072d;VisuMZ[_0x3575f4(0x45d)]['Scene_Map_updateMainMultiply']['call'](this),$gameTemp[_0x3575f4(0x589)]&&!$gameMessage[_0x3575f4(0x9f2)]()&&(this['updateMain'](),SceneManager[_0x3575f4(0x5f9)]());},Scene_Map['prototype'][_0x38072d(0x9e4)]=function(){const _0x5b9f13=_0x38072d;Scene_Message[_0x5b9f13(0x182)][_0x5b9f13(0x9e4)][_0x5b9f13(0x967)](this),!SceneManager[_0x5b9f13(0x87f)](Scene_Battle)&&(this[_0x5b9f13(0x6ba)][_0x5b9f13(0x444)](),this['_mapNameWindow'][_0x5b9f13(0x400)](),this['_windowLayer'][_0x5b9f13(0x5de)]=![],SceneManager[_0x5b9f13(0x5f4)]()),$gameScreen['clearZoom'](),this[_0x5b9f13(0x8f1)]();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x937)]=Scene_Map[_0x38072d(0x182)][_0x38072d(0x20d)],Scene_Map['prototype'][_0x38072d(0x20d)]=function(){const _0x8e383c=_0x38072d;VisuMZ[_0x8e383c(0x45d)][_0x8e383c(0x937)]['call'](this),SceneManager[_0x8e383c(0x732)]()&&this[_0x8e383c(0x81c)]();},Scene_Map['prototype'][_0x38072d(0x81c)]=function(){const _0x5e0e30=_0x38072d;this['_menuButton']['x']=Graphics[_0x5e0e30(0x5d0)]+0x4;},VisuMZ[_0x38072d(0x45d)]['Scene_Map_updateScene']=Scene_Map['prototype'][_0x38072d(0x758)],Scene_Map[_0x38072d(0x182)][_0x38072d(0x758)]=function(){const _0x479d8e=_0x38072d;VisuMZ[_0x479d8e(0x45d)]['Scene_Map_updateScene'][_0x479d8e(0x967)](this),this[_0x479d8e(0x221)]();},Scene_Map[_0x38072d(0x182)][_0x38072d(0x221)]=function(){const _0x7e958=_0x38072d;Input[_0x7e958(0x3af)](_0x7e958(0x3e6))&&(ConfigManager[_0x7e958(0x385)]=!ConfigManager['alwaysDash'],ConfigManager['save']());},VisuMZ['CoreEngine'][_0x38072d(0x97a)]=Scene_Map[_0x38072d(0x182)][_0x38072d(0x431)],Scene_Map[_0x38072d(0x182)][_0x38072d(0x431)]=function(){const _0x22f5a6=_0x38072d;VisuMZ[_0x22f5a6(0x45d)][_0x22f5a6(0x97a)]['call'](this),this['updateOnceParallelInterpreters']();},Scene_Map[_0x38072d(0x182)][_0x38072d(0x8f1)]=function(){const _0x2a5d58=_0x38072d;this[_0x2a5d58(0x341)]=[];},Scene_Map[_0x38072d(0x182)][_0x38072d(0x47d)]=function(){const _0x2950b8=_0x38072d;if(!this[_0x2950b8(0x341)])return;for(const _0x45ae70 of this['_onceParallelInterpreters']){_0x45ae70&&(_0x2950b8(0x4a0)!==_0x2950b8(0x60d)?_0x45ae70[_0x2950b8(0x444)]():this['initialize'](...arguments));}},Scene_Map['prototype'][_0x38072d(0x581)]=function(_0x18b95c){const _0x2eeb65=$dataCommonEvents[_0x18b95c];if(!_0x2eeb65)return;const _0x11655f=new Game_OnceParallelInterpreter();this['addOnceParallelInterpreter'](_0x11655f),_0x11655f['setCommonEvent'](_0x18b95c);},Scene_Map[_0x38072d(0x182)][_0x38072d(0x4c9)]=function(_0x239f94){const _0x1b70be=_0x38072d;this[_0x1b70be(0x341)]=this['_onceParallelInterpreters']||[],this[_0x1b70be(0x341)][_0x1b70be(0x534)](_0x239f94);},Scene_Map[_0x38072d(0x182)][_0x38072d(0x46d)]=function(_0xc1d7a7){const _0x52849d=_0x38072d;this[_0x52849d(0x341)]=this[_0x52849d(0x341)]||[],this[_0x52849d(0x341)][_0x52849d(0x891)](_0xc1d7a7);};function Game_OnceParallelInterpreter(){this['initialize'](...arguments);}Game_OnceParallelInterpreter[_0x38072d(0x182)]=Object[_0x38072d(0x3ac)](Game_Interpreter[_0x38072d(0x182)]),Game_OnceParallelInterpreter[_0x38072d(0x182)][_0x38072d(0x1aa)]=Game_OnceParallelInterpreter,Game_OnceParallelInterpreter[_0x38072d(0x182)][_0x38072d(0x56a)]=function(_0x400498){const _0x18a940=_0x38072d,_0x6468ae=$dataCommonEvents[_0x400498];_0x6468ae?this['setup'](_0x6468ae['list'],0x0):this[_0x18a940(0x9e4)]();},Game_OnceParallelInterpreter[_0x38072d(0x182)]['terminate']=function(){const _0x4ca285=_0x38072d;if(!SceneManager[_0x4ca285(0x61b)]())return;SceneManager[_0x4ca285(0x576)][_0x4ca285(0x46d)](this),Game_Interpreter[_0x4ca285(0x182)][_0x4ca285(0x9e4)][_0x4ca285(0x967)](this);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x144)]=Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x2f3)],Scene_MenuBase['prototype']['helpAreaTop']=function(){const _0x12ab06=_0x38072d;let _0x180d0e=0x0;return SceneManager[_0x12ab06(0x870)]()?_0x180d0e=this['helpAreaTopSideButtonLayout']():'EDXkq'===_0x12ab06(0x63b)?_0x180d0e=VisuMZ[_0x12ab06(0x45d)]['Scene_MenuBase_helpAreaTop'][_0x12ab06(0x967)](this):_0x1d21ed*=_0xe34ba4[_0x12ab06(0x83a)](),_0x180d0e;},Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x2ce)]=function(){const _0x2f04c3=_0x38072d;if(this[_0x2f04c3(0x92a)]())return this[_0x2f04c3(0x6eb)]();else{if(_0x2f04c3(0x543)!==_0x2f04c3(0x1bf))return 0x0;else _0x5a1988+=_0x2f04c3(0x876);}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x2cc)]=Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x59d)],Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x59d)]=function(){const _0x167ebe=_0x38072d;return SceneManager[_0x167ebe(0x870)]()?_0x167ebe(0x3d7)===_0x167ebe(0x716)?(_0xa82377=_0x425e45(_0x40ec56),_0x56dc97[_0x167ebe(0x322)](/#(.*)/i)?_0x167ebe(0x82f)[_0x167ebe(0x941)](_0x2febbc(_0x49ede6['$1'])):this['textColor'](_0x220cbf(_0x364aa7))):this[_0x167ebe(0x3ee)]():VisuMZ[_0x167ebe(0x45d)][_0x167ebe(0x2cc)][_0x167ebe(0x967)](this);},Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x3ee)]=function(){const _0x398ca7=_0x38072d;if(!this['isBottomHelpMode']())return this['helpAreaBottom']();else{if(this['isMenuButtonAssistEnabled']()&&this['getButtonAssistLocation']()===_0x398ca7(0x766)){if('dvcki'!==_0x398ca7(0x848))this[_0x398ca7(0x917)]=_0x54181d;else return Window_ButtonAssist[_0x398ca7(0x182)]['lineHeight']();}else return _0x398ca7(0x498)===_0x398ca7(0x76a)?_0xd3c9c8['status']&&_0x47dc28[_0x398ca7(0x81e)][_0x398ca7(0x2ac)]('['+_0x569544+']'):0x0;}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x2a5)]=Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x1a9)],Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x1a9)]=function(){const _0x5a08eb=_0x38072d;let _0x59a030=0x0;return SceneManager[_0x5a08eb(0x870)]()?_0x5a08eb(0x776)!=='sRYiH'?(_0x24ebe5['_x']=_0x3f1362['_x'],_0x497063['_y']=_0x5a72b2['_y']):_0x59a030=this[_0x5a08eb(0x6bb)]():_0x59a030=VisuMZ[_0x5a08eb(0x45d)][_0x5a08eb(0x2a5)][_0x5a08eb(0x967)](this),this['isMenuButtonAssistEnabled']()&&this[_0x5a08eb(0x6d0)]()!==_0x5a08eb(0x3e1)&&('VDHmM'!=='QmHxg'?_0x59a030-=Window_ButtonAssist[_0x5a08eb(0x182)][_0x5a08eb(0x2ef)]():(_0x5d4fe8[_0x5a08eb(0x12f)][0x23]=_0x5a08eb(0x4bc),_0x75e79f[_0x5a08eb(0x12f)][0x24]=_0x5a08eb(0x97f))),_0x59a030;},Scene_MenuBase[_0x38072d(0x182)]['mainAreaHeightSideButtonLayout']=function(){const _0x5db2e9=_0x38072d;return Graphics[_0x5db2e9(0x15b)]-this[_0x5db2e9(0x599)]();},VisuMZ[_0x38072d(0x45d)]['Scene_MenuBase_createBackground']=Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x17b)],Scene_MenuBase[_0x38072d(0x182)]['createBackground']=function(){const _0x3c30b3=_0x38072d,_0x5184e0=VisuMZ[_0x3c30b3(0x45d)][_0x3c30b3(0x75d)][_0x3c30b3(0x166)][_0x3c30b3(0x54e)]??0x8;this[_0x3c30b3(0x487)]=new PIXI[(_0x3c30b3(0x7b9))][(_0x3c30b3(0x903))](_0x5184e0),this[_0x3c30b3(0x752)]=new Sprite(),this[_0x3c30b3(0x752)][_0x3c30b3(0x208)]=SceneManager[_0x3c30b3(0x2e7)](),this[_0x3c30b3(0x752)][_0x3c30b3(0x7b9)]=[this['_backgroundFilter']],this[_0x3c30b3(0x343)](this[_0x3c30b3(0x752)]),this[_0x3c30b3(0x869)](0xc0),this[_0x3c30b3(0x869)](this[_0x3c30b3(0x5a1)]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x5a1)]=function(){const _0x5e0a36=_0x38072d,_0xd511ca=String(this[_0x5e0a36(0x1aa)][_0x5e0a36(0x25e)]),_0x27523c=this[_0x5e0a36(0x8ff)](_0xd511ca);return _0x27523c?'edhsa'===_0x5e0a36(0x79e)?_0x12f595['CoreEngine'][_0x5e0a36(0x75d)][_0x5e0a36(0x190)]['ActorHPColor']['call'](this,_0x3a8e04):_0x27523c['SnapshotOpacity']:0xc0;},Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x620)]=function(){const _0x19bc5c=_0x38072d,_0x56b392=String(this[_0x19bc5c(0x1aa)][_0x19bc5c(0x25e)]),_0x12d164=this[_0x19bc5c(0x8ff)](_0x56b392);_0x12d164&&(_0x12d164['BgFilename1']!==''||_0x12d164['BgFilename2']!=='')&&(this['_backSprite1']=new Sprite(ImageManager[_0x19bc5c(0x600)](_0x12d164['BgFilename1'])),this[_0x19bc5c(0x523)]=new Sprite(ImageManager[_0x19bc5c(0x875)](_0x12d164[_0x19bc5c(0x90c)])),this[_0x19bc5c(0x343)](this[_0x19bc5c(0x2eb)]),this[_0x19bc5c(0x343)](this[_0x19bc5c(0x523)]),this[_0x19bc5c(0x2eb)]['bitmap']['addLoadListener'](this[_0x19bc5c(0x5c5)]['bind'](this,this[_0x19bc5c(0x2eb)])),this['_backSprite2'][_0x19bc5c(0x208)]['addLoadListener'](this[_0x19bc5c(0x5c5)][_0x19bc5c(0x667)](this,this['_backSprite2'])));},Scene_MenuBase[_0x38072d(0x182)]['getCustomBackgroundSettings']=function(_0xfa83d0){const _0x1c85d2=_0x38072d;return VisuMZ['CoreEngine'][_0x1c85d2(0x75d)]['MenuBg'][_0xfa83d0]||VisuMZ[_0x1c85d2(0x45d)][_0x1c85d2(0x75d)]['MenuBg'][_0x1c85d2(0x8bb)];},Scene_MenuBase[_0x38072d(0x182)]['adjustSprite']=function(_0x61b539){const _0x4e8f49=_0x38072d;this[_0x4e8f49(0x30b)](_0x61b539),this[_0x4e8f49(0x35c)](_0x61b539);},VisuMZ[_0x38072d(0x45d)]['Scene_MenuBase_createCancelButton']=Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x3a7)],Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x3a7)]=function(){const _0x5e8a1f=_0x38072d;VisuMZ[_0x5e8a1f(0x45d)][_0x5e8a1f(0x8e8)]['call'](this),SceneManager['isSideButtonLayout']()&&this[_0x5e8a1f(0x146)]();},Scene_MenuBase['prototype'][_0x38072d(0x146)]=function(){this['_cancelButton']['x']=Graphics['boxWidth']+0x4;},VisuMZ['CoreEngine'][_0x38072d(0x225)]=Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x3a8)],Scene_MenuBase['prototype'][_0x38072d(0x3a8)]=function(){const _0x3f52ce=_0x38072d;VisuMZ['CoreEngine']['Scene_MenuBase_createPageButtons'][_0x3f52ce(0x967)](this),SceneManager[_0x3f52ce(0x732)]()&&(_0x3f52ce(0x443)!=='EnhOH'?this[_0x3f52ce(0x57f)]():(this[_0x3f52ce(0x5a0)](),_0x1c460c[_0x3f52ce(0x111)](),_0x52d909[_0x3f52ce(0x453)](_0x3d8c41)));},Scene_MenuBase[_0x38072d(0x182)]['movePageButtonSideButtonLayout']=function(){const _0x2f7268=_0x38072d;this[_0x2f7268(0x5df)]['x']=-0x1*(this['_pageupButton']['width']+this['_pagedownButton'][_0x2f7268(0x729)]+0x8),this[_0x2f7268(0x410)]['x']=-0x1*(this[_0x2f7268(0x410)][_0x2f7268(0x729)]+0x4);},Scene_MenuBase['prototype'][_0x38072d(0x1c0)]=function(){const _0x2d3715=_0x38072d;return VisuMZ['CoreEngine'][_0x2d3715(0x75d)][_0x2d3715(0x6b6)][_0x2d3715(0x3be)];},Scene_MenuBase['prototype'][_0x38072d(0x6d0)]=function(){const _0x445b5c=_0x38072d;if(SceneManager['isSideButtonLayout']()||SceneManager[_0x445b5c(0x782)]())return VisuMZ[_0x445b5c(0x45d)][_0x445b5c(0x75d)][_0x445b5c(0x6b6)][_0x445b5c(0x9db)];else{if(_0x445b5c(0x560)!==_0x445b5c(0x560))_0x5b7dc3[_0x445b5c(0x779)](),_0x5b65e7[_0x445b5c(0x501)](_0xfcc799[_0x445b5c(0x84b)]),_0x3e7e05[_0x445b5c(0x84b)]=_0x5b3df4;else return _0x445b5c(0x3e1);}},Scene_MenuBase[_0x38072d(0x182)][_0x38072d(0x541)]=function(){const _0x57bbbd=_0x38072d;if(!this['isMenuButtonAssistEnabled']())return;const _0x3f9a97=this['buttonAssistWindowRect']();this['_buttonAssistWindow']=new Window_ButtonAssist(_0x3f9a97),this[_0x57bbbd(0x14d)](this['_buttonAssistWindow']);},Scene_MenuBase['prototype'][_0x38072d(0x9a1)]=function(){const _0x2d98fa=_0x38072d;if(this['getButtonAssistLocation']()===_0x2d98fa(0x3e1)){if(_0x2d98fa(0x3fa)!=='NpmaQ')return this[_0x2d98fa(0x77a)]();else this[_0x2d98fa(0x7d1)]+=this['visible']?this[_0x2d98fa(0x2d5)]():-0x1*this[_0x2d98fa(0x2d5)](),this[_0x2d98fa(0x7d1)]=_0x4fb0b7['min'](0xc0,this['opacity']);}else{if(_0x2d98fa(0x46a)!==_0x2d98fa(0x46a)){if(this[_0x2d98fa(0x215)]()[_0x2d98fa(0x8ab)]&&_0xe3a66['zoomScale']()===0x1){this[_0x2d98fa(0x98c)]=this['centerCameraCheckData']()['displayX'];return;}_0x455910['CoreEngine'][_0x2d98fa(0x78a)][_0x2d98fa(0x967)](this,_0x2ee868);}else return this[_0x2d98fa(0x3c0)]();}},Scene_MenuBase['prototype'][_0x38072d(0x77a)]=function(){const _0x34fbaf=_0x38072d,_0x25387b=ConfigManager[_0x34fbaf(0x2a0)]?(Sprite_Button['prototype'][_0x34fbaf(0x35b)]()+0x6)*0x2:0x0,_0x542e0b=this[_0x34fbaf(0x218)](),_0x3c3dd3=Graphics[_0x34fbaf(0x5d0)]-_0x25387b*0x2,_0x4ecdd5=this['buttonAreaHeight']();return new Rectangle(_0x25387b,_0x542e0b,_0x3c3dd3,_0x4ecdd5);},Scene_MenuBase['prototype'][_0x38072d(0x3c0)]=function(){const _0x13d9fb=_0x38072d,_0x3fb57e=Graphics[_0x13d9fb(0x5d0)],_0x492497=Window_ButtonAssist[_0x13d9fb(0x182)]['lineHeight'](),_0xeb356a=0x0;let _0x2db5b7=0x0;return this['getButtonAssistLocation']()===_0x13d9fb(0x766)?_0x2db5b7=0x0:_0x2db5b7=Graphics['boxHeight']-_0x492497,new Rectangle(_0xeb356a,_0x2db5b7,_0x3fb57e,_0x492497);},Scene_Menu[_0x38072d(0x54f)]=VisuMZ['CoreEngine']['Settings'][_0x38072d(0x827)][_0x38072d(0x535)],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x8a0)]=Scene_Menu['prototype'][_0x38072d(0x3ac)],Scene_Menu[_0x38072d(0x182)]['create']=function(){const _0x2a1d77=_0x38072d;VisuMZ[_0x2a1d77(0x45d)][_0x2a1d77(0x8a0)][_0x2a1d77(0x967)](this),this[_0x2a1d77(0x7f7)]();},Scene_Menu[_0x38072d(0x182)]['setCoreEngineUpdateWindowBg']=function(){const _0x40ebfe=_0x38072d;if(this['_commandWindow']){if(_0x40ebfe(0x427)!==_0x40ebfe(0x427)){const _0x1aea31=_0x40ebfe(0x3cd);this[_0x40ebfe(0x66d)]=this['_colorCache']||{};if(this[_0x40ebfe(0x66d)][_0x1aea31])return this['_colorCache'][_0x1aea31];const _0x1e6595=_0x4cfb28[_0x40ebfe(0x45d)]['Settings'][_0x40ebfe(0x190)][_0x40ebfe(0x125)];return this[_0x40ebfe(0x414)](_0x1aea31,_0x1e6595);}else this['_commandWindow'][_0x40ebfe(0x6ad)](Scene_Menu[_0x40ebfe(0x54f)]['CommandBgType']);}this[_0x40ebfe(0x75f)]&&this['_goldWindow'][_0x40ebfe(0x6ad)](Scene_Menu[_0x40ebfe(0x54f)]['GoldBgType']),this['_statusWindow']&&this['_statusWindow']['setBackgroundType'](Scene_Menu['layoutSettings'][_0x40ebfe(0x5e5)]);},Scene_Menu['prototype'][_0x38072d(0x454)]=function(){const _0x51350a=_0x38072d;return Scene_Menu[_0x51350a(0x54f)]['CommandRect']['call'](this);},Scene_Menu[_0x38072d(0x182)]['goldWindowRect']=function(){const _0x46d2f9=_0x38072d;return Scene_Menu[_0x46d2f9(0x54f)][_0x46d2f9(0x96a)][_0x46d2f9(0x967)](this);},Scene_Menu['prototype'][_0x38072d(0x71b)]=function(){const _0x3abce3=_0x38072d;return Scene_Menu[_0x3abce3(0x54f)][_0x3abce3(0x2f1)][_0x3abce3(0x967)](this);},Scene_Item['layoutSettings']=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)]['MenuLayout']['ItemMenu'],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x21e)]=Scene_Item['prototype'][_0x38072d(0x3ac)],Scene_Item[_0x38072d(0x182)][_0x38072d(0x3ac)]=function(){const _0x56de3a=_0x38072d;VisuMZ[_0x56de3a(0x45d)][_0x56de3a(0x21e)]['call'](this),this[_0x56de3a(0x7f7)]();},Scene_Item[_0x38072d(0x182)][_0x38072d(0x7f7)]=function(){const _0xccfdc8=_0x38072d;this[_0xccfdc8(0x17a)]&&this['_helpWindow'][_0xccfdc8(0x6ad)](Scene_Item['layoutSettings']['HelpBgType']);if(this[_0xccfdc8(0x4b3)]){if(_0xccfdc8(0x750)!=='YkRqV')return this['helpAreaBottom']();else this[_0xccfdc8(0x4b3)]['setBackgroundType'](Scene_Item[_0xccfdc8(0x54f)]['CategoryBgType']);}this[_0xccfdc8(0x48d)]&&this[_0xccfdc8(0x48d)][_0xccfdc8(0x6ad)](Scene_Item[_0xccfdc8(0x54f)][_0xccfdc8(0x4fa)]),this[_0xccfdc8(0x993)]&&(_0xccfdc8(0x409)!==_0xccfdc8(0x409)?(!this[_0xccfdc8(0x61a)]&&(this[_0xccfdc8(0x58c)]+=_0x1f24b4['round']((_0x5a17e3['height']-0x270)/0x2),this[_0xccfdc8(0x58c)]-=_0x1cbcd1[_0xccfdc8(0x167)]((_0x5d28d2[_0xccfdc8(0x486)]-_0x2fb47f[_0xccfdc8(0x15b)])/0x2),_0x356dc2[_0xccfdc8(0x79a)]()?this[_0xccfdc8(0x9f8)]-=_0x2bec18[_0xccfdc8(0x167)]((_0x5daa51[_0xccfdc8(0x729)]-_0x47e410[_0xccfdc8(0x5d0)])/0x2):this[_0xccfdc8(0x9f8)]+=_0x573b03['round']((_0x4b80b9[_0xccfdc8(0x5d0)]-0x330)/0x2)),this['_repositioned']=!![]):this[_0xccfdc8(0x993)][_0xccfdc8(0x6ad)](Scene_Item[_0xccfdc8(0x54f)][_0xccfdc8(0x379)]));},Scene_Item[_0x38072d(0x182)]['helpWindowRect']=function(){const _0x5d78c4=_0x38072d;return Scene_Item[_0x5d78c4(0x54f)]['HelpRect'][_0x5d78c4(0x967)](this);},Scene_Item[_0x38072d(0x182)]['categoryWindowRect']=function(){const _0x2224b8=_0x38072d;return Scene_Item[_0x2224b8(0x54f)][_0x2224b8(0x4bd)]['call'](this);},Scene_Item[_0x38072d(0x182)][_0x38072d(0x3df)]=function(){const _0xc75cc1=_0x38072d;return Scene_Item['layoutSettings'][_0xc75cc1(0x430)][_0xc75cc1(0x967)](this);},Scene_Item['prototype'][_0x38072d(0x931)]=function(){const _0x45eac3=_0x38072d;return Scene_Item[_0x45eac3(0x54f)][_0x45eac3(0x5e3)][_0x45eac3(0x967)](this);},Scene_Skill['layoutSettings']=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)][_0x38072d(0x6a5)],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x65b)]=Scene_Skill[_0x38072d(0x182)][_0x38072d(0x3ac)],Scene_Skill[_0x38072d(0x182)][_0x38072d(0x3ac)]=function(){const _0x4f3d81=_0x38072d;VisuMZ[_0x4f3d81(0x45d)][_0x4f3d81(0x65b)]['call'](this),this[_0x4f3d81(0x7f7)]();},Scene_Skill['prototype'][_0x38072d(0x7f7)]=function(){const _0x41aa4e=_0x38072d;this[_0x41aa4e(0x17a)]&&this['_helpWindow']['setBackgroundType'](Scene_Skill[_0x41aa4e(0x54f)]['HelpBgType']);if(this['_skillTypeWindow']){if(_0x41aa4e(0x4da)===_0x41aa4e(0x4da))this['_skillTypeWindow'][_0x41aa4e(0x6ad)](Scene_Skill[_0x41aa4e(0x54f)][_0x41aa4e(0x2e2)]);else{const _0x18a2c2=_0x2f6e29[_0x41aa4e(0x8b6)]();this[_0x41aa4e(0x9c5)]=_0x3f1bf8[_0x41aa4e(0x4d6)](_0x18a2c2)+_0x1227e0['randomInt'](_0x18a2c2)+this[_0x41aa4e(0x136)]();}}this[_0x41aa4e(0x1fe)]&&this[_0x41aa4e(0x1fe)]['setBackgroundType'](Scene_Skill[_0x41aa4e(0x54f)]['StatusBgType']);this['_itemWindow']&&this['_itemWindow'][_0x41aa4e(0x6ad)](Scene_Skill[_0x41aa4e(0x54f)][_0x41aa4e(0x4fa)]);if(this[_0x41aa4e(0x993)]){if(_0x41aa4e(0x531)===_0x41aa4e(0x531))this[_0x41aa4e(0x993)][_0x41aa4e(0x6ad)](Scene_Skill[_0x41aa4e(0x54f)][_0x41aa4e(0x379)]);else return!![];}},Scene_Skill[_0x38072d(0x182)]['helpWindowRect']=function(){const _0x12ecb4=_0x38072d;return Scene_Skill[_0x12ecb4(0x54f)][_0x12ecb4(0x57c)][_0x12ecb4(0x967)](this);},Scene_Skill[_0x38072d(0x182)]['skillTypeWindowRect']=function(){const _0x28977e=_0x38072d;return Scene_Skill[_0x28977e(0x54f)][_0x28977e(0x3b8)]['call'](this);},Scene_Skill[_0x38072d(0x182)]['statusWindowRect']=function(){const _0x149dd3=_0x38072d;return Scene_Skill['layoutSettings'][_0x149dd3(0x2f1)][_0x149dd3(0x967)](this);},Scene_Skill[_0x38072d(0x182)][_0x38072d(0x3df)]=function(){const _0x5da273=_0x38072d;return Scene_Skill[_0x5da273(0x54f)][_0x5da273(0x430)]['call'](this);},Scene_Skill['prototype'][_0x38072d(0x931)]=function(){const _0x497758=_0x38072d;return Scene_Skill[_0x497758(0x54f)][_0x497758(0x5e3)]['call'](this);},Scene_Equip[_0x38072d(0x54f)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)][_0x38072d(0x53e)],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x7be)]=Scene_Equip[_0x38072d(0x182)][_0x38072d(0x3ac)],Scene_Equip[_0x38072d(0x182)][_0x38072d(0x3ac)]=function(){const _0x258de6=_0x38072d;VisuMZ['CoreEngine'][_0x258de6(0x7be)]['call'](this),this[_0x258de6(0x7f7)]();},Scene_Equip[_0x38072d(0x182)][_0x38072d(0x7f7)]=function(){const _0x2c1f1e=_0x38072d;if(this[_0x2c1f1e(0x17a)]){if('FlwWp'===_0x2c1f1e(0x914)){if(_0x18b147[_0x2c1f1e(0x8a2)]())return;_0x56dd0c['ConvertParams'](_0x3a72d9,_0x117cd9);const _0x50e58a=_0x1178a3['min'](_0x3fb6b2[_0x2c1f1e(0x10d)],_0x509772[_0x2c1f1e(0x690)]),_0x7faf9e=_0x5b84cf[_0x2c1f1e(0x285)](_0x4fd4f5['StartID'],_0x239965[_0x2c1f1e(0x690)]),_0x2416c3=(_0x559762['Chance']||0x0)/0x64;for(let _0x1e08ef=_0x50e58a;_0x1e08ef<=_0x7faf9e;_0x1e08ef++){const _0x2fdb80=_0x22a54a['random']()<=_0x2416c3;_0x37d23f[_0x2c1f1e(0x7cf)](_0x1e08ef,_0x2fdb80);}}else this['_helpWindow'][_0x2c1f1e(0x6ad)](Scene_Equip[_0x2c1f1e(0x54f)][_0x2c1f1e(0x7c9)]);}this[_0x2c1f1e(0x1fe)]&&this[_0x2c1f1e(0x1fe)][_0x2c1f1e(0x6ad)](Scene_Equip[_0x2c1f1e(0x54f)][_0x2c1f1e(0x5e5)]),this[_0x2c1f1e(0x4d7)]&&this[_0x2c1f1e(0x4d7)][_0x2c1f1e(0x6ad)](Scene_Equip[_0x2c1f1e(0x54f)][_0x2c1f1e(0x3b6)]),this[_0x2c1f1e(0x38a)]&&(_0x2c1f1e(0x846)!==_0x2c1f1e(0x846)?this[_0x2c1f1e(0x465)](_0x2c1f1e(0x3a2)):this[_0x2c1f1e(0x38a)][_0x2c1f1e(0x6ad)](Scene_Equip['layoutSettings'][_0x2c1f1e(0x10f)])),this[_0x2c1f1e(0x48d)]&&this['_itemWindow'][_0x2c1f1e(0x6ad)](Scene_Equip[_0x2c1f1e(0x54f)][_0x2c1f1e(0x4fa)]);},Scene_Equip['prototype'][_0x38072d(0x9da)]=function(){const _0x2ed7d6=_0x38072d;return Scene_Equip[_0x2ed7d6(0x54f)][_0x2ed7d6(0x57c)][_0x2ed7d6(0x967)](this);},Scene_Equip[_0x38072d(0x182)]['statusWindowRect']=function(){const _0x515c8d=_0x38072d;return Scene_Equip[_0x515c8d(0x54f)][_0x515c8d(0x2f1)][_0x515c8d(0x967)](this);},Scene_Equip['prototype'][_0x38072d(0x454)]=function(){const _0x2f6784=_0x38072d;return Scene_Equip[_0x2f6784(0x54f)]['CommandRect'][_0x2f6784(0x967)](this);},Scene_Equip[_0x38072d(0x182)][_0x38072d(0x112)]=function(){const _0x236e84=_0x38072d;return Scene_Equip[_0x236e84(0x54f)][_0x236e84(0x74f)][_0x236e84(0x967)](this);},Scene_Equip[_0x38072d(0x182)][_0x38072d(0x3df)]=function(){const _0x41042b=_0x38072d;return Scene_Equip[_0x41042b(0x54f)]['ItemRect'][_0x41042b(0x967)](this);},Scene_Status[_0x38072d(0x54f)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)][_0x38072d(0x6c8)],VisuMZ['CoreEngine'][_0x38072d(0x6fb)]=Scene_Status['prototype'][_0x38072d(0x3ac)],Scene_Status['prototype'][_0x38072d(0x3ac)]=function(){const _0x36de74=_0x38072d;VisuMZ[_0x36de74(0x45d)]['Scene_Status_create'][_0x36de74(0x967)](this),this[_0x36de74(0x7f7)]();},Scene_Status['prototype'][_0x38072d(0x7f7)]=function(){const _0x1b4d81=_0x38072d;this[_0x1b4d81(0x3c8)]&&this[_0x1b4d81(0x3c8)]['setBackgroundType'](Scene_Status[_0x1b4d81(0x54f)][_0x1b4d81(0x288)]),this[_0x1b4d81(0x1fe)]&&this[_0x1b4d81(0x1fe)][_0x1b4d81(0x6ad)](Scene_Status[_0x1b4d81(0x54f)]['StatusBgType']),this[_0x1b4d81(0x920)]&&(_0x1b4d81(0x887)===_0x1b4d81(0x887)?this[_0x1b4d81(0x920)]['setBackgroundType'](Scene_Status['layoutSettings'][_0x1b4d81(0x89f)]):_0x5c1ec1['CoreEngine']['loadMapData'](_0x1ef6a4)),this[_0x1b4d81(0x6e0)]&&this[_0x1b4d81(0x6e0)][_0x1b4d81(0x6ad)](Scene_Status[_0x1b4d81(0x54f)]['StatusEquipBgType']);},Scene_Status['prototype'][_0x38072d(0x7aa)]=function(){const _0x166956=_0x38072d;return Scene_Status[_0x166956(0x54f)][_0x166956(0x312)][_0x166956(0x967)](this);},Scene_Status[_0x38072d(0x182)]['statusWindowRect']=function(){const _0x496cf5=_0x38072d;return Scene_Status[_0x496cf5(0x54f)][_0x496cf5(0x2f1)][_0x496cf5(0x967)](this);},Scene_Status[_0x38072d(0x182)][_0x38072d(0x2c2)]=function(){const _0x46958b=_0x38072d;return Scene_Status['layoutSettings'][_0x46958b(0x68d)][_0x46958b(0x967)](this);},Scene_Status[_0x38072d(0x182)][_0x38072d(0x641)]=function(){const _0x45d968=_0x38072d;return Scene_Status[_0x45d968(0x54f)][_0x45d968(0x39a)][_0x45d968(0x967)](this);},Scene_Options['layoutSettings']=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)][_0x38072d(0x134)],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x204)]=Scene_Options[_0x38072d(0x182)][_0x38072d(0x3ac)],Scene_Options['prototype'][_0x38072d(0x3ac)]=function(){const _0x52b8ef=_0x38072d;VisuMZ[_0x52b8ef(0x45d)]['Scene_Options_create'][_0x52b8ef(0x967)](this),this[_0x52b8ef(0x7f7)]();},Scene_Options['prototype']['setCoreEngineUpdateWindowBg']=function(){const _0x45e7c1=_0x38072d;this[_0x45e7c1(0x47a)]&&this['_optionsWindow']['setBackgroundType'](Scene_Options[_0x45e7c1(0x54f)]['OptionsBgType']);},Scene_Options[_0x38072d(0x182)][_0x38072d(0x520)]=function(){const _0x3d34b4=_0x38072d;return Scene_Options[_0x3d34b4(0x54f)][_0x3d34b4(0x7e9)][_0x3d34b4(0x967)](this);},Scene_Save[_0x38072d(0x54f)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)][_0x38072d(0x79d)],Scene_Save[_0x38072d(0x182)][_0x38072d(0x3ac)]=function(){const _0x585937=_0x38072d;Scene_File['prototype']['create'][_0x585937(0x967)](this),this[_0x585937(0x7f7)]();},Scene_Save[_0x38072d(0x182)][_0x38072d(0x7f7)]=function(){const _0x4cc7d8=_0x38072d;this['_helpWindow']&&this[_0x4cc7d8(0x17a)]['setBackgroundType'](Scene_Save[_0x4cc7d8(0x54f)]['HelpBgType']),this[_0x4cc7d8(0x423)]&&(_0x4cc7d8(0x95c)===_0x4cc7d8(0x95c)?this[_0x4cc7d8(0x423)]['setBackgroundType'](Scene_Save[_0x4cc7d8(0x54f)][_0x4cc7d8(0x878)]):(this['_x']=this[_0x4cc7d8(0x18e)],this['_y']=this['_targetY'],this[_0x4cc7d8(0x3ab)]=this['_targetScaleX'],this[_0x4cc7d8(0x298)]=this[_0x4cc7d8(0x602)],this[_0x4cc7d8(0x2da)]=this['_targetOpacity'],this['_anchor']&&(this['_anchor']['x']=this['_targetAnchor']['x'],this[_0x4cc7d8(0x644)]['y']=this['_targetAnchor']['y'])));},Scene_Save[_0x38072d(0x182)][_0x38072d(0x9da)]=function(){const _0x75ad22=_0x38072d;return Scene_Save[_0x75ad22(0x54f)]['HelpRect']['call'](this);},Scene_Save[_0x38072d(0x182)][_0x38072d(0x79c)]=function(){const _0x42e6bb=_0x38072d;return Scene_Save['layoutSettings'][_0x42e6bb(0x1e3)][_0x42e6bb(0x967)](this);},Scene_Load[_0x38072d(0x54f)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)][_0x38072d(0x212)],Scene_Load[_0x38072d(0x182)][_0x38072d(0x3ac)]=function(){const _0x4b7b90=_0x38072d;Scene_File[_0x4b7b90(0x182)][_0x4b7b90(0x3ac)][_0x4b7b90(0x967)](this),this[_0x4b7b90(0x7f7)]();},Scene_Load[_0x38072d(0x182)]['setCoreEngineUpdateWindowBg']=function(){const _0x21ec9a=_0x38072d;if(this[_0x21ec9a(0x17a)]){if(_0x21ec9a(0x65c)!==_0x21ec9a(0x65c)){if(_0x414e76[_0x21ec9a(0x8a2)]())return![];return this['onlyfilename']()&&this['onlyfilename']()['charAt'](0x0)==='!';}else this[_0x21ec9a(0x17a)][_0x21ec9a(0x6ad)](Scene_Load[_0x21ec9a(0x54f)][_0x21ec9a(0x7c9)]);}if(this[_0x21ec9a(0x423)]){if(_0x21ec9a(0x950)!==_0x21ec9a(0x4f9))this['_listWindow'][_0x21ec9a(0x6ad)](Scene_Load[_0x21ec9a(0x54f)][_0x21ec9a(0x878)]);else{if(!this['_onceParallelInterpreters'])return;for(const _0x3c6e90 of this[_0x21ec9a(0x341)]){_0x3c6e90&&_0x3c6e90['update']();}}}},Scene_Load[_0x38072d(0x182)][_0x38072d(0x9da)]=function(){const _0x34df57=_0x38072d;return Scene_Load[_0x34df57(0x54f)][_0x34df57(0x57c)][_0x34df57(0x967)](this);},Scene_Load[_0x38072d(0x182)][_0x38072d(0x79c)]=function(){const _0x32e616=_0x38072d;return Scene_Load[_0x32e616(0x54f)]['ListRect'][_0x32e616(0x967)](this);},Scene_GameEnd[_0x38072d(0x54f)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x827)][_0x38072d(0x841)],VisuMZ['CoreEngine'][_0x38072d(0x66e)]=Scene_GameEnd[_0x38072d(0x182)][_0x38072d(0x17b)],Scene_GameEnd[_0x38072d(0x182)][_0x38072d(0x17b)]=function(){const _0x411f9b=_0x38072d;Scene_MenuBase[_0x411f9b(0x182)][_0x411f9b(0x17b)][_0x411f9b(0x967)](this);},Scene_GameEnd['prototype']['createCommandWindow']=function(){const _0x5534b4=_0x38072d,_0x3deff8=this['commandWindowRect']();this['_commandWindow']=new Window_GameEnd(_0x3deff8),this[_0x5534b4(0x4d7)][_0x5534b4(0x25a)](_0x5534b4(0x15e),this[_0x5534b4(0x2b6)][_0x5534b4(0x667)](this)),this[_0x5534b4(0x14d)](this[_0x5534b4(0x4d7)]),this[_0x5534b4(0x4d7)][_0x5534b4(0x6ad)](Scene_GameEnd[_0x5534b4(0x54f)][_0x5534b4(0x3b6)]);},Scene_GameEnd[_0x38072d(0x182)][_0x38072d(0x454)]=function(){const _0x560c5b=_0x38072d;return Scene_GameEnd[_0x560c5b(0x54f)][_0x560c5b(0x568)][_0x560c5b(0x967)](this);},Scene_Shop[_0x38072d(0x54f)]=VisuMZ['CoreEngine'][_0x38072d(0x75d)]['MenuLayout'][_0x38072d(0x60a)],VisuMZ['CoreEngine']['Scene_Shop_create']=Scene_Shop['prototype'][_0x38072d(0x3ac)],Scene_Shop[_0x38072d(0x182)][_0x38072d(0x3ac)]=function(){const _0x4ce998=_0x38072d;VisuMZ['CoreEngine']['Scene_Shop_create']['call'](this),this[_0x4ce998(0x7f7)]();},Scene_Shop[_0x38072d(0x182)][_0x38072d(0x7f7)]=function(){const _0x4a6428=_0x38072d;this[_0x4a6428(0x17a)]&&this['_helpWindow']['setBackgroundType'](Scene_Shop[_0x4a6428(0x54f)]['HelpBgType']);if(this[_0x4a6428(0x75f)]){if(_0x4a6428(0x7cb)!==_0x4a6428(0x157))this[_0x4a6428(0x75f)][_0x4a6428(0x6ad)](Scene_Shop[_0x4a6428(0x54f)][_0x4a6428(0x715)]);else{const _0x2a50eb=_0x482bc3[_0x4a6428(0x2d7)],_0x229872=_0x334bb2[_0x4a6428(0x8f0)](_0x2a50eb);return _0x229872?this[_0x4a6428(0x85d)]!==_0x229872[_0x4a6428(0x9d4)]||this['_lastX']!==_0x229872['_x']||this['_lastY']!==_0x229872['_y']:![];}}this[_0x4a6428(0x4d7)]&&(_0x4a6428(0x938)!==_0x4a6428(0x802)?this[_0x4a6428(0x4d7)]['setBackgroundType'](Scene_Shop[_0x4a6428(0x54f)][_0x4a6428(0x3b6)]):(_0xfdae41[_0x4a6428(0x45d)]['Scene_Boot_onDatabaseLoaded']['call'](this),this[_0x4a6428(0x32e)](),this[_0x4a6428(0x209)](),this['process_VisuMZ_CoreEngine_Settings'](),this[_0x4a6428(0x92e)](),this[_0x4a6428(0x59e)](),this[_0x4a6428(0x1be)](),_0x5bbe24['ParseAllNotetags']())),this[_0x4a6428(0x382)]&&this[_0x4a6428(0x382)]['setBackgroundType'](Scene_Shop[_0x4a6428(0x54f)][_0x4a6428(0x4ea)]),this['_numberWindow']&&(_0x4a6428(0x9df)===_0x4a6428(0x616)?_0x41ad3d[_0x4a6428(0x210)](!_0x25cc4a['isSideView']()):this[_0x4a6428(0x5b0)][_0x4a6428(0x6ad)](Scene_Shop[_0x4a6428(0x54f)][_0x4a6428(0x842)])),this[_0x4a6428(0x1fe)]&&this['_statusWindow']['setBackgroundType'](Scene_Shop[_0x4a6428(0x54f)][_0x4a6428(0x5e5)]),this[_0x4a6428(0x745)]&&(_0x4a6428(0x3a5)!=='HWDiE'?this['_buyWindow'][_0x4a6428(0x6ad)](Scene_Shop[_0x4a6428(0x54f)]['BuyBgType']):(_0x159b53[_0x4a6428(0x678)]=0x64,_0x24cab8[_0x4a6428(0x612)]=0x64,_0x36b727[_0x4a6428(0x9ab)]=0x64,_0x214610[_0x4a6428(0x1fb)]=0x64)),this[_0x4a6428(0x4b3)]&&this[_0x4a6428(0x4b3)][_0x4a6428(0x6ad)](Scene_Shop[_0x4a6428(0x54f)][_0x4a6428(0x1da)]),this['_sellWindow']&&this['_sellWindow'][_0x4a6428(0x6ad)](Scene_Shop[_0x4a6428(0x54f)][_0x4a6428(0x4aa)]);},Scene_Shop[_0x38072d(0x182)][_0x38072d(0x9da)]=function(){const _0x3dd4c2=_0x38072d;return Scene_Shop[_0x3dd4c2(0x54f)][_0x3dd4c2(0x57c)]['call'](this);},Scene_Shop[_0x38072d(0x182)][_0x38072d(0x948)]=function(){return Scene_Shop['layoutSettings']['GoldRect']['call'](this);},Scene_Shop[_0x38072d(0x182)][_0x38072d(0x454)]=function(){const _0x438a7f=_0x38072d;return Scene_Shop[_0x438a7f(0x54f)][_0x438a7f(0x568)]['call'](this);},Scene_Shop[_0x38072d(0x182)][_0x38072d(0x5cf)]=function(){const _0x4a9ee9=_0x38072d;return Scene_Shop[_0x4a9ee9(0x54f)][_0x4a9ee9(0x7e1)][_0x4a9ee9(0x967)](this);},Scene_Shop[_0x38072d(0x182)]['numberWindowRect']=function(){const _0xbda2b0=_0x38072d;return Scene_Shop[_0xbda2b0(0x54f)][_0xbda2b0(0x918)][_0xbda2b0(0x967)](this);},Scene_Shop[_0x38072d(0x182)]['statusWindowRect']=function(){const _0x5706fc=_0x38072d;return Scene_Shop[_0x5706fc(0x54f)][_0x5706fc(0x2f1)][_0x5706fc(0x967)](this);},Scene_Shop[_0x38072d(0x182)][_0x38072d(0x633)]=function(){const _0x371787=_0x38072d;return Scene_Shop[_0x371787(0x54f)][_0x371787(0x6f2)][_0x371787(0x967)](this);},Scene_Shop[_0x38072d(0x182)][_0x38072d(0x1c6)]=function(){const _0x4bc113=_0x38072d;return Scene_Shop['layoutSettings'][_0x4bc113(0x4bd)][_0x4bc113(0x967)](this);},Scene_Shop[_0x38072d(0x182)][_0x38072d(0x324)]=function(){const _0x3929f5=_0x38072d;return Scene_Shop[_0x3929f5(0x54f)][_0x3929f5(0x16e)][_0x3929f5(0x967)](this);},Scene_Name['layoutSettings']=VisuMZ[_0x38072d(0x45d)]['Settings'][_0x38072d(0x827)][_0x38072d(0x8eb)],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x597)]=Scene_Name['prototype'][_0x38072d(0x3ac)],Scene_Name['prototype'][_0x38072d(0x3ac)]=function(){const _0x5d9312=_0x38072d;VisuMZ[_0x5d9312(0x45d)][_0x5d9312(0x597)][_0x5d9312(0x967)](this),this['setCoreEngineUpdateWindowBg']();},Scene_Name[_0x38072d(0x182)][_0x38072d(0x7f7)]=function(){const _0x6f1798=_0x38072d;this['_editWindow']&&('SsXec'===_0x6f1798(0x9f7)?this[_0x6f1798(0x513)]['setBackgroundType'](Scene_Name['layoutSettings']['EditBgType']):this[_0x6f1798(0x513)][_0x6f1798(0x6ad)](_0x46c7a4[_0x6f1798(0x54f)][_0x6f1798(0x349)]));if(this[_0x6f1798(0x5bc)]){if(_0x6f1798(0x8f7)!==_0x6f1798(0x345))this['_inputWindow']['setBackgroundType'](Scene_Name[_0x6f1798(0x54f)]['InputBgType']);else{_0x2e8196[_0x6f1798(0x45d)]['Input_update']['call'](this);if(this['_gamepadWait'])this[_0x6f1798(0x7a6)]--;}}},Scene_Name[_0x38072d(0x182)][_0x38072d(0x599)]=function(){return 0x0;},Scene_Name[_0x38072d(0x182)][_0x38072d(0x5b1)]=function(){const _0x5c96fd=_0x38072d;return Scene_Name['layoutSettings'][_0x5c96fd(0x2df)]['call'](this);},Scene_Name['prototype'][_0x38072d(0x6c7)]=function(){const _0x4dd464=_0x38072d;return Scene_Name['layoutSettings'][_0x4dd464(0x99d)]['call'](this);},Scene_Name['prototype']['EnableNameInput']=function(){const _0x1a8a7a=_0x38072d;if(!this[_0x1a8a7a(0x5bc)])return![];return VisuMZ[_0x1a8a7a(0x45d)][_0x1a8a7a(0x75d)]['KeyboardInput'][_0x1a8a7a(0x1ec)];},Scene_Name[_0x38072d(0x182)][_0x38072d(0x1fd)]=function(){const _0x4fd166=_0x38072d;if(this[_0x4fd166(0x1ec)]()&&this[_0x4fd166(0x5bc)]['_mode']!==_0x4fd166(0x645)){if(_0x4fd166(0x94b)===_0x4fd166(0x6c1))_0x187f72[_0x4fd166(0x45d)][_0x4fd166(0x932)][_0x4fd166(0x967)](this,_0x39a574),this[_0x4fd166(0x659)](_0x35f538);else return TextManager[_0x4fd166(0x7ba)](_0x4fd166(0x88a),_0x4fd166(0x707));}return Scene_MenuBase[_0x4fd166(0x182)][_0x4fd166(0x1fd)][_0x4fd166(0x967)](this);},Scene_Name[_0x38072d(0x182)][_0x38072d(0x7e2)]=function(){const _0x6dfd64=_0x38072d;return this[_0x6dfd64(0x1ec)]()?TextManager['getInputButtonString'](_0x6dfd64(0x4ac)):Scene_MenuBase['prototype'][_0x6dfd64(0x7e2)]['call'](this);},Scene_Name[_0x38072d(0x182)]['buttonAssistKey4']=function(){const _0x4cd005=_0x38072d;if(this['EnableNameInput']()&&this[_0x4cd005(0x5bc)][_0x4cd005(0x662)]===_0x4cd005(0x645))return TextManager[_0x4cd005(0x5fe)]([_0x4cd005(0x327)]);return Scene_MenuBase[_0x4cd005(0x182)]['buttonAssistKey4'][_0x4cd005(0x967)](this);},Scene_Name[_0x38072d(0x182)][_0x38072d(0x657)]=function(){const _0x4cebc9=_0x38072d;if(this[_0x4cebc9(0x1ec)]()&&this[_0x4cebc9(0x5bc)]['_mode']==='keyboard')return TextManager[_0x4cebc9(0x5fe)]([_0x4cebc9(0x120)]);return Scene_MenuBase['prototype']['buttonAssistKey5'][_0x4cebc9(0x967)](this);},Scene_Name['prototype'][_0x38072d(0x22a)]=function(){const _0x3eb5e9=_0x38072d;if(this[_0x3eb5e9(0x1ec)]()&&this['_inputWindow'][_0x3eb5e9(0x662)]!==_0x3eb5e9(0x645)){if(_0x3eb5e9(0x6f5)!==_0x3eb5e9(0x5ff)){const _0x4744e9=VisuMZ[_0x3eb5e9(0x45d)][_0x3eb5e9(0x75d)][_0x3eb5e9(0x38f)];return _0x4744e9[_0x3eb5e9(0x1ea)]||_0x3eb5e9(0xa05);}else this['drawText'](_0x5198cf['CoreEngine']['Settings'][_0x3eb5e9(0x373)]['GoldOverlap'],_0x4a9627,_0x196f89,_0x28e7fe,_0x3eb5e9(0x16d));}return Scene_MenuBase[_0x3eb5e9(0x182)][_0x3eb5e9(0x22a)][_0x3eb5e9(0x967)](this);},Scene_Name['prototype'][_0x38072d(0x325)]=function(){const _0x3be5bb=_0x38072d;if(this['EnableNameInput']()){const _0x104b6f=VisuMZ[_0x3be5bb(0x45d)][_0x3be5bb(0x75d)][_0x3be5bb(0x38f)];if(this[_0x3be5bb(0x5bc)]['_mode']===_0x3be5bb(0x645)){if(_0x3be5bb(0x4ab)==='NYZpd')_0xb90b1c[_0x3be5bb(0x589)]=!_0xc867cf[_0x3be5bb(0x589)];else return _0x104b6f['Keyboard']||_0x3be5bb(0x805);}else return _0x104b6f['Manual']||_0x3be5bb(0x22b);}else return Scene_MenuBase[_0x3be5bb(0x182)][_0x3be5bb(0x325)]['call'](this);},Scene_Name['prototype'][_0x38072d(0x1ff)]=function(){const _0x524968=_0x38072d;if(this['EnableNameInput']()){const _0x1bd99c=VisuMZ[_0x524968(0x45d)]['Settings'][_0x524968(0x38f)];if(this[_0x524968(0x5bc)][_0x524968(0x662)]==='keyboard')return _0x1bd99c[_0x524968(0x2fb)]||_0x524968(0x2fb);}return Scene_MenuBase[_0x524968(0x182)][_0x524968(0x1ff)]['call'](this);},VisuMZ[_0x38072d(0x45d)]['Scene_Name_onInputOk']=Scene_Name[_0x38072d(0x182)]['onInputOk'],Scene_Name[_0x38072d(0x182)][_0x38072d(0x135)]=function(){const _0x42f32a=_0x38072d;this[_0x42f32a(0x1d7)]()?_0x42f32a(0x247)!==_0x42f32a(0x247)?_0x419c30['VisuMZ_2_BattleSystemBTB']&&(this[_0x42f32a(0xeb)]=_0x42f32a(0x812)):this[_0x42f32a(0x89a)]():VisuMZ[_0x42f32a(0x45d)][_0x42f32a(0x9d9)][_0x42f32a(0x967)](this);},Scene_Name['prototype'][_0x38072d(0x1d7)]=function(){const _0x1c8ce1=_0x38072d,_0x27fbde=VisuMZ[_0x1c8ce1(0x45d)][_0x1c8ce1(0x75d)][_0x1c8ce1(0x38f)];if(!_0x27fbde)return![];const _0xee742=_0x27fbde['BannedWords'];if(!_0xee742)return![];const _0x5b783c=this[_0x1c8ce1(0x513)][_0x1c8ce1(0x25e)]()[_0x1c8ce1(0x27c)]();for(const _0x39592d of _0xee742){if(_0x1c8ce1(0x966)!==_0x1c8ce1(0x89d)){if(_0x5b783c[_0x1c8ce1(0x2ac)](_0x39592d[_0x1c8ce1(0x27c)]()))return!![];}else return 0x0;}return![];},Scene_Name[_0x38072d(0x182)][_0x38072d(0x89a)]=function(){const _0x49bfee=_0x38072d;SoundManager[_0x49bfee(0x11e)]();},VisuMZ['CoreEngine'][_0x38072d(0x892)]=Scene_Battle[_0x38072d(0x182)][_0x38072d(0x444)],Scene_Battle[_0x38072d(0x182)]['update']=function(){const _0x2a98a0=_0x38072d;VisuMZ[_0x2a98a0(0x45d)]['Scene_Battle_update']['call'](this);if($gameTemp[_0x2a98a0(0x589)])this[_0x2a98a0(0x188)]();},Scene_Battle[_0x38072d(0x182)][_0x38072d(0x188)]=function(){const _0x3efb9a=_0x38072d;!BattleManager[_0x3efb9a(0x7c1)]()&&!this[_0x3efb9a(0xf8)]&&!$gameMessage['isBusy']()&&(this[_0x3efb9a(0xf8)]=!![],this[_0x3efb9a(0x444)](),SceneManager[_0x3efb9a(0x5f9)](),this[_0x3efb9a(0xf8)]=![]);},VisuMZ['CoreEngine']['Scene_Battle_createCancelButton']=Scene_Battle[_0x38072d(0x182)][_0x38072d(0x3a7)],Scene_Battle[_0x38072d(0x182)]['createCancelButton']=function(){const _0x23c115=_0x38072d;VisuMZ['CoreEngine'][_0x23c115(0x316)]['call'](this),SceneManager[_0x23c115(0x732)]()&&(_0x23c115(0x3a0)===_0x23c115(0x3a6)?(_0x174061+=_0x483b4b,_0x4b0d3e+=_0x23c115(0x5a5)['format'](_0x43eb3e,_0x23e916[_0x23c115(0x17e)][0x0]+0x1,_0x55289c[_0x23c115(0x17e)][0x1])):this['repositionCancelButtonSideButtonLayout']());},Scene_Battle[_0x38072d(0x182)][_0x38072d(0x70b)]=function(){const _0x22a59f=_0x38072d;this[_0x22a59f(0x710)]['x']=Graphics[_0x22a59f(0x5d0)]+0x4,this[_0x22a59f(0xa02)]()?this[_0x22a59f(0x710)]['y']=Graphics['boxHeight']-this[_0x22a59f(0x679)]():this[_0x22a59f(0x710)]['y']=0x0;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x3c3)]=Sprite_Button[_0x38072d(0x182)][_0x38072d(0x770)],Sprite_Button[_0x38072d(0x182)][_0x38072d(0x770)]=function(_0x285613){const _0x427c90=_0x38072d;VisuMZ[_0x427c90(0x45d)][_0x427c90(0x3c3)][_0x427c90(0x967)](this,_0x285613),this['initButtonHidden']();},Sprite_Button[_0x38072d(0x182)][_0x38072d(0x3ea)]=function(){const _0x4db37f=_0x38072d,_0x5c531f=VisuMZ[_0x4db37f(0x45d)][_0x4db37f(0x75d)]['UI'];this[_0x4db37f(0x8e6)]=![];switch(this[_0x4db37f(0x592)]){case _0x4db37f(0x15e):this['_isButtonHidden']=!_0x5c531f['cancelShowButton'];break;case _0x4db37f(0x88a):case _0x4db37f(0x707):this[_0x4db37f(0x8e6)]=!_0x5c531f[_0x4db37f(0x552)];break;case _0x4db37f(0x407):case'up':case'down2':case _0x4db37f(0x1f0):case'ok':this[_0x4db37f(0x8e6)]=!_0x5c531f[_0x4db37f(0x19f)];break;case _0x4db37f(0x675):this['_isButtonHidden']=!_0x5c531f[_0x4db37f(0x7ee)];break;}},VisuMZ['CoreEngine'][_0x38072d(0x49d)]=Sprite_Button['prototype'][_0x38072d(0x79f)],Sprite_Button[_0x38072d(0x182)][_0x38072d(0x79f)]=function(){const _0x5179b9=_0x38072d;SceneManager[_0x5179b9(0x782)]()||this[_0x5179b9(0x8e6)]?this[_0x5179b9(0x88b)]():VisuMZ[_0x5179b9(0x45d)][_0x5179b9(0x49d)]['call'](this);},Sprite_Button[_0x38072d(0x182)][_0x38072d(0x88b)]=function(){const _0x354169=_0x38072d;this[_0x354169(0x5de)]=![],this[_0x354169(0x7d1)]=0x0,this['x']=Graphics[_0x354169(0x729)]*0xa,this['y']=Graphics[_0x354169(0x486)]*0xa;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x29f)]=Sprite_Battler[_0x38072d(0x182)][_0x38072d(0x517)],Sprite_Battler[_0x38072d(0x182)][_0x38072d(0x517)]=function(_0xa5014b,_0x247fca,_0x477002){const _0x1c48f0=_0x38072d;(this[_0x1c48f0(0x11a)]!==_0xa5014b||this[_0x1c48f0(0x642)]!==_0x247fca)&&(this[_0x1c48f0(0x1a8)](_0x1c48f0(0x894)),this[_0x1c48f0(0x1e4)]=_0x477002),VisuMZ['CoreEngine'][_0x1c48f0(0x29f)][_0x1c48f0(0x967)](this,_0xa5014b,_0x247fca,_0x477002);},Sprite_Battler[_0x38072d(0x182)][_0x38072d(0x1a8)]=function(_0x426f86){const _0x23d088=_0x38072d;this[_0x23d088(0x917)]=_0x426f86;},Sprite_Battler[_0x38072d(0x182)][_0x38072d(0x473)]=function(){const _0x22f3c7=_0x38072d;if(this[_0x22f3c7(0x1cf)]<=0x0)return;const _0x488748=this[_0x22f3c7(0x1cf)],_0x3280c5=this[_0x22f3c7(0x1e4)],_0x409dee=this[_0x22f3c7(0x917)];this[_0x22f3c7(0x41c)]=this[_0x22f3c7(0x78e)](this['_offsetX'],this[_0x22f3c7(0x11a)],_0x488748,_0x3280c5,_0x409dee),this[_0x22f3c7(0x814)]=this['applyEasing'](this[_0x22f3c7(0x814)],this[_0x22f3c7(0x642)],_0x488748,_0x3280c5,_0x409dee),this[_0x22f3c7(0x1cf)]--;if(this[_0x22f3c7(0x1cf)]<=0x0)this[_0x22f3c7(0x902)]();},Sprite_Battler[_0x38072d(0x182)][_0x38072d(0x78e)]=function(_0x2407c0,_0x38d162,_0x2517a0,_0xc8cccc,_0x4002fc){const _0x5cb66f=_0x38072d,_0x406b4e=VisuMZ[_0x5cb66f(0x9d6)]((_0xc8cccc-_0x2517a0)/_0xc8cccc,_0x4002fc||_0x5cb66f(0x894)),_0x5dd459=VisuMZ[_0x5cb66f(0x9d6)]((_0xc8cccc-_0x2517a0+0x1)/_0xc8cccc,_0x4002fc||'Linear'),_0x4dba8b=(_0x2407c0-_0x38d162*_0x406b4e)/(0x1-_0x406b4e);return _0x4dba8b+(_0x38d162-_0x4dba8b)*_0x5dd459;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x9c0)]=Sprite_Actor[_0x38072d(0x182)][_0x38072d(0x297)],Sprite_Actor[_0x38072d(0x182)]['setActorHome']=function(_0x35690d){const _0x5eb2a4=_0x38072d;if(VisuMZ['CoreEngine'][_0x5eb2a4(0x75d)]['UI']['RepositionActors'])this[_0x5eb2a4(0x3f5)](_0x35690d);else{if(_0x5eb2a4(0x45e)!==_0x5eb2a4(0x367))VisuMZ[_0x5eb2a4(0x45d)]['Sprite_Actor_setActorHome'][_0x5eb2a4(0x967)](this,_0x35690d);else{_0x55fbea['ConvertParams'](_0x18ca9d,_0x522f51);const _0x26cf7a=_0x1c6a63['value']||0x0;_0x28d09a[_0x5eb2a4(0x936)](_0x26cf7a);}}},Sprite_Actor[_0x38072d(0x182)]['setActorHomeRepositioned']=function(_0x1ae26a){const _0x518e1d=_0x38072d;let _0x2038c2=Math[_0x518e1d(0x337)](Graphics[_0x518e1d(0x729)]/0x2+0xc0);_0x2038c2-=Math[_0x518e1d(0x167)]((Graphics[_0x518e1d(0x729)]-Graphics[_0x518e1d(0x5d0)])/0x2),_0x2038c2+=_0x1ae26a*0x20;let _0x52b2a7=Graphics[_0x518e1d(0x486)]-0xc8-$gameParty['maxBattleMembers']()*0x30;_0x52b2a7-=Math[_0x518e1d(0x167)]((Graphics['height']-Graphics[_0x518e1d(0x15b)])/0x2),_0x52b2a7+=_0x1ae26a*0x30,this[_0x518e1d(0x1e7)](_0x2038c2,_0x52b2a7);},Sprite_Actor[_0x38072d(0x182)][_0x38072d(0x4e8)]=function(){const _0x39e3dc=_0x38072d;this[_0x39e3dc(0x517)](0x4b0,0x0,0x78);},Sprite_Animation[_0x38072d(0x182)][_0x38072d(0x99f)]=function(_0x5c780a){const _0x5bbb70=_0x38072d;this[_0x5bbb70(0x575)]=_0x5c780a;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x62e)]=Sprite_Animation[_0x38072d(0x182)][_0x38072d(0x388)],Sprite_Animation[_0x38072d(0x182)]['processSoundTimings']=function(){const _0x57738e=_0x38072d;if(this[_0x57738e(0x575)])return;VisuMZ[_0x57738e(0x45d)][_0x57738e(0x62e)][_0x57738e(0x967)](this);},VisuMZ['CoreEngine'][_0x38072d(0x42f)]=Sprite_Animation[_0x38072d(0x182)][_0x38072d(0x374)],Sprite_Animation['prototype'][_0x38072d(0x374)]=function(_0xe4563f){const _0x42a790=_0x38072d;this[_0x42a790(0x6b0)]()?this['setViewportCoreEngineFix'](_0xe4563f):VisuMZ[_0x42a790(0x45d)][_0x42a790(0x42f)]['call'](this,_0xe4563f);},Sprite_Animation[_0x38072d(0x182)][_0x38072d(0x6b0)]=function(){const _0xfbd72a=_0x38072d;if(!this['_animation'])return![];const _0x45abeb=this['_animation']['name']||'';if(_0x45abeb[_0xfbd72a(0x322)](/<MIRROR OFFSET X>/i))return!![];if(_0x45abeb[_0xfbd72a(0x322)](/<NO MIRROR OFFSET X>/i))return![];return VisuMZ[_0xfbd72a(0x45d)][_0xfbd72a(0x75d)][_0xfbd72a(0x6a9)][_0xfbd72a(0x9a8)];},Sprite_Animation[_0x38072d(0x182)]['setViewportCoreEngineFix']=function(_0x1da899){const _0x3ed3a=_0x38072d,_0x742746=this[_0x3ed3a(0x9a0)],_0x16267b=this['_viewportSize'],_0x3cc8d4=this[_0x3ed3a(0x4a3)][_0x3ed3a(0x524)]*(this[_0x3ed3a(0x9b3)]?-0x1:0x1)-_0x742746/0x2,_0x2b9fdb=this['_animation'][_0x3ed3a(0x3f4)]-_0x16267b/0x2,_0x43318d=this[_0x3ed3a(0x55d)](_0x1da899);_0x1da899['gl'][_0x3ed3a(0x1d9)](_0x3cc8d4+_0x43318d['x'],_0x2b9fdb+_0x43318d['y'],_0x742746,_0x16267b);},Sprite_Animation[_0x38072d(0x182)][_0x38072d(0xf2)]=function(_0x2e643e){const _0x4e6a4b=_0x38072d;if(_0x2e643e[_0x4e6a4b(0x279)]){}const _0x524920=this['_animation'][_0x4e6a4b(0x25e)];let _0x58baa5=_0x2e643e[_0x4e6a4b(0x486)]*_0x2e643e[_0x4e6a4b(0x834)]['y'],_0x4e90ec=0x0,_0x2a36b5=-_0x58baa5/0x2;if(_0x524920[_0x4e6a4b(0x322)](/<(?:HEAD|HEADER|TOP)>/i))_0x2a36b5=-_0x58baa5;if(_0x524920[_0x4e6a4b(0x322)](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x2a36b5=0x0;if(this['_animation'][_0x4e6a4b(0x1b9)])_0x2a36b5=0x0;if(_0x524920['match'](/<(?:LEFT)>/i))_0x4e90ec=-_0x2e643e[_0x4e6a4b(0x729)]/0x2;if(_0x524920[_0x4e6a4b(0x322)](/<(?:RIGHT)>/i))_0x4e90ec=_0x2e643e['width']/0x2;_0x524920[_0x4e6a4b(0x322)](/<ANCHOR X:[ ](\d+\.?\d*)>/i)&&(_0x4e90ec=Number(RegExp['$1'])*_0x2e643e[_0x4e6a4b(0x729)]);if(_0x524920[_0x4e6a4b(0x322)](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)){if(_0x4e6a4b(0x2c0)!==_0x4e6a4b(0x2c0))return 0x0;else _0x2a36b5=(0x1-Number(RegExp['$1']))*-_0x58baa5;}_0x524920[_0x4e6a4b(0x322)](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)&&(_0x4e90ec=Number(RegExp['$1'])*_0x2e643e[_0x4e6a4b(0x729)],_0x2a36b5=(0x1-Number(RegExp['$2']))*-_0x58baa5);if(_0x524920[_0x4e6a4b(0x322)](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x4e90ec+=Number(RegExp['$1']);if(_0x524920[_0x4e6a4b(0x322)](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x2a36b5+=Number(RegExp['$1']);if(_0x524920[_0x4e6a4b(0x322)](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)){if(_0x4e6a4b(0x4f2)===_0x4e6a4b(0x4f2))_0x4e90ec+=Number(RegExp['$1']),_0x2a36b5+=Number(RegExp['$2']);else return _0x20f513[_0x4e6a4b(0x5fe)]([_0x4e6a4b(0x327)]);}const _0xe4d39b=new Point(_0x4e90ec,_0x2a36b5);return _0x2e643e[_0x4e6a4b(0x2a7)](),_0x2e643e[_0x4e6a4b(0x69e)][_0x4e6a4b(0x996)](_0xe4d39b);},Sprite_AnimationMV[_0x38072d(0x182)][_0x38072d(0x18a)]=function(){const _0x3059a7=_0x38072d;this[_0x3059a7(0x415)]=VisuMZ[_0x3059a7(0x45d)][_0x3059a7(0x75d)][_0x3059a7(0x6a9)][_0x3059a7(0x5ee)]??0x4,this[_0x3059a7(0x762)](),this[_0x3059a7(0x415)]=this[_0x3059a7(0x415)][_0x3059a7(0x480)](0x1,0xa);},Sprite_AnimationMV[_0x38072d(0x182)][_0x38072d(0x762)]=function(){const _0x4a0079=_0x38072d;if(!this[_0x4a0079(0x4a3)]);const _0x9dbebe=this['_animation'][_0x4a0079(0x25e)]||'';if(_0x9dbebe['match'](/<RATE:[ ](\d+)>/i)){if(_0x4a0079(0x998)===_0x4a0079(0x178)){if(this[_0x4a0079(0x4d5)]===_0x508491)this[_0x4a0079(0x3e3)]();const _0x33c2aa=this[_0x4a0079(0x4d5)];if(_0x33c2aa[_0x4a0079(0x622)]<=0x0)return;_0x33c2aa[_0x4a0079(0x41b)]=this['applyEasingAnglePlus'](_0x33c2aa[_0x4a0079(0x41b)],_0x33c2aa[_0x4a0079(0x113)]),_0x33c2aa['duration']--,_0x33c2aa[_0x4a0079(0x622)]<=0x0&&(_0x33c2aa['current']=_0x33c2aa[_0x4a0079(0x113)]);}else this[_0x4a0079(0x415)]=(Number(RegExp['$1'])||0x1)[_0x4a0079(0x480)](0x1,0xa);}},Sprite_AnimationMV['prototype'][_0x38072d(0x99f)]=function(_0x11e204){const _0x596dd7=_0x38072d;this[_0x596dd7(0x575)]=_0x11e204;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x1cc)]=Sprite_AnimationMV[_0x38072d(0x182)][_0x38072d(0x320)],Sprite_AnimationMV[_0x38072d(0x182)][_0x38072d(0x320)]=function(_0x369fca){const _0x56c22a=_0x38072d;if(this[_0x56c22a(0x575)]){if(_0x56c22a(0x286)!==_0x56c22a(0x286)){_0x55a9f3['CoreEngine']['ParseClassNotetags']['call'](this,_0x2d0d68);if(_0x2c46d0[_0x56c22a(0x872)])for(const _0x5b61cf of _0x55d059['learnings']){_0x5b61cf[_0x56c22a(0x673)][_0x56c22a(0x322)](/<LEARN AT LEVEL:[ ](\d+)>/i)&&(_0x5b61cf['level']=_0x3c84ec['max'](_0x16f5c5(_0x224d1a['$1']),0x1));}}else _0x369fca=JsonEx[_0x56c22a(0x6d6)](_0x369fca),_0x369fca['se']&&(_0x369fca['se'][_0x56c22a(0x53b)]=0x0);}VisuMZ[_0x56c22a(0x45d)][_0x56c22a(0x1cc)][_0x56c22a(0x967)](this,_0x369fca);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x8f8)]=Sprite_AnimationMV[_0x38072d(0x182)][_0x38072d(0x2a3)],Sprite_AnimationMV[_0x38072d(0x182)]['updatePosition']=function(){const _0x2e0584=_0x38072d;VisuMZ[_0x2e0584(0x45d)][_0x2e0584(0x8f8)][_0x2e0584(0x967)](this);if(this['_animation'][_0x2e0584(0x844)]===0x3){if(_0x2e0584(0x686)!=='iVWDS'){if(this['x']===0x0)this['x']=Math[_0x2e0584(0x337)](Graphics[_0x2e0584(0x729)]/0x2);if(this['y']===0x0)this['y']=Math['round'](Graphics[_0x2e0584(0x486)]/0x2);}else return this[_0x2e0584(0x74b)];}},Sprite_Damage[_0x38072d(0x182)][_0x38072d(0x851)]=function(_0x1c610d){const _0x25e46b=_0x38072d;let _0x21f2b6=Math[_0x25e46b(0x12d)](_0x1c610d)[_0x25e46b(0x51d)]();if(this[_0x25e46b(0x7a5)]()){if('TJDwB'!==_0x25e46b(0x28c))_0x21f2b6=VisuMZ[_0x25e46b(0x9ae)](_0x21f2b6);else{const _0x295d2c=_0x3bf5cf[_0x25e46b(0x45d)][_0x25e46b(0x75d)]['MenuBg'][_0x25e46b(0x54e)]??0x8;this[_0x25e46b(0x487)]=new _0x33b410[(_0x25e46b(0x7b9))]['BlurFilter'](_0x295d2c),this['_backgroundSprite']=new _0x281699(),this[_0x25e46b(0x752)][_0x25e46b(0x208)]=_0x172bd0[_0x25e46b(0x2e7)](),this[_0x25e46b(0x752)][_0x25e46b(0x7b9)]=[this[_0x25e46b(0x487)]],this[_0x25e46b(0x343)](this[_0x25e46b(0x752)]),this[_0x25e46b(0x869)](0xc0),this[_0x25e46b(0x869)](this[_0x25e46b(0x5a1)]()),this['createCustomBackgroundImages']();}}const _0x3204ce=this[_0x25e46b(0x70e)](),_0x33b0c5=Math[_0x25e46b(0x167)](_0x3204ce*0.75);for(let _0x23d170=0x0;_0x23d170<_0x21f2b6[_0x25e46b(0x3ec)];_0x23d170++){if(_0x25e46b(0x9bf)!=='Riegh')_0x230ad0[_0x25e46b(0x45d)]['SceneManager_initialize'][_0x25e46b(0x967)](this),this[_0x25e46b(0x216)]();else{const _0x17ffa3=this[_0x25e46b(0x7ef)](_0x33b0c5,_0x3204ce);_0x17ffa3[_0x25e46b(0x208)][_0x25e46b(0x6a0)](_0x21f2b6[_0x23d170],0x0,0x0,_0x33b0c5,_0x3204ce,_0x25e46b(0x544)),_0x17ffa3['x']=(_0x23d170-(_0x21f2b6[_0x25e46b(0x3ec)]-0x1)/0x2)*_0x33b0c5,_0x17ffa3['dy']=-_0x23d170;}}},Sprite_Damage[_0x38072d(0x182)][_0x38072d(0x7a5)]=function(){const _0x209bd8=_0x38072d;return VisuMZ['CoreEngine'][_0x209bd8(0x75d)][_0x209bd8(0x6a9)][_0x209bd8(0x640)];},Sprite_Damage['prototype'][_0x38072d(0x711)]=function(){const _0x1b8b48=_0x38072d;return ColorManager[_0x1b8b48(0x165)]();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x884)]=Sprite_Gauge[_0x38072d(0x182)][_0x38072d(0x13c)],Sprite_Gauge[_0x38072d(0x182)][_0x38072d(0x13c)]=function(){const _0x1fb703=_0x38072d;return VisuMZ[_0x1fb703(0x45d)][_0x1fb703(0x884)]['call'](this)['clamp'](0x0,0x1);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x5ea)]=Sprite_Gauge[_0x38072d(0x182)][_0x38072d(0x492)],Sprite_Gauge[_0x38072d(0x182)][_0x38072d(0x492)]=function(){const _0x4d1d63=_0x38072d;let _0x90e22d=VisuMZ[_0x4d1d63(0x45d)][_0x4d1d63(0x5ea)][_0x4d1d63(0x967)](this);return _0x90e22d;},Sprite_Gauge[_0x38072d(0x182)][_0x38072d(0x3aa)]=function(){const _0x360e1d=_0x38072d;let _0x37303f=this[_0x360e1d(0x492)]();this[_0x360e1d(0x7a5)]()&&('TrSKP'!==_0x360e1d(0x86c)?_0x37303f=VisuMZ[_0x360e1d(0x9ae)](_0x37303f):_0x260787[_0x360e1d(0x581)](_0x548ccf));const _0x120b77=this[_0x360e1d(0x499)]()-0x1,_0x2117fc=this[_0x360e1d(0x6fc)]?this['textHeight']():this[_0x360e1d(0x3c9)]();this['setupValueFont'](),this[_0x360e1d(0x208)][_0x360e1d(0x6a0)](_0x37303f,0x0,0x0,_0x120b77,_0x2117fc,'right');},Sprite_Gauge[_0x38072d(0x182)][_0x38072d(0x2c8)]=function(){return 0x3;},Sprite_Gauge[_0x38072d(0x182)]['useDigitGrouping']=function(){const _0x8ddadd=_0x38072d;return VisuMZ[_0x8ddadd(0x45d)][_0x8ddadd(0x75d)][_0x8ddadd(0x6a9)]['DigitGroupingGaugeSprites'];},Sprite_Gauge[_0x38072d(0x182)][_0x38072d(0x711)]=function(){return ColorManager['outlineColorGauge']();},VisuMZ['CoreEngine'][_0x38072d(0x151)]=Sprite_Picture[_0x38072d(0x182)][_0x38072d(0x257)],Sprite_Picture[_0x38072d(0x182)][_0x38072d(0x257)]=function(){const _0x5b2d05=_0x38072d;this[_0x5b2d05(0x18d)]&&this['_pictureName']['match'](/VisuMZ CoreEngine PictureIcon (\d+)/i)?this['loadIconBitmap'](Number(RegExp['$1'])):VisuMZ[_0x5b2d05(0x45d)][_0x5b2d05(0x151)][_0x5b2d05(0x967)](this);},Sprite_Picture[_0x38072d(0x182)][_0x38072d(0x4a4)]=function(_0x1e40a6){const _0x4b5a22=_0x38072d,_0x228f02=ImageManager[_0x4b5a22(0x202)],_0x14b687=ImageManager[_0x4b5a22(0x593)],_0x1fc8db=this[_0x4b5a22(0x18d)][_0x4b5a22(0x322)](/SMOOTH/i);this[_0x4b5a22(0x208)]=new Bitmap(_0x228f02,_0x14b687);const _0x3b4ec2=ImageManager[_0x4b5a22(0x7f9)]('IconSet'),_0x467abc=_0x1e40a6%0x10*_0x228f02,_0x191a3b=Math['floor'](_0x1e40a6/0x10)*_0x14b687;this[_0x4b5a22(0x208)][_0x4b5a22(0x43e)]=_0x1fc8db,this['bitmap'][_0x4b5a22(0x21a)](_0x3b4ec2,_0x467abc,_0x191a3b,_0x228f02,_0x14b687,0x0,0x0,_0x228f02,_0x14b687);};function Sprite_TitlePictureButton(){this['initialize'](...arguments);}Sprite_TitlePictureButton[_0x38072d(0x182)]=Object[_0x38072d(0x3ac)](Sprite_Clickable[_0x38072d(0x182)]),Sprite_TitlePictureButton[_0x38072d(0x182)][_0x38072d(0x1aa)]=Sprite_TitlePictureButton,Sprite_TitlePictureButton[_0x38072d(0x182)][_0x38072d(0x770)]=function(_0x391467){const _0x1c35cd=_0x38072d;Sprite_Clickable[_0x1c35cd(0x182)][_0x1c35cd(0x770)]['call'](this),this[_0x1c35cd(0x197)]=_0x391467,this[_0x1c35cd(0x1f4)]=null,this[_0x1c35cd(0x554)]();},Sprite_TitlePictureButton[_0x38072d(0x182)][_0x38072d(0x554)]=function(){const _0x55609e=_0x38072d;this['x']=Graphics[_0x55609e(0x729)],this['y']=Graphics[_0x55609e(0x486)],this[_0x55609e(0x5de)]=![],this[_0x55609e(0x3c5)]();},Sprite_TitlePictureButton[_0x38072d(0x182)][_0x38072d(0x3c5)]=function(){const _0x3da455=_0x38072d;this[_0x3da455(0x208)]=ImageManager[_0x3da455(0x572)](this[_0x3da455(0x197)]['PictureFilename']),this[_0x3da455(0x208)][_0x3da455(0x955)](this[_0x3da455(0x4a5)][_0x3da455(0x667)](this));},Sprite_TitlePictureButton[_0x38072d(0x182)][_0x38072d(0x4a5)]=function(){const _0x74e04b=_0x38072d;this[_0x74e04b(0x197)]['OnLoadJS'][_0x74e04b(0x967)](this),this[_0x74e04b(0x197)]['PositionJS']['call'](this),this[_0x74e04b(0x56e)](this[_0x74e04b(0x197)][_0x74e04b(0x868)][_0x74e04b(0x667)](this));},Sprite_TitlePictureButton['prototype']['update']=function(){const _0x4985f6=_0x38072d;Sprite_Clickable[_0x4985f6(0x182)]['update'][_0x4985f6(0x967)](this),this[_0x4985f6(0x79f)](),this[_0x4985f6(0x9eb)]();},Sprite_TitlePictureButton[_0x38072d(0x182)][_0x38072d(0x2d5)]=function(){const _0x35805f=_0x38072d;return VisuMZ['CoreEngine'][_0x35805f(0x75d)]['MenuLayout'][_0x35805f(0x4d2)][_0x35805f(0x649)];},Sprite_TitlePictureButton['prototype'][_0x38072d(0x79f)]=function(){const _0x29ce53=_0x38072d;if(this[_0x29ce53(0x761)]||this['_hovered'])this[_0x29ce53(0x7d1)]=0xff;else{if(_0x29ce53(0x6ab)===_0x29ce53(0xee)){const _0x5bc8ef=_0x9b28e8[_0x29ce53(0x9d6)]((_0x16ef58-_0x52b120)/_0x5f254c,_0x4677be||_0x29ce53(0x894)),_0x154e23=_0x35e9e8[_0x29ce53(0x9d6)]((_0x5582f0-_0x481e2e+0x1)/_0x5c1180,_0x2a02f4||_0x29ce53(0x894)),_0x2a5186=(_0x3a46cf-_0x56e2d1*_0x5bc8ef)/(0x1-_0x5bc8ef);return _0x2a5186+(_0x16c857-_0x2a5186)*_0x154e23;}else this[_0x29ce53(0x7d1)]+=this[_0x29ce53(0x5de)]?this[_0x29ce53(0x2d5)]():-0x1*this[_0x29ce53(0x2d5)](),this[_0x29ce53(0x7d1)]=Math[_0x29ce53(0x864)](0xc0,this[_0x29ce53(0x7d1)]);}},Sprite_TitlePictureButton[_0x38072d(0x182)][_0x38072d(0x56e)]=function(_0x2ccafe){const _0x5004e1=_0x38072d;this[_0x5004e1(0x1f4)]=_0x2ccafe;},Sprite_TitlePictureButton[_0x38072d(0x182)][_0x38072d(0x2d1)]=function(){const _0x5b13e6=_0x38072d;if(this[_0x5b13e6(0x1f4)]){if('iSNVS'!=='qTclD')this[_0x5b13e6(0x1f4)]();else{_0x3c1142[_0x5b13e6(0x45d)][_0x5b13e6(0x1ae)][_0x5b13e6(0x967)](this);if(!_0x31c3b6[_0x5b13e6(0x68a)])this[_0x5b13e6(0x548)]();}}},VisuMZ['CoreEngine']['Spriteset_Base_initialize']=Spriteset_Base['prototype'][_0x38072d(0x770)],Spriteset_Base[_0x38072d(0x182)]['initialize']=function(){const _0x447093=_0x38072d;VisuMZ['CoreEngine'][_0x447093(0x9bc)][_0x447093(0x967)](this),this[_0x447093(0x149)]();},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x149)]=function(){const _0x4006b9=_0x38072d;this[_0x4006b9(0x3f1)]=[],this['_pointAnimationSprites']=[],this[_0x4006b9(0x355)]=this[_0x4006b9(0x834)]['x'],this[_0x4006b9(0x77e)]=this[_0x4006b9(0x834)]['y'];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x140)]=Spriteset_Base[_0x38072d(0x182)]['destroy'],Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x420)]=function(_0x288e12){const _0x55bc11=_0x38072d;this['removeAllFauxAnimations'](),this[_0x55bc11(0x989)](),VisuMZ[_0x55bc11(0x45d)][_0x55bc11(0x140)][_0x55bc11(0x967)](this,_0x288e12);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x460)]=Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x444)],Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x444)]=function(){const _0x227b20=_0x38072d;VisuMZ[_0x227b20(0x45d)][_0x227b20(0x460)][_0x227b20(0x967)](this),this[_0x227b20(0x6a4)](),this[_0x227b20(0x961)](),this['updateFauxAnimations'](),this['updatePointAnimations']();},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x6a4)]=function(){},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x961)]=function(){const _0x19ab9c=_0x38072d;if(!VisuMZ[_0x19ab9c(0x45d)]['Settings']['QoL'][_0x19ab9c(0x1f7)])return;if(this[_0x19ab9c(0x355)]===this['scale']['x']&&this[_0x19ab9c(0x77e)]===this[_0x19ab9c(0x834)]['y'])return;this[_0x19ab9c(0x251)](),this[_0x19ab9c(0x355)]=this[_0x19ab9c(0x834)]['x'],this[_0x19ab9c(0x77e)]=this['scale']['y'];},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x251)]=function(){const _0x197a5f=_0x38072d;if(SceneManager[_0x197a5f(0x61b)]()&&Spriteset_Map['DETACH_PICTURE_CONTAINER'])return;else{if(SceneManager[_0x197a5f(0x89e)]()&&Spriteset_Battle[_0x197a5f(0x769)])return;}this['scale']['x']!==0x0&&(this[_0x197a5f(0x1b7)]['scale']['x']=0x1/this['scale']['x'],this['_pictureContainer']['x']=-(this['x']/this[_0x197a5f(0x834)]['x'])),this[_0x197a5f(0x834)]['y']!==0x0&&(this[_0x197a5f(0x1b7)]['scale']['y']=0x1/this[_0x197a5f(0x834)]['y'],this[_0x197a5f(0x1b7)]['y']=-(this['y']/this[_0x197a5f(0x834)]['y']));},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x1b3)]=Spriteset_Base[_0x38072d(0x182)]['updatePosition'],Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x2a3)]=function(){const _0x27f758=_0x38072d;VisuMZ[_0x27f758(0x45d)][_0x27f758(0x1b3)][_0x27f758(0x967)](this),this[_0x27f758(0x6d7)]();},Spriteset_Base[_0x38072d(0x182)]['updatePositionCoreEngine']=function(){const _0x304099=_0x38072d;if(!$gameScreen)return;if($gameScreen[_0x304099(0x8c3)]<=0x0)return;this['x']-=Math[_0x304099(0x337)]($gameScreen[_0x304099(0x397)]());const _0x31ee7e=$gameScreen[_0x304099(0x881)]();switch($gameScreen[_0x304099(0x881)]()){case'original':this[_0x304099(0x42d)]();break;case _0x304099(0x19e):this[_0x304099(0x4e2)]();break;case _0x304099(0x705):this[_0x304099(0x109)]();break;default:this['updatePositionCoreEngineShakeRand']();break;}},Spriteset_Base[_0x38072d(0x182)]['updatePositionCoreEngineShakeOriginal']=function(){const _0x1f4f8f=_0x38072d,_0x26b1c7=VisuMZ[_0x1f4f8f(0x45d)][_0x1f4f8f(0x75d)][_0x1f4f8f(0x363)];if(_0x26b1c7&&_0x26b1c7[_0x1f4f8f(0x34f)])return _0x26b1c7[_0x1f4f8f(0x34f)][_0x1f4f8f(0x967)](this);this['x']+=Math['round']($gameScreen[_0x1f4f8f(0x397)]());},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x51e)]=function(){const _0x5300b7=_0x38072d,_0x138cdb=VisuMZ[_0x5300b7(0x45d)][_0x5300b7(0x75d)][_0x5300b7(0x363)];if(_0x138cdb&&_0x138cdb['randomJS'])return _0x138cdb['randomJS'][_0x5300b7(0x967)](this);const _0x53ed11=$gameScreen[_0x5300b7(0x117)]*0.75,_0x3ace82=$gameScreen[_0x5300b7(0x691)]*0.6,_0x4f7447=$gameScreen[_0x5300b7(0x8c3)];this['x']+=Math[_0x5300b7(0x337)](Math[_0x5300b7(0x4d6)](_0x53ed11)-Math[_0x5300b7(0x4d6)](_0x3ace82))*(Math['min'](_0x4f7447,0x1e)*0.5),this['y']+=Math[_0x5300b7(0x337)](Math[_0x5300b7(0x4d6)](_0x53ed11)-Math[_0x5300b7(0x4d6)](_0x3ace82))*(Math[_0x5300b7(0x864)](_0x4f7447,0x1e)*0.5);},Spriteset_Base[_0x38072d(0x182)]['updatePositionCoreEngineShakeHorz']=function(){const _0x47ef1a=_0x38072d,_0x59e657=VisuMZ['CoreEngine'][_0x47ef1a(0x75d)][_0x47ef1a(0x363)];if(_0x59e657&&_0x59e657[_0x47ef1a(0x2e5)])return _0x59e657[_0x47ef1a(0x2e5)][_0x47ef1a(0x967)](this);const _0x4737ff=$gameScreen[_0x47ef1a(0x117)]*0.75,_0x1b9f5e=$gameScreen[_0x47ef1a(0x691)]*0.6,_0xdbbcac=$gameScreen[_0x47ef1a(0x8c3)];this['x']+=Math[_0x47ef1a(0x337)](Math['randomInt'](_0x4737ff)-Math[_0x47ef1a(0x4d6)](_0x1b9f5e))*(Math['min'](_0xdbbcac,0x1e)*0.5);},Spriteset_Base[_0x38072d(0x182)]['updatePositionCoreEngineShakeVert']=function(){const _0x1caaef=_0x38072d,_0xe11dd7=VisuMZ['CoreEngine'][_0x1caaef(0x75d)][_0x1caaef(0x363)];if(_0xe11dd7&&_0xe11dd7['vertJS'])return'BIbIT'==='KVQvf'?![]:_0xe11dd7[_0x1caaef(0x76d)][_0x1caaef(0x967)](this);const _0x5ed037=$gameScreen[_0x1caaef(0x117)]*0.75,_0x2a7bfc=$gameScreen[_0x1caaef(0x691)]*0.6,_0x3f6323=$gameScreen[_0x1caaef(0x8c3)];this['y']+=Math[_0x1caaef(0x337)](Math['randomInt'](_0x5ed037)-Math[_0x1caaef(0x4d6)](_0x2a7bfc))*(Math[_0x1caaef(0x864)](_0x3f6323,0x1e)*0.5);},Spriteset_Base[_0x38072d(0x182)]['updateFauxAnimations']=function(){const _0x57b33e=_0x38072d;for(const _0x10869d of this[_0x57b33e(0x3f1)]){'fcOxf'===_0x57b33e(0x9d8)?!_0x10869d[_0x57b33e(0x8c5)]()&&(_0x57b33e(0xff)==='JQQFu'?this[_0x57b33e(0x8ce)](_0x10869d):this[_0x57b33e(0x48d)][_0x57b33e(0x6ad)](_0x5ab84a[_0x57b33e(0x54f)][_0x57b33e(0x4fa)])):this[_0x57b33e(0x70b)]();}this[_0x57b33e(0x366)]();},Spriteset_Base['prototype'][_0x38072d(0x366)]=function(){const _0x27b6e4=_0x38072d;for(;;){const _0x22ecf7=$gameTemp['retrieveFauxAnimation']();if(_0x22ecf7)this[_0x27b6e4(0x91c)](_0x22ecf7);else{if('QyNla'!==_0x27b6e4(0x69d))break;else{const _0x5cbf14=_0x27b6e4(0x457);this[_0x27b6e4(0x21f)]['remove'](_0x7a8cdd)[_0x27b6e4(0x891)]('')[_0x27b6e4(0x891)](null);const _0x110f04=this[_0x27b6e4(0x21f)][_0x27b6e4(0x6a3)]('\x0a\x0a\x0a\x0a\x0a')[_0x27b6e4(0x5bd)]();_0x229800[_0x27b6e4(0x45d)][_0x27b6e4(0x164)](_0x110f04,_0x5cbf14,!![]),_0x461d1c['_scene'][_0x27b6e4(0x280)]=!![];}}}},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x91c)]=function(_0x20ad42){const _0x4d5cb4=_0x38072d,_0x130276=$dataAnimations[_0x20ad42['animationId']],_0x49bed7=_0x20ad42[_0x4d5cb4(0x2b4)],_0x1e8182=_0x20ad42[_0x4d5cb4(0x7eb)],_0x24740c=_0x20ad42[_0x4d5cb4(0x54b)];let _0x3a7542=this[_0x4d5cb4(0x6b7)]();const _0x235eda=this['animationNextDelay']();if(this[_0x4d5cb4(0x82b)](_0x130276))for(const _0x2a7071 of _0x49bed7){this[_0x4d5cb4(0x19b)]([_0x2a7071],_0x130276,_0x1e8182,_0x3a7542,_0x24740c),_0x3a7542+=_0x235eda;}else this['createFauxAnimationSprite'](_0x49bed7,_0x130276,_0x1e8182,_0x3a7542,_0x24740c);},Spriteset_Base['prototype'][_0x38072d(0x959)]=function(_0x40bffd,_0x4b0df1,_0x29ae71,_0x461ec2){const _0x44b915=_0x38072d,_0x2815a4=this[_0x44b915(0x9e9)](_0x4b0df1),_0x3c5dc3=new(_0x2815a4?Sprite_AnimationMV:Sprite_Animation)(),_0x4cdf1a=this[_0x44b915(0x192)](_0x40bffd),_0x28369f=this[_0x44b915(0x6b7)](),_0x384df8=_0x461ec2>_0x28369f?this['lastAnimationSprite']():null;this[_0x44b915(0x7f2)](_0x40bffd[0x0])&&(_0x29ae71=!_0x29ae71),_0x3c5dc3[_0x44b915(0x796)]=_0x40bffd,_0x3c5dc3[_0x44b915(0x554)](_0x4cdf1a,_0x4b0df1,_0x29ae71,_0x461ec2,_0x384df8),this['addAnimationSpriteToContainer'](_0x3c5dc3),this[_0x44b915(0x714)]['push'](_0x3c5dc3);},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x19b)]=function(_0x411dd5,_0x1184db,_0x3bb49e,_0x5e942f,_0x88fb4){const _0x3e8013=_0x38072d,_0x409e91=this[_0x3e8013(0x9e9)](_0x1184db),_0x3e277=new(_0x409e91?Sprite_AnimationMV:Sprite_Animation)(),_0x341752=this[_0x3e8013(0x192)](_0x411dd5);this[_0x3e8013(0x7f2)](_0x411dd5[0x0])&&(_0x3bb49e=!_0x3bb49e);_0x3e277[_0x3e8013(0x796)]=_0x411dd5,_0x3e277[_0x3e8013(0x554)](_0x341752,_0x1184db,_0x3bb49e,_0x5e942f),_0x3e277[_0x3e8013(0x99f)](_0x88fb4),this[_0x3e8013(0x38d)](_0x3e277);if(this[_0x3e8013(0x714)])this[_0x3e8013(0x714)]['remove'](_0x3e277);this[_0x3e8013(0x3f1)][_0x3e8013(0x534)](_0x3e277);},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x38d)]=function(_0x183d1e){const _0x247fcd=_0x38072d;this[_0x247fcd(0x515)][_0x247fcd(0x343)](_0x183d1e);},Spriteset_Base['prototype'][_0x38072d(0x359)]=function(_0x1cc1f5){const _0x54f0c3=_0x38072d;this[_0x54f0c3(0x714)][_0x54f0c3(0x891)](_0x1cc1f5),this[_0x54f0c3(0x31e)](_0x1cc1f5);for(const _0x205a27 of _0x1cc1f5[_0x54f0c3(0x796)]){_0x205a27['endAnimation']&&_0x205a27['endAnimation']();}_0x1cc1f5[_0x54f0c3(0x420)]();},Spriteset_Base['prototype'][_0x38072d(0x8ce)]=function(_0x85b2f9){const _0x42511f=_0x38072d;this[_0x42511f(0x3f1)]['remove'](_0x85b2f9),this[_0x42511f(0x31e)](_0x85b2f9);for(const _0x33ab20 of _0x85b2f9['targetObjects']){if(_0x33ab20[_0x42511f(0x624)]){if('XnWmC'===_0x42511f(0x24c))return![];else _0x33ab20[_0x42511f(0x624)]();}}_0x85b2f9[_0x42511f(0x420)]();},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x31e)]=function(_0xf171d7){const _0x6b0db0=_0x38072d;this[_0x6b0db0(0x515)][_0x6b0db0(0x501)](_0xf171d7);},Spriteset_Base['prototype']['removeAllFauxAnimations']=function(){const _0x2a3ef3=_0x38072d;for(const _0xe497c9 of this[_0x2a3ef3(0x3f1)]){if(_0x2a3ef3(0x3bc)!==_0x2a3ef3(0x6ae))this['removeFauxAnimation'](_0xe497c9);else return this[_0x2a3ef3(0x648)][_0x2a3ef3(0x28b)]('/')[_0x2a3ef3(0x384)]();}},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x4b4)]=function(){const _0x3abe20=_0x38072d;return this[_0x3abe20(0x3f1)][_0x3abe20(0x3ec)]>0x0;},Spriteset_Base[_0x38072d(0x182)]['updatePointAnimations']=function(){const _0x3c5b12=_0x38072d;for(const _0x52655a of this[_0x3c5b12(0xed)]){if(!_0x52655a['isPlaying']()){if(_0x3c5b12(0x87d)===_0x3c5b12(0x87d))this[_0x3c5b12(0x5ad)](_0x52655a);else return _0x5bf68e[_0x3c5b12(0x9d6)](_0x4274d7,this[_0x3c5b12(0x162)]);}}this[_0x3c5b12(0x7d7)]();},Spriteset_Base[_0x38072d(0x182)]['processPointAnimationRequests']=function(){const _0x196b6b=_0x38072d;for(;;){if(_0x196b6b(0x94e)!==_0x196b6b(0x94e)){const _0x2142c1='_stored_tpGaugeColor2';this['_colorCache']=this[_0x196b6b(0x66d)]||{};if(this[_0x196b6b(0x66d)][_0x2142c1])return this['_colorCache'][_0x2142c1];const _0x128430=_0x3164c5['CoreEngine'][_0x196b6b(0x75d)][_0x196b6b(0x190)]['ColorTPGauge2'];return this['getColorDataFromPluginParameters'](_0x2142c1,_0x128430);}else{const _0x164144=$gameTemp[_0x196b6b(0x497)]();if(_0x164144)this[_0x196b6b(0x516)](_0x164144);else{if('NPPDK'!==_0x196b6b(0x383)){if(this[_0x196b6b(0x576)][_0x196b6b(0x47a)])this[_0x196b6b(0x576)][_0x196b6b(0x47a)][_0x196b6b(0x7c3)]();if(this[_0x196b6b(0x576)][_0x196b6b(0x423)])this['_scene'][_0x196b6b(0x423)][_0x196b6b(0x7c3)]();}else break;}}}},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x516)]=function(_0x59bff3){const _0x40f893=_0x38072d,_0x220552=$dataAnimations[_0x59bff3['animationId']],_0x505fc5=this[_0x40f893(0x39d)](_0x59bff3),_0x5cec01=_0x59bff3[_0x40f893(0x7eb)],_0x16136d=_0x59bff3[_0x40f893(0x54b)];let _0x1ac7a0=this[_0x40f893(0x6b7)]();const _0x30a43e=this['animationNextDelay']();if(this[_0x40f893(0x82b)](_0x220552))for(const _0x417c65 of _0x505fc5){this[_0x40f893(0x387)]([_0x417c65],_0x220552,_0x5cec01,_0x1ac7a0,_0x16136d),_0x1ac7a0+=_0x30a43e;}else this[_0x40f893(0x387)](_0x505fc5,_0x220552,_0x5cec01,_0x1ac7a0,_0x16136d);},Spriteset_Base[_0x38072d(0x182)]['createPointAnimationTargets']=function(_0x110d72){const _0x136c63=_0x38072d,_0xb01e21=new Sprite_Clickable(),_0xbc9b09=this['getPointAnimationLayer']();_0xb01e21['x']=_0x110d72['x']-_0xbc9b09['x'],_0xb01e21['y']=_0x110d72['y']-_0xbc9b09['y'],_0xb01e21['z']=0x64;const _0xe9f7c=this['getPointAnimationLayer']();return _0xe9f7c[_0x136c63(0x343)](_0xb01e21),[_0xb01e21];},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x9ac)]=function(){return this;},Spriteset_Map[_0x38072d(0x182)]['getPointAnimationLayer']=function(){return this['_tilemap']||this;},Spriteset_Battle[_0x38072d(0x182)][_0x38072d(0x9ac)]=function(){const _0x5e87e9=_0x38072d;return this[_0x5e87e9(0x7dd)]||this;},Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x387)]=function(_0x53f7b2,_0x3e62b9,_0xd08900,_0x43ddf4,_0x5b4bd5){const _0xd21e99=_0x38072d,_0x42d649=this['isMVAnimation'](_0x3e62b9),_0x2ad566=new(_0x42d649?Sprite_AnimationMV:Sprite_Animation)();_0x2ad566[_0xd21e99(0x796)]=_0x53f7b2,_0x2ad566['setup'](_0x53f7b2,_0x3e62b9,_0xd08900,_0x43ddf4),_0x2ad566[_0xd21e99(0x99f)](_0x5b4bd5),this[_0xd21e99(0x38d)](_0x2ad566),this[_0xd21e99(0xed)][_0xd21e99(0x534)](_0x2ad566);},Spriteset_Base['prototype'][_0x38072d(0x5ad)]=function(_0x110b09){const _0xce5f1f=_0x38072d;this['_pointAnimationSprites'][_0xce5f1f(0x891)](_0x110b09),this[_0xce5f1f(0x515)][_0xce5f1f(0x501)](_0x110b09);for(const _0x38138d of _0x110b09[_0xce5f1f(0x796)]){_0x38138d[_0xce5f1f(0x624)]&&('YJFAA'===_0xce5f1f(0x8d4)?this['_anglePlus']={'current':0x0,'target':0x0,'duration':0x0,'wholeDuration':0x0,'easingType':_0xce5f1f(0x894)}:_0x38138d[_0xce5f1f(0x624)]());const _0x19ca33=this[_0xce5f1f(0x9ac)]();if(_0x19ca33)_0x19ca33[_0xce5f1f(0x501)](_0x38138d);}_0x110b09[_0xce5f1f(0x420)]();},Spriteset_Base[_0x38072d(0x182)]['removeAllPointAnimations']=function(){const _0x1e35b6=_0x38072d;for(const _0x5da352 of this[_0x1e35b6(0xed)]){_0x1e35b6(0x9dc)===_0x1e35b6(0x9dc)?this['removePointAnimation'](_0x5da352):(_0x23ea4a['CoreEngine'][_0x1e35b6(0x8a0)][_0x1e35b6(0x967)](this),this['setCoreEngineUpdateWindowBg']());}},Spriteset_Base['prototype'][_0x38072d(0x47e)]=function(){const _0x45373a=_0x38072d;return this[_0x45373a(0xed)][_0x45373a(0x3ec)]>0x0;},VisuMZ[_0x38072d(0x45d)]['Spriteset_Base_isAnimationPlaying']=Spriteset_Base['prototype'][_0x38072d(0x5e4)],Spriteset_Base[_0x38072d(0x182)][_0x38072d(0x5e4)]=function(){const _0x1b0bdf=_0x38072d;return VisuMZ[_0x1b0bdf(0x45d)]['Spriteset_Base_isAnimationPlaying'][_0x1b0bdf(0x967)](this)||this[_0x1b0bdf(0x47e)]();},Spriteset_Map[_0x38072d(0x769)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)]['QoL'][_0x38072d(0x45f)]||![],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x4a8)]=Scene_Map[_0x38072d(0x182)][_0x38072d(0x126)],Scene_Map[_0x38072d(0x182)][_0x38072d(0x126)]=function(){const _0x3d7f3f=_0x38072d;VisuMZ['CoreEngine'][_0x3d7f3f(0x4a8)][_0x3d7f3f(0x967)](this);if(!Spriteset_Map[_0x3d7f3f(0x769)])return;const _0xcf0e7b=this[_0x3d7f3f(0x6ba)];if(!_0xcf0e7b)return;this['_pictureContainer']=_0xcf0e7b['_pictureContainer'];if(!this[_0x3d7f3f(0x1b7)])return;this[_0x3d7f3f(0x343)](this[_0x3d7f3f(0x1b7)]);},Spriteset_Battle[_0x38072d(0x769)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x6a9)][_0x38072d(0x9fc)]||![],VisuMZ[_0x38072d(0x45d)][_0x38072d(0x5be)]=Scene_Battle['prototype'][_0x38072d(0x126)],Scene_Battle['prototype'][_0x38072d(0x126)]=function(){const _0x12805f=_0x38072d;VisuMZ[_0x12805f(0x45d)][_0x12805f(0x5be)][_0x12805f(0x967)](this);if(!Spriteset_Battle[_0x12805f(0x769)])return;const _0x36734f=this[_0x12805f(0x6ba)];if(!_0x36734f)return;this[_0x12805f(0x1b7)]=_0x36734f['_pictureContainer'];if(!this['_pictureContainer'])return;this['addChild'](this[_0x12805f(0x1b7)]);},Spriteset_Battle[_0x38072d(0x182)][_0x38072d(0x17b)]=function(){const _0x362364=_0x38072d;this['_backgroundFilter']=new PIXI[(_0x362364(0x7b9))][(_0x362364(0x903))](clamp=!![]),this[_0x362364(0x752)]=new Sprite(),this['_backgroundSprite'][_0x362364(0x208)]=SceneManager[_0x362364(0x2e7)](),this[_0x362364(0x752)]['filters']=[this[_0x362364(0x487)]],this['_baseSprite'][_0x362364(0x343)](this[_0x362364(0x752)]);},VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x38072d(0x182)][_0x38072d(0x3cb)],Spriteset_Battle[_0x38072d(0x182)]['createEnemies']=function(){const _0x5216d1=_0x38072d;this['coreEngineRepositionEnemies']()&&this['repositionEnemiesByResolution'](),VisuMZ['CoreEngine'][_0x5216d1(0x7ec)][_0x5216d1(0x967)](this);},Spriteset_Battle[_0x38072d(0x182)][_0x38072d(0x344)]=function(){const _0x130e1c=_0x38072d,_0x47f59a=VisuMZ[_0x130e1c(0x45d)]['Settings'][_0x130e1c(0x27f)];if(!_0x47f59a)return![];if(Utils['RPGMAKER_VERSION']>=_0x130e1c(0x94f)&&!_0x47f59a[_0x130e1c(0x47f)])return'wYBcK'!==_0x130e1c(0x97d)?![]:_0x1a0eb6[_0x130e1c(0x45d)][_0x130e1c(0x75d)][_0x130e1c(0x4f0)][_0x130e1c(0x44b)];return _0x47f59a['RepositionEnemies'];},Spriteset_Battle[_0x38072d(0x182)][_0x38072d(0xa03)]=function(){const _0x2f0a6b=_0x38072d;for(member of $gameTroop[_0x2f0a6b(0x896)]()){member[_0x2f0a6b(0x627)]();}},VisuMZ['CoreEngine'][_0x38072d(0x591)]=Window_Base[_0x38072d(0x182)]['initialize'],Window_Base[_0x38072d(0x182)][_0x38072d(0x770)]=function(_0x2ecd79){const _0x41793e=_0x38072d;_0x2ecd79['x']=Math[_0x41793e(0x337)](_0x2ecd79['x']),_0x2ecd79['y']=Math[_0x41793e(0x337)](_0x2ecd79['y']),_0x2ecd79[_0x41793e(0x729)]=Math['round'](_0x2ecd79[_0x41793e(0x729)]),_0x2ecd79[_0x41793e(0x486)]=Math['round'](_0x2ecd79[_0x41793e(0x486)]),this['initDigitGrouping'](),VisuMZ[_0x41793e(0x45d)]['Window_Base_initialize']['call'](this,_0x2ecd79),this[_0x41793e(0x9bd)]();},Window_Base[_0x38072d(0x182)][_0x38072d(0x862)]=function(){const _0x28344e=_0x38072d;this['_digitGrouping']=VisuMZ['CoreEngine'][_0x28344e(0x75d)][_0x28344e(0x6a9)][_0x28344e(0x518)],this[_0x28344e(0x580)]=VisuMZ[_0x28344e(0x45d)]['Settings']['QoL']['DigitGroupingExText'];},Window_Base['prototype']['lineHeight']=function(){const _0xd7465c=_0x38072d;return VisuMZ[_0xd7465c(0x45d)][_0xd7465c(0x75d)]['Window'][_0xd7465c(0x54d)];},Window_Base[_0x38072d(0x182)][_0x38072d(0x636)]=function(){const _0x137b63=_0x38072d;return VisuMZ[_0x137b63(0x45d)]['Settings'][_0x137b63(0x4f0)][_0x137b63(0x833)];},Window_Base[_0x38072d(0x182)][_0x38072d(0x547)]=function(){const _0xe9d157=_0x38072d;if($gameSystem[_0xe9d157(0x30a)])this[_0xe9d157(0x24d)]=$gameSystem[_0xe9d157(0x30a)]();else{if('UqwqN'==='UqwqN')this[_0xe9d157(0x24d)]=VisuMZ[_0xe9d157(0x45d)][_0xe9d157(0x75d)][_0xe9d157(0x4f0)]['BackOpacity'];else return _0x1e805e[_0xe9d157(0x45d)][_0xe9d157(0x75d)][_0xe9d157(0x6a9)]['KeyItemProtect']&&_0x5b5fd9[_0xe9d157(0x768)](_0x4f2c79)?![]:_0x5e84f3[_0xe9d157(0x45d)][_0xe9d157(0xf6)][_0xe9d157(0x967)](this,_0x593059);}},Window_Base['prototype'][_0x38072d(0x56c)]=function(){const _0x2a9704=_0x38072d;return VisuMZ[_0x2a9704(0x45d)][_0x2a9704(0x75d)][_0x2a9704(0x4f0)][_0x2a9704(0x44b)];},Window_Base[_0x38072d(0x182)][_0x38072d(0x84e)]=function(){const _0x550ae6=_0x38072d;return VisuMZ[_0x550ae6(0x45d)][_0x550ae6(0x75d)][_0x550ae6(0x4f0)][_0x550ae6(0x730)];},VisuMZ['CoreEngine'][_0x38072d(0x5a7)]=Window_Base['prototype'][_0x38072d(0x444)],Window_Base[_0x38072d(0x182)]['update']=function(){const _0x4997d7=_0x38072d;VisuMZ[_0x4997d7(0x45d)][_0x4997d7(0x5a7)][_0x4997d7(0x967)](this),this[_0x4997d7(0x6ef)]();},Window_Base[_0x38072d(0x182)][_0x38072d(0x723)]=function(){const _0x28e2cf=_0x38072d;this[_0x28e2cf(0x656)]&&(_0x28e2cf(0x77f)!==_0x28e2cf(0x8e2)?(this['openness']+=this['openingSpeed'](),this['isOpen']()&&(this[_0x28e2cf(0x656)]=![])):_0x44cf4e[_0x28e2cf(0x1b8)](_0x107826));},Window_Base[_0x38072d(0x182)]['updateClose']=function(){const _0x1f89b8=_0x38072d;if(this[_0x1f89b8(0x264)]){if(_0x1f89b8(0x1a6)!==_0x1f89b8(0x1a6)){const _0xc8170a=this[_0x1f89b8(0x4d5)],_0x368fa5=_0xc8170a[_0x1f89b8(0x70c)],_0xc5546a=_0xc8170a[_0x1f89b8(0x622)],_0x295512=_0xc8170a[_0x1f89b8(0x28f)],_0x15f10f=_0x500b50['ApplyEasing']((_0x295512-_0xc5546a)/_0x295512,_0x368fa5),_0x1cfeac=_0x45f0bc[_0x1f89b8(0x9d6)]((_0x295512-_0xc5546a+0x1)/_0x295512,_0x368fa5),_0x4870b5=(_0x268857-_0xe4b386*_0x15f10f)/(0x1-_0x15f10f);return _0x4870b5+(_0xfa22bf-_0x4870b5)*_0x1cfeac;}else this['openness']-=this['openingSpeed'](),this[_0x1f89b8(0x69b)]()&&(this[_0x1f89b8(0x264)]=![]);}},VisuMZ['CoreEngine'][_0x38072d(0x50e)]=Window_Base[_0x38072d(0x182)][_0x38072d(0x6a0)],Window_Base[_0x38072d(0x182)]['drawText']=function(_0x290bb4,_0x4b9f6b,_0x39bb18,_0x3a73f0,_0x62f5d2){const _0x32960c=_0x38072d;if(this[_0x32960c(0x7a5)]())_0x290bb4=VisuMZ[_0x32960c(0x9ae)](_0x290bb4);VisuMZ[_0x32960c(0x45d)][_0x32960c(0x50e)][_0x32960c(0x967)](this,_0x290bb4,_0x4b9f6b,_0x39bb18,_0x3a73f0,_0x62f5d2);},Window_Base[_0x38072d(0x182)][_0x38072d(0x7a5)]=function(){const _0x3a3452=_0x38072d;return this[_0x3a3452(0x74b)];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x96b)]=Window_Base[_0x38072d(0x182)][_0x38072d(0x756)],Window_Base[_0x38072d(0x182)]['createTextState']=function(_0xe97c22,_0x1b8f49,_0x2d9711,_0x40c31f){const _0x3aa878=_0x38072d;var _0x75992f=VisuMZ[_0x3aa878(0x45d)][_0x3aa878(0x96b)][_0x3aa878(0x967)](this,_0xe97c22,_0x1b8f49,_0x2d9711,_0x40c31f);if(this[_0x3aa878(0x25c)]())_0x75992f[_0x3aa878(0x118)]=VisuMZ[_0x3aa878(0x9ae)](_0x75992f[_0x3aa878(0x118)]);return _0x75992f;},Window_Base[_0x38072d(0x182)][_0x38072d(0x25c)]=function(){return this['_digitGroupingEx'];},Window_Base[_0x38072d(0x182)][_0x38072d(0x155)]=function(_0x2003fa){const _0x2e29e5=_0x38072d;this[_0x2e29e5(0x74b)]=_0x2003fa;},Window_Base[_0x38072d(0x182)][_0x38072d(0x99a)]=function(_0x4112f7){const _0x12d8d5=_0x38072d;this[_0x12d8d5(0x580)]=_0x4112f7;},VisuMZ['CoreEngine'][_0x38072d(0x73e)]=Window_Base[_0x38072d(0x182)][_0x38072d(0x179)],Window_Base['prototype'][_0x38072d(0x179)]=function(_0x3be549,_0xe3db34,_0xaf6646){const _0x9f2bb6=_0x38072d;_0xe3db34=Math['round'](_0xe3db34),_0xaf6646=Math[_0x9f2bb6(0x337)](_0xaf6646),VisuMZ['CoreEngine']['Window_Base_drawIcon'][_0x9f2bb6(0x967)](this,_0x3be549,_0xe3db34,_0xaf6646);},VisuMZ['CoreEngine'][_0x38072d(0x9ec)]=Window_Base[_0x38072d(0x182)][_0x38072d(0x156)],Window_Base[_0x38072d(0x182)][_0x38072d(0x156)]=function(_0x558e0d,_0x4e70ee,_0x242489,_0x219902,_0x53e7d0,_0x12dd55){const _0x45ff60=_0x38072d;_0x53e7d0=_0x53e7d0||ImageManager['faceWidth'],_0x12dd55=_0x12dd55||ImageManager[_0x45ff60(0x92b)],_0x242489=Math[_0x45ff60(0x337)](_0x242489),_0x219902=Math['round'](_0x219902),_0x53e7d0=Math[_0x45ff60(0x337)](_0x53e7d0),_0x12dd55=Math[_0x45ff60(0x337)](_0x12dd55),VisuMZ[_0x45ff60(0x45d)][_0x45ff60(0x9ec)][_0x45ff60(0x967)](this,_0x558e0d,_0x4e70ee,_0x242489,_0x219902,_0x53e7d0,_0x12dd55);},VisuMZ[_0x38072d(0x45d)]['Window_Base_drawCharacter']=Window_Base[_0x38072d(0x182)][_0x38072d(0x12e)],Window_Base[_0x38072d(0x182)][_0x38072d(0x12e)]=function(_0x1c84c2,_0x4ab969,_0x44aa56,_0x4e94b1){const _0x4ebe92=_0x38072d;_0x44aa56=Math[_0x4ebe92(0x337)](_0x44aa56),_0x4e94b1=Math['round'](_0x4e94b1),VisuMZ[_0x4ebe92(0x45d)]['Window_Base_drawCharacter'][_0x4ebe92(0x967)](this,_0x1c84c2,_0x4ab969,_0x44aa56,_0x4e94b1);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x102)]=Window_Selectable[_0x38072d(0x182)][_0x38072d(0x30f)],Window_Selectable[_0x38072d(0x182)]['itemRect']=function(_0x281fe2){const _0x1d2ef8=_0x38072d;let _0x3c2213=VisuMZ[_0x1d2ef8(0x45d)][_0x1d2ef8(0x102)][_0x1d2ef8(0x967)](this,_0x281fe2);return _0x3c2213['x']=Math['round'](_0x3c2213['x']),_0x3c2213['y']=Math['round'](_0x3c2213['y']),_0x3c2213[_0x1d2ef8(0x729)]=Math[_0x1d2ef8(0x337)](_0x3c2213['width']),_0x3c2213['height']=Math[_0x1d2ef8(0x337)](_0x3c2213['height']),_0x3c2213;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x507)]=Window_StatusBase['prototype'][_0x38072d(0x7fd)],Window_StatusBase[_0x38072d(0x182)][_0x38072d(0x7fd)]=function(_0x452eda,_0x152a2f,_0x5ea1ed){const _0x201b75=_0x38072d;_0x152a2f=Math[_0x201b75(0x337)](_0x152a2f),_0x5ea1ed=Math[_0x201b75(0x337)](_0x5ea1ed),VisuMZ[_0x201b75(0x45d)]['Window_StatusBase_drawActorSimpleStatus'][_0x201b75(0x967)](this,_0x452eda,_0x152a2f,_0x5ea1ed);},Window_Base[_0x38072d(0x182)][_0x38072d(0x9bd)]=function(){const _0x901495=_0x38072d;this[_0x901495(0x2c3)]={'duration':0x0,'wholeDuration':0x0,'type':'LINEAR','targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x901495(0x834)]['x'],'targetScaleY':this['scale']['y'],'targetOpacity':this[_0x901495(0x7d1)],'targetBackOpacity':this[_0x901495(0x24d)],'targetContentsOpacity':this[_0x901495(0x741)]};},Window_Base[_0x38072d(0x182)][_0x38072d(0x6ef)]=function(){const _0x53ec56=_0x38072d;if(!this[_0x53ec56(0x2c3)])return;if(this[_0x53ec56(0x2c3)]['duration']<=0x0)return;this['x']=this[_0x53ec56(0x181)](this['x'],this[_0x53ec56(0x2c3)][_0x53ec56(0x237)]),this['y']=this[_0x53ec56(0x181)](this['y'],this[_0x53ec56(0x2c3)][_0x53ec56(0x40d)]),this[_0x53ec56(0x834)]['x']=this[_0x53ec56(0x181)](this[_0x53ec56(0x834)]['x'],this[_0x53ec56(0x2c3)][_0x53ec56(0x67a)]),this[_0x53ec56(0x834)]['y']=this[_0x53ec56(0x181)](this['scale']['y'],this[_0x53ec56(0x2c3)][_0x53ec56(0x4fb)]),this['opacity']=this[_0x53ec56(0x181)](this[_0x53ec56(0x7d1)],this['_coreEasing'][_0x53ec56(0x7c6)]),this['backOpacity']=this['applyCoreEasing'](this[_0x53ec56(0x24d)],this[_0x53ec56(0x2c3)]['targetBackOpacity']),this[_0x53ec56(0x741)]=this[_0x53ec56(0x181)](this[_0x53ec56(0x741)],this[_0x53ec56(0x2c3)]['targetContentsOpacity']),this['_coreEasing'][_0x53ec56(0x622)]--;},Window_Base[_0x38072d(0x182)]['applyCoreEasing']=function(_0x4b95aa,_0x182dd0){const _0x418b3f=_0x38072d;if(!this['_coreEasing'])return _0x182dd0;const _0x3308d3=this[_0x418b3f(0x2c3)]['duration'],_0x76d04a=this[_0x418b3f(0x2c3)][_0x418b3f(0x28f)],_0x17b273=this[_0x418b3f(0x6f8)]((_0x76d04a-_0x3308d3)/_0x76d04a),_0x13aa9c=this[_0x418b3f(0x6f8)]((_0x76d04a-_0x3308d3+0x1)/_0x76d04a),_0x40ba4c=(_0x4b95aa-_0x182dd0*_0x17b273)/(0x1-_0x17b273);return _0x40ba4c+(_0x182dd0-_0x40ba4c)*_0x13aa9c;},Window_Base[_0x38072d(0x182)][_0x38072d(0x6f8)]=function(_0x51f613){const _0x2f8e82=_0x38072d;if(!this['_coreEasing'])return _0x51f613;return VisuMZ[_0x2f8e82(0x9d6)](_0x51f613,this['_coreEasing'][_0x2f8e82(0x88f)]||_0x2f8e82(0x127));},Window_Base[_0x38072d(0x182)][_0x38072d(0x895)]=function(_0x499e56,_0x20dec9){const _0x9351f0=_0x38072d;if(!this['_coreEasing'])return;this['x']=this['_coreEasing']['targetX'],this['y']=this['_coreEasing'][_0x9351f0(0x40d)],this['scale']['x']=this[_0x9351f0(0x2c3)][_0x9351f0(0x67a)],this['scale']['y']=this[_0x9351f0(0x2c3)][_0x9351f0(0x4fb)],this['opacity']=this['_coreEasing'][_0x9351f0(0x7c6)],this[_0x9351f0(0x24d)]=this[_0x9351f0(0x2c3)][_0x9351f0(0x295)],this[_0x9351f0(0x741)]=this[_0x9351f0(0x2c3)][_0x9351f0(0x459)],this[_0x9351f0(0x9d0)](_0x499e56,_0x20dec9,this['x'],this['y'],this[_0x9351f0(0x834)]['x'],this['scale']['y'],this[_0x9351f0(0x7d1)],this[_0x9351f0(0x24d)],this[_0x9351f0(0x741)]);},Window_Base[_0x38072d(0x182)][_0x38072d(0x9d0)]=function(_0x9c77fe,_0x5e97cf,_0x82c4e1,_0x4a102d,_0x1114be,_0xa58471,_0x35c45e,_0x11d27f,_0x3e6a2e){const _0x2e8840=_0x38072d;this[_0x2e8840(0x2c3)]={'duration':_0x9c77fe,'wholeDuration':_0x9c77fe,'type':_0x5e97cf,'targetX':_0x82c4e1,'targetY':_0x4a102d,'targetScaleX':_0x1114be,'targetScaleY':_0xa58471,'targetOpacity':_0x35c45e,'targetBackOpacity':_0x11d27f,'targetContentsOpacity':_0x3e6a2e};},Window_Base[_0x38072d(0x182)][_0x38072d(0x10b)]=function(_0x798689,_0x1c2592,_0x50e83d,_0x49d423,_0x58b6cd){const _0x5d6299=_0x38072d;this['resetFontSettings'](),this[_0x5d6299(0x6e1)][_0x5d6299(0x70e)]=VisuMZ[_0x5d6299(0x45d)][_0x5d6299(0x75d)][_0x5d6299(0x373)][_0x5d6299(0x631)];const _0xdc1f3b=VisuMZ['CoreEngine'][_0x5d6299(0x75d)]['Gold']['GoldIcon'];if(_0xdc1f3b>0x0&&_0x1c2592===TextManager[_0x5d6299(0x275)]){const _0x4bffa9=_0x49d423+(this[_0x5d6299(0x2ef)]()-ImageManager[_0x5d6299(0x593)])/0x2;this[_0x5d6299(0x179)](_0xdc1f3b,_0x50e83d+(_0x58b6cd-ImageManager[_0x5d6299(0x202)]),_0x4bffa9),_0x58b6cd-=ImageManager[_0x5d6299(0x202)]+0x4;}else this[_0x5d6299(0x3e2)](ColorManager['systemColor']()),this[_0x5d6299(0x6a0)](_0x1c2592,_0x50e83d,_0x49d423,_0x58b6cd,'right'),_0x58b6cd-=this[_0x5d6299(0x5d6)](_0x1c2592)+0x6;this['resetTextColor']();const _0x1b8df0=this[_0x5d6299(0x5d6)](this[_0x5d6299(0x74b)]?VisuMZ[_0x5d6299(0x9ae)](_0x798689):_0x798689);if(_0x1b8df0>_0x58b6cd)this['drawText'](VisuMZ[_0x5d6299(0x45d)][_0x5d6299(0x75d)][_0x5d6299(0x373)]['GoldOverlap'],_0x50e83d,_0x49d423,_0x58b6cd,_0x5d6299(0x16d));else{if(_0x5d6299(0x1f6)!==_0x5d6299(0x27a))this[_0x5d6299(0x6a0)](_0x798689,_0x50e83d,_0x49d423,_0x58b6cd,'right');else return _0x5d6299(0x27d);}this[_0x5d6299(0x9a7)]();},Window_Base[_0x38072d(0x182)][_0x38072d(0x104)]=function(_0x3d714a,_0x30ce8b,_0x252063,_0x265129,_0x1f0061){const _0x3cc23c=_0x38072d,_0x3b9c43=ImageManager[_0x3cc23c(0x7f9)](_0x3cc23c(0x85f)),_0x277f2d=ImageManager[_0x3cc23c(0x202)],_0x133671=ImageManager[_0x3cc23c(0x593)],_0x1ecb54=_0x3d714a%0x10*_0x277f2d,_0xa16bcb=Math['floor'](_0x3d714a/0x10)*_0x133671,_0x2dac31=_0x265129,_0x4de3c5=_0x265129;this[_0x3cc23c(0x6e1)]['_context'][_0x3cc23c(0x5aa)]=_0x1f0061,this[_0x3cc23c(0x6e1)][_0x3cc23c(0x21a)](_0x3b9c43,_0x1ecb54,_0xa16bcb,_0x277f2d,_0x133671,_0x30ce8b,_0x252063,_0x2dac31,_0x4de3c5),this[_0x3cc23c(0x6e1)][_0x3cc23c(0xf1)][_0x3cc23c(0x5aa)]=!![];},Window_Base[_0x38072d(0x182)][_0x38072d(0x7ae)]=function(_0x464c80,_0x4fcc6c,_0x590fdd,_0x5d2967,_0x3eb089,_0xa22db7){const _0xb8230e=_0x38072d,_0x1adef8=Math[_0xb8230e(0x167)]((_0x590fdd-0x2)*_0x5d2967),_0x34298f=Sprite_Gauge['prototype'][_0xb8230e(0x150)][_0xb8230e(0x967)](this),_0x45a017=_0x4fcc6c+this[_0xb8230e(0x2ef)]()-_0x34298f-0x2;this[_0xb8230e(0x6e1)][_0xb8230e(0x201)](_0x464c80,_0x45a017,_0x590fdd,_0x34298f,ColorManager[_0xb8230e(0xf0)]()),this[_0xb8230e(0x6e1)][_0xb8230e(0x37a)](_0x464c80+0x1,_0x45a017+0x1,_0x1adef8,_0x34298f-0x2,_0x3eb089,_0xa22db7);},Window_Scrollable[_0x38072d(0x5c6)]={'enabled':VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x4f0)][_0x38072d(0x628)]??!![],'thickness':VisuMZ[_0x38072d(0x45d)]['Settings']['Window'][_0x38072d(0x49b)]??0x2,'offset':VisuMZ['CoreEngine'][_0x38072d(0x75d)][_0x38072d(0x4f0)][_0x38072d(0x193)]??0x2,'bodyColor':VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x4f0)][_0x38072d(0x702)]??0x0,'offColor':VisuMZ['CoreEngine']['Settings']['Window']['OffBarColor']??0x7,'offOpacity':VisuMZ[_0x38072d(0x45d)]['Settings'][_0x38072d(0x4f0)][_0x38072d(0x39f)]??0x80},Window_Base[_0x38072d(0x182)]['isScrollBarVisible']=function(){const _0x2baa0d=_0x38072d;return Window_Scrollable[_0x2baa0d(0x5c6)][_0x2baa0d(0x25d)]&&Window_Scrollable['SCROLLBAR'][_0x2baa0d(0x93c)]>0x0;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x2dd)]=Window_Base[_0x38072d(0x182)][_0x38072d(0x6aa)],Window_Base[_0x38072d(0x182)][_0x38072d(0x6aa)]=function(){const _0x270e96=_0x38072d;VisuMZ['CoreEngine'][_0x270e96(0x2dd)][_0x270e96(0x967)](this),this[_0x270e96(0x35a)](),this[_0x270e96(0x8a5)](!![]),this[_0x270e96(0x8a5)](![]);},Window_Base[_0x38072d(0x182)][_0x38072d(0x35a)]=function(){const _0x35cefb=_0x38072d;if(!this['isScrollBarVisible']())return;if(this['_scrollBarHorz']||this[_0x35cefb(0x2c1)])return;this[_0x35cefb(0x338)]={'horz':null,'vert':null,'maxHorz':null,'maxVert':null},this[_0x35cefb(0x57b)]=new Sprite(),this['_scrollBarVert']=new Sprite(),this[_0x35cefb(0x343)](this[_0x35cefb(0x57b)]),this[_0x35cefb(0x343)](this[_0x35cefb(0x2c1)]);},Window_Base['prototype']['setupScrollBarBitmap']=function(_0x22b5bd){const _0x481f39=_0x38072d,_0x4a1899=_0x22b5bd?this[_0x481f39(0x57b)]:this[_0x481f39(0x2c1)];if(!_0x4a1899)return;const _0x1010c6=Window_Scrollable[_0x481f39(0x5c6)],_0x2fc7a8=_0x1010c6[_0x481f39(0x93c)],_0x48e2da=_0x22b5bd?this[_0x481f39(0x658)]-_0x2fc7a8*0x2:_0x2fc7a8,_0x3d9c09=_0x22b5bd?_0x2fc7a8:this[_0x481f39(0x448)]-_0x2fc7a8*0x2;_0x4a1899['bitmap']=new Bitmap(_0x48e2da,_0x3d9c09),_0x4a1899[_0x481f39(0x4f7)](0x0,0x0,_0x48e2da,_0x3d9c09),this[_0x481f39(0x92c)](_0x22b5bd);},VisuMZ[_0x38072d(0x45d)]['Window_Base_destroyContents']=Window_Base[_0x38072d(0x182)]['destroyContents'],Window_Base[_0x38072d(0x182)]['destroyContents']=function(){const _0x7f5f=_0x38072d;VisuMZ[_0x7f5f(0x45d)][_0x7f5f(0x3a4)][_0x7f5f(0x967)](this),this[_0x7f5f(0x319)]();},Window_Base[_0x38072d(0x182)][_0x38072d(0x319)]=function(){const _0x56176f=_0x38072d,_0x4f740b=[this[_0x56176f(0x57b)],this[_0x56176f(0x2c1)]];for(const _0x24f810 of _0x4f740b){if(_0x56176f(0x28e)===_0x56176f(0x28e)){if(_0x24f810&&_0x24f810[_0x56176f(0x208)])_0x24f810[_0x56176f(0x208)][_0x56176f(0x420)]();}else return _0x56176f(0x718);}},VisuMZ['CoreEngine'][_0x38072d(0x6c4)]=Window_Scrollable['prototype']['update'],Window_Scrollable['prototype'][_0x38072d(0x444)]=function(){const _0x56f918=_0x38072d;VisuMZ[_0x56f918(0x45d)][_0x56f918(0x6c4)][_0x56f918(0x967)](this),this[_0x56f918(0x15f)]();},Window_Scrollable[_0x38072d(0x182)][_0x38072d(0x15f)]=function(){const _0x524494=_0x38072d;this['updateScrollBarVisibility'](),this[_0x524494(0x245)](!![]),this[_0x524494(0x245)](![]),this[_0x524494(0x92c)](!![]),this['updateScrollBarPosition'](![]);},Window_Scrollable[_0x38072d(0x182)][_0x38072d(0x50c)]=function(){const _0x169bf4=_0x38072d,_0x571440=[this[_0x169bf4(0x57b)],this[_0x169bf4(0x2c1)]];for(const _0x3ce18b of _0x571440){_0x3ce18b&&(_0x3ce18b[_0x169bf4(0x5de)]=this[_0x169bf4(0x654)]()&&this[_0x169bf4(0x921)]());}},Window_Scrollable[_0x38072d(0x182)][_0x38072d(0x245)]=function(_0xb8a285){const _0x150c1a=_0x38072d;if(!this['_lastScrollBarValues'])return;const _0x598050=this[_0x150c1a(0x873)](_0xb8a285),_0x522509=this[_0x150c1a(0x23a)](_0xb8a285),_0x3381d6=_0xb8a285?_0x150c1a(0x394):'vert',_0x1ada69=_0xb8a285?_0x150c1a(0x153):_0x150c1a(0x8e9);(this[_0x150c1a(0x338)][_0x3381d6]!==_0x598050||this[_0x150c1a(0x338)][_0x1ada69]!==_0x522509)&&(this[_0x150c1a(0x338)][_0x3381d6]=_0x598050,this['_lastScrollBarValues'][_0x1ada69]=_0x522509,this['refreshScrollBarBitmap'](_0xb8a285,_0x598050,_0x522509));},Window_Scrollable[_0x38072d(0x182)]['scrollbar']=function(_0x59c7e0){const _0x2ed540=_0x38072d;if(this[_0x2ed540(0x8d1)]!==undefined)return _0x59c7e0?this[_0x2ed540(0x4de)]():this[_0x2ed540(0x62c)]['y'];return _0x59c7e0?this[_0x2ed540(0x4de)]():this[_0x2ed540(0x7d9)]();},Window_Scrollable[_0x38072d(0x182)][_0x38072d(0x23a)]=function(_0xe4bfe2){const _0x5d73f7=_0x38072d;if(this['_allTextHeight']!==undefined)return _0xe4bfe2?this['maxScrollX']():Math['max'](0x0,this[_0x5d73f7(0x8d1)]-this['innerHeight']);return _0xe4bfe2?this[_0x5d73f7(0x8cc)]():this[_0x5d73f7(0x493)]();},Window_Scrollable[_0x38072d(0x182)][_0x38072d(0x655)]=function(){const _0x162f87=_0x38072d;if(this[_0x162f87(0x8d1)]!==undefined)return Math[_0x162f87(0x285)](0x0,this[_0x162f87(0x8d1)]);return this[_0x162f87(0x124)]();},Window_Scrollable['prototype'][_0x38072d(0x975)]=function(_0x44a0e0,_0x4cdf72,_0x47c9f7){const _0x23471f=_0x38072d,_0x2c5896=_0x44a0e0?this[_0x23471f(0x57b)]:this[_0x23471f(0x2c1)];if(!_0x2c5896)return;if(!_0x2c5896[_0x23471f(0x208)])return;const _0x4b0fda=_0x2c5896[_0x23471f(0x208)];_0x4b0fda[_0x23471f(0x8bd)]();if(_0x47c9f7<=0x0)return;const _0x8ed921=_0x44a0e0?this[_0x23471f(0x658)]/this[_0x23471f(0x5f5)]():this[_0x23471f(0x448)]/this['scrollbarHeight'](),_0x4cc4b1=_0x44a0e0?Math['round'](_0x4cdf72*_0x8ed921):0x0,_0x50d926=_0x44a0e0?0x0:Math['round'](_0x4cdf72*_0x8ed921),_0x4ce430=_0x44a0e0?Math['round'](_0x4b0fda[_0x23471f(0x729)]*_0x8ed921):_0x4b0fda[_0x23471f(0x729)],_0x360814=_0x44a0e0?_0x4b0fda[_0x23471f(0x486)]:Math[_0x23471f(0x337)](_0x4b0fda[_0x23471f(0x486)]*_0x8ed921),_0x270237=Window_Scrollable['SCROLLBAR'],_0x43dedd=ColorManager['getColor'](_0x270237['offColor']),_0x3f3f86=ColorManager['getColor'](_0x270237[_0x23471f(0x9b1)]),_0x55d137=_0x270237[_0x23471f(0x41a)];_0x4b0fda['paintOpacity']=_0x55d137,_0x4b0fda[_0x23471f(0x196)](_0x43dedd),_0x4b0fda[_0x23471f(0x399)]=0xff,_0x4b0fda['fillRect'](_0x4cc4b1,_0x50d926,_0x4ce430,_0x360814,_0x3f3f86);},Window_Base[_0x38072d(0x182)][_0x38072d(0x92c)]=function(_0x21f41a){const _0x1bcbd2=_0x38072d,_0x1054ad=_0x21f41a?this[_0x1bcbd2(0x57b)]:this[_0x1bcbd2(0x2c1)];if(!_0x1054ad)return;const _0x2e7544=Window_Scrollable[_0x1bcbd2(0x5c6)],_0x1d0268=_0x2e7544[_0x1bcbd2(0x93c)],_0x5ce731=_0x2e7544[_0x1bcbd2(0x369)];if(!_0x1054ad['transform'])return;_0x1054ad['x']=this['padding']+(_0x21f41a?_0x1d0268:this['innerWidth']+_0x5ce731),_0x1054ad['y']=this[_0x1bcbd2(0x2dc)]+(_0x21f41a?this[_0x1bcbd2(0x448)]+_0x5ce731:_0x1d0268);},Window_Selectable[_0x38072d(0x182)]['cursorDown']=function(_0x3fab95){const _0xf59e71=_0x38072d;let _0x226fd3=this[_0xf59e71(0x416)]();const _0x4ae6de=this[_0xf59e71(0x4ed)](),_0x3d4682=this[_0xf59e71(0x638)]();if(this['isUseModernControls']()&&(_0x226fd3<_0x4ae6de||_0x3fab95&&_0x3d4682===0x1)){if(_0xf59e71(0x1ca)!==_0xf59e71(0x1ca))_0x28e484[_0xf59e71(0x45d)]['Scene_MenuBase_createCancelButton']['call'](this),_0x4fe47f['isSideButtonLayout']()&&this[_0xf59e71(0x146)]();else{_0x226fd3+=_0x3d4682;if(_0x226fd3>=_0x4ae6de)_0x226fd3=_0x4ae6de-0x1;this['smoothSelect'](_0x226fd3);}}else!this[_0xf59e71(0x1bb)]()&&((_0x226fd3<_0x4ae6de-_0x3d4682||_0x3fab95&&_0x3d4682===0x1)&&this[_0xf59e71(0x9ca)]((_0x226fd3+_0x3d4682)%_0x4ae6de));},VisuMZ['CoreEngine'][_0x38072d(0x62b)]=Window_Selectable['prototype'][_0x38072d(0x930)],Window_Selectable[_0x38072d(0x182)][_0x38072d(0x930)]=function(_0x3bf812){const _0xaf7bf8=_0x38072d;if(this[_0xaf7bf8(0x1bb)]()&&_0x3bf812&&this['maxCols']()===0x1&&this[_0xaf7bf8(0x416)]()===this[_0xaf7bf8(0x4ed)]()-0x1)_0xaf7bf8(0x115)===_0xaf7bf8(0x96f)?(this[_0xaf7bf8(0x341)]=this['_onceParallelInterpreters']||[],this['_onceParallelInterpreters']['push'](_0x138402)):this[_0xaf7bf8(0x9ca)](0x0);else{if(_0xaf7bf8(0x22f)===_0xaf7bf8(0x24f)){const _0x434cc0=_0x2a72b6['GetParamIcon'](_0x55aea5);_0x2343e3?(this[_0xaf7bf8(0x104)](_0x434cc0,_0x506269,_0x42fc57,this[_0xaf7bf8(0x4be)]()),_0x26feaa-=this[_0xaf7bf8(0x4be)]()+0x2,_0x8cd98b+=this['gaugeLineHeight']()+0x2):(this[_0xaf7bf8(0x179)](_0x434cc0,_0x26df7b+0x2,_0x3e1c47+0x2),_0x37a267-=_0x389400[_0xaf7bf8(0x202)]+0x4,_0x349b58+=_0x316501['iconWidth']+0x4);}else VisuMZ[_0xaf7bf8(0x45d)][_0xaf7bf8(0x62b)][_0xaf7bf8(0x967)](this,_0x3bf812);}},Window_Selectable[_0x38072d(0x182)][_0x38072d(0x36a)]=function(_0x40e5eb){const _0x38b9bf=_0x38072d;let _0x1a2f65=Math[_0x38b9bf(0x285)](0x0,this['index']());const _0x22d499=this[_0x38b9bf(0x4ed)](),_0x18a973=this['maxCols']();if(this[_0x38b9bf(0x1bb)]()&&_0x1a2f65>0x0||_0x40e5eb&&_0x18a973===0x1){_0x1a2f65-=_0x18a973;if(_0x1a2f65<=0x0)_0x1a2f65=0x0;this['smoothSelect'](_0x1a2f65);}else{if(!this[_0x38b9bf(0x1bb)]()){if(_0x1a2f65>=_0x18a973||_0x40e5eb&&_0x18a973===0x1){if('BlAty'===_0x38b9bf(0x223))this[_0x38b9bf(0x9ca)]((_0x1a2f65-_0x18a973+_0x22d499)%_0x22d499);else return _0x46ab4b[_0x38b9bf(0x45d)][_0x38b9bf(0x75d)][_0x38b9bf(0x4f0)][_0x38b9bf(0x70d)];}}}},VisuMZ['CoreEngine'][_0x38072d(0x69f)]=Window_Selectable[_0x38072d(0x182)]['cursorUp'],Window_Selectable[_0x38072d(0x182)][_0x38072d(0x36a)]=function(_0xe8d715){const _0x5220fc=_0x38072d;if(this[_0x5220fc(0x1bb)]()&&_0xe8d715&&this[_0x5220fc(0x638)]()===0x1&&this['index']()===0x0)this[_0x5220fc(0x9ca)](this[_0x5220fc(0x4ed)]()-0x1);else{if('iUECB'===_0x5220fc(0x590))VisuMZ[_0x5220fc(0x45d)][_0x5220fc(0x69f)][_0x5220fc(0x967)](this,_0xe8d715);else return this['yScrollLinkedOffset']();}},Window_Selectable[_0x38072d(0x182)][_0x38072d(0x1bb)]=function(){const _0x3e0618=_0x38072d;return VisuMZ[_0x3e0618(0x45d)]['Settings'][_0x3e0618(0x6a9)]['ModernControls'];},VisuMZ['CoreEngine'][_0x38072d(0x48f)]=Window_Selectable['prototype']['processCursorMove'],Window_Selectable[_0x38072d(0x182)][_0x38072d(0x6d3)]=function(){const _0x2c7607=_0x38072d;this[_0x2c7607(0x1bb)]()?(this[_0x2c7607(0xfd)](),this[_0x2c7607(0x619)]()):VisuMZ[_0x2c7607(0x45d)][_0x2c7607(0x48f)][_0x2c7607(0x967)](this);},Window_Selectable['prototype'][_0x38072d(0x1b4)]=function(){return!![];},Window_Selectable[_0x38072d(0x182)][_0x38072d(0xfd)]=function(){const _0x4ec28b=_0x38072d;if(this['isCursorMovable']()){const _0x1f9f35=this[_0x4ec28b(0x416)]();Input['isRepeated'](_0x4ec28b(0x407))&&('VTOqg'!==_0x4ec28b(0x9a6)?this['drawTextEx'](_0x5d239f[_0x4ec28b(0x618)](),_0x1d6a1c,_0x45e213,_0x47f79b):Input[_0x4ec28b(0x6d4)](_0x4ec28b(0x205))&&this['allowShiftScrolling']()?_0x4ec28b(0x6b9)===_0x4ec28b(0x6b9)?this['cursorPagedown']():this[_0x4ec28b(0x4d5)][_0x4ec28b(0x41b)]=this[_0x4ec28b(0x4d5)]['target']:this[_0x4ec28b(0x930)](Input[_0x4ec28b(0x3af)](_0x4ec28b(0x407)))),Input['isRepeated']('up')&&(Input[_0x4ec28b(0x6d4)](_0x4ec28b(0x205))&&this[_0x4ec28b(0x1b4)]()?this[_0x4ec28b(0x960)]():this['cursorUp'](Input[_0x4ec28b(0x3af)]('up'))),Input['isRepeated'](_0x4ec28b(0x16d))&&this[_0x4ec28b(0x929)](Input[_0x4ec28b(0x3af)](_0x4ec28b(0x16d))),Input[_0x4ec28b(0x610)](_0x4ec28b(0x105))&&(_0x4ec28b(0x9e6)===_0x4ec28b(0x2a9)?(_0x521cf6[_0x4ec28b(0x68a)]=!![],_0x44a639[_0x4ec28b(0x45d)][_0x4ec28b(0x131)][_0x4ec28b(0x967)](this,_0x4916c6,_0x246c7a),_0x731f9b[_0x4ec28b(0x68a)]=_0x5d76e8):this['cursorLeft'](Input[_0x4ec28b(0x3af)](_0x4ec28b(0x105)))),!this[_0x4ec28b(0x739)](_0x4ec28b(0x707))&&Input['isRepeated'](_0x4ec28b(0x707))&&this['cursorPagedown'](),!this[_0x4ec28b(0x739)]('pageup')&&Input[_0x4ec28b(0x610)](_0x4ec28b(0x88a))&&this[_0x4ec28b(0x960)](),this[_0x4ec28b(0x416)]()!==_0x1f9f35&&this['playCursorSound']();}},Window_Selectable[_0x38072d(0x182)][_0x38072d(0x619)]=function(){const _0x3cef1c=_0x38072d;if(this[_0x3cef1c(0x5e8)]()){const _0x193bf4=this[_0x3cef1c(0x416)]();Input['isTriggered'](_0x3cef1c(0x97f))&&('WLuJp'!==_0x3cef1c(0x733)?this[_0x3cef1c(0x9ca)](Math[_0x3cef1c(0x864)](this['index'](),0x0)):_0x5d1909[_0x3cef1c(0x267)]()&&_0x2771b9['CoreEngine'][_0x3cef1c(0x75d)][_0x3cef1c(0x6a9)][_0x3cef1c(0x574)]&&(_0x31a603['_playTestFastMode']=!_0x3095a6['_playTestFastMode']));Input[_0x3cef1c(0x3af)](_0x3cef1c(0x4bc))&&('EYqkV'!==_0x3cef1c(0x947)?this[_0x3cef1c(0x9ca)](Math[_0x3cef1c(0x285)](this[_0x3cef1c(0x416)](),this['maxItems']()-0x1)):(this[_0x3cef1c(0x197)]={},_0x5d4b6f[_0x3cef1c(0x182)][_0x3cef1c(0x770)][_0x3cef1c(0x967)](this,_0x6d081),this[_0x3cef1c(0x6ad)](_0x1338c4[_0x3cef1c(0x45d)]['Settings'][_0x3cef1c(0x6b6)]['BgType']||0x0),this[_0x3cef1c(0x7c3)]()));if(this[_0x3cef1c(0x416)]()!==_0x193bf4){if(_0x3cef1c(0x5e2)===_0x3cef1c(0x5e2))this[_0x3cef1c(0x559)]();else{if(_0x160005['_pictureCoordinatesMode']!==_0x24cbbf)return _0x1baf46[_0x3cef1c(0x45d)][_0x3cef1c(0x76f)]();return _0x5b07eb[_0x3cef1c(0x45d)][_0x3cef1c(0x42c)][_0x3cef1c(0x967)](this);}}}},VisuMZ['CoreEngine'][_0x38072d(0x8b7)]=Window_Selectable[_0x38072d(0x182)][_0x38072d(0x9eb)],Window_Selectable[_0x38072d(0x182)][_0x38072d(0x9eb)]=function(){const _0x5aec83=_0x38072d;if(this[_0x5aec83(0x1bb)]()){if(_0x5aec83(0x450)===_0x5aec83(0x450))this[_0x5aec83(0x553)]();else{const _0x2b0f35=_0x104baf[_0x5aec83(0x2d7)]||0x0;(_0x2b0f35<0x0||_0x2b0f35>0x64||_0x2fb45a[_0x5aec83(0x259)]()||_0x28e2cc[_0x5aec83(0x3af)](_0x5aec83(0x15e)))&&(_0x4af102[_0x5aec83(0x2d7)]=_0x35bf96,_0x538c5b[_0x5aec83(0x8bd)](),_0x4e6e23['clear']());const _0xefc01=_0x5a4ad1[_0x5aec83(0x8f0)](_0x2b0f35);return _0xefc01&&(_0xefc01['_x']=_0x5ba93d['_x'],_0xefc01['_y']=_0x15abf5['_y']),_0x135e9b[_0x5aec83(0x45d)][_0x5aec83(0x21d)](),_0x520748['_pictureCoordinatesMode']!==_0x315176;}}else VisuMZ[_0x5aec83(0x45d)][_0x5aec83(0x8b7)][_0x5aec83(0x967)](this);},Window_Selectable[_0x38072d(0x182)][_0x38072d(0x553)]=function(){const _0x14c66e=_0x38072d;VisuMZ[_0x14c66e(0x45d)][_0x14c66e(0x8b7)][_0x14c66e(0x967)](this);},Window_Selectable[_0x38072d(0x182)][_0x38072d(0x635)]=function(){const _0x127966=_0x38072d;return VisuMZ[_0x127966(0x45d)][_0x127966(0x75d)][_0x127966(0x4f0)]['ColSpacing'];},Window_Selectable[_0x38072d(0x182)]['rowSpacing']=function(){const _0x462219=_0x38072d;return VisuMZ['CoreEngine'][_0x462219(0x75d)][_0x462219(0x4f0)][_0x462219(0x70d)];},Window_Selectable['prototype']['itemHeight']=function(){const _0x1792ed=_0x38072d;return Window_Scrollable[_0x1792ed(0x182)][_0x1792ed(0x825)][_0x1792ed(0x967)](this)+VisuMZ['CoreEngine'][_0x1792ed(0x75d)][_0x1792ed(0x4f0)][_0x1792ed(0x5ca)];;},VisuMZ[_0x38072d(0x45d)]['Window_Selectable_drawBackgroundRect']=Window_Selectable[_0x38072d(0x182)][_0x38072d(0x660)],Window_Selectable['prototype'][_0x38072d(0x660)]=function(_0x3f92ac){const _0x27cf72=_0x38072d,_0x5e5ae9=VisuMZ[_0x27cf72(0x45d)]['Settings'][_0x27cf72(0x4f0)];if(_0x5e5ae9['ShowItemBackground']===![])return;_0x5e5ae9[_0x27cf72(0x3bf)]?_0x27cf72(0x242)!=='qkdgJ'?(_0x7a0bb4[_0x27cf72(0x45d)][_0x27cf72(0x395)][_0x27cf72(0x967)](this,_0x53a4a9,_0x1aff9d),this[_0x27cf72(0x1e6)]()):_0x5e5ae9[_0x27cf72(0x3bf)]['call'](this,_0x3f92ac):VisuMZ[_0x27cf72(0x45d)][_0x27cf72(0x584)][_0x27cf72(0x967)](this,_0x3f92ac);},VisuMZ[_0x38072d(0x45d)]['Window_Gold_refresh']=Window_Gold['prototype'][_0x38072d(0x7c3)],Window_Gold['prototype'][_0x38072d(0x7c3)]=function(){const _0x327788=_0x38072d;if(this[_0x327788(0x2fa)]()){if(_0x327788(0x55a)!==_0x327788(0x238))this[_0x327788(0x36c)]();else{const _0x4597cb=_0x3af4e5[_0x327788(0x3eb)](_0x490138);_0x524e4f[_0x327788(0x7cf)](_0x142cde,!_0x4597cb);}}else VisuMZ[_0x327788(0x45d)][_0x327788(0x46c)][_0x327788(0x967)](this);},Window_Gold[_0x38072d(0x182)][_0x38072d(0x2fa)]=function(){const _0x3ef43b=_0x38072d;if(TextManager[_0x3ef43b(0x275)]!==this['currencyUnit']())return![];return VisuMZ[_0x3ef43b(0x45d)][_0x3ef43b(0x75d)][_0x3ef43b(0x373)][_0x3ef43b(0x13d)];},Window_Gold[_0x38072d(0x182)][_0x38072d(0x36c)]=function(){const _0x4bc5c4=_0x38072d;this[_0x4bc5c4(0x9a7)](),this[_0x4bc5c4(0x6e1)]['clear'](),this[_0x4bc5c4(0x6e1)][_0x4bc5c4(0x70e)]=VisuMZ[_0x4bc5c4(0x45d)]['Settings'][_0x4bc5c4(0x373)][_0x4bc5c4(0x631)];const _0x276186=VisuMZ[_0x4bc5c4(0x45d)][_0x4bc5c4(0x75d)]['Gold'][_0x4bc5c4(0x88d)],_0x5dfe76=this[_0x4bc5c4(0x4b1)](0x0);if(_0x276186>0x0){const _0x45af2e=_0x5dfe76['y']+(this[_0x4bc5c4(0x2ef)]()-ImageManager[_0x4bc5c4(0x593)])/0x2;this[_0x4bc5c4(0x179)](_0x276186,_0x5dfe76['x'],_0x45af2e);const _0x25fb2c=ImageManager['iconWidth']+0x4;_0x5dfe76['x']+=_0x25fb2c,_0x5dfe76[_0x4bc5c4(0x729)]-=_0x25fb2c;}this[_0x4bc5c4(0x3e2)](ColorManager[_0x4bc5c4(0x668)]()),this['drawText'](this[_0x4bc5c4(0x275)](),_0x5dfe76['x'],_0x5dfe76['y'],_0x5dfe76['width'],_0x4bc5c4(0x105));const _0x44609d=this['textWidth'](this['currencyUnit']())+0x6;;_0x5dfe76['x']+=_0x44609d,_0x5dfe76[_0x4bc5c4(0x729)]-=_0x44609d,this[_0x4bc5c4(0x9b2)]();const _0x57f61f=this['value'](),_0x26f442=this[_0x4bc5c4(0x5d6)](this[_0x4bc5c4(0x74b)]?VisuMZ[_0x4bc5c4(0x9ae)](this[_0x4bc5c4(0x3eb)]()):this[_0x4bc5c4(0x3eb)]());_0x26f442>_0x5dfe76['width']?this[_0x4bc5c4(0x6a0)](VisuMZ[_0x4bc5c4(0x45d)][_0x4bc5c4(0x75d)][_0x4bc5c4(0x373)][_0x4bc5c4(0x1b2)],_0x5dfe76['x'],_0x5dfe76['y'],_0x5dfe76[_0x4bc5c4(0x729)],_0x4bc5c4(0x16d)):this[_0x4bc5c4(0x6a0)](this[_0x4bc5c4(0x3eb)](),_0x5dfe76['x'],_0x5dfe76['y'],_0x5dfe76[_0x4bc5c4(0x729)],'right'),this[_0x4bc5c4(0x9a7)]();},Window_StatusBase['prototype'][_0x38072d(0x1e1)]=function(_0xe3b7aa,_0x54fdb8,_0x2cfbaf,_0x1cbc5f,_0x417acc){const _0x4629d8=_0x38072d;_0x1cbc5f=String(_0x1cbc5f||'')['toUpperCase']();if(VisuMZ[_0x4629d8(0x45d)][_0x4629d8(0x75d)][_0x4629d8(0x651)][_0x4629d8(0x946)]){if(_0x4629d8(0x62f)!==_0x4629d8(0x62f)){const _0xca3612=_0x4caa76[_0x4629d8(0x45d)][_0x4629d8(0x75d)][_0x4629d8(0x363)];if(_0xca3612&&_0xca3612[_0x4629d8(0x356)])return _0xca3612[_0x4629d8(0x356)]['call'](this);const _0x162189=_0x2f552a[_0x4629d8(0x117)]*0.75,_0x59ffca=_0x3e47a2[_0x4629d8(0x691)]*0.6,_0x3aa8bc=_0x593af1[_0x4629d8(0x8c3)];this['x']+=_0x539db4['round'](_0x381aea[_0x4629d8(0x4d6)](_0x162189)-_0x2704bd[_0x4629d8(0x4d6)](_0x59ffca))*(_0x4706d8[_0x4629d8(0x864)](_0x3aa8bc,0x1e)*0.5),this['y']+=_0x46cb90[_0x4629d8(0x337)](_0x5d8af4[_0x4629d8(0x4d6)](_0x162189)-_0x373c9c[_0x4629d8(0x4d6)](_0x59ffca))*(_0x32ecd6['min'](_0x3aa8bc,0x1e)*0.5);}else{const _0x2d8adb=VisuMZ[_0x4629d8(0x7f3)](_0x1cbc5f);_0x417acc?(this[_0x4629d8(0x104)](_0x2d8adb,_0xe3b7aa,_0x54fdb8,this[_0x4629d8(0x4be)]()),_0x2cfbaf-=this['gaugeLineHeight']()+0x2,_0xe3b7aa+=this[_0x4629d8(0x4be)]()+0x2):(this[_0x4629d8(0x179)](_0x2d8adb,_0xe3b7aa+0x2,_0x54fdb8+0x2),_0x2cfbaf-=ImageManager[_0x4629d8(0x202)]+0x4,_0xe3b7aa+=ImageManager['iconWidth']+0x4);}}const _0x3d0fe7=TextManager[_0x4629d8(0x73a)](_0x1cbc5f);this[_0x4629d8(0x9a7)](),this[_0x4629d8(0x3e2)](ColorManager['systemColor']());if(_0x417acc){if(_0x4629d8(0x8c6)!==_0x4629d8(0x72e))this[_0x4629d8(0x6e1)]['fontSize']=this[_0x4629d8(0x87c)](),this[_0x4629d8(0x6e1)][_0x4629d8(0x6a0)](_0x3d0fe7,_0xe3b7aa,_0x54fdb8,_0x2cfbaf,this[_0x4629d8(0x4be)](),_0x4629d8(0x105));else return _0x42237b&&_0x1235e3[_0x4629d8(0x576)]?_0xf0c5f4[_0x4629d8(0x576)]['isWindowMaskingEnabled']():!![];}else this[_0x4629d8(0x6a0)](_0x3d0fe7,_0xe3b7aa,_0x54fdb8,_0x2cfbaf);this['resetFontSettings']();},Window_StatusBase[_0x38072d(0x182)][_0x38072d(0x87c)]=function(){const _0x5046e7=_0x38072d;return $gameSystem[_0x5046e7(0x510)]()-0x8;},Window_StatusBase['prototype']['drawActorClass']=function(_0x3c4479,_0x122893,_0x132810,_0xec642d){const _0x4b50b4=_0x38072d;_0xec642d=_0xec642d||0xa8,this[_0x4b50b4(0x9b2)]();if(VisuMZ[_0x4b50b4(0x45d)]['Settings']['UI'][_0x4b50b4(0x5c4)])this['drawTextEx'](_0x3c4479['currentClass']()[_0x4b50b4(0x25e)],_0x122893,_0x132810,_0xec642d);else{const _0x4d45bb=_0x3c4479['currentClass']()[_0x4b50b4(0x25e)][_0x4b50b4(0x152)](/\\I\[(\d+)\]/gi,'');this[_0x4b50b4(0x6a0)](_0x4d45bb,_0x122893,_0x132810,_0xec642d);}},Window_StatusBase[_0x38072d(0x182)]['drawActorNickname']=function(_0x4e8747,_0x2f8c42,_0x9ce59b,_0x1735fe){const _0x9ce733=_0x38072d;_0x1735fe=_0x1735fe||0x10e,this[_0x9ce733(0x9b2)]();if(VisuMZ[_0x9ce733(0x45d)][_0x9ce733(0x75d)]['UI'][_0x9ce733(0x43a)])this[_0x9ce733(0x449)](_0x4e8747[_0x9ce733(0x618)](),_0x2f8c42,_0x9ce59b,_0x1735fe);else{if(_0x9ce733(0x87e)!==_0x9ce733(0x6dc)){const _0x2eb175=_0x4e8747[_0x9ce733(0x618)]()[_0x9ce733(0x152)](/\\I\[(\d+)\]/gi,'');this[_0x9ce733(0x6a0)](_0x4e8747['nickname'](),_0x2f8c42,_0x9ce59b,_0x1735fe);}else return _0x547f50['layoutSettings'][_0x9ce733(0x2f1)][_0x9ce733(0x967)](this);}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x7d2)]=Window_StatusBase[_0x38072d(0x182)][_0x38072d(0x8bc)],Window_StatusBase[_0x38072d(0x182)][_0x38072d(0x8bc)]=function(_0x2bdccd,_0x3fdeb0,_0x4e63e3){const _0x5de034=_0x38072d;if(VisuMZ[_0x5de034(0x45d)][_0x5de034(0x75d)][_0x5de034(0x651)][_0x5de034(0x997)]===![])return;if(this[_0x5de034(0x5b4)]())this[_0x5de034(0x7b0)](_0x2bdccd,_0x3fdeb0,_0x4e63e3);VisuMZ[_0x5de034(0x45d)]['Window_StatusBase_drawActorLevel'][_0x5de034(0x967)](this,_0x2bdccd,_0x3fdeb0,_0x4e63e3);},Window_StatusBase['prototype'][_0x38072d(0x5b4)]=function(){const _0x218f4e=_0x38072d;return VisuMZ['CoreEngine'][_0x218f4e(0x75d)]['UI'][_0x218f4e(0x145)];},Window_StatusBase[_0x38072d(0x182)][_0x38072d(0x7b0)]=function(_0x1c32b7,_0x47a905,_0x4a428b){const _0x241789=_0x38072d;if(!_0x1c32b7)return;if(!_0x1c32b7[_0x241789(0x89b)]())return;const _0x24a0e6=0x80,_0x14f8f6=_0x1c32b7[_0x241789(0x239)]();let _0x1252b7=ColorManager[_0x241789(0x6cc)](),_0x9e23c3=ColorManager[_0x241789(0x45a)]();if(_0x14f8f6>=0x1){if(_0x241789(0x8c1)==='ImiJw')_0x1252b7=ColorManager['maxLvGaugeColor1'](),_0x9e23c3=ColorManager[_0x241789(0x880)]();else{const _0x1afa7c=_0x1ea7cf[_0x241789(0x45d)]['Settings'][_0x241789(0x38f)];return this[_0x241789(0x5bc)][_0x241789(0x662)]===_0x241789(0x645)?_0x1afa7c[_0x241789(0x805)]||_0x241789(0x805):_0x1afa7c['Manual']||_0x241789(0x22b);}}this[_0x241789(0x7ae)](_0x47a905,_0x4a428b,_0x24a0e6,_0x14f8f6,_0x1252b7,_0x9e23c3);},Window_EquipStatus[_0x38072d(0x182)][_0x38072d(0x95d)]=function(){const _0x26ea2f=_0x38072d;let _0x507806=0x0;for(const _0x26dfbf of VisuMZ[_0x26ea2f(0x45d)][_0x26ea2f(0x75d)][_0x26ea2f(0x651)][_0x26ea2f(0x438)]){const _0x17c687=this[_0x26ea2f(0x636)](),_0x3ec03c=this[_0x26ea2f(0x7b3)](_0x507806);this[_0x26ea2f(0x3ef)](_0x17c687,_0x3ec03c,_0x26dfbf),_0x507806++;}},Window_EquipStatus[_0x38072d(0x182)][_0x38072d(0x16b)]=function(_0x3e583e,_0x2a7265,_0x3d4d3b){const _0x414d26=_0x38072d,_0x5f0edb=this['paramX']()-this[_0x414d26(0x636)]()*0x2;this[_0x414d26(0x1e1)](_0x3e583e,_0x2a7265,_0x5f0edb,_0x3d4d3b,![]);},Window_EquipStatus[_0x38072d(0x182)]['drawCurrentParam']=function(_0x3b59ac,_0x52bdd0,_0x27f911){const _0x1631fa=_0x38072d,_0x52085e=this['paramWidth']();this['resetTextColor'](),this[_0x1631fa(0x6a0)](this[_0x1631fa(0x370)]['paramValueByName'](_0x27f911,!![]),_0x3b59ac,_0x52bdd0,_0x52085e,_0x1631fa(0x16d));},Window_EquipStatus[_0x38072d(0x182)][_0x38072d(0x971)]=function(_0x299ac1,_0x117671){const _0x5d0274=_0x38072d,_0x32a926=this[_0x5d0274(0x781)]();this[_0x5d0274(0x3e2)](ColorManager[_0x5d0274(0x668)]());const _0x4b901a=VisuMZ['CoreEngine'][_0x5d0274(0x75d)]['UI'][_0x5d0274(0x890)];this[_0x5d0274(0x6a0)](_0x4b901a,_0x299ac1,_0x117671,_0x32a926,_0x5d0274(0x544));},Window_EquipStatus[_0x38072d(0x182)][_0x38072d(0x830)]=function(_0x5bcef3,_0xb63d83,_0x488c70){const _0x483f45=_0x38072d,_0x54488c=this[_0x483f45(0x836)](),_0x17752f=this[_0x483f45(0x5b2)][_0x483f45(0x6db)](_0x488c70),_0x3281b6=_0x17752f-this[_0x483f45(0x370)][_0x483f45(0x6db)](_0x488c70);this[_0x483f45(0x3e2)](ColorManager['paramchangeTextColor'](_0x3281b6)),this['drawText'](this[_0x483f45(0x5b2)]['paramValueByName'](_0x488c70,!![]),_0x5bcef3,_0xb63d83,_0x54488c,_0x483f45(0x16d));},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x578)]=Window_EquipItem[_0x38072d(0x182)][_0x38072d(0x8ca)],Window_EquipItem['prototype']['isEnabled']=function(_0x18669a){const _0x68502=_0x38072d;return _0x18669a&&this[_0x68502(0x370)]?this[_0x68502(0x370)]['canEquip'](_0x18669a):VisuMZ[_0x68502(0x45d)][_0x68502(0x578)][_0x68502(0x967)](this,_0x18669a);},Window_StatusParams['prototype'][_0x38072d(0x4ed)]=function(){const _0x5a41fb=_0x38072d;return VisuMZ[_0x5a41fb(0x45d)][_0x5a41fb(0x75d)]['Param'][_0x5a41fb(0x438)]['length'];},Window_StatusParams[_0x38072d(0x182)][_0x38072d(0x3ef)]=function(_0x47abbe){const _0x3a4605=_0x38072d,_0x352268=this['itemLineRect'](_0x47abbe),_0x34e674=VisuMZ[_0x3a4605(0x45d)][_0x3a4605(0x75d)][_0x3a4605(0x651)][_0x3a4605(0x438)][_0x47abbe],_0xf39551=TextManager[_0x3a4605(0x73a)](_0x34e674),_0x322368=this['_actor'][_0x3a4605(0x6db)](_0x34e674,!![]);this[_0x3a4605(0x1e1)](_0x352268['x'],_0x352268['y'],0xa0,_0x34e674,![]),this[_0x3a4605(0x9b2)](),this[_0x3a4605(0x6a0)](_0x322368,_0x352268['x']+0xa0,_0x352268['y'],0x3c,_0x3a4605(0x16d));};if(VisuMZ['CoreEngine']['Settings']['KeyboardInput'][_0x38072d(0x1ec)]){VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)]['KeyboardInput'][_0x38072d(0x51f)]&&(Window_NameInput['LATIN1']=['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','\x27','`','Z','X','C','V','B','N','M',',','.','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l',':','~','z','x','c','v','b','n','m','\x22',';','1','2','3','4','5','6','7','8','9','0','!','@','#','$','%','^','&','*','(',')','<','>','[',']','-','_','/','\x20','Page','OK']);;VisuMZ['CoreEngine'][_0x38072d(0x8c9)]=Window_NameInput[_0x38072d(0x182)][_0x38072d(0x770)],Window_NameInput[_0x38072d(0x182)][_0x38072d(0x770)]=function(_0x2ce8fd){const _0x585c66=_0x38072d;this[_0x585c66(0x662)]=this['defaultInputMode'](),VisuMZ[_0x585c66(0x45d)]['Window_NameInput_initialize'][_0x585c66(0x967)](this,_0x2ce8fd);if(this['_mode']==='default'){if('RPyFW'===_0x585c66(0x9dd))this[_0x585c66(0x736)](0x0);else{const _0x1687e2=this[_0x585c66(0x229)];_0x1687e2[_0x585c66(0x308)]=this[_0x585c66(0x709)],_0x1687e2['fillText'](_0x220245,_0x1d6583+0x2,_0x431fec+0x2,_0x412d7b);}}else{if(_0x585c66(0x339)!==_0x585c66(0x339))return this[_0x585c66(0x195)]||null;else Input['clear'](),this['deselect']();}},Window_NameInput['prototype'][_0x38072d(0x1f3)]=function(){const _0x5eef14=_0x38072d;if(Input[_0x5eef14(0x46e)]())return'default';return VisuMZ[_0x5eef14(0x45d)][_0x5eef14(0x75d)]['KeyboardInput']['DefaultMode']||_0x5eef14(0x645);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x5ef)]=Window_NameInput[_0x38072d(0x182)][_0x38072d(0x7dc)],Window_NameInput[_0x38072d(0x182)][_0x38072d(0x7dc)]=function(){const _0x5330c4=_0x38072d;if(!this[_0x5330c4(0x921)]())return;if(!this[_0x5330c4(0x432)])return;if(this[_0x5330c4(0x662)]===_0x5330c4(0x645)&&Input[_0x5330c4(0x4b2)]())this['switchModes'](_0x5330c4(0x3a2));else{if(Input['isSpecialCode'](_0x5330c4(0x4c4)))Input[_0x5330c4(0x8bd)](),this['processBack']();else{if(Input['isTriggered'](_0x5330c4(0x4ac)))_0x5330c4(0x91d)!==_0x5330c4(0x91d)?(_0x3fc983(_0x195f95),_0x4c20fd[_0x5330c4(0x4a1)]()):(Input[_0x5330c4(0x8bd)](),this[_0x5330c4(0x662)]===_0x5330c4(0x645)?_0x5330c4(0x797)!==_0x5330c4(0x797)?(this['drawIcon'](_0xa949e1,_0xc09b80+0x2,_0xaf3dbb+0x2),_0x49461a-=_0x63a4d9[_0x5330c4(0x202)]+0x4,_0x225aad+=_0x5e450d[_0x5330c4(0x202)]+0x4):this['switchModes']('default'):this[_0x5330c4(0x465)](_0x5330c4(0x645)));else{if(this[_0x5330c4(0x662)]===_0x5330c4(0x645))this[_0x5330c4(0x67d)]();else Input[_0x5330c4(0x915)](_0x5330c4(0x64b))?_0x5330c4(0x2db)!==_0x5330c4(0x2db)?this['cursorRight'](_0x1a0758[_0x5330c4(0x3af)](_0x5330c4(0x16d))):(Input[_0x5330c4(0x8bd)](),this[_0x5330c4(0x465)](_0x5330c4(0x645))):VisuMZ[_0x5330c4(0x45d)]['Window_NameInput_processHandling'][_0x5330c4(0x967)](this);}}}},VisuMZ['CoreEngine']['Window_NameInput_processTouch']=Window_NameInput[_0x38072d(0x182)][_0x38072d(0x9eb)],Window_NameInput['prototype'][_0x38072d(0x9eb)]=function(){const _0x3b2c40=_0x38072d;if(!this[_0x3b2c40(0x3dd)]())return;if(this[_0x3b2c40(0x662)]===_0x3b2c40(0x645)){if(TouchInput['isTriggered']()&&this[_0x3b2c40(0x47c)]())this[_0x3b2c40(0x465)](_0x3b2c40(0x3a2));else TouchInput['isCancelled']()&&this[_0x3b2c40(0x465)](_0x3b2c40(0x3a2));}else VisuMZ[_0x3b2c40(0x45d)][_0x3b2c40(0x7f5)][_0x3b2c40(0x967)](this);},Window_NameInput[_0x38072d(0x182)][_0x38072d(0x67d)]=function(){const _0x15d3b7=_0x38072d;if(Input[_0x15d3b7(0x915)](_0x15d3b7(0x52b)))Input['clear'](),this['onNameOk']();else{if(Input['_inputString']!==undefined){let _0x429912=Input[_0x15d3b7(0x1ad)],_0x40c745=_0x429912[_0x15d3b7(0x3ec)];for(let _0x3a9b54=0x0;_0x3a9b54<_0x40c745;++_0x3a9b54){if(this[_0x15d3b7(0x513)][_0x15d3b7(0x725)](_0x429912[_0x3a9b54]))SoundManager[_0x15d3b7(0x46b)]();else{if(_0x15d3b7(0x6d2)!=='hRDcr')SoundManager[_0x15d3b7(0x11e)]();else{var _0x432388=_0x325b74-1.5/2.75;return 7.5625*_0x432388*_0x432388+0.75;}}}Input['clear']();}}},Window_NameInput[_0x38072d(0x182)][_0x38072d(0x465)]=function(_0x2f4bcf){const _0x3b44a2=_0x38072d;let _0x3bd219=this[_0x3b44a2(0x662)];this['_mode']=_0x2f4bcf,_0x3bd219!==this[_0x3b44a2(0x662)]&&(this[_0x3b44a2(0x7c3)](),SoundManager[_0x3b44a2(0x46b)](),this[_0x3b44a2(0x662)]===_0x3b44a2(0x3a2)?this[_0x3b44a2(0x736)](0x0):this[_0x3b44a2(0x736)](-0x1));},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x521)]=Window_NameInput['prototype'][_0x38072d(0x930)],Window_NameInput[_0x38072d(0x182)]['cursorDown']=function(_0x3c98c3){const _0x33af29=_0x38072d;if(this[_0x33af29(0x662)]===_0x33af29(0x645)&&!Input[_0x33af29(0x84f)]())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x33af29(0x45d)][_0x33af29(0x521)][_0x33af29(0x967)](this,_0x3c98c3),this[_0x33af29(0x465)](_0x33af29(0x3a2));},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x270)]=Window_NameInput[_0x38072d(0x182)]['cursorUp'],Window_NameInput[_0x38072d(0x182)][_0x38072d(0x36a)]=function(_0x5bcfe7){const _0x228c7c=_0x38072d;if(this[_0x228c7c(0x662)]===_0x228c7c(0x645)&&!Input['isArrowPressed']())return;if(Input[_0x228c7c(0x9aa)]())return;VisuMZ[_0x228c7c(0x45d)]['Window_NameInput_cursorUp']['call'](this,_0x5bcfe7),this[_0x228c7c(0x465)](_0x228c7c(0x3a2));},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x114)]=Window_NameInput[_0x38072d(0x182)]['cursorRight'],Window_NameInput[_0x38072d(0x182)][_0x38072d(0x929)]=function(_0x57266b){const _0x587f0f=_0x38072d;if(this[_0x587f0f(0x662)]===_0x587f0f(0x645)&&!Input['isArrowPressed']())return;if(Input['isNumpadPressed']())return;VisuMZ[_0x587f0f(0x45d)][_0x587f0f(0x114)]['call'](this,_0x57266b),this['switchModes'](_0x587f0f(0x3a2));},VisuMZ['CoreEngine']['Window_NameInput_cursorLeft']=Window_NameInput[_0x38072d(0x182)][_0x38072d(0x21b)],Window_NameInput[_0x38072d(0x182)]['cursorLeft']=function(_0x22776e){const _0x238a30=_0x38072d;if(this['_mode']===_0x238a30(0x645)&&!Input[_0x238a30(0x84f)]())return;if(Input[_0x238a30(0x9aa)]())return;VisuMZ[_0x238a30(0x45d)]['Window_NameInput_cursorLeft'][_0x238a30(0x967)](this,_0x22776e),this[_0x238a30(0x465)]('default');},VisuMZ['CoreEngine']['Window_NameInput_cursorPagedown']=Window_NameInput[_0x38072d(0x182)][_0x38072d(0x55f)],Window_NameInput[_0x38072d(0x182)][_0x38072d(0x55f)]=function(){const _0x3312cf=_0x38072d;if(this['_mode']===_0x3312cf(0x645))return;if(Input[_0x3312cf(0x9aa)]())return;VisuMZ[_0x3312cf(0x45d)][_0x3312cf(0x1c5)][_0x3312cf(0x967)](this),this[_0x3312cf(0x465)](_0x3312cf(0x3a2));},VisuMZ[_0x38072d(0x45d)]['Window_NameInput_cursorPageup']=Window_NameInput[_0x38072d(0x182)][_0x38072d(0x960)],Window_NameInput[_0x38072d(0x182)]['cursorPageup']=function(){const _0xf0dd53=_0x38072d;if(this['_mode']===_0xf0dd53(0x645))return;if(Input[_0xf0dd53(0x9aa)]())return;VisuMZ[_0xf0dd53(0x45d)]['Window_NameInput_cursorPageup'][_0xf0dd53(0x967)](this),this[_0xf0dd53(0x465)]('default');},VisuMZ['CoreEngine'][_0x38072d(0x4d4)]=Window_NameInput['prototype'][_0x38072d(0x7c3)],Window_NameInput['prototype'][_0x38072d(0x7c3)]=function(){const _0x4b0705=_0x38072d;if(this['_mode']===_0x4b0705(0x645)){this['contents'][_0x4b0705(0x8bd)](),this[_0x4b0705(0x924)][_0x4b0705(0x8bd)](),this[_0x4b0705(0x9b2)]();let _0x5f2f3d=VisuMZ[_0x4b0705(0x45d)]['Settings'][_0x4b0705(0x38f)][_0x4b0705(0x95f)]['split']('\x0a'),_0xfc570e=_0x5f2f3d[_0x4b0705(0x3ec)],_0x159af5=(this[_0x4b0705(0x448)]-_0xfc570e*this['lineHeight']())/0x2;for(let _0x15e284=0x0;_0x15e284<_0xfc570e;++_0x15e284){let _0x6b81ba=_0x5f2f3d[_0x15e284],_0x3e355e=this['textSizeEx'](_0x6b81ba)[_0x4b0705(0x729)],_0x4406f6=Math[_0x4b0705(0x167)]((this['contents'][_0x4b0705(0x729)]-_0x3e355e)/0x2);this[_0x4b0705(0x449)](_0x6b81ba,_0x4406f6,_0x159af5),_0x159af5+=this['lineHeight']();}}else VisuMZ[_0x4b0705(0x45d)]['Window_NameInput_refresh'][_0x4b0705(0x967)](this);};};VisuMZ['CoreEngine'][_0x38072d(0xf6)]=Window_ShopSell['prototype']['isEnabled'],Window_ShopSell['prototype'][_0x38072d(0x8ca)]=function(_0x27bedc){const _0x47a472=_0x38072d;return VisuMZ['CoreEngine'][_0x47a472(0x75d)][_0x47a472(0x6a9)][_0x47a472(0x823)]&&DataManager[_0x47a472(0x768)](_0x27bedc)?![]:VisuMZ[_0x47a472(0x45d)]['Window_ShopSell_isEnabled'][_0x47a472(0x967)](this,_0x27bedc);},Window_NumberInput['prototype']['isUseModernControls']=function(){return![];};VisuMZ['CoreEngine'][_0x38072d(0x75d)][_0x38072d(0x38f)][_0x38072d(0x1a4)]&&(VisuMZ[_0x38072d(0x45d)][_0x38072d(0x7ed)]=Window_NumberInput['prototype'][_0x38072d(0x224)],Window_NumberInput[_0x38072d(0x182)][_0x38072d(0x224)]=function(){const _0x5205bd=_0x38072d;VisuMZ[_0x5205bd(0x45d)]['Window_NumberInput_start'][_0x5205bd(0x967)](this),this[_0x5205bd(0x736)](this[_0x5205bd(0xe9)]-0x1),Input['clear']();},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x4ba)]=Window_NumberInput[_0x38072d(0x182)][_0x38072d(0x565)],Window_NumberInput[_0x38072d(0x182)]['processDigitChange']=function(){const _0x4539e9=_0x38072d;if(!this[_0x4539e9(0x3dd)]())return;if(Input[_0x4539e9(0x9aa)]()){if(_0x4539e9(0x455)!==_0x4539e9(0x455)){_0x3862d6[_0x4539e9(0x57a)](_0x3cf0f1,_0x215140);const _0x178fa7=_0x180d8e[_0x4539e9(0x336)];_0x3c5be0[_0x4539e9(0x630)](_0x178fa7);}else this[_0x4539e9(0x901)]();}else{if(Input[_0x4539e9(0x915)](_0x4539e9(0x4c4)))_0x4539e9(0x981)!=='pRgHY'?_0x2c1452['playBuzzer']():this['processKeyboardBackspace']();else{if(Input['_inputSpecialKeyCode']===0x2e)this[_0x4539e9(0x964)]();else{if(Input[_0x4539e9(0x103)]===0x24)this[_0x4539e9(0x8df)]();else Input['_inputSpecialKeyCode']===0x23?this[_0x4539e9(0x64f)]():'cKRMO'!==_0x4539e9(0x6bf)?this[_0x4539e9(0xeb)]=0x1:VisuMZ['CoreEngine'][_0x4539e9(0x4ba)][_0x4539e9(0x967)](this);}}}},Window_NumberInput[_0x38072d(0x182)][_0x38072d(0x6d3)]=function(){const _0x189feb=_0x38072d;if(!this['isCursorMovable']())return;Input[_0x189feb(0x9aa)]()?this[_0x189feb(0x901)]():Window_Selectable[_0x189feb(0x182)][_0x189feb(0x6d3)][_0x189feb(0x967)](this);},Window_NumberInput[_0x38072d(0x182)]['processCursorHomeEndTrigger']=function(){},Window_NumberInput[_0x38072d(0x182)][_0x38072d(0x901)]=function(){const _0x49159d=_0x38072d;if(String(this[_0x49159d(0x8de)])[_0x49159d(0x3ec)]>=this[_0x49159d(0xe9)])return;const _0x5a7d1a=Number(String(this[_0x49159d(0x8de)])+Input[_0x49159d(0x1ad)]);if(isNaN(_0x5a7d1a))return;this[_0x49159d(0x8de)]=_0x5a7d1a;const _0xa0df6e='9'[_0x49159d(0x984)](this[_0x49159d(0xe9)]);this['_number']=this[_0x49159d(0x8de)][_0x49159d(0x480)](0x0,_0xa0df6e),Input[_0x49159d(0x8bd)](),this[_0x49159d(0x7c3)](),SoundManager['playCursor'](),this[_0x49159d(0x736)](this[_0x49159d(0xe9)]-0x1);},Window_NumberInput[_0x38072d(0x182)]['processKeyboardBackspace']=function(){const _0xa23c46=_0x38072d;this[_0xa23c46(0x8de)]=Number(String(this[_0xa23c46(0x8de)])[_0xa23c46(0x411)](0x0,-0x1)),this[_0xa23c46(0x8de)]=Math[_0xa23c46(0x285)](0x0,this[_0xa23c46(0x8de)]),Input[_0xa23c46(0x8bd)](),this[_0xa23c46(0x7c3)](),SoundManager[_0xa23c46(0x687)](),this[_0xa23c46(0x736)](this[_0xa23c46(0xe9)]-0x1);},Window_NumberInput[_0x38072d(0x182)][_0x38072d(0x964)]=function(){const _0x5c64e3=_0x38072d;this[_0x5c64e3(0x8de)]=Number(String(this[_0x5c64e3(0x8de)])[_0x5c64e3(0x23f)](0x1)),this[_0x5c64e3(0x8de)]=Math[_0x5c64e3(0x285)](0x0,this[_0x5c64e3(0x8de)]),Input[_0x5c64e3(0x8bd)](),this[_0x5c64e3(0x7c3)](),SoundManager[_0x5c64e3(0x687)](),this[_0x5c64e3(0x736)](this[_0x5c64e3(0xe9)]-0x1);},Window_NumberInput[_0x38072d(0x182)][_0x38072d(0x8df)]=function(){const _0x2f2394=_0x38072d;if(this['index']()===0x0)return;Input[_0x2f2394(0x8bd)](),this[_0x2f2394(0x7c3)](),SoundManager[_0x2f2394(0x687)](),this['select'](0x0);},Window_NumberInput[_0x38072d(0x182)][_0x38072d(0x64f)]=function(){const _0x5108b3=_0x38072d;if(this[_0x5108b3(0x416)]()===this[_0x5108b3(0xe9)]-0x1)return;Input[_0x5108b3(0x8bd)](),this[_0x5108b3(0x7c3)](),SoundManager[_0x5108b3(0x687)](),this['select'](this[_0x5108b3(0xe9)]-0x1);});;VisuMZ['CoreEngine'][_0x38072d(0x93a)]=Window_MapName[_0x38072d(0x182)][_0x38072d(0x7c3)],Window_MapName[_0x38072d(0x182)][_0x38072d(0x7c3)]=function(){const _0x5085ad=_0x38072d;if(VisuMZ[_0x5085ad(0x45d)]['Settings']['QoL']['MapNameTextCode']){if('RKNOs'!==_0x5085ad(0x15a)){var _0x464896=_0x2a308c(_0xe77ddd['$1']);try{_0x21f157+=_0x2f53fb(_0x464896);}catch(_0x32c932){if(_0x14d82d[_0x5085ad(0x267)]())_0x293fe4['log'](_0x32c932);}}else this[_0x5085ad(0x85c)]();}else{if(_0x5085ad(0x934)!==_0x5085ad(0x934)){if(this[_0x5085ad(0x662)]==='keyboard'&&!_0x539b6c['isArrowPressed']())return;if(_0x3ecade[_0x5085ad(0x9aa)]())return;_0x315dba[_0x5085ad(0x45d)][_0x5085ad(0x114)][_0x5085ad(0x967)](this,_0x45a6f3),this[_0x5085ad(0x465)](_0x5085ad(0x3a2));}else VisuMZ['CoreEngine'][_0x5085ad(0x93a)][_0x5085ad(0x967)](this);}},Window_MapName['prototype']['refreshWithTextCodeSupport']=function(){const _0x46622f=_0x38072d;this[_0x46622f(0x6e1)][_0x46622f(0x8bd)]();if($gameMap[_0x46622f(0x748)]()){const _0x37d003=this[_0x46622f(0x658)];this[_0x46622f(0x40a)](0x0,0x0,_0x37d003,this[_0x46622f(0x2ef)]());const _0x441ae7=this['textSizeEx']($gameMap[_0x46622f(0x748)]())[_0x46622f(0x729)];this['drawTextEx']($gameMap[_0x46622f(0x748)](),Math[_0x46622f(0x167)]((_0x37d003-_0x441ae7)/0x2),0x0);}},Window_TitleCommand[_0x38072d(0x5fc)]=VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x5ae)],Window_TitleCommand[_0x38072d(0x182)]['makeCommandList']=function(){const _0xe57d59=_0x38072d;this[_0xe57d59(0x6c5)]();},Window_TitleCommand[_0x38072d(0x182)][_0x38072d(0x6c5)]=function(){const _0x3afc07=_0x38072d;for(const _0x1a521a of Window_TitleCommand['_commandList']){if(_0x1a521a['ShowJS'][_0x3afc07(0x967)](this)){if(_0x3afc07(0xa06)!==_0x3afc07(0xa06))return;else{const _0x554b55=_0x1a521a[_0x3afc07(0x9f1)];let _0x23892c=_0x1a521a[_0x3afc07(0x2a1)];if(['',_0x3afc07(0x734)][_0x3afc07(0x2ac)](_0x23892c))_0x23892c=_0x1a521a[_0x3afc07(0x527)][_0x3afc07(0x967)](this);const _0x19bb19=_0x1a521a['EnableJS'][_0x3afc07(0x967)](this),_0x8adee3=_0x1a521a[_0x3afc07(0x73b)]['call'](this);this[_0x3afc07(0x380)](_0x23892c,_0x554b55,_0x19bb19,_0x8adee3),this[_0x3afc07(0x25a)](_0x554b55,_0x1a521a[_0x3afc07(0x868)][_0x3afc07(0x667)](this,_0x8adee3));}}}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x999)]=Window_TitleCommand[_0x38072d(0x182)][_0x38072d(0x90f)],Window_TitleCommand[_0x38072d(0x182)]['selectLast']=function(){const _0x98b51d=_0x38072d;VisuMZ[_0x98b51d(0x45d)][_0x98b51d(0x999)][_0x98b51d(0x967)](this);if(!Window_TitleCommand[_0x98b51d(0x27b)])return;const _0x18f483=this[_0x98b51d(0x7f4)](Window_TitleCommand[_0x98b51d(0x27b)]),_0x1b3476=Math[_0x98b51d(0x167)](this[_0x98b51d(0x6c9)]()/0x2)-0x1;this['smoothSelect'](_0x18f483),this['_scrollDuration']>0x1&&(_0x98b51d(0x874)===_0x98b51d(0x98d)?this[_0x98b51d(0x371)]>0x0&&(this['_anchor']['x']=this[_0x98b51d(0x78e)](this['_anchor']['x'],this[_0x98b51d(0x8b4)]['x']),this['_anchor']['y']=this[_0x98b51d(0x78e)](this[_0x98b51d(0x644)]['y'],this['_targetAnchor']['y'])):(this['_scrollDuration']=0x1,this[_0x98b51d(0x7a4)]())),this[_0x98b51d(0x54a)](_0x18f483-_0x1b3476);},Window_GameEnd['_commandList']=VisuMZ[_0x38072d(0x45d)]['Settings'][_0x38072d(0x827)][_0x38072d(0x841)][_0x38072d(0x3d9)],Window_GameEnd[_0x38072d(0x182)]['makeCommandList']=function(){this['makeCoreEngineCommandList']();},Window_GameEnd[_0x38072d(0x182)][_0x38072d(0x6c5)]=function(){const _0x10407c=_0x38072d;for(const _0x12b380 of Window_GameEnd[_0x10407c(0x5fc)]){if(_0x12b380['ShowJS'][_0x10407c(0x967)](this)){const _0x1c4093=_0x12b380['Symbol'];let _0x51ab04=_0x12b380['TextStr'];if(['','Untitled'][_0x10407c(0x2ac)](_0x51ab04))_0x51ab04=_0x12b380['TextJS']['call'](this);const _0x4d092e=_0x12b380[_0x10407c(0x5f1)]['call'](this),_0xaf851=_0x12b380[_0x10407c(0x73b)][_0x10407c(0x967)](this);this['addCommand'](_0x51ab04,_0x1c4093,_0x4d092e,_0xaf851),this[_0x10407c(0x25a)](_0x1c4093,_0x12b380[_0x10407c(0x868)][_0x10407c(0x667)](this,_0xaf851));}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist['prototype']=Object['create'](Window_Base[_0x38072d(0x182)]),Window_ButtonAssist[_0x38072d(0x182)][_0x38072d(0x1aa)]=Window_ButtonAssist,Window_ButtonAssist[_0x38072d(0x182)][_0x38072d(0x770)]=function(_0x5ab42d){const _0x31440e=_0x38072d;this[_0x31440e(0x197)]={},Window_Base['prototype']['initialize'][_0x31440e(0x967)](this,_0x5ab42d),this[_0x31440e(0x6ad)](VisuMZ[_0x31440e(0x45d)]['Settings'][_0x31440e(0x6b6)][_0x31440e(0x8a7)]||0x0),this[_0x31440e(0x7c3)]();},Window_ButtonAssist[_0x38072d(0x182)][_0x38072d(0x5fb)]=function(){const _0x21ab17=_0x38072d;if(this[_0x21ab17(0x6e1)][_0x21ab17(0x70e)]<=0x60){if(_0x21ab17(0x5c9)!==_0x21ab17(0x98a))this[_0x21ab17(0x6e1)][_0x21ab17(0x70e)]+=0x6;else{const _0x54e3da=_0x4a3e4f[_0x21ab17(0x45d)]['Settings'][_0x21ab17(0x6a9)][_0x21ab17(0x74a)]||0x0;if(_0x54e3da>0x0)_0x1c02d2[_0x21ab17(0x2ca)](_0x54e3da);}}},Window_ButtonAssist[_0x38072d(0x182)][_0x38072d(0x860)]=function(){const _0x899c1d=_0x38072d;if(this[_0x899c1d(0x6e1)]['fontSize']>=0x18){if(_0x899c1d(0x2ba)===_0x899c1d(0x37d))return this[_0x899c1d(0x195)]?this[_0x899c1d(0x195)]['id']:_0x899c1d(0x805);else this[_0x899c1d(0x6e1)]['fontSize']-=0x6;}},Window_ButtonAssist[_0x38072d(0x182)][_0x38072d(0x444)]=function(){const _0x17ea06=_0x38072d;Window_Base['prototype'][_0x17ea06(0x444)][_0x17ea06(0x967)](this),this[_0x17ea06(0x142)]();},Window_ButtonAssist[_0x38072d(0x182)][_0x38072d(0x116)]=function(){const _0xade243=_0x38072d;this[_0xade243(0x2dc)]=SceneManager[_0xade243(0x576)][_0xade243(0x6d0)]()!==_0xade243(0x3e1)?0x0:0x8;},Window_ButtonAssist[_0x38072d(0x182)][_0x38072d(0x142)]=function(){const _0xdbf765=_0x38072d,_0x8006e9=SceneManager[_0xdbf765(0x576)];for(let _0x598272=0x1;_0x598272<=0x5;_0x598272++){if(this['_data']['key%1'[_0xdbf765(0x941)](_0x598272)]!==_0x8006e9[_0xdbf765(0x8c8)['format'](_0x598272)]())return'YGUms'!==_0xdbf765(0x703)?this['refresh']():_0x307225[_0xdbf765(0x732)]()||_0x30dca4[_0xdbf765(0x782)]()?_0x2164ad[_0xdbf765(0x45d)][_0xdbf765(0x75d)][_0xdbf765(0x6b6)][_0xdbf765(0x9db)]:_0xdbf765(0x3e1);if(this[_0xdbf765(0x197)][_0xdbf765(0x663)[_0xdbf765(0x941)](_0x598272)]!==_0x8006e9['buttonAssistText%1'['format'](_0x598272)]())return this[_0xdbf765(0x7c3)]();}},Window_ButtonAssist[_0x38072d(0x182)][_0x38072d(0x7c3)]=function(){const _0x1a6a17=_0x38072d;this['contents']['clear']();for(let _0x59da01=0x1;_0x59da01<=0x5;_0x59da01++){if(_0x1a6a17(0x582)!==_0x1a6a17(0x582)){const _0x56ad92=_0x4c92e1['open'](_0x8449e,'_blank');}else this[_0x1a6a17(0x191)](_0x59da01);}},Window_ButtonAssist[_0x38072d(0x182)]['drawSegment']=function(_0x2c0f54){const _0x533618=_0x38072d,_0x377894=this[_0x533618(0x658)]/0x5,_0x39f2be=SceneManager[_0x533618(0x576)],_0x23f493=_0x39f2be[_0x533618(0x8c8)['format'](_0x2c0f54)](),_0x3bdf55=_0x39f2be['buttonAssistText%1'[_0x533618(0x941)](_0x2c0f54)]();this[_0x533618(0x197)][_0x533618(0x99e)[_0x533618(0x941)](_0x2c0f54)]=_0x23f493,this[_0x533618(0x197)][_0x533618(0x663)[_0x533618(0x941)](_0x2c0f54)]=_0x3bdf55;if(_0x23f493==='')return;if(_0x3bdf55==='')return;const _0x3b5cd1=_0x39f2be[_0x533618(0x7b1)['format'](_0x2c0f54)](),_0x1e04d6=this['itemPadding'](),_0x441300=_0x377894*(_0x2c0f54-0x1)+_0x1e04d6+_0x3b5cd1,_0x3bd3fc=VisuMZ[_0x533618(0x45d)]['Settings'][_0x533618(0x6b6)]['TextFmt'];this[_0x533618(0x449)](_0x3bd3fc[_0x533618(0x941)](_0x23f493,_0x3bdf55),_0x441300,0x0,_0x377894-_0x1e04d6*0x2);},VisuMZ['CoreEngine']['Game_Interpreter_updateWaitMode']=Game_Interpreter['prototype'][_0x38072d(0x615)],Game_Interpreter['prototype']['updateWaitMode']=function(){const _0xaeb1d=_0x38072d;if($gameTemp['_pictureCoordinatesMode']!==undefined){if(_0xaeb1d(0x828)===_0xaeb1d(0x828))return VisuMZ[_0xaeb1d(0x45d)]['UpdatePictureCoordinates']();else{if(this[_0xaeb1d(0x5fa)]===_0x479faa)this[_0xaeb1d(0x3cc)]();if(this[_0xaeb1d(0x5fa)]['BattleSystem']===_0x28b3d5)this[_0xaeb1d(0x12a)]();this[_0xaeb1d(0x5fa)]['BattleSystem']=_0x44248c;}}return VisuMZ[_0xaeb1d(0x45d)]['Game_Interpreter_updateWaitMode'][_0xaeb1d(0x967)](this);},VisuMZ['CoreEngine'][_0x38072d(0x76f)]=function(){const _0xbc95f9=_0x38072d,_0x2b9ff7=$gameTemp[_0xbc95f9(0x2d7)]||0x0;(_0x2b9ff7<0x0||_0x2b9ff7>0x64||TouchInput[_0xbc95f9(0x259)]()||Input[_0xbc95f9(0x3af)]('cancel'))&&(_0xbc95f9(0x43b)===_0xbc95f9(0x38e)?(this[_0xbc95f9(0x4d7)]&&this[_0xbc95f9(0x4d7)]['setBackgroundType'](_0x5e1c86['layoutSettings'][_0xbc95f9(0x3b6)]),this[_0xbc95f9(0x75f)]&&this[_0xbc95f9(0x75f)][_0xbc95f9(0x6ad)](_0xaa0e2d[_0xbc95f9(0x54f)][_0xbc95f9(0x715)]),this[_0xbc95f9(0x1fe)]&&this['_statusWindow']['setBackgroundType'](_0x581fb4[_0xbc95f9(0x54f)][_0xbc95f9(0x5e5)])):($gameTemp['_pictureCoordinatesMode']=undefined,Input[_0xbc95f9(0x8bd)](),TouchInput[_0xbc95f9(0x8bd)]()));const _0x3361b4=$gameScreen[_0xbc95f9(0x8f0)](_0x2b9ff7);return _0x3361b4&&(_0x3361b4['_x']=TouchInput['_x'],_0x3361b4['_y']=TouchInput['_y']),VisuMZ['CoreEngine'][_0xbc95f9(0x21d)](),$gameTemp[_0xbc95f9(0x2d7)]!==undefined;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x21d)]=function(){const _0x348854=_0x38072d,_0x29e8a1=SceneManager['_scene'];if(!_0x29e8a1)return;!_0x29e8a1[_0x348854(0x84b)]&&(SoundManager[_0x348854(0x68f)](),_0x29e8a1[_0x348854(0x84b)]=new Window_PictureCoordinates(),_0x29e8a1[_0x348854(0x343)](_0x29e8a1[_0x348854(0x84b)])),$gameTemp[_0x348854(0x2d7)]===undefined&&(SoundManager['playCancel'](),_0x29e8a1[_0x348854(0x501)](_0x29e8a1[_0x348854(0x84b)]),_0x29e8a1[_0x348854(0x84b)]=undefined);};function Window_PictureCoordinates(){const _0x298d0b=_0x38072d;this[_0x298d0b(0x770)](...arguments);}Window_PictureCoordinates['prototype']=Object['create'](Window_Base[_0x38072d(0x182)]),Window_PictureCoordinates[_0x38072d(0x182)][_0x38072d(0x1aa)]=Window_PictureCoordinates,Window_PictureCoordinates[_0x38072d(0x182)][_0x38072d(0x770)]=function(){const _0x3486bd=_0x38072d;this['_lastOrigin']=_0x3486bd(0x4df),this[_0x3486bd(0x2d8)]='nah',this[_0x3486bd(0x611)]=_0x3486bd(0x4df);const _0x4f94ce=this[_0x3486bd(0x3e4)]();Window_Base[_0x3486bd(0x182)][_0x3486bd(0x770)][_0x3486bd(0x967)](this,_0x4f94ce),this[_0x3486bd(0x6ad)](0x2);},Window_PictureCoordinates['prototype'][_0x38072d(0x3e4)]=function(){const _0x54258e=_0x38072d;let _0x4867be=0x0,_0x429f=Graphics['height']-this[_0x54258e(0x2ef)](),_0xcbb410=Graphics[_0x54258e(0x729)],_0x30a488=this['lineHeight']();return new Rectangle(_0x4867be,_0x429f,_0xcbb410,_0x30a488);},Window_PictureCoordinates[_0x38072d(0x182)][_0x38072d(0x116)]=function(){const _0x1ffb7d=_0x38072d;this[_0x1ffb7d(0x2dc)]=0x0;},Window_PictureCoordinates[_0x38072d(0x182)][_0x38072d(0x444)]=function(){const _0x19f7fc=_0x38072d;Window_Base['prototype'][_0x19f7fc(0x444)][_0x19f7fc(0x967)](this),this[_0x19f7fc(0x34b)]();},Window_PictureCoordinates['prototype'][_0x38072d(0x34b)]=function(){const _0x4e99ed=_0x38072d;if(!this[_0x4e99ed(0x256)]())return;this[_0x4e99ed(0x7c3)]();},Window_PictureCoordinates[_0x38072d(0x182)][_0x38072d(0x256)]=function(){const _0x357a40=_0x38072d,_0x24d276=$gameTemp['_pictureCoordinatesMode'],_0x27dd79=$gameScreen[_0x357a40(0x8f0)](_0x24d276);if(_0x27dd79){if('wqsIA'==='wqsIA')return this[_0x357a40(0x85d)]!==_0x27dd79[_0x357a40(0x9d4)]||this[_0x357a40(0x2d8)]!==_0x27dd79['_x']||this[_0x357a40(0x611)]!==_0x27dd79['_y'];else this[_0x357a40(0x5ce)]();}else return![];},Window_PictureCoordinates[_0x38072d(0x182)]['refresh']=function(){const _0x4cd973=_0x38072d;this[_0x4cd973(0x6e1)][_0x4cd973(0x8bd)]();const _0x3f2bd9=$gameTemp[_0x4cd973(0x2d7)],_0x73c50d=$gameScreen['picture'](_0x3f2bd9);if(!_0x73c50d)return;this[_0x4cd973(0x85d)]=_0x73c50d[_0x4cd973(0x9d4)],this['_lastX']=_0x73c50d['_x'],this[_0x4cd973(0x611)]=_0x73c50d['_y'];const _0x483ee3=ColorManager[_0x4cd973(0x817)]();this[_0x4cd973(0x6e1)][_0x4cd973(0x201)](0x0,0x0,this[_0x4cd973(0x658)],this['innerHeight'],_0x483ee3);const _0x4bc638='\x20Origin:\x20%1'[_0x4cd973(0x941)](_0x73c50d[_0x4cd973(0x9d4)]===0x0?_0x4cd973(0x200):_0x4cd973(0x7f6)),_0x250bff=_0x4cd973(0x37b)[_0x4cd973(0x941)](_0x73c50d['_x']),_0xa9e4ae=_0x4cd973(0x922)['format'](_0x73c50d['_y']),_0x445ea3='%1:\x20Exit\x20'[_0x4cd973(0x941)](TextManager[_0x4cd973(0x63e)](_0x4cd973(0x15e)));let _0x2beb51=Math[_0x4cd973(0x167)](this['innerWidth']/0x4);this[_0x4cd973(0x6a0)](_0x4bc638,_0x2beb51*0x0,0x0,_0x2beb51),this['drawText'](_0x250bff,_0x2beb51*0x1,0x0,_0x2beb51,_0x4cd973(0x544)),this[_0x4cd973(0x6a0)](_0xa9e4ae,_0x2beb51*0x2,0x0,_0x2beb51,_0x4cd973(0x544));const _0x4a6b55=this['textSizeEx'](_0x445ea3)[_0x4cd973(0x729)],_0x352261=this[_0x4cd973(0x658)]-_0x4a6b55;this['drawTextEx'](_0x445ea3,_0x352261,0x0,_0x4a6b55);};function Window_TextPopup(){const _0x517f4e=_0x38072d;this[_0x517f4e(0x770)](...arguments);}function _0x19aa(){const _0x52a525=['_stored_hpGaugeColor2','YCTdu','sqrt','home','Scene_Boot_updateDocumentTitle','pRgHY','gainItem','ButtonHeight','repeat','stringKeyMap','IconParam1','playBgs','gxsGb','removeAllPointAnimations','JHKgS','urhBP','_displayX','xFXod','MPEPz','initMembers','Rate1','pitch','NUMPAD2','_actorWindow','toUpperCase','AllTroops','apply','ShowActorLevel','WHooa','Window_TitleCommand_selectLast','enableDigitGroupingEx','RIGHT','acjyN','InputRect','key%1','setMute','_viewportSize','buttonAssistWindowRect','paramBase','Game_Map_scrollUp','VisuMZ_2_BattleSystemBTB','refreshActor','VTOqg','resetFontSettings','AnimationMirrorOffset','onload','isNumpadPressed','meVolume','getPointAnimationLayer','IconParam6','GroupDigits','font','NoTileShadows','bodyColor','resetTextColor','_mirror','Input_shouldPreventDefault','F21','uiAreaHeight','_balloonQueue','_startLoading','Type','iZjaN','ONE','Spriteset_Base_initialize','initCoreEasing','zeiID','Riegh','Sprite_Actor_setActorHome','initialLevel','mALak','OUTQUART','IJDni','_encounterCount','updateOrigin','SmartEventCollisionPriority','PictureCoordinatesMode','Bitmap_initialize','smoothSelect','ARRAYEVAL','_onKeyPress','ETB','application/json','isPhysical','setupCoreEasing','Duration','paramFlatJS','ImprovedAccuracySystem','_origin','Smooth','ApplyEasing','MYJzS','fcOxf','Scene_Name_onInputOk','helpWindowRect','Location','qjUCn','RPyFW','ColorNormal','XEyVg','deselect','font-smooth','〘Common\x20Event\x20%1:\x20%2〙\x20Start','isMaskingEnabled','terminate','Scene_Map_update','iFNFX','SEPARATOR','HELP','isMVAnimation','WIN_ICO_00','processTouch','Window_Base_drawFace','13056UFJxBA','nFshT','PictureEraseAll','ctrl','Symbol','isBusy','LEFT','lKqzy','nwyFK','ShowDevTools','SsXec','_screenX','IconSParam5','zuQCP','yScrollLinkedOffset','DetachBattlePictureContainer','_texture','Bitmap_drawCircle','isClosing','【%1】\x0a','concat','isBottomButtonMode','repositionEnemiesByResolution','numActions','Page','jaZuk','_maxDigits','framesMin','_forcedBattleSys','OPEN_CURLY_BRACKET','_pointAnimationSprites','zHqZr','SHIFT','gaugeBackColor','_context','targetSpritePosition','Game_Picture_updateMove','Game_Troop_setup','BgFilename1','Window_ShopSell_isEnabled','OS_KEY','_playtestF7Looping','XParamVocab1','FadeSpeed','Game_Picture_x','ShortcutScripts','processCursorMoveModernControls','gold','JQQFu','eVGzz','xparamFlat2','Window_Selectable_itemRect','_inputSpecialKeyCode','drawIconBySize','left','AudioChangeBgsPan','normal','BattleManager_update','updatePositionCoreEngineShakeVert','_pauseSignSprite','drawCurrencyValue','itemBackColor2','StartID','open','SlotBgType','option','setupNewGame','slotWindowRect','target','Window_NameInput_cursorRight','fpQos','updatePadding','_shakePower','text','deflate','_targetOffsetX','SZFzR','_text','zxhly','playBuzzer','BottomHelp','BKSP','adjustBoxSize','zSyOo','Sprite_destroy','overallHeight','ColorTPGauge1','createSpriteset','LINEAR','initCoreEngineScreenShake','startAutoNewGame','resetBattleSystem','WIN_OEM_BACKTAB','EscapeAlways','abs','drawCharacter','keyMapper','saveViewport','Game_Actor_changeClass','_phase','BoxMargin','OptionsMenu','onInputOk','encounterStepsMinimum','windowPadding','royxT','object','ExportStrFromAllMaps','rZjDf','gaugeRate','ItemStyle','outbounce','isLoopVertical','Spriteset_Base_destroy','PIPE','updateKeyText','applyForcedGameTroopSettingsCoreEngine','Scene_MenuBase_helpAreaTop','LvExpGauge','moveCancelButtonSideButtonLayout','SParamVocab3','jtTZQ','initMembersCoreEngine','WIN_ICO_HELP','tpColor','Scene_Map_createSpriteset','addWindow','DELETE','DOUBLE_QUOTE','gaugeHeight','Sprite_Picture_loadBitmap','replace','maxHorz','_pointAnimationQueue','enableDigitGrouping','drawFace','TDaHO','level','Layer','RKNOs','boxHeight','umonu','NUM_LOCK','cancel','updateScrollBars','_textPopupWindow','titleCommandWindow','_coreEasingType','Game_Character_processMoveCommand','ExportString','outlineColorDmg','MenuBg','floor','JpzVP','damageColor','isCollidedWithEvents','drawParamName','_registerKeyInput','right','SellRect','INEXPO','ItemBackColor1','fDBre','_stored_maxLvGaugeColor1','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','MRF','Game_Picture_y','FmsIW','Item-%1-%2','RdJap','drawIcon','_helpWindow','createBackground','ztKiM','hmYGM','parameters','uzKdq','guardSkillId','applyCoreEasing','prototype','_hp','image-rendering','PRINT','hiNuS','qnjJf','updatePlayTestF7','Map%1','setupRate','getLevel','hpGaugeColor1','_pictureName','_targetX','CLOSE_PAREN','Color','drawSegment','makeTargetSprites','BarOffset','exportAllTroopStrings','_lastGamepad','fillAll','_data','<%1\x20%2:[\x20]','_stored_powerUpColor','aosmI','createFauxAnimationSprite','updateDuration','Mute','horizontal','numberShowButton','getBattleSystem','Input_clear','JwVDz','buttonAssistCancel','EnableNumberInput','PAUSE','cWcJV','IDs','setMoveEasingType','mainAreaHeight','constructor','HIT','〖〖〖\x20Map\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','_inputString','Game_Actor_levelUp','storeMapData','IconParam2','ActorHPColor','GoldOverlap','Spriteset_Base_updatePosition','allowShiftScrolling','setActionState','UCnZs','_pictureContainer','erasePicture','alignBottom','allTiles','isUseModernControls','END','EnableMasking','process_VisuMZ_CoreEngine_ControllerButtons','qWYdi','isMenuButtonAssistEnabled','buttonAssistOffset2','lKtOa','playTestF6','AutoScrollLockX','Window_NameInput_cursorPagedown','categoryWindowRect','yDjln','Game_BattlerBase_initMembers','siTYU','eZqtx','YWnbz','Sprite_AnimationMV_processTimingData','framesPerChar','Armor-%1-%2','_movementDuration','Rzzdh','destroyCoreEngineMarkedBitmaps','EQUALS','WIN_OEM_PA1','BaseTexture','isNwjs','ExportAllTroopText','doesNameContainBannedWords','MIN_SAFE_INTEGER','viewport','CategoryBgType','FunctionName','egwAP','TargetAngle','OutlineColorDmg','subject','onlyfilename','drawParamText','tpGaugeColor2','ListRect','_movementWholeDuration','PDR','markCoreEngineModified','setHome','_upArrowSprite','filter','PageChange','defineProperty','EnableNameInput','Bitmap_measureTextWidth','_cache','jsonToZip','up2','Basic','wait','defaultInputMode','_clickHandler','disable','xAVhm','AntiZoomPictures','CustomParam','AIXxQ','0.00','seVolume','itemHitImprovedAccuracy','buttonAssistKey1','_statusWindow','buttonAssistText4','Upper\x20Left','fillRect','iconWidth','angle','Scene_Options_create','shift','TextPopupShow','xnvOm','bitmap','process_VisuMZ_CoreEngine_Notetags','iPszS','upXEw','MCR','createMenuButton','REPLACE','JSON','setSideView','dfgSV','LoadMenu','_defaultStretchMode','flush','centerCameraCheckData','initVisuMZCoreEngine','nload','buttonY','VisuMZ_2_BattleSystemETB','blt','cursorLeft','powerUpColor','updatePictureCoordinates','Scene_Item_create','_storedMapText','log','updateDashToggle','INSINE','BlAty','start','Scene_MenuBase_createPageButtons','QUESTION_MARK','Scene_Battle_createSpriteset','textSizeEx','context','buttonAssistText1','Manual','checkPassage','onKeyDown','setAnchor','mvpoC','JZNbr','ONE_MINUS_SRC_ALPHA','ChPTF','STENCIL_TEST','_stored_mpCostColor','Renderer','MaxDuration','targetX','tjHkr','expRate','maxScrollbar','ExportAllMapText','currentClass','Current\x20tileset\x20has\x20incomplete\x20flag\x20data.','CEV','substring','_startPlaying','isGamepadAxisMoved','qkdgJ','_textQueue','SnapshotOpacity','checkScrollBarBitmap','WIN_OEM_CLEAR','EYwTp','numRepeats','SplitEscape','_showDevTools','sv_enemies','cuiFA','backOpacity','AudioChangeBgmVolume','vWqCL','FUNC','adjustPictureAntiZoom','MAT','_hideTileShadows','zvPSe','ExportCurTroopText','needsUpdate','loadBitmap','Plus1','isCancelled','setHandler','reservePlayTestNewGameCommonEvent','useDigitGroupingEx','enabled','name','MDR','CustomParamType','list','PGUP','pCwAH','_closing','_stored_deathColor','bvVLr','isPlaytest','Show\x20Scrolling\x20Text\x20Script\x20Error','Name','setBattleSystem','pointY','sdeEW','DESWS','IconSParam2','_index','Window_NameInput_cursorUp','XParamVocab5','mJPNT','KEEP','ATTN','currencyUnit','_margin','SkhQk','_sideButtonLayout','_mainSprite','xAtbM','_lastCommandSymbol','toLowerCase','CTB','runCombinedScrollingTextAsCode','ScreenResolution','_active','XParamVocab8','mpColor','contains','F23','max','uKcfb','pNWth','ProfileBgType','exec','PdPvE','split','TjmBG','clearForcedGameTroopSettingsCoreEngine','ZkgCl','wholeDuration','_coreEngineShakeStyle','RightMenus','currentExp','F24','Game_Picture_show','targetBackOpacity','_baseTexture','setActorHome','_scaleY','AnimationID','render','nTLXY','This\x20scene\x20cannot\x20utilize\x20a\x20Once\x20Parallel!','EQUAL','WIN_OEM_ATTN','Sprite_Battler_startMove','touchUI','TextStr','xxofq','updatePosition','tpCostColor','Scene_MenuBase_mainAreaHeight','NUMPAD5','updateTransform','RequireFocus','upzYy','stencilOp','playTestShiftR','includes','〖〖〖\x20Troop\x20%1:\x20%2\x20Script\x20〗〗〗\x0a\x0a','\x5c}❪SHIFT❫\x5c{','en-US','hpColor','checkCacheKey','TxxAV','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','targets','CCdXJ','popScene','_startDecrypting','xparamRate2','itemEva','pcELO','registerCommand','SCALE_MODES','Game_System_initialize','setLastPluginCommandInterpreter','NUMPAD1','OaZdb','_scrollBarVert','statusParamsWindowRect','_coreEasing','VkRCT','createCustomParameter','paramMax','Scene_Base_createWindowLayer','valueOutlineWidth','rcWBC','reserveCommonEvent','canUse','Scene_MenuBase_mainAreaTop','AutoStretch','helpAreaTopSideButtonLayout','_setupEventHandlers','Bitmap_drawTextOutline','onClick','chXJr','DocumentTitleFmt','eventsXyNt','fadeSpeed','LIhrF','_pictureCoordinatesMode','_lastX','inbounce','_opacity','TvFOQ','padding','Window_Base_createContents','XParamVocab7','EditRect','buttons','catchException','SkillTypeBgType','OpenConsole','lAmqr','horzJS','MinDuration','backgroundBitmap','addQueue','OSEVt','SBaFX','_backSprite1','PictureEraseRange','Flat1','SwitchToggleRange','lineHeight','altKey','StatusRect','Subtitle','helpAreaTop','uiAreaWidth','REC','jRHiO','wrvbw','isAlive','itypeId','isItemStyle','Finish','FontSmoothing','yJACB','startAnimation','FontShadows','_timerSprite','updateAnchor','SParamVocab1','tRrum','battlerHue','_isWindow','Plus2','LUK','fillStyle','fromCharCode','windowOpacity','scaleSprite','drawTextTopAligned','_animationQueue','IconSParam9','itemRect','FyWqa','ScaleX','ProfileRect','EXECUTE','262112xictWa','stretch','Scene_Battle_createCancelButton','scrollUp','overrideMimeType','destroyScrollBarBitmaps','SParamVocab8','HOME','deathColor','_lastPluginCommandInterpreter','removeAnimationFromContainer','checkSmartEventCollision','processTimingData','pow','match','createDimmerSprite','sellWindowRect','buttonAssistText3','OUTQUAD','ENTER','darwin','textAlign','endAction','isDying','Game_Action_updateLastTarget','_mp','process_VisuMZ_CoreEngine_RegExp','item','SceneManager_onKeyDown','playTestF7','isEnemy','createKeyJS','status','AudioChangeBgmPitch','URL','round','_lastScrollBarValues','wDBdp','F22','QShqG','catchUnknownError','iJjYC','Input_onKeyDown','SwitchToggleOne','WIN_OEM_CUSEL','_onceParallelInterpreters','SParamVocab4','addChild','coreEngineRepositionEnemies','VZIQB','exportAllMapStrings','ColorManager_loadWindowskin','Actor-%1-%2','EditBgType','Max','updateData','loadMapData','calcEasing','META','originalJS','EXCLAMATION','gVcod','sparam','map','Bitmap_fillRect','_cacheScaleX','randomJS','charAt','RTFsJ','removeAnimation','createScrollBarSprites','blockWidth','centerSprite','Weapon-%1-%2','addEventListener','XParamVocab6','xparamPlusJS','《《《\x20Event\x20%1:\x20%2,\x20Page\x20%3\x20》》》\x0a%4\x0a','NaKKK','ScreenShake','tIapU','_displayY','processFauxAnimationRequests','zJonJ','WAJHR','offset','cursorUp','BasicParameterFormula','drawGoldItemStyle','_onKeyDown','uTBYh','VOLUME_UP','_actor','_duration','_onLoad','Gold','setViewport','SystemLoadImages','NUMPAD4','ConvertNumberToString','biIaU','ActorBgType','gradientFillRect','X:\x20%1','AnimationPoint','eSbrv','_hideButtons','CustomParamAbb','addCommand','updateShadow','_dummyWindow','NPPDK','pop','alwaysDash','612598ISyhKk','createPointAnimationSprite','processSoundTimings','〘Scrolling\x20Text〙\x0a','_slotWindow','INQUART','subtitle','addAnimationSpriteToContainer','uGvQH','KeyboardInput','vbbXG','_stored_gaugeBackColor','_commonEventLayers','redraw','horz','Bitmap_resize','MODECHANGE','shake','system','paintOpacity','StatusEquipRect','_stored_tpCostColor','reserveNewGameCommonEvent','createPointAnimationTargets','DefaultStyle','OffBarOpacity','LLYOq','Graphics_defaultStretchMode','default','DEF','Window_Base_destroyContents','MjjAy','nckqL','createCancelButton','createPageButtons','qWxnB','drawValue','_scaleX','create','fOWFM','enemies','isTriggered','oYBmu','nToaB','maxLvGaugeColor1','zQQas','Scene_Map_createSpritesetFix','ParseEnemyNotetags','CommandBgType','clearCachedKeys','SkillTypeRect','crisisColor','measureTextWidth','process_VisuMZ_CoreEngine_jsQuickFunctions','yvlZe','NUM','Enable','DrawItemBackgroundJS','buttonAssistWindowSideRect','Rate','axes','Sprite_Button_initialize','showIncompleteTilesetError','setupButtonImage','SUBTRACT','initBasic','_profileWindow','bitmapHeight','_customModified','createEnemies','initCoreEngine','_stored_tpGaugeColor1','Graphics_printError','clearStencil','ItRtN','setWindowPadding','data/','_windowLayer','Game_Picture_initBasic','VariableJsBlock','powerDownColor','DigPm','BACKSPACE','CommandList','createTitleButtons','zjrKG','xparamRate1','isOpenAndActive','getKeyboardInputButtonString','itemWindowRect','CancelText','button','changeTextColor','initRotationCoreEngine','windowRect','processAlwaysEscape','dashToggle','GET','_height','processEscape','initButtonHidden','value','length','Input_setupEventHandlers','mainAreaTopSideButtonLayout','drawItem','NUMPAD8','_fauxAnimationSprites','zDPAj','KeyTAB','offsetY','setActorHomeRepositioned','ddKlr','ActorTPColor','atbActive','MAX_GL_TEXTURES','UZJsL','Graphics','QbJhg','_stored_maxLvGaugeColor2','paramchangeTextColor','PLUS','hide','ALWAYS','titles2','Game_Interpreter_command111','biHsu','traitObjects','gameTitle','down','SzxMO','kNQbA','drawBackground','_stored_hpGaugeColor1','rkPFj','targetY','eZhqn','sparamPlus','_pagedownButton','slice','Skill-%1-%2','maxLevel','getColorDataFromPluginParameters','_rate','index','SParamVocab2','currentLevelExp','AccuracyBoost','offOpacity','current','_offsetX','terms','DOWN','_drawTextShadow','destroy','ceil','INCUBIC','_listWindow','Game_Interpreter_command355','jzmMx','loadSystemImages','rFkWR','buttonAssistKey2','Game_Picture_calcEasing','SELECT','mapId','Game_Interpreter_updateWaitMode','updatePositionCoreEngineShakeOriginal','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Sprite_Animation_setViewport','ItemRect','updateMain','active','_windowskin','playEscape','save','FDR','setTargetAnchor','DisplayedParams','ARRAYJSON','TextCodeNicknames','RfEzJ','CAPSLOCK','sparamFlat2','smooth','pixelated','renderNoMask','qvVOo','activate','nTObX','update','HlLZv','ColorMPGauge1','SystemSetWindowPadding','innerHeight','drawTextEx','jLWZk','TranslucentOpacity','ParseArmorNotetags','ColorCTGauge1','NEAREST','EVA','KgdED','IconXParam7','CdQDq','goto','commandWindowRect','ShPER','_originalViewport','AllMaps','PictureShowIcon','targetContentsOpacity','expGaugeColor2','toFixed','ayLyS','CoreEngine','aQmCD','DetachMapPictureContainer','Spriteset_Base_update','openness','skillId','sin','xparamFlat1','switchModes','CeNMC','F15','Scene_Map_initialize','requestPointAnimation','vYMyE','playOk','Window_Gold_refresh','removeOnceParallelInterpreter','isGamepadConnected','mmp','isAutoColorAffected','MAX_SAFE_INTEGER','test','updateMove','move','updateMainMultiply','determineSideButtonLayoutValid','rsCnH','updateBgsParameters','LoadError','_optionsWindow','textBaseline','isTouchedInsideFrame','updateOnceParallelInterpreters','isPointAnimationPlaying','RepositionEnemies130','clamp','scrollLeft','SubfolderParse','azPDV','jdihu','JOPYs','height','_backgroundFilter','missed','KACrY','_width','_target','Game_BattlerBase_refresh','_itemWindow','BACK_SLASH','Window_Selectable_processCursorMove','244FRwspc','XParamVocab0','currentValue','maxScrollY','sparamRateJS','command122','number','retrievePointAnimation','KDVry','bitmapWidth','getCombinedScrollingText','BarThickness','pan','Sprite_Button_updateOpacity','clone','Tilemap_addShadow','JJrJj','exit','Hpdwu','_animation','loadIconBitmap','onButtonImageLoad','getControllerInputButtonString','NFqDs','Scene_Map_createSpriteset_detach','yKYKZ','SellBgType','Mfxtb','tab','sparamPlus1','mpCostColor','AudioChangeBgsPitch','ColorPowerDown','itemLineRect','isGamepadTriggered','_categoryWindow','isFauxAnimationPlaying','_stored_mpGaugeColor2','tFaLg','jiyLP','EXSEL','getGamepads','Window_NumberInput_processDigitChange','operand','end','CategoryRect','gaugeLineHeight','updateDocumentTitle','EtBqa','isEventTest','anglePlus','ParamChange','backspace','cos','_fauxAnimationQueue','xparamPlus','XmXGx','addOnceParallelInterpreter','Scene_Base_terminateAnimationClearBugFix','IconSParam7','MultiKeyFmt','TRG','transform','fTIPs','TGR','ColorTPGauge2','Title','isOpening','Window_NameInput_refresh','_anglePlus','randomInt','_commandWindow','setEasingType','_currentBgm','bfdBs','measureTextWidthNoRounding','_updateGamepadState','Game_Picture_scaleX','scrollX','nah','KjYVe','_list','updatePositionCoreEngineShakeHorz','children','setSideButtonLayout','XYrrI','tAKRG','ColorMPGauge2','retreat','destroyed','DummyBgType','Key%1','mainCommandWidth','maxItems','XParamVocab9','actor','Window','isActiveTpb','bsDLv','SwitchRandomizeRange','centerY','focus','%1%2','setFrame','dtMou','VgFbe','ItemBgType','targetScaleY','WIN_OEM_WSCTRL','alpha','XParamVocab3','TimeProgress','_colorTone','removeChild','Scene_Title_drawGameTitle','useFontWidthFix','isGamepadButtonPressed','ExtractStrFromTroop','udPuF','Window_StatusBase_drawActorSimpleStatus','asin','tDHcd','seek','getLastPluginCommandInterpreter','updateScrollBarVisibility','strokeRect','Window_Base_drawText','tpGaugeColor1','mainFontSize','DOLLAR','version','_editWindow','PictureRotate','_effectsContainer','createPointAnimation','startMove','DigitGroupingStandardText','Scene_Battle_createSpritesetFix','HjGxO','updateRotation','SceneManager_isGameActive','toString','updatePositionCoreEngineShakeRand','QwertyLayout','optionsWindowRect','Window_NameInput_cursorDown','HiWzC','_backSprite2','offsetX','PictureFilename','EXR','TextJS','paramRate2','MEV','paramPlusJS','enter','\x5c}❪TAB❫\x5c{','alVou','ctGaugeColor1','MRG','OUTQUINT','jwLQr','INQUINT','CLOSE_BRACKET','push','MainMenu','ESC','setColorTone','Scene_Boot_onDatabaseLoaded','ExtDisplayedParams','Qsxsv','volume','levelUp','SystemSetSideView','EquipMenu','ParseActorNotetags','ALTGR','createButtonAssistWindow','skillTypes','ISqbU','center','DATABASE','Game_Action_itemEva','updateBackOpacity','levelUpRecovery','showFauxAnimations','setTopRow','mute','F12','LineHeight','BlurStrength','layoutSettings','OUTCUBIC','〘Common\x20Event\x20%1:\x20%2〙\x20End','pagedownShowButton','processTouchModernControls','setup','tGycD','_targetOpacity','setCoreEngineScreenShakeStyle','setLastGamepadUsed','playCursorSound','AmMNT','paramRateJS','DECIMAL','targetPosition','VisuMZ_2_BattleSystemFTB','cursorPagedown','cnUrU','Scene_Base_terminate','rprln','getColor','isSmartEventCollisionOn','processDigitChange','VisuMZ\x20CoreEngine\x20PictureIcon\x20%1\x20%2','createWindowLayer','CommandRect','qyQow','setCommonEvent','jZPjb','translucentOpacity','ControllerButtons','setClickHandler','SLASH','aoTYX','STRUCT','loadPicture','toBVo','F7key','_muteSound','_scene','RdJkl','Window_EquipItem_isEnabled','CustomParamIcons','ConvertParams','_scrollBarHorz','HelpRect','PixelateImageRendering','INBACK','movePageButtonSideButtonLayout','_digitGroupingEx','playOnceParallelInterpreter','Kqkfv','353946umLQBx','Window_Selectable_drawBackgroundRect','sWMKh','deactivate','buttonAssistOffset5','VfNYY','_playTestFastMode','_stored_expGaugeColor2','BfKqX','_screenY','INOUTQUAD','F18','MGiUh','iUECB','Window_Base_initialize','_buttonType','iconHeight','onXhrError','qTWhW','IconParam0','Scene_Name_create','OUTBOUNCE','helpAreaHeight','style','AutoScrollLockY','_forcedTroopView','mainAreaTop','process_VisuMZ_CoreEngine_CustomParameters','batch','checkPlayerLocation','getBackgroundOpacity','iBoGk','usableSkills','createJsQuickFunction','%1〘Choice\x20%2〙\x20%3%1','displayX','Window_Base_update','printError','(\x5cd+)>','imageSmoothingEnabled','IconSParam4','paramPlus','removePointAnimation','TitleCommandList','isOptionValid','_numberWindow','editWindowRect','_tempActor','QFgUP','isExpGaugeDrawn','_stored_normalColor','sparamPlus2','HRG','getLastUsedGamepadType','tilesets','ExtractStrFromMap','ExportCurMapText','_inputWindow','trim','Scene_Battle_createSpriteset_detach','Hhesb','forceStencil','checkCoreEngineDisplayCenter','child_process','requestMotion','TextCodeClassNames','adjustSprite','SCROLLBAR','jSDMV','Chance','xkWZQ','ItemHeight','PTB','getParameter','Input_updateGamepadState','processKeyboardBackspace','dummyWindowRect','boxWidth','TMsyR','ColorTPCost','_isPlaytest','mhp','command357','textWidth','KeySHIFT','reduce','Game_Interpreter_command122','updateLastTarget','CnGln','HFUWx','WIN_OEM_FJ_JISHO','visible','_pageupButton','IconParam5','events','xVsuL','ActorRect','isAnimationPlaying','StatusBgType','Once\x20Parallel\x20for\x20Battle\x20requires\x20VisuMZ_1_BattleCore!','updateAnglePlus','isCursorMovable','playBgm','Sprite_Gauge_currentValue','win32','lErIl','GRD','MvAnimationRate','Window_NameInput_processHandling','DlMuG','EnableJS','attackSkillId','mpGaugeColor1','snapForBackground','overallWidth','giSPs','_stored_expGaugeColor1','consumable','updateEffekseer','_CoreEngineSettings','makeFontBigger','_commandList','setupBattleTestItems','makeInputButtonString','bvMAw','loadTitle1','《《《\x20Page\x20%1\x20》》》\x0a%2\x0a','_targetScaleY','_timeDuration','animations','background','UiuAL','JxrkK','_centerCameraCheck','requiredWtypeId1','ShopMenu','XParamVocab2','mRQjm','iaihU','_action','RZlvp','isRepeated','_lastY','bgsVolume','PHiTr','xKAqM','updateWaitMode','mhwEH','platform','nickname','processCursorHomeEndTrigger','_repositioned','isSceneMap','9UyPCjZ','mfgaz','Game_Action_numRepeats','setEnemyAction','createCustomBackgroundImages','8477184yYWpqP','duration','MDF','endAnimation','DeBrB','HZHAt','moveRelativeToResolutionChange','ShowScrollBar','hscoI','ColorDeath','Window_Selectable_cursorDown','origin','FIuDk','Sprite_Animation_processSoundTimings','FPMfX','openURL','GoldFontSize','〘Show\x20Text〙\x0a','buyWindowRect','xparamFlatBonus','colSpacing','itemPadding','initialBattleSystem','maxCols','InputBgType','Class-%1-%2','EDXkq','isMapScrollLinked','Game_Map_scrollDown','getInputButtonString','VisuMZ_2_BattleSystemOTB','DigitGroupingDamageSprites','statusEquipWindowRect','_targetOffsetY','gFLWd','_anchor','keyboard','jGreq','process_VisuMZ_CoreEngine_Settings','_name','ButtonFadeSpeed','Bitmap_strokeRect','escape','PHA','characters','restore','processKeyboardEnd','UNDERSCORE','Param','_dimmerSprite','IconSParam1','isScrollBarVisible','scrollbarHeight','_opening','buttonAssistKey5','innerWidth','_centerElementCoreEngine','Version','Scene_Skill_create','lGKdy','setupFont','ExportStrFromAllTroops','hit','drawBackgroundRect','CONTEXT_MENU','_mode','text%1','_drawTextOutline','FKpvM','F16','bind','systemColor','BTestItems','Game_Map_scrollRight','cdAMR','Conditional\x20Branch\x20Script\x20Error','_colorCache','Scene_GameEnd_createBackground','buttonAssistOffset1','AGI','EncounterRateMinimum','_image','note','TextManager_param','menu','NTUiz','SParameterFormula','bgmVolume','buttonAreaHeight','targetScaleX','CreateBattleSystemID','xparamFlatJS','processKeyboardHandling','OTB','qWjQT','rgba(0,\x200,\x200,\x200.7)','updateText','textColor','pictureId','setAction','setAttack','mzNhG','playCursor','none','Enemy','_changingClass','SParamVocab6','_bgsBuffer','StatusParamsRect','Scene_Map_updateScene','playLoad','EndingID','_shakeSpeed','createCommandWindow','_targetY','Abbreviation','Game_Event_start','areTileShadowsHidden','Scene_Map_updateMainMultiply','PGDN','ModernControls','PRESERVCONVERSION(%1)','isClosed','3660276GSyEJy','SePsT','worldTransform','Window_Selectable_cursorUp','drawText','onKeyDownKeysF6F7','_logWindow','join','updatePictureSettings','SkillMenu','ddTSr','isItem','integer','QoL','createContents','UySQC','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','setBackgroundType','FYoFN','buttonAssistKey4','isAnimationOffsetXMirrored','stop','keyCode','optSideView','atypeId','FdyjJ','ButtonAssist','animationBaseDelay','TPB\x20WAIT','abXXP','_spriteset','mainAreaHeightSideButtonLayout','createTroopNote','ParseItemNotetags','endBattlerActions','cKRMO','Origin','MpLRg','xdg-open','evade','Window_Scrollable_update','makeCoreEngineCommandList','connected','inputWindowRect','StatusMenu','maxVisibleItems','startNormalGame','Click\x20\x22Copy\x20Page\x22\x20from\x20another\x20tileset\x27s\x20pages','expGaugeColor1','mNZsr','scrollDown','CANCEL','getButtonAssistLocation','RegExp','RxraH','processCursorMove','isPressed','SETTINGS','makeDeepCopy','updatePositionCoreEngine','_url','ParseClassNotetags','catchLoadError','paramValueByName','tjLpZ','gwylA','outlineColorGauge','JMSre','_statusEquipWindow','contents','sceneTerminationClearEffects','itemHit','OutlineColor','ADD','targetEvaRate','battlebacks2','90LPLYTn','WYXrG','BTestArmors','mainAreaBottom','Total','advanced','gainSilentTp','updateCoreEasing','xScrollLinkedOffset','EItsf','BuyRect','consumeItem','tileWidth','Emdrz','showPointAnimations','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','calcCoreEasing','onLoad','_troopId','Scene_Status_create','textHeight','lHjZm','faces','Sprite_Picture_updateOrigin','blendFunc','bgm','BarBodyColor','naHty','paramBaseAboveLevel99','vertical','buttonAssistOffset3','pagedown','SceneManager_initialize','outlineColor','gMzqn','repositionCancelButtonSideButtonLayout','easingType','RowSpacing','fontSize','_stored_mpGaugeColor1','_cancelButton','valueOutlineColor','TILDE','scaleX','_animationSprites','GoldBgType','ohRfd','Zofmc','STB','rWpyZ','_subject','statusWindowRect','IconXParam3','ColorExpGauge1','DigitGroupingLocale','evaluate','DisplayLockX','BlendMode','Enemy-%1-%2','updateOpen','HYPHEN_MINUS','add','VisuMZ_2_BattleSystemCTB','DTB','PERCENT','width','INOUTSINE','_refreshArrows','CNT','QKYWb','eMBDJ','VisuMZ_2_BattleSystemPTB','OpenSpeed','anchor','isSideButtonLayout','bXObu','Untitled','Bitmap_gradientFillRect','select','SParamVocab7','F6key','isHandled','param','ExtJS','EISU','pEmRf','Window_Base_drawIcon','HANJA','IconParam3','contentsOpacity','ItemBackColor2','zDqIh','Match','_buyWindow','PreserveNumbers','isRightInputMode','displayName','qykYw','NewGameCommonEventAll','_digitGrouping','_drawTextBody','enemy','isMagical','SlotRect','YkRqV','drawGameSubtitle','_backgroundSprite','IconXParam5','showDevTools','buttonAssistOk','createTextState','INOUTQUART','updateScene','OpenURL','SParamVocab5','onDatabaseLoaded','BTestAddedQuantity','Settings','PictureEasingType','_goldWindow','performMiss','_pressed','setupCustomRateCoreEngine','vofdV','Game_Screen_initialize','Actor','top','xqjzy','isKeyItem','DETACH_PICTURE_CONTAINER','fiblb','643380ToiVJF','CRI','vertJS','traitsPi','UpdatePictureCoordinates','initialize','wtypeId','Game_Interpreter_PluginCommand','parseForcedGameTroopSettingsCoreEngine','Unnamed','clipboard','sRYiH','NGocT','INOUTQUINT','playCancel','buttonAssistWindowButtonRect','tAxVW','quit','command105','_cacheScaleY','jrnqh','CLEAR','rightArrowWidth','areButtonsHidden','Control\x20Variables\x20Script\x20Error','charCode','NUMPAD3','onEscapeSuccess','BOafj','WIN_OEM_AUTO','_currentBgs','Game_Map_scrollLeft','close','_updateFilterArea','XParameterFormula','applyEasing','FontSize','titles1','isEventRunning','createPointAnimationQueue','random','Plus','drawCircle','targetObjects','aRKbA','DimColor2','isFullDocumentTitle','isSideView','parse','listWindowRect','SaveMenu','ldWmH','updateOpacity','displayY','jiBBW','writeText','_backSprite','updateSmoothScroll','useDigitGrouping','_gamepadWait','pos','zdQnq','VisuMZ_3_EventChainReact','profileWindowRect','padZero','ControllerMatches','battlebacks1','drawGauge','Flat2','drawActorExpGauge','buttonAssistOffset%1','createTextPopupWindow','paramY','_refreshBack','SParamVocab9','gAMaj','sv_actors','RYrAs','filters','getInputMultiButtonStrings','successRate','GnPLR','sparamRate2','Scene_Equip_create','isWindowMaskingEnabled','VisuMZ_2_BattleSystemSTB','isInputting','DamageColor','refresh','parallaxes','_makeFontNameText','targetOpacity','IconSParam6','$dataMap','HelpBgType','baseTextRect','sAJKL','TAB','scrollRight','nextLevelExp','setValue','show','opacity','Window_StatusBase_drawActorLevel','ColorHPGauge2','IconXParam2','paramRate1','UQuaL','processPointAnimationRequests','ATK','scrollY','CTRL','SlfxO','processHandling','_battleField','params','DebugConsoleLastControllerID','Game_Picture_scaleY','DummyRect','buttonAssistKey3','FINAL','cmTIA','tilesetFlags','paramRate','updateBgmParameters','createFauxAnimationQueue','OptionsRect','zUrGI','mirror','Spriteset_Battle_createEnemies','Window_NumberInput_start','menuShowButton','createChildSprite','Game_Action_setAttack','_pollGamepads','animationShouldMirror','GetParamIcon','findSymbol','Window_NameInput_processTouch','Center','setCoreEngineUpdateWindowBg','vukYI','loadSystem','ARRAYNUM','SwitchRandomizeOne','NewGameCommonEvent','drawActorSimpleStatus','\x0a\x0a\x0a\x0a\x0a','Game_Actor_paramBase','Game_Action_itemHit','yKaKs','vgBUe','F20','msjyR','Keyboard','Bitmap_clearRect','INOUTBOUNCE','_buttonAssistWindow','_loadingState','TaVdl','stypeId','dimColor1','XParamVocab4','makeDocumentTitle','xparam','VOLUME_DOWN','pages','BTB','performEscape','_offsetY','Game_Picture_angle','LESS_THAN','itemBackColor1','_onError','command355','sparamFlat1','uUApt','moveMenuButtonSideButtonLayout','SystemSetFontSize','description','framesMax','clearRect','toLocaleString','Game_Event_isCollidedWithEvents','KeyItemProtect','arePageButtonsEnabled','itemHeight','STENCIL_BUFFER_BIT','MenuLayout','BxUSd','globalAlpha','BottomButtons','isAnimationForEach','MINUS','changeAnglePlusData','resize','#%1','drawNewParam','ParseWeaponNotetags','zDaDG','ItemPadding','scale','OUTCIRC','paramWidth','jyWMZ','DurationPerChat','VisuMZ_1_OptionsCore','zoomScale','FTB','Kmiwf','JcpRQ','isForFriend','operation','Padding','GameEnd','NumberBgType','Game_Interpreter_command105','position','QUOTE','SDwFD','MAXMP','dvcki','SwitchActorText','MAXHP','_pictureCoordinatesWindow','bgs','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','openingSpeed','isArrowPressed','<JS\x20%1\x20%2:[\x20](.*)>','createDigits','OPEN_BRACKET','YBTmx','uEeOu','Pixelated','TdYwe','AdjustAngle','makeActionList','setupCoreEngine','IconXParam6','Game_Picture_updateRotation','refreshWithTextCodeSupport','_lastOrigin','playTestShiftT','IconSet','makeFontSmaller','SEMICOLON','initDigitGrouping','xparamPlus1','min','_addShadow','ShiftR_Toggle','ParseTilesetNotetags','CallHandlerJS','setBackgroundOpacity','evaded','lsxWy','JCqpe','GroHF','oDvmq','buttonAssistText2','areButtonsOutsideMainUI','paramName','learnings','scrollbar','ZXoVh','loadTitle2','(\x5cd+)([%％])>','_stored_ctGaugeColor2','ListBgType','equips','buttonAssistSwitch','xreQF','smallParamFontSize','aKNjj','UQzBX','isNextScene','maxLvGaugeColor2','getCoreEngineScreenShakeStyle','ColorMPCost','ARRAYFUNC','Sprite_Gauge_gaugeRate','INQUAD','setMainFontSize','WNUBQ','IconXParam0','AudioChangeBgsVolume','pageup','hideButtonFromView','CustomParamNames','GoldIcon','alphabetic','type','ParamArrow','remove','Scene_Battle_update','DimColor1','Linear','anchorCoreEasing','members','INOUTCIRC','Yutwx','keyRepeatWait','onInputBannedWords','isActor','DashToggleR','Itdot','isSceneBattle','StatusParamsBgType','Scene_Menu_create','FWYma','inBattle','changeClass','dimColor2','setupScrollBarBitmap','sEifn','BgType','setGuard','RevertPreserveNumbers','updateMotion','centerX','_realScale','Scene_Boot_loadSystemImages','raIsN','Bitmap_blt','Game_Map_setup','PictureID','Saved\x20file\x20as\x20%1\x20in\x20project\x20folder.','eNAXj','_targetAnchor','jYKco','encounterStep','Window_Selectable_processTouch','SideView','ImgLoad','eva','Scene_Unlisted','drawActorLevel','clear','_downArrowSprite','TCR','pictures','ImiJw','OUTBACK','_shakeDuration','Speed','isPlaying','DTMsZ','_bgmBuffer','buttonAssistKey%1','Window_NameInput_initialize','isEnabled','xpczz','maxScrollX','WJLxZ','removeFauxAnimation','drawGameVersion','_smooth','_allTextHeight','HXIpp','ValueJS','GmNlU','_skillTypeWindow','refreshDimmerBitmap','SwyOA','lHnaC','LmphL','CLOSE_CURLY_BRACKET','SideButtons','indexOf','ZdlbL','_number','processKeyboardHome','CrisisRate','qWjlu','LNEHY','commandWindowRows','CodeJS','ColorMaxLvGauge1','_isButtonHidden','_shouldPreventDefault','Scene_MenuBase_createCancelButton','maxVert','isMaxLevel','NameMenu','Wait','DataManager_setupNewGame','Export\x20Map\x20Text\x20operation\x20will\x20finish\x20in\x20%1\x20ms(s)','BattleManager_checkSubstitute','picture','clearOnceParallelInterpreters','IconSParam3','stencilFunc','code','F13','Wzzcd','OoFMc','Sprite_AnimationMV_updatePosition','ParamName','ColorPowerUp','fNQDj','HMZUG','_internalTextures','title','getCustomBackgroundSettings','Game_Party_consumeItem','processKeyboardDigitChange','onMoveEnd','BlurFilter','Bitmap_drawText','OUTSINE','cMKgz','pointX','WIN_OEM_COPY','ParseSkillNotetags','RBZVa','ShiftT_Toggle','BgFilename2','VIEWPORT','KLNCD','selectLast','enable','PA1','Rate2','setSize','nZdYv','isSpecialCode','scaleY','_moveEasingType','NumberRect','XvZjj','CIRCUMFLEX','command111','createFauxAnimation','zIlNZ','string','img/%1/','_statusParamsWindow','isOpen','Y:\x20%1','ExtractStrFromList','contentsBack','HOith','drawGameTitle','initRotation','buttonAssistOffset4','cursorRight','isBottomHelpMode','faceHeight','updateScrollBarPosition','OUTEXPO','process_VisuMZ_CoreEngine_Functions','isGameActive','cursorDown','actorWindowRect','Graphics_centerElement','KYDAG','mFXym','responseText','gainGold','Scene_Map_createMenuButton','wZqfb','NUMPAD9','Window_MapName_refresh','SParamVocab0','thickness','isInstanceOfSceneMap','KXcyp','autoRemovalTiming','IconSParam0','format','DisplayLockY','onerror','ColorMaxLvGauge2','%1\x0a','DrawIcons','STOZa','goldWindowRect','_currentMap','loadGameImagesCoreEngine','gBSpd','tileHeight','makeAutoBattleActions','dWVlJ','1.3.0','czBhb','getControllerInputButtonMatch','STwQo','F11','yTulk','addLoadListener','WIN_OEM_FINISH','onActorChange','nRotW','createAnimationSprite','HKpyM','Exported_Script_%1.txt','lDHzk','drawAllParams','VZWMw','NameInputMessage','cursorPageup','updatePictureAntiZoom','Input_update','vVWkO','processKeyboardDelete','subjectHitRate','rzQGm','call','hNtxA','BattleSystem','GoldRect','Window_Base_createTextState','Mirror','isNormalPriority','F14','CMTXq','expParams','drawRightArrow','catchNormalError','Game_Picture_initRotation','Input_pollGamepads','refreshScrollBarBitmap','ParseAllNotetags','buttonAssistText5','pUqly','retrieveFauxAnimation','Scene_Map_updateMain','SceneManager_exit'];_0x19aa=function(){return _0x52a525;};return _0x19aa();}Window_TextPopup[_0x38072d(0x182)]=Object[_0x38072d(0x3ac)](Window_Base[_0x38072d(0x182)]),Window_TextPopup[_0x38072d(0x182)][_0x38072d(0x1aa)]=Window_TextPopup,Window_TextPopup[_0x38072d(0x6d5)]={'framesPerChar':VisuMZ['CoreEngine'][_0x38072d(0x75d)][_0x38072d(0x4f0)][_0x38072d(0x838)]??1.5,'framesMin':VisuMZ['CoreEngine'][_0x38072d(0x75d)]['Window'][_0x38072d(0x2e6)]??0x5a,'framesMax':VisuMZ[_0x38072d(0x45d)][_0x38072d(0x75d)][_0x38072d(0x4f0)][_0x38072d(0x236)]??0x12c},Window_TextPopup[_0x38072d(0x182)][_0x38072d(0x770)]=function(){const _0x2af511=_0x38072d,_0x3c68a6=new Rectangle(0x0,0x0,0x1,0x1);Window_Base['prototype'][_0x2af511(0x770)][_0x2af511(0x967)](this,_0x3c68a6),this[_0x2af511(0x461)]=0x0,this['_text']='',this[_0x2af511(0x243)]=[],this[_0x2af511(0x603)]=0x0;},Window_TextPopup[_0x38072d(0x182)][_0x38072d(0x470)]=function(){return!![];},Window_TextPopup[_0x38072d(0x182)][_0x38072d(0x2e8)]=function(_0x17a536){const _0x215cc6=_0x38072d;if(this[_0x215cc6(0x243)][this[_0x215cc6(0x243)]['length']-0x1]===_0x17a536)return;this[_0x215cc6(0x243)]['push'](_0x17a536),SceneManager[_0x215cc6(0x576)][_0x215cc6(0x343)](this);},Window_TextPopup[_0x38072d(0x182)][_0x38072d(0x444)]=function(){const _0x4935ee=_0x38072d;Window_Base[_0x4935ee(0x182)][_0x4935ee(0x444)][_0x4935ee(0x967)](this),this[_0x4935ee(0x681)](),this[_0x4935ee(0x19c)]();},Window_TextPopup[_0x38072d(0x182)][_0x38072d(0x681)]=function(){const _0x12321=_0x38072d;if(this[_0x12321(0x11c)]!=='')return;if(this['_textQueue'][_0x12321(0x3ec)]<=0x0)return;if(!this[_0x12321(0x69b)]())return;this[_0x12321(0x11c)]=this[_0x12321(0x243)]['shift']();const _0x51f7e2=Window_TextPopup[_0x12321(0x6d5)],_0xd79d3d=Math['ceil'](this[_0x12321(0x11c)]['length']*_0x51f7e2[_0x12321(0x1cd)]);this['_timeDuration']=_0xd79d3d[_0x12321(0x480)](_0x51f7e2[_0x12321(0xea)],_0x51f7e2[_0x12321(0x81f)]);const _0x3dbb4e=this['textSizeEx'](this[_0x12321(0x11c)]);let _0x52e11b=_0x3dbb4e['width']+this['itemPadding']()*0x2;_0x52e11b+=$gameSystem['windowPadding']()*0x2;let _0x2be1f4=Math[_0x12321(0x285)](_0x3dbb4e['height'],this[_0x12321(0x2ef)]());_0x2be1f4+=$gameSystem[_0x12321(0x137)]()*0x2;const _0x3a66c0=Math[_0x12321(0x337)]((Graphics['width']-_0x52e11b)/0x2),_0x33f6ce=Math[_0x12321(0x337)]((Graphics[_0x12321(0x486)]-_0x2be1f4)/0x2),_0x3ed1c7=new Rectangle(_0x3a66c0,_0x33f6ce,_0x52e11b,_0x2be1f4);this['move'](_0x3ed1c7['x'],_0x3ed1c7['y'],_0x3ed1c7[_0x12321(0x729)],_0x3ed1c7['height']),this['createContents'](),this[_0x12321(0x7c3)](),this[_0x12321(0x10e)](),SceneManager['_scene']['addChild'](this);},Window_TextPopup[_0x38072d(0x182)]['refresh']=function(){const _0x329137=_0x38072d,_0x4eb03e=this[_0x329137(0x7ca)]();this[_0x329137(0x6e1)][_0x329137(0x8bd)](),this[_0x329137(0x449)](this[_0x329137(0x11c)],_0x4eb03e['x'],_0x4eb03e['y'],_0x4eb03e[_0x329137(0x729)]);},Window_TextPopup['prototype']['updateDuration']=function(){const _0x492795=_0x38072d;if(this[_0x492795(0x4d3)]()||this[_0x492795(0x9ff)]())return;if(this['_timeDuration']<=0x0)return;this[_0x492795(0x603)]--,this[_0x492795(0x603)]<=0x0&&('nXXCZ'===_0x492795(0x4a2)?this['_forcedBattleSys']=_0x492795(0x27d):(this[_0x492795(0x78b)](),this[_0x492795(0x11c)]=''));},VisuMZ['ShowDevTools']=function(_0x5e3e38){const _0x19951a=_0x38072d;if(Utils[_0x19951a(0x5af)]('test')){if(_0x19951a(0x9f4)===_0x19951a(0x9f4)){var _0x30d3bd=require('nw.gui')[_0x19951a(0x4f0)]['get']();SceneManager['showDevTools']();if(_0x5e3e38)setTimeout(_0x30d3bd[_0x19951a(0x4f5)][_0x19951a(0x667)](_0x30d3bd),0x190);}else{const _0xc385c2=this[_0x19951a(0x9e9)](_0x7c9d18),_0x1f92bc=new(_0xc385c2?_0xe17115:_0x5b93db)(),_0x4ef18b=this[_0x19951a(0x192)](_0x2577e5);this['animationShouldMirror'](_0x5943dd[0x0])&&(_0x18bdc7=!_0x32d1c8);_0x1f92bc[_0x19951a(0x796)]=_0x4df3f4,_0x1f92bc[_0x19951a(0x554)](_0x4ef18b,_0xe1f9fe,_0xa6b69a,_0x11635e),_0x1f92bc[_0x19951a(0x99f)](_0x3301a0),this[_0x19951a(0x38d)](_0x1f92bc);if(this[_0x19951a(0x714)])this[_0x19951a(0x714)][_0x19951a(0x891)](_0x1f92bc);this['_fauxAnimationSprites'][_0x19951a(0x534)](_0x1f92bc);}}},VisuMZ['ApplyEasing']=function(_0x1f4778,_0x94d10f){const _0x356949=_0x38072d;_0x94d10f=_0x94d10f[_0x356949(0x994)]();var _0x21fe5b=1.70158,_0x487fb8=0.7;switch(_0x94d10f){case _0x356949(0x127):return _0x1f4778;case _0x356949(0x222):return-0x1*Math[_0x356949(0x4c5)](_0x1f4778*(Math['PI']/0x2))+0x1;case _0x356949(0x905):return Math['sin'](_0x1f4778*(Math['PI']/0x2));case _0x356949(0x72a):return-0.5*(Math['cos'](Math['PI']*_0x1f4778)-0x1);case _0x356949(0x885):return _0x1f4778*_0x1f4778;case _0x356949(0x326):return _0x1f4778*(0x2-_0x1f4778);case _0x356949(0x58d):return _0x1f4778<0.5?0x2*_0x1f4778*_0x1f4778:-0x1+(0x4-0x2*_0x1f4778)*_0x1f4778;case _0x356949(0x422):return _0x1f4778*_0x1f4778*_0x1f4778;case _0x356949(0x550):var _0x4907ca=_0x1f4778-0x1;return _0x4907ca*_0x4907ca*_0x4907ca+0x1;case'INOUTCUBIC':return _0x1f4778<0.5?0x4*_0x1f4778*_0x1f4778*_0x1f4778:(_0x1f4778-0x1)*(0x2*_0x1f4778-0x2)*(0x2*_0x1f4778-0x2)+0x1;case _0x356949(0x38b):return _0x1f4778*_0x1f4778*_0x1f4778*_0x1f4778;case _0x356949(0x9c3):var _0x4907ca=_0x1f4778-0x1;return 0x1-_0x4907ca*_0x4907ca*_0x4907ca*_0x4907ca;case _0x356949(0x757):var _0x4907ca=_0x1f4778-0x1;return _0x1f4778<0.5?0x8*_0x1f4778*_0x1f4778*_0x1f4778*_0x1f4778:0x1-0x8*_0x4907ca*_0x4907ca*_0x4907ca*_0x4907ca;case _0x356949(0x532):return _0x1f4778*_0x1f4778*_0x1f4778*_0x1f4778*_0x1f4778;case _0x356949(0x530):var _0x4907ca=_0x1f4778-0x1;return 0x1+_0x4907ca*_0x4907ca*_0x4907ca*_0x4907ca*_0x4907ca;case _0x356949(0x778):var _0x4907ca=_0x1f4778-0x1;return _0x1f4778<0.5?0x10*_0x1f4778*_0x1f4778*_0x1f4778*_0x1f4778*_0x1f4778:0x1+0x10*_0x4907ca*_0x4907ca*_0x4907ca*_0x4907ca*_0x4907ca;case _0x356949(0x16f):if(_0x1f4778===0x0){if('zfGol'!==_0x356949(0x5b3))return 0x0;else this[_0x356949(0x215)]()[_0x356949(0x8ab)]=!![],this[_0x356949(0x215)]()[_0x356949(0x5a6)]=_0x5184f9['DisplayLockX'];}return Math[_0x356949(0x321)](0x2,0xa*(_0x1f4778-0x1));case _0x356949(0x92d):if(_0x1f4778===0x1){if(_0x356949(0x263)===_0x356949(0x26c)){var _0x6fb5a8=_0xb73ca8(_0x1e91d3['$1']);_0x1f7563*=_0x6fb5a8;}else return 0x1;}return-Math[_0x356949(0x321)](0x2,-0xa*_0x1f4778)+0x1;case'INOUTEXPO':if(_0x1f4778===0x0||_0x1f4778===0x1)return _0x1f4778;var _0xa1f4af=_0x1f4778*0x2,_0x37bf38=_0xa1f4af-0x1;if(_0xa1f4af<0x1)return 0.5*Math[_0x356949(0x321)](0x2,0xa*_0x37bf38);return 0.5*(-Math[_0x356949(0x321)](0x2,-0xa*_0x37bf38)+0x2);case'INCIRC':var _0xa1f4af=_0x1f4778/0x1;return-0x1*(Math[_0x356949(0x97e)](0x1-_0xa1f4af*_0x1f4778)-0x1);case _0x356949(0x835):var _0x4907ca=_0x1f4778-0x1;return Math[_0x356949(0x97e)](0x1-_0x4907ca*_0x4907ca);case _0x356949(0x897):var _0xa1f4af=_0x1f4778*0x2,_0x37bf38=_0xa1f4af-0x2;if(_0xa1f4af<0x1)return-0.5*(Math[_0x356949(0x97e)](0x1-_0xa1f4af*_0xa1f4af)-0x1);return 0.5*(Math[_0x356949(0x97e)](0x1-_0x37bf38*_0x37bf38)+0x1);case _0x356949(0x57e):return _0x1f4778*_0x1f4778*((_0x21fe5b+0x1)*_0x1f4778-_0x21fe5b);case _0x356949(0x8c2):var _0xa1f4af=_0x1f4778/0x1-0x1;return _0xa1f4af*_0xa1f4af*((_0x21fe5b+0x1)*_0xa1f4af+_0x21fe5b)+0x1;break;case'INOUTBACK':var _0xa1f4af=_0x1f4778*0x2,_0x5d0191=_0xa1f4af-0x2,_0x5040e9=_0x21fe5b*1.525;if(_0xa1f4af<0x1)return 0.5*_0xa1f4af*_0xa1f4af*((_0x5040e9+0x1)*_0xa1f4af-_0x5040e9);return 0.5*(_0x5d0191*_0x5d0191*((_0x5040e9+0x1)*_0x5d0191+_0x5040e9)+0x2);case'INELASTIC':if(_0x1f4778===0x0||_0x1f4778===0x1)return _0x1f4778;var _0xa1f4af=_0x1f4778/0x1,_0x37bf38=_0xa1f4af-0x1,_0xff4745=0x1-_0x487fb8,_0x5040e9=_0xff4745/(0x2*Math['PI'])*Math[_0x356949(0x508)](0x1);return-(Math[_0x356949(0x321)](0x2,0xa*_0x37bf38)*Math[_0x356949(0x463)]((_0x37bf38-_0x5040e9)*(0x2*Math['PI'])/_0xff4745));case'OUTELASTIC':var _0xff4745=0x1-_0x487fb8,_0xa1f4af=_0x1f4778*0x2;if(_0x1f4778===0x0||_0x1f4778===0x1)return _0x1f4778;var _0x5040e9=_0xff4745/(0x2*Math['PI'])*Math[_0x356949(0x508)](0x1);return Math[_0x356949(0x321)](0x2,-0xa*_0xa1f4af)*Math[_0x356949(0x463)]((_0xa1f4af-_0x5040e9)*(0x2*Math['PI'])/_0xff4745)+0x1;case'INOUTELASTIC':var _0xff4745=0x1-_0x487fb8;if(_0x1f4778===0x0||_0x1f4778===0x1)return _0x1f4778;var _0xa1f4af=_0x1f4778*0x2,_0x37bf38=_0xa1f4af-0x1,_0x5040e9=_0xff4745/(0x2*Math['PI'])*Math[_0x356949(0x508)](0x1);if(_0xa1f4af<0x1){if(_0x356949(0x485)!==_0x356949(0x485))this[_0x356949(0x513)]&&this[_0x356949(0x513)]['setBackgroundType'](_0x52ace2[_0x356949(0x54f)][_0x356949(0x349)]),this[_0x356949(0x5bc)]&&this['_inputWindow'][_0x356949(0x6ad)](_0x5e5457[_0x356949(0x54f)][_0x356949(0x639)]);else return-0.5*(Math[_0x356949(0x321)](0x2,0xa*_0x37bf38)*Math['sin']((_0x37bf38-_0x5040e9)*(0x2*Math['PI'])/_0xff4745));}return Math['pow'](0x2,-0xa*_0x37bf38)*Math[_0x356949(0x463)]((_0x37bf38-_0x5040e9)*(0x2*Math['PI'])/_0xff4745)*0.5+0x1;case _0x356949(0x598):var _0xa1f4af=_0x1f4778/0x1;if(_0xa1f4af<0x1/2.75)return 7.5625*_0xa1f4af*_0xa1f4af;else{if(_0xa1f4af<0x2/2.75){if(_0x356949(0x8a1)!=='FWYma')_0x217901['CoreEngine'][_0x356949(0x68e)][_0x356949(0x967)](this),this[_0x356949(0x221)]();else{var _0x5d0191=_0xa1f4af-1.5/2.75;return 7.5625*_0x5d0191*_0x5d0191+0.75;}}else{if(_0xa1f4af<2.5/2.75){if(_0x356949(0x489)===_0x356949(0x95e)){if(this[_0x356949(0x1ec)]()&&this[_0x356949(0x5bc)][_0x356949(0x662)]===_0x356949(0x645))return _0x518ea0[_0x356949(0x5fe)](['BKSP']);return _0xc461ed['prototype']['buttonAssistKey5'][_0x356949(0x967)](this);}else{var _0x5d0191=_0xa1f4af-2.25/2.75;return 7.5625*_0x5d0191*_0x5d0191+0.9375;}}else{if(_0x356949(0x8fb)==='fGqqE')_0x29f6f1=_0x303f47[_0x356949(0x15b)]-_0x2fc8e8;else{var _0x5d0191=_0xa1f4af-2.625/2.75;return 7.5625*_0x5d0191*_0x5d0191+0.984375;}}}}case'INBOUNCE':var _0x346969=0x1-VisuMZ['ApplyEasing'](0x1-_0x1f4778,_0x356949(0x13e));return _0x346969;case _0x356949(0x807):if(_0x1f4778<0.5){if('iDmns'!==_0x356949(0x266))var _0x346969=VisuMZ[_0x356949(0x9d6)](_0x1f4778*0x2,_0x356949(0x2d9))*0.5;else this[_0x356949(0x67d)]();}else var _0x346969=VisuMZ['ApplyEasing'](_0x1f4778*0x2-0x1,_0x356949(0x13e))*0.5+0.5;return _0x346969;default:return _0x1f4778;}},VisuMZ['GetParamIcon']=function(_0x50e1c6){const _0x42abab=_0x38072d;_0x50e1c6=String(_0x50e1c6)[_0x42abab(0x994)]();const _0x4198a1=VisuMZ[_0x42abab(0x45d)][_0x42abab(0x75d)]['Param'];if(_0x50e1c6===_0x42abab(0x84a))return _0x4198a1[_0x42abab(0x596)];if(_0x50e1c6===_0x42abab(0x847))return _0x4198a1[_0x42abab(0x986)];if(_0x50e1c6===_0x42abab(0x7d8))return _0x4198a1[_0x42abab(0x1b0)];if(_0x50e1c6===_0x42abab(0x3a3))return _0x4198a1[_0x42abab(0x740)];if(_0x50e1c6===_0x42abab(0x252))return _0x4198a1['IconParam4'];if(_0x50e1c6===_0x42abab(0x623))return _0x4198a1[_0x42abab(0x5e0)];if(_0x50e1c6==='AGI')return _0x4198a1[_0x42abab(0x9ad)];if(_0x50e1c6===_0x42abab(0x307))return _0x4198a1['IconParam7'];if(_0x50e1c6===_0x42abab(0x1ab))return _0x4198a1[_0x42abab(0x888)];if(_0x50e1c6===_0x42abab(0x44f))return _0x4198a1['IconXParam1'];if(_0x50e1c6===_0x42abab(0x76c))return _0x4198a1[_0x42abab(0x7d4)];if(_0x50e1c6==='CEV')return _0x4198a1[_0x42abab(0x71c)];if(_0x50e1c6==='MEV')return _0x4198a1['IconXParam4'];if(_0x50e1c6===_0x42abab(0x174))return _0x4198a1[_0x42abab(0x753)];if(_0x50e1c6===_0x42abab(0x72c))return _0x4198a1[_0x42abab(0x85a)];if(_0x50e1c6===_0x42abab(0x5b7))return _0x4198a1[_0x42abab(0x451)];if(_0x50e1c6===_0x42abab(0x52f))return _0x4198a1['IconXParam8'];if(_0x50e1c6===_0x42abab(0x4cd))return _0x4198a1['IconXParam9'];if(_0x50e1c6===_0x42abab(0x4d0))return _0x4198a1[_0x42abab(0x940)];if(_0x50e1c6===_0x42abab(0x5ed))return _0x4198a1[_0x42abab(0x653)];if(_0x50e1c6===_0x42abab(0x2f5))return _0x4198a1[_0x42abab(0x26e)];if(_0x50e1c6===_0x42abab(0x64c))return _0x4198a1[_0x42abab(0x8f2)];if(_0x50e1c6===_0x42abab(0x20c))return _0x4198a1[_0x42abab(0x5ab)];if(_0x50e1c6===_0x42abab(0x8bf))return _0x4198a1[_0x42abab(0x9f9)];if(_0x50e1c6===_0x42abab(0x1e5))return _0x4198a1[_0x42abab(0x7c7)];if(_0x50e1c6===_0x42abab(0x25f))return _0x4198a1[_0x42abab(0x4cb)];if(_0x50e1c6===_0x42abab(0x436))return _0x4198a1['IconSParam8'];if(_0x50e1c6==='EXR')return _0x4198a1[_0x42abab(0x30e)];if(VisuMZ[_0x42abab(0x45d)]['CustomParamIcons'][_0x50e1c6]){if(_0x42abab(0x51a)===_0x42abab(0x9f5))_0x53200f[_0x42abab(0x45d)][_0x42abab(0x5cd)]['call'](this,_0x4b5bc2),(this['isGamepadButtonPressed'](_0x50b549)||this[_0x42abab(0x241)](_0x5dacd5))&&this['setLastGamepadUsed'](_0x4a6b20);else return VisuMZ[_0x42abab(0x45d)][_0x42abab(0x579)][_0x50e1c6]||0x0;}return 0x0;},VisuMZ[_0x38072d(0x377)]=function(_0x427cf6,_0x390ed2,_0x31131c){const _0x26b6ad=_0x38072d;if(_0x31131c===undefined&&_0x427cf6%0x1===0x0)return _0x427cf6;if(_0x31131c!==undefined&&[_0x26b6ad(0x84a),_0x26b6ad(0x847),_0x26b6ad(0x7d8),_0x26b6ad(0x3a3),'MAT','MDF',_0x26b6ad(0x670),_0x26b6ad(0x307)][_0x26b6ad(0x2ac)](String(_0x31131c)[_0x26b6ad(0x994)]()['trim']()))return _0x427cf6;_0x390ed2=_0x390ed2||0x0;if(VisuMZ[_0x26b6ad(0x45d)]['CustomParamAbb'][_0x31131c]){if(_0x26b6ad(0x933)==='zPIuz'){const _0x58ee64=_0x83d657?this[_0x26b6ad(0x57b)]:this[_0x26b6ad(0x2c1)];if(!_0x58ee64)return;const _0x14bea6=_0x33deb6[_0x26b6ad(0x5c6)],_0x4f6a81=_0x14bea6[_0x26b6ad(0x93c)],_0x45ca89=_0x35c877?this[_0x26b6ad(0x658)]-_0x4f6a81*0x2:_0x4f6a81,_0x595a28=_0x39334e?_0x4f6a81:this[_0x26b6ad(0x448)]-_0x4f6a81*0x2;_0x58ee64[_0x26b6ad(0x208)]=new _0x5bfc62(_0x45ca89,_0x595a28),_0x58ee64[_0x26b6ad(0x4f7)](0x0,0x0,_0x45ca89,_0x595a28),this[_0x26b6ad(0x92c)](_0xc7ab76);}else{if(VisuMZ[_0x26b6ad(0x45d)]['CustomParamType'][_0x31131c]===_0x26b6ad(0x6a8)){if(_0x26b6ad(0x378)==='biIaU')return _0x427cf6;else{this['_displayX']=this[_0x26b6ad(0x215)]()[_0x26b6ad(0x5a6)];return;}}else return String((_0x427cf6*0x64)[_0x26b6ad(0x45b)](_0x390ed2))+'%';}}return String((_0x427cf6*0x64)['toFixed'](_0x390ed2))+'%';},VisuMZ['GroupDigits']=function(_0x1795b2){const _0x5da880=_0x38072d;_0x1795b2=String(_0x1795b2);if(!_0x1795b2)return _0x1795b2;if(typeof _0x1795b2!==_0x5da880(0x91e))return _0x1795b2;const _0x4e78ad=VisuMZ[_0x5da880(0x45d)][_0x5da880(0x75d)]['QoL'][_0x5da880(0x71e)]||_0x5da880(0x2af),_0x1beb5f={'maximumFractionDigits':0x6};_0x1795b2=_0x1795b2[_0x5da880(0x152)](/\[(.*?)\]/g,(_0x21e35d,_0x2b9434)=>{return VisuMZ['PreserveNumbers'](_0x2b9434,'[',']');}),_0x1795b2=_0x1795b2['replace'](/<(.*?)>/g,(_0x1e671d,_0x1fc39a)=>{const _0x42fb62=_0x5da880;if(_0x42fb62(0x40e)===_0x42fb62(0x3b3))this[_0x42fb62(0x38a)][_0x42fb62(0x6ad)](_0x4653c9[_0x42fb62(0x54f)][_0x42fb62(0x10f)]);else return VisuMZ['PreserveNumbers'](_0x1fc39a,'<','>');}),_0x1795b2=_0x1795b2[_0x5da880(0x152)](/\{\{(.*?)\}\}/g,(_0x479d6c,_0x54a521)=>{const _0x2e9950=_0x5da880;return VisuMZ[_0x2e9950(0x746)](_0x54a521,'','');}),_0x1795b2=_0x1795b2[_0x5da880(0x152)](/(\d+\.?\d*)/g,(_0x15fc7e,_0x54ffa2)=>{const _0xf4c19e=_0x5da880;if(_0xf4c19e(0x5d1)!==_0xf4c19e(0x3d0)){let _0x497503=_0x54ffa2;if(_0x497503[0x0]==='0')return _0x497503;if(_0x497503[_0x497503[_0xf4c19e(0x3ec)]-0x1]==='.'){if(_0xf4c19e(0x2b5)===_0xf4c19e(0x2b5))return Number(_0x497503)[_0xf4c19e(0x821)](_0x4e78ad,_0x1beb5f)+'.';else this[_0xf4c19e(0x19b)](_0x30d95b,_0xd52372,_0x2a8604,_0x172f60,_0x3e5872);}else{if(_0x497503[_0x497503['length']-0x1]===','){if(_0xf4c19e(0x362)!==_0xf4c19e(0x362))this[_0xf4c19e(0x160)]=new _0x502ccf(),this[_0xf4c19e(0x343)](this[_0xf4c19e(0x160)]);else return Number(_0x497503)[_0xf4c19e(0x821)](_0x4e78ad,_0x1beb5f)+',';}else return Number(_0x497503)['toLocaleString'](_0x4e78ad,_0x1beb5f);}}else _0x1b1c4d[_0xf4c19e(0x45d)]['Window_Base_update'][_0xf4c19e(0x967)](this),this[_0xf4c19e(0x6ef)]();});let _0x212fec=0x3;while(_0x212fec--){_0x1795b2=VisuMZ[_0x5da880(0x8a9)](_0x1795b2);}return _0x1795b2;},VisuMZ[_0x38072d(0x746)]=function(_0x21cc4c,_0x5eed9c,_0x49183c){const _0x39b272=_0x38072d;return _0x21cc4c=_0x21cc4c[_0x39b272(0x152)](/(\d)/gi,(_0x388f9a,_0x4651ae)=>_0x39b272(0x69a)[_0x39b272(0x941)](Number(_0x4651ae))),'%2%1%3'['format'](_0x21cc4c,_0x5eed9c,_0x49183c);},VisuMZ[_0x38072d(0x8a9)]=function(_0x387dbb){const _0x42c8bb=_0x38072d;return _0x387dbb=_0x387dbb[_0x42c8bb(0x152)](/PRESERVCONVERSION\((\d+)\)/gi,(_0x4d39fd,_0x24589e)=>Number(parseInt(_0x24589e))),_0x387dbb;},VisuMZ[_0x38072d(0x630)]=function(_0x4bb284){const _0x442465=_0x38072d;SoundManager[_0x442465(0x46b)]();if(!Utils[_0x442465(0x1d5)]()){const _0x1d0d0b=window[_0x442465(0x10e)](_0x4bb284,'_blank');}else{const _0x4b094a=process[_0x442465(0x617)]==_0x442465(0x328)?_0x442465(0x10e):process['platform']=='win32'?_0x442465(0x224):_0x442465(0x6c2);require(_0x442465(0x5c2))[_0x442465(0x289)](_0x4b094a+'\x20'+_0x4bb284);}},VisuMZ[_0x38072d(0x333)]=function(_0x1b0f51,_0xca9e3b){const _0x52a7d2=_0x38072d;if(!_0x1b0f51)return'';const _0x56ae23=_0x1b0f51['baseId']||_0x1b0f51['id'];let _0x43bbee='';_0x1b0f51[_0x52a7d2(0x9c1)]!==undefined&&_0x1b0f51[_0x52a7d2(0x618)]!==undefined&&(_0x43bbee='Actor-%1-%2'['format'](_0x56ae23,_0xca9e3b));_0x1b0f51[_0x52a7d2(0x970)]!==undefined&&_0x1b0f51[_0x52a7d2(0x872)]!==undefined&&(_0x43bbee=_0x52a7d2(0x63a)[_0x52a7d2(0x941)](_0x56ae23,_0xca9e3b));_0x1b0f51[_0x52a7d2(0x80b)]!==undefined&&_0x1b0f51[_0x52a7d2(0x609)]!==undefined&&(_0x43bbee=_0x52a7d2(0x412)[_0x52a7d2(0x941)](_0x56ae23,_0xca9e3b));_0x1b0f51[_0x52a7d2(0x2f9)]!==undefined&&_0x1b0f51[_0x52a7d2(0x5f8)]!==undefined&&(_0x43bbee=_0x52a7d2(0x177)['format'](_0x56ae23,_0xca9e3b));_0x1b0f51[_0x52a7d2(0x771)]!==undefined&&_0x1b0f51['etypeId']===0x1&&(_0x43bbee=_0x52a7d2(0x35d)[_0x52a7d2(0x941)](_0x56ae23,_0xca9e3b));_0x1b0f51[_0x52a7d2(0x6b4)]!==undefined&&_0x1b0f51['etypeId']>0x1&&(_0x43bbee=_0x52a7d2(0x1ce)[_0x52a7d2(0x941)](_0x56ae23,_0xca9e3b));_0x1b0f51['dropItems']!==undefined&&_0x1b0f51[_0x52a7d2(0x304)]!==undefined&&(_0x43bbee=_0x52a7d2(0x722)[_0x52a7d2(0x941)](_0x56ae23,_0xca9e3b));if(_0x1b0f51[_0x52a7d2(0x93f)]!==undefined&&_0x1b0f51['maxTurns']!==undefined){if(_0x52a7d2(0x643)!==_0x52a7d2(0x643)){this[_0x52a7d2(0x9a7)](),this[_0x52a7d2(0x6e1)][_0x52a7d2(0x8bd)](),this[_0x52a7d2(0x6e1)]['fontSize']=_0x1ac6db['CoreEngine']['Settings'][_0x52a7d2(0x373)][_0x52a7d2(0x631)];const _0x470032=_0xe4b14b[_0x52a7d2(0x45d)][_0x52a7d2(0x75d)]['Gold'][_0x52a7d2(0x88d)],_0x1c3526=this['itemLineRect'](0x0);if(_0x470032>0x0){const _0x14349c=_0x1c3526['y']+(this[_0x52a7d2(0x2ef)]()-_0x12c595[_0x52a7d2(0x593)])/0x2;this[_0x52a7d2(0x179)](_0x470032,_0x1c3526['x'],_0x14349c);const _0x3e344f=_0xd896d9[_0x52a7d2(0x202)]+0x4;_0x1c3526['x']+=_0x3e344f,_0x1c3526[_0x52a7d2(0x729)]-=_0x3e344f;}this['changeTextColor'](_0x980ee4['systemColor']()),this[_0x52a7d2(0x6a0)](this['currencyUnit'](),_0x1c3526['x'],_0x1c3526['y'],_0x1c3526[_0x52a7d2(0x729)],_0x52a7d2(0x105));const _0x62e03a=this[_0x52a7d2(0x5d6)](this[_0x52a7d2(0x275)]())+0x6;;_0x1c3526['x']+=_0x62e03a,_0x1c3526['width']-=_0x62e03a,this['resetTextColor']();const _0xa78c25=this[_0x52a7d2(0x3eb)](),_0x2e36fc=this[_0x52a7d2(0x5d6)](this[_0x52a7d2(0x74b)]?_0x2e21fd[_0x52a7d2(0x9ae)](this[_0x52a7d2(0x3eb)]()):this['value']());_0x2e36fc>_0x1c3526[_0x52a7d2(0x729)]?this[_0x52a7d2(0x6a0)](_0x5d39f1[_0x52a7d2(0x45d)]['Settings'][_0x52a7d2(0x373)][_0x52a7d2(0x1b2)],_0x1c3526['x'],_0x1c3526['y'],_0x1c3526[_0x52a7d2(0x729)],_0x52a7d2(0x16d)):this[_0x52a7d2(0x6a0)](this['value'](),_0x1c3526['x'],_0x1c3526['y'],_0x1c3526[_0x52a7d2(0x729)],_0x52a7d2(0x16d)),this[_0x52a7d2(0x9a7)]();}else _0x43bbee='State-%1-%2'[_0x52a7d2(0x941)](_0x56ae23,_0xca9e3b);}return _0x43bbee;},Game_Picture[_0x38072d(0x182)][_0x38072d(0x731)]=function(){return this['_anchor'];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x3d4)]=Game_Picture[_0x38072d(0x182)][_0x38072d(0x3c7)],Game_Picture['prototype'][_0x38072d(0x3c7)]=function(){const _0x3f62e9=_0x38072d;VisuMZ[_0x3f62e9(0x45d)][_0x3f62e9(0x3d4)]['call'](this),this[_0x3f62e9(0x644)]={'x':0x0,'y':0x0},this[_0x3f62e9(0x8b4)]={'x':0x0,'y':0x0};},VisuMZ['CoreEngine'][_0x38072d(0xf3)]=Game_Picture['prototype'][_0x38072d(0x473)],Game_Picture['prototype'][_0x38072d(0x473)]=function(){const _0x34ffd8=_0x38072d;this[_0x34ffd8(0x301)]();const _0x17d635=this[_0x34ffd8(0x371)];VisuMZ[_0x34ffd8(0x45d)][_0x34ffd8(0xf3)][_0x34ffd8(0x967)](this);if(_0x17d635>0x0&&this[_0x34ffd8(0x371)]<=0x0){if('ZPoiD'!=='qAvpi')this['_x']=this[_0x34ffd8(0x18e)],this['_y']=this[_0x34ffd8(0x693)],this['_scaleX']=this['_targetScaleX'],this[_0x34ffd8(0x298)]=this[_0x34ffd8(0x602)],this[_0x34ffd8(0x2da)]=this[_0x34ffd8(0x556)],this[_0x34ffd8(0x644)]&&(this[_0x34ffd8(0x644)]['x']=this[_0x34ffd8(0x8b4)]['x'],this['_anchor']['y']=this[_0x34ffd8(0x8b4)]['y']);else{if(!this[_0x34ffd8(0x2c3)])return _0x356887;const _0x2b75f7=this['_coreEasing'][_0x34ffd8(0x622)],_0xffd424=this[_0x34ffd8(0x2c3)]['wholeDuration'],_0x25ba0d=this[_0x34ffd8(0x6f8)]((_0xffd424-_0x2b75f7)/_0xffd424),_0x55b7b9=this['calcCoreEasing']((_0xffd424-_0x2b75f7+0x1)/_0xffd424),_0x4443d9=(_0x5675b5-_0x156617*_0x25ba0d)/(0x1-_0x25ba0d);return _0x4443d9+(_0x57c266-_0x4443d9)*_0x55b7b9;}}},VisuMZ['CoreEngine']['Game_Picture_show']=Game_Picture['prototype'][_0x38072d(0x7d0)],Game_Picture[_0x38072d(0x182)][_0x38072d(0x7d0)]=function(_0x4fe53a,_0x5121db,_0x52b064,_0x92c4c0,_0x5b0b15,_0x275d10,_0x2746c7,_0x4c8b35){const _0x1269ad=_0x38072d;VisuMZ[_0x1269ad(0x45d)]['Game_Picture_show'][_0x1269ad(0x967)](this,_0x4fe53a,_0x5121db,_0x52b064,_0x92c4c0,_0x5b0b15,_0x275d10,_0x2746c7,_0x4c8b35),this['setAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x5121db]||{'x':0x0,'y':0x0});},VisuMZ[_0x38072d(0x45d)]['Game_Picture_move']=Game_Picture[_0x38072d(0x182)][_0x38072d(0x474)],Game_Picture['prototype'][_0x38072d(0x474)]=function(_0x512932,_0x215068,_0x42ae66,_0x4ad749,_0x2c7b83,_0x2172ba,_0x5be069,_0xb92af5,_0x3079a0){const _0x591b27=_0x38072d;VisuMZ[_0x591b27(0x45d)]['Game_Picture_move'][_0x591b27(0x967)](this,_0x512932,_0x215068,_0x42ae66,_0x4ad749,_0x2c7b83,_0x2172ba,_0x5be069,_0xb92af5,_0x3079a0),this[_0x591b27(0x437)]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x512932]||{'x':0x0,'y':0x0});},Game_Picture['prototype'][_0x38072d(0x301)]=function(){const _0x215319=_0x38072d;this['_duration']>0x0&&(_0x215319(0x570)!==_0x215319(0x6f1)?(this[_0x215319(0x644)]['x']=this[_0x215319(0x78e)](this[_0x215319(0x644)]['x'],this[_0x215319(0x8b4)]['x']),this['_anchor']['y']=this[_0x215319(0x78e)](this[_0x215319(0x644)]['y'],this[_0x215319(0x8b4)]['y'])):this[_0x215319(0x9ca)](this[_0x215319(0x4ed)]()-0x1));},Game_Picture[_0x38072d(0x182)]['setAnchor']=function(_0x4f9374){const _0xaeeada=_0x38072d;this[_0xaeeada(0x644)]=_0x4f9374,this[_0xaeeada(0x8b4)]=JsonEx[_0xaeeada(0x6d6)](this['_anchor']);},Game_Picture[_0x38072d(0x182)][_0x38072d(0x437)]=function(_0x51e187){const _0x4c77b9=_0x38072d;this[_0x4c77b9(0x8b4)]=_0x51e187;},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x6ff)]=Sprite_Picture[_0x38072d(0x182)][_0x38072d(0x9c6)],Sprite_Picture[_0x38072d(0x182)]['updateOrigin']=function(){const _0x3e292f=_0x38072d,_0x8cac=this['picture']();if(!_0x8cac[_0x3e292f(0x731)]())_0x3e292f(0x717)===_0x3e292f(0x5c7)?_0x4c66e0[_0x3e292f(0x1b8)](_0x45954f):VisuMZ[_0x3e292f(0x45d)][_0x3e292f(0x6ff)]['call'](this);else{if(_0x3e292f(0x522)===_0x3e292f(0x404)){if(_0x43d529)_0x1e845d[_0x3e292f(0x867)](_0x581e77);}else this[_0x3e292f(0x731)]['x']=_0x8cac[_0x3e292f(0x731)]()['x'],this['anchor']['y']=_0x8cac['anchor']()['y'];}},Game_Action[_0x38072d(0x182)][_0x38072d(0x61f)]=function(_0x3be884){const _0x39807f=_0x38072d;if(_0x3be884){const _0x57851c=_0x3be884[_0x39807f(0x462)];if(_0x57851c===0x1&&this[_0x39807f(0x1df)]()[_0x39807f(0x5f2)]()!==0x1)this['setAttack']();else{if(_0x57851c===0x2&&this[_0x39807f(0x1df)]()[_0x39807f(0x180)]()!==0x2)this[_0x39807f(0x8a8)]();else{if(_0x39807f(0x4f8)!==_0x39807f(0x4f8)){if(this[_0x39807f(0x662)]===_0x39807f(0x645)){this['contents'][_0x39807f(0x8bd)](),this['contentsBack']['clear'](),this[_0x39807f(0x9b2)]();let _0x548a60=_0x245022[_0x39807f(0x45d)][_0x39807f(0x75d)]['KeyboardInput'][_0x39807f(0x95f)]['split']('\x0a'),_0x4051d3=_0x548a60['length'],_0x191442=(this[_0x39807f(0x448)]-_0x4051d3*this[_0x39807f(0x2ef)]())/0x2;for(let _0x2638b2=0x0;_0x2638b2<_0x4051d3;++_0x2638b2){let _0x3b3436=_0x548a60[_0x2638b2],_0xd2fd03=this[_0x39807f(0x228)](_0x3b3436)['width'],_0x144879=_0x11f398[_0x39807f(0x167)]((this['contents'][_0x39807f(0x729)]-_0xd2fd03)/0x2);this[_0x39807f(0x449)](_0x3b3436,_0x144879,_0x191442),_0x191442+=this[_0x39807f(0x2ef)]();}}else _0x426fcb[_0x39807f(0x45d)]['Window_NameInput_refresh'][_0x39807f(0x967)](this);}else this['setSkill'](_0x57851c);}}}else this['clear']();},Game_Actor[_0x38072d(0x182)][_0x38072d(0x5a3)]=function(){const _0x165a1d=_0x38072d;return this['skills']()['filter'](_0x555e69=>this[_0x165a1d(0x2cb)](_0x555e69)&&this[_0x165a1d(0x542)]()[_0x165a1d(0x2ac)](_0x555e69['stypeId']));},Window_Base[_0x38072d(0x182)][_0x38072d(0x323)]=function(){const _0x4cd493=_0x38072d;this[_0x4cd493(0x652)]=new Sprite(),this['_dimmerSprite'][_0x4cd493(0x208)]=new Bitmap(0x0,0x0),this[_0x4cd493(0x652)]['x']=0x0,this['addChildToBack'](this[_0x4cd493(0x652)]);},Window_Base[_0x38072d(0x182)][_0x38072d(0x8d6)]=function(){const _0x13522f=_0x38072d;if(this[_0x13522f(0x652)]){const _0x495d13=this['_dimmerSprite'][_0x13522f(0x208)],_0x4cbc38=this[_0x13522f(0x729)],_0x2732c9=this[_0x13522f(0x486)],_0x27ed12=this['padding'],_0x214d5c=ColorManager[_0x13522f(0x80c)](),_0x25f53b=ColorManager['dimColor2']();_0x495d13['resize'](_0x4cbc38,_0x2732c9),_0x495d13[_0x13522f(0x37a)](0x0,0x0,_0x4cbc38,_0x27ed12,_0x25f53b,_0x214d5c,!![]),_0x495d13['fillRect'](0x0,_0x27ed12,_0x4cbc38,_0x2732c9-_0x27ed12*0x2,_0x214d5c),_0x495d13[_0x13522f(0x37a)](0x0,_0x2732c9-_0x27ed12,_0x4cbc38,_0x27ed12,_0x214d5c,_0x25f53b,!![]),this['_dimmerSprite'][_0x13522f(0x4f7)](0x0,0x0,_0x4cbc38,_0x2732c9);}},Game_Actor['prototype'][_0x38072d(0x94d)]=function(){const _0x2b9105=_0x38072d;for(let _0x5afa17=0x0;_0x5afa17<this['numActions']();_0x5afa17++){const _0x3bbc4a=this[_0x2b9105(0x858)]();let _0x4ca065=Number[_0x2b9105(0x1d8)];this[_0x2b9105(0x684)](_0x5afa17,_0x3bbc4a[0x0]);for(const _0x41ac2f of _0x3bbc4a){const _0x1c2006=_0x41ac2f[_0x2b9105(0x71f)]();_0x1c2006>_0x4ca065&&(_0x4ca065=_0x1c2006,this[_0x2b9105(0x684)](_0x5afa17,_0x41ac2f));}}this[_0x2b9105(0x1b5)]('waiting');},Window_BattleItem[_0x38072d(0x182)]['isEnabled']=function(_0x2f5ebb){const _0x369808=_0x38072d;if(BattleManager[_0x369808(0x4ef)]()){if(_0x369808(0x4a7)!==_0x369808(0x6fd))return BattleManager['actor']()['canUse'](_0x2f5ebb);else this[_0x369808(0x515)][_0x369808(0x343)](_0x536d24);}else{if('aosmI'===_0x369808(0x19a))return Window_ItemList[_0x369808(0x182)][_0x369808(0x8ca)][_0x369808(0x967)](this,_0x2f5ebb);else this[_0x369808(0x58c)]+=_0x340c1d[_0x369808(0x337)]((_0x326d34[_0x369808(0x486)]-0x270)/0x2),this[_0x369808(0x58c)]-=_0x6e6f71[_0x369808(0x167)]((_0x1716c1['height']-_0x22aa0f[_0x369808(0x15b)])/0x2),_0x39b925[_0x369808(0x79a)]()?this[_0x369808(0x9f8)]-=_0x196f7b[_0x369808(0x167)]((_0x38f9e9[_0x369808(0x729)]-_0x1c536c[_0x369808(0x5d0)])/0x2):this[_0x369808(0x9f8)]+=_0x57b9b3[_0x369808(0x337)]((_0x31db99[_0x369808(0x5d0)]-0x330)/0x2);}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x3b4)]=Scene_Map[_0x38072d(0x182)][_0x38072d(0x126)],Scene_Map[_0x38072d(0x182)][_0x38072d(0x126)]=function(){const _0x4ce26b=_0x38072d;VisuMZ[_0x4ce26b(0x45d)][_0x4ce26b(0x3b4)][_0x4ce26b(0x967)](this);const _0x3dbe6d=this[_0x4ce26b(0x6ba)]['_timerSprite'];if(_0x3dbe6d)this[_0x4ce26b(0x343)](_0x3dbe6d);},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x519)]=Scene_Battle[_0x38072d(0x182)][_0x38072d(0x126)],Scene_Battle[_0x38072d(0x182)][_0x38072d(0x126)]=function(){const _0xa9c122=_0x38072d;VisuMZ[_0xa9c122(0x45d)][_0xa9c122(0x519)][_0xa9c122(0x967)](this);const _0x40cc59=this['_spriteset']['_timerSprite'];if(_0x40cc59)this[_0xa9c122(0x343)](_0x40cc59);},Sprite_Actor['prototype'][_0x38072d(0x444)]=function(){const _0x311153=_0x38072d;Sprite_Battler['prototype'][_0x311153(0x444)][_0x311153(0x967)](this),this[_0x311153(0x381)]();if(this[_0x311153(0x370)])_0x311153(0x906)===_0x311153(0x906)?this[_0x311153(0x8aa)]():_0x5f3c74[_0x311153(0x267)]()&&(_0x4ce955[_0x311153(0x220)](_0x311153(0x268)),_0x2be94['log'](_0x34120d));else{if(this['_battlerName']!==''){if('dfgSV'===_0x311153(0x211))this['_battlerName']='';else return _0x488c54[_0x311153(0x45d)][_0x311153(0x75d)]['Color'][_0x311153(0x798)];}}},Window[_0x38072d(0x182)][_0x38072d(0x72b)]=function(){const _0x2c8a7d=_0x38072d,_0x588018=this['_width'],_0x1608c8=this['_height'],_0x2fe406=0x18,_0x3c4886=_0x2fe406/0x2,_0x364d87=0x60+_0x2fe406,_0x4ccca0=0x0+_0x2fe406;this[_0x2c8a7d(0x8be)]['bitmap']=this['_windowskin'],this[_0x2c8a7d(0x8be)][_0x2c8a7d(0x731)]['x']=0.5,this[_0x2c8a7d(0x8be)][_0x2c8a7d(0x731)]['y']=0.5,this['_downArrowSprite'][_0x2c8a7d(0x4f7)](_0x364d87+_0x3c4886,_0x4ccca0+_0x3c4886+_0x2fe406,_0x2fe406,_0x3c4886),this['_downArrowSprite'][_0x2c8a7d(0x474)](Math['round'](_0x588018/0x2),Math[_0x2c8a7d(0x337)](_0x1608c8-_0x3c4886)),this['_upArrowSprite'][_0x2c8a7d(0x208)]=this['_windowskin'],this[_0x2c8a7d(0x1e8)][_0x2c8a7d(0x731)]['x']=0.5,this[_0x2c8a7d(0x1e8)][_0x2c8a7d(0x731)]['y']=0.5,this[_0x2c8a7d(0x1e8)][_0x2c8a7d(0x4f7)](_0x364d87+_0x3c4886,_0x4ccca0,_0x2fe406,_0x3c4886),this['_upArrowSprite'][_0x2c8a7d(0x474)](Math[_0x2c8a7d(0x337)](_0x588018/0x2),Math[_0x2c8a7d(0x337)](_0x3c4886));},Window['prototype']['_refreshPauseSign']=function(){const _0x9cf708=_0x38072d,_0x20a089=0x90,_0x326192=0x60,_0x4d0b83=0x18;this['_pauseSignSprite'][_0x9cf708(0x208)]=this[_0x9cf708(0x433)],this[_0x9cf708(0x10a)][_0x9cf708(0x731)]['x']=0.5,this[_0x9cf708(0x10a)][_0x9cf708(0x731)]['y']=0x1,this[_0x9cf708(0x10a)][_0x9cf708(0x474)](Math[_0x9cf708(0x337)](this[_0x9cf708(0x48a)]/0x2),this[_0x9cf708(0x3e8)]),this[_0x9cf708(0x10a)][_0x9cf708(0x4f7)](_0x20a089,_0x326192,_0x4d0b83,_0x4d0b83),this[_0x9cf708(0x10a)][_0x9cf708(0x4fd)]=0xff;},Window[_0x38072d(0x182)][_0x38072d(0x78c)]=function(){const _0x390cc2=_0x38072d,_0x92f355=this['_clientArea'][_0x390cc2(0x69e)][_0x390cc2(0x996)](new Point(0x0,0x0)),_0x4b4d30=this['_clientArea']['filterArea'];_0x4b4d30['x']=_0x92f355['x']+this['origin']['x'],_0x4b4d30['y']=_0x92f355['y']+this[_0x390cc2(0x62c)]['y'],_0x4b4d30[_0x390cc2(0x729)]=Math[_0x390cc2(0x421)](this[_0x390cc2(0x658)]*this[_0x390cc2(0x834)]['x']),_0x4b4d30['height']=Math['ceil'](this[_0x390cc2(0x448)]*this[_0x390cc2(0x834)]['y']);},Window[_0x38072d(0x182)][_0x38072d(0x7b4)]=function(){const _0x2f9426=_0x38072d,_0xdb0091=this[_0x2f9426(0x276)],_0x1bff9f=Math[_0x2f9426(0x285)](0x0,this[_0x2f9426(0x48a)]-_0xdb0091*0x2),_0x983c8a=Math[_0x2f9426(0x285)](0x0,this[_0x2f9426(0x3e8)]-_0xdb0091*0x2),_0x147a71=this[_0x2f9426(0x7a3)],_0x34b270=_0x147a71[_0x2f9426(0x4e3)][0x0];_0x147a71['bitmap']=this[_0x2f9426(0x433)],_0x147a71[_0x2f9426(0x4f7)](0x0,0x0,0x60,0x60),_0x147a71[_0x2f9426(0x474)](_0xdb0091,_0xdb0091),_0x147a71[_0x2f9426(0x834)]['x']=_0x1bff9f/0x60,_0x147a71[_0x2f9426(0x834)]['y']=_0x983c8a/0x60,_0x34b270[_0x2f9426(0x208)]=this['_windowskin'],_0x34b270[_0x2f9426(0x4f7)](0x0,0x60,0x60,0x60),_0x34b270[_0x2f9426(0x474)](0x0,0x0,_0x1bff9f,_0x983c8a),_0x34b270[_0x2f9426(0x834)]['x']=0x1/_0x147a71[_0x2f9426(0x834)]['x'],_0x34b270[_0x2f9426(0x834)]['y']=0x1/_0x147a71[_0x2f9426(0x834)]['y'],_0x147a71[_0x2f9426(0x537)](this[_0x2f9426(0x500)]);},Game_Temp[_0x38072d(0x182)][_0x38072d(0x6e2)]=function(){const _0x346468=_0x38072d;this[_0x346468(0x30d)]=[],this[_0x346468(0x4c6)]=[],this[_0x346468(0x154)]=[],this[_0x346468(0x9b7)]=[];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x4ca)]=Scene_Base[_0x38072d(0x182)][_0x38072d(0x9e4)],Scene_Base[_0x38072d(0x182)][_0x38072d(0x9e4)]=function(){const _0x55cace=_0x38072d;if($gameTemp)$gameTemp['sceneTerminationClearEffects']();VisuMZ[_0x55cace(0x45d)][_0x55cace(0x4ca)][_0x55cace(0x967)](this);},Bitmap[_0x38072d(0x182)][_0x38072d(0x4db)]=function(_0x350a14){const _0x166d83=_0x38072d,_0x1b5a1a=this[_0x166d83(0x229)];_0x1b5a1a['save'](),_0x1b5a1a[_0x166d83(0x9af)]=this[_0x166d83(0x7c5)]();const _0x115d19=_0x1b5a1a['measureText'](_0x350a14)[_0x166d83(0x729)];return _0x1b5a1a[_0x166d83(0x64e)](),_0x115d19;},Window_Message[_0x38072d(0x182)][_0x38072d(0x5d6)]=function(_0x5ecd52){const _0x589679=_0x38072d;if(this[_0x589679(0x503)]()){if(_0x589679(0x33b)===_0x589679(0x33b))return this[_0x589679(0x6e1)][_0x589679(0x4db)](_0x5ecd52);else{return _0x2226b3[_0x589679(0x182)][_0x589679(0x825)]['call'](this)+_0x5afa42[_0x589679(0x45d)][_0x589679(0x75d)][_0x589679(0x4f0)][_0x589679(0x5ca)];;}}else{if(_0x589679(0x1a2)!==_0x589679(0x1a2))this[_0x589679(0x415)]=_0x19f5eb['CoreEngine'][_0x589679(0x75d)][_0x589679(0x6a9)][_0x589679(0x5ee)]??0x4,this[_0x589679(0x762)](),this[_0x589679(0x415)]=this[_0x589679(0x415)][_0x589679(0x480)](0x1,0xa);else return Window_Base['prototype'][_0x589679(0x5d6)][_0x589679(0x967)](this,_0x5ecd52);}},Window_Message['prototype'][_0x38072d(0x503)]=function(){const _0x2634a4=_0x38072d;return VisuMZ[_0x2634a4(0x45d)]['Settings'][_0x2634a4(0x6a9)]['FontWidthFix']??!![];},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x61e)]=Game_Action[_0x38072d(0x182)][_0x38072d(0x248)],Game_Action[_0x38072d(0x182)][_0x38072d(0x248)]=function(){const _0x2103ce=_0x38072d;if(this[_0x2103ce(0x32f)]())return VisuMZ[_0x2103ce(0x45d)][_0x2103ce(0x61e)][_0x2103ce(0x967)](this);else{if(_0x2103ce(0x5f0)!=='zlRMK')return 0x0;else{let _0x533b8a='param'+_0xf5b12a+_0x2103ce(0x6ec);if(this[_0x2103ce(0x2b1)](_0x533b8a))return this[_0x2103ce(0x1ee)][_0x533b8a];return this[_0x2103ce(0x1ee)][_0x533b8a]=_0x38c030['round'](_0x4338b8[_0x2103ce(0x45d)][_0x2103ce(0x75d)][_0x2103ce(0x651)][_0x2103ce(0x36b)][_0x2103ce(0x967)](this,_0x275383)),this[_0x2103ce(0x1ee)][_0x533b8a];}}},VisuMZ[_0x38072d(0x45d)][_0x38072d(0x7f0)]=Game_Action['prototype'][_0x38072d(0x685)],Game_Action[_0x38072d(0x182)][_0x38072d(0x685)]=function(){const _0x17ce86=_0x38072d;this[_0x17ce86(0x1df)]()&&this[_0x17ce86(0x1df)]()['canAttack']()?VisuMZ[_0x17ce86(0x45d)][_0x17ce86(0x7f0)][_0x17ce86(0x967)](this):this[_0x17ce86(0x8bd)]();},Sprite_Name[_0x38072d(0x182)]['bitmapHeight']=function(){return 0x24;},Sprite_Name[_0x38072d(0x182)][_0x38072d(0x393)]=function(){const _0x21b901=_0x38072d,_0x4abbcf=this['name'](),_0x26096e=this[_0x21b901(0x499)](),_0x201851=this[_0x21b901(0x3c9)]();this[_0x21b901(0x65d)](),this[_0x21b901(0x208)][_0x21b901(0x8bd)](),this['bitmap'][_0x21b901(0x30c)](_0x4abbcf,0x4,0x0,_0x26096e-0xa,_0x201851,'left');},Bitmap['prototype'][_0x38072d(0x30c)]=function(_0x3d479a,_0x4d4770,_0x136265,_0x364757,_0x492fe2,_0x3da636){const _0x5863e8=_0x38072d,_0x30eadf=this['context'],_0x10004e=_0x30eadf[_0x5863e8(0x829)];_0x364757=_0x364757||0xffffffff;let _0x22f620=_0x4d4770,_0x5026e7=Math[_0x5863e8(0x337)](_0x136265+0x18/0x2+this[_0x5863e8(0x70e)]*0.35);_0x3da636==='center'&&(_0x22f620+=_0x364757/0x2),_0x3da636===_0x5863e8(0x16d)&&(_0x22f620+=_0x364757),_0x30eadf['save'](),_0x30eadf[_0x5863e8(0x9af)]=this[_0x5863e8(0x7c5)](),_0x30eadf[_0x5863e8(0x329)]=_0x3da636,_0x30eadf[_0x5863e8(0x47b)]=_0x5863e8(0x88e),_0x30eadf['globalAlpha']=0x1,this['_drawTextOutline'](_0x3d479a,_0x22f620,_0x5026e7,_0x364757),_0x30eadf['globalAlpha']=_0x10004e,this[_0x5863e8(0x74c)](_0x3d479a,_0x22f620,_0x5026e7,_0x364757),_0x30eadf['restore'](),this[_0x5863e8(0x296)]['update']();},VisuMZ['CoreEngine'][_0x38072d(0x8ef)]=BattleManager['checkSubstitute'],BattleManager['checkSubstitute']=function(_0x225215){const _0xb13b76=_0x38072d;if(this[_0xb13b76(0x60e)][_0xb13b76(0x83e)]())return![];return VisuMZ[_0xb13b76(0x45d)][_0xb13b76(0x8ef)]['call'](this,_0x225215);},BattleManager[_0x38072d(0x32a)]=function(){const _0x5ed63e=_0x38072d;if(this['_subject'])this[_0x5ed63e(0x6a2)]['endAction'](this[_0x5ed63e(0x71a)]);this[_0x5ed63e(0x132)]='turn',this[_0x5ed63e(0x71a)]&&this[_0x5ed63e(0x71a)][_0x5ed63e(0xa04)]()===0x0&&(this[_0x5ed63e(0x6be)](this[_0x5ed63e(0x71a)]),this[_0x5ed63e(0x71a)]=null);},Bitmap[_0x38072d(0x182)][_0x38072d(0x9b8)]=function(){const _0x72f93e=_0x38072d;this[_0x72f93e(0x672)]=new Image(),this[_0x72f93e(0x672)]['onload']=this[_0x72f93e(0x372)][_0x72f93e(0x667)](this),this['_image'][_0x72f93e(0x943)]=this[_0x72f93e(0x818)][_0x72f93e(0x667)](this),this['_destroyCanvas'](),this[_0x72f93e(0x809)]='loading',Utils['hasEncryptedImages']()?this[_0x72f93e(0x2b7)]():(this[_0x72f93e(0x672)]['src']=this[_0x72f93e(0x6d8)],![]&&this[_0x72f93e(0x672)][_0x72f93e(0x729)]>0x0&&(this[_0x72f93e(0x672)][_0x72f93e(0x9a9)]=null,this[_0x72f93e(0x372)]()));},Scene_Skill['prototype']['onActorChange']=function(){const _0xb12fc6=_0x38072d;Scene_MenuBase[_0xb12fc6(0x182)][_0xb12fc6(0x957)][_0xb12fc6(0x967)](this),this[_0xb12fc6(0x9a5)](),this['_itemWindow'][_0xb12fc6(0x586)](),this[_0xb12fc6(0x48d)][_0xb12fc6(0x9e0)](),this[_0xb12fc6(0x8d5)][_0xb12fc6(0x442)]();},Scene_Skill[_0x38072d(0x182)][_0x38072d(0x824)]=function(){const _0x2047c8=_0x38072d;return this['_skillTypeWindow']&&this[_0x2047c8(0x8d5)]['active'];},Game_Map[_0x38072d(0x182)][_0x38072d(0x22c)]=function(_0x76ad98,_0x55c8e8,_0x5c2ca3){const _0x32c63d=_0x38072d,_0x1b8364=this[_0x32c63d(0x7e5)](),_0x188474=this[_0x32c63d(0x1ba)](_0x76ad98,_0x55c8e8);for(const _0x5725b3 of _0x188474){if(_0x32c63d(0x11d)!==_0x32c63d(0x86e)){const _0x501e03=_0x1b8364[_0x5725b3];if(_0x501e03===undefined||_0x501e03===null){if($gameTemp[_0x32c63d(0x267)]()&&!DataManager[_0x32c63d(0x4c1)]()){let _0x140caa=_0x32c63d(0x23d)+'\x0a';_0x140caa+=_0x32c63d(0x6cb)+'\x0a',_0x140caa+='and\x20add\x20it\x20onto\x20this\x20one.',this[_0x32c63d(0x3c4)]()?_0x32c63d(0x7b6)!==_0x32c63d(0x7b6)?(_0x409d86[_0x32c63d(0x45d)][_0x32c63d(0x806)]['call'](this,_0xbcaaae,_0x16d794,_0x1896ff,_0x52d13c),this[_0x32c63d(0x1e6)]()):(alert(_0x140caa),SceneManager[_0x32c63d(0x4a1)]()):_0x32c63d(0x555)===_0x32c63d(0x919)?this[_0x32c63d(0x465)]('keyboard'):(console['log'](_0x140caa),!$gameTemp[_0x32c63d(0x24a)]&&($gameTemp[_0x32c63d(0x24a)]=!![],SceneManager[_0x32c63d(0x754)]()));}}if((_0x501e03&0x10)!==0x0)continue;if((_0x501e03&_0x5c2ca3)===0x0){if(_0x32c63d(0x8e1)!=='qWjlu')this[_0x32c63d(0x1d7)]()?this[_0x32c63d(0x89a)]():_0x414a5e[_0x32c63d(0x45d)][_0x32c63d(0x9d9)][_0x32c63d(0x967)](this);else return!![];}if((_0x501e03&_0x5c2ca3)===_0x5c2ca3){if('aNgmS'!=='OHMXQ')return![];else{let _0x4f41cf=0x0;return _0xa31789[_0x32c63d(0x870)]()?_0x4f41cf=this['helpAreaTopSideButtonLayout']():_0x4f41cf=_0x11933d['CoreEngine'][_0x32c63d(0x144)][_0x32c63d(0x967)](this),_0x4f41cf;}}}else for(const _0x296a83 of _0x1e8714){if(_0x296a83&&_0x296a83[_0x32c63d(0x6c6)]){if(this[_0x32c63d(0x504)](_0x296a83))return!![];if(this[_0x32c63d(0x241)](_0x296a83))return!![];}}}return![];},Game_Map['prototype'][_0x38072d(0x3c4)]=function(){const _0x3fbb7e=_0x38072d;if(Imported[_0x3fbb7e(0x7a9)])return!![];if(Imported['VisuMZ_4_UniqueTileEffects'])return!![];return![];},Sprite_Animation[_0x38072d(0x182)][_0x38072d(0x130)]=function(_0xb0a58a){const _0x4ba5ad=_0x38072d;!this[_0x4ba5ad(0x456)]&&(_0x4ba5ad(0x8d9)===_0x4ba5ad(0x7a8)?[0x6c,0x198][_0x4ba5ad(0x2ac)](_0x1f9ffe[_0x4ba5ad(0x8f4)])&&(_0xb0dfa+='\x0a',_0x5c6802+=_0x3dc378['parameters'][0x0]):this['_originalViewport']=_0xb0a58a['gl'][_0x4ba5ad(0x5cc)](_0xb0a58a['gl'][_0x4ba5ad(0x90d)]));};