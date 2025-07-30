let sequence = 1;
const carTypes = ['Mazda MX5', 'BMW M3', 'Porsche 911', 'Mercedes S-Class'];
const colours = ['Red', 'Blue', 'Green', 'White', 'Black'];

export const createCar = () => ({
    type: carTypes[sequence % carTypes.length],
    colour: colours[sequence % colours.length],
    year: 2010 + ((sequence * 7) % 10),
    price: 20000 + ((sequence * 3 * 17 * 19 * 5 * 7) % 400),
    id: sequence++,
});
