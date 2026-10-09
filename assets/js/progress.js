/* Progreso local (localStorage). Si está bloqueado, funciona en memoria y avisa. */
const ACTS=['diag','funcs','kw','chk','cmp','qual','lic','cls','match','fin'];
const MODS=['m0','m1','m2','m3','m4','m5','m6','m7','m8'];
const P=(()=>{
  let s={mods:{},act:{},chk:{},txt:{}},ok=true;
  try{const r=localStorage.getItem('kagglelab');if(r)s=Object.assign(s,JSON.parse(r))}catch(e){ok=false}
  const flush=()=>{try{localStorage.setItem('kagglelab',JSON.stringify(s));return true}catch(e){ok=false;document.dispatchEvent(new Event('storefail'));return false}};
  return{
    get ok(){return ok},s:()=>s,
    visit(m){if(!s.mods[m]){s.mods[m]=1;flush()}},
    done(a,sc,mx){const o=s.act[a];s.act[a]={s:sc,m:mx,best:Math.max(sc,o?o.best:0)};flush();document.dispatchEvent(new Event('progress'))},
    chk(k,v){s.chk[k]=v;flush();document.dispatchEvent(new Event('progress'))},
    txt(k,v){s.txt[k]=v;flush()},
    pct(){return Math.round(100*(Object.keys(s.mods).length+Object.keys(s.act).length)/(MODS.length+ACTS.length))},
    badges(){const a=s.act,q=['diag','funcs','lic'].every(k=>a[k]&&a[k].best/a[k].m>=.8);return[
      ['Explorador',MODS.every(m=>s.mods[m]),'Visitó los 9 módulos'],
      ['Primer paso',!!a.chk,'Completó la lista de «Mi primera descarga» (autorreporte)'],
      ['Detective',!!a.cmp&&!!a.qual,'Completó comparador y problemas de calidad'],
      ['Mente analítica',q,'≥80 % en diagnóstico, funcionalidades y licencias'],
      ['Retador',!!a.fin,'Generó su ficha del reto final']]},
    reset(){s={mods:{},act:{},chk:{},txt:{}};flush();document.dispatchEvent(new Event('progress'))}
  }})();
