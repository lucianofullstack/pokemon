import {describe, expect, test} from 'vitest';
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'


import Type from '../src/components/WidgetType'

describe("Type component test", () => {
    it("should show an image with alt text fire", () => {                
        render(<Type key={ "fire" } name={"fire"}/>)
        expect (screen.getByAltText(/fire/i)).toBeDefined()        
    })
})
