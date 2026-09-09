import fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('c:/Users/SAAV054/Documents/Desenvolvimento/pessoal/pixel-penalty-star/src/assets/SoccerWiki_2026-09-09_1788978400.json', 'utf8'));
const clubData = rawData.ClubData;

const terms = ['Brusque', 'Botafogo', 'América', 'Velez', 'Pumas'];
for (const t of terms) {
  const matches = clubData.filter(c => c.Name && c.Name.toLowerCase().includes(t.toLowerCase()));
  console.log(`Matches for '${t}':`, matches.slice(0, 4).map(c => ({ id: c.ID, name: c.Name, img: c.ImageURL })));
}
