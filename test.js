const { a } = require('./f.js');

// console.log(f);

// return {
//     name: repo.name,
//     url: repo.clone_url,
// };

const b = a.map((item) => {
    return { name: item.name, clone_url: item.clone_url };
});

console.log(b);
