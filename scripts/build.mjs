import { mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const root=fileURLToPath(new URL('../',import.meta.url));
const out=join(root,'docs');
await mkdir(join(out,'assets'),{recursive:true});
const point=(x,y,z=0)=>[360+(x-y)*27,215+(x+y)*14-z];
const fmt=p=>p.join(',');
const palette={stone:['#626072','#373441','#464252'],copper:['#d69a6b','#7d4937','#a86244'],dark:['#353340','#24232e','#2a2935'],light:['#eee1c4','#ae8565','#d1ad81']};
function block(x,y,z=0,h=24,kind='stone'){
 const p=point(x,y,z),a=point(x+1,y,z),b=point(x+1,y+1,z),c=point(x,y+1,z),down=q=>[q[0],q[1]+h];
 const [top,left,right]=palette[kind];
 return `<g stroke="#181720" stroke-width="1.4" stroke-linejoin="round"><polygon points="${[p,a,b,c].map(fmt).join(' ')}" fill="${top}"/><polygon points="${[c,b,down(b),down(c)].map(fmt).join(' ')}" fill="${left}"/><polygon points="${[a,b,down(b),down(a)].map(fmt).join(' ')}" fill="${right}"/></g>`;
}
let shapes='';
for(let sum=0;sum<=16;sum++)for(let x=0;x<9;x++){const y=sum-x;if(y<0||y>8)continue;const edge=x===0||y===0||x===8||y===8; shapes+=block(x,y,0,edge?48:32,edge?'dark':'stone');}
// Stone underside and loose suspended blocks.
shapes+=block(2,8,-64,27,'dark')+block(6,8,-45,42,'stone')+block(8,5,-56,32,'dark');
// Back wall, framing an open-front workshop.
for(let i=1;i<8;i++){shapes+=block(i,1,27,27,'stone');shapes+=block(1,i,27,27,'stone');}
for(const [x,y] of [[1,1],[7,1],[1,7]]){for(let level=1;level<=5;level++)shapes+=block(x,y,level*25,25,level===5?'copper':'stone');}
for(let i=2;i<7;i++){shapes+=block(i,1,124,22,'dark');shapes+=block(1,i,124,22,'dark');}
// Copper altar, built into the island.
for(let sum=6;sum<=10;sum++)for(let x=3;x<=5;x++){let y=sum-x;if(y>=3&&y<=5)shapes+=block(x,y,30,30,'copper');}
shapes+=block(4,4,57,27,'light');
// Independent pixel egg illustration, with a faceted shell and warm fissure.
const eggRows=['0001111000','0011111100','0111111110','0111111110','1111111111','1111111111','1111111111','1111111111','0111111110','0011111100'];
let egg='';
eggRows.forEach((row,y)=>[...row].forEach((v,x)=>{if(v==='1'){let color=x<3?'#b8805a':x>6?'#ffe9b9':'#e9ba82';if((y===4&&x===5)||(y===5&&x===4)||(y===6&&x===5)||(y===7&&x===6))color='#fff5d6';egg+=`<rect x="${329+x*7}" y="${190+y*7}" width="7.3" height="7.3" fill="${color}"/>`;}}));
shapes+=`<ellipse cx="363" cy="270" rx="63" ry="24" fill="url(#glow)"/><g filter="url(#warmglow)">${egg}</g>`;
for(const [x,y] of [[7,3],[3,7]]){const [px,py]=point(x,y,45);shapes+=block(x,y,36,36,'dark');shapes+=`<rect x="${px+20}" y="${py-24}" width="8" height="36" fill="#9b6141"/><rect x="${px+17}" y="${py-37}" width="14" height="19" fill="#ffc17b" filter="url(#warmglow)"/><rect x="${px+20}" y="${py-40}" width="8" height="12" fill="#fff0bd"/>`;}
shapes+=block(-1,5,90,17,'copper')+block(8,-1,95,17,'copper')+block(6,9,65,13,'light');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="720" height="640" viewBox="0 0 720 640" role="img" aria-labelledby="title desc"><title id="title">The BlockHatchery</title><desc id="desc">An original floating slate-block workshop with copper beams, glowing torches and a pixel egg.</desc><defs><radialGradient id="glow"><stop stop-color="#ffc078" stop-opacity=".5"/><stop offset="1" stop-color="#ffc078" stop-opacity="0"/></radialGradient><filter id="warmglow" x="-100%" y="-100%" width="300%" height="300%"><feDropShadow dx="0" dy="0" stdDeviation="9" flood-color="#ef9255" flood-opacity=".45"/></filter></defs><ellipse cx="360" cy="511" rx="175" ry="41" fill="#090912" opacity=".6"/><path d="M45 387L360 551 675 387M45 327L360 491 675 327M105 417L420 253M195 465L510 301" fill="none" stroke="#76677f" stroke-opacity=".12" stroke-dasharray="4 7"/>${shapes}<g fill="#e3a46d"><rect x="219" y="195" width="4" height="4"/><rect x="525" y="246" width="5" height="5"/><rect x="296" y="136" width="4" height="4"/><rect x="442" y="139" width="3" height="3"/><rect x="181" y="364" width="3" height="3"/></g></svg>`;
const mark=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><path d="M20 2 37 11v19L20 39 3 30V11Z" fill="#aa6746"/><path d="m20 2 17 9-17 9L3 11Z" fill="#f2b684"/><path d="M20 20v19L3 30V11Z" fill="#744637"/><path d="M18 10h6v4h4v10h-4v4h-8v-4h-4V14h6Z" fill="#fff0cf"/><path d="M18 14h4v5h-4v4h4v5h-6v-4h-4V14Z" fill="#d3a17a"/></svg>`;
await copyFile(join(root,'site/index.html'),join(out,'index.html'));
await copyFile(join(root,'site/style.css'),join(out,'assets/style.css'));
await writeFile(join(out,'assets/hatchery.svg'),svg);
await writeFile(join(out,'assets/mark.svg'),mark);
await writeFile(join(out,'.nojekyll'),'');
console.log('Built BlockHatchery website: HTML, CSS and original SVG artwork. No packages or remote assets required.');
