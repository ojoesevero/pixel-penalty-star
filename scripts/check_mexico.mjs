import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('c:/Users/SAAV054/Documents/Desenvolvimento/pessoal/pixel-penalty-star/src/assets/SoccerWiki_2026-09-09_1788978400.json', 'utf8'));
const clubData = rawData.ClubData;

console.log('Toluca:', clubData.filter(c => c.Name && c.Name.toLowerCase().includes('toluca')).map(c => ({ id: c.ID, name: c.Name })));
console.log('Pumas:', clubData.filter(c => c.Name && c.Name.toLowerCase().includes('pumas')).map(c => ({ id: c.ID, name: c.Name })));
