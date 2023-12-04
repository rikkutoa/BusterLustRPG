//=============================================================================
// VisuStella MZ - Items & Equips Core
// VisuMZ_1_ItemsEquipsCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_ItemsEquipsCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ItemsEquipsCore = VisuMZ.ItemsEquipsCore || {};
VisuMZ.ItemsEquipsCore.version = 1.50;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.50] [ItemsEquipsCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Items_and_Equips_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Items & Equips Core makes improvements to the RPG Maker MZ item and
 * equipment dedicated scenes (including the shop) and how they're handled.
 * From more item categories, better parameter control, rulings, and more, game
 * devs are able to take control over key aspects of their game's items.
 *
 * Features include all (but not limited to) the following:
 *
 * * Modifying the appearances to the Item Scene, Equip Scene, and Shop Scene.
 * * Categorizing items in unique and multiple categories.
 * * Item Scene and Shop Scene will now display detailed information on items.
 * * NEW! marker can be displayed over recently acquired items in-game.
 * * Equipment notetags to adjust parameters past the editor limitations.
 * * Equipment Rulings to adjust what slot types can and can't be unequipped
 *   and/or optimized.
 * * Equipment Type Handling offers more control over equipment loadouts.
 * * Items sold in shops can be hidden/shown based on Switches.
 * * Items sold in shops can have varying prices adjusted by notetags.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * Equipment Type Handling
 *
 * - Characters will no longer have one universal equipment slot setting.
 * Classes can have different equipment type loadouts, made possible through
 * the usage of notetags. Also, equipment types of matching names would be
 * treated as the same type, where previously, they would be different types.
 * This means if you have two "Accessory" slots, be it in the form of notetags
 * or through the Database > Types tab, they can both equip the same type of
 * accessories.
 *
 * - The Change Equip event command is now updated to reflect this new change.
 * When processing an equip change, the slot changed will go to the first
 * empty slot of matching type. If all of the actor's matching slot types are
 * equipped, then the equip will replace the last slot available.
 *
 * ---
 *
 * Shop Status Window
 *
 * - The Status Window found in the Shop Scene was originally barren and did
 * not display much information at all. This is changed through this plugin's
 * new features. While the contents of the Shop Status Window can be customized
 * through the Plugin Parameters, it is a change that cannot be reversed and
 * for the better since it gives players the much needed information revolving
 * around the game's items.
 *
 * ---
 *
 * Core Engine Compatibility: Modern Controls
 *
 * - If the VisuStella Core Engine is added to your game with Modern Controls
 * enabled, then the Item Menu Scene, Equip Menu Scene, and Shop Menu Scene's
 * controls will be changed a bit.
 *
 * - The Item Menu Scene will automatically have the Item List Window active,
 * with using the Left/Right (for single column) or Page Up/Page Down (for
 * multi-columns) to navigate between the Item Categories. Similar will occur
 * when trying to sell items in the Shop Menu Scene.
 *
 * - The Equip Menu Scene will automatically have the Equip Slots Window active
 * and only activate the command window upon moving up to it.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 * 
 * ---
 * 
 * VisuMZ_1_BattleCore
 * 
 * Changing the "Damage Multiplier" or "Healing Multiplier" vocabulary for the
 * Item and Equip Core's Shop Status Window is not done with the Item and Equip
 * Core's Plugin Parameters if you have the Battle Core installed.
 * 
 * Instead, go to Battle Core's Plugin Parameters, Damage Settings, Damage
 * Styles, and adjust the style's version of the "Damage Multiplier" or
 * "Healing Multiplier" text instead.
 * 
 * Why does this work this way? Because not all damage styles work off
 * "Multipliers" so in order for it to convey the proper message to the player,
 * each damage style has its own vocabulary to be more accurate.
 * 
 * In case you forget about that, when you visit the Item and Equip Core's
 * plugin parameters for these, it should also remind you in the parameter's
 * description on where to change it.
 * 
 * ---
 *
 * VisuMZ_2_WeaponSwapSystem
 *
 * The custom equip slots feature from the VisuStella MZ Items and Equips Core
 * allowed you to add in extra weapon slots. This is now curated up to a max
 * of one weapon slot per character. This needs to be done to make the Weapon
 * Swap System viable.
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
 * ---
 *
 * === General ===
 * 
 * These notetags affect the Items, Weapons, and Armors on a general scale.
 *
 * ---
 *
 * <Max: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the maximum quantity that can be held for this item.
 * - Replace 'x' with a number value to determine the maximum amount.
 *
 * ---
 *
 * <Color: x>
 * <Color: #rrggbb>
 *
 * - Used for: Item, Weapon, Armor, Skill Notetags
 * - Determines the color of the object inside the in-game menus.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <Category: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace 'x' with a category name to mark this item as.
 *
 * ---
 *
 * <Categories>
 *  x
 *  x
 * </Categories>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Arranges items into certain/multiple categories to work with the Category
 *   Plugin Parameter setting: "Category:x".
 * - Replace each 'x' with a category name to mark this item as.
 *
 * ---
 * 
 * <Conserve: x%>
 * 
 * - Used for: Item
 * - Gives the item a percent chance when used to not consume the item.
 * - Replace 'x' with a number representing the percent chance to successfully
 *   conserve the item.
 * - If an item cannot be consumed, conserve chance will be 100% regardless.
 * 
 * ---
 *
 * === Item Accessibility Notetags ===
 *
 * The following notetags allow you to choose when items can/cannot be used
 * based on switches.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, item will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on switches.
 * - Replace 'x' with the switch ID to determine the item's enabled status.
 * - If 'All' notetag variant is used, item will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, item will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Item Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if an item can be accessible by code.
 *
 * ---
 *
 * <JS Item Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Item Enable>
 *
 * - Used for: Item Notetags
 * - Determines the enabled status of the item based on JavaScript code.
 * - If the actor this is disabled for is the only party member, it will not be
 *   visible in the item list unless the VisuStella Battle Core is installed.
 *   - If the VisuStella Battle Core is installed, then all battle scope items
 *     will be visible even if they're disabled.
 * - Replace 'code' to determine the type enabled status of the item.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   item will be enabled or not.
 * - The 'user' variable refers to the user with the item.
 * - The 'item' variable refers to the item being checked.
 * - All other item conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === Equipment Notetags ===
 *
 * The following notetags provide equipment-related effects from deciding what
 * equip slots can be given to classes to the base parameter changes asigned
 * to weapons and armors.
 *
 * ---
 *
 * <Equip Slots>
 *  slotName
 *  slotName
 *  slotName
 * </Equip Slots>
 *
 * - Used for: Class Notetags
 * - Changes the equipment slot loadout for any actor who is that class.
 * - Replace 'slotName' with an Equipment Type name from Database > Types.
 *   This is case-sensitive.
 * - Insert or remove as many "slotName" equipment types as needed.
 *
 * ---
 *
 * <param: +x>
 * <param: -x>
 *
 * - Used for: Weapon, Armor Notetags
 * - Changes the base parameter value for the equip item.
 * - Replace 'param' with any of the following: 'MaxHP', 'MaxMP', 'ATK', 'DEF',
 *   'MAT', 'MDF', 'AGI', or 'LUK' to change that specific parameter's value.
 *   - These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * - Replace 'x' with a number value to set the parameter value to.
 * - This allows you to bypass the Database Editor's number limitations.
 *
 * ---
 * 
 * <Equip Copy Limit: x>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Sets a maximum number of copies that the actor can wear of this equipment.
 * - Replace 'x' with a number value to determine the copy limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: Actors can only equip one copy of the "One-of-a-Kind Ring"
 *   on at any time despite having empty accessory slots because the ring has a
 *   <Equip Copy Limit: 1> notetag.
 * 
 * ---
 * 
 * <Equip Weapon Type Limit: x>
 * 
 * - Used for: Weapon
 * - This weapon cannot be equipped with other weapons of the same type once
 *   the limited amount has been reached.
 * - Replace 'x' with a number value to determine the weapon type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: A dualwielding warrior who can only equip one sword and a
 *   dagger but never two swords or two daggers because the swords and daggers
 *   all have the <Equip Weapon Type Limit: 1> notetags on them.
 * 
 * ---
 * 
 * <Equip Armor Type Limit: x>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped with other armors of the same type once the
 *   limited amount has been reached.
 * - Replace 'x' with a number value to determine the armor type limit.
 * - This can be bypassed using Event Commands and/or Script Calls.
 * - Usage Example: People cannot equip more than two glove accessories on at a
 *   time because the glove is a "Glove" armor-type and each glove item has the
 *   <Equip Armor Type Limit: 2> notetags on them.
 * 
 * ---
 * 
 * <Party Artifact>
 * <Troop Artifact>
 * 
 * <Stackable Party Artifact>
 * <Stackable Troop Artifact>
 * 
 * - Used for: Armor
 * - This armor cannot be equipped at all. However, by simply being in the
 *   party's inventory, its parameter bonuses and traits will be applied
 *   globally throughout the whole party or troop (depending on the notetag).
 * - Add both notetags to affect both groups.
 * - The normal versions of the notetag is only applied once regardless of the
 *   number of copies are found in the party's inventory.
 * - The stackable versions of the notetag will have the bonuses and traits
 *   stacked multiple times relative to the number of copies found in the
 *   party's inventory.
 * - This item will NOT be added during the setup phase for Battle Tests.
 *   - If you want to add the item, do it manually.
 * 
 * ---
 * 
 * <Equip For Class Only: x>
 * <Equip For Classes Only: x, x, x>
 * <Equip For Class Only: name>
 * <Equip For Classes Only: name, name, name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - This piece of equipment can only be worn by members with 'x' as the main
 *   class. If there are multiple classes listed, at least one of them need to
 *   be the actor's main class.
 * - Replace 'x' with a number representing the ID of the class required.
 * - For the 'name' variant, replace 'name' with the name of the required class
 *   the actor needs to have in order to equip this object.
 * 
 * ---
 * 
 * <Equip Requirements>
 *  requirement
 *  requirement
 *  requirement
 * </Equip Requirements>
 * 
 * - Used for: Weapon, Armor Notetags
 * - Defines a requirement(s) for the actor to meet in order for the equip item
 *   to be equippable.
 * - Failure to meet these requirements will cause the equipment to unequip
 *   automatically.
 *   - Keep in mind that in some cases, this will not happen immediately.
 *     Things like switches will require the actor to meet its cache clear
 *     in order to trigger the automatic unequip.
 *   - Some ways to trigger a cache clear would be to change the actor's HP/MP,
 *     or adding and then removing a state for the actor (preferrably an unused
 *     state that has no real effect).
 * - Replace 'requirement' with one of the settings bellow:
 * - Add multiple 'requirement' lines for more requirements.
 * 
 *   Requirements:
 *
 *   param > x
 *   param >= x
 *   param === x
 *   param <= x
 *   param < x
 *   - Replace 'param' with 'level', 'maxhp', 'maxmp', 'atk', 'def', 'mat',
 *     'mdf', 'agi', or 'luk'.
 *   - This will make the piece of equipment require the actor's base parameter
 *     to be greater than (>), greater than or equal to (>=), equal to (===),
 *     less than or equal to (<=), or less than (<).
 *   - This is NOT the value for the total parameter, only the base parameter.
 *   - The base parameter is calculated by the user's class parameter value and
 *     any bonuses received through permanent stat increases.
 *
 *   learned skill: x
 *   learned skill: name
 *   - This will make the piece of equipment require the actor to have learned
 *     skill 'x'. 
 *   - If 'name' is used, priority will be given to the skill with the highest
 *     ID in the database.
 *   - The actor needs to have LEARNED the skill. This means that if you have
 *     added a skill to the actor's kit through a trait, it will not count.
 *
 *   switch: x
 *   - This will require switch X to be on.
 *   - If it isn't, the piece of equipment cannot be worn.
 *   - Insert multiple of these to add more switches that are are required to
 *     be on.
 * 
 *   ***NOTE 1***
 *   There is no "class: x" for these equip requirements. Instead, use the
 *   <Equip For Class Only: x> notetags.
 * 
 *   ***NOTE 2***
 *   For those wondering where "unique only" is, that does not exist in this
 *   plugin. Instead, use the <Equip Copy Limit: x> notetag listed above.
 * 
 *   Example A:
 * 
 *     <Equip Requirements>
 *     level >= 20
 *     </Equip Requirements>
 * 
 *     - Requires the user to be at least level 20 in order to equip.
 * 
 *   Example B:
 * 
 *     <Equip Requirements>
 *     atk >= 50
 *     def <= 50
 *     </Equip Requirements>
 *     - Requires the user have at least 50 base ATK to equip.
 *     - Requires the user to be under 50 base DEF to equip.
 * 
 * ---
 * 
 * <Added EType: x>
 * <Added ETypes: x, x, x>
 * 
 * - Used for: Armor Notetags
 * - This is for armors only and does NOT work with weapons!
 * - Allows a piece of armor to belong to multiple ETypes. This means a glove
 *   can be equipped as "Armgear" or as an "Accessory" if you so choose.
 * - Replace 'x' with a number representing the ID of the EType you wish to add
 *   to the list of ETypes.
 *   - Insert multiple 'x' entries to add more than one EType ID.
 * 
 * ---
 * 
 * <Cursed>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this weapon or armor is equipped, it cannot manually be removed by the
 *   player until it is purified.
 * - To remove it, it must be done by event commands, script calls, or through
 *   the Purify-related Plugin Commands provided by this plugin.
 * - Once purified, the weapon or armor will become unequipped unless it has a
 *   purify transformation.
 *   - If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * - If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become cursed
 *   in order to allow free weapon swapping. Weaponry will not be cursed
 *   if VisuMZ_2_WeaponSwapSystem is installed.
 * 
 * ---
 * 
 * <Purify Transform: id>
 * <Purify Transform: name>
 * 
 * - Used for: Weapon, Armor Notetags
 * - If this notetag is present on a <Cursed> weapon or armor, then upon the
 *   actor receiving purification, the weapon or armor will transform into a
 *   different item.
 * - Replace 'id' with a number representing the transformed weapon/armor's ID.
 * - Replace 'name' with text representing the transformed weapon/armor's name.
 * - Weapons can only transform into weapons.
 * - Armors can only transform into armors.
 * 
 * ---
 *
 * === JavaScript Notetags: Equipment ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * adjust the parameter through code.
 *
 * ---
 *
 * <JS Parameters>
 *  MaxHP = code;
 *  MaxMP = code;
 *  ATK = code;
 *  DEF = code;
 *  MAT = code;
 *  MDF = code;
 *  AGI = code;
 *  LUK = code;
 * </JS Parameters>
 *
 * - Used for: Weapon, Armor Notetags
 * - Uses JavaScript to determine the values for the basic parameters based on
 *   the code used to calculate its value.
 * - The variables 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', and
 *   'LUK' are used to determine the finalized value of the parameter. This
 *   variable is case sensitive.
 * - If a parameter is not present, its value will be treated as +0.
 *
 * ---
 *
 * === Status Window Notetags ===
 *
 * The following notetags will affect the Shop Status Window info. If for any
 * reason the data that is displayed is not to your liking or insufficient,
 * you can change it up using the following notetags.
 *
 * ---
 *
 * <Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Status Info>
 *
 * - Used for: Skill, Item Notetags
 * - If you do not like the generated data that's displayed, you can change it
 *   using this notetag to display what you want.
 * - Replace 'key' with one of the following:
 *   - Consumable
 *   - Quantity
 *   - Occasion
 *   - Scope
 *   - Speed
 *   - Success Rate
 *   - Repeat
 *   - Hit Type
 *   - Element
 *   - Damage Multiplier
 *   - HP Recovery
 *   - MP Recovery
 *   - TP Recovery
 *   - HP Damage
 *   - MP Damage
 *   - TP Damage
 *   - User TP Gain
 *   - Added Effects
 *   - Removed Effects
 * - Replace 'data' with the text data you want to visually appear. You may use
 *   text codes for this.
 * - This only affects info entries that are already visible and won't make
 *   other categories suddenly appear.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 *
 * <Custom Status Info>
 *  key: data
 *  key: data
 *  key: data
 * </Custom Status Info>
 *
 * - Used for: Skill, Item
 * - If you want custom categories and data to be displayed for your items that
 *   aren't provided by the Shop Status Window Info to begin with, you can use
 *   this notetag to add in your own entries.
 * - Replace 'key' with text of the exact label you want. You may use text
 *   codes for this.
 * - Replace 'data' with text of the exact text data you want. You may use text
 *   codes for this.
 * - Insert or remove as many "key: data" lines as needed.
 *
 * ---
 * 
 * <Shop Picture Name: filename>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Enables a shop picture for the status window. This image can be seen in
 *   the item scene, shop scene, and skill scene if enabled.
 * - If this notetag is not used, there will be no image.
 * - Replace 'filename' with the filename of the graphic to use from the game
 *   project's img/pictures/ folder. Filenames are case sensitive. Leave out
 *   the filename extension from the notetag.
 * - Use the supporting notetags to determine where the image appears. If not,
 *   they will default to the background, fit to the window dimensions,
 *   centered at the middle of the window.
 * 
 * ---
 * 
 * <Shop Picture Layer: Background>
 * <Shop Picture Layer: Foreground>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines which layer the graphic will be drawn on.
 * - If the background layer is selected, the picture will appear behind the
 *   data text.
 * - If the foreground layer is selected, the picture will appear in front of
 *   the data text.
 * - If this notetag is not used, it will default to the background layer.
 * 
 * ---
 * 
 * <Shop Picture Max Width: x>
 * <Shop Picture Max Height: y>
 * <Shop Picture Max Dimensions: x, y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Determines the maximum width and/or height for the image.
 * - This means the image will be automatically scaled proportionally to that
 *   width or height as long as everything else does not break boundaries.
 * - Replace 'x' and 'y' with number values representing the maximum dimensions
 *   the image can be in pixels.
 * - If these notetags are not used, the image will be automatically scaled to
 *   the dimensions of the shop status window.
 * 
 * ---
 * 
 * <Shop Picture Alignment: Left>
 * <Shop Picture Alignment: Center>
 * <Shop Picture Alignment: Right>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the horizontal alignment for the image.
 * - Left, center, right determines how it's aligned horizontally if the
 *   image does not horizontally fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'center' alignment.
 * 
 * ---
 * 
 * <Shop Picture Position: Top>
 * <Shop Picture Position: Middle>
 * <Shop Picture Position: Bottom>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the vertical position for the image.
 * - Top, middle, bottom determines how it's positioned vertically if the
 *   image does not vertically fit in the width of the window.
 * - If any of these notetags are not used, the image will default to the
 *   'middle' position.
 * 
 * ---
 * 
 * <Shop Picture Offset X: +x>
 * <Shop Picture Offset X: -x>
 * 
 * <Shop Picture Offset Y: +y>
 * <Shop Picture Offset Y: -y>
 * 
 * <Shop Picture Offset: +x, +y>
 * <Shop Picture Offset: -y, -y>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Offsets the X and Y positions of the image in the shop status window.
 * - X offsets adjust the horizontal position by x pixels.
 *   - Positive goes right.
 *   - Negative goes left.
 * - Y offsets adjust the horizontal position by y pixels.
 *   - Positive goes down.
 *   - Negative goes up.
 * - Replace 'x' and 'y' with number values representing the pixels to offset
 *   the image by. The '+' and '-' signs are required.
 * - If none of these notetags are used, there will be no offsets.
 * 
 * ---
 * 
 * <Shop Picture Opacity: x>
 * <Shop Picture Opacity: x%>
 * 
 * - Used for: Skill, Item, Weapon, Armor Notetags
 * - Adjusts the opacity of the image used.
 * - When using 'x' and not 'x%', use a number between 0 and 255.
 *   - The closer to 0, the more transparent the image is.
 *   - The closer to 255, the more opaque the image is.
 * - When using 'x%' and not 'x', use a number between 0% and 100%.
 *   - The closer to 0%, the more transparent the image is.
 *   - The closer to 100%, the more opaque the image is.
 * 
 * ---
 *
 * === Shop Menu Notetags ===
 *
 * These notetags adjust how prices and such are managed inside the Shop Menu
 * as well as whether or not some items are visible depending on switch states.
 *
 * ---
 *
 * <Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Adjusts the buying price for this item.
 * - Replace 'x' with a number depicting the desired value for the buy price.
 * - This allows you to bypass the RPG Maker MZ editor's limitation of 999,999.
 *
 * ---
 *
 * <Can Sell>
 * <Cannot Sell>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Makes the item either always sellable or cannot be sold.
 * - This bypasses the game's internal hard-coding to prevent items with a
 *   price of 0 from being able to be sold.
 * - This bypasses the game's internal hard-coding to always allow items with
 *   a price value of being able to be sold.
 *
 * ---
 *
 * <Sell Price: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Changes the sell price to be something different than the default amount.
 * - Replace 'x' with a number depicting the desired value for the sell price.
 *
 * ---
 *
 * <Show Shop Switch: x>
 *
 * <Show Shop All Switches: x,x,x>
 * <Show Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Shop Switch: x>
 *
 * <Hide Shop All Switches: x,x,x>
 * <Hide Shop Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the visibility of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's visibility.
 * - If 'All' notetag variant is used, item will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Cannot Sell Switch: x>
 *
 * <Cannot Sell All Switches: x,x,x>
 * <Cannot Sell Any Switches: x,x,x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Determines the sellability of the shop item based on switches.
 * - Replace 'x' with the switch ID to determine the shop item's sellability.
 * - If 'All' notetag variant is used, item cannot be sold until all switches
 *   are ON. Otherwise, it can be sold.
 * - If 'Any' notetag variant is used, item cannot be sold if any of the
 *   switches are ON. Otherwise, it can be sold.
 *
 * ---
 * 
 * <Buy Turn On Switch: x>
 * <Buy Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon buying.
 * 
 * ---
 * 
 * <Buy Turn Off Switch: x>
 * <Buy Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is bought in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon buying.
 * 
 * ---
 * 
 * <Sell Turn On Switch: x>
 * <Sell Turn On Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn on the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn on.
 *   - Insert multiple 'x' values to turn on multiple switches upon selling.
 * 
 * ---
 * 
 * <Sell Turn Off Switch: x>
 * <Sell Turn Off Switches: x, x, x>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - When this item, weapon, or armor is sold in the shop scene, turn off the
 *   switch(es) 'x'.
 * - Replace 'x' with a number representing the ID of the switch to turn off.
 *   - Insert multiple 'x' values to turn off multiple switches upon selling.
 * 
 * ---
 *
 * === JavaScript Notetags: Shop Menu ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Buy and Sell prices.
 *
 * ---
 *
 * <JS Buy Price>
 *  code
 *  code
 *  price = code;
 * </JS Buy Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the buying 'price' of the item.
 * - Insert the final buy price into the 'price' variable.
 * - The 'item' variable refers to the item being bought.
 *
 * ---
 *
 * <JS Sell Price>
 *  code
 *  code
 *  price = code;
 * </JS Sell Price>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - Replace 'code' to determine the selling 'price' of the item.
 * - Insert the final sell price into the 'price' variable.
 * - The 'item' variable refers to the item being sold.
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
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change Equip Slots
 * - Forcefully change the actor(s) equip slots.
 * - These will persist through class changes.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Equip Slots:
 *   - Insert the equip slots you want the actor(s) to have.
 *   - These entries are case-sensitive.
 *
 * ---
 *
 * Actor: Reset Equip Slots
 * - Reset any forced equip slots for the actor(s).
 * - Equip slots will then be based on class.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Shop Plugin Commands ===
 * 
 * ---
 *
 * Shop: Advanced
 * - Make it easier to put together inventories for a shop.
 * - WARNING: Does not allow for event-specific prices.
 *
 *   Step 1: Item ID's
 *   - Select which Item ID ranges to add.
 *
 *   Step 2: Weapon ID's
 *   - Select which Weapon ID ranges to add.
 *
 *   Step 3: Armor ID's
 *   - Select which Armor ID ranges to add.
 *
 *   Step 4: Purchase Only?
 *   - Make the shop purchase-only?
 * 
 *   Optional:
 * 
 *     Blacklist
 *     - A list of categories to blacklist from the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 * 
 *     Whitelist
 *     - A list of categories to whitelist for the shop.
 *     - Not used if empty. Mark categories with <Category: x>
 *
 * This Plugin Command primarily functions as an alternative to the editor's
 * "Shop Processing" event command as that one requires you to add items one at
 * a time, making it extremely tedious to add large amounts of items. This
 * Plugin Command will mitigate that by allowing ID ranges to determine which
 * items to make available.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Menu Settings
 * ============================================================================
 *
 * The Item Menu Settings allow you to adjust specifics on how key objects and
 * windows in the Item Menu Scene operate.
 *
 * ---
 *
 * General Window
 *
 *   Use Updated Layout:
 *   - Use the Updated Item Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *   - If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *
 * ---
 *
 * Item Quantity
 *
 *   Item Max:
 *   Weapon Max:
 *   Armor Max:
 *   - The default maximum quantity for items, weapons, and/or armors.
 * 
 *   Quantity Format:
 *   - How to display an item's quantity.
 *   - %1 - Item Quantity
 *
 *   Font Size:
 *   - Default font size for item quantity.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Item Menu?:
 *   - Show the Shop Status Window in the Item Menu?
 *   - This is enabled if the Updated Layout is on.
 *
 *   Adjust List Window?:
 *   - Automatically adjust the Item List Window in the Item Menu if using the
 *     Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 *
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Status Window in the
 *     Item Menu.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Switch Category:
 *   - Button assist text used for switching categories.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Item Categories
 * ============================================================================
 *
 * Item Categories appear both in the Item Menu Scene and Shop Menu Scene (but
 * only under the Sell command). These Plugin Parameters give you the ability
 * to add in the specific categories you want displayed, remove the ones you
 * don't, and associate them with icons.
 *
 * ---
 *
 * List
 *
 *   Category List
 *   - A list of the item categories displayed in the Item/Shop menus.
 * 
 *     Type:
 *     - A list of the item categories displayed in the Item/Shop menus.
 *     - Replace x with ID numbers or text.
 *     - AllItems, RegularItems, KeyItems
 *     - HiddenItemA, HiddenItemB
 *     - Consumable, Nonconsumable
 *     - AlwaysUsable, BattleUsable, FieldUsable, NeverUsable
 *     - AllWeapons, WType:x
 *     - AllArmors, AType:x, EType:x
 *     - Category:x
 * 
 *     Icon:
 *     - Icon used for this category.
 *     - Use 0 for no icon.
 * 
 *     Visibility Switch:
 *     - This Switch must be turned ON in order for the category to show.
 *     - Use 0 for no Switch requirement.
 *
 *   Style:
 *   - How do you wish to draw categorie entries in the Category Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 *
 *   Text Alignment
 *   - Decide how you want the text to be aligned.
 *
 * ---
 *
 * Vocabulary
 *
 *   Hidden Item A
 *   Hidden Item B
 *   Consumable
 *   Nonconsumable
 *   Always Usable
 *   Battle Usable
 *   Field Usable
 *   Never Usable
 *   - How these categories are named in the Item Menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: NEW! Labels
 * ============================================================================
 *
 * Whenever the player receives a new item(s), a NEW! Label can be placed on
 * top of the item's icon when browsing a menu displaying the item(s). This is
 * a quality of life addition from more modern RPG's to help players figure out
 * what they've recently received. The following are Plugin Parameters made to
 * adjust how the NEW! Labels are handled in-game.
 *
 * ---
 *
 * NEW! Labels
 * 
 *   Use NEW! Labels?:
 *   - Use the NEW! Labels or not?
 * 
 *   Icon:
 *   - The icon index used to represent the NEW! text.
 *   - Use 0 to not draw any icons.
 * 
 *   Text:
 *   - The text written on the NEW! Label.
 * 
 *     Font Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *     Font Size:
 *     - The font size used for the NEW! text.
 * 
 *   Fade Limit:
 *   - What's the upper opaque limit before reversing?
 * 
 *   Fade Speed:
 *   - What's the fade speed of the NEW! Label?
 * 
 *   Offset X:
 *   - How much to offset the NEW! Label's X position by.
 * 
 *   Offset Y:
 *   - How much to offset the NEW! Label's Y position by.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equip Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust the Equipment Menu Scene, ranging from using
 * a more updated and modern layout, changing the styles of other windows, and
 * other key visual aspects of the Equip Menu Scene. Other settings here allow
 * you to adjust how equipment operate under certain rulings, too.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Equip Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 * 
 *     Param Font Size:
 *     - The font size used for parameter values.
 * 
 *     Show Menu Portraits?:
 *     - If Main Menu Core is installed, display the Menu Portraits instead of
 *       the actor's face in the status window?
 * 
 *     JS: Portrait Upper:
 *     - If Menu Portraits are available, this is code used to draw the upper
 *       data like this in the Status Window.
 * 
 *     JS: Face Upper:
 *     - If faces used used, this is code used to draw the upper data like this
 *       in the Status Window.
 * 
 *     JS: Parameter Lower:
 *     - Code to determine how parameters are drawn in the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 * 
 *   Status Window Width:
 *   - The usual width of the status window if using the non-Updated Equip
 *     Menu Layout.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *   Cursed Equip Popup:
 *   - Text popup appears when an actor equips a cursed weapon/armor.
 *   - Text codes allowed.
 *   - Requires VisuMZ_0_CoreEngine!
 *   - Empty to not use.
 *   -  %1 - Actor, %2 - Equip, %3 - Icon.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Equip Icon:
 *   - The icon used for the Equip command.
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *   Add Optimize Command?:
 *   - Add the "Optimize" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Optimize Icon:
 *     - The icon used for the Optimize command.
 * 
 *   Add Clear Command?:
 *   - Add the "Clear" command to the Command Window?
 * 
 *     Help Description:
 *     - Help description used when this command is selected.
 *     - Text codes allowed.
 * 
 *     Clear Icon:
 *     - The icon used for the Clear command.
 *
 * ---
 *
 * Remove Equip
 * 
 *   Icon:
 *   - Icon used for equipment removal.
 * 
 *   Text:
 *   - Text used for equipment removal.
 * 
 *   Use SHIFT Shortcut?:
 *   - Add the "Shift" button as a shortcut key to removing items?
 *
 * ---
 *
 * Rulings
 * 
 *   Equip-Adjust HP/MP:
 *   - Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * 
 *   Non-Removable Types:
 *   - Insert ID's of the Equipment Types that must always have an item
 *     equipped and cannot be empty.
 * 
 *   Non-Optimized Types:
 *   - Insert ID's of the Equipment Types that will be ignored when equipment
 *     is being optimized.
 *
 * ---
 *
 * Button Assist Window
 *
 *   SHIFT: Remove:
 *   - Button assist text used for the SHIFT Remove Shortcut.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Menu Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you a number of options to adjust the Shop
 * Menu Scene. These options range from enabling an updated and modern layout,
 * adjust how various key visual aspects appear, and determine how prices can
 * be affected when it comes to selling them or buying them (for coders).
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Shop Layout provided by this plugin?
 *   - This will override the Core Engine windows settings.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 * 
 * Switches:
 * 
 *   Switch: Buy:
 *   - Buying items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 *   Switch: Sell
 *   - Selling items in the Shop Scene turns this Switch to ON.
 *   - Switch reverts to OFF whenever the Shop Scene opens.
 * 
 * ---
 *
 * Command Window
 * 
 *   Hide Unavailable?:
 *   - Hide all unavailable commands like when a shop is set to Purchase Only?
 * 
 *   Style:
 *   - How do you wish to draw commands in the Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Command Window.
 * 
 *   Buy Icon:
 *   - The icon used for the Buy command.
 * 
 *   Sell Icon:
 *   - The icon used for the Sell command.
 * 
 *   Cancel Icon:
 *   - The icon used for the Cancel command.
 * 
 *   Rename "Cancel":
 *   - Rename Cancel to something more logical for the Shop Menu Scene.
 *
 * ---
 *
 * Prices
 * 
 *   Sell Price Rate:
 *   - The default sell price rate.
 * 
 *   JS: Buy Price:
 *   - Modificatons made to the buy price before finalizing it.
 * 
 *   JS: Sell Price:
 *   - Modificatons made to the sell price before finalizing it.
 *
 * ---
 *
 * Button Assist Window
 *
 *   Small Increment:
 *   Large Increment:
 *   - Text used for changing amount bought/sold.
 *   - For VisuStella MZ's Core Engine's Button Assist Window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Shop Status Window
 * ============================================================================
 *
 * These Plugin Parameters focuses on the Shop Status Window and determines how
 * its data is displayed.
 *
 * ---
 *
 * General
 * 
 *   Window Width:
 *   - The usual width of the status window.
 * 
 *   Parameter Font Size:
 *   - Font size used for parameter changes.
 * 
 *   Translucent Opacity:
 *   - Opacity setting used for translucent window objects.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Equipment Data
 * 
 *   Already Equipped:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Can't Equip:
 *   - Marker used to show an actor cannot equip an item.
 * 
 *   Delay MS:
 *   - How many milliseconds (MS) to delay the preview update?
 *   - This is to prevent lag spikes for equips only.
 * 
 *   No Changes:
 *   - Marker used to show no changes have occurred.
 * 
 *   JS: Draw Equip Data:
 *   - Code used to draw the equipment data for the Shop Status Window.
 *
 * ---
 *
 * Item Data
 * 
 *   Max State/Buff Icons:
 *   - Maximum number of icons that can be displayed for Add/Remove
 *     States/Buffs.
 * 
 *   Multiplier Standard:
 *   - Constant standard to filter out random values when calculating the
 *     damage multiplier.
 * 
 *   JS: Draw Item Data:
 *   - Code used to draw the item data for the Shop Status Window.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Consumable:
 *   Occasions:
 *   Scope:
 *   Speed:
 *   Success Rate:
 *   Repeats:
 *   Hit Type:
 *   Element:
 *   Damage Type:
 *   Effects:
 *   - Vocabulary used for these data entries.
 *   - Some of these have Plugin Parameters have sub-entries.
 * 
 *   NOTE: Regarding Damage Labels
 * 
 *   If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * 
 *   Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
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
 * Version 1.50: November 16, 2023
 * * Bug Fixes!
 * ** <JS Buy Price> and <JS Sell Price> was not working properly. Fix made
 *    by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * New Features!
 * ** New Notetags added by Arisu:
 * *** <Cursed>
 * **** If this weapon or armor is equipped, it cannot manually be removed by
 *      the player until it is purified.
 * **** To remove it, it must be done by event commands, script calls, or
 *     through the Purify-related Plugin Commands provided by this plugin.
 * **** Once purified, the weapon or armor will become unequipped unless it has
 *     a purify transformation.
 * **** If the newly transformed weapon/armor is equippable, it will remain in
 *     the actor's equipment slots.
 * **** If you are using VisuMZ_2_WeaponSwapSystem, weapons cannot become
 *      cursed in order to allow free weapon swapping. Weaponry will not be
 *      cursed if VisuMZ_2_WeaponSwapSystem is installed.
 * *** <Purify Transform: id>
 * *** <Purify Transform: name>
 * **** If this notetag is present on a <Cursed> weapon or armor, then upon the
 *      actor receiving purification, the weapon or armor will transform into a
 *      different item.
 * ** New Plugin Commands added by Arisu:
 * *** Purify: Target Actor(s)
 * **** Purifies target actor(s) of any cursed weapons or armors.
 * *** Purify: Whole Party
 * **** Purifies whole party of any cursed weapons or armors.
 * ** Added "Cursed Equip Popup" to Equip Scene Plugin Parameters.
 * *** Text popup appears when an actor equips a cursed weapon/armor.
 * ** Added "Ally or Enemy" or "Enemy or Ally" scopes to Shop Status Window
 *    Plugin Parameters.
 * *** If unused, will default to "1 Ally" or "1 Enemy" like usual.
 *     Added by Irina.
 * 
 * Version 1.49: October 12, 2023
 * * Bug Fixes!
 * ** Fixed a problem where for weapon types, all weapon types are listed in
 *    the equip menu even when the actor cannot equip them (though they would
 *    be disabled). Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Olivia and sponsored by AndyL:
 * *** <Added EType: x>
 * *** <Added ETypes: x, x, x>
 * **** This is for armors only and does NOT work with weapons!
 * **** Allows a piece of armor to belong to multiple ETypes. This means a
 *      glove can be equipped as "Armgear" or as an "Accessory" if you so
 *      choose.
 * 
 * Version 1.48: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help window position of the non-updated layout
 *    would appear in the wrong position. Fix made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized when weapons and armors exceed 2000
 *    in database quantity.
 * 
 * Version 1.47: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause the shop status window to display incorrect
 *    removed buffs and debuffs. Fix made by Olivia.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** Changes made to dynamic shop listings in order to update upon listing
 *    changes rather than having to enter and exit the shop again. Update made
 *    by Arisu.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by AndyL:
 * *** <Conserve: x%>
 * **** Gives the item a percent chance when used to not consume the item.
 * *** <Buy Turn On Switches: x, x, x>
 * *** <Buy Turn Off Switches: x, x, x>
 * *** <Sell Turn On Switches: x, x, x>
 * *** <Sell Turn Off Switches: x, x, x>
 * **** When buying/selling an item, weapon, or armor with these notetags,
 *      turn on/off switch(es) 'x'.
 * *** New Plugin Parameters added by Arisu:
 * **** Params > Settings > Shop Status Window > Equipment Data > Delay MS:
 * ***** How many milliseconds (MS) to delay the preview update?
 * ***** This is to prevent lag spikes for equips only.
 * 
 * Version 1.46: June 15, 2023
 * * Bug Fixes!
 * ** Fixed a problem where the help and input modes are not adequately
 *    adjusted when not used with the updated layout or without the Options
 *    Core custom UI placement. Fix made by Arisu.
 * 
 * Version 1.45: May 18, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause equip slots to not be recognized properly if
 *    the equip slot name ends in a space.
 * 
 * Version 1.44: April 13, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag effects added by Arisu and sponsored by Anon:
 * *** <Equip For Class Only: x>
 * *** <Equip For Classes Only: x, x, x>
 * *** <Equip For Class Only: name>
 * *** <Equip For Classes Only: name, name, name>
 * **** The piece of equipment can only be worn by the listed classes.
 * *** <Equip Requirements> notetag added.
 * **** Define multiple requirements that the actor needs to meet in order for
 *      this equip item to be equippable.
 * **** See help file for more information on the types of requirements that
 *      can be added.
 * 
 * Version 1.43: March 16, 2023
 * * Bug Fixes!
 * ** Artifact armors should now update and refresh the party members' cache
 *    upon acquisition. Fix made by Olivia.
 * 
 * Version 1.42: February 16, 2023
 * * Bug Fixes!
 * ** Proxy items should no longer cause infinite loops if they're made to
 *    reference other proxy items in a circular fashion. Instead, they just
 *    give the exact first found proxy instead of cycling through others.
 *    Fix made by Arisu.
 * 
 * Version 1.41: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu and sponsored by Anon:
 * *** Equip Scene > Equip Command > Help Description
 * *** Equip Scene > Optimize Command > Help Description
 * *** Equip Scene > Clear Command > Help Description
 * **** Help description used when these commands are selected.
 * 
 * Version 1.40: October 20, 2022
 * * Feature Update!
 * ** For the shop status window, when comparing equipment of a type where
 *    there are multiple equipment slots (such as accessories), the plugin will
 *    now check for an empty equipment slot first and then make calculations
 *    there. Otherwise, it will use the first available equipment slot of that
 *    type regardless of the equipped item. Update made by Arisu.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.39: September 29, 2022:
 * * Feature Update!
 * ** Changed the default code for the equip scene's status window display to
 *    prevent the face graphic and basic actor stats from going above the
 *    window boundaries if there are too many parameters displayed in the
 *    status window at a time.
 * ** If you already have this plugin installed the changes will not be
 *    reflected unless you do the following:
 * **** BACKUP your game project.
 * **** REMOVE this plugin from the Plugin Manager list.
 * **** REINSTALL this plugin into the Plugin Manager list.
 * **** SAVE the game project.
 * 
 * Version 1.38: March 3, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New mechanics and notetags added by Olivia and sponsored by Anon:
 * *** <Party Artifact>
 * *** <Troop Artifact>
 * *** <Stackable Party Artifact>
 * *** <Stackable Troop Artifact>
 * **** Armors only! This armor cannot be equipped at all. However, by simply
 *      being in the party's inventory, its parameter bonuses and traits will
 *      be applied globally throughout the whole party or troop (depending on
 *      the notetag). Add both notetags to affect both groups.
 * **** The normal versions of the notetag is only applied once regardless of
 *      the number of copies are found in the party's inventory.
 * **** The stackable versions of the notetag will have the bonuses and traits
 *      stacked multiple times relative to the number of copies found in the
 *      party's inventory.
 * **** This item will NOT be added during the setup phase for Battle Tests.
 * ***** If you want to add the item, do it manually.
 * 
 * Version 1.37: December 23, 2021
 * * Compatibility Update
 * ** Created foundation for proxy items to be used in any applicable system
 *    and extension plugins. Update made by Arisu.
 * 
 * Version 1.36: December 2, 2021
 * * Feature Update!
 * ** For those using custom parameters from the Core Engine and do not have
 *    the parameters all-capitalized, the plugin will automatically do it for
 *    you to prevent errors. Update made by Olivia.
 * 
 * Version 1.35: November 18, 2021
 * * Compatibility Update!
 * ** If this plugin's updated scene is disabled, the Help Window locations for
 *    the Item, Equip, and Shop Scenes should now be at their designated
 *    locations as calculated by the VisuMZ Core Engine instead of the RMMZ
 *    default location. Update made by Irina.
 * 
 * Version 1.34: October 28, 2021
 * * Feature Update
 * ** Added fail safe checks for projects that are using old data for starting
 *    equipment that no longer exist, thus preventing the game from opening.
 *    Update made by Arisu.
 * 
 * Version 1.33: August 6, 2021
 * * Documentation Update!
 * ** Removed "Weapon" and "Armor" from "Used For" for <Status Info>. This was
 *    an unintended piece of documentation.
 * 
 * Version 1.32: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that would cause armor duplication when changing to classes
 *    with unaligned equipment slot types. Fix made by Arisu.
 * 
 * Version 1.31: July 9, 2021
 * * Feature Update!
 * ** Added a failsafe for price manipulation JavaScript to never have prices
 *    drop below 0 if possible. Update made by Arisu.
 * 
 * Version 1.30: July 2, 2021
 * * Documentation Update!
 * ** Added an extra note to the help file for the following:
 *    Plugin Parameters > Item Menu Settings > List Window > Columns
 * *** If you are using the VisuStella MZ Core Engine and the "Modern Controls"
 *     Plugin Parameter, please read through that section in case you have any
 *     questions about how to switch between categories when using multiple
 *     columns of items at a time.
 *    
 * 
 * Version 1.29: June 25, 2021
 * * Compatibility Update
 * ** Compatibility update with RPG Maker MZ 1.3.0+.
 * * Feature Update!
 * ** Phantom data when changing equipment types in the database should no
 *    longer affect actors with cached equip ID's. Update made by Arisu.
 * 
 * Version 1.28: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.27: May 21, 2021
 * * Bug Fixes!
 * ** Using the mouse right click in the Equip Scene while inside of the item
 *    to slot window will no longer exit the Equip Scene. Fix made by Yanfly.
 * 
 * Version 1.26: April 30, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** "VisuStella MZ Compatibility" added VisuMZ_1_BattleCore section regarding
 *    Damage Multiplier and Healing Multiplier vocabulary settings to reduce
 *    commonly asked questions.
 * * New Features!
 * ** New notetags added by Irina and sponsored by Archeia:
 * *** <Shop Picture Name: filename>
 * *** <Shop Picture Layer: x>
 * *** <Shop Picture Max Width: x>
 * *** <Shop Picture Max Height: y>
 * *** <Shop Picture Max Dimensions: x, y>
 * *** <Shop Picture Alignment: x>
 * *** <Shop Picture Position: y>
 * *** <Shop Picture Offset X: +x>
 * *** <Shop Picture Offset X: -x>
 * *** <Shop Picture Offset Y: +y>
 * *** <Shop Picture Offset Y: -y>
 * *** <Shop Picture Offset: +x, +y>
 * *** <Shop Picture Offset: -x, -y>
 * *** <Shop Picture Opacity: x>
 * *** <Shop Picture Opacity: x%>
 * **** Add images from the game project's img/pictures/ folder to display in
 *      the Shop Status Window.
 * 
 * Version 1.25: April 23, 2021
 * * Documentation Update!
 * ** Added clarity to the <param: +x> and <param: -x> notetags:
 * *** These notetags do NOT work with X Parameters, S Parameters, or any
 *     custom parameters. These notetags ONLY work with the base parameters.
 * 
 * Version 1.24: April 16, 2021
 * * Bug Fixes!
 * ** Changing an actor's equipment slots to past their original amount will no
 *    longer yield errors with duplicate slot types. Fix made by Arisu.
 * ** Completely selling an item should now refresh the help window to the new
 *    selected item's help description. Fix made by Arisu.
 * * Optimization Update!
 * ** Non-removable equipment restrictions for the equipment scene are now
 *    better optimized. Update made by Olivia.
 * 
 * Version 1.23: April 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.21: March 5, 2021
 * * Feature Update!
 * ** Custom equipment slots are disabled during Battle Testing for better
 *    accuracy and results.
 * 
 * Version 1.20: February 26, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Buy
 * *** Plugin Parameters > Shop Menu Settings > Switches > Switch: Sell
 * **** Buying/selling items in the Shop Scene turns this Switch to ON.
 * **** Switch reverts to OFF whenever the Shop Scene opens.
 * **** These switches can be used after a "Shop Processing" event command to
 *      determine if the player has bought an item, bought and sold an item,
 *      sold an item, or neither.
 * 
 * Version 1.19: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina.
 * *** <Equip Copy Limit: x>
 * **** Sets a maximum number of copies that the actor can wear of this
 *      equipment. Usage Example: Actors can only equip one copy of the
 *      "One-of-a-Kind Ring" on at any time despite having empty accessory
 *      slots because the ring has a <Equip Copy Limit: 1> notetag.
 * *** <Equip Weapon Type Limit: x>
 * **** This weapon cannot be equipped with other weapons of the same type once
 *      the limited amount has been reached. Usage Example: A dualwielding
 *      warrior who can only equip one sword and a dagger but never two swords
 *      or two daggers because the swords and daggers all have the
 *      <Equip Weapon Type Limit: 1> notetags on them.
 * *** <Equip Armor Type Limit: x>
 * **** This armor cannot be equipped with other armors of the same type once
 *      the limited amount has been reached. Usage Example: People cannot equip
 *      more than two glove accessories on at a time because the glove is a
 *      "Glove" armor-type and each glove item has the
 *      <Equip Armor Type Limit: 2> notetags on them.
 * 
 * Version 1.18: January 15, 2021
 * * Bug Fixes!
 * ** Pressing "Shift" to remove equipment will now refresh the status window
 *    unlike before. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Item Menu Settings > Background Type
 * 
 * Version 1.17: January 1, 2021
 * * Bug Fixes!
 * ** Equipping should be working properly again. Fix made by Yanfly.
 * 
 * Version 1.16: December 25, 2020
 * * Bug Fixes!
 * ** Equip-Adjust HP/MP should work properly now. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that if the VisuStella
 *    Battle Core is installed, then all battle scope items are visible, but
 *    not necessarily enabled if they are disabled otherwise.
 * 
 * Version 1.15: December 18, 2020
 * * Bug Fixes!
 * ** RPG Maker MZ Bug: Unusable items on an individual-actor basis will no
 *    longer be overwritten by party-based usability for battle. Fix by Yanfly.
 * * Documentation Update!
 * ** Added more clarity for <JS Item Enable> to state that it removes the
 *    usable item from visibility as well if the actor unable to use it is the
 *    only person in the party.
 * 
 * Version 1.14: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.13: December 4, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Actor: Change Equip Slots
 * *** Actor: Reset Equip Slots
 * **** These plugin commands allow you to forcefully change the equip slots
 *      available to an actor regardless of the slots provided by its class as
 *      well as reset them.
 * 
 * Version 1.12: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.11: November 8, 2020
 * * Bug Fix!
 * ** Font size ratio for the shop status window now scales to a hard coded
 *    value to prevent smaller font sizes from expanding icon sizes. Fix made
 *    by Arisu.
 * * Feature Update!
 * ** Currency display in the shop menu is now reflected upon how the plugin
 *    parameters set them to display. Update made by Arisu.
 * 
 * Version 1.10: November 1, 2020
 * * Feature Update!
 * ** Modern Controls compatibility with Core Engine no longer enables the
 *    Item Categories window and child classes to utilize the Home/End keys.
 * 
 * Version 1.09: October 25, 2020
 * * Bug Fixes!
 * ** "All Items" category should now display the "Items" text. Fix by Irina.
 * ** WType, AType, and EType categories now work with text. Fix by Irina.
 *
 * Version 1.08: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: October 11, 2020
 * * Bug Fixes!
 * ** XParams and SParams in the Window_EquipStatus window will no longer show
 *    a non-percentile difference if the original value is not a whole value.
 *    Fix made by Yanfly.
 * 
 * Version 1.06: October 4, 2020
 * * Bug Fixes!
 * ** Select Item event command now displays the default amount of columns
 *    instead of whatever setting is made with the plugin parameters.
 * 
 * Version 1.05: September 27, 2020
 * * Bug Fixes!
 * ** When using the updated shop layout, leaving the sell option will no
 *    longer cause the dummy window to appear.
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.04: September 13, 2020
 * * Bug Fixes!
 * ** Pressing Shift to quickly remove equipment should no longer crash the
 *    game. This will also clear the help window text. Fix made by Arisu.
 * 
 * Version 1.03: September 6, 2020
 * * Bug Fixes!
 * ** If both Optimize and Clear commands have been removed and using modern
 *    controls, pressing up at the top of the slot window list will not go to
 *    the window. Fix made by Yanfly.
 * ** If both Optimize and Clear commands have been removed, the window will no
 *    longer appear and the slot window will be moved upward to fill any empty
 *    spaces. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added in NEW! Label to let you adjust the font face.
 * ** New Plugin Parameters added in Equip Menu Scene Settings for disabling
 *    the back rectangles and/or changing their colors.
 * ** New Plugin Parameters added in Shop Status Window Settings for disabling
 *    the back rectangles and/or changing their colors.
 * 
 * Version 1.02: August 30, 2020
 * * Documentation Fix!
 * ** Added: NOTE: Regarding Damage Labels
 * *** If Visu_1_BattleCore is installed, priority goes to its Damage Style
 *   settings. The label displayed is based on the damage style settings in
 *   place for that specific skill or item.
 * *** Go to Battle Core > Plugin Parameters > Damage Settings > Style List >
 *   pick the damage style you want to edit > Damage Label and change the
 *   text settings you'd like there.
 * *** Documentation update added by Yanfly.
 * 
 * Version 1.01: August 23, 2020
 * * Added failsafe to prevent non-existent equipment (because the database
 *   entries have been deleted) from being equipped as initial equipment.
 *   Fix made by Olivia.
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
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorChangeEquipSlots
 * @text Actor: Change Equip Slots
 * @desc Forcefully change the actor(s) equip slots.
 * These will persist through class changes.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 * 
 * @arg Slots:arraystr
 * @text Equip Slots
 * @type string[]
 * @desc Insert the equip slots you want the actor(s) to have.
 * These entries are case-sensitive.
 * @default ["Weapon","Shield","Head","Body","Accessory"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorResetEquipSlots
 * @text Actor: Reset Equip Slots
 * @desc Reset any forced equip slots for the actor(s).
 * Equip slots will then be based on class.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Purify
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyActors
 * @text Purify: Target Actor(s)
 * @desc Purifies target actor(s) of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PurifyParty
 * @text Purify: Whole Party
 * @desc Purifies whole party of any cursed weapons or armors.
 * Cannot be used in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Shop
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BatchShop
 * @text Shop: Advanced
 * @desc Make it easier to put together inventories for a shop.
 * WARNING: Does not allow for event-specific prices.
 *
 * @arg Step1
 * @text Step 1: Item ID's
 *
 * @arg Step1Start:num
 * @text Range Start
 * @parent Step1
 * @type item
 * @desc Select which Item ID to start from.
 * @default 1
 *
 * @arg Step1End:num
 * @text Range End
 * @parent Step1
 * @type item
 * @desc Select which Item ID to end at.
 * @default 4
 *
 * @arg Step2
 * @text Step 2: Weapon ID's
 *
 * @arg Step2Start:num
 * @text Range Start
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to start from.
 * @default 1
 *
 * @arg Step2End:num
 * @text Range End
 * @parent Step2
 * @type weapon
 * @desc Select which Weapon ID to end at.
 * @default 4
 *
 * @arg Step3
 * @text Step 3: Armor ID's
 *
 * @arg Step3Start:num
 * @text Range Start
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to start from.
 * @default 1
 *
 * @arg Step3End:num
 * @text Range End
 * @parent Step3
 * @type armor
 * @desc Select which Armor ID to end at.
 * @default 4
 *
 * @arg PurchaseOnly:eval
 * @text Step 4: Purchase Only?
 * @type boolean
 * @on Purchase-Only
 * @off Sell Accessible
 * @desc Make the shop purchase-only?
 * @default false
 * 
 * @arg Optional
 * 
 * @arg Blacklist:arraystr
 * @text Blacklisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to blacklist from the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
 * 
 * @arg Whitelist:arraystr
 * @text Whitelisted Categories
 * @parent Optional
 * @type string[]
 * @desc A list of categories to whitelist for the shop.
 * Not used if empty. Mark categories with <Category: x>
 * @default []
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
 * @param ItemsEquipsCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param ItemScene:struct
 * @text Item Menu Settings
 * @type struct<ItemScene>
 * @desc Change the Item Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","ListWindow":"","ListWindowCols:num":"1","ItemQt":"","MaxItems:num":"99","MaxWeapons:num":"99","MaxArmors:num":"99","ItemQuantityFmt:str":"×%1","ItemQuantityFontSize:num":"22","ShopStatusWindow":"","ShowShopStatus:eval":"true","ItemSceneAdjustItemList:eval":"true","ItemMenuStatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._itemWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._itemWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","ButtonAssist":"","buttonAssistCategory:str":"Switch Category"}
 *
 * @param Categories:struct
 * @text Item Categories
 * @parent ItemScene:struct
 * @type struct<Categories>
 * @desc Change the categories displayed in the Item/Shop menus.
 * @default {"MainList":"","List:arraystruct":"[\"{\\\"Type:str\\\":\\\"FieldUsable\\\",\\\"Icon:num\\\":\\\"208\\\"}\",\"{\\\"Type:str\\\":\\\"BattleUsable\\\",\\\"Icon:num\\\":\\\"218\\\"}\",\"{\\\"Type:str\\\":\\\"NeverUsable\\\",\\\"Icon:num\\\":\\\"302\\\"}\",\"{\\\"Type:str\\\":\\\"AllWeapons\\\",\\\"Icon:num\\\":\\\"97\\\"}\",\"{\\\"Type:str\\\":\\\"EType:2\\\",\\\"Icon:num\\\":\\\"128\\\"}\",\"{\\\"Type:str\\\":\\\"EType:3\\\",\\\"Icon:num\\\":\\\"131\\\"}\",\"{\\\"Type:str\\\":\\\"EType:4\\\",\\\"Icon:num\\\":\\\"137\\\"}\",\"{\\\"Type:str\\\":\\\"EType:5\\\",\\\"Icon:num\\\":\\\"145\\\"}\",\"{\\\"Type:str\\\":\\\"KeyItems\\\",\\\"Icon:num\\\":\\\"195\\\"}\"]","Style:str":"icon","TextAlign:str":"center","Vocabulary":"","HiddenItemA:str":"Special Items","HiddenItemB:str":"Unique Items","Consumable:str":"Consumable","Nonconsumable:str":"Nonconsumable","AlwaysUsable:str":"Usable","BattleUsable:str":"Battle","FieldUsable:str":"Field","NeverUsable:str":"Materials"}
 *
 * @param New:struct
 * @text NEW! Labels
 * @parent ItemScene:struct
 * @type struct<NewLabel>
 * @desc Change how NEW! Labels apply to your game project.
 * @default {"Enable:eval":"true","Icon:num":"0","Text:str":"NEW!","FontColor:str":"17","FontFace:str":"Verdana","FontSize:str":"16","FadeLimit:num":"360","FadeSpeed:num":"4","OffsetX:num":"0","OffsetY:num":"4"}
 *
 * @param EquipScene:struct
 * @text Equip Menu Settings
 * @type struct<EquipScene>
 * @desc Adjust the settings regarding the Equip Menu Scene.
 * @default {"General":"","EnableLayout:eval":"true","ParamValueFontSize:num":"22","MenuPortraits:eval":"true","DrawPortraitJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst x1 = padding;\\nconst x2 = this.innerWidth - 128 - padding;\\n\\n// Draw Menu Image\\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\\n\\n// Draw Data\\nthis.drawActorName(this._actor, x1, lineHeight * 0);\\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);\"","DrawFaceJS:func":"\"// Declare Variables\\nconst lineHeight = this.lineHeight();\\nconst gaugeLineHeight = this.gaugeLineHeight();\\nconst x = Math.floor(this.innerWidth / 2);\\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\\nlet dataHeight = lineHeight * 3;\\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\\n\\n// Draw Data\\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);\"","DrawParamJS:func":"\"// Declare variables\\nconst params = this.actorParams();\\nconst lineHeight = this.lineHeight();\\nconst padding = this.itemPadding();\\nconst baseX = 0;\\nconst baseY = this.innerHeight - params.length * lineHeight;\\nconst baseWidth = this.innerWidth;\\nconst valueFontSize = this.paramValueFontSize();\\n\\n// Calculate Widths\\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\\nparamNameWidth += padding * 2;\\nif (this.isUseParamNamesWithIcons()) {\\n    paramNameWidth += ImageManager.iconWidth + 4;\\n}\\nlet arrowWidth = this.rightArrowWidth();\\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\\n\\n// Draw Parameters\\nlet x = baseX;\\nlet y = baseY;\\nlet value = 0;\\nlet diffValue = 0;\\nlet alter = 2;\\nfor (const paramId of params) {\\n    // Draw Param Name\\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\\n    this.resetFontSettings();\\n    x += paramNameWidth;\\n\\n    // Draw Param Before\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\\n    this.resetFontSettings();\\n    x += paramValueWidth;\\n\\n    // Draw Arrow\\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\\n    this.drawRightArrow(x, y);\\n    x += arrowWidth;\\n\\n    // Draw Param After\\n    this.contents.fontSize = valueFontSize;\\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\\n    x += paramValueWidth;\\n\\n    // Draw Param Change\\n    if (totalDivides > 2) {\\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\\n    }\\n\\n    // Prepare Next Parameter\\n    x = baseX;\\n    y += lineHeight;\\n    alter = alter === 2 ? 1 : 2;\\n}\"","LayoutStyle:str":"upper/right","StatusWindowWidth:num":"312","DrawBackRect:eval":"true","BackRectColor:str":"19","CursedTextPopup:json":"\"%1 is cursed by %3%2!\"","Command":"","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconEquip:num":"136","equipCmdDesc:json":"\"Pick and choose equipment to change.\"","CommandAddOptimize:eval":"true","optimizeCmdDesc:json":"\"Equip the strongest available equipment.\"","CmdIconOptimize:num":"137","CommandAddClear:eval":"true","clearCmdDesc:json":"\"Remove all available equipment.\"","CmdIconClear:num":"135","RemoveEquip":"","RemoveEquipIcon:num":"16","RemoveEquipText:str":"Remove","ShiftShortcutKey:eval":"true","Rulings":"","EquipAdjustHpMp:eval":"true","NonRemoveETypes:arraynum":"[]","NonOptimizeETypes:arraynum":"[]","ButtonAssist":"","buttonAssistRemove:str":"Unequip"}
 *
 * @param ShopScene:struct
 * @text Shop Menu Settings
 * @type struct<ShopScene>
 * @desc Change the Shop Menu Scene settings.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","Command":"","CmdHideDisabled:eval":"true","CmdStyle:str":"auto","CmdTextAlign:str":"center","CmdIconBuy:num":"208","CmdIconSell:num":"314","CmdIconCancel:num":"82","CmdCancelRename:str":"Exit","Prices":"","SellPriceRate:num":"0.50","BuyPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","SellPriceJS:func":"\"// Declare variables\\nlet item = arguments[0];\\nlet price = arguments[1];\\n\\n// Return the finalized price\\nreturn price;\"","ButtonAssist":"","buttonAssistSmallIncrement:str":"-1/+1","buttonAssistLargeIncrement:str":"-10/+10"}
 *
 * @param StatusWindow:struct
 * @text Shop Status Window
 * @parent ShopScene:struct
 * @type struct<StatusWindow>
 * @desc Change the Item Status Window settings.
 * @default {"General":"","Width:num":"352","ParamChangeFontSize:num":"22","Translucent:num":"64","DrawBackRect:eval":"true","BackRectColor:str":"19","EquipData":"","AlreadyEquipMarker:str":"E","CannotEquipMarker:str":"-","EquipDelayMS:num":"240","NoChangeMarker:str":"-","DrawEquipData:func":"\"// Set Variables\\nconst lineHeight = this.lineHeight();\\nconst paramheight = this.gaugeLineHeight() + 8;\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name, Type, and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\nif (this.drawItemEquipType(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\n\\n// Draw Parameter Names\\nconst params = this.actorParams();\\nconst backY = y;\\ny = height - (params.length * paramheight) - 4;\\nlet paramX = x;\\nlet paramWidth = 0;\\nlet tableY = y;\\nfor (const paramId of params) {\\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\\n    y += paramheight;\\n}\\n\\n// Draw Actor Data\\nconst actorMax = $gameParty.maxBattleMembers();\\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\\nparamWidth = width - (actorWidth * actorMax);\\nfor (const actor of $gameParty.battleMembers()) {\\n    const index = $gameParty.battleMembers().indexOf(actor);\\n    const actorX = paramX + paramWidth + (index * actorWidth);\\n    this.changePaintOpacity(actor.canEquip(this._item));\\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\\n    let actorY = tableY;\\n\\n    // Draw Parameter Changes\\n    for (const paramId of params) {\\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\\n        actorY += paramheight;\\n    }\\n}\\n\\n// Draw Back Rectangles\\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\\nfor (let i = 0; i < actorMax; i++) {\\n    const actorX = paramX + paramWidth + (i * actorWidth);\\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\\n}\\nfor (const paramId of params) {\\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\\n    for (let i = 0; i < actorMax; i++) {\\n        const actorX = paramX + paramWidth + (i * actorWidth);\\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\\n    }\\n    tableY += paramheight;\\n}\"","ItemData":"","ItemGeneral":"","MaxIcons:num":"8","MultiplierStandard:num":"1000000","DrawItemData:func":"\"const lineHeight = this.lineHeight();\\nlet x = 0;\\nlet y = 0;\\nlet width = this.innerWidth;\\nlet height = this.innerHeight;\\nlet hw = Math.floor(width / 2);\\nlet hx = x + width - hw;\\n\\n// Draw Item Name and Quantity\\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\\nthis.drawItemDarkRect(x, y, width);\\ny += lineHeight;\\n\\n// Draw Main Item Properties\\nif (this.drawItemConsumable(x, y, hw)) y += 0;\\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\\nif (this._item.occasion < 3) {\\n    y = this.drawItemDamage(x, y, width);\\n    y = this.drawItemEffects(x, y, width);\\n}\\ny = this.drawItemCustomEntries(x, y, width);\\n\\n// Draw Remaining Item Properties\\nif (this._item.occasion < 3) {\\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemHitType(x, y, hw)) y += 0;\\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\\n}\\n\\n// Fill Rest of the Window\\nthis.drawItemDarkRect(x, y, width, height - y);\"","Vocabulary":"","LabelConsume:str":"Consumable","Consumable:str":"✔","NotConsumable:str":"✘","Occasions":"","Occasion0:str":"Anytime Use","Occasion1:str":"Battle-Only","Occasion2:str":"Field-Only","Occasion3:str":"-","Scope":"","Scope0:str":"No Target","Scope1:str":"1 Foe","Scope2:str":"All Foes","Scope3:str":"Random Foe","Scope4:str":"2 Random Foes","Scope5:str":"3 Random Foes","Scope6:str":"4 Random Foes","Scope7:str":"1 Ally","Scope8:str":"Alive Allies","Scope9:str":"Dead Ally","Scope10:str":"Dead Allies","Scope11:str":"User","Scope12:str":"Any Ally","Scope13:str":"All Allies","Scope14:str":"Everybody","BattleCore":"","ScopeRandomAny:str":"%1 Random Units","ScopeRandomEnemies:str":"%1 Random Foes","ScopeRandomAllies:str":"%1 Random Allies","ScopeAlliesButUser:str":"Other Allies","ScopeAllyOrEnemy:str":"Ally/Enemy","ScopeEnemyOrAlly:str":"Enemy/Ally","LabelSpeed:str":"Speed","Speed2000:str":"Fastest","Speed1000:str":"Faster","Speed1:str":"Fast","Speed0:str":"Normal","SpeedNeg999:str":"Slow","SpeedNeg1999:str":"Slower","SpeedNeg2000:str":"Slowest","LabelSuccessRate:str":"Accuracy","LabelRepeats:str":"Hits","LabelHitType:str":"Type","HitType0:str":"Neutral","HitType1:str":"Physical","HitType2:str":"Magical","LabelElement:str":"Element","ElementWeapon:str":"\\I[97]Weapon","ElementNone:str":"\\I[160]No Element","DamageType":"","DamageType1:str":"%1 Damage Multiplier","DamageType2:str":"%1 Damage Multiplier","DamageType3:str":"%1 Recovery Multiplier","DamageType4:str":"%1 Recovery Multiplier","DamageType5:str":"%1 Drain Multiplier","DamageType6:str":"%1 Drain Multiplier","Effects":"","LabelRecoverHP:str":"%1 Recovery","LabelRecoverMP:str":"%1 Recovery","LabelRecoverTP:str":"%1 Recovery","LabelSelfGainTP:str":"User %1","LabelDamageHP:str":"%1 Damage","LabelDamageMP:str":"%1 Damage","LabelDamageTP:str":"%1 Damage","LabelApply:str":"Applies","LabelRemove:str":"Removes"}
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
 * Item Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Item Menu Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ItemQt
 * @text Item Quantity
 *
 * @param MaxItems:num
 * @text Item Max
 * @parent ItemQt
 * @desc The default maximum quantity for items.
 * @default 99
 *
 * @param MaxWeapons:num
 * @text Weapon Max
 * @parent ItemQt
 * @desc The default maximum quantity for weapons.
 * @default 99
 *
 * @param MaxArmors:num
 * @text Armor Max
 * @parent ItemQt
 * @desc The default maximum quantity for armors.
 * @default 99
 *
 * @param ItemQuantityFmt:str
 * @text Quantity Format
 * @parent ItemQt
 * @desc How to display an item's quantity.
 * %1 - Item Quantity
 * @default ×%1
 *
 * @param ItemQuantityFontSize:num
 * @text Font Size
 * @parent ItemQt
 * @desc Default font size for item quantity.
 * @default 22
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Item Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Item Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param ItemSceneAdjustItemList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Item List Window in the Item Menu if using the Shop Status Window?
 * @default true
 *
 * @param ItemMenuStatusBgType:num
 * @text Background Type
 * @parent ShopStatusWindow
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
 * @param ItemMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Status Window in the Item Menu.
 * @default "const width = this.statusWidth();\nconst height = this._itemWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._itemWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistCategory:str
 * @text Switch Category
 * @parent ButtonAssist
 * @desc Button assist text used for switching categories.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Switch Category
 *
 */
/* ----------------------------------------------------------------------------
 * Item Categories
 * ----------------------------------------------------------------------------
 */
/*~struct~Categories:
 *
 * @param MainList
 * @text List
 * 
 * @param List:arraystruct
 * @text Category List
 * @parent MainList
 * @type struct<Category>[]
 * @desc A list of the item categories displayed in the Item/Shop menus.
 * @default ["{\"Type:str\":\"RegularItems\",\"Icon:num\":\"208\"}","{\"Type:str\":\"AllWeapons\",\"Icon:num\":\"97\"}","{\"Type:str\":\"AllArmors\",\"Icon:num\":\"137\"}","{\"Type:str\":\"KeyItems\",\"Icon:num\":\"195\"}"]
 *
 * @param Style:str
 * @text Category Style
 * @parent MainList
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw categorie entries in the Category Window?
 * @default icon
 *
 * @param TextAlign:str
 * @text Text Alignment
 * @parent MainList
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Decide how you want the text to be aligned.
 * @default center
 *
 * @param Vocabulary
 *
 * @param HiddenItemA:str
 * @text Hidden Item A
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Special Items
 *
 * @param HiddenItemB:str
 * @text Hidden Item B
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Unique Items
 *
 * @param Consumable:str
 * @text Consumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Consumable
 *
 * @param Nonconsumable:str
 * @text Nonconsumable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Nonconsumable
 *
 * @param AlwaysUsable:str
 * @text Always Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Usable
 *
 * @param BattleUsable:str
 * @text Battle Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Battle
 *
 * @param FieldUsable:str
 * @text Field Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Field
 *
 * @param NeverUsable:str
 * @text Never Usable
 * @parent Vocabulary
 * @desc How this category is named in the Item Menu.
 * @default Materials
 *
 */
/* ----------------------------------------------------------------------------
 * Category Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Category:
 *
 * @param Type:str
 * @text Type
 * @type combo
 * @option AllItems
 * @option 
 * @option RegularItems
 * @option KeyItems
 * @option HiddenItemA
 * @option HiddenItemB
 * @option 
 * @option Consumable
 * @option Nonconsumable
 * @option 
 * @option AlwaysUsable
 * @option BattleUsable
 * @option FieldUsable
 * @option NeverUsable
 * @option 
 * @option AllWeapons
 * @option WType:x
 * @option 
 * @option AllArmors
 * @option AType:x
 * @option 
 * @option EType:x
 * @option 
 * @option Category:x
 * @option
 * @desc A list of the item categories displayed in the Item/Shop
 * menus. Replace x with ID numbers or text.
 * @default RegularItems
 *
 * @param Icon:num
 * @text Icon
 * @desc Icon used for this category.
 * Use 0 for no icon.
 * @default 0
 *
 * @param SwitchID:num
 * @text Visibility Switch
 * @type switch
 * @desc This Switch must be turned ON in order for the category to show.
 * Use 0 for no Switch requirement.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * New Label Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NewLabel:
 *
 * @param Enable:eval
 * @text Use NEW! Labels?
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the NEW! Labels or not?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @desc The icon index used to represent the NEW! text.
 * Use 0 to not draw any icons.
 * @default 0
 *
 * @param Text:str
 * @text Text
 * @desc The text written on the NEW! Label.
 * @default NEW!
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param FontFace:str
 * @text Font Face
 * @parent Text:str
 * @desc Font face used for the NEW! Label.
 * @default Verdana
 *
 * @param FontSize:str
 * @text Font Size
 * @parent Text:str
 * @desc The font size used for the NEW! text.
 * @default 16
 *
 * @param FadeLimit:num
 * @text Fade Limit
 * @desc What's the upper opaque limit before reversing?
 * @default 360
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @desc What's the fade speed of the NEW! Label?
 * @default 4
 *
 * @param OffsetX:num
 * @text Offset X
 * @desc How much to offset the NEW! Label's X position by.
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @desc How much to offset the NEW! Label's Y position by.
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Equip Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/right
 *
 * @param ParamValueFontSize:num
 * @text Param Font Size
 * @parent EnableLayout:eval
 * @desc The font size used for parameter values.
 * @default 22
 *
 * @param MenuPortraits:eval
 * @text Show Menu Portraits?
 * @parent EnableLayout:eval
 * @type boolean
 * @on Use Portraits
 * @off Use Faces
 * @desc If Main Menu Core is installed, display the Menu Portraits
 * instead of the actor's face in the status window?
 * @default true
 *
 * @param DrawPortraitJS:func
 * @text JS: Portrait Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If Menu Portraits are available, this is code used to draw
 * the upper data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst x1 = padding;\nconst x2 = this.innerWidth - 128 - padding;\n\n// Draw Menu Image\nthis.drawItemActorMenuImage(this._actor, 0, 0, this.innerWidth, this.innerHeight);\n\n// Draw Data\nthis.drawActorName(this._actor, x1, lineHeight * 0);\nthis.drawActorClass(this._actor, x1, lineHeight * 1);\nthis.drawActorIcons(this._actor, x1, lineHeight * 2);\nthis.drawActorLevel(this._actor, x2, lineHeight * 0);\nthis.placeBasicGauges(this._actor, x2, lineHeight * 1);"
 *
 * @param DrawFaceJS:func
 * @text JS: Face Upper
 * @parent EnableLayout:eval
 * @type note
 * @desc If faces used used, this is code used to draw the upper
 * data like this in the Status Window.
 * @default "// Declare Variables\nconst lineHeight = this.lineHeight();\nconst gaugeLineHeight = this.gaugeLineHeight();\nconst x = Math.floor(this.innerWidth / 2);\nconst limitHeight = this.innerHeight - (this.actorParams().length * lineHeight);\nconst actorX = Math.floor((x - ImageManager.faceWidth) / 2);\nconst actorY = Math.max(0, Math.floor((limitHeight - ImageManager.faceHeight) / 2));\nlet dataHeight = lineHeight * 3;\ndataHeight += gaugeLineHeight * ($dataSystem.optDisplayTp ? 3 : 2);\nconst dataY = Math.max(0, Math.floor((limitHeight - dataHeight) / 2));\n\n// Draw Data\nthis.drawActorFace(this._actor, actorX, actorY, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorIcons(this._actor, actorX + 16, actorY + ImageManager.faceHeight - lineHeight);\nthis.drawActorName(this._actor, x, dataY + lineHeight * 0);\nthis.drawActorLevel(this._actor, x, dataY + lineHeight * 1);\nthis.drawActorClass(this._actor, x, dataY + lineHeight * 2);\nthis.placeBasicGauges(this._actor, x, dataY + lineHeight * 3);"
 *
 * @param DrawParamJS:func
 * @text JS: Parameter Lower
 * @parent EnableLayout:eval
 * @type note
 * @desc Code to determine how parameters are drawn in the
 * Status Window.
 * @default "// Declare variables\nconst params = this.actorParams();\nconst lineHeight = this.lineHeight();\nconst padding = this.itemPadding();\nconst baseX = 0;\nconst baseY = this.innerHeight - params.length * lineHeight;\nconst baseWidth = this.innerWidth;\nconst valueFontSize = this.paramValueFontSize();\n\n// Calculate Widths\nlet paramNameWidth = Math.max(...params.map(param => this.textWidth(TextManager.param(param))));\nparamNameWidth += padding * 2;\nif (this.isUseParamNamesWithIcons()) {\n    paramNameWidth += ImageManager.iconWidth + 4;\n}\nlet arrowWidth = this.rightArrowWidth();\nconst totalDivides = this.innerWidth >= 500 ? 3 : 2;\nlet paramValueWidth = Math.floor((baseWidth - paramNameWidth - arrowWidth) / totalDivides);\nparamNameWidth = baseWidth - (paramValueWidth * totalDivides) - arrowWidth;\n\n// Draw Parameters\nlet x = baseX;\nlet y = baseY;\nlet value = 0;\nlet diffValue = 0;\nlet alter = 2;\nfor (const paramId of params) {\n    // Draw Param Name\n    this.drawItemDarkRect(x, y, paramNameWidth, lineHeight, alter);\n    this.drawUpdatedParamName(paramId, x, y, paramNameWidth);\n    this.resetFontSettings();\n    x += paramNameWidth;\n\n    // Draw Param Before\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedBeforeParamValue(paramId, x, y, paramValueWidth);\n    this.resetFontSettings();\n    x += paramValueWidth;\n\n    // Draw Arrow\n    this.drawItemDarkRect(x, y, arrowWidth, lineHeight, alter);\n    this.drawRightArrow(x, y);\n    x += arrowWidth;\n\n    // Draw Param After\n    this.contents.fontSize = valueFontSize;\n    this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n    this.drawUpdatedAfterParamValue(paramId, x, y, paramValueWidth);\n    x += paramValueWidth;\n\n    // Draw Param Change\n    if (totalDivides > 2) {\n        this.drawItemDarkRect(x, y, paramValueWidth, lineHeight, alter);\n        this.drawUpdatedParamValueDiff(paramId, x, y, paramValueWidth);\n    }\n\n    // Prepare Next Parameter\n    x = baseX;\n    y += lineHeight;\n    alter = alter === 2 ? 1 : 2;\n}"
 *
 * @param StatusWindowWidth:num
 * @text Status Window Width
 * @parent General
 * @desc The usual width of the status window if using the 
 * non-Updated Equip Menu Layout.
 * @default 312
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param CursedTextPopup:json
 * @text Cursed Equip Popup
 * @parent General
 * @type note
 * @desc %1 - Actor, %2 - Equip, %3 - Icon. Text codes allowed.
 * Requires VisuMZ_0_CoreEngine! Empty to not use.
 * @default "%1 is cursed by %3%2!"
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconEquip:num
 * @text Equip Icon
 * @parent Command
 * @desc The icon used for the Equip command.
 * @default 136
 *
 * @param equipCmdDesc:json
 * @text Help Description
 * @parent CmdIconEquip:num
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Pick and choose equipment to change."
 *
 * @param CommandAddOptimize:eval
 * @text Add Optimize Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Optimize" command to the Command Window?
 * @default true
 *
 * @param optimizeCmdDesc:json
 * @text Help Description
 * @parent CommandAddOptimize:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Equip the strongest available equipment."
 *
 * @param CmdIconOptimize:num
 * @text Optimize Icon
 * @parent CommandAddOptimize:eval
 * @desc The icon used for the Optimize command.
 * @default 137
 *
 * @param CommandAddClear:eval
 * @text Add Clear Command?
 * @parent Command
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Clear" command to the Command Window?
 * @default true
 *
 * @param clearCmdDesc:json
 * @text Help Description
 * @parent CommandAddClear:eval
 * @type note
 * @desc Help description used when this command is selected.
 * Text codes allowed.
 * @default "Remove all available equipment."
 *
 * @param CmdIconClear:num
 * @text Clear Icon
 * @parent CommandAddClear:eval
 * @desc The icon used for the Clear command.
 * @default 135
 *
 * @param RemoveEquip
 * @text Remove Equip
 *
 * @param RemoveEquipIcon:num
 * @text Icon
 * @parent RemoveEquip
 * @desc Icon used for equipment removal.
 * @default 16
 *
 * @param RemoveEquipText:str
 * @text Text
 * @parent RemoveEquip
 * @desc Text used for equipment removal.
 * @default Remove
 *
 * @param ShiftShortcutKey:eval
 * @text Use SHIFT Shortcut?
 * @parent RemoveEquip
 * @type boolean
 * @on Use
 * @off Don't
 * @desc Add the "Shift" button as a shortcut key to removing items?
 * @default true

 * @param Rulings
 *
 * @param EquipAdjustHpMp:eval
 * @text Equip-Adjust HP/MP
 * @parent Rulings
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Adjust HP/MP differences after changing equips with MaxHP/MaxMP values.
 * @default true
 * 
 * @param NonRemoveETypes:arraynum
 * @text Non-Removable Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that must always have
 * an item equipped and cannot be empty.
 * @default []
 *
 * @param NonOptimizeETypes:arraynum
 * @text Non-Optimized Types
 * @parent Rulings
 * @type number[]
 * @min 1
 * @max 100
 * @desc Insert ID's of the Equipment Types that will be ignored
 * when equipment is being optimized.
 * @default []
 *
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistRemove:str
 * @text SHIFT: Remove
 * @parent ButtonAssist
 * @desc Button assist text used for the SHIFT Remove Shortcut.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default Unequip
 * 
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Scene Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopScene:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Shop Layout provided by this plugin?
 * This will override the Core Engine windows settings.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param Switches
 *
 * @param SwitchBuy:num
 * @text Switch: Buy
 * @parent Switches
 * @type switch
 * @desc Buying items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param SwitchSell:num
 * @text Switch: Sell
 * @parent Switches
 * @type switch
 * @desc Selling items in the Shop Scene turns this Switch to ON.
 * Switch reverts to OFF whenever the Shop Scene opens.
 * @default 0
 *
 * @param Command
 * @text Command Window
 *
 * @param CmdHideDisabled:eval
 * @text Hide Unavailable?
 * @parent Command
 * @type boolean
 * @on Hide
 * @off Default
 * @desc Hide all unavailable commands like when a shop is set to Purchase Only?
 * @default true
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Command
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Command
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Command Window.
 * @default center
 *
 * @param CmdIconBuy:num
 * @text Buy Icon
 * @parent Command
 * @desc The icon used for the Buy command.
 * @default 208
 *
 * @param CmdIconSell:num
 * @text Sell Icon
 * @parent Command
 * @desc The icon used for the Sell command.
 * @default 314
 *
 * @param CmdIconCancel:num
 * @text Cancel Icon
 * @parent Command
 * @desc The icon used for the Cancel command.
 * @default 82
 *
 * @param CmdCancelRename:str
 * @text Rename "Cancel"
 * @parent Command
 * @desc Rename Cancel to something more logical for the Shop Menu Scene.
 * @default Exit
 *
 * @param Prices
 *
 * @param SellPriceRate:num
 * @text Sell Price Rate
 * @parent Prices
 * @desc The default sell price rate.
 * @default 0.50
 *
 * @param BuyPriceJS:func
 * @text JS: Buy Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the buy price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 *
 * @param SellPriceJS:func
 * @text JS: Sell Price
 * @parent Prices
 * @type note
 * @desc Modificatons made to the sell price before finalizing it.
 * @default "// Declare variables\nlet item = arguments[0];\nlet price = arguments[1];\n\n// Return the finalized price\nreturn price;"
 * 
 * @param ButtonAssist
 * @text Button Assist Window
 *
 * @param buttonAssistSmallIncrement:str
 * @text Small Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -1/+1
 *
 * @param buttonAssistLargeIncrement:str
 * @text Large Increment
 * @parent ButtonAssist
 * @desc Text used for changing amount bought/sold.
 * For VisuStella MZ's Core Engine's Button Assist Window.
 * @default -10/+10
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Status Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusWindow:
 *
 * @param General
 *
 * @param Width:num
 * @text Window Width
 * @parent General
 * @desc The usual width of the status window.
 * @default 352
 *
 * @param ParamChangeFontSize:num
 * @text Parameter Font Size
 * @parent General
 * @desc Font size used for parameter changes.
 * @default 22
 *
 * @param Translucent:num
 * @text Translucent Opacity
 * @parent General
 * @desc Opacity setting used for translucent window objects.
 * @default 64
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EquipData
 * @text Equipment Data
 *
 * @param AlreadyEquipMarker:str
 * @text Already Equipped
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default E
 *
 * @param CannotEquipMarker:str
 * @text Can't Equip
 * @parent EquipData
 * @desc Marker used to show an actor cannot equip an item.
 * @default -
 *
 * @param EquipDelayMS:num
 * @text Delay MS
 * @parent EquipData
 * @type number
 * @min 1
 * @max 999
 * @desc How many milliseconds (MS) to delay the preview update?
 * This is to prevent lag spikes for equips only.
 * @default 240
 *
 * @param NoChangeMarker:str
 * @text No Changes
 * @parent EquipData
 * @desc Marker used to show no changes have occurred.
 * @default -
 *
 * @param DrawEquipData:func
 * @text JS: Draw Equip Data
 * @parent EquipData
 * @type note
 * @desc Code used to draw the equipment data for the Shop Status Window.
 * @default "// Set Variables\nconst lineHeight = this.lineHeight();\nconst paramheight = this.gaugeLineHeight() + 8;\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name, Type, and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\nif (this.drawItemEquipType(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\n\n// Draw Parameter Names\nconst params = this.actorParams();\nconst backY = y;\ny = height - (params.length * paramheight) - 4;\nlet paramX = x;\nlet paramWidth = 0;\nlet tableY = y;\nfor (const paramId of params) {\n    paramWidth = Math.max(this.drawParamName(paramId, x + 4, y + 4, width), paramWidth);\n    y += paramheight;\n}\n\n// Draw Actor Data\nconst actorMax = $gameParty.maxBattleMembers();\nconst actorWidth = Math.floor((width - paramWidth) / actorMax);\nparamWidth = width - (actorWidth * actorMax);\nfor (const actor of $gameParty.battleMembers()) {\n    const index = $gameParty.battleMembers().indexOf(actor);\n    const actorX = paramX + paramWidth + (index * actorWidth);\n    this.changePaintOpacity(actor.canEquip(this._item));\n    this.drawActorCharacter(actor, actorX + (actorWidth / 2), tableY);\n    let actorY = tableY;\n\n    // Draw Parameter Changes\n    for (const paramId of params) {\n        const diffY = actorY - ((lineHeight - paramheight) / 2);\n        this.drawActorParamDifference(actor, paramId, actorX, diffY, actorWidth);\n        actorY += paramheight;\n    }\n}\n\n// Draw Back Rectangles\nthis.drawItemDarkRect(paramX, backY, paramWidth, tableY - backY);\nfor (let i = 0; i < actorMax; i++) {\n    const actorX = paramX + paramWidth + (i * actorWidth);\n    this.drawItemDarkRect(actorX, backY, actorWidth, tableY - backY);\n}\nfor (const paramId of params) {\n    this.drawItemDarkRect(paramX, tableY, paramWidth, paramheight);\n    for (let i = 0; i < actorMax; i++) {\n        const actorX = paramX + paramWidth + (i * actorWidth);\n        this.drawItemDarkRect(actorX, tableY, actorWidth, paramheight);\n    }\n    tableY += paramheight;\n}"
 *
 * @param ItemData
 * @text Item Data
 *
 * @param ItemGeneral
 * @parent ItemData
 *
 * @param MaxIcons:num
 * @text Max State/Buff Icons
 * @parent ItemGeneral
 * @desc Maximum number of icons that can be displayed for Add/Remove States/Buffs.
 * @default 8
 *
 * @param MultiplierStandard:num
 * @text Multiplier Standard
 * @parent ItemGeneral
 * @desc Constant standard to filter out random values when calculating the damage multiplier.
 * @default 1000000
 *
 * @param DrawItemData:func
 * @text JS: Draw Item Data
 * @parent ItemGeneral
 * @type note
 * @desc Code used to draw the item data for the Shop Status Window.
 * @default "const lineHeight = this.lineHeight();\nlet x = 0;\nlet y = 0;\nlet width = this.innerWidth;\nlet height = this.innerHeight;\nlet hw = Math.floor(width / 2);\nlet hx = x + width - hw;\n\n// Draw Item Name and Quantity\nthis.drawItemName(this._item, x + this.itemPadding(), y, width - this.itemPadding() * 2);\nthis.drawItemDarkRect(x, y, width);\ny += lineHeight;\n\n// Draw Main Item Properties\nif (this.drawItemConsumable(x, y, hw)) y += 0;\nif (this.drawItemQuantity(hx, y, hw)) y += lineHeight;\nif (this._item.occasion < 3) {\n    y = this.drawItemDamage(x, y, width);\n    y = this.drawItemEffects(x, y, width);\n}\ny = this.drawItemCustomEntries(x, y, width);\n\n// Draw Remaining Item Properties\nif (this._item.occasion < 3) {\n    if (this.drawItemOccasion(x, y, hw)) y += 0;\n    if (this.drawItemScope(hx, y, hw)) y += lineHeight;\n    if (this.drawItemHitType(x, y, hw)) y += 0;\n    if (this.drawItemSuccessRate(hx, y, hw)) y += lineHeight;\n    if (this.drawItemSpeed(x, y, hw)) y += 0;\n    if (this.drawItemRepeats(hx, y, hw)) y += lineHeight;\n}\n\n// Fill Rest of the Window\nthis.drawItemDarkRect(x, y, width, height - y);"
 *
 * @param Vocabulary
 * @parent ItemData
 *
 * @param LabelConsume:str
 * @text Consumable
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Consumable
 *
 * @param Consumable:str
 * @text Yes
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✔
 *
 * @param NotConsumable:str
 * @text No
 * @parent LabelConsume:str
 * @desc Vocabulary used for this data entry.
 * @default ✘
 *
 * @param Occasions
 * @parent Vocabulary
 *
 * @param Occasion0:str
 * @text Always
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Anytime Use
 *
 * @param Occasion1:str
 * @text Battle Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Battle-Only
 *
 * @param Occasion2:str
 * @text Menu Screen
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default Field-Only
 *
 * @param Occasion3:str
 * @text Never
 * @parent Occasions
 * @desc Vocabulary used for this data entry.
 * @default -
 *
 * @param Scope
 * @parent Vocabulary
 *
 * @param Scope0:str
 * @text None
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default No Target
 *
 * @param Scope1:str
 * @text 1 Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Foe
 *
 * @param Scope2:str
 * @text All Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Foes
 *
 * @param Scope3:str
 * @text 1 Random Enemy
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Random Foe
 *
 * @param Scope4:str
 * @text 2 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 2 Random Foes
 *
 * @param Scope5:str
 * @text 3 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 3 Random Foes
 *
 * @param Scope6:str
 * @text 4 Random Enemies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 4 Random Foes
 *
 * @param Scope7:str
 * @text 1 Ally
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default 1 Ally
 *
 * @param Scope8:str
 * @text All Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Alive Allies
 *
 * @param Scope9:str
 * @text 1 Ally (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Ally
 *
 * @param Scope10:str
 * @text All Allies (Dead)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Dead Allies
 *
 * @param Scope11:str
 * @text The User
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default User
 *
 * @param Scope12:str
 * @text 1 Ally (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Any Ally
 *
 * @param Scope13:str
 * @text All Allies (DoA)
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default All Allies
 *
 * @param Scope14:str
 * @text Enemies & Allies
 * @parent Scope
 * @desc Vocabulary used for this data entry.
 * @default Everybody
 *
 * @param BattleCore
 * @text Battle Core Support
 * @parent Vocabulary
 *
 * @param ScopeRandomAny:str
 * @text x Random Any
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Any> notetag.
 * @default %1 Random Units
 *
 * @param ScopeRandomEnemies:str
 * @text x Random Enemies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Enemies> notetag.
 * @default %1 Random Foes
 *
 * @param ScopeRandomAllies:str
 * @text x Random Allies
 * @parent BattleCore
 * @desc Vocabulary used for <Target: x Random Allies> notetag.
 * @default %1 Random Allies
 *
 * @param ScopeAlliesButUser:str
 * @text All Allies But User
 * @parent BattleCore
 * @desc Vocabulary used for <Target: All Allies But User> notetag.
 * @default Other Allies
 *
 * @param ScopeAllyOrEnemy:str
 * @text Ally or Enemy
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Ally or Enemy> notetag.
 * @default Ally/Enemy
 *
 * @param ScopeEnemyOrAlly:str
 * @text Enemy or Ally
 * @parent BattleCore
 * @desc Vocabulary used for <Target: Enemy or Ally> notetag.
 * @default Enemy/Ally
 *
 * @param LabelSpeed:str
 * @text Speed
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Speed
 *
 * @param Speed2000:str
 * @text >= 2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fastest
 *
 * @param Speed1000:str
 * @text >= 1000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Faster
 *
 * @param Speed1:str
 * @text >= 1 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Fast
 *
 * @param Speed0:str
 * @text == 0 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Normal
 *
 * @param SpeedNeg999:str
 * @text >= -999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slow
 *
 * @param SpeedNeg1999:str
 * @text >= -1999 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slower
 *
 * @param SpeedNeg2000:str
 * @text <= -2000 Speed
 * @parent LabelSpeed:str
 * @desc Vocabulary used for this data entry.
 * @default Slowest
 *
 * @param LabelSuccessRate:str
 * @text Success Rate
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Accuracy
 *
 * @param LabelRepeats:str
 * @text Repeats
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Hits
 *
 * @param LabelHitType:str
 * @text Hit Type
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Type
 *
 * @param HitType0:str
 * @text Certain Hit
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Neutral
 *
 * @param HitType1:str
 * @text Physical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Physical
 *
 * @param HitType2:str
 * @text Magical
 * @parent LabelHitType:str
 * @desc Vocabulary used for this data entry.
 * @default Magical
 *
 * @param LabelElement:str
 * @text Element
 * @parent Vocabulary
 * @desc Vocabulary used for this data entry.
 * @default Element
 *
 * @param ElementWeapon:str
 * @text Weapon-Based
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[97]Weapon
 *
 * @param ElementNone:str
 * @text Nonelement Element
 * @parent LabelElement:str
 * @desc Vocabulary used for this data entry.
 * @default \I[160]No Element
 *
 * @param DamageType
 * @text Damage Type
 * @parent Vocabulary
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry. If Visu_1_BattleCore
 * is installed, priority goes to its Damage Style settings.
 * @default %1 Drain Multiplier
 *
 * @param Effects
 * @parent Vocabulary
 *
 * @param LabelRecoverHP:str
 * @text Recover HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverMP:str
 * @text Recover MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelRecoverTP:str
 * @text Recover TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery
 *
 * @param LabelSelfGainTP:str
 * @text Self Gain TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default User %1
 *
 * @param LabelDamageHP:str
 * @text Damage HP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageMP:str
 * @text Damage MP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelDamageTP:str
 * @text Damage TP
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage
 *
 * @param LabelApply:str
 * @text Add State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Applies
 *
 * @param LabelRemove:str
 * @text Remove State/Buff
 * @parent Effects
 * @desc Vocabulary used for this data entry.
 * @default Removes
 *
 */
//=============================================================================

const _0x2e9347=_0x4987;(function(_0x502a84,_0x2621ff){const _0x1354e2=_0x4987,_0x495ac3=_0x502a84();while(!![]){try{const _0xb40e78=-parseInt(_0x1354e2(0x62b))/0x1+-parseInt(_0x1354e2(0x3d0))/0x2*(-parseInt(_0x1354e2(0x483))/0x3)+-parseInt(_0x1354e2(0x2ef))/0x4*(-parseInt(_0x1354e2(0x5e5))/0x5)+parseInt(_0x1354e2(0x535))/0x6+parseInt(_0x1354e2(0x682))/0x7+-parseInt(_0x1354e2(0x634))/0x8*(parseInt(_0x1354e2(0x434))/0x9)+-parseInt(_0x1354e2(0x389))/0xa;if(_0xb40e78===_0x2621ff)break;else _0x495ac3['push'](_0x495ac3['shift']());}catch(_0x1ed34a){_0x495ac3['push'](_0x495ac3['shift']());}}}(_0x20e2,0x6fa34));var label='ItemsEquipsCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x2e9347(0x4aa)](function(_0x3fe0e8){const _0x225fd9=_0x2e9347;return _0x3fe0e8[_0x225fd9(0x185)]&&_0x3fe0e8['description'][_0x225fd9(0x5e8)]('['+label+']');})[0x0];function _0x20e2(){const _0x45f5a6=['ylwDu','MaxItems','user','troopArtifacts','xAevU','drawEquipData','isWeapon','trim','eADLF','fSqoq','LabelSelfGainTP','Game_Party_initialize','SCOPE','ScopeRandomAny','iTkBa','EFFECT_RECOVER_MP','Game_BattlerBase_paramPlus_artifact','call','Game_Actor_tradeItemWithParty','addInnerChild','AfbeT','HazFH','itypeId','rateHP','fontFace','currentSymbol','calcEquipItemPerformance','_dummyWindow','igPXK','FUNC','VisuMZ_1_MainMenuCore','getItemConsumableText','canShiftRemoveEquipment','_newLabelSprites','zBqkz','getItemEffectsTpRecoveryText','getMatchingInitEquip','getProxyItem','Game_Actor_changeEquip','4447386VUymnV','_sellWindow','visible','CursedTextPopup','max','Consumable','drawTextEx','BuyPriceJS','isDrawItemNumber','MultiplierStandard','wtypeId','gaugeBackColor','pOeIq','consumeItem','getItemEffectsTpDamageText','TULpm','MP\x20DAMAGE','iCdil','start','Width','Scene_Shop_commandWindowRect','FontFace','LabelRepeats','Scene_Item_categoryWindowRect','EFFECT_ADD_STATE','DrawParamJS','shouldCommandWindowExist','HSNzh','addOptimizeCommand','BnUeV','playCursorSound','SbeBW','Window_ShopCommand_initialize','meetsItemConditionsJS','Scene_Shop_doBuy','Window_Selectable_initialize','Parse_Notetags_ParamJS','FadeLimit','WVXVV','processHandling','_newLabelOpacityUpperLimit','Scene_Shop_activateSellWindow','object','DAMAGE\x20MULTIPLIER','KeyItemProtect','MDF','LabelConsume','ogegX','FJFiZ','addStateBuffChanges','meetsClassRequirements','onBuyCancelItemsEquipsCore','isClearCommandAdded','_getEquipRequirements','drawNewLabelText','Window_EquipCommand_initialize','pagedown','cursorPageup','drawItemSuccessRate','_data','getTextColor','categoryList','UqdCT','isPageChangeRequested','EquipScene','Game_Actor_isEquipChangeOk','value1','getMenuImage','windowPadding','Window_ItemCategory_setItemWindow','XhlOs','MANUAL','Gqgsc','getColor','isClicked','getInputMultiButtonStrings','getItemDamageElementLabel','DniGT','pageup','muKrU','_equips','bQLyS','Qtisp','xbFve','yqDlo','HdTCJ','refreshCursor','zAkwg','maxCols','hBOVc','mUJhg','vxPtG','100%','processShopCondListingOnSellItem','newLabelEnabled','List','HiddenItemB','bLzNR','drawItem','prepareNewEquipSlotsOnLoad','UFrnT','drawItemEffectsHpRecovery','LabelDamageTP','optimizeEquipments','PatKQ','AllArmors','aJVdB','FbCjH','right','_goodsCount','ParamValueFontSize','releaseUnequippableItems','drawItemDarkRect','center','createSellWindow','name','kGhEw','ParseItemNotetags','occasion','item-%1','buyWindowRect','optKeyItemsNumber','ARRAYSTRUCT','+%1%','Scene_Item_createCategoryWindow','SwitchID','SetupProxyItemGroup','Game_BattlerBase_param_artifact','clamp','jQGZg','fHLQy','ShopListingRegExp','processShiftRemoveShortcut','HitType%1','JpiNC','_tempActor','WakJW','jGqjA','deactivate','getShopTrackingGoldSell','EFFECT_REMOVE_DEBUFF','EpfZn','numberWindowRectItemsEquipsCore','Window_Selectable_update','ywzYQ','Scene_Shop_sellWindowRect','clear','oPfCV','updateCategoryNameWindow','_shopStatusMenuAlly','PurchaseOnly','lyRqj','LUK','KtpQC','STRUCT','Scope7','Game_Party_consumeItem','NwbBB','mdf','isHandled','elementId','HiddenItemA','drawItemEffectsTpDamage','Scene_Shop_sellingPrice','CehBw','type','CommandAddOptimize','ActorResetEquipSlots','getItemSuccessRateLabel','alterSkillName','meetsItemConditions','IyZxO','SellPriceRate','sScLY','artifactIDs','Scene_ItemBase_activateItemWindow','5rAnczV','buttonAssistItemListRequirement','MaxIcons','includes','\x5cI[%1]%2','Speed1000','loseItem','commandNameWindowDrawBackground','GTfGR','onSlotOkAutoSelect','drawItemEffectsHpDamage','FontSize','numberWindowRect','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','makeItemData','Window_ItemList_maxCols','gFLPA','oYaqO','drawItemCustomEntryLine','select','fpxut','Step1Start','isHovered','setHelpWindowItem','partyArtifactIDs','drawNewLabelIcon','qgOYu','addSellCommand','getEtypeIdWithName','_buttonAssistWindow','ItemQuantityFontSize','dQRzb','playBuzzerSound','defaultItemMax','SellTurnSwitchOn','drawItemKeyData','RemoveEquipIcon','Game_Party_gainItem','drawActorCharacter','isSceneShop','itemEnableJS','onCategoryCancel','prepare','VisuMZ_1_BattleCore','jnIyC','FMXaB','_getClassRequirements','drawItemEffectsSelfTpGain','paramJS','jAtPv','initNewLabelSprites','getWeaponIdWithName','placeItemNewLabel','iKLmH','itemWindowRectItemsEquipsCore','getItemEffectsMpRecoveryLabel','gJySY','jlxYi','_resetFontSize','SwitchSell','StatusWindowWidth','_scrollDuration','Scene_Item_create','repeats','setHp','setNewItem','NoChangeMarker','oIhjD','IZePe','CZaTy','782614eqlGPn','LabelRecoverHP','eSGHp','wbcdu','xzjdH','DrawEquipData','commandSell','Game_Enemy_traitObjects_artifact','buttonAssistKey3','168shakzL','characterName','SRWlZ','isBattleTest','getArmorIdWithName','IconSet','LChwA','clearCmdDesc','revertGlobalNamespaceVariables','paramBase','IFhmL','refreshActor','VpuaH','getItemEffectsTpRecoveryLabel','doLCB','deepCopy','Game_Party_gainItem_artifact','isHoverEnabled','uiHelpPosition','updateChangedSlots','getPurifyTransformation','_weaponIDs','createItemWindow','FieldUsable','Fxhex','Scene_Equip_helpWindowRect','cAkhH','drawItemData','battleMembers','cYseu','WVkXo','OTgpC','constructor','prototype','equipAdjustHpMp','Scene_Shop_commandBuy','isOpen','drawItemActorMenuImage','drawItemStyleIcon','isPartyArtifact','artifacts','DrawFaceJS','drawItemEffectsMpRecovery','clearEquipments','statusWidth','partyArtifacts','proxyItem','Scene_Equip_statusWindowRect','OCITG','SLfbx','ExtDisplayedParams','buttonAssistText1','isUseParamNamesWithIcons','mhp','iconWidth','tpGain','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','loadFaceImages','yPwFv','ItemScene','armor','addItemCategories','rGdCO','yDgJW','New','clearNewLabelFromItem','allowCommandWindowCursorUp','HqMwB','0000','DrxxY','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MaxHP\x20=\x200;\x20let\x20MaxMP\x20=\x200;\x20let\x20ATK\x20=\x200;\x20let\x20DEF\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20MAT\x20=\x200;\x20let\x20MDF\x20=\x200;\x20let\x20AGI\x20=\x200;\x20let\x20LUK\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20[MaxHP,\x20MaxMP,\x20ATK,\x20DEF,\x20MAT,\x20MDF,\x20AGI,\x20LUK][paramId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20','paramchangeTextColor','jZImJ','LpvBT','commandWindowRectItemsEquipsCore','itemLineRect','money','BuyTurnSwitchOff','5226256qRExpS','nonRemovableEtypes','setValue','Window_ItemList_drawItem','CmdIconClear','processCursorHomeEndTrigger','bQXTw','getShopTrackingGoldBuy','Window_ShopStatus_setItem','makeDeepCopy','ActorChangeEquipSlots','refreshDelay','ParseWeaponNotetags','GGWdC','miGSa','Scene_Item_helpWindowRect','toLowerCase','LabelSuccessRate','createCategoryNameWindow','xODrs','QJMMo','WTMcC','PFAwJ','_doubleTouch','Icon','drawItemName','helpWindowRectItemsEquipsCore','TbEuj','mainFontSize','kDjcF','yCSvY','paramPlus','EQUIP_DELAY_MS','map','buttonAssistText2','RemoveEquipText','oxkhR','HuTEW','gcori','getItemDamageAmountLabel','swfGF','powerUpColor','changeTextColor','abxvC','getItemSuccessRateText','left','pGuWf','possession','_allowArtifactTraitObjects','ItemQuantityFmt','buttonAssistSmallIncrement','DyUGl','getItemDamageAmountLabelOriginal','fCEHz','Text','createBitmap','resetTextColor','_slotWindow','textWidth','_slotId','effects','Window_EquipStatus_refresh','VFcxQ','categories','agi','SellTurnSwitchOff','getItemEffectsMpDamageText','Remove\x20all\x20available\x20equipment.','determineBaseSellingPrice','_handlers','cDXZi','fontSizeRatio','some','processDrawIcon','CmdIconBuy','elements','optimize','vJcOJ','registerCommand','onSlotCancel','CBKzL','_classIDs','concat','etypeId','yaxId','isEquipItem','Scene_Shop_helpWindowRect','TQqZY','AcPqa','postCreateSellWindowItemsEquipsCore','setTopRow','isEquipAtypeOk','commandBuyItemsEquipsCore','(+%1)','getInputButtonString','gainItem','setTempActor','LabelSpeed','Btgrb','isShiftRemoveShortcutEnabled','loadPicture','postCreateItemsEquipsCore','yWXtY','fjInp','number','TxkbJ','scope','isCancelled','PEIVY','getItemDamageAmountTextBattleCore','gjAtT','JbUSb','yPQtM','clearNewItem','BUuvu','isArtifact','Slots','Type','damage','_commandNameWindow','TIfUn','BEehd','rKKov','\x5cI[%1]','status','Window_EquipItem_includes','numItems','CMRCH','onMenuImageLoad','iconText','cursorDown','checkShiftRemoveShortcut','ShowShopStatus','EquipDelayMS','uKNRJ','HQkRI','xJncP','hideAdditionalSprites','weapon','_goods','Param','drawCustomShopGraphicLoad','loadCharacter','consumable','category','Scene_Shop_buyingPrice','FontColor','Mxees','getEtypeIDsCache','drawItemEffectsRemovedStatesBuffs','VQoho','itemTextAlign','drawText','vroJk','Scene_Shop_onSellCancel','SUCCESS\x20RATE','SfhwI','_itemIDs','version','DrawPortraitJS','down','getItemEffectsHpDamageLabel','tradeItemWithParty','ceil','CommandAddClear','Window_ItemList_item','tBUXw','buttonAssistOffset3','initialize','nMuMR','Scene_Equip_commandWindowRect','vkqMF','onTouchSelectModernControls','LabelHitType','FFKTr','equip','getPrototypeOf','EquipAdjustHpMp','process_VisuMZ_ItemsEquipsCore_EquipSlots','test','ConvertNumberToString','CmdIconSell','hMSQd','categoryWindowRectItemsEquipsCore','smallParamFontSize','CECzW','onBuyCancel','getItemDamageAmountLabelBattleCore','forceChangeEquipSlots','getEmptyEquipSlotOfSameEtype','DVeLm','_scene','paramId','zWkJB','goodsToItem','YPcqT','getItemEffectsSelfTpGainLabel','getItemsEquipsCoreBackColor1','_purchaseOnly','PurifyParty','_itemWindow','jTBvB','_helpWindow','slotWindowRectItemsEquipsCore','MaxWeapons','adjustHiddenShownGoods','_categoryNameWindow','nonOptimizeEtypes','getItemEffectsSelfTpGainText','shift','initEquips','lhzdp','HIT\x20TYPE','getItemsEquipsCoreBackColor2','isOptimizeEquipOk','categoryStyleCheck','drawItemEffectsMpDamage','helpDescriptionText','isEquipTypeSealed','_checkEquipRequirements','HRWFg','Window_EquipItem_isEnabled','drawCustomShopGraphic','getShopTrackingItemBuy','getItemEffectsHpDamageText','weaponTypes','createStatusWindow','lLAaL','changeEquipBase','fontSize','VdMWx','armors','jRjbF','iconIndex','TVhaX','text','yMPVV','canUse','EFFECT_REMOVE_BUFF','TP\x20RECOVERY','match','cursorPagedown','actorParams','floor','Equip\x20the\x20strongest\x20available\x20equipment.','itemPadding','isOptimizeCommandAdded','W%1','RzOxq','addWindow','Scene_Equip_slotWindowRect','_shopStatusMenuMode','LabelDamageHP','VisuMZ_0_CoreEngine','isItem','ScopeRandomEnemies','onSlotOk','Settings','toUpperCase','isStackableArtifact','drawing','siixq','_shopTrackingData','sVsyE','makeCommandList','paramValueByName','ItemMenuStatusBgType','statusWindowRectItemsEquipsCore','hasItem','_category','isEquipWtypeOk','MbvQS','getItemEffectsTpDamageLabel','categoryWindowRect','width','LzblN','cursorUp','SetupArtifactItemIDs','AIZrh','canEquipArmor','armorTypes','drawItemNumber','USER\x20TP\x20GAIN','processCursorSpecialCheckModernControls','innerWidth','NZgmw','buttonAssistLargeIncrement','NMwpV','popScene','DrawBackRect','removeDebuff','ITEMS_EQUIPS_CORE','HRieC','drawItemOccasion','indexOf','lZBKd','iconHeight','NotConsumable','parse','addCommand','Enable','nNJyE','_calculatingJSParameters','getItemEffectsMpDamageLabel','NhMCo','VesRN','yVEXb','_actor','height','icon','HideAnySwitches','EVAL','Scene_Shop_commandSell','dZIdg','itemAt','hideDisabledCommands','bind','changeBuff','IwGTk','ukbPQ','Nonconsumable','AlwaysUsable','drawParamsItemsEquipsCore','onBuyOk','return\x200','getItemEffectsAddedStatesBuffsLabel','createCommandWindow','active','yjUpx','description','DEF','postCreateSlotWindowItemsEquipsCore','replace','mainAreaBottom','boxWidth','addCancelCommand','mainAreaTop','allowShiftScrolling','CDwgZ','aAQXB','bIBrb','ZuWoD','ULkEO','PhUth','plbih','drawIcon','Gvpjs','drawItemCustomEntries','JUxNn','calcWindowHeight','contents','Hogtp','getItemDamageAmountText','activateItemWindow','mpRate','REMOVED\x20EFFECTS','gaugeLineHeight','buyWindowRectItemsEquipsCore','drawItemEquipType','normalColor','fFGqy','changeEquipById','_cache_etypeIDs','mmp','QUANTITY','adjustItemWidthByStatus','maxBattleMembers','nUtZq','Scene_Shop_numberWindowRect','resetShopSwitches','lCPnA','smoothSelect','uGLPB','random','isSellCommandEnabled','keyItem','getItemScopeText','textSizeEx','Window_ShopBuy_item','commandBuy','inBattle','fCXyH','wmRlQ','buy','drawUpdatedParamValueDiff','dpOHl','Categories','OapHR','hitType','_etypeIDs','Hauzr','isRightInputMode','OKhCJ','LabelRecoverMP','equips','commandNameWindowDrawText','OCCASION','every','getItemSpeedLabel','flatHP','helpDesc','colSpacing','gainTP','kPKXv','DjeTQ','_tempActorA','troopArtifactIDs','addShopTrackingGoldSell','categoryItemTypes','contentsBack','ShopScene','bestEquipItem','PMBda','KeyItems','removeState','getDamageStyle','setItemWindow','level','getItemIdWithName','dataId','kOPDq','_list','isLearnedSkill','ElementNone','CmdTextAlign','weOSZ','lMJxM','removeBuff','HVPpu','Window_ShopSell_isEnabled','GOywh','AcMFO','xzrFL','addShopTrackingGoldBuy','createNewLabelSprite','_newItemsList','Window_ItemList_updateHelp','buttonAssistRemove','nHlVm','note','Parse_Notetags_Category','ItemsEquipsCore','OOSOo','updateMoneyAmount','KsUpm','addClearCommand','geUpdatedLayoutStatusWidth','SpeedNeg1999','aQdwH','mrgOu','updatedLayoutStyle','changeEquip','Scene_Shop_onBuyCancel','qSvWJ','ZZbpJ','setShopStatusWindowMode','Game_Actor_forceChangeEquip','addShopTrackingItemBuy','GoDAc','commandNameWindowCenter','buttonAssistCategory','Window_Selectable_setHelpWindowItem','MP\x20RECOVERY','ItemMenuStatusRect','rZzOS','CONSUMABLE','blt','EFFECT_GAIN_TP','getItemSpeedText','speed','drawParamName','kgZcP','BEeCp','bhLkW','currencyUnit','hpRate','evIbL','top','_bypassReleaseUnequippableItemsItemsEquipsCore','Parse_Notetags_Batch','doBuy','isMainMenuCoreMenuImageOptionAvailable','OoHck','angLK','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','UtTzt','1174612tdNTXa','playOkSound','_item','ScopeAllyOrEnemy','placeNewLabel','isShowNew','Scene_Shop_onCategoryCancel','isOptimizeCommandEnabled','getItemOccasionText','BorderRegExp','CmdIconEquip','ParseArmorNotetags','onCategoryOk','LcQsQ','POxFo','isCursedItem','commandStyle','Actors','bQSvG','value2','buyingPrice','ImxsS','Game_Actor_discardEquip','getItemEffectsRemovedStatesBuffsLabel','equipSlotIndex','UzIjl','Game_Item_setObject','processShopCondListingOnBuyItem','meetsShopListingConditions','hitIndex','_paramPlus','ARMOR','gXJGC','doSell','Scene_Shop_statusWindowRect','fqDAE','equipTypes','krzBU','_statusWindow','foreground','currentClass','Step1End','WRpmQ','cursorRight','process_VisuMZ_ItemsEquipsCore_RegExp','lEmGH','YlccI','OxVyy','itemWindowRect','actorId','oteuA','helpAreaHeight','DrawItemData','UKOlr','paramPlusItemsEquipsCoreCustomJS','Duzdj','isEquipped','activateSellWindow','KIIMb','LabelRemove','Blacklist','splice','drawCurrencyValue','FHghy','%1-%2','mLtwl','_numberWindow','hILUv','dTxTy','value','LabelElement','sUFst','getItemEffectsMpRecoveryText','Scene_Load_reloadMapIfUpdated','TfkaC','addShopTrackingItem','AllWeapons','Speed1','_commandWindow','getClassIdWithName','weapon-%1','NonOptimizeETypes','aTomh','rfPXm','item','bitmap','smQSY','_armorIDs','ATK','lfgsJ','getItemDamageElementText','commandSellItemsEquipsCore','remove','MaxHP','Yiqyh','selfTP','traitObjects','isRepeated','WEAPON','qZNqi','onDatabaseLoaded','CmdIconCancel','allowCreateStatusWindow','onCategoryCancelItemsEquipsCore','SpeedNeg999','meetsEquipRequirements','SwEIy','setHelpWindow','getItemRepeatsLabel','ShopMenuStatusStandard','ARRAYSTR','lineHeight','hideNewLabelSprites','cursorLeft','maxItems','buttonAssistText3','params','postCreateItemWindowModernControls','getShopTrackingData','HP\x20DAMAGE','damageColor','armor-%1','goldWindowRectItemsEquipsCore','getItemRepeatsText','_allowArtifactParamBase','prepareRefreshItemsEquipsCoreLayout','reloadMapIfUpdated','meetsEquipRequirement','scrollTo','onTouchOk','pLLWH','VisuMZ_1_SkillsStatesCore','opacity','_newLabelOpacity','StatusWindow','Game_BattlerBase_param','VKLFe','CoreEngine','setItem','ParamChangeFontSize','xZkhy','createSlotWindow','isBottomHelpMode','OKnYV','processCursorMoveModernControls','createCommandNameWindow','onTouchSelect','ScopeRandomAllies','Window_ShopBuy_refresh','Parse_Notetags_EnableJS','nextActor','prepareNextScene','mainCommandWidth','mainFontFace','2925010ixDiIB','auto','getEquipRequirements','Scene_Shop_create','IncludeShopItem','WvlIn','xZuJe','exit','fPQxr','isArmor','ElementWeapon','HfYct','Step3Start','ConvertParams','forceResetEquipSlots','eYeKO','NlEic','zVDLB','RcRJj','addShopTrackingItemSell','ScopeEnemyOrAlly','currentExt','getShopTrackingItem','fXEqv','show','hide','createTempActorEquips','MaxMP','buttonAssistKey1','MaxArmors','mPpmt','paintOpacity','#%1','categoryNameWindowCenter','<%1:[\x20]([\x5c+\x5c-]\x5cd+)>','HP\x20RECOVERY','VnpST','BuyTurnSwitchOn','BackRectColor','atk','sellPriceOfItem','convertInitEquipsToItems','equipSlots','isPlaytest','isClearCommandEnabled','pop','drawItemDamageElement','ListWindowCols','A%1','_resetFontColor','systemColor','purifyCursedEquips','Scene_Shop_onBuyOk','drawItemCost','SVPjj','checkItemConditionsSwitchNotetags','Scene_Shop_goldWindowRect','versionId','ElTyX','commandWindowRect','SwitchBuy','sell','helpWindowRect','deselect','updateHelp','Window_ItemList_colSpacing','wnslS','BattleUsable','Scene_Equip_onActorChange','Ixdgk','Game_Party_setupBattleTestItems_artifact','14WHRvVU','canConsumeItem','setMp','length','TP\x20DAMAGE','addItemCategory','resetFontSettings','Scene_Equip_commandEquip','maxItemAmount','zdpZL','flatMP','getItemColor','Speed2000','meetsItemConditionsNotetags','process_VisuMZ_ItemsEquipsCore_Notetags','sellWindowRectItemsEquipsCore','updateCommandNameWindow','helpAreaTop','categoryNameWindowDrawBackground','_tempActorB','drawActorParamDifference','initShopTrackingData','Window_Selectable_refresh','atypeId','_bypassProxy','DaIgT','drawRemoveItem','DCbNP','getSkillIdWithName','hcUrV','isSoleArmorType','drawItemQuantity','Scene_Equip_create','isKeyItem','IIMnf','gold','?????','_buyWindowLastIndex','updateNewLabelOpacity','NonRemoveETypes','drawItemEffectsAddedStatesBuffs','getItemHitTypeLabel','vduzZ','Game_Actor_equips_artifacts','OAeXv','_skillIDs','LabelApply','textColor','addState','anyEmptyEquipSlotsOfSameEtype','getItemEffectsAddedStatesBuffsText','mxygq','getEtypeIDs','Step3End','isGoodShown','commandName','drawPossession','Scene_Shop_buyWindowRect','getItemDamageAmountTextOriginal','isNewItem','Game_BattlerBase_canEquip_artifact','%1%','initNewItemsList','Scene_Shop_doSell','format','fillRect','lLdhr','yHLyH','EquipParams','onSellCancel','uiInputPosition','QZJKZ','qfPPI','getItemConsumableLabel','Scene_Shop_categoryWindowRect','TextAlign','categoryStyle','_bypassNewLabel','isEquipCommandEnabled','FXdNb','CXNcA','Window_ItemCategory_initialize','drawItemScope','===','isUseModernControls','sellPriceRate','chJkr','Scene_Shop_createCategoryWindow','jTCeQ','Window_ShopBuy_goodsToItem','processDownCursorSpecialCheckModernControls','postCreateCategoryWindowItemsEquipsCore','addBuyCommand','sBNNj','DamageType%1','index','addChild','ShiftShortcutKey','idPQJ','commandStyleCheck','212841qkoFdg','onActorChange','NeverUsable','Scope%1','paramValueFontSize','updateSmoothScroll','+%1','ZdCJb','switchProxyItem','Scene_Equip_onSlotCancel','isUseItemsEquipsCoreUpdatedLayout','successRate','NAYgr','fill','onSellOk','setupBattleTestItems','Scene_Item_createItemWindow','IoiWa','getItemEffectsHpRecoveryLabel','LabelRecoverTP','Parse_Notetags_EquipSlots','ADDED\x20EFFECTS','MAT','callUpdateHelp','commandEquip','cancel','Window_ShopBuy_price','JQOOa','AhgJC','buttonAssistSlotWindowShift','values','background','ScTyp','BOhjs','equip2','buttonAssistKey2','onSellItem','Scene_Equip_itemWindowRect','Step2Start','removeBattleTestArtifacts','getItemEffectsRemovedStatesBuffsText','baseSellingPrice','KAnYc','Mdvgt','members','Scene_Equip_createSlotWindow','Parse_Notetags_Prices','isSkill','needsNewTempActor','KuJNf','JOSmx','buffIconIndex','activate','onTouchSelectModern','CaEOW','onBuyItem','Scope1','GxpnZ','middle','refreshActorEquipSlotsIfUpdated','price','drawItemEffectsTpRecovery','innerHeight','OBMPi','refresh','KZDFL','RegExp','EFFECT_ADD_DEBUFF','min','GUBlz','onSellOkItemsEquipsCore','VisuMZ_2_WeaponSwapSystem','YIGQz','refreshItemsEquipsCoreNoMenuImage','BnesI','split','isBuyCommandEnabled','_newLabelOpacityChange','drawUpdatedParamName','106080MSBpVk','SCBqP','ScopeAlliesButUser','slotWindowRect','Game_Actor_artifact','drawParamText','isProxyItem','limitedPageUpDownSceneCheck','items','ARRAYNUM','round','EnableLayout','getItemEffectsHpRecoveryText','uiMenuStyle','addLoadListener','isCommandEnabled','JLBOX','drawItemRepeats','flzew','processCursorMove','ltVpZ','QkOLO','setHandler','qKqVF','powerDownColor','bwVWk','isPressed','OVMwJ','Translucent','categoryNameWindowDrawText','addEquipCommand','getItemHitTypeText','×%1','drawItemStyleIconText','xByhK','equipItems','statusWindowRect','sellingPrice','EPQbP','filter','createCategoryWindow','isEquipCommandAdded','log','BgwxD','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','DrawIcons','QoL','modifiedBuyPriceItemsEquipsCore','TUYvg','VlJqf','ncnnh','PurifyActors','mainAreaHeight','AlreadyEquipMarker','Scene_Shop_prepare','getItemQuantityText','canEquip','snYBU','push','equipCmdDesc','mat','loop','isTriggered','Scene_Equip_onSlotOk','setStatusWindow','setObject','onTouchCancel','processTouchModernControls','sellWindowRect','Step2End','CLADm','discardEquip','isShiftShortcutKeyForRemove','ScVfw','isEquipChangeOk','update','loadSystem','hasOwnProperty','prepareItemCustomData','SetupProxyItemGroups','eCSDX','rbuws','Scene_Item_itemWindowRect','isCursorMovable','actor','Speed0','orzfF','_itemData','getClassRequirements','CmdStyle','isClearEquipOk','param','iWPJH','ELEMENT','RegularItems','bAxhk','forceChangeEquip','setupItemDamageTempActors','Parse_Notetags_ParamValues','jjzys','ParseClassNotetags','drawItemHitType','ixGto','drawUpdatedBeforeParamValue','Scene_Boot_onDatabaseLoaded','IyGaU','zoDOq','_customItemInfo','smoothScrollTo','sPkAl','_buyWindow','isPurifyItemSwapOk','uMKbs','drawItemEffects','Style','_categoryWindow','GhWwD','changePaintOpacity','MLeIr','VhhkL','CgCkE','ECBUd','DNZVw','setText','maxVisibleItems','SUVsS','getNextAvailableEtypeId','_forcedSlots','isEnabled','rateMP','setItemDelay','Pick\x20and\x20choose\x20equipment\x20to\x20change.','itemHasEquipLimit','NcODY','create','setCategory','Xbfvk','VxCbq','removeStateBuffChanges'];_0x20e2=function(){return _0x45f5a6;};return _0x20e2();}VisuMZ[label][_0x2e9347(0x20a)]=VisuMZ[label][_0x2e9347(0x20a)]||{},VisuMZ['ConvertParams']=function(_0x4c1cef,_0x3b7a6b){const _0x3bb3fd=_0x2e9347;for(const _0x2aca28 in _0x3b7a6b){if(_0x3bb3fd(0x4f7)===_0x3bb3fd(0x4f7)){if(_0x2aca28[_0x3bb3fd(0x1f9)](/(.*):(.*)/i)){if('CnGcg'===_0x3bb3fd(0x5e0))for(const _0x47050e of _0x574aed[_0x3bb3fd(0x570)]){if(_0x47050e)_0x47050e[_0x3bb3fd(0x598)]();}else{const _0x31a25f=String(RegExp['$1']),_0x26b75b=String(RegExp['$2'])['toUpperCase']()[_0x3bb3fd(0x515)]();let _0xb3df,_0x20f039,_0x4331dd;switch(_0x26b75b){case'NUM':_0xb3df=_0x3b7a6b[_0x2aca28]!==''?Number(_0x3b7a6b[_0x2aca28]):0x0;break;case _0x3bb3fd(0x48c):_0x20f039=_0x3b7a6b[_0x2aca28]!==''?JSON[_0x3bb3fd(0x233)](_0x3b7a6b[_0x2aca28]):[],_0xb3df=_0x20f039[_0x3bb3fd(0x6a3)](_0x2db441=>Number(_0x2db441));break;case _0x3bb3fd(0x240):_0xb3df=_0x3b7a6b[_0x2aca28]!==''?eval(_0x3b7a6b[_0x2aca28]):null;break;case'ARRAYEVAL':_0x20f039=_0x3b7a6b[_0x2aca28]!==''?JSON[_0x3bb3fd(0x233)](_0x3b7a6b[_0x2aca28]):[],_0xb3df=_0x20f039[_0x3bb3fd(0x6a3)](_0x5e9dd6=>eval(_0x5e9dd6));break;case'JSON':_0xb3df=_0x3b7a6b[_0x2aca28]!==''?JSON[_0x3bb3fd(0x233)](_0x3b7a6b[_0x2aca28]):'';break;case'ARRAYJSON':_0x20f039=_0x3b7a6b[_0x2aca28]!==''?JSON[_0x3bb3fd(0x233)](_0x3b7a6b[_0x2aca28]):[],_0xb3df=_0x20f039[_0x3bb3fd(0x6a3)](_0x481a96=>JSON[_0x3bb3fd(0x233)](_0x481a96));break;case _0x3bb3fd(0x52b):_0xb3df=_0x3b7a6b[_0x2aca28]!==''?new Function(JSON[_0x3bb3fd(0x233)](_0x3b7a6b[_0x2aca28])):new Function(_0x3bb3fd(0x24d));break;case'ARRAYFUNC':_0x20f039=_0x3b7a6b[_0x2aca28]!==''?JSON[_0x3bb3fd(0x233)](_0x3b7a6b[_0x2aca28]):[],_0xb3df=_0x20f039[_0x3bb3fd(0x6a3)](_0x5c2c10=>new Function(JSON[_0x3bb3fd(0x233)](_0x5c2c10)));break;case'STR':_0xb3df=_0x3b7a6b[_0x2aca28]!==''?String(_0x3b7a6b[_0x2aca28]):'';break;case _0x3bb3fd(0x35d):_0x20f039=_0x3b7a6b[_0x2aca28]!==''?JSON['parse'](_0x3b7a6b[_0x2aca28]):[],_0xb3df=_0x20f039[_0x3bb3fd(0x6a3)](_0x33c7b9=>String(_0x33c7b9));break;case _0x3bb3fd(0x5cf):_0x4331dd=_0x3b7a6b[_0x2aca28]!==''?JSON[_0x3bb3fd(0x233)](_0x3b7a6b[_0x2aca28]):{},_0x4c1cef[_0x31a25f]={},VisuMZ[_0x3bb3fd(0x396)](_0x4c1cef[_0x31a25f],_0x4331dd);continue;case _0x3bb3fd(0x5af):_0x20f039=_0x3b7a6b[_0x2aca28]!==''?JSON[_0x3bb3fd(0x233)](_0x3b7a6b[_0x2aca28]):[],_0xb3df=_0x20f039[_0x3bb3fd(0x6a3)](_0x511a77=>VisuMZ['ConvertParams']({},JSON[_0x3bb3fd(0x233)](_0x511a77)));break;default:continue;}_0x4c1cef[_0x31a25f]=_0xb3df;}}}else _0x483e9b[_0x3bb3fd(0x2c2)][_0x3bb3fd(0x3cf)][_0x3bb3fd(0x51f)](this),this[_0x3bb3fd(0x45b)]();}return _0x4c1cef;},(_0x28ef6f=>{const _0x5a21d2=_0x2e9347,_0x3e3515=_0x28ef6f[_0x5a21d2(0x5a8)];for(const _0x57fdfc of dependencies){if(_0x5a21d2(0x4f0)===_0x5a21d2(0x2b5)){const _0x4e9125=_0x5ac43f(_0x448218['$1'])||0x1;if(_0x4c5d29>=_0x4e9125)return!![];}else{if(!Imported[_0x57fdfc]){alert(_0x5a21d2(0x2ed)[_0x5a21d2(0x410)](_0x3e3515,_0x57fdfc)),SceneManager[_0x5a21d2(0x390)]();break;}}}const _0xcd0ee2=_0x28ef6f['description'];if(_0xcd0ee2[_0x5a21d2(0x1f9)](/\[Version[ ](.*?)\]/i)){const _0x25ee10=Number(RegExp['$1']);_0x25ee10!==VisuMZ[label][_0x5a21d2(0x1a7)]&&(alert(_0x5a21d2(0x5f2)[_0x5a21d2(0x410)](_0x3e3515,_0x25ee10)),SceneManager[_0x5a21d2(0x390)]());}if(_0xcd0ee2[_0x5a21d2(0x1f9)](/\[Tier[ ](\d+)\]/i)){const _0x22e277=Number(RegExp['$1']);_0x22e277<tier?(alert(_0x5a21d2(0x4af)[_0x5a21d2(0x410)](_0x3e3515,_0x22e277,tier)),SceneManager[_0x5a21d2(0x390)]()):tier=Math['max'](_0x22e277,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x28ef6f['parameters']);})(pluginData),PluginManager[_0x2e9347(0x157)](pluginData[_0x2e9347(0x5a8)],_0x2e9347(0x68c),_0x15109c=>{const _0x5f37c0=_0x2e9347;VisuMZ['ConvertParams'](_0x15109c,_0x15109c);const _0x66d806=_0x15109c[_0x5f37c0(0x300)][_0x5f37c0(0x6a3)](_0x1872df=>$gameActors[_0x5f37c0(0x4d7)](_0x1872df)),_0x580509=_0x15109c[_0x5f37c0(0x17d)]['map'](_0x2e8b22=>$dataSystem[_0x5f37c0(0x313)][_0x5f37c0(0x22f)](_0x2e8b22[_0x5f37c0(0x515)]()));for(const _0x2e9add of _0x66d806){if(!_0x2e9add)continue;_0x2e9add['forceChangeEquipSlots'](_0x580509);}}),PluginManager[_0x2e9347(0x157)](pluginData[_0x2e9347(0x5a8)],_0x2e9347(0x5dc),_0x32c0e4=>{const _0x193d09=_0x2e9347;VisuMZ[_0x193d09(0x396)](_0x32c0e4,_0x32c0e4);const _0x110470=_0x32c0e4['Actors']['map'](_0xffa66c=>$gameActors[_0x193d09(0x4d7)](_0xffa66c));for(const _0x2e03e0 of _0x110470){if(_0x193d09(0x28f)===_0x193d09(0x31d)){if(_0x58ed4d>=0x0)_0x25b616===this[_0x193d09(0x42f)]()&&(this['_doubleTouch']=!![]),this[_0x193d09(0x468)](),this['select'](_0x20631c);else _0x5768d9[_0x193d09(0x30c)]()>=0x0&&(this[_0x193d09(0x5bf)](),this[_0x193d09(0x3c8)]());}else{if(!_0x2e03e0)continue;_0x2e03e0[_0x193d09(0x397)]();}}}),PluginManager[_0x2e9347(0x157)](pluginData[_0x2e9347(0x5a8)],_0x2e9347(0x4b6),_0x3c2738=>{const _0x283a0b=_0x2e9347;if($gameParty['inBattle']())return;VisuMZ[_0x283a0b(0x396)](_0x3c2738,_0x3c2738);const _0xef6377=_0x3c2738[_0x283a0b(0x300)][_0x283a0b(0x6a3)](_0x2acc90=>$gameActors[_0x283a0b(0x4d7)](_0x2acc90));for(const _0x14d05c of _0xef6377){if(_0x283a0b(0x321)===_0x283a0b(0x1ef))return _0x1bf1df[_0x283a0b(0x4d7)]()[_0x283a0b(0x1f6)](_0x576801);else{if(!_0x14d05c)continue;_0x14d05c[_0x283a0b(0x3bc)]();}}}),PluginManager['registerCommand'](pluginData[_0x2e9347(0x5a8)],_0x2e9347(0x1d0),_0x10005c=>{if($gameParty['inBattle']())return;$gameParty['purifyCursedEquips']();}),PluginManager[_0x2e9347(0x157)](pluginData[_0x2e9347(0x5a8)],'BatchShop',_0x248e5b=>{const _0x753e83=_0x2e9347;VisuMZ['ConvertParams'](_0x248e5b,_0x248e5b);const _0x50c9b7=[],_0x15ec98=_0x248e5b[_0x753e83(0x32b)][_0x753e83(0x6a3)](_0x3ee8e4=>_0x3ee8e4[_0x753e83(0x20b)]()[_0x753e83(0x515)]()),_0x39f069=_0x248e5b['Whitelist'][_0x753e83(0x6a3)](_0x521397=>_0x521397[_0x753e83(0x20b)]()[_0x753e83(0x515)]()),_0x5a3a24=_0x248e5b['Step1End']>=_0x248e5b['Step1Start']?_0x248e5b[_0x753e83(0x5fa)]:_0x248e5b[_0x753e83(0x318)],_0x3f1337=_0x248e5b['Step1End']>=_0x248e5b[_0x753e83(0x5fa)]?_0x248e5b[_0x753e83(0x318)]:_0x248e5b[_0x753e83(0x5fa)],_0x288b59=Array(_0x3f1337-_0x5a3a24+0x1)[_0x753e83(0x441)]()[_0x753e83(0x6a3)]((_0xa3d340,_0xd9b5d2)=>_0x5a3a24+_0xd9b5d2);for(const _0x1d25d1 of _0x288b59){if(_0x753e83(0x587)===_0x753e83(0x587)){const _0x30e82b=$dataItems[_0x1d25d1];if(!_0x30e82b)continue;if(!VisuMZ[_0x753e83(0x2c2)]['IncludeShopItem'](_0x30e82b,_0x15ec98,_0x39f069))continue;_0x50c9b7[_0x753e83(0x4bd)]([0x0,_0x1d25d1,0x0,_0x30e82b['price']]);}else this[_0x753e83(0x699)]=!![];}const _0x3f4e47=_0x248e5b[_0x753e83(0x4c8)]>=_0x248e5b[_0x753e83(0x45a)]?_0x248e5b[_0x753e83(0x45a)]:_0x248e5b['Step2End'],_0x5da4ba=_0x248e5b[_0x753e83(0x4c8)]>=_0x248e5b[_0x753e83(0x45a)]?_0x248e5b[_0x753e83(0x4c8)]:_0x248e5b[_0x753e83(0x45a)],_0x284695=Array(_0x5da4ba-_0x3f4e47+0x1)[_0x753e83(0x441)]()['map']((_0x55ea3b,_0x14d5c6)=>_0x3f4e47+_0x14d5c6);for(const _0x168d18 of _0x284695){const _0x27b5c6=$dataWeapons[_0x168d18];if(!_0x27b5c6)continue;if(!VisuMZ[_0x753e83(0x2c2)][_0x753e83(0x38d)](_0x27b5c6,_0x15ec98,_0x39f069))continue;_0x50c9b7[_0x753e83(0x4bd)]([0x1,_0x168d18,0x0,_0x27b5c6[_0x753e83(0x470)]]);}const _0x2c9974=_0x248e5b[_0x753e83(0x405)]>=_0x248e5b['Step3Start']?_0x248e5b[_0x753e83(0x395)]:_0x248e5b[_0x753e83(0x405)],_0x24738d=_0x248e5b[_0x753e83(0x405)]>=_0x248e5b[_0x753e83(0x395)]?_0x248e5b[_0x753e83(0x405)]:_0x248e5b[_0x753e83(0x395)],_0x3ce816=Array(_0x24738d-_0x2c9974+0x1)[_0x753e83(0x441)]()[_0x753e83(0x6a3)]((_0x4e5f46,_0x44b745)=>_0x2c9974+_0x44b745);for(const _0x3491f3 of _0x3ce816){if(_0x753e83(0x5c2)===_0x753e83(0x5c2)){const _0x2318d8=$dataArmors[_0x3491f3];if(!_0x2318d8)continue;if(!VisuMZ[_0x753e83(0x2c2)][_0x753e83(0x38d)](_0x2318d8,_0x15ec98,_0x39f069))continue;_0x50c9b7[_0x753e83(0x4bd)]([0x2,_0x3491f3,0x0,_0x2318d8['price']]);}else{if(!this[_0x753e83(0x17c)](_0x4c6381))return![];const _0x59cf70=_0x2f7a89[_0x753e83(0x2c0)];if(!_0x59cf70)return![];if(_0x59cf70[_0x753e83(0x1f9)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x59cf70[_0x753e83(0x1f9)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];}}SceneManager[_0x753e83(0x4bd)](Scene_Shop),SceneManager[_0x753e83(0x386)](_0x50c9b7,_0x248e5b[_0x753e83(0x5cb)]);}),VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x38d)]=function(_0x5e92f8,_0x1030da,_0x2b262b){const _0x190838=_0x2e9347;if(_0x5e92f8[_0x190838(0x5a8)][_0x190838(0x515)]()==='')return![];if(_0x5e92f8[_0x190838(0x5a8)]['match'](/-----/i))return![];const _0x2b609e=_0x5e92f8[_0x190838(0x6c1)];if(_0x1030da[_0x190838(0x3d3)]>0x0)for(const _0x2528d5 of _0x1030da){if(_0x190838(0x25d)===_0x190838(0x25d)){if(!_0x2528d5)continue;if(_0x2b609e[_0x190838(0x5e8)](_0x2528d5))return![];}else this['initShopTrackingData']();}if(_0x2b262b['length']>0x0){for(const _0x4afe7b of _0x2b262b){if(_0x190838(0x1f5)!=='yMPVV')return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];else{if(!_0x4afe7b)continue;if(_0x2b609e[_0x190838(0x5e8)](_0x4afe7b))return!![];}}return![];}return!![];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x4eb)]=Scene_Boot[_0x2e9347(0x655)][_0x2e9347(0x353)],Scene_Boot[_0x2e9347(0x655)]['onDatabaseLoaded']=function(){const _0x495b69=_0x2e9347;this['process_VisuMZ_ItemsEquipsCore_RegExp'](),VisuMZ[_0x495b69(0x2c2)][_0x495b69(0x4eb)]['call'](this),this[_0x495b69(0x3de)](),VisuMZ['ItemsEquipsCore'][_0x495b69(0x4d2)](),VisuMZ[_0x495b69(0x2c2)][_0x495b69(0x21e)]();},Scene_Boot[_0x2e9347(0x655)][_0x2e9347(0x31b)]=function(){const _0x317427=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0x317427(0x476)]={},VisuMZ[_0x317427(0x2c2)]['RegExp'][_0x317427(0x414)]=[],VisuMZ[_0x317427(0x2c2)][_0x317427(0x476)][_0x317427(0x2f8)]=[];const _0x1bbd68=[_0x317427(0x34c),_0x317427(0x3a4),_0x317427(0x347),_0x317427(0x253),_0x317427(0x44a),_0x317427(0x562),'AGI',_0x317427(0x5cd)];for(const _0x14c5de of _0x1bbd68){const _0x109862=_0x317427(0x3ab)[_0x317427(0x410)](_0x14c5de);VisuMZ[_0x317427(0x2c2)]['RegExp'][_0x317427(0x414)][_0x317427(0x4bd)](new RegExp(_0x109862,'i'));const _0x2ef4d1='\x5cb%1\x5cb'[_0x317427(0x410)](_0x14c5de);VisuMZ[_0x317427(0x2c2)][_0x317427(0x476)][_0x317427(0x2f8)][_0x317427(0x4bd)](new RegExp(_0x2ef4d1,'g'));}},Scene_Boot[_0x2e9347(0x655)]['process_VisuMZ_ItemsEquipsCore_Notetags']=function(){const _0x5ef301=_0x2e9347;if(VisuMZ['ParseAllNotetags'])return;this[_0x5ef301(0x1bb)]();const _0x3d7861=[$dataItems,$dataWeapons,$dataArmors];for(const _0x48dd02 of _0x3d7861){for(const _0x4f84ae of _0x48dd02){if(!_0x4f84ae)continue;VisuMZ[_0x5ef301(0x2c2)][_0x5ef301(0x2c1)](_0x4f84ae,_0x48dd02),VisuMZ[_0x5ef301(0x2c2)][_0x5ef301(0x462)](_0x4f84ae,_0x48dd02),VisuMZ['ItemsEquipsCore'][_0x5ef301(0x4e5)](_0x4f84ae,_0x48dd02),VisuMZ[_0x5ef301(0x2c2)]['Parse_Notetags_ParamJS'](_0x4f84ae,_0x48dd02),VisuMZ[_0x5ef301(0x2c2)][_0x5ef301(0x384)](_0x4f84ae,_0x48dd02);}}},Scene_Boot[_0x2e9347(0x655)]['process_VisuMZ_ItemsEquipsCore_EquipSlots']=function(){const _0x31d6fe=_0x2e9347;for(const _0x33c128 of $dataClasses){if(!_0x33c128)continue;VisuMZ['ItemsEquipsCore'][_0x31d6fe(0x448)](_0x33c128);}},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x4e7)]=VisuMZ[_0x2e9347(0x4e7)],VisuMZ[_0x2e9347(0x4e7)]=function(_0x5a6518){const _0x4d152a=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0x4d152a(0x4e7)][_0x4d152a(0x51f)](this,_0x5a6518),VisuMZ[_0x4d152a(0x2c2)][_0x4d152a(0x448)](_0x5a6518);},VisuMZ[_0x2e9347(0x2c2)]['ParseItemNotetags']=VisuMZ['ParseItemNotetags'],VisuMZ[_0x2e9347(0x5aa)]=function(_0x2ea4cc){const _0xb18704=_0x2e9347;VisuMZ[_0xb18704(0x2c2)]['ParseItemNotetags'][_0xb18704(0x51f)](this,_0x2ea4cc),VisuMZ[_0xb18704(0x2c2)][_0xb18704(0x2e8)](_0x2ea4cc,$dataItems);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x68e)]=VisuMZ[_0x2e9347(0x68e)],VisuMZ[_0x2e9347(0x68e)]=function(_0x560c54){const _0x3903ea=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0x3903ea(0x68e)][_0x3903ea(0x51f)](this,_0x560c54),VisuMZ[_0x3903ea(0x2c2)][_0x3903ea(0x2e8)](_0x560c54,$dataWeapons);},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x2fa)]=VisuMZ[_0x2e9347(0x2fa)],VisuMZ[_0x2e9347(0x2fa)]=function(_0x5d5a1e){const _0x3da2d3=_0x2e9347;VisuMZ[_0x3da2d3(0x2c2)]['ParseArmorNotetags'][_0x3da2d3(0x51f)](this,_0x5d5a1e),VisuMZ[_0x3da2d3(0x2c2)][_0x3da2d3(0x2e8)](_0x5d5a1e,$dataArmors);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x448)]=function(_0x41b42e){const _0x5c84d6=_0x2e9347;_0x41b42e['equipSlots']=[];const _0x8c487b=$dataSystem[_0x5c84d6(0x313)][_0x5c84d6(0x6a3)](_0x3bf40a=>_0x3bf40a?_0x3bf40a[_0x5c84d6(0x515)]():'');if(!BattleManager[_0x5c84d6(0x637)]()&&_0x41b42e[_0x5c84d6(0x2c0)][_0x5c84d6(0x1f9)](/<EQUIP SLOTS>\s*([\s\S]*)\s*<\/EQUIP SLOTS>/i)){const _0x4b0acb=String(RegExp['$1'])[_0x5c84d6(0x47f)](/[\r\n]+/);for(const _0x7a5b4c of _0x4b0acb){if(_0x5c84d6(0x156)!==_0x5c84d6(0x679)){const _0x293234=_0x8c487b[_0x5c84d6(0x22f)](_0x7a5b4c[_0x5c84d6(0x515)]());if(_0x293234>0x0)_0x41b42e['equipSlots']['push'](_0x293234);}else return!![];}}else for(const _0x2db410 of _0x8c487b){const _0x50cc09=_0x8c487b[_0x5c84d6(0x22f)](_0x2db410[_0x5c84d6(0x515)]());if(_0x50cc09>0x0)_0x41b42e[_0x5c84d6(0x3b3)]['push'](_0x50cc09);}},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x2e8)]=function(_0x28dbd1,_0x4d97ce){const _0x43f684=_0x2e9347;VisuMZ[_0x43f684(0x2c2)]['Parse_Notetags_Category'](_0x28dbd1,_0x4d97ce),VisuMZ[_0x43f684(0x2c2)]['Parse_Notetags_Prices'](_0x28dbd1,_0x4d97ce),VisuMZ[_0x43f684(0x2c2)]['Parse_Notetags_ParamValues'](_0x28dbd1,_0x4d97ce),VisuMZ[_0x43f684(0x2c2)][_0x43f684(0x559)](_0x28dbd1,_0x4d97ce),VisuMZ['ItemsEquipsCore'][_0x43f684(0x384)](_0x28dbd1,_0x4d97ce);},VisuMZ[_0x2e9347(0x2c2)]['Parse_Notetags_Category']=function(_0x5abc40,_0x1a1ed3){const _0xcab813=_0x2e9347;_0x5abc40[_0xcab813(0x6c1)]=[];const _0x5e8497=_0x5abc40[_0xcab813(0x2c0)],_0x6747e0=_0x5e8497[_0xcab813(0x1f9)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x6747e0){if(_0xcab813(0x512)==='dBJcl')this['commandEquip']();else for(const _0x10f673 of _0x6747e0){_0x10f673[_0xcab813(0x1f9)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3e8b82=String(RegExp['$1'])[_0xcab813(0x20b)]()[_0xcab813(0x515)]()[_0xcab813(0x47f)](',');for(const _0x4af8fd of _0x3e8b82){if(_0xcab813(0x348)===_0xcab813(0x336))return _0x22ecb8['ItemsEquipsCore'][_0xcab813(0x20a)][_0xcab813(0x375)][_0xcab813(0x54b)];else _0x5abc40['categories']['push'](_0x4af8fd[_0xcab813(0x515)]());}}}if(_0x5e8497['match'](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x337f70=RegExp['$1']['split'](/[\r\n]+/);for(const _0x563586 of _0x337f70){_0x5abc40[_0xcab813(0x6c1)][_0xcab813(0x4bd)](_0x563586[_0xcab813(0x20b)]()[_0xcab813(0x515)]());}}},VisuMZ[_0x2e9347(0x2c2)]['Parse_Notetags_Prices']=function(_0x4b894d,_0x57c294){const _0x39eb78=_0x2e9347;_0x4b894d['note'][_0x39eb78(0x1f9)](/<PRICE:[ ](\d+)>/i)&&('VlJqf'!==_0x39eb78(0x4b4)?_0x1343e5['note']['match'](/<PRICE:[ ](\d+)>/i)&&(_0x22558d['price']=_0x4236cb(_0x208cd6['$1'])):_0x4b894d[_0x39eb78(0x470)]=Number(RegExp['$1']));},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x4e5)]=function(_0xb7fd85,_0x1445b1){const _0x45ed2d=_0x2e9347;if(_0x1445b1===$dataItems)return;for(let _0x4d2a56=0x0;_0x4d2a56<0x8;_0x4d2a56++){if(_0x45ed2d(0x64e)!==_0x45ed2d(0x64e))this[_0x45ed2d(0x1b5)](!![]);else{const _0x489f7e=VisuMZ[_0x45ed2d(0x2c2)][_0x45ed2d(0x476)][_0x45ed2d(0x414)][_0x4d2a56];if(_0xb7fd85[_0x45ed2d(0x2c0)][_0x45ed2d(0x1f9)](_0x489f7e)){if('KVgOG'!=='OMmqK')_0xb7fd85[_0x45ed2d(0x363)][_0x4d2a56]=parseInt(RegExp['$1']);else{const _0xe6b3e8=_0x399a13[_0x45ed2d(0x22f)](_0x4aeab8[_0x45ed2d(0x515)]());if(_0xe6b3e8>0x0)_0x24803d[_0x45ed2d(0x3b3)]['push'](_0xe6b3e8);}}}}},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x615)]={},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x559)]=function(_0x19873e,_0x4d9541){const _0x35ab54=_0x2e9347;if(_0x4d9541===$dataItems)return;if(_0x19873e['note'][_0x35ab54(0x1f9)](/<JS PARAMETERS>\s*([\s\S]*)\s*<\/JS PARAMETERS>/i)){if(_0x35ab54(0x49e)==='OVMwJ'){const _0x4735da=String(RegExp['$1']),_0x286b21=(_0x4d9541===$dataWeapons?_0x35ab54(0x200):_0x35ab54(0x3b9))['format'](_0x19873e['id']),_0x3a53a1=_0x35ab54(0x67a)['format'](_0x4735da);for(let _0x58bf62=0x0;_0x58bf62<0x8;_0x58bf62++){if(_0x4735da[_0x35ab54(0x1f9)](VisuMZ[_0x35ab54(0x2c2)][_0x35ab54(0x476)]['BorderRegExp'][_0x58bf62])){if(_0x35ab54(0x332)===_0x35ab54(0x332)){const _0x370d90=_0x35ab54(0x32f)[_0x35ab54(0x410)](_0x286b21,_0x58bf62);VisuMZ[_0x35ab54(0x2c2)]['paramJS'][_0x370d90]=new Function('item',_0x35ab54(0x1c9),_0x3a53a1);}else{const _0xc5799b=this[_0x35ab54(0x407)](_0x371345);if(_0xc5799b['match'](/\\I\[(\d+)\]/i)){const _0x1338bd=this[_0x35ab54(0x67f)](_0x539f5c),_0x1009c4=this['textSizeEx'](_0xc5799b)[_0x35ab54(0x21b)];return _0x1009c4<=_0x1338bd[_0x35ab54(0x21b)]?_0x35ab54(0x18a):_0x35ab54(0x23e);}}}}}else _0x566f9b[_0x35ab54(0x2c2)][_0x35ab54(0x305)]['call'](this,_0x240073);}},VisuMZ[_0x2e9347(0x2c2)]['itemEnableJS']={},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x384)]=function(_0x41107c,_0x51b826){const _0x27c5a5=_0x2e9347;if(_0x51b826!==$dataItems)return;if(_0x41107c[_0x27c5a5(0x2c0)][_0x27c5a5(0x1f9)](/<JS ITEM ENABLE>\s*([\s\S]*)\s*<\/JS ITEM ENABLE>/i)){if(_0x27c5a5(0x16b)===_0x27c5a5(0x3eb))this[_0x27c5a5(0x529)][_0x27c5a5(0x3a2)](),this[_0x27c5a5(0x4f1)][_0x27c5a5(0x3a1)](),this['_buyWindow'][_0x27c5a5(0x3c8)](),this[_0x27c5a5(0x315)][_0x27c5a5(0x3a1)]();else{const _0x5945eb=String(RegExp['$1']),_0x356c5f=_0x27c5a5(0x66c)[_0x27c5a5(0x410)](_0x5945eb);VisuMZ[_0x27c5a5(0x2c2)][_0x27c5a5(0x60d)][_0x41107c['id']]=new Function(_0x27c5a5(0x343),_0x356c5f);}}},DataManager['isKeyItem']=function(_0x115cf8){const _0x29c470=_0x2e9347;return this[_0x29c470(0x207)](_0x115cf8)&&_0x115cf8[_0x29c470(0x524)]===0x2;},DataManager[_0x2e9347(0x3d8)]=function(_0x3394e4){const _0x201278=_0x2e9347;if(!_0x3394e4){if(_0x201278(0x5f5)!==_0x201278(0x5f5)){let _0x41c493=0x0;const _0x259420=this[_0x201278(0x3b3)](),_0x2d04a1=this[_0x201278(0x293)]();for(let _0x3234b5=0x0;_0x3234b5<_0x259420[_0x201278(0x3d3)];_0x3234b5++){if(_0x259420[_0x3234b5]===_0x574d89){_0x41c493=_0x3234b5;if(!_0x2d04a1[_0x3234b5])return _0x41c493;}}return _0x41c493;}else return 0x63;}else return _0x3394e4[_0x201278(0x2c0)][_0x201278(0x1f9)](/<MAX:[ ](\d+)>/i)?parseInt(RegExp['$1']):this[_0x201278(0x606)](_0x3394e4);},DataManager[_0x2e9347(0x606)]=function(_0xdc3d96){const _0x58c212=_0x2e9347;if(this[_0x58c212(0x207)](_0xdc3d96)){if(_0x58c212(0x39b)==='Ahvll'){const _0x80c7dc=_0x534daf['parse']('['+_0x239489['$1']['match'](/\d+/g)+']');for(const _0x11a97c of _0x80c7dc){if(_0x585b29[_0x58c212(0x334)](_0x11a97c))return![];}}else return VisuMZ[_0x58c212(0x2c2)][_0x58c212(0x20a)][_0x58c212(0x66f)][_0x58c212(0x50f)];}else{if(this[_0x58c212(0x514)](_0xdc3d96))return VisuMZ[_0x58c212(0x2c2)][_0x58c212(0x20a)]['ItemScene'][_0x58c212(0x1d5)];else{if(this['isArmor'](_0xdc3d96)){if('aYAps'===_0x58c212(0x497))_0x3373c2=_0x38788d['ItemsEquipsCore'][_0x58c212(0x643)](_0x256016),_0xc7d2ca['ItemsEquipsCore'][_0x58c212(0x4b9)][_0x58c212(0x51f)](this,_0xa77820,_0x3b5df0),this[_0x58c212(0x1d6)]();else return VisuMZ[_0x58c212(0x2c2)][_0x58c212(0x20a)]['ItemScene']['MaxArmors'];}}}},DataManager[_0x2e9347(0x33e)]=function(_0xc25add){const _0x82363f=_0x2e9347;_0xc25add=_0xc25add[_0x82363f(0x20b)]()[_0x82363f(0x515)](),this[_0x82363f(0x15a)]=this[_0x82363f(0x15a)]||{};if(this[_0x82363f(0x15a)][_0xc25add])return this[_0x82363f(0x15a)][_0xc25add];for(const _0x216214 of $dataClasses){if(!_0x216214)continue;let _0x2face0=_0x216214['name'];_0x2face0=_0x2face0[_0x82363f(0x255)](/\x1I\[(\d+)\]/gi,''),_0x2face0=_0x2face0[_0x82363f(0x255)](/\\I\[(\d+)\]/gi,''),this[_0x82363f(0x15a)][_0x2face0[_0x82363f(0x20b)]()['trim']()]=_0x216214['id'];}return this[_0x82363f(0x15a)][_0xc25add]||0x0;},DataManager[_0x2e9347(0x3ec)]=function(_0x95b8ba){const _0x242aa0=_0x2e9347;_0x95b8ba=_0x95b8ba[_0x242aa0(0x20b)]()[_0x242aa0(0x515)](),this[_0x242aa0(0x3fd)]=this['_skillIDs']||{};if(this[_0x242aa0(0x3fd)][_0x95b8ba])return this[_0x242aa0(0x3fd)][_0x95b8ba];for(const _0x5e44b9 of $dataSkills){if(!_0x5e44b9)continue;this['_skillIDs'][_0x5e44b9['name'][_0x242aa0(0x20b)]()[_0x242aa0(0x515)]()]=_0x5e44b9['id'];}return this[_0x242aa0(0x3fd)][_0x95b8ba]||0x0;},DataManager[_0x2e9347(0x2ab)]=function(_0x3443b6){const _0x42c6e3=_0x2e9347;_0x3443b6=_0x3443b6['toUpperCase']()['trim'](),this[_0x42c6e3(0x1a6)]=this[_0x42c6e3(0x1a6)]||{};if(this[_0x42c6e3(0x1a6)][_0x3443b6])return this[_0x42c6e3(0x1a6)][_0x3443b6];for(const _0x4402d9 of $dataItems){if(!_0x4402d9)continue;this[_0x42c6e3(0x1a6)][_0x4402d9[_0x42c6e3(0x5a8)][_0x42c6e3(0x20b)]()[_0x42c6e3(0x515)]()]=_0x4402d9['id'];}return this[_0x42c6e3(0x1a6)][_0x3443b6]||0x0;},DataManager[_0x2e9347(0x618)]=function(_0x37b8ef){const _0x4c28a6=_0x2e9347;_0x37b8ef=_0x37b8ef[_0x4c28a6(0x20b)]()[_0x4c28a6(0x515)](),this[_0x4c28a6(0x649)]=this[_0x4c28a6(0x649)]||{};if(this[_0x4c28a6(0x649)][_0x37b8ef])return this[_0x4c28a6(0x649)][_0x37b8ef];for(const _0x301294 of $dataWeapons){if(_0x4c28a6(0x413)!==_0x4c28a6(0x251)){if(!_0x301294)continue;this['_weaponIDs'][_0x301294[_0x4c28a6(0x5a8)][_0x4c28a6(0x20b)]()['trim']()]=_0x301294['id'];}else _0x5e9ff9+=_0x5618d4(_0x14f6fb['$1']);}return this[_0x4c28a6(0x649)][_0x37b8ef]||0x0;},DataManager[_0x2e9347(0x638)]=function(_0x3ad5bd){const _0xa5c2de=_0x2e9347;_0x3ad5bd=_0x3ad5bd['toUpperCase']()[_0xa5c2de(0x515)](),this[_0xa5c2de(0x346)]=this['_armorIDs']||{};if(this[_0xa5c2de(0x346)][_0x3ad5bd])return this[_0xa5c2de(0x346)][_0x3ad5bd];for(const _0xca3aa4 of $dataArmors){if(!_0xca3aa4)continue;this[_0xa5c2de(0x346)][_0xca3aa4['name'][_0xa5c2de(0x20b)]()[_0xa5c2de(0x515)]()]=_0xca3aa4['id'];}return this[_0xa5c2de(0x346)][_0x3ad5bd]||0x0;},DataManager[_0x2e9347(0x601)]=function(_0x310997){const _0x1646b3=_0x2e9347;_0x310997=_0x310997[_0x1646b3(0x20b)]()[_0x1646b3(0x515)](),this[_0x1646b3(0x28e)]=this['_etypeIDs']||{};if(this[_0x1646b3(0x28e)][_0x310997])return this[_0x1646b3(0x28e)][_0x310997];for(const _0x15ed04 of $dataSystem[_0x1646b3(0x313)]){this[_0x1646b3(0x28e)][_0x15ed04[_0x1646b3(0x20b)]()[_0x1646b3(0x515)]()]=$dataSystem['equipTypes'][_0x1646b3(0x22f)](_0x15ed04);}return this['_etypeIDs'][_0x310997]||0x0;},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x4d2)]=function(){const _0x2c75b7=_0x2e9347;VisuMZ[_0x2c75b7(0x2c2)][_0x2c75b7(0x5b3)]($dataItems),VisuMZ[_0x2c75b7(0x2c2)][_0x2c75b7(0x5b3)]($dataWeapons),VisuMZ[_0x2c75b7(0x2c2)]['SetupProxyItemGroup']($dataArmors);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x5b3)]=function(_0x463e9f){const _0x2f2b57=_0x2e9347;for(const _0x7bdceb of _0x463e9f){if(_0x2f2b57(0x19c)!==_0x2f2b57(0x5b7)){if(!_0x7bdceb)continue;if(!DataManager[_0x2f2b57(0x489)](_0x7bdceb))continue;const _0x11b7d0=DataManager[_0x2f2b57(0x533)](_0x7bdceb),_0x865e48=[_0x2f2b57(0x5a8),'iconIndex',_0x2f2b57(0x252)];for(const _0x4320d3 of _0x865e48){if('oYamC'!=='oYamC')return this[_0x2f2b57(0x613)][_0x115029];else _0x7bdceb[_0x4320d3]=_0x11b7d0[_0x4320d3];}}else return _0x28bfec[_0x2f2b57(0x2c2)][_0x2f2b57(0x549)][_0x2f2b57(0x51f)](this);}},DataManager['isProxyItem']=function(_0x4788c4){const _0x2717d7=_0x2e9347;if(!_0x4788c4)return![];if(!_0x4788c4[_0x2717d7(0x2c0)])return![];return _0x4788c4&&_0x4788c4[_0x2717d7(0x2c0)][_0x2717d7(0x1f9)](/<PROXY:[ ](.*)>/i);},DataManager[_0x2e9347(0x533)]=function(_0x32b1b3){const _0x3a6b2c=_0x2e9347;if(this[_0x3a6b2c(0x489)](_0x32b1b3)){if(_0x3a6b2c(0x2fd)==='POxFo')return this[_0x3a6b2c(0x43c)](_0x32b1b3)||_0x32b1b3;else{const _0x101b20=_0x3a6b2c(0x275);if(this['_customItemInfo'][_0x101b20])return this[_0x3a6b2c(0x4ee)][_0x101b20];const _0x5363f2=_0x3edb8a[_0x3a6b2c(0x2c2)][_0x3a6b2c(0x20a)][_0x3a6b2c(0x66f)]['ItemQuantityFmt'];return _0x5363f2[_0x3a6b2c(0x410)](_0x3db2c6[_0x3a6b2c(0x187)](this[_0x3a6b2c(0x2f1)]));}}else return _0x32b1b3;},DataManager[_0x2e9347(0x43c)]=function(_0x1be45e){const _0x8f74c9=_0x2e9347;_0x1be45e[_0x8f74c9(0x2c0)][_0x8f74c9(0x1f9)](/<PROXY:[ ](.*)>/i);const _0x40fc7c=RegExp['$1'][_0x8f74c9(0x515)](),_0x28f574=/^\d+$/['test'](_0x40fc7c);if(this[_0x8f74c9(0x207)](_0x1be45e)){const _0x5f37b8=_0x28f574?Number(RegExp['$1']):DataManager[_0x8f74c9(0x2ab)](_0x40fc7c);return $dataItems[_0x5f37b8]||_0x1be45e;}else{if(this[_0x8f74c9(0x514)](_0x1be45e)){const _0x5ed614=_0x28f574?Number(RegExp['$1']):DataManager[_0x8f74c9(0x618)](_0x40fc7c);return $dataWeapons[_0x5ed614]||_0x1be45e;}else{if(this['isArmor'](_0x1be45e)){if(_0x8f74c9(0x25c)===_0x8f74c9(0x25c)){const _0x37db5b=_0x28f574?Number(RegExp['$1']):DataManager['getArmorIdWithName'](_0x40fc7c);return $dataArmors[_0x37db5b]||_0x1be45e;}else{const _0x1bc41b=this[_0x8f74c9(0x2f7)]();return this['drawItemKeyData'](_0x1bc41b,_0x4a4504,_0x27c7a2,_0x2167f1,![],_0x8f74c9(0x5a6)),this[_0x8f74c9(0x5a5)](_0x5b374,_0x32f687,_0x4a55e0),this[_0x8f74c9(0x3d6)](),!![];}}}}return _0x1be45e;},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x1ae)]=Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x343)],Window_ItemList[_0x2e9347(0x655)]['item']=function(){const _0x31152c=_0x2e9347;if($gameTemp[_0x31152c(0x3e8)])return VisuMZ[_0x31152c(0x2c2)][_0x31152c(0x1ae)][_0x31152c(0x51f)](this);return DataManager[_0x31152c(0x533)](VisuMZ[_0x31152c(0x2c2)][_0x31152c(0x1ae)][_0x31152c(0x51f)](this));},Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x662)]=function(){const _0x465a11=_0x2e9347;return VisuMZ[_0x465a11(0x2c2)][_0x465a11(0x1ae)]['call'](this);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x283)]=Window_ShopBuy['prototype']['item'],Window_ShopBuy[_0x2e9347(0x655)][_0x2e9347(0x343)]=function(){const _0x10396e=_0x2e9347;if($gameTemp['_bypassProxy'])return VisuMZ[_0x10396e(0x2c2)][_0x10396e(0x283)]['call'](this);return DataManager[_0x10396e(0x533)](VisuMZ[_0x10396e(0x2c2)][_0x10396e(0x283)][_0x10396e(0x51f)](this));},Window_ShopBuy[_0x2e9347(0x655)][_0x2e9347(0x662)]=function(){const _0x52f047=_0x2e9347;return VisuMZ[_0x52f047(0x2c2)]['Window_ShopBuy_item']['call'](this);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x309)]=Game_Item['prototype'][_0x2e9347(0x4c4)],Game_Item[_0x2e9347(0x655)][_0x2e9347(0x4c4)]=function(_0x103145){const _0x3d64be=_0x2e9347;if(DataManager[_0x3d64be(0x489)](_0x103145))return;VisuMZ['ItemsEquipsCore'][_0x3d64be(0x309)][_0x3d64be(0x51f)](this,_0x103145);},VisuMZ['ItemsEquipsCore']['SetupArtifactItemIDs']=function(){const _0x40f00a=_0x2e9347;this[_0x40f00a(0x5e3)]={'partyArtifactIDs':[],'troopArtifactIDs':[]};for(const _0x1089d9 of $dataArmors){if('dLjsT'===_0x40f00a(0x4a5)){let _0x4a0ca5=_0x4a5e7e[_0x40f00a(0x2c2)][_0x40f00a(0x51e)]['call'](this,_0x1a92e3);if(this[_0x40f00a(0x654)]===_0x42a8df)for(const _0x517a0c of _0x243b60['troopArtifacts']()){if(_0x517a0c)_0x4a0ca5+=_0x517a0c[_0x40f00a(0x363)][_0x34a1ab];}return _0x4a0ca5;}else{if(!_0x1089d9)continue;if(!DataManager[_0x40f00a(0x17c)](_0x1089d9))continue;DataManager['isPartyArtifact'](_0x1089d9)&&(_0x40f00a(0x261)!==_0x40f00a(0x261)?(_0x5771fd[_0x40f00a(0x2c2)][_0x40f00a(0x56c)][_0x40f00a(0x51f)](this,_0x865555),this[_0x40f00a(0x380)](_0x87fa0)):this['artifactIDs']['partyArtifactIDs'][_0x40f00a(0x4bd)](_0x1089d9['id'])),DataManager['isTroopArtifact'](_0x1089d9)&&this[_0x40f00a(0x5e3)][_0x40f00a(0x29f)]['push'](_0x1089d9['id']);}}},DataManager[_0x2e9347(0x17c)]=function(_0x12b34c){const _0xdade7f=_0x2e9347;if(!this[_0xdade7f(0x392)](_0x12b34c))return![];const _0x3f31a2=_0x12b34c[_0xdade7f(0x2c0)];if(!_0x3f31a2)return![];if(_0x3f31a2[_0xdade7f(0x1f9)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3f31a2['match'](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3f31a2[_0xdade7f(0x1f9)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x3f31a2[_0xdade7f(0x1f9)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isStackableArtifact']=function(_0x9bcfc8){const _0x2ded30=_0x2e9347;if(!this[_0x2ded30(0x17c)](_0x9bcfc8))return![];const _0xe8f058=_0x9bcfc8[_0x2ded30(0x2c0)];if(!_0xe8f058)return![];if(_0xe8f058[_0x2ded30(0x1f9)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0xe8f058[_0x2ded30(0x1f9)](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager[_0x2e9347(0x65b)]=function(_0x11477f){const _0x1326db=_0x2e9347;if(!this[_0x1326db(0x17c)](_0x11477f))return![];const _0x2ca1d9=_0x11477f[_0x1326db(0x2c0)];if(!_0x2ca1d9)return![];if(_0x2ca1d9['match'](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x2ca1d9['match'](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];return![];},DataManager['isTroopArtifact']=function(_0xcd1191){const _0x2558ca=_0x2e9347;if(!this[_0x2558ca(0x17c)](_0xcd1191))return![];const _0x42208c=_0xcd1191[_0x2558ca(0x2c0)];if(!_0x42208c)return![];if(_0x42208c[_0x2558ca(0x1f9)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x42208c['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x40c)]=Game_BattlerBase[_0x2e9347(0x655)]['canEquip'],Game_BattlerBase[_0x2e9347(0x655)][_0x2e9347(0x4bb)]=function(_0x3eb4aa){const _0x58043f=_0x2e9347;if(DataManager[_0x58043f(0x17c)](_0x3eb4aa))return![];if(!DataManager[_0x58043f(0x567)](this,_0x3eb4aa))return![];if(!DataManager[_0x58043f(0x358)](this,_0x3eb4aa))return![];return VisuMZ[_0x58043f(0x2c2)][_0x58043f(0x40c)][_0x58043f(0x51f)](this,_0x3eb4aa);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x5b4)]=Game_BattlerBase[_0x2e9347(0x655)][_0x2e9347(0x4de)],Game_BattlerBase[_0x2e9347(0x655)]['param']=function(_0x466906){const _0x247fb6=_0x2e9347;this[_0x247fb6(0x36b)]=!![];const _0xe7341=VisuMZ[_0x247fb6(0x2c2)][_0x247fb6(0x5b4)][_0x247fb6(0x51f)](this,_0x466906);return this[_0x247fb6(0x36b)]=undefined,_0xe7341;},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x487)]=Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x34f)],Game_Actor['prototype'][_0x2e9347(0x34f)]=function(){const _0x51ac3a=_0x2e9347;this['_allowArtifactTraitObjects']=!![];const _0x24ba6f=VisuMZ[_0x51ac3a(0x2c2)][_0x51ac3a(0x487)][_0x51ac3a(0x51f)](this);return this['_allowArtifactTraitObjects']=undefined,_0x24ba6f;},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x3fb)]=Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x293)],Game_Actor[_0x2e9347(0x655)]['equips']=function(){const _0x296ace=_0x2e9347,_0x15c79c=VisuMZ[_0x296ace(0x2c2)][_0x296ace(0x3fb)][_0x296ace(0x51f)](this);if(this[_0x296ace(0x6b2)]||this[_0x296ace(0x36b)]){const _0x2a68bc=_0x15c79c[_0x296ace(0x15b)]($gameParty[_0x296ace(0x661)]());return _0x2a68bc;}else return _0x296ace(0x664)===_0x296ace(0x4fa)?_0x2b09ae['ItemsEquipsCore'][_0x296ace(0x20a)][_0x296ace(0x375)]['Speed1']:_0x15c79c;},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x51e)]=Game_BattlerBase['prototype'][_0x2e9347(0x6a1)],Game_BattlerBase[_0x2e9347(0x655)][_0x2e9347(0x6a1)]=function(_0x590c3a){const _0x46d2e2=_0x2e9347;let _0x5ea187=VisuMZ['ItemsEquipsCore'][_0x46d2e2(0x51e)][_0x46d2e2(0x51f)](this,_0x590c3a);if(this[_0x46d2e2(0x654)]===Game_Enemy)for(const _0x49a5de of $gameParty['troopArtifacts']()){if(_0x46d2e2(0x50c)===_0x46d2e2(0x50c)){if(_0x49a5de)_0x5ea187+=_0x49a5de[_0x46d2e2(0x363)][_0x590c3a];}else this[_0x46d2e2(0x370)]();}return _0x5ea187;},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x632)]=Game_Enemy['prototype'][_0x2e9347(0x34f)],Game_Enemy[_0x2e9347(0x655)][_0x2e9347(0x34f)]=function(){const _0x3b77ae=_0x2e9347;let _0x3df954=VisuMZ[_0x3b77ae(0x2c2)]['Game_Enemy_traitObjects_artifact'][_0x3b77ae(0x51f)](this);return _0x3df954[_0x3b77ae(0x15b)]($gameParty[_0x3b77ae(0x511)]());},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x644)]=Game_Party[_0x2e9347(0x655)][_0x2e9347(0x168)],Game_Party['prototype']['gainItem']=function(_0x57ac18,_0xf593e8,_0x2f8dcd){const _0x38f8b7=_0x2e9347;VisuMZ[_0x38f8b7(0x2c2)]['Game_Party_gainItem_artifact'][_0x38f8b7(0x51f)](this,_0x57ac18,_0xf593e8,_0x2f8dcd);if(DataManager[_0x38f8b7(0x17c)](_0x57ac18)){if(_0x38f8b7(0x42d)===_0x38f8b7(0x377)){const _0x201ac3=_0x38f8b7(0x1dd);if(this['_customItemInfo'][_0x201ac3])return this[_0x38f8b7(0x4ee)][_0x201ac3];const _0x228cdd=_0x1e7fdf[_0x38f8b7(0x2c2)][_0x38f8b7(0x20a)][_0x38f8b7(0x375)],_0x1cf941=_0x38f8b7(0x5ba)['format'](this[_0x38f8b7(0x2f1)][_0x38f8b7(0x28d)]);return _0x228cdd[_0x1cf941];}else{let _0x2f1341=$gameParty['allMembers']();if($gameParty[_0x38f8b7(0x285)]())_0x2f1341=_0x2f1341[_0x38f8b7(0x15b)]($gameTroop[_0x38f8b7(0x460)]());for(const _0x3d51ec of _0x2f1341){if(!_0x3d51ec)continue;_0x3d51ec['_cache']={};}}}},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x661)]=function(){const _0x3f1738=_0x2e9347;let _0x42d433=[];const _0x2cb850=VisuMZ[_0x3f1738(0x2c2)][_0x3f1738(0x5e3)][_0x3f1738(0x5fd)];if(_0x2cb850)for(const _0x17d834 of _0x2cb850){const _0x4cbbb5=$dataArmors[_0x17d834];if(!_0x4cbbb5)continue;if(!this[_0x3f1738(0x215)](_0x4cbbb5))continue;let _0x2ac672=0x1;if(DataManager['isStackableArtifact'](_0x4cbbb5))_0x2ac672=this[_0x3f1738(0x187)](_0x4cbbb5);while(_0x2ac672--)_0x42d433['push'](_0x4cbbb5);}return _0x42d433;},Game_Party['prototype'][_0x2e9347(0x511)]=function(){const _0x373d23=_0x2e9347;let _0x7a8ba4=[];const _0x100445=VisuMZ['ItemsEquipsCore'][_0x373d23(0x5e3)][_0x373d23(0x29f)];if(_0x100445)for(const _0x580053 of _0x100445){if('MbvQS'===_0x373d23(0x218)){const _0x39e5dd=$dataArmors[_0x580053];if(!_0x39e5dd)continue;if(!this[_0x373d23(0x215)](_0x39e5dd))continue;let _0x54367c=0x1;if(DataManager[_0x373d23(0x20c)](_0x39e5dd))_0x54367c=this[_0x373d23(0x187)](_0x39e5dd);while(_0x54367c--)_0x7a8ba4[_0x373d23(0x4bd)](_0x39e5dd);}else _0x2048fc=!![];}return _0x7a8ba4;},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x65c)]=function(){const _0x2d7772=_0x2e9347;return this[_0x2d7772(0x661)]()[_0x2d7772(0x15b)](this[_0x2d7772(0x511)]());},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x3cf)]=Game_Party[_0x2e9347(0x655)][_0x2e9347(0x443)],Game_Party[_0x2e9347(0x655)][_0x2e9347(0x443)]=function(){const _0x52431d=_0x2e9347;VisuMZ[_0x52431d(0x2c2)][_0x52431d(0x3cf)][_0x52431d(0x51f)](this),this[_0x52431d(0x45b)]();},Game_Party['prototype'][_0x2e9347(0x45b)]=function(){const _0x23f751=_0x2e9347,_0x2a52f4=$gameParty[_0x23f751(0x1f0)]()[_0x23f751(0x4aa)](_0xb071ab=>DataManager[_0x23f751(0x17c)](_0xb071ab));for(const _0x49ea2b of _0x2a52f4){if(_0x23f751(0x6a8)===_0x23f751(0x45f)){const _0x3bb1db=_0x5b1504(_0x33d062['$1']),_0x33da1a=_0x23f751(0x66c)[_0x23f751(0x410)](_0x3bb1db);_0x8e2373[_0x23f751(0x2c2)]['itemEnableJS'][_0x5645ff['id']]=new _0x510362(_0x23f751(0x343),_0x33da1a);}else{const _0x5d1b06=this[_0x23f751(0x187)](_0x49ea2b);if(_0x5d1b06)this[_0x23f751(0x5eb)](_0x49ea2b,_0x5d1b06);}}},DataManager[_0x2e9347(0x567)]=function(_0x146c9c,_0x1d6465){const _0x3efd0c=_0x2e9347;if(this[_0x3efd0c(0x207)](_0x1d6465))return![];if(!_0x146c9c)return![];if($gameTemp[_0x3efd0c(0x1e4)])return!![];if(BattleManager['isBattleTest']())return!![];const _0x4e00cd=this[_0x3efd0c(0x4db)](_0x1d6465);if(_0x4e00cd[_0x3efd0c(0x3d3)]<=0x0)return!![];return _0x4e00cd[_0x3efd0c(0x5e8)](_0x146c9c[_0x3efd0c(0x317)]()['id']);},DataManager[_0x2e9347(0x4db)]=function(_0x2e5928){const _0x420919=_0x2e9347;if(!_0x2e5928)return[];this['_getClassRequirements']=this[_0x420919(0x613)]||{};const _0x52aada=_0x420919(0x32f)[_0x420919(0x410)](this[_0x420919(0x514)](_0x2e5928)?'WEAPON':_0x420919(0x30e),_0x2e5928['id']);if(this['_getClassRequirements'][_0x52aada]!==undefined)return this['_getClassRequirements'][_0x52aada];let _0x492268=[];const _0x3fb1d0=_0x2e5928[_0x420919(0x2c0)]||'';if(_0x3fb1d0['match'](/<EQUIP FOR CLASS(?:|ES) ONLY:[ ](.*)>/i)){if(_0x420919(0x3f2)!==_0x420919(0x5a9)){const _0xf83eb0=String(RegExp['$1'])[_0x420919(0x47f)](',')[_0x420919(0x6a3)](_0x48c3cb=>_0x48c3cb[_0x420919(0x515)]());for(const _0x49272c of _0xf83eb0){if(_0x420919(0x1c2)===_0x420919(0x1c2)){const _0x56c475=/^\d+$/[_0x420919(0x1bc)](_0x49272c);if(_0x56c475)_0x492268[_0x420919(0x4bd)](Number(_0x49272c));else{if(_0x420919(0x6c0)===_0x420919(0x6c0))_0x492268['push'](DataManager[_0x420919(0x33e)](_0x49272c));else{const _0x2ef65e=_0x102d93(_0x18433b['$1'])[_0x420919(0x47f)](',')['map'](_0x1c1357=>_0xa8c8ca(_0x1c1357));if(_0x2ef65e[_0x420919(0x296)](_0x19eb6b=>!_0x12b190[_0x420919(0x334)](_0x19eb6b)))return![];}}}else{const _0x2d27dd=this[_0x420919(0x35b)]();this[_0x420919(0x608)](_0x2d27dd,_0x1d3dde,_0x368c21,_0x374e56,!![]);const _0x1391b9=this['getItemRepeatsText']();return this['drawItemKeyData'](_0x1391b9,_0x36deae,_0x8a842b,_0x176f4f,![],_0x420919(0x5a1)),this[_0x420919(0x5a5)](_0x353615,_0x1aeabb,_0xc0c9f0),this[_0x420919(0x3d6)](),!![];}}}else{const _0x1b7dc3=_0x420919(0x223);if(this['_itemData']['selfTP']===0x0&&!this[_0x420919(0x4ee)][_0x1b7dc3])return![];const _0x2794ff=this[_0x420919(0x1cd)]();this[_0x420919(0x608)](_0x2794ff,_0x231146,_0x26dc10,_0x1844cc,!![]);const _0x364947=this[_0x420919(0x1d9)]();return this[_0x420919(0x4da)][_0x420919(0x34e)]>0x0?this[_0x420919(0x6ac)](_0x4fc0f3['powerUpColor']()):this[_0x420919(0x6ac)](_0x3bd59b[_0x420919(0x49b)]()),this['drawItemKeyData'](_0x364947,_0x298bc7,_0x465f97,_0x1aa841,![],_0x420919(0x5a1)),this[_0x420919(0x5a5)](_0x152f33,_0x2e3a71,_0x15ffb5),this[_0x420919(0x3d6)](),!![];}}return this['_getClassRequirements'][_0x52aada]=_0x492268,this[_0x420919(0x613)][_0x52aada];},DataManager[_0x2e9347(0x358)]=function(_0x39646c,_0x2784e7){const _0x26e6c4=_0x2e9347;if(this[_0x26e6c4(0x207)](_0x2784e7))return![];if(!_0x39646c)return![];if($gameTemp[_0x26e6c4(0x1e4)])return!![];if(BattleManager[_0x26e6c4(0x637)]())return!![];const _0xda104d=this[_0x26e6c4(0x38b)](_0x2784e7);for(const _0xc9efda of _0xda104d){if('eWGZu'!==_0x26e6c4(0x2fc)){if(!this[_0x26e6c4(0x36e)](_0x39646c,_0xc9efda))return![];}else{const _0x548da7=this[_0x26e6c4(0x2f1)]['note'];if(_0x548da7[_0x26e6c4(0x1f9)](/<ALWAYS HIT>/i))return _0x26e6c4(0x591);else{if(_0x548da7['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return'%1%'['format'](_0x2902ab(_0x571eee['$1']));}}}return!![];},DataManager['getEquipRequirements']=function(_0x1bc18b){const _0x2da18c=_0x2e9347;if(!_0x1bc18b)return[];this[_0x2da18c(0x56a)]=this[_0x2da18c(0x56a)]||{};const _0x2b5d32=_0x2da18c(0x32f)[_0x2da18c(0x410)](this[_0x2da18c(0x514)](_0x1bc18b)?_0x2da18c(0x351):_0x2da18c(0x30e),_0x1bc18b['id']);if(this[_0x2da18c(0x56a)][_0x2b5d32]!==undefined)return'goTge'!==_0x2da18c(0x63a)?this[_0x2da18c(0x56a)][_0x2b5d32]:this[_0x2da18c(0x43e)]()?this['commandWindowRectItemsEquipsCore']():_0x5bc9f9['ItemsEquipsCore'][_0x2da18c(0x549)][_0x2da18c(0x51f)](this);let _0x21e9a4=[];const _0x561551=_0x1bc18b[_0x2da18c(0x2c0)]||'';return _0x561551['match'](/<EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>\s*([\s\S]*)\s*<\/EQUIP(?:|MENT)[ ]REQUIREMENT(?:|S)>/i)&&(_0x2da18c(0x210)===_0x2da18c(0x5d9)?this[_0x2da18c(0x553)]():_0x21e9a4=String(RegExp['$1'])[_0x2da18c(0x47f)](/[\r\n]+/)),this[_0x2da18c(0x56a)][_0x2b5d32]=_0x21e9a4,this[_0x2da18c(0x56a)][_0x2b5d32];},DataManager['meetsEquipRequirement']=function(_0x5b035f,_0x86edcd){const _0x53950b=_0x2e9347;if(_0x86edcd[_0x53950b(0x1f9)](/(?:LEVEL|LV|LVL)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x21d5f2=String(RegExp['$1'])[_0x53950b(0x515)](),_0x2542e6=Number(RegExp['$2']);switch(_0x21d5f2){case'>':return _0x5b035f[_0x53950b(0x2aa)]>_0x2542e6;case'>=':return _0x5b035f[_0x53950b(0x2aa)]>=_0x2542e6;case _0x53950b(0x423):return _0x5b035f['level']===_0x2542e6;case'<=':return _0x5b035f['level']<=_0x2542e6;case'<':return _0x5b035f['level']<_0x2542e6;}return![];}if(_0x86edcd[_0x53950b(0x1f9)](/(MAXHP|MAXMP|MHP|MMP)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x4840fe=String(RegExp['$1'])[_0x53950b(0x692)]()['trim'](),_0x1c2a50=String(RegExp['$2'])[_0x53950b(0x515)](),_0x32167e=Number(RegExp['$3']);let _0x224936=0x0;if(['maxmp',_0x53950b(0x274)][_0x53950b(0x5e8)](_0x4840fe))_0x224936=0x1;const _0x8bebb0=_0x5b035f[_0x53950b(0x30d)][_0x224936]||0x0;switch(_0x1c2a50){case'>':return _0x5b035f[_0x53950b(0x63d)](_0x224936)+_0x8bebb0>_0x32167e;case'>=':return _0x5b035f['paramBase'](_0x224936)+_0x8bebb0>=_0x32167e;case _0x53950b(0x423):return _0x5b035f['paramBase'](_0x224936)+_0x8bebb0===_0x32167e;case'<=':return _0x5b035f[_0x53950b(0x63d)](_0x224936)+_0x8bebb0<=_0x32167e;case'<':return _0x5b035f[_0x53950b(0x63d)](_0x224936)+_0x8bebb0<_0x32167e;}return![];}if(_0x86edcd[_0x53950b(0x1f9)](/(ATK|DEF|MAT|MDF|AGI|LUK)[ ](>|>=|===|<=|<)[ ](\d+)/i)){const _0x29381b=String(RegExp['$1'])[_0x53950b(0x692)]()[_0x53950b(0x515)](),_0x2fb605=String(RegExp['$2'])[_0x53950b(0x515)](),_0x18f1ce=Number(RegExp['$3']),_0x416952=[_0x53950b(0x3b0),'def',_0x53950b(0x4bf),_0x53950b(0x5d3),_0x53950b(0x6c2),'luk'];let _0x579c55=_0x416952[_0x53950b(0x22f)](_0x29381b)+0x2;if(_0x579c55<0x2)return![];const _0x3d81bb=_0x5b035f[_0x53950b(0x30d)][_0x579c55]||0x0;switch(_0x2fb605){case'>':return _0x5b035f[_0x53950b(0x63d)](_0x579c55)+_0x3d81bb>_0x18f1ce;case'>=':return _0x5b035f['paramBase'](_0x579c55)+_0x3d81bb>=_0x18f1ce;case'===':return _0x5b035f[_0x53950b(0x63d)](_0x579c55)+_0x3d81bb===_0x18f1ce;case'<=':return _0x5b035f[_0x53950b(0x63d)](_0x579c55)+_0x3d81bb<=_0x18f1ce;case'<':return _0x5b035f[_0x53950b(0x63d)](_0x579c55)+_0x3d81bb<_0x18f1ce;}return![];}if(_0x86edcd['match'](/LEARNED SKILL:[ ](\d+)/i)){const _0x9b47bb=Number(RegExp['$1']);return _0x5b035f[_0x53950b(0x2af)](_0x9b47bb);}else{if(_0x86edcd[_0x53950b(0x1f9)](/LEARNED SKILL:[ ](.*)/i)){const _0x33ff0c=String(RegExp['$1']),_0x47d420=this[_0x53950b(0x3ec)](_0x33ff0c);return _0x5b035f[_0x53950b(0x2af)](_0x47d420);}}if(_0x86edcd['match'](/SWITCH:[ ](\d+)/i)){if(_0x53950b(0x5a0)===_0x53950b(0x6aa))_0x516412=_0x464706+_0x472e78-_0xa3be20[_0x53950b(0x21b)];else{const _0x19fea5=Number(RegExp['$1']);return $gameSwitches[_0x53950b(0x334)](_0x19fea5);}}return!![];},DataManager['getEtypeIDs']=function(_0xda8f82){const _0x4e1571=_0x2e9347;if(this[_0x4e1571(0x392)](_0xda8f82))return this[_0x4e1571(0x19d)](_0xda8f82);else{if('fXEqv'!==_0x4e1571(0x3a0))this[_0x4e1571(0x4f1)]['hide'](),this[_0x4e1571(0x33d)][_0x4e1571(0x3a2)]();else return[_0xda8f82[_0x4e1571(0x15c)]||0x0];}},DataManager[_0x2e9347(0x19d)]=function(_0x3100aa){const _0x4ba04b=_0x2e9347;this[_0x4ba04b(0x273)]=this[_0x4ba04b(0x273)]||{};if(this['_cache_etypeIDs'][_0x3100aa['id']]!==undefined)return this[_0x4ba04b(0x273)][_0x3100aa['id']];this[_0x4ba04b(0x273)][_0x3100aa['id']]=[_0x3100aa[_0x4ba04b(0x15c)]||0x0];const _0x3957a1=_0x3100aa[_0x4ba04b(0x2c0)]||'';if(_0x3957a1[_0x4ba04b(0x1f9)](/<ADDED ETYPE(?:|S):[ ](.*)>/i)){const _0x12d945=String(RegExp['$1'])[_0x4ba04b(0x47f)](',')['map'](_0x59673f=>_0x59673f[_0x4ba04b(0x515)]());for(const _0xb7b6f of _0x12d945){const _0x53856b=/^\d+$/[_0x4ba04b(0x1bc)](_0xb7b6f);let _0x40d17b=0x0;_0x53856b?_0x40d17b=Number(_0xb7b6f):_0x4ba04b(0x2ce)===_0x4ba04b(0x2ce)?_0x40d17b=this[_0x4ba04b(0x601)](_0xb7b6f):(!this[_0x4ba04b(0x5d4)](_0x4ba04b(0x56d))&&_0x152117[_0x4ba04b(0x4c1)](_0x4ba04b(0x56d))&&this['cursorPagedown'](),!this['isHandled']('pageup')&&_0x5b9176[_0x4ba04b(0x4c1)](_0x4ba04b(0x583))&&this[_0x4ba04b(0x56e)]());if(_0x40d17b>0x1){if(_0x4ba04b(0x642)!==_0x4ba04b(0x642))return this[_0x4ba04b(0x39f)](_0x4ba04b(0x3c6),_0x21596f);else this['_cache_etypeIDs'][_0x3100aa['id']][_0x4ba04b(0x4bd)](_0x40d17b);}}}return this[_0x4ba04b(0x273)][_0x3100aa['id']];},Game_BattlerBase[_0x2e9347(0x655)][_0x2e9347(0x220)]=function(_0x137599){const _0x211420=_0x2e9347;return this[_0x211420(0x164)](_0x137599[_0x211420(0x3e7)])&&!this[_0x211420(0x1e3)](_0x137599[_0x211420(0x15c)])&&DataManager[_0x211420(0x404)](_0x137599)[_0x211420(0x296)](_0x23f189=>!this[_0x211420(0x1e3)](_0x23f189));},DataManager[_0x2e9347(0x2fe)]=function(_0x2e074b){const _0x5ec882=_0x2e9347;if(!this['isWeapon'](_0x2e074b)&&!this[_0x5ec882(0x392)](_0x2e074b))return![];if(Imported[_0x5ec882(0x47b)]&&this['isWeapon'](_0x2e074b))return![];if(!_0x2e074b[_0x5ec882(0x2c0)])return![];return _0x2e074b[_0x5ec882(0x2c0)][_0x5ec882(0x1f9)](/<CURSED>/i);},DataManager[_0x2e9347(0x648)]=function(_0x2100e7){const _0x3c36d2=_0x2e9347;if(!_0x2100e7)return _0x2100e7;if(!this['isWeapon'](_0x2100e7)&&!this[_0x3c36d2(0x392)](_0x2100e7))return _0x2100e7;if(_0x2100e7[_0x3c36d2(0x2c0)][_0x3c36d2(0x1f9)](/<PURIFY TRANSFORM:[ ](.*)>/i)){if(_0x3c36d2(0x38e)===_0x3c36d2(0x67c))_0x51fb4c[_0x3c36d2(0x3a2)]();else{const _0x124215=String(RegExp['$1'])[_0x3c36d2(0x515)](),_0x58a888=/^\d+$/[_0x3c36d2(0x1bc)](_0x124215);if(_0x58a888){if('EpTgb'!=='SIeEn'){if(this[_0x3c36d2(0x514)](_0x2100e7))return $dataWeapons[Number(_0x124215)];if(this[_0x3c36d2(0x392)](_0x2100e7))return $dataArmors[Number(_0x124215)];}else{if(!this['isUseModernControls']())_0x29919c[_0x3c36d2(0x655)][_0x3c36d2(0x2f0)][_0x3c36d2(0x51f)](this);}}else{if(_0x3c36d2(0x628)==='oIhjD'){if(this[_0x3c36d2(0x514)](_0x2100e7))return $dataWeapons[this[_0x3c36d2(0x618)](_0x124215)];if(this[_0x3c36d2(0x392)](_0x2100e7))return $dataArmors[this[_0x3c36d2(0x638)](_0x124215)];}else{if(_0x36fc1e)_0x8ed3dd[_0x3c36d2(0x598)]();}}}}return _0x2100e7;},Game_Party['prototype']['purifyCursedEquips']=function(){const _0x4f170b=this['allMembers']();for(const _0x328f50 of _0x4f170b){if(!_0x328f50)continue;_0x328f50['purifyCursedEquips']();}},Game_Actor[_0x2e9347(0x655)]['purifyCursedEquips']=function(){const _0x513973=_0x2e9347,_0x2c8b0a=this[_0x513973(0x3b3)]()['length'];for(let _0x4d660d=0x0;_0x4d660d<_0x2c8b0a;_0x4d660d++){const _0x26ddae=this['_equips'][_0x4d660d];if(!_0x26ddae)continue;const _0x320729=_0x26ddae[_0x513973(0x55f)]();if(!DataManager[_0x513973(0x2fe)](_0x320729))continue;let _0x361fa4=DataManager[_0x513973(0x648)](_0x320729);this[_0x513973(0x4f2)](_0x320729,_0x361fa4)?(this[_0x513973(0x585)][_0x4d660d][_0x513973(0x4c4)](_0x361fa4),this[_0x513973(0x474)]()):this[_0x513973(0x2cc)](_0x4d660d,null);}},Game_Actor['prototype'][_0x2e9347(0x4f2)]=function(_0x108cae,_0x20c653){const _0x329bb8=_0x2e9347;if(_0x108cae===_0x20c653)return![];const _0x93969d=DataManager[_0x329bb8(0x404)](_0x20c653);if(!_0x93969d[_0x329bb8(0x5e8)](_0x108cae['etypeId']))return![];if(DataManager[_0x329bb8(0x514)](_0x20c653))return _0x329bb8(0x5bb)!==_0x329bb8(0x5bb)?_0x55693e[_0x329bb8(0x646)]:this[_0x329bb8(0x217)](_0x20c653[_0x329bb8(0x53f)]);else{if(DataManager[_0x329bb8(0x392)](_0x20c653)){if('CncQr'!==_0x329bb8(0x5b6))return this[_0x329bb8(0x164)](_0x20c653['atypeId']);else _0x5e383f=_0x27bf9b(_0x3a16e0['$1'])[_0x329bb8(0x515)]();}}return![];},TextManager[_0x2e9347(0x22c)]={'helpDesc':{'equip':VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x20a)][_0x2e9347(0x575)][_0x2e9347(0x4be)]??_0x2e9347(0x506),'optimize':VisuMZ[_0x2e9347(0x2c2)]['Settings'][_0x2e9347(0x575)]['optimizeCmdDesc']??_0x2e9347(0x1fd),'clear':VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x20a)][_0x2e9347(0x575)][_0x2e9347(0x63b)]??_0x2e9347(0x6c5)}},ColorManager['getItemColor']=function(_0x1fb420){const _0x11cb53=_0x2e9347;if(!_0x1fb420)return this[_0x11cb53(0x270)]();else{if(_0x1fb420[_0x11cb53(0x2c0)]['match'](/<COLOR:[ ](\d+)>/i)){if(_0x11cb53(0x38f)!==_0x11cb53(0x58a))return this['textColor'](Number(RegExp['$1'])[_0x11cb53(0x5b5)](0x0,0x1f));else this[_0x11cb53(0x4c5)]();}else return _0x1fb420[_0x11cb53(0x2c0)]['match'](/<COLOR:[ ]#(.*)>/i)?'#'+String(RegExp['$1']):this[_0x11cb53(0x270)]();}},ColorManager[_0x2e9347(0x57e)]=function(_0x2563a9){const _0x2386b8=_0x2e9347;return _0x2563a9=String(_0x2563a9),_0x2563a9['match'](/#(.*)/i)?_0x2386b8(0x3a9)[_0x2386b8(0x410)](String(RegExp['$1'])):this[_0x2386b8(0x3ff)](Number(_0x2563a9));},SceneManager['isSceneShop']=function(){const _0x501c50=_0x2e9347;return this[_0x501c50(0x1c8)]&&this[_0x501c50(0x1c8)]['constructor']===Scene_Shop;},Game_Temp['prototype'][_0x2e9347(0x593)]=function(){const _0x360c20=_0x2e9347;if(this[_0x360c20(0x41d)])return![];return VisuMZ['ItemsEquipsCore'][_0x360c20(0x20a)][_0x360c20(0x674)][_0x360c20(0x235)];},VisuMZ[_0x2e9347(0x35c)]=VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x20a)][_0x2e9347(0x375)][_0x2e9347(0x53e)],VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x376)]=Game_BattlerBase['prototype'][_0x2e9347(0x4de)],Game_BattlerBase[_0x2e9347(0x655)][_0x2e9347(0x4de)]=function(_0x7f5310){const _0x1543c4=_0x2e9347;return this['_shopStatusMenuMode']?this[_0x1543c4(0x5ca)]?VisuMZ['ShopMenuStatusStandard']:0x1:VisuMZ[_0x1543c4(0x2c2)][_0x1543c4(0x376)][_0x1543c4(0x51f)](this,_0x7f5310);},VisuMZ[_0x2e9347(0x2c2)]['Game_BattlerBase_meetsItemConditions']=Game_BattlerBase[_0x2e9347(0x655)][_0x2e9347(0x5df)],Game_BattlerBase['prototype'][_0x2e9347(0x5df)]=function(_0xb43663){const _0x8536e6=_0x2e9347;if(!_0xb43663)return![];if(!VisuMZ[_0x8536e6(0x2c2)]['Game_BattlerBase_meetsItemConditions']['call'](this,_0xb43663))return![];if(!this[_0x8536e6(0x3dd)](_0xb43663))return![];if(!this[_0x8536e6(0x556)](_0xb43663))return![];return!![];},Game_BattlerBase[_0x2e9347(0x655)][_0x2e9347(0x3dd)]=function(_0x232279){if(!this['checkItemConditionsSwitchNotetags'](_0x232279))return![];return!![];},Game_BattlerBase[_0x2e9347(0x655)][_0x2e9347(0x3c0)]=function(_0x7de602){const _0x300958=_0x2e9347,_0x4470af=_0x7de602['note'];if(_0x4470af[_0x300958(0x1f9)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x21a51=JSON['parse']('['+RegExp['$1'][_0x300958(0x1f9)](/\d+/g)+']');for(const _0xd1fe21 of _0x21a51){if(!$gameSwitches[_0x300958(0x334)](_0xd1fe21))return![];}return!![];}if(_0x4470af[_0x300958(0x1f9)](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x298e83=JSON['parse']('['+RegExp['$1'][_0x300958(0x1f9)](/\d+/g)+']');for(const _0x4800d9 of _0x298e83){if(_0x300958(0x541)==='voPyS')this[_0x300958(0x1d1)][_0x300958(0x499)](_0x300958(0x44d),this[_0x300958(0x229)][_0x300958(0x245)](this));else{if(!$gameSwitches[_0x300958(0x334)](_0x4800d9))return![];}}return!![];}if(_0x4470af['match'](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x163b1c=JSON[_0x300958(0x233)]('['+RegExp['$1'][_0x300958(0x1f9)](/\d+/g)+']');for(const _0x649bcf of _0x163b1c){if($gameSwitches[_0x300958(0x334)](_0x649bcf))return!![];}return![];}if(_0x4470af[_0x300958(0x1f9)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x25bfc6=JSON[_0x300958(0x233)]('['+RegExp['$1'][_0x300958(0x1f9)](/\d+/g)+']');for(const _0x2a6469 of _0x25bfc6){if('BUuvu'===_0x300958(0x17b)){if(!$gameSwitches[_0x300958(0x334)](_0x2a6469))return!![];}else this['_statusWindow'][_0x300958(0x3a1)]();}return![];}if(_0x4470af[_0x300958(0x1f9)](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x522cf2=JSON[_0x300958(0x233)]('['+RegExp['$1'][_0x300958(0x1f9)](/\d+/g)+']');for(const _0x362711 of _0x522cf2){if(_0x300958(0x399)===_0x300958(0x399)){if(!$gameSwitches[_0x300958(0x334)](_0x362711))return!![];}else{const _0x3e7f1f=_0x27b9c0[_0x300958(0x463)](_0x38dd58,_0xfc8138,_0x5862fc,_0x18d3e1)&&_0x63ccf9[_0x300958(0x372)],_0x328eca=_0x445660?_0x32bd40[_0x300958(0x5a8)]:'';if(_0x3e7f1f)_0x754ea9['prototype'][_0x300958(0x5de)][_0x300958(0x51f)](this,_0x514e02);_0x5625af[_0x300958(0x655)][_0x300958(0x69b)]['call'](this,_0x30a60a,_0xa894df,_0x1ddaa0,_0x2b7245);if(_0x3e7f1f)_0x403be1[_0x300958(0x5a8)]=_0x328eca;}}return![];}if(_0x4470af[_0x300958(0x1f9)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d0117=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x58bb66 of _0x3d0117){if($gameSwitches[_0x300958(0x334)](_0x58bb66))return![];}return!![];}return!![];},Game_BattlerBase[_0x2e9347(0x655)]['meetsItemConditionsJS']=function(_0x5addaa){const _0x161fca=_0x2e9347,_0x2190ae=_0x5addaa['note'],_0xc5d578=VisuMZ[_0x161fca(0x2c2)][_0x161fca(0x60d)];if(_0xc5d578[_0x5addaa['id']]){if(_0x161fca(0x62a)===_0x161fca(0x62a))return _0xc5d578[_0x5addaa['id']]['call'](this,_0x5addaa);else _0x45eb84[_0x161fca(0x655)][_0x161fca(0x597)][_0x161fca(0x51f)](this,_0x96c3e8);}else return!![];},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x1db)]=function(_0x20317b){const _0x34b7d5=_0x2e9347;_0x20317b=this[_0x34b7d5(0x3b2)](_0x20317b);const _0xdc6323=this[_0x34b7d5(0x3b3)]();this[_0x34b7d5(0x585)]=[];for(let _0x1a9f0d=0x0;_0x1a9f0d<_0xdc6323[_0x34b7d5(0x3d3)];_0x1a9f0d++){this[_0x34b7d5(0x585)][_0x1a9f0d]=new Game_Item();}for(let _0x1516cb=0x0;_0x1516cb<_0xdc6323['length'];_0x1516cb++){if(_0x34b7d5(0x584)!==_0x34b7d5(0x182)){const _0x566a39=_0xdc6323[_0x1516cb],_0x386a7a=this[_0x34b7d5(0x532)](_0x20317b,_0x566a39);if(this[_0x34b7d5(0x4bb)](_0x386a7a))this[_0x34b7d5(0x585)][_0x1516cb]['setObject'](_0x386a7a);}else return![];}this[_0x34b7d5(0x5a4)](!![]),this[_0x34b7d5(0x474)]();},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x3b2)]=function(_0x2fb11e){const _0x30696c=_0x2e9347,_0x260462=[];for(let _0x374bee=0x0;_0x374bee<_0x2fb11e['length'];_0x374bee++){const _0x4b867f=_0x2fb11e[_0x374bee];if(_0x4b867f<=0x0)continue;const _0x3d3516=$dataSystem[_0x30696c(0x313)][_0x374bee+0x1];if(_0x3d3516===$dataSystem[_0x30696c(0x313)][0x1]||_0x374bee===0x1&&this['isDualWield']())_0x260462[_0x30696c(0x4bd)]($dataWeapons[_0x4b867f]);else{if(BattleManager[_0x30696c(0x637)]()){const _0x339994=$dataArmors[_0x4b867f];_0x339994&&_0x339994['etypeId']===_0x374bee+0x1&&_0x260462[_0x30696c(0x4bd)](_0x339994);}else{const _0x51ef24=$dataArmors[_0x4b867f];_0x51ef24&&_0x51ef24[_0x30696c(0x15c)]===_0x374bee+0x1&&_0x260462[_0x30696c(0x4bd)](_0x51ef24);}}}return _0x260462;},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x532)]=function(_0x41df76,_0x3a2402){const _0x23bc0b=_0x2e9347;for(const _0x4c14e2 of _0x41df76){if(_0x23bc0b(0x6a7)===_0x23bc0b(0x696))this[_0x23bc0b(0x52e)](this[_0x23bc0b(0x42f)]())?(this[_0x23bc0b(0x5b9)](),this[_0x23bc0b(0x3c9)]()):this[_0x23bc0b(0x605)]();else{if(!_0x4c14e2)continue;if(_0x4c14e2['etypeId']===_0x3a2402){if('nLFvt'==='nPAuY'){if(this[_0x23bc0b(0x5e6)]())return _0x1eb5cb[_0x23bc0b(0x2c2)][_0x23bc0b(0x20a)]['ItemScene'][_0x23bc0b(0x2d5)];return _0x10b7a9['prototype'][_0x23bc0b(0x667)][_0x23bc0b(0x51f)](this);}else return _0x41df76[_0x23bc0b(0x32c)](_0x41df76['indexOf'](_0x4c14e2),0x1),_0x4c14e2;}}}return null;},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x3b3)]=function(){const _0x22801d=_0x2e9347,_0x2553a8=VisuMZ[_0x22801d(0x2c2)]['deepCopy'](this[_0x22801d(0x502)]||this['currentClass']()[_0x22801d(0x3b3)]);if(_0x2553a8['length']>=0x2&&this['isDualWield']())_0x2553a8[0x1]=0x1;return _0x2553a8;},Game_Actor['prototype'][_0x2e9347(0x1c5)]=function(_0x3a00a7){const _0x25609a=_0x2e9347;_0x3a00a7[_0x25609a(0x34b)](0x0),_0x3a00a7['remove'](-0x1),this[_0x25609a(0x502)]=_0x3a00a7,this['refresh'](),this[_0x25609a(0x647)]();},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x397)]=function(){const _0xd41270=_0x2e9347;this[_0xd41270(0x502)]=undefined,this['refresh'](),this[_0xd41270(0x647)]();},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x647)]=function(){const _0x457cf6=_0x2e9347;let _0x49aa54=this[_0x457cf6(0x3b3)]()[_0x457cf6(0x3d3)];while(this[_0x457cf6(0x585)][_0x457cf6(0x3d3)]>_0x49aa54){const _0x4ed56f=this['_equips'][this[_0x457cf6(0x585)][_0x457cf6(0x3d3)]-0x1];if(_0x4ed56f&&_0x4ed56f[_0x457cf6(0x55f)]()){if(_0x457cf6(0x3bf)===_0x457cf6(0x3bf))$gameParty[_0x457cf6(0x168)](_0x4ed56f[_0x457cf6(0x55f)](),0x1);else{const _0x1aae5c='%1-%2'[_0x457cf6(0x410)](_0x1199c4,_0x37f19e);_0xebd815[_0x457cf6(0x2c2)][_0x457cf6(0x615)][_0x1aae5c]=new _0x3984b9(_0x457cf6(0x343),'paramId',_0x3746d8);}}this['_equips'][_0x457cf6(0x3b6)]();}while(_0x49aa54>this['_equips'][_0x457cf6(0x3d3)]){if(_0x457cf6(0x672)!=='Qjjwm')this[_0x457cf6(0x585)]['push'](new Game_Item());else return _0x1a9329[_0x457cf6(0x539)](0x1,_0x34044a[_0x457cf6(0x69e)]()-0x4);}},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x598)]=function(){const _0x5baad1=_0x2e9347,_0x465aae=this[_0x5baad1(0x3b3)]();for(let _0x5d5391=0x0;_0x5d5391<_0x465aae[_0x5baad1(0x3d3)];_0x5d5391++){if(_0x5baad1(0x265)===_0x5baad1(0x265)){if(!this['_equips'][_0x5d5391])this[_0x5baad1(0x585)][_0x5d5391]=new Game_Item();}else return _0x5cc1bf[_0x5baad1(0x2c2)][_0x5baad1(0x1ae)][_0x5baad1(0x51f)](this);}this[_0x5baad1(0x5a4)](![]),this[_0x5baad1(0x474)]();},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x534)]=Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x2cc)],Game_Actor[_0x2e9347(0x655)]['changeEquip']=function(_0x4e9576,_0x3a98b6){const _0x2cb6f3=_0x2e9347;if(!this[_0x2cb6f3(0x5bc)]){if(_0x2cb6f3(0x21f)!=='PfuXY'){const _0x5d0eee=JsonEx[_0x2cb6f3(0x68b)](this);_0x5d0eee['_tempActor']=!![],this[_0x2cb6f3(0x1ed)](_0x4e9576,_0x3a98b6),this[_0x2cb6f3(0x656)](_0x5d0eee);}else return _0x56f381['VisuMZ_0_CoreEngine']&&_0x2a720e[_0x2cb6f3(0x655)][_0x2cb6f3(0x424)][_0x2cb6f3(0x51f)](this);}else this['changeEquipBase'](_0x4e9576,_0x3a98b6);},Game_Actor[_0x2e9347(0x655)]['changeEquipBase']=function(_0x398609,_0x16a68e){const _0x3fd419=_0x2e9347;if(!this[_0x3fd419(0x1ab)](_0x16a68e,this['equips']()[_0x398609]))return;if(_0x16a68e){const _0x2a4f5f=DataManager[_0x3fd419(0x404)](_0x16a68e);if(!_0x2a4f5f[_0x3fd419(0x5e8)](this[_0x3fd419(0x3b3)]()[_0x398609]))return;}this[_0x3fd419(0x585)][_0x398609]['setObject'](_0x16a68e);if(Imported['VisuMZ_0_CoreEngine']&&$textPopup){const _0x3dfef0=VisuMZ[_0x3fd419(0x2c2)][_0x3fd419(0x20a)][_0x3fd419(0x575)][_0x3fd419(0x538)]||'',_0x2c27a0=this[_0x3fd419(0x5a8)](),_0x2f4249=_0x3fd419(0x184)['format'](_0x16a68e[_0x3fd419(0x1f2)]),_0x2bb112=_0x16a68e[_0x3fd419(0x5a8)]||'';let _0x407e28=_0x3dfef0['format'](_0x2c27a0,_0x2f4249,_0x2bb112);if(_0x407e28[_0x3fd419(0x3d3)]>0x0)$textPopup(_0x407e28);}this[_0x3fd419(0x474)]();},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x2d1)]=Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x4e3)],Game_Actor[_0x2e9347(0x655)]['forceChangeEquip']=function(_0x4d388a,_0x1f8827){const _0xc6f628=_0x2e9347;if(!this[_0xc6f628(0x5bc)]){const _0x45350b=JsonEx['makeDeepCopy'](this);_0x45350b[_0xc6f628(0x5bc)]=!![],VisuMZ[_0xc6f628(0x2c2)]['Game_Actor_forceChangeEquip'][_0xc6f628(0x51f)](this,_0x4d388a,_0x1f8827),this['equipAdjustHpMp'](_0x45350b);}else'nUtZq'!==_0xc6f628(0x278)?_0x5a9253=_0x3c83f5[_0xc6f628(0x48d)]((this['innerHeight']-_0x4f2431)/0x2):VisuMZ[_0xc6f628(0x2c2)][_0xc6f628(0x2d1)]['call'](this,_0x4d388a,_0x1f8827);},VisuMZ[_0x2e9347(0x2c2)]['Game_Actor_discardEquip']=Game_Actor[_0x2e9347(0x655)]['discardEquip'],Game_Actor['prototype'][_0x2e9347(0x4ca)]=function(_0x258de9){const _0x5f5362=_0x2e9347;if(!this[_0x5f5362(0x5bc)]){const _0x581934=JsonEx['makeDeepCopy'](this);_0x581934[_0x5f5362(0x5bc)]=!![],VisuMZ[_0x5f5362(0x2c2)][_0x5f5362(0x305)][_0x5f5362(0x51f)](this,_0x258de9),this[_0x5f5362(0x656)](_0x581934);}else VisuMZ['ItemsEquipsCore'][_0x5f5362(0x305)][_0x5f5362(0x51f)](this,_0x258de9);},Game_Actor['prototype']['releaseUnequippableItems']=function(_0x3c72d9){const _0x2165b5=_0x2e9347;if(this[_0x2165b5(0x2e7)])return;let _0xa58f71=0x0;for(;;){_0xa58f71++;if(_0xa58f71>0x3)break;const _0x4ca335=this[_0x2165b5(0x3b3)](),_0x2ad8e4=this[_0x2165b5(0x293)](),_0xf4531f=_0x2ad8e4['length'];let _0x220ad3=![];for(let _0x47acfd=0x0;_0x47acfd<_0xf4531f;_0x47acfd++){const _0x169345=_0x2ad8e4[_0x47acfd];if(!_0x169345)continue;const _0x372182=DataManager[_0x2165b5(0x404)](_0x169345);if(!this[_0x2165b5(0x4bb)](_0x169345)||!_0x372182[_0x2165b5(0x5e8)](_0x4ca335[_0x47acfd])){if(_0x2165b5(0x1a2)!==_0x2165b5(0x1a2)){const _0x275abf=_0x2d97d8['x']+_0x76e47[_0x2165b5(0x1fc)]((_0x3d9af9['width']-_0xfd68d6)/0x2);this[_0x2165b5(0x53b)](_0x232aa2,_0x275abf,_0x31d2c7['y'],_0x240e2f);}else{if(!_0x3c72d9){if('ULkEO'===_0x2165b5(0x25f))this[_0x2165b5(0x1ab)](null,_0x169345);else{if(!this[_0x2165b5(0x4ac)]())return;const _0x1a8279=this[_0x2165b5(0x2ff)](),_0x2ad916=_0x9091d3[_0x2165b5(0x2c2)][_0x2165b5(0x20a)]['EquipScene'][_0x2165b5(0x2f9)],_0x4bd4bd=_0x1a8279===_0x2165b5(0x1f4)?_0x3997fe[_0x2165b5(0x456)]:_0x2165b5(0x5e9)[_0x2165b5(0x410)](_0x2ad916,_0x3726e4[_0x2165b5(0x456)]),_0x2e9f83=this[_0x2165b5(0x41e)]();this[_0x2165b5(0x234)](_0x4bd4bd,'equip',_0x2e9f83);}}if(!this[_0x2165b5(0x5bc)]){const _0x498190=JsonEx[_0x2165b5(0x68b)](this);_0x498190['_tempActor']=!![],this['_equips'][_0x47acfd]['setObject'](null),this[_0x2165b5(0x2e7)]=!![],this[_0x2165b5(0x656)](_0x498190),this[_0x2165b5(0x2e7)]=undefined;}else{if(this['_equips'][_0x47acfd])this[_0x2165b5(0x585)][_0x47acfd][_0x2165b5(0x4c4)](null);else{console[_0x2165b5(0x4ad)](_0x2165b5(0x4c0));continue;}}_0x220ad3=!![];}}}if(!_0x220ad3){if('TxkbJ'===_0x2165b5(0x172))break;else _0x499490[_0x2165b5(0x2c2)][_0x2165b5(0x5aa)][_0x2165b5(0x51f)](this,_0x12a647),_0x246586[_0x2165b5(0x2c2)][_0x2165b5(0x2e8)](_0x1e449e,_0x40e499);}}},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x656)]=function(_0x2ded49){const _0x1d81ec=_0x2e9347;if(this[_0x1d81ec(0x5bc)])return;if(!VisuMZ['ItemsEquipsCore']['Settings'][_0x1d81ec(0x575)][_0x1d81ec(0x1ba)])return;const _0x2add38=Math[_0x1d81ec(0x48d)](_0x2ded49[_0x1d81ec(0x2e4)]()*this[_0x1d81ec(0x669)]),_0x2c8d2f=Math[_0x1d81ec(0x48d)](_0x2ded49['mpRate']()*this['mmp']);if(this['hp']>0x0)this[_0x1d81ec(0x625)](_0x2add38);if(this['mp']>0x0)this[_0x1d81ec(0x3d2)](_0x2c8d2f);},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x65f)]=function(){const _0x4f675c=_0x2e9347,_0x2f6a5b=this[_0x4f675c(0x3b3)]()['length'];for(let _0xa093eb=0x0;_0xa093eb<_0x2f6a5b;_0xa093eb++){if(_0x4f675c(0x2ee)!=='kuMzw'){if(this[_0x4f675c(0x4dd)](_0xa093eb))this[_0x4f675c(0x2cc)](_0xa093eb,null);}else return _0x3ae3f4[_0x4f675c(0x2c2)]['Settings']['EquipScene'][_0x4f675c(0x2be)];}},Game_Actor[_0x2e9347(0x655)]['isClearEquipOk']=function(_0x1c8481){const _0x497e73=_0x2e9347;if(this['nonRemovableEtypes']()[_0x497e73(0x5e8)](this['equipSlots']()[_0x1c8481])){if(_0x497e73(0x4e6)!=='jjzys')this[_0x497e73(0x53b)](_0x3efe26,_0x580d89['x']+_0x3b7663[_0x497e73(0x21b)]-_0x470685,_0x47eb3f['y'],_0x5856a3);else return![];}else return this[_0x497e73(0x4cd)](_0x1c8481);},Game_Actor[_0x2e9347(0x655)]['nonRemovableEtypes']=function(){const _0x4f4e79=_0x2e9347;return VisuMZ[_0x4f4e79(0x2c2)][_0x4f4e79(0x20a)][_0x4f4e79(0x575)][_0x4f4e79(0x3f7)];},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x59c)]=function(){const _0x413853=_0x2e9347,_0x41af29=this[_0x413853(0x3b3)]()[_0x413853(0x3d3)];for(let _0x4ed2c6=0x0;_0x4ed2c6<_0x41af29;_0x4ed2c6++){if(_0x413853(0x50e)===_0x413853(0x50e)){if(this[_0x413853(0x1df)](_0x4ed2c6))this[_0x413853(0x2cc)](_0x4ed2c6,null);}else _0x21e4d2=_0x596293[_0x413853(0x533)](_0x689895),_0x164482['isWeapon'](_0x46bd49)||_0x54df60['isArmor'](_0x5766e4)?this[_0x413853(0x505)](_0x528f8e):_0x198f17[_0x413853(0x2c2)][_0x413853(0x68a)][_0x413853(0x51f)](this,_0x443d9e);}for(let _0x46b9d6=0x0;_0x46b9d6<_0x41af29;_0x46b9d6++){if(this[_0x413853(0x1df)](_0x46b9d6))this[_0x413853(0x2cc)](_0x46b9d6,this[_0x413853(0x2a4)](_0x46b9d6));}},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x2a4)]=function(_0x62f1b4){const _0x4fd8e4=_0x2e9347,_0x3bf387=this['equipSlots']()[_0x62f1b4],_0xd0641e=$gameParty[_0x4fd8e4(0x4a6)]()[_0x4fd8e4(0x4aa)](_0x27ac88=>DataManager[_0x4fd8e4(0x404)](_0x27ac88)[_0x4fd8e4(0x5e8)](_0x3bf387)&&this[_0x4fd8e4(0x4bb)](_0x27ac88)&&!DataManager[_0x4fd8e4(0x2fe)](_0x27ac88));let _0x44d995=null,_0x367809=-0x3e8;for(let _0x444e9b=0x0;_0x444e9b<_0xd0641e['length'];_0x444e9b++){if(_0x4fd8e4(0x2b3)!==_0x4fd8e4(0x2b3))return;else{const _0x43b0ef=this[_0x4fd8e4(0x528)](_0xd0641e[_0x444e9b]);_0x43b0ef>_0x367809&&(_0x367809=_0x43b0ef,_0x44d995=_0xd0641e[_0x444e9b]);}}return _0x44d995;},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x1df)]=function(_0x1397da){const _0x55cede=_0x2e9347;if(this[_0x55cede(0x1d8)]()[_0x55cede(0x5e8)](this['equipSlots']()[_0x1397da])){if('uuKLx'!==_0x55cede(0x62d))return![];else{const _0x336109=_0x370b1d(_0x3ab959['$1'])[_0x55cede(0x47f)](',')[_0x55cede(0x6a3)](_0x441a8a=>_0x376c43(_0x441a8a));for(const _0x5bd752 of _0x336109){_0x114c6d['setValue'](_0x5bd752,!![]);}}}else{if(_0x55cede(0x3fc)!=='yZSTB')return this[_0x55cede(0x4cd)](_0x1397da);else{_0x4dd5db[_0x55cede(0x1e4)]=!![];let _0x15668b=_0x5c0b0e[_0x55cede(0x2c2)][_0x55cede(0x186)][_0x55cede(0x51f)](this,_0x20fdcd);if(!_0x15668b&&_0x41981d&&_0x50458f[_0x55cede(0x392)](_0x4f9827)){const _0xeb7fe9=_0x4f060d[_0x55cede(0x3e7)]||0x0;if(this[_0x55cede(0x23c)]&&this[_0x55cede(0x23c)][_0x55cede(0x164)](_0xeb7fe9)){const _0x101fbd=_0x4e1edd[_0x55cede(0x404)](_0x2c0dfe);_0x101fbd['includes'](this[_0x55cede(0x15c)]())&&(_0x15668b=!![]);}}return _0x4af54e[_0x55cede(0x1e4)]=_0xb80f4,_0x15668b;}}},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x576)]=Game_Actor['prototype']['isEquipChangeOk'],Game_Actor[_0x2e9347(0x655)]['isEquipChangeOk']=function(_0x848cbd){const _0x3e0229=_0x2e9347,_0x126ee4=this[_0x3e0229(0x585)][_0x848cbd];if(_0x126ee4){const _0xfdaf4a=_0x126ee4[_0x3e0229(0x55f)]();if(DataManager[_0x3e0229(0x2fe)](_0xfdaf4a))return![];}return VisuMZ[_0x3e0229(0x2c2)][_0x3e0229(0x576)][_0x3e0229(0x51f)](this,_0x848cbd);},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x1d8)]=function(){const _0x34f5ce=_0x2e9347;return VisuMZ['ItemsEquipsCore'][_0x34f5ce(0x20a)][_0x34f5ce(0x575)][_0x34f5ce(0x340)];},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x520)]=Game_Actor['prototype'][_0x2e9347(0x1ab)],Game_Actor['prototype'][_0x2e9347(0x1ab)]=function(_0x489ba0,_0x2b4074){const _0x2ffdb5=_0x2e9347;if(this[_0x2ffdb5(0x5bc)])return![];$gameTemp['_bypassNewLabel']=!![];const _0x381903=VisuMZ[_0x2ffdb5(0x2c2)]['Game_Actor_tradeItemWithParty'][_0x2ffdb5(0x51f)](this,_0x489ba0,_0x2b4074);return $gameTemp[_0x2ffdb5(0x41d)]=![],_0x381903;},Game_Actor['prototype'][_0x2e9347(0x272)]=function(_0x27b197,_0x46a254){const _0x551f82=_0x2e9347,_0x5f575b=this['getNextAvailableEtypeId'](_0x27b197);if(_0x5f575b<0x0)return;const _0x425e73=_0x27b197===0x1?$dataWeapons[_0x46a254]:$dataArmors[_0x46a254];this[_0x551f82(0x2cc)](_0x5f575b,_0x425e73);},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x501)]=function(_0x3a70ab){const _0x23e0cf=_0x2e9347;let _0x55140b=0x0;const _0x1df6cc=this[_0x23e0cf(0x3b3)](),_0x3adc73=this[_0x23e0cf(0x293)]();for(let _0x3510ce=0x0;_0x3510ce<_0x1df6cc[_0x23e0cf(0x3d3)];_0x3510ce++){if(_0x1df6cc[_0x3510ce]===_0x3a70ab){_0x55140b=_0x3510ce;if(!_0x3adc73[_0x3510ce])return _0x55140b;}}return _0x55140b;},VisuMZ[_0x2e9347(0x2c2)]['Game_Actor_paramPlus']=Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x6a1)],Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x6a1)]=function(_0x278d76){const _0x3d801f=_0x2e9347;let _0x129ecf=VisuMZ[_0x3d801f(0x2c2)]['Game_Actor_paramPlus'][_0x3d801f(0x51f)](this,_0x278d76);for(const _0x363906 of this['equips']()){if('AcMFO'!==_0x3d801f(0x2b8))this[_0x3d801f(0x194)]['remove'](_0x30f183);else{if(_0x363906)_0x129ecf+=this[_0x3d801f(0x325)](_0x363906,_0x278d76);}}return _0x129ecf;},Game_Actor['prototype']['paramPlusItemsEquipsCoreCustomJS']=function(_0x8858a6,_0x243935){const _0x56ca96=_0x2e9347;if(this['_calculatingJSParameters'])return 0x0;const _0x42eaf8=(DataManager[_0x56ca96(0x514)](_0x8858a6)?'W%1':_0x56ca96(0x3b9))[_0x56ca96(0x410)](_0x8858a6['id']),_0x48b570=_0x56ca96(0x32f)[_0x56ca96(0x410)](_0x42eaf8,_0x243935);if(VisuMZ[_0x56ca96(0x2c2)][_0x56ca96(0x615)][_0x48b570]){this[_0x56ca96(0x237)]=!![];const _0x515f2c=VisuMZ[_0x56ca96(0x2c2)][_0x56ca96(0x615)][_0x48b570]['call'](this,_0x8858a6,_0x243935);return this[_0x56ca96(0x237)]=![],_0x515f2c;}else return 0x0;},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x2d0)]=function(_0x419273){const _0x120295=_0x2e9347;this[_0x120295(0x204)]=!![],this['_shopStatusMenuAlly']=_0x419273;},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x519)]=Game_Party[_0x2e9347(0x655)][_0x2e9347(0x1b1)],Game_Party[_0x2e9347(0x655)][_0x2e9347(0x1b1)]=function(){const _0x5b1306=_0x2e9347;VisuMZ[_0x5b1306(0x2c2)][_0x5b1306(0x519)]['call'](this),this[_0x5b1306(0x40e)](),this[_0x5b1306(0x3e5)]();},Game_Party['prototype'][_0x2e9347(0x40e)]=function(){const _0x3f04db=_0x2e9347;this[_0x3f04db(0x2bc)]=[];},Game_Party['prototype'][_0x2e9347(0x40b)]=function(_0x2dc6a6){const _0x5b8d13=_0x2e9347;if(!$gameTemp[_0x5b8d13(0x593)]())return![];if(this[_0x5b8d13(0x2bc)]===undefined)this[_0x5b8d13(0x40e)]();let _0x265fb6='';if(DataManager['isItem'](_0x2dc6a6)){if('rKKov'===_0x5b8d13(0x183))_0x265fb6=_0x5b8d13(0x5ac)[_0x5b8d13(0x410)](_0x2dc6a6['id']);else{const _0xaeb896=this[_0x5b8d13(0x2ff)](),_0x39667a=_0x253d97[_0x5b8d13(0x2c2)]['Settings'][_0x5b8d13(0x2a3)]['CmdIconBuy'],_0x506cca=_0xaeb896===_0x5b8d13(0x1f4)?_0x2c2aff[_0x5b8d13(0x288)]:_0x5b8d13(0x5e9)[_0x5b8d13(0x410)](_0x39667a,_0x312383[_0x5b8d13(0x288)]),_0x56165c=this['isBuyCommandEnabled']();if(this[_0x5b8d13(0x244)]()&&!_0x56165c)return;this[_0x5b8d13(0x234)](_0x506cca,_0x5b8d13(0x288),_0x56165c);}}else{if(DataManager[_0x5b8d13(0x514)](_0x2dc6a6))_0x265fb6=_0x5b8d13(0x33f)['format'](_0x2dc6a6['id']);else{if(DataManager[_0x5b8d13(0x392)](_0x2dc6a6))_0x265fb6=_0x5b8d13(0x368)[_0x5b8d13(0x410)](_0x2dc6a6['id']);else return;}}return this['_newItemsList']['includes'](_0x265fb6);},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x626)]=function(_0xa00c60){const _0x5e8012=_0x2e9347;if(!$gameTemp[_0x5e8012(0x593)]())return;if(this[_0x5e8012(0x2bc)]===undefined)this[_0x5e8012(0x40e)]();let _0x57cb94='';if(DataManager['isItem'](_0xa00c60))_0x57cb94=_0x5e8012(0x5ac)['format'](_0xa00c60['id']);else{if(DataManager[_0x5e8012(0x514)](_0xa00c60))_0x57cb94=_0x5e8012(0x33f)[_0x5e8012(0x410)](_0xa00c60['id']);else{if(DataManager[_0x5e8012(0x392)](_0xa00c60))_0x5e8012(0x63e)===_0x5e8012(0x611)?this[_0x5e8012(0x60e)]():_0x57cb94='armor-%1'[_0x5e8012(0x410)](_0xa00c60['id']);else return;}}if(!this[_0x5e8012(0x2bc)]['includes'](_0x57cb94))this[_0x5e8012(0x2bc)]['push'](_0x57cb94);},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x17a)]=function(_0x162c6a){const _0x391f81=_0x2e9347;if(!$gameTemp['newLabelEnabled']())return;if(this[_0x391f81(0x2bc)]===undefined)this[_0x391f81(0x40e)]();let _0x1410cf='';if(DataManager[_0x391f81(0x207)](_0x162c6a)){if(_0x391f81(0x616)!==_0x391f81(0x552))_0x1410cf='item-%1'[_0x391f81(0x410)](_0x162c6a['id']);else{const _0x1e9d65=_0x50ca27[_0x391f81(0x2c2)][_0x391f81(0x20a)]['StatusWindow'][_0x391f81(0x59b)];return _0x1e9d65[_0x391f81(0x410)](_0x21006f['tp']);}}else{if(DataManager[_0x391f81(0x514)](_0x162c6a))_0x1410cf=_0x391f81(0x33f)[_0x391f81(0x410)](_0x162c6a['id']);else{if(DataManager[_0x391f81(0x392)](_0x162c6a)){if(_0x391f81(0x3a7)===_0x391f81(0x52a))return _0x13f11c[_0x391f81(0x2c2)][_0x391f81(0x20a)]['StatusWindow'][_0x391f81(0x32a)];else _0x1410cf='armor-%1'[_0x391f81(0x410)](_0x162c6a['id']);}else return;}}this[_0x391f81(0x2bc)][_0x391f81(0x5e8)](_0x1410cf)&&this[_0x391f81(0x2bc)][_0x391f81(0x32c)](this[_0x391f81(0x2bc)][_0x391f81(0x22f)](_0x1410cf),0x1);},VisuMZ[_0x2e9347(0x2c2)]['Game_Party_numItems']=Game_Party['prototype']['numItems'],Game_Party[_0x2e9347(0x655)][_0x2e9347(0x187)]=function(_0x502151){const _0xca1383=_0x2e9347;if(DataManager['isProxyItem'](_0x502151))_0x502151=DataManager[_0xca1383(0x533)](_0x502151);return VisuMZ[_0xca1383(0x2c2)]['Game_Party_numItems'][_0xca1383(0x51f)](this,_0x502151);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x60a)]=Game_Party['prototype'][_0x2e9347(0x168)],Game_Party['prototype'][_0x2e9347(0x168)]=function(_0x2b5107,_0x36c3d7,_0x4c2348){const _0x4e4cf0=_0x2e9347;if(DataManager[_0x4e4cf0(0x489)](_0x2b5107))_0x2b5107=null;const _0x41f304=this['numItems'](_0x2b5107);VisuMZ[_0x4e4cf0(0x2c2)]['Game_Party_gainItem'][_0x4e4cf0(0x51f)](this,_0x2b5107,_0x36c3d7,_0x4c2348);if(this[_0x4e4cf0(0x187)](_0x2b5107)>_0x41f304)this['setNewItem'](_0x2b5107);},Game_Party[_0x2e9347(0x655)]['maxItems']=function(_0x411645){const _0x2819be=_0x2e9347;if(DataManager['isProxyItem'](_0x411645))_0x411645=DataManager[_0x2819be(0x533)](_0x411645);return DataManager['maxItemAmount'](_0x411645);},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x5d1)]=Game_Party[_0x2e9347(0x655)]['consumeItem'],Game_Party[_0x2e9347(0x655)][_0x2e9347(0x542)]=function(_0x5aa9b3){const _0x21654b=_0x2e9347;if(_0x5aa9b3){if(_0x21654b(0x3cb)==='wnslS'){const _0x4549ce=_0x5aa9b3['note']||'';if(_0x4549ce[_0x21654b(0x1f9)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x5e5b0f=Number(RegExp['$1'])*0.01;if(Math[_0x21654b(0x27e)]()<_0x5e5b0f)return;}}else this['isUseModernControls']()?this[_0x21654b(0x469)](!![]):_0x2f4b8f['prototype'][_0x21654b(0x381)][_0x21654b(0x51f)](this,_0xf23234);}VisuMZ[_0x21654b(0x2c2)][_0x21654b(0x5d1)][_0x21654b(0x51f)](this,_0x5aa9b3);},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x3e5)]=function(){const _0x2538e1=_0x2e9347;this[_0x2538e1(0x20f)]={'buy':{'gold':0x0,'items':{}},'sell':{'gold':0x0,'items':{}}};},Game_Party['prototype']['getShopTrackingData']=function(){const _0x7aa3bc=_0x2e9347;return this['_shopTrackingData']===undefined&&this[_0x7aa3bc(0x3e5)](),this[_0x7aa3bc(0x20f)];},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x39f)]=function(_0x6917ad,_0x3a6676){const _0x2ad3aa=_0x2e9347;if(!_0x3a6676)return 0x0;if(this['_shopTrackingData']===undefined){if('bQXTw'!==_0x2ad3aa(0x688)){if(!_0x40e7f0)return 0x63;else return _0x103235[_0x2ad3aa(0x2c0)][_0x2ad3aa(0x1f9)](/<MAX:[ ](\d+)>/i)?_0x485fee(_0x2b2e92['$1']):this[_0x2ad3aa(0x606)](_0x2705ae);}else this[_0x2ad3aa(0x3e5)]();}const _0x55b7a3=this[_0x2ad3aa(0x365)]();if(!_0x55b7a3[_0x6917ad])return 0x0;if(_0x3a6676===_0x2ad3aa(0x3f3)){if(_0x2ad3aa(0x1dc)!==_0x2ad3aa(0x2e0))return _0x55b7a3[_0x6917ad][_0x2ad3aa(0x3f3)]=_0x55b7a3[_0x6917ad][_0x2ad3aa(0x3f3)]||0x0,_0x55b7a3[_0x6917ad][_0x2ad3aa(0x3f3)];else for(const _0x48b480 of _0x40b074['troopArtifacts']()){if(_0x48b480)_0x536168+=_0x48b480[_0x2ad3aa(0x363)][_0x285c23];}}else{if(DataManager[_0x2ad3aa(0x207)](_0x3a6676))key=_0x2ad3aa(0x5ac)[_0x2ad3aa(0x410)](_0x3a6676['id']);else{if(DataManager['isWeapon'](_0x3a6676)){if(_0x2ad3aa(0x1e5)!==_0x2ad3aa(0x201))key=_0x2ad3aa(0x33f)[_0x2ad3aa(0x410)](_0x3a6676['id']);else{const _0x4b9cac=_0x2ad3aa(0x1f8);if(this[_0x2ad3aa(0x4ee)][_0x4b9cac])return this[_0x2ad3aa(0x4ee)][_0x4b9cac];let _0x119506='';return _0x119506+=_0x2ad3aa(0x43a)[_0x2ad3aa(0x410)](this[_0x2ad3aa(0x4da)][_0x2ad3aa(0x29b)]),_0x119506;}}else{if(DataManager['isArmor'](_0x3a6676))key=_0x2ad3aa(0x368)[_0x2ad3aa(0x410)](_0x3a6676['id']);else return 0x0;}}}return _0x55b7a3[_0x6917ad][_0x2ad3aa(0x48b)][key]=_0x55b7a3[_0x6917ad][_0x2ad3aa(0x48b)][key]||0x0,_0x55b7a3[_0x6917ad][_0x2ad3aa(0x48b)][key];},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x1e8)]=function(_0xb42c4a){const _0x54a8aa=_0x2e9347;return this[_0x54a8aa(0x39f)](_0x54a8aa(0x288),_0xb42c4a);},Game_Party['prototype']['getShopTrackingItemSell']=function(_0x5898e3){const _0x2d2b5d=_0x2e9347;return this[_0x2d2b5d(0x39f)](_0x2d2b5d(0x3c6),_0x5898e3);},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x689)]=function(){const _0x812132=_0x2e9347;return this[_0x812132(0x39f)]('buy',_0x812132(0x3f3));},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x5c0)]=function(){const _0x4a58d1=_0x2e9347;return this[_0x4a58d1(0x39f)](_0x4a58d1(0x3c6),_0x4a58d1(0x3f3));},Game_Party['prototype'][_0x2e9347(0x33a)]=function(_0x378514,_0x14053f,_0x15a260){const _0x256f02=_0x2e9347;if(!_0x14053f)return;if(_0x15a260<=0x0)return;this[_0x256f02(0x20f)]===undefined&&(_0x256f02(0x5ff)!=='qgOYu'?this['postCreateCategoryWindowItemsEquipsCore']():this[_0x256f02(0x3e5)]());const _0x186cbe=this[_0x256f02(0x365)]();if(!_0x186cbe[_0x378514])return;if(_0x14053f===_0x256f02(0x3f3)){_0x186cbe[_0x378514]['gold']=_0x186cbe[_0x378514][_0x256f02(0x3f3)]||0x0,_0x186cbe[_0x378514][_0x256f02(0x3f3)]+=_0x15a260;return;}else{if(DataManager[_0x256f02(0x207)](_0x14053f))_0x256f02(0x4d9)===_0x256f02(0x4d9)?key=_0x256f02(0x5ac)[_0x256f02(0x410)](_0x14053f['id']):_0x3d9e8a[_0x256f02(0x2c2)]['Game_Actor_forceChangeEquip'][_0x256f02(0x51f)](this,_0x4c0791,_0x124257);else{if(DataManager[_0x256f02(0x514)](_0x14053f))key=_0x256f02(0x33f)['format'](_0x14053f['id']);else{if(DataManager[_0x256f02(0x392)](_0x14053f))key=_0x256f02(0x368)[_0x256f02(0x410)](_0x14053f['id']);else return;}}}_0x186cbe[_0x378514]['items'][key]=_0x186cbe[_0x378514][_0x256f02(0x48b)][key]||0x0,_0x186cbe[_0x378514][_0x256f02(0x48b)][key]+=_0x15a260;},Game_Party['prototype'][_0x2e9347(0x2d2)]=function(_0x4caac4,_0x1598dc){const _0x9dc4b=_0x2e9347;this['addShopTrackingItem'](_0x9dc4b(0x288),_0x4caac4,_0x1598dc);},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x39c)]=function(_0x2fedba,_0x4a61f1){const _0x3a594c=_0x2e9347;this[_0x3a594c(0x33a)](_0x3a594c(0x3c6),_0x2fedba,_0x4a61f1);},Game_Party[_0x2e9347(0x655)][_0x2e9347(0x2ba)]=function(_0x41e29d){const _0x240caf=_0x2e9347;this[_0x240caf(0x33a)](_0x240caf(0x288),_0x240caf(0x3f3),_0x41e29d);},Game_Party[_0x2e9347(0x655)]['addShopTrackingGoldSell']=function(_0x33114b){const _0x1e0334=_0x2e9347;this['addShopTrackingItem']('sell',_0x1e0334(0x3f3),_0x33114b);},VisuMZ['ItemsEquipsCore']['Scene_ItemBase_activateItemWindow']=Scene_ItemBase[_0x2e9347(0x655)][_0x2e9347(0x26a)],Scene_ItemBase[_0x2e9347(0x655)][_0x2e9347(0x26a)]=function(){const _0x2023ad=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0x2023ad(0x5e4)][_0x2023ad(0x51f)](this),this[_0x2023ad(0x1d1)]['callUpdateHelp']();},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x37d)]=function(){const _0x2a9af=_0x2e9347;if(ConfigManager[_0x2a9af(0x490)]&&ConfigManager[_0x2a9af(0x646)]!==undefined)return _0x2a9af(0x49c)!=='bwVWk'?_0x470292[_0x2a9af(0x2c2)][_0x2a9af(0x3c1)][_0x2a9af(0x51f)](this):ConfigManager[_0x2a9af(0x646)];else{if(this[_0x2a9af(0x43e)]())return this['updatedLayoutStyle']()[_0x2a9af(0x1f9)](/LOWER/i);else{if('wbcdu'!==_0x2a9af(0x62e)){if(this['index']()!==0x0)return![];const _0x54e0a3=_0xd59a41[_0x2a9af(0x2c2)][_0x2a9af(0x20a)][_0x2a9af(0x575)];if(!_0x54e0a3['CommandAddOptimize']&&!_0x54e0a3[_0x2a9af(0x1ad)])return![];return _0x46ff15[_0x2a9af(0x4c1)]('up');}else return Scene_ItemBase[_0x2a9af(0x655)]['isBottomHelpMode'][_0x2a9af(0x51f)](this);}}},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x290)]=function(){const _0x47a6fc=_0x2e9347;if(ConfigManager[_0x47a6fc(0x490)]&&ConfigManager[_0x47a6fc(0x416)]!==undefined)return ConfigManager[_0x47a6fc(0x416)];else return this[_0x47a6fc(0x43e)]()?this['updatedLayoutStyle']()[_0x47a6fc(0x1f9)](/RIGHT/i):Scene_ItemBase[_0x47a6fc(0x655)][_0x47a6fc(0x290)]['call'](this);},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x2cb)]=function(){const _0x4a8eb1=_0x2e9347;return VisuMZ[_0x4a8eb1(0x2c2)]['Settings'][_0x4a8eb1(0x66f)]['LayoutStyle'];},Scene_Item['prototype'][_0x2e9347(0x424)]=function(){const _0x1ab11d=_0x2e9347;return this[_0x1ab11d(0x4f6)]&&this[_0x1ab11d(0x4f6)][_0x1ab11d(0x424)]();},Scene_Item['prototype']['isUseItemsEquipsCoreUpdatedLayout']=function(){const _0x40a4dd=_0x2e9347;return VisuMZ[_0x40a4dd(0x2c2)][_0x40a4dd(0x20a)][_0x40a4dd(0x66f)][_0x40a4dd(0x48e)];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x623)]=Scene_Item[_0x2e9347(0x655)]['create'],Scene_Item[_0x2e9347(0x655)]['create']=function(){const _0x1838eb=_0x2e9347;VisuMZ[_0x1838eb(0x2c2)][_0x1838eb(0x623)][_0x1838eb(0x51f)](this),this[_0x1838eb(0x424)]()&&this[_0x1838eb(0x2fb)]();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x691)]=Scene_Item['prototype'][_0x2e9347(0x3c7)],Scene_Item[_0x2e9347(0x655)]['helpWindowRect']=function(){const _0x1c6766=_0x2e9347;if(this[_0x1c6766(0x43e)]()){if(_0x1c6766(0x697)==='gOsem')this[_0x1c6766(0x1d1)][_0x1c6766(0x622)]=0x1,this[_0x1c6766(0x1d1)][_0x1c6766(0x439)]();else return this[_0x1c6766(0x69c)]();}else return VisuMZ[_0x1c6766(0x2c2)][_0x1c6766(0x691)]['call'](this);},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x69c)]=function(){const _0x990eac=_0x2e9347,_0x323bb6=0x0,_0x11ce81=this['helpAreaTop'](),_0x13b859=Graphics['boxWidth'],_0x5d8644=this[_0x990eac(0x322)]();return new Rectangle(_0x323bb6,_0x11ce81,_0x13b859,_0x5d8644);},VisuMZ['ItemsEquipsCore']['Scene_Item_createCategoryWindow']=Scene_Item['prototype']['createCategoryWindow'],Scene_Item['prototype'][_0x2e9347(0x4ab)]=function(){const _0x4122b3=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0x4122b3(0x5b1)]['call'](this),this[_0x4122b3(0x424)]()&&this[_0x4122b3(0x42b)]();},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x42b)]=function(){const _0x28b061=_0x2e9347;delete this[_0x28b061(0x4f6)][_0x28b061(0x14e)]['ok'],delete this[_0x28b061(0x4f6)][_0x28b061(0x14e)][_0x28b061(0x44d)];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x54c)]=Scene_Item['prototype'][_0x2e9347(0x21a)],Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x21a)]=function(){const _0x3adfb9=_0x2e9347;return this[_0x3adfb9(0x43e)]()?this[_0x3adfb9(0x1c0)]():VisuMZ[_0x3adfb9(0x2c2)][_0x3adfb9(0x54c)][_0x3adfb9(0x51f)](this);},Scene_Item[_0x2e9347(0x655)]['categoryWindowRectItemsEquipsCore']=function(){const _0x1adf4b=_0x2e9347,_0x4f330b=0x0,_0x4409f1=this['mainAreaTop'](),_0x543269=Graphics[_0x1adf4b(0x257)],_0x4d4a5f=this[_0x1adf4b(0x266)](0x1,!![]);return new Rectangle(_0x4f330b,_0x4409f1,_0x543269,_0x4d4a5f);},VisuMZ[_0x2e9347(0x2c2)]['Scene_Item_createItemWindow']=Scene_Item['prototype'][_0x2e9347(0x64a)],Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x64a)]=function(){const _0x337bc6=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0x337bc6(0x444)]['call'](this),this['isUseModernControls']()&&this[_0x337bc6(0x364)](),this[_0x337bc6(0x355)]()&&this[_0x337bc6(0x1eb)]();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x4d5)]=Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x31f)],Scene_Item['prototype']['itemWindowRect']=function(){const _0xd76ff4=_0x2e9347;if(this[_0xd76ff4(0x43e)]())return this['itemWindowRectItemsEquipsCore']();else{const _0x16a550=VisuMZ['ItemsEquipsCore']['Scene_Item_itemWindowRect'][_0xd76ff4(0x51f)](this);return this[_0xd76ff4(0x355)]()&&this[_0xd76ff4(0x276)]()&&(_0xd76ff4(0x677)===_0xd76ff4(0x596)?(_0x45c76f['ItemsEquipsCore'][_0xd76ff4(0x461)][_0xd76ff4(0x51f)](this),this[_0xd76ff4(0x424)]()&&this[_0xd76ff4(0x254)]()):_0x16a550[_0xd76ff4(0x21b)]-=this[_0xd76ff4(0x660)]()),_0x16a550;}},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x61b)]=function(){const _0x4718f7=_0x2e9347,_0x97bf4d=this[_0x4718f7(0x290)]()?this[_0x4718f7(0x660)]():0x0,_0x36b957=this[_0x4718f7(0x4f6)]['y']+this[_0x4718f7(0x4f6)][_0x4718f7(0x23d)],_0x3f4daf=Graphics['boxWidth']-this[_0x4718f7(0x660)](),_0x5866df=this[_0x4718f7(0x256)]()-_0x36b957;return new Rectangle(_0x97bf4d,_0x36b957,_0x3f4daf,_0x5866df);},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x364)]=function(){const _0x1d6435=_0x2e9347;this['_itemWindow'][_0x1d6435(0x499)]('cancel',this[_0x1d6435(0x229)][_0x1d6435(0x245)](this));},Scene_Item[_0x2e9347(0x655)]['allowCreateStatusWindow']=function(){const _0x3d97f7=_0x2e9347;return this[_0x3d97f7(0x43e)]()?!![]:VisuMZ[_0x3d97f7(0x2c2)][_0x3d97f7(0x20a)][_0x3d97f7(0x66f)][_0x3d97f7(0x18d)];},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x276)]=function(){const _0x14a831=_0x2e9347;return VisuMZ['ItemsEquipsCore'][_0x14a831(0x20a)][_0x14a831(0x66f)]['ItemSceneAdjustItemList'];},Scene_Item['prototype'][_0x2e9347(0x1eb)]=function(){const _0x4be7df=_0x2e9347,_0x51ac3e=this[_0x4be7df(0x4a7)]();this[_0x4be7df(0x315)]=new Window_ShopStatus(_0x51ac3e),this[_0x4be7df(0x202)](this['_statusWindow']),this['_itemWindow']['setStatusWindow'](this[_0x4be7df(0x315)]);const _0x27327c=VisuMZ[_0x4be7df(0x2c2)][_0x4be7df(0x20a)][_0x4be7df(0x66f)][_0x4be7df(0x213)];this[_0x4be7df(0x315)]['setBackgroundType'](_0x27327c||0x0);},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x4a7)]=function(){const _0x5c789c=_0x2e9347;if(this[_0x5c789c(0x43e)]())return this['statusWindowRectItemsEquipsCore']();else{if(_0x5c789c(0x508)===_0x5c789c(0x420))_0x577c90[_0x5c789c(0x684)](_0x4fc744[_0x5c789c(0x620)],![]);else return VisuMZ[_0x5c789c(0x2c2)][_0x5c789c(0x20a)]['ItemScene']['ItemMenuStatusRect'][_0x5c789c(0x51f)](this);}},Scene_Item['prototype'][_0x2e9347(0x214)]=function(){const _0x5f4a4d=_0x2e9347,_0x519ef6=this['statusWidth'](),_0x142f1f=this[_0x5f4a4d(0x1d1)][_0x5f4a4d(0x23d)],_0xe9df7f=this[_0x5f4a4d(0x290)]()?0x0:Graphics[_0x5f4a4d(0x257)]-this['statusWidth'](),_0x578cda=this[_0x5f4a4d(0x1d1)]['y'];return new Rectangle(_0xe9df7f,_0x578cda,_0x519ef6,_0x142f1f);},Scene_Item['prototype']['statusWidth']=function(){const _0x10bf7a=_0x2e9347;return Scene_Shop[_0x10bf7a(0x655)][_0x10bf7a(0x660)]();},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x5e6)]=function(){const _0xa93a0f=_0x2e9347;if(!this['updatedLayoutStyle']())return![];if(!this[_0xa93a0f(0x424)]())return![];if(!this[_0xa93a0f(0x1d1)])return![];if(!this[_0xa93a0f(0x1d1)][_0xa93a0f(0x250)])return![];return this[_0xa93a0f(0x2cb)]()&&this[_0xa93a0f(0x424)]();},Scene_Item['prototype'][_0x2e9347(0x3a5)]=function(){const _0x330f8a=_0x2e9347;if(this[_0x330f8a(0x5e6)]()){if(_0x330f8a(0x51c)!==_0x330f8a(0x51c))this[_0x330f8a(0x469)](!![]);else return this[_0x330f8a(0x1d1)][_0x330f8a(0x58d)]()===0x1?TextManager[_0x330f8a(0x580)]('left',_0x330f8a(0x5a1)):_0x330f8a(0x5ed)==='EyUgb'?_0x2a2546[_0x330f8a(0x378)]&&_0x587bf8[_0x330f8a(0x378)][_0x330f8a(0x20a)][_0x330f8a(0x4b1)][_0x330f8a(0x561)]&&_0x49452c['isKeyItem'](this[_0x330f8a(0x2f1)])?![]:this[_0x330f8a(0x2f1)]['consumable']:TextManager[_0x330f8a(0x580)](_0x330f8a(0x583),'pagedown');}return Scene_ItemBase[_0x330f8a(0x655)][_0x330f8a(0x3a5)][_0x330f8a(0x51f)](this);},Scene_Item[_0x2e9347(0x655)][_0x2e9347(0x667)]=function(){const _0x3dd333=_0x2e9347;if(this[_0x3dd333(0x5e6)]()){if('VpuaH'===_0x3dd333(0x640))return VisuMZ[_0x3dd333(0x2c2)][_0x3dd333(0x20a)]['ItemScene'][_0x3dd333(0x2d5)];else{const _0xb71f1c=_0x3e3925['x']+_0x4bed1d[_0x3dd333(0x1fc)]((_0x3b8a03[_0x3dd333(0x21b)]-_0x3801fc)/0x2);this[_0x3dd333(0x53b)](_0x5451cb,_0xb71f1c,_0x4afbfa['y'],_0x5b2251);}}return Scene_ItemBase[_0x3dd333(0x655)][_0x3dd333(0x667)][_0x3dd333(0x51f)](this);},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x547)]=function(){const _0x1a4764=_0x2e9347;Scene_ItemBase[_0x1a4764(0x655)][_0x1a4764(0x547)][_0x1a4764(0x51f)](this),this[_0x1a4764(0x63f)]();},Scene_Equip[_0x2e9347(0x655)]['isBottomHelpMode']=function(){const _0x39d836=_0x2e9347;if(ConfigManager['uiMenuStyle']&&ConfigManager['uiHelpPosition']!==undefined)return ConfigManager[_0x39d836(0x646)];else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x39d836(0x2cb)]()[_0x39d836(0x1f9)](/LOWER/i);else{if(_0x39d836(0x268)!==_0x39d836(0x268)){this[_0x39d836(0x4f8)](this[_0x39d836(0x503)](null));const _0x7e2598=_0x25eb16[_0x39d836(0x2c2)][_0x39d836(0x20a)][_0x39d836(0x575)],_0x5047c3=this[_0x39d836(0x67f)](_0x384dac),_0x44860b=_0x5047c3['y']+(this['lineHeight']()-_0x267dc1[_0x39d836(0x231)])/0x2,_0x3bf86b=_0x12d58b[_0x39d836(0x66a)]+0x4,_0x1cbcd3=_0x56fe20[_0x39d836(0x539)](0x0,_0x5047c3[_0x39d836(0x21b)]-_0x3bf86b);this[_0x39d836(0x6ba)](),this[_0x39d836(0x262)](_0x7e2598[_0x39d836(0x609)],_0x5047c3['x'],_0x44860b),this[_0x39d836(0x1a1)](_0x7e2598[_0x39d836(0x6a5)],_0x5047c3['x']+_0x3bf86b,_0x5047c3['y'],_0x1cbcd3),this[_0x39d836(0x4f8)](!![]);}else Scene_MenuBase[_0x39d836(0x655)][_0x39d836(0x290)]['call'](this);}}},Scene_Equip['prototype'][_0x2e9347(0x290)]=function(){const _0x10f8ad=_0x2e9347;if(ConfigManager[_0x10f8ad(0x490)]&&ConfigManager[_0x10f8ad(0x416)]!==undefined){if(_0x10f8ad(0x260)===_0x10f8ad(0x698))this[_0x10f8ad(0x5e3)][_0x10f8ad(0x29f)]['push'](_0x416bfa['id']);else return ConfigManager[_0x10f8ad(0x416)];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this['updatedLayoutStyle']()[_0x10f8ad(0x1f9)](/RIGHT/i);else'BnesI'===_0x10f8ad(0x47e)?Scene_MenuBase['prototype'][_0x10f8ad(0x290)][_0x10f8ad(0x51f)](this):_0xcbb5aa[_0x10f8ad(0x655)][_0x10f8ad(0x381)][_0x10f8ad(0x51f)](this,_0x4a0277);}},Scene_Equip[_0x2e9347(0x655)]['updatedLayoutStyle']=function(){const _0x3eff83=_0x2e9347;return VisuMZ[_0x3eff83(0x2c2)][_0x3eff83(0x20a)][_0x3eff83(0x575)]['LayoutStyle'];},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x424)]=function(){const _0x4fea91=_0x2e9347;return this[_0x4fea91(0x33d)]&&this[_0x4fea91(0x33d)][_0x4fea91(0x424)]();},Scene_Equip['prototype'][_0x2e9347(0x43e)]=function(){const _0x2a4623=_0x2e9347;return VisuMZ['ItemsEquipsCore'][_0x2a4623(0x20a)][_0x2a4623(0x575)][_0x2a4623(0x48e)];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x3f0)]=Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x509)],Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x509)]=function(){const _0x8154a8=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0x8154a8(0x3f0)][_0x8154a8(0x51f)](this),this[_0x8154a8(0x424)]()&&('idPQJ'===_0x8154a8(0x432)?this['commandEquip']():_0x9d68c7=_0x28ac53(_0x523be6['$1']));},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x64d)]=Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x3c7)],Scene_Equip['prototype'][_0x2e9347(0x3c7)]=function(){const _0x1658c7=_0x2e9347;return this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x1658c7(0x69c)]():VisuMZ[_0x1658c7(0x2c2)][_0x1658c7(0x64d)][_0x1658c7(0x51f)](this);},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x69c)]=function(){const _0x1606e9=_0x2e9347,_0x11c1ef=0x0,_0x38fb7d=this[_0x1606e9(0x3e1)](),_0x595914=Graphics[_0x1606e9(0x257)],_0x55a1c8=this['helpAreaHeight']();return new Rectangle(_0x11c1ef,_0x38fb7d,_0x595914,_0x55a1c8);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x663)]=Scene_Equip['prototype']['statusWindowRect'],Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x4a7)]=function(){const _0x440d35=_0x2e9347;return this[_0x440d35(0x43e)]()?this[_0x440d35(0x214)]():VisuMZ[_0x440d35(0x2c2)][_0x440d35(0x663)][_0x440d35(0x51f)](this);},Scene_Equip[_0x2e9347(0x655)]['statusWindowRectItemsEquipsCore']=function(){const _0x15665e=_0x2e9347,_0x387eca=this[_0x15665e(0x290)]()?0x0:Graphics['boxWidth']-this['statusWidth'](),_0x56e290=this['mainAreaTop'](),_0x1bdc76=this[_0x15665e(0x660)](),_0x507dd4=this['mainAreaHeight']();return new Rectangle(_0x387eca,_0x56e290,_0x1bdc76,_0x507dd4);},VisuMZ[_0x2e9347(0x2c2)]['Scene_Equip_createCommandWindow']=Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x24f)],Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x24f)]=function(){const _0x9caf28=_0x2e9347;VisuMZ[_0x9caf28(0x2c2)]['Scene_Equip_createCommandWindow']['call'](this);if(this['_helpWindow'])this['_commandWindow'][_0x9caf28(0x35a)](this[_0x9caf28(0x1d3)]);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x1b3)]=Scene_Equip['prototype'][_0x2e9347(0x3c4)],Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x3c4)]=function(){const _0x208878=_0x2e9347;if(this['isUseItemsEquipsCoreUpdatedLayout']()){if(_0x208878(0x466)==='cvNTz')_0x3927a5[_0x208878(0x655)]['updateHelp'][_0x208878(0x51f)](this),this[_0x208878(0x1d3)][_0x208878(0x4fe)](this[_0x208878(0x1e2)]());else return this[_0x208878(0x67e)]();}else return VisuMZ[_0x208878(0x2c2)][_0x208878(0x1b3)][_0x208878(0x51f)](this);},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x54f)]=function(){const _0x187f4a=_0x2e9347,_0x3bb1ce=VisuMZ['ItemsEquipsCore'][_0x187f4a(0x20a)]['EquipScene'];return _0x3bb1ce[_0x187f4a(0x5db)]||_0x3bb1ce[_0x187f4a(0x1ad)];},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x67e)]=function(){const _0x48c255=_0x2e9347,_0x55bec7=this[_0x48c255(0x54f)](),_0x2a772e=this[_0x48c255(0x290)]()?this['statusWidth']():0x0,_0x5d42f5=this[_0x48c255(0x259)](),_0x30be60=Graphics['boxWidth']-this[_0x48c255(0x660)](),_0x173c4f=_0x55bec7?this[_0x48c255(0x266)](0x1,!![]):0x0;return new Rectangle(_0x2a772e,_0x5d42f5,_0x30be60,_0x173c4f);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x461)]=Scene_Equip['prototype'][_0x2e9347(0x37c)],Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x37c)]=function(){const _0x12a655=_0x2e9347;VisuMZ[_0x12a655(0x2c2)][_0x12a655(0x461)][_0x12a655(0x51f)](this),this[_0x12a655(0x424)]()&&this[_0x12a655(0x254)]();},VisuMZ[_0x2e9347(0x2c2)]['Scene_Equip_slotWindowRect']=Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x486)],Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x486)]=function(){const _0x9a8f21=_0x2e9347;if(this[_0x9a8f21(0x43e)]()){if(_0x9a8f21(0x228)===_0x9a8f21(0x2b9)){const _0x30dedf=this[_0x9a8f21(0x470)](_0x35f2e6);this[_0x9a8f21(0x32d)](_0x30dedf,_0x9954ad[_0x9a8f21(0x2e3)],_0x5112f6['x'],_0x4ed2f8['y'],_0x48137d[_0x9a8f21(0x21b)]);}else return this[_0x9a8f21(0x1d4)]();}else return _0x9a8f21(0x69d)!==_0x9a8f21(0x69d)?this['_cache_etypeIDs'][_0x367ad9['id']]:VisuMZ[_0x9a8f21(0x2c2)][_0x9a8f21(0x203)]['call'](this);},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x1d4)]=function(){const _0x4effdf=_0x2e9347,_0x3e873=this[_0x4effdf(0x3c4)](),_0x5cf068=this['isRightInputMode']()?this[_0x4effdf(0x660)]():0x0,_0x423a97=_0x3e873['y']+_0x3e873['height'],_0x3bd7c8=Graphics[_0x4effdf(0x257)]-this[_0x4effdf(0x660)](),_0x46c270=this[_0x4effdf(0x4b7)]()-_0x3e873['height'];return new Rectangle(_0x5cf068,_0x423a97,_0x3bd7c8,_0x46c270);},VisuMZ[_0x2e9347(0x2c2)]['Scene_Equip_itemWindowRect']=Scene_Equip['prototype'][_0x2e9347(0x31f)],Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x31f)]=function(){const _0x4baf6b=_0x2e9347;if(this[_0x4baf6b(0x43e)]()){if(_0x4baf6b(0x418)===_0x4baf6b(0x418))return this[_0x4baf6b(0x486)]();else{const _0x2fcff7=this[_0x4baf6b(0x3a3)](_0x3c6c98);let _0x11cd91=0x0,_0x39e286=0x0,_0x14a7f4=0x0;_0x31847d['VisuMZ_0_CoreEngine']?(_0x11cd91=_0x2fcff7['paramValueByName'](_0x2f6daa),_0x39e286=_0x11cd91-_0x5eeec1[_0x4baf6b(0x212)](_0x1a1d3d),this[_0x4baf6b(0x6ac)](_0x2fcd98[_0x4baf6b(0x67b)](_0x39e286)),_0x14a7f4=(_0x39e286>=0x0?'+':'')+_0x8c1074[_0x4baf6b(0x1bd)](_0x39e286,0x0,_0x27d68c)):(_0x11cd91=_0x2fcff7[_0x4baf6b(0x4de)](_0x228e1f),_0x39e286=_0x11cd91-_0x2da0ce[_0x4baf6b(0x4de)](_0xee2ada),this[_0x4baf6b(0x6ac)](_0x484ff9[_0x4baf6b(0x67b)](_0x39e286)),_0x14a7f4=(_0x39e286>=0x0?'+':'')+_0x39e286),_0x14a7f4==='+0'&&(_0x14a7f4=_0x2db800[_0x4baf6b(0x627)]),this[_0x4baf6b(0x1a1)](_0x14a7f4,_0x4146e6,_0x3f6ef3,_0x1ff137,_0x4baf6b(0x5a6));}}else{if(_0x4baf6b(0x248)!==_0x4baf6b(0x236))return VisuMZ[_0x4baf6b(0x2c2)][_0x4baf6b(0x459)]['call'](this);else _0x1299e0[_0x4baf6b(0x2c2)][_0x4baf6b(0x68e)]['call'](this,_0x2f3b47),_0x5118a4[_0x4baf6b(0x2c2)][_0x4baf6b(0x2e8)](_0xb33459,_0x4997ca);}},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x660)]=function(){const _0x43bc5b=_0x2e9347;if(this[_0x43bc5b(0x43e)]())return this['geUpdatedLayoutStatusWidth']();else{if(_0x43bc5b(0x43b)!=='LBnCC')return VisuMZ['ItemsEquipsCore'][_0x43bc5b(0x20a)][_0x43bc5b(0x575)][_0x43bc5b(0x621)];else{const _0x2c7814='TP\x20DAMAGE';if(this['_itemData'][_0x43bc5b(0x29b)]>=0x0&&!this[_0x43bc5b(0x4ee)][_0x2c7814])return![];const _0x2d94ba=this[_0x43bc5b(0x219)]();this['drawItemKeyData'](_0x2d94ba,_0x3aad94,_0x284dcf,_0x1cb6c8,!![]);const _0x47d797=this[_0x43bc5b(0x543)]();return this[_0x43bc5b(0x6ac)](_0x45b721['powerDownColor']()),this['drawItemKeyData'](_0x47d797,_0x1f7ae6,_0x4be555,_0x183984,![],_0x43bc5b(0x5a1)),this[_0x43bc5b(0x5a5)](_0x1c733b,_0x4177cd,_0x522a1d),this[_0x43bc5b(0x3d6)](),!![];}}},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x2c7)]=function(){const _0x418335=_0x2e9347;return Math[_0x418335(0x1fc)](Graphics[_0x418335(0x257)]/0x2);},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x254)]=function(){const _0x17756d=_0x2e9347;this['_slotWindow'][_0x17756d(0x499)]('cancel',this[_0x17756d(0x229)][_0x17756d(0x245)](this)),this[_0x17756d(0x6bb)]['setHandler']('pagedown',this[_0x17756d(0x385)][_0x17756d(0x245)](this)),this[_0x17756d(0x6bb)]['setHandler']('pageup',this['previousActor'][_0x17756d(0x245)](this));},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x3d7)]=Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x44c)],Scene_Equip['prototype'][_0x2e9347(0x44c)]=function(){const _0x43795a=_0x2e9347;this[_0x43795a(0x424)]()&&(this[_0x43795a(0x33d)][_0x43795a(0x3c8)](),this[_0x43795a(0x33d)][_0x43795a(0x5bf)]()),VisuMZ[_0x43795a(0x2c2)]['Scene_Equip_commandEquip'][_0x43795a(0x51f)](this);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x4c2)]=Scene_Equip['prototype'][_0x2e9347(0x209)],Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x209)]=function(){const _0x49c422=_0x2e9347;if(this['_slotWindow'][_0x49c422(0x42f)]()>=0x0){if('hrEOa'!==_0x49c422(0x4e9))VisuMZ[_0x49c422(0x2c2)]['Scene_Equip_onSlotOk'][_0x49c422(0x51f)](this),this['onSlotOkAutoSelect']();else{const _0x202fcb=_0x57e446(_0x2ca402['$1'])[_0x49c422(0x515)](),_0x52d79a=_0xa3ae9c(_0x15f7fe['$2']);switch(_0x202fcb){case'>':return _0xe714b[_0x49c422(0x2aa)]>_0x52d79a;case'>=':return _0x3307d1[_0x49c422(0x2aa)]>=_0x52d79a;case _0x49c422(0x423):return _0x104cf1[_0x49c422(0x2aa)]===_0x52d79a;case'<=':return _0x505c29['level']<=_0x52d79a;case'<':return _0x13e41d[_0x49c422(0x2aa)]<_0x52d79a;}return![];}}else{if('SwEIy'!==_0x49c422(0x359))return this[_0x49c422(0x176)]();else this[_0x49c422(0x6bb)][_0x49c422(0x27c)](0x0),this['_slotWindow']['activate']();}},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x5ee)]=function(){const _0x57e768=_0x2e9347;this[_0x57e768(0x1d1)][_0x57e768(0x474)]();const _0x5dc352=this[_0x57e768(0x6bb)]['item'](),_0x9090dd=this['_itemWindow'][_0x57e768(0x570)][_0x57e768(0x22f)](_0x5dc352),_0x3ed56e=Math['floor'](this[_0x57e768(0x1d1)][_0x57e768(0x4ff)]()/0x2)-0x1;this[_0x57e768(0x1d1)]['smoothSelect'](_0x9090dd>=0x0?_0x9090dd:0x0),this[_0x57e768(0x1d1)][_0x57e768(0x622)]>0x1&&(this['_itemWindow'][_0x57e768(0x622)]=0x1,this[_0x57e768(0x1d1)][_0x57e768(0x439)]()),this[_0x57e768(0x1d1)][_0x57e768(0x163)](this['_itemWindow'][_0x57e768(0x42f)]()-_0x3ed56e);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x43d)]=Scene_Equip['prototype'][_0x2e9347(0x158)],Scene_Equip['prototype'][_0x2e9347(0x158)]=function(){const _0xf0cb9b=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0xf0cb9b(0x43d)]['call'](this);if(this[_0xf0cb9b(0x424)]()){if(_0xf0cb9b(0x15d)!==_0xf0cb9b(0x3ce))this[_0xf0cb9b(0x33d)]['smoothSelect'](0x0),this['_slotWindow'][_0xf0cb9b(0x5bf)]();else return!![];}},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x3cd)]=Scene_Equip['prototype'][_0x2e9347(0x435)],Scene_Equip['prototype'][_0x2e9347(0x435)]=function(){const _0x262f77=_0x2e9347;VisuMZ[_0x262f77(0x2c2)]['Scene_Equip_onActorChange'][_0x262f77(0x51f)](this),this['isUseModernControls']()&&(_0x262f77(0x61a)===_0x262f77(0x2ec)?this[_0x262f77(0x4a4)](_0x552c23):(this[_0x262f77(0x33d)]['deactivate'](),this[_0x262f77(0x33d)]['deselect'](),this[_0x262f77(0x6bb)]['smoothSelect'](0x0),this[_0x262f77(0x6bb)][_0x262f77(0x468)]()));},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x451)]=function(){const _0x10fa6f=_0x2e9347;if(!this[_0x10fa6f(0x6bb)])return![];if(!this[_0x10fa6f(0x6bb)][_0x10fa6f(0x250)])return![];return this['_slotWindow']['isShiftRemoveShortcutEnabled']();},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x633)]=function(){const _0x100a63=_0x2e9347;if(this[_0x100a63(0x451)]())return TextManager[_0x100a63(0x167)](_0x100a63(0x1da));return Scene_MenuBase['prototype'][_0x100a63(0x633)][_0x100a63(0x51f)](this);},Scene_Equip['prototype'][_0x2e9347(0x362)]=function(){const _0x537fd1=_0x2e9347;if(this['buttonAssistSlotWindowShift']())return VisuMZ['ItemsEquipsCore']['Settings']['EquipScene']['buttonAssistRemove'];return Scene_MenuBase[_0x537fd1(0x655)][_0x537fd1(0x362)][_0x537fd1(0x51f)](this);},Scene_Equip['prototype'][_0x2e9347(0x1b0)]=function(){const _0x5795c5=_0x2e9347;if(this[_0x5795c5(0x451)]()){if(_0x5795c5(0x417)===_0x5795c5(0x417))return this[_0x5795c5(0x602)][_0x5795c5(0x21b)]/0x5/-0x3;else this['cursorPageup']();}return Scene_MenuBase[_0x5795c5(0x655)][_0x5795c5(0x1b0)][_0x5795c5(0x51f)](this);},Scene_Equip[_0x2e9347(0x655)][_0x2e9347(0x229)]=function(){const _0x8610dd=_0x2e9347;SceneManager[_0x8610dd(0x3b6)]();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x338)]=Scene_Load['prototype'][_0x2e9347(0x36d)],Scene_Load['prototype'][_0x2e9347(0x36d)]=function(){const _0x38fda9=_0x2e9347;VisuMZ[_0x38fda9(0x2c2)][_0x38fda9(0x338)]['call'](this),this[_0x38fda9(0x46f)]();},Scene_Load[_0x2e9347(0x655)][_0x2e9347(0x46f)]=function(){const _0x3250b8=_0x2e9347;if($gameSystem[_0x3250b8(0x3c2)]()!==$dataSystem['versionId'])for(const _0x1f9a7e of $gameActors[_0x3250b8(0x570)]){if(_0x1f9a7e)_0x1f9a7e['prepareNewEquipSlotsOnLoad']();}},Scene_Shop['prototype'][_0x2e9347(0x37d)]=function(){const _0x3e580a=_0x2e9347;if(ConfigManager[_0x3e580a(0x490)]&&ConfigManager[_0x3e580a(0x646)]!==undefined)return ConfigManager[_0x3e580a(0x646)];else{if(this[_0x3e580a(0x43e)]()){if('vjQrg'===_0x3e580a(0x23b))this[_0x3e580a(0x360)](_0x4e7707[_0x3e580a(0x4c1)]('pageup'));else return this['updatedLayoutStyle']()[_0x3e580a(0x1f9)](/LOWER/i);}else{if(_0x3e580a(0x287)!==_0x3e580a(0x479))Scene_MenuBase[_0x3e580a(0x655)]['isRightInputMode'][_0x3e580a(0x51f)](this);else{const _0x8210ef=_0x424147(_0x4f42fc['$1'])[_0x3e580a(0x20b)]()[_0x3e580a(0x515)](),_0x328c9c=_0x5f0259(_0x48773e['$2'])[_0x3e580a(0x515)]();this[_0x3e580a(0x4ee)][_0x8210ef]=_0x328c9c;}}}},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x290)]=function(){const _0x58ab49=_0x2e9347;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x58ab49(0x416)]!==undefined){if(_0x58ab49(0x465)===_0x58ab49(0x50b)){if(this[_0x58ab49(0x237)])return 0x0;const _0x24d6af=(_0x3c1e58[_0x58ab49(0x514)](_0x370d03)?_0x58ab49(0x200):_0x58ab49(0x3b9))[_0x58ab49(0x410)](_0x2f4706['id']),_0x814847=_0x58ab49(0x32f)[_0x58ab49(0x410)](_0x24d6af,_0x42f32c);if(_0x155091[_0x58ab49(0x2c2)][_0x58ab49(0x615)][_0x814847]){this[_0x58ab49(0x237)]=!![];const _0x4d8ad0=_0x306311[_0x58ab49(0x2c2)][_0x58ab49(0x615)][_0x814847][_0x58ab49(0x51f)](this,_0x4e65de,_0x4a1913);return this['_calculatingJSParameters']=![],_0x4d8ad0;}else return 0x0;}else return ConfigManager[_0x58ab49(0x416)];}else{if(this['isUseItemsEquipsCoreUpdatedLayout']())return this[_0x58ab49(0x2cb)]()[_0x58ab49(0x1f9)](/RIGHT/i);else{if(_0x58ab49(0x263)!==_0x58ab49(0x263)){const _0xd911ee=_0x259f9c(_0x3df324['$1']);return _0x317c7c['isLearnedSkill'](_0xd911ee);}else Scene_MenuBase[_0x58ab49(0x655)]['isRightInputMode']['call'](this);}}},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x2cb)]=function(){const _0x5e8759=_0x2e9347;return VisuMZ[_0x5e8759(0x2c2)][_0x5e8759(0x20a)][_0x5e8759(0x2a3)]['LayoutStyle'];},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x424)]=function(){const _0xc260d7=_0x2e9347;return this[_0xc260d7(0x4f6)]&&this[_0xc260d7(0x4f6)][_0xc260d7(0x424)]();},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x43e)]=function(){const _0x90451b=_0x2e9347;return VisuMZ[_0x90451b(0x2c2)][_0x90451b(0x20a)][_0x90451b(0x2a3)][_0x90451b(0x48e)];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x4b9)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x60f)],Scene_Shop['prototype'][_0x2e9347(0x60f)]=function(_0x5493a0,_0x238c03){const _0x218e47=_0x2e9347;_0x5493a0=VisuMZ[_0x218e47(0x2c2)]['deepCopy'](_0x5493a0),VisuMZ[_0x218e47(0x2c2)]['Scene_Shop_prepare'][_0x218e47(0x51f)](this,_0x5493a0,_0x238c03),this['adjustHiddenShownGoods']();},Scene_Shop['prototype'][_0x2e9347(0x1d6)]=function(){const _0x152ff4=_0x2e9347;this[_0x152ff4(0x5a2)]=0x0;const _0x5ebd7a=[];for(const _0x13213d of this[_0x152ff4(0x194)]){this['isGoodShown'](_0x13213d)?'efaTB'!=='efaTB'?!this['processCursorSpecialCheckModernControls']()&&_0x377a6d[_0x152ff4(0x655)][_0x152ff4(0x37f)][_0x152ff4(0x51f)](this):this['_goodsCount']++:_0x5ebd7a[_0x152ff4(0x4bd)](_0x13213d);}for(const _0x16d099 of _0x5ebd7a){this[_0x152ff4(0x194)][_0x152ff4(0x34b)](_0x16d099);}},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x406)]=function(_0x2f1ce8){if(_0x2f1ce8[0x0]>0x2||_0x2f1ce8[0x0]<0x0)return![];const _0x22e40e=[$dataItems,$dataWeapons,$dataArmors][_0x2f1ce8[0x0]][_0x2f1ce8[0x1]];if(!_0x22e40e)return![];return!![];},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x38c)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x509)],Scene_Shop['prototype'][_0x2e9347(0x509)]=function(){const _0x143786=_0x2e9347;VisuMZ[_0x143786(0x2c2)][_0x143786(0x38c)][_0x143786(0x51f)](this);if(this[_0x143786(0x43e)]()){if(_0x143786(0x455)!=='lIaJk')this[_0x143786(0x16e)]();else{const _0x242a55=_0x3dfd14[_0x143786(0x233)]('['+_0xb8a85['$1'][_0x143786(0x1f9)](/\d+/g)+']');for(const _0x3d53f4 of _0x242a55){if(!_0x32d021[_0x143786(0x334)](_0x3d53f4))return![];}}}this[_0x143786(0x27a)]();},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x16e)]=function(){const _0x2747a0=_0x2e9347;this[_0x2747a0(0x529)][_0x2747a0(0x3a2)](),this['_buyWindow']['show'](),this[_0x2747a0(0x4f1)]['deselect'](),this[_0x2747a0(0x315)]['show']();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x15f)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x3c7)],Scene_Shop['prototype'][_0x2e9347(0x3c7)]=function(){const _0x116950=_0x2e9347;return this[_0x116950(0x43e)]()?this[_0x116950(0x69c)]():VisuMZ['ItemsEquipsCore'][_0x116950(0x15f)][_0x116950(0x51f)](this);},Scene_Shop[_0x2e9347(0x655)]['helpWindowRectItemsEquipsCore']=function(){const _0x48a027=_0x2e9347,_0x1b661b=0x0,_0x522e0d=this['helpAreaTop'](),_0x396ac3=Graphics[_0x48a027(0x257)],_0x15832c=this[_0x48a027(0x322)]();return new Rectangle(_0x1b661b,_0x522e0d,_0x396ac3,_0x15832c);},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x3c1)]=Scene_Shop[_0x2e9347(0x655)]['goldWindowRect'],Scene_Shop[_0x2e9347(0x655)]['goldWindowRect']=function(){const _0x53e7f6=_0x2e9347;if(this[_0x53e7f6(0x43e)]())return this[_0x53e7f6(0x369)]();else{if(_0x53e7f6(0x498)===_0x53e7f6(0x498))return VisuMZ[_0x53e7f6(0x2c2)][_0x53e7f6(0x3c1)][_0x53e7f6(0x51f)](this);else _0x8f0e10['ItemsEquipsCore'][_0x53e7f6(0x555)][_0x53e7f6(0x51f)](this,_0x4ba279),this[_0x53e7f6(0x380)](_0x4a9936);}},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x369)]=function(){const _0xd07c48=_0x2e9347,_0x588d34=this[_0xd07c48(0x387)](),_0x12b5c6=this['calcWindowHeight'](0x1,!![]),_0x464245=this[_0xd07c48(0x290)]()?0x0:Graphics[_0xd07c48(0x257)]-_0x588d34,_0x9727=this[_0xd07c48(0x259)]();return new Rectangle(_0x464245,_0x9727,_0x588d34,_0x12b5c6);},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x549)]=Scene_Shop[_0x2e9347(0x655)]['commandWindowRect'],Scene_Shop[_0x2e9347(0x655)]['commandWindowRect']=function(){const _0x4dbb92=_0x2e9347;return this[_0x4dbb92(0x43e)]()?this[_0x4dbb92(0x67e)]():VisuMZ[_0x4dbb92(0x2c2)][_0x4dbb92(0x549)][_0x4dbb92(0x51f)](this);},Scene_Shop[_0x2e9347(0x655)]['commandWindowRectItemsEquipsCore']=function(){const _0x4b5353=_0x2e9347,_0x108ad8=this[_0x4b5353(0x290)]()?this[_0x4b5353(0x387)]():0x0,_0x498bb6=this[_0x4b5353(0x259)](),_0x8f1e2e=Graphics[_0x4b5353(0x257)]-this[_0x4b5353(0x387)](),_0x54a97f=this[_0x4b5353(0x266)](0x1,!![]);return new Rectangle(_0x108ad8,_0x498bb6,_0x8f1e2e,_0x54a97f);},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x279)]=Scene_Shop['prototype'][_0x2e9347(0x5f1)],Scene_Shop['prototype'][_0x2e9347(0x5f1)]=function(){const _0x346677=_0x2e9347;return this[_0x346677(0x43e)]()?this[_0x346677(0x5c3)]():VisuMZ[_0x346677(0x2c2)]['Scene_Shop_numberWindowRect'][_0x346677(0x51f)](this);},Scene_Shop['prototype'][_0x2e9347(0x5c3)]=function(){const _0x41d688=_0x2e9347,_0x4ce4e9=this['_commandWindow']['y']+this[_0x41d688(0x33d)][_0x41d688(0x23d)],_0x2e0389=Graphics['boxWidth']-this[_0x41d688(0x660)](),_0x27fccd=this['isRightInputMode']()?Graphics[_0x41d688(0x257)]-_0x2e0389:0x0,_0x1dd911=this[_0x41d688(0x4b7)]()-this[_0x41d688(0x33d)][_0x41d688(0x23d)];return new Rectangle(_0x27fccd,_0x4ce4e9,_0x2e0389,_0x1dd911);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x311)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x4a7)],Scene_Shop['prototype'][_0x2e9347(0x4a7)]=function(){const _0x3bf137=_0x2e9347;if(this[_0x3bf137(0x43e)]()){if(_0x3bf137(0x4ec)===_0x3bf137(0x4ec))return this[_0x3bf137(0x214)]();else{const _0x338198=this[_0x3bf137(0x4da)]['removeDebuff'][_0xab3806],_0x536ec3=_0x2f9322[_0x3bf137(0x655)]['buffIconIndex'](-0x1,_0x338198);if(_0x536ec3>0x0){_0x34e35f+=_0x3bf137(0x184)[_0x3bf137(0x410)](_0x536ec3),_0x416932++;if(_0x52f294>=_0x536a79)return _0x508595;}}}else{if(_0x3bf137(0x5be)===_0x3bf137(0x301)){if(_0x20fba5[_0x3bf137(0x3b4)]())_0xa18dc9[_0x3bf137(0x4ad)](_0x5885dc);}else return VisuMZ[_0x3bf137(0x2c2)]['Scene_Shop_statusWindowRect']['call'](this);}},Scene_Shop['prototype'][_0x2e9347(0x214)]=function(){const _0x4deb44=_0x2e9347,_0x333134=this['statusWidth'](),_0x114324=this['mainAreaHeight']()-this['_commandWindow'][_0x4deb44(0x23d)],_0x1a51d7=this[_0x4deb44(0x290)]()?0x0:Graphics[_0x4deb44(0x257)]-_0x333134,_0xb97c43=this[_0x4deb44(0x33d)]['y']+this['_commandWindow'][_0x4deb44(0x23d)];return new Rectangle(_0x1a51d7,_0xb97c43,_0x333134,_0x114324);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x409)]=Scene_Shop['prototype'][_0x2e9347(0x5ad)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x5ad)]=function(){const _0xe0fda9=_0x2e9347;return this['isUseItemsEquipsCoreUpdatedLayout']()?this['buyWindowRectItemsEquipsCore']():VisuMZ['ItemsEquipsCore'][_0xe0fda9(0x409)][_0xe0fda9(0x51f)](this);},Scene_Shop['prototype'][_0x2e9347(0x26e)]=function(){const _0x13d416=_0x2e9347,_0x5df876=this[_0x13d416(0x33d)]['y']+this[_0x13d416(0x33d)][_0x13d416(0x23d)],_0x47487f=Graphics[_0x13d416(0x257)]-this[_0x13d416(0x660)](),_0xeb3060=this[_0x13d416(0x4b7)]()-this[_0x13d416(0x33d)][_0x13d416(0x23d)],_0xeab651=this['isRightInputMode']()?Graphics[_0x13d416(0x257)]-_0x47487f:0x0;return new Rectangle(_0xeab651,_0x5df876,_0x47487f,_0xeb3060);},VisuMZ[_0x2e9347(0x2c2)]['Scene_Shop_createCategoryWindow']=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x4ab)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x4ab)]=function(){const _0xf4ca10=_0x2e9347;VisuMZ[_0xf4ca10(0x2c2)][_0xf4ca10(0x427)][_0xf4ca10(0x51f)](this);if(this[_0xf4ca10(0x424)]()){if('wRFQn'===_0xf4ca10(0x14f))return _0x536ba4[_0xf4ca10(0x2c2)]['Settings'][_0xf4ca10(0x375)][_0xf4ca10(0x393)];else this[_0xf4ca10(0x42b)]();}},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x41a)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x21a)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x21a)]=function(){const _0x4fb0e1=_0x2e9347;if(this[_0x4fb0e1(0x43e)]()){if(_0x4fb0e1(0x517)===_0x4fb0e1(0x170)){const _0x202e4d=_0x47934e[_0x4fb0e1(0x2c2)]['Settings']['EquipScene'][_0x4fb0e1(0x538)]||'',_0x210314=this[_0x4fb0e1(0x5a8)](),_0x4e09e3=_0x4fb0e1(0x184)['format'](_0x36aae7['iconIndex']),_0x31b2ac=_0x130714[_0x4fb0e1(0x5a8)]||'';let _0x3e4c7a=_0x202e4d['format'](_0x210314,_0x4e09e3,_0x31b2ac);if(_0x3e4c7a[_0x4fb0e1(0x3d3)]>0x0)_0x1c3b3e(_0x3e4c7a);}else return this[_0x4fb0e1(0x1c0)]();}else return VisuMZ['ItemsEquipsCore'][_0x4fb0e1(0x41a)]['call'](this);},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x1c0)]=function(){const _0x2beba5=_0x2e9347,_0x4bc7cf=this[_0x2beba5(0x33d)]['y'],_0x12a61a=this[_0x2beba5(0x33d)][_0x2beba5(0x21b)],_0x275b9e=this[_0x2beba5(0x266)](0x1,!![]),_0x1f7869=this[_0x2beba5(0x290)]()?Graphics[_0x2beba5(0x257)]-_0x12a61a:0x0;return new Rectangle(_0x1f7869,_0x4bc7cf,_0x12a61a,_0x275b9e);},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x42b)]=function(){const _0xb13ad1=_0x2e9347;delete this[_0xb13ad1(0x4f6)][_0xb13ad1(0x14e)]['ok'],delete this[_0xb13ad1(0x4f6)][_0xb13ad1(0x14e)][_0xb13ad1(0x44d)];},VisuMZ[_0x2e9347(0x2c2)]['Scene_Shop_createSellWindow']=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x5a7)],Scene_Shop['prototype']['createSellWindow']=function(){const _0x231435=_0x2e9347;VisuMZ[_0x231435(0x2c2)]['Scene_Shop_createSellWindow'][_0x231435(0x51f)](this);if(this[_0x231435(0x43e)]()){if(_0x231435(0x428)===_0x231435(0x428))this[_0x231435(0x162)]();else{const _0x4279ec=_0x231435(0x26c);if(!this[_0x231435(0x4da)][_0x231435(0x50d)]&&!this[_0x231435(0x4ee)][_0x4279ec])return![];const _0x458e13=this['getItemEffectsRemovedStatesBuffsLabel']();this['drawItemKeyData'](_0x458e13,_0x21417a,_0x38bfa4,_0x59b399,!![]);const _0x1cd398=this[_0x231435(0x45c)]();return this[_0x231435(0x608)](_0x1cd398,_0x4b23f7,_0x51d529,_0x5cd87a,![],_0x231435(0x5a1)),this[_0x231435(0x5a5)](_0x46540a,_0x24e723,_0x340894),this['resetFontSettings'](),!![];}}},VisuMZ[_0x2e9347(0x2c2)]['Scene_Shop_sellWindowRect']=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x4c7)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x4c7)]=function(){const _0x440f16=_0x2e9347;return this[_0x440f16(0x43e)]()?this['sellWindowRectItemsEquipsCore']():VisuMZ[_0x440f16(0x2c2)][_0x440f16(0x5c6)][_0x440f16(0x51f)](this);},Scene_Shop['prototype'][_0x2e9347(0x3df)]=function(){const _0x2ba826=_0x2e9347,_0x3c3b4c=this[_0x2ba826(0x4f6)]['y']+this[_0x2ba826(0x4f6)][_0x2ba826(0x23d)],_0x3b4a54=Graphics[_0x2ba826(0x257)]-this[_0x2ba826(0x660)](),_0x24e132=this[_0x2ba826(0x4b7)]()-this[_0x2ba826(0x4f6)][_0x2ba826(0x23d)],_0x4b185d=this[_0x2ba826(0x290)]()?Graphics['boxWidth']-_0x3b4a54:0x0;return new Rectangle(_0x4b185d,_0x3c3b4c,_0x3b4a54,_0x24e132);},Scene_Shop['prototype'][_0x2e9347(0x162)]=function(){const _0x2cacda=_0x2e9347;this[_0x2cacda(0x536)][_0x2cacda(0x4c3)](this[_0x2cacda(0x315)]);},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x660)]=function(){const _0x2c182e=_0x2e9347;return VisuMZ[_0x2c182e(0x2c2)]['Settings'][_0x2c182e(0x375)][_0x2c182e(0x548)];},VisuMZ[_0x2e9347(0x2c2)]['Scene_Shop_activateSellWindow']=Scene_Shop[_0x2e9347(0x655)]['activateSellWindow'],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x328)]=function(){const _0x5d17be=_0x2e9347;VisuMZ[_0x5d17be(0x2c2)][_0x5d17be(0x55e)][_0x5d17be(0x51f)](this),this[_0x5d17be(0x43e)]()&&this['_statusWindow'][_0x5d17be(0x3a1)](),this[_0x5d17be(0x536)][_0x5d17be(0x3c9)]();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x657)]=Scene_Shop['prototype'][_0x2e9347(0x284)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x284)]=function(){const _0x1199e5=_0x2e9347;VisuMZ[_0x1199e5(0x2c2)][_0x1199e5(0x657)]['call'](this),this[_0x1199e5(0x43e)]()&&('xQnfM'===_0x1199e5(0x440)?(this['contents'][_0x1199e5(0x5c7)](),this['contentsBack']['clear'](),this['_item']&&(this[_0x1199e5(0x3d6)](),this['changePaintOpacity'](!![]),this[_0x1199e5(0x4d1)](),this[_0x1199e5(0x15e)]()?this[_0x1199e5(0x513)]():this[_0x1199e5(0x64f)](),this[_0x1199e5(0x1e7)]())):this[_0x1199e5(0x165)]());},Scene_Shop['prototype'][_0x2e9347(0x165)]=function(){const _0x999326=_0x2e9347;this[_0x999326(0x3f5)]=this[_0x999326(0x3f5)]||0x0,this[_0x999326(0x4f1)][_0x999326(0x27c)](this[_0x999326(0x3f5)]);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x241)]=Scene_Shop['prototype'][_0x2e9347(0x631)],Scene_Shop['prototype'][_0x2e9347(0x631)]=function(){const _0x28d670=_0x2e9347;VisuMZ[_0x28d670(0x2c2)][_0x28d670(0x241)]['call'](this);if(this[_0x28d670(0x43e)]()){if(_0x28d670(0x2ca)!==_0x28d670(0x2ca)){const _0x217218=this[_0x28d670(0x3b3)]()[_0x588a21],_0x1c805f=_0x3c2824['equipItems']()[_0x28d670(0x4aa)](_0x32cd80=>_0x4e745d['getEtypeIDs'](_0x32cd80)[_0x28d670(0x5e8)](_0x217218)&&this[_0x28d670(0x4bb)](_0x32cd80)&&!_0x2c7f8f[_0x28d670(0x2fe)](_0x32cd80));let _0x1fa73d=null,_0x2f1e52=-0x3e8;for(let _0x5e77e1=0x0;_0x5e77e1<_0x1c805f[_0x28d670(0x3d3)];_0x5e77e1++){const _0x790f3=this[_0x28d670(0x528)](_0x1c805f[_0x5e77e1]);_0x790f3>_0x2f1e52&&(_0x2f1e52=_0x790f3,_0x1fa73d=_0x1c805f[_0x5e77e1]);}return _0x1fa73d;}else this[_0x28d670(0x34a)]();}this[_0x28d670(0x424)]()&&(this[_0x28d670(0x4f6)][_0x28d670(0x27c)](0x0),this[_0x28d670(0x2fb)]());},Scene_Shop['prototype'][_0x2e9347(0x34a)]=function(){const _0x246d74=_0x2e9347;this[_0x246d74(0x4f1)][_0x246d74(0x3a2)](),this[_0x246d74(0x33d)][_0x246d74(0x3a2)]();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x2cd)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x1c3)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x1c3)]=function(){const _0x19a68d=_0x2e9347;VisuMZ[_0x19a68d(0x2c2)][_0x19a68d(0x2cd)][_0x19a68d(0x51f)](this),this[_0x19a68d(0x43e)]()&&this[_0x19a68d(0x568)]();},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x568)]=function(){const _0x513782=_0x2e9347;this['_buyWindowLastIndex']=this[_0x513782(0x4f1)][_0x513782(0x42f)](),this[_0x513782(0x4f1)][_0x513782(0x3a1)](),this['_buyWindow'][_0x513782(0x3c8)](),this[_0x513782(0x4f1)][_0x513782(0x4ef)](0x0,0x0),this[_0x513782(0x315)][_0x513782(0x3a1)](),this[_0x513782(0x529)][_0x513782(0x3a2)]();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x2f5)]=Scene_Shop['prototype']['onCategoryCancel'],Scene_Shop[_0x2e9347(0x655)]['onCategoryCancel']=function(){const _0x4c9f9d=_0x2e9347;VisuMZ[_0x4c9f9d(0x2c2)][_0x4c9f9d(0x2f5)][_0x4c9f9d(0x51f)](this),this['isUseItemsEquipsCoreUpdatedLayout']()&&this[_0x4c9f9d(0x356)]();},Scene_Shop['prototype'][_0x2e9347(0x356)]=function(){const _0x42432f=_0x2e9347;this[_0x42432f(0x4f1)]['show'](),this[_0x42432f(0x33d)][_0x42432f(0x3a1)]();},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x3bd)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x24c)],Scene_Shop['prototype']['onBuyOk']=function(){const _0x49548f=_0x2e9347;$gameTemp[_0x49548f(0x3e8)]=!![],VisuMZ[_0x49548f(0x2c2)]['Scene_Shop_onBuyOk']['call'](this),$gameTemp[_0x49548f(0x3e8)]=![],this[_0x49548f(0x2f1)]=this[_0x49548f(0x4f1)]['item']();},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x19a)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x303)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x303)]=function(){const _0x3c727a=_0x2e9347;$gameTemp[_0x3c727a(0x3e8)]=!![],this['_item']=this[_0x3c727a(0x4f1)][_0x3c727a(0x343)]();const _0x7d8f49=VisuMZ[_0x3c727a(0x2c2)][_0x3c727a(0x19a)][_0x3c727a(0x51f)](this);return $gameTemp[_0x3c727a(0x3e8)]=![],this['_item']=this[_0x3c727a(0x4f1)]['item'](),_0x7d8f49;},VisuMZ['ItemsEquipsCore']['Scene_Shop_onSellOk']=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x442)],Scene_Shop[_0x2e9347(0x655)]['onSellOk']=function(){const _0x5a7c29=_0x2e9347;VisuMZ[_0x5a7c29(0x2c2)]['Scene_Shop_onSellOk'][_0x5a7c29(0x51f)](this),this[_0x5a7c29(0x43e)]()&&this[_0x5a7c29(0x47a)]();},Scene_Shop[_0x2e9347(0x655)]['onSellOkItemsEquipsCore']=function(){const _0x3df526=_0x2e9347;this['_categoryWindow'][_0x3df526(0x3a1)]();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x1a3)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x415)],Scene_Shop[_0x2e9347(0x655)]['onSellCancel']=function(){const _0x448e9f=_0x2e9347;VisuMZ[_0x448e9f(0x2c2)][_0x448e9f(0x1a3)][_0x448e9f(0x51f)](this),this[_0x448e9f(0x424)]()&&this[_0x448e9f(0x60e)](),this['isUseItemsEquipsCoreUpdatedLayout']()&&(_0x448e9f(0x473)!=='TDuPg'?this[_0x448e9f(0x529)][_0x448e9f(0x3a2)]():(this[_0x448e9f(0x617)](),_0x30c0d4[_0x448e9f(0x2c2)][_0x448e9f(0x558)][_0x448e9f(0x51f)](this,_0x1e22d0)));},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x3b1)]=function(_0x198dd8){const _0x304530=_0x2e9347,_0x27287=this[_0x304530(0x2f1)];this[_0x304530(0x2f1)]=_0x198dd8;const _0x31c810=this[_0x304530(0x4a8)]();return this[_0x304530(0x2f1)]=_0x27287,_0x31c810;},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x5d8)]=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x4a8)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x4a8)]=function(){const _0x2f0cb4=_0x2e9347;let _0x206393=this[_0x2f0cb4(0x14d)]();const _0x69454=this[_0x2f0cb4(0x2f1)];return _0x206393=VisuMZ[_0x2f0cb4(0x2c2)][_0x2f0cb4(0x20a)][_0x2f0cb4(0x2a3)]['SellPriceJS'][_0x2f0cb4(0x51f)](this,_0x69454,_0x206393),_0x206393;},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x14d)]=function(){const _0x320343=_0x2e9347;let _0x4a4718=this[_0x320343(0x2f1)][_0x320343(0x470)];if(!this[_0x320343(0x2f1)]){if(_0x320343(0x6b7)===_0x320343(0x69f))_0x2ccd97[_0x320343(0x2c2)][_0x320343(0x5b3)](_0x538b5d),_0x3ff69d[_0x320343(0x2c2)]['SetupProxyItemGroup'](_0x2cf45a),_0xc28022['ItemsEquipsCore'][_0x320343(0x5b3)](_0x215d62);else return 0x0;}else{if(this[_0x320343(0x2f1)][_0x320343(0x2c0)]['match'](/<JS SELL PRICE>\s*([\s\S]*)\s*<\/JS SELL PRICE>/i)){if('wdyVj'==='wdyVj'){const _0xc6004=String(RegExp['$1']);window['item']=this[_0x320343(0x2f1)],window[_0x320343(0x470)]=_0x4a4718*this[_0x320343(0x425)]();try{if('LRPyL'==='ngoxe')for(const _0x2b639e of _0x10f6ad){const _0xdff8d1=_0x127289[_0x320343(0x22f)](_0x2b639e[_0x320343(0x515)]());if(_0xdff8d1>0x0)_0x3cd306[_0x320343(0x3b3)]['push'](_0xdff8d1);}else eval(_0xc6004);}catch(_0x537ac8){if($gameTemp[_0x320343(0x3b4)]())console[_0x320343(0x4ad)](_0x537ac8);}let _0x362e78=window['price'];window[_0x320343(0x343)]=undefined,window[_0x320343(0x470)]=undefined;if(isNaN(_0x362e78))_0x362e78=0x0;return Math[_0x320343(0x1fc)](_0x362e78);}else _0x1482b7[_0x320343(0x49d)](_0x320343(0x1da))&&this[_0x320343(0x25a)]()?this['cursorPageup']():this[_0x320343(0x21d)](_0x29524a['isTriggered']('up'));}else{if(this[_0x320343(0x2f1)][_0x320343(0x2c0)]['match'](/<SELL PRICE:[ ](\d+)>/i)){if('EPQbP'!==_0x320343(0x4a9))_0xf66eac['ItemsEquipsCore'][_0x320343(0x20a)][_0x320343(0x575)][_0x320343(0x1a8)]['call'](this),this[_0x320343(0x24b)]();else return parseInt(RegExp['$1']);}else return Math['floor'](this[_0x320343(0x45d)]());}}},Scene_Shop[_0x2e9347(0x655)]['baseSellingPrice']=function(){const _0x22dded=_0x2e9347;return this['_item'][_0x22dded(0x470)]*this[_0x22dded(0x425)]();},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x425)]=function(){const _0x4a31a6=_0x2e9347;return VisuMZ[_0x4a31a6(0x2c2)][_0x4a31a6(0x20a)][_0x4a31a6(0x2a3)]['SellPriceRate'];},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x5e6)]=function(){const _0x4c0faa=_0x2e9347;if(!this['updatedLayoutStyle']())return![];if(!this[_0x4c0faa(0x424)]())return![];if(!this['_sellWindow'])return![];if(!this[_0x4c0faa(0x536)][_0x4c0faa(0x250)])return![];return this[_0x4c0faa(0x2cb)]()&&this[_0x4c0faa(0x424)]();},Scene_Shop['prototype'][_0x2e9347(0x3a5)]=function(){const _0x1a0b97=_0x2e9347;if(this[_0x1a0b97(0x5e6)]()){if('vEmqs'==='pVPKL'){const _0x2e79c3=_0x2121c7[_0x1a0b97(0x233)]('['+_0x12c205['$1'][_0x1a0b97(0x1f9)](/\d+/g)+']');for(const _0x290ac7 of _0x2e79c3){if(!_0x206e10[_0x1a0b97(0x334)](_0x290ac7))return!![];}return![];}else return this[_0x1a0b97(0x536)][_0x1a0b97(0x58d)]()===0x1?'oHegR'===_0x1a0b97(0x190)?_0x185cb3[_0x1a0b97(0x2c2)][_0x1a0b97(0x20a)][_0x1a0b97(0x575)][_0x1a0b97(0x5a3)]:TextManager['getInputMultiButtonStrings'](_0x1a0b97(0x6af),_0x1a0b97(0x5a1)):TextManager['getInputMultiButtonStrings'](_0x1a0b97(0x583),'pagedown');}else{if(this[_0x1a0b97(0x331)]&&this[_0x1a0b97(0x331)]['active']){if('BpPbl'!=='ZOfLa')return TextManager[_0x1a0b97(0x580)](_0x1a0b97(0x6af),_0x1a0b97(0x5a1));else{if(this[_0x1a0b97(0x207)](_0x56daef))return![];if(!_0x59e02f)return![];if(_0x4548fa['_checkEquipRequirements'])return!![];if(_0x2f5230[_0x1a0b97(0x637)]())return!![];const _0x1addc7=this[_0x1a0b97(0x38b)](_0x388cc8);for(const _0x16eaa6 of _0x1addc7){if(!this[_0x1a0b97(0x36e)](_0x5c9ecc,_0x16eaa6))return![];}return!![];}}}return Scene_MenuBase[_0x1a0b97(0x655)]['buttonAssistKey1'][_0x1a0b97(0x51f)](this);},Scene_Shop[_0x2e9347(0x655)]['buttonAssistKey2']=function(){const _0x3cf0f9=_0x2e9347;if(this[_0x3cf0f9(0x331)]&&this[_0x3cf0f9(0x331)][_0x3cf0f9(0x250)])return TextManager[_0x3cf0f9(0x580)]('up',_0x3cf0f9(0x1a9));return Scene_MenuBase['prototype'][_0x3cf0f9(0x457)][_0x3cf0f9(0x51f)](this);},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x667)]=function(){const _0x5c7986=_0x2e9347;if(this['buttonAssistItemListRequirement']())return VisuMZ[_0x5c7986(0x2c2)][_0x5c7986(0x20a)][_0x5c7986(0x66f)][_0x5c7986(0x2d5)];else{if(this[_0x5c7986(0x331)]&&this[_0x5c7986(0x331)][_0x5c7986(0x250)])return VisuMZ[_0x5c7986(0x2c2)][_0x5c7986(0x20a)][_0x5c7986(0x2a3)][_0x5c7986(0x6b4)];}return Scene_MenuBase[_0x5c7986(0x655)][_0x5c7986(0x667)][_0x5c7986(0x51f)](this);},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x6a4)]=function(){const _0x5a44a0=_0x2e9347;if(this[_0x5a44a0(0x331)]&&this[_0x5a44a0(0x331)][_0x5a44a0(0x250)]){if(_0x5a44a0(0x3ad)===_0x5a44a0(0x3ad))return VisuMZ[_0x5a44a0(0x2c2)][_0x5a44a0(0x20a)][_0x5a44a0(0x2a3)][_0x5a44a0(0x227)];else{this['hideAdditionalSprites'](),this[_0x5a44a0(0x3d6)]();if(this['_actor'])this[_0x5a44a0(0x23c)]['refresh']();this['isUseItemsEquipsCoreUpdatedLayout']()?this['prepareRefreshItemsEquipsCoreLayout']():_0x296898[_0x5a44a0(0x2c2)]['Window_EquipStatus_refresh']['call'](this);}}return Scene_MenuBase[_0x5a44a0(0x655)][_0x5a44a0(0x6a4)][_0x5a44a0(0x51f)](this);},Scene_Shop[_0x2e9347(0x655)]['resetShopSwitches']=function(){const _0x164d31=_0x2e9347;if(!SceneManager[_0x164d31(0x60c)]())return;const _0x472bf9=VisuMZ['ItemsEquipsCore'][_0x164d31(0x20a)][_0x164d31(0x2a3)];_0x472bf9[_0x164d31(0x3c5)]&&(_0x164d31(0x341)===_0x164d31(0x239)?(_0x3b187a[_0x164d31(0x655)][_0x164d31(0x468)][_0x164d31(0x51f)](this),this[_0x164d31(0x44b)]()):$gameSwitches[_0x164d31(0x684)](_0x472bf9[_0x164d31(0x3c5)],![]));if(_0x472bf9[_0x164d31(0x620)]){if(_0x164d31(0x5c5)===_0x164d31(0x20e)){const _0x30c68c=this[_0x164d31(0x180)];_0x30c68c['drawText'](_0x584f50,0x0,_0x8f3c04['y'],_0x30c68c['innerWidth'],_0x164d31(0x5a6));}else $gameSwitches['setValue'](_0x472bf9[_0x164d31(0x620)],![]);}},VisuMZ['ItemsEquipsCore']['Scene_Shop_doBuy']=Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x2e9)],Scene_Shop['prototype'][_0x2e9347(0x2e9)]=function(_0x3a2db1){const _0x5c4395=_0x2e9347;VisuMZ[_0x5c4395(0x2c2)][_0x5c4395(0x557)][_0x5c4395(0x51f)](this,_0x3a2db1),this['onBuyItem'](this[_0x5c4395(0x2f1)],_0x3a2db1);if(_0x3a2db1<=0x0)return;const _0x265afe=VisuMZ['ItemsEquipsCore'][_0x5c4395(0x20a)][_0x5c4395(0x2a3)];_0x265afe[_0x5c4395(0x3c5)]&&$gameSwitches[_0x5c4395(0x684)](_0x265afe[_0x5c4395(0x3c5)],!![]),this['_buyWindow'][_0x5c4395(0x474)](),this[_0x5c4395(0x536)][_0x5c4395(0x474)]();},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x46b)]=function(_0x3e502f,_0x508e7f){const _0x19110b=_0x2e9347;this[_0x19110b(0x30a)](_0x3e502f,_0x508e7f),$gameParty[_0x19110b(0x2d2)](_0x3e502f,_0x508e7f),$gameParty[_0x19110b(0x2ba)](_0x508e7f*this[_0x19110b(0x303)]());},Scene_Shop['prototype'][_0x2e9347(0x30a)]=function(_0xd88c62,_0xa65c43){const _0x4e8ebb=_0x2e9347;if(!_0xd88c62)return;if(!_0xa65c43)return;const _0x129ed4=VisuMZ[_0x4e8ebb(0x2c2)][_0x4e8ebb(0x5b8)],_0x585a7d=_0xd88c62[_0x4e8ebb(0x2c0)]||'';if(_0x585a7d[_0x4e8ebb(0x1f9)](_0x129ed4[_0x4e8ebb(0x3ae)])){if(_0x4e8ebb(0x4d3)===_0x4e8ebb(0x4d3)){const _0x5c6f15=String(RegExp['$1'])[_0x4e8ebb(0x47f)](',')[_0x4e8ebb(0x6a3)](_0x735636=>Number(_0x735636));for(const _0x1b85ca of _0x5c6f15){_0x4e8ebb(0x329)===_0x4e8ebb(0x333)?(_0x586bc6[_0x4e8ebb(0x34b)](0x0),_0x4d5409[_0x4e8ebb(0x34b)](-0x1),this[_0x4e8ebb(0x502)]=_0x14a51c,this['refresh'](),this[_0x4e8ebb(0x647)]()):$gameSwitches['setValue'](_0x1b85ca,!![]);}}else{if(_0x20dc32['isProxyItem'](_0x4e85de))_0x21dbaa=null;const _0x47e732=this[_0x4e8ebb(0x187)](_0x54b17c);_0x30ff88[_0x4e8ebb(0x2c2)]['Game_Party_gainItem'][_0x4e8ebb(0x51f)](this,_0x35780c,_0x77b004,_0x186418);if(this['numItems'](_0x3bf91e)>_0x47e732)this[_0x4e8ebb(0x626)](_0x3a3a7d);}}if(_0x585a7d[_0x4e8ebb(0x1f9)](_0x129ed4[_0x4e8ebb(0x681)])){const _0x2539ba=String(RegExp['$1'])['split'](',')[_0x4e8ebb(0x6a3)](_0x369c9e=>Number(_0x369c9e));for(const _0x3143b1 of _0x2539ba){$gameSwitches[_0x4e8ebb(0x684)](_0x3143b1,![]);}}},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x40f)]=Scene_Shop['prototype'][_0x2e9347(0x310)],Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x310)]=function(_0x129565){const _0x21328d=_0x2e9347;VisuMZ[_0x21328d(0x2c2)][_0x21328d(0x40f)][_0x21328d(0x51f)](this,_0x129565),this[_0x21328d(0x458)](this[_0x21328d(0x2f1)],_0x129565);if(_0x129565<=0x0)return;const _0x133dbb=VisuMZ[_0x21328d(0x2c2)][_0x21328d(0x20a)]['ShopScene'];_0x133dbb[_0x21328d(0x3c5)]&&$gameSwitches[_0x21328d(0x684)](_0x133dbb[_0x21328d(0x620)],!![]),this['_buyWindow'][_0x21328d(0x474)](),this[_0x21328d(0x536)][_0x21328d(0x474)]();},Scene_Shop['prototype'][_0x2e9347(0x458)]=function(_0x4304db,_0x9d51cf){const _0x37a354=_0x2e9347;this['processShopCondListingOnSellItem'](_0x4304db,_0x9d51cf),$gameParty[_0x37a354(0x39c)](_0x4304db,_0x9d51cf),$gameParty[_0x37a354(0x2a0)](_0x9d51cf*this[_0x37a354(0x4a8)]());},Scene_Shop[_0x2e9347(0x655)][_0x2e9347(0x592)]=function(_0x3dabe2,_0x34ce73){const _0x2c7695=_0x2e9347;if(!_0x3dabe2)return;if(!_0x34ce73)return;const _0x2ac25e=VisuMZ[_0x2c7695(0x2c2)][_0x2c7695(0x5b8)],_0x3af2b0=_0x3dabe2['note']||'';if(_0x3af2b0[_0x2c7695(0x1f9)](_0x2ac25e[_0x2c7695(0x607)])){if(_0x2c7695(0x46d)!=='GxpnZ')_0x52c35f[_0x2c7695(0x2c2)][_0x2c7695(0x2c1)](_0x587373,_0xbdc112),_0x535933[_0x2c7695(0x2c2)][_0x2c7695(0x462)](_0x18a8a0,_0x4e6363),_0x4eba42[_0x2c7695(0x2c2)]['Parse_Notetags_ParamValues'](_0x28e8e8,_0x4e31d5),_0x157cfb[_0x2c7695(0x2c2)][_0x2c7695(0x559)](_0x32c6f6,_0x45ce2f),_0x5a2cf8['ItemsEquipsCore'][_0x2c7695(0x384)](_0x5af224,_0x207d44);else{const _0x17ad02=String(RegExp['$1'])[_0x2c7695(0x47f)](',')[_0x2c7695(0x6a3)](_0x2f479e=>Number(_0x2f479e));for(const _0x5a9402 of _0x17ad02){_0x2c7695(0x1b7)==='DpfCT'?this[_0x2c7695(0x53b)](_0x3456c7,_0x32d138['x'],_0x182e10['y'],_0x431717):$gameSwitches[_0x2c7695(0x684)](_0x5a9402,!![]);}}}if(_0x3af2b0[_0x2c7695(0x1f9)](_0x2ac25e[_0x2c7695(0x6c3)])){if('NMLSD'==='gaALs')return!![];else{const _0x2dabcd=String(RegExp['$1'])[_0x2c7695(0x47f)](',')[_0x2c7695(0x6a3)](_0x181995=>Number(_0x181995));for(const _0x27c06a of _0x2dabcd){$gameSwitches[_0x2c7695(0x684)](_0x27c06a,![]);}}}};function _0x4987(_0x2266a7,_0x11bf82){const _0x20e202=_0x20e2();return _0x4987=function(_0x49874f,_0x5801a9){_0x49874f=_0x49874f-0x14d;let _0x4f3935=_0x20e202[_0x49874f];return _0x4f3935;},_0x4987(_0x2266a7,_0x11bf82);}function Sprite_NewLabel(){const _0x57c80a=_0x2e9347;this[_0x57c80a(0x1b1)](...arguments);}Sprite_NewLabel[_0x2e9347(0x655)]=Object[_0x2e9347(0x509)](Sprite[_0x2e9347(0x655)]),Sprite_NewLabel['prototype'][_0x2e9347(0x654)]=Sprite_NewLabel,Sprite_NewLabel['prototype']['initialize']=function(){const _0x5c4333=_0x2e9347;Sprite['prototype'][_0x5c4333(0x1b1)]['call'](this),this[_0x5c4333(0x6b9)]();},Sprite_NewLabel[_0x2e9347(0x655)][_0x2e9347(0x6b9)]=function(){const _0x321c69=_0x2e9347,_0x47be58=ImageManager[_0x321c69(0x66a)],_0x55fbe3=ImageManager['iconHeight'];this[_0x321c69(0x344)]=new Bitmap(_0x47be58,_0x55fbe3),this['drawNewLabelIcon'](),this['drawNewLabelText']();},Sprite_NewLabel[_0x2e9347(0x655)][_0x2e9347(0x5fe)]=function(){const _0x35cc3b=_0x2e9347,_0x1195df=VisuMZ[_0x35cc3b(0x2c2)][_0x35cc3b(0x20a)][_0x35cc3b(0x674)][_0x35cc3b(0x69a)];if(_0x1195df<=0x0)return;const _0x314c92=ImageManager[_0x35cc3b(0x4cf)](_0x35cc3b(0x639)),_0x39f50d=ImageManager[_0x35cc3b(0x66a)],_0x2d04db=ImageManager[_0x35cc3b(0x231)],_0x2f928b=_0x1195df%0x10*_0x39f50d,_0x32ad75=Math[_0x35cc3b(0x1fc)](_0x1195df/0x10)*_0x2d04db;this[_0x35cc3b(0x344)][_0x35cc3b(0x2db)](_0x314c92,_0x2f928b,_0x32ad75,_0x39f50d,_0x2d04db,0x0,0x0);},Sprite_NewLabel[_0x2e9347(0x655)][_0x2e9347(0x56b)]=function(){const _0x3f1c52=_0x2e9347,_0x3cff43=VisuMZ[_0x3f1c52(0x2c2)][_0x3f1c52(0x20a)][_0x3f1c52(0x674)],_0x37ca9d=_0x3cff43[_0x3f1c52(0x6b8)];if(_0x37ca9d==='')return;const _0x49644e=ImageManager[_0x3f1c52(0x66a)],_0x6af321=ImageManager[_0x3f1c52(0x231)];this['bitmap'][_0x3f1c52(0x526)]=_0x3cff43[_0x3f1c52(0x54a)]||$gameSystem[_0x3f1c52(0x388)](),this[_0x3f1c52(0x344)]['textColor']=this[_0x3f1c52(0x571)](),this[_0x3f1c52(0x344)][_0x3f1c52(0x1ee)]=_0x3cff43[_0x3f1c52(0x5f0)],this['bitmap'][_0x3f1c52(0x1a1)](_0x37ca9d,0x0,_0x6af321/0x2,_0x49644e,_0x6af321/0x2,'center');},Sprite_NewLabel[_0x2e9347(0x655)][_0x2e9347(0x571)]=function(){const _0x54a942=_0x2e9347,_0x59c462=VisuMZ[_0x54a942(0x2c2)]['Settings'][_0x54a942(0x674)][_0x54a942(0x19b)];return _0x59c462[_0x54a942(0x1f9)](/#(.*)/i)?'#'+String(RegExp['$1']):ColorManager[_0x54a942(0x3ff)](_0x59c462);},Window_Base[_0x2e9347(0x655)]['drawItemName']=function(_0x553b8b,_0x12d206,_0x59b78b,_0x1ef0c5){const _0x5041cf=_0x2e9347;if(_0x553b8b){if(_0x5041cf(0x18f)===_0x5041cf(0x18f)){const _0x879f14=_0x59b78b+(this['lineHeight']()-ImageManager[_0x5041cf(0x231)])/0x2,_0x349a1d=ImageManager[_0x5041cf(0x66a)]+0x4,_0x5d8c59=Math[_0x5041cf(0x539)](0x0,_0x1ef0c5-_0x349a1d);this['changeTextColor'](ColorManager[_0x5041cf(0x3db)](_0x553b8b)),this[_0x5041cf(0x262)](_0x553b8b[_0x5041cf(0x1f2)],_0x12d206,_0x879f14),this[_0x5041cf(0x1a1)](_0x553b8b[_0x5041cf(0x5a8)],_0x12d206+_0x349a1d,_0x59b78b,_0x5d8c59),this[_0x5041cf(0x6ba)]();}else{const _0x1a1ca0=this['getItemDamageAmountLabel']();this['drawItemKeyData'](_0x1a1ca0,_0x55a1ba,_0xe2e8b7,_0x8eddcd,!![]),this[_0x5041cf(0x4e4)]();const _0x30bb95=this[_0x5041cf(0x269)](),_0x1ea9dc=_0x554253[_0x5041cf(0x367)]([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this['_item'][_0x5041cf(0x17f)][_0x5041cf(0x5da)]]);return this[_0x5041cf(0x6ac)](_0x1ea9dc),this['drawItemKeyData'](_0x30bb95,_0x34fba0,_0x6202aa,_0x216c9c,![],_0x5041cf(0x5a1)),this[_0x5041cf(0x5a5)](_0xab128b,_0x5f29fc,_0x1b23da),this[_0x5041cf(0x3d6)](),!![];}}},Window_Base[_0x2e9347(0x655)]['drawItemNumber']=function(_0x1ef04b,_0x2becd5,_0x3f5c14,_0x3e112e){const _0x3b4a7c=_0x2e9347;if(this[_0x3b4a7c(0x53d)](_0x1ef04b)){this[_0x3b4a7c(0x3d6)]();const _0x5017f6=VisuMZ[_0x3b4a7c(0x2c2)]['Settings']['ItemScene'],_0x1a96b6=_0x5017f6[_0x3b4a7c(0x6b3)],_0x50808a=_0x1a96b6['format']($gameParty[_0x3b4a7c(0x187)](_0x1ef04b));this['contents'][_0x3b4a7c(0x1ee)]=_0x5017f6['ItemQuantityFontSize'],this[_0x3b4a7c(0x1a1)](_0x50808a,_0x2becd5,_0x3f5c14,_0x3e112e,_0x3b4a7c(0x5a1)),this['resetFontSettings']();}},Window_Base[_0x2e9347(0x655)][_0x2e9347(0x53d)]=function(_0x2f1ef8){const _0x22ff50=_0x2e9347;if(DataManager[_0x22ff50(0x3f1)](_0x2f1ef8))return $dataSystem['optKeyItemsNumber'];return!![];},Window_Base[_0x2e9347(0x655)][_0x2e9347(0x5a5)]=function(_0x35062c,_0x27721e,_0x19b9a2,_0x3943c8,_0x20f5ec){const _0x4a8fa7=_0x2e9347;_0x20f5ec=Math[_0x4a8fa7(0x539)](_0x20f5ec||0x1,0x1);while(_0x20f5ec--){_0x3943c8=_0x3943c8||this['lineHeight'](),this[_0x4a8fa7(0x2a2)][_0x4a8fa7(0x3a8)]=0xa0;const _0x228215=ColorManager[_0x4a8fa7(0x540)]();this[_0x4a8fa7(0x2a2)][_0x4a8fa7(0x411)](_0x35062c+0x1,_0x27721e+0x1,_0x19b9a2-0x2,_0x3943c8-0x2,_0x228215),this[_0x4a8fa7(0x2a2)][_0x4a8fa7(0x3a8)]=0xff;}},VisuMZ[_0x2e9347(0x2c2)]['Window_Selectable_initialize']=Window_Selectable[_0x2e9347(0x655)][_0x2e9347(0x1b1)],Window_Selectable['prototype']['initialize']=function(_0x1b54b4){const _0x169439=_0x2e9347;this[_0x169439(0x617)](),VisuMZ[_0x169439(0x2c2)][_0x169439(0x558)][_0x169439(0x51f)](this,_0x1b54b4);},Window_Selectable['prototype'][_0x2e9347(0x617)]=function(){const _0x2e15db=_0x2e9347;this['_newLabelSprites']={},this['_newLabelOpacity']=0xff,this[_0x2e15db(0x481)]=VisuMZ[_0x2e15db(0x2c2)][_0x2e15db(0x20a)][_0x2e15db(0x674)]['FadeSpeed'],this[_0x2e15db(0x55d)]=VisuMZ['ItemsEquipsCore'][_0x2e15db(0x20a)][_0x2e15db(0x674)][_0x2e15db(0x55a)];},Window_Selectable[_0x2e9347(0x655)][_0x2e9347(0x2f4)]=function(){return![];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x2d6)]=Window_Selectable[_0x2e9347(0x655)][_0x2e9347(0x5fc)],Window_Selectable[_0x2e9347(0x655)]['setHelpWindowItem']=function(_0x30db42){const _0x47cad5=_0x2e9347;VisuMZ[_0x47cad5(0x2c2)][_0x47cad5(0x2d6)][_0x47cad5(0x51f)](this,_0x30db42);if(this['isShowNew']())this['clearNewLabelFromItem'](_0x30db42);},Window_Selectable['prototype'][_0x2e9347(0x675)]=function(_0x30f4ea){const _0x47c53c=_0x2e9347;if(!_0x30f4ea)return;$gameParty['clearNewItem'](_0x30f4ea);let _0x11090d='';if(DataManager['isItem'](_0x30f4ea))_0x47c53c(0x271)===_0x47c53c(0x271)?_0x11090d='item-%1'['format'](_0x30f4ea['id']):_0x39a846=_0x450891[_0x47c53c(0x193)];else{if(DataManager[_0x47c53c(0x514)](_0x30f4ea))_0x11090d='weapon-%1'[_0x47c53c(0x410)](_0x30f4ea['id']);else{if(DataManager[_0x47c53c(0x392)](_0x30f4ea)){if(_0x47c53c(0x2c9)===_0x47c53c(0x522))return this[_0x47c53c(0x43e)]()?this[_0x47c53c(0x1c0)]():_0x520e89['ItemsEquipsCore'][_0x47c53c(0x41a)][_0x47c53c(0x51f)](this);else _0x11090d=_0x47c53c(0x368)[_0x47c53c(0x410)](_0x30f4ea['id']);}else return;}}const _0x59d8e3=this[_0x47c53c(0x52f)][_0x11090d];if(_0x59d8e3)_0x59d8e3['hide']();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x3e6)]=Window_Selectable[_0x2e9347(0x655)]['refresh'],Window_Selectable[_0x2e9347(0x655)]['refresh']=function(){const _0x436e1b=_0x2e9347;this[_0x436e1b(0x35f)](),VisuMZ['ItemsEquipsCore']['Window_Selectable_refresh']['call'](this);},Window_Selectable[_0x2e9347(0x655)]['hideNewLabelSprites']=function(){const _0x36a631=_0x2e9347;for(const _0x4a568d of Object[_0x36a631(0x452)](this[_0x36a631(0x52f)])){if(_0x36a631(0x1c7)==='DVeLm')_0x4a568d['hide']();else return _0xa566c[_0x36a631(0x2c2)][_0x36a631(0x20a)]['Categories'][_0x36a631(0x41b)];}},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x5c4)]=Window_Selectable[_0x2e9347(0x655)][_0x2e9347(0x4ce)],Window_Selectable[_0x2e9347(0x655)][_0x2e9347(0x4ce)]=function(){const _0x4841a2=_0x2e9347;this['updateNewLabelOpacity'](),VisuMZ[_0x4841a2(0x2c2)][_0x4841a2(0x5c4)][_0x4841a2(0x51f)](this);},Window_Selectable[_0x2e9347(0x655)][_0x2e9347(0x3f6)]=function(){const _0xab248a=_0x2e9347;if(!this[_0xab248a(0x2f4)]())return;const _0x373844=this[_0xab248a(0x55d)];this[_0xab248a(0x374)]+=this[_0xab248a(0x481)];if(this[_0xab248a(0x374)]>=_0x373844||this[_0xab248a(0x374)]<=0x0){if('VBUZf'!=='VBUZf'){let _0x48ae98=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];return _0x1c632d[_0xab248a(0x206)]&&(_0x48ae98=_0x4b3e98[_0xab248a(0x378)][_0xab248a(0x20a)][_0xab248a(0x195)]['ExtDisplayedParams']),_0x48ae98=_0x48ae98['map'](_0x4060f4=>typeof _0x4060f4===_0xab248a(0x171)?_0x4060f4:_0x4060f4['toUpperCase']()[_0xab248a(0x515)]()),_0x48ae98;}else this[_0xab248a(0x481)]*=-0x1;}this['_newLabelOpacity']=this[_0xab248a(0x374)]['clamp'](0x0,_0x373844);for(const _0x51ac6f of Object['values'](this[_0xab248a(0x52f)])){_0x51ac6f[_0xab248a(0x373)]=this[_0xab248a(0x374)];}},Window_Selectable['prototype'][_0x2e9347(0x2bb)]=function(_0x30f0ec){const _0x517a22=_0x2e9347,_0x52bfbf=this[_0x517a22(0x52f)];if(_0x52bfbf[_0x30f0ec])return _0x517a22(0x324)!=='zhmPc'?_0x52bfbf[_0x30f0ec]:_0x5cd20a[_0x517a22(0x185)]&&_0x23e9e1[_0x517a22(0x252)][_0x517a22(0x5e8)]('['+_0x4c4cf9+']');else{const _0x294848=new Sprite_NewLabel();return _0x52bfbf[_0x30f0ec]=_0x294848,this[_0x517a22(0x521)](_0x294848),_0x294848;}},Window_Selectable[_0x2e9347(0x655)]['placeNewLabel']=function(_0xd8c6e5,_0x4802f5,_0x547d47){const _0x7a3765=_0x2e9347;let _0x4f6af6='';if(DataManager[_0x7a3765(0x207)](_0xd8c6e5))_0x4f6af6='item-%1'[_0x7a3765(0x410)](_0xd8c6e5['id']);else{if(DataManager['isWeapon'](_0xd8c6e5)){if(_0x7a3765(0x445)!==_0x7a3765(0x445)){const _0x5f147e=_0x39d3ad(_0x426829['$1'])['split'](',')['map'](_0x2ef0b4=>_0x21dc5a(_0x2ef0b4));if(_0x5f147e[_0x7a3765(0x151)](_0x5708d7=>!_0x2bb6f6[_0x7a3765(0x334)](_0x5708d7)))return![];}else _0x4f6af6=_0x7a3765(0x33f)['format'](_0xd8c6e5['id']);}else{if(DataManager[_0x7a3765(0x392)](_0xd8c6e5)){if('lWHsd'==='lWHsd')_0x4f6af6=_0x7a3765(0x368)[_0x7a3765(0x410)](_0xd8c6e5['id']);else return _0x49fe70[_0x7a3765(0x2c2)][_0x7a3765(0x20a)][_0x7a3765(0x375)][_0x7a3765(0x563)];}else{if(_0x7a3765(0x6b5)==='YuHoY')return this[_0x7a3765(0x424)]()?![]:_0x13cb7e['prototype'][_0x7a3765(0x645)][_0x7a3765(0x51f)](this);else return;}}}const _0x12d8e0=this[_0x7a3765(0x2bb)](_0x4f6af6);_0x12d8e0['move'](_0x4802f5,_0x547d47),_0x12d8e0[_0x7a3765(0x3a1)](),_0x12d8e0[_0x7a3765(0x373)]=this[_0x7a3765(0x374)];},Window_ItemCategory[_0x2e9347(0x572)]=VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x20a)][_0x2e9347(0x28b)][_0x2e9347(0x594)],Window_ItemCategory[_0x2e9347(0x2a1)]=['HiddenItemA',_0x2e9347(0x595),_0x2e9347(0x249),_0x2e9347(0x53a),_0x2e9347(0x24a),_0x2e9347(0x3cc),_0x2e9347(0x64b),'NeverUsable'],VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x421)]=Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x1b1)],Window_ItemCategory[_0x2e9347(0x655)]['initialize']=function(_0x40f26f){const _0x408b21=_0x2e9347;VisuMZ[_0x408b21(0x2c2)][_0x408b21(0x421)][_0x408b21(0x51f)](this,_0x40f26f),this[_0x408b21(0x694)](_0x40f26f);},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x694)]=function(_0x3d5489){const _0x4cf6c9=_0x2e9347,_0x3a162e=new Rectangle(0x0,0x0,_0x3d5489[_0x4cf6c9(0x21b)],_0x3d5489['height']);this[_0x4cf6c9(0x1d7)]=new Window_Base(_0x3a162e),this['_categoryNameWindow'][_0x4cf6c9(0x373)]=0x0,this[_0x4cf6c9(0x430)](this[_0x4cf6c9(0x1d7)]),this[_0x4cf6c9(0x5c9)]();},Window_ItemCategory['prototype']['isUseModernControls']=function(){const _0x5fea3a=_0x2e9347;return Imported[_0x5fea3a(0x206)]&&Window_HorzCommand['prototype'][_0x5fea3a(0x424)]['call'](this);},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x687)]=function(){},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x2f0)]=function(){const _0x2983a1=_0x2e9347;if(!this[_0x2983a1(0x424)]())Window_HorzCommand[_0x2983a1(0x655)][_0x2983a1(0x2f0)][_0x2983a1(0x51f)](this);},Window_ItemCategory['prototype'][_0x2e9347(0x58d)]=function(){const _0x729a2b=_0x2e9347;return this[_0x729a2b(0x2ae)]?this[_0x729a2b(0x361)]():0x4;},Window_ItemCategory[_0x2e9347(0x655)]['update']=function(){const _0xc75e99=_0x2e9347;Window_HorzCommand['prototype']['update'][_0xc75e99(0x51f)](this);if(this[_0xc75e99(0x1d1)]){if(_0xc75e99(0x629)!==_0xc75e99(0x629)){_0x1561a5=_0x556b3a||this[_0xc75e99(0x35e)](),this[_0xc75e99(0x2a2)][_0xc75e99(0x3a8)]=0xa0;const _0x5a7159=_0x6f86d2['getItemsEquipsCoreBackColor1']();this[_0xc75e99(0x2a2)][_0xc75e99(0x411)](_0x30eee4+0x1,_0x141c6d+0x1,_0x4678df-0x2,_0x37378f-0x2,_0x5a7159),this[_0xc75e99(0x2a2)][_0xc75e99(0x3a8)]=0xff;}else this['_itemWindow'][_0xc75e99(0x50a)](this['currentExt']());}},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x37f)]=function(){const _0x5a2357=_0x2e9347;if(this['isCursorMovable']()){const _0x104ddb=this['index']();if(this[_0x5a2357(0x1d1)]&&this['_itemWindow'][_0x5a2357(0x58d)]()<=0x1){if(_0x5a2357(0x242)===_0x5a2357(0x242)){if(Input['isRepeated'](_0x5a2357(0x5a1))){if(_0x5a2357(0x2eb)===_0x5a2357(0x2eb))this[_0x5a2357(0x31a)](Input[_0x5a2357(0x4c1)]('right'));else{if(this[_0x5a2357(0x1df)](_0x4f51c5))this['changeEquip'](_0x39b29f,null);}}Input[_0x5a2357(0x350)](_0x5a2357(0x6af))&&this[_0x5a2357(0x360)](Input['isTriggered'](_0x5a2357(0x6af)));}else{if(this[_0x5a2357(0x53d)](_0x4a647b)){this[_0x5a2357(0x3d6)]();const _0x20fd37=_0x277a82['ItemsEquipsCore']['Settings']['ItemScene'],_0x5d979f=_0x20fd37[_0x5a2357(0x6b3)],_0x1f1e72=_0x5d979f[_0x5a2357(0x410)](_0x41f5bc[_0x5a2357(0x187)](_0x3a9c7c));this[_0x5a2357(0x267)][_0x5a2357(0x1ee)]=_0x20fd37[_0x5a2357(0x603)],this['drawText'](_0x1f1e72,_0x91b103,_0x14c1f7,_0x3f87fe,_0x5a2357(0x5a1)),this['resetFontSettings']();}}}else{if(this['_itemWindow']&&this['_itemWindow'][_0x5a2357(0x58d)]()>0x1){if(_0x5a2357(0x1af)!==_0x5a2357(0x308))Input[_0x5a2357(0x350)](_0x5a2357(0x56d))&&!Input[_0x5a2357(0x49d)](_0x5a2357(0x1da))&&this[_0x5a2357(0x31a)](Input[_0x5a2357(0x4c1)](_0x5a2357(0x56d))),Input['isRepeated'](_0x5a2357(0x583))&&!Input[_0x5a2357(0x49d)]('shift')&&(_0x5a2357(0x160)===_0x5a2357(0x5c8)?(_0x549c45[_0x5a2357(0x2c2)]['Window_ItemList_updateHelp']['call'](this),this['_statusWindow']&&this['_statusWindow']['constructor']===_0x459b81&&this['_statusWindow'][_0x5a2357(0x379)](this[_0x5a2357(0x343)]())):this[_0x5a2357(0x360)](Input[_0x5a2357(0x4c1)](_0x5a2357(0x583))));else{_0x266a08+=0x1;if(_0x16b855['note']['match'](_0x1fec57)){const _0x252c11=_0x5be817(_0x34b3d4['$1'])||0x1;if(_0x1f4c18>=_0x252c11)return!![];}if(_0x531f75[_0x5a2357(0x2c0)][_0x5a2357(0x1f9)](_0x53b489)){const _0x1d9e56=_0x431fc3(_0x3ee952['$1'])||0x1;if(_0x1847cd>=_0x1d9e56)return!![];}}}}this[_0x5a2357(0x42f)]()!==_0x104ddb&&(_0x5a2357(0x5f9)===_0x5a2357(0x5f9)?this[_0x5a2357(0x553)]():this[_0x5a2357(0x53b)](_0x3d3971,_0x4d72b9['x'],_0x4d7e23['y'],_0x182bce));}},Window_ItemCategory[_0x2e9347(0x655)]['processHandling']=function(){const _0x117065=_0x2e9347;if(this[_0x117065(0x424)]())return;Window_HorzCommand[_0x117065(0x655)][_0x117065(0x55c)][_0x117065(0x51f)](this);},Window_ItemCategory[_0x2e9347(0x655)]['isHoverEnabled']=function(){const _0x563254=_0x2e9347;return this[_0x563254(0x424)]()?![]:Window_HorzCommand[_0x563254(0x655)][_0x563254(0x645)][_0x563254(0x51f)](this);},Window_ItemCategory['prototype'][_0x2e9347(0x4c6)]=function(){const _0x48c1f8=_0x2e9347;if(this['isOpenAndActive']()){if(TouchInput[_0x48c1f8(0x4c1)]()){if(_0x48c1f8(0x41f)===_0x48c1f8(0x564)){this[_0x48c1f8(0x237)]=!![];const _0x454ada=_0xe89b8b[_0x48c1f8(0x2c2)]['paramJS'][_0x12555f][_0x48c1f8(0x51f)](this,_0x732ade,_0x3d80d2);return this[_0x48c1f8(0x237)]=![],_0x454ada;}else this['onTouchSelect'](!![]);}if(TouchInput['isClicked']()){if(_0x48c1f8(0x61d)===_0x48c1f8(0x61d))this[_0x48c1f8(0x370)]();else return this['partyArtifacts']()['concat'](this[_0x48c1f8(0x511)]());}else TouchInput[_0x48c1f8(0x174)]()&&this[_0x48c1f8(0x4c5)]();}},Window_ItemCategory[_0x2e9347(0x655)]['onTouchSelect']=function(_0x5e441f){const _0x3e36fb=_0x2e9347;this['isUseModernControls']()?this[_0x3e36fb(0x469)](!![]):Window_HorzCommand[_0x3e36fb(0x655)][_0x3e36fb(0x381)][_0x3e36fb(0x51f)](this,_0x5e441f);},Window_ItemCategory[_0x2e9347(0x655)]['onTouchSelectModern']=function(_0x2902d2){const _0x2b30b6=_0x2e9347;this[_0x2b30b6(0x699)]=![];if(this[_0x2b30b6(0x4d6)]()){const _0x43c9bf=this[_0x2b30b6(0x42f)](),_0x2af7db=this[_0x2b30b6(0x30c)]();_0x2af7db>=0x0&&_0x2af7db!==this[_0x2b30b6(0x42f)]()&&(_0x2b30b6(0x37e)!=='OKnYV'?_0x149da6=_0x2b30b6(0x368)[_0x2b30b6(0x410)](_0x411b42['id']):this['select'](_0x2af7db)),_0x2902d2&&this[_0x2b30b6(0x42f)]()!==_0x43c9bf&&this[_0x2b30b6(0x553)]();}},Window_ItemCategory['prototype'][_0x2e9347(0x211)]=function(){const _0x1d0bd0=_0x2e9347;this[_0x1d0bd0(0x671)](),this[_0x1d0bd0(0x5f8)](this[_0x1d0bd0(0x42f)]());},Window_ItemCategory[_0x2e9347(0x655)]['addItemCategories']=function(){const _0x21c8b5=_0x2e9347;for(const _0xb48601 of Window_ItemCategory[_0x21c8b5(0x572)]){if('FxGRC'==='sEohx'){const _0x3f56d4=/^\d+$/[_0x21c8b5(0x1bc)](_0x31b5c5);_0x3f56d4?_0x5d43f2[_0x21c8b5(0x4bd)](_0x4d8377(_0x379d03)):_0xef8795['push'](_0x152c8d['getClassIdWithName'](_0xada8fd));}else this[_0x21c8b5(0x3d5)](_0xb48601);}},Window_ItemCategory['prototype'][_0x2e9347(0x3d5)]=function(_0x2b59c9){const _0x1be370=_0x2e9347,_0xe18585=_0x2b59c9[_0x1be370(0x17e)],_0x452af2=_0x2b59c9[_0x1be370(0x69a)],_0x14e878=_0x2b59c9[_0x1be370(0x5b2)]||0x0;if(_0x14e878>0x0&&!$gameSwitches[_0x1be370(0x334)](_0x14e878))return;let _0x4720e0='',_0x2d747d=_0x1be370(0x199),_0x4e6482=_0xe18585;if(_0xe18585['match'](/Category:(.*)/i))_0x1be370(0x31e)===_0x1be370(0x31e)?_0x4720e0=String(RegExp['$1'])[_0x1be370(0x515)]():(_0x3a5dee(_0x1be370(0x5f2)['format'](_0x51eded,_0x351b47)),_0xb4f534['exit']());else{if(Window_ItemCategory[_0x1be370(0x2a1)]['includes'](_0xe18585)){if(_0x1be370(0x5ce)!==_0x1be370(0x5ce)){if(this[_0x1be370(0x451)]())return _0x3357b7['getInputButtonString'](_0x1be370(0x1da));return _0x16dfff['prototype'][_0x1be370(0x633)]['call'](this);}else _0x4720e0=VisuMZ['ItemsEquipsCore']['Settings']['Categories'][_0xe18585];}else{if(['AllItems',_0x1be370(0x4e1)][_0x1be370(0x5e8)](_0xe18585))_0x4720e0=TextManager[_0x1be370(0x343)];else{if(_0xe18585===_0x1be370(0x2a6))_0x4720e0=TextManager['keyItem'];else{if(_0xe18585===_0x1be370(0x33b))_0x4720e0=TextManager[_0x1be370(0x193)];else{if(_0xe18585==='AllArmors')_0x4720e0=TextManager[_0x1be370(0x670)];else{if(_0xe18585['match'](/WTYPE:(\d+)/i))_0x4720e0=$dataSystem[_0x1be370(0x1ea)][Number(RegExp['$1'])]||'';else{if(_0xe18585[_0x1be370(0x1f9)](/ATYPE:(\d+)/i))_0x1be370(0x3ed)===_0x1be370(0x3ed)?_0x4720e0=$dataSystem[_0x1be370(0x221)][Number(RegExp['$1'])]||'':this['_sellWindow']['setStatusWindow'](this[_0x1be370(0x315)]);else _0xe18585[_0x1be370(0x1f9)](/ETYPE:(\d+)/i)&&(_0x4720e0=$dataSystem[_0x1be370(0x313)][Number(RegExp['$1'])]||'');}}}}}}}_0x452af2>0x0&&this[_0x1be370(0x41c)]()!==_0x1be370(0x1f4)&&(_0x4720e0=_0x1be370(0x5e9)[_0x1be370(0x410)](_0x452af2,_0x4720e0)),this[_0x1be370(0x234)](_0x4720e0,_0x2d747d,!![],_0x4e6482);},Window_ItemCategory['prototype'][_0x2e9347(0x1a0)]=function(){const _0xa31318=_0x2e9347;return VisuMZ[_0xa31318(0x2c2)][_0xa31318(0x20a)]['Categories'][_0xa31318(0x41b)];},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x597)]=function(_0x442f39){const _0x5aa7fc=_0x2e9347,_0x4fb5b8=this[_0x5aa7fc(0x1e0)](_0x442f39);if(_0x4fb5b8===_0x5aa7fc(0x18a))this[_0x5aa7fc(0x4a4)](_0x442f39);else{if(_0x4fb5b8==='icon'){if('qJhKB'===_0x5aa7fc(0x590))return _0x5aa7fc(0x40d)[_0x5aa7fc(0x410)](_0x2143d3(_0x3f8f65['$1']));else this[_0x5aa7fc(0x65a)](_0x442f39);}else{if('CBKzL'===_0x5aa7fc(0x159))Window_HorzCommand['prototype']['drawItem']['call'](this,_0x442f39);else return;}}},Window_ItemCategory['prototype'][_0x2e9347(0x41c)]=function(){const _0x1dabef=_0x2e9347;return VisuMZ['ItemsEquipsCore'][_0x1dabef(0x20a)][_0x1dabef(0x28b)][_0x1dabef(0x4f5)];},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x1e0)]=function(_0x19915a){const _0x567032=_0x2e9347;if(_0x19915a<0x0)return'text';const _0x2b7b81=this['categoryStyle']();if(_0x2b7b81!==_0x567032(0x38a))return _0x2b7b81;else{if(_0x567032(0x1f3)===_0x567032(0x546))_0x275e3e[_0x567032(0x2c2)]['Scene_Shop_onCategoryCancel']['call'](this),this[_0x567032(0x43e)]()&&this[_0x567032(0x356)]();else{const _0x2dd69c=this[_0x567032(0x407)](_0x19915a);if(_0x2dd69c['match'](/\\I\[(\d+)\]/i)){const _0x54eef3=this[_0x567032(0x67f)](_0x19915a),_0x4b86b3=this[_0x567032(0x282)](_0x2dd69c)[_0x567032(0x21b)];return _0x4b86b3<=_0x54eef3['width']?_0x567032(0x18a):_0x567032(0x4e2)==='bAxhk'?'icon':_0x1a4169(_0x22bb0b['$1']);}else return _0x567032(0x1f4);}}},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x4a4)]=function(_0x2608e7){const _0x40866f=_0x2e9347,_0x47d771=this[_0x40866f(0x67f)](_0x2608e7),_0x3bb5e0=this[_0x40866f(0x407)](_0x2608e7),_0x57235f=this[_0x40866f(0x282)](_0x3bb5e0)[_0x40866f(0x21b)];this['changePaintOpacity'](this[_0x40866f(0x492)](_0x2608e7));const _0xc04ecc=this['itemTextAlign']();if(_0xc04ecc===_0x40866f(0x5a1)){if(_0x40866f(0x599)===_0x40866f(0x599))this[_0x40866f(0x53b)](_0x3bb5e0,_0x47d771['x']+_0x47d771[_0x40866f(0x21b)]-_0x57235f,_0x47d771['y'],_0x57235f);else{const _0x1e1d99=_0x40866f(0x3d4);if(this[_0x40866f(0x4ee)][_0x1e1d99])return this['_customItemInfo'][_0x1e1d99];let _0x33f284='';return _0x33f284+='%1'[_0x40866f(0x410)](this['_itemData'][_0x40866f(0x29b)]),_0x33f284;}}else{if(_0xc04ecc==='center'){if(_0x40866f(0x2b2)!==_0x40866f(0x1d2)){const _0x35c407=_0x47d771['x']+Math[_0x40866f(0x1fc)]((_0x47d771[_0x40866f(0x21b)]-_0x57235f)/0x2);this[_0x40866f(0x53b)](_0x3bb5e0,_0x35c407,_0x47d771['y'],_0x57235f);}else _0x4790ab=_0x473624[_0x40866f(0x313)][_0x1c515f(_0x1f9986['$1'])]||'';}else this[_0x40866f(0x53b)](_0x3bb5e0,_0x47d771['x'],_0x47d771['y'],_0x57235f);}},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x65a)]=function(_0x114b07){const _0x14fc4e=_0x2e9347,_0x4a706f=this[_0x14fc4e(0x407)](_0x114b07);if(_0x4a706f[_0x14fc4e(0x1f9)](/\\I\[(\d+)\]/i)){if(_0x14fc4e(0x6b0)==='JUbhk')return _0x3ea1ef['getInputMultiButtonStrings']('left',_0x14fc4e(0x5a1));else{const _0x549d6b=Number(RegExp['$1'])||0x0,_0x22a7e1=this['itemLineRect'](_0x114b07),_0x155930=_0x22a7e1['x']+Math[_0x14fc4e(0x1fc)]((_0x22a7e1['width']-ImageManager[_0x14fc4e(0x66a)])/0x2),_0xbd1d86=_0x22a7e1['y']+(_0x22a7e1[_0x14fc4e(0x23d)]-ImageManager['iconHeight'])/0x2;this[_0x14fc4e(0x262)](_0x549d6b,_0x155930,_0xbd1d86);}}},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x57a)]=Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x2a9)],Window_ItemCategory[_0x2e9347(0x655)]['setItemWindow']=function(_0x5a9e46){const _0x138a47=_0x2e9347;VisuMZ[_0x138a47(0x2c2)][_0x138a47(0x57a)][_0x138a47(0x51f)](this,_0x5a9e46),_0x5a9e46[_0x138a47(0x4f6)]=this;},Window_ItemCategory['prototype'][_0x2e9347(0x44b)]=function(){const _0x3b557f=_0x2e9347;Window_HorzCommand['prototype']['callUpdateHelp']['call'](this);if(this['_categoryNameWindow'])this[_0x3b557f(0x5c9)]();},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x5c9)]=function(){const _0x876f7=_0x2e9347,_0x7b22b=this['_categoryNameWindow'];_0x7b22b[_0x876f7(0x267)]['clear']();const _0x135abe=this['categoryStyleCheck'](this[_0x876f7(0x42f)]());if(_0x135abe===_0x876f7(0x23e)){const _0x31182b=this[_0x876f7(0x67f)](this[_0x876f7(0x42f)]());let _0x102d2c=this[_0x876f7(0x407)](this[_0x876f7(0x42f)]());_0x102d2c=_0x102d2c[_0x876f7(0x255)](/\\I\[(\d+)\]/gi,''),_0x7b22b['resetFontSettings'](),this[_0x876f7(0x3e2)](_0x102d2c,_0x31182b),this[_0x876f7(0x4a0)](_0x102d2c,_0x31182b),this[_0x876f7(0x3aa)](_0x102d2c,_0x31182b);}},Window_ItemCategory[_0x2e9347(0x655)]['categoryNameWindowDrawBackground']=function(_0x1919b9,_0x5d0daf){},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x4a0)]=function(_0x54726c,_0x14561b){const _0x4cee92=_0x2e9347,_0x4192cf=this['_categoryNameWindow'];_0x4192cf['drawText'](_0x54726c,0x0,_0x14561b['y'],_0x4192cf[_0x4cee92(0x225)],_0x4cee92(0x5a6));},Window_ItemCategory[_0x2e9347(0x655)][_0x2e9347(0x3aa)]=function(_0x2e5973,_0x5da4af){const _0x414bdb=_0x2e9347,_0x23b419=this[_0x414bdb(0x1d7)],_0x2b09c6=$gameSystem['windowPadding'](),_0x55129d=_0x5da4af['x']+Math[_0x414bdb(0x1fc)](_0x5da4af['width']/0x2)+_0x2b09c6;_0x23b419['x']=_0x23b419[_0x414bdb(0x21b)]/-0x2+_0x55129d,_0x23b419['y']=Math['floor'](_0x5da4af[_0x414bdb(0x23d)]/0x2);},Window_ItemList['prototype']['processCursorMoveModernControls']=function(){const _0x28b626=_0x2e9347;if(this[_0x28b626(0x4d6)]()){if('fqDAE'===_0x28b626(0x312)){const _0x201e6d=this[_0x28b626(0x42f)]();if(this[_0x28b626(0x58d)]()<=0x1){!this[_0x28b626(0x5d4)](_0x28b626(0x56d))&&Input['isTriggered'](_0x28b626(0x56d))&&this[_0x28b626(0x1fa)]();if(!this[_0x28b626(0x5d4)](_0x28b626(0x583))&&Input[_0x28b626(0x4c1)](_0x28b626(0x583))){if(_0x28b626(0x291)==='OKhCJ')this[_0x28b626(0x56e)]();else{const _0x5e99af=_0x265568(_0x4209ea['$1'])*0.01;if(_0x3b1245[_0x28b626(0x27e)]()<_0x5e99af)return;}}}else{if(this[_0x28b626(0x58d)]()>0x1){Input[_0x28b626(0x350)](_0x28b626(0x5a1))&&this[_0x28b626(0x31a)](Input[_0x28b626(0x4c1)](_0x28b626(0x5a1)));Input[_0x28b626(0x350)](_0x28b626(0x6af))&&this[_0x28b626(0x360)](Input['isTriggered'](_0x28b626(0x6af)));if(this[_0x28b626(0x48a)]())_0x28b626(0x1bf)!==_0x28b626(0x1bf)?_0x2195b2=_0x28b626(0x5ac)['format'](_0x4932e3['id']):(Input[_0x28b626(0x4c1)](_0x28b626(0x56d))&&Input['isPressed'](_0x28b626(0x1da))&&this[_0x28b626(0x1fa)](),Input[_0x28b626(0x4c1)](_0x28b626(0x583))&&Input[_0x28b626(0x49d)](_0x28b626(0x1da))&&this[_0x28b626(0x56e)]());else{if('UXuNE'===_0x28b626(0x2bf))return _0x1cbe26[_0x28b626(0x655)][_0x28b626(0x503)]['call'](this,_0x1a9645);else Input[_0x28b626(0x4c1)](_0x28b626(0x56d))&&(_0x28b626(0x188)===_0x28b626(0x2c5)?(this[_0x28b626(0x35f)](),_0x319cf5[_0x28b626(0x2c2)][_0x28b626(0x3e6)]['call'](this)):this[_0x28b626(0x1fa)]()),Input[_0x28b626(0x4c1)](_0x28b626(0x583))&&this[_0x28b626(0x56e)]();}}}Input[_0x28b626(0x350)](_0x28b626(0x1a9))&&(Input[_0x28b626(0x49d)](_0x28b626(0x1da))&&this[_0x28b626(0x25a)]()?this['cursorPagedown']():this[_0x28b626(0x18b)](Input[_0x28b626(0x4c1)](_0x28b626(0x1a9))));Input[_0x28b626(0x350)]('up')&&(Input[_0x28b626(0x49d)](_0x28b626(0x1da))&&this[_0x28b626(0x25a)]()?this['cursorPageup']():this[_0x28b626(0x21d)](Input[_0x28b626(0x4c1)]('up')));if(Imported[_0x28b626(0x206)]){if(_0x28b626(0x25e)===_0x28b626(0x25e))this[_0x28b626(0x687)]();else return _0x5cf494['ItemsEquipsCore'][_0x28b626(0x5f4)][_0x28b626(0x51f)](this);}this[_0x28b626(0x42f)]()!==_0x201e6d&&this['playCursorSound']();}else{this['drawItemDarkRect'](_0x2f44c0,_0x58fc95,_0x4eec18,_0x6c9a26);for(let _0x2786f6=0x0;_0x2786f6<_0x370a70;_0x2786f6++){const _0x4f3919=_0x4cd2fc+_0x3e39cc+_0x2786f6*_0x53ed82;this[_0x28b626(0x5a5)](_0x4f3919,_0xc24a08,_0x4423ce,_0x2a6bca);}_0x209bde+=_0x25b48e;}}},Window_ItemList['prototype'][_0x2e9347(0x48a)]=function(){const _0xad44a9=_0x2e9347,_0x14385c=SceneManager[_0xad44a9(0x1c8)],_0x4ac94a=[Scene_Item,Scene_Shop];return _0x4ac94a['includes'](_0x14385c[_0xad44a9(0x654)]);},Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x468)]=function(){const _0x3114e=_0x2e9347;Window_Selectable[_0x3114e(0x655)]['activate']['call'](this),this[_0x3114e(0x4f6)]&&this[_0x3114e(0x4f6)]['isUseModernControls']()&&(_0x3114e(0x4b3)!=='EjaXv'?this[_0x3114e(0x4f6)][_0x3114e(0x468)]():_0x3dca94=_0x76774e+_0x44c70f[_0x3114e(0x1fc)]((_0x3dfb01-_0x942f2e['width'])/0x2));},Window_ItemList[_0x2e9347(0x655)]['deactivate']=function(){const _0x870b11=_0x2e9347;Window_Selectable[_0x870b11(0x655)][_0x870b11(0x5bf)][_0x870b11(0x51f)](this),this[_0x870b11(0x4f6)]&&this['_categoryWindow'][_0x870b11(0x424)]()&&(_0x870b11(0x554)===_0x870b11(0x29c)?this['drawItemStyleIcon'](_0x3b7500):this[_0x870b11(0x4f6)][_0x870b11(0x5bf)]());},Window_ItemList['prototype'][_0x2e9347(0x50a)]=function(_0x4c45a1){const _0x6d02a5=_0x2e9347;if(this[_0x6d02a5(0x216)]!==_0x4c45a1){if(_0x6d02a5(0x589)!=='hphto'){this[_0x6d02a5(0x216)]=_0x4c45a1,this[_0x6d02a5(0x474)]();if(this[_0x6d02a5(0x4f6)]&&this[_0x6d02a5(0x4f6)][_0x6d02a5(0x424)]())_0x6d02a5(0x58f)===_0x6d02a5(0x651)?(_0x327211[_0x6d02a5(0x2c2)]['ParseArmorNotetags']['call'](this,_0x556c24),_0x365338[_0x6d02a5(0x2c2)][_0x6d02a5(0x2e8)](_0x1921a0,_0x4ec59e)):this['smoothSelect'](0x0);else{if(_0x6d02a5(0x6ad)!==_0x6d02a5(0x58c))this[_0x6d02a5(0x36f)](0x0,0x0);else{if(!_0x19ef98)return _0x3d1bcc;if(!this[_0x6d02a5(0x514)](_0x6a134c)&&!this[_0x6d02a5(0x392)](_0x34f970))return _0x4236fc;if(_0x5e66f0[_0x6d02a5(0x2c0)][_0x6d02a5(0x1f9)](/<PURIFY TRANSFORM:[ ](.*)>/i)){const _0x128fa4=_0x17c6dd(_0x1c183c['$1'])[_0x6d02a5(0x515)](),_0x3c1301=/^\d+$/[_0x6d02a5(0x1bc)](_0x128fa4);if(_0x3c1301){if(this[_0x6d02a5(0x514)](_0x24a930))return _0x5141c4[_0x662b55(_0x128fa4)];if(this[_0x6d02a5(0x392)](_0x602c3d))return _0x47c694[_0x290c4d(_0x128fa4)];}else{if(this[_0x6d02a5(0x514)](_0x22c589))return _0x451d29[this[_0x6d02a5(0x618)](_0x128fa4)];if(this[_0x6d02a5(0x392)](_0x1edc98))return _0x1b4d00[this[_0x6d02a5(0x638)](_0x128fa4)];}}return _0x5ddbfe;}}}else return _0x46ddd1[_0x6d02a5(0x416)];}},VisuMZ[_0x2e9347(0x2c2)]['Window_ItemList_maxCols']=Window_ItemList['prototype']['maxCols'],Window_ItemList[_0x2e9347(0x655)]['maxCols']=function(){const _0x1e4d91=_0x2e9347;if(SceneManager[_0x1e4d91(0x1c8)][_0x1e4d91(0x654)]===Scene_Battle)return VisuMZ['ItemsEquipsCore'][_0x1e4d91(0x5f4)]['call'](this);else return SceneManager['_scene'][_0x1e4d91(0x654)]===Scene_Map?VisuMZ[_0x1e4d91(0x2c2)]['Window_ItemList_maxCols'][_0x1e4d91(0x51f)](this):_0x1e4d91(0x4cc)!=='ScVfw'?_0x305906:VisuMZ[_0x1e4d91(0x2c2)][_0x1e4d91(0x20a)][_0x1e4d91(0x66f)][_0x1e4d91(0x3b8)];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x3ca)]=Window_ItemList['prototype'][_0x2e9347(0x29a)],Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x29a)]=function(){const _0x2c7c19=_0x2e9347;if(this[_0x2c7c19(0x58d)]()<=0x1)return Window_Selectable[_0x2c7c19(0x655)][_0x2c7c19(0x29a)][_0x2c7c19(0x51f)](this);else{if(_0x2c7c19(0x523)===_0x2c7c19(0x523))return VisuMZ[_0x2c7c19(0x2c2)][_0x2c7c19(0x3ca)][_0x2c7c19(0x51f)](this);else{const _0x91764b=this['_categoryWindow']['y']+this[_0x2c7c19(0x4f6)][_0x2c7c19(0x23d)],_0x4924d7=_0x1a1932[_0x2c7c19(0x257)]-this[_0x2c7c19(0x660)](),_0x4094da=this[_0x2c7c19(0x4b7)]()-this[_0x2c7c19(0x4f6)][_0x2c7c19(0x23d)],_0x3352c9=this[_0x2c7c19(0x290)]()?_0x555f7f[_0x2c7c19(0x257)]-_0x4924d7:0x0;return new _0x6ec3ca(_0x3352c9,_0x91764b,_0x4924d7,_0x4094da);}}},Window_ItemList[_0x2e9347(0x655)]['includes']=function(_0x23d2a2){const _0x110c48=_0x2e9347;switch(this['_category']){case'AllItems':return DataManager['isItem'](_0x23d2a2);case _0x110c48(0x4e1):return DataManager['isItem'](_0x23d2a2)&&_0x23d2a2[_0x110c48(0x524)]===0x1;case _0x110c48(0x2a6):return DataManager[_0x110c48(0x207)](_0x23d2a2)&&_0x23d2a2[_0x110c48(0x524)]===0x2;case _0x110c48(0x5d6):return DataManager['isItem'](_0x23d2a2)&&_0x23d2a2[_0x110c48(0x524)]===0x3;case'HiddenItemB':return DataManager[_0x110c48(0x207)](_0x23d2a2)&&_0x23d2a2[_0x110c48(0x524)]===0x4;case _0x110c48(0x53a):return DataManager[_0x110c48(0x207)](_0x23d2a2)&&_0x23d2a2['consumable'];case _0x110c48(0x249):return DataManager[_0x110c48(0x207)](_0x23d2a2)&&!_0x23d2a2['consumable'];case'AlwaysUsable':return DataManager[_0x110c48(0x207)](_0x23d2a2)&&[0x0][_0x110c48(0x5e8)](_0x23d2a2[_0x110c48(0x5ab)]);case _0x110c48(0x3cc):return DataManager[_0x110c48(0x207)](_0x23d2a2)&&[0x0,0x1]['includes'](_0x23d2a2[_0x110c48(0x5ab)]);case _0x110c48(0x64b):return DataManager[_0x110c48(0x207)](_0x23d2a2)&&[0x0,0x2][_0x110c48(0x5e8)](_0x23d2a2['occasion']);case _0x110c48(0x436):return DataManager[_0x110c48(0x207)](_0x23d2a2)&&[0x3]['includes'](_0x23d2a2[_0x110c48(0x5ab)]);case _0x110c48(0x33b):return DataManager[_0x110c48(0x514)](_0x23d2a2);case _0x110c48(0x59e):return DataManager[_0x110c48(0x392)](_0x23d2a2);default:if(this[_0x110c48(0x216)][_0x110c48(0x1f9)](/WTYPE:(\d+)/i)){if(_0x110c48(0x27d)==='FejVU'){const _0x511256=_0x518714?_0x355e74(_0x4b77d4['$1']):_0x43e543[_0x110c48(0x638)](_0x5ef429);return _0x363d05[_0x511256]||_0x389d7e;}else return DataManager[_0x110c48(0x514)](_0x23d2a2)&&_0x23d2a2['wtypeId']===Number(RegExp['$1']);}else{if(this[_0x110c48(0x216)][_0x110c48(0x1f9)](/WTYPE:(.*)/i)){if(_0x110c48(0x37b)===_0x110c48(0x37b)){const _0x1b6973=$dataSystem['weaponTypes'][_0x110c48(0x22f)](String(RegExp['$1'])[_0x110c48(0x515)]());return DataManager[_0x110c48(0x514)](_0x23d2a2)&&_0x23d2a2[_0x110c48(0x53f)]===_0x1b6973;}else{_0x39852f=_0x4e968b;if(!_0x2945c2[_0x5eed8d])return _0x47e4fa;}}else{if(this['_category'][_0x110c48(0x1f9)](/ATYPE:(\d+)/i))return DataManager[_0x110c48(0x392)](_0x23d2a2)&&_0x23d2a2[_0x110c48(0x3e7)]===Number(RegExp['$1']);else{if(this[_0x110c48(0x216)][_0x110c48(0x1f9)](/ATYPE:(.*)/i)){const _0x1dec4c=$dataSystem[_0x110c48(0x221)][_0x110c48(0x22f)](String(RegExp['$1'])[_0x110c48(0x515)]());return DataManager[_0x110c48(0x392)](_0x23d2a2)&&_0x23d2a2['atypeId']===_0x1dec4c;}else{if(this[_0x110c48(0x216)][_0x110c48(0x1f9)](/ETYPE:(\d+)/i)){if(_0x110c48(0x5f6)===_0x110c48(0x5f6))return!!_0x23d2a2&&_0x23d2a2['etypeId']===Number(RegExp['$1']);else{const _0x1052c3='TP\x20RECOVERY';if(this['_itemData'][_0x110c48(0x29b)]<=0x0&&!this[_0x110c48(0x4ee)][_0x1052c3])return![];const _0x103be4=this['getItemEffectsTpRecoveryLabel']();this[_0x110c48(0x608)](_0x103be4,_0x414f19,_0xd83e2d,_0x2267cf,!![]);const _0x4f6c36=this[_0x110c48(0x531)]();return this['changeTextColor'](_0x5516bd[_0x110c48(0x6ab)]()),this[_0x110c48(0x608)](_0x4f6c36,_0x2fbd84,_0x5cba63,_0x1c762f,![],_0x110c48(0x5a1)),this[_0x110c48(0x5a5)](_0x5060ee,_0x327428,_0x1ef1ec),this[_0x110c48(0x3d6)](),!![];}}else{if(this['_category'][_0x110c48(0x1f9)](/ETYPE:(.*)/i)){if(_0x110c48(0x2e1)===_0x110c48(0x2e1)){const _0x35a207=$dataSystem[_0x110c48(0x313)][_0x110c48(0x22f)](String(RegExp['$1'])[_0x110c48(0x515)]());return DataManager[_0x110c48(0x392)](_0x23d2a2)&&_0x23d2a2[_0x110c48(0x15c)]===_0x35a207;}else{const _0x277fba=this[_0x110c48(0x67f)](_0x5d2bfd),_0x740d0c=this[_0x110c48(0x407)](_0x1a57bb),_0x25aea9=this[_0x110c48(0x282)](_0x740d0c)[_0x110c48(0x21b)];this[_0x110c48(0x4f8)](this['isCommandEnabled'](_0x5551c3));const _0x55d246=this[_0x110c48(0x1a0)]();if(_0x55d246===_0x110c48(0x5a1))this['drawTextEx'](_0x740d0c,_0x277fba['x']+_0x277fba['width']-_0x25aea9,_0x277fba['y'],_0x25aea9);else{if(_0x55d246===_0x110c48(0x5a6)){const _0x232dc3=_0x277fba['x']+_0x4817d4['floor']((_0x277fba[_0x110c48(0x21b)]-_0x25aea9)/0x2);this[_0x110c48(0x53b)](_0x740d0c,_0x232dc3,_0x277fba['y'],_0x25aea9);}else this['drawTextEx'](_0x740d0c,_0x277fba['x'],_0x277fba['y'],_0x25aea9);}}}else{if(this[_0x110c48(0x216)][_0x110c48(0x1f9)](/Category:(.*)/i))return!!_0x23d2a2&&_0x23d2a2[_0x110c48(0x6c1)][_0x110c48(0x5e8)](String(RegExp['$1'])['toUpperCase']()['trim']());}}}}}}}return![];},Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x2f4)]=function(){return!![];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x685)]=Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x597)],Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x597)]=function(_0x3eb343){const _0x54a318=_0x2e9347;VisuMZ[_0x54a318(0x2c2)][_0x54a318(0x685)][_0x54a318(0x51f)](this,_0x3eb343),this[_0x54a318(0x619)](_0x3eb343);},Window_ItemList['prototype'][_0x2e9347(0x222)]=function(_0x57eb9d,_0x30abc9,_0x4b5e04,_0x2fce7f){const _0x4acd89=_0x2e9347;Window_Selectable[_0x4acd89(0x655)][_0x4acd89(0x222)][_0x4acd89(0x51f)](this,_0x57eb9d,_0x30abc9,_0x4b5e04,_0x2fce7f);},Window_ItemList['prototype'][_0x2e9347(0x619)]=function(_0x3fefdd){const _0x276eeb=_0x2e9347,_0x2c3aaf=this[_0x276eeb(0x243)](_0x3fefdd);if(!_0x2c3aaf||!this[_0x276eeb(0x2f4)]())return;if(!$gameParty[_0x276eeb(0x40b)](_0x2c3aaf))return;const _0x32f889=this[_0x276eeb(0x67f)](_0x3fefdd),_0x5bd56a=_0x32f889['x'],_0x33b788=_0x32f889['y']+(this[_0x276eeb(0x35e)]()-ImageManager[_0x276eeb(0x231)])/0x2,_0x2195ef=VisuMZ[_0x276eeb(0x2c2)][_0x276eeb(0x20a)][_0x276eeb(0x674)]['OffsetX'],_0x4e166c=VisuMZ[_0x276eeb(0x2c2)][_0x276eeb(0x20a)]['New']['OffsetY'];this[_0x276eeb(0x2f3)](_0x2c3aaf,_0x5bd56a+_0x2195ef,_0x33b788+_0x4e166c);},Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x4c3)]=function(_0x294d13){this['_statusWindow']=_0x294d13,this['callUpdateHelp']();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x2bd)]=Window_ItemList['prototype'][_0x2e9347(0x3c9)],Window_ItemList[_0x2e9347(0x655)][_0x2e9347(0x3c9)]=function(){const _0x133fa1=_0x2e9347;VisuMZ[_0x133fa1(0x2c2)][_0x133fa1(0x2bd)][_0x133fa1(0x51f)](this);if(this[_0x133fa1(0x315)]&&this['_statusWindow'][_0x133fa1(0x654)]===Window_ShopStatus){if(_0x133fa1(0x21c)===_0x133fa1(0x21c))this[_0x133fa1(0x315)][_0x133fa1(0x379)](this[_0x133fa1(0x343)]());else return _0x4309f7[_0x133fa1(0x154)][this['_item'][_0x133fa1(0x17f)][_0x133fa1(0x5d5)]];}},Window_BattleItem['prototype']['isEnabled']=function(_0x589d65){const _0x5c1b03=_0x2e9347;return BattleManager[_0x5c1b03(0x4d7)]()?_0x5c1b03(0x604)===_0x5c1b03(0x604)?BattleManager['actor']()['canUse'](_0x589d65):!![]:Window_ItemList[_0x5c1b03(0x655)][_0x5c1b03(0x503)]['call'](this,_0x589d65);},Window_EventItem[_0x2e9347(0x655)][_0x2e9347(0x2f4)]=function(){return![];},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x43e)]=function(){const _0x46e5e3=_0x2e9347;return VisuMZ[_0x46e5e3(0x2c2)][_0x46e5e3(0x20a)][_0x46e5e3(0x575)][_0x46e5e3(0x48e)];},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x6bf)]=Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x474)],Window_EquipStatus[_0x2e9347(0x655)]['refresh']=function(){const _0xd804ba=_0x2e9347;this[_0xd804ba(0x192)](),this[_0xd804ba(0x3d6)]();if(this[_0xd804ba(0x23c)])this[_0xd804ba(0x23c)]['refresh']();this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0xd804ba(0x36c)]():_0xd804ba(0x304)!==_0xd804ba(0x49a)?VisuMZ['ItemsEquipsCore'][_0xd804ba(0x6bf)][_0xd804ba(0x51f)](this):this['drawIcon'](_0x53ac3e,_0x1a0183['x'],_0x39efab['y']+0x2);},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x36c)]=function(){const _0x3716eb=_0x2e9347;this[_0x3716eb(0x267)][_0x3716eb(0x5c7)]();if(!this[_0x3716eb(0x23c)])return;if(this[_0x3716eb(0x2ea)]()){if(_0x3716eb(0x2b7)!==_0x3716eb(0x58e)){const _0x5992bf=ImageManager['loadPicture'](this[_0x3716eb(0x23c)][_0x3716eb(0x578)]());_0x5992bf[_0x3716eb(0x491)](this['onMenuImageLoad'][_0x3716eb(0x245)](this));}else _0x2fb55d['ItemsEquipsCore']['ParseClassNotetags']['call'](this,_0x489a45),_0x22dd75[_0x3716eb(0x2c2)][_0x3716eb(0x448)](_0x44ad34);}else{if(_0x3716eb(0x22d)==='HRieC')this[_0x3716eb(0x47d)]();else{_0x3d07b+=0x1;if(_0x10ff60['note'][_0x3716eb(0x1f9)](_0x5bc3f9)){const _0x362555=_0x590af0(_0x22cba5['$1'])||0x1;if(_0x369a5e>=_0x362555)return!![];}if(_0xaaec66['note']['match'](_0x2d3022)){const _0x30ef64=_0x484ed0(_0x2e56bf['$1'])||0x1;if(_0x13ed52>=_0x30ef64)return!![];}}}},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x2ea)]=function(){const _0x5aa457=_0x2e9347;return Imported[_0x5aa457(0x52c)]&&this[_0x5aa457(0x23c)][_0x5aa457(0x578)]()!==''&&VisuMZ['ItemsEquipsCore'][_0x5aa457(0x20a)][_0x5aa457(0x575)]['MenuPortraits'];},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x189)]=function(){const _0x5454dd=_0x2e9347;VisuMZ[_0x5454dd(0x2c2)][_0x5454dd(0x20a)][_0x5454dd(0x575)][_0x5454dd(0x1a8)][_0x5454dd(0x51f)](this),this[_0x5454dd(0x24b)]();},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x47d)]=function(){const _0x354905=_0x2e9347;VisuMZ[_0x354905(0x2c2)][_0x354905(0x20a)]['EquipScene'][_0x354905(0x65d)][_0x354905(0x51f)](this),this[_0x354905(0x24b)]();},Window_EquipStatus['prototype'][_0x2e9347(0x24b)]=function(){const _0x4bbd50=_0x2e9347;this['resetFontSettings'](),VisuMZ[_0x4bbd50(0x2c2)]['Settings'][_0x4bbd50(0x575)][_0x4bbd50(0x54e)][_0x4bbd50(0x51f)](this);},Window_EquipStatus['prototype'][_0x2e9347(0x659)]=function(_0x323dc3,_0x3e1491,_0x47108f,_0x2cbbd1,_0x16c681){const _0x22cdde=_0x2e9347,_0x3dd979=ImageManager['loadPicture'](_0x323dc3[_0x22cdde(0x578)]()),_0x209f25=this[_0x22cdde(0x225)]-_0x3dd979[_0x22cdde(0x21b)];_0x3e1491+=_0x209f25/0x2;if(_0x209f25<0x0)_0x2cbbd1-=_0x209f25;Window_StatusBase['prototype'][_0x22cdde(0x659)][_0x22cdde(0x51f)](this,_0x323dc3,_0x3e1491,_0x47108f,_0x2cbbd1,_0x16c681);},Window_EquipStatus[_0x2e9347(0x655)]['actorParams']=function(){const _0x2106a2=_0x2e9347;return Imported[_0x2106a2(0x206)]?VisuMZ[_0x2106a2(0x378)][_0x2106a2(0x20a)]['Param'][_0x2106a2(0x666)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x438)]=function(){const _0x4b577d=_0x2e9347;return VisuMZ[_0x4b577d(0x2c2)][_0x4b577d(0x20a)][_0x4b577d(0x575)][_0x4b577d(0x5a3)];},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x668)]=function(){const _0x4862f9=_0x2e9347;return Imported['VisuMZ_0_CoreEngine']&&VisuMZ['CoreEngine']['Settings'][_0x4862f9(0x195)]['DrawIcons'];},Window_EquipStatus['prototype'][_0x2e9347(0x482)]=function(_0x3b3dd3,_0x4a5d12,_0x1fffb7,_0x4f1953){const _0x3d14fa=_0x2e9347,_0x468342=this['itemPadding']();Imported[_0x3d14fa(0x206)]?this[_0x3d14fa(0x488)](_0x4a5d12+_0x468342,_0x1fffb7,_0x4f1953,_0x3b3dd3,![]):this['drawText'](TextManager[_0x3d14fa(0x4de)](_0x3b3dd3),_0x4a5d12+_0x468342,_0x1fffb7,_0x4f1953);},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x4ea)]=function(_0x2b4cc1,_0x11a5d4,_0x28e599,_0x223a1a){const _0x2475a8=_0x2e9347,_0xc109fd=this['itemPadding']();let _0x2d9b96=0x0;if(Imported[_0x2475a8(0x206)])_0x2d9b96=this['_actor'][_0x2475a8(0x212)](_0x2b4cc1,!![]);else{if(_0x2475a8(0x2e5)!==_0x2475a8(0x2e5))return _0x888c04[_0x2475a8(0x510)]();else _0x2d9b96=this['_actor'][_0x2475a8(0x4de)](_0x2b4cc1);}const _0x521da3=_0x2d9b96;this[_0x2475a8(0x1a1)](_0x2d9b96,_0x11a5d4,_0x28e599,_0x223a1a-_0xc109fd,'right');},Window_EquipStatus['prototype']['drawUpdatedAfterParamValue']=function(_0x4702f8,_0x2590e5,_0xa1de61,_0x4e52b4){const _0x273461=_0x2e9347,_0x35f72b=this[_0x273461(0x1fe)]();let _0x129e31=0x0,_0x1d6300=0x0,_0xa14379='';if(this[_0x273461(0x5bc)]){Imported['VisuMZ_0_CoreEngine']?(_0x129e31=this[_0x273461(0x23c)][_0x273461(0x212)](_0x4702f8,![]),_0x1d6300=this[_0x273461(0x5bc)][_0x273461(0x212)](_0x4702f8,![]),_0xa14379=this['_tempActor']['paramValueByName'](_0x4702f8,!![])):(_0x129e31=this[_0x273461(0x23c)][_0x273461(0x4de)](_0x4702f8),_0x1d6300=this[_0x273461(0x5bc)][_0x273461(0x4de)](_0x4702f8),_0xa14379=this[_0x273461(0x5bc)][_0x273461(0x4de)](_0x4702f8));const _0x5174e1=_0x129e31,_0x106212=_0x1d6300;diffValue=_0x106212-_0x5174e1,this['changeTextColor'](ColorManager[_0x273461(0x67b)](diffValue)),this[_0x273461(0x1a1)](_0xa14379,_0x2590e5,_0xa1de61,_0x4e52b4-_0x35f72b,_0x273461(0x5a1));}},Window_EquipStatus[_0x2e9347(0x655)][_0x2e9347(0x289)]=function(_0x478a3e,_0x3cb31b,_0x1ba9a1,_0x2194df){const _0x3e1433=_0x2e9347,_0x3ee0bc=this[_0x3e1433(0x1fe)]();let _0x5ee112=0x0,_0x1b3bac=0x0,_0x2ce651=![];if(this[_0x3e1433(0x5bc)]){Imported[_0x3e1433(0x206)]?(_0x5ee112=this['_actor'][_0x3e1433(0x212)](_0x478a3e,![]),_0x1b3bac=this[_0x3e1433(0x5bc)]['paramValueByName'](_0x478a3e,![]),_0x2ce651=String(this['_actor'][_0x3e1433(0x212)](_0x478a3e,!![]))[_0x3e1433(0x1f9)](/([%％])/i)):(_0x5ee112=this[_0x3e1433(0x23c)][_0x3e1433(0x4de)](_0x478a3e),_0x1b3bac=this[_0x3e1433(0x5bc)][_0x3e1433(0x4de)](_0x478a3e),_0x2ce651=_0x5ee112%0x1!==0x0||_0x1b3bac%0x1!==0x0);const _0x58f846=_0x5ee112,_0x476bf8=_0x1b3bac,_0x13cc84=_0x476bf8-_0x58f846;let _0x564963=_0x13cc84;if(_0x2ce651)_0x564963=Math['round'](_0x13cc84*0x64)+'%';_0x13cc84!==0x0&&(this[_0x3e1433(0x6ac)](ColorManager[_0x3e1433(0x67b)](_0x13cc84)),_0x564963=(_0x13cc84>0x0?_0x3e1433(0x166):'(%1)')[_0x3e1433(0x410)](_0x564963),this[_0x3e1433(0x1a1)](_0x564963,_0x3cb31b+_0x3ee0bc,_0x1ba9a1,_0x2194df,'left'));}},Window_EquipStatus[_0x2e9347(0x655)]['drawItemDarkRect']=function(_0x1cd819,_0x37570b,_0xc8f1a2,_0xa2a78d,_0x4d1364){const _0x2ca515=_0x2e9347;if(VisuMZ[_0x2ca515(0x2c2)]['Settings'][_0x2ca515(0x575)][_0x2ca515(0x22a)]===![])return;_0x4d1364=Math[_0x2ca515(0x539)](_0x4d1364||0x1,0x1);while(_0x4d1364--){_0xa2a78d=_0xa2a78d||this[_0x2ca515(0x35e)](),this[_0x2ca515(0x267)][_0x2ca515(0x3a8)]=0xa0;const _0x2619b6=ColorManager[_0x2ca515(0x1de)]();this[_0x2ca515(0x267)][_0x2ca515(0x411)](_0x1cd819+0x1,_0x37570b+0x1,_0xc8f1a2-0x2,_0xa2a78d-0x2,_0x2619b6),this[_0x2ca515(0x267)][_0x2ca515(0x3a8)]=0xff;}},ColorManager['getItemsEquipsCoreBackColor2']=function(){const _0x2e0d07=_0x2e9347,_0x2b965d=VisuMZ[_0x2e0d07(0x2c2)]['Settings'][_0x2e0d07(0x575)];let _0x46ffbc=_0x2b965d[_0x2e0d07(0x3af)]!==undefined?_0x2b965d[_0x2e0d07(0x3af)]:0x13;return ColorManager[_0x2e0d07(0x57e)](_0x46ffbc);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x56c)]=Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x1b1)],Window_EquipCommand['prototype'][_0x2e9347(0x1b1)]=function(_0x544144){const _0x54e582=_0x2e9347;VisuMZ[_0x54e582(0x2c2)][_0x54e582(0x56c)]['call'](this,_0x544144),this['createCommandNameWindow'](_0x544144);},Window_EquipCommand['prototype']['createCommandNameWindow']=function(_0x7a57e6){const _0x287765=_0x2e9347,_0x550e5c=new Rectangle(0x0,0x0,_0x7a57e6[_0x287765(0x21b)],_0x7a57e6[_0x287765(0x23d)]);this['_commandNameWindow']=new Window_Base(_0x550e5c),this[_0x287765(0x180)]['opacity']=0x0,this['addChild'](this['_commandNameWindow']),this[_0x287765(0x3e0)]();},Window_EquipCommand['prototype'][_0x2e9347(0x44b)]=function(){const _0x454d21=_0x2e9347;Window_HorzCommand[_0x454d21(0x655)]['callUpdateHelp'][_0x454d21(0x51f)](this);if(this['_commandNameWindow'])this[_0x454d21(0x3e0)]();},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x3e0)]=function(){const _0x30e4ea=_0x2e9347,_0x50c0da=this['_commandNameWindow'];_0x50c0da[_0x30e4ea(0x267)][_0x30e4ea(0x5c7)]();const _0x231ada=this[_0x30e4ea(0x433)](this[_0x30e4ea(0x42f)]());if(_0x231ada===_0x30e4ea(0x23e)){const _0x4d27e5=this[_0x30e4ea(0x67f)](this[_0x30e4ea(0x42f)]());let _0x14747d=this[_0x30e4ea(0x407)](this['index']());_0x14747d=_0x14747d[_0x30e4ea(0x255)](/\\I\[(\d+)\]/gi,''),_0x50c0da[_0x30e4ea(0x3d6)](),this[_0x30e4ea(0x5ec)](_0x14747d,_0x4d27e5),this[_0x30e4ea(0x294)](_0x14747d,_0x4d27e5),this[_0x30e4ea(0x2d4)](_0x14747d,_0x4d27e5);}},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x5ec)]=function(_0x3af5c0,_0x5cdef5){},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x294)]=function(_0x394301,_0x4494ec){const _0x2afad9=_0x2e9347,_0x2a2541=this['_commandNameWindow'];_0x2a2541[_0x2afad9(0x1a1)](_0x394301,0x0,_0x4494ec['y'],_0x2a2541[_0x2afad9(0x225)],'center');},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x2d4)]=function(_0x118718,_0xf4cee){const _0x1db1da=_0x2e9347,_0x122e64=this[_0x1db1da(0x180)],_0x3fdfa5=$gameSystem[_0x1db1da(0x579)](),_0x1cad45=_0xf4cee['x']+Math['floor'](_0xf4cee[_0x1db1da(0x21b)]/0x2)+_0x3fdfa5;_0x122e64['x']=_0x122e64['width']/-0x2+_0x1cad45,_0x122e64['y']=Math[_0x1db1da(0x1fc)](_0xf4cee['height']/0x2);},Window_EquipCommand[_0x2e9347(0x655)]['isUseModernControls']=function(){const _0x5977ab=_0x2e9347;return Imported[_0x5977ab(0x206)]&&Window_HorzCommand['prototype']['isUseModernControls'][_0x5977ab(0x51f)](this);},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x2f0)]=function(){const _0x3a5650=_0x2e9347;if(this[_0x3a5650(0x527)]()==='equip')Window_HorzCommand[_0x3a5650(0x655)][_0x3a5650(0x2f0)][_0x3a5650(0x51f)](this);},Window_EquipCommand['prototype'][_0x2e9347(0x37f)]=function(){const _0x1158ba=_0x2e9347;if(!this[_0x1158ba(0x224)]()){if(_0x1158ba(0x31c)===_0x1158ba(0x493))return _0x4b371b['ItemsEquipsCore'][_0x1158ba(0x279)][_0x1158ba(0x51f)](this);else Window_HorzCommand[_0x1158ba(0x655)][_0x1158ba(0x37f)][_0x1158ba(0x51f)](this);}},Window_EquipCommand['prototype']['processCursorSpecialCheckModernControls']=function(){const _0x4e4da5=_0x2e9347;if(!this[_0x4e4da5(0x4d6)]())return![];if(SceneManager[_0x4e4da5(0x1c8)]['constructor']!==Scene_Equip)return![];if(Input['isTriggered']('down')){if('ojqLt'===_0x4e4da5(0x68f)){const _0x22210a=_0x2ba0aa[_0x4e4da5(0x2c2)][_0x4e4da5(0x20a)][_0x4e4da5(0x375)][_0x4e4da5(0x518)];return _0x22210a[_0x4e4da5(0x410)](_0x2ca762['tp']);}else this[_0x4e4da5(0x42a)]();}return![];},Window_EquipCommand['prototype']['processDownCursorSpecialCheckModernControls']=function(){const _0x5264cd=_0x2e9347;this[_0x5264cd(0x553)](),SceneManager[_0x5264cd(0x1c8)][_0x5264cd(0x44c)](),SceneManager[_0x5264cd(0x1c8)][_0x5264cd(0x6bb)][_0x5264cd(0x27c)](-0x1);},Window_EquipCommand['prototype']['maxCols']=function(){const _0x5650bc=_0x2e9347;return this[_0x5650bc(0x2ae)]?this['_list'][_0x5650bc(0x3d3)]:0x3;},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x4c6)]=function(){const _0x58c3f9=_0x2e9347;if(this['isOpen']()&&this[_0x58c3f9(0x537)]&&SceneManager[_0x58c3f9(0x1c8)][_0x58c3f9(0x654)]===Scene_Equip){if('HHXQW'!=='HHXQW')return _0x43a7dc[_0x58c3f9(0x2c2)][_0x58c3f9(0x20a)][_0x58c3f9(0x66f)][_0x58c3f9(0x18d)];else{if(this[_0x58c3f9(0x645)]()&&TouchInput[_0x58c3f9(0x5fb)]()){if('GoDAc'===_0x58c3f9(0x2d3))this[_0x58c3f9(0x1b5)](![]);else{const _0x196a83=_0x24322a['makeDeepCopy'](this);_0x196a83[_0x58c3f9(0x5bc)]=!![],this[_0x58c3f9(0x585)][_0x8b34b5]['setObject'](null),this['_bypassReleaseUnequippableItemsItemsEquipsCore']=!![],this[_0x58c3f9(0x656)](_0x196a83),this[_0x58c3f9(0x2e7)]=_0x22210c;}}else{if(TouchInput[_0x58c3f9(0x4c1)]()){if('OJXRK'==='OJXRK')this['onTouchSelectModernControls'](!![]);else{const _0x1376c2=_0x5bbd64[_0x58c3f9(0x1c8)][_0x58c3f9(0x23c)];_0x1376c2&&(this[_0x58c3f9(0x52e)](this['index']())?(this[_0x58c3f9(0x5b9)](),this[_0x58c3f9(0x3c9)]()):this[_0x58c3f9(0x605)]());}}}TouchInput[_0x58c3f9(0x57f)]()&&this['onTouchOk']();}}},Window_EquipCommand[_0x2e9347(0x655)]['onTouchSelectModernControls']=function(_0x55a1a4){const _0x4c7f7c=_0x2e9347;this[_0x4c7f7c(0x699)]=![];const _0x272f96=this[_0x4c7f7c(0x42f)](),_0x3ab0c2=this['hitIndex'](),_0x12998a=SceneManager[_0x4c7f7c(0x1c8)][_0x4c7f7c(0x6bb)];if(_0x12998a['isOpen']()&&_0x12998a['visible']){if(_0x3ab0c2>=0x0)_0x3ab0c2===this[_0x4c7f7c(0x42f)]()&&(this[_0x4c7f7c(0x699)]=!![]),this[_0x4c7f7c(0x468)](),this['select'](_0x3ab0c2);else _0x12998a[_0x4c7f7c(0x30c)]()>=0x0&&(this[_0x4c7f7c(0x5bf)](),this['deselect']());}_0x55a1a4&&this['index']()!==_0x272f96&&this[_0x4c7f7c(0x553)]();},Window_EquipCommand['prototype'][_0x2e9347(0x211)]=function(){const _0x5d5a9b=_0x2e9347;this[_0x5d5a9b(0x4a1)](),this[_0x5d5a9b(0x551)](),this[_0x5d5a9b(0x2c6)]();},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x474)]=function(){const _0xda8356=_0x2e9347;Window_HorzCommand[_0xda8356(0x655)][_0xda8356(0x474)][_0xda8356(0x51f)](this),this[_0xda8356(0x58b)]();},Window_EquipCommand[_0x2e9347(0x655)]['addEquipCommand']=function(){const _0x32a549=_0x2e9347;if(!this[_0x32a549(0x4ac)]())return;const _0x559bed=this[_0x32a549(0x2ff)](),_0x4b217b=VisuMZ['ItemsEquipsCore'][_0x32a549(0x20a)][_0x32a549(0x575)][_0x32a549(0x2f9)],_0x320657=_0x559bed===_0x32a549(0x1f4)?TextManager[_0x32a549(0x456)]:_0x32a549(0x5e9)[_0x32a549(0x410)](_0x4b217b,TextManager['equip2']),_0x3f63a3=this[_0x32a549(0x41e)]();this[_0x32a549(0x234)](_0x320657,_0x32a549(0x1b8),_0x3f63a3);},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x4ac)]=function(){const _0xae0a1c=_0x2e9347;return!this[_0xae0a1c(0x424)]();},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x41e)]=function(){return!![];},Window_EquipCommand[_0x2e9347(0x655)]['addOptimizeCommand']=function(){const _0x4fe1da=_0x2e9347;if(!this[_0x4fe1da(0x1ff)]())return;const _0x4bdc60=this[_0x4fe1da(0x2ff)](),_0x248a8a=VisuMZ[_0x4fe1da(0x2c2)][_0x4fe1da(0x20a)][_0x4fe1da(0x575)]['CmdIconOptimize'],_0x558ea6=_0x4bdc60===_0x4fe1da(0x1f4)?TextManager[_0x4fe1da(0x155)]:_0x4fe1da(0x5e9)[_0x4fe1da(0x410)](_0x248a8a,TextManager[_0x4fe1da(0x155)]),_0x2956ec=this[_0x4fe1da(0x2f6)]();this[_0x4fe1da(0x234)](_0x558ea6,'optimize',_0x2956ec);},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x1ff)]=function(){const _0x19e90b=_0x2e9347;return VisuMZ[_0x19e90b(0x2c2)][_0x19e90b(0x20a)]['EquipScene'][_0x19e90b(0x5db)];},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x2f6)]=function(){return!![];},Window_EquipCommand[_0x2e9347(0x655)]['addClearCommand']=function(){const _0x136e4d=_0x2e9347;if(!this[_0x136e4d(0x569)]())return;const _0x36e6e4=this['commandStyle'](),_0xebeb87=VisuMZ['ItemsEquipsCore'][_0x136e4d(0x20a)]['EquipScene'][_0x136e4d(0x686)],_0x26260c=_0x36e6e4==='text'?TextManager[_0x136e4d(0x5c7)]:_0x136e4d(0x5e9)[_0x136e4d(0x410)](_0xebeb87,TextManager[_0x136e4d(0x5c7)]),_0x4d045f=this[_0x136e4d(0x3b5)]();this[_0x136e4d(0x234)](_0x26260c,_0x136e4d(0x5c7),_0x4d045f);},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x569)]=function(){const _0x4711b7=_0x2e9347;return VisuMZ[_0x4711b7(0x2c2)][_0x4711b7(0x20a)][_0x4711b7(0x575)]['CommandAddClear'];},Window_EquipCommand[_0x2e9347(0x655)]['isClearCommandEnabled']=function(){return!![];},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x1a0)]=function(){const _0x184f15=_0x2e9347;return VisuMZ[_0x184f15(0x2c2)][_0x184f15(0x20a)][_0x184f15(0x575)][_0x184f15(0x2b1)];},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x597)]=function(_0x3f6508){const _0x58e2a3=_0x2e9347,_0x19fd49=this[_0x58e2a3(0x433)](_0x3f6508);if(_0x19fd49==='iconText')this['drawItemStyleIconText'](_0x3f6508);else _0x19fd49===_0x58e2a3(0x23e)?this[_0x58e2a3(0x65a)](_0x3f6508):Window_HorzCommand[_0x58e2a3(0x655)][_0x58e2a3(0x597)][_0x58e2a3(0x51f)](this,_0x3f6508);},Window_EquipCommand[_0x2e9347(0x655)]['commandStyle']=function(){const _0x20af63=_0x2e9347;return VisuMZ[_0x20af63(0x2c2)]['Settings'][_0x20af63(0x575)][_0x20af63(0x4dc)];},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x433)]=function(_0x5dac56){const _0x10024f=_0x2e9347;if(_0x5dac56<0x0)return'text';const _0x533896=this[_0x10024f(0x2ff)]();if(_0x533896!==_0x10024f(0x38a)){if('cEIMh'===_0x10024f(0x28a))_0x23d945[_0x10024f(0x2c2)][_0x10024f(0x3f0)][_0x10024f(0x51f)](this),this[_0x10024f(0x424)]()&&this[_0x10024f(0x44c)]();else return _0x533896;}else{if(this[_0x10024f(0x361)]()>0x0){if(_0x10024f(0x45e)===_0x10024f(0x45e)){const _0x1c1f61=this[_0x10024f(0x407)](_0x5dac56);if(_0x1c1f61['match'](/\\I\[(\d+)\]/i)){const _0x12240c=this[_0x10024f(0x67f)](_0x5dac56),_0x4f3036=this[_0x10024f(0x282)](_0x1c1f61)[_0x10024f(0x21b)];return _0x4f3036<=_0x12240c[_0x10024f(0x21b)]?_0x10024f(0x495)!==_0x10024f(0x495)?this[_0x10024f(0x214)]():_0x10024f(0x18a):'UqdCT'!==_0x10024f(0x573)?_0x396517:_0x10024f(0x23e);}}else _0x5e30b6+=_0x8553d2(_0x2c412d['$1']),_0x31aaa6+=_0x44f8b8(_0x4e46e5['$2']);}}return _0x10024f(0x1f4);},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x4a4)]=function(_0x1eb3b0){const _0x410754=_0x2e9347,_0x2ce5aa=this[_0x410754(0x67f)](_0x1eb3b0),_0x174f1a=this[_0x410754(0x407)](_0x1eb3b0),_0x1b0ba5=this['textSizeEx'](_0x174f1a)['width'];this[_0x410754(0x4f8)](this['isCommandEnabled'](_0x1eb3b0));const _0x220fc3=this[_0x410754(0x1a0)]();if(_0x220fc3===_0x410754(0x5a1))this['drawTextEx'](_0x174f1a,_0x2ce5aa['x']+_0x2ce5aa[_0x410754(0x21b)]-_0x1b0ba5,_0x2ce5aa['y'],_0x1b0ba5);else{if(_0x220fc3===_0x410754(0x5a6)){const _0x17471e=_0x2ce5aa['x']+Math[_0x410754(0x1fc)]((_0x2ce5aa[_0x410754(0x21b)]-_0x1b0ba5)/0x2);this[_0x410754(0x53b)](_0x174f1a,_0x17471e,_0x2ce5aa['y'],_0x1b0ba5);}else this['drawTextEx'](_0x174f1a,_0x2ce5aa['x'],_0x2ce5aa['y'],_0x1b0ba5);}},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x65a)]=function(_0x23e00a){const _0x54b575=_0x2e9347;this[_0x54b575(0x407)](_0x23e00a)[_0x54b575(0x1f9)](/\\I\[(\d+)\]/i);const _0x17e952=Number(RegExp['$1'])||0x0,_0xe8f74a=this[_0x54b575(0x67f)](_0x23e00a),_0x172b34=_0xe8f74a['x']+Math[_0x54b575(0x1fc)]((_0xe8f74a['width']-ImageManager[_0x54b575(0x66a)])/0x2),_0x2263ee=_0xe8f74a['y']+(_0xe8f74a[_0x54b575(0x23d)]-ImageManager[_0x54b575(0x231)])/0x2;this['drawIcon'](_0x17e952,_0x172b34,_0x2263ee);},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x4d7)]=function(){const _0x2bf0b7=_0x2e9347,_0x16f393=SceneManager[_0x2bf0b7(0x1c8)];if(_0x16f393&&_0x16f393[_0x2bf0b7(0x510)])return _0x16f393[_0x2bf0b7(0x510)]();return null;},Window_EquipCommand[_0x2e9347(0x655)][_0x2e9347(0x3c9)]=function(){const _0x3389a9=_0x2e9347;Window_Command[_0x3389a9(0x655)]['updateHelp'][_0x3389a9(0x51f)](this),this[_0x3389a9(0x1d3)]['setText'](this[_0x3389a9(0x1e2)]());},Window_EquipCommand['prototype']['helpDescriptionText']=function(){const _0x5861e6=_0x2e9347,_0x24e1da=this[_0x5861e6(0x527)]();switch(_0x24e1da){case _0x5861e6(0x1b8):return TextManager[_0x5861e6(0x22c)][_0x5861e6(0x299)][_0x5861e6(0x1b8)];case _0x5861e6(0x155):return TextManager['ITEMS_EQUIPS_CORE'][_0x5861e6(0x299)][_0x5861e6(0x155)];case _0x5861e6(0x5c7):return TextManager[_0x5861e6(0x22c)][_0x5861e6(0x299)][_0x5861e6(0x5c7)];default:return'';}},Window_EquipSlot['prototype'][_0x2e9347(0x424)]=function(){const _0x3f5653=_0x2e9347;return Imported['VisuMZ_0_CoreEngine']&&Window_HorzCommand[_0x3f5653(0x655)][_0x3f5653(0x424)][_0x3f5653(0x51f)](this);},Window_EquipSlot[_0x2e9347(0x655)][_0x2e9347(0x468)]=function(){const _0x3a8a33=_0x2e9347;Window_StatusBase[_0x3a8a33(0x655)]['activate'][_0x3a8a33(0x51f)](this),this[_0x3a8a33(0x44b)]();},Window_EquipSlot[_0x2e9347(0x655)][_0x2e9347(0x496)]=function(){const _0xe5e22a=_0x2e9347;Window_StatusBase[_0xe5e22a(0x655)]['processCursorMove'][_0xe5e22a(0x51f)](this),this[_0xe5e22a(0x18c)]();},Window_EquipSlot[_0x2e9347(0x655)]['checkShiftRemoveShortcut']=function(){const _0x75fe07=_0x2e9347;if(!this[_0x75fe07(0x16c)]())return;if(Input['isTriggered']('shift')&&this['item']()){if(_0x75fe07(0x34d)!==_0x75fe07(0x530)){const _0x2d47e9=SceneManager[_0x75fe07(0x1c8)]['_actor'];if(_0x2d47e9){if(_0x75fe07(0x426)==='chJkr')this[_0x75fe07(0x52e)](this[_0x75fe07(0x42f)]())?(this[_0x75fe07(0x5b9)](),this[_0x75fe07(0x3c9)]()):_0x75fe07(0x178)!==_0x75fe07(0x550)?this[_0x75fe07(0x605)]():(_0x2c33c8['prototype']['activate'][_0x75fe07(0x51f)](this),this[_0x75fe07(0x4f6)]&&this[_0x75fe07(0x4f6)][_0x75fe07(0x424)]()&&this[_0x75fe07(0x4f6)][_0x75fe07(0x468)]());else{const _0x4f8356=_0x8ebd3d[_0x75fe07(0x2c0)]||'';if(_0x4f8356[_0x75fe07(0x1f9)](/<(?:CONSERVE|PRESERVE):[ ](\d+)([%％])>/i)){const _0x3e5bbe=_0xf7adaf(_0x25b22b['$1'])*0.01;if(_0x4b7b04[_0x75fe07(0x27e)]()<_0x3e5bbe)return;}}}}else{if(this[_0x75fe07(0x5bc)])return![];_0x5708d8[_0x75fe07(0x41d)]=!![];const _0x38b716=_0x53641a[_0x75fe07(0x2c2)]['Game_Actor_tradeItemWithParty'][_0x75fe07(0x51f)](this,_0x5eb9d6,_0x3ac9f6);return _0x98e5a0[_0x75fe07(0x41d)]=![],_0x38b716;}}},Window_EquipSlot[_0x2e9347(0x655)]['canShiftRemoveEquipment']=function(_0x52bb8e){const _0x1cd081=_0x2e9347,_0x30cebd=SceneManager['_scene']['_actor'];if(!_0x30cebd)return;if(!_0x30cebd['isEquipChangeOk'](_0x52bb8e))return![];const _0x5df8a6=_0x30cebd[_0x1cd081(0x3b3)]()[_0x52bb8e];if(_0x30cebd[_0x1cd081(0x683)]()[_0x1cd081(0x5e8)](_0x5df8a6)){if('lZBKd'!==_0x1cd081(0x230))this[_0x1cd081(0x4a4)](_0x1a78b6);else return![];}return!![];;},Window_EquipSlot['prototype'][_0x2e9347(0x5b9)]=function(){const _0x2757e6=_0x2e9347;SoundManager['playEquip']();const _0x2a0e18=SceneManager[_0x2757e6(0x1c8)][_0x2757e6(0x23c)];_0x2a0e18[_0x2757e6(0x2cc)](this['index'](),null),this[_0x2757e6(0x474)](),this[_0x2757e6(0x1d1)][_0x2757e6(0x474)](),this['callUpdateHelp']();const _0x2f8e2a=SceneManager[_0x2757e6(0x1c8)][_0x2757e6(0x315)];if(_0x2f8e2a)_0x2f8e2a[_0x2757e6(0x474)]();},Window_EquipSlot[_0x2e9347(0x655)][_0x2e9347(0x16c)]=function(){const _0x3dde35=_0x2e9347;if(!this['active'])return![];if(!VisuMZ[_0x3dde35(0x2c2)][_0x3dde35(0x20a)][_0x3dde35(0x575)][_0x3dde35(0x431)])return![];return!![];},Window_EquipSlot[_0x2e9347(0x655)][_0x2e9347(0x37f)]=function(){const _0x399563=_0x2e9347;if(!this[_0x399563(0x224)]()){if(_0x399563(0x342)===_0x399563(0x29d))return this[_0x399563(0x26e)]();else Window_StatusBase[_0x399563(0x655)][_0x399563(0x37f)][_0x399563(0x51f)](this);}},Window_EquipSlot['prototype'][_0x2e9347(0x224)]=function(){const _0x17e3b1=_0x2e9347;if(!this[_0x17e3b1(0x4d6)]())return![];if(SceneManager[_0x17e3b1(0x1c8)][_0x17e3b1(0x654)]!==Scene_Equip)return![];if(this[_0x17e3b1(0x676)]())return this[_0x17e3b1(0x553)](),Input[_0x17e3b1(0x5c7)](),SceneManager[_0x17e3b1(0x1c8)]['onSlotCancel'](),![];else{if(Input[_0x17e3b1(0x350)](_0x17e3b1(0x1a9))){if(_0x17e3b1(0x4d4)===_0x17e3b1(0x23a)){_0x3fd4fe[_0x17e3b1(0x655)][_0x17e3b1(0x3c9)]['call'](this);if(this[_0x17e3b1(0x23c)]&&this[_0x17e3b1(0x315)]&&this[_0x17e3b1(0x6bd)]>=0x0){const _0x523005=_0x5886cc['makeDeepCopy'](this[_0x17e3b1(0x23c)]);_0x523005['_tempActor']=!![],_0x523005[_0x17e3b1(0x4e3)](this[_0x17e3b1(0x6bd)],this[_0x17e3b1(0x343)]()),this[_0x17e3b1(0x315)][_0x17e3b1(0x169)](_0x523005);}}else{const _0x22b9d0=this[_0x17e3b1(0x42f)]();if(Input[_0x17e3b1(0x49d)]('shift')){if('xNBHi'===_0x17e3b1(0x46a)){if(_0x2aff89[_0x17e3b1(0x1f9)](/(.*):[ ](.*)/i)){const _0x57f80e=_0x260b91(_0x2d0d3d['$1'])[_0x17e3b1(0x20b)]()[_0x17e3b1(0x515)](),_0x4b5e9e=_0x5f1d6f(_0x54f8e1['$2'])[_0x17e3b1(0x515)]();this[_0x17e3b1(0x4ee)][_0x57f80e]=_0x4b5e9e;}}else this[_0x17e3b1(0x1fa)]();}else this[_0x17e3b1(0x18b)](Input['isTriggered'](_0x17e3b1(0x1a9)));return this[_0x17e3b1(0x42f)]()!==_0x22b9d0&&this[_0x17e3b1(0x553)](),!![];}}else{if(this['isShiftShortcutKeyForRemove']()&&Input['isTriggered']('shift'))return!![];}}return![];},Window_EquipSlot[_0x2e9347(0x655)][_0x2e9347(0x676)]=function(){const _0x44f93f=_0x2e9347;if(this[_0x44f93f(0x42f)]()!==0x0)return![];const _0x4d9791=VisuMZ[_0x44f93f(0x2c2)]['Settings'][_0x44f93f(0x575)];if(!_0x4d9791['CommandAddOptimize']&&!_0x4d9791[_0x44f93f(0x1ad)])return![];return Input[_0x44f93f(0x4c1)]('up');},Window_EquipSlot[_0x2e9347(0x655)][_0x2e9347(0x4cb)]=function(){const _0x41ae4c=_0x2e9347;return VisuMZ[_0x41ae4c(0x2c2)]['Settings']['EquipScene'][_0x41ae4c(0x431)];},Window_EquipSlot[_0x2e9347(0x655)][_0x2e9347(0x4c6)]=function(){const _0x288cea=_0x2e9347;if(this[_0x288cea(0x658)]()&&this[_0x288cea(0x537)]&&SceneManager[_0x288cea(0x1c8)][_0x288cea(0x654)]===Scene_Equip){if(_0x288cea(0x1ec)!=='esyPU'){if(this[_0x288cea(0x645)]()&&TouchInput[_0x288cea(0x5fb)]()){if(_0x288cea(0x57d)!=='FGjAm')this[_0x288cea(0x1b5)](![]);else return _0x44fe8b['ItemsEquipsCore']['Settings'][_0x288cea(0x66f)][_0x288cea(0x3a6)];}else TouchInput['isTriggered']()&&this['onTouchSelectModernControls'](!![]);if(TouchInput[_0x288cea(0x57f)]())_0x288cea(0x450)===_0x288cea(0x450)?this[_0x288cea(0x370)]():this[_0x288cea(0x568)]();else{if(TouchInput['isCancelled']()){if(_0x288cea(0x32e)==='FHghy')this[_0x288cea(0x4c5)]();else return _0x530e41['VisuMZ_1_BattleCore']&&_0x26f254[_0x288cea(0x2a8)](this[_0x288cea(0x2f1)])!=='MANUAL'?this['getItemDamageAmountLabelBattleCore']():this['getItemDamageAmountLabelOriginal']();}}}else this['addShopTrackingItem']('buy',_0x288cea(0x3f3),_0xc07a8);}},Window_EquipSlot[_0x2e9347(0x655)][_0x2e9347(0x1b5)]=function(_0xdc9965){const _0x1f0ad2=_0x2e9347;this['_doubleTouch']=![];const _0x17165b=this[_0x1f0ad2(0x42f)](),_0x2339d9=this[_0x1f0ad2(0x30c)](),_0x2dc86a=SceneManager[_0x1f0ad2(0x1c8)][_0x1f0ad2(0x33d)];if(_0x2dc86a[_0x1f0ad2(0x658)]()&&_0x2dc86a[_0x1f0ad2(0x537)]){if(_0x1f0ad2(0x345)!==_0x1f0ad2(0x345))return this[_0x1f0ad2(0x3ff)](_0x173a48(_0x5591e0));else{if(_0x2339d9>=0x0)'bHlpq'==='bHlpq'?(_0x2339d9===this[_0x1f0ad2(0x42f)]()&&(this[_0x1f0ad2(0x699)]=!![]),this['activate'](),this[_0x1f0ad2(0x5f8)](_0x2339d9)):this[_0x1f0ad2(0x33a)](_0x1f0ad2(0x3c6),_0x33c88d,_0x1c99c2);else{if(_0x2dc86a[_0x1f0ad2(0x30c)]()>=0x0){if(_0x1f0ad2(0x226)==='MHAZE')return _0x513e3e['ItemsEquipsCore']['Settings'][_0x1f0ad2(0x375)][_0x1f0ad2(0x2b0)];else this[_0x1f0ad2(0x5bf)](),this[_0x1f0ad2(0x3c8)]();}}}}_0xdc9965&&this[_0x1f0ad2(0x42f)]()!==_0x17165b&&this[_0x1f0ad2(0x553)]();},Window_EquipSlot['prototype'][_0x2e9347(0x307)]=function(){return this['index']();},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x186)]=Window_EquipItem[_0x2e9347(0x655)][_0x2e9347(0x5e8)],Window_EquipItem[_0x2e9347(0x655)][_0x2e9347(0x5e8)]=function(_0x3ba598){const _0xe5304=_0x2e9347;if(_0x3ba598===null&&this[_0xe5304(0x683)]()[_0xe5304(0x5e8)](this[_0xe5304(0x15c)]())){if(_0xe5304(0x64c)!==_0xe5304(0x64c))_0x419477[_0xe5304(0x168)](_0x4a8367[_0xe5304(0x55f)](),0x1);else return![];}else{$gameTemp[_0xe5304(0x1e4)]=!![];let _0x295102=VisuMZ[_0xe5304(0x2c2)]['Window_EquipItem_includes']['call'](this,_0x3ba598);if(!_0x295102&&_0x3ba598&&DataManager[_0xe5304(0x392)](_0x3ba598)){if(_0xe5304(0x398)===_0xe5304(0x398)){const _0xa58f2d=_0x3ba598[_0xe5304(0x3e7)]||0x0;if(this[_0xe5304(0x23c)]&&this[_0xe5304(0x23c)][_0xe5304(0x164)](_0xa58f2d)){if('liIpX'!=='vpdxE'){const _0x556e03=DataManager[_0xe5304(0x404)](_0x3ba598);_0x556e03[_0xe5304(0x5e8)](this[_0xe5304(0x15c)]())&&(_0x295102=!![]);}else this[_0xe5304(0x31a)](_0x1825ad[_0xe5304(0x4c1)](_0xe5304(0x5a1)));}}else{const _0x6ff95c=_0x7cff52?_0x22990a(_0x480afc['$1']):_0x2a959f[_0xe5304(0x2ab)](_0x4d8c56);return _0x3d60bf[_0x6ff95c]||_0x42c0e7;}}return $gameTemp[_0xe5304(0x1e4)]=undefined,_0x295102;}},VisuMZ[_0x2e9347(0x2c2)]['Window_EquipItem_isEnabled']=Window_EquipItem['prototype']['isEnabled'],Window_EquipItem['prototype']['isEnabled']=function(_0x75db54){const _0x416c97=_0x2e9347;if(_0x75db54&&this['_actor']){if(_0x416c97(0x247)===_0x416c97(0x247)){if(this[_0x416c97(0x507)](_0x75db54))return![];if(this['isSoleWeaponType'](_0x75db54))return![];if(this[_0x416c97(0x3ee)](_0x75db54))return![];if(!this['_actor']['canEquip'](_0x75db54))return![];}else this[_0x416c97(0x3e5)]();}if(!_0x75db54)return!this[_0x416c97(0x683)]()[_0x416c97(0x5e8)](this['etypeId']());return VisuMZ[_0x416c97(0x2c2)]['Window_EquipItem_isEnabled'][_0x416c97(0x51f)](this,_0x75db54);},Window_EquipItem['prototype'][_0x2e9347(0x507)]=function(_0x48a932){const _0x268bd9=_0x2e9347,_0x5a665f=_0x48a932['note'];if(_0x5a665f[_0x268bd9(0x1f9)](/<EQUIP COPY LIMIT:[ ](\d+)>/i)){if('xJncP'===_0x268bd9(0x191)){const _0x49035e=Number(RegExp['$1'])||0x1;let _0x362f66=0x0;const _0x2da320=this['_actor'][_0x268bd9(0x293)](),_0x2f693b=SceneManager[_0x268bd9(0x1c8)]['_slotWindow'][_0x268bd9(0x307)]();_0x2da320[_0x2f693b]=null;for(const _0x8ab39 of _0x2da320){if(_0x268bd9(0x28c)==='NIcmO'){_0x2d957a=_0x19ec65||this[_0x268bd9(0x35e)](),this['contents'][_0x268bd9(0x3a8)]=0xa0;const _0xf5e9bf=_0x1f48da[_0x268bd9(0x1de)]();this[_0x268bd9(0x267)][_0x268bd9(0x411)](_0xc32a1e+0x1,_0x278e36+0x1,_0x322664-0x2,_0x2b86d7-0x2,_0xf5e9bf),this[_0x268bd9(0x267)][_0x268bd9(0x3a8)]=0xff;}else{if(!_0x8ab39)continue;if(DataManager[_0x268bd9(0x514)](_0x48a932)===DataManager[_0x268bd9(0x514)](_0x8ab39)){if(_0x48a932['id']===_0x8ab39['id'])_0x362f66+=0x1;}}}return _0x362f66>=_0x49035e;}else this['_commandWindow'][_0x268bd9(0x27c)](0x0),this[_0x268bd9(0x6bb)][_0x268bd9(0x5bf)]();}else return![];},Window_EquipItem[_0x2e9347(0x655)]['isSoleWeaponType']=function(_0x4d0ea5){const _0xd75291=_0x2e9347;if(!DataManager['isWeapon'](_0x4d0ea5))return![];const _0x4bbdae=/<EQUIP WEAPON TYPE LIMIT:[ ](\d+)>/i;let _0x53e19f=0x0;const _0x4b569d=this[_0xd75291(0x23c)]['equips'](),_0x583da3=SceneManager['_scene']['_slotWindow'][_0xd75291(0x307)]();_0x4b569d[_0x583da3]=null;for(const _0x4997aa of _0x4b569d){if(!_0x4997aa)continue;if(!DataManager['isWeapon'](_0x4997aa))continue;if(_0x4d0ea5[_0xd75291(0x53f)]===_0x4997aa[_0xd75291(0x53f)]){if('XqJaE'==='NHPpT')this[_0xd75291(0x18b)](_0x3d8650['isTriggered'](_0xd75291(0x1a9)));else{_0x53e19f+=0x1;if(_0x4d0ea5[_0xd75291(0x2c0)][_0xd75291(0x1f9)](_0x4bbdae)){if('qCgOK'!==_0xd75291(0x500)){const _0x372fbd=Number(RegExp['$1'])||0x1;if(_0x53e19f>=_0x372fbd)return!![];}else _0x5741cd[_0xd75291(0x2c2)][_0xd75291(0x55e)][_0xd75291(0x51f)](this),this[_0xd75291(0x43e)]()&&this[_0xd75291(0x315)]['show'](),this[_0xd75291(0x536)][_0xd75291(0x3c9)]();}if(_0x4997aa['note']['match'](_0x4bbdae)){const _0x5a771c=Number(RegExp['$1'])||0x1;if(_0x53e19f>=_0x5a771c)return!![];}}}}return![];},Window_EquipItem['prototype']['isSoleArmorType']=function(_0x31c3dd){const _0x48595e=_0x2e9347;if(!DataManager[_0x48595e(0x392)](_0x31c3dd))return![];const _0x439f47=/<EQUIP ARMOR TYPE LIMIT:[ ](\d+)>/i;let _0x3ec641=0x0;const _0x17a2d4=this['_actor']['equips'](),_0x36c97f=SceneManager['_scene'][_0x48595e(0x6bb)][_0x48595e(0x307)]();_0x17a2d4[_0x36c97f]=null;for(const _0x9e1d60 of _0x17a2d4){if(!_0x9e1d60)continue;if(!DataManager[_0x48595e(0x392)](_0x9e1d60))continue;if(_0x31c3dd[_0x48595e(0x3e7)]===_0x9e1d60[_0x48595e(0x3e7)]){if(_0x48595e(0x39a)!==_0x48595e(0x39a))this[_0x48595e(0x585)][_0xe6099d]['setObject'](_0x279604),this[_0x48595e(0x474)]();else{_0x3ec641+=0x1;if(_0x31c3dd['note'][_0x48595e(0x1f9)](_0x439f47)){const _0x3abc9b=Number(RegExp['$1'])||0x1;if(_0x3ec641>=_0x3abc9b)return!![];}if(_0x9e1d60[_0x48595e(0x2c0)][_0x48595e(0x1f9)](_0x439f47)){if(_0x48595e(0x516)!=='eADLF'){const _0x143c72=_0xbbe7d1(_0x29addc['$1']);return _0x1ad25b['value'](_0x143c72);}else{const _0xe120c0=Number(RegExp['$1'])||0x1;if(_0x3ec641>=_0xe120c0)return!![];}}}}}return![];},Window_EquipItem[_0x2e9347(0x655)][_0x2e9347(0x683)]=function(){const _0x37e5ec=_0x2e9347;return VisuMZ[_0x37e5ec(0x2c2)]['Settings'][_0x37e5ec(0x575)]['NonRemoveETypes'];},Window_EquipItem[_0x2e9347(0x655)][_0x2e9347(0x597)]=function(_0xc7a6bf){const _0xa5cacd=_0x2e9347,_0x3be516=this['itemAt'](_0xc7a6bf);if(_0x3be516){if('wMAie'!==_0xa5cacd(0x1f1))Window_ItemList[_0xa5cacd(0x655)][_0xa5cacd(0x597)][_0xa5cacd(0x51f)](this,_0xc7a6bf);else{_0x11d45b=_0x172e27[_0xa5cacd(0x539)](_0x43b244||0x1,0x1);while(_0x39d04b--){_0x543c21=_0x6f3286||this['lineHeight'](),this['contentsBack'][_0xa5cacd(0x3a8)]=0xa0;const _0x16d8c8=_0x4a3b65[_0xa5cacd(0x540)]();this[_0xa5cacd(0x2a2)][_0xa5cacd(0x411)](_0x508a92+0x1,_0x319b65+0x1,_0x144235-0x2,_0x4c847e-0x2,_0x16d8c8),this[_0xa5cacd(0x2a2)][_0xa5cacd(0x3a8)]=0xff;}}}else{if(_0xa5cacd(0x61e)===_0xa5cacd(0x636)){const _0x4a6571=this['equipSlots']();for(let _0x53d914=0x0;_0x53d914<_0x4a6571[_0xa5cacd(0x3d3)];_0x53d914++){if(!this[_0xa5cacd(0x585)][_0x53d914])this[_0xa5cacd(0x585)][_0x53d914]=new _0x172c27();}this[_0xa5cacd(0x5a4)](![]),this[_0xa5cacd(0x474)]();}else this[_0xa5cacd(0x3ea)](_0xc7a6bf);}},Window_EquipItem['prototype'][_0x2e9347(0x3ea)]=function(_0x3362ba){const _0x378bf4=_0x2e9347;this[_0x378bf4(0x4f8)](this[_0x378bf4(0x503)](null));const _0xeb762f=VisuMZ['ItemsEquipsCore'][_0x378bf4(0x20a)][_0x378bf4(0x575)],_0x58abe5=this[_0x378bf4(0x67f)](_0x3362ba),_0x3474c0=_0x58abe5['y']+(this[_0x378bf4(0x35e)]()-ImageManager[_0x378bf4(0x231)])/0x2,_0x260fc6=ImageManager[_0x378bf4(0x66a)]+0x4,_0x15b883=Math[_0x378bf4(0x539)](0x0,_0x58abe5[_0x378bf4(0x21b)]-_0x260fc6);this[_0x378bf4(0x6ba)](),this[_0x378bf4(0x262)](_0xeb762f['RemoveEquipIcon'],_0x58abe5['x'],_0x3474c0),this[_0x378bf4(0x1a1)](_0xeb762f['RemoveEquipText'],_0x58abe5['x']+_0x260fc6,_0x58abe5['y'],_0x15b883),this[_0x378bf4(0x4f8)](!![]);},Window_EquipItem[_0x2e9347(0x655)]['updateHelp']=function(){const _0x3d95c0=_0x2e9347;Window_ItemList['prototype']['updateHelp']['call'](this);if(this[_0x3d95c0(0x23c)]&&this[_0x3d95c0(0x315)]&&this['_slotId']>=0x0){const _0x5f0853=JsonEx[_0x3d95c0(0x68b)](this['_actor']);_0x5f0853['_tempActor']=!![],_0x5f0853['forceChangeEquip'](this[_0x3d95c0(0x6bd)],this[_0x3d95c0(0x343)]()),this['_statusWindow'][_0x3d95c0(0x169)](_0x5f0853);}},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x555)]=Window_ShopCommand['prototype'][_0x2e9347(0x1b1)],Window_ShopCommand['prototype'][_0x2e9347(0x1b1)]=function(_0x4a93f2){const _0x3eef6a=_0x2e9347;VisuMZ['ItemsEquipsCore'][_0x3eef6a(0x555)][_0x3eef6a(0x51f)](this,_0x4a93f2),this[_0x3eef6a(0x380)](_0x4a93f2);},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x380)]=function(_0x7a4d42){const _0x46bd8f=_0x2e9347,_0x267de9=new Rectangle(0x0,0x0,_0x7a4d42['width'],_0x7a4d42[_0x46bd8f(0x23d)]);this[_0x46bd8f(0x180)]=new Window_Base(_0x267de9),this[_0x46bd8f(0x180)][_0x46bd8f(0x373)]=0x0,this[_0x46bd8f(0x430)](this[_0x46bd8f(0x180)]),this[_0x46bd8f(0x3e0)]();},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x44b)]=function(){const _0x3df950=_0x2e9347;Window_HorzCommand[_0x3df950(0x655)][_0x3df950(0x44b)][_0x3df950(0x51f)](this);if(this[_0x3df950(0x180)])this[_0x3df950(0x3e0)]();},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x3e0)]=function(){const _0x21d43b=_0x2e9347,_0x184c4a=this[_0x21d43b(0x180)];_0x184c4a[_0x21d43b(0x267)]['clear']();const _0x462d27=this[_0x21d43b(0x433)](this['index']());if(_0x462d27===_0x21d43b(0x23e)){const _0x281c28=this['itemLineRect'](this['index']());let _0x10b175=this[_0x21d43b(0x407)](this[_0x21d43b(0x42f)]());_0x10b175=_0x10b175[_0x21d43b(0x255)](/\\I\[(\d+)\]/gi,''),_0x184c4a[_0x21d43b(0x3d6)](),this[_0x21d43b(0x5ec)](_0x10b175,_0x281c28),this[_0x21d43b(0x294)](_0x10b175,_0x281c28),this['commandNameWindowCenter'](_0x10b175,_0x281c28);}},Window_ShopCommand['prototype']['commandNameWindowDrawBackground']=function(_0x573a3e,_0xab806a){},Window_ShopCommand['prototype'][_0x2e9347(0x294)]=function(_0x10504b,_0x5f1562){const _0x497665=_0x2e9347,_0x5613ba=this[_0x497665(0x180)];_0x5613ba[_0x497665(0x1a1)](_0x10504b,0x0,_0x5f1562['y'],_0x5613ba[_0x497665(0x225)],'center');},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x2d4)]=function(_0x2b5ee9,_0x1f0a73){const _0x1cb4f0=_0x2e9347,_0x290fe8=this[_0x1cb4f0(0x180)],_0x53e5cf=$gameSystem[_0x1cb4f0(0x579)](),_0x157119=_0x1f0a73['x']+Math[_0x1cb4f0(0x1fc)](_0x1f0a73['width']/0x2)+_0x53e5cf;_0x290fe8['x']=_0x290fe8[_0x1cb4f0(0x21b)]/-0x2+_0x157119,_0x290fe8['y']=Math[_0x1cb4f0(0x1fc)](_0x1f0a73[_0x1cb4f0(0x23d)]/0x2);},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x58d)]=function(){const _0x227bb1=_0x2e9347;return this[_0x227bb1(0x2ae)]?this[_0x227bb1(0x2ae)][_0x227bb1(0x3d3)]:0x3;},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x244)]=function(){const _0x3bb6a0=_0x2e9347;return VisuMZ[_0x3bb6a0(0x2c2)][_0x3bb6a0(0x20a)][_0x3bb6a0(0x2a3)]['CmdHideDisabled'];},Window_ShopCommand['prototype'][_0x2e9347(0x211)]=function(){const _0x1e508f=_0x2e9347;this[_0x1e508f(0x42c)](),this[_0x1e508f(0x600)](),this[_0x1e508f(0x258)]();},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x474)]=function(){const _0x5a7b22=_0x2e9347;Window_HorzCommand[_0x5a7b22(0x655)][_0x5a7b22(0x474)][_0x5a7b22(0x51f)](this),this['refreshCursor']();},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x42c)]=function(){const _0x4e91c9=_0x2e9347,_0x578a9f=this[_0x4e91c9(0x2ff)](),_0x574f28=VisuMZ[_0x4e91c9(0x2c2)][_0x4e91c9(0x20a)][_0x4e91c9(0x2a3)][_0x4e91c9(0x153)],_0x1765e0=_0x578a9f===_0x4e91c9(0x1f4)?TextManager[_0x4e91c9(0x288)]:_0x4e91c9(0x5e9)['format'](_0x574f28,TextManager['buy']),_0x29c1f0=this[_0x4e91c9(0x480)]();if(this[_0x4e91c9(0x244)]()&&!_0x29c1f0)return;this['addCommand'](_0x1765e0,'buy',_0x29c1f0);},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x480)]=function(){const _0x3a70fa=_0x2e9347;if(SceneManager[_0x3a70fa(0x1c8)][_0x3a70fa(0x654)]===Scene_Shop){if(_0x3a70fa(0x665)==='SLfbx')return SceneManager['_scene'][_0x3a70fa(0x5a2)]>0x0;else _0x3b815a=_0x3b6cf0[_0x3a70fa(0x4de)](_0x1ae9dd),_0x50950b=_0x1503f8-_0x493c7d['param'](_0x286765),this[_0x3a70fa(0x6ac)](_0x1e9aa2[_0x3a70fa(0x67b)](_0x14c18d)),_0x4ca935=(_0x1a471d>=0x0?'+':'')+_0x135f9a;}else{if(_0x3a70fa(0x314)===_0x3a70fa(0x352)){const _0x2e6a7b=_0x5b692f['armors']()[_0x3a70fa(0x4aa)](_0x9c3f5a=>_0x417062['isArtifact'](_0x9c3f5a));for(const _0x43588b of _0x2e6a7b){const _0x440470=this[_0x3a70fa(0x187)](_0x43588b);if(_0x440470)this[_0x3a70fa(0x5eb)](_0x43588b,_0x440470);}}else return!![];}},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x600)]=function(){const _0x4944eb=_0x2e9347,_0x14cd1a=this[_0x4944eb(0x2ff)](),_0x2c17e9=VisuMZ[_0x4944eb(0x2c2)]['Settings'][_0x4944eb(0x2a3)][_0x4944eb(0x1be)],_0x222ff8=_0x14cd1a===_0x4944eb(0x1f4)?TextManager['sell']:'\x5cI[%1]%2'[_0x4944eb(0x410)](_0x2c17e9,TextManager[_0x4944eb(0x3c6)]),_0x133ba9=this[_0x4944eb(0x27f)]();if(this[_0x4944eb(0x244)]()&&!_0x133ba9)return;this[_0x4944eb(0x234)](_0x222ff8,_0x4944eb(0x3c6),_0x133ba9);},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x27f)]=function(){const _0x5283f4=_0x2e9347;return!this[_0x5283f4(0x1cf)];},Window_ShopCommand[_0x2e9347(0x655)]['addCancelCommand']=function(){const _0x14c160=_0x2e9347,_0x2eb43d=this[_0x14c160(0x2ff)](),_0x4c253c=VisuMZ['ItemsEquipsCore'][_0x14c160(0x20a)][_0x14c160(0x2a3)][_0x14c160(0x354)],_0xbb0146=VisuMZ[_0x14c160(0x2c2)]['Settings'][_0x14c160(0x2a3)]['CmdCancelRename'],_0x255697=_0x2eb43d===_0x14c160(0x1f4)?_0xbb0146:'\x5cI[%1]%2'['format'](_0x4c253c,_0xbb0146);this[_0x14c160(0x234)](_0x255697,'cancel');},Window_ShopCommand['prototype'][_0x2e9347(0x1a0)]=function(){const _0x5e4f9c=_0x2e9347;return VisuMZ['ItemsEquipsCore'][_0x5e4f9c(0x20a)][_0x5e4f9c(0x2a3)][_0x5e4f9c(0x2b1)];},Window_ShopCommand['prototype'][_0x2e9347(0x597)]=function(_0x4435e0){const _0x774385=_0x2e9347,_0x23f96c=this[_0x774385(0x433)](_0x4435e0);if(_0x23f96c==='iconText'){if('yjoMV'!=='yjoMV'){const _0x3a0820=_0x3565ae[_0x774385(0x1c8)];if(_0x3a0820&&_0x3a0820[_0x774385(0x510)])return _0x3a0820[_0x774385(0x510)]();return null;}else this[_0x774385(0x4a4)](_0x4435e0);}else{if(_0x23f96c===_0x774385(0x23e)){if(_0x774385(0x544)!=='WBOEW')this[_0x774385(0x65a)](_0x4435e0);else{if(_0x31b07d[_0x774385(0x3e8)])return _0x3dfc03[_0x774385(0x2c2)][_0x774385(0x283)][_0x774385(0x51f)](this);return _0xe89986[_0x774385(0x533)](_0x1b56f1[_0x774385(0x2c2)]['Window_ShopBuy_item'][_0x774385(0x51f)](this));}}else{if(_0x774385(0x2a5)===_0x774385(0x2a5))Window_HorzCommand[_0x774385(0x655)][_0x774385(0x597)][_0x774385(0x51f)](this,_0x4435e0);else{const _0x251292=this[_0x774385(0x4da)]['removeBuff'][_0x241e53],_0xb90299=_0x1364ce[_0x774385(0x655)][_0x774385(0x467)](0x1,_0x251292);if(_0xb90299>0x0){_0x365eac+='\x5cI[%1]'['format'](_0xb90299),_0x4e92a0++;if(_0x4591e5>=_0x331ac5)return _0x1853e7;}}}}},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x2ff)]=function(){const _0x4f55e2=_0x2e9347;return VisuMZ[_0x4f55e2(0x2c2)][_0x4f55e2(0x20a)]['ShopScene'][_0x4f55e2(0x4dc)];},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x433)]=function(_0x264954){const _0x1ae1e1=_0x2e9347;if(_0x264954<0x0)return _0x1ae1e1(0x1f4);const _0x2d20e3=this['commandStyle']();if(_0x2d20e3!==_0x1ae1e1(0x38a))return'ScTyp'===_0x1ae1e1(0x454)?_0x2d20e3:0x0;else{if(this[_0x1ae1e1(0x361)]()>0x0){const _0x23d21d=this['commandName'](_0x264954);if(_0x23d21d[_0x1ae1e1(0x1f9)](/\\I\[(\d+)\]/i)){const _0x23e523=this[_0x1ae1e1(0x67f)](_0x264954),_0x3ff72c=this[_0x1ae1e1(0x282)](_0x23d21d)[_0x1ae1e1(0x21b)];if(_0x3ff72c<=_0x23e523[_0x1ae1e1(0x21b)]){if(_0x1ae1e1(0x586)===_0x1ae1e1(0x4fc))_0xe68323=0x0;else return'iconText';}else return _0x1ae1e1(0x5cc)===_0x1ae1e1(0x5cc)?_0x1ae1e1(0x23e):this['isUseItemsEquipsCoreUpdatedLayout']()?this[_0x1ae1e1(0x214)]():_0x2c9175['ItemsEquipsCore'][_0x1ae1e1(0x663)][_0x1ae1e1(0x51f)](this);}}}return _0x1ae1e1(0x1f4);},Window_ShopCommand[_0x2e9347(0x655)][_0x2e9347(0x4a4)]=function(_0x3db173){const _0x586558=_0x2e9347,_0x315fcb=this[_0x586558(0x67f)](_0x3db173),_0x10c8ce=this['commandName'](_0x3db173),_0x4fb43d=this['textSizeEx'](_0x10c8ce)['width'];this[_0x586558(0x4f8)](this['isCommandEnabled'](_0x3db173));const _0x46cf87=this['itemTextAlign']();if(_0x46cf87===_0x586558(0x5a1))_0x586558(0x1a5)===_0x586558(0x30f)?this[_0x586558(0x3ea)](_0x1bf2cb):this[_0x586558(0x53b)](_0x10c8ce,_0x315fcb['x']+_0x315fcb[_0x586558(0x21b)]-_0x4fb43d,_0x315fcb['y'],_0x4fb43d);else{if(_0x46cf87===_0x586558(0x5a6)){const _0x2419b7=_0x315fcb['x']+Math[_0x586558(0x1fc)]((_0x315fcb[_0x586558(0x21b)]-_0x4fb43d)/0x2);this['drawTextEx'](_0x10c8ce,_0x2419b7,_0x315fcb['y'],_0x4fb43d);}else this[_0x586558(0x53b)](_0x10c8ce,_0x315fcb['x'],_0x315fcb['y'],_0x4fb43d);}},Window_ShopCommand['prototype'][_0x2e9347(0x65a)]=function(_0x189be4){const _0x3ad80e=_0x2e9347;this[_0x3ad80e(0x407)](_0x189be4)[_0x3ad80e(0x1f9)](/\\I\[(\d+)\]/i);const _0x3d7059=Number(RegExp['$1'])||0x0,_0x20f098=this['itemLineRect'](_0x189be4),_0x5d1cb9=_0x20f098['x']+Math[_0x3ad80e(0x1fc)]((_0x20f098[_0x3ad80e(0x21b)]-ImageManager['iconWidth'])/0x2),_0x130d84=_0x20f098['y']+(_0x20f098[_0x3ad80e(0x23d)]-ImageManager['iconHeight'])/0x2;this[_0x3ad80e(0x262)](_0x3d7059,_0x5d1cb9,_0x130d84);},VisuMZ['ItemsEquipsCore']['Window_ShopBuy_refresh']=Window_ShopBuy[_0x2e9347(0x655)]['refresh'],Window_ShopBuy[_0x2e9347(0x655)][_0x2e9347(0x474)]=function(){const _0x5a2ddf=_0x2e9347;this[_0x5a2ddf(0x2c4)](),VisuMZ[_0x5a2ddf(0x2c2)][_0x5a2ddf(0x383)][_0x5a2ddf(0x51f)](this);},Window_ShopBuy[_0x2e9347(0x655)]['updateMoneyAmount']=function(){const _0x30f6b7=_0x2e9347;SceneManager['_scene'][_0x30f6b7(0x654)]===Scene_Shop&&(this['_money']=SceneManager[_0x30f6b7(0x1c8)][_0x30f6b7(0x680)]());},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x44e)]=Window_ShopBuy['prototype'][_0x2e9347(0x470)],Window_ShopBuy[_0x2e9347(0x655)]['price']=function(_0x2500cc){const _0x1300e7=_0x2e9347;if(!_0x2500cc)return 0x0;let _0x411422=VisuMZ[_0x1300e7(0x2c2)]['Window_ShopBuy_price'][_0x1300e7(0x51f)](this,_0x2500cc);return Math[_0x1300e7(0x539)](0x0,this[_0x1300e7(0x4b2)](_0x2500cc,_0x411422));},Window_ShopBuy[_0x2e9347(0x655)][_0x2e9347(0x4b2)]=function(_0x338490,_0x4533de){const _0x5480fc=_0x2e9347,_0x5aac45=_0x338490[_0x5480fc(0x2c0)];if(_0x5aac45[_0x5480fc(0x1f9)](/<JS BUY PRICE>\s*([\s\S]*)\s*<\/JS BUY PRICE>/i)){const _0x447676=String(RegExp['$1']);window['price']=_0x4533de,window[_0x5480fc(0x343)]=_0x338490;try{eval(_0x447676);}catch(_0x2c0469){if('kMwvY'!=='kMwvY')return _0x442878[_0x5480fc(0x2c2)]['Settings']['StatusWindow'][_0x5480fc(0x37a)];else{if($gameTemp[_0x5480fc(0x3b4)]())console[_0x5480fc(0x4ad)](_0x2c0469);}}_0x4533de=window[_0x5480fc(0x470)],window[_0x5480fc(0x470)]=undefined,window[_0x5480fc(0x343)]=undefined;}_0x4533de=VisuMZ[_0x5480fc(0x2c2)][_0x5480fc(0x20a)][_0x5480fc(0x2a3)][_0x5480fc(0x53c)][_0x5480fc(0x51f)](this,_0x338490,_0x4533de);if(isNaN(_0x4533de))_0x4533de=0x0;return Math[_0x5480fc(0x1fc)](_0x4533de);},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x429)]=Window_ShopBuy[_0x2e9347(0x655)][_0x2e9347(0x1cb)],Window_ShopBuy[_0x2e9347(0x655)]['goodsToItem']=function(_0x37f7a2){const _0x13694c=_0x2e9347,_0x2db818=VisuMZ[_0x13694c(0x2c2)][_0x13694c(0x429)][_0x13694c(0x51f)](this,_0x37f7a2);return _0x2db818&&!this[_0x13694c(0x30b)](_0x2db818)?null:_0x2db818;},VisuMZ['ItemsEquipsCore'][_0x2e9347(0x5b8)]={'ShowAllSwitches':/<SHOW SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'ShowAnySwitches':/<SHOW SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'HideAllSwitches':/<HIDE SHOP (?:ALL |)SWITCH(?:|ES):[ ](.*)>/i,'HideAnySwitches':/<HIDE SHOP ANY SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOn':/<BUY TURN ON SWITCH(?:|ES):[ ](.*)>/i,'BuyTurnSwitchOff':/<BUY TURN OFF SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOn':/<SELL TURN ON SWITCH(?:|ES):[ ](.*)>/i,'SellTurnSwitchOff':/<SELL TURN OFF SWITCH(?:|ES):[ ](.*)>/i},Window_ShopBuy[_0x2e9347(0x655)][_0x2e9347(0x30b)]=function(_0x1723d5){const _0x37cd8e=_0x2e9347;if(!_0x1723d5)return![];const _0x404c14=VisuMZ['ItemsEquipsCore'][_0x37cd8e(0x5b8)],_0x4b7f5f=_0x1723d5?_0x1723d5[_0x37cd8e(0x2c0)]||'':'';if(_0x4b7f5f['match'](_0x404c14['ShowAllSwitches'])){const _0x154e23=String(RegExp['$1'])['split'](',')[_0x37cd8e(0x6a3)](_0x52af18=>Number(_0x52af18));if(_0x154e23[_0x37cd8e(0x151)](_0x3768a2=>!$gameSwitches[_0x37cd8e(0x334)](_0x3768a2)))return![];}if(_0x4b7f5f[_0x37cd8e(0x1f9)](_0x404c14['ShowAnySwitches'])){const _0x2e63ae=String(RegExp['$1'])[_0x37cd8e(0x47f)](',')[_0x37cd8e(0x6a3)](_0x1d21eb=>Number(_0x1d21eb));if(_0x2e63ae[_0x37cd8e(0x296)](_0x2a01c7=>!$gameSwitches[_0x37cd8e(0x334)](_0x2a01c7)))return![];}if(_0x4b7f5f[_0x37cd8e(0x1f9)](_0x404c14['HideAllSwitches'])){const _0x7a337d=String(RegExp['$1'])['split'](',')[_0x37cd8e(0x6a3)](_0x31da14=>Number(_0x31da14));if(_0x7a337d[_0x37cd8e(0x296)](_0x4f3bd9=>$gameSwitches[_0x37cd8e(0x334)](_0x4f3bd9)))return![];}if(_0x4b7f5f[_0x37cd8e(0x1f9)](_0x404c14[_0x37cd8e(0x23f)])){const _0x14399c=String(RegExp['$1'])[_0x37cd8e(0x47f)](',')[_0x37cd8e(0x6a3)](_0x3ed3da=>Number(_0x3ed3da));if(_0x14399c[_0x37cd8e(0x151)](_0x2817c4=>$gameSwitches[_0x37cd8e(0x334)](_0x2817c4)))return![];}return!![];},Window_ShopBuy[_0x2e9347(0x655)][_0x2e9347(0x597)]=function(_0x1c708f){const _0x3e7e17=_0x2e9347;this[_0x3e7e17(0x3d6)]();const _0x2d9371=this['itemAt'](_0x1c708f),_0x260cd5=this[_0x3e7e17(0x67f)](_0x1c708f),_0x2ae19d=_0x260cd5['width'];this['changePaintOpacity'](this[_0x3e7e17(0x503)](_0x2d9371)),this[_0x3e7e17(0x69b)](_0x2d9371,_0x260cd5['x'],_0x260cd5['y'],_0x2ae19d),this['drawItemCost'](_0x2d9371,_0x260cd5),this[_0x3e7e17(0x4f8)](!![]);},Window_ShopBuy[_0x2e9347(0x655)][_0x2e9347(0x3be)]=function(_0x1f6292,_0x56d5a7){const _0x3d2e1d=_0x2e9347,_0x3b3fed=this['price'](_0x1f6292);this['drawCurrencyValue'](_0x3b3fed,TextManager[_0x3d2e1d(0x2e3)],_0x56d5a7['x'],_0x56d5a7['y'],_0x56d5a7[_0x3d2e1d(0x21b)]);},Window_ShopSell[_0x2e9347(0x655)]['maxCols']=function(){return SceneManager['_scene']['isUseItemsEquipsCoreUpdatedLayout']()?0x1:0x2;},VisuMZ[_0x2e9347(0x2c2)]['Window_ShopSell_isEnabled']=Window_ShopSell[_0x2e9347(0x655)][_0x2e9347(0x503)],Window_ShopSell[_0x2e9347(0x655)][_0x2e9347(0x503)]=function(_0x47e0ab){const _0x2bf3ed=_0x2e9347;if(!_0x47e0ab)return![];const _0x2e3261=_0x47e0ab['note'];if(_0x2e3261['match'](/<CANNOT SELL>/i))return![];if(_0x2e3261[_0x2bf3ed(0x1f9)](/<CAN SELL>/i))return!![];if(_0x2e3261['match'](/<CANNOT SELL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x2bf3ed(0x4df)!=='oemqf'){const _0x54acb6=JSON[_0x2bf3ed(0x233)]('['+RegExp['$1'][_0x2bf3ed(0x1f9)](/\d+/g)+']');for(const _0x3022b8 of _0x54acb6){if(!$gameSwitches[_0x2bf3ed(0x334)](_0x3022b8))return![];}}else return this[_0x2bf3ed(0x204)]?this['_shopStatusMenuAlly']?_0x28c953[_0x2bf3ed(0x35c)]:0x1:_0x5cd939[_0x2bf3ed(0x2c2)][_0x2bf3ed(0x376)]['call'](this,_0x14b035);}if(_0x2e3261[_0x2bf3ed(0x1f9)](/<CANNOT SELL ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x431435=JSON[_0x2bf3ed(0x233)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1b6639 of _0x431435){if(_0x2bf3ed(0x1cc)===_0x2bf3ed(0x1cc)){if(!$gameSwitches[_0x2bf3ed(0x334)](_0x1b6639))return![];}else this['onCategoryCancelItemsEquipsCore']();}}if(_0x2e3261[_0x2bf3ed(0x1f9)](/<CANNOT SELL ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xfb6063=JSON['parse']('['+RegExp['$1'][_0x2bf3ed(0x1f9)](/\d+/g)+']');for(const _0x4cb995 of _0xfb6063){if($gameSwitches[_0x2bf3ed(0x334)](_0x4cb995))return![];}}return VisuMZ[_0x2bf3ed(0x2c2)][_0x2bf3ed(0x2b6)][_0x2bf3ed(0x51f)](this,_0x47e0ab);},Window_ShopStatus[_0x2e9347(0x6a2)]=VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x20a)]['StatusWindow'][_0x2e9347(0x18e)]??0xf0,VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x68a)]=Window_ShopStatus['prototype'][_0x2e9347(0x379)],Window_ShopStatus['prototype'][_0x2e9347(0x379)]=function(_0x28a29f){const _0x5d3d5a=_0x2e9347;_0x28a29f=DataManager[_0x5d3d5a(0x533)](_0x28a29f),DataManager[_0x5d3d5a(0x514)](_0x28a29f)||DataManager[_0x5d3d5a(0x392)](_0x28a29f)?_0x5d3d5a(0x2d9)===_0x5d3d5a(0x47c)?_0x34859a=_0x5d3d5a(0x368)[_0x5d3d5a(0x410)](_0xe16c14['id']):this[_0x5d3d5a(0x505)](_0x28a29f):VisuMZ[_0x5d3d5a(0x2c2)][_0x5d3d5a(0x68a)][_0x5d3d5a(0x51f)](this,_0x28a29f);},Window_ShopStatus['prototype'][_0x2e9347(0x505)]=function(_0x2749dd){const _0x495832=_0x2e9347;this['_item']=_0x2749dd;const _0x491042=Window_ShopStatus['EQUIP_DELAY_MS'];setTimeout(this[_0x495832(0x68d)][_0x495832(0x245)](this,_0x2749dd),_0x491042);},Window_ShopStatus['prototype']['refreshDelay']=function(_0x430c6e){const _0x129e06=_0x2e9347;if(this[_0x129e06(0x2f1)]===_0x430c6e){if(_0x129e06(0x5e2)===_0x129e06(0x695)){if(!this[_0x129e06(0x392)](_0x19feae))return![];const _0x5f0e60=_0x22455d[_0x129e06(0x2c0)];if(!_0x5f0e60)return![];if(_0x5f0e60[_0x129e06(0x1f9)](/<(?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5f0e60[_0x129e06(0x1f9)](/<(?:STACKABLE|STACK) (?:PARTY|ALLY) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5f0e60[_0x129e06(0x1f9)](/<(?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];if(_0x5f0e60['match'](/<(?:STACKABLE|STACK) (?:TROOP|FOE) (?:ARTIFACT|RELIC)>/i))return!![];return![];}else this[_0x129e06(0x474)]();}},Window_ShopStatus['prototype'][_0x2e9347(0x574)]=function(){return![];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x66d)]=function(){const _0x51067d=_0x2e9347;Window_StatusBase[_0x51067d(0x655)][_0x51067d(0x66d)][_0x51067d(0x51f)](this);for(const _0xad01a1 of $gameParty[_0x51067d(0x460)]()){_0x51067d(0x319)==='NLAOz'?(_0x482d2e=_0x2efe8d(_0x178d32['$1']),_0x649cdc=_0x2bc831(_0x38b18a['$2'])):ImageManager[_0x51067d(0x197)](_0xad01a1[_0x51067d(0x635)]());}},Window_ShopStatus[_0x2e9347(0x655)]['translucentOpacity']=function(){const _0x58ab8e=_0x2e9347;return VisuMZ['ItemsEquipsCore'][_0x58ab8e(0x20a)][_0x58ab8e(0x375)][_0x58ab8e(0x49f)];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x474)]=function(){const _0x53bf16=_0x2e9347;this[_0x53bf16(0x267)][_0x53bf16(0x5c7)](),this[_0x53bf16(0x2a2)][_0x53bf16(0x5c7)]();if(this[_0x53bf16(0x2f1)]){this['resetFontSettings'](),this[_0x53bf16(0x4f8)](!![]),this[_0x53bf16(0x4d1)]();if(this[_0x53bf16(0x15e)]())this[_0x53bf16(0x513)]();else{if(_0x53bf16(0x4fb)==='CgCkE')this[_0x53bf16(0x64f)]();else{const _0x450ea3=_0x3747d8[_0x53bf16(0x1c8)][_0x53bf16(0x23c)];if(!_0x450ea3)return;if(!_0x450ea3[_0x53bf16(0x4cd)](_0x13733d))return![];const _0x17fa8f=_0x450ea3[_0x53bf16(0x3b3)]()[_0x515e1c];if(_0x450ea3[_0x53bf16(0x683)]()[_0x53bf16(0x5e8)](_0x17fa8f))return![];return!![];;}}this[_0x53bf16(0x1e7)]();}},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x408)]=function(_0x4cc064,_0x11ceca){const _0x311197=_0x2e9347;if(!this[_0x311197(0x15e)]()&&!DataManager[_0x311197(0x207)](this[_0x311197(0x2f1)]))return;const _0x202fd6=this[_0x311197(0x225)]-this['itemPadding']()-_0x4cc064,_0x45d381=this[_0x311197(0x6bc)](_0x311197(0x678));this[_0x311197(0x6ac)](ColorManager[_0x311197(0x3bb)]()),this[_0x311197(0x1a1)](TextManager[_0x311197(0x6b1)],_0x4cc064+this[_0x311197(0x1fe)](),_0x11ceca,_0x202fd6-_0x45d381),this[_0x311197(0x6ba)](),this[_0x311197(0x222)](this['_item'],_0x4cc064,_0x11ceca,_0x202fd6);},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x5a5)]=function(_0x50023e,_0x261a67,_0x1d3981,_0x2870d5,_0xa0bcf9){const _0x46a71e=_0x2e9347;if(VisuMZ['ItemsEquipsCore'][_0x46a71e(0x20a)][_0x46a71e(0x375)][_0x46a71e(0x22a)]===![])return;_0xa0bcf9=Math[_0x46a71e(0x539)](_0xa0bcf9||0x1,0x1);while(_0xa0bcf9--){if(_0x46a71e(0x2ad)!==_0x46a71e(0x394)){_0x2870d5=_0x2870d5||this[_0x46a71e(0x35e)](),this[_0x46a71e(0x2a2)][_0x46a71e(0x3a8)]=0xa0;const _0x462f1d=ColorManager[_0x46a71e(0x1ce)]();this[_0x46a71e(0x2a2)]['fillRect'](_0x50023e+0x1,_0x261a67+0x1,_0x1d3981-0x2,_0x2870d5-0x2,_0x462f1d),this[_0x46a71e(0x2a2)]['paintOpacity']=0xff;}else return this[_0x46a71e(0x2f1)]['price']*this['sellPriceRate']();}},ColorManager['getItemsEquipsCoreBackColor1']=function(){const _0x3c428f=_0x2e9347,_0x5f0944=VisuMZ[_0x3c428f(0x2c2)][_0x3c428f(0x20a)][_0x3c428f(0x375)];let _0x5af1b8=_0x5f0944['BackRectColor']!==undefined?_0x5f0944['BackRectColor']:0x13;return ColorManager[_0x3c428f(0x57e)](_0x5af1b8);},Window_ShopStatus[_0x2e9347(0x655)]['drawEquipData']=function(){const _0x255eb1=_0x2e9347;this[_0x255eb1(0x5bc)]=null;if(VisuMZ['ItemsEquipsCore'][_0x255eb1(0x20a)][_0x255eb1(0x375)][_0x255eb1(0x630)]){if('QXkWd'===_0x255eb1(0x4ed))_0x2511ba=_0xe80fee[_0x255eb1(0x539)](this[_0x255eb1(0x2df)](_0x4a1ef7,_0x39baa9+0x4,_0x444ea2+0x4,_0x210ebe),_0x6f3042),_0x3ace25+=_0x2fe35c;else{VisuMZ[_0x255eb1(0x2c2)][_0x255eb1(0x20a)][_0x255eb1(0x375)][_0x255eb1(0x630)][_0x255eb1(0x51f)](this);return;}}const _0x35fd00=this[_0x255eb1(0x35e)](),_0x40381b=this[_0x255eb1(0x26d)]()+0x8;let _0x2834d0=0x0,_0x1b5196=0x0,_0x13de2b=this['innerWidth'],_0x44aba5=this[_0x255eb1(0x472)],_0x4c0fcd=Math[_0x255eb1(0x1fc)](_0x13de2b/0x2),_0x27a832=_0x2834d0+_0x13de2b-_0x4c0fcd;this['drawItemName'](this[_0x255eb1(0x2f1)],_0x2834d0+this[_0x255eb1(0x1fe)](),_0x1b5196,_0x13de2b-this['itemPadding']()*0x2),this[_0x255eb1(0x5a5)](_0x2834d0,_0x1b5196,_0x13de2b),_0x1b5196+=_0x35fd00;if(this[_0x255eb1(0x26f)](_0x2834d0,_0x1b5196,_0x4c0fcd))_0x1b5196+=0x0;if(this[_0x255eb1(0x3ef)](_0x27a832,_0x1b5196,_0x4c0fcd))_0x1b5196+=_0x35fd00;const _0x31c2ad=this[_0x255eb1(0x1fb)](),_0xfc00e3=_0x1b5196;_0x1b5196=_0x44aba5-_0x31c2ad['length']*_0x40381b-0x4;let _0x19accf=_0x2834d0,_0x1677b7=0x0,_0x32153a=_0x1b5196;for(const _0x2334e0 of _0x31c2ad){_0x1677b7=Math['max'](this[_0x255eb1(0x2df)](_0x2334e0,_0x2834d0+0x4,_0x1b5196+0x4,_0x13de2b),_0x1677b7),_0x1b5196+=_0x40381b;}const _0x12ecbd=$gameParty[_0x255eb1(0x277)](),_0x1895b3=Math[_0x255eb1(0x1fc)]((_0x13de2b-_0x1677b7)/_0x12ecbd);_0x1677b7=_0x13de2b-_0x1895b3*_0x12ecbd;for(const _0x29330a of $gameParty[_0x255eb1(0x650)]()){const _0x367da4=$gameParty['battleMembers']()[_0x255eb1(0x22f)](_0x29330a),_0x518dad=_0x19accf+_0x1677b7+_0x367da4*_0x1895b3;this['changePaintOpacity'](_0x29330a[_0x255eb1(0x4bb)](this[_0x255eb1(0x2f1)])),this[_0x255eb1(0x60b)](_0x29330a,_0x518dad+_0x1895b3/0x2,_0x32153a);let _0x39d6e6=_0x32153a;for(const _0x39501d of _0x31c2ad){if(_0x255eb1(0x59d)===_0x255eb1(0x652))return _0x556bf7[_0x255eb1(0x2c2)][_0x255eb1(0x20a)][_0x255eb1(0x2a3)][_0x255eb1(0x5e1)];else{const _0xbf55c3=_0x39d6e6-(_0x35fd00-_0x40381b)/0x2;this['drawActorParamDifference'](_0x29330a,_0x39501d,_0x518dad,_0xbf55c3,_0x1895b3),_0x39d6e6+=_0x40381b;}}}this[_0x255eb1(0x5a5)](_0x19accf,_0xfc00e3,_0x1677b7,_0x32153a-_0xfc00e3);for(let _0x1f02b8=0x0;_0x1f02b8<_0x12ecbd;_0x1f02b8++){const _0x3154bc=_0x19accf+_0x1677b7+_0x1f02b8*_0x1895b3;this['drawItemDarkRect'](_0x3154bc,_0xfc00e3,_0x1895b3,_0x32153a-_0xfc00e3);}for(const _0x2ff317 of _0x31c2ad){this[_0x255eb1(0x5a5)](_0x19accf,_0x32153a,_0x1677b7,_0x40381b);for(let _0x15ef26=0x0;_0x15ef26<_0x12ecbd;_0x15ef26++){const _0x1efc24=_0x19accf+_0x1677b7+_0x15ef26*_0x1895b3;this['drawItemDarkRect'](_0x1efc24,_0x32153a,_0x1895b3,_0x40381b);}_0x32153a+=_0x40381b;}},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x26f)]=function(_0x58272f,_0x3d1d5a,_0x4c7088){const _0x2d7d22=_0x2e9347;if(!this['isEquipItem']())return![];const _0x2e1c7c=$dataSystem['equipTypes'][this[_0x2d7d22(0x2f1)]['etypeId']];return this[_0x2d7d22(0x608)](_0x2e1c7c,_0x58272f,_0x3d1d5a,_0x4c7088,!![]),this[_0x2d7d22(0x5a5)](_0x58272f,_0x3d1d5a,_0x4c7088),this[_0x2d7d22(0x3d6)](),!![];},Window_ShopStatus['prototype'][_0x2e9347(0x4ba)]=function(){const _0x583537=_0x2e9347,_0x591107=VisuMZ[_0x583537(0x2c2)][_0x583537(0x20a)][_0x583537(0x66f)][_0x583537(0x6b3)];return _0x591107[_0x583537(0x410)]($gameParty[_0x583537(0x187)](this[_0x583537(0x2f1)]));},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x1fb)]=function(){const _0x149213=_0x2e9347;let _0x7f2f3a=[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];if(Imported[_0x149213(0x206)]){if(_0x149213(0x653)!==_0x149213(0x3e9))_0x7f2f3a=VisuMZ[_0x149213(0x378)][_0x149213(0x20a)][_0x149213(0x195)][_0x149213(0x666)];else{const _0x1b10ec=this[_0x149213(0x387)](),_0x119f3b=this[_0x149213(0x266)](0x1,!![]),_0x569021=this['isRightInputMode']()?0x0:_0xf7d053['boxWidth']-_0x1b10ec,_0x394b81=this['mainAreaTop']();return new _0x200633(_0x569021,_0x394b81,_0x1b10ec,_0x119f3b);}}return _0x7f2f3a=_0x7f2f3a['map'](_0x2a309d=>typeof _0x2a309d==='number'?_0x2a309d:_0x2a309d[_0x149213(0x20b)]()[_0x149213(0x515)]()),_0x7f2f3a;},Window_ShopStatus[_0x2e9347(0x655)]['smallParamFontSize']=function(){const _0x36b930=_0x2e9347;return VisuMZ['ItemsEquipsCore'][_0x36b930(0x20a)][_0x36b930(0x375)]['ParamChangeFontSize'];},Window_ShopStatus['prototype'][_0x2e9347(0x2df)]=function(_0x133ed4,_0x4242c6,_0xb39048,_0x4565b3){const _0x588150=_0x2e9347;this[_0x588150(0x3d6)](),this['contents']['fontSize']=this[_0x588150(0x1c1)]();let _0x5727cd=this[_0x588150(0x6bc)](TextManager['param'](_0x133ed4))+0x4+_0x4242c6;return Imported[_0x588150(0x206)]?_0x588150(0x27b)!==_0x588150(0x690)?(this[_0x588150(0x488)](_0x4242c6,_0xb39048,_0x4565b3,_0x133ed4,!![]),VisuMZ[_0x588150(0x378)][_0x588150(0x20a)][_0x588150(0x195)][_0x588150(0x4b0)]&&(_0x5727cd+=ImageManager['iconWidth']+0x4)):(_0x21d980[_0x588150(0x655)][_0x588150(0x547)]['call'](this),this[_0x588150(0x63f)]()):(this['changeTextColor'](ColorManager[_0x588150(0x3bb)]()),this[_0x588150(0x1a1)](TextManager[_0x588150(0x4de)](_0x133ed4),_0x4242c6,_0xb39048,_0x4565b3)),this[_0x588150(0x3d6)](),_0x5727cd;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x3e4)]=function(_0x446799,_0x80b678,_0x54ed1a,_0x1c1f93,_0x318d12){const _0x20cea2=_0x2e9347;_0x54ed1a+=this['itemPadding'](),_0x318d12-=this[_0x20cea2(0x1fe)]()*0x2;const _0x3a3cd5=VisuMZ[_0x20cea2(0x2c2)][_0x20cea2(0x20a)][_0x20cea2(0x375)];this['contents'][_0x20cea2(0x1ee)]=_0x3a3cd5['ParamChangeFontSize'],this[_0x20cea2(0x4f8)](_0x446799[_0x20cea2(0x4bb)](this[_0x20cea2(0x2f1)]));if(_0x446799[_0x20cea2(0x327)](this[_0x20cea2(0x2f1)])&&!_0x446799[_0x20cea2(0x401)](this['_item'])){const _0x305fde=_0x3a3cd5[_0x20cea2(0x4b8)];this[_0x20cea2(0x1a1)](_0x305fde,_0x54ed1a,_0x1c1f93,_0x318d12,_0x20cea2(0x5a6));}else{if(_0x446799['canEquip'](this[_0x20cea2(0x2f1)])){if(_0x20cea2(0x4b5)===_0x20cea2(0x4b5)){const _0x417740=this[_0x20cea2(0x3a3)](_0x446799);let _0x56ec50=0x0,_0x26d9ad=0x0,_0x9a3052=0x0;if(Imported[_0x20cea2(0x206)])_0x56ec50=_0x417740[_0x20cea2(0x212)](_0x80b678),_0x26d9ad=_0x56ec50-_0x446799['paramValueByName'](_0x80b678),this['changeTextColor'](ColorManager[_0x20cea2(0x67b)](_0x26d9ad)),_0x9a3052=(_0x26d9ad>=0x0?'+':'')+VisuMZ[_0x20cea2(0x1bd)](_0x26d9ad,0x0,_0x80b678);else{if(_0x20cea2(0x412)===_0x20cea2(0x412))_0x56ec50=_0x417740['param'](_0x80b678),_0x26d9ad=_0x56ec50-_0x446799['param'](_0x80b678),this[_0x20cea2(0x6ac)](ColorManager['paramchangeTextColor'](_0x26d9ad)),_0x9a3052=(_0x26d9ad>=0x0?'+':'')+_0x26d9ad;else{if(this[_0x20cea2(0x5bc)])return;if(!_0x3f2a10[_0x20cea2(0x2c2)][_0x20cea2(0x20a)][_0x20cea2(0x575)]['EquipAdjustHpMp'])return;const _0x17530f=_0x2b2592[_0x20cea2(0x48d)](_0x526c44[_0x20cea2(0x2e4)]()*this[_0x20cea2(0x669)]),_0x173e33=_0x387e88[_0x20cea2(0x48d)](_0x18bb6d[_0x20cea2(0x26b)]()*this[_0x20cea2(0x274)]);if(this['hp']>0x0)this['setHp'](_0x17530f);if(this['mp']>0x0)this[_0x20cea2(0x3d2)](_0x173e33);}}if(_0x9a3052==='+0'){if(_0x20cea2(0x3fa)!==_0x20cea2(0x2e2))_0x9a3052=_0x3a3cd5['NoChangeMarker'];else{const _0x75049d=this[_0x20cea2(0x660)](),_0x149d50=this[_0x20cea2(0x4b7)]()-this[_0x20cea2(0x33d)]['height'],_0x211811=this[_0x20cea2(0x290)]()?0x0:_0x2c0ee4[_0x20cea2(0x257)]-_0x75049d,_0x2732bd=this[_0x20cea2(0x33d)]['y']+this['_commandWindow'][_0x20cea2(0x23d)];return new _0x4ca568(_0x211811,_0x2732bd,_0x75049d,_0x149d50);}}this[_0x20cea2(0x1a1)](_0x9a3052,_0x54ed1a,_0x1c1f93,_0x318d12,'center');}else return _0x27e2ef[_0x20cea2(0x2c2)][_0x20cea2(0x20a)][_0x20cea2(0x2a3)][_0x20cea2(0x2b1)];}else{const _0x553f0e=_0x3a3cd5['CannotEquipMarker'];this[_0x20cea2(0x1a1)](_0x553f0e,_0x54ed1a,_0x1c1f93,_0x318d12,'center');}}this['resetFontSettings'](),this[_0x20cea2(0x4f8)](!![]);},Window_ShopStatus[_0x2e9347(0x655)]['createTempActorEquips']=function(_0x312232){const _0x2c1490=_0x2e9347;if(this[_0x2c1490(0x464)](_0x312232)){if(_0x2c1490(0x391)===_0x2c1490(0x391)){const _0x376630=JsonEx[_0x2c1490(0x68b)](_0x312232);_0x376630[_0x2c1490(0x5bc)]=!![];const _0x3bb47a=_0x376630[_0x2c1490(0x1c6)](this['_item']);if(_0x3bb47a>=0x0){if(_0x2c1490(0x6a6)==='oxkhR')_0x376630['forceChangeEquip'](_0x3bb47a,this[_0x2c1490(0x2f1)]);else return _0x160db0[_0x2c1490(0x2c2)][_0x2c1490(0x20a)][_0x2c1490(0x66f)][_0x2c1490(0x2d8)][_0x2c1490(0x51f)](this);}this[_0x2c1490(0x5bc)]=_0x376630;}else{if(_0x1fbbdd&&this['_actor']){if(this[_0x2c1490(0x507)](_0x10341b))return![];if(this['isSoleWeaponType'](_0x12e7f7))return![];if(this[_0x2c1490(0x3ee)](_0x374e91))return![];if(!this['_actor'][_0x2c1490(0x4bb)](_0x3a4bd2))return![];}if(!_0x1a6096)return!this[_0x2c1490(0x683)]()[_0x2c1490(0x5e8)](this[_0x2c1490(0x15c)]());return _0x381b75[_0x2c1490(0x2c2)][_0x2c1490(0x1e6)][_0x2c1490(0x51f)](this,_0x4aae5b);}}return this['_tempActor'];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x464)]=function(_0x305090){const _0x47c2cc=_0x2e9347;if(!this[_0x47c2cc(0x5bc)])return!![];return this['_tempActor'][_0x47c2cc(0x320)]()!==_0x305090[_0x47c2cc(0x320)]();},Game_Actor[_0x2e9347(0x655)]['anyEmptyEquipSlotsOfSameEtype']=function(_0x2513f7){const _0x216891=_0x2e9347;if(!_0x2513f7)return![];const _0x42f630=_0x2513f7[_0x216891(0x15c)],_0x2d55fb=this[_0x216891(0x3b3)]();for(let _0x4ed1e4=0x0;_0x4ed1e4<_0x2d55fb[_0x216891(0x3d3)];_0x4ed1e4++){const _0x376877=_0x2d55fb[_0x4ed1e4];if(_0x376877!==_0x42f630)continue;if(!this[_0x216891(0x293)]()[_0x4ed1e4])return!![];}return![];},Game_Actor[_0x2e9347(0x655)][_0x2e9347(0x1c6)]=function(_0x51b346){const _0x4dd821=_0x2e9347;if(!_0x51b346)return-0x1;const _0x4ebaa3=_0x51b346[_0x4dd821(0x15c)],_0x3edf26=this[_0x4dd821(0x3b3)]();let _0x933bb=-0x1;for(let _0x194990=0x0;_0x194990<_0x3edf26[_0x4dd821(0x3d3)];_0x194990++){const _0x9ba663=_0x3edf26[_0x194990];if(_0x9ba663!==_0x4ebaa3)continue;if(!this[_0x4dd821(0x293)]()[_0x194990])return _0x194990;if(_0x933bb<0x0)_0x933bb=_0x194990;}return _0x933bb;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x64f)]=function(){const _0x40e1de=_0x2e9347;VisuMZ[_0x40e1de(0x2c2)][_0x40e1de(0x20a)][_0x40e1de(0x375)][_0x40e1de(0x323)]['call'](this);},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x69b)]=function(_0x2e34e4,_0x214fd1,_0x122a51,_0x1e51c0){const _0x5ea03e=_0x2e9347,_0x3e5b35=DataManager[_0x5ea03e(0x463)](_0x2e34e4,_0x214fd1,_0x122a51,_0x1e51c0)&&Imported['VisuMZ_1_SkillsStatesCore'],_0x55ddba=_0x2e34e4?_0x2e34e4['name']:'';if(_0x3e5b35)Window_SkillList[_0x5ea03e(0x655)][_0x5ea03e(0x5de)][_0x5ea03e(0x51f)](this,_0x2e34e4);Window_Base[_0x5ea03e(0x655)][_0x5ea03e(0x69b)][_0x5ea03e(0x51f)](this,_0x2e34e4,_0x214fd1,_0x122a51,_0x1e51c0);if(_0x3e5b35)_0x2e34e4['name']=_0x55ddba;},Window_ShopStatus[_0x2e9347(0x655)]['prepareItemCustomData']=function(){const _0x197be1=_0x2e9347;this[_0x197be1(0x4ee)]={};if(!this[_0x197be1(0x2f1)])return;const _0x116cdb=this[_0x197be1(0x2f1)][_0x197be1(0x2c0)];if(_0x116cdb[_0x197be1(0x1f9)](/<STATUS INFO>\s*([\s\S]*)\s*<\/STATUS INFO>/i)){if(_0x197be1(0x67d)===_0x197be1(0x67d)){const _0x576f3b=String(RegExp['$1'])['split'](/[\r\n]+/);for(const _0x109967 of _0x576f3b){if(_0x109967['match'](/(.*):[ ](.*)/i)){const _0x200b17=String(RegExp['$1'])[_0x197be1(0x20b)]()[_0x197be1(0x515)](),_0x3876ac=String(RegExp['$2'])[_0x197be1(0x515)]();this[_0x197be1(0x4ee)][_0x200b17]=_0x3876ac;}}}else{const _0x380573=_0x57b391[_0x197be1(0x68b)](this[_0x197be1(0x23c)]);_0x380573[_0x197be1(0x5bc)]=!![],_0x380573[_0x197be1(0x4e3)](this['_slotId'],this[_0x197be1(0x343)]()),this[_0x197be1(0x315)][_0x197be1(0x169)](_0x380573);}}},Window_ShopStatus[_0x2e9347(0x655)]['itemDataFontSize']=function(){const _0x538143=_0x2e9347;return Math[_0x538143(0x539)](0x1,$gameSystem[_0x538143(0x69e)]()-0x4);},Window_ShopStatus['prototype'][_0x2e9347(0x3d6)]=function(){const _0x4ff14a=_0x2e9347;Window_StatusBase[_0x4ff14a(0x655)][_0x4ff14a(0x3d6)][_0x4ff14a(0x51f)](this),this[_0x4ff14a(0x267)]['fontSize']=this['_resetFontSize']||this['contents'][_0x4ff14a(0x1ee)],this[_0x4ff14a(0x267)][_0x4ff14a(0x3ff)]=this[_0x4ff14a(0x3ba)]||this[_0x4ff14a(0x267)]['textColor'];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x150)]=function(){const _0x1c9233=_0x2e9347;return this[_0x1c9233(0x267)]['fontSize']/$gameSystem[_0x1c9233(0x69e)]();},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x262)]=function(_0x302a85,_0x110b9a,_0x1830f8){const _0x58a0b6=_0x2e9347,_0x1b9be9=ImageManager[_0x58a0b6(0x4cf)](_0x58a0b6(0x639)),_0x367049=ImageManager[_0x58a0b6(0x66a)],_0x1caf9c=ImageManager[_0x58a0b6(0x231)],_0xc4d595=_0x302a85%0x10*_0x367049,_0x1c10e5=Math[_0x58a0b6(0x1fc)](_0x302a85/0x10)*_0x1caf9c,_0x14434a=Math[_0x58a0b6(0x1ac)](_0x367049*this[_0x58a0b6(0x150)]()),_0x406814=Math['ceil'](_0x1caf9c*this['fontSizeRatio']());this[_0x58a0b6(0x267)][_0x58a0b6(0x2db)](_0x1b9be9,_0xc4d595,_0x1c10e5,_0x367049,_0x1caf9c,_0x110b9a,_0x1830f8,_0x14434a,_0x406814);},Window_ShopStatus['prototype'][_0x2e9347(0x152)]=function(_0x4b9a41,_0x5dd26f){const _0x4b4ccd=_0x2e9347;_0x5dd26f[_0x4b4ccd(0x20d)]&&this[_0x4b4ccd(0x262)](_0x4b9a41,_0x5dd26f['x'],_0x5dd26f['y']+0x2);_0x5dd26f['x']+=Math[_0x4b4ccd(0x1ac)](ImageManager[_0x4b4ccd(0x66a)]*this['fontSizeRatio']());if(this['fontSizeRatio']()===0x1)_0x5dd26f['x']+=0x4;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x608)]=function(_0x112555,_0x4382cc,_0x35f7cc,_0x2bc523,_0x7f5de3,_0x532eeb){const _0x41b1e6=_0x2e9347;_0x112555=_0x112555||'',_0x532eeb=_0x532eeb||_0x41b1e6(0x6af),this['_resetFontSize']=this['itemDataFontSize'](),this['_resetFontColor']=_0x7f5de3?ColorManager[_0x41b1e6(0x3bb)]():this[_0x41b1e6(0x267)][_0x41b1e6(0x3ff)],_0x4382cc+=this['itemPadding'](),_0x2bc523-=this[_0x41b1e6(0x1fe)]()*0x2;const _0x285c83=this[_0x41b1e6(0x282)](_0x112555);if(_0x532eeb===_0x41b1e6(0x5a6))_0x4382cc=_0x4382cc+Math['floor']((_0x2bc523-_0x285c83[_0x41b1e6(0x21b)])/0x2);else _0x532eeb==='right'&&(_0x4382cc=_0x4382cc+_0x2bc523-_0x285c83['width']);_0x35f7cc+=(this[_0x41b1e6(0x35e)]()-_0x285c83[_0x41b1e6(0x23d)])/0x2,this[_0x41b1e6(0x53b)](_0x112555,_0x4382cc,_0x35f7cc,_0x2bc523),this[_0x41b1e6(0x61f)]=undefined,this[_0x41b1e6(0x3ba)]=undefined,this[_0x41b1e6(0x3d6)]();},Window_ShopStatus[_0x2e9347(0x655)]['drawItemConsumable']=function(_0x1d879,_0x20afdd,_0xaa3853){const _0x1437ea=_0x2e9347;if(!DataManager[_0x1437ea(0x207)](this[_0x1437ea(0x2f1)]))return![];const _0x5fdfec=this[_0x1437ea(0x419)]();this[_0x1437ea(0x608)](_0x5fdfec,_0x1d879,_0x20afdd,_0xaa3853,!![]);const _0x22e109=this[_0x1437ea(0x52d)]();return this[_0x1437ea(0x608)](_0x22e109,_0x1d879,_0x20afdd,_0xaa3853,![],_0x1437ea(0x5a1)),this[_0x1437ea(0x5a5)](_0x1d879,_0x20afdd,_0xaa3853),this[_0x1437ea(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)]['getItemConsumableLabel']=function(){const _0x8632a7=_0x2e9347;return VisuMZ[_0x8632a7(0x2c2)][_0x8632a7(0x20a)][_0x8632a7(0x375)][_0x8632a7(0x563)];},Window_ShopStatus[_0x2e9347(0x655)]['getItemConsumableText']=function(){const _0x1a1b7f=_0x2e9347,_0x247c2c=_0x1a1b7f(0x2da);if(this['_customItemInfo'][_0x247c2c])return this[_0x1a1b7f(0x4ee)][_0x247c2c];if(this['canConsumeItem']()){if('GFnzH'!==_0x1a1b7f(0x25b))return VisuMZ[_0x1a1b7f(0x2c2)][_0x1a1b7f(0x20a)]['StatusWindow'][_0x1a1b7f(0x53a)];else{_0x344967[_0x1a1b7f(0x1f9)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x5cf113=_0x5320ee(_0x54f51a['$1'])[_0x1a1b7f(0x20b)]()['trim']()[_0x1a1b7f(0x47f)](',');for(const _0x4f0215 of _0x5cf113){_0x5ba861['categories']['push'](_0x4f0215['trim']());}}}else{if(_0x1a1b7f(0x179)!==_0x1a1b7f(0x179))_0x58abab=_0x1a1b7f(0x33f)[_0x1a1b7f(0x410)](_0x1fcc9e['id']);else return VisuMZ['ItemsEquipsCore']['Settings'][_0x1a1b7f(0x375)][_0x1a1b7f(0x232)];}},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x3d1)]=function(){const _0x45bec7=_0x2e9347;return VisuMZ[_0x45bec7(0x378)]&&VisuMZ['CoreEngine']['Settings']['QoL'][_0x45bec7(0x561)]&&DataManager[_0x45bec7(0x3f1)](this[_0x45bec7(0x2f1)])?'sZUfV'!==_0x45bec7(0x339)?![]:this[_0x45bec7(0x43e)]()?this[_0x45bec7(0x2c7)]():_0x2a4dcd['ItemsEquipsCore']['Settings'][_0x45bec7(0x575)][_0x45bec7(0x621)]:this['_item'][_0x45bec7(0x198)];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x3ef)]=function(_0x191617,_0x5845d6,_0x405a54){const _0x129932=_0x2e9347;if(!this['isEquipItem']()&&!DataManager[_0x129932(0x207)](this[_0x129932(0x2f1)]))return![];if(DataManager[_0x129932(0x3f1)](this[_0x129932(0x2f1)])&&!$dataSystem[_0x129932(0x5ae)]){if('WakJW'===_0x129932(0x5bd)){const _0x2c7eaf=TextManager[_0x129932(0x280)];this[_0x129932(0x608)](_0x2c7eaf,_0x191617,_0x5845d6,_0x405a54,!![],'center');}else _0x566078=_0x5a0e62[_0x129932(0x378)][_0x129932(0x20a)][_0x129932(0x195)]['ExtDisplayedParams'];}else{if(_0x129932(0x44f)!=='KAPwR'){const _0x212a49=TextManager['possession'];this[_0x129932(0x608)](_0x212a49,_0x191617,_0x5845d6,_0x405a54,!![]);const _0xd476c1=this[_0x129932(0x4ba)]();this[_0x129932(0x608)](_0xd476c1,_0x191617,_0x5845d6,_0x405a54,![],_0x129932(0x5a1));}else _0x115827=_0x27819a(_0x513c7d['$1'])[_0x129932(0x692)]()[_0x129932(0x515)]();}return this[_0x129932(0x5a5)](_0x191617,_0x5845d6,_0x405a54),this['resetFontSettings'](),!![];},Window_ShopStatus[_0x2e9347(0x655)]['getItemQuantityText']=function(){const _0x2a5e8c=_0x2e9347,_0x4ba694=_0x2a5e8c(0x275);if(this[_0x2a5e8c(0x4ee)][_0x4ba694])return this[_0x2a5e8c(0x4ee)][_0x4ba694];const _0x52eb14=VisuMZ[_0x2a5e8c(0x2c2)]['Settings'][_0x2a5e8c(0x66f)][_0x2a5e8c(0x6b3)];return _0x52eb14[_0x2a5e8c(0x410)]($gameParty[_0x2a5e8c(0x187)](this['_item']));},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x22e)]=function(_0x5a2d48,_0x283b3f,_0x398662){const _0x28ae51=_0x2e9347,_0x5cc71e=this[_0x28ae51(0x2f7)]();return this[_0x28ae51(0x608)](_0x5cc71e,_0x5a2d48,_0x283b3f,_0x398662,![],_0x28ae51(0x5a6)),this[_0x28ae51(0x5a5)](_0x5a2d48,_0x283b3f,_0x398662),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x2e9347(0x2f7)]=function(){const _0x8219c7=_0x2e9347,_0x21ab7c=_0x8219c7(0x295);if(this[_0x8219c7(0x4ee)][_0x21ab7c])return this[_0x8219c7(0x4ee)][_0x21ab7c];const _0x5b3134=VisuMZ[_0x8219c7(0x2c2)]['Settings'][_0x8219c7(0x375)],_0x536dc0='Occasion%1'[_0x8219c7(0x410)](this[_0x8219c7(0x2f1)]['occasion']);return _0x5b3134[_0x536dc0];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x422)]=function(_0x59bb02,_0x3e391d,_0xfa85e5){const _0x13dd3c=_0x2e9347,_0x3145b5=this[_0x13dd3c(0x281)]();return this['drawItemKeyData'](_0x3145b5,_0x59bb02,_0x3e391d,_0xfa85e5,![],_0x13dd3c(0x5a6)),this[_0x13dd3c(0x5a5)](_0x59bb02,_0x3e391d,_0xfa85e5),this[_0x13dd3c(0x3d6)](),!![];},Window_ShopStatus['prototype'][_0x2e9347(0x281)]=function(){const _0xff8109=_0x2e9347,_0x53b73f=_0xff8109(0x51a);if(this[_0xff8109(0x4ee)][_0x53b73f])return this[_0xff8109(0x4ee)][_0x53b73f];const _0x2a7eb3=VisuMZ[_0xff8109(0x2c2)][_0xff8109(0x20a)][_0xff8109(0x375)];if(Imported['VisuMZ_1_BattleCore']){if(_0xff8109(0x4f3)!=='uMKbs')return _0x27d556[_0xff8109(0x2c2)][_0xff8109(0x64d)][_0xff8109(0x51f)](this);else{const _0x55e75d=this[_0xff8109(0x2f1)][_0xff8109(0x2c0)];if(_0x55e75d[_0xff8109(0x1f9)](/<TARGET:[ ](.*)>/i)){if(_0xff8109(0x612)===_0xff8109(0x612)){const _0x116e50=String(RegExp['$1']);if(_0x116e50[_0xff8109(0x1f9)](/(\d+) RANDOM ANY/i))return _0x2a7eb3[_0xff8109(0x51b)]['format'](Number(RegExp['$1']));else{if(_0x116e50[_0xff8109(0x1f9)](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i))return _0x2a7eb3[_0xff8109(0x208)][_0xff8109(0x410)](Number(RegExp['$1']));else{if(_0x116e50[_0xff8109(0x1f9)](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i))return _0x2a7eb3[_0xff8109(0x382)][_0xff8109(0x410)](Number(RegExp['$1']));else{if(_0x116e50[_0xff8109(0x1f9)](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x2a7eb3[_0xff8109(0x485)];else{if(_0x116e50[_0xff8109(0x1f9)](/ALLY OR ENEMY/i))return _0x2a7eb3[_0xff8109(0x2f2)]||_0x2a7eb3[_0xff8109(0x5d0)];else{if(_0x116e50[_0xff8109(0x1f9)](/ENEMY OR ALLY/i))return _0xff8109(0x2cf)!==_0xff8109(0x1b2)?_0x2a7eb3[_0xff8109(0x39d)]||_0x2a7eb3[_0xff8109(0x46c)]:_0xff8109(0x18a);}}}}}}else return this[_0xff8109(0x43e)]()?this['helpWindowRectItemsEquipsCore']():_0x24d009[_0xff8109(0x2c2)][_0xff8109(0x64d)][_0xff8109(0x51f)](this);}}}const _0x251a8f=_0xff8109(0x437)[_0xff8109(0x410)](this[_0xff8109(0x2f1)][_0xff8109(0x173)]);return _0x2a7eb3[_0x251a8f];},Window_ShopStatus[_0x2e9347(0x655)]['drawItemSpeed']=function(_0x4d6169,_0x2f644d,_0x14e12d){const _0x42ab41=_0x2e9347,_0x317716=this[_0x42ab41(0x297)]();this[_0x42ab41(0x608)](_0x317716,_0x4d6169,_0x2f644d,_0x14e12d,!![]);const _0x3cd036=this['getItemSpeedText']();return this[_0x42ab41(0x608)](_0x3cd036,_0x4d6169,_0x2f644d,_0x14e12d,![],_0x42ab41(0x5a1)),this[_0x42ab41(0x5a5)](_0x4d6169,_0x2f644d,_0x14e12d),this[_0x42ab41(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x297)]=function(){const _0x215d76=_0x2e9347;return VisuMZ[_0x215d76(0x2c2)][_0x215d76(0x20a)][_0x215d76(0x375)][_0x215d76(0x16a)];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x2dd)]=function(){const _0x18483b=_0x2e9347,_0x2297ff='SPEED';if(this[_0x18483b(0x4ee)][_0x2297ff])return this['_customItemInfo'][_0x2297ff];const _0x54c0e2=this[_0x18483b(0x2f1)][_0x18483b(0x2de)];if(_0x54c0e2>=0x7d0)return VisuMZ[_0x18483b(0x2c2)]['Settings'][_0x18483b(0x375)][_0x18483b(0x3dc)];else{if(_0x54c0e2>=0x3e8)return VisuMZ[_0x18483b(0x2c2)][_0x18483b(0x20a)]['StatusWindow'][_0x18483b(0x5ea)];else{if(_0x54c0e2>0x0){if(_0x18483b(0x16f)==='yWXtY')return VisuMZ[_0x18483b(0x2c2)][_0x18483b(0x20a)][_0x18483b(0x375)][_0x18483b(0x33c)];else _0xed9aed['prototype'][_0x18483b(0x4ce)][_0x18483b(0x51f)](this),this[_0x18483b(0x1d1)]&&this['_itemWindow'][_0x18483b(0x50a)](this[_0x18483b(0x39e)]());}else{if(_0x54c0e2===0x0){if(_0x18483b(0x57b)===_0x18483b(0x57b))return VisuMZ[_0x18483b(0x2c2)][_0x18483b(0x20a)]['StatusWindow'][_0x18483b(0x4d8)];else return;}else{if(_0x54c0e2>-0x3e8){if(_0x18483b(0x1b4)===_0x18483b(0x1b4))return VisuMZ[_0x18483b(0x2c2)][_0x18483b(0x20a)][_0x18483b(0x375)][_0x18483b(0x357)];else this[_0x18483b(0x4a1)](),this[_0x18483b(0x551)](),this[_0x18483b(0x2c6)]();}else{if(_0x54c0e2>-0x7d0)return VisuMZ[_0x18483b(0x2c2)][_0x18483b(0x20a)]['StatusWindow'][_0x18483b(0x2c8)];else return _0x54c0e2<=-0x7d0?VisuMZ[_0x18483b(0x2c2)][_0x18483b(0x20a)]['StatusWindow']['SpeedNeg2000']:_0x18483b(0x3f4);}}}}}},Window_ShopStatus['prototype'][_0x2e9347(0x56f)]=function(_0x5f432a,_0x463af6,_0x466049){const _0x1f1559=_0x2e9347,_0x21f99f=this[_0x1f1559(0x5dd)]();this[_0x1f1559(0x608)](_0x21f99f,_0x5f432a,_0x463af6,_0x466049,!![]);const _0x3af31f=this[_0x1f1559(0x6ae)]();return this[_0x1f1559(0x608)](_0x3af31f,_0x5f432a,_0x463af6,_0x466049,![],_0x1f1559(0x5a1)),this[_0x1f1559(0x5a5)](_0x5f432a,_0x463af6,_0x466049),this[_0x1f1559(0x3d6)](),!![];},Window_ShopStatus['prototype'][_0x2e9347(0x5dd)]=function(){const _0x238ce6=_0x2e9347;return VisuMZ[_0x238ce6(0x2c2)][_0x238ce6(0x20a)][_0x238ce6(0x375)][_0x238ce6(0x693)];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x6ae)]=function(){const _0x3e4f51=_0x2e9347,_0x2235bc=_0x3e4f51(0x1a4);if(this[_0x3e4f51(0x4ee)][_0x2235bc])return this[_0x3e4f51(0x4ee)][_0x2235bc];if(Imported[_0x3e4f51(0x610)]){const _0x35d375=this[_0x3e4f51(0x2f1)][_0x3e4f51(0x2c0)];if(_0x35d375[_0x3e4f51(0x1f9)](/<ALWAYS HIT>/i))return _0x3e4f51(0x591);else{if(_0x35d375[_0x3e4f51(0x1f9)](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x3e4f51(0x4f9)!==_0x3e4f51(0x181)?_0x3e4f51(0x40d)[_0x3e4f51(0x410)](Number(RegExp['$1'])):this[_0x3e4f51(0x217)](_0x1830d0['wtypeId']);}}return _0x3e4f51(0x40d)['format'](this[_0x3e4f51(0x2f1)][_0x3e4f51(0x43f)]);},Window_ShopStatus['prototype'][_0x2e9347(0x494)]=function(_0x189010,_0x3e6f3f,_0x514821){const _0x4d5195=_0x2e9347,_0x183c0c=this[_0x4d5195(0x35b)]();this['drawItemKeyData'](_0x183c0c,_0x189010,_0x3e6f3f,_0x514821,!![]);const _0x237d84=this[_0x4d5195(0x36a)]();return this['drawItemKeyData'](_0x237d84,_0x189010,_0x3e6f3f,_0x514821,![],'right'),this[_0x4d5195(0x5a5)](_0x189010,_0x3e6f3f,_0x514821),this[_0x4d5195(0x3d6)](),!![];},Window_ShopStatus['prototype']['getItemRepeatsLabel']=function(){const _0x5a1e5b=_0x2e9347;return VisuMZ['ItemsEquipsCore']['Settings'][_0x5a1e5b(0x375)]['LabelRepeats'];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x36a)]=function(){const _0x2b23c5=_0x2e9347,_0x4c54a9='REPEAT';if(this[_0x2b23c5(0x4ee)][_0x4c54a9])return this['_customItemInfo'][_0x4c54a9];const _0x29adf5=_0x2b23c5(0x4a3);return _0x29adf5['format'](this['_item'][_0x2b23c5(0x624)]);},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x4e8)]=function(_0x3f30ad,_0x3cc8e5,_0x394fde){const _0x53f82b=_0x2e9347,_0x24b0af=this[_0x53f82b(0x3f9)]();this['drawItemKeyData'](_0x24b0af,_0x3f30ad,_0x3cc8e5,_0x394fde,!![]);const _0x397139=this['getItemHitTypeText']();return this['drawItemKeyData'](_0x397139,_0x3f30ad,_0x3cc8e5,_0x394fde,![],'right'),this['drawItemDarkRect'](_0x3f30ad,_0x3cc8e5,_0x394fde),this[_0x53f82b(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x3f9)]=function(){const _0x18142d=_0x2e9347;return VisuMZ[_0x18142d(0x2c2)][_0x18142d(0x20a)][_0x18142d(0x375)][_0x18142d(0x1b6)];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x4a2)]=function(){const _0x388106=_0x2e9347,_0x18ea73=_0x388106(0x1dd);if(this[_0x388106(0x4ee)][_0x18ea73])return this[_0x388106(0x4ee)][_0x18ea73];const _0x416ee3=VisuMZ['ItemsEquipsCore']['Settings'][_0x388106(0x375)],_0x3b39a2=_0x388106(0x5ba)['format'](this[_0x388106(0x2f1)][_0x388106(0x28d)]);return _0x416ee3[_0x3b39a2];},Window_ShopStatus[_0x2e9347(0x655)]['drawItemDamage']=function(_0x3fa746,_0xc83b5f,_0x5329fd){const _0x4e2149=_0x2e9347;if(this[_0x4e2149(0x2f1)]['damage'][_0x4e2149(0x5da)]<=0x0)return _0xc83b5f;if(this[_0x4e2149(0x3b7)](_0x3fa746,_0xc83b5f,_0x5329fd))_0xc83b5f+=this[_0x4e2149(0x35e)]();if(this['drawItemDamageAmount'](_0x3fa746,_0xc83b5f,_0x5329fd))_0xc83b5f+=this['lineHeight']();return this[_0x4e2149(0x3d6)](),_0xc83b5f;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x3b7)]=function(_0x470258,_0x487abe,_0x45deb5){const _0x3682ab=_0x2e9347,_0x5ccfd0=this[_0x3682ab(0x581)]();this[_0x3682ab(0x608)](_0x5ccfd0,_0x470258,_0x487abe,_0x45deb5,!![]);const _0x5f2da1=this[_0x3682ab(0x349)]();return this['drawItemKeyData'](_0x5f2da1,_0x470258,_0x487abe,_0x45deb5,![],'right'),this['drawItemDarkRect'](_0x470258,_0x487abe,_0x45deb5),this[_0x3682ab(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x581)]=function(){const _0x2aff8d=_0x2e9347;return VisuMZ['ItemsEquipsCore'][_0x2aff8d(0x20a)][_0x2aff8d(0x375)][_0x2aff8d(0x335)];},Window_ShopStatus['prototype'][_0x2e9347(0x349)]=function(){const _0x54ed44=_0x2e9347,_0x29a7aa=_0x54ed44(0x4e0);if(this[_0x54ed44(0x4ee)][_0x29a7aa])return this[_0x54ed44(0x4ee)][_0x29a7aa];if(this[_0x54ed44(0x2f1)][_0x54ed44(0x17f)]['elementId']<=-0x1){if(_0x54ed44(0x62f)!=='xzjdH'){if(_0x31e009['_bypassProxy'])return _0x227047['ItemsEquipsCore'][_0x54ed44(0x1ae)][_0x54ed44(0x51f)](this);return _0x29047f[_0x54ed44(0x533)](_0x287e88[_0x54ed44(0x2c2)]['Window_ItemList_item']['call'](this));}else return VisuMZ['ItemsEquipsCore'][_0x54ed44(0x20a)]['StatusWindow'][_0x54ed44(0x393)];}else return this[_0x54ed44(0x2f1)][_0x54ed44(0x17f)][_0x54ed44(0x5d5)]===0x0?VisuMZ['ItemsEquipsCore'][_0x54ed44(0x20a)]['StatusWindow']['ElementNone']:$dataSystem[_0x54ed44(0x154)][this['_item'][_0x54ed44(0x17f)][_0x54ed44(0x5d5)]];},Window_ShopStatus['prototype']['drawItemDamageAmount']=function(_0x4d744f,_0x3a3ef1,_0xf8b72a){const _0x4ca9a2=_0x2e9347,_0xffdbee=this['getItemDamageAmountLabel']();this[_0x4ca9a2(0x608)](_0xffdbee,_0x4d744f,_0x3a3ef1,_0xf8b72a,!![]),this[_0x4ca9a2(0x4e4)]();const _0x32072d=this['getItemDamageAmountText'](),_0x41ae22=ColorManager['damageColor']([0x0,0x0,0x2,0x1,0x3,0x1,0x3][this[_0x4ca9a2(0x2f1)]['damage'][_0x4ca9a2(0x5da)]]);return this[_0x4ca9a2(0x6ac)](_0x41ae22),this[_0x4ca9a2(0x608)](_0x32072d,_0x4d744f,_0x3a3ef1,_0xf8b72a,![],_0x4ca9a2(0x5a1)),this[_0x4ca9a2(0x5a5)](_0x4d744f,_0x3a3ef1,_0xf8b72a),this[_0x4ca9a2(0x3d6)](),!![];},Window_ShopStatus['prototype'][_0x2e9347(0x6a9)]=function(){const _0x3486d3=_0x2e9347;return Imported[_0x3486d3(0x610)]&&DataManager['getDamageStyle'](this[_0x3486d3(0x2f1)])!==_0x3486d3(0x57c)?this[_0x3486d3(0x1c4)]():this[_0x3486d3(0x6b6)]();},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x6b6)]=function(){const _0x20e7e6=_0x2e9347,_0x3d968d=VisuMZ[_0x20e7e6(0x2c2)]['Settings']['StatusWindow'],_0x179a1d=_0x20e7e6(0x42e)[_0x20e7e6(0x410)](this[_0x20e7e6(0x2f1)][_0x20e7e6(0x17f)][_0x20e7e6(0x5da)]),_0x40c04f=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this[_0x20e7e6(0x2f1)]['damage']['type']];return _0x3d968d[_0x179a1d]['format'](_0x40c04f);},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x4e4)]=function(){const _0x5e458d=_0x2e9347,_0x14ff6d=$gameActors[_0x5e458d(0x4d7)](0x1);this[_0x5e458d(0x29e)]=JsonEx['makeDeepCopy'](_0x14ff6d),this[_0x5e458d(0x3e3)]=JsonEx['makeDeepCopy'](_0x14ff6d);},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x269)]=function(){const _0x278b79=_0x2e9347,_0x1dc5da=_0x278b79(0x560);if(this[_0x278b79(0x4ee)][_0x1dc5da])return this[_0x278b79(0x4ee)][_0x1dc5da];if(Imported[_0x278b79(0x610)]&&DataManager[_0x278b79(0x2a8)](this['_item'])!==_0x278b79(0x57c)){if('VQoho'===_0x278b79(0x19f))return this[_0x278b79(0x176)]();else _0x249367[_0x278b79(0x655)][_0x278b79(0x5bf)]['call'](this),this[_0x278b79(0x4f6)]&&this[_0x278b79(0x4f6)][_0x278b79(0x424)]()&&this[_0x278b79(0x4f6)][_0x278b79(0x5bf)]();}else{if(_0x278b79(0x475)!==_0x278b79(0x475))this['prepareRefreshItemsEquipsCoreLayout']();else return this[_0x278b79(0x40a)]();}},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x40a)]=function(){const _0x2b7af0=_0x2e9347;window['a']=this['_tempActorA'],window['b']=this[_0x2b7af0(0x3e3)],this[_0x2b7af0(0x29e)][_0x2b7af0(0x2d0)](!![]),this[_0x2b7af0(0x3e3)]['setShopStatusWindowMode']([0x3,0x4]['includes'](this[_0x2b7af0(0x2f1)][_0x2b7af0(0x17f)][_0x2b7af0(0x5da)]));let _0x12ddde=this[_0x2b7af0(0x2f1)][_0x2b7af0(0x17f)]['formula'];try{if(_0x2b7af0(0x4c9)===_0x2b7af0(0x1ca))return _0x4b0b82[_0x2b7af0(0x2c2)][_0x2b7af0(0x20a)][_0x2b7af0(0x375)][_0x2b7af0(0x3fe)];else{const _0x4dc006=Math['max'](eval(_0x12ddde),0x0)/window['a'][_0x2b7af0(0x3b0)];this[_0x2b7af0(0x63c)]();if(isNaN(_0x4dc006)){if(_0x2b7af0(0x484)===_0x2b7af0(0x5d2)){const _0x314f09=this['calcEquipItemPerformance'](_0xd8181c[_0x278cfa]);_0x314f09>_0x172d07&&(_0x5828b9=_0x314f09,_0x5043e0=_0x3a9757[_0x144018]);}else return _0x2b7af0(0x3f4);}else{if('AcPqa'!==_0x2b7af0(0x161)){const _0x214a33=_0x440254[_0x752520],_0x1a717d=this['getMatchingInitEquip'](_0x596142,_0x214a33);if(this[_0x2b7af0(0x4bb)](_0x1a717d))this['_equips'][_0xc56e67][_0x2b7af0(0x4c4)](_0x1a717d);}else return _0x2b7af0(0x40d)[_0x2b7af0(0x410)](Math[_0x2b7af0(0x48d)](_0x4dc006*0x64));}}}catch(_0x4d5d58){if('jzxnw'!==_0x2b7af0(0x66e))return $gameTemp[_0x2b7af0(0x3b4)]()&&(console[_0x2b7af0(0x4ad)]('Damage\x20Formula\x20Error\x20for\x20%1'[_0x2b7af0(0x410)](this[_0x2b7af0(0x2f1)][_0x2b7af0(0x5a8)])),console[_0x2b7af0(0x4ad)](_0x4d5d58)),this[_0x2b7af0(0x63c)](),_0x2b7af0(0x3f4);else{const _0x5559bc=this['commandStyle'](),_0x19523d=_0x1d25db[_0x2b7af0(0x2c2)][_0x2b7af0(0x20a)]['ShopScene']['CmdIconSell'],_0x1ec48b=_0x5559bc===_0x2b7af0(0x1f4)?_0x498155[_0x2b7af0(0x3c6)]:_0x2b7af0(0x5e9)[_0x2b7af0(0x410)](_0x19523d,_0x5d66b3[_0x2b7af0(0x3c6)]),_0x517d8a=this['isSellCommandEnabled']();if(this['hideDisabledCommands']()&&!_0x517d8a)return;this['addCommand'](_0x1ec48b,_0x2b7af0(0x3c6),_0x517d8a);}}},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x63c)]=function(){window['a']=undefined,window['b']=undefined;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x4f4)]=function(_0x2e753c,_0x817b6f,_0x2c5707){const _0x3db8ba=_0x2e9347;if(!this[_0x3db8ba(0x5f3)]())return _0x817b6f;if(this[_0x3db8ba(0x59a)](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this['lineHeight']();if(this['drawItemEffectsMpRecovery'](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this[_0x3db8ba(0x35e)]();if(this['drawItemEffectsTpRecovery'](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this[_0x3db8ba(0x35e)]();if(this[_0x3db8ba(0x5ef)](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this[_0x3db8ba(0x35e)]();if(this['drawItemEffectsMpDamage'](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this[_0x3db8ba(0x35e)]();if(this[_0x3db8ba(0x5d7)](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this[_0x3db8ba(0x35e)]();if(this[_0x3db8ba(0x614)](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this[_0x3db8ba(0x35e)]();if(this['drawItemEffectsAddedStatesBuffs'](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this['lineHeight']();if(this[_0x3db8ba(0x19e)](_0x2e753c,_0x817b6f,_0x2c5707))_0x817b6f+=this[_0x3db8ba(0x35e)]();return this[_0x3db8ba(0x3d6)](),_0x817b6f;},Window_ShopStatus[_0x2e9347(0x655)]['getItemEffects']=function(){const _0x397919=_0x2e9347;return this[_0x397919(0x2f1)][_0x397919(0x6be)];},Window_ShopStatus['prototype'][_0x2e9347(0x5f3)]=function(){const _0xe5497c=_0x2e9347;let _0x307dce=![];this['_itemData']={'rateHP':0x0,'flatHP':0x0,'rateMP':0x0,'flatMP':0x0,'gainTP':0x0,'selfTP':0x0,'addState':[],'removeState':[],'changeBuff':[0x0,0x0,0x0,0x0,0x0,0x0,0x0,0x0],'removeBuff':[],'removeDebuff':[],'addStateBuffChanges':![],'removeStateBuffChanges':![]};const _0x252434=this['getItemEffects']();for(const _0x39d995 of _0x252434){switch(_0x39d995['code']){case Game_Action['EFFECT_RECOVER_HP']:this[_0xe5497c(0x4da)]['rateHP']+=_0x39d995[_0xe5497c(0x577)],this['_itemData'][_0xe5497c(0x298)]+=_0x39d995[_0xe5497c(0x302)],_0x307dce=!![];break;case Game_Action[_0xe5497c(0x51d)]:this[_0xe5497c(0x4da)][_0xe5497c(0x504)]+=_0x39d995[_0xe5497c(0x577)],this[_0xe5497c(0x4da)][_0xe5497c(0x3da)]+=_0x39d995[_0xe5497c(0x302)],_0x307dce=!![];break;case Game_Action[_0xe5497c(0x2dc)]:this[_0xe5497c(0x4da)][_0xe5497c(0x29b)]+=_0x39d995[_0xe5497c(0x577)],_0x307dce=!![];break;case Game_Action[_0xe5497c(0x54d)]:this[_0xe5497c(0x4da)][_0xe5497c(0x400)][_0xe5497c(0x4bd)](_0x39d995[_0xe5497c(0x2ac)]),_0x307dce=!![];break;case Game_Action['EFFECT_REMOVE_STATE']:this[_0xe5497c(0x4da)][_0xe5497c(0x2a7)][_0xe5497c(0x4bd)](_0x39d995[_0xe5497c(0x2ac)]),this[_0xe5497c(0x4da)][_0xe5497c(0x50d)]=!![],_0x307dce=!![];break;case Game_Action['EFFECT_ADD_BUFF']:this[_0xe5497c(0x4da)]['changeBuff'][_0x39d995[_0xe5497c(0x2ac)]]+=0x1,_0x307dce=!![];break;case Game_Action[_0xe5497c(0x477)]:this[_0xe5497c(0x4da)]['changeBuff'][_0x39d995[_0xe5497c(0x2ac)]]-=0x1,_0x307dce=!![];break;case Game_Action[_0xe5497c(0x1f7)]:this[_0xe5497c(0x4da)][_0xe5497c(0x2b4)]['push'](_0x39d995[_0xe5497c(0x2ac)]),this[_0xe5497c(0x4da)][_0xe5497c(0x50d)]=!![],_0x307dce=!![];break;case Game_Action[_0xe5497c(0x5c1)]:this[_0xe5497c(0x4da)][_0xe5497c(0x22b)][_0xe5497c(0x4bd)](_0x39d995[_0xe5497c(0x2ac)]),this[_0xe5497c(0x4da)][_0xe5497c(0x50d)]=!![],_0x307dce=!![];break;}}if(this[_0xe5497c(0x4da)][_0xe5497c(0x400)][_0xe5497c(0x3d3)]>0x0)this[_0xe5497c(0x4da)][_0xe5497c(0x566)]=!![];for(let _0x4bceda=0x0;_0x4bceda<this['_itemData'][_0xe5497c(0x246)]['length'];_0x4bceda++){if(this[_0xe5497c(0x4da)]['changeBuff'][_0x4bceda]!==0x0)this[_0xe5497c(0x4da)][_0xe5497c(0x566)]=!![];}if(this[_0xe5497c(0x2f1)]['tpGain']!==0x0){if('cznjh'!==_0xe5497c(0x6a0))this[_0xe5497c(0x4da)][_0xe5497c(0x34e)]=this[_0xe5497c(0x2f1)][_0xe5497c(0x66b)],_0x307dce=!![];else{const _0x39261f=_0x51ec3b-(_0x5bc8a9-_0x2259be)/0x2;this[_0xe5497c(0x3e4)](_0x9917d8,_0x2c2ddf,_0x122bdb,_0x39261f,_0x3ecb92),_0xef9aad+=_0x3e8489;}}const _0x196aba=['HP\x20RECOVERY',_0xe5497c(0x2d7),_0xe5497c(0x1f8),_0xe5497c(0x366),_0xe5497c(0x545),_0xe5497c(0x3d4),_0xe5497c(0x223),_0xe5497c(0x449),'REMOVED\x20EFFECTS'];for(const _0x20f581 of _0x196aba){if(this[_0xe5497c(0x4ee)][_0x20f581]){if(_0xe5497c(0x2c3)!==_0xe5497c(0x2c3))return this[_0xe5497c(0x553)](),_0x112802['clear'](),_0x3893ee[_0xe5497c(0x1c8)][_0xe5497c(0x158)](),![];else{_0x307dce=!![];break;}}}return _0x307dce;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x59a)]=function(_0xea70d9,_0x28bf6d,_0x4dc26d){const _0x2ceee6=_0x2e9347,_0x5e42e7=_0x2ceee6(0x3ac);if(this['_itemData'][_0x2ceee6(0x525)]<=0x0&&this['_itemData'][_0x2ceee6(0x298)]<=0x0&&!this[_0x2ceee6(0x4ee)][_0x5e42e7])return![];const _0x10e2b5=this[_0x2ceee6(0x446)]();this[_0x2ceee6(0x608)](_0x10e2b5,_0xea70d9,_0x28bf6d,_0x4dc26d,!![]);const _0x5e8573=this[_0x2ceee6(0x48f)]();return this[_0x2ceee6(0x6ac)](ColorManager[_0x2ceee6(0x367)](0x1)),this['drawItemKeyData'](_0x5e8573,_0xea70d9,_0x28bf6d,_0x4dc26d,![],_0x2ceee6(0x5a1)),this[_0x2ceee6(0x5a5)](_0xea70d9,_0x28bf6d,_0x4dc26d),this[_0x2ceee6(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x446)]=function(){const _0x32a227=_0x2e9347,_0x18ff4c=VisuMZ['ItemsEquipsCore'][_0x32a227(0x20a)][_0x32a227(0x375)][_0x32a227(0x62c)];return _0x18ff4c['format'](TextManager['hp']);},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x48f)]=function(){const _0x4e546d=_0x2e9347,_0x25b826=_0x4e546d(0x3ac);if(this[_0x4e546d(0x4ee)][_0x25b826])return this[_0x4e546d(0x4ee)][_0x25b826];let _0x2880ab='';if(this[_0x4e546d(0x4da)][_0x4e546d(0x525)]>0x0)_0x2880ab+=_0x4e546d(0x5b0)['format'](Math[_0x4e546d(0x1fc)](this[_0x4e546d(0x4da)]['rateHP']*0x64));if(this[_0x4e546d(0x4da)][_0x4e546d(0x525)]>0x0&&this[_0x4e546d(0x4da)][_0x4e546d(0x298)]>0x0)_0x2880ab+='\x20';if(this[_0x4e546d(0x4da)][_0x4e546d(0x298)]>0x0)_0x2880ab+='+%1'[_0x4e546d(0x410)](this[_0x4e546d(0x4da)][_0x4e546d(0x298)]);return _0x2880ab;},Window_ShopStatus['prototype'][_0x2e9347(0x65e)]=function(_0x322aa6,_0xc7df1d,_0x548d14){const _0x5525d2=_0x2e9347,_0x359866=_0x5525d2(0x2d7);if(this['_itemData'][_0x5525d2(0x504)]<=0x0&&this[_0x5525d2(0x4da)][_0x5525d2(0x3da)]<=0x0&&!this[_0x5525d2(0x4ee)][_0x359866])return![];const _0xc00204=this[_0x5525d2(0x61c)]();this['drawItemKeyData'](_0xc00204,_0x322aa6,_0xc7df1d,_0x548d14,!![]);const _0x9a0727=this[_0x5525d2(0x337)]();return this[_0x5525d2(0x6ac)](ColorManager['damageColor'](0x3)),this['drawItemKeyData'](_0x9a0727,_0x322aa6,_0xc7df1d,_0x548d14,![],_0x5525d2(0x5a1)),this[_0x5525d2(0x5a5)](_0x322aa6,_0xc7df1d,_0x548d14),this[_0x5525d2(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x61c)]=function(){const _0x5a70f2=_0x2e9347,_0x5c18c4=VisuMZ[_0x5a70f2(0x2c2)]['Settings']['StatusWindow'][_0x5a70f2(0x292)];return _0x5c18c4['format'](TextManager['mp']);},Window_ShopStatus['prototype'][_0x2e9347(0x337)]=function(){const _0x38c6e9=_0x2e9347,_0x3ee06e=_0x38c6e9(0x2d7);if(this['_customItemInfo'][_0x3ee06e])return this[_0x38c6e9(0x4ee)][_0x3ee06e];let _0x58c73d='';if(this['_itemData']['rateMP']>0x0)_0x58c73d+='+%1%'['format'](Math[_0x38c6e9(0x1fc)](this[_0x38c6e9(0x4da)][_0x38c6e9(0x504)]*0x64));if(this['_itemData'][_0x38c6e9(0x504)]>0x0&&this[_0x38c6e9(0x4da)][_0x38c6e9(0x3da)]>0x0)_0x58c73d+='\x20';if(this[_0x38c6e9(0x4da)][_0x38c6e9(0x3da)]>0x0)_0x58c73d+='+%1'[_0x38c6e9(0x410)](this[_0x38c6e9(0x4da)]['flatMP']);return _0x58c73d;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x471)]=function(_0x2906f8,_0x56a956,_0x30662b){const _0x658f2b=_0x2e9347,_0x5c81cf='TP\x20RECOVERY';if(this[_0x658f2b(0x4da)][_0x658f2b(0x29b)]<=0x0&&!this[_0x658f2b(0x4ee)][_0x5c81cf])return![];const _0x3a1b2f=this[_0x658f2b(0x641)]();this[_0x658f2b(0x608)](_0x3a1b2f,_0x2906f8,_0x56a956,_0x30662b,!![]);const _0x161dc5=this[_0x658f2b(0x531)]();return this[_0x658f2b(0x6ac)](ColorManager['powerUpColor']()),this[_0x658f2b(0x608)](_0x161dc5,_0x2906f8,_0x56a956,_0x30662b,![],_0x658f2b(0x5a1)),this[_0x658f2b(0x5a5)](_0x2906f8,_0x56a956,_0x30662b),this[_0x658f2b(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)]['getItemEffectsTpRecoveryLabel']=function(){const _0x3397b2=_0x2e9347,_0x5698c5=VisuMZ['ItemsEquipsCore'][_0x3397b2(0x20a)][_0x3397b2(0x375)][_0x3397b2(0x447)];return _0x5698c5[_0x3397b2(0x410)](TextManager['tp']);},Window_ShopStatus[_0x2e9347(0x655)]['getItemEffectsTpRecoveryText']=function(){const _0x3f3a0c=_0x2e9347,_0x5a0576='TP\x20RECOVERY';if(this['_customItemInfo'][_0x5a0576])return this[_0x3f3a0c(0x4ee)][_0x5a0576];let _0x222b76='';return _0x222b76+='+%1'['format'](this['_itemData']['gainTP']),_0x222b76;},Window_ShopStatus[_0x2e9347(0x655)]['drawItemEffectsSelfTpGain']=function(_0x5c1520,_0x4b7cfa,_0x3bbb61){const _0x6b890b=_0x2e9347,_0x5283f=_0x6b890b(0x223);if(this[_0x6b890b(0x4da)][_0x6b890b(0x34e)]===0x0&&!this[_0x6b890b(0x4ee)][_0x5283f])return![];const _0x107822=this[_0x6b890b(0x1cd)]();this[_0x6b890b(0x608)](_0x107822,_0x5c1520,_0x4b7cfa,_0x3bbb61,!![]);const _0x8e3468=this[_0x6b890b(0x1d9)]();return this[_0x6b890b(0x4da)]['selfTP']>0x0?this[_0x6b890b(0x6ac)](ColorManager[_0x6b890b(0x6ab)]()):this[_0x6b890b(0x6ac)](ColorManager[_0x6b890b(0x49b)]()),this[_0x6b890b(0x608)](_0x8e3468,_0x5c1520,_0x4b7cfa,_0x3bbb61,![],'right'),this[_0x6b890b(0x5a5)](_0x5c1520,_0x4b7cfa,_0x3bbb61),this[_0x6b890b(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)]['getItemEffectsSelfTpGainLabel']=function(){const _0x17e7e2=_0x2e9347,_0x3b171a=VisuMZ[_0x17e7e2(0x2c2)][_0x17e7e2(0x20a)]['StatusWindow'][_0x17e7e2(0x518)];return _0x3b171a[_0x17e7e2(0x410)](TextManager['tp']);},Window_ShopStatus[_0x2e9347(0x655)]['getItemEffectsSelfTpGainText']=function(){const _0x13ceea=_0x2e9347,_0x32b1ec='USER\x20TP\x20GAIN';if(this[_0x13ceea(0x4ee)][_0x32b1ec])return this[_0x13ceea(0x4ee)][_0x32b1ec];let _0x4917fd='';return this[_0x13ceea(0x4da)][_0x13ceea(0x34e)]>0x0?_0x4917fd+='+%1'[_0x13ceea(0x410)](this[_0x13ceea(0x4da)][_0x13ceea(0x34e)]):_0x4917fd+='%1'['format'](this[_0x13ceea(0x4da)]['selfTP']),_0x4917fd;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x5ef)]=function(_0x589229,_0x4623c1,_0x1cd2d7){const _0x2322bb=_0x2e9347,_0x489d4f=_0x2322bb(0x366);if(this['_itemData'][_0x2322bb(0x525)]>=0x0&&this[_0x2322bb(0x4da)][_0x2322bb(0x298)]>=0x0&&!this[_0x2322bb(0x4ee)][_0x489d4f])return![];const _0x29821b=this[_0x2322bb(0x1aa)]();this[_0x2322bb(0x608)](_0x29821b,_0x589229,_0x4623c1,_0x1cd2d7,!![]);const _0xa05c18=this[_0x2322bb(0x1e9)]();return this[_0x2322bb(0x6ac)](ColorManager[_0x2322bb(0x367)](0x0)),this[_0x2322bb(0x608)](_0xa05c18,_0x589229,_0x4623c1,_0x1cd2d7,![],_0x2322bb(0x5a1)),this['drawItemDarkRect'](_0x589229,_0x4623c1,_0x1cd2d7),this[_0x2322bb(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)]['getItemEffectsHpDamageLabel']=function(){const _0x2d409e=_0x2e9347,_0x4d8141=VisuMZ[_0x2d409e(0x2c2)][_0x2d409e(0x20a)][_0x2d409e(0x375)][_0x2d409e(0x205)];return _0x4d8141[_0x2d409e(0x410)](TextManager['hp']);},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x1e9)]=function(){const _0x12e9ee=_0x2e9347,_0x389ed8=_0x12e9ee(0x366);if(this[_0x12e9ee(0x4ee)][_0x389ed8])return this[_0x12e9ee(0x4ee)][_0x389ed8];let _0x56fec5='';if(this[_0x12e9ee(0x4da)][_0x12e9ee(0x525)]<0x0)_0x56fec5+=_0x12e9ee(0x40d)[_0x12e9ee(0x410)](Math[_0x12e9ee(0x1fc)](this[_0x12e9ee(0x4da)]['rateHP']*0x64));if(this[_0x12e9ee(0x4da)][_0x12e9ee(0x525)]<0x0&&this[_0x12e9ee(0x4da)][_0x12e9ee(0x298)]<0x0)_0x56fec5+='\x20';if(this['_itemData'][_0x12e9ee(0x298)]<0x0)_0x56fec5+='%1'[_0x12e9ee(0x410)](this[_0x12e9ee(0x4da)][_0x12e9ee(0x298)]);return _0x56fec5;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x1e1)]=function(_0x5881f2,_0x40a595,_0x5aab4b){const _0x3d1f66=_0x2e9347,_0x483d90='MP\x20DAMAGE';if(this[_0x3d1f66(0x4da)][_0x3d1f66(0x504)]>=0x0&&this[_0x3d1f66(0x4da)]['flatMP']>=0x0&&!this[_0x3d1f66(0x4ee)][_0x483d90])return![];const _0x9d3f6c=this['getItemEffectsMpDamageLabel']();this[_0x3d1f66(0x608)](_0x9d3f6c,_0x5881f2,_0x40a595,_0x5aab4b,!![]);const _0x3a9de8=this['getItemEffectsMpDamageText']();return this['changeTextColor'](ColorManager[_0x3d1f66(0x367)](0x2)),this[_0x3d1f66(0x608)](_0x3a9de8,_0x5881f2,_0x40a595,_0x5aab4b,![],'right'),this[_0x3d1f66(0x5a5)](_0x5881f2,_0x40a595,_0x5aab4b),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x2e9347(0x238)]=function(){const _0xa1ef60=_0x2e9347,_0xfb876b=VisuMZ[_0xa1ef60(0x2c2)]['Settings'][_0xa1ef60(0x375)]['LabelDamageMP'];return _0xfb876b['format'](TextManager['mp']);},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x6c4)]=function(){const _0x567d82=_0x2e9347,_0x532659=_0x567d82(0x545);if(this['_customItemInfo'][_0x532659])return this[_0x567d82(0x4ee)][_0x532659];let _0x39d6ea='';if(this['_itemData']['rateMP']<0x0)_0x39d6ea+=_0x567d82(0x40d)[_0x567d82(0x410)](Math['floor'](this[_0x567d82(0x4da)]['rateMP']*0x64));if(this[_0x567d82(0x4da)][_0x567d82(0x504)]<0x0&&this[_0x567d82(0x4da)][_0x567d82(0x3da)]<0x0)_0x39d6ea+='\x20';if(this[_0x567d82(0x4da)][_0x567d82(0x3da)]<0x0)_0x39d6ea+='%1'[_0x567d82(0x410)](this[_0x567d82(0x4da)][_0x567d82(0x3da)]);return _0x39d6ea;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x5d7)]=function(_0x3391ef,_0x4079e6,_0x441be9){const _0x4c7a38=_0x2e9347,_0x293fb9=_0x4c7a38(0x3d4);if(this[_0x4c7a38(0x4da)][_0x4c7a38(0x29b)]>=0x0&&!this[_0x4c7a38(0x4ee)][_0x293fb9])return![];const _0x6292d2=this[_0x4c7a38(0x219)]();this[_0x4c7a38(0x608)](_0x6292d2,_0x3391ef,_0x4079e6,_0x441be9,!![]);const _0x30518f=this[_0x4c7a38(0x543)]();return this[_0x4c7a38(0x6ac)](ColorManager[_0x4c7a38(0x49b)]()),this[_0x4c7a38(0x608)](_0x30518f,_0x3391ef,_0x4079e6,_0x441be9,![],_0x4c7a38(0x5a1)),this[_0x4c7a38(0x5a5)](_0x3391ef,_0x4079e6,_0x441be9),this[_0x4c7a38(0x3d6)](),!![];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x219)]=function(){const _0xb9d8b6=_0x2e9347,_0x1db15b=VisuMZ[_0xb9d8b6(0x2c2)][_0xb9d8b6(0x20a)][_0xb9d8b6(0x375)][_0xb9d8b6(0x59b)];return _0x1db15b[_0xb9d8b6(0x410)](TextManager['tp']);},Window_ShopStatus['prototype'][_0x2e9347(0x543)]=function(){const _0x118196=_0x2e9347,_0x2c4150=_0x118196(0x3d4);if(this['_customItemInfo'][_0x2c4150])return this[_0x118196(0x4ee)][_0x2c4150];let _0x3a046b='';return _0x3a046b+='%1'[_0x118196(0x410)](this['_itemData'][_0x118196(0x29b)]),_0x3a046b;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x3f8)]=function(_0x19a237,_0x4c5b39,_0x232037){const _0x92e302=_0x2e9347,_0x15fb69='ADDED\x20EFFECTS';if(!this['_itemData'][_0x92e302(0x566)]&&!this[_0x92e302(0x4ee)][_0x15fb69])return![];const _0x42a2fa=this[_0x92e302(0x24e)]();this[_0x92e302(0x608)](_0x42a2fa,_0x19a237,_0x4c5b39,_0x232037,!![]);const _0x231718=this[_0x92e302(0x402)]();return this[_0x92e302(0x608)](_0x231718,_0x19a237,_0x4c5b39,_0x232037,![],_0x92e302(0x5a1)),this['drawItemDarkRect'](_0x19a237,_0x4c5b39,_0x232037),this[_0x92e302(0x3d6)](),!![];},Window_ShopStatus['prototype']['getItemEffectsAddedStatesBuffsLabel']=function(){const _0x421bc4=_0x2e9347;return VisuMZ[_0x421bc4(0x2c2)]['Settings']['StatusWindow'][_0x421bc4(0x3fe)];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x402)]=function(){const _0x35108b=_0x2e9347,_0x512741=_0x35108b(0x449);if(this['_customItemInfo'][_0x512741])return this['_customItemInfo'][_0x512741];let _0x33f19f='',_0x34a122=0x0;const _0x2e54bb=0x8;for(const _0xac2ecd of this['_itemData']['addState']){if(_0x35108b(0x565)!==_0x35108b(0x59f)){const _0x10e3e3=$dataStates[_0xac2ecd];if(_0x10e3e3&&_0x10e3e3[_0x35108b(0x1f2)]>0x0){if(_0x35108b(0x588)===_0x35108b(0x588)){_0x33f19f+=_0x35108b(0x184)[_0x35108b(0x410)](_0x10e3e3[_0x35108b(0x1f2)]),_0x34a122++;if(_0x34a122>=_0x2e54bb)return _0x33f19f;}else _0x2e335c[_0x35108b(0x684)](_0x50d863['SwitchBuy'],![]);}}else{const _0x436c39=_0x56b872['ItemsEquipsCore'][_0x35108b(0x20a)][_0x35108b(0x674)][_0x35108b(0x19b)];return _0x436c39[_0x35108b(0x1f9)](/#(.*)/i)?'#'+_0x23ac1d(_0x4c8a09['$1']):_0x5e8533[_0x35108b(0x3ff)](_0x436c39);}}for(let _0x487d19=0x0;_0x487d19<this['_itemData']['changeBuff'][_0x35108b(0x3d3)];_0x487d19++){const _0x2a76aa=this[_0x35108b(0x4da)]['changeBuff'][_0x487d19],_0x59fef0=Game_BattlerBase['prototype'][_0x35108b(0x467)](_0x2a76aa,_0x487d19);if(_0x59fef0>0x0){if(_0x35108b(0x177)!==_0x35108b(0x177)){if(!this[_0x35108b(0x2cb)]())return![];if(!this[_0x35108b(0x424)]())return![];if(!this[_0x35108b(0x536)])return![];if(!this[_0x35108b(0x536)]['active'])return![];return this['updatedLayoutStyle']()&&this['isUseModernControls']();}else{_0x33f19f+=_0x35108b(0x184)[_0x35108b(0x410)](_0x59fef0),_0x34a122++;if(_0x34a122>=_0x2e54bb)return _0x33f19f;}}}return _0x33f19f;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x19e)]=function(_0x18200c,_0x25f59d,_0x27d588){const _0xfcf7c3=_0x2e9347,_0x3466c6=_0xfcf7c3(0x26c);if(!this['_itemData']['removeStateBuffChanges']&&!this[_0xfcf7c3(0x4ee)][_0x3466c6])return![];const _0x51628f=this[_0xfcf7c3(0x306)]();this[_0xfcf7c3(0x608)](_0x51628f,_0x18200c,_0x25f59d,_0x27d588,!![]);const _0xa8c61f=this['getItemEffectsRemovedStatesBuffsText']();return this[_0xfcf7c3(0x608)](_0xa8c61f,_0x18200c,_0x25f59d,_0x27d588,![],'right'),this[_0xfcf7c3(0x5a5)](_0x18200c,_0x25f59d,_0x27d588),this['resetFontSettings'](),!![];},Window_ShopStatus['prototype'][_0x2e9347(0x306)]=function(){const _0x289df8=_0x2e9347;return VisuMZ[_0x289df8(0x2c2)]['Settings']['StatusWindow']['LabelRemove'];},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x45c)]=function(){const _0x272522=_0x2e9347,_0x59c517=_0x272522(0x26c);if(this[_0x272522(0x4ee)][_0x59c517])return this[_0x272522(0x4ee)][_0x59c517];let _0x4dea87='',_0x53f2bb=0x0;const _0x326d4a=VisuMZ[_0x272522(0x2c2)][_0x272522(0x20a)][_0x272522(0x375)][_0x272522(0x5e7)];for(const _0x4e59b9 of this[_0x272522(0x4da)][_0x272522(0x2a7)]){if(_0x272522(0x286)===_0x272522(0x403))_0x2675d1[_0x272522(0x655)][_0x272522(0x496)][_0x272522(0x51f)](this),this[_0x272522(0x18c)]();else{const _0x21e2e4=$dataStates[_0x4e59b9];if(_0x21e2e4&&_0x21e2e4[_0x272522(0x1f2)]>0x0){if(_0x272522(0x175)!==_0x272522(0x4fd)){_0x4dea87+=_0x272522(0x184)[_0x272522(0x410)](_0x21e2e4[_0x272522(0x1f2)]),_0x53f2bb++;if(_0x53f2bb>=_0x326d4a)return _0x4dea87;}else this[_0x272522(0x65a)](_0x5b39e3);}}}for(let _0x441021=0x0;_0x441021<this[_0x272522(0x4da)][_0x272522(0x2b4)][_0x272522(0x3d3)];_0x441021++){const _0x2045f8=this['_itemData'][_0x272522(0x2b4)][_0x441021],_0x95530c=Game_BattlerBase[_0x272522(0x655)][_0x272522(0x467)](0x1,_0x2045f8);if(_0x95530c>0x0){if(_0x272522(0x3d9)===_0x272522(0x3d9)){_0x4dea87+='\x5cI[%1]'[_0x272522(0x410)](_0x95530c),_0x53f2bb++;if(_0x53f2bb>=_0x326d4a)return _0x4dea87;}else return![];}}for(let _0x6ca53c=0x0;_0x6ca53c<this[_0x272522(0x4da)][_0x272522(0x22b)][_0x272522(0x3d3)];_0x6ca53c++){const _0x3bfa5a=this[_0x272522(0x4da)][_0x272522(0x22b)][_0x6ca53c],_0x4515eb=Game_BattlerBase[_0x272522(0x655)][_0x272522(0x467)](-0x1,_0x3bfa5a);if(_0x4515eb>0x0){_0x4dea87+=_0x272522(0x184)[_0x272522(0x410)](_0x4515eb),_0x53f2bb++;if(_0x53f2bb>=_0x326d4a)return _0x4dea87;}}return _0x4dea87;},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x264)]=function(_0x1f0ca7,_0x5dc4e4,_0x126a68){const _0x184f7f=_0x2e9347;if(this[_0x184f7f(0x2f1)]['note'][_0x184f7f(0x1f9)](/<CUSTOM STATUS INFO>\s*([\s\S]*)\s*<\/CUSTOM STATUS INFO>/i)){if(_0x184f7f(0x326)!=='Duzdj'){const _0x3c94a8=_0xcc9f23(_0x39f014['$1'])[_0x184f7f(0x515)](),_0x48df95=_0x2d24f4(_0x151a0f['$2'])[_0x184f7f(0x515)]();this[_0x184f7f(0x5f7)](_0x3c94a8,_0x48df95,_0x54db62,_0x590d53,_0x44825d),_0x1bf2ca+=this[_0x184f7f(0x35e)]();}else{const _0x40219a=String(RegExp['$1'])[_0x184f7f(0x47f)](/[\r\n]+/);for(const _0x5355cc of _0x40219a){if(_0x184f7f(0x4bc)!==_0x184f7f(0x4bc))return this[_0x184f7f(0x2f1)][_0x184f7f(0x6be)];else{if(_0x5355cc[_0x184f7f(0x1f9)](/(.*):[ ](.*)/i)){if('NedYu'==='NedYu'){const _0xb3bb94=String(RegExp['$1'])[_0x184f7f(0x515)](),_0x56e16e=String(RegExp['$2'])['trim']();this[_0x184f7f(0x5f7)](_0xb3bb94,_0x56e16e,_0x1f0ca7,_0x5dc4e4,_0x126a68),_0x5dc4e4+=this[_0x184f7f(0x35e)]();}else{if(!this['isEquipItem']())return![];const _0x1d731f=_0x3e2f1e[_0x184f7f(0x313)][this['_item'][_0x184f7f(0x15c)]];return this[_0x184f7f(0x608)](_0x1d731f,_0x4c05d6,_0x468a62,_0x3b300a,!![]),this['drawItemDarkRect'](_0x519b02,_0x27cad4,_0x39c871),this[_0x184f7f(0x3d6)](),!![];}}}}}}return this[_0x184f7f(0x3d6)](),_0x5dc4e4;},Window_ShopStatus[_0x2e9347(0x655)]['drawItemCustomEntryLine']=function(_0x50edbc,_0x476591,_0x342bdc,_0x34b88b,_0x8a610a){const _0x5b87ca=_0x2e9347;this[_0x5b87ca(0x608)](_0x50edbc,_0x342bdc,_0x34b88b,_0x8a610a,!![]),this[_0x5b87ca(0x608)](_0x476591,_0x342bdc,_0x34b88b,_0x8a610a,![],_0x5b87ca(0x5a1)),this[_0x5b87ca(0x5a5)](_0x342bdc,_0x34b88b,_0x8a610a),this[_0x5b87ca(0x3d6)]();},Window_ShopStatus[_0x2e9347(0x655)]['drawCustomShopGraphic']=function(){const _0x140ae5=_0x2e9347;if(!this[_0x140ae5(0x2f1)])return;const _0x59139f=this[_0x140ae5(0x2f1)][_0x140ae5(0x2c0)],_0x38d520=/<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME):[ ](.*)>/gi,_0x45b5c0=_0x59139f['match'](_0x38d520);if(_0x45b5c0)for(const _0x2a2415 of _0x45b5c0){if('GGepw'===_0x140ae5(0x673))_0x17bf1c=_0x140ae5(0x316);else{_0x2a2415['match'](_0x38d520);const _0x2590ad=String(RegExp['$1'])['trim']()||'';if(_0x2590ad==='')continue;const _0x37e19f=ImageManager[_0x140ae5(0x16d)](_0x2590ad);_0x37e19f[_0x140ae5(0x491)](this[_0x140ae5(0x196)][_0x140ae5(0x245)](this,_0x37e19f,this[_0x140ae5(0x2f1)]));}}},Window_ShopStatus[_0x2e9347(0x655)][_0x2e9347(0x196)]=function(_0x5ed5cf,_0x10c8dd){const _0xe08df1=_0x2e9347;if(this['_item']!==_0x10c8dd)return;if(!_0x5ed5cf)return;if(_0x5ed5cf[_0xe08df1(0x21b)]<=0x0||_0x5ed5cf[_0xe08df1(0x23d)]<=0x0)return;const _0x4d758a=_0x10c8dd[_0xe08df1(0x2c0)];let _0x13c9b3=_0xe08df1(0x453);_0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) LAYER:[ ]FOREGROUND>/i)&&(_0x13c9b3=_0xe08df1(0x316));const _0x2d39f2=_0x13c9b3===_0xe08df1(0x453)?this['contentsBack']:this['contents'];let _0x5b60f7=this['innerWidth'],_0x395752=this['innerHeight'];_0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) MAX WIDTH:[ ](\d+)>/i)&&(_0x5b60f7=Number(RegExp['$1']));_0x4d758a['match'](/<SHOP (?:PICTURE|IMAGE) MAX HEIGHT:[ ](\d+)>/i)&&(_0x395752=Number(RegExp['$1']));_0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS:[ ](\d+),[ ]*(\d+)>/i)&&(_0x5b60f7=Number(RegExp['$1']),_0x395752=Number(RegExp['$2']));const _0x4cbc61=Math[_0xe08df1(0x478)](0x1,_0x5b60f7/_0x5ed5cf['width'],_0x395752/_0x5ed5cf[_0xe08df1(0x23d)]);let _0x261c83=0x0,_0x49866b=0x0,_0x26297f=Math['floor'](_0x5ed5cf['width']*_0x4cbc61),_0x484b6b=Math[_0xe08df1(0x1fc)](_0x5ed5cf['height']*_0x4cbc61),_0x113068=_0xe08df1(0x5a6);_0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT):[ ](LEFT|CENTER|RIGHT)>/i)&&(_0x113068=String(RegExp['$1'])[_0xe08df1(0x692)]()[_0xe08df1(0x515)]());if(_0x113068==='left')_0x261c83=0x0;else{if(_0x113068==='center')_0x261c83=Math['round']((this[_0xe08df1(0x225)]-_0x26297f)/0x2);else{if(_0xe08df1(0x55b)!==_0xe08df1(0x582))_0x261c83=this[_0xe08df1(0x225)]-_0x26297f;else{const _0x3233d5=_0x1a31cb+_0x1b6b05+_0x40f7cf*_0x2d606c;this[_0xe08df1(0x5a5)](_0x3233d5,_0x13ef6b,_0x654fb9,_0x462bd5);}}}let _0x32a4bf='middle';_0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) POSITION:[ ](TOP|MIDDLE|BOTTOM)>/i)&&(_0x32a4bf=String(RegExp['$1'])[_0xe08df1(0x692)]()[_0xe08df1(0x515)]());if(_0x32a4bf===_0xe08df1(0x2e6)){if(_0xe08df1(0x4ae)==='DJPIz'){const _0x2598bf=_0x80cca0[_0xe08df1(0x233)]('['+_0x5b5b0e['$1']['match'](/\d+/g)+']');for(const _0x1764b0 of _0x2598bf){if(_0x8d63bb[_0xe08df1(0x334)](_0x1764b0))return!![];}return![];}else _0x49866b=0x0;}else _0x32a4bf===_0xe08df1(0x46e)?_0x49866b=Math[_0xe08df1(0x48d)]((this['innerHeight']-_0x484b6b)/0x2):_0x49866b=this['innerHeight']-_0x484b6b;_0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) OFFSET X:[ ]([\+\-]\d+)>/i)&&(_0x261c83+=Number(RegExp['$1']));_0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) OFFSET Y:[ ]([\+\-]\d+)>/i)&&(_0x49866b+=Number(RegExp['$1']));if(_0x4d758a['match'](/<SHOP (?:PICTURE|IMAGE) OFFSET:[ ]([\+\-]\d+),[ ]*([\+\-]\d+)>/i)){if('mLtwl'!==_0xe08df1(0x330)){if(this[_0xe08df1(0x331)]&&this['_numberWindow'][_0xe08df1(0x250)])return _0x50eec5[_0xe08df1(0x2c2)][_0xe08df1(0x20a)]['ShopScene'][_0xe08df1(0x227)];return _0x922d2f[_0xe08df1(0x655)]['buttonAssistText2'][_0xe08df1(0x51f)](this);}else _0x261c83+=Number(RegExp['$1']),_0x49866b+=Number(RegExp['$2']);}let _0x516113=0xff;if(_0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)>/i))_0x516113=Number(RegExp['$1']);else _0x4d758a[_0xe08df1(0x1f9)](/<SHOP (?:PICTURE|IMAGE) OPACITY:[ ](\d+)([%％])>/i)&&(_0x516113=Math[_0xe08df1(0x48d)](Number(RegExp['$1'])*0.01*0xff)[_0xe08df1(0x5b5)](0x0,0xff));_0x2d39f2[_0xe08df1(0x3a8)]=_0x516113,_0x2d39f2[_0xe08df1(0x2db)](_0x5ed5cf,0x0,0x0,_0x5ed5cf[_0xe08df1(0x21b)],_0x5ed5cf[_0xe08df1(0x23d)],_0x261c83,_0x49866b,_0x26297f,_0x484b6b),_0x2d39f2['paintOpacity']=0xff;},VisuMZ[_0x2e9347(0x2c2)][_0x2e9347(0x643)]=function(_0x558dee){const _0x371a30=_0x2e9347;if(_0x558dee===null||typeof _0x558dee!==_0x371a30(0x55f))return _0x558dee;const _0x1a820c=Array['isArray'](_0x558dee)?[]:Object[_0x371a30(0x509)](Object[_0x371a30(0x1b9)](_0x558dee));for(const _0x29bbb5 in _0x558dee){if(Object[_0x371a30(0x655)][_0x371a30(0x4d0)][_0x371a30(0x51f)](_0x558dee,_0x29bbb5)){if(_0x371a30(0x3c3)===_0x371a30(0x371))return _0x263165[_0x371a30(0x2c2)][_0x371a30(0x20a)][_0x371a30(0x575)][_0x371a30(0x1ad)];else _0x1a820c[_0x29bbb5]=typeof _0x558dee[_0x29bbb5]===_0x371a30(0x55f)&&_0x558dee[_0x29bbb5]!==null?VisuMZ[_0x371a30(0x2c2)][_0x371a30(0x643)](_0x558dee[_0x29bbb5]):_0x558dee[_0x29bbb5];}}return _0x1a820c;};