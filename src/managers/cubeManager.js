const uniqid = require('uniqid');
const cubes = [
    {
        id: '2wdw12g0ylsx8gzjg',
        name: "Mirror Cube",
        description: "The Mirror Cube is an unofficial puzzle. It has pieces of different shapes which allows it to shape shift. When you scramble it, the puzzle takes a chaotic form and loses its cubic shape which makes the solving process quite complicated.",
        imageUrl: 'https://logicbg.com/wp-content/uploads/2020/03/rubik-kub-Mirror-Cube-Silver-QiYi-razbarkano-kubche.jpg',
        difficultyLevel: 4
    },

    {
        id: '2wdw12g0ylsx6hzjg',
        name: "Phantom Cube",
        description: "Touch, reveal, and solve with the Rubik’s Phantom. ou will be amazed by the thermochromic technology of this Cube. Reveal the Phantom’s colors with the heat of your touch.",
        imageUrl: 'https://cdn.spinmasterstudios.com/products/rubiks/us/778988428757/full1.jpg',
        difficultyLevel: 3
    }
];

exports.getAll = () => cubes.slice();

exports.getOne = (cubeId) => cubes.find(x => x.id == cubeId); 

exports.create = (cubeData) => {
    const newCube = {
        id: uniqid(),
        ...cubeData,
    };

    cubes.push(newCube);

    return newCube;
}