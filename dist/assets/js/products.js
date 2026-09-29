/** Catálogo para apresentação: fotos entregues pelo usuário, valores NÃO oficiais. */
export const CATEGORY_LABELS = Object.freeze({all:'Todos',individual:'Individuais',kits:'Kits e combos',salads:'Saladas'});
export const products = Object.freeze([
 {id:'cenoura',name:'Cenoura picada',category:'individual',description:'Cenoura cortada em palitos para facilitar seu preparo.',price:8.90,image:'./assets/images/cenoura.webp',alt:'Cenoura em palitos numa embalagem transparente',badge:'Em destaque',weight:'A confirmar'},
 {id:'abobora',name:'Abóbora picada',category:'individual',description:'Cubos de abóbora práticos para receitas do dia a dia.',price:9.90,image:'./assets/images/abobora.webp',alt:'Cubos de abóbora em embalagem transparente',badge:'',weight:'A confirmar'},
 {id:'couve-flor',name:'Couve-flor',category:'individual',description:'Floretes selecionados, embalados e prontos para o preparo.',price:10.90,image:'./assets/images/couve-flor.webp',alt:'Floretes de couve-flor em embalagem transparente',badge:'',weight:'A confirmar'},
 {id:'vinagrete',name:'Vinagrete',category:'salads',description:'Mix de vegetais picados para acompanhar suas refeições.',price:7.90,image:'./assets/images/vinagrete.webp',alt:'Vinagrete em recipiente plástico transparente',badge:'',weight:'A confirmar'},
 {id:'kit-sopao',name:'Kit Sopão',category:'kits',description:'Seleção prática de legumes para uma sopa saborosa.',price:14.90,image:'./assets/images/kit-sopao.webp',alt:'Mix de legumes embalados e uma sopa ilustrativa',badge:'Kit especial',weight:'A confirmar'}
]);
export const productById=Object.freeze(Object.fromEntries(products.map(p=>[p.id,p])));
