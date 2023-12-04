//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.42;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.42] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 * 
 * Action End Removal for States
 * 
 * - If your Plugin Parameter settings for "Action End Update" are enabled,
 * then "Action End" has been updated so that it actually applies per action
 * used instead of just being at the start of a battler's action set.
 * 
 * - However, there are side effects to this: if a state has the "Cannot Move"
 * restriction along with the "Action End" removal timing, then unsurprisingly,
 * the state will never wear off because it's now based on actual actions
 * ending. To offset this and remove confusion, "Action End" auto-removal
 * timings for states with "Cannot Move" restrictions will be turned into
 * "Turn End" auto-removal timings while the "Action End Update" is enabled.
 * 
 * - This automatic change won't make it behave like an "Action End" removal
 * timing would, but it's better than completely softlocking a battler.
 * 
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 * 
 * State Displays
 * 
 * - To put values onto states and display them separately from the state turns
 * you can use the following script calls.
 * 
 *   battler.getStateDisplay(stateId)
 *   - This returns whatever value is stored for the specified battler under
 *     that specific state value.
 *   - If there is no value to be returned it will return an empty string.
 * 
 *   battler.setStateDisplay(stateId, value)
 *   - This sets the display for the battler's specific state to whatever you
 *     declared as the value.
 *   - The value is best used as a number or a string.
 * 
 *   battler.clearStateDisplay(stateId)
 *   - This clears the display for the battler's specific state.
 *   - In short, this sets the stored display value to an empty string.
 * 
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
 *
 * ---
 *
 * ============================================================================
 * Slip Damage Popup Clarification
 * ============================================================================
 * 
 * Slip Damage popups only show one popup for HP, MP, and TP each and it is the
 * grand total of all the states and effects combined regardless of the number
 * of states and effects on a battler. This is how it is in vanilla RPG Maker
 * MZ and this is how we intend for it to be with the VisuStella MZ library.
 * 
 * This is NOT a bug!
 * 
 * The reason we are not changing this is because it does not properly relay
 * information to the player accurately. When multiple popups appear, players
 * only have roughly a second and a half to calculate it all for any form of
 * information takeaway. We feel it is better suited for the player's overall
 * convenience to show a cummulative change and steer the experience towards a
 * more positive one.
 *
 * ============================================================================
 * Passive State Clarification
 * ============================================================================
 * 
 * This section will explain various misconceptions regarding passive states.
 * No, passive states do not work the same way as states code-wise. Yes, they
 * use the same effects as states mechanically, but there are differences.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 * 
 * <List Name: name>
 * 
 * - Used for: Skill Notetags
 * - Makes the name of the skill appear different when show in the skill list.
 * - Using \V[x] as a part of the name will display that variable.
 * 
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the cost of any skill that uses the
 *   'type' cost by a specified amount.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 *   - Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 * 
 * === Item Cost-Related Notetags ===
 * 
 * ---
 * 
 * <Item Cost: x name>
 * <Weapon Cost: x name>
 * <Armor Cost: x name>
 * 
 * - Used for: Skill Notetags
 * - The skill will consume items, weapons, and/or armors in order to be used.
 *   - Even non-consumable items will be consumed.
 * - Replace 'x' with a number representing the respective item cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: 5 Magic Water>
 *   <Item Cost: 2 Antidote>
 *   <Weapon Cost: 1 Short Sword>
 *   <Armor Cost: 3 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost Max: x name>
 * <Item Cost Min: x name>
 *
 * <Weapon Cost Max: x name>
 * <Weapon Cost Min: x name>
 *
 * <Armor Cost Max: x name>
 * <Armor Cost Min: x name>
 * 
 * - Used for: Skill Notetags
 * - Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * - Replace 'x' with a number representing the maximum or minimum cost.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * 
 * Examples:
 * 
 *   <Item Cost Max: 10 Magic Water>
 *   <Item Cost Min: 2 Antidote>
 *   <Weapon Cost Max: 3 Short Sword>
 *   <Armor Cost Min: 1 Cloth Armor>
 * 
 * ---
 *
 * <Item Cost: +x name>
 * <Item Cost: -x name>
 *
 * <Weapon Cost: +x name>
 * <Weapon Cost: -x name>
 *
 * <Armor Cost: +x name>
 * <Armor Cost: -x name>
 * 
 * <Item Cost: x% name>
 * <Weapon Cost: x% name>
 * <Armor Cost: x% name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will raise/lower the item, weapon, and/or armor costs of
 *   any skill that costs those items, weapons, and/or armors by x%.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a rate value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Replace 'name' with text representing the respective item, weapon, or
 *   armor to be consumed.
 * - Insert multiples of this notetag to consume multiple items, weapons,
 *   and/or armors.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 * 
 * Examples:
 * 
 *   <Item Cost: +1 Magic Water>
 *   <Item Cost: -2 Antidote>
 *   <Weapon Cost: 50% Short Sword>
 *   <Armor Cost: 200% Cloth Armor>
 * 
 * ---
 * 
 * <Replace Item name1 Cost: name2>
 * <Replace Weapon name1 Cost: name2>
 * <Replace Armor name1 Cost: name2>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - The related actor will not consume 'name1' items, weapons, or armors.
 *   Instead, the cost will be redirected to 'name2' items, weapons, or armors.
 *   - Even non-consumable items will be consumed.
 * - Replace 'name1' with text representing the respective item, weapon, or
 *   armor that is the original cost type.
 * - Replace 'name2' with text representing the respective item, weapon, or
 *   armor that will be consumed instead.
 * 
 * Examples:
 * 
 *   <Replace Item Magic Water Cost: Potion>
 *   <Replace Item Antidote Cost: Dispel Herb>
 *   <Replace Weapon Short Sword Cost: Falchion>
 *   <Replace Armor Cloth Armor Cost: Leather Armor>
 * 
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - This does not apply to skills added by traits on actors, classes, any
 *   equipment, or states. These are not considered learned skills. They are
 *   considered temporary skills.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if has Skill: x>
 *
 * <Show if have All Skills: x,x,x>
 * <Show if have Any Skills: x,x,x>
 *
 * <Show if has Skill: name>
 *
 * <Show if have All Skills: name, name, name>
 * <Show if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if has Skill: x>
 *
 * <Hide if have All Skills: x,x,x>
 * <Hide if have Any Skills: x,x,x>
 *
 * <Hide if has Skill: name>
 *
 * <Hide if have All Skills: name, name, name>
 * <Hide if have Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills available.
 * - This applies to both skills that have been learned and/or temporarily
 *   added through traits on actors, classes, equipment, or states.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 * - This allows this state to be added to an already dead battler, too.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 * 
 * <Resist State Category: name>
 * <Resist State Categories: name, name, name>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 * 
 * <Resist State Categories>
 *  name
 *  name
 *  name
 * </Resist State Categories>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Causes the affected battler resist the listed categories.
 * - Replace each 'name' with a category name to resist.
 *   - Insert multiple 'name' entries to add more categories.
 * - This works exactly like how state resistances work in-game. If a battler
 *   who was originally NOT resistant to "Poison" before gaining a
 *   poison-resistant trait, the "Poison" state will remain because it was
 *   applied before poison-resistance as enabled.
 * 
 * ---
 *
 * <State x Category Remove: y>
 * 
 * <State x Category Remove: All>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Use the 'All' variant to remove all of the states of that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 * 
 * <Remove Other x States>
 * 
 * - Used for: State Notetags
 * - When the state with this notetag is added, remove other 'x' category
 *   states from the battler (except for the state being added).
 * - Replace 'x' with a category name to remove from.
 * - Insert multiples of this to remove different types of categories.
 * - Useful for thing state types like stances and forms that there is usually
 *   only one active at a time.
 * 
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 * 
 * <Max Turns: x>
 * 
 * - Used for: State Notetags
 * - Determines the upper limit on the maximum number of turns for this state.
 * - Replace 'x' with a number representing the maximum number of turns used
 *   for this state.
 * - If no notetag is used, refer to the default setting found in the Plugin
 *   Parameters under "State Settings".
 * 
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 * - When these states are applied via action effects, the slip calculations
 *   are one time calculations made upon applying and the damage is cached to
 *   be used for future on regeneration calculations.
 * - For that reason, do not include game mechanics here such as adding states,
 *   buffs, debuffs, etc. as this notetag is meant for calculations only. Use
 *   the VisuStella Battle Core's <JS Pre-Regenerate> and <JS Post-Regenerate>
 *   notetags for game mechanics instead.
 * - Passive states and states with the <JS Slip Refresh> notetag are exempt
 *   from the one time calculation and recalculated each regeneration phase.
 *
 * ---
 * 
 * <JS Slip Refresh>
 * 
 * - Used for: State Notetags
 * - Refreshes the calculations made for the JS Slip Damage/Heal amounts at the
 *   start of each regeneration phase to allow for dynamic damage ranges.
 * 
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Class: id>
 * <Passive Condition Classes: id, id, id>
 *
 * <Passive Condition Class: name>
 * <Passive Condition Classes: name, name, name>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on the actor's
 *   current class. As long as the actor's current class matches one of the
 *   data entries, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Multiclass: id>
 * <Passive Condition Multiclass: id, id, id>
 *
 * <Passive Condition Multiclass: name>
 * <Passive Condition Multiclass: name, name, name>
 *
 * - Used for: State Notetags
 * - Requires VisuMZ_2_ClassChangeSystem!
 * - Determines the passive condition of the passive state based on the actor's
 *   multiclasses. As long as the actor has any of the matching classes
 *   assigned as a multiclass, the passive condition is considered passed.
 * - For 'id' variant, replace 'id' with a number representing class's ID.
 * - For 'name' variant, replace 'name' with the class's name.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 * 
 * **NOTE** Not everything can be used as a custom JS Passive Condition due to
 * limitations of the code. There are failsafe checks to prevent infinite loops
 * and some passive conditions will not register for this reason and the
 * conditional checks will behave as if the passive states have NOT been
 * applied for this reason. Such examples include the following:
 * 
 * - A passive state that requires another passive state
 * - A passive state that requires a trait effect from another state
 * - A passive state that requires a parameter value altered by another state
 * - A passive state that requires equipment to be worn but its equipment type
 *   access is provided by another state.
 * - Anything else that is similar in style.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
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
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 * 
 *   Window Width:
 *   - What is the desired pixel width of this window?
 *   - Default: 240
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Settings in regards to how skill cost gauges function and appear.
 *
 * ---
 *
 * Labels
 * 
 *   Font Type:
 *   - Which font type should be used for labels?
 * 
 *   Match Label Color:
 *   - Match the label color to the Gauge Color being used?
 * 
 *     Match: Gauge # ?:
 *     - Which Gauge Color should be matched?
 * 
 *     Preset: Gauge Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 * 
 *   Solid Outline:
 *   - Make the label outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * Values
 * 
 *   Font Type:
 *   - Which font type should be used for values?
 * 
 *   Solid Outline:
 *   - Make the value outline a solid black color?
 * 
 *   Outline Width:
 *   - What width do you wish to use for your outline?
 *   - Use 0 to not use an outline.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 * 
 *   Action End Update:
 *   - States with "Action End" auto-removal will also update turns at the end
 *     of each action instead of all actions.
 * 
 *   Turn End on Map:
 *   - Update any state and buff turns on the map after this many steps.
 *   - Use 0 to disable.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * This is NOT a bug.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 * 
 * As passive states are NOT considered directly applied to, they do NOT match
 * a Conditional Branch's state check as well. The Conditional Branch effect
 * checks for an affected state.
 * 
 * ---
 * 
 * Because passive states are NOT directly applied to a battler, the functions
 * of "addNewState", "addState", "eraseState", "removeState" do NOT apply to
 * passive states either. This means that any of the related JS notetags tied
 * to those functions will not occur either.
 * 
 * ---
 * 
 * Why are passive states not considered affected by? Let's look at it
 * differently. There are two ways to grant skills to actors. They can acquire
 * skills by levels/items/events or they can equip gear that temporarily grants
 * the skill in question.
 * 
 * Learning the skill is direct. Temporarily granting the skill is indirect.
 * These two factors have mechanical importance and require differentiation.
 * 
 * Regular states and passive states are the same way. Regular states are
 * directly applied, therefore, need to be distinguished in order for things
 * like state turns and steps, removal conditionals, and similar to matter at
 * all. Passive states are indirect and are therefore, unaffected by state
 * turns, steps, and removal conditions. These mechanical differences are
 * important for how RPG Maker works.
 * 
 * ---
 * 
 * Once again, it is NOT a bug that when using "a.isStateAffected(10)" to
 * check if a target has a passive state will return false.
 * 
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 * 
 * Cache
 * 
 *   Switch Refresh?:
 *   - Refresh all battle members when switches are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Switch changes during battle in order to
 *     prevent lag spikes.
 * 
 *   Variable Refresh?:
 *   - Refresh all battle members when variables are changed in battle?
 *   - This is primarily used for passive state conditions involve parameters
 *     that do not update due to cached data until a refresh occurs.
 *   - If this is on, do not spam Variable changes during battle in order to
 *     prevent lag spikes.
 * 
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.42: November 16, 2023
 * * Bug Fixes!
 * ** 'origin' variable was not working properly for <JS On Expire State>
 *    JavaScript notetag. Should now be working properly. Fix made by Irina.
 * 
 * Version 1.41: September 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented <Max Turns: x> for states from working due to
 *    one of the recent updates. Fix made by Arisu.
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Apparently, we never put <Max Turns: x> in the help notetag section.
 *    Woops... It's there now.
 * 
 * Version 1.40: August 17, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving the "Item Cost" skill cost type found in the Plugin
 *    Parameters when involving consumable items.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.39: July 13, 2023
 * * Feature Update!
 * ** Updated the "Item Cost" skill cost type found in the Plugin Parameters to
 *    no longer consume items that are key items or nonconsumable.
 * *** If you want to acquire these settings for an already-existing project,
 *     do either of the following:
 * **** Delete the existing VisuMZ_1_SkillsStatesCore.js in the Plugin Manager
 *      list and install the newest version.
 * **** Or create a new project, install VisuMZ_1_SkillsStatesCore.js there,
 *      then copy over the "Item Cost" plugin parameters found in the "Skill
 *      Cost Types" plugin parameter settings to your current project.
 * 
 * Version 1.38: March 16, 2023
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Added segment to <Replace x Gauge: type> in documentation:
 * *** Does not work with 'Item Cost', 'Weapon Cost', or 'Armor Cost'.
 * * New Features!
 * ** New "Skill Cost Type" and notetags added by Arisu and sponsored by FAQ.
 * *** <Item Cost: x name>
 * *** <Weapon Cost: x name>
 * *** <Armor Cost: x name>
 * **** The skill will consume items, weapons, and/or armors in order to be
 *      used. Even non-consumable items will be consumed.
 * *** <Item Cost Max/Min: x name>
 * *** <Weapon Cost Max/Min: x name>
 * *** <Armor Cost Max/Min: x name>
 * **** Sets up a maximum/minimum cost for the item, weapon, armor type costs.
 * *** <Item Cost: x% name>
 * *** <Weapon Cost: x% name>
 * *** <Armor Cost: x% name>
 * **** Alters cost rate of skills that would consume item, weapon, or armor.
 * *** <Item Cost: +/-x name>
 * *** <Weapon Cost: +/-x name>
 * *** <Armor Cost: +/-x name>
 * **** Alters flat costs of skills that would consume item, weapon, or armor.
 * *** <Replace Item name1 Cost: name2>
 * *** <Replace Weapon name1 Cost: name2>
 * *** <Replace Armor name1 Cost: name2>
 * **** Replaces item, weapon, or armor to be consumed for another type.
 * *** Projects with the Skills and States Core already installed will not have
 *     this update, but you can copy over the settings from a new project with
 *     the following steps:
 * **** Create a new project. Install Skills and States Core. Open up the new
 *      project's 'Skill Cost Types'.
 * **** Right click the 'Item Cost' option(s) and click copy.
 * **** Go to the target project's Skills and States Core's 'Skill Cost Types'
 *      plugin parameter. Paste the command where you want it to go.
 * **** Only 'Item Cost' is needed as it encompasses all three types for item,
 *      weapon, and armor costs.
 * 
 * Version 1.38: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.37: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that caused equipment to unequip if the needed equipment
 *    traits came from passive states upon learning new skills. Fix by Irina.
 * 
 * Version 1.36: December 15, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** When enemies are defeated with their entire party having a state with the
 *    <Group Defeat> notetag, then the party will gain EXP, Gold, and Drops
 *    before when they wouldn't. Update made by Irina.
 * * New Features!
 * ** New Plugin Parameter added by Irina!
 * *** Plugin Parameters > Skill Settings > Skill Type Window > Window Width
 * **** What is the desired pixel width of this window? Default: 240
 * 
 * Verison 1.35: October 13, 2022
 * * Feature Update!
 * ** Default values for Passive States > Cache > Switch Refresh? and Variable
 *    Refresh? are now set to "false" in order to prevent sudden lag spikes for
 *    those who are unfamiliar with how this setting works.
 * ** Update made by Irina.
 * 
 * Version 1.34: September 29, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Irina and sponsored by AndyL:
 * *** Plugin Parameters > Gauge Settings
 * **** These settings allow you to make minor tweaks to how the gauges look
 *      ranging from the color used for the labels to the outline types used
 *      for the values.
 * 
 * Version 1.33: August 11, 2022
 * * Bug Fixes!
 * ** Fixed a crash that occurs when performing a custom action sequence
 *    without a skill attached to it. Fix made by Olivia.
 * 
 * Version 1.32: June 16, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Passive State Settings > Cache > Switch Refresh?
 * *** Plugin Parameters > Passive State Settings > Cache > Variable Refresh?
 * **** Refresh all battle members when switches/variables are changed in
 *      battle?
 * **** This is primarily used for passive state conditions involve parameters
 *      that do not update due to cached data until a refresh occurs.
 * **** If this is on, do not spam Switch/Variable changes during battle in
 *      order to prevent lag spikes.
 * 
 * Version 1.31: April 28, 2022
 * * Bug Fixes!
 * ** Custom Slip Damage JS is now totalled correctly into regular slip damage
 *    totals for damage popups. Fix made by Olivia.
 * 
 * Version 1.30: April 14, 2022
 * * Feature Update!
 * ** Changed the state data removal timing to be after JS notetag effects
 *    take place in order for data such as origin data to remain intact. Update
 *    made by Irina.
 * 
 * Version 1.29: March 31, 2022
 * * Bug Fixes!
 * ** Fixed an error with <State x Category Remove: y> not countaing correctly
 *    unless the state count matched the exact amount. The notetag effect
 *    should work properly now. Fix made by Olivia.
 * 
 * Version 1.28: March 10, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** <State x Category Remove: All> updated to allow multiple cases in a
 *    single notebox. Updated by Arisu.
 * * New Features!
 * ** New Notetag added by Arisu and sponsored by Archeia!
 * *** <Remove Other x States>
 * **** When the state with this notetag is added, remove other 'x' category
 *      states from the battler (except for the state being added).
 * **** Useful for thing state types like stances and forms that there is
 *      usually only one active at a time.
 * 
 * Version 1.27: January 27, 2022
 * * Bug Fixes!
 * ** Custom JS Slip Damage/Healing values should now be recalculated on
 *    demand. Fix made by Olivia.
 * 
 * Version 1.26: January 20, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** Conditional Passive Bypass check is now stronger to prevent even more
 *    infinite loops from happening. Update made by Olivia.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > State Settings > General > Turn End on Map
 * **** Update any state and buff turns on the map after this many steps.
 * **** Use 0 to disable.
 * 
 * Version 1.25: November 11, 2021
 * * Bug Fixes!
 * ** Hidden skill notetags should no longer crash upon not detecting actors
 *    for learned skills. Fix made by Olivia.
 * 
 * Version 1.24: November 4, 2021
 * * Documentation Update!
 * ** Added section: "Slip Damage Popup Clarification"
 * *** Slip Damage popups only show one popup for HP, MP, and TP each and it is
 *     the grand total of all the states and effects combined regardless of the
 *     number of states and effects on a battler. This is how it is in vanilla
 *     RPG Maker MZ and this is how we intend for it to be with the VisuStella
 *     MZ library.
 * *** This is NOT a bug!
 * *** The reason we are not changing this is because it does not properly
 *     relay information to the player accurately. When multiple popups appear,
 *     players only have roughly a second and a half to calculate it all for
 *     any form of information takeaway. We feel it is better suited for the
 *     player's overall convenience to show a cummulative change and steer the
 *     experience towards a more positive one.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.23: September 17, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.3.3 compatibility.
 * *** Updated how gauges are drawn.
 * *** Skill Cost Types Plugin Parameters need to be updated for those who want
 *     the updated gauges. This can be done easily with the following steps:
 * **** Step 1: Create a new project.
 * **** Step 2: Install Skills and States Core version 1.23 into it.
 * **** Step 3: Copy the Plugin Parameter Settings for "Skill Cost Types".
 * **** Step 4: Return back to your original project.
 * **** Step 5: Paste Plugin Parameter Settings on top of "Skill Cost Types".
 * 
 * Version 1.22: August 6, 2021
 * * Documentation Update!
 * ** "Action End Removal for States" under Major Updates is changed to:
 * *** If your Plugin Parameter settings for "Action End Update" are enabled,
 *     then "Action End" has been updated so that it actually applies per
 *     action used instead of just being at the start of a battler's action
 *     set.
 * *** However, there are side effects to this: if a state has the "Cannot
 *     Move" restriction along with the "Action End" removal timing, then
 *     unsurprisingly, the state will never wear off because it's now based on
 *     actual actions ending. To offset this and remove confusion, "Action End"
 *     auto-removal timings for states with "Cannot Move" restrictions will be
 *     turned into "Turn End" auto-removal timings while the "Action End
 *     Update" is enabled.
 * *** This automatic change won't make it behave like an "Action End" removal
 *     timing would, but it's better than completely softlocking a battler.
 * * Feature Update!
 * ** Those using "Cannot Move" states with "Action End" auto-removal will now
 *    have be automatically converted into "Turn End" auto-removal if the
 *    plugin parameter "Action End Update" is set to true. Update by Irina.
 * 
 * Version 1.21: July 30, 2021
 * * Documentation Update!
 * ** Expanded "Action End Removal for States" section in Major Changes.
 * *** These changes have been in effect since Version 1.07 but have not been
 *     explained in excess detail in the documentation since.
 * **** Action End has been updated so that it actually applies per action used
 *      instead of just being at the start of a battler's action set. However,
 *      there are side effects to this: if a state has the "Cannot Move"
 *      restriction along with the "Action End" removal timing, then
 *      unsurprisingly, the state will never wear off because it's now based on
 *      actual actions ending. There are two solutions to this:
 * **** Don't make "Cannot Move" restriction states with "Action End". This is
 *      not a workaround. This is how the state removal is intended to work
 *      under the new change.
 * **** Go to the Skills & States Core Plugin Parameters, go to State
 *      Setttings, look for "Action End Update", and set it to false. You now
 *      reverted the removal timing system back to how it originally was in RPG
 *      Maker MZ's default battle system where it only updates based on an
 *      action set rather than per actual action ending.
 * 
 * Version 1.20: June 18, 2021
 * * Feature Update!
 * ** Updated automatic caching for conditional passive states to update more
 *    efficiently. Update made by Arisu.
 * 
 * Version 1.19: June 4, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.18: May 21, 2021
 * * Documentation Update
 * ** Added "Passive State Clarification" section.
 * *** As there is a lot of confusion regarding how passive states work and how
 *     people still miss the explanations found in the "Passive State Notetags"
 *     section AND the "Plugin Parameters: Passive State Settings", we are
 *     adding a third section to explain how they work.
 * *** All three sections will contain the full detailed explanation of how
 *     passive states work to clear common misconceptions about them.
 * 
 * Version 1.17: May 7, 2021
 * * Bug Fixes
 * ** State category removal is now usable outside of battle. Fix by Irina.
 * 
 * Version 1.16: April 30, 2021
 * * Bug Fixes!
 * ** When states with step removal have the <No Recover All Clear> or
 *    <No Death Clear> notetags, their step counter is no longer reset either.
 *    Fix made by Irina.
 * * New Features!
 * ** New notetag added by Arisu!
 * *** <List Name: name>
 * **** Makes the name of the skill appear different when show in the skill
 *      list. Using \V[x] as a part of the name will display that variable.
 * 
 * Version 1.15: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.14: March 12, 2021
 * * Bug Fixes!
 * ** Max HP Buff/Debuff should now display its turn counter. Fix by Yanfly.
 * * Documentation Update!
 * ** For the <JS Passive Condition>, we've added documentation on the
 *    limitations of passive conditions since they have been reported as bug
 *    reports, when in reality, they are failsafes to prevent infinite loops.
 *    Such limitations include the following:
 * *** A passive state that requires another passive state
 * *** A passive state that requires a trait effect from another state
 * *** A passive state that requires a parameter value altered by another state
 * *** A passive state that requires equipment to be worn but its equipment
 *     type access is provided by another state.
 * *** Anything else that is similar in style.
 * 
 * Version 1.13: February 26, 2021
 * * Documentation Update!
 * ** For <JS type Slip Damage> and <JS type Slip Heal> notetags, added the
 *    following notes:
 * *** When these states are applied via action effects, the slip calculations
 *     are one time calculations made upon applying and the damage is cached to
 *     be used for future on regeneration calculations.
 * *** For that reason, do not include game mechanics here such as adding
 *     states, buffs, debuffs, etc. as this notetag is meant for calculations
 *     only. Use the VisuStella Battle Core's <JS Pre-Regenerate> and
 *     <JS Post-Regenerate> notetags for game mechanics instead.
 * *** Passive states and states with the <JS Slip Refresh> notetag are exempt
 *     from the one time calculation and recalculated each regeneration phase.
 * * Feature Update!
 * ** Changed slip refresh requirements to entail <JS Slip Refresh> notetag for
 *    extra clarity. Update made by Olivia.
 * 
 * Version 1.12: February 19, 2021
 * * Feature Update
 * ** Changed the way passive state infinite stacking as a blanket coverage.
 *    Update made by Olivia.
 * 
 * Version 1.11: February 12, 2021
 * * Bug Fixes!
 * ** Added a check to prevent passive states from infinitely stacking. Fix
 *    made by Olivia.
 * 
 * Version 1.10: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Feature!
 * ** New Plugin Parameters added
 * *** Plugin Parameters > Skill Settings > Background Type
 * 
 * Version 1.09: January 1, 2021
 * * Bug Fixes!
 * ** Custom JS TP slip damage and healing should now work properly.
 *    Fix made by Yanfly.
 * 
 * Version 1.08: December 25, 2020
 * * Bug Fixes!
 * ** <JS On Add State> should no longer trigger multiple times for the death
 *    state. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for updated feature(s)!
 * * Feature Update!
 * ** <No Death Clear> can now allow the affected state to be added to an
 *    already dead battler. Update made by Yanfly.
 * 
 * Version 1.07: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** New notetags added by Yanfly:
 * *** <Passive Condition Multiclass: id>
 * *** <Passive Condition Multiclass: id, id, id>
 * *** <Passive Condition Multiclass: name>
 * *** <Passive Condition Multiclass: name, name, name>
 * ** New Plugin Parameter added by Yanfly.
 * *** Plugin Parameters > States > General > Action End Update
 * **** States with "Action End" auto-removal will also update turns at the end
 *      of each action instead of all actions.
 * ***** Turn this off if you wish for state turn updates to function like they
 *       do by default for "Action End".
 * 
 * Version 1.06: December 4, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.05: November 15, 2020
 * * Bug Fixes!
 * ** The alignment of the Skill Type Window is now fixed and will reflect upon
 *    the default settings. Fix made by Yanfly.
 * * Documentation Update!
 * ** Added documentation for new feature(s)!
 * * New Features!
 * ** <State x Category Remove: All> notetag added by Yanfly.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.04: September 27, 2020
 * * Documentation Update
 * ** "Use Updated Layout" plugin parameters now have the added clause:
 *    "This will override the Core Engine windows settings." to reduce
 *    confusion. Added by Irina.
 * 
 * Version 1.03: September 13, 2020
 * * Bug Fixes!
 * ** <JS type Slip Damage> custom notetags now work for passive states. Fix
 *    made by Olivia.
 * ** Setting the Command Window style to "Text Only" will no longer add in
 *    the icon text codes. Bug fixed by Yanfly.
 * 
 * Version 1.02: August 30, 2020
 * * Bug Fixes!
 * ** The JS Notetags for Add, Erase, and Expire states are now fixed. Fix made
 *    by Yanfly.
 * * Documentation Update!
 * ** <Show if learned Skill: x> and <Hide if learned Skill: x> notetags have
 *    the following added to their descriptions:
 * *** This does not apply to skills added by traits on actors, classes, any
 *     equipment, or states. These are not considered learned skills. They are
 *     considered temporary skills.
 * * New Features!
 * ** Notetags added by Yanfly:
 * *** <Show if has Skill: x>
 * *** <Show if have All Skills: x,x,x>
 * *** <Show if have Any Skills: x,x,x>
 * *** <Show if has Skill: name>
 * *** <Show if have All Skills: name, name, name>
 * *** <Show if have Any Skills: name, name, name>
 * *** <Hide if has Skill: x>
 * *** <Hide if have All Skills: x,x,x>
 * *** <Hide if have Any Skills: x,x,x>
 * *** <Hide if has Skill: name>
 * *** <Hide if have All Skills: name, name, name>
 * *** <Hide if have Any Skills: name, name, name>
 * *** These have been added to remove the confusion regarding learned skills
 *     as skills added through trait effects are not considered learned skills
 *     by RPG Maker MZ.
 * 
 * Version 1.01: August 23, 2020
 * * Bug Fixes!
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00: August 20, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst label = TextManager.hpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst label = TextManager.mpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst label = TextManager.tpA;\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = bitmapWidth;\\\\nconst lh = bitmapHeight;\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Settings\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\n\\\\n// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\nconst bitmapWidth = sprite.bitmapWidth();\\\\nconst bitmapHeight = sprite.textHeight ? sprite.textHeight() : sprite.bitmapHeight();\\\\nconst gaugeHeight = sprite.gaugeHeight();\\\\n\\\\n// Draw Gauge\\\\nconst gx = 0;\\\\nconst gy = bitmapHeight - gaugeHeight;\\\\nconst gw = bitmapWidth - gx;\\\\nconst gh = gaugeHeight;\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = bitmapWidth - 2;\\\\nconst vh = bitmapHeight;\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Item Cost\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = {\\\\n    items: {},\\\\n    weapons: {},\\\\n    armors: {},\\\\n};\\\\n\\\\n// Gather Cost Notetags\\\\n{ // Item Costs\\\\n    const notetag = /<ITEM COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.items[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Costs\\\\n    const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.weapons[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Costs\\\\n    const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n    const matches = note.match(notetag);\\\\n    if (matches) {\\\\n        for (const currentMatch of matches) {\\\\n            currentMatch.match(notetag);\\\\n            const amount = Number(RegExp.$1);\\\\n            const name = String(RegExp.$2).toUpperCase().trim();\\\\n            const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n            if (entry) {\\\\n                cost.armors[entry.id] = amount;\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Declare Trait Objects\\\\nconst traitObjects = user.traitObjects();\\\\n\\\\n// Apply Cost Rate Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Cost Rate Modifiers\\\\n        const notetag = /<ITEM COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] = Math.ceil(cost.items[entry.id] * rate);\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Cost Rate Modifiers\\\\n        const notetag = /<WEAPON COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] = Math.ceil(cost.weapons[entry.id] * rate);\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Cost Rate Modifiers\\\\n        const notetag = /<ARMOR COST:[ ](\\\\\\\\d+)([%％])[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const rate = Number(RegExp.$1) * 0.01;\\\\n                const name = String(RegExp.$3).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] = Math.ceil(cost.armors[entry.id] * rate);\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Flat Cost Modifiers\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Flat Cost Modifiers\\\\n        const notetag = /<ITEM COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id]) {\\\\n                    cost.items[entry.id] += flat;\\\\n                    if (cost.items[entry.id] <= 0) cost.items[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Flat Cost Modifiers\\\\n        const notetag = /<WEAPON COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id]) {\\\\n                    cost.weapons[entry.id] += flat;\\\\n                    if (cost.weapons[entry.id] <= 0) cost.weapons[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Flat Cost Modifiers\\\\n        const notetag = /<ARMOR COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const flat = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id]) {\\\\n                    cost.armors[entry.id] += flat;\\\\n                    if (cost.armors[entry.id] <= 0) cost.armors[entry.id] = 0;\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Set Cost Limits\\\\n{ // Item Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ITEM COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.min(max, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ITEM COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.items[entry.id] !== undefined) {\\\\n                    cost.items[entry.id] = Math.max(min, cost.items[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Weapon Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<WEAPON COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.min(max, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<WEAPON COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.weapons[entry.id] !== undefined) {\\\\n                    cost.weapons[entry.id] = Math.max(min, cost.weapons[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Armor Cost Limits\\\\n    { // Maximum Cost\\\\n        const notetag = /<ARMOR COST MAX:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const max = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.min(max, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Minimum Cost\\\\n        const notetag = /<ARMOR COST MIN:[ ](\\\\\\\\d+)[ ](.*)>/gi;\\\\n        const matches = note.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const min = Number(RegExp.$1);\\\\n                const name = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name);\\\\n                if (entry && cost.armors[entry.id] !== undefined) {\\\\n                    cost.armors[entry.id] = Math.max(min, cost.armors[entry.id]);\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Apply Replacement Costs\\\\nfor (const traitObject of traitObjects) {\\\\n    if (!traitObject) continue;\\\\n    const objNote = traitObject.note || '';\\\\n    { // Item Replacement Costs\\\\n        const notetag = /<REPLACE ITEM (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataItems.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.items[entry1.id]) {\\\\n                    cost.items[entry2.id] = cost.items[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Weapon Replacement Costs\\\\n        const notetag = /<REPLACE WEAPON (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataWeapons.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.weapons[entry1.id]) {\\\\n                    cost.weapons[entry2.id] = cost.weapons[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n    { // Armor Replacement Costs\\\\n        const notetag = /<REPLACE ARMOR (.*) COST:[ ](.*)>/gi;\\\\n        const matches = objNote.match(notetag);\\\\n        if (matches) {\\\\n            for (const currentMatch of matches) {\\\\n                currentMatch.match(notetag);\\\\n                const name1 = String(RegExp.$1).toUpperCase().trim();\\\\n                const name2 = String(RegExp.$2).toUpperCase().trim();\\\\n                const entry1 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name1);\\\\n                const entry2 = $dataArmors.find(obj => obj && obj.name.toUpperCase().trim() === name2);\\\\n                if (entry1 && entry2 && cost.armors[entry1.id]) {\\\\n                    cost.armors[entry2.id] = cost.armors[entry1.id];\\\\n                    delete cost.items[entry1.id];\\\\n                }\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return cost data\\\\nreturn cost;\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Individual Costs\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.items[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            const ownedAmount = $gameParty.numItems(obj);\\\\n            if (costAmount > ownedAmount) return false;\\\\n        }\\\\n    }\\\\n}\\\\n\\\\n// Return True\\\\nreturn true;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n{ // Check Item Costs\\\\n    for (let id in cost.items) {\\\\n        const obj = $dataItems[id];\\\\n        if (obj && obj.consumable) {\\\\n            if (obj.itypeId !== 2) {\\\\n                const costAmount = cost.items[id];\\\\n                $gameParty.loseItem(obj, costAmount);\\\\n            }\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Weapon Costs\\\\n    for (let id in cost.weapons) {\\\\n        const obj = $dataWeapons[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.weapons[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\\n{ // Check Armor Costs\\\\n    for (let id in cost.armors) {\\\\n        const obj = $dataArmors[id];\\\\n        if (obj) {\\\\n            const costAmount = cost.armors[id];\\\\n            $gameParty.loseItem(obj, costAmount);\\\\n        }\\\\n    }\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Check Keys\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\n\\\\n// Return False\\\\nreturn keys.some(key => Object.keys(cost[key]).length > 0);\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nconst keys = ['items', 'weapons', 'armors'];\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\nfor (const key of keys) {\\\\n    const database = [$dataItems, $dataWeapons, $dataArmors][keys.indexOf(key)];\\\\n    const costData = cost[key];\\\\n    const idList = Object.keys(costData).sort((a, b) => a - b);\\\\n    for (const id of idList) {\\\\n        const obj = database[id];\\\\n        const iconIndex = obj.iconIndex;\\\\n        const costAmount = costData[id];\\\\n        text += '\\\\\\\\\\\\\\\\I[%1]×%2 '.format(iconIndex, costAmount);\\\\n    }\\\\n}\\\\n\\\\n// Return text\\\\nreturn text.trim();\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn 0;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Don't Draw Anything\\\\n// This does not work as a gauge.\\\"\"}"]
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Skills:struct
 * @type struct<Gauge>
 * @desc Settings in regards to how skill cost gauges function and appear.
 * @default {"Labels":"","LabelFontMainType:str":"main","MatchLabelColor:eval":"true","MatchLabelGaugeColor:num":"2","PresetLabelGaugeColor:num":"16","LabelOutlineSolid:eval":"true","LabelOutlineWidth:num":"3","Values":"","ValueFontMainType:str":"number","ValueOutlineSolid:eval":"true","ValueOutlineWidth:num":"3"}
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","ActionEndUpdate:eval":"true","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
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
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 * 
 * @param CmdWidth:num
 * @text Window Width
 * @parent SkillTypeWindow
 * @type number
 * @min 1
 * @desc What is the desired pixel width of this window?
 * Default: 240
 * @default 240
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
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillSceneStatusBgType:num
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
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param Labels
 *
 * @param LabelFontMainType:str
 * @text Font Type
 * @parent Labels
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for labels?
 * @default main
 *
 * @param MatchLabelColor:eval
 * @text Match Label Color
 * @parent Labels
 * @type boolean
 * @on Match
 * @off Preset
 * @desc Match the label color to the Gauge Color being used?
 * @default true
 *
 * @param MatchLabelGaugeColor:num
 * @text Match: Gauge # ?
 * @parent MatchLabelColor:eval
 * @type number
 * @min 1
 * @max 2
 * @desc Which Gauge Color should be matched?
 * @default 2
 *
 * @param PresetLabelGaugeColor:num
 * @text Preset: Gauge Color
 * @parent MatchLabelColor:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param LabelOutlineSolid:eval
 * @text Solid Outline
 * @parent Labels
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the label outline a solid black color?
 * @default true
 *
 * @param LabelOutlineWidth:num
 * @text Outline Width
 * @parent Labels
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 * @param Values
 *
 * @param ValueFontMainType:str
 * @text Font Type
 * @parent Values
 * @type select
 * @option main
 * @option number
 * @desc Which font type should be used for values?
 * @default number
 *
 * @param ValueOutlineSolid:eval
 * @text Solid Outline
 * @parent Values
 * @type boolean
 * @on Solid
 * @off Semi-Transparent
 * @desc Make the value outline a solid black color?
 * @default true
 *
 * @param ValueOutlineWidth:num
 * @text Outline Width
 * @parent Values
 * @type number
 * @min 0
 * @desc What width do you wish to use for your outline?
 * Use 0 to not use an outline.
 * @default 3
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param ActionEndUpdate:eval
 * @text Action End Update
 * @parent General
 * @type boolean
 * @on Update Each Action
 * @off Don't Change
 * @desc States with "Action End" auto-removal will also update
 * turns at the end of each action instead of all actions.
 * @default true
 *
 * @param TurnEndOnMap:num
 * @text Turn End on Map
 * @parent General
 * @type number
 * @desc Update any state and buff turns on the map after
 * this many steps. Use 0 to disable.
 * @default 20
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param Cache
 *
 * @param RefreshCacheSwitch:eval
 * @text Switch Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when switches are changed in battle?
 * @default false
 *
 * @param RefreshCacheVar:eval
 * @text Variable Refresh?
 * @parent Cache
 * @type boolean
 * @on Refresh
 * @off No Changes
 * @desc Refresh all battle members when variables are changed in battle?
 * @default false
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

