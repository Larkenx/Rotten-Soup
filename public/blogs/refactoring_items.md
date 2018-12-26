# Refactoring items in Rotten Soup 
> In this article, I'm going to talk through where my item implementation currently stands and what its major drawbacks are. I'm looking to change that by moving away from an object-oriented approach towards an entity-component-system approach using concepts of javascript higher-order functions or mixins.

When I first started Rotten Soup 2 years ago, I was even more of a baby developer than I am today. I created a new javascript class for every type of item, some of them extending some more abstract classes. This has a lot of major drawbacks - the biggest issue being that as you add more and more functionality to the game, every new item produces exponential code complexity. The class hierarchy as it is today is as follows:

```
├── Equippable.js
├── Item.js
├── armor 
│   ├── Armor.js
│   ├── Boots.js
│   ├── ChestArmor.js
│   ├── Helmet.js
│   ├── LegArmor.js
│   └── Ring.js
├── misc
│   ├── Beer.js
│   ├── Corpse.js
│   ├── Gold.js
│   ├── Key.js
│   └── Spellbook.js
├── potions
│   ├── HealthPotion.js
│   ├── ManaPotion.js
│   ├── Potion.js
│   └── StrengthPotion.js
└── weapons  
    ├── Battleaxe.js
    ├── Sword.js
    ├── Weapon.js
    └── ranged
        ├── Bow.js
        ├── RangedWeapon.js
        └── ammo
            ├── Ammo.js
            └── Arrow.js
```

There's a lot of highly discussed issues with this approach in the game development community; check out this wonderful [youtube video](https://www.youtube.com/watch?v=U03XXzcThGU) by Brian Bucklew (creator of Caves of Qud) for a more eloquent explanation than what I'm about to give. 

The gist is that if you have an OOP architecture for your items and entities of your game, you'll find that as the complexity of your game grows, it becomes much more difficult to decide when one item falls under one class inheritance structure or another. Should a `Fire Steel Arrow` fall under `Elemental Weapon`, `Ammunition`, or `Stackable`? You can get by with this for a little while by dealing with these unique scenarios ad hoc. I did this for `Ammo` and `Gold`, which are the only items that have a `quantity` property. They don't share any inherited class structures, they're just duck typed to have a quantity property that my inventory management code knows about. So as a recap, some of the major issues of classic OOP design when it comes to games:

- Difficulty (impossibility) of finding the right inheritance structure for unique items that fall under many trees (the `Fire-Ice-Stackable-Throwable-Wieldable-Battleaxe`).
- Duplicated code for the same functionality in different classes that can't share an inheritance structure

> Object oriented design isn't enemy! We still want *classes* and inheritance for shared functionality. We just want to limit the depth of the inheritance tree to prevent complexity and code duplication.

## Overview of  Entity Component Systems & some lousy examples
So, like every other cool developer on the block, I'm looking to *borrow* some ideas from ECS - but I don't want to drink the entire pitcher of ECS Koolaid. Instead of having some kind of horrible convoluted object inheritance structure, we can use multiple inheritance to inherit properties of several different components. Here's a few examples of what that might look like if we have a language that allows multiple inheritance:

```javascript
class AcidPotion extends Throwable, Consumable, Stackable {...}
class FlamingThrowingKnife extends Flaming, Throwable, Stackable {...}
class Spellbook extends Wearable, Throwable, Consumable {...}
```

More traditional ECS designs would probably have a class that has a list of components:
```javascript
class Potion {
    constructor() {
        this.components = [
            new StackableComponent(), // you can have over 9000 of them
            new ThrowableComponent(), // you can throw it
            new ConsumableComponent(),  // you can drink it
            new PourableComponent() // you can pour it somewhere
        ]
    }
}
```

Either approach seems pretty reasonable. One of the major design principles of ECS from what I've seen is having an eventing framework in place. Your game has *systems* that processes these events by finding *entities* with the matching *components*, and the components consume the events and handle it functionality independently. Pouring out a potion onto an unsuspecting enemy is completely independent of whether or not the potion is drinkable, throwable, or stackable.

## Concepts of ECS for Rotten Soup
My goal for Rotten Soup is to take elements of the Entity-Component-System design  and implement it for items in my game. I want to have a robust system to make items expressive and customizable. I want to have a flaming, electrified long sword that has a customized hilt and runes engraved into its blade. I want to be able to take that sword to a blacksmith, name it, and continue to upgrade it with new metals.

However, I *do not want* a full-blown, event-driven system that powers my game. I don't want to event into a mysterious interweaving network of systems that somehow manages to pick up an item and update a quantity component somewhere. I want to deliberately pick up a single instance of an item, and on that object, interface with whatever properties it has. I essentially want a flattened hierarchy structure of my item, where I can access the properties I need directly, but I want all the benefits of an ECS architecture where I can ad hoc throw on new inherited, shared components.
```javascript
// What I want 
const flamingSteelArrow = {
    quantity: 12,
    name: "Flaming Steel Arrow",
    damageModifier: 2,
    speed: 3,
    elementalOnHitEffects: [/* list of functions that can apply itself to a target  */],
    equippable: true,
    equipmentSlot: 'quiver'
}

// What a traditional ECS gives me
const flamingSteelArrow = {
    name: "Flaming Steel Arrow",
    components: [
        { // Stackable Component?
            quantity: 12
        },
        { // Projectile Component?
            damageModifier: 2,
            speed: 3
        },
        { // Elemental Component
            elementalOnHitEffects: [/* ... */]
        },
        { // Equippable Component
            equipmentSlot: 'quiver'
        }
    ]
}
```

## JavaScript Multiple Inheritance Implementations (Mixins)

There are a few ways we can approach implementing this in JavaScript specifically. Multiple inheritance, or mixins, is not a feature of the language; however, it's a commonly discussed problem. Many of the ideas I'm about to explore are covered in [this article](http://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/). The [MDN article for classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins) also does a pretty good job of showing a way of implementing mixins as well. High level idea is that I can create a function that accepts a class, and returns a new sub-class. You can chain those functions together so your mixins basically extend each other over and over again. Here's a less pretty code example, more or less from the MDN docs:

```javascript
/* The entity base class that everything extends */
class Entity {
    constructor(options) {
        Object.assign(this, options)
    }
    
    /* shared code by all entities */
}

/* A function that accepts a Base class, and returns a new class extending it, adding methods to handle getting/setting quantity */
const Stackable = Base => class extends Base {
    getQuantity() {}

    setQuantity() {}
}
/* Similar to the above mixin, but takes in a paramter that sets what equipment slot should be used  */
const Equippable = (Base, slot) => class extends Base { 
    constructor() {
        this.slot = slot
    }
}

class Arrow extends Stackable(Equippable(Entity, 'quiver')) {
    constructor(){
        super({ name: 'Arrow', description: 'shooty shooty'})
    }
}
```
