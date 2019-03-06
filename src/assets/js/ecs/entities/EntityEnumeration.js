import { mix } from 'mixwith'
import { Item } from '#/ecs/mixins/Item';
import { Equippable } from '#/ecs/mixins/ItemMixins';
import { Entity } from './Entity';
import { PixiSprite } from '../mixins/PixiSprite';
import { DamageRoll } from '../mixins/ItemMixins';

export class Weapon extends mix(Entity).with(PixiSprite, Item, Equippable, Combat, DamageRoll) {
    constructor(config) {
        super(config)
    }
}