function _0x2904(_0x36169a,_0x3b132c){const _0x55011a=_0x5501();return _0x2904=function(_0x29046a,_0x2c7145){_0x29046a=_0x29046a-0x156;let _0x2a2035=_0x55011a[_0x29046a];return _0x2a2035;},_0x2904(_0x36169a,_0x3b132c);}function _0x5501(){const _0x2a0c80=['max','skillCostSeparator','getStateIdWithName','itemWindowRectSkillsStatesCore','qZOHX','fmgyK','labelFontFace','recoverAll','RefreshCacheSwitch','BTzLk','setActor','Game_Action_testApply','hUVkD','isAllDead','process_VisuMZ_SkillsStatesCore_Skill_Notetags','fsWou','RCuZD','jBYbT','hasSkill','SkillSceneStatusBgType','380cfLotZ','kGXex','doQkE','textColor','gpJHJ','MHUmy','IconStypeMagic','TFvYA','totalStateCategoryAffected','ShowJS','kBmPe','nYDOn','_buffTurns','UCABn','drawItemStyleIconText','slipTp','ValueOutlineWidth','applyDebuffTurnManipulationEffects','TJnjs','overwriteBuffTurns','itemWindowRect','gaugeLineHeight','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','WeHGa','TwoWO','Game_BattlerBase_overwriteBuffTurns','Game_BattlerBase_eraseBuff','hlqXx','_commandNameWindow','_skills','_stateIDs','getStateReapplyRulings','isMaxBuffAffected','SZLzQ','opacity','slipHp','Game_BattlerBase_refresh','testApply','windowPadding','BiqAD','spTuB','onAddBuff','isSkillCostShown','buffColor','Game_Troop_setup','getCurrentTroopUniqueID','onBattleEnd','Game_BattlerBase_clearStates','%1\x20%2\x20%3','filter','_scene','toUpperCase','Scene_Skill_skillTypeWindowRect','commandName','Parse_Notetags_State_Category','Window_StatusBase_drawActorIcons','traitsSet','RefreshCacheVar','_stored_debuffColor','_actor','stateHpSlipDamageJS','rpkut','CxUpg','Actor','Gcdea','vGVoz','damage','initialize','lineHeight','Sprite_Gauge_initMembers','Waxig','applyItemUserEffect','Game_Battler_isStateAddable','NEGATIVE','buff','GroupDigits','ignore','gainHp','currentValueSkillsStatesCore','currentMaxValue','LhiEj','resetStateCounts','calcWindowHeight','iconIndex','UkFTS','onDatabaseLoaded','WCkej','setStateDisplay','shopStatusWidth','qKBTV','rUeTC','drawExtendedParameter','Sprite_Gauge_currentMaxValue','regenerateAll','Game_Battler_addDebuff','Settings','paramValueByName','getColorDataFromPluginParameters','skillEnableJS','isUseModernControls','callUpdateHelp','eZbqC','pKClS','meetsStateCondition','slipMp','JSON','Parse_Notetags_State_SlipEffectJS','convertPassiveStates','stateAddJS','drawFullGauge','RWSKh','statusWindowRectSkillsStatesCore','mZCyz','meetsSkillConditionsGlobalJS','createCommandNameWindow','totalStateCategory','iconText','stateTurns','_stored_buffColor','VisuMZ_1_MainMenuCore','Window_SkillList_includes','floor','_checkingTraitsSetSkillsStatesCore','onEraseStateJS','increaseBuff','POSITIVE','oMfAl','recalculateSlipDamageJS','zBXif','NUM','onExpireStateGlobalJS','BattleManager_endAction','commandStyleCheck','chPlt','IWiXV','addBuff','Window_SkillList_maxCols','drawSkillCost','alterSkillName','itemAt','225064mFExJK','mainCommandWidth','SLuMi','onAddDebuff','\x5cI[%1]%2','461601hOVFPf','KSbKs','checkShowHideNotetags','currentValue','ShowShopStatus','_stateMaxTurns','GBBKD','labelOutlineColor','xXyqx','helpWindowRectSkillsStatesCore','eKrpv','937195jyjPjO','stateCategoriesResisted','24NFsCVn','getStateData','labelFontSize','isStateCategoryAffected','useDigitGrouping','cgcic','JAnOk','onEraseStateCustomJS','_colorCache','actions','learnSkill','WdKrq','SbEqr','mbMBw','gaugeRate','iWviW','Game_Battler_addBuff','MUemp','valueOutlineWidth','bnust','hpDamage','currentMaxValueSkillsStatesCore','ANY','checkSkillTypeMatch','CmdWidth','currentClass','fontSize','EVAL','isCommandEnabled','createItemWindow','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','skillTypeWindowRect','stateHpSlipHealJS','sort','death','isAlive','enemy','applyBuffTurnManipulationEffects','TurnOffsetX','_stateData','_currentTroopUniqueID','createAllSkillCostText','_buffs','skillTypes','_endingBattle','updateStatesActionEnd','isRightInputMode','loadBitmap','skill','VisuMZ_0_CoreEngine','ARRAYJSON','addPassiveStatesFromOtherPlugins','flMnT','meetsPassiveStateConditionSwitches','valueFontFace','Param','UkdrQ','normalColor','isPassiveStateStackable','updateCommandNameWindow','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','states','139584cHvHjm','mSToN','ParseStateNotetags','isStateRemoved','kGFlA','vbkGT','ItfIm','getStypeIdWithName','onEraseDebuff','priority','right','RmVdr','item','drawActorBuffTurns','uiMenuStyle','deadMembers','Parse_Notetags_Skill_Cost','addPassiveStatesTraitSets','DEF','CheckVisibleSwitchNotetags','Imsng','DisplayedParams','setStateOrigin','_tempBattler','onAddStateGlobalJS','rXysw','Game_BattlerBase_buffIconIndex','commandNameWindowDrawBackground','LBbdG','EtzKc','parse','DxRLI','onAddStateCustomJS','gaugeColor2','skillTpCost','cWXsp','ColorDebuff','isBuffPrevented','ReapplyRules','makeSuccess','groupDefeat','ziuoi','isStateAddable','Sprite_StateIcon_updateFrame','skillId','value','Game_BattlerBase_die','Game_BattlerBase_resetStateCounts','setBuffTurns','isSkillHidden','dnIqS','stateId','innerHeight','onAddStateMakeCustomSlipValues','log','vAkKV','stepsForTurn','itemLineRect','ShowTurns','initMembersSkillsStatesCore','scrollTo','SkLUj','nuFvG','onExpireDebuff','isBottomHelpMode','xFNXD','setStateRetainType','resetTextColor','setBackgroundType','Game_Unit_isAllDead','270wQcSEj','prepareResetStateCounts','FUNC','test','_subject','iconWidth','clamp','uKsnR','clearStatesWithStateRetain','RedCF','bZBlu','slice','SLPmy','SkillConditionJS','_stateTurns','ZSuuZ','makeResistedStateCategories','LabelFontMainType','checkSkillConditionsNotetags','iMAlD','_tempActor','Game_BattlerBase_skillTpCost','Game_BattlerBase_eraseState','regenerateAllSkillsStatesCore','isDebuffAffected','eraseBuff','getColor','wlrNy','add','getStateRetainType','OHsTV','meetsPassiveStateConditionJS','jnHJf','LabelOutlineWidth','setupSkillsStatesCore','Parse_Notetags_Skill_JS','onAddStateJS','CmdTextAlign','onExpireStateCustomJS','split','enemyId','clear','changeTextColor','reset','PxkNw','rVewr','_skillTypeWindow','makeCurrentTroopUniqueID','363KegAhQ','vOosO','addPassiveStatesByNotetag','_stored_state-%1-color','statesByCategory','CanPayJS','isStateExpired','MAXHP','KqBkO','onEraseDebuffJS','clearStates','dZipg','mainFontFace','MaxTurns','jKTsl','name','mpDamage','shopStatusWindowRect','PayJS','Scene_Boot_onDatabaseLoaded','numberFontFace','description','isStateResist','drawActorStateTurns','PassiveStates','dGEmu','isPlaytest','xOeve','sSeIX','onExpireDebuffGlobalJS','buffTurns','setDebuffTurns','Window_StatusBase_placeGauge','drawExtendedSkillsStatesCoreStatus','DataFontSize','VisuMZ_2_ClassChangeSystem','_stateSteps','drawParamText','clearStateDisplay','rVLzG','dvBvx','gradientFillRect','drawItem','gainMp','_costSettings','wpURl','exit','decreaseBuff','gainSilentTp','Game_BattlerBase_isStateResist','drawIcon','addPassiveStatesByPluginParameters','DxGcD','TurnFontSize','_passiveStateResults','ADryS','skillVisibleJS','isBuffExpired','kboAG','getCurrentStateActiveUser','WLMhf','changePaintOpacity','onExpireBuffGlobalJS','MndKU','hide','greater','NEcGk','RNBfH','Global','textSizeEx','onEraseDebuffGlobalJS','_result','CheckIncompatibleStates','SkillsStatesCore','UkxNZ','_stypeIDs','wAJYZ','height','recover\x20all','LUK','<enemy-%1>','_currentActor','keys','labelOutlineWidth','addChild','ALL','sEwsR','passiveStates','STRUCT','concat','addStateTurns','pLsxx','_turnDisplaySprite','DJKes','RKXkf','updateVisibility','onEraseBuffJS','dWMXu','meetsSkillConditions','updatedLayoutStyle','mZcHf','Window_SkillList_setActor','AaikM','29300ECWFoy','updateTurnDisplaySprite','statusWidth','Sprite_Gauge_redraw','vEflO','addBuffTurns','uiInputPosition','<troop-%1>','skillMpCost','isSkillUsableForAutoBattle','_checkingPassiveStates','NEhDG','fontBold','Parse_Notetags_State_PassiveJS','stateMaximumTurns','helpAreaHeight','setStateTurns','Aedik','ARRAYNUM','MatchLabelGaugeColor','nrzYP','TOgJT','push','daAzB','initMembers','isStateCategoryResisted','toLowerCase','yEmNR','clearAllStateOrigins','removeStatesByCategoryAll','canPaySkillCost','SkillMenuStatusRect','onExpireStateJS','uiHelpPosition','%1%','maxCols','parameters','Window_SkillList_drawItem','onEraseStateGlobalJS','Skills','VisuMZ_1_ItemsEquipsCore','meetsPassiveStateConditions','paramBuffRate','ParseSkillNotetags','yAcHu','isSkillTypeMatchForUse','onExpireBuff','onRemoveState','drawTextEx','DataOffsetY','TurnOffsetY','hasState','constructor','commandNameWindowCenter','outlineColor','kwfsu','index','buffIconIndex','removeBuff','Txifd','removeStatesByCategory','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','removeOtherStatesOfSameCategory','updateStateTurns','mainAreaTop','none','meetsSkillConditionsEnableJS','545083PvLLEp','STR','TDcdf','Sprite_Gauge_setup','contents','_hidden','TextJS','adjustSkillCost','_stypeId','addDebuffTurns','trim','Sfzpz','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','trSqA','MqMEr','ParseAllNotetags','vqXhA','onExpireState','ValueFontMainType','isUseSkillsStatesCoreUpdatedLayout','XmdNQ','GaugeDrawJS','URTwt','Game_Battler_regenerateAll','isLearnedSkill','BzUja','ULVXV','hBypD','IrVob','_classIDs','refresh','status','convertGaugeTypeSkillsStatesCore','_itemWindow','SgzRI','mainFontSize','bitmap','_stateRetainType','multiclasses','meetsPassiveStateConditionClasses','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','wjjOw','Game_BattlerBase_recoverAll','isPartyAllAffectedByGroupDefeatStates','kWwmX','QKqjx','uIMXN','tpCost','getSkillIdWithName','wlPaB','stateMpSlipDamageJS','endAction','remove','checkSkillConditionsSwitchNotetags','ATGYZ','onEraseBuff','stateData','duObC','FjTnf','magicSkills','createSkillCostText','EnableLayout','resetFontSettings','return\x200','onChange','valueOutlineColor','_skillIDs','ListWindowCols','isBuffOrDebuffAffected','addState','Game_BattlerBase_increaseBuff','GJnna','inBattle','actor','YTmYo','isActor','GKzsA','updateFrame','itemTextAlign','ggzXn','icon','ColorBuff','onAddState','_categoryWindow','ColorNegative','PVjWh','Window_SkillType_initialize','removeStatesAuto','ShowData','innerWidth','allIcons','wOcmm','criHz','drawActorIcons','fzzaa','AGI','CheckVisibleSkillNotetags','mpCost','_battler','<member-%1>','drawActorStateData','ZiDjf','Gauge','HiddenSkillTypes','QIXxY','vSPKh','urJBZ','uEpQB','convertTargetToStateOriginKey','QfcCt','ceil','redraw','addCommand','YHXIk','canClearState','qGIaU','clearStateData','createTurnDisplaySprite','fHelG','buffLength','shopStatusWindowRectSkillsStatesCore','EKthe','Game_Actor_forgetSkill','Game_Action_applyItemUserEffect','Game_Battler_addState','wXVmn','Game_BattlerBase_initMembers','checkShowHideJS','stateTpSlipHealJS','djptG','makeAdditionalSkillCostText','includes','user','ZvmJh','sRvgA','Zlvrl','HJSeI','ljdsd','isStateAffected','Game_Battler_onBattleEnd','LDqhN','_shopStatusWindow','maxSlipDamage','qoJUv','ActionEndUpdate','frameCount','note','forgetSkill','drawActorBuffRates','Scene_Skill_statusWindowRect','_statusWindow','MDF','hasStateCategory','onAddBuffGlobalJS','applyStateCategoryRemovalEffects','center','match','fontFace','currentDisplayedValue','ebzYT','YkuPj','vlQrz','changeOutlineColor','aliveMembers','IconStypeNorm','number','Game_BattlerBase_skillMpCost','Window_SkillList_updateHelp','buttonAssistText1','onEraseBuffGlobalJS','jHqKi','Buffs','clearStateRetainType','dOLpf','Game_BattlerBase_decreaseBuff','hUwEl','MAXMP','Parse_Notetags_State_ApplyRemoveLeaveJS','isGroupDefeatStateAffected','valueFontSize','ufcvI','replace','stateColor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','retrieveStateColor','usyxy','passiveStateObjects','Game_Variables_onChange','text','getStateDisplay','eraseState','21206867zVdvSr','YGotv','setup','MzELB','ValueOutlineSolid','IAwWv','getStateOrigin','MatchLabelColor','stateTpSlipDamageJS','CmdStyle','iconHeight','CalcJS','placeExactGauge','PBgen','rgba(0,\x200,\x200,\x200)','debuffColor','_cache','equips','qvhjO','KFzyl','StackDebuffMax','addDebuff','States','makeCommandName','Name','Game_BattlerBase_states','drawText','oKXKH','prototype','members','TpRwj','categories','onExpireBuffJS','setPassiveStateSlipDamageJS','meetsPassiveStateGlobalConditionJS','zLLli','setStatusWindow','usableSkills','setItem','createPassiveStatesCache','Enemy','ARRAYSTR','ATK','success','Game_Actor_skillTypes','Window_SkillStatus_refresh','indexOf','removeState','isStateRestrict','actorId','ParseClassIDs','gVqMd','SkillSceneAdjustSkillList','MAT','qriKB','allowCreateShopStatusWindow','statePassiveConditionJS','commandStyle','format','colSpacing','getClassIdWithName','nJtTA','onAddDebuffJS','onAddBuffJS','getCurrentStateOriginKey','applyStateTurnManipulationEffects','cptam','_checkingVisuMzPassiveStateObjects','drawActorIconsAllTurnCounters','MJnXW','Scene_Skill_helpWindowRect','length','active','ZJgqP','Sprite_Gauge_currentValue','asVUe','map','_stateOrigin','_stateDisplay','createShopStatusWindow','isBuffAffected','buttonAssistSwitch','drawItemStyleIcon','Costs','shift','ejeBq','Game_Actor_learnSkill','mainAreaHeight','getStateOriginByKey','commandNameWindowDrawText','stateMpSlipHealJS','iAxdV','Game_BattlerBase_meetsSkillConditions','NSmSL','rgba(0,\x200,\x200,\x201)','ColorPositive','stateExpireJS','onRegenerateCustomStateDamageOverTime','nicNd','stateEraseJS','skillTypeWindowRectSkillsStatesCore','BattleHiddenSkillTypes','width','AWodr','VybRq','ConvertParams','maxItems','wlpoA','heal','TurnEndOnMap','redrawSkillsStatesCore','#%1','qUnwX','skills','Scene_Skill_createItemWindow','DataOffsetX','applySkillsStatesCoreEffects','addWindow','anchor','MultiplierJS','canUse','CoreEngine','YPxXs','boxWidth','updateHelp','xIXGA','WakZW','action','checkCacheKey','CheckVisibleBattleNotetags','call','autoRemovalTiming','YyUcp','helpAreaTop','Game_Unit_deadMembers','onAddDebuffGlobalJS','nqgDM'];_0x5501=function(){return _0x2a0c80;};return _0x5501();}const _0x31613b=_0x2904;(function(_0x5866db,_0xbe8730){const _0x47025f=_0x2904,_0x3df12f=_0x5866db();while(!![]){try{const _0x16d455=parseInt(_0x47025f(0x36a))/0x1+-parseInt(_0x47025f(0x35a))/0x2+-parseInt(_0x47025f(0x420))/0x3*(parseInt(_0x47025f(0x487))/0x4)+-parseInt(_0x47025f(0x2ce))/0x5*(-parseInt(_0x47025f(0x3aa))/0x6)+parseInt(_0x47025f(0x172))/0x7*(-parseInt(_0x47025f(0x36c))/0x8)+-parseInt(_0x47025f(0x35f))/0x9*(-parseInt(_0x47025f(0x3f0))/0xa)+-parseInt(_0x47025f(0x231))/0xb;if(_0x16d455===_0xbe8730)break;else _0x3df12f['push'](_0x3df12f['shift']());}catch(_0x3366ee){_0x3df12f['push'](_0x3df12f['shift']());}}}(_0x5501,0xe2fa5));var label=_0x31613b(0x469),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x31613b(0x2ff)](function(_0x6e47a2){const _0x3ca974=_0x31613b;return _0x6e47a2[_0x3ca974(0x191)]&&_0x6e47a2['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x31613b(0x32d)]=VisuMZ[label][_0x31613b(0x32d)]||{},VisuMZ[_0x31613b(0x29a)]=function(_0x51a2c0,_0x3727ba){const _0x32c5bd=_0x31613b;for(const _0x3b5b3d in _0x3727ba){if(_0x32c5bd(0x31e)===_0x32c5bd(0x2e6)){const _0x40951f=this[_0x32c5bd(0x2e3)]();this[_0x32c5bd(0x1b0)](),this[_0x32c5bd(0x445)](_0x57148c,_0x436fd1,_0x48ee31,_0xd06394,!![]),this[_0x32c5bd(0x3ed)](),this[_0x32c5bd(0x176)][_0x32c5bd(0x386)]-=0x8;const _0x39bce0=this[_0x32c5bd(0x309)][_0x32c5bd(0x32e)](_0x347bd5,!![]);this['contents'][_0x32c5bd(0x24b)](_0x39bce0,_0x3cc7a3,_0x1302ab,_0x3dcbbd,_0x40951f,_0x32c5bd(0x3b4));}else{if(_0x3b5b3d[_0x32c5bd(0x20e)](/(.*):(.*)/i)){const _0x4b3102=String(RegExp['$1']),_0xac0b6b=String(RegExp['$2'])[_0x32c5bd(0x301)]()[_0x32c5bd(0x17c)]();let _0x505365,_0x1391f5,_0x17c8ae;switch(_0xac0b6b){case _0x32c5bd(0x34f):_0x505365=_0x3727ba[_0x3b5b3d]!==''?Number(_0x3727ba[_0x3b5b3d]):0x0;break;case _0x32c5bd(0x499):_0x1391f5=_0x3727ba[_0x3b5b3d]!==''?JSON[_0x32c5bd(0x3c8)](_0x3727ba[_0x3b5b3d]):[],_0x505365=_0x1391f5[_0x32c5bd(0x27d)](_0x68f664=>Number(_0x68f664));break;case _0x32c5bd(0x387):_0x505365=_0x3727ba[_0x3b5b3d]!==''?eval(_0x3727ba[_0x3b5b3d]):null;break;case'ARRAYEVAL':_0x1391f5=_0x3727ba[_0x3b5b3d]!==''?JSON[_0x32c5bd(0x3c8)](_0x3727ba[_0x3b5b3d]):[],_0x505365=_0x1391f5[_0x32c5bd(0x27d)](_0x64949=>eval(_0x64949));break;case _0x32c5bd(0x337):_0x505365=_0x3727ba[_0x3b5b3d]!==''?JSON[_0x32c5bd(0x3c8)](_0x3727ba[_0x3b5b3d]):'';break;case _0x32c5bd(0x39e):_0x1391f5=_0x3727ba[_0x3b5b3d]!==''?JSON[_0x32c5bd(0x3c8)](_0x3727ba[_0x3b5b3d]):[],_0x505365=_0x1391f5[_0x32c5bd(0x27d)](_0x26c46b=>JSON['parse'](_0x26c46b));break;case _0x32c5bd(0x3f2):_0x505365=_0x3727ba[_0x3b5b3d]!==''?new Function(JSON[_0x32c5bd(0x3c8)](_0x3727ba[_0x3b5b3d])):new Function(_0x32c5bd(0x1b1));break;case'ARRAYFUNC':_0x1391f5=_0x3727ba[_0x3b5b3d]!==''?JSON[_0x32c5bd(0x3c8)](_0x3727ba[_0x3b5b3d]):[],_0x505365=_0x1391f5['map'](_0x58ac95=>new Function(JSON[_0x32c5bd(0x3c8)](_0x58ac95)));break;case _0x32c5bd(0x173):_0x505365=_0x3727ba[_0x3b5b3d]!==''?String(_0x3727ba[_0x3b5b3d]):'';break;case _0x32c5bd(0x25a):_0x1391f5=_0x3727ba[_0x3b5b3d]!==''?JSON[_0x32c5bd(0x3c8)](_0x3727ba[_0x3b5b3d]):[],_0x505365=_0x1391f5[_0x32c5bd(0x27d)](_0x405b7c=>String(_0x405b7c));break;case _0x32c5bd(0x478):_0x17c8ae=_0x3727ba[_0x3b5b3d]!==''?JSON[_0x32c5bd(0x3c8)](_0x3727ba[_0x3b5b3d]):{},_0x51a2c0[_0x4b3102]={},VisuMZ[_0x32c5bd(0x29a)](_0x51a2c0[_0x4b3102],_0x17c8ae);continue;case'ARRAYSTRUCT':_0x1391f5=_0x3727ba[_0x3b5b3d]!==''?JSON['parse'](_0x3727ba[_0x3b5b3d]):[],_0x505365=_0x1391f5[_0x32c5bd(0x27d)](_0x8c4067=>VisuMZ[_0x32c5bd(0x29a)]({},JSON[_0x32c5bd(0x3c8)](_0x8c4067)));break;default:continue;}_0x51a2c0[_0x4b3102]=_0x505365;}}}return _0x51a2c0;},(_0x250907=>{const _0x4bf5c2=_0x31613b,_0x4c95ac=_0x250907[_0x4bf5c2(0x42f)];for(const _0x407479 of dependencies){if(!Imported[_0x407479]){if(_0x4bf5c2(0x403)!=='xuXbX'){alert(_0x4bf5c2(0x2e4)[_0x4bf5c2(0x26b)](_0x4c95ac,_0x407479)),SceneManager[_0x4bf5c2(0x44e)]();break;}else{if(typeof _0x38dcd3!==_0x4bf5c2(0x217))_0x22b63b=_0x448baf['id'];return this[_0x4bf5c2(0x393)]=this[_0x4bf5c2(0x393)]||{},this[_0x4bf5c2(0x393)][_0x34dfce]=this['_stateData'][_0x5238b9]||{},this[_0x4bf5c2(0x393)][_0x435608];}}}const _0x516dae=_0x250907[_0x4bf5c2(0x435)];if(_0x516dae['match'](/\[Version[ ](.*?)\]/i)){if(_0x4bf5c2(0x27a)!=='euJum'){const _0x38f956=Number(RegExp['$1']);_0x38f956!==VisuMZ[label]['version']&&(_0x4bf5c2(0x378)===_0x4bf5c2(0x498)?this[_0x4bf5c2(0x43d)](_0xf5e00a):(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4bf5c2(0x26b)](_0x4c95ac,_0x38f956)),SceneManager[_0x4bf5c2(0x44e)]()));}else this[_0x4bf5c2(0x399)](),_0x5633e5[_0x4bf5c2(0x469)][_0x4bf5c2(0x351)][_0x4bf5c2(0x2b3)](this);}if(_0x516dae[_0x4bf5c2(0x20e)](/\[Tier[ ](\d+)\]/i)){const _0x41ed1c=Number(RegExp['$1']);_0x41ed1c<tier?(alert(_0x4bf5c2(0x229)[_0x4bf5c2(0x26b)](_0x4c95ac,_0x41ed1c,tier)),SceneManager['exit']()):tier=Math[_0x4bf5c2(0x2ba)](_0x41ed1c,tier);}VisuMZ[_0x4bf5c2(0x29a)](VisuMZ[label][_0x4bf5c2(0x32d)],_0x250907[_0x4bf5c2(0x4ab)]);})(pluginData),VisuMZ['SkillsStatesCore']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x31613b(0x24d)][_0x31613b(0x323)],Scene_Boot[_0x31613b(0x24d)][_0x31613b(0x323)]=function(){const _0x3a6900=_0x31613b;VisuMZ[_0x3a6900(0x469)][_0x3a6900(0x433)]['call'](this),this['process_VisuMZ_SkillsStatesCore_Notetags'](),VisuMZ[_0x3a6900(0x469)][_0x3a6900(0x468)]();},Scene_Boot[_0x31613b(0x24d)]['process_VisuMZ_SkillsStatesCore_Notetags']=function(){const _0x35e122=_0x31613b;if(VisuMZ[_0x35e122(0x181)])return;this[_0x35e122(0x2c8)](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot[_0x31613b(0x24d)][_0x31613b(0x2c8)]=function(){const _0x29a446=_0x31613b;for(const _0x162157 of $dataSkills){if('nJtTA'===_0x29a446(0x26e)){if(!_0x162157)continue;VisuMZ['SkillsStatesCore'][_0x29a446(0x3ba)](_0x162157),VisuMZ[_0x29a446(0x469)][_0x29a446(0x413)](_0x162157);}else{const _0x55cf7b=_0x274048[_0x1e4901];if(_0x55cf7b&&_0x55cf7b[_0x29a446(0x250)]['length']>0x0)for(const _0x2d323d of _0x55cf7b['categories']){if(this['isStateCategoryResisted'](_0x2d323d))return!![];}return _0x50c730['SkillsStatesCore'][_0x29a446(0x451)][_0x29a446(0x2b3)](this,_0xe602d0);}}},Scene_Boot[_0x31613b(0x24d)]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){const _0x5b2931=_0x31613b;for(const _0xa30ff8 of $dataStates){if(_0x5b2931(0x47b)===_0x5b2931(0x2c9))return _0x1d9e1b['mainFontFace']();else{if(!_0xa30ff8)continue;VisuMZ['SkillsStatesCore'][_0x5b2931(0x304)](_0xa30ff8),VisuMZ[_0x5b2931(0x469)][_0x5b2931(0x494)](_0xa30ff8),VisuMZ['SkillsStatesCore'][_0x5b2931(0x338)](_0xa30ff8),VisuMZ[_0x5b2931(0x469)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0xa30ff8);}}},VisuMZ[_0x31613b(0x469)]['ParseSkillNotetags']=VisuMZ['ParseSkillNotetags'],VisuMZ[_0x31613b(0x15a)]=function(_0x3a81bb){const _0x3c5c22=_0x31613b;VisuMZ[_0x3c5c22(0x469)]['ParseSkillNotetags']['call'](this,_0x3a81bb),VisuMZ[_0x3c5c22(0x469)][_0x3c5c22(0x3ba)](_0x3a81bb),VisuMZ[_0x3c5c22(0x469)]['Parse_Notetags_Skill_JS'](_0x3a81bb);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x3ac)]=VisuMZ['ParseStateNotetags'],VisuMZ[_0x31613b(0x3ac)]=function(_0x199ccd){const _0x259b0c=_0x31613b;VisuMZ[_0x259b0c(0x469)]['ParseStateNotetags'][_0x259b0c(0x2b3)](this,_0x199ccd),VisuMZ[_0x259b0c(0x469)]['Parse_Notetags_State_Category'](_0x199ccd),VisuMZ[_0x259b0c(0x469)]['Parse_Notetags_State_PassiveJS'](_0x199ccd),VisuMZ[_0x259b0c(0x469)]['Parse_Notetags_State_SlipEffectJS'](_0x199ccd),VisuMZ[_0x259b0c(0x469)]['Parse_Notetags_State_ApplyRemoveLeaveJS'](_0x199ccd);},VisuMZ[_0x31613b(0x469)]['Parse_Notetags_Skill_Cost']=function(_0x5caf68){const _0x80b35d=_0x31613b,_0x17417f=_0x5caf68[_0x80b35d(0x204)];if(_0x17417f[_0x80b35d(0x20e)](/<MP COST:[ ](\d+)>/i)){if(_0x80b35d(0x30e)!==_0x80b35d(0x48b))_0x5caf68[_0x80b35d(0x1d3)]=Number(RegExp['$1']);else{_0x44ef6e[_0x80b35d(0x20e)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x591063=_0x5c4516(_0x4bd098['$1'])['toUpperCase']()[_0x80b35d(0x17c)]()[_0x80b35d(0x417)](',');for(const _0x3e253c of _0x591063){_0x45f741['categories'][_0x80b35d(0x49d)](_0x3e253c[_0x80b35d(0x17c)]());}}}_0x17417f[_0x80b35d(0x20e)](/<TP COST:[ ](\d+)>/i)&&(_0x5caf68[_0x80b35d(0x1a1)]=Number(RegExp['$1']));},VisuMZ[_0x31613b(0x469)]['skillEnableJS']={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x458)]={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x413)]=function(_0x2af597){const _0x10123e=_0x31613b,_0x1ead28=_0x2af597[_0x10123e(0x204)];if(_0x1ead28[_0x10123e(0x20e)](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x26ebb7=String(RegExp['$1']),_0x40970f=_0x10123e(0x19a)[_0x10123e(0x26b)](_0x26ebb7);VisuMZ[_0x10123e(0x469)]['skillEnableJS'][_0x2af597['id']]=new Function(_0x10123e(0x39c),_0x40970f);}if(_0x1ead28['match'](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){const _0x5081db=String(RegExp['$1']),_0x2fbce9='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x5081db);VisuMZ[_0x10123e(0x469)][_0x10123e(0x458)][_0x2af597['id']]=new Function(_0x10123e(0x39c),_0x2fbce9);}},VisuMZ[_0x31613b(0x469)][_0x31613b(0x304)]=function(_0x4fa43a){const _0x26c804=_0x31613b;_0x4fa43a[_0x26c804(0x250)]=[_0x26c804(0x475),_0x26c804(0x382)];const _0x442935=_0x4fa43a[_0x26c804(0x204)],_0x3f947f=_0x442935[_0x26c804(0x20e)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x3f947f)for(const _0x1c1b2e of _0x3f947f){_0x1c1b2e[_0x26c804(0x20e)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x3e189e=String(RegExp['$1'])[_0x26c804(0x301)]()['trim']()[_0x26c804(0x417)](',');for(const _0x44a8de of _0x3e189e){_0x4fa43a[_0x26c804(0x250)]['push'](_0x44a8de['trim']());}}if(_0x442935[_0x26c804(0x20e)](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x441615=RegExp['$1']['split'](/[\r\n]+/);for(const _0x75b299 of _0x441615){if('CXNXx'===_0x26c804(0x226)){let _0xb4537=0x0,_0x5d9d26=0x0;if(_0x2696a4[_0x26c804(0x20e)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0xb4537=_0x536e00(_0x29370b['$1']),_0x5d9d26=_0x45b5e9(_0x5c1830['$2']);else _0x3acffa[_0x26c804(0x20e)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0xb4537=_0x4315f0[_0x26c804(0x2bc)](_0x1d47d5['$1']),_0x5d9d26=_0x13cd99(_0x330968['$2']));_0x46a9b7['addStateTurns'](_0xb4537,_0x5d9d26),this['makeSuccess'](_0x5db858);}else _0x4fa43a[_0x26c804(0x250)][_0x26c804(0x49d)](_0x75b299[_0x26c804(0x301)]()[_0x26c804(0x17c)]());}}if(_0x442935[_0x26c804(0x20e)](/<POSITIVE STATE>/i)){if(_0x26c804(0x1f9)!=='Zlvrl')return this[_0x26c804(0x2d1)](_0x45569d(_0x4e7e2c));else _0x4fa43a[_0x26c804(0x250)][_0x26c804(0x49d)](_0x26c804(0x34b));}_0x442935[_0x26c804(0x20e)](/<NEGATIVE STATE>/i)&&_0x4fa43a[_0x26c804(0x250)][_0x26c804(0x49d)](_0x26c804(0x317));},VisuMZ[_0x31613b(0x469)]['statePassiveConditionJS']={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x494)]=function(_0x3e1adb){const _0xf226f7=_0x31613b,_0x398e2f=_0x3e1adb[_0xf226f7(0x204)];if(_0x398e2f[_0xf226f7(0x20e)](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x23bd79=String(RegExp['$1']),_0x5431ec=_0xf226f7(0x3a8)[_0xf226f7(0x26b)](_0x23bd79);VisuMZ[_0xf226f7(0x469)][_0xf226f7(0x269)][_0x3e1adb['id']]=new Function('state',_0x5431ec);}},VisuMZ[_0x31613b(0x469)]['stateHpSlipDamageJS']={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x38c)]={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x1a4)]={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x28b)]={},VisuMZ['SkillsStatesCore'][_0x31613b(0x239)]={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x1f2)]={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x338)]=function(_0xef91b8){const _0x2d9bf0=_0x31613b,_0x4bc10b=_0xef91b8['note'],_0x886f79=_0x2d9bf0(0x17e);if(_0x4bc10b[_0x2d9bf0(0x20e)](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){const _0x36d5ab=String(RegExp['$1']),_0x1b9687=_0x886f79[_0x2d9bf0(0x26b)](_0x36d5ab,'damage',-0x1,_0x2d9bf0(0x2f1));VisuMZ[_0x2d9bf0(0x469)][_0x2d9bf0(0x30a)][_0xef91b8['id']]=new Function(_0x2d9bf0(0x3dd),_0x1b9687);}else{if(_0x4bc10b[_0x2d9bf0(0x20e)](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0x2ec94c=String(RegExp['$1']),_0xf7f68f=_0x886f79[_0x2d9bf0(0x26b)](_0x2ec94c,_0x2d9bf0(0x29d),0x1,'slipHp');VisuMZ[_0x2d9bf0(0x469)][_0x2d9bf0(0x38c)][_0xef91b8['id']]=new Function('stateId',_0xf7f68f);}}if(_0x4bc10b[_0x2d9bf0(0x20e)](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if('atlWA'===_0x2d9bf0(0x1bc))return this[_0x2d9bf0(0x368)]();else{const _0x6ad040=String(RegExp['$1']),_0x17cf12=_0x886f79[_0x2d9bf0(0x26b)](_0x6ad040,'damage',-0x1,_0x2d9bf0(0x336));VisuMZ[_0x2d9bf0(0x469)][_0x2d9bf0(0x1a4)][_0xef91b8['id']]=new Function(_0x2d9bf0(0x3dd),_0x17cf12);}}else{if(_0x4bc10b[_0x2d9bf0(0x20e)](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){const _0x45b2da=String(RegExp['$1']),_0x31ae07=_0x886f79['format'](_0x45b2da,_0x2d9bf0(0x29d),0x1,_0x2d9bf0(0x336));VisuMZ[_0x2d9bf0(0x469)][_0x2d9bf0(0x28b)][_0xef91b8['id']]=new Function('stateId',_0x31ae07);}}if(_0x4bc10b['match'](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){const _0x475ab4=String(RegExp['$1']),_0x3cec1f=_0x886f79[_0x2d9bf0(0x26b)](_0x475ab4,_0x2d9bf0(0x310),-0x1,_0x2d9bf0(0x2dd));VisuMZ[_0x2d9bf0(0x469)][_0x2d9bf0(0x239)][_0xef91b8['id']]=new Function(_0x2d9bf0(0x3dd),_0x3cec1f);}else{if(_0x4bc10b[_0x2d9bf0(0x20e)](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){if('EUqqd'!=='NKgEi'){const _0x4c7b49=String(RegExp['$1']),_0xe49743=_0x886f79[_0x2d9bf0(0x26b)](_0x4c7b49,_0x2d9bf0(0x29d),0x1,_0x2d9bf0(0x2dd));VisuMZ[_0x2d9bf0(0x469)][_0x2d9bf0(0x1f2)][_0xef91b8['id']]=new Function(_0x2d9bf0(0x3dd),_0xe49743);}else{const _0x5208d5=_0x27fd6a[_0x2d9bf0(0x495)](_0x41d5ca);this[_0x2d9bf0(0x3fe)][_0x23bc29]=this[_0x2d9bf0(0x3fe)][_0x59843a]['clamp'](0x0,_0x5208d5);}}}},VisuMZ[_0x31613b(0x469)]['stateAddJS']={},VisuMZ[_0x31613b(0x469)][_0x31613b(0x294)]={},VisuMZ[_0x31613b(0x469)]['stateExpireJS']={},VisuMZ['SkillsStatesCore'][_0x31613b(0x223)]=function(_0x299f1a){const _0x551cbd=_0x31613b,_0x43f558=_0x299f1a[_0x551cbd(0x204)],_0x411aaf=_0x551cbd(0x16c);if(_0x43f558[_0x551cbd(0x20e)](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if(_0x551cbd(0x212)===_0x551cbd(0x2e5)){const _0xfb45b8=_0x551cbd(0x344);this[_0x551cbd(0x374)]=this[_0x551cbd(0x374)]||{};if(this[_0x551cbd(0x374)][_0xfb45b8])return this[_0x551cbd(0x374)][_0xfb45b8];const _0x51ae80=_0x5eb4c8[_0x551cbd(0x469)][_0x551cbd(0x32d)][_0x551cbd(0x21d)][_0x551cbd(0x1c3)];return this[_0x551cbd(0x32f)](_0xfb45b8,_0x51ae80);}else{const _0x2d3d3b=String(RegExp['$1']),_0x4d2fc1=_0x411aaf[_0x551cbd(0x26b)](_0x2d3d3b);VisuMZ[_0x551cbd(0x469)]['stateAddJS'][_0x299f1a['id']]=new Function(_0x551cbd(0x3dd),_0x4d2fc1);}}if(_0x43f558['match'](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x3c00b6=String(RegExp['$1']),_0x4f5157=_0x411aaf[_0x551cbd(0x26b)](_0x3c00b6);VisuMZ['SkillsStatesCore']['stateEraseJS'][_0x299f1a['id']]=new Function('stateId',_0x4f5157);}if(_0x43f558['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x48bc20=String(RegExp['$1']),_0x39bddc=_0x411aaf[_0x551cbd(0x26b)](_0x48bc20);VisuMZ[_0x551cbd(0x469)][_0x551cbd(0x291)][_0x299f1a['id']]=new Function(_0x551cbd(0x3dd),_0x39bddc);}},VisuMZ[_0x31613b(0x469)]['CheckIncompatibleStates']=function(){const _0x4a7144=_0x31613b;if(!VisuMZ[_0x4a7144(0x469)][_0x4a7144(0x32d)][_0x4a7144(0x247)][_0x4a7144(0x202)])return;for(const _0x4795c2 of $dataStates){if('mYhjg'===_0x4a7144(0x40e))return _0x4753af['SkillsStatesCore'][_0x4a7144(0x32d)]['Skills'][_0x4a7144(0x1af)];else{if(!_0x4795c2)continue;if(_0x4795c2['restriction']===0x4&&_0x4795c2[_0x4a7144(0x2b4)]===0x1){if(_0x4a7144(0x22b)!==_0x4a7144(0x22b)){const _0x53ca07=_0x30181e(_0x1037d1['$1']),_0x358c23=_0x4a91a3[_0x4a7144(0x26b)](_0x53ca07,'damage',-0x1,_0x4a7144(0x2dd));_0x10690b[_0x4a7144(0x469)][_0x4a7144(0x239)][_0x4778c6['id']]=new _0x140f3b('stateId',_0x358c23);}else _0x4795c2['autoRemovalTiming']=0x2;}}}},DataManager[_0x31613b(0x26d)]=function(_0x2a6a7e){const _0x41e085=_0x31613b;_0x2a6a7e=_0x2a6a7e['toUpperCase']()[_0x41e085(0x17c)](),this[_0x41e085(0x18f)]=this[_0x41e085(0x18f)]||{};if(this['_classIDs'][_0x2a6a7e])return this[_0x41e085(0x18f)][_0x2a6a7e];for(const _0x51ce2d of $dataClasses){if(!_0x51ce2d)continue;let _0x540acd=_0x51ce2d[_0x41e085(0x42f)];_0x540acd=_0x540acd[_0x41e085(0x227)](/\x1I\[(\d+)\]/gi,''),_0x540acd=_0x540acd[_0x41e085(0x227)](/\\I\[(\d+)\]/gi,''),this[_0x41e085(0x18f)][_0x540acd[_0x41e085(0x301)]()[_0x41e085(0x17c)]()]=_0x51ce2d['id'];}return this[_0x41e085(0x18f)][_0x2a6a7e]||0x0;},DataManager['getSkillTypes']=function(_0x25c952){const _0x24219f=_0x31613b;this[_0x24219f(0x46b)]=this[_0x24219f(0x46b)]||{};if(this[_0x24219f(0x46b)][_0x25c952['id']])return this[_0x24219f(0x46b)][_0x25c952['id']];this[_0x24219f(0x46b)][_0x25c952['id']]=[_0x25c952['stypeId']];if(_0x25c952[_0x24219f(0x204)][_0x24219f(0x20e)](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x24219f(0x45a)===_0x24219f(0x1a8))this[_0x24219f(0x176)][_0x24219f(0x2d1)]=_0x3a628e;else{const _0x14c33e=JSON[_0x24219f(0x3c8)]('['+RegExp['$1'][_0x24219f(0x20e)](/\d+/g)+']');this[_0x24219f(0x46b)][_0x25c952['id']]=this[_0x24219f(0x46b)][_0x25c952['id']]['concat'](_0x14c33e);}}else{if(_0x25c952[_0x24219f(0x204)][_0x24219f(0x20e)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x2abf62=RegExp['$1'][_0x24219f(0x417)](',');for(const _0x236fd8 of _0x2abf62){if(_0x24219f(0x481)===_0x24219f(0x1b9))return _0x24219f(0x28f);else{const _0x24d465=DataManager[_0x24219f(0x3b1)](_0x236fd8);if(_0x24d465)this[_0x24219f(0x46b)][_0x25c952['id']][_0x24219f(0x49d)](_0x24d465);}}}}return this[_0x24219f(0x46b)][_0x25c952['id']];},DataManager['getStypeIdWithName']=function(_0x2c30cd){const _0xaa95dc=_0x31613b;_0x2c30cd=_0x2c30cd[_0xaa95dc(0x301)]()[_0xaa95dc(0x17c)](),this['_stypeIDs']=this[_0xaa95dc(0x46b)]||{};if(this[_0xaa95dc(0x46b)][_0x2c30cd])return this[_0xaa95dc(0x46b)][_0x2c30cd];for(let _0x5c23c9=0x1;_0x5c23c9<0x64;_0x5c23c9++){if(_0xaa95dc(0x1ab)!=='duObC')this[_0xaa95dc(0x196)][_0xaa95dc(0x419)](),this['_costSettings'][_0xaa95dc(0x187)][_0xaa95dc(0x2b3)](this);else{if(!$dataSystem[_0xaa95dc(0x397)][_0x5c23c9])continue;let _0x1cfbbc=$dataSystem['skillTypes'][_0x5c23c9][_0xaa95dc(0x301)]()['trim']();_0x1cfbbc=_0x1cfbbc[_0xaa95dc(0x227)](/\x1I\[(\d+)\]/gi,''),_0x1cfbbc=_0x1cfbbc['replace'](/\\I\[(\d+)\]/gi,''),this[_0xaa95dc(0x46b)][_0x1cfbbc]=_0x5c23c9;}}return this['_stypeIDs'][_0x2c30cd]||0x0;},DataManager['getSkillIdWithName']=function(_0x46085e){const _0x9a94e0=_0x31613b;_0x46085e=_0x46085e['toUpperCase']()['trim'](),this[_0x9a94e0(0x1b4)]=this[_0x9a94e0(0x1b4)]||{};if(this[_0x9a94e0(0x1b4)][_0x46085e])return this[_0x9a94e0(0x1b4)][_0x46085e];for(const _0x58a1e2 of $dataSkills){if('hUVkD'!==_0x9a94e0(0x2c6)){const _0x183af4=this[_0x9a94e0(0x3e3)](_0x5d3e9d),_0x423201=this[_0x9a94e0(0x465)](_0x5d59fb)[_0x9a94e0(0x297)];return _0x423201<=_0x183af4[_0x9a94e0(0x297)]?_0x9a94e0(0x342):_0x9a94e0(0x1c2);}else{if(!_0x58a1e2)continue;this[_0x9a94e0(0x1b4)][_0x58a1e2[_0x9a94e0(0x42f)][_0x9a94e0(0x301)]()[_0x9a94e0(0x17c)]()]=_0x58a1e2['id'];}}return this[_0x9a94e0(0x1b4)][_0x46085e]||0x0;},DataManager[_0x31613b(0x2bc)]=function(_0x18eae9){const _0x113c64=_0x31613b;_0x18eae9=_0x18eae9[_0x113c64(0x301)]()[_0x113c64(0x17c)](),this[_0x113c64(0x2ec)]=this['_stateIDs']||{};if(this['_stateIDs'][_0x18eae9])return this[_0x113c64(0x2ec)][_0x18eae9];for(const _0x37c255 of $dataStates){if(!_0x37c255)continue;this[_0x113c64(0x2ec)][_0x37c255['name'][_0x113c64(0x301)]()['trim']()]=_0x37c255['id'];}return this[_0x113c64(0x2ec)][_0x18eae9]||0x0;},DataManager[_0x31613b(0x495)]=function(_0x21fcb3){const _0x1faae7=_0x31613b;this[_0x1faae7(0x364)]=this[_0x1faae7(0x364)]||{};if(this[_0x1faae7(0x364)][_0x21fcb3])return this[_0x1faae7(0x364)][_0x21fcb3];if($dataStates[_0x21fcb3][_0x1faae7(0x204)]['match'](/<MAX TURNS:[ ](\d+)>/i)){if(_0x1faae7(0x18d)===_0x1faae7(0x1df)){_0x1453c4[_0x1faae7(0x20e)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x1ae668=_0x1ce0c1(_0x675b1e['$1']),_0x638e14=_0x382286(_0x5ce6ec['$2']);_0x528357[_0x1faae7(0x16b)](_0x1ae668,_0x638e14);}else this[_0x1faae7(0x364)][_0x21fcb3]=Number(RegExp['$1']);}else{if(_0x1faae7(0x35c)!=='SLuMi')return _0x896f39;else this[_0x1faae7(0x364)][_0x21fcb3]=VisuMZ[_0x1faae7(0x469)][_0x1faae7(0x32d)][_0x1faae7(0x247)][_0x1faae7(0x42d)];}return this[_0x1faae7(0x364)][_0x21fcb3];},ColorManager[_0x31613b(0x32f)]=function(_0x3349bf,_0x318679){const _0x472cab=_0x31613b;_0x318679=String(_0x318679),this[_0x472cab(0x374)]=this[_0x472cab(0x374)]||{};if(_0x318679[_0x472cab(0x20e)](/#(.*)/i))this[_0x472cab(0x374)][_0x3349bf]=_0x472cab(0x2a0)[_0x472cab(0x26b)](String(RegExp['$1']));else{if(_0x472cab(0x2b5)===_0x472cab(0x2cb)){if(!_0x3b7834[_0x472cab(0x3d7)](_0x42ecec))return![];}else this[_0x472cab(0x374)][_0x3349bf]=this[_0x472cab(0x2d1)](Number(_0x318679));}return this[_0x472cab(0x374)][_0x3349bf];},ColorManager[_0x31613b(0x40a)]=function(_0x38fb28){const _0x3e4208=_0x31613b;_0x38fb28=String(_0x38fb28);if(_0x38fb28[_0x3e4208(0x20e)](/#(.*)/i))return _0x3e4208(0x2a0)[_0x3e4208(0x26b)](String(RegExp['$1']));else{if(_0x3e4208(0x3b0)===_0x3e4208(0x3c9)){const _0x4ec900=_0x119c31['parse']('['+_0x4aba35['$1'][_0x3e4208(0x20e)](/\d+/g)+']');for(const _0x3e9682 of _0x4ec900){if(!_0x3ca759[_0x3e4208(0x2cc)](_0x3e9682))return!![];}return![];}else return this['textColor'](Number(_0x38fb28));}},ColorManager[_0x31613b(0x228)]=function(_0x49ee23){const _0x447d4a=_0x31613b;if(typeof _0x49ee23===_0x447d4a(0x217))_0x49ee23=$dataStates[_0x49ee23];const _0xb4fb9a=_0x447d4a(0x423)[_0x447d4a(0x26b)](_0x49ee23['id']);this['_colorCache']=this[_0x447d4a(0x374)]||{};if(this['_colorCache'][_0xb4fb9a])return this[_0x447d4a(0x374)][_0xb4fb9a];const _0x53218d=this[_0x447d4a(0x22a)](_0x49ee23);return this[_0x447d4a(0x32f)](_0xb4fb9a,_0x53218d);},ColorManager[_0x31613b(0x22a)]=function(_0x41e27e){const _0x3e4350=_0x31613b,_0x168f0c=_0x41e27e[_0x3e4350(0x204)];if(_0x168f0c['match'](/<TURN COLOR:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x168f0c[_0x3e4350(0x20e)](/<POSITIVE STATE>/i))return VisuMZ[_0x3e4350(0x469)][_0x3e4350(0x32d)][_0x3e4350(0x247)][_0x3e4350(0x290)];else return _0x168f0c[_0x3e4350(0x20e)](/<NEGATIVE STATE>/i)?VisuMZ[_0x3e4350(0x469)][_0x3e4350(0x32d)][_0x3e4350(0x247)][_0x3e4350(0x1c6)]:VisuMZ['SkillsStatesCore']['Settings'][_0x3e4350(0x247)]['ColorNeutral'];}},ColorManager[_0x31613b(0x2f9)]=function(){const _0x474532=_0x31613b,_0x263200=_0x474532(0x344);this[_0x474532(0x374)]=this[_0x474532(0x374)]||{};if(this[_0x474532(0x374)][_0x263200])return this[_0x474532(0x374)][_0x263200];const _0x25d2f4=VisuMZ['SkillsStatesCore'][_0x474532(0x32d)][_0x474532(0x21d)][_0x474532(0x1c3)];return this[_0x474532(0x32f)](_0x263200,_0x25d2f4);},ColorManager[_0x31613b(0x240)]=function(){const _0xc3e89c=_0x31613b,_0x3e0b29=_0xc3e89c(0x308);this[_0xc3e89c(0x374)]=this[_0xc3e89c(0x374)]||{};if(this[_0xc3e89c(0x374)][_0x3e0b29])return this[_0xc3e89c(0x374)][_0x3e0b29];const _0x453ead=VisuMZ[_0xc3e89c(0x469)][_0xc3e89c(0x32d)][_0xc3e89c(0x21d)][_0xc3e89c(0x3ce)];return this['getColorDataFromPluginParameters'](_0x3e0b29,_0x453ead);},SceneManager['isSceneBattle']=function(){const _0x200d69=_0x31613b;return this[_0x200d69(0x300)]&&this['_scene']['constructor']===Scene_Battle;},VisuMZ['SkillsStatesCore']['BattleManager_endAction']=BattleManager[_0x31613b(0x1a5)],BattleManager[_0x31613b(0x1a5)]=function(){const _0x495c1e=_0x31613b;this[_0x495c1e(0x399)](),VisuMZ[_0x495c1e(0x469)]['BattleManager_endAction']['call'](this);},BattleManager[_0x31613b(0x399)]=function(){const _0x2c2e4e=_0x31613b,_0x4308c3=VisuMZ[_0x2c2e4e(0x469)][_0x2c2e4e(0x32d)]['States'];if(!_0x4308c3)return;if(_0x4308c3[_0x2c2e4e(0x202)]===![])return;if(!this[_0x2c2e4e(0x3f4)])return;this[_0x2c2e4e(0x3f4)][_0x2c2e4e(0x399)]();},Game_Battler[_0x31613b(0x24d)]['updateStatesActionEnd']=function(){const _0x241aab=_0x31613b;if(BattleManager['_phase']!==_0x241aab(0x2b0))return;if(this['_lastStatesActionEndFrameCount']===Graphics['frameCount'])return;this['_lastStatesActionEndFrameCount']=Graphics[_0x241aab(0x203)];for(const _0x361eb5 of this['_states']){if('OBsuw'==='OBsuw'){const _0x163f5a=$dataStates[_0x361eb5];if(!_0x163f5a)continue;if(_0x163f5a[_0x241aab(0x2b4)]!==0x1)continue;this[_0x241aab(0x3fe)][_0x361eb5]>0x0&&this['_stateTurns'][_0x361eb5]--;}else return _0x158651[_0x241aab(0x24e)]()[_0x35a339(_0x238274['$1'])];}this[_0x241aab(0x1c9)](0x1);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x16e)]=function(){const _0x4ce749=_0x31613b,_0xdce69c=VisuMZ[_0x4ce749(0x469)][_0x4ce749(0x32d)][_0x4ce749(0x247)];for(const _0x51610c of this['_states']){if('kYcPh'===_0x4ce749(0x2ab)){_0x34c91e['prototype']['addPassiveStatesByPluginParameters'][_0x4ce749(0x2b3)](this);const _0x4fc21f=_0x2b9887['SkillsStatesCore'][_0x4ce749(0x32d)][_0x4ce749(0x438)][_0x4ce749(0x259)];this[_0x4ce749(0x241)][_0x4ce749(0x477)]=this[_0x4ce749(0x241)]['passiveStates'][_0x4ce749(0x479)](_0x4fc21f);}else{const _0x4f2d62=$dataStates[_0x51610c];if(_0xdce69c&&_0xdce69c[_0x4ce749(0x202)]!==![]){if('STcUS'!=='STcUS')return![];else{if(_0x4f2d62&&_0x4f2d62[_0x4ce749(0x2b4)]===0x1)continue;}}this[_0x4ce749(0x3fe)][_0x51610c]>0x0&&this['_stateTurns'][_0x51610c]--;}}},VisuMZ[_0x31613b(0x469)]['Game_Switches_onChange']=Game_Switches[_0x31613b(0x24d)][_0x31613b(0x1b2)],Game_Switches[_0x31613b(0x24d)][_0x31613b(0x1b2)]=function(){const _0x277fa8=_0x31613b;VisuMZ[_0x277fa8(0x469)]['Game_Switches_onChange']['call'](this);const _0x517303=VisuMZ[_0x277fa8(0x469)]['Settings']['PassiveStates'][_0x277fa8(0x2c2)]??!![];if(!_0x517303)return;if(SceneManager['isSceneBattle']()){if(_0x277fa8(0x19e)===_0x277fa8(0x19e))for(const _0x476267 of BattleManager['allBattleMembers']()){if(_0x476267)_0x476267[_0x277fa8(0x190)]();}else return _0x97c01b[_0x277fa8(0x42c)]();}},VisuMZ['SkillsStatesCore'][_0x31613b(0x22d)]=Game_Variables['prototype'][_0x31613b(0x1b2)],Game_Variables[_0x31613b(0x24d)][_0x31613b(0x1b2)]=function(){const _0x38baf2=_0x31613b;VisuMZ[_0x38baf2(0x469)]['Game_Variables_onChange'][_0x38baf2(0x2b3)](this);const _0x240237=VisuMZ[_0x38baf2(0x469)][_0x38baf2(0x32d)]['PassiveStates'][_0x38baf2(0x307)]??!![];if(!_0x240237)return;if(SceneManager['isSceneBattle']())for(const _0x2f1cad of BattleManager['allBattleMembers']()){if('qvhjO'===_0x38baf2(0x243)){if(_0x2f1cad)_0x2f1cad[_0x38baf2(0x190)]();}else this['drawTextEx'](_0x322a6d,_0x5962d1['x'],_0x5ec1dc['y'],_0x52310a);}},VisuMZ[_0x31613b(0x469)]['Game_Action_applyItemUserEffect']=Game_Action[_0x31613b(0x24d)][_0x31613b(0x315)],Game_Action[_0x31613b(0x24d)][_0x31613b(0x315)]=function(_0x50c65d){const _0x1e411d=_0x31613b;VisuMZ[_0x1e411d(0x469)][_0x1e411d(0x1ed)]['call'](this,_0x50c65d),this['applySkillsStatesCoreEffects'](_0x50c65d);},Game_Action[_0x31613b(0x24d)][_0x31613b(0x2a5)]=function(_0x463d25){const _0x246f3e=_0x31613b;this[_0x246f3e(0x20c)](_0x463d25),this[_0x246f3e(0x272)](_0x463d25),this['applyBuffTurnManipulationEffects'](_0x463d25),this[_0x246f3e(0x2df)](_0x463d25);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x2c5)]=Game_Action[_0x31613b(0x24d)][_0x31613b(0x2f3)],Game_Action[_0x31613b(0x24d)][_0x31613b(0x2f3)]=function(_0x4d0604){const _0x492541=_0x31613b;if(this['testSkillStatesCoreNotetags'](_0x4d0604))return!![];return VisuMZ[_0x492541(0x469)][_0x492541(0x2c5)][_0x492541(0x2b3)](this,_0x4d0604);},Game_Action[_0x31613b(0x24d)]['testSkillStatesCoreNotetags']=function(_0x228583){const _0x208c05=_0x31613b;if(!this[_0x208c05(0x3b6)]())return;const _0x543a3a=this[_0x208c05(0x3b6)]()[_0x208c05(0x204)];if(_0x543a3a[_0x208c05(0x20e)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](.*)>/i)){if(_0x208c05(0x2a1)===_0x208c05(0x2a1)){const _0x32c2d6=String(RegExp['$1']);if(_0x228583[_0x208c05(0x36f)](_0x32c2d6))return!![];}else _0x46778d[_0x208c05(0x17b)](_0x311cb0,_0x6dd039),this[_0x208c05(0x3d1)](_0x31fbd3);}if(_0x543a3a['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](.*)>/i)){if(_0x208c05(0x3be)!==_0x208c05(0x3be))return _0x36a6d6[_0x208c05(0x469)][_0x208c05(0x27b)][_0x208c05(0x2b3)](this);else{const _0xd50563=Number(RegExp['$1']);if(_0x228583['isStateAffected'](_0xd50563))return!![];}}else{if(_0x543a3a['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](.*)>/i)){const _0x24fca8=DataManager[_0x208c05(0x2bc)](RegExp['$1']);if(_0x228583[_0x208c05(0x1fc)](_0x24fca8))return!![];}}return![];},Game_Action[_0x31613b(0x24d)]['applyStateCategoryRemovalEffects']=function(_0x13ac73){const _0x565886=_0x31613b;if(_0x13ac73[_0x565886(0x3a9)]()['length']<=0x0)return;const _0x30bcb4=this[_0x565886(0x3b6)]()[_0x565886(0x204)];{if(_0x565886(0x1f3)===_0x565886(0x371))this['getStateRetainType']()!==''?this[_0x565886(0x3f8)]():(_0x2a59b4[_0x565886(0x469)]['Game_BattlerBase_clearStates'][_0x565886(0x2b3)](this),this[_0x565886(0x3e5)]());else{const _0x2e8f85=_0x30bcb4['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/gi);if(_0x2e8f85){if(_0x565886(0x3cd)==='cWXsp')for(const _0x3a1ad8 of _0x2e8f85){_0x3a1ad8[_0x565886(0x20e)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ]ALL>/i);const _0x4bdc93=String(RegExp['$1']);_0x13ac73['removeStatesByCategoryAll'](_0x4bdc93);}else{let _0x45a00e=this[_0x565886(0x362)]();return _0x1de01d['VisuMZ_0_CoreEngine']&&this['useDigitGrouping']()&&(_0x45a00e=_0x1cf38e[_0x565886(0x319)](_0x45a00e)),_0x45a00e;}}}}{if(_0x565886(0x3a0)!==_0x565886(0x3a0))_0x59c562[_0x565886(0x469)]['Window_SkillList_updateHelp'][_0x565886(0x2b3)](this),this[_0x565886(0x208)]&&this[_0x565886(0x208)]['constructor']===_0x26a642&&this[_0x565886(0x208)][_0x565886(0x257)](this[_0x565886(0x3b6)]());else{const _0x346b8c=_0x30bcb4[_0x565886(0x20e)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x346b8c)for(const _0x429d58 of _0x346b8c){_0x429d58[_0x565886(0x20e)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x329eea=String(RegExp['$1']),_0x3a2096=Number(RegExp['$2']);_0x13ac73[_0x565886(0x16b)](_0x329eea,_0x3a2096);}}}},Game_Action[_0x31613b(0x24d)][_0x31613b(0x272)]=function(_0x4fd5b8){const _0x18e64c=_0x31613b,_0x3c0c9=this[_0x18e64c(0x3b6)]()[_0x18e64c(0x204)],_0x4fa336=_0x3c0c9[_0x18e64c(0x20e)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x4fa336){if(_0x18e64c(0x27c)===_0x18e64c(0x33c)){const _0x8d7131=this[_0x18e64c(0x359)](_0xb030cf),_0x5aef9d=_0x8d7131?_0x8d7131[_0x18e64c(0x42f)]:'';if(_0x8d7131)this[_0x18e64c(0x358)](_0x8d7131);_0x39197c['SkillsStatesCore'][_0x18e64c(0x4ac)][_0x18e64c(0x2b3)](this,_0xe2e14b);if(_0x8d7131)_0x8d7131['name']=_0x5aef9d;}else for(const _0x11adc7 of _0x4fa336){let _0x5d9b04=0x0,_0x38cec=0x0;if(_0x11adc7['match'](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x5d9b04=Number(RegExp['$1']),_0x38cec=Number(RegExp['$2']);else _0x11adc7[_0x18e64c(0x20e)](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x5d9b04=DataManager[_0x18e64c(0x2bc)](RegExp['$1']),_0x38cec=Number(RegExp['$2']));_0x4fd5b8[_0x18e64c(0x497)](_0x5d9b04,_0x38cec),this['makeSuccess'](_0x4fd5b8);}}const _0x2e149d=_0x3c0c9[_0x18e64c(0x20e)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2e149d){if(_0x18e64c(0x1fb)!==_0x18e64c(0x2d3))for(const _0x367ddc of _0x2e149d){let _0x1ffec8=0x0,_0xfb1374=0x0;if(_0x367ddc[_0x18e64c(0x20e)](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x1ffec8=Number(RegExp['$1']),_0xfb1374=Number(RegExp['$2']);else _0x367ddc[_0x18e64c(0x20e)](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x18e64c(0x1fa)!==_0x18e64c(0x1fa)?(_0x411eeb['setDebuffTurns'](_0x29b500,_0x273422),this[_0x18e64c(0x3d1)](_0x32407b)):(_0x1ffec8=DataManager['getStateIdWithName'](RegExp['$1']),_0xfb1374=Number(RegExp['$2'])));_0x4fd5b8['addStateTurns'](_0x1ffec8,_0xfb1374),this[_0x18e64c(0x3d1)](_0x4fd5b8);}else this[_0x18e64c(0x3c0)](_0x29fa76),this[_0x18e64c(0x16d)](_0x594517),this[_0x18e64c(0x3df)](_0x5395bb),this['onAddStateCustomJS'](_0x36aa4c),this[_0x18e64c(0x3c2)](_0xa134c3);}},Game_Action['prototype'][_0x31613b(0x391)]=function(_0xa8666b){const _0x5864bb=_0x31613b,_0xce0042=['MAXHP',_0x5864bb(0x222),_0x5864bb(0x25b),_0x5864bb(0x3bc),'MAT',_0x5864bb(0x209),'AGI',_0x5864bb(0x46f)],_0x4fdf37=this[_0x5864bb(0x3b6)]()[_0x5864bb(0x204)],_0x46aa7d=_0x4fdf37['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x46aa7d)for(const _0x154619 of _0x46aa7d){if('wlrNy'!==_0x5864bb(0x40b))return _0x4e74bb[_0x5864bb(0x469)][_0x5864bb(0x32d)][_0x5864bb(0x156)][_0x5864bb(0x265)];else{_0x154619[_0x5864bb(0x20e)](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x5887bd=_0xce0042['indexOf'](String(RegExp['$1'])[_0x5864bb(0x301)]()),_0x9fc489=Number(RegExp['$2']);if(_0x5887bd>=0x0){if(_0x5864bb(0x428)===_0x5864bb(0x428))_0xa8666b[_0x5864bb(0x3da)](_0x5887bd,_0x9fc489),this[_0x5864bb(0x3d1)](_0xa8666b);else{let _0x13c5a8=_0x21a960[_0x5864bb(0x23c)][_0x5864bb(0x2b3)](this,_0x4b163d);return _0x13c5a8=this[_0x5864bb(0x179)](_0x499261,_0x13c5a8,_0x55948d),_0x13c5a8;}}}}const _0x1f3732=_0x4fdf37['match'](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x1f3732)for(const _0x104c40 of _0x46aa7d){_0x104c40[_0x5864bb(0x20e)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x460134=_0xce0042[_0x5864bb(0x25f)](String(RegExp['$1'])[_0x5864bb(0x301)]()),_0x1d1c24=Number(RegExp['$2']);_0x460134>=0x0&&(_0xa8666b[_0x5864bb(0x48c)](_0x460134,_0x1d1c24),this[_0x5864bb(0x3d1)](_0xa8666b));}},Game_Action['prototype']['applyDebuffTurnManipulationEffects']=function(_0x25f915){const _0x70a25b=_0x31613b,_0x2d6ead=[_0x70a25b(0x427),'MAXMP',_0x70a25b(0x25b),_0x70a25b(0x3bc),_0x70a25b(0x266),_0x70a25b(0x209),_0x70a25b(0x1d1),'LUK'],_0x43d70d=this[_0x70a25b(0x3b6)]()['note'],_0x3b0eca=_0x43d70d[_0x70a25b(0x20e)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x3b0eca){if('GJqCX'==='GJqCX')for(const _0x144c95 of _0x3b0eca){if('CQZlL'===_0x70a25b(0x28c)){this[_0x70a25b(0x27e)]=this['_stateOrigin']||{};const _0x26983f=_0x271209?this[_0x70a25b(0x1de)](_0x5e7b30):this['getCurrentStateOriginKey']();this['_stateOrigin'][_0x12cff1]=_0x26983f;}else{_0x144c95[_0x70a25b(0x20e)](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x34ddfc=_0x2d6ead['indexOf'](String(RegExp['$1'])[_0x70a25b(0x301)]()),_0x11b6a2=Number(RegExp['$2']);_0x34ddfc>=0x0&&(_0x25f915[_0x70a25b(0x43f)](_0x34ddfc,_0x11b6a2),this[_0x70a25b(0x3d1)](_0x25f915));}}else{const _0x3c49f9=_0x5ec35b['parse']('['+_0x38fb3e['$1'][_0x70a25b(0x20e)](/\d+/g)+']');for(const _0x3caeab of _0x3c49f9){if(!_0x360b1b[_0x70a25b(0x3d7)](_0x3caeab))return![];}return!![];}}const _0x2e6a3d=_0x43d70d[_0x70a25b(0x20e)](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x2e6a3d){if(_0x70a25b(0x1eb)===_0x70a25b(0x41d)){const _0x2d58f0=_0x1688e5[_0x70a25b(0x3c8)]('['+_0x1e9949['$1'][_0x70a25b(0x20e)](/\d+/g)+']');for(const _0x2a1845 of _0x2d58f0){if(!_0x2110b6[_0x70a25b(0x3d7)](_0x2a1845))return![];}return!![];}else for(const _0x1c3c15 of _0x3b0eca){_0x1c3c15['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x5b848e=_0x2d6ead[_0x70a25b(0x25f)](String(RegExp['$1'])[_0x70a25b(0x301)]()),_0x145f8d=Number(RegExp['$2']);_0x5b848e>=0x0&&(_0x25f915[_0x70a25b(0x17b)](_0x5b848e,_0x145f8d),this[_0x70a25b(0x3d1)](_0x25f915));}}},VisuMZ[_0x31613b(0x469)][_0x31613b(0x1f0)]=Game_BattlerBase['prototype'][_0x31613b(0x49f)],Game_BattlerBase['prototype'][_0x31613b(0x49f)]=function(){const _0x4db596=_0x31613b;this[_0x4db596(0x241)]={},this[_0x4db596(0x3e5)](),VisuMZ[_0x4db596(0x469)]['Game_BattlerBase_initMembers'][_0x4db596(0x2b3)](this);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3e5)]=function(){const _0xfeefa7=_0x31613b;this['_stateRetainType']='',this[_0xfeefa7(0x393)]={},this['_stateDisplay']={},this['_stateOrigin']={};},Game_BattlerBase['prototype'][_0x31613b(0x2b1)]=function(_0x38b8d2){const _0x163b5a=_0x31613b;return this[_0x163b5a(0x241)]=this[_0x163b5a(0x241)]||{},this[_0x163b5a(0x241)][_0x38b8d2]!==undefined;},VisuMZ[_0x31613b(0x469)][_0x31613b(0x2f2)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x190)],Game_BattlerBase['prototype'][_0x31613b(0x190)]=function(){const _0x2517e5=_0x31613b;this[_0x2517e5(0x241)]={},VisuMZ[_0x2517e5(0x469)][_0x2517e5(0x2f2)][_0x2517e5(0x2b3)](this);},VisuMZ['SkillsStatesCore'][_0x31613b(0x406)]=Game_BattlerBase['prototype'][_0x31613b(0x230)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x230)]=function(_0x1996ab){const _0x1a5fe2=_0x31613b;let _0x287c4a=this[_0x1a5fe2(0x1fc)](_0x1996ab);VisuMZ[_0x1a5fe2(0x469)]['Game_BattlerBase_eraseState'][_0x1a5fe2(0x2b3)](this,_0x1996ab);if(_0x287c4a&&!this[_0x1a5fe2(0x1fc)](_0x1996ab))this['onRemoveState'](_0x1996ab);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x15e)]=function(_0x1e452c){const _0xb2e8be=_0x31613b;this[_0xb2e8be(0x1e6)](_0x1e452c),this['clearStateDisplay'](_0x1e452c);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x1fd)]=Game_Battler['prototype']['onBattleEnd'],Game_Battler[_0x31613b(0x24d)][_0x31613b(0x2fc)]=function(){const _0x1d3435=_0x31613b;VisuMZ[_0x1d3435(0x469)]['Game_Battler_onBattleEnd'][_0x1d3435(0x2b3)](this),this[_0x1d3435(0x4a3)]();},VisuMZ['SkillsStatesCore'][_0x31613b(0x3d9)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x31f)],Game_BattlerBase[_0x31613b(0x24d)]['resetStateCounts']=function(_0x47de98){const _0xa1e3fb=_0x31613b,_0x27ca22=$dataStates[_0x47de98],_0x9cc1de=this['stateTurns'](_0x47de98),_0x1791cb=this[_0xa1e3fb(0x2ed)](_0x27ca22)[_0xa1e3fb(0x4a1)]()['trim']();switch(_0x1791cb){case _0xa1e3fb(0x31a):if(_0x9cc1de<=0x0)this[_0xa1e3fb(0x3f1)](_0x47de98);break;case _0xa1e3fb(0x41b):this[_0xa1e3fb(0x3f1)](_0x47de98);break;case _0xa1e3fb(0x461):this['prepareResetStateCounts'](_0x47de98),this[_0xa1e3fb(0x3fe)][_0x47de98]=Math['max'](this[_0xa1e3fb(0x3fe)][_0x47de98],_0x9cc1de);break;case _0xa1e3fb(0x40c):this[_0xa1e3fb(0x3f1)](_0x47de98),this[_0xa1e3fb(0x3fe)][_0x47de98]+=_0x9cc1de;break;default:this[_0xa1e3fb(0x3f1)](_0x47de98);break;}if(this[_0xa1e3fb(0x1fc)](_0x47de98)){const _0x5809a4=DataManager['stateMaximumTurns'](_0x47de98);this[_0xa1e3fb(0x3fe)][_0x47de98]=this[_0xa1e3fb(0x3fe)][_0x47de98][_0xa1e3fb(0x3f6)](0x0,_0x5809a4);}},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3f1)]=function(_0x17aae3){const _0x4de769=_0x31613b;VisuMZ[_0x4de769(0x469)][_0x4de769(0x3d9)]['call'](this,_0x17aae3);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x2ed)]=function(_0x1db128){const _0xeaf2f9=_0x31613b,_0x3728c9=_0x1db128[_0xeaf2f9(0x204)];return _0x3728c9['match'](/<REAPPLY RULES:[ ](.*)>/i)?_0xeaf2f9(0x286)!==_0xeaf2f9(0x286)?!![]:String(RegExp['$1']):VisuMZ[_0xeaf2f9(0x469)][_0xeaf2f9(0x32d)]['States'][_0xeaf2f9(0x3d0)];},VisuMZ['SkillsStatesCore']['Game_BattlerBase_overwriteBuffTurns']=Game_BattlerBase['prototype'][_0x31613b(0x2e1)],Game_BattlerBase['prototype'][_0x31613b(0x2e1)]=function(_0x33c2cd,_0x253e2b){const _0x497932=_0x31613b,_0x1b4e03=VisuMZ[_0x497932(0x469)][_0x497932(0x32d)]['Buffs']['ReapplyRules'],_0x3104f3=this[_0x497932(0x43e)](_0x33c2cd);switch(_0x1b4e03){case'ignore':if(_0x3104f3<=0x0)this['_buffTurns'][_0x33c2cd]=_0x253e2b;break;case _0x497932(0x41b):this['_buffTurns'][_0x33c2cd]=_0x253e2b;break;case _0x497932(0x461):this[_0x497932(0x2da)][_0x33c2cd]=Math[_0x497932(0x2ba)](_0x3104f3,_0x253e2b);break;case _0x497932(0x40c):this['_buffTurns'][_0x33c2cd]+=_0x253e2b;break;default:VisuMZ[_0x497932(0x469)][_0x497932(0x2e7)][_0x497932(0x2b3)](this,_0x33c2cd,_0x253e2b);break;}const _0x530fb4=VisuMZ[_0x497932(0x469)][_0x497932(0x32d)][_0x497932(0x21d)][_0x497932(0x42d)];this[_0x497932(0x2da)][_0x33c2cd]=this['_buffTurns'][_0x33c2cd]['clamp'](0x0,_0x530fb4);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x224)]=function(){const _0x5acbb6=_0x31613b;if(this[_0x5acbb6(0x241)][_0x5acbb6(0x3d2)]!==undefined)return this['_cache'][_0x5acbb6(0x3d2)];this[_0x5acbb6(0x241)][_0x5acbb6(0x3d2)]=![];const _0x2afc22=this[_0x5acbb6(0x3a9)]();for(const _0x555f1f of _0x2afc22){if(!_0x555f1f)continue;if(_0x555f1f[_0x5acbb6(0x204)][_0x5acbb6(0x20e)](/<GROUP DEFEAT>/i)){if(_0x5acbb6(0x180)===_0x5acbb6(0x180)){this['_cache'][_0x5acbb6(0x3d2)]=!![];break;}else this['_stateRetainType']=_0x1d0af4;}}return this['_cache'][_0x5acbb6(0x3d2)];},VisuMZ['SkillsStatesCore']['Game_Unit_deadMembers']=Game_Unit[_0x31613b(0x24d)][_0x31613b(0x3b9)],Game_Unit['prototype'][_0x31613b(0x3b9)]=function(){const _0x59fbc7=_0x31613b;let _0x3121a8=VisuMZ[_0x59fbc7(0x469)][_0x59fbc7(0x2b7)][_0x59fbc7(0x2b3)](this);return BattleManager[_0x59fbc7(0x398)]&&('uKsnR'!==_0x59fbc7(0x3f7)?(this[_0x59fbc7(0x329)](_0x483206,_0x57784a,_0x576284,_0x2e525f),_0x49bed4++,_0x800dfa%0x2===0x0?(_0x5f0d73=_0x4c48b0,_0x3901ce+=_0x4c517f):_0x558f9b+=_0x21a3cb+0x18):_0x3121a8=_0x3121a8[_0x59fbc7(0x479)](this[_0x59fbc7(0x24e)]()['filter'](_0x30d7c0=>_0x30d7c0[_0x59fbc7(0x224)]()))),_0x3121a8;},VisuMZ[_0x31613b(0x469)][_0x31613b(0x2fd)]=Game_BattlerBase[_0x31613b(0x24d)]['clearStates'],Game_BattlerBase['prototype'][_0x31613b(0x42a)]=function(){const _0x50cc6a=_0x31613b;if(this[_0x50cc6a(0x40d)]()!=='')this[_0x50cc6a(0x3f8)]();else{if(_0x50cc6a(0x3ff)!==_0x50cc6a(0x3ff))return _0x40bc34[_0x50cc6a(0x3f4)];else VisuMZ[_0x50cc6a(0x469)]['Game_BattlerBase_clearStates'][_0x50cc6a(0x2b3)](this),this['initMembersSkillsStatesCore']();}},Game_Actor[_0x31613b(0x24d)][_0x31613b(0x42a)]=function(){const _0x41bed9=_0x31613b;this['_stateSteps']=this[_0x41bed9(0x444)]||{},Game_Battler[_0x41bed9(0x24d)]['clearStates'][_0x41bed9(0x2b3)](this);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3f8)]=function(){const _0x57d7e8=_0x31613b,_0x1fa8db=this['states']();for(const _0x5b3b3f of _0x1fa8db){if(_0x5b3b3f&&this[_0x57d7e8(0x1e4)](_0x5b3b3f))this[_0x57d7e8(0x230)](_0x5b3b3f['id']);}this[_0x57d7e8(0x241)]={};},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x1e4)]=function(_0x53d1a4){const _0x5a394b=_0x31613b,_0x1e25ad=this[_0x5a394b(0x40d)]();if(_0x1e25ad!==''){const _0x53e061=_0x53d1a4[_0x5a394b(0x204)];if(_0x1e25ad===_0x5a394b(0x38e)&&_0x53e061[_0x5a394b(0x20e)](/<NO DEATH CLEAR>/i))return![];if(_0x1e25ad===_0x5a394b(0x46e)&&_0x53e061[_0x5a394b(0x20e)](/<NO RECOVER ALL CLEAR>/i))return![];}return this['isStateAffected'](_0x53d1a4['id']);},Game_BattlerBase[_0x31613b(0x24d)]['getStateRetainType']=function(){return this['_stateRetainType'];},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3ec)]=function(_0x59ceec){this['_stateRetainType']=_0x59ceec;},Game_BattlerBase['prototype'][_0x31613b(0x21e)]=function(){const _0x5666a7=_0x31613b;this[_0x5666a7(0x197)]='';},VisuMZ[_0x31613b(0x469)][_0x31613b(0x3d8)]=Game_BattlerBase[_0x31613b(0x24d)]['die'],Game_BattlerBase[_0x31613b(0x24d)]['die']=function(){const _0x1eb33a=_0x31613b;this[_0x1eb33a(0x3ec)](_0x1eb33a(0x38e)),VisuMZ['SkillsStatesCore'][_0x1eb33a(0x3d8)]['call'](this),this[_0x1eb33a(0x21e)]();},VisuMZ[_0x31613b(0x469)][_0x31613b(0x19c)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x2c1)],Game_BattlerBase['prototype'][_0x31613b(0x2c1)]=function(){const _0x48c142=_0x31613b;this[_0x48c142(0x3ec)](_0x48c142(0x46e)),VisuMZ['SkillsStatesCore']['Game_BattlerBase_recoverAll'][_0x48c142(0x2b3)](this),this[_0x48c142(0x21e)]();},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x179)]=function(_0x519ce0,_0x17fb9e,_0xadaf83){return _0x17fb9e;},Game_BattlerBase['prototype'][_0x31613b(0x4a5)]=function(_0x3d7a0f){const _0x333135=_0x31613b;for(settings of VisuMZ[_0x333135(0x469)]['Settings']['Costs']){if(_0x333135(0x16a)!=='Txifd'){const _0x3a820b=_0x377c02(_0xe18a8d['$1']),_0x36d1a1=_0x333135(0x19a)[_0x333135(0x26b)](_0x3a820b);_0x2e86fd[_0x333135(0x469)][_0x333135(0x330)][_0x21de52['id']]=new _0x4e5ff(_0x333135(0x39c),_0x36d1a1);}else{let _0x5ffbae=settings[_0x333135(0x23c)][_0x333135(0x2b3)](this,_0x3d7a0f);_0x5ffbae=this[_0x333135(0x179)](_0x3d7a0f,_0x5ffbae,settings);if(!settings[_0x333135(0x425)][_0x333135(0x2b3)](this,_0x3d7a0f,_0x5ffbae))return![];}}return!![];},Game_BattlerBase[_0x31613b(0x24d)]['paySkillCost']=function(_0x2ec49c){const _0x3b5b2b=_0x31613b;for(settings of VisuMZ[_0x3b5b2b(0x469)][_0x3b5b2b(0x32d)][_0x3b5b2b(0x284)]){let _0x3e3fc1=settings[_0x3b5b2b(0x23c)][_0x3b5b2b(0x2b3)](this,_0x2ec49c);_0x3e3fc1=this[_0x3b5b2b(0x179)](_0x2ec49c,_0x3e3fc1,settings),settings[_0x3b5b2b(0x432)]['call'](this,_0x2ec49c,_0x3e3fc1);}},VisuMZ[_0x31613b(0x469)][_0x31613b(0x28d)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x482)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x482)]=function(_0x4545ba){const _0xe3a9ab=_0x31613b;if(!_0x4545ba)return![];if(!VisuMZ[_0xe3a9ab(0x469)][_0xe3a9ab(0x28d)][_0xe3a9ab(0x2b3)](this,_0x4545ba))return![];if(!this[_0xe3a9ab(0x402)](_0x4545ba))return![];if(!this[_0xe3a9ab(0x171)](_0x4545ba))return![];if(!this[_0xe3a9ab(0x33f)](_0x4545ba))return![];return!![];},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x402)]=function(_0x2dabec){const _0x389180=_0x31613b;if(!this[_0x389180(0x1a7)](_0x2dabec))return![];return!![];},Game_BattlerBase[_0x31613b(0x24d)]['checkSkillConditionsSwitchNotetags']=function(_0x94fd45){const _0x3a3864=_0x31613b,_0x3f3d7d=_0x94fd45[_0x3a3864(0x204)];if(_0x3f3d7d[_0x3a3864(0x20e)](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x48bd24=JSON['parse']('['+RegExp['$1'][_0x3a3864(0x20e)](/\d+/g)+']');for(const _0x2455ae of _0x48bd24){if(_0x3a3864(0x3a4)!==_0x3a3864(0x3a4)){const _0x1910d1=_0x4b74ab['note'];return _0x1910d1[_0x3a3864(0x20e)](/<REAPPLY RULES:[ ](.*)>/i)?_0x3c78d4(_0x2f4678['$1']):_0x27f555[_0x3a3864(0x469)]['Settings'][_0x3a3864(0x247)][_0x3a3864(0x3d0)];}else{if(!$gameSwitches['value'](_0x2455ae))return![];}}return!![];}if(_0x3f3d7d['match'](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26990f=JSON[_0x3a3864(0x3c8)]('['+RegExp['$1'][_0x3a3864(0x20e)](/\d+/g)+']');for(const _0x42f42b of _0x26990f){if(!$gameSwitches[_0x3a3864(0x3d7)](_0x42f42b))return![];}return!![];}if(_0x3f3d7d[_0x3a3864(0x20e)](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13c181=JSON[_0x3a3864(0x3c8)]('['+RegExp['$1'][_0x3a3864(0x20e)](/\d+/g)+']');for(const _0x4ab975 of _0x13c181){if($gameSwitches[_0x3a3864(0x3d7)](_0x4ab975))return!![];}return![];}if(_0x3f3d7d[_0x3a3864(0x20e)](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x23db90=JSON[_0x3a3864(0x3c8)]('['+RegExp['$1'][_0x3a3864(0x20e)](/\d+/g)+']');for(const _0x2679c1 of _0x23db90){if(_0x3a3864(0x463)===_0x3a3864(0x354))_0x57d749[_0x3a3864(0x24d)][_0x3a3864(0x357)][_0x3a3864(0x2b3)](this,this[_0x3a3864(0x309)],_0x3104f1,_0x519610,_0xc8cf37,_0x1fd9c4);else{if(!$gameSwitches[_0x3a3864(0x3d7)](_0x2679c1))return!![];}}return![];}if(_0x3f3d7d['match'](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2ab774=JSON['parse']('['+RegExp['$1'][_0x3a3864(0x20e)](/\d+/g)+']');for(const _0x49d43d of _0x2ab774){if(_0x3a3864(0x462)!=='NEcGk')return _0x4bf516['buttonAssistSwitch'];else{if(!$gameSwitches['value'](_0x49d43d))return!![];}}return![];}if(_0x3f3d7d[_0x3a3864(0x20e)](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x17aea6=JSON[_0x3a3864(0x3c8)]('['+RegExp['$1'][_0x3a3864(0x20e)](/\d+/g)+']');for(const _0x486707 of _0x17aea6){if(_0x3a3864(0x360)===_0x3a3864(0x360)){if($gameSwitches[_0x3a3864(0x3d7)](_0x486707))return![];}else{let _0x468907=_0x4f07cf[_0x3a3864(0x397)][_0x23c56e];if(_0x468907[_0x3a3864(0x20e)](/\\I\[(\d+)\]/i))return _0x468907;if(this[_0x3a3864(0x26a)]()===_0x3a3864(0x22e))return _0x468907;const _0x66bf1b=_0x2f2c12[_0x3a3864(0x469)][_0x3a3864(0x32d)]['Skills'],_0x508125=_0x28733b[_0x3a3864(0x1ad)][_0x3a3864(0x1f5)](_0x5a1838),_0x10e5a8=_0x508125?_0x66bf1b[_0x3a3864(0x2d4)]:_0x66bf1b[_0x3a3864(0x216)];return _0x3a3864(0x35e)[_0x3a3864(0x26b)](_0x10e5a8,_0x468907);}}return!![];}return!![];},Game_BattlerBase['prototype'][_0x31613b(0x171)]=function(_0xdbb752){const _0x17a13f=_0x31613b,_0x5e3cbd=_0xdbb752[_0x17a13f(0x204)],_0xa986a3=VisuMZ[_0x17a13f(0x469)][_0x17a13f(0x330)];return _0xa986a3[_0xdbb752['id']]?_0xa986a3[_0xdbb752['id']][_0x17a13f(0x2b3)](this,_0xdbb752):!![];},Game_BattlerBase['prototype'][_0x31613b(0x33f)]=function(_0x5e7383){const _0x1ec7bc=_0x31613b;return VisuMZ['SkillsStatesCore'][_0x1ec7bc(0x32d)][_0x1ec7bc(0x156)][_0x1ec7bc(0x3fd)][_0x1ec7bc(0x2b3)](this,_0x5e7383);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x218)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x48f)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x48f)]=function(_0x4253ec){const _0x574bf3=_0x31613b;for(settings of VisuMZ[_0x574bf3(0x469)][_0x574bf3(0x32d)][_0x574bf3(0x284)]){if(settings[_0x574bf3(0x249)][_0x574bf3(0x301)]()==='MP'){let _0x35b3ff=settings[_0x574bf3(0x23c)][_0x574bf3(0x2b3)](this,_0x4253ec);return _0x35b3ff=this[_0x574bf3(0x179)](_0x4253ec,_0x35b3ff,settings),_0x35b3ff;}}return VisuMZ['SkillsStatesCore'][_0x574bf3(0x218)][_0x574bf3(0x2b3)](this,_0x4253ec);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x405)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3cc)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3cc)]=function(_0x2abf1e){const _0x5b3f23=_0x31613b;for(settings of VisuMZ[_0x5b3f23(0x469)][_0x5b3f23(0x32d)][_0x5b3f23(0x284)]){if(settings[_0x5b3f23(0x249)][_0x5b3f23(0x301)]()==='TP'){if(_0x5b3f23(0x174)!==_0x5b3f23(0x174)){const _0x38be38=this[_0x5b3f23(0x352)](_0x10a02c);if(_0x38be38===_0x5b3f23(0x342))this[_0x5b3f23(0x2dc)](_0x1c8269);else _0x38be38===_0x5b3f23(0x1c2)?this[_0x5b3f23(0x283)](_0x171183):_0x240d74['prototype'][_0x5b3f23(0x44a)][_0x5b3f23(0x2b3)](this,_0x5580f6);}else{let _0x4dbb74=settings[_0x5b3f23(0x23c)]['call'](this,_0x2abf1e);return _0x4dbb74=this[_0x5b3f23(0x179)](_0x2abf1e,_0x4dbb74,settings),_0x4dbb74;}}}return VisuMZ[_0x5b3f23(0x469)][_0x5b3f23(0x405)][_0x5b3f23(0x2b3)](this,_0x2abf1e);},Game_BattlerBase[_0x31613b(0x24d)]['hasState']=function(_0x1913ec){const _0x44aeb9=_0x31613b;if(typeof _0x1913ec===_0x44aeb9(0x217))_0x1913ec=$dataStates[_0x1913ec];return this['states']()['includes'](_0x1913ec);},VisuMZ['SkillsStatesCore'][_0x31613b(0x24a)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3a9)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3a9)]=function(){const _0x2312d2=_0x31613b;let _0x7ac82c=VisuMZ['SkillsStatesCore'][_0x2312d2(0x24a)][_0x2312d2(0x2b3)](this);if($gameTemp['_checkingPassiveStates'])return _0x7ac82c;return $gameTemp['_checkingPassiveStates']=!![],this['addPassiveStates'](_0x7ac82c),$gameTemp[_0x2312d2(0x491)]=undefined,_0x7ac82c;},Game_BattlerBase['prototype']['addPassiveStates']=function(_0x21787){const _0x426818=_0x31613b,_0x2b4576=this[_0x426818(0x477)]();for(state of _0x2b4576){if(_0x426818(0x1e5)!==_0x426818(0x1e5))_0x5d896e[_0x426818(0x469)][_0x426818(0x2a3)][_0x426818(0x2b3)](this),this[_0x426818(0x268)]()&&this['createShopStatusWindow']();else{if(!state)continue;if(!this[_0x426818(0x3a6)](state)&&_0x21787[_0x426818(0x1f5)](state))continue;_0x21787[_0x426818(0x49d)](state);}}if(_0x2b4576[_0x426818(0x278)]>0x0){if('tTHKx'!==_0x426818(0x476))_0x21787[_0x426818(0x38d)]((_0x33dcfa,_0x1ce3da)=>{const _0x32bd20=_0x426818,_0x426ebf=_0x33dcfa[_0x32bd20(0x3b3)],_0x374911=_0x1ce3da[_0x32bd20(0x3b3)];if(_0x426ebf!==_0x374911)return _0x374911-_0x426ebf;return _0x33dcfa-_0x1ce3da;});else{_0xf34154[_0x426818(0x20e)](_0x348ba9);const _0x2c4bfc=_0x351758(_0x32f00c['$1'])[_0x426818(0x417)](',')[_0x426818(0x27d)](_0x8dc706=>_0x525ab4(_0x8dc706)[_0x426818(0x301)]()[_0x426818(0x17c)]());_0x5b2153=_0x39ad2c[_0x426818(0x479)](_0x2c4bfc);}}},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3a6)]=function(_0x2a15c7){const _0x3b08de=_0x31613b;return _0x2a15c7[_0x3b08de(0x204)]['match'](/<PASSIVE STACKABLE>/i);},VisuMZ[_0x31613b(0x469)]['Game_BattlerBase_traitsSet']=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x306)],Game_BattlerBase[_0x31613b(0x24d)]['traitsSet']=function(_0x48e5c7){const _0x5a99f2=_0x31613b;this[_0x5a99f2(0x348)]=!![];let _0xfa972a=VisuMZ[_0x5a99f2(0x469)]['Game_BattlerBase_traitsSet'][_0x5a99f2(0x2b3)](this,_0x48e5c7);return this[_0x5a99f2(0x348)]=undefined,_0xfa972a;},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x339)]=function(){const _0x55d2da=_0x31613b;let _0x4b614e=[];this[_0x55d2da(0x456)]=this['_passiveStateResults']||{};for(;;){_0x4b614e=[];let _0x35a97b=!![];for(const _0x39cafe of this['_cache'][_0x55d2da(0x477)]){const _0x47ecc9=$dataStates[_0x39cafe];if(!_0x47ecc9)continue;let _0x5c91e7=this[_0x55d2da(0x158)](_0x47ecc9);if(this['_passiveStateResults'][_0x39cafe]!==_0x5c91e7){if(_0x55d2da(0x30f)===_0x55d2da(0x30f))_0x35a97b=![],this['_passiveStateResults'][_0x39cafe]=_0x5c91e7;else{const _0xb82de6=_0x4f12f5[_0x55d2da(0x469)]['Settings'][_0x55d2da(0x1d8)];return _0xb82de6[_0x55d2da(0x401)]==='number'?_0x21e3ee['mainFontSize']()-0x6:_0x28a999[_0x55d2da(0x195)]()-0x2;}}if(!_0x5c91e7)continue;_0x4b614e[_0x55d2da(0x49d)](_0x47ecc9);}if(_0x35a97b){if(_0x55d2da(0x221)!==_0x55d2da(0x221))this[_0x55d2da(0x241)]={},_0x2874cc[_0x55d2da(0x469)][_0x55d2da(0x2f2)][_0x55d2da(0x2b3)](this);else break;}else{if(!this['_checkingTraitsSetSkillsStatesCore'])this['refresh']();this['createPassiveStatesCache']();}}return _0x4b614e;},Game_BattlerBase['prototype'][_0x31613b(0x158)]=function(_0x4b4376){const _0x2d1bf6=_0x31613b;if(!this['meetsPassiveStateConditionClasses'](_0x4b4376))return![];if(!this['meetsPassiveStateConditionSwitches'](_0x4b4376))return![];if(!this[_0x2d1bf6(0x40f)](_0x4b4376))return![];if(!this[_0x2d1bf6(0x253)](_0x4b4376))return![];return!![];},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x199)]=function(_0x4085c6){return!![];},Game_Actor['prototype'][_0x31613b(0x199)]=function(_0x17ef2d){const _0x569da3=_0x31613b,_0x376f5a=_0x17ef2d[_0x569da3(0x204)];if(_0x376f5a[_0x569da3(0x20e)](/<PASSIVE CONDITION[ ](?:CLASS|CLASSES):[ ](.*)>/i)){const _0x1eaa7e=String(RegExp['$1'])[_0x569da3(0x417)](',')[_0x569da3(0x27d)](_0x5bcfd6=>_0x5bcfd6[_0x569da3(0x17c)]()),_0x3f2fb4=VisuMZ[_0x569da3(0x469)][_0x569da3(0x263)](_0x1eaa7e);return _0x3f2fb4['includes'](this[_0x569da3(0x385)]());}if(_0x376f5a[_0x569da3(0x20e)](/<PASSIVE CONDITION[ ](?:MULTICLASS|MULTICLASSES):[ ](.*)>/i)){if(_0x569da3(0x2f6)!==_0x569da3(0x333)){const _0x5c8bcd=String(RegExp['$1'])['split'](',')[_0x569da3(0x27d)](_0xa4f74=>_0xa4f74[_0x569da3(0x17c)]()),_0xbabf08=VisuMZ[_0x569da3(0x469)][_0x569da3(0x263)](_0x5c8bcd);let _0xe8511=[this[_0x569da3(0x385)]()];return Imported[_0x569da3(0x443)]&&this[_0x569da3(0x198)]&&(_0xe8511=this[_0x569da3(0x198)]()),_0xbabf08[_0x569da3(0x2ff)](_0x55ea9b=>_0xe8511['includes'](_0x55ea9b))[_0x569da3(0x278)]>0x0;}else{this['resetFontSettings'](),this[_0x569da3(0x176)][_0x569da3(0x419)]();const _0x194a9e=this[_0x569da3(0x1d4)];if(!_0x194a9e)return;const _0x4729e5=_0x194a9e['states']()['filter'](_0x3b04ef=>_0x3b04ef[_0x569da3(0x321)]>0x0),_0x509624=[..._0x473546(0x8)[_0x569da3(0x472)]()][_0x569da3(0x2ff)](_0x4522ed=>_0x194a9e[_0x569da3(0x318)](_0x4522ed)!==0x0),_0x3a4b68=this['_animationIndex'],_0x18a4e1=_0x4729e5[_0x3a4b68];if(_0x18a4e1)_0x1a6a79[_0x569da3(0x24d)][_0x569da3(0x437)][_0x569da3(0x2b3)](this,_0x194a9e,_0x18a4e1,0x0,0x0),_0x17f21d['prototype']['drawActorStateData'][_0x569da3(0x2b3)](this,_0x194a9e,_0x18a4e1,0x0,0x0);else{const _0x55406d=_0x509624[_0x3a4b68-_0x4729e5[_0x569da3(0x278)]];if(_0x55406d===_0x4e88b0)return;_0x519514[_0x569da3(0x24d)][_0x569da3(0x3b7)]['call'](this,_0x194a9e,_0x55406d,0x0,0x0),_0xe389d7[_0x569da3(0x24d)][_0x569da3(0x206)]['call'](this,_0x194a9e,_0x55406d,0x0,0x0);}}}return Game_BattlerBase[_0x569da3(0x24d)][_0x569da3(0x199)][_0x569da3(0x2b3)](this,_0x17ef2d);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x263)]=function(_0x3fd34d){const _0x4b7dbb=_0x31613b,_0x63052e=[];for(let _0x361eeb of _0x3fd34d){if(_0x4b7dbb(0x2ef)===_0x4b7dbb(0x293)){this[_0x4b7dbb(0x46b)]=this[_0x4b7dbb(0x46b)]||{};if(this['_stypeIDs'][_0x2694f1['id']])return this[_0x4b7dbb(0x46b)][_0x1ba789['id']];this['_stypeIDs'][_0x3362b4['id']]=[_0x37279e['stypeId']];if(_0x50ad6b[_0x4b7dbb(0x204)]['match'](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2ce665=_0x59b572[_0x4b7dbb(0x3c8)]('['+_0x342ea7['$1'][_0x4b7dbb(0x20e)](/\d+/g)+']');this['_stypeIDs'][_0x5e3a11['id']]=this['_stypeIDs'][_0x4c6280['id']][_0x4b7dbb(0x479)](_0x2ce665);}else{if(_0x3ad436['note'][_0x4b7dbb(0x20e)](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x36b7b8=_0x4abb36['$1'][_0x4b7dbb(0x417)](',');for(const _0x5dab39 of _0x36b7b8){const _0x298ceb=_0x5219ac[_0x4b7dbb(0x3b1)](_0x5dab39);if(_0x298ceb)this['_stypeIDs'][_0x3f4452['id']]['push'](_0x298ceb);}}}return this['_stypeIDs'][_0x5ba3ea['id']];}else{_0x361eeb=(String(_0x361eeb)||'')['trim']();const _0x28113d=/^\d+$/[_0x4b7dbb(0x3f3)](_0x361eeb);if(_0x28113d)_0x63052e[_0x4b7dbb(0x49d)](Number(_0x361eeb));else{if('xwqUJ'===_0x4b7dbb(0x1f7)){const _0xe897a7=[];for(const _0x2ea4fb of this[_0x4b7dbb(0x390)]()[_0x4b7dbb(0x375)]){const _0x3288c7=_0x145a6f[_0x2ea4fb[_0x4b7dbb(0x3d6)]];if(_0x3288c7&&!_0xe897a7[_0x4b7dbb(0x1f5)](_0x3288c7))_0xe897a7[_0x4b7dbb(0x49d)](_0x3288c7);}return _0xe897a7;}else _0x63052e[_0x4b7dbb(0x49d)](DataManager[_0x4b7dbb(0x26d)](_0x361eeb));}}}return _0x63052e['map'](_0x110a06=>$dataClasses[Number(_0x110a06)])[_0x4b7dbb(0x1a6)](null);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3a1)]=function(_0x49cae3){const _0xb9208=_0x31613b,_0x48fa82=_0x49cae3[_0xb9208(0x204)];if(_0x48fa82[_0xb9208(0x20e)](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x300a15=JSON[_0xb9208(0x3c8)]('['+RegExp['$1'][_0xb9208(0x20e)](/\d+/g)+']');for(const _0x1abe80 of _0x300a15){if(_0xb9208(0x2af)!==_0xb9208(0x322)){if(!$gameSwitches['value'](_0x1abe80))return![];}else _0x343df5[_0xb9208(0x469)][_0xb9208(0x32d)]['Buffs'][_0xb9208(0x429)][_0xb9208(0x2b3)](this,_0x24d91f);}return!![];}if(_0x48fa82[_0xb9208(0x20e)](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('rvLhm'!=='LrImC'){const _0x464e62=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x72ff3c of _0x464e62){if(_0xb9208(0x244)===_0xb9208(0x244)){if(!$gameSwitches[_0xb9208(0x3d7)](_0x72ff3c))return![];}else _0x267564=![],this['_passiveStateResults'][_0x4ef67f]=_0x49e4e6;}return!![];}else{const _0x417f34=_0x88572(_0x54e925['$1']);_0x417f34<_0x9034c2?(_0x5cb656(_0xb9208(0x229)[_0xb9208(0x26b)](_0xacf0b6,_0x417f34,_0x588a74)),_0x24094b[_0xb9208(0x44e)]()):_0xa504ab=_0x4f411c[_0xb9208(0x2ba)](_0x417f34,_0x104612);}}if(_0x48fa82[_0xb9208(0x20e)](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0xb9208(0x377)===_0xb9208(0x377)){const _0x368a0b=JSON[_0xb9208(0x3c8)]('['+RegExp['$1'][_0xb9208(0x20e)](/\d+/g)+']');for(const _0x1ef3a0 of _0x368a0b){if($gameSwitches[_0xb9208(0x3d7)](_0x1ef3a0))return!![];}return![];}else{const _0x4344ac=_0x207587['parse']('['+_0x4be55c['$1'][_0xb9208(0x20e)](/\d+/g)+']');for(const _0x5c26e8 of _0x4344ac){if(_0x188d30[_0xb9208(0x3d7)](_0x5c26e8))return!![];}return![];}}if(_0x48fa82['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('CxUpg'!==_0xb9208(0x30c))_0x5bdd19[_0xb9208(0x2b4)]=0x2;else{const _0x4b5814=JSON[_0xb9208(0x3c8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x30113f of _0x4b5814){if(!$gameSwitches[_0xb9208(0x3d7)](_0x30113f))return!![];}return![];}}if(_0x48fa82['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x27d05a=JSON['parse']('['+RegExp['$1'][_0xb9208(0x20e)](/\d+/g)+']');for(const _0x33eec7 of _0x27d05a){if(_0xb9208(0x2bf)==='qvgtH'){const _0x37a995=_0x1751fd[_0xb9208(0x204)],_0x35696b=_0x58d411[_0xb9208(0x469)][_0xb9208(0x330)];return _0x35696b[_0x16c269['id']]?_0x35696b[_0x3a8f26['id']][_0xb9208(0x2b3)](this,_0x1b56df):!![];}else{if(!$gameSwitches[_0xb9208(0x3d7)](_0x33eec7))return!![];}}return![];}if(_0x48fa82['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x30327d=JSON[_0xb9208(0x3c8)]('['+RegExp['$1'][_0xb9208(0x20e)](/\d+/g)+']');for(const _0x2499f0 of _0x30327d){if(_0xb9208(0x3eb)===_0xb9208(0x3eb)){if($gameSwitches[_0xb9208(0x3d7)](_0x2499f0))return![];}else{if(!_0x12779b[_0xb9208(0x157)])return![];else return this[_0xb9208(0x185)]()?!![]:_0x5aff52[_0xb9208(0x469)][_0xb9208(0x32d)]['Skills'][_0xb9208(0x363)];}}return!![];}return!![];},Game_BattlerBase[_0x31613b(0x24d)]['meetsPassiveStateConditionJS']=function(_0x46d857){const _0x1a5cec=_0x31613b,_0x52cf7c=VisuMZ['SkillsStatesCore']['statePassiveConditionJS'];if(_0x52cf7c[_0x46d857['id']]&&!_0x52cf7c[_0x46d857['id']][_0x1a5cec(0x2b3)](this,_0x46d857))return![];return!![];},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x253)]=function(_0x1d5c25){const _0x1145e9=_0x31613b;return VisuMZ['SkillsStatesCore']['Settings'][_0x1145e9(0x438)]['PassiveConditionJS']['call'](this,_0x1d5c25);},Game_BattlerBase[_0x31613b(0x24d)]['passiveStates']=function(){const _0x5202af=_0x31613b;if(this['checkCacheKey'](_0x5202af(0x477)))return this['convertPassiveStates']();if(this[_0x5202af(0x274)])return[];return this['_checkingVisuMzPassiveStateObjects']=!![],this['createPassiveStatesCache'](),this[_0x5202af(0x274)]=undefined,this[_0x5202af(0x339)]();},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x258)]=function(){const _0x12cd88=_0x31613b;this[_0x12cd88(0x274)]=!![],this[_0x12cd88(0x241)][_0x12cd88(0x477)]=[],this[_0x12cd88(0x39f)](),this['addPassiveStatesByNotetag'](),this[_0x12cd88(0x453)](),this[_0x12cd88(0x241)][_0x12cd88(0x477)]=this[_0x12cd88(0x241)][_0x12cd88(0x477)][_0x12cd88(0x38d)]((_0x5709ce,_0x4a142f)=>_0x5709ce-_0x4a142f),this[_0x12cd88(0x274)]=undefined;},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x39f)]=function(){const _0x35002f=_0x31613b;if(Imported['VisuMZ_1_ElementStatusCore'])this[_0x35002f(0x3bb)]();},Game_BattlerBase['prototype'][_0x31613b(0x22c)]=function(){return[];},Game_BattlerBase['prototype']['addPassiveStatesByNotetag']=function(){const _0x1e0b03=_0x31613b,_0x5ad7dd=this[_0x1e0b03(0x22c)]();for(const _0xf881e3 of _0x5ad7dd){if(_0x1e0b03(0x45f)!=='MndKU'){const _0x1e4852=this[_0x1e0b03(0x424)](_0x2f2826);return _0x1e4852[_0x1e0b03(0x278)];}else{if(!_0xf881e3)continue;const _0x484881=_0xf881e3[_0x1e0b03(0x204)][_0x1e0b03(0x20e)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x484881)for(const _0x42303a of _0x484881){_0x42303a[_0x1e0b03(0x20e)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x4e2771=RegExp['$1'];if(_0x4e2771[_0x1e0b03(0x20e)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x10cd5a=JSON[_0x1e0b03(0x3c8)]('['+RegExp['$1'][_0x1e0b03(0x20e)](/\d+/g)+']');this['_cache'][_0x1e0b03(0x477)]=this[_0x1e0b03(0x241)][_0x1e0b03(0x477)][_0x1e0b03(0x479)](_0x10cd5a);}else{if(_0x1e0b03(0x298)===_0x1e0b03(0x298)){const _0xce99bc=_0x4e2771['split'](',');for(const _0x338f05 of _0xce99bc){if(_0x1e0b03(0x21c)!==_0x1e0b03(0x182)){const _0x197563=DataManager['getStateIdWithName'](_0x338f05);if(_0x197563)this[_0x1e0b03(0x241)][_0x1e0b03(0x477)][_0x1e0b03(0x49d)](_0x197563);}else _0x2a71a7[_0x1e0b03(0x469)][_0x1e0b03(0x32d)][_0x1e0b03(0x247)][_0x1e0b03(0x4a7)]['call'](this,_0x3ef890);}}else{const _0xe4de3c=_0x4432c1['parse']('['+_0x14e763['$1'][_0x1e0b03(0x20e)](/\d+/g)+']');for(const _0x1db1f1 of _0xe4de3c){if(!_0x3b25cf[_0x1e0b03(0x3d7)](_0x1db1f1))return!![];}return![];}}}}}},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x453)]=function(){const _0x10a569=_0x31613b,_0x22ced9=VisuMZ[_0x10a569(0x469)][_0x10a569(0x32d)][_0x10a569(0x438)][_0x10a569(0x464)];this[_0x10a569(0x241)][_0x10a569(0x477)]=this[_0x10a569(0x241)][_0x10a569(0x477)][_0x10a569(0x479)](_0x22ced9);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x343)]=function(_0x51c287){const _0x302427=_0x31613b;if(typeof _0x51c287!==_0x302427(0x217))_0x51c287=_0x51c287['id'];return this['_stateTurns'][_0x51c287]||0x0;},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x497)]=function(_0x4865ab,_0x157a2d){const _0x22d7f3=_0x31613b;if(typeof _0x4865ab!=='number')_0x4865ab=_0x4865ab['id'];if(this['isStateAffected'](_0x4865ab)){const _0x4cc9d0=DataManager[_0x22d7f3(0x495)](_0x4865ab);this[_0x22d7f3(0x3fe)][_0x4865ab]=_0x157a2d[_0x22d7f3(0x3f6)](0x0,_0x4cc9d0);if(this[_0x22d7f3(0x3fe)][_0x4865ab]<=0x0)this['removeState'](_0x4865ab);}},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x47a)]=function(_0x473e4f,_0x51b5b6){const _0x41d78d=_0x31613b;if(typeof _0x473e4f!==_0x41d78d(0x217))_0x473e4f=_0x473e4f['id'];if(this[_0x41d78d(0x1fc)](_0x473e4f)){if(_0x41d78d(0x46c)!==_0x41d78d(0x46c)){let _0x2aa25b=_0x268bc9[_0x41d78d(0x23c)][_0x41d78d(0x2b3)](_0x150ef7,_0x46f25a);return _0x2aa25b=_0x5022c1[_0x41d78d(0x179)](_0x24294c,_0x2aa25b,_0x597e1a),_0x58ddd6[_0x41d78d(0x2d7)][_0x41d78d(0x2b3)](_0x46927f,_0xf45e93,_0x2aa25b,_0x431e86);}else _0x51b5b6+=this['stateTurns'](_0x473e4f),this[_0x41d78d(0x497)](_0x473e4f,_0x51b5b6);}},VisuMZ[_0x31613b(0x469)][_0x31613b(0x2e8)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x409)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x409)]=function(_0x4a9281){const _0x14e0ad=_0x31613b,_0x21da49=this[_0x14e0ad(0x396)][_0x4a9281];VisuMZ[_0x14e0ad(0x469)][_0x14e0ad(0x2e8)][_0x14e0ad(0x2b3)](this,_0x4a9281);if(_0x21da49>0x0)this[_0x14e0ad(0x1a9)](_0x4a9281);if(_0x21da49<0x0)this[_0x14e0ad(0x3b2)](_0x4a9281);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x1b8)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x34a)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x34a)]=function(_0x402b07){const _0x2a1a95=_0x31613b;VisuMZ['SkillsStatesCore'][_0x2a1a95(0x1b8)]['call'](this,_0x402b07);if(!this['isBuffOrDebuffAffected'](_0x402b07))this[_0x2a1a95(0x409)](_0x402b07);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x220)]=Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x44f)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x44f)]=function(_0x18bbad){const _0x2374dc=_0x31613b;VisuMZ[_0x2374dc(0x469)][_0x2374dc(0x220)][_0x2374dc(0x2b3)](this,_0x18bbad);if(!this['isBuffOrDebuffAffected'](_0x18bbad))this[_0x2374dc(0x409)](_0x18bbad);},Game_BattlerBase['prototype']['onEraseBuff']=function(_0x4c1a7c){},Game_BattlerBase['prototype'][_0x31613b(0x3b2)]=function(_0x597430){},Game_BattlerBase['prototype'][_0x31613b(0x2ee)]=function(_0x2dd8dd){const _0x16dce5=_0x31613b;return this[_0x16dce5(0x396)][_0x2dd8dd]===VisuMZ['SkillsStatesCore'][_0x16dce5(0x32d)]['Buffs']['StackBuffMax'];},Game_BattlerBase['prototype']['isMaxDebuffAffected']=function(_0x5ccc08){const _0x34bc90=_0x31613b;return this['_buffs'][_0x5ccc08]===-VisuMZ['SkillsStatesCore'][_0x34bc90(0x32d)][_0x34bc90(0x21d)][_0x34bc90(0x245)];},VisuMZ[_0x31613b(0x469)]['Game_BattlerBase_buffIconIndex']=Game_BattlerBase[_0x31613b(0x24d)]['buffIconIndex'],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x168)]=function(_0x1c7c1f,_0x9bb2e0){const _0x442257=_0x31613b;return _0x1c7c1f=_0x1c7c1f[_0x442257(0x3f6)](-0x2,0x2),VisuMZ[_0x442257(0x469)][_0x442257(0x3c4)][_0x442257(0x2b3)](this,_0x1c7c1f,_0x9bb2e0);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x159)]=function(_0x25bfb0){const _0x39e831=_0x31613b,_0x5b969f=this[_0x39e831(0x396)][_0x25bfb0];return VisuMZ[_0x39e831(0x469)][_0x39e831(0x32d)]['Buffs'][_0x39e831(0x2a8)][_0x39e831(0x2b3)](this,_0x25bfb0,_0x5b969f);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x43e)]=function(_0x4850ff){const _0x1cfa19=_0x31613b;return this[_0x1cfa19(0x2da)][_0x4850ff]||0x0;},Game_BattlerBase['prototype']['debuffTurns']=function(_0x2a6b5c){const _0x22e186=_0x31613b;return this[_0x22e186(0x43e)](_0x2a6b5c);},Game_BattlerBase[_0x31613b(0x24d)]['setBuffTurns']=function(_0x54fbd8,_0x2aa315){const _0x13bdac=_0x31613b;if(this[_0x13bdac(0x281)](_0x54fbd8)){if('sSeIX'===_0x13bdac(0x43c)){const _0x487ced=VisuMZ['SkillsStatesCore'][_0x13bdac(0x32d)]['Buffs'][_0x13bdac(0x42d)];this['_buffTurns'][_0x54fbd8]=_0x2aa315[_0x13bdac(0x3f6)](0x0,_0x487ced);}else{const _0x4c3c72=this[_0x13bdac(0x3e3)](_0x409415),_0x11fc0d=this[_0x13bdac(0x303)](_0x1bfef1),_0x5b1f0a=this[_0x13bdac(0x465)](_0x11fc0d)[_0x13bdac(0x297)];this['changePaintOpacity'](this['isCommandEnabled'](_0x2ce6f7));const _0xf7b8b3=this[_0x13bdac(0x1c0)]();if(_0xf7b8b3==='right')this[_0x13bdac(0x15f)](_0x11fc0d,_0x4c3c72['x']+_0x4c3c72[_0x13bdac(0x297)]-_0x5b1f0a,_0x4c3c72['y'],_0x5b1f0a);else{if(_0xf7b8b3===_0x13bdac(0x20d)){const _0x471edd=_0x4c3c72['x']+_0x1f199b['floor']((_0x4c3c72[_0x13bdac(0x297)]-_0x5b1f0a)/0x2);this['drawTextEx'](_0x11fc0d,_0x471edd,_0x4c3c72['y'],_0x5b1f0a);}else this[_0x13bdac(0x15f)](_0x11fc0d,_0x4c3c72['x'],_0x4c3c72['y'],_0x5b1f0a);}}}},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x48c)]=function(_0x4b08c7,_0x3524f0){const _0x4d76f4=_0x31613b;this[_0x4d76f4(0x281)](_0x4b08c7)&&(_0x3524f0+=this['buffTurns'](stateId),this[_0x4d76f4(0x3da)](_0x4b08c7,_0x3524f0));},Game_BattlerBase['prototype'][_0x31613b(0x43f)]=function(_0x390bb9,_0x3224fa){const _0xf7584e=_0x31613b;if(this[_0xf7584e(0x408)](_0x390bb9)){if(_0xf7584e(0x2e0)==='YJLvI')return _0x5c343b['SkillsStatesCore'][_0xf7584e(0x32d)][_0xf7584e(0x156)][_0xf7584e(0x363)];else{const _0x36e5cd=VisuMZ[_0xf7584e(0x469)][_0xf7584e(0x32d)][_0xf7584e(0x21d)]['MaxTurns'];this[_0xf7584e(0x2da)][_0x390bb9]=_0x3224fa[_0xf7584e(0x3f6)](0x0,_0x36e5cd);}}},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x17b)]=function(_0x38a4b0,_0x3a797b){const _0x3e7154=_0x31613b;if(this[_0x3e7154(0x408)](_0x38a4b0)){if(_0x3e7154(0x1a0)==='uIMXN')_0x3a797b+=this[_0x3e7154(0x43e)](stateId),this[_0x3e7154(0x43f)](_0x38a4b0,_0x3a797b);else return _0x327c30;}},Game_BattlerBase['prototype'][_0x31613b(0x1aa)]=function(_0x54f4f1){const _0x47b05d=_0x31613b;if(typeof _0x54f4f1!==_0x47b05d(0x217))_0x54f4f1=_0x54f4f1['id'];return this[_0x47b05d(0x393)]=this[_0x47b05d(0x393)]||{},this[_0x47b05d(0x393)][_0x54f4f1]=this['_stateData'][_0x54f4f1]||{},this[_0x47b05d(0x393)][_0x54f4f1];},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x36d)]=function(_0x3b1556,_0x490094){const _0x9274a2=_0x31613b;if(typeof _0x3b1556!==_0x9274a2(0x217))_0x3b1556=_0x3b1556['id'];const _0x2f5153=this['stateData'](_0x3b1556);return _0x2f5153[_0x490094];},Game_BattlerBase[_0x31613b(0x24d)]['setStateData']=function(_0x57b448,_0x29a709,_0x4652cc){const _0x508b84=_0x31613b;if(typeof _0x57b448!==_0x508b84(0x217))_0x57b448=_0x57b448['id'];const _0x5d3233=this['stateData'](_0x57b448);_0x5d3233[_0x29a709]=_0x4652cc;},Game_BattlerBase[_0x31613b(0x24d)]['clearStateData']=function(_0x3f51a9){const _0x13f87c=_0x31613b;if(typeof _0x3f51a9!==_0x13f87c(0x217))_0x3f51a9=_0x3f51a9['id'];this['_stateData']=this[_0x13f87c(0x393)]||{},this[_0x13f87c(0x393)][_0x3f51a9]={};},Game_BattlerBase['prototype']['getStateDisplay']=function(_0x3fca49){const _0x12f7b1=_0x31613b;if(typeof _0x3fca49!=='number')_0x3fca49=_0x3fca49['id'];return this['_stateDisplay']=this[_0x12f7b1(0x27f)]||{},this['_stateDisplay'][_0x3fca49]===undefined&&(this[_0x12f7b1(0x27f)][_0x3fca49]=''),this['_stateDisplay'][_0x3fca49];},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x325)]=function(_0x23bec7,_0x190870){const _0x54a822=_0x31613b;if(typeof _0x23bec7!=='number')_0x23bec7=_0x23bec7['id'];this[_0x54a822(0x27f)]=this[_0x54a822(0x27f)]||{},this['_stateDisplay'][_0x23bec7]=_0x190870;},Game_BattlerBase['prototype'][_0x31613b(0x446)]=function(_0x24b79c){const _0x459af3=_0x31613b;if(typeof _0x24b79c!==_0x459af3(0x217))_0x24b79c=_0x24b79c['id'];this[_0x459af3(0x27f)]=this[_0x459af3(0x27f)]||{},this[_0x459af3(0x27f)][_0x24b79c]='';},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x237)]=function(_0x5cdce0){const _0x50683a=_0x31613b;if(typeof _0x5cdce0!==_0x50683a(0x217))_0x5cdce0=_0x5cdce0['id'];this['_stateOrigin']=this[_0x50683a(0x27e)]||{},this['_stateOrigin'][_0x5cdce0]=this[_0x50683a(0x27e)][_0x5cdce0]||_0x50683a(0x1f6);const _0x569cb9=this[_0x50683a(0x27e)][_0x5cdce0];return this[_0x50683a(0x289)](_0x569cb9);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x3c0)]=function(_0x4c89ff,_0x4df927){const _0x5d14f7=_0x31613b;this['_stateOrigin']=this[_0x5d14f7(0x27e)]||{};const _0x2573e0=_0x4df927?this[_0x5d14f7(0x1de)](_0x4df927):this[_0x5d14f7(0x271)]();this[_0x5d14f7(0x27e)][_0x4c89ff]=_0x2573e0;},Game_BattlerBase[_0x31613b(0x24d)]['clearStateOrigin']=function(_0x5385ae){const _0x341715=_0x31613b;this[_0x341715(0x27e)]=this[_0x341715(0x27e)]||{},delete this[_0x341715(0x27e)][_0x5385ae];},Game_BattlerBase['prototype']['clearAllStateOrigins']=function(){const _0x173e66=_0x31613b;this[_0x173e66(0x27e)]={};},Game_BattlerBase[_0x31613b(0x24d)]['getCurrentStateOriginKey']=function(){const _0x2b2b1e=_0x31613b,_0x4cd2f6=this['getCurrentStateActiveUser']();return this[_0x2b2b1e(0x1de)](_0x4cd2f6);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x45b)]=function(){const _0xc41e6b=_0x31613b;if($gameParty['inBattle']()){if('PWfWO'!==_0xc41e6b(0x194)){if(BattleManager['_subject']){if(_0xc41e6b(0x1d7)==='ZiDjf')return BattleManager['_subject'];else{_0x24ee01[_0xc41e6b(0x469)]['Game_BattlerBase_increaseBuff'][_0xc41e6b(0x2b3)](this,_0x2447d4);if(!this[_0xc41e6b(0x1b6)](_0x15391d))this[_0xc41e6b(0x409)](_0xe29b75);}}else{if(BattleManager[_0xc41e6b(0x471)]){if(_0xc41e6b(0x44d)==='sQYlm'){if(typeof _0x346e1d!==_0xc41e6b(0x217))_0x37e179=_0x4922d2['id'];this[_0xc41e6b(0x1fc)](_0x4e8cac)&&(_0x984fc2+=this[_0xc41e6b(0x343)](_0x272b34),this[_0xc41e6b(0x497)](_0x41f8f1,_0x1987e4));}else return BattleManager[_0xc41e6b(0x471)];}}}else{if(_0x763174)_0x310390[_0xc41e6b(0x190)]();}}else{const _0x2c683e=SceneManager[_0xc41e6b(0x300)];if(![Scene_Map,Scene_Item]['includes'](_0x2c683e[_0xc41e6b(0x163)]))return $gameParty['menuActor']();}return this;},Game_BattlerBase['prototype'][_0x31613b(0x1de)]=function(_0x55dcca){const _0xc01bb8=_0x31613b;if(!_0x55dcca)return _0xc01bb8(0x1f6);if(_0x55dcca[_0xc01bb8(0x1bd)]())return'<actor-%1>'[_0xc01bb8(0x26b)](_0x55dcca[_0xc01bb8(0x262)]());else{const _0x11bd2d=_0xc01bb8(0x470)[_0xc01bb8(0x26b)](_0x55dcca[_0xc01bb8(0x418)]()),_0x29e1db=_0xc01bb8(0x1d5)[_0xc01bb8(0x26b)](_0x55dcca[_0xc01bb8(0x167)]()),_0x4a2f77='<troop-%1>'['format']($gameTroop[_0xc01bb8(0x2fb)]());return _0xc01bb8(0x2fe)[_0xc01bb8(0x26b)](_0x11bd2d,_0x29e1db,_0x4a2f77);}return'user';},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x289)]=function(_0x25aa28){const _0x5d5b46=_0x31613b;if(_0x25aa28===_0x5d5b46(0x1f6)){if(_0x5d5b46(0x314)===_0x5d5b46(0x37b)){if(typeof _0x4251c9==='number')_0x26eb31=_0x18eb03[_0x23bc2d];return this['states']()[_0x5d5b46(0x1f5)](_0x32e235);}else return this;}else{if(_0x25aa28[_0x5d5b46(0x20e)](/<actor-(\d+)>/i)){if(_0x5d5b46(0x2d0)!==_0x5d5b46(0x3fc))return $gameActors['actor'](Number(RegExp['$1']));else _0xd790d7['push'](_0x3ebdcb(_0x186fd5));}else{if($gameParty['inBattle']()&&_0x25aa28[_0x5d5b46(0x20e)](/<troop-(\d+)>/i)){const _0x43e42d=Number(RegExp['$1']);if(_0x43e42d===$gameTroop[_0x5d5b46(0x2fb)]()){if(_0x5d5b46(0x3e1)===_0x5d5b46(0x3e1)){if(_0x25aa28[_0x5d5b46(0x20e)](/<member-(\d+)>/i)){if(_0x5d5b46(0x37f)==='joKRJ')this[_0x5d5b46(0x41a)](_0x2385aa['normalColor']()),this[_0x5d5b46(0x214)](_0x4710a4[_0x5d5b46(0x165)]());else return $gameTroop['members']()[Number(RegExp['$1'])];}}else this[_0x5d5b46(0x3fe)][_0x5c11df]--;}}if(_0x25aa28[_0x5d5b46(0x20e)](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore'][_0x31613b(0x1ee)]=Game_Battler[_0x31613b(0x24d)][_0x31613b(0x1b7)],Game_Battler[_0x31613b(0x24d)][_0x31613b(0x1b7)]=function(_0x1bf3ae){const _0x57bde5=_0x31613b,_0x498a3a=this[_0x57bde5(0x3d4)](_0x1bf3ae);VisuMZ[_0x57bde5(0x469)][_0x57bde5(0x1ee)][_0x57bde5(0x2b3)](this,_0x1bf3ae);if(_0x498a3a&&this[_0x57bde5(0x162)]($dataStates[_0x1bf3ae])){if(_0x57bde5(0x17d)===_0x57bde5(0x17d)){this[_0x57bde5(0x1c4)](_0x1bf3ae);;}else _0x83cbfd[_0x57bde5(0x1d3)]=_0x25983a(_0x28d889['$1']);}},VisuMZ[_0x31613b(0x469)][_0x31613b(0x316)]=Game_Battler[_0x31613b(0x24d)]['isStateAddable'],Game_Battler[_0x31613b(0x24d)]['isStateAddable']=function(_0x4e4d96){const _0xd6f3d9=_0x31613b,_0x598a5f=$dataStates[_0x4e4d96];if(_0x598a5f&&_0x598a5f[_0xd6f3d9(0x204)][_0xd6f3d9(0x20e)](/<NO DEATH CLEAR>/i)){if('rXysw'===_0xd6f3d9(0x3c3))return!this['isStateResist'](_0x4e4d96)&&!this[_0xd6f3d9(0x261)](_0x4e4d96)&&!this['_result']['isStateRemoved'](_0x4e4d96);else{if(_0x3b7eab[_0xd6f3d9(0x3d7)](_0x207a3b))return![];}}return VisuMZ[_0xd6f3d9(0x469)][_0xd6f3d9(0x316)][_0xd6f3d9(0x2b3)](this,_0x4e4d96);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x1c4)]=function(_0x3e1693){const _0x5855dd=_0x31613b;this[_0x5855dd(0x3c0)](_0x3e1693),this['removeOtherStatesOfSameCategory'](_0x3e1693),this[_0x5855dd(0x3df)](_0x3e1693),this['onAddStateCustomJS'](_0x3e1693),this[_0x5855dd(0x3c2)](_0x3e1693);},Game_Battler['prototype'][_0x31613b(0x15e)]=function(_0x189105){const _0x276f2f=_0x31613b;this[_0x276f2f(0x373)](_0x189105),this[_0x276f2f(0x4ad)](_0x189105),Game_BattlerBase[_0x276f2f(0x24d)][_0x276f2f(0x15e)][_0x276f2f(0x2b3)](this,_0x189105);},Game_Battler[_0x31613b(0x24d)]['removeStatesAuto']=function(_0x150414){const _0x1798c2=_0x31613b;for(const _0x35eac4 of this[_0x1798c2(0x3a9)]()){if('piDZv'!=='piDZv'){const _0x1feb3b=_0x231718[_0x1798c2(0x3c8)]('['+_0x5e801d['$1'][_0x1798c2(0x20e)](/\d+/g)+']');for(const _0x606c42 of _0x1feb3b){if(!_0x363727['value'](_0x606c42))return![];}return!![];}else this[_0x1798c2(0x426)](_0x35eac4['id'])&&_0x35eac4['autoRemovalTiming']===_0x150414&&(this['removeState'](_0x35eac4['id']),this[_0x1798c2(0x183)](_0x35eac4['id']),this[_0x1798c2(0x350)](_0x35eac4['id']));}},Game_Battler['prototype'][_0x31613b(0x183)]=function(_0x5f4fbb){const _0x49bb3f=_0x31613b;this[_0x49bb3f(0x416)](_0x5f4fbb);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x3ca)]=function(_0x6ce9f8){const _0xe32de=_0x31613b;if(this['_tempActor']||this['_tempBattler'])return;const _0x21ba21=VisuMZ[_0xe32de(0x469)][_0xe32de(0x33a)];if(_0x21ba21[_0x6ce9f8])_0x21ba21[_0x6ce9f8][_0xe32de(0x2b3)](this,_0x6ce9f8);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x373)]=function(_0x38d26a){const _0x304ccf=_0x31613b;if(this['_tempActor']||this[_0x304ccf(0x3c1)])return;const _0x4df88c=VisuMZ[_0x304ccf(0x469)]['stateEraseJS'];if(_0x4df88c[_0x38d26a])_0x4df88c[_0x38d26a][_0x304ccf(0x2b3)](this,_0x38d26a);},Game_Battler[_0x31613b(0x24d)]['onExpireStateCustomJS']=function(_0x4bed12){const _0x3b37ea=_0x31613b;if(this['_tempActor']||this[_0x3b37ea(0x3c1)])return;const _0x70cd59=VisuMZ[_0x3b37ea(0x469)][_0x3b37ea(0x291)];if(_0x70cd59[_0x4bed12])_0x70cd59[_0x4bed12][_0x3b37ea(0x2b3)](this,_0x4bed12);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x3c2)]=function(_0x1c5c0c){const _0x228bf4=_0x31613b;if(this['_tempActor']||this[_0x228bf4(0x3c1)])return;try{VisuMZ['SkillsStatesCore'][_0x228bf4(0x32d)][_0x228bf4(0x247)][_0x228bf4(0x414)][_0x228bf4(0x2b3)](this,_0x1c5c0c);}catch(_0x58dae9){if('RCuZD'===_0x228bf4(0x2ca)){if($gameTemp[_0x228bf4(0x43a)]())console['log'](_0x58dae9);}else _0x371044[_0x228bf4(0x469)][_0x228bf4(0x1ed)][_0x228bf4(0x2b3)](this,_0x5defd0),this['applySkillsStatesCoreEffects'](_0x18fb67);}},Game_Battler['prototype'][_0x31613b(0x4ad)]=function(_0x505ffe){const _0x82213e=_0x31613b;if(this[_0x82213e(0x404)]||this[_0x82213e(0x3c1)])return;try{VisuMZ[_0x82213e(0x469)][_0x82213e(0x32d)][_0x82213e(0x247)][_0x82213e(0x349)][_0x82213e(0x2b3)](this,_0x505ffe);}catch(_0x439332){if('NwAva'!==_0x82213e(0x2e9)){if($gameTemp[_0x82213e(0x43a)]())console[_0x82213e(0x3e0)](_0x439332);}else{if(!_0x1cd25d['isGroupDefeatStateAffected']())return![];}}},Game_Battler['prototype'][_0x31613b(0x350)]=function(_0x3fd438){const _0x1fde10=_0x31613b;if(this[_0x1fde10(0x404)]||this['_tempBattler'])return;try{VisuMZ[_0x1fde10(0x469)][_0x1fde10(0x32d)]['States'][_0x1fde10(0x4a7)][_0x1fde10(0x2b3)](this,_0x3fd438);}catch(_0x51e176){if($gameTemp[_0x1fde10(0x43a)]())console[_0x1fde10(0x3e0)](_0x51e176);}},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x424)]=function(_0x2ede7d){const _0x2fcfff=_0x31613b;return _0x2ede7d=_0x2ede7d[_0x2fcfff(0x301)]()[_0x2fcfff(0x17c)](),this[_0x2fcfff(0x3a9)]()[_0x2fcfff(0x2ff)](_0x1ae872=>_0x1ae872[_0x2fcfff(0x250)][_0x2fcfff(0x1f5)](_0x2ede7d));},Game_Battler['prototype'][_0x31613b(0x16b)]=function(_0x529b1c,_0x57b830){const _0x496c37=_0x31613b;_0x529b1c=_0x529b1c[_0x496c37(0x301)]()[_0x496c37(0x17c)](),_0x57b830=_0x57b830||0x0;const _0x53bb4e=this[_0x496c37(0x424)](_0x529b1c),_0x345c2d=[];for(const _0x2b614d of _0x53bb4e){if(!_0x2b614d)continue;if(_0x57b830<=0x0)break;_0x345c2d[_0x496c37(0x49d)](_0x2b614d['id']),this[_0x496c37(0x467)][_0x496c37(0x25c)]=!![],_0x57b830--;}while(_0x345c2d[_0x496c37(0x278)]>0x0){this[_0x496c37(0x260)](_0x345c2d[_0x496c37(0x285)]());}},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x4a4)]=function(_0x12192a,_0x178273){const _0xa78c7a=_0x31613b;_0x12192a=_0x12192a[_0xa78c7a(0x301)]()['trim'](),_0x178273=_0x178273||[];const _0x4bfce2=this[_0xa78c7a(0x424)](_0x12192a),_0x490698=[];for(const _0x3913f6 of _0x4bfce2){if(_0xa78c7a(0x47e)===_0xa78c7a(0x41c))return _0x36fbb3(_0xcf110c['$1']);else{if(!_0x3913f6)continue;if(_0x178273[_0xa78c7a(0x1f5)](_0x3913f6))continue;_0x490698[_0xa78c7a(0x49d)](_0x3913f6['id']),this[_0xa78c7a(0x467)][_0xa78c7a(0x25c)]=!![];}}while(_0x490698[_0xa78c7a(0x278)]>0x0){'DJKes'!==_0xa78c7a(0x47d)?(this[_0xa78c7a(0x274)]=!![],this[_0xa78c7a(0x241)][_0xa78c7a(0x477)]=[],this[_0xa78c7a(0x39f)](),this[_0xa78c7a(0x422)](),this['addPassiveStatesByPluginParameters'](),this[_0xa78c7a(0x241)]['passiveStates']=this[_0xa78c7a(0x241)][_0xa78c7a(0x477)]['sort']((_0x64e54c,_0x188fb6)=>_0x64e54c-_0x188fb6),this['_checkingVisuMzPassiveStateObjects']=_0x4c3fdb):this[_0xa78c7a(0x260)](_0x490698[_0xa78c7a(0x285)]());}},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x36f)]=function(_0x377a0a){const _0x579dcc=_0x31613b;return this[_0x579dcc(0x2d6)](_0x377a0a)>0x0;},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x20a)]=function(_0x3c8cfc){const _0x4450a0=_0x31613b;return this[_0x4450a0(0x341)](_0x3c8cfc)>0x0;},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x2d6)]=function(_0x33d314){const _0x55a666=_0x31613b,_0x423af2=this[_0x55a666(0x424)](_0x33d314)[_0x55a666(0x2ff)](_0x40a01a=>this[_0x55a666(0x1fc)](_0x40a01a['id']));return _0x423af2[_0x55a666(0x278)];},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x341)]=function(_0x36083a){const _0x43176f=_0x31613b,_0xf6a04d=this[_0x43176f(0x424)](_0x36083a);return _0xf6a04d[_0x43176f(0x278)];},VisuMZ[_0x31613b(0x469)]['Game_BattlerBase_isStateResist']=Game_BattlerBase['prototype'][_0x31613b(0x436)],Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x436)]=function(_0x48fa4d){const _0x48831a=_0x31613b,_0x368988=$dataStates[_0x48fa4d];if(_0x368988&&_0x368988[_0x48831a(0x250)][_0x48831a(0x278)]>0x0)for(const _0xabcb76 of _0x368988[_0x48831a(0x250)]){if('ulVQB'==='ulVQB'){if(this[_0x48831a(0x4a0)](_0xabcb76))return!![];}else return this[_0x48831a(0x41e)]&&this[_0x48831a(0x41e)][_0x48831a(0x279)]?_0x3c58d9[_0x48831a(0x282)]:'';}return VisuMZ[_0x48831a(0x469)][_0x48831a(0x451)]['call'](this,_0x48fa4d);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x4a0)]=function(_0xfa1358){const _0x3ebf2d=_0x31613b;let _0x21bddb=_0x3ebf2d(0x36b);if(this[_0x3ebf2d(0x2b1)](_0x21bddb))return this['_cache'][_0x21bddb][_0x3ebf2d(0x1f5)](_0xfa1358);return this[_0x3ebf2d(0x241)][_0x21bddb]=this[_0x3ebf2d(0x400)](),this[_0x3ebf2d(0x241)][_0x21bddb][_0x3ebf2d(0x1f5)](_0xfa1358);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x400)]=function(){const _0x57cc1e=_0x31613b,_0x4114b9=/<RESIST STATE (?:CATEGORY|CATEGORIES):[ ](.*)>/gi,_0x255975=/<RESIST STATE (?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/RESIST STATE (?:CATEGORY|CATEGORIES)>/i;let _0x16bb9e=[];for(const _0x298525 of this['traitObjects']()){if(_0x57cc1e(0x234)!=='tyqPB'){if(!_0x298525)continue;const _0xf00770=_0x298525['note'],_0x5a18fa=_0xf00770['match'](_0x4114b9);if(_0x5a18fa){if(_0x57cc1e(0x45c)!==_0x57cc1e(0x45c)){const _0xf6d2cb=_0x1a448e[_0x57cc1e(0x469)],_0x5423c6=['stateHpSlipDamageJS','stateHpSlipHealJS',_0x57cc1e(0x1a4),_0x57cc1e(0x28b),_0x57cc1e(0x239),_0x57cc1e(0x1f2)];for(const _0x456a97 of _0x5423c6){_0xf6d2cb[_0x456a97][_0x253079]&&_0xf6d2cb[_0x456a97][_0xb05879]['call'](this,_0xad5ce4);}}else for(const _0x2e0153 of _0x5a18fa){if(_0x57cc1e(0x492)!=='NEhDG'){if(!this[_0x57cc1e(0x1a7)](_0x44ef45))return![];return!![];}else{_0x2e0153[_0x57cc1e(0x20e)](_0x4114b9);const _0x5c495f=String(RegExp['$1'])[_0x57cc1e(0x417)](',')[_0x57cc1e(0x27d)](_0x214ddc=>String(_0x214ddc)[_0x57cc1e(0x301)]()[_0x57cc1e(0x17c)]());_0x16bb9e=_0x16bb9e['concat'](_0x5c495f);}}}if(_0xf00770[_0x57cc1e(0x20e)](_0x255975)){const _0xa40b6a=String(RegExp['$1'])[_0x57cc1e(0x417)](/[\r\n]+/)['map'](_0x3b675e=>String(_0x3b675e)['toUpperCase']()[_0x57cc1e(0x17c)]());_0x16bb9e=_0x16bb9e[_0x57cc1e(0x479)](_0xa40b6a);}}else{const _0x4026d1='<enemy-%1>'['format'](_0x30ac79[_0x57cc1e(0x418)]()),_0x4e622a=_0x57cc1e(0x1d5)[_0x57cc1e(0x26b)](_0x20822a['index']()),_0x4ba6f8=_0x57cc1e(0x48e)[_0x57cc1e(0x26b)](_0x47089f[_0x57cc1e(0x2fb)]());return _0x57cc1e(0x2fe)['format'](_0x4026d1,_0x4e622a,_0x4ba6f8);}}return _0x16bb9e;},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x16d)]=function(_0x29af6e){const _0x31963b=_0x31613b,_0x2bd81f=$dataStates[_0x29af6e];if(!_0x2bd81f)return;const _0x3d453d=_0x2bd81f[_0x31963b(0x204)]||'',_0x22a003=_0x3d453d['match'](/<REMOVE OTHER (.*) STATES>/gi);if(_0x22a003){if(_0x31963b(0x49c)===_0x31963b(0x18e))return this[_0x31963b(0x2da)][_0x5a948a]||0x0;else{const _0x194b84=[_0x2bd81f];for(const _0x22c30c of _0x22a003){if(_0x31963b(0x1be)===_0x31963b(0x1be)){_0x22c30c[_0x31963b(0x20e)](/<REMOVE OTHER (.*) STATES>/i);const _0x52a21d=String(RegExp['$1']);this[_0x31963b(0x4a4)](_0x52a21d,_0x194b84);}else{const _0x19d2ae=_0xfbc35b[_0x31963b(0x3c8)]('['+_0x5a84d3['$1']['match'](/\d+/g)+']');for(const _0x3b9e7f of _0x19d2ae){if(_0x5f0f9f[_0x31963b(0x3d7)](_0x3b9e7f))return!![];}return![];}}}}},VisuMZ['SkillsStatesCore'][_0x31613b(0x37c)]=Game_Battler[_0x31613b(0x24d)][_0x31613b(0x355)],Game_Battler[_0x31613b(0x24d)]['addBuff']=function(_0x5d049c,_0x4039e3){const _0x126d06=_0x31613b;VisuMZ[_0x126d06(0x469)]['Game_Battler_addBuff'][_0x126d06(0x2b3)](this,_0x5d049c,_0x4039e3),this[_0x126d06(0x281)](_0x5d049c)&&this[_0x126d06(0x2f7)](_0x5d049c,_0x4039e3);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x3cf)]=function(_0x47f7f3){},VisuMZ[_0x31613b(0x469)][_0x31613b(0x32c)]=Game_Battler['prototype'][_0x31613b(0x246)],Game_Battler[_0x31613b(0x24d)][_0x31613b(0x246)]=function(_0x420f7a,_0x13a5c1){const _0x58e4fa=_0x31613b;VisuMZ[_0x58e4fa(0x469)][_0x58e4fa(0x32c)][_0x58e4fa(0x2b3)](this,_0x420f7a,_0x13a5c1),this[_0x58e4fa(0x408)](_0x420f7a)&&(_0x58e4fa(0x1c1)!==_0x58e4fa(0x1e3)?this[_0x58e4fa(0x35d)](_0x420f7a,_0x13a5c1):this['gainSilentTp'](_0x337fa0));},Game_Battler[_0x31613b(0x24d)]['removeBuffsAuto']=function(){const _0x3b24c0=_0x31613b;for(let _0x3ab3ba=0x0;_0x3ab3ba<this[_0x3b24c0(0x1e9)]();_0x3ab3ba++){if('rHpWR'===_0x3b24c0(0x3fa)){const _0x3676d3=_0x52b84f(_0x1ddf47['$1']),_0x9b31c7=_0x3aa6e7['format'](_0x3676d3,_0x3b24c0(0x310),-0x1,_0x3b24c0(0x2f1));_0x58d18f[_0x3b24c0(0x469)][_0x3b24c0(0x30a)][_0x1443ba['id']]=new _0x3dd587(_0x3b24c0(0x3dd),_0x9b31c7);}else{if(this[_0x3b24c0(0x459)](_0x3ab3ba)){if(_0x3b24c0(0x2b9)===_0x3b24c0(0x2b9)){const _0x199afa=this[_0x3b24c0(0x396)][_0x3ab3ba];this[_0x3b24c0(0x169)](_0x3ab3ba);if(_0x199afa>0x0)this[_0x3b24c0(0x15d)](_0x3ab3ba);if(_0x199afa<0x0)this[_0x3b24c0(0x3e9)](_0x3ab3ba);}else{const _0x11fe36=_0x411ad1[_0xcb4b51];if(_0x11fe36&&_0x11fe36[_0x3b24c0(0x204)][_0x3b24c0(0x20e)](/<NO DEATH CLEAR>/i))return!this[_0x3b24c0(0x436)](_0x517465)&&!this['isStateRestrict'](_0x24a09c)&&!this[_0x3b24c0(0x467)][_0x3b24c0(0x3ad)](_0xdda431);return _0x5a1d2d['SkillsStatesCore'][_0x3b24c0(0x316)][_0x3b24c0(0x2b3)](this,_0x5913c1);}}}}},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x2f7)]=function(_0x236953,_0x459f2e){this['onAddBuffGlobalJS'](_0x236953,_0x459f2e);},Game_Battler['prototype'][_0x31613b(0x35d)]=function(_0x46de79,_0x15331b){this['onAddDebuffGlobalJS'](_0x46de79,_0x15331b);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x1a9)]=function(_0x49a041){const _0x4409fa=_0x31613b;Game_BattlerBase[_0x4409fa(0x24d)][_0x4409fa(0x1a9)][_0x4409fa(0x2b3)](this,_0x49a041),this[_0x4409fa(0x21b)](_0x49a041);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x3b2)]=function(_0x458ae5){const _0xc3d4ab=_0x31613b;Game_BattlerBase[_0xc3d4ab(0x24d)]['onEraseDebuff'][_0xc3d4ab(0x2b3)](this,_0x458ae5),this['onEraseDebuffGlobalJS'](_0x458ae5);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x15d)]=function(_0x5a4453){this['onExpireBuffGlobalJS'](_0x5a4453);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x3e9)]=function(_0x108db6){const _0x265da1=_0x31613b;this[_0x265da1(0x43d)](_0x108db6);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x20b)]=function(_0x290644,_0x2fe039){const _0x58af29=_0x31613b;VisuMZ[_0x58af29(0x469)][_0x58af29(0x32d)][_0x58af29(0x21d)][_0x58af29(0x270)][_0x58af29(0x2b3)](this,_0x290644,_0x2fe039);},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x2b8)]=function(_0x4cf068,_0x4cf3e5){const _0x4f9b38=_0x31613b;VisuMZ[_0x4f9b38(0x469)][_0x4f9b38(0x32d)]['Buffs'][_0x4f9b38(0x26f)][_0x4f9b38(0x2b3)](this,_0x4cf068,_0x4cf3e5);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x21b)]=function(_0xe7a01e){const _0x35e08d=_0x31613b;VisuMZ[_0x35e08d(0x469)]['Settings'][_0x35e08d(0x21d)][_0x35e08d(0x480)][_0x35e08d(0x2b3)](this,_0xe7a01e);},Game_BattlerBase[_0x31613b(0x24d)][_0x31613b(0x466)]=function(_0x52ecb3){const _0x11eaa9=_0x31613b;VisuMZ['SkillsStatesCore'][_0x11eaa9(0x32d)][_0x11eaa9(0x21d)]['onEraseDebuffJS'][_0x11eaa9(0x2b3)](this,_0x52ecb3);},Game_Battler['prototype'][_0x31613b(0x45e)]=function(_0x593d15){const _0x3e6d7a=_0x31613b;VisuMZ[_0x3e6d7a(0x469)][_0x3e6d7a(0x32d)]['Buffs'][_0x3e6d7a(0x251)][_0x3e6d7a(0x2b3)](this,_0x593d15);},Game_Battler[_0x31613b(0x24d)]['onExpireDebuffGlobalJS']=function(_0x5b7f89){const _0x4324dc=_0x31613b;VisuMZ['SkillsStatesCore'][_0x4324dc(0x32d)][_0x4324dc(0x21d)]['onExpireDebuffJS'][_0x4324dc(0x2b3)](this,_0x5b7f89);},Game_Battler['prototype'][_0x31613b(0x3df)]=function(_0x52054a){const _0x1c1d8d=_0x31613b,_0x1f5162=VisuMZ[_0x1c1d8d(0x469)],_0x46ad2f=[_0x1c1d8d(0x30a),'stateHpSlipHealJS',_0x1c1d8d(0x1a4),_0x1c1d8d(0x28b),'stateTpSlipDamageJS',_0x1c1d8d(0x1f2)];for(const _0x40b953 of _0x46ad2f){if(_0x1c1d8d(0x3d3)==='ziuoi')_0x1f5162[_0x40b953][_0x52054a]&&_0x1f5162[_0x40b953][_0x52054a][_0x1c1d8d(0x2b3)](this,_0x52054a);else{if(_0x7e6fed[_0x1c1d8d(0x3d7)](_0x497a1d))return!![];}}},VisuMZ[_0x31613b(0x469)][_0x31613b(0x189)]=Game_Battler[_0x31613b(0x24d)][_0x31613b(0x32b)],Game_Battler[_0x31613b(0x24d)][_0x31613b(0x32b)]=function(){const _0x30e404=_0x31613b;this[_0x30e404(0x34d)](),VisuMZ[_0x30e404(0x469)]['Game_Battler_regenerateAll'][_0x30e404(0x2b3)](this),this[_0x30e404(0x252)](),this[_0x30e404(0x407)]();},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x252)]=function(){const _0x53830b=_0x31613b;for(const _0x49e16f of this[_0x53830b(0x477)]()){if(!_0x49e16f)continue;this['onAddStateMakeCustomSlipValues'](_0x49e16f['id']);}},Game_Battler[_0x31613b(0x24d)][_0x31613b(0x34d)]=function(){const _0x3ee055=_0x31613b;for(const _0x16ed13 of this[_0x3ee055(0x3a9)]()){if(_0x3ee055(0x353)==='chPlt'){if(!_0x16ed13)continue;_0x16ed13['note']['match'](/<JS SLIP REFRESH>/i)&&this[_0x3ee055(0x3df)](_0x16ed13['id']);}else{_0x5165bd[_0x3ee055(0x20e)](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x134415=_0x455893[_0x3ee055(0x25f)](_0x498051(_0xc60f0f['$1'])[_0x3ee055(0x301)]()),_0xb53160=_0x2f1e9e(_0x58408c['$2']);_0x134415>=0x0&&(_0x16b891['addBuffTurns'](_0x134415,_0xb53160),this[_0x3ee055(0x3d1)](_0x1dd905));}}},Game_Battler[_0x31613b(0x24d)]['regenerateAllSkillsStatesCore']=function(){const _0xaf49fa=_0x31613b;if(!this[_0xaf49fa(0x38f)]())return;const _0x620f3e=this[_0xaf49fa(0x3a9)]();for(const _0x290706 of _0x620f3e){if(!_0x290706)continue;this[_0xaf49fa(0x292)](_0x290706);}},Game_Battler['prototype'][_0x31613b(0x292)]=function(_0x830879){const _0x5990f4=_0x31613b,_0x1ba08e=this[_0x5990f4(0x36d)](_0x830879['id'],'slipHp')||0x0,_0x26d4da=-this[_0x5990f4(0x200)](),_0x304bc3=Math[_0x5990f4(0x2ba)](_0x1ba08e,_0x26d4da);if(_0x304bc3!==0x0){const _0x286a52=this[_0x5990f4(0x467)][_0x5990f4(0x380)]||0x0;this[_0x5990f4(0x31b)](_0x304bc3),this['_result'][_0x5990f4(0x380)]+=_0x286a52;}const _0x298fd3=this['getStateData'](_0x830879['id'],_0x5990f4(0x336))||0x0;if(_0x298fd3!==0x0){const _0x368171=this[_0x5990f4(0x467)][_0x5990f4(0x430)]||0x0;this['gainMp'](_0x298fd3),this[_0x5990f4(0x467)]['mpDamage']+=_0x368171;}const _0x172a77=this[_0x5990f4(0x36d)](_0x830879['id'],_0x5990f4(0x2dd))||0x0;if(_0x172a77!==0x0){if('EHKmR'!=='ZWYYQ')this['gainSilentTp'](_0x172a77);else return this[_0x5990f4(0x394)]=this['_currentTroopUniqueID']||_0x26a794[_0x5990f4(0x203)],this[_0x5990f4(0x394)];}},VisuMZ[_0x31613b(0x469)][_0x31613b(0x25d)]=Game_Actor['prototype']['skillTypes'],Game_Actor['prototype'][_0x31613b(0x397)]=function(){const _0x30f517=_0x31613b,_0x6a4084=VisuMZ['SkillsStatesCore'][_0x30f517(0x25d)][_0x30f517(0x2b3)](this),_0x51051=VisuMZ['SkillsStatesCore'][_0x30f517(0x32d)][_0x30f517(0x156)];let _0xd4cb71=_0x51051[_0x30f517(0x1d9)];if($gameParty[_0x30f517(0x1ba)]()){if(_0x30f517(0x37d)!=='MUemp'){const _0x38478=this[_0x30f517(0x395)](_0x480022,_0x5801f5),_0x5c589d=this[_0x30f517(0x465)](_0x38478,_0x2da886,_0x324d57,_0x43feea),_0x3219d2=_0x54fcdb+_0x5be882-_0x5c589d[_0x30f517(0x297)];this[_0x30f517(0x15f)](_0x38478,_0x3219d2,_0x31fddf,_0x195961),this[_0x30f517(0x1b0)]();}else _0xd4cb71=_0xd4cb71[_0x30f517(0x479)](_0x51051[_0x30f517(0x296)]);}return _0x6a4084[_0x30f517(0x2ff)](_0x5432d2=>!_0xd4cb71[_0x30f517(0x1f5)](_0x5432d2));},Game_Actor[_0x31613b(0x24d)][_0x31613b(0x256)]=function(){const _0x36d742=_0x31613b;return this[_0x36d742(0x2a2)]()[_0x36d742(0x2ff)](_0x4c34e5=>this[_0x36d742(0x490)](_0x4c34e5));},Game_Actor[_0x31613b(0x24d)][_0x31613b(0x490)]=function(_0xca978e){const _0x1c8a4b=_0x31613b;if(!this[_0x1c8a4b(0x2a9)](_0xca978e))return![];if(!_0xca978e)return![];if(!this['isSkillTypeMatchForUse'](_0xca978e))return![];if(this[_0x1c8a4b(0x3db)](_0xca978e))return![];return!![];},Game_Actor[_0x31613b(0x24d)][_0x31613b(0x15c)]=function(_0x34ac0b){const _0xbb9088=_0x31613b,_0x48c8a3=this[_0xbb9088(0x397)](),_0x452b32=DataManager['getSkillTypes'](_0x34ac0b),_0xcc2c3d=_0x48c8a3[_0xbb9088(0x2ff)](_0x261808=>_0x452b32[_0xbb9088(0x1f5)](_0x261808));return _0xcc2c3d[_0xbb9088(0x278)]>0x0;},Game_Actor[_0x31613b(0x24d)][_0x31613b(0x3db)]=function(_0x1ab083){const _0x4c094c=_0x31613b;if(!VisuMZ[_0x4c094c(0x469)][_0x4c094c(0x2b2)](this,_0x1ab083))return!![];if(!VisuMZ[_0x4c094c(0x469)][_0x4c094c(0x3bd)](this,_0x1ab083))return!![];if(!VisuMZ[_0x4c094c(0x469)][_0x4c094c(0x1d2)](this,_0x1ab083))return!![];return![];},Game_Actor[_0x31613b(0x24d)]['passiveStateObjects']=function(){const _0x1bb99d=_0x31613b;let _0x153100=[this[_0x1bb99d(0x1bb)](),this[_0x1bb99d(0x385)]()];_0x153100=_0x153100[_0x1bb99d(0x479)](this[_0x1bb99d(0x242)]()[_0x1bb99d(0x2ff)](_0x45c169=>_0x45c169));for(const _0x5c0a93 of this[_0x1bb99d(0x2eb)]){if(_0x1bb99d(0x3c7)===_0x1bb99d(0x1db)){if(!_0x170a66[_0x1bb99d(0x2cc)](_0x29434e))return![];}else{const _0x557cab=$dataSkills[_0x5c0a93];if(_0x557cab)_0x153100[_0x1bb99d(0x49d)](_0x557cab);}}return _0x153100;},Game_Actor[_0x31613b(0x24d)][_0x31613b(0x453)]=function(){const _0x4357d0=_0x31613b;Game_Battler[_0x4357d0(0x24d)][_0x4357d0(0x453)]['call'](this);const _0x171626=VisuMZ['SkillsStatesCore']['Settings']['PassiveStates'][_0x4357d0(0x30d)];this['_cache']['passiveStates']=this['_cache'][_0x4357d0(0x477)][_0x4357d0(0x479)](_0x171626);},VisuMZ[_0x31613b(0x469)]['Game_Actor_learnSkill']=Game_Actor[_0x31613b(0x24d)]['learnSkill'],Game_Actor['prototype'][_0x31613b(0x376)]=function(_0x11cb3b){const _0x5713fa=_0x31613b;VisuMZ[_0x5713fa(0x469)][_0x5713fa(0x287)][_0x5713fa(0x2b3)](this,_0x11cb3b),this['_cache']={},this[_0x5713fa(0x477)]();},VisuMZ['SkillsStatesCore'][_0x31613b(0x1ec)]=Game_Actor['prototype'][_0x31613b(0x205)],Game_Actor[_0x31613b(0x24d)][_0x31613b(0x205)]=function(_0x747c93){const _0x4545a8=_0x31613b;VisuMZ['SkillsStatesCore'][_0x4545a8(0x1ec)][_0x4545a8(0x2b3)](this,_0x747c93),this['_cache']={},this[_0x4545a8(0x477)]();},Game_Actor[_0x31613b(0x24d)][_0x31613b(0x3e2)]=function(){const _0x188cb0=_0x31613b;return VisuMZ[_0x188cb0(0x469)][_0x188cb0(0x32d)]['States'][_0x188cb0(0x29e)]??0x14;},Game_Enemy[_0x31613b(0x24d)][_0x31613b(0x22c)]=function(){const _0x8b625b=_0x31613b;let _0x113e7d=[this[_0x8b625b(0x390)]()];return _0x113e7d[_0x8b625b(0x479)](this[_0x8b625b(0x2a2)]());},Game_Enemy[_0x31613b(0x24d)][_0x31613b(0x453)]=function(){const _0x57ae97=_0x31613b;Game_Battler[_0x57ae97(0x24d)][_0x57ae97(0x453)]['call'](this);const _0x30669b=VisuMZ['SkillsStatesCore']['Settings']['PassiveStates'][_0x57ae97(0x259)];this['_cache']['passiveStates']=this[_0x57ae97(0x241)]['passiveStates'][_0x57ae97(0x479)](_0x30669b);},Game_Enemy[_0x31613b(0x24d)][_0x31613b(0x2a2)]=function(){const _0x2e5ebd=_0x31613b,_0x5e9cdf=[];for(const _0x4e9be0 of this['enemy']()[_0x2e5ebd(0x375)]){const _0x52702c=$dataSkills[_0x4e9be0[_0x2e5ebd(0x3d6)]];if(_0x52702c&&!_0x5e9cdf['includes'](_0x52702c))_0x5e9cdf['push'](_0x52702c);}return _0x5e9cdf;},Game_Enemy[_0x31613b(0x24d)][_0x31613b(0x335)]=function(_0x23e94a){return this['hasState']($dataStates[_0x23e94a]);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x3ef)]=Game_Unit['prototype'][_0x31613b(0x2c7)],Game_Unit['prototype'][_0x31613b(0x2c7)]=function(){const _0x2dc762=_0x31613b;if(this[_0x2dc762(0x19d)]())return!![];return VisuMZ[_0x2dc762(0x469)]['Game_Unit_isAllDead'][_0x2dc762(0x2b3)](this);},Game_Unit[_0x31613b(0x24d)][_0x31613b(0x19d)]=function(){const _0x1597ed=_0x31613b,_0x123788=this[_0x1597ed(0x215)]();for(const _0x468a9b of _0x123788){if(!_0x468a9b[_0x1597ed(0x224)]())return![];}return!![];},VisuMZ[_0x31613b(0x469)][_0x31613b(0x2fa)]=Game_Troop[_0x31613b(0x24d)]['setup'],Game_Troop[_0x31613b(0x24d)][_0x31613b(0x233)]=function(_0x2c3794){const _0x545c83=_0x31613b;VisuMZ[_0x545c83(0x469)][_0x545c83(0x2fa)][_0x545c83(0x2b3)](this,_0x2c3794),this[_0x545c83(0x41f)]();},Game_Troop['prototype'][_0x31613b(0x41f)]=function(){const _0x578bf4=_0x31613b;this[_0x578bf4(0x394)]=Graphics['frameCount'];},Game_Troop[_0x31613b(0x24d)][_0x31613b(0x2fb)]=function(){const _0x4469e3=_0x31613b;return this[_0x4469e3(0x394)]=this[_0x4469e3(0x394)]||Graphics['frameCount'],this[_0x4469e3(0x394)];},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x3ea)]=function(){const _0x5e4cff=_0x31613b;if(ConfigManager['uiMenuStyle']&&ConfigManager[_0x5e4cff(0x4a8)]!==undefined){if('FehlE'===_0x5e4cff(0x166)){const _0x23a2ff=this[_0x5e4cff(0x36d)](_0x3a53db['id'],_0x5e4cff(0x2f1))||0x0,_0x27c379=-this['maxSlipDamage'](),_0x53b530=_0x478ac3['max'](_0x23a2ff,_0x27c379);if(_0x53b530!==0x0){const _0x46eb2c=this[_0x5e4cff(0x467)][_0x5e4cff(0x380)]||0x0;this[_0x5e4cff(0x31b)](_0x53b530),this['_result']['hpDamage']+=_0x46eb2c;}const _0x4d4d87=this[_0x5e4cff(0x36d)](_0x3e3bbe['id'],_0x5e4cff(0x336))||0x0;if(_0x4d4d87!==0x0){const _0x375938=this[_0x5e4cff(0x467)][_0x5e4cff(0x430)]||0x0;this[_0x5e4cff(0x44b)](_0x4d4d87),this[_0x5e4cff(0x467)][_0x5e4cff(0x430)]+=_0x375938;}const _0x547cf0=this[_0x5e4cff(0x36d)](_0x36c3e9['id'],_0x5e4cff(0x2dd))||0x0;_0x547cf0!==0x0&&this[_0x5e4cff(0x450)](_0x547cf0);}else return ConfigManager[_0x5e4cff(0x4a8)];}else{if(this[_0x5e4cff(0x185)]())return this[_0x5e4cff(0x483)]()[_0x5e4cff(0x20e)](/LOWER/i);else{if(_0x5e4cff(0x33e)!==_0x5e4cff(0x33e)){const _0x1d2de7=_0x114bfe(_0x53d3b5['$1']);_0x1d2de7!==_0x241b59[_0x4b4ad9]['version']&&(_0x92641c(_0x5e4cff(0x38a)[_0x5e4cff(0x26b)](_0xf60a9f,_0x1d2de7)),_0x59337b[_0x5e4cff(0x44e)]());}else Scene_ItemBase[_0x5e4cff(0x24d)][_0x5e4cff(0x39a)][_0x5e4cff(0x2b3)](this);}}},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x39a)]=function(){const _0x359130=_0x31613b;if(ConfigManager[_0x359130(0x3b8)]&&ConfigManager[_0x359130(0x48d)]!==undefined){if(_0x359130(0x484)===_0x359130(0x42e)){if(_0x20733c['length']>0x0)_0x227e6a+=this[_0x359130(0x2bb)]();_0x42fe67+=_0x7b88fd(_0x268c59['$1']);}else return ConfigManager[_0x359130(0x48d)];}else{if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x359130(0x1dc)!=='urJBZ')this[_0x359130(0x27f)][_0x325822]='';else return this[_0x359130(0x483)]()['match'](/RIGHT/i);}else return Scene_ItemBase[_0x359130(0x24d)][_0x359130(0x39a)][_0x359130(0x2b3)](this);}},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x483)]=function(){const _0x324e8b=_0x31613b;return VisuMZ['SkillsStatesCore']['Settings'][_0x324e8b(0x156)]['LayoutStyle'];},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x331)]=function(){const _0x477ca2=_0x31613b;return this['_categoryWindow']&&this[_0x477ca2(0x1c5)][_0x477ca2(0x331)]();},Scene_Skill[_0x31613b(0x24d)]['isUseSkillsStatesCoreUpdatedLayout']=function(){const _0x1fe95f=_0x31613b;return VisuMZ['SkillsStatesCore']['Settings'][_0x1fe95f(0x156)][_0x1fe95f(0x1af)];},VisuMZ[_0x31613b(0x469)][_0x31613b(0x277)]=Scene_Skill[_0x31613b(0x24d)]['helpWindowRect'],Scene_Skill[_0x31613b(0x24d)]['helpWindowRect']=function(){const _0x5edd66=_0x31613b;return this[_0x5edd66(0x185)]()?this['helpWindowRectSkillsStatesCore']():VisuMZ[_0x5edd66(0x469)][_0x5edd66(0x277)][_0x5edd66(0x2b3)](this);},Scene_Skill['prototype'][_0x31613b(0x368)]=function(){const _0x434961=_0x31613b,_0x1f9351=0x0,_0x370ece=this[_0x434961(0x2b6)](),_0x5b257d=Graphics[_0x434961(0x2ac)],_0x326702=this[_0x434961(0x496)]();return new Rectangle(_0x1f9351,_0x370ece,_0x5b257d,_0x326702);},VisuMZ['SkillsStatesCore'][_0x31613b(0x302)]=Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x38b)],Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x38b)]=function(){const _0x2ba3f3=_0x31613b;if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x2ba3f3(0x1f8)!==_0x2ba3f3(0x3dc))return this[_0x2ba3f3(0x295)]();else{const _0x490736=this['mainCommandWidth'](),_0x4cb531=this['calcWindowHeight'](0x3,!![]),_0x4506d7=this['isRightInputMode']()?_0x5cd99c['boxWidth']-_0x490736:0x0,_0x4d041f=this['mainAreaTop']();return new _0x1d72ec(_0x4506d7,_0x4d041f,_0x490736,_0x4cb531);}}else{if(_0x2ba3f3(0x2ae)!==_0x2ba3f3(0x2ae))for(const _0x5ed431 of this[_0x2ba3f3(0x3a9)]()){this['isStateExpired'](_0x5ed431['id'])&&_0x5ed431[_0x2ba3f3(0x2b4)]===_0x597ca0&&(this[_0x2ba3f3(0x260)](_0x5ed431['id']),this[_0x2ba3f3(0x183)](_0x5ed431['id']),this[_0x2ba3f3(0x350)](_0x5ed431['id']));}else return VisuMZ['SkillsStatesCore'][_0x2ba3f3(0x302)][_0x2ba3f3(0x2b3)](this);}},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x35b)]=function(){const _0x1f79b6=_0x31613b;return VisuMZ['SkillsStatesCore']['Settings']['Skills'][_0x1f79b6(0x384)]??Scene_MenuBase[_0x1f79b6(0x24d)][_0x1f79b6(0x35b)]['call'](this);},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x295)]=function(){const _0xe55dff=_0x31613b,_0x57577f=this['mainCommandWidth'](),_0x1bbbc0=this[_0xe55dff(0x320)](0x3,!![]),_0x41964d=this['isRightInputMode']()?Graphics[_0xe55dff(0x2ac)]-_0x57577f:0x0,_0x487754=this[_0xe55dff(0x16f)]();return new Rectangle(_0x41964d,_0x487754,_0x57577f,_0x1bbbc0);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x207)]=Scene_Skill[_0x31613b(0x24d)]['statusWindowRect'],Scene_Skill['prototype']['statusWindowRect']=function(){const _0x1a4a20=_0x31613b;return this[_0x1a4a20(0x185)]()?this[_0x1a4a20(0x33d)]():VisuMZ[_0x1a4a20(0x469)]['Scene_Skill_statusWindowRect'][_0x1a4a20(0x2b3)](this);},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x33d)]=function(){const _0xb2d534=_0x31613b,_0x463ff9=Graphics[_0xb2d534(0x2ac)]-this['mainCommandWidth'](),_0x5eb497=this[_0xb2d534(0x41e)]['height'],_0x17b019=this[_0xb2d534(0x39a)]()?0x0:Graphics[_0xb2d534(0x2ac)]-_0x463ff9,_0x4dc8b7=this[_0xb2d534(0x16f)]();return new Rectangle(_0x17b019,_0x4dc8b7,_0x463ff9,_0x5eb497);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x2a3)]=Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x389)],Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x389)]=function(){const _0x49dbc0=_0x31613b;VisuMZ[_0x49dbc0(0x469)][_0x49dbc0(0x2a3)]['call'](this),this[_0x49dbc0(0x268)]()&&(_0x49dbc0(0x1cd)!==_0x49dbc0(0x486)?this[_0x49dbc0(0x280)]():this[_0x49dbc0(0x176)][_0x49dbc0(0x165)]=_0x3e5b20);},VisuMZ[_0x31613b(0x469)]['Scene_Skill_itemWindowRect']=Scene_Skill[_0x31613b(0x24d)]['itemWindowRect'],Scene_Skill['prototype'][_0x31613b(0x2e2)]=function(){const _0x37935b=_0x31613b;if(this[_0x37935b(0x185)]()){if('Nzkbo'==='cZwyk'){this[_0x37935b(0x1b0)]();const _0x10599b=_0x192df5[_0x344010];if(_0x10599b)!_0x2fa61f[_0x37935b(0x1f5)](_0x10599b)&&this['drawActorStateTurns'](_0x525dcd,_0x10599b,_0x4c8d3b,_0x5cd9e8),this[_0x37935b(0x1d6)](_0x225d80,_0x10599b,_0x36c743,_0x3abb25),_0x1da7e4[_0x37935b(0x49d)](_0x10599b);else{const _0x192c1e=_0x58c59a[_0x1e3a4a-_0x669cd3[_0x37935b(0x278)]];this[_0x37935b(0x3b7)](_0xf9e7b9,_0x192c1e,_0x91ed5d,_0x492429),this[_0x37935b(0x206)](_0x598dd4,_0x192c1e,_0x5a8bf3,_0x2e2209);}_0xb6074e+=_0x114546;}else return this[_0x37935b(0x2bd)]();}else{const _0x44ebcc=VisuMZ[_0x37935b(0x469)]['Scene_Skill_itemWindowRect'][_0x37935b(0x2b3)](this);return this['allowCreateShopStatusWindow']()&&this['adjustItemWidthByShopStatus']()&&(_0x44ebcc[_0x37935b(0x297)]-=this['shopStatusWidth']()),_0x44ebcc;}},Scene_Skill['prototype'][_0x31613b(0x2bd)]=function(){const _0x178b1b=_0x31613b,_0x506506=Graphics[_0x178b1b(0x2ac)]-this[_0x178b1b(0x326)](),_0x1eb4b0=this[_0x178b1b(0x288)]()-this['_statusWindow'][_0x178b1b(0x46d)],_0x12f5c2=this[_0x178b1b(0x39a)]()?Graphics[_0x178b1b(0x2ac)]-_0x506506:0x0,_0x3e9b2d=this[_0x178b1b(0x208)]['y']+this[_0x178b1b(0x208)][_0x178b1b(0x46d)];return new Rectangle(_0x12f5c2,_0x3e9b2d,_0x506506,_0x1eb4b0);},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x268)]=function(){const _0x288476=_0x31613b;if(!Imported[_0x288476(0x157)]){if(_0x288476(0x1da)===_0x288476(0x1da))return![];else _0x14251d=_0x44f15b[_0x288476(0x319)](_0x44e946);}else return this[_0x288476(0x185)]()?!![]:VisuMZ['SkillsStatesCore']['Settings'][_0x288476(0x156)][_0x288476(0x363)];},Scene_Skill[_0x31613b(0x24d)]['adjustItemWidthByShopStatus']=function(){const _0x4d20be=_0x31613b;return VisuMZ[_0x4d20be(0x469)][_0x4d20be(0x32d)]['Skills']['SkillSceneAdjustSkillList'];},Scene_Skill[_0x31613b(0x24d)]['createShopStatusWindow']=function(){const _0x9d43e4=_0x31613b,_0x51dbe6=this[_0x9d43e4(0x431)]();this['_shopStatusWindow']=new Window_ShopStatus(_0x51dbe6),this[_0x9d43e4(0x2a6)](this[_0x9d43e4(0x1ff)]),this[_0x9d43e4(0x193)]['setStatusWindow'](this[_0x9d43e4(0x1ff)]);const _0x2e4617=VisuMZ[_0x9d43e4(0x469)][_0x9d43e4(0x32d)][_0x9d43e4(0x156)][_0x9d43e4(0x2cd)];this[_0x9d43e4(0x1ff)][_0x9d43e4(0x3ee)](_0x2e4617||0x0);},Scene_Skill['prototype'][_0x31613b(0x431)]=function(){const _0x54817c=_0x31613b;return this[_0x54817c(0x185)]()?_0x54817c(0x1ac)===_0x54817c(0x1ac)?this[_0x54817c(0x1ea)]():_0x1cc1de[_0x54817c(0x469)][_0x54817c(0x32d)][_0x54817c(0x156)]['SkillConditionJS']['call'](this,_0x4a1913):VisuMZ[_0x54817c(0x469)][_0x54817c(0x32d)][_0x54817c(0x156)][_0x54817c(0x4a6)][_0x54817c(0x2b3)](this);},Scene_Skill[_0x31613b(0x24d)]['shopStatusWindowRectSkillsStatesCore']=function(){const _0x1ef1b0=_0x31613b,_0x403a8a=this['shopStatusWidth'](),_0x3418d8=this[_0x1ef1b0(0x193)][_0x1ef1b0(0x46d)],_0x1d1431=this['isRightInputMode']()?0x0:Graphics['boxWidth']-this[_0x1ef1b0(0x326)](),_0x1eac9f=this[_0x1ef1b0(0x193)]['y'];return new Rectangle(_0x1d1431,_0x1eac9f,_0x403a8a,_0x3418d8);},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x326)]=function(){const _0x2c7191=_0x31613b;return Imported[_0x2c7191(0x157)]?Scene_Shop[_0x2c7191(0x24d)][_0x2c7191(0x489)]():0x0;},Scene_Skill[_0x31613b(0x24d)][_0x31613b(0x21a)]=function(){const _0x2d9169=_0x31613b;if(this['_skillTypeWindow']&&this[_0x2d9169(0x41e)]['active']){if(_0x2d9169(0x3ab)==='pIbKy'){const _0x27f224=_0x16e131['parse']('['+_0xa16d66['$1'][_0x2d9169(0x20e)](/\d+/g)+']');for(const _0x2ecaa1 of _0x27f224){if(!_0x5cad64['value'](_0x2ecaa1))return!![];}return![];}else return TextManager[_0x2d9169(0x282)];}else return'';},VisuMZ[_0x31613b(0x469)][_0x31613b(0x313)]=Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x49f)],Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x49f)]=function(){const _0x4f7e19=_0x31613b;VisuMZ[_0x4f7e19(0x469)][_0x4f7e19(0x313)][_0x4f7e19(0x2b3)](this),this['_costSettings']=null;},VisuMZ['SkillsStatesCore'][_0x31613b(0x175)]=Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x233)],Sprite_Gauge['prototype'][_0x31613b(0x233)]=function(_0x55ce35,_0x20f141){const _0x43004c=_0x31613b;this['setupSkillsStatesCore'](_0x55ce35,_0x20f141),_0x20f141=_0x20f141[_0x43004c(0x4a1)](),VisuMZ[_0x43004c(0x469)][_0x43004c(0x175)][_0x43004c(0x2b3)](this,_0x55ce35,_0x20f141);},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x412)]=function(_0x2ba2e6,_0x3883c6){const _0x4ddf25=_0x31613b,_0x26e460=VisuMZ[_0x4ddf25(0x469)]['Settings'][_0x4ddf25(0x284)][_0x4ddf25(0x2ff)](_0x4a340c=>_0x4a340c[_0x4ddf25(0x249)]['toUpperCase']()===_0x3883c6['toUpperCase']());if(_0x26e460[_0x4ddf25(0x278)]>=0x1)this[_0x4ddf25(0x44c)]=_0x26e460[0x0];else{if(_0x4ddf25(0x23e)==='PBgen')this[_0x4ddf25(0x44c)]=null;else{if(typeof _0x5aa739!==_0x4ddf25(0x217))_0x33d8b7=_0x3c8881['id'];return this[_0x4ddf25(0x3fe)][_0x3e1e3e]||0x0;}}},VisuMZ['SkillsStatesCore'][_0x31613b(0x27b)]=Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x362)],Sprite_Gauge['prototype'][_0x31613b(0x362)]=function(){const _0x3c3037=_0x31613b;if(this['_battler']&&this[_0x3c3037(0x44c)])return this[_0x3c3037(0x31c)]();else{if(_0x3c3037(0x3ae)===_0x3c3037(0x42b)){_0x37ce93[_0x3c3037(0x20e)](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x5ca9ac=_0x155017['$1'];if(_0x5ca9ac[_0x3c3037(0x20e)](/(\d+(?:\s*,\s*\d+)*)/i)){const _0xecff6c=_0x252632[_0x3c3037(0x3c8)]('['+_0x4df9fb['$1'][_0x3c3037(0x20e)](/\d+/g)+']');this[_0x3c3037(0x241)][_0x3c3037(0x477)]=this[_0x3c3037(0x241)][_0x3c3037(0x477)]['concat'](_0xecff6c);}else{const _0x79a075=_0x5ca9ac['split'](',');for(const _0x30d86c of _0x79a075){const _0x36c2ab=_0x19ba39[_0x3c3037(0x2bc)](_0x30d86c);if(_0x36c2ab)this[_0x3c3037(0x241)][_0x3c3037(0x477)][_0x3c3037(0x49d)](_0x36c2ab);}}}else return VisuMZ[_0x3c3037(0x469)][_0x3c3037(0x27b)][_0x3c3037(0x2b3)](this);}},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x31c)]=function(){const _0x4dfa48=_0x31613b;return this[_0x4dfa48(0x44c)]['GaugeCurrentJS'][_0x4dfa48(0x2b3)](this['_battler']);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x32a)]=Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x31d)],Sprite_Gauge['prototype']['currentMaxValue']=function(){const _0x50b666=_0x31613b;if(this[_0x50b666(0x1d4)]&&this['_costSettings']){if('lHgzs'==='zyPMo'){let _0x161d1b=_0x942770[_0x50b666(0x23c)][_0x50b666(0x2b3)](this,_0x529a6e);_0x161d1b=this[_0x50b666(0x179)](_0x4007d8,_0x161d1b,_0x317f9f);if(!_0x4c564e[_0x50b666(0x425)][_0x50b666(0x2b3)](this,_0x4ef53e,_0x161d1b))return![];}else return this[_0x50b666(0x381)]();}else return _0x50b666(0x367)!=='xXyqx'?this['currentMaxValueSkillsStatesCore']():VisuMZ[_0x50b666(0x469)][_0x50b666(0x32a)][_0x50b666(0x2b3)](this);},Sprite_Gauge['prototype'][_0x31613b(0x381)]=function(){const _0x438e4e=_0x31613b;return this[_0x438e4e(0x44c)]['GaugeMaxJS'][_0x438e4e(0x2b3)](this[_0x438e4e(0x1d4)]);},VisuMZ[_0x31613b(0x469)]['Sprite_Gauge_gaugeRate']=Sprite_Gauge[_0x31613b(0x24d)]['gaugeRate'],Sprite_Gauge['prototype'][_0x31613b(0x37a)]=function(){const _0x12cfcd=_0x31613b,_0x21797d=VisuMZ[_0x12cfcd(0x469)]['Sprite_Gauge_gaugeRate']['call'](this);return _0x21797d['clamp'](0x0,0x1);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x48a)]=Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x1e1)],Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x1e1)]=function(){const _0x24483c=_0x31613b;if(this[_0x24483c(0x1d4)]&&this[_0x24483c(0x44c)]){if(_0x24483c(0x46a)!==_0x24483c(0x46a)){if(!this[_0x24483c(0x309)])return;const _0x34fa7f=this[_0x24483c(0x309)][_0x24483c(0x397)]();for(const _0x43c6dc of _0x34fa7f){const _0x53a4af=this[_0x24483c(0x248)](_0x43c6dc);this[_0x24483c(0x1e2)](_0x53a4af,_0x24483c(0x39c),!![],_0x43c6dc);}}else this[_0x24483c(0x196)][_0x24483c(0x419)](),this[_0x24483c(0x29f)]();}else{if(_0x24483c(0x1a3)!==_0x24483c(0x273))VisuMZ[_0x24483c(0x469)]['Sprite_Gauge_redraw'][_0x24483c(0x2b3)](this);else{const _0x62f636=_0x4a4c7a[_0x24483c(0x469)][_0x24483c(0x32d)][_0x24483c(0x247)];if(!_0x62f636)return;if(_0x62f636['ActionEndUpdate']===![])return;if(!this[_0x24483c(0x3f4)])return;this[_0x24483c(0x3f4)]['updateStatesActionEnd']();}}},Sprite_Gauge['prototype'][_0x31613b(0x210)]=function(){const _0x309e0c=_0x31613b;let _0x202862=this[_0x309e0c(0x362)]();return Imported[_0x309e0c(0x39d)]&&this[_0x309e0c(0x370)]()&&(_0x309e0c(0x447)===_0x309e0c(0x188)?(this[_0x309e0c(0x412)](_0xddf13c,_0x4e76d4),_0x2b8175=_0x39bc96[_0x309e0c(0x4a1)](),_0x31c7f3[_0x309e0c(0x469)]['Sprite_Gauge_setup'][_0x309e0c(0x2b3)](this,_0x4f5ea,_0x16b297)):_0x202862=VisuMZ[_0x309e0c(0x319)](_0x202862)),_0x202862;},Sprite_Gauge[_0x31613b(0x24d)]['redrawSkillsStatesCore']=function(){const _0x439188=_0x31613b;this['bitmap'][_0x439188(0x419)](),this['_costSettings'][_0x439188(0x187)][_0x439188(0x2b3)](this);},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x33b)]=function(_0x2fa3d4,_0x4a1825,_0x2e48a5,_0x3d9994,_0x263d4f,_0x50b851){const _0x12f188=_0x31613b,_0x5dfd19=this[_0x12f188(0x37a)](),_0x51d5e3=Math[_0x12f188(0x347)]((_0x263d4f-0x2)*_0x5dfd19),_0x327fcb=_0x50b851-0x2,_0x44a55a=this['gaugeBackColor']();this['bitmap']['fillRect'](_0x2e48a5,_0x3d9994,_0x263d4f,_0x50b851,_0x44a55a),this[_0x12f188(0x196)][_0x12f188(0x449)](_0x2e48a5+0x1,_0x3d9994+0x1,_0x51d5e3,_0x327fcb,_0x2fa3d4,_0x4a1825);},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x2c0)]=function(){const _0x32fe91=_0x31613b,_0x1a0fe7=VisuMZ[_0x32fe91(0x469)][_0x32fe91(0x32d)][_0x32fe91(0x1d8)];if(_0x1a0fe7[_0x32fe91(0x401)]===_0x32fe91(0x217)){if(_0x32fe91(0x2c3)!==_0x32fe91(0x2c3)){if(typeof _0x345b62!==_0x32fe91(0x217))_0x4ef2f1=_0x30ecd7['id'];this[_0x32fe91(0x393)]=this[_0x32fe91(0x393)]||{},this[_0x32fe91(0x393)][_0x111010]={};}else return $gameSystem['numberFontFace']();}else{if(_0x32fe91(0x3af)!==_0x32fe91(0x2f5))return $gameSystem[_0x32fe91(0x42c)]();else{if(this[_0x32fe91(0x17a)]===_0x4ee0fa)return;this[_0x32fe91(0x17a)]=_0x5678dc,this['refresh'](),this[_0x32fe91(0x3e6)](0x0,0x0),this[_0x32fe91(0x208)]&&this[_0x32fe91(0x208)][_0x32fe91(0x163)]===_0x8ab7b4&&this['_statusWindow'][_0x32fe91(0x257)](this[_0x32fe91(0x359)](0x0));}}},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x36e)]=function(){const _0x16ea6b=_0x31613b,_0x5ed90f=VisuMZ[_0x16ea6b(0x469)][_0x16ea6b(0x32d)][_0x16ea6b(0x1d8)];if(_0x5ed90f[_0x16ea6b(0x401)]===_0x16ea6b(0x217)){if(_0x16ea6b(0x2d5)!==_0x16ea6b(0x1ef))return $gameSystem[_0x16ea6b(0x195)]()-0x6;else{for(_0x3a6da5 of _0x2ee490['SkillsStatesCore']['Settings']['Costs']){if(_0x5cd9e9[_0x16ea6b(0x249)][_0x16ea6b(0x301)]()==='TP'){let _0x2aa42d=_0x548a49['CalcJS'][_0x16ea6b(0x2b3)](this,_0x4626e5);return _0x2aa42d=this[_0x16ea6b(0x179)](_0x1f14ad,_0x2aa42d,_0x3a7939),_0x2aa42d;}}return _0x248884[_0x16ea6b(0x469)]['Game_BattlerBase_skillTpCost'][_0x16ea6b(0x2b3)](this,_0x52ece1);}}else return $gameSystem[_0x16ea6b(0x195)]()-0x2;},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x3a2)]=function(){const _0x31ecbd=_0x31613b,_0x326679=VisuMZ[_0x31ecbd(0x469)][_0x31ecbd(0x32d)][_0x31ecbd(0x1d8)];return _0x326679[_0x31ecbd(0x184)]==='number'?$gameSystem[_0x31ecbd(0x434)]():$gameSystem[_0x31ecbd(0x42c)]();},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x225)]=function(){const _0x14266b=_0x31613b,_0xb2a898=VisuMZ[_0x14266b(0x469)]['Settings'][_0x14266b(0x1d8)];if(_0xb2a898[_0x14266b(0x184)]===_0x14266b(0x217))return $gameSystem['mainFontSize']()-0x6;else{if(_0x14266b(0x49e)===_0x14266b(0x49e))return $gameSystem[_0x14266b(0x195)]()-0x2;else{_0x56b1b8['prototype'][_0x14266b(0x332)][_0x14266b(0x2b3)](this);if(this['_commandNameWindow'])this[_0x14266b(0x3a7)]();}}},Sprite_Gauge[_0x31613b(0x24d)]['labelColor']=function(){const _0x30f643=_0x31613b,_0x2bfdc1=VisuMZ['SkillsStatesCore'][_0x30f643(0x32d)][_0x30f643(0x1d8)];if(_0x2bfdc1[_0x30f643(0x238)]){if(_0x2bfdc1[_0x30f643(0x49a)]===0x1){if(_0x30f643(0x421)!=='vWRmS')return this['gaugeColor1']();else{const _0x28308f=this[_0x30f643(0x2ea)];_0x28308f['contents']['clear']();const _0x2eb74f=this['commandStyleCheck'](this[_0x30f643(0x167)]());if(_0x2eb74f===_0x30f643(0x1c2)&&this['maxItems']()>0x0){const _0x576d7c=this[_0x30f643(0x3e3)](this[_0x30f643(0x167)]());let _0x55b909=this['commandName'](this['index']());_0x55b909=_0x55b909[_0x30f643(0x227)](/\\I\[(\d+)\]/gi,''),_0x28308f[_0x30f643(0x1b0)](),this[_0x30f643(0x3c5)](_0x55b909,_0x576d7c),this[_0x30f643(0x28a)](_0x55b909,_0x576d7c),this['commandNameWindowCenter'](_0x55b909,_0x576d7c);}}}else{if(_0x2bfdc1[_0x30f643(0x49a)]===0x2)return this[_0x30f643(0x3cb)]();}}const _0x4bab93=_0x2bfdc1['PresetLabelGaugeColor'];return ColorManager[_0x30f643(0x40a)](_0x4bab93);},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x366)]=function(){const _0x50c685=_0x31613b,_0x2fe05e=VisuMZ[_0x50c685(0x469)][_0x50c685(0x32d)]['Gauge'];if(this[_0x50c685(0x473)]()<=0x0)return _0x50c685(0x23f);else{if(_0x2fe05e['LabelOutlineSolid']){if(_0x50c685(0x328)!=='rUeTC'){if(typeof _0x4b0b30!==_0x50c685(0x217))_0x4b7b17=_0x124ada['id'];const _0x420a84=this[_0x50c685(0x1aa)](_0x47b330);return _0x420a84[_0x533caa];}else return'rgba(0,\x200,\x200,\x201)';}else{if(_0x50c685(0x324)!=='hlVmp')return ColorManager[_0x50c685(0x165)]();else{const _0x2b32f3=_0x8d1335[_0x50c685(0x3c8)]('['+_0x45b33c['$1'][_0x50c685(0x20e)](/\d+/g)+']');for(const _0x588923 of _0x2b32f3){if(_0x1ac90b[_0x50c685(0x2cc)](_0x588923))return!![];}return![];}}}},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x473)]=function(){const _0x296569=_0x31613b;return VisuMZ[_0x296569(0x469)][_0x296569(0x32d)][_0x296569(0x1d8)][_0x296569(0x411)]||0x0;},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x1b3)]=function(){const _0x4213a6=_0x31613b,_0x18acb4=VisuMZ['SkillsStatesCore']['Settings'][_0x4213a6(0x1d8)];if(this[_0x4213a6(0x37e)]()<=0x0){if(_0x4213a6(0x1d0)===_0x4213a6(0x267)){const _0x16d748=this[_0x4213a6(0x40d)]();if(_0x16d748!==''){const _0x2bcffa=_0xe5e71c[_0x4213a6(0x204)];if(_0x16d748==='death'&&_0x2bcffa[_0x4213a6(0x20e)](/<NO DEATH CLEAR>/i))return![];if(_0x16d748===_0x4213a6(0x46e)&&_0x2bcffa[_0x4213a6(0x20e)](/<NO RECOVER ALL CLEAR>/i))return![];}return this[_0x4213a6(0x1fc)](_0x35210f['id']);}else return _0x4213a6(0x23f);}else return _0x18acb4[_0x4213a6(0x235)]?_0x4213a6(0x28f):ColorManager[_0x4213a6(0x165)]();},Sprite_Gauge[_0x31613b(0x24d)][_0x31613b(0x37e)]=function(){const _0x21c76b=_0x31613b;return VisuMZ[_0x21c76b(0x469)][_0x21c76b(0x32d)][_0x21c76b(0x1d8)][_0x21c76b(0x2de)]||0x0;},VisuMZ[_0x31613b(0x469)]['Sprite_StateIcon_loadBitmap']=Sprite_StateIcon['prototype'][_0x31613b(0x39b)],Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x39b)]=function(){const _0x3b1d9c=_0x31613b;VisuMZ['SkillsStatesCore']['Sprite_StateIcon_loadBitmap'][_0x3b1d9c(0x2b3)](this),this[_0x3b1d9c(0x1e7)]();},Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x1e7)]=function(){const _0x57d01b=_0x31613b,_0x186aec=Window_Base[_0x57d01b(0x24d)][_0x57d01b(0x312)]();this[_0x57d01b(0x47c)]=new Sprite(),this[_0x57d01b(0x47c)][_0x57d01b(0x196)]=new Bitmap(ImageManager[_0x57d01b(0x3f5)],_0x186aec),this[_0x57d01b(0x47c)][_0x57d01b(0x2a7)]['x']=this[_0x57d01b(0x2a7)]['x'],this[_0x57d01b(0x47c)][_0x57d01b(0x2a7)]['y']=this[_0x57d01b(0x2a7)]['y'],this[_0x57d01b(0x474)](this[_0x57d01b(0x47c)]),this[_0x57d01b(0x176)]=this['_turnDisplaySprite'][_0x57d01b(0x196)];},VisuMZ[_0x31613b(0x469)]['Sprite_StateIcon_updateFrame']=Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x1bf)],Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x1bf)]=function(){const _0x163fea=_0x31613b;VisuMZ[_0x163fea(0x469)][_0x163fea(0x3d5)]['call'](this),this[_0x163fea(0x488)]();},Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x24b)]=function(_0x5eeb18,_0x2cb7f5,_0x10133f,_0x20b934,_0x7c1db7){const _0x1cb144=_0x31613b;this[_0x1cb144(0x176)][_0x1cb144(0x24b)](_0x5eeb18,_0x2cb7f5,_0x10133f,_0x20b934,this[_0x1cb144(0x176)]['height'],_0x7c1db7);},Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x488)]=function(){const _0x451838=_0x31613b;this['resetFontSettings'](),this[_0x451838(0x176)][_0x451838(0x419)]();const _0x59925a=this['_battler'];if(!_0x59925a)return;const _0x19271d=_0x59925a[_0x451838(0x3a9)]()[_0x451838(0x2ff)](_0x524b43=>_0x524b43[_0x451838(0x321)]>0x0),_0x534c38=[...Array(0x8)[_0x451838(0x472)]()][_0x451838(0x2ff)](_0x5c9ba5=>_0x59925a[_0x451838(0x318)](_0x5c9ba5)!==0x0),_0x4b2605=this['_animationIndex'],_0x3dfc72=_0x19271d[_0x4b2605];if(_0x3dfc72)Window_Base[_0x451838(0x24d)][_0x451838(0x437)][_0x451838(0x2b3)](this,_0x59925a,_0x3dfc72,0x0,0x0),Window_Base[_0x451838(0x24d)][_0x451838(0x1d6)][_0x451838(0x2b3)](this,_0x59925a,_0x3dfc72,0x0,0x0);else{const _0x5ab2ea=_0x534c38[_0x4b2605-_0x19271d[_0x451838(0x278)]];if(_0x5ab2ea===undefined)return;Window_Base['prototype'][_0x451838(0x3b7)][_0x451838(0x2b3)](this,_0x59925a,_0x5ab2ea,0x0,0x0),Window_Base['prototype'][_0x451838(0x206)][_0x451838(0x2b3)](this,_0x59925a,_0x5ab2ea,0x0,0x0);}},Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x1b0)]=function(){const _0x24fa9b=_0x31613b;this[_0x24fa9b(0x176)][_0x24fa9b(0x20f)]=$gameSystem[_0x24fa9b(0x42c)](),this[_0x24fa9b(0x176)][_0x24fa9b(0x386)]=$gameSystem['mainFontSize'](),this[_0x24fa9b(0x3ed)]();},Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x3ed)]=function(){const _0x13fabd=_0x31613b;this[_0x13fabd(0x41a)](ColorManager[_0x13fabd(0x3a5)]()),this[_0x13fabd(0x214)](ColorManager[_0x13fabd(0x165)]());},Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x41a)]=function(_0x1d0e67){this['contents']['textColor']=_0x1d0e67;},Sprite_StateIcon['prototype'][_0x31613b(0x214)]=function(_0x308dbe){const _0x9b8ddc=_0x31613b;this[_0x9b8ddc(0x176)][_0x9b8ddc(0x165)]=_0x308dbe;},Sprite_StateIcon[_0x31613b(0x24d)][_0x31613b(0x460)]=function(){const _0x5b0ef6=_0x31613b;this[_0x5b0ef6(0x177)]=!![],this[_0x5b0ef6(0x47f)]();},Window_Base[_0x31613b(0x24d)]['drawSkillCost']=function(_0xd39cf3,_0x5be9c9,_0x21376d,_0x23f988,_0x38d32f){const _0x143dc8=_0x31613b,_0x1727ba=this[_0x143dc8(0x395)](_0xd39cf3,_0x5be9c9),_0x1abfb6=this[_0x143dc8(0x465)](_0x1727ba,_0x21376d,_0x23f988,_0x38d32f),_0x195726=_0x21376d+_0x38d32f-_0x1abfb6[_0x143dc8(0x297)];this[_0x143dc8(0x15f)](_0x1727ba,_0x195726,_0x23f988,_0x38d32f),this[_0x143dc8(0x1b0)]();},Window_Base[_0x31613b(0x24d)]['createAllSkillCostText']=function(_0x1c8ff7,_0x28ad9a){const _0x43ca61=_0x31613b;let _0x335056='';for(settings of VisuMZ[_0x43ca61(0x469)][_0x43ca61(0x32d)][_0x43ca61(0x284)]){if(!this[_0x43ca61(0x2f8)](_0x1c8ff7,_0x28ad9a,settings))continue;if(_0x335056[_0x43ca61(0x278)]>0x0)_0x335056+=this[_0x43ca61(0x2bb)]();_0x335056+=this['createSkillCostText'](_0x1c8ff7,_0x28ad9a,settings);}_0x335056=this['makeAdditionalSkillCostText'](_0x1c8ff7,_0x28ad9a,_0x335056);if(_0x28ad9a['note'][_0x43ca61(0x20e)](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if(_0x335056[_0x43ca61(0x278)]>0x0)_0x335056+=this['skillCostSeparator']();_0x335056+=String(RegExp['$1']);}return _0x335056;},Window_Base['prototype'][_0x31613b(0x1f4)]=function(_0x5994f3,_0xfab1bd,_0x36868e){return _0x36868e;},Window_Base[_0x31613b(0x24d)][_0x31613b(0x2f8)]=function(_0x22d69b,_0x555555,_0x291f72){const _0x2b124d=_0x31613b;let _0x5e3a76=_0x291f72[_0x2b124d(0x23c)][_0x2b124d(0x2b3)](_0x22d69b,_0x555555);return _0x5e3a76=_0x22d69b[_0x2b124d(0x179)](_0x555555,_0x5e3a76,_0x291f72),_0x291f72[_0x2b124d(0x2d7)][_0x2b124d(0x2b3)](_0x22d69b,_0x555555,_0x5e3a76,_0x291f72);},Window_Base[_0x31613b(0x24d)][_0x31613b(0x1ae)]=function(_0x1b8ea2,_0x40dce5,_0x39c807){const _0x45c3c8=_0x31613b;let _0x5854c1=_0x39c807[_0x45c3c8(0x23c)][_0x45c3c8(0x2b3)](_0x1b8ea2,_0x40dce5);return _0x5854c1=_0x1b8ea2[_0x45c3c8(0x179)](_0x40dce5,_0x5854c1,_0x39c807),_0x39c807[_0x45c3c8(0x178)][_0x45c3c8(0x2b3)](_0x1b8ea2,_0x40dce5,_0x5854c1,_0x39c807);},Window_Base[_0x31613b(0x24d)][_0x31613b(0x2bb)]=function(){return'\x20';},Window_Base[_0x31613b(0x24d)][_0x31613b(0x1cf)]=function(_0x5f5771,_0x1da8bf,_0x2015ba,_0x2329e0){const _0xc54e3a=_0x31613b;if(!_0x5f5771)return;VisuMZ[_0xc54e3a(0x469)][_0xc54e3a(0x305)][_0xc54e3a(0x2b3)](this,_0x5f5771,_0x1da8bf,_0x2015ba,_0x2329e0),this['drawActorIconsAllTurnCounters'](_0x5f5771,_0x1da8bf,_0x2015ba,_0x2329e0);},Window_Base[_0x31613b(0x24d)][_0x31613b(0x275)]=function(_0x136f82,_0x38954e,_0x216cf1,_0x2439fc){const _0x2e0df8=_0x31613b;_0x2439fc=_0x2439fc||0x90;const _0x40967e=ImageManager['iconWidth'],_0x293d0d=_0x136f82[_0x2e0df8(0x1cc)]()[_0x2e0df8(0x3fb)](0x0,Math[_0x2e0df8(0x347)](_0x2439fc/_0x40967e)),_0x13d4cc=_0x136f82[_0x2e0df8(0x3a9)]()[_0x2e0df8(0x2ff)](_0x4e6f1a=>_0x4e6f1a[_0x2e0df8(0x321)]>0x0),_0x36e82f=[...Array(0x8)[_0x2e0df8(0x472)]()][_0x2e0df8(0x2ff)](_0x3a23d3=>_0x136f82[_0x2e0df8(0x318)](_0x3a23d3)!==0x0),_0x2c2089=[];let _0x572180=_0x38954e;for(let _0x548f8e=0x0;_0x548f8e<_0x293d0d[_0x2e0df8(0x278)];_0x548f8e++){this['resetFontSettings']();const _0x506db6=_0x13d4cc[_0x548f8e];if(_0x506db6){if(_0x2e0df8(0x1fe)===_0x2e0df8(0x3e8))for(const _0x1e4ed0 of _0x5339df){_0x1e4ed0[_0x2e0df8(0x20e)](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x334602=_0xbce7e2(_0xcfeab['$1']),_0x2c4719=_0x1ae68a(_0x1208ac['$2']);_0x173fd9[_0x2e0df8(0x16b)](_0x334602,_0x2c4719);}else{if(!_0x2c2089[_0x2e0df8(0x1f5)](_0x506db6)){if(_0x2e0df8(0x19f)===_0x2e0df8(0x3b5))return _0x455d84['SkillsStatesCore'][_0x2e0df8(0x32a)][_0x2e0df8(0x2b3)](this);else this[_0x2e0df8(0x437)](_0x136f82,_0x506db6,_0x572180,_0x216cf1);}this[_0x2e0df8(0x1d6)](_0x136f82,_0x506db6,_0x572180,_0x216cf1),_0x2c2089[_0x2e0df8(0x49d)](_0x506db6);}}else{if(_0x2e0df8(0x211)==='ebzYT'){const _0x38d58e=_0x36e82f[_0x548f8e-_0x13d4cc[_0x2e0df8(0x278)]];this[_0x2e0df8(0x3b7)](_0x136f82,_0x38d58e,_0x572180,_0x216cf1),this['drawActorBuffRates'](_0x136f82,_0x38d58e,_0x572180,_0x216cf1);}else{let _0x34a4d1=this[_0x2e0df8(0x1fc)](_0x504510);_0x21953f[_0x2e0df8(0x469)][_0x2e0df8(0x406)]['call'](this,_0x157f5b);if(_0x34a4d1&&!this[_0x2e0df8(0x1fc)](_0x1dad06))this[_0x2e0df8(0x15e)](_0xc59f9b);}}_0x572180+=_0x40967e;}},Window_Base[_0x31613b(0x24d)][_0x31613b(0x437)]=function(_0x3d4fcc,_0x2808d6,_0xa3252e,_0x5d6b0a){const _0x4a33b2=_0x31613b;if(!VisuMZ[_0x4a33b2(0x469)][_0x4a33b2(0x32d)][_0x4a33b2(0x247)][_0x4a33b2(0x3e4)])return;if(!_0x3d4fcc[_0x4a33b2(0x1fc)](_0x2808d6['id']))return;if(_0x2808d6[_0x4a33b2(0x2b4)]===0x0)return;if(_0x2808d6[_0x4a33b2(0x204)]['match'](/<HIDE STATE TURNS>/i))return;const _0x4dcf6e=_0x3d4fcc[_0x4a33b2(0x343)](_0x2808d6['id']),_0x129ffc=ImageManager[_0x4a33b2(0x3f5)],_0x36519c=ColorManager[_0x4a33b2(0x228)](_0x2808d6);this[_0x4a33b2(0x41a)](_0x36519c),this[_0x4a33b2(0x214)]('rgba(0,\x200,\x200,\x201)'),this[_0x4a33b2(0x176)][_0x4a33b2(0x493)]=!![],this[_0x4a33b2(0x176)]['fontSize']=VisuMZ[_0x4a33b2(0x469)][_0x4a33b2(0x32d)][_0x4a33b2(0x247)][_0x4a33b2(0x455)],_0xa3252e+=VisuMZ[_0x4a33b2(0x469)]['Settings'][_0x4a33b2(0x247)][_0x4a33b2(0x392)],_0x5d6b0a+=VisuMZ[_0x4a33b2(0x469)]['Settings'][_0x4a33b2(0x247)][_0x4a33b2(0x161)],this[_0x4a33b2(0x24b)](_0x4dcf6e,_0xa3252e,_0x5d6b0a,_0x129ffc,_0x4a33b2(0x3b4)),this[_0x4a33b2(0x176)][_0x4a33b2(0x493)]=![],this[_0x4a33b2(0x1b0)]();},Window_Base[_0x31613b(0x24d)][_0x31613b(0x1d6)]=function(_0x542697,_0x562737,_0x17252a,_0x5c5627){const _0x5bf954=_0x31613b;if(!VisuMZ[_0x5bf954(0x469)]['Settings']['States'][_0x5bf954(0x1ca)])return;const _0x478c0b=ImageManager['iconWidth'],_0x936f79=ImageManager[_0x5bf954(0x23b)]/0x2,_0x47c578=ColorManager['normalColor']();this[_0x5bf954(0x41a)](_0x47c578),this[_0x5bf954(0x214)](_0x5bf954(0x28f)),this['contents'][_0x5bf954(0x493)]=!![],this['contents'][_0x5bf954(0x386)]=VisuMZ[_0x5bf954(0x469)][_0x5bf954(0x32d)][_0x5bf954(0x247)][_0x5bf954(0x442)],_0x17252a+=VisuMZ[_0x5bf954(0x469)][_0x5bf954(0x32d)]['States'][_0x5bf954(0x2a4)],_0x5c5627+=VisuMZ[_0x5bf954(0x469)]['Settings'][_0x5bf954(0x247)]['DataOffsetY'];const _0x24e58f=String(_0x542697[_0x5bf954(0x22f)](_0x562737['id']));this['drawText'](_0x24e58f,_0x17252a,_0x5c5627,_0x478c0b,_0x5bf954(0x20d)),this['contents'][_0x5bf954(0x493)]=![],this[_0x5bf954(0x1b0)]();},Window_Base[_0x31613b(0x24d)]['drawActorBuffTurns']=function(_0x38b4d3,_0x3d3c3b,_0x5a358f,_0x360fc5){const _0x2d88da=_0x31613b;if(!VisuMZ[_0x2d88da(0x469)]['Settings'][_0x2d88da(0x21d)][_0x2d88da(0x3e4)])return;const _0x6e39a8=_0x38b4d3[_0x2d88da(0x318)](_0x3d3c3b);if(_0x6e39a8===0x0)return;const _0x4add40=_0x38b4d3[_0x2d88da(0x43e)](_0x3d3c3b),_0x27cbd2=ImageManager[_0x2d88da(0x3f5)],_0x41852a=_0x6e39a8>0x0?ColorManager['buffColor']():ColorManager[_0x2d88da(0x240)]();this[_0x2d88da(0x41a)](_0x41852a),this['changeOutlineColor'](_0x2d88da(0x28f)),this[_0x2d88da(0x176)][_0x2d88da(0x493)]=!![],this[_0x2d88da(0x176)][_0x2d88da(0x386)]=VisuMZ['SkillsStatesCore']['Settings']['Buffs']['TurnFontSize'],_0x5a358f+=VisuMZ[_0x2d88da(0x469)][_0x2d88da(0x32d)]['Buffs'][_0x2d88da(0x392)],_0x360fc5+=VisuMZ['SkillsStatesCore']['Settings'][_0x2d88da(0x21d)][_0x2d88da(0x161)],this[_0x2d88da(0x24b)](_0x4add40,_0x5a358f,_0x360fc5,_0x27cbd2,_0x2d88da(0x3b4)),this[_0x2d88da(0x176)][_0x2d88da(0x493)]=![],this[_0x2d88da(0x1b0)]();},Window_Base[_0x31613b(0x24d)]['drawActorBuffRates']=function(_0x425471,_0x291b50,_0x58c7bb,_0x1eaa00){const _0x3b063a=_0x31613b;if(!VisuMZ[_0x3b063a(0x469)]['Settings'][_0x3b063a(0x21d)][_0x3b063a(0x1ca)])return;const _0x3d9b90=_0x425471['paramBuffRate'](_0x291b50),_0x1500ad=_0x425471[_0x3b063a(0x318)](_0x291b50),_0x8f4132=ImageManager[_0x3b063a(0x3f5)],_0x33e19a=ImageManager[_0x3b063a(0x23b)]/0x2,_0x208dfc=_0x1500ad>0x0?ColorManager['buffColor']():ColorManager[_0x3b063a(0x240)]();this[_0x3b063a(0x41a)](_0x208dfc),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this['contents'][_0x3b063a(0x493)]=!![],this[_0x3b063a(0x176)][_0x3b063a(0x386)]=VisuMZ[_0x3b063a(0x469)][_0x3b063a(0x32d)][_0x3b063a(0x21d)]['DataFontSize'],_0x58c7bb+=VisuMZ['SkillsStatesCore']['Settings'][_0x3b063a(0x21d)]['DataOffsetX'],_0x1eaa00+=VisuMZ[_0x3b063a(0x469)][_0x3b063a(0x32d)][_0x3b063a(0x21d)][_0x3b063a(0x160)];const _0x3eed60=_0x3b063a(0x4a9)[_0x3b063a(0x26b)](Math['round'](_0x3d9b90*0x64));this[_0x3b063a(0x24b)](_0x3eed60,_0x58c7bb,_0x1eaa00,_0x8f4132,_0x3b063a(0x20d)),this[_0x3b063a(0x176)][_0x3b063a(0x493)]=![],this['resetFontSettings']();},VisuMZ['SkillsStatesCore']['Window_StatusBase_placeGauge']=Window_StatusBase['prototype']['placeGauge'],Window_StatusBase[_0x31613b(0x24d)]['placeGauge']=function(_0x28b32b,_0x4441fc,_0x39a1fc,_0x3f2065){const _0x22725c=_0x31613b;if(_0x28b32b['isActor']())_0x4441fc=this[_0x22725c(0x192)](_0x28b32b,_0x4441fc);this[_0x22725c(0x23d)](_0x28b32b,_0x4441fc,_0x39a1fc,_0x3f2065);},Window_StatusBase[_0x31613b(0x24d)]['placeExactGauge']=function(_0x21e23c,_0x541aab,_0x128842,_0x306812){const _0x53d710=_0x31613b;if([_0x53d710(0x170),'untitled'][_0x53d710(0x1f5)](_0x541aab['toLowerCase']()))return;VisuMZ[_0x53d710(0x469)][_0x53d710(0x440)][_0x53d710(0x2b3)](this,_0x21e23c,_0x541aab,_0x128842,_0x306812);},Window_StatusBase['prototype'][_0x31613b(0x192)]=function(_0x2014ec,_0xa5d0b3){const _0x10e7a1=_0x31613b,_0x4d6cf2=_0x2014ec['currentClass']()[_0x10e7a1(0x204)];if(_0xa5d0b3==='hp'&&_0x4d6cf2[_0x10e7a1(0x20e)](/<REPLACE HP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0xa5d0b3==='mp'&&_0x4d6cf2[_0x10e7a1(0x20e)](/<REPLACE MP GAUGE:[ ](.*)>/i)){if(_0x10e7a1(0x299)!==_0x10e7a1(0x43b))return String(RegExp['$1']);else _0x1955cd[_0x10e7a1(0x38d)]((_0x5725c8,_0x53fe51)=>{const _0x3c4e88=_0x10e7a1,_0x40f7d1=_0x5725c8[_0x3c4e88(0x3b3)],_0x127d55=_0x53fe51[_0x3c4e88(0x3b3)];if(_0x40f7d1!==_0x127d55)return _0x127d55-_0x40f7d1;return _0x5725c8-_0x53fe51;});}else return _0xa5d0b3==='tp'&&_0x4d6cf2[_0x10e7a1(0x20e)](/<REPLACE TP GAUGE:[ ](.*)>/i)?String(RegExp['$1']):_0xa5d0b3;}},VisuMZ['SkillsStatesCore'][_0x31613b(0x305)]=Window_StatusBase[_0x31613b(0x24d)]['drawActorIcons'],Window_StatusBase[_0x31613b(0x24d)][_0x31613b(0x1cf)]=function(_0x57f765,_0x452126,_0xaf0856,_0x503dee){const _0x5e7936=_0x31613b;if(!_0x57f765)return;Window_Base[_0x5e7936(0x24d)][_0x5e7936(0x1cf)][_0x5e7936(0x2b3)](this,_0x57f765,_0x452126,_0xaf0856,_0x503dee);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x1c8)]=Window_SkillType[_0x31613b(0x24d)]['initialize'],Window_SkillType[_0x31613b(0x24d)][_0x31613b(0x311)]=function(_0x41697c){const _0x2a0ac8=_0x31613b;VisuMZ['SkillsStatesCore'][_0x2a0ac8(0x1c8)][_0x2a0ac8(0x2b3)](this,_0x41697c),this[_0x2a0ac8(0x340)](_0x41697c);},Window_SkillType[_0x31613b(0x24d)]['createCommandNameWindow']=function(_0x5495c5){const _0x5d667d=_0x31613b,_0x322f34=new Rectangle(0x0,0x0,_0x5495c5[_0x5d667d(0x297)],_0x5495c5['height']);this[_0x5d667d(0x2ea)]=new Window_Base(_0x322f34),this[_0x5d667d(0x2ea)][_0x5d667d(0x2f0)]=0x0,this['addChild'](this['_commandNameWindow']),this[_0x5d667d(0x3a7)]();},Window_SkillType[_0x31613b(0x24d)]['callUpdateHelp']=function(){const _0x467956=_0x31613b;Window_Command['prototype'][_0x467956(0x332)][_0x467956(0x2b3)](this);if(this[_0x467956(0x2ea)])this[_0x467956(0x3a7)]();},Window_SkillType['prototype']['updateCommandNameWindow']=function(){const _0x3c5136=_0x31613b,_0x40c0ef=this[_0x3c5136(0x2ea)];_0x40c0ef['contents'][_0x3c5136(0x419)]();const _0x23b692=this[_0x3c5136(0x352)](this['index']());if(_0x23b692===_0x3c5136(0x1c2)&&this[_0x3c5136(0x29b)]()>0x0){if(_0x3c5136(0x18b)===_0x3c5136(0x18b)){const _0x4b8f79=this['itemLineRect'](this[_0x3c5136(0x167)]());let _0x590025=this[_0x3c5136(0x303)](this['index']());_0x590025=_0x590025[_0x3c5136(0x227)](/\\I\[(\d+)\]/gi,''),_0x40c0ef[_0x3c5136(0x1b0)](),this['commandNameWindowDrawBackground'](_0x590025,_0x4b8f79),this[_0x3c5136(0x28a)](_0x590025,_0x4b8f79),this[_0x3c5136(0x164)](_0x590025,_0x4b8f79);}else return this['_costSettings']['GaugeCurrentJS']['call'](this[_0x3c5136(0x1d4)]);}},Window_SkillType['prototype'][_0x31613b(0x3c5)]=function(_0x3def99,_0x515e69){},Window_SkillType[_0x31613b(0x24d)]['commandNameWindowDrawText']=function(_0xdbef1e,_0x56daa2){const _0x59f05b=_0x31613b,_0x41b039=this['_commandNameWindow'];_0x41b039[_0x59f05b(0x24b)](_0xdbef1e,0x0,_0x56daa2['y'],_0x41b039['innerWidth'],_0x59f05b(0x20d));},Window_SkillType['prototype'][_0x31613b(0x164)]=function(_0x27ee3d,_0x17c0f4){const _0x2da2d1=_0x31613b,_0x575aaa=this[_0x2da2d1(0x2ea)],_0x3ff66d=$gameSystem[_0x2da2d1(0x2f4)](),_0x4a4b2c=_0x17c0f4['x']+Math['floor'](_0x17c0f4['width']/0x2)+_0x3ff66d;_0x575aaa['x']=_0x575aaa[_0x2da2d1(0x297)]/-0x2+_0x4a4b2c,_0x575aaa['y']=Math[_0x2da2d1(0x347)](_0x17c0f4[_0x2da2d1(0x46d)]/0x2);},Window_SkillType['prototype'][_0x31613b(0x331)]=function(){const _0xb39182=_0x31613b;return Imported[_0xb39182(0x39d)]&&Window_Command[_0xb39182(0x24d)][_0xb39182(0x331)][_0xb39182(0x2b3)](this);},Window_SkillType[_0x31613b(0x24d)]['makeCommandList']=function(){const _0x4c8114=_0x31613b;if(!this[_0x4c8114(0x309)])return;const _0x1b8770=this[_0x4c8114(0x309)]['skillTypes']();for(const _0x2499fc of _0x1b8770){const _0x57830c=this[_0x4c8114(0x248)](_0x2499fc);this[_0x4c8114(0x1e2)](_0x57830c,'skill',!![],_0x2499fc);}},Window_SkillType[_0x31613b(0x24d)][_0x31613b(0x248)]=function(_0x57d0ab){const _0x45382b=_0x31613b;let _0x5cf1c9=$dataSystem['skillTypes'][_0x57d0ab];if(_0x5cf1c9[_0x45382b(0x20e)](/\\I\[(\d+)\]/i))return _0x5cf1c9;if(this[_0x45382b(0x26a)]()===_0x45382b(0x22e))return _0x5cf1c9;const _0x18813b=VisuMZ['SkillsStatesCore'][_0x45382b(0x32d)][_0x45382b(0x156)],_0x1783c=$dataSystem[_0x45382b(0x1ad)]['includes'](_0x57d0ab),_0x56e6e1=_0x1783c?_0x18813b[_0x45382b(0x2d4)]:_0x18813b[_0x45382b(0x216)];return _0x45382b(0x35e)['format'](_0x56e6e1,_0x5cf1c9);},Window_SkillType[_0x31613b(0x24d)][_0x31613b(0x1c0)]=function(){const _0x4f9fc0=_0x31613b;return VisuMZ[_0x4f9fc0(0x469)][_0x4f9fc0(0x32d)][_0x4f9fc0(0x156)][_0x4f9fc0(0x415)];},Window_SkillType[_0x31613b(0x24d)][_0x31613b(0x44a)]=function(_0x2d100e){const _0x31fdcd=_0x31613b,_0x4b0155=this['commandStyleCheck'](_0x2d100e);if(_0x4b0155===_0x31fdcd(0x342))this[_0x31fdcd(0x2dc)](_0x2d100e);else{if(_0x4b0155===_0x31fdcd(0x1c2)){if(_0x31fdcd(0x24f)===_0x31fdcd(0x24f))this['drawItemStyleIcon'](_0x2d100e);else{for(_0x33b674 of _0x450aa2[_0x31fdcd(0x469)][_0x31fdcd(0x32d)]['Costs']){if(_0x549621[_0x31fdcd(0x249)][_0x31fdcd(0x301)]()==='MP'){let _0x2adfab=_0x4d1d36[_0x31fdcd(0x23c)][_0x31fdcd(0x2b3)](this,_0x2ffa9d);return _0x2adfab=this['adjustSkillCost'](_0x662f5e,_0x2adfab,_0x2eeaf6),_0x2adfab;}}return _0x5b3a3c[_0x31fdcd(0x469)][_0x31fdcd(0x218)][_0x31fdcd(0x2b3)](this,_0x2b79dc);}}else _0x31fdcd(0x372)!==_0x31fdcd(0x372)?this['_battler']&&this[_0x31fdcd(0x44c)]?(this[_0x31fdcd(0x196)][_0x31fdcd(0x419)](),this[_0x31fdcd(0x29f)]()):_0xd1f245['SkillsStatesCore'][_0x31fdcd(0x48a)][_0x31fdcd(0x2b3)](this):Window_Command[_0x31fdcd(0x24d)][_0x31fdcd(0x44a)][_0x31fdcd(0x2b3)](this,_0x2d100e);}},Window_SkillType[_0x31613b(0x24d)][_0x31613b(0x26a)]=function(){const _0x5a879c=_0x31613b;return VisuMZ[_0x5a879c(0x469)][_0x5a879c(0x32d)][_0x5a879c(0x156)][_0x5a879c(0x23a)];},Window_SkillType[_0x31613b(0x24d)][_0x31613b(0x352)]=function(_0x15e4a2){const _0x2c666f=_0x31613b;if(_0x15e4a2<0x0)return _0x2c666f(0x22e);const _0x231386=this[_0x2c666f(0x26a)]();if(_0x231386!=='auto')return _0x2c666f(0x365)!==_0x2c666f(0x365)?_0x3b184c[_0x2c666f(0x469)]['Scene_Skill_statusWindowRect'][_0x2c666f(0x2b3)](this):_0x231386;else{if(this['maxItems']()>0x0){const _0x2efc1d=this[_0x2c666f(0x303)](_0x15e4a2);if(_0x2efc1d[_0x2c666f(0x20e)](/\\I\[(\d+)\]/i)){if(_0x2c666f(0x34e)===_0x2c666f(0x21f))this['_statusWindow'][_0x2c666f(0x257)](this[_0x2c666f(0x359)](0x0));else{const _0x3aebb3=this['itemLineRect'](_0x15e4a2),_0x1bb457=this[_0x2c666f(0x465)](_0x2efc1d)[_0x2c666f(0x297)];return _0x1bb457<=_0x3aebb3[_0x2c666f(0x297)]?_0x2c666f(0x276)!==_0x2c666f(0x276)?_0x3d9af1['SkillsStatesCore']['Settings'][_0x2c666f(0x247)][_0x2c666f(0x3d0)]:_0x2c666f(0x342):_0x2c666f(0x1c2);}}}}return'text';},Window_SkillType['prototype'][_0x31613b(0x2dc)]=function(_0x408401){const _0x3ee7ba=_0x31613b,_0x59153f=this[_0x3ee7ba(0x3e3)](_0x408401),_0x473e9e=this[_0x3ee7ba(0x303)](_0x408401),_0x1d4be5=this[_0x3ee7ba(0x465)](_0x473e9e)[_0x3ee7ba(0x297)];this[_0x3ee7ba(0x45d)](this[_0x3ee7ba(0x388)](_0x408401));const _0x307664=this['itemTextAlign']();if(_0x307664==='right')this['drawTextEx'](_0x473e9e,_0x59153f['x']+_0x59153f[_0x3ee7ba(0x297)]-_0x1d4be5,_0x59153f['y'],_0x1d4be5);else{if(_0x307664==='center'){const _0x43336e=_0x59153f['x']+Math[_0x3ee7ba(0x347)]((_0x59153f[_0x3ee7ba(0x297)]-_0x1d4be5)/0x2);this[_0x3ee7ba(0x15f)](_0x473e9e,_0x43336e,_0x59153f['y'],_0x1d4be5);}else this['drawTextEx'](_0x473e9e,_0x59153f['x'],_0x59153f['y'],_0x1d4be5);}},Window_SkillType[_0x31613b(0x24d)][_0x31613b(0x283)]=function(_0x1f5a47){const _0x4ce13b=_0x31613b;this['commandName'](_0x1f5a47)['match'](/\\I\[(\d+)\]/i);const _0x4bfdf=Number(RegExp['$1'])||0x0,_0x3991fc=this[_0x4ce13b(0x3e3)](_0x1f5a47),_0x334d33=_0x3991fc['x']+Math[_0x4ce13b(0x347)]((_0x3991fc[_0x4ce13b(0x297)]-ImageManager[_0x4ce13b(0x3f5)])/0x2),_0x902bf1=_0x3991fc['y']+(_0x3991fc[_0x4ce13b(0x46d)]-ImageManager['iconHeight'])/0x2;this[_0x4ce13b(0x452)](_0x4bfdf,_0x334d33,_0x902bf1);},VisuMZ[_0x31613b(0x469)][_0x31613b(0x25e)]=Window_SkillStatus[_0x31613b(0x24d)]['refresh'],Window_SkillStatus['prototype'][_0x31613b(0x190)]=function(){const _0x255914=_0x31613b;VisuMZ[_0x255914(0x469)][_0x255914(0x25e)][_0x255914(0x2b3)](this);if(this[_0x255914(0x309)])this[_0x255914(0x441)]();},Window_SkillStatus[_0x31613b(0x24d)][_0x31613b(0x441)]=function(){const _0x236e33=_0x31613b;if(!Imported[_0x236e33(0x39d)])return;if(!Imported[_0x236e33(0x345)])return;const _0x281665=this[_0x236e33(0x2e3)]();let _0xf14e8=this[_0x236e33(0x26c)]()/0x2+0xb4+0xb4+0xb4,_0x44518b=this[_0x236e33(0x1cb)]-_0xf14e8-0x2;if(_0x44518b>=0x12c){const _0x4b876b=VisuMZ[_0x236e33(0x2aa)][_0x236e33(0x32d)][_0x236e33(0x3a3)][_0x236e33(0x3bf)],_0x1b9ff5=Math[_0x236e33(0x347)](_0x44518b/0x2)-0x18;let _0x1fd0b9=_0xf14e8,_0x47b916=Math[_0x236e33(0x347)]((this[_0x236e33(0x3de)]-Math[_0x236e33(0x1e0)](_0x4b876b[_0x236e33(0x278)]/0x2)*_0x281665)/0x2),_0x10c790=0x0;for(const _0x550ef1 of _0x4b876b){this['drawExtendedParameter'](_0x1fd0b9,_0x47b916,_0x1b9ff5,_0x550ef1),_0x10c790++,_0x10c790%0x2===0x0?(_0x1fd0b9=_0xf14e8,_0x47b916+=_0x281665):_0x236e33(0x264)!=='MTMbU'?_0x1fd0b9+=_0x1b9ff5+0x18:this[_0x236e33(0x35d)](_0x438a7c,_0x3d83b3);}}this[_0x236e33(0x1b0)]();},Window_SkillStatus[_0x31613b(0x24d)][_0x31613b(0x329)]=function(_0x4312fd,_0x57ad53,_0x43b1a8,_0x3831b5){const _0x4b14cf=_0x31613b,_0x37c1cf=this[_0x4b14cf(0x2e3)]();this['resetFontSettings'](),this['drawParamText'](_0x4312fd,_0x57ad53,_0x43b1a8,_0x3831b5,!![]),this['resetTextColor'](),this[_0x4b14cf(0x176)][_0x4b14cf(0x386)]-=0x8;const _0x4309ef=this[_0x4b14cf(0x309)]['paramValueByName'](_0x3831b5,!![]);this[_0x4b14cf(0x176)][_0x4b14cf(0x24b)](_0x4309ef,_0x4312fd,_0x57ad53,_0x43b1a8,_0x37c1cf,'right');},VisuMZ['SkillsStatesCore'][_0x31613b(0x346)]=Window_SkillList[_0x31613b(0x24d)]['includes'],Window_SkillList[_0x31613b(0x24d)]['includes']=function(_0x321c32){return this['includesSkillsStatesCore'](_0x321c32);},VisuMZ['SkillsStatesCore'][_0x31613b(0x356)]=Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x4aa)],Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x4aa)]=function(){const _0x5d570b=_0x31613b;if(SceneManager[_0x5d570b(0x300)][_0x5d570b(0x163)]===Scene_Battle){if(_0x5d570b(0x19b)===_0x5d570b(0x2db)){const _0x382d34=_0x4bcad0[_0x5d570b(0x3c8)]('['+_0x303850['$1'][_0x5d570b(0x20e)](/\d+/g)+']');for(const _0x1d3ee2 of _0x382d34){if(!_0x597fe4['hasSkill'](_0x1d3ee2))return!![];}return![];}else return VisuMZ[_0x5d570b(0x469)][_0x5d570b(0x356)]['call'](this);}else{if(_0x5d570b(0x24c)==='oKXKH')return VisuMZ['SkillsStatesCore']['Settings'][_0x5d570b(0x156)][_0x5d570b(0x1b5)];else this[_0x5d570b(0x2f7)](_0x20a460,_0x11cac0);}},VisuMZ[_0x31613b(0x469)][_0x31613b(0x485)]=Window_SkillList['prototype']['setActor'],Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x2c4)]=function(_0x1387a5){const _0x205d22=_0x31613b,_0x42a525=this[_0x205d22(0x309)]!==_0x1387a5;VisuMZ[_0x205d22(0x469)][_0x205d22(0x485)][_0x205d22(0x2b3)](this,_0x1387a5),_0x42a525&&(this[_0x205d22(0x208)]&&this['_statusWindow'][_0x205d22(0x163)]===Window_ShopStatus&&this['_statusWindow'][_0x205d22(0x257)](this[_0x205d22(0x359)](0x0)));},Window_SkillList['prototype']['setStypeId']=function(_0x4d7d21){const _0x456e32=_0x31613b;if(this[_0x456e32(0x17a)]===_0x4d7d21)return;this[_0x456e32(0x17a)]=_0x4d7d21,this[_0x456e32(0x190)](),this['scrollTo'](0x0,0x0);if(this[_0x456e32(0x208)]&&this[_0x456e32(0x208)][_0x456e32(0x163)]===Window_ShopStatus){if('nYDOn'===_0x456e32(0x2d9))this['_statusWindow']['setItem'](this[_0x456e32(0x359)](0x0));else return _0x5addc1(_0x10db7b['$1']);}},Window_SkillList[_0x31613b(0x24d)]['includesSkillsStatesCore']=function(_0x4f24e2){const _0x8a1c28=_0x31613b;if(!_0x4f24e2)return VisuMZ[_0x8a1c28(0x469)]['Window_SkillList_includes'][_0x8a1c28(0x2b3)](this,_0x4f24e2);if(!this[_0x8a1c28(0x383)](_0x4f24e2))return![];if(!this[_0x8a1c28(0x361)](_0x4f24e2))return![];if(!this[_0x8a1c28(0x1f1)](_0x4f24e2))return![];return!![];},Window_SkillList['prototype'][_0x31613b(0x383)]=function(_0x516e9b){const _0x32f54a=_0x31613b;return DataManager['getSkillTypes'](_0x516e9b)[_0x32f54a(0x1f5)](this[_0x32f54a(0x17a)]);},Window_SkillList['prototype']['checkShowHideNotetags']=function(_0x533f24){const _0xca6ca1=_0x31613b;if(!VisuMZ[_0xca6ca1(0x469)][_0xca6ca1(0x2b2)](this[_0xca6ca1(0x309)],_0x533f24))return![];if(!VisuMZ[_0xca6ca1(0x469)][_0xca6ca1(0x3bd)](this[_0xca6ca1(0x309)],_0x533f24))return![];if(!VisuMZ[_0xca6ca1(0x469)][_0xca6ca1(0x1d2)](this[_0xca6ca1(0x309)],_0x533f24))return![];return!![];},VisuMZ[_0x31613b(0x469)]['CheckVisibleBattleNotetags']=function(_0x4e4e24,_0x252538){const _0xff0334=_0x31613b,_0x4adf05=_0x252538[_0xff0334(0x204)];if(_0x4adf05[_0xff0334(0x20e)](/<HIDE IN BATTLE>/i)&&$gameParty[_0xff0334(0x1ba)]())return _0xff0334(0x1dd)===_0xff0334(0x1dd)?![]:this[_0xff0334(0x185)]()?this[_0xff0334(0x1ea)]():_0x46d69e[_0xff0334(0x469)][_0xff0334(0x32d)][_0xff0334(0x156)]['SkillMenuStatusRect'][_0xff0334(0x2b3)](this);else{if(_0x4adf05[_0xff0334(0x20e)](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty[_0xff0334(0x1ba)]()){if(_0xff0334(0x29c)==='vkXSX')for(const _0x10a542 of _0x2a8e78[_0xff0334(0x250)]){if(this[_0xff0334(0x4a0)](_0x10a542))return!![];}else return![];}else return!![];}},VisuMZ[_0x31613b(0x469)]['CheckVisibleSwitchNotetags']=function(_0x9e8db8,_0x1ee8ec){const _0x359bda=_0x31613b,_0x45b69f=_0x1ee8ec['note'];if(_0x45b69f[_0x359bda(0x20e)](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3364e2=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0xea55f of _0x3364e2){if(!$gameSwitches[_0x359bda(0x3d7)](_0xea55f))return![];}return!![];}if(_0x45b69f[_0x359bda(0x20e)](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x359bda(0x28e)!==_0x359bda(0x30b)){const _0xf4eb97=JSON[_0x359bda(0x3c8)]('['+RegExp['$1'][_0x359bda(0x20e)](/\d+/g)+']');for(const _0x21dc08 of _0xf4eb97){if(!$gameSwitches[_0x359bda(0x3d7)](_0x21dc08))return![];}return!![];}else return _0x45dfd2[_0x3ed18c['id']][_0x359bda(0x2b3)](this,_0x5301b2);}if(_0x45b69f[_0x359bda(0x20e)](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x12a910=JSON[_0x359bda(0x3c8)]('['+RegExp['$1'][_0x359bda(0x20e)](/\d+/g)+']');for(const _0x242ecd of _0x12a910){if('lzdtX'==='lzdtX'){if($gameSwitches[_0x359bda(0x3d7)](_0x242ecd))return!![];}else{if(this[_0x359bda(0x4a0)](_0x7a3f8d))return!![];}}return![];}if(_0x45b69f['match'](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('DUHme'===_0x359bda(0x1ce))_0x4b179d=_0x329eff[_0x359bda(0x2bc)](_0x1bfd33['$1']),_0x35e7f7=_0x1c1f75(_0x10d230['$2']);else{const _0x7c6750=JSON[_0x359bda(0x3c8)]('['+RegExp['$1'][_0x359bda(0x20e)](/\d+/g)+']');for(const _0xef1617 of _0x7c6750){if(!$gameSwitches['value'](_0xef1617))return!![];}return![];}}if(_0x45b69f[_0x359bda(0x20e)](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x359bda(0x3c6)===_0x359bda(0x379)){if(_0x32e9b1['isPlaytest']())_0x1768a2[_0x359bda(0x3e0)](_0x469cb5);}else{const _0x51bd8b=JSON[_0x359bda(0x3c8)]('['+RegExp['$1'][_0x359bda(0x20e)](/\d+/g)+']');for(const _0x51cd47 of _0x51bd8b){if(_0x359bda(0x2be)===_0x359bda(0x2be)){if(!$gameSwitches['value'](_0x51cd47))return!![];}else{const _0x377144=_0x5ad37d[_0x359bda(0x3c8)]('['+_0x34a584['$1']['match'](/\d+/g)+']');for(const _0x2e3d77 of _0x377144){if(_0x3ee5ef[_0x359bda(0x3d7)](_0x2e3d77))return![];}return!![];}}return![];}}if(_0x45b69f[_0x359bda(0x20e)](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x56f8da=JSON['parse']('['+RegExp['$1'][_0x359bda(0x20e)](/\d+/g)+']');for(const _0x38a405 of _0x56f8da){if($gameSwitches[_0x359bda(0x3d7)](_0x38a405))return![];}return!![];}return!![];},VisuMZ[_0x31613b(0x469)][_0x31613b(0x1d2)]=function(_0x45407a,_0x2b3ae9){const _0x40109=_0x31613b,_0x13e07e=_0x2b3ae9[_0x40109(0x204)];if(_0x13e07e['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d72ab=JSON[_0x40109(0x3c8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2d25c0 of _0x5d72ab){if(!_0x45407a[_0x40109(0x18a)](_0x2d25c0))return![];}return!![];}else{if(_0x13e07e['match'](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x9f55c8=RegExp['$1'][_0x40109(0x417)](',');for(const _0x59180b of _0x9f55c8){const _0x3d74ba=DataManager[_0x40109(0x1a2)](_0x59180b);if(!_0x3d74ba)continue;if(!_0x45407a[_0x40109(0x18a)](_0x3d74ba))return![];}return!![];}}if(_0x13e07e[_0x40109(0x20e)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x329062=JSON['parse']('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x5776e4 of _0x329062){if(_0x40109(0x1c7)==='VhrYQ')return _0x1979af[_0x40109(0x469)][_0x40109(0x302)][_0x40109(0x2b3)](this);else{if(!_0x45407a[_0x40109(0x18a)](_0x5776e4))return![];}}return!![];}else{if(_0x13e07e[_0x40109(0x20e)](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x40109(0x49b)===_0x40109(0x327))return this['updatedLayoutStyle']()[_0x40109(0x20e)](/RIGHT/i);else{const _0xf40ae0=RegExp['$1'][_0x40109(0x417)](',');for(const _0x25ef3f of _0xf40ae0){const _0x3c52b7=DataManager[_0x40109(0x1a2)](_0x25ef3f);if(!_0x3c52b7)continue;if(!_0x45407a[_0x40109(0x18a)](_0x3c52b7))return![];}return!![];}}}if(_0x13e07e[_0x40109(0x20e)](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3d075a=JSON['parse']('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x119894 of _0x3d075a){if(_0x45407a['isLearnedSkill'](_0x119894))return!![];}return![];}else{if(_0x13e07e['match'](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x5e1157=RegExp['$1'][_0x40109(0x417)](',');for(const _0x2e7ebb of _0x5e1157){const _0xa562bd=DataManager[_0x40109(0x1a2)](_0x2e7ebb);if(!_0xa562bd)continue;if(_0x45407a[_0x40109(0x18a)](_0xa562bd))return!![];}return![];}}if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3fad48=JSON[_0x40109(0x3c8)]('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x56c615 of _0x3fad48){if(_0x40109(0x410)!==_0x40109(0x410)){const _0x2285ce=[_0x425afd];for(const _0x1ac88b of _0x3a789c){_0x1ac88b['match'](/<REMOVE OTHER (.*) STATES>/i);const _0x4fcdc1=_0xaafb53(_0x1cb2c7['$1']);this[_0x40109(0x4a4)](_0x4fcdc1,_0x2285ce);}}else{if(!_0x45407a[_0x40109(0x18a)](_0x56c615))return!![];}}return![];}else{if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x47250e=RegExp['$1']['split'](',');for(const _0x293632 of _0x47250e){const _0x4318af=DataManager[_0x40109(0x1a2)](_0x293632);if(!_0x4318af)continue;if(!_0x45407a[_0x40109(0x18a)](_0x4318af))return!![];}return![];}}if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x40109(0x15b)!=='yAcHu'){const _0x42591f=this['_result'][_0x40109(0x380)]||0x0;this[_0x40109(0x31b)](_0x168cb1),this['_result'][_0x40109(0x380)]+=_0x42591f;}else{const _0x55c866=JSON[_0x40109(0x3c8)]('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x417ba0 of _0x55c866){if(!_0x45407a[_0x40109(0x18a)](_0x417ba0))return!![];}return![];}}else{if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x40109(0x369)===_0x40109(0x457))return _0x444d2b=_0x3dc48b(_0x1e5f07),_0x6f2841[_0x40109(0x20e)](/#(.*)/i)?_0x40109(0x2a0)['format'](_0x4c655d(_0x226c4e['$1'])):this[_0x40109(0x2d1)](_0x3e01c9(_0x51c78d));else{const _0x37eb0b=RegExp['$1'][_0x40109(0x417)](',');for(const _0x1f7fec of _0x37eb0b){const _0x357cd9=DataManager[_0x40109(0x1a2)](_0x1f7fec);if(!_0x357cd9)continue;if(!_0x45407a[_0x40109(0x18a)](_0x357cd9))return!![];}return![];}}}if(_0x13e07e['match'](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x252063=JSON[_0x40109(0x3c8)]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x564f06 of _0x252063){if(_0x45407a['isLearnedSkill'](_0x564f06))return![];}return!![];}else{if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x27772d=RegExp['$1'][_0x40109(0x417)](',');for(const _0x19c55d of _0x27772d){if(_0x40109(0x17f)!==_0x40109(0x17f)){const _0x32ea55=this[_0x40109(0x2ea)];_0x32ea55[_0x40109(0x24b)](_0x2843f5,0x0,_0x4f9a16['y'],_0x32ea55[_0x40109(0x1cb)],_0x40109(0x20d));}else{const _0x2ae723=DataManager['getSkillIdWithName'](_0x19c55d);if(!_0x2ae723)continue;if(_0x45407a[_0x40109(0x18a)](_0x2ae723))return![];}}return!![];}}if(_0x13e07e[_0x40109(0x20e)](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('QoDtX'!==_0x40109(0x454)){const _0x5d6838=JSON[_0x40109(0x3c8)]('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x51b0a9 of _0x5d6838){if(!_0x45407a['hasSkill'](_0x51b0a9))return![];}return!![];}else{const _0x64cc30=_0x2368c[_0x40109(0x469)][_0x40109(0x32d)][_0x40109(0x438)][_0x40109(0x464)];this[_0x40109(0x241)][_0x40109(0x477)]=this[_0x40109(0x241)][_0x40109(0x477)][_0x40109(0x479)](_0x64cc30);}}else{if(_0x13e07e['match'](/<SHOW IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x21a374=RegExp['$1'][_0x40109(0x417)](',');for(const _0x1d546a of _0x21a374){const _0x12659e=DataManager[_0x40109(0x1a2)](_0x1d546a);if(!_0x12659e)continue;if(!_0x45407a['hasSkill'](_0x12659e))return![];}return!![];}}if(_0x13e07e['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x40109(0x201)!==_0x40109(0x3e7)){const _0x4b055c=JSON[_0x40109(0x3c8)]('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x123c34 of _0x4b055c){if(_0x40109(0x213)!=='cZqsw'){if(!_0x45407a[_0x40109(0x2cc)](_0x123c34))return![];}else return this['_stateRetainType'];}return!![];}else return this[_0x40109(0x185)]()?this[_0x40109(0x295)]():_0x4e0678[_0x40109(0x469)][_0x40109(0x302)][_0x40109(0x2b3)](this);}else{if(_0x13e07e['match'](/<SHOW IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x40109(0x186)!==_0x40109(0x186)){const _0x49dbc8=_0x38db39(_0x3db7de['$1'])[_0x40109(0x417)](',')['map'](_0x78e7c2=>_0x78e7c2[_0x40109(0x17c)]()),_0x1e330a=_0x242ba4[_0x40109(0x469)][_0x40109(0x263)](_0x49dbc8);return _0x1e330a[_0x40109(0x1f5)](this['currentClass']());}else{const _0x20254c=RegExp['$1'][_0x40109(0x417)](',');for(const _0x4289f8 of _0x20254c){const _0x3e3fa1=DataManager[_0x40109(0x1a2)](_0x4289f8);if(!_0x3e3fa1)continue;if(!_0x45407a[_0x40109(0x2cc)](_0x3e3fa1))return![];}return!![];}}}if(_0x13e07e[_0x40109(0x20e)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5ccc1c=JSON[_0x40109(0x3c8)]('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x4112c5 of _0x5ccc1c){if(_0x45407a[_0x40109(0x2cc)](_0x4112c5))return!![];}return![];}else{if(_0x13e07e[_0x40109(0x20e)](/<SHOW IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x40109(0x232)!==_0x40109(0x232)){const _0x4ad866=_0x212158[_0x40109(0x3c8)]('['+_0xfb724c['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x4766d2 of _0x4ad866){if(!_0x4145d2[_0x40109(0x18a)](_0x4766d2))return![];}return!![];}else{const _0x530191=RegExp['$1'][_0x40109(0x417)](',');for(const _0x3a0fb3 of _0x530191){if('xFFxF'!==_0x40109(0x3f9)){const _0x4317ea=DataManager[_0x40109(0x1a2)](_0x3a0fb3);if(!_0x4317ea)continue;if(_0x45407a['hasSkill'](_0x4317ea))return!![];}else{const _0x487dd0=_0x3d4ff0(_0x574645['$1'])[_0x40109(0x417)](',')['map'](_0x9d49b0=>_0x9d49b0['trim']()),_0x366645=_0x45a3c8['SkillsStatesCore']['ParseClassIDs'](_0x487dd0);let _0x26d791=[this[_0x40109(0x385)]()];return _0x2d9fe5[_0x40109(0x443)]&&this[_0x40109(0x198)]&&(_0x26d791=this['multiclasses']()),_0x366645[_0x40109(0x2ff)](_0x3d1344=>_0x26d791[_0x40109(0x1f5)](_0x3d1344))[_0x40109(0x278)]>0x0;}}return![];}}}if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4e42d3=JSON[_0x40109(0x3c8)]('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0x35810a of _0x4e42d3){if('HWXlk'===_0x40109(0x254))return!![];else{if(!_0x45407a[_0x40109(0x2cc)](_0x35810a))return!![];}}return![];}else{if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF (?:HAS|HAVE)[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0xc29a5c=RegExp['$1'][_0x40109(0x417)](',');for(const _0x3eac1f of _0xc29a5c){const _0x245f4e=DataManager[_0x40109(0x1a2)](_0x3eac1f);if(!_0x245f4e)continue;if(!_0x45407a[_0x40109(0x2cc)](_0x245f4e))return!![];}return![];}}if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x40109(0x334)===_0x40109(0x334)){const _0x2fc7f9=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x35d962 of _0x2fc7f9){if(_0x40109(0x34c)!==_0x40109(0x4a2)){if(!_0x45407a[_0x40109(0x2cc)](_0x35d962))return!![];}else for(const _0xc68b65 of _0x5c684c){_0xc68b65[_0x40109(0x20e)](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x574418=_0x4f1eb7(_0x1a01e7['$1'])['toUpperCase']()[_0x40109(0x17c)]()['split'](',');for(const _0x1dad90 of _0x574418){_0x489888[_0x40109(0x250)][_0x40109(0x49d)](_0x1dad90[_0x40109(0x17c)]());}}}return![];}else{const _0x52a248=this[_0x40109(0x215)]();for(const _0xfd4d08 of _0x52a248){if(!_0xfd4d08['isGroupDefeatStateAffected']())return![];}return!![];}}else{if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF (?:HAS|HAVE) ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x40109(0x2d2)!==_0x40109(0x1e8)){const _0x42f00c=RegExp['$1'][_0x40109(0x417)](',');for(const _0x573176 of _0x42f00c){if('kBmPe'!==_0x40109(0x2d8))this[_0x40109(0x15f)](_0x55806e,_0x130b26['x']+_0x389796[_0x40109(0x297)]-_0x232a61,_0x348ca6['y'],_0x40afed);else{const _0x4bb28d=DataManager[_0x40109(0x1a2)](_0x573176);if(!_0x4bb28d)continue;if(!_0x45407a[_0x40109(0x2cc)](_0x4bb28d))return!![];}}return![];}else return _0x2ee6ef[_0x40109(0x165)]();}}if(_0x13e07e[_0x40109(0x20e)](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x24b55a=JSON[_0x40109(0x3c8)]('['+RegExp['$1'][_0x40109(0x20e)](/\d+/g)+']');for(const _0xce57cd of _0x24b55a){if('aIBVH'!==_0x40109(0x236)){if(_0x45407a[_0x40109(0x2cc)](_0xce57cd))return![];}else this[_0x40109(0x260)](_0x4e7b7e['shift']());}return!![];}else{if(_0x13e07e['match'](/<HIDE IF (?:HAS|HAVE) ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x22ecef=RegExp['$1'][_0x40109(0x417)](',');for(const _0x3e86fe of _0x22ecef){const _0x35f743=DataManager['getSkillIdWithName'](_0x3e86fe);if(!_0x35f743)continue;if(_0x45407a[_0x40109(0x2cc)](_0x35f743))return![];}return!![];}}return!![];},Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x1f1)]=function(_0x137982){const _0x407c2d=_0x31613b,_0x562323=_0x137982[_0x407c2d(0x204)],_0x529069=VisuMZ[_0x407c2d(0x469)]['skillVisibleJS'];return _0x529069[_0x137982['id']]?_0x529069[_0x137982['id']]['call'](this,_0x137982):!![];},VisuMZ[_0x31613b(0x469)][_0x31613b(0x4ac)]=Window_SkillList['prototype'][_0x31613b(0x44a)],Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x44a)]=function(_0x31d618){const _0x1eae2f=_0x31613b,_0x100cff=this[_0x1eae2f(0x359)](_0x31d618),_0x11fbab=_0x100cff?_0x100cff['name']:'';if(_0x100cff)this[_0x1eae2f(0x358)](_0x100cff);VisuMZ['SkillsStatesCore'][_0x1eae2f(0x4ac)][_0x1eae2f(0x2b3)](this,_0x31d618);if(_0x100cff)_0x100cff[_0x1eae2f(0x42f)]=_0x11fbab;},Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x358)]=function(_0x51e7be){const _0x4f6428=_0x31613b;if(_0x51e7be&&_0x51e7be['note']['match'](/<LIST NAME:[ ](.*)>/i)){_0x51e7be[_0x4f6428(0x42f)]=String(RegExp['$1'])[_0x4f6428(0x17c)]();for(;;){if(_0x4f6428(0x448)===_0x4f6428(0x2cf))return this[_0x4f6428(0x162)](_0x223d96[_0x57c9aa]);else{if(_0x51e7be[_0x4f6428(0x42f)]['match'](/\\V\[(\d+)\]/gi))_0x51e7be[_0x4f6428(0x42f)]=_0x51e7be[_0x4f6428(0x42f)][_0x4f6428(0x227)](/\\V\[(\d+)\]/gi,(_0x373992,_0x30472d)=>$gameVariables[_0x4f6428(0x3d7)](parseInt(_0x30472d)));else{if(_0x4f6428(0x439)!==_0x4f6428(0x439))_0x12c2c0[_0x4f6428(0x469)][_0x4f6428(0x32d)][_0x4f6428(0x247)][_0x4f6428(0x414)][_0x4f6428(0x2b3)](this,_0x30e1e0);else break;}}}}},Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x357)]=function(_0xe4a1d1,_0x22abf8,_0x29fb50,_0x386940){const _0x49e2a6=_0x31613b;Window_Base[_0x49e2a6(0x24d)][_0x49e2a6(0x357)]['call'](this,this[_0x49e2a6(0x309)],_0xe4a1d1,_0x22abf8,_0x29fb50,_0x386940);},Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x255)]=function(_0x273240){const _0x375031=_0x31613b;this[_0x375031(0x208)]=_0x273240,this[_0x375031(0x332)]();},VisuMZ[_0x31613b(0x469)][_0x31613b(0x219)]=Window_SkillList[_0x31613b(0x24d)]['updateHelp'],Window_SkillList[_0x31613b(0x24d)][_0x31613b(0x2ad)]=function(){const _0x23dc5d=_0x31613b;VisuMZ[_0x23dc5d(0x469)][_0x23dc5d(0x219)][_0x23dc5d(0x2b3)](this);if(this[_0x23dc5d(0x208)]&&this[_0x23dc5d(0x208)][_0x23dc5d(0x163)]===Window_ShopStatus){if('SPVJE'!==_0x23dc5d(0x18c))this[_0x23dc5d(0x208)]['setItem'](this[_0x23dc5d(0x3b6)]());else{if(typeof _0x4b9900!=='number')_0x5b3dee=_0x4cfe37['id'];this[_0x23dc5d(0x27f)]=this[_0x23dc5d(0x27f)]||{},this[_0x23dc5d(0x27f)][_0x3bf828]='';}}};