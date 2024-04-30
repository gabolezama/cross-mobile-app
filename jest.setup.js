/* // Define un objeto de navegación simulado
const mockNavigation = {
    navigate: jest.fn(),
  };
  
  // Mockea el módulo '@react-navigation/native' para que retorne el objeto de navegación simulado
  jest.mock('@react-navigation/native', () => ({
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: () => mockNavigation,
  }));
  
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve('mocked data'),
    })
  ); */