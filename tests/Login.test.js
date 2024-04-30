import { render, screen } from "@testing-library/react-native"
import Login from "../src/Screens/Login"

describe('Login Component Test', () => {
    test('Should have a user & password inputs', () => { 
        render(<Login/>)
        const userLabel = screen.getByRole('text', {name: /user/i})
        expect(userLabel).toBeDefined()
        const passwordLabel = screen.getByRole('text', {name: /password/i})
        expect(passwordLabel).toBeDefined()
        
        // Buscar los TextInput por el placeholder
        const userTextInput = screen.getByPlaceholderText(/user/i)
        const passwordTextInput = screen.getByPlaceholderText(/password/i)

        expect(userTextInput).toBeDefined()
        expect(passwordTextInput).toBeDefined()
    })
    test('Should have a login button', () => { })
 })