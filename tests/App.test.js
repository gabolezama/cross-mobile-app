import { render, screen } from "@testing-library/react-native"
import App from "../App"
import { COMPONENT_TEST_IDS } from "../src/Constants"

describe("App must have components: ", ()=>{
    test('LOGIN', () => { 
        render(<App/>)
        const login = screen.getByTestId(COMPONENT_TEST_IDS.login)
        expect(login).toBeDefined()
    })
})