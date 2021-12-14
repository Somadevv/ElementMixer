/**
 * @jest-environment jsdom
 */
import { PlayerInventory } from "../inventory.js";

test('Underlying list is rendered', () => {
    const newinv = new PlayerInventory();
    const elm = newinv.makeUL(['1', '2'])
    expect(elm.children.length).toBe(2)
    
    

})